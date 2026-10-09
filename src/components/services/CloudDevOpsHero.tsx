"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Cloud,
  ArrowRight,
  Server,
  Activity,
  Terminal,
  Layers,
  ShieldCheck,
  Zap,
  Calendar,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

// Dynamically import the 3D WebGL component with SSR disabled
const CloudDevOpsMesh3D = dynamic(
  () => import('@/components/3d/CloudDevOpsMesh3D').then((mod) => mod.CloudDevOpsMesh3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[380px] sm:h-[440px] lg:h-[500px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Multi-Cloud Fabric Mesh...</span>
        </div>
      </div>
    ),
  }
);

export function CloudDevOpsHero() {
  const { locale, direction } = useTranslation();
  const [activeDiscipline, setActiveDiscipline] = useState<string>('iac-terraform');

  const isAr = locale === 'ar';

  const disciplineTabs = [
    { id: 'iac-terraform', labelEn: 'Zero-Drift Terraform', labelAr: 'تيرفورم ككود بدون انحراف' },
    { id: 'k8s-mesh', labelEn: 'Multi-AZ K8s & Istio', labelAr: 'عناقيد كوبرنيتس و Istio' },
    { id: 'gitops-argocd', labelEn: 'ArgoCD GitOps', labelAr: 'مزامنة ArgoCD GitOps' },
    { id: 'opentelemetry-hub', labelEn: 'OpenTelemetry Hub', labelAr: 'المراقبة الموزعة' },
    { id: 'finops-engine', labelEn: 'FinOps Optimization', labelAr: 'ترشيد التكاليف FinOps' },
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
              <Cloud className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                {isAr
                  ? 'معمارية السحابة والعمليات السحابية DEVOPS'
                  : 'CLOUD ARCHITECTURE & DEVOPS ENGINEERING'}
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.12]">
              {isAr ? (
                <>
                  هندسة بنية سحابية مرنة ومتعددة المناطق على السحابات السعودية{' '}
                  <span className="text-[#e9800a]">بموثوقية 99.99%.</span>
                </>
              ) : (
                <>
                  Architecting Resilient Multi-Cloud Infrastructure on Saudi Hyperscalers with{' '}
                  <span className="text-[#e9800a]">99.99% Reliability.</span>
                </>
              )}
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl mb-8">
              {isAr
                ? 'نقضي على اختناقات النشر اليدوي ونضمن استمرارية الأعمال عبر عناقيد كوبرنيتس الموزعة، والبنية التحتية ككود (Terraform) بدون أي انحراف، وخطوط GitOps المؤتمتة وترشيد تكاليف السحابة بنسبة 30-50%.'
                : 'We eliminate deployment bottlenecks, enforce zero-downtime reliability, and scale enterprise workloads with production-grade Kubernetes, zero-drift Terraform IaC, and automated GitOps delivery pipelines on in-kingdom regions.'}
            </p>

            {/* In-Kingdom Hyperscalers Strip */}
            <div className="flex flex-wrap items-center gap-2.5 mb-8">
              <span className="font-mono text-[11px] uppercase tracking-wider text-white/40 block w-full mb-1">
                {isAr ? 'السحابات والمناطق المعتمدة بالمملكة:' : 'Engineered for Saudi Hyperscaler Regions:'}
              </span>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>AWS Riyadh (me-central-1)</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Azure Riyadh</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Google Cloud Dammam</span>
              </div>
            </div>

            {/* Primary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_25px_rgba(233,128,10,0.35)] active:scale-[0.98]"
              >
                <Calendar className="h-4 w-4" />
                <span>{isAr ? 'جدولة جلسة تدقيق السحابة' : 'Schedule Cloud Strategy Audit'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#architecture-topology"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/[0.08] hover:border-white/30 transition-all active:scale-[0.98]"
              >
                <span>{isAr ? 'معاينة معمارية الخدمات المصغرة' : 'Inspect Topology Blueprint'}</span>
              </a>
            </div>

            {/* Audited Engineering Telemetry */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'مستوى الاتاحية' : 'Availability SLA'}
                </span>
                <span className="font-mono text-lg font-bold text-white tracking-tight">99.99% Uptime</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'عزل متعدد لمناطق التوفر' : 'Multi-AZ Active-Active'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'زمن دورة النشر' : 'Pipeline Cycle'}
                </span>
                <span className="font-mono text-lg font-bold text-emerald-400 tracking-tight">&lt; 10 Mins</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'نشر كناري مؤتمت' : 'Zero-Downtime Canary'}
                </span>
              </div>
              <div>
                <span className="block font-mono text-xs text-white/50 mb-1">
                  {isAr ? 'وفر تكاليف السحابة' : 'FinOps Savings'}
                </span>
                <span className="font-mono text-lg font-bold text-[#e9800a] tracking-tight">30% - 50%</span>
                <span className="block text-[11px] text-white/40 mt-0.5">
                  {isAr ? 'ترشيد استهلاك الموارد' : 'Spot & Rightsizing'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D WebGL Multi-Cloud Mesh (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-3 sm:p-4 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              {/* Top Bar Indicators */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 mb-3 font-mono text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-ping" />
                  <span className="text-white/80 font-bold">MULTI_CLOUD_FABRIC</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/40">
                  <Server className="h-3 w-3 text-emerald-400" />
                  <span>K8S • TERRAFORM • GITOPS</span>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <CloudDevOpsMesh3D
                className="w-full h-[360px] sm:h-[420px] lg:h-[460px]"
                activeDisciplineId={activeDiscipline}
                onSelectDiscipline={setActiveDiscipline}
              />

              {/* Discipline Navigation Pills */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block mb-2 px-1">
                  {isAr ? 'ركائز السحابة والعمليات (انقر للمعاينة):' : 'Cloud Disciplines (Click to Focus):'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {disciplineTabs.map((tab) => {
                    const isActive = activeDiscipline === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveDiscipline(tab.id)}
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
