import { useCallback, useEffect, useState } from 'react';

import { isSpeaking, speakScript, stopSpeech } from '@shared/lib/speech.ts';
import { type AudioScript } from '@shared/types';

interface AudioPlaybackOptions {
  /** The script to read. Resolving it from the exam is the caller's job — that is the one
      thing the two exam formats genuinely disagree about. */
  readonly script: AudioScript;
  readonly rate: number;
  readonly voiceName: string;
  /** Item key, e.g. `h2.3`. Reported back when a play is consumed. */
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
  script,
  rate,
  voiceName,
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
    speakScript(script, rate, voiceName, () => {
      setPlaying(false);
    });
  }, [playing, playsLeft, onConsumePlay, itemKey, script, rate, voiceName]);

  return { playing, canPlay: playsLeft > 0, toggle };
};
