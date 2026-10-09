import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Users,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  GitPullRequest,
  Calendar,
  Layers,
  Terminal,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { DeliveryEngineTriad } from '@/components/schematics/DeliveryEngineTriad';

export const metadata: Metadata = {
  title: 'Dedicated Engineering Squads & Managed Pods | AEITCH',
  description:
    'Dedicated high-velocity product pods with continuous GMT+3 Riyadh working hours overlap, direct Slack/Jira access, and US principal architectural governance.',
};

export default function DedicatedEngineeringSquadsPage() {
  const podRoles = [
    {
      role: 'Principal Product Architect (US Oversight)',
      desc: 'Drives system design, enterprise C4 diagrams, ADR documentation, and enforces non-monolithic scalability standards before sprint kickoff.',
    },
    {
      role: 'Staff DevOps & Platform Lead',
      desc: 'Maintains zero-drift Terraform environments, automated CI/CD pipelines, container registries, and monitors Kubernetes production clusters.',
    },
    {
      role: 'Senior Full-Stack Engineers (Pakistan Delivery Hub)',
      desc: 'High-throughput domain implementation in Next.js/React, TypeScript, Go, and Python with strict unit testing and type safety.',
    },
    {
      role: 'Dedicated Automation & QA Lead',
      desc: 'Builds end-to-end Playwright tests, API regression suites, and concurrency stress tests ensuring zero defect regressions in production.',
    },
  ];

  const operatingModel = [
    {
      title: 'Full GMT+3 Working Hours Synchronicity',
      desc: 'Engineers are online and active Sunday through Thursday aligned precisely with Riyadh corporate hours. Real-time Slack/Teams collaboration with zero delay.',
    },
    {
      title: 'Direct Access & Transparent Tooling',
      desc: 'No opaque agency account managers. Your tech leaders work directly with pod engineers via dedicated Slack channels, GitHub PRs, and live Jira boards.',
    },
    {
      title: 'Daily Standups & Bi-Weekly Sprint Demos',
      desc: 'Rigorous Agile cadence with 15-minute daily video standups, bi-weekly sprint planning, and live staging demonstrations before production merge.',
    },
    {
      title: 'Zero Long-Term Lock-in & 100% IP Handover',
      desc: 'Flexible 3 to 12-month squad engagements. Complete source code, documentation, and repository ownership is transferred continuously to your organization.',
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
              <Users className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                DEDICATED MANAGED PODS (GMT+3)
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              High-Velocity Engineering Pods Tailored for Riyadh Hours
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Scale your engineering bandwidth with dedicated, senior product pods operating in your time zone (GMT+3)
              under US architectural oversight—delivering maximum output efficiency without bloated agency costs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Request Squad Allocation & Pricing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/delivery-engine"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>The Triad Delivery Engine</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. SQUAD ANATOMY */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SQUAD ANATOMY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How Our Dedicated Pods Are Staffed & Governed
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {podRoles.map((role, idx) => (
              <RadialGlowCard key={idx} className="p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-4">
                  <span className="font-mono font-bold text-sm">0{idx + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{role.role}</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{role.desc}</p>
              </RadialGlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OPERATING MODEL */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              DAILY COLLABORATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Seamless Integration with Your In-House Team
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {operatingModel.map((om, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-surface flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-4">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{om.title}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{om.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE 3-PILLAR TRIAD INFOGRAPHIC */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <DeliveryEngineTriad />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to Onboard a Dedicated Engineering Squad?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Deploy your dedicated pod in under 10 business days. Transparent monthly sprint billing with complete IP protection.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Book Squad Scoping Call</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
