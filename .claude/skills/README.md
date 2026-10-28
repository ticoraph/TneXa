# Skills du projet

Skills téléchargés depuis des dépôts publics et placés ici pour que Claude Code les charge automatiquement dans ce projet. Ils ont été relus avant installation : ils ne contiennent que des consignes en Markdown, aucun script exécutable.

| Skill | Usage dans TneXa | Origine | Licence |
| --- | --- | --- | --- |
| `frontend-design` | Direction visuelle, typographie, nouvelles pages et composants | [anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Apache 2.0 (`LICENSE.txt`) |
| `accessibility` | Audit WCAG 2.2, navigation au clavier, formulaire de contact | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills/tree/main/skills/accessibility) | MIT |
| `seo` | Balises méta, canonical, JSON-LD, sitemap, `robots.txt` | [addyosmani/web-quality-skills](https://github.com/addyosmani/web-quality-skills/tree/main/skills/seo) | MIT |
| `workers-best-practices` | `worker/index.js` et `wrangler.jsonc` | [cloudflare/skills](https://github.com/cloudflare/skills/tree/main/skills/workers-best-practices) | Apache 2.0 |
| `mobile-first` | Règles Mobile First : CSS `min-width`, cibles tactiles, menu mobile, formulaires, vérification à 360 px | Écrit pour TneXa (D-012 dans `docs/DECISIONS.md`) | Propre au projet |
| `logos` | Ajout et remplacement des logos de la page Technologies (`scripts/fetch-logos.mjs`) | Écrit pour TneXa (D-053 dans `docs/DECISIONS.md`) | Propre au projet |

## Mise à jour

Chaque skill est un dossier copié tel quel (`SKILL.md` et éventuel dossier `references/`). Pour le mettre à jour, remplacer son contenu par la version du dépôt d'origine, en relisant le diff avant de committer.

Modifications locales : les liens vers les skills `web-quality-audit` et `core-web-vitals`, non installés, ont été retirés des listes « Voir aussi » de `accessibility` et `seo`.

## Skills écartés

- `turnstile-spin` (Cloudflare) : le formulaire est déjà protégé par Turnstile, et ce skill pilote des scripts qui créent des ressources sur le compte Cloudflare.
- `web-quality-audit`, `performance`, `core-web-vitals` (Addy Osmani) : à ajouter si des audits Lighthouse réguliers sont souhaités.
