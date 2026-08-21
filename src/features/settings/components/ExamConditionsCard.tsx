import { TRAINER_ORDER } from '@shared/config/trainers.ts';
import { Card, CardContent } from '@shared/ui';

import TrainerConditionsRow from './TrainerConditionsRow.tsx';

/**
 * One row per trainer, generated from the registry, so the same two conditions are set the
 * same way for every paper — and a fourth trainer gets its row without an edit here.
 */
const ExamConditionsCard = () => (
  <Card className="py-0">
    <CardContent className="divide-y py-6">
      {TRAINER_ORDER.map(trainer => (
        <TrainerConditionsRow key={trainer} trainer={trainer} />
      ))}
    </CardContent>
  </Card>
);

export default ExamConditionsCard;
