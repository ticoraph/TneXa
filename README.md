# TneXa

Site vitrine de [TneXa](https://tnexa.fr), entreprise individuelle spécialisée dans les systèmes d'intelligence artificielle connectés aux données des clients : agents IA, automatisation, data science et machine learning.

Le site est statique (Astro + MDX). Il n'y a ni formulaire de contact ni code serveur.

## Stack

| Besoin | Outil |
| --- | --- |
| Génération du site | [Astro](https://astro.build) 7 en mode `static`, sans barre oblique finale |
| Contenu éditorial | MDX (`@astrojs/mdx`) |
| Référencement | Aucun : site fermé aux moteurs et aux IA (`noindex`, `robots.txt`, `X-Robots-Tag`) |
| Hébergement | Cloudflare Workers Static Assets |

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
| `npm run dev:cloudflare` | Build puis exécution locale avec Wrangler (site) |
| `npm run deploy` | Construit et déploie avec Wrangler |

## Structure du dépôt

```text
src/
  config.ts          nom, e-mail, description et navigation
  layouts/           BaseLayout (balises <head>, en-tête, pied de page) et ContentLayout (pages MDX)
  components/        composants réutilisables (cartes, étapes…)
  pages/             une page par fichier : .astro (structurées) ou .mdx (éditoriales)
  styles/global.css  variables de design et styles communs
public/              favicon, robots.txt et en-têtes de sécurité (_headers)
docs/                plan du site, guides de déploiement, notes de projet
```

## Modifier le contenu

- les pages éditoriales se trouvent dans `src/pages/**/*.mdx` ; leur en-tête (frontmatter) fournit `title`, `description`, `eyebrow` et `intro` ;
- la page d'accueil et les pages structurées se trouvent dans `src/pages/**/*.astro` ;
- l'adresse e-mail, la description et la navigation se trouvent dans `src/config.ts` ;
- les couleurs, les espacements et les styles communs se trouvent dans `src/styles/global.css`.

## Déploiement

Voir [`docs/DEPLOIEMENT_CLOUDFLARE.md`](docs/DEPLOIEMENT_CLOUDFLARE.md) pour la configuration complète (DNS, domaine). Le déploiement se fait avec :

```bash
npm run deploy
```

## Documentation

- [`docs/PLAN_SITE.md`](docs/PLAN_SITE.md) : feuille de route et positionnement ;
- [`docs/DEPLOIEMENT_CLOUDFLARE.md`](docs/DEPLOIEMENT_CLOUDFLARE.md) : mise en ligne du site ;
- [`docs/DEPLOIEMENT_OVH.md`](docs/DEPLOIEMENT_OVH.md) : ancienne option d'hébergement statique chez OVHcloud ;
- [`docs/PROJECT.md`](docs/PROJECT.md), [`docs/TNEXA_IDEAS.md`](docs/TNEXA_IDEAS.md) et [`docs/TNEGA_PLATEFORME_IA.md`](docs/TNEGA_PLATEFORME_IA.md) : notes de cadrage et idées de produits.

## Travailler avec Claude Code

- [`CLAUDE.md`](CLAUDE.md) donne à Claude Code le contexte du projet, ses conventions et ses commandes.
- `.claude/skills/` contient des skills de projet, détaillés dans [`.claude/skills/README.md`](.claude/skills/README.md).
