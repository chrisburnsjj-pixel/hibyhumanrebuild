import React from 'react';

interface TechTickerProps {
  speed?: number; // duration in seconds
  className?: string;
}

const TECH_ITEMS = [
  'Web Design',
  'Mobile Apps',
  'SEO',
  'Branding',
  'React',
  'Shopify',
  'WordPress',
  'Google Ads',
];

export function TechTicker({ speed = 28, className = '' }: TechTickerProps) {
  return (
    <div
      className={`relative w-full max-w-full overflow-hidden bg-[#030712] py-4 border-y border-slate-800/80 select-none group ${className}`}
      aria-label="Technologies and Services"
    >
      {/* 
        Overflow-hidden parent viewport with gradient mask.
        Clips overflow to keep masked edges strictly aligned with the scrolling container.
      */}
      <div
        className="relative w-full max-w-full overflow-hidden flex items-center"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        }}
      >
        {/*
          Flexbox track container preventing layout shifts (CLS = 0).
          Contains two identical balanced sets (Set A & Set B) translating by exactly -50%.
        */}
        <div className="flex w-max shrink-0 items-center will-change-transform group-hover:[animation-play-state:paused] hbh-marquee-track">
          {/* Set A: Track 1 */}
          <div className="flex shrink-0 items-center gap-8 pr-8">
            {TECH_ITEMS.map((item, index) => (
              <div
                key={`track1-${item}-${index}`}
                className="flex items-center gap-4 text-sm sm:text-base font-mono tracking-wider font-semibold text-slate-300 hover:text-cyan-300 transition-colors duration-200 whitespace-nowrap"
              >
                <span>{item}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Set A: Track 2 (ensures ultra-wide viewports are fully filled before loop) */}
          <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
            {TECH_ITEMS.map((item, index) => (
              <div
                key={`track2-${item}-${index}`}
                className="flex items-center gap-4 text-sm sm:text-base font-mono tracking-wider font-semibold text-slate-300 hover:text-cyan-300 transition-colors duration-200 whitespace-nowrap"
              >
                <span>{item}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Set B: Track 3 (identical copy of Set A for seamless 50% loop) */}
          <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
            {TECH_ITEMS.map((item, index) => (
              <div
                key={`track3-${item}-${index}`}
                className="flex items-center gap-4 text-sm sm:text-base font-mono tracking-wider font-semibold text-slate-300 hover:text-cyan-300 transition-colors duration-200 whitespace-nowrap"
              >
                <span>{item}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>

          {/* Set B: Track 4 (identical copy of Set A for seamless 50% loop) */}
          <div className="flex shrink-0 items-center gap-8 pr-8" aria-hidden="true">
            {TECH_ITEMS.map((item, index) => (
              <div
                key={`track4-${item}-${index}`}
                className="flex items-center gap-4 text-sm sm:text-base font-mono tracking-wider font-semibold text-slate-300 hover:text-cyan-300 transition-colors duration-200 whitespace-nowrap"
              >
                <span>{item}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hbh-marquee-track {
          animation: hbhMarqueeScroll ${speed}s linear infinite;
        }
        @keyframes hbhMarqueeScroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hbh-marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default TechTicker;
