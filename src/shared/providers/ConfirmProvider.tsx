import { useCallback, useRef, useState, type ReactNode } from 'react';

import { cn } from '@/shared/lib/cn.ts';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  buttonVariants
} from '@/shared/ui';

import { ConfirmContext, type ConfirmOptions } from './confirmContext.ts';

interface ResolvedOptions extends Required<Omit<ConfirmOptions, 'description'>> {
  readonly description: string;
}

const DEFAULTS: ResolvedOptions = {
  title: 'Are you sure?',
  description: '',
  confirmText: 'Continue',
  cancelText: 'Cancel',
  destructive: false
};

/**
 * Promise-based replacement for `window.confirm`, so the exam flow can await a real
 * dialog instead of a native modal that blocks the whole page.
 */
export function ConfirmProvider({ children }: { readonly children: ReactNode }) {
  const [options, setOptions] = useState<ResolvedOptions | null>(null);
  const resolverRef = useRef<((value: boolean) => void) | null>(null);

  const confirm = useCallback((input: ConfirmOptions | string) => {
    setOptions({ ...DEFAULTS, ...(typeof input === 'string' ? { description: input } : input) });
    return new Promise<boolean>(resolve => {
      resolverRef.current = resolve;
    });
  }, []);

  const settle = (value: boolean): void => {
    setOptions(null);
    resolverRef.current?.(value);
    resolverRef.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AlertDialog
        open={options !== null}
        onOpenChange={open => {
          if (!open) settle(false);
        }}
      >
        {options ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{options.title}</AlertDialogTitle>
              {options.description ? (
                <AlertDialogDescription>{options.description}</AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  settle(false);
                }}
              >
                {options.cancelText}
              </AlertDialogCancel>
              <AlertDialogAction
                className={cn(options.destructive && buttonVariants({ variant: 'destructive' }))}
                onClick={() => {
                  settle(true);
                }}
              >
                {options.confirmText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : null}
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}
