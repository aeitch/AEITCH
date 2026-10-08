"use client";

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Clock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function InsightDetailPage() {
  const { slug } = useParams();
  const { t, direction, locale } = useTranslation();

  const article = t.insights.articles.find((a) => a.slug === slug) || t.insights.articles[0];

  return (
    <article className="min-h-screen bg-bg text-fg py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />

      <div className="relative mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-8">
          <Link href="/" className="hover:underline">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/insights" className="hover:underline">
            {t.nav.insights}
          </Link>
          <span>/</span>
          <span className="text-fg-subtle">{article.category}</span>
        </div>

        {/* Article Meta Header */}
        <div className="mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-3 text-xs mb-4">
            <span className="rounded-md border border-border bg-bg-elevated px-3 py-1 font-mono text-accent font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-fg-subtle">
              <Clock className="h-3.5 w-3.5 text-accent" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-fg-subtle">•</span>
            <span className="text-fg-subtle">{article.date}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-fg tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          <p className="text-lg text-fg-muted leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>

        {/* Article Body Content */}
        <div className="prose prose-invert max-w-none space-y-6 text-fg-muted leading-relaxed">
          <p>
            {locale === 'ar'
              ? 'تشهد بيئة الأعمال في المملكة العربية السعودية تحولاً متسارعاً نحو تبني أحدث الحلول الرقمية، انسجاماً مع مستهدفات رؤية 2030 لرفع مساهمة الاقتصاد الرقمي وتطوير البنية التحتية الوطنية. إلا أن التحدي الجوهري الذي يواجه قادة التقنية اليوم ليس في توفر النماذج، بل في كيفية مواءمتها مع متطلبات الأمان والامتثال والجدوى التشغيلية.'
              : 'The enterprise landscape in Saudi Arabia is undergoing unprecedented acceleration toward sovereign digital architectures in lockstep with Vision 2030 targets. However, the fundamental bottleneck for modern CTOs is no longer model availability, but operational compliance, low latency, and verifiable data sovereignty.'}
          </p>

          <h2 className="text-2xl font-bold text-fg pt-4">
            {locale === 'ar' ? 'الركائز المعمارية للتنفيذ العملي' : 'Architectural Pillars for Production'}
          </h2>

          <p>
            {locale === 'ar'
              ? 'يتطلب بناء أنظمة برمجية مؤسسية مستقرة الابتعاد عن الحلول العامة والتركيز على العزل التام للبيانات (Data Isolation) وتشغيل النماذج داخل حدود السحابة المعتمدة في المملكة، مع تكامل سلس مع منظومات التحقق والدفع المحلية.'
              : 'Deploying mission-critical platforms demands absolute data isolation, containerized Kubernetes topologies deployed within GCC cloud regions, and microservices decoupled from single points of failure.'}
          </p>

          <div className="my-8 rounded-2xl border border-border bg-surface p-6">
            <h3 className="text-lg font-bold text-accent mb-2">
              {locale === 'ar' ? 'التحقق الهندسي والتوصيات' : 'Key Engineering Recommendations'}
            </h3>
            <ul className="space-y-2 text-sm text-fg-muted list-disc list-inside">
              <li>
                {locale === 'ar'
                  ? 'اعتماد معمارية البنية التحتية ككود (Terraform) لتسهيل التدقيق الأمني المستمر.'
                  : 'Enforce Infrastructure-as-Code (Terraform) to guarantee repeatable, audited security postures.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'الالتزام التام بتوافق مسارات تخزين ومعالجة البيانات مع لوائح نظام حماية البيانات الشخصية (PDPL).'
                  : 'Enforce full compliance of sensitive data storage paths with Saudi PDPL guidelines and SDAIA standards.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'اختيار وكلاء ذكاء اصطناعي محددة النطاق بدلاً من النماذج العامة لتقليل الهلوسة وتسريع الاستجابة.'
                  : 'Select bounded-context agent swarms over generic models to eliminate hallucination risks.'}
              </li>
            </ul>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-accent hover:text-accent-hover transition-colors"
          >
            {direction === 'rtl' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{locale === 'ar' ? 'العودة للمقالات' : 'Back to Insights'}</span>
          </Link>

          <Link
            href="/#consultation"
            className="rounded-xl bg-accent px-5 py-2.5 text-xs font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
          >
            {t.common.bookConsultation}
          </Link>
        </div>
      </div>
    </article>
  );
}
