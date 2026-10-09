'use client';

import React, { useRef, useState } from 'react';
import { useLanguage } from '@/lib/i18n';

export const LifeJoinCtaSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [btnPos, setBtnPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.2;
    const distanceY = (e.clientY - centerY) * 0.2;
    setBtnPos({ x: distanceX, y: distanceY });
  };

  const handleMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  return (
    <section
      id="join"
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#0A0A0A] text-[#F5F5F3] overflow-hidden"
    >
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#E9800A_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#070707] border border-white/15 p-6 sm:p-10 lg:p-16 relative overflow-hidden">
          {/* Subtle Orange Glow in corner */}
          <div className="absolute -top-32 -end-32 size-80 bg-[#E9800A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-14">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-5">
                <span className="size-1.5 rounded-full bg-[#E9800A] animate-ping" />
                <span>{isAr ? '09 // انضم إلى النواة الهندسية' : '09 // JOIN THE SQUAD'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight text-white mb-5 leading-[1.15] text-balance">
                {isAr ? (
                  <>
                    هل تبني أنظمة تصمد، <br />
                    أم تكتفي <span className="text-[#E9800A]">بالمظاهر؟</span>
                  </>
                ) : (
                  <>
                    Do You Build to Endure, <br />
                    or Just for <span className="text-[#E9800A]">The Hype?</span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-white/70 font-sans leading-relaxed mb-8 text-pretty">
                {isAr
                  ? 'نبحث دائماً عن مهندسين غير تقليديين يفضلون الدقة المعمارية، ويحبون حل معضلات التزامن وقواعد البيانات، ويشاركوننا شغف الرحلات والابتكار.'
                  : 'We are constantly searching for extraordinary minds who appreciate architectural rigor, relish concurrency puzzles, and thrive in ambitious environments.'}
              </p>

              {/* Monospace Bullet points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono text-white/60">
                <div className="flex items-center gap-2">
                  <span className="text-[#E9800A]">✓</span>
                  <span>{isAr ? 'ثقافة عمل خالية من السياسة والبيروقراطية' : 'Zero-politics, craft-first culture'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#E9800A]">✓</span>
                  <span>{isAr ? 'رحلات سنوية ومعسكرات برمجية ميدانية' : 'Annual alpine expeditions & hackathons'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#E9800A]">✓</span>
                  <span>{isAr ? 'ساعات مخصصة للبحث والابتكار الحر' : 'Dedicated weekly R&D sandbox time'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#E9800A]">✓</span>
                  <span>{isAr ? 'أحدث العتاد وأفضل الأدوات المتاحة' : 'Top-tier hardware and tooling budget'}</span>
                </div>
              </div>
            </div>

            {/* Right: Rotating Badge & Magnetic Button */}
            <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-auto">
              {/* Rotating Circular Text Badge */}
              <div className="relative size-28 sm:size-36 mb-6 flex items-center justify-center select-none pointer-events-none">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full animate-[spin_20s_linear_infinite]"
                >
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[8.5px] font-mono tracking-[2px] uppercase fill-white/60">
                    <textPath href="#circlePath">
                      {isAr
                        ? ' • انضم إلى إيتش • اصنع المستقبل • هندسة سيادية'
                        : ' • JOIN AEITCH • ARCHITECT TOMORROW • BUILD'}
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl sm:text-2xl text-[#E9800A]">✦</span>
                </div>
              </div>

              {/* Magnetic Button */}
              <a
                ref={buttonRef}
                href="mailto:careers@aeitch.com"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
                  transition: btnPos.x === 0 ? 'transform 0.4s ease-out' : 'none',
                }}
                className="group relative inline-flex items-center justify-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 bg-[#E9800A] text-black font-readex font-bold text-base sm:text-lg hover:bg-[#ff9520] transition-colors shadow-[0_0_30px_rgba(233,128,10,0.4)]"
              >
                <span>{isAr ? 'تواصل مع فريق المواهب' : 'Apply to Careers'}</span>
                <span className="font-mono text-sm group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                  {isAr ? '←' : '→'}
                </span>
              </a>

              <span className="mt-3 text-[11px] font-mono text-white/40 tracking-wider">
                careers@aeitch.com
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
