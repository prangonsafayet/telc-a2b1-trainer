import { Layers, ListChecks, Shuffle } from 'lucide-react';

import { type MasteryCounts } from '@shared/lib/srs.ts';
import { type StudyCategory } from '@shared/types';
import { Badge, Button, Card, CardContent, CardHeader, CardTitle } from '@shared/ui';

import { type PracticeCategory } from '@features/level-trainer/lib/practiceStore.ts';
import { CATEGORY_META, STUDY_CATEGORIES } from '@features/level-trainer/lib/studyItems.ts';

import MasteryLine from './MasteryLine.tsx';

interface CategoryPickerProps {
  readonly mastery: Readonly<Record<StudyCategory, MasteryCounts>>;
  readonly onFlashcards: (category: PracticeCategory) => void;
  readonly onQuiz: (category: PracticeCategory) => void;
}

/** The practice hub's entry point: pick a category, then flashcards or a quiz. */
const CategoryPicker = ({ mastery, onFlashcards, onQuiz }: CategoryPickerProps) => (
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

export default CategoryPicker;
