import { useEffect, useRef, useState } from 'react';
import { Circle, Mic, Square } from 'lucide-react';
import { toast } from 'sonner';
import { Callout, Teil } from '@/components/common.jsx';
import { Button } from '@/components/ui/button.jsx';

/* Recordings stay in memory as blob URLs — they are never uploaded or written to disk,
   and therefore do not survive a page refresh. */
function Recorder({ part, recordings, setRecording }) {
  const [state, setState] = useState('idle'); // idle | recording | done | error
  const [msg, setMsg] = useState('');
  const ref = useRef({ stream: null, rec: null });
  const supported =
    typeof navigator !== 'undefined' && navigator.mediaDevices && typeof window !== 'undefined' && !!window.MediaRecorder;

  useEffect(() => () => {
    const { stream, rec } = ref.current;
    if (rec && rec.state !== 'inactive') rec.stop();
    if (stream) stream.getTracks().forEach(t => t.stop());
  }, []);

  const start = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      const chunks = [];
      rec.ondataavailable = e => chunks.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunks, { type: rec.mimeType || 'audio/webm' });
        setRecording(part, URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
        setState('done');
        setMsg('recorded ✓ — listen below');
      };
      rec.start();
      ref.current = { stream, rec };
      setState('recording');
      setMsg('recording…');
    } catch (e) {
      setState('error');
      setMsg('Microphone not available — practice out loud and self-rate.');
      toast.error('Microphone unavailable', {
        description: 'Allow microphone access in your browser, or just speak out loud and rate yourself.'
      });
    }
  };

  const stop = () => {
    const { rec } = ref.current;
    if (rec && rec.state !== 'inactive') rec.stop();
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3 border-t pt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={start}
        disabled={!supported || state === 'recording'}
        title={supported ? '' : 'Recording not supported in this browser'}
      >
        <Mic /> Record
      </Button>
      <Button variant="outline" size="sm" onClick={stop} disabled={state !== 'recording'}>
        <Square /> Stop
      </Button>
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        {state === 'recording' ? <Circle className="size-2.5 animate-pulse fill-destructive text-destructive" /> : null}
        {msg}
      </span>
      {recordings[part] ? <audio controls src={recordings[part]} className="h-8" /> : null}
    </div>
  );
}

function Redemittel({ items }) {
  return (
    <div className="my-4 rounded-lg border-l-4 border-[color:var(--warning)] bg-[color-mix(in_oklab,var(--warning)_10%,transparent)] p-3">
      <b className="text-sm">Redemittel:</b>
      <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm">
        {items.map((r, i) => <li key={i}>{r}</li>)}
      </ul>
    </div>
  );
}

function Punkte({ items }) {
  return (
    <div className="my-4 grid gap-2 sm:grid-cols-2">
      {items.map((p, i) => (
        <div key={i} className="rounded-lg border bg-muted/40 p-3 text-sm">{p}</div>
      ))}
    </div>
  );
}

export default function Sprechen({ exam, recordings, setRecording }) {
  const P = exam.sprechen;
  const rec = part => <Recorder part={part} recordings={recordings} setRecording={setRecording} />;

  return (
    <>
      <Callout className="flex items-start gap-2">
        <Mic className="mt-0.5 size-4 shrink-0" />
        <span>
          Speak OUT LOUD — ideally record yourself (allow the microphone) and listen back. In the real exam there is{' '}
          <b>no preparation time</b>. Recordings live only in this session; they are not saved to disk.
        </span>
      </Callout>

      <Teil title="Teil 1 — Sich vorstellen" chip="~2 Min." anweisung={P.teil1.anweisung}>
        <Punkte items={P.teil1.punkte} />
        <Redemittel items={P.teil1.redemittel} />
        {rec('t1')}
      </Teil>

      <Teil title="Teil 2 — Über ein Thema sprechen" chip="~5 Min.">
        <p className="mb-2 font-semibold">Thema: {P.teil2.thema}</p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          {P.teil2.anweisung} <b className="not-italic text-foreground">Read the task twice before you start!</b>
        </p>
        <ol className="my-4 list-decimal space-y-1 pl-5">
          {P.teil2.leitfragen.map((f, i) => <li key={i}>{f}</li>)}
        </ol>
        <Redemittel items={P.teil2.redemittel} />
        {rec('t2')}
      </Teil>

      <Teil title="Teil 3 — Gemeinsam planen" chip="~5 Min.">
        <p className="mb-2 font-semibold">{P.teil3.aufgabe}</p>
        <p className="mb-4 text-sm italic text-muted-foreground">
          {P.teil3.anweisung} (Solo training: speak both roles, or grab a partner.)
        </p>
        <Punkte items={P.teil3.punkte} />
        <Redemittel items={P.teil3.redemittel} />
        {rec('t3')}
      </Teil>
    </>
  );
}
