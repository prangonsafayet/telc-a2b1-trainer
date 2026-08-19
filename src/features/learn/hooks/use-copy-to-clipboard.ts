import { useCallback, useEffect, useRef, useState } from 'react';

const FEEDBACK_MS = 1500;

export interface CopyToClipboard {
  readonly copied: boolean;
  readonly copy: (text: string) => void;
}

/** Copies text and shows a short "copied" confirmation. */
export function useCopyToClipboard(): CopyToClipboard {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(
    () => () => {
      clearTimeout(timerRef.current);
    },
    []
  );

  const copy = useCallback((text: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setCopied(false);
      }, FEEDBACK_MS);
    });
  }, []);

  return { copied, copy };
}
