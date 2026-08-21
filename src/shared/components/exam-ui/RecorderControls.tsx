import { Circle, Mic, Square } from 'lucide-react';

import { useRecorder } from '@shared/hooks/useRecorder.ts';
import { type SpeakingPart } from '@shared/types';
import { Button } from '@shared/ui';

interface RecorderControlsProps {
  readonly part: SpeakingPart;
  readonly recordingUrl: string | undefined;
  readonly onRecorded: (part: SpeakingPart, url: string) => void;
}

const RecorderControls = ({ part, recordingUrl, onRecorded }: RecorderControlsProps) => {
  const recorder = useRecorder({
    onRecorded: url => {
      onRecorded(part, url);
    }
  });

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => void recorder.start()}
        disabled={!recorder.supported || recorder.status === 'recording'}
        title={recorder.supported ? undefined : 'Recording is not supported in this browser'}
      >
        <Mic /> Record
      </Button>
      <Button variant="outline" size="sm" onClick={recorder.stop} disabled={recorder.status !== 'recording'}>
        <Square /> Stop
      </Button>
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {recorder.status === 'recording' ? (
          <Circle className="size-2.5 animate-pulse fill-destructive text-destructive" />
        ) : null}
        {recorder.message}
      </span>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption -- the learner's own
          microphone recording; there is no transcript to caption it with. */}
      {recordingUrl ? <audio controls src={recordingUrl} className="h-8" /> : null}
    </div>
  );
};

export default RecorderControls;
