import { CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Alert, AlertDescription, AlertTitle, Button } from '@shared/ui';

interface SchedulePhaseNoticeProps {
  readonly message: string;
  /** A date in the past or missing needs fixing; a long or short runway only needs saying. */
  readonly needsNewDate: boolean;
}

/** Why the plan looks the way it does, with one click to the thing that changes it. */
export const SchedulePhaseNotice = ({ message, needsNewDate }: SchedulePhaseNoticeProps) => (
  <Alert variant={needsNewDate ? 'warning' : 'default'} className="animate-fade-up mb-6">
    <CalendarClock />
    <AlertTitle>{needsNewDate ? 'Your exam date needs updating' : 'About your plan'}</AlertTitle>
    <AlertDescription>
      <p>{message}</p>
      <div className="mt-2">
        <Button asChild size="sm" variant={needsNewDate ? 'default' : 'outline'}>
          <Link to="/settings">
            <CalendarClock /> {needsNewDate ? 'Set your exam date' : 'Change your exam date'}
          </Link>
        </Button>
      </div>
    </AlertDescription>
  </Alert>
);
