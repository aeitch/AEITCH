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

      <div className="w-full max-w-[1440px] mx-auto px-6 tablet:px-12 desktop:px-[80px] pt-16 sm:pt-20 pb-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 desktop:grid-cols-5 gap-12 desktop:gap-8 mb-16">
          {/* Brand Info & Mission (Spans 2 cols on desktop) */}
          <div className="desktop:col-span-2 flex flex-col gap-6">
            <a href="/" className="flex items-center gap-3 no-underline group w-fit">
              {/* Monogram Icon */}
              <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10 shadow-sm backdrop-blur-sm">
                <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" role="img" aria-label="AEITCH Logo">
                  <path d="M12 2L2 22h4.5l2-4.5h7l2 4.5H22L12 2zm0 6.5l2.2 5h-4.4l2.2-5z" />
                </svg>
              </div>
              <span className="font-poppins font-bold text-[20px] tracking-tight text-white group-hover:text-white/90">
                AEITCH
              </span>
            </a>

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
                <a
                  href="/services/ai-automation"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7C059] group-hover:scale-125 transition-transform" />
                  <span>AI Automation</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/product-development"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#76E3DC] group-hover:scale-125 transition-transform" />
                  <span>Product Development</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/devops-cloud"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF9CAA] group-hover:scale-125 transition-transform" />
                  <span>DevOps & Cloud</span>
                </a>
              </li>
              <li>
                <a
                  href="/services/custom-software"
                  className="group flex items-center gap-2.5 font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74C8FC] group-hover:scale-125 transition-transform" />
                  <span>Custom Software</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Solutions & Work */}
          <div className="flex flex-col gap-4">
            <h4 className="font-poppins font-semibold text-[13px] uppercase tracking-wider text-white/40">
              Company
            </h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <a
                  href="/solutions"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Solutions
                </a>
              </li>
              <li>
                <a
                  href="/case-studies"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="font-poppins text-[14px] text-white/70 hover:text-white transition-colors duration-200 no-underline"
                >
                  Engagement Models
                </a>
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
              className="inline-flex items-center justify-center gap-2 bg-white text-black font-poppins font-semibold text-[13px] px-5 py-2.5 rounded-full hover:bg-neutral-200 transition-all no-underline w-fit"
            >
              <span>Book Architecture Call</span>
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Secondary Links */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-poppins text-[13px] text-white/40">
            © {new Date().getFullYear()} AEITCH Inc. All rights reserved.
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
