import { type ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from '@shared/components';
import { ConfirmProvider } from '@shared/providers/ConfirmProvider.tsx';
import { Toaster } from '@shared/ui';

import { ProgressProvider } from '@features/progress';

/**
 * Composition root. Order matters: the error boundary is outermost so a crash anywhere
 * still renders, and progress sits above the router so navigation never remounts it.
 */
export const AppProviders = ({ children }: { readonly children: ReactNode }) => (
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
