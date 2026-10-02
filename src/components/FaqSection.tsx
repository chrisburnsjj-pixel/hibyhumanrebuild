import React, { useState } from 'react';
import { FAQ_ITEMS, STUDIO_INFO } from '../data';
import { Sparkles, Plus, Minus, MessageCircle, PhoneCall } from 'lucide-react';

interface FaqSectionProps {
  onOpenFittingModal: () => void;
}

export function FaqSection({ onOpenFittingModal }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white/40 backdrop-blur-xs text-slate-900 border-t border-sky-100/60">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>COMMON INQUIRIES & ADVICE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-950">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Everything you need to know about our custom build process, intellectual property rights, timelines, and guarantees.
          </p>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/60 shrink-0">
                      {item.category}
                    </span>
                    <span className="font-bold text-slate-900 text-sm sm:text-base">
                      {item.question}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5 text-slate-700" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Have more questions card */}
        <div className="mt-10 p-6 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Have a unique question or bespoke RFP requirement?</div>
              <div className="text-xs text-slate-500">Call {STUDIO_INFO.phone} or request a direct callback from our technical director.</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="px-4 py-2.5 rounded-full text-xs font-semibold border border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3 h-3 text-sky-600" />
              <span>Call Us</span>
            </a>
            <button
              onClick={onOpenFittingModal}
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-slate-900 hover:bg-sky-600 text-white transition-colors cursor-pointer"
            >
              Consult an Advisor ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
