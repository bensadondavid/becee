import Hero from '@/Components/Home/Hero';
import ServicesOverview from '@/Components/Home/ServicesOverview';
import WhyUs from '@/Components/Home/WhyUs';
import Testimonials from '@/Components/Home/Testimonials';
import CTABanner from '@/Components/Home/CTABanner';

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