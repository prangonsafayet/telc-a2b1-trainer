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
          The file is JSON and holds every trainer&apos;s attempts, plans and settings. Importing one replaces
          what is in this browser.
        </p>
      </CardContent>
    </Card>
  );
};

export default ProgressBackupCard;
