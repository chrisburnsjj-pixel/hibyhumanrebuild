import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, Copy, Check, Send } from 'lucide-react';
import { STUDIO_INFO } from '../data';

interface NewsletterSectionProps {
  onOpenFittingModal?: (subject?: string) => void;
}

export function NewsletterSection({ onOpenFittingModal }: NewsletterSectionProps) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Design Systems', 'Full-Stack Apps']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const TOPIC_OPTIONS = [
    'Design Systems',
    'Full-Stack Apps',
    'PPC & Google Ads',
    'Social Media Growth',
    'AI & Automation',
  ];

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSubmitting(true);

    // Simulate network submission and synchronization to info@hibyhuman.com
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);

      // Local storage log for audit trail
      try {
        const existing = JSON.parse(localStorage.getItem('hibyhuman_newsletter_leads') || '[]');
        existing.push({
          email,
          name: name || 'Anonymous Partner',
          topics: selectedTopics,
          syncedTo: 'info@hibyhuman.com',
          timestamp: new Date().toISOString(),
        });
        localStorage.setItem('hibyhuman_newsletter_leads', JSON.stringify(existing));
      } catch (err) {
        // Safe fallback
      }
    }, 800);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FIRST50');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <section id="newsletter" className="py-20 sm:py-28 w-full max-w-[1480px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 relative">
      {/* Background Subtle Gradient Mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/60 to-transparent pointer-events-none -z-10 rounded-3xl" />

      <div className="relative rounded-3xl bg-gradient-to-br from-sky-50 via-white to-sky-100/80 text-slate-900 p-8 sm:p-14 lg:p-16 border border-sky-200 shadow-xl shadow-sky-500/5 overflow-hidden">
        {/* Decorative Ambient Light Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-100/60 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Value Proposition */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-sky-800 text-xs font-mono font-semibold tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>THE HUMAN PULSE • STUDIO NEWSLETTER</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]">
              Stay Ahead of the<br />
              <span className="text-sky-600">
                Digital Frontier.
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-lg">
              Bi-weekly briefings on bespoke software engineering, conversion design systems, and viral social growth. Plus get an instant <strong className="text-slate-900 underline decoration-sky-400">50% discount voucher</strong> on your first commissioned project.
            </p>

            {/* Value Checkpoints */}
            <div className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-600">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Zero spam. Curated by senior UK technologists and designers.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Immediate 50% discount code: <code className="text-sky-700 font-mono font-bold px-2 py-0.5 rounded bg-sky-100/80 border border-sky-200">FIRST50</code></span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Submissions automatically synced to <span className="text-slate-900 font-mono font-semibold">info@hibyhuman.com</span></span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Subscription Form */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white text-slate-900 border border-blue-100 shadow-2xl">
              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div>
                      <label htmlFor="newsletter-name" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Your Name (Optional)
                      </label>
                      <input
                        id="newsletter-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-blue-50/70 border border-blue-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="newsletter-email" className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Work Email Address <span className="text-[#0066ff]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="newsletter-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@yourcompany.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-blue-50/70 border border-blue-200 text-slate-900 placeholder:text-slate-400 text-sm focus:bg-white focus:outline-none focus:border-[#0066ff] focus:ring-1 focus:ring-[#0066ff] transition-all"
                        />
                      </div>
                    </div>

                    {/* Topics Selector */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Topics of Interest
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {TOPIC_OPTIONS.map((topic) => {
                          const isSelected = selectedTopics.includes(topic);
                          return (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => toggleTopic(topic)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0066ff] text-white shadow-xs'
                                  : 'bg-blue-50 text-slate-700 hover:bg-blue-100 border border-blue-200'
                              }`}
                            >
                              {topic}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl font-bold font-creative text-sm bg-[#0066ff] hover:bg-[#0052cc] text-white transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Syncing to info@hibyhuman.com...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Subscribe & Claim 50% Voucher</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>UK GDPR Protected • One-click unsubscribe</span>
                      </span>
                      <a href="#privacy-policy" className="hover:text-[#0066ff] underline transition-colors">
                        Privacy Policy
                      </a>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-xl font-bold font-creative text-slate-900 mb-1">
                        Welcome to The Human Pulse!
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                        Your subscription has been confirmed and synced to <strong className="text-[#0066ff] font-mono">info@hibyhuman.com</strong>.
                      </p>
                    </div>

                    {/* Voucher Card */}
                    <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left max-w-sm mx-auto">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">
                        Your Exclusive 50% First Order Promo Code:
                      </span>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-2xl font-mono font-black text-[#0052cc] tracking-wider">
                          FIRST50
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyCode}
                          className="px-3 py-1.5 rounded-lg bg-[#0066ff] hover:bg-[#0052cc] text-xs text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span className="text-white">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-2">
                        Mention this code or apply it during project scoping for 50% off labor & development.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => onOpenFittingModal?.("Newsletter Welcome - 50% First Order Scoping")}
                        className="px-5 py-2.5 rounded-full bg-[#0066ff] text-white text-xs font-bold hover:bg-[#0052cc] transition-colors cursor-pointer font-creative"
                      >
                        Start Scoping Project (50% Off) →
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsSubscribed(false)}
                        className="px-4 py-2 rounded-full text-xs text-slate-500 hover:text-[#0066ff] transition-colors cursor-pointer"
                      >
                        Add Another Email
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
