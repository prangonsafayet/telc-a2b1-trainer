import { type ReactNode } from 'react';

interface SettingsSectionProps {
  /** Names the section for the eye and, as a landmark, for a screen reader. */
  readonly title: string;
  /** What the settings in it are for. One sentence. */
  readonly lead: string;
  readonly children: ReactNode;
}

/**
 * One group of settings: a heading, what the group is for, and its controls.
 *
 * The page is a list of these rather than one long column, so every control sits under a
 * heading that says what changing it affects. Each is a named region, which is what lets a
 * screen reader jump between the groups instead of walking every field.
 */
const SettingsSection = ({ title, lead, children }: SettingsSectionProps) => (
  <section aria-label={title} className="mt-10">
    <div className="mb-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{lead}</p>
    </div>
    {children}
  </section>
);

export default SettingsSection;
