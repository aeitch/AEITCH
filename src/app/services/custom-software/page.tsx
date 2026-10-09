import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Code,
  Layers,
  Cpu,
  Shield,
  Zap,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Database,
  Workflow,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SovereignMicroservicesTopology } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Custom Software Development & Distributed Systems | AEITCH',
  description:
    'High-throughput enterprise platforms, ultra-low latency APIs, multi-tenant SaaS architecture, and resilient distributed microservices with zero architectural debt.',
};

export default function CustomSoftwarePage() {
  const capabilities = [
    {
      icon: Layers,
      title: 'Distributed Microservices',
      description:
        'Decoupled, event-driven architectures engineered for millions of concurrent requests with Apache Kafka, gRPC, and RabbitMQ.',
    },
    {
      icon: Cpu,
      title: 'High-Throughput APIs & Gateways',
      description:
        'Sub-15ms REST and GraphQL APIs backed by distributed Redis caching, rate-limiting, and comprehensive telemetry instrumentation.',
    },
    {
      icon: Database,
      title: 'Enterprise Multi-Tenant SaaS',
      description:
        'Scalable multi-tenant databases, isolated schema partitioning, dynamic custom domain routing, and enterprise SSO (SAML/Okta) integrations.',
    },
    {
      icon: Shield,
      title: 'Legacy Modernization & Refactoring',
      description:
        'Zero-downtime strangler fig migrations transforming monolithic legacy codebases into high-velocity, cloud-native microservices.',
    },
    {
      icon: Workflow,
      title: 'Complex Workflow Automation',
      description:
        'Deterministic state machines, long-running workflow orchestration with Temporal, and resilient payment settlement pipelines.',
    },
    {
      icon: Zap,
      title: 'Performance & Database Optimization',
      description:
        'Deep SQL profiling, query execution plan tuning, connection pooling, and multi-region read replica orchestration.',
    },
  ];

  const technologies = [
    'Next.js',
    'TypeScript',
    'Node.js',
    'Go',
    'Python',
    'PostgreSQL',
    'Redis',
    'Kafka',
    'GraphQL',
    'Prisma',
    'Docker',
    'Stripe',
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
              <Code className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                ENTERPRISE SOFTWARE ENGINEERING
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={25}>
            <h1 className="mt-8 max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              High-Throughput Software &{' '}
              <span className="text-[#e9800a]">
                Distributed Systems
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25} yOffset={20}>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
              When standard platforms cannot scale, we engineer bespoke backends, high-throughput microservices, and modern web applications built on clean architectural patterns.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35} yOffset={20}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#e9800a] px-8 py-4 text-base font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Schedule Architecture Review
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. CAPABILITIES BENTO (PURE WHITE CONTRAST SECTION) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <ScrollReveal delay={0.05} yOffset={20}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
                SOFTWARE DISCIPLINES
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-black text-black">
                Zero Architectural Debt, Maximum Velocity
              </h2>
              <p className="mt-4 text-base sm:text-lg text-black/70">
                Engineered with strict TypeScript typing, comprehensive automated testing, and resilient fault isolation.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <ScrollReveal key={cap.title} delay={0.1 * idx} yOffset={25}>
                  <div className="h-full rounded-2xl border-2 border-black/10 bg-white p-8 transition-all duration-300 hover:border-[#e9800a] shadow-lg">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black text-[#e9800a] mb-6">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-black text-black mb-3">{cap.title}</h3>
                    <p className="text-sm sm:text-base text-black/70 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ARCHITECTURAL TOPOLOGY SCHEMATIC SECTION (PURE BLACK) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <ScrollReveal delay={0.05} yOffset={20}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-white/5 border border-white/10 mb-3">
                SYSTEM TOPOLOGY BLUEPRINT
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                Interactive Microservices Architecture
              </h2>
              <p className="mt-4 text-sm sm:text-base text-white/70">
                End-to-end decoupled data path with asynchronous event streaming, isolated container pods, and immutable sovereign storage.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.15} yOffset={25}>
            <div className="max-w-5xl mx-auto">
              <SovereignMicroservicesTopology />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. TECH STACK (PURE BLACK) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0.05} yOffset={20}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-white/5 border border-white/10 mb-4">
              PRODUCTION-GRADE SOFTWARE STACK
            </span>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:border-[#e9800a] hover:text-[#e9800a]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. CTA SECTION (PURE BLACK) */}
      <section className="relative w-full py-24 sm:py-32 bg-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/15 bg-[#000000] p-10 sm:p-14 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Ready to Build Software That Scales to Millions?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Talk directly with a Senior Software Architect to discuss technical requirements, system design, and implementation roadmaps.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Schedule System Design Review
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
