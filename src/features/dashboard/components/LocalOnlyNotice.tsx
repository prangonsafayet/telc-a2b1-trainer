import { LogIn, TriangleAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle, Button } from '@shared/ui';

interface LocalOnlyNoticeProps {
  readonly attemptCount: number;
  /** Whether this build has cloud sync credentials at all. */
  readonly syncAvailable: boolean;
}

/** Signed-out warning. Progress living only in one browser is easy to lose by accident. */
const LocalOnlyNotice = ({ attemptCount, syncAvailable }: LocalOnlyNoticeProps) => (
  <Alert variant="warning" className="animate-fade-up mb-6">
    <TriangleAlert />
    <AlertTitle>You are not signed in — progress is saved only in this browser</AlertTitle>
    <AlertDescription>
      <p>
        {attemptCount > 0
          ? `Your ${String(attemptCount)} saved attempt(s) live in this browser's storage.`
          : "Attempts you record will live in this browser's storage."}{' '}
        Clearing site data, private browsing, or moving to another device or browser will lose them.
        {syncAvailable
          ? ' Signing in with Google, GitHub or an email link backs everything up and syncs it across your devices.'
          : ' Cloud sync is not configured for this build, so export a backup file regularly.'}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {syncAvailable ? (
          <Button asChild size="sm">
            <Link to="/settings">
              <LogIn /> Sign in to sync
            </Link>
          </Button>
        ) : null}
        <Button asChild size="sm" variant="outline">
          <Link to="/history">Export a backup</Link>
        </Button>
      </div>
    </AlertDescription>
  </Alert>
);

export default LocalOnlyNotice;
