import { CalendarCheck } from 'lucide-react';

import { cn } from '@shared/lib/cn.ts';
import { Badge } from '@shared/ui';

import { type useLevelPlan } from '@features/level-trainer/hooks/useLevelPlan.ts';
import { type LevelLearnSlotGroup } from '@features/level-trainer/hooks/useScheduledLevelLearn.ts';

import CurriculumDayCard from './CurriculumDayCard.tsx';

interface CurriculumSlotSectionProps {
  readonly group: LevelLearnSlotGroup;
  readonly plan: ReturnType<typeof useLevelPlan>;
}

/** One scheduled slot: its heading, kind badge and the day cards it contains. */
const CurriculumSlotSection = ({ group, plan }: CurriculumSlotSectionProps) => (
  <section className="space-y-3">
    <div className="flex flex-wrap items-center gap-2">
      <h3
        className={cn(
          'flex items-center gap-1.5 text-sm font-semibold',
          group.isToday ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {group.isToday ? <CalendarCheck className="size-4 text-primary" aria-hidden /> : null}
        {group.heading}
      </h3>
      <Badge variant={group.isToday ? 'default' : 'outline'}>{group.kindLabel}</Badge>
      {group.days.length > 1 ? (
        <Badge variant="warning">{group.days.length} lessons — a long day</Badge>
      ) : null}
    </div>
    <div className="space-y-4">
      {group.days.map(day => (
        <CurriculumDayCard
          key={day.day}
          day={day}
          complete={plan.isDayComplete(day.day)}
          isTaskDone={index => plan.isTaskDone(day.day, index)}
          onToggleTask={(index, done) => {
            plan.toggleTask(day.day, index, done);
          }}
        />
      ))}
    </div>
  </section>
);

export default CurriculumSlotSection;
