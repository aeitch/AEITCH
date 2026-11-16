import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HERO_FADE_UP_ITEM, SPRING_BUTTON_ENTER, SPRING_BUTTON_EXIT } from './motion';
import { Link } from '../../router/Router';

interface HeroCTAProps {
  primaryLabel: string;
  primaryHref: string;
  buttonBg: string;
  accentColor: string;
}

export const HeroCTA: React.FC<HeroCTAProps> = ({
  primaryLabel,
  primaryHref,
  buttonBg,
}) => {
  const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);

  return (
    <motion.div
      variants={HERO_FADE_UP_ITEM}
      className="flex flex-row items-center justify-center desktop:justify-start select-none overflow-visible w-full desktop:w-auto"
    >
      {/* Primary Pill Button */}
      <Link
        href={primaryHref}
        onMouseEnter={() => setIsPrimaryHovered(true)}
        onMouseLeave={() => setIsPrimaryHovered(false)}
        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[379px] font-medium no-underline transition-all duration-500 shadow-sm"
        style={{
          height: 'clamp(46px, 4.4vw, 50px)',
          paddingLeft: '32px',
          paddingRight: '26px',
          backgroundColor: buttonBg,
          color: 'rgb(0, 0, 0)',
        }}
      >
        {/* Animated text roll container */}
        <div className="relative flex items-center justify-center overflow-hidden h-[24px]">
          {/* Layer 1 (enters from bottom on hover) */}
          <motion.span
            className="absolute left-0 font-bold whitespace-nowrap text-[15px] tablet:text-[16px]"
            style={{ color: 'rgb(0, 0, 0)' }}
            initial={{ y: 24, opacity: 0 }}
            animate={
              isPrimaryHovered
                ? { y: 0, opacity: 1, transition: SPRING_BUTTON_ENTER }
                : { y: 24, opacity: 0, transition: SPRING_BUTTON_EXIT }
            }
          >
            {primaryLabel}
          </motion.span>

          {/* Layer 2 (exits to top on hover) */}
          <motion.span
            className="relative font-bold whitespace-nowrap text-[15px] tablet:text-[16px]"
            style={{ color: 'rgb(0, 0, 0)' }}
            initial={{ y: 0, opacity: 1 }}
            animate={
              isPrimaryHovered
                ? { y: -24, opacity: 0, transition: SPRING_BUTTON_ENTER }
                : { y: 0, opacity: 1, transition: SPRING_BUTTON_EXIT }
            }
          >
            {primaryLabel}
          </motion.span>
        </div>

        {/* Arrow SVG #2047441354 */}
        <motion.svg
          role="presentation"
          viewBox="0 0 24 24"
          className="w-5 h-5 flex-none"
          animate={isPrimaryHovered ? { x: 3 } : { x: 0 }}
          transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
        >
          <path
            d="M 0 7 L 18 7 M 18 7 L 11 0 M 18 7 L 11 14"
            fill="transparent"
            stroke="rgb(0, 0, 0)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            transform="translate(3 5)"
          />
        </motion.svg>
      </Link>
    </motion.div>
  );
};
