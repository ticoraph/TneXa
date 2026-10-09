const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const MAX_BODY_SIZE = 12_000;

const jsonHeaders = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'no-referrer',
};

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...jsonHeaders, ...extraHeaders },
  });
}

function normalize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(value) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function validateContactFields(formData) {
  const fields = {
    name: normalize(formData.get('name')),
    company: normalize(formData.get('company')),
    email: normalize(formData.get('email')).toLowerCase(),
    message: normalize(formData.get('message')),
    consent: formData.get('consent') === 'on' || formData.get('consent') === 'true',
    honeypot: normalize(formData.get('website')),
    turnstileToken: normalize(formData.get('cf-turnstile-response')),
    startedAt: Number(formData.get('startedAt')),
  };

  if (fields.honeypot) return { ok: true, spam: true, fields };

  const errors = [];
  if (fields.name.length < 2 || fields.name.length > 80) errors.push('name');
  if (fields.company.length > 120) errors.push('company');
  if (!isValidEmail(fields.email)) errors.push('email');
  if (fields.message.length < 20 || fields.message.length > 3_000) errors.push('message');
  if (!fields.consent) errors.push('consent');
  if (!fields.turnstileToken || fields.turnstileToken.length > 2_048) errors.push('turnstile');
  if (!Number.isFinite(fields.startedAt) || Date.now() - fields.startedAt < 1_500) errors.push('timing');

  return { ok: errors.length === 0, spam: false, errors, fields };
}

export function createEmailText(fields, request) {
  const receivedAt = new Date().toISOString();
  const country = request.headers.get('cf-ipcountry') || 'Non disponible';

  return [
    'Nouvelle demande depuis le formulaire TneXa',
    '',
    `Nom : ${fields.name}`,
    `Entreprise : ${fields.company || 'Non renseignée'}`,
    `E-mail : ${fields.email}`,
    `Pays estimé : ${country}`,
    `Reçue le : ${receivedAt}`,
    '',
    'Message :',
    fields.message,
  ].join('\n');
}

async function verifyTurnstile(token, secret, request) {
  if (!secret) return false;

  const body = new FormData();
  body.set('secret', secret);
  body.set('response', token);
  body.set('idempotency_key', crypto.randomUUID());

  const remoteIp = request.headers.get('cf-connecting-ip');
  if (remoteIp) body.set('remoteip', remoteIp);

  const response = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    body,
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) return false;
  const result = await response.json();
  return result.success === true;
}

async function handleContact(request, env) {
  if (request.method !== 'POST') {
    return json({ ok: false, message: 'Méthode non autorisée.' }, 405, { allow: 'POST' });
  }

  const origin = request.headers.get('origin');
  const requestOrigin = new URL(request.url).origin;
  if (!origin || origin !== requestOrigin) {
    return json({ ok: false, message: 'Origine de la requête refusée.' }, 403);
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_SIZE) {
    return json({ ok: false, message: 'Le message est trop volumineux.' }, 413);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('multipart/form-data') && !contentType.includes('application/x-www-form-urlencoded')) {
    return json({ ok: false, message: 'Format de formulaire non pris en charge.' }, 415);
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return json({ ok: false, message: 'Le formulaire est illisible.' }, 400);
  }

  const validation = validateContactFields(formData);

  // Répondre comme pour un succès évite d'aider les robots à reconnaître le piège.
  if (validation.spam) return json({ ok: true, message: 'Votre message a bien été envoyé.' });
  if (!validation.ok) {
    return json({ ok: false, message: 'Vérifiez les champs du formulaire.', fields: validation.errors }, 422);
  }

  const rateKey = request.headers.get('cf-connecting-ip') || validation.fields.email;
  if (env.CONTACT_RATE_LIMITER) {
    const rateLimit = await env.CONTACT_RATE_LIMITER.limit({ key: rateKey });
    if (!rateLimit.success) {
      return json({ ok: false, message: 'Trop de tentatives. Réessayez dans quelques minutes.' }, 429);
    }
  }

  let isHuman = false;
  try {
    isHuman = await verifyTurnstile(validation.fields.turnstileToken, env.TURNSTILE_SECRET_KEY, request);
  } catch (error) {
    console.warn('Turnstile verification unavailable', error instanceof Error ? error.message : 'unknown error');
  }

  if (!isHuman) {
    return json({ ok: false, message: 'La vérification antispam a échoué. Rechargez la page et réessayez.' }, 403);
  }

  if (env.CONTACT_DRY_RUN === 'true') {
    return json({ ok: true, message: 'Mode test : le formulaire est valide.' });
  }

  try {
    await env.CONTACT_EMAIL.send({
      to: env.CONTACT_TO,
      from: { email: env.CONTACT_FROM, name: 'Site TneXa' },
      replyTo: validation.fields.email,
      subject: 'Nouvelle demande depuis tnexa.fr',
      text: createEmailText(validation.fields, request),
    });
  } catch (error) {
    console.error('Contact email delivery failed', error instanceof Error ? error.message : 'unknown error');
    return json({ ok: false, message: "L’envoi est momentanément indisponible. Écrivez-nous à contact@tnexa.fr." }, 503);
  }

  return json({ ok: true, message: 'Merci, votre message a bien été envoyé.' });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact') return handleContact(request, env);
    if (url.pathname.startsWith('/api/')) return json({ ok: false, message: 'Route inconnue.' }, 404);

    return env.ASSETS.fetch(request);
  },
};
