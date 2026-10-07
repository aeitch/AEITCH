"use client";

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  ExternalLink,
  Save,
  X,
  AlertCircle,
} from 'lucide-react';
import { RadialGlowCard } from '@/components/ui/radial-glow-card';

export default function AdminServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [form, setForm] = useState({
    title: '',
    slug: '',
    tagline: '',
    category: 'Engineering',
    description: '',
    fullContent: '',
    icon: 'Layers',
    features: [''],
    techStack: [''],
    order: 0,
    isActive: true,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      setServices(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (svc: any) => {
    setEditingId(svc.id);
    const parsedFeatures =
      typeof svc.features === 'string' ? JSON.parse(svc.features) : svc.features;
    const parsedStack =
      typeof svc.techStack === 'string' ? JSON.parse(svc.techStack) : svc.techStack;

    setForm({
      title: svc.title,
      slug: svc.slug,
      tagline: svc.tagline,
      category: svc.category,
      description: svc.description,
      fullContent: svc.fullContent,
      icon: svc.icon,
      features: Array.isArray(parsedFeatures) ? parsedFeatures : [''],
      techStack: Array.isArray(parsedStack) ? parsedStack : [''],
      order: svc.order,
      isActive: svc.isActive,
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setForm({
      title: '',
      slug: '',
      tagline: '',
      category: 'Engineering',
      description: '',
      fullContent: '',
      icon: 'Layers',
      features: ['Feature item 1'],
      techStack: ['TypeScript', 'Next.js'],
      order: services.length + 1,
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setServices((prev) => prev.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/services/${editingId}` : '/api/admin/services';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to save service');
        return;
      }

      setIsEditing(false);
      fetchServices();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Services Management</h1>
          <p className="mt-1 text-sm text-[rgba(255,255,255,0.70)]">
            Create, edit, and organize core service offerings.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#e9800a] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add New Service
        </button>
      </div>

      {/* Editor Modal / Panel */}
      {isEditing && (
        <div className="rounded-3xl border border-[#e9800a]/50 bg-[#000000] p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.15)] mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Service' : 'Create New Service'}
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
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Slug (URL path)
                </label>
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">Tagline</label>
              <input
                type="text"
                required
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                Description
              </label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-white focus:border-[#e9800a] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                Full Markdown Content
              </label>
              <textarea
                required
                rows={4}
                value={form.fullContent}
                onChange={(e) => setForm({ ...form, fullContent: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm font-mono text-white focus:border-[#e9800a] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded accent-[#e9800a]"
                />
                <span className="text-xs font-bold text-white">Active / Published</span>
              </label>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[rgba(255,255,255,0.70)]">Sort Order:</span>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: parseInt(e.target.value, 10) || 0 })}
                  className="w-20 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-3 py-1.5 text-xs text-white"
                />
              </div>
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
                Save Service
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services List Table */}
      <div className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[#000000] p-6 sm:p-8 shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-sm text-[rgba(255,255,255,0.60)]">Loading services...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[rgba(255,255,255,0.80)]">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.60)] border-b border-[rgba(255,255,255,0.15)]">
                <tr>
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Title</th>
                  <th className="pb-3 font-semibold">Slug</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.15)]/60">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-[rgba(255,255,255,0.08)]/50 transition-colors">
                    <td className="py-4 font-mono text-xs text-[rgba(255,255,255,0.60)]">{svc.order}</td>
                    <td className="py-4 font-bold text-white">
                      <div>{svc.title}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.60)] font-normal truncate max-w-sm">
                        {svc.tagline}
                      </div>
                    </td>
                    <td className="py-4 font-mono text-xs text-[#e9800a]">/services/{svc.slug}</td>
                    <td className="py-4">
                      {svc.isActive ? (
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
                        onClick={() => handleEdit(svc)}
                        className="rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-2 text-white hover:border-[#e9800a] cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(svc.id)}
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
