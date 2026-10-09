import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  Rocket,
  ShieldCheck,
  Zap,
  Layers,
  ArrowRight,
  CheckCircle2,
  Code2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { MvpRoadmapGantt } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'High-Growth SaaS & Venture-Backed Products | AEITCH',
  description:
    'Full-cycle product engineering and rapid 8-week production MVP delivery for venture-backed startups and scale-ups expanding across Saudi Arabia and the GCC.',
};

export default function HighGrowthSaasPage() {
  const pillars = [
    {
      title: '8-Week Production MVP Sprints',
      desc: 'Structured 8-week engineering sprints taking you from technical architecture to a live, production-tested SaaS platform ready for customer transactions and investor demos.',
    },
    {
      title: 'Multi-Tenant Isolation & Security',
      desc: 'Row-level security (RLS) and schema-per-tenant isolation models ensuring client data separation while keeping infrastructure footprint and cloud costs highly efficient.',
    },
    {
      title: 'Flawless Bilingual & RTL Architecture',
      desc: 'Native Arabic and English support with mirrored typographic hierarchies, smooth font rendering, and zero layout breakage on right-to-left UI switches.',
    },
    {
      title: 'Localized GCC Billing & Subscriptions',
      desc: 'Turnkey payment integration with mada, Apple Pay, STC Pay, and Stripe with automated ZATCA-compliant e-invoicing (Fatoora Phase 2 readiness).',
    },
    {
      title: 'Automated CI/CD & Scalable Stack',
      desc: 'Modern tech stack (Next.js 15, TypeScript, Node/Go, PostgreSQL, Redis, Docker) built to scale effortlessly from 1,000 to 1,000,000 users without refactoring.',
    },
    {
      title: '100% IP & Codebase Handover',
      desc: 'Complete ownership of all source code, documentation, CI/CD pipelines, and cloud accounts transferred to your company upon milestone completion.',
    },
  ];

  const metrics = [
    { val: '8 Weeks', label: 'Idea to Live Production Launch' },
    { val: '100%', label: 'Source Code & IP Ownership' },
    { val: '12x', label: 'Faster Than Traditional In-House Hiring' },
    { val: '60%', label: 'Capital Efficiency vs Domestic Agencies' },
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
              <Flame className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                VENTURE-BACKED SAAS ACCELERATION
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Launch Your Enterprise SaaS in Saudi Arabia in 8 Weeks
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Skip 9 months of engineering delays and bloated hiring costs. Our high-velocity product pods build
              scalable, multi-tenant digital platforms engineered for GCC market dominance.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Book 8-Week MVP Scoping Call</span>
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

      {/* 2. METRICS STRIP */}
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
              FOUNDER-FIRST PRODUCT DISCIPLINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built for Speed, Engineered for Scale
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((p, idx) => (
              <RadialGlowCard key={idx} className="p-8 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] mb-6">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">{p.desc}</p>
                </div>
              </RadialGlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. GANTT ROADMAP TIMELINE */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              SPRINT CADENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The 8-Week Rapid MVP Sprint Roadmap
            </h2>
          </div>
          <MvpRoadmapGantt />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Ready to Build Your Venture-Backed Product?
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Schedule a scoping session to blueprint your MVP architecture, tech stack, and 8-week release plan.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Initiate MVP Discovery</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
