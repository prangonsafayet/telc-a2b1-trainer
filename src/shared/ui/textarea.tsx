import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@shared/lib/cn.ts';

export type TextareaProps = ComponentPropsWithoutRef<'textarea'>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      className={cn(
        'flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        className
      )}
      {...props}
    />
  );
});
