// app/services/page.tsx  (ou pages/services.tsx si tu es en Pages Router)

import Link from 'next/link';
import { Globe, CalendarCheck, Layers, Check, ArrowRight } from 'lucide-react';
import SectionHeading from '@/utils/SectionHeading';
import AnimatedCard from '@/utils/AnimatedCard';
import GridBackground from '@/utils/GridBackground';
import ServicesFootnote from '@/utils/ServicesFootnote';

const tiers = [
  {
    icon: Globe,
    name: 'Vitrine',
    subtitle: 'Site vitrine professionnel',
    description:
      'Le site idéal pour présenter votre activité, gagner en crédibilité et attirer de nouveaux clients via Google.',
    features: [
      'Design sur mesure et responsive',
      "Jusqu'à 5 pages",
      'Optimisation SEO complète',
      'Formulaire de contact',
      'Intégration Google Maps',
      'Hébergement et nom de domaine',
      'Formation à la prise en main',
      'Support technique 3 mois',
    ],
    popular: false,
  },
  {
    icon: CalendarCheck,
    name: 'Réservation',
    subtitle: 'Site + module de réservation',
    description:
      'Automatisez vos prises de rendez-vous avec un système de réservation en ligne intégré à votre site.',
    features: [
      'Tout le pack Vitrine inclus',
      'Calendrier de réservation en ligne',
      'Paiement en ligne (Stripe)',
      'Rappels automatiques email/SMS',
      'Tableau de bord de gestion',
      'Gestion multi-services',
      'Synchronisation Google Calendar',
      'Support technique 6 mois',
    ],
    popular: true,
  },
  {
    icon: Layers,
    name: 'Application Métier',
    subtitle: 'Application web sur mesure',
    description:
      'Une application web conçue spécifiquement pour digitaliser et optimiser vos processus métier.',
    features: [
      'Analyse des besoins approfondie',
      'Architecture sur mesure',
      'Interface utilisateur dédiée',
      'Base de données PostgreSQL',
      'API RESTful complète',
      'Gestion des droits utilisateurs',
      'Intégrations tierces (CRM, ERP…)',
      'Support et maintenance sur mesure',
    ],
    popular: false,
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="pt-16 bg-white">
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <GridBackground />
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Nos offres"
            title="Des solutions pour chaque étape de croissance"
            description="Choisissez la formule adaptée à vos besoins. Chaque projet est développé sur mesure, sans template, par notre équipe technique."
          />

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {tiers.map((tier, i) => (
              <AnimatedCard key={tier.name} delay={i * 0.12}>
                <div
                  className={`relative h-full border rounded p-7 flex flex-col bg-white transition-all duration-300 ${
                    tier.popular
                      ? 'border-accent/50 shadow-[0_2px_24px_0_rgba(201,169,110,0.12)]'
                      : 'border-[#E8E8E8] hover:border-accent/30'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-7">
                      <span className="font-inter px-3 py-1 text-[10px] tracking-widest uppercase font-medium bg-accent text-white rounded-sm">
                        Le plus demandé
                      </span>
                    </div>
                  )}

                  <div className="w-10 h-10 border border-[#E8E8E8] rounded flex items-center justify-center mb-6">
                    <tier.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-playfair text-2xl font-medium text-foreground">{tier.name}</h3>
                  <p className="font-inter text-xs text-muted-foreground mt-1 mb-3 tracking-wide">{tier.subtitle}</p>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-6">{tier.description}</p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 font-inter text-sm">
                        <Check className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" strokeWidth={2} />
                        <span className="text-foreground/75">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className={`w-full py-2.5 font-inter text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 ${
                      tier.popular
                        ? 'bg-foreground text-white hover:bg-foreground/90'
                        : 'border border-[#E8E8E8] text-foreground hover:border-foreground/30'
                    }`}
                  >
                    Demander un devis
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </Link>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <ServicesFootnote />
        </div>
      </section>
    </div>
  );
}