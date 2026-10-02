import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X, Sparkles, ChevronDown } from 'lucide-react';
import { CurrencySelector } from './CurrencySelector';
import { ThemeToggle } from './ThemeToggle';
import { MobileMenu } from './MobileMenu';
import { useCMS } from '../context/CMSContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenFittingModal: (subject?: string) => void;
  onNavigateCaseStudies?: () => void;
  onNavigatePackages?: () => void;
  onNavigatePortfolio?: () => void;
  onNavigateService?: (slug: string) => void;
  onOpenCareers?: () => void;
}

export function Navbar({
  onOpenFittingModal,
  onNavigateCaseStudies,
  onNavigatePackages,
  onNavigatePortfolio,
  onNavigateService,
  onOpenCareers,
}: NavbarProps) {
  const { hero } = useCMS();
  const { theme } = useTheme();
  const isLight = theme === 'light';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Our Work', href: '#work' },
    { label: 'Services', href: '#services', isDropdown: true },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
  ];

  const serviceSubItems = [
    { label: 'Video Production', slug: 'web-mobile-dev' },
    { label: 'Editing & Post-Production', slug: 'interactive-design' },
    { label: 'Motion Graphics & 3D', slug: 'motion-branding' },
    { label: 'Design & Visual Content', slug: 'illustrations-prototype' },
    { label: 'Content Strategy', slug: 'concept-strategy' },
    { label: 'Project Management', slug: 'digital-marketing' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isLight
            ? isScrolled
              ? 'bg-white/95 backdrop-blur-2xl border-b border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)] py-2 sm:py-2.5'
              : 'bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-3 sm:py-3.5'
            : isScrolled
              ? 'bg-[#05070D]/90 backdrop-blur-2xl border-b border-[#00C8FF]/25 shadow-[0_4px_30px_rgba(0,0,0,0.85)] py-2 sm:py-2.5'
              : 'bg-[#05070D]/55 backdrop-blur-md border-b border-white/10 py-3 sm:py-3.5'
        }`}
      >
        {/* Holographic Laser Scan Line along navbar bottom border */}
        <div className="absolute bottom-0 inset-x-0 h-[1.5px] overflow-hidden pointer-events-none">
          <div className="hbh-nav-beam w-1/3 h-full bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_12px_#00E5FF]" />
        </div>

        <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 flex items-center justify-between">
          {/* Brand Logo & Monogram - Prominently sized with ambient neon glow */}
          <a
            href="#"
            className="flex items-center group select-none relative z-10 transition-transform duration-300 hover:scale-[1.03]"
            aria-label="HiByHuman Home"
          >
            <img
              src="/images/hibyhuman-logo-horizontal.svg"
              alt="HiByHuman - Built For The Next Digital Era"
              width={1409}
              height={922}
              loading="eager"
              decoding="sync"
              className="h-9 xs:h-10 sm:h-14 md:h-16 lg:h-18 xl:h-20 max-w-[130px] xs:max-w-[160px] sm:max-w-none w-auto object-contain transition-all duration-300 hbh-logo-glow-fx drop-shadow-[0_0_18px_rgba(0,200,255,0.65)] group-hover:drop-shadow-[0_0_28px_rgba(0,229,255,0.95)]"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className={`hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium ${isLight ? 'text-slate-800 font-semibold' : 'text-slate-300'}`}>
            {navLinks.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <motion.a
                      href={link.href}
                      whileHover={{ y: -2, opacity: 1 }}
                      whileTap={{ y: 0 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                      className={`py-2 transition-colors flex items-center gap-1 hbh-nav-link inline-flex cursor-pointer ${
                        isLight ? 'text-slate-800 hover:text-cyan-700' : 'text-slate-300 hover:text-[#00C8FF]'
                      }`}
                    >
                      <span>{link.label}</span>
                      <motion.span
                        animate={{ rotate: isServicesDropdownOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                      </motion.span>
                    </motion.a>

                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.96 }}
                          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute top-full left-0 mt-1 w-64 p-3 rounded-2xl border transition-all ${
                            isLight
                              ? 'bg-white/98 backdrop-blur-2xl border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.12)]'
                              : 'bg-[#0B1020]/95 backdrop-blur-2xl border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.7)]'
                          }`}
                        >
                          <div className={`text-[10px] font-mono uppercase tracking-widest font-bold px-3 py-1 mb-1 ${
                            isLight ? 'text-cyan-700' : 'text-[#00C8FF]'
                          }`}>
                            Production Services
                          </div>
                          <div className="space-y-1">
                            {serviceSubItems.map((item) => (
                              <motion.button
                                key={item.slug}
                                type="button"
                                whileHover={{ x: 3 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                                onClick={() => {
                                  setIsServicesDropdownOpen(false);
                                  if (onNavigateService) {
                                    onNavigateService(item.slug);
                                  } else {
                                    window.location.hash = '#services';
                                  }
                                }}
                                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                                  isLight
                                    ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                                }`}
                              >
                                <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-cyan-600' : 'bg-[#00C8FF]'}`} />
                                <span>{item.label}</span>
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  whileHover={{ y: -2, opacity: 1 }}
                  whileTap={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                  className={`py-2 transition-colors hbh-nav-link inline-block cursor-pointer ${
                    isLight ? 'text-slate-800 hover:text-cyan-700' : 'text-slate-300 hover:text-[#00C8FF]'
                  }`}
                >
                  {link.label}
                </motion.a>
              );
            })}

            {/* Careers Link */}
            <motion.button
              type="button"
              whileHover={{ y: -2, opacity: 1 }}
              whileTap={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 450, damping: 25 }}
              onClick={() => onOpenCareers ? onOpenCareers() : onOpenFittingModal('Careers Inquiry')}
              className={`py-2 transition-colors text-left flex items-center gap-1.5 hbh-nav-link cursor-pointer ${
                isLight ? 'text-slate-800 hover:text-cyan-700' : 'text-slate-300 hover:text-[#00C8FF]'
              }`}
            >
              <span>Careers</span>
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                isLight ? 'bg-cyan-100 text-cyan-800' : 'bg-[#00C8FF]/15 text-[#00C8FF]'
              }`}>
                Join
              </span>
            </motion.button>
          </nav>

          {/* Right Action Group */}
          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle variant="navbar" />
            <CurrencySelector />

            <motion.button
              type="button"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.96, y: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              onClick={() => onOpenFittingModal("Let's Talk - Project Commission")}
              className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00C8FF] via-[#1688FF] to-[#7A2CFF] text-[#05070D] font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,200,255,0.38)] hover:shadow-[0_0_34px_rgba(0,229,255,0.7),0_0_16px_rgba(122,44,255,0.45)] cursor-pointer font-creative flex items-center gap-1.5 group select-none transition-shadow duration-300"
            >
              {/* Futuristic light sheen sweep on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none rounded-full" />

              <span className="relative z-10 transition-colors">Let's Talk</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#05070D] relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 420, damping: 24 }}
              onClick={() => onOpenFittingModal("Let's Talk - Quick Mobile")}
              className="hidden sm:inline-flex px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00C8FF] to-[#7A2CFF] text-[#05070D] font-black text-xs uppercase tracking-wider shadow-sm hover:shadow-[0_0_20px_rgba(0,200,255,0.6)] transition-all cursor-pointer"
            >
              Let's Talk
            </motion.button>

            <button
              type="button"
              aria-label={isMobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl bg-[#0B1020] border border-white/10 text-[#00C8FF] flex items-center justify-center transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLetsTalk={() => onOpenFittingModal("Let's Create - Consultation")}
        onNavigateCaseStudies={onNavigateCaseStudies}
        onNavigatePackages={onNavigatePackages}
        onNavigatePortfolio={onNavigatePortfolio}
        onNavigateService={onNavigateService}
        onOpenCareers={onOpenCareers}
      />
    </>
  );
}
