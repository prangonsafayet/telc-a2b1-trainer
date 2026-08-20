/** Public surface of the auth / cloud-sync feature. */
export { default as AccountMenu } from './components/AccountMenu.tsx';
export { default as SyncPanel } from './components/sync/SyncPanel.tsx';
export { useAccountIdentity } from './hooks/useAccountIdentity.ts';
export { usePasswordAuth } from './hooks/usePasswordAuth.ts';
export { useCloudSync } from './hooks/useCloudSync.ts';
export { SyncContext, useSync } from './hooks/useSync.ts';
export { mergeProgress } from './lib/mergeProgress.ts';
export { isSyncConfigured, syncDiagnostics } from './lib/supabaseClient.ts';
export type { CloudSyncState, SyncChip } from './hooks/useCloudSync.ts';
export type { OAuthProvider } from './lib/oauthProviders.ts';
