import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { AeitchPicture } from '@/components/ui/aeitch-picture';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Case Studies & Engineering Architecture | AEITCH',
  description:
    'Explore detailed case studies on how AEITCH builds resilient cloud architectures, AI systems, and scalable platforms for enterprise leaders.',
};

export const revalidate = 60;

const DEFAULT_FALLBACK_STUDIES = [
  {
    id: 'cs-fintech',
    slug: 'apexpay-settlement-engine',
    title: 'High-Frequency Financial Settlement Engine with Zero-Downtime Migration',
    clientIndustry: 'FinTech & Payments',
    clientName: 'ApexPay Global',
    imageSrc: '/images/aeitch-case-fintech.svg',
    summary: 'Engineered a distributed event-driven settlement architecture handling $4.2B in annualized transaction volume with zero downtime.',
    results: [
      { metric: '99.999%', label: 'Settlement Uptime' },
      { metric: '< 8ms', label: 'P99 Latency' }
    ],
    techStack: ['TypeScript', 'Kubernetes', 'PostgreSQL', 'Redis', 'AWS']
  },
  {
    id: 'cs-ai',
    slug: 'medpulse-sovereign-ai-rag',
    title: 'Sovereign Clinical RAG Assistant for Regulated Medical Enterprise',
    clientIndustry: 'HealthTech & AI',
    clientName: 'MedPulse Health',
    imageSrc: '/images/aeitch-case-ai.svg',
    summary: 'Designed an on-premise private AI assistant powered by fine-tuned open-source models, achieving 99.4% clinical guideline retrieval accuracy.',
    results: [
      { metric: '99.4%', label: 'Guideline Accuracy' },
      { metric: 'HIPAA', label: 'Compliant & Sovereign' }
    ],
    techStack: ['Python', 'vLLM', 'LangChain', 'Qdrant', 'FastAPI']
  },
  {
    id: 'cs-cloud',
    slug: 'cloud-finops-optimization',
    title: 'Multi-Cloud FinOps Optimization & 44% Infrastructure Cost Reduction',
    clientIndustry: 'Cloud Strategy',
    clientName: 'Nexus Enterprise',
    imageSrc: '/images/aeitch-case-cloud.svg',
    summary: 'Restructured multi-region Kubernetes deployments, right-sized cloud resources, and implemented automated FinOps cost governance.',
    results: [
      { metric: '44%', label: 'Monthly AWS Cost Savings' },
      { metric: '10x', label: 'Deployment Frequency' }
    ],
    techStack: ['Terraform', 'Kubernetes', 'AWS', 'Datadog', 'ArgoCD']
  }
];

export default async function CaseStudiesPage() {
  let caseStudies: any[] = [];
  try {
    const raw = await prisma.caseStudy.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    if (raw && raw.length > 0) {
      caseStudies = raw.map((cs) => ({
        ...cs,
        results: typeof cs.results === 'string' ? JSON.parse(cs.results) : cs.results,
        techStack: typeof cs.techStack === 'string' ? JSON.parse(cs.techStack) : cs.techStack,
      }));
    } else {
      caseStudies = DEFAULT_FALLBACK_STUDIES;
    }
  } catch {
    caseStudies = DEFAULT_FALLBACK_STUDIES;
  }

  const getImageForStudy = (slug: string, idx: number) => {
    if (slug.includes('ai') || slug.includes('automation')) return '/images/aeitch-case-ai.svg';
    if (slug.includes('fintech') || slug.includes('bills') || slug.includes('settlement')) return '/images/aeitch-case-fintech.svg';
    return idx % 2 === 0 ? '/images/aeitch-case-cloud.svg' : '/images/aeitch-service-software.svg';
  };

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION (PURE BLACK) */}
      <section className="relative min-h-[45vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-20 sm:py-28 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="size-[400px] rounded-full bg-[#e9800a]/10 blur-[130px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#e9800a] bg-white/5 border border-white/10 mb-4">
              PROVEN RESULTS & ARCHITECTURE
            </span>
            <h1 className="mt-2 text-balance text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Enterprise{' '}
              <span className="text-[#e9800a]">
                Case Studies
              </span>
            </h1>
            <p className="mt-5 text-pretty text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Real-world engineering deep-dives demonstrating how we solve critical architectural challenges and deliver measurable business velocity.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. CASE STUDIES GRID (PURE WHITE CONTRAST SECTION WITH PICTURE ELEMENTS) */}
      <section className="relative w-full py-20 sm:py-28 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((cs, idx) => {
              const imageSrc = cs.imageSrc || getImageForStudy(cs.slug || '', idx);
              return (
                <ScrollReveal key={cs.id || cs.slug} delay={0.1 * idx} yOffset={25}>
                  <div className="h-full rounded-2xl border-2 border-black/10 bg-white p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#e9800a] hover:shadow-[0_12px_30px_rgba(233,128,10,0.18)] shadow-md">
                    <div>
                      {/* Picture Element Slot with aeitch.com Replacement Hook */}
                      <div className="mb-5">
                        <AeitchPicture
                          src={imageSrc}
                          alt={`${cs.title} Architecture Preview`}
                          aspectRatioClass="aspect-[16/10]"
                          badgeLabel={cs.clientIndustry || 'CASE STUDY'}
                          className="border border-black/10 shadow-sm"
                        />
                      </div>

                      {/* Header: Industry & Client */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="rounded-full bg-black text-white px-3 py-0.5 font-mono text-xs font-bold border border-black">
                          {cs.clientIndustry}
                        </span>
                        <span className="text-xs font-bold text-black/60">
                          {cs.clientName}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-balance text-xl font-black text-black mb-3 leading-snug">
                        {cs.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-pretty text-sm text-black/70 leading-relaxed mb-6">
                        {cs.summary}
                      </p>

                      {/* Key Metrics */}
                      {Array.isArray(cs.results) && cs.results.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-black/5 border border-black/10">
                          {cs.results.slice(0, 2).map((r: any, rIdx: number) => (
                            <div key={rIdx}>
                              <div className="text-lg font-black text-[#e9800a] font-mono tabular-nums">
                                {r.metric}
                              </div>
                              <div className="text-[11px] text-black/70 font-medium leading-tight mt-0.5">
                                {r.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      {Array.isArray(cs.techStack) && (
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {cs.techStack.slice(0, 4).map((tech: string) => (
                            <span
                              key={tech}
                              className="rounded-md bg-black/5 px-2 py-0.5 text-xs font-mono text-black font-semibold border border-black/10"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer Link */}
                    <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                      <Link
                        href={`/case-studies/${cs.slug}`}
                        aria-label={`Read architecture deep-dive for ${cs.title}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#000000] hover:text-[#e9800a] transition-all group cursor-pointer"
                      >
                        Read Architecture Deep-Dive
                        <ArrowRight className="size-4 text-[#e9800a] transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CTA BANNER (PURE BLACK CONTRAST) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-balance text-3xl font-black text-white">
            Have a Similar Architectural Challenge?
          </h2>
          <p className="mt-3 text-pretty text-base text-white/70">
            Schedule an architectural review with our engineering leadership to explore tailored solutions.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact-us#consultation"
              aria-label="Schedule an Architectural Consultation with AEITCH"
              className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white cursor-pointer"
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
