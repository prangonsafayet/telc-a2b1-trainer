import { Layers, ListChecks, Shuffle } from 'lucide-react';

import { type MasteryCounts } from '@shared/lib/srs.ts';
import { type StudyCategory } from '@shared/types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle, Progress } from '@shared/ui';

import { type PracticeCategory } from '../lib/practiceStore.ts';
import { CATEGORY_META, STUDY_CATEGORIES } from '../lib/studyItems.ts';

interface CategoryPickerProps {
  readonly mastery: Readonly<Record<StudyCategory, MasteryCounts>>;
  readonly onFlashcards: (category: PracticeCategory) => void;
  readonly onQuiz: (category: PracticeCategory) => void;
}

const MasteryLine = ({ counts }: { readonly counts: MasteryCounts }) => {
  const percent = counts.total > 0 ? (counts.mastered / counts.total) * 100 : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-baseline justify-between text-xs text-muted-foreground">
        <span>
          {counts.mastered}/{counts.total} mastered · {counts.learning} learning
        </span>
        <span className="tabular-nums">{Math.round(percent)}%</span>
      </div>
      <Progress value={percent} className="h-1.5" />
    </div>
  );
};

/** The practice hub's entry point: pick a category, then flashcards or a quiz. */
export const CategoryPicker = ({ mastery, onFlashcards, onQuiz }: CategoryPickerProps) => (
  <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {STUDY_CATEGORIES.map(category => {
      const meta = CATEGORY_META[category];
      const counts = mastery[category];
      return (
        <Card key={category} className="card-hover flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">{meta.label}</CardTitle>
              {counts.due > 0 ? <Badge variant="warning">{counts.due} due</Badge> : null}
            </div>
            <p className="text-sm text-muted-foreground">{meta.description}</p>
          </CardHeader>
          <CardContent className="mt-auto space-y-3">
            <MasteryLine counts={counts} />
            <div className="flex gap-2">
              <Button
                size="sm"
                className="flex-1"
                onClick={() => {
                  onFlashcards(category);
                }}
              >
                <Layers /> Flashcards
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  onQuiz(category);
                }}
              >
                <ListChecks /> Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      );
    })}

    <Card className="card-hover flex flex-col border-dashed">
      <CardHeader>
        <CardTitle className="text-base">Mixed session</CardTitle>
        <p className="text-sm text-muted-foreground">
          Everything due across all five categories — the fastest way to work the queue down.
        </p>
      </CardHeader>
      <CardContent className="mt-auto space-y-3">
        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={() => {
              onFlashcards('mixed');
            }}
          >
            <Shuffle /> Flashcards
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => {
              onQuiz('mixed');
            }}
          >
            <ListChecks /> Quiz
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
);
