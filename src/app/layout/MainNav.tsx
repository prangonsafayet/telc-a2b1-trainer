import {
  BookOpen,
  GraduationCap,
  History,
  Layers,
  LayoutDashboard,
  Settings2,
  type LucideIcon
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import { hasGuide, TRAINER_ORDER, TRAINERS, trainerFromPath, trainerHome } from '@shared/config/trainers.ts';
import { cn } from '@shared/lib/cn.ts';
import { recordFrom } from '@shared/lib/records.ts';
import { type TrainerId } from '@shared/types';

interface NavEntry {
  readonly to: string;
  readonly label: string;
  readonly icon: LucideIcon;
  /** `end` on a base path, so the dashboard tab is not active on every child route. */
  readonly exact: boolean;
}

/**
 * The active trainer's tabs, generated from its descriptor: it gets a Guide tab if it ships
 * a guide, and Settings is shared by every trainer. Nothing here names a trainer.
 */
const entriesFor = (trainer: TrainerId): readonly NavEntry[] => {
  const base = TRAINERS[trainer].basePath;
  return [
    { to: trainerHome(trainer), label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { to: `${base}/learn`, label: 'Learn', icon: GraduationCap, exact: false },
    ...(hasGuide(trainer)
      ? [{ to: `${base}/guide`, label: 'Exam Guide', icon: BookOpen, exact: false }]
      : []),
    { to: `${base}/practice`, label: 'Practice', icon: Layers, exact: false },
    { to: `${base}/history`, label: 'History', icon: History, exact: false },
    { to: '/settings', label: 'Settings', icon: Settings2, exact: false }
  ];
};

const NAV_ENTRIES = recordFrom(TRAINER_ORDER, entriesFor);

const MainNav = () => {
  const { pathname } = useLocation();
  const trainer = trainerFromPath(pathname);

  return (
    <nav className="flex w-full flex-wrap gap-1 sm:w-auto" aria-label="Main">
      {NAV_ENTRIES[trainer].map(({ to, label, icon: Icon, exact }) => (
        <NavLink
          key={to}
          to={to}
          end={exact}
          className={({ isActive }) =>
            cn(
              'inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground',
              isActive && 'bg-accent text-accent-foreground'
            )
          }
        >
          <Icon className="size-4" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );
};

export default MainNav;
