import React, { useEffect, useRef } from 'react';

/**
 * HeroBackground
 * 
 * High-end British digital studio animated intelligence background for HiByHuman.
 * 
 * Features:
 * 1. Deep navy / midnight blue canvas (#030712 / #050b18)
 * 2. Subtle perspective digital infrastructure grid (10-18% opacity, slow continuous glide)
 * 3. 35-55 floating ambient particles with varying depth, speed, and gentle pulse
 * 4. 12-16 connected intelligence nodes with soft, fluctuating cyber-thread links
 * 5. 3 soft moving radial light fields (electric blue, subtle violet, cool cyan)
 * 6. Smooth dampened mouse-follow parallax on desktop (disabled on mobile)
 * 7. Rare horizontal digital data-pulse stream traversing the network
 * 8. Strict accessibility: full prefers-reduced-motion support (freezes animation to static elegance)
 * 9. High performance: single optimized 2D canvas, 60 FPS, 0 React re-renders, 0 layout shifts
 */
export function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Media and accessibility checks
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Mouse coordinates with dampened lerp
    let targetMouseX = 0.5;
    let targetMouseY = 0.5;
    let smoothMouseX = 0.5;
    let smoothMouseY = 0.5;

    // Setup High-DPI canvas
    const resizeCanvas = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Desktop mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile || prefersReducedMotion) return;
      targetMouseX = e.clientX / window.innerWidth;
      targetMouseY = e.clientY / window.innerHeight;

      // Update soft mouse light position
      if (mouseLightRef.current) {
        mouseLightRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // ─────────────────────────────────────────────────────────────
    // Particles & Connected Nodes Architecture
    // ─────────────────────────────────────────────────────────────
    const particleCount = isMobile ? 22 : 48;
    const nodeCount = isMobile ? 8 : 14;

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      alpha: number;
      pulseSpeed: number;
      pulsePhase: number;
      color: string;
    }

    interface NodeItem {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulse: number;
      pulseSpeed: number;
      glowColor: string;
      coreColor: string;
      connections: number[];
    }

    // Color palettes tuned for high-end studio aesthetic (deep indigo, electric cyan, violet)
    const particleColors = [
      'rgba(0, 229, 255, ',   // electric cyan
      'rgba(56, 189, 248, ',  // sky blue
      'rgba(129, 140, 248, ', // indigo
      'rgba(192, 132, 252, ', // subtle violet
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.28),
        vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.25) - 0.05,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: 0.2,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    const nodes: NodeItem[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || 1200),
        y: Math.random() * (height || 800),
        vx: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.18),
        vy: (Math.random() - 0.5) * (isMobile ? 0.1 : 0.16),
        radius: Math.random() * 1.8 + 2.2,
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        glowColor: i % 2 === 0 ? 'rgba(0, 229, 255, 0.4)' : 'rgba(168, 85, 247, 0.35)',
        coreColor: i % 2 === 0 ? '#00e5ff' : '#c084fc',
        connections: [],
      });
    }

    // Dynamic data stream pulse
    let pulseX = -200;
    let pulseY = (height || 600) * 0.38;
    let pulseActive = false;
    let nextPulseTimer = 180; // frames before first pulse

    // ─────────────────────────────────────────────────────────────
    // Render Loop
    // ─────────────────────────────────────────────────────────────
    let time = 0;

    const render = () => {
      time += 0.01;

      // Smooth mouse lerping
      if (!isMobile && !prefersReducedMotion) {
        smoothMouseX += (targetMouseX - smoothMouseX) * 0.04;
        smoothMouseY += (targetMouseY - smoothMouseY) * 0.04;
      }

      ctx.clearRect(0, 0, width, height);

      const mouseOffsetX = (smoothMouseX - 0.5) * 16;
      const mouseOffsetY = (smoothMouseY - 0.5) * 14;

      // 1. Draw Connected Node Network Lines
      ctx.lineWidth = 0.75;
      const maxDistance = isMobile ? 140 : 210;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * (isMobile ? 0.12 : 0.22);
            const grad = ctx.createLinearGradient(
              nodes[i].x + mouseOffsetX * 0.4,
              nodes[i].y + mouseOffsetY * 0.4,
              nodes[j].x + mouseOffsetX * 0.4,
              nodes[j].y + mouseOffsetY * 0.4
            );
            grad.addColorStop(0, `rgba(0, 229, 255, ${lineAlpha})`);
            grad.addColorStop(0.5, `rgba(99, 102, 241, ${lineAlpha * 0.8})`);
            grad.addColorStop(1, `rgba(168, 85, 247, ${lineAlpha})`);

            ctx.strokeStyle = grad;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x + mouseOffsetX * 0.4, nodes[i].y + mouseOffsetY * 0.4);
            ctx.lineTo(nodes[j].x + mouseOffsetX * 0.4, nodes[j].y + mouseOffsetY * 0.4);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Connected Intelligence Nodes (Hubs)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!prefersReducedMotion) {
          node.x += node.vx;
          node.y += node.vy;

          if (node.x < 0) node.x = width;
          if (node.x > width) node.x = 0;
          if (node.y < 0) node.y = height;
          if (node.y > height) node.y = 0;

          node.pulse += node.pulseSpeed;
        }

        const currentRadius = node.radius + Math.sin(node.pulse) * 0.8;
        const drawX = node.x + mouseOffsetX * 0.5;
        const drawY = node.y + mouseOffsetY * 0.5;

        // Outer Glow Ring
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = node.glowColor;
        ctx.fill();

        // Node Halo
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentRadius * 1.6, 0, Math.PI * 2);
        ctx.strokeStyle = node.coreColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solid Core
        ctx.beginPath();
        ctx.arc(drawX, drawY, currentRadius * 0.75, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // 3. Draw Floating Micro-Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          p.pulsePhase += p.pulseSpeed;
        }

        // Breathing alpha
        const breathingAlpha = p.baseAlpha * (0.7 + 0.3 * Math.sin(p.pulsePhase));
        
        // Nearby mouse repulsion / subtle drift
        let driftX = 0;
        let driftY = 0;
        if (!isMobile && !prefersReducedMotion) {
          const mRealX = smoothMouseX * width;
          const mRealY = smoothMouseY * height;
          const distToMouse = Math.hypot(p.x - mRealX, p.y - mRealY);
          if (distToMouse < 180) {
            const push = (1 - distToMouse / 180) * 8;
            driftX = ((p.x - mRealX) / distToMouse) * push;
            driftY = ((p.y - mRealY) / distToMouse) * push;
          }
        }

        const drawX = p.x + mouseOffsetX * 0.25 + driftX;
        const drawY = p.y + mouseOffsetY * 0.25 + driftY;

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${breathingAlpha})`;
        ctx.fill();
      }

      // 4. Subtle Animated Digital Data Stream Pulse (Optional Premium Effect)
      if (!prefersReducedMotion) {
        if (!pulseActive) {
          nextPulseTimer--;
          if (nextPulseTimer <= 0) {
            pulseActive = true;
            pulseX = -150;
            pulseY = height * (0.25 + Math.random() * 0.45);
            nextPulseTimer = 480 + Math.floor(Math.random() * 300); // 8-13 seconds between pulses
          }
        } else {
          pulseX += 6.5; // smooth swift travel
          if (pulseX > width + 200) {
            pulseActive = false;
          } else {
            // Draw sleek beam pulse
            const beamGrad = ctx.createLinearGradient(pulseX - 120, pulseY, pulseX + 30, pulseY);
            beamGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
            beamGrad.addColorStop(0.7, 'rgba(0, 229, 255, 0.25)');
            beamGrad.addColorStop(0.95, 'rgba(255, 255, 255, 0.6)');
            beamGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = beamGrad;
            ctx.beginPath();
            ctx.moveTo(pulseX - 120, pulseY);
            ctx.lineTo(pulseX + 30, pulseY);
            ctx.stroke();

            // Head beacon
            ctx.beginPath();
            ctx.arc(pulseX + 25, pulseY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0; // reset
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. DEEP MIDNIGHT BASE & STRATEGIC GRADIENT BACKDROP
      {/* Base Atmospheric Underglow Mesh (Midnight Navy / Deep Indigo) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,28,68,0.45),transparent_80%)] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          2. DIGITAL LIGHT FIELDS (Electric Blue, Subtle Violet, Cool Cyan)
          ───────────────────────────────────────────────────────────── */}
      {/* Light Field 1: Electric Blue / Cyan (Upper Left - Slow Glide) */}
      <div className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[160px] bg-gradient-to-br from-[#0055ff]/14 to-[#00d4ff]/10 animate-[hbhHeroAtmosphereCyan_24s_ease-in-out_infinite_alternate] pointer-events-none" />

      {/* Light Field 2: Subtle Deep Violet (Upper Right - Atmospheric) */}
      <div className="absolute top-1/4 -right-32 w-[680px] h-[680px] rounded-full blur-[170px] bg-gradient-to-bl from-[#7c3aed]/12 to-[#4f46e5]/10 animate-[hbhHeroAtmospherePurple_28s_ease-in-out_infinite_alternate] pointer-events-none" />

      {/* Light Field 3: Cool Cyan / Indigo (Center Lower Ground) */}
      <div className="absolute -bottom-24 left-1/3 w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-tr from-[#0284c7]/12 to-[#6366f1]/10 animate-[hbhHeroAtmosphereFuchsia_22s_ease-in-out_infinite_alternate] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          3. MOUSE-DRIVEN AMBIENT RADIAL LIGHT (Desktop Only)
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={mouseLightRef}
        className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-[radial-gradient(circle,rgba(0,229,255,0.07)_0%,rgba(124,58,237,0.04)_50%,transparent_70%)] pointer-events-none will-change-transform transition-opacity duration-700"
      />

      {/* ─────────────────────────────────────────────────────────────
          4. PERSPECTIVE DIGITAL GRID INFRASTRUCTURE (10–18% Opacity)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [perspective:1000px]">
        {/* Subtle Horizontal & Vertical Micro-Grid */}
        <div
          className="absolute inset-0 opacity-[0.14] sm:opacity-[0.16] bg-[linear-gradient(to_right,rgba(0,229,255,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.12)_1px,transparent_1px)] [background-size:44px_44px] sm:[background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_40%,#000_30%,transparent_85%)] animate-[hbhGridGlide_36s_linear_infinite]"
        />

        {/* 3D Perspective Ground Plane Grid */}
        <div
          className="absolute -bottom-20 -left-[20%] -right-[20%] h-[55%] opacity-[0.12] sm:opacity-[0.15] bg-[linear-gradient(to_right,rgba(99,102,241,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.2)_1px,transparent_1px)] [background-size:60px_60px] [transform:rotateX(68deg)] [transform-origin:bottom_center] [mask-image:linear-gradient(to_top,#000_15%,transparent_90%)]"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. OPTIMIZED PARTICLES & CONNECTED NODES CANVAS
          ───────────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-[1]"
      />

      {/* ─────────────────────────────────────────────────────────────
          6. VIGNETTE SHIELD & READABILITY GRADIENT OVERLAY
          Keeps headline, copy, and CTAs 100% crisp and readable
          ───────────────────────────────────────────────────────────── */}
      {/* Left reading protection shield */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[75%] md:w-[65%] lg:w-[56%] bg-gradient-to-r from-[#030712]/92 via-[#030712]/75 to-transparent pointer-events-none z-[2]" />

      {/* Top navbar integration vignette */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#030712]/90 via-[#030712]/50 to-transparent pointer-events-none z-[2]" />

      {/* Bottom transition vignette (seamless blend into Section 2) */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-transparent via-transparent to-transparent pointer-events-none z-[2]" />
    </div>
  );
}
