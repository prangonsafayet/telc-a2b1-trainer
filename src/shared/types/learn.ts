/** The 14-day study plan authored in `src/content/learn.ts`. */

export interface LearnAiPrompt {
  /** Short title, e.g. "Error debrief". */
  readonly t: string;
  /** The prompt body, offered as copy-to-clipboard. Plain text. */
  readonly p: string;
}

export interface LearnDay {
  readonly day: number;
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
