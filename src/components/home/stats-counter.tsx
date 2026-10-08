"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { animateCounter } from '@/lib/anime-motion';
import { viewportOnce } from '@/lib/motion';

export interface MetricItem {
  id?: string;
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
  description?: string | null;
  icon?: string | null;
  order?: number;
  isActive?: boolean;
}

export interface StatsCounterProps {
  initialMetrics?: MetricItem[];
}

function MetricCounterCard({
  value,
  label,
  note,
}: {
  value: string;
  label: string;
  note?: string;
}) {
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    // Parse numeric value, prefix and suffix
    const match = value.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const prefix = match[1] || '';
    const numericPart = parseFloat(match[2]);
    const suffix = match[3] || '';
    const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;

    let anim: ReturnType<typeof animateCounter> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          anim = animateCounter(el, numericPart, {
            startValue: 0,
            decimals,
            prefix,
            suffix,
            duration: 1500,
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      anim?.revert();
    };
  }, [value]);

  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-zinc-200 bg-white p-3.5 sm:p-6 text-center shadow-sm transition-all duration-300 hover:border-accent hover:shadow-xl">
      <div
        ref={numberRef}
        className="font-mono text-2xl sm:text-4xl md:text-5xl font-black text-accent mb-1 sm:mb-2 tracking-tight tabular-nums"
      >
        {value}
      </div>

      <div className="text-xs sm:text-sm font-bold text-zinc-950 mb-1.5 sm:mb-2 leading-snug">
        {label}
      </div>

      {note && (
        <div className="inline-block rounded bg-zinc-100 px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-mono text-zinc-600 border border-zinc-200">
          {note}
        </div>
      )}
    </div>
  );
}

export function StatsCounter({ initialMetrics }: StatsCounterProps) {
  const { t, direction } = useTranslation();

  return (
    <section className="relative pt-20 pb-12 sm:pt-24 sm:pb-14 bg-[#fafafa] text-zinc-900 border-t border-zinc-200 overflow-hidden" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-accent/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-accent mb-3 shadow-sm">
            <span>{t.proof.sectionTag}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-3">
            {t.proof.heading}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {t.proof.subheading}
          </p>
        </motion.div>

        {/* 4 Quantitative Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {t.proof.metrics.map((metric, idx) => (
            <MetricCounterCard
              key={idx}
              value={metric.value}
              label={metric.label}
              note={metric.note}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
