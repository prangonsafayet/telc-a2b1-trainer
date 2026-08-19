import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import { AppProviders } from './app/providers/AppProviders.tsx';
import { AppRouter } from './app/router.tsx';
import './styles/index.css';

/* Anything that escapes a component still reaches the console rather than vanishing. */
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});

const container = document.getElementById('root');
if (!container) throw new Error('Missing #root element');

createRoot(container).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>
);
