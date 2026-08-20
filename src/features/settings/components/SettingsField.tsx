import { type ReactNode } from 'react';

import { Label } from '@shared/ui';

interface SettingsFieldProps {
  readonly label: string;
  /**
   * Id of the control this labels. Omit for controls that carry their own accessible
   * name — a <label htmlFor> would otherwise replace it, hiding the current value.
   */
  readonly htmlFor?: string;
  readonly hint?: string;
  readonly children: ReactNode;
}

/** One labelled settings control with an optional hint underneath. */
const SettingsField = ({ label, htmlFor, hint, children }: SettingsFieldProps) => (
  <div className="space-y-1.5">
    {htmlFor === undefined ? (
      <span className="text-sm font-medium leading-none">{label}</span>
    ) : (
      <Label htmlFor={htmlFor}>{label}</Label>
    )}
    {children}
    {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
  </div>
);

export default SettingsField;
