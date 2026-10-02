import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ZoomIn,
  X,
  CheckCircle2,
  Phone,
  Search,
  Filter,
  Layers,
  Award,
  ExternalLink,
} from 'lucide-react';
import { PORTFOLIO_WORKS, ShowcaseWork } from './PortfolioShowcaseSection';
import { STUDIO_INFO } from '../data';
import { HiByHumanLogo } from './Logo';

interface PortfolioArchivePageProps {
  onBackToHome: () => void;
  onOpenFittingModal: (projectName?: string) => void;
  onNavigateCaseStudies?: () => void;
}

const CATEGORIES = [
  'All',
  'Web & Apps',
  'Growth & PPC',
  'Branding',
  'Packaging',
  'Social Media',
] as const;

export function PortfolioArchivePage({
  onBackToHome,
  onOpenFittingModal,
  onNavigateCaseStudies,
}: PortfolioArchivePageProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalWork, setActiveModalWork] = useState<ShowcaseWork | null>(null);

  const filteredWorks = PORTFOLIO_WORKS.filter((work) => {
    const matchesCategory = activeCategory === 'All' || work.category === activeCategory;
    const matchesSearch =
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-slate-950">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <HiByHumanLogo size="sm" theme="dark" animated={true} brandName="HiByHuman" />
          </div>

          <div className="flex items-center gap-3">
            {onNavigateCaseStudies && (
              <button
                type="button"
                onClick={onNavigateCaseStudies}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-cyan-400 font-mono transition-colors cursor-pointer"
              >
                <span>Case Studies</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                  Inner
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onOpenFittingModal('General Portfolio Project Inquiry')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              Scope My Project (50% Off)
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="relative py-16 sm:py-20 border-b border-slate-900 overflow-hidden bg-gradient-to-b from-slate-900/40 to-slate-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-[1500px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPLETE CREATIVE & TECHNICAL ARCHIVE • INNER PAGE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Full Portfolio & Commercial Deliverables
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              A comprehensive archive of bespoke web systems, luxury branding suites, high-yield PPC campaigns, and commercial packaging engineered for high-growth enterprises worldwide.
            </p>

            <div className="flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <CheckCircle2 className="w-4 h-4" /> 100% Bespoke Code & Vector Assets
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <Award className="w-4 h-4" /> Verified Commercial Growth Metrics
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-4 h-4" /> 50% Promo Applicable: FIRST50
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-[1500px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredWorks.map((work, idx) => (
            <div
              key={work.id}
              onClick={() => setActiveModalWork(work)}
              className={`rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-400/80 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer shadow-lg hbh-card-motion hbh-card-sheen ${
                idx === 0 ? 'hbh-card-sheen-periodic' : ''
              }`}
            >
              <div>
                <div className="relative aspect-video w-full overflow-hidden bg-slate-950 hbh-image-container">
                  <img
                    src={work.image}
                    alt={work.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hbh-image-scale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                  <div className="absolute top-3 left-3 z-10 flex gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-cyan-400 text-[11px] font-mono border border-cyan-500/30">
                      {work.category}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan-400 text-slate-950 text-[11px] font-mono font-bold">
                      {work.stats}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-sm">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-xs text-cyan-400 font-mono font-semibold mb-1">
                    {work.client} • {work.year}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {work.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {work.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {work.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFittingModal(`Inquiry about ${work.title} (50% First Order Promo)`);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <span>Scope Similar Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] text-slate-500 font-mono">100% Bespoke</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-slate-900 to-slate-950 border border-cyan-800/40 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Have an Ambitious Project in Mind?</h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Claim 50% discount on your initial sprint with promo code <span className="font-mono text-cyan-400 font-bold">FIRST50</span>.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onOpenFittingModal('Portfolio Page Direct Inquiry')}
              className="px-6 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Start Free Consultation (50% Off)
            </button>
            <button
              type="button"
              onClick={onBackToHome}
              className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 transition-colors cursor-pointer"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalWork && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl my-8">
            <button
              type="button"
              onClick={() => setActiveModalWork(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 mb-6 relative">
              <img
                src={activeModalWork.image}
                alt={activeModalWork.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/90 text-cyan-400 px-3 py-1 rounded-lg text-xs font-mono font-bold border border-cyan-800">
                {activeModalWork.stats}
              </div>
            </div>

            <div className="text-xs text-cyan-400 font-mono mb-1">
              {activeModalWork.client} • {activeModalWork.year} • {activeModalWork.category}
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{activeModalWork.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {activeModalWork.description}
            </p>

            {activeModalWork.deliverables && (
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Scope Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeModalWork.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {activeModalWork.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  const title = activeModalWork.title;
                  setActiveModalWork(null);
                  onOpenFittingModal(`Inquiry about ${title} (50% Off Promo)`);
                }}
                className="px-6 py-2.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Inquire About Similar Architecture (50% Off)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
