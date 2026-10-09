import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  CloudLightning,
  Server,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Database,
  Lock,
  RefreshCw,
  FileCheck,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { CloudMaturityAssessment } from '@/components/tools/CloudMaturityAssessment';
import { SaudiSovereignMap } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Enterprise Modernization & Saudi Cloud Migration | AEITCH',
  description:
    'Zero-downtime database and application migration to in-country hyperscalers: Google Cloud Dammam, Azure Riyadh, AWS KSA, and Oracle Cloud under strict Saudi PDPL data sovereignty.',
};

export default function EnterpriseCloudMigrationPage() {
  const hyperscalers = [
    {
      name: 'Google Cloud Platform (Dammam Region)',
      region: 'me-central2 (Dammam, KSA)',
      desc: 'BigQuery data lakes, sovereign Kubernetes (GKE), and Vertex AI infrastructure deployed with in-country residency.',
    },
    {
      name: 'Microsoft Azure (Saudi Arabia Central / Riyadh)',
      region: 'saudiarabiacentral (Riyadh, KSA)',
      desc: 'Enterprise Active Directory, sovereign SQL databases, and confidential computing nodes compliant with SDAIA mandates.',
    },
    {
      name: 'Amazon Web Services (AWS Saudi Region)',
      region: 'me-central-1 / KSA Local Zones',
      desc: 'Scalable EKS clusters, DynamoDB, and Aurora multi-AZ databases engineered for high-availability enterprise services.',
    },
    {
      name: 'Oracle Cloud Infrastructure (Riyadh & Jeddah)',
      region: 'me-jeddah-1 / me-riyadh-1',
      desc: 'Exadata Cloud@Customer and autonomous enterprise databases powering heavy ERP, Core Banking, and Oracle EBS systems.',
    },
  ];

  const migrationPhases = [
    {
      phase: 'Phase 01: Automated Dependency Discovery',
      desc: 'Deep inspection of existing monolithic databases, inter-service API couplings, and data egress pathways to establish precise migration boundaries.',
    },
    {
      phase: 'Phase 02: Sovereign Landing Zone Scaffolding',
      desc: 'Terraform-automated provisioning of secure VPCs, Bastion hosts, HashiCorp Vault secrets, and NCA ECC-1:2018 policy guardrails.',
    },
    {
      phase: 'Phase 03: Dual-Write CDC Replication',
      desc: 'Zero-loss Change Data Capture (CDC) streaming continuous updates from legacy databases to target in-country cloud with automated checksum parity audits.',
    },
    {
      phase: 'Phase 04: Zero-Downtime Cutover & Handover',
      desc: 'Canary traffic cutover switching DNS with automated rollback safeguards, followed by complete knowledge transfer to client IT teams.',
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
              <CloudLightning className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                SOVEREIGN HYPERSCALER MIGRATION
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Migrate to Local Saudi Hyperscalers with Zero Data Loss
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Google Cloud Dammam, Azure Riyadh, AWS KSA, and Oracle Cloud. We modernize legacy enterprise workloads,
              decouple monoliths, and enforce complete Saudi PDPL Class 3 data sovereignty.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Book Cloud Migration Assessment</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#diagnostic"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Take 2-Min Diagnostic</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. IN-COUNTRY HYPERSCALERS BREAKDOWN */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              LOCAL COMPUTE REGIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Sovereign Cloud Enablement Across Saudi Arabia
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hyperscalers.map((hs, idx) => (
              <RadialGlowCard key={idx} className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-semibold text-[#e9800a]">{hs.region}</span>
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{hs.name}</h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{hs.desc}</p>
              </RadialGlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 4-PHASE MIGRATION BLUEPRINT */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              METHODOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The Zero-Downtime Migration Engine
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migrationPhases.map((phase, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-surface flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] font-mono font-bold mb-4">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{phase.phase}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SOVEREIGN TOPOLOGY MAP */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <SaudiSovereignMap />
        </div>
      </section>

      {/* 5. DIAGNOSTIC ASSESSMENT TOOL */}
      <section id="diagnostic" className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <CloudMaturityAssessment />
        </div>
      </section>

      {/* 6. CTA */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Planning Your In-Country Cloud Migration?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Speak with our Principal Cloud Architects in Riyadh to structure a risk-free, compliant transition.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Request Enterprise Migration Scope</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
