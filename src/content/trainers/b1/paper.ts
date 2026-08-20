import { type TrainerPaper } from '@shared/types';

/* How the telc Deutsch B1 sitting runs: its official timings, the briefing shown before each
   module, and the copy its module renderers need. Plain text throughout — only the guide,
   the curriculum intro and the cheatsheets are injected as HTML. */

export const B1_PAPER: TrainerPaper = {
  /* Lesen + Sprachbausteine share 90 minutes, split 65/25; Hören runs ≈30 at B1. */
  minutes: { lesen: 65, sprachbausteine: 25, hoeren: 30, schreiben: 30, sprechen: 15 },

  briefing: {
    lesen:
      '3 parts, 20 items, 75 points. Teil 1: match 5 texts to 10 headlines (5 pts each). Teil 2: read one article, answer 5 a/b/c questions (5 pts each). Teil 3: match 10 situations to 12 ads — some situations may have no perfect-looking ad, pick the best fit (2.5 pts each). Budget ≈ 20 minutes per part and never leave a blank!',
    sprachbausteine:
      '2 parts, 20 items, 30 points. Teil 1: a letter with 10 grammar gaps — pick a, b or c (1.5 pts each). Teil 2: a letter with 10 gaps — fill them from a bank of 15 words, each word fits only once (1.5 pts each). Look left AND right of every gap.',
    hoeren:
      '3 parts, 20 items, 75 points, ≈30 minutes. Teil 1: 5 short texts → richtig/falsch (5 pts). Teil 2: one long interview → 10 richtig/falsch statements (2.5 pts). Teil 3: 5 announcements → richtig/falsch (5 pts). Each audio plays a limited number of times, like the real exam. Read the statements BEFORE you press play!',
    schreiben:
      'Reply to the letter, 45 points. Cover at least THREE of the four Leitpunkte (≈80+ words), with a fitting greeting and sign-off. Plan 2 minutes, write, keep 3 minutes to check verb positions, endings and capital letters. You will score yourself against the sample answer afterwards.',
    sprechen:
      '3 parts, 75 points, like the real paired oral exam. Teil 1: Kontaktaufnahme — get to know your partner (15 pts). Teil 2: Gespräch über ein Thema (30 pts). Teil 3: gemeinsam etwas planen (30 pts). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
  },

  /* Read slightly slower than B2. */
  listeningRate: 0.97,

  writingTarget: { min: 80, max: 150 },
  writingTitle: 'Schreiben — Brief beantworten',
  writingPlaceholder: 'Liebe/r … / Sehr geehrte/r …',

  sprechenChips: ['15 Punkte · ~3 Min.', '30 Punkte · ~6 Min.', '30 Punkte · ~6 Min.'],
  prepNote: {
    lead: 'In the real exam you get ',
    emphasis: '20 minutes preparation',
    tail: ' for all three parts.'
  }
};
