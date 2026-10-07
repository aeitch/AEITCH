"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  FileCode,
  MessageSquareQuote,
  Activity,
  Inbox,
  ArrowRight,
  Clock,
  Mail,
  Building,
  CheckCircle,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    servicesCount: 0,
    caseStudiesCount: 0,
    testimonialsCount: 0,
    inquiriesCount: 0,
    newInquiriesCount: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [svcRes, csRes, tRes, inqRes] = await Promise.all([
        fetch('/api/admin/services'),
        fetch('/api/admin/case-studies'),
        fetch('/api/admin/testimonials'),
        fetch('/api/admin/inquiries?limit=8'),
      ]);

      const [svcData, csData, tData, inqData] = await Promise.all([
        svcRes.json(),
        csRes.json(),
        tRes.json(),
        inqRes.json(),
      ]);

      const inquiries = inqData.data || [];
      const newCount = inquiries.filter((i: any) => i.status === 'NEW').length;

      setStats({
        servicesCount: svcData.data?.length || 0,
        caseStudiesCount: csData.data?.length || 0,
        testimonialsCount: tData.data?.length || 0,
        inquiriesCount: inqData.pagination?.total || inquiries.length,
        newInquiriesCount: newCount,
      });

      setRecentInquiries(inquiries);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRecentInquiries((prev) =>
          prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
        );
      }
    } catch (err) {
      console.error('Failed to update inquiry status:', err);
    }
  };

  const statCards = [
    {
      label: 'Live Services',
      count: stats.servicesCount,
      href: '/admin/services',
      icon: Layers,
      color: 'text-[#e9800a]',
    },
    {
      label: 'Case Studies',
      count: stats.caseStudiesCount,
      href: '/admin/case-studies',
      icon: FileCode,
      color: 'text-[#e9800a]',
    },
    {
      label: 'Testimonials',
      count: stats.testimonialsCount,
      href: '/admin/testimonials',
      icon: MessageSquareQuote,
      color: 'text-white',
    },
    {
      label: 'Pending Inquiries',
      count: stats.newInquiriesCount,
      total: stats.inquiriesCount,
      href: '/admin/inquiries',
      icon: Inbox,
      color: 'text-[#e9800a]',
    },
  ];

  return (
    <div className="space-y-10">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight">System Overview</h1>
        <p className="mt-1 text-sm text-white/70">
          Live telemetry, content management, and client inquiry status.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link key={card.label} href={card.href} className="block group">
              <div className="rounded-2xl border border-white/15 bg-[#000000] p-6 transition-all duration-300 hover:border-[#e9800a]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 border border-white/15 text-[#e9800a]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white" />
                </div>
                <div className="font-mono text-3xl font-black text-white">{card.count}</div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-white/70">
                  {card.label}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inquiries Inbox */}
      <div className="rounded-3xl border border-white/15 bg-[#000000] p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">Recent Consultation & Lead Inquiries</h2>
            <p className="text-xs text-white/70 mt-0.5">
              Client requests submitted through public forms.
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#e9800a] hover:underline"
          >
            View All Inquiries
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-sm text-white/60">Loading recent inquiries...</div>
        ) : recentInquiries.length === 0 ? (
          <div className="py-12 text-center text-sm text-white/60">
            No client inquiries received yet. Submit a test inquiry on the Contact page.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-white/60 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-semibold">Client Name</th>
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Meeting Window</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-4 font-bold text-white">
                      <div>{inq.name}</div>
                      <div className="text-xs font-mono text-white/60 font-normal">{inq.email}</div>
                    </td>
                    <td className="py-4 text-xs font-mono text-[#e9800a]">
                      {inq.serviceRequested || 'General Scope'}
                    </td>
                    <td className="py-4 text-xs text-white/70">
                      {inq.meetingDate ? (
                        <span className="font-mono">
                          {inq.meetingDate} ({inq.meetingTime})
                        </span>
                      ) : (
                        <span className="text-white/40">Direct Scope Brief</span>
                      )}
                    </td>
                    <td className="py-4">
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`rounded-lg px-2.5 py-1 text-xs font-bold font-mono border focus:outline-none ${
                          inq.status === 'NEW'
                            ? 'bg-[#e9800a]/20 text-[#e9800a] border-[#e9800a]/50'
                            : inq.status === 'CONVERTED'
                            ? 'bg-white/20 text-white border-white/40'
                            : 'bg-white/5 text-white/70 border-white/15'
                        }`}
                      >
                        <option value="NEW" className="bg-[#000000] text-white">NEW</option>
                        <option value="CONTACTED" className="bg-[#000000] text-white">CONTACTED</option>
                        <option value="IN_DISCUSSION" className="bg-[#000000] text-white">IN_DISCUSSION</option>
                        <option value="CONVERTED" className="bg-[#000000] text-white">CONVERTED</option>
                        <option value="ARCHIVED" className="bg-[#000000] text-white">ARCHIVED</option>
                      </select>
                    </td>
                    <td className="py-4 text-right">
                      <Link
                        href={`/admin/inquiries?view=${inq.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:border-[#e9800a] hover:text-[#e9800a]"
                      >
                        <Eye className="h-3.5 w-3.5 text-[#e9800a]" />
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
