# Déployer TneXa sur l'hébergement gratuit OVHcloud

> **Option historique uniquement.** L’implémentation actuelle du formulaire utilise une Cloudflare Worker. Un déploiement limité à l’hébergement OVHcloud gratuit afficherait correctement les pages, mais l’endpoint `/api/contact` ne fonctionnerait pas. Utiliser désormais `DEPLOIEMENT_CLOUDFLARE.md` pour le déploiement complet.

## Compatibilité

Le site est généré en fichiers statiques par Astro. Il n'a besoin ni de Node.js ni d'une base de données sur le serveur et peut donc être hébergé sur l'offre gratuite OVHcloud associée à un nom de domaine.

L'offre gratuite convient tant que le contenu généré reste sous la limite de stockage du compte et que le site n'a pas besoin d'un traitement serveur. Les articles et pages MDX sont transformés en HTML au moment de la construction du site.

## Avant le premier déploiement

1. Activer l'hébergement gratuit depuis l'espace client OVHcloud.
2. Créer l'adresse `contact@tnexa.fr` avec le compte e-mail inclus, ou modifier `src/config.ts` si une autre adresse doit être utilisée.
3. Compléter et faire valider les mentions légales et la politique de confidentialité.
4. Construire le site avec `npm run build`.
5. Vérifier que le dossier `dist/` reste inférieur à l'espace disponible.

## Mise en ligne par FTP

Après `npm run build`, envoyer **le contenu** du dossier `dist/` dans le dossier `www/` de l'hébergement OVHcloud. Le fichier `index.html` doit se trouver directement dans `www/`, et non dans `www/dist/`.

Les identifiants FTP sont disponibles dans l'e-mail d'activation et dans l'espace client OVHcloud.

## Formulaire de contact

L’offre gratuite OVHcloud ne peut pas exécuter la Cloudflare Worker utilisée par le formulaire. Si cette option d’hébergement est malgré tout retenue, le formulaire devra être remplacé par un lien `mailto:` ou connecté à un autre service de traitement.

## Mettre à jour le site

1. Modifier les fichiers `.mdx` ou les composants.
2. Exécuter `npm run build`.
3. Remplacer par FTP les fichiers présents dans `www/` par le nouveau contenu de `dist/`.

Une automatisation du déploiement pourra être ajoutée plus tard si l'offre OVHcloud choisie fournit un accès Git ou SSH adapté.
