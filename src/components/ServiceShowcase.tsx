import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Layers, Smartphone, Search, Palette, ShoppingBag, Cpu } from 'lucide-react';

export interface ShowcaseService {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  deliverables: string[];
  imageUrl: string;
  icon: React.ReactNode;
}

const DEFAULT_SERVICES: ShowcaseService[] = [
  {
    id: 'web-design',
    name: 'Web Design & Next.js Systems',
    subtitle: 'Bespoke Digital Experiences',
    tagline: 'High-conversion design engineered with sub-second page performance',
    description:
      'We craft bespoke, responsive websites and full-stack web applications tailored to captivate your audience and convert visitors into loyal clients. Every build incorporates modern typography, micro-interactions, and accessibility standards.',
    deliverables: ['Custom UI/UX Prototypes', 'Next.js & React Full-Stack', 'Lighthouse 95+ Performance', 'Full CMS Integration'],
    imageUrl: '/images/hibyhuman-hero-banner.webp',
    icon: <Layers className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'mobile-apps',
    name: 'Mobile App Engineering',
    subtitle: 'iOS & Android Ecosystems',
    tagline: 'Native performance with cross-platform scalability',
    description:
      'From wireframe to App Store deployment, we build fluid mobile applications that feel intuitive and responsive on every handset. Secure APIs, push notifications, and offline-first data sync come standard.',
    deliverables: ['iOS & Android Production', 'React Native & Flutter', 'Secure Biometric Auth', 'Continuous App Store Delivery'],
    imageUrl: '/images/work-mockups/project-alora-brand.jpg',
    icon: <Smartphone className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'seo-growth',
    name: 'SEO & Search Authority',
    subtitle: 'Organic Visibility Engines',
    tagline: 'Dominate Google search results and drive high-intent qualified traffic',
    description:
      'Technical SEO architecture, Schema.org rich snippets, Core Web Vitals optimization, and keyword authority strategy that secure top rankings and generate predictable organic leads for your brand.',
    deliverables: ['Technical SEO Auditing', 'Schema.org Rich Snippets', 'Content Strategy & Keywords', 'Local & National SEO Growth'],
    imageUrl: '/images/work-mockups/project-lumina-crm.jpg',
    icon: <Search className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'branding',
    name: 'Brand Identity & Strategy',
    subtitle: 'Memorable Visual Systems',
    tagline: 'Distinctive brand personalities that stand out in crowded markets',
    description:
      'Complete brand positioning, visual style guides, typography pairings, color systems, and digital asset kits that project prestige, authority, and confidence across all touchpoints.',
    deliverables: ['Logo & Iconography Suites', 'Design Tokens & Style Guides', 'Social Media Asset Kits', 'Packaging & Print Materials'],
    imageUrl: '/images/work-mockups/project-solaris-fintech.jpg',
    icon: <Palette className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'ecommerce',
    name: 'Shopify & E-Commerce',
    subtitle: 'High-Velocity Storefronts',
    tagline: 'Frictionless checkout experiences built for maximum average order value',
    description:
      'Tailored Shopify and custom headless commerce systems engineered for rapid loading, seamless payment gateway integration, inventory synchronization, and streamlined cart experiences.',
    deliverables: ['Custom Shopify Liquid / Headless', 'Stripe & PayPal Integration', 'Cart & Checkout Optimization', 'Automated Inventory Sync'],
    imageUrl: '/images/work-mockups/project-alora-brand.jpg',
    icon: <ShoppingBag className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'ai-software',
    name: 'AI & Custom Software',
    subtitle: 'Intelligent Cloud Automation',
    tagline: 'Modern software tools that automate workflows and unlock scale',
    description:
      'Custom web portals, internal tools, customer dashboards, and AI-assisted workflows tailored specifically to eliminate operational friction and accelerate business scaling.',
    deliverables: ['Cloud Database Architecture', 'Role-Based Access Control', 'Automated API Pipelines', 'Custom Analytics Dashboards'],
    imageUrl: '/images/work-mockups/project-lumina-crm.jpg',
    icon: <Cpu className="w-5 h-5 text-cyan-400" />,
  },
];

interface ServiceShowcaseProps {
  services?: ShowcaseService[];
  onSelectService?: (service: ShowcaseService) => void;
  className?: string;
}

export function ServiceShowcase({
  services = DEFAULT_SERVICES,
  onSelectService,
  className = '',
}: ServiceShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll detection to update active service when scrolling down
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0.5],
    });

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [services]);

  const activeService = services[activeIndex] || services[0];

  return (
    <section
      id="services"
      className={`relative w-full py-16 sm:py-24 bg-[#030712] text-slate-100 ${className}`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold tracking-wider mb-3 shadow-[0_0_12px_rgba(34,211,238,0.25)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>INTERACTIVE SERVICE SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Disciplines Engineered for <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Digital Dominance</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl">
            Select or scroll through our core services to inspect deliverables, architecture capabilities, and production outcomes.
          </p>
        </div>

        {/* Two-Column Showcase Layout (Stacks on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Service Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={service.id}
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-index={index}
                  type="button"
                  onClick={() => {
                    setActiveIndex(index);
                    if (onSelectService) onSelectService(service);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border flex items-center justify-between group ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/50 to-slate-900/80 border-cyan-500/50 shadow-[0_0_24px_rgba(34,211,238,0.15)] ring-1 ring-cyan-500/30'
                      : 'bg-slate-950/40 hover:bg-slate-900/60 border-slate-800/80 hover:border-slate-700/80'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-xl border transition-colors duration-300 ${
                        isActive
                          ? 'bg-cyan-500/20 border-cyan-400/40'
                          : 'bg-slate-900 border-slate-800 group-hover:border-slate-700'
                      }`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <div className="text-xs font-mono text-cyan-400/80 font-semibold mb-0.5">
                        0{index + 1} // {service.subtitle}
                      </div>
                      <div
                        className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-slate-300 group-hover:text-white'
                        }`}
                      >
                        {service.name}
                      </div>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-all duration-300 ${
                      isActive
                        ? 'text-cyan-400 translate-x-1 opacity-100'
                        : 'text-slate-600 opacity-0 group-hover:opacity-100 group-hover:text-slate-400'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Sticky Display Card with Cross-Fade */}
          <div className="lg:col-span-7 lg:sticky lg:top-28">
            <div className="relative rounded-3xl overflow-hidden border border-slate-800/80 bg-slate-950/60 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              {/* Subtle background ambient light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

              {/* Cross-fading content container */}
              <div className="relative z-10">
                {/* Visual Image with Smooth Cross-Fade */}
                <div className="relative w-full h-56 sm:h-72 rounded-2xl overflow-hidden mb-6 border border-slate-800 bg-slate-900">
                  {services.map((service, idx) => (
                    <img
                      key={service.id}
                      src={service.imageUrl}
                      alt={service.name}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 will-change-transform ${
                        idx === activeIndex
                          ? 'opacity-100 scale-100 pointer-events-auto'
                          : 'opacity-0 scale-105 pointer-events-none'
                      }`}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>0{activeIndex + 1} / 0{services.length}</span>
                  </div>
                </div>

                {/* Text Content with Opacity & Transform Cross-Fade */}
                <div className="min-h-[220px]">
                  {services.map((service, idx) => {
                    const isVisible = idx === activeIndex;
                    return (
                      <div
                        key={service.id}
                        className={`transition-all duration-400 ease-out will-change-transform ${
                          isVisible
                            ? 'opacity-100 translate-y-0 relative'
                            : 'opacity-0 translate-y-2 absolute top-0 left-0 right-0 pointer-events-none'
                        }`}
                        aria-hidden={!isVisible}
                      >
                        <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2 font-bold">
                          {service.subtitle}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
                          {service.name}
                        </h3>
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                          {service.description}
                        </p>

                        <div className="border-t border-slate-800/80 pt-5">
                          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 font-semibold">
                            Core Deliverables
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {service.deliverables.map((item) => (
                              <div key={item} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServiceShowcase;
