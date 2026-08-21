import { useCallback } from 'react';

import { toast } from 'sonner';

import { DEFAULT_SETTINGS } from '@shared/config/exam.ts';
import { useConfirm } from '@shared/providers/useConfirm.ts';

import { useSync } from '@features/auth';
import { clearAllRuns } from '@features/exam';
import { EMPTY_DATABASE, stamp, useProgress, useProgressBackup } from '@features/progress';

import { describeDelete } from '../lib/describeDelete.ts';

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
  const { user, deleteRemote } = useSync();
  const confirm = useConfirm();

  const deleteAllProgress = useCallback(async () => {
    const signedIn = user !== null;
    const confirmed = await confirm({
      title: 'Delete all progress?',
      description: describeDelete(signedIn),
      confirmText: 'Delete all progress',
      destructive: true
    });
    if (!confirmed) return;

    /* The run in progress is stored under its own key, so emptying the document left a
       half-finished attempt — answers and typed text included — behind it. */
    clearAllRuns();
    replaceLocal(stamp({ ...EMPTY_DATABASE, settings: DEFAULT_SETTINGS }));

    if (!signedIn) {
      toast.success('All progress deleted.');
      return;
    }

    /* The stored row is removed rather than overwritten with an empty document: a union-only
       merge cannot express a deletion, so an emptied row would be refilled by the next
       device to sign in. */
    if (await deleteRemote()) {
      toast.success('All progress deleted.', { description: 'The cloud copy is gone too.' });
      return;
    }
    toast.warning('Deleted in this browser only', {
      description: 'The cloud copy could not be reached, so it may sync back. Try again when you are online.'
    });
  }, [confirm, replaceLocal, user, deleteRemote]);

  return { exportToFile, importFromFile, deleteAllProgress };
};
