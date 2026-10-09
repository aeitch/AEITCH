"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export interface PhotoRevealFrameProps {
  src: string;
  alt: string;
  aspectRatio?: '3/4' | '4/3' | '16/9' | '16/10' | '1/1' | string;
  aspectClass?: string;
  priority?: boolean;
  className?: string;
  caption?: string;
  spotlightRadius?: number;
}

export function PhotoRevealFrame({
  src,
  alt,
  aspectRatio = '3/4',
  aspectClass,
  priority = false,
  className = '',
  caption,
  spotlightRadius = 80,
}: PhotoRevealFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    handleMouseMove(e);
    setIsHovered(true);
  }, [handleMouseMove]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleTouchToggle = useCallback((e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    if (touch) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;
      setMousePos({ x, y });
    }
    setIsTouched((prev) => !prev);
  }, []);

  const activeReveal = isHovered || isTouched;

  // Format CSS aspect-ratio correctly (e.g. "16/9" -> "16 / 9")
  const cssAspectRatio = aspectRatio ? aspectRatio.replace('/', ' / ') : undefined;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchToggle}
      data-cursor-type="photo"
      className={`relative select-none overflow-hidden bg-[#0A0A0A] border border-white/10 rounded-none group transition-colors duration-200 hover:border-accent/40 w-full ${
        aspectClass || ''
      } ${className}`}
      style={{
        aspectRatio: cssAspectRatio,
        transform: 'translateZ(0)',
      }}
    >
      {/* 1. Base Layer: High-Contrast Monochrome Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          style={{
            filter: 'grayscale(100%) contrast(125%) brightness(92%)',
          }}
        />
        {/* Subtle Film Grain Noise Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 2. Reveal Layer: Full Natural Color with Circular Mask (Following cursor) */}
      {!reducedMotion ? (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none transition-[clip-path] duration-150 ease-out"
          style={{
            clipPath: activeReveal
              ? `circle(${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px)`
              : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
            WebkitClipPath: activeReveal
              ? `circle(${spotlightRadius}px at ${mousePos.x}px ${mousePos.y}px)`
              : `circle(0px at ${mousePos.x}px ${mousePos.y}px)`,
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      ) : (
        /* Reduced Motion Fallback: Simple Fade */
        <div
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200 ${
            activeReveal ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}

      {/* 3. Interactive Accent Ring following pointer */}
      {!reducedMotion && activeReveal && (
        <div
          className="absolute pointer-events-none rounded-full border border-accent transition-opacity duration-150"
          style={{
            width: `${spotlightRadius * 2}px`,
            height: `${spotlightRadius * 2}px`,
            left: `${mousePos.x - spotlightRadius}px`,
            top: `${mousePos.y - spotlightRadius}px`,
            boxShadow: '0 0 18px rgba(233, 128, 10, 0.45)',
          }}
        />
      )}

      {/* 4. Film Frame Hairline Details */}
      <div className="absolute top-2 start-2 font-mono text-[9px] uppercase tracking-widest text-white/50 pointer-events-none px-1.5 py-0.5 bg-black/75 backdrop-blur-sm border border-white/10 text-balance">
        AEITCH // {caption || 'RAW'}
      </div>

      <div className="absolute bottom-2 end-2 font-mono text-[9px] text-accent pointer-events-none px-1.5 py-0.5 bg-black/75 backdrop-blur-sm border border-accent/30 tabular-nums">
        35MM // SPRINT
      </div>
    </div>
  );
}
