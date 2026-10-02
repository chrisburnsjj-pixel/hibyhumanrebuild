import React, { useState, useEffect } from 'react';
import { Layout, Save, Check, RotateCcw, Plus, Trash2 } from 'lucide-react';
import { FooterContent } from '../../types/cms';
import { updateSiteSetting, DEFAULT_FOOTER_CONTENT } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';

export function FooterEditor() {
  const { footer, refreshCMS } = useCMS();
  const [formData, setFormData] = useState<FooterContent>(footer || DEFAULT_FOOTER_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (footer) {
      setFormData(footer);
    }
  }, [footer]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSetting<FooterContent>('footer', formData);
      await refreshCMS();
      setSuccessMessage('Footer content and legal links updated!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      alert('Error updating footer: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addQuickLink = () => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: [...prev.quickLinks, { label: 'New Link', url: '#' }],
    }));
  };

  const updateQuickLink = (index: number, field: 'label' | 'url', val: string) => {
    const updated = [...formData.quickLinks];
    updated[index][field] = val;
    setFormData((prev) => ({ ...prev, quickLinks: updated }));
  };

  const removeQuickLink = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-cyan-400" />
            <span>Footer Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure footer biography, copyright declaration, and quick navigation links.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormData(DEFAULT_FOOTER_CONTENT)}
          className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition flex items-center gap-1.5"
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
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Content & Declaration</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Footer Studio Bio</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Copyright Line</label>
            <input
              type="text"
              value={formData.copyright}
              onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Footer Quick Links</h3>
            <button
              type="button"
              onClick={addQuickLink}
              className="px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-300 text-xs font-semibold hover:bg-cyan-900/60 transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Link</span>
            </button>
          </div>

          <div className="space-y-3">
            {formData.quickLinks.map((link, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => updateQuickLink(idx, 'label', e.target.value)}
                    placeholder="Link Label"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => updateQuickLink(idx, 'url', e.target.value)}
                    placeholder="Target URL (#privacy-policy)"
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeQuickLink(idx)}
                  className="p-1.5 text-slate-500 hover:text-red-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-4 z-20 flex items-center justify-end p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Footer Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
