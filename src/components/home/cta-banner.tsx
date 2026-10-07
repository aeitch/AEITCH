"use client";

import React, { useState } from 'react';
import { Send, CheckCircle2, ShieldCheck, Clock, MessageSquare, Sparkles } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export function CtaBanner() {
  const { t, direction, locale } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequested: 'ai-automation',
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
      ? `السلام عليكم، أود التنسيق مع فريق إيتش لحجز جلسة استشارة تقنية لمعمارية مشروعنا.`
      : `Hello AEITCH team, I would like to schedule a technical architecture session.`
  );

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
              <span>{t.consultation.sectionTag}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-fg tracking-tight leading-tight">
              {t.consultation.heading}
            </h2>

            <p className="text-base text-fg-muted leading-relaxed font-normal">
              {t.consultation.subheading}
            </p>

            <div className="space-y-3 pt-2 text-xs text-fg-muted">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span>{t.common.gmt3Badge}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-fg-subtle shrink-0" />
                <span>{t.common.pdplBadge}</span>
              </div>
            </div>

            {/* Direct WhatsApp Action Link */}
            <div className="pt-4">
              <a
                href={`https://wa.me/966500000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-xl border border-border bg-surface px-5 py-3 text-xs sm:text-sm font-semibold text-fg hover:border-accent hover:text-accent hover:bg-surface-2 transition-all shadow-sm"
              >
                <MessageSquare className="h-4 w-4 text-accent" />
                <span>{t.consultation.whatsappDirect}</span>
              </a>
            </div>
          </div>

          {/* Right Column (7 Cols): The Consultation & Scoping Form */}
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
              {/* Subtle Ambient Glow */}
              <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-fg mb-2">
                    {locale === 'ar' ? 'تم استلام طلبك بنجاح' : 'Inquiry Confirmed'}
                  </h3>
                  <p className="max-w-md text-fg-muted text-sm mb-6 leading-relaxed">
                    {t.consultation.successMessage}
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
                  >
                    {locale === 'ar' ? 'إرسال طلب آخر' : 'Submit Another Request'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-fg mb-4">
                    {t.consultation.formTitle}
                  </h3>

                  {/* Honeypot field */}
                  <input
                    type="text"
                    name="website_hp"
                    value={formData.website_hp}
                    onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {t.consultation.nameLabel} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.consultation.namePlaceholder}
                        className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {t.consultation.emailLabel} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.consultation.emailPlaceholder}
                        className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {t.consultation.phoneLabel} <span className="text-accent">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        dir="ltr"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.consultation.phonePlaceholder}
                        className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors text-start"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {t.consultation.companyLabel}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t.consultation.companyPlaceholder}
                        className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {t.consultation.serviceLabel}
                      </label>
                      <select
                        value={formData.serviceRequested}
                        onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                        className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      >
                        <option value="ai-automation">
                          {locale === 'ar' ? 'الذكاء الاصطناعي والوكلاء الأذكياء' : 'Applied AI & Autonomous Agents'}
                        </option>
                        <option value="cloud-devops">
                          {locale === 'ar' ? 'السحابة السيادية وحلول ديف أوبس' : 'Sovereign Cloud & DevOps'}
                        </option>
                        <option value="custom-software">
                          {locale === 'ar' ? 'البرمجيات المؤسسية المخصصة' : 'Custom Enterprise Software'}
                        </option>
                        <option value="mvp-development">
                          {locale === 'ar' ? 'تطوير النماذج الأولية (MVPs)' : 'Rapid MVP Development (8 Weeks)'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                        {t.consultation.scopeLabel}
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                        className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                      >
                        <option value="mvp">
                          {locale === 'ar' ? 'مشروع ناشئ / نموذج أولي (MVP)' : 'Startup MVP / Fast Launch'}
                        </option>
                        <option value="enterprise">
                          {locale === 'ar' ? 'تطوير مؤسسي / تحول رقمي شامل' : 'Enterprise Digital Transformation'}
                        </option>
                        <option value="advisory">
                          {locale === 'ar' ? 'استشارات معمارية وتدقيق أمني' : 'Architectural Audit & Advisory'}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-medium text-fg-muted mb-1.5">
                      {t.consultation.notesLabel}
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.consultation.notesPlaceholder}
                      className="w-full rounded-xl border border-border bg-bg px-4 py-2.5 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <div className="flex items-center gap-2 text-xs text-fg-subtle">
                      <ShieldCheck className="h-4 w-4 text-accent shrink-0" />
                      <span>{t.consultation.disclaimer}</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-all shadow-glow-sm hover:shadow-glow-md disabled:opacity-60 active:scale-[0.98]"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isSubmitting ? t.consultation.submittingCta : t.consultation.submitCta}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
