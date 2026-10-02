import React, { useEffect, useRef } from 'react';

/**
 * GlobalBackground
 * 
 * Persistent global animated intelligence background architecture for HiByHuman.com
 * Positioned fixed at the root level behind all page content (z-[-10]).
 * 
 * Features:
 * 1. Deep midnight base layer (#030712 / #050b18) across the complete document.
 * 2. Subtle perspective cyber-infrastructure microgrid (continuous gliding animation).
 * 3. 3 dynamic ambient light fields in electric blue, deep violet, and cool cyan that gently drift.
 * 4. Desktop mouse-following ambient radial light aura (subtle, non-distracting).
 * 5. Hardware-accelerated 2D canvas with floating ambient particles and fluctuating connected intelligence nodes.
 * 6. Infrequent horizontal digital data pulse traversing the network horizon.
 * 7. Strict pointer-events: none and full prefers-reduced-motion accessibility support.
 * 8. Zero layout shifts, zero scroll interference, optimized 60fps rendering.
 */
export function GlobalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseLightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // High-DPI canvas setup
    const resizeCanvas = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

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

      if (mouseLightRef.current) {
        mouseLightRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      }
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Particles & Connected Nodes Architecture
    const particleCount = isMobile ? 26 : 56;
    const nodeCount = isMobile ? 8 : 16;

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

    const particleColors = [
      'rgba(0, 229, 255, ',   // electric cyan
      'rgba(56, 189, 248, ',  // sky blue
      'rgba(129, 140, 248, ', // indigo
      'rgba(192, 132, 252, ', // subtle violet
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        vx: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.22),
        vy: (Math.random() - 0.5) * (isMobile ? 0.12 : 0.20) - 0.04,
        radius: Math.random() * 1.5 + 0.8,
        baseAlpha: Math.random() * 0.28 + 0.12,
        alpha: 0.18,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
      });
    }

    const nodes: NodeItem[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * (width || window.innerWidth),
        y: Math.random() * (height || window.innerHeight),
        vx: (Math.random() - 0.5) * (isMobile ? 0.08 : 0.15),
        vy: (Math.random() - 0.5) * (isMobile ? 0.08 : 0.14),
        radius: Math.random() * 1.8 + 2.0,
        pulse: 0,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        glowColor: i % 2 === 0 ? 'rgba(0, 229, 255, 0.35)' : 'rgba(168, 85, 247, 0.3)',
        coreColor: i % 2 === 0 ? '#00e5ff' : '#c084fc',
        connections: [],
      });
    }

    // Dynamic data stream pulse
    let pulseX = -200;
    let pulseY = (height || window.innerHeight) * 0.38;
    let pulseActive = false;
    let nextPulseTimer = 180;

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse lerp
      smoothMouseX += (targetMouseX - smoothMouseX) * 0.05;
      smoothMouseY += (targetMouseY - smoothMouseY) * 0.05;
      const parallaxOffsetX = (smoothMouseX - 0.5) * (isMobile ? 0 : 20);
      const parallaxOffsetY = (smoothMouseY - 0.5) * (isMobile ? 0 : 16);

      // 1. Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.1;

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        const drawX = p.x + parallaxOffsetX * (p.radius / 2);
        const drawY = p.y + parallaxOffsetY * (p.radius / 2);

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0.04, p.alpha)})`;
        ctx.fill();
      }

      // 2. Connect near nodes
      const maxDistance = isMobile ? 120 : 180;
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        n1.x += n1.vx;
        n1.y += n1.vy;

        if (n1.x < -30) n1.x = width + 30;
        if (n1.x > width + 30) n1.x = -30;
        if (n1.y < -30) n1.y = height + 30;
        if (n1.y > height + 30) n1.y = -30;

        const drawX1 = n1.x + parallaxOffsetX;
        const drawY1 = n1.y + parallaxOffsetY;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const drawX2 = n2.x + parallaxOffsetX;
          const drawY2 = n2.y + parallaxOffsetY;

          const dx = drawX1 - drawX2;
          const dy = drawY1 - drawY2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.18;
            const gradient = ctx.createLinearGradient(drawX1, drawY1, drawX2, drawY2);
            gradient.addColorStop(0, `rgba(0, 229, 255, ${lineAlpha})`);
            gradient.addColorStop(1, `rgba(168, 85, 247, ${lineAlpha * 0.8})`);

            ctx.lineWidth = 0.8;
            ctx.strokeStyle = gradient;
            ctx.beginPath();
            ctx.moveTo(drawX1, drawY1);
            ctx.lineTo(drawX2, drawY2);
            ctx.stroke();
          }
        }

        // Draw node core & soft glow
        n1.pulse += n1.pulseSpeed;
        const currentRadius = n1.radius + Math.sin(n1.pulse) * 0.8;

        ctx.beginPath();
        ctx.arc(drawX1, drawY1, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = n1.glowColor;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(drawX1, drawY1, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = n1.coreColor;
        ctx.fill();
      }

      // 3. Rare horizontal data beam pulse
      if (!isMobile) {
        if (!pulseActive) {
          nextPulseTimer--;
          if (nextPulseTimer <= 0) {
            pulseActive = true;
            pulseX = -200;
            pulseY = height * (0.2 + Math.random() * 0.6);
            nextPulseTimer = 450 + Math.floor(Math.random() * 300);
          }
        } else {
          pulseX += 6.5;
          if (pulseX > width + 200) {
            pulseActive = false;
          } else {
            const beamGrad = ctx.createLinearGradient(pulseX - 120, pulseY, pulseX + 30, pulseY);
            beamGrad.addColorStop(0, 'rgba(0, 229, 255, 0)');
            beamGrad.addColorStop(0.7, 'rgba(0, 229, 255, 0.2)');
            beamGrad.addColorStop(0.95, 'rgba(255, 255, 255, 0.5)');
            beamGrad.addColorStop(1, 'rgba(168, 85, 247, 0)');

            ctx.lineWidth = 1.5;
            ctx.strokeStyle = beamGrad;
            ctx.beginPath();
            ctx.moveTo(pulseX - 120, pulseY);
            ctx.lineTo(pulseX + 30, pulseY);
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(pulseX + 25, pulseY, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#00e5ff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

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
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. DEEP MIDNIGHT BASE & GRADIENT BACKDROP (Full Page)
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#030712] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_75%_at_50%_0%,rgba(14,28,68,0.5),transparent_80%)] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          2. PERSISTENT DIGITAL LIGHT FIELDS (Electric Blue, Violet, Cyan)
          ───────────────────────────────────────────────────────────── */}
      {/* Light Field 1: Electric Blue / Cyan (Upper Section - Slow Glide) */}
      <div className="absolute -top-32 -left-32 w-[650px] sm:w-[800px] h-[650px] sm:h-[800px] rounded-full blur-[160px] sm:blur-[200px] bg-gradient-to-br from-[#0055ff]/14 to-[#00d4ff]/10 animate-[hbhHeroAtmosphereCyan_24s_ease-in-out_infinite_alternate] pointer-events-none" />

      {/* Light Field 2: Subtle Deep Violet (Center Right - Atmospheric) */}
      <div className="absolute top-1/3 -right-32 w-[680px] sm:w-[850px] h-[680px] sm:h-[850px] rounded-full blur-[170px] sm:blur-[210px] bg-gradient-to-bl from-[#7c3aed]/12 to-[#4f46e5]/10 animate-[hbhHeroAtmospherePurple_28s_ease-in-out_infinite_alternate] pointer-events-none" />

      {/* Light Field 3: Cool Cyan / Indigo (Lower Sections - Continuous Glow) */}
      <div className="absolute -bottom-24 left-1/4 w-[650px] sm:w-[900px] h-[650px] sm:h-[900px] rounded-full blur-[150px] sm:blur-[200px] bg-gradient-to-tr from-[#0284c7]/12 to-[#6366f1]/10 animate-[hbhHeroAtmosphereFuchsia_22s_ease-in-out_infinite_alternate] pointer-events-none" />

      {/* ─────────────────────────────────────────────────────────────
          3. MOUSE-DRIVEN AMBIENT RADIAL LIGHT (Desktop Only)
          ───────────────────────────────────────────────────────────── */}
      <div
        ref={mouseLightRef}
        className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-[140px] bg-[radial-gradient(circle,rgba(0,229,255,0.06)_0%,rgba(124,58,237,0.035)_50%,transparent_70%)] pointer-events-none will-change-transform transition-opacity duration-700"
      />

      {/* ─────────────────────────────────────────────────────────────
          4. PERSISTENT PERSPECTIVE DIGITAL GRID INFRASTRUCTURE
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden [perspective:1000px]">
        {/* Subtle Micro-Grid */}
        <div
          className="absolute inset-0 opacity-[0.10] sm:opacity-[0.14] bg-[linear-gradient(to_right,rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.1)_1px,transparent_1px)] [background-size:48px_48px] sm:[background-size:56px_56px] [mask-image:radial-gradient(ellipse_95%_80%_at_50%_45%,#000_30%,transparent_90%)] animate-[hbhGridGlide_36s_linear_infinite]"
        />

        {/* 3D Perspective Ground Plane Grid */}
        <div
          className="absolute -bottom-20 -left-[20%] -right-[20%] h-[55%] opacity-[0.09] sm:opacity-[0.12] bg-[linear-gradient(to_right,rgba(99,102,241,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,229,255,0.18)_1px,transparent_1px)] [background-size:60px_60px] [transform:rotateX(68deg)] [transform-origin:bottom_center] [mask-image:linear-gradient(to_top,#000_15%,transparent_90%)]"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. OPTIMIZED PARTICLES & CONNECTED NODES CANVAS (Full Page)
          ───────────────────────────────────────────────────────────── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-[1]"
      />

      {/* ─────────────────────────────────────────────────────────────
          6. VIGNETTE SHIELD & READABILITY GRADIENT OVERLAY
          ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(3,7,18,0.45)_100%)] pointer-events-none z-[2]" />
    </div>
  );
}
