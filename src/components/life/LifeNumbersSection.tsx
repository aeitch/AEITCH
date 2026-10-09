'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';

interface StatMetric {
  id: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  titleAr: string;
  titleEn: string;
  detailAr: string;
  detailEn: string;
}

const STATS_DATA: StatMetric[] = [
  {
    id: 'stat-zero',
    targetValue: 0,
    prefix: '',
    suffix: '',
    titleAr: 'توقف تشغيلي غير مخطط له',
    titleEn: 'Unplanned Outages Over 3 Min',
    detailAr: 'معمارية بنية تحتية مقاومة للأعطال مع مراقبة استباقية بالذكاء الاصطناعي.',
    detailEn: 'Zero tolerance for downtime. Automated canary deployments and self-healing pods.',
  },
  {
    id: 'stat-sovereign',
    targetValue: 100,
    prefix: '',
    suffix: '%',
    titleAr: 'ملكية سيادية كاملة للعميل',
    titleEn: 'Sovereign Code Ownership',
    detailAr: 'تسليم كامل لكافة الأكواد والمستودعات دون أي قفل احتكاري للمورد.',
    detailEn: 'Full repository, infrastructure, and pipeline transfer with zero vendor lock-in.',
  },
  {
    id: 'stat-altitude',
    targetValue: 2800,
    prefix: '',
    suffix: 'm',
    titleAr: 'أعلى ارتفاع لهاكاثون جبلي',
    titleEn: 'Highest Hackathon Altitude',
    detailAr: 'معسكرات برمجية ميدانية في أعالي قمم كاراكورام وسكردو.',
    detailEn: 'High-altitude sprints testing physical endurance and radical focus.',
  },
  {
    id: 'stat-latency',
    targetValue: 4,
    prefix: '<',
    suffix: 'ms',
    titleAr: 'متوسط زمن استجابة الاستعلامات',
    titleEn: 'Optimized Query Latency',
    detailAr: 'هندسة قواعد بيانات فائقة السرعة تلبي أقصى متطلبات المؤسسات.',
    detailEn: 'Hand-tuned SQL indices and Redis caching delivering sub-millisecond execution.',
  },
];

export const LifeNumbersSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    'stat-zero': 0,
    'stat-sovereign': 0,
    'stat-altitude': 0,
    'stat-latency': 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          STATS_DATA.forEach((stat) => {
            if (stat.targetValue === 0) {
              setCounts((prev) => ({ ...prev, [stat.id]: 0 }));
              return;
            }

            const duration = 1600;
            const startTime = performance.now();

            const update = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // easeOutExpo
              const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
              const current = Math.round(eased * stat.targetValue);

              setCounts((prev) => ({ ...prev, [stat.id]: current }));

              if (progress < 1) {
                requestAnimationFrame(update);
              }
            };

            requestAnimationFrame(update);
          });
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section
      id="numbers"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#0A0A0A] text-[#F5F5F3] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
              <span className="size-1.5 rounded-full bg-[#E9800A]" />
              <span>{isAr ? '07 // أرقام وإحصائيات' : '07 // BY THE NUMBERS'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
              {isAr ? (
                <>
                  ثقافتنا بالأرقام <span className="text-[#E9800A]">والحقائق</span>
                </>
              ) : (
                <>
                  Our Culture in <span className="text-[#E9800A]">Hard Numbers</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
            {isAr
              ? 'مؤشرات أداء ملموسة تثبت انضباطنا الهندسي وتفاني الفريق في بناء معمارية تصمد في وجه الواقع.'
              : 'Verifiable operational indicators capturing our engineering discipline and high-altitude endurance.'}
          </p>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STATS_DATA.map((stat) => {
            const title = isAr ? stat.titleAr : stat.titleEn;
            const detail = isAr ? stat.detailAr : stat.detailEn;
            const value = counts[stat.id];

            return (
              <div
                key={stat.id}
                className="bg-[#070707] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#E9800A]/50 transition-colors"
              >
                <div>
                  {/* Giant numeral */}
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-mono font-black text-[#E9800A] leading-none mb-4 sm:mb-6 flex items-baseline tabular-nums">
                    {stat.prefix && <span className="text-2xl text-white/50 me-1">{stat.prefix}</span>}
                    <span>{value.toLocaleString()}</span>
                    {stat.suffix && <span className="text-3xl text-white/50 ms-1">{stat.suffix}</span>}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-readex text-white mb-2 leading-tight text-balance">
                    {title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed text-pretty">
                    {detail}
                  </p>
                </div>

                <div className="mt-6 sm:mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/30">
                  <span>METRIC VERIFIED</span>
                  <span className="text-[#E9800A]">✓</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
