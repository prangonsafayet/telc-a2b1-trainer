import { Link } from 'react-router-dom';

import { Button, Card, CardContent, Progress } from '@shared/ui';

import { type MasteryModel } from '../types/dashboard.ts';

interface MasteryCardProps {
  readonly mastery: MasteryModel;
}

/** How far through its vocabulary and grammar bank a trainer is, with a way in. */
const MasteryCard = ({ mastery }: MasteryCardProps) => (
  <Card>
    <CardContent className="space-y-4">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">
          {mastery.mastered}/{mastery.total} items mastered
        </span>
        <span className="tabular-nums text-muted-foreground">{mastery.percent}%</span>
      </div>
      <Progress value={mastery.percent} />
      <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
        {mastery.categories.map(category => (
          <div key={category.key} className="flex items-center gap-3 text-sm">
            <span className="w-44 shrink-0">{category.label}</span>
            <Progress value={category.percent} className="h-1.5" />
            <span className="w-16 shrink-0 text-right tabular-nums text-muted-foreground">
              {category.mastered}/{category.total}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link to={mastery.practiceTo}>Open the practice hub ▸</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link to={mastery.learnTo}>Study plan ▸</Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default MasteryCard;
