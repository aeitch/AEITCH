"use client";

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';

interface PolaroidItem {
  id: string;
  src: string;
  titleAr: string;
  titleEn: string;
  dateAr: string;
  dateEn: string;
  rotation: number;
  initialX: number;
  initialY: number;
}

const POLAROIDS: PolaroidItem[] = [
  {
    id: 'polaroid-1',
    src: '/life/hero/polaroid-1.svg',
    titleAr: 'مراجعة معمارية في إسلام آباد',
    titleEn: 'Sprint Architecture Review',
    dateAr: 'أكتوبر 2026',
    dateEn: 'Oct 2026',
    rotation: -4,
    initialX: -40,
    initialY: 20,
  },
  {
    id: 'polaroid-2',
    src: '/life/hero/polaroid-2.svg',
    titleAr: 'قمم كاراكورام الثلجية',
    titleEn: 'Passu Cones Summit',
    dateAr: 'يوليو 2025',
    dateEn: 'Jul 2025',
    rotation: 5,
    initialX: 50,
    initialY: -20,
  },
  {
    id: 'polaroid-3',
    src: '/life/hero/polaroid-3.svg',
    titleAr: 'جلسة شاي واستعراض كود الجمعة',
    titleEn: 'Friday Demos & Chai',
    dateAr: 'سبتمبر 2026',
    dateEn: 'Sep 2026',
    rotation: -3,
    initialX: -70,
    initialY: 60,
  },
  {
    id: 'polaroid-4',
    src: '/life/hero/polaroid-4.svg',
    titleAr: 'لحظة الإطلاق في الإنتاج',
    titleEn: 'Zero-Downtime Go-Live',
    dateAr: 'أغسطس 2026',
    dateEn: 'Aug 2026',
    rotation: 6,
    initialX: 75,
    initialY: 45,
  },
];

export function LifeHeroSection() {
  const { locale, direction } = useTranslation();
  const isAr = locale === 'ar';
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const parallaxX = useTransform(smoothX, [-500, 500], [-12, 12]);
  const parallaxY = useTransform(smoothY, [-500, 500], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Intro words for ligature-preserving reveal
  const introWordsAr = [
    'نبني', 'معمارية', 'سيادية', 'بمعايير', 'صارمة،',
    'ونعيش', 'بيئة', 'عمل', 'تسودها', 'الحرفة،',
    'الشفافية', 'المطلقة،', 'والروابط', 'الإنسانية', 'الصادقة.'
  ];

  const introWordsEn = [
    'We', 'engineer', 'mission-critical', 'systems', 'with', 'unflinching', 'rigor,',
    'while', 'nurturing', 'a', 'culture', 'anchored', 'in', 'authentic', 'camaraderie,',
    'extreme', 'ownership,', 'and', 'shared', 'adventures.'
  ];

  const words = isAr ? introWordsAr : introWordsEn;

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-[85dvh] lg:min-h-[90dvh] flex flex-col justify-between pt-20 sm:pt-24 pb-10 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-white/10 select-none bg-black"
      dir={direction}
    >
      {/* Background Architectural Grid */}
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-25" />
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 size-[380px] rounded-full bg-accent/5 blur-[140px]" />

      {/* Top Header Tag */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-accent mb-6 rounded-none">
          <span className="size-1.5 rounded-full bg-accent animate-pulse" />
          <span>{isAr ? 'كواليس إيتش • ثقافة الفريق' : 'INSIDE AEITCH • ENGINEERING CULTURE'}</span>
        </div>

        {/* Giant Typographic Title with Self-Drawing Underline on Key Word */}
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white font-readex leading-[0.98] mb-6 text-balance">
            {isAr ? (
              <>
                الحياة{' '}
                <span className="relative inline-block text-white">
                  في إيتش
                  {/* Self-drawing curved orange underline */}
                  <svg
                    className="absolute -bottom-2 sm:-bottom-4 start-0 w-full overflow-visible"
                    height="18"
                    viewBox="0 0 300 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M 5 14 Q 150 4 295 12"
                      stroke="#e9800a"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    />
                  </svg>
                </span>
              </>
            ) : (
              <>
                Life at{' '}
                <span className="relative inline-block text-white">
                  AEITCH
                  <svg
                    className="absolute -bottom-2 sm:-bottom-4 start-0 w-full overflow-visible"
                    height="18"
                    viewBox="0 0 300 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <motion.path
                      d="M 5 14 Q 150 4 295 12"
                      stroke="#e9800a"
                      strokeWidth="4"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                    />
                  </svg>
                </span>
              </>
            )}
          </h1>

          {/* Word-by-Word Intro Reveal (Ligature-Preserving) */}
          <div
            className={`text-base sm:text-xl lg:text-2xl text-fg-muted max-w-3xl leading-relaxed flex flex-wrap gap-x-2 gap-y-1 mt-6 text-pretty ${
              isAr ? 'font-arabic' : 'font-sans'
            }`}
          >
            {words.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden py-0.5">
                <motion.span
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.3 + idx * 0.03,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scattered Draggable Polaroid Cluster with Parallax & Responsive Coordinates */}
      <div className="relative z-20 my-8 max-w-7xl mx-auto w-full h-[320px] sm:h-[380px] overflow-hidden md:overflow-visible">
        <motion.div
          style={{ x: parallaxX, y: parallaxY }}
          className="relative w-full h-full"
        >
          {POLAROIDS.map((p, index) => {
            const title = isAr ? p.titleAr : p.titleEn;
            const date = isAr ? p.dateAr : p.dateEn;
            const initialX = isMobile ? p.initialX * 0.35 : p.initialX;
            const initialY = isMobile ? p.initialY * 0.4 : p.initialY;

            return (
              <motion.div
                key={p.id}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                whileHover={{ scale: 1.04, zIndex: 40 }}
                whileTap={{ scale: 0.98, cursor: 'grabbing' }}
                initial={{
                  x: initialX,
                  y: initialY,
                  rotate: p.rotation,
                  opacity: 0,
                  scale: 0.85,
                }}
                animate={{
                  x: initialX,
                  y: initialY,
                  rotate: p.rotation,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + index * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                data-cursor-type="drag"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none p-2.5 sm:p-3 pb-3 sm:pb-4 bg-[#141417] border border-white/20 shadow-2xl rounded-none w-48 sm:w-56 md:w-64 max-w-[85vw]"
                style={{
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 15px rgba(255, 255, 255, 0.05)',
                }}
              >
                {/* Polaroid Tape simulation at top */}
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-14 h-4 bg-white/10 backdrop-blur-sm border-x border-white/20 rotate-1 pointer-events-none" />

                {/* Photo frame */}
                <div className="relative aspect-[4/3] w-full bg-black overflow-hidden border border-white/10">
                  <Image
                    src={p.src}
                    alt={title}
                    fill
                    sizes="300px"
                    className="object-cover grayscale contrast-125 transition-transform duration-500 hover:grayscale-0 hover:scale-105"
                  />
                </div>

                {/* Handwritten-feel caption */}
                <div className="mt-2.5 flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-white/90 truncate max-w-[140px] text-balance">{title}</span>
                  <span className="text-accent text-[10px] shrink-0 tabular-nums">{date}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Bottom Scroll Cue */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-xs font-mono text-fg-subtle">
        <div className="flex items-center gap-2 text-white/60">
          <span className="size-1.5 rounded-full bg-accent" />
          <span>{isAr ? 'اسحب الصور للتفاعل • انزل للاستكشاف' : 'DRAG PHOTOS • SCROLL TO EXPLORE'}</span>
        </div>

        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 text-accent"
        >
          <span>{isAr ? 'التالي' : 'SCROLL'}</span>
          <ArrowDown className="size-3.5" />
        </motion.div>
      </div>
    </section>
  );
}
