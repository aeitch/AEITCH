import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { AeitchPicture } from '@/components/ui/aeitch-picture';
import {
  ShieldCheck,
  Star,
  Users,
  Code2,
  Cpu,
  Calendar,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Senior Engineering Leadership | AEITCH',
  description:
    'AEITCH is a US-focused product engineering company delivering secure, scalable, and cloud-native digital products with zero architectural debt.',
};

export default function AboutUsPage() {
  const values = [
    {
      icon: Users,
      title: 'Senior Engineers Only',
      description:
        'No bait-and-switch. You work directly with battle-tested senior engineers who have built and scaled systems handling millions of users.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Architectural Debt',
      description:
        'We do not cut corners or write throwaway prototypes. Every platform is architected for long-term maintainability, automated testing, and security.',
    },
    {
      icon: Code2,
      title: 'US-First Communication',
      description:
        'Direct, transparent collaboration with real-time Slack/Teams integration and full overlap with North American business hours.',
    },
    {
      icon: Cpu,
      title: 'Modern AI-Native Tooling',
      description:
        'We leverage cutting-edge AI assisted developer tooling to accelerate development velocity while enforcing rigorous automated lint and security checks.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Founded as a Systems Consultancy',
      description: 'Started by systems engineers to eliminate bloated agency practices and deliver direct senior technical value.',
    },
    {
      year: '2022',
      title: 'Expanded Enterprise Cloud & FinTech Pods',
      description: 'Scaled high-throughput payment settlement architectures and multi-region Kubernetes infrastructure for fast-growing B2B brands.',
    },
    {
      year: '2024',
      title: 'Enterprise AI & Autonomous Systems Pods',
      description: 'Pioneered sovereign on-prem RAG assistants and autonomous agent workflows for healthcare and regulated enterprises.',
    },
    {
      year: '2026',
      title: 'Global Delivery & 100+ Production Launches',
      description: 'Over 100 enterprise software platforms and venture MVPs shipped globally with 98% client retention and a 5.0 Clutch rating.',
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION (PURE BLACK #000000) */}
      <section className="relative min-h-[60vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-20 sm:py-28 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="size-[550px] rounded-full bg-[#e9800a]/15 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#e9800a] bg-[#000000] px-4 py-1.5 backdrop-blur-md">
              <Star className="size-4 fill-[#e9800a] text-[#e9800a]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#e9800a]">
                5.0 RATED ON CLUTCH • 100+ SHIPPED PRODUCTS
              </span>
            </div>
            <h1 className="mt-6 text-balance text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              We Don’t Just Build Software.{' '}
              <span className="text-[#e9800a]">
                We Build What’s Next.
              </span>
            </h1>
            <p className="mt-5 text-pretty text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              AEITCH is an elite digital product engineering company delivering secure, scalable, and cloud-native digital products for enterprises and high-growth ventures.
            </p>
          </ScrollReveal>

          {/* Picture slot for Engineering Team & Leadership */}
          <ScrollReveal delay={0.15} yOffset={25}>
            <div className="mt-12 max-w-3xl mx-auto">
              <AeitchPicture
                src="/images/aeitch-about-engineering.svg"
                alt="AEITCH Senior Engineering Team and Systems Architecture War-Room"
                aspectRatioClass="aspect-[16/9]"
                badgeLabel="PRINCIPAL ENGINEERS ONLY"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. CORE VALUES BENTO (CONTRAST BG: PURE WHITE #ffffff) */}
      <section className="relative w-full py-20 sm:py-28 bg-[#ffffff] text-[#000000] border-b border-black/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <ScrollReveal delay={0.05} yOffset={20}>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#e9800a]">
                THE AEITCH PRINCIPLES
              </span>
              <h2 className="mt-4 text-balance text-3xl sm:text-5xl font-black text-[#000000]">
                How We Are Fundamentally Different
              </h2>
              <p className="mt-4 text-pretty text-base sm:text-lg text-black/75">
                Traditional agencies bill hours; we deliver resilient engineering assets that compound in value.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((v, idx) => {
              const Icon = v.icon;
              return (
                <ScrollReveal key={v.title} delay={0.1 * idx} yOffset={20}>
                  <div className="h-full rounded-2xl border-2 border-black/10 bg-[#ffffff] p-8 shadow-md transition-all duration-300 hover:border-[#e9800a] hover:shadow-[0_12px_30px_rgba(233,128,10,0.18)] hover:-translate-y-1">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-[#000000] text-[#e9800a] border border-black mb-5 shadow-sm">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-balance text-xl font-black text-[#000000] mb-2">{v.title}</h3>
                    <p className="text-pretty text-base text-black/80 leading-relaxed font-normal">{v.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. JOURNEY & MILESTONES (CONTRAST BG: PURE BLACK #000000) */}
      <section className="relative w-full py-20 sm:py-28 bg-[#000000] text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <ScrollReveal delay={0.05} yOffset={20}>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#e9800a]">
                OUR TRAJECTORY
              </span>
              <h2 className="mt-4 text-balance text-3xl sm:text-4xl font-black text-white">
                6+ Years of Relentless Execution
              </h2>
            </ScrollReveal>
          </div>

          {/* Picture slot for Zero-Debt Architecture Delivery */}
          <div className="mb-12">
            <AeitchPicture
              src="/images/aeitch-about-mission.svg"
              alt="AEITCH Zero Architectural Debt Guarantee and Timeline"
              aspectRatioClass="aspect-[16/9]"
              badgeLabel="PRODUCTION-HARDENED CODE"
            />
          </div>

          <div className="space-y-8">
            {milestones.map((m, idx) => (
              <ScrollReveal key={m.year} delay={0.1 * idx} yOffset={20}>
                <div className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-white/15 bg-[#000000] p-6 sm:p-8 hover:border-[#e9800a] transition-colors">
                  <div className="font-mono text-3xl font-black text-[#e9800a] shrink-0 sm:w-24">
                    {m.year}
                  </div>
                  <div>
                    <h3 className="text-balance text-xl font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-pretty text-sm sm:text-base text-white/70 leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER (CONTRAST BG: PURE BLACK #000000) */}
      <section className="relative w-full py-20 bg-[#000000] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-balance text-3xl font-black text-white">
            Partner with Senior Engineers Who Care
          </h2>
          <p className="mt-3 text-pretty text-base text-white/70">
            Schedule an introductory consultation to discuss your product roadmap and architecture.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact-us#consultation"
              aria-label="Schedule a Consultation with AEITCH"
              className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-[#e9800a] hover:brightness-110 cursor-pointer"
            >
              <Calendar className="size-4" />
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
