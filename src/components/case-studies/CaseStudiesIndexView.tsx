"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Cpu,
  Rocket,
  Cloud,
  Code2,
  Clock,
  Building,
  CheckCircle2,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { CANONICAL_CASE_STUDIES, CaseStudyData } from '@/lib/case-studies-data';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

type FilterType = 'all' | 'ai-automation' | 'product-development' | 'cloud-devops' | 'custom-software';

export function CaseStudiesIndexView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const filterButtons = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'ai-automation', labelAr: 'الذكاء الاصطناعي والأتمتة (5)', labelEn: 'AI Automation & Integration (5)' },
    { id: 'product-development', labelAr: 'تطوير المنتجات (3)', labelEn: 'Product Development (3)' },
    { id: 'cloud-devops', labelAr: 'DevOps والسحابة (2)', labelEn: 'DevOps & Cloud (2)' },
    { id: 'custom-software', labelAr: 'البرمجيات المخصصة (2)', labelEn: 'Custom Software (2)' },
  ];

  const filteredStudies =
    activeFilter === 'all'
      ? CANONICAL_CASE_STUDIES
      : CANONICAL_CASE_STUDIES.filter((cs) => cs.serviceCategory === activeFilter);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'ai-automation':
        return {
          icon: Cpu,
          badgeAr: 'الذكاء الاصطناعي والأتمتة',
          badgeEn: 'AI Automation',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        };
      case 'product-development':
        return {
          icon: Rocket,
          badgeAr: 'تطوير المنتجات',
          badgeEn: 'Product Development',
          color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        };
      case 'cloud-devops':
        return {
          icon: Cloud,
          badgeAr: 'DevOps والسحابة',
          badgeEn: 'DevOps & Cloud',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        };
      case 'custom-software':
        return {
          icon: Code2,
          badgeAr: 'البرمجيات المخصصة',
          badgeEn: 'Custom Software',
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        };
      default:
        return {
          icon: Sparkles,
          badgeAr: 'هندسة رقمية',
          badgeEn: 'Engineering',
          color: 'text-neutral-400 bg-white/5 border-white/10',
        };
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Sparkles className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'أعمالنا الهندسية' : 'OUR PORTFOLIO'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'هندسة مثبتة. نتائج موثقة.' : 'Proven engineering. Documented results.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-10">
            {isAr
              ? 'مشاريع حقيقية على مدى أسابيع وأشهر، مرتبة حسب الخدمة.'
              : 'Real projects delivered over weeks and months, sorted by service.'}
          </p>

          {/* FILTER BUTTONS */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {filterButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setActiveFilter(btn.id as FilterType)}
                className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeFilter === btn.id
                    ? 'bg-[#e9800a] text-black shadow-glow-sm'
                    : 'bg-[#121215] text-neutral-300 border border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                {isAr ? btn.labelAr : btn.labelEn}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. CASE STUDIES GRID (12 CANONICAL STUDIES) */}
      <section className="py-20 sm:py-28 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((cs) => {
              const badge = getCategoryBadge(cs.serviceCategory);
              const BadgeIcon = badge.icon;

              return (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="group rounded-3xl border border-white/10 bg-[#121215] p-7 sm:p-8 flex flex-col justify-between hover:border-[#e9800a]/50 hover:bg-[#141418] transition-all duration-300 hover:scale-[1.01] hover:shadow-2xl"
                >
                  <div>
                    {/* Header: Service Category & Duration */}
                    <div className="flex items-center justify-between gap-3 mb-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${badge.color}`}>
                        <BadgeIcon className="h-3.5 w-3.5 shrink-0" />
                        <span>{isAr ? badge.badgeAr : badge.badgeEn}</span>
                      </span>

                      <span className="flex items-center gap-1 text-xs font-mono text-neutral-400">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{isAr ? cs.durationAr : cs.durationEn}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#e9800a] transition-colors leading-snug mb-3">
                      {isAr ? cs.titleAr : cs.titleEn}
                    </h3>

                    {/* Client & Industry */}
                    <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4">
                      <Building className="h-3.5 w-3.5 text-[#e9800a]" />
                      <span className="text-white font-medium">{cs.clientName}</span>
                      <span>•</span>
                      <span>{isAr ? cs.clientIndustryAr : cs.clientIndustryEn}</span>
                    </div>

                    {/* Approach snippet */}
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6 line-clamp-3">
                      {isAr ? cs.approachAr : cs.approachEn}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {cs.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-white/5 border border-white/5 px-2 py-0.5 text-[11px] font-mono text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#e9800a] transition-colors">
                    <span>{isAr ? 'عرض دراسة الحالة كاملة' : 'Read Full Case Study'}</span>
                    <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. FOOTER BANNER STRIP */}
      <section className="py-16 sm:py-20 bg-[#080808] border-b border-white/10 text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            {isAr ? 'هل لديك تحدٍّ مشابه في مشروعك؟' : 'Facing a similar engineering challenge?'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8">
            {isAr
              ? 'احجز استشارة تقنية مجانية لمراجعة متطلباتك مع أحد كبار مهندسينا المعماريين.'
              : 'Book a free technical consultation with one of our principal architects to review your requirements.'}
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
          >
            <span>{isAr ? 'احجز استشارة مجانية' : 'Book a free consultation'}</span>
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* 5. VISION 2030 STRIP */}
      <Vision2030Strip />
    </div>
  );
}
