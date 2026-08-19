import { Check, Copy } from 'lucide-react';

import { Button } from '@/shared/ui';

import { useCopyToClipboard } from '../hooks/useCopyToClipboard.ts';

interface CopyPromptButtonProps {
  readonly prompt: string;
}

export function CopyPromptButton({ prompt }: CopyPromptButtonProps) {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      onClick={() => {
        copy(prompt);
      }}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? 'Copied' : 'Copy prompt'}
    </Button>
  );
}
