import { useCallback, useMemo } from 'react';

import { LEVEL_CONTENT } from '@content/trainers/index.ts';

import { isDue, pickDueIds, reviewItem } from '@shared/lib/srs.ts';
import { type LevelContent, type TelcLevel } from '@shared/types';

import { useToday } from '@features/plan';
import { touchActivity, useTrainerDoc, type TrainerDocHandle } from '@features/progress';

import {
  isSessionDone,
  usePracticeStore,
  type PracticeCategory,
  type PracticeSession
} from '../lib/practiceStore.ts';
import { buildQuiz } from '../lib/quiz.ts';
import { allCards, cardsFor, idsFor, STUDY_CATEGORIES, type StudyCard } from '../lib/studyItems.ts';

const FLASHCARD_SESSION_SIZE = 20;
const QUIZ_SESSION_SIZE = 15;

export interface PracticeController {
  readonly content: LevelContent;
  readonly doc: TrainerDocHandle['doc'];
  readonly today: string;
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
  content: LevelContent,
  category: PracticeCategory,
  srs: TrainerDocHandle['doc']['srs'],
  today: string,
  limit: number
): readonly StudyCard[] => {
  const cards = category === 'mixed' ? allCards(content.vocab) : cardsFor(content.vocab, category);
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

/** One practice hub session: the store drives the screen, every answer lands in SRS. */
export const usePractice = (level: TelcLevel): PracticeController => {
  const { doc, updateDoc } = useTrainerDoc(level);
  const today = useToday();
  const content = LEVEL_CONTENT[level];

  const session = usePracticeStore(state => state.session);
  const storeStartFlashcards = usePracticeStore(state => state.startFlashcards);
  const storeStartQuiz = usePracticeStore(state => state.startQuiz);
  const flip = usePracticeStore(state => state.flip);
  const storeGrade = usePracticeStore(state => state.grade);
  const storeChoose = usePracticeStore(state => state.choose);
  const nextQuestion = usePracticeStore(state => state.next);
  const endSession = usePracticeStore(state => state.end);

  const recordReview = useCallback(
    (itemId: string, correct: boolean) => {
      updateDoc(current =>
        touchActivity(
          { ...current, srs: { ...current.srs, [itemId]: reviewItem(current.srs[itemId], correct, today) } },
          today
        )
      );
    },
    [updateDoc, today]
  );

  const startFlashcards = useCallback(
    (category: PracticeCategory) => {
      storeStartFlashcards(
        category,
        pickSessionCards(content, category, doc.srs, today, FLASHCARD_SESSION_SIZE)
      );
    },
    [storeStartFlashcards, content, doc.srs, today]
  );

  const startQuiz = useCallback(
    (category: PracticeCategory) => {
      const ids =
        category === 'mixed'
          ? STUDY_CATEGORIES.flatMap(candidate => idsFor(content.vocab, candidate))
          : idsFor(content.vocab, category);
      const dueIds = ids.filter(id => isDue(doc.srs[id], today));
      storeStartQuiz(category, buildQuiz(content.vocab, category, QUIZ_SESSION_SIZE, dueIds));
    },
    [storeStartQuiz, content, doc.srs, today]
  );

  const gradeCard = useCallback(
    (knewIt: boolean) => {
      const current = usePracticeStore.getState().session;
      if (current?.kind !== 'flashcards') return;
      const card = current.cards[current.index];
      if (card) recordReview(card.id, knewIt);
      storeGrade(knewIt);
    },
    [recordReview, storeGrade]
  );

  const chooseOption = useCallback(
    (option: number) => {
      const current = usePracticeStore.getState().session;
      if (current?.kind !== 'quiz' || current.chosen !== null) return;
      const question = current.questions[current.index];
      if (question) recordReview(question.id, option === question.answer);
      storeChoose(option);
    },
    [recordReview, storeChoose]
  );

  return useMemo(
    () => ({
      content,
      doc,
      today,
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
      content,
      doc,
      today,
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
