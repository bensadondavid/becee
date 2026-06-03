import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://becee.fr"),
  title: {
    default: "Becee — Agence web sur mesure",
    template: "%s | Becee",
  },
  icons: "/logo-becee-onglet.png",
  description:
    "Agence de développement web sur mesure pour PME et indépendants. Sites vitrines, réservation en ligne, applications métier. Devis gratuit sous 24h.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Becee",
    title: "Becee — Agence web sur mesure",
    description:
      "Agence de développement web sur mesure pour PME et indépendants. Sites vitrines, réservation en ligne, applications métier. Devis gratuit sous 24h.",
    images: [
      {
        url: "/logo-becee-og.png",
        width: 1200,
        height: 630,
        alt: "Becee — Agence web sur mesure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Becee — Agence web sur mesure",
    description:
      "Agence de développement web sur mesure pour PME et indépendants. Sites vitrines, réservation en ligne, applications métier. Devis gratuit sous 24h.",
    images: ["/logo-becee-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <main>{children}</main>
        <Toaster richColors position="top-right" />
        <Analytics />
      </body>
    </html>
  );
}
