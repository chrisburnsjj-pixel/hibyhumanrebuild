import React, { useState } from 'react';
import { Database, ShieldCheck, RefreshCw, Check, AlertTriangle, Sparkles } from 'lucide-react';
import { seedFirestoreWithExistingSiteData } from '../../firebase/firestore';
import { useCMS } from '../../context/CMSContext';
import { useAuth } from '../../context/AuthContext';
import { ConfirmModal } from '../components/ConfirmModal';

export function SettingsEditor() {
  const { refreshCMS, isLiveFromFirestore } = useCMS();
  const { user } = useAuth();
  const [isSeeding, setIsSeeding] = useState(false);
  const [showConfirmSeed, setShowConfirmSeed] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    try {
      const result = await seedFirestoreWithExistingSiteData();
      await refreshCMS();
      setSeedResult(result);
    } catch (err: any) {
      setSeedResult({
        success: false,
        message: err?.message || 'Failed to seed database.',
      });
    } finally {
      setIsSeeding(false);
      setShowConfirmSeed(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-cyan-400" />
          <span>System & Database Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Monitor Firestore live connection, manage database seeding, and inspect authentication status.
        </p>
      </div>

      {seedResult && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-2 font-mono ${
            seedResult.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {seedResult.success ? (
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{seedResult.message}</span>
        </div>
      )}

      {/* Connection & Auth Health */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Database Connection</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                isLiveFromFirestore
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
              }`}
            >
              {isLiveFromFirestore ? 'Live Firestore' : 'Fallback Defaults'}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white">Google Cloud Firestore</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            All updates made in this admin panel write directly to your provisioned cloud database in real time.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Admin Session</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              <span>Authenticated</span>
            </span>
          </div>
          <h3 className="text-sm font-bold text-white truncate">{user?.email || 'Administrator'}</h3>
          <p className="text-xs text-slate-400 font-mono">UID: {user?.uid ? `${user.uid.slice(0, 16)}...` : 'N/A'}</p>
        </div>
      </div>

      {/* Database Seeder Block */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-500/30 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">Seed Initial Content into Firestore</h3>
            </div>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-xl">
              One-click synchronization that writes all existing website data (Hero copy, services, projects, testimonials, Coatbridge studio address, and navigation) into your newly provisioned Firestore database.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmSeed(true)}
            disabled={isSeeding}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-bold text-xs transition shadow-md shadow-cyan-500/20 cursor-pointer flex items-center gap-2 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
            <span>{isSeeding ? 'Seeding Firestore...' : 'Seed Now'}</span>
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showConfirmSeed}
        title="Seed Website Content to Firestore?"
        message="This will populate your Firestore collections with default studio data (services, projects, testimonials, contact details). Any existing Firestore documents will be merged or initialized."
        confirmText="Confirm & Seed"
        isDestructive={false}
        isLoading={isSeeding}
        onConfirm={handleSeed}
        onCancel={() => setShowConfirmSeed(false)}
      />
    </div>
  );
}
