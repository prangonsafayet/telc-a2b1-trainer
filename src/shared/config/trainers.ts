/**
 * The trainer registry: one descriptor per trainer, and the only place a per-trainer fact
 * is allowed to live.
 *
 * The three trainers are peers, and a fourth that sets one of the two existing papers — telc
 * Deutsch B2 Beruf, say — costs a content folder under `src/content/trainers/`, one entry
 * here, and a row in the type-level plumbing that keeps this registry exhaustive and the
 * persisted document typed: `TrainerId`, `SingleLevelTrainerId` if it sets that paper, and a
 * field on `ProgressDatabase` with matching cases in `EMPTY_DATABASE`, `normalizeDatabase`
 * and `mergeProgress`. Plus two more places, both measured rather than assumed by planting a
 * fourth trainer: `src/content/trainers/index.ts` and one `vi.mock` in
 * `tests/unit/contentChunks.test.ts`. `.claude/docs/architecture.md` states the whole list
 * and why each entry is irreducible.
 *
 * No screen, route, hook or nav item needs to learn about it, because everything else in
 * `src/` reads a trainer's facts from this file rather than testing its id — which the
 * `no-restricted-syntax` rule in `eslint.config.js` enforces over the id list it reads back
 * out of this file.
 *
 * A trainer that sets a *new* paper costs much more: another `ExamFormatId`, a whole
 * `features/exam/lib/formats/<new>/`, five module renderers, a `TrainerSlice` variant, an
 * attempt type and seven format-keyed records in `@shared/config/examConditions.ts`.
 */

import { A2B1_PAPER } from '@content/trainers/a2b1/paper.ts';
import { B1_PAPER } from '@content/trainers/b1/paper.ts';
import { B2_PAPER } from '@content/trainers/b2/paper.ts';

import {
  type SingleLevelTrainerId,
  type TrainerContent,
  type TrainerContentLoader,
  type TrainerDocKey,
  type TrainerId,
  type TrainerPaper,
  type VocabBank,
  type WeaknessTopic
} from '@shared/types';

import { SPRINT_LEARN_DAYS } from './schedule.ts';

/*
 * Only `paper.ts` is imported eagerly here — a few kilobytes of timings and briefing copy
 * that every screen needs synchronously (the settings page, the runner, the header). The
 * exams, curriculum, guide and vocabulary bank are the heavy part of a trainer (hundreds of
 * kilobytes each) and load through `loadContent` below instead, one dynamic `import()` per
 * trainer so the bundler keys a chunk on each. Do not import `@content/trainers/index.ts`
 * from this file: that barrel pulls in every trainer's full content and would put the whole
 * eager graph right back behind the registry.
 */
const CONTENT_LOADERS: Readonly<Record<TrainerId, TrainerContentLoader>> = {
  a2b1: () => import('@content/trainers/a2b1/index.ts').then(m => m.A2B1_CONTENT),
  b1: () => import('@content/trainers/b1/index.ts').then(m => m.B1_CONTENT),
  b2: () => import('@content/trainers/b2/index.ts').then(m => m.B2_CONTENT)
};

/** User-facing app name. UI-level only — repo, package and storage keys keep theirs. */
export const APP_NAME = 'telc Deutsch Trainer';

interface TrainerInfoBase {
  readonly id: TrainerId;
  /** Full exam name, e.g. "telc Deutsch B1". */
  readonly name: string;
  /** Level chip, e.g. "B1". */
  readonly short: string;
  /** Route namespace. Empty string for the trainer that owns the root. */
  readonly basePath: string;
  /** Accent colour of its papers and chips, as a CSS custom property reference. */
  readonly accent: string;
  /**
   * What it offers, in one short line, for a menu row and a header subtitle — e.g. "Dual-
   * level paper · A2 or B1 certificate". Static and hand-written against the verified figures
   * in `docs/level-trainers.local.md`, never a count derived from `loadContent`: an earlier
   * version counted exams and once claimed "10 Modelltests" while the arrays were still
   * empty, and a menu that lists every trainer at once cannot wait on three content chunks
   * just to render its rows. A screen that has already loaded a trainer's content (the
   * dashboard lead) is where a real count belongs.
   */
  readonly tagline: string;
  /** How its own sitting runs — small enough to stay eager alongside the rest of this file. */
  readonly paper: TrainerPaper;
  /**
   * Whether it ships an exam guide, stated directly rather than derived from `loadContent`:
   * the Guide route and nav tab are decided before anything asks for that trainer's content,
   * so this has to answer synchronously.
   */
  readonly hasGuide: boolean;
  /** Its exams, curriculum, guide and vocabulary bank — the heavy part, loaded on demand. */
  readonly loadContent: TrainerContentLoader;
  /** Lesson days the five-day emergency plan reaches for. */
  readonly sprintLearnDays: readonly number[];
  /**
   * Its own cheatsheet keys (into `content.curriculum.cheatsheets`) for each weakness
   * topic — see `WEAKNESS_TOPICS` in `@shared/config/weakness.ts`. A trainer resolves this
   * itself rather than sharing one flat map, because the three trainers name and group
   * their cheatsheets differently (A2·B1 has twelve keys, B1 and B2 have six each, and no
   * key is shared across all three). Empty where a trainer authors no cheatsheet for that
   * topic — B1 and B2 have no dedicated vocabulary cheatsheet, so a learner with a spelling
   * weakness there falls back to the practice hub instead of a cheatsheet link.
   */
  readonly weaknessCheatsheets: Readonly<Record<WeaknessTopic, readonly string[]>>;
}

/**
 * A trainer descriptor: everything above, plus the pair of facts that cannot be chosen
 * independently — which paper it sets, and where its slice of the progress document lives.
 *
 * They are paired here rather than each stated on its own, because the persisted document
 * decides the pairing: `ProgressDatabase.attempts` is the only place a `DualLevelAttempt`
 * can go and it sits at the root, and `LevelTrainerDoc.attempts` is the only place a
 * `SingleLevelAttempt` can go and there is one per `TrainerDocKey`. Saying so once, in the
 * type, is what lets `useTrainerSlice` read a trainer's paper from `format` — the registry —
 * instead of inferring it from `docKey === null`, which is where two sources of truth for
 * one fact came from. A mispaired entry is a typecheck error, not a runtime surprise.
 */
export type TrainerInfo = TrainerInfoBase &
  (
    | {
        readonly format: 'dual-level';
        /** Its attempts, learn plan and settings sit at the root of the document. */
        readonly docKey: null;
      }
    | {
        readonly format: 'single-level';
        /** Its own slice of the document, keyed by its id. */
        readonly docKey: TrainerDocKey;
      }
  );

/** The trainers, in the order they are offered. */
export const TRAINER_ORDER: readonly TrainerId[] = ['a2b1', 'b1', 'b2'];

export const TRAINERS: Readonly<Record<TrainerId, TrainerInfo>> = {
  a2b1: {
    id: 'a2b1',
    name: 'telc Deutsch A2·B1',
    short: 'A2·B1',
    basePath: '',
    accent: 'var(--primary)',
    format: 'dual-level',
    tagline: 'Dual-level paper · A2 or B1 certificate',
    docKey: null,
    paper: A2B1_PAPER,
    hasGuide: true,
    loadContent: CONTENT_LOADERS.a2b1,
    sprintLearnDays: SPRINT_LEARN_DAYS,
    weaknessCheatsheets: {
      cases: ['cases'],
      verbForms: ['verbs', 'modal', 'passivkii'],
      connectors: ['connectors', 'nebensaetze'],
      prepositions: ['verbpraep', 'cases'],
      vocabulary: ['vocab'],
      writing: ['writing', 'formal']
    }
  },
  b1: {
    id: 'b1',
    name: 'telc Deutsch B1',
    short: 'B1',
    basePath: '/b1',
    accent: 'var(--primary)',
    format: 'single-level',
    tagline: 'Zertifikat Deutsch · single-level paper',
    docKey: 'b1',
    paper: B1_PAPER,
    hasGuide: true,
    loadContent: CONTENT_LOADERS.b1,
    sprintLearnDays: SPRINT_LEARN_DAYS,
    weaknessCheatsheets: {
      /* The B1 'cases' cheatsheet ('Kasus incl. Genitiv & Adjektivendungen') already
         carries the preposition-case lists — day 4 of its own curriculum points learners
         with a preposition weakness here too. */
      cases: ['cases'],
      verbForms: ['verbs'],
      connectors: ['konnektoren'],
      prepositions: ['cases'],
      vocabulary: [],
      writing: ['schreiben']
    }
  },
  b2: {
    id: 'b2',
    name: 'telc Deutsch B2',
    short: 'B2',
    basePath: '/b2',
    accent: 'var(--warning)',
    format: 'single-level',
    tagline: 'Single-level paper · 300 points',
    docKey: 'b2',
    paper: B2_PAPER,
    hasGuide: true,
    loadContent: CONTENT_LOADERS.b2,
    sprintLearnDays: SPRINT_LEARN_DAYS,
    weaknessCheatsheets: {
      /* 'genitiv' is titled 'Genitiv & formal prepositions' — B2's only case cheatsheet
         and its preposition one at once. */
      cases: ['genitiv'],
      verbForms: ['passiv', 'kii'],
      /* No B2 cheatsheet is primarily a word-order reference the way A2·B1's
         'connectors'/'nebensaetze' or B1's 'konnektoren' ('Konnektoren & Wortstellung')
         are. 'nominal' ('Nominalisierung & Konnektoren (Argumentation)') bundles a
         Konnektoren-by-function table in with its main subject, Verbalstil→Nominalstil
         transformation — a learner sent there for a word-order weakness would land on a
         page framed around nominalisation, not clause structure. An empty array is more
         honest than that link. */
      connectors: [],
      prepositions: ['genitiv'],
      vocabulary: [],
      writing: ['brief']
    }
  }
};

/**
 * Whether a trainer sets the single-level paper. Stated as a fact about the trainer rather
 * than as "not the original one", so a fourth trainer answers it by its own descriptor.
 *
 * It narrows the id because the registry pairs that paper with a per-trainer document: a
 * trainer that sets it keeps its own slice, keyed by its id.
 */
export const isSingleLevelTrainer = (trainer: TrainerId): trainer is SingleLevelTrainerId =>
  TRAINERS[trainer].format === 'single-level';

/** The single-level trainers, in the order they are offered. Derived, never listed twice. */
export const SINGLE_LEVEL_TRAINERS: readonly SingleLevelTrainerId[] =
  TRAINER_ORDER.filter(isSingleLevelTrainer);

/** The trainer that owns the root of the URL space, and of the progress document. */
export const ROOT_TRAINER: TrainerId =
  TRAINER_ORDER.find(id => TRAINERS[id].basePath === '') ?? TRAINER_ORDER[0] ?? 'a2b1';

/** Its landing route. The root trainer's base path is empty, and `/` is not. */
export const trainerHome = (trainer: TrainerId): string => TRAINERS[trainer].basePath || '/';

/**
 * How many Modelltests a trainer offers. Counted from its content, never restated — but
 * that content loads lazily now, so this reads the trainer's already-resolved content
 * rather than reaching into the registry itself.
 */
export const examCount = (content: TrainerContent): number => content.exams.length;

/** Whether a vocabulary bank has anything in it to drill. */
export const hasVocabBank = (vocab: VocabBank): boolean =>
  vocab.verbs.length +
    vocab.nouns.length +
    vocab.adjectives.length +
    vocab.prepVerbs.length +
    vocab.caseItems.length >
  0;

/** Whether a trainer ships an exam guide. Drives its Guide tab and route. */
export const hasGuide = (trainer: TrainerId): boolean => TRAINERS[trainer].hasGuide;

/** Which trainer a pathname belongs to. The root trainer owns everything unclaimed. */
export const trainerFromPath = (pathname: string): TrainerId =>
  TRAINER_ORDER.find(id => {
    const base = TRAINERS[id].basePath;
    return base !== '' && (pathname === base || pathname.startsWith(`${base}/`));
  }) ?? ROOT_TRAINER;
