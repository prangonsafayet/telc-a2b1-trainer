import { useEffect, useState } from 'react';

import { Moon, Sun } from 'lucide-react';

import { readLocal, writeLocal } from '@shared/lib/storage.ts';
import { Button } from '@shared/ui';

type Theme = 'light' | 'dark';

/** Must match the pre-paint script in index.html, which avoids a flash of the wrong theme. */
const THEME_KEY = 'telcTrainerTheme';

function initialTheme(): Theme {
  const saved = readLocal(THEME_KEY);
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    writeLocal(THEME_KEY, theme);
  }, [theme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => {
        setTheme(current => (current === 'dark' ? 'light' : 'dark'));
      }}
    >
      {theme === 'dark' ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
}
