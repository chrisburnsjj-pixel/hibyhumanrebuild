import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Briefcase, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface CareersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenFittingModal?: (subject?: string) => void;
}

interface OpenRole {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  description: string;
}

const OPEN_ROLES: OpenRole[] = [
  {
    id: 'lead-motion-designer',
    title: 'Lead 3D & Motion Designer',
    department: 'Motion & 3D Lab',
    type: 'Full-Time / Contract',
    location: 'Coatbridge Studio / Hybrid UK',
    experience: '4+ Years',
    description: 'Directing photorealistic product simulations in Unreal Engine 5, Octane, and Cinema 4D for global brands.',
  },
  {
    id: 'senior-commercial-editor',
    title: 'Senior Commercial Film Editor',
    department: 'Post-Production',
    type: 'Full-Time',
    location: 'Coatbridge Studio / Hybrid',
    experience: '5+ Years',
    description: 'Mastery of narrative pacing, DaVinci Resolve color grading, dialogue assembly, and spatial sound synchronization.',
  },
  {
    id: 'creative-producer',
    title: 'Creative Production Manager',
    department: 'Project Management',
    type: 'Full-Time',
    location: 'Coatbridge / Remote UK',
    experience: '3+ Years',
    description: 'Managing client sprint cadences, Frame.io review cycles, set scheduling, and resource allocation across 9 departments.',
  },
  {
    id: 'director-of-photography',
    title: 'Camera Operator / DoP (Commercials)',
    department: 'Principal Photography',
    type: 'Contract / Project Basis',
    location: 'UK / International On-Set',
    experience: '4+ Years',
    description: 'Operating high-spec cinema camera systems, gimbals, anamorphic glass, and studio lighting setups.',
  },
];

export function CareersModal({ isOpen, onClose, onOpenFittingModal }: CareersModalProps) {
  const [selectedRole, setSelectedRole] = useState<OpenRole | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSelectedRole(null);
      onClose();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 300 }}
            className="relative w-full max-w-4xl rounded-3xl bg-[#0B1020] border border-cyan-500/30 shadow-[0_0_80px_rgba(0,200,255,0.25)] overflow-hidden my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="px-6 sm:px-8 py-5 bg-gradient-to-r from-[#05070D] via-[#0B1020] to-[#05070D] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00C8FF]/15 border border-[#00C8FF]/40 flex items-center justify-center text-[#00C8FF]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    HiByHuman Studio Careers
                  </h3>
                  <p className="text-xs font-mono text-[#00C8FF]">Join Our High-Impact Production Collective</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close careers modal"
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-bold text-white font-display">
                    Application Received!
                  </h4>
                  <p className="text-sm text-slate-300 mt-2 max-w-md">
                    Thank you for sharing your work with HiByHuman. Our executive creative directors review all showreels and will be in touch if your aesthetic aligns with upcoming projects.
                  </p>
                </div>
              ) : selectedRole ? (
                /* Role Application Form */
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setSelectedRole(null)}
                    className="text-xs font-mono text-[#00C8FF] hover:underline flex items-center gap-1"
                  >
                    ← Back to All Roles
                  </button>

                  <div className="p-5 rounded-2xl bg-[#05070D] border border-white/10">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-[#00C8FF] uppercase font-bold">{selectedRole.department}</span>
                      <span className="text-xs font-mono text-slate-400">{selectedRole.location} • {selectedRole.type}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white font-display">{selectedRole.title}</h4>
                    <p className="text-sm text-slate-300 mt-2 leading-relaxed">{selectedRole.description}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00C8FF] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="alex@studio.com"
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00C8FF] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
                        Portfolio / Showreel URL (Vimeo, YouTube, Behance, Website) *
                      </label>
                      <input
                        type="url"
                        required
                        value={portfolioLink}
                        onChange={(e) => setPortfolioLink(e.target.value)}
                        placeholder="https://vimeo.com/your-showreel"
                        className="w-full px-4 py-3 rounded-xl bg-[#05070D] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-[#00C8FF] transition-colors text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00C8FF] to-[#7A2CFF] text-[#05070D] font-black text-sm uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-4 font-creative"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Application</span>
                    </button>
                  </form>
                </div>
              ) : (
                /* Roles List */
                <div className="space-y-4">
                  <div className="text-sm text-slate-300">
                    We are always looking for visionaries who blend human storytelling with elite technical execution. Explore our current open studio positions:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {OPEN_ROLES.map((role) => (
                      <div
                        key={role.id}
                        className="p-5 rounded-2xl bg-[#05070D]/80 border border-white/10 hover:border-[#00C8FF]/50 transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-2">
                            <span className="text-[#00C8FF]">{role.department}</span>
                            <span>{role.type}</span>
                          </div>
                          <h4 className="text-base font-bold text-white font-display group-hover:text-[#00C8FF] transition-colors">
                            {role.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                            {role.description}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-slate-500">{role.location}</span>
                          <button
                            type="button"
                            onClick={() => setSelectedRole(role)}
                            className="text-xs font-bold text-[#00C8FF] hover:underline flex items-center gap-1 font-creative"
                          >
                            <span>Apply</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* General Expression of Interest */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#05070D] to-[#151D33] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                    <div>
                      <div className="text-xs font-mono uppercase text-[#00C8FF] font-bold">Don't see your discipline?</div>
                      <div className="text-sm font-bold text-white mt-0.5">Send a spontaneous reel or creative portfolio to our directors.</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedRole({
                          id: 'general-reel',
                          title: 'General Reel / Creative Talent Roster',
                          department: 'All Departments',
                          type: 'Flexible',
                          location: 'Global',
                          experience: 'Any',
                          description: 'Submit your reel or design portfolio for upcoming studio campaigns.',
                        });
                      }}
                      className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold font-creative uppercase tracking-wider shrink-0 transition-colors"
                    >
                      Submit Spontaneous Reel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
