import React from 'react';
import {
  Sparkles,
  Code2,
  Briefcase,
  MessageSquare,
  Users,
  MapPin,
  Menu,
  Layout,
  Image,
  Settings,
  ExternalLink,
  ArrowRight,
  Database,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';

interface AdminDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export function AdminDashboard({ onNavigateTab }: AdminDashboardProps) {
  const { hero, services, projects, testimonials, team, isLiveFromFirestore } = useCMS();

  const statCards = [
    {
      title: 'Active Services',
      count: services.filter((s) => s.isActive).length,
      total: services.length,
      icon: Code2,
      tab: 'services',
      color: 'from-cyan-500/20 to-cyan-500/5 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'Showcase Projects',
      count: projects.filter((p) => p.isActive).length,
      total: projects.length,
      icon: Briefcase,
      tab: 'portfolio',
      color: 'from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-400 border-fuchsia-500/30',
    },
    {
      title: 'Verified Reviews',
      count: testimonials.filter((t) => t.isActive).length,
      total: testimonials.length,
      icon: MessageSquare,
      tab: 'testimonials',
      color: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Team Members',
      count: team.filter((m) => m.isActive).length,
      total: team.length,
      icon: Users,
      tab: 'team',
      color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/30',
    },
  ];

  const quickLinks = [
    { label: 'Hero Headline & Offer', desc: 'Edit primary title and 50% off coupon', tab: 'hero', icon: Sparkles },
    { label: 'Studio Services Arc', desc: 'Manage bespoke offerings and categories', tab: 'services', icon: Code2 },
    { label: 'Portfolio Case Studies', desc: 'Update deliverables and tech tags', tab: 'portfolio', icon: Briefcase },
    { label: 'Testimonials & Reviews', desc: 'Manage client quotes and star ratings', tab: 'testimonials', icon: MessageSquare },
    { label: 'Coatbridge Studio & Contact', desc: 'Update phone, WhatsApp, and location', tab: 'contact', icon: MapPin },
    { label: 'Social Media Channels', desc: 'Manage Facebook, Instagram, TikTok, LinkedIn', tab: 'socials', icon: Share2 },
    { label: 'Header Navigation', desc: 'Reorder menu links and targets', tab: 'navigation', icon: Menu },
    { label: 'Footer & Legal Links', desc: 'Update copyright and quick links', tab: 'footer', icon: Layout },
    { label: 'Media Assets', desc: 'Upload images to Firebase Storage', tab: 'media', icon: Image },
    { label: 'System & Seeding', desc: 'Sync Firestore database and inspect logs', tab: 'settings', icon: Settings },
  ];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-fuchsia-950/40 border border-slate-800 p-6 sm:p-8">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HiByHuman Content Management System</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Studio Content Administration
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Welcome to the bespoke HiByHuman Admin Suite. Any modifications saved here immediately synchronize with your live cloud Firestore database and appear in real time across the public studio website.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              type="button"
              onClick={() => onNavigateTab('settings')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition cursor-pointer"
            >
              <Database className="w-3.5 h-3.5 text-cyan-400" />
              <span>Database Sync</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              onClick={() => onNavigateTab(card.tab)}
              className={`p-5 rounded-2xl bg-gradient-to-br ${card.color} border transition hover:scale-[1.02] cursor-pointer flex flex-col justify-between gap-3`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">{card.title}</span>
                <Icon className="w-4 h-4 opacity-80" />
              </div>
              <div>
                <div className="text-3xl font-black text-white font-mono">{card.count}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {card.count} active of {card.total} total
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Section Quick Links Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white uppercase tracking-wider text-slate-300">
            Content Modules & Editors
          </h2>
          <span className="text-xs text-slate-500 font-mono">10 Available Sections</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.tab}
                type="button"
                onClick={() => onNavigateTab(link.tab)}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 hover:bg-slate-800/60 transition group text-left flex items-start gap-4 cursor-pointer"
              >
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                      {link.label}
                    </h3>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{link.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Preview Summary */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Current Live Hero Headline
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-300">
            Live
          </span>
        </div>
        <p className="text-base font-black text-white">{hero.heading}</p>
        <p className="text-xs text-slate-400 line-clamp-2">{hero.description}</p>
      </div>
    </div>
  );
}
