import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ServiceSelector } from './ServiceSelector';
import { HeroAmbientEffects } from './HeroAmbientEffects';
import { DirectContactCTA } from './DirectContactCTA';
import { ShieldCheck, CheckCircle2, Percent } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface HeroSectionProps {
  onOpenFittingModal: (serviceName?: string) => void;
  onNavigateCaseStudies?: () => void;
}

export function HeroSection({
  onOpenFittingModal,
  onNavigateCaseStudies,
}: HeroSectionProps) {
  const { hero } = useCMS();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const promoCode = hero?.promoVoucherCode || 'FIRST50';
  const promoText = hero?.promoVoucherText || 'Special Studio Offer: 50% Off First Order';

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleLetsTalk = () => {
    const subject =
      selectedServices.length > 0
        ? `HiByHuman Project Scope: ${selectedServices.join(', ')}`
        : 'HiByHuman Project Inquiry';
    onOpenFittingModal(subject);
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen lg:h-screen lg:max-h-[960px] overflow-hidden bg-[#030712] text-slate-100 flex flex-col justify-between pt-20 sm:pt-24 lg:pt-20 pb-4 sm:pb-6 select-none"
    >
      {/* ══════════════════════════════════════════════════════════════
          1. 3D CYBERNETIC "H" EMBLEM HERO ARTWORK (Sized to fit screen)
          Layered seamlessly on the right side with luminous cyan & magenta glow
          ══════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {/* High-fidelity 3D Cybernetic H Emblem Render */}
        <picture className="w-full h-full block">
          <source
            media="(max-width: 767px)"
            srcSet="/images/hibyhuman-hero-banner-new.jpg"
            type="image/jpeg"
          />
          <img
            src="/src/assets/images/hero_h_emblem_1790697160526.jpg"
            alt="HiByHuman 3D Cybernetic Emblem & Futuristic Technology Banner"
            width={1376}
            height={768}
            loading="eager"
            decoding="async"
            // @ts-ignore
            fetchPriority="high"
            className="w-full h-full object-cover object-[80%_center] sm:object-[72%_center] lg:object-right opacity-80 sm:opacity-90 transition-opacity duration-1000"
          />
        </picture>

        {/* Soft Left Dark Vignette: Guarantees 100% crystal-clear readability for text */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-r from-[#030712] via-[#030712]/92 to-transparent w-full md:w-[72%] lg:w-[62%]"
          aria-hidden="true"
        />

        {/* Top subtle nav shadow blend */}
        <div
          className="absolute top-0 left-0 right-0 h-24 z-[1] pointer-events-none bg-gradient-to-b from-[#030712]/80 to-transparent"
          aria-hidden="true"
        />

        {/* Bottom soft fade transition into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 z-[1] pointer-events-none bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. CINEMATIC AMBIENT LIGHT SWEEP & CURVED FOOTER TRANSITION
          ══════════════════════════════════════════════════════════════ */}
      <HeroAmbientEffects accentColor="#00E5FF" />

      {/* ══════════════════════════════════════════════════════════════
          3. HERO MAIN CONTENT CONTAINER (Symmetrical, Compact & Centered)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex-1 flex flex-col justify-center items-start text-left my-auto">
        <div className="w-full max-w-xl lg:max-w-3xl xl:max-w-4xl">
          {/* Eyebrow Status Badges */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap items-center gap-2 mb-3 sm:mb-3.5"
          >
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold shadow-[0_0_12px_rgba(0,212,255,0.2)] backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff] animate-pulse" />
              <span>HUMAN IDEAS × INTELLIGENT TECH</span>
            </span>

            <button
              type="button"
              onClick={() => onOpenFittingModal(`Claim Promo Code: ${promoCode}`)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-teal-950/90 border-2 border-emerald-400/85 text-[#00E5FF] hover:border-emerald-300 hover:from-emerald-900/90 hover:to-teal-900/90 text-[11px] font-mono font-bold backdrop-blur-md transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:shadow-[0_0_28px_rgba(52,211,153,0.6)] group"
            >
              <Percent className="w-3 h-3 text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.9)] shrink-0" />
              <span className="text-[#00E5FF] drop-shadow-[0_0_6px_rgba(0,229,255,0.8)] tracking-wide font-bold">
                {promoText}
              </span>
              <span className="bg-emerald-950/90 border border-emerald-400/80 text-[#00E5FF] px-1.5 py-0.2 rounded font-black text-[10px] tracking-wider shadow-[0_0_8px_rgba(0,229,255,0.6)] group-hover:bg-[#00E5FF] group-hover:text-slate-950 group-hover:border-[#00E5FF] transition-all">
                {promoCode}
              </span>
            </button>
          </motion.div>

          {/* Main Headline (Symmetrical, Clean Title Case, No awkward word breaks) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[52px] xl:text-[58px] font-black tracking-tight text-white leading-[1.08] sm:leading-[1.06] mb-3 sm:mb-4 text-left">
              <span className="block text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                Human ideas.
              </span>
              <span className="block text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                Powered by{' '}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#38BDF8] to-[#D946EF] drop-shadow-[0_0_28px_rgba(0,229,255,0.6)]">
                  intelligent
                </span>
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-[#818cf8] to-[#C084FC] drop-shadow-[0_0_28px_rgba(192,132,252,0.5)]">
                technology.
              </span>
            </h1>
          </motion.div>

          {/* Secondary Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-300 font-normal leading-relaxed mb-4 sm:mb-5 max-w-xl text-left drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)]"
          >
            We build digital experiences, intelligent solutions and creative systems that bring human ideas to life.
          </motion.p>

          {/* Interactive Objectives Section (Matching Attached Mockup) */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#00e5ff] animate-pulse shrink-0" />
              <h2 className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white drop-shadow-sm">
                How can HiByHuman help?
              </h2>
            </div>
            <p className="text-slate-400 mb-3 text-xs sm:text-sm font-normal">
              Select your objectives below to preview tailored deliverables
            </p>

            {/* Glowing Objective Service Pills & Dynamic Feedback Banner */}
            <ServiceSelector
              selectedServices={selectedServices}
              onToggleService={toggleService}
              onLetsTalk={handleLetsTalk}
            />
          </motion.div>

          {/* Quick Direct Contact & Trust Guarantees */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-2.5 sm:gap-3"
          >
            <DirectContactCTA variant="hero" className="justify-start" />

            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>100% Money-Back Guarantee</span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800 text-[11px] text-slate-300 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>100% Unique Architecture</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          4. TRUSTED BRANDS & STATS STRIP (Sleek Viewport Bottom Ribbon)
          ══════════════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 mt-2 sm:mt-3">
        <div className="py-2 px-4 sm:px-5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 text-center">
          <div>
            <div className="text-sm sm:text-lg font-mono font-bold text-white">10,000+</div>
            <div className="text-[10px] text-slate-400">Deliverables Shipped</div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-mono font-bold text-cyan-400 drop-shadow-[0_0_8px_rgba(0,212,255,0.5)]">
              99.4%
            </div>
            <div className="text-[10px] text-slate-400">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-mono font-bold text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]">
              48-Hour
            </div>
            <div className="text-[10px] text-slate-400">Sprint Kickoffs</div>
          </div>
          <div>
            <div className="text-sm sm:text-lg font-mono font-bold text-[#00E5FF] drop-shadow-[0_0_10px_rgba(0,229,255,0.6)]">
              50% OFF
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">Code FIRST50</div>
          </div>
        </div>
      </div>
    </section>
  );
}
