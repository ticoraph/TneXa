# TneXa

Site vitrine de [TneXa](https://tnexa.fr), entreprise individuelle spécialisée dans les systèmes d'intelligence artificielle connectés aux données des clients : agents IA, automatisation, data science et machine learning.

Le site est statique (Astro + MDX). Une petite Cloudflare Worker traite uniquement le formulaire de contact (`/api/contact`).

## Stack

| Besoin | Outil |
| --- | --- |
| Génération du site | [Astro](https://astro.build) 7 en mode `static`, sans barre oblique finale |
| Contenu éditorial | MDX (`@astrojs/mdx`) |
| Référencement | `@astrojs/sitemap`, balises canoniques et Open Graph dans `BaseLayout` |
| Hébergement | Cloudflare Workers Static Assets |
| Formulaire de contact | Worker `worker/index.js`, Cloudflare Turnstile, Cloudflare Email Service |
| Tests | `node --test` (aucune dépendance supplémentaire) |

## Démarrage rapide

Prérequis : Node.js récent et npm.

```bash
npm install
npm run dev
```

Le serveur local indique l'adresse à ouvrir dans le navigateur.

## Commandes

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement Astro |
| `npm run check` | Vérification des types et des fichiers `.astro` (`astro check`) |
| `npm run build` | `astro check` puis génération du site statique dans `dist/` |
| `npm run preview` | Prévisualisation du site généré |
| `npm test` | Tests de la Worker (validation et protection du formulaire) |
| `npm run dev:cloudflare` | Build puis exécution locale avec Wrangler (site + Worker) |
| `npm run deploy` | Vérifie la configuration de production, construit et déploie avec Wrangler |

## Structure du dépôt

```text
src/
  config.ts          nom, e-mail, description et navigation
  layouts/           BaseLayout (balises <head>, en-tête, pied de page) et ContentLayout (pages MDX)
  components/        composants réutilisables (cartes, étapes, appel à l'action…)
  pages/             une page par fichier : .astro (structurées) ou .mdx (éditoriales)
  styles/global.css  variables de design et styles communs
worker/              Worker du formulaire de contact et ses tests
public/              favicon, robots.txt et en-têtes de sécurité (_headers)
scripts/             contrôle de la configuration avant déploiement
docs/                plan du site, guides de déploiement, notes de projet
legacy/              ancienne base React/Vite, conservée pour archive et exclue de TypeScript
```

## Modifier le contenu

- les pages éditoriales se trouvent dans `src/pages/**/*.mdx` ; leur en-tête (frontmatter) fournit `title`, `description`, `eyebrow` et `intro` ;
- la page d'accueil et les pages structurées se trouvent dans `src/pages/**/*.astro` ;
- l'adresse e-mail, la description et la navigation se trouvent dans `src/config.ts` ;
- les couleurs, les espacements et les styles communs se trouvent dans `src/styles/global.css`.

## Formulaire de contact

Le formulaire envoie ses données à `/api/contact`, géré par `worker/index.js`. La Worker :

1. n'accepte que les requêtes `POST` de même origine, de taille limitée ;
2. valide les champs et écarte les robots (champ piège, délai minimal de remplissage) ;
3. applique une limite de débit (5 requêtes par minute) ;
4. vérifie le jeton Cloudflare Turnstile côté serveur ;
5. envoie l'e-mail uniquement vers `contact@tnexa.fr`.

Aucune donnée n'est stockée en base.

### Variables d'environnement

| Variable | Où | Rôle |
| --- | --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | `.env`, au moment du build | Clé publique du widget Turnstile. Sans elle, le formulaire est désactivé |
| `TURNSTILE_SECRET_KEY` | `.dev.vars` en local, `wrangler secret put` en production | Clé secrète Turnstile, ne jamais la versionner |
| `CONTACT_DRY_RUN` | `.dev.vars` | `true` valide le formulaire sans envoyer d'e-mail |

Pour le développement local :

```bash
cp .env.example .env
cp .dev.vars.example .dev.vars
npm run dev:cloudflare
```

Les clés d'exemple sont des clés de test Cloudflare. `npm run deploy` refuse de continuer si une clé de test est utilisée.

## Déploiement

Voir [`docs/DEPLOIEMENT_CLOUDFLARE.md`](docs/DEPLOIEMENT_CLOUDFLARE.md) pour la configuration complète (DNS, Turnstile, Email Service, secrets). Le déploiement se fait avec :

```bash
PUBLIC_TURNSTILE_SITE_KEY="votre-site-key" npm run deploy
```

## Documentation

- [`docs/PLAN_SITE.md`](docs/PLAN_SITE.md) : feuille de route et positionnement ;
- [`docs/DEPLOIEMENT_CLOUDFLARE.md`](docs/DEPLOIEMENT_CLOUDFLARE.md) : mise en ligne du site et du formulaire ;
- [`docs/DEPLOIEMENT_OVH.md`](docs/DEPLOIEMENT_OVH.md) : ancienne option d'hébergement statique chez OVHcloud ;
- [`docs/PROJECT.md`](docs/PROJECT.md), [`docs/TNEXA_IDEAS.md`](docs/TNEXA_IDEAS.md) et [`docs/TNEGA_PLATEFORME_IA.md`](docs/TNEGA_PLATEFORME_IA.md) : notes de cadrage et idées de produits.

## Travailler avec Claude Code

- [`CLAUDE.md`](CLAUDE.md) donne à Claude Code le contexte du projet, ses conventions et ses commandes.
- `.claude/skills/` contient des skills de projet, détaillés dans [`.claude/skills/README.md`](.claude/skills/README.md).
