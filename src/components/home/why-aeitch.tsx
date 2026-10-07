"use client";

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  BrainCircuit, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Layers, 
  Building2, 
  GitBranch, 
  Zap, 
  Cpu 
} from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

interface WhyCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  metricHighlight?: string;
}

const WHY_CARDS: WhyCard[] = [
  {
    title: 'Production-Hardened Engineering',
    description: 'Zero technical debt shortcuts. Every platform is engineered on battle-tested architectural patterns and automated security guardrails.',
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    metricHighlight: 'Zero Legacy Debt',
  },
  {
    title: 'AI-Native Systems',
    description: 'Deep expertise in enterprise Generative AI, custom domain fine-tuning, high-throughput RAG pipelines, and autonomous agent swarms.',
    icon: <BrainCircuit className="h-6 w-6 text-accent" />,
    metricHighlight: '100% Sovereign AI',
  },
  {
    title: 'Cloud & FinOps Mastery',
    description: 'Multi-cloud architectures engineered for extreme cost efficiency and zero single points of failure, eliminating cloud sprawl.',
    icon: <TrendingDown className="h-6 w-6 text-accent" />,
    metricHighlight: '35-50% Cost Savings',
  },
  {
    title: 'Direct Architect Access',
    description: 'No junior developers or account gatekeepers. You collaborate directly with principal architects in shared Slack channels.',
    icon: <Users className="h-6 w-6 text-accent" />,
    metricHighlight: 'Principal Engineers Only',
  },
  {
    title: 'US-First Communication',
    description: 'Direct timezone alignment, clear English communication, and transparent daily engineering syncs without translation layers.',
    icon: <MessageSquare className="h-6 w-6 text-accent" />,
  },
  {
    title: 'Flexible Engagement',
    description: 'Engage via dedicated engineering squads, staff augmentation, or fixed-scope milestones tailored to your growth trajectory.',
    icon: <Layers className="h-6 w-6 text-accent" />,
  },
  {
    title: 'Enterprise & SaaS Focus',
    description: 'Deep specialization in multi-tenant SaaS, high-throughput APIs, subscription billing, and complex B2B workflow systems.',
    icon: <Building2 className="h-6 w-6 text-accent" />,
  },
  {
    title: 'Clear Delivery Process',
    description: 'Transparent 2-week sprints, weekly demo milestones, automated CI/CD previews, and predictable release cadence.',
    icon: <GitBranch className="h-6 w-6 text-accent" />,
  },
  {
    title: 'Fast Onboarding',
    description: 'Plug directly into your codebase and start committing production code within 3 to 5 business days.',
    icon: <Zap className="h-6 w-6 text-accent" />,
  },
];

export function WhyAeitch() {
  const [mousePos, setMousePos] = useState<Record<number, { x: number; y: number }>>({});

  const handleMouseMove = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos((prev) => ({
      ...prev,
      [index]: {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    }));
  };

  return (
    <section id="why-aeitch" className="relative w-full py-24 sm:py-32 bg-[#ffffff] text-[#000000] border-b border-black/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <ScrollReveal delay={0.05} yOffset={20}>
            <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-accent">
              THE AEITCH ADVANTAGE
            </span>
            <h2 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-[#000000] leading-tight">
              Your Strategic Growth Partner for Enterprise Product Success
            </h2>
            <p className="mt-5 text-base sm:text-lg leading-relaxed text-black/75">
              We build long-term digital assets that drive measurable results and support sustainable enterprise growth. Our approach focuses on reliability, security, and performance, so your business can scale with confidence.
            </p>
          </ScrollReveal>
        </div>

        {/* 9 High-Contrast White Cards with Accent & Black Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CARDS.map((card, idx) => {
            const pos = mousePos[idx] || { x: 150, y: 150 };
            return (
              <ScrollReveal key={card.title} delay={0.05 + idx * 0.05} yOffset={20}>
                <div
                  onMouseMove={(e) => handleMouseMove(idx, e)}
                  className="group relative h-full rounded-2xl bg-[#ffffff] p-7 sm:p-8 border-2 border-black/10 shadow-md transition-all duration-300 hover:border-accent hover:shadow-[0_12px_30px_rgba(233,128,10,0.18)] hover:-translate-y-1 overflow-hidden"
                >
                  {/* Cursor-Tracking Radial Glow Overlay */}
                  <div
                    className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(233, 128, 10, 0.12), transparent 70%)`,
                    }}
                  />

                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <div>
                      {/* Icon */}
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#000000] text-accent border border-black shadow-md mb-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-black transition-all duration-300">
                        {card.icon}
                      </div>

                      <h3 className="text-xl font-black text-[#000000] group-hover:text-accent transition-colors">
                        {card.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-black/80 font-normal">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-black/10 flex items-center justify-between text-xs text-black/60">
                      <span className="font-mono text-accent font-bold">0{idx + 1} {'//'} AEITCH</span>
                      {card.metricHighlight ? (
                        <span className="font-semibold text-white bg-[#000000] px-2.5 py-1 rounded-md border border-black">
                          {card.metricHighlight}
                        </span>
                      ) : (
                        <span className="group-hover:text-black transition-colors font-medium">Guaranteed</span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
