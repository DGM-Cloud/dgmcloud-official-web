import { Header } from '@/components/header';
import { Hero } from '@/components/hero';
import { ServicesSection } from '@/components/services-section';
import { ProcessSection } from '@/components/process-section';
import { PortfolioSection } from '@/components/portfolio-section';
import { TeamSection } from '@/components/team-section';
import { ContactForm } from '@/components/contact-form';
import { Footer } from '@/components/footer';
import { SkipLink } from '@/components/skip-link';
import { BusinessProblemsSection } from '@/components/business-problems-section';
import { TechnologySection } from '@/components/technology-section';

export default function Home() {
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main" className="relative min-h-screen bg-background">
        <Hero />
        <PortfolioSection />
        <BusinessProblemsSection />
        <ServicesSection />
        <ProcessSection />
        <TechnologySection />
        <TeamSection />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
