import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { useCurrency, SUPPORTED_CURRENCIES, SupportedCurrency } from '../context/CurrencyContext';

interface CurrencySelectorProps {
  className?: string;
  variant?: 'navbar' | 'mobile' | 'compact';
}

const CURRENCY_LIST: SupportedCurrency[] = ['PKR', 'USD', 'GBP', 'EUR', 'AED', 'SAR', 'CAD', 'AUD'];

export function CurrencySelector({ className = '', variant = 'navbar' }: CurrencySelectorProps) {
  const { currency, setCurrency, isAutoDetected } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const currentMeta = SUPPORTED_CURRENCIES[currency] || SUPPORTED_CURRENCIES.USD;

  if (variant === 'mobile') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono uppercase tracking-wider font-bold">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Currency & Pricing</span>
          </div>
          {isAutoDetected && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              Auto-Detected
            </span>
          )}
        </div>

        <div className="grid grid-cols-4 gap-1.5">
          {CURRENCY_LIST.map((code) => {
            const item = SUPPORTED_CURRENCIES[code];
            const isSelected = code === currency;

            return (
              <button
                key={code}
                type="button"
                onClick={() => setCurrency(code)}
                className={`py-2 px-2 rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center gap-0.5 border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_12px_rgba(0,212,255,0.25)]'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <span className="text-sm">{item.flag}</span>
                <span className="text-[11px] font-black">{code}</span>
                <span className="text-[9px] text-slate-400">{item.symbol}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} className={`relative select-none ${className}`}>
      {/* Trigger Button with Futuristic Cyber Hover Animation */}
      <motion.button
        type="button"
        id="currency-selector-btn"
        aria-label={`Select currency (currently ${currency})`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        whileHover={{ scale: 1.05, y: -1 }}
        whileTap={{ scale: 0.96, y: 0 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 hover:border-cyan-400/80 text-slate-200 text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shadow-xs hover:shadow-[0_0_18px_rgba(0,212,255,0.35)] group select-none"
      >
        {/* Subtle cyber background ambient sheen on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <span className="text-xs transition-transform duration-200 group-hover:scale-110">{currentMeta.flag}</span>
        <span className="text-cyan-300 font-bold transition-all duration-200 group-hover:text-cyan-200 group-hover:drop-shadow-[0_0_6px_rgba(0,229,255,0.85)]">{currency}</span>
        <span className="text-slate-400 text-[10px] group-hover:text-slate-300">({currentMeta.symbol.trim()})</span>
        <ChevronDown
          className={`w-3 h-3 text-slate-400 transition-all duration-200 group-hover:text-cyan-300 group-hover:translate-y-0.5 ${
            isOpen ? 'rotate-180 text-cyan-400' : ''
          }`}
        />
      </motion.button>

      {/* Floating Dropdown Popover */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Available currencies"
          className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-950/95 border border-cyan-500/40 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 p-2 text-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="px-2.5 py-1.5 mb-1 border-b border-slate-800/80 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-400">
            <span>Select Currency</span>
            {isAutoDetected && <span className="text-cyan-400 lowercase text-[9px]">auto</span>}
          </div>

          <div className="space-y-0.5 max-h-64 overflow-y-auto pr-0.5">
            {CURRENCY_LIST.map((code) => {
              const item = SUPPORTED_CURRENCIES[code];
              const isSelected = code === currency;

              return (
                <button
                  key={code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    setCurrency(code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30'
                      : 'hover:bg-slate-900 text-slate-300 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.flag}</span>
                    <div className="text-left">
                      <div className="flex items-center gap-1.5 leading-tight">
                        <span className="font-bold">{code}</span>
                        <span className="text-slate-400 text-[11px]">({item.symbol.trim()})</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[110px] font-sans">
                        {item.name}
                      </div>
                    </div>
                  </div>

                  {isSelected && <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 px-2 text-[9px] font-mono text-slate-400 flex items-center justify-between">
            <span>Base rate: 1 GBP</span>
            <span className="text-cyan-400/80">Live FX</span>
          </div>
        </div>
      )}
    </div>
  );
}
