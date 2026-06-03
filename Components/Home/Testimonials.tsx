import { Star } from "lucide-react";
import SectionHeading from "@/utils/SectionHeading";

const testimonials = [
  {
    quote:
      "Notre site vitrine a doublé nos demandes de devis en 3 mois. L'équipe a parfaitement compris notre métier et nos clients.",
    name: "Marie L.",
    role: "Gérante, Salon de coiffure",
    rating: 5,
  },
  {
    quote:
      "Le système de réservation en ligne a transformé notre organisation. Nous gagnons plus de 10 heures par semaine sur la gestion des rendez-vous.",
    name: "Thomas R.",
    role: "Directeur, Cabinet médical",
    rating: 5,
  },
  {
    quote:
      "L'application de gestion développée sur mesure a permis de digitaliser l'ensemble de nos processus. Un investissement rentabilisé en 6 mois.",
    name: "Sophie D.",
    role: "Co-fondatrice, PME logistique",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeading
          badge="Témoignages"
          title="Ce que nos clients disent"
          description="La satisfaction de nos clients est notre meilleure carte de visite."
        />

        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="h-full animate-fade-up rounded border border-[#E8E8E8] bg-white p-7"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="mb-5 flex gap-1">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-3.5 w-3.5 fill-accent text-accent"
                  />
                ))}
              </div>

              <p className="mb-7 font-inter text-sm leading-relaxed text-foreground/80 italic">
                “{t.quote}”
              </p>

              <div className="flex items-center gap-3 border-t border-[#E8E8E8] pt-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E8E8] font-playfair text-sm font-medium text-foreground">
                  {t.name.charAt(0)}
                </div>

                <div>
                  <div className="font-inter text-sm font-medium text-foreground">
                    {t.name}
                  </div>
                  <div className="font-inter text-xs text-muted-foreground">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
