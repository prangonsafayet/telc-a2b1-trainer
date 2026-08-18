import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Check, Home, RotateCcw, X } from 'lucide-react';
import { Multiline, PageTitle, SectionTitle, Transcript } from '@/components/common.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { examById } from '@/data/exams.js';
import { MODULES } from '@/lib/constants.js';
import { newRun, saveRun } from '@/lib/runState.js';
import { gapCorrect } from '@/lib/scoring.js';
import { useDB } from '@/lib/store.jsx';
import { LETTERS, fmtDate } from '@/lib/util.js';
import { cn } from '@/lib/utils';

function ReviewItem({ ok, question, your, correct, children }) {
  return (
    <div
      className={cn(
        'my-2 rounded-lg border border-l-4 p-3',
        ok ? 'border-l-[color:var(--success)]' : 'border-l-destructive'
      )}
    >
      <div className="flex items-start gap-2">
        {ok
          ? <Check className="mt-0.5 size-4 shrink-0 text-[color:var(--success)]" />
          : <X className="mt-0.5 size-4 shrink-0 text-destructive" />}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="font-medium leading-relaxed">{question}</div>
          <div className={cn('text-sm', ok ? 'text-muted-foreground' : 'text-destructive')}>
            Your answer: {your ?? '—'}
          </div>
          {ok ? null : (
            <div className="text-sm font-semibold text-[color:var(--success-foreground)]">Correct: {correct}</div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Review() {
  const { attemptId } = useParams();
  const { db } = useDB();
  const navigate = useNavigate();
  const a = db.attempts.find(x => String(x.id) === String(attemptId));

  if (!a) return <Navigate to="/history" replace />;

  const ex = examById(a.examId);
  const ans = a.answers || {};
  const has = m => a.mode === 'full' || a.mode === m;

  const retry = () => {
    saveRun(newRun(a.examId, a.mode, a.mode === 'full' ? MODULES.slice() : [a.mode]));
    navigate(`/exam/${a.examId}/${a.mode}`);
  };

  return (
    <>
      <PageTitle lead={`${fmtDate(a.date)} · Green = correct, red = wrong. Learn every red item before the next test.`}>
        Review — {ex.title}
      </PageTitle>

      {has('lesen') ? (
        <>
          <SectionTitle>Lesen — {a.scores.lesen}/60</SectionTitle>
          {ex.lesen.teil1.answers.map((c, i) => (
            <ReviewItem
              key={`l1${i}`}
              ok={ans[`l1.${i}`] === c}
              question={`T1.${i + 1} ${ex.lesen.teil1.situations[i]}`}
              your={ans[`l1.${i}`] != null ? `${LETTERS[ans[`l1.${i}`]]}) ${ex.lesen.teil1.ads[ans[`l1.${i}`]]}` : null}
              correct={`${LETTERS[c]}) ${ex.lesen.teil1.ads[c]}`}
            />
          ))}
          {ex.lesen.teil2.questions.map((q, i) => (
            <ReviewItem
              key={`l2${i}`}
              ok={ans[`l2.${i}`] === q.answer}
              question={`T2.${i + 1} ${q.frage}`}
              your={ans[`l2.${i}`] != null ? q.options[ans[`l2.${i}`]] : null}
              correct={q.options[q.answer]}
            />
          ))}
          {ex.lesen.teil3.answers.map((c, i) => (
            <ReviewItem
              key={`l3${i}`}
              ok={ans[`l3.${i}`] === c}
              question={`T3.${i + 1} ${ex.lesen.teil3.messages[i].slice(0, 90)}…`}
              your={ans[`l3.${i}`] != null ? ex.lesen.teil3.headlines[ans[`l3.${i}`]] : null}
              correct={ex.lesen.teil3.headlines[c]}
            />
          ))}
          {ex.lesen.teil4.statements.map((st, i) => (
            <ReviewItem
              key={`l4${i}`}
              ok={ans[`l4.${i}`] === st.answer}
              question={`T4.${i + 1} ${st.text}`}
              your={ans[`l4.${i}`] == null ? null : ans[`l4.${i}`] ? 'richtig' : 'falsch'}
              correct={st.answer ? 'richtig' : 'falsch'}
            />
          ))}
        </>
      ) : null}

      {has('sprachbausteine') && a.sb ? (
        <>
          <SectionTitle>Sprachbausteine — {a.sb.correct}/17 ({a.sb.percent}%)</SectionTitle>
          {ex.sprachbausteine.teil1.gaps.map((g, i) => (
            <ReviewItem
              key={`s1${i}`}
              ok={ans[`s1.${i}`] === g.answer}
              question={`T1 Lücke ${i + 1}`}
              your={ans[`s1.${i}`] != null ? g.options[ans[`s1.${i}`]] : null}
              correct={g.options[g.answer]}
            />
          ))}
          {ex.sprachbausteine.teil2.answers.map((c, i) => (
            <ReviewItem
              key={`s2${i}`}
              ok={ans[`s2.${i}`] === c}
              question={`T2 Lücke ${i + 1}`}
              your={ans[`s2.${i}`] != null ? ex.sprachbausteine.teil2.wordBank[ans[`s2.${i}`]] : null}
              correct={ex.sprachbausteine.teil2.wordBank[c]}
            />
          ))}
          {ex.sprachbausteine.teil3.items.map((it, i) => (
            <ReviewItem
              key={`s3${i}`}
              ok={ans[`s3.${i}`] === it.answer}
              question={`T3.${i + 1} ${it.prompt}`}
              your={ans[`s3.${i}`] != null ? it.options[ans[`s3.${i}`]] : null}
              correct={it.options[it.answer]}
            />
          ))}
        </>
      ) : null}

      {has('hoeren') ? (
        <>
          <SectionTitle>Hören — {a.scores.hoeren}/60</SectionTitle>
          {ex.hoeren.teil1.items.map((it, i) => (
            <ReviewItem
              key={`h1${i}`}
              ok={ans[`h1.${i}`] === it.answer}
              question={`T1.${i + 1} ${it.statement}`}
              your={ans[`h1.${i}`] == null ? null : ans[`h1.${i}`] ? 'richtig' : 'falsch'}
              correct={it.answer ? 'richtig' : 'falsch'}
            >
              <Transcript audio={it.audio} />
            </ReviewItem>
          ))}
          {ex.hoeren.teil2.items.map((it, i) => (
            <ReviewItem
              key={`h2${i}`}
              ok={ans[`h2.${i}`] === it.answer}
              question={`T2.${i + 1} ${it.frage}`}
              your={ans[`h2.${i}`] != null ? it.options[ans[`h2.${i}`]] : null}
              correct={it.options[it.answer]}
            >
              <Transcript audio={it.audio} />
            </ReviewItem>
          ))}
          {ex.hoeren.teil3.items.map((it, i) => (
            <ReviewItem
              key={`h3${i}`}
              ok={ans[`h3.${i}`] === it.answer}
              question={`T3.${i + 1} ${it.statement}`}
              your={ans[`h3.${i}`] == null ? null : ans[`h3.${i}`] ? 'richtig' : 'falsch'}
              correct={it.answer ? 'richtig' : 'falsch'}
            >
              <Transcript audio={it.audio} />
            </ReviewItem>
          ))}
          <Card className="my-3"><CardContent><Transcript audio={ex.hoeren.teil4.audio} /></CardContent></Card>
          {ex.hoeren.teil4.questions.map((q, i) => (
            <ReviewItem
              key={`h4${i}`}
              ok={ans[`h4.${i}`] === q.answer}
              question={`T4.${i + 1} ${q.frage}`}
              your={ans[`h4.${i}`] != null ? q.options[ans[`h4.${i}`]] : null}
              correct={q.options[q.answer]}
            />
          ))}
          <Card className="my-3"><CardContent><Transcript audio={ex.hoeren.teil5.audio} /></CardContent></Card>
          {ex.hoeren.teil5.gaps.map((g, i) => (
            <ReviewItem
              key={`h5${i}`}
              ok={gapCorrect(g, ans[`h5.${i}`])}
              question={`T5.${i + 1} ${g.label.replace('____', '______')}`}
              your={ans[`h5.${i}`]}
              correct={g.answer}
            />
          ))}
        </>
      ) : null}

      {has('schreiben') ? (
        <>
          <SectionTitle>Schreiben — {a.scores.schreiben ?? '–'}/60 (self-scored)</SectionTitle>
          <Card>
            <CardContent className="space-y-4">
              <div>
                <h3 className="mb-2 font-semibold">Your text</h3>
                <div className="rounded-lg border bg-muted/40 p-4 leading-relaxed">
                  <Multiline text={ans['w.text'] || '(empty)'} />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-semibold">Musterlösung</h3>
                <div className="rounded-lg border-l-4 border-[color:var(--success)] bg-[color-mix(in_oklab,var(--success)_8%,transparent)] p-4 leading-relaxed">
                  <Multiline text={ex.schreiben.musterloesung} />
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : null}

      {has('sprechen') ? (
        <>
          <SectionTitle>Sprechen — {a.scores.sprechen ?? '–'}/60 (self-scored)</SectionTitle>
          <Card>
            <CardContent className="text-sm text-muted-foreground">
              Recordings are session-only and not stored. Re-run the module to practice again — and re-read the Sprechen
              tactics in the Exam Guide.
            </CardContent>
          </Card>
        </>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        <Button onClick={retry}><RotateCcw /> Retry this exam</Button>
        <Button asChild variant="ghost"><Link to="/"><Home /> Dashboard</Link></Button>
      </div>
    </>
  );
}
