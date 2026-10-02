import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * AmbientMotionBackground
 *  
 * Hardware-accelerated ambient atmosphere:
 * 1. Technical background grid with slow CSS drift.
 * 2. Floating ambient glow orbs:
 *    - In Dark Mode: Cyan, Purple, Fuchsia.
 *    - In Light Mode: Luminous Soft Sky Blue, Delicate Lavender/Purple, and Ethereal Soft Pink.
 * 
 * Strict zero pointer events, zero layout shift, and full prefers-reduced-motion support.
 */
export function AmbientMotionBackground() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* Subtle Technical Grid Background with slow CSS drift */}
      <div className={`ambient-tech-grid ${isLight ? 'opacity-[0.03]' : ''}`} />

      {/* Floating Ambient Glow Orbs */}
      <div className="ambient-glow-container">
        <div className={isLight ? 'hbh-orb-light-blue' : 'hbh-orb-cyan'} />
        <div className={isLight ? 'hbh-orb-light-purple' : 'hbh-orb-purple'} />
        <div className={isLight ? 'hbh-orb-light-pink' : 'hbh-orb-fuchsia'} />
      </div>
    </div>
  );
}
