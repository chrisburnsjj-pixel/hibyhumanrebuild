import React, { useState } from 'react';
import { PROCESS_STAGES } from '../data';
import { Sparkles, ArrowRight, ArrowDownRight, CheckCircle2, Zap } from 'lucide-react';

interface DeliveryProcessProps {
  onOpenFittingModal: () => void;
}

export function DeliveryProcess({ onOpenFittingModal }: DeliveryProcessProps) {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section id="process" className="py-20 sm:py-28 bg-white/40 backdrop-blur-xs text-slate-900 border-t border-sky-100/60">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Intro & Step Nav */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DELIVERY LIFECYCLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950 leading-tight">
              One expert agency.<br />
              Four crystal-clear<br />
              <em className="italic font-serif text-slate-600">milestones.</em>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 mb-8 leading-relaxed">
              We combine agile sprint cycles, direct WhatsApp/Slack communication, and milestone staging links so you remain in 100% control of every release.
            </p>

            {/* Step navigation pills */}
            <div className="flex flex-col gap-2">
              {PROCESS_STAGES.map((st) => {
                const isActive = st.step === activeStep;
                return (
                  <button
                    key={st.step}
                    onClick={() => setActiveStep(st.step)}
                    className={`flex items-center justify-between p-3.5 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold shadow-md'
                        : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${isActive ? 'text-sky-400' : 'text-slate-400'}`}>
                        {st.step}
                      </span>
                      <span className="text-sm font-medium">{st.title.split('&')[0].trim()}</span>
                    </div>
                    <ArrowRight className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-slate-400'}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={onOpenFittingModal}
                className="w-full py-3.5 px-4 rounded-full text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Zap className="w-4 h-4 text-sky-400" />
                <span>Kickstart Step 01 Discovery</span>
                <span>↗</span>
              </button>
            </div>
          </div>

          {/* Right Cards Stack */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {PROCESS_STAGES.map((stage) => {
              const isSelected = stage.step === activeStep;
              return (
                <div
                  key={stage.step}
                  onClick={() => setActiveStep(stage.step)}
                  className={`p-6 sm:p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-800 shadow-xl ring-1 ring-sky-400/50'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-4">
                    <span className={`px-2.5 py-1 rounded-full uppercase font-bold text-[10px] ${
                      isSelected ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {stage.timeline}
                    </span>
                    <span className="text-xl font-bold font-mono opacity-80">{stage.step}</span>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-1 ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}>
                    {stage.title}
                  </h3>
                  <p className={`text-xs sm:text-sm font-medium mb-3 ${
                    isSelected ? 'text-sky-300' : 'text-sky-700'
                  }`}>
                    {stage.subtitle}
                  </p>
                  <p className={`text-sm leading-relaxed mb-6 ${
                    isSelected ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {stage.description}
                  </p>

                  {/* Output deliverable banner */}
                  <div className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center gap-3 ${
                    isSelected
                      ? 'bg-slate-800/80 border-slate-700 text-white'
                      : 'bg-white border-slate-200 text-slate-900 shadow-xs'
                  }`}>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider opacity-60">Deliverable Sign-Off:</div>
                      <div className="font-semibold mt-0.5">{stage.deliverable}</div>
                    </div>
                  </div>

                  <div className={`mt-4 flex items-center gap-1.5 text-xs font-mono ${
                    isSelected ? 'text-slate-400' : 'text-slate-500'
                  }`}>
                    <span>Next Milestone: {stage.nextStep}</span>
                    <ArrowDownRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
