import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Sparkles, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_WORKS, ShowcaseWork } from './PortfolioShowcaseSection';

export interface PortfolioCardItem {
  id: string;
  title: string;
  client: string;
  category: string;
  image: string;
  summary: string;
  metrics: string;
  tags?: string[];
  link?: string;
}

const DEFAULT_CARDS: PortfolioCardItem[] = PORTFOLIO_WORKS.slice(0, 6).map((w) => ({
  id: w.id,
  title: w.title,
  client: w.client,
  category: w.category,
  image: w.image,
  summary: w.description,
  metrics: w.stats,
  tags: w.tags,
}));

interface PortfolioCardsProps {
  items?: PortfolioCardItem[];
  title?: string;
  subtitle?: string;
  onSelectProject?: (item: PortfolioCardItem) => void;
  className?: string;
}

export function PortfolioCards({
  items = DEFAULT_CARDS,
  title = 'FEATURED CLIENT DEPLOYMENTS',
  subtitle = 'Hover to explore production architecture, design metrics, and case studies',
  onSelectProject,
  className = '',
}: PortfolioCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardsInView, setCardsInView] = useState<boolean[]>(new Array(items.length).fill(false));

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCardsInView(new Array(items.length).fill(true));
      return;
    }

    const cardElements = el.querySelectorAll('[data-portfolio-card]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(index)) {
              setCardsInView((prev) => {
                const next = [...prev];
                next[index] = true;
                return next;
              });
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    cardElements.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [items]);

  return (
    <section
      id="work"
      ref={containerRef}
      className={`relative w-full py-16 sm:py-24 bg-[#030712] text-slate-100 ${className}`}
    >
      <div id="portfolio" className="absolute -top-24 pointer-events-none" />
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider mb-3 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{title}</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
              Motion-Enhanced Portfolio Grid
            </h3>
          </div>
          {subtitle && (
            <p className="text-slate-400 text-sm sm:text-base max-w-md">
              {subtitle}
            </p>
          )}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {items.map((card, index) => {
            const isVisible = cardsInView[index];

            return (
              <div
                key={card.id}
                data-portfolio-card
                data-index={index}
                onClick={() => onSelectProject && onSelectProject(card)}
                className={`group relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-900 cursor-pointer will-change-transform ${
                  onSelectProject ? 'focus:outline-hidden focus:ring-2 focus:ring-cyan-500' : ''
                }`}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translate3d(0, 0, 0)' : 'translate3d(0, 36px, 0)',
                  transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
                }}
              >
                {/* 1. Project Image with slight hover zoom */}
                <div className="absolute inset-0 w-full h-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-top will-change-transform transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Base Gradient Overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-90" />
                </div>

                {/* 2. Top Badges */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between pointer-events-none z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-slate-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30">
                    {card.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-slate-300 group-hover:text-cyan-400 group-hover:border-cyan-500/50 transition-colors duration-300">
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* 3. Static Bottom Info (Client + Metric) */}
                <div className="absolute bottom-6 left-6 right-6 z-10 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                  <p className="text-xs font-mono text-cyan-400 font-bold mb-1">
                    {card.client}
                  </p>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                    {card.title}
                  </h4>
                  <div className="inline-block text-xs font-mono px-2.5 py-1 rounded-md bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-semibold">
                    {card.metrics}
                  </div>
                </div>

                {/* 4. Slide-up Details Overlay on Hover */}
                <div
                  className="absolute inset-x-0 bottom-0 p-6 z-20 bg-slate-950/95 backdrop-blur-xl border-t border-cyan-500/30 will-change-transform transition-all duration-400 ease-out translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex flex-col justify-between"
                  style={{ minHeight: '62%' }}
                >
                  <div>
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                      {card.client} // {card.category}
                    </span>
                    <h4 className="text-xl font-bold text-white mb-2 leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                      {card.summary}
                    </p>

                    {card.tags && card.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {card.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2 py-0.5 rounded-sm bg-slate-900 border border-slate-800 text-slate-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {card.metrics}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white group-hover:text-cyan-400 transition-colors">
                      <span>View Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PortfolioCards;
