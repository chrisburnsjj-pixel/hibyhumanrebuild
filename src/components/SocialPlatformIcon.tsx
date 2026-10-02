import React from 'react';
import {
  Facebook,
  Instagram,
  Linkedin,
  Music2,
  Twitter,
  Youtube,
  Github,
  Share2,
  Globe,
} from 'lucide-react';
import { SocialPlatform } from '../types/cms';

interface SocialPlatformIconProps {
  platform: SocialPlatform;
  className?: string;
}

export function SocialPlatformIcon({ platform, className = 'w-4 h-4' }: SocialPlatformIconProps) {
  switch (platform) {
    case 'facebook':
      return <Facebook className={className} aria-label="Facebook" />;
    case 'instagram':
      return <Instagram className={className} aria-label="Instagram" />;
    case 'linkedin':
      return <Linkedin className={className} aria-label="LinkedIn" />;
    case 'tiktok':
      return <Music2 className={className} aria-label="TikTok" />;
    case 'twitter':
      return <Twitter className={className} aria-label="Twitter / X" />;
    case 'youtube':
      return <Youtube className={className} aria-label="YouTube" />;
    case 'github':
      return <Github className={className} aria-label="GitHub" />;
    case 'threads':
      return <Share2 className={className} aria-label="Threads" />;
    case 'custom':
    default:
      return <Globe className={className} aria-label="Social Link" />;
  }
}

export function getPlatformColorClass(platform: SocialPlatform): {
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  hoverGlow: string;
  hoverText: string;
} {
  switch (platform) {
    case 'facebook':
      return {
        badgeBg: 'bg-blue-950/60',
        badgeBorder: 'border-blue-700/50',
        badgeText: 'text-blue-400',
        hoverGlow: 'hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.35)]',
        hoverText: 'group-hover:text-blue-400',
      };
    case 'instagram':
      return {
        badgeBg: 'bg-fuchsia-950/60',
        badgeBorder: 'border-fuchsia-700/50',
        badgeText: 'text-fuchsia-400',
        hoverGlow: 'hover:border-fuchsia-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.35)]',
        hoverText: 'group-hover:text-fuchsia-400',
      };
    case 'tiktok':
      return {
        badgeBg: 'bg-cyan-950/60',
        badgeBorder: 'border-cyan-700/50',
        badgeText: 'text-cyan-300',
        hoverGlow: 'hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(0,212,255,0.35)]',
        hoverText: 'group-hover:text-cyan-300',
      };
    case 'linkedin':
      return {
        badgeBg: 'bg-sky-950/60',
        badgeBorder: 'border-sky-700/50',
        badgeText: 'text-sky-400',
        hoverGlow: 'hover:border-sky-500 hover:shadow-[0_0_15px_rgba(14,165,233,0.35)]',
        hoverText: 'group-hover:text-sky-400',
      };
    case 'youtube':
      return {
        badgeBg: 'bg-rose-950/60',
        badgeBorder: 'border-rose-700/50',
        badgeText: 'text-rose-400',
        hoverGlow: 'hover:border-rose-500 hover:shadow-[0_0_15px_rgba(244,63,94,0.35)]',
        hoverText: 'group-hover:text-rose-400',
      };
    case 'twitter':
      return {
        badgeBg: 'bg-slate-900',
        badgeBorder: 'border-sky-500/40',
        badgeText: 'text-sky-300',
        hoverGlow: 'hover:border-sky-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]',
        hoverText: 'group-hover:text-sky-300',
      };
    case 'github':
      return {
        badgeBg: 'bg-slate-900',
        badgeBorder: 'border-slate-700',
        badgeText: 'text-slate-200',
        hoverGlow: 'hover:border-slate-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]',
        hoverText: 'group-hover:text-white',
      };
    default:
      return {
        badgeBg: 'bg-slate-900',
        badgeBorder: 'border-slate-800',
        badgeText: 'text-cyan-400',
        hoverGlow: 'hover:border-cyan-500 hover:shadow-[0_0_15px_rgba(0,212,255,0.25)]',
        hoverText: 'group-hover:text-cyan-300',
      };
  }
}
