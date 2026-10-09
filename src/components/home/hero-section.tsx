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

  const hook =
    locale === 'ar'
      ? 'هندسة سحابية بمعايير وادي السيليكون. مصممة خصيصاً للريادة الرقمية في المملكة.'
      : 'Silicon Valley-Grade Cloud Architecture. Tailored for Saudi Arabia’s Digital Frontier.';

  const headlineStart =
    locale === 'ar' ? 'تسريع المستقبل الرقمي للمملكة ' : 'Accelerating the Kingdom’s Digital Future with ';

  const headlineHighlight =
    locale === 'ar' ? 'بهندسة سحابية متقدمة' : 'Cloud-First Engineering';

  const headlineEnd =
    locale === 'ar' ? ' وحلول ديف أوبس مؤسسية.' : ' & Enterprise DevOps.';

  const subtitle =
    locale === 'ar'
      ? 'نجمع بين الحوكمة المعمارية الأمريكية وفرق الهندسة المتسارعة لبناء منصات رقمية سيادية فائقة الحصانة متوافقة مع ضوابط الأمن والسيادة السعودية (NCA ECC & PDPL).'
      : 'We combine US product governance with high-velocity engineering pods to build mission-critical digital platforms compliant with Saudi data sovereignty and security standards.';

  const primaryCta =
    locale === 'ar' ? 'احجز جلسة استشارية تنفيذية' : 'Schedule an Executive Briefing';

  const secondaryCta =
    locale === 'ar' ? 'استكشف الخدمات التقنية الأربع' : 'Explore The 4 Disciplines';

  return (
    <section className="relative overflow-hidden pt-6 pb-20 md:pt-12 md:pb-28" dir={direction}>
      {/* Background Subtle Tech Grid & Radial Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-30" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent-soft blur-[140px] opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8">
          {/* Main Value Proposition & Content (Desktop 7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* The Hook & Vision 2030 Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex flex-wrap items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-fg shadow-sm mb-6 backdrop-blur-md"
            >
              <span className="flex items-center gap-1.5 text-accent font-bold">
                <Zap className="h-3.5 w-3.5 fill-current" />
                <span>{locale === 'ar' ? 'معايير وادي السيليكون' : 'Silicon Valley Standard'}</span>
              </span>
              <span className="text-white/30">•</span>
              <span className="text-fg-muted">{hook}</span>
            </motion.div>

            {/* Semantic H1 Main Headline with Word-by-Word Mask Reveal */}
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-extrabold tracking-tight text-white leading-[1.2] mb-6">
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                >
                  {headlineStart}
                </motion.span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block bg-gradient-to-r from-white via-[#ff9420] to-accent bg-clip-text text-transparent"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                >
                  {headlineHighlight}
                </motion.span>
              </span>{' '}
              <span className="inline-block overflow-hidden align-top">
                <motion.span
                  className="inline-block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                >
                  {headlineEnd}
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
              {subtitle}
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
                <span>{primaryCta}</span>
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
                <span>{secondaryCta}</span>
              </a>
            </motion.div>

            {/* In-Country Hyperscaler Active Region Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-border w-full text-xs text-fg-subtle"
            >
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-emerald-400 shrink-0" />
                <span className="text-white">
                  {locale === 'ar' ? 'مناطق السحابة السيادية:' : 'In-Country Hyperscalers:'}{' '}
                  <span className="text-fg-muted">Google Dammam • Azure Riyadh • AWS KSA • Oracle</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                <span className="text-white">
                  {locale === 'ar' ? 'معايير الأمن والسيادة:' : 'Sovereign Mandates:'}{' '}
                  <span className="text-fg-muted">NCA ECC/CCC • Saudi PDPL Class 3</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* Three.js Interactive 3D Hero Visual (Desktop 5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full overflow-hidden">
            <div className="relative flex items-center justify-center w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[480px]">
              {/* Outer Radiant Glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-accent/10 blur-[90px] pointer-events-none" />

              {/* 3D Scene Canvas Container */}
              <div className="relative z-10 w-full aspect-square flex items-center justify-center">
                <Hero3DExperience />
              </div>
            </div>

            {/* Riyadh Sovereign Node Status Bar */}
            <div className="mt-4 flex items-center gap-3 rounded-full border border-border bg-surface/80 px-4 py-2 backdrop-blur-md">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="text-xs font-mono font-medium text-fg">
                {locale === 'ar' ? 'بوابة الرياض السحابية: متصلة ونشطة' : 'Riyadh Sovereign Cloud Gateway: ACTIVE'}
              </span>
              <span className="h-3 w-[1px] bg-border" />
              <span className="text-[11px] font-mono text-emerald-400">99.99% UPTIME</span>
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
