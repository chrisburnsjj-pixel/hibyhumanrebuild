import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';
import { Loader2, ShieldAlert, LogOut, ArrowLeft } from 'lucide-react';

interface AdminPanelProps {
  onBackToSite: () => void;
}

export function AdminPanel({ onBackToSite }: AdminPanelProps) {
  const { user, isAdmin, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <p className="text-xs font-mono">Authenticating studio privileges...</p>
      </div>
    );
  }

  // If not signed in to Firebase at all, show admin login screen
  if (!user) {
    return <AdminLogin onBackToSite={onBackToSite} />;
  }

  // If signed in but NOT authorized as an admin, show Access Denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-2xl bg-slate-900/90 border border-red-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(239,68,68,0.15)] text-center">
          <div className="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/40 flex items-center justify-center text-red-400 mb-5">
            <ShieldAlert className="w-7 h-7" />
          </div>

          <h2 className="text-xl font-bold text-white mb-2">Unauthorized Access</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            The account <span className="font-mono text-cyan-300 font-semibold">{user.email}</span> does not have administrative privileges for the HiByHuman Studio CMS.
          </p>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 font-mono mb-6 text-left space-y-1">
            <div className="text-slate-500">Security Invariant:</div>
            <div className="text-red-400">• Database write operations: DENIED</div>
            <div className="text-red-400">• CMS management permissions: DENIED</div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Sign Out & Switch Account
            </button>

            <button
              type="button"
              onClick={onBackToSite}
              className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-slate-800/50 text-slate-400 hover:text-slate-200 text-sm font-medium transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Verified admin user
  return <AdminLayout onBackToSite={onBackToSite} />;
}

