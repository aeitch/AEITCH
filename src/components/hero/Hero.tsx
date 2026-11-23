import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { heroContent } from './heroContent';
import { useActiveIndex } from './useActiveIndex';
import { HeroBackground } from './HeroBackground';
import { HeroTag } from './HeroTag';
import { HeroHeading } from './HeroHeading';
import { HeroCTA } from './HeroCTA';
import { CaseStudyCard } from './CaseStudyCard';
import { StatCards } from './StatCards';
import { HERO_ENTRANCE_CONTAINER } from './motion';

export const Hero: React.FC = () => {
  const { activeIndex, progress, setActiveIndex } = useActiveIndex({
    totalItems: heroContent.stats.length,
  });

  const currentTheme = heroContent.themes[activeIndex] ?? heroContent.themes[0];
  const heroRef = useRef<HTMLElement>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const smoothContentY = useSpring(contentY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[100dvh] desktop:h-[100dvh] desktop:max-h-[100dvh] bg-black flex flex-col justify-between items-center px-4 sm:px-6 tablet:px-12 desktop:px-[80px] select-none"
      style={{
        backgroundColor: '#000000',
        overflow: 'visible',
      }}
    >
      <div className="relative w-full max-w-[1440px] min-h-[100dvh] desktop:min-h-0 desktop:h-full flex flex-col justify-between items-center desktop:items-start pt-20 sm:pt-24 desktop:pt-20 pb-4 sm:pb-6 desktop:pb-8 overflow-visible">
        {/* Mobile: Unified video + content block in upper-center. Desktop: contents */}
        <div className="flex flex-col items-center w-full my-auto desktop:my-0 desktop:contents">
          <HeroBackground
            themes={heroContent.themes}
            activeIndex={activeIndex}
          />

          {/* Content Column with Parallax: Centered on mobile, Left-aligned on desktop */}
          <motion.div
            variants={HERO_ENTRANCE_CONTAINER}
            initial="hidden"
            animate="visible"
            style={{
              y: smoothContentY,
              opacity: contentOpacity,
            }}
            className="relative z-10 flex flex-col items-center desktop:items-start text-center desktop:text-left gap-2 sm:gap-3 tablet:gap-5 desktop:gap-8 w-full max-w-[560px] desktop:max-w-[640px] desktop:my-auto mt-0.5 desktop:mt-0"
          >
            {/* Tag & Heading Block */}
            <div className="flex flex-col gap-1.5 sm:gap-2 tablet:gap-4 desktop:gap-6 items-center desktop:items-start w-full">
              <HeroTag
                text={heroContent.tagText}
                accentColor={currentTheme.accentColor}
                borderColor={currentTheme.tagBorderColor}
              />
              <HeroHeading
                headingLine1={heroContent.headingLine1}
                headingPrefix={heroContent.headingPrefix}
                themes={heroContent.themes}
                activeIndex={activeIndex}
                subtitle={heroContent.subtitle}
              />
            </div>

            {/* CTA Button (Theme Dynamic) */}
            <HeroCTA
              primaryLabel={heroContent.primaryCTA.label}
              primaryHref={heroContent.primaryCTA.href}
              buttonBg={currentTheme.buttonBg}
              accentColor={currentTheme.accentColor}
            />
          </motion.div>
        </div>

        {/* Bottom Row: Latest Case Study (Desktop) + Stat Cards */}
        <div className="relative z-10 flex flex-row items-end justify-center desktop:justify-between gap-4 tablet:gap-6 w-full shrink-0 pb-1 desktop:pb-2 overflow-visible">
          <CaseStudyCard
            badge={heroContent.caseStudy.badge}
            title={heroContent.caseStudy.title}
            href={heroContent.caseStudy.href}
          />
          <StatCards
            stats={heroContent.stats}
            themes={heroContent.themes}
            activeIndex={activeIndex}
            progress={progress}
            onSelectIndex={setActiveIndex}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
