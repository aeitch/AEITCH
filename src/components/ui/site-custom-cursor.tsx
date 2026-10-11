"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from '@/lib/i18n';

export function SiteCustomCursor() {
  const { locale } = useTranslation();
  const isAr = locale === 'ar';

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'photo' | 'explore' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isOverLight, setIsOverLight] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine mouse pointer and no reduced-motion preference
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

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovered over a light section
      const lightSection = target.closest('[data-theme="light"]') || target.closest('.bg-light-contrast');
      setIsOverLight(!!lightSection);

      // Check contextual cursor attributes
      const photoEl = target.closest('[data-cursor-type="photo"]');
      const dragEl = target.closest('[data-cursor-type="drag"]');
      const exploreEl = target.closest('[data-cursor-type="explore"]');
      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], [data-cursor-type="hover"]');

      if (dragEl) {
        setCursorType('drag');
      } else if (photoEl) {
        setCursorType('photo');
      } else if (exploreEl) {
        setCursorType('explore');
      } else if (interactiveEl && !target.closest('input, textarea, select')) {
        setCursorType('hover');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    const render = () => {
      // Silky spring/lerp interpolation (0.18 factor)
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

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

  const isExpanded = cursorType !== 'default';

  return (
    <>
      {/* Central Precision Orange Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 start-0 z-50 -ms-1 -mt-1 h-2 w-2 rounded-full bg-[#e9800a] transition-opacity duration-150"
        style={{
          opacity: cursorType === 'photo' || cursorType === 'drag' || cursorType === 'explore' ? 0 : 1,
          willChange: 'transform',
        }}
      />

      {/* Trailing Elastic Ring with Contextual Badges */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed top-0 start-0 z-50 flex items-center justify-center rounded-full transition-all duration-300 ease-out will-change-transform ${
          cursorType === 'photo' || cursorType === 'explore'
            ? 'h-16 w-16 -ms-8 -mt-8 bg-black/85 text-white border border-[#e9800a] shadow-[0_0_20px_rgba(233,128,10,0.35)] backdrop-blur-md'
            : cursorType === 'drag'
            ? 'h-14 w-14 -ms-7 -mt-7 bg-[#e9800a] text-black font-bold shadow-lg'
            : cursorType === 'hover'
            ? '-ms-5 -mt-5 h-10 w-10 border border-[#e9800a]/80 bg-[#e9800a]/10'
            : isOverLight
            ? '-ms-4 -mt-4 h-8 w-8 border border-black/40 bg-black/5'
            : '-ms-4 -mt-4 h-8 w-8 border border-white/30 bg-transparent'
        }`}
      >
        {cursorType === 'photo' && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#e9800a]">
            {isAr ? 'عرض' : 'VIEW'}
          </span>
        )}
        {cursorType === 'explore' && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-[#e9800a]">
            {isAr ? 'استكشف' : 'EXPLORE'}
          </span>
        )}
        {cursorType === 'drag' && (
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">
            {isAr ? 'اسحب' : 'DRAG'}
          </span>
        )}
      </div>
    </>
  );
}
