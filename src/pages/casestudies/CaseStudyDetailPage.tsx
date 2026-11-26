import React, { useEffect } from 'react';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { CASE_STUDIES, CaseStudyItem } from '../../data/caseStudies';

interface CaseStudyDetailPageProps {
  slug: string;
}

export const CaseStudyDetailPage: React.FC<CaseStudyDetailPageProps> = ({ slug }) => {
  const study: CaseStudyItem | undefined = CASE_STUDIES.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-sans">Case Study Not Found</h1>
          <Link href="/case-studies" className="text-[#F7C059] underline">
            Return to Case Studies
          </Link>
        </div>
      </div>
    );
  }

  const studySchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: study.title,
    description: study.metaDescription,
    author: {
      '@type': 'Organization',
      name: 'AEITCH SMC PVT LTD',
      url: 'https://www.aeitch.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AEITCH',
      url: 'https://www.aeitch.com',
    },
    mainEntityOfPage: `https://www.aeitch.com/case-studies/${study.slug}`,
  };

  const otherStudies = CASE_STUDIES.filter((c) => c.slug !== study.slug);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <SEOHead
        title={study.seoTitle}
        description={study.metaDescription}
        canonicalPath={`/case-studies/${study.slug}`}
        ogType="article"
        schema={studySchema}
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${study.color} 0%, rgba(0,0,0,0) 70%)`,
        }}
        aria-hidden="true"
      />

      <article className="relative z-10 w-full pt-28 sm:pt-32 desktop:pt-36 pb-16 sm:pb-20 desktop:pb-24 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[920px] mx-auto flex flex-col gap-8 sm:gap-10">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Case Studies', path: '/case-studies' },
              { label: study.title, path: `/case-studies/${study.slug}` },
            ]}
          />

          {/* Header */}
          <header className="flex flex-col gap-4 sm:gap-5 border-b border-white/10 pb-6 sm:pb-8">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[12px] sm:text-[13px] font-mono">
              <span
                className="px-2.5 py-0.5 rounded-full border uppercase tracking-wider font-semibold"
                style={{
                  color: study.color,
                  borderColor: study.borderColor,
                  backgroundColor: `${study.color}12`,
                }}
              >
                {study.service}
              </span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">{study.caseNumber}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">{study.badge}</span>
            </div>

            <h1 className="font-sans font-normal text-[26px] sm:text-[36px] tablet:text-[44px] desktop:text-[48px] leading-[1.12] tracking-[-0.03em] text-white">
              {study.title}
            </h1>

            <p className="font-poppins text-white/75 text-[15px] sm:text-[17px] leading-relaxed">
              {study.desc}
            </p>

            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              {study.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 sm:px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] sm:text-[12px] font-mono text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Target Architecture Benchmarks */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {study.targetBenchmarks.map((metric, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col gap-1.5"
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-white/45">
                  {metric.label}
                </span>
                <span
                  className="font-sans text-[16px] sm:text-[18px] font-medium"
                  style={{ color: study.color }}
                >
                  {metric.value}
                </span>
              </div>
            ))}
          </section>

          {/* Executive Summary Box */}
          <section
            className="p-5 sm:p-7 desktop:p-8 rounded-2xl border flex flex-col gap-3"
            style={{
              borderColor: study.borderColor,
              backgroundColor: `${study.color}08`,
            }}
          >
            <span
              className="font-mono text-[11px] sm:text-[12px] uppercase tracking-wider font-semibold"
              style={{ color: study.color }}
            >
              Architecture Summary
            </span>
            <p className="font-poppins text-white/90 text-[15px] sm:text-[16px] leading-relaxed">
              {study.executiveSummary}
            </p>
          </section>

          {/* Engineering Challenge & System Architecture */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            <div className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-3.5">
              <h2 className="font-sans font-normal text-[20px] sm:text-[22px] text-white tracking-tight">
                Engineering Challenge
              </h2>
              <div className="flex flex-col gap-3 font-poppins text-[14px] sm:text-[14.5px] text-white/75 leading-relaxed">
                {study.challenge.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            <div
              className="p-5 sm:p-7 rounded-2xl border bg-white/[0.02] flex flex-col gap-3.5"
              style={{ borderColor: study.borderColor }}
            >
              <h2 className="font-sans font-normal text-[20px] sm:text-[22px] text-white tracking-tight">
                System Architecture
              </h2>
              <div className="flex flex-col gap-3 font-poppins text-[14px] sm:text-[14.5px] text-white/80 leading-relaxed">
                {study.architectureDesign.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>
          </section>

          {/* Execution Phases */}
          <section className="flex flex-col gap-4 sm:gap-5">
            <h2 className="font-sans font-normal text-[22px] sm:text-[28px] text-white tracking-tight">
              Implementation Blueprint
            </h2>
            <div className="flex flex-col gap-3 sm:gap-4">
              {study.implementationPhases.map((step, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row gap-3 sm:gap-6 items-start"
                >
                  <span
                    className="font-mono text-[12px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full border shrink-0"
                    style={{
                      color: study.color,
                      borderColor: study.borderColor,
                      backgroundColor: `${study.color}10`,
                    }}
                  >
                    {step.phase}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-sans text-[17px] sm:text-[19px] text-white font-normal">
                      {step.title}
                    </h3>
                    <p className="font-poppins text-[14px] text-white/70 leading-relaxed">
                      {step.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Production Safeguards */}
          <section className="p-5 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col gap-4">
            <h2 className="font-sans font-normal text-[20px] sm:text-[24px] text-white tracking-tight">
              Production Safeguards & Invariants
            </h2>
            <ul className="flex flex-col gap-3">
              {study.safeguards.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 font-poppins text-[14px] sm:text-[15px] text-white/80 leading-relaxed"
                >
                  <span style={{ color: study.color }} className="mt-0.5 font-bold">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related Stack Blueprints */}
          <section className="flex flex-col gap-4">
            <h2 className="font-sans font-normal text-[20px] sm:text-[22px] text-white tracking-tight">
              Related Tech Stack Blueprints
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {study.relatedStack.map((stack) => (
                <Link
                  key={stack.path}
                  href={stack.path}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all no-underline flex items-center justify-between gap-3 group"
                >
                  <span className="font-poppins text-[13.5px] text-white/85 group-hover:text-white transition-colors">
                    {stack.title}
                  </span>
                  <span className="text-white/40 group-hover:text-white transition-colors shrink-0">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Service Pillar & Architecture Call CTA */}
          <section
            className="p-6 sm:p-8 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            style={{
              borderColor: study.borderColor,
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex flex-col gap-2">
              <span
                className="font-mono text-[11px] uppercase tracking-wider font-semibold"
                style={{ color: study.color }}
              >
                {study.service} Practice
              </span>
              <h3 className="font-sans font-normal text-[20px] sm:text-[24px] text-white">
                Deploy a similar system with AEITCH
              </h3>
              <p className="font-poppins text-[13.5px] sm:text-[14px] text-white/65 max-w-[480px]">
                Explore our {study.service} engineering capabilities or book a technical architecture review directly with our principals.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href={study.servicePath}
                className="px-5 py-2.5 rounded-full border border-white/20 text-white font-poppins font-medium text-[13px] hover:bg-white/[0.06] transition-all no-underline"
              >
                Explore {study.service}
              </Link>
              <Link
                href="/contact#contact-form"
                className="px-5 py-2.5 rounded-full bg-white text-black font-poppins font-semibold text-[13px] hover:bg-neutral-200 transition-all no-underline"
              >
                Book Architecture Call
              </Link>
            </div>
          </section>

          {/* Other Case Studies Navigation */}
          <section className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40">
              More Case Studies
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherStudies.map((other) => (
                <Link
                  key={other.slug}
                  href={`/case-studies/${other.slug}`}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-white/25 transition-all no-underline flex flex-col gap-2 group"
                >
                  <span
                    className="font-mono text-[10.5px] uppercase tracking-wider"
                    style={{ color: other.color }}
                  >
                    {other.service}
                  </span>
                  <span className="font-sans text-[15px] text-white group-hover:text-white/90 leading-snug">
                    {other.title}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default CaseStudyDetailPage;
