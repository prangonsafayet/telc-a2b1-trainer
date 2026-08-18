import { Fragment } from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Progress } from '@/components/ui/progress.jsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.jsx';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from '@/components/ui/accordion.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { LETTERS } from '@/lib/util.js';
import { cn } from '@/lib/utils';

/* Renders text that contains newlines, without dangerouslySetInnerHTML. */
export function Multiline({ text }) {
  const parts = String(text ?? '').split('\n');
  return parts.map((line, i) => (
    <Fragment key={i}>
      {line}
      {i < parts.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

export function PageTitle({ children, lead }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{children}</h1>
      {lead ? <p className="mt-2 max-w-3xl text-muted-foreground">{lead}</p> : null}
    </div>
  );
}

export function SectionTitle({ children, className }) {
  return <h2 className={cn('mb-3 mt-8 text-lg font-semibold tracking-tight', className)}>{children}</h2>;
}

/* 70% is the B1 threshold — the marker shows it on every skill bar. */
export function Meter({ label, value, of = 60, colorByScore = false }) {
  const pct = value != null ? Math.round((value / of) * 100) : 0;
  const tone = !colorByScore || pct >= 70 ? 'bg-primary' : pct >= 40 ? 'bg-[color:var(--warning)]' : 'bg-destructive';
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-muted-foreground">{value != null ? `${value}/${of}` : '—'}</span>
      </div>
      <div className="relative">
        <Progress value={pct} indicatorClassName={tone} />
        <div className="absolute inset-y-0 left-[70%] w-px bg-foreground/40" title="B1 threshold (70%)" />
      </div>
    </div>
  );
}

export const resultVariant = result => (result === 'B1' ? 'success' : result === 'A2' ? 'warning' : 'destructive');
export const difficultyVariant = d => (d === 'easy' ? 'success' : d === 'medium' ? 'warning' : 'info');

/* Hidden until opened — keeps transcripts out of sight during the test. */
export function Transcript({ audio }) {
  return (
    <Accordion type="single" collapsible className="mt-2">
      <AccordionItem value="t" className="border-b-0">
        <AccordionTrigger className="py-2 text-xs text-muted-foreground">Transcript</AccordionTrigger>
        <AccordionContent className="pb-2">
          <div className="rounded-md bg-muted p-3 text-sm leading-relaxed">
            {Array.isArray(audio)
              ? audio.map((t, i) => (
                  <div key={i}>
                    <b>{t.speaker}:</b> {t.text}
                  </div>
                ))
              : audio}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/* richtig / falsch. Radix needs strings, so booleans are encoded on the way in and out. */
export function RichtigFalsch({ name, value, onChange }) {
  return (
    <RadioGroup
      className="flex flex-wrap gap-x-6 gap-y-2"
      value={value == null ? '' : String(value)}
      onValueChange={v => onChange(v === 'true')}
    >
      {[['true', 'richtig'], ['false', 'falsch']].map(([v, label]) => (
        <div className="flex items-center gap-2" key={v}>
          <RadioGroupItem value={v} id={`${name}-${v}`} />
          <Label htmlFor={`${name}-${v}`} className="cursor-pointer font-normal">{label}</Label>
        </div>
      ))}
    </RadioGroup>
  );
}

/* a) b) c) … multiple choice. */
export function MultipleChoice({ name, options, value, onChange }) {
  return (
    <RadioGroup className="gap-2" value={value == null ? '' : String(value)} onValueChange={v => onChange(+v)}>
      {options.map((o, i) => (
        <div className="flex items-start gap-2" key={i}>
          <RadioGroupItem value={String(i)} id={`${name}-${i}`} className="mt-1" />
          <Label htmlFor={`${name}-${i}`} className="cursor-pointer items-start font-normal leading-relaxed">
            <span className="text-muted-foreground">{LETTERS[i]})</span> {o}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}

/* Letter dropdown (a–h) for the matching parts. */
export function LetterSelect({ count, value, onChange, placeholder = '–' }) {
  return (
    <Select value={value == null ? '' : String(value)} onValueChange={v => onChange(+v)}>
      <SelectTrigger size="sm" className="w-20">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: count }, (_, i) => (
          <SelectItem key={i} value={String(i)}>{LETTERS[i]}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

/* One numbered exam item. */
export function QuestionItem({ children, className }) {
  return <div className={cn('space-y-2 border-t py-4 first:border-t-0', className)}>{children}</div>;
}

export function QuestionText({ children }) {
  return <div className="font-medium leading-relaxed">{children}</div>;
}

/* "Teil 1 — …" block wrapper. */
export function Teil({ title, chip, anweisung, children }) {
  return (
    <section className="mb-6 rounded-xl border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold">{title}</h3>
        {chip ? <Badge variant="secondary">{chip}</Badge> : null}
      </div>
      {anweisung ? <p className="mb-4 text-sm italic text-muted-foreground">{anweisung}</p> : null}
      {children}
    </section>
  );
}

/* Reading passage / note sheet. */
export function ReadingText({ title, children }) {
  return (
    <div className="my-4 rounded-lg border bg-muted/40 p-4 leading-relaxed">
      {title ? <div className="mb-2 font-semibold">{title}</div> : null}
      {children}
    </div>
  );
}

export function Callout({ children, className }) {
  return (
    <div className={cn('mb-4 rounded-lg border-l-4 border-primary bg-accent/40 p-3 text-sm', className)}>{children}</div>
  );
}
