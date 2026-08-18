import { useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, CalendarClock, CloudOff, GraduationCap, History, LayoutDashboard, Settings2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge.jsx';
import AccountMenu from '@/components/AccountMenu.jsx';
import ErrorBoundary from '@/components/ErrorBoundary.jsx';
import { ThemeToggle } from '@/components/ThemeToggle.jsx';
import { useDB } from '@/lib/store.jsx';
import { useCloudSync } from '@/lib/sync.js';
import { SyncContext } from '@/lib/sync-context.jsx';
import { stopSpeech } from '@/lib/tts.js';
import { cn } from '@/lib/utils';

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/guide', label: 'Exam Guide', icon: BookOpen },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings2 }
];

function Countdown({ examDate }) {
  const d = new Date(examDate + 'T09:00:00');
  const days = Math.ceil((d - new Date()) / 86400000);
  if (isNaN(days)) return null;
  return (
    <Badge variant={days < 0 ? 'warning' : days <= 14 ? 'destructive' : 'secondary'} className="gap-1.5 py-1">
      <CalendarClock className="size-3" />
      {days >= 0 ? (
        <span>
          {d.toLocaleDateString('de-DE')} · <b>{days} day{days === 1 ? '' : 's'} left</b>
        </span>
      ) : (
        <span>Exam date passed — update it in Settings</span>
      )}
    </Badge>
  );
}

export default function Layout() {
  const { db, dbRef, replaceLocal } = useDB();
  const sync = useCloudSync({ dbRef, replaceLocal, updatedAt: db._updatedAt });
  const { pathname } = useLocation();
  const headerRef = useRef(null);

  /* Every navigation starts at the top and with the speaker silent. */
  useEffect(() => {
    stopSpeech();
    window.scrollTo(0, 0);
  }, [pathname]);

  /* Publish the real header height so the exam module's sticky toolbar can sit
     right beneath it — the header wraps to two rows on narrow screens. */
  useEffect(() => {
    const el = headerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const apply = () => document.documentElement.style.setProperty('--header-h', `${el.offsetHeight}px`);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const offline = sync.chip && sync.chip.text.includes('offline');

  return (
    <SyncContext.Provider value={sync}>
      <div className="min-h-screen bg-background">
        <header ref={headerRef} className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 sm:px-6">
            <NavLink to="/" className="mr-auto leading-tight">
              <div className="text-base font-bold tracking-tight">telc Deutsch A2·B1 Trainer</div>
              <div className="hidden text-xs text-muted-foreground sm:block">
                10 Modelltests · Lesen · Sprachbausteine · Hören · Schreiben · Sprechen
              </div>
            </NavLink>

            <Countdown examDate={db.settings.examDate} />

            {offline ? (
              <Badge variant="warning" className="gap-1.5 py-1" title={sync.chip.title}>
                <CloudOff className="size-3" /> offline
              </Badge>
            ) : null}

            <AccountMenu />
            <ThemeToggle />

            <nav className="flex w-full flex-wrap gap-1 sm:w-auto">
              {NAV.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
                      isActive && 'bg-accent text-accent-foreground'
                    )
                  }
                >
                  <Icon className="size-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-24 pt-6 sm:px-6">
          <ErrorBoundary resetKey={pathname}>
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </SyncContext.Provider>
  );
}
