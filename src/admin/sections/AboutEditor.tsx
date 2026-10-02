import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Plus, Trash2, Check, RotateCcw } from 'lucide-react';
import { AboutContent } from '../../types/cms';
import { updateSiteSetting, DEFAULT_ABOUT_CONTENT } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';

export function AboutEditor() {
  const { about, refreshCMS } = useCMS();
  const [formData, setFormData] = useState<AboutContent>(about || DEFAULT_ABOUT_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (about) {
      setFormData(about);
    }
  }, [about]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);
    try {
      await updateSiteSetting<AboutContent>('about', formData);
      await refreshCMS();
      setSuccessMessage('About & Studio Story updated successfully!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert('Error updating about section: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addPillar = () => {
    setFormData((prev) => ({
      ...prev,
      pillars: [
        ...prev.pillars,
        {
          title: 'New Studio Principle',
          description: 'Explain this design or engineering standard...',
        },
      ],
    }));
  };

  const updatePillar = (index: number, field: 'title' | 'description', value: string) => {
    const updated = [...formData.pillars];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, pillars: updated }));
  };

  const removePillar = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      pillars: prev.pillars.filter((_, i) => i !== index),
    }));
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      stats: [...prev.stats, { label: 'Metric Name', value: '100%' }],
    }));
  };

  const updateStat = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...formData.stats];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, stats: updated }));
  };

  const removeStat = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>About & Studio Story Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage the studio philosophy, core guarantees, and key metrics shown on the story section.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormData(DEFAULT_ABOUT_CONTENT)}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Main Narrative</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Headline</label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description Paragraph</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Mission Statement</label>
            <textarea
              rows={2}
              value={formData.missionStatement}
              onChange={(e) => setFormData({ ...formData, missionStatement: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Pillars / Guarantees */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Core Studio Guarantees</h3>
            <button
              type="button"
              onClick={addPillar}
              className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/60 transition cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Guarantee</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.pillars.map((pillar, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-4">
                <span className="text-cyan-400 font-mono text-xs font-bold pt-2">0{idx + 1}.</span>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => updatePillar(idx, 'title', e.target.value)}
                    placeholder="Guarantee Title"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white font-bold focus:outline-none focus:border-cyan-400"
                  />
                  <textarea
                    rows={2}
                    value={pillar.description}
                    onChange={(e) => updatePillar(idx, 'description', e.target.value)}
                    placeholder="Explanation..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removePillar(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition cursor-pointer"
                  title="Remove pillar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Metrics */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Key Performance Metrics</h3>
            <button
              type="button"
              onClick={addStat}
              className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/60 transition cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Metric</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {formData.stats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => updateStat(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 100%)"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono font-bold text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => updateStat(idx, 'label', e.target.value)}
                    placeholder="Label"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeStat(idx)}
                  className="p-1 text-slate-500 hover:text-red-400 transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 flex items-center justify-end p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save About Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
