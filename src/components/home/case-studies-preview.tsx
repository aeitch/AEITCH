"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function CaseStudiesPreview() {
  const { t, direction, locale } = useTranslation();

  return (
    <section id="case-studies" className="relative py-24 bg-bg overflow-hidden" dir={direction}>
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/3 start-10 h-96 w-96 rounded-full bg-accent-soft blur-[160px] opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-accent mb-4">
              <span>{t.caseStudies.sectionTag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {t.caseStudies.heading}
            </h2>

            <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-normal">
              {t.caseStudies.subheading}
            </p>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-hover transition-colors self-start md:self-auto group"
          >
            <span>{t.common.viewAllCaseStudies}</span>
            {direction === 'rtl' ? (
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </motion.div>

        {/* 3 Featured Case Studies Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {t.caseStudies.items.map((cs, idx) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-xl backdrop-blur-xl transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2"
            >
              <div>
                {/* Category & Verified Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-mono text-accent">
                    {cs.category}
                  </span>
                  <span className="text-[10px] font-mono text-fg-subtle">
                    {cs.clientBadge}
                  </span>
                </div>

                {/* Case Study Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-5 group-hover:text-accent transition-colors leading-snug">
                  {cs.title}
                </h3>

                {/* Problem, Solution, Result Breakdown */}
                <div className="space-y-3 text-xs sm:text-sm text-fg-muted mb-6">
                  <div className="rounded-lg bg-bg p-3 border border-border">
                    <span className="font-bold text-white block mb-1">
                      {locale === 'ar' ? 'المشكلة والتحدي:' : 'The Challenge:'}
                    </span>
                    <p className="text-fg-muted leading-relaxed text-xs">{cs.problem}</p>
                  </div>

                  <div className="rounded-lg bg-bg p-3 border border-border">
                    <span className="font-bold text-white block mb-1">
                      {locale === 'ar' ? 'الحل الهندسي:' : 'The Solution:'}
                    </span>
                    <p className="text-fg-muted leading-relaxed text-xs">{cs.solution}</p>
                  </div>

                  <div className="rounded-lg bg-bg p-3 border border-accent/25">
                    <span className="font-bold text-accent block mb-1">
                      {locale === 'ar' ? 'النتيجة المحققة:' : 'Measured Result:'}
                    </span>
                    <p className="text-fg-muted leading-relaxed text-xs">{cs.result}</p>
                  </div>
                </div>
              </div>

              {/* Quantified Outcome Metrics Bar */}
              <div className="pt-4 border-t border-border">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {cs.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="rounded-lg bg-bg p-2 border border-border">
                      <div className="font-mono text-sm sm:text-base font-extrabold text-accent">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-fg-subtle leading-tight mt-0.5">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
