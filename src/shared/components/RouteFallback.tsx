import { Skeleton } from '@/shared/ui';

/**
 * Shown while a lazily-loaded route chunk is in flight. It mirrors the rough shape of a
 * content page so the layout does not jump when the real screen arrives.
 */
export function RouteFallback() {
  return (
    <div className="animate-in fade-in duration-200" role="status" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <Skeleton className="h-8 w-64" />
      <Skeleton className="mt-3 h-4 w-full max-w-2xl" />
      <Skeleton className="mt-2 h-4 w-3/4 max-w-xl" />
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
        <Skeleton className="h-24" />
      </div>
      <Skeleton className="mt-6 h-56" />
    </div>
  );
}
