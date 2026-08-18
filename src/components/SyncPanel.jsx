import { useState } from 'react';
import { Cloud, CloudOff, Loader2, LogOut, Mail, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Input } from '@/components/ui/input.jsx';
import { rawUrl, urlValid } from '@/lib/sync.js';
import { useSync } from '@/lib/sync-context.jsx';

export default function SyncPanel() {
  const sync = useSync();
  const [email, setEmail] = useState('');

  if (!sync.configured) {
    const misconfigured = rawUrl && !urlValid;
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudOff className="size-4" /> Cloud sync — {misconfigured ? 'configuration error' : 'not configured'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          {misconfigured ? (
            <>
              <p className="text-destructive">
                The <code>supabaseUrl</code> in <code>src/lib/sync-config.js</code> doesn't look like a project URL:{' '}
                <code>{rawUrl}</code>
              </p>
              <p>
                It must be exactly <code>https://&lt;project-ref&gt;.supabase.co</code> — nothing after ".supabase.co", no
                dashboard link. Find it in Supabase under <b>Project Settings → Data API → Project URL</b>, fix the file,
                and redeploy.
              </p>
            </>
          ) : (
            <p>
              Your progress is currently saved only in this browser. To sync it to a free cloud database (so it survives
              browser cleanups and follows you across devices), follow <b>HOSTING.md → Part 1</b>: create a free Supabase
              project, run the SQL setup, and set <code>VITE_SUPABASE_URL</code> / <code>VITE_SUPABASE_ANON_KEY</code>{' '}
              (or edit <code>src/lib/sync-config.js</code>).
            </p>
          )}
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
