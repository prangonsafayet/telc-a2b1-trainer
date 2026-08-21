import { forwardRef, type ComponentPropsWithoutRef } from 'react';

import { cn } from '@shared/lib/cn.ts';

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...props }, ref) => {
    return (
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <table
          ref={ref}
          data-slot="table"
          className={cn('w-full caption-bottom text-sm', className)}
          {...props}
        />
      </div>
    );
  }
);

export const TableHeader = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...props }, ref) => {
    return <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />;
  }
);

export const TableBody = forwardRef<HTMLTableSectionElement, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...props }, ref) => {
    return <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />;
  }
);

export const TableRow = forwardRef<HTMLTableRowElement, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...props }, ref) => {
    return (
      <tr
        ref={ref}
        className={cn(
          'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
          className
        )}
        {...props}
      />
    );
  }
);

export const TableHead = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'th'>>(
  ({ className, ...props }, ref) => {
    return (
      <th
        ref={ref}
        className={cn(
          'h-10 whitespace-nowrap px-2 text-left align-middle font-medium text-muted-foreground',
          className
        )}
        {...props}
      />
    );
  }
);

export const TableCell = forwardRef<HTMLTableCellElement, ComponentPropsWithoutRef<'td'>>(
  ({ className, ...props }, ref) => {
    return <td ref={ref} className={cn('whitespace-nowrap p-2 align-middle', className)} {...props} />;
  }
);
