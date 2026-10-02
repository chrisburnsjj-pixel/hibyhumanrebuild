import React, { useState } from 'react';
import { Users, Plus, Edit2, Trash2, Check, Eye, EyeOff, Save, X } from 'lucide-react';
import { TeamMemberItem } from '../../types/cms';
import { saveCollectionItem, deleteCollectionItem, DEFAULT_TEAM_MEMBERS } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { ConfirmModal } from '../components/ConfirmModal';
import { ImageUploader } from '../components/ImageUploader';

export function TeamEditor() {
  const { team, refreshCMS } = useCMS();
  const [editingItem, setEditingItem] = useState<TeamMemberItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<TeamMemberItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialNew: TeamMemberItem = {
    id: '',
    name: '',
    designation: 'Creative Technologist',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: '',
    linkedInUrl: 'https://linkedin.com',
    order: (team?.length || 0) + 1,
    isActive: true,
  };

  const handleEdit = (item: TeamMemberItem) => {
    setEditingItem({ ...item });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingItem({ ...initialNew, id: `team-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    setIsSaving(true);
    try {
      await saveCollectionItem<TeamMemberItem>('team', editingItem.id, editingItem);
      await refreshCMS();
      setSuccessMessage('Team member saved!');
      setTimeout(() => setSuccessMessage(null), 3000);
      setEditingItem(null);
      setIsCreating(false);
    } catch (err: any) {
      alert('Failed to save team member: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await deleteCollectionItem('team', itemToDelete.id);
      await refreshCMS();
      setSuccessMessage('Team member removed.');
      setTimeout(() => setSuccessMessage(null), 3000);
      setItemToDelete(null);
    } catch (err: any) {
      alert('Failed to delete: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (m: TeamMemberItem) => {
    try {
      await saveCollectionItem('team', m.id, { ...m, isActive: !m.isActive });
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
            <Users className="w-5 h-5 text-cyan-400" />
            <span>Studio Team Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage studio directors, engineers, designers, and creative leads.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {editingItem && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              {isCreating ? 'Add Team Member' : `Edit: ${editingItem.name}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                placeholder="Christopher Burns"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Designation / Role</label>
              <input
                type="text"
                value={editingItem.designation}
                onChange={(e) => setEditingItem({ ...editingItem, designation: e.target.value })}
                placeholder="Founder & Technical Director"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio / Profile Narrative</label>
            <textarea
              rows={3}
              value={editingItem.bio}
              onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
              placeholder="Background, specialization, and creative impact..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <ImageUploader
            label="Profile Headshot"
            value={editingItem.profileImage}
            onChange={(url) => setEditingItem({ ...editingItem, profileImage: url })}
            folder="team-photos"
            aspectRatioHint="Recommended: 3:4 portrait or square"
          />

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">LinkedIn Profile URL</label>
            <input
              type="text"
              value={editingItem.linkedInUrl || ''}
              onChange={(e) => setEditingItem({ ...editingItem, linkedInUrl: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="team-active"
              checked={editingItem.isActive}
              onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
            />
            <label htmlFor="team-active" className="text-xs font-medium text-slate-300 cursor-pointer">
              Active on Studio Roster
            </label>
          </div>

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
              <span>{isSaving ? 'Saving...' : 'Save Member'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Team Roster List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {team.map((m) => (
          <div
            key={m.id}
            className={`p-4 rounded-2xl bg-slate-900 border transition flex items-center justify-between gap-4 ${
              m.isActive ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={m.profileImage}
                alt={m.name}
                className="w-12 h-12 rounded-xl object-cover border border-cyan-500/30 shrink-0"
              />
              <div>
                <h3 className="text-sm font-bold text-white">{m.name}</h3>
                <p className="text-xs text-cyan-400 font-mono">{m.designation}</p>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{m.bio}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => handleToggleActive(m)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                {m.isActive ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => handleEdit(m)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setItemToDelete(m)}
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
        title="Delete Team Member?"
        message={`Are you sure you want to remove "${itemToDelete?.name}"?`}
        confirmText="Remove"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
