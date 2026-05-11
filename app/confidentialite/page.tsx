import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: "Politique de confidentialité de Becee : données collectées, finalités du traitement, vos droits RGPD et durées de conservation.",
  robots: { index: false, follow: false },
};

import GridBackground from '@/utils/GridBackground';
import SectionHeading from '@/utils/SectionHeading';
import AnimatedCard from '@/utils/AnimatedCard';

const sections = [
  {
    title: 'Responsable du traitement',
    content: [
      'Becee SAS — 78 rue de Paris, 95350 Saint Brice Sous Forêt, France',
      'Email : contact@becee.fr',
    ],
  },
  {
    title: 'Données collectées',
    content: [
      'Nous collectons les données que vous nous transmettez volontairement via le formulaire de contact : nom, adresse email, numéro de téléphone et description de votre projet.',
      "Aucune donnée sensible (bancaire, médicale, etc.) n'est collectée sur ce site.",
    ],
  },
  {
    title: 'Finalités du traitement',
    content: [
      'Les données collectées sont utilisées exclusivement pour : répondre à vos demandes de contact et de devis, assurer le suivi commercial de nos échanges, vous envoyer des informations relatives à nos services si vous y avez consenti.',
    ],
  },
  {
    title: 'Base légale',
    content: [
      "Le traitement de vos données repose sur votre consentement (art. 6.1.a du RGPD) lorsque vous soumettez le formulaire de contact, et sur l'intérêt légitime de StudioDev pour le suivi des relations commerciales (art. 6.1.f du RGPD).",
    ],
  },
  {
    title: 'Durée de conservation',
    content: [
      'Vos données sont conservées pendant 3 ans à compter de votre dernier contact avec nous, conformément aux recommandations de la CNIL.',
    ],
  },
  {
    title: 'Destinataires',
    content: [
      "Vos données ne sont jamais vendues ni cédées à des tiers. Elles peuvent être partagées avec nos prestataires techniques (hébergement, email) dans le strict cadre de l'exécution de leurs services.",
    ],
  },
  {
    title: 'Vos droits',
    content: [
      "Conformément au RGPD, vous disposez des droits suivants sur vos données : droit d'accès, de rectification, d'effacement, de limitation du traitement, à la portabilité et d'opposition.",
      "Pour exercer ces droits, contactez-nous à : contact@becee.fr. Vous disposez également du droit d'introduire une réclamation auprès de la CNIL (www.cnil.fr).",
    ],
  },
];

export default function ConfidentialitePage() {
  return (
    <div className="pt-16 bg-white">
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <GridBackground />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            badge="Confidentialité"
            title="Politique de confidentialité"
            description="Nous attachons une importance particulière à la protection de vos données personnelles et au respect du RGPD."
          />
          <div className="space-y-4">
            {sections.map((section, i) => (
              <AnimatedCard key={section.title} delay={i * 0.08}>
                <div className="border border-[#E8E8E8] rounded p-7 bg-white">
                  <h2 className="font-playfair text-xl font-medium text-foreground mb-4">{section.title}</h2>
                  <div className="space-y-2">
                    {section.content.map((line, j) => (
                      <p key={j} className="font-inter text-sm text-muted-foreground leading-relaxed">{line}</p>
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