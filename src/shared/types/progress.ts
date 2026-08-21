import { type AttemptMode, type ExamGrade, type ExamModule, type SkillKey } from './exam.ts';
import { type WeaknessProfile } from './feedback.ts';
import { type LevelTrainerDoc, type TrainerExamSettings, type TrainerId } from './trainer.ts';
import { type SrsMap } from './vocab.ts';

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
export interface DualLevelAttempt {
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

export interface Settings extends TrainerExamSettings {
  readonly ttsRate: number;
  /** Empty string means "first available German voice". */
  readonly voiceName: string;
}

/** Learn-plan checkbox state, keyed `d<day>t<index>`. */
export type LearnDoneMap = Partial<Record<string, boolean>>;

/**
 * Practice touches per local ISO date — what a streak is counted from. Named once here
 * because four places hold the same map: the root slice, every trainer document, the slice
 * a screen reads, and cloud sync's merge, which had declared its own copy of the type.
 */
export type ActivityMap = Partial<Record<string, number>>;

/**
 * What each trainer's learner keeps getting wrong, from their written answers.
 *
 * Keyed by trainer at the document root deliberately: it avoids the asymmetry between the
 * root trainer, whose study state sits at the top level, and the trainers with a document of
 * their own, and it gives cloud sync exactly one new place to merge rather than one per
 * trainer. Named here because three constructors and one merge rule all hold this shape.
 */
export type WeaknessByTrainer = Partial<Record<TrainerId, WeaknessProfile>>;

/** The whole persisted document — what localStorage holds and what cloud sync merges. */
export interface ProgressDatabase {
  readonly attempts: readonly DualLevelAttempt[];
  readonly learnDone: LearnDoneMap;
  readonly settings: Settings;
  /**
   * The root trainer's spaced-repetition state, keyed by vocab/grammar item id. The
   * trainers with their own document keep theirs on it; the root trainer keeps its slice
   * here, alongside its attempts and its learn plan.
   */
  readonly srs: SrsMap;
  /** The root trainer's practice touches per local ISO date — drives its streak. */
  readonly activity: ActivityMap;
  /**
   * The B1 and B2 trainer documents. Optional so documents written by older builds
   * stay readable; `normalizeDatabase` fills them in.
   */
  readonly b1?: LevelTrainerDoc;
  readonly b2?: LevelTrainerDoc;
  /**
   * Mistakes seen per trainer, counted from written answers. Optional so a document written
   * by a build that predates it stays readable; `normalizeDatabase` fills it in, and
   * `mergeProgress` merges it — adding a field here without doing both is what once wiped
   * every B1/B2 learner's progress.
   */
  readonly weakness?: WeaknessByTrainer;
  /** ISO timestamp of the last local change; drives sync conflict resolution. */
  readonly _updatedAt?: string;
}
