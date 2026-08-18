import * as React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { de } from 'react-day-picker/locale';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';

const CHEVRONS = { left: ChevronLeft, right: ChevronRight, up: ChevronUp, down: ChevronDown };

function Chevron({ orientation = 'right', className, size, ...props }) {
  const Icon = CHEVRONS[orientation] ?? ChevronRight;
  return <Icon className={cn('size-4', className)} {...props} />;
}

/* react-day-picker ships the month/year pickers as a transparent native <select> laid
   over a text label. That is invisible to styling and looks broken next to the rest of
   the UI, so swap in a real shadcn Select and hand the change back in the shape
   day-picker expects. */
function Dropdown({ options = [], value, onChange, 'aria-label': ariaLabel, disabled }) {
  const handle = next => onChange?.({ target: { value: next } });
  return (
    <Select value={String(value)} onValueChange={handle} disabled={disabled}>
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel}
        className="h-8 gap-1 border-transparent bg-transparent px-2 font-medium shadow-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent data-[state=open]:bg-accent"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {options.map(o => (
          <SelectItem key={o.value} value={String(o.value)} disabled={o.disabled}>
            {o.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function Calendar({ className, classNames, showOutsideDays = true, captionLayout = 'dropdown', ...props }) {
  return (
    <DayPicker
      locale={de}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn('p-3', className)}
      classNames={{
        root: 'relative',
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'flex flex-col gap-3',
        month_caption: 'flex h-9 items-center',
        caption_label: 'text-sm font-semibold',
        dropdowns: 'flex items-center gap-1',
        dropdown_root: '',
        nav: 'absolute right-3 top-3 z-10 flex items-center gap-1',
        button_previous: cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'size-8 opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30'
        ),
        button_next: cn(
          buttonVariants({ variant: 'ghost', size: 'icon' }),
          'size-8 opacity-70 transition-opacity hover:opacity-100 disabled:opacity-30'
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'w-9 text-[0.7rem] font-medium uppercase tracking-wide text-muted-foreground',
        week: 'mt-1 flex w-full',
        day: 'relative size-9 p-0 text-center text-sm',
        day_button: cn(
          'inline-flex size-9 items-center justify-center rounded-md font-normal transition-all',
          'hover:bg-accent hover:text-accent-foreground hover:scale-105',
          'focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'active:scale-95'
        ),
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:font-semibold [&>button]:shadow-sm [&>button:hover]:bg-primary [&>button:hover]:text-primary-foreground [&>button]:animate-[pop-in_180ms_ease-out]',
        today: '[&>button]:ring-1 [&>button]:ring-primary/50 [&>button]:font-semibold',
        outside: '[&>button]:text-muted-foreground/50',
        disabled: '[&>button]:pointer-events-none [&>button]:text-muted-foreground/40',
        hidden: 'invisible',
        ...classNames
      }}
      components={{ Chevron, Dropdown }}
      {...props}
    />
  );
}

export { Calendar };
