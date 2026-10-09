"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Cpu,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Server,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D WebGL component with SSR disabled
const CloudArchitecture3D = dynamic(
  () => import('@/components/3d/CloudArchitecture3D').then((mod) => mod.CloudArchitecture3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Microservices Mesh...</span>
        </div>
      </div>
    ),
  }
);

export function CloudArchitectureHero() {
  const { locale, direction } = useTranslation();
  const [selectedNode, setSelectedNode] = useState<string>('gateway');

  const isAr = locale === 'ar';

  return (
    <section
      className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-[#080808] pt-28 pb-20 border-b border-white/10"
      dir={direction}
    >
      {/* 1. Midnight Luxury Background Dynamics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1f1307]/45 via-[#0b0b0d] to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Core Lighting */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 h-[420px] w-[500px] rounded-full bg-[#e9800a]/12 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetric Narrative & Executive Signals (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Engineering Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6 w-fit shadow-[inset_0_1px_0_rgba(233,128,10,0.2)]">
              <Cpu className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                {isAr
                  ? 'الهندسة السحابية المعمارية وتطوير المنتجات'
                  : 'CLOUD-FIRST PRODUCT ENGINEERING'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {isAr ? (
                <>
                  معماريات سحابية موزعة وأنظمة موجهة بالأحداث{' '}
                  <span className="text-[#e9800a]">لقيادة التوسع الرقمي.</span>
                </>
              ) : (
                <>
                  Microservices & Event-Driven Systems{' '}
                  <span className="text-[#e9800a]">Engineered for Resilient Scale.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr
                ? 'نبني منتجات البرمجيات كخدمة (SaaS) متعددة المستأجرين من الصفر، ونفكك الأنظمة القديمة الضخمة (Monoliths) إلى معماريات خدمات صغرى عالية التحمل متوافقة أصالة مع مناطق الحوسبة السحابية المحلية في المملكة.'
                : 'We architect enterprise-grade multi-tenant SaaS products from greenfield foundations and decompose fragile legacy monoliths into high-throughput, decoupled microservices natively aligned with Saudi Arabia’s new hyperscaler cloud regions.'}
            </p>

            {/* Live Hyperscaler In-Kingdom Compliance Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block w-full mb-1">
                {isAr ? 'توافق كامل مع السحابات المعتمدة محلياً:' : 'Native KSA In-Region Hyperscaler Alignment:'}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AWS Riyadh (me-central-1)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Azure Riyadh Hub</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Google Cloud Dammam</span>
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_25px_rgba(233,128,10,0.35)] active:scale-[0.98]"
              >
                <span>{isAr ? 'احجز استشارة معمارية سحابية' : 'Book Architecture Consultation'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#topology-blueprint"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'استكشف المخطط الطوبولوجي' : 'Inspect Topology Blueprint'}</span>
              </a>
            </div>

            {/* Audited Operational SLA Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 font-mono">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  &lt; 5ms
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'زمن استجابة الحافة' : 'p99 Edge Latency'}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#e9800a] block">
                  99.99%
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'اتفاقية التوافر السحابي' : 'Availability SLA'}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  ZERO
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'فقدان بالرسائل (Kafka)' : 'Message Loss (Kafka)'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Distributed Mesh Canvas (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#131215] to-[#0d0c0e] p-4 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* Header inside canvas card */}
              <div className="flex items-center justify-between gap-3 mb-2 px-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#e9800a]" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    DISTRIBUTED MESH TOPOLOGY
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  LIVE CLUSTER
                </span>
              </div>

              {/* Three.js Interactive WebGL Component */}
              <CloudArchitecture3D
                activeNodeId={selectedNode}
                onSelectNode={(nodeId) => setSelectedNode(nodeId)}
              />

              {/* Bottom active node inspector */}
              <div className="mt-3 pt-3 border-t border-white/10 px-2 flex items-center justify-between font-mono text-xs">
                <span className="text-white/50">NODE IN FOCUS:</span>
                <span className="text-[#e9800a] font-bold uppercase">
                  {selectedNode.toUpperCase()} SERVICE
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
