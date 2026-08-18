import { createContext, useCallback, useContext, useRef, useState } from 'react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle
} from '@/components/ui/alert-dialog.jsx';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button.jsx';

const ConfirmContext = createContext(null);

/* Promise-based replacement for window.confirm(), so the exam flow can await a
   real dialog instead of a native modal that blocks the whole page. */
export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);
  const resolver = useRef(null);

  const confirm = useCallback(opts => {
    setState({
      title: 'Are you sure?',
      description: '',
      confirmText: 'Continue',
      cancelText: 'Cancel',
      destructive: false,
      ...(typeof opts === 'string' ? { description: opts } : opts)
    });
    return new Promise(resolve => { resolver.current = resolve; });
  }, []);

  const settle = value => {
    setState(null);
    if (resolver.current) resolver.current(value);
    resolver.current = null;
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <AlertDialog open={!!state} onOpenChange={open => { if (!open) settle(false); }}>
        {state ? (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{state.title}</AlertDialogTitle>
              {state.description ? <AlertDialogDescription>{state.description}</AlertDialogDescription> : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => settle(false)}>{state.cancelText}</AlertDialogCancel>
              <AlertDialogAction
                className={cn(state.destructive && buttonVariants({ variant: 'destructive' }))}
                onClick={() => settle(true)}
              >
                {state.confirmText}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        ) : null}
      </AlertDialog>
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return ctx;
}
