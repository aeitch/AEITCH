"use client";

import React from 'react';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function InsightsSection() {
  const { t, direction, locale } = useTranslation();

  return (
    <section id="insights" className="relative py-28 bg-bg border-t border-border overflow-hidden" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 start-0 h-96 w-96 rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-mono font-medium text-fg-muted mb-4">
              <BookOpen className="h-3.5 w-3.5 text-accent" />
              <span>{t.insights.sectionTag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-fg tracking-tight leading-tight mb-4">
              {t.insights.heading}
            </h2>

            <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-normal">
              {t.insights.subheading}
            </p>
          </div>

          <Link
            href="/insights"
            className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-accent hover:text-accent-hover transition-colors self-start md:self-auto"
          >
            <span>{locale === 'ar' ? 'تصفح كافة المقالات والأبحاث' : 'View All Engineering Briefings'}</span>
            {direction === 'rtl' ? (
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.insights.articles.map((article) => (
            <article
              key={article.slug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-surface p-7 shadow-lg backdrop-blur-xl transition-all duration-300 hover:border-accent/40 hover:bg-surface-2 hover:-translate-y-1"
            >
              {/* Radial Highlight */}
              <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-radial-gradient from-accent/10 to-transparent" />

              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between gap-2 mb-4 text-xs">
                  <span className="rounded-md border border-border bg-bg-elevated px-2.5 py-1 font-mono text-accent font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-fg-subtle">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-fg mb-3 group-hover:text-accent transition-colors leading-snug">
                  <Link href={`/insights/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-fg-muted leading-relaxed mb-6">
                  {article.excerpt}
                </p>
              </div>

              {/* Footer Meta & Read Link */}
              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="text-fg-subtle font-mono">{article.date}</span>
                <Link
                  href={`/insights/${article.slug}`}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-accent hover:text-accent-hover transition-colors group-hover:underline"
                >
                  <span>{locale === 'ar' ? 'قراءة التحليل' : 'Read Paper'}</span>
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
    </section>
  );
}
