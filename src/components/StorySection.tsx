import React, { useState } from 'react';
import { Award, Quote, CheckCircle2, ShieldCheck, Sparkles, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { IMPACT_STATS, TESTIMONIALS_DATA } from '../data';

interface StorySectionProps {
  onOpenFittingModal: () => void;
}

export function StorySection({ onOpenFittingModal }: StorySectionProps) {
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const currentTestimonial = TESTIMONIALS_DATA[activeTestimonialIdx];

  const handleNext = () => {
    setActiveTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    setActiveTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#181a20] text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Top Studio Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-sky-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-6">
          <Award className="w-4 h-4 text-emerald-400" />
          <span>HIBYHUMAN • HUMAN IDEAS + INTELLIGENT TECHNOLOGY</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              "Human ideas. Powered by intelligent technology."
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4">
              At HiByHuman, we do not believe in cookie-cutter templates or generic builders. Every digital experience, intelligent solution, and creative system we build is designed to bring human ideas to life with maximum commercial impact.
            </p>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
              With over 10,000 completed deliverables across web & apps, AI solutions, digital marketing, pitch decks, and creative content, our studio pairs visionary design with robust engineering.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <button
                onClick={onOpenFittingModal}
                className="px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold bg-sky-400 hover:bg-sky-300 text-slate-950 transition-colors cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <span>Book Free Discovery Consultation</span>
                <span>↗</span>
              </button>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>100% Money-Back & Satisfaction Guarantee</span>
              </div>
            </div>
          </div>

          {/* Client Testimonial Spotlight Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 transition-colors cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed italic mb-5 relative">
              <Quote className="w-4 h-4 text-sky-400 mb-1 inline mr-1 opacity-80" />
              "{currentTestimonial.quote}"
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div>
                <div className="text-sm font-bold text-white">{currentTestimonial.author}</div>
                <div className="text-xs text-sky-400">{currentTestimonial.role}, {currentTestimonial.company}</div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {currentTestimonial.projectType || 'Verified Client'}
              </span>
            </div>

            <div className="mt-5 space-y-2 text-xs text-slate-300 pt-4 border-t border-slate-800/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>W3C Certified Clean Code Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Dedicated Project Manager & Direct WhatsApp/Phone</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>Zero Outsourcing: In-House Elite Developers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-10 border-t border-slate-800">
          {IMPACT_STATS.map((stat, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400 font-mono mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
