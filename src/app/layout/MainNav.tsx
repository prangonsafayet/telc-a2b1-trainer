import {
  BookOpen,
  GraduationCap,
  History,
  LayoutDashboard,
  Layers,
  Settings2,
  type LucideIcon
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import { trainerFromPath } from '@shared/config/trainers.ts';
import { cn } from '@shared/lib/cn.ts';
import { type TrainerId } from '@shared/types';

interface NavEntry {
  readonly to: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

const levelEntries = (base: string): readonly NavEntry[] => [
  { to: base, label: 'Dashboard', icon: LayoutDashboard },
  { to: `${base}/learn`, label: 'Learn', icon: GraduationCap },
  { to: `${base}/practice`, label: 'Practice', icon: Layers },
  { to: `${base}/history`, label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings2 }
];

/** Each trainer gets its own tab set; Settings is shared by all three. */
const NAV_ENTRIES: Readonly<Record<TrainerId, readonly NavEntry[]>> = {
  a2b1: [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/learn', label: 'Learn', icon: GraduationCap },
    { to: '/guide', label: 'Exam Guide', icon: BookOpen },
    { to: '/history', label: 'History', icon: History },
    { to: '/settings', label: 'Settings', icon: Settings2 }
  ],
  b1: levelEntries('/b1'),
  b2: levelEntries('/b2')
};

const MainNav = () => {
  const { pathname } = useLocation();
  const trainer = trainerFromPath(pathname);

  return (
    <nav className="flex w-full flex-wrap gap-1 sm:w-auto" aria-label="Main">
      {NAV_ENTRIES[trainer].map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/' || to === '/b1' || to === '/b2'}
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
