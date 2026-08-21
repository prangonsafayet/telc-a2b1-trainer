import { type TrainerPaper } from '@shared/types';

/* How the telc Deutsch B2 sitting runs: its official timings, the briefing shown before each
   module, and the copy its module renderers need. Plain text throughout — only the guide,
   the curriculum intro and the cheatsheets are injected as HTML. */

export const B2_PAPER: TrainerPaper = {
  /* Lesen + Sprachbausteine share 90 minutes, split 65/25; Hören runs ≈20 at B2. */
  minutes: { lesen: 65, sprachbausteine: 25, hoeren: 20, schreiben: 30, sprechen: 15 },

  briefing: {
    lesen:
      '3 parts, 20 items, 75 points. Teil 1: match 5 texts to 10 headlines (5 pts each). Teil 2: read one article, answer 5 a/b/c questions (5 pts each). Teil 3: match 10 situations to 12 ads — some situations may have no perfect-looking ad, pick the best fit (2.5 pts each). Budget ≈ 20 minutes per Teil out of the 65 this trainer gives Lesen, and never leave a blank!',
    sprachbausteine:
      '2 parts, 20 items, 30 points. Teil 1: a letter with 10 grammar gaps — pick a, b or c (1.5 pts each). Teil 2: a letter with 10 gaps — fill them from a bank of 15 words, each word fits only once (1.5 pts each). Look left AND right of every gap.',
    hoeren:
      '3 parts, 20 items, 75 points, ≈20 minutes. Teil 1: 5 radio clips → richtig/falsch (5 pts). Teil 2: one long interview → 10 richtig/falsch statements (2.5 pts). Teil 3: 5 announcements → richtig/falsch (5 pts). Each audio plays a limited number of times, like the real exam. Read the statements BEFORE you press play!',
    schreiben:
      'Write one halbformelle E-Mail, 45 points. Answer everything the task raises — all four Leitpunkte, fully — with a Betreff line, a "Sehr geehrte …" greeting and a fitting sign-off; you are a private person writing to an institution, so no Amtsdeutsch and no Du. This trainer aims you at roughly 150–220 words; telc publishes no count. Keep 5 minutes to check structure and endings. You will score yourself against the sample answer afterwards.',
    sprechen:
      '3 parts, 75 points, with 20 minutes preparation in the real exam. Teil 1: Über Erfahrungen sprechen — talk about your own experience (25 pts). Teil 2: Diskussion about a short text (25 pts). Teil 3: Gemeinsam etwas planen (25 pts). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
  },

  listeningRate: 1.03,

  writingTarget: { min: 150, max: 220 },
  writingTitle: 'Schriftlicher Ausdruck',
  writingPlaceholder: 'Sehr geehrte Damen und Herren, / Sehr geehrte Frau …,',

  sprechenChips: ['25 Punkte · ~5 Min.', '25 Punkte · ~5 Min.', '25 Punkte · ~5 Min.'],
  prepNote: {
    lead: 'In the real exam you get ',
    emphasis: '20 minutes preparation',
    tail: '; a dictionary is allowed only there.'
  }
};
