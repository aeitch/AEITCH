import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  Zap,
  Server,
  Code2,
  Database,
  Radio,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SovereignMicroservicesTopology } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'Cloud-First Product Engineering | AEITCH',
  description:
    'End-to-end greenfield SaaS build, monolith-to-microservices decomposition, API-first ecosystems, and event-driven architectures with Kafka and RabbitMQ.',
};

export default function CloudFirstProductEngineeringPage() {
  const capabilities = [
    {
      title: 'Greenfield SaaS Architecture & Build',
      desc: 'Ground-up engineering of scalable multi-tenant SaaS products, designed with domain-driven design (DDD) principles and clean separation of concerns.',
    },
    {
      title: 'Monolith-to-Microservices Decomposition',
      desc: 'Systematic strangler-fig pattern migration separating monolithic databases and tangled business logic into isolated, independently deployable services.',
    },
    {
      title: 'Event-Driven Streaming & Decoupling',
      desc: 'High-throughput asynchronous message buses utilizing Apache Kafka, RabbitMQ, and AWS EventBridge to prevent cascading failures and guarantee event ordering.',
    },
    {
      title: 'API-First Ecosystems & GraphQL',
      desc: 'Contract-first API design with OpenAPI/Swagger specifications, federated GraphQL gateways, and automated end-to-end type validation between client and server.',
    },
    {
      title: 'In-Memory Micro-Caching & Distributed State',
      desc: 'Sub-5ms query response times using Redis Cluster caching layers, distributed locks, and optimistic read-replicas for extreme concurrency.',
    },
    {
      title: 'Polyglot High-Performance Microservices',
      desc: 'Services built in Go for high-throughput computation and streaming, TypeScript/Node.js for rich domain APIs, and Python for machine learning workflows.',
    },
  ];

  const techStack = [
    { name: 'TypeScript / Node.js', role: 'Enterprise Domain APIs & BFF' },
    { name: 'Go (Golang)', role: 'High-Throughput Microservices' },
    { name: 'Python', role: 'AI, Analytics & Pipeline Workers' },
    { name: 'React / Next.js 15', role: 'Bilingual Edge-Rendered UI' },
    { name: 'PostgreSQL', role: 'Distributed Relational Storage' },
    { name: 'Redis', role: 'In-Memory Micro-Cache & State' },
    { name: 'Apache Kafka', role: 'Event-Driven Streaming Backbone' },
    { name: 'Docker', role: 'Immutable Containerization' },
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
              <Cpu className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                CLOUD-FIRST PRODUCT ENGINEERING
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Microservices & Event-Driven Systems for Resilient Scale
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We design and build resilient digital products from scratch and decompose fragile enterprise monoliths
              into high-throughput, event-driven architectures capable of handling millions of concurrent requests.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2} yOffset={20}>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-3 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
              >
                <span>Book Architecture Consultation</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                <span>View All Capabilities</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. TECH STACK SPOTLIGHT */}
      <section className="py-20 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              CORE TECH STACK SPOTLIGHT
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Proven, Modern Open-Source Toolchains
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techStack.map((tech, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-white/10 bg-surface">
                <span className="text-sm font-bold text-white block mb-1">{tech.name}</span>
                <span className="text-xs text-white/60">{tech.role}</span>
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
              ENGINEERING DISCIPLINES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Built for Scale, Speed, and Zero Regrets
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

      {/* 4. SCHEMATIC: EVENT-DRIVEN BUS */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              TOPOLOGY BLUEPRINT
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Event-Driven Microservices Bus Topology
            </h2>
          </div>
          <SovereignMicroservicesTopology />
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-[#000000]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Decompose Your Monolith or Build a Greenfield Platform
          </h2>
          <p className="text-sm text-white/70 mb-8">
            Let our principal architects assess your domain boundaries, event bus requirements, and delivery milestones.
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
          >
            <span>Book Product Architecture Review</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
