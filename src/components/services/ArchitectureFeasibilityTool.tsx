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
  Layers,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

type ArchitectureType = 'monolith' | 'greenfield' | 'hybrid';
type WorkloadScale = 'startup' | 'growth' | 'enterprise';

interface FeasibilityResult {
  strategyEn: string;
  strategyAr: string;
  timelineEn: string;
  timelineAr: string;
  podCompositionEn: string;
  podCompositionAr: string;
  slaEn: string;
  slaAr: string;
  artifactsEn: string[];
  artifactsAr: string[];
}

const STRATEGY_MATRIX: Record<ArchitectureType, Record<WorkloadScale, FeasibilityResult>> = {
  monolith: {
    startup: {
      strategyEn: 'Strangler-Fig Phase 1: Boundary Extraction & CDC',
      strategyAr: 'المرحلة الأولى من نمط التين الخانق: عزل النطاق وتتبع التغييرات (CDC)',
      timelineEn: '8 to 10 Weeks to First Decoupled Service',
      timelineAr: '8 إلى 10 أسابيع لإطلاق أول خدمة سحابية مفككة',
      podCompositionEn: '1 Principal Architect + 3 Senior Pod Engineers + 1 DevOps Lead',
      podCompositionAr: 'كبير مهندسين معماري + 3 مهندسي تطوير متقدمين + قائد DevOps',
      slaEn: 'Zero Downtime During Data Sync & Canary Traffic Flip',
      slaAr: 'انعدام فترة التوقف تماماً أثناء مزامنة البيانات والتحويل التدريجي',
      artifactsEn: ['C4 Container Blueprint', 'Debezium CDC Pipeline', 'Staging VPC Canary'],
      artifactsAr: ['مخطط معمارية C4 للمكونات', 'خط بيانات تتبع التغيير Debezium', 'بيئة تجريبية مع تحويل تدريجي'],
    },
    growth: {
      strategyEn: 'Multi-Phase Event-Driven Strangler Migration & Kafka Bus',
      strategyAr: 'هجرة تدريجية متعددة المراحل موجهة بالأحداث مع ناقل كافكا',
      timelineEn: '12 to 14 Weeks for Core Domain Decomposition',
      timelineAr: '12 إلى 14 أسبوعاً لتفكيك النطاقات الحيوية للبيانات',
      podCompositionEn: '1 Principal Architect + 5 Dedicated Pod Engineers + 1 QA Automation Lead',
      podCompositionAr: 'كبير مهندسين معماري + 5 مهندسي تطوير متفرغين + مهندس أتمتة جودة',
      slaEn: '99.95% Availability During Strangler Transition',
      slaAr: 'توافر بنسبة 99.95% خلال فترة الانتقال وإعادة الهيكلة',
      artifactsEn: ['Event-Driven Kafka Topology', 'Distributed Database Slices', 'Automated Regression Suite'],
      artifactsAr: ['طوبولوجيا بث الأحداث على كافكا', 'تجزئة قواعد البيانات الموزعة', 'حزمة اختبارات انحدار مؤتمتة'],
    },
    enterprise: {
      strategyEn: 'Enterprise Strangler-Fig & KSA Sovereign Hyperscaler Re-Platforming',
      strategyAr: 'هجرة مؤسسية شاملة مع نقل السيادة لمناطق الحوسبة السحابية بالمملكة',
      timelineEn: '16 to 20 Weeks Phased Enterprise Cutover',
      timelineAr: '16 إلى 20 أسبوعاً للتحول المؤسسي المرحلي المنظم',
      podCompositionEn: '1 US Governance Director + 2 Squad Leads + 6 Senior Engineers + 1 DevSecOps Specialist',
      podCompositionAr: 'مدير حوكمة تقني + قائدا فرق + 6 مهندسين متقدمين + خبير أمن سيبراني',
      slaEn: '99.99% Enterprise SLA with SAMA & NCA Compliance',
      slaAr: 'اتفاقية توافر 99.99% مع امتثال كامل لضوابط ساما وهيئة الأمن السيبراني',
      artifactsEn: ['NCA ECC Regulatory Attestation', 'Multi-AZ Kubernetes Clusters', 'Delaware IP Transfer'],
      artifactsAr: ['شهادة الامتثال لضوابط الأمن السيبراني NCA', 'عناقيد كوبرنيتس متعددة المناطق', 'عقود نقل الملكية الفكرية'],
    },
  },
  greenfield: {
    startup: {
      strategyEn: 'High-Velocity Greenfield MVP (Next.js 15 + Go Microservices)',
      strategyAr: 'إطلاق نموذج منتج أولي عالي السرعة (Next.js 15 وخدمات Go الصغرى)',
      timelineEn: '6 to 8 Weeks to Live Production Launch',
      timelineAr: '6 إلى 8 أسابيع للإطلاق الحي على بيئة الإنتاج',
      podCompositionEn: '1 Principal Architect + 3 Full-Stack Pod Engineers',
      podCompositionAr: 'كبير مهندسين معماري + 3 مهندسي تطوير متكامل',
      slaEn: 'Sub-50ms Global P99 Page Loads',
      slaAr: 'تحميل صفحات فائق السرعة أقل من 50 ميلي ثانية',
      artifactsEn: ['Bilingual Design System', 'OpenAPI 3.1 Contract', 'Automated GitHub Actions CI/CD'],
      artifactsAr: ['نظام تصميم ثنائي اللغة موحد', 'عقد مواصفات واجهات OpenAPI 3.1', 'خطوط نشر سحابي مؤتمتة'],
    },
    growth: {
      strategyEn: 'Modular Microservices Greenfield Engine with Kafka & PostgreSQL RLS',
      strategyAr: 'منصة سحابية معيارية مع ناقل كافكا وعزل المستأجرين في بوستجريس',
      timelineEn: '10 to 12 Weeks to Enterprise Commercial Launch',
      timelineAr: '10 إلى 12 أسبوعاً للإطلاق التجاري المؤسسي',
      podCompositionEn: '1 Principal Architect + 4 Full-Stack Engineers + 1 DevOps Lead',
      podCompositionAr: 'كبير مهندسين معماري + 4 مهندسين متكاملين + قائد DevOps',
      slaEn: '99.99% Availability with Multi-Tenant Partitioning',
      slaAr: 'توافر 99.99% مع عزل سيادي آمن لبيانات المستأجرين',
      artifactsEn: ['Multi-Tenant RLS Database', 'Kafka Event Backbone', 'Load Testing > 10k RPS'],
      artifactsAr: ['قاعدة بيانات متعددة المستأجرين بنظام RLS', 'عمود فقري للأحداث بكافكا', 'فحص أداء يفوق 10 آلاف طلب/ثانية'],
    },
    enterprise: {
      strategyEn: 'Sovereign KSA Multi-Tenant Platform with Micro-Frontend & Event Mesh',
      strategyAr: 'منصة سيادية متعددة المستأجرين مع واجهات ميكرو وشبكة أحداث موزعة',
      timelineEn: '14 to 18 Weeks Enterprise Production Delivery',
      timelineAr: '14 إلى 18 أسبوعاً للتسليم المؤسسي الكامل للإنتاج',
      podCompositionEn: '1 Principal Architect + 6 Pod Engineers + 1 Platform Engineer + 1 DevSecOps Lead',
      podCompositionAr: 'كبير مهندسين + 6 مهندسين متخصصين + مهندس منصات + خبير DevSecOps',
      slaEn: 'Zero Data Leakage Across Tenants & In-Kingdom Storage',
      slaAr: 'انعدام تسريب البيانات نهائياً وحفظ كامل داخل المملكة',
      artifactsEn: ['Sovereign Terraform IaC', 'Nafath SSO Integration', '100% Client Git Ownership'],
      artifactsAr: ['بنية برمجية ككود Terraform', 'ربط مع النفاذ الوطني الموحد', 'تسليم كامل الشفرة وسجل Git'],
    },
  },
  hybrid: {
    startup: {
      strategyEn: 'BFF Gateway Modernization & Core Decoupling',
      strategyAr: 'تحديث بوابة Backend-for-Frontend وفصل الخدمات الحيوية',
      timelineEn: '8 to 10 Weeks to Core Modernization',
      timelineAr: '8 إلى 10 أسابيع لتحديث النواة البرمجية الأساسية',
      podCompositionEn: '1 Architect + 3 Full-Stack Pod Engineers',
      podCompositionAr: 'مهندس معماري + 3 مهندسين متخصصين',
      slaEn: 'Sub-3ms Edge Gateway Routing',
      slaAr: 'توجيه طلبات عبر الحافة بأقل من 3 ميلي ثانية',
      artifactsEn: ['Kong API Gateway Ingress', 'Bilingual UI Modernization', 'Containerized Staging'],
      artifactsAr: ['بوابة Kong لواجهات البرمجة', 'تحديث الواجهات ثنائية اللغة', 'بيئة تجريبية معزولة بالحاويات'],
    },
    growth: {
      strategyEn: 'Event-Driven Adapter Mesh & Microservice Federation',
      strategyAr: 'شبكة محولات موجهة بالأحداث مع اتحاد للخدمات الصغرى',
      timelineEn: '12 to 14 Weeks Hybrid Transformation',
      timelineAr: '12 إلى 14 أسبوعاً للتحول السحابي الهجين',
      podCompositionEn: '1 Principal Architect + 5 Pod Engineers + 1 DevOps Lead',
      podCompositionAr: 'كبير مهندسين + 5 مهندسي تطوير + قائد DevOps',
      slaEn: '99.95% Availability Across Hybrid Cloud & On-Prem',
      slaAr: 'توافر 99.95% بين السحابة والأنظمة المركزية المحلية',
      artifactsEn: ['Kafka / RabbitMQ Bridge', 'mTLS Service Mesh', 'Synthetic Load Benchmarks'],
      artifactsAr: ['جسر ربط كافكا و RabbitMQ', 'شبكة خدمات مشفرة mTLS', 'اختبارات ضغط وحمل اصطناعي'],
    },
    enterprise: {
      strategyEn: 'Full Cloud-First Re-Architecture & Sovereign Migration',
      strategyAr: 'إعادة هيكلة معمارية سحابية كاملة مع الهجرة السيادية للرياض',
      timelineEn: '16 to 20 Weeks Phased Hybrid Migration',
      timelineAr: '16 إلى 20 أسبوعاً للهجرة الهجينة المرحلية المنظمة',
      podCompositionEn: '1 Director Architect + 6 Senior Engineers + 1 KSA Compliance Auditor',
      podCompositionAr: 'مدير معمارية تقنية + 6 مهندسين متقدمين + مدقق امتثال محلي',
      slaEn: '99.99% Financial-Grade SLA with Zero Latency Drag',
      slaAr: 'اتفاقية مستوى خدمة مالي 99.99% دون أي تأخير في الاستجابة',
      artifactsEn: ['SAMA Compliance Audit', 'Multi-Region Failover Architecture', 'Executive Handover Runbooks'],
      artifactsAr: ['تدقيق الامتثال لضوابط ساما', 'معمارية تجاوز أعطال متعددة المناطق', 'أدلة التشغيل التنفيذية والتسليم'],
    },
  },
};

export function ArchitectureFeasibilityTool() {
  const { locale, direction } = useTranslation();
  const [archType, setArchType] = useState<ArchitectureType>('monolith');
  const [workload, setWorkload] = useState<WorkloadScale>('growth');

  const isAr = locale === 'ar';
  const result = STRATEGY_MATRIX[archType][workload];

  return (
    <section className="relative py-24 bg-[#0a0a0c] text-white overflow-hidden border-b border-white/10" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Sliders className="h-3.5 w-3.5" />
            <span>{isAr ? 'حاسبة الجدوى وخطة الإنجاز المعماري' : 'ARCHITECTURE FEASIBILITY SIMULATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'حدد وضعك الحالي واكتشف مسار التحول السحابي' : 'Simulate Your Cloud Architecture Roadmap'}
          </h2>
          <p className="text-sm sm:text-base text-white/70">
            {isAr
              ? 'اختر نوع معمارية نظامك الحالي وحجم المعاملات المستهدف للحصول على خطة هندسية فورية توضح مدة الإنجاز وفريق العمل ومخرجات المشروع.'
              : 'Configure your current baseline and traffic requirements to inspect our tailored decomposition methodology, sprint timelines, and squad structure.'}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#121114] p-6 sm:p-8 space-y-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {/* Control 1: Architecture State */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-3 font-semibold">
                {isAr ? '1. حالة المعمارية الحالية:' : '1. Current System Baseline:'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'monolith', labelEn: 'Legacy Monolith', labelAr: 'نظام مركزي قديم' },
                  { id: 'greenfield', labelEn: 'Greenfield SaaS', labelAr: 'منتج جديد كلياً' },
                  { id: 'hybrid', labelEn: 'Hybrid Services', labelAr: 'أنظمة هجينة' },
                ].map((item) => {
                  const isActive = archType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setArchType(item.id as ArchitectureType)}
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

            {/* Control 2: Target Workload Scale */}
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-3 font-semibold">
                {isAr ? '2. حجم الطلبات والمعاملات المستهدف:' : '2. Target Concurrency & Scale:'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'startup', labelEn: '< 1k req/s', labelAr: 'أقل من 1k ط/ث' },
                  { id: 'growth', labelEn: '10k - 50k req/s', labelAr: '10k - 50k ط/ث' },
                  { id: 'enterprise', labelEn: '100k+ req/s', labelAr: 'أكثر من 100k ط/ث' },
                ].map((item) => {
                  const isActive = workload === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setWorkload(item.id as WorkloadScale)}
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

            {/* Simulation Guidance Notice */}
            <div className="p-4 rounded-2xl border border-white/5 bg-black/40 font-mono text-xs text-white/60 leading-relaxed">
              <span className="text-[#e9800a] font-bold block mb-1">
                {isAr ? '⚡ معايير الامتثال والسيادة:' : '⚡ IN-KINGDOM SOVEREIGNTY:'}
              </span>
              {isAr
                ? 'جميع السيناريوهات تتضمن تشفيراً شاملاً داخل المملكة ومحاذاة تامة مع ضوابط البنك المركزي السعودي (ساما) والهيئة الوطنية للأمن السيبراني.'
                : 'All deployment blueprints feature in-kingdom data residency across AWS Riyadh, Azure KSA, or Google Cloud Dammam with full NCA ECC controls.'}
            </div>
          </div>

          {/* Results Column (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl border border-[#e9800a]/30 bg-gradient-to-b from-[#141210] to-[#0c0b0a] p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(233,128,10,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${archType}-${workload}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#e9800a] font-bold">
                      {isAr ? 'الاستراتيجية المعمارية المقترحة' : 'RECOMMENDED ARCHITECTURAL STRATEGY'}
                    </span>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      OPTIMAL FIT
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {isAr ? result.strategyAr : result.strategyEn}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 uppercase mb-1">
                      <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
                      <span>{isAr ? 'الجدول الزمني للإنجاز:' : 'Delivery Velocity:'}</span>
                    </div>
                    <span className="text-sm font-bold text-white block">
                      {isAr ? result.timelineAr : result.timelineEn}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-white/50 uppercase mb-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#e9800a]" />
                      <span>{isAr ? 'اتفاقية مستوى الخدمة:' : 'Reliability SLA:'}</span>
                    </div>
                    <span className="text-sm font-bold text-white block">
                      {isAr ? result.slaAr : result.slaEn}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-1.5">
                    {isAr ? 'هيكل الفريق الهندسي المخصص:' : 'Dedicated Engineering Pod Structure:'}
                  </span>
                  <p className="text-xs sm:text-sm text-white/80 font-mono bg-white/[0.02] border border-white/10 p-3 rounded-xl">
                    {isAr ? result.podCompositionAr : result.podCompositionEn}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] text-white/50 uppercase block mb-2">
                    {isAr ? 'المخرجات المعمارية المعتمدة:' : 'Primary Verified Deliverables:'}
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(isAr ? result.artifactsAr : result.artifactsEn).map((art, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-2.5 text-xs text-white/90"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#e9800a] shrink-0" />
                        <span className="leading-tight">{art}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="font-mono text-xs text-white/50">
                    {isAr ? 'جاهز للتنفيذ فوراً' : 'Ready for Immediate Discovery'}
                  </span>
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-5 py-2.5 text-xs font-mono font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_15px_rgba(233,128,10,0.35)]"
                  >
                    <span>{isAr ? 'تأكيد الخطة مع كبير المعماريين' : 'Review Plan with Principal Architect'}</span>
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
