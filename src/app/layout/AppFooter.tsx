import { APP_BUILD_LABEL } from '@/shared/config/appInfo.ts';

/**
 * Shows which build you are looking at. Worth having in a study app: a stale service
 * worker or a cached bundle otherwise looks identical to a current one.
 */
export function AppFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs text-muted-foreground">
        <span>telc Deutsch A2·B1 Trainer</span>
        <span className="font-mono" title="Application version and deployed commit">
          {APP_BUILD_LABEL}
        </span>
      </div>
    </footer>
  );
}
