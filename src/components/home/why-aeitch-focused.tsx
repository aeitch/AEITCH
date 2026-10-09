"use client";

import React from 'react';
import { useTranslation } from '@/lib/i18n';

export const WhyAeitchFocused: React.FC = () => {
  const { locale, direction } = useTranslation();

  const points = [
    {
      num: '01',
      titleAr: 'مهندسون senior فقط',
      textAr: 'من يتحدث معك هو من يبني.',
      titleEn: 'Senior engineers only',
      textEn: 'The people who talk to you are the people who build.',
    },
    {
      num: '02',
      titleAr: 'تركيز على أربع خدمات',
      textAr: 'عمق بدل التشتت.',
      titleEn: 'Four services, done deeply',
      textEn: 'Depth over sprawl.',
    },
    {
      num: '03',
      titleAr: 'تعاقد مرن',
      textAr: 'مشروع محدد أو فريق مخصص.',
      titleEn: 'Flexible engagement',
      textEn: 'A defined project or a dedicated team.',
    },
    {
      num: '04',
      titleAr: 'عملية واضحة',
      textAr: 'تسليمات أسبوعية دون مفاجآت.',
      titleEn: 'A clear process',
      textEn: 'Weekly deliveries, no surprises.',
    },
  ];

  return (
    <section className="relative py-20 sm:py-28 bg-bg border-t border-border overflow-hidden" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-xl space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
            {locale === 'ar' ? 'القيمة الهندسية' : 'WHY US'}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {locale === 'ar' ? 'لماذا إيتش؟' : 'Why AEITCH'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p) => (
            <div
              key={p.num}
              className="rounded-2xl border border-border bg-surface p-6 space-y-3 hover:border-accent/40 transition-colors"
            >
              <span className="font-mono text-xs font-bold text-accent">
                {p.num}
              </span>
              <h3 className="text-base font-bold text-white">
                {locale === 'ar' ? p.titleAr : p.titleEn}
              </h3>
              <p className="text-sm text-fg-muted leading-relaxed font-normal">
                {locale === 'ar' ? p.textAr : p.textEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
