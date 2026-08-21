import { useEffect, useState } from 'react';

import { toIsoDate } from '@shared/lib/format.ts';

/**
 * Today as `YYYY-MM-DD`, kept current while the tab stays open.
 *
 * A study app is left open overnight, so the date is re-read just after local midnight
 * and again whenever the tab becomes visible — a sleeping laptop fires no timers, and
 * waking to yesterday's plan would be worse than a stale clock.
 */
export const useToday = (): string => {
  const [today, setToday] = useState(() => toIsoDate(new Date()));

  useEffect(() => {
    let timer: number | undefined;

    const sync = (): void => {
      setToday(toIsoDate(new Date()));
    };

    const scheduleMidnight = (): void => {
      const now = new Date();
      /* A few seconds past midnight, so the new date is unambiguous. */
      const next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
      timer = window.setTimeout(() => {
        sync();
        scheduleMidnight();
      }, next.getTime() - now.getTime());
    };

    const onVisibility = (): void => {
      if (document.visibilityState === 'visible') sync();
    };

    scheduleMidnight();
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return today;
};
