import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { IntroStatement } from '@/components/home/intro-statement';
import { ServicesFocused } from '@/components/home/services-focused';
import { Vision2030Focused } from '@/components/home/vision-2030-focused';
import { HowWeWorkFocused } from '@/components/home/how-we-work-focused';
import { OurWorkFocused } from '@/components/home/our-work-focused';
import { WhyAeitchFocused } from '@/components/home/why-aeitch-focused';
import { FinalCtaForm } from '@/components/home/final-cta-form';

export const revalidate = 60;

export default function HomePage() {
  return (
    <div className="flex w-full flex-col overflow-x-clip bg-bg text-fg selection:bg-accent selection:text-black">
      {/* 1. Hero: Four services. One engineering standard. + Hero detail strip */}
      <HeroSection />

      {/* 2. Intro statement: One short paragraph, large type */}
      <IntroStatement />

      {/* 3. Services: Four blocks, each a different layout */}
      <ServicesFocused />

      {/* 4. Vision 2030: Main feature section with 4 tracks editorial layout */}
      <Vision2030Focused />

      {/* 5. How we work: 4 simple steps */}
      <HowWeWorkFocused />

      {/* 6. Our work: Real case studies from aeitch.com, one per service, no invented numbers */}
      <OurWorkFocused />

      {/* 7. Why AEITCH: 4 points, short */}
      <WhyAeitchFocused />

      {/* 8. Final CTA + form */}
      <FinalCtaForm />
    </div>
  );
}
