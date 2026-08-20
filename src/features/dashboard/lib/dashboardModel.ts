import { FULL_EXAM_MAX, SKILL_MAX } from '@shared/config/exam.ts';
import { PASS_RULES } from '@shared/config/examConditions.ts';
import { SINGLE_LEVEL_MODULE_META, SINGLE_LEVEL_SECTION_MAX } from '@shared/config/singleLevelExam.ts';
import { CATEGORY_META, STUDY_CATEGORIES } from '@shared/config/studyCategories.ts';
import { hasVocabBank, TRAINERS, type TrainerInfo } from '@shared/config/trainers.ts';
import { fmtDate } from '@shared/lib/format.ts';
import { countMastery, streakLength, type MasteryCounts } from '@shared/lib/srs.ts';
import { idsFor } from '@shared/lib/studyItems.ts';
import { type ExamModule, type SkillKey, type SrsMap, type TrainerId, type VocabBank } from '@shared/types';

import { type TrainerSlice } from '@features/progress';

import {
  type MasteryModel,
  type MeterModel,
  type StatTileModel,
  type WeakAreaModel
} from '../types/dashboard.ts';

/** B1 needs 168/240 overall; A2 territory starts around 96. */
const B1_TOTAL = 168;
const A2_TOTAL = 96;

const SINGLE_LEVEL_TOTAL = 300;

const SKILL_LABELS: readonly (readonly [SkillKey, string])[] = [
  ['lesen', 'Lesen'],
  ['hoeren', 'Hören'],
  ['schreiben', 'Schreiben'],
  ['sprechen', 'Sprechen']
];

const SINGLE_LEVEL_SECTIONS: readonly ExamModule[] = [
  'lesen',
  'sprachbausteine',
  'hoeren',
  'schreiben',
  'sprechen'
];

const bestFor = (
  attempts: readonly { readonly scores: Partial<Record<string, number>> }[],
  key: string
): number | null => {
  const scores = attempts
    .map(attempt => attempt.scores[key])
    .filter((value): value is number => value != null);
  return scores.length > 0 ? Math.max(...scores) : null;
};

/** The best score of each scored part of the paper, against a perfect one. */
export const buildMeters = (slice: TrainerSlice): readonly MeterModel[] =>
  slice.format === 'single-level'
    ? SINGLE_LEVEL_SECTIONS.map(section => ({
        key: section,
        label: SINGLE_LEVEL_MODULE_META[section].short,
        value: bestFor(slice.attempts, section),
        of: SINGLE_LEVEL_SECTION_MAX[section]
      }))
    : SKILL_LABELS.map(([key, label]) => ({
        key,
        label,
        value: bestFor(slice.attempts, key),
        of: SKILL_MAX
      }));

const dualLevelCaption = (best: number | null): string => {
  if (best == null) return 'no full exam yet';
  if (best >= B1_TOTAL) return 'B1 territory 🎉';
  if (best >= A2_TOTAL) return 'A2 zone — push to 168';
  return 'keep training';
};

/**
 * The tiles above the fold. A trainer with a vocabulary bank gets the two study tiles as
 * well — that is the descriptor offering more data, not a second dashboard.
 */
export const buildTiles = (
  slice: TrainerSlice,
  mastery: MasteryCounts | null,
  today: string
): readonly StatTileModel[] => {
  const full = slice.attempts.filter(attempt => attempt.mode === 'full');
  const totals = full.map(attempt => attempt.total ?? 0);
  const best = totals.length > 0 ? Math.max(...totals) : null;
  const max = slice.format === 'single-level' ? SINGLE_LEVEL_TOTAL : FULL_EXAM_MAX;
  const last = slice.attempts.at(-1) ?? null;

  const study: readonly StatTileModel[] =
    mastery === null
      ? []
      : [
          {
            kind: 'streak',
            label: 'Streak',
            value: streakLength(slice.activity, today),
            suffix: null,
            caption: streakLength(slice.activity, today) === 1 ? 'day in a row' : 'days in a row'
          },
          {
            kind: 'due',
            label: 'Due today',
            value: mastery.due,
            suffix: null,
            caption: `${String(mastery.total)} items in the bank`
          }
        ];

  return [
    ...study,
    {
      kind: 'exams',
      label: 'Full exams taken',
      value: full.length,
      suffix: null,
      caption: `${String(slice.attempts.length - full.length)} module practice runs`
    },
    {
      kind: 'best',
      label: 'Best total',
      value: best ?? '–',
      suffix: best === null ? null : `/${String(max)}`,
      caption: slice.format === 'single-level' ? 'across every full exam' : dualLevelCaption(best)
    },
    {
      kind: 'last',
      label: 'Last activity',
      value: last ? `Test ${String(last.examId)}` : '–',
      suffix: null,
      caption: last ? fmtDate(last.date) : 'start below'
    }
  ];
};

/** How far through its vocabulary bank a trainer is, or null when it has none. */
export const buildMastery = (
  trainer: TrainerId,
  vocab: VocabBank,
  srs: SrsMap,
  today: string
): MasteryModel | null => {
  if (!hasVocabBank(trainer)) return null;
  const base = TRAINERS[trainer].basePath;
  const categories = STUDY_CATEGORIES.map(category => {
    const counts = countMastery(idsFor(vocab, category), srs, today);
    return {
      key: category,
      label: CATEGORY_META[category].label,
      mastered: counts.mastered,
      total: counts.total,
      percent: counts.total > 0 ? (counts.mastered / counts.total) * 100 : 0
    };
  });
  const all = countMastery(
    STUDY_CATEGORIES.flatMap(category => idsFor(vocab, category)),
    srs,
    today
  );
  return {
    mastered: all.mastered,
    total: all.total,
    percent: all.total > 0 ? Math.round((all.mastered / all.total) * 100) : 0,
    categories,
    practiceTo: `${base}/practice`,
    learnTo: `${base}/learn`
  };
};

/** The vocabulary and paper counts a mastery section needs, whether or not it renders. */
export const masteryCounts = (vocab: VocabBank, srs: SrsMap, today: string): MasteryCounts =>
  countMastery(
    STUDY_CATEGORIES.flatMap(category => idsFor(vocab, category)),
    srs,
    today
  );

/** Too few answers to call anything weak. */
const MIN_SIGNAL = 5;
/** Below this error rate a category is not worth flagging. */
const WEAK_RATE = 0.2;
/** At or above the pass level a section is not a weak area. */
const PASS_RATIO = 0.6;

const SECTION_LABELS: Readonly<Record<ExamModule, string>> = {
  lesen: 'Leseverstehen',
  sprachbausteine: 'Sprachbausteine',
  hoeren: 'Hörverstehen',
  schreiben: 'Schriftlicher Ausdruck',
  sprechen: 'Mündliche Prüfung'
};

interface SectionScores {
  readonly section: ExamModule;
  readonly scores: readonly number[];
  readonly of: number;
}

/** Every scored section of whichever paper the trainer sets, with the scores it has. */
const sectionScores = (slice: TrainerSlice): readonly SectionScores[] => {
  if (slice.format === 'single-level') {
    return SINGLE_LEVEL_SECTIONS.map(section => ({
      section,
      scores: slice.attempts
        .map(attempt => attempt.scores[section])
        .filter((score): score is number => typeof score === 'number'),
      of: SINGLE_LEVEL_SECTION_MAX[section]
    }));
  }
  return SKILL_LABELS.map(([key]) => ({
    section: key,
    scores: slice.attempts
      .map(attempt => attempt.scores[key])
      .filter((score): score is number => typeof score === 'number'),
    of: SKILL_MAX
  }));
};

/**
 * The weakest study categories and exam sections, worst first, each with a one-tap drill.
 * A trainer with no bank simply contributes no category rows.
 */
export const buildWeakAreas = (
  slice: TrainerSlice,
  vocab: VocabBank,
  basePath: string
): readonly WeakAreaModel[] => {
  const areas: WeakAreaModel[] = [];

  for (const category of STUDY_CATEGORIES) {
    let wrong = 0;
    let seen = 0;
    for (const id of idsFor(vocab, category)) {
      const entry = slice.srs[id];
      if (!entry) continue;
      wrong += entry.wrong;
      seen += entry.seen;
    }
    if (seen < MIN_SIGNAL) continue;
    const rate = wrong / seen;
    if (rate < WEAK_RATE) continue;
    areas.push({
      key: `vocab.${category}`,
      label: CATEGORY_META[category].label,
      detail: `${String(wrong)} of ${String(seen)} answers wrong — drill the weak cards.`,
      severity: rate,
      to: `${basePath}/practice?tab=quiz&category=${category}`,
      actionLabel: 'Drill it'
    });
  }

  for (const { section, scores, of } of sectionScores(slice)) {
    if (scores.length === 0) continue;
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;
    const percent = average / of;
    if (percent >= PASS_RATIO) continue;
    areas.push({
      key: `exam.${section}`,
      label: SECTION_LABELS[section],
      detail: `Averaging ${String(Math.round(percent * 100))}% across ${String(scores.length)} attempt${scores.length === 1 ? '' : 's'} — below the 60% pass line.`,
      severity: 1 - percent,
      to: basePath || '/',
      actionLabel: 'Practise a mock'
    });
  }

  return areas.toSorted((a, b) => b.severity - a.severity);
};

/** The pass rule of the paper a trainer sets, for the lead under the page title. */
export const passRuleFor = (trainer: TrainerInfo): string => PASS_RULES[trainer.format];
