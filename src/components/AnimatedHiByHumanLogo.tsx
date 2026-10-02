import React from 'react';

interface AnimatedHiByHumanLogoProps {
  className?: string;
}

/**
 * AnimatedHiByHumanLogo
 * 
 * High-performance animated presentation of the official HiByHuman SVG logo asset.
 * - Loads the new official SVG logo asset (/images/hibyhuman-logo.svg)
 * - Retains full cinematic CSS animation stack:
 *   - .hbh-hero-logo-frame: 2.2s entrance scale and translation
 *   - .hbh-hero-logo-glow: dynamic expanding ambient cyan/magenta core glow
 *   - .hbh-hero-logo-sweep: single diagonal light sheen sweep across the logo
 * - Zero CLS layout shift (fixed 16:9 aspect-video container)
 * - Full accessibility: instant static presentation under prefers-reduced-motion
 */
export function AnimatedHiByHumanLogo({ className = '' }: AnimatedHiByHumanLogoProps) {
  const logoSvgSrc = '/images/hibyhuman-logo-horizontal.svg';
  const posterSrc = '/images/hibyhuman-hero-banner.webp';

  return (
    <div className={`relative flex flex-col items-center group select-none ${className}`}>
      {/* Outer Ambient Cyber Glow Layer (Hardware-accelerated) */}
      <div 
        aria-hidden="true"
        className="absolute -inset-2 bg-gradient-to-r from-cyan-500/25 via-fuchsia-500/20 to-blue-600/25 rounded-3xl blur-2xl opacity-60 group-hover:opacity-85 transition-opacity duration-700 pointer-events-none -z-10" 
      />

      {/* Hero Container Frame: Matches 16:9 dimensions to prevent any layout shift */}
      <div className="relative w-[280px] sm:w-[360px] md:w-[420px] aspect-video rounded-2xl overflow-hidden bg-slate-950/90 border border-cyan-500/30 shadow-[0_0_35px_rgba(0,212,255,0.22)] backdrop-blur-xl flex flex-col items-center justify-between p-3 sm:p-4">
        
        {/* Subtle Textured Background from Preloaded LCP Poster Image */}
        <img
          src={posterSrc}
          alt=""
          width={420}
          height={236}
          loading="eager"
          decoding="async"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none mix-blend-luminosity select-none"
        />

        {/* Ambient Dark Radial Gradient Overlay */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,13,0.3)_0%,rgba(5,7,13,0.85)_75%,rgba(5,7,13,0.98)_100%)] pointer-events-none" 
        />

        {/* Subtle Tech Dot Matrix Grid */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#00d4ff_1px,transparent_1px)] [background-size:16px_16px]" 
        />

        {/* HUD Corner Tech Accents */}
        <div aria-hidden="true" className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 pointer-events-none" />
        <div aria-hidden="true" className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-fuchsia-400/80 pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80 pointer-events-none" />
        <div aria-hidden="true" className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-fuchsia-400/80 pointer-events-none" />

        {/* Top HUD Metadata Header */}
        <div className="relative z-10 w-full flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span className="text-[8.5px] sm:text-[9px] font-mono font-bold tracking-widest text-cyan-300/85 uppercase">
              Official Cyber Brand Lockup
            </span>
          </div>
          <span className="text-[8.5px] sm:text-[9px] font-mono text-slate-400/80 tracking-wider">
            UK • EST. 2024
          </span>
        </div>

        {/* Central Brand Lockup with CSS-driven Intro Animation */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center hbh-hero-logo-frame w-full px-2">
          
          {/* Dynamic Ambient Core Glow behind Logo */}
          <div 
            aria-hidden="true"
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500/25 via-purple-500/20 to-fuchsia-500/25 rounded-full blur-xl pointer-events-none hbh-hero-logo-glow" 
          />

          {/* Official HiByHuman New SVG Asset */}
          <img
            src={logoSvgSrc}
            alt="HiByHuman Official Logo"
            width={340}
            height={244}
            loading="eager"
            decoding="sync"
            className="w-[200px] sm:w-[245px] md:w-[285px] h-auto object-contain drop-shadow-[0_0_24px_rgba(0,212,255,0.45)] select-none pointer-events-none"
          />
        </div>

        {/* Refined Single Light Sweep Sheen (Runs once across logo during entrance, then stays inert) */}
        <div 
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-300/20 to-transparent hbh-hero-logo-sweep" />
        </div>

        {/* Bottom HUD Coordinates & Engine Tag */}
        <div className="relative z-10 w-full flex items-center justify-between text-[8px] sm:text-[9px] font-mono text-slate-500 pointer-events-none">
          <span className="text-slate-400/90 font-medium">COATBRIDGE HQ</span>
          <span className="text-cyan-400/80 font-bold">SCOTLAND • GLOBAL</span>
        </div>
      </div>
    </div>
  );
}
