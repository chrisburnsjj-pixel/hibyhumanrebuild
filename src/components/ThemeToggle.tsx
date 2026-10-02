import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'navbar' | 'mobile' | 'floating';
  className?: string;
}

export function ThemeToggle({ variant = 'navbar', className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  if (variant === 'mobile') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl border transition-all cursor-pointer select-none ${
          isLight
            ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800 shadow-sm'
            : 'bg-slate-900/90 hover:bg-slate-800 border-slate-800 text-slate-200'
        } ${className}`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
              isLight
                ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                : 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
            }`}
          >
            {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div className="text-left">
            <div className="text-xs font-bold tracking-wide">
              {isLight ? 'Light Theme Active' : 'Dark Theme Active'}
            </div>
            <div className={`text-[10px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Tap to switch to {isLight ? 'Dark' : 'Light'} Mode
            </div>
          </div>
        </div>

        {/* Sliding Pill Indicator */}
        <div
          className={`relative w-12 h-6.5 rounded-full p-0.5 transition-colors duration-300 ${
            isLight ? 'bg-cyan-600' : 'bg-slate-800 border border-slate-700'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isLight ? 'translate-x-5.5' : 'translate-x-0'
            }`}
          >
            {isLight ? (
              <Sun className="w-3 h-3 text-amber-500" />
            ) : (
              <Moon className="w-3 h-3 text-slate-800" />
            )}
          </div>
        </div>
      </button>
    );
  }

  // Desktop Navbar / Header variant
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      className={`relative p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer select-none group ${
        isLight
          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300/80 text-slate-800 shadow-sm hover:border-cyan-500/50'
          : 'bg-[#0B1020]/90 hover:bg-slate-800/80 border-white/10 text-slate-300 hover:text-white hover:border-[#00C8FF]/50 shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (Visible in Light Mode) */}
        <Sun
          className={`w-4.5 h-4.5 transition-all duration-300 absolute ${
            isLight
              ? 'opacity-100 rotate-0 scale-100 text-amber-500'
              : 'opacity-0 -rotate-90 scale-50 text-amber-400'
          }`}
        />
        {/* Moon Icon (Visible in Dark Mode) */}
        <Moon
          className={`w-4.5 h-4.5 transition-all duration-300 absolute ${
            isLight
              ? 'opacity-0 rotate-90 scale-50 text-slate-400'
              : 'opacity-100 rotate-0 scale-100 text-cyan-300 group-hover:text-cyan-200'
          }`}
        />
      </div>
    </button>
  );
}
