import type { Metadata } from "next";
import { Playfair_Display, Inter } from 'next/font/google'
import "./globals.css";
import Navbar from "@/Components/Layout/NavBar";
import Footer from "@/Components/Layout/Footer";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://becee.fr'),
  title: {
    default: 'Becee — Agence web sur mesure',
    template: '%s | Becee',
  },
  description: 'Agence de développement web sur mesure pour PME et indépendants. Sites vitrines, réservation en ligne, applications métier. Devis gratuit sous 24h.',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Becee',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable} h-full antialiased`} >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
