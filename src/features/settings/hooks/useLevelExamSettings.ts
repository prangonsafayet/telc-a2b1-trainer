import { useCallback } from 'react';

import { type LevelTrainerSettings, type SingleLevelTrainerId } from '@shared/types';

import { useTrainerDoc } from '@features/progress';

export interface LevelExamSettings {
  readonly settings: LevelTrainerSettings;
  readonly setLevelSetting: <K extends keyof LevelTrainerSettings>(
    key: K,
    value: LevelTrainerSettings[K]
  ) => void;
}

/** Read/write handle on one level trainer's settings (exam date, timing, plays). */
export const useLevelExamSettings = (level: SingleLevelTrainerId): LevelExamSettings => {
  const { doc, updateDoc } = useTrainerDoc(level);

  const setLevelSetting = useCallback(
    <K extends keyof LevelTrainerSettings>(key: K, value: LevelTrainerSettings[K]) => {
      updateDoc(current => ({ ...current, settings: { ...current.settings, [key]: value } }));
    },
    [updateDoc]
  );

  return { settings: doc.settings, setLevelSetting };
};
