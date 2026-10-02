import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp } from 'lucide-react';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
}

export function ScrollToTop({ threshold = 500, className = '' }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > threshold);

      // Compute scroll percentage for the circular progress indicator
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Circular progress calculations for SVG ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className={`fixed bottom-22 right-5 sm:bottom-24 sm:right-7 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer select-none bg-[#050914]/90 backdrop-blur-xl border border-cyan-500/40 hover:border-cyan-300 text-cyan-300 shadow-[0_0_16px_rgba(0,229,255,0.3)] hover:shadow-[0_0_28px_rgba(0,229,255,0.7)] group transition-all duration-300 ${className}`}
        >
          {/* Subtle Ambient Radial Cyan Glow Layer */}
          <div className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          {/* Precision Circular SVG Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 48 48"
          >
            {/* Background Track */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-slate-800/80"
              strokeWidth="2"
              fill="none"
            />
            {/* Animated Cyan Progress Arc */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="stroke-cyan-400 transition-all duration-150"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="none"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(0, 229, 255, 0.8))',
              }}
            />
          </svg>

          {/* Central Arrow Icon */}
          <ChevronUp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-cyan-300 group-hover:text-white transition-all duration-200 group-hover:-translate-y-0.5 drop-shadow-[0_0_6px_rgba(0,229,255,0.85)] relative z-10 stroke-[2.5]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
