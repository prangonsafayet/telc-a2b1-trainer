import { Check, X } from 'lucide-react';

interface DiagnosticRowProps {
  readonly label: string;
  readonly ok: boolean;
  readonly detail: string;
}

/** One build-time sync setting: pass/fail icon, the variable name and what was found. */
const DiagnosticRow = ({ label, ok, detail }: DiagnosticRowProps) => (
  <li className="flex items-start gap-2">
    {ok ? (
      <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
    ) : (
      <X className="mt-0.5 size-4 shrink-0 text-destructive" />
    )}
    <span className="min-w-0">
      <code className="font-medium">{label}</code>
      <span className="block break-all text-xs text-muted-foreground">{detail}</span>
    </span>
  </li>
);

export default DiagnosticRow;
