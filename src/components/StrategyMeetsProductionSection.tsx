import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Users, 
  Sparkles, 
  Maximize2, 
  X, 
  CheckCircle2, 
  Layers, 
  Video, 
  Code2, 
  Palette, 
  Share2, 
  CalendarCheck, 
  Bug, 
  Headphones, 
  TrendingUp,
  ShieldCheck,
  Globe2,
  Cpu
} from 'lucide-react';

interface StrategyMeetsProductionSectionProps {
  onOpenFittingModal?: () => void;
}

interface PhotoCardState {
  src: string;
  loaded: boolean;
  error: boolean;
}

const PRODUCTION_TEAMS = [
  { name: 'Video Production', icon: Video, formula: 'Ideas → Shoot → Edit → Impact', color: 'from-blue-500/20 to-cyan-500/20' },
  { name: 'Product & Engineering', icon: Code2, formula: 'Build → Improve → Scale', color: 'from-cyan-500/20 to-teal-500/20' },
  { name: 'Design Team', icon: Palette, formula: 'Visuals → Stories → Experiences', color: 'from-fuchsia-500/20 to-purple-500/20' },
  { name: 'Content & Social', icon: Share2, formula: 'Plan → Create → Engage → Grow', color: 'from-pink-500/20 to-rose-500/20' },
  { name: 'Project Management', icon: CalendarCheck, formula: 'Plan → Align → Deliver', color: 'from-emerald-500/20 to-green-500/20' },
  { name: 'QA & Testing', icon: Bug, formula: 'Test → Find → Improve', color: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'Operations & Support', icon: Headphones, formula: 'People → Processes → Progress', color: 'from-violet-500/20 to-indigo-500/20' },
  { name: 'Strategy & Growth', icon: TrendingUp, formula: 'Analyze → Strategize → Expand', color: 'from-sky-500/20 to-blue-500/20' },
];

const BOARDROOM_VALUES = [
  { title: 'Global Solutions', desc: 'Enterprise architecture scaling across US, UK & EMEA markets.' },
  { title: 'Real Impact', desc: 'Direct commercial growth with measurable conversion benchmarks.' },
  { title: 'Human Ideas', desc: 'Creative vision leading technology, never replacing humanity.' },
  { title: 'Ethical Tech', desc: 'Sustainable, transparent development with 100% IP ownership.' },
];

export function StrategyMeetsProductionSection({ onOpenFittingModal }: StrategyMeetsProductionSectionProps) {
  const [boardroomSrc, setBoardroomSrc] = useState('/images/hibyhuman-boardroom.webp');
  const [productionSrc, setProductionSrc] = useState('/images/hibyhuman-production-team.webp');

  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string; subtitle: string } | null>(null);

  // Check photo availability on mount
  useEffect(() => {
    fetch('/api/team-photos-status')
      .then((res) => res.json())
      .then((data) => {
        if (data.boardroom) {
          if (data.boardroom.webp) setBoardroomSrc('/images/hibyhuman-boardroom.webp');
          else if (data.boardroom.png) setBoardroomSrc('/images/hibyhuman-boardroom.png');
        }
        if (data.production) {
          if (data.production.webp) setProductionSrc('/images/hibyhuman-production-team.webp');
          else if (data.production.png) setProductionSrc('/images/hibyhuman-production-team.png');
        }
      })
      .catch(() => {
        // Silently use defaults
      });
  }, []);

  return (
    <section id="strategy-production" className="relative py-24 sm:py-32 bg-slate-950/40 backdrop-blur-sm text-slate-100 overflow-hidden border-t border-slate-800/60">
      {/* Subtle ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-600/10 via-fuchsia-600/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-fuchsia-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wide uppercase mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Actual Studio Photography • Zero Artificial Enhancement</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6">
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400">Strategy</span> Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-300 to-blue-400">Production</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From strategic thinking and creative direction to production and delivery, HiByHuman brings its teams together to build meaningful digital experiences for ambitious brands.
          </p>
        </div>

        {/* Dual High-Impact Photographic Showcase */}
        <div className="space-y-20 sm:space-y-24">
          
          {/* Showcase 1: The Executive Boardroom */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-sm overflow-hidden p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hbh-card-sheen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Photograph with Zero CLS Container */}
              <div className="lg:col-span-7">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 aspect-[16/9] shadow-2xl hbh-image-container">
                  {/* Aspect ratio frame ensures zero CLS */}
                  <img
                    src={boardroomSrc}
                    alt="HiByHuman boardroom and strategy meeting space"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer"
                    onClick={() => setLightboxImage({
                      src: boardroomSrc,
                      title: 'Executive Boardroom & Leadership Advisory',
                      subtitle: 'Global Solutions • Real Impact • Built for the Next Digital Era'
                    })}
                  />

                  {/* Expand Overlay Button */}
                  <button
                    onClick={() => setLightboxImage({
                      src: boardroomSrc,
                      title: 'Executive Boardroom & Leadership Advisory',
                      subtitle: 'Global Solutions • Real Impact • Built for the Next Digital Era'
                    })}
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg"
                    aria-label="View Boardroom photograph full screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>View High-Res</span>
                  </button>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-cyan-300 font-semibold flex items-center gap-1.5 pointer-events-none">
                    <ShieldCheck className="w-3 h-3 text-cyan-400" />
                    <span>BOARDROOM • EXECUTIVE GOVERNANCE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Strategic Details */}
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Strategic Leadership</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  Executive Boardroom & Leadership Advisory
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Where high-level enterprise roadmaps and technological futures are architected. Our executive directors and industry advisors meet across global time zones to ensure every project aligns with commercial scalability, digital security, and long-term sustainability.
                </p>

                {/* Core Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {BOARDROOM_VALUES.map((val, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-xs font-bold text-cyan-300 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{val.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 leading-snug">{val.desc}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenFittingModal}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center gap-2 cursor-pointer hbh-btn-motion"
                  >
                    <span>Schedule Strategic Consultation</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Showcase 2: The Production Department */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800/90 backdrop-blur-sm overflow-hidden p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] hbh-card-sheen">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Department Description & Roster */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/30 text-fuchsia-400 text-xs font-semibold uppercase tracking-wider mb-4">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Technical Execution</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight">
                  Full-Spectrum Production Department
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  <strong className="text-white font-semibold">Different Teams. One Vision.</strong> Our in-house technical and creative divisions operate in synchronized agile sprints. From raw cinematic video production and custom engineering to rigorous QA testing, your deliverables are created by dedicated professionals without third-party outsourcing.
                </p>

                {/* 8 Disciplines Pill Matrix */}
                <div className="grid grid-cols-2 gap-2.5 mb-8">
                  {PRODUCTION_TEAMS.map((team, idx) => {
                    const Icon = team.icon;
                    return (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-200 mb-0.5">
                          <Icon className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                          <span className="truncate">{team.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 font-mono tracking-tight">{team.formula}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenFittingModal}
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] flex items-center gap-2 cursor-pointer hbh-btn-motion"
                  >
                    <span>Scope Your Sprint Deliverables</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Photograph with Zero CLS Container */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-700/60 bg-slate-950 aspect-[16/10] shadow-2xl hbh-image-container">
                  {/* Aspect ratio frame ensures zero CLS */}
                  <img
                    src={productionSrc}
                    alt="HiByHuman production team working in the office"
                    width={1440}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02] cursor-pointer"
                    onClick={() => setLightboxImage({
                      src: productionSrc,
                      title: 'Full-Spectrum Production Department',
                      subtitle: 'Different Teams • One Vision • 8 Integrated Execution Disciplines'
                    })}
                  />

                  {/* Expand Overlay Button */}
                  <button
                    onClick={() => setLightboxImage({
                      src: productionSrc,
                      title: 'Full-Spectrum Production Department',
                      subtitle: 'Different Teams • One Vision • 8 Integrated Execution Disciplines'
                    })}
                    className="absolute bottom-4 right-4 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur-md border border-slate-700 text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-900 transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1.5 shadow-lg"
                    aria-label="View Production Department photograph full screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5 text-fuchsia-400" />
                    <span>View High-Res</span>
                  </button>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-fuchsia-300 font-semibold flex items-center gap-1.5 pointer-events-none">
                    <Layers className="w-3 h-3 text-fuchsia-400" />
                    <span>PRODUCTION • 8 INTEGRATED DISCIPLINES</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full-Screen High-Resolution Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white transition-colors cursor-pointer z-10"
              aria-label="Close high-res lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="max-w-6xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-black">
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="w-full max-h-[80vh] object-contain mx-auto"
                />
              </div>

              <div className="mt-4 text-center">
                <h4 className="text-white font-bold text-lg">{lightboxImage.title}</h4>
                <p className="text-slate-400 text-xs font-mono mt-1">{lightboxImage.subtitle}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
