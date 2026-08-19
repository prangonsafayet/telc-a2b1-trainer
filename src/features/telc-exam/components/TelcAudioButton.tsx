import { Play, Square } from 'lucide-react';

import { type TelcExam } from '@shared/types';
import { Badge, Button } from '@shared/ui';

import { useTelcAudioPlayback } from '../hooks/useTelcAudioPlayback.ts';

interface TelcAudioButtonProps {
  readonly exam: TelcExam;
  readonly itemKey: string;
  readonly playsLeft: number;
  readonly onConsumePlay: (itemKey: string) => void;
}

/** Play/stop plus the remaining-plays badge for one listening item. */
export const TelcAudioButton = ({ exam, itemKey, playsLeft, onConsumePlay }: TelcAudioButtonProps) => {
  const { playing, canPlay, toggle } = useTelcAudioPlayback({
    exam,
    itemKey,
    playsLeft,
    onConsumePlay
  });

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        variant={playing ? 'secondary' : 'default'}
        onClick={toggle}
        disabled={!playing && !canPlay}
      >
        {playing ? <Square /> : <Play />}
        {playing ? 'Stopp' : 'Anhören'}
      </Button>
      <Badge variant={canPlay ? 'secondary' : 'destructive'}>{playsLeft}× left</Badge>
    </div>
  );
};
