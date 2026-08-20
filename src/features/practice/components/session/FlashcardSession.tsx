import { Check, X } from 'lucide-react';

import { Button, Progress } from '@shared/ui';

import { type FlashcardSession as FlashcardSessionState } from '@features/practice/lib/practiceStore.ts';

import Flashcard from './Flashcard.tsx';
import SessionSummary from './SessionSummary.tsx';

interface FlashcardSessionProps {
  readonly session: FlashcardSessionState;
  readonly done: boolean;
  readonly onFlip: () => void;
  readonly onGrade: (knewIt: boolean) => void;
  readonly onRestart: () => void;
  readonly onClose: () => void;
}

/** The flashcard run: progress, the flipping card, and honest self-grading. */
const FlashcardSession = ({ session, done, onFlip, onGrade, onRestart, onClose }: FlashcardSessionProps) => {
  if (done) {
    return (
      <SessionSummary
        kind="flashcards"
        correct={session.correct}
        wrong={session.wrong}
        onRestart={onRestart}
        onClose={onClose}
      />
    );
  }

  const card = session.cards[session.index];
  if (!card) return null;

  return (
    <div className="space-y-5">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <Progress value={(session.index / session.cards.length) * 100} className="h-1.5" />
        <span className="shrink-0 text-sm tabular-nums text-muted-foreground">
          {session.index + 1}/{session.cards.length}
        </span>
      </div>

      {/* Re-keying restarts the entrance animation for every new card. */}
      <div key={card.id} className="animate-pop-in">
        <Flashcard card={card} flipped={session.flipped} onFlip={onFlip} />
      </div>

      <div className="mx-auto flex max-w-xl justify-center gap-3">
        {session.flipped ? (
          <>
            <Button
              variant="outline"
              size="lg"
              className="border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={() => {
                onGrade(false);
              }}
            >
              <X /> Didn&apos;t know
            </Button>
            <Button
              size="lg"
              className="bg-[color:var(--success)] text-white hover:bg-[color:var(--success)]/90"
              onClick={() => {
                onGrade(true);
              }}
            >
              <Check /> Knew it
            </Button>
          </>
        ) : (
          <Button variant="secondary" size="lg" onClick={onFlip}>
            Flip card
          </Button>
        )}
      </div>
    </div>
  );
};

export default FlashcardSession;
