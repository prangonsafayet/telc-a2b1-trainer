/** Public surface of the auth / cloud-sync feature. */
export { AccountMenu } from './components/AccountMenu.tsx';
export { SyncPanel } from './components/SyncPanel.tsx';
export { useAccountIdentity } from './hooks/use-account-identity.ts';
export { usePasswordAuth } from './hooks/use-password-auth.ts';
export { useCloudSync } from './hooks/use-cloud-sync.ts';
export { SyncContext, useSync } from './hooks/use-sync.ts';
export { mergeProgress } from './lib/merge-progress.ts';
export { isSyncConfigured, syncDiagnostics } from './lib/supabase-client.ts';
export type { CloudSyncState, SyncChip } from './hooks/use-cloud-sync.ts';
export type { OAuthProvider } from './lib/oauth-providers.ts';
