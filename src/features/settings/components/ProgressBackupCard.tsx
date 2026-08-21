import { Download, Upload } from 'lucide-react';

import { Button, Card, CardContent } from '@shared/ui';

import { useProgressData } from '../hooks/useProgressData.ts';

/** The backup pair. One file holds every trainer's progress, so both act on all of them. */
const ProgressBackupCard = () => {
  const { exportToFile, importFromFile } = useProgressData();

  return (
    <Card>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={exportToFile}>
            <Download /> Export a backup
          </Button>
          <Button variant="outline" onClick={importFromFile}>
            <Upload /> Import a backup
          </Button>
        </div>
        <p className="max-w-2xl text-sm text-muted-foreground">
          The file is JSON and holds every trainer&apos;s attempts, plans and settings. Importing one asks
          first, then replaces what is in this browser for the trainers the file carries; a trainer it does
          not mention keeps its progress. If you are signed in, the result syncs to your other devices.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressBackupCard;
