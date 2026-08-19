import { type AttemptMode, type ExamGrade, type ExamModule, type SkillKey } from './exam.ts';

/**
 * An answer value. Matching/multiple-choice answers are option indices, richtig/falsch
 * answers are booleans, and the writing text and note-sheet gaps are strings.
 */
export type AnswerValue = number | boolean | string;

/**
 * Answers keyed by item id: `l1.0`, `l2.3`, `s1.0`, `h5.2`, `w.text`.
 * Kept flat and stringly-keyed because it is persisted and must stay
 * backwards-compatible with data written by earlier versions of the app.
 */
export type AnswerMap = Partial<Record<string, AnswerValue>>;

/** Remaining plays per listening item, keyed the same way as answers. */
export type PlayBudget = Partial<Record<string, number>>;

/** Seconds spent per module. */
export type ModuleTimes = Partial<Record<ExamModule, number>>;

/** Points out of 60 per skill. */
export type SkillScores = Partial<Record<SkillKey, number>>;

export interface SprachbausteineScore {
  readonly correct: number;
  readonly of: number;
  readonly percent: number;
}

/** One completed attempt, as stored. */
export interface Attempt {
  /** `Date.now()` at completion; also the route parameter. */
  readonly id: number;
  readonly examId: number;
  readonly mode: AttemptMode;
  /** ISO timestamp. */
  readonly date: string;
  readonly times: ModuleTimes;
  readonly scores: SkillScores;
  readonly sb: SprachbausteineScore | null;
  readonly answers: AnswerMap;
  /** Self-assessed scores for schreiben/sprechen, out of 60. */
  readonly ratings: Partial<Record<'schreiben' | 'sprechen', number>>;
  /** Full attempts only. */
  readonly total?: number;
  readonly result?: ExamGrade;
}

export interface Settings {
  readonly writingMinutes: number;
  readonly ttsRate: number;
  /** Empty string means "first available German voice". */
  readonly voiceName: string;
  /** `YYYY-MM-DD`, interpreted in local time. */
  readonly examDate: string;
  readonly playsAllowed: number;
}

/** Learn-plan checkbox state, keyed `d<day>t<index>`. */
export type LearnDoneMap = Partial<Record<string, boolean>>;

/** The whole persisted document — what localStorage holds and what cloud sync merges. */
export interface ProgressDatabase {
  readonly attempts: readonly Attempt[];
  readonly learnDone: LearnDoneMap;
  readonly settings: Settings;
  /** ISO timestamp of the last local change; drives sync conflict resolution. */
  readonly _updatedAt?: string;
}
