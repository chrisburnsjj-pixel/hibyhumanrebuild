import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, Eye } from 'lucide-react';

interface HumanModel3DProps {
  className?: string;
}

export function HumanModel3D({ className = '' }: HumanModel3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Normalized mouse coordinates: -1 (left/top) to +1 (right/bottom)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for organic, buttery-smooth head turning & tilting
  const springConfig = { damping: 22, stiffness: 140, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D transformations following the cursor
  const rotateY = useTransform(smoothX, [-1, 1], [-16, 16]); // horizontal head rotation
  const rotateX = useTransform(smoothY, [-1, 1], [10, -10]); // vertical head tilt
  const translateX = useTransform(smoothX, [-1, 1], [-20, 20]); // parallax shift
  const translateY = useTransform(smoothY, [-1, 1], [-15, 15]);

  // Chromatic light / glare position across the face
  const glareX = useTransform(smoothX, [-1, 1], ['25%', '75%']);
  const glareY = useTransform(smoothY, [-1, 1], ['20%', '80%']);
  const glareOpacity = useTransform(smoothX, [-1, 0, 1], [0.85, 0.4, 0.85]);

  // Track cursor movement across the hero section / window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance relative to center of model
      const deltaX = (e.clientX - centerX) / (window.innerWidth / 1.5);
      const deltaY = (e.clientY - centerY) / (window.innerHeight / 1.5);

      // Clamp values between -1 and 1
      mouseX.set(Math.max(-1, Math.min(1, deltaX)));
      mouseY.set(Math.max(-1, Math.min(1, deltaY)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`relative flex items-center justify-center select-none perspective-[1400px] ${className}`}
    >
      {/* Dynamic Ambient Backlight Glow following mouse */}
      <motion.div
        style={{
          x: translateX,
          y: translateY,
        }}
        className="absolute -inset-8 bg-gradient-to-tr from-cyan-400/25 via-blue-500/20 to-indigo-500/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* 3D Humanoid Model Container with dynamic cursor-tracking perspective */}
      <motion.div
        style={{
          rotateY,
          rotateX,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,180,255,0.18)] border border-white/60 bg-gradient-to-b from-white via-neutral-50 to-neutral-100"
      >
        {/* Model Image (Faithful reproduction of user's 3D humanoid mannequin) */}
        <img
          src="/src/assets/images/human_model_hero_1788897558605.jpg"
          alt="HiByHuman 3D Intelligent Model"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-[1.04] transition-transform duration-700 ease-out"
        />

        {/* Dynamic Iridescent Prismatic Glare Overlay that shifts on the face with cursor */}
        <motion.div
          style={{
            background: `radial-gradient(circle at 60% 45%, rgba(0, 229, 255, 0.45) 0%, rgba(138, 43, 226, 0.35) 40%, transparent 70%)`,
            opacity: glareOpacity,
          }}
          className="absolute inset-0 pointer-events-none mix-blend-screen"
        />

        {/* Dynamic Specular Sheen Beam responding to cursor */}
        <motion.div
          style={{
            left: glareX,
            top: glareY,
          }}
          className="absolute w-44 h-44 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-cyan-300/40 via-white/30 to-purple-400/40 rounded-full blur-2xl pointer-events-none mix-blend-overlay"
        />

        {/* Subtle glass reflection edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/60 pointer-events-none" />

        {/* Interactive Indicator Pill */}
        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/70 backdrop-blur-md border border-white/20 text-white shadow-lg pointer-events-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide flex items-center gap-1.5 text-neutral-200">
            <Eye className="w-3 h-3 text-cyan-400" />
            Interactive 3D Model
          </span>
        </div>

        {/* Brand Watermark Tag */}
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-neutral-200/60 shadow-xs pointer-events-none">
          <span className="text-[10px] font-bold text-neutral-900 tracking-tight">HiByHuman</span>
          <span className="text-[9px] text-cyan-600 font-mono">Neural Interface</span>
        </div>
      </motion.div>
    </div>
  );
}
