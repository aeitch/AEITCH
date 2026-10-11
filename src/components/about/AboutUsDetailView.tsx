"use client";

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Users,
  Layers,
  Cpu,
  Clock,
  MapPin,
  Quote,
  CheckCircle2,
  Globe2,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

export function AboutUsDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const values = [
    {
      num: '01',
      titleAr: 'منهج «المنتج أولًا»',
      titleEn: 'Product-First',
      descAr: 'نحل مشكلات حقيقية ونقدّم قيمة ملموسة للمستخدم بدل كتابة كود عشوائي.',
      descEn: 'We solve real operational problems and deliver tangible end-user value rather than writing throwaway code.',
    },
    {
      num: '02',
      titleAr: 'قدرة متكاملة',
      titleEn: 'End-to-End Execution',
      descAr: 'من تطوير البرمجيات إلى الأتمتة وDevOps في دورة واحدة مترابطة.',
      descEn: 'Software engineering, applied AI, and automated cloud operations in one unified lifecycle.',
    },
    {
      num: '03',
      titleAr: 'حلول قابلة للتوسع والتركيب',
      titleEn: 'Scalable and Modular',
      descAr: 'أنظمة تنمو مع عملك وتتكامل بسهولة مع أدواتك المؤسسية الحالية.',
      descEn: 'Architectures engineered to grow with your business and integrate smoothly with existing enterprise stacks.',
    },
  ];

  const stages = [
    {
      step: '01',
      titleAr: 'اكتشاف ومواءمة',
      titleEn: 'Discover & Align',
      descAr: 'فهم أهداف النشاط، تحديد الأولويات، ورسم ملامح المشروع.',
      descEn: 'Map business objectives, prioritize constraints, and align core milestones.',
    },
    {
      step: '02',
      titleAr: 'معمارية واستراتيجية',
      titleEn: 'Architect & Strategize',
      descAr: 'تصميم معمارية الأنظمة، تدفقات البيانات، وخطة الأمان والامتثال.',
      descEn: 'Blueprint system architecture, data models, and regulatory compliance paths.',
    },
    {
      step: '03',
      titleAr: 'تنفيذ وهندسة',
      titleEn: 'Execute & Engineer',
      descAr: 'بناء رشيق بإصدارات أسبوعية ملموسة وشفافية مستمرة في التقدم.',
      descEn: 'High-velocity agile sprints with test-driven code and weekly functional shipments.',
    },
    {
      step: '04',
      titleAr: 'اختبار وتحسين وأتمتة',
      titleEn: 'Test, Optimize & Automate',
      descAr: 'اختبارات جودة وأمان وأداء وأتمتة خطوط النشر السحابية.',
      descEn: 'Rigorous automated QA, security vulnerability assessments, and performance profiling.',
    },
    {
      step: '05',
      titleAr: 'نشر ودعم وتطوير',
      titleEn: 'Deploy, Support & Evolve',
      descAr: 'إطلاق آمن، مراقبة مستمرة على مدار الساعة، وتطوير مستمر.',
      descEn: 'Seamless production release, 24/7 active telemetry, and iterative product evolution.',
    },
  ];

  const testimonials = [
    {
      quoteAr: 'إيتش قدمت لنا منظومة تقنية متماسكة ساعدتنا على التوسع بسرعة وموثوقية في منطقة الخليج.',
      quoteEn: 'AEITCH engineered a robust technical foundation that allowed us to scale rapidly and reliably across the Gulf.',
      author: 'Romaisa',
      locationAr: 'دبي، الإمارات العربية المتحدة',
      locationEn: 'Dubai, UAE',
      tagAr: 'المنطقة الإقليمية',
      tagEn: 'Regional Client',
    },
    {
      quoteAr: 'الانضباط الهندسي والشفافية الأسبوعية جعلت عملية إطلاق المنتج تجربة سلسة للغاية.',
      quoteEn: 'The engineering discipline and weekly sprint visibility made launching our product remarkably smooth.',
      author: 'Alexis',
      locationAr: 'المملكة المتحدة',
      locationEn: 'United Kingdom',
      tagAr: 'منصة SaaS',
      tagEn: 'SaaS Platform',
    },
    {
      quoteAr: 'تكامل DevOps والأمان منحنا راحة بال تامة بشأن استقرار خوادمنا وبياناتنا.',
      quoteEn: 'Their DevOps and security integration gave us total peace of mind regarding uptime and data safety.',
      author: 'Kasey',
      locationAr: 'تركيا',
      locationEn: 'Turkey',
      tagAr: 'بنية تحتية',
      tagEn: 'Cloud Infrastructure',
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
            <Sparkles className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'عن إيتش' : 'ABOUT AEITCH'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'من الرؤية إلى التنفيذ. هذا هو أسلوب إيتش.' : 'From vision to execution. The AEITCH way.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'إيتش شركة هندسة تركّز على المنتج، وتتخصص في حلول الذكاء الاصطناعي والأتمتة، وتطوير المنتجات، وDevOps وهندسة السحابة، والبرمجيات المخصصة. نعمل مع الشركات الناشئة والمؤسسات لنحوّل الأفكار الجريئة إلى منتجات رقمية عالية الأداء مبنية للتوسع منذ اليوم الأول، ونرافقها بما يخدم أولويات التحول الرقمي في المملكة.'
              : 'AEITCH is a product-focused engineering company specializing in AI Automation & Integration, Product Development, DevOps & Cloud Engineering, and Custom Software Development. We work with startups and enterprises to turn bold ideas into high-performing digital products built to scale from day one, in step with the Kingdom’s digital-transformation priorities.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <span>{isAr ? 'احجز استشارة' : 'Book a consultation'}</span>
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. WHAT MAKES US DIFFERENT (3 VALUES) — HIGH-CONTRAST LIGHT ARCHITECTURAL CANVAS */}
      <section className="py-24 sm:py-32 bg-[#F5F5F3] text-[#0A0A0A] border-b border-black/10" data-theme="light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block">
              {isAr ? 'قيمنا الهندسية' : 'OUR VALUES'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0A0A0A] tracking-tight">
              {isAr ? 'ما يميز أسلوب عمل إيتش' : 'What Makes Us Different'}
            </h2>
            <p className="text-sm sm:text-base text-[#4A4A4A] max-w-xl mx-auto">
              {isAr
                ? 'ثلاثة مبادئ هندسية صارمة تفصل بين المشاريع التي تنجح والمشاريع التي تتعثر.'
                : 'Three foundational engineering principles separating systems that scale from those that fail.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, idx) => (
              <div
                key={v.num}
                data-cursor-type="explore"
                className="group relative rounded-3xl border border-black/10 bg-white p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-[#e9800a] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-sm font-bold text-[#e9800a] bg-[#e9800a]/10 px-3 py-1 rounded-lg border border-[#e9800a]/20">
                      {v.num}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-black/20 group-hover:bg-[#e9800a] group-hover:scale-125 transition-all" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0A0A0A] mb-3 group-hover:text-[#e9800a] transition-colors">
                    {isAr ? v.titleAr : v.titleEn}
                  </h3>
                  <p className="text-sm text-[#555555] leading-relaxed">
                    {isAr ? v.descAr : v.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW WE WORK (5 STAGES) — DEEP OBSIDIAN CADENCE */}
      <section className="py-24 sm:py-32 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block">
              {isAr ? 'دورة الحياة الهندسية' : 'HOW WE WORK'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {isAr ? 'خمس مراحل محكمة من البداية إلى الاستدامة' : 'Five Structured Delivery Stages'}
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto">
              {isAr
                ? 'انضباط أسبوعي في التسليم يحفظ وقتك ويضمن سلامة البناء المعماري.'
                : 'Disciplined weekly cadences protecting your timeline and ensuring architectural integrity.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stages.map((stg) => (
              <div
                key={stg.step}
                data-cursor-type="explore"
                className="group rounded-2xl border border-white/10 bg-[#111114] p-6 hover:border-[#e9800a]/50 hover:bg-[#16161b] transition-all duration-300"
              >
                <span className="font-mono text-xs font-bold text-[#e9800a] block mb-3">
                  STAGE {stg.step}
                </span>
                <h4 className="text-base font-bold text-white mb-2 group-hover:text-[#e9800a] transition-colors">
                  {isAr ? stg.titleAr : stg.titleEn}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {isAr ? stg.descAr : stg.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHERE WE WORK FROM (Islamabad & Riyadh Alignment + Life at AEITCH Link) — HIGH-CONTRAST ARCHITECTURAL CANVAS */}
      <section className="py-24 sm:py-28 bg-[#FAF9F6] text-[#0A0A0A] border-b border-black/10" data-theme="light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-3xl border border-black/10 bg-white p-8 sm:p-12 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#FAF9F6] px-3.5 py-1 font-mono text-xs text-[#e9800a] font-bold">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{isAr ? 'موقع فريقنا والجدول الزمني' : 'OUR BASE & TIMEZONE'}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0A0A0A] tracking-tight">
                  {isAr ? 'أين نعمل ومن أين نخدمك؟' : 'Where We Work From'}
                </h3>
                <p className="text-sm sm:text-base text-[#4A4A4A] leading-relaxed">
                  {isAr
                    ? 'فريقنا الهندسي في إسلام آباد، ونخدم عملاء في المنطقة والعالم. نعمل بتوقيت باكستان (UTC+5) أي بفارق ساعتين عن الرياض، ما يتيح تداخلًا كاملًا في ساعات العمل وتواصلًا فوريًا باللغتين العربية والإنجليزية.'
                    : 'Our engineering team is in Islamabad, serving clients in the region and worldwide. We work on Pakistan time (UTC+5), two hours ahead of Riyadh, so working hours overlap fully with seamless English and Arabic collaboration.'}
                </p>

                {/* Cultural link to Life at AEITCH */}
                <div className="pt-2">
                  <Link
                    href="/about-us/life-at-aeitch"
                    data-cursor-type="photo"
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#e9800a] hover:text-[#0A0A0A] transition-colors pb-1 border-b border-[#e9800a]/40 hover:border-black"
                  >
                    <span>{isAr ? 'اكتشف ثقافة الفريق في إيتش (الحياة في إيتش) ←' : 'Explore our engineering culture (Life at AEITCH) →'}</span>
                  </Link>
                </div>
              </div>

              <div className="rounded-2xl border border-black/10 bg-[#FAF9F6] p-7 text-center shrink-0 w-full sm:w-auto shadow-inner">
                <div className="font-mono text-4xl font-extrabold text-[#e9800a] mb-1">
                  UTC+5
                </div>
                <div className="text-xs text-[#666666] font-mono mb-3">
                  {isAr ? 'فارق ساعتين عن توقيت الرياض' : '2 Hours Ahead of Riyadh (UTC+3)'}
                </div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{isAr ? 'تداخل كامل لساعات العمل' : 'Full Business Hour Overlap'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-20 sm:py-24 bg-[#080808] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              {isAr ? 'آراء العملاء' : 'TESTIMONIALS'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {isAr ? 'ثقة شركائنا في المنطقة والعالم' : 'Trusted by Leaders in the Region and Worldwide'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-[#111114] p-8 flex flex-col justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <Quote className="h-8 w-8 text-[#e9800a]/40 mb-4" />
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed mb-6 italic">
                    &ldquo;{isAr ? t.quoteAr : t.quoteEn}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{t.author}</div>
                    <div className="text-xs text-neutral-400">{isAr ? t.locationAr : t.locationEn}</div>
                  </div>
                  <span className="text-[11px] font-mono text-[#e9800a] bg-[#e9800a]/10 px-2.5 py-0.5 rounded border border-[#e9800a]/20">
                    {isAr ? t.tagAr : t.tagEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr ? 'لنبنِ ما هو قادم.' : 'Let’s build what’s next.'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
            {isAr
              ? 'احجز استشارة مع فريقنا الهندسي لمناقشة أفكار وتحديات مشروعك الرقمي القادم.'
              : 'Book a consultation with our engineering leadership to review your upcoming digital initiatives.'}
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

      {/* 8. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
