import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Zap,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  Phone,
  Mail,
  Layers,
  Award,
} from 'lucide-react';
import { ServiceDetailData } from '../../data/serviceData';
import { CASE_STUDIES } from '../CaseStudiesSection';
import { PRICING_PACKAGES, STUDIO_INFO } from '../../data';
import { HiByHumanIcon } from '../Logo';
import { useSEO } from '../../hooks/useSEO';

interface ServiceDetailPageProps {
  service: ServiceDetailData;
  onNavigateHome: () => void;
  onNavigateServicesList?: () => void;
  onNavigateCaseStudy: (slug: string) => void;
  onNavigatePackages: () => void;
  onOpenFittingModal: (subject?: string) => void;
}

export function ServiceDetailPage({
  service,
  onNavigateHome,
  onNavigateCaseStudy,
  onNavigatePackages,
  onOpenFittingModal,
}: ServiceDetailPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scroll to top on mount or when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [service.slug]);

  // Dynamic SEO & Structured Data
  const canonicalPath = `/services/${service.slug}`;
  const canonicalUrl = `https://www.hibyhuman.com${canonicalPath}`;

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
            name: 'Services',
            item: 'https://www.hibyhuman.com/#services',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.h1,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'Service',
        name: service.h1,
        serviceType: service.category,
        description: service.metaDescription,
        provider: {
          '@type': 'Organization',
          name: 'HiByHuman',
          url: 'https://www.hibyhuman.com',
          telephone: STUDIO_INFO.phone,
          email: STUDIO_INFO.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2 Mitchell Street',
            addressLocality: 'Coatbridge',
            postalCode: 'ML5 5RT',
            addressCountry: 'GB',
          },
        },
        areaServed: {
          '@type': 'Country',
          name: 'United Kingdom',
        },
        url: canonicalUrl,
      },
    ],
  };

  useSEO({
    title: service.title,
    description: service.metaDescription,
    canonicalPath,
    noindex: false,
    jsonLd,
  });

  // Lookup related case studies
  const relatedCaseStudies = CASE_STUDIES.filter((cs) =>
    service.relatedCaseStudyIds.includes(cs.id)
  );

  // Lookup related packages
  const relatedPackages = PRICING_PACKAGES.filter((pkg) =>
    service.relatedPackageIds.includes(pkg.id)
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      {/* ============================================================ */}
      {/* TOP STICKY INNER NAVIGATION BAR                               */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 px-6 sm:px-10 py-4 transition-all">
        <div className="max-w-[1500px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-400 hover:text-cyan-300 text-xs font-semibold border border-cyan-800/60 transition-all cursor-pointer group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </a>

            <div className="h-4 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2">
              <HiByHumanIcon className="w-6 h-6" animated={true} />
              <span className="font-bold text-sm tracking-tight text-white font-creative">
                HiByHuman Studio
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                {service.category}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenFittingModal(`Consultation - ${service.h1}`)}
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 text-xs font-black transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Free Proposal</span>
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
              href="/#services"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
                setTimeout(() => {
                  const el = document.getElementById('services');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
              className="hover:text-cyan-300 transition-colors"
            >
              Services
            </a>
          </li>
          <li className="text-slate-600">/</li>
          <li className="text-cyan-400 font-semibold truncate max-w-[240px] sm:max-w-none">
            {service.h1}
          </li>
        </ol>
      </nav>

      {/* ============================================================ */}
      {/* HERO SECTION                                                  */}
      {/* ============================================================ */}
      <section className="relative pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-[1500px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-6">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORE CAPABILITY &bull; {service.category.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
              {service.h1}
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed mb-6">
              {service.shortTagline}
            </p>

            <p className="text-base text-slate-400 leading-relaxed mb-8">
              {service.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenFittingModal(`Consultation - ${service.h1}`)}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Request Project Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={STUDIO_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2"
              >
                <span>Direct WhatsApp Chat</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EVIDENCE METRICS STRIP                                        */}
      {/* ============================================================ */}
      <section className="bg-slate-900/60 border-b border-slate-800 py-10">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.evidence.map((ev, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-mono">
                    {ev.metric}
                  </span>
                  <Award className="w-6 h-6 text-cyan-400/60" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{ev.label}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{ev.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* DETAILED OVERVIEW & CAPABILITIES                              */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                In-Depth Architecture
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2 mb-6">
                Engineered for Commercial Performance and Long-Term Stability
              </h2>

              <div className="space-y-4 text-slate-300 leading-relaxed text-sm sm:text-base">
                {service.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800">
                <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider mb-4">
                  Technology Stack &amp; Tooling
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-cyan-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/20 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <span>Key Service Deliverables</span>
                </h3>

                <ul className="space-y-3 mb-6">
                  {service.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 text-xs text-slate-300 space-y-2">
                  <div className="font-bold text-cyan-300 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The HiByHuman Triple Guarantee</span>
                  </div>
                  <p className="text-slate-400">
                    100% Satisfaction Guarantee, 100% Unique Architecture (No unverified templates), and 100% Commercial IP Ownership Transfer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5-STEP DELIVERY PROCESS                                       */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-24 border-b border-slate-800 bg-slate-950/80">
        <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
              Disciplined Execution
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-4">
              Our 5-Stage Delivery Methodology
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Every project moves through a strict milestone framework ensuring rapid momentum, complete transparency, and zero scope drift.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {service.process.map((stage) => (
              <div
                key={stage.step}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-400 px-2.5 py-1 rounded bg-cyan-950/60 border border-cyan-800 inline-block mb-4">
                    STAGE {stage.step}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VERIFIED CASE STUDIES SECTION                                 */}
      {/* ============================================================ */}
      {relatedCaseStudies.length > 0 && (
        <section className="py-16 sm:py-20 border-b border-slate-800">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                  Documented Impact
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Related Client Case Studies
                </h2>
              </div>
              <a
                href="/case-studies"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateCaseStudy(relatedCaseStudies[0].id);
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                <span>View all verified case studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCaseStudies.map((cs) => (
                <div
                  key={cs.id}
                  className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                        {cs.category}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">{cs.client}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{cs.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {cs.description}
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
                      {cs.metrics.map((metric, mIdx) => (
                        <div key={mIdx} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                          <div className="text-sm sm:text-base font-mono font-black text-cyan-400">
                            {metric.value}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase">{metric.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`/case-studies/${cs.id === 'jd-prestige' ? 'jd-prestige-cars' : cs.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateCaseStudy(cs.id === 'jd-prestige' ? 'jd-prestige-cars' : cs.id);
                    }}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-bold border border-cyan-800 transition-all"
                  >
                    <span>Read Technical Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* RELATED PRICING PACKAGES                                      */}
      {/* ============================================================ */}
      {relatedPackages.length > 0 && (
        <section className="py-16 sm:py-20 border-b border-slate-800 bg-slate-950/60">
          <div className="max-w-[1500px] mx-auto px-6 sm:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
                  Transparent Investment Tiers
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                  Popular Packages for this Service
                </h2>
              </div>
              <a
                href="/packages"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigatePackages();
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                <span>Browse all 18+ packages</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-cyan-400">{pkg.category} Tier</span>
                      <span className="text-[11px] font-mono text-slate-400">{pkg.turnaround}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{pkg.name}</h3>
                    <p className="text-xs text-slate-400 mb-4">{pkg.description}</p>

                    <div className="mb-6">
                      <div className="text-2xl font-black text-white font-mono">
                        {pkg.currency}
                        {pkg.price}
                      </div>
                      <div className="text-[11px] text-cyan-400 font-mono">
                        Eligible for 50% first-order promotion
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {pkg.features.slice(0, 4).map((f, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenFittingModal(`Package Selection - ${pkg.name}`)}
                    className="w-full py-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 text-xs font-bold border border-cyan-800 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Claim 50% Off Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* FREQUENTLY ASKED QUESTIONS                                    */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-12">
            <span className="text-xs font-mono text-cyan-400 tracking-wider uppercase font-bold">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Everything You Need to Know About this Service
            </h2>
          </div>

          <div className="space-y-3">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/80 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-cyan-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FINAL CONSULTATION CTA                                        */}
      {/* ============================================================ */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>START YOUR BESPOKE BUILD</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Ready to Engineer Your Next Digital Milestone?
          </h2>

          <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg mb-8 leading-relaxed">
            Schedule a confidential consultation with our principal team. We review your requirements, provide a detailed scope breakdown, and apply 50% savings to your first project.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => onOpenFittingModal(`Consultation - ${service.h1}`)}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 hover:from-cyan-300 hover:to-fuchsia-400 text-slate-950 font-black text-sm shadow-[0_0_25px_rgba(0,212,255,0.5)] transition-all cursor-pointer flex items-center gap-2 hover:scale-105"
            >
              <span>Schedule Direct Consultation</span>
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

          <div className="text-xs text-slate-400 font-mono">
            {STUDIO_INFO.location} &bull; United Kingdom &bull; Fast Worldwide Delivery
          </div>
        </div>
      </section>
    </div>
  );
}
