import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const SolutionsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const solutions = [
    {
      title: 'Autonomous Enterprise Workflows',
      service: 'AI Automation',
      color: '#F7C059',
      borderColor: 'rgba(247, 192, 89, 0.25)',
      desc: 'Replace legacy manual approvals, data reconciliation, and support tiers with self-reflecting agent swarms.',
      tags: ['LangGraph', 'Agent Swarms', 'RAG', 'ERP Connectors'],
      path: '/services/ai-automation',
    },
    {
      title: 'Hypergrowth Digital Products',
      service: 'Product Development',
      color: '#76E3DC',
      borderColor: 'rgba(118, 227, 220, 0.25)',
      desc: 'Ship production-ready SaaS and web applications in 4-8 week sprints with modular, type-safe foundations.',
      tags: ['Next.js', 'React', 'TypeScript', 'GraphQL'],
      path: '/services/product-development',
    },
    {
      title: 'Zero-Downtime Multi-Cloud Backbone',
      service: 'DevOps & Cloud',
      color: '#FF9CAA',
      borderColor: 'rgba(255, 156, 170, 0.25)',
      desc: 'Multi-region Kubernetes clusters with automated canary rollouts, Terraform IaC, and proactive FinOps cloud cost optimization.',
      tags: ['Kubernetes', 'Terraform', 'AWS/GCP', 'FinOps'],
      path: '/services/devops-cloud',
    },
    {
      title: 'Bespoke High-Frequency Engines',
      service: 'Custom Software',
      color: '#74C8FC',
      borderColor: 'rgba(116, 200, 252, 0.25)',
      desc: 'Custom distributed backends and event-driven architectures built for high-throughput concurrency and low-latency transactional execution.',
      tags: ['Go / Rust', 'Kafka', 'pgvector', 'Microservices'],
      path: '/services/custom-software',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden select-none">
      <SEOHead
        title="Strategic Enterprise Software Solutions | AEITCH"
        description="Discover how AEITCH bridges artificial intelligence, rapid product velocity, cloud infrastructure stability, and bespoke backend engineering into unified digital solutions."
        canonicalPath="/solutions"
      />
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #76E3DC 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full pt-28 sm:pt-32 desktop:pt-36 pb-16 sm:pb-20 desktop:pb-24 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-10 sm:gap-14 desktop:gap-16">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 sm:gap-5 max-w-[760px] mx-auto">
            <Breadcrumbs align="center" items={[{ label: 'Solutions', path: '/solutions' }]} />

            <span className="font-poppins text-[12px] font-semibold tracking-widest text-white/50 uppercase">
              Strategic Solutions
            </span>
            <h1 className="font-sans font-normal text-[30px] sm:text-[44px] tablet:text-[52px] leading-[1.08] tracking-[-0.03em] text-white">
              End-to-End Solutions for <br />
              <span className="text-white/90">Mission-Critical Demands</span>
            </h1>
            <p className="font-poppins text-white/70 text-[14.5px] sm:text-[17px] leading-relaxed">
              We bridge artificial intelligence, product velocity, infrastructure stability, and custom engineering into unified digital engines.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 desktop:gap-8">
            {solutions.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl p-5 sm:p-8 desktop:p-10 bg-white/[0.02] border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl"
                style={{ borderColor: item.borderColor }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(600px circle at top left, ${item.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
                  <div className="flex items-center justify-between">
                    <span
                      className="font-poppins font-semibold text-[12px] sm:text-[13px] tracking-wide uppercase px-3 py-1 rounded-full border"
                      style={{
                        color: item.color,
                        borderColor: item.borderColor,
                        backgroundColor: `${item.color}10`,
                      }}
                    >
                      {item.service}
                    </span>
                    <span className="font-mono text-white/40 text-[13px] sm:text-[14px]">0{idx + 1}</span>
                  </div>

                  <h3 className="font-sans font-normal text-[20px] sm:text-[26px] desktop:text-[28px] text-white">
                    {item.title}
                  </h3>

                  <p className="font-poppins text-[14px] sm:text-[15px] text-white/65 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1 sm:pt-2">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/70 font-mono text-[11px]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-6 sm:pt-8">
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-2 font-poppins font-medium text-[13.5px] transition-all no-underline"
                    style={{ color: item.color }}
                  >
                    <span>Explore {item.service} Deep-Dive</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export default SolutionsPage;
