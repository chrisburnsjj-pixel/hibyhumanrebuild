import React, { useState } from 'react';
import { Sparkles, ArrowRight, ExternalLink, Eye, Filter, CheckCircle2, X, ZoomIn, Play, ShieldCheck, Heart, Share2, Award } from 'lucide-react';

interface PortfolioShowcaseSectionProps {
  onOpenFittingModal: (projectName?: string) => void;
  onNavigateCaseStudies?: () => void;
  onNavigatePortfolio?: () => void;
}

export interface ShowcaseWork {
  id: string;
  title: string;
  category: 'Social Media' | 'Web & Apps' | 'Branding' | 'Packaging' | 'Publishing' | 'Pitch Decks' | 'Growth & PPC';
  client: string;
  year: string;
  description: string;
  stats: string;
  tags: string[];
  image: string;
  accent: string;
  deliverables?: string[];
  highlight?: string;
}

export const PORTFOLIO_WORKS: ShowcaseWork[] = [
  // PXA Agency: JD Prestige
  {
    id: 'work-jd-prestige',
    title: 'JD Prestige Supercar Hire - Google Ads PPC & SEO Turnaround',
    category: 'Growth & PPC',
    client: 'JD Prestige London',
    year: '2024',
    description: 'Complete PPC advertising restructure, negative keyword filtration, and high-conversion landing page deployment for luxury McLaren & Rolls Royce rentals in Mayfair.',
    stats: '668+ Booking Conversions & #1 Google Rank',
    tags: ['Google Ads PPC', 'SEO Overhaul', 'Supercar Fleet', 'Conversion Engine'],
    image: '/images/case-jd-prestige.jpg',
    accent: '#0066ff',
    deliverables: ['PPC Search Campaigns', 'Forensic Conversion Audit', 'Sub-Second Landing Pages', 'Target Keyword Mastery'],
    highlight: 'UK Luxury Car Hire Leader',
  },
  // PXA Agency: METCO Global
  {
    id: 'work-metco',
    title: 'METCO Global - C-Suite Executive Energy Summit Rebrand & Portal',
    category: 'Branding',
    client: 'METCO Global Forum',
    year: '2024',
    description: 'Enterprise brand uplift, interactive delegate schedule web portal, and B2B LinkedIn thought-leadership management connecting Fortune 500 energy decision-makers.',
    stats: '+237% Annual Organic Social Growth',
    tags: ['C-Suite Branding', 'B2B LinkedIn', 'Web Platform', 'Executive Summit'],
    image: '/images/case-metco-global.jpg',
    accent: '#0284c7',
    deliverables: ['Corporate Brand Guidelines', 'High-Speed Web Portal', 'LinkedIn Executive Content', 'Annual Care Retainer'],
    highlight: 'Global Energy Summit',
  },
  // PXA Agency: Concept Eye Clinic
  {
    id: 'work-concept-eye',
    title: 'Concept Eye Clinic - Patient-First Diagnostic & Laser Ophthalmology UX',
    category: 'Web & Apps',
    client: 'Concept Eye Clinic UK',
    year: '2024',
    description: 'Patient-centric booking portal, symptom assessment journey, clinical authority design system, and localized Google search campaign.',
    stats: '3.8x Increase in Private Patient Bookings',
    tags: ['Clinical UI/UX', 'Patient Booking', 'Medical Authority', 'Local SEO'],
    image: '/images/case-concept-eye.jpg',
    accent: '#06b6d4',
    deliverables: ['Online Patient Scheduler', 'Interactive Symptom Screener', 'Mobile-Responsive UX', 'High-Trust Aesthetic'],
    highlight: 'Medical Ophthalmology Portal',
  },
  // PXA Agency: Camden Audiology London
  {
    id: 'work-camden-audiology',
    title: 'Camden Audiology London - Hearing Health Brand & High-Efficiency PPC',
    category: 'Growth & PPC',
    client: 'Camden Audiology Diagnostic Suite',
    year: '2024',
    description: 'Modern healthcare identity overhaul, digital 2-minute online hearing screener, and strict negative-match Google Ads optimization reducing cost per acquisition.',
    stats: '-42% CPA & 3.4x Weekly Diagnostic Bookings',
    tags: ['Hearing Care', 'Google PPC', 'Accessible UX', 'Brand System'],
    image: '/images/case-camden-audiology.jpg',
    accent: '#8b5cf6',
    deliverables: ['Brand Identity Suite', 'Online Screener Tool', 'PPC Account Rebuild', 'Conversion Tracking'],
    highlight: 'London Diagnostic Practice',
  },
  {
    id: 'work-fitlife',
    title: 'FitLife Transform - High-Intensity Workout Reels & Fitness App',
    category: 'Social Media',
    client: 'FitLife Coaching UK',
    year: '2024',
    description: 'Dynamic vertical 9:16 Instagram & TikTok workout video series, high-retention movement cuts, kinetic text overlays, and personalized nutrition plan interfaces.',
    stats: '+380% Engagement & 4.2M Organic Reel Views',
    tags: ['9:16 Reels', 'Kinetic Typography', 'Social Growth', 'TikTok & IG'],
    image: '/images/fitlife-workout-reel.jpg',
    accent: '#0066ff',
    deliverables: ['30+ High-Retention Reels', 'Kinetic Caption System', 'Mobile App UI Kit', 'Soundtrack Licensing'],
    highlight: 'Viral TikTok & Instagram Series',
  },
  {
    id: 'work-wicket',
    title: 'Wicket Travel Holidays - Luxury Dream Vacation Social Campaign',
    category: 'Social Media',
    client: 'Wicket Travel & Tours',
    year: '2024',
    description: 'High-conversion panoramic social media advertising campaign banners, carousel stories, turquoise waters, sunset flights, and bespoke itinerary booking funnels.',
    stats: '3.4x Booking Conversion Rate',
    tags: ['Campaign Banners', 'Paid Ads Creative', 'Luxury Travel', 'Carousel Stories'],
    image: '/images/wicket-travel-banner.jpg',
    accent: '#00d4ff',
    deliverables: ['Omnichannel Social Banners', 'Meta & TikTok Paid Creatives', 'Travel Story Highlights', 'Lead Gen Funnels'],
    highlight: 'Multi-Market Tourism Campaign',
  },
  {
    id: 'work-sensur',
    title: 'Sensur Revitalizing Skincare - Luxury Serum Launch & Social Grid',
    category: 'Packaging',
    client: 'Sensur Skincare Paris / London',
    year: '2024',
    description: 'Prestige gold and frosted glass dropper bottle packaging, luxury product kit design, tactile finishes, and curated Instagram launch visual grid.',
    stats: '£180k Pre-Orders in First 72h',
    tags: ['Cosmetic Packaging', '3D Photoreal Render', 'E-Commerce Grid', 'Brand Collateral'],
    image: '/images/sensur-luxury-serum.jpg',
    accent: '#d97706',
    deliverables: ['Custom Bottle Mold Blueprint', 'Secondary Rigid Box Packaging', 'Social Media Launch Teasers', 'Shopify 3D Assets'],
    highlight: 'Prestige Botanical Line',
  },
  {
    id: 'work-deluchiz',
    title: 'Deluchiz Prestige Gift Box - Bespoke Rigid Packaging & Unboxing',
    category: 'Packaging',
    client: 'Deluchiz Confectionery & Luxury Gifts',
    year: '2024',
    description: 'Bespoke magnetic rigid gift box with gold foil stamping, custom structural die-cut inserts, ribbon pull tabs, and influencer unboxing campaign.',
    stats: 'Sold Out 1st Production Run',
    tags: ['Rigid Box Design', 'Foil Stamping', 'Unboxing Campaign', 'Luxury Packaging'],
    image: '/images/deluchiz-gift-set.jpg',
    accent: '#e11d48',
    deliverables: ['Custom Die-Line Architecture', 'Hot Foil & Emboss Tooling', 'Influencer Unboxing Kits', 'Social Teaser Series'],
    highlight: 'Luxury Retail Packaging',
  },
  {
    id: 'work-jc-nova',
    title: "J.C. Nova Parfum d'Etoile - Prestige Fragrance Launch & Social",
    category: 'Packaging',
    client: 'J.C. Nova Haute Parfumerie',
    year: '2024',
    description: 'Bespoke flacon bottle design, embossed textured outer box, dark luxury social campaign aesthetics, and perfume counter visual merchandising.',
    stats: 'Vogue & GQ Feature Recognition',
    tags: ['Perfume Design', 'Prestige Identity', 'Social Ad Mockups', 'Print Finishes'],
    image: '/images/jc-nova-perfume.jpg',
    accent: '#8b5cf6',
    deliverables: ['Custom Flacon 3D CAD', 'Textured Paper Box Finish', 'Editorial Social Ads', 'Point-of-Sale Displays'],
    highlight: 'Haute Fragrance Launch',
  },
  {
    id: 'work-soilscent',
    title: 'Soilscent Organics - 3D Embossed Gold Monogram Medallion',
    category: 'Branding',
    client: 'Soilscent Botanical Cosmetics',
    year: '2024',
    description: 'Luxury 3D embossed metallic gold S monogram emblem with graceful botanical leaves on textured rich bronze leather medallion and complete brand guidelines.',
    stats: '100% Bespoke Identity',
    tags: ['3D Monogram', 'Embossed Medallion', 'Luxury Branding', 'Vector System'],
    image: '/images/soilscent-luxury-logo.jpg',
    accent: '#ca8a04',
    deliverables: ['Vector Monogram Master Files', '3D Metallic Coin Assets', 'Color Palette & Typography Book', 'Social Profile Avatars'],
    highlight: 'Heritage Botanical Monogram',
  },
  {
    id: 'work-neonriot',
    title: 'Neon Riot Streetwear - "Calm In Chaos" Social Lookbook & Drops',
    category: 'Social Media',
    client: 'Neon Riot Underground',
    year: '2024',
    description: 'Raw cyberpunk-inspired streetwear lookbook, oversized graphic tees, Instagram story drops, and limited edition seasonal launch reel assets.',
    stats: '12,000 Units Sold in 24 Hours',
    tags: ['Streetwear Lookbook', 'IG Story Drops', 'Apparel Graphics', 'Motion Teaser'],
    image: '/images/cyber-human-model.jpg',
    accent: '#06b6d4',
    deliverables: ['Instagram Drop Engine', 'Short-Form Motion Teasers', 'Lookbook Editorial Grid', 'Direct-to-Garment Files'],
    highlight: 'Limited Edition Drop',
  },
  {
    id: 'work-redtaxi',
    title: 'Red Taxi Fleet On-Demand Transit App & Social Campaign',
    category: 'Web & Apps',
    client: 'Red Taxi Group',
    year: '2024',
    description: 'Complete cross-platform passenger booking application with live driver GPS telemetry, split-fare capability, and regional social onboarding ads.',
    stats: 'Over 250,000 Completed Rides',
    tags: ['React Native', 'Real-Time Telemetry', 'Social Ads', 'Mobile UI/UX'],
    image: '/images/case-red-taxi.jpg',
    accent: '#ef4444',
    deliverables: ['iOS & Android Apps', 'Driver Dispatch Console', 'App Store Creative Assets', 'Citywide Social Promo'],
    highlight: 'Smart Transit Platform',
  },
  {
    id: 'work-khansaboun',
    title: 'Khan Al Saboun Heritage Soap - Global E-Commerce & Content',
    category: 'Branding',
    client: 'Khan Al Saboun Heritage',
    year: '2024',
    description: 'Centuries-old artisanal soap brand modernized for global luxury wellness consumers with heritage typography, gold packaging, and multi-language social reels.',
    stats: '+310% Overseas E-Commerce Growth',
    tags: ['Heritage Branding', 'Arabic Calligraphy', 'Luxury E-Commerce', 'Reels Content'],
    image: '/images/case-khan-saboun.jpg',
    accent: '#059669',
    deliverables: ['Bespoke Calligraphic Logo', 'Luxury Gold Embossed Boxes', 'Heritage Story Video Reels', 'Shopify Global Storefront'],
    highlight: 'Historic Luxury Wellness',
  },
  {
    id: 'work-sallaum',
    title: 'Sallaum Lines Maritime Logistics - Enterprise Cargo Portal',
    category: 'Web & Apps',
    client: 'Sallaum Lines Global',
    year: '2024',
    description: 'High-performance tracking system for oceanic vehicle logistics, real-time vessel telemetry, and instant bill of lading generation.',
    stats: 'Global Fleet Telemetry Visibility',
    tags: ['React', 'TypeScript', 'Telematics API', 'Enterprise UI'],
    image: '/images/case-sallaum-sky.jpg',
    accent: '#0284c7',
    deliverables: ['Customer Cargo Dashboard', 'Live Vessel Tracking Radar', 'Automated PDF Docs', 'Enterprise API Gateway'],
    highlight: 'Oceanic Transport System',
  },
  {
    id: 'work-elpiropo',
    title: 'El Piropo Artisanal Mexican Kitchen - Brand Experience & Digital',
    category: 'Branding',
    client: 'El Piropo Restaurants',
    year: '2024',
    description: 'Vibrant culinary branding, custom hand-drawn typography, tactile menu embossing, and seamless table QR-ordering experience.',
    stats: '+210% Digital Orders & Bookings',
    tags: ['Culinary Brand', 'Menu Design', 'QR Ordering', 'Signage'],
    image: '/images/case-el-piropo.jpg',
    accent: '#ea580c',
    deliverables: ['Handcrafted Brand Identity', 'Embossed Leather Menus', 'Web App QR Ordering', 'Exterior Architectural Signage'],
    highlight: 'Culinary Identity & Tech',
  },
  {
    id: 'work-remecure',
    title: 'Remecure Clinical Aesthetics - Medical Dermatology Platform',
    category: 'Web & Apps',
    client: 'Remecure Laboratories',
    year: '2024',
    description: 'High-trust clinical skincare consultation platform with AI skin-diagnostic assessment and dermatologist appointment scheduling.',
    stats: '99.4% Patient Approval Rating',
    tags: ['Clinical UX', 'HIPAA/GDPR Compliant', 'Booking System', 'Next.js'],
    image: '/images/case-remecure.jpg',
    accent: '#0284c7',
    deliverables: ['Clinical Telehealth Portal', 'Skin Diagnostic Engine', 'Custom Content System', 'Patient Mobile App'],
    highlight: 'Medical Aesthetics Platform',
  },
];

const CATEGORIES = ['All', 'Social Media', 'Growth & PPC', 'Web & Apps', 'Branding', 'Packaging', 'Publishing'] as const;

export function PortfolioShowcaseSection({
  onOpenFittingModal,
  onNavigateCaseStudies,
  onNavigatePortfolio,
}: PortfolioShowcaseSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProject, setActiveProject] = useState<ShowcaseWork | null>(null);

  const filtered =
    selectedCategory === 'All'
      ? PORTFOLIO_WORKS
      : PORTFOLIO_WORKS.filter((w) => w.category === selectedCategory);

  return (
    <section id="portfolio" className="py-12 sm:py-16 bg-slate-950/60 backdrop-blur-md text-slate-100 relative overflow-hidden border-t border-slate-800/80">
      {/* Background radial subtle ambient glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-2 shadow-[0_0_10px_rgba(0,212,255,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>04 / CURATED CLIENT PORTFOLIO</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Featured Portfolio Highlights.<br />
              <span className="italic font-normal text-slate-400 block text-lg sm:text-xl lg:text-2xl mt-0.5">
                Real outcomes. Multi-disciplinary excellence.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigatePortfolio || (() => { window.location.hash = 'portfolio-archive'; })}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs transition-all shadow-[0_0_15px_rgba(0,212,255,0.3)] flex items-center gap-1.5 cursor-pointer"
            >
              <span>Full Portfolio Archive (20+)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-slate-950 font-black shadow-[0_0_12px_rgba(0,212,255,0.4)] ring-2 ring-cyan-400'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-cyan-300 border border-slate-800'
              }`}
            >
              {cat === 'Social Media' ? '📱 Social Media & Reels' : cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid (Curated 3 items on homepage) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {filtered.slice(0, 3).map((work, idx) => (
            <div
              key={work.id}
              onClick={() => setActiveProject(work)}
              className={`group rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/60 overflow-hidden flex flex-col justify-between cursor-pointer hbh-card-motion hbh-card-sheen ${
                idx === 0 ? 'hbh-card-sheen-periodic' : ''
              }`}
            >
              <div>
                {/* Visual Image Preview */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 hbh-image-container">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center hbh-image-scale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex justify-between items-center z-10 pointer-events-none">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-cyan-300 text-[11px] font-mono font-bold border border-slate-800 shadow-sm">
                      {work.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md text-slate-400 text-[11px] font-mono border border-slate-800">
                      {work.year}
                    </span>
                  </div>

                  {/* Impact Metric Banner */}
                  <div className="absolute bottom-3 inset-x-3 z-10 flex items-center justify-between pointer-events-none">
                    <span className="inline-block px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-[11px] font-mono font-black shadow-md">
                      {work.stats}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-950/90 backdrop-blur-md text-cyan-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-slate-700">
                      <ZoomIn className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="text-xs text-cyan-400 font-mono font-semibold mb-1">{work.client}</div>
                  <h3 className="text-base sm:text-lg font-bold font-creative text-slate-100 tracking-tight mb-1 group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {work.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-3 line-clamp-2">
                    {work.description}
                  </p>

                  {/* Tech / Deliverable Tags */}
                  <div className="flex flex-wrap gap-1 mb-2">
                    {work.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-slate-800/90 text-cyan-300 border border-slate-700/80 text-[10px] font-mono font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="p-5 pt-0 mt-auto border-t border-slate-800/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenFittingModal(`Inquiry about ${work.title} (50% First-Order Promo)`);
                  }}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Scope (-50% Off)</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
                <span className="text-[10px] text-slate-500 font-mono">100% Bespoke</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dual Inner-Page Exploration Card */}
        <div className="p-5 sm:p-6 rounded-3xl bg-slate-900/95 text-white border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-creative text-white">
                Looking for Detailed Case Studies or Complete 20+ Works?
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Explore in-depth performance breakdowns, metrics, and high-resolution deliverables on our dedicated inner pages.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onNavigateCaseStudies || (() => { window.location.hash = 'case-studies'; })}
              className="px-4 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-slate-700 hbh-btn-motion"
            >
              <span>Case Studies (Inner Page)</span>
              <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
            </button>
            <button
              type="button"
              onClick={onNavigatePortfolio || (() => { window.location.hash = 'portfolio-archive'; })}
              className="px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,212,255,0.3)] hbh-btn-motion"
            >
              <span>Full Portfolio (Inner Page)</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Lightbox / Project Details Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold border border-cyan-500/30">
                  {activeProject.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Client: {activeProject.client} • {activeProject.year}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer transition-colors border border-slate-700"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* Full Image Preview */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full max-h-[420px] object-cover object-center"
                />
                <div className="absolute bottom-3 left-3 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-black text-xs shadow-md">
                  {activeProject.stats}
                </div>
              </div>

              {/* Title & Full Description */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold font-creative text-white tracking-tight mb-2">
                  {activeProject.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Deliverables Grid if available */}
              {activeProject.deliverables && (
                <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-300 font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Project Scope & Core Deliverables</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeProject.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags & Guarantees */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5">
                  {activeProject.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-slate-800 text-cyan-300 border border-slate-700 text-xs font-mono font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>100% Unique Bespoke IP</span>
                </div>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-5 sm:p-6 border-t border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <div className="text-xs text-slate-400">Want similar results for your business?</div>
                <div className="text-sm font-bold text-cyan-300">50% First Order Discount Applied</div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="w-1/2 sm:w-auto px-5 py-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const title = activeProject.title;
                    setActiveProject(null);
                    onOpenFittingModal(`Inquiry about ${title} (50% First Order Discount)`);
                  }}
                  className="w-1/2 sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all hover:scale-105 font-creative"
                >
                  <span>Scope Similar Project</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
