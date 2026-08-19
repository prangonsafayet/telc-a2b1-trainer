import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';

import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@shared/lib/cn.ts';

export interface ProgressProps extends ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /** Styles the filled portion — used to tone bars by score. */
  readonly indicatorClassName?: string;
}

export const Progress = forwardRef<ComponentRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  function Progress({ className, value, indicatorClassName, ...props }, ref) {
    return (
      <ProgressPrimitive.Root
        ref={ref}
        data-slot="progress"
        value={value}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-secondary', className)}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn('h-full w-full flex-1 bg-primary transition-all', indicatorClassName)}
          style={{ transform: `translateX(-${String(100 - (value ?? 0))}%)` }}
        />
      </ProgressPrimitive.Root>
    );
  }
);
