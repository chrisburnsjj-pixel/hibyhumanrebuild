import React, { useState } from 'react';
import { MessageSquare, Plus, Edit2, Trash2, Star, Check, Eye, EyeOff, Save, X } from 'lucide-react';
import { TestimonialItem } from '../../types/cms';
import { saveCollectionItem, deleteCollectionItem } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { ConfirmModal } from '../components/ConfirmModal';
import { ImageUploader } from '../components/ImageUploader';

export function TestimonialsEditor() {
  const { testimonials, refreshCMS } = useCMS();
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TestimonialItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialNew: TestimonialItem = {
    id: '',
    author: '',
    role: 'Founder & CEO',
    company: 'Company Ltd',
    quote: '',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    order: (testimonials?.length || 0) + 1,
    isActive: true,
  };

  const handleEdit = (item: TestimonialItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem({ ...initialNew, id: `test-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.author.trim() || !editingItem.quote.trim()) return;

    setIsSaving(true);
    try {
      await saveCollectionItem<TestimonialItem>('testimonials', editingItem.id, editingItem);
      await refreshCMS();
      setSuccessMessage('Testimonial saved successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert('Failed to save testimonial: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await deleteCollectionItem('testimonials', itemToDelete.id);
      await refreshCMS();
      setSuccessMessage('Testimonial removed.');
      setTimeout(() => setSuccessMessage(null), 3000);
      setItemToDelete(null);
    } catch (err: any) {
      alert('Failed to delete: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (t: TestimonialItem) => {
    try {
      await saveCollectionItem('testimonials', t.id, { ...t, isActive: !t.isActive });
      await refreshCMS();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span>Testimonials & Client Feedback</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage client reviews, verified satisfaction quotes, and client avatars.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingItem && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              {isCreating ? 'Add New Testimonial' : `Edit Testimonial: ${editingItem.author}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Client Name <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                value={editingItem.author}
                onChange={(e) => setEditingItem({ ...editingItem, author: e.target.value })}
                placeholder="e.g. Alistair MacLeod"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Designation</label>
              <input
                type="text"
                value={editingItem.role}
                onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                placeholder="Managing Director"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company</label>
              <input
                type="text"
                value={editingItem.company}
                onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                placeholder="Apex Global"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Client Quote / Feedback <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={3}
              required
              value={editingItem.quote}
              onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
              placeholder="What the client said about working with HiByHuman..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Star Rating (1 - 5)</label>
              <select
                value={editingItem.rating}
                onChange={(e) => setEditingItem({ ...editingItem, rating: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
              </select>
            </div>
            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="testimonial-active"
                checked={editingItem.isActive}
                onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
                className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
              />
              <label htmlFor="testimonial-active" className="text-xs font-medium text-slate-300 cursor-pointer">
                Publish on Website
              </label>
            </div>
          </div>

          <ImageUploader
            label="Client Avatar Photo (Optional)"
            value={editingItem.avatarUrl}
            onChange={(url) => setEditingItem({ ...editingItem, avatarUrl: url })}
            folder="testimonials-avatars"
            aspectRatioHint="Recommended: 1:1 square profile"
          />

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Testimonial'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Testimonials List */}
      <div className="space-y-3">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`p-4 rounded-2xl bg-slate-900 border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              t.isActive ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={
                  t.avatarUrl ||
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                }
                alt={t.author}
                className="w-11 h-11 rounded-full object-cover border border-cyan-500/40 shrink-0"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{t.author}</h3>
                  <span className="text-xs text-slate-400">
                    {t.role} • {t.company}
                  </span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-1 italic mt-0.5">"{t.quote}"</p>
                <div className="flex items-center gap-0.5 text-amber-400 text-xs mt-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleToggleActive(t)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                {t.isActive ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => handleEdit(t)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setItemToDelete(t)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(itemToDelete)}
        title="Delete Testimonial?"
        message={`Are you sure you want to delete review from "${itemToDelete?.author}"?`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
