# TneXa

Site vitrine de TneXa construit avec Astro et MDX.

## Développement

```bash
npm install
npm run dev
```

Le serveur local indique l'adresse à ouvrir dans le navigateur.

## Vérification et construction

```bash
npm run check
npm run build
```

Le site statique est généré dans `dist/`.

## Tests

```bash
npm test
```

Les tests couvrent la validation et la protection élémentaire du formulaire.

## Modifier le contenu

- les pages éditoriales se trouvent dans `src/pages/**/*.mdx` ;
- la page d'accueil et les pages structurées se trouvent dans `src/pages/**/*.astro` ;
- l'adresse e-mail et la navigation se trouvent dans `src/config.ts` ;
- les styles communs se trouvent dans `src/styles/global.css`.

Voir également :

- `Docs/PLAN_SITE.md` pour la feuille de route ;
- `Docs/DEPLOIEMENT_CLOUDFLARE.md` pour la mise en ligne du site et du formulaire ;
- `Docs/DEPLOIEMENT_OVH.md` pour l’ancienne option d’hébergement statique chez OVHcloud.
