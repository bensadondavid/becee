import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import GridBackground from '@/utils/GridBackground';

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAFA] py-24 sm:py-32">
      <GridBackground />

      <div className="relative mx-auto max-w-3xl animate-fade-up px-6 text-center lg:px-8">
        <span className="mb-5 inline-block font-inter text-xs font-medium uppercase tracking-widest text-accent">
          — Commençons
        </span>

        <h2 className="mb-6 font-playfair text-3xl font-medium leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
          Prêt à donner vie à votre projet ?
        </h2>

        <p className="mb-10 font-inter text-base leading-relaxed text-muted-foreground">
          Discutons de vos besoins. Notre équipe vous propose un accompagnement personnalisé,
          du brief initial à la mise en production.
        </p>

        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-sm bg-foreground px-7 py-3 font-inter text-sm font-medium text-white transition-colors hover:bg-foreground/90"
          >
            Demander un devis gratuit
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-sm border border-[#E8E8E8] px-7 py-3 font-inter text-sm font-medium text-foreground transition-colors hover:border-foreground/30"
          >
            Explorer nos réalisations
          </Link>
        </div>
      </div>
    </section>
  );
}