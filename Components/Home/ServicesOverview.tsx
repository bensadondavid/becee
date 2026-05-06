import Link from 'next/link';
import { Globe, CalendarCheck, Layers, ArrowRight } from 'lucide-react';
import SectionHeading from '@/utils/SectionHeading';

const services = [
  {
    icon: Globe,
    title: 'Site Vitrine',
    description:
      'Un site professionnel qui reflète votre image et convertit vos visiteurs. Design sur mesure, SEO optimisé, performances maximales.',
    features: ['Design personnalisé', 'Responsive mobile', 'SEO intégré', 'Formulaire de contact'],
  },
  {
    icon: CalendarCheck,
    title: 'Système de Réservation',
    description:
      'Automatisez vos prises de rendez-vous avec un module de réservation intégré et un tableau de bord de gestion.',
    features: ['Calendrier en ligne', 'Paiement intégré', 'Notifications SMS/email', 'Gestion multi-services'],
  },
  {
    icon: Layers,
    title: 'Application Métier',
    description:
      'Des applications web sur mesure pour digitaliser et automatiser vos processus métier les plus complexes.',
    features: ['Tableau de bord', 'Gestion des données', 'Automatisation', 'API & intégrations'],
  },
];

export default function ServicesOverview() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          badge="Services"
          title="Des solutions adaptées à chaque besoin"
          description="Que vous ayez besoin d'une simple vitrine ou d'une application complexe, notre équipe conçoit la solution qui fera croître votre activité."
        />

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {services.map((service, i) => (
            <div
              key={service.title}
              className="group h-full rounded border border-[#E8E8E8] bg-white p-8 transition-all duration-300 hover:border-accent/40 animate-fade-up"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded border border-[#E8E8E8]">
                <service.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 font-playfair text-xl font-medium text-foreground">
                {service.title}
              </h3>

              <p className="mb-6 font-inter text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>

              <ul className="mb-7 space-y-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2.5 font-inter text-sm text-muted-foreground"
                  >
                    <div className="h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 font-inter text-xs font-medium uppercase tracking-wide text-foreground transition-colors hover:text-accent"
              >
                En savoir plus
                <ArrowRight className="h-3 w-3" strokeWidth={1.5} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}