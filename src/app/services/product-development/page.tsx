import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  Clock,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Smartphone,
  Globe2,
  Database,
  Cpu,
  ShieldCheck,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { MvpRoadmapGantt, SovereignMicroservicesTopology } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Digital Product Development & Rapid MVPs (8 Weeks) | AEITCH',
  description:
    'Full-cycle digital product architecture, rapid 8-week investor-grade MVP launches, and scalable multi-tenant SaaS platforms engineered for Saudi Arabia and GCC markets.',
  openGraph: {
    title: 'Digital Product Development & Rapid MVPs (8 Weeks) | AEITCH',
    description:
      'From concept to scaled production in 8 weeks. Full-cycle digital product engineering, bilingual GCC UX/UI, and multi-tenant SaaS architecture.',
    url: 'https://aeitch.com/services/product-development',
    siteName: 'AEITCH',
    type: 'website',
  },
  alternates: {
    canonical: 'https://aeitch.com/services/product-development',
  },
};

export default function ProductDevelopmentPage() {
  const pillars = [
    {
      icon: Clock,
      title: '8-Week Rapid MVP Engine',
      badge: 'Fixed 60-Day Sprint',
      description:
        'A disciplined venture engineering sprint transforming validated requirements into an investor-grade, production-ready web and mobile platform without scope creep.',
      highlights: ['Guaranteed sprint deliverables', 'Zero throwaway code', 'Clean Next.js 15 & Prisma architecture'],
    },
    {
      icon: Globe2,
      title: 'Bilingual GCC Experience Engineering',
      badge: 'Arabic RTL Native',
      description:
        'Culturally fluent UX/UI designed specifically for Saudi and Gulf user behavior. Seamless right-to-left layout dynamics, localized typography, and certified payment checkouts (mada, Apple Pay).',
      highlights: ['Native Arabic RTL design systems', 'mada & Apple Pay checkout integration', 'ZATCA e-invoicing compliance ready'],
    },
    {
      icon: Database,
      title: 'Enterprise Multi-Tenant SaaS Foundation',
      badge: 'Scalable Architecture',
      description:
        'Robust multi-tenant foundations with isolated database schema partitioning, dynamic tenant subdomain routing, role-based access control (RBAC), and enterprise SSO (SAML/Okta).',
      highlights: ['Schema-isolated database tenancy', 'Enterprise SSO & audit logging', 'Custom domain & SSL provisioning'],
    },
    {
      icon: Smartphone,
      title: 'Cross-Platform Mobile Applications',
      badge: 'iOS & Android Sync',
      description:
        'High-performance React Native and native iOS/Android mobile clients with sub-80ms API synchronization, offline-first SQLite caches, and real-time push notification pipelines.',
      highlights: ['Sub-80ms API synchronization', 'Offline-first state hydration', 'Biometric auth (FaceID / Fingerprint)'],
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#080808] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. ASYMMETRIC EXECUTIVE HERO */}
      <section className="relative min-h-[75vh] w-full flex items-center justify-center overflow-hidden bg-[#080808] py-24 sm:py-32 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[600px] w-[600px] rounded-full bg-[#e9800a]/10 blur-[180px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl text-center">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <Rocket className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                FULL-CYCLE DIGITAL PRODUCT DEVELOPMENT
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
              Turn Ambitious Vision into Scaled Reality in{' '}
              <span className="text-[#e9800a]">8 Weeks</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-10">
              We operate as your dedicated venture and product engineering squad—architecting investor-grade digital platforms,
              bilingual GCC consumer apps, and multi-tenant SaaS products engineered to scale to 100,000+ users without architectural rework.
            </p>
          </ScrollReveal>

          {/* Audited Metrics Strip */}
          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-10 text-start font-mono">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[10px] text-white/40 uppercase block">TIMELINE SLA</span>
                <span className="text-2xl font-black text-white block mt-1">8 Weeks</span>
                <span className="text-[10px] text-[#e9800a] block">Concept to Production</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[10px] text-white/40 uppercase block">IP TRANSFER</span>
                <span className="text-2xl font-black text-white block mt-1">100%</span>
                <span className="text-[10px] text-[#e9800a] block">Full Source Code Ownership</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[10px] text-white/40 uppercase block">UX ARCHITECTURE</span>
                <span className="text-2xl font-black text-white block mt-1">AR / EN</span>
                <span className="text-[10px] text-[#e9800a] block">Native GCC RTL Fluent</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
                <span className="text-[10px] text-white/40 uppercase block">SCALABILITY</span>
                <span className="text-2xl font-black text-white block mt-1">100k+</span>
                <span className="text-[10px] text-[#e9800a] block">Concurrent User Headroom</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25} yOffset={20}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-us#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-8 py-4 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors shadow-lg shadow-[#e9800a]/20"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Product Architecture Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#roadmap"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>Inspect 8-Week Gantt</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. CORE PILLARS BENTO */}
      <section className="py-24 sm:py-32 bg-[#0c0c0e] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              DISCIPLINED PRODUCT ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Engineered for Enterprise Validation & Scale
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              Every product we build follows strict architectural governance to ensure you can raise funding,
              onboard institutional enterprise clients, and scale without rebuilding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={pillar.title} delay={idx * 0.1} yOffset={25}>
                  <RadialGlowCard className="h-full flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-[#e9800a]/60">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a]">
                          <Icon className="h-6 w-6" />
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#e9800a] bg-[#e9800a]/10 border border-[#e9800a]/20 px-3 py-1 rounded-full">
                          {pillar.badge}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3">
                        {pillar.title}
                      </h3>

                      <p className="text-sm text-white/70 leading-relaxed mb-6">
                        {pillar.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-white/10">
                        {pillar.highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2.5 text-xs text-white/90">
                            <CheckCircle2 className="h-4 w-4 text-[#e9800a] shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </RadialGlowCard>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. 8-WEEK SPRINT CADENCE GANTT (INTERACTIVE COMPONENT) */}
      <section id="roadmap" className="py-24 sm:py-32 bg-[#080808] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SPRINT CADENCE TIMELINE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              The 8-Week Launch Gantt Blueprint
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Clear, transparent milestone gates from discovery to staging and production deployment in Saudi Arabia.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <MvpRoadmapGantt />
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURAL TOPOLOGY SCHEMATIC */}
      <section className="py-24 sm:py-32 bg-[#0c0c0e] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SCALABLE ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
              Microservices & Multi-Tenant Event Mesh
            </h2>
            <p className="text-sm sm:text-base text-white/70">
              Every product is built with clean boundaries, async message queues, and zero architectural debt.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <SovereignMicroservicesTopology />
          </div>
        </div>
      </section>

      {/* 5. EXECUTIVE CONSULTATION CTA */}
      <section className="py-20 sm:py-28 bg-[#080808]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-10 sm:p-14 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Ready to Launch Your Digital Product in 8 Weeks?
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
              Schedule a 30-minute architecture review with our Principal Product Engineers in Riyadh.
              We will review your product spec, map out an 8-week sprint roadmap, and estimate fixed deliverables.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact-us#consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-8 py-4 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Product Architecture Call</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>View All 4 Disciplines</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
