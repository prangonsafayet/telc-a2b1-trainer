import { Cloud, Loader2, LockKeyhole } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@shared/ui';

import { useSync } from '@features/auth/hooks/useSync.ts';
import { providerLabel } from '@features/auth/lib/oauthProviders.ts';

import PasswordAuthForm from '../password/PasswordAuthForm.tsx';
import { PROVIDER_ICONS } from '../providerIconMap.ts';

/** OAuth provider buttons plus the email/password fallback. */
const SignInCard = () => {
  const sync = useSync();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="size-4" /> Cloud sync — sign in
        </CardTitle>
        <CardDescription>
          Sign in with an account you already have. Your progress then syncs automatically after every change
          and follows you to any other device you sign in on.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {window.location.protocol === 'file:' ? (
          <p className="text-sm text-destructive">
            ⚠ You opened the app as a file. OAuth cannot redirect back to a local file — use your hosted URL
            or http://localhost.
          </p>
        ) : null}

        {sync.providers.length > 0 ? (
          <div className="grid gap-2 sm:max-w-sm">
            {sync.providers.map(provider => {
              const Icon = PROVIDER_ICONS[provider];
              const busy = sync.pendingProvider === provider;
              return (
                <Button
                  key={provider}
                  variant="outline"
                  className="h-11 justify-start gap-3 text-base"
                  disabled={sync.pendingProvider !== null}
                  onClick={() => void sync.signInWithProvider(provider)}
                >
                  {busy ? <Loader2 className="size-5 animate-spin" /> : <Icon className="size-5" />}
                  {busy ? 'Redirecting…' : `Continue with ${providerLabel(provider)}`}
                </Button>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-destructive">
            No OAuth providers are configured. Set <code>VITE_AUTH_PROVIDERS</code> (e.g.{' '}
            <code>google,github</code>) and rebuild.
          </p>
        )}

        <div className="flex items-center gap-3 py-1">
          <Separator className="flex-1" />
          <span className="text-xs uppercase tracking-wide text-muted-foreground">or</span>
          <Separator className="flex-1" />
        </div>

        <PasswordAuthForm />

        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
          We only receive your email address and name — never a password. Row-level security in Supabase means
          only your account can read your progress.
        </p>

        {sync.status ? <p className="text-sm text-muted-foreground">{sync.status}</p> : null}
      </CardContent>
    </Card>
  );
};

export default SignInCard;
