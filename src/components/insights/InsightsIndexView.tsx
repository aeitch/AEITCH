"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, ArrowLeft, Filter, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { INSIGHTS_ARTICLES } from '@/lib/insights-data';
import { Vision2030Strip } from '@/components/common/vision-2030-strip';

type CategoryFilter = 'all' | 'ai-automation' | 'product-development' | 'cloud-devops' | 'custom-software' | 'vision-2030';

export function InsightsIndexView() {
  const { direction, locale } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filterOptions = [
    { id: 'all', labelAr: 'الكل', labelEn: 'All' },
    { id: 'ai-automation', labelAr: 'الذكاء الاصطناعي والأتمتة', labelEn: 'AI Automation' },
    { id: 'product-development', labelAr: 'تطوير المنتجات', labelEn: 'Product Development' },
    { id: 'cloud-devops', labelAr: 'DevOps والسحابة', labelEn: 'DevOps & Cloud' },
    { id: 'custom-software', labelAr: 'البرمجيات المخصصة', labelEn: 'Custom Software' },
    { id: 'vision-2030', labelAr: 'رؤية 2030', labelEn: 'Vision 2030' },
  ];

  const filteredArticles = activeCategory === 'all'
    ? INSIGHTS_ARTICLES
    : INSIGHTS_ARTICLES.filter((article) => article.serviceId === activeCategory);

  return (
    <div className="min-h-screen bg-bg text-fg py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-6">
          <Link href="/" className="hover:underline">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span>{locale === 'ar' ? 'المدونة الهندسية' : 'Insights'}</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-mono font-medium text-fg-muted mb-4">
            <BookOpen className="h-3.5 w-3.5 text-accent" />
            <span>{locale === 'ar' ? 'المدونة الهندسية' : 'Engineering Intelligence'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-fg tracking-tight leading-tight mb-6">
            {locale === 'ar' ? 'رؤى من واقع التنفيذ.' : 'Insights from real-world delivery.'}
          </h1>

          <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-normal">
            {locale === 'ar'
              ? 'أوراق تقنية وتجارب تطبيقية في الذكاء الاصطناعي وهندسة السحابة وتطوير المنتجات للمؤسسات في المملكة العربية السعودية والخليج.'
              : 'Technical papers and operational insights on AI, cloud engineering, and enterprise product development across Saudi Arabia and the GCC.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          <div className="flex items-center gap-2 text-xs font-mono text-fg-subtle me-2 shrink-0">
            <Filter className="h-3.5 w-3.5 text-accent" />
            <span>{locale === 'ar' ? 'تصنيف المقالات:' : 'Filter Topic:'}</span>
          </div>

          {filterOptions.map((opt) => {
            const isActive = activeCategory === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setActiveCategory(opt.id as CategoryFilter)}
                className={`shrink-0 rounded-lg px-3.5 py-2 text-xs font-mono transition-all duration-200 border ${
                  isActive
                    ? 'border-accent bg-accent/15 text-accent font-bold shadow-glow-sm'
                    : 'border-border bg-surface text-fg-muted hover:border-accent/40 hover:text-fg'
                }`}
              >
                {locale === 'ar' ? opt.labelAr : opt.labelEn}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredArticles.map((article) => {
            const title = locale === 'ar' ? article.title.ar : article.title.en;
            const excerpt = locale === 'ar' ? article.excerpt.ar : article.excerpt.en;
            const category = locale === 'ar' ? article.category.ar : article.category.en;
            const readTime = locale === 'ar' ? article.readTime.ar : article.readTime.en;
            const date = locale === 'ar' ? article.date.ar : article.date.en;
            const takeaway = locale === 'ar' ? article.takeaway.ar : article.takeaway.en;

            return (
              <article
                key={article.slug}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-radial-gradient from-accent/10 to-transparent" />

                <div>
                  <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                    <span className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-accent font-medium">
                      {category}
                    </span>
                    <div className="flex items-center gap-1.5 text-fg-subtle">
                      <Clock className="h-3.5 w-3.5 text-accent" />
                      <span>{readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">
                    <Link href={`/insights/${article.slug}`}>
                      {title}
                    </Link>
                  </h2>

                  <p className="text-sm text-fg-muted leading-relaxed mb-6">
                    {excerpt}
                  </p>

                  {/* Takeaway Teaser */}
                  <div className="mb-6 rounded-xl border border-accent/20 bg-accent/5 p-3.5 text-xs text-fg-subtle leading-relaxed">
                    <div className="flex items-center gap-1.5 text-accent font-bold font-mono mb-1">
                      <Sparkles className="h-3 w-3" />
                      <span>{locale === 'ar' ? 'الخلاصة التنفيذية:' : 'Executive Takeaway:'}</span>
                    </div>
                    <p className="line-clamp-2">
                      {takeaway}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                  <span className="text-fg-subtle font-mono">{date}</span>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-accent-hover transition-colors group-hover:underline"
                  >
                    <span>{locale === 'ar' ? 'قراءة التحليل كاملاً' : 'Read Full Analysis'}</span>
                    {direction === 'rtl' ? (
                      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                    ) : (
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    )}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Vision 2030 Banner */}
        <div className="mb-16">
          <Vision2030Strip />
        </div>

        {/* Bottom Consultation Box */}
        <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-surface via-surface to-accent/5 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black text-fg mb-4">
            {locale === 'ar'
              ? 'هل تواجه تحدياً هندسياً مشابهاً في بنيتك التحتية؟'
              : 'Facing a Similar Engineering Challenge in Your Infrastructure?'}
          </h2>
          <p className="text-sm sm:text-base text-fg-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            {locale === 'ar'
              ? 'تحدث مباشرة مع كبار مهندسينا المعماريين لمراجعة خطط الأتمتة، السحابة، أو تطوير المنتجات وفق الأنظمة السعودية وبدون أي التزام مسبق.'
              : 'Engage directly with our principal software architects to evaluate your AI automation, cloud migration, or product roadmap under Saudi regulatory standards.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm"
            >
              <span>{locale === 'ar' ? 'احجز استشارة تقنية مجانية' : 'Book a Free Technical Consultation'}</span>
              {direction === 'rtl' ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-8 py-3.5 text-sm font-semibold text-fg hover:border-accent/40 hover:bg-surface-2 transition-all duration-200"
            >
              <span>{locale === 'ar' ? 'استكشف خدماتنا الـ 4' : 'Explore Our 4 Core Services'}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
