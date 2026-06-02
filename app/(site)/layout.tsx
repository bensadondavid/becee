import Navbar from "@/components/Layout/NavBar";
import Footer from "@/components/Layout/Footer";
import './site.css'

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Navbar />
        <main>{children}</main>
        <Footer />
    </>
  );
}
