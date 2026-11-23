import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';

export const CaseStudiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const studies = [
    {
      title: 'Support Pilot — Enterprise Agentic Support Architecture',
      service: 'AI Automation',
      color: '#F7C059',
      borderColor: 'rgba(247, 192, 89, 0.25)',
      impact: 'Reference Architecture • [[FOUNDER TO PROVIDE: Real Client Benchmark]]',
      desc: 'Architectural blueprint for a multi-agent autonomous swarm connected to hybrid vector retrieval (pgvector) with deterministic guardrails and automated human-in-the-loop escalation.',
      tech: ['LangGraph', 'Anthropic Claude', 'pgvector', 'FastAPI'],
      path: '/services/ai-automation',
    },
    {
      title: 'FinScale — Institutional Liquidity Dashboard',
      service: 'Product Development',
      color: '#76E3DC',
      borderColor: 'rgba(118, 227, 220, 0.25)',
      impact: 'Reference Architecture • [[FOUNDER TO PROVIDE: Real Client Benchmark]]',
      desc: 'Full-stack architecture blueprint for institutional financial interfaces featuring real-time WebSocket reconciliation, automated audit trails, and multi-tenant ledger isolation.',
      tech: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'GraphQL'],
      path: '/services/product-development',
    },
    {
      title: 'CloudPulse — Multi-Region Kubernetes Migration',
      service: 'DevOps & Cloud',
      color: '#FF9CAA',
      borderColor: 'rgba(255, 156, 170, 0.25)',
      impact: 'Reference Architecture • [[FOUNDER TO PROVIDE: Real Client Benchmark]]',
      desc: 'Cloud-native infrastructure blueprint demonstrating automated zero-downtime canary deployments, multi-region Amazon EKS orchestration, and deterministic Terraform modules.',
      tech: ['Kubernetes', 'Terraform', 'AWS EKS', 'ArgoCD', 'Prometheus'],
      path: '/services/devops-cloud',
    },
    {
      title: 'TransactCore — Low-Latency Order Processing Engine',
      service: 'Custom Software',
      color: '#74C8FC',
      borderColor: 'rgba(116, 200, 252, 0.25)',
      impact: 'Reference Architecture • [[FOUNDER TO PROVIDE: Real Client Benchmark]]',
      desc: 'High-throughput event-driven order processing engine architecture designed in Go and Apache Kafka with sub-15ms transactional guarantees and zero data loss constraints.',
      tech: ['Go', 'Apache Kafka', 'PostgreSQL', 'Docker', 'gRPC'],
      path: '/services/custom-software',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden select-none">
      <SEOHead
        title="Engineering Case Studies & Production Benchmarks | AEITCH"
        description="Explore how AEITCH deploys mission-critical software across autonomous AI, full-stack product development, cloud backbones, and bespoke systems."
        canonicalPath="/case-studies"
        noindex={true}
      />
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #F7C059 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full pt-32 sm:pt-36 tablet:pt-40 desktop:pt-44 pb-20 px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-5 max-w-[760px] mx-auto">
            <span className="font-poppins text-[12px] font-semibold tracking-widest text-[#F7C059] uppercase">
              Proven Impact
            </span>
            <h1 className="font-sans font-normal text-[36px] sm:text-[48px] tablet:text-[56px] leading-[1.08] tracking-[-0.03em] text-white">
              Engineering Case Studies & <br />
              <span className="text-white/90">Production Benchmarks</span>
            </h1>
            <p className="font-poppins text-white/70 text-[16px] sm:text-[17px] leading-relaxed">
              Explore how AEITCH deploys mission-critical software across autonomous AI, full-stack product development, cloud backbones, and bespoke systems.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            {studies.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl p-8 sm:p-10 bg-white/[0.02] border transition-all duration-300 flex flex-col desktop:flex-row items-start desktop:items-center justify-between gap-8 overflow-hidden shadow-xl"
                style={{ borderColor: item.borderColor }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(800px circle at top left, ${item.color}12, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex flex-col gap-4 max-w-[800px]">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-poppins font-semibold text-[12px] tracking-wide uppercase px-3 py-1 rounded-full border"
                      style={{
                        color: item.color,
                        borderColor: item.borderColor,
                        backgroundColor: `${item.color}10`,
                      }}
                    >
                      {item.service}
                    </span>
                    <span className="font-mono text-white/40 text-[12px]">CASE #{idx + 1}</span>
                  </div>

                  <h3 className="font-sans font-normal text-[24px] sm:text-[30px] text-white">
                    {item.title}
                  </h3>

                  <p className="font-poppins text-[15px] text-white/70 leading-relaxed">
                    {item.desc}
                  </p>

                  <div className="flex items-center gap-2 text-white/90 font-mono text-[13px] pt-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="font-semibold" style={{ color: item.color }}>Impact:</span>
                    <span>{item.impact}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.tech.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/70 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 shrink-0">
                  <Link
                    href={item.path}
                    className="inline-flex items-center gap-2 bg-white text-black font-poppins font-semibold text-[13.5px] px-6 py-3 rounded-full hover:bg-neutral-200 transition-all no-underline shadow-md"
                  >
                    <span>Read Study & Architecture</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

export default CaseStudiesPage;
