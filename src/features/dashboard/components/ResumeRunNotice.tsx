import { PlayCircle } from 'lucide-react';

import { MODULE_META } from '@shared/config/exam.ts';
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import { type ExamRun } from '@features/exam';

interface ResumeRunNoticeProps {
  readonly run: ExamRun;
  readonly onResume: () => void;
  readonly onDiscard: () => void;
}

const ResumeRunNotice = ({ run, onResume, onDiscard }: ResumeRunNoticeProps) => {
  const modeLabel = run.mode === 'full' ? 'full exam' : MODULE_META[run.mode].short;

  return (
    <Card className="animate-pop-in mb-6 border-l-4 border-l-primary shadow-md">
      <CardHeader>
        <CardTitle>You have an exam in progress</CardTitle>
        <CardDescription>
          Modelltest {run.examId} · {modeLabel} — module {run.index + 1} of {run.queue.length}. Your answers
          and remaining time were saved.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        <Button onClick={onResume}>
          <PlayCircle /> Resume
        </Button>
        <Button variant="ghost" onClick={onDiscard}>
          Discard it
        </Button>
      </CardContent>
    </Card>
  );
};

export default ResumeRunNotice;
