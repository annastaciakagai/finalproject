import Layout from '@/components/layout/Layout';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import Contact from '@/components/home/Contact';
import CallToAction from '@/components/home/CallToAction';

const HomePage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Contact />
    </Layout>
  );
};

export default HomePage;