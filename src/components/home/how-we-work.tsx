"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Workflow,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lock,
  GitBranch,
  Terminal,
  Check,
  Server,
  Zap,
} from 'lucide-react';

// Dynamically import the 3D pipeline visualizer with SSR disabled for optimal hydration
const PredictablePipeline3D = dynamic(
  () => import('@/components/3d/PredictablePipeline3D').then((mod) => mod.PredictablePipeline3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[360px] sm:h-[420px] lg:h-[480px] flex items-center justify-center rounded-3xl border border-white/10 bg-black/40">
        <div className="flex items-center gap-2.5 font-mono text-xs text-white/50">
          <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
          <span>Initializing 3D Sprint Pipeline Engine...</span>
        </div>
      </div>
    ),
  }
);

// Extended Phase Technical Specs for Executive Assurance
const PHASE_SPECS = [
  {
    phaseTag: 'PHASE_01 // ARCHITECTURAL_DISCOVERY',
    badgeEn: 'Rigorous Blueprinting',
    badgeAr: 'التخطيط المعماري الصارم',
    specsEn: [
      'C4 Architecture Context & Container Models',
      'SAMA Open Banking & NCA ECC Regulatory Scoping',
      'Delaware & KSA Intellectual Property Contract Framing',
    ],
    specsAr: [
      'نمذجة معمارية C4 للمكونات والأنظمة السحابية',
      'تحديد متطلبات الامتثال لأنظمة البنك المركزي (ساما) والهيئة الوطنية للأمن السيبراني',
      'صياغة عقود نقل الملكية الفكرية المعتمدة في المملكة والولايات المتحدة',
    ],
    artifactIcon: Layers,
    leadEn: 'Principal Cloud Architect & KSA Regulatory Advisor',
    leadAr: 'كبير مهندسي السحابة ومستشار الامتثال بالمملكة',
  },
  {
    phaseTag: 'PHASE_02 // REGIONAL_SYSTEMS_DESIGN',
    badgeEn: 'Cultural & UX Precision',
    badgeAr: 'دقة تجربة المستخدم والهوية',
    specsEn: [
      'Bilingual RTL/LTR Arabic-First Design Tokens',
      'WCAG 2.1 AA Accessibility & Micro-Interactions',
      'High-Fidelity Clickable Prototype Tested with Gulf Users',
    ],
    specsAr: [
      'نظام تصميم موحد يدعم العربية أصالة (RTL/LTR) مع مكتبة رموز حديثة',
      'توافق معايير الوصول العالمية WCAG 2.1 AA',
      'نموذج تفاعلي عالي الدقة مُختبر مع مستخدمين من بيئة الأعمال الخليجية',
    ],
    artifactIcon: Sparkles,
    leadEn: 'Lead Product Designer & Design Systems Engineer',
    leadAr: 'كبير مصممي المنتجات الرقمية ومهندس أنظمة التصميم',
  },
  {
    phaseTag: 'PHASE_03 // CONCURRENT_POD_EXECUTION',
    badgeEn: 'High-Velocity Sprints',
    badgeAr: 'تطوير برمجي فائق السرعة',
    specsEn: [
      'Dedicated 5-8 Engineer Pods Aligned with Riyadh (GMT+3)',
      'Automated GitOps CI/CD Pipelines & Daily Demos',
      'Weekly Testable Staging Deploys in Client Private VPC',
    ],
    specsAr: [
      'فرق هندسية مخصصة (5-8 مهندسين) بتوافق كامل مع توقيت الرياض (GMT+3)',
      'أتمتة خطوط النشر السحابي (GitOps CI/CD) واجتماعات يومية متزامنة',
      'نشر أسبوعي لبيئات الفحص التجريبية على السحابة الخاصة للعميل',
    ],
    artifactIcon: GitBranch,
    leadEn: 'Senior Engineering Pod Lead & Full-Stack Squad',
    leadAr: 'قائد الفريق الهندسي وفريق التطوير المتكامل',
  },
  {
    phaseTag: 'PHASE_04 // SEC_HARDENING_STRESS_TESTS',
    badgeEn: 'Zero-Vulnerability Readiness',
    badgeAr: 'جاهزية أمنية واختبارات ضغط',
    specsEn: [
      'Automated Static Analysis (SonarQube Gate > 90%)',
      'Concurrency Load Testing Exceeding 10,000 RPS',
      'OWASP Top 10 Red-Teaming & Infrastructure Penetration Audit',
    ],
    specsAr: [
      'فحص كود تلقائي مستمر بنسبة دقة تفوق 90% (SonarQube Quality Gate)',
      'اختبارات حمل وضغط تتجاوز 10,000 طلب في الثانية بنجاح تام',
      'اختبارات اختراق ومحاكاة هجمات وفق أعلى معايير OWASP Top 10',
    ],
    artifactIcon: ShieldCheck,
    leadEn: 'Principal DevSecOps Engineer & Penetration Specialist',
    leadAr: 'كبير مهندسي الأمن السحابي (DevSecOps) ومختبر اختراق معتمد',
  },
  {
    phaseTag: 'PHASE_05 // PRODUCTION_IP_HANDOVER',
    badgeEn: '100% Sovereign Ownership',
    badgeAr: 'ملكية سيادية كاملة 100%',
    specsEn: [
      '100% Source Code & Git History Direct Ownership Transfer',
      'Terraform / Helm Cloud Infrastructure as Code Blueprints',
      'Comprehensive In-House Engineering Enablement & Runbooks',
    ],
    specsAr: [
      'تسليم كامل الشفرة المصدرية وسجل Git للعميل من اليوم الأول',
      'مخططات البنية التحتية البرمجية ككود (Terraform / Helm IaC)',
      'أدلة تشغيل شاملة وورش عمل تدريبية لتمكين الفريق التقني الداخلي للعميل',
    ],
    artifactIcon: Lock,
    leadEn: 'VP of Engineering & Client Technical Transition Team',
    leadAr: 'نائب الرئيس للشؤون الهندسية وفريق التسليم الفني',
  },
];

export function HowWeWork() {
  const { t, direction, locale } = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-advance through stages unless the user manually interacts
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 5);
    }, 8000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStepData = t.howWeWork.steps[activeStep] || t.howWeWork.steps[0];
  const currentSpec = PHASE_SPECS[activeStep] || PHASE_SPECS[0];
  const CurrentIcon = currentSpec.artifactIcon;

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false);
  };

  const nextStep = () => {
    setActiveStep((prev) => (prev + 1) % 5);
    setIsAutoPlaying(false);
  };

  const prevStep = () => {
    setActiveStep((prev) => (prev - 1 + 5) % 5);
    setIsAutoPlaying(false);
  };

  return (
    <section
      id="how-we-work"
      className="relative py-24 sm:py-32 bg-[#080808] text-white overflow-hidden border-t border-white/10"
      dir={direction}
    >
      {/* 1. Midnight Luxury Background Dynamics */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c1208]/40 via-[#0a0a0c] to-[#080808]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-[420px] w-[640px] rounded-full bg-[#e9800a]/10 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 2. Editorial Asymmetric Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            {/* Architectural Stage Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-3.5 py-1.5 text-xs font-mono font-semibold text-[#e9800a] mb-5 shadow-[inset_0_1px_0_rgba(233,128,10,0.2)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] animate-pulse" />
              <span>{t.howWeWork.sectionTag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15] mb-5">
              {t.howWeWork.heading}
            </h2>

            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl">
              {t.howWeWork.subheading}
            </p>
          </motion.div>

          {/* Synchronous Gulf Business Telemetry Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-5 max-w-md lg:self-end shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          >
            <div className="flex items-center justify-between gap-4 mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[#e9800a]">
                <Clock className="h-3.5 w-3.5" />
                <span>RIYADH SYNCHRONOUS OPS</span>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-400 font-medium">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                AST (UTC+3)
              </span>
            </div>
            <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed font-normal">
              {t.howWeWork.gulfTimezoneNotice}
            </p>
          </motion.div>
        </div>

        {/* 3. Interactive Milestone Scrubber (Horizontal Navigation Stepper) */}
        <div className="mb-10 sm:mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3">
            {t.howWeWork.steps.map((step, idx) => {
              const isActive = idx === activeStep;
              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => handleStepClick(idx)}
                  className={`group relative text-start p-3 sm:p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-[#e9800a] bg-[#e9800a]/10 shadow-[0_0_24px_-6px_rgba(233,128,10,0.35)]'
                      : 'border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Subtle active highlight bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeStepIndicator"
                      className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-[#e9800a]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold ${
                        isActive ? 'text-[#e9800a]' : 'text-white/40 group-hover:text-white/70'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`font-mono text-[10px] uppercase px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-[#e9800a]/20 text-[#e9800a] font-bold'
                          : 'text-white/30 group-hover:text-white/50'
                      }`}
                    >
                      {isActive ? 'IN FOCUS' : `STAGE ${idx + 1}`}
                    </span>
                  </div>

                  <h4
                    className={`text-xs sm:text-sm font-semibold truncate ${
                      isActive ? 'text-white' : 'text-white/70 group-hover:text-white'
                    }`}
                  >
                    {step.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Asymmetric Split Screen: 3D WebGL Pipeline Visualizer & Command Cockpit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-14 sm:mb-16">
          {/* Left: Interactive 3D WebGL Sprint Pipeline (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-[#111114] to-[#0c0c0e] p-5 sm:p-7 overflow-hidden shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4 text-[#e9800a]" />
                <span className="font-mono text-xs font-bold text-white tracking-wider">
                  3D ENGINEERING PIPELINE TOPOLOGY
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-white/50">
                  STAGE {activeStep + 1} OF 5
                </span>
                <span className="h-2 w-2 rounded-full bg-[#e9800a] animate-pulse" />
              </div>
            </div>

            {/* Three.js Interactive 3D WebGL Canvas */}
            <div className="my-auto py-2">
              <PredictablePipeline3D
                activeStep={activeStep}
                onSelectStep={(idx) => handleStepClick(idx)}
              />
            </div>

            {/* Pipeline Stage Indicators Strip */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-white/60">
              <div className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-[#e9800a]" />
                <span className="text-white/80">
                  {currentSpec.phaseTag}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#e9800a]">
                <Check className="h-3.5 w-3.5" />
                <span>{locale === 'ar' ? currentSpec.badgeAr : currentSpec.badgeEn}</span>
              </div>
            </div>
          </div>

          {/* Right: Milestone Deep-Dive Command Board (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-[#e9800a]/25 bg-gradient-to-b from-[#141210] to-[#0d0c0b] p-6 sm:p-8 shadow-[0_20px_50px_-20px_rgba(233,128,10,0.15)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -14 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                {/* Phase Number & Title Header */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="font-mono text-3xl sm:text-4xl font-black text-[#e9800a]">
                      {currentStepData.number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/15 px-3 py-1 font-mono text-[11px] font-bold text-[#e9800a]">
                      <CurrentIcon className="h-3.5 w-3.5" />
                      <span>{locale === 'ar' ? currentSpec.badgeAr : currentSpec.badgeEn}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    {currentStepData.title}
                  </h3>
                </div>

                {/* Detailed Description */}
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  {currentStepData.description}
                </p>

                {/* Primary Audited Deliverable Card */}
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#e9800a] font-bold mb-2">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{locale === 'ar' ? 'المخرج الهندسي المعتمد:' : 'Verified Engineering Deliverable:'}</span>
                  </div>
                  <p className="text-sm sm:text-[15px] font-semibold text-white leading-snug">
                    {currentStepData.deliverable}
                  </p>
                </div>

                {/* Concrete Deliverable Specifications Checklist */}
                <div className="space-y-2.5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-white/50 block">
                    {locale === 'ar' ? 'معايير الإنجاز الفنية:' : 'Enterprise Specifications & Audit Criteria:'}
                  </span>
                  <div className="space-y-2">
                    {(locale === 'ar' ? currentSpec.specsAr : currentSpec.specsEn).map((spec, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 leading-normal">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#e9800a] mt-1.5 shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Lead Squad Accountability */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/50">
                  <span>ACCOUNTABILITY:</span>
                  <span className="text-white/80 font-medium">
                    {locale === 'ar' ? currentSpec.leadAr : currentSpec.leadEn}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Phase Stepper Controls */}
            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono font-semibold text-white/80 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{locale === 'ar' ? 'المرحلة السابقة' : 'Previous Phase'}</span>
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-2 rounded-xl border border-[#e9800a]/40 bg-[#e9800a] px-4 py-2 text-xs font-mono font-bold text-black hover:bg-[#ff9420] transition-all shadow-[0_0_15px_rgba(233,128,10,0.4)]"
              >
                <span>{locale === 'ar' ? 'المرحلة التالية' : 'Next Phase'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 5. Sovereign Assurance & Governance Bottom Strip */}
        <div className="pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <Clock className="h-5 w-5 text-[#e9800a] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-white mb-1">
                {locale === 'ar' ? 'توافق تام بتوقيت الرياض (GMT+3)' : '100% Riyadh Working Hours'}
              </h5>
              <p className="text-xs text-white/60 leading-relaxed">
                {locale === 'ar'
                  ? 'اجتماعات يومية متزامنة، مراجعات شفرات مستمرة، وتواصل مباشر على قنوات مشتركة دون أي تأخير زمني.'
                  : 'Daily synchronous standups, sprint reviews, and direct shared Slack/Teams channels with zero time-zone drag.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <Server className="h-5 w-5 text-[#e9800a] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-white mb-1">
                {locale === 'ar' ? 'بيئات فحص وتجارب أسبوعية' : 'Weekly Working Software Deploys'}
              </h5>
              <p className="text-xs text-white/60 leading-relaxed">
                {locale === 'ar'
                  ? 'تسليمات حية كل أسبوع على بيئة سحابية خاصة بالعميل تتيح للقيادة الفنية اختبار كل ميزة فور اكتمالها.'
                  : 'Weekly functional releases deployed to your dedicated private cloud VPC for continuous executive inspection.'}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
            <Lock className="h-5 w-5 text-[#e9800a] shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-bold text-white mb-1">
                {locale === 'ar' ? 'ملكية فكرية وسيادة برمجية 100%' : '100% Day-1 Sovereign IP'}
              </h5>
              <p className="text-xs text-white/60 leading-relaxed">
                {locale === 'ar'
                  ? 'جميع الشفرات، ملفات Git، ومخططات البنية التحتية ملك خالص لمؤسستك بموجب عقود قانونية موثقة.'
                  : 'All code, Git commits, IaC scripts, and documentation belong exclusively to your enterprise under strict legal contracts.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
