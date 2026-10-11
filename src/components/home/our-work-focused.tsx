"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowUpRight, ShieldCheck, Sparkles, Activity, Layers } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const OurWorkFocused: React.FC = () => {
  const { locale, direction } = useTranslation();

  const projects = [
    {
      num: '01',
      serviceTagAr: 'الذكاء الاصطناعي والأتمتة',
      serviceTagEn: 'AI Automation & Integration',
      titleAr: 'وكيل ذكاء اصطناعي يعتمد RAG لتحويل الامتثال التنظيمي في التقنية المالية',
      titleEn: 'RAG-Powered AI Agent Transforming Regulatory Fintech Compliance',
      metricAr: '100% امتثال آلي للسياسات المالية',
      metricEn: '100% automated regulatory rule compliance',
      tags: ['RAG', 'Vector DB', 'FastAPI', 'Private LLM'],
      href: '/case-studies',
    },
    {
      num: '02',
      serviceTagAr: 'تطوير المنتجات',
      serviceTagEn: 'Product Development',
      titleAr: 'MVP تقني مالي عالي التحويل: محرك استثمار ومحفظة ذاتية',
      titleEn: 'High-Conversion Fintech MVP: Autonomous Investment Engine',
      metricAr: 'إطلاق أولي في 6 أسابيع',
      metricEn: 'Live production release in 6 weeks',
      tags: ['Next.js', 'TypeScript', 'Tailwind', 'Realtime APIs'],
      href: '/case-studies',
    },
    {
      num: '03',
      serviceTagAr: 'DevOps وهندسة السحابة',
      serviceTagEn: 'DevOps & Cloud Engineering',
      titleAr: 'تحوّل إلى الخدمات المصغرة لتسريع تحديث الأنظمة',
      titleEn: 'Microservices Transformation Accelerating System Modernization',
      metricAr: '99.99% جاهزية تشغيلية',
      metricEn: '99.99% SLA production uptime',
      tags: ['Kubernetes', 'Terraform', 'AWS ECS', 'ArgoCD'],
      href: '/case-studies',
    },
    {
      num: '04',
      serviceTagAr: 'تطوير البرمجيات المخصصة',
      serviceTagEn: 'Custom Software Development',
      titleAr: 'تكامل API يقود أتمتة التأمين على نطاق واسع',
      titleEn: 'API System Integration Driving Insurance Automation at Scale',
      metricAr: 'معالجة فورية لملايين السجلات',
      metricEn: 'Instant processing for millions of transactions',
      tags: ['PostgreSQL', 'Go / Node.js', 'gRPC', 'Distributed Queue'],
      href: '/case-studies',
    },
  ];

  return (
    <section id="work" className="relative py-24 sm:py-32 bg-bg border-t border-border overflow-hidden" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute top-1/3 end-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
                {locale === 'ar' ? 'سجل الإنجاز' : 'SELECTED PORTFOLIO'}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {locale === 'ar' ? 'أعمالنا — أمثلة من مشاريعنا' : 'Our work — selected projects'}
            </h2>
          </div>

          <Link
            href="/case-studies"
            data-cursor-type="explore"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors self-start pb-1 border-b border-accent/30 hover:border-accent"
          >
            <span>{locale === 'ar' ? 'عرض كل دراسات الحالة' : 'View all case studies'}</span>
            <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
              {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </span>
          </Link>
        </div>

        {/* Selected Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((proj, idx) => (
            <motion.div
              key={proj.num}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6 }}
              className="h-full"
            >
              <Link
                href={proj.href}
                data-cursor-type="photo"
                className="group relative h-full flex flex-col justify-between rounded-2xl border border-border bg-surface p-7 sm:p-9 hover:border-accent/50 hover:bg-surface-2 transition-all duration-300 shadow-sm hover:shadow-glow-sm overflow-hidden"
              >
                {/* Decorative Subtle Background Circuit */}
                <div className="pointer-events-none absolute -bottom-10 -end-10 w-44 h-44 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors" />

                <div className="space-y-6">
                  {/* Top Meta Line */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20">
                        {proj.num}
                      </span>
                      <span className="font-mono text-[11px] font-semibold text-fg-muted uppercase tracking-wider">
                        {locale === 'ar' ? proj.serviceTagAr : proj.serviceTagEn}
                      </span>
                    </div>
                    <div className="rounded-full bg-white/5 p-2 text-fg-subtle group-hover:text-black group-hover:bg-accent group-hover:rotate-45 transition-all duration-300">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent transition-colors leading-snug">
                    {locale === 'ar' ? proj.titleAr : proj.titleEn}
                  </h3>

                  {/* Highlight Metric */}
                  <div className="inline-flex items-center gap-2 rounded-lg bg-white/[0.03] border border-white/10 px-3 py-1.5 text-xs font-mono text-fg-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span>{locale === 'ar' ? proj.metricAr : proj.metricEn}</span>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-surface border border-white/5 px-2 py-0.5 font-mono text-[10px] text-fg-subtle group-hover:border-accent/20 group-hover:text-fg-muted transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-6 mt-8 border-t border-white/5 flex items-center justify-between text-xs text-fg-subtle group-hover:text-fg-muted transition-colors">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-accent" />
                    <span>{locale === 'ar' ? 'دراسة حالة هندسية موثقة' : 'Verified Engineering Study'}</span>
                  </span>
                  <span className="font-mono font-medium text-accent inline-flex items-center gap-1">
                    <span>{locale === 'ar' ? 'قراءة التفاصيل' : 'Read study'}</span>
                    <span className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

