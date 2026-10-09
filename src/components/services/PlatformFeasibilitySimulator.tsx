"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sliders,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Clock,
  DollarSign,
  Zap,
  Server,
  Layers,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

type ClusterScale = 'small' | 'medium' | 'large';
type DeployFrequency = 'low' | 'medium' | 'high';

interface PlatformResult {
  idpBlueprintEn: string;
  idpBlueprintAr: string;
  leadTimeEn: string;
  leadTimeAr: string;
  finopsSavingsEn: string;
  finopsSavingsAr: string;
  squadStructureEn: string;
  squadStructureAr: string;
  deliverablesEn: string[];
  deliverablesAr: string[];
}

const PLATFORM_MATRIX: Record<ClusterScale, Record<DeployFrequency, PlatformResult>> = {
  small: {
    low: {
      idpBlueprintEn: 'Lightweight GitOps Foundation (GitHub Actions + K8s EKS/AKS)',
      idpBlueprintAr: 'بنية GitOps خفيفة وسريعة (GitHub Actions وعناقيد EKS/AKS)',
      leadTimeEn: '2 Weeks → 12 Minutes Lead Time',
      leadTimeAr: 'أسبوعان ← 12 دقيقة لوقت النشر الفعلي',
      finopsSavingsEn: '25% - 35% Monthly Compute Reduction',
      finopsSavingsAr: 'توفير شهري 25% - 35% في فواتير الحوسبة',
      squadStructureEn: '1 Lead DevOps Engineer + 2 Senior Cloud Engineers',
      squadStructureAr: 'قائد DevOps + مهندسا سحابة متقدمان',
      deliverablesEn: ['Terraform EKS/AKS Baseline', 'Automated CI/CD Workflows', 'Basic OpenTelemetry Traces'],
      deliverablesAr: ['كود تيرفورم لعناقيد EKS/AKS', 'خطوط نشر سحابي مؤتمتة', 'تتبع أداء عبر OpenTelemetry'],
    },
    medium: {
      idpBlueprintEn: 'ArgoCD GitOps Pipeline with Automated Canary & Karpenter',
      idpBlueprintAr: 'خطوط ArgoCD GitOps مع نشر الكناري وتحجيم Karpenter التلقائي',
      leadTimeEn: '10 Days → 8 Minutes Lead Time',
      leadTimeAr: '10 أيام ← 8 دقائق لوقت النشر الفعلي',
      finopsSavingsEn: '35% - 42% Monthly Compute Reduction',
      finopsSavingsAr: 'توفير شهري 35% - 42% في استهلاك الموارد',
      squadStructureEn: '1 Staff Platform Architect + 3 Dedicated SREs',
      squadStructureAr: 'كبير مهندسي منصات + 3 مهندسي موثوقية أنظمة (SRE)',
      deliverablesEn: ['Argo Rollouts Canary Config', 'Karpenter Spot Pool Scaling', 'Prometheus Alerting Stack'],
      deliverablesAr: ['إعداد نشر الكناري Argo Rollouts', 'تحجيم حزم Spot عبر Karpenter', 'منظومة تنبيهات Prometheus'],
    },
    high: {
      idpBlueprintEn: 'Full Self-Service Developer Portal (Backstage IDP) & Continuous Staging',
      idpBlueprintAr: 'بوابة مطورين ذاتية الخدمة بالكامل (Backstage IDP) وبيئات تجريبية لحظية',
      leadTimeEn: 'Weeks → Sub-5 Minutes per Deploy',
      leadTimeAr: 'أسابيع ← أقل من 5 دقائق لكل عملية نشر',
      finopsSavingsEn: '40% - 48% Compute & Idle Elimination',
      finopsSavingsAr: 'توفير 40% - 48% مع إنهاء الهدر المالي للموارد غير النشطة',
      squadStructureEn: '1 Principal Platform Architect + 4 DevSecOps Engineers',
      squadStructureAr: 'كبير معماريي المنصات + 4 مهندسي DevSecOps',
      deliverablesEn: ['Backstage Self-Service Portal', 'Ephemeral PR Environments', 'Zero-Trust Istio mTLS Mesh'],
      deliverablesAr: ['بوابة Backstage للخدمة الذاتية', 'بيئات سحابية مؤقتة لكل PR', 'شبكة Istio mTLS مشفرة بالكامل'],
    },
  },
  medium: {
    low: {
      idpBlueprintEn: 'Multi-AZ Kubernetes Foundation & GitOps Synchronization',
      idpBlueprintAr: 'بيئة كوبرنيتس متعددة المناطق السحابية مع مزامنة GitOps',
      leadTimeEn: '3 Weeks → 15 Minutes Lead Time',
      leadTimeAr: '3 أسابيع ← 15 دقيقة لوقت النشر الفعلي',
      finopsSavingsEn: '30% - 38% Sustained OPEX Optimization',
      finopsSavingsAr: 'توفير مستمر 30% - 38% في النفقات التشغيلية',
      squadStructureEn: '1 Platform Lead + 3 Senior SRE Engineers',
      squadStructureAr: 'قائد منصات سحابية + 3 مهندسي SRE متقدمين',
      deliverablesEn: ['Multi-AZ EKS Architecture', 'Vault Secrets Injection', 'Grafana Observability Dashboards'],
      deliverablesAr: ['معمارية EKS متعددة المناطق', 'حقن المفاتيح والرموز عبر Vault', 'لوحات مراقبة Grafana المتقدمة'],
    },
    medium: {
      idpBlueprintEn: 'Production Internal Developer Platform with Automated Canary & SLO Gates',
      idpBlueprintAr: 'منصة مطورين داخلية مع نشر الكناري المؤتمت وبوابات فحص مستويات الخدمة',
      leadTimeEn: '2 Weeks → Sub-8 Minutes Deploy Lead Time',
      leadTimeAr: 'أسبوعان ← أقل من 8 دقائق لنشر الكود',
      finopsSavingsEn: '38% - 46% Monthly Cost Optimization',
      finopsSavingsAr: 'توفير شهري 38% - 46% في تكاليف الخوادم',
      squadStructureEn: '1 Principal Architect + 4 Senior DevSecOps Specialists',
      squadStructureAr: 'كبير مهندسين معماري + 4 متخصصي DevSecOps',
      deliverablesEn: ['Backstage Template Catalog', 'ArgoCD Multi-Cluster Control', 'Karpenter Spot Optimization'],
      deliverablesAr: ['دليل قوالب Backstage الجاهزة', 'إدارة عناقيد متعددة بـ ArgoCD', 'تحسين التكاليف عبر Karpenter Spot'],
    },
    high: {
      idpBlueprintEn: 'Enterprise Multi-Cluster Service Mesh with Ephemeral Environments & SRE Rigor',
      idpBlueprintAr: 'شبكة خدمات متعددة العناقيد مع بيئات مؤقتة ومعايير SRE مؤسسية',
      leadTimeEn: 'Weeks → Sub-4 Minutes Continuous Velocity',
      leadTimeAr: 'أسابيع ← أقل من 4 دقائق للتدفق المستمر',
      finopsSavingsEn: '45% - 52% FinOps Cloud Cost Reduction',
      finopsSavingsAr: 'تخفيض تكاليف السحابة بنسبة 45% - 52% عبر FinOps',
      squadStructureEn: '1 Governance Director + 5 Dedicated Pod Engineers + 1 SRE Lead',
      squadStructureAr: 'مدير حوكمة تقني + 5 مهندسي تطوير متفرغين + قائد SRE',
      deliverablesEn: ['Multi-Cluster Istio Fabric', 'Policy-as-Code OPA Gates', 'Automated Disaster Recovery Runbooks'],
      deliverablesAr: ['نسيج Istio للعناقيد المتعددة', 'بوابات فحص السياسات OPA', 'أدلة التعافي الآلي من الكوارث (DR)'],
    },
  },
  large: {
    low: {
      idpBlueprintEn: 'Enterprise Sovereign Cloud Re-Platforming (AWS Riyadh & Azure KSA)',
      idpBlueprintAr: 'إعادة بناء المنصات المؤسسية السيادية بمناطق الرياض السحابية',
      leadTimeEn: '4 Weeks → 20 Minutes Enterprise Cutover',
      leadTimeAr: '4 أسابيع ← 20 دقيقة للتحول المؤسسي المنظم',
      finopsSavingsEn: '32% - 40% Cloud Spend Governance',
      finopsSavingsAr: 'حوكمة الإنفاق السحابي وتوفير 32% - 40%',
      squadStructureEn: '1 Enterprise Director + 4 Senior Platform Engineers',
      squadStructureAr: 'مدير منصات مؤسسية + 4 مهندسي سحابة متقدمين',
      deliverablesEn: ['Sovereign Terraform Blueprints', 'NCA ECC Security Matrix', 'Enterprise Centralized Logging'],
      deliverablesAr: ['مخططات تيرفورم السيادية', 'مصفوفة الامتثال لضوابط NCA ECC', 'سجلات تدقيق مركزية مؤسسية'],
    },
    medium: {
      idpBlueprintEn: 'Multi-Region In-Kingdom Kubernetes Fabric with Dedicated DevSecOps Pods',
      idpBlueprintAr: 'نسيج كوبرنيتس متعدد المناطق داخل المملكة مع فرق DevSecOps متفرغة',
      leadTimeEn: '3 Weeks → Sub-10 Minutes Enterprise Cadence',
      leadTimeAr: '3 أسابيع ← أقل من 10 دقائق لسرعة النشر المؤسسي',
      finopsSavingsEn: '40% - 48% Enterprise FinOps Savings',
      finopsSavingsAr: 'وفورات مالية مؤسسية 40% - 48% بحوكمة FinOps',
      squadStructureEn: '1 Principal Architect + 6 Dedicated SRE & Platform Pod Engineers',
      squadStructureAr: 'كبير مهندسين + 6 مهندسي SRE ومنصات مخصصين بالكامل',
      deliverablesEn: ['Multi-Region Failover Architecture', 'Unified Backstage IDP', 'Zero-Vulnerability Security Gate'],
      deliverablesAr: ['معمارية تجاوز أعطال متعددة المناطق', 'منصة Backstage موحدة', 'بوابات أمان مانعة لأي ثغرة'],
    },
    high: {
      idpBlueprintEn: 'Sovereign KSA Autonomous Platform Mesh with Sub-3-Minute Deploys',
      idpBlueprintAr: 'منظومة منصات سحابية سيادية ذاتية الإدارة مع نشر في أقل من 3 دقائق',
      leadTimeEn: 'Weeks → Sub-3 Minutes Lead Time at Massive Scale',
      leadTimeAr: 'أسابيع ← أقل من 3 دقائق للنشر حتى في أقصى درجات الضغط',
      finopsSavingsEn: '48% - 55% Sustained Multi-Cloud FinOps Optimization',
      finopsSavingsAr: 'تحسين نفقات مستمر بنسبة 48% - 55% عبر السحابات المتعددة',
      squadStructureEn: '1 Governance Director + 2 Squad Leads + 6 Senior SRE Pod Specialists',
      squadStructureAr: 'مدير حوكمة تقني + قائدا فرق + 6 مهندسي SRE متقدمين',
      deliverablesEn: ['Autonomous Karpenter Cluster Mesh', 'SAMA & NCA Continuous Audit', '100% Client Code & IaC Ownership'],
      deliverablesAr: ['عناقيد Karpenter ذاتية الإدارة', 'تدقيق مستمر لأنظمة ساما و NCA', 'ملكية برمجية وسيادية كاملة 100%'],
    },
  },
};

export function PlatformFeasibilitySimulator() {
  const { locale, direction } = useTranslation();
  const [clusterScale, setClusterScale] = useState<ClusterScale>('medium');
  const [deployFreq, setDeployFreq] = useState<DeployFrequency>('medium');

  const isAr = locale === 'ar';
  const result = PLATFORM_MATRIX[clusterScale][deployFreq];

  return (
    <section className="relative py-24 bg-[#0a0a0c] text-white overflow-hidden border-b border-white/10" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Sliders className="h-3.5 w-3.5" />
            <span>{isAr ? 'محاكي عائد الاستثمار لمنصات المطورين' : 'DEVOPS & IDP ROI SIMULATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'احسب وفورات FinOps وسرعة النشر لمؤسستك' : 'Simulate Your Platform Velocity & Cloud Savings'}
          </h2>
          <p className="text-sm sm:text-base text-white/70">
            {isAr
              ? 'حدد حجم العناقيد السحابية ومعدل النشر اليومي لاكتشاف معمارية المنصة المقترحة، وفورات التكلفة المتوقعة، وهيكل الفريق الهندسي.'
              : 'Select your active cluster footprint and release velocity to inspect tailored platform blueprints, lead-time reduction factors, and sustained FinOps savings.'}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#121114] p-6 sm:p-8 space-y-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* Control 1: Cluster Footprint */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-3 font-semibold">
                {isAr ? '1. حجم العناقيد وبيئات كوبرنيتس:' : '1. Kubernetes Cluster Footprint:'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'small', labelEn: '1 - 3 Clusters', labelAr: '1 - 3 عناقيد' },
                  { id: 'medium', labelEn: '4 - 10 Clusters', labelAr: '4 - 10 عناقيد' },
                  { id: 'large', labelEn: '10+ Multi-Cloud', labelAr: '10+ سحابات متعددة' },
                ].map((item) => {
                  const isActive = clusterScale === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setClusterScale(item.id as ClusterScale)}
                      className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                        isActive
                          ? 'border-[#e9800a] bg-[#e9800a]/15 text-[#e9800a] font-bold shadow-[0_0_15px_rgba(233,128,10,0.2)]'
                          : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Daily Deployment Frequency */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-3 font-semibold">
                {isAr ? '2. معدل النشر اليومي للبرمجيات:' : '2. Daily Deployment Velocity:'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'low', labelEn: '< 5 Deploys/day', labelAr: 'أقل من 5/يوم' },
                  { id: 'medium', labelEn: '5 - 25 Deploys', labelAr: '5 - 25/يوم' },
                  { id: 'high', labelEn: '50+ Continuous', labelAr: '50+ مستمر' },
                ].map((item) => {
                  const isActive = deployFreq === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setDeployFreq(item.id as DeployFrequency)}
                      className={`p-3 rounded-xl border text-center font-mono text-xs transition-all ${
                        isActive
                          ? 'border-[#e9800a] bg-[#e9800a]/15 text-[#e9800a] font-bold shadow-[0_0_15px_rgba(233,128,10,0.2)]'
                          : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {isAr ? item.labelAr : item.labelEn}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Simulator Callout */}
            <div className="p-4 rounded-2xl border border-white/5 bg-black/40 font-mono text-xs text-white/60 leading-relaxed">
              <span className="text-[#e9800a] font-bold block mb-1">
                {isAr ? '⚡ السيادة السحابية بالمملكة:' : '⚡ IN-KINGDOM HYPERSCALER ALIGNMENT:'}
              </span>
              {isAr
                ? 'جميع قوالب البنية التحتية معدة خصيصاً لمناطق AWS الرياض، Azure KSA، وGoogle Cloud الدمام مع تطبيق ضوابط الهيئة الوطنية للأمن السيبراني (NCA ECC).'
                : 'All platform blueprints are pre-tuned for AWS Riyadh (me-central-1), Azure KSA, and Google Cloud Dammam with full NCA ECC-1:2018 policy guardrails.'}
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#e9800a]/30 bg-gradient-to-b from-[#141210] to-[#0c0b0a] p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(233,128,10,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${clusterScale}-${deployFreq}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#e9800a] font-bold">
                      {isAr ? 'معمارية المنصة الموصى بها' : 'RECOMMENDED PLATFORM BLUEPRINT'}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      OPTIMAL CADENCE
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {isAr ? result.idpBlueprintAr : result.idpBlueprintEn}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 uppercase mb-1">
                      <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
                      <span>{isAr ? 'تقليص زمن النشر:' : 'Lead Time Acceleration:'}</span>
                    </div>
                    <span className="text-sm font-bold text-[#e9800a] block">
                      {isAr ? result.leadTimeAr : result.leadTimeEn}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 uppercase mb-1">
                      <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
                      <span>{isAr ? 'توفير تكاليف FinOps:' : 'FinOps Cloud OPEX Delta:'}</span>
                    </div>
                    <span className="text-sm font-bold text-emerald-400 block">
                      {isAr ? result.finopsSavingsAr : result.finopsSavingsEn}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-1.5">
                    {isAr ? 'هيكل الفريق الهندسي المخصص:' : 'Dedicated Platform Squad Sizing:'}
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 font-mono bg-white/[0.02] border border-white/10 p-3 rounded-xl">
                    {isAr ? result.squadStructureAr : result.squadStructureEn}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-2">
                    {isAr ? 'المخرجات المعتمدة للتسليم:' : 'Verified Operational Deliverables:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(isAr ? result.deliverablesAr : result.deliverablesEn).map((deliv, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-xs text-white/90"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#e9800a] shrink-0" />
                        <span className="leading-tight">{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-white/50">
                    {isAr ? 'جاهز للتنفيذ الفوري' : 'Zero Ticket Latency'}
                  </span>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-5 py-2.5 text-xs font-mono font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_15px_rgba(233,128,10,0.35)]"
                  >
                    <span>{isAr ? 'مناقشة خطة المنصة مع مهندس SRE' : 'Review Blueprint with Lead SRE'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
