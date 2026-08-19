import { Check, Cloud, CloudOff, Loader2, LockKeyhole, LogOut, RefreshCw, X } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Separator } from '@shared/ui';

import { useSync } from '../hooks/useSync.ts';
import { providerLabel } from '../lib/oauthProviders.ts';
import { syncDiagnostics } from '../lib/supabaseClient.ts';

import { PasswordAuthForm } from './PasswordAuthForm.tsx';
import { PROVIDER_ICONS } from './providerIconMap.ts';

const DiagnosticRow = ({
  label,
  ok,
  detail
}: {
  readonly label: string;
  readonly ok: boolean;
  readonly detail: string;
}) => (
  <li className="flex items-start gap-2">
    {ok ? (
      <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
    ) : (
      <X className="mt-0.5 size-4 shrink-0 text-destructive" />
    )}
    <span className="min-w-0">
      <code className="font-medium">{label}</code>
      <span className="block break-all text-xs text-muted-foreground">{detail}</span>
    </span>
  </li>
);

const NotConfiguredCard = () => {
  const d = syncDiagnostics;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CloudOff className="size-4" /> Cloud sync — not active
        </CardTitle>
        <CardDescription>
          Progress is saved in this browser only. Here is exactly what this build of the app was compiled
          with:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <ul className="space-y-1.5">
          <DiagnosticRow
            label="VITE_SUPABASE_URL"
            ok={d.urlPresent}
            detail={d.urlPresent ? d.projectUrl : 'not set in this build'}
          />
          <DiagnosticRow
            label="…is a valid project URL"
            ok={d.urlValid}
            detail={d.urlValid ? 'looks right' : 'must be https://<project-ref>.supabase.co'}
          />
          <DiagnosticRow
            label="VITE_SUPABASE_ANON_KEY"
            ok={d.keyPresent}
            detail={d.keyPresent ? d.keyPreview : 'not set in this build'}
          />
          <DiagnosticRow
            label="…is a publishable key"
            ok={d.keyLooksValid}
            detail={
              d.keyIsSecret
                ? 'this is a SECRET key — never ship it'
                : d.keyPresent
                  ? 'expected "sb_publishable_…" or "eyJ…"'
                  : '—'
            }
          />
        </ul>

        {d.keyIsSecret ? (
          <p className="rounded-md border-l-4 border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] p-3 text-destructive">
            <b>Stop.</b> That key is a service-role/secret key. It bypasses row-level security and must never
            be put in a browser app. Rotate it in Supabase, then use the <b>anon / publishable</b> key
            instead.
          </p>
        ) : (
          <div className="rounded-md border-l-4 border-primary bg-accent/40 p-3">
            <b>How to fix it</b>
            <p className="mt-1 text-muted-foreground">
              These values are baked in when the app is <i>built</i>, not read when it runs — so changing them
              always needs a rebuild.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                <b>Running locally?</b> Put them in <code>.env</code>, then <b>restart</b>{' '}
                <code>npm run dev</code>.
              </li>
              <li>
                <b>Deployed on Netlify?</b> Add them under <b>Site configuration → Environment variables</b>,
                then trigger a <b>new deploy</b>.
              </li>
              <li>
                <b>
                  Deployed by uploading <code>dist</code>?
                </b>{' '}
                Run <code>npm run build</code> again with <code>.env</code> in place and re-upload.
              </li>
            </ul>
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          Build mode: <code>{d.mode}</code>. Until sync is on, use <b>History → Export progress</b> to keep a
          backup.
        </p>
      </CardContent>
    </Card>
  );
};

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

const ActiveCard = () => {
  const sync = useSync();
  const meta = sync.user?.user_metadata as { full_name?: string; name?: string } | undefined;
  const displayName = meta?.full_name ?? meta?.name ?? sync.user?.email ?? '';
  const provider = sync.user?.app_metadata.provider;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Cloud className="size-4" /> Cloud sync — active
        </CardTitle>
        <CardDescription>
          Signed in as <b>{displayName}</b>
          {provider ? (
            <>
              {' '}
              via <span className="capitalize">{provider}</span>
            </>
          ) : null}
          . Progress auto-syncs after every change.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {sync.lastSyncedAt
            ? `Last synced: ${sync.lastSyncedAt.toLocaleString('de-DE')}`
            : 'Not synced yet this session.'}{' '}
          {sync.status}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => void sync.fullSync({ announce: true })}
            disabled={sync.syncing}
          >
            {sync.syncing ? <Loader2 className="animate-spin" /> : <RefreshCw />}
            {sync.syncing ? 'Syncing…' : 'Sync now'}
          </Button>
          <Button variant="ghost" onClick={() => void sync.signOut()} disabled={sync.syncing}>
            <LogOut /> Sign out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const SyncPanel = () => {
  const sync = useSync();
  if (!sync.configured) return <NotConfiguredCard />;
  if (!sync.user) return <SignInCard />;
  return <ActiveCard />;
};
