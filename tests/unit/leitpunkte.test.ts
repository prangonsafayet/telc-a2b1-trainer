import { describe, expect, it } from 'vitest';

import { DUAL_LEVEL_EXAMS, SINGLE_LEVEL_EXAMS } from '@content/trainers/index.ts';
import { coveredLeitpunkte, cuesFor } from '@features/feedback/lib/leitpunkte.ts';
import { FUNCTION_WORDS, MIN_CUE_LENGTH, PROMPT_VERBS } from '@shared/config/writingRubric.ts';

describe('cuesFor', () => {
  it('keeps content words and drops function words', () => {
    expect(cuesFor('Sagen Sie, wann Sie ankommen und wo Sie wohnen werden.')).toEqual(
      expect.arrayContaining(['ankommen', 'wohnen'])
    );
    expect(cuesFor('Sagen Sie, wann Sie ankommen.')).not.toContain('sie');
  });

  it('normalises umlauts and ß so spelling variants still match', () => {
    expect(cuesFor('Grüße die Schülerin')).toEqual(expect.arrayContaining(['gruesse', 'schuelerin']));
  });

  /*
   * The verbs telc opens a Leitpunkt with are not function words — they are the instruction
   * ("Beschreiben Sie …", "Begründen Sie …") — but they carry no topic either, so a learner
   * who writes "beschreiben" has shown nothing. The list is harvested from the 125 writing
   * points actually authored in `src/content`; see PROMPT_VERBS in @shared/config/writingRubric.ts.
   */
  it('drops the instruction verb a Leitpunkt opens with', () => {
    const cues = cuesFor('Begründen Sie Ihre Meinung zum Kurs.');
    expect(cues).not.toContain('begruenden');
    expect(cues).toEqual(expect.arrayContaining(['meinung']));
  });

  /*
   * Both lists are consulted only after a word has passed the length filter, so an entry
   * shorter than that filters nothing and is dead weight that reads as if it worked.
   */
  it('has no stopword the length filter already drops', () => {
    const short = [...FUNCTION_WORDS, ...PROMPT_VERBS].filter(word => word.length < MIN_CUE_LENGTH);
    expect(short).toEqual([]);
  });
});

describe('coveredLeitpunkte', () => {
  const points = [
    'Beschreiben Sie, welche Ausflüge Sie machen wollen.',
    'Sagen Sie, was die beste Jahreszeit für die Reise ist.',
    'Erklären Sie, welche Kleidung sie mitnehmen soll.'
  ];

  it('marks a point covered when the learner uses one of its content words', () => {
    const text = 'Wir können viele Ausflüge machen. Die beste Jahreszeit ist der Frühling.';
    expect(coveredLeitpunkte(text, points)).toEqual([true, true, false]);
  });

  it('matches across an inflected ending', () => {
    expect(coveredLeitpunkte('Nimm warme Kleidungsstücke mit.', [points[2] ?? ''])).toEqual([true]);
  });

  it('is not fooled by the learner quoting the prompt words in a different point', () => {
    /* "Reise" belongs to point 2; on its own it must not also satisfy point 1. */
    expect(coveredLeitpunkte('Die Reise war schön.', [points[0] ?? ''])).toEqual([false]);
  });

  it('returns one verdict per point, and nothing for no points', () => {
    expect(coveredLeitpunkte('Beliebiger Text.', points)).toHaveLength(points.length);
    expect(coveredLeitpunkte('Beliebiger Text.', [])).toEqual([]);
  });
});

/*
 * The stopword lists deciding what counts as a cue are load-bearing: one word too many on
 * either list turns a real writing task into a point the matcher cannot judge. Every authored
 * writing point is swept rather than a sample, and the sweep asserts its own size first — a
 * filter that silently matched nothing would otherwise pass this vacuously.
 */
describe('the authored Leitpunkte', () => {
  const authored: readonly string[] = [
    ...DUAL_LEVEL_EXAMS.flatMap(exam => exam.schreiben.points),
    ...Object.values(SINGLE_LEVEL_EXAMS).flatMap(exams =>
      exams.flatMap(exam => exam.schreiben.tasks.flatMap(task => task.leitpunkte))
    )
  ];

  const uncheckable = authored.filter(point => cuesFor(point).length === 0);

  it('is a real corpus, not an empty sweep', () => {
    expect(authored.length).toBeGreaterThan(120);
  });

  /*
   * Two of the 125 — "Sagen Sie: Sie machen gern mit." and "Bedanken Sie sich und sagen Sie
   * zu." — are light verbs and particles all the way down (mitmachen, zusagen), so no word
   * list could extract a cue from them. That is a ceiling on the matcher, not a bug in the
   * lists; a stopword list that had started eating ordinary nouns would push this share up.
   */
  it('extracts a cue from all but a handful of them', () => {
    expect(uncheckable.length).toBeLessThan(authored.length * 0.05);
  });

  it('gives a point it cannot check the benefit of the doubt', () => {
    expect(uncheckable.length).toBeGreaterThan(0);
    expect(coveredLeitpunkte('Ein Text ohne jeden Bezug.', uncheckable)).toEqual(uncheckable.map(() => true));
  });
});
