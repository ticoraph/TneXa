# CLAUDE.md

Site vitrine de TneXa (`tnexa.fr`) : Astro 7 en mode statique, contenu en MDX, une Cloudflare Worker pour le formulaire de contact. Le site est écrit en français.

## Commandes

```bash
npm install            # dépendances
npm run dev            # serveur de développement
npm run check          # astro check (types + fichiers .astro) — à lancer avant chaque commit
npm test               # node --test worker/index.test.js
npm run build          # astro check puis astro build → dist/
npm run dev:cloudflare # build + wrangler dev (site et Worker ensemble)
```

Avant de considérer une modification terminée : `npm run check` et `npm test` doivent passer ; `npm run build` aussi si la modification touche aux pages, aux layouts ou à la configuration.

## Architecture

- `src/config.ts` : source unique du nom, de l'e-mail, de la description et de la navigation. Ne pas dupliquer ces valeurs dans les pages.
- `src/layouts/BaseLayout.astro` : `<head>` (titre, canonical, Open Graph, JSON-LD), lien d'évitement, en-tête et pied de page. `ContentLayout.astro` enveloppe les pages MDX et lit `title`, `description`, `eyebrow`, `intro` et `noindex` dans le frontmatter.
- `src/pages/` : le routage vient des fichiers. `.mdx` pour le texte éditorial, `.astro` pour les pages structurées (accueil, contact, réalisations, 404).
- `src/components/` : composants réutilisables, avec leurs styles `<style>` locaux.
- `src/styles/global.css` : variables CSS (`--ink`, `--paper`, `--lime`, `--mint`…) et styles communs. Réutiliser ces variables plutôt que de coder des couleurs en dur.
- `worker/index.js` : Worker qui ne traite que `/api/contact` et délègue le reste à `env.ASSETS`. Ses tests sont dans `worker/index.test.js`.
- `public/_headers` : politique de sécurité (CSP, etc.). Toute nouvelle ressource externe (script, police, iframe) doit y être autorisée explicitement.
- `wrangler.jsonc` : configuration Cloudflare (assets, e-mail verrouillé sur `contact@tnexa.fr`, limite de débit).
- `legacy/` et `docs/legacy/` : ancienne base React/Vite, archivée. Ne pas la modifier ni s'en servir comme modèle.

## Conventions

- Textes et commentaires en français, avec les accents et la typographie française (guillemets « », espaces avant `:`, `;`, `?`, `!`). Phrases courtes, ton concret, sans jargon inutile.
- Pas de barre oblique finale dans les URL (`trailingSlash: 'never'`) : écrire `/contact`, pas `/contact/`.
- Le contenu éditorial reste dans les `.mdx` ; la mise en forme reste dans les composants et `global.css`.
- Accessibilité : un seul `<h1>` par page, hiérarchie de titres continue, `aria-label` sur les liens d'icônes, focus visible, contraste suffisant, respect de `prefers-reduced-motion`.
- Référencement : chaque page a un `title` et une `description` propres ; les pages juridiques ou techniques peuvent passer `noindex`.
- TypeScript strict (`astro/tsconfigs/strict`). Les composants déclarent une interface `Props`.
- Pas de dépendance ajoutée sans raison forte : le site est volontairement léger, avec très peu de JavaScript côté client (menu mobile, formulaire).

## Formulaire de contact : points sensibles

- Ne jamais committer `.env`, `.dev.vars` ni une clé secrète. Seuls `.env.example` et `.dev.vars.example` (clés de test Cloudflare) sont versionnés.
- `PUBLIC_TURNSTILE_SITE_KEY` est publique ; `TURNSTILE_SECRET_KEY` s'enregistre avec `npx wrangler secret put`.
- `npm run deploy` s'exécute après `scripts/validate-production-config.mjs`, qui refuse les clés Turnstile de test.
- Toute modification de `worker/index.js` (validation, origine, limite de débit, Turnstile) doit s'accompagner d'un test dans `worker/index.test.js`.
- Ne pas élargir la destination des e-mails : elle est volontairement figée sur `contact@tnexa.fr`.

## Déploiement

Cloudflare Workers Static Assets, via `npm run deploy`. Procédure complète dans `docs/DEPLOIEMENT_CLOUDFLARE.md`. Ne pas déployer, ni modifier le DNS ou les secrets, sans demande explicite.

## Skills du projet

Les skills de `.claude/skills/` s'appliquent selon la tâche :

- `frontend-design` : création ou refonte d'une page, d'un composant ou de la direction visuelle. Respecter la charte existante (encre `#071b18`, papier `#f5f4ee`, accents citron et menthe) sauf demande contraire.
- `accessibility` : audit WCAG 2.2, clavier, lecteurs d'écran, formulaire.
- `seo` : balises méta, données structurées, sitemap, `robots.txt`.
- `workers-best-practices` : écriture ou revue de `worker/index.js` et de `wrangler.jsonc`.

Le détail de leur origine et de leur licence est dans `.claude/skills/README.md`.
