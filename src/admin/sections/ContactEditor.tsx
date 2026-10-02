import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  Check,
  RotateCcw,
  Share2,
  Plus,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';
import { ContactInfo, SocialLinkItem, SocialPlatform } from '../../types/cms';
import {
  updateSiteSetting,
  DEFAULT_CONTACT_INFO,
  DEFAULT_SOCIAL_LINKS,
  getActiveSocialLinks,
} from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { SocialPlatformIcon, getPlatformColorClass } from '../../components/SocialPlatformIcon';

export function ContactEditor() {
  const { contact, refreshCMS } = useCMS();
  const [formData, setFormData] = useState<ContactInfo>(contact || DEFAULT_CONTACT_INFO);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  // Current social links array with fallback
  const currentSocialLinks: SocialLinkItem[] =
    Array.isArray(formData.socialLinks) && formData.socialLinks.length > 0
      ? formData.socialLinks
      : getActiveSocialLinks(formData);

  const handleUpdateSocialLink = (id: string, updates: Partial<SocialLinkItem>) => {
    const updated = currentSocialLinks.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    const legacySocials = { ...formData.socials };
    updated.forEach((s) => {
      if (s.platform !== 'custom' && s.url) {
        legacySocials[s.platform] = s.url;
      }
    });
    setFormData({
      ...formData,
      socialLinks: updated,
      socials: legacySocials,
    });
  };

  const handleToggleSocialActive = (id: string) => {
    const updated = currentSocialLinks.map((item) =>
      item.id === id ? { ...item, isActive: !item.isActive } : item
    );
    setFormData({
      ...formData,
      socialLinks: updated,
    });
  };

  const handleRemoveSocialLink = (id: string, label: string) => {
    if (window.confirm(`Are you sure you want to remove ${label} from the website?`)) {
      const updated = currentSocialLinks.filter((item) => item.id !== id);
      setFormData({
        ...formData,
        socialLinks: updated,
      });
    }
  };

  const handleAddSocialPreset = (platform: SocialPlatform, label: string, defaultUrl: string) => {
    const existing = currentSocialLinks.find((s) => s.platform === platform);
    if (existing) {
      alert(`${label} is already in your social channels list below.`);
      return;
    }
    const newItem: SocialLinkItem = {
      id: `social-${platform}-${Date.now()}`,
      platform,
      label,
      url: defaultUrl,
      isActive: true,
      order: currentSocialLinks.length + 1,
    };
    const updated = [...currentSocialLinks, newItem];
    const legacySocials = { ...formData.socials, [platform]: defaultUrl };
    setFormData({
      ...formData,
      socialLinks: updated,
      socials: legacySocials,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSiteSetting<ContactInfo>('contact', {
        ...formData,
        socialLinks: currentSocialLinks,
        updatedAt: new Date().toISOString(),
      });
      await refreshCMS();
      setSuccessMessage('Contact details and social media channels updated!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err: any) {
      alert('Error updating contact: ' + err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            <span>Contact & Studio Location</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Update telephone, WhatsApp line, Coatbridge studio address, and social channels.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setFormData(DEFAULT_CONTACT_INFO)}
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
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Direct Contact Details</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Studio Email Address</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Direct Phone Line</span>
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp URL</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Operating / Business Hours</span>
              </label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Studio Physical Address</span>
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Social Accounts & Channels */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Share2 className="w-4 h-4" />
                <span>Social Media Channels</span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Manage Facebook, Instagram, TikTok, LinkedIn, and any custom social media channels on the website.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  handleAddSocialPreset(
                    'custom',
                    'Custom Link',
                    'https://'
                  )
                }
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                <span>Add Channel</span>
              </button>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-slate-400 font-mono mr-1">Quick Add:</span>
            {[
              { id: 'facebook', label: 'Facebook', url: 'https://facebook.com/hibyhuman' },
              { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/hibyhuman' },
              { id: 'tiktok', label: 'TikTok', url: 'https://tiktok.com/@hibyhuman' },
              { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/company/hibyhuman' },
            ].map((preset) => {
              const isPresent = currentSocialLinks.some((s) => s.platform === preset.id);
              const colors = getPlatformColorClass(preset.id as SocialPlatform);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleAddSocialPreset(preset.id as SocialPlatform, preset.label, preset.url)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isPresent
                      ? 'bg-slate-950 border-slate-800 text-slate-500 opacity-60'
                      : `${colors.badgeBg} ${colors.badgeBorder} ${colors.badgeText} hover:scale-105`
                  }`}
                  title={isPresent ? `${preset.label} is already in the list` : `Add ${preset.label}`}
                >
                  <SocialPlatformIcon platform={preset.id as SocialPlatform} className="w-3.5 h-3.5" />
                  <span>+ {preset.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Socials List */}
          <div className="space-y-3 pt-2">
            {currentSocialLinks.length === 0 ? (
              <p className="text-xs text-slate-500 py-3">No social channels configured yet.</p>
            ) : (
              currentSocialLinks.map((item) => {
                const colors = getPlatformColorClass(item.platform);
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      item.isActive
                        ? 'bg-slate-950 border-slate-800'
                        : 'bg-slate-950/50 border-slate-850 opacity-60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        {/* Platform Icon */}
                        <div
                          className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${colors.badgeBg} ${colors.badgeBorder} ${colors.badgeText}`}
                        >
                          <SocialPlatformIcon platform={item.platform} className="w-3.5 h-3.5" />
                        </div>

                        {/* Label */}
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateSocialLink(item.id, { label: e.target.value })}
                          placeholder="Platform Label"
                          className="w-28 sm:w-32 bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 shrink-0"
                        />

                        {/* URL input */}
                        <div className="flex-1 relative min-w-[140px]">
                          <input
                            type="url"
                            value={item.url}
                            onChange={(e) => handleUpdateSocialLink(item.id, { url: e.target.value })}
                            placeholder="https://..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono pr-7"
                          />
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400"
                              title="Test link"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Controls: Active toggle & Remove */}
                      <div className="flex items-center gap-2 shrink-0 justify-end">
                        <button
                          type="button"
                          onClick={() => handleToggleSocialActive(item.id)}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                            item.isActive
                              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-400'
                              : 'bg-slate-900 border-slate-800 text-slate-500'
                          }`}
                          title={item.isActive ? 'Visible on site' : 'Hidden from site'}
                        >
                          {item.isActive ? (
                            <>
                              <Eye className="w-3 h-3 text-emerald-400" />
                              <span className="hidden sm:inline">Visible</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-slate-500" />
                              <span className="hidden sm:inline">Hidden</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveSocialLink(item.id, item.label)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 transition cursor-pointer"
                          title="Remove from website"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="sticky bottom-4 z-20 flex items-center justify-end p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Contact Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
