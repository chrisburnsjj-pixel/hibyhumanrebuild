import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  switchTheme: (nextTheme?: Theme) => void;
}

const THEME_STORAGE_KEY = 'hbh_preferred_theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Safely applies class and attribute updates to documentElement and body.
 */
function applyThemeDOM(targetTheme: Theme) {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;
  const body = document.body;

  if (targetTheme === 'light') {
    root.classList.add('light');
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');

    if (body) {
      body.classList.add('light');
      body.classList.remove('dark');
      body.setAttribute('data-theme', 'light');
    }
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');

    if (body) {
      body.classList.remove('light');
      body.classList.add('dark');
      body.setAttribute('data-theme', 'dark');
    }
  }
}

/**
 * Safely writes to localStorage with error handling for private modes or restricted access.
 */
function persistThemeSafely(theme: Theme) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Graceful fallback if storage quota is exceeded or storage is disabled
  }
}

/**
 * Safely reads the initial theme from localStorage or defaults to dark.
 */
function getInitialTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch {
    // Fallback on restricted storage
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  const switchTheme = useCallback((targetTheme?: Theme) => {
    setThemeState((currentTheme) => {
      const nextTheme: Theme =
        targetTheme !== undefined
          ? targetTheme
          : currentTheme === 'dark'
          ? 'light'
          : 'dark';

      applyThemeDOM(nextTheme);
      persistThemeSafely(nextTheme);
      return nextTheme;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    switchTheme();
  }, [switchTheme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      switchTheme(newTheme);
    },
    [switchTheme]
  );

  useEffect(() => {
    applyThemeDOM(theme);
  }, [theme]);

  const contextValue = useMemo<ThemeContextType>(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      switchTheme,
    }),
    [theme, toggleTheme, setTheme, switchTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'dark',
      toggleTheme: () => {},
      setTheme: () => {},
      switchTheme: () => {},
    };
  }
  return context;
}
