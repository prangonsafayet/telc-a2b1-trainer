import { useCallback, useEffect, useState } from 'react';

import { isSpeaking, speakScript, stopSpeech } from '@shared/lib/speech.ts';
import { type TelcExam } from '@shared/types';

import { useSettings } from '@features/progress';

import { telcAudioForKey, telcRate } from '../lib/audio.ts';

interface TelcAudioOptions {
  readonly exam: TelcExam;
  /** Item key, e.g. `h1.3` or `h2`. */
  readonly itemKey: string;
  readonly playsLeft: number;
  readonly onConsumePlay: (itemKey: string) => void;
}

export interface TelcAudioState {
  readonly playing: boolean;
  readonly canPlay: boolean;
  readonly toggle: () => void;
}

/** Play/stop for one listening item, enforcing the real-exam play budget. */
export const useTelcAudioPlayback = ({
  exam,
  itemKey,
  playsLeft,
  onConsumePlay
}: TelcAudioOptions): TelcAudioState => {
  /* Voice and speed are the global speech settings, shared across all three trainers. */
  const { ttsRate, voiceName } = useSettings();
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
    speakScript(telcAudioForKey(exam, itemKey), telcRate(exam.level, ttsRate), voiceName, () => {
      setPlaying(false);
    });
  }, [playing, playsLeft, onConsumePlay, itemKey, exam, ttsRate, voiceName]);

  return { playing, canPlay: playsLeft > 0, toggle };
};
