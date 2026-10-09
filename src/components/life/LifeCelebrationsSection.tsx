'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/lib/i18n';
import { BIRTHDAYS_DATA, CELEBRATION_MOMENTS } from '@/data/life/celebrations';
import { PhotoRevealFrame } from './PhotoRevealFrame';

export const LifeCelebrationsSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedMonth, setSelectedMonth] = useState<number>(0);

  const activeMonthData = BIRTHDAYS_DATA[selectedMonth];

  const triggerConfetti = (e?: React.MouseEvent) => {
    let originX = 0.5;
    let originY = 0.5;
    if (e) {
      originX = e.clientX / window.innerWidth;
      originY = e.clientY / window.innerHeight;
    }

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { x: originX, y: originY },
        colors: ['#E9800A', '#FFFFFF', '#555555', '#D47000'],
        disableForReducedMotion: true,
      });
    } catch {
      // In case canvas is unavailable
    }
  };

  const handleSelectMonth = (idx: number, e?: React.MouseEvent) => {
    setSelectedMonth(idx);
    triggerConfetti(e);
  };

  return (
    <section
      id="celebrations"
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#0A0A0A] text-[#F5F5F3] border-b border-white/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
              <span className="size-1.5 rounded-full bg-[#E9800A]" />
              <span>{isAr ? '05 // أعياد الميلاد والاحتفالات' : '05 // CELEBRATIONS & BIRTHDAYS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
              {isAr ? (
                <>
                  أيام الفرح <span className="text-[#E9800A]">ومحطات الإنجاز</span>
                </>
              ) : (
                <>
                  Shared Moments <span className="text-[#E9800A]">& Milestones</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
            {isAr
              ? 'نحتفل بأعياد ميلاد أعضاء الفريق (اليوم والشهر فقط دون سنوات)، ونخلد لحظات نجاح الإطلاق، وإفطار رمضان، ومناسبات الأعياد.'
              : 'Commemorating birthdays (day and month only, zero years or ages) and celebrating production deployments, Ramadan iftars, and festive Eids.'}
          </p>
        </div>

        {/* Part 1: Circular SVG Birthday Wheel & Focus Panel */}
        <div className="mb-16 sm:mb-20 bg-[#070707] border border-white/10 p-5 sm:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 justify-between">
            {/* SVG Wheel Visual */}
            <div className="relative size-[260px] sm:size-[340px] max-w-full shrink-0 flex items-center justify-center">
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-white/15 pointer-events-none animate-[spin_120s_linear_infinite]" />

              <svg viewBox="0 0 400 400" className="w-full h-full select-none">
                {/* 12 Month Segments */}
                {BIRTHDAYS_DATA.map((month, idx) => {
                  const angle = (idx * 360) / 12;
                  const rad = (angle - 90) * (Math.PI / 180);
                  const isSelected = selectedMonth === idx;
                  const cx = 200 + 130 * Math.cos(rad);
                  const cy = 200 + 130 * Math.sin(rad);

                  return (
                    <g key={month.monthIndex} className="cursor-pointer">
                      {/* Connection ray to center */}
                      <line
                        x1="200"
                        y1="200"
                        x2={cx}
                        y2={cy}
                        stroke={isSelected ? '#E9800A' : 'rgba(255,255,255,0.08)'}
                        strokeWidth={isSelected ? '2' : '1'}
                      />
                      {/* Month node */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 24 : 18}
                        fill={isSelected ? '#E9800A' : '#141414'}
                        stroke={isSelected ? '#FFFFFF' : 'rgba(255,255,255,0.25)'}
                        strokeWidth={isSelected ? '2.5' : '1'}
                        className="transition-all duration-200"
                        onClick={(e) => handleSelectMonth(idx, e)}
                      />
                      {/* Month Label */}
                      <text
                        x={cx}
                        y={cy + 4}
                        textAnchor="middle"
                        fill={isSelected ? '#000000' : '#FFFFFF'}
                        fontSize={isSelected ? '12' : '10'}
                        fontWeight={isSelected ? 'bold' : 'normal'}
                        fontFamily="monospace"
                        className="pointer-events-none select-none transition-colors"
                      >
                        {isAr ? month.shortAr : month.shortEn}
                      </text>
                    </g>
                  );
                })}

                {/* Center Core Circle */}
                <circle
                  cx="200"
                  cy="200"
                  r="50"
                  fill="#000000"
                  stroke="#E9800A"
                  strokeWidth="2"
                  className="cursor-pointer hover:fill-white/5 transition-colors"
                  onClick={(e) => triggerConfetti(e)}
                />
                <text
                  x="200"
                  y="196"
                  textAnchor="middle"
                  fill="#E9800A"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  AEITCH
                </text>
                <text
                  x="200"
                  y="214"
                  textAnchor="middle"
                  fill="#FFFFFF"
                  fontSize="9"
                  fontFamily="monospace"
                  letterSpacing="1"
                  className="pointer-events-none opacity-80"
                >
                  {isAr ? 'انقر للفرح 🎉' : 'CLICK 🎉'}
                </text>
              </svg>
            </div>

            {/* Selected Month Spotlight */}
            <div className="flex-1 w-full lg:max-w-xl bg-[#0F0F0F] border border-white/10 p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
                <div>
                  <span className="text-xs font-mono text-[#E9800A] uppercase tracking-wider block mb-1">
                    {isAr ? 'أعياد ميلاد الشهر المحدد' : 'SELECTED MONTH'}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-readex text-white text-balance">
                    {isAr ? activeMonthData.nameAr : activeMonthData.nameEn}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={(e) => triggerConfetti(e)}
                  className="px-3 py-1.5 text-xs font-mono bg-[#E9800A] text-black font-semibold hover:bg-[#ff9520] transition-colors"
                >
                  {isAr ? 'احتفل معنا 🎊' : 'Celebrate 🎊'}
                </button>
              </div>

              {/* People list */}
              {activeMonthData.people.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {activeMonthData.people.map((person, pIdx) => (
                    <div
                      key={pIdx}
                      className="p-3.5 sm:p-4 bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="size-11 sm:size-12 bg-[#E9800A]/10 border border-[#E9800A]/40 flex flex-col items-center justify-center shrink-0">
                          <span className="text-xs font-mono text-[#E9800A] font-bold tabular-nums">
                            {person.day}
                          </span>
                          <span className="text-[9px] font-mono text-white/50 uppercase">
                            {isAr ? activeMonthData.shortAr : activeMonthData.shortEn}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold font-readex text-white text-balance">
                            {isAr ? person.nameAr : person.nameEn}
                          </h4>
                          <p className="text-xs text-white/60 font-sans">
                            {isAr ? person.roleAr : person.roleEn}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-white/40 border border-white/10 px-2 py-0.5">
                        {isAr ? 'يوم الميلاد' : 'BIRTHDAY'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/50 font-sans italic py-4 text-pretty">
                  {isAr ? 'لا يوجد أعياد ميلاد مسجلة في هذا الشهر.' : 'No birthdays scheduled this month.'}
                </p>
              )}

              {/* Strict privacy footnote */}
              <div className="mt-5 pt-3.5 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-white/40">
                <span className="text-[#E9800A]">🔒</span>
                <span className="text-pretty">
                  {isAr
                    ? 'سياسة الخصوصية: نسجل فقط اليوم والشهر، دون حفظ أي سنة أو عمر للأعضاء.'
                    : 'Privacy Guarantee: Month and day recorded only. Zero birth years or ages stored.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Moments Marquee */}
        <div className="mt-8 sm:mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold font-readex text-white text-balance">
              {isAr ? 'لحظات تجمعنا وتخلد مسيرتنا' : 'Moments That Define Our Bond'}
            </h3>
            <span className="text-xs font-mono text-white/40 hidden sm:inline-block">
              {isAr ? 'مرر للتوقف والاطلاع' : 'HOVER TO PAUSE'}
            </span>
          </div>

          {/* Marquee Strip with hover pause and max-w-full to prevent horizontal scroll spill */}
          <div className="group relative w-full max-w-full overflow-hidden overflow-x-clip">
            <div className="flex gap-4 sm:gap-6 w-max animate-marquee group-hover:[animation-play-state:paused]">
              {/* Double array for seamless loop */}
              {[...CELEBRATION_MOMENTS, ...CELEBRATION_MOMENTS].map((moment, mIdx) => {
                const title = isAr ? moment.titleAr : moment.titleEn;
                const desc = isAr ? moment.descriptionAr : moment.descriptionEn;
                const cat = isAr ? moment.categoryAr : moment.categoryEn;

                return (
                  <article
                    key={`${moment.id}-${mIdx}`}
                    className="w-[280px] sm:w-[340px] shrink-0 bg-[#070707] border border-white/10 p-4 sm:p-5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative mb-3.5 bg-black">
                        <PhotoRevealFrame
                          src={moment.image}
                          alt={title}
                          aspectRatio="16/9"
                          caption={moment.tag}
                        />
                        <span className="absolute top-2 start-2 z-20 px-1.5 py-0.5 text-[9px] font-mono uppercase bg-black/80 text-[#E9800A] border border-white/10">
                          {moment.tag}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-white/40 uppercase mb-1">{cat}</div>
                      <h4 className="text-base font-bold font-readex text-white mb-2 leading-snug text-balance">{title}</h4>
                      <p className="text-xs text-white/70 font-sans leading-relaxed line-clamp-3 text-pretty">{desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/30">
                      <span>AEITCH ARCHIVES</span>
                      <span className="text-[#E9800A]">● MEMORY</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
