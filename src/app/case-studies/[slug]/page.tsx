import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ArrowLeft, ArrowRight, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

interface CaseStudyDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CaseStudyDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cs = await prisma.caseStudy.findUnique({ where: { slug } });
  if (!cs) {
    return { title: 'Case Study Not Found | AEITCH' };
  }
  return {
    title: `${cs.title} | Case Study | AEITCH`,
    description: cs.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: CaseStudyDetailPageProps) {
  const { slug } = await params;
  const cs = await prisma.caseStudy.findUnique({ where: { slug } });

  if (!cs || !cs.isActive) {
    notFound();
  }

  const results = typeof cs.results === 'string' ? JSON.parse(cs.results) : cs.results || [];
  const techStack = typeof cs.techStack === 'string' ? JSON.parse(cs.techStack) : cs.techStack || [];

  return (
    <div className="flex w-full flex-col overflow-hidden bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* 1. HERO HEADER (PURE BLACK) */}
      <section className="relative min-h-[50vh] w-full flex items-center justify-center overflow-hidden bg-[#000000] py-20 sm:py-28 border-b border-white/10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        >
          <div className="h-[450px] w-[450px] rounded-full bg-[#e9800a]/10 blur-[130px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-bold text-white/70 transition-all hover:text-[#e9800a] mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Case Studies
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-xs font-bold text-[#e9800a] border border-white/15">
              {cs.clientIndustry}
            </span>
            <span className="text-sm font-semibold text-white/70">
              Client: {cs.clientName}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            {cs.title}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed">
            {cs.summary}
          </p>
        </div>
      </section>

      {/* 2. PURE WHITE BODY SECTION (KPIS + CHALLENGE & SOLUTION) */}
      <section className="relative w-full py-20 bg-[#ffffff] text-[#000000]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl space-y-16">
          {/* KPI Banner */}
          {results.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {results.map((r: any, idx: number) => (
                <div
                  key={idx}
                  className="rounded-2xl border-2 border-black/10 bg-white p-6 shadow-md"
                >
                  <div className="font-mono text-3xl sm:text-4xl font-black text-[#e9800a]">
                    {r.metric}
                  </div>
                  <div className="mt-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-black/70">
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* The Challenge */}
          <div className="rounded-2xl border-2 border-black/10 bg-white p-8 sm:p-10 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
              THE ARCHITECTURAL CHALLENGE
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-black">
              Obstacles & System Constraints
            </h2>
            <p className="mt-4 text-base sm:text-lg text-black/80 leading-relaxed">
              {cs.challenge}
            </p>
          </div>

          {/* The Solution */}
          <div className="rounded-2xl border-2 border-black/10 bg-white p-8 sm:p-10 shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
              THE ENGINEERING SOLUTION
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-black">
              Architecture & Implementation
            </h2>
            <p className="mt-4 text-base sm:text-lg text-black/80 leading-relaxed">
              {cs.solution}
            </p>
          </div>

          {/* Tech Stack Employed */}
          {techStack.length > 0 && (
            <div className="p-6 rounded-2xl bg-black/5 border border-black/10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-[#e9800a] bg-black/5 border border-black/10 mb-3">
                TECHNOLOGY ECOSYSTEM
              </span>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {techStack.map((tech: string) => (
                  <span
                    key={tech}
                    className="rounded-xl border border-black/15 bg-white px-4 py-2 text-sm font-bold text-black shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. CTA BANNER (PURE BLACK CONTRAST) */}
      <section className="relative w-full py-20 bg-[#000000] border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white">
            Ready to Build Your Next Scalable Platform?
          </h2>
          <p className="mt-3 text-base text-white/70">
            Schedule an architectural consultation session with our technical team.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/contact-us#consultation"
              className="inline-flex items-center gap-3 rounded-xl bg-[#e9800a] px-8 py-3.5 font-bold text-black transition-all hover:bg-white"
            >
              <Calendar className="h-4 w-4" />
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
