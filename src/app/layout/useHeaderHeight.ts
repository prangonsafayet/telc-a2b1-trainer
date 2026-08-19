import { useEffect, useRef } from 'react';

/**
 * Publishes the real header height as `--header-h` so the exam module's sticky toolbar can
 * sit right beneath it. The header wraps to two rows on narrow screens, so a fixed offset
 * would be wrong there.
 */
export const useHeaderHeight = <T extends HTMLElement>(): React.RefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === 'undefined') return undefined;

    const apply = (): void => {
      document.documentElement.style.setProperty('--header-h', `${String(element.offsetHeight)}px`);
    };
    apply();

    const observer = new ResizeObserver(apply);
    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
};
