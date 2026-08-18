import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { ConfirmProvider } from './components/ConfirmProvider.jsx';
import { Toaster } from './components/ui/sonner.jsx';
import { DBProvider } from './lib/store.jsx';
import './index.css';

/* Anything that escapes a component (a rejected promise, a listener throwing) still
   reaches the user as a toast rather than vanishing into the console. */
window.addEventListener('unhandledrejection', e => {
  console.error('Unhandled promise rejection:', e.reason);
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <DBProvider>
        <ConfirmProvider>
          <BrowserRouter>
            <App />
            <Toaster />
          </BrowserRouter>
        </ConfirmProvider>
      </DBProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
