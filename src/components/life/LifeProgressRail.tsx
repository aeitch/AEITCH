"use client";

import React, { useState, useEffect } from 'react';
import { useTranslation } from '@/lib/i18n';

interface SectionNavItem {
  id: string;
  labelAr: string;
  labelEn: string;
}

const SECTIONS: SectionNavItem[] = [
  { id: 'hero', labelAr: 'البداية', labelEn: 'Intro' },
  { id: 'values', labelAr: 'القيم 01-05', labelEn: 'Values' },
  { id: 'team', labelAr: 'فريق الهندسة', labelEn: 'Team' },
  { id: 'trips', labelAr: 'الرحلات الجبلية', labelEn: 'Trips' },
  { id: 'celebrations', labelAr: 'الاحتفالات', labelEn: 'Celebrations' },
  { id: 'day', labelAr: 'يوم في إيتش', labelEn: 'A Day' },
  { id: 'numbers', labelAr: 'أرقام وإحصاءات', labelEn: 'Numbers' },
  { id: 'quotes', labelAr: 'كلمات الفريق', labelEn: 'In Their Words' },
  { id: 'join', labelAr: 'انضم إلينا', labelEn: 'Join Us' },
];

export function LifeProgressRail() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [activeSection, setActiveSection] = useState('hero');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // 1. Calculate document scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // 2. Identify active section based on scroll offset
      const offsets = SECTIONS.map((sec) => {
        const el = document.getElementById(sec.id);
        if (!el) return { id: sec.id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id: sec.id, top: Math.abs(rect.top) };
      });

      offsets.sort((a, b) => a.top - b.top);
      if (offsets[0] && offsets[0].top < window.innerHeight * 0.75) {
        setActiveSection(offsets[0].id);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. Thin Orange Scroll Progress Line At Top */}
      <div className="fixed top-0 start-0 w-full h-[2.5px] z-50 pointer-events-none bg-white/5">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-out shadow-[0_0_10px_#e9800a]"
          style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        />
      </div>

      {/* 2. Sticky Mini Side Rail (Desktop only) */}
      <nav
        aria-label="Page Sections"
        className="hidden lg:flex fixed end-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3 py-4 px-2.5 rounded-full border border-white/10 bg-black/75 backdrop-blur-md"
        dir={direction}
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const label = isAr ? sec.labelAr : sec.labelEn;

          return (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="group relative flex items-center justify-end"
              aria-label={`Jump to ${label}`}
            >
              {/* Tooltip Label on Hover or Active */}
              <span
                className={`absolute end-6 pe-2 pointer-events-none whitespace-nowrap font-mono text-[10px] tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'opacity-100 text-accent translate-x-0'
                    : 'opacity-0 text-white/50 ltr:translate-x-2 rtl:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}
              >
                {label}
              </span>

              {/* Indicator Dot */}
              <span
                className={`relative rounded-full transition-all duration-200 ${
                  isActive
                    ? 'h-5 w-2 bg-accent shadow-[0_0_8px_#e9800a]'
                    : 'size-2 bg-white/20 group-hover:bg-white/60'
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
