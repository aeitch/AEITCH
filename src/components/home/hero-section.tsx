"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Clock, Sparkles, Server, Zap } from 'lucide-react';
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
  const { locale, direction } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const eyebrow =
    locale === 'ar' ? 'إيتش — هندسة رقمية للمؤسسات' : 'AEITCH — Digital engineering for enterprises';

  const h1 =
    locale === 'ar' ? 'أربع خدمات. هندسة واحدة متقنة.' : 'Four services. One engineering standard.';

  const sub =
    locale === 'ar'
      ? 'نبني حلول الذكاء الاصطناعي والمنتجات الرقمية والبنية السحابية والبرمجيات المخصصة، بفرق هندسية senior، وبما يخدم مستهدفات رؤية المملكة 2030.'
      : 'We build AI automation, digital products, cloud infrastructure and custom software, with senior engineers, in step with Saudi Vision 2030.';

  const cta1 =
    locale === 'ar' ? 'احجز استشارة تقنية مجانية' : 'Book a free technical consultation';

  const cta2 =
    locale === 'ar' ? 'استكشف خدماتنا' : 'Explore our services';

  const monoLabels = ['AI', 'PRODUCT', 'DEVOPS & CLOUD', 'CUSTOM SOFTWARE', 'VISION 2030'];

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24" dir={direction}>
      {/* Background Subtle Tech Grid & Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-25" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent-soft blur-[140px] opacity-35" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* Main Value Proposition & Content (Desktop 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-mono font-medium text-accent shadow-sm mb-6 backdrop-blur-md"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span>{eyebrow}</span>
            </motion.div>

            {/* Semantic H1 Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
              <motion.span
                className="inline-block"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                {h1}
              </motion.span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-fg-muted leading-relaxed mb-8 max-w-2xl font-normal"
            >
              {sub}
            </motion.p>

            {/* Dual CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10"
            >
              <button
                onClick={() => setModalOpen(true)}
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm hover:shadow-glow-md active:scale-95"
              >
                <span>{cta1}</span>
                {direction === 'rtl' ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white hover:border-accent hover:text-accent transition-all duration-200 backdrop-blur-md"
              >
                <span>{cta2}</span>
              </a>
            </motion.div>

            {/* Hero Detail Strip (Small Mono Labels) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="pt-6 border-t border-border w-full flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] font-mono tracking-wider text-fg-subtle"
            >
              {monoLabels.map((label, idx) => (
                <React.Fragment key={label}>
                  <span className="text-fg-muted hover:text-accent transition-colors font-medium">
                    {label}
                  </span>
                  {idx < monoLabels.length - 1 && (
                    <span className="text-border select-none">•</span>
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>

          {/* Three.js 3D Hero Experience */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full overflow-hidden">
            <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 blur-[90px] pointer-events-none" />
              <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                <Hero3DExperience />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Consultation Modal */}
      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
