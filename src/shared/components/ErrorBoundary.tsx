import { Component, type ErrorInfo, type ReactNode } from 'react';

import { AlertTriangle, Home, RotateCcw } from 'lucide-react';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';

interface ErrorBoundaryProps {
  readonly children: ReactNode;
  /** Changing this clears a caught error — pass the route path so navigating away recovers. */
  readonly resetKey?: string;
}

interface ErrorBoundaryState {
  readonly error: Error | null;
}

/**
 * Catches render and lifecycle crashes so one broken screen never takes the whole trainer
 * down — and, crucially, never blocks access to saved progress.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  override componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('Trainer crashed:', error, info.componentStack);
  }

  override componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  override render(): ReactNode {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <Card className="mx-auto my-10 max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" /> Something went wrong
          </CardTitle>
          <CardDescription>
            This screen failed to render. Your saved progress is untouched — it lives in this browser&apos;s
            storage and in your cloud sync, not on this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-40 overflow-auto rounded-md bg-muted p-3 text-xs text-muted-foreground">
            {error.message}
          </pre>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => {
                this.setState({ error: null });
              }}
            >
              <RotateCcw /> Try again
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                window.location.href = '/';
              }}
            >
              <Home /> Back to the dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
