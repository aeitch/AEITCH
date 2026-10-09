import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Server,
  Building,
  Users,
  Compass,
  Phone,
  MessageSquare,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SaudiSovereignMap } from '@/components/schematics';
import { CloudMaturityAssessment } from '@/components/tools/CloudMaturityAssessment';

export const metadata: Metadata = {
  title: 'Saudi Arabia Hub & Vision 2030 Commitment | AEITCH',
  description:
    'AEITCH’s Riyadh Technical Hub on King Fahd Road / KAFD: In-country cloud migration, Vision 2030 digital transformation, GMT+3 synchronicity, and on-site architecture workshops.',
};

export default function SaudiHubPage() {
  const pillars = [
    {
      title: 'Riyadh On-Site Discovery & Architecture Workshops',
      desc: 'Our technical directors and principal architects conduct on-site discovery sessions in Riyadh (KAFD, Olaya, and Digital City) to align system design directly with executive stakeholders.',
      icon: MapPin,
    },
    {
      title: 'Full GMT+3 Working Hours Synchronicity',
      desc: 'Operating Sunday through Thursday aligned with Saudi enterprise business hours. Real-time Slack/Teams collaboration, rapid standups, and zero timezone communication latency.',
      icon: Clock,
    },
    {
      title: 'Saudi Sovereign Cloud & PDPL Guardrails',
      desc: 'Engineering strictly for in-kingdom cloud regions (Google Cloud Dammam, Azure Riyadh, AWS KSA, Oracle Cloud) ensuring full compliance with SDAIA and National Cybersecurity Authority rules.',
      icon: ShieldCheck,
    },
    {
      title: 'Knowledge Handover & Local Capability Building',
      desc: 'We mentor and pair-program with client technical personnel throughout development, transferring complete architectural documentation and source code to empower national talent.',
      icon: Users,
    },
  ];

  const strategicSectors = [
    { name: 'FinTech & Open Banking', desc: 'SAMA Open Banking, ISO 20022 messaging, mada payment routing.' },
    { name: 'Logistics & Supply Chain', desc: 'Fleet routing, real-time tracking, port and warehouse microservices.' },
    { name: 'Digital Health & HealthTech', desc: 'Telemedicine, encrypted patient records, and health data sovereignty.' },
    { name: 'Smart Cities & Giga-Projects', desc: 'IoT sensor ingestion, digital twins, and autonomous edge compute.' },
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
              <Sparkles className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                RIYADH TECHNICAL HUB & VISION 2030
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Rooted in Riyadh. Engineered for the Kingdom’s Digital Frontier.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We bring Silicon Valley-grade cloud architecture directly to Saudi Arabia’s enterprises, giga-projects,
              and venture-backed scale-ups—fully aligned with national data sovereignty and Vision 2030 digital mandates.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Book On-Site Riyadh Discovery Session</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/966118294400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                <span>Chat via WhatsApp (+966 11 829 4400)</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. RIYADH HUB ENGAGEMENT PILLARS */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              LOCAL PRESENCE & MANDATES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Why Saudi Enterprises Partner with AEITCH
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p, idx) => {
              const Icon = p.icon;
              return (
                <RadialGlowCard key={idx} className="p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-6">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{p.desc}</p>
                </RadialGlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. STRATEGIC SECTORS STRIP */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              NATIONAL DIGITALIZATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Pioneering Systems in Priority Vision 2030 Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicSectors.map((sec, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-white/10 bg-surface flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2">{sec.name}</h4>
                  <p className="text-xs text-white/70 leading-relaxed">{sec.desc}</p>
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

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Schedule an Executive Briefing in Riyadh
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Our Principal Architects are ready to meet on-site at your offices in Riyadh or coordinate a discovery workshop.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>Explore Vision 2030 Solutions</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
