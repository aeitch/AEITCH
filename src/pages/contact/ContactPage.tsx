import React, { useState, useEffect, useRef, useId, FormEvent, ChangeEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { contactConfig } from '../../config/contactConfig';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

interface ServiceOption {
  id: string;
  name: string;
  accent: string;
  videoSrc?: string;
  aliases: string[];
}

const SERVICES: ServiceOption[] = [
  {
    id: 'ai-automation',
    name: 'AI Automation',
    accent: '#FFC247',
    videoSrc: '/videos/video-53.mp4', // Lightning bolt
    aliases: ['ai', 'ai-automation', 'automation', 'agents'],
  },
  {
    id: 'product-development',
    name: 'Product Development',
    accent: '#5EEAD4',
    videoSrc: '/videos/video-55.mp4', // Shield / Blades
    aliases: ['product', 'product-dev', 'product-development', 'mvp', 'saas'],
  },
  {
    id: 'devops-cloud',
    name: 'DevOps & Cloud',
    accent: '#FF8F9B',
    videoSrc: '/videos/video-48.mp4', // Pink flower
    aliases: ['devops', 'cloud', 'devops-cloud', 'infra', 'kubernetes'],
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    accent: '#62B6FF',
    videoSrc: '/videos/video-51.mp4', // Blue pebble / gem
    aliases: ['custom', 'software', 'custom-software', 'enterprise', 'backend'],
  },
  {
    id: 'not-sure',
    name: 'Not sure yet',
    accent: '#FFC247',
    aliases: ['not-sure', 'other', 'general'],
  },
];

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export const ContactPage: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState('ai-automation');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');

  // Touch tracking for blur validation
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission status: 'idle' | 'submitting' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  // Refs for focus management
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];

  // Unique IDs for accessibility
  const nameId = useId();
  const emailId = useId();
  const companyId = useId();
  const phoneId = useId();
  const messageId = useId();

  // Preselect service from URL query parameter (e.g. /contact?service=devops)
  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const serviceParam = searchParams.get('service');
      if (serviceParam) {
        const queryLower = serviceParam.toLowerCase().trim();
        const matched = SERVICES.find((s) => s.aliases.includes(queryLower) || s.id === queryLower);
        if (matched) {
          setSelectedServiceId(matched.id);
        }
      }
    } catch {
      // Fallback to default
    }
  }, []);

  // Handle anchor scroll on mount
  useEffect(() => {
    if (window.location.hash === '#contact-form') {
      setTimeout(() => {
        const elem = document.getElementById('contact-form');
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  // Move focus to success heading when status changes to 'success'
  useEffect(() => {
    if (status === 'success' && successHeadingRef.current) {
      successHeadingRef.current.focus();
    }
  }, [status]);

  // Field validation logic
  const validateField = (field: 'name' | 'email' | 'message', val: string): string => {
    if (field === 'name') {
      if (!val.trim()) return 'Full name is required';
      if (val.trim().length > 100) return 'Name cannot exceed 100 characters';
    }
    if (field === 'email') {
      if (!val.trim()) return 'Work email is required';
      if (!EMAIL_REGEX.test(val.trim())) return 'Please enter a valid work email address';
      if (val.trim().length > 254) return 'Email cannot exceed 254 characters';
    }
    if (field === 'message') {
      if (!val.trim()) return 'Please describe your project';
      if (val.trim().length < 20) return `Message must be at least 20 characters (${val.trim().length}/20)`;
      if (val.length > 2000) return 'Message cannot exceed 2000 characters';
    }
    return '';
  };

  const handleBlur = (field: 'name' | 'email' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let val = '';
    if (field === 'name') val = name;
    if (field === 'email') val = email;
    if (field === 'message') val = message;

    const error = validateField(field, val);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (field: 'name' | 'email' | 'company' | 'phone' | 'message', value: string) => {
    if (field === 'name') {
      setName(value);
      if (touched.name) setErrors((prev) => ({ ...prev, name: validateField('name', value) }));
    }
    if (field === 'email') {
      setEmail(value);
      if (touched.email) setErrors((prev) => ({ ...prev, email: validateField('email', value) }));
    }
    if (field === 'company') setCompany(value);
    if (field === 'phone') setPhone(value);
    if (field === 'message') {
      if (value.length <= 2000) {
        setMessage(value);
        if (touched.message) setErrors((prev) => ({ ...prev, message: validateField('message', value) }));
      }
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Trigger validation on all required fields
    const nameErr = validateField('name', name);
    const emailErr = validateField('email', email);
    const messageErr = validateField('message', message);

    setTouched({ name: true, email: true, message: true });
    setErrors({ name: nameErr, email: emailErr, message: messageErr });

    // Focus first invalid field
    if (nameErr) {
      nameInputRef.current?.focus();
      return;
    }
    if (emailErr) {
      emailInputRef.current?.focus();
      return;
    }
    if (messageErr) {
      messageInputRef.current?.focus();
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          phone: phone.trim(),
          service: selectedServiceId,
          message: message.trim(),
          website_hp: honeypot, // Honeypot field
          pageUrl: window.location.href,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        setServerError(data.error || "We couldn't send your message. Please try again or call us.");
      }
    } catch {
      setStatus('error');
      setServerError("We couldn't send your message. Please check your connection or contact us directly.");
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setPhone('');
    setMessage('');
    setTouched({});
    setErrors({});
    setStatus('idle');
    setServerError('');
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 50);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#fafafa] selection:bg-[#FFC247] selection:text-[#1a1203] overflow-x-hidden">
      <SEOHead
        title="Contact AEITCH | Book a Technical Architecture Call"
        description="Connect directly with AEITCH engineers to evaluate technical feasibility and receive a customized implementation roadmap."
        canonicalPath="/contact"
      />
      {/* Background Amber Glow (Top Right) */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] opacity-25 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 75% 25%, #FFC247 0%, rgba(255, 194, 71, 0.15) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Faint 48px Grid Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 w900:px-8 desktop:px-12 pt-28 sm:pt-32 tablet:pt-36 pb-24">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Left-aligned) */}
        {/* ========================================================================= */}
        <motion.section
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-start gap-4 sm:gap-5 mb-12 sm:mb-16"
        >
          <Breadcrumbs items={[{ label: 'Contact', path: '/contact' }]} />

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FFC247]/30 bg-[#FFC247]/10 text-[#FFC247] font-mono text-[11px] sm:text-[12px] uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC247]" />
            <span>Contact AEITCH</span>
          </div>

          {/* Heading */}
          <h1 className="font-sans font-light text-[32px] sm:text-[44px] tablet:text-[52px] w1200:text-[56px] leading-[1.1] tracking-[-0.02em] text-[#fafafa] text-balance">
            Tell us what you're building. <br />
            <span className="font-normal text-[#FFC247]">We'll engineer it.</span>
          </h1>

          {/* Sub-copy */}
          <p className="font-body text-[#a1a1aa] text-[15px] sm:text-[16px] leading-relaxed max-w-[620px]">
            Connect directly with AEITCH engineers to evaluate technical feasibility and receive a customized implementation roadmap.
          </p>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 font-body text-[13px] sm:text-[13.5px] text-[#85858c]">
            {/* Helping Email */}
            <a
              href={`mailto:${contactConfig.email}`}
              className="flex items-center gap-2 hover:text-[#fafafa] transition-colors no-underline text-inherit"
            >
              <svg className="w-4 h-4 text-[#5EEAD4] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span>{contactConfig.email}</span>
            </a>

            {/* Helping Phone / WhatsApp */}
            <a
              href={contactConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#25D366] transition-colors no-underline text-inherit"
            >
              <svg className="w-4 h-4 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.27C8.94 7.27 8.66 7.33 8.42 7.59C8.19 7.85 7.53 8.47 7.53 9.74C7.53 11.01 8.45 12.23 8.58 12.4C8.71 12.57 10.38 15.15 12.94 16.26C15.08 17.18 15.51 17 15.97 16.96C16.43 16.92 17.46 16.35 17.67 15.75C17.88 15.15 17.88 14.64 17.82 14.53C17.76 14.42 17.59 14.36 17.33 14.23C17.07 14.1 15.8 13.47 15.57 13.38C15.34 13.29 15.17 13.25 15 13.51C14.83 13.77 14.34 14.36 14.19 14.53C14.04 14.7 13.89 14.72 13.63 14.59C13.37 14.46 12.53 14.19 11.54 13.31C10.77 12.62 10.25 11.77 10.1 11.51C9.95 11.25 10.08 11.11 10.21 10.98C10.33 10.86 10.47 10.67 10.61 10.51C10.75 10.35 10.79 10.23 10.88 10.05C10.97 9.87 10.92 9.72 10.86 9.59C10.8 9.46 10.3 8.24 10.09 7.73C9.88 7.23 9.68 7.3 9.52 7.29C9.37 7.28 9.2 7.27 9.11 7.27Z"/>
              </svg>
              <span>{contactConfig.phone}</span>
            </a>

            {/* Clock Response */}
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#FFC247] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>{contactConfig.responseTime}</span>
            </div>
          </div>
        </motion.section>

        {/* ========================================================================= */}
        {/* 2. MAIN SECTION: FORM + SIDEBAR */}
        {/* ========================================================================= */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 w900:grid-cols-[1.5fr_1fr] gap-6 items-start"
        >
          {/* --------------------------------------------------------------------- */}
          {/* A) QUERY FORM CARD */}
          {/* --------------------------------------------------------------------- */}
          <div
            id="contact-form"
            className="scroll-mt-24 sm:scroll-mt-28 relative rounded-[20px] p-6 sm:p-8 tablet:p-10 bg-[#0b0b0c] border border-white/[0.09] shadow-2xl overflow-hidden transition-all duration-300"
          >
            {/* Dynamic Card Top-Left Glow based on Selected Service */}
            <div
              className="absolute top-0 left-0 w-[420px] h-[360px] pointer-events-none blur-[90px] opacity-20 -z-0 transition-all duration-500"
              style={{
                background: `radial-gradient(circle at 10% 10%, ${selectedService.accent} 0%, transparent 70%)`,
              }}
              aria-hidden="true"
            />

            {status === 'success' ? (
              /* ================================================================= */
              /* SUCCESS STATE */
              /* ================================================================= */
              <div className="relative z-10 flex flex-col items-start gap-6 py-8">
                {/* Check Icon with Accent Color */}
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center border shadow-lg"
                  style={{
                    backgroundColor: `${selectedService.accent}15`,
                    borderColor: `${selectedService.accent}40`,
                    color: selectedService.accent,
                  }}
                >
                  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>

                <div className="flex flex-col gap-2">
                  <h3
                    ref={successHeadingRef}
                    tabIndex={-1}
                    role="status"
                    className="font-sans font-light text-[28px] sm:text-[32px] text-[#fafafa] tracking-tight focus:outline-none"
                  >
                    Query received
                  </h3>
                  <p className="font-body text-[#a1a1aa] text-[15px] sm:text-[16px] leading-relaxed max-w-[480px]">
                    Thank you. Our engineering team has your message and will reply within 24 hours.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 h-[48px] px-6 rounded-full bg-white text-black font-body font-semibold text-[14px] hover:bg-neutral-200 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    <span>Send another query</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v-2a8 8 0 0 1 14.93-4M20 12v2a8 8 0 0 1-14.93 4" />
                      <polyline points="4 6 4 10 8 10" />
                      <polyline points="20 18 20 14 16 14" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : (
              /* ================================================================= */
              /* FORM STATE */
              /* ================================================================= */
              <form onSubmit={handleSubmit} noValidate className="relative z-10 flex flex-col gap-6">
                <div>
                  <h2 className="font-sans font-light text-[24px] sm:text-[28px] text-[#fafafa] tracking-tight">
                    Send us your query
                  </h2>
                  <p className="font-body text-[#85858c] text-[13px] sm:text-[14px] mt-1">
                    Fill in your technical scope or questions below.
                  </p>
                </div>

                {/* Error Banner on Failure */}
                {status === 'error' && (
                  <div
                    role="alert"
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl border border-[#ff6b6b]/40 bg-[#ff6b6b]/10 text-[#fafafa]"
                  >
                    <div className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#ff8a8a] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span className="font-body text-[13.5px] text-[#fafafa]">
                        {serverError || "We couldn't send your message. Please try again or call us."}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="text-xs font-mono font-medium underline text-[#ff8a8a] hover:text-white shrink-0 cursor-pointer"
                    >
                      Retry Now
                    </button>
                  </div>
                )}

                {/* Honeypot field (hidden from screen, catches bots) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_hp">Do not fill this</label>
                  <input
                    type="text"
                    id="website_hp"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Row 1: Full Name & Work Email (2 cols on >=560px) */}
                <div className="grid grid-cols-1 w560:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={nameId} className="font-body text-[13px] font-medium text-[#a1a1aa] flex items-center gap-1">
                      <span>Full name</span>
                      <span className="text-[#FFC247]" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={nameInputRef}
                      id={nameId}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                      onBlur={() => handleBlur('name')}
                      placeholder="Jane Doe"
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? `${nameId}-error` : undefined}
                      className={`h-[48px] w-full px-4 rounded-xl bg-[#121214] text-[16px] text-[#fafafa] placeholder-[#606066] border transition-colors outline-none ${
                        errors.name
                          ? 'border-[#ff6b6b] focus:border-[#ff6b6b] focus:ring-1 focus:ring-[#ff6b6b]'
                          : 'border-white/10 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/30'
                      }`}
                    />
                    {errors.name && (
                      <span id={`${nameId}-error`} role="alert" className="font-body text-[12px] text-[#ff8a8a] flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errors.name}</span>
                      </span>
                    )}
                  </div>

                  {/* Work Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={emailId} className="font-body text-[13px] font-medium text-[#a1a1aa] flex items-center gap-1">
                      <span>Work email</span>
                      <span className="text-[#FFC247]" aria-hidden="true">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id={emailId}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      placeholder="jane@company.com"
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? `${emailId}-error` : undefined}
                      className={`h-[48px] w-full px-4 rounded-xl bg-[#121214] text-[16px] text-[#fafafa] placeholder-[#606066] border transition-colors outline-none ${
                        errors.email
                          ? 'border-[#ff6b6b] focus:border-[#ff6b6b] focus:ring-1 focus:ring-[#ff6b6b]'
                          : 'border-white/10 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/30'
                      }`}
                    />
                    {errors.email && (
                      <span id={`${emailId}-error`} role="alert" className="font-body text-[12px] text-[#ff8a8a] flex items-center gap-1 mt-0.5">
                        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>{errors.email}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Row 2: Company & Phone (2 cols on >=560px) */}
                <div className="grid grid-cols-1 w560:grid-cols-2 gap-4">
                  {/* Company */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={companyId} className="font-body text-[13px] font-medium text-[#a1a1aa]">
                      Company
                    </label>
                    <input
                      id={companyId}
                      name="company"
                      type="text"
                      autoComplete="organization"
                      value={company}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('company', e.target.value)}
                      placeholder="Acme Corp"
                      className="h-[48px] w-full px-4 rounded-xl bg-[#121214] text-[16px] text-[#fafafa] placeholder-[#606066] border border-white/10 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/30 transition-colors outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor={phoneId} className="font-body text-[13px] font-medium text-[#a1a1aa] flex items-center gap-1">
                      <span>Phone</span>
                      <span className="text-[#85858c] text-[12px] font-normal">(optional)</span>
                    </label>
                    <input
                      id={phoneId}
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={phone}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="h-[48px] w-full px-4 rounded-xl bg-[#121214] text-[16px] text-[#fafafa] placeholder-[#606066] border border-white/10 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/30 transition-colors outline-none"
                    />
                  </div>
                </div>

                {/* Row 3: "What do you need help with?" Button Tile Selector */}
                <div className="flex flex-col gap-2 pt-1">
                  <label className="font-body text-[13px] font-medium text-[#a1a1aa]">
                    What do you need help with?
                  </label>

                  <div className="grid grid-cols-1 w560:grid-cols-2 gap-2.5">
                    {SERVICES.map((srv) => {
                      const isSelected = selectedServiceId === srv.id;
                      const isNotSure = srv.id === 'not-sure';

                      return (
                        <button
                          key={srv.id}
                          type="button"
                          aria-pressed={isSelected}
                          onClick={() => setSelectedServiceId(srv.id)}
                          className={`relative min-h-[60px] p-3 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                            isNotSure ? 'w560:col-span-2' : ''
                          }`}
                          style={{
                            borderColor: isSelected ? srv.accent : 'rgba(255, 255, 255, 0.1)',
                            backgroundColor: isSelected ? `${srv.accent}14` : 'rgba(255, 255, 255, 0.02)',
                          }}
                        >
                          {/* 3D Orb Asset or Icon Thumbnail */}
                          <div
                            className="w-9 h-9 rounded-full overflow-hidden border shrink-0 bg-black/60 relative flex items-center justify-center shadow-inner"
                            style={{
                              borderColor: isSelected ? srv.accent : 'rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            {srv.videoSrc ? (
                              <video
                                src={srv.videoSrc}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover scale-150 pointer-events-none"
                              />
                            ) : (
                              <svg className="w-4 h-4 text-[#FFC247]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                              </svg>
                            )}
                          </div>

                          <div className="flex flex-col">
                            <span className="font-body text-[14px] font-medium text-[#fafafa]">
                              {srv.name}
                            </span>
                            <span
                              className="font-mono text-[11px]"
                              style={{ color: isSelected ? srv.accent : '#85858c' }}
                            >
                              {isSelected ? '● Selected' : 'Select'}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Row 4: Project Description textarea */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <div className="flex items-center justify-between">
                    <label htmlFor={messageId} className="font-body text-[13px] font-medium text-[#a1a1aa] flex items-center gap-1">
                      <span>Tell us about your project</span>
                      <span className="text-[#FFC247]" aria-hidden="true">*</span>
                    </label>
                    <span
                      aria-live="polite"
                      className={`font-mono text-[12px] ${
                        message.length < 20 && touched.message
                          ? 'text-[#ff8a8a]'
                          : message.length >= 1950
                          ? 'text-[#FFC247]'
                          : 'text-[#85858c]'
                      }`}
                    >
                      {message.length} / 2000
                    </span>
                  </div>

                  <textarea
                    ref={messageInputRef}
                    id={messageId}
                    name="message"
                    required
                    rows={5}
                    minLength={20}
                    maxLength={2000}
                    value={message}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    placeholder="Describe your goals, tech stack, scale requirements, or bottlenecks you want us to solve..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? `${messageId}-error` : undefined}
                    className={`min-h-[140px] w-full p-4 rounded-xl bg-[#121214] text-[16px] text-[#fafafa] placeholder-[#606066] border transition-colors outline-none resize-y leading-relaxed ${
                      errors.message
                        ? 'border-[#ff6b6b] focus:border-[#ff6b6b] focus:ring-1 focus:ring-[#ff6b6b]'
                        : 'border-white/10 focus:border-[#FFC247] focus:ring-2 focus:ring-[#FFC247]/30'
                    }`}
                  />
                  {errors.message && (
                    <span id={`${messageId}-error`} role="alert" className="font-body text-[12px] text-[#ff8a8a] flex items-center gap-1 mt-0.5">
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      <span>{errors.message}</span>
                    </span>
                  )}
                </div>

                {/* Submit button & notes */}
                <div className="flex flex-col gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full h-[52px] rounded-full font-body font-semibold text-[15px] text-[#1a1203] flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg cursor-pointer"
                    style={{
                      backgroundColor: selectedService.accent,
                      boxShadow: `0 0 25px ${selectedService.accent}35`,
                    }}
                  >
                    <span>{status === 'submitting' ? 'Sending…' : 'Send Query →'}</span>
                    {status === 'submitting' ? (
                      <svg className="w-4 h-4 animate-spin text-[#1a1203]" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                    ) : null}
                  </button>

                  <div className="flex flex-col items-center text-center gap-1 text-[#85858c]">
                    <span className="font-body text-[12.5px]">We reply within 24 hours.</span>
                    <span className="font-body text-[11.5px] leading-tight text-[#606066]">
                      By sending this form you agree that AEITCH may use your details only to reply to your query.
                    </span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* --------------------------------------------------------------------- */}
          {/* B & C) SIDEBAR CARDS */}
          {/* --------------------------------------------------------------------- */}
          <div className="flex flex-col gap-6">
            {/* Sidebar Card 1: What happens next */}
            <div className="rounded-[20px] p-6 sm:p-7 bg-[#0b0b0c] border border-white/[0.09] shadow-xl flex flex-col gap-5">
              <h3 className="font-sans font-light text-[20px] sm:text-[22px] text-[#fafafa] tracking-tight">
                What happens next
              </h3>

              <div className="flex flex-col gap-4">
                {/* 01 */}
                <div className="flex items-start gap-3.5">
                  <span className="font-mono text-[14px] font-bold text-[#FFC247] shrink-0 mt-0.5">
                    01
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body font-medium text-[14px] text-[#fafafa]">
                      Query review
                    </span>
                    <span className="font-body text-[13px] text-[#a1a1aa] leading-relaxed">
                      An AEITCH engineer reviews your scope and replies within 24 hours.
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/[0.06] w-full" />

                {/* 02 */}
                <div className="flex items-start gap-3.5">
                  <span className="font-mono text-[14px] font-bold text-[#FFC247] shrink-0 mt-0.5">
                    02
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body font-medium text-[14px] text-[#fafafa]">
                      Architecture call
                    </span>
                    <span className="font-body text-[13px] text-[#a1a1aa] leading-relaxed">
                      We scope requirements, feasibility, and technical constraints together.
                    </span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/[0.06] w-full" />

                {/* 03 */}
                <div className="flex items-start gap-3.5">
                  <span className="font-mono text-[14px] font-bold text-[#FFC247] shrink-0 mt-0.5">
                    03
                  </span>
                  <div className="flex flex-col">
                    <span className="font-body font-medium text-[14px] text-[#fafafa]">
                      Implementation roadmap
                    </span>
                    <span className="font-body text-[13px] text-[#a1a1aa] leading-relaxed">
                      You receive a customized delivery plan with sprints and weekly milestones.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Card 2: Reach us directly */}
            <div className="rounded-[20px] p-6 sm:p-7 bg-[#0b0b0c] border border-white/[0.09] shadow-xl flex flex-col gap-5">
              <h3 className="font-sans font-light text-[20px] sm:text-[22px] text-[#fafafa] tracking-tight">
                Reach us directly
              </h3>

              <div className="flex flex-col gap-3 font-body text-[13.5px]">
                {/* Helping Email */}
                <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-body text-[11px] font-medium uppercase tracking-wider text-[#85858c]">
                    Helping Email
                  </span>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="flex items-center gap-2.5 text-[#fafafa] hover:text-[#5EEAD4] transition-colors group no-underline"
                  >
                    <svg className="w-4 h-4 text-[#5EEAD4] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span className="font-mono text-[13px] text-[#fafafa] group-hover:text-[#5EEAD4] transition-colors">
                      {contactConfig.email}
                    </span>
                  </a>
                </div>

                {/* Helping Phone with WhatsApp */}
                <div className="flex flex-col gap-1.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <span className="font-body text-[11px] font-medium uppercase tracking-wider text-[#85858c]">
                    Helping Phone
                  </span>
                  <a
                    href={contactConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[#fafafa] hover:text-[#25D366] transition-colors group no-underline"
                  >
                    <div className="flex items-center gap-2.5">
                      <svg className="w-4 h-4 text-[#25D366] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.27C8.94 7.27 8.66 7.33 8.42 7.59C8.19 7.85 7.53 8.47 7.53 9.74C7.53 11.01 8.45 12.23 8.58 12.4C8.71 12.57 10.38 15.15 12.94 16.26C15.08 17.18 15.51 17 15.97 16.96C16.43 16.92 17.46 16.35 17.67 15.75C17.88 15.15 17.88 14.64 17.82 14.53C17.76 14.42 17.59 14.36 17.33 14.23C17.07 14.1 15.8 13.47 15.57 13.38C15.34 13.29 15.17 13.25 15 13.51C14.83 13.77 14.34 14.36 14.19 14.53C14.04 14.7 13.89 14.72 13.63 14.59C13.37 14.46 12.53 14.19 11.54 13.31C10.77 12.62 10.25 11.77 10.1 11.51C9.95 11.25 10.08 11.11 10.21 10.98C10.33 10.86 10.47 10.67 10.61 10.51C10.75 10.35 10.79 10.23 10.88 10.05C10.97 9.87 10.92 9.72 10.86 9.59C10.8 9.46 10.3 8.24 10.09 7.73C9.88 7.23 9.68 7.3 9.52 7.29C9.37 7.28 9.2 7.27 9.11 7.27Z"/>
                      </svg>
                      <span className="font-mono text-[13px] text-[#fafafa] group-hover:text-[#25D366] transition-colors">
                        {contactConfig.phone}
                      </span>
                    </div>
                    <span className="font-body text-[11px] font-medium text-[#25D366] bg-[#25D366]/10 border border-[#25D366]/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span>WhatsApp</span>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="7" y1="17" x2="17" y2="7" />
                        <polyline points="7 7 17 7 17 17" />
                      </svg>
                    </span>
                  </a>
                </div>

                {/* Response SLA */}
                <div className="flex items-center gap-2.5 text-[#a1a1aa] px-1 pt-0.5">
                  <svg className="w-4 h-4 text-[#FFC247] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{contactConfig.responseTime}</span>
                </div>
              </div>

              {/* Book Architecture Call Secondary Button */}
              <div className="pt-2">
                <a
                  href={contactConfig.bookingUrl}
                  className="w-full inline-flex items-center justify-center gap-2 h-[48px] rounded-full bg-white text-black font-body font-semibold text-[13.5px] hover:bg-neutral-200 active:scale-[0.98] transition-all no-underline shadow-md"
                >
                  <span>Book Architecture Call</span>
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
