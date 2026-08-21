import { Crosshair, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

import { type WeakAreaModel } from '../types/dashboard.ts';

interface WeakAreasCardProps {
  readonly areas: readonly WeakAreaModel[];
}

const SHOWN = 4;

/** The weakest categories and exam sections, each with a one-tap drill. */
const WeakAreasCard = ({ areas }: WeakAreasCardProps) => {
  if (areas.length === 0) return null;

  return (
    <Card className="animate-fade-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <TrendingDown className="size-4 text-destructive" aria-hidden /> Weak areas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {areas.slice(0, SHOWN).map(area => (
          <div key={area.key} className="flex flex-wrap items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">{area.label}</span>
                <Badge variant="destructive" className="tabular-nums">
                  {Math.round(area.severity * 100)}%
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{area.detail}</p>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link to={area.to}>
                <Crosshair /> {area.actionLabel}
              </Link>
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WeakAreasCard;
