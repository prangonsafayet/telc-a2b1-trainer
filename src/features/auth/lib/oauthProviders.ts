import { CONFIGURED_PROVIDER_IDS } from './supabaseConfig.ts';

/** OAuth providers this app supports. Email sign-in is handled separately. */
export const OAUTH_PROVIDERS = ['google', 'github'] as const;

export type OAuthProvider = (typeof OAUTH_PROVIDERS)[number];

export const PROVIDER_LABELS: Readonly<Record<OAuthProvider, string>> = {
  google: 'Google',
  github: 'GitHub'
};

const isSupportedProvider = (id: string): id is OAuthProvider =>
  (OAUTH_PROVIDERS as readonly string[]).includes(id);

/**
 * Only providers that are both supported here and listed in the environment. Offering one
 * that is not enabled in the Supabase dashboard just produces an error, so the list is
 * opt-in rather than "all of them".
 */
export const enabledProviders: readonly OAuthProvider[] = CONFIGURED_PROVIDER_IDS.filter(isSupportedProvider);

export const providerLabel = (provider: OAuthProvider): string => PROVIDER_LABELS[provider];
