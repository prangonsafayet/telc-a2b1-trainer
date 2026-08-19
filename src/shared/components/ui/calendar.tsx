import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from 'lucide-react';
import { DayPicker, type ChevronProps, type DropdownProps } from 'react-day-picker';
import { de } from 'react-day-picker/locale';

import { buttonVariants } from '@/shared/components/ui/button.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select.tsx';
import { cn } from '@/shared/lib/cn.ts';
import { optional } from '@/shared/lib/optional-props.ts';

const CHEVRONS = { left: ChevronLeft, right: ChevronRight, up: ChevronUp, down: ChevronDown } as const;

function Chevron({ orientation = 'right', className }: ChevronProps) {
  const Icon = CHEVRONS[orientation];
  return <Icon className={cn('size-4', className)} />;
}

/**
 * react-day-picker ships the month/year pickers as a transparent native `<select>` laid
 * over a text label — invisible to the design system and impossible to style. This swaps
 * in a real shadcn Select and hands the change back in the shape day-picker expects.
 */
function Dropdown({ options = [], value, onChange, 'aria-label': ariaLabel, disabled }: DropdownProps) {
  return (
    <Select
      {...optional('value', value == null ? undefined : String(value))}
      {...optional('disabled', disabled)}
      onValueChange={next => {
        onChange?.({ target: { value: next } } as unknown as React.ChangeEvent<HTMLSelectElement>);
      }}
    >
      <SelectTrigger
        size="sm"
        aria-label={ariaLabel}
        className="h-8 gap-1 border-transparent bg-transparent px-2 font-medium shadow-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent data-[state=open]:bg-accent"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-64">
        {options.map(option => (
          <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'dropdown',
  ...props
}: CalendarProps) {
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
          'hover:scale-105 hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-hidden focus-visible:ring-[3px] focus-visible:ring-ring/50',
          'active:scale-95'
        ),
        selected:
          '[&>button]:bg-primary [&>button]:font-semibold [&>button]:text-primary-foreground [&>button]:shadow-sm [&>button]:animate-[pop-in_180ms_ease-out] [&>button:hover]:bg-primary [&>button:hover]:text-primary-foreground',
        today: '[&>button]:font-semibold [&>button]:ring-1 [&>button]:ring-primary/50',
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
