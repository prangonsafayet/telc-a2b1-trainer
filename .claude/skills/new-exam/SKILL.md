---
name: new-exam
description: Scaffold and author a new Modelltest for the trainer, wired into the exam index and validated. Use when asked to add an 11th (or further) mock exam, or to replace an existing one wholesale.
---

# New exam

Adding a Modelltest touches three places. Do them in this order.

## 1. Decide the level and theme

Read `src/content/exams/index.ts` for what exists, then read the two neighbouring
exams at the target level. Tests 1–3 are early A2, 4–7 solid A2/A2+, 8–10 B1.
Pick a theme not already used (`exam.theme`) and set `difficulty` to `easy`,
`medium` or `b1` with a matching `level` string.

## 2. Write the data file

Create `src/content/exams/examNN.ts` following the exact shape of its neighbours:

```ts
import { type Exam } from '@shared/types';

const exam = {
  id: NN,
  title: 'Modelltest NN',
  difficulty: 'medium',
  level: 'A2 · mittel',
  theme: '…',
  lesen: {/* teil1–4 */},
  sprachbausteine: {/* teil1–3 */},
  hoeren: {/* teil1–5 */},
  schreiben: {/* … */},
  sprechen: {/* teil1–3 */}
} as const satisfies Exam;

export default exam;
```

The **exam-author** agent knows the required item counts and the content rules
(plausible distractors, answers derivable from the text alone, mixed
richtig/falsch, `alt` spellings on note-sheet gaps, speakable TTS dialogue).
Delegate the authoring to it, or follow those rules yourself.

## 3. Register it

Add the import and the array entry in `src/content/exams/index.ts`. The array is
sorted by `id`, so order in the file does not matter, but keep it tidy.

## 4. Validate

```bash
npm run validate     # counts, duplicate ids, answer ranges, mixed booleans
npm test             # types + the content-render guard
```

The dashboard, history and runner all read from the index, so nothing else needs
touching. Take the new exam once in `npm run dev` before calling it done — a
plausible-looking answer key that is ambiguous in practice is the common failure.
