import React, { useState } from 'react';
import {
  Briefcase,
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
  ExternalLink,
} from 'lucide-react';
import { ProjectItem } from '../../types/cms';
import {
  saveCollectionItem,
  deleteCollectionItem,
  batchReorderItems,
} from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { ConfirmModal } from '../components/ConfirmModal';
import { ImageUploader } from '../components/ImageUploader';

export function PortfolioEditor() {
  const { projects, refreshCMS } = useCMS();
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ProjectItem | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const initialNewProject: ProjectItem = {
    id: '',
    title: '',
    client: 'Client Name',
    year: '2026',
    category: 'Web Application',
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    projectUrl: 'https://',
    techStack: ['React', 'TypeScript', 'Tailwind CSS'],
    deliverables: ['UI/UX Design', 'Full-Stack Development'],
    order: (projects?.length || 0) + 1,
    isActive: true,
  };

  const handleEdit = (p: ProjectItem) => {
    setEditingProject({ ...p });
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setEditingProject({ ...initialNewProject, id: `project-${Date.now()}` });
    setIsCreating(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) return;

    setIsSaving(true);
    try {
      await saveCollectionItem<ProjectItem>('projects', editingProject.id, editingProject);
      await refreshCMS();
      setSuccessMessage(`Project "${editingProject.title}" saved!`);
      setTimeout(() => setSuccessMessage(null), 4000);
      setEditingProject(null);
      setIsCreating(false);
    } catch (err: any) {
      alert('Failed to save project: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!itemToDelete) return;
    setIsSaving(true);
    try {
      await deleteCollectionItem('projects', itemToDelete.id);
      await refreshCMS();
      setSuccessMessage('Project removed.');
      setTimeout(() => setSuccessMessage(null), 3000);
      setItemToDelete(null);
    } catch (err: any) {
      alert('Failed to delete project: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (p: ProjectItem) => {
    try {
      const updated = { ...p, isActive: !p.isActive };
      await saveCollectionItem('projects', p.id, updated);
      await refreshCMS();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === projects.length - 1)
    ) {
      return;
    }
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const list = [...projects];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    const reordered = list.map((item, idx) => ({ id: item.id, order: idx + 1 }));
    try {
      await batchReorderItems('projects', reordered);
      await refreshCMS();
    } catch (err) {
      console.error('Failed to reorder projects:', err);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Portfolio & Projects Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage showcase case studies, client deliveries, imagery, and tech stack tags.
          </p>
        </div>
        <button
          type="button"
          onClick={handleCreateNew}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Editor Modal / Form */}
      {editingProject && (
        <form
          onSubmit={handleSave}
          className="p-6 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 shadow-2xl relative"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">
              {isCreating ? 'Add New Project' : `Edit Project: ${editingProject.title}`}
            </h3>
            <button
              type="button"
              onClick={() => setEditingProject(null)}
              className="p-1 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Project Title <span className="text-cyan-400">*</span>
              </label>
              <input
                type="text"
                required
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                placeholder="e.g. Apex Health AI Platform"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <input
                type="text"
                value={editingProject.category}
                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                placeholder="Web Application / Mobile / AI"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
              <input
                type="text"
                value={editingProject.client}
                onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                placeholder="Apex Healthcare Ltd"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Year</label>
              <input
                type="text"
                value={editingProject.year}
                onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                placeholder="2026"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={editingProject.description}
              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
              placeholder="Case study background and technological achievements..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <ImageUploader
            label="Project Showcase Image"
            value={editingProject.imageUrl}
            onChange={(url) => setEditingProject({ ...editingProject, imageUrl: url })}
            folder="portfolio-images"
            aspectRatioHint="Recommended: 16:9 high-definition mockup"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Tech Stack (Comma-separated)
              </label>
              <input
                type="text"
                value={editingProject.techStack.join(', ')}
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                placeholder="React, Next.js, Node.js, Tailwind"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Live URL / Case Study Link
              </label>
              <input
                type="text"
                value={editingProject.projectUrl}
                onChange={(e) => setEditingProject({ ...editingProject, projectUrl: e.target.value })}
                placeholder="https://client-demo.com or #"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="project-active"
              checked={editingProject.isActive}
              onChange={(e) => setEditingProject({ ...editingProject, isActive: e.target.checked })}
              className="w-4 h-4 rounded accent-cyan-400 cursor-pointer"
            />
            <label htmlFor="project-active" className="text-xs font-medium text-slate-300 cursor-pointer">
              Published on Showcase & Portfolio Archive
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setEditingProject(null)}
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
              <span>{isSaving ? 'Saving...' : 'Save Project'}</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p, index) => (
          <div
            key={p.id}
            className={`p-4 rounded-2xl bg-slate-900 border transition-all flex flex-col justify-between gap-3 ${
              p.isActive ? 'border-slate-800 hover:border-slate-700' : 'border-slate-800/40 opacity-60'
            }`}
          >
            <div className="space-y-3">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-mono text-cyan-400">
                  #{index + 1}
                </div>
                {!p.isActive && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-amber-500/80 text-slate-950 text-[10px] font-bold">
                    Draft
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                    {p.category} • {p.year}
                  </span>
                  <span className="text-xs text-slate-400">{p.client}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{p.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1">{p.description}</p>
              </div>

              {p.techStack && p.techStack.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {p.techStack.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                  {p.techStack.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 text-slate-500 font-mono">
                      +{p.techStack.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move forward"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={index === projects.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  className="p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Move backward"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleToggleActive(p)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  {p.isActive ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => handleEdit(p)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-300 cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setItemToDelete(p)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={Boolean(itemToDelete)}
        title="Delete Project?"
        message={`Are you sure you want to delete "${itemToDelete?.title}"?`}
        confirmText="Delete Project"
        onConfirm={handleDelete}
        onCancel={() => setItemToDelete(null)}
      />
    </div>
  );
}
