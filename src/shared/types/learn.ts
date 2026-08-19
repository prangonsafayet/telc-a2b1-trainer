/** The 28-day study plan authored in `src/content/learn.ts`. */

export interface LearnAiPrompt {
  /** Short title, e.g. "Error debrief". */
  readonly t: string;
  /** The prompt body, offered as copy-to-clipboard. Plain text. */
  readonly p: string;
}

export interface LearnDay {
  readonly day: number;
  /**
   * 'core' days (1–14) carry the essential curriculum and are always scheduled,
   * compressed if necessary. 'extension' days (15–28) deepen to full B1 and are
   * only scheduled when the plan has room for them.
   */
  readonly tier: 'core' | 'extension';
  readonly title: string;
  readonly focus: string;
  readonly tasks: readonly string[];
  /** Keys into `LearnPlan.cheatsheets`. */
  readonly cheats: readonly string[];
  readonly ai: readonly LearnAiPrompt[];
}

export interface Cheatsheet {
  readonly title: string;
  /** Authored HTML, injected into a .prose container. */
  readonly html: string;
}

export interface LearnPlan {
  /** Authored HTML (bolds a few phrases), injected rather than rendered as text. */
  readonly intro: string;
  readonly cheatsheets: Readonly<Record<string, Cheatsheet>>;
  readonly days: readonly LearnDay[];
}
