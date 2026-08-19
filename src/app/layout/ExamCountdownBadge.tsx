import { CalendarClock } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge.tsx';
import { daysUntil, parseIsoDate } from '@/shared/lib/format.ts';

interface ExamCountdownBadgeProps {
  /** `YYYY-MM-DD`. */
  readonly examDate: string;
}

/** Under two weeks out, the countdown turns urgent. */
const URGENT_DAYS = 14;

export function ExamCountdownBadge({ examDate }: ExamCountdownBadgeProps) {
  const date = parseIsoDate(examDate);
  const days = daysUntil(examDate);
  if (!date || days == null) return null;

  return (
    <Badge
      variant={days < 0 ? 'warning' : days <= URGENT_DAYS ? 'destructive' : 'secondary'}
      className="gap-1.5 py-1"
    >
      <CalendarClock className="size-3" aria-hidden />
      {days >= 0 ? (
        <span>
          {date.toLocaleDateString('de-DE')} ·{' '}
          <b>
            {days} day{days === 1 ? '' : 's'} left
          </b>
        </span>
      ) : (
        <span>Exam date passed — update it in Settings</span>
      )}
    </Badge>
  );
}
