"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Server,
  Layers,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ChevronDown,
  Layout,
  RefreshCw,
  Workflow,
  Search,
  Check,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function CustomSoftwareDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const capabilities = [
    {
      icon: Search,
      titleAr: 'استراتيجية المنتج والاستشارات التقنية',
      titleEn: 'Product Strategy & Technical Consulting',
      descAr: 'تحليل المتطلبات، تصميم المعمارية واختيار التقنيات الأنسب لحجم عملك.',
      descEn: 'Requirements analysis, architectural blueprinting, and technology stack selection.',
    },
    {
      icon: Layout,
      titleAr: 'تصميم UI/UX يراعي سهولة الوصول',
      titleEn: 'UI/UX Design with Accessibility',
      descAr: 'تصميم واجهات سهلة الاستخدام وتدعم العربية والإنجليزية (RTL/LTR) بأعلى معايير الوصول.',
      descEn: 'Accessible, bilingual design systems tailored for seamless enterprise adoption.',
    },
    {
      icon: Server,
      titleAr: 'تطبيقات مؤسسية قائمة على واجهات API',
      titleEn: 'API-First Enterprise Applications',
      descAr: 'تطبيقات سحابية أو داخلية عالية التوافر ومصممة لتحمل ضغط العمليات الكبيرة.',
      descEn: 'Cloud-native or on-premise high-concurrency systems engineered for zero friction.',
    },
    {
      icon: Workflow,
      titleAr: 'تكامل الأنظمة وواجهات API',
      titleEn: 'System Integration & API Design',
      descAr: 'ربط أنظمة المؤسسة ببعضها وبوابات الدفع والخدمات الحكومية والجهات الخارجية.',
      descEn: 'Bespoke microservices, webhook bridges, and unified enterprise system integration.',
    },
    {
      icon: RefreshCw,
      titleAr: 'تحديث الأنظمة القديمة',
      titleEn: 'Legacy System Modernization',
      descAr: 'تحديث البنى القديمة المعقدة دون انقطاع العمليات التشغيلية أو فقدان البيانات.',
      descEn: 'Decomposing brittle monoliths into resilient, decoupled microservices with zero downtime.',
    },
    {
      icon: ShieldCheck,
      titleAr: 'ضمان الجودة واختبارات الأمان والأداء',
      titleEn: 'QA, Security & Performance Testing',
      descAr: 'اختبارات وظيفية وآلية شاملة وفحص الأمان لضمان سلامة البيانات واستقرار النظام.',
      descEn: 'Comprehensive automated unit/integration testing, pen-testing, and load profiling.',
    },
    {
      icon: Zap,
      titleAr: 'النشر والصيانة والتطوير المستمر',
      titleEn: 'Deployment, Maintenance & Evolution',
      descAr: 'تسليم سلس، توثيق معماري كامل، ونقل معرفة لفريقك الداخلي مع دعم مستمر.',
      descEn: 'Smooth rollouts, comprehensive architecture documentation, and ongoing maintenance.',
    },
  ];

  const whyCustom = [
    {
      titleAr: 'حل مبني من الصفر لاحتياجك',
      titleEn: 'Built from the ground up for your needs',
      descAr: 'لا مساومات على سير العمل؛ النظام يُبنى ليطابق عملياتك تمامًا وليس العكس.',
      descEn: 'Zero compromises on workflows; your platform reflects your exact business rules.',
    },
    {
      titleAr: 'معمارية قابلة للنمو',
      titleEn: 'Architecture that grows with you',
      descAr: 'أنظمة مرنة تتوسع تلقائيًا مع زيادة العملاء والعمليات دون الحاجة لإعادة البناء.',
      descEn: 'Modular systems designed to handle millions of transactions without bottlenecks.',
    },
    {
      titleAr: 'خبرة عبر قطاعات متعددة',
      titleEn: 'Experience across multiple sectors',
      descAr: 'فهم عميق لقطاعات التقنية المالية، التأمين، الرعاية الصحية، وسلاسل الإمداد.',
      descEn: 'Deep domain expertise across FinTech, InsurTech, HealthTech, and logistics.',
    },
    {
      titleAr: 'تواصل شفاف: تقارير ومراحل واضحة',
      titleEn: 'Transparent communication: clear milestones',
      descAr: 'تقارير أسبوعية مفصلة، بيئات تجريبية للاختبار المستمر، ووضوح تام في الميزانيات.',
      descEn: 'Weekly sprint reviews, live staging environments, and zero hidden technical surprises.',
    },
  ];

  const relatedWork = [
    {
      slug: 'insurance-automation-api',
      titleAr: 'أتمتة منظومة التأمين والربط مع واجهات API',
      titleEn: 'API System Integration: Insurance Automation',
      category: 'InsurTech / Integration',
    },
    {
      slug: 'scalable-healthtech-platform',
      titleAr: 'برمجيات متكاملة لمنظومة صحية قابلة للتوسع',
      titleEn: 'End-to-End Software for Scalable HealthTech',
      category: 'HealthTech / Platform',
    },
    {
      slug: 'microservices-transformation',
      titleAr: 'تحديث الأنظمة القديمة والتحول للخدمات المصغرة',
      titleEn: 'Microservices Transformation for Modernization',
      category: 'Enterprise / Architecture',
    },
    {
      slug: 'real-time-logistics-saas',
      titleAr: 'منصة سحابية متقدمة للعمليات اللوجستية الفورية',
      titleEn: 'Scalable SaaS for Real-Time Logistics',
      category: 'Logistics / Cloud',
    },
  ];

  const faqs = [
    {
      qAr: 'ما فائدة البرمجيات المخصصة مقارنة بالحلول الجاهزة؟',
      qEn: 'Why custom software instead of off-the-shelf?',
      aAr: 'تناسب سير عملك بدقة وتنمو معك دون قيود التراخيص، وتمنحك ميزة تنافسية وملكية فكرية كاملة لكود النظام.',
      aEn: 'It matches your exact workflow, scales without licensing friction, and gives you 100% intellectual property ownership.',
    },
    {
      qAr: 'كيف تديرون عملية التطوير؟',
      qEn: 'How do you run the process?',
      aAr: 'نبدأ بالاستكشاف، ثم التصميم المعماري، التطوير الرشيق، الاختبارات المكثفة، والنشر السلس، مع إصدارات أسبوعية واضحة.',
      aEn: 'Discovery, architecture design, agile development, rigorous testing, and continuous deployment with tangible weekly releases.',
    },
    {
      qAr: 'ما دور إدارة دورة حياة المنتج؟',
      qEn: 'Why lifecycle management?',
      aAr: 'يضمن بقاء النظام آمنًا، متوافقًا مع التحديثات التقنية والقانونية، وقابلًا للتوسع مع زيادة حجم النشاط بعد الإطلاق.',
      aEn: 'It ensures the system remains secure, performant, and aligned with technical standards and regulatory updates long after launch.',
    },
    {
      qAr: 'هل تناسب الأنظمة المؤسسية الكبيرة؟',
      qEn: 'Is it suitable for large enterprise systems?',
      aAr: 'نعم، نتخصص في بناء معمارية خدمات مصغرة ذات اعتمادية عالية، وتكامل آمن مع قواعد البيانات المركزية والأنظمة الحالية.',
      aEn: 'Yes: we specialize in distributed microservices, robust fault tolerance, and secure integration with legacy databases and enterprise ERPs.',
    },
    {
      qAr: 'كيف نختار شركة تطوير برمجيات موثوقة؟',
      qEn: 'How do we choose a software partner?',
      aAr: 'اختر شريكًا يملك خبرة هندسية مثبتة، شفافية كاملة في التواصل، ممارسات أمان صارمة، والتزامًا بالدعم ونقل المعرفة بعد الإطلاق.',
      aEn: 'Look for proven production engineering depth, transparent communication, security-first practices, and clear IP handover.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Code2 className="h-4 w-4 text-purple-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-purple-400">
              {isAr ? 'البرمجيات المخصصة' : 'CUSTOM SOFTWARE DEVELOPMENT'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'برمجيات مصممة على مقاس عملك، لا العكس.' : 'Software built around your business, not the other way around.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'نهندس تطبيقات مؤسسية آمنة وقابلة للتوسع تُبسّط العمليات وتقوي علاقتك بعملائك وتسرّع الابتكار.'
              : 'We engineer secure, scalable enterprise applications that streamline operations, strengthen customer engagement and speed up innovation.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'ابدأ مشروعك البرمجي' : 'Start your software project'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. CAPABILITIES (7 Services) */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'خدماتنا' : 'OUR CAPABILITIES'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'حلول برمجية مؤسسية من البداية إلى النهاية' : 'End-to-End Enterprise Software Engineering'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#121215] p-7 hover:border-purple-500/50 hover:bg-[#15151c] transition-all"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                    {isAr ? c.titleAr : c.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {isAr ? c.descAr : c.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHY CUSTOM */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'لماذا البرمجيات المخصصة؟' : 'WHY CUSTOM SOFTWARE'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'أربعة أسباب تجعل البرمجيات المخصصة استثمارًا حقيقيًا' : 'Four Reasons Custom Builds Outperform Generic Tools'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyCustom.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#111114] p-7 hover:border-[#e9800a]/40 transition-colors"
              >
                <div className="h-7 w-7 rounded-lg bg-[#e9800a]/10 text-[#e9800a] flex items-center justify-center mb-4">
                  <Check className="h-4 w-4" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {isAr ? item.titleAr : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {isAr ? item.descAr : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. VISION 2030 ALIGNMENT BOX */}
      <section className="py-16 sm:py-20 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[#e9800a]/40 bg-gradient-to-r from-[#181308] via-[#101014] to-[#181308] p-8 sm:p-12 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 max-w-3xl">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                  {isAr ? 'مواءمة رؤية 2030' : 'VISION 2030 ALIGNMENT'}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {isAr
                    ? 'حكومة رقمية ومؤسسات أكثر كفاءة ومرونة'
                    : 'Digital Government & High-Efficiency Institutional Systems'}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'تسعى رؤية 2030 إلى حكومة رقمية ومؤسسات أكثر كفاءة. كثير من المؤسسات ما زالت تعتمد على أنظمة قديمة وعمليات يدوية؛ نساعدك على تحديثها دون تعطيل أعمالك.'
                    : 'Vision 2030 aims for digital government and more efficient institutions. Many organizations still run on legacy systems and manual processes; we help you modernize without disrupting your business.'}
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

      {/* 6. RELATED WORK */}
      <section className="py-20 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'أعمال سابقة' : 'RELATED WORK'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isAr ? 'أنظمة برمجية متكاملة سلّمناها' : 'Custom Platforms Engineered & Deployed'}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedWork.map((cs, idx) => (
              <Link
                key={idx}
                href="/case-studies"
                className="group rounded-2xl border border-white/10 bg-[#111114] p-6 hover:border-purple-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-purple-400 uppercase tracking-wider block mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors leading-snug mb-4">
                    {isAr ? cs.titleAr : cs.titleEn}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors pt-3 border-t border-white/5">
                  <span>{isAr ? 'تفاصيل النظام' : 'System details'}</span>
                  <ArrowIcon className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
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

      {/* 8. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#080808] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr
              ? 'هل تحتاج نظامًا لا تقدمه الحلول الجاهزة؟ لنتحدث.'
              : 'Need a system off-the-shelf tools can’t give you? Let’s talk.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'تحدث مع كبار مهندسينا لبحث مواصفات نظامك وإمكانية تنفيذه.'
              : 'Speak directly with our senior software architects to review your requirements and system blueprint.'}
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

      {/* 9. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
