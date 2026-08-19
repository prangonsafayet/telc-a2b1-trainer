import { BookOpen, GraduationCap, History, LayoutDashboard, Settings2, type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@shared/lib/cn.ts';

interface NavEntry {
  readonly to: string;
  readonly label: string;
  readonly icon: LucideIcon;
}

const NAV_ENTRIES: readonly NavEntry[] = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/learn', label: 'Learn', icon: GraduationCap },
  { to: '/guide', label: 'Exam Guide', icon: BookOpen },
  { to: '/history', label: 'History', icon: History },
  { to: '/settings', label: 'Settings', icon: Settings2 }
];

export function MainNav() {
  return (
    <nav className="flex w-full flex-wrap gap-1 sm:w-auto" aria-label="Main">
      {NAV_ENTRIES.map(({ to, label, icon: Icon }) => (
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
          <Icon className="size-4" aria-hidden />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
