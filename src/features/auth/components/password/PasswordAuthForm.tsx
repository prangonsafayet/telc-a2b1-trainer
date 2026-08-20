import { Eye, EyeOff, KeyRound, Loader2, UserPlus } from 'lucide-react';

import { Button, Input, Label, Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui';

import { usePasswordAuth, type AuthMode } from '@features/auth/hooks/usePasswordAuth.ts';
import { MIN_PASSWORD_LENGTH } from '@features/auth/lib/passwordPolicy.ts';

import SignUpNotice from './SignUpNotice.tsx';
import StrengthMeter from './StrengthMeter.tsx';

/** Email + password sign-in and sign-up, as two tabs over one form. */
const PasswordAuthForm = () => {
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

export default PasswordAuthForm;
