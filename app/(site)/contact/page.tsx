import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Becee pour discuter de votre projet web. Devis gratuit sous 24h. Site vitrine, réservation en ligne ou application métier sur mesure.",
  openGraph: {
    title: "Contact | Becee",
    description:
      "Contactez Becee pour discuter de votre projet web. Devis gratuit sous 24h.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
