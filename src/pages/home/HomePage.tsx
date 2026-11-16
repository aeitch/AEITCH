import React from 'react';
import { Hero } from '../../components/hero/Hero';
import { MetricsSection } from '../../components/metrics/MetricsSection';
import { ServicesSection } from '../../components/services/ServicesSection';
import { ProcessSection } from '../../components/process/ProcessSection';
import { CTASection } from '../../components/cta/CTASection';

export const HomePage: React.FC = () => {
  return (
    <div className="w-full bg-black">
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
