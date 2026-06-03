import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site Becee : éditeur, hébergeur, propriété intellectuelle et droit applicable.",
  robots: { index: false, follow: false },
};

import GridBackground from "@/utils/GridBackground";
import SectionHeading from "@/utils/SectionHeading";
import AnimatedCard from "@/utils/AnimatedCard";

const sections = [
  {
    title: "Editeur du Site",
    content: [
      "Raison sociale : Becee SAS",
      "Adresse : 78 rue de Paris, 95350 Saint Brice Sous Forêt, France",
      "Email : contact@becee.fr",
      "Téléphone : +33 1 23 45 67 89",
      "SIRET : 000 000 000 00000",
      "Capital social : 1 000 €",
      "Directeur de la publication : David Bensadon",
    ],
  },
  {
    title: "Hébergement",
    content: [
      "Hébergeur : Vercel Inc.",
      "Adresse : 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
      "Site web : https://vercel.com",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, sons, logiciels…) est la propriété exclusive de Becee, à l'exception des marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.",
      "Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans l'accord exprès par écrit de Becee.",
    ],
  },
  {
    title: "Limitation de responsabilité",
    content: [
      "Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.",
      "Becee ne pourra être tenu responsable des dommages directs ou indirects causés au matériel de l'utilisateur lors de l'accès au site, et résultant de l'utilisation d'un matériel ne répondant pas aux spécifications techniques requises.",
    ],
  },
  {
    title: "Cookies",
    content: [
      "Le site peut utiliser des cookies techniques nécessaires au bon fonctionnement de certaines fonctionnalités. Ces cookies ne collectent aucune donnée personnelle à des fins publicitaires.",
      "Vous pouvez configurer votre navigateur pour refuser les cookies. Certaines fonctionnalités du site pourraient alors ne plus être disponibles.",
    ],
  },
  {
    title: "Droit applicable",
    content: [
      "Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige, les tribunaux français seront seuls compétents.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="pt-16 bg-white">
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <GridBackground />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Légal"
            title="Mentions légales"
            description="Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique."
          />
          <div className="space-y-4">
            {sections.map((section, i) => (
              <AnimatedCard key={section.title} delay={i * 0.08}>
                <div className="border border-[#E8E8E8] rounded p-7 bg-white">
                  <h2 className="font-playfair text-xl font-medium text-foreground mb-4">
                    {section.title}
                  </h2>
                  <div className="space-y-2">
                    {section.content.map((line, j) => (
                      <p
                        key={j}
                        className="font-inter text-sm text-muted-foreground leading-relaxed"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
