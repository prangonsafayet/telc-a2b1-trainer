import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@shared/lib/cn.ts';

export function Skeleton({ className, ...props }: ComponentPropsWithoutRef<'div'>) {
  return (
    <div data-slot="skeleton" className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
  );
}
