"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const Vision2030Strip: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { locale, direction } = useTranslation();

  return (
    <section
      className={`relative py-12 sm:py-16 bg-surface border-t border-b border-border overflow-hidden ${className}`}
      dir={direction}
    >
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-accent/5 rounded-full blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl border border-accent/25 bg-black/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft border border-accent/30 text-accent shrink-0 shadow-glow-sm">
              <Sparkles className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                {locale === 'ar' ? 'بُنيت لرؤية 2030' : 'BUILT FOR VISION 2030'}
              </div>
              <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug">
                {locale === 'ar'
                  ? 'نبني للمملكة التي تتحول رقميًا. تعرّف على كيف تدعم خدماتنا الأربع أولويات رؤية 2030.'
                  : 'We build for a Kingdom that is going digital. See how our four services support Vision 2030 priorities.'}
              </p>
            </div>
          </div>

          <Link
            href="/vision-2030"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm shrink-0 active:scale-95"
          >
            <span>{locale === 'ar' ? 'رؤية 2030' : 'Vision 2030'}</span>
            {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Link>
        </div>
      </div>
    </section>
  );
};
