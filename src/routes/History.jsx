import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import HistoryChart from '@/components/HistoryChart.jsx';
import { PageTitle, resultVariant } from '@/components/common.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.jsx';
import { MOD_META } from '@/lib/constants.js';
import { normalizeDB, useDB } from '@/lib/store.jsx';
import { fmtClock, fmtDate } from '@/lib/util.js';

const COLUMNS = ['Date', 'Test', 'Mode', 'Lesen', 'SB %', 'Hören', 'Schreiben', 'Sprechen', 'Total', 'Result', 'Time', ''];

export default function History() {
  const { db, replaceLocal } = useDB();
  const fileRef = useRef(null);
  const rows = db.attempts.slice().reverse();

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(db, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'telc-trainer-progress.json';
    a.click();
    URL.revokeObjectURL(a.href);
    toast.success('Progress exported.');
  };

  const importJSON = e => {
    const f = e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const next = normalizeDB(JSON.parse(r.result));
        next._updatedAt = new Date().toISOString();
        replaceLocal(next);
        toast.success('Progress imported.');
      } catch (err) {
        toast.error('Invalid file — that JSON is not a trainer export.');
      }
    };
    r.readAsText(f);
    e.target.value = '';
  };

  return (
    <>
      <PageTitle lead="Every attempt, full exam or single module, with the time you actually used.">History</PageTitle>

      <HistoryChart attempts={db.attempts} />

      <Card className="mt-6">
        <CardContent>
          {rows.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {COLUMNS.map((c, i) => <TableHead key={i}>{c}</TableHead>)}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map(a => {
                  const s = a.scores || {};
                  const t = Object.values(a.times || {}).reduce((x, y) => x + y, 0);
                  return (
                    <TableRow key={a.id}>
                      <TableCell>{fmtDate(a.date)}</TableCell>
                      <TableCell>T{a.examId}</TableCell>
                      <TableCell>{a.mode === 'full' ? 'Full' : MOD_META[a.mode].short}</TableCell>
                      <TableCell className="tabular-nums">{s.lesen ?? '–'}</TableCell>
                      <TableCell className="tabular-nums">{a.sb ? a.sb.percent + '%' : '–'}</TableCell>
                      <TableCell className="tabular-nums">{s.hoeren ?? '–'}</TableCell>
                      <TableCell className="tabular-nums">{s.schreiben ?? '–'}</TableCell>
                      <TableCell className="tabular-nums">{s.sprechen ?? '–'}</TableCell>
                      <TableCell className="font-semibold tabular-nums">{a.mode === 'full' ? `${a.total}/240` : '–'}</TableCell>
                      <TableCell>
                        {a.mode === 'full' ? <Badge variant={resultVariant(a.result)}>{a.result}</Badge> : '–'}
                      </TableCell>
                      <TableCell className="tabular-nums">{fmtClock(t)}</TableCell>
                      <TableCell>
                        <Button asChild variant="ghost" size="sm">
                          <Link to={`/review/${a.id}`}>Review</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="py-8 text-center text-sm text-muted-foreground">No attempts yet.</p>
          )}
        </CardContent>
      </Card>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" onClick={exportJSON}><Download /> Export progress (JSON)</Button>
        <Button variant="outline" onClick={() => fileRef.current.click()}><Upload /> Import progress</Button>
        <input type="file" ref={fileRef} accept=".json" hidden onChange={importJSON} />
      </div>
    </>
  );
}
