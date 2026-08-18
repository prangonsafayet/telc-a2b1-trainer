import { useState } from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Calendar } from '@/components/ui/calendar.jsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.jsx';
import { cn } from '@/lib/utils';

/* The exam date is stored as a plain "YYYY-MM-DD" string. Parsing it with `new Date()`
   would read it as UTC midnight and shift the day backwards west of Greenwich, so build
   and format the date in local time explicitly. */
export function parseISODate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function toISODate(date) {
  const pad = n => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function daysUntil(iso) {
  const d = parseISODate(iso);
  if (!d) return null;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.round((d - today) / 86400000);
}

export default function ExamDatePicker({ value, onChange, id }) {
  const [open, setOpen] = useState(false);
  const selected = parseISODate(value);
  const days = daysUntil(value);

  const label = selected
    ? selected.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })
    : 'Pick your exam date';

  return (
    <div className="space-y-1.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            className={cn('w-full justify-start gap-2 font-normal', !selected && 'text-muted-foreground')}
          >
            <CalendarDays className="size-4 shrink-0" />
            <span className="truncate">{label}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <Calendar
            mode="single"
            required
            selected={selected ?? undefined}
            defaultMonth={selected ?? undefined}
            startMonth={new Date(new Date().getFullYear() - 1, 0)}
            endMonth={new Date(new Date().getFullYear() + 5, 11)}
            onSelect={date => {
              if (!date) return;
              onChange(toISODate(date));
              setOpen(false);
            }}
          />
          <div className="border-t p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => { onChange(toISODate(new Date())); setOpen(false); }}
            >
              Today
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      {days != null ? (
        <p className="text-xs text-muted-foreground">
          {days > 0
            ? `${days} day${days === 1 ? '' : 's'} to go — the countdown in the header follows this date.`
            : days === 0
              ? 'That is today. Viel Erfolg! 🍀'
              : `That was ${Math.abs(days)} day${Math.abs(days) === 1 ? '' : 's'} ago — pick a new date.`}
        </p>
      ) : null}
    </div>
  );
}
