import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ArrowRight,
  Percent,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Zap,
  Activity,
  Award,
  Layers,
  Code2,
  TrendingUp,
  Palette,
} from 'lucide-react';
import { DirectContactCTA } from './DirectContactCTA';
import { HeroAmbientEffects } from './HeroAmbientEffects';
import { HeroBackground } from './HeroBackground';
import { useCMS } from '../context/CMSContext';

interface HeroVideoCarouselProps {
  onOpenFittingModal: (subject?: string) => void;
  onNavigateCaseStudies?: () => void;
}

interface SlideData {
  id: string;
  number: string;
  badge: string;
  categoryTag: string;
  iconName: string;
  title: string;
  highlight: string;
  description: string;
  accentColor: string;
  tagline: string;
  metricNumber: string;
  metricLabel: string;
  featuredClient: string;
  highlights: string[];
}

const SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    number: '01',
    badge: 'HUMAN IDEAS × INTELLIGENT TECH',
    categoryTag: 'Full-Stack Web & Mobile Apps',
    iconName: 'code',
    title: 'Digital Systems Engineered For',
    highlight: 'Exponential Scale.',
    description:
      'We architect bespoke web applications, sub-second digital platforms, and intelligent creative systems tailored to scale your enterprise. W3C certified clean code with 100/100 Core Web Vitals.',
    accentColor: '#0066ff',
    tagline: '100% Unique Architecture • Zero Generic Templates',
    metricNumber: '99/100',
    metricLabel: 'Core Web Vitals Speed',
    featuredClient: 'Sallaum Sky Airlines & Concept Eye Clinic',
    highlights: ['Next.js & React Full-Stack', 'Sub-Second Global CDN', 'Custom APIs & Database Architecture'],
  },
  {
    id: 'slide-2',
    number: '02',
    badge: 'HIGH-INTENT DIGITAL MARKETING',
    categoryTag: 'Google Ads PPC & SEO Recovery',
    iconName: 'trending',
    title: 'Precision Turnarounds That Capture',
    highlight: 'High-Value Revenue.',
    description:
      'Forensic Google Ads restructuring, negative keyword shields, and sub-second landing page funnels that slash customer acquisition costs and drive multi-million pound booking conversions.',
    accentColor: '#0284c7',
    tagline: '668+ High-Intent Bookings • #1 Google Organic Rank',
    metricNumber: '668+',
    metricLabel: 'Verified High-Ticket Conversions',
    featuredClient: 'JD Prestige Supercars London',
    highlights: ['Forensic Negative Keyword Shields', 'Top 3 Organic Search Rankings', 'Conversion Rate Optimization'],
  },
  {
    id: 'slide-3',
    number: '03',
    badge: 'BRANDING, PACKAGING & STRATEGY',
    categoryTag: 'Global Brand Architecture',
    iconName: 'palette',
    title: 'Transformative Brand Presence Across',
    highlight: 'International Markets.',
    description:
      'From regal gold-foiled luxury cosmetic packaging and nationwide 6,000-billboard disruption to venture pitch decks that command institutional investor capital.',
    accentColor: '#7c3aed',
    tagline: '42+ Global Export Markets • £18M+ Capital Raised',
    metricNumber: '42+',
    metricLabel: 'Export Markets Reached',
    featuredClient: 'Khan Al Saboun & RemeCure Skincare',
    highlights: ['Bespoke Vector Identity Kits', 'Luxury Gold Foil & 3D Packaging', 'Institutional Pitch Decks'],
  },
];

export function HeroVideoCarousel({
  onOpenFittingModal,
  onNavigateCaseStudies,
}: HeroVideoCarouselProps) {
  const { hero } = useCMS();
  const [currentSlide, setCurrentSlide] = useState(0);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Dynamic values with fallback to pristine originals
  const promoCode = hero?.promoVoucherCode || 'FIRST50';
  const promoText = hero?.promoVoucherText || '50% OFF FIRST PROJECT CODE:';

  // Auto-advance slides every 9 seconds
  useEffect(() => {
    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 9000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [currentSlide]);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  };

  const slide = SLIDES[currentSlide];

  return (
    <section
      id="hero"
      className="relative w-full min-h-[90vh] sm:min-h-screen overflow-hidden bg-transparent text-slate-100 flex flex-col justify-between pt-28 sm:pt-36 pb-20 select-none"
    >
      {/* ══════════════════════════════════════════════════════════════
          1. HERO ADDITIVE DIGITAL ACCENT LAYERS (Layered seamlessly on GlobalBackground)
          ══════════════════════════════════════════════════════════════ */}
      {/* <HeroBackground /> */}

      {/* ══════════════════════════════════════════════════════════════
          2. APPROVED OFFICIAL HERO BANNER ARTWORK (Layered Seamlessly)
          ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* Approved Official HiByHuman Hero Banner Visual - High-fidelity WebP with mobile responsive source */}
        <div className="absolute inset-0 w-full h-full opacity-60 sm:opacity-70 mix-blend-screen">
          <picture className="w-full h-full block">
            <source
              media="(max-width: 767px)"
              srcSet="/images/hibyhuman-hero-banner-mobile.webp"
              type="image/webp"
            />
            <img
              src="/images/hibyhuman-hero-banner.webp"
              alt="HiByHuman Software House & Digital Agency Studio"
              width={1376}
              height={768}
              loading="eager"
              decoding="async"
              // @ts-ignore
              fetchPriority="high"
              className="w-full h-full object-cover"
              style={{ objectPosition: '75% 20%' }}
            />
          </picture>
        </div>

        {/* Soft Left Vignette Gradient: Keeps the left headline and description zone dark and legible */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#030712] via-[#030712]/85 to-transparent w-full md:w-[65%] lg:w-[55%]"
          aria-hidden="true"
        />
        {/* Bottom subtle blend fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 z-[1] pointer-events-none bg-gradient-to-t from-[#030712]/90 via-[#030712]/40 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. CINEMATIC AMBIENT LIGHT SWEEP & CURVED TRANSITION
          ══════════════════════════════════════════════════════════════ */}
      <HeroAmbientEffects accentColor={slide.accentColor} />

      {/* ══════════════════════════════════════════════════════════════
          4. HERO MAIN CONTENT CONTAINER (Staggered Entrance Sequence)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex-1 flex flex-col justify-center items-start text-left my-auto">
        <div className="w-full max-w-xl lg:max-w-2xl xl:max-w-3xl">
          
          {/* EYEBROW LAYER (Stagger 1: fade in + translateY 10px -> 0) */}
          <div className="hbh-hero-eyebrow w-full flex flex-col items-start text-left">
            {/* Top Eyebrow Header: Software House • Digital Agency */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-[2px] w-6 bg-gradient-to-r from-[#00E5FF] to-transparent" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]">
                SOFTWARE HOUSE • DIGITAL AGENCY
              </span>
            </div>

            {/* Badges Row: Live Status + 50% Launch Discount Code */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(0,212,255,0.2)] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                <span>{slide.badge}</span>
              </span>

              <button
                type="button"
                onClick={() => onOpenFittingModal(`Claim Promo Code: ${promoCode}`)}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-teal-950/90 border-2 border-emerald-400/85 text-[#00E5FF] hover:border-emerald-300 hover:from-emerald-900/90 hover:to-teal-900/90 text-xs font-mono font-bold backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_0_24px_rgba(52,211,153,0.4)] hover:shadow-[0_0_34px_rgba(52,211,153,0.65)] group"
              >
                <Percent className="w-3.5 h-3.5 text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.9)] shrink-0" />
                <span className="text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)] tracking-wide font-bold">
                  {promoText}
                </span>
                <span className="bg-emerald-950/90 border border-emerald-400/80 text-[#00E5FF] px-2 py-0.5 rounded-md font-black text-[11px] tracking-wider shadow-[0_0_10px_rgba(0,229,255,0.6)] group-hover:bg-[#00E5FF] group-hover:text-slate-950 group-hover:border-[#00E5FF] transition-all">
                  {promoCode}
                </span>
              </button>
            </div>

            {/* 3 Core Discipline Interactive Selector Pills */}
            <div className="flex flex-wrap sm:inline-flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 rounded-2xl sm:rounded-full bg-slate-900/90 border border-slate-800 shadow-xl mb-5 backdrop-blur-md max-w-full">
              {SLIDES.map((s, idx) => {
                const isSelected = idx === currentSlide;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => goToSlide(idx)}
                    className={`px-3 sm:px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-slate-950 font-black shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className={`text-[10px] ${isSelected ? 'text-slate-950 font-black' : 'text-slate-500'}`}>
                      {s.number}
                    </span>
                    <span>{s.categoryTag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN HEADLINE (Stagger 2: fade in + translateY 20px -> 0) */}
          <h1 className="hbh-hero-headline text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight text-white leading-[1.08] sm:leading-[1.06] mb-5 uppercase text-left break-words">
            IDEAS INTO{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#0088FF] to-[#FF2BD6] drop-shadow-[0_0_26px_rgba(0,229,255,0.5)]">
              DIGITAL EXPERIENCES
            </span>
          </h1>

          {/* SUPPORTING CONTENT (Stagger 3: fade in slightly after headline) */}
          <div className="hbh-hero-subtitle flex flex-col items-start text-left w-full">
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed mb-4 max-w-xl">
              We build websites, mobile apps, software and digital brands that help businesses grow in a digital-first world.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-start text-left"
              >
                {/* Category Focus & Subtitle */}
                <div className="flex items-center gap-2 mb-2 font-mono text-xs sm:text-sm">
                  <span className="text-cyan-300 font-bold">{slide.title}</span>
                  <span className="text-fuchsia-400 font-bold">{slide.highlight}</span>
                </div>

                {/* Subtitle Description */}
                <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed mb-4 max-w-xl">
                  {slide.description}
                </p>

                {/* Benchmark & Client Validation Pill */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-5 py-2 px-4 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)] mb-4">
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400 uppercase">Benchmark:</span>
                    <span className="text-cyan-400 font-bold text-sm drop-shadow-[0_0_6px_rgba(0,212,255,0.6)]">{slide.metricNumber}</span>
                    <span className="text-slate-400">({slide.metricLabel})</span>
                  </div>
                  <span className="hidden sm:inline text-slate-700">•</span>
                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-slate-400 uppercase">Proven For:</span>
                    <span className="text-slate-200 font-bold">{slide.featuredClient}</span>
                  </div>
                </div>

                {/* Key Deliverable Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-5">
                  {slide.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-slate-900/90 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,212,255,0.1)]"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* PRIMARY CTA LAYER (Stagger 4: fade in + translateY 10px -> 0) */}
          <div className="hbh-hero-cta flex flex-col items-start text-left w-full">
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-5">
              <button
                type="button"
                onClick={() =>
                  onOpenFittingModal(`Start a Project - ${slide.categoryTag}`)
                }
                className="hbh-btn-motion px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-sm sm:text-base transition-all shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] cursor-pointer flex items-center gap-2.5 active:scale-95 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              {onNavigateCaseStudies && (
                <button
                  type="button"
                  onClick={onNavigateCaseStudies}
                  className="px-7 py-4 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-slate-200 font-semibold text-sm sm:text-base transition-all shadow-md cursor-pointer flex items-center gap-2 group active:scale-95"
                >
                  <span>Watch Showreel</span>
                  <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Direct Call & WhatsApp Buttons */}
            <div className="mb-5">
              <DirectContactCTA variant="hero" className="justify-start" />
            </div>

            {/* Verified Trust Guarantees */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-200 font-semibold">100% Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span className="text-slate-200 font-semibold">{slide.tagline}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. TRUSTED BRANDS & STATS BAR (Stagger 5: fade in last)
          ══════════════════════════════════════════════════════════════ */}
      <div className="hbh-hero-trusted relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 mt-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-white">10,000+</div>
            <div className="text-xs text-slate-400 mt-0.5">Deliverables Shipped</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400 drop-shadow-[0_0_10px_rgba(0,212,255,0.5)]">99.4%</div>
            <div className="text-xs text-slate-400 mt-0.5">Client Satisfaction Score</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.4)]">48-Hour</div>
            <div className="text-xs text-slate-400 mt-0.5">Agile Sprint Kickoffs</div>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-mono font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">50% OFF</div>
            <div className="text-xs text-slate-400 mt-0.5">First Project Code FIRST50</div>
          </div>
        </div>
      </div>
    </section>
  );
}

