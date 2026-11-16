import React from 'react';
import { motion } from 'framer-motion';
import { RotatingWord } from './RotatingWord';
import { HERO_FADE_UP_ITEM } from './motion';
import type { StateTheme } from './heroContent';

interface HeroHeadingProps {
  headingLine1: string;
  headingPrefix: string;
  themes: StateTheme[];
  activeIndex: number;
  subtitle: string;
}

export const HeroHeading: React.FC<HeroHeadingProps> = ({
  headingLine1,
  headingPrefix,
  themes,
  activeIndex,
  subtitle,
}) => {
  return (
    <motion.div variants={HERO_FADE_UP_ITEM} className="flex flex-col gap-2.5 sm:gap-3 desktop:gap-6 w-full items-center desktop:items-start text-center desktop:text-left">
      {/* H1 Heading */}
      <h1
        className="font-normal text-white m-0 text-[26px] sm:text-[36px] tablet:text-[48px] desktop:text-[62px] leading-[1.12] tracking-[-0.5px] desktop:tracking-[-2px]"
        style={{
          fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
        }}
      >
        <div className="block whitespace-nowrap">{headingLine1}</div>
        <div className="flex flex-wrap items-baseline justify-center desktop:justify-start">
          {headingPrefix && <span className="text-white whitespace-pre">{headingPrefix}</span>}
          <RotatingWord themes={themes} activeIndex={activeIndex} />
        </div>
      </h1>

      {/* Subtitle */}
      <p
        className="text-[13.5px] sm:text-[14.5px] desktop:text-[16px] leading-[1.45] desktop:leading-[24px] font-normal max-w-[340px] sm:max-w-[420px] desktop:max-w-[540px] text-white/75 m-0"
        style={{
          textWrap: 'balance',
        }}
      >
        {subtitle}
      </p>
    </motion.div>
  );
};
