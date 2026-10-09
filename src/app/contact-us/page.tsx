"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Mail,
  Send,
  CheckCircle,
  Clock,
  Shield,
  MessageSquare,
  Sparkles,
  ArrowRight,
  AlertCircle,
  MapPin,
  Phone,
  Building,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { BRAND } from '@/lib/constants';

export default function ContactUsPage() {
  const [activeTab, setActiveTab] = useState<'consultation' | 'scope'>('consultation');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceRequested: 'cloud-first-product-engineering',
    budgetRange: '$25k - $50k',
    timeline: '1 - 3 months',
    message: '',
    meetingDate: '',
    meetingTime: '10:00 AM EST',
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

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit form. Please check the inputs.');
      }

      setSubmitSuccess(data.message || 'Your inquiry has been submitted successfully.');
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceRequested: 'cloud-first-product-engineering',
        budgetRange: '$25k - $50k',
        timeline: '1 - 3 months',
        message: '',
        meetingDate: '',
        meetingTime: '10:00 AM EST',
        website_hp: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO HEADER (PURE BLACK #000000) */}
      <section className="relative min-h-[40vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-20 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[400px] w-[400px] rounded-full bg-[#e9800a]/10 blur-[130px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e9800a] bg-white/5 border border-white/10 mb-4">
              DIRECT SENIOR ACCESS
            </span>
            <h1 className="mt-2 text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Start Your{' '}
              <span className="text-[#e9800a]">
                Project Scoping
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed">
              Skip junior account managers. Connect directly with senior architects to explore technical feasibility, budget, and delivery timelines.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. DUAL-MODE FORM SECTION (PURE WHITE #ffffff CONTRAST) */}
      <section id="consultation" className="relative w-full py-20 sm:py-28 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Info & Guarantees */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
                  COLLABORATE
                </span>
                <h2 className="text-3xl font-black text-black tracking-tight">
                  Schedule or Submit Your Brief
                </h2>
                <p className="mt-3 text-sm sm:text-base text-black/70 leading-relaxed">
                  We respond to all qualified enterprise inquiries within 24 hours with a preliminary architectural assessment.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-white p-6 shadow-sm hover:border-[#e9800a] transition-colors">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-[#e9800a]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">Riyadh Engineering Hub</h3>
                    <p className="text-xs text-black/70 mt-1 leading-relaxed">
                      {BRAND.location}. Aligned with Saudi Vision 2030, NCA ECC/CCC cybersecurity mandates, and in-Kingdom hyperscaler cloud regions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-white p-6 shadow-sm hover:border-[#e9800a] transition-colors">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-[#25D366]">
                    <Phone className="h-5 w-5 text-[#e9800a]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">Executive Hotline & WhatsApp</h3>
                    <p className="text-xs text-black/70 mt-1 leading-relaxed">
                      Direct executive line with our Regional Director in Riyadh:
                    </p>
                    <a
                      href={BRAND.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono font-bold text-[#e9800a] hover:underline mt-1 inline-flex items-center gap-1.5"
                    >
                      {BRAND.whatsappDirect} (WhatsApp / Voice)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-white p-6 shadow-sm hover:border-[#e9800a] transition-colors">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-[#e9800a]">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">Mutual NDA & IP Sovereignty</h3>
                    <p className="text-xs text-black/70 mt-1 leading-relaxed">
                      US and Saudi legal contracting frameworks. Complete enterprise IP protection, data residency controls, and bilateral confidentiality guarantees.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-white p-6 shadow-sm hover:border-[#e9800a] transition-colors">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-[#e9800a]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">24-Hour Technical SLA</h3>
                    <p className="text-xs text-black/70 mt-1 leading-relaxed">
                      Preliminary architectural analysis directly from Senior Enterprise Architects within 24 business hours.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border-2 border-black/10 bg-white p-6 shadow-sm hover:border-[#e9800a] transition-colors">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black text-[#e9800a]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black">Engineering Desk</h3>
                    <a
                      href={`mailto:${BRAND.email}`}
                      className="text-xs font-mono font-bold text-[#e9800a] hover:underline mt-1 inline-block"
                    >
                      {BRAND.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border-2 border-black/10 bg-white p-8 sm:p-10 shadow-2xl">
                {/* Mode Selector Tabs */}
                <div className="flex rounded-2xl bg-black/5 p-1.5 border border-black/10 mb-8">
                  <button
                    type="button"
                    onClick={() => setActiveTab('consultation')}
                    className={`flex-1 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'consultation'
                        ? 'bg-[#000000] text-white shadow-md'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    <Calendar className="h-4 w-4 text-[#e9800a]" />
                    Book Consultation
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('scope')}
                    className={`flex-1 rounded-xl py-3 text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === 'scope'
                        ? 'bg-[#000000] text-white shadow-md'
                        : 'text-black/60 hover:text-black'
                    }`}
                  >
                    <MessageSquare className="h-4 w-4 text-[#e9800a]" />
                    Submit Project Scope
                  </button>
                </div>

                {submitSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border-2 border-[#e9800a] bg-black/5 p-8 text-center"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e9800a] text-black mb-4">
                      <CheckCircle className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">Request Confirmed!</h3>
                    <p className="text-sm text-black/70 leading-relaxed mb-6">{submitSuccess}</p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(null)}
                      className="rounded-xl bg-[#000000] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#e9800a] hover:text-black transition-colors"
                    >
                      Submit Another Inquiry
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
                      <div className="flex items-center gap-3 rounded-xl border border-black bg-black p-4 text-xs font-semibold text-white">
                        <AlertCircle className="h-5 w-5 text-[#e9800a] shrink-0" />
                        {errorMessage}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Alex Morgan"
                          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="alex@company.com"
                          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Acme Corp"
                          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black placeholder-black/30 focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                          Primary Service
                        </label>
                        <select
                          name="serviceRequested"
                          value={formData.serviceRequested}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black focus:border-[#e9800a] focus:ring-1 focus:ring-[#e9800a] focus:outline-none transition-colors"
                        >
                          <optgroup label="Core Cloud & Platform Capabilities">
                            <option value="cloud-first-product-engineering">Cloud-First Product Engineering</option>
                            <option value="platform-engineering-devops">Platform Engineering & DevOps</option>
                            <option value="devsecops-ksa-compliance">DevSecOps & KSA Compliance (NCA / SAMA)</option>
                            <option value="dedicated-engineering-squads">Dedicated Offshore Engineering Squads (GMT+3)</option>
                          </optgroup>
                          <optgroup label="Saudi Vision 2030 Sector Solutions">
                            <option value="fintech-digital-banking">FinTech & Digital Banking (SAMA Open Banking)</option>
                            <option value="giga-projects-smart-infrastructure">Giga-Projects Smart Infrastructure & IoT</option>
                            <option value="enterprise-cloud-migration">Enterprise Cloud Migration (In-Kingdom Hyperscalers)</option>
                            <option value="high-growth-saas">High-Growth SaaS & Venture Launch</option>
                          </optgroup>
                          <optgroup label="Specialized Advisory & Build">
                            <option value="ai-consulting">Applied AI & Autonomous Agents</option>
                            <option value="custom-software">Custom Enterprise Software</option>
                            <option value="other">Other Architecture Consultation</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    {activeTab === 'consultation' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5 rounded-2xl bg-black/5 border border-black/10">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            name="meetingDate"
                            required
                            value={formData.meetingDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm text-black focus:border-[#e9800a] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                            Preferred Time Window
                          </label>
                          <select
                            name="meetingTime"
                            value={formData.meetingTime}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-black/20 bg-white px-4 py-2.5 text-sm text-black focus:border-[#e9800a] focus:outline-none"
                          >
                            <option value="09:00 AM EST">09:00 AM EST</option>
                            <option value="11:00 AM EST">11:00 AM EST</option>
                            <option value="01:00 PM EST">01:00 PM EST</option>
                            <option value="03:00 PM EST">03:00 PM EST</option>
                            <option value="05:00 PM EST">05:00 PM EST</option>
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                          Estimated Budget
                        </label>
                        <select
                          name="budgetRange"
                          value={formData.budgetRange}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black focus:border-[#e9800a] focus:outline-none"
                        >
                          <option value="< $10k">&lt; $10k (Advisory / Small MVP)</option>
                          <option value="$10k - $25k">$10k – $25k (Standard MVP)</option>
                          <option value="$25k - $50k">$25k – $50k (Production Platform)</option>
                          <option value="$50k+">$50k+ (Enterprise Infrastructure)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                          Target Timeline
                        </label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-black/20 bg-white px-4 py-3 text-sm text-black focus:border-[#e9800a] focus:outline-none"
                        >
                          <option value="Immediate">Immediate (&lt; 2 weeks)</option>
                          <option value="1 - 3 months">1 – 3 months</option>
                          <option value="3 - 6 months">3 – 6 months</option>
                          <option value="Exploratory">Exploratory / Discovery</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black/70 mb-2">
                        Project Overview & Architecture Details *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Share a brief overview of your system, tech requirements, or goals..."
                        className="w-full rounded-xl border border-black/20 bg-white p-4 text-sm text-black placeholder-black/30 focus:border-[#e9800a] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-[#e9800a] py-4 text-sm font-bold text-black transition-all hover:bg-black hover:text-white disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-black/10"
                    >
                      {isSubmitting ? (
                        <>Processing Submission...</>
                      ) : activeTab === 'consultation' ? (
                        <>
                          <Calendar className="h-4 w-4" />
                          Confirm Consultation Request
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Project Scope
                        </>
                      )}
                    </button>
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
