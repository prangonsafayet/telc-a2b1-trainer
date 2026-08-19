import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

/** Scrolls to the element named by the URL hash, including on a direct visit. */
export function useHashScroll(): void {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);
}
