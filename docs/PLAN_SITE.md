# Plan du site TneXa

## 1. Objectif

Créer un site vitrine simple, rapide et crédible pour présenter TneXa, expliquer ses expertises et obtenir des prises de contact.

Le contenu doit rester facile à modifier sans toucher à la mise en page. Les textes éditoriaux seront donc écrits en Markdown ou en MDX, tandis que le design sera centralisé dans des composants réutilisables.

## 2. Recommandation technique

### Choix recommandé : Astro avec MDX

Le dépôt contient actuellement une base React/Vite presque vide. Comme il n'existe pas encore d'application à préserver, il est préférable de passer maintenant à Astro plutôt que de construire manuellement le routage et la gestion du contenu dans React.

Astro convient particulièrement bien à ce projet :

- les fichiers `.md` et `.mdx` peuvent devenir directement des pages ;
- les URL sont déduites de l'arborescence des fichiers ;
- les composants de mise en page restent séparés du contenu ;
- React peut être conservé uniquement pour les rares éléments interactifs ;
- le site peut être généré en HTML statique, ce qui favorise la rapidité, la fiabilité et le référencement ;
- une collection de contenus typée pourra être ajoutée plus tard pour les articles et les études de cas.

L'objectif n'est pas de créer un CMS dès maintenant. Git et les fichiers MDX suffisent pour la première version. Un CMS pourra être branché plus tard sans refaire le site si le besoin apparaît.

## 3. Positionnement proposé

### Promesse centrale

> TneXa conçoit des systèmes IA connectés à vos données, capables d'analyser, décider, agir et expliquer leurs résultats en langage naturel.

### Offre en trois étapes

1. **Diagnostiquer** — audit des données, des processus, des opportunités IA et de la visibilité numérique.
2. **Construire** — agents, automatisations, modèles de machine learning et intégrations.
3. **Opérer** — suivi en production, mesure des résultats, amélioration continue et support.

Pour la première version, il vaut mieux présenter TneXa comme une entreprise de services experte et conserver les noms TneGa, TneKa, TneMa, TneLa, TneRa et TneVa comme vision ou futurs produits. Les placer immédiatement au premier niveau risquerait de compliquer le message avant que les offres ne soient clairement établies.

## 4. Arborescence du MVP

### Accueil — `/`

- promesse principale et appel à l'action ;
- problèmes clients auxquels TneXa répond ;
- trois piliers : diagnostiquer, construire, opérer ;
- aperçu des expertises ;
- méthode en six étapes ;
- quelques références ou réalisations ;
- appel à prendre contact.

### Applications et agents IA — `/expertises/agents-ia`

- agents IA sur mesure ;
- automatisation de processus ;
- architecture multi-agents ;
- connecteurs MCP et intégration aux outils métier ;
- évaluation, sécurité et suivi en production.

### Data et machine learning — `/expertises/data-machine-learning`

- systèmes prédictifs ;
- recherche opérationnelle et optimisation ;
- computer vision ;
- data engineering ;
- méthode de mise en production.

### Réalisations — `/realisations`

- cartes synthétiques dans un premier temps ;
- une page MDX par étude de cas lorsque les contenus sont disponibles ;
- contexte, problème, intervention, résultat et technologies.

### À propos — `/a-propos`

- histoire et raison d'être de TneXa ;
- manière de travailler ;
- fondateur et partenaires ;
- principes : utilité, mesure, robustesse et transparence.

### Contact — `/contact`

- adresse électronique ;
- lien de prise de rendez-vous si disponible ;
- formulaire court : nom, entreprise, e-mail et besoin ;
- mentions sur l'utilisation des données du formulaire.

### Pages légales

- `/mentions-legales` ;
- `/confidentialite`.

### À ajouter après le MVP

- `/insights` pour des articles d'expertise ;
- pages détaillées des réalisations ;
- version anglaise ;
- pages dédiées aux futurs produits TneXa.

## 5. Organisation recommandée des fichiers

```text
src/
├── components/
│   ├── Callout.astro
│   ├── ContactCta.astro
│   ├── ExpertiseCard.astro
│   ├── MethodSteps.astro
│   └── ProjectCard.astro
├── content/
│   ├── insights/
│   └── realisations/
├── layouts/
│   ├── BaseLayout.astro
│   └── ContentLayout.astro
├── pages/
│   ├── index.astro
│   ├── a-propos.mdx
│   ├── contact.astro
│   ├── confidentialite.mdx
│   ├── mentions-legales.mdx
│   ├── expertises/
│   │   ├── agents-ia.mdx
│   │   └── data-machine-learning.mdx
│   └── realisations/
│       └── index.astro
└── styles/
    ├── global.css
    └── tokens.css

public/
├── images/
└── favicon.svg
```

Les pages très structurées comme l'accueil, la liste des réalisations et le formulaire de contact restent en `.astro`. Les pages principalement éditoriales sont en `.mdx`. Les séries de contenus répétables, comme les articles ou études de cas, utilisent des collections.

## 6. Modèle d'une page MDX

```mdx
---
layout: ../layouts/ContentLayout.astro
title: Applications et agents IA
description: TneXa conçoit des agents IA reliés à vos données et outils métier.
eyebrow: Expertise
order: 1
draft: false
---

import ContactCta from '../components/ContactCta.astro';

# Des agents IA conçus pour agir dans vos opérations

Texte d'introduction court, orienté vers le besoin du client.

## Ce que nous construisons

- Agents spécialisés
- Automatisations connectées
- Architectures multi-agents
- Évaluation et suivi en production

<ContactCta label="Parler de votre projet" />
```

Chaque page doit au minimum renseigner :

- `title` : titre affiché et balise de page ;
- `description` : résumé pour les moteurs de recherche et le partage ;
- `draft` : permet de préparer un contenu sans le publier.

## 7. Principes de contenu et de design

### Contenu

- commencer par les problèmes et les résultats clients, puis expliquer la technologie ;
- privilégier des phrases courtes et des exemples concrets ;
- éviter d'afficher des chiffres non vérifiables ;
- ne pas publier les références SKIPRI, WATT ou PulpFiction sans autorisation et contexte précis ;
- utiliser un seul appel à l'action principal : **Parler de votre projet**.

### Design

- identité sobre, technique et chaleureuse ;
- une couleur principale, une couleur d'accent et une gamme de gris ;
- typographie très lisible et largeur de texte limitée ;
- animations discrètes et jamais nécessaires à la compréhension ;
- composants accessibles au clavier, contrastes suffisants et formulaire clairement étiqueté ;
- priorité à la version mobile dès le départ.

## 8. Référencement et qualité

Le MVP doit inclure :

- un titre et une description uniques par page ;
- une URL canonique et les métadonnées de partage social ;
- `sitemap.xml` et `robots.txt` ;
- une image de partage par défaut ;
- des données structurées `Organization` et `ProfessionalService` si les informations légales sont disponibles ;
- une page 404 ;
- des images optimisées avec largeur et hauteur explicites ;
- un contrôle des liens, du rendu mobile et des performances avant mise en ligne.

## 9. Ordre de réalisation

### Phase 1 — Socle

1. Remplacer la coquille React/Vite par Astro.
2. Activer MDX.
3. Créer les styles globaux, les layouts et l'en-tête/pied de page.
4. Définir les métadonnées communes et le modèle de frontmatter.

### Phase 2 — MVP éditorial

1. Rédiger et intégrer l'accueil.
2. Transformer les notes existantes en deux pages d'expertise.
3. Créer les pages À propos, Réalisations et Contact.
4. Ajouter les pages légales lorsque les informations de l'entreprise sont disponibles.

### Phase 3 — Validation et mise en ligne

1. Vérifier le rendu sur mobile, tablette et ordinateur.
2. Tester l'accessibilité, les liens, le formulaire et les métadonnées.
3. Faire relire les contenus et valider les références clients.
4. Déployer le site et connecter le nom de domaine.

### Phase 4 — Enrichissement

1. Ajouter les collections `realisations` et `insights`.
2. Publier les premières études de cas.
3. Ajouter une version anglaise si elle sert une cible commerciale identifiée.
4. Mesurer les prises de contact et améliorer les pages les plus importantes.

## 10. Informations à réunir avant la mise en ligne

- logo ou préférence pour un logo typographique temporaire ;
- coordonnées publiques de TneXa ;
- informations légales de l'entreprise ;
- cible commerciale prioritaire ;
- deux ou trois problèmes clients représentatifs ;
- références publiables et résultats associés ;
- destination du formulaire de contact ;
- nom de domaine et solution d'hébergement souhaitée.

## 11. Définition du MVP terminé

Le MVP est prêt lorsque :

- les sept pages principales et légales sont accessibles ;
- le contenu peut être modifié dans les fichiers MDX sans changer les composants ;
- la navigation et le formulaire fonctionnent sur mobile et ordinateur ;
- chaque page possède ses métadonnées essentielles ;
- le site se construit sans erreur ;
- les informations légales et les références affichées ont été validées.
