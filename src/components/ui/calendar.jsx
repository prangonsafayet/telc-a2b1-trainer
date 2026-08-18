import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import { de } from 'react-day-picker/locale';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button.jsx';

/* react-day-picker v10 styled with the app's tokens. `captionLayout="dropdown"` gives
   month and year dropdowns, which matters here: an exam date can be a year out. */
function Calendar({ className, classNames, showOutsideDays = true, captionLayout = 'dropdown', ...props }) {
  return (
    <DayPicker
      locale={de}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col gap-4 sm:flex-row',
        month: 'flex flex-col gap-4',
        month_caption: 'flex h-9 items-center justify-center px-9',
        caption_label: 'text-sm font-medium',
        dropdowns: 'flex items-center justify-center gap-1.5 text-sm font-medium',
        dropdown_root: 'relative rounded-md border border-input shadow-xs',
        dropdown: 'absolute inset-0 cursor-pointer opacity-0',
        months_dropdown: '',
        years_dropdown: '',
        nav: 'flex items-center justify-between absolute inset-x-3 top-3 pointer-events-none',
        button_previous: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'pointer-events-auto size-7 p-0 opacity-60 hover:opacity-100 disabled:opacity-30'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline', size: 'icon' }),
          'pointer-events-auto size-7 p-0 opacity-60 hover:opacity-100 disabled:opacity-30'
        ),
        month_grid: 'w-full border-collapse',
        weekdays: 'flex',
        weekday: 'w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground',
        week: 'mt-1 flex w-full',
        day: 'relative size-9 p-0 text-center text-sm',
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-9 p-0 font-normal aria-selected:opacity-100'
        ),
        selected:
          '[&>button]:bg-primary [&>button]:text-primary-foreground [&>button:hover]:bg-primary [&>button:hover]:text-primary-foreground',
        today: '[&>button]:bg-accent [&>button]:text-accent-foreground',
        outside: 'text-muted-foreground/60',
        disabled: 'text-muted-foreground opacity-40',
        hidden: 'invisible',
        ...classNames
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === 'left'
            ? <ChevronLeft className="size-4" {...rest} />
            : <ChevronRight className="size-4" {...rest} />
      }}
      {...props}
    />
  );
}

export { Calendar };
