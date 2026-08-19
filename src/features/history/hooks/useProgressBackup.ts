import { useCallback } from 'react';

import { toast } from 'sonner';

import { normalizeDatabase, stamp, useProgress } from '@features/progress';

export interface ProgressBackup {
  readonly exportToFile: () => void;
  readonly importFromFile: () => void;
}

const EXPORT_FILENAME = 'telc-trainer-progress.json';

/**
 * Export and import of the whole progress document, for backup or moving between
 * browsers. The file input is created on demand rather than rendered hidden: a hidden
 * input is still reachable by assistive technology, and a ref would have to cross the
 * hook boundary for no benefit.
 */
export const useProgressBackup = (): ProgressBackup => {
  const { db, replaceLocal } = useProgress();

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
      const file = input.files?.[0];
      if (!file) return;

      void file
        .text()
        .then(contents => {
          replaceLocal(stamp(normalizeDatabase(JSON.parse(contents))));
          toast.success('Progress imported.');
        })
        .catch(() => {
          toast.error('Invalid file — that JSON is not a trainer export.');
        });
    });

    input.click();
  }, [replaceLocal]);

  return { exportToFile, importFromFile };
};
