import React, { useEffect, useRef, useState } from 'react';
import { Gauge, Sparkles } from 'lucide-react';

export interface ProgressBarItem {
  label: string;
  percentage: number; // 0 to 100
  metric?: string;
  description?: string;
}

const DEFAULT_METRICS: ProgressBarItem[] = [
  {
    label: 'Core Web Vitals & Pass Rate',
    percentage: 100,
    metric: '100 / 100',
    description: 'Zero Cumulative Layout Shift (CLS) & instantaneous First Input Delay (FID)',
  },
  {
    label: 'Google Lighthouse Performance',
    percentage: 98,
    metric: '98 / 100',
    description: 'Sub-second Largest Contentful Paint (LCP) across desktop and mobile devices',
  },
  {
    label: 'Mobile Viewport Usability',
    percentage: 100,
    metric: '100%',
    description: 'Pixel-perfect responsiveness across iOS, Android, and tablets',
  },
  {
    label: 'Search Engine Indexation & Rich Snippets',
    percentage: 99,
    metric: '99%',
    description: 'Schema.org JSON-LD structured data and semantic HTML5 hierarchy',
  },
];

interface ProgressBarsProps {
  items?: ProgressBarItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ProgressBars({
  items = DEFAULT_METRICS,
  title = 'PRODUCTION BENCHMARKS',
  subtitle = 'Engineered for uncompromising technical perfection',
  className = '',
}: ProgressBarsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full py-12 sm:py-16 bg-[#030712] text-slate-100 ${className}`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider mb-2 shadow-[0_0_10px_rgba(34,211,238,0.2)]">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" />
              <span>{title}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Measurable Performance Standards
            </h3>
          </div>
          {subtitle && (
            <p className="text-slate-400 text-sm sm:text-base max-w-md">
              {subtitle}
            </p>
          )}
        </div>

        {/* Progress Bars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {items.map((item, index) => {
            const scale = isVisible ? item.percentage / 100 : 0;
            return (
              <div
                key={`${item.label}-${index}`}
                className="p-5 sm:p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm sm:text-base font-bold text-white">
                      {item.label}
                    </span>
                    <span className="text-sm font-mono font-extrabold text-cyan-400">
                      {item.metric || `${item.percentage}%`}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {/* Progress Bar Track */}
                <div className="relative w-full h-2.5 sm:h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden">
                  {/* Fill Bar - Animates purely with GPU transform scaleX */}
                  <div
                    className="absolute inset-0 h-full w-full rounded-full bg-gradient-to-r from-[#22d3ee] to-[#8b5cf6] origin-left will-change-transform shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                    style={{
                      transform: `scaleX(${scale})`,
                      transition: `transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressBars;
