import { type ExamDifficulty, type ExamGrade } from '@shared/types';
/* The one `import type` in the app rather than the usual inline `{ type X }`: under
   `verbatimModuleSyntax` the inline form leaves a real `import {} from '@shared/ui'`
   behind, and this is a pure lib — the tone union is derived from the design system, not
   linked to it. */
import type { BadgeVariant } from '@shared/ui';

/**
 * The badge variants this app's data maps onto — every one the design system has except
 * `default`, which is the primary fill and carries no verdict. Derived rather than copied,
 * so adding a variant cannot leave a stale mirror behind.
 */
export type BadgeTone = Exclude<BadgeVariant, 'default'>;

/** Grade → badge tone, so a pass always reads green and a fail always red. */
export const gradeTone = (result: ExamGrade | undefined): BadgeTone => {
  if (result === 'B1') return 'success';
  if (result === 'A2') return 'warning';
  return 'destructive';
};

export const difficultyTone = (difficulty: ExamDifficulty): BadgeTone => {
  if (difficulty === 'easy') return 'success';
  if (difficulty === 'medium') return 'warning';
  return 'info';
};
