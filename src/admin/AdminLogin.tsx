import React, { useState } from 'react';
import {
  Shield,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Check,
  Lock,
  ExternalLink,
  RefreshCw,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminLoginProps {
  onBackToSite: () => void;
}

interface FirebaseErrorDetail {
  code: string;
  message: string;
  rawMessage: string;
}

export function AdminLogin({ onBackToSite }: AdminLoginProps) {
  const { loginWithGoogle, loginWithGoogleRedirectFallback } = useAuth();
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [isRedirectSubmitting, setIsRedirectSubmitting] = useState(false);
  const [errorDetails, setErrorDetails] = useState<FirebaseErrorDetail | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const currentHostname =
    typeof window !== 'undefined' ? window.location.hostname : 'hibyhuman.com';

  const handleGoogleSignIn = async () => {
    console.log('[AdminLogin] handleGoogleSignIn fired via button click at', new Date().toISOString());
    setIsGoogleSubmitting(true);
    setErrorDetails(null);
    setSuccessNotice(null);

    try {
      console.log('[AdminLogin] Calling loginWithGoogle() (signInWithPopup)...');
      await loginWithGoogle();
      console.log('[AdminLogin] loginWithGoogle() succeeded!');
      setSuccessNotice('Google authentication successful! Verifying administrator privileges...');
    } catch (err: any) {
      console.error('[AdminLogin] Google sign-in failed with error:', err);
      const code = err?.code || 'auth/unknown-error';
      const rawMessage = err?.message || String(err);
      let friendlyMsg = rawMessage;

      if (code === 'auth/popup-blocked') {
        friendlyMsg =
          'Google Sign-In popup was blocked by your browser settings. Please allow popups for hibyhuman.com, or use the direct Redirect option below.';
      } else if (code === 'auth/popup-closed-by-user') {
        friendlyMsg =
          'The Google sign-in popup was closed before completing authentication. Please click the button again to retry.';
      } else if (code === 'auth/unauthorized-domain') {
        friendlyMsg = `Domain "${currentHostname}" is not authorized for Firebase Authentication in project "hibyhuman-admin". Please add "${currentHostname}" and "www.hibyhuman.com" to Firebase Console > Authentication > Settings > Authorized domains.`;
      } else if (code === 'auth/invalid-oauth-client-id') {
        friendlyMsg =
          'The Firebase OAuth client ID is invalid or not recognized by Google Identity Services. Please check your Google Cloud / Firebase OAuth configuration.';
      } else if (code === 'auth/operation-not-allowed') {
        friendlyMsg =
          'Google Sign-In is not enabled for project "hibyhuman-admin". In Firebase Console, go to Authentication > Sign-in method and enable Google provider.';
      } else if (code === 'auth/internal-error') {
        friendlyMsg =
          'Firebase internal error. Please check your network connection and verify that Firebase Authentication is reachable.';
      } else if (code === 'auth/network-request-failed') {
        friendlyMsg =
          'Network request failed. Please check your internet connection and ensure connectivity to googleapis.com.';
      } else if (code === 'auth/cancelled-popup-request') {
        friendlyMsg =
          'Another sign-in popup was already active. Please finish or close any open Google sign-in windows.';
      }

      setErrorDetails({
        code,
        message: friendlyMsg,
        rawMessage,
      });
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  const handleGoogleRedirectSignIn = async () => {
    console.log('[AdminLogin] handleGoogleRedirectSignIn fired at', new Date().toISOString());
    setIsRedirectSubmitting(true);
    setErrorDetails(null);
    setSuccessNotice('Redirecting to Google Identity sign-in...');

    try {
      console.log('[AdminLogin] Calling loginWithGoogleRedirectFallback() (signInWithRedirect)...');
      await loginWithGoogleRedirectFallback();
    } catch (err: any) {
      console.error('[AdminLogin] Google redirect sign-in error:', err);
      const code = err?.code || 'auth/unknown-error';
      const rawMessage = err?.message || String(err);
      setErrorDetails({
        code,
        message: err?.message || 'Redirect sign-in failed.',
        rawMessage,
      });
      setIsRedirectSubmitting(false);
      setSuccessNotice(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Subtle Background Ambient Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <button
        type="button"
        onClick={onBackToSite}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition cursor-pointer z-10 px-3.5 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Public Site</span>
      </button>

      <div className="w-full max-w-md relative z-10 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 mb-2 shadow-[0_0_25px_rgba(0,212,255,0.2)]">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            HiByHuman Admin
          </h1>
          <p className="text-xs text-slate-400">
            Secure studio management portal for <span className="text-cyan-300 font-mono font-semibold">chrisburnsjj@gmail.com</span>
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="text-center space-y-1.5 pb-2 border-b border-slate-800/80">
            <h2 className="text-sm font-bold text-slate-200">
              Administrative Access
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sign in with your verified Google account to manage studio services, projects, content, and inquiries.
            </p>
          </div>

          {/* Diagnostic Error Banner with Exact Error Code & Raw Message */}
          {errorDetails && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40 text-red-200 text-xs space-y-3">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="font-bold text-red-100">Sign-In Exception</span>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-red-950/80 border border-red-500/30 text-red-300">
                      {errorDetails.code}
                    </span>
                  </div>
                  <p className="leading-relaxed text-red-200/90">{errorDetails.message}</p>
                </div>
              </div>

              {/* Raw Error String Block */}
              {errorDetails.rawMessage && (
                <div className="pt-2 border-t border-red-500/20 space-y-1">
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    Raw Firebase Response:
                  </p>
                  <p className="font-mono text-[10px] text-red-300/80 break-all bg-slate-950/80 p-2 rounded-lg border border-red-500/20">
                    {errorDetails.rawMessage}
                  </p>
                </div>
              )}

              {/* Actionable button if popup was blocked */}
              {errorDetails.code === 'auth/popup-blocked' && (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGoogleRedirectSignIn}
                    disabled={isRedirectSubmitting}
                    className="w-full py-2 px-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-100 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition"
                  >
                    {isRedirectSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Redirecting to Google...</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Sign In via Redirect Instead</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {successNotice && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 font-mono">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{successNotice}</span>
            </div>
          )}

          {/* Primary Google Sign-In Action */}
          <div className="space-y-4">
            <button
              type="button"
              id="btn-google-sign-in"
              onClick={handleGoogleSignIn}
              disabled={isGoogleSubmitting || isRedirectSubmitting}
              className="w-full py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGoogleSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-900" />
                  <span>Opening Google Authentication...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </>
              )}
            </button>

            {/* Direct Redirect Alternative Link if user prefers or has popup restrictions */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={handleGoogleRedirectSignIn}
                disabled={isGoogleSubmitting || isRedirectSubmitting}
                className="text-[11px] text-slate-400 hover:text-cyan-300 font-mono transition cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Having trouble with popups? Use browser redirect</span>
              </button>
            </div>

            {/* Security Guarantee Panel */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Zero-Trust Admin Protection</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Only the designated Google account (<span className="text-cyan-300 font-mono">chrisburnsjj@gmail.com</span>) or authenticated users with valid administrative claims are authorized to enter the CMS. Unrecognized Google accounts are automatically rejected.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center border-t border-slate-800/60">
            <p className="text-[11px] text-slate-500 font-mono">
              Firebase Authentication (Google Identity) • Project: hibyhuman-admin
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

