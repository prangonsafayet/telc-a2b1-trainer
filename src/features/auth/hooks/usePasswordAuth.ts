import { useCallback, useMemo, useState } from 'react';

import { checkPassword, isValidEmail, type PasswordCheck } from '../lib/passwordPolicy.ts';

import { useSync } from './useSync.ts';

export type AuthMode = 'signin' | 'signup';

/** What the form should say after a sign-up attempt. */
export type SignUpFeedback =
  | { readonly kind: 'none' }
  /** Awaiting email confirmation for this address; offer a resend. */
  | { readonly kind: 'awaiting-confirmation'; readonly email: string }
  /** The address already belongs to a confirmed account. */
  | { readonly kind: 'already-registered'; readonly email: string };

export interface PasswordAuthState {
  readonly mode: AuthMode;
  readonly setMode: (mode: AuthMode) => void;
  readonly email: string;
  readonly setEmail: (value: string) => void;
  readonly password: string;
  readonly setPassword: (value: string) => void;
  readonly confirmPassword: string;
  readonly setConfirmPassword: (value: string) => void;
  readonly showPassword: boolean;
  readonly toggleShowPassword: () => void;
  readonly passwordCheck: PasswordCheck;
  /** First blocking problem, or null when the form is submittable. */
  readonly problem: string | null;
  readonly canSubmit: boolean;
  readonly busy: boolean;
  readonly submit: () => void;
  readonly resetPassword: () => void;
  readonly onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readonly signUpFeedback: SignUpFeedback;
  readonly resendConfirmation: () => void;
}

/**
 * Form state for the email/password flow. Validation lives here so the form component
 * stays presentational; the actual credential handling is Supabase's.
 */
export const usePasswordAuth = (): PasswordAuthState => {
  const sync = useSync();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [signUpFeedback, setSignUpFeedback] = useState<SignUpFeedback>({ kind: 'none' });

  const passwordCheck = useMemo(() => checkPassword(password), [password]);

  const problem = useMemo(() => {
    if (email.length > 0 && !isValidEmail(email)) return 'Enter a valid email address.';
    if (mode === 'signup') {
      if (passwordCheck.problem) return passwordCheck.problem;
      if (confirmPassword.length > 0 && password !== confirmPassword)
        return 'The two passwords do not match.';
    }
    return null;
  }, [email, mode, passwordCheck.problem, password, confirmPassword]);

  const canSubmit =
    !sync.busyWithEmail &&
    isValidEmail(email) &&
    password.length > 0 &&
    (mode === 'signin' || (passwordCheck.valid && password === confirmPassword));

  const submit = useCallback(() => {
    if (!canSubmit) return;
    const address = email.trim();

    if (mode === 'signin') {
      void sync.signInWithPassword(address, password).then(succeeded => {
        if (succeeded) setPassword('');
      });
      return;
    }

    void sync.signUpWithPassword(address, password).then(outcome => {
      switch (outcome.kind) {
        case 'signed-in':
          setSignUpFeedback({ kind: 'none' });
          setPassword('');
          setConfirmPassword('');
          break;
        case 'confirmation-sent':
          setSignUpFeedback({ kind: 'awaiting-confirmation', email: address });
          setPassword('');
          setConfirmPassword('');
          break;
        case 'already-registered':
          /* Send them where they can actually get in, keeping the address they typed. */
          setSignUpFeedback({ kind: 'already-registered', email: address });
          setMode('signin');
          setPassword('');
          setConfirmPassword('');
          break;
        case 'failed':
          break;
      }
    });
  }, [canSubmit, mode, sync, email, password]);

  const resendConfirmation = useCallback(() => {
    const address = signUpFeedback.kind === 'none' ? email.trim() : signUpFeedback.email;
    if (!isValidEmail(address) || sync.busyWithEmail) return;
    void sync.resendConfirmation(address);
  }, [signUpFeedback, email, sync]);

  const resetPassword = useCallback(() => {
    if (!isValidEmail(email) || sync.busyWithEmail) return;
    void sync.sendPasswordReset(email.trim());
  }, [email, sync]);

  /** Enter submits, so the field behaves like a form without needing one. */
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submit();
      }
    },
    [submit]
  );

  const changeMode = useCallback((next: AuthMode) => {
    setMode(next);
    setPassword('');
    setConfirmPassword('');
    /* Keep an awaiting-confirmation notice visible across tabs — the user still needs to
       act on it — but drop the "already registered" nudge once they are on sign-in. */
    setSignUpFeedback(current => (current.kind === 'awaiting-confirmation' ? current : { kind: 'none' }));
  }, []);

  return {
    mode,
    setMode: changeMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword: () => {
      setShowPassword(current => !current);
    },
    passwordCheck,
    problem,
    canSubmit,
    busy: sync.busyWithEmail,
    submit,
    resetPassword,
    onKeyDown,
    signUpFeedback,
    resendConfirmation
  };
};
