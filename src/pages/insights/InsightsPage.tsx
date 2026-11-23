import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { INSIGHTS_ARTICLES } from '../../data/insightsArticles';

export const InsightsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', ...Array.from(new Set(INSIGHTS_ARTICLES.map((a) => a.category)))];

  const filteredArticles =
    selectedCategory === 'All'
      ? INSIGHTS_ARTICLES
      : INSIGHTS_ARTICLES.filter((a) => a.category === selectedCategory);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#F7C059] selection:text-black overflow-hidden select-none">
      <SEOHead
        title="Technical Engineering Insights & Architecture Guides | AEITCH"
        description="Deep technical analysis, architecture blueprints, and benchmarks on enterprise RAG, multi-agent systems, FinOps, and distributed engineering."
        canonicalPath="/insights"
      />
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #F7C059 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full pt-32 sm:pt-36 tablet:pt-40 desktop:pt-44 pb-24 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[800px] mx-auto">
            <Breadcrumbs items={[{ label: 'Technical Insights', path: '/insights' }]} />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F7C059]" />
              <span className="font-poppins font-medium text-[13px] text-white/80">
                AEITCH Research & Engineering
              </span>
            </div>

            <h1 className="font-sans font-normal text-[36px] sm:text-[48px] tablet:text-[58px] leading-[1.08] tracking-[-0.03em] text-white">
              Technical Insights & <br />
              <span className="text-white/80">Systems Architecture</span>
            </h1>

            <p className="font-poppins text-white/70 text-[16px] sm:text-[18px] leading-relaxed">
              In-depth engineering analyses, architectural decision frameworks, and production-tested patterns from senior software architects at AEITCH SMC PVT LTD.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full font-poppins text-[13px] transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white text-black font-semibold shadow-md'
                      : 'bg-white/[0.04] text-white/70 border border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, idx) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group rounded-2xl border border-white/10 hover:border-[#F7C059]/40 bg-white/[0.02] hover:bg-white/[0.04] p-8 flex flex-col justify-between gap-6 transition-all shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[12px] font-mono text-white/50">
                    <span className="text-[#F7C059]">{article.category}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h2 className="font-sans font-normal text-[22px] sm:text-[24px] text-white group-hover:text-[#F7C059] transition-colors leading-snug">
                    <Link href={`/insights/${article.slug}`} className="no-underline text-inherit">
                      {article.title}
                    </Link>
                  </h2>

                  <p className="font-poppins text-white/65 text-[14px] leading-relaxed line-clamp-3">
                    {article.metaDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-[13px] font-poppins">
                  <span className="text-white/40">{article.publishDate}</span>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-white/90 group-hover:text-[#F7C059] transition-colors font-medium no-underline"
                  >
                    <span>Read Article</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
