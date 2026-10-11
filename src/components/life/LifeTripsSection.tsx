'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';
import { COMPANY_TRIPS } from '@/data/life/trips';
import { PhotoRevealFrame } from './PhotoRevealFrame';

export const LifeTripsSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Calculate total horizontal scroll distance
    const totalWidth = track.scrollWidth;
    const viewportWidth = window.innerWidth;
    const scrollDistance = totalWidth - viewportWidth;

    if (scrollDistance <= 0) return;

    // RTL vs LTR scroll translation
    const xEnd = isAr ? scrollDistance : -scrollDistance;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: xEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollDistance * 1.15}`,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile, isAr]);

  return (
    <section
      id="trips"
      ref={containerRef}
      className="relative w-full bg-[#070707] text-[#F5F5F3] border-b border-white/10 overflow-hidden overflow-x-clip"
    >
      {/* Top Banner Header inside pinned section */}
      <div className="pt-16 sm:pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
            <span className="size-1.5 rounded-full bg-[#E9800A]" />
            <span>{isAr ? '04 // رحلات الاستكشاف والمخيمات' : '04 // ANNUAL EXPEDITIONS'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
            {isAr ? (
              <>
                حيث تلتقي العمارة الهندسية <span className="text-[#E9800A]">بقمم الجبال</span>
              </>
            ) : (
              <>
                Where Architecture Meets <span className="text-[#E9800A]">The High Peaks</span>
              </>
            )}
          </h2>
        </div>
        <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
          {isAr
            ? 'رحلات برية وجبلية سنوية نبتعد فيها عن الشاشات لنفكر بعمق في المعماريات الموزعة، نختبر قدراتنا، ونعود بأفكار أكثر وضوحاً وبساطة.'
            : 'Annual high-altitude alpine retreats to unplug, test physical stamina, and architect breakthrough distributed systems.'}
        </p>
      </div>

      {/* Desktop Horizontal Scroll Track vs Mobile Swipeable Container */}
      {isMobile ? (
        // Mobile Layout: Clean vertical stacked cards
        <div className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-10 sm:gap-14 overflow-hidden">
          {COMPANY_TRIPS.map((trip) => {
            const place = isAr ? trip.placeAr : trip.placeEn;
            const badge = isAr ? trip.badgeAr : trip.badgeEn;
            const story = isAr ? trip.storyAr : trip.storyEn;

            return (
              <article
                key={trip.id}
                className="bg-[#0A0A0A] border border-white/10 p-5 sm:p-7 flex flex-col space-y-5"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <span className="text-3xl sm:text-4xl font-mono font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.4)] tabular-nums">
                    {trip.year}
                  </span>
                  <div className="flex items-center gap-2">
                    {trip.altitude && (
                      <span className="px-2 py-0.5 text-xs font-mono bg-white/5 border border-white/10 text-white/70 tabular-nums">
                        {trip.altitude}
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-xs font-mono bg-[#E9800A]/10 border border-[#E9800A]/30 text-[#E9800A]">
                      {badge}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-readex text-white mb-2 text-balance">{place}</h3>
                  <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed text-pretty">{story}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {trip.photos.map((photo, pIdx) => (
                    <div key={pIdx} className="w-full">
                      <PhotoRevealFrame
                        src={photo.src}
                        alt={isAr ? photo.captionAr : photo.captionEn}
                        aspectRatio={photo.aspect === '3:4' ? '3/4' : '1/1'}
                        caption={isAr ? photo.captionAr : photo.captionEn}
                      />
                    </div>
                  ))}
                </div>
              </article>
            );
          })}

          {/* Mobile Coming Soon Card */}
          <article className="bg-[#0A0A0A] border border-dashed border-[#E9800A]/40 p-5 sm:p-7 flex flex-col space-y-5 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-xs font-mono bg-[#E9800A]/15 border border-[#E9800A]/40 text-[#E9800A] font-bold">
                  {isAr ? 'قريباً // قيد التخطيط' : 'COMING SOON // PLANNING'}
                </span>
                <span className="text-xs font-mono text-white/40 tabular-nums">
                  CHAPTER 02
                </span>
              </div>
              <span className="px-2 py-0.5 text-xs font-mono bg-white/5 border border-white/10 text-white/60 tabular-nums">
                3,000M+
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-readex text-white mb-2 text-balance">
                {isAr ? 'رحلات استكشافية قادمة' : 'More Expeditions Coming Soon'}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed text-pretty">
                {isAr
                  ? 'نحضر لوجهتنا الجبلية القادمة لموسم 2026–2027. مسارات جبلية غير مطروقة، وتحديات برمجية جديدة تحت سماء النجوم.'
                  : 'Currently mapping our next high-altitude terrain for 2026–2027. Remote peaks, distributed architecture hackathons, and star-lit strategy sessions.'}
              </p>
            </div>

            <div className="py-8 px-4 border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center">
              <div className="size-14 rounded-full border border-dashed border-[#E9800A]/60 flex items-center justify-center mb-3">
                <Compass className="size-7 text-[#E9800A] animate-[spin_60s_linear_infinite]" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold mb-1">
                {isAr ? 'قمة جديدة في الأفق' : 'NEXT SUMMIT ON RADAR'}
              </span>
              <span className="font-mono text-[10px] text-white/40 tabular-nums">
                3,000M+ // TARGET ELEVATION
              </span>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
              <span>{isAr ? 'موسم 2026–2027' : 'SEASON 2026–2027'}</span>
              <span className="text-[#E9800A] animate-pulse">● RADAR ACTIVE</span>
            </div>
          </article>
        </div>
      ) : (
        // Desktop Pinned Horizontal Track
        <div className="relative h-[80vh] w-full flex items-center overflow-hidden overflow-x-clip">
          <div
            ref={trackRef}
            className="flex items-stretch gap-8 lg:gap-12 px-8 lg:px-12"
            style={{ width: 'max-content' }}
          >
            {COMPANY_TRIPS.map((trip, idx) => {
              const place = isAr ? trip.placeAr : trip.placeEn;
              const badge = isAr ? trip.badgeAr : trip.badgeEn;
              const story = isAr ? trip.storyAr : trip.storyEn;

              return (
                <div
                  key={trip.id}
                  className="w-[880px] lg:w-[1040px] max-w-[85vw] shrink-0 bg-[#0A0A0A] border border-white/15 p-6 lg:p-8 flex flex-col justify-between"
                >
                  {/* Top Bar with giant year */}
                  <div className="flex items-start justify-between border-b border-white/10 pb-5 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-2.5 py-0.5 text-xs font-mono bg-[#E9800A]/10 border border-[#E9800A]/30 text-[#E9800A]">
                          {badge}
                        </span>
                        {trip.altitude && (
                          <span className="px-2.5 py-0.5 text-xs font-mono bg-white/5 border border-white/10 text-white/60 tabular-nums">
                            ALT: {trip.altitude}
                          </span>
                        )}
                        <span className="text-xs font-mono text-white/40 tabular-nums">
                          CHAPTER 0{idx + 1}
                        </span>
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-extrabold font-readex text-white text-balance">
                        {place}
                      </h3>
                    </div>

                    <span className="text-5xl lg:text-6xl font-mono font-black text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.35)] select-none tabular-nums">
                      {trip.year}
                    </span>
                  </div>

                  {/* Story summary */}
                  <p className="text-sm lg:text-base text-white/75 font-sans leading-relaxed mb-6 border-s-2 border-[#E9800A] ps-4 text-pretty">
                    {story}
                  </p>

                  {/* 4 Parallax Photos in Responsive Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-end flex-1">
                    {trip.photos.map((photo, pIdx) => (
                      <div
                        key={pIdx}
                        className={`w-full transition-transform duration-300 ${
                          pIdx % 2 === 1 ? 'translate-y-2' : ''
                        }`}
                      >
                        <PhotoRevealFrame
                          src={photo.src}
                          alt={isAr ? photo.captionAr : photo.captionEn}
                          aspectRatio={photo.aspect === '3:4' ? '3/4' : '1/1'}
                          caption={isAr ? photo.captionAr : photo.captionEn}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Card bottom metric */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>{isAr ? 'توثيق أرشيف إيتش الاستكشافي' : 'AEITCH ARCHIVAL FIELD EXPEDITION'}</span>
                    <span className="text-[#E9800A]">● LOGGED</span>
                  </div>
                </div>
              );
            })}

            {/* Desktop Coming Soon Card */}
            <div className="w-[440px] lg:w-[480px] max-w-[85vw] shrink-0 bg-[#0A0A0A] border border-dashed border-[#E9800A]/40 p-6 lg:p-8 flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute -top-24 -end-24 size-48 rounded-full bg-[#E9800A]/5 blur-3xl pointer-events-none group-hover:bg-[#E9800A]/10 transition-colors duration-500" />
              
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-2.5 py-0.5 text-xs font-mono bg-[#E9800A]/15 border border-[#E9800A]/40 text-[#E9800A] font-bold">
                    {isAr ? 'قريباً // قيد التخطيط' : 'COMING SOON // PLANNING'}
                  </span>
                  <span className="text-xs font-mono text-white/40 tabular-nums">
                    CHAPTER 02
                  </span>
                </div>

                <h3 className="text-2xl lg:text-3xl font-extrabold font-readex text-white mb-3 text-balance">
                  {isAr ? 'رحلات استكشافية قادمة' : 'More Expeditions Coming Soon'}
                </h3>

                <p className="text-sm lg:text-base text-white/70 font-sans leading-relaxed mb-6 text-pretty">
                  {isAr
                    ? 'نحضر لوجهتنا الجبلية القادمة لموسم 2026–2027. مسارات جبلية غير مطروقة، وتحديات برمجية جديدة تحت سماء النجوم.'
                    : 'Currently mapping our next high-altitude terrain for 2026–2027. Remote peaks, distributed architecture hackathons, and star-lit strategy sessions.'}
                </p>
              </div>

              <div className="my-4 py-8 px-6 border border-white/10 bg-white/[0.02] flex flex-col items-center justify-center text-center relative">
                <div className="size-16 rounded-full border border-dashed border-[#E9800A]/60 flex items-center justify-center mb-3">
                  <Compass className="size-8 text-[#E9800A] animate-[spin_60s_linear_infinite]" />
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold mb-1">
                  {isAr ? 'قمة جديدة في الأفق' : 'NEXT SUMMIT ON RADAR'}
                </span>
                <span className="font-mono text-[11px] text-white/40 tabular-nums">
                  3,000M+ // TARGET ELEVATION
                </span>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                <span>{isAr ? 'موسم 2026–2027' : 'SEASON 2026–2027'}</span>
                <span className="text-[#E9800A] animate-pulse">● RADAR ACTIVE</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
