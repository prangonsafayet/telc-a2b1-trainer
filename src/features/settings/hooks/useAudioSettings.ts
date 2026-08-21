import { useCallback } from 'react';

import { useGermanVoices } from '@shared/hooks/useGermanVoices.ts';
import { speakScript } from '@shared/lib/speech.ts';

import { useProgress } from '@features/progress';

import { AUTO_VOICE, VOICE_TEST_SCRIPT } from '../config/audio.ts';

export interface AudioSettingsState {
  /** Speed multiplier, as the select's numeric value. */
  readonly ttsRate: number;
  /** The chosen voice, or `AUTO_VOICE` while the app picks the first German one. */
  readonly voiceValue: string;
  readonly voices: readonly SpeechSynthesisVoice[];
  /** How many German voices this browser offers. Null when it offers none. */
  readonly voiceCountHint: string | null;
  readonly setRate: (rate: number) => void;
  /** Takes the select's value, including `AUTO_VOICE`, and stores what that means. */
  readonly setVoice: (value: string) => void;
  readonly testVoice: () => void;
}

/**
 * The listening-audio settings. They are global rather than per trainer: one browser has one
 * set of installed voices, so the voice and the speed are chosen once for every paper.
 */
export const useAudioSettings = (): AudioSettingsState => {
  const { db, update } = useProgress();
  const settings = db.settings;
  const voices = useGermanVoices();

  const setRate = useCallback(
    (rate: number) => {
      update(current => ({ ...current, settings: { ...current.settings, ttsRate: rate } }));
    },
    [update]
  );

  const setVoice = useCallback(
    (value: string) => {
      const voiceName = value === AUTO_VOICE ? '' : value;
      update(current => ({ ...current, settings: { ...current.settings, voiceName } }));
    },
    [update]
  );

  const testVoice = useCallback(() => {
    speakScript(VOICE_TEST_SCRIPT, settings.ttsRate, settings.voiceName);
  }, [settings.ttsRate, settings.voiceName]);

  return {
    ttsRate: settings.ttsRate,
    voiceValue: settings.voiceName || AUTO_VOICE,
    voices,
    voiceCountHint:
      voices.length > 0 ? `${String(voices.length)} German voice(s) found in this browser.` : null,
    setRate,
    setVoice,
    testVoice
  };
};
