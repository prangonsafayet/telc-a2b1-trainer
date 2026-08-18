import { Multiline, Teil } from '@/components/common.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { cn } from '@/lib/utils';
import { wordCount } from '@/lib/util.js';

export default function Schreiben({ exam, answers, setAnswer }) {
  const W = exam.schreiben;
  const text = answers['w.text'] ?? '';
  const n = wordCount(text);
  const inRange = n >= 40 && n <= 80;
  const hint = n < 40 ? 'aim for 40–60' : n > 80 ? 'that is plenty — check your grammar!' : 'good length ✓';

  return (
    <Teil title="Schreiben — E-Mail beantworten" chip="60 Punkte" anweisung={W.anweisung}>
      <p className="mb-4">{W.situation}</p>

      <div className="my-4 overflow-hidden rounded-lg border">
        <div className="border-b bg-muted/60 px-4 py-2 text-sm text-muted-foreground">
          Von: {W.incomingEmail.von} · Betreff: <b className="text-foreground">{W.incomingEmail.betreff}</b>
        </div>
        <div className="p-4 leading-relaxed">
          <Multiline text={W.incomingEmail.text} />
        </div>
      </div>

      <p className="mb-2 font-semibold">Schreiben Sie zu diesen Punkten:</p>
      <ol className="mb-4 list-decimal space-y-1 pl-5">
        {W.points.map((p, i) => <li key={i}>{p}</li>)}
      </ol>

      <Textarea
        className="min-h-64 leading-relaxed"
        placeholder="Liebe/r …"
        spellCheck={false}
        value={text}
        onChange={e => setAnswer('w.text', e.target.value)}
      />
      <div className={cn('mt-2 text-right text-sm', inRange ? 'text-[color:var(--success-foreground)]' : 'text-muted-foreground')}>
        {n} Wörter — {hint}
      </div>
    </Teil>
  );
}
