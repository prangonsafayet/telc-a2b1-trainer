import { useCallback, useMemo, useState } from 'react';

import { checkPassword, isValidEmail, type PasswordCheck } from '../lib/password-policy.ts';

import { useSync } from './use-sync.ts';

export type AuthMode = 'signin' | 'signup';

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
}

/**
 * Form state for the email/password flow. Validation lives here so the form component
 * stays presentational; the actual credential handling is Supabase's.
 */
export function usePasswordAuth(): PasswordAuthState {
  const sync = useSync();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    const run = mode === 'signup' ? sync.signUpWithPassword : sync.signInWithPassword;
    void run(email.trim(), password).then(succeeded => {
      if (succeeded) {
        setPassword('');
        setConfirmPassword('');
      }
    });
  }, [canSubmit, mode, sync, email, password]);

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
    onKeyDown
  };
}
