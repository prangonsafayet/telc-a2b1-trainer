import { beforeEach, describe, expect, it } from 'vitest';

import { TRAINERS, TRAINER_ORDER } from '@shared/config/trainers.ts';
import { type ExamRun } from '@features/exam';
import { runFormatFor } from '@features/exam';
import { PROGRESS_STORAGE_KEY } from '@features/progress';
import { type TrainerId } from '@shared/types';

import { bySelector, click, mount, seedProgress } from './harness.ts';

/*
 * "Delete all progress" left both run keys behind: a half-finished attempt — its answers,
 * its remaining time and the text typed into the writing module — survived the wipe, and the
 * dashboard offered to resume it immediately afterwards. Driven through the real Settings
 * screen, dialog included, because the copy the user reads is half of the fix.
 */

const docKeys = TRAINER_ORDER.map(trainer => TRAINERS[trainer].docKey).filter(
  (key): key is NonNullable<typeof key> => key !== null
);

const run = (trainer: TrainerId): ExamRun => ({
  runId: 1_700_000_000_000,
  trainer,
  examId: 1,
  mode: 'lesen',
  queue: ['lesen'],
  index: 0,
  phase: 'module',
  answers: { 'l1.0': 'a', 'w.text': 'Sehr geehrte Damen und Herren' },
  times: {},
  plays: {},
  ratings: {},
  deadline: Date.now() + 60_000,
  moduleStart: Date.now()
});

const storedDocument = (): Partial<Record<string, unknown>> =>
  JSON.parse(localStorage.getItem(PROGRESS_STORAGE_KEY) ?? '{}') as Partial<Record<string, unknown>>;

const trainerDoc = (key: string): Partial<Record<string, unknown>> =>
  (storedDocument()[key] ?? {}) as Partial<Record<string, unknown>>;

/** The confirm dialog's own action button, not the card's button of the same name. */
const dialogButton = (pattern: RegExp): Element | undefined =>
  bySelector('[role="alertdialog"] button').find(button => pattern.test(button.textContent ?? ''));

describe('delete all progress', () => {
  beforeEach(() => {
    localStorage.clear();
    seedProgress({ daysUntilExam: 30, attempts: [{ examId: 1 }], completedDays: [{ day: 1, tasks: 2 }] });

    /* Every trainer with work in it: the root slice from `seedProgress`, its own document
       here, and a run in progress for each paper. */
    const document_ = storedDocument();
    for (const key of docKeys) {
      document_[key] = { attempts: [], learnDone: { d2t1: true }, srs: {}, activity: {} };
    }
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(document_));
    for (const trainer of TRAINER_ORDER) runFormatFor(trainer).runStore.save(run(trainer));
  });

  it('says what it will really do, then deletes the runs as well as the document', async () => {
    const view = await mount('/settings');
    expect(view.text()).toMatch(/Delete all progress/);

    await click(bySelector('button').find(button => /Delete all progress/.test(button.textContent ?? '')));

    /* The claim the user acts on. It used to say "removed from this browser … cannot be
       undone", which under-promised the blast radius and over-promised the finality. */
    const dialog = document.body.textContent ?? '';
    expect(dialog).toMatch(/exam in progress/i);
    expect(dialog).not.toMatch(/cannot be undone/i);

    await click(dialogButton(/Delete all progress/));

    expect(storedDocument()['attempts']).toEqual([]);
    expect(storedDocument()['learnDone']).toEqual({});
    for (const key of docKeys) {
      expect(trainerDoc(key)['learnDone']).toEqual({});
      expect(trainerDoc(key)['attempts']).toEqual([]);
    }
    /* And no trainer's run in progress survives it. */
    for (const trainer of TRAINER_ORDER) {
      expect(runFormatFor(trainer).runStore.load(trainer)).toBeNull();
    }

    await view.unmount();
  });

  it('changes nothing when the dialog is cancelled', async () => {
    const view = await mount('/settings');

    await click(bySelector('button').find(button => /Delete all progress/.test(button.textContent ?? '')));
    await click(dialogButton(/Cancel/));

    expect(storedDocument()['learnDone']).toEqual({ d1t0: true, d1t1: true });
    for (const trainer of TRAINER_ORDER) {
      expect(runFormatFor(trainer).runStore.load(trainer)?.answers['l1.0']).toBe('a');
    }

    await view.unmount();
  });
});
