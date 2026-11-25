import React from 'react';
import { Link } from '../../router/Router';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-black border-t border-white/[0.08] relative overflow-hidden select-none">
      {/* Subtle top ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 tablet:px-12 desktop:px-[80px] pt-12 sm:pt-16 desktop:pt-20 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-5 gap-10 sm:gap-12 desktop:gap-8 mb-12 sm:mb-16">
          {/* Brand Info & Mission (Spans 2 cols on desktop) */}
          <div className="desktop:col-span-2 flex flex-col gap-6">
            <Link href="/" className="inline-flex items-center no-underline group w-fit">
              <img
                src="/logo.png"
                alt="AEITCH"
                width={296}
                height={38}
                className="h-7 sm:h-8 w-auto object-contain transition-opacity duration-200 group-hover:opacity-90"
              />
            </Link>

            <p className="font-poppins text-white/60 text-[14px] leading-relaxed max-w-[380px]">
              The engineering collective behind mission-critical AI systems, high-velocity digital products, resilient cloud backbones, and bespoke software.
            </p>

            {/* Tagline Badge */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-poppins text-[12px] text-white/70 tracking-wide">
                Humans behind AI • Engineering Pods Active
              </span>
            </div>
          </div>

          {/* Services Column (with 4 themed indicators) */}
          <div className="flex flex-col gap-4">
            <h4 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-white/40">
              Services
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <Link
                  href="/services/ai-automation"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7C059] group-hover:scale-125 transition-transform" />
                  <span>AI Automation</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/product-development"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#76E3DC] group-hover:scale-125 transition-transform" />
                  <span>Product Development</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/devops-cloud"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9CAA] group-hover:scale-125 transition-transform" />
                  <span>DevOps & Cloud</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/services/custom-software"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74C8FC] group-hover:scale-125 transition-transform" />
                  <span>Custom Software</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Architecture */}
          <div className="flex flex-col gap-4">
            <h4 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-white/40">
              Architecture & Insights
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <Link
                  href="/insights"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Technical Insights
                </Link>
              </li>
              <li>
                <Link
                  href="/stack"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Tech Stack Blueprints
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Case Studies & Proof
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  About AEITCH
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Engagement Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch CTA Block */}
          <div className="flex flex-col gap-4">
            <h4 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-white/40">
              Connect
            </h4>
            <p className="font-poppins text-white/60 text-[13.5px] leading-relaxed">
              Have an ambitious system to engineer? Let’s architect your solution.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-poppins font-semibold text-[13px] px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all no-underline w-full sm:w-fit"
            >
              <span>Book Architecture Call</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>

            {/* Entity Verification & Social Links */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href="https://github.com/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all no-underline"
                title="GitHub"
                aria-label="AEITCH GitHub"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all no-underline"
                title="LinkedIn"
                aria-label="AEITCH LinkedIn"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://x.com/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/25 transition-all no-underline"
                title="X (Twitter)"
                aria-label="AEITCH on X"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://clutch.co/profile/aeitch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:border-white/25 font-mono text-[11px] transition-all no-underline"
                title="Clutch Verified Profile"
              >
                Clutch
              </a>
              <a
                href="https://huggingface.co/AEITCH"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/60 hover:text-white hover:border-white/25 font-mono text-[11px] transition-all no-underline"
                title="Hugging Face AI Org"
              >
                HF
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Secondary Links */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-[13px] text-white/40">
            © {new Date().getFullYear()} AEITCH SMC PVT LTD. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="font-poppins text-[12.5px] text-white/40 hover:text-white/70 transition-colors no-underline">
              Privacy Policy
            </a>
            <span className="text-white/20">•</span>
            <a href="#terms" className="font-poppins text-[12.5px] text-white/40 hover:text-white/70 transition-colors no-underline">
              Terms of Service
            </a>
            <span className="text-white/20">•</span>
            <a href="#security" className="font-poppins text-[12.5px] text-white/40 hover:text-white/70 transition-colors no-underline">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
