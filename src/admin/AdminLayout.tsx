import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sparkles,
  Code2,
  Briefcase,
  MessageSquare,
  Users,
  MapPin,
  Menu as MenuIcon,
  Layout,
  Image,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  X,
  Share2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { HeroEditor } from './sections/HeroEditor';
import { AboutEditor } from './sections/AboutEditor';
import { ServicesEditor } from './sections/ServicesEditor';
import { PortfolioEditor } from './sections/PortfolioEditor';
import { TestimonialsEditor } from './sections/TestimonialsEditor';
import { TeamEditor } from './sections/TeamEditor';
import { ContactEditor } from './sections/ContactEditor';
import { SocialsEditor } from './sections/SocialsEditor';
import { NavigationEditor } from './sections/NavigationEditor';
import { FooterEditor } from './sections/FooterEditor';
import { MediaEditor } from './sections/MediaEditor';
import { SettingsEditor } from './sections/SettingsEditor';

interface AdminLayoutProps {
  onBackToSite: () => void;
}

export function AdminLayout({ onBackToSite }: AdminLayoutProps) {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'hero', label: 'Hero Section', icon: Sparkles },
    { id: 'about', label: 'About & Story', icon: Sparkles },
    { id: 'services', label: 'Services Arc', icon: Code2 },
    { id: 'portfolio', label: 'Portfolio Works', icon: Briefcase },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'team', label: 'Studio Team', icon: Users },
    { id: 'contact', label: 'Contact & Address', icon: MapPin },
    { id: 'socials', label: 'Social Media', icon: Share2 },
    { id: 'navigation', label: 'Navigation Menu', icon: MenuIcon },
    { id: 'footer', label: 'Footer & Links', icon: Layout },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'settings', label: 'System & Database', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'services':
        return <ServicesEditor />;
      case 'portfolio':
        return <PortfolioEditor />;
      case 'testimonials':
        return <TestimonialsEditor />;
      case 'team':
        return <TeamEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'socials':
        return <SocialsEditor />;
      case 'navigation':
        return <NavigationEditor />;
      case 'footer':
        return <FooterEditor />;
      case 'media':
        return <MediaEditor />;
      case 'settings':
        return <SettingsEditor />;
      default:
        return <AdminDashboard onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center font-bold text-xs">
            H
          </div>
          <span className="text-sm font-black text-white">HiByHuman CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-30 w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-200 ease-in-out ${
          isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Brand Header */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-fuchsia-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-cyan-500/20">
                H
              </div>
              <div>
                <h2 className="text-xs font-black text-white tracking-wider uppercase">
                  HiByHuman
                </h2>
                <p className="text-[10px] text-cyan-400 font-mono">Admin Suite v2.0</p>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-slate-500">
              Content Sections
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleTabClick(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-fuchsia-500/10 text-white border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* User Account & Actions Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950/50 space-y-2">
            <div className="flex items-center gap-2.5 px-2 py-1">
              <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 font-bold text-xs shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">
                  {user?.email?.split('@')[0] || 'Administrator'}
                </p>
                <p className="text-[10px] text-slate-500 truncate font-mono">{user?.email}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-1">
              <button
                type="button"
                onClick={onBackToSite}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                <span>Return to Public Site</span>
              </button>
              <button
                type="button"
                onClick={() => logout()}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 overflow-y-auto">
        {/* Desktop Topbar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800/80 sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">HiByHuman CMS</span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-white uppercase tracking-wide">
              {navItems.find((n) => n.id === activeTab)?.label || 'Dashboard'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
            >
              <span>View Website</span>
              <ExternalLink className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">{renderContent()}</div>
      </main>
    </div>
  );
}
