import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@shared/lib/cn.ts';

type DivProps = ComponentPropsWithoutRef<'div'>;

function makeCardPart(slot: string, base: string, displayName: string) {
  const Part = forwardRef<HTMLDivElement, DivProps>(function CardPart({ className, ...props }, ref) {
    return <div ref={ref} data-slot={slot} className={cn(base, className)} {...props} />;
  });
  Part.displayName = displayName;
  return Part;
}

export const Card = makeCardPart(
  'card',
  'flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm',
  'Card'
);
export const CardHeader = makeCardPart('card-header', 'flex flex-col gap-1.5 px-6', 'CardHeader');
export const CardTitle = makeCardPart('card-title', 'font-semibold leading-none', 'CardTitle');
export const CardDescription = makeCardPart(
  'card-description',
  'text-sm text-muted-foreground',
  'CardDescription'
);
export const CardAction = makeCardPart(
  'card-action',
  'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
  'CardAction'
);
export const CardContent = makeCardPart('card-content', 'px-6', 'CardContent');
export const CardFooter = makeCardPart('card-footer', 'flex items-center px-6', 'CardFooter');
