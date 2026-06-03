import { Zap, Fingerprint, MapPin, Server } from "lucide-react";
import SectionHeading from "../../utils/SectionHeading";

const differentiators = [
  {
    icon: Zap,
    title: "Rapidité d'exécution",
    description:
      "Livraison en 2 à 4 semaines. Notre méthodologie agile permet des itérations rapides sans sacrifier la qualité.",
  },
  {
    icon: Fingerprint,
    title: "100% sur mesure",
    description:
      "Aucun template. Chaque projet est conçu et développé spécifiquement pour votre activité et vos objectifs.",
  },
  {
    icon: MapPin,
    title: "Expertise marché local",
    description:
      "Nous connaissons le tissu économique français. Nos solutions sont pensées pour votre clientèle locale.",
  },
  {
    icon: Server,
    title: "Stack technique complète",
    description:
      "React, Node.js, PostgreSQL — nous maîtrisons l'intégralité de la chaîne technique pour des solutions robustes.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-[#FAFAFA] py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          badge="Pourquoi nous"
          title="Ce qui nous différencie"
          description="Notre équipe combine expertise technique et connaissance du marché français pour livrer des résultats mesurables."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((d, i) => (
            <div
              key={d.title}
              className="animate-fade-up text-center"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded border border-[#E8E8E8] bg-white">
                <d.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
              </div>

              <h3 className="mb-2 font-playfair text-lg font-medium text-foreground">
                {d.title}
              </h3>

              <p className="font-inter text-sm leading-relaxed text-muted-foreground">
                {d.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
