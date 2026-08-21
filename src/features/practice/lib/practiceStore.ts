/**
 * The in-progress practice session (flashcards or quiz), in a zustand store with immer.
 * Deliberately not persisted: a session is minutes long, and every graded answer is
 * already folded into the trainer document's SRS state as it happens.
 *
 * The store is module-global, so it outlives a route change between trainers. Every session
 * therefore records the trainer it was started for, and `usePractice` surfaces it only to
 * that trainer — otherwise a B1 session left open would grade B1 cards into B2's SRS.
 */

import { castDraft } from 'immer';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { type StudyCard, type StudyCategory, type TrainerId } from '@shared/types';

import { type QuizQuestion } from './quiz.ts';

export type PracticeCategory = StudyCategory | 'mixed';

export interface FlashcardSession {
  readonly kind: 'flashcards';
  /** Which trainer's vocabulary this session was started from — see `usePractice`. */
  readonly trainer: TrainerId;
  readonly category: PracticeCategory;
  readonly cards: readonly StudyCard[];
  readonly index: number;
  readonly flipped: boolean;
  readonly correct: number;
  readonly wrong: number;
}

export interface QuizSession {
  readonly kind: 'quiz';
  /** Which trainer's vocabulary this session was started from — see `usePractice`. */
  readonly trainer: TrainerId;
  readonly category: PracticeCategory;
  readonly questions: readonly QuizQuestion[];
  readonly index: number;
  /** The picked option of the current question, or null while undecided. */
  readonly chosen: number | null;
  readonly correct: number;
  readonly wrong: number;
}

export type PracticeSession = FlashcardSession | QuizSession;

export interface PracticeStore {
  readonly session: PracticeSession | null;
  readonly startFlashcards: (
    trainer: TrainerId,
    category: PracticeCategory,
    cards: readonly StudyCard[]
  ) => void;
  readonly startQuiz: (
    trainer: TrainerId,
    category: PracticeCategory,
    questions: readonly QuizQuestion[]
  ) => void;
  readonly flip: () => void;
  /** Flashcards: grade the open card and move on. */
  readonly grade: (knewIt: boolean) => void;
  /** Quiz: lock in an option for the current question. */
  readonly choose: (option: number) => void;
  /** Quiz: advance past the feedback to the next question. */
  readonly next: () => void;
  readonly end: () => void;
}

export const usePracticeStore = create<PracticeStore>()(
  immer(set => ({
    session: null,

    startFlashcards: (trainer, category, cards) => {
      set(state => {
        state.session = castDraft({
          kind: 'flashcards' as const,
          trainer,
          category,
          cards,
          index: 0,
          flipped: false,
          correct: 0,
          wrong: 0
        });
      });
    },

    startQuiz: (trainer, category, questions) => {
      set(state => {
        state.session = castDraft({
          kind: 'quiz' as const,
          trainer,
          category,
          questions,
          index: 0,
          chosen: null,
          correct: 0,
          wrong: 0
        });
      });
    },

    flip: () => {
      set(state => {
        if (state.session?.kind === 'flashcards') state.session.flipped = !state.session.flipped;
      });
    },

    grade: knewIt => {
      set(state => {
        if (state.session?.kind !== 'flashcards') return;
        if (knewIt) state.session.correct += 1;
        else state.session.wrong += 1;
        state.session.index += 1;
        state.session.flipped = false;
      });
    },

    choose: option => {
      set(state => {
        if (state.session?.kind !== 'quiz' || state.session.chosen !== null) return;
        state.session.chosen = option;
        const question = state.session.questions[state.session.index];
        if (question?.answer === option) state.session.correct += 1;
        else state.session.wrong += 1;
      });
    },

    next: () => {
      set(state => {
        if (state.session?.kind !== 'quiz' || state.session.chosen === null) return;
        state.session.index += 1;
        state.session.chosen = null;
      });
    },

    end: () => {
      set(state => {
        state.session = null;
      });
    }
  }))
);

/** A session is finished once the index runs past the material. */
export const isSessionDone = (session: PracticeSession): boolean =>
  session.kind === 'flashcards'
    ? session.index >= session.cards.length
    : session.index >= session.questions.length;
