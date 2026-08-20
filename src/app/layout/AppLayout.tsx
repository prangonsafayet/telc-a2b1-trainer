import { useEffect } from 'react';

import { CloudOff } from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { ErrorBoundary, Logo, ThemeToggle } from '@shared/components';
import { APP_NAME, TRAINERS, trainerFromPath, trainerHome } from '@shared/config/trainers.ts';
import { stopSpeech } from '@shared/lib/speech.ts';
import { Badge } from '@shared/ui';

import { AccountMenu, SyncContext, useCloudSync } from '@features/auth';
import { useProgress, useTrainerSlice } from '@features/progress';

import AppFooter from './AppFooter.tsx';
import ExamCountdownBadge from './ExamCountdownBadge.tsx';
import MainNav from './MainNav.tsx';
import TrainerSwitcher from './TrainerSwitcher.tsx';
import { useHeaderHeight } from './useHeaderHeight.ts';

const AppLayout = () => {
  const { db, dbRef, replaceLocal } = useProgress();
  const sync = useCloudSync({ dbRef, replaceLocal, updatedAt: db._updatedAt });
  const { pathname } = useLocation();
  const headerRef = useHeaderHeight<HTMLElement>();

  /* The header follows the active trainer: name, countdown and nav all switch with it. */
  const trainer = TRAINERS[trainerFromPath(pathname)];
  const { settings } = useTrainerSlice(trainer.id);

  /* Every navigation starts at the top and with the speaker silent. */
  useEffect(() => {
    stopSpeech();
    window.scrollTo(0, 0);
  }, [pathname]);

  const offline = sync.chip?.text.includes('offline') ?? false;

  return (
    <SyncContext.Provider value={sync}>
      <div className="min-h-screen bg-background">
        <header
          ref={headerRef}
          className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70"
        >
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
            <NavLink
              to={trainerHome(trainer.id)}
              className="group flex items-center gap-2.5 leading-tight"
              aria-label={`${APP_NAME} — dashboard`}
            >
              <Logo className="size-9 shrink-0 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105" />
              <span>
                <span className="block text-base font-bold tracking-tight">{APP_NAME}</span>
                <span className="hidden text-xs text-muted-foreground sm:block">{trainer.name}</span>
              </span>
            </NavLink>

            <div className="mr-auto">
              <TrainerSwitcher />
            </div>

            <ExamCountdownBadge examDate={settings.examDate} />

            {offline ? (
              <Badge variant="warning" className="gap-1.5 py-1" title={sync.chip?.title}>
                <CloudOff className="size-3" aria-hidden /> offline
              </Badge>
            ) : null}

            <AccountMenu />
            <ThemeToggle />
            <MainNav />
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6">
          <ErrorBoundary resetKey={pathname}>
            {/* Re-keying on the path restarts the entrance animation for each screen. */}
            <div key={pathname} className="animate-fade-up">
              <Outlet />
            </div>
          </ErrorBoundary>
        </main>

        <AppFooter />
      </div>
    </SyncContext.Provider>
  );
};

export default AppLayout;
