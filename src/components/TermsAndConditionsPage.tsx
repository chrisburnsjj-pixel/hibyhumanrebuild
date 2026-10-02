import React, { useEffect } from 'react';
import { ArrowLeft, Scale, CheckCircle2, ShieldCheck, Percent, Mail, Phone, MapPin, Printer } from 'lucide-react';
import { STUDIO_INFO } from '../data';
import { HiByHumanLogo } from './Logo';

interface TermsAndConditionsPageProps {
  onBack: () => void;
}

export function TermsAndConditionsPage({ onBack }: TermsAndConditionsPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Terms & Conditions | HiByHuman ✳ Commercial & Guarantee Agreement';
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-cyan-400 selection:text-slate-950 pb-20">
      {/* Sticky Header Nav */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-6 sm:px-10 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors bg-cyan-950/60 border border-cyan-800/60 px-3.5 py-1.5 rounded-full cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Studio</span>
        </button>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handlePrint}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Document</span>
          </button>
          <div className="h-6 w-[1px] bg-slate-800 hidden sm:block" />
          <HiByHumanLogo size="sm" theme="dark" animated={true} brandName="HiByHuman" />
        </div>
      </header>

      {/* Main Document Content */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 pt-12">
        {/* Document Header Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold mb-4">
          <Scale className="w-3.5 h-3.5 text-cyan-400" />
          <span>SCOTTISH & UK COMMERCIAL LAW STANDARD</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
          Terms & Conditions of Service
        </h1>
        <p className="text-slate-400 text-sm font-mono mb-8">
          Effective Date: September 2026 • Commercial Terms Version 3.1 • Jurisdiction: Scotland, UK
        </p>

        {/* Guarantees Highlight Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 mb-12 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-xl shadow-cyan-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-0.5">100% Satisfaction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Design phase full refund guarantee before code staging sign-off.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-950 border border-blue-500/40 text-cyan-300 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-0.5">100% IP Transfer</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Complete source code, Figma assets & copyright transfer upon settlement.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-fuchsia-950 border border-fuchsia-500/40 text-fuchsia-300 shrink-0">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-xs uppercase tracking-wider text-white mb-0.5">50% First Order</h3>
              <p className="text-xs text-slate-400 leading-relaxed">Single-use introductory discount applied to your initial invoice.</p>
            </div>
          </div>
        </div>

        {/* Legal Clauses */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          {/* Clause 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">01.</span>
              <span>Introduction & Agreement Formation</span>
            </h2>
            <p className="mb-3 text-slate-300">
              These Terms & Conditions constitute a legally binding contract between <strong className="text-white">HiByHuman Creative & Tech Studio</strong> ("HiByHuman", "the Studio", "we", "us") and the commissioning client ("Client", "you").
            </p>
            <p className="text-slate-400">
              By commissioning a project, accepting a Scope of Work (SOW), issuing a purchase order, or submitting a project brief to <strong className="text-cyan-300 font-mono">info@hibyhuman.com</strong>, you explicitly agree to be bound by these terms.
            </p>
          </section>

          {/* Clause 2 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">02.</span>
              <span>50% First Order Promotional Discount</span>
            </h2>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-sm text-slate-300">
              <p><strong className="text-white">Eligibility:</strong> The 50% discount promotion (redeemable with coupon code <code className="bg-cyan-950 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded font-bold font-mono">FIRST50</code>) applies exclusively to a client’s first commissioned project, service package, or agile sprint.</p>
              <p><strong className="text-white">Scope:</strong> The discount is deducted directly from the standard catalogue price displayed on our packages deck. It applies to labor, custom design, and full-stack software development.</p>
              <p><strong className="text-white">Exclusions:</strong> Third-party hard costs—such as domain registration, paid cloud hosting tiers, paid API usage (e.g. OpenAI/Google GenAI tokens), or paid ad spend budgets—are billed at direct cost and are not subject to the 50% promotional reduction.</p>
            </div>
          </section>

          {/* Clause 3 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">03.</span>
              <span>100% Satisfaction & Money-Back Guarantee</span>
            </h2>
            <p className="mb-3 text-slate-300">
              We stand firmly behind our bespoke creative engineering. We guarantee 100% original, tailor-made solutions created with zero generic templates.
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-300 pl-2">
              <li><strong className="text-white">Design Phase Refund Right:</strong> If, after receiving the initial design concept presentation and revision round, you are not genuinely satisfied with the creative direction, you may request a 100% full refund of any deposit paid prior to approving software staging deployment.</li>
              <li><strong className="text-white">Post-Approval:</strong> Once the visual design concepts are formally approved and custom code engineering begins on live staging environments, work is delivered according to agreed agile sprint milestones.</li>
            </ul>
          </section>

          {/* Clause 4 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">04.</span>
              <span>Intellectual Property & Source Code Ownership</span>
            </h2>
            <p className="mb-3 text-slate-300">
              Unlike agencies that trap clients in proprietary walled gardens, HiByHuman believes in true client independence:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-300 pl-2">
              <li><strong className="text-white">100% Commercial Ownership:</strong> Upon settlement of the final milestone invoice, all bespoke design assets (Figma, AI, SVG, PNG), brand marks, and custom written source code repositories (HTML/CSS, React, TypeScript, PHP, Python, etc.) become 100% your intellectual property.</li>
              <li><strong className="text-white">Open-Source Frameworks:</strong> Code utilizing standard open-source libraries (e.g. React, Next.js, Tailwind CSS) remains licensed under their respective open-source licenses (MIT, Apache 2.0).</li>
              <li><strong className="text-white">Portfolio Display:</strong> Unless an explicit white-label Non-Disclosure Agreement (NDA) is executed prior to kickoff, HiByHuman reserves the customary right to showcase delivered visual work in our public case studies and design portfolio.</li>
            </ul>
          </section>

          {/* Clause 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">05.</span>
              <span>Payment Terms & Milestone Invoicing</span>
            </h2>
            <p className="mb-3 text-slate-300">
              Standard commercial payment schedules are structured around transparent project milestones:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="font-bold text-white text-sm mb-1">Fixed-Scope Projects</p>
                <p className="text-xs text-slate-400">Typically 50% project mobilization deposit, with remaining 50% due upon final staging sign-off and domain deployment.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <p className="font-bold text-white text-sm mb-1">Monthly Care & Growth Retainers</p>
                <p className="text-xs text-slate-400">SEO, PPC, and digital marketing retainers are billed monthly in advance with a standard 30-day rolling cancellation notice.</p>
              </div>
            </div>
          </section>

          {/* Clause 6 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">06.</span>
              <span>Post-Launch 30-Day Warranty & Support</span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              Every web or mobile application built by HiByHuman includes a complimentary 30-day post-launch warranty period. During this period, any technical defects, bugs, or browser rendering discrepancies from the signed specification are rectified immediately at zero additional charge.
            </p>
          </section>

          {/* Clause 7 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">07.</span>
              <span>Governing Law & Legal Jurisdiction</span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              These terms and any dispute or claim arising out of or in connection with them (including non-contractual disputes) shall be governed by and construed in accordance with the laws of Scotland and the United Kingdom. The Scottish Courts shall have exclusive jurisdiction.
            </p>
          </section>
        </div>

        {/* Back to Home CTA Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black text-sm transition-all shadow-[0_0_15px_rgba(0,212,255,0.4)] cursor-pointer"
          >
            ← Return to HiByHuman Studio Home
          </button>
          <div className="text-xs text-slate-400 font-mono">
            HiByHuman • Inquiries: info@hibyhuman.com • +44 7532 835055
          </div>
        </div>
      </main>
    </div>
  );
}
