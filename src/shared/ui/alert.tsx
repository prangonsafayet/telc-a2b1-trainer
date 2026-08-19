import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/cn.ts';

const alertVariants = cva(
  'relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border border-l-4 px-4 py-3 text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:gap-x-3 [&>svg]:size-4 [&>svg]:translate-y-0.5',
  {
    variants: {
      variant: {
        default: 'border-l-primary bg-card text-card-foreground',
        info: 'border-l-primary bg-accent/40 text-foreground',
        warning:
          'border-l-[color:var(--warning)] bg-[color-mix(in_oklab,var(--warning)_8%,transparent)] text-foreground [&>svg]:text-[color:var(--warning-foreground)]',
        success:
          'border-l-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] text-foreground [&>svg]:text-[color:var(--success)]',
        destructive:
          'border-l-destructive bg-[color-mix(in_oklab,var(--destructive)_8%,transparent)] text-foreground [&>svg]:text-destructive'
      }
    },
    defaultVariants: { variant: 'default' }
  }
);

export interface AlertProps extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof alertVariants> {}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { className, variant, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
});

export const AlertTitle = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(function AlertTitle(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn('col-start-2 min-h-4 font-medium tracking-tight', className)}
      {...props}
    />
  );
});

export const AlertDescription = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function AlertDescription({ className, ...props }, ref) {
    return (
      <div
        ref={ref}
        data-slot="alert-description"
        className={cn(
          'col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed',
          className
        )}
        {...props}
      />
    );
  }
);

export { alertVariants };
