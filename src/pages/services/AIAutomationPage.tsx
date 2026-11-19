import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_CONFIG } from '../../config/servicesData';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';

export const AIAutomationPage: React.FC = () => {
  const service = SERVICES_CONFIG['ai-automation'];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#F7C059] selection:text-black overflow-hidden">
      <SEOHead
        title="AI Automation & Agent Development Services | AEITCH"
        description="Scale enterprise operations with autonomous multi-agent systems, private RAG knowledge retrieval, and custom LLM orchestration pipelines engineered for zero data leakage."
        canonicalPath="/services/ai-automation"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": "AI Automation & Autonomous Agent Development",
          "provider": {
            "@type": "Organization",
            "name": "AEITCH",
            "url": "https://aeitch.com"
          },
          "areaServed": "US",
          "description": "Multi-agent autonomous swarms, enterprise RAG, hybrid semantic vector search, and intelligent workflow automation."
        }}
      />
      {/* Top Background Flare & Ambient Lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] opacity-25 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgb(247, 192, 89) 0%, rgba(247, 192, 89, 0.15) 45%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-0"
        aria-hidden="true"
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full pt-32 sm:pt-36 tablet:pt-40 desktop:pt-44 pb-20 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col desktop:flex-row items-center justify-between gap-12 desktop:gap-16">
          {/* Left Column: Heading, Badges, Value Prop & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center desktop:items-start text-center desktop:text-left gap-6 max-w-[680px]"
          >
            {/* Tag Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border backdrop-blur-md"
              style={{
                borderColor: service.tagBorderColor,
                backgroundColor: 'rgba(247, 192, 89, 0.08)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: service.accentColor }} />
              <span className="font-poppins font-medium text-[12px] sm:text-[13px] tracking-wide" style={{ color: service.accentColor }}>
                {service.tag}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-sans font-normal text-[36px] sm:text-[48px] tablet:text-[54px] desktop:text-[62px] leading-[1.08] tracking-[-0.03em] text-white">
              Scale Operations with <br />
              <span
                className="font-medium bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #FFFFFF 20%, #F7C059 80%)',
                }}
              >
                Agentic AI & Autonomy
              </span>
            </h1>

            {/* Subhead */}
            <p className="font-poppins text-white/75 text-[15px] sm:text-[17px] leading-relaxed max-w-[580px]">
              {service.heroSubhead}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center desktop:justify-start gap-4 pt-2">
              <Link
                href="/contact?service=ai-automation#contact-form"
                className="inline-flex items-center gap-2 text-black font-poppins font-semibold text-[14px] px-6 py-3 rounded-full shadow-[0_0_25px_rgba(247,192,89,0.35)] hover:scale-[1.03] active:scale-[0.98] transition-all no-underline"
                style={{ backgroundColor: service.accentColor }}
              >
                <span>Schedule AI Strategy Call</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>

              <a
                href="#capabilities"
                className="inline-flex items-center gap-2 bg-white/[0.04] text-white/90 border border-white/10 hover:border-white/30 font-poppins font-medium text-[14px] px-6 py-3 rounded-full hover:bg-white/[0.08] transition-all no-underline backdrop-blur-sm"
              >
                <span>View Capabilities</span>
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right Column: 3D Video Asset & Flare */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-full max-w-[480px] desktop:max-w-[540px] aspect-square"
          >
            {/* Ambient Backlight Flare */}
            <div
              className="absolute inset-0 w-full h-full rounded-full opacity-60 blur-[60px] pointer-events-none -z-10"
              style={{ background: service.backlightGradient }}
              aria-hidden="true"
            />

            {/* Video Container Card */}
            <div className="relative w-[320px] sm:w-[380px] desktop:w-[440px] aspect-square rounded-[32px] overflow-hidden border border-[#F7C059]/30 bg-black/60 shadow-[0_16px_50px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center justify-center">
              <video
                ref={videoRef}
                src={service.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Live Badge Overlay */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between px-4 py-2.5 rounded-xl bg-black/70 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F7C059] animate-pulse" />
                  <span className="font-poppins text-[12px] text-white/90 font-medium">AEITCH Agent Swarm Engine</span>
                </div>
                <span className="font-mono text-[11px] text-[#F7C059] uppercase tracking-wider">Production Ready</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LIVE METRICS BAR */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full border-y border-white/[0.08] bg-white/[0.015] backdrop-blur-md py-10 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {service.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center text-center gap-1.5">
              <span
                className="font-sans font-normal text-[36px] sm:text-[44px] tracking-tight"
                style={{ color: service.accentColor }}
              >
                {metric.value}
              </span>
              <span className="font-poppins text-[13px] sm:text-[14px] text-white/60">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CAPABILITIES MATRIX */}
      {/* ========================================================================= */}
      <section id="capabilities" className="relative z-10 w-full py-24 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16">
          {/* Section Header */}
          <div className="flex flex-col items-center text-center gap-4 max-w-[720px] mx-auto">
            <span className="font-poppins text-[12px] font-semibold tracking-widest text-[#F7C059] uppercase">
              Core Capabilities
            </span>
            <h2 className="font-sans font-normal text-[32px] sm:text-[44px] tracking-tight text-white leading-tight">
              End-to-End Autonomous AI Engineering
            </h2>
            <p className="font-poppins text-white/60 text-[15px] sm:text-[16px] leading-relaxed">
              We don’t just wrap generic APIs. We architect self-orchestrating systems with hardened guardrails, deterministic data flows, and zero data leakage.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.capabilities.map((cap, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl p-8 bg-white/[0.02] border border-white/10 hover:border-[#F7C059]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg"
              >
                {/* Subtle Hover Gradient */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'radial-gradient(600px circle at top left, rgba(247, 192, 89, 0.08), transparent 70%)',
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F7C059]/10 border border-[#F7C059]/20 flex items-center justify-center text-[#F7C059]">
                      <span className="font-mono font-bold text-[14px]">0{idx + 1}</span>
                    </div>
                    {cap.badge && (
                      <span className="font-poppins text-[11px] font-medium px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70">
                        {cap.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-poppins font-semibold text-[20px] text-white group-hover:text-[#F7C059] transition-colors">
                    {cap.title}
                  </h3>

                  <p className="font-poppins text-[14.5px] text-white/65 leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FOUR-STAGE DELIVERY PROCESS */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full py-24 bg-white/[0.01] border-t border-white/[0.08] px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4 max-w-[700px] mx-auto">
            <span className="font-poppins text-[12px] font-semibold tracking-widest text-[#F7C059] uppercase">
              Methodology
            </span>
            <h2 className="font-sans font-normal text-[32px] sm:text-[44px] tracking-tight text-white leading-tight">
              How AEITCH Deploys Autonomous Systems
            </h2>
            <p className="font-poppins text-white/60 text-[15px] sm:text-[16px]">
              A disciplined, engineering-first roadmap from initial pipeline profiling to active telemetry in production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 desktop:grid-cols-4 gap-6">
            {service.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl p-7 bg-white/[0.02] border border-white/10 flex flex-col gap-4 hover:border-white/20 transition-all"
              >
                <span
                  className="font-mono text-[28px] font-bold tracking-tight"
                  style={{ color: service.accentColor }}
                >
                  {step.number}
                </span>
                <h4 className="font-poppins font-semibold text-[17px] text-white">
                  {step.title}
                </h4>
                <p className="font-poppins text-[13.5px] text-white/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. TECH STACK & INTEGRATION ECOSYSTEM */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full py-20 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col items-center text-center gap-10">
          <div className="flex flex-col gap-2">
            <span className="font-poppins text-[12px] font-semibold tracking-widest text-white/40 uppercase">
              Technology Ecosystem
            </span>
            <h3 className="font-poppins font-semibold text-[22px] sm:text-[26px] text-white">
              Built on Modern AI & Distributed Systems
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 max-w-[900px]">
            {service.techStack.map((tech, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 hover:border-[#F7C059]/40 hover:bg-[#F7C059]/5 transition-all text-white/80 font-poppins text-[13.5px]"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. FEATURED CASE STUDY BANNER */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full py-16 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto">
          <div className="relative rounded-[28px] p-8 sm:p-12 border border-[#F7C059]/30 bg-gradient-to-r from-black via-white/[0.02] to-black overflow-hidden shadow-2xl flex flex-col desktop:flex-row items-center justify-between gap-8">
            <div
              className="absolute -right-20 -bottom-20 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none blur-[90px]"
              style={{ backgroundColor: service.accentColor }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-3 max-w-[700px] text-center desktop:text-left">
              <span className="font-poppins text-[12px] font-semibold text-[#F7C059] uppercase tracking-wider">
                {service.caseStudyPreview.badge}
              </span>
              <h3 className="font-sans font-normal text-[26px] sm:text-[34px] text-white tracking-tight">
                {service.caseStudyPreview.title}
              </h3>
              <p className="font-poppins text-white/70 text-[15px] leading-relaxed">
                {service.caseStudyPreview.impact}
              </p>
            </div>

            <a
              href={service.caseStudyPreview.href}
              className="inline-flex items-center gap-2 bg-white text-black font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-full hover:bg-neutral-200 transition-all shrink-0 no-underline shadow-md"
            >
              <span>Read Full Case Study</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. CONVERSION CALL TO ACTION */}
      {/* ========================================================================= */}
      <section id="contact" className="relative z-10 w-full py-24 sm:py-32 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1000px] mx-auto text-center flex flex-col items-center gap-8 relative">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] opacity-25 blur-[100px] pointer-events-none -z-10"
            style={{ backgroundColor: service.accentColor }}
            aria-hidden="true"
          />

          <span className="font-poppins text-[12px] font-semibold tracking-widest text-[#F7C059] uppercase">
            Let’s Build Together
          </span>

          <h2 className="font-sans font-normal text-[36px] sm:text-[52px] tracking-tight text-white leading-tight">
            Ready to Automate Your High-Impact Workflows?
          </h2>

          <p className="font-poppins text-white/70 text-[16px] sm:text-[18px] max-w-[620px] leading-relaxed">
            Connect directly with AEITCH AI architects to evaluate your technical roadmap and receive an end-to-end automation plan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact?service=ai-automation#contact-form"
              className="inline-flex items-center gap-2 text-black font-poppins font-semibold text-[14.5px] px-8 py-3.5 rounded-full shadow-[0_0_30px_rgba(247,192,89,0.4)] hover:scale-105 active:scale-95 transition-all no-underline"
              style={{ backgroundColor: service.accentColor }}
            >
              <span>Get in Touch with AEITCH</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIAutomationPage;
