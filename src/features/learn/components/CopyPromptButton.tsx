import { Check, Copy } from 'lucide-react';

import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard.ts';
import { Button } from '@shared/ui';


interface CopyPromptButtonProps {
  readonly prompt: string;
}

export const CopyPromptButton = ({ prompt }: CopyPromptButtonProps) => {
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
};
