"use client";

import React, { useState, useEffect } from 'react';
import { MessageSquareQuote, Plus, Trash2, Edit2, Save, X, Star } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    clientName: '',
    clientRole: '',
    clientCompany: '',
    avatarUrl: '',
    quote: '',
    rating: 5,
    verified: true,
    order: 0,
    isActive: true,
  });

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      setTestimonials(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleEdit = (t: any) => {
    setEditingId(t.id);
    setForm({
      clientName: t.clientName,
      clientRole: t.clientRole,
      clientCompany: t.clientCompany,
      avatarUrl: t.avatarUrl || '',
      quote: t.quote,
      rating: t.rating || 5,
      verified: t.verified,
      order: t.order,
      isActive: t.isActive,
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setForm({
      clientName: '',
      clientRole: 'Chief Technology Officer',
      clientCompany: '',
      avatarUrl: '',
      quote: '',
      rating: 5,
      verified: true,
      order: testimonials.length + 1,
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/testimonials/${editingId}` : '/api/admin/testimonials';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to save testimonial');
        return;
      }

      setIsEditing(false);
      fetchTestimonials();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Testimonials Management</h1>
          <p className="mt-1 text-sm text-[rgba(255,255,255,0.70)]">
            Manage verified client reviews and ratings.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#e9800a] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Testimonial
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="rounded-3xl border border-[#e9800a]/50 bg-[#000000] p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.15)] mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Testimonial' : 'Create Testimonial'}
            </h2>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="rounded-lg p-1.5 text-[rgba(255,255,255,0.60)] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Client Role
                </label>
                <input
                  type="text"
                  required
                  value={form.clientRole}
                  onChange={(e) => setForm({ ...form, clientRole: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Company
                </label>
                <input
                  type="text"
                  required
                  value={form.clientCompany}
                  onChange={(e) => setForm({ ...form, clientCompany: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                Client Quote / Feedback
              </label>
              <textarea
                required
                rows={3}
                value={form.quote}
                onChange={(e) => setForm({ ...form, quote: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-white focus:border-[#e9800a] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={form.avatarUrl}
                  onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">Rating</label>
                <select
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: parseInt(e.target.value, 10) || 5 })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                >
                  <option value={5}>5 Stars (Exceptional)</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.verified}
                  onChange={(e) => setForm({ ...form, verified: e.target.checked })}
                  className="h-4 w-4 rounded accent-[#e9800a]"
                />
                <span className="text-xs font-bold text-white">Verified Client</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded accent-[#e9800a]"
                />
                <span className="text-xs font-bold text-white">Published</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[rgba(255,255,255,0.15)]">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl border border-[rgba(255,255,255,0.15)] px-5 py-2 text-xs font-bold text-[rgba(255,255,255,0.70)] hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-6 py-2 text-xs font-bold text-black hover:bg-[#e9800a]"
              >
                <Save className="h-4 w-4" />
                Save Testimonial
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Testimonials Table */}
      <div className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[#000000] p-6 sm:p-8 shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-sm text-[rgba(255,255,255,0.60)]">Loading testimonials...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[rgba(255,255,255,0.80)]">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.60)] border-b border-[rgba(255,255,255,0.15)]">
                <tr>
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Quote</th>
                  <th className="pb-3 font-semibold">Rating</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.15)]/60">
                {testimonials.map((t) => (
                  <tr key={t.id} className="hover:bg-[rgba(255,255,255,0.08)]/50 transition-colors">
                    <td className="py-4 font-bold text-white">
                      <div>{t.clientName}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.60)] font-normal">
                        {t.clientRole}, {t.clientCompany}
                      </div>
                    </td>
                    <td className="py-4 text-xs text-[rgba(255,255,255,0.80)] max-w-md truncate">“{t.quote}”</td>
                    <td className="py-4">
                      <div className="flex items-center text-[#e9800a] gap-0.5">
                        {Array.from({ length: t.rating || 5 }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#e9800a]" />
                        ))}
                      </div>
                    </td>
                    <td className="py-4">
                      {t.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e9800a]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#e9800a] border border-[#e9800a]/30">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-2.5 py-0.5 text-[11px] font-bold text-neutral-400 border border-neutral-700">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(t)}
                        className="rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-2 text-white hover:border-[#e9800a] cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(t.id)}
                        className="rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-2 text-red-400 hover:border-red-500 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
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
