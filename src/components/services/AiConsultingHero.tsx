"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Calendar,
  Layers,
  Lock,
  Terminal,
  Activity,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D WebGL component with SSR disabled
const SovereignAiMesh3D = dynamic(
  () => import('@/components/3d/SovereignAiMesh3D').then((mod) => mod.SovereignAiMesh3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Sovereign AI Neural Core...</span>
        </div>
      </div>
    ),
  }
);

export function AiConsultingHero() {
  const { locale, direction } = useTranslation();
  const [activeNode, setActiveNode] = useState<string>('sovereign-llm');

  const isAr = locale === 'ar';

  const nodeTabs = [
    { id: 'sovereign-llm', labelEn: 'Private In-Kingdom LLMs', labelAr: 'نماذج لغوية سيادية' },
    { id: 'hybrid-rag', labelEn: 'Hybrid RAG & Vector', labelAr: 'محرك RAG الهجين' },
    { id: 'guardrails', labelEn: 'Deterministic Guardrails', labelAr: 'بوابات الأمان والحتمية' },
    { id: 'agent-mesh', labelEn: 'Autonomous Agents', labelAr: 'وكلاء مستقلون' },
    { id: 'llmops-eval', labelEn: 'LLMOps & RAGAS Evals', labelAr: 'حوكمة النماذج والتقييم' },
  ];

  return (
    <section
      className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-[#080808] pt-28 pb-20 border-b border-white/10"
      dir={direction}
    >
      {/* 1. Midnight Luxury Background Dynamics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d1408]/40 via-[#0a0a0c] to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Core Lighting */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 h-[420px] w-[500px] rounded-full bg-[#e9800a]/12 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Narrative & Executive Telemetry (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Engineering Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6 w-fit shadow-[inset_0_1px_0_rgba(233,128,10,0.2)]">
              <Cpu className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                {isAr
                  ? 'الذكاء الاصطناعي السيادي والأنظمة المستقلة'
                  : 'ENTERPRISE SOVEREIGN AI & AUTONOMOUS SYSTEMS'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {isAr ? (
                <>
                  أنظمة ذكاء اصطناعي سيادي ووكلاء مستقلون مصممة لسيادة{' '}
                  <span className="text-[#e9800a]">البيانات داخل المملكة.</span>
                </>
              ) : (
                <>
                  Private Generative AI & Autonomous Agent Systems Engineered for{' '}
                  <span className="text-[#e9800a]">Saudi Sovereignty.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr
                ? 'تجاوز التجارب السطحية نحو بنية تحتية مؤسسية حتمية وعالية الدقة للذكاء الاصطناعي. نبني خطوط استرجاع RAG خالية من الهلوسة، وننشر النماذج التأسيسية المفتوحة على خوادم GPU داخل المملكة، وننظم وكلاء مستقلين لتنفيذ العمليات المعقدة بأمان تام.'
                : 'Moving past toy prototypes to deterministic enterprise AI infrastructure. We deploy private open-weight foundation models on in-kingdom GPU clusters (vLLM / TensorRT), build zero-hallucination RAG pipelines, and orchestrate goal-directed autonomous agents without cross-border data leakage.'}
            </p>

            {/* Sovereign Infrastructure Signals Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block w-full mb-1">
                {isAr ? 'بيئات الحوسبة والسيادة المعتمدة بالمملكة:' : 'In-Kingdom AI Hyperscaler & Sovereign Enclaves:'}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>NVIDIA H100 GPU Enclaves (AWS Riyadh)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Oracle Cloud Riyadh AI Infrastructure</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] animate-pulse" />
                <span>Air-Gapped Sovereign Data Enclaves</span>
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_25px_rgba(233,128,10,0.35)] active:scale-[0.98]"
              >
                <Calendar className="h-4 w-4" />
                <span>{isAr ? 'حجز جلسة استشارية للذكاء الاصطناعي' : 'Book AI Architecture Session'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#ai-architecture-schematic"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'معاينة معمارية RAG والوكلاء' : 'Inspect RAG & Agent Topology'}</span>
              </a>
            </div>

            {/* Audited Engineering Telemetry */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'سيادة البيانات' : 'Data Residency'}
                </span>
                <span className="font-mono text-lg font-bold text-[#e9800a] tracking-tight">100% In-KSA</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'حماية تامة من التسريب' : 'Zero 3rd-Party APIs'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'زمن الاستجابة' : 'Inference Latency'}
                </span>
                <span className="font-mono text-lg font-bold text-emerald-400 tracking-tight">&lt; 80ms TTFT</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'محرك vLLM المسرع' : 'vLLM / TensorRT Core'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'دقة الاسترجاع' : 'RAG Precision'}
                </span>
                <span className="font-mono text-lg font-bold text-white tracking-tight">&gt; 96% Faithfulness</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'تقييم RAGAS المعتمد' : 'RAGAS Benchmark Audited'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Sovereign AI Mesh (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-3 sm:p-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Top Bar Indicators */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-ping" />
                  <span className="text-white/80 font-bold">SOVEREIGN_NEURAL_CORE</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/40">
                  <Lock className="h-3 w-3 text-emerald-400" />
                  <span>AIR-GAPPED • DETERMINISTIC</span>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <SovereignAiMesh3D
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px]"
                activeNodeId={activeNode}
                onSelectNode={setActiveNode}
              />

              {/* Node Navigation Tabs */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2 px-1">
                  {isAr ? 'ركائز الذكاء الاصطناعي السيادي (انقر للمعاينة):' : 'Sovereign AI Disciplines (Click to Focus):'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {nodeTabs.map((tab) => {
                    const isActive = activeNode === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveNode(tab.id)}
                        className={`font-mono text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                          isActive
                            ? 'bg-[#e9800a] text-black font-bold shadow-[0_0_12px_rgba(233,128,10,0.4)]'
                            : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/5'
                        }`}
                      >
                        {isAr ? tab.labelAr : tab.labelEn}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
