import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  CheckCircle2,
  Server,
  Layers,
  ArrowLeft,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SovereignMicroservicesTopology } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'FinTech & SAMA Open Banking Architecture | AEITCH',
  description:
    'SAMA-ready microservices, ISO 20022 financial messaging, mada payment routing, and high-frequency settlement engines built for Saudi financial institutions.',
};

export default function FintechDigitalBankingPage() {
  const capabilities = [
    {
      title: 'SAMA Open Banking API Compliance',
      desc: 'Native implementation of the Saudi Central Bank (SAMA) Open Banking Framework, featuring OAuth2/FAPI profile security, consent management engines, and account information service (AIS) adapters.',
    },
    {
      title: 'ISO 20022 Financial Messaging Engine',
      desc: 'High-throughput parsing and validation of pain, pacs, and camt financial messages for seamless interoperability with Saudi Arabian Riyal Interbank Express (SARIE).',
    },
    {
      title: 'National Payment Gateway Integrations',
      desc: 'Sub-80ms transaction settlement pipelines integrating directly with mada, Apple Pay, STC Pay, and GCC-Net payment switches with automated reconciliation.',
    },
    {
      title: 'Idempotent Ledger & Distributed Concurrency',
      desc: 'Zero-loss double-entry ledgers utilizing optimistic concurrency control, Kafka event sourcing, and Redis state locks ensuring absolute data integrity under retail shopping peaks.',
    },
    {
      title: 'Hardware Security Module (HSM) & Tokenization',
      desc: 'PCI-DSS certified architecture with in-country HSM key management, field-level PII encryption, and zero-knowledge payment tokenization vaults.',
    },
    {
      title: 'Automated Fraud & Anomaly Telemetry',
      desc: 'Real-time transaction profiling scanning for anomalous velocity, geographical jumps, and synthetic identity fraud with sub-15ms inline evaluation latency.',
    },
  ];

  const metrics = [
    { val: '< 80ms', label: 'P99 Payment Processing Latency' },
    { val: '99.999%', label: 'Settlement Engine Availability' },
    { val: '100%', label: 'SAMA Open Banking Standard Compliance' },
    { val: 'Zero', label: 'Data Loss During Peak Surges' },
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
              <CreditCard className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                FINTECH & SAMA COMPLIANT SYSTEMS
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Silicon Valley FinTech Velocity. SAMA Regulatory Precision.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We design and engineer enterprise-grade financial technology platforms, open banking microservices,
              and payment routing backbones built to withstand high-concurrency transaction loads within Saudi borders.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Request FinTech Architecture Review</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>View All Solutions</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. QUANTIFIED METRICS STRIP */}
      <section className="py-12 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#e9800a] font-mono">{m.val}</div>
                <div className="text-xs text-white/60 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE CAPABILITIES */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              FINANCIAL ARCHITECTURAL CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Engineered for High-Frequency Saudi Settlement
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

      {/* 4. SCHEMATIC: EVENT-DRIVEN TOPOLOGY */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              FINTECH STREAMING ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Distributed Event-Driven Payment Bus
            </h2>
            <p className="text-sm text-white/70 mt-3">
              Real-time message routing between API gateways, Apache Kafka event streaming, and sovereign transactional ledgers.
            </p>
          </div>
          <SovereignMicroservicesTopology />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Building a Regulated FinTech in Saudi Arabia?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Let our principal architects audit your payment pipeline for SAMA compliance, ISO 20022 message integrity, and sub-80ms concurrency.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Book FinTech Architectural Consultation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
