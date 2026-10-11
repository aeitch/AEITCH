"use client";

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppWidget } from '@/components/ui/whatsapp-widget';
import { SiteCustomCursor } from '@/components/ui/site-custom-cursor';
import { ScrollProgressBar } from '@/components/ui/scroll-progress-bar';

export function MainSiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [isAdmin, pathname]);

  if (isAdmin) {
    return <main className="flex-1 min-h-screen bg-[#000000] text-white">{children}</main>;
  }

  return (
    <>
      <ScrollProgressBar />
      <SiteCustomCursor />
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppWidget />
      <Footer />
    </>
  );
}
