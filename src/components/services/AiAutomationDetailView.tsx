"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Lock,
  Server,
  Layers,
  CheckCircle2,
  Workflow,
  Search,
  Bot,
  BarChart3,
  Sliders,
  ChevronDown,
  Eye,
  FileCheck,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function AiAutomationDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const capabilities = [
    {
      icon: Search,
      titleAr: 'استراتيجية الذكاء الاصطناعي وخارطة الطريق',
      titleEn: 'AI Strategy and Roadmap',
      descAr: 'نحدد أين يحقق الذكاء الاصطناعي أعلى عائد في عملك.',
      descEn: 'Identify where AI delivers the highest business ROI across your organization.',
    },
    {
      icon: Workflow,
      titleAr: 'أتمتة سير العمل والتكامل',
      titleEn: 'Workflow Automation & Integration',
      descAr: 'ربط الأنظمة وإزالة العمل اليدوي المتكرر.',
      descEn: 'Connect disparate systems, removing repetitive manual bottlenecks.',
    },
    {
      icon: Bot,
      titleAr: 'وكلاء الذكاء الاصطناعي وأنظمة RAG',
      titleEn: 'AI Agents & Enterprise RAG',
      descAr: 'وكلاء ينفذون مهام ويجيبون من معرفة مؤسستك الداخلية بدقة.',
      descEn: 'Autonomous agents that execute tasks and query internal enterprise knowledge.',
    },
    {
      icon: Sliders,
      titleAr: 'تطبيقات الذكاء الاصطناعي التوليدي وضبط النماذج',
      titleEn: 'Custom Generative AI & Fine-Tuning',
      descAr: 'تطبيقات ذكاء اصطناعي توليدي مخصصة وضبط دقيق للنماذج حسب قطاعك.',
      descEn: 'Custom domain-adapted LLMs, prompt pipelines, and model fine-tuning.',
    },
    {
      icon: BarChart3,
      titleAr: 'التحليلات التنبؤية والرؤية الحاسوبية',
      titleEn: 'Predictive Analytics & Computer Vision',
      descAr: 'استخراج الأنماط، التنبؤ بالطلب والتشغيل، ومعالجة الصور والمستندات.',
      descEn: 'Operational pattern extraction, demand forecasting, and visual document AI.',
    },
    {
      icon: Server,
      titleAr: 'MLOps والبنية التحتية وAIOps',
      titleEn: 'MLOps, AI Infrastructure & AIOps',
      descAr: 'بنية تحتية لتشغيل النماذج ومراقبة الانحراف، وأتمتة عمليات DevOps.',
      descEn: 'Scalable model serving, drift monitoring pipelines, and DevOps automation.',
    },
  ];

  const whereItHelps = [
    {
      ar: 'مسارات قرار آلية',
      en: 'Automated decision flows',
    },
    {
      ar: 'مساعدون رقميون للموظفين',
      en: 'AI assistants for staff',
    },
    {
      ar: 'تكامل متعدد الأنظمة',
      en: 'Multi-system integration',
    },
    {
      ar: 'توجيه ومعالجة بيانات ذكية',
      en: 'Smart routing and data processing',
    },
    {
      ar: 'مهام المكاتب الخلفية',
      en: 'Back-office operations',
    },
    {
      ar: 'خطوط بيانات تشغيلية عبر واجهات API',
      en: 'API-based operational pipelines',
    },
  ];

  const privacyPoints = [
    {
      titleAr: 'بياناتك لا تغادر بيئتك بدون إذنك',
      titleEn: 'Your data stays in your environment unless you say otherwise',
      descAr: 'نعمل داخل بيئات مشفرة وبصلاحيات محددة بدقة.',
      descEn: 'Encrypted network enclaves and tightly scoped role-based access.',
    },
    {
      titleAr: 'نماذج تعمل ضمن حدودك',
      titleEn: 'Models that respect your boundaries',
      descAr: 'نناقش معك خيارات استضافة النماذج، بما فيها داخل المملكة، حسب متطلبات بياناتك.',
      descEn: 'We evaluate model hosting options, including in-Kingdom sovereign environments, matching your exact data requirements.',
    },
    {
      titleAr: 'متوافق مع نظام حماية البيانات الشخصية (PDPL)',
      titleEn: 'PDPL-aware engineering',
      descAr: 'نصمم تدفقات البيانات مع مراعاة الأساس النظامي والحد الأدنى من البيانات وحقوق أصحابها.',
      descEn: 'We design data flows around lawful basis, data minimization, and data-subject rights under Saudi PDPL.',
    },
    {
      titleAr: 'اختبار على بيانات اصطناعية أو غير حقيقية',
      titleEn: 'Synthetic non-production testing',
      descAr: 'نستخدم بيانات تجريبية أو اصطناعية حيثما أمكن لضمان عدم تعرض بيانات الإنتاج لأي مخاطر.',
      descEn: 'Testing on non-production or synthetic data wherever possible to safeguard enterprise confidentiality.',
    },
  ];

  const engagementModels = [
    {
      arTitle: 'مشروع بنطاق محدد',
      enTitle: 'Fixed-Scope Project',
      arDesc: 'تسليم واضح المعالم بمخرجات وجدول زمني محدد.',
      enDesc: 'Clear milestones, defined deliverables, and predictable timelines.',
    },
    {
      arTitle: 'فريق مخصص شهري',
      enTitle: 'Dedicated Monthly Team',
      arDesc: 'مهندسون متخصصون مكرسون لتطوير وتوسيع منظومتك.',
      enDesc: 'Specialized engineers integrated directly with your roadmap.',
    },
    {
      arTitle: 'استشارة وتقييم جاهزية',
      enTitle: 'Readiness Assessment',
      arDesc: 'تدقيق تقني وتحديد مواضع الأثر الأعلى قبل الاستثمار.',
      enDesc: 'Technical feasibility audit to target highest-ROI opportunities first.',
    },
    {
      arTitle: 'دعم وتحسين مستمر',
      enTitle: 'Support & Optimization',
      arDesc: 'مراقبة دقة النماذج، منع الانحراف، وصيانة دورية.',
      enDesc: 'Continuous model monitoring, latency tuning, and performance updates.',
    },
  ];

  const caseStudies = [
    {
      slug: 'rag-powered-ai-agent',
      titleAr: 'وكيل RAG للتحقق من الامتثال التقني في الفنتك',
      titleEn: 'RAG Powered AI Agent: Regulatory Fintech Compliance',
      category: 'FinTech / AI',
    },
    {
      slug: 'enterprise-knowledge-retrieval',
      titleAr: 'وكيل المؤسسات: استرجاع المعرفة الفوري من الوثائق',
      titleEn: 'Enterprise AI Agent: Instant Knowledge Retrieval',
      category: 'Enterprise / RAG',
    },
    {
      slug: 'autonomous-predictive-procurement',
      titleAr: 'وكيل مستقل: التنبؤ بالمشتريات وسلاسل الإمداد',
      titleEn: 'Autonomous AI Agent: Predictive Procurement',
      category: 'Supply Chain / AI',
    },
    {
      slug: 'ai-predictive-manufacturing',
      titleAr: 'تحليلات تنبؤية: منع التوقف في العمليات الصناعية',
      titleEn: 'AI Predictive Analytics: Zero-Downtime Manufacturing',
      category: 'Industry / IoT',
    },
    {
      slug: 'ai-marketing-intelligence-suite',
      titleAr: 'منظومة الذكاء التسويقي المعتمدة على الذكاء الاصطناعي',
      titleEn: 'AI Marketing Intelligence Suite',
      category: 'Analytics / SaaS',
    },
  ];

  const faqs = [
    {
      qAr: 'كيف تضمنون دقة النتائج؟',
      qEn: 'How do you make sure results are accurate?',
      aAr: 'نبدأ بتدقيق البيانات ثم نختبر النماذج على سيناريوهات عملك الحقيقية، ونراقب الأداء ومقاييس الدقة بعد الإطلاق لمنع الهلوسة.',
      aEn: 'We audit your data, test models on your real scenarios, and monitor performance after launch to eliminate hallucinations.',
    },
    {
      qAr: 'بياناتنا غير منظمة، هل نستطيع البدء؟',
      qEn: 'Our data is messy. Can we still start?',
      aAr: 'نعم، معظم المؤسسات تبدأ هكذا. ننظف البيانات ونهيكلها أو نولد بيانات اصطناعية للاختبار والتدريب الأولي.',
      aEn: 'Yes, most organizations do. We clean and structure the data or generate synthetic data for testing.',
    },
    {
      qAr: 'كم يستغرق البناء؟',
      qEn: 'How long does it take?',
      aAr: 'نموذج أولي خلال أسابيع قليلة، وسير عمل متكامل خلال أسابيع إلى بضعة أشهر حسب درجة التعقيد وحجم الأنظمة المترابطة.',
      aEn: 'A working prototype in a few weeks, a full workflow in weeks to a few months depending on complexity and systems.',
    },
    {
      qAr: 'هل يتكامل مع أنظمتنا الحالية؟',
      qEn: 'Does it integrate with our existing systems?',
      aAr: 'نعم، مع أنظمة إدارة العملاء (CRM) وتخطيط الموارد (ERP) وقواعد البيانات والأنظمة المخصصة. إن كان لها واجهة API نستطيع الربط بسلاسة.',
      aEn: 'Yes: CRM, ERP, databases, and custom tools. If it has an API or webhook interface, we can connect to it.',
    },
    {
      qAr: 'فريقنا غير تقني، هل نستطيع تشغيله؟',
      qEn: 'Our team isn’t technical. Can they run it?',
      aAr: 'نسلّم لوحات تحكم مبسطة، عناصر تحكم بدون برمجة، وتوثيقًا وتدريبًا كاملًا لفريقك لإدارتها باستقلالية.',
      aEn: 'We deliver intuitive dashboards, no-code controls, full documentation, and hands-on staff training.',
    },
    {
      qAr: 'كيف تحمون بياناتنا؟',
      qEn: 'How do you protect our data?',
      aAr: 'بيئات مشفرة بالكامل، صلاحيات وصول صارمة، وتصميم هندسي يراعي متطلبات نظام حماية البيانات الشخصية السعودي (PDPL).',
      aEn: 'Encrypted environments, strict access control, and architectural design that respects Saudi PDPL data protection requirements.',
    },
    {
      qAr: 'كم التكلفة؟',
      qEn: 'What does it cost?',
      aAr: 'تعتمد التكلفة على النطاق والمتطلبات الهندسية. نقدم عرضًا ماليًا وفنيًا واضحًا ومحدد النطاق بعد مكالمة استكشافية مجانية مدتها 30 دقيقة.',
      aEn: 'It depends on scope. You receive a transparent, scoped proposal after a free 30-minute technical discovery call.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Cpu className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'الذكاء الاصطناعي والأتمتة' : 'AI Automation & Integration'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'ذكاء اصطناعي يعمل داخل أعمالك، لا بجانبها.' : 'AI that works inside your business, not next to it.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'نصمم ونبني حلول أتمتة ووكلاء ذكاء اصطناعي وتحليلات تنبؤية، ونربطها بأنظمتك وبياناتك القائمة، بحيث يظهر الأثر في الوقت والتكلفة وجودة القرار.'
              : 'We design and build automation, AI agents and predictive analytics, and connect them to your existing systems and data, so the impact shows up in time, cost and decision quality.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'احجز استشارة 30 دقيقة' : 'Book a 30-minute consultation'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. WHAT WE BUILD (6 Capabilities) */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'ما نقوم ببنائه' : 'WHAT WE BUILD'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'حلول ذكاء اصطناعي مؤسسية متكاملة' : 'Enterprise-Grade Applied AI Capabilities'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#121215] p-7 transition-all duration-300 hover:border-[#e9800a]/50 hover:bg-[#151518]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 text-[#e9800a] mb-5">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2.5">
                    {isAr ? c.titleAr : c.titleEn}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {isAr ? c.descAr : c.descEn}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. WHERE IT HELPS */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'مواضع الأثر' : 'WHERE IT HELPS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              {isAr ? 'ما الذي يمكن أتمتته في مؤسستك؟' : 'What can be automated?'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400">
              {isAr
                ? 'نحدد هدفًا قابلًا للقياس قبل أن نبدأ ونقدّم تقارير دورية بناءً عليه.'
                : 'We set a measurable target before we start and report against it.'}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {whereItHelps.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center text-center p-5 rounded-2xl border border-white/10 bg-[#111114] hover:border-[#e9800a]/40 transition-colors"
              >
                <div className="h-2 w-2 rounded-full bg-[#e9800a] mb-3" />
                <span className="text-xs sm:text-sm font-semibold text-neutral-200">
                  {isAr ? item.ar : item.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DATA PRIVACY AND SECURITY (PDPL) */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'الخصوصية والأمان' : 'DATA PRIVACY & SECURITY'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6 leading-tight">
                {isAr
                  ? 'أمان البيانات وسيادتها في صميم كل خطوة'
                  : 'Data Privacy Engineered for Saudi Sovereignty'}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
                {isAr
                  ? 'نعلم حساسية البيانات المؤسسية. لذلك نصمم الأنظمة لتكون مطابقة لنظام حماية البيانات الشخصية السعودي (PDPL) والضوابط السيبرانية دون أي مساومة على الأمان.'
                  : 'We understand the sensitivity of enterprise data. We engineer systems with strict adherence to Saudi PDPL and cybersecurity controls from the blueprint phase.'}
              </p>
            </div>

            <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {privacyPoints.map((pt, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-[#141418] p-5">
                  <ShieldCheck className="h-5 w-5 text-[#e9800a] mb-3" />
                  <h4 className="text-sm font-bold text-white mb-1.5">
                    {isAr ? pt.titleAr : pt.titleEn}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {isAr ? pt.descAr : pt.descEn}
                  </p>
                </div>
              ))}
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
                    ? 'استراتيجية وطنية للبيانات والذكاء الاصطناعي تقودها سدايا'
                    : 'National Data and AI Strategy Led by SDAIA'}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'تتصدر البيانات والذكاء الاصطناعي أولويات رؤية 2030، ولدى المملكة استراتيجية وطنية للبيانات والذكاء الاصطناعي تقودها سدايا. نساعد مؤسستك على الانتقال من التجارب إلى أنظمة تعمل في الإنتاج، ومراعاة متطلبات حماية البيانات منذ التصميم.'
                    : 'Data and AI are central to Vision 2030, and the Kingdom has a national data and AI strategy led by SDAIA. We help your organization move from pilots to production systems, with data-protection requirements built in from design.'}
                </p>
              </div>

              <Link
                href="/vision-2030"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e9800a]/40 bg-[#e9800a]/10 px-6 py-3.5 text-sm font-bold text-[#e9800a] hover:bg-[#e9800a] hover:text-black transition-all shrink-0"
              >
                <span>{isAr ? 'التفاصيل في صفحة رؤية 2030' : 'More on the Vision 2030 page'}</span>
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ENGAGEMENT MODELS */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'نماذج التعاقد' : 'ENGAGEMENT MODELS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'مرونة تناسب أهدافك ومرحلة نموك' : 'Flexible Collaboration Formats'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementModels.map((m, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-[#121215] p-6 hover:border-[#e9800a]/40 transition-colors">
                <span className="font-mono text-xs text-[#e9800a] font-bold block mb-3">0{idx + 1}</span>
                <h4 className="text-base font-bold text-white mb-2">
                  {isAr ? m.arTitle : m.enTitle}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {isAr ? m.arDesc : m.enDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. RELATED WORK */}
      <section className="py-20 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'أعمال سابقة' : 'RELATED WORK'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isAr ? 'نماذج من أنظمة الذكاء الاصطناعي التي بنيناها' : 'Proven Implementations in Production'}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, idx) => (
              <Link
                key={idx}
                href={`/case-studies`}
                className="group rounded-2xl border border-white/10 bg-[#111114] p-6 hover:border-[#e9800a]/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-[#e9800a] uppercase tracking-wider block mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#e9800a] transition-colors leading-snug mb-4">
                    {isAr ? cs.titleAr : cs.titleEn}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors pt-3 border-t border-white/5">
                  <span>{isAr ? 'قراءة التفاصيل' : 'Read details'}</span>
                  <ArrowIcon className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ */}
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

      {/* 10. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#080808] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr
              ? 'لديك عملية تستهلك وقت فريقك؟ لنرَ ما يمكن أتمتته.'
              : 'Have a process eating your team’s time? Let’s see what can be automated.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'احجز استشارة استكشافية مجانية لمدة 30 دقيقة لنناقش فرص الأتمتة وجدواها التقنية.'
              : 'Book a free 30-minute discovery consultation to explore automation opportunities and technical feasibility.'}
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

      {/* 11. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
