import React from 'react';

export function SdaiaCompliantBadge({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-xl border border-[#e9800a]/30 bg-[#000000] px-3.5 py-1.5 shadow-sm ${className}`}>
      <svg viewBox="0 0 28 28" className="h-5 w-5 text-[#e9800a]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SDAIA AI Compliant Icon">
        <circle cx="14" cy="14" r="12" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M14 6 V10 M14 18 V22 M6 14 H10 M18 14 H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="10" y="10" width="8" height="8" rx="2" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="14" cy="14" r="1.5" fill="currentColor" />
      </svg>
      <div className="flex flex-col text-start font-mono">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#e9800a]">SDAIA AI COMPLIANT</span>
        <span className="text-[8px] text-white/60 tracking-tight">In-Kingdom Bounded Models</span>
      </div>
    </div>
  );
}

export function PdplSovereigntyBadge({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-[#000000] px-3.5 py-1.5 shadow-sm ${className}`}>
      <svg viewBox="0 0 28 28" className="h-5 w-5 text-white" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="PDPL Class 3 Icon">
        <path d="M14 3 L23 7 V14 C23 20 19 24 14 26 C9 24 5 20 5 14 V7 L14 3 Z" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.1" />
        <ellipse cx="14" cy="11" rx="5" ry="2" stroke="#e9800a" strokeWidth="1.2" />
        <path d="M9 11 V16 C9 17.1 11.2 18 14 18 C16.8 18 19 17.1 19 16 V11" stroke="#e9800a" strokeWidth="1.2" />
      </svg>
      <div className="flex flex-col text-start font-mono">
        <span className="text-[10px] font-bold uppercase tracking-wider text-white">PDPL CLASS 3</span>
        <span className="text-[8px] text-white/60 tracking-tight">Sovereign Data Residency</span>
      </div>
    </div>
  );
}

export function NcaEccBadge({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 rounded-xl border border-[#e9800a]/40 bg-[#000000] px-3.5 py-1.5 shadow-sm ${className}`}>
      <svg viewBox="0 0 28 28" className="h-5 w-5 text-[#e9800a]" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="NCA ECC Icon">
        {/* Hexagonal cybersecurity fortress */}
        <polygon points="14,3 24,8.8 24,20.2 14,26 4,20.2 4,8.8" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 11 V14 H16.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
      <div className="flex flex-col text-start font-mono">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#e9800a]">NCA ECC-1:2018</span>
        <span className="text-[8px] text-white/60 tracking-tight">Enterprise Cybersecurity Architecture</span>
      </div>
    </div>
  );
}
