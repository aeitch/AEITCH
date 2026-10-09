"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, ShieldCheck, KeyRound, BookOpen } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { ConsultationModal } from '@/components/forms/ConsultationModal';

export const Vision2030Focused: React.FC = () => {
  const { locale, direction } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);

  const tracks = [
    {
      serviceAr: '01 الذكاء الاصطناعي والأتمتة',
      serviceEn: '01 AI Automation & Integration',
      themeAr: 'اقتصاد قائم على البيانات والذكاء الاصطناعي',
      themeEn: 'A data- and AI-driven economy',
      offerAr: 'وكلاء وأنظمة تحليل تدعم القرار، مع مراعاة اللغة العربية وخصوصية البيانات',
      offerEn: 'Agents and analytics that support decisions, with Arabic-language and data-privacy needs in mind',
    },
    {
      serviceAr: '02 تطوير المنتجات',
      serviceEn: '02 Product Development',
      themeAr: 'ريادة الأعمال ونمو المنشآت الصغيرة والمتوسطة',
      themeEn: 'Entrepreneurship and SME growth',
      offerAr: 'منتجات MVP ومنصات SaaS تساعد الأفكار على الوصول للسوق بسرعة',
      offerEn: 'MVPs and SaaS platforms that get ideas to market fast',
    },
    {
      serviceAr: '03 DevOps والسحابة',
      serviceEn: '03 DevOps & Cloud',
      themeAr: 'التحول الرقمي وسياسة «السحابة أولًا»',
      themeEn: 'Digital transformation and "Cloud First"',
      offerAr: 'بنية سحابية موثوقة وآمنة ومصممة وفق متطلبات حماية البيانات والأمن السيبراني في المملكة',
      offerEn: 'Reliable, secure cloud infrastructure designed around Saudi data-protection and cybersecurity requirements',
    },
    {
      serviceAr: '04 البرمجيات المخصصة',
      serviceEn: '04 Custom Software',
      themeAr: 'حكومة رقمية ومؤسسات أكثر كفاءة',
      themeEn: 'Digital government and efficient institutions',
      offerAr: 'تحديث الأنظمة القديمة وبناء تطبيقات مؤسسية وتكاملات موثوقة',
      offerEn: 'Legacy modernization, enterprise applications and dependable integrations',
    },
  ];

  const commitments = [
    {
      icon: <ShieldCheck className="h-5 w-5 text-accent" />,
      titleAr: 'بيانات تحت سيطرتك',
      titleEn: 'Data under your control',
      descAr: 'نصمم وفق نظام حماية البيانات الشخصية (PDPL) وضوابط الهيئة الوطنية للأمن السيبراني، ونناقش متطلبات إقامة البيانات في أول جلسة.',
      descEn: 'We design with Saudi PDPL and NCA cybersecurity controls in mind, and we discuss data-residency needs in the first session.',
    },
    {
      icon: <KeyRound className="h-5 w-5 text-accent" />,
      titleAr: 'ملكية كاملة للكود',
      titleEn: 'Full code ownership',
      descAr: 'تحصل على الشيفرة المصدرية وملكيتها الفكرية بالكامل.',
      descEn: 'You receive the source code and the IP outright.',
    },
    {
      icon: <BookOpen className="h-5 w-5 text-accent" />,
      titleAr: 'نقل المعرفة',
      titleEn: 'Knowledge transfer',
      descAr: 'نعمل مع فريقك ونوثّق القرارات لتبقى مستقلًا تقنيًا.',
      descEn: 'We work alongside your team and document decisions so you stay technically independent.',
    },
  ];

  return (
    <section id="vision-2030" className="relative py-24 sm:py-32 bg-bg border-t border-border overflow-hidden" dir={direction}>
      {/* Subtle National Accent Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-mono font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{locale === 'ar' ? 'رؤية 2030' : 'Vision 2030'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {locale === 'ar'
              ? 'نهندس ما تحتاجه المملكة لتحقيق رؤيتها الرقمية.'
              : 'We engineer what the Kingdom needs to deliver its digital vision.'}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-fg-muted leading-relaxed font-normal">
            {locale === 'ar'
              ? 'تقوم رؤية السعودية 2030 على اقتصاد متنوع ومجتمع حيوي ووطن طموح، والتقنية هي المحرك الأساسي لكل ذلك. نضع خدماتنا الأربع في خدمة هذه الأولويات: ذكاء اصطناعي يرفع الإنتاجية، ومنتجات رقمية تدعم ريادة الأعمال، وبنية سحابية آمنة، وأنظمة مؤسسية حديثة.'
              : 'Saudi Vision 2030 rests on a diversified economy, a vibrant society and an ambitious nation, and technology is the engine behind all three. Our four services serve those priorities: AI that lifts productivity, products that support entrepreneurship, secure cloud infrastructure and modern enterprise systems.'}
          </p>
        </div>

        {/* Four Tracks (Editorial Table/Row Layout) */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-2xl">
          {/* Table Header (Desktop) */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-border bg-white/[0.02] text-xs font-mono uppercase tracking-wider text-fg-subtle">
            <div className="col-span-3">{locale === 'ar' ? 'الخدمة' : 'Service'}</div>
            <div className="col-span-4">{locale === 'ar' ? 'محور رؤية 2030' : 'Vision 2030 Theme'}</div>
            <div className="col-span-5">{locale === 'ar' ? 'ماذا نقدم' : 'What We Offer'}</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {tracks.map((track, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 p-5 sm:p-6 transition-colors hover:bg-white/[0.02]"
              >
                {/* Service Tag */}
                <div className="md:col-span-3 font-mono text-sm font-bold text-accent">
                  {locale === 'ar' ? track.serviceAr : track.serviceEn}
                </div>

                {/* Theme */}
                <div className="md:col-span-4 text-sm font-semibold text-white">
                  <span className="md:hidden text-xs text-fg-subtle block font-mono mb-1">
                    {locale === 'ar' ? 'المحور:' : 'Theme:'}
                  </span>
                  {locale === 'ar' ? track.themeAr : track.themeEn}
                </div>

                {/* Offer */}
                <div className="md:col-span-5 text-sm text-fg-muted leading-relaxed">
                  <span className="md:hidden text-xs text-fg-subtle block font-mono mb-1">
                    {locale === 'ar' ? 'ماذا نقدم:' : 'Offer:'}
                  </span>
                  {locale === 'ar' ? track.offerAr : track.offerEn}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commitments: Three Short Points */}
        <div className="space-y-6">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-accent">
            {locale === 'ar' ? 'التزاماتنا الهندسية' : 'OUR COMMITMENTS'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {commitments.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-surface p-6 space-y-3 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-surface-2 p-2 border border-border">
                    {c.icon}
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {locale === 'ar' ? c.titleAr : c.titleEn}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed">
                  {locale === 'ar' ? c.descAr : c.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA & Disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-border/80">
          <button
            onClick={() => {
              setModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm self-start"
          >
            <span>{locale === 'ar' ? 'ناقش مشروعك المرتبط برؤية 2030' : 'Discuss your Vision 2030 project'}</span>
            {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>

          <p className="text-xs text-fg-subtle max-w-md leading-relaxed">
            {locale === 'ar'
              ? 'إيتش شركة خاصة مستقلة، ولا تدّعي أي تمثيل حكومي أو شراكة رسمية مع الجهات المذكورة.'
              : 'AEITCH is an independent private company and does not claim government representation or official partnership with the bodies mentioned.'}
          </p>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultService="vision-2030"
      />
    </section>
  );
};
