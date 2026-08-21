import { Cloud, Loader2, LogOut, RefreshCw } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import { useSync } from '@features/auth/hooks/useSync.ts';

/** The signed-in state: who is synced, when, and the sync-now / sign-out actions. */
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

export default ActiveCard;
