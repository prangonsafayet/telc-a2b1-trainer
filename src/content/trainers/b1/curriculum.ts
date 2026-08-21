import { type LearnPlan } from '@shared/types';

/* The B1 28-day curriculum: cheatsheets and the copy-paste AI tutor prompts.
   `intro` and every `cheatsheets[].html` are authored HTML and are injected; all other
   strings are plain text and are rendered as text. Days 1–14 are the core tier and are
   always scheduled; days 15–28 deepen towards a confident pass when the runway leaves
   room. */
export const B1_CURRICULUM: LearnPlan = {
  intro: `This plan adapts to your <b>B1 exam date</b> — set it in Settings and the days re-pace themselves.
  Each day = vocabulary in the practice hub + one grammar or skill focus + an <b>AI practice session</b>: copy the prompt into Claude (or any AI chat) and it becomes your tutor, examiner or speaking partner.
  Days 1–14 are the <b>core curriculum</b> and are always scheduled; days 15–28 deepen everything — Genitiv, Konjunktiv II, Passiv, oral fluency — when your date leaves room.`,

  cheatsheets: {
    cases: {
      title: 'Kasus incl. Genitiv & Adjektivendungen',
      html: `<table class="history"><tr><th></th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td><b>Nominativ</b></td><td>der / ein</td><td>die / eine</td><td>das / ein</td><td>die / –</td></tr>
<tr><td><b>Akkusativ</b></td><td><b>den / einen</b></td><td>die / eine</td><td>das / ein</td><td>die / –</td></tr>
<tr><td><b>Dativ</b></td><td><b>dem / einem</b></td><td><b>der / einer</b></td><td><b>dem / einem</b></td><td><b>den …n</b></td></tr>
<tr><td><b>Genitiv</b></td><td><b>des / eines …s</b></td><td>der / einer</td><td><b>des / eines …s</b></td><td>der / –</td></tr></table>
<p><b>Genitiv at B1:</b> M/N nouns take -s/-es (des Mannes, des Kindes, eines Autos). After these prepositions: <b>wegen, trotz, während, statt</b> → wegen des Wetters, trotz der Kälte, während der Prüfung. In Sprachbausteine, Genitiv after "wegen" is a classic gap.</p>
<p><b>Always Akkusativ:</b> für, ohne, gegen, um, durch, bis. · <b>Always Dativ:</b> mit, nach, aus, zu, von, bei, seit, gegenüber.<br>
<b>Wechselpräpositionen</b> (in, an, auf, über, unter, vor, hinter, neben, zwischen): Wohin? → Akkusativ (in die Stadt) · Wo? → Dativ (in der Stadt).</p>
<p><b>n-Deklination</b> (masculine, -n in every case except Nominativ): der Kunde → den/dem/des Kunde<b>n</b> · der Kollege, der Mensch, der Herr (den Herrn), der Nachbar, der Junge, der Student, der Name (des Namens).</p>
<p><b>Adjektivendungen — the 3-second rule:</b> after der/die/das → <b>-e</b> or <b>-en</b> (der gut<b>e</b> Film, den gut<b>en</b> Film, die gut<b>en</b> Filme). After ein/kein/mein the adjective shows the gender where "ein" cannot: ein gut<b>er</b> Film, ein gut<b>es</b> Buch. Dativ singular is ALWAYS -en: mit dem neu<b>en</b> Auto, mit einer nett<b>en</b> Kollegin. The full table lives in the practice hub — drill it there.</p>`
    },
    verbs: {
      title: 'Tenses: Präteritum, Perfekt, Plusquamperfekt & Konjunktiv II',
      html: `<p><b>Perfekt (speaking) = haben/sein + Partizip II.</b> <b>sein</b> for movement/change: gegangen, gefahren, gekommen, aufgestanden, eingestiegen, umgezogen, geblieben, passiert, gewesen, geworden. Everything else: <b>haben</b>.</p>
<p><b>Präteritum (reading & writing)</b> — B1 texts are full of it. Regular: -te (machte, arbeitete, kaufte). The irregulars you MUST recognize: war · hatte · gab · ging · kam · fuhr · sah · nahm · fand · blieb · ließ · wusste · dachte · brachte · stand · sprach · schrieb · las · half · <b>wurde</b> · plus all modals: konnte, musste, wollte, durfte, sollte.</p>
<p><b>Plusquamperfekt = hatte/war + Partizip II</b> — "before the past", almost always with <b>nachdem</b>: Nachdem ich die Prüfung <b>bestanden hatte</b>, feierte ich mit Freunden. · Als er ankam, <b>war</b> der Bus schon <b>abgefahren</b>.</p>
<p><b>Konjunktiv II — the 6 you need:</b> ich <b>wäre</b> · ich <b>hätte</b> · ich <b>würde</b> + Infinitiv · ich <b>könnte</b> · ich <b>müsste</b> · ich <b>sollte</b>.<br>
<b>Höflichkeit:</b> Könnten Sie mir bitte helfen? · Ich hätte eine Frage. · Wären Sie so nett, …?<br>
<b>Irreale Bedingung (Prüfungs-Bonuspunkte!):</b> Wenn ich mehr Zeit <b>hätte</b>, <b>würde</b> ich jeden Tag lernen. · Wenn ich du <b>wäre</b>, … · An deiner/Ihrer Stelle <b>würde</b> ich …<br>
<b>Ratschläge:</b> Du solltest früher aufstehen. · Es wäre besser, wenn …</p>
<p><b>Passiv = werden + Partizip II:</b> Das Formular <b>wird</b> online <b>ausgefüllt</b>. · Das Haus <b>wurde</b> 1950 <b>gebaut</b>. · Mit Modalverb: Der Antrag <b>muss</b> unterschrieben <b>werden</b>. Alternative with man: Man spricht hier Deutsch = Hier wird Deutsch gesprochen.</p>`
    },
    konnektoren: {
      title: 'Konnektoren & Wortstellung',
      html: `<p><b>Group 1 — Position 0 (word order unchanged):</b> und, aber, oder, denn, sondern → "Ich lerne viel, <b>denn</b> ich will bestehen."</p>
<p><b>Group 2 — verb to the END (Nebensatz):</b> weil, da, dass, wenn, als, obwohl, während, bevor, nachdem, damit, sodass, falls, ob → "Ich bestehe, <b>obwohl</b> die Prüfung schwer <b>ist</b>." Nebensatz first? Main verb comes directly after the comma: "Weil ich müde war, <b>bin</b> ich früh ins Bett gegangen."</p>
<p><b>Group 3 — verb directly after (inversion):</b> deshalb, deswegen, daher, darum, trotzdem, außerdem, danach, sonst → "Ich will bestehen, <b>deshalb lerne</b> ich jeden Tag."</p>
<p><b>Zweiteilige Konnektoren (B1 gold):</b> <b>nicht nur … sondern auch</b> (Sie ist nicht nur nett, sondern auch kompetent.) · <b>sowohl … als auch</b> · <b>entweder … oder</b> · <b>weder … noch</b> (= not … and not) · <b>zwar … aber</b> · <b>je … desto</b>: "<b>Je</b> mehr ich übe (verb END), <b>desto</b> sicherer <b>werde</b> ich (inversion)."</p>
<p><b>damit vs. um … zu:</b> same subject → um … zu (Ich lerne, <b>um</b> die Prüfung <b>zu</b> bestehen.) · different subjects → damit (Ich spreche langsam, <b>damit</b> du mich verstehst.)</p>
<p><b>weil vs. obwohl vs. deshalb</b> — the Sprachbausteine classic: weil = reason, obwohl = unexpected contrast, deshalb = consequence. Read the WHOLE sentence before choosing.</p>`
    },
    schreiben: {
      title: 'The 45-point letter (halbformell)',
      html: `<p><b>The task:</b> 30 minutes, one half-formal letter or email, <b>4 Leitpunkte</b>. You must address <b>all 4</b> of them, in a sensible order, 1–2 sentences each. Scored 3 × 15 points: Leitpunkte covered, communicative design (Anrede, Gruß, connectors, register), correctness.</p>
<p><b>Fixed skeleton — memorize it:</b></p>
<p>1. <b>Anrede:</b> Sehr geehrte Frau Weber, / Sehr geehrter Herr Braun, (formal) · Liebe Frau Weber, (half-formal, e.g. course teacher, nice landlady) — then lowercase!<br>
2. <b>Einstieg (1 sentence):</b> vielen Dank für Ihre E-Mail. · ich schreibe Ihnen, weil … · ich habe Ihre Anzeige gelesen und interessiere mich für …<br>
3. <b>Leitpunkt-Bausteine:</b><br>
&nbsp;&nbsp;· informieren: Ich möchte Ihnen mitteilen, dass …<br>
&nbsp;&nbsp;· begründen: Leider kann ich nicht kommen, <b>weil</b> …<br>
&nbsp;&nbsp;· bitten (Konjunktiv II!): Könnten Sie mir bitte mitteilen, ob/wann …? · Ich wäre Ihnen dankbar, wenn …<br>
&nbsp;&nbsp;· vorschlagen: Wäre es möglich, den Termin zu verschieben? · Wie wäre es mit …?<br>
&nbsp;&nbsp;· sich beschweren: Leider musste ich feststellen, dass … · Ich bitte Sie, das Problem bis … zu lösen.<br>
4. <b>Schluss:</b> Ich freue mich auf Ihre Antwort. · Vielen Dank im Voraus!<br>
5. <b>Gruß:</b> Mit freundlichen Grüßen / Viele Grüße + full name (never "LG"!)</p>
<p><b>2-minute checklist:</b> all 4 Leitpunkte ticked off on the task sheet? Anrede AND Gruß present? Sie/Ihnen/Ihr capitalized everywhere? At least 3 different connectors (weil, deshalb, trotzdem …)? Verb in position 2 in main clauses, at the end after weil/dass? No slang (super, echt, kriegen → erhalten)?</p>`
    },
    sprechen: {
      title: 'Sprechen: Redemittel for all three parts',
      html: `<p><b>Teil 1 — Einander kennenlernen (get to know your partner):</b> talk about Name, Wohnort, Familie, Beruf/Ausbildung, Sprachen, Freizeit — and ASK back. Ich heiße … und wohne seit … in … · Ich arbeite als … / Ich mache eine Ausbildung zur … · Und woher kommen Sie? · Was machen Sie beruflich? · Haben Sie Kinder? — <i>Drill this until it runs on autopilot; it is the easy 15 points.</i></p>
<p><b>Teil 2 — Über ein Thema sprechen:</b> each of you gets a short text, you report and discuss. <b>Report:</b> In meinem Text geht es um … · Ich habe gelesen, dass … · Der Text sagt, dass … <b>Opinion:</b> Meiner Meinung nach … · Ich finde es wichtig/problematisch, dass … · Ich habe die Erfahrung gemacht, dass … · Bei uns in … ist das so: … <b>Interaction (this is graded!):</b> Wie ist das bei dir/Ihnen? · Was hältst du davon? · Da stimme ich dir zu. · Das sehe ich anders, weil …</p>
<p><b>Teil 3 — gemeinsam etwas planen:</b> reach a real agreement (Wann? Wo? Was? Wer macht was?). <b>Vorschlagen:</b> Wollen wir …? · Wie wäre es, wenn wir …? · Ich schlage vor, dass … <b>Zustimmen:</b> Gute Idee! · Einverstanden. · Das passt mir gut. <b>Ablehnen + Alternative:</b> Das finde ich nicht so gut, weil … Vielleicht könnten wir stattdessen … <b>Aufgaben verteilen:</b> Ich könnte … übernehmen. · Kümmerst du dich um …? <b>Abschluss:</b> Gut, dann machen wir das so!</p>
<p><b>Repair phrases (gold on exam day):</b> Wie bitte? · Könnten Sie das bitte wiederholen? · Wie sagt man …? · Einen Moment, ich überlege kurz. · Ich meine …</p>`
    },
    hoeren: {
      title: 'Hören: traps & technique',
      html: `<p><b>Rule 1 — read before you listen.</b> Use every announcement pause to read the NEXT items and underline the key word. The items follow the order of the audio; if you are lost, jump to the next item, never chase a missed one.</p>
<p><b>Rule 2 — most of the module plays only ONCE.</b> No second chance: decide, mark, move on. A blank is a wasted free chance — always guess.</p>
<p><b>The paraphrase trap:</b> the correct answer almost never uses the words from the item. "Der Eintritt ist frei" in the item = "Sie müssen nichts bezahlen" in the audio. Wrong options often repeat a word you DID hear — hearing a word is not hearing the meaning.</p>
<p><b>Correction signals (the answer flips!):</b> nicht … sondern · leider · doch nicht · stattdessen · eigentlich … aber · Achtung, eine Änderung: …</p>
<p><b>Number & clock traps:</b> halb zehn = <b>9:30</b> · Viertel vor sieben = 6:45 · vierzehn (14) vs. vierzig (40) — listen for -zehn vs. -zig · zweiundzwanzig = 22, units FIRST · dates as ordinals: am dritten Mai, am siebten, am zwanzigsten.</p>
<p><b>Who says what:</b> in interviews and dialogues, items often ask about ONE speaker's opinion. Note who holds which position — the distractor is usually the other person's view.</p>
<p><b>Daily routine:</b> 10 minutes of German audio (slow news, a podcast) + shadowing 5 sentences aloud does more for the Hören score than any grammar drill.</p>`
    }
  },

  days: [
    {
      day: 1,
      tier: 'core',
      title: 'Kick-off & Kasus-Check',
      focus: 'Akkusativ vs. Dativ — the backbone of every B1 sentence',
      tasks: [
        'Read the B1 exam guide: the five modules, the points, and why the written and the oral part are judged separately — this trainer marks each at 60%.',
        'Review the Kasus reference table in the practice hub, then take the quiz: 15 Kasus items.',
        'One flashcard session (20 cards) of nouns in the practice hub — this becomes your daily routine.'
      ],
      cheats: ['cases'],
      ai: [
        {
          t: 'Case drill',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Stelle mir 15 Lückensätze, in denen ich zwischen Akkusativ und Dativ entscheiden muss — mit Präpositionen wie mit, für, in, auf, wegen. Korrigiere jede Antwort sofort und erkläre kurz auf Englisch, warum der Kasus richtig ist. Am Ende: meine drei häufigsten Fehler.'
        }
      ]
    },
    {
      day: 2,
      tier: 'core',
      title: 'Perfekt & Präteritum',
      focus: 'Perfekt for speaking, Präteritum for reading',
      tasks: [
        'Study the verb reference table in the practice hub, then quiz: 15 verb forms (Präteritum/Perfekt).',
        'One flashcard session (20 cards) of verbs in the practice hub.',
        'Write 8 sentences about yesterday in Perfekt, then rewrite 4 of them in Präteritum.'
      ],
      cheats: ['verbs'],
      ai: [
        {
          t: 'Tense debrief',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Ich schreibe dir 8 Sätze über gestern im Perfekt. Korrigiere alle Fehler (haben/sein, Partizip II, Wortstellung), erkläre die Korrekturen kurz auf Englisch und stelle mir danach mündlich weitere Fragen über letzte Woche, damit ich die Vergangenheit aktiv übe.'
        }
      ]
    },
    {
      day: 3,
      tier: 'core',
      title: 'Konnektoren & Wortstellung',
      focus: 'weil, obwohl, deshalb — the three word-order groups',
      tasks: [
        'Learn the three connector groups from the cheatsheet: Position 0, verb to the end, inversion.',
        'Join 10 sentence pairs on paper: 4× weil, 3× obwohl, 3× deshalb — check the verb position every time.',
        'One flashcard session (20 cards) in the practice hub, category of your choice.'
      ],
      cheats: ['konnektoren'],
      ai: [
        {
          t: 'Connector workout',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Gib mir 12 Satzpaare, die ich mit einem passenden Konnektor verbinden muss (weil, obwohl, deshalb, trotzdem, damit, nachdem). Ich schreibe den Satz, du korrigierst sofort — achte besonders auf die Verbposition — und erklärst den Unterschied kurz auf Englisch, wenn ich den falschen Konnektor wähle.'
        }
      ]
    },
    {
      day: 4,
      tier: 'core',
      title: 'Verben mit Präposition',
      focus: 'warten auf, sich freuen über — fixed pairs, free points',
      tasks: [
        'Study the Verben-mit-Präposition reference table in the practice hub — mark the 10 you did not know.',
        'One flashcard session (20 cards) of Verben mit Präposition.',
        'Write 10 own sentences with the pairs you marked, then 3 with darauf/darüber/daran.'
      ],
      cheats: ['cases'],
      ai: [
        {
          t: 'Preposition pairs',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Frage mich 15 Verben mit Präposition ab (z. B. warten auf, sich interessieren für, teilnehmen an): Ich muss die Präposition UND den Kasus nennen und einen Beispielsatz bilden. Korrigiere sofort. Danach 5 Fragen mit wo(r)- und da(r)-Wörtern (Worauf wartest du? — Ich warte darauf, dass …).'
        }
      ]
    },
    {
      day: 5,
      tier: 'core',
      title: 'Adjektivendungen & Nomen-Routine',
      focus: 'The endings machine + article discipline',
      tasks: [
        'Study the adjective reference table in the practice hub, then quiz: 15 adjective endings.',
        'One flashcard session (20 cards) of nouns — always learn article + plural together.',
        'Describe your room in 8 written sentences, every noun with an adjective (mit dem großen Fenster, ein kleiner Tisch …).'
      ],
      cheats: ['cases'],
      ai: [
        {
          t: 'Endings drill',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Stelle mir 15 Lückensätze mit Adjektivendungen in Nominativ, Akkusativ und Dativ, mit und ohne Artikel (der nett__ Kollege, mit einem neu__ Auto, frisch__ Brot). Korrigiere jede Antwort sofort und nenne mir die Regel dahinter in einem englischen Satz.'
        }
      ]
    },
    {
      day: 6,
      tier: 'core',
      title: 'Lesen — technique day',
      focus: 'Read the questions first, trust the text only',
      tasks: [
        'Take just the Lesen module of Modelltest 1 (module practice), untimed — technique before speed.',
        'For every item note WHERE in the text the answer hides; remember: plausible but not stated = wrong.',
        'Add every unknown word that blocked an answer to your flashcards (max 15).'
      ],
      cheats: [],
      ai: [
        {
          t: 'Trap-maker',
          p: 'Schreibe einen deutschen Text (ca. 250 Wörter, Niveau B1) über ein Alltagsthema und dazu 5 Aussagen im telc-Stil (richtig/falsch oder a/b/c) mit typischen Fallen: veränderte Zahlen, Verneinung, plausibel-aber-nicht-im-Text. Ich antworte, du löst auf und zitierst für jede Antwort den Satz im Text, der sie beweist. Erkläre die Fallen kurz auf Englisch. Dann ein neuer Text.'
        }
      ]
    },
    {
      day: 7,
      tier: 'core',
      title: 'Sprachbausteine — grammar under exam conditions',
      focus: 'Teil 1: a/b/c · Teil 2: the word bank',
      tasks: [
        'Take the Sprachbausteine module of Modelltest 1 (module practice), untimed.',
        'For every wrong gap, find the rule in the practice hub reference tables (Kasus, verbs, Konnektoren) — not knowing WHY it was wrong means it will be wrong again.',
        'One flashcard session (20 cards) in the practice hub.'
      ],
      cheats: ['konnektoren', 'cases'],
      ai: [
        {
          t: 'Sprachbausteine machine',
          p: 'Erstelle eine telc-B1-Sprachbausteine-Übung: ein halbformeller Brief mit 10 Lücken und je 3 Optionen (a/b/c), die Kasus, Präpositionen, Konnektoren und Verbformen testen. Nach meinen Antworten erklärst du jede Lücke in einem englischen Satz. Danach Teil 2: ein Text mit 10 Lücken und einer Wortbank aus 15 Wörtern. Wiederhole mit neuen Briefen, bis ich zweimal 18/20 schaffe.'
        }
      ]
    },
    {
      day: 8,
      tier: 'core',
      title: 'Hören — technique day',
      focus: 'One pass, no second chance',
      tasks: [
        'Read the Hören cheatsheet — especially the paraphrase trap and the correction signals.',
        'Take the Hören module of Modelltest 1 (module practice) under real conditions: no pausing, no replaying.',
        'Review every red item: was it a paraphrase, a number, or the wrong speaker? Note the trap type.'
      ],
      cheats: ['hoeren'],
      ai: [
        {
          t: 'Paraphrase radar',
          p: 'Du bist mein Hörverstehen-Trainer (telc B1). Schreibe 10 kurze Ansagen oder Aussagen (je 2–3 Sätze, als Transkript) und zu jeder eine richtig/falsch-Aussage, die den Inhalt PARAPHRASIERT — nie mit denselben Wörtern. Baue Korrektursignale ein (nicht … sondern, leider, stattdessen). Ich antworte, du löst auf und zeigst mir die entscheidende Umformulierung.'
        }
      ]
    },
    {
      day: 9,
      tier: 'core',
      title: 'Skills on the clock',
      focus: 'Same tasks, real timing',
      tasks: [
        'Take the Lesen and Sprachbausteine modules of Modelltest 2 (module practice), strictly timed.',
        'Analyze your timing: which Teil ate the most minutes? Decide your working order for the real exam.',
        'One flashcard session (20 cards) — include the words you collected on day 6.'
      ],
      cheats: ['konnektoren'],
      ai: [
        {
          t: 'Speed-reading coach',
          p: 'Trainiere meine Lesestrategie für telc B1. Schreibe 5 deutsche Mini-Texte (je ca. 60 Wörter, B1) mit je EINER Frage. Ich muss alle 5 in 4 Minuten beantworten. Danach zeigst du mir, welche Signalwörter in jedem Text die Antwort getragen haben, und gibst mir 3 Scanning-Tricks auf Englisch. Dann eine zweite, schnellere Runde.'
        }
      ]
    },
    {
      day: 10,
      tier: 'core',
      title: 'Checkpoint week 1+',
      focus: 'Consolidate before the letter',
      tasks: [
        'Review every red item from your Modelltest 1 and 2 modules in the review screen — out loud, with the rule.',
        'Flashcard sweep: repeat ALL cards from days 1–9; struggling cards go into a second session today.',
        'Quiz: 15 items in your weakest practice-hub category (be honest — the stats show it).'
      ],
      cheats: ['cases', 'verbs'],
      ai: [
        {
          t: 'Weak-point analysis',
          p: 'Interview me in English about my first 9 days of telc B1 prep: which module felt hardest (Lesen, Sprachbausteine, Hören), which grammar topic keeps costing points. Then build a concrete 30-minute daily micro-plan for the next week targeting my two weakest areas. Danach: 10 schnelle deutsche Quizfragen genau zu diesen Schwächen, mit sofortiger Korrektur.'
        }
      ]
    },
    {
      day: 11,
      tier: 'core',
      title: 'Schreiben — the 45-point letter',
      focus: '4 Leitpunkte, 30 minutes, fixed skeleton',
      tasks: [
        'Memorize the letter skeleton from the cheatsheet: Anrede, Einstieg, Leitpunkte, Schluss, Gruß.',
        'Take the Schreiben module of Modelltest 1: write the letter in 30 minutes, no dictionary.',
        'Self-check with the checklist: all 4 Leitpunkte? Sie capitalized? 3 connectors used?'
      ],
      cheats: ['schreiben'],
      ai: [
        {
          t: 'Letter examiner',
          p: 'Du bist telc-B1-Prüfer für den Brief (45 Punkte). Gib mir eine realistische halbformelle Schreibaufgabe mit 4 Leitpunkten. Ich schreibe den Brief. Bewerte ihn nach den drei telc-Kriterien (Berücksichtigung der Leitpunkte, kommunikative Gestaltung, formale Richtigkeit), je 0–15 Punkte, korrigiere jeden Fehler und zeige eine Musterversion. Dann die nächste Aufgabe.'
        },
        {
          t: 'Leitpunkt phrases',
          p: 'Gib mir für diese 6 Brief-Funktionen je 3 B1-Redemittel zum Auswendiglernen: informieren, begründen, höflich bitten (Konjunktiv II), vorschlagen, sich beschweren, sich bedanken. Frage mich danach ab: Du nennst die Funktion, ich schreibe einen Satz, du korrigierst sofort.'
        }
      ]
    },
    {
      day: 12,
      tier: 'core',
      title: 'First full mock',
      focus: 'Modelltest 3, real conditions',
      tasks: [
        'Take Modelltest 3 under real timing: Lesen, Sprachbausteine, Hören and Schreiben in one sitting — timer on, no pausing, no dictionary.',
        'Review every red item in the review screen and sort them: vocabulary gap, grammar gap, or technique error.',
        'Add the 15 most painful unknown words to your flashcards.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Error debrief',
          p: 'Ich habe gerade einen kompletten telc-B1-Modelltest gemacht. Ich füge meine Fehler ein (Aufgabe + meine falsche Antwort + richtige Antwort). Analysiere die Muster auf Englisch, nenne die 3 Baustellen mit dem größten Punkte-Hebel vor meiner Prüfung und erstelle zu jeder eine deutsche Mini-Übung (5 Aufgaben), die wir sofort zusammen machen.'
        }
      ]
    },
    {
      day: 13,
      tier: 'core',
      title: 'Sprechen — all three parts',
      focus: 'Einander kennenlernen, Thema, gemeinsam planen',
      tasks: [
        'Learn the Redemittel for all three parts from the cheatsheet — say each set out loud 3 times.',
        'Record yourself: 90 seconds of Teil-1 self-presentation, then listen back and fix one thing.',
        'Plan something out loud, solo, for 3 minutes (a farewell party for a colleague): Wann? Wo? Wer macht was?'
      ],
      cheats: ['sprechen'],
      ai: [
        {
          t: 'Full oral simulation',
          p: 'Simuliere die komplette mündliche telc-B1-Prüfung mit mir auf Deutsch. Teil 1: Wir lernen uns kennen — stelle Fragen und antworte auch selbst, damit ich nachfragen kann. Teil 2: Gib mir ein kurzes Thema mit 2–3 Fakten, wir diskutieren, frage nach meiner Meinung und Erfahrung. Teil 3: Wir planen gemeinsam etwas, widersprich mir einmal höflich. Bleib bis zum Ende in der Prüferrolle, DANACH Feedback auf Englisch mit meinen 5 wichtigsten Fehlern.'
        },
        {
          t: 'Opinion sprints',
          p: 'Gib mir nacheinander 5 Alltagsthemen (z. B. Homeoffice, Haustiere, Online-Einkaufen). Zu jedem sage ich dir 4–5 Sätze Meinung mit Begründung. Du korrigierst kurz, gibst mir ein besseres Redemittel und stellst EINE Nachfrage, auf die ich reagieren muss.'
        }
      ]
    },
    {
      day: 14,
      tier: 'core',
      title: 'Core finale — letter II & battle plan',
      focus: 'Close the core, open the mock phase',
      tasks: [
        'Take the Schreiben module of Modelltest 2: second letter, 30 minutes, checklist afterwards.',
        'Review sweep: reread all six cheatsheets once (30 min) and your red items from Modelltest 3.',
        'Say your Teil-1 self-presentation once — still automatic?',
        'From here the rhythm is: one Modelltest every 2–3 days, always with a full review the same day.'
      ],
      cheats: ['schreiben', 'sprechen'],
      ai: [
        {
          t: 'Halfway review',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Teste in 20 gemischten Aufgaben, ob das Kernprogramm sitzt: 5× Kasus/Präpositionen, 5× Vergangenheit, 5× Konnektoren mit Wortstellung, 5× Verben mit Präposition. Eine Aufgabe nach der anderen, sofortige Korrektur. Am Ende: Punktzahl und die 3 Themen, die ich in Woche 3 wiederholen muss.'
        }
      ]
    },
    {
      day: 15,
      tier: 'extension',
      title: 'Genitiv & n-Deklination',
      focus: 'wegen des Wetters — the B1 signature case',
      tasks: [
        'Study the Genitiv row and the n-Deklination list in the cases cheatsheet and the Kasus reference table.',
        'Quiz: 15 Kasus items in the practice hub — this time watch specifically for Genitiv gaps.',
        'Write 8 sentences with wegen, trotz, während, statt + 4 with n-Deklination nouns (der Kunde, der Kollege).'
      ],
      cheats: ['cases'],
      ai: [
        {
          t: 'Genitiv drill',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Stelle mir 12 Lückensätze mit Genitiv nach wegen, trotz, während und statt sowie 6 Sätze mit n-Deklination (der Kunde, der Kollege, der Herr, der Mensch). Korrigiere sofort und erkläre kurz auf Englisch. Danach 5 telc-typische Sprachbausteine-Lücken, in denen Genitiv eine der Optionen ist.'
        }
      ]
    },
    {
      day: 16,
      tier: 'extension',
      title: 'Modelltest 4',
      focus: 'Beat your Modelltest-3 score',
      tasks: [
        'Take Modelltest 4 under real timing, complete written part in one sitting.',
        'Compare with Modelltest 3 in the results: which module moved, which did not?',
        'Review every red item; add unknown words to flashcards and do one 20-card session.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Error debrief',
          p: 'Ich habe telc-B1-Modelltest Nummer 4 gemacht und vergleiche ihn mit dem letzten. Ich füge meine Fehler und die Punktzahlen pro Modul ein. Sag mir auf Englisch: Welche Fehler wiederholen sich? Welche Fallen übersehe ich systematisch? Dann drille mich mit 8 deutschen Aufgaben genau zu meinem hartnäckigsten Fehlertyp.'
        }
      ]
    },
    {
      day: 17,
      tier: 'extension',
      title: 'Konjunktiv II — deep dive',
      focus: 'Irreale Bedingungen & polite power',
      tasks: [
        'Study the Konjunktiv II block in the verbs cheatsheet: wäre, hätte, würde, könnte, müsste, sollte.',
        'Write 6 irreale Bedingungen (Wenn ich …, würde ich …) and 4 Ratschläge (An deiner Stelle …).',
        'Quiz: 15 verb forms in the practice hub, and flag every Konjunktiv item you hesitate on.'
      ],
      cheats: ['verbs'],
      ai: [
        {
          t: 'Konjunktiv coach',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Runde 1: 8 Transformationen von Realität zu irrealer Bedingung (Ich habe wenig Zeit. → Wenn ich mehr Zeit hätte, …). Runde 2: 5 Situationen, in denen ich höflich mit Konjunktiv II bitten muss (Termin verschieben, Nachbarn um Ruhe bitten). Runde 3: Ich gebe dir 5 Ratschläge mit "An deiner Stelle würde ich …". Korrigiere alles sofort, kurze Erklärungen auf Englisch.'
        }
      ]
    },
    {
      day: 18,
      tier: 'extension',
      title: 'Passiv',
      focus: 'werden + Partizip II — the Sprachbausteine favourite',
      tasks: [
        'Study the Passiv block in the verbs cheatsheet: Präsens, Präteritum, with modal verbs.',
        'Transform 10 man-sentences into Passiv on paper (Man repariert das Auto. → Das Auto wird repariert.).',
        'One flashcard session (20 cards) of verbs — say the Partizip II of each out loud.'
      ],
      cheats: ['verbs'],
      ai: [
        {
          t: 'Passiv workout',
          p: 'Du bist mein Deutschtrainer (Niveau B1). Drille Passiv in 3 Runden: (1) 6 Aktiv-Sätze, die ich ins Passiv Präsens setze, (2) 6 ins Passiv Präteritum (Das Rathaus wurde 1900 gebaut.), (3) 6 mit Modalverb (Der Antrag muss unterschrieben werden.). Sofortige Korrektur. Zum Schluss 5 Sprachbausteine-Lücken, in denen ich zwischen wird/wurde/worden/werden wählen muss.'
        }
      ]
    },
    {
      day: 19,
      tier: 'extension',
      title: 'Modelltest 5 & letter III',
      focus: 'Written routine under pressure',
      tasks: [
        'Take Modelltest 5 under real timing, including the Schreiben module — this is letter number three.',
        'Score your letter yourself against the three telc criteria before reading any feedback — honest self-assessment is an exam skill.',
        'Review every red item and update your personal top-5 mistakes list.'
      ],
      cheats: ['schreiben'],
      ai: [
        {
          t: 'Letter upgrade',
          p: 'Du bist telc-B1-Prüfer. Ich füge meinen Brief aus dem heutigen Modelltest ein (Aufgabe + mein Text). Bewerte nach den drei Kriterien (Leitpunkte, kommunikative Gestaltung, formale Richtigkeit, je 0–15), markiere jeden Fehler, und zeige dann, wie derselbe Brief mit 3 besseren Konnektoren und 2 Konjunktiv-II-Formulierungen klingt. Danach diktierst du mir die 5 wichtigsten Korrekturen zum Abschreiben.'
        }
      ]
    },
    {
      day: 20,
      tier: 'extension',
      title: 'Oral fluency day',
      focus: 'Speak more than you study',
      tasks: [
        'Do a complete 15-minute oral run in one recording: Teil 1, a Teil-2 topic, a Teil-3 planning task — no pausing.',
        'Listen back and count your repair phrases: did you rescue yourself in German or freeze?',
        'Speak 2 minutes each, solo, on three topics: Umwelt im Alltag, Arbeit und Freizeit, Lernen mit Apps.'
      ],
      cheats: ['sprechen'],
      ai: [
        {
          t: 'Fluency partner',
          p: 'Sei mein Sprechpartner für telc B1. Wir führen 15 Minuten ein echtes Gespräch: Du wechselst zwischen Alltagsfragen, Meinungsfragen und kleinen Planungsaufgaben. Unterbrich mich NICHT für Korrekturen — sammle meine Fehler und gib mir erst am Ende Feedback auf Englisch: die 5 wichtigsten Fehler, 5 bessere Redemittel und eine Bewertung meiner Flüssigkeit.'
        },
        {
          t: 'Disagree politely',
          p: 'Wir üben Teil 3 der mündlichen telc-B1-Prüfung: gemeinsam etwas planen. Schlage ein Szenario vor (z. B. Ausflug mit dem Deutschkurs). Mache Vorschläge, aber lehne meine ersten zwei Vorschläge höflich ab, damit ich Alternativen anbieten muss. Wir hören erst auf, wenn Wann, Wo, Was und Wer-macht-was komplett geklärt sind. Danach kurzes Feedback.'
        }
      ]
    },
    {
      day: 21,
      tier: 'extension',
      title: 'Modelltest 6 & checkpoint week 3',
      focus: 'Trend check: are the curves rising?',
      tasks: [
        'Take Modelltest 6 under real timing.',
        'Look at your results across Modelltests 3–6: write down your weakest module and your weakest grammar topic.',
        'Flashcard sweep: review every struggling card from the last two weeks.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Trend analysis',
          p: 'Ich bin in Woche 3 meiner telc-B1-Vorbereitung und füge meine Modelltest-Ergebnisse pro Modul ein (Test 3 bis 6). Analysiere den Trend auf Englisch: Wo verliere ich noch Punkte gegenüber der 60-Prozent-Marke, mit der dieser Trainer rechnet, und wo gegen ein gutes Ergebnis? Erstelle einen konkreten Plan für die letzte Woche: welcher Skill an welchem Tag, mit je einer messbaren Übung. Danach 10 deutsche Blitzfragen zu meinem schwächsten Grammatikthema.'
        }
      ]
    },
    {
      day: 22,
      tier: 'extension',
      title: 'Sprachbausteine sharpening',
      focus: 'Grammar gaps at exam speed',
      tasks: [
        'Quiz marathon in the practice hub: 15 Kasus items + 15 verb forms + 15 adjective endings — note every category under 80%.',
        'Review every red Sprachbausteine item from Modelltests 3–6 in the review screens; say the rule out loud for each.',
        'One flashcard session (20 cards) of Verben mit Präposition.'
      ],
      cheats: ['konnektoren', 'cases', 'verbs'],
      ai: [
        {
          t: 'Sprachbausteine finals',
          p: 'Erstelle telc-B1-Sprachbausteine auf Prüfungsniveau: ein formeller Brief mit 10 a/b/c-Lücken, die gezielt Genitiv, Konjunktiv II, Passiv, Relativpronomen und zweiteilige Konnektoren (je … desto, nicht nur … sondern auch) testen. Nach meinen Antworten je ein englischer Erklärsatz. Dann Teil 2 mit Wortbank. Wiederhole, bis ich zweimal hintereinander 18/20 erreiche.'
        }
      ]
    },
    {
      day: 23,
      tier: 'extension',
      title: 'Modelltest 7',
      focus: 'Routine beats inspiration',
      tasks: [
        'Take Modelltest 7 under real timing.',
        'Rewrite today’s letter once more, fixing every marked mistake — the corrected version is the one your hand remembers.',
        'Review every red item; your top-5 mistakes list should be getting shorter, not longer.'
      ],
      cheats: ['schreiben'],
      ai: [
        {
          t: 'Error debrief',
          p: 'Ich füge meine Fehler aus telc-B1-Modelltest 7 ein. Gruppiere sie auf Englisch nach Ursache (Wortschatz, Grammatikregel, Technik/Zeitdruck, Unaufmerksamkeit) und sage mir, welche Gruppe vor der Prüfung noch trainierbar ist und welche ich mit Strategie (Reihenfolge, Raten, Zeitbudget) abfangen muss. Danach eine 10-Aufgaben-Mini-Übung zur größten Gruppe.'
        }
      ]
    },
    {
      day: 24,
      tier: 'extension',
      title: 'Hören bootcamp',
      focus: 'Zero points lost on paraphrases and digits',
      tasks: [
        'Reread the Hören cheatsheet and drill the correction signals (nicht … sondern, leider, stattdessen) out loud.',
        'Dictation marathon: 20 times, dates and prices heard as words, written as digits — repeat until 20/20.',
        'Shadowing: repeat 10 sentences from a German podcast at natural speed, mimicking the melody.'
      ],
      cheats: ['hoeren'],
      ai: [
        {
          t: 'Numbers at full speed',
          p: 'Diktiere mir deutsche Zahlen in Worten, ich antworte in Ziffern: Uhrzeiten (Viertel vor acht, halb zehn), Daten (am einundzwanzigsten März), Preise (neunundneunzig Cent) und Telefonnummern in Zweiergruppen. 10 pro Runde, jede Runde schneller und gemeiner (vierzehn vs. vierzig!). Sofortige Korrektur. Nach 3 Runden: Liste aller Fallen, in die ich getappt bin.'
        }
      ]
    },
    {
      day: 25,
      tier: 'extension',
      title: 'Modelltest 8',
      focus: 'Both halves comfortably clear',
      tasks: [
        'Take Modelltest 8 under real timing.',
        'Check the pass math in your results: this trainer marks the written and the oral part separately, 60% each — is your Sprechen practice keeping up?',
        'Review every red item and do one flashcard session (20 cards) of your weakest category.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Margin check',
          p: 'Ich füge meine Modulergebnisse aus telc-B1-Modelltest 8 ein. Rechne mir auf Englisch vor, wie weit ich über oder unter 60 Prozent im schriftlichen Teil liege (die Marke, mit der mein Trainer rechnet), und wie viele Fehler pro Modul ich mir am Prüfungstag leisten kann. Dann simuliere die 5 Aufgabentypen, in denen ich zuletzt Punkte verloren habe — eine nach der anderen, auf Deutsch, mit sofortiger Korrektur.'
        }
      ]
    },
    {
      day: 26,
      tier: 'extension',
      title: 'Schreiben & Sprechen — final polish',
      focus: 'The productive skills win the pass',
      tasks: [
        'Write one letter in 25 minutes (5 minutes under exam time) using a Schreiben task from an unused Modelltest.',
        'Do one full oral run: Teil 1 from memory, one Teil-2 topic, one Teil-3 plan — record and listen back.',
        'Drill the repair phrases one last time: Wie bitte? Könnten Sie das wiederholen? Ich meine …'
      ],
      cheats: ['schreiben', 'sprechen'],
      ai: [
        {
          t: 'Double examiner',
          p: 'Du bist telc-B1-Prüfer für die produktiven Teile. Erst Schreiben: Gib mir eine halbformelle Briefaufgabe mit 4 Leitpunkten, ich schreibe in 25 Minuten, du bewertest nach den drei Kriterien mit Punktzahl. Dann Sprechen: Simuliere Teil 2 und Teil 3 auf Deutsch, bleib in der Rolle, und gib mir erst danach Feedback auf Englisch — mit einer ehrlichen Einschätzung, ob das heute 60 Prozent im mündlichen Teil erreichen würde.'
        }
      ]
    },
    {
      day: 27,
      tier: 'extension',
      title: 'Modelltest 9 & final sweep',
      focus: 'Last full rehearsal',
      tasks: [
        'Take Modelltest 9 under real timing — treat it as the real day: same start time as your exam if possible.',
        'Keep Modelltest 10 as a reserve: use only its module for your weakest skill, tomorrow morning at the earliest — or not at all.',
        'Final flashcard sweep: only the cards that are still struggling; everything green stays closed.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Final debrief',
          p: 'Ich habe meinen letzten kompletten telc-B1-Modelltest gemacht und füge Ergebnisse und Fehler ein. Kein neues Training mehr: Sag mir auf Englisch nur noch, (1) welche 3 Dinge ich am Prüfungstag strategisch anders machen soll (Reihenfolge, Zeitbudget, Raten), (2) welche 5 Formulierungen ich für Brief und Sprechen noch einmal ansehen soll, (3) was ich bewusst NICHT mehr üben soll. Kurz und konkret.'
        }
      ]
    },
    {
      day: 28,
      tier: 'extension',
      title: 'Light review only',
      focus: 'Peak, don’t cram',
      tasks: [
        'Reread all six cheatsheets once, slowly (45 min) — mark the 5 things you still want on a single sheet of paper.',
        'Say your Teil-1 self-presentation and your 5 Konjunktiv-II politeness phrases out loud — they must be automatic.',
        'Pack for exam day (ID, invitation, water, watch), plan your route and arrival time — then close the books and rest.'
      ],
      cheats: ['schreiben', 'sprechen', 'hoeren'],
      ai: [
        {
          t: 'Calm warm-up',
          p: 'Morgen ist meine telc-B1-Prüfung. Führe ein ruhiges, freundliches Gespräch auf Deutsch mit mir (10 Minuten): Alltagsfragen, ein bisschen über meine Pläne nach der Prüfung, nichts Schweres. Korrigiere nur Fehler, die das Verstehen stören, und tu das beiläufig. Am Ende: drei Sätze Ermutigung auf Englisch und die Erinnerung, heute früh schlafen zu gehen.'
        }
      ]
    }
  ]
};
