# CLAUDE.md

Site vitrine de TneXa (`tnexa.fr`) : Astro 7 en mode statique, contenu en MDX. Le site est écrit en français.

## Commandes

```bash
npm install            # dépendances
npm run dev            # serveur de développement
npm run check          # astro check (types + fichiers .astro) — à lancer avant chaque commit
npm run build          # astro check puis astro build → dist/
npm run dev:cloudflare # build + wrangler dev
```

Avant de considérer une modification terminée : `npm run check` doit passer ; `npm run build` aussi si la modification touche aux pages, aux layouts ou à la configuration.

## Architecture

- `src/config.ts` : source unique du nom, de l'e-mail, de la description et de la navigation. Ne pas dupliquer ces valeurs dans les pages.
- `src/layouts/BaseLayout.astro` : `<head>` (titre, canonical, Open Graph, JSON-LD), lien d'évitement, en-tête et pied de page. `ContentLayout.astro` enveloppe les pages MDX et lit `title`, `description`, `eyebrow` et `intro` dans le frontmatter.
- `src/pages/` : le routage vient des fichiers. `.mdx` pour le texte éditorial, `.astro` pour les pages structurées (accueil, réalisations, 404).
- `src/components/` : composants réutilisables, avec leurs styles `<style>` locaux.
- `src/styles/global.css` : variables CSS (`--ink`, `--paper`, `--lime`, `--mint`…) et styles communs. Réutiliser ces variables plutôt que de coder des couleurs en dur.
- `public/_headers` : politique de sécurité (CSP, etc.). Toute nouvelle ressource externe (script, police, iframe) doit y être autorisée explicitement.
- `wrangler.jsonc` : configuration Cloudflare (assets statiques uniquement).

## Conventions

- Les décisions (les nôtres et celles de Raphaël) sont notées dans `docs/DECISIONS.md`. Ajouter une ligne à chaque choix qui engage la suite.
- `docs/SOMMAIRE.md` est la référence de la structure et du contenu du site.
- Textes et commentaires en français, avec les accents et la typographie française (guillemets « », espaces avant `:`, `;`, `?`, `!`). Phrases courtes, ton concret, sans jargon inutile.
- Voix du site (D-054) : aucune première personne, ni au pluriel (« nous », « on », « notre », « nos ») ni au singulier (« je », « j' », « mon », « ma », « mes »). Écrire de façon neutre : TneXa comme sujet (« TneXa conçoit… »), des tournures impersonnelles ou passives, et s'adresser au visiteur avec « vous ». Cela vaut aussi pour les descriptions dans `src/config.ts` et les pages `.astro`.
- Pas de barre oblique finale dans les URL (`trailingSlash: 'never'`) : écrire `/realisations`, pas `/realisations/`.
- Le contenu éditorial reste dans les `.mdx` ; la mise en forme reste dans les composants et `global.css`.
- Mobile First : le CSS de base vise 360 px, les écrans larges s'ajoutent avec `@media (min-width: …)`. Pas de `max-width` dans les médias.
- Accessibilité : un seul `<h1>` par page, hiérarchie de titres continue, `aria-label` sur les liens d'icônes, focus visible, contraste suffisant, respect de `prefers-reduced-motion`.
- Référencement : le site est volontairement invisible des moteurs de recherche et des IA (D-032). `BaseLayout` émet `noindex` sur toutes les pages, `public/_headers` ajoute `X-Robots-Tag`, `public/robots.txt` interdit tous les robots. Ne pas rouvrir l'indexation (ni ajouter de sitemap) sans demande explicite. Chaque page garde un `title` et une `description` propres.
- TypeScript strict (`astro/tsconfigs/strict`). Les composants déclarent une interface `Props`.
- Pas de dépendance ajoutée sans raison forte : le site est volontairement léger, avec très peu de JavaScript côté client (menu mobile).

## Déploiement

Cloudflare Workers Static Assets, via `npm run deploy`. Procédure complète dans `docs/DEPLOIEMENT_CLOUDFLARE.md`. Ne pas déployer, ni modifier le DNS, sans demande explicite.

## Skills du projet

Les skills de `.claude/skills/` s'appliquent selon la tâche :

- `frontend-design` : création ou refonte d'une page, d'un composant ou de la direction visuelle. Respecter la charte existante (encre `#071b18`, papier `#f5f4ee`, accents citron et menthe) sauf demande contraire.
- `mobile-first` : toute page, tout composant, tout CSS. Le site est Mobile First : base à 360 px, `min-width` uniquement, cibles tactiles de 44 px, champs à 16 px.
- `accessibility` : audit WCAG 2.2, clavier, lecteurs d'écran.
- `workers-best-practices` : revue de `wrangler.jsonc`.

Le détail de leur origine et de leur licence est dans `.claude/skills/README.md`.
