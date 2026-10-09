"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Sliders,
  Users,
  ArrowRight,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2,
  DollarSign,
  Layers,
  Cpu,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

type ProductScope = 'mvp-0to1' | 'modernization' | 'scaleup';
type PodSize = 'lightweight' | 'standard' | 'enterprise';

interface PodSimulationResult {
  compositionEn: string[];
  compositionAr: string[];
  velocityEn: string;
  velocityAr: string;
  deploymentTimeEn: string;
  deploymentTimeAr: string;
  costAdvantageEn: string;
  costAdvantageAr: string;
  keyHighlightsEn: string[];
  keyHighlightsAr: string[];
}

const POD_MATRIX: Record<ProductScope, Record<PodSize, PodSimulationResult>> = {
  'mvp-0to1': {
    lightweight: {
      compositionEn: [
        '1 US Fractional Principal Architect (20% Oversight)',
        '2 Senior Full-Stack Engineers (Next.js/TypeScript/Go)',
        'Shared SRE & Automated QA Support',
      ],
      compositionAr: [
        'كبير معماريين أمريكي (إشراف استشاري 20%)',
        'مهندسا برمجيات متقدمان (Next.js و TypeScript و Go)',
        'دعم مشترك للبنية التحتية وضمان الجودة',
      ],
      velocityEn: '25 - 35 Story Points / Month',
      velocityAr: '25 - 35 نقطة سبرنت شهرياً',
      deploymentTimeEn: '7 Business Days to Sprint 1',
      deploymentTimeAr: '7 أيام عمل لبدء السبرنت الأول',
      costAdvantageEn: '60% Savings vs Local Riyadh Agency',
      costAdvantageAr: 'توفير 60% مقارنة بالشركات المحلية التقليدية',
      keyHighlightsEn: [
        'Complete 0-to-1 prototype to production pipeline',
        'Direct Sunday-Thursday GMT+3 Slack coordination',
        '100% Day-1 source code ownership',
      ],
      keyHighlightsAr: [
        'بناء المنتج الأولي من الصفر حتى مرحلة الإنتاج',
        'تنسيق مباشر عبر سلاك من الأحد إلى الخميس بتوقيت الرياض',
        'ملكية تامة للكود المصدري من اليوم الأول',
      ],
    },
    standard: {
      compositionEn: [
        '1 US Principal Architect (Architecture & ADRs)',
        '1 Staff Platform & SRE Lead (K8s / Terraform)',
        '2 Senior Full-Stack Engineers (Core Domain)',
        '1 Dedicated Automated QA Lead (Playwright)',
      ],
      compositionAr: [
        'كبير معماريين أمريكي (معمارية C4 ومراجعة كود)',
        'قائد منصة وبنية تحتية (كوبرنيتس وتيرفورم)',
        'مهندسا برمجيات متقدمان (تطوير الميزات الأساسية)',
        'قائد جودة مؤتمتة مخصص (اختبارات Playwright)',
      ],
      velocityEn: '45 - 60 Story Points / Month',
      velocityAr: '45 - 60 نقطة سبرنت شهرياً',
      deploymentTimeEn: '10 Business Days to Sprint 1',
      deploymentTimeAr: '10 أيام عمل لبدء السبرنت الأول',
      costAdvantageEn: '55% Savings with 3x Output Velocity',
      costAdvantageAr: 'توفير 55% مع مضاعفة سرعة الإنجاز 3 مرات',
      keyHighlightsEn: [
        'Full multi-tier web/mobile cloud application',
        'Bi-weekly staging demos with zero-downtime CI/CD',
        'Air-tight IP protection and enterprise NDAs',
      ],
      keyHighlightsAr: [
        'تطبيق ويب وهاتف متكامل متعدد الطبقات على السحابة',
        'عروض تجريبية حية كل أسبوعين مع نشر آلي مستمر',
        'حماية قانونية كاملة للملكية الفكرية واتفاقيات سرية صارمة',
      ],
    },
    enterprise: {
      compositionEn: [
        '1 Principal Enterprise Architect (US Oversight)',
        '2 Staff DevOps & Platform Engineers (AWS/Azure KSA)',
        '4 Senior Full-Stack Product Engineers',
        '1 Lead QA Automation & Performance Specialist',
      ],
      compositionAr: [
        'كبير معماريي مؤسسات (إشراف أمريكي مستمر)',
        'مهندسا منصات وبنية تحتية (سحابة السعودية)',
        '4 مهندسي برمجيات متقدمين للخدمات المتعددة',
        'أخصائي جودة وأداء واختبارات ضغط متقدم',
      ],
      velocityEn: '80 - 110 Story Points / Month',
      velocityAr: '80 - 110 نقطة سبرنت شهرياً',
      deploymentTimeEn: '12 Business Days to Sprint 1',
      deploymentTimeAr: '12 يوم عمل لبدء السبرنت الأول',
      costAdvantageEn: '50% Savings vs Pure In-House Hiring',
      costAdvantageAr: 'توفير 50% مقارنة بالتوظيف الداخلي المباشر',
      keyHighlightsEn: [
        'Rapid parallel track execution for multi-surface apps',
        'Automated SAMA / NCA compliance audit readiness',
        'Dedicated engineering manager with weekly executive reporting',
      ],
      keyHighlightsAr: [
        'مسارات تطوير متوازية للمنصات المتعددة',
        'جاهزية تامة لمتطلبات هيئة الأمن السيبراني والبنك المركزي',
        'مدير هندسي مخصص مع تقارير تنفيذية أسبوعية',
      ],
    },
  },
  modernization: {
    lightweight: {
      compositionEn: [
        '1 US Cloud Architect (Decomposition Strategy)',
        '1 Staff Platform & Migration Engineer',
        '1 Senior Backend/API Engineer (Go / Node)',
      ],
      compositionAr: [
        'معماري سحابي أمريكي (استراتيجية تفكيك النظام)',
        'مهندس منصة وهجرة سحابية متقدم',
        'مهندس واجهات برمجية وخلفية متقدم (Go و Node)',
      ],
      velocityEn: '20 - 30 Migration Points / Month',
      velocityAr: '20 - 30 نقطة هجرة سحابية شهرياً',
      deploymentTimeEn: '7 Business Days to Sprint 1',
      deploymentTimeAr: '7 أيام عمل لبدء السبرنت الأول',
      costAdvantageEn: '58% Savings vs Traditional Consultancies',
      costAdvantageAr: 'توفير 58% مقارنة بشركات الاستشارات الكبرى',
      keyHighlightsEn: [
        'Strangler fig pattern monolith decomposition',
        'Zero-downtime database dual-write migrations',
        'Automated regression testing pipelines',
      ],
      keyHighlightsAr: [
        'تفكيك الأنظمة القديمة بنمط الخنق التدريجي',
        'هجرة قواعد البيانات دون انقطاع عبر الكتابة المزدوجة',
        'خطوط اختبارات انحدار مؤتمتة لضمان استقرار العمليات',
      ],
    },
    standard: {
      compositionEn: [
        '1 US Principal Cloud Architect (C4 & Governance)',
        '1 Staff Kubernetes & Multi-Cloud Lead',
        '2 Senior Distributed Systems Engineers',
        '1 Dedicated Regression & QA Lead',
      ],
      compositionAr: [
        'كبير معماريي سحابة أمريكي (حوكمة ومعمارية C4)',
        'قائد كوبرنيتس والسحابة المتعددة',
        'مهندسا نظم موزعة وخدمات مصغرة متقدمان',
        'قائد اختبارات انحدار وضمان جودة مخصص',
      ],
      velocityEn: '40 - 55 Migration Points / Month',
      velocityAr: '40 - 55 نقطة هجرة سحابية شهرياً',
      deploymentTimeEn: '10 Business Days to Sprint 1',
      deploymentTimeAr: '10 أيام عمل لبدء السبرنت الأول',
      costAdvantageEn: '52% Savings with Guaranteed SLAs',
      costAdvantageAr: 'توفير 52% مع ضمان اتفاقيات مستوى الخدمة SLA',
      keyHighlightsEn: [
        'Modular microservices migration on Saudi Hyperscalers',
        'Zero data loss transactional verification',
        'Full team knowledge transfer and documentation handoff',
      ],
      keyHighlightsAr: [
        'هجرة إلى خدمات مصغرة على السحابات السعودية المحلية',
        'تحقق مالي ومصرفي لمنع فقدان أي بيانات',
        'نقل معرفي كامل وتوثيق تفصيلي لفريقك الداخلي',
      ],
    },
    enterprise: {
      compositionEn: [
        '1 Principal Enterprise Modernization Lead (US)',
        '2 Staff DevOps & Database Reliability Engineers',
        '4 Senior Microservices Developers',
        '1 Automation QA & Security Specialist',
      ],
      compositionAr: [
        'قائد تحديث مؤسسي رئيسي (إشراف أمريكي)',
        'مهندسا موثوقية قواعد بيانات وبنية تحتية',
        '4 مهندسي خدمات مصغرة وتطبيقات مؤسسية',
        'أخصائي أمان وجودة برمجية مؤتمتة',
      ],
      velocityEn: '75 - 100 Migration Points / Month',
      velocityAr: '75 - 100 نقطة هجرة سحابية شهرياً',
      deploymentTimeEn: '14 Business Days to Sprint 1',
      deploymentTimeAr: '14 يوم عمل لبدء السبرنت الأول',
      costAdvantageEn: '50% Savings vs Big-4 IT Integrators',
      costAdvantageAr: 'توفير 50% مقارنة بكبرى شركات تكامل الأنظمة',
      keyHighlightsEn: [
        'Complex multi-cloud enterprise refactoring',
        'Event-driven Kafka streaming architecture',
        'Strict in-kingdom data sovereignty and compliance',
      ],
      keyHighlightsAr: [
        'إعادة بناء الأنظمة المعقدة عبر السحابة المتعددة',
        'معمارية تدفق بيانات غير متزامنة عبر Kafka',
        'امتثال سيادي صارم لسيادة البيانات داخل المملكة',
      ],
    },
  },
  scaleup: {
    lightweight: {
      compositionEn: [
        '1 US Technical Advisor & System Reviewer',
        '2 Senior Full-Stack Feature Engineers',
        'Automated CI/CD & Testing Infrastructure',
      ],
      compositionAr: [
        'مستشار تقني أمريكي لمراجعة النظم',
        'مهندسا برمجيات متقدمان لتطوير الميزات',
        'بنية تحتية مؤتمتة للاختبار والنشر المستمر',
      ],
      velocityEn: '30 - 40 Story Points / Month',
      velocityAr: '30 - 40 نقطة سبرنت شهرياً',
      deploymentTimeEn: '7 Business Days to Sprint 1',
      deploymentTimeAr: '7 أيام عمل لبدء السبرنت الأول',
      costAdvantageEn: '62% Savings vs Domestic Contracting',
      costAdvantageAr: 'توفير 62% مقارنة بالتعاقدات المحلية',
      keyHighlightsEn: [
        'Accelerate product feature backlog execution',
        'Seamless integration into existing client Jira/Slack',
        'Direct pull request reviews with internal tech leads',
      ],
      keyHighlightsAr: [
        'تسريع إنجاز قائمة الميزات المتراكمة في خارطة الطريق',
        'اندماج سلس في أدوات الفريق الحالية (Jira و Slack)',
        'مراجعة طلبات الدمج مباشرة مع القادة التقنيين',
      ],
    },
    standard: {
      compositionEn: [
        '1 US Principal Architect (Scaling & Performance)',
        '1 Staff Platform Engineer (Auto-Scaling & FinOps)',
        '2 Senior Product Engineers (Core Flows)',
        '1 Automated QA Engineer (Load & Regression)',
      ],
      compositionAr: [
        'كبير معماريين أمريكي (التحجيم والأداء الفائق)',
        'قائد منصة سحابية (التحجيم التلقائي وترشيد التكاليف)',
        'مهندسا منتج متقدمان لمسارات العمل الأساسية',
        'مهندس جودة مؤتمت لاختبارات الحمل والأداء',
      ],
      velocityEn: '50 - 70 Story Points / Month',
      velocityAr: '50 - 70 نقطة سبرنت شهرياً',
      deploymentTimeEn: '10 Business Days to Sprint 1',
      deploymentTimeAr: '10 أيام عمل لبدء السبرنت الأول',
      costAdvantageEn: '55% Savings with 99.99% Reliability',
      costAdvantageAr: 'توفير 55% مع موثوقية تشغيل 99.99%',
      keyHighlightsEn: [
        'High-concurrency database and cache optimization',
        'Feature flag rollouts and canary deployments',
        'Sub-15 minute Slack response times during Riyadh hours',
      ],
      keyHighlightsAr: [
        'تحسين أداء قواعد البيانات والذاكرة المؤقتة للأحمال العالية',
        'إطلاق تدريجي للميزات عبر أعلام الميزات ونشر الكناري',
        'استجابة عبر سلاك في أقل من 15 دقيقة خلال ساعات الرياض',
      ],
    },
    enterprise: {
      compositionEn: [
        '1 Principal Platform & Scaling Architect (US)',
        '2 Staff SRE & Cloud Optimization Specialists',
        '4 Senior Distributed Full-Stack Engineers',
        '1 Lead Performance & Chaos QA Engineer',
      ],
      compositionAr: [
        'كبير معماريي المنصات والتحجيم (إشراف أمريكي)',
        'أخصائيا موثوقية أنظمة وترشيد تكاليف سحابية',
        '4 مهندسي برمجيات متقدمين للنظم الموزعة',
        'قائد جودة لاختبارات الصمود وهندسة الفوضى',
      ],
      velocityEn: '90 - 120 Story Points / Month',
      velocityAr: '90 - 120 نقطة سبرنت شهرياً',
      deploymentTimeEn: '12 Business Days to Sprint 1',
      deploymentTimeAr: '12 يوم عمل لبدء السبرنت الأول',
      costAdvantageEn: '50% Savings vs Local Staff Augmentation',
      costAdvantageAr: 'توفير 50% مقارنة بشركات التوريد المحلية',
      keyHighlightsEn: [
        'Sustained multi-million user traffic resilience',
        'Continuous FinOps cloud bill optimization',
        'Full executive and board-level engineering reporting',
      ],
      keyHighlightsAr: [
        'صمود فائق لأحمال ملايين المستخدمين المتزامنين',
        'ترشيد مستمر لفواتير السحابة عبر ممارسات FinOps',
        'تقارير هندسية متكاملة لمجالس الإدارة والرؤساء التنفيذيين',
      ],
    },
  },
};

export function SquadAllocationSimulator() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';

  const [scope, setScope] = useState<ProductScope>('mvp-0to1');
  const [podSize, setPodSize] = useState<PodSize>('standard');

  const result = POD_MATRIX[scope][podSize];

  return (
    <section className="relative py-24 sm:py-32 bg-[#09090b] text-white overflow-hidden border-b border-white/10" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d1408]/30 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-4">
            <Sliders className="h-3.5 w-3.5" />
            <span>{isAr ? 'محاكي تخصيص الفرق وسرعة الإنجاز' : 'SQUAD SIZING & VELOCITY SIMULATOR'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
            {isAr ? 'احسب حجم الفريق الهندسي وسرعة تسليم منتجك' : 'Calculate Your Dedicated Pod Capacity & Velocity'}
          </h2>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed">
            {isAr
              ? 'حدد مرحلة منتجك وحجم الفريق المطلوب لمعاينة التشكيل الهندسي المتخصص، وسرعة الإنجاز المتوقعة شهرياً، وفارق التكلفة مقارنة بالبدائل التقليدية.'
              : 'Select your roadmap phase and target pod bandwidth to project multidisciplinary headcount, monthly sprint output, deployment velocity, and cost advantages.'}
          </p>
        </div>

        {/* Simulator Grid (Left: Inputs, Right: Live Results) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-[#0d0d10] p-6 sm:p-8 space-y-8">
            {/* Input 1: Roadmap Scope */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '1. مرحلة المنتج وخارطة الطريق' : '1. Product Stage & Roadmap Focus'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'mvp-0to1',
                    titleEn: '0-to-1 Greenfield MVP (Rapid Launch)',
                    titleAr: 'بناء منتج جديد من الصفر (0-to-1 MVP)',
                  },
                  {
                    id: 'modernization',
                    titleEn: 'Enterprise Modernization (Legacy to Cloud)',
                    titleAr: 'تحديث الأنظمة القديمة إلى السحابة الحديثة',
                  },
                  {
                    id: 'scaleup',
                    titleEn: 'Scale-Up High Growth (Feature Velocity)',
                    titleAr: 'توسيع نطاق الميزات وسرعة النمو العالي',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setScope(item.id as ProductScope)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      scope === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {scope === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Pod Bandwidth */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-wider text-white/60 mb-3">
                {isAr ? '2. حجم وسعة الفريق الهندسي' : '2. Pod Bandwidth & Sizing'}
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'lightweight',
                    titleEn: 'Compact Pod (3 FTEs) • Fast Strike Unit',
                    titleAr: 'فريق مصغر (3 مهندسين) • وحدة سريعة',
                  },
                  {
                    id: 'standard',
                    titleEn: 'Full Product Pod (5 FTEs) • Recommended',
                    titleAr: 'فريق منتج متكامل (5 مهندسين) • الموصى به',
                  },
                  {
                    id: 'enterprise',
                    titleEn: 'Dual Enterprise Pod (8 FTEs) • Maximum Speed',
                    titleAr: 'فريق مؤسسي مزدوج (8 مهندسين) • السرعة القصوى',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPodSize(item.id as PodSize)}
                    className={`w-full font-mono text-xs p-3.5 rounded-xl border text-start transition-all flex items-center justify-between ${
                      podSize === item.id
                        ? 'border-[#e9800a] bg-[#e9800a]/10 text-white font-bold'
                        : 'border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20'
                    }`}
                  >
                    <span>{isAr ? item.titleAr : item.titleEn}</span>
                    {podSize === item.id && <span className="h-2 w-2 rounded-full bg-[#e9800a]" />}
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
                  PROJECTED POD ALLOCATION
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'خطة الفريق الهندسي وسرعة الإنتاج' : 'Dedicated Pod Blueprint & Capacity'}
                </h3>
              </div>

              <div className="font-mono text-xs px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 font-bold">
                {isAr ? result.costAdvantageAr : result.costAdvantageEn}
              </div>
            </div>

            {/* Key Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <Zap className="h-3.5 w-3.5 text-[#e9800a]" />
                  <span>{isAr ? 'سرعة الإنجاز الشهرية' : 'Monthly Sprint Velocity'}</span>
                </div>
                <span className="text-lg sm:text-xl font-bold text-white block">
                  {isAr ? result.velocityAr : result.velocityEn}
                </span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-white/50 font-mono text-xs mb-1.5">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{isAr ? 'سرعة بدء أول سبرنت' : 'Time to Sprint 1 Kickoff'}</span>
                </div>
                <span className="text-sm sm:text-base font-bold text-white block">
                  {isAr ? result.deploymentTimeAr : result.deploymentTimeEn}
                </span>
              </div>
            </div>

            {/* Squad Composition Breakdown */}
            <div className="mb-8">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                {isAr ? 'توزيع التخصصات الهندسية في الفريق:' : 'Dedicated Pod Composition & Discipline Roles:'}
              </span>
              <div className="space-y-2.5">
                {(isAr ? result.compositionAr : result.compositionEn).map((role, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80">
                    <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0 mt-0.5" />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Operational Highlights */}
            <div className="mb-8 pt-6 border-t border-white/10">
              <span className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-3">
                {isAr ? 'مزايا التشغيل والحوكمة المعتمدة:' : 'Operational Governance Highlights:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {(isAr ? result.keyHighlightsAr : result.keyHighlightsEn).map((item, idx) => (
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
                {isAr ? 'عقود مرنة من 3 إلى 12 شهراً دون قيود طويلة الأمد' : 'Flexible 3 to 12-Month Sprints • Zero Lock-in'}
              </span>
              <Link
                href="/contact-us"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_20px_rgba(233,128,10,0.3)] active:scale-[0.98]"
              >
                <span>{isAr ? 'حجز الفريق الهندسي' : 'Lock In Dedicated Squad'}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
