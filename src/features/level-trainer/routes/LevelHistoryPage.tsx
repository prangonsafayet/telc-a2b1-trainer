import { ListChecks } from 'lucide-react';
import { Link } from 'react-router-dom';

import { PageTitle, SectionTitle } from '@shared/components';
import { SINGLE_LEVEL_MODULE_META } from '@shared/config/singleLevelExam.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { fmtDate } from '@shared/lib/format.ts';
import { type SingleLevelTrainerId } from '@shared/types';
import {
  Badge,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@shared/ui';

import SingleLevelScoreChart from '../components/stats/SingleLevelScoreChart.tsx';
import { useLevelStats } from '../hooks/useLevelStats.ts';

interface LevelHistoryPageProps {
  readonly level: SingleLevelTrainerId;
}

/** Every stored attempt of one level trainer, newest first. */
const LevelHistoryPage = ({ level }: LevelHistoryPageProps) => {
  const { stats } = useLevelStats(level);
  const base = TRAINERS[level].basePath;
  const rows = [...stats.attempts].reverse();

  return (
    <>
      <PageTitle
        lead={
          <>
            Every attempt in the {TRAINERS[level].name} trainer — {String(stats.fullAttempts.length)} full
            exam{stats.fullAttempts.length === 1 ? '' : 's'} and {String(stats.practiceCount)} module practice
            run{stats.practiceCount === 1 ? '' : 's'}.
          </>
        }
      >
        History · {TRAINERS[level].short}
      </PageTitle>

      <SingleLevelScoreChart attempts={stats.attempts} />

      <SectionTitle>Attempts</SectionTitle>
      <Card>
        <CardContent className="overflow-x-auto">
          {rows.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              Nothing here yet — take a Modelltest and it will show up.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead className="text-right">Written</TableHead>
                  <TableHead className="text-right">Oral</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Result</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(attempt => (
                  <TableRow key={attempt.id}>
                    <TableCell className="whitespace-nowrap">{fmtDate(attempt.date)}</TableCell>
                    <TableCell>Test {attempt.examId}</TableCell>
                    <TableCell>
                      {attempt.mode === 'full' ? 'Full exam' : SINGLE_LEVEL_MODULE_META[attempt.mode].short}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {attempt.written != null ? `${String(attempt.written)}/225` : '—'}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {attempt.oral != null ? `${String(attempt.oral)}/75` : '—'}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {attempt.total != null ? `${String(attempt.total)}/300` : '—'}
                    </TableCell>
                    <TableCell>
                      {attempt.result ? (
                        <Badge variant={attempt.result === 'Bestanden' ? 'success' : 'destructive'}>
                          {attempt.result}
                        </Badge>
                      ) : (
                        <Badge variant="outline">practice</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="ghost">
                        <Link to={`${base}/review/${String(attempt.id)}`}>
                          <ListChecks /> Review
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default LevelHistoryPage;
