import { Link } from 'react-router-dom';

import { Button } from '@shared/ui';

export function NotFoundPage() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-2 text-muted-foreground">That link doesn&apos;t lead anywhere in the trainer.</p>
      <Button asChild className="mt-6">
        <Link to="/">Back to the dashboard</Link>
      </Button>
    </div>
  );
}
