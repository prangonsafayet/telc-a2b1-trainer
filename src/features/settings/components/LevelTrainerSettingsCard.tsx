import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@shared/ui';

import LevelSettingsColumn from './LevelSettingsColumn.tsx';

/** Per-trainer settings for B1 and B2 — each has its own exam date and plan. */
const LevelTrainerSettingsCard = () => (
  <Card className="mt-6">
    <CardHeader>
      <CardTitle>B1 &amp; B2 trainers</CardTitle>
      <CardDescription>
        Each trainer has its own exam date; its study plan re-paces around that date independently.
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-8 sm:grid-cols-2">
      <LevelSettingsColumn level="b1" />
      <LevelSettingsColumn level="b2" />
    </CardContent>
  </Card>
);

export default LevelTrainerSettingsCard;
