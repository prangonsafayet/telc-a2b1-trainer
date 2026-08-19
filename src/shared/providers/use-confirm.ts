import { useContext } from 'react';

import { ConfirmContext, type ConfirmFn } from './confirm-context.ts';

export function useConfirm(): ConfirmFn {
  const confirm = useContext(ConfirmContext);
  if (!confirm) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return confirm;
}
