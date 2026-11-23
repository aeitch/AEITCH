import React from 'react';
import { motion } from 'framer-motion';
import type { StatItem, StateTheme } from './heroContent';
import { SPRING_CARD } from './motion';

interface StatCardsProps {
  stats: StatItem[];
  themes: StateTheme[];
  activeIndex: number;
  progress: number;
  onSelectIndex: (index: number) => void;
}

export const StatCards: React.FC<StatCardsProps> = ({
  stats,
  themes,
  activeIndex,
  progress,
  onSelectIndex,
}) => {
  const currentTheme = themes[activeIndex] ?? themes[0];

  return (
    <div className="flex flex-row items-center gap-2 tablet:gap-2.5 desktop:gap-3 w-full max-w-[340px] sm:max-w-[380px] desktop:w-[600px] desktop:max-w-[620px] h-[72px] sm:h-[80px] tablet:h-[88px] desktop:h-[96px] overflow-visible mx-auto desktop:mx-0">
      {stats.map((item, idx) => {
        const isActive = idx === activeIndex;

        return (
          <motion.div
            key={item.id}
            onClick={() => onSelectIndex(idx)}
            className="relative cursor-pointer overflow-hidden rounded-2xl select-none"
            layout
            transition={SPRING_CARD}
            style={{
              flex: isActive ? '1 0 0px' : '0 0 20px',
              minWidth: isActive ? '160px' : '20px',
              maxWidth: isActive ? '540px' : '20px',
              height: '100%',
              background: isActive
                ? currentTheme.cardActiveBg
                : 'linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)',
              borderTop: isActive
                ? `1px solid ${currentTheme.cardActiveBorder}`
                : '1px solid rgba(255, 255, 255, 0.08)',
              borderBottom: isActive
                ? `1px solid ${currentTheme.cardActiveBorder}`
                : '1px solid rgba(255, 255, 255, 0.08)',
              borderLeft: isActive ? `1px solid ${currentTheme.cardActiveBorder}` : '0px',
              borderRight: isActive ? `1px solid ${currentTheme.cardActiveBorder}` : '0px',
              boxShadow: isActive
                ? `0 0 ${8 + (progress / 100) * 16}px ${currentTheme.cardActiveBorder}, inset 0 1px 0 rgba(255, 255, 255, ${0.15 + (progress / 100) * 0.45})`
                : 'none',
              backdropFilter: isActive ? 'blur(8px)' : 'none',
              WebkitBackdropFilter: isActive ? 'blur(8px)' : 'none',
              transition: 'background 0.5s ease, border-color 0.5s ease, box-shadow 0.1s linear',
            }}
          >
            {/* Luminous Spotlight Cone from Top (matching Image 3) */}
            {isActive && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-36 tablet:w-48 h-12 tablet:h-16 pointer-events-none z-10 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${currentTheme.accentColor} 0%, rgba(255, 255, 255, 0.5) 20%, rgba(0, 0, 0, 0) 70%)`,
                  opacity: 0.35 + (progress / 100) * 0.5,
                  filter: 'blur(8px)',
                  mixBlendMode: 'screen',
                }}
              />
            )}

            {/* Increasing Border Shine SVG around perimeter (Request 3) */}
            {isActive && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20 overflow-visible"
                style={{ borderRadius: '16px' }}
              >
                <defs>
                  <linearGradient id={`shine-gradient-${item.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="20%" stopColor={currentTheme.accentColor} stopOpacity="0.9" />
                    <stop offset="60%" stopColor={currentTheme.accentColor} stopOpacity="0.4" />
                    <stop offset="100%" stopColor={currentTheme.accentColor} stopOpacity="0.05" />
                  </linearGradient>
                  <filter id={`shine-glow-${item.id}`} x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="15"
                  ry="15"
                  fill="none"
                  stroke={`url(#shine-gradient-${item.id})`}
                  strokeWidth="1.5"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - progress}
                  filter={`url(#shine-glow-${item.id})`}
                  style={{
                    transition: 'stroke-dashoffset 16ms linear',
                  }}
                />
              </svg>
            )}

            {/* Top Progress Bar on Active Card */}
            {isActive && (
              <div
                className="absolute top-0 left-6 right-6 h-[1px] z-10 overflow-hidden pointer-events-none"
                style={{
                  mask: 'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
                  WebkitMask:
                    'linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 100%)',
                }}
              >
                <div
                  className="h-full transition-colors duration-500"
                  style={{
                    backgroundColor: currentTheme.accentColor,
                    width: `${progress}%`,
                    transition: 'width 16ms linear, background-color 0.5s ease',
                  }}
                />
              </div>
            )}

            {/* Inner Content for Active Card */}
            <div
              className="w-full h-full flex flex-col justify-center items-center px-2.5 sm:px-4 text-center transition-opacity duration-300 relative z-10"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              {/* Service title */}
              <h4
                className="text-[16px] sm:text-[19px] tablet:text-[22px] desktop:text-[26px] font-bold m-0 tracking-tight leading-snug whitespace-nowrap transition-colors duration-500"
                style={{
                  color: currentTheme.cardStatColor,
                  fontFeatureSettings: '"lnum" on, "cv11" on, "cv05" on, "cv13" on',
                }}
              >
                {item.stat}
              </h4>

              {/* Service description */}
              <p
                className="text-[10px] sm:text-[11px] tablet:text-[12px] desktop:text-[13px] font-normal m-0 tracking-tight whitespace-nowrap leading-tight transition-colors duration-500"
                style={{
                  color: currentTheme.cardLabelColor,
                }}
              >
                {item.label}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
