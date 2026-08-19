import { CalendarDays } from 'lucide-react';

import { cn } from '@shared/lib/cn.ts';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@shared/ui';

import { type ExamDateState } from '../hooks/useExamDate.ts';

interface ExamDatePickerProps {
  readonly picker: ExamDateState;
}

/** The calendar half of the exam-date controls, limited to the plannable window. */
export function ExamDatePicker({ picker }: ExamDatePickerProps) {
  return (
    <Popover open={picker.open} onOpenChange={picker.setOpen}>
      <PopoverTrigger asChild>
        <Button
          /* Names the control and its current value in one string: a wrapping
             <label htmlFor> would replace this with the caption alone. */
          aria-label={`Your exam date: ${picker.label}`}
          variant="outline"
          className={cn(
            'w-full justify-start gap-2 font-normal',
            !picker.selected && 'text-muted-foreground'
          )}
        >
          <CalendarDays className="size-4 shrink-0" aria-hidden />
          <span className="truncate">{picker.label}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Calendar
          mode="single"
          required
          /* `required` makes `selected` a required-but-nullable prop, so it is passed
             explicitly rather than conditionally spread. */
          selected={picker.selected}
          defaultMonth={picker.selected ?? picker.earliest}
          startMonth={picker.startMonth}
          endMonth={picker.endMonth}
          /* Days outside the plannable window stay visible but unpickable: seeing why the
             range ends is more useful than a calendar that simply has no such days. */
          disabled={{ before: picker.earliest, after: picker.latest }}
          onSelect={picker.select}
        />
        <div className="border-t p-2">
          <Button variant="ghost" size="sm" className="w-full" onClick={picker.selectDefaultRunway}>
            +30 days from today
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
