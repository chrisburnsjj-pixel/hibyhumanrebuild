import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import modelAssetUrl from '../assets/images/human_model_hero_1788897558605.jpg';

interface InteractiveHeroModelProps {
  className?: string;
}

/**
 * Interactive 3D Cyber Human Model for HiByHuman Hero Banner
 * Responds dynamically to real-time cursor coordinates:
 * - 3D head/torso rotation (yaw & pitch) tracking cursor position
 * - Parallax depth translation
 * - Dynamic specular chromatic light sheen that tracks cursor reflection
 * - Soft idle breathing and gentle auto-sway when mouse is idle
 */
export function InteractiveHeroModel({ className = '' }: InteractiveHeroModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Normalized mouse coordinates: [-1, 1]
  const mouseX = useMotionValue(0.15); // Default slightly looking towards center
  const mouseY = useMotionValue(-0.05);

  // Smooth spring physics for organic, weighted mechanical movement
  const springConfig = { damping: 28, stiffness: 180, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotations: look towards cursor
  // As mouse moves right (positive X), model turns right (positive rotateY)
  const rotateY = useTransform(smoothX, [-1, 1], [-18, 22]);
  // As mouse moves down (positive Y), model tilts down (negative rotateX)
  const rotateX = useTransform(smoothY, [-1, 1], [14, -14]);

  // Subtle parallax positional translation
  const translateX = useTransform(smoothX, [-1, 1], [-30, 30]);
  const translateY = useTransform(smoothY, [-1, 1], [-20, 20]);

  // Dynamic specular lighting hotspot coordinates
  const lightLeft = useTransform(smoothX, [-1, 1], ['25%', '75%']);
  const lightTop = useTransform(smoothY, [-1, 1], ['20%', '70%']);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setHasInteracted(true);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Calculate normalized mouse coordinate relative to screen center [-1, 1]
      const normX = ((e.clientX / width) - 0.5) * 2;
      const normY = ((e.clientY / height) - 0.5) * 2;

      mouseX.set(normX);
      mouseY.set(normY);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative select-none pointer-events-auto cursor-grab active:cursor-grabbing ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 3D Animated Humanoid Model Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: 'preserve-3d',
        }}
        animate={
          !hasInteracted
            ? {
                y: [0, -10, 0],
                rotateY: [10, 18, 10],
              }
            : undefined
        }
        transition={
          !hasInteracted
            ? {
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
        className="relative w-full h-full flex items-center justify-center will-change-transform"
      >
        {/* Atmospheric Backlight / Cybernetic Blue & Cyan Halo */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-400/25 via-blue-600/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Primary 3D Chrome Model Render Image */}
        <div className="relative w-full max-w-[560px] lg:max-w-[680px] xl:max-w-[760px] aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[82vh] max-h-[820px] flex items-end justify-center overflow-visible">
          {/* Main Mannequin Bust Asset */}
          <img
            src={modelAssetUrl}
            alt="HiByHuman 3D Cyber Android Model"
            className="w-full h-full object-contain object-bottom lg:object-right-bottom drop-shadow-[0_20px_60px_rgba(0,180,255,0.25)] transition-transform duration-300"
            style={{
              maskImage:
                'radial-gradient(ellipse 95% 85% at 55% 50%, black 65%, rgba(0,0,0,0.5) 85%, transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 95% 85% at 55% 50%, black 65%, rgba(0,0,0,0.5) 85%, transparent 100%)',
            }}
            draggable={false}
          />

          {/* Dynamic Specular Chromatic Light Glare that follows the cursor */}
          <motion.div
            style={{
              left: lightLeft,
              top: lightTop,
            }}
            className="absolute w-44 h-44 sm:w-64 sm:h-64 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-screen opacity-70 blur-xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-fuchsia-500"
          />

          {/* Glowing Forehead & Neural Chromatic Flare */}
          <motion.div
            animate={{
              opacity: [0.6, 0.95, 0.6],
              scale: [0.98, 1.04, 0.98],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute top-[26%] right-[32%] sm:right-[34%] lg:right-[36%] w-24 h-24 sm:w-32 sm:h-32 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none mix-blend-color-dodge opacity-80 blur-lg bg-gradient-to-r from-cyan-400 via-blue-500 to-pink-500"
          />

          {/* Ethereal Surface Highlights Overlay */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white via-transparent to-transparent opacity-40 lg:opacity-20" />
        </div>

        {/* Interactive Floating Status Pill */}
        <motion.div
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-6 sm:bottom-12 right-6 sm:right-14 px-3.5 py-1.5 rounded-full bg-neutral-950/80 backdrop-blur-md border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.3)] flex items-center gap-2 pointer-events-none select-none z-20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-[11px] font-mono text-neutral-200 tracking-wide">
            Interactive Neural Mesh • Cursor Active
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
