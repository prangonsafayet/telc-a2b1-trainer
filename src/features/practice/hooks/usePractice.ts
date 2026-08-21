import { useCallback, useMemo } from 'react';

import { STUDY_CATEGORIES } from '@shared/config/studyCategories.ts';
import { useTrainerContent } from '@shared/hooks/useTrainerContent.ts';
import { recordFrom } from '@shared/lib/records.ts';
import { countMastery, isDue, pickDueIds, reviewItem, type MasteryCounts } from '@shared/lib/srs.ts';
import { allCards, cardsFor, idsFor } from '@shared/lib/studyItems.ts';
import { type StudyCard, type StudyCategory, type TrainerId, type VocabBank } from '@shared/types';

import { useToday } from '@features/plan';
import { touchActivity, useTrainerSlice, type TrainerSlice } from '@features/progress';

import {
  isSessionDone,
  usePracticeStore,
  type PracticeCategory,
  type PracticeSession
} from '../lib/practiceStore.ts';
import { buildQuiz } from '../lib/quiz.ts';

const FLASHCARD_SESSION_SIZE = 20;
const QUIZ_SESSION_SIZE = 15;

export interface PracticeController {
  readonly vocab: VocabBank;
  readonly today: string;
  readonly mastery: MasteryCounts;
  readonly categoryMastery: Readonly<Record<StudyCategory, MasteryCounts>>;
  readonly session: PracticeSession | null;
  readonly sessionDone: boolean;
  readonly startFlashcards: (category: PracticeCategory) => void;
  readonly startQuiz: (category: PracticeCategory) => void;
  readonly flip: () => void;
  /** Grades the open flashcard: writes the SRS transition, then advances. */
  readonly gradeCard: (knewIt: boolean) => void;
  /** Locks in a quiz option: writes the SRS transition, then shows feedback. */
  readonly chooseOption: (option: number) => void;
  readonly nextQuestion: () => void;
  readonly endSession: () => void;
}

/** Due cards first (weakest boxes up front), the rest of the category after. */
const pickSessionCards = (
  vocab: VocabBank,
  category: PracticeCategory,
  srs: TrainerSlice['srs'],
  today: string,
  limit: number
): readonly StudyCard[] => {
  const cards = category === 'mixed' ? allCards(vocab) : cardsFor(vocab, category);
  const ids = cards.map(card => card.id);
  const due = pickDueIds(ids, srs, today, limit);
  const dueSet = new Set(due);
  const byId = new Map(cards.map(card => [card.id, card]));
  const rest = cards.filter(card => !dueSet.has(card.id));
  return [
    ...due.map(id => byId.get(id)).filter((card): card is StudyCard => card !== undefined),
    ...rest
  ].slice(0, limit);
};

/**
 * One practice hub session for one trainer: the store drives the screen, every answer lands
 * in that trainer's own SRS state. The bank comes from its content, so a trainer with an
 * empty one simply has nothing due.
 */
export const usePractice = (trainer: TrainerId): PracticeController => {
  const { srs, update } = useTrainerSlice(trainer);
  const today = useToday();
  const vocab = useTrainerContent(trainer).vocab;

  const categoryMastery = useMemo(
    () => recordFrom(STUDY_CATEGORIES, category => countMastery(idsFor(vocab, category), srs, today)),
    [vocab, srs, today]
  );

  const mastery = useMemo(
    () =>
      countMastery(
        STUDY_CATEGORIES.flatMap(category => idsFor(vocab, category)),
        srs,
        today
      ),
    [vocab, srs, today]
  );

  /*
   * The store is module-global and survives a route change, so a session started under one
   * trainer must not appear under another: it would render that trainer's cards and grade
   * them into this one's SRS. Same guard the exam runner applies to a resumable run.
   */
  const stored = usePracticeStore(state => state.session);
  const session = stored?.trainer === trainer ? stored : null;
  const storeStartFlashcards = usePracticeStore(state => state.startFlashcards);
  const storeStartQuiz = usePracticeStore(state => state.startQuiz);
  const flip = usePracticeStore(state => state.flip);
  const storeGrade = usePracticeStore(state => state.grade);
  const storeChoose = usePracticeStore(state => state.choose);
  const nextQuestion = usePracticeStore(state => state.next);
  const endSession = usePracticeStore(state => state.end);

  const recordReview = useCallback(
    (itemId: string, correct: boolean) => {
      update(current =>
        touchActivity(
          { ...current, srs: { ...current.srs, [itemId]: reviewItem(current.srs[itemId], correct, today) } },
          today
        )
      );
    },
    [update, today]
  );

  const startFlashcards = useCallback(
    (category: PracticeCategory) => {
      storeStartFlashcards(
        trainer,
        category,
        pickSessionCards(vocab, category, srs, today, FLASHCARD_SESSION_SIZE)
      );
    },
    [storeStartFlashcards, trainer, vocab, srs, today]
  );

  const startQuiz = useCallback(
    (category: PracticeCategory) => {
      const ids =
        category === 'mixed'
          ? STUDY_CATEGORIES.flatMap(candidate => idsFor(vocab, candidate))
          : idsFor(vocab, category);
      const dueIds = ids.filter(id => isDue(srs[id], today));
      storeStartQuiz(trainer, category, buildQuiz(vocab, category, QUIZ_SESSION_SIZE, dueIds));
    },
    [storeStartQuiz, trainer, vocab, srs, today]
  );

  const gradeCard = useCallback(
    (knewIt: boolean) => {
      const current = usePracticeStore.getState().session;
      if (current?.kind !== 'flashcards' || current.trainer !== trainer) return;
      const card = current.cards[current.index];
      if (card) recordReview(card.id, knewIt);
      storeGrade(knewIt);
    },
    [recordReview, storeGrade, trainer]
  );

  const chooseOption = useCallback(
    (option: number) => {
      const current = usePracticeStore.getState().session;
      if (current?.kind !== 'quiz' || current.trainer !== trainer || current.chosen !== null) return;
      const question = current.questions[current.index];
      if (question) recordReview(question.id, option === question.answer);
      storeChoose(option);
    },
    [recordReview, storeChoose, trainer]
  );

  return useMemo(
    () => ({
      vocab,
      today,
      mastery,
      categoryMastery,
      session,
      sessionDone: session !== null && isSessionDone(session),
      startFlashcards,
      startQuiz,
      flip,
      gradeCard,
      chooseOption,
      nextQuestion,
      endSession
    }),
    [
      vocab,
      today,
      mastery,
      categoryMastery,
      session,
      startFlashcards,
      startQuiz,
      flip,
      gradeCard,
      chooseOption,
      nextQuestion,
      endSession
    ]
  );
};
