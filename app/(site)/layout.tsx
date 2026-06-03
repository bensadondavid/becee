import Navbar from "@/Components/Layout/NavBar";
import Footer from "@/Components/Layout/Footer";
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
