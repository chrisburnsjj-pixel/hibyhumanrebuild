import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

interface FeedbackBannerProps {
  selectedServices: string[];
  onLetsTalk: () => void;
}

const SERVICE_HIGHLIGHTS: Record<string, string> = {
  'Web & Apps': 'React & Next.js Full-Stack, Sub-Second Speed & Custom APIs',
  'AI Solutions': 'Intelligent LLM Automation, Custom Agents & Smart Workflows',
  'Digital Marketing': 'High-Intent Google Ads, Forensic PPC & #1 Organic SEO',
  'Creative & Content': 'Cinematic 3D Assets, Video Showreels & Conversion Copy',
  'Branding': 'Vector Identity Kits, Luxury 3D Packaging & Pitch Decks',
  'Other': 'Bespoke Enterprise Systems Scoping & Architecture Consultation',
};

export function FeedbackBanner({ selectedServices, onLetsTalk }: FeedbackBannerProps) {
  return (
    <div className="mt-5 min-h-[44px]">
      <AnimatePresence mode="wait">
        {selectedServices.length === 0 ? (
          <motion.div
            key="empty-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 py-1 font-mono"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Click any objective above to preview tailored deliverables & instant quote.</span>
          </motion.div>
        ) : (
          <motion.div
            key="selected-card"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="rounded-2xl bg-slate-900/90 border border-cyan-500/40 p-4 sm:p-5 shadow-[0_0_35px_rgba(0,212,255,0.18)] backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                {/* Header Badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                    Tailored Project Scope Ready ({selectedServices.length} Selected)
                  </span>
                </div>

                {/* Selected Names */}
                <h4 className="text-white font-bold text-base sm:text-lg mb-2">
                  {selectedServices.join(' • ')}
                </h4>

                {/* Deliverables Bullet List */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-300 font-mono">
                  {selectedServices.map((svc) => (
                    <div key={svc} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{SERVICE_HIGHLIGHTS[svc] || svc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                <button
                  type="button"
                  onClick={onLetsTalk}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 font-black text-sm tracking-wide transition-all shadow-[0_0_24px_rgba(0,212,255,0.5)] hover:shadow-[0_0_32px_rgba(0,212,255,0.8)] cursor-pointer flex items-center gap-2 active:scale-95 group"
                >
                  <span>Let's Talk</span>
                  <span className="text-xs bg-slate-950/20 px-2 py-0.5 rounded-full font-mono">50% OFF</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Bottom Guarantee Strip */}
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Money-Back Guarantee
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-300">
                <Zap className="w-3.5 h-3.5" /> 48-Hour Sprint Kickoff
              </span>
              <span>•</span>
              <span className="text-slate-300 font-semibold">Promo Code FIRST50 Applied</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
