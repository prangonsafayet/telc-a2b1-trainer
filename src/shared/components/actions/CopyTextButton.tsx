import { Check, Copy } from 'lucide-react';

import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard.ts';
import { Button } from '@shared/ui';

interface CopyTextButtonProps {
  readonly text: string;
  readonly label?: string;
}

/** Copies text to the clipboard with a short "copied" confirmation. */
const CopyTextButton = ({ text, label = 'Copy prompt' }: CopyTextButtonProps) => {
  const { copied, copy } = useCopyToClipboard();
  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      onClick={() => {
        copy(text);
      }}
    >
      {copied ? <Check /> : <Copy />}
      {copied ? 'Copied' : label}
    </Button>
  );
};

export default CopyTextButton;
