import { useEffect, useRef } from 'react';

import { X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

import { PageTitle } from '@shared/components';
import { STUDY_CATEGORIES } from '@shared/config/studyCategories.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { type StudyCategory, type TrainerId } from '@shared/types';
import { Button, Tabs, TabsContent, TabsList, TabsTrigger } from '@shared/ui';

import EmptyBankNotice from '../components/EmptyBankNotice.tsx';
import ReferenceTables from '../components/reference/ReferenceTables.tsx';
import CategoryPicker from '../components/session/CategoryPicker.tsx';
import FlashcardSession from '../components/session/FlashcardSession.tsx';
import QuizSession from '../components/session/QuizSession.tsx';
import { usePractice } from '../hooks/usePractice.ts';

interface PracticePageProps {
  readonly trainer: TrainerId;
}

const isCategory = (value: string | null): value is StudyCategory =>
  value !== null && (STUDY_CATEGORIES as readonly string[]).includes(value);

/**
 * The practice hub of any trainer: flashcards, quiz drills and the reference tables, all
 * over whatever bank its descriptor offers. A trainer whose bank is empty gets the same
 * screen with its empty state — there is no second implementation.
 */
const PracticePage = ({ trainer }: PracticePageProps) => {
  const practice = usePractice(trainer);
  const [params] = useSearchParams();
  const { name, short, basePath } = TRAINERS[trainer];

  /* A "drill it" link lands here as ?tab=quiz&category=… and starts the session itself. */
  const autoStarted = useRef(false);
  const wantedTab = params.get('tab');
  const wantedCategory = params.get('category');
  useEffect(() => {
    if (autoStarted.current || wantedTab !== 'quiz' || !isCategory(wantedCategory)) return;
    autoStarted.current = true;
    practice.startQuiz(wantedCategory);
  }, [wantedTab, wantedCategory, practice]);

  const { session } = practice;

  if (session) {
    return (
      <>
        <div className="mb-4 flex items-center justify-between">
          <PageTitle
            lead={
              session.kind === 'flashcards'
                ? 'Flip, then grade yourself honestly — that is what schedules the reviews.'
                : 'Instant feedback after every answer, with the English meaning.'
            }
          >
            {session.kind === 'flashcards' ? 'Flashcards' : 'Quiz'} · {short}
          </PageTitle>
          <Button variant="ghost" size="sm" onClick={practice.endSession}>
            <X /> End session
          </Button>
        </div>

        {session.kind === 'flashcards' ? (
          <FlashcardSession
            session={session}
            done={practice.sessionDone}
            onFlip={practice.flip}
            onGrade={practice.gradeCard}
            onRestart={() => {
              practice.startFlashcards(session.category);
            }}
            onClose={practice.endSession}
          />
        ) : (
          <QuizSession
            session={session}
            done={practice.sessionDone}
            onChoose={practice.chooseOption}
            onNext={practice.nextQuestion}
            onRestart={() => {
              practice.startQuiz(session.category);
            }}
            onClose={practice.endSession}
          />
        )}
      </>
    );
  }

  if (practice.mastery.total === 0) {
    return (
      <>
        <PageTitle lead="Flashcards and quizzes feed one spaced-repetition schedule; the tables are for looking things up.">
          Practice · {name}
        </PageTitle>
        <EmptyBankNotice trainerName={name} learnTo={`${basePath}/learn`} />
      </>
    );
  }

  return (
    <>
      <PageTitle
        lead={
          <>
            {String(practice.mastery.due)} item{practice.mastery.due === 1 ? '' : 's'} due today. Flashcards
            and quizzes feed the same spaced-repetition schedule; the tables are for looking things up.
          </>
        }
      >
        Practice · {name}
      </PageTitle>

      <Tabs defaultValue={wantedTab === 'tables' ? 'tables' : 'practice'}>
        <TabsList>
          <TabsTrigger value="practice">Practise</TabsTrigger>
          <TabsTrigger value="tables">Reference tables</TabsTrigger>
        </TabsList>
        <TabsContent value="practice">
          <CategoryPicker
            mastery={practice.categoryMastery}
            onFlashcards={practice.startFlashcards}
            onQuiz={practice.startQuiz}
          />
        </TabsContent>
        <TabsContent value="tables">
          <ReferenceTables bank={practice.vocab} />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default PracticePage;
