import React, { useState } from 'react';
import { PRICING_PACKAGES } from '../data';
import { Sparkles, Check, ArrowRight, ShieldCheck, Tag, Clock, Zap } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

interface GoalFinderProps {
  onOpenFittingModal: (packageName?: string) => void;
}

const CATEGORIES = ['All', 'Website', 'Logo', 'Ecommerce', 'SEO', 'Digital Marketing'] as const;

export function GoalFinder({ onOpenFittingModal }: GoalFinderProps) {
  const { currency, formatConvertedPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('web-pro');

  const filteredPackages = activeCategory === 'All'
    ? PRICING_PACKAGES
    : PRICING_PACKAGES.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());

  const currentPkg = PRICING_PACKAGES.find(p => p.id === selectedPackageId) || filteredPackages[0] || PRICING_PACKAGES[0];

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[#f0f0ee] text-slate-900 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TRANSPARENT FIXED-PRICE PACKAGES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-950">
            Tailored packages for every ambition.<br />
            <em className="italic font-serif text-slate-600">Fixed cost. 100% money-back guarantee.</em>
          </h2>
          <p className="text-slate-600 max-w-xl text-sm sm:text-base mt-2 leading-relaxed">
            Choose a verified scope or tailor your bespoke project requirements. All tiers include 100% unique design, zero templates, and W3C certified clean code.
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                const match = cat === 'All' ? PRICING_PACKAGES[0] : PRICING_PACKAGES.find(p => p.category.toLowerCase() === cat.toLowerCase());
                if (match) setSelectedPackageId(match.id);
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Selector Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-8">
          {filteredPackages.slice(0, 8).map((pkg) => {
            const isSelected = pkg.id === currentPkg.id;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`p-5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xl ring-2 ring-sky-400 scale-[1.02]'
                    : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    {pkg.popular ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500 text-slate-950">
                        Most Popular
                      </span>
                    ) : (
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-sky-400' : 'bg-slate-300'}`} />
                    )}
                    <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-sky-300' : 'text-slate-400'}`}>
                      {pkg.turnaround}
                    </span>
                  </div>
                  <h3 className="font-bold text-base tracking-tight mb-1">{pkg.name}</h3>
                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className="text-xl sm:text-2xl font-black font-mono tracking-tight">
                      {formatConvertedPrice(pkg.price)}
                    </span>
                    <span className="text-[11px] text-slate-400">Fixed</span>
                  </div>
                  {currency !== 'GBP' && (
                    <div className="text-[10px] font-mono text-slate-400 mb-2">
                      Base: £{pkg.price} GBP
                    </div>
                  )}
                  <p className={`text-xs line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {pkg.description}
                  </p>
                </div>
                <div className={`mt-4 pt-3 border-t text-[11px] font-semibold flex items-center justify-between ${
                  isSelected ? 'border-slate-800 text-sky-400' : 'border-slate-100 text-sky-600'
                }`}>
                  <span>{isSelected ? 'Configuring Tier' : 'Inspect Details'}</span>
                  <span>↗</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Package Dynamic Breakdown Dossier Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-700 border border-sky-200/80 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-sky-600" />
                  {currentPkg.name} — Selected Scope
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  100% Money Back Guarantee
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mb-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
                  {formatConvertedPrice(currentPkg.price)}
                </span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  100% Unique Design (No Templates)
                </span>
              </div>
              {currency !== 'GBP' && (
                <div className="text-xs font-mono text-slate-500 mb-2">
                  Base Price: £{currentPkg.price} GBP
                </div>
              )}

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                {currentPkg.description}
              </p>

              <div className="space-y-2.5">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  INCLUDED SPECIFICATIONS & DELIVERABLES:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentPkg.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Quick Summary Card */}
            <div className="lg:col-span-5 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col justify-between gap-5">
              <div>
                <div className="text-xs font-mono uppercase text-slate-500 font-bold mb-3 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Turnaround Timeline:</span>
                  <span className="text-slate-900 font-bold">{currentPkg.turnaround}</span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 mb-4 bg-white p-3.5 rounded-xl border border-slate-200/60">
                  <div className="flex justify-between items-center">
                    <span>Deposit:</span>
                    <span className="font-bold text-slate-900">Milestone Based</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Revisions:</span>
                    <span className="font-bold text-slate-900">Included per Scope</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Source Code Rights:</span>
                    <span className="font-bold text-emerald-600">100% Client Owned</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Direct Communication:</span>
                    <span className="font-bold text-slate-900">WhatsApp / Direct Line</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 leading-relaxed">
                  Every package includes clean hand-coded W3C markup, responsive mobile optimization, cross-browser compatibility, and search engine friendly architecture.
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() =>
                    onOpenFittingModal(
                      `${currentPkg.name} (${formatConvertedPrice(currentPkg.price)} [Base: £${currentPkg.price} GBP])`
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Zap className="w-4 h-4 text-sky-200" />
                  <span>Order {currentPkg.name} ({formatConvertedPrice(currentPkg.price)})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center text-[11px] text-slate-500">
                  Have bespoke requirements? <button onClick={() => onOpenFittingModal('Custom Enterprise Scope')} className="text-sky-600 font-semibold underline cursor-pointer">Request Custom Quote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
