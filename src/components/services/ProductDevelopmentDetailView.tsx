"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Rocket,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ChevronDown,
  Layout,
  Smartphone,
  Workflow,
  Search,
  Users,
  Compass,
  Zap,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function ProductDevelopmentDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whoItsFor = [
    {
      titleAr: 'مؤسسون ومنشآت ناشئة تطلق MVP',
      titleEn: 'Founders and startups launching an MVP',
      descAr: 'تحويل الفكرة إلى منتج جاهز للاستثمار واختبار السوق في 6–10 أسابيع.',
      descEn: 'Turn an initial concept into an investor-ready, market-tested MVP in 6–10 weeks.',
    },
    {
      titleAr: 'مؤسسات تحدّث منتجاتها القديمة',
      titleEn: 'Enterprises modernizing legacy products',
      descAr: 'إعادة بناء الأنظمة القديمة بواجهات حديثة وبنية تحتية عالية التوسع.',
      descEn: 'Replatform legacy monoliths with modern UX and resilient microservices.',
    },
    {
      titleAr: 'شركات SaaS تتوسع في منصاتها',
      titleEn: 'SaaS companies scaling platforms',
      descAr: 'إضافة ميزات متقدمة ودعم تعدد المستأجرين وزيادة سعة المستخدمين.',
      descEn: 'Multi-tenant architecture, advanced features, and high-concurrency throughput.',
    },
    {
      titleAr: 'جهات تبني تطبيقات داخلية',
      titleEn: 'Organizations building internal apps',
      descAr: 'منصات تشغيلية مصممة خصيصًا لفرق العمل لتحسين الإنتاجية وضبط الحوكمة.',
      descEn: 'Custom internal operating systems that streamline team workflow and governance.',
    },
  ];

  const processStages = [
    {
      num: '01',
      titleAr: 'التحقق من الفكرة',
      titleEn: 'Validate',
      descAr: 'نحدد الأهداف ونختبر الافتراضات والجدوى التقنية.',
      descEn: 'Define goals, test core assumptions, and evaluate technical feasibility.',
    },
    {
      num: '02',
      titleAr: 'التخطيط',
      titleEn: 'Plan',
      descAr: 'تحديد النطاق والجدول الزمني ومؤشرات النجاح بدقة.',
      descEn: 'Establish clear scope, delivery timeline, and measurable success metrics.',
    },
    {
      num: '03',
      titleAr: 'التصميم والمعمارية',
      titleEn: 'Design & Architect',
      descAr: 'رسم رحلات المستخدم وتصميم معمارية برمجية قابلة للتوسع.',
      descEn: 'Bilingual user flows, design system prototyping, and scalable system architecture.',
    },
    {
      num: '04',
      titleAr: 'التطوير والتكامل',
      titleEn: 'Build & Integrate',
      descAr: 'تطوير رشيق قائم على دورات سريعة وإصدارات أسبوعية ملموسة.',
      descEn: 'Agile sprint development with tangible weekly releases and system integration.',
    },
    {
      num: '05',
      titleAr: 'الاختبار والتحسين',
      titleEn: 'Test & Optimize',
      descAr: 'ضمان الجودة، اختبارات الأمان، وفحص الأداء واستجابة الواجهات.',
      descEn: 'Automated testing, security compliance checks, and performance optimization.',
    },
    {
      num: '06',
      titleAr: 'الإطلاق والتحسين المستمر',
      titleEn: 'Launch & Improve',
      descAr: 'نشر آمن، مراقبة حية للمستخدمين، وتطوير مستمر للميزات.',
      descEn: 'Seamless production deployment, user monitoring, and iterative enhancements.',
    },
  ];

  const deliverables = [
    {
      ar: 'استراتيجية المنتج والاستكشاف',
      en: 'Product strategy and discovery',
    },
    {
      ar: 'تصميم UI/UX ونماذج تفاعلية',
      en: 'UI/UX design and prototyping',
    },
    {
      ar: 'تطوير MVP سريع وجاهز للسوق',
      en: 'MVP development',
    },
    {
      ar: 'منصات SaaS متعددة المستأجرين',
      en: 'SaaS and multi-tenant platforms',
    },
    {
      ar: 'ضمان الجودة والاختبارات الآلية',
      en: 'Quality assurance and testing',
    },
    {
      ar: 'إدارة دورة حياة المنتج بعد الإطلاق',
      en: 'Product lifecycle management',
    },
  ];

  const engagementModels = [
    {
      arTitle: 'استكشاف المنتج واستشارات',
      enTitle: 'Product Discovery & Consulting',
      arDesc: 'ورش عمل لتدقيق المتطلبات، رسم خارطة الطريق والمعمارية.',
      enDesc: 'Workshops to define technical architecture, roadmap, and user stories.',
    },
    {
      arTitle: 'مشاريع بنطاق ثابت',
      enTitle: 'Fixed-Scope Projects',
      arDesc: 'مخرجات محددة وجدول زمني وميزانية واضحة لإطلاق MVP.',
      enDesc: 'Defined deliverables, fixed schedule, and transparent cost for rapid MVP launch.',
    },
    {
      arTitle: 'فريق منتج مخصص',
      enTitle: 'Dedicated Product Team',
      arDesc: 'فريق هندسي وتصميم متكامل يعمل كشريك طويل الأمد لنشاطك.',
      enDesc: 'Full-stack engineering & design squad acting as your embedded product arm.',
    },
    {
      arTitle: 'تحسين ودعم مستمر',
      enTitle: 'Ongoing Optimization & Support',
      arDesc: 'مراقبة حية، إصلاح الأخطاء، وإضافة ميزات استنادًا لبيانات الاستخدام.',
      enDesc: 'Live analytics, bug triage, and continuous feature iterations post-launch.',
    },
  ];

  const relatedWork = [
    {
      slug: 'high-conversion-fintech-mvp',
      titleAr: 'منصة فنتك عالية التحويل (MVP في 8 أسابيع)',
      titleEn: 'High-Conversion Fintech MVP',
      category: 'FinTech / MVP',
    },
    {
      slug: 'gamified-wellness-portal',
      titleAr: 'بوابة تحليلات اللياقة والصحة التفاعلية',
      titleEn: 'Gamified Wellness Analytics Portal',
      category: 'HealthTech / SaaS',
    },
    {
      slug: 'ai-marketing-intelligence-suite',
      titleAr: 'منظومة الذكاء التسويقي المعتمدة على الذكاء الاصطناعي',
      titleEn: 'AI Marketing Intelligence Suite',
      category: 'AI / Platform',
    },
    {
      slug: 'scalable-saas-logistics',
      titleAr: 'منصة SaaS سحابية للخدمات اللوجستية الفورية',
      titleEn: 'Scalable SaaS for Real-Time Logistics',
      category: 'Logistics / Cloud',
    },
    {
      slug: 'our-products',
      titleAr: 'منتجاتنا الخاصة (ParkKaro & Paylink)',
      titleEn: 'Our In-House Products (ParkKaro, Paylink)',
      category: 'Proprietary IP',
    },
  ];

  const faqs = [
    {
      qAr: 'ماذا يفعل مستشار تطوير المنتجات؟',
      qEn: 'What does a product consultancy do?',
      aAr: 'يساعدك على التخطيط والتصميم والبناء والإطلاق بكفاءة، من التحقق من الفكرة حتى الوصول إلى منتج رقمي قابل للتوسع وجذب الاستثمار.',
      aEn: 'It helps you plan, design, build and launch efficiently, from validating the idea to delivering a scalable digital product.',
    },
    {
      qAr: 'هل تبنون MVP قبل المنتج الكامل؟',
      qEn: 'Can you build an MVP first?',
      aAr: 'نعم، نتخصص في بناء منتجات الحد الأدنى (MVP) لاختبار الفكرة بسرعة في السوق وتقليل المخاطر الرأسمالية والتحقق من تفاعل المستخدمين.',
      aEn: 'Yes. MVPs let you validate fast in the real market, dramatically reducing capital risk and verifying actual user demand.',
    },
    {
      qAr: 'كم يستغرق التنفيذ؟',
      qEn: 'How long does it take?',
      aAr: 'معظم مشاريع الـ MVP تُطلق في غضون 6 إلى 10 أسابيع، بينما تستغرق المنتجات الكاملة متعددة الأنظمة عادة من 3 إلى 6 أشهر.',
      aEn: 'Most MVPs launch in 6–10 weeks; full enterprise-scale products typically take 3–6 months depending on technical scope.',
    },
    {
      qAr: 'هل تطورون منتجًا قائمًا بالفعل؟',
      qEn: 'Can you improve an existing product?',
      aAr: 'نعم، نعمل على إضافة ميزات جديدة، تحسين سرعة الأداء والاستجابة، وتحديث المعمارية التقنية لتتحمل أعداد مستخدمين أكبر.',
      aEn: 'Yes: new features, UX redesign, performance tuning, and architectural upgrades for high-concurrency scale.',
    },
    {
      qAr: 'هل تقدمون دعمًا بعد الإطلاق؟',
      qEn: 'Do you support us after launch?',
      aAr: 'نعم، نوفر مراقبة تشغيلية مستمرة، واستجابة سريعة لأي طارئ، وتطويرًا مستمرًا للمنتج بناءً على مؤشرات الأداء الحقيقية.',
      aEn: 'Yes: 24/7 monitoring, rapid bug fixes, and continuous development sprints based on real user analytics.',
    },
    {
      qAr: 'هل يمكن تخصيص الحل لأهداف عملي؟',
      qEn: 'Can it be tailored to my goals?',
      aAr: 'كل حل نصممه يكون مخصصًا بالكامل بما يتوافق مع نموذج عملك ومستخدميك المستهدفين وميزانيتك المحددة، دون قوالب مسبقة الصنع.',
      aEn: 'Every solution is custom-tailored to your exact business model, target audience, and roadmap with zero off-the-shelf constraints.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-500/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Rocket className="h-4 w-4 text-blue-400" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
              {isAr ? 'تطوير المنتجات الرقمية' : 'PRODUCT DEVELOPMENT'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'من الفكرة إلى منتج حقيقي في أيدي المستخدمين.' : 'From idea to a real product in users’ hands.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'نخطط ونصمم ونبني ونطوّر منتجات رقمية آمنة وقابلة للتوسع، لتكون أصلًا طويل الأمد لنشاطك، لا مجرد نسخة أولى.'
              : 'We plan, design, build and evolve secure, scalable digital products, so they become a long-term asset for your business, not just a first version.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'ناقش فكرة منتجك' : 'Talk through your product idea'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. WHO IT'S FOR */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'لمن نقدّم الخدمة' : 'WHO IT IS FOR'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'مصممة للنمو المؤسسي وريادة الأعمال' : 'Engineered for Builders at Every Stage'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoItsFor.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#121215] p-7 hover:border-blue-500/50 hover:bg-[#15151a] transition-all"
              >
                <div className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 font-mono text-xs font-bold">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5">
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

      {/* 4. OUR PROCESS (6 STAGES) */}
      <section className="py-20 sm:py-28 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'منهجية العمل' : 'OUR PROCESS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'ست مراحل محكمة من المفهوم إلى السوق' : 'Six Disciplined Stages from Concept to Market'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processStages.map((stg) => (
              <div
                key={stg.num}
                className="relative rounded-2xl border border-white/10 bg-[#111114] p-7 hover:border-[#e9800a]/40 transition-colors"
              >
                <span className="font-mono text-xs font-bold text-[#e9800a] bg-black/60 px-2.5 py-1 rounded border border-white/10 inline-block mb-4">
                  {stg.num}
                </span>
                <h3 className="text-lg font-bold text-white mb-2">
                  {isAr ? stg.titleAr : stg.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {isAr ? stg.descAr : stg.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHAT WE DELIVER + TIMELINES */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'المخرجات' : 'WHAT WE DELIVER'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-6">
                {isAr ? 'تسليم منتجات كاملة وجاهزة للاستخدام' : 'Comprehensive Product Capabilities'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {deliverables.map((d, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-[#141418]">
                    <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0" />
                    <span className="text-xs sm:text-sm text-neutral-200 font-medium">
                      {isAr ? d.ar : d.en}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* TIMELINE BOX */}
            <div className="rounded-3xl border border-blue-500/40 bg-gradient-to-b from-blue-950/20 to-[#121215] p-8 sm:p-10 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="h-6 w-6 text-blue-400" />
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-blue-400">
                  {isAr ? 'الجداول الزمنية' : 'REALISTIC TIMELINES'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {isAr
                  ? 'معظم MVPs تُطلق في 6–10 أسابيع؛ والمنتجات الكاملة تستغرق عادة من 3 إلى 6 أشهر.'
                  : 'Most MVPs launch in 6–10 weeks; full products typically take 3–6 months.'}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                {isAr
                  ? 'نعتمد جداول زمنية واقعية نلتزم بها بدقة. نمنحك رؤية أسبوعية للتقدم عبر بيئات تجريبية حية واختبارات مستمرة للمستخدمين.'
                  : 'We commit to verified engineering timelines without unrealistic claims. You get weekly sprint visibility, live staging builds, and continuous validation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECURITY & COMPLIANCE */}
      <section className="py-16 sm:py-20 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 rounded-3xl border border-white/10 bg-[#121215] p-8 sm:p-10">
            <div className="h-14 w-14 rounded-2xl bg-[#e9800a]/10 text-[#e9800a] flex items-center justify-center shrink-0">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-2">
                {isAr ? 'الأمان والامتثال منذ اليوم الأول' : 'Security and Compliance Built In'}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {isAr
                  ? 'نضمّن حماية البيانات والتحكم بالصلاحيات والمعمارية الآمنة في كل مرحلة. نراعي نظام حماية البيانات الشخصية (PDPL) وضوابط الأمن السيبراني ذات الصلة بقطاعك منذ التصميم.'
                  : 'We build data protection, access control and secure architecture into every stage. We design with Saudi PDPL and the cybersecurity controls relevant to your sector in mind from the start.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VISION 2030 ALIGNMENT BOX */}
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
                    ? 'ريادة الأعمال ونمو المنشآت الصغيرة والمتوسطة وتنويع الاقتصاد'
                    : 'Entrepreneurship & SME Growth Driving Economic Diversification'}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'تشجع رؤية 2030 ريادة الأعمال ونمو المنشآت الصغيرة والمتوسطة وتنويع الاقتصاد. نساعد الفرق الطموحة على الانتقال من فكرة إلى منتج قابل للتوسع وجذب الاستثمار.'
                    : 'Vision 2030 encourages entrepreneurship, SME growth and economic diversification. We help ambitious teams go from idea to a product that can scale and attract investment.'}
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

      {/* 8. ENGAGEMENT MODELS */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'خيارات التعاقد' : 'ENGAGEMENT MODELS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'نماذج عمل مرنة تناسب ميزانيتك' : 'Flexible Engagement Models'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementModels.map((m, idx) => (
              <div key={idx} className="rounded-2xl border border-white/10 bg-[#121215] p-6 hover:border-blue-500/40 transition-colors">
                <span className="font-mono text-xs text-blue-400 font-bold block mb-3">0{idx + 1}</span>
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

      {/* 9. RELATED WORK */}
      <section className="py-20 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                {isAr ? 'أعمال سابقة' : 'RELATED WORK'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {isAr ? 'منتجات رقمية أطلقناها في السوق' : 'Products Shipped into the Market'}
              </h2>
            </div>
            <Link
              href="/our-products"
              className="inline-flex items-center gap-2 text-xs font-bold text-[#e9800a] hover:underline"
            >
              <span>{isAr ? 'استكشف منتجاتنا' : 'Explore our products'}</span>
              <ArrowIcon className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedWork.map((cs, idx) => (
              <Link
                key={idx}
                href={cs.slug === 'our-products' ? '/our-products' : '/case-studies'}
                className="group rounded-2xl border border-white/10 bg-[#111114] p-6 hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono text-blue-400 uppercase tracking-wider block mb-2">
                    {cs.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors leading-snug mb-4">
                    {isAr ? cs.titleAr : cs.titleEn}
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 group-hover:text-white transition-colors pt-3 border-t border-white/5">
                  <span>{isAr ? 'التفاصيل' : 'Details'}</span>
                  <ArrowIcon className="h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
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

      {/* 11. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr ? 'عندك فكرة؟ لنحوّلها إلى منتج.' : 'Got an idea? Let’s turn it into a product.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'تحدث مع مهندسينا المعماريين لوضع خطة واضحة لإطلاق منتجك بنطاق محدد وميزانية مدروسة.'
              : 'Talk to our product architects to build a clear scope and timeline for your product launch.'}
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

      {/* 12. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
