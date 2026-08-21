import { useCallback } from 'react';

import { toast } from 'sonner';

import { useConfirm } from '@shared/providers/useConfirm.ts';
import { type ProgressDatabase } from '@shared/types';

import { describeImport, planImport, type ImportPlan } from '../lib/importProgress.ts';
import { stamp } from '../lib/progressDb.ts';

import { useProgress } from './useProgress.ts';

export interface ProgressBackup {
  readonly exportToFile: () => void;
  readonly importFromFile: () => void;
}

const EXPORT_FILENAME = 'telc-trainer-progress.json';

/** The file's plan, or null if it is not JSON, or not a trainer export. */
const readPlan = async (file: File, current: ProgressDatabase): Promise<ImportPlan | null> => {
  try {
    return planImport(current, JSON.parse(await file.text()));
  } catch {
    return null;
  }
};

/**
 * Export and import of the whole progress document, for backup or moving between
 * browsers. It belongs to the progress feature because the document does: both Settings and
 * a trainer's History offer the pair, and neither owns the file format.
 * The file input is created on demand rather than rendered hidden: a hidden
 * input is still reachable by assistive technology, and a ref would have to cross the
 * hook boundary for no benefit.
 */
export const useProgressBackup = (): ProgressBackup => {
  const { db, dbRef, replaceLocal } = useProgress();
  const confirm = useConfirm();

  const exportToFile = useCallback(() => {
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = EXPORT_FILENAME;
    anchor.click();
    URL.revokeObjectURL(url);
    toast.success('Progress exported.');
  }, [db]);

  const importFromFile = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';

    input.addEventListener('change', () => {
      void (async () => {
        const file = input.files?.[0];
        if (!file) return;

        /* Read against the live document, not a render's closure: what the file leaves alone
           has to be this browser's current progress. */
        const plan = await readPlan(file, dbRef.current);
        if (!plan) {
          toast.error('Invalid file — that JSON is not a trainer export.');
          return;
        }

        /* Asked before anything is written: an import replaces stored work, cannot be
           undone, and — once signed in — reaches the cloud and every other device. */
        const confirmed = await confirm({
          title: 'Import this backup?',
          description: describeImport(plan),
          confirmText: 'Import the backup',
          destructive: true
        });
        if (!confirmed) return;

        replaceLocal(stamp(plan.database));
        toast.success('Progress imported.');
      })();
    });

    input.click();
  }, [dbRef, replaceLocal, confirm]);

  return { exportToFile, importFromFile };
};
