import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ServicesSection } from '@/components/services-section';
import { FeaturesSection } from '@/components/features-section';
import { ProcessSection } from '@/components/process-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TeamSection } from '@/components/team-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { SkipLink } from '@/components/skip-link';
import { DocumentMeta } from '@/components/document-meta';

export default function Home() {
  return (
    <>
      <SkipLink />
      <DocumentMeta />
      <Header />
      <main id="main" className="relative min-h-screen bg-background">
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <FeaturesSection />
        <ProcessSection />
        <TeamSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
