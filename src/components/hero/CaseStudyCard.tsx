import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SPRING_HOVER } from './motion';

interface CaseStudyCardProps {
  badge: string;
  title: string;
  href: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  badge,
  title,
  href,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden desktop:flex items-center gap-4 h-[96px] w-[380px] max-w-[380px] px-5 rounded-2xl bg-darkCard border border-white/10 no-underline transition-colors duration-300 hover:border-white/20 select-none overflow-hidden shrink-0"
      style={{
        backgroundColor: 'rgb(18, 18, 18)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      {/* Sheen icon container */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{
          backgroundColor: 'rgb(24, 24, 24)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <motion.div
          animate={
            isHovered
              ? { rotate: -14.9857, opacity: 1 }
              : { rotate: 0, opacity: 0.75 }
          }
          transition={SPRING_HOVER}
          className="w-6 h-6 text-white"
        >
          {/* Folder Favourite Star SVG */}
          <svg
            display="block"
            role="presentation"
            viewBox="0 0 24 24"
            className="w-full h-full fill-current"
          >
            <g opacity="0.5">
              <path
                d="M 20 12 L 20 9.798 C 20 7.166 20 5.849 19.23 4.994 C 19.16 4.915 19.085 4.84 19.006 4.769 C 18.151 4 16.834 4 14.202 4 L 13.828 4 C 12.675 4 12.098 4 11.56 3.847 C 11.265 3.763 10.98 3.645 10.712 3.495 C 10.224 3.224 9.816 2.816 9 2 L 8.45 1.45 C 8.176 1.176 8.04 1.04 7.896 0.921 C 7.277 0.407 6.517 0.092 5.716 0.017 C 5.53 0 5.336 0 4.95 0 C 4.067 0 3.626 0 3.258 0.069 C 1.64 0.375 0.375 1.64 0.069 3.258 C 0 3.626 0 4.067 0 4.95 L 0 12 C 0 15.771 0 17.657 1.172 18.828 C 2.343 20 4.229 20 8 20 L 12 20 C 15.771 20 17.657 20 18.828 18.828 C 20 17.657 20 15.771 20 12 Z"
                transform="translate(2 2)"
              />
            </g>
            <path
              d="M 3.952 1.199 L 3.854 1.023 C 3.474 0.341 3.284 0 3 0 C 2.716 0 2.526 0.341 2.146 1.023 L 2.048 1.199 L 2.048 1.199 C 1.94 1.393 1.886 1.489 1.801 1.553 C 1.717 1.617 1.612 1.641 1.403 1.688 L 1.212 1.732 C 0.474 1.899 0.105 1.982 0.017 2.264 C -0.071 2.547 0.181 2.841 0.684 3.429 L 0.814 3.581 C 0.957 3.748 1.029 3.832 1.061 3.935 C 1.093 4.039 1.082 4.15 1.06 4.373 L 1.041 4.576 C 0.965 5.361 0.927 5.754 1.156 5.928 C 1.386 6.102 1.732 5.944 2.423 5.625 L 2.601 5.543 C 2.798 5.453 2.896 5.408 3 5.408 C 3.104 5.408 3.202 5.453 3.399 5.543 L 3.577 5.625 L 3.577 5.625 C 4.268 5.944 4.614 6.102 4.843 5.928 C 5.073 5.754 5.035 5.361 4.959 4.576 L 4.939 4.373 C 4.918 4.15 4.907 4.039 4.939 3.935 C 4.971 3.832 5.043 3.748 5.186 3.581 L 5.316 3.429 C 5.819 2.841 6.071 2.547 5.983 2.264 C 5.895 1.982 5.526 1.899 4.788 1.732 L 4.597 1.688 C 4.387 1.641 4.283 1.617 4.198 1.553 C 4.114 1.489 4.06 1.393 3.952 1.199 Z"
              transform="translate(9 10)"
            />
          </svg>
        </motion.div>
      </div>

      {/* Text block */}
      <div className="flex flex-col justify-center gap-0.5 min-w-0 pr-1">
        <p className="text-[12px] font-medium tracking-tight text-gold-accent m-0 leading-tight">
          {badge}
        </p>
        <p className="text-[13.5px] font-bold text-white tracking-tight leading-snug m-0 max-w-[270px]">
          {title}
        </p>
      </div>
    </Link>
  );
};
