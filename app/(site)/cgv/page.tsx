import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente",
  description:
    "Conditions générales de vente de Becee : modalités de prestation, tarifs, délais de livraison et droits des parties.",
  robots: { index: false, follow: false },
};

import GridBackground from "@/utils/GridBackground";
import SectionHeading from "@/utils/SectionHeading";
import AnimatedCard from "@/utils/AnimatedCard";

const sections = [
  {
    title: "Objet",
    content: [
      "Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Becee SAS (ci-après « le Prestataire ») et tout client professionnel (ci-après « le Client ») souhaitant bénéficier de ses services de création web.",
    ],
  },
  {
    title: "Services proposés",
    content: [
      "Le Prestataire propose les services suivants : création de sites vitrines, développement de modules de réservation en ligne, développement d'applications métier sur mesure, maintenance et support technique.",
    ],
  },
  {
    title: "Devis et commande",
    content: [
      "Tout projet fait l'objet d'un devis détaillé, valable 30 jours. La commande est ferme à réception du devis signé accompagné du versement de l'acompte prévu.",
      "Toute modification du périmètre après validation du devis fera l'objet d'un avenant tarifaire.",
    ],
  },
  {
    title: "Tarifs et paiement",
    content: [
      "Les prix sont indiqués en euros HT. La TVA applicable sera ajoutée au taux en vigueur.",
      "Modalités de paiement : 40 % à la commande, 40 % à la livraison de la maquette validée, 20 % à la mise en production.",
      "En cas de retard de paiement, des pénalités de retard au taux légal en vigueur seront appliquées, ainsi qu'une indemnité forfaitaire de recouvrement de 40 €.",
    ],
  },
  {
    title: "Délais de livraison",
    content: [
      "Les délais indiqués dans le devis sont donnés à titre indicatif. Ils commencent à courir à réception de l'acompte et de l'ensemble des éléments nécessaires au démarrage du projet (textes, images, accès, etc.).",
      "Tout retard dans la transmission des éléments par le Client entraîne automatiquement un décalage du planning.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    content: [
      "Le Prestataire cède au Client l'intégralité des droits patrimoniaux sur les créations réalisées, après paiement complet de la prestation.",
      "Le Prestataire se réserve le droit de mentionner la réalisation dans ses références commerciales et portfolio, sauf demande expresse de confidentialité du Client.",
    ],
  },
  {
    title: "Responsabilités",
    content: [
      "Le Client est responsable des contenus (textes, images, données) qu'il fournit et garantit détenir les droits nécessaires.",
      "La responsabilité du Prestataire est limitée au montant HT de la prestation concernée. Le Prestataire ne saurait être tenu responsable des dommages indirects.",
    ],
  },
  {
    title: "Résiliation",
    content: [
      "En cas de résiliation à l'initiative du Client après démarrage des travaux, l'acompte versé reste acquis au Prestataire. Les travaux réalisés jusqu'à la date de résiliation seront facturés au prorata.",
    ],
  },
  {
    title: "Droit applicable et litiges",
    content: [
      "Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité. À défaut, le Tribunal de Commerce de Paris sera seul compétent.",
    ],
  },
];

export default function CGVPage() {
  return (
    <div className="pt-16 bg-white">
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <GridBackground />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="CGV"
            title="Conditions Générales de Vente"
            description="Ces conditions régissent l'ensemble des prestations réalisées par Becee pour ses clients professionnels."
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
