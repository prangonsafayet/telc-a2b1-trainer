import { describe, expect, it } from 'vitest';

import { DUAL_LEVEL_EXAMS, SINGLE_LEVEL_EXAMS } from '@content/trainers/index.ts';
import { scoreWriting } from '@features/feedback/lib/rubric.ts';
import { TRAINERS } from '@shared/config/trainers.ts';
import { CONNECTOR_CHECK_MIN_WORDS } from '@shared/config/writingRubric.ts';
import { type ErrorReportEntry, type WeaknessCategory, type WritingTarget } from '@shared/types';

const err = (category: WeaknessCategory, offset = 0): ErrorReportEntry => ({
  offset,
  length: 3,
  excerpt: 'xxx',
  message: 'Fehler',
  category,
  suggestion: null,
  ruleId: 'TEST'
});

/*
 * The rubric is a pure function of the window it is handed, so this is the fixture's own
 * window — a plausible half-formal one the GOOD letter below is written against, not a copy
 * of any trainer's. Every trainer's real window comes off the registry in the last describe;
 * `WritingTarget` is the shape `TrainerPaper.writingTarget` and `describeWordCount` share.
 */
const TARGET: WritingTarget = { min: 80, max: 150 };

const LEITPUNKTE = [
  'Beschreiben Sie, welche Ausflüge Sie machen wollen.',
  'Sagen Sie, was die beste Jahreszeit ist.',
  'Erklären Sie, welche Kleidung man mitnehmen soll.',
  'Fragen Sie nach der Unterkunft.'
];

/*
 * 88 words — inside the fixture's window on purpose, since being one word under it is exactly
 * what costs a band — with all four points addressed, a greeting, a sign-off and five
 * different connectors.
 */
const GOOD = `Liebe Marianne,

vielen Dank für deine Nachricht. Ich freue mich sehr auf die Reise.
Zuerst zu den Ausflügen: wir können in die Berge fahren und außerdem eine Stadtführung machen.
Die beste Jahreszeit ist meiner Meinung nach der Frühling, weil es dann nicht zu heiß ist.
Bei der Kleidung würde ich dir feste Schuhe und eine warme Jacke empfehlen, obwohl es tagsüber
mild wird. Ich schlage vor, dass wir am Freitag zusammen packen.
Kannst du mir noch sagen, wie die Unterkunft aussieht und was sie kostet?

Viele Grüße
Anna`;

describe('scoreWriting', () => {
  it('scores a complete, clean, well-formed letter at the top band', () => {
    const score = scoreWriting({ text: GOOD, leitpunkte: LEITPUNKTE, target: TARGET, report: [] });
    expect(score.bands.aufgabenbewaeltigung.points).toBe(5);
    expect(score.bands.kommunikativeGestaltung.points).toBe(5);
    expect(score.bands.formaleRichtigkeit.points).toBe(5);
    expect(score.points).toBe(45);
    expect(score.max).toBe(45);
  });

  it('drops task completion when Leitpunkte are missing', () => {
    const score = scoreWriting({
      text: GOOD,
      leitpunkte: [...LEITPUNKTE, 'Erzählen Sie von Ihrem Beruf als Krankenpflegerin.'],
      target: TARGET,
      report: []
    });
    expect(score.bands.aufgabenbewaeltigung.points).toBeLessThan(5);
    expect(score.bands.aufgabenbewaeltigung.because).toMatch(/4 of 5/);
  });

  it('weights a grammar error far above a style nag', () => {
    const grammar = scoreWriting({
      text: GOOD,
      leitpunkte: LEITPUNKTE,
      target: TARGET,
      report: Array.from({ length: 6 }, (_, i) => err('agreement', i * 10))
    });
    const style = scoreWriting({
      text: GOOD,
      leitpunkte: LEITPUNKTE,
      target: TARGET,
      report: Array.from({ length: 6 }, (_, i) => err('style', i * 10))
    });
    expect(grammar.bands.formaleRichtigkeit.points).toBeLessThan(style.bands.formaleRichtigkeit.points);
    expect(style.bands.formaleRichtigkeit.points).toBe(5);
  });

  it('penalises a letter with no greeting or sign-off', () => {
    const score = scoreWriting({
      text: 'Wir machen Ausflüge. Die beste Jahreszeit ist der Frühling. Kleidung: warm. Unterkunft?',
      leitpunkte: LEITPUNKTE,
      target: TARGET,
      report: []
    });
    expect(score.bands.kommunikativeGestaltung.points).toBeLessThanOrEqual(1);
    expect(score.bands.kommunikativeGestaltung.because).toMatch(/greeting|sign-off/i);
  });

  it('flags a text far under the target length', () => {
    const score = scoreWriting({
      text: 'Hallo, ich komme. Viele Grüße',
      leitpunkte: LEITPUNKTE,
      target: TARGET,
      report: []
    });
    expect(score.bands.aufgabenbewaeltigung.points).toBe(0);
    expect(score.bands.aufgabenbewaeltigung.because).toMatch(/80–150/);
  });

  /*
   * The sign-off list contains "Liebe Grüße" and the greeting list contains "Liebe", so a short
   * note that closes properly but never opens would otherwise be credited with an Anrede it does
   * not have — the same words, in the wrong half of the text. It has to be short: in a full
   * letter the Gruß is far past the window a greeting is looked for in anyway.
   */
  it('does not read a closing "Liebe Grüße" as the opening greeting', () => {
    const closingOnly = scoreWriting({
      text: 'Ich komme am Montag. Liebe Grüße\nAnna',
      leitpunkte: [],
      target: TARGET,
      report: []
    });
    expect(closingOnly.bands.kommunikativeGestaltung.because).toMatch(/Missing[^.]*a greeting/);
    /* Greeting, connectors and paragraphs all missing from a one-line note: the bottom band. */
    expect(closingOnly.bands.kommunikativeGestaltung.points).toBe(0);
  });

  /*
   * Ten of the authored Musterlösungen open with a `Betreff:` line, so the Anrede is not on
   * the first line and cannot be found by looking there.
   */
  it('finds the greeting behind a Betreff line', () => {
    const score = scoreWriting({
      text: `Betreff: Anfrage zum Förderprogramm für Balkonkraftwerke\n\n${GOOD}`,
      leitpunkte: [],
      target: TARGET,
      report: []
    });
    expect(score.bands.kommunikativeGestaltung.points).toBe(5);
  });

  it('counts distinct connectors, not repetitions of one', () => {
    const opening = 'Hallo Anna,\n\n';
    const closing = '\n\nViele Grüße\nTom';
    const oneConnector = `${opening}Ich komme, weil ich Zeit habe. Ich bleibe, weil es schön ist. Ich fahre, weil du da bist.${closing}`;
    const three = `${opening}Ich komme, weil ich Zeit habe. Außerdem bleibe ich lange. Danach fahre ich heim.${closing}`;
    const repeated = scoreWriting({ text: oneConnector, leitpunkte: [], target: TARGET, report: [] });
    expect(repeated.bands.kommunikativeGestaltung.because).toMatch(/Missing[^.]*connector/i);
    expect(repeated.bands.kommunikativeGestaltung.points).toBe(3);
    expect(
      scoreWriting({ text: three, leitpunkte: [], target: TARGET, report: [] }).bands.kommunikativeGestaltung
        .points
    ).toBe(5);
  });

  it('keeps a complete answer out of the top band when it overshoots the window', () => {
    /* The window is the task's, so both ends of it count: the same letter that is a top-band
       answer to an 80–150-word task is 8 words over a 40–80-word one. */
    const wide = scoreWriting({ text: GOOD, leitpunkte: LEITPUNKTE, target: TARGET, report: [] });
    const narrow = scoreWriting({
      text: GOOD,
      leitpunkte: LEITPUNKTE,
      target: { min: 40, max: 80 },
      report: []
    });
    expect(wide.bands.aufgabenbewaeltigung.points).toBe(5);
    expect(narrow.bands.aufgabenbewaeltigung.points).toBe(3);
    expect(narrow.bands.aufgabenbewaeltigung.because).toMatch(/4 of 4 Leitpunkte look addressed/);
    expect(narrow.bands.aufgabenbewaeltigung.because).toMatch(/88 words, this task asks for 40–80/);
  });

  it('never scores outside 0–45, and only ever on a band boundary', () => {
    const inputs = [
      { text: '', leitpunkte: [], report: [] },
      { text: GOOD, leitpunkte: LEITPUNKTE, report: [] },
      { text: 'ganz kurz', leitpunkte: LEITPUNKTE, report: [err('case'), err('spelling', 4)] }
    ];
    for (const target of Object.values(TRAINERS).map(info => info.paper.writingTarget)) {
      for (const input of inputs) {
        const score = scoreWriting({ ...input, target });
        expect(score.points).toBeGreaterThanOrEqual(0);
        expect(score.points).toBeLessThanOrEqual(45);
        /* 5/3/1/0 per criterion, tripled: nothing between those sums is reachable. */
        for (const criterion of Object.values(score.bands)) {
          expect([0, 1, 3, 5]).toContain(criterion.points);
        }
      }
    }
  });
});

/*
 * Calibration against the answers the app itself prints as models. A rubric that marks its own
 * Musterlösungen down is miscalibrated, and this is the only ground truth available offline —
 * so the thresholds are answerable to it, and its ceiling is asserted too, so nobody reads
 * this sweep as proof the matcher is accurate. Formale Richtigkeit is not exercised here: it
 * is the one criterion LanguageTool feeds and the suite never touches the network.
 */
describe('the authored Musterlösungen', () => {
  interface Sample {
    readonly label: string;
    readonly text: string;
    readonly leitpunkte: readonly string[];
    readonly target: WritingTarget;
  }

  const samples: Sample[] = [];
  for (const info of Object.values(TRAINERS)) {
    const target = info.paper.writingTarget;
    if (info.format === 'dual-level') {
      for (const exam of DUAL_LEVEL_EXAMS) {
        const writing = exam.schreiben;
        samples.push({
          label: `${info.short} ${String(exam.id)}`,
          text: writing.musterloesung,
          leitpunkte: writing.points,
          target
        });
      }
    } else {
      for (const exam of SINGLE_LEVEL_EXAMS[info.docKey]) {
        for (const task of exam.schreiben.tasks) {
          samples.push({
            label: `${info.short} ${String(exam.id)}`,
            text: task.musterloesung,
            leitpunkte: task.leitpunkte,
            target
          });
        }
      }
    }
  }

  const scored = samples.map(sample => ({
    label: sample.label,
    target: sample.target,
    score: scoreWriting({
      text: sample.text,
      leitpunkte: sample.leitpunkte,
      target: sample.target,
      report: []
    })
  }));

  it('is every writing task of every trainer, not a sample', () => {
    expect(scored).toHaveLength(35);
  });

  it('credits every one of them with its Anrede and its Gruß', () => {
    /* The greeting sits behind a Betreff line in ten of them and the Gruß three lines from the
       end in others, so this fails the moment the salutation windows stop reaching. */
    const unrecognised = scored.filter(entry =>
      /Missing[^.]*(greeting|sign-off)/i.test(entry.score.bands.kommunikativeGestaltung.because)
    );
    expect(unrecognised.map(entry => entry.label)).toEqual([]);
  });

  it('puts none of them in a bottom band on any criterion', () => {
    for (const entry of scored) {
      for (const criterion of Object.values(entry.score.bands)) {
        expect(criterion.points).toBeGreaterThan(0);
      }
    }
  });

  it("does not hold a short e-mail to a B1 letter's connector standard", () => {
    const shorter = scored.filter(entry => entry.target.min < CONNECTOR_CHECK_MIN_WORDS);
    expect(shorter.length).toBeGreaterThan(0);
    for (const entry of shorter) {
      expect(entry.score.bands.kommunikativeGestaltung.points).toBe(5);
    }
  });

  it('reads most of them as complete', () => {
    const complete = scored.filter(entry => entry.score.bands.aufgabenbewaeltigung.points === 5);
    expect(complete.length).toBeGreaterThan(scored.length / 2);
  });

  /*
   * And reads the rest as incomplete although every Musterlösung addresses every point: a
   * Leitpunkt that names a category ("Nennen Sie eine Uhrzeit") is answered by an instance
   * ("um 14 Uhr"), which no offline lexical matcher can see. Asserted rather than left implicit,
   * because the day this set is empty the sweep above has stopped testing anything.
   */
  it('shows the paraphrase ceiling it cannot get past', () => {
    const incomplete = scored.filter(entry => entry.score.bands.aufgabenbewaeltigung.points < 5);
    expect(incomplete.length).toBeGreaterThan(0);
  });
});
