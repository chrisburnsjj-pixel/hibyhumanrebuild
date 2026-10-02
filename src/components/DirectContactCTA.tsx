import React from 'react';
import { Phone, PhoneCall } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { STUDIO_INFO } from '../data';
import { useCMS } from '../context/CMSContext';

interface DirectContactCTAProps {
  variant?: 'navbar' | 'hero' | 'compact' | 'footer' | 'pill';
  className?: string;
}

export function DirectContactCTA({ variant = 'compact', className = '' }: DirectContactCTAProps) {
  const { contact } = useCMS();
  const phone = contact?.phone || STUDIO_INFO.phone;
  const phoneRaw = phone.replace(/[^0-9+]/g, '');
  const telHref = `tel:${phoneRaw}`;
  const whatsappHref = contact?.whatsapp || STUDIO_INFO.whatsappUrl;

  if (variant === 'navbar') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={telHref}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-cyan-300 text-xs font-semibold font-mono transition-all duration-200 border border-cyan-500/30 hover:border-cyan-400/60 hover:scale-105 shadow-[0_0_10px_rgba(0,212,255,0.15)]"
          title="Call HiByHuman Studio"
        >
          <Phone className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden xl:inline">{phone}</span>
          <span className="xl:hidden">Call</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-xs transition-all duration-200 shadow-[0_0_15px_rgba(37,211,102,0.35)] hover:scale-105"
          title="Chat with HiByHuman on WhatsApp"
        >
          <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
          <span className="hidden lg:inline font-bold">WhatsApp</span>
        </a>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-wrap items-center gap-3 ${className}`}>
        <a
          href={telHref}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-400/50 backdrop-blur-md text-xs sm:text-sm font-semibold transition-all duration-200 shadow-lg hover:scale-105"
        >
          <PhoneCall className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span>Call: {phone}</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs sm:text-sm font-black transition-all duration-200 shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:scale-105"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-3 pt-2 ${className}`}>
        <a
          href={telHref}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-500/40 text-xs font-semibold font-mono transition-all"
        >
          <Phone className="w-4 h-4 text-cyan-400" />
          <span>Call {phone}</span>
        </a>

        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-black transition-all shadow-[0_0_15px_rgba(37,211,102,0.3)]"
        >
          <WhatsAppIcon className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>
    );
  }

  // Compact default
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={telHref}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 text-xs font-medium font-mono border border-slate-800 hover:border-cyan-500/30 transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-cyan-400" />
        <span>{phone}</span>
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs font-bold transition-colors shadow-[0_0_10px_rgba(37,211,102,0.25)]"
      >
        <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
        <span>WhatsApp</span>
      </a>
    </div>
  );
}
