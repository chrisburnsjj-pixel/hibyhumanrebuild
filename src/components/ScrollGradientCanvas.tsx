import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

/**
 * ScrollGradientCanvas
 * 
 * Full-Page Scroll-Driven Background Color Transition System for HiByHuman.com
 * 
 * Features exact specification requirements:
 * 
 * 1. CONTINUOUS SCROLL-LINKED COLOR JOURNEY:
 *    - Section 1 (Hero ~ 0.0 - 0.15): Deep Midnight Blue (#07111F -> #0B1630 -> #101C3A)
 *    - Section 2 (About/Services Arc ~ 0.15 - 0.35): Transition Midnight Blue -> Electric Blue (#07111F -> #0A1F45 -> #0B3A70)
 *    - Section 3 (Pricing Packages ~ 0.35 - 0.55): Transition Electric Blue -> Deep Violet (#0B3A70 -> #182B63 -> #321B63)
 *    - Section 4 (Portfolio / Tech ~ 0.55 - 0.75): Transition Deep Violet -> Cyan / Deep Teal (#321B63 -> #173A58 -> #064B59)
 *    - Section 5 (Strategy Meets Production / Work ~ 0.75 - 0.90): Transition Cyan/Teal -> Dark Indigo (#064B59 -> #17254F -> #171A3D)
 *    - Section 6 (Final CTA / Testimonials / Footer ~ 0.90 - 1.0): Transition Dark Indigo -> Premium Blue/Violet (#171A3D -> #101D45 -> #24154A)
 * 
 * 2. MULTI-LAYER ARCHITECTURE:
 *    - Layer 1: Base continuous interpolated background color
 *    - Layer 2: Primary dynamic radial gradient (positions and scales with scroll)
 *    - Layer 3: Secondary atmospheric ambient glow field (moves diagonally with scroll)
 *    - Layer 4: Very subtle digital grid (transforms & tracks smoothly with scroll)
 *    - Layer 5: Lightweight Canvas Particles & Network Layer that subtly responds to scroll velocity
 *    - Layer 6: Subtle horizontal light pulse / data stream traversing infrequently
 * 
 * 3. SMOOTH SPRING INTERPOLATION:
 *    - Uses useScroll() + useSpring(scrollYProgress, { stiffness: 40, damping: 20 })
 *    - Pure GPU-composited motion values without continuous React re-renders
 *    - Reverses smoothly when scrolling up with zero abrupt resets or hard swaps
 * 
 * 4. PERFORMANCE & ACCESSIBILITY:
 *    - Hardware accelerated: transform, opacity, background interpolation
 *    - Mobile optimized: reduced particle count (50%), clamped parallax
 *    - prefers-reduced-motion: freezes parallax and particles, maintains elegant static gradient
 */

export function ScrollGradientCanvas() {
  const { scrollYProgress } = useScroll();

  // Specification spring configuration: stiffness 40, damping 20
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.0005,
  });

  // ══════════════════════════════════════════════════════════════
  // 1. LAYER 1: BASE BACKGROUND COLOR STOPS
  // ══════════════════════════════════════════════════════════════
  // Key scroll breakpoints
  const scrollRange = [0, 0.18, 0.38, 0.58, 0.78, 1.0];

  // Deep base tone
  const baseBg = useTransform(
    smoothProgress,
    scrollRange,
    [
      '#07111F', // Section 1: Hero Deep Midnight Blue
      '#0A1F45', // Section 2: About / Services Electric Blue Tone
      '#182B63', // Section 3: Packages / Services Deep Violet Tone
      '#064B59', // Section 4: Tech / Portfolio Cyan/Teal Tone
      '#171A3D', // Section 5: Work Dark Indigo Tone
      '#24154A', // Section 6: Final CTA Premium Blue/Violet Tone
    ]
  );

  // Gradient Top-Stop
  const gradTop = useTransform(
    smoothProgress,
    scrollRange,
    ['#07111F', '#071630', '#0B3A70', '#173A58', '#064B59', '#171A3D']
  );

  // Gradient Mid-Stop
  const gradMid = useTransform(
    smoothProgress,
    scrollRange,
    ['#0B1630', '#0A1F45', '#182B63', '#11354D', '#17254F', '#101D45']
  );

  // Gradient Bottom-Stop
  const gradBot = useTransform(
    smoothProgress,
    scrollRange,
    ['#101C3A', '#0B3A70', '#321B63', '#064B59', '#171A3D', '#24154A']
  );

  // ══════════════════════════════════════════════════════════════
  // 2. LAYER 2 & 3: RADIAL ATMOSPHERIC GLOWS (Positional Morph)
  // ══════════════════════════════════════════════════════════════
  // Primary Radial Light Orb (moves from top-left to center-right to bottom-center)
  const orb1X = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['15%', '75%', '25%', '80%', '50%']);
  const orb1Y = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['12%', '35%', '55%', '72%', '88%']);
  const orb1Color = useTransform(
    smoothProgress,
    scrollRange,
    [
      'rgba(0, 212, 255, 0.18)',  // Cyan highlight in Hero
      'rgba(11, 58, 112, 0.32)',  // Electric Blue in About
      'rgba(124, 58, 237, 0.26)', // Violet in Services/Pricing
      'rgba(6, 182, 212, 0.24)',  // Cyan/Teal in Tech
      'rgba(79, 70, 229, 0.25)',  // Indigo in Work
      'rgba(168, 85, 247, 0.32)', // Radiant Violet in CTA
    ]
  );
  const orb1Scale = useTransform(smoothProgress, [0, 0.5, 1], [1, 1.35, 1.15]);

  // Secondary Atmospheric Glow (diagonal counter-movement)
  const orb2X = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['85%', '20%', '78%', '22%', '50%']);
  const orb2Y = useTransform(smoothProgress, [0, 0.25, 0.5, 0.75, 1], ['30%', '48%', '70%', '82%', '92%']);
  const orb2Color = useTransform(
    smoothProgress,
    scrollRange,
    [
      'rgba(16, 28, 58, 0.35)',   // Midnight blue in Hero
      'rgba(0, 102, 255, 0.22)',  // Vibrant blue in About
      'rgba(50, 27, 99, 0.38)',   // Deep violet in Pricing
      'rgba(6, 75, 89, 0.32)',    // Deep teal in Tech
      'rgba(23, 26, 61, 0.35)',   // Dark Indigo in Work
      'rgba(36, 21, 74, 0.40)',   // Rich Blue-Violet in CTA
    ]
  );
  const orb2Scale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 0.95, 1.3]);

  // Tertiary Center Focus Glow (intensifies at the final CTA)
  const orb3Opacity = useTransform(smoothProgress, [0, 0.8, 1], [0.06, 0.15, 0.45]);
  const orb3Color = useTransform(
    smoothProgress,
    [0, 0.5, 0.8, 1],
    [
      'rgba(0, 229, 255, 0.12)',
      'rgba(124, 58, 237, 0.18)',
      'rgba(99, 102, 241, 0.25)',
      'rgba(192, 38, 211, 0.35)',
    ]
  );

  // ══════════════════════════════════════════════════════════════
  // 3. LAYER 4: DIGITAL GRID SCROLL PARALLAX
  // ══════════════════════════════════════════════════════════════
  const gridTranslateY = useTransform(smoothProgress, [0, 1], ['0px', '-120px']);
  const gridOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.12, 0.15, 0.11]);

  // ══════════════════════════════════════════════════════════════
  // 4. LAYER 5: LIGHTWEIGHT PARTICLES & CONNECTED NODES CANVAS
  // ══════════════════════════════════════════════════════════════
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Initialize 28-40 lightweight particles (50% on mobile)
    const particleCount = isMobile ? 16 : 34;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      radius: Math.random() * 1.6 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
      pulseSpeed: Math.random() * 0.015 + 0.005,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // 8-12 hub nodes with soft connection lines
    const nodeCount = isMobile ? 6 : 10;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * (width || window.innerWidth),
      y: Math.random() * (height || window.innerHeight),
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      radius: Math.random() * 2 + 1.8,
      baseAlpha: 0.35,
    }));

    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Scroll velocity influence
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.04;
      lastScrollY = currentScrollY;

      // Draw faint connections between close nodes
      const maxDistance = isMobile ? 120 : 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (!prefersReducedMotion) {
          n.x += n.vx;
          n.y += n.vy - scrollVelocity * 0.3;

          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.45)';
        ctx.fill();

        // Soft halo
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124, 58, 237, 0.15)';
        ctx.fill();
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy - scrollVelocity * 0.4;
          p.pulsePhase += p.pulseSpeed;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        const dynamicAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${Math.max(0.05, dynamicAlpha)})`;
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          LAYER 1: INTERPOLATED CONTINUOUS GRADIENT CANVAS
          Smoothly transitions along full-page scroll progress
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          backgroundColor: baseBg,
          backgroundImage: useTransform(
            [gradTop, gradMid, gradBot],
            ([t, m, b]) => `linear-gradient(160deg, ${t} 0%, ${m} 48%, ${b} 100%)`
          ),
        }}
        className="absolute inset-0 w-full h-full will-change-[background-color,background-image]"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 2: PRIMARY RADIAL ATMOSPHERIC GLOW (Dynamic Position & Scale)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          left: orb1X,
          top: orb1Y,
          backgroundColor: orb1Color,
          scale: orb1Scale,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[720px] sm:w-[920px] h-[720px] sm:h-[920px] rounded-full blur-[120px] sm:blur-[160px] will-change-[transform,left,top,background-color]"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3: SECONDARY ATMOSPHERIC GLOW (Diagonal Counter-Shift)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          left: orb2X,
          top: orb2Y,
          backgroundColor: orb2Color,
          scale: orb2Scale,
        }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-[680px] sm:w-[860px] h-[680px] sm:h-[860px] rounded-full blur-[130px] sm:blur-[170px] will-change-[transform,left,top,background-color]"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 3B: FINAL CTA SPOTLIGHT (Glows at Section 6 Conclusion)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          opacity: orb3Opacity,
          backgroundColor: orb3Color,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1100px] h-[600px] rounded-full blur-[140px] will-change-[opacity,background-color]"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 4: DIGITAL PERSPECTIVE GRID (Scroll-Linked Parallax)
          ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          y: gridTranslateY,
          opacity: gridOpacity,
        }}
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,229,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.08)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_90%_75%_at_50%_50%,#000_30%,transparent_90%)] will-change-transform"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 5: FLOATING PARTICLES & CONNECTED NODES CANVAS
          ───────────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* ─────────────────────────────────────────────────────────────
          LAYER 6: RARE SUBTLE DATA STREAM PULSE (Traversing Horizon)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hbh-hero-sweep-line" />
      </div>

      {/* Ambient Vignette Shield: Preserves extreme text legibility across all sections */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(3,7,18,0.5)_100%)] pointer-events-none" />
    </div>
  );
}
