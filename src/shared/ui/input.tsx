import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@shared/lib/cn.ts';

export type InputProps = ComponentPropsWithoutRef<'input'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] file:inline-flex file:border-0 file:bg-transparent file:text-sm file:font-medium selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20',
        className
      )}
      {...props}
    />
  );
});
