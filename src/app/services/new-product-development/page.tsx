import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Rocket,
  Clock,
  Compass,
  Layout,
  Gauge,
  Sparkles,
  ArrowRight,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { MvpRoadmapGantt } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Rapid MVP & New Product Development (6-8 Weeks) | AEITCH',
  description:
    'From concept to scaled production in 6 to 8 weeks. High-velocity startup and venture engineering delivering scalable web and mobile MVPs.',
};

export default function NewProductDevelopmentPage() {
  const features = [
    {
      icon: Clock,
      title: '6–8 Week Fixed-Timeline Delivery',
      description: 'Guaranteed sprint deliverables moving ideas to production without scope creep.',
    },
    {
      icon: Gauge,
      title: 'Built on Foundations That Scale',
      description: 'No throwaway code. Every MVP is architected on clean Next.js, Prisma, and PostgreSQL.',
    },
    {
      icon: Sparkles,
      title: 'Conversion-Optimized UX/UI',
      description: 'Ultra-modern, polished aesthetics engineered to attract early enterprise customers and investors.',
    },
    {
      icon: Rocket,
      title: 'Post-Launch Velocity Sprints',
      description: 'Seamless continuity from initial MVP to Series A scaling with our dedicated engineering pods.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION (PURE BLACK) */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <Rocket className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                VENTURE & MVP ENGINEERING
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={25}>
            <h1 className="mt-8 max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              From Concept to Market in{' '}
              <span className="text-[#e9800a]">
                6 to 8 Weeks
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25} yOffset={20}>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
              We operate as your dedicated venture engineering team, turning early-stage concepts into production-grade web and mobile platforms designed to scale.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35} yOffset={20}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#e9800a] px-8 py-4 text-base font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Book MVP Scoping Call
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. TIMELINE ROADMAP (PURE WHITE CONTRAST SECTION) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <ScrollReveal delay={0.05} yOffset={20}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
                THE 8-WEEK LAUNCH BLUEPRINT
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-black text-black">
                How We Deliver at Relentless Velocity
              </h2>
              <p className="mt-4 text-base sm:text-lg text-black/70">
                Disciplined execution milestones designed to validate your hypothesis and secure initial traction.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} yOffset={25}>
            <div className="max-w-5xl mx-auto">
              <MvpRoadmapGantt />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. VALUE PROPOSITIONS (PURE BLACK) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#000000] border-t border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.title} delay={0.1 * idx} yOffset={20}>
                  <div className="rounded-2xl border border-white/15 bg-white/5 p-8 h-full transition-all hover:border-[#e9800a]">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#e9800a] border border-white/15 mb-5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-base text-white/70 leading-relaxed">{feat.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. CTA SECTION (PURE BLACK) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/15 bg-[#000000] p-10 sm:p-14 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Have an Idea You Need to Launch in 60 Days?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Schedule a 30-minute product architecture call. We will review your requirements and provide an estimated budget and sprint plan.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Schedule Your MVP Scoping Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
