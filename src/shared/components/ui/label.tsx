import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';

import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/shared/lib/cn.ts';

export const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(function Label({ className, ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        'flex select-none items-center gap-2 text-sm font-medium leading-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
});
