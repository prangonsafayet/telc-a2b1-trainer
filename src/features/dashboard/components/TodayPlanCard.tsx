import { BookOpen, CalendarCheck, Coffee, PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import { type TodayPlan } from '../hooks/useTodayPlan.ts';

interface TodayPlanCardProps {
  readonly plan: TodayPlan;
  readonly onStartExam: (examId: number) => void;
}

/** The one card that answers "what do I do today?" without any reading. */
export function TodayPlanCard({ plan, onStartExam }: TodayPlanCardProps) {
  return (
    <Card className="animate-pop-in mb-6 border-l-4 border-l-primary shadow-md">
      <CardHeader>
        <div className="flex flex-wrap items-center gap-2">
          <CardTitle className="flex items-center gap-1.5">
            <CalendarCheck className="size-4 text-primary" aria-hidden />
            Today&apos;s plan
          </CardTitle>
          <Badge variant="secondary">{plan.heading}</Badge>
          <Badge variant="outline">{plan.kindLabel}</Badge>
        </div>
        <CardDescription>
          {plan.isRest
            ? 'A review day: no new material. Re-read your cheatsheets, redo the items you got wrong, and rest.'
            : 'Everything the plan asks of you today.'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {plan.lessons.length > 0 ? (
          <div className="space-y-2">
            {plan.lessons.map(day => (
              <div key={day.day} className="flex flex-wrap items-center gap-2 text-sm">
                <BookOpen className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                <span>
                  Day {day.day}: <b className="font-medium">{day.title}</b>
                </span>
                <Badge variant="secondary">{day.focus}</Badge>
              </div>
            ))}
          </div>
        ) : null}

        {plan.exams.length > 0 ? (
          <div className="space-y-2">
            {plan.exams.map(exam => (
              <div key={exam.id} className="flex flex-wrap items-center gap-2 text-sm">
                <span className="grow">
                  <b className="font-medium">{exam.title}</b> — {exam.theme}
                </span>
                <Button
                  size="sm"
                  onClick={() => {
                    onStartExam(exam.id);
                  }}
                >
                  <PlayCircle /> Start
                </Button>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {plan.lessons.length > 0 ? (
            <Button asChild size="sm" variant="outline">
              <Link to="/learn">
                <BookOpen /> Open today&apos;s lessons
              </Link>
            </Button>
          ) : null}
          {plan.isRest ? (
            <Button asChild size="sm" variant="outline">
              <Link to="/learn">
                <Coffee /> Review the cheatsheets
              </Link>
            </Button>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
