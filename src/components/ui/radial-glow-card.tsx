"use client";

import React, { useRef, useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface RadialGlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

export const RadialGlowCard: React.FC<RadialGlowCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(233, 128, 10, 0.16)',
  spotlightRadius = 380,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }, []);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'group relative rounded-2xl border border-white/10 bg-[#000000] p-7 overflow-hidden transition-all duration-300',
        'hover:border-accent hover:shadow-glow-sm',
        className
      )}
      style={
        {
          '--mouse-x': '0px',
          '--mouse-y': '0px',
        } as React.CSSProperties
      }
      {...props}
    >
      {/* 1. Dynamic Cursor Spotlight Glow Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightRadius}px circle at var(--mouse-x) var(--mouse-y), ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* 2. Elevated Content Layer */}
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
};

// Alias export for blueprint synergy
export const SpotlightCard = RadialGlowCard;
