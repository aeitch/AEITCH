import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-20" />
      <div className="pointer-events-none absolute h-64 w-64 rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 max-w-md">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-accent mb-4">
          <span>ERROR 404 // NOT FOUND</span>
        </div>

        <h1 className="text-6xl sm:text-8xl font-black tracking-tight text-white mb-4">
          404<span className="text-accent">.</span>
        </h1>

        <p className="text-base text-fg-muted mb-8 leading-relaxed">
          The requested system node or architectural document does not exist or has been relocated.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-accent-hover transition-colors shadow-glow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Command Center</span>
        </Link>
      </div>
    </div>
  );
}
