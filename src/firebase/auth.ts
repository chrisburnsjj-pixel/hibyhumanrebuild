import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './config';

export interface AdminUser {
  uid: string;
  email: string | null;
  role: 'admin' | 'superadmin';
  displayName?: string;
}

export async function loginAdminUser(email: string, pass: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  return cred.user;
}

export async function loginWithGoogleProvider(): Promise<User> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  console.log('[Auth] Initiating signInWithPopup(auth, GoogleAuthProvider)...');
  const cred = await signInWithPopup(auth, provider);
  console.log('[Auth] signInWithPopup succeeded for user:', cred.user?.email);
  return cred.user;
}

export async function loginWithGoogleRedirect(): Promise<void> {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  console.log('[Auth] Initiating signInWithRedirect(auth, GoogleAuthProvider)...');
  await signInWithRedirect(auth, provider);
}

export async function checkRedirectResult(): Promise<User | null> {
  try {
    const cred = await getRedirectResult(auth);
    if (cred && cred.user) {
      console.log('[Auth] getRedirectResult returned authenticated user:', cred.user.email);
      return cred.user;
    }
  } catch (err) {
    console.error('[Auth] getRedirectResult failed:', err);
    throw err;
  }
  return null;
}

export async function sendAdminPasswordReset(email: string): Promise<void> {
  const targetUrl =
    typeof window !== 'undefined' && window.location.origin.includes('hibyhuman.com')
      ? `${window.location.origin}/admin`
      : 'https://www.hibyhuman.com/admin';

  try {
    await sendPasswordResetEmail(auth, email.trim(), {
      url: targetUrl,
      handleCodeInApp: false,
    });
  } catch (err: any) {
    // If the continue URL domain is not yet in authorized domains, fall back to default template
    if (err?.code === 'auth/unauthorized-continue-uri') {
      await sendPasswordResetEmail(auth, email.trim());
    } else {
      throw err;
    }
  }
}

export async function createAdminUser(email: string, pass: string, displayName?: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  const user = cred.user;
  
  // Register in admins collection
  try {
    const adminRef = doc(db, 'admins', user.uid);
    await setDoc(
      adminRef,
      {
        uid: user.uid,
        email: user.email,
        displayName: displayName || user.email?.split('@')[0] || 'Admin',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn('Could not write admin record directly (may require rule permission):', err);
  }

  return user;
}

export async function logoutAdminUser(): Promise<void> {
  await signOut(auth);
}

export async function verifyAdminStatus(user: User | null): Promise<boolean> {
  if (!user) return false;

  // 1. Check custom token claims
  try {
    const tokenResult = await user.getIdTokenResult();
    if (
      tokenResult.claims.admin === true ||
      tokenResult.claims.role === 'admin' ||
      tokenResult.claims.role === 'superadmin'
    ) {
      return true;
    }
  } catch (err) {
    console.warn('Error reading user token claims:', err);
  }

  // 2. Verified primary owner allowlist
  const normalizedEmail = user.email?.trim().toLowerCase();
  if (normalizedEmail === 'chrisburnsjj@gmail.com') {
    // Synchronize admin record in /admins/{uid} for database-level presence
    try {
      const adminRef = doc(db, 'admins', user.uid);
      const snap = await getDoc(adminRef);
      if (!snap.exists() || (snap.data()?.role !== 'superadmin' && snap.data()?.role !== 'admin')) {
        await setDoc(
          adminRef,
          {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || 'Chris Burns (Primary Admin)',
            role: 'superadmin',
            createdAt: snap.data()?.createdAt || new Date().toISOString(),
          },
          { merge: true }
        );
      }
    } catch (e) {
      console.warn('Could not auto-sync admin doc:', e);
    }
    return true;
  }

  // 3. Check /admins/{uid} Firestore document
  try {
    const docRef = doc(db, 'admins', user.uid);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      const data = snap.data();
      return data.role === 'admin' || data.role === 'superadmin';
    }
    return false;
  } catch (e) {
    // If Firestore rules deny read or document not found, the user is strictly non-admin
    return false;
  }
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
