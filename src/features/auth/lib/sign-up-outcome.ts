import { type AuthError, type User } from '@supabase/supabase-js';

/**
 * What actually happened when we called `signUp`.
 *
 * Supabase deliberately obscures whether an email is already registered, to stop the
 * sign-up form being used to enumerate accounts. That means a "success" response can mean
 * three different things, and the naive reading of it — session means signed in, no
 * session means we sent you an email — is wrong for an existing account.
 */
export type SignUpOutcome =
  /** New (or already confirmed) account with a live session: nothing more to do. */
  | { readonly kind: 'signed-in' }
  /** A confirmation email is on its way; the account cannot sign in until it is used. */
  | { readonly kind: 'confirmation-sent' }
  /** The email already belongs to a confirmed account. No email was sent. */
  | { readonly kind: 'already-registered' }
  | { readonly kind: 'failed'; readonly message: string };

interface SignUpResponse {
  readonly user: User | null;
  readonly session: unknown;
}

/**
 * Detecting an existing confirmed account:
 *
 * With obfuscation on (the default), `signUp` for an already-confirmed email returns no
 * error, no session, and a user object whose `identities` array is **empty** — a real
 * new signup always has at least one identity. That empty array is the only signal, and
 * without checking it the UI tells the user to check an inbox that will never receive
 * anything.
 *
 * With obfuscation off, Supabase returns an explicit "User already registered" error
 * instead, so both shapes are handled.
 */
export function interpretSignUp(response: SignUpResponse | null, error: AuthError | null): SignUpOutcome {
  if (error) {
    if (/already registered|already exists|user_already_exists/i.test(error.message)) {
      return { kind: 'already-registered' };
    }
    return { kind: 'failed', message: error.message };
  }

  if (!response?.user) return { kind: 'failed', message: 'Sign-up did not return an account.' };
  if (response.session) return { kind: 'signed-in' };
  if ((response.user.identities?.length ?? 0) === 0) return { kind: 'already-registered' };

  return { kind: 'confirmation-sent' };
}

/** True when a resend was refused because the last one was too recent. */
export function isRateLimited(message: string): boolean {
  return /rate limit|too many requests|only request this after|for security purposes/i.test(message);
}

/** Seconds to wait, if the error names a delay. */
export function retryAfterSeconds(message: string): number | null {
  const match = /after (\d+) seconds?/i.exec(message);
  return match?.[1] ? Number(match[1]) : null;
}
