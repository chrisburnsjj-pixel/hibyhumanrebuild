import React, { useState } from 'react';
import { Sparkles, ArrowUp, Send, CheckCircle2, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data';
import { useCMS } from '../context/CMSContext';
import { getActiveSocialLinks } from '../firebase/firestore';
import { SocialPlatformIcon } from './SocialPlatformIcon';
import { FooterWatermark } from './FooterWatermark';

interface FooterProps {
  onOpenFittingModal: (subject?: string) => void;
  onNavigateLegal?: (page: 'privacy' | 'terms') => void;
  onNavigateCaseStudies?: () => void;
  onNavigatePackages?: () => void;
  onNavigatePortfolio?: () => void;
  onNavigateAdmin?: () => void;
  onNavigateService?: (slug: string) => void;
  onNavigateCaseStudy?: (slug: string) => void;
  onOpenCareers?: () => void;
}

export function Footer({
  onOpenFittingModal,
  onNavigateLegal,
  onNavigateCaseStudies,
  onNavigatePackages,
  onNavigatePortfolio,
  onNavigateAdmin,
  onNavigateService,
  onNavigateCaseStudy,
  onOpenCareers,
}: FooterProps) {
  const { contact, footer } = useCMS();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const phone = contact?.phone || STUDIO_INFO.phone;
  const email = contact?.email || STUDIO_INFO.email;
  const location = contact?.address || STUDIO_INFO.location;
  const activeSocials = getActiveSocialLinks(contact);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setNewsletterEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const handleLegal = (e: React.MouseEvent, page: 'privacy' | 'terms') => {
    e.preventDefault();
    if (onNavigateLegal) {
      onNavigateLegal(page);
    } else {
      window.location.hash = page === 'privacy' ? '#privacy-policy' : '#terms-and-conditions';
    }
  };

  return (
    <footer className="relative bg-slate-950/60 backdrop-blur-md text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background glow (accentuates Section 6 Final CTA transition) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-t from-purple-600/15 via-blue-600/10 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Large Transparent HiByHuman Logo Watermark (Right-Aligned Background Parallax Element) */}
      <FooterWatermark />

      <div className="w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Identity (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center">
              <img
                src="/images/hibyhuman-logo-horizontal.svg"
                alt="HiByHuman"
                width={540}
                height={110}
                loading="lazy"
                decoding="async"
                className="h-14 sm:h-16 md:h-20 lg:h-20 w-auto object-contain drop-shadow-[0_0_24px_rgba(0,229,255,0.5)] transition-transform hover:scale-105 duration-300"
              />
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              A full-spectrum production department creating visual experiences for a brighter, more human tomorrow.
            </p>

            <div className="pt-2 text-xs font-mono text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">{email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#00C8FF] shrink-0" />
                <a href={`tel:${phone}`} className="hover:text-white transition-colors">{phone}</a>
              </div>
            </div>

            {/* Social Links from CMS */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">
                Studio Channels:
              </div>
              <div className="flex flex-wrap gap-2.5">
                {activeSocials.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit HiByHuman on ${social.label}`}
                    className="w-9 h-9 rounded-xl bg-[#0B1020] border border-white/10 hover:border-[#00C8FF]/50 hover:bg-white/5 flex items-center justify-center text-slate-300 hover:text-white transition-all shadow-sm"
                  >
                    <SocialPlatformIcon platform={social.platform} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#00C8FF] font-bold">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <a href="#hero" className="hover:text-[#00C8FF] transition-colors">Home</a>
              </li>
              <li>
                <a href="#work" className="hover:text-[#00C8FF] transition-colors">Our Work</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#00C8FF] transition-colors">Services</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#00C8FF] transition-colors">Process</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#00C8FF] transition-colors">About</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenCareers ? onOpenCareers() : onOpenFittingModal('Careers Inquiry')}
                  className="hover:text-[#00C8FF] transition-colors text-left font-normal"
                >
                  Careers <span className="text-[10px] font-mono text-[#00C8FF] bg-[#00C8FF]/10 px-1.5 py-0.5 rounded ml-1">Hiring</span>
                </button>
              </li>
              {onNavigateCaseStudies && (
                <li>
                  <button
                    type="button"
                    onClick={onNavigateCaseStudies}
                    className="hover:text-[#00C8FF] transition-colors text-left font-normal"
                  >
                    Case Studies
                  </button>
                </li>
              )}
              {onNavigatePackages && (
                <li>
                  <button
                    type="button"
                    onClick={onNavigatePackages}
                    className="hover:text-[#00C8FF] transition-colors text-left font-normal"
                  >
                    Pricing Packages
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Production Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#7A2CFF] font-bold">
              Production Services
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              {[
                { name: 'Video Production', slug: 'web-mobile-dev' },
                { name: 'Editing & Post-Production', slug: 'interactive-design' },
                { name: 'Motion Graphics & 3D', slug: 'motion-branding' },
                { name: 'Design & Visual Content', slug: 'illustrations-prototype' },
                { name: 'Content Strategy', slug: 'concept-strategy' },
                { name: 'Project Management', slug: 'digital-marketing' },
              ].map((service, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onNavigateService) {
                        onNavigateService(service.slug);
                      } else {
                        onOpenFittingModal(`Service Inquiry: ${service.name}`);
                      }
                    }}
                    className="hover:text-[#00C8FF] transition-colors text-left font-normal flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#00C8FF]" />
                    <span>{service.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Big Typography (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              GET THE LATEST UPDATES
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Curated breakdowns of cinematography techniques, 3D breakthroughs, and behind-the-scenes case studies.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0B1020] border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#00C8FF] transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-gradient-to-r from-[#00C8FF] to-[#7A2CFF] text-[#05070D] font-bold text-xs flex items-center justify-center hover:opacity-90 transition-opacity"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed to studio updates.</span>
                </div>
              )}
            </form>

            {/* Right-Side Master Brand Typography */}
            <div className="pt-4 border-t border-white/10 text-left font-display text-sm font-black tracking-widest text-slate-300 uppercase leading-snug select-none opacity-80">
              <div className="text-[#00C8FF]">PEOPLE</div>
              <div>IDEAS</div>
              <div className="text-[#7A2CFF]">TECHNOLOGY</div>
              <div>A BRIGHTER</div>
              <div className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C8FF] to-[#FF2BD6]">
                HUMAN FUTURE
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} HiByHuman. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={(e) => handleLegal(e, 'privacy')}
              className="hover:text-[#00C8FF] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={(e) => handleLegal(e, 'terms')}
              className="hover:text-[#00C8FF] transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            {onNavigateAdmin && (
              <button
                type="button"
                onClick={onNavigateAdmin}
                className="hover:text-[#00C8FF] transition-colors cursor-pointer text-slate-400 hover:text-cyan-300"
              >
                Studio CMS
              </button>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#0B1020] border border-white/10 hover:border-[#00C8FF] text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
