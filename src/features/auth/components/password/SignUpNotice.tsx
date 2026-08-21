import { Loader2, MailCheck, RotateCcw, TriangleAlert } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle, Button } from '@shared/ui';

import { type SignUpFeedback } from '@features/auth/hooks/usePasswordAuth.ts';

interface SignUpNoticeProps {
  readonly feedback: SignUpFeedback;
  readonly busy: boolean;
  readonly onResend: () => void;
}

/**
 * The two outcomes Supabase hides behind a generic success response. Without this the form
 * would tell someone who already has an account to check an inbox nothing was sent to.
 */
const SignUpNotice = ({ feedback, busy, onResend }: SignUpNoticeProps) => {
  if (feedback.kind === 'already-registered') {
    return (
      <Alert variant="warning">
        <TriangleAlert />
        <AlertTitle>{feedback.email} already has an account</AlertTitle>
        <AlertDescription>
          <p>
            It is already confirmed, so no email was sent. Sign in below — or use <b>Forgot password?</b> if
            you cannot remember the password.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  if (feedback.kind === 'awaiting-confirmation') {
    return (
      <Alert variant="info">
        <MailCheck />
        <AlertTitle>Confirm {feedback.email}</AlertTitle>
        <AlertDescription>
          <p>
            Click the link in that email, then sign in. Check your spam folder — and if it still has not
            arrived, send it again.
          </p>
          <Button variant="outline" size="sm" className="mt-2" onClick={onResend} disabled={busy}>
            {busy ? <Loader2 className="animate-spin" /> : <RotateCcw />}
            Resend confirmation email
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default SignUpNotice;
