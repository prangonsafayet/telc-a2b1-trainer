import { Link, useNavigate } from 'react-router-dom';
import { Cloud, CloudOff, HardDrive, LogIn, LogOut, RefreshCw, Settings2, TriangleAlert, User } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu.jsx';
import { useSync } from '@/lib/sync-context.jsx';
import { cn } from '@/lib/utils';

/* Always-visible account state. Whether or not progress leaves this browser is the one
   thing a user must never have to guess about, so it lives in the header on every page. */
export default function AccountMenu() {
  const sync = useSync();
  const navigate = useNavigate();
  const signedIn = sync.configured && !!sync.user;

  const label = !sync.configured ? 'Local only' : signedIn ? sync.user.email : 'Not signed in';
  const Icon = !sync.configured ? HardDrive : signedIn ? Cloud : CloudOff;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn('max-w-56 gap-1.5', !signedIn && 'border-[color:var(--warning)]/60 text-[color:var(--warning-foreground)]')}
        >
          <Icon className="size-3.5" />
          <span className="truncate">{label}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        {signedIn ? (
          <>
            <DropdownMenuLabel className="flex items-start gap-2 font-normal">
              <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              <span className="min-w-0">
                <span className="block truncate font-medium">{sync.user.email}</span>
                <span className="block text-xs text-muted-foreground">
                  {sync.lastSyncedAt
                    ? `Synced ${sync.lastSyncedAt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} — progress is backed up and follows you across devices.`
                    : 'Signed in — progress syncs automatically after each change.'}
                </span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => sync.fullSync({ announce: true })} disabled={sync.syncing}>
              <RefreshCw className={cn(sync.syncing && 'animate-spin')} /> {sync.syncing ? 'Syncing…' : 'Sync now'}
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => navigate('/settings')}>
              <Settings2 /> Sync settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={sync.signOut}>
              <LogOut /> Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="flex items-start gap-2 font-normal">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[color:var(--warning-foreground)]" />
              <span className="text-xs font-normal leading-relaxed text-muted-foreground">
                Your progress is saved <b className="text-foreground">only in this browser</b>. Clearing site data,
                using private browsing, or switching to another device or browser will lose it.
                {sync.configured
                  ? ' Sign in to back it up and sync across devices.'
                  : ' Cloud sync is not configured for this build — see HOSTING.md.'}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sync.configured ? (
              <DropdownMenuItem onSelect={() => navigate('/settings')}>
                <LogIn /> Sign in to sync
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem asChild>
              <Link to="/history"><HardDrive /> Export a backup file</Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
