import React, { useState } from 'react';
import { TESTIMONIALS_DATA } from '../data';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Award, ThumbsUp } from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface TestimonialsSectionProps {
  onOpenFittingModal: () => void;
}

export function TestimonialsSection({ onOpenFittingModal }: TestimonialsSectionProps) {
  const { testimonials } = useCMS();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonials = testimonials && testimonials.length > 0
    ? testimonials.filter((t) => t.isActive)
    : TESTIMONIALS_DATA;
  const list = activeTestimonials.length > 0 ? activeTestimonials : TESTIMONIALS_DATA;

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const current = list[activeIndex % list.length];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-slate-950/80 backdrop-blur-md text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-3 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>VERIFIED CLIENT REVIEWS & TESTIMONIALS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Trusted by Ambitious Brands.<br />
              <span className="italic font-normal text-slate-400 block text-2xl sm:text-3xl lg:text-4xl mt-1">Real feedback from leaders across the globe.</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-white font-mono">5.0 / 5.0 Rating</span>
            <span className="text-xs text-slate-400 font-mono">(100+ Reviews)</span>
          </div>
        </div>

        {/* Testimonials Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Main Featured Testimonial Card */}
          <div className="lg:col-span-8 bg-slate-900/90 rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-[0_0_30px_rgba(0,212,255,0.1)] flex flex-col justify-between relative">
            <Quote className="w-16 h-16 text-cyan-400/15 absolute top-6 right-6 pointer-events-none" />

            <div>
              {/* Star Rating & Controls */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono font-semibold border border-cyan-500/30">
                    Verified Deliverable
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevTestimonial}
                    aria-label="Previous review"
                    className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 hover:border-cyan-400/50"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextTestimonial}
                    aria-label="Next review"
                    className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer border border-slate-700 hover:border-cyan-400/50"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quote text */}
              <p className="text-lg sm:text-xl md:text-2xl text-slate-100 font-normal leading-relaxed italic mb-8">
                "{current.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-fuchsia-500 flex items-center justify-center text-slate-950 font-black font-mono text-base shadow-md">
                  {'avatarInitials' in current && typeof current.avatarInitials === 'string'
                    ? current.avatarInitials
                    : (current.author || 'HB').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">{current.author}</h4>
                  <p className="text-xs text-cyan-300 font-mono">
                    {current.role} • {current.company}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>On-Time Delivery</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Trust Guarantees & Stats Column */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4">
            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800 flex-1 flex flex-col justify-center shadow-lg">
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-cyan-400 mb-1">
                10,000+
              </div>
              <div className="text-sm font-bold text-white mb-1">Deliverables Completed</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Across websites, mobile apps, brand identities, pitch decks, and digital publications worldwide.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/70 border border-slate-800 flex-1 flex flex-col justify-center shadow-lg">
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-emerald-400 mb-1">
                100%
              </div>
              <div className="text-sm font-bold text-white mb-1">Money-Back Guarantee</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                If our design or architecture does not match your agreed scope, we refund 100% of your investment.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-cyan-950/80 via-slate-900 to-fuchsia-950/80 border border-cyan-500/30 flex-1 flex flex-col justify-center shadow-xl hbh-card-motion hbh-card-sheen">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm mb-2">
                <ThumbsUp className="w-4 h-4 text-cyan-400" />
                <span>Special 50% First-Order Offer</span>
              </div>
              <p className="text-xs text-slate-300 mb-4">
                Ready to experience the HiByHuman difference? Claim code <span className="font-mono font-bold text-cyan-300">FIRST50</span>.
              </p>
              <button
                type="button"
                onClick={onOpenFittingModal}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.3)] hbh-btn-motion"
              >
                Claim 50% Off First Project
              </button>
            </div>
          </div>
        </div>

        {/* All Reviews Mini Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`p-5 rounded-2xl text-left transition-all cursor-pointer border hbh-card-motion hbh-card-sheen ${
                idx === activeIndex
                  ? 'bg-slate-900 border-cyan-400/80 shadow-[0_0_15px_rgba(0,212,255,0.25)] ring-1 ring-cyan-400/50'
                  : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-slate-400">Review 0{idx + 1}</span>
              </div>
              <p className="text-xs text-slate-300 line-clamp-2 italic mb-3">"{t.quote}"</p>
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{t.author}</span>
                <span className="text-cyan-300 text-[11px] font-mono">{t.company}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
