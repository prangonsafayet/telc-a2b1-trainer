import { Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

interface EmptyBankNoticeProps {
  readonly trainerName: string;
  /** Where the curriculum lives, which is what there is to study meanwhile. */
  readonly learnTo: string;
}

/**
 * What the practice hub shows a trainer with no vocabulary bank yet. Stated plainly rather
 * than hidden: an empty hub with five 0/0 categories reads as broken, and a missing tab
 * reads as a missing feature.
 */
const EmptyBankNotice = ({ trainerName, learnTo }: EmptyBankNoticeProps) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-base">
        <Layers className="size-4 text-muted-foreground" aria-hidden />
        No vocabulary bank yet
      </CardTitle>
      <CardDescription>
        The {trainerName} trainer has no vocabulary and grammar bank to drill yet, so there is nothing here to
        practise. Its Modelltests and its study plan are complete and waiting.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Button asChild size="sm">
        <Link to={learnTo}>Open the study plan ▸</Link>
      </Button>
    </CardContent>
  </Card>
);

export default EmptyBankNotice;
