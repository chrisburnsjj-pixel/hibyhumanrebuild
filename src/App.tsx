import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { AmbientMotionBackground } from './components/AmbientMotionBackground';
import { HeroSection } from './components/HeroSection';
import { StrategyMeetsProductionSection } from './components/StrategyMeetsProductionSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { TechTicker } from './components/TechTicker';
import { CountUpStats } from './components/CountUpStats';
import { ProgressBars } from './components/ProgressBars';
import { PortfolioCards } from './components/PortfolioCards';
import { TestimonialSlider } from './components/TestimonialSlider';
import { FAQAccordion } from './components/FAQAccordion';

// Code-split modals and secondary views to cut TBT and initial JavaScript payload
const FittingModal = lazy(() => import('./components/FittingModal').then(m => ({ default: m.FittingModal })));
const CareersModal = lazy(() => import('./components/CareersModal').then(m => ({ default: m.CareersModal })));
const AIChatAssistant = lazy(() => import('./components/AIChatAssistant').then(m => ({ default: m.AIChatAssistant })));

// Code-split sub-routes
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsAndConditionsPage = lazy(() => import('./components/TermsAndConditionsPage').then(m => ({ default: m.TermsAndConditionsPage })));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const AllPackagesPage = lazy(() => import('./components/AllPackagesPage').then(m => ({ default: m.AllPackagesPage })));
const PortfolioArchivePage = lazy(() => import('./components/PortfolioArchivePage').then(m => ({ default: m.PortfolioArchivePage })));
const NotFoundPage = lazy(() => import('./components/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const ServiceDetailPage = lazy(() => import('./components/services/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const CaseStudyDetailPage = lazy(() => import('./components/CaseStudyDetailPage').then(m => ({ default: m.CaseStudyDetailPage })));
const AdminPanel = lazy(() => import('./admin/AdminPanel').then(m => ({ default: m.AdminPanel })));

import { getServiceBySlug } from './data/serviceData';
import { CASE_STUDIES } from './components/CaseStudiesSection';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CMSProvider } from './context/CMSContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { useSEO } from './hooks/useSEO';

export type AppRoute =
  | { view: 'home' }
  | { view: 'privacy' }
  | { view: 'terms' }
  | { view: 'case-studies' }
  | { view: 'case-study-detail'; slug: string }
  | { view: 'service-detail'; slug: string }
  | { view: 'all-packages' }
  | { view: 'portfolio-archive' }
  | { view: 'admin' }
  | { view: 'not-found' };

// Canonical slug mapping for case studies (aliasing legacy or alternate URLs)
export const CASE_STUDY_SLUG_MAP: Record<string, string> = {
  'jd-prestige-cars': 'jd-prestige',
  'jd-prestige': 'jd-prestige',
};

// Returns the primary canonical public URL slug for a given case study ID or slug
export function getCaseStudyCanonicalSlug(idOrSlug: string): string {
  const normalized = idOrSlug.toLowerCase().trim();
  if (normalized === 'jd-prestige' || normalized === 'jd-prestige-cars') {
    return 'jd-prestige-cars';
  }
  return normalized;
}

// Resolves a route slug (including canonical and legacy aliases) to the case study record
export function findCaseStudyBySlug(slug: string) {
  const normalized = slug.toLowerCase().trim();
  const targetId = CASE_STUDY_SLUG_MAP[normalized] || normalized;
  return CASE_STUDIES.find((cs) => cs.id === targetId || cs.id === normalized);
}

function parseRouteFromLocation(): AppRoute {
  if (typeof window === 'undefined') return { view: 'home' };
  const pathname = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  // 1. Admin route
  if (
    pathname === '/admin' ||
    pathname.startsWith('/admin/') ||
    hash === '#admin' ||
    hash.startsWith('#admin') ||
    hash.startsWith('#/admin')
  ) {
    return { view: 'admin' };
  }

  // 2. Canonical Service Landing Pages (/services/:slug)
  if (pathname.startsWith('/services/')) {
    const slug = pathname.replace(/^\/services\//, '').split('/')[0].split('?')[0].split('#')[0];
    const service = getServiceBySlug(slug);
    if (service) {
      return { view: 'service-detail', slug };
    }
    return { view: 'not-found' };
  }

  // 3. Case Studies route (/case-studies and /case-studies/:slug)
  if (pathname === '/case-studies' || hash === '#case-studies' || hash === '#case-study') {
    return { view: 'case-studies' };
  }
  if (pathname.startsWith('/case-studies/')) {
    const slug = pathname.replace(/^\/case-studies\//, '').split('/')[0].split('?')[0].split('#')[0];
    const study = findCaseStudyBySlug(slug);
    if (study) {
      return { view: 'case-study-detail', slug };
    }
    return { view: 'not-found' };
  }

  // 4. Pricing Packages route
  if (
    pathname === '/packages' ||
    pathname === '/all-packages' ||
    hash === '#all-packages' ||
    hash === '#packages' ||
    hash === '#packages-archive' ||
    hash === '#pricing-catalog'
  ) {
    return { view: 'all-packages' };
  }

  // 5. Portfolio Archive route
  if (
    pathname === '/portfolio' ||
    pathname === '/portfolio-archive' ||
    hash === '#portfolio-archive' ||
    hash === '#all-portfolio' ||
    hash === '#works'
  ) {
    return { view: 'portfolio-archive' };
  }

  // 6. Privacy Policy route
  if (
    pathname === '/privacy-policy' ||
    pathname === '/privacy' ||
    hash === '#privacy-policy' ||
    hash === '#privacy'
  ) {
    return { view: 'privacy' };
  }

  // 7. Terms & Conditions route
  if (
    pathname === '/terms-and-conditions' ||
    pathname === '/terms' ||
    hash === '#terms-and-conditions' ||
    hash === '#terms'
  ) {
    return { view: 'terms' };
  }

  // 8. Homepage and in-page anchor navigation (allows any #anchor without throwing 404)
  if (pathname === '/' || pathname === '' || pathname === '/index.html') {
    return { view: 'home' };
  }

  // 9. Any other unrecognized path triggers a 404 response
  return { view: 'not-found' };
}

const RouteLoadingFallback = () => (
  <div className="min-h-screen bg-[#030712] flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
  </div>
);

function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(parseRouteFromLocation);
  const [isFittingModalOpen, setIsFittingModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<string | undefined>(undefined);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);

  // Synchronize routing based on URL pathname & hash
  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(parseRouteFromLocation());
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Configure dynamic page metadata and canonical tags per view
  const seoConfig = React.useMemo(() => {
    switch (currentRoute.view) {
      case 'service-detail': {
        const svc = getServiceBySlug(currentRoute.slug);
        if (svc) {
          return {
            title: `${svc.title} | HiByHuman`,
            description: svc.metaDescription,
            canonicalPath: `/services/${svc.slug}`,
            noindex: false,
          };
        }
        return {
          title: 'Service Not Found | HiByHuman',
          description: 'The requested service could not be found.',
          canonicalPath: '/404',
          noindex: true,
        };
      }
      case 'case-study-detail': {
        const cs = findCaseStudyBySlug(currentRoute.slug);
        if (cs) {
          const canonicalSlug = getCaseStudyCanonicalSlug(cs.id);
          return {
            title: `${cs.title} | Verified Client Case Study | HiByHuman`,
            description: `${cs.tagline} Verified commercial case study with live production metrics and technical deliverables.`,
            canonicalPath: `/case-studies/${canonicalSlug}`,
            noindex: false,
          };
        }
        return {
          title: 'Case Study Not Found | HiByHuman',
          description: 'The requested case study could not be found.',
          canonicalPath: '/404',
          noindex: true,
        };
      }
      case 'case-studies':
        return {
          title: 'Client Case Studies & Verified Results',
          description:
            'Explore verified commercial client results and case studies from HiByHuman. Supercar booking engines, medical clinics, luxury e-commerce, and enterprise platforms.',
          canonicalPath: '/case-studies',
          noindex: false,
        };
      case 'all-packages':
        return {
          title: 'Transparent Pricing Packages | Web, Apps & Branding',
          description:
            'Fixed-price engineering and design packages from HiByHuman. Transparent pricing for bespoke websites, mobile apps, brand packaging, and SEO growth with 50% off first order.',
          canonicalPath: '/packages',
          noindex: false,
        };
      case 'portfolio-archive':
        return {
          title: 'Portfolio Archive | Production Work & Deliverables',
          description:
            'Full portfolio showcase of digital platforms, luxury mobile apps, bespoke branding, and conversion campaigns engineered by HiByHuman.',
          canonicalPath: '/portfolio',
          noindex: false,
        };
      case 'privacy':
        return {
          title: 'Privacy Policy (UK GDPR Compliant)',
          description:
            'HiByHuman Studio privacy policy, detailing data protection standards, client privacy, and strict compliance with UK GDPR and Data Protection Act 2018.',
          canonicalPath: '/privacy-policy',
          noindex: false,
        };
      case 'terms':
        return {
          title: 'Terms & Conditions | Triple Guarantee & IP Ownership',
          description:
            'HiByHuman standard client terms, milestone delivery schedule, 100% intellectual property transfer, and money-back satisfaction guarantee.',
          canonicalPath: '/terms-and-conditions',
          noindex: false,
        };
      case 'admin':
        return {
          title: 'Admin Management Portal',
          description: 'HiByHuman administrative control portal.',
          canonicalPath: '/admin',
          noindex: true,
        };
      case 'not-found':
        return {
          title: '404 - Page Not Found',
          description: 'The page you requested does not exist or has been removed.',
          canonicalPath: '/404',
          noindex: true,
        };
      case 'home':
      default:
        return {
          title: '',
          description:
            'HiByHuman is a premier UK creative and technology studio based in Coatbridge, Scotland. We engineer bespoke web applications, mobile platforms, and high-ROI digital systems.',
          canonicalPath: '/',
          noindex: false,
        };
    }
  }, [currentRoute]);

  useSEO(seoConfig);

  // Global Page Scroll Progress for smooth scrolling effects
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const handleOpenFittingModal = (productOrGoalName?: string) => {
    setSelectedProductForModal(productOrGoalName);
    setIsFittingModalOpen(true);
  };

  const handleCloseFittingModal = () => {
    setIsFittingModalOpen(false);
    setSelectedProductForModal(undefined);
  };

  const handleNavigateHome = () => {
    setCurrentRoute({ view: 'home' });
    if (window.location.pathname !== '/' || window.location.hash) {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAdmin = () => {
    setCurrentRoute({ view: 'admin' });
    if (!window.location.pathname.startsWith('/admin')) {
      window.history.pushState(null, '', '/admin');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateLegal = (page: 'privacy' | 'terms') => {
    setCurrentRoute({ view: page });
    const targetUrl = page === 'privacy' ? '/privacy-policy' : '/terms-and-conditions';
    window.history.pushState(null, '', targetUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCaseStudies = () => {
    setCurrentRoute({ view: 'case-studies' });
    window.history.pushState(null, '', '/case-studies');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateCaseStudy = (slug: string) => {
    const canonicalSlug = getCaseStudyCanonicalSlug(slug);
    setCurrentRoute({ view: 'case-study-detail', slug: canonicalSlug });
    if (window.location.pathname !== `/case-studies/${canonicalSlug}`) {
      window.history.pushState(null, '', `/case-studies/${canonicalSlug}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateService = (slug: string) => {
    setCurrentRoute({ view: 'service-detail', slug });
    if (window.location.pathname !== `/services/${slug}`) {
      window.history.pushState(null, '', `/services/${slug}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePackages = () => {
    setCurrentRoute({ view: 'all-packages' });
    window.history.pushState(null, '', '/packages');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigatePortfolio = () => {
    setCurrentRoute({ view: 'portfolio-archive' });
    window.history.pushState(null, '', '/portfolio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dedicated View: Admin Panel (Protected by Firebase Auth)
  if (currentRoute.view === 'admin') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <AdminPanel onBackToSite={handleNavigateHome} />
      </Suspense>
    );
  }

  // Dedicated View: 404 Page Not Found
  if (currentRoute.view === 'not-found') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <NotFoundPage
          onNavigateHome={handleNavigateHome}
          onNavigateCaseStudies={handleNavigateCaseStudies}
          onNavigatePackages={handleNavigatePackages}
          onNavigatePortfolio={handleNavigatePortfolio}
          onOpenFittingModal={handleOpenFittingModal}
        />
        <FittingModal
          isOpen={isFittingModalOpen}
          onClose={handleCloseFittingModal}
          preselectedProduct={selectedProductForModal}
        />
      </Suspense>
    );
  }

  // Dedicated View: Canonical Service Detail Page
  if (currentRoute.view === 'service-detail') {
    const service = getServiceBySlug(currentRoute.slug);
    if (service) {
      return (
        <Suspense fallback={<RouteLoadingFallback />}>
          <ServiceDetailPage
            service={service}
            onNavigateHome={handleNavigateHome}
            onNavigateCaseStudy={handleNavigateCaseStudy}
            onNavigatePackages={handleNavigatePackages}
            onOpenFittingModal={handleOpenFittingModal}
          />
          <FittingModal
            isOpen={isFittingModalOpen}
            onClose={handleCloseFittingModal}
            preselectedProduct={selectedProductForModal}
          />
        </Suspense>
      );
    }
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <NotFoundPage
          onNavigateHome={handleNavigateHome}
          onNavigateCaseStudies={handleNavigateCaseStudies}
          onNavigatePackages={handleNavigatePackages}
          onNavigatePortfolio={handleNavigatePortfolio}
          onOpenFittingModal={handleOpenFittingModal}
        />
        <FittingModal
          isOpen={isFittingModalOpen}
          onClose={handleCloseFittingModal}
          preselectedProduct={selectedProductForModal}
        />
      </Suspense>
    );
  }

  // Dedicated View: Client Case Study Detail Page
  if (currentRoute.view === 'case-study-detail') {
    const study = findCaseStudyBySlug(currentRoute.slug);
    if (study) {
      return (
        <Suspense fallback={<RouteLoadingFallback />}>
          <CaseStudyDetailPage
            caseStudy={study}
            onNavigateHome={handleNavigateHome}
            onNavigateCaseStudiesList={handleNavigateCaseStudies}
            onNavigateService={handleNavigateService}
            onNavigatePackages={handleNavigatePackages}
            onOpenFittingModal={handleOpenFittingModal}
          />
          <FittingModal
            isOpen={isFittingModalOpen}
            onClose={handleCloseFittingModal}
            preselectedProduct={selectedProductForModal}
          />
        </Suspense>
      );
    }
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <NotFoundPage
          onNavigateHome={handleNavigateHome}
          onNavigateCaseStudies={handleNavigateCaseStudies}
          onNavigatePackages={handleNavigatePackages}
          onNavigatePortfolio={handleNavigatePortfolio}
          onOpenFittingModal={handleOpenFittingModal}
        />
        <FittingModal
          isOpen={isFittingModalOpen}
          onClose={handleCloseFittingModal}
          preselectedProduct={selectedProductForModal}
        />
      </Suspense>
    );
  }

  // Dedicated Inner Page: In-Depth Client Case Studies
  if (currentRoute.view === 'case-studies') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <CaseStudiesPage
          onBackToHome={handleNavigateHome}
          onOpenFittingModal={handleOpenFittingModal}
          onNavigateCaseStudy={handleNavigateCaseStudy}
        />
        <FittingModal
          isOpen={isFittingModalOpen}
          onClose={handleCloseFittingModal}
          preselectedProduct={selectedProductForModal}
        />
      </Suspense>
    );
  }

  // Dedicated Inner Page: All 12+ Pricing Packages Catalog
  if (currentRoute.view === 'all-packages') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <AllPackagesPage
          onBackToHome={handleNavigateHome}
          onOpenFittingModal={handleOpenFittingModal}
          onNavigateService={handleNavigateService}
          onNavigateCaseStudy={handleNavigateCaseStudy}
        />
        <FittingModal
          isOpen={isFittingModalOpen}
          onClose={handleCloseFittingModal}
          preselectedProduct={selectedProductForModal}
        />
      </Suspense>
    );
  }

  // Dedicated Inner Page: Complete 20+ Client Portfolio Archive
  if (currentRoute.view === 'portfolio-archive') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <PortfolioArchivePage
          onBackToHome={handleNavigateHome}
          onOpenFittingModal={handleOpenFittingModal}
        />
        <FittingModal
          isOpen={isFittingModalOpen}
          onClose={handleCloseFittingModal}
          preselectedProduct={selectedProductForModal}
        />
      </Suspense>
    );
  }

  // Dedicated View: Privacy Policy (UK GDPR)
  if (currentRoute.view === 'privacy') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <PrivacyPolicyPage onBack={handleNavigateHome} />
      </Suspense>
    );
  }

  // Dedicated View: Terms & Conditions
  if (currentRoute.view === 'terms') {
    return (
      <Suspense fallback={<RouteLoadingFallback />}>
        <TermsAndConditionsPage onBack={handleNavigateHome} />
      </Suspense>
    );
  }

  return (
    <div className="hbh-app-shell relative text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased overflow-x-hidden flex flex-col lg:block lg:min-h-screen bg-[#030712]">
      {/* Dynamic Scroll Progress Bar with Brand Cyber Gradient (Cyan to Fuchsia) */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 origin-left z-50 pointer-events-none shadow-[0_0_12px_rgba(0,212,255,0.8)]"
      />

      {/* Premium CSS-Only Ambient Motion Background & Technical Grid */}
      <AmbientMotionBackground />

      {/* Floating Navbar with HiByHuman Branding & Responsive Mobile Menu */}
      <Navbar
        onOpenFittingModal={handleOpenFittingModal}
        onNavigateCaseStudies={handleNavigateCaseStudies}
        onNavigatePackages={handleNavigatePackages}
        onNavigatePortfolio={handleNavigatePortfolio}
        onNavigateService={handleNavigateService}
        onOpenCareers={() => setIsCareersModalOpen(true)}
      />

      {/* Main Content: Exact 6-Section Layout Matching Live Production Site */}
      <main className="flex-1">
        {/* Section 1: Official HiByHuman Hero Banner & Interactive Objectives */}
        <HeroSection
          onOpenFittingModal={handleOpenFittingModal}
          onNavigateCaseStudies={handleNavigateCaseStudies}
        />

        {/* 1. Tech Ticker: Infinite horizontal marquee of services & technologies */}
        <TechTicker />

        {/* 3. Count-Up Stats: Numbers that count with cubic easing on viewport entry */}
        <CountUpStats />

        {/* 4. Progress Bars: Horizontal bars filling with cyan-to-violet gradient */}
        <ProgressBars />

        {/* 5. Portfolio Cards: Grid with hover zoom, slide-up overlay, and scroll fade-in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hbh-reveal origin-center"
        >
          <PortfolioCards onSelectProject={() => handleNavigatePortfolio && handleNavigatePortfolio()} />
        </motion.div>

        {/* Section 5: Strategy Meets Production (Coatbridge Boardroom & Engineering Collective) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center"
        >
          <StrategyMeetsProductionSection
            onOpenFittingModal={() => handleOpenFittingModal('Strategy & Production Consultation')}
          />
        </motion.div>

        {/* 7. Testimonial Slider: Auto-rotating quotes with fade transitions & dot nav */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hbh-reveal origin-center"
        >
          <TestimonialSlider />
        </motion.div>

        {/* Section 6: Client Testimonials with Verified Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="origin-center"
        >
          <TestimonialsSection
            onOpenFittingModal={() => handleOpenFittingModal('50% Promo Consultation')}
          />
        </motion.div>

        {/* Responsive FAQ Accordion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="hbh-reveal origin-center"
        >
          <FAQAccordion
            onOpenFittingModal={() => handleOpenFittingModal('FAQ Consultation')}
          />
        </motion.div>
      </main>

      {/* HiByHuman Studio Footer */}
      <Footer
        onOpenFittingModal={() => handleOpenFittingModal('Footer Proposal')}
        onNavigateLegal={handleNavigateLegal}
        onNavigateCaseStudies={handleNavigateCaseStudies}
        onNavigatePackages={handleNavigatePackages}
        onNavigatePortfolio={handleNavigatePortfolio}
        onNavigateAdmin={handleNavigateAdmin}
        onNavigateService={handleNavigateService}
        onNavigateCaseStudy={handleNavigateCaseStudy}
        onOpenCareers={() => setIsCareersModalOpen(true)}
      />

      {/* Project Consultation & Scoping Modal (Deferred) */}
      <Suspense fallback={null}>
        {isFittingModalOpen && (
          <FittingModal
            isOpen={isFittingModalOpen}
            onClose={handleCloseFittingModal}
            preselectedProduct={selectedProductForModal}
          />
        )}
      </Suspense>

      {/* Careers & Talent Modal (Deferred) */}
      <Suspense fallback={null}>
        {isCareersModalOpen && (
          <CareersModal
            isOpen={isCareersModalOpen}
            onClose={() => setIsCareersModalOpen(false)}
            onOpenFittingModal={handleOpenFittingModal}
          />
        )}
      </Suspense>

      {/* AI-Powered Floating Chat Interface (Deferred) */}
      <Suspense fallback={null}>
        <AIChatAssistant onOpenFittingModal={handleOpenFittingModal} />
      </Suspense>

      {/* Cybernetic Scroll-to-Top Floating Trigger */}
      <ScrollToTop threshold={500} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CMSProvider>
          <CurrencyProvider>
            <AppContent />
          </CurrencyProvider>
        </CMSProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
