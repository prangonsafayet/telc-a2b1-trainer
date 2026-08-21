import { useCallback, useEffect, useState } from 'react';

import { readLocal, writeLocal } from '@shared/lib/storage.ts';

export type Theme = 'light' | 'dark';

/**
 * One of the five keys that are live user data — never rename it. It is also spelled out in
 * the pre-paint script in `index.html`, which applies the saved theme before React mounts so
 * there is no flash of the wrong one; that copy is unavoidable (the script runs before any
 * module loads) and the two must stay in step.
 */
export const THEME_STORAGE_KEY = 'telcTrainerTheme';

const storedTheme = (): Theme | null => {
  const saved = readLocal(THEME_STORAGE_KEY);
  return saved === 'dark' || saved === 'light' ? saved : null;
};

/**
 * The chosen theme, persisted, and the class on `<html>` that Tailwind's `dark` variant
 * reads. Falls back to the OS preference until the user picks one.
 *
 * A hook rather than component state: this reads storage, writes storage and mutates the
 * document, none of which belongs in something whose job is to render a button.
 */
export const useTheme = (): { readonly theme: Theme; readonly toggle: () => void } => {
  const [theme, setTheme] = useState<Theme>(
    () => storedTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    writeLocal(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(current => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
};
