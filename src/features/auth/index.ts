/**
 * Public surface of the auth / cloud-sync feature: the account menu, the settings panel,
 * and the sync state the shell puts on the context. Everything else — the password form's
 * hook, the Supabase client, the merge — is internal to this feature; nothing outside it
 * has asked for them, and a barrel that lists what nobody imports stops being a contract.
 */
export { default as AccountMenu } from './components/AccountMenu.tsx';
export { default as SyncPanel } from './components/sync/SyncPanel.tsx';
export { useAccountIdentity } from './hooks/useAccountIdentity.ts';
export { useCloudSync } from './hooks/useCloudSync.ts';
export { SyncContext, useSync } from './hooks/useSync.ts';
