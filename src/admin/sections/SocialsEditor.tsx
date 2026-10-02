import React, { useState, useEffect } from 'react';
import {
  Share2,
  Plus,
  Trash2,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Save,
  Check,
  RotateCcw,
  Eye,
  EyeOff,
  Sparkles,
  Link2,
} from 'lucide-react';
import { SocialPlatform, SocialLinkItem, ContactInfo } from '../../types/cms';
import {
  updateSiteSetting,
  DEFAULT_CONTACT_INFO,
  DEFAULT_SOCIAL_LINKS,
  getActiveSocialLinks,
} from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { SocialPlatformIcon, getPlatformColorClass } from '../../components/SocialPlatformIcon';

const AVAILABLE_PLATFORMS: { id: SocialPlatform; label: string; defaultUrl: string }[] = [
  { id: 'facebook', label: 'Facebook', defaultUrl: 'https://facebook.com/hibyhuman' },
  { id: 'instagram', label: 'Instagram', defaultUrl: 'https://instagram.com/hibyhuman' },
  { id: 'tiktok', label: 'TikTok', defaultUrl: 'https://tiktok.com/@hibyhuman' },
  { id: 'linkedin', label: 'LinkedIn', defaultUrl: 'https://linkedin.com/company/hibyhuman' },
  { id: 'youtube', label: 'YouTube', defaultUrl: 'https://youtube.com/@hibyhuman' },
  { id: 'twitter', label: 'X / Twitter', defaultUrl: 'https://x.com/hibyhuman' },
  { id: 'github', label: 'GitHub', defaultUrl: 'https://github.com/hibyhuman' },
  { id: 'threads', label: 'Threads', defaultUrl: 'https://threads.net/@hibyhuman' },
  { id: 'custom', label: 'Custom Website / Link', defaultUrl: 'https://' },
];

export function SocialsEditor() {
  const { contact, refreshCMS } = useCMS();
  const [socialLinks, setSocialLinks] = useState<SocialLinkItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // New item draft
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('facebook');
  const [customLabel, setCustomLabel] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  // Initialize from contact
  useEffect(() => {
    if (contact?.socialLinks && contact.socialLinks.length > 0) {
      setSocialLinks(contact.socialLinks);
    } else {
      // Seed from fallback or active social links
      const initial = getActiveSocialLinks(contact);
      setSocialLinks(initial);
    }
  }, [contact]);

  // Update a single field
  const handleUpdateItem = (id: string, updates: Partial<SocialLinkItem>) => {
    setSocialLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Toggle active status
  const handleToggleActive = (id: string) => {
    setSocialLinks((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isActive: !item.isActive } : item))
    );
  };

  // Remove a social media item
  const handleRemove = (id: string, label: string) => {
    if (window.confirm(`Are you sure you want to remove "${label}" from the website?`)) {
      setSocialLinks((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Reordering
  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= socialLinks.length) return;

    const updated = [...socialLinks];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    // Update orders
    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setSocialLinks(reordered);
  };

  // Quick preset add
  const handleQuickAdd = (platform: SocialPlatform) => {
    const preset = AVAILABLE_PLATFORMS.find((p) => p.id === platform);
    const existing = socialLinks.find((s) => s.platform === platform);

    if (existing) {
      alert(`A channel for ${preset?.label || platform} already exists in your list. You can edit its URL below.`);
      return;
    }

    const newItem: SocialLinkItem = {
      id: `social-${platform}-${Date.now()}`,
      platform,
      label: preset?.label || platform,
      url: preset?.defaultUrl || 'https://',
      isActive: true,
      order: socialLinks.length + 1,
    };

    setSocialLinks((prev) => [...prev, newItem]);
  };

  // Add custom or selected platform
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) {
      alert('Please enter a valid URL.');
      return;
    }

    const preset = AVAILABLE_PLATFORMS.find((p) => p.id === selectedPlatform);
    const label = customLabel.trim() || preset?.label || 'Social Link';

    const newItem: SocialLinkItem = {
      id: `social-${selectedPlatform}-${Date.now()}`,
      platform: selectedPlatform,
      label,
      url: customUrl.trim(),
      isActive: true,
      order: socialLinks.length + 1,
    };

    setSocialLinks((prev) => [...prev, newItem]);
    setCustomLabel('');
    setCustomUrl('');
    setShowAddForm(false);
  };

  // Reset to default 4 main platforms
  const handleResetDefaults = () => {
    if (window.confirm('Reset all social channels to default (Facebook, Instagram, TikTok, LinkedIn)?')) {
      setSocialLinks(DEFAULT_SOCIAL_LINKS);
    }
  };

  // Save to Firestore
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Map backwards compatibility for contact.socials
      const legacySocials: Record<string, string> = { ...contact?.socials };
      socialLinks.forEach((item) => {
        if (item.platform !== 'custom' && item.url) {
          legacySocials[item.platform] = item.url;
        }
      });

      const updatedContact: ContactInfo = {
        ...(contact || DEFAULT_CONTACT_INFO),
        socialLinks,
        socials: legacySocials,
        updatedAt: new Date().toISOString(),
      };

      await updateSiteSetting<ContactInfo>('contact', updatedContact);
      await refreshCMS();

      setSuccessMessage('Social media channels saved and published to website!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      alert('Error saving social channels: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-cyan-400" />
            <span>Social Media Channels</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Add, configure, reorder, or remove social media links displayed on the website (Facebook, Instagram, TikTok, LinkedIn, etc.).
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-850 border border-slate-800 transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset 4 Core Socials</span>
          </button>
          <button
            type="button"
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition flex items-center gap-1.5 cursor-pointer shadow-md shadow-cyan-400/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Social Media</span>
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Quick Add Presets Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <span className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2.5 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Add Popular Platforms</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {AVAILABLE_PLATFORMS.map((preset) => {
            const isAdded = socialLinks.some((s) => s.platform === preset.id);
            const colors = getPlatformColorClass(preset.id);
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleQuickAdd(preset.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  isAdded
                    ? 'bg-slate-950/60 border-slate-800 text-slate-500 opacity-60'
                    : `${colors.badgeBg} ${colors.badgeBorder} ${colors.badgeText} hover:scale-105`
                }`}
                title={isAdded ? `${preset.label} is already in the list` : `Add ${preset.label} to website`}
              >
                <SocialPlatformIcon platform={preset.id} className="w-3.5 h-3.5" />
                <span>+ {preset.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Channel Modal/Form */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-1.5">
              <Plus className="w-4 h-4" />
              <span>Add New Social Channel</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Platform</label>
              <select
                value={selectedPlatform}
                onChange={(e) => {
                  const plat = e.target.value as SocialPlatform;
                  setSelectedPlatform(plat);
                  const found = AVAILABLE_PLATFORMS.find((p) => p.id === plat);
                  if (found) {
                    setCustomLabel(found.label);
                    setCustomUrl(found.defaultUrl);
                  }
                }}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              >
                {AVAILABLE_PLATFORMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Display Label</label>
              <input
                type="text"
                value={customLabel}
                placeholder="e.g. Facebook, TikTok"
                onChange={(e) => setCustomLabel(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Profile / Channel URL</label>
              <input
                type="url"
                required
                value={customUrl}
                placeholder="https://..."
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition"
            >
              Add Channel to List
            </button>
          </div>
        </form>
      )}

      {/* Social Links List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span>Active Social Channels ({socialLinks.length})</span>
          <span>Order & Visibility Controls</span>
        </div>

        {socialLinks.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900 border border-dashed border-slate-800 space-y-3">
            <Share2 className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">
              No social media channels configured yet. Click "Add Social Media" or click any quick preset above.
            </p>
          </div>
        ) : (
          socialLinks.map((item, index) => {
            const colors = getPlatformColorClass(item.platform);
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all duration-200 ${
                  item.isActive
                    ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-950/60 border-slate-850 opacity-60'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
                  {/* Left: Icon, Platform & Inputs */}
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <div className="flex items-center gap-1 shrink-0 pt-1 sm:pt-0">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => handleMove(index, 'up')}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        disabled={index === socialLinks.length - 1}
                        onClick={() => handleMove(index, 'down')}
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Platform Badge */}
                    <div
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${colors.badgeBg} ${colors.badgeBorder} ${colors.badgeText}`}
                    >
                      <SocialPlatformIcon platform={item.platform} className="w-4 h-4" />
                    </div>

                    {/* Platform Dropdown */}
                    <div className="w-32 shrink-0">
                      <select
                        value={item.platform}
                        onChange={(e) =>
                          handleUpdateItem(item.id, {
                            platform: e.target.value as SocialPlatform,
                          })
                        }
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      >
                        {AVAILABLE_PLATFORMS.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Display Label */}
                    <div className="w-36 shrink-0 hidden sm:block">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => handleUpdateItem(item.id, { label: e.target.value })}
                        placeholder="Label"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>

                    {/* URL Input */}
                    <div className="flex-1 min-w-[180px]">
                      <div className="relative">
                        <input
                          type="url"
                          value={item.url}
                          onChange={(e) => handleUpdateItem(item.id, { url: e.target.value })}
                          placeholder="https://..."
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono pr-8"
                        />
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400"
                            title="Test Link in New Tab"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions: Active Toggle & Remove Button */}
                  <div className="flex items-center justify-end gap-2 pt-2 lg:pt-0 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleActive(item.id)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        item.isActive
                          ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                          : 'bg-slate-950 border-slate-800 text-slate-500'
                      }`}
                      title={item.isActive ? 'Visible on website (click to hide)' : 'Hidden (click to show)'}
                    >
                      {item.isActive ? (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-slate-500" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>

                    {/* Delete / Remove Social Channel */}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id, item.label)}
                      className="p-2 rounded-xl bg-slate-950 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                      title="Remove this social channel"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Floating Save Bar */}
      <div className="sticky bottom-4 z-20 flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
        <div className="text-xs text-slate-400">
          <span>{socialLinks.filter((s) => s.isActive).length} active social channels will appear on the website</span>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-400/25"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Publishing...' : 'Save Social Channels'}</span>
        </button>
      </div>
    </div>
  );
}
