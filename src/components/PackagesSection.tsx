import React, { useState } from 'react';
import { PRICING_PACKAGES } from '../data';
import { useCurrency } from '../context/CurrencyContext';
import { useTheme } from '../context/ThemeContext';
import { CurrencySelector } from './CurrencySelector';
import {
  Sparkles,
  Check,
  ArrowRight,
  ShieldCheck,
  Percent,
  Layers,
} from 'lucide-react';

interface PackagesSectionProps {
  onOpenFittingModal: (product?: string) => void;
  onNavigatePackages?: () => void;
}

interface CorePackageItem {
  id: string;
  name: string;
  category: string;
  number: string;
  discountPrice: number;
  regularPrice: number;
  turnaround: string;
  popular?: boolean;
  gradient: string;
  description: string;
  features: string[];
}

const HOME_PACKAGES: CorePackageItem[] = [
  {
    id: 'launch-fast',
    name: 'Launch Fast (Web / MVP)',
    category: 'Rapid MVP',
    number: '01',
    discountPrice: 499,
    regularPrice: 998,
    turnaround: '48-72 Hours',
    gradient: 'from-cyan-500 via-blue-600 to-indigo-700',
    description:
      'High-converting landing page or foundational MVP. Built for immediate launch with analytics, Stripe hooks, and CRM sync.',
    features: [
      'Tailored landing page or 3-step MVP',
      'Production-grade responsive UI (React/Next)',
      'High-conversion CTA & booking flows',
      'Full SEO markup & analytics instrumentation',
      'Money-Back Guarantee & 14-day warranty',
    ],
  },
  {
    id: 'brand-identity',
    name: 'Brand Identity & Guidelines',
    category: 'Visual System',
    number: '02',
    discountPrice: 349,
    regularPrice: 698,
    turnaround: '3-5 Days',
    popular: true,
    gradient: 'from-blue-600 via-indigo-600 to-violet-800',
    description:
      'End-to-end cybernetic identity: logo design, color hierarchy, font pairings, 3D asset guidelines, and vector export packs.',
    features: [
      'Primary, secondary, and monogram logo suites',
      'Complete typography & dynamic color matrix',
      'High-res vector & SVG exports for all mediums',
      'Social media avatar & banner asset package',
      'Comprehensive PDF brand guidelines manual',
    ],
  },
  {
    id: 'full-stack-web',
    name: 'Full-Stack Custom Platform',
    category: 'Enterprise App',
    number: '03',
    discountPrice: 1249,
    regularPrice: 2498,
    turnaround: '1-2 Weeks',
    gradient: 'from-slate-900 via-indigo-950 to-cyan-950',
    description:
      'Complete bespoke web app with authentication, database models, payment gateway, custom admin portal, and scalable APIs.',
    features: [
      'Multi-role auth & secure permission systems',
      'Postgres/Supabase or Firebase database layer',
      'Stripe customer billing & subscription hooks',
      'Custom admin moderation dashboard',
      '30-day dedicated post-launch hypercare',
    ],
  },
];

export function PackagesSection({
  onOpenFittingModal,
  onNavigatePackages,
}: PackagesSectionProps) {
  const [selectedId, setSelectedId] = useState<string>('brand-identity');
  const { currency, formatConvertedPrice } = useCurrency();
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleNavigateToAllPackages = () => {
    if (onNavigatePackages) {
      onNavigatePackages();
    } else {
      window.location.hash = 'all-packages';
    }
  };

  return (
    <section
      id="packages"
      className={`py-12 sm:py-16 transition-colors duration-300 border-t ${
        isLight
          ? 'bg-[#F8FAFC] text-slate-900 border-slate-200'
          : 'bg-slate-950/60 backdrop-blur-md text-slate-100 border-slate-800/80'
      }`}
    >
      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider mb-2 border ${
                isLight
                  ? 'bg-cyan-50 text-cyan-800 border-cyan-300 shadow-sm'
                  : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>03 / TRANSPARENT FIXED PRICING</span>
            </div>
            <h2
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              Curated Fixed-Price Packages.<br />
              <span
                className={`italic font-normal block text-lg sm:text-xl lg:text-2xl mt-0.5 ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Fixed costs. Zero surprise bills. 100% money-back guarantee.
              </span>
            </h2>
          </div>

          {/* Currency Switcher & 50% Promo Callout */}
          <div className="flex flex-wrap items-center gap-2.5">
            <CurrencySelector />

            <div
              className={`px-3.5 py-1.5 rounded-full border-2 flex items-center gap-2 ${
                isLight
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-sm'
                  : 'bg-gradient-to-r from-emerald-950/90 via-emerald-900/70 to-teal-950/90 border-emerald-400/80 shadow-[0_0_20px_rgba(52,211,153,0.35)]'
              }`}
            >
              <Percent
                className={`w-3.5 h-3.5 ${
                  isLight
                    ? 'text-emerald-600'
                    : 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.9)]'
                }`}
              />
              <span
                className={`text-xs font-mono font-bold ${
                  isLight
                    ? 'text-emerald-950'
                    : 'text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.7)]'
                }`}
              >
                50% OFF CODE:{' '}
                <span
                  className={`px-2 py-0.5 rounded-md font-black ${
                    isLight
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-emerald-950/90 border border-emerald-400/80 text-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.6)]'
                  }`}
                >
                  FIRST50
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* 3-Column Core Packages Row (Expansive width) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {HOME_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedId;
            const convertedDiscount = formatConvertedPrice(pkg.discountPrice);
            const convertedRegular = formatConvertedPrice(pkg.regularPrice);

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedId(pkg.id)}
                className={`rounded-3xl p-6 relative flex flex-col justify-between cursor-pointer hbh-card-motion hbh-card-sheen transition-all duration-300 ${
                  pkg.popular ? 'hbh-card-sheen-periodic' : ''
                } ${
                  isLight
                    ? isSelected
                      ? 'bg-white text-slate-900 shadow-[0_12px_36px_rgba(0,153,202,0.18)] ring-2 ring-cyan-500 border border-cyan-400'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-[0_4px_12px_rgba(15,23,42,0.08)] hover:shadow-lg hover:border-slate-300'
                    : isSelected
                    ? 'bg-slate-900/95 text-white shadow-[0_0_40px_rgba(0,212,255,0.25)] ring-2 ring-cyan-400 border border-cyan-500/40'
                    : 'bg-slate-900/75 text-slate-200 border border-slate-800 shadow-md hover:shadow-xl hover:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-0.5 rounded-md ${
                          isLight
                            ? isSelected
                              ? 'bg-cyan-50 text-cyan-800 border border-cyan-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                            : isSelected
                            ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30'
                            : 'bg-slate-800/80 text-slate-300 border border-slate-700'
                        }`}
                      >
                        {pkg.number}
                      </span>
                      <span
                        className={`text-xs font-mono font-semibold uppercase tracking-wider ${
                          isLight
                            ? isSelected
                              ? 'text-cyan-700 font-bold'
                              : 'text-slate-600'
                            : isSelected
                            ? 'text-cyan-300/80'
                            : 'text-slate-400'
                        }`}
                      >
                        {pkg.category}
                      </span>
                    </div>

                    {pkg.popular ? (
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-slate-950 shadow-[0_0_10px_rgba(0,212,255,0.4)]">
                        Most Popular
                      </span>
                    ) : (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                          isLight
                            ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-sm'
                            : 'bg-amber-400/15 text-amber-300 border-amber-400/30'
                        }`}
                      >
                        50% OFF
                      </span>
                    )}
                  </div>

                  {/* Gradient Price Header */}
                  <div
                    className={`w-full h-32 rounded-2xl flex flex-col justify-between p-4 relative overflow-hidden mb-4 bg-gradient-to-br ${pkg.gradient} text-white shadow-inner`}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="relative z-10 flex justify-between items-start">
                      <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-black/50 text-white backdrop-blur-sm">
                        {pkg.turnaround}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/20 backdrop-blur-sm text-white">
                        FIRST50 Code
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          {convertedDiscount}
                        </span>
                        <span className="text-xs line-through text-white/70 font-mono">
                          {convertedRegular}
                        </span>
                      </div>
                      {currency !== 'GBP' && (
                        <div className="text-[10px] font-mono text-white/75 mt-0.5">
                          Base: £{pkg.discountPrice} GBP
                        </div>
                      )}
                    </div>
                  </div>

                  <h3
                    className={`font-bold text-lg tracking-tight mb-1 ${
                      isLight
                        ? 'text-slate-950 font-bold'
                        : isSelected
                        ? 'text-white'
                        : 'text-slate-100'
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`text-xs leading-relaxed mb-4 line-clamp-2 ${
                      isLight
                        ? 'text-slate-600 font-normal'
                        : isSelected
                        ? 'text-slate-300'
                        : 'text-slate-400'
                    }`}
                  >
                    {pkg.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 mb-5">
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs">
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 ${
                            isLight
                              ? 'text-cyan-600'
                              : isSelected
                              ? 'text-cyan-400'
                              : 'text-cyan-500'
                          }`}
                        />
                        <span
                          className={`truncate ${
                            isLight
                              ? 'text-slate-800 font-medium'
                              : isSelected
                              ? 'text-slate-200'
                              : 'text-slate-300'
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div
                  className={`pt-4 border-t flex items-center justify-between gap-3 ${
                    isLight
                      ? 'border-slate-200'
                      : isSelected
                      ? 'border-slate-800'
                      : 'border-slate-800/80'
                  }`}
                >
                  <div className="pr-1 min-w-0">
                    <span
                      className={`text-[10px] font-semibold flex items-center gap-1 ${
                        isLight
                          ? 'text-emerald-700 font-bold'
                          : 'text-emerald-400'
                      }`}
                    >
                      <ShieldCheck className="w-3 h-3" />
                      <span>100% Money-Back</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenFittingModal(
                        `Selected Package: ${pkg.name} (${convertedDiscount} - 50% Promo Applied [Base: £${pkg.discountPrice} GBP])`
                      );
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 hbh-btn-motion ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                        : isLight
                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-white'
                    }`}
                  >
                    <span>Claim (-50%)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Inner Page Banner: All Packages & Comparison Specs */}
        <div
          className={`p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 border transition-colors ${
            isLight
              ? 'bg-white text-slate-900 border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.06)]'
              : 'bg-slate-900/90 text-white border-slate-800 shadow-xl'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                isLight
                  ? 'bg-cyan-50 border-cyan-200 text-cyan-600'
                  : 'bg-cyan-500/20 border-cyan-500/30 text-cyan-400'
              }`}
            >
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <span
                className={`text-xs font-bold block ${
                  isLight ? 'text-slate-950 font-bold' : 'text-white'
                }`}
              >
                Looking for Logo, E-Commerce, SEO, or Digital Marketing Packages?
              </span>
              <span
                className={`text-[11px] ${
                  isLight ? 'text-slate-600' : 'text-slate-400'
                }`}
              >
                Explore our full 12+ package directory with exhaustive deliverable breakdowns and comparisons.
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleNavigateToAllPackages}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs shrink-0 cursor-pointer flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] hbh-btn-motion"
          >
            <span>View All Packages (Inner Page)</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
}
