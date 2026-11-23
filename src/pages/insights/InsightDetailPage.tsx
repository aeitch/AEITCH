import React, { useEffect } from 'react';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { INSIGHTS_ARTICLES, InsightArticle } from '../../data/insightsArticles';

interface InsightDetailPageProps {
  slug: string;
}

export const InsightDetailPage: React.FC<InsightDetailPageProps> = ({ slug }) => {
  const article: InsightArticle | undefined = INSIGHTS_ARTICLES.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center pt-32">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-3xl font-sans">Article Not Found</h1>
          <Link href="/insights" className="text-[#F7C059] underline">
            Return to Technical Insights
          </Link>
        </div>
      </div>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishDate,
    dateModified: article.publishDate,
    author: {
      '@type': 'Organization',
      name: 'AEITCH SMC PVT LTD',
      url: 'https://www.aeitch.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AEITCH',
      url: 'https://www.aeitch.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.aeitch.com/logo.png',
      },
    },
    mainEntityOfPage: `https://www.aeitch.com/insights/${article.slug}`,
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#F7C059] selection:text-black overflow-hidden">
      <SEOHead
        title={article.seoTitle}
        description={article.metaDescription}
        canonicalPath={`/insights/${article.slug}`}
        ogType="article"
        schema={articleSchema}
      />

      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #F7C059 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <article className="relative z-10 w-full pt-28 sm:pt-32 desktop:pt-36 pb-16 sm:pb-20 desktop:pb-24 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[880px] mx-auto flex flex-col gap-8 sm:gap-10">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: 'Technical Insights', path: '/insights' },
              { label: article.title, path: `/insights/${article.slug}` },
            ]}
          />

          {/* Article Header */}
          <header className="flex flex-col gap-4 sm:gap-5 border-b border-white/10 pb-6 sm:pb-8">
            <div className="flex items-center gap-2.5 sm:gap-3 text-[12px] sm:text-[13px] font-mono text-[#F7C059]">
              <span>{article.category}</span>
              <span className="text-white/30">•</span>
              <span className="text-white/60">{article.readTime}</span>
            </div>

            <h1 className="font-sans font-normal text-[26px] sm:text-[38px] tablet:text-[46px] leading-[1.12] tracking-[-0.03em] text-white">
              {article.title}
            </h1>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[13px] sm:text-[13.5px] font-poppins text-white/60 pt-1 sm:pt-2">
              <div className="flex items-center gap-2">
                <span>By</span>
                <span className="text-white font-medium">{article.authorByline}</span>
              </div>
              <time dateTime={article.publishDate}>{article.publishDate}</time>
            </div>
          </header>

          {/* AI Citation Summary Box */}
          <aside className="p-4 sm:p-6 desktop:p-8 rounded-2xl border border-[#F7C059]/30 bg-[#F7C059]/[0.04] flex flex-col gap-3.5 sm:gap-4">
            <div className="flex items-center gap-2 text-[#F7C059] font-mono text-[11.5px] sm:text-[12px] uppercase tracking-wider font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#F7C059]" />
              <span>Architectural Takeaway (Executive Summary)</span>
            </div>
            <p className="font-poppins text-white/90 text-[14.5px] sm:text-[16px] leading-relaxed font-medium">
              {article.summaryBox.coreTakeaway}
            </p>
            <ul className="flex flex-col gap-2 pt-2 border-t border-[#F7C059]/15">
              {article.summaryBox.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2 text-[13.5px] sm:text-[14px] text-white/75 font-poppins leading-relaxed">
                  <span className="text-[#F7C059] mt-0.5">▪</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>

          {/* Article Body */}
          <div className="flex flex-col gap-8 sm:gap-10 font-poppins text-[15px] sm:text-[16px] text-white/80 leading-relaxed">
            <p className="text-[16px] sm:text-[18px] text-white/90 leading-relaxed border-l-2 border-[#F7C059] pl-4 sm:pl-5 italic">
              {article.content.lead}
            </p>

            {article.content.sections.map((section, sIdx) => (
              <section key={sIdx} className="flex flex-col gap-4 sm:gap-5 pt-3 sm:pt-4">
                <h2 className="font-sans font-normal text-[22px] sm:text-[28px] desktop:text-[32px] text-white tracking-tight leading-snug">
                  {section.heading}
                </h2>

                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-white/75 leading-relaxed">
                    {p}
                  </p>
                ))}

                {section.codeSnippet && (
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#0a0a0c] my-2 sm:my-3">
                    {section.codeSnippet.caption && (
                      <div className="px-3.5 sm:px-4 py-2 border-b border-white/10 bg-white/[0.03] text-[11.5px] sm:text-[12px] font-mono text-white/50">
                        {section.codeSnippet.caption}
                      </div>
                    )}
                    <pre className="p-3.5 sm:p-5 overflow-x-auto text-[12px] sm:text-[13px] font-mono text-[#F7C059]/90 leading-relaxed">
                      <code>{section.codeSnippet.code}</code>
                    </pre>
                  </div>
                )}

                {section.comparisonTable && (
                  <div className="overflow-x-auto my-3 sm:my-4 rounded-xl border border-white/10">
                    <table className="w-full text-left text-[13px] sm:text-[14px] font-poppins border-collapse">
                      <thead>
                        <tr className="bg-white/[0.04] border-b border-white/10">
                          {section.comparisonTable.headers.map((h, hIdx) => (
                            <th key={hIdx} className="p-3 sm:p-4 font-semibold text-white">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {section.comparisonTable.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-white/[0.04] hover:bg-white/[0.02]">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="p-3 sm:p-4 text-white/75">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* References Section */}
            {article.content.references && article.content.references.length > 0 && (
              <section className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col gap-3.5 sm:gap-4">
                <h3 className="font-sans font-normal text-[18px] sm:text-[20px] text-white">
                  Technical References & Industry Standards
                </h3>
                <ul className="flex flex-col gap-2.5 sm:gap-3">
                  {article.content.references.map((ref, rIdx) => (
                    <li key={rIdx} className="text-[13px] sm:text-[14px] font-poppins text-white/60">
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#F7C059] hover:underline font-medium"
                      >
                        {ref.title}
                      </a>{' '}
                      — <span>{ref.annotation}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Related Service Pillar CTA */}
            <div className="p-5 sm:p-8 rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.03] to-transparent flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 mt-6 sm:mt-8">
              <div className="flex flex-col gap-1.5 sm:gap-2">
                <span className="text-[12px] font-mono text-[#F7C059] uppercase">Related Capability</span>
                <h4 className="font-sans text-[18px] sm:text-[20px] text-white">
                  {article.pillarService.name}
                </h4>
                <p className="text-[13.5px] sm:text-[14px] text-white/60 max-w-[480px]">
                  Explore how AEITCH engineers implement production architectures for enterprise clients.
                </p>
              </div>
              <Link
                href={article.pillarService.path}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-full hover:bg-neutral-200 transition-all shrink-0 no-underline shadow-md"
              >
                <span>View Service Details</span>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default InsightDetailPage;
