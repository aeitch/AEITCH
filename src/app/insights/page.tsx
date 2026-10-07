"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function InsightsPage() {
  const { t, direction, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-bg text-fg py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* Breadcrumb / Top Tag */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-6">
          <Link href="/" className="hover:underline">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span>{t.nav.insights}</span>
        </div>

        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-mono font-medium text-fg-muted mb-4">
            <BookOpen className="h-3.5 w-3.5 text-accent" />
            <span>{t.insights.sectionTag}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-fg tracking-tight leading-tight mb-6">
            {t.insights.heading}
          </h1>

          <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-normal">
            {t.insights.subheading}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {t.insights.articles.map((article) => (
            <article
              key={article.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-radial-gradient from-accent/10 to-transparent" />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                  <span className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-accent font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-fg-subtle">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h2 className="text-xl font-bold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">
                  <Link href={`/insights/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="text-sm text-fg-muted leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-fg-subtle font-mono">{article.date}</span>
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-accent-hover transition-colors group-hover:underline"
                >
                  <span>{locale === 'ar' ? 'قراءة التحليل كاملاً' : 'Read Paper'}</span>
                  {direction === 'rtl' ? (
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                  ) : (
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
