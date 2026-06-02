import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Becee : notre histoire, nos valeurs et notre méthodologie. Une agence web dédiée à la réussite digitale des PME et indépendants français.',
  openGraph: {
    title: 'À propos | Becee',
    description: 'Notre histoire, nos valeurs et notre méthodologie au service de votre projet web.',
    url: '/a-propos',
  },
};

import { Target, Heart, Shield, Lightbulb, Search, PenTool, Code2, Rocket, Palette, BarChart3, Headphones } from 'lucide-react';
import SectionHeading from '@/utils/SectionHeading';
import AnimatedCard from '@/utils/AnimatedCard';
import GridBackground from '@/utils/GridBackground';
import CTABanner from '@/components/Home/CTABanner';

const values = [
  { icon: Target, title: 'Excellence technique', description: 'Nous utilisons les technologies les plus performantes et appliquons les meilleures pratiques de développement à chaque projet.' },
  { icon: Heart, title: 'Engagement client', description: 'La réussite de votre projet est notre priorité. Nous construisons des relations de confiance à long terme avec chaque client.' },
  { icon: Shield, title: 'Transparence totale', description: 'Communication claire, devis détaillés, suivi en temps réel. Vous avez une visibilité complète à chaque étape.' },
  { icon: Lightbulb, title: 'Innovation pragmatique', description: 'Nous innovons quand cela apporte une valeur réelle à votre activité, pas pour la technologie en soi.' },
];

const methodology = [
  { step: '01', icon: Search, title: 'Découverte & Analyse', description: 'Nous analysons vos besoins, votre marché et vos objectifs pour définir la solution la plus adaptée.' },
  { step: '02', icon: PenTool, title: 'Conception & Design', description: "Maquettes et prototypes interactifs pour valider l'expérience utilisateur avant le moindre code." },
  { step: '03', icon: Code2, title: 'Développement', description: 'Développement itératif avec des livraisons régulières. Vous testez et validez à chaque sprint.' },
  { step: '04', icon: Rocket, title: 'Lancement & Support', description: 'Mise en production, formation et accompagnement. Nous restons à vos côtés après le lancement.' },
];

const team = [
  { icon: Code2, role: 'Développeurs Full-Stack', description: "React, Node.js, TypeScript — notre cœur technique qui donne vie à vos projets." },
  { icon: Palette, role: 'Designers UI/UX', description: 'Interfaces élégantes et expériences utilisateur intuitives, pensées pour la conversion.' },
  { icon: BarChart3, role: 'Stratèges Digitaux', description: 'SEO, performance et croissance — chaque décision est guidée par vos objectifs business.' },
  { icon: Headphones, role: 'Support & Accompagnement', description: 'Réactivité et disponibilité pour assurer le bon fonctionnement de vos solutions.' },
];

const stats = [
  { value: '50+', label: 'Projets livrés' },
  { value: '98%', label: 'Taux de satisfaction' },
  { value: '< 4 sem.', label: 'Délai moyen' },
  { value: '5 ans', label: "D'expérience cumulée" },
];

const story = [
  "Becee est né d'un constat simple : trop de PME et de commerçants en France se contentent de solutions digitales génériques qui ne reflètent ni leur identité ni leurs ambitions.",
  "Notre équipe s'est constituée autour d'une mission commune — rendre accessible aux entreprises françaises le niveau de qualité technique habituellement réservé aux grandes structures. Nous combinons expertise en développement web moderne, sensibilité design et connaissance approfondie du tissu économique local.",
  "Aujourd'hui, notre agence accompagne des dizaines d'entreprises dans leur transformation digitale, du site vitrine à l'application métier complexe. Chaque projet est une nouvelle opportunité de prouver qu'un investissement digital bien pensé génère des résultats concrets et mesurables.",
];

export default function AboutPage() {
  return (
    <div className="pt-16 bg-white">
      {/* Story */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <GridBackground />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading badge="Notre histoire" title="Une agence née d'une conviction" />
          <div className="max-w-3xl mx-auto">
            <AnimatedCard>
              <div className="border border-[#E8E8E8] rounded p-8 sm:p-10 bg-white space-y-5">
                {story.map((p, i) => (
                  <p key={i} className="font-inter text-sm text-muted-foreground leading-relaxed">{p}</p>
                ))}
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading badge="Nos valeurs" title="Ce qui guide chacune de nos décisions" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimatedCard key={v.title} delay={i * 0.1}>
                <div className="h-full border border-[#E8E8E8] rounded p-6 bg-white hover:border-accent/30 transition-colors">
                  <div className="w-10 h-10 border border-[#E8E8E8] rounded flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-lg font-medium mb-2 text-foreground">{v.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Méthodologie"
            title="Notre processus de travail éprouvé"
            description="Un processus clair et structuré pour garantir le succès de votre projet, de la première idée à la mise en production."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((m, i) => (
              <AnimatedCard key={m.step} delay={i * 0.12}>
                <div className="relative h-full border border-[#E8E8E8] rounded p-6 bg-white">
                  <span className="font-playfair text-5xl font-medium text-[#F0EBE3] absolute top-4 right-5 select-none">
                    {m.step}
                  </span>
                  <div className="w-10 h-10 border border-[#E8E8E8] rounded flex items-center justify-center mb-4">
                    <m.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-lg font-medium mb-2 text-foreground">{m.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{m.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 sm:py-28 bg-[#FAFAFA]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="L'équipe"
            title="Des profils complémentaires au service de vos projets"
            description="Notre force réside dans la diversité des expertises de notre équipe. Chaque projet bénéficie d'un accompagnement pluridisciplinaire."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <AnimatedCard key={member.role} delay={i * 0.1}>
                <div className="text-center h-full border border-[#E8E8E8] rounded p-7 bg-white hover:border-accent/30 transition-colors">
                  <div className="w-14 h-14 border border-[#E8E8E8] rounded flex items-center justify-center mx-auto mb-5">
                    <member.icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-playfair text-base font-medium mb-2 text-foreground">{member.role}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{member.description}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="py-20 sm:py-24 bg-white border-t border-[#E8E8E8]">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-x divide-[#E8E8E8]">
            {stats.map((stat, i) => (
              <AnimatedCard key={stat.label} delay={i * 0.1}>
                <div className="text-center py-6 px-4">
                  <div className="font-playfair text-4xl sm:text-5xl font-medium text-accent mb-1.5">{stat.value}</div>
                  <div className="font-inter text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}