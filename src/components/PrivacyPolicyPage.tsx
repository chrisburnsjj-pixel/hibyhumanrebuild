import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, MapPin, Mail, Phone, Printer } from 'lucide-react';
import { STUDIO_INFO } from '../data';
import { HiByHumanLogo } from './Logo';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy | HiByHuman ✳ UK GDPR & Data Protection';
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
          <Shield className="w-3.5 h-3.5 text-cyan-400" />
          <span>UK GDPR & DATA PROTECTION ACT 2018 COMPLIANT</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
          Privacy Policy & Data Protection
        </h1>
        <p className="text-slate-400 text-sm font-mono mb-8">
          Effective Date: September 2026 • Last Reviewed: Q3 2026 • Version 2.4
        </p>

        {/* Quick Summary Card */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 mb-12 flex flex-col sm:flex-row gap-6 items-start shadow-xl shadow-cyan-950/20">
          <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-400 shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white mb-1">Our Privacy Commitment</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              At HiByHuman, we believe client privacy and intellectual property confidentiality are paramount. We process all personal and commercial data strictly in compliance with the United Kingdom General Data Protection Regulation (UK GDPR) and Data Protection Act 2018. We never sell, rent, or trade your personal data.
            </p>
          </div>
        </div>

        {/* Legal Sections */}
        <div className="space-y-10 text-slate-300 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">01.</span>
              <span>Data Controller Identity</span>
            </h2>
            <p className="mb-3 text-slate-300">
              The data controller responsible for your personal data under UK data protection law is:
            </p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-mono text-xs sm:text-sm text-slate-200">
              <p className="font-bold text-white">HiByHuman Creative & Tech Studio</p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Headquarters: {STUDIO_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>Data Protection Email: <a href="mailto:info@hibyhuman.com" className="text-cyan-400 underline">{STUDIO_INFO.email}</a></span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>Hotline: <a href="tel:+447532835055" className="text-cyan-400">{STUDIO_INFO.phone}</a></span>
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">02.</span>
              <span>Information We Collect</span>
            </h2>
            <p className="mb-3 text-slate-300">We collect and process personal data when you interact with our website or commission studio services:</p>
            <ul className="space-y-2 list-disc list-inside text-slate-300 pl-2">
              <li><strong className="text-white">Project Scoping & Contact Inquiries:</strong> Full name, company or business name, work email address, telephone number, estimated budget tier, and technical project specifications.</li>
              <li><strong className="text-white">Newsletter Subscription:</strong> Email address and content topic preferences (Design, Engineering, Social Media, Growth).</li>
              <li><strong className="text-white">Commercial & Financial Records:</strong> Billing address, VAT numbers, invoice transmission records, and banking payment authorizations (card numbers are processed securely by PCI-DSS compliant gateways like Stripe and are never stored on our servers).</li>
              <li><strong className="text-white">Technical Device Data:</strong> Anonymized IP address, browser type, referral URL, operating system, and session performance metrics to ensure sub-second page speed.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">03.</span>
              <span>Lawful Basis for Processing</span>
            </h2>
            <p className="mb-3 text-slate-300">Under Article 6 of the UK GDPR, we rely on the following lawful bases:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">Contractual Necessity</h3>
                <p className="text-xs text-slate-400">Processing necessary to deliver project proposals, enter agreements, and engineer bespoke deliverables.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">Legitimate Interests</h3>
                <p className="text-xs text-slate-400">Improving web platform performance, preventing fraudulent traffic, and maintaining client relationship records.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <h3 className="font-bold text-white text-sm mb-1">Explicit Consent</h3>
                <p className="text-xs text-slate-400">Freely given consent for newsletter broadcasts, case study features, and optional analytics cookies.</p>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">04.</span>
              <span>Form Data Routing & Dispatch Synchronization</span>
            </h2>
            <p className="mb-3 text-slate-300">
              All website forms—including the Project Scoping Dossier, Consultation Scheduler, and Newsletter Subscription—are strictly synchronized and transmitted to our dedicated inquiries mailbox at <strong className="text-cyan-300 font-mono">info@hibyhuman.com</strong> over end-to-end encrypted TLS 1.3 channels.
            </p>
            <p className="text-slate-400">
              Each submission generates an immutable tracking reference code and is logged within our secure UK-hosted CRM to ensure rapid response within 24 business hours.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">05.</span>
              <span>Confidentiality & Intellectual Property</span>
            </h2>
            <p className="mb-3 text-slate-300">
              All proprietary project concepts, pitch deck slides, software architectures, and brand strategies submitted to HiByHuman are protected under mutual non-disclosure obligations. We will never share your trade secrets, unreleased software repositories, or unreleased product launches with any third party.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">06.</span>
              <span>Your Statutory Rights Under UK GDPR</span>
            </h2>
            <p className="mb-3 text-slate-300">As a data subject in the United Kingdom or European Economic Area, you have the right to:</p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300 pl-2">
              <li><strong className="text-white">Right of Access:</strong> Request copies of personal data held about you.</li>
              <li><strong className="text-white">Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
              <li><strong className="text-white">Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your data where no overriding legal requirement exists.</li>
              <li><strong className="text-white">Right to Restrict Processing:</strong> Limit how we process your information.</li>
              <li><strong className="text-white">Right to Data Portability:</strong> Receive your data in a structured, machine-readable format.</li>
              <li><strong className="text-white">Right to Withdraw Consent:</strong> Unsubscribe from marketing communications at any time.</li>
            </ul>
            <p className="mt-3 text-sm text-slate-400">
              To exercise any of these rights, email our Data Protection Officer at <a href="mailto:info@hibyhuman.com" className="text-cyan-400 underline font-medium">info@hibyhuman.com</a>. We respond to all verified statutory requests within 30 days free of charge.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">07.</span>
              <span>Supervisory Authority & Complaints</span>
            </h2>
            <p className="text-slate-300 leading-relaxed">
              If you believe HiByHuman has not handled your personal data in accordance with UK law, you have the right to lodge a complaint with the UK Information Commissioner’s Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-cyan-400 underline">ico.org.uk</a> or by telephoning 0303 123 1113.
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
            HiByHuman • 2 Mitchell Street Coatbridge, ML5 5RT
          </div>
        </div>
      </main>
    </div>
  );
}
