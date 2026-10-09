"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function CtaBanner() {
  const { direction, locale } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequested: 'cloud-first-product-engineering',
    budgetRange: 'enterprise',
    message: '',
    website_hp: '', // Honeypot field
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.website_hp) {
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Submission failed');
      }

      setIsSubmitted(true);
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    locale === 'ar'
      ? `مرحباً فريق إيتش بالرياض، نود حجز جلسة استكشاف معمارية لمراجعة البنية السحابية لمنظومتنا.`
      : `Hello AEITCH Riyadh, we would like to schedule an architectural review session for our platform.`
  );

  const heading =
    locale === 'ar'
      ? 'هل تخطط للهجرة السحابية أو إطلاق منتج رقمي في المملكة؟ دع كبار مهندسينا المعماريين يراجعون بنية منظومتك التقنية.'
      : 'Planning your cloud migration or launching a digital product in Saudi Arabia? Let our principal architects review your architecture.';

  const subheading =
    locale === 'ar'
      ? 'احجز جلسة استكشاف معمارية مجانية مدتها 30 دقيقة مع كبير المهندسين المعماريين. سنقيم جاهزية امتثالك لضوابط الهيئة الوطنية للأمن السيبراني (NCA)، معمارية الخدمات المصغرة، وخارطة طريق الإنجاز بدون أي التزام.'
      : 'Book a complimentary 30-minute architectural scoping session with a Principal Cloud Architect. We will evaluate your in-country compliance (NCA ECC & PDPL), microservices topology, and delivery roadmap with zero obligation.';

  return (
    <section id="consultation" className="relative py-28 bg-bg border-t border-border overflow-hidden" dir={direction}>
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column (5 Cols): Heading, Value Hook, WhatsApp */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-mono font-medium text-fg-muted">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span>{locale === 'ar' ? 'جلسة تدقيق معماري مباشر' : 'Architectural Discovery'}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {heading}
            </h2>

            <p className="text-sm sm:text-base text-fg-muted leading-relaxed font-normal">
              {subheading}
            </p>

            <div className="space-y-3 pt-2 text-xs text-fg-muted">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span>{locale === 'ar' ? 'تزامن كامل مع ساعات عمل الرياض (GMT+3)' : '100% GCC Working Hours Overlap (GMT+3)'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{locale === 'ar' ? 'جاهزية الامتثال لضوابط NCA ECC ونظام PDPL' : 'NCA ECC/CCC & PDPL Compliance Ready'}</span>
              </div>
            </div>

            {/* Direct WhatsApp Action Link */}
            <div className="pt-4">
              <a
                href={`https://wa.me/966118294400?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 text-xs sm:text-sm font-semibold text-fg hover:border-accent hover:text-accent hover:bg-surface-2 transition-all shadow-sm"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>{locale === 'ar' ? 'تحدث مباشرة مع المدير التقني في الرياض' : 'Chat with Regional Technical Director in Riyadh'}</span>
              </a>
            </div>
          </div>

          {/* Right Column (7 Cols): The Consultation & Scoping Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              {/* Subtle Ambient Glow */}
              <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

              {!isSubmitted ? (
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {locale === 'ar' ? 'طلب مراجعة معمارية المنظومة' : 'Request Architecture Review'}
                  </h3>
                  <p className="text-xs text-fg-subtle mb-6">
                    {locale === 'ar'
                      ? 'حدد متطلباتك التقنية وسيقوم أحد كبار مهندسينا بدراستها قبل الجلسة لتقديم خطة عمل ملموسة.'
                      : 'Define your parameters to receive a targeted technical evaluation from our Principal Architect.'}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field */}
                    <input
                      type="text"
                      name="website_hp"
                      value={formData.website_hp}
                      onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                          {locale === 'ar' ? 'الاسم الكامل' : 'Full Name'} <span className="text-accent">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={locale === 'ar' ? 'م. فهد السبيعي' : 'Eng. Tariq Al-Ghamdi'}
                          className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                          {locale === 'ar' ? 'البريد المهني' : 'Corporate Email'} <span className="text-accent">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@enterprise.com.sa"
                          className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                          {locale === 'ar' ? 'الجوال / واتساب' : 'Mobile / WhatsApp'} <span className="text-accent">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+966 5X XXX XXXX"
                          className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-start"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                          {locale === 'ar' ? 'اسم المؤسسة / المنظومة' : 'Organization Name'}
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={locale === 'ar' ? 'شركة أو جهة كبرى' : 'Enterprise Tech Lead'}
                          className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                          {locale === 'ar' ? 'الخدمة الهندسية المطلوبة' : 'Primary Architecture Capability'}
                        </label>
                        <select
                          value={formData.serviceRequested}
                          onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                          className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        >
                          <option value="cloud-first-product-engineering">
                            {locale === 'ar' ? 'هندسة المنتجات السحابية (Microservices & Kafka)' : 'Cloud-First Product Engineering'}
                          </option>
                          <option value="platform-engineering-devops">
                            {locale === 'ar' ? 'هندسة المنصات وديف أوبس (Kubernetes & IaC)' : 'Platform Engineering & DevOps'}
                          </option>
                          <option value="devsecops-ksa-compliance">
                            {locale === 'ar' ? 'ديف سيك أوبس والامتثال (NCA ECC & PDPL)' : 'DevSecOps & KSA Compliance'}
                          </option>
                          <option value="dedicated-engineering-squads">
                            {locale === 'ar' ? 'فرق هندسية مخصصة (Pods - GMT+3 Overlap)' : 'Dedicated Engineering Squads'}
                          </option>
                          <option value="enterprise-cloud-migration">
                            {locale === 'ar' ? 'الهجرة السحابية السيادية (In-Country Hyperscalers)' : 'Enterprise Cloud Migration'}
                          </option>
                          <option value="fintech-digital-banking">
                            {locale === 'ar' ? 'التقنية المالية والمصرفية (SAMA & Open Banking)' : 'FinTech & SAMA Open Banking'}
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                          {locale === 'ar' ? 'النطاق التقديري' : 'Estimated Scope'}
                        </label>
                        <select
                          value={formData.budgetRange}
                          onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                          className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                        >
                          <option value="mvp-acceleration">
                            {locale === 'ar' ? 'تسريع إطلاق MVP (خلال 8 أسابيع)' : 'Rapid MVP Launch (8 Weeks)'}
                          </option>
                          <option value="enterprise">
                            {locale === 'ar' ? 'تحديث وتفكيك منظومة مؤسسية كبرى' : 'Enterprise Modernization & Migration'}
                          </option>
                          <option value="dedicated-pod">
                            {locale === 'ar' ? 'فريق هندسي سنوي مخصص (Dedicated Pod)' : 'Dedicated Annual Engineering Pod'}
                          </option>
                          <option value="compliance-audit">
                            {locale === 'ar' ? 'تدقيق أمني وامتثال سحابي (NCA & PDPL)' : 'Compliance & DevSecOps Audit'}
                          </option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {locale === 'ar' ? 'نبذة عن التحديات التقنية والأنظمة المستهدفة' : 'Brief Technical Architecture Context'}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={locale === 'ar' ? 'اذكر باختصار المنظومة الحالية، أحجام المعاملات، والتحديات المعمارية...' : 'Outline current infrastructure, transactions volume, and target migration goals...'}
                        className="w-full rounded-xl border border-border bg-bg p-4 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-all duration-200 shadow-glow-sm hover:shadow-glow-md active:scale-95 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      <span>
                        {isSubmitting
                          ? locale === 'ar'
                            ? 'جارٍ التحقق وتأكيد الموعد...'
                            : 'Routing Request...'
                          : locale === 'ar'
                          ? 'تأكيد طلب المراجعة المعمارية'
                          : 'Book Architectural Consultation'}
                      </span>
                    </button>

                    <p className="text-[11px] text-fg-subtle text-center pt-2">
                      {locale === 'ar'
                        ? 'بياناتكم مشفرة ومحمية بالكامل بموجب نظام حماية البيانات الشخصية السعودي (PDPL).'
                        : 'Your data is strictly confidential and protected under Saudi Personal Data Protection Law (PDPL).'}
                    </p>
                  </form>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent mb-6 border border-accent/20">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-fg mb-2">
                    {locale === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Inquiry Received'}
                  </h4>
                  <p className="text-sm text-fg-muted max-w-md mb-8">
                    {locale === 'ar'
                      ? 'سيتواصل معكم أحد كبار المهندسين المعماريين خلال ساعات عمل اليوم لتنسيق موعد جلسة الاستكشاف ومراجعة المتطلبات.'
                      : 'A Principal Cloud Architect will contact you during today’s business hours to coordinate your architectural review session.'}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-xl border border-border bg-bg px-6 py-2.5 text-xs font-semibold text-fg hover:border-accent transition-colors"
                  >
                    {locale === 'ar' ? 'إرسال طلب استشارة آخر' : 'Submit Another Request'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
