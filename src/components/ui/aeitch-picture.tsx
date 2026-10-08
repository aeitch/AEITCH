"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Image as ImageIcon } from 'lucide-react';

export interface AeitchPictureProps {
  /** Relative or absolute asset path (e.g. /images/aeitch-hero-mockup.svg) */
  src: string;
  /** Accessible alternative text */
  alt: string;
  /** Width for aspect ratio calculation */
  width?: number;
  /** Height for aspect ratio calculation */
  height?: number;
  /** Aspect ratio class (e.g. aspect-video, aspect-[16/10], aspect-square) */
  aspectRatioClass?: string;
  /** Optional badge label indicating purpose */
  badgeLabel?: string;
  /** Additional container classes */
  className?: string;
  /** Priority loading for LCP images */
  priority?: boolean;
  /** Whether to show the replacement tag indicator */
  showReplacementTag?: boolean;
}

/**
 * AeitchPicture Component
 * 
 * High-performance, zero-CLS picture element supporting WebP, SVG, and raster formats.
 * Designed with a strict 3-color palette (#000000, #ffffff, #e9800a) and clear
 * hook attributes (`data-aeitch-asset`) for instant replacement with assets from aeitch.com.
 */
export function AeitchPicture({
  src,
  alt,
  width = 800,
  height = 480,
  aspectRatioClass = "aspect-[16/10]",
  badgeLabel,
  className = "",
  priority = false,
  showReplacementTag = false,
}: AeitchPictureProps) {
  const [hasError, setHasError] = useState(false);
  const assetName = src.split('/').pop() || src;

  return (
    <div
      data-aeitch-asset={assetName}
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-[#000000] shadow-md transition-all duration-300 hover:border-accent hover:shadow-[0_8px_25px_rgba(233,128,10,0.2)] ${aspectRatioClass} ${className}`}
    >
      {/* Background Radiance On Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      >
        <div className="absolute inset-0 bg-radial-accent opacity-15" />
      </div>

      {/* Main Image Slot */}
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          onError={() => setHasError(true)}
          className="h-full w-full object-cover object-center transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center bg-[#000000] text-white">
          <ImageIcon className="size-10 text-accent mb-3" />
          <p className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
            AEITCH Media Asset
          </p>
          <p className="mt-1 text-xs text-white/70 max-w-xs">{alt}</p>
          <span className="mt-3 rounded border border-white/20 px-2 py-0.5 font-mono text-[10px] text-white/50">
            Path: {src}
          </span>
        </div>
      )}

      {/* Optional Top Badge */}
      {badgeLabel && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-black bg-[#000000]/90 px-3 py-1 font-mono text-[11px] font-bold tracking-wider text-accent backdrop-blur-md shadow-sm">
            <Sparkles className="size-3 text-accent" />
            {badgeLabel}
          </span>
        </div>
      )}

      {/* Media Asset Tag (visible on hover) */}
      {showReplacementTag && (
        <div className="absolute bottom-2 right-2 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none">
          <span className="inline-block rounded-md bg-[#000000]/90 border border-accent/40 px-2 py-1 font-mono text-[10px] text-accent backdrop-blur-sm">
            Asset: {assetName}
          </span>
        </div>
      )}
    </div>
  );
}
