import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Home, Sparkles, Layers, Briefcase, Mail } from 'lucide-react';
import { HiByHumanLogo } from './Logo';

interface NotFoundPageProps {
  onNavigateHome: () => void;
  onNavigateCaseStudies?: () => void;
  onNavigatePackages?: () => void;
  onNavigatePortfolio?: () => void;
  onOpenFittingModal?: (subject?: string) => void;
}

export function NotFoundPage({
  onNavigateHome,
  onNavigateCaseStudies,
  onNavigatePackages,
  onNavigatePortfolio,
  onOpenFittingModal,
}: NotFoundPageProps) {
  useEffect(() => {
    // Ensure 404 pages are never indexed by crawlers and have accurate document title
    document.title = '404 - Page Not Found | HiByHuman';
    
    let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
    const previousRobots = robotsMeta?.getAttribute('content') || '';
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }

    window.scrollTo({ top: 0, behavior: 'instant' });

    return () => {
      document.title = 'HiByHuman | Bespoke Web Design, Mobile Apps & Digital Marketing Studio UK';
      if (robotsMeta && previousRobots) {
        robotsMeta.setAttribute('content', previousRobots);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 antialiased flex flex-col justify-between">
      {/* Header Bar */}
      <header className="px-6 sm:px-10 py-5 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onNavigateHome}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <HiByHumanLogo size="sm" theme="dark" animated={true} />
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-cyan-400 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </button>
        </div>
      </header>

      {/* Main 404 Canvas */}
      <main className="flex-1 flex items-center justify-center px-6 py-16 sm:py-24 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-fuchsia-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider mb-6 shadow-[0_0_15px_rgba(0,212,255,0.2)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>HTTP 404 • RESOURCE NOT FOUND</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl sm:text-8xl md:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-fuchsia-400 mb-4 drop-shadow-[0_0_35px_rgba(0,212,255,0.3)] font-mono"
          >
            404
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4"
          >
            Lost in Cyberspace? Page Not Found.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed"
          >
            The link you followed may be broken, or the URL may have been updated. 
            All our core systems, case studies, and services remain fully online.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <button
              type="button"
              onClick={onNavigateHome}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-fuchsia-600 text-slate-950 text-xs sm:text-sm font-black transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Homepage</span>
            </button>

            {onOpenFittingModal && (
              <button
                type="button"
                onClick={() => onOpenFittingModal('404 Page Consultation')}
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Contact Studio</span>
              </button>
            )}
          </motion.div>

          {/* Suggested Quick Destinations */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-6 border-t border-slate-800/80"
          >
            <span className="block text-xs font-mono uppercase tracking-wider text-slate-500 mb-3 font-semibold">
              Popular Destinations
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              {onNavigateCaseStudies && (
                <button
                  type="button"
                  onClick={onNavigateCaseStudies}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Briefcase className="w-3 h-3 text-cyan-400" />
                  <span>Case Studies</span>
                </button>
              )}
              {onNavigatePackages && (
                <button
                  type="button"
                  onClick={onNavigatePackages}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Pricing Packages</span>
                </button>
              )}
              {onNavigatePortfolio && (
                <button
                  type="button"
                  onClick={onNavigatePortfolio}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Layers className="w-3 h-3 text-cyan-400" />
                  <span>Client Portfolio</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Baseline Footer Note */}
      <footer className="px-6 py-6 border-t border-slate-900 text-center text-xs text-slate-500 font-mono">
        © {new Date().getFullYear()} HiByHuman Studio. Human ideas. Powered by intelligent technology.
      </footer>
    </div>
  );
}
