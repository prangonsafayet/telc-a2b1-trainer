import { useMemo } from 'react';

import {
  PLAYS_ALLOWED_CHOICES,
  PLAYS_ALLOWED_HINTS,
  WRITING_MINUTE_CHOICES,
  writingTimeHint,
  type SettingChoice
} from '@shared/config/examConditions.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerExamSettings, type TrainerId } from '@shared/types';

import { useTrainerSlice, type TrainerSlice } from '@features/progress';

export interface TrainerConditions {
  readonly name: string;
  /** Accent of this trainer's papers, as a CSS colour. Marks its block, never its text. */
  readonly accent: string;
  readonly settings: TrainerExamSettings;
  readonly writingChoices: readonly SettingChoice[];
  /** How long the paper gives for writing, next to the choice. */
  readonly writingHint: string;
  readonly playsChoices: readonly SettingChoice[];
  /** What the real sitting does with its audio, next to the choice. */
  readonly playsHint: string;
  readonly setSetting: TrainerSlice['setSetting'];
}

/**
 * One trainer's exam conditions: its stored date, writing time and audio plays, plus the
 * choices the paper it sets offers for the last two and what the official paper does. Every
 * fact comes from the registry or from that trainer's own paper, so a new trainer's controls
 * appear with no code here changing.
 */
export const useTrainerConditions = (trainer: TrainerId): TrainerConditions => {
  const { settings, setSetting } = useTrainerSlice(trainer);
  const { name, accent, format, paper } = TRAINERS[trainer];
  const officialWritingMinutes = paper.minutes.schreiben;

  return useMemo(
    () => ({
      name,
      accent,
      settings,
      writingChoices: WRITING_MINUTE_CHOICES[format],
      writingHint: writingTimeHint(format, officialWritingMinutes),
      playsChoices: PLAYS_ALLOWED_CHOICES[format],
      playsHint: PLAYS_ALLOWED_HINTS[format],
      setSetting
    }),
    [name, accent, format, officialWritingMinutes, settings, setSetting]
  );
};
