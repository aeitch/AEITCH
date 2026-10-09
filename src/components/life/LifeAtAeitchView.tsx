'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { useLanguage } from '@/lib/i18n';
import { LifeCustomCursor } from './LifeCustomCursor';
import { LifeProgressRail } from './LifeProgressRail';
import { LifeHeroSection } from './LifeHeroSection';
import { LifeValuesSection } from './LifeValuesSection';
import { LifeTeamWallSection } from './LifeTeamWallSection';
import { LifeTripsSection } from './LifeTripsSection';
import { LifeCelebrationsSection } from './LifeCelebrationsSection';
import { LifeDayTimelineSection } from './LifeDayTimelineSection';
import { LifeNumbersSection } from './LifeNumbersSection';
import { LifeQuotesSection } from './LifeQuotesSection';
import { LifeJoinCtaSection } from './LifeJoinCtaSection';

export const LifeAtAeitchView: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div
      dir={isAr ? 'rtl' : 'ltr'}
      className="relative w-full min-h-screen bg-[#000000] text-[#FFFFFF] selection:bg-[#E9800A] selection:text-black overflow-x-clip"
    >
      {/* 1. Custom Interactive Cursor */}
      <LifeCustomCursor />

      {/* 2. Top Progress Line & Sticky Section Indicator */}
      <LifeProgressRail />

      {/* Section 1: Hero */}
      <LifeHeroSection />

      {/* Section 2: Culture Values 01-05 */}
      <LifeValuesSection />

      {/* Section 3: Team Wall with Filter & Profile Modal */}
      <LifeTeamWallSection />

      {/* Section 4: Trips Pinned Horizontal Scroll */}
      <LifeTripsSection />

      {/* Section 5: Celebrations Birthday Wheel & Moments Marquee */}
      <LifeCelebrationsSection />

      {/* Section 6: A Day at AEITCH Timeline */}
      <LifeDayTimelineSection />

      {/* Section 7: Numbers & Metrics Count-Up */}
      <LifeNumbersSection />

      {/* Section 8: In Their Words Quotes */}
      <LifeQuotesSection />

      {/* Section 9: Join Us CTA */}
      <LifeJoinCtaSection />
    </div>
  );
};
