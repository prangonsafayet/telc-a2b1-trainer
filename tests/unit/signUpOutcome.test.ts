import { type AuthError, type User } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';

import { interpretSignUp, isRateLimited, retryAfterSeconds } from '@features/auth/lib/signUpOutcome.ts';

/* Supabase hides "this email already exists" behind a generic success response, so the
   only signal is an empty `identities` array. Both bugs this guards against were live: an
   existing user told to check an inbox nothing was sent to, and an unconfirmed user
   re-signing-up who never got another email. */

/** Only the fields `interpretSignUp` reads; the real User type is enormous. */
const user = (identities?: readonly { readonly provider: string }[]): User =>
  ({ id: 'u1', ...(identities ? { identities } : {}) }) as unknown as User;

const authError = (message: string): AuthError => ({ message }) as AuthError;

describe('interpretSignUp', () => {
  it('reports a confirmation email for a genuinely new account', () => {
    expect(interpretSignUp({ user: user([{ provider: 'email' }]), session: null }, null)).toEqual({
      kind: 'confirmation-sent'
    });
  });

  it('reports a signed-in account when the project does not require confirmation', () => {
    expect(
      interpretSignUp({ user: user([{ provider: 'email' }]), session: { access_token: 'x' } }, null)
    ).toEqual({ kind: 'signed-in' });
  });

  it('reads empty identities as an account that already exists', () => {
    expect(interpretSignUp({ user: user([]), session: null }, null)).toEqual({
      kind: 'already-registered'
    });
  });

  it('treats a missing identities field the same way', () => {
    expect(interpretSignUp({ user: user(), session: null }, null)).toEqual({
      kind: 'already-registered'
    });
  });

  it('recognises the explicit error Supabase sends with obfuscation off', () => {
    expect(interpretSignUp(null, authError('User already registered')).kind).toBe('already-registered');
    expect(interpretSignUp(null, authError('user_already_exists')).kind).toBe('already-registered');
  });

  it('surfaces any other error with its message intact', () => {
    const outcome = interpretSignUp(null, authError('Password should be at least 6 characters'));
    expect(outcome.kind).toBe('failed');
    expect(outcome).toHaveProperty('message', 'Password should be at least 6 characters');
  });

  it('treats no user and no error as a failure rather than a success', () => {
    expect(interpretSignUp({ user: null, session: null }, null).kind).toBe('failed');
  });
});

describe('resend rate limiting', () => {
  it('is recognised, so it does not read as "the email never arrived"', () => {
    expect(isRateLimited('For security purposes, you can only request this after 51 seconds.')).toBe(true);
    expect(isRateLimited('email rate limit exceeded')).toBe(true);
  });

  it('does not swallow unrelated errors', () => {
    expect(isRateLimited('Invalid login credentials')).toBe(false);
  });

  it('extracts the delay when the message names one', () => {
    expect(retryAfterSeconds('you can only request this after 51 seconds.')).toBe(51);
    expect(retryAfterSeconds('email rate limit exceeded')).toBeNull();
  });
});
