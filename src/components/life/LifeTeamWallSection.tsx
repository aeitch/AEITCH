'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n';
import { TEAM_MEMBERS, TeamMember } from '@/data/life/team';
import { PhotoRevealFrame } from './PhotoRevealFrame';

type FilterCategory = 'all' | 'ai' | 'product' | 'cloud' | 'software';

export const LifeTeamWallSection: React.FC = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);

  // Filter with consent enforcement
  const filteredMembers = TEAM_MEMBERS.filter((member) => {
    if (!member.consent) return false;
    if (activeCategory === 'all') return true;
    return member.category === activeCategory;
  });

  // Handle ESC key for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMember(null);
      }
    };
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalCloseBtnRef.current?.focus();
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMember]);

  const categories: { id: FilterCategory; labelAr: string; labelEn: string; count: number }[] = [
    {
      id: 'all',
      labelAr: 'جميع المهندسين',
      labelEn: 'All Engineers',
      count: TEAM_MEMBERS.filter((m) => m.consent).length,
    },
    {
      id: 'ai',
      labelAr: 'الذكاء الاصطناعي',
      labelEn: 'AI & Machine Learning',
      count: TEAM_MEMBERS.filter((m) => m.consent && m.category === 'ai').length,
    },
    {
      id: 'product',
      labelAr: 'تصميم وهندسة المنتجات',
      labelEn: 'Product & Design',
      count: TEAM_MEMBERS.filter((m) => m.consent && m.category === 'product').length,
    },
    {
      id: 'cloud',
      labelAr: 'السحابة وDevOps',
      labelEn: 'Cloud & DevOps',
      count: TEAM_MEMBERS.filter((m) => m.consent && m.category === 'cloud').length,
    },
    {
      id: 'software',
      labelAr: 'الأنظمة البرمجية',
      labelEn: 'Software Systems',
      count: TEAM_MEMBERS.filter((m) => m.consent && m.category === 'software').length,
    },
  ];

  return (
    <section
      id="team"
      className="relative w-full py-20 sm:py-24 lg:py-32 bg-[#0A0A0A] text-[#F5F5F3] border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono tracking-widest uppercase bg-white/5 border border-white/15 text-[#E9800A] mb-4">
              <span className="size-1.5 rounded-full bg-[#E9800A]" />
              <span>{isAr ? '03 // العقول الهندسية' : '03 // THE ENGINEERING CORE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-readex tracking-tight leading-[1.15] text-balance">
              {isAr ? (
                <>
                  من يبني أنظمتك <span className="text-[#E9800A]">كل يوم</span>
                </>
              ) : (
                <>
                  The People Architecting <span className="text-[#E9800A]">Your Platforms</span>
                </>
              )}
            </h2>
          </div>
          <p className="max-w-md text-sm md:text-base text-white/60 font-sans leading-relaxed text-pretty">
            {isAr
              ? 'فريق من النخبة الهندسية المتخصصة في بناء وتأمين المنظومات السيادية المعقدة. اضغط على أي بطاقة للتعرف على كواليس العمل.'
              : 'Elite builders focused on critical enterprise systems. Click any member to explore their craft, tools, and background.'}
          </p>
        </div>

        {/* Filter Chips Bar */}
        <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-10 sm:mb-12" role="tablist" aria-label="Team category filter">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs md:text-sm font-mono transition-all duration-200 border flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#E9800A] text-black border-[#E9800A] font-bold shadow-[0_0_20px_rgba(233,128,10,0.3)]'
                    : 'bg-white/[0.02] text-white/70 border-white/15 hover:border-white/40 hover:text-white'
                }`}
              >
                <span>{isAr ? cat.labelAr : cat.labelEn}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-none font-mono tabular-nums ${
                    isActive ? 'bg-black text-[#E9800A]' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Responsive Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          <AnimatePresence>
            {filteredMembers.map((member) => {
              const name = isAr ? member.nameAr : member.nameEn;
              const role = isAr ? member.roleAr : member.roleEn;
              const quote = isAr ? member.quoteAr : member.quoteEn;

              return (
                <motion.article
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  onClick={() => setSelectedMember(member)}
                  className="group relative bg-[#070707] border border-white/10 hover:border-[#E9800A]/60 transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
                >
                  {/* Photo area */}
                  <div className="relative w-full overflow-hidden bg-black">
                    <PhotoRevealFrame
                      src={member.image}
                      alt={name}
                      aspectRatio="3/4"
                      caption={role}
                      priority={false}
                    />
                    {/* Category tag */}
                    <div className="absolute top-2.5 end-2.5 z-20 pointer-events-none">
                      <span className="px-2 py-0.5 text-[10px] font-mono tracking-wider uppercase bg-black/80 backdrop-blur-md text-[#E9800A] border border-white/15">
                        {member.category}
                      </span>
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-white/10">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold font-readex text-white group-hover:text-[#E9800A] transition-colors leading-tight mb-1 text-balance">
                        {name}
                      </h3>
                      <p className="text-xs text-white/60 font-sans leading-snug mb-3">
                        {role}
                      </p>
                      <p className="text-xs text-white/80 font-sans italic line-clamp-2 border-s-2 border-white/20 ps-2.5 mb-3 group-hover:border-[#E9800A] transition-colors text-pretty">
                        &ldquo;{quote}&rdquo;
                      </p>
                    </div>

                    {/* Tool footer */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                      <span className="truncate">{member.favoriteTool}</span>
                      <span className="text-[#E9800A] opacity-0 group-hover:opacity-100 transition-opacity ps-2">
                        {isAr ? 'عرض ←' : '→'}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Morph Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-[#0C0C0C] border border-white/20 text-[#F5F5F3] shadow-2xl z-10"
            >
              {/* Header Bar */}
              <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-white/10 bg-[#0C0C0C]/95 backdrop-blur-md">
                <div className="flex items-center gap-2.5 text-xs font-mono text-white/50">
                  <span className="size-2 rounded-full bg-[#E9800A]" />
                  <span>AEITCH SQUAD DOSSIER // {selectedMember.id.toUpperCase()}</span>
                </div>
                <button
                  ref={modalCloseBtnRef}
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="size-8 rounded-none border border-white/20 hover:border-[#E9800A] hover:bg-[#E9800A] hover:text-black transition-colors flex items-center justify-center text-sm font-mono"
                  aria-label={isAr ? 'إغلاق النافذة' : 'Close modal'}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 sm:p-8">
                {/* Photo Side */}
                <div className="md:col-span-5 bg-black max-w-xs mx-auto md:max-w-none w-full">
                  <PhotoRevealFrame
                    src={selectedMember.image}
                    alt={isAr ? selectedMember.nameAr : selectedMember.nameEn}
                    aspectRatio="3/4"
                    priority={true}
                  />
                </div>

                {/* Details Side */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-5">
                  <div>
                    <div className="inline-block px-2 py-0.5 text-[10px] font-mono uppercase bg-[#E9800A]/10 text-[#E9800A] border border-[#E9800A]/30 mb-2">
                      {selectedMember.category.toUpperCase()}
                    </div>
                    <h3
                      id="member-modal-title"
                      className="text-2xl sm:text-3xl font-extrabold font-readex text-white leading-tight mb-1 text-balance"
                    >
                      {isAr ? selectedMember.nameAr : selectedMember.nameEn}
                    </h3>
                    <p className="text-sm font-mono text-white/60 mb-5">
                      {isAr ? selectedMember.roleAr : selectedMember.roleEn}
                    </p>

                    {/* Quote */}
                    <div className="border-s-2 border-[#E9800A] ps-4 py-1 mb-5">
                      <p className="text-sm sm:text-base text-white/90 font-sans italic leading-relaxed text-pretty">
                        &ldquo;{isAr ? selectedMember.quoteAr : selectedMember.quoteEn}&rdquo;
                      </p>
                    </div>

                    {/* Fun Fact */}
                    <div className="p-3.5 bg-white/[0.03] border border-white/10 mb-4">
                      <div className="text-[11px] font-mono text-[#E9800A] uppercase tracking-wider mb-1">
                        {isAr ? 'حقيقة شيقة ومميزة' : 'FUN FACT'}
                      </div>
                      <p className="text-xs sm:text-sm text-white/80 font-sans text-pretty">
                        {isAr ? selectedMember.funFactAr : selectedMember.funFactEn}
                      </p>
                    </div>

                    {/* Favorite Tool */}
                    <div className="flex items-center gap-3 text-xs font-mono text-white/60">
                      <span className="text-white/40 uppercase">{isAr ? 'الأدوات المفضلة:' : 'FAVORITE STACK:'}</span>
                      <span className="text-white font-semibold bg-white/5 px-2 py-1 border border-white/10">
                        {selectedMember.favoriteTool}
                      </span>
                    </div>
                  </div>

                  {/* Footer message */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/40">
                    <span>{isAr ? 'تم التحقق من الموافقة الهندسية ✓' : 'VERIFIED TEAM MEMBER ✓'}</span>
                    <span className="text-white/20">ESC TO CLOSE</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
