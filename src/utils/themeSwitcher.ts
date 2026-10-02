export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'hbh_preferred_theme';

let scheduledRafId: number | null = null;

/**
 * Applies the theme classes and attributes to document elements using requestAnimationFrame
 * to avoid layout thrashing and guarantee flicker-free transitions.
 */
export function applyThemeToDOM(theme: Theme): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  if (scheduledRafId !== null) {
    cancelAnimationFrame(scheduledRafId);
  }

  scheduledRafId = requestAnimationFrame(() => {
    scheduledRafId = null;

    const root = document.documentElement;
    const body = document.body;

    if (theme === 'light') {
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
  });
}

/**
 * Safely writes the active theme to localStorage.
 */
export function persistTheme(theme: Theme): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Gracefully handle potential QuotaExceededError or private browsing restrictions
  }
}

/**
 * Retrieves the stored theme preference with a safe fallback to dark mode.
 */
export function getInitialTheme(): Theme {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Fallback if storage access is restricted
    }
  }
  return 'dark';
}
