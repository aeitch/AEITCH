"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';

// Dynamically import Three.js 3D experience with SSR disabled to guarantee fast HTML LCP
const Hero3DExperience = dynamic(
  () => import('@/components/3d/Hero3DExperience').then((mod) => mod.Hero3DExperience),
  {
    ssr: false,
    loading: () => (
      <div className="relative flex w-full max-w-[480px] aspect-square items-center justify-center">
        <div className="h-64 w-64 rounded-full border border-border bg-surface animate-pulse" />
      </div>
    ),
  }
);

export function HeroSection() {
  const { t, direction } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pt-12 md:pb-28" dir={direction}>
      {/* Background Subtle Tech Grid & Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-30" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent-soft blur-[140px] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* Main Value Proposition & Content (Desktop 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Vision 2030 Thematic Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-fg shadow-sm mb-6 backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-accent animate-pulse" />
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Semantic H1 Main Headline with Word-by-Word Mask Reveal */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.2] mb-6">
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  {t.hero.titleStart}
                </motion.span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block bg-gradient-to-r from-white via-[#ff9420] to-accent bg-clip-text text-transparent"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  {t.hero.titleHighlight}
                </motion.span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                >
                  {t.hero.titleEnd}
                </motion.span>
              </span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-10"
            >
              <button
                onClick={() => setModalOpen(true)}
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm hover:shadow-glow-md active:scale-95"
              >
                <span>{t.hero.primaryCta}</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold text-white hover:border-accent hover:text-accent transition-all duration-200 backdrop-blur-md"
              >
                <span>{t.hero.secondaryCta}</span>
              </a>
            </motion.div>

            {/* Micro-Badges & Regional Trust Anchors */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border w-full text-xs text-fg-subtle"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span>{t.common.gmt3Badge}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span>{t.common.pdplBadge}</span>
              </div>
            </motion.div>
          </div>

            {/* Three.js Interactive 3D Hero Visual (Desktop 5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full overflow-hidden">
              <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px]">
                {/* Outer Radiant Glow */}
                <div className="pointer-events-none absolute -inset-4 rounded-full bg-accent-soft blur-3xl opacity-30" />

                {/* Three.js WebGL Scene Island */}
                <Hero3DExperience isRtl={direction === 'rtl'} />
              </div>

              {/* Real-time Telemetry Overlay Card */}
              <div className="mt-4 flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/90 px-3.5 sm:px-4 py-2 sm:py-2.5 shadow-xl backdrop-blur-md text-xs w-full max-w-sm">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                  <span className="font-medium text-fg-muted">{t.hero.riyadhNodeLabel}</span>
                </div>
                <div className="text-accent font-mono font-semibold">99.99% SLA</div>
              </div>
            </div>
        </div>
      </div>

      {/* Consultation Intake Modal */}
      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
}
