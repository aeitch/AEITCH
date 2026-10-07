"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [email, setEmail] = useState('admin@aeitch.com');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication failed');
      }

      router.push(from);
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-white/15 bg-[#000000] p-8 shadow-2xl">
      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/20 bg-white/5 p-4 text-xs font-semibold text-white">
          <AlertCircle className="h-5 w-5 text-[#e9800a] shrink-0" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            Administrator Email
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@aeitch.com"
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#e9800a] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">
            Secure Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full rounded-xl border border-white/20 bg-white/5 pl-11 pr-4 py-3 text-sm text-white placeholder-white/30 focus:border-[#e9800a] focus:outline-none"
            />
          </div>
          <p className="mt-2 text-[11px] text-white/60">
            Default seeded credentials: <span className="font-mono text-[#e9800a]">AeitchAdmin2026!</span>
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-[#e9800a] py-3.5 text-sm font-bold text-black transition-all hover:bg-white disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
        >
          {isLoading ? (
            <>Authenticating Session...</>
          ) : (
            <>
              Enter Admin Dashboard
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-white/10 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs text-white/60">
          <ShieldCheck className="h-4 w-4 text-[#e9800a]" />
          Edge Middleware & Web Crypto JWT Guard
        </span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#000000] p-4 text-white selection:bg-[#e9800a] selection:text-black">
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      >
        <div className="h-[400px] w-[400px] rounded-full bg-[#e9800a]/10 blur-[140px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#000000] text-[#e9800a] border border-[#e9800a]/30 mb-4 shadow-[0_0_20px_rgba(233,128,10,0.2)]">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AEITCH Control Console
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-white/70">
            Authenticated administrative access for CMS and inquiries.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="rounded-3xl border border-white/15 bg-[#000000] p-8 text-center text-sm text-white/60">
              Loading control console...
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
