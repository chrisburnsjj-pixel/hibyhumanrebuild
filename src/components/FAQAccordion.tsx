import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  PhoneCall,
  MessageSquare,
  ShieldCheck,
  Search,
} from 'lucide-react';
import { STUDIO_INFO } from '../data';

export interface FAQItem {
  id: string;
  category: 'All' | 'Services & Delivery' | 'Pricing & Guarantee' | 'Tech & Ownership' | 'SEO & Growth';
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Services & Delivery',
    question: 'What makes HiByHuman different from standard digital agencies?',
    answer:
      'HiByHuman operates as an elite design and engineering collective based in Scotland. Rather than relying on rigid templates or bloated agency bureaucracy, every system is custom-engineered to your exact commercial goals. We blend precision typography, reactive motion design, and high-performance full-stack architectures backed by direct founder-led oversight.',
  },
  {
    id: 'faq-2',
    category: 'Pricing & Guarantee',
    question: 'How does your 100% Satisfaction & Money-Back Guarantee work?',
    answer:
      'We stand firmly behind the excellence of our craft. If you are not completely satisfied with the initial design directions and conceptual prototypes presented by our team during the first milestone, you are entitled to a full 100% money-back refund with zero hassle. We take on the commercial risk so you can commission with confidence.',
  },
  {
    id: 'faq-3',
    category: 'Tech & Ownership',
    question: 'Do we retain full commercial ownership and raw source code upon completion?',
    answer:
      'Yes, 100%. Unlike agencies that lock clients into proprietary systems or monthly licensing traps, upon project sign-off all intellectual property, Figma design files, source code repositories, vector brand assets, and hosting credentials are completely transferred to you with full unrestricted commercial ownership.',
  },
  {
    id: 'faq-4',
    category: 'Services & Delivery',
    question: 'What is your standard turnaround timeline for web and mobile projects?',
    answer:
      'We deploy projects in focused, high-velocity agile sprints. Brand identities and visual prototypes are typically delivered within 48 to 72 hours. Bespoke business websites launch within 1 to 2 weeks, and comprehensive custom web portals or cross-platform mobile apps deploy within 3 to 6 weeks with continuous staging demos.',
  },
  {
    id: 'faq-5',
    category: 'Tech & Ownership',
    question: 'Which modern frameworks, platforms, and databases do you build on?',
    answer:
      'Our primary production stack is centered around React 19, Next.js, TypeScript, Tailwind CSS, Node.js, Express, Python, and PostgreSQL/Firebase for cloud persistence. For commerce and CMS applications, we specialize in high-conversion Shopify Plus storefronts, headless WooCommerce, Sanity, Strapi, and custom administrative portals.',
  },
  {
    id: 'faq-6',
    category: 'SEO & Growth',
    question: 'How quickly can we expect measurable organic SEO and search rankings?',
    answer:
      'Our SEO engineering follows strict Google white-hat standards: sub-second Core Web Vitals, JSON-LD schema graphs, server-side rendering, and authoritative entity architecture. Clients consistently see first-page keyword traction within 30 to 60 days, tracked in real-time through transparent analytics dashboards.',
  },
  {
    id: 'faq-7',
    category: 'Services & Delivery',
    question: 'Do you provide ongoing support, security updates, and SLA maintenance?',
    answer:
      'Yes. Every custom build includes 30 days of complimentary post-launch warranty and hypercare. We also offer dedicated monthly retainer partnerships covering continuous feature deployments, uptime monitoring, security patching, A/B conversion testing, and technical support.',
  },
  {
    id: 'faq-8',
    category: 'Pricing & Guarantee',
    question: 'Do you work under mutual Non-Disclosure Agreements (NDAs)?',
    answer:
      'Absolutely. We routinely sign bilateral NDAs before reviewing sensitive business requirements, proprietary software architectures, or unreleased product concepts. Confidentiality is standard practice for all client engagements.',
  },
];

const CATEGORIES = [
  'All',
  'Services & Delivery',
  'Pricing & Guarantee',
  'Tech & Ownership',
  'SEO & Growth',
] as const;

interface FAQAccordionProps {
  onOpenFittingModal?: () => void;
  className?: string;
}

export function FAQAccordion({ onOpenFittingModal, className = '' }: FAQAccordionProps) {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const headingId = useId();

  const filteredItems = FAQ_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className={`relative w-full py-20 sm:py-28 bg-[#030712] text-slate-100 border-t border-slate-800/80 overflow-hidden ${className}`}
      aria-labelledby={headingId}
    >
      {/* Ambient background glow accents */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/10 to-violet-600/10 rounded-full blur-[120px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 md:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold tracking-wider mb-4 shadow-[0_0_16px_rgba(34,211,238,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRANSPARENCY & ASSURANCE</span>
          </div>

          <h2
            id={headingId}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
              Questions
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Clear answers regarding our bespoke engineering workflow, 100% intellectual property
            transfer, turnaround speeds, and risk-free satisfaction guarantee.
          </p>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(34,211,238,0.25)]'
                      : 'bg-slate-900/60 text-slate-400 border border-slate-800/80 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-900/80 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/60 focus:ring-1 focus:ring-cyan-500/40 transition-colors"
            />
          </div>
        </div>

        {/* FAQ Accordion List with Framer Motion Smooth Transitions */}
        <div className="space-y-3.5">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-xl bg-slate-900/40 border border-slate-800/80 text-slate-400">
              <HelpCircle className="w-8 h-8 mx-auto text-slate-600 mb-2" />
              <p className="text-sm">No matching questions found for "{searchQuery}".</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-3 text-xs text-cyan-400 hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isOpen = openId === item.id;
              const contentId = `faq-content-${item.id}`;
              const headerId = `faq-header-${item.id}`;

              return (
                <div
                  key={item.id}
                  className={`group rounded-xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900/90 border-cyan-500/50 shadow-[0_4px_24px_rgba(34,211,238,0.08)]'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700/90 hover:bg-slate-900/70'
                  }`}
                >
                  {/* Question Header Button */}
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/90 text-cyan-300 border border-cyan-500/20 shrink-0 mt-0.5 sm:mt-0">
                        {item.category}
                      </span>
                      <span className="text-sm sm:text-base font-semibold text-white group-hover:text-cyan-200 transition-colors">
                        {item.question}
                      </span>
                    </div>

                    {/* Animated Chevron Icon */}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-200 ${
                        isOpen
                          ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                          : 'bg-slate-800/80 text-slate-400 border-slate-700/60 group-hover:text-slate-200'
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expandable Answer with Framer Motion AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25, ease: 'easeOut' },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-sm leading-relaxed border-t border-slate-800/60">
                          <p>{item.answer}</p>

                          <div className="mt-4 pt-3 border-t border-slate-800/40 flex items-center gap-2 text-xs text-slate-400 font-mono">
                            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <span>Verified HiByHuman Engineering Standard</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Support & Direct Consultation Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-900/90 border border-slate-800/90 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_20px_rgba(34,211,238,0.15)]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Have a bespoke project specification or private RFP?
              </h4>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Speak directly with our technical director or schedule a confidential briefing call.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`tel:${STUDIO_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 bg-slate-800/60 hover:bg-slate-750 text-slate-200 transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400" />
              <span>{STUDIO_INFO.phone}</span>
            </a>

            {onOpenFittingModal && (
              <button
                type="button"
                onClick={onOpenFittingModal}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.3)] cursor-pointer"
              >
                Schedule Consultation ↗
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQAccordion;
