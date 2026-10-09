'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { LIFE_QUOTES } from '@/data/life/quotes';
import { PhotoRevealFrame } from './PhotoRevealFrame';

export const LifeQuotesSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const currentQuote = LIFE_QUOTES[activeIdx];

  return (
    <section
      id="quotes"
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#070707] text-[#F5F5F3] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
              <span className="size-1.5 rounded-full bg-[#E9800A]" />
              <span>{isAr ? '08 // بأصواتهم' : '08 // IN THEIR WORDS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
              {isAr ? (
                <>
                  شهادات من داخل <span className="text-[#E9800A]">الميدان البرمجي</span>
                </>
              ) : (
                <>
                  Perspectives from <span className="text-[#E9800A]">The Terminal</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
            {isAr
              ? 'كلمات حقيقية من مهندسينا حول ما يعنيه بناء برمجيات سيادية تسند طموحات المملكة والخليج.'
              : 'Unfiltered insights from our builders on craft, velocity, and sovereign enterprise technology.'}
          </p>
        </div>

        {/* Featured Editorial Quote Showcase */}
        <div className="bg-[#0A0A0A] border border-white/10 p-6 sm:p-10 lg:p-14 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Portrait with PhotoRevealFrame */}
            <div className="lg:col-span-4 max-w-xs mx-auto w-full bg-black">
              <PhotoRevealFrame
                src={currentQuote.portrait}
                alt={isAr ? currentQuote.authorAr : currentQuote.authorEn}
                aspectRatio="3/4"
                caption={isAr ? currentQuote.roleAr : currentQuote.roleEn}
                priority={false}
              />
            </div>

            {/* Quote details */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-6 sm:space-y-8">
              {/* Massive quotation mark */}
              <div className="text-6xl sm:text-7xl lg:text-8xl font-serif text-[#E9800A] leading-none select-none opacity-80">
                &ldquo;
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-readex font-bold text-white leading-snug text-balance">
                {isAr ? currentQuote.quoteAr : currentQuote.quoteEn}
              </blockquote>

              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-readex text-white text-balance">
                    {isAr ? currentQuote.authorAr : currentQuote.authorEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-[#E9800A]">
                    {isAr ? currentQuote.roleAr : currentQuote.roleEn}
                  </p>
                </div>

                {/* Switcher Buttons */}
                <div className="flex items-center gap-2">
                  {LIFE_QUOTES.map((_, qIdx) => (
                    <button
                      key={qIdx}
                      type="button"
                      onClick={() => setActiveIdx(qIdx)}
                      className={`size-9 sm:size-10 rounded-none border font-mono text-xs tabular-nums transition-colors ${
                        activeIdx === qIdx
                          ? 'bg-[#E9800A] text-black border-[#E9800A] font-bold'
                          : 'bg-white/5 text-white/60 border-white/15 hover:border-white/40'
                      }`}
                      aria-label={`Go to quote ${qIdx + 1}`}
                    >
                      0{qIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
