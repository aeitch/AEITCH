import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '../../router/Router';
import { SEOHead } from '../../components/seo/SEOHead';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-black text-white px-6 py-24 overflow-hidden select-none">
      <SEOHead
        title="404: Page Not Found | AEITCH"
        description="The page you requested could not be found or has been relocated to our updated architecture."
        canonicalPath="/404"
        noindex={true}
      />

      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-20 pointer-events-none blur-[140px] -z-0"
        style={{
          background: 'radial-gradient(circle, #F7C059 0%, rgba(247, 192, 89, 0.2) 50%, transparent 75%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-[620px] text-center flex flex-col items-center gap-6"
      >
        {/* Error Code Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#F7C059]/30 bg-[#F7C059]/10 text-[#F7C059] font-mono text-[12px] uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F7C059] animate-pulse" />
          <span>Error 404 • Missing Resource</span>
        </div>

        <h1 className="font-sans font-light text-[38px] sm:text-[52px] tablet:text-[60px] leading-[1.05] tracking-[-0.03em] text-white">
          Page Not Found
        </h1>

        <p className="font-poppins text-white/65 text-[15px] sm:text-[16px] leading-relaxed max-w-[480px]">
          The URL you requested does not exist on our servers or was retired during our recent system modernization.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2 w-full justify-center">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-poppins font-semibold text-[14px] px-7 py-3.5 rounded-full hover:bg-neutral-200 transition-all no-underline shadow-lg"
          >
            <span>Return to Homepage</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>

          <Link
            href="/solutions"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-poppins text-[14px] text-white/80 border border-white/15 hover:border-white/30 hover:text-white transition-all no-underline bg-white/[0.03]"
          >
            <span>Explore Solutions</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
