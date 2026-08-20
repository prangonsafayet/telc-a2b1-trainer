import { useMemo } from 'react';

import {
  PLAYS_ALLOWED_CHOICES,
  WRITING_MINUTE_CHOICES,
  type SettingChoice
} from '@shared/config/examConditions.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { type TrainerExamSettings, type TrainerId } from '@shared/types';

import { useTrainerSlice, type TrainerSlice } from '@features/progress';

export interface TrainerConditions {
  readonly name: string;
  readonly settings: TrainerExamSettings;
  readonly writingChoices: readonly SettingChoice[];
  readonly playsChoices: readonly SettingChoice[];
  readonly setSetting: TrainerSlice['setSetting'];
}

/**
 * One trainer's exam conditions: its stored date, writing time and audio plays, plus the
 * choices the paper it sets offers for the last two. Every fact comes from the registry, so
 * a new trainer's column appears with no code here changing.
 */
export const useTrainerConditions = (trainer: TrainerId): TrainerConditions => {
  const { settings, setSetting } = useTrainerSlice(trainer);
  const { name, format } = TRAINERS[trainer];

  return useMemo(
    () => ({
      name,
      settings,
      writingChoices: WRITING_MINUTE_CHOICES[format],
      playsChoices: PLAYS_ALLOWED_CHOICES[format],
      setSetting
    }),
    [name, format, settings, setSetting]
  );
};
