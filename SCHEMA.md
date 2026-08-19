# Telc A2·B1 Mock Exam — Data Schema

Each exam lives in `data/examNN.js` and pushes ONE object onto the global array:

```js
window.TELC_EXAMS = window.TELC_EXAMS || [];
window.TELC_EXAMS.push({/* exam object */});
```

All **exam content** (texts, questions, options) is in **German**, appropriate to the stated
difficulty. All **answer keys use 0-based indexes**. No HTML inside strings (plain text only,
`\n` allowed in longer texts). Umlauts written normally (ä, ö, ü, ß).

Difficulty ramp: exams 1–3 `"easy"` (early A2: short sentences, present tense + perfect,
high-frequency vocab), exams 4–7 `"medium"` (solid A2/A2+: Nebensätze with weil/dass/wenn,
Dativ/Akkusativ, modal verbs, some Präteritum of sein/haben/modals), exams 8–10 `"b1"`
(B1: Relativsätze, Passiv, Konjunktiv II höflich, Genitiv occasionally, abstract-ish topics).

## Exam object

```js
{
  id: 1,                        // integer, matches file number
  title: "Modelltest 1",
  difficulty: "easy",           // "easy" | "medium" | "b1"
  level: "A2 · leicht",         // display label, e.g. "A2 · leicht", "A2+ · mittel", "B1 · Ziel"
  theme: "Alltag & Familie",    // short theme label for the dashboard

  lesen: {
    // ---- Teil 1: match 5 situations to 8 ads (each situation has exactly ONE correct ad;
    //      3 ads are distractors; an ad may NOT be the answer of two situations) ----
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: ["...", "...", "...", "...", "..."],   // exactly 5
      ads: ["...", ...],                                  // exactly 8, plain text ads
      answers: [3, 0, 6, 2, 5]                            // 5 indexes into ads, all distinct
    },
    // ---- Teil 2: 2 short texts (notice, article, brochure), 5 MC questions à 3 options ----
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [ { titel: "...", text: "..." }, { titel: "...", text: "..." } ],  // exactly 2
      questions: [                                         // exactly 5; state which text via textIndex
        { textIndex: 0, frage: "...", options: ["...", "...", "..."], answer: 1 },
        ...
      ]
    },
    // ---- Teil 3: match 5 short messages/emails to 8 subject lines / headlines ----
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: ["...", "...", "...", "...", "..."],       // exactly 5 short messages (2–4 sentences)
      headlines: ["...", ...],                             // exactly 8
      answers: [2, 7, 0, 4, 1]                             // 5 distinct indexes
    },
    // ---- Teil 4: 1 longer text (150–260 words depending on difficulty), 5 true/false ----
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "...",
      text: "...",                                         // \n\n between paragraphs
      statements: [ { text: "...", answer: true }, ... ]   // exactly 5, answer: true=richtig
    }
  },

  sprachbausteine: {
    // ---- Teil 1: letter/email with 6 numbered gaps [1]..[6], each gap has 3 MC options (grammar) ----
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Liebe Anna, ich [1] dir aus dem Urlaub. ...",  // gaps written as [1] .. [6]
      gaps: [ { options: ["schreibe", "schreibst", "schreibt"], answer: 0 }, ... ]  // exactly 6
    },
    // ---- Teil 2: text with 6 numbered gaps [1]..[6], shared word bank of 12 words (vocabulary) ----
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "...",                                          // gaps [1] .. [6]
      wordBank: ["...", ...],                               // exactly 12 words, 6 are distractors
      answers: [4, 0, 9, 2, 11, 7]                          // 6 distinct indexes into wordBank
    },
    // ---- Teil 3: 5 mini-dialogues — choose the fitting response, 3 options each ----
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [ { prompt: "\"Entschuldigung, wo ist der Bahnhof?\"", options: ["...", "...", "..."], answer: 2 }, ... ] // exactly 5
    }
  },

  hoeren: {
    // Audio = the app reads `audio` aloud via German TTS. Keep audio texts natural SPOKEN German.
    // `audio` is either a string (announcer) or an array of {speaker, text} turns (dialogue).
    // ---- Teil 1: 4 short announcements (station, store, answering machine), true/false ----
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [ { audio: "...", statement: "...", answer: false }, ... ]   // exactly 4; audio 25–45 words
    },
    // ---- Teil 2: 4 short informational clips (radio, weather, traffic), MC à 3 ----
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [ { audio: "...", frage: "...", options: ["...","...","..."], answer: 0 }, ... ]  // exactly 4
    },
    // ---- Teil 3: 4 short everyday dialogues, true/false ----
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [ { audio: [ {speaker:"Frau Kern", text:"..."}, {speaker:"Herr Roth", text:"..."}, ... ],
                 statement: "...", answer: true }, ... ]                   // exactly 4; 2–4 turns each
    },
    // ---- Teil 4: ONE longer interview/conversation heard once, then 4 MC à 3 ----
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [ {speaker:"Moderatorin", text:"..."}, {speaker:"Gast", text:"..."}, ... ],  // 6–10 turns, 120–200 words total
      questions: [ { frage: "...", options: ["...","...","..."], answer: 2 }, ... ]        // exactly 4
    },
    // ---- Teil 5: Hören + Schreiben — a phone message; fill 4 gaps in a written note ----
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "...",                                        // 50–90 words, contains the 4 facts clearly
      noteTitle: "Notiz",
      gaps: [                                              // exactly 4; gap text uses ____ for the blank
        { label: "Anrufer:", answer: "Herr Weber", alt: ["Weber"] },
        { label: "Termin am:", answer: "Donnerstag", alt: [] },
        ...
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Freundin Paula hat Ihnen geschrieben.",    // 1-sentence context in German
    incomingEmail: { von: "paula@...", betreff: "...", text: "..." },  // the email to answer, 40–80 words
    points: ["...", "...", "..."],                          // exactly 3 content points (German)
    musterloesung: "...",                                   // sample answer 45–70 words, at exam level
    tipps: "..."                                            // 1–2 sentences of English strategy advice
  },

  sprechen: {
    teil1: {  // Kontaktaufnahme / personal introduction
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit/Beruf", "Sprachen", "Hobbys"],
      redemittel: ["Ich heiße ...", "Ich komme aus ...", "..."]   // 5–7 useful phrases
    },
    teil2: {  // talk about a topic / exchange opinions
      thema: "...",                                        // e.g. "Einkaufen"
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: ["...", "...", "...", "..."],            // exactly 4 guiding questions in German
      redemittel: ["Ich finde, dass ...", "..."]           // 4–6 phrases
    },
    teil3: {  // plan something together
      aufgabe: "...",                                      // e.g. "Planen Sie zusammen ein Picknick."
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wann?", "Wo?", "Was mitbringen?", "Wen einladen?"],  // exactly 4 planning points
      redemittel: ["Wollen wir ...?", "Wie wäre es mit ...?", "..."] // 4–6 phrases
    }
  }
}
```

## Hard rules

1. Answer indexes MUST be valid and answers MUST be verifiable from the text/audio alone.
2. In matching parts (lesen.teil1, lesen.teil3, sprachbausteine.teil2) the answer indexes are DISTINCT.
3. Distractors must be plausible but clearly wrong on careful reading.
4. True/false parts: mix of true and false (never all one value).
5. MC answer positions should vary (not always index 0).
6. Every exam has a distinct real-life theme and does not reuse texts of other exams.
7. German must be correct and level-appropriate. Numbers in audio texts written as words
   ("dreißig Euro"), because TTS reads them better; in reading texts digits are fine.
8. File must be valid plain JavaScript (no trailing commas issues, proper string escaping).
