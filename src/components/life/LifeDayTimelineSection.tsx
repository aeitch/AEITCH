'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/lib/i18n';

interface TimelineStep {
  time: string;
  stageAr: string;
  stageEn: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  tools: string[];
}

const TIMELINE_STEPS: TimelineStep[] = [
  {
    time: '08:30',
    stageAr: 'المرحلة 01',
    stageEn: 'STAGE 01',
    titleAr: 'قهوة الصباح وجلسة المزامنة الهندسية',
    titleEn: 'Dawn Coffee & Architectural Sync',
    descAr: 'نبدأ اليوم بوقفة سريعة (10 دقائق) نركز فيها على إزالة العوائق، تدقيق أهداف النشر لليوم، وتنسيق التبعيات بين المهندسين.',
    descEn: 'A crisp 10-minute standup strictly focused on unblocking bottlenecks, production deployment milestones, and cross-squad dependencies.',
    tools: ['Slack', 'Linear', 'Kashmiri Chai'],
  },
  {
    time: '11:00',
    stageAr: 'المرحلة 02',
    stageEn: 'STAGE 02',
    titleAr: 'ساعات التركيز العميق وبناء النوى السيادية',
    titleEn: 'Deep Focus & Sovereign Systems Core',
    descAr: 'فترة عمل خالية تماماً من الاجتماعات؛ كتابة شيفرات Rust وGo وNext.js، وتصميم استعلامات قواعد البيانات ذات زمن الاستجابة الفائق.',
    descEn: 'Zero meetings allowed. Headphones on, uninterrupted deep coding in Rust, Go, and Next.js, optimizing millisecond database pipelines.',
    tools: ['Neovim', 'Go', 'Rust', 'PostgreSQL'],
  },
  {
    time: '14:30',
    stageAr: 'المرحلة 03',
    stageEn: 'STAGE 03',
    titleAr: 'مراجعة الكود المقدسة والنقد المعماري الصريح',
    titleEn: 'Sacred PR Ritual & Architectural Candor',
    descAr: 'مراجعة كل سطر برمجي بتمعن؛ فحص ثغرات الأمان، التأكد من توافق البنية مع معايير الحوسبة السحابية السعودية، وتمرير اختبارات الأداء.',
    descEn: 'Rigorous peer pull request review. Auditing for zero-trust security postures, KSA cloud sovereignty controls, and automated test coverage.',
    tools: ['GitHub', 'ArgoCD', 'Trivy', 'OpenTelemetry'],
  },
  {
    time: '17:00',
    stageAr: 'المرحلة 04',
    stageEn: 'STAGE 04',
    titleAr: 'تجارب الذكاء الاصطناعي الحرة وحوارات الغد',
    titleEn: 'Sandboxed AI Research & Evening Debrief',
    descAr: 'ساعة للابتكار الحر؛ تجربة أحدث أوراق RAG ونماذج التوليد المتقدمة، تلخيص الدروس المستفادة، وتجهيز خطة الغد بثقة وهدوء.',
    descEn: 'Creative sandbox hour exploring newly released research papers and open source tools, logging telemetry, and preparing tomorrow’s roadmap.',
    tools: ['PyTorch', 'LangGraph', 'Obsidian'],
  },
];

export const LifeDayTimelineSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [activeStep, setActiveStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const elements = containerRef.current.querySelectorAll('.timeline-step-block');
      const viewportCenter = window.innerHeight * 0.45;

      elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
          setActiveStep(idx);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="day"
      ref={containerRef}
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#070707] text-[#F5F5F3] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 sm:mb-18 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
              <span className="size-1.5 rounded-full bg-[#E9800A]" />
              <span>{isAr ? '06 // إيقاع اليوم' : '06 // DAILY RHYTHM'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
              {isAr ? (
                <>
                  يوم في حياة <span className="text-[#E9800A]">مهندس إيتش</span>
                </>
              ) : (
                <>
                  A Day in the Life <span className="text-[#E9800A]">of an Engineer</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
            {isAr
              ? 'لا نؤمن بالاجتماعات الطويلة أو الفوضى؛ يومنا مصمم بعناية ليحمي طاقة المهندس الإبداعية ويمنحه مساحة حقيقية للإنجاز.'
              : 'Zero useless meetings, zero chaotic firefighting. A deliberately calibrated daily tempo honoring deep engineering flow.'}
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Guide Line (Centered on mobile at left-6/sm:left-8, desktop at left-1/2) */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-8 md:left-1/2 w-px bg-white/10 -translate-x-1/2 pointer-events-none" />

          {/* Stepper Blocks */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {TIMELINE_STEPS.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeStep === idx;
              const title = isAr ? step.titleAr : step.titleEn;
              const desc = isAr ? step.descAr : step.descEn;
              const stage = isAr ? step.stageAr : step.stageEn;

              return (
                <div
                  key={idx}
                  className={`timeline-step-block relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } gap-6 md:gap-14 ps-14 sm:ps-18 md:ps-0`}
                >
                  {/* Central Node Circle */}
                  <div
                    className={`absolute left-6 sm:left-8 md:left-1/2 -translate-x-1/2 size-9 sm:size-10 rounded-none border flex items-center justify-center transition-all duration-200 z-20 ${
                      isActive
                        ? 'bg-[#E9800A] text-black border-[#E9800A] shadow-[0_0_20px_rgba(233,128,10,0.5)]'
                        : 'bg-[#070707] text-white/40 border-white/20'
                    }`}
                  >
                    <span className="text-xs font-mono font-bold tabular-nums">{idx + 1}</span>
                  </div>

                  {/* Card Content (Occupies half width on desktop) */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`p-5 sm:p-7 bg-[#0A0A0A] border transition-all duration-200 ${
                        isActive
                          ? 'border-[#E9800A]/60 shadow-[0_0_30px_rgba(233,128,10,0.05)]'
                          : 'border-white/10 hover:border-white/25'
                      }`}
                    >
                      {/* Top bar with time */}
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                        <span className="text-lg sm:text-xl font-mono font-bold text-[#E9800A] tabular-nums">
                          {step.time}
                        </span>
                        <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
                          {stage}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-readex text-white mb-2 text-balance">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed mb-4 text-pretty">
                        {desc}
                      </p>

                      {/* Tool pills */}
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-white/5">
                        {step.tools.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 text-[10px] sm:text-[11px] font-mono bg-white/5 text-white/60 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Empty Spacer on opposite desktop side */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
