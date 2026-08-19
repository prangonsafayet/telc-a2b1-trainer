/**
 * Client-side password checks.
 *
 * These exist purely so a user gets immediate, specific feedback instead of a round-trip
 * error. They are NOT a security control: Supabase enforces its own minimum on the server
 * and is the only place that ever sees a password verifier. Nothing here hashes anything —
 * Supabase Auth stores a bcrypt hash server-side, and the browser must never roll its own.
 */
export const MIN_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (email: string): boolean => EMAIL_PATTERN.test(email.trim());

export interface PasswordCheck {
  readonly valid: boolean;
  /** Null when the password is acceptable. */
  readonly problem: string | null;
  /** 0–4, for the strength meter. */
  readonly strength: number;
}

export const checkPassword = (password: string): PasswordCheck => {
  if (password.length === 0) return { valid: false, problem: null, strength: 0 };
  if (password.length < MIN_PASSWORD_LENGTH) {
    return { valid: false, problem: `Use at least ${String(MIN_PASSWORD_LENGTH)} characters.`, strength: 1 };
  }

  const variety = [/[a-z]/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(pattern =>
    pattern.test(password)
  ).length;
  const strength = Math.min(4, Math.max(1, variety + (password.length >= 12 ? 1 : 0) - 1));

  return { valid: true, problem: null, strength };
};

const STRENGTH_LABELS = ['weak', 'fair', 'good', 'strong'] as const;

/** Human label for a 0–4 strength score; an em dash when there is nothing to judge. */
export const strengthLabel = (strength: number): string => STRENGTH_LABELS[strength - 1] ?? '—';
