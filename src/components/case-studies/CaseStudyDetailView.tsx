"use client";

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Building,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Rocket,
  Cloud,
  Code2,
  Sparkles,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { CaseStudyData } from '@/lib/case-studies-data';
import { TrustBadges } from '@/components/common/trust-badges';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

interface CaseStudyDetailViewProps {
  study: CaseStudyData;
}

export function CaseStudyDetailView({ study }: CaseStudyDetailViewProps) {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;
  const BackIcon = isAr ? ArrowRight : ArrowLeft;

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'ai-automation':
        return {
          icon: Cpu,
          badgeAr: 'الذكاء الاصطناعي والأتمتة',
          badgeEn: 'AI Automation & Integration',
          link: '/services/ai-automation',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
        };
      case 'product-development':
        return {
          icon: Rocket,
          badgeAr: 'تطوير المنتجات',
          badgeEn: 'Product Development',
          link: '/services/product-development',
          color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
        };
      case 'cloud-devops':
        return {
          icon: Cloud,
          badgeAr: 'DevOps وهندسة السحابة',
          badgeEn: 'DevOps & Cloud Engineering',
          link: '/services/cloud-devops',
          color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
        };
      case 'custom-software':
        return {
          icon: Code2,
          badgeAr: 'البرمجيات المخصصة',
          badgeEn: 'Custom Software Development',
          link: '/services/custom-software',
          color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
        };
      default:
        return {
          icon: Sparkles,
          badgeAr: 'هندسة رقمية',
          badgeEn: 'Digital Engineering',
          link: '/services',
          color: 'text-neutral-400 bg-white/5 border-white/10',
        };
    }
  };

  const badge = getCategoryBadge(study.serviceCategory);
  const BadgeIcon = badge.icon;

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO HEADER */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-400 hover:text-[#e9800a] transition-colors mb-8"
          >
            <BackIcon className="h-4 w-4" />
            <span>{isAr ? 'العودة لجميع دراسات الحالة' : 'Back to All Case Studies'}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link
              href={badge.link}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border ${badge.color} hover:opacity-80 transition-opacity`}
            >
              <BadgeIcon className="h-3.5 w-3.5 shrink-0" />
              <span>{isAr ? badge.badgeAr : badge.badgeEn}</span>
            </Link>

            <span className="flex items-center gap-1 text-xs font-mono text-neutral-400 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
              <span>{isAr ? study.durationAr : study.durationEn}</span>
            </span>

            <span className="flex items-center gap-1 text-xs font-mono text-neutral-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              <Building className="h-3.5 w-3.5 text-neutral-400" />
              <span className="text-white font-semibold">{study.clientName}</span>
              <span>•</span>
              <span>{isAr ? study.clientIndustryAr : study.clientIndustryEn}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? study.titleAr : study.titleEn}
          </h1>

          {/* Results summary tags */}
          {study.results && study.results.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-2xl">
              {study.results.map((r, rIdx) => (
                <div key={rIdx} className="rounded-xl border border-white/10 bg-[#121215] p-3.5">
                  <div className="text-lg sm:text-2xl font-mono font-extrabold text-[#e9800a] mb-0.5">
                    {r.metric}
                  </div>
                  <div className="text-xs text-neutral-400 font-medium">
                    {isAr ? r.labelAr : r.labelEn}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. CASE STUDY BODY (CHALLENGE / APPROACH / OUTCOME) */}
      <section className="py-20 sm:py-24 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* CHALLENGE */}
          <div className="rounded-3xl border border-white/10 bg-[#121215] p-8 sm:p-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-3">
              {isAr ? 'التحدي التشغيلي' : 'THE CHALLENGE'}
            </span>
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
              {isAr ? study.challengeAr : study.challengeEn}
            </p>
          </div>

          {/* APPROACH */}
          <div className="rounded-3xl border border-white/10 bg-[#121215] p-8 sm:p-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-3">
              {isAr ? 'المنهجية والمعمارية الهندسية' : 'THE ENGINEERING APPROACH'}
            </span>
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed">
              {isAr ? study.approachAr : study.approachEn}
            </p>
          </div>

          {/* OUTCOME */}
          <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-emerald-950/15 to-[#121215] p-8 sm:p-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
              {isAr ? 'النتائج المحققة' : 'THE DOCUMENTED OUTCOME'}
            </span>
            <p className="text-base sm:text-lg text-neutral-100 leading-relaxed">
              {isAr ? study.outcomeAr : study.outcomeEn}
            </p>
          </div>

          {/* SAUDI CONTEXT NOTE (WHEN AVAILABLE) */}
          {(study.saudiContextAr || study.saudiContextEn) && (
            <div className="rounded-2xl border border-[#e9800a]/30 bg-[#e9800a]/5 p-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] mb-2">
                <ShieldCheck className="h-4 w-4" />
                <span>{isAr ? 'ملاحظة الأثر في السوق السعودي' : 'Saudi Enterprise Relevance'}</span>
              </div>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {isAr ? study.saudiContextAr : study.saudiContextEn}
              </p>
            </div>
          )}

          {/* TECH STACK & WEBSITE */}
          <div className="rounded-2xl border border-white/10 bg-[#111114] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-2">
                {isAr ? 'التقنيات المستخدمة' : 'TECH STACK'}
              </span>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((t, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-black/60 border border-white/10 px-3 py-1 font-mono text-xs text-white"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {study.websiteUrl && (
              <a
                href={study.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:border-[#e9800a] hover:text-[#e9800a] transition-colors shrink-0"
              >
                <span>{isAr ? 'زيارة موقع العميل' : 'Visit Website'}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4. FOOTER CTA */}
      <section className="py-20 sm:py-24 bg-[#080808] text-center">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            {isAr ? 'هل لديك تحدٍّ مشابه؟' : 'Facing a similar challenge?'}
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mb-8 max-w-xl mx-auto">
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
