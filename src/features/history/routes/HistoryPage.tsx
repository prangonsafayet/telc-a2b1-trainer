import { Download, Upload } from 'lucide-react';

import { PageTitle, ScoreHistoryChart } from '@shared/components';
import { type TrainerId } from '@shared/types';
import { Button, Card, CardContent } from '@shared/ui';

import { useProgressBackup } from '@features/progress';

import AttemptTable from '../components/AttemptTable.tsx';
import { useAttemptHistory } from '../hooks/useAttemptHistory.ts';

interface HistoryPageProps {
  readonly trainer: TrainerId;
}

/** Every stored attempt of one trainer, newest first, plus the backup controls. */
const HistoryPage = ({ trainer }: HistoryPageProps) => {
  const history = useAttemptHistory(trainer);
  const backup = useProgressBackup();

  return (
    <>
      <PageTitle lead={history.lead}>{history.heading}</PageTitle>

      <ScoreHistoryChart model={history.chart} />

      <Card className="mt-6 animate-fade-up" style={{ animationDelay: '80ms' }}>
        <CardContent className="overflow-x-auto">
          <AttemptTable model={history.table} />
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

      <p className="mt-2 text-xs text-muted-foreground">
        The backup file holds every trainer&apos;s progress, not just this one.
      </p>
    </>
  );
};

export default HistoryPage;
