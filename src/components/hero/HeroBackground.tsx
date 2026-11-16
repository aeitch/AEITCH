import React, { useEffect, useRef } from 'react';
import type { StateTheme } from './heroContent';

interface HeroBackgroundProps {
  themes: StateTheme[];
  activeIndex: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({
  themes,
  activeIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const activeIndexRef = useRef(activeIndex);
  const prevActiveIndexRef = useRef<number>(activeIndex);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // IntersectionObserver to pause when off-screen and resume only active video
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const currentVideo = videoRefs.current[activeIndexRef.current];
          if (currentVideo && currentVideo.paused) {
            currentVideo.play().catch(() => {});
          }
        } else {
          videoRefs.current.forEach((video) => {
            if (video && !video.paused) {
              video.pause();
            }
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Smooth video transition: Start active video from 0, allow crossfade, pause inactive
  useEffect(() => {
    const newIndex = activeIndex;
    const prevIndex = prevActiveIndexRef.current;
    prevActiveIndexRef.current = newIndex;

    const newVideo = videoRefs.current[newIndex];
    const prevVideo = videoRefs.current[prevIndex];

    // Always start active video smoothly from beginning
    if (newVideo) {
      newVideo.currentTime = 0;
      newVideo.play().catch(() => {});
    }

    // Allow previous video to crossfade out over 700ms, then pause to free GPU resources
    let fadeTimer: NodeJS.Timeout | null = null;
    if (prevVideo && prevIndex !== newIndex) {
      fadeTimer = setTimeout(() => {
        try {
          if (activeIndexRef.current !== prevIndex) {
            prevVideo.pause();
            prevVideo.currentTime = 0;
          }
        } catch (_) {}
      }, 750);
    }

    // Ensure all other non-active, non-previous videos are paused
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== newIndex && idx !== prevIndex) {
        try {
          video.pause();
          video.currentTime = 0;
        } catch (_) {}
      }
    });

    return () => {
      if (fadeTimer) clearTimeout(fadeTimer);
    };
  }, [activeIndex]);

  const currentTheme = themes[activeIndex] ?? themes[0];

  return (
    <div
      ref={containerRef}
      className="framer-1jodj3k pointer-events-none z-[1] select-none"
      style={{
        aspectRatio: '0.75',
        mixBlendMode: 'screen',
      }}
    >
      {/* 4 Stacked Videos with Crossfade Transition */}
      <div
        className="framer-b66mxw-container absolute inset-0 w-full h-full"
        style={{
          aspectRatio: '0.750939',
          mixBlendMode: 'lighten',
        }}
      >
        {themes.map((theme, idx) => {
          const isActive = idx === activeIndex;
          return (
            <video
              key={theme.id}
              ref={(el) => {
                videoRefs.current[idx] = el;
              }}
              src={theme.videoSrc}
              loop
              muted
              playsInline
              preload="auto"
              onEnded={(e) => {
                const v = e.currentTarget;
                if (idx === activeIndexRef.current) {
                  v.currentTime = 0;
                  v.play().catch(() => {});
                }
              }}
              className="absolute inset-0 w-full h-full block object-fill bg-transparent transition-opacity duration-700 ease-in-out"
              style={{
                objectPosition: '50% 50%',
                opacity: isActive ? 1 : 0,
                pointerEvents: 'none',
                willChange: 'opacity',
                transform: 'translateZ(0)',
              }}
            />
          );
        })}
      </div>

      {/* Backlight Radial Gradient Layer (Crossfades per theme - rich visible flare on mobile & desktop) */}
      <div
        className="absolute pointer-events-none transition-all duration-700 ease-in-out -inset-10 tablet:-inset-14 desktop:inset-[-12%] z-0 overflow-visible"
        style={{
          background: `radial-gradient(50% 50% at 50% 50%, ${currentTheme.accentColor} 0%, rgba(0, 0, 0, 0) 75%)`,
          opacity: 0.58,
          filter: 'blur(26px)',
        }}
      >
        {/* White Inner Highlight - soft feathered core */}
        <div
          className="absolute inset-[20%] pointer-events-none rounded-full"
          style={{
            background: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.45) 0%, rgba(0, 0, 0, 0) 65%)',
            mixBlendMode: 'overlay',
            filter: 'blur(16px)',
          }}
        />
      </div>

      {/* Empty blending overlay layers */}
      <div
        className="framer-1bhekmh absolute top-0 bottom-[148px] left-[0.0769%] w-1/2 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="framer-janu9z absolute top-0 bottom-[148px] left-[50.0769%] w-1/2 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
};
