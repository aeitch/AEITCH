"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Mail, MapPin, Sparkles } from 'lucide-react';
import { BRAND, NAV_LINKS, SERVICE_LINKS } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md lg:hidden"
            aria-hidden="true"
          />

          {/* Slide-out Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[#000000] border-l border-white/15 p-6 shadow-2xl lg:hidden overflow-y-auto"
          >
            {/* Header with Brand & Close Button */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent p-0.5 shadow-glow-xs">
                  <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#000000]">
                    <span className="font-mono font-black text-accent text-base">H</span>
                  </div>
                </div>
                <span className="font-sans font-bold tracking-tight text-white text-lg">
                  AEITCH<span className="text-accent">.</span>
                </span>
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-[#000000] text-white/70 transition-colors hover:border-accent hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links Stagger */}
            <nav className="flex-1 py-6 space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <div key={link.name} className="space-y-1">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-accent/10 text-accent border border-accent/40'
                          : 'text-white/80 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className={`h-4 w-4 opacity-50 ${isActive ? 'text-accent opacity-100' : ''}`} />
                    </Link>

                    {/* Sublinks if Services */}
                    {link.name === 'Services' && (
                      <div className="pl-4 pr-1 py-1 space-y-1">
                        {SERVICE_LINKS.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={sub.href}
                            onClick={onClose}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-xs font-mono text-white/70 hover:bg-white/10 hover:text-accent transition-colors"
                          >
                            <span className="h-1 w-1 rounded-full bg-accent" />
                            <span>{sub.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Bottom Actions & CTA */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <Link href="/contact-us" onClick={onClose} className="block">
                <Button variant="glow" size="lg" className="w-full justify-center">
                  <Sparkles className="h-4 w-4 mr-1.5" />
                  Book Consultation
                </Button>
              </Link>

              {/* Status & Contact telemetry */}
              <div className="rounded-xl border border-white/15 bg-[#000000] p-3.5 space-y-2 text-xs text-white/70 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-white/50">SYSTEM STATUS</span>
                  <Badge variant="glow" size="sm" dot>
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                  <Mail className="h-3.5 w-3.5 text-accent" />
                  <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">
                    {BRAND.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-accent" />
                  <span>{BRAND.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
