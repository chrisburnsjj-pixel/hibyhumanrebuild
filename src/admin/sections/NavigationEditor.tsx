import React, { useState, useEffect } from 'react';
import { Menu, Plus, Trash2, ArrowUp, ArrowDown, Check, Eye, EyeOff, Save, RotateCcw } from 'lucide-react';
import { NavigationItem } from '../../types/cms';
import { updateSiteSetting, DEFAULT_NAVIGATION_ITEMS } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';

export function NavigationEditor() {
  const { navigation, refreshCMS } = useCMS();
  const [items, setItems] = useState<NavigationItem[]>(navigation || DEFAULT_NAVIGATION_ITEMS);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (navigation && navigation.length > 0) {
      setItems(navigation);
    }
  }, [navigation]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSiteSetting('navigation', { items });
      await refreshCMS();
      setSuccessMessage('Navigation links updated!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      alert('Error updating navigation: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: `nav-${Date.now()}`,
        label: 'New Link',
        url: '#',
        order: prev.length + 1,
        isActive: true,
      },
    ]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateItem = (id: string, field: keyof NavigationItem, val: any) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)));
  };

  const move = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) {
      return;
    }
    const target = direction === 'up' ? index - 1 : index + 1;
    const copy = [...items];
    const temp = copy[index];
    copy[index] = copy[target];
    copy[target] = temp;
    setItems(copy.map((it, idx) => ({ ...it, order: idx + 1 })));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Menu className="w-5 h-5 text-cyan-400" />
            <span>Navigation Menu Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure header navigation items, labels, targets, and display ordering.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setItems(DEFAULT_NAVIGATION_ITEMS)}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={addItem}
            className="px-3.5 py-2 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-300 font-bold text-xs hover:bg-cyan-900/60 transition flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Link</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl bg-slate-900 border transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              item.isActive ? 'border-slate-800' : 'border-slate-800/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => move(index, 'up')}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  disabled={index === items.length - 1}
                  onClick={() => move(index, 'down')}
                  className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white disabled:opacity-30"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => updateItem(item.id, 'label', e.target.value)}
                  placeholder="Link Label"
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-cyan-400"
                />
                <input
                  type="text"
                  value={item.url}
                  onChange={(e) => updateItem(item.id, 'url', e.target.value)}
                  placeholder="Target URL / Hash (#services)"
                  className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                type="button"
                onClick={() => updateItem(item.id, 'isActive', !item.isActive)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                {item.isActive ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => removeItem(item.id)}
                className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 z-20 flex items-center justify-end p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save Navigation Menu'}</span>
        </button>
      </div>
    </div>
  );
}
