import { useState } from 'react';
import { Check, Cloud, CloudOff, Loader2, LogOut, Mail, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { diagnostics } from '@/lib/sync.js';
import { useSync } from '@/lib/sync-context.jsx';

export default function SyncPanel() {
  const sync = useSync();
  const [email, setEmail] = useState('');

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
            You will get an email with a login link — no password needed. After signing in, every attempt syncs
            automatically.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {window.location.protocol === 'file:' ? (
            <p className="text-sm text-destructive">
              ⚠ You opened the app as a file. The email login link cannot bring you back here — use your hosted URL (or
              http://localhost) to sign in.
            </p>
          ) : null}
          <form
            className="flex flex-wrap gap-2"
            onSubmit={e => { e.preventDefault(); if (email.trim()) sync.sendMagicLink(email.trim()); }}
          >
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="max-w-xs"
            />
            <Button type="submit" disabled={sync.sendingLink || !email.trim()}>
              {sync.sendingLink ? <Loader2 className="animate-spin" /> : <Mail />}
              {sync.sendingLink ? 'Sending…' : 'Send magic link'}
            </Button>
          </form>
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
          Signed in as <b>{sync.user.email}</b>. Progress auto-syncs after every change.
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
