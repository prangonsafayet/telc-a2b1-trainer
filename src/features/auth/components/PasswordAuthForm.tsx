import { Eye, EyeOff, KeyRound, Loader2, MailCheck, RotateCcw, TriangleAlert, UserPlus } from 'lucide-react';

import { cn } from '@shared/lib/cn.ts';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@shared/ui';

import { usePasswordAuth, type AuthMode, type SignUpFeedback } from '../hooks/usePasswordAuth.ts';
import { MIN_PASSWORD_LENGTH, strengthLabel } from '../lib/passwordPolicy.ts';

const STRENGTH_COLORS = [
  'bg-muted',
  'bg-destructive',
  'bg-[color:var(--warning)]',
  'bg-[color:var(--warning)]',
  'bg-[color:var(--success)]'
] as const;

const StrengthMeter = ({ strength }: { readonly strength: number }) => (
  <div className="space-y-1">
    <div className="flex gap-1" aria-hidden>
      {[1, 2, 3, 4].map(step => (
        <div
          key={step}
          className={cn(
            'h-1 flex-1 rounded-full transition-colors',
            step <= strength ? STRENGTH_COLORS[strength] : 'bg-muted'
          )}
        />
      ))}
    </div>
    <p className="text-xs text-muted-foreground">Password strength: {strengthLabel(strength)}</p>
  </div>
);

interface SignUpNoticeProps {
  readonly feedback: SignUpFeedback;
  readonly busy: boolean;
  readonly onResend: () => void;
}

/**
 * The two outcomes Supabase hides behind a generic success response. Without this the form
 * would tell someone who already has an account to check an inbox nothing was sent to.
 */
const SignUpNotice = ({ feedback, busy, onResend }: SignUpNoticeProps) => {
  if (feedback.kind === 'already-registered') {
    return (
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>{feedback.email} already has an account</AlertTitle>
        <AlertDescription>
          <p>
            It is already confirmed, so no email was sent. Sign in below — or use <b>Forgot password?</b> if
            you cannot remember the password.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  if (feedback.kind === 'awaiting-confirmation') {
    return (
      <Alert variant="info">
        <MailCheck />
        <AlertTitle>Confirm {feedback.email}</AlertTitle>
        <AlertDescription>
          <p>
            Click the link in that email, then sign in. Check your spam folder — and if it still has not
            arrived, send it again.
          </p>
          <Button variant="outline" size="sm" className="mt-2" onClick={onResend} disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <RotateCcw />}
            Resend confirmation email
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

/** Email + password sign-in and sign-up, as two tabs over one form. */
export const PasswordAuthForm = () => {
  const auth = usePasswordAuth();
  const isSignUp = auth.mode === 'signup';

  return (
    <Tabs
      value={auth.mode}
      onValueChange={value => {
        auth.setMode(value as AuthMode);
      }}
    >
      <TabsList className="w-full">
        <TabsTrigger value="signin">
          <KeyRound /> Sign in
        </TabsTrigger>
        <TabsTrigger value="signup">
          <UserPlus /> Create account
        </TabsTrigger>
      </TabsList>

      {(['signin', 'signup'] as const).map(mode => (
        <TabsContent key={mode} value={mode} className="space-y-3">
          <SignUpNotice feedback={auth.signUpFeedback} busy={auth.busy} onResend={auth.resendConfirmation} />
          <div className="space-y-1.5">
            <Label htmlFor={`${mode}-email`}>Email</Label>
            <Input
              id={`${mode}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={auth.email}
              onChange={event => {
                auth.setEmail(event.target.value);
              }}
              onKeyDown={auth.onKeyDown}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor={`${mode}-password`}>Password</Label>
            <div className="flex gap-2">
              <Input
                id={`${mode}-password`}
                type={auth.showPassword ? 'text' : 'password'}
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                placeholder={isSignUp ? `At least ${String(MIN_PASSWORD_LENGTH)} characters` : '••••••••'}
                value={auth.password}
                onChange={event => {
                  auth.setPassword(event.target.value);
                }}
                onKeyDown={auth.onKeyDown}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={auth.showPassword ? 'Hide password' : 'Show password'}
                onClick={auth.toggleShowPassword}
              >
                {auth.showPassword ? <EyeOff /> : <Eye />}
              </Button>
            </div>
          </div>

          {isSignUp ? (
            <>
              {auth.password.length > 0 ? <StrengthMeter strength={auth.passwordCheck.strength} /> : null}
              <div className="space-y-1.5">
                <Label htmlFor={`${mode}-confirm`}>Repeat password</Label>
                <Input
                  id={`${mode}-confirm`}
                  type={auth.showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={auth.confirmPassword}
                  onChange={event => {
                    auth.setConfirmPassword(event.target.value);
                  }}
                  onKeyDown={auth.onKeyDown}
                />
              </div>
            </>
          ) : null}

          {auth.problem ? <p className="text-sm text-destructive">{auth.problem}</p> : null}

          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={auth.submit} disabled={!auth.canSubmit}>
              {auth.busy ? <Loader2 className="animate-spin" /> : isSignUp ? <UserPlus /> : <KeyRound />}
              {auth.busy ? 'Working…' : isSignUp ? 'Create account' : 'Sign in'}
            </Button>
            {isSignUp ? null : (
              <Button variant="link" size="sm" onClick={auth.resetPassword} disabled={auth.busy}>
                Forgot password?
              </Button>
            )}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
