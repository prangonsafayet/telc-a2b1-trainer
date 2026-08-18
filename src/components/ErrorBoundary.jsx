import { Component } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';

/* Catches render/lifecycle crashes so one broken screen never takes the whole trainer
   down — and, crucially, never blocks access to saved progress. */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('Trainer crashed:', error, info);
  }

  componentDidUpdate(prevProps) {
    /* A new resetKey (we pass the route path) clears the error so navigating away works. */
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <Card className="mx-auto my-10 max-w-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-destructive" /> Something went wrong
          </CardTitle>
          <CardDescription>
            This screen failed to render. Your saved progress is untouched — it lives in this browser's storage and in
            your cloud sync, not on this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <pre className="max-h-40 overflow-auto rounded-md bg-muted p-3 text-xs text-muted-foreground">
            {String(error && error.message ? error.message : error)}
          </pre>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => this.setState({ error: null })}><RotateCcw /> Try again</Button>
            <Button variant="outline" onClick={() => { window.location.href = '/'; }}>
              <Home /> Back to the dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
}
