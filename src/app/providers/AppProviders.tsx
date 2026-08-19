import { type ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@/shared/components';
import { Toaster } from '@/shared/components/ui/sonner.tsx';
import { ConfirmProvider } from '@/shared/providers/ConfirmProvider.tsx';

import { ProgressProvider } from '@/features/progress';

/**
 * Composition root. Order matters: the error boundary is outermost so a crash anywhere
 * still renders, and progress sits above the router so navigation never remounts it.
 */
export function AppProviders({ children }: { readonly children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ProgressProvider>
        <ConfirmProvider>
          <BrowserRouter>
            {children}
            <Toaster />
          </BrowserRouter>
        </ConfirmProvider>
      </ProgressProvider>
    </ErrorBoundary>
  );
}
