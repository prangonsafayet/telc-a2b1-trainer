import { CalendarClock, ClipboardCheck, Flame, Layers, Trophy, type LucideIcon } from 'lucide-react';

import { CountedNumber } from '@shared/components';
import { Card, CardContent } from '@shared/ui';

import { type StatTileKind, type StatTileModel } from '../types/dashboard.ts';

interface StatTileProps {
  readonly tile: StatTileModel;
}

const ICONS: Readonly<Record<StatTileKind, LucideIcon>> = {
  streak: Flame,
  due: Layers,
  exams: ClipboardCheck,
  best: Trophy,
  last: CalendarClock
};

const StatTile = ({ tile }: StatTileProps) => {
  const Icon = ICONS[tile.kind];

  return (
    <Card className="card-hover gap-2 overflow-hidden py-4">
      <CardContent className="relative px-4">
        <Icon className="absolute right-0 top-0 size-10 text-primary/10" strokeWidth={1.5} aria-hidden />
        <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{tile.label}</div>
        <div className="mt-1 text-2xl font-bold tabular-nums">
          {typeof tile.value === 'number' ? (
            <CountedNumber value={tile.value} />
          ) : (
            <span className="text-lg">{tile.value}</span>
          )}
          {tile.suffix === null ? null : (
            <span className="text-base font-normal text-muted-foreground">{tile.suffix}</span>
          )}
        </div>
        <div className="mt-0.5 text-xs text-muted-foreground">{tile.caption}</div>
      </CardContent>
    </Card>
  );
};

export default StatTile;
