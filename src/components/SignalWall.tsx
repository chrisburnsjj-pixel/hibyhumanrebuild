import React, { useState } from 'react';
import { TECH_ECOSYSTEM_NODES } from '../data';
import { TechNode } from '../types';
import { Cpu, Globe, Cloud, Sparkles, TrendingUp, Terminal } from 'lucide-react';

interface SignalWallProps {
  onOpenFittingModal: () => void;
}

type FilterCategory = 'all' | 'frontend' | 'backend' | 'cloud' | 'marketing';

const filterViews = {
  all: {
    count: 8,
    unit: 'integrated pipelines.',
    statement: 'One unified cyber architecture.',
    description: 'Modern frontends, microservice backends, global edge caching, and automated SEO indexing operating in total cohesion.',
    badge: 'Enterprise Engineering Stack'
  },
  frontend: {
    count: 2,
    unit: 'interface engines.',
    statement: '60 FPS fluid interaction.',
    description: 'Server-side rendered Next.js & React architectures with sub-second First Contentful Paint and zero layout shift animations.',
    badge: 'Modern UI & Motion Stack'
  },
  backend: {
    count: 2,
    unit: 'backend microservices.',
    statement: 'Resilient and bulletproof APIs.',
    description: 'Node.js, Python, and Go microservices orchestrating PCI-compliant payment gateways, ERP connectors, and secure data layers.',
    badge: 'API & Commerce Core'
  },
  cloud: {
    count: 2,
    unit: 'edge infrastructure.',
    statement: 'Worldwide instant delivery.',
    description: 'Edge CDN deployments, automated asset compression, and instant headless CMS revalidation for marketing teams.',
    badge: 'Cloud & DevOps Architecture'
  },
  marketing: {
    count: 2,
    unit: 'growth automations.',
    statement: 'Search engine domination.',
    description: 'W3C certified clean semantic HTML, dynamic Schema.org rich snippets, and automated XML sitemap feeds for guaranteed Google crawling.',
    badge: 'Technical SEO Engine'
  }
};

export function SignalWall({ onOpenFittingModal }: SignalWallProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const view = filterViews[activeFilter];

  const filteredSystems: TechNode[] = activeFilter === 'all'
    ? TECH_ECOSYSTEM_NODES
    : TECH_ECOSYSTEM_NODES.filter(s => s.category === activeFilter);

  return (
    <section id="solutions" className="relative py-20 sm:py-28 bg-[#181a20] text-white overflow-hidden">
      {/* Background cyber grid & glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE DIGITAL ENGINEERING ECOSYSTEM</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Cutting-Edge Tech Stack.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-400">
                Engineered for the Cyber Era.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 max-w-sm text-sm sm:text-base leading-relaxed">
            By connecting modern web frameworks, headless CMS platforms, and scalable cloud pipelines, Union Jack Studio builds digital products that dominate online.
          </p>
        </div>

        {/* Dynamic Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 w-fit mb-12 shadow-inner">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Pipelines
          </button>
          <button
            onClick={() => setActiveFilter('frontend')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeFilter === 'frontend'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            Frontend & Motion
          </button>
          <button
            onClick={() => setActiveFilter('backend')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeFilter === 'backend'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Backend & APIs
          </button>
          <button
            onClick={() => setActiveFilter('cloud')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeFilter === 'cloud'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cloud className="w-3.5 h-3.5" />
            Edge & Cloud
          </button>
          <button
            onClick={() => setActiveFilter('marketing')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeFilter === 'marketing'
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            SEO & Indexing
          </button>
        </div>

        {/* Central Stat Box & Connected Signals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Stat Callout */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950/90 p-8 rounded-3xl border border-slate-800/80 shadow-2xl relative">
            <div className="inline-block px-3 py-1 rounded-full bg-sky-500/15 text-sky-400 text-xs font-semibold uppercase tracking-wider mb-6">
              {view.badge}
            </div>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-6xl sm:text-7xl font-bold tracking-tight text-white font-mono">
                {view.count}
              </span>
              <span className="text-xl sm:text-2xl text-sky-400 font-medium">
                {view.unit}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
              {view.statement}
            </h3>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              {view.description}
            </p>

            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>W3C Validated Standard</span>
              </span>
              <button
                onClick={onOpenFittingModal}
                className="text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                Request Architecture Audit ↗
              </button>
            </div>
          </div>

          {/* Right Flowing Signal Matrix */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {filteredSystems.map((item, index) => (
              <div
                key={item.id}
                className="group p-4 sm:p-5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/70 hover:border-sky-500/50 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:shadow-sky-500/5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-sky-400 font-mono text-xs flex items-center justify-center font-semibold shrink-0 group-hover:bg-sky-500 group-hover:text-slate-950 transition-colors">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide group-hover:text-slate-300">
                      {item.from}
                    </div>
                    <div className="text-sm sm:text-base font-medium text-white group-hover:text-sky-300 transition-colors flex items-center gap-1.5">
                      <span>➔</span>
                      <span>{item.to}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-400 font-mono bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800 self-start sm:self-auto shrink-0">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
