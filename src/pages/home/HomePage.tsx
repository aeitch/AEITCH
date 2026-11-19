import React from 'react';
import { Hero } from '../../components/hero/Hero';
import { MetricsSection } from '../../components/metrics/MetricsSection';
import { ServicesSection } from '../../components/services/ServicesSection';
import { ProcessSection } from '../../components/process/ProcessSection';
import { CTASection } from '../../components/cta/CTASection';
import { SEOHead } from '../../components/seo/SEOHead';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-black">
      <SEOHead
        title="AEITCH — Enterprise AI & Software Engineering Collective"
        description="AEITCH is an enterprise engineering collective architecting autonomous AI agent systems, full-cycle SaaS products, resilient multi-cloud backbones, and bespoke high-throughput software."
        canonicalPath="/"
      />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Metrics Section */}
      <MetricsSection />

      {/* 3. Services Section */}
      <ServicesSection />

      {/* 4. Process Section */}
      <ProcessSection />

      {/* 5. CTA Section */}
      <CTASection />
    </div>
  );
};

export default HomePage;
