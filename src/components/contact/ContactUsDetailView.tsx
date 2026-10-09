"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  FileText,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { BRAND } from '@/lib/constants';
import { TrustBadges } from '@/components/common/trust-badges';

export function ContactUsDetailView() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const ArrowIcon = isAr ? ArrowLeft : ArrowRight;

  const [activeTab, setActiveTab] = useState<'consultation' | 'scope'>('consultation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceRequested: 'ai-automation',
    projectLink: '',
    message: '',
    meetingDate: '',
    meetingTime: '02:00 PM (Riyadh / GMT+3)',
    website_hp: '', // Honeypot
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSubmitSuccess(null);

    const endpoint = activeTab === 'consultation' ? '/api/consultation' : '/api/contact';

    // Format payload for existing backend
    const payload = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      serviceRequested: formData.serviceRequested,
      budgetRange: 'Scoped Proposal',
      timeline: 'Standard',
      message: `${formData.phone ? `[Phone: ${formData.phone}] ` : ''}${formData.projectLink ? `[Specs Link: ${formData.projectLink}] ` : ''}${formData.message}`,
      meetingDate: formData.meetingDate,
      meetingTime: formData.meetingTime,
      website_hp: formData.website_hp,
    };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || (isAr ? 'فشل إرسال الطلب. يرجى التحقق من الحقول.' : 'Failed to submit form. Please check the inputs.'));
      }

      setSubmitSuccess(
        isAr
          ? 'تم تأكيد طلبك بنجاح! سيتواصل معك أحد كبار مهندسينا المعماريين خلال 24 ساعة عمل.'
          : 'Request confirmed! One of our senior architects will reach out within 24 business hours.'
      );
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceRequested: 'ai-automation',
        projectLink: '',
        message: '',
        meetingDate: '',
        meetingTime: '02:00 PM (Riyadh / GMT+3)',
        website_hp: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || (isAr ? 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.' : 'An unexpected error occurred. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black" dir={direction}>
      {/* 1. HERO */}
      <section className="relative w-full overflow-hidden bg-[#080808] pt-28 pb-16 sm:pt-36 sm:pb-20 border-b border-white/10">
        <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-15" />
        <div className="pointer-events-none absolute top-1/4 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#e9800a]/10 rounded-full blur-[150px]" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a]/30 bg-[#e9800a]/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <Sparkles className="h-4 w-4 text-[#e9800a]" />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
              {isAr ? 'تواصل معنا' : 'CONTACT AEITCH'}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            {isAr ? 'لنهندس ما هو قادم.' : 'Let’s engineer what’s next.'}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed mb-8">
            {isAr
              ? 'سواء كنت تطلق منتجًا، أو تحسّن بنيتك السحابية، أو تستكشف الأتمتة بالذكاء الاصطناعي، فريقنا جاهز للتعاون.'
              : 'Whether you’re launching a product, improving your cloud infrastructure, or exploring AI automation, our team is ready to collaborate.'}
          </p>

          {/* BOOKING BUTTON FIRST */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4">
            <a
              href="#contact-form"
              onClick={() => setActiveTab('consultation')}
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm active:scale-95"
            >
              <Calendar className="h-4 w-4" />
              <span>{isAr ? 'احجز استشارة 30 دقيقة مباشرة' : 'Book a 30-Minute Consultation'}</span>
            </a>
            <a
              href={BRAND.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3.5 text-sm font-bold text-emerald-400 hover:bg-emerald-500/20 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              <span>{isAr ? 'محادثة واتساب سريعة' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. TRUST BADGES */}
      <TrustBadges />

      {/* 3. TWO HELPER BOXES (NDA & SPECS) */}
      <section className="py-12 bg-[#0c0c0e] border-b border-white/10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Box 1: NDA First */}
            <div className="rounded-2xl border border-white/10 bg-[#121215] p-6 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-[#e9800a]/10 text-[#e9800a] flex items-center justify-center shrink-0">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {isAr ? 'تحتاج اتفاقية سرية أولًا؟' : 'Need an NDA first?'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'بكل سرور، نوقّع اتفاقية سرية متبادلة (Mutual NDA) لحماية بياناتك وأفكارك قبل مناقشة أي تفاصيل.'
                    : 'Happy to sign a mutual NDA before discussing details, protecting your data and ideas from day one.'}
                </p>
              </div>
            </div>

            {/* Box 2: Already have specs */}
            <div className="rounded-2xl border border-white/10 bg-[#121215] p-6 flex items-start gap-4">
              <div className="h-11 w-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {isAr ? 'لديك مواصفات أو فكرة جاهزة؟' : 'Already have specs or an idea?'}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {isAr
                    ? 'أرفق رابطها أو وثيقتها في النموذج أدناه، وسيراجعها فريقنا الهندسي بدقة قبل موعد المكالمة.'
                    : 'Attach them below or share a link, and our senior engineering team will review them before our call.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN FORM & CONTACT DETAILS */}
      <section id="contact-form" className="py-20 sm:py-28 bg-[#080808]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
                  {isAr ? 'معلومات التواصل' : 'DIRECT DESK'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {isAr ? 'تواصل مع فريقنا الهندسي' : 'Direct Access to Senior Leads'}
                </h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {isAr
                    ? 'نرد على جميع الاستفسارات المؤسسية خلال 24 ساعة عمل بتقييم معماري أولي.'
                    : 'We respond to all qualified inquiries within 24 business hours with a preliminary architectural evaluation.'}
                </p>
              </div>

              <div className="space-y-4">
                {/* Phone & WhatsApp */}
                <div className="rounded-2xl border border-white/10 bg-[#121215] p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-[#e9800a]/10 text-[#e9800a] flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400">
                      {isAr ? 'الهاتف المباشر وواتساب' : 'Direct Phone & WhatsApp'}
                    </div>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-bold text-white hover:text-[#e9800a] transition-colors mt-0.5 inline-block"
                      dir="ltr"
                    >
                      +92 318 4055723
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="rounded-2xl border border-white/10 bg-[#121215] p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400">
                      {isAr ? 'البريد الإلكتروني' : 'Engineering Desk'}
                    </div>
                    <a
                      href="mailto:hello@aeitch.com"
                      className="text-base font-bold text-white hover:text-[#e9800a] transition-colors mt-0.5 inline-block"
                      dir="ltr"
                    >
                      hello@aeitch.com
                    </a>
                  </div>
                </div>

                {/* Location / Base */}
                <div className="rounded-2xl border border-white/10 bg-[#121215] p-5 flex items-start gap-4">
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-neutral-400">
                      {isAr ? 'المقر الهندسي' : 'Engineering Base'}
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {isAr ? 'إسلام آباد، باكستان (UTC+5)' : 'Islamabad, Pakistan (UTC+5)'}
                    </div>
                    <div className="text-xs text-neutral-400 mt-1">
                      {isAr ? 'فارق ساعتين عن توقيت الرياض (تداخل كامل في ساعات العمل)' : '2 hours ahead of Riyadh with full daily working overlap'}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick Button */}
                <a
                  href={BRAND.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white hover:bg-emerald-500 transition-colors shadow-lg active:scale-95"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{isAr ? 'مراسلتنا عبر واتساب' : 'Open WhatsApp Chat'}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-white/10 bg-[#121215] p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                {/* Mode Selector Tabs */}
                <div className="flex rounded-2xl bg-black/40 p-1.5 border border-white/10 mb-8">
                  <button
                    type="button"
                    onClick={() => setActiveTab('consultation')}
                    className={`flex-1 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'consultation'
                        ? 'bg-[#e9800a] text-black shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>{isAr ? 'حجز استشارة' : 'Book Consultation'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('scope')}
                    className={`flex-1 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'scope'
                        ? 'bg-[#e9800a] text-black shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <FileText className="h-4 w-4" />
                    <span>{isAr ? 'إرسال نطاق المشروع' : 'Submit Project Scope'}</span>
                  </button>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-black mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {isAr ? 'تم استلام طلبك!' : 'Request Received!'}
                    </h3>
                    <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                      {submitSuccess}
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(null)}
                      className="rounded-xl bg-[#e9800a] px-6 py-2.5 text-xs font-bold text-black hover:bg-[#ff9420] transition-colors"
                    >
                      {isAr ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Honeypot field (hidden from view) */}
                    <input
                      type="text"
                      name="website_hp"
                      value={formData.website_hp}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    {errorMessage && (
                      <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-300">
                        <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          {isAr ? 'الاسم الكامل *' : 'Full Name *'}
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={isAr ? 'محمد العتيبي' : 'Alex Morgan'}
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          {isAr ? 'البريد المهني *' : 'Work Email *'}
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          {isAr ? 'الجوال / واتساب *' : 'Phone / WhatsApp *'}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+966 5X XXX XXXX / +92 3XX"
                          dir="ltr"
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                          {isAr ? 'الشركة / المؤسسة' : 'Company / Organization'}
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={isAr ? 'اسم الشركة' : 'Company Name'}
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Service Selection (4 Services + Vision 2030 + Not Sure) */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        {isAr ? 'الخدمة المطلوبة *' : 'Service Requested *'}
                      </label>
                      <select
                        name="serviceRequested"
                        value={formData.serviceRequested}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                      >
                        <option value="ai-automation" className="bg-[#121215] text-white">
                          {isAr ? 'الذكاء الاصطناعي والأتمتة' : 'AI Automation & Integration'}
                        </option>
                        <option value="product-development" className="bg-[#121215] text-white">
                          {isAr ? 'تطوير المنتجات' : 'Product Development'}
                        </option>
                        <option value="cloud-devops" className="bg-[#121215] text-white">
                          {isAr ? 'DevOps وهندسة السحابة' : 'DevOps & Cloud Engineering'}
                        </option>
                        <option value="custom-software" className="bg-[#121215] text-white">
                          {isAr ? 'البرمجيات المخصصة' : 'Custom Software Development'}
                        </option>
                        <option value="vision-2030" className="bg-[#121215] text-white">
                          {isAr ? 'استشارة ومواءمة رؤية 2030' : 'Vision 2030 Strategic Alignment'}
                        </option>
                        <option value="not-sure" className="bg-[#121215] text-white">
                          {isAr ? 'لست متأكدًا (نريد استشارة استكشافية)' : 'Not sure (Need exploration call)'}
                        </option>
                      </select>
                    </div>

                    {activeTab === 'consultation' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                            {isAr ? 'اليوم المفضل *' : 'Preferred Date *'}
                          </label>
                          <input
                            type="date"
                            name="meetingDate"
                            required={activeTab === 'consultation'}
                            value={formData.meetingDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                            {isAr ? 'الوقت المفضل *' : 'Preferred Time (Riyadh / GMT+3) *'}
                          </label>
                          <select
                            name="meetingTime"
                            value={formData.meetingTime}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                          >
                            <option value="11:00 AM (Riyadh / GMT+3)" className="bg-[#121215] text-white">
                              11:00 AM Riyadh (GMT+3)
                            </option>
                            <option value="02:00 PM (Riyadh / GMT+3)" className="bg-[#121215] text-white">
                              02:00 PM Riyadh (GMT+3)
                            </option>
                            <option value="04:00 PM (Riyadh / GMT+3)" className="bg-[#121215] text-white">
                              04:00 PM Riyadh (GMT+3)
                            </option>
                            <option value="06:00 PM (Riyadh / GMT+3)" className="bg-[#121215] text-white">
                              06:00 PM Riyadh (GMT+3)
                            </option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Project Link / Specs */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        {isAr ? 'رابط الملف أو وثيقة المواصفات (اختياري)' : 'Link to Specs / Deck / Drive (Optional)'}
                      </label>
                      <div className="relative">
                        <input
                          type="url"
                          name="projectLink"
                          value={formData.projectLink}
                          onChange={handleChange}
                          placeholder="https://drive.google.com/... or Figma / Notion"
                          dir="ltr"
                          className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 pe-10 text-sm text-white placeholder-neutral-500 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                        <Paperclip className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
                      </div>
                    </div>

                    {/* Brief description */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                        {isAr ? 'وصف مختصر للمشروع' : 'Brief Project Description'}
                      </label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={
                          isAr
                            ? 'أخبرنا عن أهدافك، التحديات التقنية، والأنظمة الحالية التي تريد دمجها...'
                            : 'Tell us about your objectives, technical hurdles, and systems to integrate...'
                        }
                        className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-white placeholder-neutral-500 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] py-4 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-glow-sm disabled:opacity-50 active:scale-[0.99] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>{isAr ? 'جارٍ الإرسال...' : 'Submitting...'}</span>
                      ) : (
                        <>
                          <span>{isAr ? 'أرسل الطلب' : 'Send Request'}</span>
                          <ArrowIcon className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    {/* Microcopy Privacy */}
                    <p className="text-center text-xs text-neutral-400 mt-4 leading-relaxed">
                      {isAr ? (
                        <>
                          نستخدم بياناتك للرد على طلبك فقط، وفق{' '}
                          <Link href="/privacy-policy" className="text-[#e9800a] underline hover:text-white">
                            سياسة الخصوصية
                          </Link>
                          .
                        </>
                      ) : (
                        <>
                          We use your details only to respond to your request, per our{' '}
                          <Link href="/privacy-policy" className="text-[#e9800a] underline hover:text-white">
                            Privacy Policy
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
