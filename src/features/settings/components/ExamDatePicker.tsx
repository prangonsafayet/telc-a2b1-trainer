import { CalendarDays } from 'lucide-react';

import { cn } from '@shared/lib/cn.ts';
import { optional } from '@shared/lib/optionalProps.ts';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@shared/ui';

import { useExamDate } from '../hooks/useExamDate.ts';

interface ExamDatePickerProps {
  /** `YYYY-MM-DD`, interpreted in local time. */
  readonly value: string;
  readonly onChange: (iso: string) => void;
}

export function ExamDatePicker({ value, onChange }: ExamDatePickerProps) {
  const picker = useExamDate(value, onChange);

  return (
    <div className="space-y-1.5">
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
            {...optional('defaultMonth', picker.selected)}
            startMonth={picker.startMonth}
            endMonth={picker.endMonth}
            onSelect={picker.select}
          />
          <div className="border-t p-2">
            <Button variant="ghost" size="sm" className="w-full" onClick={picker.selectToday}>
              Today
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {picker.countdownHint ? <p className="text-xs text-muted-foreground">{picker.countdownHint}</p> : null}
    </div>
  );
}
