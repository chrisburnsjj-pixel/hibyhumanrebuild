import React from 'react';
import { motion } from 'motion/react';
import {
  Laptop,
  Brain,
  BarChart3,
  Paintbrush,
  PenTool,
  LayoutGrid,
  ArrowRight,
  Check,
} from 'lucide-react';

interface ServicePillProps {
  key?: React.Key;
  label: string;
  isSelected: boolean;
  onToggle: () => void;
}

interface ServiceTheme {
  icon: React.ComponentType<{ className?: string }>;
  borderColor: string;
  glowShadow: string;
  hoverGlow: string;
  badgeBg: string;
  iconColor: string;
  arrowBorder: string;
  arrowColor: string;
  activeBg: string;
}

const SERVICE_THEMES: Record<string, ServiceTheme> = {
  'Web & Apps': {
    icon: Laptop,
    borderColor: 'border-cyan-400/80',
    glowShadow: 'shadow-[0_0_18px_rgba(6,182,212,0.3)]',
    hoverGlow: 'hover:shadow-[0_0_26px_rgba(6,182,212,0.55)]',
    badgeBg: 'bg-cyan-950/60 border border-cyan-500/30',
    iconColor: 'text-cyan-400',
    arrowBorder: 'border-cyan-400/80 bg-cyan-950/50',
    arrowColor: 'text-cyan-300',
    activeBg: 'bg-cyan-950/70 border-cyan-300 shadow-[0_0_28px_rgba(6,182,212,0.7)]',
  },
  'AI Solutions': {
    icon: Brain,
    borderColor: 'border-fuchsia-500/80',
    glowShadow: 'shadow-[0_0_18px_rgba(217,70,239,0.3)]',
    hoverGlow: 'hover:shadow-[0_0_26px_rgba(217,70,239,0.55)]',
    badgeBg: 'bg-fuchsia-950/60 border border-fuchsia-500/30',
    iconColor: 'text-fuchsia-400',
    arrowBorder: 'border-fuchsia-500/80 bg-fuchsia-950/50',
    arrowColor: 'text-fuchsia-300',
    activeBg: 'bg-fuchsia-950/70 border-fuchsia-300 shadow-[0_0_28px_rgba(217,70,239,0.7)]',
  },
  'Digital Marketing': {
    icon: BarChart3,
    borderColor: 'border-cyan-400/80',
    glowShadow: 'shadow-[0_0_18px_rgba(6,182,212,0.3)]',
    hoverGlow: 'hover:shadow-[0_0_26px_rgba(6,182,212,0.55)]',
    badgeBg: 'bg-cyan-950/60 border border-cyan-500/30',
    iconColor: 'text-cyan-400',
    arrowBorder: 'border-cyan-400/80 bg-cyan-950/50',
    arrowColor: 'text-cyan-300',
    activeBg: 'bg-cyan-950/70 border-cyan-300 shadow-[0_0_28px_rgba(6,182,212,0.7)]',
  },
  'Creative & Content': {
    icon: Paintbrush,
    borderColor: 'border-fuchsia-500/80',
    glowShadow: 'shadow-[0_0_18px_rgba(217,70,239,0.3)]',
    hoverGlow: 'hover:shadow-[0_0_26px_rgba(217,70,239,0.55)]',
    badgeBg: 'bg-fuchsia-950/60 border border-fuchsia-500/30',
    iconColor: 'text-fuchsia-400',
    arrowBorder: 'border-fuchsia-500/80 bg-fuchsia-950/50',
    arrowColor: 'text-fuchsia-300',
    activeBg: 'bg-fuchsia-950/70 border-fuchsia-300 shadow-[0_0_28px_rgba(217,70,239,0.7)]',
  },
  'Branding': {
    icon: PenTool,
    borderColor: 'border-cyan-400/80',
    glowShadow: 'shadow-[0_0_18px_rgba(6,182,212,0.3)]',
    hoverGlow: 'hover:shadow-[0_0_26px_rgba(6,182,212,0.55)]',
    badgeBg: 'bg-cyan-950/60 border border-cyan-500/30',
    iconColor: 'text-cyan-400',
    arrowBorder: 'border-cyan-400/80 bg-cyan-950/50',
    arrowColor: 'text-cyan-300',
    activeBg: 'bg-cyan-950/70 border-cyan-300 shadow-[0_0_28px_rgba(6,182,212,0.7)]',
  },
  'Other': {
    icon: LayoutGrid,
    borderColor: 'border-purple-500/80',
    glowShadow: 'shadow-[0_0_18px_rgba(168,85,247,0.3)]',
    hoverGlow: 'hover:shadow-[0_0_26px_rgba(168,85,247,0.55)]',
    badgeBg: 'bg-purple-950/60 border border-purple-500/30',
    iconColor: 'text-purple-400',
    arrowBorder: 'border-purple-500/80 bg-purple-950/50',
    arrowColor: 'text-purple-300',
    activeBg: 'bg-purple-950/70 border-purple-300 shadow-[0_0_28px_rgba(168,85,247,0.7)]',
  },
};

export function ServicePill({ label, isSelected, onToggle }: ServicePillProps) {
  const theme = SERVICE_THEMES[label] || SERVICE_THEMES['Web & Apps'];
  const Icon = theme.icon;

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18 }}
      className={`group relative inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full cursor-pointer select-none transition-all duration-300 backdrop-blur-xl border ${
        isSelected
          ? `${theme.activeBg}`
          : `bg-[#060b18]/85 ${theme.borderColor} ${theme.glowShadow} ${theme.hoverGlow}`
      }`}
    >
      {/* Icon Badge */}
      <span
        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg flex items-center justify-center shrink-0 ${theme.badgeBg} ${theme.iconColor} transition-transform group-hover:scale-110`}
      >
        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
      </span>

      {/* Label Text */}
      <span className="text-white font-medium text-xs sm:text-sm tracking-normal whitespace-nowrap">
        {label}
      </span>

      {/* Right Arrow/Check Circle */}
      <span
        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
          isSelected
            ? 'bg-emerald-400 border-emerald-300 text-slate-950 font-bold shadow-[0_0_10px_#34d399]'
            : `${theme.arrowBorder} ${theme.arrowColor} group-hover:translate-x-0.5`
        }`}
      >
        {isSelected ? (
          <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3]" />
        ) : (
          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
        )}
      </span>
    </motion.button>
  );
}
