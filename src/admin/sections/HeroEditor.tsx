import React, { useState, useEffect } from 'react';
import { Sparkles, Save, RotateCcw, Check, ExternalLink } from 'lucide-react';
import { HeroContent } from '../../types/cms';
import { updateSiteSetting, DEFAULT_HERO_CONTENT } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { ImageUploader } from '../components/ImageUploader';

export function HeroEditor() {
  const { hero, refreshCMS } = useCMS();
  const [formData, setFormData] = useState<HeroContent>(hero || DEFAULT_HERO_CONTENT);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (hero) {
      setFormData(hero);
    }
  }, [hero]);

  const handleChange = (field: keyof HeroContent, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    try {
      await updateSiteSetting<HeroContent>('hero', formData);
      await refreshCMS();
      setSuccessMessage('Hero section saved and live on website!');
      setTimeout(() => setSuccessMessage(null), 4000);
    } catch (err: any) {
      console.error('Failed to save Hero section:', err);
      setErrorMessage(err?.message || 'Failed to update hero settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setFormData(DEFAULT_HERO_CONTENT);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span>Hero Section Configuration</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage the primary headline, intro copy, CTA buttons, and promo vouchers displayed in the main hero.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 font-mono">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Main Heading & Subtitle */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Headlines & Copy</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Main Display Heading <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.heading}
              onChange={(e) => handleChange('heading', e.target.value)}
              placeholder="e.g. HUMAN IDEAS. POWERED BY INTELLIGENT TECHNOLOGY."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-400 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Subtitle / Kicker</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => handleChange('subtitle', e.target.value)}
              placeholder="e.g. Award-Winning Creative & Technology Engineering Studio"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Hero Description Paragraph</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe the studio's primary proposition..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-4 text-xs text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Buttons & CTAs */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Calls to Action (CTAs)</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Button Label</label>
              <input
                type="text"
                value={formData.primaryButtonText}
                onChange={(e) => handleChange('primaryButtonText', e.target.value)}
                placeholder="e.g. Claim 50% Off First Project"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Button Target URL / Hash</label>
              <input
                type="text"
                value={formData.primaryButtonUrl}
                onChange={(e) => handleChange('primaryButtonUrl', e.target.value)}
                placeholder="#packages or https://..."
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary Button Label</label>
              <input
                type="text"
                value={formData.secondaryButtonText}
                onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
                placeholder="e.g. Explore Bespoke Services"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Secondary Button Target URL / Hash</label>
              <input
                type="text"
                value={formData.secondaryButtonUrl}
                onChange={(e) => handleChange('secondaryButtonUrl', e.target.value)}
                placeholder="#services or #case-studies"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              />
            </div>
          </div>
        </div>

        {/* Promo Voucher & Visuals */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-cyan-400">Promotions & Media</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Promo Badge Text</label>
              <input
                type="text"
                value={formData.promoVoucherText || ''}
                onChange={(e) => handleChange('promoVoucherText', e.target.value)}
                placeholder="e.g. Special Studio Offer: 50% Off First Order"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Promo Coupon Code</label>
              <input
                type="text"
                value={formData.promoVoucherCode || ''}
                onChange={(e) => handleChange('promoVoucherCode', e.target.value)}
                placeholder="FIRST50"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-cyan-300 focus:outline-none focus:border-cyan-400 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Hero Brand Video URL (.mp4 / WebM)
            </label>
            <input
              type="text"
              value={formData.heroVideo || ''}
              onChange={(e) => handleChange('heroVideo', e.target.value)}
              placeholder="https://... (Optional video override)"
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Optional video override. Defaults to the high-performance SVG/CSS animated HiByHuman logo.
            </p>
          </div>

          <ImageUploader
            label="Hero Cover / Poster Image (Optional)"
            value={formData.heroImage || ''}
            onChange={(url) => handleChange('heroImage', url)}
            folder="hero-media"
          />
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 flex items-center justify-between p-4 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-2xl shadow-2xl">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Changes save directly to Firestore and take effect on the live site.</span>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin" />
                <span>Saving Hero...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
