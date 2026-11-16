import React from 'react';
import { motion } from 'framer-motion';
import { HERO_FADE_UP_ITEM } from './motion';

interface HeroTagProps {
  text: string;
  accentColor: string;
  borderColor: string;
}

export const HeroTag: React.FC<HeroTagProps> = ({
  text,
  accentColor,
  borderColor,
}) => {
  return (
    <motion.div variants={HERO_FADE_UP_ITEM} className="framer-q5a10r-container flex justify-center desktop:justify-start w-full desktop:w-auto">
      <div
        className="inline-flex items-center gap-2 px-2.5 py-1 select-none transition-colors duration-500"
        style={{
          border: `1px solid ${borderColor}`,
          borderRadius: '8px',
          backgroundColor: 'rgba(171, 135, 73, 0)',
        }}
      >
        {/* Leading dot */}
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-500"
          style={{
            backgroundColor: accentColor,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
          aria-hidden="true"
        />
        {/* Text */}
        <span
          className="text-[12px] font-medium tracking-tight leading-none transition-colors duration-500"
          style={{
            color: accentColor,
          }}
        >
          {text}
        </span>
      </div>
    </motion.div>
  );
};
