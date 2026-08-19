import { TriangleAlert } from 'lucide-react';

import { useExamDate } from '../hooks/useExamDate.ts';

import { DaysUntilInput } from './DaysUntilInput.tsx';
import { ExamDatePicker } from './ExamDatePicker.tsx';

interface ExamDateControlsProps {
  /** `YYYY-MM-DD`, interpreted in local time. */
  readonly value: string;
  readonly onChange: (iso: string) => void;
}

/** The exam date, the runway in days, and what the two of them do to the plan. */
export const ExamDateControls = ({ value, onChange }: ExamDateControlsProps) => {
  const picker = useExamDate(value, onChange);

  return (
    <div className="space-y-2">
      <ExamDatePicker picker={picker} />
      <DaysUntilInput picker={picker} />

      {picker.countdownHint ? <p className="text-xs text-muted-foreground">{picker.countdownHint}</p> : null}
      {picker.planHint ? <p className="text-xs text-muted-foreground">{picker.planHint}</p> : null}
      {picker.rangeWarning ? (
        <p className="flex items-start gap-1.5 text-xs text-[color:var(--warning)]">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          <span>{picker.rangeWarning}</span>
        </p>
      ) : null}
    </div>
  );
};
