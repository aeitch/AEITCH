import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  CreditCard,
  Building2,
  CloudLightning,
  Flame,
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
  CheckCircle2,
  Sparkles,
  Lock,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SaudiSovereignMap } from '@/components/schematics';
import { CloudMaturityAssessment } from '@/components/tools/CloudMaturityAssessment';

export const metadata: Metadata = {
  title: 'Saudi Vision 2030 Enterprise Solutions | AEITCH',
  description:
    'Mission-critical cloud and digital platforms engineered for Saudi Arabia’s national transformation: FinTech, Giga-Projects, In-Country Hyperscaler Migration, and High-Growth SaaS.',
};

export default function SolutionsOverviewPage() {
  const solutions = [
    {
      slug: 'fintech-digital-banking',
      title: 'FinTech & Digital Banking Platforms',
      badge: 'SAMA / Open Banking Ready',
      desc: 'Microservices architectures tailored for Saudi open banking APIs, ISO 20022 messaging, mada payment routing, and sub-80ms transaction settlement.',
      icon: CreditCard,
      specs: ['ISO 20022 Financial Messaging', 'SAMA Open Banking APIs', 'mada & Apple Pay Integrations', '99.999% Settlement SLA'],
    },
    {
      slug: 'giga-projects-smart-infrastructure',
      title: 'Giga-Projects & Smart Infrastructure Platforms',
      badge: 'Vision 2030 National Scale',
      desc: 'High-scale IoT ingestion pipelines, cognitive digital twins, and edge microservices powering next-generation urban developments and autonomous logistics.',
      icon: Building2,
      specs: ['1M+ Event Ingestion/sec', 'Sub-50ms Edge Telemetry', 'Digital Twin Geospatial Data', 'Zero-Trust SCADA Integration'],
    },
    {
      slug: 'enterprise-cloud-migration',
      title: 'Enterprise Modernization & Sovereign Cloud Migration',
      badge: 'In-Country Hyperscalers',
      desc: 'Zero-downtime migration to Google Cloud (Dammam), Azure (Riyadh), AWS KSA, and Oracle Cloud with strict Saudi PDPL Class 3 data residency compliance.',
      icon: CloudLightning,
      specs: ['Google Cloud Dammam & Azure Riyadh', 'PDPL Class 3 Sovereign Residency', 'Dual-Write Zero Downtime Cutover', 'Automated NCA ECC Hardening'],
    },
    {
      slug: 'high-growth-saas',
      title: 'High-Growth SaaS & Venture-Backed Products',
      badge: 'Rapid 8-Week Launch',
      desc: 'Full-cycle production MVPs with multi-tenant architectures, billing engines, and automated CI/CD for venture-backed founders targeting rapid GCC market share.',
      icon: Flame,
      specs: ['8-Week Production MVP Delivery', 'Multi-Tenant Data Isolation', 'Bilingual RTL UI Architecture', '100% IP & Codebase Handover'],
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <Sparkles className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                SAUDI VISION 2030 SOLUTIONS FOCUS
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Mission-Critical Digital Platforms Tailored for the Kingdom
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We engineer compliant, high-throughput cloud architectures for Saudi Arabia’s enterprise leaders,
              regulatory innovators, and ambitious scale-ups—ensuring 100% data sovereignty and sub-80ms performance.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE 4 CORE SOLUTIONS GRID */}
      <section className="relative py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <ScrollReveal key={sol.slug} delay={idx * 0.1} yOffset={30}>
                  <Link href={`/solutions/${sol.slug}`} className="group block h-full">
                    <RadialGlowCard className="h-full flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-[#e9800a]/60">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] group-hover:scale-105 transition-transform">
                            <Icon className="h-7 w-7" />
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-[#e9800a]">
                            {sol.badge}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors leading-snug">
                          {sol.title}
                        </h2>

                        <p className="text-sm text-white/70 leading-relaxed mb-6">
                          {sol.desc}
                        </p>

                        <div className="space-y-2.5 mb-8">
                          {sol.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="flex items-center gap-2.5 text-xs text-white/80">
                              <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-bold text-white group-hover:text-[#e9800a] transition-colors">
                        <span>Explore Technical Architecture</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </RadialGlowCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SAUDI SOVEREIGN HYPERSCALER TOPOLOGY MAP */}
      <section className="relative py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              IN-COUNTRY REGIONAL HYPERSCALERS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Data Sovereignty Without Architectural Compromise
            </h2>
            <p className="text-sm sm:text-base text-white/70 mt-4 leading-relaxed">
              Saudi Arabia is rapidly emerging as the premier computing node in EMEA. AEITCH deploys directly
              into local availability zones—guaranteeing compliance with the Personal Data Protection Law (PDPL)
              and National Cybersecurity Authority (NCA) frameworks.
            </p>
          </div>

          <SaudiSovereignMap />
        </div>
      </section>

      {/* 4. CLOUD MATURITY ASSESSMENT TOOL */}
      <section className="relative py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <CloudMaturityAssessment />
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="relative py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need an Architecture Review for Your Saudi Project?
          </h2>
          <p className="text-sm sm:text-base text-white/70 mb-8">
            Speak directly with our Principal Architects in Riyadh to assess compliance, infrastructure costs, and deployment roadmaps.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/delivery-engine"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>How We Protect IP & Data</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
