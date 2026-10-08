"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Activity,
  Rocket,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Layers,
  Radio,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface SectionAct {
  id: number;
  actCode: string;
  sectionNumber: string;
  tag: string;
  tagAr: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  metricLabel: string;
  metricLabelAr: string;
  metricValue: string;
  spec: string;
  targetAnchor: string;
  ctaText: string;
  ctaTextAr: string;
  videoSrc: string;
  posterSrc: string;
  icon: React.ReactNode;
}

const SECTION_ACTS: SectionAct[] = [
  {
    id: 0,
    actCode: 'ACT 01 // 04',
    sectionNumber: 'SECTION 01',
    tag: 'SOVEREIGN ARCHITECTURAL CORE',
    tagAr: 'النواة المعمارية السيادية',
    title: 'Engineered From the Silicon Up',
    titleAr: 'هندسة برمجية متقدمة من النواة',
    subtitle:
      'Deconstructing legacy monoliths into distributed, auditable autonomous modules with zero technical debt.',
    subtitleAr:
      'تحويل الأنظمة المتراكمة إلى بنية كودية متجانسة وخالية من الديون البرمجية مع نقل الملكية الفكرية بالكامل.',
    metricLabel: 'CODEBASE OWNERSHIP',
    metricLabelAr: 'ملكية الشيفرة البرمجية',
    metricValue: '100% IP TRANSFER',
    spec: 'ZERO VENDOR LOCK-IN',
    targetAnchor: '#vision-2030',
    ctaText: 'EXPLORE ARCHITECTURE',
    ctaTextAr: 'استكشف المعمارية',
    videoSrc: '/videos/hero-core.mp4',
    posterSrc: '/videos/hero-core-poster.webp',
    icon: <Terminal className="h-5 w-5" />,
  },
  {
    id: 1,
    actCode: 'ACT 02 // 04',
    sectionNumber: 'SECTION 02',
    tag: 'APPLIED AI & SERVICES SHOWCASE',
    tagAr: 'الذكاء الاصطناعي التطبيقي والخدمات',
    title: 'High-Throughput Sovereign Mesh',
    titleAr: 'شبكة استدلال سيادية فائقة السرعة',
    subtitle:
      'Sub-10ms localized inference pipelines strictly confined within Kingdom borders. 10,000 QPS deterministic DAG execution.',
    subtitleAr:
      'معالجة كاملة داخل الحدود الرقمية للمملكة بزمن استجابة فائق دون أي تسريب خارجي للبيانات.',
    metricLabel: 'SYSTEM THROUGHPUT',
    metricLabelAr: 'حجم معالجة الطلبات',
    metricValue: '10,000 QPS CONCURRENCY',
    spec: 'RIYADH // LOCAL GCC EDGE',
    targetAnchor: '#services',
    ctaText: 'OPEN SERVICES WORKBENCH',
    ctaTextAr: 'فتح منصة الخدمات',
    videoSrc: '/videos/neural-mesh.mp4',
    posterSrc: '/videos/neural-mesh-poster.webp',
    icon: <Cpu className="h-5 w-5" />,
  },
  {
    id: 2,
    actCode: 'ACT 03 // 04',
    sectionNumber: 'SECTION 03',
    tag: 'KINGDOM DIGITAL INFRASTRUCTURE',
    tagAr: 'البنية الرقمية السيادية لرؤية 2030',
    title: 'Riyadh to Red Sea Subsea Spine',
    titleAr: 'العمود الفقري السحابي لمستقبل المملكة',
    subtitle:
      'Direct low-latency fiber interconnection linking Riyadh Tier-IV, Jeddah Cable Gateways, Neom Cognitive Nodes, and Dammam.',
    subtitleAr:
      'ترابط شبكي منخفض الكمون يربط مراكز البيانات في الرياض وجدة ونيوم والمنطقة الشرقية.',
    metricLabel: 'LOCAL LATENCY',
    metricLabelAr: 'زمن الاستجابة المحلي',
    metricValue: '3.8ms IN-KINGDOM',
    spec: 'SDAIA & PDPL CLASS 3 AUDITED',
    targetAnchor: '#vision-2030',
    ctaText: 'LAUNCH SOVEREIGN COCKPIT',
    ctaTextAr: 'تشغيل قمرة القيادة السيادية',
    videoSrc: '/videos/vision-2030.mp4',
    posterSrc: '/videos/vision-2030-poster.webp',
    icon: <Activity className="h-5 w-5" />,
  },
  {
    id: 3,
    actCode: 'ACT 04 // 04',
    sectionNumber: 'SECTION 04',
    tag: 'AUTONOMOUS PRODUCTION FOUNDRY',
    tagAr: 'مسبك الوكلاء الذاتيين وسرعة الإنتاج',
    title: 'Autonomous Multi-Agent Foundry',
    titleAr: 'مسبك الوكلاء الذاتيين الموجهين للإنتاج',
    subtitle:
      'Deterministic agent graphs running self-healing pipelines, accelerating complex enterprise delivery to an 8-week launch cadence.',
    subtitleAr:
      'أسراب وكلاء ذكاء اصطناعي ذاتية التعافي تختصر دورات تطوير البرمجيات المعقدة إلى دورات تسليم مدتها 8 أسابيع.',
    metricLabel: 'DELIVERY VELOCITY',
    metricLabelAr: 'سرعة الإطلاق للإنتاج',
    metricValue: '56-DAY PRODUCTION SPRINT',
    spec: 'B2B ENTERPRISE READY',
    targetAnchor: '#how-we-work',
    ctaText: 'INSPECT SPRINT CADENCE',
    ctaTextAr: 'فحص وتيرة الإطلاق',
    videoSrc: '/videos/agent-foundry.mp4',
    posterSrc: '/videos/agent-foundry-poster.webp',
    icon: <Rocket className="h-5 w-5" />,
  },
];

const ACT_DURATION = 8.0;

export function CinematicScrollExperience() {
  const { direction, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const [activeAct, setActiveAct] = useState<number>(0);
  const [localActProgress, setLocalActProgress] = useState<number>(0);
  const [overallProgress, setOverallProgress] = useState<number>(0);

  // Targets for smooth video scrubbing interpolation
  const targetTimesRef = useRef<number[]>([0.05, 0.05, 0.05, 0.05]);
  const activeActRef = useRef<number>(0);

  // Track scroll position through the 400vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setOverallProgress(Math.round(clamped * 100));

    // Determine which act is currently active (4 quadrants: 0.0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1.0)
    let actIndex = Math.min(3, Math.floor(clamped * 4));
    if (clamped >= 0.99) actIndex = 3;
    setActiveAct(actIndex);
    activeActRef.current = actIndex;

    // Calculate local progress within this quadrant (0.0 to 1.0)
    const quadrantStart = actIndex * 0.25;
    const local = Math.min(1, Math.max(0, (clamped - quadrantStart) / 0.25));
    setLocalActProgress(local);

    // Drive video scrub time during the first 65% of the act (0.0 to 8.0s)
    const scrubFactor = Math.min(1, local / 0.65);
    targetTimesRef.current[actIndex] = Math.max(0.05, Math.min(7.95, scrubFactor * ACT_DURATION));
  });

  // Pre-warm and prime all 4 videos immediately on mount
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = true;
        video.playsInline = true;
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        try {
          video.load();
        } catch (e) {
          // ignore
        }
      }
    });
  }, []);

  // 60FPS Lerp loop for buttery-smooth video scrubbing
  useEffect(() => {
    let animId: number;

    const smoothScrubLoop = () => {
      const idx = activeActRef.current;
      const video = videoRefs.current[idx];

      if (video) {
        const target = targetTimesRef.current[idx] || 0.05;
        const current = video.currentTime;
        const delta = target - current;

        // Apply smooth interpolation when delta > 0.03s and video is ready to seek
        if (Math.abs(delta) > 0.03 && !video.seeking) {
          const step = delta * 0.35;
          const nextTime = Math.max(0.01, Math.min(7.95, current + step));

          try {
            if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
              (video as any).fastSeek(nextTime);
            } else {
              video.currentTime = nextTime;
            }
          } catch (e) {
            // ignore
          }
        }
      }

      animId = requestAnimationFrame(smoothScrubLoop);
    };

    animId = requestAnimationFrame(smoothScrubLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Jump to specific act on user click
  const handleJumpToAct = (actIdx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const containerHeight = containerRef.current.clientHeight;
    const targetOffset = containerTop + (actIdx / 4) * (containerHeight - window.innerHeight) + 50;
    window.scrollTo({
      top: targetOffset,
      behavior: 'smooth',
    });
  };

  // Jump straight to the interactive sections below
  const handleSkipToSections = () => {
    const target = document.getElementById('sections-content');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentAct = SECTION_ACTS[activeAct];

  // The section content reveals when local scroll progress is >= 0.55
  const isSectionRevealed = localActProgress >= 0.55;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[400vh] bg-black"
      dir={direction}
      id="cinematic-motion"
    >
      {/* Pinned Sticky Viewport: Takes 100vw, 100dvh during the scroll motion journey */}
      <div className="sticky top-0 h-[100dvh] min-h-[100dvh] max-h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-black">
        {/* Layer 1: Dedicated Full-Screen Scroll-Scrubbed Videos with Instant Poster Fallbacks */}
        <div className="absolute inset-0 h-full w-full pointer-events-none">
          {SECTION_ACTS.map((act, idx) => {
            const isActive = activeAct === idx;
            return (
              <div
                key={act.id}
                className={`absolute inset-0 h-full w-full will-change-transform transition-all duration-700 ease-out ${
                  isActive
                    ? isSectionRevealed
                      ? 'opacity-35 scale-[0.98] blur-[1px]'
                      : 'opacity-100 scale-100'
                    : 'opacity-0 scale-105 pointer-events-none'
                }`}
              >
                {/* Zero-latency poster fallback so video area is NEVER a blank black void */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={act.posterSrc}
                  alt={act.title}
                  className="absolute inset-0 h-full w-full object-cover pointer-events-none"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />

                {/* High-performance scroll-scrubbed video with faststart */}
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={act.videoSrc}
                  poster={act.posterSrc}
                  muted
                  playsInline
                  preload="auto"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            );
          })}

          {/* Precision Vignettes to Guarantee High Contrast Readability */}
          <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none" />
          <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[160px] pointer-events-none" />
        </div>

        {/* Layer 2: Top Tactical HUD Bar */}
        <header className="relative z-20 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 pt-3 sm:pt-6 flex items-center justify-between font-mono text-xs">
          {/* Brand & Scroll Scrub Status */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/15 bg-black/85 backdrop-blur-md px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-lg text-white">
              <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent animate-ping" />
              <span className="font-bold tracking-wider text-[10px] sm:text-xs">
                {currentAct.actCode} {'//'} {currentAct.sectionNumber}
              </span>
            </div>
            <div className="hidden md:flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-white/70">
              <Sparkles className="h-3 w-3 text-accent" />
              <span>SCROLL-DRIVEN MOTION</span>
            </div>
          </div>

          {/* Center: Act Buttons */}
          <div className="hidden sm:flex items-center gap-1 rounded-xl border border-white/15 bg-black/85 backdrop-blur-md p-1">
            {SECTION_ACTS.map((act, idx) => {
              const isSelected = activeAct === idx;
              return (
                <button
                  key={act.id}
                  onClick={() => handleJumpToAct(idx)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    isSelected
                      ? 'bg-accent text-black shadow-glow-sm scale-105'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  0{idx + 1}
                </button>
              );
            })}
          </div>

          {/* Right: Quick Skip to Sections CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleSkipToSections}
              className="group flex items-center gap-1.5 sm:gap-2 rounded-xl border border-accent/40 bg-accent/10 px-2.5 sm:px-3.5 py-1 sm:py-1.5 text-[10px] sm:text-[11px] font-bold text-accent hover:bg-accent hover:text-black transition-all shadow-glow-sm backdrop-blur-md"
            >
              <span>{locale === 'ar' ? 'تخطي للأقسام' : 'SKIP TO SECTIONS'}</span>
              <ArrowDown className="h-3 w-3 sm:h-3.5 sm:w-3.5 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </header>

        {/* Layer 3: Main Cinematic Stage — Dramatic Section Reveal */}
        <main className="relative z-20 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 items-center py-2 sm:py-6">
          {/* Main Cinematic Section Reveal Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {/* When local progress < 0.55: Show subtle cinematic scrub prompt */}
              {!isSectionRevealed ? (
                <motion.div
                  key={`scrub-prompt-${currentAct.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2 sm:space-y-3"
                >
                  <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/20 bg-black/70 backdrop-blur-md px-3 py-1 font-mono text-[10px] sm:text-xs text-white/90">
                    <span className="flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-accent" />
                    <span>{locale === 'ar' ? currentAct.tagAr : currentAct.tag}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-2xl">
                    {locale === 'ar' ? currentAct.titleAr : currentAct.title}
                  </h1>
                  <p className="font-mono text-[11px] sm:text-sm text-accent tracking-widest uppercase flex items-center gap-2">
                    <span>SCROLL DOWN TO REVEAL FULL SECTION</span>
                    <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-bounce" />
                  </p>
                </motion.div>
              ) : (
                /* When local progress >= 0.55: The Section Content Dramatically Reveals! */
                <motion.div
                  key={`revealed-section-${currentAct.id}`}
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl sm:rounded-3xl border border-white/20 bg-black/90 backdrop-blur-2xl p-4 sm:p-7 md:p-9 shadow-2xl max-w-3xl"
                >
                  {/* Eyebrow Pill */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-accent bg-accent/15 px-2.5 sm:px-3.5 py-0.5 sm:py-1 font-mono text-[10px] sm:text-xs font-bold text-accent shadow-glow-sm">
                      {currentAct.icon}
                      <span>{currentAct.sectionNumber} REVEALED</span>
                    </div>
                    <span className="font-mono text-[10px] sm:text-xs text-white/60 border border-white/10 px-2 py-0.5 rounded">
                      {locale === 'ar' ? currentAct.tagAr : currentAct.tag}
                    </span>
                  </div>

                  {/* High-Impact Section Title */}
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight sm:leading-[1.15] mb-2 sm:mb-4">
                    {locale === 'ar' ? currentAct.titleAr : currentAct.title}
                  </h2>

                  {/* Executive Subtitle */}
                  <p className="text-xs sm:text-sm md:text-base text-white/85 leading-relaxed font-normal mb-3 sm:mb-6 max-w-2xl font-sans line-clamp-3 sm:line-clamp-none">
                    {locale === 'ar' ? currentAct.subtitleAr : currentAct.subtitle}
                  </p>

                  {/* Concrete Engineering Specifications */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 pt-3 sm:pt-5 border-t border-white/10 font-mono mb-3 sm:mb-6">
                    <div className="rounded-xl border border-accent/40 bg-accent/10 p-2.5 sm:p-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-accent uppercase tracking-wider block mb-0.5 font-bold">
                          {locale === 'ar' ? currentAct.metricLabelAr : currentAct.metricLabel}
                        </span>
                        <span className="text-sm sm:text-lg font-black text-white">
                          {currentAct.metricValue}
                        </span>
                      </div>
                      <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 sm:p-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wider block mb-0.5 font-bold">
                          ENGINEERING SPEC
                        </span>
                        <span className="text-xs sm:text-base font-bold text-white/90">
                          {currentAct.spec}
                        </span>
                      </div>
                      <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 text-accent shrink-0" />
                    </div>
                  </div>

                  {/* Action CTA to Jump into Section */}
                  <div className="flex items-center gap-4">
                    <a
                      href={currentAct.targetAnchor}
                      className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-accent px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-xs sm:text-sm font-bold text-black hover:bg-accent-hover transition-all shadow-glow-sm"
                    >
                      <span>{locale === 'ar' ? currentAct.ctaTextAr : currentAct.ctaText}</span>
                      {direction === 'rtl' ? (
                        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                      ) : (
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Rail: Vertical Chapter Navigator (Desktop) */}
          <div className="hidden lg:col-span-4 lg:flex flex-col items-end gap-3 font-mono text-xs">
            <div className="rounded-2xl border border-white/15 bg-black/85 backdrop-blur-xl p-4 w-72 space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-white/60 text-[11px]">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-accent" />
                  <span>SECTION REVEAL MATRIX</span>
                </span>
                <span className="text-accent font-bold">{overallProgress}% SCROLLED</span>
              </div>

              {SECTION_ACTS.map((act, idx) => {
                const isActive = activeAct === idx;
                return (
                  <button
                    key={act.id}
                    onClick={() => handleJumpToAct(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-start transition-all ${
                      isActive
                        ? 'border-accent bg-accent/20 text-white shadow-glow-sm'
                        : 'border-white/10 bg-black/40 text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          isActive ? 'bg-accent animate-ping' : 'bg-white/30'
                        }`}
                      />
                      <span className="font-bold text-[11px]">{act.actCode}</span>
                    </div>
                    <span className="text-[10px] text-accent truncate max-w-[120px]">
                      {act.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>

        {/* Layer 4: Bottom Telemetry & Scrub Controller Bar */}
        <footer className="relative z-20 mx-auto w-full max-w-7xl px-3 sm:px-6 lg:px-8 pb-3 sm:pb-6 font-mono text-xs">
          {/* Real-time Scroll Scrub Progress Track with Chapter Boundary Markers */}
          <div className="relative w-full h-1.5 rounded-full bg-white/10 overflow-hidden mb-2 sm:mb-4">
            <motion.div
              className="h-full bg-gradient-to-r from-[#e9800a] to-[#ffaa40] shadow-glow-sm"
              style={{ width: `${overallProgress}%` }}
            />
            {/* Act Boundary Ticks at 25%, 50%, 75% */}
            <div className="absolute inset-0 flex justify-between pointer-events-none">
              <div className="w-0.5 h-full bg-white/20" style={{ left: '25%' }} />
              <div className="w-0.5 h-full bg-white/20" style={{ left: '50%' }} />
              <div className="w-0.5 h-full bg-white/20" style={{ left: '75%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between gap-2 sm:gap-4 text-white/70">
            {/* Scrub Telemetry */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[9px] sm:text-[10px] text-accent font-bold">
                FRAME SCRUB: {Math.round(localActProgress * 100)}%
              </span>
              <span className="text-[10px] text-white/40 hidden sm:inline">
                {'//'} {currentAct.sectionNumber}
              </span>
            </div>

            {/* Scroll Motion Prompt */}
            <div className="flex items-center gap-1.5 text-white/80 animate-pulse text-[10px] sm:text-[11px] truncate max-w-[180px] sm:max-w-none">
              <span>
                {locale === 'ar'
                  ? 'حرك التمرير لمشاهدة المشهد وكشف القسم'
                  : 'SCROLL TO ADVANCE VIDEO & REVEAL SECTION'}
              </span>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-accent animate-bounce shrink-0" />
            </div>

            {/* In-Kingdom SLA Telemetry */}
            <div className="hidden sm:flex items-center gap-2 text-[11px]">
              <span className="h-2 w-2 rounded-full bg-accent" />
              <span className="text-white/50">RIYADH ME-CENTRAL-1:</span>
              <span className="text-accent font-bold">3.8ms</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
