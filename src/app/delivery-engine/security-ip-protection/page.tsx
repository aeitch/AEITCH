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
  Key,
  FileText,
  AlertCircle,
  EyeOff,
  UserCheck,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';

export const metadata: Metadata = {
  title: 'How We Protect Your IP & Data | Zero-Trust Architecture | AEITCH',
  description:
    'Comprehensive overview of AEITCH’s Zero-Trust access architecture, production data sanitization, synthetic datasets, and dual US/Saudi legal contracting safeguards.',
};

export default function SecurityIpProtectionPage() {
  const sections = [
    {
      title: '1. Zero-Trust Access & Privileged Access Management (PAM)',
      icon: Lock,
      points: [
        'Client-Controlled Bastion Architecture: AEITCH engineers never hold persistent administrative keys. Access to any cloud environment is channeled through client-hosted bastion jump boxes or AWS/Azure Session Manager with multi-factor authentication (MFA).',
        'Time-Bound Ephemeral Credentials: All session tokens expire after maximum 60 minutes and require explicit client authorization for renewal.',
        'Comprehensive Audit Logging & Session Recording: 100% of shell commands, database queries, and deployment events are logged directly into client-controlled CloudTrail or SIEM systems.',
      ],
    },
    {
      title: '2. Absolute Production Data Sanitization',
      icon: EyeOff,
      points: [
        'Strict Data Boundary: Production customer data NEVER touches local developer machines, offshore staging environments, or external systems.',
        'Synthetic Test Data Generation: Our QA teams generate statistically accurate synthetic datasets mimicking production schema distributions without containing a single real PII record.',
        'Automated Loss-Prevention Scanners: All Git commits and pull requests are automatically analyzed by automated secret and PII scanners to ensure zero accidental credential or record commits.',
      ],
    },
    {
      title: '3. Legal, Contractual, & IP Assignment Safeguards',
      icon: FileCheck,
      points: [
        'Dual Legal Entity Flexibility: Clients can contract directly with our US corporation (standard commercial governance under Delaware/California law) or via localized Saudi commercial agreements.',
        'Irrevocable IP Assignment: Comprehensive assignment clauses stipulate that all intellectual property, source code, designs, and database schemas created during the engagement belong exclusively and immediately to the client.',
        'Strict Bilateral NDAs: Non-disclosure agreements with heavy contractual damages protect all commercial trade secrets, architectural blueprints, and business plans.',
      ],
    },
    {
      title: '4. Physical & Infrastructure Security',
      icon: ShieldCheck,
      points: [
        'Enterprise MDM & Encrypted Hardware: All engineering machines are centrally managed via Mobile Device Management (MDM) with enforced FileVault/BitLocker full-disk encryption and remote wipe capabilities.',
        'Clean Desk & Screen Shielding Policies: Offshore hubs operate under strict physical access controls, biometric entrance verification, and clean-screen protocols.',
        'Background-Checked Senior Personnel: Every engineer assigned to client pods undergoes rigorous criminal background checks and identity verification.',
      ],
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <ShieldCheck className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                DATA SOVEREIGNTY & IP PROTECTION POLICY
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              How We Protect Your Intellectual Property & Data
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Saudi enterprises are historically sensitive about offshore delivery models. We address this head-on with
              structural Zero-Trust infrastructure, complete data sanitization, and enforceable legal protections.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SECURITY ASSURANCE DEEP DIVE */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-5xl space-y-12">
          {sections.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <RadialGlowCard key={idx} className="p-8 sm:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] shrink-0">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white">{sec.title}</h2>
                </div>
                <div className="space-y-4">
                  {sec.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-3 text-sm text-white/80 leading-relaxed">
                      <CheckCircle2 className="h-5 w-5 text-[#e9800a] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </RadialGlowCard>
            );
          })}
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Require Custom NDA Scaffolding or Security Review?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Our legal and security officers are available to align on mutual non-disclosure agreements, security questionnaires, and infrastructure access protocols.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Request Security Scoping Call</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
