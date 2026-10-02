import React, { useState } from 'react';
import { Sparkles, Check, Smartphone, Monitor, Tablet, Code2, Palette, SearchCheck, ShoppingBag, Compass, ArrowUpRight } from 'lucide-react';
import { STUDIO_SERVICES } from '../data';

interface CapabilitiesGridProps {
  onOpenFittingModal: () => void;
}

export function CapabilitiesGrid({ onOpenFittingModal }: CapabilitiesGridProps) {
  // Lab 1: Interactive Viewport Simulator
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Lab 2: Interactive Tech Architecture Selector
  const [activeStack, setActiveStack] = useState<'react' | 'native' | 'ecommerce' | 'wordpress'>('react');

  // Lab 3: Interactive Branding Aesthetic
  const [brandStyle, setBrandStyle] = useState<'british-luxury' | 'cyber-tech' | 'growth-vibrant'>('british-luxury');

  // Lab 4: Interactive SEO Core Web Vitals
  const [seoMode, setSeoMode] = useState<'optimized' | 'standard'>('optimized');

  // Lab 5: Interactive Currency Switcher for Ecom
  const [currency, setCurrency] = useState<'£' | '$' | '€'>('£');

  return (
    <section id="services" className="py-20 sm:py-28 bg-white/85 backdrop-blur-[2px] text-slate-900 border-t border-slate-100/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OUR CORE SERVICES & DIGITAL LABS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
            All-Inclusive Digital Craft.<br />
            <em className="italic font-serif text-slate-600">From initial spark to market domination.</em>
          </h2>
          <p className="text-slate-600 max-w-2xl text-sm sm:text-base mt-3 leading-relaxed">
            HiByHuman combines award-winning interactive design, robust full-stack engineering, bespoke motion branding, and data-driven marketing to scale your enterprise.
          </p>
        </div>

        {/* 6 Capabilities & Interactive Labs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Interactive Design & Responsive Simulator */}
          <div className="rounded-3xl p-6 bg-slate-900 text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between text-xs text-sky-400 font-mono mb-4">
                <span>01. UX/UI DESIGN</span>
                <span>RESPONSIVE LAB</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Design</h3>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                Stimulating digital experiences, user-centric wireframes, and pixel-perfect layouts tailored for your business specific site.
              </p>

              {/* Interactive Specimen: Device Viewport Toggle */}
              <div className="bg-slate-800/90 rounded-2xl p-3.5 mb-4 border border-slate-700">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Viewport Simulation:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setActiveDevice('desktop')}
                      className={`p-1.5 rounded-lg text-xs transition-all ${
                        activeDevice === 'desktop' ? 'bg-sky-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                      title="Desktop View"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveDevice('tablet')}
                      className={`p-1.5 rounded-lg text-xs transition-all ${
                        activeDevice === 'tablet' ? 'bg-sky-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                      title="Tablet View"
                    >
                      <Tablet className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveDevice('mobile')}
                      className={`p-1.5 rounded-lg text-xs transition-all ${
                        activeDevice === 'mobile' ? 'bg-sky-400 text-slate-950' : 'bg-slate-700 text-slate-300'
                      }`}
                      title="Mobile View"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/80 rounded-xl text-xs border border-slate-800">
                  <div className="flex justify-between items-center text-[11px] font-mono text-sky-300 mb-1">
                    <span>Active: {activeDevice.toUpperCase()}</span>
                    <span>{activeDevice === 'desktop' ? '1440px / 60FPS' : activeDevice === 'tablet' ? '768px Touch' : '390px Fluid'}</span>
                  </div>
                  <div className="text-slate-400 text-[11px]">
                    {activeDevice === 'desktop' && 'Full multi-column layout with high-contrast typography & cursor micro-interactions.'}
                    {activeDevice === 'tablet' && 'Adaptive split view with swipeable horizontal cards and touch target padding.'}
                    {activeDevice === 'mobile' && 'Streamlined single-column thumb-friendly flow with sticky quick action bars.'}
                  </div>
                </div>
              </div>
            </div>

            <details className="text-xs text-slate-400 cursor-pointer pt-3 border-t border-slate-800">
              <summary className="font-semibold text-sky-400 hover:text-sky-300">View Core Highlights +</summary>
              <ul className="mt-2 space-y-1 text-[11.5px] text-slate-300">
                {STUDIO_SERVICES[0].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-sky-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Card 2: Web & Mobile Engineering Lab */}
          <div className="rounded-3xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs text-blue-600 font-mono mb-4">
                <span>02. ENGINEERING</span>
                <span>FULL-STACK</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Web & Mobile Development</h3>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Utilising modern technology at the forefront of development, we build extensible, reliable web apps and native mobile platforms.
              </p>

              {/* Interactive Specimen: Architecture Selector */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 mb-4">
                <div className="flex flex-wrap gap-1.5 mb-2.5">
                  <button
                    onClick={() => setActiveStack('react')}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeStack === 'react' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    React/Next.js
                  </button>
                  <button
                    onClick={() => setActiveStack('native')}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeStack === 'native' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    iOS & Android
                  </button>
                  <button
                    onClick={() => setActiveStack('ecommerce')}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeStack === 'ecommerce' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Shopify Plus
                  </button>
                  <button
                    onClick={() => setActiveStack('wordpress')}
                    className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold transition-all ${
                      activeStack === 'wordpress' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Custom WP
                  </button>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-200/70">
                  <div className="flex justify-between items-center text-[10.5px] font-mono text-blue-700 font-bold mb-1">
                    <span>Performance Target:</span>
                    <span>99/100 Lighthouse</span>
                  </div>
                  <div className="text-slate-600 text-[11px]">
                    {activeStack === 'react' && 'SSR & Edge API routes with zero runtime layout shift and automated static caching.'}
                    {activeStack === 'native' && 'React Native / Swift dual native deployment with biometrics and offline cache.'}
                    {activeStack === 'ecommerce' && 'Liquid + Storefront API with sub-second cart checkouts and Stripe payments.'}
                    {activeStack === 'wordpress' && 'Bespoke lightweight theme architecture with zero bloat and ACF Pro admin panels.'}
                  </div>
                </div>
              </div>
            </div>

            <details className="text-xs text-slate-500 cursor-pointer pt-3 border-t border-slate-200">
              <summary className="font-semibold text-blue-600 hover:text-blue-700">View Core Highlights +</summary>
              <ul className="mt-2 space-y-1 text-[11.5px] text-slate-700">
                {STUDIO_SERVICES[1].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Card 3: Motion & Branding Design Lab */}
          <div className="rounded-3xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs text-purple-600 font-mono mb-4">
                <span>03. BRANDING</span>
                <span>MOTION GRAPHICS</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Motion & Brand Identity</h3>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Captivating motion graphics and distinctive brand identities that narrate your story and make you instantly recognizable.
              </p>

              {/* Interactive Specimen: Style Switcher */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Brand Aesthetic:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setBrandStyle('british-luxury')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        brandStyle === 'british-luxury' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Heritage
                    </button>
                    <button
                      onClick={() => setBrandStyle('cyber-tech')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        brandStyle === 'cyber-tech' ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Cyber
                    </button>
                    <button
                      onClick={() => setBrandStyle('growth-vibrant')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        brandStyle === 'growth-vibrant' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Vibrant
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl text-xs border border-slate-200/70">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="flex -space-x-1">
                      {brandStyle === 'british-luxury' && (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-900 border border-white" />
                          <span className="w-3.5 h-3.5 rounded-full bg-amber-600 border border-white" />
                          <span className="w-3.5 h-3.5 rounded-full bg-[#f0f0ee] border border-white" />
                        </>
                      )}
                      {brandStyle === 'cyber-tech' && (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full bg-sky-500 border border-white" />
                          <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 border border-white" />
                          <span className="w-3.5 h-3.5 rounded-full bg-slate-950 border border-white" />
                        </>
                      )}
                      {brandStyle === 'growth-vibrant' && (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full bg-rose-500 border border-white" />
                          <span className="w-3.5 h-3.5 rounded-full bg-amber-400 border border-white" />
                          <span className="w-3.5 h-3.5 rounded-full bg-teal-500 border border-white" />
                        </>
                      )}
                    </div>
                    <span className="font-semibold text-slate-800 text-[11px]">
                      {brandStyle === 'british-luxury' ? 'Timeless Oxford Serif & Gold Accents' : brandStyle === 'cyber-tech' ? 'Technical Grotesk & Electric Cyan' : 'Modern Geometric & High Contrast'}
                    </span>
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Includes animated logo stingers, vector master files, brand book, and stationery templates.
                  </div>
                </div>
              </div>
            </div>

            <details className="text-xs text-slate-500 cursor-pointer pt-3 border-t border-slate-200">
              <summary className="font-semibold text-purple-600 hover:text-purple-700">View Core Highlights +</summary>
              <ul className="mt-2 space-y-1 text-[11.5px] text-slate-700">
                {STUDIO_SERVICES[2].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-purple-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Card 4: Digital Marketing & SEO Auditor */}
          <div className="rounded-3xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs text-emerald-600 font-mono mb-4">
                <span>04. GROWTH</span>
                <span>SEO & ADS</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Digital Marketing & SEO</h3>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Proven SEO strategies, targeted PPC ad campaigns, and high-conversion content engineered to command Google rankings.
              </p>

              {/* Interactive Specimen: Core Web Vitals Auditor */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] text-slate-400 font-mono uppercase">Audit Benchmark:</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setSeoMode('optimized')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        seoMode === 'optimized' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Union Jack Standard
                    </button>
                    <button
                      onClick={() => setSeoMode('standard')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        seoMode === 'standard' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      Competitor Average
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5 text-center font-mono">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <div className="text-[9px] text-slate-500">PERF</div>
                    <div className={`text-xs font-bold ${seoMode === 'optimized' ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {seoMode === 'optimized' ? '99' : '58'}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <div className="text-[9px] text-slate-500">A11Y</div>
                    <div className={`text-xs font-bold ${seoMode === 'optimized' ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {seoMode === 'optimized' ? '100' : '72'}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <div className="text-[9px] text-slate-500">SEO</div>
                    <div className={`text-xs font-bold ${seoMode === 'optimized' ? 'text-emerald-600' : 'text-amber-500'}`}>
                      {seoMode === 'optimized' ? '100' : '64'}
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                    <div className="text-[9px] text-slate-500">FCP</div>
                    <div className={`text-xs font-bold ${seoMode === 'optimized' ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {seoMode === 'optimized' ? '0.4s' : '2.8s'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <details className="text-xs text-slate-500 cursor-pointer pt-3 border-t border-slate-200">
              <summary className="font-semibold text-emerald-600 hover:text-emerald-700">View Core Highlights +</summary>
              <ul className="mt-2 space-y-1 text-[11.5px] text-slate-700">
                {STUDIO_SERVICES[3].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Card 5: Concept & Strategy Roadmap */}
          <div className="rounded-3xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-600 font-mono mb-4">
                <span>05. STRATEGY</span>
                <span>BUSINESS ADVISORY</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Concept & Strategy</h3>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Transforming ambitious ideas into actionable, high-growth plans through rigorous market analysis, SWOT modeling, and roadmap execution.
              </p>

              {/* Strategic Radar Points */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 mb-4 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">1. Market Opportunity Analysis</span>
                  <span className="font-mono text-emerald-600 font-bold">100% In-Depth</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '94%' }} />
                </div>
                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="font-semibold text-slate-800">2. Go-to-Market Launch Strategy</span>
                  <span className="font-mono text-sky-600 font-bold">Agile Sprint</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-sky-500 h-1.5 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            <details className="text-xs text-slate-500 cursor-pointer pt-3 border-t border-slate-200">
              <summary className="font-semibold text-amber-600 hover:text-amber-700">View Core Highlights +</summary>
              <ul className="mt-2 space-y-1 text-[11.5px] text-slate-700">
                {STUDIO_SERVICES[4].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>

          {/* Card 6: Illustrations & Prototyping Lab */}
          <div className="rounded-3xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs text-rose-600 font-mono mb-4">
                <span>06. PROTOTYPES</span>
                <span>ARTISTIC PRECISION</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Illustrations & Prototype</h3>
              <p className="text-slate-600 text-xs mb-4 leading-relaxed">
                Bringing your vision to reality with art and accuracy. Highly detailed custom illustrations and functional 3D interactive prototypes.
              </p>

              {/* Interactive Specimen: Prototype Specs */}
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 mb-4">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase mb-2">
                  <span>Prototype Deliverables:</span>
                  <span className="text-rose-600 font-bold">Figma & 3D WebGL</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-slate-700">
                    <span>Clickable User Journeys</span>
                    <span className="font-mono font-bold text-slate-900">Included</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-700">
                    <span>3D Interactive Models</span>
                    <span className="font-mono font-bold text-slate-900">WebGL Ready</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-700">
                    <span>Master Vector Assets</span>
                    <span className="font-mono font-bold text-slate-900">SVG / AI</span>
                  </div>
                </div>
              </div>
            </div>

            <details className="text-xs text-slate-500 cursor-pointer pt-3 border-t border-slate-200">
              <summary className="font-semibold text-rose-600 hover:text-rose-700">View Core Highlights +</summary>
              <ul className="mt-2 space-y-1 text-[11.5px] text-slate-700">
                {STUDIO_SERVICES[5].highlights.map((h, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-rose-500 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        {/* Action Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-mono uppercase text-sky-400 font-bold tracking-wider">UK HEADQUARTERED STUDIO</span>
            <h4 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">Need a custom scope or specific technological stack?</h4>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">Our technical consultants provide comprehensive architecture blueprints and fixed-price proposals.</p>
          </div>
          <button
            onClick={onOpenFittingModal}
            className="whitespace-nowrap px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all flex items-center gap-1.5 shadow-md hover:scale-105 cursor-pointer"
          >
            <span>Request Free Architecture Consultation</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
