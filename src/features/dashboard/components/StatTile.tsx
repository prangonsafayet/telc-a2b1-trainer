import { type ReactNode } from 'react';

import { type LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@shared/ui';

interface StatTileProps {
  readonly label: string;
  readonly value: ReactNode;
  readonly caption: string;
  readonly icon: LucideIcon;
}

export const StatTile = ({ label, value, caption, icon: Icon }: StatTileProps) => (
  <Card className="card-hover gap-2 overflow-hidden py-4">
    <CardContent className="relative px-4">
      <Icon className="absolute right-0 top-0 size-10 text-primary/10" strokeWidth={1.5} aria-hidden />
      <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{caption}</div>
    </CardContent>
  </Card>
);
