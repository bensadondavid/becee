'use client';

import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import SectionHeading from '@/utils/SectionHeading';
import GridBackground from '@/utils/GridBackground';

const categories = [
  { id: 'all', label: 'Tous' },
  { id: 'vitrine', label: 'Vitrine' },
  { id: 'app', label: 'Application' },
  { id: 'e-commerce', label: 'E-commerce' },
] as const;

const projects = [
  {
    title: 'Maison Dupont — Boulangerie artisanale',
    category: 'vitrine',
    description:
      'Site vitrine moderne pour une boulangerie artisanale parisienne. Présentation des produits, horaires et localisation avec une identité visuelle chaleureuse.',
    tech: ['React', 'Tailwind CSS', 'Vercel'],
    bg: 'bg-[#F7F3EE]',
  },
  {
    title: 'Cabinet Santé+ — Gestion de rendez-vous',
    category: 'app',
    description:
      'Application de gestion de rendez-vous en ligne pour un cabinet pluridisciplinaire. Agenda partagé, rappels automatiques et paiement intégré.',
    tech: ['Next.js', 'PostgreSQL', 'Stripe', 'Prisma'],
    bg: 'bg-[#EEF1F7]',
  },
  {
    title: 'Les Jardins de Marie — Pépinière en ligne',
    category: 'e-commerce',
    description:
      'Boutique en ligne complète pour une pépinière locale. Catalogue produits, panier, paiement sécurisé et gestion des stocks.',
    tech: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    bg: 'bg-[#EEF7EE]',
  },
  {
    title: 'AutoÉcole Pro — Plateforme de gestion',
    category: 'app',
    description:
      'Application métier complète pour une auto-école : planning des moniteurs, suivi des élèves, réservation de créneaux et facturation automatisée.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    bg: 'bg-[#F7F0EE]',
  },
  {
    title: 'Bistrot du Marché — Restaurant',
    category: 'vitrine',
    description:
      'Site vitrine avec menu interactif et système de réservation pour un restaurant bistronomique. Photos immersives et carte mise à jour en temps réel.',
    tech: ['React', 'Tailwind CSS', 'Node.js'],
    bg: 'bg-[#F5EEF7]',
  },
  {
    title: 'UrbanFit — Salle de sport connectée',
    category: 'app',
    description:
      'Application de réservation de cours, suivi des abonnements et tableau de bord pour les coachs. Interface mobile-first pour les adhérents.',
    tech: ['Next.js', 'Prisma', 'Stripe', 'TypeScript'],
    bg: 'bg-[#EEEEF7]',
  },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <main className="bg-white pt-16">
      <section className="relative overflow-hidden py-20 sm:py-28">
        <GridBackground />

        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <SectionHeading
            badge="Portfolio"
            title="Nos réalisations"
            description="Découvrez une sélection de projets livrés pour des entreprises françaises. Chaque solution est unique, conçue et développée sur mesure."
          />

          <div className="mb-12 flex flex-wrap justify-center gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={[
                    'rounded-sm px-5 py-1.5 font-inter text-sm transition-all',
                    isActive
                      ? 'bg-foreground text-white'
                      : 'border border-[#E8E8E8] text-muted-foreground hover:border-foreground/30 hover:text-foreground',
                  ].join(' ')}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.title}
                className="group flex h-full flex-col overflow-hidden rounded border border-[#E8E8E8] bg-white transition-all duration-300 hover:border-accent/30"
              >
                <div
                  className={`relative flex h-40 items-center justify-center ${project.bg}`}
                >
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(45deg, #C9A96E 0px, #C9A96E 1px, transparent 1px, transparent 40px)',
                    }}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3">
                    <span className="rounded-sm border border-[#E8E8E8] px-2 py-1 font-inter text-[10px] uppercase tracking-widest text-muted-foreground">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mb-2 font-playfair text-lg font-medium text-foreground">
                    {project.title}
                  </h3>

                  <p className="mb-4 flex-1 font-inter text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-sm bg-[#F5F5F5] px-2 py-0.5 font-inter text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-sm border border-[#E8E8E8] py-2 font-inter text-sm text-foreground transition-colors hover:border-foreground/30"
                  >
                    Voir le projet
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}