"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function TermsOfServicePage() {
  const { direction, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-bg text-fg py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
      <div className="relative mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-6">
          <Link href="/" className="hover:underline">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span>{locale === 'ar' ? 'شروط الخدمة والتعاقد' : 'Terms of Service'}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-fg mb-6">
          {locale === 'ar'
            ? 'شروط تقديم الخدمات الهندسية والتعاقد المؤسسي (B2B MSA)'
            : 'Engineering Master Services Agreement & Terms of Engagement'}
        </h1>

        <p className="text-sm text-fg-subtle mb-8">
          {locale === 'ar' ? 'آخر تحديث: أكتوبر 2026' : 'Last Updated: October 2026'}
        </p>

        <div className="space-y-8 text-sm text-fg-muted leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '1. طبيعة الخدمات ونطاق العمل' : '1. Nature of Engineering Services'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'تقدم شركة إيتش لتقنية المعلومات (AEITCH) خدمات هندسية وبرمجية استشارية متخصصة لقطاع الأعمال (B2B)، تشمل تطوير وتكامل أنظمة الذكاء الاصطناعي، البنى السحابية، والبرمجيات المؤسسية المخصصة. يتم تقديم كل مشروع بموجب بيان عمل مستقل (Statement of Work - SOW) يحدد نطاق التسليمات والجدول الزمني.'
                : 'AEITCH provides professional B2B engineering and architectural services, including AI agent integration, sovereign cloud architectures, and bespoke software systems. All engagements are governed by dedicated Statements of Work (SOW) defining milestones, deliverables, and SLAs.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '2. الملكية الفكرية وحقوق الشفرة المصدرية' : '2. Intellectual Property & Code Ownership'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'تلتزم إيتش بنقل الملكية الفكرية الكاملة (100% IP Ownership) لكافة الشفرات المصدرية المخصصة، المخططات المعمارية، وقواعد البيانات المطورة للعميل فور سداد المستحقات المتفق عليها في بيان العمل، دون أي قيود تشغيلية.'
                : 'Upon fulfillment of agreed milestone payments, the client retains 100% intellectual property rights, source code ownership, and deployment assets developed for their bespoke solution, with zero ongoing vendor lock-in.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '3. اتفاقيات مستوى الخدمة (SLA) وساعات العمل' : '3. Service Level Agreements & Gulf Support'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'تخضع خدمات إدارة البنى التحتية السحابية لاتفاقيات مستوى خدمة صارمة تضمن جاهزية بنسبة تصل إلى 99.99%. وتلتزم فرقنا الهندسية بساعات العمل الرسمية المتزامنة مع توقيت المملكة العربية السعودية (من الأحد إلى الخميس، توقيت الرياض GMT+3).'
                : 'Managed cloud deployments operate under rigorous SLAs targeting 99.99% operational availability. Collaborative engineering sprints operate with full synchronization during standard Saudi business hours (Sunday to Thursday, GMT+3).'}
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-accent hover:text-accent-hover transition-colors"
          >
            {direction === 'rtl' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{locale === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
