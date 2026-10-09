"use client";

import React from 'react';
import Link from 'next/link';
import {
  Clock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Share2
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { InsightArticle, INSIGHTS_ARTICLES } from '@/lib/insights-data';

interface InsightDetailViewProps {
  article: InsightArticle;
}

export function InsightDetailView({ article }: InsightDetailViewProps) {
  const { direction, locale } = useTranslation();

  const title = locale === 'ar' ? article.title.ar : article.title.en;
  const excerpt = locale === 'ar' ? article.excerpt.ar : article.excerpt.en;
  const category = locale === 'ar' ? article.category.ar : article.category.en;
  const readTime = locale === 'ar' ? article.readTime.ar : article.readTime.en;
  const date = locale === 'ar' ? article.date.ar : article.date.en;
  const takeaway = locale === 'ar' ? article.takeaway.ar : article.takeaway.en;
  const relatedServiceName = locale === 'ar' ? article.relatedService.nameAr : article.relatedService.nameEn;

  // Find previous and next articles
  const currentIndex = INSIGHTS_ARTICLES.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? INSIGHTS_ARTICLES[currentIndex - 1] : null;
  const nextArticle = currentIndex < INSIGHTS_ARTICLES.length - 1 ? INSIGHTS_ARTICLES[currentIndex + 1] : null;

  return (
    <article className="min-h-screen bg-bg text-fg py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-8">
          <Link href="/" className="hover:underline">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/insights" className="hover:underline">
            {locale === 'ar' ? 'المدونة الهندسية' : 'Insights'}
          </Link>
          <span>/</span>
          <span className="text-fg-subtle truncate max-w-xs">{category}</span>
        </div>

        {/* Article Meta Header */}
        <header className="mb-10 pb-8 border-b border-border">
          <div className="flex flex-wrap items-center gap-3 text-xs mb-4">
            <span className="rounded-md border border-border bg-bg-elevated px-3 py-1 font-mono text-accent font-medium">
              {category}
            </span>
            <div className="flex items-center gap-1.5 text-fg-subtle">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>{readTime}</span>
            </div>
            <span className="text-fg-subtle">•</span>
            <div className="flex items-center gap-1.5 text-fg-subtle">
              <Calendar className="h-3.5 w-3.5 text-accent" />
              <span>{date}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-fg tracking-tight leading-tight mb-6">
            {title}
          </h1>

          <p className="text-lg sm:text-xl text-fg-muted leading-relaxed font-normal">
            {excerpt}
          </p>
        </header>

        {/* Executive Takeaway Box (Required Format: Clear takeaway box at the top) */}
        <div className="mb-12 rounded-2xl border-2 border-accent/40 bg-gradient-to-br from-accent/10 via-surface to-surface p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 text-accent font-mono text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="h-4 w-4" />
            <span>{locale === 'ar' ? 'الخلاصة التنفيذية (Executive Takeaway)' : 'Executive Takeaway'}</span>
          </div>
          <p className="text-base sm:text-lg text-fg font-medium leading-relaxed">
            {takeaway}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="space-y-12 text-fg-muted leading-relaxed">
          {article.sections.map((section, idx) => {
            const heading = locale === 'ar' ? section.headingAr : section.headingEn;
            const paragraphs = locale === 'ar' ? section.paragraphsAr : section.paragraphsEn;
            const bulletPoints = locale === 'ar' ? section.bulletPointsAr : section.bulletPointsEn;
            const callout = locale === 'ar' ? section.calloutAr : section.calloutEn;

            return (
              <section key={idx} className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-fg tracking-tight pt-2 border-t border-border/40">
                  {heading}
                </h2>

                {paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-base sm:text-lg leading-relaxed whitespace-pre-line text-fg/85">
                    {p}
                  </p>
                ))}

                {bulletPoints && bulletPoints.length > 0 && (
                  <ul className="my-6 space-y-2.5 rounded-xl border border-border bg-surface/50 p-5">
                    {bulletPoints.map((bp, bpIdx) => (
                      <li key={bpIdx} className="flex items-start gap-3 text-sm sm:text-base text-fg/90">
                        <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-1" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {callout && (
                  <div className="my-6 rounded-xl border-s-4 border-accent bg-accent/10 p-5 text-sm sm:text-base text-fg leading-relaxed">
                    <div className="font-bold text-accent mb-1 font-mono text-xs">
                      {locale === 'ar' ? 'ملاحظة معمارية حاسمة:' : 'Key Architectural Principle:'}
                    </div>
                    <div>{callout}</div>
                  </div>
                )}
              </section>
            );
          })}
        </div>

        {/* Related Service Box (Required: One 'Related service' link) */}
        <div className="mt-16 rounded-2xl border border-border bg-surface p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-accent">
              <Layers className="h-3.5 w-3.5" />
              <span>{locale === 'ar' ? 'الخدمة المرتبطة بهذا التحليل' : 'Related Engineering Service'}</span>
            </div>
            <h3 className="text-xl font-bold text-fg">
              {relatedServiceName}
            </h3>
            <p className="text-xs sm:text-sm text-fg-muted max-w-xl">
              {locale === 'ar'
                ? 'استكشف قدراتنا الهندسية، معايير الأمان، وأطر التسليم المصممة لبيئة العمل في المملكة العربية السعودية.'
                : 'Explore our full capabilities, compliance baselines, and sprint delivery frameworks designed for GCC enterprises.'}
            </p>
          </div>

          <Link
            href={article.relatedService.href}
            className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-xs font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
          >
            <span>{locale === 'ar' ? 'استكشف تفاصيل الخدمة' : 'Explore Service'}</span>
            {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Link>
        </div>

        {/* Soft CTA Box (Required: One soft CTA) */}
        <div className="mt-8 rounded-2xl border border-accent/30 bg-gradient-to-br from-surface to-accent/5 p-6 sm:p-8 text-center shadow-xl">
          <h3 className="text-xl sm:text-2xl font-bold text-fg mb-3">
            {locale === 'ar' ? 'هل تواجه تحدياً مشابهاً في مشاريعك؟' : 'Facing a Similar Challenge in Your Systems?'}
          </h3>
          <p className="text-xs sm:text-sm text-fg-muted max-w-xl mx-auto mb-6 leading-relaxed">
            {locale === 'ar'
              ? 'احجز جلسة استكشاف تقنية مجانية مدتها 30 دقيقة مع كبار مهندسينا لمناقشة المتطلبات وتحديد المعمارية المناسبة بدون أي التزام.'
              : 'Schedule an introductory 30-minute discovery session with our software architects to review your technical requirements with zero obligation.'}
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
          >
            <span>{locale === 'ar' ? 'احجز استشارة تقنية مجانية' : 'Book a Free Consultation'}</span>
            {direction === 'rtl' ? <ArrowLeft className="h-3.5 w-3.5" /> : <ArrowRight className="h-3.5 w-3.5" />}
          </Link>
        </div>

        {/* Previous / Next Article Navigation */}
        <div className="mt-12 pt-8 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <Link
              href={`/insights/${prevArticle.slug}`}
              className="rounded-xl border border-border bg-surface p-4 hover:border-accent/40 transition-colors group flex flex-col justify-between"
            >
              <span className="text-xs font-mono text-fg-subtle mb-1 flex items-center gap-1">
                {direction === 'rtl' ? <ArrowRight className="h-3 w-3" /> : <ArrowLeft className="h-3 w-3" />}
                {locale === 'ar' ? 'المقال السابق' : 'Previous Article'}
              </span>
              <span className="text-sm font-bold text-fg group-hover:text-accent transition-colors line-clamp-1">
                {locale === 'ar' ? prevArticle.title.ar : prevArticle.title.en}
              </span>
            </Link>
          ) : <div />}

          {nextArticle ? (
            <Link
              href={`/insights/${nextArticle.slug}`}
              className="rounded-xl border border-border bg-surface p-4 hover:border-accent/40 transition-colors group flex flex-col justify-between text-end"
            >
              <span className="text-xs font-mono text-fg-subtle mb-1 flex items-center justify-end gap-1">
                {locale === 'ar' ? 'المقال التالي' : 'Next Article'}
                {direction === 'rtl' ? <ArrowLeft className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
              </span>
              <span className="text-sm font-bold text-fg group-hover:text-accent transition-colors line-clamp-1">
                {locale === 'ar' ? nextArticle.title.ar : nextArticle.title.en}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </article>
  );
}
