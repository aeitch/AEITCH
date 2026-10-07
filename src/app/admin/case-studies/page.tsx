"use client";

import React, { useState, useEffect } from 'react';
import { FileCode, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

export default function AdminCaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    slug: '',
    clientName: '',
    clientIndustry: '',
    type: 'CASE_STUDY',
    summary: '',
    challenge: '',
    solution: '',
    results: [{ metric: '', label: '' }],
    techStack: [''],
    coverImage: '',
    liveUrl: '',
    order: 0,
    isFeatured: true,
    isActive: true,
  });

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/case-studies');
      const data = await res.json();
      setCaseStudies(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleEdit = (cs: any) => {
    setEditingId(cs.id);
    const parsedResults =
      typeof cs.results === 'string' ? JSON.parse(cs.results) : cs.results;
    const parsedStack =
      typeof cs.techStack === 'string' ? JSON.parse(cs.techStack) : cs.techStack;

    setForm({
      title: cs.title,
      slug: cs.slug,
      clientName: cs.clientName,
      clientIndustry: cs.clientIndustry,
      type: cs.type || 'CASE_STUDY',
      summary: cs.summary,
      challenge: cs.challenge,
      solution: cs.solution,
      results: Array.isArray(parsedResults) ? parsedResults : [{ metric: '', label: '' }],
      techStack: Array.isArray(parsedStack) ? parsedStack : [''],
      coverImage: cs.coverImage || '',
      liveUrl: cs.liveUrl || '',
      order: cs.order,
      isFeatured: cs.isFeatured,
      isActive: cs.isActive,
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      clientName: '',
      clientIndustry: 'FinTech',
      type: 'CASE_STUDY',
      summary: '',
      challenge: '',
      solution: '',
      results: [
        { metric: '99.9%', label: 'Uptime' },
        { metric: '10x', label: 'Throughput' },
      ],
      techStack: ['Next.js', 'PostgreSQL', 'Docker'],
      coverImage: '',
      liveUrl: '',
      order: caseStudies.length + 1,
      isFeatured: false,
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCaseStudies((prev) => prev.filter((c) => c.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/case-studies/${editingId}` : '/api/admin/case-studies';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to save case study');
        return;
      }

      setIsEditing(false);
      fetchCaseStudies();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Case Studies & MVPs</h1>
          <p className="mt-1 text-sm text-[rgba(255,255,255,0.70)]">
            Manage enterprise client results and venture showcase stories.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#e9800a] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Case Study
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="rounded-3xl border border-[#e9800a]/50 bg-[#000000] p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.15)] mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Case Study' : 'Create Case Study'}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
            </div>

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
                  Industry
                </label>
                <input
                  type="text"
                  required
                  value={form.clientIndustry}
                  onChange={(e) => setForm({ ...form, clientIndustry: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                >
                  <option value="CASE_STUDY">Case Study</option>
                  <option value="MVP_SHOWCASE">MVP Showcase</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">Summary</label>
              <textarea
                required
                rows={2}
                value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-white focus:border-[#e9800a] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  The Challenge
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.challenge}
                  onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  The Solution
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.solution}
                  onChange={(e) => setForm({ ...form, solution: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="h-4 w-4 rounded accent-[#e9800a]"
                />
                <span className="text-xs font-bold text-white">Featured on Homepage</span>
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
                Save Case Study
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Case Studies Table */}
      <div className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[#000000] p-6 sm:p-8 shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-sm text-[rgba(255,255,255,0.60)]">Loading case studies...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[rgba(255,255,255,0.80)]">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.60)] border-b border-[rgba(255,255,255,0.15)]">
                <tr>
                  <th className="pb-3 font-semibold">Client</th>
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Type</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.15)]/60">
                {caseStudies.map((cs) => (
                  <tr key={cs.id} className="hover:bg-[rgba(255,255,255,0.08)]/50 transition-colors">
                    <td className="py-4 font-bold text-white">
                      <div>{cs.clientName}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.60)] font-normal">{cs.clientIndustry}</div>
                    </td>
                    <td className="py-4 font-semibold text-white max-w-sm truncate">{cs.title}</td>
                    <td className="py-4 font-mono text-xs text-[#e9800a]">{cs.type}</td>
                    <td className="py-4">
                      {cs.isActive ? (
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
                        onClick={() => handleEdit(cs)}
                        className="rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-2 text-white hover:border-[#e9800a] cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(cs.id)}
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
