"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Layers,
  FileCode,
  MessageSquareQuote,
  Activity,
  Inbox,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Shield,
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // If on login page, render clean layout without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Services', href: '/admin/services', icon: Layers },
    { label: 'Case Studies', href: '/admin/case-studies', icon: FileCode },
    { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
    { label: 'Metrics', href: '/admin/metrics', icon: Activity },
    { label: 'Lead Inquiries', href: '/admin/inquiries', icon: Inbox },
  ];

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      router.push('/admin/login');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#000000] text-white selection:bg-[#e9800a] selection:text-black">
      {/* Mobile Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-white/10 bg-[#000000] px-4 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-[#e9800a] flex items-center justify-center font-mono font-black text-black text-xs">
            H
          </div>
          <span className="font-bold text-white tracking-wider">AEITCH CONSOLE</span>
        </div>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg border border-white/20 p-2 text-white"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10 bg-[#000000] flex flex-col justify-between p-5 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
            <Link href="/admin" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#e9800a] text-black font-black font-mono text-sm shadow-[0_0_15px_rgba(233,128,10,0.3)]">
                H
              </div>
              <div>
                <div className="font-black text-sm text-white tracking-wider">AEITCH</div>
                <div className="text-[10px] font-mono text-[#e9800a] tracking-widest uppercase">
                  Admin CMS
                </div>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#e9800a] text-black shadow-md'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: View Live Site & Logout */}
        <div className="pt-6 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-xl px-4 py-2.5 text-xs font-semibold text-white/70 transition-all hover:bg-white/10 hover:text-white"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-[#e9800a]" />
              View Live Website
            </span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold text-white/70 transition-all hover:bg-white/10 hover:text-[#e9800a] cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:pl-64 pt-16 lg:pt-0 min-h-screen bg-[#000000]">
        <div className="p-6 sm:p-10 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
