"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/lib/i18n';

export function LifeCustomCursor() {
  const { locale } = useTranslation();
  const isAr = locale === 'ar';

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [cursorType, setCursorType] = useState<'default' | 'photo' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Only enable on desktop with fine mouse pointer
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(isReduced || !isFinePointer);

    if (!isFinePointer || isReduced) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      // Check hovered element cursor data
      const target = e.target as HTMLElement | null;
      const photoEl = target?.closest('[data-cursor-type="photo"]');
      const dragEl = target?.closest('[data-cursor-type="drag"]');

      if (dragEl) {
        setCursorType('drag');
      } else if (photoEl) {
        setCursorType('photo');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // Smooth lerp loop for the trailing ring
    const render = () => {
      // 0.2 lerp interpolation
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (reducedMotion || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* 1. Precise Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full bg-accent shadow-[0_0_8px_#e9800a] transition-transform duration-75"
      />

      {/* 2. Trailing Outer Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border border-accent/60 transition-[width,height,background-color,border-color] duration-200 ${
          cursorType === 'default'
            ? 'size-9 bg-accent/5'
            : cursorType === 'photo'
            ? 'size-16 bg-accent/20 border-accent backdrop-blur-[2px]'
            : 'size-16 bg-black/80 border-accent/90'
        }`}
      >
        {cursorType === 'photo' && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white">
            {isAr ? 'عرض' : 'View'}
          </span>
        )}
        {cursorType === 'drag' && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
            {isAr ? 'اسحب' : 'Drag'}
          </span>
        )}
      </div>
    </div>
  );
}
