import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Brain,
  Cpu,
  Sparkles,
  Database,
  Shield,
  Layers,
  CheckCircle2,
  ArrowRight,
  Calendar,
  Zap,
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { GlowingConicBorder } from '@/components/ui/glowing-conic-border';

export const metadata: Metadata = {
  title: 'AI Consulting & Autonomous Systems | AEITCH',
  description:
    'Production-grade generative AI, fine-tuned LLMs, sovereign RAG pipelines, and autonomous agent systems engineered for high-security enterprise environments.',
};

export default function AiConsultingPage() {
  const capabilities = [
    {
      icon: Sparkles,
      title: 'Enterprise RAG Pipelines',
      description:
        'Hybrid dense and sparse vector retrieval architectures with sub-100ms response times, zero hallucination guardrails, and role-based access control.',
    },
    {
      icon: Brain,
      title: 'Domain-Specific LLM Fine-Tuning',
      description:
        'Parameter-efficient fine-tuning (LoRA, QLoRA) on private enterprise datasets, optimizing open-weight models for proprietary domain reasoning.',
    },
    {
      icon: Cpu,
      title: 'Autonomous Multi-Agent Workflows',
      description:
        'Self-healing, goal-driven AI agent clusters executing complex multi-step reasoning, tool usage, data extraction, and operational automation.',
    },
    {
      icon: Database,
      title: 'Vector Databases & Knowledge Graphs',
      description:
        'High-dimensional semantic search engines powered by Qdrant, Pinecone, and Neo4j for deep cross-document intelligence and relationship synthesis.',
    },
    {
      icon: Shield,
      title: 'Private & Air-Gapped AI Deployments',
      description:
        'On-premises and sovereign cloud deployments ensuring confidential IP and zero external data sharing to OpenAI or third-party endpoints.',
    },
    {
      icon: Layers,
      title: 'Continuous Evaluation & LLMOps',
      description:
        'Automated regression testing, drift detection, red-teaming, prompt management, and low-latency inference serving with vLLM and TensorRT-LLM.',
    },
  ];

  const technologies = [
    'PyTorch',
    'LangChain',
    'LlamaIndex',
    'Hugging Face',
    'vLLM',
    'Qdrant',
    'Pinecone',
    'TensorRT',
    'Ollama',
    'Next.js',
    'Python',
    'FastAPI',
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
              <Brain className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                ENTERPRISE ARTIFICIAL INTELLIGENCE
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15} yOffset={25}>
            <h1 className="mt-8 max-w-4xl text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Production-Grade AI &{' '}
              <span className="text-[#e9800a]">
                Autonomous Systems
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.25} yOffset={20}>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/70 leading-relaxed">
              We architect, train, and deploy private generative AI systems that integrate seamlessly with your core business workflows — without data leaks or vendor lock-in.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.35} yOffset={20}>
            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#e9800a] px-8 py-4 text-base font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Schedule AI Scoping Session
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
                TECHNICAL CAPABILITIES
              </span>
              <h2 className="mt-2 text-3xl sm:text-5xl font-black text-black">
                Engineered for High Precision & Security
              </h2>
              <p className="mt-4 text-base sm:text-lg text-black/70">
                Moving beyond prototypes to reliable, deterministic enterprise AI infrastructure.
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

      {/* 3. TECH STACK & ARCHITECTURE (PURE BLACK) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal delay={0.05} yOffset={20}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-white/5 border border-white/10 mb-4">
              PRODUCTION-HARDENED AI STACK
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
              Ready to Deploy Sovereign AI in Your Enterprise?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Schedule a 30-minute discovery session with our Lead AI Architect to assess data readiness, architecture options, and timeline.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/contact-us#consultation"
                className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white"
              >
                <Calendar className="h-4 w-4" />
                Book Your Architecture Session
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
