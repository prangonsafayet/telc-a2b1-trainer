import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '@/shared/lib/cn.ts';

/** Content for screen readers only — used for labels that have a visual equivalent. */
export function VisuallyHidden({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span className={cn('sr-only', className)} {...props} />;
}
