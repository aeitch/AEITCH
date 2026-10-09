import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeroSection } from '@/components/home/hero-section';
import { TechCarousel } from '@/components/home/tech-carousel';
import { CinematicScrollExperience } from '@/components/home/cinematic-scroll-experience';
import { KingdomFutureSection } from '@/components/home/kingdom-future-section';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { IndustriesSection } from '@/components/home/industries-section';
import { HowWeWork } from '@/components/home/how-we-work';
import { CaseStudiesPreview } from '@/components/home/case-studies-preview';
import { StatsCounter, MetricItem } from '@/components/home/stats-counter';
import { TestimonialsSection, TestimonialData } from '@/components/home/testimonials-section';
import { InsightsSection } from '@/components/home/insights-section';
import { CtaBanner } from '@/components/home/cta-banner';
import { DeliveryEngineTriad } from '@/components/schematics/DeliveryEngineTriad';
import { CloudMaturityAssessment } from '@/components/tools/CloudMaturityAssessment';
import { LeadMagnetCard } from '@/components/ui/lead-magnet-card';

export const revalidate = 60;

export default async function HomePage() {
  let metrics: MetricItem[] = [];
  let testimonials: TestimonialData[] = [];

  try {
    const rawMetrics = await prisma.metricCounter.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    if (rawMetrics && rawMetrics.length > 0) {
      metrics = rawMetrics.map((m) => ({
        id: m.id,
        label: m.label,
        value: m.value,
        prefix: m.prefix,
        suffix: m.suffix,
        description: m.description,
        icon: m.icon,
        order: m.order,
        isActive: m.isActive,
      }));
    }

    const rawTestimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });

    if (rawTestimonials && rawTestimonials.length > 0) {
      testimonials = rawTestimonials.map((t) => ({
        id: t.id,
        clientName: t.clientName,
        clientRole: t.clientRole,
        clientCompany: t.clientCompany,
        avatarUrl: t.avatarUrl,
        quote: t.quote,
        rating: t.rating,
        verified: t.verified,
        order: t.order,
        isActive: t.isActive,
      }));
    }
  } catch (error) {
    // Graceful fallback to default constants
    console.warn('Note: Utilizing fallback static metrics/testimonials for homepage:', error);
  }

  return (
    <div className="flex w-full flex-col overflow-x-clip bg-bg text-fg selection:bg-accent selection:text-black">
      {/* 1. Header is rendered globally in MainSiteChrome */}

      {/* 2. Hero: 3D Scene, clear value proposition, dual CTAs */}
      <HeroSection />

      {/* 3. Trust Strip: Cloud Partners, Compliance Standards & regional ecosystem */}
      <TechCarousel />

      {/* 4. Cinematic Scroll Motion Introduction: 4-Act Sovereign Video Journey */}
      <CinematicScrollExperience />

      {/* Anchor for Skip to Sections */}
      <div id="sections-content" className="scroll-mt-20" />

      {/* 5. Built for the Kingdom's Digital Future: Sovereign Telemetry Cockpit */}
      <KingdomFutureSection />

      {/* 6. The US–Pakistan–Saudi Advantage (Interactive Triad Infographic) */}
      <section className="relative py-20 bg-bg border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DeliveryEngineTriad />
        </div>
      </section>

      {/* 7. Core Capabilities & Services Showcase */}
      <ServicesShowcase />

      {/* 8. Interactive Cloud Maturity Assessment (2-Minute Diagnostic) */}
      <section className="relative py-20 bg-bg-elevated border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CloudMaturityAssessment />
        </div>
      </section>

      {/* 9. Industries: Saudi strategic sectors */}
      <IndustriesSection />

      {/* 10. How We Work: 5-step process + Gulf working hours overlap (GMT+3) */}
      <HowWeWork />

      {/* 11. Quantified Case Studies: 3 structured impact cards */}
      <CaseStudiesPreview />

      {/* 12. Proof: Audited metrics counters and verified enterprise client testimonials */}
      <StatsCounter initialMetrics={metrics} />
      <TestimonialsSection initialTestimonials={testimonials} />

      {/* 13. KSA CTO Lead Magnets (Whitepaper & DevSecOps Checklist) */}
      <section className="relative py-20 bg-bg border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-accent uppercase block mb-2">
              KSA Architecture Blueprints & Toolkits
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Executive Resources for Saudi Technology Leaders
            </h2>
          </div>
          <LeadMagnetCard type="both" />
        </div>
      </section>

      {/* 14. Insights: Strategic technical briefings */}
      <InsightsSection />

      {/* 15. Final Conversion Block: Planning cloud migration or launching digital product? */}
      <CtaBanner />

      {/* 16. Footer is rendered globally in MainSiteChrome */}
    </div>
  );
}
