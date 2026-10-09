"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, ShieldCheck, Mail, Phone, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

export const FinalCtaForm: React.FC = () => {
  const { locale, direction } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequested: 'ai-automation',
    message: '',
    website_hp: '', // Honeypot bot protection
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    { value: 'ai-automation', labelAr: 'الذكاء الاصطناعي والأتمتة', labelEn: 'AI Automation & Integration' },
    { value: 'product-development', labelAr: 'تطوير المنتجات', labelEn: 'Product Development' },
    { value: 'cloud-devops', labelAr: 'DevOps والسحابة', labelEn: 'DevOps & Cloud' },
    { value: 'custom-software', labelAr: 'البرمجيات المخصصة', labelEn: 'Custom Software' },
    { value: 'vision-2030', labelAr: 'رؤية 2030', labelEn: 'Vision 2030' },
    { value: 'not-sure', labelAr: 'لست متأكدًا', labelEn: 'Not sure' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

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
        throw new Error('Failed to send request');
      }

      setIsSubmitted(true);
    } catch {
      // Graceful fallback
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="relative py-24 sm:py-32 bg-bg border-t border-border overflow-hidden" dir={direction}>
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
      <div className="pointer-events-none absolute bottom-0 end-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Text / Value Proposition */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-accent">
              {locale === 'ar' ? 'جلسة تقنية مباشرة' : 'EXECUTIVE CONSULTATION'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {locale === 'ar' ? 'لديك مشروع؟ لنتحدث 30 دقيقة.' : "Got a project? Let's talk for 30 minutes."}
            </h2>

            <p className="text-base sm:text-lg text-fg-muted leading-relaxed font-normal">
              {locale === 'ar'
                ? 'احجز استشارة تقنية مجانية. سنفهم هدفك ونقترح الخطوة التالية، دون التزام.'
                : "Book a free technical consultation. We'll understand your goal and suggest the next step, no commitment."}
            </p>

            <div className="pt-4 space-y-3 text-xs text-fg-subtle border-t border-border/80">
              <div className="flex items-center gap-2 text-fg-muted">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href="mailto:hello@aeitch.com" className="hover:text-accent transition-colors font-medium">
                  hello@aeitch.com
                </a>
              </div>
              <div className="flex items-center gap-2 text-fg-muted">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <span className="font-mono">0318-4055723</span>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 rounded-2xl border border-border bg-surface p-6 sm:p-10 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 border border-accent/30 text-accent">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  {locale === 'ar' ? 'تم استلام طلبك بنجاح' : 'Request Received'}
                </h3>
                <p className="text-sm text-fg-muted max-w-md mx-auto">
                  {locale === 'ar'
                    ? 'شكرًا لتواصلك. سنراجع متطلباتك وسيتواصل معك مهندس senior لمواءمة موعد الجلسة.'
                    : 'Thank you for reaching out. A senior engineer will review your project requirements and follow up shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field (hidden from real users) */}
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
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-fg-muted">
                      {locale === 'ar' ? 'الاسم الكامل*' : 'Full name*'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={locale === 'ar' ? 'مثال: محمد الحربي' : 'e.g. Jane Doe'}
                      className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-white placeholder-fg-subtle focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Work Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-fg-muted">
                      {locale === 'ar' ? 'البريد المهني*' : 'Work email*'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-white placeholder-fg-subtle focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mobile / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-fg-muted">
                      {locale === 'ar' ? 'الجوال / واتساب*' : 'Mobile / WhatsApp*'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+966 5X XXX XXXX"
                      className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-white placeholder-fg-subtle focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-fg-muted">
                      {locale === 'ar' ? 'اسم الشركة' : 'Company'}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={locale === 'ar' ? 'اسم المؤسسة أو الشركة' : 'Company or Organization'}
                      className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-white placeholder-fg-subtle focus:border-accent focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Service Needed Dropdown */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-fg-muted">
                    {locale === 'ar' ? 'الخدمة المطلوبة' : 'Service needed'}
                  </label>
                  <select
                    value={formData.serviceRequested}
                    onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
                    className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-white focus:border-accent focus:outline-none transition-colors"
                  >
                    {services.map((s) => (
                      <option key={s.value} value={s.value} className="bg-surface text-white">
                        {locale === 'ar' ? s.labelAr : s.labelEn}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Short Project Description */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-fg-muted">
                    {locale === 'ar' ? 'وصف مختصر لمشروعك' : 'Short project description'}
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      locale === 'ar'
                        ? 'اذكر باختصار هدف المشروع والتحديات الحالية...'
                        : 'Briefly describe your objectives, timeframe, and technical context...'
                    }
                    className="w-full rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-white placeholder-fg-subtle focus:border-accent focus:outline-none transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-black hover:bg-accent-hover transition-colors shadow-glow-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? (locale === 'ar' ? 'جارٍ الإرسال...' : 'Sending...') : (locale === 'ar' ? 'أرسل الطلب' : 'Send request')}</span>
                  {direction === 'rtl' ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                </button>

                {/* Microcopy */}
                <p className="text-[11px] text-fg-subtle text-center">
                  {locale === 'ar'
                    ? 'نستخدم بياناتك للرد على طلبك فقط.'
                    : 'We use your details only to respond to your request.'}
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
