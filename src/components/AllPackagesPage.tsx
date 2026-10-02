import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  Check,
  ArrowRight,
  ShieldCheck,
  Percent,
  Clock,
  Zap,
  Tag,
  Search,
  CheckCircle2,
  Phone,
  MessageCircle,
} from 'lucide-react';
import { PRICING_PACKAGES, STUDIO_INFO } from '../data';
import { HiByHumanLogo } from './Logo';
import { useCurrency } from '../context/CurrencyContext';
import { CurrencySelector } from './CurrencySelector';

interface AllPackagesPageProps {
  onBackToHome: () => void;
  onOpenFittingModal: (packageName?: string) => void;
  onNavigateService?: (slug: string) => void;
  onNavigateCaseStudy?: (slug: string) => void;
}

const CATEGORIES = ['All', 'Website', 'Logo', 'Ecommerce', 'SEO', 'Digital Marketing'] as const;

export function AllPackagesPage({
  onBackToHome,
  onOpenFittingModal,
  onNavigateService,
  onNavigateCaseStudy,
}: AllPackagesPageProps) {
  const { currency, formatConvertedPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('web-pro');

  const filteredPackages = PRICING_PACKAGES.filter((pkg) => {
    const matchesCategory =
      activeCategory === 'All' || pkg.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const currentPkg =
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || filteredPackages[0] || PRICING_PACKAGES[0];

  const currentConvertedRegular = formatConvertedPrice(currentPkg.price);
  const currentConvertedHalf = formatConvertedPrice(currentPkg.price, { customDiscount: 0.5 });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-slate-950">
      {/* Top Sticky Sub-Nav with Back to Home button */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/60 border border-cyan-800/60 px-3 py-1.5 rounded-full cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <HiByHumanLogo size="sm" theme="dark" animated={true} brandName="HiByHuman" />
          </div>

          <div className="flex items-center gap-3">
            <CurrencySelector />

            <span className="hidden md:inline-flex items-center gap-1.5 text-xs font-mono text-amber-300 bg-amber-400/10 border border-amber-400/30 px-3 py-1 rounded-full">
              <Percent className="w-3.5 h-3.5" />
              <span>50% Promo: FIRST50</span>
            </span>
            <button
              type="button"
              onClick={() => onOpenFittingModal('Custom Package Inquiry')}
              className="px-4 py-1.5 rounded-full text-xs font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-colors cursor-pointer"
            >
              Request Custom Quote
            </button>
          </div>
        </div>
      </header>

      {/* Hero Header */}
      <div className="relative py-16 sm:py-20 border-b border-slate-900 overflow-hidden bg-gradient-to-b from-slate-900/50 to-slate-950">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800 text-cyan-400 text-xs font-mono font-bold tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPREHENSIVE PRICING DIRECTORY • INNER PAGE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Full Package Catalog & Detailed Specifications
            </h1>
            <p className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Browse our complete catalog of fixed-price deliverables across Web Development, Brand Identity, Ecommerce, and Digital Marketing. Every tier includes our 100% money-back guarantee and qualifies for 50% discount with voucher code <span className="font-mono text-cyan-300 font-bold bg-slate-900 px-2 py-0.5 rounded border border-cyan-500/40">FIRST50</span>.
            </p>

            {/* Guarantees Bar */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 100% Money-Back Guarantee
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Clock className="w-4 h-4" /> Fixed 24–72h Turnarounds
              </span>
              <span className="flex items-center gap-1.5 text-amber-300">
                <CheckCircle2 className="w-4 h-4" /> 100% Full Ownership Transfer
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area: Filter & Search Bar */}
      <div className="max-w-[1500px] mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  const match =
                    cat === 'All'
                      ? PRICING_PACKAGES[0]
                      : PRICING_PACKAGES.find((p) => p.category.toLowerCase() === cat.toLowerCase());
                  if (match) setSelectedPackageId(match.id);
                }}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/20'
                    : 'bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search package or feature..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Section Heading for Packages Grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Fixed-Price Deliverables Directory &amp; Tiers
          </h2>
          <span className="text-xs font-mono text-cyan-400">
            Showing {filteredPackages.length} packages
          </span>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {filteredPackages.map((pkg, idx) => {
            const isSelected = pkg.id === currentPkg.id;
            const convertedRegular = formatConvertedPrice(pkg.price);
            const convertedHalf = formatConvertedPrice(pkg.price, { customDiscount: 0.5 });
            const numStr = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between border cursor-pointer hbh-card-motion hbh-card-sheen ${
                  pkg.popular ? 'hbh-card-sheen-periodic' : ''
                } ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 shadow-2xl ring-1 ring-cyan-400'
                    : 'bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700">
                      {numStr} • {pkg.category}
                    </span>
                    {pkg.popular ? (
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950">
                        Popular Choice
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        50% OFF
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-200 dark:border-slate-800/80 mb-5">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-cyan-400 font-mono">
                          {convertedHalf}
                        </span>
                        <span className="text-xs line-through text-slate-500 font-mono">
                          {convertedRegular}
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-mono">FIRST50 Applied</span>
                    </div>
                    {currency !== 'GBP' && (
                      <div className="text-[10px] font-mono text-slate-600 dark:text-slate-400 mt-1">
                        Base: £{pkg.price} GBP
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{pkg.turnaround}</span>
                    </div>
                  </div>

                  {/* Top Features */}
                  <div className="space-y-2 mb-6">
                    {pkg.features.slice(0, 4).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-600 dark:text-slate-400 font-mono">
                    {pkg.features.length} Deliverables
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenFittingModal(
                        `Inquiry: ${pkg.name} (${convertedHalf} with 50% discount [Base: £${pkg.price} GBP])`
                      );
                    }}
                    className="px-4 py-2 rounded-full text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 transition-colors flex items-center gap-1.5 cursor-pointer hbh-btn-motion"
                  >
                    <span>Claim 50% Off</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Spotlight Section for Selected Package */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 border border-slate-200 dark:border-slate-800 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-5">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest block mb-2">
                DETAILED SPECIFICATION SPOTLIGHT
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{currentPkg.name}</h2>
              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-6">{currentPkg.description}</p>

              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-200 dark:border-slate-800 mb-6">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-mono mb-1">
                  <span>Regular List Price:</span>
                  <span className="line-through">{currentConvertedRegular}</span>
                </div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-3xl font-extrabold text-cyan-400 font-mono">
                    {currentConvertedHalf}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-bold font-mono">
                    Save 50%
                  </span>
                </div>
                {currency !== 'GBP' && (
                  <div className="text-xs font-mono text-cyan-400/80 mb-3">
                    Base: £{currentPkg.price} GBP (50% Off: £{(parseFloat(currentPkg.price.replace(',', '')) * 0.5).toFixed(2)} GBP)
                  </div>
                )}
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {currentPkg.turnaround}
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Money-Back
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  onOpenFittingModal(
                    `Selected Package: ${currentPkg.name} (${currentConvertedHalf} - 50% First Order Discount Applied [Base: £${currentPkg.price} GBP])`
                  )
                }
                className="w-full py-3.5 px-6 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-400/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book This Package with 50% Off</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            <div className="lg:col-span-7 bg-slate-950/70 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>All Scope Deliverables Included</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentPkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-2">
                  Guarantees Included in this Tier:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentPkg.guarantees.map((g, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-xs font-mono"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{g}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Trust & Evidence Section */}
        <section className="mb-16 p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-200 dark:border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
              Engineering Rigor
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              The HiByHuman Triple Trust Guarantee &amp; Evidence
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Every package is backed by rigorous technical standards, clear milestones, and absolute commercial security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="text-3xl font-black text-cyan-400 font-mono mb-2">100%</div>
                <h3 className="text-base font-bold text-white mb-1">Money-Back Satisfaction</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Full refund during the initial concept phase if our work doesn't completely meet your expectations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Zero Financial Risk</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="text-3xl font-black text-cyan-400 font-mono mb-2">30 Days</div>
                <h3 className="text-base font-bold text-white mb-1">Post-Launch Warranty</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Complimentary bug-fixes, browser updates, and performance tuning for 30 days after your production release.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-cyan-400 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Full Technical Protection</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-200 dark:border-slate-800/80 flex flex-col justify-between">
              <div>
                <div className="text-3xl font-black text-cyan-400 font-mono mb-2">100% IP</div>
                <h3 className="text-base font-bold text-white mb-1">Source Code Transfer</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Complete repository ownership, vector source files, and commercial copyright transferred upon milestone delivery.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-900 text-[11px] text-amber-300 font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Unrestricted Commercial Rights</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contextual Links: 6 Core Services */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                Specialized Disciplines
              </span>
              <h2 className="text-2xl font-extrabold text-white mt-1">
                Explore Foundational Studio Services
              </h2>
            </div>
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              6 Canonical Practice Areas
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                slug: 'web-mobile-dev',
                title: 'Web & Mobile Development',
                desc: 'Full-stack web applications, React Native iOS/Android apps, and custom APIs.',
              },
              {
                slug: 'interactive-design',
                title: 'Interactive Design',
                desc: 'User-centric UI/UX architectures, design systems, and rapid interactive prototypes.',
              },
              {
                slug: 'motion-branding',
                title: 'Motion & Branding Design',
                desc: 'Bespoke vector logo suites, 2D/3D motion graphics, and comprehensive brand books.',
              },
              {
                slug: 'digital-marketing',
                title: 'Digital Marketing & SEO',
                desc: 'High-intent Google Ads PPC, conversion rate audits, and technical SEO architecture.',
              },
              {
                slug: 'concept-strategy',
                title: 'Concept & Strategy',
                desc: 'Market feasibility research, value proposition modeling, and investor-ready pitch decks.',
              },
              {
                slug: 'illustrations-prototype',
                title: 'Illustrations & Prototype',
                desc: 'Editorial publication art, 3D luxury packaging mockups, and clickable product simulations.',
              },
            ].map((srv) => (
              <a
                key={srv.slug}
                href={`/services/${srv.slug}`}
                onClick={(e) => {
                  if (onNavigateService) {
                    e.preventDefault();
                    onNavigateService(srv.slug);
                  }
                }}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-200 dark:border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{srv.desc}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono">
                  <span>/services/{srv.slug}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Bottom Fast Contact Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 border border-blue-800/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Need a Bespoke Scope or Custom Architecture?</h3>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Speak directly with our technical director in Coatbridge, Scotland. We customize deliverables to match your timeline.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="px-5 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{STUDIO_INFO.phone}</span>
            </a>
            <button
              type="button"
              onClick={onBackToHome}
              className="px-5 py-3 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-bold transition-colors cursor-pointer"
            >
              Return to Homepage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
