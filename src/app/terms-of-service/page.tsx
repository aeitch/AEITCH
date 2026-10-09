"use client";

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Scale,
  CreditCard,
  Layers,
  ArrowLeft,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function TermsOfServicePage() {
  const { direction, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-bg text-fg py-16 px-4 sm:px-6 lg:px-8" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-accent/5 blur-[140px]" />

      <div className="relative mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-accent mb-6">
          <Link href="/" className="hover:underline">
            {locale === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
          <span>/</span>
          <span>{locale === 'ar' ? 'شروط الخدمة والتعاقد' : 'Terms of Service'}</span>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="mb-8 rounded-2xl border border-accent/40 bg-accent/10 p-5 sm:p-6 flex items-start gap-4 shadow-xl">
          <Scale className="h-6 w-6 text-accent shrink-0 mt-1" />
          <div className="text-xs sm:text-sm text-fg-muted leading-relaxed">
            <span className="font-bold text-accent block text-sm sm:text-base mb-1">
              {locale === 'ar'
                ? 'اتفاقية تقديم الخدمات الهندسية وشروط المشاركة (B2B MSA)'
                : 'Master Services Agreement & Terms of Engineering Engagement (B2B)'}
            </span>
            {locale === 'ar'
              ? 'تحدد هذه الشروط الإطار التعاقدي العام لتقديم الخدمات البرمجية والهندسية لقطاع الأعمال (B2B) بين شركة إيتش (AEITCH) وعملائها. يخضع كل مشروع تنفيذي لبيان عمل مستقل (Statement of Work - SOW) يحدد النطاق والمراحل والمخرجات.'
              : 'These terms set forth the master commercial framework governing software architecture, cloud engineering, and AI integration services between AEITCH and enterprise clients. Individual projects are formally defined via distinct Statements of Work (SOWs) specifying technical scope, sprint deliverables, and SLAs.'}
          </div>
        </div>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-border">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-fg mb-4 tracking-tight">
            {locale === 'ar'
              ? 'شروط الخدمة والتعاقد المؤسسي'
              : 'Terms of Service & Engagement'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-fg-subtle">
            <span>{locale === 'ar' ? 'الإصدار: 2.1 (شروط موحدة)' : 'Version: 2.1 (Consolidated Terms)'}</span>
            <span>•</span>
            <span>{locale === 'ar' ? 'تاريخ السريان: أكتوبر 2026' : 'Effective Date: October 2026'}</span>
            <span>•</span>
            <span className="text-accent">{locale === 'ar' ? 'تغطي الدفع والتسليم والإلغاء' : 'Covers Payment, Delivery & Cancellation'}</span>
          </div>
        </header>

        {/* 9 Structured Sections */}
        <div className="space-y-10 text-sm sm:text-base text-fg-muted leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">01.</span>
              <span>{locale === 'ar' ? 'نطاق الخدمات الهندسية الأربع وبيان العمل (SOW)' : 'The 4 Core Services & Statements of Work (SOW)'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'تقدم شركة إيتش (AEITCH) خدمات هندسية وبرمجية متخصصة تتركز حصرياً في أربعة مسارات رئيسية: (1) الذكاء الاصطناعي والأتمتة، (2) تطوير المنتجات، (3) DevOps وهندسة السحابة، و(4) تطوير البرمجيات المخصصة.'
                : 'AEITCH provides focused enterprise engineering across four dedicated disciplines: (1) AI Automation & Integration, (2) Product Development, (3) DevOps & Cloud Engineering, and (4) Custom Software Development.'}
            </p>
            <p>
              {locale === 'ar'
                ? 'يتم تقديم كافة الخدمات بناءً على "بيان عمل" (SOW) أو عرض فني ومالي معتمد وموقع من الطرفين، يحدد بالتفصيل المتطلبات الوظيفية، المعمارية المعتمدة، جدول التسليمات المرحلية، والميزانية المتفق عليها.'
                : 'All engineering deliverables are executed pursuant to a mutually executed Statement of Work (SOW) or verified technical proposal articulating system scope, technical architecture, milestone deliverables, acceptance criteria, and fee structure.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">02.</span>
              <span>{locale === 'ar' ? 'العروض المالية وجداول الدفع المرحلية (Milestone Billing)' : 'Proposals, Currency & Milestone-Based Invoicing'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'تعتمد إيتش نموذج الدفع القائم على المراحل التسليمية المنجزة (Milestone-Based Billing)، بما يضمن للعميل عدم دفع أي مستحقات إلا بعد مراجعة واعتماد المخرجات المحددة في كل مرحلة:'
                : 'We operate on a transparent milestone-gated billing framework ensuring payment correlates directly with verified engineering progress:'}
            </p>
            <ul className="space-y-2 list-disc list-inside ps-2 text-fg/90">
              <li>
                {locale === 'ar'
                  ? 'عملة التعاقد: تُحرر العقود والفواتير بالريال السعودي (SAR) لعملائنا في المملكة العربية السعودية، أو بالدولار الأمريكي (USD) حسب الاتفاق المعتمد في بيان العمل.'
                  : 'Contract Currency: Proposals and invoices are denominated in Saudi Riyals (SAR) for Kingdom clients or United States Dollars (USD) as stipulated in the SOW.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'الدفع المرحلي: دفعة بدء المشروع (تجهيز المعمارية والتصميم)، تليها دفعات مرحلية مرتبطة باختبارات القبول (UAT)، ودفعة نهائية عند النشر في الإنتاج.'
                  : 'Milestone Structure: An initial sprint kickoff deposit (architecture foundation & scoping), followed by milestone installments tied to user acceptance testing (UAT), and a final release disbursement.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'شروط السداد: تستحق الفواتير الصادرة السداد خلال 14 يوماً من تاريخ استلامها، وتُسلَّم الشيفرات المصدرية المكتملة فور تسوية فواتير المرحلة المعنية.'
                  : 'Settlement Terms: Invoices are payable within 14 calendar days. Source assets are deployed and transferred upon fulfillment of milestone obligations.'}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">03.</span>
              <span>{locale === 'ar' ? 'الملكية الفكرية وحقوق الشيفرة المصدرية (100% IP Ownership)' : '100% Intellectual Property & Source Code Ownership'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'انسجاماً مع تعهدنا لعملائنا في المملكة والخليج، فإن العميل يمتلك 100% من حقوق الملكية الفكرية، والشيفرة المصدرية المخصصة (Source Code)، ومخططات المعمارية، وتراخيص قواعد البيانات المطورة لمشروعه فور سداد المستحقات المالية للمشروع كاملة.'
                : 'In alignment with our sovereign engineering principles, the client retains 100% unrestricted intellectual property ownership over all custom source code, architectural schemas, configuration scripts, and documentation developed under the SOW upon full payment of agreed milestone fees.'}
            </p>
            <p className="text-xs text-fg-subtle">
              {locale === 'ar'
                ? 'تظل الأدوات البرمجية والمكتبات مفتوحة المصدر (Open Source) والمكونات الأساسية المشتركة المملوكة مسبقاً لإيتش خاضعة لتراخيصها الخاصة، مع منح العميل رخصة دائمة وغير قابلة للإلغاء لاستخدامها داخل مشروعه بدون رسوم إضافية.'
                : 'Pre-existing core modules, developer tooling, and open-source packages integrated into the system remain governed by their applicable licenses, with the client granted a perpetual, royalty-free license to utilize them within the solution.'}
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">04.</span>
              <span>{locale === 'ar' ? 'السرية التامة واتفاقية عدم الإفصاح المتبادلة (Mutual NDA)' : 'Confidentiality & Mutual Non-Disclosure Agreement'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نتعامل مع كافة الوثائق الهندسية، وبيانات الأعمال، والخطط الاستراتيجية، والأسرار التجارية التي يشاركها العميل بسرية مطلقة. نلتزم بتوقيع اتفاقية عدم إفصاح متبادلة (Mutual NDA) قبل استلام أي مستندات فنية أو تفاصيل معمارية، ونلزم كافة مهندسينا ومقاولينا بنفس التعهدات الصارمة.'
                : 'All technical architectures, commercial datasets, business logic, and proprietary repositories disclosed during technical discovery or sprint execution are held in strict confidence. We execute mutual non-disclosure agreements (NDAs) prior to receiving proprietary specifications, binding all engineers to equivalent confidentiality protocols.'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">05.</span>
              <span>{locale === 'ar' ? 'الضمان، التسليم، وسياسة إصلاح العيوب (Warranty & Delivery)' : 'Warranty, Defect Rectification & Delivery Policy'}</span>
            </h2>
            <div className="rounded-xl border border-border bg-surface p-4 space-y-2 text-xs sm:text-sm text-fg-muted">
              <div className="font-bold text-fg">
                {locale === 'ar' ? 'فترة الضمان الهندسي (30 يوماً):' : '30-Day Defect Warranty:'}
              </div>
              <p>
                {locale === 'ar'
                  ? 'تقدم إيتش ضماناً لمدة 30 يوماً من تاريخ الإطلاق الفعلي للإنتاج (Production Go-Live)، تلتزم خلالها بإصلاح أي عيوب أو أخطاء برمجية (Bugs) ناتجة عن عدم مطابقة المخرجات للمواصفات المتفق عليها في بيان العمل، دون أي تكلفة إضافية على العميل.'
                  : 'AEITCH provides a 30-day warranty window post-production launch, committing to rectify any reproducible software bugs or defects deviating from agreed SOW specifications at zero additional cost.'}
              </p>
            </div>
            <p className="text-xs text-fg-subtle">
              {locale === 'ar'
                ? 'حدود المسؤولية: يقتصر الحد الأقصى للمسؤولية القانونية والمالية لشركة إيتش عن أي مطالبات ناشئة عن تنفيذ العقد على إجمالي المبالغ المدفوعة فعلياً من العميل بموجب بيان العمل (SOW) المعني خلال الأشهر الستة السابقة للمطالبة.'
                : 'Limitation of Liability: The aggregate liability of AEITCH arising out of or related to an engagement is capped at the total fees actually received under the applicable SOW during the six-month period preceding the claim.'}
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">06.</span>
              <span>{locale === 'ar' ? 'سياسة الإلغاء والإنهاء والتسليم المرحلي (Cancellation & Termination)' : 'Cancellation, Termination & Handover Policy'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'يدمج هذا القسم السياسات الخاصة بالإلغاء وتسليم المشاريع (سابقاً في صفحات منفصلة):'
                : 'This section consolidates our project cancellation, refund, and delivery protocols:'}
            </p>
            <ul className="space-y-2 list-disc list-inside ps-2 text-fg/90">
              <li>
                {locale === 'ar'
                  ? 'الإنهاء بإشعار خطي: يحق لأي من الطرفين إنهاء التعاقد بموجب إشعار خطي مسبق مدته 14 يوماً.'
                  : 'Termination for Convenience: Either party may terminate an engagement upon fourteen (14) days prior written notice.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'التسليم والتسوية عند الإنهاء: عند الإنهاء المبكر، يسدد العميل مستحقات العمل المنجز وساعات التطوير المنفذة حتى تاريخ الإشعار، وتلتزم إيتش بتسليم كافة الأكواد والوثائق والبيانات المنجزة حتى تلك اللحظة فوراً.'
                  : 'Settlement & Asset Transfer: In the event of early termination, the client compensates for all accepted milestones and verified development time incurred through the effective date. AEITCH promptly commits all completed repositories, container builds, and documentation.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'سياسة الاسترداد: المبالغ المدفوعة عن مراحل منجزة ومقبولة غير قابلة للاسترداد نظراً لطبيعة الخدمات الهندسية الاحترافية والوقت المستهلك في التطوير.'
                  : 'Refund Terms: Fees paid for completed, accepted sprint milestones are non-refundable reflecting delivered professional engineering services.'}
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">07.</span>
              <span>{locale === 'ar' ? 'حماية البيانات والالتزام بنظام PDPL' : 'Data Protection & Saudi PDPL Alignment'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'تلتزم إيتش في كافة تعاملاتها الهندسية بأحكام نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) ولائحته التنفيذية. تطبق إيتش سياسة خصوصية صارمة (موضحة في صفحة سياسة الخصوصية) تضمن عدم معالجة أي بيانات شخصية إلا للغرض المصرح به وبموجب اتفاقية معالجة بيانات (DPA) معتمدة.'
                : 'AEITCH adheres to the Saudi Personal Data Protection Law (Royal Decree M/19) and SDAIA regulatory rules. All client data processed during consulting or deployment is governed in conjunction with our Privacy Policy and governed by enterprise Data Processing Agreements (DPAs).'}
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">08.</span>
              <span>{locale === 'ar' ? 'القانون الواجب التطبيق وحل النزاعات' : 'Governing Law & Dispute Resolution'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'تُحل أي خلافات أو نزاعات ناشئة عن هذه الشروط بالطرق الودية والمفاوضات المباشرة بين الممثلين التنفيذيين للطرفين خلال 30 يوماً. وفي حال تعذر الحل الودي، يُحدد القانون الواجب التطبيق والاختصاص القضائي أو التحكيمي (سواء التحكيم التجاري أو محاكم المملكة أو غيرها) بالاتفاق المكتوب في بيان العمل (SOW) الموقع بين الطرفين.'
                : 'Any disputes arising under these terms will first be addressed through good-faith executive negotiation over a thirty (30) day window. If unresolved, disputes shall be submitted to the governing jurisdiction or commercial arbitration venue formally stipulated in the final executed SOW.'}
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">09.</span>
              <span>{locale === 'ar' ? 'الإشعارات الرسمية والتواصل' : 'Official Notices & Contact'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'تُوجه كافة الإشعارات والمراسلات القانونية والتعاقدية لشركة إيتش عبر القنوات الرسمية التالية:'
                : 'Formal legal notices and contractual inquiries must be directed to AEITCH through our official corporate channels:'}
            </p>
            <div className="rounded-xl border border-border bg-surface p-5 space-y-2 text-xs sm:text-sm font-mono text-fg">
              <div><strong>البريد الإلكتروني المهني / Official Email:</strong> hello@aeitch.com</div>
              <div><strong>واتساب الأعمال / WhatsApp:</strong> +92 318 4055723</div>
              <div><strong>المركز الهندسي / Engineering Center:</strong> Islamabad, Pakistan (UTC+5)</div>
            </div>
          </section>
        </div>

        {/* Back Link */}
        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-mono font-bold text-accent hover:text-accent-hover transition-colors"
          >
            {direction === 'rtl' ? <ArrowRight className="h-4 w-4" /> : <ArrowLeft className="h-4 w-4" />}
            <span>{locale === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}</span>
          </Link>

          <Link
            href="/privacy-policy"
            className="text-xs font-mono text-fg-subtle hover:text-accent transition-colors underline"
          >
            {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </Link>
        </div>
      </div>
    </div>
  );
}
