# Déployer TneXa sur Cloudflare

## Architecture

- **OVHcloud** conserve l’enregistrement du domaine et la boîte `contact@tnexa.fr`.
- **Cloudflare DNS** gère la zone DNS de `tnexa.fr`.
- **Cloudflare Workers Static Assets** héberge les pages générées par Astro.
- Une **Cloudflare Worker** traite uniquement `/api/contact`.
- **Cloudflare Turnstile** protège le formulaire contre les robots.
- **Cloudflare Email Service** transmet la demande uniquement vers `contact@tnexa.fr`.

Aucune base de données n’est utilisée pour le formulaire.

## 1. Ajouter le domaine à Cloudflare

1. Créer un compte Cloudflare et ajouter `tnexa.fr` sur le plan Free.
2. Relever les deux serveurs de noms fournis par Cloudflare.
3. Avant de changer les serveurs de noms chez OVHcloud, recopier dans Cloudflare tous les enregistrements e-mail OVH : MX, SPF, DKIM et éventuels enregistrements de validation.
4. Remplacer les serveurs de noms du domaine dans l’espace client OVHcloud.
5. Vérifier la réception et l’envoi d’un e-mail avec `contact@tnexa.fr` avant de poursuivre.

Les enregistrements MX ne doivent jamais être activés derrière le proxy Cloudflare.

## 2. Créer le widget Turnstile

1. Dans Cloudflare, ouvrir **Turnstile** puis créer un widget nommé `TneXa contact`.
2. Choisir le mode **Managed**.
3. Autoriser `tnexa.fr` et `www.tnexa.fr`.
4. Copier la **Site Key** publique et la **Secret Key** privée.

Pour construire le site, fournir la clé publique :

```bash
PUBLIC_TURNSTILE_SITE_KEY="votre-site-key" npm run build
```

La clé secrète ne doit jamais être placée dans un fichier suivi par Git. Elle sera enregistrée avec Wrangler :

```bash
npx wrangler secret put TURNSTILE_SECRET_KEY
```

## 3. Préparer Email Service

1. Dans Cloudflare, ouvrir **Compute > Email Service > Email Sending**.
2. Ajouter `tnexa.fr` comme domaine d’envoi.
3. Laisser Cloudflare créer les enregistrements du sous-domaine `cf-bounce` nécessaires à SPF, DKIM et DMARC.
4. Ajouter puis vérifier `contact@tnexa.fr` comme adresse de destination.
5. Désactiver **Email preview** si aucune conservation temporaire du contenu des messages n’est souhaitée.

La configuration `wrangler.jsonc` verrouille le binding `CONTACT_EMAIL` sur `contact@tnexa.fr`. Même le code de la Worker ne peut donc pas l’utiliser pour envoyer vers une autre adresse.

## 4. Tester localement

Copier les variables de développement :

```bash
cp .dev.vars.example .dev.vars
cp .env.example .env
npm run dev:cloudflare
```

Les clés fournies dans les fichiers d’exemple sont les clés de test officielles Cloudflare. `CONTACT_DRY_RUN=true` valide le parcours sans envoyer d’e-mail réel.

Ne jamais déployer ces clés de test ni la variable `CONTACT_DRY_RUN` en production.

## 5. Déployer

Après authentification de Wrangler :

```bash
npx wrangler login
PUBLIC_TURNSTILE_SITE_KEY="votre-site-key" npm run deploy
```

Wrangler déploie ensemble les fichiers statiques de `dist/` et la Worker qui traite le formulaire.

## 6. Connecter le domaine

Dans la page du Worker, ajouter les domaines personnalisés :

- `tnexa.fr` ;
- `www.tnexa.fr`.

Choisir ensuite l’un des deux comme URL canonique et rediriger l’autre. La configuration Astro utilise actuellement `https://tnexa.fr` comme adresse canonique.

## 7. Vérifications avant publication

- le site et le formulaire sont accessibles en HTTPS ;
- `contact@tnexa.fr` reçoit toujours les e-mails directs ;
- le formulaire affiche un succès et l’e-mail arrive dans la boîte ;
- répondre à l’e-mail utilise bien l’adresse saisie par le visiteur ;
- un jeton Turnstile invalide est refusé ;
- plusieurs envois rapides déclenchent la limitation ;
- les champs légaux entre crochets ont été remplacés ;
- les clés de test et `CONTACT_DRY_RUN` sont absents de la production.
