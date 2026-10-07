"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { drawSvgPath } from '@/lib/anime-motion';
import { viewportOnce } from '@/lib/motion';

export function HowWeWork() {
  const { t, direction, locale } = useTranslation();
  const connectorPathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = connectorPathRef.current;
    if (!path) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          drawSvgPath(path, { duration: 1600 });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-we-work" className="relative py-28 bg-white text-zinc-900 overflow-hidden border-y border-zinc-200" dir={direction}>
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70" />
      <div className="pointer-events-none absolute top-1/2 end-1/4 h-80 w-80 rounded-full bg-accent/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-semibold text-accent mb-4 shadow-sm">
            <span>{t.howWeWork.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-6">
            {t.howWeWork.heading}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal mb-8">
            {t.howWeWork.subheading}
          </p>

          {/* Gulf Timezone Overlap Callout Banner */}
          <div className="inline-flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-3 text-xs sm:text-sm font-semibold text-zinc-900 shadow-sm">
            <span>{t.howWeWork.gulfTimezoneNotice}</span>
          </div>
        </motion.div>

        {/* Desktop Process SVG Connecting Line (Anime.js animated line) */}
        <div className="hidden lg:block relative w-full h-8 mb-4">
          <svg className="w-full h-full" viewBox="0 0 1000 32" fill="none">
            <path
              ref={connectorPathRef}
              d="M 50 16 L 950 16"
              stroke="#e9800a"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-60"
            />
          </svg>
        </div>

        {/* 5-Step Process Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {t.howWeWork.steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-[#fafafa] p-6 shadow-sm hover:shadow-xl hover:border-accent hover:bg-white transition-all duration-300"
            >
              <div>
                {/* Step Number Tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-2xl font-black text-accent">
                    {step.number}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-accent" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-zinc-950 mb-2.5 group-hover:text-accent transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                  {step.description}
                </p>
              </div>

              {/* Concrete Step Deliverable Box */}
              <div className="pt-4 border-t border-zinc-200 text-xs">
                <span className="font-mono text-[10px] uppercase text-accent tracking-wider block mb-1 font-bold">
                  {locale === 'ar' ? 'المخرج المعتمد:' : 'Verified Deliverable:'}
                </span>
                <span className="text-zinc-700 font-medium leading-snug">
                  {step.deliverable}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
