import { CalendarCheck } from 'lucide-react';

import { cn } from '@shared/lib/cn.ts';
import { Badge } from '@shared/ui';

import { type LearnPlanState } from '../hooks/useLearnPlan.ts';
import { type LearnSlotGroup } from '../hooks/useScheduledLearn.ts';

import LearnDayCard from './LearnDayCard.tsx';

interface LearnSlotSectionProps {
  readonly group: LearnSlotGroup;
  readonly plan: LearnPlanState;
}

/** One day of the plan: its date, what it is for, and the lessons it holds. */
const LearnSlotSection = ({ group, plan }: LearnSlotSectionProps) => (
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
        <LearnDayCard
          key={day.day}
          day={day}
          complete={plan.isDayComplete(day.day)}
          cheatsheets={plan.cheatsheets}
          isTaskDone={index => plan.isTaskDone(day.day, index)}
          onToggleTask={(index, done) => {
            plan.toggleTask(day.day, index, done);
          }}
        />
      ))}
    </div>
  </section>
);

export default LearnSlotSection;
