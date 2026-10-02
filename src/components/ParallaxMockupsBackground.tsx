import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Globe, 
  Smartphone, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  Sparkles, 
  Activity, 
  CheckCircle2, 
  BarChart3,
  Layers,
  ArrowUpRight
} from 'lucide-react';

export function ParallaxMockupsBackground() {
  const { scrollYProgress } = useScroll();

  // Parallax translation transforms with differential speeds for genuine 3D depth
  const yLayer1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], [50, -420]);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], [150, -680]);
  const yLayer4 = useTransform(scrollYProgress, [0, 1], [300, -520]);
  const yLayer5 = useTransform(scrollYProgress, [0, 1], [500, -750]);
  const yLayer6 = useTransform(scrollYProgress, [0, 1], [700, -600]);

  // Subtle rotational drift during scroll
  const rotateLayer1 = useTransform(scrollYProgress, [0, 1], [-4, -8]);
  const rotateLayer2 = useTransform(scrollYProgress, [0, 1], [3, 7]);
  const rotateLayer3 = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  const rotateLayer4 = useTransform(scrollYProgress, [0, 1], [4, -2]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Ambient background glow orbs */}
      <div className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-cyan-500/[0.04] rounded-full blur-3xl" />
      <div className="absolute top-2/3 -right-48 w-[700px] h-[700px] bg-blue-600/[0.04] rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-sky-400/[0.03] rounded-full blur-3xl" />

      {/* ============================================================ */}
      {/* 1. TOP-RIGHT: Modern SaaS Website Browser Window Mockup */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yLayer1, rotate: rotateLayer1 }}
        className="absolute top-28 sm:top-20 -right-12 sm:right-4 md:right-12 lg:right-20 w-[320px] sm:w-[420px] lg:w-[480px] opacity-[0.22] hover:opacity-40 transition-opacity duration-500"
      >
        <div className="rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Browser Chrome Header */}
          <div className="px-4 py-2.5 bg-neutral-950/80 border-b border-white/10 flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            {/* Address Bar */}
            <div className="flex-1 ml-2 px-3 py-1 bg-neutral-900/90 rounded-md border border-white/5 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Globe className="w-3 h-3 text-cyan-400" />
                https://hibyhuman.agency/intelligence
              </span>
              <span className="text-emerald-400 text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10">SSL 256</span>
            </div>
          </div>

          {/* Web App Body Preview */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-cyan-400 tracking-wider">Enterprise Performance</span>
                <h4 className="text-white text-base font-bold flex items-center gap-2">
                  <span>+342% Conversion Delta</span>
                  <span className="text-emerald-400 text-xs font-normal bg-emerald-400/10 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> +28.4%
                  </span>
                </h4>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>

            {/* Sparkline & Grid Preview */}
            <div className="h-20 bg-neutral-950/60 rounded-xl p-2.5 border border-white/5 flex items-end gap-1.5">
              {[35, 52, 44, 68, 62, 78, 92, 85, 96, 110, 105, 128].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 h-full">
                  <div
                    style={{ height: `${(h / 130) * 100}%` }}
                    className={`w-full rounded-t-sm ${
                      i === 11 ? 'bg-cyan-400' : 'bg-cyan-500/40'
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[9px] text-neutral-400">Autonomous Agents</div>
                <div className="text-xs font-semibold text-white mt-0.5">24/7 Active</div>
              </div>
              <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[9px] text-neutral-400">Latency Overhead</div>
                <div className="text-xs font-semibold text-cyan-300 mt-0.5">&lt; 14ms Global</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 2. MID-LEFT: Instagram / Visual Social Media Mockup Card */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yLayer2, rotate: rotateLayer2 }}
        className="absolute top-[480px] sm:top-[420px] -left-8 sm:left-4 md:left-10 lg:left-16 w-[280px] sm:w-[340px] opacity-[0.20] hover:opacity-35 transition-opacity duration-500"
      >
        <div className="rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-4">
          {/* Social Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-500">
                <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center text-[10px] font-bold text-white">
                  H
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white">hibyhuman</span>
                  <CheckCircle2 className="w-3 h-3 text-cyan-400 fill-cyan-400/20" />
                </div>
                <span className="text-[10px] text-neutral-400">London, UK • Studio</span>
              </div>
            </div>
            <span className="text-neutral-500 text-sm">•••</span>
          </div>

          {/* Visual Post Area */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-neutral-950 via-slate-900 to-cyan-950 border border-white/5 flex flex-col justify-center items-center p-4 text-center">
            <div className="w-10 h-10 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-white tracking-tight">Built for Next Digital Era</span>
            <span className="text-[10px] text-neutral-400 mt-1">Human ideas + Intelligent tech</span>

            <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full bg-neutral-950/80 backdrop-blur-md text-[9px] text-cyan-300 border border-white/10">
              #AIStudio #Design
            </div>
          </div>

          {/* Social Action Bar */}
          <div className="flex items-center justify-between mt-3 pt-2 text-neutral-300">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-rose-400">
                <Heart className="w-3.5 h-3.5 fill-rose-400" />
                4,892
              </span>
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5" />
                348
              </span>
              <Share2 className="w-3.5 h-3.5" />
            </div>
            <Bookmark className="w-3.5 h-3.5 text-neutral-400" />
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 3. RIGHT-SIDE: Mobile Smartphone App Mockup */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yLayer3, rotate: rotateLayer3 }}
        className="absolute top-[850px] sm:top-[780px] -right-6 sm:right-6 md:right-16 w-[240px] sm:w-[280px] opacity-[0.24] hover:opacity-40 transition-opacity duration-500"
      >
        <div className="rounded-[36px] bg-neutral-950 border-[6px] border-neutral-800 shadow-[0_25px_60px_rgba(0,0,0,0.6)] p-3 overflow-hidden">
          {/* Phone Dynamic Island */}
          <div className="w-20 h-4 bg-neutral-900 rounded-full mx-auto mb-3 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400/70" />
          </div>

          {/* App UI Screen */}
          <div className="space-y-3">
            <div className="flex justify-between items-center px-1">
              <div>
                <div className="text-[9px] text-neutral-400">Welcome Back</div>
                <div className="text-xs font-bold text-white">HiByHuman OS</div>
              </div>
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-400 flex items-center justify-center text-[10px]">
                ⚡
              </div>
            </div>

            {/* Mobile Feature Card */}
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-900/40 to-blue-900/30 border border-cyan-500/20">
              <span className="text-[8px] font-bold text-cyan-300 uppercase tracking-wider">Active System</span>
              <p className="text-xs font-semibold text-white mt-0.5">Realtime Neural Flow</p>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-cyan-400 h-full w-3/4 rounded-full" />
              </div>
            </div>

            {/* Micro List items */}
            <div className="space-y-1.5">
              {[
                { title: 'Brand Identity Vector', status: 'Ready' },
                { title: 'Web App Engine v2', status: 'Active' },
                { title: 'Social Campaign Automation', status: 'Synced' },
              ].map((item, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-neutral-900/80 border border-white/5 flex items-center justify-between text-[10px]">
                  <span className="text-neutral-300">{item.title}</span>
                  <span className="text-cyan-400 font-mono text-[9px]">{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 4. MID-LOW LEFT: Twitter / X Viral Post Mockup Card */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yLayer4, rotate: rotateLayer4 }}
        className="absolute top-[1350px] sm:top-[1250px] -left-10 sm:left-6 md:left-20 w-[300px] sm:w-[380px] opacity-[0.20] hover:opacity-35 transition-opacity duration-500"
      >
        <div className="rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-neutral-950 border border-cyan-400/40 flex items-center justify-center font-bold text-white text-xs shrink-0">
              ✳
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white truncate">HiByHuman</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-[11px] text-neutral-400 truncate">@hibyhuman • 1h</span>
              </div>
              <p className="text-xs text-neutral-200 mt-1.5 leading-relaxed">
                Human ideas. Powered by intelligent technology.
                We don't do generic templates. Every experience is custom-crafted to dominate the cyber era. 🚀🌐
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] text-neutral-400 pt-2 border-t border-white/5">
                <span>💬 142</span>
                <span>🔁 890</span>
                <span className="text-rose-400">❤️ 4.2K</span>
                <span>📊 380K views</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 5. DEEP-SCROLL RIGHT: E-Commerce & Web Design Showcase Window */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yLayer5, rotate: rotateLayer1 }}
        className="absolute top-[1900px] sm:top-[1800px] -right-10 sm:right-10 md:right-24 w-[320px] sm:w-[440px] opacity-[0.22] hover:opacity-40 transition-opacity duration-500"
      >
        <div className="rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="px-4 py-2.5 bg-neutral-950/80 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <span>hibyhuman.design/showcase</span>
              <ArrowUpRight className="w-3 h-3" />
            </div>
          </div>

          <div className="p-4 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-neutral-950 p-3 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-cyan-400 uppercase font-mono">Bespoke UI</span>
                <h5 className="text-xs font-bold text-white mt-1">E-Commerce Architecture</h5>
              </div>
              <div className="mt-3 text-[10px] text-neutral-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-emerald-400" />
                99.99% Uptime
              </div>
            </div>

            <div className="rounded-xl bg-neutral-950 p-3 border border-white/5 flex flex-col justify-between">
              <div>
                <span className="text-[9px] text-purple-400 uppercase font-mono">AI Creative</span>
                <h5 className="text-xs font-bold text-white mt-1">Generative Video Engine</h5>
              </div>
              <div className="mt-3 text-[10px] text-neutral-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Active Model
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 6. BOTTOM-LEFT: LinkedIn Innovation & Growth Thought Post */}
      {/* ============================================================ */}
      <motion.div
        style={{ y: yLayer6, rotate: rotateLayer2 }}
        className="absolute top-[2500px] sm:top-[2350px] -left-6 sm:left-12 md:left-24 w-[300px] sm:w-[380px] opacity-[0.20] hover:opacity-35 transition-opacity duration-500"
      >
        <div className="rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-4">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-600/30 flex items-center justify-center text-cyan-300 font-bold text-sm">
              in
            </div>
            <div>
              <div className="text-xs font-bold text-white">HiByHuman Innovation Hub</div>
              <div className="text-[10px] text-neutral-400">18,500+ followers • Technology & Strategy</div>
            </div>
          </div>
          <p className="text-[11px] text-neutral-300 leading-relaxed">
            "The future belongs to companies that seamlessly merge human empathy with autonomous intelligence. Here is how our engineering team delivers bespoke impact across global markets."
          </p>
          <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400">
            <span className="text-cyan-400 font-medium">👍💡❤️ 1,840 interactions</span>
            <span>128 comments</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
