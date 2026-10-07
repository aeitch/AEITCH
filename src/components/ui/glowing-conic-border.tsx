"use client";

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface GlowingConicBorderProps {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
}

export const GlowingConicBorder: React.FC<GlowingConicBorderProps> = ({
  children,
  className = '',
  containerClassName = '',
  glowIntensity = 'medium',
  interactive = true,
}) => {
  const intensityClasses = {
    low: 'opacity-35 group-hover:opacity-65',
    medium: 'opacity-55 group-hover:opacity-90',
    high: 'opacity-80 group-hover:opacity-100',
  }[glowIntensity];

  return (
    <div
      className={cn(
        'group relative rounded-2xl p-[1px] overflow-hidden transition-all duration-300',
        interactive && 'hover:-translate-y-1 hover:shadow-glow-md',
        containerClassName
      )}
    >
      {/* 1. Outer Neon Aura / Diffuse Bloom Glow (GPU Blurred) */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -inset-[30%] -z-10 animate-conic-spin group-hover:animate-conic-spin-fast rounded-full filter blur-xl transition-opacity duration-500',
          'bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_200deg,#FFA63D_310deg,#E9800A_360deg)]',
          intensityClasses
        )}
      />

      {/* 2. Sharp 1px Conic Border Laser Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[150%] -z-1 animate-conic-spin group-hover:animate-conic-spin-fast bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_240deg,#FFA63D_330deg,#E9800A_360deg)]"
      />

      {/* 3. Obsidian Body Surface */}
      <div
        className={cn(
          'relative z-10 h-full w-full rounded-[15px] bg-[#0f0f11] p-6 text-neutral-100 transition-colors duration-300 group-hover:bg-[#121215]',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

// Alias export for maximum developer convenience across survey blueprint names
export const GlowingConicCard = GlowingConicBorder;
