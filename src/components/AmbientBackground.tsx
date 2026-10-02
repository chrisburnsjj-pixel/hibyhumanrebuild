import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * AmbientBackground
 * 
 * Reusable, ultra-lightweight, 3-layer CSS ambient particle and depth atmosphere:
 * - In Dark Mode: Deep midnight navy / near-black base with electric cyan, purple, and blue ambient glows.
 * - In Light Mode: Premium luminous canvas shifting gracefully from Light Blue -> Light Purple -> Light Pink
 *   as the user scrolls down, layered with a continuous parallax gradient mesh and crystalline soft card surfaces.
 * 
 * Performance & Accessibility Guarantees:
 * - Pure CSS radial/linear gradients (NO canvas, NO WebGL, NO heavy animation scripts).
 * - Modern CSS scroll-driven parallax timeline (`animation-timeline: scroll(root)`) with graceful fallback.
 * - Hardware-accelerated GPU transforms only (translate3d/opacity).
 * - Full `prefers-reduced-motion` support.
 * - Strict `pointer-events: none` and `-z-10` behind all foreground content.
 */
export function AmbientBackground() {
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [hasScrollTimeline, setHasScrollTimeline] = useState<boolean>(true);

  useEffect(() => {
    const supportsScrollTimeline =
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      (CSS.supports('animation-timeline: scroll()') || CSS.supports('animation-timeline: scroll(root)'));
    setHasScrollTimeline(Boolean(supportsScrollTimeline));
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* ══════════════════════════════════════════════════════════════
          BASE LAYER: THEME-RESPONSIVE FOUNDATION
          Dark Mode: #030712 deep space.
          Light Mode: Luminous multi-stage gradient (Light Blue -> Light Purple -> Light Pink)
          ══════════════════════════════════════════════════════════════ */}
      {isLight ? (
        <div className="absolute inset-0 hbh-light-scroll-canvas pointer-events-none" />
      ) : (
        <div className="absolute inset-0 bg-[#030712] pointer-events-none" />
      )}

      {/* ══════════════════════════════════════════════════════════════
          LAYER 3: SOFT AMBIENT RADIAL GLOWS (Moves across scroll)
          In Light Mode: Light Blue (Top) -> Soft Lilac/Purple (Middle) -> Rose/Light Pink (Lower)
          ══════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out ${
          hasScrollTimeline ? 'hbh-parallax-glow' : 'hbh-ambient-glow-static'
        }`}
      >
        {isLight ? (
          <>
            {/* Top Region: Luminous Electric Soft Cyan / Light Blue Orb */}
            <div
              className="absolute -top-[5%] left-[8%] w-[750px] h-[750px] rounded-full opacity-60 blur-[140px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(186, 230, 253, 0.85) 0%, rgba(224, 242, 254, 0.4) 45%, transparent 70%)',
              }}
            />
            {/* Mid Region: Soft Ethereal Lilac / Light Purple Orb */}
            <div
              className="absolute top-[32%] -right-[8%] w-[800px] h-[800px] rounded-full opacity-55 blur-[160px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(233, 213, 255, 0.8) 0%, rgba(243, 232, 255, 0.45) 50%, transparent 75%)',
              }}
            />
            {/* Mid-Lower Region: Radiant Light Fuchsia Glow */}
            <div
              className="absolute top-[60%] left-[5%] w-[720px] h-[720px] rounded-full opacity-50 blur-[150px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(251, 207, 232, 0.75) 0%, rgba(253, 242, 248, 0.4) 50%, transparent 70%)',
              }}
            />
            {/* Bottom Region: Elegant Soft Light Pink & Rose Glow */}
            <div
              className="absolute -bottom-[5%] right-[12%] w-[850px] h-[850px] rounded-full opacity-60 blur-[160px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(254, 205, 211, 0.8) 0%, rgba(255, 228, 230, 0.45) 45%, transparent 75%)',
              }}
            />
          </>
        ) : (
          <>
            {/* Subtle Cyan Ambient Radial Field */}
            <div
              className="absolute -top-[10%] left-[10%] w-[650px] h-[650px] rounded-full opacity-[0.08] blur-[140px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0, 200, 255, 0.9) 0%, rgba(0, 200, 255, 0) 70%)',
              }}
            />
            {/* Subtle Violet / Purple Ambient Field */}
            <div
              className="absolute top-[35%] -right-[5%] w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[160px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(122, 44, 255, 0.85) 0%, rgba(122, 44, 255, 0) 70%)',
              }}
            />
            {/* Subtle Deep Electric Blue Field */}
            <div
              className="absolute bottom-[10%] left-[15%] w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[150px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(0, 140, 255, 0.8) 0%, rgba(0, 140, 255, 0) 70%)',
              }}
            />
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          LAYER 1: TINY SUBTLE PARTICLES (Micro dots, parallax depth)
          ══════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute -inset-[30px] pointer-events-none ${
          hasScrollTimeline ? 'hbh-parallax-dots-layer1' : 'hbh-dots-layer1-static'
        }`}
      />

      {/* ══════════════════════════════════════════════════════════════
          LAYER 2: SPARSE NODES (Sparse particles, subtle parallax)
          ══════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute -inset-[30px] pointer-events-none ${
          hasScrollTimeline ? 'hbh-parallax-dots-layer2' : 'hbh-dots-layer2-static'
        }`}
      />

      {/* ══════════════════════════════════════════════════════════════
          PERSPECTIVE DIGITAL MICRO-GRID
          ══════════════════════════════════════════════════════════════ */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          isLight ? 'opacity-[0.035]' : 'opacity-[0.035]'
        }`}
        style={{
          backgroundImage: isLight
            ? `
                linear-gradient(to right, rgba(2, 132, 199, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(147, 51, 234, 0.35) 1px, transparent 1px)
              `
            : `
                linear-gradient(to right, rgba(0, 200, 255, 0.35) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 200, 255, 0.35) 1px, transparent 1px)
              `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
        }}
      />
    </div>
  );
}
