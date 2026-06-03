import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Becee — Agence web sur mesure" },
  description:
    "Agence de développement web sur mesure pour PME et indépendants. Sites vitrines, réservation en ligne, applications métier. Devis gratuit sous 24h.",
  openGraph: {
    title: "Becee — Agence web sur mesure",
    description:
      "Agence de développement web sur mesure pour PME et indépendants. Sites vitrines, réservation en ligne, applications métier. Devis gratuit sous 24h.",
    url: "/",
  },
};

import Hero from "@/Components/Home/Hero";
import ServicesOverview from "@/Components/Home/ServicesOverview";
import WhyUs from "@/Components/Home/WhyUs";
import Testimonials from "@/Components/Home/Testimonials";
import CTABanner from "@/Components/Home/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <Testimonials />
      <CTABanner />
    </>
  );
}
