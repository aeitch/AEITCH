'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { CULTURE_VALUES } from '@/data/life/values';
import { PhotoRevealFrame } from './PhotoRevealFrame';

export const LifeValuesSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section
      id="values"
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#070707] text-[#F5F5F3] border-b border-white/10 overflow-hidden"
    >
      {/* Subtle background coordinate line */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-8 md:left-24 w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 right-8 md:right-24 w-px bg-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
              <span className="size-1.5 rounded-full bg-[#E9800A]" />
              <span>{isAr ? '02 // مبادئ العمل والثقافة' : '02 // CULTURAL PRINCIPLES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
              {isAr ? (
                <>
                  كيف نفكر ونبني <span className="text-[#E9800A]">في إيتش</span>
                </>
              ) : (
                <>
                  How We Think & Build <span className="text-[#E9800A]">At AEITCH</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
            {isAr
              ? 'خمسة ثوابت غير قابلة للمساومة تحدد نمط اتخاذ قراراتنا الهندسية، مراجعاتنا للكود، وتعاملنا اليومي داخل الفريق.'
              : 'Five non-negotiable operational tenets that govern our architectural choices, code reviews, and everyday craftsmanship.'}
          </p>
        </div>

        {/* Editorial Accordion List */}
        <div className="divide-y divide-white/10 border-t border-white/10">
          {CULTURE_VALUES.map((item, index) => {
            const isActive = activeIndex === index;
            const title = isAr ? item.titleAr : item.titleEn;
            const line = isAr ? item.lineAr : item.lineEn;
            const detail = isAr ? item.detailAr : item.detailEn;

            return (
              <div
                key={item.id}
                className={`group transition-colors duration-200 ${
                  isActive ? 'bg-white/[0.03]' : 'hover:bg-white/[0.015]'
                }`}
              >
                {/* Header row */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(isActive ? -1 : index)}
                  className="w-full py-6 sm:py-8 md:py-10 text-start flex items-center justify-between gap-4 sm:gap-6 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#E9800A]"
                  aria-expanded={isActive}
                  aria-label={isActive ? (isAr ? `إغلاق ${title}` : `Collapse ${title}`) : (isAr ? `استعراض ${title}` : `Expand ${title}`)}
                >
                  <div className="flex items-baseline gap-4 sm:gap-8 md:gap-12 min-w-0">
                    {/* Outlined Numeral */}
                    <span
                      className={`text-3xl sm:text-5xl md:text-7xl font-mono font-black select-none tracking-tight tabular-nums transition-all duration-200 ${
                        isActive
                          ? 'text-[#E9800A] [-webkit-text-stroke:0px]'
                          : 'text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.3)] group-hover:[-webkit-text-stroke:1.5px_rgba(233,128,10,0.8)]'
                      }`}
                    >
                      {item.num}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg sm:text-2xl md:text-3xl font-bold font-readex tracking-tight text-white group-hover:text-white transition-colors truncate text-balance">
                      {title}
                    </h3>
                  </div>

                  {/* Toggle icon & state */}
                  <div className="flex items-center gap-3 shrink-0 font-mono text-xs">
                    <span className="hidden sm:inline-block text-white/40 uppercase tracking-widest text-[11px]">
                      {isActive ? (isAr ? 'إغلاق' : 'COLLAPSE') : (isAr ? 'استعراض' : 'EXPAND')}
                    </span>
                    <span
                      className={`size-8 rounded-none border border-white/20 flex items-center justify-center text-sm font-mono transition-transform duration-200 ${
                        isActive ? 'bg-[#E9800A] text-black border-[#E9800A] rotate-45' : 'text-white/60 group-hover:border-white/50'
                      }`}
                    >
                      +
                    </span>
                  </div>
                </button>

                {/* Expanded Content with Photo & Text */}
                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center border-t border-white/5">
                        {/* Text explanation */}
                        <div className="lg:col-span-7 space-y-4">
                          <p className="text-base sm:text-lg md:text-xl font-medium text-white/90 font-sans leading-relaxed border-s-2 border-[#E9800A] ps-4 text-pretty">
                            {line}
                          </p>
                          <p className="text-xs sm:text-sm md:text-base text-white/60 font-sans leading-relaxed ps-4 text-pretty">
                            {detail}
                          </p>
                          <div className="pt-2 ps-4 flex items-center gap-2 text-xs font-mono text-white/40">
                            <span className="text-[#E9800A]">●</span>
                            <span>{isAr ? 'مبدأ تشغيلي أصيل منذ التأسيس' : 'FOUNDATIONAL OPERATING TENET'}</span>
                          </div>
                        </div>

                        {/* Photo Frame */}
                        <div className="lg:col-span-5 max-w-md mx-auto w-full">
                          <PhotoRevealFrame
                            src={item.photo}
                            alt={title}
                            aspectRatio="4/3"
                            caption={isAr ? `توثيق ميداني — مبدأ ${item.num}` : `Field documentation — Principle ${item.num}`}
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
