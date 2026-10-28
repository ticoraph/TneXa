---
name: logos
description: Ajouter, remplacer ou retirer un logo de technologie sur la page Technologies de TneXa. À utiliser quand on ajoute une techno à `src/data/technologies.ts`, quand un logo manque ou paraît incorrect, ou pour récupérer des logos SVG de marques (« logo », « icône », « Simple Icons », « SVG »).
---

# Logos de la page Technologies

La page `/technologies` affiche une pastille par technologie. Le logo est facultatif : sans logo, seul le nom s'affiche. Ne jamais dessiner ni inventer un logo.

## Fonctionnement

- Les données sont dans `src/data/technologies.ts` : un groupe par domaine, une entrée `{ name, logo? }`.
- `logo` est le nom d'un fichier de `src/assets/logos/` (sans `.svg`).
- `scripts/fetch-logos.mjs` contient la table « fichier local → source » et télécharge les SVG. Il les normalise : titre retiré, `fill="currentColor"`, `aria-hidden="true"`. Le CSS les colore donc avec la charte (`--ink`).
- Les SVG sont committés. Le site ne dépend d'aucun service externe à l'exécution (voir la CSP dans `public/_headers`).

## Sources, dans l'ordre

1. **Simple Icons** (`si`) : https://simpleicons.org, licence CC0, SVG monochromes homogènes. Vérifier un nom : `curl -s -o /dev/null -w "%{http_code}" https://cdn.jsdelivr.net/npm/simple-icons@<version>/icons/<nom>.svg`. 200 = existe.
2. **LobeHub Icons** (`lobe`) : https://lobehub.com/icons, licence MIT, marques d'IA (Langfuse, Unsloth, vLLM…) et AWS, absent de Simple Icons.
3. Autre source (Iconify, `svgl.app`, page « brand » officielle) : seulement si le SVG est **monochrome** (une seule couleur, sans dégradé). Un logo multicolore ou en dégradé n'est pas compatible avec `currentColor` : laisser la pastille sans logo plutôt que de le déformer.

## Ajouter un logo

1. Trouver le nom du logo chez la source (voir ci-dessus).
2. Ajouter une ligne à `logos` dans `scripts/fetch-logos.mjs` : `nom: ['si', 'nom-chez-la-source']`.
3. Lancer `node scripts/fetch-logos.mjs nom` (sans argument, tous les logos sont retéléchargés).
4. Ajouter `logo: 'nom'` à l'entrée dans `src/data/technologies.ts`.
5. `npm run check`, puis regarder la page : le logo doit être lisible à 20 px, d'une seule couleur.

Un fichier manquant fait échouer le build avec le nom de la technologie concernée.

## Règles

- Les versions de `simple-icons` et `@lobehub/icons-static-svg` sont épinglées dans le script : les changer en connaissance de cause (un logo peut être retiré ou redessiné d'une version à l'autre).
- Les logos appartiennent à leurs marques. La page le dit en bas ; ne pas le retirer.
- Pas de logo pour un concept (RAG, RGPD, API REST…) ni pour une technologie sans marque identifiable.
- Pas de dépendance npm ajoutée pour les icônes : on télécharge les fichiers, on ne les importe pas depuis un paquet.
