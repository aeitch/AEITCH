import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';
import { Rocket, ArrowRight, ExternalLink, Calendar, Clock, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our MVP Showcase | High-Velocity Products | AEITCH',
  description:
    'Explore production MVPs delivered in 6 to 8 weeks by AEITCH. From AI copilots to high-throughput platforms built for venture-backed founders.',
};

export const revalidate = 60;

export default async function OurMvpShowcasePage() {
  let mvps: any[] = [];
  try {
    const raw = await prisma.caseStudy.findMany({
      where: {
        isActive: true,
        type: 'MVP_SHOWCASE',
      },
      orderBy: { order: 'asc' },
    });
    mvps = raw.map((m) => ({
      ...m,
      results: typeof m.results === 'string' ? JSON.parse(m.results) : m.results,
      techStack: typeof m.techStack === 'string' ? JSON.parse(m.techStack) : m.techStack,
    }));
  } catch {
    mvps = [];
  }

  // Fallback if none flagged as MVP_SHOWCASE
  const fallbackMvps = [
    {
      title: 'Real-Time Voice AI Agent for Telehealth Triage',
      clientName: 'CareVoice AI',
      clientIndustry: 'Digital Health',
      summary:
        'Shipped in 7 weeks: WebRTC-powered voice AI assistant conducting real-time patient intake and clinical summarization.',
      timeToMarket: '7 Weeks',
      results: [
        { metric: '99.2%', label: 'Transcription Accuracy' },
        { metric: '<350ms', label: 'Audio Latency' },
      ],
      techStack: ['Next.js', 'WebRTC', 'Whisper-v3', 'FastAPI', 'PostgreSQL'],
    },
    {
      title: 'Automated Multi-Carrier Freight Settlement Engine',
      clientName: 'DispatchFlow',
      clientIndustry: 'Supply Chain',
      summary:
        'Shipped in 8 weeks: High-throughput invoice reconciliation automating $4.2M in monthly freight payouts.',
      timeToMarket: '8 Weeks',
      results: [
        { metric: '100%', label: 'Automated Reconciliation' },
        { metric: '10x', label: 'Payout Velocity' },
      ],
      techStack: ['React', 'Node.js', 'Stripe Connect', 'Kafka', 'Redis'],
    },
    {
      title: 'Algorithmic Inventory Optimization for B2B Wholesale',
      clientName: 'StockGrid',
      clientIndustry: 'E-commerce & Logistics',
      summary:
        'Shipped in 6 weeks: Real-time stock rebalancing engine preventing stockouts across 42 distribution centers.',
      timeToMarket: '6 Weeks',
      results: [
        { metric: '-28%', label: 'Overstock Reduction' },
        { metric: '50K', label: 'SKUs Synced Live' },
      ],
      techStack: ['Next.js', 'Python', 'TimescaleDB', 'Docker', 'AWS'],
    },
  ];

  const displayList = mvps.length > 0 ? mvps : fallbackMvps;

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO SECTION (PURE BLACK) */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-20 sm:py-28 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[450px] w-[450px] rounded-full bg-[#e9800a]/10 blur-[140px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <ScrollReveal delay={0.05} yOffset={20}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
              <Rocket className="h-4 w-4 text-[#e9800a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#e9800a]">
                RAPID VENTURE ENGINEERING
              </span>
            </div>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              Our MVP{' '}
              <span className="text-[#e9800a]">
                Showcase
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Production-ready web & mobile applications shipped in 6 to 8 weeks without sacrificing security, code quality, or architectural scalability.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. MVP SHOWCASE GRID (PURE WHITE CONTRAST SECTION) */}
      <section className="relative w-full py-20 sm:py-28 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayList.map((mvp, idx) => (
              <ScrollReveal key={mvp.title} delay={0.1 * idx} yOffset={25}>
                <div className="h-full rounded-2xl border-2 border-black/10 bg-white p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#e9800a] shadow-lg">
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="rounded-full bg-black text-white px-3 py-1 font-mono text-xs font-bold border border-black">
                        {mvp.clientIndustry}
                      </span>
                      <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-black/60">
                        <Clock className="h-3.5 w-3.5 text-[#e9800a]" />
                        {mvp.timeToMarket || '6–8 Weeks'}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-black mb-1 leading-snug">
                      {mvp.title}
                    </h3>
                    <div className="text-xs font-bold text-black/50 mb-4">
                      Venture: {mvp.clientName}
                    </div>

                    <p className="text-sm text-black/70 leading-relaxed mb-6">
                      {mvp.summary}
                    </p>

                    {/* Results / Metrics */}
                    {Array.isArray(mvp.results) && mvp.results.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-xl bg-black/5 border border-black/10">
                        {mvp.results.slice(0, 2).map((r: any, rIdx: number) => (
                          <div key={rIdx}>
                            <div className="text-lg font-black text-[#e9800a] font-mono">
                              {r.metric}
                            </div>
                            <div className="text-[11px] text-black/70 font-medium leading-tight mt-0.5">
                              {r.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Stack */}
                    {Array.isArray(mvp.techStack) && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {mvp.techStack.map((tech: string) => (
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

                  <div className="pt-4 border-t border-black/10 flex items-center justify-between">
                    <Link
                      href="/contact-us#consultation"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#e9800a] transition-all hover:text-black group"
                    >
                      Scope a Similar MVP
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA BANNER (PURE BLACK CONTRAST) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <h2 className="text-3xl font-black text-white">
            Ready to Launch Your MVP in 60 Days?
          </h2>
          <p className="mt-3 text-base text-white/70">
            Schedule an architectural scoping session with our lead venture engineers.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact-us#consultation"
              className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white"
            >
              <Calendar className="h-4 w-4" />
              Book MVP Scoping Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
