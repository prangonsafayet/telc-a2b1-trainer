import { TRAINER_ORDER } from '@shared/config/trainers.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import TrainerConditionsColumn from './TrainerConditionsColumn.tsx';

/**
 * One column per trainer, generated from the registry — so every trainer's exam date is
 * named after it, a screen reader can tell the three pickers apart, and a fourth trainer
 * appears here on its own.
 */
const TrainerConditionsCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Exam dates &amp; conditions</CardTitle>
      <CardDescription>
        Each trainer has its own exam date; its study plan re-paces around that date independently. The
        defaults match the official telc format for that paper.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {TRAINER_ORDER.map(trainer => (
        <TrainerConditionsColumn key={trainer} trainer={trainer} />
      ))}
    </CardContent>
  </Card>
);

export default TrainerConditionsCard;
