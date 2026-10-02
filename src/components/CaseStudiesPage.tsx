import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Target,
  BarChart3,
  Layers,
  Phone,
  Mail,
  X,
  Filter,
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from './CaseStudiesSection';
import { HiByHumanLogo, HiByHumanIcon } from './Logo';
import { STUDIO_INFO } from '../data';

interface CaseStudiesPageProps {
  onBackToHome: () => void;
  onOpenFittingModal: (subject?: string) => void;
  onNavigateCaseStudy?: (slug: string) => void;
}

export function CaseStudiesPage({
  onBackToHome,
  onOpenFittingModal,
  onNavigateCaseStudy,
}: CaseStudiesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const categories = [
    'All',
    'Web & Mobile UI',
    'Digital Marketing & PPC',
    'Branding & Identity',
    'Packaging Systems',
    'Outdoor Campaigns',
  ];

  const filteredStudies =
    selectedCategory === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      {/* ============================================================ */}
      {/* TOP STICKY INNER NAVIGATION BAR                               */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-10 py-4 transition-all">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 hover:text-cyan-300 text-xs font-semibold border border-cyan-800/60 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <HiByHumanIcon className="w-6 h-6" animated={true} />
              <span className="font-bold text-sm tracking-tight text-white font-creative">
                HiByHuman Studio
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                Case Studies
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenFittingModal('50% Promo - Case Studies Inner Page')}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 text-xs font-black transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Claim 50% Off</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* EDITORIAL HERO SECTION                                        */}
      {/* ============================================================ */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden border-b border-neutral-800">
        {/* Ambient neon radial glows */}
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-6">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>CLIENT SUCCESS STORIES & ARCHITECTURE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              Proven Results.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Measurable Commercial Impact.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed max-w-2xl mb-10">
              Deep dive into how HiByHuman architects custom digital products, hyper-targeted Google Ads funnels, and enterprise brand identities for disruptive startups and industry titans worldwide.
            </p>

            {/* Impact Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-cyan-400">668+</div>
                <div className="text-xs text-neutral-400 mt-1">High-Intent Bookings</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400">+237%</div>
                <div className="text-xs text-neutral-400 mt-1">LinkedIn Decision-Maker Growth</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-indigo-400">99/100</div>
                <div className="text-xs text-neutral-400 mt-1">Core Web Vitals Speed</div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800">
                <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-400">£18M+</div>
                <div className="text-xs text-neutral-400 mt-1">Client Capital Raised</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FILTER TABS BAR                                               */}
      {/* ============================================================ */}
      <div className="sticky top-[69px] z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 py-3.5 px-6 sm:px-10">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-neutral-400 font-mono flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-cyan-400 text-neutral-950 shadow-md shadow-cyan-400/20'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs text-neutral-400 font-mono hidden md:block shrink-0">
            Showing {filteredStudies.length} In-Depth Deliverables
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CASE STUDIES GRID                                             */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 max-w-[1500px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study, idx) => (
            <div
              key={study.id}
              className={`rounded-3xl bg-neutral-900/70 border border-neutral-800 flex flex-col justify-between overflow-hidden group hbh-card-motion hbh-card-sheen ${
                idx === 0 ? 'hbh-card-sheen-periodic' : ''
              }`}
            >
              {/* Card Header & Visual Image Mockup */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-neutral-950 hbh-image-container">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover hbh-image-scale"
                  onError={(e) => {
                    // Fallback visual pattern if local image doesn't load
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                {/* Category & Client Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-xs font-mono font-bold text-cyan-300 border border-neutral-700">
                    {study.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-mono font-semibold border border-emerald-500/30">
                    Verified Outcome
                  </span>
                </div>

                {/* Title & Tagline overlay */}
                <div className="absolute bottom-4 left-5 right-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-xs text-neutral-300 mt-1 line-clamp-1 font-mono">{study.client}</p>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-sm text-neutral-300 leading-relaxed">{study.tagline}</p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  {study.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-center">
                      <div className="text-base sm:text-lg font-mono font-extrabold text-cyan-400">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-neutral-400 truncate mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Challenge & Solution Summary */}
                <div className="space-y-3 pt-2 text-xs text-neutral-400">
                  <div className="flex items-start gap-2">
                    <Target className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-200">Challenge:</strong> {study.challenge}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-neutral-200">Solution:</strong> {study.solution}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md bg-neutral-800/80 text-[11px] font-mono text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                  <a
                    href={`/case-studies/${study.id === 'jd-prestige' ? 'jd-prestige-cars' : study.id}`}
                    onClick={(e) => {
                      if (onNavigateCaseStudy) {
                        e.preventDefault();
                        onNavigateCaseStudy(study.id === 'jd-prestige' ? 'jd-prestige-cars' : study.id);
                      }
                    }}
                    className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer group/btn"
                  >
                    <span>Read Full Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </a>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onOpenFittingModal(`Case Study Inquiry: ${study.title}`);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold transition-all cursor-pointer hbh-btn-motion"
                  >
                    Start Similar Project
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* FULL CASE STUDY MODAL EXPANDER                                */}
      {/* ============================================================ */}
      <AnimatePresence>
        {activeStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setActiveStudy(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-neutral-900 border border-neutral-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setActiveStudy(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-xs font-mono font-bold">
                  {activeStudy.category}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{activeStudy.client}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{activeStudy.title}</h2>
              <p className="text-sm text-cyan-300 font-mono mb-6">{activeStudy.tagline}</p>

              <div className="grid grid-cols-3 gap-3 mb-6 p-4 rounded-2xl bg-neutral-950 border border-neutral-800 text-center">
                {activeStudy.metrics.map((m, idx) => (
                  <div key={idx}>
                    <div className="text-xl sm:text-2xl font-mono font-extrabold text-cyan-400">{m.value}</div>
                    <div className="text-xs text-neutral-400 mt-0.5">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
                    The Business Challenge
                  </h4>
                  <p className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-300">
                    {activeStudy.challenge}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
                    The HiByHuman Solution
                  </h4>
                  <p className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-800 text-xs text-neutral-300">
                    {activeStudy.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold mb-2">
                    Key Outcomes & Measured Results
                  </h4>
                  <ul className="space-y-2">
                    {activeStudy.results.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setActiveStudy(null);
                    onOpenFittingModal(`Case Study Proposal: ${activeStudy.title} (50% Promo)`);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-xs transition-all shadow-md shadow-cyan-400/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start a Similar Project (50% Off)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveStudy(null)}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/* BOTTOM PROMO CONVERSION BANNER                                */}
      {/* ============================================================ */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>CLAIM 50% LAUNCH DISCOUNT ON YOUR FIRST PROJECT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Build Your Own Success Story?
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-8">
            Whether you need a sub-second web app, an aggressive Google Ads PPC overhaul, or an enterprise brand system, our team is ready.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenFittingModal('50% Promo - Case Studies Footer')}
              className="px-8 py-4 rounded-full bg-cyan-400 hover:bg-cyan-300 text-neutral-950 font-bold text-sm shadow-xl shadow-cyan-400/20 hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Get Free Consultation & 50% Off</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onBackToHome}
              className="px-6 py-4 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 text-sm font-semibold transition-all cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home Overview</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800/80 py-8 text-center text-xs text-neutral-400">
        <div className="max-w-[1500px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <HiByHumanIcon className="w-5 h-5" animated={false} />
            <span className="font-bold text-white">HiByHuman Creative & Tech Studio</span>
          </div>
          <div>Coatbridge, UK • Global Digital Delivery</div>
          <div className="text-cyan-400 font-mono">Code: FIRST50 for 50% Off</div>
        </div>
      </footer>
    </div>
  );
}
