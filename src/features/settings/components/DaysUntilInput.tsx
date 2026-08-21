import { Input, Label } from '@shared/ui';

import { type ExamDateState } from '../hooks/useExamDate.ts';

interface DaysUntilInputProps {
  readonly picker: ExamDateState;
  /** The trainer this date belongs to, so one page can carry several of these. */
  readonly name: string;
  readonly inputId: string;
}

/** "I have six weeks" is easier to type than a date, so both spellings are offered. */
const DaysUntilInput = ({ picker, name, inputId }: DaysUntilInputProps) => {
  const invalid = picker.daysError !== null && picker.daysInput !== '';
  const errorId = `${inputId}-error`;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={inputId} className="text-xs font-normal text-muted-foreground">
        …or days from today ({picker.minDays}–{picker.maxDays})
      </Label>
      <Input
        id={inputId}
        /* The visible caption is the same on every trainer's column, so the accessible
           name names the trainer too — three fields called "days from today" cannot be
           told apart by a screen reader. */
        aria-label={`${name} — days from today`}
        type="number"
        inputMode="numeric"
        min={picker.minDays}
        max={picker.maxDays}
        step={1}
        value={picker.daysInput}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        onChange={event => {
          picker.setDaysInput(event.target.value);
        }}
        onBlur={picker.revertDaysInput}
      />
      {invalid ? (
        <p id={errorId} className="text-xs text-destructive" role="alert">
          {picker.daysError}
        </p>
      ) : null}
    </div>
  );
};

export default DaysUntilInput;
