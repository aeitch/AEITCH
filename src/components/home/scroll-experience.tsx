"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Activity, ShieldCheck, Terminal, Cpu, ArrowDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

const TOTAL_FRAMES = 240;

export function ScrollExperience() {
  const { direction, locale } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeFrameIndex, setActiveFrameIndex] = useState(1);

  // Framer motion scroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate current frame (1 to 240)
  const frameTransform = useTransform(scrollYProgress, [0, 1], [1, TOTAL_FRAMES]);

  // Phase opacity transforms for synchronized HUD overlays
  const phase1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [0, 1, 1, 0]);
  const phase1Y = useTransform(scrollYProgress, [0, 0.05, 0.22, 0.28], [30, 0, 0, -30]);

  const phase2Opacity = useTransform(scrollYProgress, [0.28, 0.33, 0.52, 0.58], [0, 1, 1, 0]);
  const phase2Y = useTransform(scrollYProgress, [0.28, 0.33, 0.52, 0.58], [30, 0, 0, -30]);

  const phase3Opacity = useTransform(scrollYProgress, [0.58, 0.63, 0.80, 0.86], [0, 1, 1, 0]);
  const phase3Y = useTransform(scrollYProgress, [0.58, 0.63, 0.80, 0.86], [30, 0, 0, -30]);

  const phase4Opacity = useTransform(scrollYProgress, [0.86, 0.91, 1], [0, 1, 1]);
  const phase4Y = useTransform(scrollYProgress, [0.86, 0.91, 1], [30, 0, 0]);

  // Preload frames progressively
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Preload keyframe 1 immediately for instant paint
    const img1 = new Image();
    img1.src = `/scroll-motion/frame_0001.webp`;
    img1.onload = () => {
      images[1] = img1;
      imagesRef.current = images;
      renderFrame(1);
    };

    // Preload remaining frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(4, '0');
      img.src = `/scroll-motion/frame_${frameNum}.webp`;
      img.onload = () => {
        loadedCount++;
        images[i] = img;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount >= 30) {
          // Ready to scrub once initial chunk is loaded
          setImagesLoaded(true);
        }
      };
    }

    imagesRef.current = images;
  }, []);

  // Canvas paint method with aspect-ratio: cover
  const renderFrame = useCallback((frameNumber: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameNumber] || imagesRef.current[1];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    if (canvas.width !== cw * dpr || canvas.height !== ch * dpr) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    // Compute aspect-ratio: cover
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = cw / ch;
    let renderW = cw;
    let renderH = ch;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      renderH = cw / imgRatio;
      offsetY = (ch - renderH) / 2;
    } else {
      renderW = ch * imgRatio;
      offsetX = (cw - renderW) / 2;
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    ctx.restore();
  }, []);

  // Listen to frame changes via Framer Motion transform listener
  useEffect(() => {
    const unsubscribe = frameTransform.on('change', (latest) => {
      const idx = Math.min(TOTAL_FRAMES, Math.max(1, Math.round(latest)));
      setActiveFrameIndex(idx);
      renderFrame(idx);
    });

    return () => unsubscribe();
  }, [frameTransform, renderFrame]);

  // Re-render on window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(activeFrameIndex);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeFrameIndex, renderFrame]);

  return (
    <div
      ref={containerRef}
      className="relative h-[360vh] bg-black text-white"
      dir={direction}
      id="neural-mesh-experience"
    >
      {/* Sticky Fullscreen Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="h-full w-full object-cover"
          style={{ width: '100%', height: '100%' }}
        />

        {/* Ambient Top & Bottom Gradients for Seamless Blending */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/90 to-transparent z-10" />

        {/* HUD Telemetry Frame & Live Scrubber Overlay */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14">
          {/* Top HUD Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
              </span>
              <span className="font-mono text-xs uppercase tracking-widest text-white/90">
                AEITCH NEURAL ENGINE // FRAME MATRIX
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-white/60">
              <span className="rounded-md border border-white/10 bg-black/60 px-2.5 py-1">
                INDEX: {String(activeFrameIndex).padStart(4, '0')} / {TOTAL_FRAMES}
              </span>
              <span className="rounded-md border border-white/10 bg-black/60 px-2.5 py-1 text-accent">
                {Math.round((activeFrameIndex / TOTAL_FRAMES) * 100)}% COMPLETE
              </span>
            </div>
          </div>

          {/* Center Stage: Dynamic Phase Overlays */}
          <div className="relative mx-auto max-w-4xl text-center flex items-center justify-center w-full">
            {/* Phase 1: Complexity Ingestion (0% - 25%) */}
            <motion.div
              style={{ opacity: phase1Opacity, y: phase1Y }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs font-semibold text-accent mb-4 backdrop-blur-md">
                <Terminal className="h-3.5 w-3.5" />
                <span>PHASE 01 // ARCHITECTURAL DECOMPOSITION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                {locale === 'ar' ? 'تفكيك التعقيد المؤسسي' : 'Taming Enterprise Complexity'}
              </h2>
              <p className="max-w-xl text-sm sm:text-base text-white/70 font-mono tracking-wide">
                {locale === 'ar'
                  ? 'تحويل الأنظمة التقليدية المتراكمة إلى بنية كودية متجانسة وخالية من الديون المعمارية.'
                  : 'Deconstructing legacy monoliths into distributed, auditable autonomous modules.'}
              </p>
            </motion.div>

            {/* Phase 2: Agentic Topology (25% - 55%) */}
            <motion.div
              style={{ opacity: phase2Opacity, y: phase2Y }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-1.5 font-mono text-xs font-semibold text-white mb-4 backdrop-blur-md">
                <Cpu className="h-3.5 w-3.5 text-accent" />
                <span>PHASE 02 // AUTONOMOUS AGENT PODS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                {locale === 'ar' ? 'أسراب الذكاء الاصطناعي التطبيقي' : 'Autonomous Agent Swarms'}
              </h2>
              <p className="max-w-xl text-sm sm:text-base text-white/70 font-mono tracking-wide">
                {locale === 'ar'
                  ? 'وكلاء تنفيذيون ذاتيو التصحيح يعملون بتنسيق بياني مباشر وبزمن استجابة فائق.'
                  : 'Self-healing, deterministic agent graphs running high-throughput enterprise pipelines.'}
              </p>
            </motion.div>

            {/* Phase 3: Sovereign Mesh (55% - 80%) */}
            <motion.div
              style={{ opacity: phase3Opacity, y: phase3Y }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 font-mono text-xs font-semibold text-accent mb-4 backdrop-blur-md">
                <Activity className="h-3.5 w-3.5 text-accent" />
                <span>PHASE 03 // SOVEREIGN HIGHWAY & LATENCY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                {locale === 'ar' ? 'سحابة سيادية بزمن استجابة < 10ms' : 'Sub-10ms Sovereign Inference'}
              </h2>
              <p className="max-w-xl text-sm sm:text-base text-white/70 font-mono tracking-wide">
                {locale === 'ar'
                  ? 'معالجة كاملة داخل الحدود الرقمية للمملكة (الرياض، جدة، نيوم) بالتوافق مع SDAIA و PDPL.'
                  : 'Localized inside Kingdom data borders. Zero external data exfiltration.'}
              </p>
            </motion.div>

            {/* Phase 4: Production Convergence (80% - 100%) */}
            <motion.div
              style={{ opacity: phase4Opacity, y: phase4Y }}
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/70 px-4 py-1.5 font-mono text-xs font-semibold text-accent mb-4 backdrop-blur-md">
                <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                <span>PHASE 04 // PRODUCTION CONVERGENCE</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-tight mb-4">
                {locale === 'ar' ? 'جاهزية إنتاجية لمستقبل المملكة' : 'Engineered For Vision 2030'}
              </h2>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                <a
                  href="#services"
                  className="rounded-xl bg-accent px-7 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                >
                  {locale === 'ar' ? 'استكشف المعمارية البرمجية' : 'Explore Engineering Services'}
                </a>
                <a
                  href="#consultation"
                  className="rounded-xl border border-white/20 bg-surface px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:border-accent hover:text-accent transition-colors"
                >
                  {locale === 'ar' ? 'حجز جلسة تدقيق تقني' : 'Book Architecture Audit'}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Bottom Telemetry Scrub Bar */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-mono text-white/60">
              <span className="flex items-center gap-2">
                <ArrowDown className="h-3.5 w-3.5 text-accent animate-bounce" />
                {locale === 'ar' ? 'تابع التمرير للملاحة المعمارية' : 'Scroll to scrub neural mesh'}
              </span>
              <span>BUFFER STATUS: {imagesLoaded ? 'SYNCHRONIZED' : `${loadProgress}% CACHED`}</span>
            </div>

            {/* Visual Scrubber Track */}
            <div className="relative h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-75"
                style={{ width: `${(activeFrameIndex / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
