import { createContext, useContext } from 'react';

import { type CloudSyncState } from './useCloudSync.ts';

export const SyncContext = createContext<CloudSyncState | null>(null);

export const useSync = (): CloudSyncState => {
  const context = useContext(SyncContext);
  if (!context) throw new Error('useSync must be used inside the app layout, which provides SyncContext');
  return context;
};
