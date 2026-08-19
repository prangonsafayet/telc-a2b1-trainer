import { type ComponentPropsWithoutRef } from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@shared/lib/cn.ts';

const badgeVariants = cva(
  'inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors [&>svg]:size-3',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive:
          'border-transparent bg-[color-mix(in_oklab,var(--destructive)_14%,transparent)] text-destructive',
        outline: 'text-foreground',
        success:
          'border-transparent bg-[color-mix(in_oklab,var(--success)_16%,transparent)] text-[color:var(--success-foreground)]',
        warning:
          'border-transparent bg-[color-mix(in_oklab,var(--warning)_22%,transparent)] text-[color:var(--warning-foreground)]',
        info: 'border-transparent bg-accent text-accent-foreground'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>['variant']>;

export interface BadgeProps extends ComponentPropsWithoutRef<'span'>, VariantProps<typeof badgeVariants> {
  readonly asChild?: boolean;
}

export const Badge = ({ className, variant, asChild = false, ...props }: BadgeProps) => {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
};

export { badgeVariants };
