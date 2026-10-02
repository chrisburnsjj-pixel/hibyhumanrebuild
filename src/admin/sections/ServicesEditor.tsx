import React, { useState } from 'react';
import {
  Code2,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Check,
  Eye,
  EyeOff,
  Save,
  X,
  Sparkles,
} from 'lucide-react';
import { ServiceItem } from '../../types/cms';
import {
  saveCollectionItem,
  deleteCollectionItem,
  batchReorderItems,
} from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { ConfirmModal } from '../components/ConfirmModal';

export function ServicesEditor() {
  const { services, refreshCMS } = useCMS();
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ServiceItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialNewService: ServiceItem = {
    id: '',
    title: '',
    tagline: '',
    description: '',
    category: 'Engineering',
    iconName: 'Code2',
    buttonText: 'Scope This Service (50% Off)',
    buttonUrl: '#packages',
    highlights: ['Bespoke Architecture', '100% Code Ownership', '30-Day Support'],
    order: (services?.length || 0) + 1,
    isActive: true,
  };

  const handleEdit = (item: ServiceItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem({ ...initialNewService, id: `service-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim()) return;

    setIsSaving(true);
    try {
      await saveCollectionItem<ServiceItem>('services', editingItem.id, editingItem);
      await refreshCMS();
      setSuccessMessage(`Service "${editingItem.title}" saved successfully!`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert('Failed to save service: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await deleteCollectionItem('services', itemToDelete.id);
      await refreshCMS();
      setSuccessMessage(`Service deleted.`);
      setTimeout(() => setSuccessMessage(null), 3000);
      setItemToDelete(null);
    } catch (err: any) {
      alert('Failed to delete service: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (item: ServiceItem) => {
    try {
      const updated = { ...item, isActive: !item.isActive };
      await saveCollectionItem('services', item.id, updated);
      await refreshCMS();
    } catch (err: any) {
      console.error('Failed to toggle status:', err);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === services.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const list = [...services];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const reordered = list.map((item, idx) => ({ id: item.id, order: idx + 1 }));
    try {
      await batchReorderItems('services', reordered);
      await refreshCMS();
    } catch (err) {
      console.error('Failed to reorder:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <span>Services Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, update, reorder, or toggle active services displayed across the interactive Services Arc.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Item Edit/Create Drawer/Form */}
      {editingItem && (
        <form
          onSubmit={handleSaveItem}
          className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>{isCreating ? 'Create New Service' : `Editing: ${editingItem.title}`}</span>
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Service Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                placeholder="e.g. Interactive Web Design"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={editingItem.category}
                onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                placeholder="Design / Engineering / Marketing"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Tagline</label>
              <input
                type="text"
                value={editingItem.tagline}
                onChange={(e) => setEditingItem({ ...editingItem, tagline: e.target.value })}
                placeholder="Short benefit hook"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Lucide Icon Name</label>
              <input
                type="text"
                value={editingItem.iconName || 'Code2'}
                onChange={(e) => setEditingItem({ ...editingItem, iconName: e.target.value })}
                placeholder="Code2, Layout, Smartphone, Sparkles..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
            <textarea
              rows={3}
              value={editingItem.description}
              onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
              placeholder="What this service delivers..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Button Text</label>
              <input
                type="text"
                value={editingItem.buttonText}
                onChange={(e) => setEditingItem({ ...editingItem, buttonText: e.target.value })}
                placeholder="Scope This Service (50% Off)"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Button URL / Hash</label>
              <input
                type="text"
                value={editingItem.buttonUrl}
                onChange={(e) => setEditingItem({ ...editingItem, buttonUrl: e.target.value })}
                placeholder="#packages"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Key Deliverables / Highlights (Comma separated)
            </label>
            <input
              type="text"
              value={editingItem.highlights.join(', ')}
              onChange={(e) =>
                setEditingItem({
                  ...editingItem,
                  highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="100% Bespoke, Full IP Ownership, 30-Day Warranty"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          {/* Active status */}
          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="service-active"
              checked={editingItem.isActive}
              onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
            />
            <label htmlFor="service-active" className="text-xs font-medium text-slate-300 cursor-pointer">
              Active & Published on Live Website
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Service'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Services List Table / Cards */}
      <div className="space-y-3">
        {services.map((item, index) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl bg-slate-900 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.isActive ? 'border-slate-800' : 'border-slate-800/50 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-30 transition cursor-pointer"
                  title="Move Up"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={index === services.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 disabled:opacity-30 transition cursor-pointer"
                  title="Move Down"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <div className="w-9 h-9 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                #{index + 1}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                    {item.category}
                  </span>
                  {!item.isActive && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      Draft / Inactive
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleToggleActive(item)}
                className={`p-2 rounded-xl text-xs border transition cursor-pointer ${
                  item.isActive
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20'
                    : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                }`}
                title={item.isActive ? 'Active on site' : 'Hidden from site'}
              >
                {item.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleEdit(item)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:bg-slate-700 transition cursor-pointer"
                title="Edit Service"
              >
                <Edit2 className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setItemToDelete(item)}
                className="p-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-red-400 hover:bg-slate-700 transition cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(itemToDelete)}
        title="Delete Service?"
        message={`Are you sure you want to delete "${itemToDelete?.title}"? This cannot be undone.`}
        confirmText="Delete Service"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
