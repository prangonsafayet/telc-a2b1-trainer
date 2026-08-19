import { Play, Square } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge.tsx';
import { Button } from '@/shared/components/ui/button.tsx';
import { type Exam, type Settings } from '@/shared/types';

import { useAudioPlayback } from '../hooks/use-audio-playback.ts';

interface AudioPlayButtonProps {
  readonly exam: Exam;
  readonly settings: Settings;
  readonly itemKey: string;
  readonly playsLeft: number;
  readonly onConsumePlay: (itemKey: string) => void;
}

/** Play/stop plus the remaining-plays badge for one listening item. */
export function AudioPlayButton({ exam, settings, itemKey, playsLeft, onConsumePlay }: AudioPlayButtonProps) {
  const { playing, canPlay, toggle } = useAudioPlayback({
    exam,
    settings,
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
}
