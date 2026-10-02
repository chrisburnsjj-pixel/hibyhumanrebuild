import React, { useEffect, useRef, useState } from 'react';

export interface StatItem {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
  sublabel?: string;
}

interface CountUpNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number; // milliseconds
}

/**
 * Animated single number that counts up with cubic easing when entering viewport
 */
export function CountUpNumber({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 2000,
}: CountUpNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          const startTime = performance.now();

          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            // Cubic ease-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = easeOut * value;

            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [value, duration]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue).toString();

  return (
    <span ref={elementRef} className="tabular-nums font-extrabold tracking-tight">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

const DEFAULT_STATS: StatItem[] = [
  {
    value: 99.4,
    decimals: 1,
    suffix: '%',
    label: 'Client Satisfaction',
    sublabel: 'Verified reviews & retention',
  },
  {
    value: 150,
    suffix: '+',
    label: 'Digital Deployments',
    sublabel: 'High-performing production builds',
  },
  {
    value: 4.2,
    decimals: 1,
    suffix: 'x',
    label: 'Average ROI Growth',
    sublabel: 'Measurable conversion lift',
  },
  {
    value: 14,
    suffix: 'ms',
    label: 'Edge TTFB Response',
    sublabel: 'Sub-second global performance',
  },
];

interface CountUpStatsProps {
  stats?: StatItem[];
  className?: string;
  title?: string;
}

export function CountUpStats({
  stats = DEFAULT_STATS,
  className = '',
  title = 'ENGINEERED FOR MEASURABLE IMPACT',
}: CountUpStatsProps) {
  return (
    <div
      className={`relative w-full py-12 sm:py-16 bg-[#030712] border-y border-slate-800/80 ${className}`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
        {title && (
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
              // {title}
            </span>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => (
            <div
              key={`${stat.label}-${idx}`}
              className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/30 transition-all duration-300 flex flex-col items-center text-center group"
            >
              <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 mb-2 group-hover:scale-105 transition-transform duration-300">
                <CountUpNumber
                  value={stat.value}
                  decimals={stat.decimals}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-sm sm:text-base font-bold text-white mb-1">
                {stat.label}
              </div>
              {stat.sublabel && (
                <div className="text-xs text-slate-400">
                  {stat.sublabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CountUpStats;
