import { forwardRef, type ComponentPropsWithoutRef, type ComponentRef } from 'react';

import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@shared/lib/cn.ts';

export const Tabs = forwardRef<
  ComponentRef<typeof TabsPrimitive.Root>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(function Tabs({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Root
      ref={ref}
      data-slot="tabs"
      className={cn('flex flex-col gap-3', className)}
      {...props}
    />
  );
});

export const TabsList = forwardRef<
  ComponentRef<typeof TabsPrimitive.List>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(function TabsList({ className, ...props }, ref) {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn('inline-flex w-fit items-center justify-center rounded-lg bg-muted p-[3px]', className)}
      {...props}
    />
  );
});

export const TabsTrigger = forwardRef<
  ComponentRef<typeof TabsPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(function TabsTrigger({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent px-3 py-1.5 text-sm font-medium transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  );
});

export const TabsContent = forwardRef<
  ComponentRef<typeof TabsPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(function TabsContent({ className, ...props }, ref) {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn('outline-none', className)}
      {...props}
    />
  );
});
