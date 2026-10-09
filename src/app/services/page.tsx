import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Cpu,
  Cloud,
  Code2,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { SovereignMicroservicesTopology } from '@/components/schematics';

export const metadata: Metadata = {
  title: 'The 4 Core Engineering Services | AEITCH',
  description:
    'Silicon Valley-grade engineering services tailored for Saudi Arabia: AI Automation & Integration, Product Development, DevOps & Cloud Engineering, and Custom Software Development.',
};

export default function ServicesOverviewPage() {
  const services = [
    {
      slug: 'ai-automation',
      title: 'AI Automation & Integration',
      badge: 'Sovereign LLMs & Autonomous Swarms',
      desc: 'Air-gapped private LLM serving on NVIDIA H100 enclaves, stateful autonomous agents (LangGraph), hybrid dense/sparse RAG, and deterministic ERP/CRM integrations without sensitive data leakage.',
      icon: Cpu,
      stack: ['vLLM', 'NVIDIA H100 SXM5', 'LangGraph', 'Qdrant Hybrid RAG', 'NeMo Guardrails', 'FastAPI', 'Temporal', 'PyTorch'],
      outcomes: ['< 80ms Time-To-First-Token', '> 96% RAGAS Faithfulness', '100% In-Kingdom Data Sovereignty'],
    },
    {
      slug: 'product-development',
      title: 'Product Development',
      badge: 'Rapid MVPs & High-Growth SaaS',
      desc: 'Full-cycle digital product architecture from discovery to scaled production. Launching investor-grade MVPs into the GCC market in 8 weeks with bilingual RTL/LTR experiences and modular architectures.',
      icon: Rocket,
      stack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma', 'React Native', 'AWS/GCP'],
      outcomes: ['8-Week Production Launch', 'Bilingual GCC Arabic/English UX', '100k+ Concurrency Scale'],
    },
    {
      slug: 'cloud-devops',
      title: 'DevOps & Cloud Engineering',
      badge: 'In-Kingdom Multi-Cloud & GitOps',
      desc: 'Sovereign multi-cloud infrastructure engineering across AWS KSA, Google Cloud Dammam, Azure Riyadh, and Oracle Cloud KSA with Kubernetes orchestration, Terraform GitOps, and FinOps governance.',
      icon: Cloud,
      stack: ['AWS Saudi Arabia', 'GCP Dammam', 'Azure Riyadh', 'Oracle Cloud KSA', 'Kubernetes (CKA)', 'Terraform', 'ArgoCD', 'HashiCorp Vault'],
      outcomes: ['99.99% Multi-AZ Availability', '30–45% FinOps Cost Savings', 'NCA ECC-1:2018 Audit Ready'],
    },
    {
      slug: 'custom-software',
      title: 'Custom Software Development',
      badge: 'Enterprise Distributed Systems',
      desc: 'Bespoke, mission-critical platforms engineered to outperform off-the-shelf software. High-throughput microservices, sub-80ms APIs, event-driven streaming pipelines, and seamless ZATCA/SAMA compliance.',
      icon: Code2,
      stack: ['Go', 'TypeScript / Node.js', 'Apache Kafka', 'Redis Streams', 'gRPC', 'ZATCA Fatoora API', 'SAMA Open Banking', 'PostgreSQL'],
      outcomes: ['Sub-80ms Transaction Response', 'Millions of Concurrent Events', '100% Client Code & IP Handover'],
    },
  ];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO HEADER */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-24 sm:py-32 border-b border-white/10">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
          <div className="h-[500px] w-[500px] rounded-full bg-[#e9800a]/10 blur-[150px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-6">
              <Sparkles className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                THE 4 CORE DISCIPLINES
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} yOffset={20}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Enterprise Engineering Disciplines Built for the Kingdom’s Digital Future
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={20}>
            <p className="text-base sm:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              We combine US product governance with high-velocity engineering pods to deliver 4 core engineering capabilities
              grounded in Saudi data sovereignty, ultra-low latency, and production-grade resilience.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE 4 CAPABILITIES GRID */}
      <section className="py-24 bg-[#0a0a0a] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <ScrollReveal key={srv.slug} delay={idx * 0.1} yOffset={30}>
                  <Link href={`/services/${srv.slug}`} className="group block h-full">
                    <RadialGlowCard className="h-full flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 hover:border-[#e9800a]/60">
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9800a]/10 border border-[#e9800a]/30 text-[#e9800a] group-hover:scale-105 transition-transform">
                            <Icon className="h-7 w-7" />
                          </div>
                          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs font-semibold text-[#e9800a]">
                            {srv.badge}
                          </span>
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-[#e9800a] transition-colors leading-snug">
                          {srv.title}
                        </h2>

                        <p className="text-sm text-white/70 leading-relaxed mb-6">
                          {srv.desc}
                        </p>

                        {/* Outcomes */}
                        <div className="space-y-2 mb-6">
                          {srv.outcomes.map((out, oIdx) => (
                            <div key={oIdx} className="flex items-center gap-2 text-xs text-white/90">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#e9800a] shrink-0" />
                              <span>{out}</span>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10 mb-6">
                          {srv.stack.map((t, tIdx) => (
                            <span key={tIdx} className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-mono text-white/60">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-bold text-white group-hover:text-[#e9800a] transition-colors">
                        <span>Explore Engineering Deep Dive</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </RadialGlowCard>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SCHEMATIC: MICROSERVICES TOPOLOGY */}
      <section className="py-24 bg-[#000000] border-b border-white/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a] block mb-2">
              ARCHITECTURE TOPOLOGY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Sovereign Microservices & Event Stream
            </h2>
          </div>
          <SovereignMicroservicesTopology />
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-20 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            Need Expert Cloud Engineering for Your Platform?
          </h2>
          <p className="text-sm sm:text-base text-white/70 mb-8">
            Schedule an architectural consultation with our Principal Cloud Architects to review your system topology.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact-us"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#e9800a] px-8 py-3.5 text-sm font-bold text-black hover:bg-[#ff9420] transition-colors"
            >
              <span>Schedule Architecture Audit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/delivery-engine"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <span>Our Delivery Engine</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
