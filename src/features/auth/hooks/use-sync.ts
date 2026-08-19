import { createContext, useContext } from 'react';

import { type CloudSyncState } from './use-cloud-sync.ts';

export const SyncContext = createContext<CloudSyncState | null>(null);

export function useSync(): CloudSyncState {
  const context = useContext(SyncContext);
  if (!context) throw new Error('useSync must be used inside the app layout, which provides SyncContext');
  return context;
}
