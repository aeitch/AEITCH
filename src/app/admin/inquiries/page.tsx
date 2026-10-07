"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Inbox,
  Clock,
  Calendar,
  Mail,
  Building,
  DollarSign,
  MessageSquare,
  Shield,
  Trash2,
  CheckCircle,
  X,
  Save,
  Filter,
} from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState<any | null>(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const url =
        statusFilter === 'ALL'
          ? '/api/admin/inquiries?limit=100'
          : `/api/admin/inquiries?status=${statusFilter}&limit=100`;
      const res = await fetch(url);
      const data = await res.json();
      setInquiries(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleOpenDetails = (inq: any) => {
    setSelectedInquiry(inq);
    setNotes(inq.notes || '');
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry?.id === id) {
          setSelectedInquiry((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error('Status change error:', err);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedInquiry) return;
    try {
      setSavingNotes(true);
      const res = await fetch(`/api/admin/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === selectedInquiry.id ? { ...i, notes } : i))
        );
        setSelectedInquiry((prev: any) => ({ ...prev, notes }));
        alert('Notes updated successfully');
      }
    } catch (err) {
      console.error('Save notes error:', err);
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries((prev) => prev.filter((i) => i.id !== id));
        if (selectedInquiry?.id === id) {
          setSelectedInquiry(null);
        }
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Lead Inquiries & CRM</h1>
          <p className="mt-1 text-sm text-[rgba(255,255,255,0.70)]">
            Track, qualify, and convert consultation requests and client scoping briefs.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 rounded-xl bg-[#000000] p-1.5 border border-[rgba(255,255,255,0.15)]">
          {['ALL', 'NEW', 'CONTACTED', 'IN_DISCUSSION', 'CONVERTED', 'ARCHIVED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold font-mono transition-all ${
                statusFilter === st
                  ? 'bg-[#e9800a] text-black shadow-sm'
                  : 'text-[rgba(255,255,255,0.70)] hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table & Details Slide-in */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Column */}
        <div className={`${selectedInquiry ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          <div className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[#000000] p-6 shadow-xl">
            {loading ? (
              <div className="py-12 text-center text-sm text-[rgba(255,255,255,0.60)]">Loading inquiries...</div>
            ) : inquiries.length === 0 ? (
              <div className="py-12 text-center text-sm text-[rgba(255,255,255,0.60)]">
                No inquiries matching the selected filter.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-[rgba(255,255,255,0.80)]">
                  <thead className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.60)] border-b border-[rgba(255,255,255,0.15)]">
                    <tr>
                      <th className="pb-3 font-semibold">Lead</th>
                      <th className="pb-3 font-semibold">Service & Budget</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(255,255,255,0.15)]/60">
                    {inquiries.map((inq) => {
                      const isSelected = selectedInquiry?.id === inq.id;
                      return (
                        <tr
                          key={inq.id}
                          className={`transition-colors cursor-pointer ${
                            isSelected ? 'bg-[#e9800a]/10' : 'hover:bg-[rgba(255,255,255,0.08)]/50'
                          }`}
                          onClick={() => handleOpenDetails(inq)}
                        >
                          <td className="py-4 font-bold text-white">
                            <div>{inq.name}</div>
                            <div className="text-xs font-mono text-[rgba(255,255,255,0.60)] font-normal truncate max-w-[180px]">
                              {inq.email}
                            </div>
                          </td>
                          <td className="py-4 text-xs">
                            <div className="font-mono text-[#e9800a]">
                              {inq.serviceRequested || 'General'}
                            </div>
                            <div className="text-[rgba(255,255,255,0.60)]">{inq.budgetRange || 'Unspecified'}</div>
                          </td>
                          <td className="py-4" onClick={(e) => e.stopPropagation()}>
                            <select
                              value={inq.status}
                              onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-bold font-mono border focus:outline-none ${
                                inq.status === 'NEW'
                                  ? 'bg-amber-500/20 text-[#e9800a] border-amber-500/40'
                                  : inq.status === 'CONTACTED'
                                  ? 'bg-white/10 text-white/80 border-white/20'
                                  : inq.status === 'CONVERTED'
                                  ? 'bg-white/20 text-white border-white/40'
                                  : 'bg-neutral-800 text-neutral-400 border-neutral-700'
                              }`}
                            >
                              <option value="NEW">NEW</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="IN_DISCUSSION">IN_DISCUSSION</option>
                              <option value="CONVERTED">CONVERTED</option>
                              <option value="ARCHIVED">ARCHIVED</option>
                            </select>
                          </td>
                          <td className="py-4 text-right" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleDelete(inq.id)}
                              className="rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-2 text-red-400 hover:border-red-500"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Details Column */}
        {selectedInquiry && (
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[#e9800a]/50 bg-[#000000] p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.15)]">
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedInquiry.name}</h3>
                  <p className="text-xs font-mono text-[#e9800a] mt-0.5">
                    {selectedInquiry.email}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded-lg p-1.5 text-[rgba(255,255,255,0.60)] hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Lead Attributes */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)]">
                  <span className="text-[rgba(255,255,255,0.60)] block mb-1">Company:</span>
                  <span className="font-semibold text-white">
                    {selectedInquiry.company || 'Not provided'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)]">
                  <span className="text-[rgba(255,255,255,0.60)] block mb-1">Service:</span>
                  <span className="font-mono font-semibold text-[#e9800a]">
                    {selectedInquiry.serviceRequested || 'General'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)]">
                  <span className="text-[rgba(255,255,255,0.60)] block mb-1">Budget:</span>
                  <span className="font-semibold text-white">
                    {selectedInquiry.budgetRange || 'Unspecified'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.15)]">
                  <span className="text-[rgba(255,255,255,0.60)] block mb-1">Timeline:</span>
                  <span className="font-semibold text-white">
                    {selectedInquiry.timeline || 'Unspecified'}
                  </span>
                </div>
              </div>

              {selectedInquiry.meetingDate && (
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-[#e9800a] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-white block">Consultation Scheduled</span>
                    <span className="font-mono text-[#e9800a]">
                      {selectedInquiry.meetingDate} at {selectedInquiry.meetingTime}
                    </span>
                  </div>
                </div>
              )}

              {/* Client Brief Message */}
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-2">
                  Client Project Scope / Message
                </label>
                <div className="rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-4 text-xs sm:text-sm text-[#e1e7f2] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Private Admin Notes */}
              <div>
                <label className="block text-xs font-bold uppercase text-[#e9800a] mb-2">
                  Internal Engineering Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record call summary, scoping notes, next steps..."
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-xs text-white focus:border-[#e9800a] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={savingNotes}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#e9800a] px-4 py-2 text-xs font-bold text-black hover:bg-[#e9800a] cursor-pointer"
                >
                  <Save className="h-3.5 w-3.5" />
                  {savingNotes ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
