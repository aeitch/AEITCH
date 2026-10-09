import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Zap,
  Clock,
  Building,
  Key,
  FileCode,
  Users,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { DeliveryEngineTriad } from '@/components/schematics/DeliveryEngineTriad';

export const metadata: Metadata = {
  title: 'The AEITCH Delivery Engine | How We Work & Protect Your IP',
  description:
    'Silicon Valley architectural governance, Riyadh local alignment, and high-velocity offshore scaling—fortified by Zero-Trust security, synthetic data testing, and rock-solid IP protection.',
};

export default function DeliveryEnginePage() {
  const securityPillars = [
    {
      title: 'Zero-Trust Client Bastion Access',
      desc: 'Engineers access your infrastructure strictly through client-owned and managed bastion hosts, corporate VPNs, and Privileged Access Management (PAM) with full keystroke audit logging.',
      icon: Lock,
    },
    {
      title: 'Strict Production Data Sanitization',
      desc: 'Production data never enters developer environments or offshore nodes. All development and staging testing is performed against anonymized, synthetic datasets.',
      icon: ShieldCheck,
    },
    {
      title: 'Dual Contractual & Legal Protection',
      desc: 'Flexible legal scaffolding: contract under our US legal entity with standard Delaware/California commercial protections, or under Saudi commercial law with strict NDA and IP assignment clauses.',
      icon: FileCheck,
    },
    {
      title: '100% Continuous IP Transfer',
      desc: 'Every Git commit, documentation asset, and cloud resource is pushed directly into client-owned repositories. Zero vendor lock-in; you retain complete ownership from day one.',
      icon: Key,
    },
  ];

  const deliverySteps = [
    {
      number: '01',
      title: 'Architectural Discovery & ADR Blueprinting',
      desc: 'US Principal Architects conduct deep technical scoping to establish C4 architecture diagrams, database schemas, and Architecture Decision Records (ADRs).',
    },
    {
      number: '02',
      title: 'Landing Zone Provisioning & Zero-Trust Setup',
      desc: 'Automated provisioning of in-country cloud VPCs, HashiCorp Vault secrets, CI/CD runners, and client-controlled developer bastions.',
    },
    {
      number: '03',
      title: 'Two-Week Agile Sprint Cadence',
      desc: 'High-velocity feature delivery with daily standups in Riyadh working hours (GMT+3), weekly staging deployments, and automated testing.',
    },
    {
      number: '04',
      title: 'Security Hardening & Penetration Verification',
      desc: 'Automated SAST/DAST scanning, container vulnerability verification, and independent penetration testing ensuring NCA ECC and PDPL compliance.',
    },
    {
      number: '05',
      title: 'Continuous Deployment & Knowledge Handover',
      desc: 'Seamless production launch paired with structured training for your internal engineering team and 100% source code repository handover.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <Zap className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                THE AEITCH DELIVERY ENGINE
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              US Architectural Governance. High-Velocity Pods. Absolute IP Safety.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We eliminated the traditional trade-off between inflated domestic consultancy pricing and unreliable offshore execution.
              Our 3-pillar triad guarantees Silicon Valley rigor, Riyadh time-zone alignment, and airtight data security.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/delivery-engine/security-ip-protection"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Read Full Security & IP Protection Policy</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Schedule Architectural Audit</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE 3-PILLAR ADVANTAGE INFOGRAPHIC */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <DeliveryEngineTriad />
        </div>
      </section>

      {/* 3. HOW WE PROTECT YOUR IP & DATA */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SECURITY & LEGAL ASSURANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How We Protect Your Intellectual Property & Data
            </h2>
            <p className="text-sm text-white/70 mt-3">
              We address Saudi enterprise data sensitivity head-on with structural Zero-Trust access and legal guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityPillars.map((sp, idx) => {
              const Icon = sp.icon;
              return (
                <RadialGlowCard key={idx} className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{sp.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{sp.desc}</p>
                </RadialGlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 5-STEP DELIVERY METHODOLOGY */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              DELIVERY CADENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Predictable, Agile Execution
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {deliverySteps.map((step, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-6 p-6 rounded-2xl border border-white/10 bg-surface">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] font-mono font-bold text-lg shrink-0">
                  {step.number}
                </span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Partner with a Delivery Engine Built for Predictability
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Discuss your upcoming product or migration with our principal architects and regional directors.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Book Architectural Consultation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
