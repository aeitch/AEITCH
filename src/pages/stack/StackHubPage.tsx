import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';
import { STACK_PAGES } from '../../data/stackPages';

export const StackHubPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#76E3DC] selection:text-black overflow-hidden select-none">
      <SEOHead
        title="Engineering Tech Stack & Architecture Blueprints | AEITCH"
        description="Explore production-grade tech stack specifications: LangGraph, Kubernetes, pgvector, Terraform, Kafka, Go, Rust, and Next.js blueprints."
        canonicalPath="/stack"
      />
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #76E3DC 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full pt-32 sm:pt-36 tablet:pt-40 desktop:pt-44 pb-24 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-6 max-w-[800px] mx-auto">
            <Breadcrumbs align="center" items={[{ label: 'Technology Stack', path: '/stack' }]} />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#76E3DC]" />
              <span className="font-poppins font-medium text-[13px] text-white/80">
                Architectural Specifications
              </span>
            </div>

            <h1 className="font-sans font-normal text-[36px] sm:text-[48px] tablet:text-[58px] leading-[1.08] tracking-[-0.03em] text-white">
              Enterprise Technology Stack & <br />
              <span className="text-white/80">Architecture Blueprints</span>
            </h1>

            <p className="font-poppins text-white/70 text-[16px] sm:text-[18px] leading-relaxed">
              Curated architectural specifications detailing production trade-offs, deployment patterns, and integration logic across modern cloud, AI, and systems engineering.
            </p>
          </div>

          {/* Stack Blueprints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STACK_PAGES.map((item, idx) => (
              <motion.div
                key={item.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className="group rounded-2xl border border-white/10 hover:border-[#76E3DC]/40 bg-white/[0.02] hover:bg-white/[0.04] p-8 flex flex-col justify-between gap-6 transition-all shadow-lg"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[12px] font-mono text-white/50">
                    <span className="text-[#76E3DC]">{item.category}</span>
                  </div>

                  <h2 className="font-sans font-normal text-[20px] sm:text-[22px] text-white group-hover:text-[#76E3DC] transition-colors leading-snug">
                    <Link href={`/stack/${item.slug}`} className="no-underline text-inherit">
                      {item.title}
                    </Link>
                  </h2>

                  <p className="font-poppins text-white/65 text-[14px] leading-relaxed line-clamp-3">
                    {item.summaryDefinition}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {item.coreTechnologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-[11px] font-mono text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06] text-[13px] font-poppins">
                  <span className="text-white/40">{item.primaryPillar.name}</span>
                  <Link
                    href={`/stack/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-white/90 group-hover:text-[#76E3DC] transition-colors font-medium no-underline"
                  >
                    <span>View Blueprint</span>
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StackHubPage;
