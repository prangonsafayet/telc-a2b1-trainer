import { type TrainerPaper } from '@shared/types';

/* How the telc Deutsch A2·B1 sitting runs: its timings, the briefing shown before each
   module, and the copy its module renderers need. Plain text throughout — only the guide,
   the curriculum intro and the cheatsheets are injected as HTML. */

export const A2B1_PAPER: TrainerPaper = {
  /* Lesen 45, Sprachbausteine 35, Hören 35 and Sprechen 15 come from telc's own Testformat
     for A2·B1; the 10-minute Schreiben slot is this trainer's, since the source document
     records no official duration for it. */
  minutes: { lesen: 45, sprachbausteine: 35, hoeren: 35, schreiben: 10, sprechen: 15 },

  briefing: {
    lesen:
      '4 parts, 20 items. Teil 1: match 5 situations to 8 ads. Teil 2: read 2 texts, answer 5 multiple-choice questions. Teil 3: match 5 messages to 8 headlines. Teil 4: read a longer text, decide richtig/falsch for 5 statements. Budget ≈ 10 minutes per part. Never leave a blank!',
    sprachbausteine:
      '3 parts. Teil 1: a letter with 6 grammar gaps — pick a, b or c. Teil 2: a text with 6 gaps — pick the right word from a bank of 12 (each word fits only once). Teil 3: pick the fitting response in 5 mini-dialogues. Look left AND right of every gap.',
    hoeren:
      '5 parts, 20 items. You can play each audio a limited number of times (like the real exam). Teil 1: 4 announcements → richtig/falsch. Teil 2: 4 info clips → a/b/c. Teil 3: 4 dialogues → richtig/falsch. Teil 4: one interview → 4 questions. Teil 5: a phone message → write 4 missing words into the note. Read the items BEFORE you press play!',
    schreiben:
      'Reply to the email. Cover ALL THREE content points (about 40–60 words), with a greeting and a sign-off. Plan 1 minute, write, keep 2 minutes to check verb positions and capital letters. After submitting you will score yourself against the sample answer.',
    sprechen:
      '3 parts, like the real paired oral exam — no preparation time. Teil 1: introduce yourself. Teil 2: talk about a topic using the guiding questions. Teil 3: plan something (speak both roles or grab a partner). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
  },

  /* Its own listening speed comes from each paper's difficulty, so the trainer adds no
     multiplier of its own. */
  listeningRate: 1,

  writingTarget: { min: 40, max: 80 },
  writingTitle: 'Schreiben — E-Mail beantworten',
  writingPlaceholder: 'Liebe/r …',

  sprechenChips: ['~2 Min.', '~5 Min.', '~5 Min.'],
  prepNote: {
    lead: 'In the real exam there is ',
    emphasis: 'no preparation time',
    tail: '.'
  }
};
