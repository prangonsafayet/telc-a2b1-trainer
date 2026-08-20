import { useCallback } from 'react';

import { toast } from 'sonner';

import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { useConfirm } from '@shared/providers/useConfirm.ts';

import { EMPTY_DATABASE, stamp, useProgress, useProgressBackup } from '@features/progress';

export interface ProgressDataState {
  /** Writes the whole progress document to a JSON file. */
  readonly exportToFile: () => void;
  /** Replaces the whole progress document from a JSON file. */
  readonly importFromFile: () => void;
  /** Asks first, then empties the document of every trainer. */
  readonly deleteAllProgress: () => Promise<void>;
}

/**
 * The three things that act on the stored document as a whole. They are grouped because the
 * page groups them: the backup pair is the answer to the delete, so both are offered in the
 * same place rather than a browser tab apart.
 */
export const useProgressData = (): ProgressDataState => {
  const { replaceLocal } = useProgress();
  const { exportToFile, importFromFile } = useProgressBackup();
  const confirm = useConfirm();

  const deleteAllProgress = useCallback(async () => {
    const confirmed = await confirm({
      title: 'Delete all progress?',
      description:
        'Every attempt, score and learn-plan checkbox of every trainer will be removed from this browser. This cannot be undone.',
      confirmText: 'Delete all progress',
      destructive: true
    });
    if (!confirmed) return;

    replaceLocal(stamp({ ...EMPTY_DATABASE, settings: DEFAULT_SETTINGS }));
    toast.success('All progress deleted.');
  }, [confirm, replaceLocal]);

  return { exportToFile, importFromFile, deleteAllProgress };
};
