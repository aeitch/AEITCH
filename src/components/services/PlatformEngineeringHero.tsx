"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Cloud,
  ArrowRight,
  Terminal,
  Activity,
  Layers,
  ShieldCheck,
  Server,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D WebGL component with SSR disabled
const PlatformCluster3D = dynamic(
  () => import('@/components/3d/PlatformCluster3D').then((mod) => mod.PlatformCluster3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Kubernetes & GitOps Mesh...</span>
        </div>
      </div>
    ),
  }
);

export function PlatformEngineeringHero() {
  const { locale, direction } = useTranslation();
  const [selectedCluster, setSelectedCluster] = useState<string>('control-plane');

  const isAr = locale === 'ar';

  return (
    <section
      className="relative min-h-[85vh] w-full flex items-center overflow-hidden bg-[#080808] pt-28 pb-20 border-b border-white/10"
      dir={direction}
    >
      {/* 1. Midnight Luxury Background Dynamics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1e1308]/40 via-[#0a0a0c] to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Ambient Core Lighting */}
      <div className="pointer-events-none absolute top-1/4 start-1/4 h-[420px] w-[500px] rounded-full bg-[#e9800a]/12 blur-[170px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Asymmetric Narrative & Executive Signals (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Top Engineering Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6 w-fit shadow-[inset_0_1px_0_rgba(233,128,10,0.2)]">
              <Cloud className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                {isAr
                  ? 'هندسة المنصات والعمليات السحابية DEVOPS'
                  : 'PLATFORM ENGINEERING & ENTERPRISE DEVOPS'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {isAr ? (
                <>
                  تقليص وقت نشر البرمجيات من أسابيع إلى{' '}
                  <span className="text-[#e9800a]">دقائق معدودة.</span>
                </>
              ) : (
                <>
                  Deployment Lead Time Reduced from Weeks to{' '}
                  <span className="text-[#e9800a]">Minutes.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr
                ? 'نبني منصات المطورين الداخلية (IDPs)، وبيئات كوبرنيتس المتعددة على السحابات السعودية المحلية، وخطوط GitOps المؤتمتة التي تحول البنية التحتية من عائق تشغيلي إلى ميزة تنافسية فائقة السرعة.'
                : 'We engineer Internal Developer Platforms (IDPs), production-grade multi-cluster Kubernetes on Saudi in-kingdom regions, and GitOps delivery pipelines that turn infrastructure from an enterprise bottleneck into a high-speed competitive advantage.'}
            </p>

            {/* Live In-Kingdom Kubernetes Clusters Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block w-full mb-1">
                {isAr ? 'عناقيد كوبرنيتس في المناطق السحابية المعتمدة بالمملكة:' : 'Multi-Cluster K8s Aligned with Saudi Hyperscalers:'}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AWS EKS Riyadh (me-central-1)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Azure AKS Riyadh</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Google GKE Dammam</span>
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_25px_rgba(233,128,10,0.35)] active:scale-[0.98]"
              >
                <span>{isAr ? 'طلب تقييم المنصة والبنية التحتية' : 'Request Platform & DevOps Assessment'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#gitops-fabric"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'استكشف نسيج GitOps السحابي' : 'Inspect GitOps Fabric Blueprint'}</span>
              </a>
            </div>

            {/* Audited Platform SLA Bar */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
              <div>
                <span className="text-xl sm:text-2xl font-black text-[#e9800a] block">
                  &lt; 8 Mins
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'زمن النشر الفعلي' : 'Lead Time to Prod'}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  99.99%
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'اتفاقية توافر المنصة' : 'Cluster Uptime SLA'}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white block">
                  ZERO DRIFT
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'حوكمة أكواد التيرفورم' : 'IaC State Lock'}
                </span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-emerald-400 block">
                  -42% OPEX
                </span>
                <span className="text-[11px] text-white/50 uppercase">
                  {isAr ? 'توفير تكاليف FinOps' : 'Avg Cloud FinOps'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Platform Cluster (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-b from-[#131215] to-[#0c0c0e] p-4 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* Header inside canvas card */}
              <div className="flex items-center justify-between gap-3 mb-2 px-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-[#e9800a]" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    K8S GITOPS ORCHESTRATION
                  </span>
                </div>
                <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                  ACTIVE SYNC
                </span>
              </div>

              {/* Three.js WebGL Component */}
              <PlatformCluster3D
                activeClusterId={selectedCluster}
                onSelectCluster={(id) => setSelectedCluster(id)}
              />

              {/* Bottom active node inspector */}
              <div className="mt-3 pt-3 border-t border-white/10 px-2 flex items-center justify-between font-mono text-xs">
                <span className="text-white/50">PLATFORM LAYER:</span>
                <span className="text-[#e9800a] font-bold uppercase">
                  {selectedCluster.replace('-', ' ').toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
