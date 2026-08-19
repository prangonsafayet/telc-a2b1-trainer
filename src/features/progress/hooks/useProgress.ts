import { useContext } from 'react';

import { type Settings } from '@shared/types';

import { ProgressContext, type ProgressContextValue } from '../providers/ProgressProvider.tsx';

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside <ProgressProvider>');
  return context;
}

export function useSettings(): Settings {
  return useProgress().db.settings;
}
