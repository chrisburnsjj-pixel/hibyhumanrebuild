import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_PROJECTS } from '../data';
import { PortfolioProject } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  TrendingUp,
  Clock,
  ShieldCheck,
} from 'lucide-react';

interface ServicesArcSectionProps {
  onOpenFittingModal: (serviceName?: string) => void;
}

export function ServicesArcSection({ onOpenFittingModal }: ServicesArcSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const total = PORTFOLIO_PROJECTS.length;
  const step = (2 * Math.PI) / total;

  // Rotate to a specific index
  const rotateToIndex = useCallback((targetIndex: number) => {
    const normalized = ((targetIndex % total) + total) % total;
    setCurrentIndex(normalized);
    setRotationAngle(-normalized * step);
  }, [total, step]);

  const handleNext = useCallback(() => {
    rotateToIndex(currentIndex + 1);
  }, [currentIndex, rotateToIndex]);

  const handlePrev = useCallback(() => {
    rotateToIndex(currentIndex - 1);
  }, [currentIndex, rotateToIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch and drag handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    dragStartX.current = clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const diff = clientX - dragStartX.current;
    if (diff > 45) {
      handlePrev();
    } else if (diff < -45) {
      handleNext();
    }
    dragStartX.current = null;
  };

  const currentProject: PortfolioProject = PORTFOLIO_PROJECTS[currentIndex];

  return (
    <section id="services" className="py-12 sm:py-16 bg-slate-950/60 backdrop-blur-md text-slate-100 overflow-hidden relative border-t border-slate-800/80">
      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider mb-2 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>02 / SERVICES & DISCIPLINES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Our Core Services & Technical Disciplines.<br />
              <span className="italic font-normal text-slate-400 block text-lg sm:text-xl lg:text-2xl mt-0.5">From bespoke engineering to global publication.</span>
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/15 border border-amber-400/30 px-3 py-1 rounded-full">
              ✨ 50% Promo: FIRST50
            </span>
            <button
              type="button"
              onClick={() => onOpenFittingModal(`Service Scope: ${currentProject.title} (50% Off)`)}
              className="px-4 py-2 rounded-full text-xs font-black bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,212,255,0.3)]"
            >
              <span>Scope {currentProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Quick Jump Service Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
          {PORTFOLIO_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              type="button"
              onClick={() => rotateToIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-slate-950 font-black shadow-[0_0_15px_rgba(0,212,255,0.4)] ring-2 ring-cyan-400'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="font-mono text-[11px] opacity-70 mr-1.5">{proj.number}</span>
              {proj.title}
            </button>
          ))}
        </div>

        {/* ============================================================ */}
        {/* 3D CURVED DECK CAROUSEL (As in Reference Image)              */}
        {/* Card size is enlarged and styled with prominent gradients   */}
        {/* ============================================================ */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          className="relative w-full h-[490px] sm:h-[550px] lg:h-[580px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing perspective-1000 overflow-visible my-4"
        >
          {/* Subtle curved arc guideline in background */}
          <div className="absolute inset-x-4 sm:inset-x-16 top-1/2 -translate-y-1/2 h-[220px] sm:h-[280px] rounded-[50%] border border-cyan-500/20 pointer-events-none opacity-40" />

          {/* Render 3D Deck Cards */}
          {PORTFOLIO_PROJECTS.map((project, i) => {
            const angle = i * step + rotationAngle;
            const depth = Math.cos(angle);
            const side = Math.sin(angle);
            const scale = 0.76 + (0.24 * (depth + 1)) / 2;
            const opacity = Math.max(0.15, Math.min(1, (depth + 0.4) / 0.75));
            const zIndex = Math.round((depth + 1) * 50);

            // Responsive radius for wide comfortable cards
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 190 : 430;
            const xOffset = side * radius;
            const yOffset = -55 * (1 - depth);
            const rotateY = -side * 28;
            const isCenter = i === currentIndex;

            return (
              <div
                key={project.id}
                onClick={() => rotateToIndex(i)}
                style={{
                  transform: `translate(-50%, -50%) translate(${xOffset}px, ${yOffset}px) scale(${scale}) perspective(1000px) rotateY(${rotateY}deg)`,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                className={`absolute top-1/2 left-1/2 w-[310px] sm:w-[380px] md:w-[410px] rounded-3xl p-6 transition-all duration-500 cursor-pointer ${
                  isCenter
                    ? 'bg-slate-900/95 text-white shadow-[0_20px_50px_rgba(0,212,255,0.25)] ring-2 ring-cyan-400 border border-cyan-500/40'
                    : 'bg-slate-900/75 text-slate-200 shadow-md border border-slate-800/90 hover:border-slate-700'
                }`}
              >
                {/* Top Card Bar: Category Badge & Number */}
                <div className="flex items-center justify-between text-xs mb-4">
                  <span
                    className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[11px] ${
                      isCenter
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {project.category}
                  </span>
                  <span
                    className={`font-mono font-bold text-sm ${
                      isCenter ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    {project.number}
                  </span>
                </div>

                {/* Inner Colored Visual Gradient Hero Box (As shown in image.png) */}
                <div
                  className={`w-full h-44 sm:h-48 rounded-2xl flex flex-col justify-between p-5 relative overflow-hidden mb-5 bg-gradient-to-br ${project.gradient} shadow-inner`}
                >
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Gradient Box Header: Client/Audience + Year */}
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-black/45 text-white backdrop-blur-sm shadow-xs">
                      {project.client}
                    </span>
                    <span className="text-xs font-mono font-medium text-white/90">
                      {project.year}
                    </span>
                  </div>

                  {/* Gradient Box Bottom Metrics */}
                  <div className="relative z-10">
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight block drop-shadow-md">
                      {project.specs.impact}
                    </span>
                    <span className="text-xs text-white/85 font-mono">
                      {project.specs.performance}
                    </span>
                  </div>
                </div>

                {/* Bottom Section: Title, Tech Stack & Circular Arrow Action Button */}
                <div className="flex items-center justify-between gap-3">
                  <div className="pr-2 min-w-0">
                    <h3
                      className={`font-bold text-lg sm:text-xl tracking-tight truncate ${
                        isCenter ? 'text-white' : 'text-slate-100'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-xs mt-1 truncate ${
                        isCenter ? 'text-cyan-300' : 'text-slate-400'
                      }`}
                    >
                      {project.techStack.join(' • ')}
                    </p>
                  </div>

                  <button
                    type="button"
                    aria-label={`Inspect ${project.title}`}
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 cursor-pointer ${
                      isCenter
                        ? 'bg-cyan-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.6)]'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    <span className="text-sm font-bold">↗</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Controls (Prev, Next, Progress Bar) */}
        <div className="flex items-center justify-between mt-6 max-w-sm mx-auto">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous service"
            className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 shadow-sm hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer text-slate-200 hover:border-cyan-500/40"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-cyan-400">
              {currentProject.number}
            </span>
            <div className="w-24 sm:w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-slate-500">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next service"
            className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 shadow-sm hover:bg-slate-800 flex items-center justify-center transition-all cursor-pointer text-slate-200 hover:border-cyan-500/40"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
