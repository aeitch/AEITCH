"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sliders,
  Cloud,
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  Layers,
  Server,
  TrendingDown,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

type SpendTier = 'tier-starter' | 'tier-mid' | 'tier-enterprise';
type CloudProvider = 'aws-ksa' | 'azure-ksa' | 'gcp-ksa' | 'multi-cloud';

interface SizingResult {
  monthlySavingsEn: string;
  monthlySavingsAr: string;
  annualSavingsEn: string;
  annualSavingsAr: string;
  architectureEn: string;
  architectureAr: string;
  modernizationTimeEn: string;
  modernizationTimeAr: string;
  coreDeliverablesEn: string[];
  coreDeliverablesAr: string[];
}

const SIZING_MATRIX: Record<SpendTier, SizingResult> = {
  'tier-starter': {
    monthlySavingsEn: '$1,200 - $4,500 / Month Saved',
    monthlySavingsAr: 'توفير $1,200 - $4,500 شهرياً',
    annualSavingsEn: 'Up to $54,000 Annual FinOps Optimization',
    annualSavingsAr: 'وفر سنوي يصل إلى $54,000 عبر FinOps',
    architectureEn: 'Karpenter Spot Pools + Graviton/ARM64 + Automated Idle Shutdown',
    architectureAr: 'حزم Spot التلقائية عبر Karpenter ومعالجات ARM64 وإيقاف الموارد الخاملة',
    modernizationTimeEn: '2 - 3 Weeks Fast-Track Migration',
    modernizationTimeAr: '2 - 3 أسابيع لهجرة سحابية سريعة',
    coreDeliverablesEn: [
      'Terraform Modular Cloud Baseline',
      'Automated Dev/Staging Scheduled Auto-Sleep',
      'Container Rightsizing & CPU/Memory Limits',
    ],
    coreDeliverablesAr: [
      'كود تيرفورم معياري للبنية السحابية',
      'إيقاف تلقائي مجدول للبيئات التجريبية خارج ساعات العمل',
      'ترشيد حصص المعالجات والذاكرة للحاويات',
    ],
  },
  'tier-mid': {
    monthlySavingsEn: '$6,000 - $22,000 / Month Saved',
    monthlySavingsAr: 'توفير $6,000 - $22,000 شهرياً',
    annualSavingsEn: 'Up to $260,000 Annual FinOps Optimization',
    annualSavingsAr: 'وفر سنوي يصل إلى $260,000 عبر تحسين الموارد',
    architectureEn: 'Multi-AZ Kubernetes + Compute Savings Plans + Aurora Serverless v2',
    architectureAr: 'عناقيد كوبرنيتس المتعددة وخطة التوفير الحاسوبية وقواعد Aurora Serverless v2',
    modernizationTimeEn: '4 - 6 Weeks Zero-Downtime Transition',
    modernizationTimeAr: '4 - 6 أسابيع لانتقال سلس دون أي انقطاع',
    coreDeliverablesEn: [
      'ArgoCD GitOps Canary Deployment Engine',
      'Dynamic Karpenter Multi-Arch Node Provisioning',
      'OpenTelemetry & Grafana Cost Profiling Dashboard',
    ],
    coreDeliverablesAr: [
      'محرك نشر الكناري عبر ArgoCD GitOps',
      'تحجيم ديناميكي للعقد متعددة المعماريات عبر Karpenter',
      'لوحة مراقبة التكاليف عبر OpenTelemetry و Grafana',
    ],
  },
  'tier-enterprise': {
    monthlySavingsEn: '$25,000 - $85,000+ / Month Saved',
    monthlySavingsAr: 'توفير $25,000 - $85,000+ شهرياً',
    annualSavingsEn: 'Up to $1,000,000+ Multi-Year Enterprise Savings',
    annualSavingsAr: 'وفر يتجاوز $1,000,000+ على مدار سنوات التعاقد',
    architectureEn: 'Multi-Cloud Mesh + Hybrid Storage Tiering + In-Kingdom Sovereign HSM',
    architectureAr: 'نسيج سحابي متعدد وتخزين هجين متدرج وتشفير سيادي عبر HSM محلي',
    modernizationTimeEn: '6 - 10 Weeks Phased Enterprise Modernization',
    modernizationTimeAr: '6 - 10 أسابيع لتحديث تدريجي شامل للمؤسسة',
    coreDeliverablesEn: [
      'Cross-Region Active-Active DR & Failover Pipeline',
      'Enterprise FinOps Governance & Cost Allocation Tags',
      'Full NCA ECC & CCC Policy-as-Code Conformance',
    ],
    coreDeliverablesAr: [
      'بنية تعافي من الكوارث موزعة عبر مناطق توفر متعددة',
      'حوكمة FinOps مؤسسية مع تتبع دقيق لمراكز التكلفة',
      'امتثال برمجيات ككود كامل لضوابط الهيئة الوطنية للأمن السيبراني',
    ],
  },
};

export function CloudCostSizingSimulator() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [spendTier, setSpendTier] = useState<SpendTier>('tier-mid');
  const [cloud, setCloud] = useState<CloudProvider>('aws-ksa');

  const result = SIZING_MATRIX[spendTier];

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <TrendingDown className="h-3.5 w-3.5" />
            <span>{isAr ? 'محاكي ترشيد التكاليف السحابية' : 'FINOPS & CLOUD SIZING SIMULATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'احسب حجم الوفر المالي المتوقع في فاتورتك السحابية' : 'Calculate Your Projected Cloud FinOps Savings'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'اختر حجم إنفاقك الشهري الحالي ومزود السحابة المستهدف لمعاينة خطة التحسين المعمارية، ونسبة التوفير المحققة، وزمن النقل والتحديث.'
              : 'Select your current monthly cloud spend and target infrastructure to project verified cost reductions, optimal compute topologies, and modernization velocity.'}
          </p>
        </div>

        {/* Simulator Grid (Left: Inputs, Right: Live Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d0d10] p-6 sm:p-8 space-y-8">
            {/* Input 1: Current Monthly Spend */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '1. حجم الإنفاق السحابي الشهري الحالي' : '1. Current Monthly Cloud Spend'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'tier-starter',
                    titleEn: '$3,000 - $15,000 / month (Growth / Scale-up)',
                    titleAr: '$3,000 - $15,000 شهرياً (مرحلة النمو)',
                  },
                  {
                    id: 'tier-mid',
                    titleEn: '$15,000 - $60,000 / month (Mid-Market Enterprise)',
                    titleAr: '$15,000 - $60,000 شهرياً (مؤسسة متوسطة)',
                  },
                  {
                    id: 'tier-enterprise',
                    titleEn: '$60,000 - $200,000+ / month (Large Scale / Multi-Cloud)',
                    titleAr: '$60,000 - $200,000+ شهرياً (مؤسسة كبرى / سحابة متعددة)',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSpendTier(item.id as SpendTier)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      spendTier === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {spendTier === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Cloud Infrastructure */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '2. البيئة السحابية المستهدفة' : '2. Primary Cloud Environment'}
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'aws-ksa', label: 'AWS Riyadh (me-central-1)' },
                  { id: 'azure-ksa', label: 'Azure Saudi Arabia' },
                  { id: 'gcp-ksa', label: 'Google Cloud Dammam' },
                  { id: 'multi-cloud', label: 'Multi-Cloud Setup' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCloud(item.id as CloudProvider)}
                    className={`font-mono text-xs p-3 rounded-xl border text-start transition-all ${
                      cloud === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Dynamic Output Card (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-white/15 bg-gradient-to-br from-[#121115] to-[#0a0a0c] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 end-0 -mt-10 -me-10 h-72 w-72 rounded-full bg-[#e9800a]/10 blur-[120px] pointer-events-none" />

            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#e9800a] font-bold block mb-1">
                  PROJECTED FINOPS IMPACT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'خطة ترشيد النفقات والبنية المثالية' : 'Architecture & Cost Reduction Blueprint'}
                </h3>
              </div>

              <div className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold">
                {isAr ? result.annualSavingsAr : result.annualSavingsEn}
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isAr ? 'الوفر المالي الشهري' : 'Monthly Verified Savings'}</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-emerald-400 block">
                  {isAr ? result.monthlySavingsAr : result.monthlySavingsEn}
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
                  <span>{isAr ? 'مدة الانتقال والتحديث' : 'Modernization Velocity'}</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white block">
                  {isAr ? result.modernizationTimeAr : result.modernizationTimeEn}
                </span>
              </div>
            </div>

            {/* Recommended Architecture */}
            <div className="mb-8">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-2">
                {isAr ? 'معمارية الحوسبة والبنية الموصى بها:' : 'Recommended Target Compute Topology:'}
              </span>
              <p className="text-sm sm:text-base text-white/90 font-mono bg-white/[0.03] border border-white/10 p-3.5 rounded-xl">
                {isAr ? result.architectureAr : result.architectureEn}
              </p>
            </div>

            {/* Core IaC Deliverables */}
            <div className="mb-8 pt-6 border-t border-white/10">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                {isAr ? 'المخرجات وأصول التيرفورم المسلمة:' : 'Core IaC Deliverables & Artifacts Handed Over:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(isAr ? result.coreDeliverablesAr : result.coreDeliverablesEn).map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-xs px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-mono text-xs text-white/50 text-center sm:text-start">
                {isAr ? 'تدقيق معماري شامل مع كبير مهندسي السحابة' : 'Full Architecture Review with Principal Cloud Architect'}
              </span>
              <Link
                href="/contact-us#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_20px_rgba(233,128,10,0.3)] active:scale-[0.98]"
              >
                <span>{isAr ? 'احجز تدقيق السحابة والترشيد' : 'Schedule Cloud Strategy Session'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
