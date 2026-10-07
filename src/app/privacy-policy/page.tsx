"use client";

import React from 'react';
import Link from 'next/link';
import { AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
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
          <span>{locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
        </div>

        {/* Legal Disclaimer Flag */}
        <div className="mb-8 rounded-xl border border-accent/40 bg-accent/10 p-4 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-xs text-fg-muted leading-relaxed">
            <span className="font-bold text-accent block mb-1">
              [LEGAL REVIEW NEEDED / يلزم المراجعة القانونية]
            </span>
            {locale === 'ar'
              ? 'تمت صياغة هذه السياسة وفقاً للمبادئ العامة لنظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) وتعديلاته ولائحته التنفيذية في المملكة العربية السعودية. تخضع هذه الوثيقة لمراجعة المستشار القانوني للعميل قبل الاعتماد النهائي.'
              : 'This notice is drafted in alignment with the Saudi Personal Data Protection Law (PDPL, Royal Decree M/19) and its executive regulations. This document requires final verification by the client’s legal counsel prior to formal production certification.'}
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-fg mb-6">
          {locale === 'ar'
            ? 'إشعار الخصوصية وحماية البيانات الشخصية (PDPL)'
            : 'Privacy Notice & Data Protection Policy (Saudi PDPL)'}
        </h1>

        <p className="text-sm text-fg-subtle mb-8">
          {locale === 'ar' ? 'آخر تحديث: أكتوبر 2026' : 'Last Updated: October 2026'}
        </p>

        <div className="space-y-8 text-sm text-fg-muted leading-relaxed border-t border-border pt-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '1. المقدمة ونطاق التطبيق' : '1. Introduction & Scope'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'تلتزم شركة إيتش لتقنية المعلومات (AEITCH) باحترام خصوصية زوار موقعنا وعملائنا من المنشآت والشركات في المملكة العربية السعودية ودول مجلس التعاون الخليجي، وحماية بياناتهم الشخصية ومعالجتها بنزاهة وشفافية وفقاً للأنظمة واللوائح المعمول بها.'
                : 'AEITCH is strictly committed to safeguarding the privacy and personal data of our enterprise clients, partners, and website visitors across Saudi Arabia and the GCC, processing data fairly and transparently in accordance with applicable Kingdom data regulations.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '2. البيانات التي نجمعها والمسوغ النظامي' : '2. Personal Data Collected & Lawful Basis'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'نقوم بجمع البيانات الشخصية والمهنية المقدمة طواعية من قبلك عند طلب استشارة تقنية أو التواصل معنا، وتشمل: الاسم، البريد الإلكتروني المهني، رقم الهاتف الجوال، اسم المنشأة، ونبذة عن المتطلبات الهندسية. يتم جمع هذه البيانات بناءً على موافقتك الصريحة ولغرض التقييم المعماري المسبق للتعاقد.'
                : 'We collect personal and professional data voluntarily provided when booking a technical consultation or contacting us, including: full name, corporate email, mobile phone number, organization name, and high-level technical scope. The lawful basis for processing is your explicit consent and pre-contractual discovery assessment.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '3. تخزين البيانات والسيادة المحلية' : '3. Data Storage & Sovereign Localization'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'تتم معالجة وتخزين البيانات عبر بنى تحتية سحابية آمنة ومشفرة، مع الالتزام التام بعدم نقل أي بيانات شخصية حساسة خارج حدود المملكة إلا وفق الشروط والضوابط النظامية المحددة في لوائح الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) [CLIENT TO VERIFY].'
                : 'Data is processed and stored on secured, encrypted cloud environments. We enforce strict data localization standards ensuring that critical personal data remains within certified Kingdom infrastructure, adhering to SDAIA transfer standards [CLIENT TO VERIFY].'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-fg">
              {locale === 'ar' ? '4. حقوق أصحاب البيانات الشخصية' : '4. Your Legal Rights as a Data Subject'}
            </h2>
            <p>
              {locale === 'ar'
                ? 'وفقاً لنظام حماية البيانات الشخصية السعودي، يحق لك ممارسة الحقوق الآتية: حق العلم بمسوغ المعالجة، حق الوصول إلى بياناتك، حق طلب التصحيح أو التحديث، وحق طلب الإتلاف عند انتهاء الغرض منها. لممارسة أي من هذه الحقوق، يرجى مراسلة مسؤول حماية البيانات على: privacy@aeitch.com.'
                : 'Under the Saudi PDPL, you hold explicit rights: the right to be informed of the processing purpose, the right to access your data, the right to request correction/update, and the right to request destruction when the legitimate purpose concludes. To exercise these rights, contact our Data Protection Officer at: privacy@aeitch.com.'}
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
