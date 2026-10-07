"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useTranslation } from '@/lib/i18n';
import { viewportOnce } from '@/lib/motion';

export interface TestimonialData {
  id?: string;
  clientName: string;
  clientRole: string;
  clientCompany: string;
  avatarUrl?: string | null;
  quote: string;
  rating?: number;
  verified?: boolean;
  order?: number;
  isActive?: boolean;
}

export interface TestimonialsSectionProps {
  initialTestimonials?: TestimonialData[];
}

export function TestimonialsSection({ initialTestimonials }: TestimonialsSectionProps) {
  const { t, direction, locale } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(1);

  const testimonials = t.proof.testimonials;

  const handlePrev = () => {
    setSlideDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? (direction === 'rtl' ? -80 : 80) : direction === 'rtl' ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? (direction === 'rtl' ? 80 : -80) : direction === 'rtl' ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="relative pt-6 pb-28 bg-[#fafafa] text-zinc-900 border-b border-zinc-200 overflow-hidden" dir={direction}>
      {/* Background Subtle Tech Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f3f4f6_1px,transparent_1px),linear-gradient(to_bottom,#f3f4f6_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-70" />
      <div className="pointer-events-none absolute bottom-10 end-10 h-80 w-80 rounded-full bg-accent/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-accent mb-4 shadow-sm">
            <span>{locale === 'ar' ? 'آراء قادة التقنية' : 'Client Testimonials'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-4">
            {locale === 'ar' ? 'ماذا يقول شركاؤنا عن جودة أعمالنا؟' : 'Trusted by Regional Engineering Leaders'}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            {locale === 'ar'
              ? 'شهادات حقيقية من رؤساء التقنية ومؤسسي الشركات الذين وثقوا بـ إيتش لبناء أنظمتهم الحساسة.'
              : 'Verifiable feedback from CTOs and founders who partnered with AEITCH to engineer high-stakes platforms.'}
          </p>
        </motion.div>

        {/* Testimonials Carousel Card */}
        <div className="relative mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-8 sm:p-12 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)]">
            {/* Ambient Radial Spotlight */}
            <div className="pointer-events-none absolute -top-24 -end-24 h-64 w-64 rounded-full bg-accent/5 blur-3xl opacity-60" />

            <Quote className="h-12 w-12 text-accent/25 mb-6" />

            <div className="min-h-[140px] flex items-center">
              <AnimatePresence custom={slideDirection} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={slideDirection}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="text-lg sm:text-2xl font-medium text-zinc-900 leading-relaxed mb-8">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-zinc-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-950 text-base sm:text-lg">
                    {current.author}
                  </span>
                  <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-mono text-accent border border-zinc-200 font-semibold">
                    {locale === 'ar' ? 'عميل معتمد [REPLACE]' : 'Verified Client [REPLACE]'}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-500 mt-1">
                  {current.role} • <span className="text-zinc-700 font-semibold">{current.company}</span>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-accent hover:border-accent hover:bg-white active:scale-95 shadow-sm transition-all"
                >
                  {direction === 'rtl' ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <ChevronLeft className="h-5 w-5" />
                  )}
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-700 hover:text-accent hover:border-accent hover:bg-white active:scale-95 shadow-sm transition-all"
                >
                  {direction === 'rtl' ? (
                    <ChevronLeft className="h-5 w-5" />
                  ) : (
                    <ChevronRight className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
