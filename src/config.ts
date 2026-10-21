export interface NavChild {
  label: string;
  href: string;
  description: string;
  /** Mention courte affichée sur la fiche, par exemple l'état d'avancement. */
  tag?: string;
  /** Numéro (1 à 5) de la phase du cycle R&D où en est le projet. */
  phase?: number;
  product?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  /** Libellé du lien vers la fiche suivante, en bas des fiches de la rubrique. */
  nextLabel?: string;
  children?: NavChild[];
}

/** Cycle d'un projet de R&D, dans l'ordre. */
export const rdPhases = ['Imaginer', 'Définir', 'Développer', 'Implémenter', 'Lancer'] as const;

export const siteConfig = {
  name: 'TneXa',
  founder: 'Raphaël Montico',
  email: 'contact@tnexa.fr',
  description:
    "TneXa conçoit des systèmes d'intelligence artificielle connectés à vos données, capables d'analyser, décider, agir et expliquer leurs résultats.",
  navigation: [
    {
      label: 'Réalisations',
      href: '/realisations',
      description: 'Des produits construits de bout en bout, déjà en ligne.',
      nextLabel: 'Réalisation suivante',
      children: [
        {
          label: 'SkiPri',
          href: '/realisations/skipri',
          description: 'Comparer les forfaits de ski de toutes les stations.',
        },
        {
          label: 'SurPri',
          href: '/realisations/surpri',
          description: 'Choisir sa voiture électrique avec des agents IA.',
        },
        {
          label: 'PulpFiction',
          href: '/realisations/pulpfiction',
          description: 'La collection Pulp Fiction, en ligne.',
        },
        {
          label: 'Joule',
          href: '/realisations/joule',
          description: 'Suivre et prévoir sa consommation d’électricité.',
        },
        {
          label: 'Mesh',
          href: '/realisations/mesh',
          description: 'Le catalogue de toutes vos applications.',
        },
      ],
    },
    {
      label: 'Produits',
      href: '/produits',
      description: 'Un savoir-faire, packagé en produits.',
      children: [
        {
          label: 'Plateforme IA TneGa',
          href: '/produits/tnega',
          description: 'aGenT à l’envers. Vos agents IA, installés chez vous.',
          product: true,
        },
      ],
    },
    {
      label: 'Recherche & Développement',
      href: '/recherche-developpement',
      description: 'Ce que j’explore aujourd’hui pour livrer demain.',
      nextLabel: 'Projet suivant',
      children: [
        {
          label: '3842',
          href: '/recherche-developpement/3842',
          description: 'Lire la neige sur les webcams de montagne.',
          phase: 2,
        },
        {
          label: 'Replic',
          href: '/recherche-developpement/replic',
          description: 'Discuter avec un personnage de film.',
          phase: 4,
        },
        {
          label: 'Operant',
          href: '/recherche-developpement/operant',
          description: 'Agents autonomes et paiements programmables.',
          phase: 1,
        },
        {
          label: 'BeeDoo',
          href: '/recherche-developpement/beedoo',
          description: 'Un robot de compagnie pour les personnes âgées.',
          phase: 3,
        },
      ],
    },
  ] as NavItem[],
};

/** Retrouve une entrée du menu par son adresse, pour construire les pages de liste. */
export function getNavItem(href: string): NavItem {
  const item = siteConfig.navigation.find((entry) => entry.href === href);
  if (!item) throw new Error(`Entrée de navigation introuvable : ${href}`);
  return item;
}
