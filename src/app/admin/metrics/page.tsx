"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

export default function AdminMetricsPage() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    label: '',
    value: '',
    prefix: '',
    suffix: '',
    description: '',
    icon: 'ShieldCheck',
    order: 0,
    isActive: true,
  });

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/metrics');
      const data = await res.json();
      setMetrics(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleEdit = (m: any) => {
    setEditingId(m.id);
    setForm({
      label: m.label,
      value: m.value,
      prefix: m.prefix || '',
      suffix: m.suffix || '',
      description: m.description || '',
      icon: m.icon || 'ShieldCheck',
      order: m.order,
      isActive: m.isActive,
    });
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setEditingId(null);
    setForm({
      label: '',
      value: '100',
      prefix: '',
      suffix: '%',
      description: '',
      icon: 'ShieldCheck',
      order: metrics.length + 1,
      isActive: true,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this metric?')) return;
    try {
      const res = await fetch(`/api/admin/metrics/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMetrics((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/admin/metrics/${editingId}` : '/api/admin/metrics';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || 'Failed to save metric');
        return;
      }

      setIsEditing(false);
      fetchMetrics();
    } catch (err) {
      console.error('Save failed:', err);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Homepage Metrics & Statistics</h1>
          <p className="mt-1 text-sm text-[rgba(255,255,255,0.70)]">
            Update live counters rendered on the homepage in real time.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#e9800a] px-5 py-2.5 text-xs sm:text-sm font-bold text-black transition-all hover:bg-[#e9800a] cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          Add Metric
        </button>
      </div>

      {/* Editor Modal */}
      {isEditing && (
        <div className="rounded-3xl border border-[#e9800a]/50 bg-[#000000] p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-[rgba(255,255,255,0.15)] mb-6">
            <h2 className="text-xl font-bold text-white">
              {editingId ? 'Edit Metric Counter' : 'Create Metric Counter'}
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
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Metric Label
                </label>
                <input
                  type="text"
                  required
                  value={form.label}
                  onChange={(e) => setForm({ ...form, label: e.target.value })}
                  placeholder="Years of Experience"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Display Value (Numeric)
                </label>
                <input
                  type="text"
                  required
                  value={form.value}
                  onChange={(e) => setForm({ ...form, value: e.target.value })}
                  placeholder="6"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm font-mono text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Prefix (Optional)
                </label>
                <input
                  type="text"
                  value={form.prefix}
                  onChange={(e) => setForm({ ...form, prefix: e.target.value })}
                  placeholder="e.g. $"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                  Suffix (Optional)
                </label>
                <input
                  type="text"
                  value={form.suffix}
                  onChange={(e) => setForm({ ...form, suffix: e.target.value })}
                  placeholder="e.g. + or %"
                  className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] px-4 py-2.5 text-sm text-white focus:border-[#e9800a] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-[rgba(255,255,255,0.70)] mb-1">
                Description (Optional)
              </label>
              <textarea
                rows={2}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-3 text-sm text-white focus:border-[#e9800a] focus:outline-none"
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
                <span className="text-xs font-bold text-white">Active on Homepage</span>
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
                Save Metric
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Metrics Table */}
      <div className="rounded-3xl border border-[rgba(255,255,255,0.15)] bg-[#000000] p-6 sm:p-8 shadow-xl">
        {loading ? (
          <div className="py-12 text-center text-sm text-[rgba(255,255,255,0.60)]">Loading metrics...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[rgba(255,255,255,0.80)]">
              <thead className="text-[11px] font-mono uppercase tracking-wider text-[rgba(255,255,255,0.60)] border-b border-[rgba(255,255,255,0.15)]">
                <tr>
                  <th className="pb-3 font-semibold">Order</th>
                  <th className="pb-3 font-semibold">Label</th>
                  <th className="pb-3 font-semibold">Preview Value</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(255,255,255,0.15)]/60">
                {metrics.map((m) => (
                  <tr key={m.id} className="hover:bg-[rgba(255,255,255,0.08)]/50 transition-colors">
                    <td className="py-4 font-mono text-xs text-[rgba(255,255,255,0.60)]">{m.order}</td>
                    <td className="py-4 font-bold text-white">
                      <div>{m.label}</div>
                      <div className="text-xs text-[rgba(255,255,255,0.60)] font-normal">{m.description}</div>
                    </td>
                    <td className="py-4 font-mono text-lg font-black text-[#e9800a]">
                      {m.prefix}
                      {m.value}
                      {m.suffix}
                    </td>
                    <td className="py-4">
                      {m.isActive ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#e9800a]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#e9800a] border border-[#e9800a]/30">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-neutral-800 px-2.5 py-0.5 text-[11px] font-bold text-neutral-400 border border-neutral-700">
                          Hidden
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(m)}
                        className="rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.05)] p-2 text-white hover:border-[#e9800a] cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(m.id)}
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
