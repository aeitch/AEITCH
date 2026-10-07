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

      {/* 2. Hero: 3D Scene, clear value proposition, two CTAs */}
      <HeroSection />

      {/* 3. Trust Strip: Client logos [REPLACE], enterprise tech, verified credentials */}
      <TechCarousel />

      {/* 4. Cinematic Scroll Motion Introduction: 4-Act Sovereign Video Journey */}
      <CinematicScrollExperience />

      {/* Anchor for Skip to Sections */}
      <div id="sections-content" className="scroll-mt-20" />

      {/* 5. Built for the Kingdom's Digital Future: Concept 3 Saudi Sovereign Telemetry Cockpit */}
      <KingdomFutureSection />

      {/* 5. Services: 4 outcome-focused disciplines tied to scroll scene changes */}
      <ServicesShowcase />

      {/* 6. Industries: 9 tiles prioritizing Saudi strategic sectors */}
      <IndustriesSection />

      {/* 7. How We Work: 5-step process + Gulf working hours overlap (GMT+3) */}
      <HowWeWork />

      {/* 8. Case Studies: 3 featured (Problem, Solution, Measured Result) */}
      <CaseStudiesPreview />

      {/* 9. Proof: Real stats [REPLACE] and client testimonials [REPLACE] */}
      <StatsCounter initialMetrics={metrics} />
      <TestimonialsSection initialTestimonials={testimonials} />

      {/* 10. Insights: 3 strategic technical briefings */}
      <InsightsSection />

      {/* 11. Final CTA Band plus short consultation & scoping form */}
      <CtaBanner />

      {/* 12. Footer is rendered globally in MainSiteChrome */}
    </div>
  );
}
