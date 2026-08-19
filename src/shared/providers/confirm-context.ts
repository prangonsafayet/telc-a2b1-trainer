import { createContext } from 'react';

export interface ConfirmOptions {
  readonly title?: string;
  readonly description?: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly destructive?: boolean;
}

/** Resolves true when the user confirms, false on cancel or dismiss. */
export type ConfirmFn = (options: ConfirmOptions | string) => Promise<boolean>;

export const ConfirmContext = createContext<ConfirmFn | null>(null);
