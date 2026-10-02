import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Percent, ArrowRight, Phone, Mail, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data';
import { useCMS } from '../context/CMSContext';
import { getActiveSocialLinks } from '../firebase/firestore';
import { SocialPlatformIcon } from './SocialPlatformIcon';
import { CurrencySelector } from './CurrencySelector';
import { ThemeToggle } from './ThemeToggle';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLetsTalk: () => void;
  onNavigateCaseStudies?: () => void;
  onNavigatePackages?: () => void;
  onNavigatePortfolio?: () => void;
  onNavigateService?: (slug: string) => void;
  onOpenCareers?: () => void;
}

const FIVE_SECTIONS = [
  { label: '01. Home', href: '#hero', desc: 'Built for the next digital era' },
  { label: '02. Our Work', href: '#work', desc: 'Commercial films, 3D CGI & interactive' },
  { label: '03. Services', href: '#services', desc: 'Full-spectrum production under one roof' },
  { label: '04. Process', href: '#process', desc: 'Deterministic 5-stage sprint pipeline' },
  { label: '05. About', href: '#about', desc: 'Why HiByHuman & studio manifesto' },
];

export function MobileMenu({
  isOpen,
  onClose,
  onLetsTalk,
  onNavigateCaseStudies,
  onNavigatePackages,
  onNavigatePortfolio,
  onNavigateService,
  onOpenCareers,
}: MobileMenuProps) {
  const { contact } = useCMS();
  const activeSocials = getActiveSocialLinks(contact);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-md lg:hidden flex flex-col justify-end"
          onClick={onClose}
        >
          {/* Slide-Up Navigation Container */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-h-[92vh] bg-slate-950 rounded-t-3xl shadow-2xl flex flex-col overflow-hidden border-t border-cyan-500/30 text-slate-100"
          >
            {/* Mobile Header Bar inside Drawer */}
            <div className="px-5 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/80">
              <div className="flex items-center">
                <img
                  src="/images/hibyhuman-logo-horizontal.svg"
                  alt="HiByHuman"
                  width={540}
                  height={110}
                  className="h-10 w-auto object-contain drop-shadow-[0_0_14px_rgba(0,200,255,0.45)]"
                />
              </div>

              {/* Close Button */}
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={onClose}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 flex items-center justify-center transition-all cursor-pointer border border-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 50% Launch Promo Ticker inside Drawer */}
            <div className="px-5 py-2.5 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-cyan-500/20 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-gradient-to-r from-cyan-500 to-fuchsia-600 text-slate-950 font-mono font-black text-[10px]">
                  50% OFF
                </span>
                <span className="text-slate-300 font-medium text-[11px]">
                  Use promo code <strong className="font-mono text-cyan-300 font-bold">FIRST50</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onLetsTalk();
                }}
                className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Claim</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Scrollable Navigation List */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-2">
              {/* Theme Toggle Button */}
              <div className="mb-3">
                <ThemeToggle variant="mobile" />
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 mb-3">
                <CurrencySelector variant="mobile" />
              </div>

              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-2 mb-1">
                Main Menu (5 Sections)
              </div>

              {FIVE_SECTIONS.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="group block p-3.5 rounded-2xl hover:bg-slate-900 border border-slate-800/60 hover:border-cyan-500/40 transition-all active:scale-[0.99]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-200 group-hover:text-cyan-400 transition-colors font-creative">
                      {item.label}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </a>
              ))}

              {onNavigateCaseStudies && (
                <a
                  href="/case-studies"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onNavigateCaseStudies();
                  }}
                  className="w-full text-left group block p-3.5 rounded-2xl bg-cyan-950/40 hover:bg-cyan-950/70 border border-cyan-500/40 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-cyan-200 group-hover:text-cyan-300 transition-colors font-creative flex items-center gap-2">
                      <span>In-Depth Case Studies</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-900/80 text-cyan-300 font-bold border border-cyan-500/30">
                        Inner Page
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-cyan-300/80 mt-0.5">
                    Technical breakdowns, Google Ads PPC turnarounds &amp; metrics
                  </p>
                </a>
              )}

              {/* Canonical Service Landing Pages */}
              <div className="pt-2 pb-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold px-2 mb-2">
                  Specialized Studio Services
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { slug: 'web-mobile-dev', label: 'Web & Mobile' },
                    { slug: 'interactive-design', label: 'UX/UI Design' },
                    { slug: 'motion-branding', label: 'Motion & Branding' },
                    { slug: 'digital-marketing', label: 'SEO & Marketing' },
                    { slug: 'concept-strategy', label: 'Strategy' },
                    { slug: 'illustrations-prototype', label: 'Illustrations' },
                  ].map((s) => (
                    <a
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      onClick={(e) => {
                        if (onNavigateService) {
                          e.preventDefault();
                          onClose();
                          onNavigateService(s.slug);
                        }
                      }}
                      className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors flex items-center justify-between"
                    >
                      <span>{s.label}</span>
                      <span className="text-[10px] text-cyan-400">→</span>
                    </a>
                  ))}
                </div>
              </div>

              {onNavigatePackages && (
                <a
                  href="/packages"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onNavigatePackages();
                  }}
                  className="w-full text-left group block p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-700/80 hover:border-fuchsia-500/40 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-fuchsia-200 group-hover:text-fuchsia-300 transition-colors font-creative flex items-center gap-2">
                      <span>All 12+ Pricing Packages</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-fuchsia-950/80 text-fuchsia-300 font-bold border border-fuchsia-500/30">
                        Inner Page
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-fuchsia-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Search and filter web, logo, ecommerce, SEO and marketing tiers
                  </p>
                </a>
              )}

              {onNavigatePortfolio && (
                <a
                  href="/portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    onClose();
                    onNavigatePortfolio();
                  }}
                  className="w-full text-left group block p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900 border border-slate-700/80 hover:border-cyan-500/40 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-slate-200 group-hover:text-cyan-300 transition-colors font-creative flex items-center gap-2">
                      <span>Complete Portfolio Archive</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-cyan-300 font-bold border border-cyan-500/30">
                        Inner Page
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Browse all 20+ live client web apps, brand books and design deliverables
                  </p>
                </a>
              )}

              {/* Careers Modal Trigger */}
              {onOpenCareers && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCareers();
                  }}
                  className="w-full text-left group block p-3.5 rounded-2xl bg-[#0B1020] hover:bg-[#151D33] border border-white/10 hover:border-cyan-500/40 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors font-creative flex items-center gap-2">
                      <span>Join HiByHuman (Careers)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-bold border border-cyan-500/30">
                        Hiring
                      </span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Explore open roles across production, editing, 3D and art direction
                  </p>
                </button>
              )}

              {/* Action Buttons in Mobile Menu */}
              <div className="pt-3 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLetsTalk();
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-slate-950 font-black text-sm shadow-[0_0_20px_rgba(0,212,255,0.4)] flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-slate-950" />
                  <span>Start Project with 50% Discount</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/447309690259?text=Hi%20HiByHuman%20team,%20I'd%20like%20to%20claim%20the%2050%%20first%20order%20discount!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-xl bg-emerald-950/50 hover:bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${STUDIO_INFO.phone.replace(/[^0-9+]/g, '')}`}
                    className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Direct Call</span>
                  </a>
                </div>

                {/* Mobile Social Links */}
                {activeSocials.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
                      Social Channels
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {activeSocials.map((social) => (
                        <a
                          key={social.id}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-semibold transition-all cursor-pointer"
                          title={social.label}
                        >
                          <SocialPlatformIcon platform={social.platform} className="w-3.5 h-3.5 shrink-0" />
                          <span>{social.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Footer inside Mobile Drawer */}
            <div className="px-5 py-3 border-t border-slate-800 bg-slate-950 text-[11px] text-slate-400 flex items-center justify-between">
              <span>Coatbridge, UK • Global Delivery</span>
              <span className="font-mono text-emerald-400 font-bold">100% Guaranteed</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

