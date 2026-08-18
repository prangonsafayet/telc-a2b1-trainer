export const MODULES = ['lesen', 'sprachbausteine', 'hoeren', 'schreiben', 'sprechen'];

/* `min` takes the settings object so the writing module can honour the user's choice. */
export const MOD_META = {
  lesen: { name: 'Leseverstehen', short: 'Lesen', min: () => 45, skill: true },
  sprachbausteine: { name: 'Sprachbausteine', short: 'Sprachbausteine', min: () => 35, skill: false },
  hoeren: { name: 'Hörverstehen · Hören & Schreiben', short: 'Hören', min: () => 35, skill: true },
  schreiben: { name: 'Schreiben', short: 'Schreiben', min: s => s.writingMinutes, skill: true },
  sprechen: { name: 'Sprechen', short: 'Sprechen', min: () => 15, skill: true }
};

export const modMinutes = (mod, settings) => MOD_META[mod].min(settings);

export const WHAT_TO_DO = {
  lesen: '4 parts, 20 items. Teil 1: match 5 situations to 8 ads. Teil 2: read 2 texts, answer 5 multiple-choice questions. Teil 3: match 5 messages to 8 headlines. Teil 4: read a longer text, decide richtig/falsch for 5 statements. Budget ≈ 10 minutes per part. Never leave a blank!',
  sprachbausteine: '3 parts. Teil 1: a letter with 6 grammar gaps — pick a, b or c. Teil 2: a text with 6 gaps — pick the right word from a bank of 12 (each word fits only once). Teil 3: pick the fitting response in 5 mini-dialogues. Look left AND right of every gap.',
  hoeren: '5 parts, 20 items. You can play each audio a limited number of times (like the real exam). Teil 1: 4 announcements → richtig/falsch. Teil 2: 4 info clips → a/b/c. Teil 3: 4 dialogues → richtig/falsch. Teil 4: one interview → 4 questions. Teil 5: a phone message → write 4 missing words into the note. Read the items BEFORE you press play!',
  schreiben: 'Reply to the email. Cover ALL THREE content points (about 40–60 words), with a greeting and a sign-off. Plan 1 minute, write, keep 2 minutes to check verb positions and capital letters. After submitting you will score yourself against the sample answer.',
  sprechen: '3 parts, like the real paired oral exam — no preparation time. Teil 1: introduce yourself. Teil 2: talk about a topic using the guiding questions. Teil 3: plan something (speak both roles or grab a partner). Record yourself if you allow microphone access, then listen back and rate yourself honestly.'
};

export const RATING_CRITERIA = {
  schreiben: [
    ['Inhalt — alle 3 Punkte behandelt?', 'All three content points fully addressed'],
    ['Verständlichkeit', 'A German reader would understand everything without effort'],
    ['Wortschatz', 'Varied, appropriate words; correct greeting & sign-off'],
    ['Korrektheit', 'Verb positions, endings, capitalization mostly right']
  ],
  sprechen: [
    ['Aufgabe & Inhalt', 'All parts/points covered, on topic'],
    ['Flüssigkeit', 'Kept talking, few long pauses'],
    ['Wortschatz & Strukturen', 'Used the Redemittel, varied sentences'],
    ['Aussprache & Interaktion', 'Understandable; asked/reacted like a partner']
  ]
};

export const DEFAULTS = {
  attempts: [],
  learnDone: {},
  settings: { writingMinutes: 10, ttsRate: 1, voiceName: '', examDate: '2026-09-12', playsAllowed: 2 }
};
