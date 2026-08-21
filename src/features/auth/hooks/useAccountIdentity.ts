import { useSync } from './useSync.ts';

export interface AccountIdentity {
  readonly signedIn: boolean;
  /** True when the build has Supabase credentials at all. */
  readonly configured: boolean;
  readonly displayName: string;
  readonly email: string;
  readonly avatarUrl: string;
  readonly providerLabel: string;
  /** Short label for the header chip. */
  readonly statusLabel: string;
  readonly lastSyncedLabel: string;
}

interface ProviderMetadata {
  readonly full_name?: string;
  readonly name?: string;
  readonly avatar_url?: string;
  readonly picture?: string;
}

/** Flattens the provider's metadata into the strings the account UI displays. */
export const useAccountIdentity = (): AccountIdentity => {
  const sync = useSync();
  const meta = sync.user?.user_metadata as ProviderMetadata | undefined;

  const email = sync.user?.email ?? '';
  const displayName = meta?.full_name ?? meta?.name ?? email;
  const signedIn = sync.configured && sync.user !== null;

  return {
    signedIn,
    configured: sync.configured,
    displayName,
    email,
    avatarUrl: meta?.avatar_url ?? meta?.picture ?? '',
    providerLabel: sync.user?.app_metadata.provider ?? '',
    statusLabel: !sync.configured ? 'Local only' : signedIn ? displayName : 'Not signed in',
    lastSyncedLabel: sync.lastSyncedAt
      ? `Synced ${sync.lastSyncedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} — progress is backed up and follows you across devices.`
      : 'Signed in — progress syncs automatically after each change.'
  };
};
