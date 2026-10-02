import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, ShieldCheck, Sparkles, Pause, Play } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { TESTIMONIALS_DATA } from '../data';

export interface TestimonialSlideData {
  id: string;
  author: string;
  role: string;
  company: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
  avatarInitials?: string;
}

interface TestimonialSliderProps {
  autoPlayInterval?: number;
  className?: string;
  title?: string;
  subtitle?: string;
}

export function TestimonialSlider({
  autoPlayInterval = 6000,
  className = '',
  title = 'CLIENT VOICES & EXECUTIVE ENDORSEMENTS',
  subtitle = 'Continuous delivery measured by real-world business outcomes',
}: TestimonialSliderProps) {
  const { testimonials } = useCMS();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);

  // Normalize testimonials from CMS or static fallback
  const items: TestimonialSlideData[] = React.useMemo(() => {
    if (testimonials && testimonials.length > 0) {
      const active = testimonials.filter((t) => t.isActive);
      if (active.length > 0) {
        return active.map((t) => ({
          id: t.id,
          author: t.author,
          role: t.role,
          company: t.company,
          quote: t.quote,
          rating: t.rating || 5,
          avatarUrl: t.avatarUrl,
          avatarInitials: t.author
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase(),
        }));
      }
    }

    return TESTIMONIALS_DATA.map((t) => ({
      id: t.id,
      author: t.author,
      role: t.role,
      company: t.company,
      quote: t.quote,
      rating: t.rating || 5,
      avatarInitials: t.avatarInitials || (t.author ? t.author.slice(0, 2).toUpperCase() : 'HB'),
    }));
  }, [testimonials]);

  const count = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % count);
  }, [count]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + count) % count);
  }, [count]);

  const goToSlide = (idx: number) => {
    setCurrentIndex(idx % count);
  };

  // Auto-rotation with pause-on-hover & reduced motion check
  useEffect(() => {
    if (count <= 1 || isPaused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    timerRef.current = window.setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [count, isPaused, autoPlayInterval, nextSlide]);

  if (count === 0) return null;

  const activeItem = items[currentIndex] || items[0];

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  return (
    <section
      aria-label="Client Testimonials Slider"
      className={`relative py-16 sm:py-24 overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-3 shadow-[0_0_12px_rgba(0,212,255,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{title}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-400 font-sans max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Controls: Prev, Next & Pause/Play */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? 'Resume auto-rotation' : 'Pause auto-rotation'}
              className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-cyan-500/40 cursor-pointer shadow-sm"
              title={isPaused ? 'Resume slideshow' : 'Pause slideshow'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous quote"
              className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-cyan-500/40 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next quote"
              className="w-9 h-9 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800 hover:border-cyan-500/40 cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Showcase Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/90 to-slate-900/90 border border-slate-800/90 p-7 sm:p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden min-h-[320px] flex flex-col justify-between">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          {/* Watermark Quote Icon */}
          <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-20 h-20 text-cyan-400/10 pointer-events-none" />

          {/* Top Meta: Stars & Slide Counter */}
          <div className="flex items-center justify-between gap-4 mb-6 z-10">
            <div className="flex items-center gap-1.5">
              {[...Array(activeItem.rating || 5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]" />
              ))}
              <span className="ml-2 px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-medium flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-cyan-400" />
                Verified Engagement
              </span>
            </div>

            <div className="text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-bold">{currentIndex + 1}</span>
              <span className="opacity-40"> / </span>
              <span>{count}</span>
            </div>
          </div>

          {/* Quote Body with Animated Transition */}
          <div className="relative z-10 my-auto py-2">
            <blockquote
              key={activeItem.id}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-slate-100 font-normal leading-relaxed italic transition-opacity duration-500 ease-out"
            >
              &ldquo;{activeItem.quote}&rdquo;
            </blockquote>
          </div>

          {/* Author Details & Progress Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 mt-6 border-t border-slate-800/80 z-10">
            <div className="flex items-center gap-3.5">
              {activeItem.avatarUrl ? (
                <img
                  src={activeItem.avatarUrl}
                  alt={activeItem.author}
                  className="w-12 h-12 rounded-full object-cover border border-cyan-500/40 shadow-sm"
                  onError={(e) => {
                    // Fallback to initials if image fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-sm shadow-[0_0_12px_rgba(0,212,255,0.2)]">
                  {activeItem.avatarInitials}
                </div>
              )}
              <div>
                <h4 className="font-semibold text-white text-base tracking-tight">
                  {activeItem.author}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 font-mono">
                  {activeItem.role} &bull; <span className="text-cyan-300/90">{activeItem.company}</span>
                </p>
              </div>
            </div>

            {/* Dot Navigation Indicators */}
            <div className="flex items-center gap-2">
              {items.map((item, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    aria-label={`Jump to quote by ${item.author}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'w-8 bg-gradient-to-r from-cyan-400 to-fuchsia-500 shadow-[0_0_10px_rgba(0,212,255,0.7)]'
                        : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default TestimonialSlider;
