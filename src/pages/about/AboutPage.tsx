import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';
import { Breadcrumbs } from '../../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      title: 'Humans Behind AI',
      desc: 'AI does not replace human insight; it magnifies it. We pair senior software architects with cutting-edge autonomous tooling to achieve unprecedented engineering leverage.',
      color: '#F7C059',
    },
    {
      title: 'Zero Bloat, Zero Lock-In',
      desc: 'We engineer type-safe, modular, open-standard architectures. You own 100% of your source code, infrastructure templates, and IP with zero vendor lock-in.',
      color: '#76E3DC',
    },
    {
      title: 'Production Resilience First',
      desc: 'We treat uptime, latency SLAs, deterministic testing, and fault isolation as foundational constraints, never afterthoughts.',
      color: '#FF9CAA',
    },
    {
      title: 'Extreme Velocity with Craft',
      desc: 'We compress quarters of roadmap into high-velocity 2-week delivery cycles without ever sacrificing code quality or system security.',
      color: '#74C8FC',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden select-none">
      <SEOHead
        title="About AEITCH — Engineering Collective Behind Intelligent Systems"
        description="AEITCH SMC PVT LTD is an engineering collective uniting senior software architects with cutting-edge autonomous AI systems to build production-grade architectures."
        canonicalPath="/about"
      />
      {/* Top Ambient Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle at 50% 30%, #F7C059 0%, rgba(0,0,0,0) 70%)',
        }}
        aria-hidden="true"
      />

      <section className="relative z-10 w-full pt-28 sm:pt-32 desktop:pt-36 pb-16 sm:pb-20 desktop:pb-24 px-4 sm:px-6 tablet:px-12 desktop:px-[80px]">
        <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-12 sm:gap-16 desktop:gap-20">
          {/* Header */}
          <div className="flex flex-col items-center text-center gap-4 sm:gap-6 max-w-[760px] mx-auto">
            <Breadcrumbs align="center" items={[{ label: 'About AEITCH', path: '/about' }]} />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#F7C059]" />
              <span className="font-poppins font-medium text-[12px] sm:text-[13px] text-white/80">
                AEITCH SMC PVT LTD
              </span>
            </div>

            <h1 className="font-sans font-normal text-[30px] sm:text-[44px] tablet:text-[54px] leading-[1.08] tracking-[-0.03em] text-white">
              The Engineering Collective <br />
              <span className="text-white/80">Behind Intelligent Systems</span>
            </h1>

            <p className="font-poppins text-white/70 text-[14.5px] sm:text-[17px] leading-relaxed">
              AEITCH (legally registered as <strong>AEITCH SMC PVT LTD</strong>) is an enterprise engineering collective architecting autonomous AI agent systems, full-cycle SaaS products, resilient multi-cloud backbones, and bespoke high-throughput software for forward-thinking organizations worldwide.
            </p>
          </div>

          {/* Entity Profile & Corporate Overview Card */}
          <div className="p-5 sm:p-8 desktop:p-10 rounded-2xl border border-white/10 bg-white/[0.02] max-w-[1000px] mx-auto w-full flex flex-col md:flex-row gap-6 sm:gap-8 items-start justify-between">
            <div className="flex flex-col gap-3 max-w-[580px]">
              <span className="text-[12px] font-mono tracking-widest text-[#F7C059] uppercase">Company Profile</span>
              <h2 className="font-sans text-[22px] sm:text-[28px] text-white">
                About AEITCH SMC PVT LTD
              </h2>
              <p className="font-poppins text-white/65 text-[14px] sm:text-[14.5px] leading-relaxed">
                Operating at the intersection of applied machine intelligence and systems engineering, AEITCH unites senior software architects to build production-ready digital architectures. We partner with CTOs, product leaders, and tech founders across the United States to deliver secure, resilient software without bloated retainers or vendor lock-in.
              </p>
            </div>
            <div className="flex flex-col gap-3.5 sm:gap-4 text-[13.5px] sm:text-[14px] font-poppins text-white/70 border-t md:border-t-0 md:border-l border-white/10 pt-5 md:pt-0 md:pl-8 min-w-[240px] w-full md:w-auto">
              <div>
                <span className="block text-white/40 text-[11.5px] sm:text-[12px]">Legal Name</span>
                <span className="text-white font-medium">AEITCH SMC PVT LTD</span>
              </div>
              <div>
                <span className="block text-white/40 text-[11.5px] sm:text-[12px]">Corporate Contact</span>
                <a href="mailto:hello@aeitch.com" className="text-[#F7C059] hover:underline">hello@aeitch.com</a>
              </div>
              <div>
                <span className="block text-white/40 text-[11.5px] sm:text-[12px]">Direct Phone & WhatsApp</span>
                <a href="https://wa.me/923184055723" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">+92 318 4055723</a>
              </div>
              <div>
                <span className="block text-white/40 text-[11.5px] sm:text-[12px]">Key Markets Served</span>
                <span className="text-white">United States & Global B2B</span>
              </div>
            </div>
          </div>

          {/* Core Values Grid (with the 4 service color accents) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 desktop:gap-8">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="group relative rounded-2xl p-5 sm:p-7 desktop:p-8 bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col gap-3.5 sm:gap-4 overflow-hidden shadow-xl"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(500px circle at top left, ${v.color}15, transparent 70%)`,
                  }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border font-mono font-bold text-[13px] sm:text-[14px]"
                    style={{
                      backgroundColor: `${v.color}15`,
                      borderColor: `${v.color}30`,
                      color: v.color,
                    }}
                  >
                    0{idx + 1}
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} />
                </div>

                <h3 className="relative z-10 font-sans font-normal text-[20px] sm:text-[24px] desktop:text-[26px] text-white">
                  {v.title}
                </h3>

                <p className="relative z-10 font-poppins text-[14px] sm:text-[15px] text-white/65 leading-relaxed">
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Box */}
          <div className="relative rounded-[24px] sm:rounded-[28px] p-6 sm:p-10 desktop:p-14 border border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent text-center flex flex-col items-center gap-5 sm:gap-6 max-w-[900px] mx-auto w-full">
            <h2 className="font-sans font-normal text-[24px] sm:text-[34px] desktop:text-[38px] text-white tracking-tight">
              Ready to Accelerate Your Technical Journey?
            </h2>
            <p className="font-poppins text-white/70 text-[14px] sm:text-[16px] max-w-[560px] leading-relaxed">
              Whether you need an autonomous agent workflow, full-lifecycle product development, multi-cloud Kubernetes, or bespoke backend engineering, our pods are ready.
            </p>
            <Link
              href="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-poppins font-semibold text-[14px] px-7 py-3.5 rounded-full hover:bg-neutral-200 transition-all no-underline shadow-lg"
            >
              <span>Explore Engagement Models</span>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
