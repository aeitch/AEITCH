import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { StateTheme } from './heroContent';

interface RotatingWordProps {
  themes: StateTheme[];
  activeIndex: number;
}

export const RotatingWord: React.FC<RotatingWordProps> = ({
  themes,
  activeIndex,
}) => {
  const currentTheme = themes[activeIndex] ?? themes[0];
  const targetWord = currentTheme.word;
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let charIdx = 0;
    setDisplayedText('');

    const timer = setInterval(() => {
      if (charIdx < targetWord.length) {
        charIdx++;
        setDisplayedText(targetWord.slice(0, charIdx));
      } else {
        clearInterval(timer);
      }
    }, 38);

    return () => clearInterval(timer);
  }, [activeIndex, targetWord]);

  return (
    <span className="relative inline-flex items-baseline select-none overflow-visible min-h-[1.15em]">
      <span
        className="font-normal tracking-[-1px] desktop:tracking-[-2.16px] transition-colors duration-500 inline-block"
        style={{
          color: currentTheme.accentColor,
          fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
        }}
      >
        {displayedText}
      </span>

      {/* Pulsing blinking cursor bar */}
      <motion.span
        className="inline-block w-[3px] h-[0.78em] ml-1.5 align-middle rounded-sm"
        style={{
          backgroundColor: currentTheme.accentColor,
        }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </span>
  );
};
