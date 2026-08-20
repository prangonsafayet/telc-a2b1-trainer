import { CalendarCheck } from 'lucide-react';

import { A2B1_CURRICULUM } from '@content/trainers/a2b1/curriculum.ts';

import { cn } from '@shared/lib/cn.ts';
import { type LearnDay } from '@shared/types';
import { Badge } from '@shared/ui';

import { type LearnPlanState } from '../hooks/useLearnPlan.ts';

import LearnDayCard from './LearnDayCard.tsx';

interface LearnSlotSectionProps {
  readonly heading: string;
  readonly kindLabel: string;
  readonly isToday: boolean;
  readonly days: readonly LearnDay[];
  readonly plan: LearnPlanState;
}

/** One day of the plan: its date, what it is for, and the lessons it holds. */
const LearnSlotSection = ({ heading, kindLabel, isToday, days, plan }: LearnSlotSectionProps) => (
  <section className="space-y-3">
    <div className="flex flex-wrap items-center gap-2">
      <h3
        className={cn(
          'flex items-center gap-1.5 text-sm font-semibold',
          isToday ? 'text-foreground' : 'text-muted-foreground'
        )}
      >
        {isToday ? <CalendarCheck className="size-4 text-primary" aria-hidden /> : null}
        {heading}
      </h3>
      <Badge variant={isToday ? 'default' : 'outline'}>{kindLabel}</Badge>
      {days.length > 1 ? <Badge variant="warning">{days.length} lessons — a long day</Badge> : null}
    </div>

    <div className="space-y-4">
      {days.map(day => (
        <LearnDayCard
          key={day.day}
          day={day}
          complete={plan.isDayComplete(day.day)}
          cheatsheets={A2B1_CURRICULUM.cheatsheets}
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
