import { Check, Cloud, CloudOff, Loader2, LockKeyhole, LogOut, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { PROVIDER_ICONS } from '@/components/ProviderIcons.jsx';
import { PROVIDER_META, diagnostics } from '@/lib/sync.js';
import { useSync } from '@/lib/sync-context.jsx';

export default function SyncPanel() {
  const sync = useSync();

  if (!sync.configured) {
    const d = diagnostics;
    const rows = [
      ['VITE_SUPABASE_URL', d.urlPresent, d.urlPresent ? d.projectUrl : 'not set in this build'],
      ['…is a valid project URL', d.urlValid, d.urlValid ? 'looks right' : 'must be https://<project-ref>.supabase.co'],
      ['VITE_SUPABASE_ANON_KEY', d.keyPresent, d.keyPresent ? d.keyPreview : 'not set in this build'],
      ['…is a publishable key', d.keyLooksValid, d.keyIsSecret ? 'this is a SECRET key — never ship it' : d.keyPresent ? 'expected "sb_publishable_…" or "eyJ…"' : '—']
    ];

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudOff className="size-4" /> Cloud sync — not active
          </CardTitle>
          <CardDescription>
            Progress is saved in this browser only. Here is exactly what this build of the app was compiled with:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <ul className="space-y-1.5">
            {rows.map(([label, ok, detail]) => (
              <li key={label} className="flex items-start gap-2">
                {ok
                  ? <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
                  : <X className="mt-0.5 size-4 shrink-0 text-destructive" />}
                <span className="min-w-0">
                  <code className="font-medium">{label}</code>
                  <span className="block break-all text-xs text-muted-foreground">{detail}</span>
                </span>
              </li>
            ))}
          </ul>

          {d.keyIsSecret ? (
            <p className="rounded-md border-l-4 border-destructive bg-[color-mix(in_oklab,var(--destructive)_10%,transparent)] p-3 text-destructive">
              <b>Stop.</b> That key is a service-role/secret key. It bypasses row-level security and must never be put in
              a browser app. Rotate it in Supabase, then use the <b>anon / publishable</b> key instead.
            </p>
          ) : (
            <div className="rounded-md border-l-4 border-primary bg-accent/40 p-3">
              <b>How to fix it</b>
              <p className="mt-1 text-muted-foreground">
                These values are baked in when the app is <i>built</i>, not read when it runs — so changing them always
                needs a rebuild.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                <li>
                  <b>Running locally?</b> Put them in <code>.env</code> in the project root, then <b>restart</b>{' '}
                  <code>npm run dev</code> — Vite only reads <code>.env</code> at startup.
                </li>
                <li>
                  <b>Deployed on Netlify?</b> Add them under <b>Site configuration → Environment variables</b>, then
                  trigger a <b>new deploy</b>. Adding variables alone does not update the already-built site.
                </li>
                <li>
                  <b>Deployed by dragging <code>dist</code>?</b> Run <code>npm run build</code> again locally with{' '}
                  <code>.env</code> in place, then re-upload the new <code>dist</code>.
                </li>
              </ul>
              <p className="mt-2 text-muted-foreground">
                Full walkthrough: <b>HOSTING.md → Part 1 and Part 2</b>.
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Build mode: <code>{d.mode}</code>. Until sync is on, use <b>History → Export progress</b> to keep a backup.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!sync.user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Cloud className="size-4" /> Cloud sync — sign in</CardTitle>
          <CardDescription>
            Sign in with an account you already have. Your progress then syncs automatically after every change and
            follows you to any other device you sign in on.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {window.location.protocol === 'file:' ? (
            <p className="text-sm text-destructive">
              ⚠ You opened the app as a file. OAuth cannot redirect back to a local file — use your hosted URL or
              http://localhost.
            </p>
          ) : null}

          {sync.providers.length ? (
            <div className="grid gap-2 sm:max-w-sm">
              {sync.providers.map(p => {
                const Icon = PROVIDER_ICONS[p];
                const busy = sync.pendingProvider === p;
                return (
                  <Button
                    key={p}
                    variant="outline"
                    className="h-11 justify-start gap-3 text-base"
                    disabled={!!sync.pendingProvider}
                    onClick={() => sync.signInWithProvider(p)}
                  >
                    {busy ? <Loader2 className="size-5 animate-spin" /> : <Icon className="size-5" />}
                    {busy ? 'Redirecting…' : `Continue with ${PROVIDER_META[p]?.label || p}`}
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

          <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
            <LockKeyhole className="mt-0.5 size-3.5 shrink-0" />
            We only receive your email address and name from the provider — never your password. Row-level security in
            Supabase means only your account can read your progress.
          </p>

          {sync.status ? <p className="text-sm text-muted-foreground">{sync.status}</p> : null}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Cloud className="size-4" /> Cloud sync — active</CardTitle>
        <CardDescription>
          Signed in as <b>{sync.user.user_metadata?.full_name || sync.user.user_metadata?.name || sync.user.email}</b>
          {sync.user.app_metadata?.provider ? <> via <span className="capitalize">{sync.user.app_metadata.provider}</span></> : null}.
          Progress auto-syncs after every change.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {sync.lastSyncedAt ? `Last synced: ${sync.lastSyncedAt.toLocaleString('de-DE')}` : 'Not synced yet this session.'}{' '}
          {sync.status}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => sync.fullSync({ announce: true })} disabled={sync.syncing}>
            {sync.syncing ? <Loader2 className="animate-spin" /> : <RefreshCw />}
            {sync.syncing ? 'Syncing…' : 'Sync now'}
          </Button>
          <Button variant="ghost" onClick={sync.signOut} disabled={sync.syncing}><LogOut /> Sign out</Button>
        </div>
      </CardContent>
    </Card>
  );
}
