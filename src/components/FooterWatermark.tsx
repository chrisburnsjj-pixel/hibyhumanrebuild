import React from 'react';

/**
 * FooterWatermark
 * 
 * Renders a large, elegant, transparent HiByHuman brand watermark on the right side of the footer.
 * 
 * Features:
 * - Uses the optimized HiByHuman horizontal logo SVG (/images/hibyhuman-logo-horizontal.svg, 169 KB).
 * - Exact opacity: 0.08 (subtle, non-distracting, preserves content contrast).
 * - Positioned absolutely to the right side of the footer with pointer-events: none.
 * - Sits behind all footer content (z-0) with soft cyan & purple ambient glow.
 * - Employs CSS-driven scroll parallax animation using the .hbh-footer-watermark class.
 * - Full prefers-reduced-motion accessibility support.
 */
export function FooterWatermark() {
  return (
    <div
      aria-hidden="true"
      className="absolute right-[-40px] sm:right-[-60px] lg:right-[-80px] xl:right-[-100px] top-1/2 -translate-y-1/2 pointer-events-none z-0 select-none overflow-visible hbh-footer-watermark hidden sm:block"
    >
      {/* Soft cyan & purple ambient glow behind the watermark */}
      <div className="absolute -inset-10 bg-gradient-to-r from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-[90px] pointer-events-none" />

      {/* Optimized Horizontal Logo SVG Watermark */}
      <img
        src="/images/hibyhuman-logo-horizontal.svg"
        alt=""
        width={1409}
        height={922}
        loading="lazy"
        decoding="async"
        className="w-[360px] sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[620px] max-w-none opacity-[0.08] filter drop-shadow-[0_0_40px_rgba(0,200,255,0.35)] drop-shadow-[0_0_70px_rgba(122,44,255,0.25)] mix-blend-screen transform rotate-[-2deg]"
      />
    </div>
  );
}
