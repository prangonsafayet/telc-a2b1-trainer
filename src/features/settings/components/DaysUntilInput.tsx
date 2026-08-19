import { Input, Label } from '@shared/ui';

import { type ExamDateState } from '../hooks/useExamDate.ts';

interface DaysUntilInputProps {
  readonly picker: ExamDateState;
}

/** "I have six weeks" is easier to type than a date, so both spellings are offered. */
export function DaysUntilInput({ picker }: DaysUntilInputProps) {
  const invalid = picker.daysError !== null && picker.daysInput !== '';

  return (
    <div className="space-y-1.5">
      <Label htmlFor="days-until-exam" className="text-xs font-normal text-muted-foreground">
        …or days from today ({picker.minDays}–{picker.maxDays})
      </Label>
      <Input
        id="days-until-exam"
        type="number"
        inputMode="numeric"
        min={picker.minDays}
        max={picker.maxDays}
        step={1}
        value={picker.daysInput}
        aria-invalid={invalid}
        aria-describedby={invalid ? 'days-until-exam-error' : undefined}
        onChange={event => {
          picker.setDaysInput(event.target.value);
        }}
        onBlur={picker.revertDaysInput}
      />
      {invalid ? (
        <p id="days-until-exam-error" className="text-xs text-destructive" role="alert">
          {picker.daysError}
        </p>
      ) : null}
    </div>
  );
}
