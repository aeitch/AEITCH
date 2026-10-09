"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cloud,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Server,
  Layers,
  ShieldCheck,
  Zap,
  Activity,
  ChevronDown,
  Terminal,
  Globe2,
  DollarSign,
  TrendingDown,
  Lock,
  GitBranch,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function CloudDevopsDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const capabilities = [
    {
      icon: GitBranch,
      titleAr: 'استراتيجية DevOps وخارطة الطريق',
      titleEn: 'DevOps Strategy and Roadmap',
      descAr: 'تحليل البنية الحالية ووضع مسار واضح لتسريع وتيرة الإصدارات وضبط الاستقرار.',
      descEn: 'Evaluate current delivery bottlenecks and establish a structured automation roadmap.',
    },
    {
      icon: Terminal,
      titleAr: 'خطوط CI/CD آلية',
      titleEn: 'Automated CI/CD Pipelines',
      descAr: 'بناء خطوط نشر وتكامل مستمر بدون فترات توقف للخدمة وبأعلى معايير الأمان.',
      descEn: 'Engineered zero-downtime automated pipelines with built-in compliance gates.',
    },
    {
      icon: Layers,
      titleAr: 'البنية كشيفرة (Terraform)',
      titleEn: 'Infrastructure as Code (Terraform)',
      descAr: 'إدارة وإعداد موارد السحابة برمجيًا لضمان التكرارية والتوثيق والتحكم بالنسخ.',
      descEn: 'Declarative, reproducible multi-cloud provisioning using Terraform and OpenTofu.',
    },
    {
      icon: Cloud,
      titleAr: 'الهجرة السحابية والتحسين',
      titleEn: 'Cloud Migration & Optimization',
      descAr: 'نقل آمن للأحمال والبيانات إلى السحابة مع تحسين المعمارية للأداء والاستقرار.',
      descEn: 'Risk-mitigated workload migration and re-platforming for high availability.',
    },
    {
      icon: Activity,
      titleAr: 'المراقبة وقابلية الرصد',
      titleEn: 'Monitoring and Observability',
      descAr: 'تتبع شامل للأداء وسجلات التشغيل والتنبيهات الاستباقية لمنع الأعطال قبل حدوثها.',
      descEn: 'Full-stack distributed tracing, centralized logging, and proactive incident alerting.',
    },
    {
      icon: Server,
      titleAr: 'الحاويات وKubernetes',
      titleEn: 'Containers and Kubernetes',
      descAr: 'تصميم وتشغيل مجموعات Kubernetes عالية التوفر وقابلة للتوسع التلقائي.',
      descEn: 'Production-grade Kubernetes cluster design, service meshes, and auto-scaling pods.',
    },
    {
      icon: TrendingDown,
      titleAr: 'تحسين تكلفة السحابة (FinOps)',
      titleEn: 'Cloud Cost Optimization (FinOps)',
      descAr: 'تدقيق الموارد السحابية وإلغاء الهدر، وضبط الميزانيات وتوفير مالي ملموس.',
      descEn: 'Rigorous architectural auditing, right-sizing compute, and eliminating idle cloud spend.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'DevSecOps: الأمان داخل خطوط النشر',
      titleEn: 'DevSecOps: Security Inside the Pipeline',
      descAr: 'دمج فحص الثغرات وإدارة المفاتيح والتحقق من التشفير تلقائيًا مع كل سطر كود.',
      descEn: 'Automated SAST/DAST vulnerability scanning and secrets management baked into CI/CD.',
    },
  ];

  const cloudInKingdom = [
    {
      titleAr: 'سحابة داخل المملكة',
      titleEn: 'Cloud Inside the Kingdom',
      descAr: 'عدة مزودين عالميين أنشأوا مناطق سحابية داخل المملكة، ونساعدك على اختيار المنطقة والمعمارية المناسبة لبياناتك.',
      descEn: 'Several global providers now run cloud regions in Saudi Arabia, and we help you pick the right region and architecture for your data.',
    },
    {
      titleAr: 'سياسة «السحابة أولًا» وضوابط NCA CCC',
      titleEn: 'Cloud First Policy & NCA CCC Controls',
      descAr: 'تدعم المملكة تبني السحابة، ولها ضوابط واضحة. نصمم معماريتك مع مراعاة ضوابط الأمن السيبراني للحوسبة السحابية (CCC) لدى الهيئة الوطنية للأمن السيبراني حيثما انطبقت على جهتك.',
      descEn: 'The Kingdom promotes cloud adoption within clear rules. We design your architecture with the NCA’s Cloud Cybersecurity Controls (CCC) in mind where they apply to your organization.',
    },
    {
      titleAr: 'حياد تام تجاه المزود',
      titleEn: 'Provider-Neutral Recommendations',
      descAr: 'نوصي بما يناسبك ويناسب خصوصية بياناتك وتكلفتك، لا بما يفرضه مزود معين.',
      descEn: 'We recommend what fits your workloads, data privacy requirements, and budgets—never tied to vendor sales quotas.',
    },
  ];

  const securityPillars = [
    {
      ar: 'DevSecOps مدمج في كل خط نشر',
      en: 'DevSecOps inside every release',
    },
    {
      ar: 'اختبارات أمان وفحص ثغرات آلية',
      en: 'Automated security testing & SAST',
    },
    {
      ar: 'التحكم بالوصول وإدارة الهوية المتقدمة',
      en: 'Access control and identity management',
    },
    {
      ar: 'مراقبة امتثال وتدقيق أمني مستمر',
      en: 'Continuous compliance monitoring',
    },
  ];

  const relatedWork = [
    {
      slug: 'paylink-devops-transformation',
      titleAr: 'تحول DevOps لدعم توسع منصة المدفوعات (PayLink)',
      titleEn: 'DevOps Transformation Powering Fintech Scaling (PayLink)',
      category: 'FinTech / DevOps',
    },
    {
      slug: 'microservices-system-modernization',
      titleAr: 'تحديث الأنظمة المعمارية والتحول إلى الخدمات المصغرة',
      titleEn: 'Microservices Transformation for System Modernization',
      category: 'Cloud Architecture',
    },
  ];

  const faqs = [
    {
      qAr: 'ما الذي تحسّنه استشارات DevOps؟',
      qEn: 'What do DevOps services improve?',
      aAr: 'سرعة الإصدار، واستقرار الأنظمة، وتقليل وقت التوقف، وكفاءة التشغيل بين فرق التطوير والبنية التحتية.',
      aEn: 'Release speed, system stability, minimized downtime, and operational efficiency across development and operations.',
    },
    {
      qAr: 'ماذا تشمل خدمات DevOps السحابية؟',
      qEn: 'What’s included?',
      aAr: 'بناء خطوط CI/CD، إدارة البنية كشيفرة (IaC)، الهجرة السحابية، أتمتة الاختبارات، المراقبة، والتحسين المستمر للأداء والتكلفة.',
      aEn: 'CI/CD pipelines, Infrastructure as Code, cloud migration, automated testing, observability, and ongoing cost/performance tuning.',
    },
    {
      qAr: 'هل تناسب الشركات النامية؟',
      qEn: 'Is it right for growing companies?',
      aAr: 'نعم: تمنح الشركات بنية قابلة للتوسع ونشرًا آليًا يقلل العبء التشغيلي ويمنع الأخطاء اليدوية مع نمو حجم المستخدمين.',
      aEn: 'Yes: scalable infrastructure and automated deployment cut operational overhead and eliminate manual errors as traffic scales.',
    },
    {
      qAr: 'متى تظهر النتائج؟',
      qEn: 'When will we see results?',
      aAr: 'عادةً خلال أسابيع قليلة في استقرار عمليات النشر وأتمتة خطوط CI/CD، ثم تتواصل مكاسب تحسين الأداء وترشيد التكاليف مع نضج الممارسات.',
      aEn: 'Usually within weeks for deployment stability and CI/CD automation, with compounding gains in performance and FinOps over time.',
    },
    {
      qAr: 'كيف نختار مزود DevOps؟',
      qEn: 'How do we choose a provider?',
      aAr: 'ابحث عن خبرة سحابية حقيقية، ممارسات أمان أولًا، ونتائج قابلة للقياس والتحقق، وليس مجرد سرد لأدوات وتقنيات.',
      aEn: 'Look for verified cloud engineering expertise, security-first practices, and measurable business outcomes rather than tool lists.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Cloud className="h-4 w-4 text-emerald-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
              {isAr ? 'DevOps وهندسة السحابة' : 'DEVOPS & CLOUD ENGINEERING'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'انشر أسرع. وقلّل التوقف. وتحكّم في فاتورة السحابة.' : 'Ship faster. Cut downtime. Control your cloud bill.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'نصمم وننفذ ونشغّل بنى سحابية وخطوط نشر آلية موثوقة وآمنة، لتصل تحديثاتك للمستخدم بسرعة وثبات.'
              : 'We design, implement and run reliable, secure cloud infrastructure and automated delivery pipelines, so your updates reach users quickly and safely.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'قيّم بنيتك السحابية' : 'Review your cloud setup'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. WHAT WE DO (8 Capabilities) */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'ما نقوم به' : 'WHAT WE DO'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'قدرات متكاملة للبنية السحابية وأتمتة النشر' : 'Full-Spectrum Cloud Infrastructure & Delivery Capabilities'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#121215] p-6 hover:border-emerald-500/50 hover:bg-[#141816] transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {isAr ? c.titleAr : c.titleEn}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {isAr ? c.descAr : c.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CLOUD IN THE KINGDOM */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'السحابة في المملكة' : 'CLOUD IN THE KINGDOM'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'بنية سحابية سيادية متوافقة مع الأنظمة السعودية' : 'In-Kingdom Sovereignty & Compliance'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cloudInKingdom.map((item, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-[#121215] p-8 hover:border-[#e9800a]/40 transition-colors"
              >
                <div className="h-2 w-8 bg-[#e9800a] rounded mb-5" />
                <h3 className="text-lg font-bold text-white mb-3">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECURITY-FIRST + MANAGED SERVICES */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Security-First */}
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'الأمان أولًا' : 'SECURITY-FIRST'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6">
                {isAr ? 'الأمان مدمج في كل خطوة هندسية' : 'Security Baked Into Every Deployment'}
              </h2>
              <div className="space-y-3">
                {securityPillars.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-[#141418]">
                    <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
                    <span className="text-sm font-semibold text-neutral-200">
                      {isAr ? p.ar : p.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Managed Services */}
            <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/20 to-[#121215] p-8 sm:p-10 backdrop-blur-xl">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-3">
                {isAr ? 'الخدمات المدارة' : 'MANAGED SERVICES'}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {isAr ? 'تشغيل ودعم مستمر لبنيتك السحابية' : 'Continuous 24/7 Cloud Operations'}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                {isAr
                  ? 'تشغيل ودعم مستمر لبنيتك السحابية: مراقبة، استجابة للحوادث، تحسين تكلفة، وتقارير دورية تضمن استقرار منصاتك على مدار الساعة.'
                  : 'Ongoing operation and support of your cloud: monitoring, incident response, cost optimization and regular reporting to ensure continuous system stability.'}
              </p>
              <div className="pt-4 border-t border-white/10 text-xs font-mono text-emerald-400">
                {isAr ? 'مراقبة حية · استجابة سريعة · تقارير تكلفة دورية' : 'Active Telemetry · Fast SLA · Regular FinOps Audits'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISION 2030 ALIGNMENT BOX */}
      <section className="py-16 sm:py-20 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#e9800a]/40 bg-gradient-to-r from-[#181308] via-[#101014] to-[#181308] p-8 sm:p-12 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-3xl">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                  {isAr ? 'مواءمة رؤية 2030' : 'VISION 2030 ALIGNMENT'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {isAr
                    ? 'التحول الرقمي ركيزة أساسية في رؤية 2030'
                    : 'Digital Transformation at the Core of Vision 2030'}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'التحول الرقمي ركيزة أساسية في رؤية 2030، والبنية السحابية الموثوقة شرط لأي خدمة رقمية ناجحة. نبني الأساس الذي تقف عليه منتجاتك وخدماتك.'
                    : 'Digital transformation is central to Vision 2030, and reliable cloud infrastructure underpins every successful digital service. We build the foundation your products and services stand on.'}
                </p>
              </div>

              <Link
                href="/vision-2030"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e9800a]/40 bg-[#e9800a]/10 px-6 py-3.5 text-sm font-bold text-[#e9800a] hover:bg-[#e9800a] hover:text-black transition-all shrink-0"
              >
                <span>{isAr ? 'صفحة رؤية 2030' : 'Vision 2030 Page'}</span>
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RELATED WORK */}
      <section className="py-20 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'أعمال سابقة' : 'RELATED WORK'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isAr ? 'بنى تحتية سحابية هندسناها' : 'Cloud Infrastructures Engineered by AEITCH'}
              </h2>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#e9800a] hover:underline"
            >
              <span>{isAr ? 'عرض جميع دراسات الحالة' : 'View all case studies'}</span>
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedWork.map((cs, idx) => (
              <Link
                key={idx}
                href="/case-studies"
                className="group rounded-2xl border border-white/10 bg-[#111114] p-8 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-4">
                    {isAr ? cs.titleAr : cs.titleEn}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors pt-4 border-t border-white/5">
                  <span>{isAr ? 'قراءة دراسة الحالة' : 'Read case study'}</span>
                  <ArrowIcon className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              FAQ
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#121215] overflow-hidden transition-colors hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-start gap-4 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {isAr ? faq.qAr : faq.qEn}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#e9800a]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm text-neutral-300 leading-relaxed border-t border-white/5">
                      {isAr ? faq.aAr : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr
              ? 'سرعة إصدار بطيئة أو فاتورة سحابية متصاعدة؟ لنراجع بنيتك.'
              : 'Slow releases or a climbing cloud bill? Let’s review your setup.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'احجز استشارة تقنية مجانية لمراجعة بنيتك السحابية وضبط التكاليف والأمان.'
              : 'Book a free technical consultation to evaluate your cloud architecture, costs, and security.'}
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
          >
            <span>{isAr ? 'احجز استشارة' : 'Book a consultation'}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 10. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
