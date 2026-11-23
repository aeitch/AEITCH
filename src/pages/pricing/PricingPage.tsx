import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const PricingPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = [
    {
      name: 'Architecture & AI Audit',
      tagline: 'Fixed-Scope Technical Discovery',
      badge: 'Rapid Feasibility',
      color: '#F7C059',
      borderColor: 'rgba(247, 192, 89, 0.3)',
      duration: '1 - 2 Weeks',
      deliverables: [
        'Complete workflow & infrastructure audit',
        'Agentic AI feasibility & ROI analysis',
        'Zero-trust security & data leakage review',
        'Formal architecture specification document',
        'Implementation roadmap & cost breakdown',
      ],
      ctaLabel: 'Book Strategy Audit',
    },
    {
      name: 'Dedicated Engineering Pod',
      tagline: 'Full-Cycle Sprint Velocity',
      badge: 'Most Popular',
      color: '#76E3DC',
      borderColor: 'rgba(118, 227, 220, 0.4)',
      duration: 'Monthly Retainer',
      deliverables: [
        'Dedicated senior engineering pod (Architect + Devs + SRE)',
        'Autonomous AI, Product, Cloud, or Bespoke Software',
        'Two-week agile release cycles with bi-weekly demos',
        'Slack/Discord live collaboration & daily syncs',
        'Full IP transfer & type-safe documentation',
      ],
      ctaLabel: 'Hire Engineering Pod',
      highlight: true,
    },
    {
      name: 'Enterprise Transformation',
      tagline: 'Mission-Critical Modernization',
      badge: 'Scale & Reliability',
      color: '#74C8FC',
      borderColor: 'rgba(116, 200, 252, 0.3)',
      duration: 'Custom Scope',
      deliverables: [
        'Multi-region Kubernetes & zero-downtime migration',
        'High-concurrency distributed transaction engines',
        'Custom domain model fine-tuning & private vector DBs',
        '24/7 SRE telemetry, automated failover & strict SLAs',
        'Executive engineering governance & compliance support',
      ],
      ctaLabel: 'Discuss Enterprise Scope',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden select-none">
      <SEOHead
        title="Engagement Models & Transparent Engineering Pricing | AEITCH"
        description="Transparent engineering pod subscriptions, scoped fixed-price MVP sprints, and dedicated architecture advisory. Zero bloated retainers or vendor lock-in."
        canonicalPath="/pricing"
      />
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #76E3DC 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full pt-32 sm:pt-36 tablet:pt-40 desktop:pt-44 pb-24 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-5 max-w-[760px] mx-auto">
            <Breadcrumbs align="center" items={[{ label: 'Pricing & Engagements', path: '/pricing' }]} />

            <span className="font-poppins text-[12px] font-semibold tracking-widest text-[#76E3DC] uppercase">
              Transparent Engagement
            </span>
            <h1 className="font-sans font-normal text-[36px] sm:text-[48px] tablet:text-[56px] leading-[1.08] tracking-[-0.03em] text-white">
              Predictable Engineering Models <br />
              <span className="text-white/80">Tailored to Your Scale</span>
            </h1>
            <p className="font-poppins text-white/70 text-[16px] sm:text-[17px] leading-relaxed">
              No bloated overhead. No junior bench. Senior engineering teams dedicated to delivering measurable business impact.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8">
            {tiers.map((tier, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`relative rounded-3xl p-8 sm:p-10 bg-white/[0.02] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xl ${
                  tier.highlight ? 'bg-white/[0.035] ring-1 ring-[#76E3DC]/30' : ''
                }`}
                style={{ borderColor: tier.borderColor }}
              >
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(500px circle at top left, ${tier.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-mono text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full border"
                      style={{
                        color: tier.color,
                        borderColor: tier.borderColor,
                        backgroundColor: `${tier.color}10`,
                      }}
                    >
                      {tier.badge}
                    </span>
                    <span className="font-poppins text-[13px] text-white/50">{tier.duration}</span>
                  </div>

                  <div>
                    <h3 className="font-sans font-normal text-[26px] text-white">
                      {tier.name}
                    </h3>
                    <p className="font-poppins text-[14px] text-white/60 pt-1">
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="h-[1px] bg-white/10 w-full" />

                  <div className="flex flex-col gap-3">
                    <span className="font-poppins text-[12px] font-semibold uppercase tracking-wider text-white/40">
                      What is included:
                    </span>
                    <ul className="flex flex-col gap-3 list-none p-0 m-0">
                      {tier.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3">
                          <svg
                            className="w-4 h-4 shrink-0 mt-0.5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke={tier.color}
                            strokeWidth="2.5"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span className="font-poppins text-[13.5px] text-white/75 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative z-10 pt-10">
                  <Link
                    href="/contact#contact-form"
                    className="w-full inline-flex items-center justify-center gap-2 font-poppins font-semibold text-[14px] px-6 py-3.5 rounded-full transition-all no-underline shadow-md"
                    style={{
                      backgroundColor: tier.highlight ? tier.color : 'white',
                      color: 'black',
                    }}
                  >
                    <span>{tier.ctaLabel}</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
