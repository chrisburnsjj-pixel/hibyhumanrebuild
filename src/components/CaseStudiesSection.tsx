import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowRight, Sparkles, CheckCircle2, Award, ChevronRight, X } from 'lucide-react';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  category: 'Branding & Identity' | 'Web & Mobile UI' | 'Packaging Systems' | 'Outdoor Campaigns' | 'Digital Marketing & PPC' | 'Social Media & Growth';
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  accentColor: string;
  sourceUrl: string;
}

export const CASE_STUDIES: CaseStudy[] = [
  // PXA Agency Featured Case Study: JD Prestige
  {
    id: 'jd-prestige',
    title: 'JD Prestige Supercar & Chauffeur Hire',
    client: 'JD Prestige Luxury Rentals (Mayfair, London)',
    category: 'Digital Marketing & PPC',
    tagline: 'High-intent Google Ads PPC reconstruction, SEO recovery & sub-second website speed.',
    description:
      'Engineered an aggressive digital turnaround for JD Prestige, London’s premier luxury supercar and chauffeur hire service. Overcame severe keyword cannibalization and high ad spend burn by rebuilding conversion tracking and launching high-converting landing experiences.',
    challenge:
      'Ineffective Google Ads campaigns draining acquisition budgets, slow mobile page load speeds, and poor organic search rankings for ultra-high-ticket luxury vehicle hire.',
    solution:
      'Conducted a forensic conversion tracking audit, optimized Google Ads with negative keyword shields, rebuilt key landing pages for sub-second speeds, and executed full-funnel SEO.',
    results: [
      '668.51 high-intent booking conversions recorded during campaign duration',
      'Secured #1 Google organic rankings across premier luxury car hire queries',
      'Page speed boosted to 99/100 Core Web Vitals on mobile and desktop',
      'Significantly reduced Cost Per Acquisition (CPA) on Google Search Ads',
    ],
    metrics: [
      { label: 'Booking Conversions', value: '668+' },
      { label: 'Core Web Vitals', value: '99/100' },
      { label: 'Google Search Rank', value: '#1 Luxury Hire' },
    ],
    tags: ['Google Ads PPC', 'SEO Overhaul', 'Supercar Rentals', 'Speed Optimization'],
    image: '/images/case-jd-prestige.jpg',
    accentColor: '#0066ff',
    sourceUrl: 'https://pxa.agency/our-work/',
  },
  // PXA Agency Featured Case Study: METCO Global
  {
    id: 'metco-global',
    title: 'METCO Global C-Suite Summit Platform',
    client: 'METCO Global Executive Forum',
    category: 'Branding & Identity',
    tagline: 'Complete enterprise rebrand, ultra-fast web portal & B2B LinkedIn executive growth.',
    description:
      'Spearheaded an authoritative digital rebrand and modern web infrastructure for METCO Global, a premier B2B international energy summit and C-suite executive networking organization.',
    challenge:
      'A legacy web presence that failed to project the prestige and institutional authority demanded by Fortune 500 energy executives and government delegates.',
    solution:
      'Designed a sophisticated corporate visual identity, developed a lightning-fast responsive website, instituted executive LinkedIn thought-leadership management, and established an ongoing digital care plan.',
    results: [
      '+237% annual organic social growth across LinkedIn C-suite decision-makers',
      'Over 45 Fortune 500 corporate summit sponsorships secured online',
      'Frictionless VIP delegate registration with automated calendar scheduling',
    ],
    metrics: [
      { label: 'Organic Social Growth', value: '+237%' },
      { label: 'C-Suite Sponsors', value: '45+ Enterprise' },
      { label: 'Bounce Rate', value: '-38%' },
    ],
    tags: ['C-Suite Rebrand', 'B2B LinkedIn', 'Web Platform', 'Executive Summit'],
    image: '/images/case-metco-global.jpg',
    accentColor: '#0284c7',
    sourceUrl: 'https://pxa.agency/our-work/',
  },
  // PXA Agency Featured Case Study: UFirstCoaching
  {
    id: 'ufirst-coaching',
    title: 'UFirstCoaching Medical Wellness & Growth',
    client: 'Dr. UFirst Coaching (NHS GP & Sports Doctor)',
    category: 'Social Media & Growth',
    tagline: 'Platform-tailored vertical video strategy, viral TikTok production & wellness community.',
    description:
      'Developed a dynamic social media powerhouse for an accredited NHS GP and sports physician, translating complex lifestyle medicine and mental wellness into viral, high-retention video content.',
    challenge:
      'Translating deep medical qualifications into digestible, engaging short-form video that resonates with younger demographics while maintaining clinical integrity and trust.',
    solution:
      'Built a platform-specific social strategy with 9:16 vertical video templates, kinetic typography, weekly content calendars, and an agile publishing cadence.',
    results: [
      '+570% surge in TikTok impressions and video completion rates within 60 days',
      'Established an engaged community of over 85,000 monthly wellness practitioners',
      'High-converting bio funnels driving 100% capacity in private medical coaching cohorts',
    ],
    metrics: [
      { label: 'TikTok Impressions', value: '+570%' },
      { label: 'Active Community', value: '85K+' },
      { label: 'Cohort Enrollment', value: '100% Full' },
    ],
    tags: ['Vertical Video 9:16', 'TikTok Strategy', 'Medical Wellness', 'Kinetic Motion'],
    image: '/images/fitlife-workout-reel.jpg',
    accentColor: '#10b981',
    sourceUrl: 'https://pxa.agency/our-work/',
  },
  // PXA Agency Featured Case Study: Concept Eye Clinic
  {
    id: 'concept-eye-clinic',
    title: 'Concept Eye Clinic & Laser Ophthalmology',
    client: 'Concept Eye Clinic (Newcastle / London)',
    category: 'Web & Mobile UI',
    tagline: 'Patient-centric booking UX, clinical authority branding & geo-targeted patient acquisition.',
    description:
      'Transformed the digital presence of Concept Eye Clinic into an elegant, reassuring clinical booking engine that seamlessly guides prospective patients from visual symptoms to private doctor consultations.',
    challenge:
      'Converting highly cautious patients seeking specialized laser and corneal surgery through a digital interface without losing human empathy or clinical rigor.',
    solution:
      'Architected an interactive symptom-to-treatment discovery workflow, transparent pricing breakdowns, live specialist profiles, and localized Google patient acquisition funnels.',
    results: [
      '3.8x increase in scheduled private ophthalmic and laser consultations',
      'Over 99.2% positive patient booking satisfaction rating on post-appointment feedback',
      'Dominated local high-intent medical search packs across prime clinical catchments',
    ],
    metrics: [
      { label: 'Private Consultations', value: '3.8x' },
      { label: 'Booking Friction', value: '-55%' },
      { label: 'Patient Sentiment', value: '99.2%' },
    ],
    tags: ['Clinical UI/UX', 'Patient Booking', 'Medical Authority', 'Local SEO'],
    image: '/images/case-concept-eye.jpg',
    accentColor: '#06b6d4',
    sourceUrl: 'https://pxa.agency/our-work/',
  },
  // PXA Agency Featured Case Study: Camden Audiology
  {
    id: 'camden-audiology',
    title: 'Camden Audiology Hearing Healthcare',
    client: 'Camden Audiology Diagnostic Practice London',
    category: 'Digital Marketing & PPC',
    tagline: 'Full brand identity overhaul, diagnostic hearing screener & high-efficiency PPC.',
    description:
      'Revitalized Camden Audiology with a modern, approachable identity, an interactive digital hearing screener, and targeted Google search ad campaigns designed to lower acquisition costs.',
    challenge:
      'Escalating cost-per-click across competitive Central London private audiology searches with high bounce rates from anxious elderly visitors.',
    solution:
      'Designed an accessible, high-contrast brand system, built an intuitive online 2-minute hearing assessment tool, and restructured search campaigns around specific symptoms.',
    results: [
      '-42% reduction in Cost Per Acquisition (CPA) on Google Ads',
      '3.4x increase in verified weekly audiology diagnostic clinic appointments',
      'Awarded Best Accessible Clinical Interface in London Healthcare Awards',
    ],
    metrics: [
      { label: 'CPA Reduction', value: '-42%' },
      { label: 'Weekly Bookings', value: '3.4x' },
      { label: 'Conversion Lift', value: '+64%' },
    ],
    tags: ['Hearing Healthcare', 'PPC Optimization', 'Accessible UX', 'Brand Identity'],
    image: '/images/case-camden-audiology.jpg',
    accentColor: '#8b5cf6',
    sourceUrl: 'https://pxa.agency/our-work/',
  },
  {
    id: 'sallaum-sky',
    title: 'Sallaum Sky Airlines',
    client: 'Sallaum Aviation Group',
    category: 'Web & Mobile UI',
    tagline: 'Modern European aviation brand identity & digital flight booking experience.',
    description:
      'Crafted a cohesive visual identity and frictionless digital booking ecosystem for Sallaum Sky Airlines, a forward-thinking European Lebanese low-cost carrier. The identity is inspired by the sky, pairing vibrant azure blue with sunrise orange accents.',
    challenge:
      'Differentiating a new aviation entrant in a competitive low-cost market while establishing instant consumer trust and driving direct ticket booking conversions.',
    solution:
      'Engineered an intuitive mobile-first booking interface, real-time fare comparison engine, seamless boarding pass wallet integration, and dynamic aircraft livery branding.',
    results: [
      'Comprehensive design system deployed across web, mobile, and airport signage',
      'Frictionless 3-step checkout flow reducing booking abandonment by 42%',
      'Sleek livery and physical collateral design for passenger touchpoints',
    ],
    metrics: [
      { label: 'Booking Conversion', value: '+48%' },
      { label: 'Monthly Active Users', value: '140K+' },
      { label: 'Design System Tokens', value: '250+' },
    ],
    tags: ['Aviation Brand', 'Flight Booking UI', 'Mobile App', 'Design System'],
    image: '/images/case-sallaum-sky.jpg',
    accentColor: '#0284c7',
    sourceUrl: 'https://upbound.studio/case-studies',
  },
  {
    id: 'remecure',
    title: 'RemeCure Skincare & Beauty',
    client: 'RemeCure Laboratories (Copenhagen / Dubai)',
    category: 'Packaging Systems',
    tagline: 'Psychology-driven visual trust architecture & luxury cosmetic packaging.',
    description:
      'Developed an authoritative yet tactile brand image and packaging architecture for RemeCure, a Scandinavian aesthetic dermatology brand operating across Denmark and the UAE.',
    challenge:
      'Translating complex clinical dermatological efficacy into a warm, approachable luxury skincare aesthetic that evokes psychological trust and retail shelf prominence.',
    solution:
      'Created minimalist matte-finish cosmetic containers, amber glass dropper systems, precision typography hierarchy, and a calm, clinical color palette.',
    results: [
      'Bespoke packaging design for 18 core dermatological formulations',
      'Rapid retail placement across premier department stores in Dubai & Scandinavia',
      'Consumer research indicated a 94% favorable trust rating on first impression',
    ],
    metrics: [
      { label: 'Retail Expansion', value: '3.2x' },
      { label: 'Consumer Trust Rating', value: '94%' },
      { label: 'Formulations Packaged', value: '18 SKUs' },
    ],
    tags: ['Cosmetic Packaging', 'Brand Strategy', 'Visual Psychology', 'Luxury Print'],
    image: '/images/case-remecure.jpg',
    accentColor: '#059669',
    sourceUrl: 'https://upbound.studio/case-studies',
  },
  {
    id: 'khan-al-saboun',
    title: 'Khan Al Saboun Heritage',
    client: 'Khan Al Saboun Bader Hassoun',
    category: 'Packaging Systems',
    tagline: 'Regal Mediterranean luxury packaging for Royal Edition & Love Charm scents.',
    description:
      'Designed ornate, regal packaging for Khan Al Saboun, an ancestral Lebanese organic soap master and international exporter celebrating centuries of artisanal soap craftsmanship.',
    challenge:
      'Honoring centuries-old ancestral botanical traditions while standing out vividly on modern luxury department store shelves across international luxury markets.',
    solution:
      'Designed lavish gold foil-stamped, deep emerald and obsidian textured packaging with custom crest iconography, botanical foil accents, and keepsake unboxing structures.',
    results: [
      'Flagship packaging suite for Royal Edition and Love Charm collections',
      'Expanded export distribution footprint into 42 countries worldwide',
      'Awarded Best Artisanal Packaging at Middle East Luxury Design Showcase',
    ],
    metrics: [
      { label: 'Export Markets', value: '42 Countries' },
      { label: 'Organic Certification', value: '100%' },
      { label: 'Gift Box Engagement', value: '+65%' },
    ],
    tags: ['Artisanal Soap', 'Gold Foil Embossing', 'Luxury Packaging', 'Heritage Brand'],
    image: '/images/case-khan-saboun.jpg',
    accentColor: '#d97706',
    sourceUrl: 'https://upbound.studio/case-studies',
  },
  {
    id: 'red-taxi',
    title: 'RED Taxi Disruptive Launch',
    client: 'RED Taxi Lebanon',
    category: 'Outdoor Campaigns',
    tagline: 'Nation-wide teaser campaign across 6,000 billboards & ride-hailing UX.',
    description:
      'Executed a high-impact nationwide disruption campaign for RED Taxi entering the urban transit market with cutting-edge dispatch technology and passenger transparency.',
    challenge:
      'Breaking through market saturation dominated by traditional legacy cabs and building massive nationwide curiosity prior to official mobile app release.',
    solution:
      'Launched a bold teaser strategy blanketing 6,000 billboards across Lebanon in pure, minimalist crimson red, followed by coordinated digital reveals and app download incentives.',
    results: [
      '6,000 billboards deployed simultaneously, generating viral social media buzz',
      'Became the #1 trending travel application on both App Store and Google Play during launch',
      'Clean passenger booking UI with transparent upfront pricing and live driver dispatching',
    ],
    metrics: [
      { label: 'Billboards Deployed', value: '6,000' },
      { label: 'App Store Rank', value: '#1 Travel' },
      { label: 'Social Impressions', value: '12M+' },
    ],
    tags: ['Outdoor Advertising', 'Billboard Strategy', 'Ride Hailing App', 'Viral Campaign'],
    image: '/images/case-red-taxi.jpg',
    accentColor: '#dc2626',
    sourceUrl: 'https://upbound.studio/case-studies',
  },
  {
    id: 'world-energy-council',
    title: 'World Energy Council',
    client: 'World Energy Council Global Secretariat',
    category: 'Branding & Identity',
    tagline: 'Global sustainable energy forum brand uplift & interactive summit platform.',
    description:
      'Spearheaded a modern brand uplift and digital event communications framework for the World Energy Council, the UN-accredited global forum driving sustainable energy transitions.',
    challenge:
      'Unifying communications across 100+ member nations with diverse energy matrices, modernizing legacy visual identity without sacrificing established institutional authority.',
    solution:
      'Engineered an evolutionary logo uplift, responsive event digital guide for World Energy Week, dynamic energy transition data charts, and interactive delegate engagement tools.',
    results: [
      'Global brand guideline and digital asset library adopted across 100+ national committees',
      'Interactive World Energy Week web portal serving thousands of high-level delegates',
      'Data visualization components clarifying complex green transition scenarios',
    ],
    metrics: [
      { label: 'Member Nations', value: '100+' },
      { label: 'Delegates Reached', value: '12,000+' },
      { label: 'Policy Reports', value: '45+ Assets' },
    ],
    tags: ['Sustainable Energy', 'Global Forum', 'Identity Uplift', 'Data Visuals'],
    image: '/images/case-world-energy.jpg',
    accentColor: '#0891b2',
    sourceUrl: 'https://upbound.studio/case-studies',
  },
  {
    id: 'el-piropo',
    title: 'El Piropo Culinary & Bar',
    client: 'El Piropo Hospitality Group',
    category: 'Branding & Identity',
    tagline: 'Bespoke gastronomic brand identity, editorial menus & digital table booking.',
    description:
      'Crafted an evocative visual world for El Piropo, a fine-dining culinary destination combining Mediterranean passion with contemporary epicurean storytelling.',
    challenge:
      'Creating a multisensory identity that feels both romantically traditional and effortlessly modern, carrying through physical table settings to digital reservations.',
    solution:
      'Custom typography with hand-cut serif nuances, tactile linen-bound menu books, brass foil embossed coasters, and a frictionless reservation web experience.',
    results: [
      'Full brand experience design spanning physical dining touchpoints and digital discovery',
      'Custom reservations workflow resulting in 98% table occupancy during opening quarter',
      'Editorial cocktail book selected for international hospitality design features',
    ],
    metrics: [
      { label: 'Table Occupancy', value: '98%' },
      { label: 'Direct Reservations', value: '82%' },
      { label: 'Editorial Collateral', value: '12 Touchpoints' },
    ],
    tags: ['Gastronomy', 'Editorial Menus', 'Hospitality Identity', 'Reservation UI'],
    image: '/images/case-el-piropo.jpg',
    accentColor: '#ea580c',
    sourceUrl: 'https://upbound.studio/case-studies',
  },
];

const CATEGORIES = [
  'All',
  'Digital Marketing & PPC',
  'Web & Mobile UI',
  'Branding & Identity',
  'Social Media & Growth',
  'Packaging Systems',
  'Outdoor Campaigns',
] as const;

interface CaseStudiesSectionProps {
  onOpenFittingModal: (serviceOrProjectName?: string) => void;
}

export function CaseStudiesSection({ onOpenFittingModal }: CaseStudiesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeStudy, setActiveStudy] = useState<CaseStudy | null>(null);

  const filteredStudies =
    selectedCategory === 'All'
      ? CASE_STUDIES
      : CASE_STUDIES.filter((study) => study.category === selectedCategory);

  return (
    <section id="case-studies" className="relative py-24 sm:py-32 w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#0052cc] text-xs sm:text-sm font-mono font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#0066ff]" />
            <span>FEATURED CASE STUDIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
            Real Impact. Proven Deliverables.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal mt-4 leading-relaxed">
            Explore our featured client engagements spanning airline booking ecosystems, luxury packaging systems, 
            multi-national outdoor advertising campaigns, and institutional identity uplifts.
          </p>
        </div>

        {/* External link reference to Upbound Studio */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <a
            href="https://upbound.studio/case-studies"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066ff] hover:text-[#0052cc] transition-colors group"
          >
            <span>upbound.studio/case-studies</span>
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0066ff] text-white shadow-md shadow-blue-500/25 ring-2 ring-cyan-300'
                  : 'bg-white text-slate-700 hover:bg-blue-50 hover:text-[#0066ff] border border-blue-200'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredStudies.map((study, idx) => (
            <motion.article
              key={study.id}
              layout
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
              onClick={() => setActiveStudy(study)}
              className={`group relative rounded-3xl bg-white border border-blue-100/90 shadow-[0_4px_24px_rgba(0,102,255,0.06)] hover:border-[#0066ff] hover:shadow-[0_16px_36px_rgba(0,102,255,0.14)] overflow-hidden flex flex-col cursor-pointer hbh-card-motion hbh-card-sheen ${
                idx === 0 ? 'hbh-card-sheen-periodic' : ''
              }`}
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-blue-50 hbh-image-container">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover object-center hbh-image-scale"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0038a8]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <span className="text-xs text-white font-medium inline-flex items-center gap-1.5 bg-[#0052cc]/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                    <span>Inspect Case Study</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="text-[11px] font-mono font-bold tracking-wide uppercase px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[#0052cc] shadow-sm border border-blue-100">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-semibold text-[#0066ff] uppercase tracking-wider block mb-1">
                    {study.client}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-creative text-slate-900 tracking-tight mb-2 group-hover:text-[#0066ff] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-slate-600 font-normal line-clamp-2 leading-relaxed mb-4">
                    {study.tagline}
                  </p>
                </div>

                {/* Metrics Highlight & Tags */}
                <div>
                  <div className="grid grid-cols-2 gap-2 py-3 border-y border-blue-100 mb-4 bg-blue-50/50 rounded-xl px-3">
                    {study.metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label}>
                        <div className="text-lg font-bold text-[#0052cc] tracking-tight">
                          {metric.value}
                        </div>
                        <div className="text-[11px] text-slate-500 leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {study.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 text-[#0052cc] border border-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-[#0066ff] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Case Study Detail Modal */}
      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#002b66]/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-blue-100"
            >
              {/* Modal Close Button */}
              <button
                type="button"
                aria-label="Close modal"
                onClick={() => setActiveStudy(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 flex items-center justify-center text-slate-700 hover:text-[#0066ff] transition-colors cursor-pointer shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Hero Image in Modal */}
              <div className="relative aspect-[16/9] w-full bg-blue-50 overflow-hidden">
                <img
                  src={activeStudy.image}
                  alt={activeStudy.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0038a8]/90 via-[#0052cc]/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-cyan-200 font-mono font-bold mb-2 block">
                    {activeStudy.category} • {activeStudy.client}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-bold font-creative tracking-tight text-white mb-2">
                    {activeStudy.title}
                  </h2>
                  <p className="text-sm sm:text-base text-blue-50 max-w-2xl font-normal">
                    {activeStudy.tagline}
                  </p>
                </div>
              </div>

              {/* Modal Content Details */}
              <div className="p-6 sm:p-8 md:p-10 space-y-8">
                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-blue-50/60 border border-blue-100">
                  {activeStudy.metrics.map((m) => (
                    <div key={m.label} className="text-center">
                      <div className="text-2xl sm:text-3xl font-bold text-[#0052cc] tracking-tight">
                        {m.value}
                      </div>
                      <div className="text-xs text-slate-600 mt-1 font-medium">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Overview & Challenge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold font-creative text-slate-900 mb-2">Project Overview</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {activeStudy.description}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold font-creative text-slate-900 mb-2">The Strategic Challenge</h3>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {activeStudy.challenge}
                    </p>
                  </div>
                </div>

                {/* Solution & Results */}
                <div>
                  <h3 className="text-lg font-bold font-creative text-slate-900 mb-2">Our Solution</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-4">
                    {activeStudy.solution}
                  </p>

                  <div className="space-y-2.5 mt-4">
                    {activeStudy.results.map((r, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-5 h-5 text-[#0066ff] shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{r}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Modal Footer CTA */}
                <div className="pt-6 border-t border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <a
                    href={activeStudy.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 hover:text-[#0066ff] inline-flex items-center gap-1.5"
                  >
                    <span>Reference on upbound.studio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStudy(null);
                        onOpenFittingModal(`Case Study Inquiry: ${activeStudy.title}`);
                      }}
                      className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0066ff] hover:bg-[#0052cc] text-white font-bold font-creative text-sm transition-all shadow-md shadow-blue-500/25 cursor-pointer flex items-center justify-center gap-2 hover:scale-105"
                    >
                      <span>Scope Similar Project</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
