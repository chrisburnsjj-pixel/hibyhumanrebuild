import React from 'react';
import { motion } from 'motion/react';

interface Bubble {
  id: number;
  size: number;
  left: string; // CSS percentage, e.g. "15%"
  top: string;  // CSS percentage or px
  duration: number;
  delay: number;
  xRange: number[];
  yRange: number[];
  color: string;
}

const BUBBLES: Bubble[] = [
  {
    id: 1,
    size: 28,
    left: '6%',
    top: '20%',
    duration: 5.2,
    delay: 0,
    xRange: [-6, 8, -6],
    yRange: [-8, 6, -8],
    color: 'from-cyan-400/40 via-blue-500/25 to-transparent',
  },
  {
    id: 2,
    size: 18,
    left: '14%',
    top: '45%',
    duration: 4.1,
    delay: 0.8,
    xRange: [4, -6, 4],
    yRange: [6, -8, 6],
    color: 'from-fuchsia-500/35 via-purple-500/20 to-transparent',
  },
  {
    id: 3,
    size: 34,
    left: '26%',
    top: '15%',
    duration: 6.0,
    delay: 1.2,
    xRange: [-8, 6, -8],
    yRange: [-10, 8, -10],
    color: 'from-cyan-400/30 via-fuchsia-400/20 to-transparent',
  },
  {
    id: 4,
    size: 16,
    left: '38%',
    top: '60%',
    duration: 4.6,
    delay: 0.3,
    xRange: [5, -5, 5],
    yRange: [8, -6, 8],
    color: 'from-fuchsia-400/30 via-blue-500/20 to-transparent',
  },
  {
    id: 5,
    size: 40,
    left: '50%',
    top: '25%',
    duration: 7.2,
    delay: 1.8,
    xRange: [-10, 10, -10],
    yRange: [-6, 10, -6],
    color: 'from-cyan-300/30 via-fuchsia-500/20 to-transparent',
  },
  {
    id: 6,
    size: 22,
    left: '62%',
    top: '40%',
    duration: 5.0,
    delay: 0.5,
    xRange: [6, -8, 6],
    yRange: [6, -8, 6],
    color: 'from-blue-400/35 via-cyan-400/20 to-transparent',
  },
  {
    id: 7,
    size: 30,
    left: '74%',
    top: '15%',
    duration: 6.4,
    delay: 2.1,
    xRange: [-7, 9, -7],
    yRange: [-8, 8, -8],
    color: 'from-fuchsia-400/30 via-cyan-400/25 to-transparent',
  },
  {
    id: 8,
    size: 19,
    left: '84%',
    top: '50%',
    duration: 4.8,
    delay: 1.0,
    xRange: [6, -6, 6],
    yRange: [7, -7, 7],
    color: 'from-cyan-400/40 via-purple-500/25 to-transparent',
  },
  {
    id: 9,
    size: 26,
    left: '93%',
    top: '30%',
    duration: 5.5,
    delay: 1.5,
    xRange: [-5, 7, -5],
    yRange: [-9, 7, -9],
    color: 'from-fuchsia-300/40 via-cyan-400/20 to-transparent',
  },
];

export function NavbarBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* Subtle iridescent glow bar running across */}
      <div className="absolute inset-x-0 -top-10 h-24 bg-gradient-to-r from-cyan-400/15 via-fuchsia-500/10 to-blue-500/15 blur-xl opacity-70" />

      {/* Floating glassy bubbles */}
      {BUBBLES.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            top: bubble.top,
          }}
          animate={{
            x: bubble.xRange,
            y: bubble.yRange,
            scale: [1, 1.08, 0.94, 1],
            opacity: [0.65, 0.95, 0.7, 0.65],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Infinity,
            delay: bubble.delay,
            ease: 'easeInOut',
          }}
        >
          {/* Glass Bubble Outer Shell with soft border and subtle drop glow */}
          <div
            className={`w-full h-full rounded-full bg-gradient-to-tr ${bubble.color} border border-cyan-300/40 backdrop-blur-xs shadow-[0_2px_12px_rgba(0,212,255,0.25)] relative overflow-hidden`}
          >
            {/* Specular White Highlight Dot (Soap/Glass Bubble effect) */}
            <div className="absolute top-1 left-1.5 w-1.5 h-1.5 rounded-full bg-white/80 blur-[0.5px]" />
            {/* Secondary lower reflection rim */}
            <div className="absolute bottom-1 right-1.5 w-2 h-1 rounded-full bg-cyan-200/50 blur-[1px] rotate-45" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
