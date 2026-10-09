"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const OurWorkFocused: React.FC = () => {
  const { locale, direction } = useTranslation();

  const projects = [
    {
      serviceTagAr: 'الذكاء الاصطناعي والأتمتة',
      serviceTagEn: 'AI Automation',
      titleAr: 'وكيل ذكاء اصطناعي يعتمد RAG لتحويل الامتثال التنظيمي في التقنية المالية',
      titleEn: 'RAG-Powered AI Agent Transforming Regulatory Fintech Compliance',
      href: '/case-studies',
    },
    {
      serviceTagAr: 'تطوير المنتجات',
      serviceTagEn: 'Product Development',
      titleAr: 'MVP تقني مالي عالي التحويل: محرك استثمار ذاتي',
      titleEn: 'High-Conversion Fintech MVP: Autonomous Investment Engine',
      href: '/case-studies',
    },
    {
      serviceTagAr: 'DevOps وهندسة السحابة',
      serviceTagEn: 'DevOps & Cloud',
      titleAr: 'تحوّل إلى الخدمات المصغرة لتسريع تحديث الأنظمة',
      titleEn: 'Microservices Transformation Accelerating System Modernization',
      href: '/case-studies',
    },
    {
      serviceTagAr: 'تطوير البرمجيات المخصصة',
      serviceTagEn: 'Custom Software',
      titleAr: 'تكامل API يقود أتمتة التأمين على نطاق واسع',
      titleEn: 'API System Integration Driving Insurance Automation at Scale',
      href: '/case-studies',
    },
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-bg border-t border-border overflow-hidden" dir={direction}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
              {locale === 'ar' ? 'سجل الإنجاز' : 'PORTFOLIO'}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              {locale === 'ar' ? 'أعمالنا — أمثلة من مشاريعنا' : 'Our work — selected projects'}
            </h2>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors self-start"
          >
            <span>{locale === 'ar' ? 'عرض كل دراسات الحالة' : 'View all case studies'}</span>
            {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Link>
        </div>

        {/* 4 Selected Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <Link
              key={idx}
              href={proj.href}
              className="group rounded-2xl border border-border bg-surface p-6 sm:p-8 hover:border-accent/50 hover:bg-surface-2 transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
                    {locale === 'ar' ? proj.serviceTagAr : proj.serviceTagEn}
                  </span>
                  <div className="rounded-full bg-white/5 p-2 text-fg-subtle group-hover:text-accent group-hover:bg-accent/10 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-accent transition-colors leading-snug">
                  {locale === 'ar' ? proj.titleAr : proj.titleEn}
                </h3>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-fg-subtle">
                <span>{locale === 'ar' ? 'دراسة حالة موثقة' : 'Verified Case Study'}</span>
                <span className="font-mono text-fg-muted group-hover:text-white transition-colors">
                  {locale === 'ar' ? 'قراءة التفاصيل ←' : 'Read case study →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
