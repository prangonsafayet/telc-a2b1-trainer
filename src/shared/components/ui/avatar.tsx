import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

import { cn } from '@/shared/lib/cn.ts';

export const Avatar = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(function Avatar({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn('relative flex size-8 shrink-0 overflow-hidden rounded-full', className)}
      {...props}
    />
  );
});

export const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(function AvatarImage({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      referrerPolicy="no-referrer"
      className={cn('aspect-square size-full object-cover', className)}
      {...props}
    />
  );
});

export const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(function AvatarFallback({ className, ...props }, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn('flex size-full items-center justify-center rounded-full bg-muted text-xs', className)}
      {...props}
    />
  );
});
