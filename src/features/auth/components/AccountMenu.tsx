import {
  Cloud,
  CloudOff,
  HardDrive,
  LogIn,
  LogOut,
  RefreshCw,
  Settings2,
  TriangleAlert,
  User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/shared/components/ui/dropdown-menu.tsx';
import { cn } from '@/shared/lib/cn.ts';

import { useAccountIdentity } from '../hooks/use-account-identity.ts';
import { useSync } from '../hooks/use-sync.ts';

/**
 * Always-visible account state. Whether progress leaves this browser is the one thing a
 * user must never have to guess about, so it sits in the header on every page.
 */
export function AccountMenu() {
  const sync = useSync();
  const identity = useAccountIdentity();
  const navigate = useNavigate();

  const StatusIcon = !identity.configured ? HardDrive : identity.signedIn ? Cloud : CloudOff;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'max-w-56 gap-1.5',
            !identity.signedIn && 'border-[color:var(--warning)]/60 text-[color:var(--warning-foreground)]'
          )}
        >
          {identity.signedIn && identity.avatarUrl ? (
            <Avatar className="size-5">
              <AvatarImage src={identity.avatarUrl} alt="" />
              <AvatarFallback>{identity.displayName.slice(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
          ) : (
            <StatusIcon className="size-3.5" />
          )}
          <span className="truncate">{identity.statusLabel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-72">
        {identity.signedIn ? (
          <>
            <DropdownMenuLabel className="flex items-start gap-2 font-normal">
              {identity.avatarUrl ? (
                <Avatar className="mt-0.5">
                  <AvatarImage src={identity.avatarUrl} alt="" />
                  <AvatarFallback>{identity.displayName.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
              ) : (
                <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              )}
              <span className="min-w-0">
                <span className="block truncate font-medium">{identity.displayName}</span>
                {identity.email && identity.email !== identity.displayName ? (
                  <span className="block truncate text-xs text-muted-foreground">{identity.email}</span>
                ) : null}
                {identity.providerLabel ? (
                  <span className="block text-xs capitalize text-muted-foreground">
                    via {identity.providerLabel}
                  </span>
                ) : null}
                <span className="mt-1 block text-xs text-muted-foreground">{identity.lastSyncedLabel}</span>
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => void sync.fullSync({ announce: true })} disabled={sync.syncing}>
              <RefreshCw className={cn(sync.syncing && 'animate-spin')} />{' '}
              {sync.syncing ? 'Syncing…' : 'Sync now'}
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() => {
                void navigate('/settings');
              }}
            >
              <Settings2 /> Sync settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => void sync.signOut()}>
              <LogOut /> Sign out
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel className="flex items-start gap-2 font-normal">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[color:var(--warning-foreground)]" />
              <span className="text-xs font-normal leading-relaxed text-muted-foreground">
                Your progress is saved <b className="text-foreground">only in this browser</b>. Clearing site
                data, using private browsing, or switching to another device or browser will lose it.
                {identity.configured
                  ? ' Sign in to back it up and sync across devices.'
                  : ' Cloud sync is not configured for this build.'}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {identity.configured ? (
              <DropdownMenuItem
                onSelect={() => {
                  void navigate('/settings');
                }}
              >
                <LogIn /> Sign in to sync
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem asChild>
              <Link to="/history">
                <HardDrive /> Export a backup file
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
