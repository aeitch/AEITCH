import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Cpu,
  Radio,
  Layers,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Activity,
  Globe2,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SaudiSovereignMap } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Giga-Projects & Smart Infrastructure Platforms | AEITCH',
  description:
    'IoT ingestion backbones, cognitive digital twins, edge microservices, and SCADA-compliant cloud platforms engineered for Saudi Arabia’s Vision 2030 giga-developments.',
};

export default function GigaProjectsSmartInfrastructurePage() {
  const capabilities = [
    {
      title: 'High-Concurrency IoT Sensor Ingestion',
      desc: 'Distributed messaging pipelines handling 1,000,000+ telemetry events per second across smart energy meters, environmental monitors, and automated building management systems.',
    },
    {
      title: 'Real-Time Cognitive Digital Twins',
      desc: '3D spatial telemetry engines synchronizing physical asset states with virtual BIM models in sub-100ms, enabling predictive maintenance and AI asset lifecycle simulation.',
    },
    {
      title: 'Edge Computing & Autonomous Nodes',
      desc: 'Kubernetes edge clusters (K3s) deployed on localized gateway hardware, enabling offline decision autonomy for critical facilities when wide-area connectivity fluctuates.',
    },
    {
      title: 'SCADA / OT & Enterprise IT Air-Gapping',
      desc: 'Hardened unidirectional data diodes and Zero-Trust boundary architectures bridging operational operational technology (OT) to enterprise cloud analytics without exposing industrial controls.',
    },
    {
      title: 'Geospatial & Spatial Asset Telemetry',
      desc: 'Distributed GIS databases (PostGIS, GeoServer) processing spatial telemetry, drone survey point clouds, and asset logistics across vast regional master developments.',
    },
    {
      title: 'NCA OT/ICS Critical Infrastructure Compliance',
      desc: 'Full alignment with the National Cybersecurity Authority’s Operational Technology cybersecurity controls (NCA OTCC-1:2022) ensuring critical infrastructure resilience.',
    },
  ];

  const metrics = [
    { val: '1M+/sec', label: 'Telemetry Events Ingestion Rate' },
    { val: '< 50ms', label: 'Local Edge Processing Latency' },
    { val: 'Tier-IV', label: 'Critical Infrastructure Reliability' },
    { val: '100%', label: 'NCA OTCC & ECC Framework Alignment' },
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
              <Building2 className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                VISION 2030 GIGA-PROJECT PLATFORMS
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Software Architectures for the World’s Most Ambitious Developments
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              From NEOM and the Red Sea to urban cognitive districts in Riyadh, we engineer the digital nervous system:
              IoT ingestion, digital twins, and resilient edge clusters built for national infrastructure scale.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Consult with Principal Smart Infrastructure Architect</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Explore All Solutions</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. QUANTIFIED METRICS */}
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

      {/* 3. CAPABILITIES */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              CRITICAL INFRASTRUCTURE CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Cognitive Digital Infrastructure at Scale
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

      {/* 4. SOVEREIGN MAP INTEGRATION */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              KINGDOM COMPUTE MESH
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Connecting Neom, Riyadh, Jeddah, and the Eastern Province
            </h2>
          </div>
          <SaudiSovereignMap />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Architecting a Giga-Project Platform?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Our principal systems engineers bring deep expertise in high-concurrency IoT backbones and NCA OT security.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Initiate Discovery Workshop</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
