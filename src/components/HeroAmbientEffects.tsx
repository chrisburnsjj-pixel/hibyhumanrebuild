import React, { useEffect, useRef } from 'react';

interface HeroAmbientEffectsProps {
  accentColor?: string;
}

/**
 * HeroAmbientEffects
 * 
 * Provides the cinematic background atmosphere, infrequent light sweep,
 * desktop-only micro-parallax (2-5px maximum), and organic curved bottom transition.
 * 
 * Performance & Accessibility Guarantees:
 * - Direct GPU transform updates via requestAnimationFrame (zero React re-renders)
 * - Uses only transform and opacity
 * - Completely disabled on mobile, touch devices, and prefers-reduced-motion
 * - Strict pointer-events: none to avoid blocking interactions
 * - Zero layout shift / CLS impact
 */
export function HeroAmbientEffects({ accentColor = '#0066ff' }: HeroAmbientEffectsProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if pointer is fine (desktop mouse) and motion is not reduced
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion || !parallaxRef.current) {
      return;
    }

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate micro-offset: maximum 2-4px movement (strictly subtle)
      targetX = ((e.clientX / window.innerWidth) - 0.5) * 6;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * 6;

      if (rafId === null) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const updateParallax = () => {
      // Smooth lerp for ultra-subtle fluid glide
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      }

      // Continue animating until settled
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* ══════════════════════════════════════════════════════════════
          1. PARALLAX ATMOSPHERIC GLOW ORBS & AMBIENT OVERLAY
          ══════════════════════════════════════════════════════════════ */}
      <div
        ref={parallaxRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-[2] overflow-hidden select-none will-change-transform"
      >
        {/* Dynamic Slide Accent Core Glow */}
        <div
          className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[720px] h-[520px] rounded-full blur-[170px] opacity-15 pointer-events-none transition-colors duration-1000"
          style={{ backgroundColor: accentColor }}
        />

        {/* Ambient Gradient Glow Zone 1: Electric Cyan (Top Left / Center) */}
        <div className="absolute -top-12 -left-12 w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-br from-cyan-400/22 to-blue-600/12 hbh-hero-ambient-cyan pointer-events-none" />

        {/* Ambient Gradient Glow Zone 2: Royal Purple (Top Right / Center) */}
        <div className="absolute top-1/4 -right-16 w-[620px] h-[620px] rounded-full blur-[160px] bg-gradient-to-bl from-purple-600/18 to-indigo-700/12 hbh-hero-ambient-purple pointer-events-none" />

        {/* Ambient Gradient Glow Zone 3: Neon Fuchsia (Bottom Left) */}
        <div className="absolute -bottom-16 left-1/4 w-[540px] h-[540px] rounded-full blur-[140px] bg-gradient-to-tr from-fuchsia-600/15 to-pink-500/10 hbh-hero-ambient-fuchsia pointer-events-none" />

        {/* Precision Micro-Dot Matrix Atmosphere */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00e5ff_1px,transparent_1px)] [background-size:24px_24px] mask-radial" />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. CINEMATIC LIGHT SWEEP OVERLAY (Infrequent 10s cycle)
          ══════════════════════════════════════════════════════════════ */}
      <div aria-hidden="true" className="hbh-hero-sweep-line z-[3]" />

      {/* ══════════════════════════════════════════════════════════════
          3. SCULPTED CURVED HERO TRANSITION TO SECTION 2
          ══════════════════════════════════════════════════════════════ */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-20 pointer-events-none"
      >
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 md:h-18 block transform translate-y-[1px]"
        >
          <defs>
            <linearGradient id="hbhCurveHairlineGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="20%" stopColor="#00e5ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.5" />
              <stop offset="80%" stopColor="#ff2bd6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ff2bd6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Glowing Crest Hairline */}
          <path
            d="M0,44 Q720,0 1440,44"
            stroke="url(#hbhCurveHairlineGlow)"
            strokeWidth="1.5"
            fill="none"
          />

          {/* Seamless Dark Body Fill */}
          <path
            d="M0,44 Q720,0 1440,44 L1440,72 L0,72 Z"
            fill="#05070D"
          />
        </svg>
      </div>
    </>
  );
}
