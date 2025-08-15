import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Technology from '@/components/Technology';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import WhyChooseUs from '@/components/WhyChooseUs';
import Industries from '@/components/Industries'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About /> {/* Moved to be after Services */}
      <Technology />
      <WhyChooseUs />
      <Industries />
      <Contact />
      <Footer /> 
    </main>
  );
}
