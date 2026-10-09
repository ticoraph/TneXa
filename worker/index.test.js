import test from 'node:test';
import assert from 'node:assert/strict';
import { createEmailText, validateContactFields } from './index.js';

function validForm(overrides = {}) {
  const data = new FormData();
  const values = {
    name: 'Marie Dupont',
    company: 'Exemple SAS',
    email: 'marie@example.com',
    message: 'Nous souhaitons automatiser le traitement de nos demandes entrantes.',
    consent: 'on',
    website: '',
    'cf-turnstile-response': 'test-token',
    startedAt: String(Date.now() - 3_000),
    ...overrides,
  };

  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

test('accepte un formulaire complet', () => {
  const result = validateContactFields(validForm());
  assert.equal(result.ok, true);
  assert.equal(result.spam, false);
  assert.equal(result.fields.email, 'marie@example.com');
});

test('rejette une adresse e-mail invalide et un message trop court', () => {
  const result = validateContactFields(validForm({ email: 'incorrect', message: 'Trop court' }));
  assert.equal(result.ok, false);
  assert.deepEqual(result.errors, ['email', 'message']);
});

test('neutralise silencieusement le champ piège', () => {
  const result = validateContactFields(validForm({ website: 'https://spam.example' }));
  assert.equal(result.ok, true);
  assert.equal(result.spam, true);
});

test('construit un e-mail texte sans données techniques sensibles', () => {
  const fields = validateContactFields(validForm()).fields;
  const request = new Request('https://tnexa.fr/api/contact', { headers: { 'cf-ipcountry': 'FR' } });
  const body = createEmailText(fields, request);
  assert.match(body, /Marie Dupont/);
  assert.match(body, /Pays estimé : FR/);
  assert.doesNotMatch(body, /cf-connecting-ip/i);
});
