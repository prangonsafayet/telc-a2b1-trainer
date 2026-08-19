import { useCallback, useEffect, useState } from 'react';

import { audioForKey, isSpeaking, rateForExam, speakScript, stopSpeech } from '@shared/lib/speech.ts';
import { type Exam, type Settings } from '@shared/types';

interface AudioPlaybackOptions {
  readonly exam: Exam;
  readonly settings: Settings;
  /** Item key, e.g. `h2.3`. */
  readonly itemKey: string;
  readonly playsLeft: number;
  readonly onConsumePlay: (itemKey: string) => void;
}

export interface AudioPlaybackState {
  readonly playing: boolean;
  readonly canPlay: boolean;
  readonly toggle: () => void;
}

/** Play/stop for one listening item, enforcing the real-exam play budget. */
export const useAudioPlayback = ({
  exam,
  settings,
  itemKey,
  playsLeft,
  onConsumePlay
}: AudioPlaybackOptions): AudioPlaybackState => {
  const [playing, setPlaying] = useState(false);

  /* Never leave the speaker running when the module unmounts. */
  useEffect(
    () => () => {
      stopSpeech();
    },
    []
  );

  const toggle = useCallback(() => {
    if (playing || isSpeaking()) {
      stopSpeech();
      setPlaying(false);
      return;
    }
    if (playsLeft <= 0) return;

    onConsumePlay(itemKey);
    setPlaying(true);
    speakScript(audioForKey(exam, itemKey), rateForExam(exam, settings), settings.voiceName, () => {
      setPlaying(false);
    });
  }, [playing, playsLeft, onConsumePlay, itemKey, exam, settings]);

  return { playing, canPlay: playsLeft > 0, toggle };
};
