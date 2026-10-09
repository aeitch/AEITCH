"use client";

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  FileText,
  Mail,
  ArrowLeft,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  Globe2,
  Server
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export default function PrivacyPolicyPage() {
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
          <span>{locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
        </div>

        {/* Regulatory Compliance Notice */}
        <div className="mb-8 rounded-2xl border border-accent/40 bg-accent/10 p-5 sm:p-6 flex items-start gap-4 shadow-xl">
          <ShieldCheck className="h-6 w-6 text-accent shrink-0 mt-1" />
          <div className="text-xs sm:text-sm text-fg-muted leading-relaxed">
            <span className="font-bold text-accent block text-sm sm:text-base mb-1">
              {locale === 'ar'
                ? 'إشعار الامتثال لنظام حماية البيانات الشخصية السعودي (PDPL)'
                : 'Compliance Notice: Saudi Personal Data Protection Law (PDPL)'}
            </span>
            {locale === 'ar'
              ? 'صيغت هذه السياسة وتُطبق وفقاً لأحكام نظام حماية البيانات الشخصية الصادر بالمرسوم الملكي رقم (م/19) ولائحته التنفيذية الصادرة عن الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا). تلتزم إيتش بأعلى معايير حماية البيانات والشفافية في معالجة معلومات العملاء والشركاء.'
              : 'This policy is formulated and governed in accordance with the Saudi Personal Data Protection Law (Royal Decree M/19) and its executive regulations promulgated by SDAIA. AEITCH enforces enterprise data protection and transparent governance across all client interactions.'}
          </div>
        </div>

        {/* Header */}
        <header className="mb-10 pb-8 border-b border-border">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-fg mb-4 tracking-tight">
            {locale === 'ar'
              ? 'سياسة الخصوصية وإشعار حماية البيانات'
              : 'Privacy Policy & Data Protection Notice'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-fg-subtle">
            <span>{locale === 'ar' ? 'الإصدار: 2.1 (محدث)' : 'Version: 2.1 (Updated)'}</span>
            <span>•</span>
            <span>{locale === 'ar' ? 'تاريخ السريان: أكتوبر 2026' : 'Effective Date: October 2026'}</span>
            <span>•</span>
            <span className="text-accent">{locale === 'ar' ? 'الولاية: المملكة العربية السعودية' : 'Jurisdiction: Saudi Arabia / KSA PDPL'}</span>
          </div>
        </header>

        {/* Important Warning Banner: Never ask for passwords */}
        <div className="mb-10 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-center gap-3 text-xs sm:text-sm text-fg">
          <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
          <div>
            <strong className="text-amber-400 block mb-0.5">
              {locale === 'ar' ? 'تنبيه أمني هام:' : 'Security Precaution:'}
            </strong>
            {locale === 'ar'
              ? 'لن تطلب شركة إيتش (AEITCH) أو أي من ممثليها كلمات مرور حساباتك، أو مفاتيح خوادمك الخاصة، أو رموز التحقق عبر البريد الإلكتروني أو الرسائل النصية أبداً. إذا استلمت أي رسالة مشبوهة، أبلغنا فوراً على hello@aeitch.com.'
              : 'AEITCH and its engineers will never ask for your account passwords, private server keys, or OTP verification codes via email or SMS. If you receive any suspicious requests, notify us immediately at hello@aeitch.com.'}
          </div>
        </div>

        {/* 13 Structured Sections */}
        <div className="space-y-10 text-sm sm:text-base text-fg-muted leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">01.</span>
              <span>{locale === 'ar' ? 'من نحن ومسؤول حماية البيانات' : 'Who We Are & Data Protection Officer'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'شركة إيتش (AEITCH) هي دار هندسية متخصصة في الذكاء الاصطناعي، وتطوير المنتجات، وهندسة السحابة، والبرمجيات المخصصة. يقع مقر مركزنا الهندسي في إسلام آباد، باكستان (توقيت UTC+5، بفارق ساعتين فقط عن توقيت الرياض)، ونقدم خدماتنا للمؤسسات والشركات الناشئة في المملكة العربية السعودية ودول الخليج.'
                : 'AEITCH is an enterprise engineering practice specializing in AI Automation & Integration, Product Development, DevOps & Cloud Engineering, and Custom Software Development. Our core engineering delivery hub operates from Islamabad, Pakistan (UTC+5, 2-hour delta with Riyadh, offering full working-day overlap), serving enterprise clients across Saudi Arabia and the GCC.'}
            </p>
            <p>
              {locale === 'ar'
                ? 'جهة الاتصال المسؤولة عن حماية البيانات والخصوصية: مسؤول حماية البيانات (DPO) — البريد الإلكتروني: hello@aeitch.com.'
                : 'Data Protection Officer (DPO) Contact: Chief Privacy & Security Officer — Email: hello@aeitch.com.'}
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">02.</span>
              <span>{locale === 'ar' ? 'ما البيانات التي نجمعها؟' : 'Personal Data We Collect'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نجمع فقط الحد الأدنى الضروري من البيانات لتحقيق الأغراض الهندسية والتعاقدية، وتشمل:'
                : 'We collect strictly the minimum necessary data to fulfill technical scoping and contractual engagements:'}
            </p>
            <ul className="space-y-2 list-disc list-inside ps-2 text-fg/90">
              <li>
                {locale === 'ar'
                  ? 'بيانات نماذج التواصل والاستشارة: الاسم الكامل، البريد الإلكتروني المهني، رقم الجوال/واتساب (مع رمز الدولة)، اسم الشركة، والمواصفات والمتطلبات التقنية المرفقة.'
                  : 'Contact & Scoping Submissions: Full name, corporate email address, phone/WhatsApp number, organization name, project specifications, and architectural documentation attachments.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'بيانات حجز الاستشارات: المواعيد المختارة، المناطق الزمنية، وأسئلة التقييم المسبقة عبر أداة الجدولة.'
                  : 'Consultation Booking Records: Selected calendar slots, timezone preferences, and discovery pre-assessment questionnaires.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'البيانات التقنية التشغيلية: عنوان بروتوكول الإنترنت (IP)، نوع المتصفح، نظام التشغيل، وصفحات الموقع التي تمت زيارتها لأغراض أمن الخوادم ومنع الهجمات.'
                  : 'Technical & Telemetry Data: IP addresses, user agent headers, operating systems, and visited page sequences utilized solely for server security and DDoS mitigation.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'ملفات تعريف الارتباط الضرورية: الكوكيز التقنية المخصصة لحفظ تفضيل اللغة (عربي/إنجليزي) والوضع الليلي.'
                  : 'Essential Cookies: Session identifiers storing language preferences (AR/EN) and UI state.'}
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">03.</span>
              <span>{locale === 'ar' ? 'لماذا نجمع البيانات؟ والمسوغ النظامي' : 'Why We Collect Data & Lawful Basis Under PDPL'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نعالج بياناتك بالاستناد إلى المسوغات النظامية المنصوص عليها في المادة السادسة من نظام حماية البيانات الشخصية السعودي (PDPL):'
                : 'We process personal data pursuant to lawful bases defined under Article 6 of the Saudi PDPL:'}
            </p>
            <ul className="space-y-2 list-disc list-inside ps-2 text-fg/90">
              <li>
                {locale === 'ar'
                  ? 'الموافقة الصريحة (Explicit Consent): عند إرسال طلب استشارة أو تعبئة نموذج الاستفسار التقني.'
                  : 'Explicit Consent: Voluntarily submitted upon booking discovery sessions or requesting engineering proposals.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'الإجراءات السابقة للتعاقد وتنفيذ الالتزامات: لتقييم المتطلبات البرمجية وصياغة بيان العمل (SOW) واتفاقيات عدم الإفصاح (NDA).'
                  : 'Pre-contractual Steps & Contractual Performance: Evaluating architecture feasibility and executing Statements of Work (SOW) and NDAs.'}
              </li>
              <li>
                {locale === 'ar'
                  ? 'المصالح المشروعة والأمن السيبراني: لحماية خوادم إيتش وموقعها من الاختراقات والهجمات السيبرانية.'
                  : 'Legitimate Interests & Cybersecurity: Fortifying infrastructure against malicious intrusions and fulfilling statutory audit requirements.'}
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">04.</span>
              <span>{locale === 'ar' ? 'حقوقك النظامية كصاحب بيانات' : 'Your Legal Rights as a Data Subject'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'بموجب نظام حماية البيانات الشخصية السعودي، يتمتع أصحاب البيانات بالحقوق الآتية دون أي مقابل مادي:'
                : 'Under the Saudi PDPL, you are entitled to the following statutory rights free of charge:'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-bold text-fg mb-1">
                  {locale === 'ar' ? '1. حق العلم والمعرفة' : '1. Right to Be Informed'}
                </div>
                <div className="text-xs text-fg-muted">
                  {locale === 'ar' ? 'معرفة المسوغ النظامي والغرض من جمع ومعالجة بياناتك.' : 'Clear understanding of processing purposes and legal bases.'}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-bold text-fg mb-1">
                  {locale === 'ar' ? '2. حق الوصول والاطلاع' : '2. Right of Access'}
                </div>
                <div className="text-xs text-fg-muted">
                  {locale === 'ar' ? 'طلب نسخة من بياناتك الشخصية المحفوظة لدينا بصيغة واضحة.' : 'Obtain a verified export of your personal data on file.'}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-bold text-fg mb-1">
                  {locale === 'ar' ? '3. حق التصحيح والتحديث' : '3. Right to Correction'}
                </div>
                <div className="text-xs text-fg-muted">
                  {locale === 'ar' ? 'تصحيح أي بيانات غير دقيقة أو استكمال البيانات الناقصة.' : 'Rectify outdated, incomplete, or inaccurate records.'}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="font-bold text-fg mb-1">
                  {locale === 'ar' ? '4. حق الإتلاف والرجوع عن الموافقة' : '4. Right to Destruction / Revocation'}
                </div>
                <div className="text-xs text-fg-muted">
                  {locale === 'ar' ? 'طلب إتلاف بياناتك فور انتهاء الغرض منها أو سحب موافقتك.' : 'Request complete deletion upon purpose fulfillment or consent withdrawal.'}
                </div>
              </div>
            </div>
            <p className="text-xs text-fg-subtle">
              {locale === 'ar'
                ? 'لممارسة أي من هذه الحقوق، يرجى إرسال بريد إلكتروني إلى hello@aeitch.com. نلتزم بالرد على كافة الطلبات النظامية خلال 30 يوماً كحد أقصى وفق متطلبات اللائحة التنفيذية.'
                : 'To exercise any statutory rights, email hello@aeitch.com. We respond to all formal requests within a maximum statutory window of 30 days.'}
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">05.</span>
              <span>{locale === 'ar' ? 'نقل البيانات خارج المملكة والسيادة البيانية' : 'Transfers Outside the Kingdom & Data Sovereignty'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نظراً لأن مركزنا الهندسي وفرق التطوير تعمل من إسلام آباد، باكستان، فإن بيانات التواصل الأولي والاستشارات الهندسية يتم نقلها ومعالجتها خارج المملكة وفقاً للشروط والضوابط المنصوص عليها في المادة التاسعة والعشرين من نظام حماية البيانات الشخصية واللوائح المنظمة لنقل البيانات عبر الحدود الصادرة عن سدايا (SDAIA)، واستناداً إلى بنود تعاقدية قياسية (Standard Contractual Clauses).'
                : 'Because our engineering hub and core development squads operate from Islamabad, Pakistan, initial scoping inquiries and consulting communications are transmitted and processed outside Saudi Arabia in strict compliance with Article 29 of the PDPL and SDAIA cross-border transfer directives, governed by standard contractual clauses and rigorous enterprise NDAs.'}
            </p>
            <div className="rounded-xl border border-accent/30 bg-surface p-4 text-xs text-fg-muted">
              <strong className="text-accent block mb-1">
                {locale === 'ar' ? 'استضافة بيئات الإنتاج الخاصة بالعملاء:' : 'Client Production Infrastructure Sovereignty:'}
              </strong>
              {locale === 'ar'
                ? 'فيما يخص الأنظمة وقواعد البيانات التي نبنيها لعملائنا في السعودية، نلتزم بنشرها واستضافتها بنسبة 100% داخل مراكز البيانات السحابية المعتمدة في المملكة (مثل مناطق AWS وGoogle Cloud وAzure في الرياض والدمام)، بحيث لا تغادر بيانات المستخدمين النهائيين الحساسة حدود المملكة إطلاقاً، امتثالاً لسياسة السحابة أولاً وضوابط الهيئة الوطنية للأمن السيبراني (NCA CCC-2:2024).'
                : 'For all bespoke production platforms engineered for our Saudi clients, we mandate that database records, application runtimes, and user records are deployed exclusively within certified in-Kingdom hyperscale cloud regions (AWS, Google Cloud, or Azure in Riyadh and Dammam), ensuring sensitive resident data never leaves Saudi territorial jurisdiction.'}
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">06.</span>
              <span>{locale === 'ar' ? 'فترات الاحتفاظ بالبيانات' : 'Data Retention & Disposal'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نحتفظ ببيانات الاستفسارات غير التعاقدية لمدة لا تتجاوز 12 شهراً من تاريخ آخر تواصل، ما لم يطلب صاحب البيانات إتلافها قبل ذلك. أما بيانات المشاريع والتعاقدات الرسمية، فنحتفظ بسجلاتها المعمارية والمالية وفق الفترات القانونية والتنظيمية الإلزامية لأغراض التدقيق الضريبي، ثم يتم إتلافها بشكل آمن وموثق.'
                : 'General pre-contractual inquiries are retained for up to 12 months following last communication unless early deletion is requested. Contractual, financial, and architectural audit artifacts are preserved strictly for mandatory statutory periods before being securely scrubbed.'}
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">07.</span>
              <span>{locale === 'ar' ? 'التدابير الأمنية وحماية الأنظمة' : 'Security Measures & Zero-Trust Governance'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نطبق تدابير أمنية تقنية وتنظيمية متقدمة تشمل: تشفير كافة البيانات أثناء النقل (TLS 1.3) وبالسكون (AES-256)، وفرض المصادقة متعددة العوامل (MFA) على جميع حسابات المهندسين، ومبدأ الصلاحيات الأقل (Least Privilege Access)، مع تدقيق دوري لسجلات الوصول. ومع ذلك، نؤكد أنه لا توجد وسيلة نقل عبر الإنترنت تضمن الأمان المطلق بنسبة 100%.'
                : 'We implement layered technical defenses: end-to-end TLS 1.3 transit encryption, AES-256 encryption at rest, mandatory hardware MFA for all engineering credentials, least-privilege role boundaries, and automated vulnerability scanning. While robust, no web transmission method offers an absolute theoretical guarantee.'}
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">08.</span>
              <span>{locale === 'ar' ? 'ملفات تعريف الارتباط (Cookies)' : 'Cookies & Tracking Technologies'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نستخدم فقط ملفات تعريف الارتباط التقنية الضرورية لتشغيل الموقع (مثل حفظ اللغة المفضلة). لا نستخدم ملفات تتبع إعلانية متطفلة أو بيع لبيانات التصفح لأي أطراف تسويقية. يمكنك في أي وقت ضبط إعدادات متصفحك لرفض ملفات الارتباط.'
                : 'Our website deploys strictly necessary technical cookies to retain interface preferences (locale, theme). We reject invasive third-party cross-site advertising trackers and never sell web browsing telemetry. You can block or clear cookies at any time via your browser settings.'}
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">09.</span>
              <span>{locale === 'ar' ? 'الأطراف الثالثة ومزودو البنية التحتية' : 'Third-Party Service Providers'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'نستعين بمزودي خدمات سحابية وبنية تحتية موثوقين لتشغيل الموقع (مثل استضافة Vercel وخدمات البريد الإلكتروني المهني Google Workspace وأدوات الجدولة). تلتزم هذه الأطراف بموجب اتفاقيات معالجة بيانات صارمة (DPAs) بعدم استخدام بياناتك لأي غرض مستقل خارج نطاق تقديم الخدمة.'
                : 'We partner with vetted enterprise infrastructure providers (such as Vercel for web delivery, Google Workspace for corporate email, and enterprise scheduling tools). All vendors are bound by stringent Data Processing Agreements prohibiting independent utilization of your data.'}
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">10.</span>
              <span>{locale === 'ar' ? 'خصوصية الأطفال والقصّر' : 'Children’s Privacy'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'خدمات إيتش موجهة حصرياً لقطاع الأعمال والشركات والمؤسسات (B2B)، وليست موجهة بأي شكل من الأشكال للأفراد الذين تقل أعمارهم عن 18 عاماً. ولا نقوم عمداً بجمع أي بيانات شخصية تخص القصّر.'
                : 'AEITCH provides institutional B2B engineering services exclusively. Our site and offerings are not directed toward individuals under the age of 18, and we do not knowingly solicit or collect personal records from minors.'}
            </p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">11.</span>
              <span>{locale === 'ar' ? 'الإبلاغ عن الحوادث والاختراقات الأمنية' : 'Security Breach Notification'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'في حالة وقوع أي حادث أمني أو خرق غير مشروع للبيانات الشخصية قد يؤثر على حقوقك، نلتزم بإشعار الهيئة السعودية للبيانات والذكاء الاصطناعي (سدايا) وأصحاب البيانات المتضررين خلال المدة النظامية المحددة في لوائح نظام PDPL، مع بيان طبيعة الحادث والإجراءات التصحيحية المتخذة فوراً.'
                : 'In the unforeseen event of a confirmed security incident or unauthorized breach impacting personal data, AEITCH is committed to notifying SDAIA and impacted data subjects within statutory reporting windows, outlining incident scope and immediate remedial containment measures.'}
            </p>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">12.</span>
              <span>{locale === 'ar' ? 'التحديثات والتعديلات' : 'Policy Revisions & Updates'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'قد نقوم بتحديث هذه السياسة من حين لآخر لمواكبة التعديلات في الأنظمة السعودية أو التطورات في ممارساتنا الهندسية. يُنشر أي تعديل على هذه الصفحة مع تحديث تاريخ "آخر تحديث". يُعد استمرارك في استخدام الموقع بعد التحديث إقراراً باطلاعك على السياسة المعدلة.'
                : 'We may update this policy periodically to reflect statutory amendments to Saudi regulations or evolving engineering procedures. Revisions take effect upon publication with an updated effective date. Continued engagement constitutes acknowledgment of updated terms.'}
            </p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-fg flex items-center gap-2">
              <span className="text-accent font-mono text-base">13.</span>
              <span>{locale === 'ar' ? 'معلومات التواصل والاستفسارات' : 'Official Contact Information'}</span>
            </h2>
            <p>
              {locale === 'ar'
                ? 'لأي استفسارات حول سياسة الخصوصية، أو لتقديم طلب يتعلق بحقوقك النظامية بموجب نظام PDPL، يرجى التواصل معنا عبر القنوات الرسمية التالية:'
                : 'For any privacy inquiries or to exercise your rights under the Saudi PDPL, contact our legal and privacy team through our verified channels:'}
            </p>
            <div className="rounded-xl border border-border bg-surface p-5 space-y-2 text-xs sm:text-sm font-mono text-fg">
              <div><strong>البريد الإلكتروني / Email:</strong> hello@aeitch.com</div>
              <div><strong>واتساب / WhatsApp:</strong> +92 318 4055723</div>
              <div><strong>المقر الهندسي / Engineering Hub:</strong> Islamabad, Pakistan (UTC+5)</div>
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
            href="/terms-of-service"
            className="text-xs font-mono text-fg-subtle hover:text-accent transition-colors underline"
          >
            {locale === 'ar' ? 'شروط الخدمة والتعاقد' : 'Terms of Service'}
          </Link>
        </div>
      </div>
    </div>
  );
}
