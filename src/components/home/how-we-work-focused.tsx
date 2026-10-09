"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '@/lib/i18n';

export const HowWeWorkFocused: React.FC = () => {
  const { locale, direction } = useTranslation();

  const steps = [
    {
      num: '01',
      titleAr: 'اكتشاف',
      titleEn: 'Discover',
      descAr: 'نفهم هدفك وقيودك ونحدد النطاق.',
      descEn: 'We understand your goal and constraints, and define scope.',
    },
    {
      num: '02',
      titleAr: 'تصميم',
      titleEn: 'Design',
      descAr: 'مخطط تقني وتجربة مستخدم تعتمدها قبل البناء.',
      descEn: 'A technical blueprint and UX you approve before we build.',
    },
    {
      num: '03',
      titleAr: 'بناء',
      titleEn: 'Build',
      descAr: 'إصدارات أسبوعية قابلة للتجربة وتواصل مستمر.',
      descEn: 'Weekly testable releases and constant communication.',
    },
    {
      num: '04',
      titleAr: 'إطلاق ودعم',
      titleEn: 'Launch & support',
      descAr: 'نشر آمن، تدريب، وتسليم كامل للكود.',
      descEn: 'Secure deployment, training and full code handover.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-bg border-t border-border overflow-hidden" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-xl space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
            {locale === 'ar' ? 'المنهجية الهندسية' : 'OUR PROCESS'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {locale === 'ar' ? 'كيف نعمل' : 'How we work'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="relative rounded-2xl border border-border bg-surface p-6 space-y-4 hover:border-accent/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent">
                  {step.num}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
              </div>

              <h3 className="text-lg font-bold text-white">
                {locale === 'ar' ? step.titleAr : step.titleEn}
              </h3>

              <p className="text-sm text-fg-muted leading-relaxed font-normal">
                {locale === 'ar' ? step.descAr : step.descEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
