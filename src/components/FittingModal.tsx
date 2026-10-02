import React, { useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, Download, ShieldCheck, Sparkles, Phone, MapPin, PartyPopper, Clock, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STUDIO_INFO } from '../data';
import { useCurrency } from '../context/CurrencyContext';

interface FittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: string;
}

export function FittingModal({ isOpen, onClose, preselectedProduct }: FittingModalProps) {
  const { currency, formatConvertedPrice } = useCurrency();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    company: '',
    serviceType: preselectedProduct || 'Web & Mobile Development',
    budgetRange: 'Startup Tier',
    notes: preselectedProduct ? `Inquiry regarding: ${preselectedProduct}` : ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  // Trigger rich, graceful brand-tailored confetti
  const triggerCelebrationConfetti = useCallback(() => {
    // Initial center burst with brand and celebratory colors
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.55 },
      colors: ['#0284c7', '#38bdf8', '#4f46e5', '#f43f5e', '#10b981', '#f59e0b'],
      zIndex: 99999,
      disableForReducedMotion: true,
      scalar: 1.05,
    });

    // Secondary dual side flourish
    const timeoutId = setTimeout(() => {
      confetti({
        particleCount: 40,
        angle: 60,
        spread: 55,
        origin: { x: 0.25, y: 0.6 },
        colors: ['#38bdf8', '#0284c7', '#34d399', '#fef08a'],
        zIndex: 99999,
        disableForReducedMotion: true,
      });

      confetti({
        particleCount: 40,
        angle: 120,
        spread: 55,
        origin: { x: 0.75, y: 0.6 },
        colors: ['#38bdf8', '#6366f1', '#f43f5e', '#fef08a'],
        zIndex: 99999,
        disableForReducedMotion: true,
      });
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (preselectedProduct) {
      setFormData(prev => ({
        ...prev,
        serviceType: preselectedProduct,
        notes: `Inquiry regarding: ${preselectedProduct}`
      }));
    }
  }, [preselectedProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form status when modal is closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsSubmitted(false);
        setDownloaded(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refNumber = 'HBH-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refNumber);
    setIsSubmitted(true);
    triggerCelebrationConfetti();
  };

  const handleDownloadDossier = () => {
    const textContent = `=====================================================
HiByHuman - Digital Architecture & Creative Proposal Brief
Human ideas. Powered by intelligent technology.
=====================================================

Project Reference: ${bookingRef || 'HBH-' + Math.floor(100000 + Math.random() * 900000)}
Date Generated: ${new Date().toLocaleDateString('en-GB', { dateStyle: 'full' })}
Dispatched To: info@hibyhuman.com

1. CLIENT & STAKEHOLDER INFORMATION:
   Client Name: ${formData.fullName || 'Valued Partner'}
   Company / Organization: ${formData.company || 'Direct Engagement'}
   Phone / WhatsApp: ${formData.phoneNumber || 'On record'}
   Email Address: ${formData.email || 'On record'}

2. PROJECT REQUIREMENTS & SCOPE:
   Target Service Domain: ${formData.serviceType}
   Budget Tier / Scope: ${formData.budgetRange}
   Selected Currency: ${currency} (Base Currency: GBP)
   Project Objectives & Technical Brief:
   ${formData.notes || 'Bespoke design, intelligent web/mobile systems, and creative solutions.'}

3. HIBYHUMAN TRIPLE GUARANTEE:
   ✓ 100% Bespoke Design (No Generic Ready-Made Templates)
   ✓ W3C Validated Clean Code & High-Performance Architecture
   ✓ 100% Money-Back & Satisfaction Guarantee
   ✓ 50% First Order Discount Applied (Code: FIRST50)
   ✓ Complete Intellectual Property & Source Code Ownership
   ✓ Dedicated UK Project Lead & Direct Communication Line

Studio Contact: info@hibyhuman.com | +44 7532 835055
Studio Headquarters: 2 Mitchell Street Coatbridge, ML5 5RT
Website: https://hibyhuman.com
=====================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hibyhuman-proposal-${formData.fullName ? formData.fullName.toLowerCase().replace(/\s+/g, '-') : 'brief'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-slate-50 dark:bg-slate-900 text-white rounded-3xl shadow-[0_0_60px_rgba(0,212,255,0.25)] border border-slate-700/80 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-7 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-cyan-400 font-mono uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>FREE PROJECT PROPOSAL & ARCHITECTURE CONSULTATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Start Your Digital Project
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-700 dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 overflow-y-auto flex-1">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Tell us about your upcoming project or select a fixed-price package. All inquiries are securely dispatched to <strong className="text-cyan-300 font-semibold font-mono">info@hibyhuman.com</strong>. Our technical director will reply with an architecture proposal within 2 hours.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Oliver Wright"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +44 7532 835055"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Ventures Ltd"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Service Required *
                  </label>
                  <select
                    value={formData.serviceType}
                    onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value="Interactive UX/UI Design">Interactive UX/UI Design</option>
                    <option value="Web & Mobile Development">Web & Mobile Development</option>
                    <option value="Motion Graphics & Brand Identity">Motion Graphics & Brand Identity</option>
                    <option value="Digital Marketing & SEO">Digital Marketing & SEO</option>
                    <option value="E-Commerce Store & Shopify">E-Commerce Store & Shopify Plus</option>
                    <option value="Concept, Strategy & Architecture">Concept, Strategy & Architecture</option>
                    <option value={`Basic Package (£249 / ${formatConvertedPrice(249)})`}>
                      Basic Package ({formatConvertedPrice(249)}{currency !== 'GBP' ? ' / £249 GBP' : ''})
                    </option>
                    <option value={`Startup Package (£599 / ${formatConvertedPrice(599)})`}>
                      Startup Package ({formatConvertedPrice(599)}{currency !== 'GBP' ? ' / £599 GBP' : ''})
                    </option>
                    <option value={`Professional Package (£899 / ${formatConvertedPrice(899)})`}>
                      Professional Package ({formatConvertedPrice(899)}{currency !== 'GBP' ? ' / £899 GBP' : ''})
                    </option>
                    <option value={`Enterprise Package (£1,799 / ${formatConvertedPrice(1799)})`}>
                      Enterprise Package ({formatConvertedPrice(1799)}{currency !== 'GBP' ? ' / £1,799 GBP' : ''})
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Approximate Budget Range
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value={`Basic Tier (${formatConvertedPrice(249)})`}>
                      Basic Tier ({formatConvertedPrice(249)}{currency !== 'GBP' ? ' / £249' : ''})
                    </option>
                    <option value={`Startup Tier (${formatConvertedPrice(599)} - ${formatConvertedPrice(1199)})`}>
                      Startup Tier ({formatConvertedPrice(599)} - {formatConvertedPrice(1199)}{currency !== 'GBP' ? ' / £599 - £1,199' : ''})
                    </option>
                    <option value={`Professional Tier (${formatConvertedPrice(899)} - ${formatConvertedPrice(1799)})`}>
                      Professional Tier ({formatConvertedPrice(899)} - {formatConvertedPrice(1799)}{currency !== 'GBP' ? ' / £899 - £1,799' : ''})
                    </option>
                    <option value={`Enterprise Tier (${formatConvertedPrice(1799)}+)`}>
                      Enterprise Tier ({formatConvertedPrice(1799)}+{currency !== 'GBP' ? ' / £1,799+' : ''})
                    </option>
                    <option value={`Custom Corporate Platform (${formatConvertedPrice(5000)}+)`}>
                      Custom Corporate Platform ({formatConvertedPrice(5000)}+{currency !== 'GBP' ? ' / £5,000+' : ''})
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Project Brief, Goals or Questions
                </label>
                <textarea
                  rows={2}
                  placeholder="Share details about your desired features, inspirations, target audience, or launch deadline..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-black text-slate-950 bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 transition-all shadow-[0_0_20px_rgba(0,212,255,0.4)] cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Project Inquiry & Get Proposal</span>
                  <span>→</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-600 dark:text-slate-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>No obligation. 100% Unique Design Guarantee with NDA protection.</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-300">
              {/* Animated Celebration Icon with layered glowing rings */}
              <div className="relative inline-flex items-center justify-center mx-auto">
                <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-pulse" />
                <div className="absolute -inset-1.5 rounded-full border border-cyan-500/30 animate-ping opacity-30" />
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-fuchsia-500 text-slate-950 font-black flex items-center justify-center shadow-lg shadow-cyan-500/25 relative z-10 transition-transform duration-300 hover:scale-105">
                  <CheckCircle2 className="w-10 h-10 text-slate-950" />
                </div>
                {/* Micro floating celebration badge */}
                <button
                  onClick={triggerCelebrationConfetti}
                  title="Trigger confetti celebration!"
                  className="absolute -top-1 -right-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 p-1.5 rounded-full shadow-md transition-all duration-200 hover:scale-110 cursor-pointer z-20"
                >
                  <PartyPopper className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 px-3.5 py-1 rounded-full border border-cyan-500/50 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>REF: {bookingRef}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 tracking-tight">
                  Proposal Request Confirmed!
                </h3>
                <p className="text-slate-700 dark:text-slate-300 text-sm max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-white font-semibold">{formData.fullName}</strong>. Your project brief has been dispatched to <strong className="text-cyan-300 font-mono">info@hibyhuman.com</strong>. Our technical director will follow up with an architecture blueprint and fixed-cost proposal within 2 hours.
                </p>
              </div>

              {/* Dossier Card with Explicit Studio Contact & Location */}
              <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-left text-xs space-y-2.5 max-w-md mx-auto shadow-lg">
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-medium">Requested Service:</span>
                  <span className="font-semibold text-white">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-medium">Budget Tier:</span>
                  <span className="font-semibold text-white">{formData.budgetRange}</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-medium">Dispatched To:</span>
                  <span className="font-semibold font-mono text-cyan-400">info@hibyhuman.com</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-medium">Studio Phone:</span>
                  <a href="tel:+447532835055" className="font-semibold font-mono text-cyan-300 hover:text-cyan-200">+44 7532 835055</a>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <span className="font-medium">Studio Address:</span>
                  <span className="font-semibold text-white">2 Mitchell Street Coatbridge, ML5 5RT</span>
                </div>
                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                  <span className="font-medium">Studio Guarantees:</span>
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <span>100% Unique Design + Money-Back</span>
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleDownloadDossier}
                  className="py-3 px-5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>{downloaded ? 'Proposal Brief Saved ✓' : 'Download Proposal Brief (.txt)'}</span>
                </button>
                <button
                  onClick={triggerCelebrationConfetti}
                  className="py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-cyan-300 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <PartyPopper className="w-4 h-4 text-cyan-400" />
                  <span>Celebrate 🎉</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-3 px-6 rounded-xl text-xs sm:text-sm font-black text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
