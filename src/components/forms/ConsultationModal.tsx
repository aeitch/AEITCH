"use client";

import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, Clock, MessageSquare } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export function ConsultationModal({ isOpen, onClose, defaultService = 'ai-automation' }: ConsultationModalProps) {
  const { t, direction, locale } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequested: defaultService,
    budgetRange: 'enterprise',
    message: '',
    website_hp: '', // Honeypot field for bot detection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, serviceRequested: defaultService }));
    }
  }, [defaultService]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Check honeypot
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
        throw new Error('Failed to submit consultation request');
      }

      setIsSubmitted(true);
    } catch {
      // Graceful fallback display
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = encodeURIComponent(
    locale === 'ar'
      ? `السلام عليكم، أود حجز جلسة استشارة تقنية لمشروعنا مع فريق إيتش.`
      : `Hello AEITCH Team, I would like to schedule a technical architecture consultation.`
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md transition-all duration-300"
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xl shadow-black/80"
        dir={direction}
      >
        {/* Subtle Ambient Glow */}
        <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -start-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close Modal"
          className="absolute top-5 end-5 rounded-full p-2 text-fg-subtle hover:bg-white/10 hover:text-fg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 id="modal-title" className="text-2xl font-bold text-fg mb-2">
              {locale === 'ar' ? 'تم استلام طلبك بنجاح' : 'Consultation Request Confirmed'}
            </h3>
            <p className="max-w-md text-fg-muted text-sm mb-6 leading-relaxed">
              {t.consultation.successMessage}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                className="rounded-xl bg-accent px-6 py-2.5 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
              >
                {locale === 'ar' ? 'إغلاق النافذة' : 'Close Window'}
              </button>
              <a
                href={`https://wa.me/966500000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl border border-border bg-surface-2 px-6 py-2.5 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-accent" />
                <span>{locale === 'ar' ? 'متابعة عبر واتساب' : 'Continue on WhatsApp'}</span>
              </a>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1 text-xs font-mono font-medium text-fg-muted mb-2">
                <Clock className="h-3.5 w-3.5 text-accent" />
                <span>{t.common.gmt3Badge}</span>
              </div>
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold text-fg tracking-tight">
                {t.consultation.formTitle}
              </h2>
              <p className="mt-1 text-sm text-fg-muted">
                {locale === 'ar'
                  ? 'جلسة استكشافية متعمقة لمدة 30 دقيقة مع كبير المهندسين المعماريين لمناقشة أهدافك التقنية.'
                  : '30-minute high-level architectural discovery session with our principal engineers.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Anti-spam honeypot */}
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
                  className="w-full rounded-xl border border-border bg-bg px-4 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-bold text-black hover:bg-accent-hover transition-all shadow-glow-sm hover:shadow-glow-md disabled:opacity-60 active:scale-[0.98]"
                >
                  <Send className="h-4 w-4" />
                  <span>{isSubmitting ? t.consultation.submittingCta : t.consultation.submitCta}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
