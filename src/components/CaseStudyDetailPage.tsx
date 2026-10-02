import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Award,
  ShieldCheck,
  TrendingUp,
  ExternalLink,
  Layers,
  Phone,
} from 'lucide-react';
import { CaseStudy } from './CaseStudiesSection';
import { STUDIO_INFO } from '../data';
import { HiByHumanIcon } from './Logo';
import { useSEO } from '../hooks/useSEO';

interface CaseStudyDetailPageProps {
  caseStudy: CaseStudy;
  onNavigateHome: () => void;
  onNavigateCaseStudiesList: () => void;
  onNavigateService: (slug: string) => void;
  onNavigatePackages: () => void;
  onOpenFittingModal: (subject?: string) => void;
}

// Mapping case study IDs to relevant service slugs
const CASE_STUDY_SERVICES_MAP: Record<string, Array<{ slug: string; name: string }>> = {
  'jd-prestige-cars': [
    { slug: 'digital-marketing', name: 'Digital Marketing & SEO' },
    { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
  ],
  'jd-prestige': [
    { slug: 'digital-marketing', name: 'Digital Marketing & SEO' },
    { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
  ],
  'metco-global': [
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
    { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
    { slug: 'concept-strategy', name: 'Concept & Strategy' },
  ],
  'ufirst-coaching': [
    { slug: 'digital-marketing', name: 'Digital Marketing & SEO' },
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
  ],
  'concept-eye-clinic': [
    { slug: 'interactive-design', name: 'Interactive Design' },
    { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
    { slug: 'digital-marketing', name: 'Digital Marketing & SEO' },
  ],
  'camden-audiology': [
    { slug: 'digital-marketing', name: 'Digital Marketing & SEO' },
    { slug: 'interactive-design', name: 'Interactive Design' },
  ],
  'sallaum-sky': [
    { slug: 'interactive-design', name: 'Interactive Design' },
    { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
  ],
  'remecure': [
    { slug: 'illustrations-prototype', name: 'Illustrations & Prototype' },
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
  ],
  'khan-al-saboun': [
    { slug: 'illustrations-prototype', name: 'Illustrations & Prototype' },
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
  ],
  'red-taxi': [
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
    { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
  ],
  'world-energy-council': [
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
    { slug: 'interactive-design', name: 'Interactive Design' },
  ],
  'el-piropo': [
    { slug: 'motion-branding', name: 'Motion & Branding Design' },
    { slug: 'interactive-design', name: 'Interactive Design' },
  ],
};

export function CaseStudyDetailPage({
  caseStudy,
  onNavigateHome,
  onNavigateCaseStudiesList,
  onNavigateService,
  onNavigatePackages,
  onOpenFittingModal,
}: CaseStudyDetailPageProps) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [caseStudy.id]);

  const canonicalSlug =
    caseStudy.id === 'jd-prestige' || caseStudy.id === 'jd-prestige-cars'
      ? 'jd-prestige-cars'
      : caseStudy.id;
  const canonicalPath = `/case-studies/${canonicalSlug}`;
  const canonicalUrl = `https://www.hibyhuman.com${canonicalPath}`;

  const relatedServices =
    CASE_STUDY_SERVICES_MAP[canonicalSlug] ||
    CASE_STUDY_SERVICES_MAP[caseStudy.id] || [
      { slug: 'web-mobile-dev', name: 'Web & Mobile Development' },
    ];

  // Dynamic SEO & Structured Data (BreadcrumbList + Article schema for technical case studies)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.hibyhuman.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Case Studies',
            item: 'https://www.hibyhuman.com/case-studies',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: caseStudy.title,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Article',
        headline: `${caseStudy.title} | Case Study`,
        description: caseStudy.description,
        author: {
          '@type': 'Organization',
          name: 'HiByHuman',
          url: 'https://www.hibyhuman.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'HiByHuman',
          url: 'https://www.hibyhuman.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.hibyhuman.com/images/hibyhuman-logo.png',
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        datePublished: '2024-01-15T09:00:00+00:00',
        dateModified: '2026-09-18T08:00:00+00:00',
      },
    ],
  };

  useSEO({
    title: `${caseStudy.title} | Case Study`,
    description: caseStudy.description.slice(0, 165),
    canonicalPath,
    noindex: false,
    jsonLd,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      {/* ============================================================ */}
      {/* TOP STICKY INNER NAVIGATION BAR                               */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-10 py-4 transition-all">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/case-studies"
              onClick={(e) => {
                e.preventDefault();
                onNavigateCaseStudiesList();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 hover:text-cyan-300 text-xs font-semibold border border-cyan-800/60 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>All Case Studies</span>
            </a>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <HiByHumanIcon className="w-6 h-6" animated={true} />
              <span className="font-bold text-sm tracking-tight text-white font-creative">
                HiByHuman Studio
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                {caseStudy.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenFittingModal(`Case Study Inquiry - ${caseStudy.title}`)}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 text-xs font-black transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Similar Results</span>
            </button>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* BREADCRUMB NAVIGATION                                         */}
      {/* ============================================================ */}
      <nav aria-label="Breadcrumb" className="max-w-[1500px] mx-auto px-6 sm:px-10 pt-6">
        <ol className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <li>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              Home
            </a>
          </li>
          <li className="text-slate-600">/</li>
          <li>
            <a
              href="/case-studies"
              onClick={(e) => {
                e.preventDefault();
                onNavigateCaseStudiesList();
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              Case Studies
            </a>
          </li>
          <li className="text-slate-600">/</li>
          <li className="text-cyan-400 font-semibold truncate max-w-[240px] sm:max-w-none">
            {caseStudy.title}
          </li>
        </ol>
      </nav>

      {/* ============================================================ */}
      {/* CASE STUDY HERO SECTION                                       */}
      {/* ============================================================ */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold tracking-wider">
                {caseStudy.category.toUpperCase()}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Client: <strong className="text-white">{caseStudy.client}</strong>
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              {caseStudy.title}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed mb-6">
              {caseStudy.tagline}
            </p>

            <p className="text-base text-slate-400 leading-relaxed mb-8">
              {caseStudy.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {caseStudy.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenFittingModal(`Case Study Consultation - ${caseStudy.title}`)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request Case Study Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2"
              >
                <span>Ask via WhatsApp</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VERIFIED KEY METRICS                                          */}
      {/* ============================================================ */}
      <section className="bg-slate-900/60 border-b border-slate-800 py-10">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
          <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-6">
            Verified Project Telemetry &amp; Commercial Impact
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {caseStudy.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
              >
                <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono mb-2">
                  {metric.value}
                </span>
                <span className="text-sm text-slate-300 font-semibold">{metric.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PROBLEM & ARCHITECTURAL SOLUTION DEEP DIVE                    */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* The Challenge */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-red-500/20">
              <span className="text-xs font-mono text-red-400 tracking-wider uppercase font-bold">
                The Problem
              </span>
              <h2 className="text-2xl font-bold text-white mt-2 mb-4">
                The Commercial &amp; Technical Challenge
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                {caseStudy.challenge}
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-300">Client Context:</div>
                <div>{caseStudy.client}</div>
              </div>
            </div>

            {/* The Solution */}
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-cyan-500/20">
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                The Execution
              </span>
              <h2 className="text-2xl font-bold text-white mt-2 mb-4">
                Engineered Solution &amp; Delivery
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base mb-6">
                {caseStudy.solution}
              </p>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-300 space-y-1">
                <div className="font-semibold text-white">Execution Principle:</div>
                <div>Custom blank-canvas development, rapid iteration, and strict metric telemetry.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DOCUMENTED RESULTS LIST                                       */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-10">
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
              Outcomes
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Verified Project Deliverables &amp; Outcomes
            </h2>
          </div>

          <div className="space-y-4">
            {caseStudy.results.map((result, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-cyan-950 border border-cyan-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
                <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed">
                  {result}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTEXTUAL SERVICE & PRICING LINKS                            */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Related Services */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>Relevant Studio Services</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Explore the foundational disciplines used to engineer this project:
              </p>

              <div className="space-y-3">
                {relatedServices.map((srv) => (
                  <a
                    key={srv.slug}
                    href={`/services/${srv.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateService(srv.slug);
                    }}
                    className="p-4 rounded-xl bg-slate-950 hover:bg-cyan-950/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                        {srv.name}
                      </div>
                      <div className="text-xs text-slate-500 font-mono">/services/{srv.slug}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            {/* Related Pricing Packages */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/50 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <span>Explore Transparent Pricing</span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                HiByHuman delivers fixed-price milestone packages with 50% first-order discount:
              </p>

              <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-950/40 to-slate-950 border border-cyan-800/60 mb-6">
                <div className="text-sm font-bold text-cyan-300 mb-1">
                  18+ Transparent Investment Packages
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Browse fixed-price tiers across Web &amp; Mobile Development, Logo Design, E-Commerce, and SEO with guaranteed delivery milestones.
                </p>
                <a
                  href="/packages"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigatePackages();
                  }}
                  className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 font-mono transition-colors"
                >
                  <span>View All Packages Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CONSULTATION CTA                                        */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMMERCIAL GROWTH SPRINT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Ready to Engineer Similar Results for Your Brand?
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Discuss your technical goals with our engineering and strategy team. Receive a milestone scope proposal with 50% discount on your initial engagement.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => onOpenFittingModal(`Consultation - ${caseStudy.title}`)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 font-black text-sm shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <span>Schedule Strategic Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${STUDIO_INFO.phoneRaw}`}
              className="px-6 py-3.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>Call: {STUDIO_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
