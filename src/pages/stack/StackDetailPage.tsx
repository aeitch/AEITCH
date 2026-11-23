import React, { useEffect } from 'react';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { STACK_PAGES, StackPageItem } from '../../data/stackPages';

interface StackDetailPageProps {
  slug: string;
}

export const StackDetailPage: React.FC<StackDetailPageProps> = ({ slug }) => {
  const item: StackPageItem | undefined = STACK_PAGES.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!item) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-sans">Architecture Blueprint Not Found</h1>
          <Link href="/stack" className="text-[#76E3DC] underline">
            Return to Tech Stack Hub
          </Link>
        </div>
      </div>
    );
  }

  const stackSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: item.title,
    description: item.metaDescription,
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
    mainEntityOfPage: `https://www.aeitch.com/stack/${item.slug}`,
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#76E3DC] selection:text-black overflow-hidden">
      <SEOHead
        title={item.seoTitle}
        description={item.metaDescription}
        canonicalPath={`/stack/${item.slug}`}
        schema={stackSchema}
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #76E3DC 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <article className="relative z-10 w-full pt-32 sm:pt-36 tablet:pt-40 desktop:pt-44 pb-24 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[900px] mx-auto flex flex-col gap-10">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Technology Stack', path: '/stack' },
              { label: item.title, path: `/stack/${item.slug}` },
            ]}
          />

          {/* Header */}
          <header className="flex flex-col gap-5 border-b border-white/10 pb-8">
            <div className="flex items-center gap-3 text-[13px] font-mono text-[#76E3DC]">
              <span>{item.category}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/70">Production Architecture Blueprint</span>
            </div>

            <h1 className="font-sans font-normal text-[32px] sm:text-[44px] tablet:text-[50px] leading-[1.12] tracking-[-0.03em] text-white">
              {item.title}
            </h1>

            {/* Core technologies badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {item.coreTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[12px] font-mono text-white/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>

          {/* Summary Definition Box (AI-Citation Friendly) */}
          <section className="p-6 sm:p-8 rounded-2xl border border-[#76E3DC]/30 bg-[#76E3DC]/[0.04] flex flex-col gap-3">
            <span className="text-[#76E3DC] font-mono text-[12px] uppercase tracking-wider font-semibold">
              Architectural Definition
            </span>
            <p className="font-poppins text-white/90 text-[16px] leading-relaxed">
              {item.summaryDefinition}
            </p>
          </section>

          {/* Architectural Overview */}
          <section className="flex flex-col gap-4 font-poppins text-[16px] text-white/80 leading-relaxed">
            <h2 className="font-sans font-normal text-[26px] sm:text-[32px] text-white tracking-tight">
              System Architecture & Core Mechanics
            </h2>
            <p>{item.architecturalOverview}</p>
          </section>

          {/* Decision Matrix: When to Use vs When Not to Use */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 font-poppins">
            <div className="p-6 rounded-xl border border-[#76E3DC]/20 bg-white/[0.02] flex flex-col gap-3">
              <span className="text-[#76E3DC] font-mono text-[13px] font-semibold uppercase">
                Recommended For
              </span>
              <ul className="flex flex-col gap-2.5">
                {item.whenToUse.map((useCase, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[14px] text-white/80 leading-relaxed">
                    <span className="text-[#76E3DC] mt-0.5">✓</span>
                    <span>{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] flex flex-col gap-3">
              <span className="text-white/40 font-mono text-[13px] font-semibold uppercase">
                Avoid When
              </span>
              <ul className="flex flex-col gap-2.5">
                {item.whenNotToUse.map((avoid, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-[14px] text-white/60 leading-relaxed">
                    <span className="text-white/30 mt-0.5">✕</span>
                    <span>{avoid}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Comparative Analysis Table */}
          <section className="flex flex-col gap-4 font-poppins">
            <h2 className="font-sans font-normal text-[24px] sm:text-[28px] text-white tracking-tight">
              Trade-Off Analysis & Alternative Comparisons
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-[14px] font-poppins border-collapse">
                <thead>
                  <tr className="bg-white/[0.04] border-b border-white/10">
                    {item.comparisonTable.headers.map((h, idx) => (
                      <th key={idx} className="p-4 font-semibold text-white">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {item.comparisonTable.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-4 text-white/75">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Implementation Blueprint */}
          <section className="flex flex-col gap-6 font-poppins pt-4">
            <h2 className="font-sans font-normal text-[24px] sm:text-[28px] text-white tracking-tight">
              Implementation Blueprint & Code Contracts
            </h2>
            {item.implementationBlueprint.map((step, sIdx) => (
              <div key={sIdx} className="flex flex-col gap-3 p-6 rounded-2xl border border-white/10 bg-white/[0.015]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#76E3DC]/15 text-[#76E3DC] font-mono text-[12px] font-bold">
                    {sIdx + 1}
                  </span>
                  <h3 className="font-sans text-[18px] sm:text-[20px] text-white font-medium">
                    {step.stepTitle}
                  </h3>
                </div>
                <p className="text-[14.5px] text-white/70 leading-relaxed pl-10">
                  {step.description}
                </p>
                {step.codeOrConfig && (
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c] mt-2">
                    <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                      <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                        {step.codeOrConfig.language}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#76E3DC]/60" />
                    </div>
                    <pre className="p-4 sm:p-5 overflow-x-auto text-[13px] font-mono text-[#76E3DC]/95 leading-relaxed selection:bg-[#76E3DC]/20">
                      <code>{step.codeOrConfig.code}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </section>

          {/* Linked Pillar Service CTA */}
          <section className="p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8">
            <div className="flex flex-col gap-2">
              <span className="text-[12px] font-mono text-[#76E3DC] uppercase">Associated Core Pillar</span>
              <h4 className="font-sans text-[20px] text-white">
                {item.primaryPillar.name}
              </h4>
              <p className="text-[14px] text-white/60 max-w-[480px]">
                Connect with AEITCH architects to evaluate how this architecture pattern applies to your technical requirements.
              </p>
            </div>
            <Link
              href={item.primaryPillar.path}
              className="inline-flex items-center gap-2 bg-white text-black font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-full hover:bg-neutral-200 transition-all shrink-0 no-underline shadow-md"
            >
              <span>Explore {item.primaryPillar.name}</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </section>
        </div>
      </article>
    </div>
  );
};

export default StackDetailPage;
