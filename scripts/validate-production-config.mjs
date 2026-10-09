const siteKey = process.env.PUBLIC_TURNSTILE_SITE_KEY?.trim();
const testKeys = new Set([
  '1x00000000000000000000AA',
  '2x00000000000000000000AB',
  '1x00000000000000000000BB',
  '2x00000000000000000000BB',
  '3x00000000000000000000FF',
]);

if (!siteKey) {
  console.error('Déploiement annulé : PUBLIC_TURNSTILE_SITE_KEY est absente.');
  process.exit(1);
}

if (testKeys.has(siteKey)) {
  console.error('Déploiement annulé : une clé Turnstile de test ne peut pas être utilisée en production.');
  process.exit(1);
}

console.log('Configuration Turnstile de production détectée.');
