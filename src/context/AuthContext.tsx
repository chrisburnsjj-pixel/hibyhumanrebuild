import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import {
  loginAdminUser,
  loginWithGoogleProvider,
  loginWithGoogleRedirect,
  checkRedirectResult,
  sendAdminPasswordReset,
  createAdminUser,
  logoutAdminUser,
  verifyAdminStatus,
  subscribeToAuth,
} from '../firebase/auth';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  createAdmin: (email: string, pass: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithGoogleRedirectFallback: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  isLoading: true,
  login: async () => {},
  createAdmin: async () => {},
  loginWithGoogle: async () => {},
  loginWithGoogleRedirectFallback: async () => {},
  resetPassword: async () => {},
  logout: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is returning from a Google redirect authentication flow
    checkRedirectResult()
      .then(async (redirectUser) => {
        if (redirectUser) {
          console.log('[AuthContext] Processing redirect user result:', redirectUser.email);
          setUser(redirectUser);
          const authorized = await verifyAdminStatus(redirectUser);
          setIsAdmin(authorized);
        }
      })
      .catch((err) => {
        console.warn('[AuthContext] Redirect result check notice:', err);
      });

    const unsubscribe = subscribeToAuth(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const authorized = await verifyAdminStatus(currentUser);
        setIsAdmin(authorized);
      } else {
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    const loggedUser = await loginAdminUser(email, pass);
    const authorized = await verifyAdminStatus(loggedUser);
    setIsAdmin(authorized);
    setUser(loggedUser);
  };

  const createAdmin = async (email: string, pass: string, name?: string) => {
    const newUser = await createAdminUser(email, pass, name);
    setUser(newUser);
    const authorized = await verifyAdminStatus(newUser);
    setIsAdmin(authorized);
  };

  const loginWithGoogle = async () => {
    // CRITICAL: Do NOT set global setIsLoading(true) here!
    // Global isLoading will unmount <AdminLogin />, terminating browser user-activation
    // gesture context for popups and wiping out local error state on failure.
    // The AdminLogin component independently manages its own button loading state.
    console.log('[AuthContext] Executing loginWithGoogleProvider...');
    const loggedUser = await loginWithGoogleProvider();
    console.log('[AuthContext] Provider returned user, verifying admin status:', loggedUser.email);
    const authorized = await verifyAdminStatus(loggedUser);
    setIsAdmin(authorized);
    setUser(loggedUser);
  };

  const loginWithGoogleRedirectFallback = async () => {
    console.log('[AuthContext] Executing loginWithGoogleRedirect fallback...');
    await loginWithGoogleRedirect();
  };

  const resetPassword = async (email: string) => {
    await sendAdminPasswordReset(email);
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutAdminUser();
      setUser(null);
      setIsAdmin(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        isLoading,
        login,
        createAdmin,
        loginWithGoogle,
        loginWithGoogleRedirectFallback,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
