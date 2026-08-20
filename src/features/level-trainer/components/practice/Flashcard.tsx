import { cn } from '@shared/lib/cn.ts';

import { CATEGORY_META, type StudyCard } from '@features/level-trainer/lib/studyItems.ts';

interface FlashcardProps {
  readonly card: StudyCard;
  readonly flipped: boolean;
  readonly onFlip: () => void;
}

/** One card with a 3D flip: German (and forms) on the front, English + example behind. */
const Flashcard = ({ card, flipped, onFlip }: FlashcardProps) => (
  <div className="flip-scene mx-auto w-full max-w-xl">
    <button
      type="button"
      onClick={onFlip}
      aria-label={flipped ? 'Show the German side' : 'Show the English side'}
      className={cn('flip-card block h-64 w-full text-left sm:h-72', flipped && 'is-flipped')}
    >
      <span className="flip-face flex flex-col items-center justify-center gap-3 rounded-xl border bg-card p-6 text-center shadow-md">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {CATEGORY_META[card.category].labelDe}
        </span>
        <span className="text-3xl font-bold tracking-tight">{card.front}</span>
        {card.frontDetail ? <span className="text-sm text-muted-foreground">{card.frontDetail}</span> : null}
        <span className="mt-2 text-xs text-muted-foreground">tap to flip</span>
      </span>

      <span className="flip-face flip-face-back flex flex-col items-center justify-center gap-3 rounded-xl border border-primary/40 bg-accent/30 p-6 text-center shadow-md">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">English</span>
        <span className="text-2xl font-bold tracking-tight">{card.back}</span>
        <span className="mt-1 text-sm italic leading-relaxed">„{card.example.de}“</span>
        <span className="text-sm text-muted-foreground">{card.example.en}</span>
      </span>
    </button>
  </div>
);

export default Flashcard;
