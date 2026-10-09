import React from 'react';
import { prisma } from '@/lib/prisma';
import { HeroSection } from '@/components/home/hero-section';
import { TechCarousel } from '@/components/home/tech-carousel';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { KingdomFutureSection } from '@/components/home/kingdom-future-section';
import { DeliveryEngineTriad } from '@/components/schematics/DeliveryEngineTriad';
import { StatsCounter, MetricItem } from '@/components/home/stats-counter';
import { TestimonialsSection, TestimonialData } from '@/components/home/testimonials-section';
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
      {/* Act 1. Hero: 3D Sovereign Core, Clear 4 Services & Saudi 2030 Positioning */}
      <HeroSection />

      {/* Act 2. Sovereign Trust Strip: In-Kingdom Cloud Regions & Compliance Accreditations */}
      <TechCarousel />

      {/* Act 3. The 4 Core Engineering Services Showcase */}
      <ServicesShowcase />

      {/* Act 4. Saudi Vision 2030 Flagship Sovereign Anchor Section */}
      <KingdomFutureSection />

      {/* Act 5. The US-Riyadh Delivery Engine Triad */}
      <section className="relative py-20 bg-bg border-t border-border overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <DeliveryEngineTriad />
        </div>
      </section>

      {/* Act 6. Verified Proof: Audited Performance Telemetry & Enterprise Testimonials */}
      <StatsCounter initialMetrics={metrics} />
      <TestimonialsSection initialTestimonials={testimonials} />

      {/* Act 7. Executive Consultation CTA */}
      <CtaBanner />
    </div>
  );
}
