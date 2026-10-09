"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Server,
  Cloud,
  Cpu,
  Rocket,
  Code2,
  FileText,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';

export function Vision2030DetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [checkedItems, setCheckedItems] = useState<{ [key: number]: boolean }>({});

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const priorities = [
    {
      serviceAr: 'الذكاء الاصطناعي والأتمتة',
      serviceEn: 'AI Automation & Integration',
      icon: Cpu,
      priorityAr: 'اقتصاد قائم على البيانات والذكاء الاصطناعي',
      priorityEn: 'A data- and AI-driven economy',
      whatWeDoAr: 'نقل الذكاء الاصطناعي من التجارب إلى الإنتاج، مع تضمين حماية البيانات منذ التصميم.',
      whatWeDoEn: 'Move AI from pilots to production systems, with data protection built in.',
      link: '/services/ai-automation',
    },
    {
      serviceAr: 'تطوير المنتجات',
      serviceEn: 'Product Development',
      icon: Rocket,
      priorityAr: 'ريادة الأعمال ونمو المنشآت الصغيرة والمتوسطة',
      priorityEn: 'Entrepreneurship and SME growth',
      whatWeDoAr: 'نقل الأفكار إلى منتجات رقمية قابلة للتوسع وجذب الاستثمار في 6–10 أسابيع.',
      whatWeDoEn: 'Take ideas to scalable products fast (6–10 weeks) that can scale and attract capital.',
      link: '/services/product-development',
    },
    {
      serviceAr: 'DevOps وهندسة السحابة',
      serviceEn: 'DevOps & Cloud Engineering',
      icon: Cloud,
      priorityAr: 'التحول الرقمي وتبني السحابة',
      priorityEn: 'Digital transformation; cloud adoption',
      whatWeDoAr: 'بنى سحابية موثوقة وآمنة مصممة وفق ضوابط الأمن السيبراني السعودية (NCA CCC-2:2024).',
      whatWeDoEn: 'Reliable, secure cloud foundations designed around Saudi cybersecurity controls.',
      link: '/services/cloud-devops',
    },
    {
      serviceAr: 'البرمجيات المخصصة',
      serviceEn: 'Custom Software Development',
      icon: Code2,
      priorityAr: 'حكومة رقمية ومؤسسات أكثر كفاءة',
      priorityEn: 'Digital government; efficient institutions',
      whatWeDoAr: 'تحديث الأنظمة القديمة وبناء تكاملات برمجية مستدامة دون انقطاع العمليات.',
      whatWeDoEn: 'Modernize legacy systems and build API integrations that stand the test of time.',
      link: '/services/custom-software',
    },
  ];

  const regulations = [
    {
      id: 'pdpl',
      titleAr: '1) نظام حماية البيانات الشخصية (PDPL)',
      titleEn: '1) Personal Data Protection Law (PDPL)',
      authorityAr: 'الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)',
      authorityEn: 'Saudi Data & AI Authority (SDAIA)',
      descAr:
        'صدر نظام حماية البيانات الشخصية بمرسوم ملكي (م/19) عام 2021 وعُدّل عام 2023، ودخل حيز النفاذ في 14 سبتمبر 2023، مع مهلة توفيق أوضاع حتى 14 سبتمبر 2024. تشرف عليه الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا). ينظّم النقل خارج المملكة بضوابط ومعايير بدل المنع المطلق، ويمنح أصحاب البيانات حقوقًا مثل الوصول والتصحيح والإتلاف وسحب الموافقة.',
      descEn:
        'The PDPL was issued by Royal Decree M/19 in 2021, amended in 2023, took effect on 14 September 2023, and had a grace period to 14 September 2024. SDAIA supervises it. It regulates transfers outside the Kingdom under conditions instead of banning them outright, and gives data subjects rights such as access, correction, destruction and withdrawal of consent.',
      whatWeDoAr:
        'ما نقوم به: تدفقات بيانات مصممة بمبدأ «الخصوصية منذ التصميم»، الحد الأدنى من البيانات، تحكم صارم بالصلاحيات، سجلات معالجة موثقة، ودعم مسؤول حماية البيانات (DPO) في جهتك.',
      whatWeDoEn:
        'What we do: privacy-by-design data flows, minimization, access control, documented processing records, and support for your DPO.',
      honestyAr:
        'ملاحظة الشفافية: نظرًا لأن فريقنا الهندسي يعمل من إسلام آباد، فإن أي تعامل مع بيانات شخصية لمقيمين في المملكة يخضع لضوابط النقل عبر الحدود. نتعامل مع ذلك بضوابط تعاقدية وفنية صارمة (بيانات اصطناعية/مجهولة الهوية في بيئات التطوير، بيئات إنتاجية مستضافة داخل المملكة، ووصول محكوم بالموافقات)، ونوضح ذلك بشفافية في أول مكالمة.',
      honestyEn:
        'Transparency note: because our engineering team is outside the Kingdom, any access to personal data of residents is a cross-border matter. We handle it through contracts and technical controls (synthetic/anonymized dev data, in-Kingdom production, access by explicit approval), and we clarify this in our very first call.',
    },
    {
      id: 'nca',
      titleAr: '2) ضوابط الأمن السيبراني لدى الهيئة الوطنية (NCA)',
      titleEn: '2) NCA Cybersecurity Controls (ECC-2:2024 & CCC-2:2024)',
      authorityAr: 'الهيئة الوطنية للأمن السيبراني (NCA)',
      authorityEn: 'National Cybersecurity Authority (NCA)',
      descAr:
        'أصدرت الهيئة الوطنية للأمن السيبراني الضوابط الأساسية للأمن السيبراني (ECC-2:2024) وضوابط الأمن السيبراني للحوسبة السحابية (CCC-2:2024)، وهي تحدّث إصدارات سابقة (ECC-1:2018 وCCC-1:2020). تنطبق على الجهات الحكومية ومشغّلي البنية التحتية الوطنية الحرجة، وكثيرًا ما تنتقل متطلباتها إلى مورّديها عبر العقود.',
      descEn:
        'The NCA publishes the Essential Cybersecurity Controls (ECC-2:2024) and Cloud Cybersecurity Controls (CCC-2:2024), which update earlier versions (ECC-1:2018, CCC-1:2020). They apply to government bodies and critical-infrastructure operators, and requirements often flow to suppliers through contracts.',
      whatWeDoAr:
        'ما نقوم به: معمارية وممارسات تسليم برمجية مصممة لدعم هذه الضوابط؛ نطابق أعمالنا البرمجية مع حزمة الضوابط المحددة في عقدك.',
      whatWeDoEn:
        'What we do: architecture and delivery practices built to support these controls; we map our work directly to the control set named in your contract.',
      honestyAr: 'تحديث معتمد: نلتزم بأحدث إصدارات الضوابط الوطنية ECC-2:2024 وCCC-2:2024.',
      honestyEn: 'Verified update: we strictly reference current controls ECC-2:2024 and CCC-2:2024.',
    },
    {
      id: 'cloud-first',
      titleAr: '3) سياسة «السحابة أولًا»',
      titleEn: '3) Cloud First Policy',
      authorityAr: 'هيئة الاتصالات والفضاء والتقنية (CST) وNCA',
      authorityEn: 'Communications, Space & Technology Commission (CST) & NCA',
      descAr:
        'تدعم المملكة تبني الحوسبة السحابية ضمن ضوابط تنظيمية تشرف عليها هيئة الاتصالات والفضاء والتقنية (CST) والهيئة الوطنية للأمن السيبراني. نساعدك على اختيار المنطقة والمعمارية الأنسب.',
      descEn:
        'The Kingdom promotes cloud adoption within regulatory frameworks overseen by CST and the NCA. We help you choose the right cloud region and architecture.',
      whatWeDoAr: 'ما نقوم به: تصميم وتنفيذ بنى سحابية هجينة ومتعددة داخل المناطق السحابية المعتمدة في المملكة.',
      whatWeDoEn: 'What we do: designing and deploying resilient architectures across in-Kingdom certified cloud regions.',
      honestyAr: 'حياد المزود: نقترح التقنيات التي تخدم استقرارك وتكلفتك دون انحياز لمزود محدد.',
      honestyEn: 'Vendor neutrality: we recommend stacks optimized for your resilience and budget, independent of any cloud provider.',
    },
    {
      id: 'data-ai-strategy',
      titleAr: '4) الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي',
      titleEn: '4) National Strategy for Data & AI',
      authorityAr: 'الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا)',
      authorityEn: 'SDAIA',
      descAr:
        'تقود سدايا الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي التي تهدف إلى جعل المملكة بين الاقتصادات الرائدة في البيانات. نساعد مؤسستك على الاستفادة العملية من الذكاء الاصطناعي بأمان.',
      descEn:
        'SDAIA leads the National Strategy for Data and AI, aiming to place the Kingdom among leading data-driven economies. We help your organization put AI to practical, safe use.',
      whatWeDoAr: 'ما نقوم به: بناء وكلاء أذكياء ومنظومات RAG مؤسسية ونماذج لغوية مخصصة تعمل في الإنتاج بثقة.',
      whatWeDoEn: 'What we do: building production AI agents, enterprise RAG, and domain-adapted LLMs ready for real workloads.',
      honestyAr: 'التحول العملي: التركيز على حالات استخدام ذات أثر وعائد استثماري ملموس بعيدًا عن الوعود التسويقية غير المؤكدة.',
      honestyEn: 'Practical value: focusing on measurable operational ROI rather than ungrounded marketing hype.',
    },
  ];

  const commitments = [
    {
      ar: 'ملكية كاملة للكود والملكية الفكرية لك',
      en: 'You own the code and IP',
      descAr: 'جميع حقوق الملكية الفكرية والشفرة البرمجية تُسلّم وتُنقل لجهتك بالكامل بنسبة 100%.',
      descEn: 'Full intellectual property and 100% repository transfer to your organization.',
    },
    {
      ar: 'لا ارتباط بمزود واحد (No Vendor Lock-in)',
      en: 'No vendor lock-in',
      descAr: 'نبني معمارية مفتوحة ومحمولة باستخدام تقنيات قياسية مثل Docker وKubernetes وTerraform.',
      descEn: 'Open, portable architectures engineered with industry standards (Docker, Kubernetes, Terraform).',
    },
    {
      ar: 'نقل المعرفة لفريقك مع توثيق القرارات المعمارية (ADRs)',
      en: 'Knowledge transfer with documented ADRs',
      descAr: 'توثيق شامل ومفصل لكل قرار معماري وتدريب لمهندسي فريقك لضمان استقلالية الإدارة.',
      descEn: 'Comprehensive architecture decision records (ADRs) and knowledge transfer sessions for your engineers.',
    },
    {
      ar: 'شفافية كاملة في الجداول والتكاليف',
      en: 'Transparent timelines and costs',
      descAr: 'لا تكاليف خفية، والتزام واقعي بمواعيد التسليم وفق خطة عمل واضحة ومحددة.',
      descEn: 'Clear sprint deliverables, transparent estimates, and zero hidden technical surprises.',
    },
    {
      ar: 'اتفاقية سرية (NDA) قبل مناقشة أي تفاصيل عند الطلب',
      en: 'NDA before details, on request',
      descAr: 'نوقّع اتفاقية سرية وعدم إفصاح متبادلة لحماية أفكارك وبياناتك قبل الخوض في التفاصيل الفنية.',
      descEn: 'Mutual non-disclosure agreements signed before reviewing any confidential requirements.',
    },
  ];

  const checklist = [
    {
      ar: 'هل تعرف أين تُخزَّن بياناتك الشخصية وإلى أين تنتقل؟',
      en: 'Do you know where personal data is stored and where it travels?',
    },
    {
      ar: 'هل لديك سجل لعمليات المعالجة وحدّدت أساسًا نظاميًا لكل منها؟',
      en: 'Do you keep processing records and a lawful basis for each?',
    },
    {
      ar: 'هل تحدد متطلبات ECC/CCC عقودك أو جهتك التنظيمية؟',
      en: 'Do your contracts or your regulator reference ECC/CCC?',
    },
    {
      ar: 'هل يمكن نشر تحديث إلى الإنتاج في يوم واحد وبأمان؟',
      en: 'Can you ship an update to production safely in a day?',
    },
    {
      ar: 'هل توجد أنظمة قديمة تعيق مسار التحول الرقمي لديك؟',
      en: 'Do legacy systems block your digital transformation?',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-20 sm:pt-36 sm:pb-24 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#e9800a]/12 rounded-full blur-[160px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/40 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Sparkles className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'رؤية 2030' : 'VISION 2030'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'نهندس الأساس الرقمي لرؤية المملكة.' : 'Engineering the digital foundation for the Kingdom’s vision.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'ثلاثة محاور هي مجتمع حيوي واقتصاد مزدهر ووطن طموح. والتقنية هي المحرك المشترك بينها. هذه صفحتنا لنشرح كيف تخدم خدماتنا الأربع هذه الأولويات، وما الذي نلتزم به وما الذي لا ندّعيه.'
              : 'Three themes (a vibrant society, a thriving economy, an ambitious nation) with technology as the shared engine. This page explains how our four services serve those priorities, what we commit to, and what we don’t claim.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'احجز جلسة استكشافية مجانية' : 'Book a free discovery session'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. SECTION 1: FOUR SERVICES, FOUR PRIORITIES */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'المواءمة الاستراتيجية' : 'STRATEGIC ALIGNMENT'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'أربع خدمات، أربع أولويات وطنية' : 'Four Services, Four National Priorities'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {priorities.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#121215] p-8 sm:p-10 flex flex-col justify-between hover:border-[#e9800a]/50 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/10 text-[#e9800a] border border-[#e9800a]/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {isAr ? 'أولوية 2030' : 'Vision Priority'}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      {isAr ? item.serviceAr : item.serviceEn}
                    </h3>

                    <div className="inline-block rounded-lg bg-[#e9800a]/10 border border-[#e9800a]/20 px-3 py-1 text-xs font-semibold text-[#e9800a] mb-4">
                      {isAr ? item.priorityAr : item.priorityEn}
                    </div>

                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {isAr ? item.whatWeDoAr : item.whatWeDoEn}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-[#e9800a] transition-colors"
                    >
                      <span>{isAr ? 'تفاصيل الخدمة' : 'View service details'}</span>
                      <ArrowIcon className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. SECTION 2: THE RULES WE ENGINEER FOR */}
      <section className="py-20 sm:py-28 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'الأطر التنظيمية' : 'REGULATORY FRAMEWORKS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              {isAr ? 'الأنظمة والضوابط التي نهندس وفقها' : 'The Regulatory Rules We Engineer For'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              {isAr
                ? 'حقائق مستندة إلى المصادر والأنظمة الرسمية المعلنة في المملكة العربية السعودية.'
                : 'Checked against verified public regulatory frameworks across the Kingdom of Saudi Arabia.'}
            </p>
          </div>

          <div className="space-y-8">
            {regulations.map((reg) => (
              <div
                key={reg.id}
                className="rounded-3xl border border-white/10 bg-[#111114] p-8 sm:p-10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {isAr ? reg.titleAr : reg.titleEn}
                  </h3>
                  <span className="inline-block text-xs font-mono text-[#e9800a] bg-[#e9800a]/10 px-3 py-1 rounded-md border border-[#e9800a]/20 shrink-0">
                    {isAr ? reg.authorityAr : reg.authorityEn}
                  </span>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                  {isAr ? reg.descAr : reg.descEn}
                </p>

                <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    <span>{isAr ? 'دورنا الهندسي' : 'What We Do'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {isAr ? reg.whatWeDoAr : reg.whatWeDoEn}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#e9800a]/5 border border-[#e9800a]/20 p-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#e9800a] mb-1.5 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{isAr ? 'ملاحظة الشفافية' : 'Transparency Note'}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {isAr ? reg.honestyAr : reg.honestyEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SECTION 3: COMMITMENTS */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'التزاماتنا' : 'OUR COMMITMENTS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'ما نعدك به في كل مشروع' : 'What We Explicitly Promise'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commitments.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-[#121215] p-7 hover:border-[#e9800a]/40 transition-colors"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e9800a]/10 text-[#e9800a] font-mono text-xs font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                  {isAr ? c.ar : c.en}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {isAr ? c.descAr : c.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SECTION 4: WHAT WE DON'T CLAIM */}
      <section className="py-16 sm:py-20 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/15 bg-[#121215] p-8 sm:p-12 relative overflow-hidden">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {isAr ? 'ما لا ندّعيه (النزاهة والشفافية)' : 'What We Don’t Claim'}
                </h3>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'نحن شركة هندسة برمجيات، لسنا جهة تنظيمية أو مدقّقًا معتمدًا. الامتثال مسؤولية مشتركة بينك وبين مزوّدك. لا ندّعي أي تمثيل حكومي أو شراكة رسمية مع الجهات المذكورة، ولا نذكر شهادات إلا إذا كنا نحملها فعلًا.'
                    : 'We’re a software engineering firm, not a regulator or accredited auditor. Compliance is shared between you and your suppliers. We claim no government representation or official partnership with the bodies mentioned, and we list certifications only if we actually hold them.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION 5: READINESS CHECK */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'تقييم الجاهزية' : 'READINESS CHECK'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
              {isAr ? 'فحص جاهزية التحول الرقمي' : 'Digital Transformation Readiness Checklist'}
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto">
              {isAr
                ? 'خمسة أسئلة جوهرية تحدد موقعك الحالي وتساعدنا في رسم خارطة الطريق الأنسب.'
                : 'Five foundational questions to evaluate your operational readiness.'}
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {checklist.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-[#e9800a] bg-[#e9800a]/10'
                      : 'border-white/10 bg-[#121215] hover:border-white/20'
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-lg border flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                      isChecked ? 'border-[#e9800a] bg-[#e9800a] text-black' : 'border-white/20 bg-black/40'
                    }`}
                  >
                    {isChecked && <CheckCircle2 className="h-4 w-4" />}
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-neutral-200">
                    {idx + 1}. {isAr ? item.ar : item.en}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'ناقش إجاباتك مع مهندس معماري' : 'Walk through your answers with an architect'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#080808] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr
              ? 'هل تخطط لمشروع مرتبط بالتحول الرقمي؟'
              : 'Planning a digital transformation project?'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'احجز جلسة استكشافية مجانية لمناقشة المتطلبات والمعمارية مع أحد مهندسينا المعماريين.'
              : 'Book a free discovery session to review requirements and architecture with one of our principal engineers.'}
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
          >
            <span>{isAr ? 'احجز جلسة استكشافية مجانية' : 'Book a free discovery session'}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
