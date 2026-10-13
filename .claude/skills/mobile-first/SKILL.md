---
name: mobile-first
description: Conception et revue d'interfaces Mobile First pour TneXa. À utiliser pour créer ou modifier une page, un composant, le menu, un formulaire ou du CSS, et pour vérifier le rendu sur téléphone (« mobile », « responsive », « tactile », « petit écran »).
---

# Mobile First (TneXa)

Le site est pensé pour le téléphone d'abord. Le bureau est une amélioration, pas la base.

## 1. Règles de CSS

- **Écrire le CSS de base pour 360 px.** Les écrans plus grands s'ajoutent avec `@media (min-width: …)`. Ne jamais écrire `max-width` dans un média : c'est du desktop-first.
- Points de rupture, dans cet ordre : `40rem` (≈ 640 px, grand mobile), `56rem` (≈ 900 px, tablette), `75rem` (≈ 1200 px, bureau). Ne pas en inventer d'autres.
- Une colonne par défaut. Passer à `grid-template-columns` multiples seulement dans un `min-width`.
- Marges latérales de 1rem au minimum. Aucun défilement horizontal à 320 px.
- Tailles de texte fluides avec `clamp()`. Corps de texte à 1rem au minimum, jamais en dessous de 0,875rem, même pour une note.
- Hauteurs : `min-height: 100svh` (pas `100vh`, qui déborde derrière la barre d'adresse mobile). Ne pas bloquer un bloc de texte à une hauteur fixe.
- Utiliser `env(safe-area-inset-bottom)` pour tout élément collé en bas d'écran.
- Réutiliser les variables de `src/styles/global.css` (`--ink`, `--paper`, `--lime`, `--mint`, `--space-*`).

## 2. Toucher, pouce, lisibilité

- **Cible tactile : 44 × 44 px minimum** (boutons, liens de menu, cases, puces de choix). Espacer les cibles d'au moins 0,5rem.
- **Champs de formulaire à 16 px minimum** : en dessous, iOS zoome sur le champ.
- Les actions principales se placent dans la zone du pouce (bas de l'écran) : bouton « Suivant », « Envoyer », bouton « Prendre RDV ».
- Rien ne dépend du survol. Tout ce qui apparaît au `:hover` doit aussi apparaître au focus et au toucher.
- Pas de texte justifié, lignes de 60 à 75 caractères au plus.
- Utiliser les bons `type` et `inputmode` : `email`, `tel`, `autocomplete="name|email|tel|organization"`.
- Les liens téléphone et e-mail sont des vrais liens : `tel:+33…` et `mailto:`.

## 3. Contenu d'abord

- Une idée par écran. Un titre court, une phrase, une action.
- L'ordre du HTML est l'ordre de lecture sur mobile. Ne pas réordonner avec `order` pour le bureau sauf besoin réel.
- Un seul appel à l'action principal par écran. Les liens secondaires sont des liens texte.
- Les tableaux deviennent des listes ou des cartes. Les grilles de cartes deviennent une pile.
- Les décors (orbites, dégradés, motifs) sont facultatifs : masqués ou simplifiés sur mobile s'ils gênent la lecture ou le poids.

## 4. Menu et navigation

- Menu mobile plein écran, ouvert par un bouton de 44 px, avec `aria-expanded`, fermeture à `Échap` et au clic sur un lien.
- Sous-menus dépliables avec `<details>` : fonctionne sans JavaScript.
- « Prendre RDV » reste visible dans le menu ouvert et dans l'en-tête.
- Verrouiller le défilement de la page quand le menu est ouvert.

## 5. Performance (réseau mobile)

- Pas de dépendance ni de police web ajoutée. Pas d'image sans `width`, `height` et `loading="lazy"` (sauf la première image visible).
- Peu de JavaScript : menu et formulaire uniquement. Les animations utilisent `transform` et `opacity`, et respectent `prefers-reduced-motion`.
- Viser un LCP sous 2,5 s sur réseau 4G moyen.

## 6. Vérifier avant de terminer

1. `<meta name="viewport" content="width=device-width, initial-scale=1">` présent.
2. Aucun `max-width` dans les médias, aucun défilement horizontal à 320, 360 et 390 px.
3. Cibles tactiles ≥ 44 px, champs ≥ 16 px.
4. Page testée dans le navigateur à **360 px**, puis **768 px**, puis **1280 px**, dans cet ordre (outil `resize_window` de Claude in Chrome, ou les outils de développement).
5. Navigation au clavier, focus visible, `prefers-reduced-motion` respecté (voir la skill `accessibility`).
6. `npm run check` et `npm run build` passent.

## Voir aussi

- `frontend-design` : direction visuelle (garder la charte encre / papier / citron / menthe).
- `accessibility` : WCAG 2.2, clavier, lecteurs d'écran, formulaire.
