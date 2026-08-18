import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Check, Copy, Sparkles } from 'lucide-react';
import { PageTitle, SectionTitle } from '@/components/common.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion.jsx';
import { LEARN } from '@/content.js';
import { useDB } from '@/lib/store.jsx';
import { cn } from '@/lib/utils';

function CopyPromptButton({ prompt }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <Button variant="outline" size="sm" className="mt-2" onClick={copy}>
      {copied ? <><Check /> Copied</> : <><Copy /> Copy prompt</>}
    </Button>
  );
}

export default function Learn() {
  const { db, update } = useDB();
  const { hash } = useLocation();
  const [openSheets, setOpenSheets] = useState([]);
  const done = db.learnDone;

  /* A "#cs-writing" link from a day card should open that cheatsheet, not just
     scroll to a collapsed header. */
  useEffect(() => {
    if (!hash.startsWith('#cs-')) return;
    const id = hash.slice(4);
    setOpenSheets(prev => (prev.includes(id) ? prev : [...prev, id]));
    const el = document.getElementById(`cs-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  const totalTasks = LEARN.days.reduce((n, d) => n + d.tasks.length, 0);
  const doneCount = Object.values(done).filter(Boolean).length;

  const toggle = (key, checked) =>
    update(draft => {
      draft.learnDone = { ...draft.learnDone, [key]: checked };
      if (!checked) delete draft.learnDone[key];
    });

  return (
    <>
      <PageTitle lead={LEARN.intro}>AI-assisted learning — 14 days to mock-exam readiness</PageTitle>

      <Card>
        <CardContent className="space-y-2">
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium">Plan progress</span>
            <span className="tabular-nums text-muted-foreground">{doneCount}/{totalTasks} tasks done</span>
          </div>
          <Progress value={totalTasks ? (doneCount / totalTasks) * 100 : 0} />
        </CardContent>
      </Card>

      <SectionTitle>The 14-day plan</SectionTitle>
      <div className="space-y-4">
        {LEARN.days.map(d => {
          const dayDone = d.tasks.every((_, i) => done[`d${d.day}t${i}`]);
          return (
            <Card key={d.day} className={cn(dayDone && 'border-l-4 border-l-[color:var(--success)]')}>
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <CardTitle className="text-base">Day {d.day}: {d.title}</CardTitle>
                  <Badge variant="secondary">{d.focus}</Badge>
                  {dayDone ? <Badge variant="success">done</Badge> : null}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {d.tasks.map((t, i) => {
                    const key = `d${d.day}t${i}`;
                    return (
                      <label key={key} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed">
                        <Checkbox className="mt-0.5" checked={!!done[key]} onCheckedChange={c => toggle(key, !!c)} />
                        <span className={cn(done[key] && 'text-muted-foreground line-through')}>{t}</span>
                      </label>
                    );
                  })}
                </div>

                <div className="text-xs text-muted-foreground">
                  Cheatsheets:{' '}
                  {d.cheats.map((c, i) => (
                    <span key={c}>
                      {i > 0 ? ' · ' : ''}
                      <a className="underline underline-offset-2 hover:text-foreground" href={`#cs-${c}`}>
                        {LEARN.cheatsheets[c].title}
                      </a>
                    </span>
                  ))}
                </div>

                {d.ai.map((a, i) => (
                  <div key={i} className="rounded-lg border-l-4 border-primary bg-accent/40 p-3">
                    <div className="flex items-center gap-1.5 font-semibold">
                      <Sparkles className="size-4" /> AI practice — {a.t}
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{a.p}</p>
                    <CopyPromptButton prompt={a.p} />
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <SectionTitle>Cheatsheets</SectionTitle>
      <p className="mb-3 text-muted-foreground">Open, study, and come back before every mock exam.</p>
      <Card>
        <CardContent>
          <Accordion type="multiple" value={openSheets} onValueChange={setOpenSheets}>
            {Object.entries(LEARN.cheatsheets).map(([id, cs]) => (
              <AccordionItem key={id} value={id} id={`cs-${id}`} className="scroll-mt-24">
                <AccordionTrigger className="text-base font-semibold">{cs.title}</AccordionTrigger>
                <AccordionContent>
                  <div
                    className="prose prose-sm prose-stone max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: cs.html }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </>
  );
}
