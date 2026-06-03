import type { Metadata } from "next";
import CTABanner from "@/Components/Home/CTABanner";
import FaqItem from "@/Components/ui/faqItem";

const faqs = [
  {
    question: "Combien coûte la création d'un site web ?",
    answer:
      "Le prix dépend de vos besoins. Nous vous proposons toujours un devis gratuit et détaillé avant de commencer.",
  },
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "En moyenne, un site vitrine est livré en 2 à 4 semaines. Un projet plus complexe (réservation, application) peut prendre 4 à 8 semaines. Nous vous communiquons un planning précis dès le départ et respectons les délais convenus.",
  },
  {
    question: "Mon site sera-t-il visible sur Google ?",
    answer:
      "Oui. Nous appliquons les bonnes pratiques SEO (référencement naturel) dès la conception : structure technique, vitesse de chargement, balises, et textes optimisés. Nous pouvons aussi vous accompagner sur une stratégie de contenu si vous le souhaitez.",
  },
  {
    question: "Mon site fonctionnera-t-il sur mobile et tablette ?",
    answer:
      "Tous nos sites sont entièrement responsives, c'est-à-dire qu'ils s'adaptent automatiquement à toutes les tailles d'écran : smartphone, tablette, ordinateur. C'est une évidence pour nous, pas une option.",
  },
  {
    question: "Proposez-vous un hébergement et un nom de domaine ?",
    answer:
      "Oui. Nous pouvons gérer l'ensemble : achat du nom de domaine, hébergement sécurisé, certificat SSL (cadenas https). Nous vous proposons aussi de reprendre la gestion d'un hébergement existant si vous en avez déjà un.",
  },
  {
    question: "Que se passe-t-il après la mise en ligne ?",
    answer:
      "Nous restons disponibles. Nous proposons des contrats de maintenance pour les mises à jour de sécurité, les sauvegardes régulières et les évolutions fonctionnelles. Vous n'êtes jamais laissés seuls une fois le projet livré.",
  },
  {
    question: "Travaillez-vous avec des clients hors de votre région ?",
    answer:
      "Oui, nous travaillons avec des clients partout en France et à l'international. La quasi-totalité de nos échanges se fait en visioconférence, ce qui nous permet d'être aussi efficaces à distance qu'en présentiel.",
  },
];

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes vos questions sur nos services de développement web, délais, tarifs et accompagnement. Réponses claires avant de lancer votre projet.",
  openGraph: {
    title: "FAQ | Becee",
    description:
      "Réponses à vos questions sur la création de site web : délais, tarifs, SEO, hébergement et suivi.",
    url: "/faq",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="pt-32 pb-24 max-w-2xl mx-auto px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center">
          <span className="font-inter inline-block text-xs tracking-widest uppercase text-accent mb-4 font-medium">
            — FAQ
          </span>
          <h1 className="font-playfair text-3xl sm:text-4xl lg:text-[2.6rem] font-medium leading-tight tracking-tight text-foreground mb-5">
            Vos questions, nos réponses
          </h1>
          <p className="font-inter text-center text-muted-foreground leading-relaxed">
            Tout ce que vous devez savoir avant de lancer votre projet web. Une
            question non listée ? Écrivez-nous.
          </p>
        </div>

        <div>
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} />
          ))}
        </div>
      </div>
      <CTABanner />
    </>
  );
}
