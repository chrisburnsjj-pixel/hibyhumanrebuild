import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PORTFOLIO_PROJECTS } from '../data';
import { PortfolioProject } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  Layers,
  TrendingUp,
  Clock,
  Gauge
} from 'lucide-react';

interface OrbitPortfolioProps {
  onOpenFittingModal: (projectName?: string) => void;
}

export function OrbitPortfolio({ onOpenFittingModal }: OrbitPortfolioProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const total = PORTFOLIO_PROJECTS.length;
  const step = (2 * Math.PI) / total;

  // Rotate to a specific index
  const rotateToIndex = useCallback((targetIndex: number) => {
    const normalized = (targetIndex % total + total) % total;
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
    if (diff > 40) {
      handlePrev();
    } else if (diff < -40) {
      handleNext();
    }
    dragStartX.current = null;
  };

  const currentProject: PortfolioProject = PORTFOLIO_PROJECTS[currentIndex];

  return (
    <section id="work" className="py-20 sm:py-28 bg-[#f5f5f3]/85 backdrop-blur-[2px] text-slate-900 overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE CAPABILITIES & SPECIALISED DELIVERABLES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
              Multi-Disciplinary Craft.<br />
              <em className="italic font-serif text-slate-700">From concept to global publication.</em>
            </h2>
          </div>
          <p className="text-slate-600 max-w-sm text-sm sm:text-base leading-relaxed">
            From bespoke website design and mobile apps to investor pitch decks, social media growth, illustrations, ghostwriting, and book publishing.
          </p>
        </div>

        {/* Quick Jump Service Badges */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none no-scrollbar">
          {PORTFOLIO_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => rotateToIndex(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-sky-400'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        {/* 3D Orbit Stage */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
          className="relative w-full h-[430px] sm:h-[490px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing perspective-1000 overflow-visible"
        >
          {/* Subtle orbit ring visual in background */}
          <div className="absolute inset-x-8 sm:inset-x-20 top-1/2 -translate-y-1/2 h-[190px] sm:h-[230px] rounded-[50%] border border-slate-300/70 pointer-events-none opacity-60" />

          {/* Render Orbit Cards */}
          {PORTFOLIO_PROJECTS.map((project, i) => {
            const angle = i * step + rotationAngle;
            const depth = Math.cos(angle);
            const side = Math.sin(angle);
            const scale = 0.72 + 0.28 * (depth + 1) / 2;
            const opacity = Math.max(0.2, Math.min(1, (depth + 0.35) / 0.7));
            const zIndex = Math.round((depth + 1) * 50);

            // Dynamic responsive radius for 10 cards
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 180 : 380;
            const xOffset = side * radius;
            const yOffset = -45 * (1 - depth);
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
                className={`absolute top-1/2 left-1/2 w-[280px] sm:w-[320px] rounded-3xl p-5 transition-all duration-500 cursor-pointer ${
                  isCenter
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-sky-400/80 shadow-sky-500/25'
                    : 'bg-white text-slate-800 shadow-md border border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Top Card Bar */}
                <div className="flex items-center justify-between text-xs mb-3.5">
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider text-[10px] ${
                    isCenter ? 'bg-sky-500/25 text-sky-300' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {project.category}
                  </span>
                  <span className="font-mono font-bold text-xs opacity-60">
                    {project.number}
                  </span>
                </div>

                {/* Card Visual Hero Area */}
                <div className={`w-full h-36 rounded-2xl flex flex-col justify-between p-4 relative overflow-hidden mb-4 bg-gradient-to-br ${project.gradient}`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-black/40 text-white/90 backdrop-blur-sm">
                      {project.client}
                    </span>
                    <span className="text-[11px] font-mono text-white/80">
                      {project.year}
                    </span>
                  </div>
                  <div className="relative z-10">
                    <span className="text-xs font-bold text-white tracking-wide block drop-shadow-sm">
                      {project.specs.impact}
                    </span>
                    <span className="text-[10.5px] text-white/80 font-mono">
                      {project.specs.performance}
                    </span>
                  </div>
                </div>

                {/* Card Labels */}
                <div className="flex items-center justify-between">
                  <div className="pr-2">
                    <h3 className={`font-bold text-base tracking-tight truncate ${isCenter ? 'text-white' : 'text-slate-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs mt-0.5 line-clamp-1 ${isCenter ? 'text-sky-300' : 'text-slate-500'}`}>
                      {project.techStack.join(' • ')}
                    </p>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    isCenter ? 'bg-sky-500 text-slate-950 font-bold' : 'bg-slate-100 text-slate-700'
                  }`}>
                    ↗
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Orbit Controls (Prev, Next, Progress Bar) */}
        <div className="flex items-center justify-between mt-6 max-w-sm mx-auto">
          <button
            onClick={handlePrev}
            aria-label="Previous project"
            className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer text-slate-700"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-slate-900">
              {currentProject.number}
            </span>
            <div className="w-24 sm:w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
            <span className="font-mono text-xs font-bold text-slate-400">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={handleNext}
            aria-label="Next project"
            className="w-11 h-11 rounded-full bg-white border border-slate-200 shadow-sm hover:bg-slate-100 flex items-center justify-center transition-all cursor-pointer text-slate-700"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Current Selected Project Detailed Breakdown Box */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  {currentProject.category}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs text-slate-500 font-mono">
                  Client: {currentProject.client} ({currentProject.year})
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                {currentProject.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                {currentProject.description}
              </p>

              {/* Key Deliverables List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
                {currentProject.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Specs Column */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between gap-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                  <div className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
                    <Layers className="w-3 h-3 text-sky-500" /> Platform
                  </div>
                  <div className="font-bold text-slate-900 mt-1 text-xs truncate">{currentProject.specs.platform}</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                  <div className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-500" /> Timeline
                  </div>
                  <div className="font-bold text-slate-900 mt-1 text-xs">{currentProject.specs.timeline}</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                  <div className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
                    <Gauge className="w-3 h-3 text-emerald-500" /> Performance
                  </div>
                  <div className="font-bold text-slate-900 mt-1 text-xs">{currentProject.specs.performance}</div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/60 shadow-xs">
                  <div className="text-slate-400 font-mono text-[10px] uppercase flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-blue-500" /> Impact
                  </div>
                  <div className="font-bold text-slate-900 mt-1 text-xs">{currentProject.specs.impact}</div>
                </div>
              </div>

              <button
                onClick={() => onOpenFittingModal(currentProject.title)}
                className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Request Proposal for Similar Scope</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
