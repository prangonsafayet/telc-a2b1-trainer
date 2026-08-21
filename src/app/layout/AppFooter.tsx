import { APP_BUILD_LABEL } from '@shared/config/appInfo.ts';
import { APP_NAME } from '@shared/config/trainers.ts';

/**
 * Shows which build you are looking at. Worth having in a study app: a stale service
 * worker or a cached bundle otherwise looks identical to a current one.
 */
const AppFooter = () => (
  <footer className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
    <div className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs text-muted-foreground">
      <span>{APP_NAME}</span>
      <span className="font-mono" title="Application version and deployed commit">
        {APP_BUILD_LABEL}
      </span>
    </div>
  </footer>
);

export default AppFooter;
