"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Building2,
  Zap,
  ShoppingBag,
  CreditCard,
  Activity,
  Truck,
  Home,
  GraduationCap,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export function IndustriesSection() {
  const { t, direction, locale } = useTranslation();

  const sectorIconMap: Record<string, React.ReactNode> = {
    gov: <ShieldCheck className="h-6 w-6 text-accent" />,
    'smart-cities': <Building2 className="h-6 w-6 text-accent" />,
    energy: <Zap className="h-6 w-6 text-accent" />,
    retail: <ShoppingBag className="h-6 w-6 text-accent" />,
    fintech: <CreditCard className="h-6 w-6 text-accent" />,
    healthtech: <Activity className="h-6 w-6 text-accent" />,
    logistics: <Truck className="h-6 w-6 text-accent" />,
    proptech: <Home className="h-6 w-6 text-accent" />,
    edtech: <GraduationCap className="h-6 w-6 text-accent" />,
  };

  return (
    <section id="industries" className="relative py-24 bg-bg overflow-hidden" dir={direction}>
      {/* Background Subtle Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/3 start-0 h-96 w-96 rounded-full bg-accent-soft blur-[160px] opacity-25" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-accent mb-4">
            <span>{t.industries.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {t.industries.heading}
          </h2>

          <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-normal">
            {t.industries.subheading}
          </p>
        </motion.div>

        {/* 9 Sector Bento Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.industries.sectors.map((sec, idx) => (
            <motion.div
              key={sec.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-lg backdrop-blur-xl transition-colors duration-300 hover:border-accent/40 hover:bg-surface-2"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 group-hover:border-accent/40 transition-colors">
                    {sectorIconMap[sec.id]}
                  </div>
                  <span className="rounded-md border border-border bg-surface-2 px-2.5 py-1 text-[11px] font-mono text-accent">
                    {sec.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent transition-colors">
                  {sec.title}
                </h3>

                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {sec.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-fg-subtle group-hover:text-accent transition-colors">
                <span className="font-semibold">
                  {locale === 'ar' ? 'حلول ومعماريات القطاع' : 'Architecture & Blueprint'}
                </span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
