import { Download, Upload } from 'lucide-react';

import { PageTitle } from '@shared/components';
import { ScoreHistoryChart } from '@shared/components/data-display/ScoreHistoryChart.tsx';
import { Button, Card, CardContent } from '@shared/ui';

import { useProgress } from '@features/progress';

import { AttemptTable } from '../components/AttemptTable.tsx';
import { useProgressBackup } from '../hooks/useProgressBackup.ts';
import { buildAttemptRows } from '../lib/attemptRows.ts';

export const HistoryPage = () => {
  const { db } = useProgress();
  const backup = useProgressBackup();
  const rows = buildAttemptRows(db.attempts);

  return (
    <>
      <PageTitle lead="Every attempt, full exam or single module, with the time you actually used.">
        History
      </PageTitle>

      <ScoreHistoryChart attempts={db.attempts} />

      <Card className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <CardContent>
          <AttemptTable rows={rows} />
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={backup.exportToFile}>
          <Download /> Export progress (JSON)
        </Button>
        <Button variant="outline" onClick={backup.importFromFile}>
          <Upload /> Import progress
        </Button>
      </div>
    </>
  );
};
