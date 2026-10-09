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
  Terminal,
  ShieldAlert,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { LeadMagnetCard } from '@/components/ui/lead-magnet-card';

export const metadata: Metadata = {
  title: 'DevSecOps & Saudi Compliance (NCA & PDPL) | AEITCH',
  description:
    'Automated secret management with HashiCorp Vault, CI/CD pipeline security (SonarQube, Snyk, Trivy), CSPM, and automated compliance reporting for NCA ECC/CCC and PDPL.',
};

export default function DevSecOpsKsaCompliancePage() {
  const capabilities = [
    {
      title: 'Automated Secret Management (HashiCorp Vault)',
      desc: 'Elimination of static hardcoded credentials with dynamic, short-lived secrets, automated database credential rotation, and zero-knowledge application identity authentication.',
    },
    {
      title: 'Shift-Left CI/CD Pipeline Scanning',
      desc: 'Automated static application security testing (SAST with SonarQube), software composition analysis (SCA with Snyk), and container vulnerability scanning (Trivy) blocking insecure commits.',
    },
    {
      title: 'Cloud Security Posture Management (CSPM)',
      desc: 'Continuous real-time auditing of multi-cloud infrastructure configurations against CIS Benchmarks, alerting immediately on exposed S3 buckets, misconfigured IAM, or public endpoints.',
    },
    {
      title: 'NCA ECC-1:2018 & CCC-1:2020 Compliance Guardrails',
      desc: 'Pre-configured Terraform policy-as-code guardrails ensuring cloud deployments strictly adhere to the National Cybersecurity Authority’s Essential and Cloud Cybersecurity Controls.',
    },
    {
      title: 'Saudi PDPL Class 3 Data Sovereignty Enforcement',
      desc: 'Strict in-kingdom cryptographic data isolation, field-level encryption at rest, automated processing record logging, and cross-border data transfer blocking.',
    },
    {
      title: 'Automated Executive Audit Reporting',
      desc: 'One-click compliance reporting generating evidentiary documentation for internal risk committees, external CISO auditors, and regulatory inspection bodies.',
    },
  ];

  const frameworks = [
    { name: 'NCA ECC-1:2018', role: 'Essential Cybersecurity Controls' },
    { name: 'NCA CCC-1:2020', role: 'Cloud Cybersecurity Controls' },
    { name: 'Saudi PDPL', role: 'Personal Data Protection Law' },
    { name: 'NDMO Data Standards', role: 'National Data Management Office' },
    { name: 'ISO 27001 Readiness', role: 'Information Security Management' },
    { name: 'SOC 2 Type II Practices', role: 'Operational Security & Trust' },
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
              <ShieldCheck className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                DEVSECOPS & SAUDI CYBERSECURITY
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Shift-Left Security Aligned with Saudi NCA & PDPL Mandates
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We integrate automated security checks directly into your developer deployment pipelines. Zero hardcoded secrets,
              continuous container scanning, and airtight in-country data sovereignty.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Request DevSecOps Compliance Audit</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Explore Capabilities</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. REGULATORY FRAMEWORKS STRIP */}
      <section className="py-16 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              FRAMEWORK ALIGNMENT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Sovereign & Enterprise Regulatory Standards
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {frameworks.map((fw, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/10 bg-surface text-center">
                <span className="text-xs font-bold text-white block mb-1">{fw.name}</span>
                <span className="text-[10px] text-white/60">{fw.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CAPABILITIES */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SECURITY AUTOMATION ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Automated Guardrails from Code to Cloud
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <RadialGlowCard key={idx} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-6">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{cap.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{cap.desc}</p>
                </div>
              </RadialGlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LEAD MAGNET: DEVSECOPS CHECKLIST */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              COMPLIANCE TOOLKIT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Download the Enterprise DevSecOps Audit Checklist
            </h2>
          </div>
          <LeadMagnetCard type="checklist" />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Prepare Your Infrastructure for Sovereign Cybersecurity Audit
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Let our DevSecOps security engineers conduct a comprehensive gap analysis against NCA and PDPL requirements.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Book Cybersecurity Discovery Call</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
