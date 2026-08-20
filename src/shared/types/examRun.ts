/**
 * The contract every exam format shares while it is being sat.
 *
 * The dual-level (A2·B1) paper and the single-level (telc B1/B2) papers differ in their
 * Teile, their item shapes and their scoring, but not in what running an exam means: a
 * queue of modules, answers keyed
 * by item, a play budget for listening and a recording per oral part. These types are that
 * common ground, so the runner, the audio button and the self-rating card exist once.
 */

import { type AnswerMap, type AnswerValue, type PlayBudget } from './progress.ts';
import { type TrainerPaper } from './trainer.ts';

/** The three parts of an oral exam. */
export type SpeakingPart = 't1' | 't2' | 't3';

/** Blob URLs of the candidate's own recordings, keyed by oral part. */
export type RecordingMap = Partial<Record<SpeakingPart, string>>;

/**
 * Everything a module renderer may receive. Generic over the exam and settings shapes so
 * one runner can drive either format; each module uses only the parts it needs.
 */
export interface ExamModuleProps<TExam, TSettings> {
  readonly exam: TExam;
  /** How this trainer's sitting runs: its timings, its copy, its listening speed. */
  readonly paper: TrainerPaper;
  readonly answers: AnswerMap;
  readonly setAnswer: (key: string, value: AnswerValue) => void;
  readonly settings: TSettings;
  readonly plays: PlayBudget;
  readonly onConsumePlay: (key: string) => void;
  readonly recordings: RecordingMap;
  readonly onRecorded: (part: SpeakingPart, url: string) => void;
}

export interface WordCountFeedback {
  readonly count: number;
  readonly hint: string;
  readonly inRange: boolean;
}
