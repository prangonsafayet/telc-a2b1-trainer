import { type LearnPlan } from '@shared/types';

/* The B1 28-day curriculum. Days 1–14 are the core tier and are always scheduled;
   days 15–28 deepen towards a confident pass when the runway leaves room. */
export const B1_CURRICULUM: LearnPlan = {
  intro: `This plan adapts to your <b>B1 exam date</b> — set it in Settings and the days re-pace themselves.
  Each day = vocabulary in the trainer + one grammar focus + exam technique. Days 1–14 are the <b>core curriculum</b>; days 15–28 deepen everything when your date leaves room.`,

  cheatsheets: {},

  days: [
    {
      day: 1,
      tier: 'core',
      title: 'Kick-off & Kasus-Check',
      focus: 'Akkusativ vs. Dativ — the backbone of every B1 sentence',
      tasks: [
        'Review the Akkusativ and Dativ reference tables in the practice hub',
        'Do one flashcard session (20 cards) in the vocabulary trainer',
        'Read the B1 exam guide: format, points and pass rules'
      ],
      cheats: [],
      ai: [
        {
          t: 'Case drill',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Stelle mir 15 Lückensätze, in denen ich zwischen Akkusativ und Dativ entscheiden muss. Korrigiere jede Antwort sofort und erkläre kurz auf Englisch, warum der Kasus richtig ist.'
        }
      ]
    },
    {
      day: 2,
      tier: 'core',
      title: 'Perfekt & Präteritum',
      focus: 'Past tenses: Perfekt for speaking, Präteritum for reading',
      tasks: [
        'Quiz yourself on 15 verb forms in the practice hub (Präteritum/Perfekt drill)',
        'One flashcard session of verbs',
        'Write 8 sentences about yesterday using Perfekt'
      ],
      cheats: [],
      ai: [
        {
          t: 'Tense debrief',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Ich schreibe dir 8 Sätze über gestern im Perfekt. Korrigiere Fehler, erkläre die Korrekturen kurz auf Englisch und frage danach mündlich weiter.'
        }
      ]
    }
  ]
};
