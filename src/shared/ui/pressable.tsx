import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@shared/lib/cn.ts';

export type PressableProps = ComponentPropsWithoutRef<'button'>;

/**
 * A button with no button chrome — no background, no padding, no radius, no press scale.
 * For a whole card, tile or row that *is* the control, where `Button`'s inline-flex box,
 * default radius and `transition-all` would each have to be overridden back out again.
 *
 * It still supplies the two things a bare `<button>` gets wrong: `type="button"`, so it
 * never submits a form it happens to sit inside, and a visible focus ring.
 */
export const Pressable = forwardRef<HTMLButtonElement, PressableProps>(
  ({ className, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      data-slot="pressable"
      className={cn(
        'block cursor-pointer text-left outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
);
