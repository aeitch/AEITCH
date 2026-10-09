"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Cloud,
  Code2,
  Rocket,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Activity,
  Sliders,
  Play,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';
import { SovereignMicroservicesTopology, MvpRoadmapGantt } from '@/components/schematics';

export function ServicesShowcase() {
  const { t, direction, locale } = useTranslation();
  const [selectedServiceId, setSelectedServiceId] = useState<string>('ai-automation');
  const [modalOpen, setModalOpen] = useState(false);

  // State for Interactive AI Sandbox
  const [concurrency, setConcurrency] = useState(2500);

  // State for Cloud CI/CD Interactive Simulation
  const [buildStep, setBuildStep] = useState(3);
  const [isSimulatingBuild, setIsSimulatingBuild] = useState(false);

  const activeService =
    t.services.items.find((s) => s.id === selectedServiceId) || t.services.items[0];

  const serviceIcons: Record<string, React.ReactNode> = {
    'ai-automation': <Cpu className="h-5 w-5" />,
    'product-development': <Rocket className="h-5 w-5" />,
    'cloud-devops': <Cloud className="h-5 w-5" />,
    'custom-software': <Code2 className="h-5 w-5" />,
    'mvp-development': <Rocket className="h-5 w-5" />,
  };

  // Run automated build simulation
  const handleSimulateBuild = () => {
    setIsSimulatingBuild(true);
    setBuildStep(0);
    const interval = setInterval(() => {
      setBuildStep((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsSimulatingBuild(false);
          return 3;
        }
        return prev + 1;
      });
    }, 700);
  };

  return (
    <section id="services" className="relative py-28 bg-[#fafafa] text-zinc-900 overflow-hidden border-t border-zinc-200" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
      <div className="pointer-events-none absolute bottom-0 start-1/4 h-96 w-96 rounded-full bg-accent/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-accent mb-4 shadow-sm">
            <Activity className="h-3.5 w-3.5 text-accent animate-pulse" />
            <span>{t.services.sectionTag}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-4">
            {t.services.heading}
          </h2>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-normal">
            {t.services.subheading}
          </p>
        </div>

        {/* 4 Interactive Service Mode Switchers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-8 sm:mb-10">
          {t.services.items.map((service) => {
            const isSelected = selectedServiceId === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`relative flex items-center gap-3 rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 text-start transition-all duration-200 ${
                  isSelected
                    ? 'border-accent bg-zinc-950 text-white shadow-md ring-1 ring-accent/30'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:text-black shadow-sm'
                }`}
              >
                <div
                  className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border transition-colors ${
                    isSelected
                      ? 'border-accent bg-accent text-black font-bold'
                      : 'border-zinc-200 bg-zinc-50 text-accent'
                  }`}
                >
                  {serviceIcons[service.id]}
                </div>
                <div className="truncate">
                  <div className={`font-mono text-[9px] sm:text-[10px] uppercase tracking-wider ${isSelected ? 'text-accent' : 'text-zinc-400'}`}>
                    {service.id === 'ai-automation'
                      ? 'AI // SOVEREIGN'
                      : service.id === 'product-development' || service.id === 'mvp-development'
                      ? 'PRODUCT // MVP'
                      : service.id === 'cloud-devops'
                      ? 'CLOUD // DEVOPS'
                      : 'ENTERPRISE // B2B'}
                  </div>
                  <div className={`truncate text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-zinc-900'}`}>{service.title}</div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interactive Engineering Workbench */}
        <div className="rounded-2xl sm:rounded-3xl border border-zinc-200/90 bg-white p-4 sm:p-8 lg:p-10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Visual Interactive Apparatus Sandbox (7 Cols) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {/* 1. APPLIED AI & AUTONOMOUS AGENTS SANDBOX */}
                {selectedServiceId === 'ai-automation' && (
                  <motion.div
                    key="ai-sandbox"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-white/10 bg-black p-6 space-y-6"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-accent" />
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          SOVEREIGN INFERENCE SIMULATOR
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        100% PRIVATE WEIGHTS
                      </span>
                    </div>

                    {/* Concurrency Slider */}
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-2">
                        <span className="text-fg-subtle flex items-center gap-1.5">
                          <Sliders className="h-3.5 w-3.5 text-accent" />
                          CONCURRENT WORKLOAD INGESTION:
                        </span>
                        <span className="text-accent font-bold">{concurrency.toLocaleString()} QPS</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="10000"
                        step="250"
                        value={concurrency}
                        onChange={(e) => setConcurrency(Number(e.target.value))}
                        className="w-full accent-[#e9800a] h-1.5 rounded-lg bg-surface-2 cursor-pointer"
                      />
                    </div>

                    {/* Live Telemetry Dial Gauges */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="rounded-xl border border-white/10 bg-surface p-3 text-center">
                        <span className="font-mono text-[10px] text-fg-subtle block">THROUGHPUT</span>
                        <span className="font-mono text-base sm:text-lg font-black text-white">
                          {Math.round((concurrency * 1.82)).toLocaleString()}
                        </span>
                        <span className="font-mono text-[9px] text-accent block">TOKENS / SEC</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-surface p-3 text-center">
                        <span className="font-mono text-[10px] text-fg-subtle block">P99 LATENCY</span>
                        <span className="font-mono text-base sm:text-lg font-black text-accent">
                          {(8.2 + (concurrency / 3000)).toFixed(1)}ms
                        </span>
                        <span className="font-mono text-[9px] text-white/50 block">RIYADH CLOUD</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-surface p-3 text-center">
                        <span className="font-mono text-[10px] text-fg-subtle block">ACCURACY</span>
                        <span className="font-mono text-base sm:text-lg font-black text-white">99.4%</span>
                        <span className="font-mono text-[9px] text-accent block">VERIFIED DAG</span>
                      </div>
                    </div>

                    {/* Animated Mock Terminal Log */}
                    <div className="rounded-xl border border-white/10 bg-surface-2 p-3 font-mono text-[11px] text-white/70 space-y-1">
                      <div className="text-accent flex items-center gap-1.5">
                        <Terminal className="h-3 w-3" />
                        <span>[STREAM]: Swarm consensus verified. Zero external exfiltration.</span>
                      </div>
                      <div className="text-white/40 truncate">
                        &gt; routing to local GCC edge pods // cluster status: optimal
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. CLOUD & DEVOPS CI/CD PIPELINE RADAR */}
                {selectedServiceId === 'cloud-devops' && (
                  <motion.div
                    key="devops-sandbox"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-white/10 bg-black p-6 space-y-6"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <Cloud className="h-4 w-4 text-accent" />
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                          AUTOMATED SOVEREIGN CI/CD PIPELINE
                        </span>
                      </div>
                      <button
                        onClick={handleSimulateBuild}
                        disabled={isSimulatingBuild}
                        className="flex items-center gap-1.5 font-mono text-[10px] text-accent bg-accent/10 px-2.5 py-1 rounded-md border border-accent/30 hover:bg-accent/20 transition-colors disabled:opacity-50"
                      >
                        {isSimulatingBuild ? <RotateCcw className="h-3 w-3 animate-spin" /> : <Play className="h-3 w-3" />}
                        <span>TRIGGER SIMULATION</span>
                      </button>
                    </div>

                    {/* Step-by-Step Interactive DAG */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-mono">
                      {[
                        { label: '01. COMMIT', desc: 'Git Signed' },
                        { label: '02. LINT', desc: 'Terraform Sec' },
                        { label: '03. BUILD', desc: 'OCI Container' },
                        { label: '04. DEPLOY', desc: 'Riyadh K8s' },
                      ].map((step, sIdx) => {
                        const isDone = buildStep >= sIdx;
                        const isCurrent = buildStep === sIdx && isSimulatingBuild;
                        return (
                          <div
                            key={sIdx}
                            className={`rounded-xl border p-2.5 sm:p-3 transition-all ${
                              isCurrent
                                ? 'border-accent bg-accent/20 text-accent animate-pulse'
                                : isDone
                                ? 'border-accent/40 bg-surface text-white'
                                : 'border-white/10 bg-surface-2 text-white/40'
                            }`}
                          >
                            <span className="text-[10px] block text-accent font-bold">{step.label}</span>
                            <span className="text-xs font-bold block mt-1">{step.desc}</span>
                            <span className="text-[9px] text-fg-subtle block mt-0.5">
                              {isDone ? 'PASSED' : 'PENDING'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Live Cluster Specs Slate */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="rounded-xl border border-white/10 bg-surface p-3.5">
                        <span className="font-mono text-[10px] text-fg-subtle block">SLA AVAILABILITY</span>
                        <span className="font-mono text-lg sm:text-xl font-black text-white">99.99%</span>
                        <span className="font-mono text-[10px] text-accent block">ZERO DOWNTIME UPGRADES</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-surface p-3.5">
                        <span className="font-mono text-[10px] text-fg-subtle block">FINOPS COST EFFICIENCY</span>
                        <span className="font-mono text-lg sm:text-xl font-black text-white">-38%</span>
                        <span className="font-mono text-[10px] text-accent block">AUTOSCALED IDLE NODES</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. CUSTOM ENTERPRISE SOFTWARE ARCHITECTURE BLUEPRINT */}
                {selectedServiceId === 'custom-software' && (
                  <motion.div
                    key="custom-software-sandbox"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <SovereignMicroservicesTopology />
                  </motion.div>
                )}

                {/* 4. PRODUCT DEVELOPMENT & RAPID MVP 8-WEEK SPRINT MACHINE */}
                {(selectedServiceId === 'product-development' || selectedServiceId === 'mvp-development') && (
                  <motion.div
                    key="mvp-sandbox"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                  >
                    <MvpRoadmapGantt />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Column: Architectural Outcome & Direct Action CTA (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md border border-zinc-200 bg-zinc-100 px-3 py-1 font-mono text-xs font-semibold text-accent">
                    {locale === 'ar' ? 'المعيار الهندسي' : 'ENGINEERING SPEC'}
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    DISCIPLINE 0{t.services.items.findIndex((s) => s.id === selectedServiceId) + 1} / 04
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 mb-2 leading-tight">
                  {activeService.title}
                </h3>

                <p className="text-sm font-mono text-accent font-semibold mb-4">
                  {activeService.tagline}
                </p>

                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  {activeService.description}
                </p>

                {/* Key Measured Outcomes */}
                <div className="space-y-2 mb-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    {locale === 'ar' ? 'النتائج المحققة قياسياً:' : 'Verified Operational Targets:'}
                  </div>
                  {activeService.metrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2.5 text-xs text-zinc-800 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activeService.deliverables.map((item, dIdx) => (
                    <span
                      key={dIdx}
                      className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-mono text-zinc-600"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-zinc-200 flex items-center justify-between gap-4">
                <button
                  onClick={() => setModalOpen(true)}
                  className="rounded-xl bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-accent-hover transition-colors shadow-sm"
                >
                  {t.common.bookConsultation}
                </button>

                <Link
                  href={`/services/${activeService.slug || activeService.id}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-zinc-900 hover:text-accent transition-colors"
                >
                  <span>{locale === 'ar' ? 'المواصفة الكاملة' : 'Full Architecture Spec'}</span>
                  {direction === 'rtl' ? <ChevronLeft className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService={selectedServiceId}
      />
    </section>
  );
}
