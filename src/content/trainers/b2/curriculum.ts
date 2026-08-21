import { type LearnPlan } from '@shared/types';

/* The B2 28-day curriculum, its cheatsheets and the copy-paste AI tutor prompts.
   Days 1–14 are the core tier and are always scheduled; days 15–28 deepen towards a
   confident pass when the runway leaves room. `intro` and every `cheatsheets[].html`
   are authored HTML and are injected; all other strings are plain text. */
export const B2_CURRICULUM: LearnPlan = {
  intro: `This plan adapts to your <b>B2 exam date</b> — set it in Settings and the days re-pace themselves.
  Each day = vocabulary in the practice hub + one grammar or exam focus + an <b>AI practice session</b>: copy the prompt into Claude (or any AI chat) and it becomes your tutor, discussion partner or examiner.
  Days 1–14 are the <b>core curriculum</b> and are always scheduled; days 15–28 sharpen argumentation, the mündliche Prüfung and the remaining Modelltests when your date leaves room.`,

  cheatsheets: {
    genitiv: {
      title: 'Genitiv & formal prepositions',
      html: `<table class="history"><tr><th></th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td><b>Genitiv</b></td><td><b>des / eines</b> Mannes</td><td>der / einer Frau</td><td><b>des / eines</b> Kindes</td><td>der / – Leute</td></tr></table>
<p><b>Noun ending:</b> Maskulin/Neutrum add <b>-s</b> (des Lehrers) or <b>-es</b> after one syllable or -s/-ß/-z/-tz (des Mannes, des Gesetzes). Adjective always <b>-en</b>: trotz <i>des schlechten</i> Wetters.</p>
<p><b>n-Deklination</b> (Maskulin, -n/-en in EVERY case except Nominativ): der Kunde → des Kunde<b>n</b> · der Kollege → des Kollege<b>n</b> · der Mensch, der Student, der Experte, der Nachbar, der Herr (des Herr<b>n</b>) · Sonderfall: der Name → des Name<b>ns</b>, der Gedanke → des Gedanke<b>ns</b>.</p>
<p><b>Genitiv prepositions you MUST control at B2:</b><br>
· Alltag: <b>wegen</b> (because of) · <b>trotz</b> (despite) · <b>während</b> (during) · <b>innerhalb / außerhalb</b> (inside/outside of) · <b>(an)statt</b> (instead of)<br>
· Formell — Sprachbausteine favourites: <b>aufgrund</b> (owing to) · <b>infolge</b> (as a result of) · <b>angesichts</b> (in view of) · <b>hinsichtlich / bezüglich</b> (regarding) · <b>anlässlich</b> (on the occasion of) · <b>mangels</b> (for lack of) · <b>zwecks</b> (for the purpose of) · <b>anhand / mithilfe</b> (by means of) · <b>einschließlich</b> (including) · <b>zugunsten</b> (in favour of) · <b>seitens</b> (on the part of).</p>
<p><b>Traps:</b> spoken German says "wegen dem Stau" — in the exam write <i>wegen des Staus</i>. Without an article, Genitiv often switches to von: <i>der Bau von Wohnungen</i>. <b>laut</b> and <b>gemäß</b> usually take Dativ: laut dem Bericht.</p>`
    },
    passiv: {
      title: 'Passiv (all tenses) & Passiversatz',
      html: `<p><b>Vorgangspassiv = werden + Partizip II</b> — the process matters, not the doer:</p>
<table class="history"><tr><th>Zeit</th><th>Form</th><th>Beispiel</th></tr>
<tr><td>Präsens</td><td>wird + P II</td><td>Der Antrag <b>wird geprüft</b>.</td></tr>
<tr><td>Präteritum</td><td>wurde + P II</td><td>Das Haus <b>wurde</b> 1950 <b>gebaut</b>.</td></tr>
<tr><td>Perfekt</td><td>ist + P II + <b>worden</b></td><td>Der Fehler <b>ist</b> schnell <b>behoben worden</b>.</td></tr>
<tr><td>Plusquamperfekt</td><td>war + P II + worden</td><td>Die Ware <b>war</b> bereits <b>verschickt worden</b>.</td></tr>
<tr><td>Futur I</td><td>wird + P II + werden</td><td>Die Stelle <b>wird</b> bald <b>besetzt werden</b>.</td></tr>
<tr><td>mit Modalverb</td><td>Modal + P II + werden</td><td>Der Vertrag <b>muss unterschrieben werden</b>. / <b>musste</b> … <b>werden</b>.</td></tr></table>
<p><b>Zustandspassiv = sein + Partizip II</b> (result, not process): Das Fenster <b>ist geöffnet</b>. · Der Tisch <b>ist reserviert</b>.</p>
<p><b>Agent:</b> <b>von</b> + Dativ for the doer (vom Chef entschieden), <b>durch</b> for the means/cause (durch ein Erdbeben zerstört).</p>
<p><b>Passiversatz — B2 gold, tested in Sprachbausteine:</b><br>
· <b>lässt sich + Infinitiv:</b> Das Problem <b>lässt sich lösen</b>. (= kann gelöst werden)<br>
· <b>ist zu + Infinitiv:</b> Der Betrag <b>ist</b> bis Freitag <b>zu überweisen</b>. (= muss überwiesen werden)<br>
· <b>-bar / -lich:</b> Das ist mach<b>bar</b> / erklär<b>bar</b> / verständ<b>lich</b>. (= kann gemacht/erklärt/verstanden werden)<br>
· <b>man:</b> Man erreicht uns telefonisch. = Wir sind telefonisch erreichbar.</p>`
    },
    kii: {
      title: 'Konjunktiv II & indirekte Rede',
      html: `<p><b>Konjunktiv II Gegenwart — the forms to know by heart:</b> ich <b>wäre</b> · <b>hätte</b> · <b>würde</b> + Infinitiv · <b>könnte</b> · <b>müsste</b> · <b>dürfte</b> · <b>sollte</b> · <b>wollte</b> · <b>wüsste</b> · <b>käme</b> · <b>ginge</b> · <b>gäbe</b> · <b>bräuchte</b>. Everything else: würde + Infinitiv.</p>
<p><b>Konjunktiv II Vergangenheit = hätte/wäre + Partizip II</b> — one past form only:<br>
Wenn ich das gewusst <b>hätte</b>, <b>wäre</b> ich früher <b>gekommen</b>.<br>
Mit Modalverb (Doppelinfinitiv!): Ich <b>hätte</b> den Brief früher schreiben <b>müssen</b>. · Sie <b>hätte</b> kommen <b>können</b>.</p>
<p><b>Uses:</b> irreale Bedingungen (Wenn es billiger <b>wäre</b>, <b>würde</b> ich es kaufen) · Wünsche (Wenn ich doch mehr Zeit <b>hätte</b>!) · höfliche Bitten (<b>Wären</b> Sie so freundlich, …? · Ich <b>hätte</b> eine Frage) · Ratschläge (An Ihrer Stelle <b>würde</b> ich …) · irrealer Vergleich (Er tut so, <b>als ob</b> er alles <b>wüsste</b> / <b>als wüsste er</b> alles) · vorsichtige Vermutung (Das <b>dürfte</b> stimmen).</p>
<p><b>Indirekte Rede (Konjunktiv I)</b> — you must RECOGNIZE it in Lesen and press texts:<br>
er <b>sei</b> (sein) · er <b>habe</b> · er <b>könne</b> / <b>müsse</b> / <b>wolle</b> · er <b>werde</b> kommen · Vergangenheit: er <b>habe gesagt</b>, er <b>sei gefahren</b>.<br>
Der Minister sagte, die Lage <b>sei</b> stabil und man <b>werde</b> weitere Maßnahmen prüfen.</p>
<p><b>Rule of thumb:</b> if Konjunktiv I looks like normal Präsens (wir haben), German switches to Konjunktiv II: Sie sagten, sie <b>hätten</b> keine Zeit.</p>`
    },
    nominal: {
      title: 'Nominalisierung & Konnektoren (Argumentation)',
      html: `<p><b>Nominalstil ↔ Verbalstil — the classic B2 transformation:</b></p>
<table class="history"><tr><th>Nebensatz (verbal)</th><th>Präposition (nominal)</th><th>Beispiel</th></tr>
<tr><td>weil / da</td><td><b>wegen / aufgrund</b> + Gen</td><td>Weil es regnete → <b>Wegen des Regens</b></td></tr>
<tr><td>obwohl</td><td><b>trotz</b> + Gen</td><td>Obwohl er krank war → <b>Trotz seiner Krankheit</b></td></tr>
<tr><td>wenn / falls</td><td><b>bei</b> + Dat</td><td>Wenn Fragen auftreten → <b>Bei Fragen</b></td></tr>
<tr><td>während</td><td><b>während</b> + Gen</td><td>Während er studierte → <b>Während des Studiums</b></td></tr>
<tr><td>nachdem / bevor</td><td><b>nach / vor</b> + Dat</td><td>Nachdem sie angekommen war → <b>Nach ihrer Ankunft</b></td></tr>
<tr><td>damit / um … zu</td><td><b>zur / zum</b></td><td>Um Kosten zu senken → <b>Zur Senkung der Kosten</b></td></tr>
<tr><td>indem</td><td><b>durch</b> + Akk</td><td>Indem man Energie spart → <b>Durch Energiesparen</b></td></tr></table>
<p><b>Verb → Nomen:</b> prüfen → die Prüf<b>ung</b> · teilnehmen → die Teilnahme · lesen → das Les<b>en</b> · entscheiden → die Entscheid<b>ung</b>.</p>
<p><b>Konnektoren by function:</b><br>
· <b>kausal:</b> da, zumal (Verb Ende) · denn (Pos. 0) · <b>daher, folglich, infolgedessen, somit</b> (Inversion)<br>
· <b>konzessiv:</b> obwohl (Ende) · <b>dennoch, trotzdem, allerdings, gleichwohl</b> (Inversion)<br>
· <b>konditional:</b> <b>sofern, falls</b> (Ende) · <b>es sei denn</b>, (dass) … · andernfalls<br>
· <b>adversativ:</b> während, wohingegen (Ende) · hingegen, dagegen (Inversion)<br>
· <b>instrumental/modal:</b> indem, dadurch dass (Ende)</p>
<p><b>Zweiteilige Konnektoren:</b> je … desto (je mehr, desto besser) · sowohl … als auch · weder … noch · entweder … oder · zwar … aber · einerseits … andererseits · nicht nur … sondern auch.</p>`
    },
    brief: {
      title: 'Die halbformelle E-Mail (45 Punkte, 30 Minuten)',
      html: `<p><b>The task:</b> 30 minutes, ONE task — no choice between two. Write a <b>halbformelle E-Mail</b> that answers everything the prompt raises, covering all four Leitpunkte fully. Aim for roughly <b>150–220 words</b> — this trainer's target, since telc publishes no word count.</p>
<p><b>What "halbformell" means here:</b> you write as a named private person to an institution — eine Redaktion, ein Amt, eine Genossenschaft, eine Personalabteilung. So: <b>Sehr geehrte Damen und Herren,</b> or <b>Sehr geehrte Frau Weber,</b> plus a Betreff line, sachlich und höflich — kein Amtsdeutsch, kein Du. That is exactly the register of all ten Musterlösungen in this trainer.</p>
<p><b>Fixed skeleton — memorize it:</b><br>
1. <b>Betreff</b> — one subject line on its own, written the way every Musterlösung here writes it (<i>Betreff: …</i>), then a blank line: <i>Betreff: Leserbrief zum Artikel „…“ vom 12. Mai</i> / <i>Anfrage zu Ihrem Kursangebot</i> / <i>Bewerbung als …</i><br>
2. <b>Anrede:</b> Sehr geehrte Damen und Herren, (institution, no name) / Sehr geehrte Frau Weber, (named contact) — after the comma continue <b>lowercase</b>. "Lieber Herr Fischer," only fits someone you already know personally; no task here does.<br>
3. <b>Einstieg — why are you writing?</b> Ich wende mich an Sie, weil … · Mit großem Interesse habe ich Ihre Anzeige gelesen. · Ich beziehe mich auf Ihr Schreiben vom …<br>
4. <b>Hauptteil</b> — one short paragraph per Leitpunkt, connected with daher, allerdings, außerdem, aus diesem Grund.<br>
5. <b>Schluss + Erwartung:</b> Ich wäre Ihnen dankbar, wenn Sie … · Über eine baldige Antwort würde ich mich freuen. · Für Rückfragen stehe ich Ihnen gerne zur Verfügung.<br>
6. <b>Gruß:</b> Mit freundlichen Grüßen / Viele Grüße + voller Name (kein Komma nach dem Gruß, kein "LG"!).</p>
<p><b>Leserbrief moves (the commonest task in this trainer — 4 of 10):</b> Mit großem Interesse habe ich Ihren Artikel „…“ vom 12. Mai gelesen. · Als … kann ich das nur bestätigen / muss ich Ihnen widersprechen. · Der Autor übersieht jedoch, dass … · Meine eigene Erfahrung zeigt: … · Ich fordere daher, dass … · Ich würde mich freuen, wenn Ihre Zeitung dem Thema weiter Raum gäbe.</p>
<p><b>Beschwerde moves</b> (no paper in this trainer sets a Beschwerde, but the phrases carry straight over into any complaint you have to write): Leider musste ich feststellen, dass … · Die Ware weist erhebliche Mängel auf. · Ich bitte Sie, den Schaden bis zum … zu beheben. · Andernfalls sehe ich mich gezwungen, vom Kauf zurückzutreten. · Ich erwarte eine Rückerstattung des Betrags.</p>
<p><b>Anfrage moves:</b> Könnten Sie mir bitte mitteilen, ob/wann/wie …? · Ich hätte einige Fragen bezüglich … · Wäre es möglich, …? · Ich würde gerne wissen, welche Kosten entstehen.</p>
<p><b>Bewerbung moves:</b> hiermit bewerbe ich mich um die Stelle als … · Zurzeit arbeite ich als … · Ich verfüge über Erfahrung im Bereich … · Über eine Einladung zu einem Vorstellungsgespräch würde ich mich sehr freuen.</p>
<p><b>Checklist (3 min):</b> alle vier Leitpunkte vollständig beantwortet? Zielumfang etwa 150–220 Wörter? Betreff da? durchgehend Sie/Ihnen/Ihr groß? Konjunktiv II für Bitten? mindestens zwei formelle Konnektoren? Nomen groß, Verb an Position 2 bzw. am Ende?</p>`
    },
    muendlich: {
      title: 'Redemittel: Über Erfahrungen sprechen, Diskussion, Konsens',
      html: `<p><b>Teil 1 — Über Erfahrungen sprechen (ca. 2,5 Min. pro Person, eine eigene Erfahrung erzählen — KEINE Präsentation):</b><br>
· Einstieg: Ich möchte Ihnen von einer Erfahrung erzählen, bei der … · Bei mir war das so: …<br>
· Verlauf: Zuerst …, dann …, am Ende …<br>
· Gefühl & Bewertung: Aus meiner Erfahrung … · Damals habe ich mich … gefühlt, weil … · Rückblickend würde ich sagen, dass …<br>
· Vergleich & Abschluss: In meinem Heimatland ist das ähnlich/anders: … · Zusammenfassend würde ich sagen, dass … · Haben Sie das auch schon einmal erlebt?</p>
<p><b>Teil 2 — Diskussion (Position beziehen & reagieren):</b><br>
· Meinung: Meiner Ansicht/Meinung nach … · Ich bin fest davon überzeugt, dass … · Ich stehe dem eher kritisch/skeptisch gegenüber.<br>
· Zustimmen: Da stimme ich Ihnen völlig zu. · Das sehe ich genauso. · Da ist etwas Wahres dran.<br>
· Widersprechen (höflich!): Das sehe ich anders, denn … · Da muss ich Ihnen widersprechen. · Einerseits stimmt das, andererseits darf man nicht vergessen, dass …<br>
· Einhaken & abgeben: Darf ich kurz einhaken? · Lassen Sie mich das kurz ergänzen. · Wie sehen Sie das?<br>
· Abwägen: Man muss beide Seiten betrachten. · Es kommt darauf an, ob …</p>
<p><b>Teil 3 — etwas aushandeln (Planung & Konsens):</b><br>
· Vorschlagen: Ich schlage vor, dass wir … · Wie wäre es, wenn wir …? · Wir könnten stattdessen …<br>
· Abwägen: Das hätte den Vorteil/Nachteil, dass … · Dagegen spricht, dass …<br>
· Kompromiss: Wir könnten uns doch darauf einigen, dass … · Ich könnte mir auch vorstellen, … · Einigen wir uns auf einen Mittelweg?<br>
· Abschluss: Gut, dann halten wir fest: … · Also machen wir es so.</p>
<p><b>Repair phrases (gold on exam day):</b> Könnten Sie das bitte noch einmal erklären? · Was genau meinen Sie mit …? · Anders gesagt: … · Einen Moment, ich überlege kurz.</p>`
    }
  },

  days: [
    {
      day: 1,
      tier: 'core',
      title: 'Kick-off & Kasus bis Genitiv',
      focus: 'The B2 exam map + the full case system',
      tasks: [
        'Read the B2 exam guide: every module, its items and points, and why the written and the oral part are judged separately — this trainer marks each at 60%.',
        'Review the Kasus reference tables in the practice hub — especially the Genitiv rows and the n-Deklination nouns.',
        'Cheatsheet: Genitiv — write 10 own sentences with wegen, trotz, während, innerhalb, aufgrund.',
        'One flashcard session (20 cards) of nouns in the practice hub.'
      ],
      cheats: ['genitiv'],
      ai: [
        {
          t: 'Genitiv drill',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Stelle mir 15 Lückensätze mit Genitiv: Genitivpräpositionen (wegen, trotz, aufgrund, infolge, angesichts), Genitivattribute und n-Deklination (des Kunden, des Kollegen). Ich fülle die Lücken aus, du korrigierst sofort und erklärst jede Korrektur in einem kurzen englischen Satz. Am Ende: meine drei häufigsten Fehler.'
        }
      ]
    },
    {
      day: 2,
      tier: 'core',
      title: 'Genitiv im Ernstfall',
      focus: 'Formal prepositions — Sprachbausteine ammunition',
      tasks: [
        'Cheatsheet: Genitiv — memorize the formal preposition list (aufgrund, infolge, angesichts, hinsichtlich, anlässlich, mangels, zwecks); one own sentence each.',
        'Quiz: 15 Kasus items in the practice hub, then redo every one you missed.',
        'Rewrite 8 weil/obwohl sentences from your notes as wegen/trotz + Genitiv phrases.',
        'One flashcard session (20 cards) of nouns.'
      ],
      cheats: ['genitiv'],
      ai: [
        {
          t: 'Formell umformen',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Gib mir 12 Sätze mit weil-, obwohl- oder wenn-Nebensätzen. Ich forme jeden Satz in eine formelle Variante mit Genitivpräposition um (wegen, trotz, aufgrund, angesichts, bei). Korrigiere sofort, achte streng auf Genitivendungen und erkläre Fehler kurz auf Englisch.'
        }
      ]
    },
    {
      day: 3,
      tier: 'core',
      title: 'Passiv in allen Zeiten',
      focus: 'werden + Partizip II from Präsens to Plusquamperfekt',
      tasks: [
        'Cheatsheet: Passiv — memorize the full tense table, especially Perfekt with "worden" and Modalverb + werden.',
        'Quiz: 15 verb forms in the practice hub; add every unknown Partizip II to your flashcards.',
        'Write 10 passive sentences about processes (an application, a delivery, a renovation) using at least 4 different tenses.'
      ],
      cheats: ['passiv'],
      ai: [
        {
          t: 'Passiv-Transformation',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Gib mir 12 Aktivsätze in verschiedenen Zeiten (Präsens, Präteritum, Perfekt, mit Modalverb). Ich forme jeden ins Passiv um. Korrigiere sofort — achte besonders auf "ist … worden" im Perfekt und die Endstellung von "werden" bei Modalverben. Erkläre Fehler in einem englischen Satz und zähle meine Punkte.'
        }
      ]
    },
    {
      day: 4,
      tier: 'core',
      title: 'Passiversatz & Nominalstil',
      focus: 'lässt sich, ist zu, -bar — how formal German avoids Passiv',
      tasks: [
        'Cheatsheet: Passiv — learn the four Passiversatz patterns and say each example aloud twice.',
        'Transform 10 of yesterday’s passive sentences into Passiversatz forms (lässt sich lösen, ist zu bezahlen, machbar).',
        'Read one German news article and mark every passive or Passiversatz form you find.',
        'One flashcard session (20 cards) of adjectives in the practice hub.'
      ],
      cheats: ['passiv'],
      ai: [
        {
          t: 'Passiversatz-Gym',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Trainiere mit mir Passiversatzformen: Gib mir 12 Passivsätze mit können/müssen (z. B. "Das Problem kann gelöst werden."). Ich formuliere jeden Satz dreifach um: mit "lässt sich", mit "ist zu" und — wo möglich — mit einem Adjektiv auf -bar. Korrigiere sofort und erkläre kurz auf Englisch, welche Variante im formellen Deutsch am üblichsten ist.'
        }
      ]
    },
    {
      day: 5,
      tier: 'core',
      title: 'Konjunktiv II & indirekte Rede',
      focus: 'Irreales, Höflichkeit and reported speech',
      tasks: [
        'Cheatsheet: Konjunktiv II — memorize the Gegenwart forms and the Vergangenheit pattern (hätte/wäre + Partizip II).',
        'Write 8 irreale sentences about your life (4 Gegenwart, 4 Vergangenheit: "Wenn ich das gewusst hätte, …").',
        'Take 5 quoted sentences from a news article and turn them into indirekte Rede with Konjunktiv I.',
        'One flashcard session (20 cards) of verbs.'
      ],
      cheats: ['kii'],
      ai: [
        {
          t: 'Konjunktiv-Werkstatt',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Stelle mir 12 gemischte Aufgaben: (1) irreale Bedingungssätze vervollständigen (Gegenwart UND Vergangenheit), (2) Bitten höflich mit Konjunktiv II formulieren, (3) direkte Rede in indirekte Rede mit Konjunktiv I umformen. Eine Aufgabe nach der anderen, sofortige Korrektur mit kurzer englischer Erklärung. Am Ende sagst du mir, welches der drei Muster ich wiederholen muss.'
        }
      ]
    },
    {
      day: 6,
      tier: 'core',
      title: 'Lesen I — Global- und Detailverstehen',
      focus: 'Lesen Teil 1+2 technique: 5+5 items',
      tasks: [
        'Read the Lesen tactics in the exam guide — know the item count (5+5+10) and your time budget per Teil.',
        'Read one longer German article (400+ words), first skim 90 seconds for the main idea, then read for detail.',
        'Summarize the article aloud in 6 German sentences using two Konnektoren.',
        'One flashcard session (20 cards) of nouns.'
      ],
      cheats: ['nominal'],
      ai: [
        {
          t: 'B2-Lesetraining',
          p: 'Du bist mein Prüfungstrainer für telc Deutsch B2. Schreibe einen Zeitungstext (ca. 300 Wörter, Niveau B2) über ein gesellschaftliches Thema. Stelle mir dann 5 Multiple-Choice-Fragen (a/b/c) im telc-Stil: die falschen Optionen enthalten Wörter, die im Text vorkommen. Ich antworte, du korrigierst, zitierst die Beweisstelle im Text und erklärst jede Falle kurz auf Englisch. Danach ein neuer, etwas schwererer Text.'
        }
      ]
    },
    {
      day: 7,
      tier: 'core',
      title: 'Checkpoint Woche 1',
      focus: 'Consolidate the grammar core',
      tasks: [
        'Review ALL flashcards from days 1–6 in the practice hub; delete the ones you know instantly.',
        'Re-read the Genitiv, Passiv and Konjunktiv II cheatsheets in one 30-minute sweep.',
        'Optional baseline: take the Lesen module of Modelltest 1 under timing — don’t worry about the score, it’s a reference point.'
      ],
      cheats: ['genitiv', 'passiv', 'kii'],
      ai: [
        {
          t: 'Wochen-Diagnose',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Teste in 15 gemischten Aufgaben, ob ich die Grammatik der ersten Woche beherrsche: Genitiv und Genitivpräpositionen, Passiv in allen Zeiten, Passiversatz, Konjunktiv II und indirekte Rede. Eine Aufgabe nach der anderen, sofortige Korrektur. Am Ende: eine Auswertung auf Englisch mit den zwei Themen, die ich in Woche 2 wiederholen muss.'
        }
      ]
    },
    {
      day: 8,
      tier: 'core',
      title: 'Lesen II — Zuordnung im Akkord',
      focus: 'Lesen Teil 3: 10 matching items on the clock',
      tasks: [
        'Strategy drill: for matching tasks, read the situations FIRST and underline the key need in each, then scan the ads.',
        'Quiz: 15 Verben mit Präposition in the practice hub; write one own sentence for each you missed.',
        'One flashcard session (20 cards) of nouns.'
      ],
      cheats: ['nominal'],
      ai: [
        {
          t: 'Zuordnungs-Drill',
          p: 'Du bist mein Prüfungstrainer für telc Deutsch B2. Erstelle eine Zuordnungsaufgabe im Stil von Lesen Teil 3: 5 Situationen und 8 kurze Anzeigen (a–h), Niveau B2, mit typischen Fallen (Anzeige passt fast, aber ein Detail stimmt nicht). Ich ordne zu, du korrigierst und erklärst jede Falle kurz auf Englisch. Danach eine neue Runde mit anderen Themen.'
        }
      ]
    },
    {
      day: 9,
      tier: 'core',
      title: 'Hören I — Technik',
      focus: 'Hören structure: 5+10+5, notes while listening',
      tasks: [
        'Read the Hören tactics in the exam guide — Teil 2 plays ONCE at natural speed, so read the items in the pause before it starts.',
        'Listen to a 10-minute German podcast or news episode and note WHO, WHAT, WHEN, HOW MANY while listening.',
        'Shadowing: repeat 10 sentences from the recording aloud at natural speed.',
        'One flashcard session (20 cards) of verbs.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Hörfallen-Quiz',
          p: 'Du bist mein Prüfungstrainer für telc Deutsch B2. Schreibe ein Radiointerview (ca. 250 Wörter, zwei Sprecher, Niveau B2). Zeige es mir 60 Sekunden als "Audio-Transkript", dann stelle mir 5 Richtig/Falsch-Aussagen mit typischen telc-Fallen: Korrektursignale (nicht … sondern, allerdings, stattdessen), veränderte Zahlen, plausibel-aber-nicht-gesagt. Ich antworte aus dem Gedächtnis, du erklärst jede Falle kurz auf Englisch. Dann ein neues Interview.'
        }
      ]
    },
    {
      day: 10,
      tier: 'core',
      title: 'Sprachbausteine',
      focus: 'Teil 1+2: 10+10 gaps — grammar meets register',
      tasks: [
        'Read the Sprachbausteine tactics in the exam guide: solve from BOTH sides of the gap, never leave a blank.',
        'Quiz: 15 Verben mit Präposition in the practice hub, then 15 Kasus items.',
        'Cheatsheet: Nominalisierung & Konnektoren — learn the Konnektoren table by function.',
        'One flashcard session (20 cards) of adjectives.'
      ],
      cheats: ['nominal', 'genitiv'],
      ai: [
        {
          t: 'Sprachbausteine-Maschine',
          p: 'Du bist mein Prüfungstrainer für telc Deutsch B2. Erstelle einen formellen Brief (Niveau B2) mit 10 Lücken und je 3 Optionen (a/b/c), die Genitivpräpositionen, Konnektoren, Verben mit Präposition, Passiv und Konjunktiv II testen. Nach meinen Antworten erklärst du jede Lücke in einem englischen Satz. Danach eine Teil-2-Übung: ein Text mit 10 Lücken und einer Wortbank mit 15 Wörtern. Wiederhole, bis ich 18/20 erreiche.'
        }
      ]
    },
    {
      day: 11,
      tier: 'core',
      title: 'Modelltest 1 — Standortbestimmung',
      focus: 'First full mock under real conditions',
      tasks: [
        'Take Modelltest 1 under real timing — no pausing, no dictionary, letter included.',
        'Full review afterwards: redo every wrong item aloud with the reason why the right answer is right.',
        'Add every unknown word from the test to your flashcards in the practice hub.',
        'Note your module scores against this trainer’s 60% line — this decides your focus for the next two weeks.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Fehler-Analyse',
          p: 'Du bist mein Prüfungscoach für telc Deutsch B2. Ich habe gerade einen kompletten Modelltest gemacht und schicke dir meine Fehler (Aufgaben + meine falschen Antworten + richtige Antworten). Analysiere die Muster, nenne mir auf Englisch die drei Baustellen mit dem größten Punkte-Hebel vor der Prüfung und erstelle für jede eine Mini-Übung mit 5 Aufgaben. Konkret und knapp.'
        }
      ]
    },
    {
      day: 12,
      tier: 'core',
      title: 'Die halbformelle E-Mail I — Leserbrief',
      focus: 'The 45-point letter: skeleton + Leserbrief moves',
      tasks: [
        'Cheatsheet: Die halbformelle E-Mail — memorize the skeleton (Betreff, Anrede, Einstieg, Hauptteil, Schluss, Gruß) and the Leserbrief moves.',
        'Write one Leserbrief as a halbformelle E-Mail in 30 minutes (aim for roughly 150–220 words) and self-check with the cheatsheet checklist.',
        'Collect your 10 favourite formal phrases on one sheet — these become your standard repertoire.',
        'One flashcard session (20 cards) of nouns.'
      ],
      cheats: ['brief', 'kii'],
      ai: [
        {
          t: 'E-Mail-Prüfer',
          p: 'Du bist telc-Prüfer für Deutsch B2. Gib mir eine realistische Leserbrief-Aufgabe: eine kurze Zeitungsmeldung als Anlass plus 4 Leitpunkte. Ich schreibe einen Leserbrief als halbformelle E-Mail an die Redaktion (Zielumfang etwa 150–220 Wörter). Bewerte sie nach den telc-Kriterien mit maximal 45 Punkten, prüfe streng Register (Sehr geehrte Damen und Herren, sachlich, kein Amtsdeutsch), Betreff, den Bezug auf den Artikel, Konnektoren und Konjunktiv II bei Bitten, korrigiere alle Fehler und zeige eine Musterlösung. Dann die nächste Aufgabe.'
        }
      ]
    },
    {
      day: 13,
      tier: 'core',
      title: 'Modelltest 2 & E-Mail-Feinschliff',
      focus: 'Second mock + rewrite the letter properly',
      tasks: [
        'Take Modelltest 2 under real timing.',
        'Review every mistake; pay special attention to which Sprachbausteine patterns keep costing you points.',
        'Rewrite the letter from the test once more with the cheatsheet open — fix every marked weakness.'
      ],
      cheats: ['brief'],
      ai: [
        {
          t: 'E-Mail-Vergleich',
          p: 'Du bist telc-Prüfer für Deutsch B2. Ich schicke dir zwei Versionen derselben halbformellen E-Mail (meine Prüfungsversion und meine überarbeitete Version). Vergleiche beide nach den telc-Kriterien, sage mir auf Englisch, welche konkreten Verbesserungen Punkte bringen würden, und diktiere mir die drei Formulierungen, die ich für jede künftige E-Mail auswendig lernen sollte.'
        }
      ]
    },
    {
      day: 14,
      tier: 'core',
      title: 'Die halbformelle E-Mail II & Wochenbilanz',
      focus: 'Anfrage & Bewerbung — the other two letter types',
      tasks: [
        'Cheatsheet: Die halbformelle E-Mail — learn the Anfrage and Bewerbung moves.',
        'Write one halbformelle Anfrage e-mail, timed (aim for roughly 150–220 words), and self-check with the checklist.',
        'Compare your Modelltest 1 and 2 scores per module; write down your two weakest modules.',
        'Review ALL flashcards from days 8–13. From tomorrow the extension tier deepens speaking and argumentation.'
      ],
      cheats: ['brief', 'kii'],
      ai: [
        {
          t: 'Anfrage-Prüfer',
          p: 'Du bist telc-Prüfer für Deutsch B2. Gib mir eine Anfrage-Aufgabe (z. B. an eine Sprachschule oder einen Anbieter, mit 4 Leitpunkten). Ich schreibe eine halbformelle E-Mail mit einem Zielumfang von etwa 150–220 Wörtern. Bewerte mit maximal 45 Punkten, korrigiere alles und zeige eine Musterlösung. Danach eine kurze Bewerbungs-Aufgabe als Bonus.'
        }
      ]
    },
    {
      day: 15,
      tier: 'extension',
      title: 'Argumentieren I — Konnektoren & Nominalstil',
      focus: 'The language of pro & contra',
      tasks: [
        'Cheatsheet: Nominalisierung & Konnektoren — memorize dennoch, folglich, es sei denn, sofern, zumal, hingegen with their word order.',
        'Transform 10 sentences between Verbalstil and Nominalstil using the table.',
        'Pick a debate topic (Homeoffice, E-Autos, soziale Medien) and write 5 pro and 5 contra arguments, each with a different Konnektor.',
        'One flashcard session (20 cards) of adjectives.'
      ],
      cheats: ['nominal'],
      ai: [
        {
          t: 'Konnektoren-Sparring',
          p: 'Du bist mein Deutschtrainer (Niveau B2). Gib mir 12 Satzpaare, die ich mit einem passenden Konnektor verbinden soll (dennoch, folglich, es sei denn, sofern, zumal, hingegen, indem). Achte streng auf die Verbstellung und korrigiere sofort mit kurzer englischer Erklärung. Danach: Ich schreibe 5 Argumente zu einem Thema deiner Wahl, du machst sie stilistisch eine Stufe formeller.'
        }
      ]
    },
    {
      day: 16,
      tier: 'extension',
      title: 'Über Erfahrungen sprechen üben',
      focus: 'Mündliche Prüfung Teil 1: eine eigene Erfahrung erzählen — keine Präsentation',
      tasks: [
        'Cheatsheet: Redemittel — memorize the Über-Erfahrungen-sprechen skeleton (Einstieg, Verlauf, Gefühl/Bewertung, Vergleich, Abschluss).',
        'Pick a topic you have real experience with and record yourself telling that experience — about 3 minutes, no notes, no rehearsed speech.',
        'Listen back and count your experience phrases (Bei mir war das so …, Aus meiner Erfahrung …); redo the recording once, fixing the weakest section.',
        'One flashcard session (20 cards) of nouns.'
      ],
      cheats: ['muendlich'],
      ai: [
        {
          t: 'Erfahrungs-Coach',
          p: 'Du bist mein Prüfungscoach für die mündliche telc-B2-Prüfung. Gib mir ein Thema mit den üblichen Leitfragen für Teil 1 (was ist passiert, wie hast du dich gefühlt, was würdest du heute anders machen, wie ist das in deinem Heimatland). Ich tippe meine eigene Erfahrung dazu als Text — keine Präsentation, telc B2 kennt diese Aufgabe nicht. Prüfe die Struktur (Einstieg, Verlauf, Bewertung, Abschluss), korrigiere Fehler, ersetze schwache Formulierungen durch B2-Redemittel und stelle mir danach zwei Nachfragen, wie es die Prüfer tun.'
        }
      ]
    },
    {
      day: 17,
      tier: 'extension',
      title: 'Diskussion trainieren',
      focus: 'Mündliche Prüfung Teil 2: react, don’t recite',
      tasks: [
        'Cheatsheet: Redemittel — drill the Zustimmen/Widersprechen/Einhaken phrases aloud until automatic.',
        'Record yourself arguing 2 minutes for a position you personally DISAGREE with — the exam rewards flexibility.',
        'Quiz: 15 Verben mit Präposition in the practice hub.'
      ],
      cheats: ['muendlich', 'nominal'],
      ai: [
        {
          t: 'Diskussions-Gegner',
          p: 'Du bist mein Diskussionspartner für die mündliche telc-B2-Prüfung. Wähle ein kontroverses Alltagsthema und vertritt entschieden die Gegenposition zu meiner Meinung. Diskutiere auf Deutsch mit mir, hake nach, unterbrich mich einmal höflich. Zwinge mich, Redemittel wie "Da muss ich Ihnen widersprechen" und "einerseits … andererseits" zu benutzen. Nach 10 Wortwechseln: Feedback auf Englisch — meine 5 besten Formulierungen und 5 Fehler mit Korrektur.'
        }
      ]
    },
    {
      day: 18,
      tier: 'extension',
      title: 'Modelltest 4 + Hören schärfen',
      focus: 'Third full week starts with data',
      tasks: [
        'Take Modelltest 4 under real timing (Modelltest 3 stays in reserve for a weak-module rerun).',
        'Review with extra care in Hören: for every miss, find the exact sentence in the transcript that carried the answer.',
        'Shadowing: repeat 10 sentences from the Hören texts at natural speed.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Hör-Debriefing',
          p: 'Du bist mein Prüfungscoach für telc Deutsch B2. Ich schicke dir meine Hören-Fehler aus einem Modelltest (Aufgabe, meine Antwort, richtige Antwort, ggf. Transkript-Ausschnitt). Kategorisiere die Fehler (Zahl überhört, Korrektursignal verpasst, Wort nicht gekannt, zu langsam gelesen) und gib mir für die häufigste Kategorie eine konkrete Übungsroutine für die nächsten 5 Tage — auf Englisch, knapp.'
        }
      ]
    },
    {
      day: 19,
      tier: 'extension',
      title: 'Planung & Konsens + Bewerbung',
      focus: 'Mündliche Prüfung Teil 3 + the third letter type',
      tasks: [
        'Cheatsheet: Redemittel — drill the Vorschlagen/Abwägen/Kompromiss phrases for Teil 3 aloud.',
        'Plan 2 scenarios out loud, solo, 3 minutes each (a farewell party for a colleague, a weekend trip): Vorschlag, Gegenvorschlag, Einigung.',
        'Write one halbformelle Bewerbung e-mail, timed (aim for roughly 150–220 words), and self-check with the cheatsheet.',
        'One flashcard session (20 cards) of verbs.'
      ],
      cheats: ['muendlich', 'brief'],
      ai: [
        {
          t: 'Planungs-Partner',
          p: 'Du bist mein Partner für Teil 3 der mündlichen telc-B2-Prüfung. Wir planen gemeinsam etwas (wähle: Betriebsausflug, Abschiedsfeier, Informationsstand). Mach Vorschläge, lehne einen meiner Vorschläge höflich ab und besteh auf einer Alternative, damit ich verhandeln muss. Wir müssen am Ende einen konkreten Konsens festhalten. Danach Feedback auf Englisch zu meinen Aushandlungs-Redemitteln.'
        }
      ]
    },
    {
      day: 20,
      tier: 'extension',
      title: 'Modelltest 5 + mündliche Generalprobe I',
      focus: 'Full written mock + first complete oral run',
      tasks: [
        'Take Modelltest 5 under real timing and review it fully.',
        'Do one complete oral exam in a single recording: Über Erfahrungen sprechen, then Diskussion, then Planung — about 15 minutes, no pausing.',
        'Listen back and note your 3 most repeated mistakes; write their corrections 3 times.'
      ],
      cheats: ['muendlich'],
      ai: [
        {
          t: 'Mündliche Simulation',
          p: 'Du bist telc-Prüfer für die mündliche B2-Prüfung. Führe die komplette Prüfung mit mir auf Deutsch durch: Teil 1 — ich erzähle von einer eigenen Erfahrung zu einem Thema, du stellst zwei Nachfragen. Teil 2 — wir diskutieren über einen kurzen Zeitungstext, den du mir gibst. Teil 3 — wir planen gemeinsam etwas und müssen uns einigen. Bleib bis zum Ende in der Prüferrolle, DANN bewerte mich nach den telc-Kriterien mit ausführlichem Feedback auf Englisch.'
        }
      ]
    },
    {
      day: 21,
      tier: 'extension',
      title: 'Modelltest 6 & Fehler-Klinik',
      focus: 'Turn week-3 mistakes into points',
      tasks: [
        'Take Modelltest 6 under real timing.',
        'Open the reviews of Modelltests 4–6 and redo every single wrong item aloud, with the reason why the right answer is right.',
        'Build your personal error top 10 (grammar + vocabulary) and write each correction 3 times.',
        'Review ALL flashcards from days 15–20; delete the instant ones.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Muster-Jäger',
          p: 'Du bist mein Prüfungscoach für telc Deutsch B2. Ich schicke dir gesammelte Fehler aus drei Modelltests. Gruppiere sie in Muster, sortiere die Muster nach Punktverlust und erstelle ein 12-Fragen-Quiz, das genau meine drei teuersten Muster trainiert. Stelle die Fragen einzeln, korrigiere sofort und wiederhole falsch beantwortete Fragen am Ende noch einmal.'
        }
      ]
    },
    {
      day: 22,
      tier: 'extension',
      title: 'Sprachbausteine-Meisterschaft',
      focus: 'Teil 1+2 without guessing',
      tasks: [
        'Quiz: 15 Verben mit Präposition, then 15 Kasus items in the practice hub — repeat each until 13/15 or better.',
        'Cheatsheet: Genitiv + Nominalisierung — one final sweep; write 6 sentences mixing a Genitivpräposition with a formal Konnektor.',
        'Take the Sprachbausteine module of Modelltest 3 under timing and review every gap.'
      ],
      cheats: ['genitiv', 'nominal'],
      ai: [
        {
          t: 'Lücken-Endgegner',
          p: 'Du bist mein Prüfungstrainer für telc Deutsch B2. Erstelle Sprachbausteine auf hohem B2-Niveau: ein formeller Brief mit 10 Lücken (a/b/c) und danach ein Sachtext mit 10 Lücken und einer 15-Wörter-Bank. Teste gezielt Genitivpräpositionen, zweiteilige Konnektoren, Passiversatz, Konjunktiv I und Verben mit Präposition. Erkläre nach meinen Antworten jede Lücke in einem englischen Satz. Wiederhole, bis ich zweimal hintereinander 18/20 schaffe.'
        }
      ]
    },
    {
      day: 23,
      tier: 'extension',
      title: 'Modelltest 7 — Lesen auf Zeit',
      focus: 'Timing strategy for the 20 reading items',
      tasks: [
        'Take Modelltest 7 under real timing.',
        'Analyze your Lesen timing: which Teil ate the most minutes? Fix your Teil order for exam day and write it down.',
        'Never-leave-a-blank check: count your guesses — every blank is a wasted free chance.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Tempo-Coach',
          p: 'Du bist mein Lese-Coach für telc Deutsch B2. Schreibe 5 Mini-Texte (je ca. 60 Wörter, Niveau B2) mit je EINER Frage. Ich muss alle 5 in insgesamt 4 Minuten beantworten. Danach zeigst du mir, welche Signalwörter in jedem Text die Antwort getragen haben, und gibst mir auf Englisch 3 Scanning-Techniken. Dann eine zweite, schnellere Runde.'
        }
      ]
    },
    {
      day: 24,
      tier: 'extension',
      title: 'Modelltest 8 + Hören-Bootcamp',
      focus: 'Zero points lost to speed',
      tasks: [
        'Take Modelltest 8 under real timing.',
        'Hören drill: replay every Teil-2 item you missed and pinpoint the correction signal (allerdings, stattdessen, nicht … sondern) you overheard.',
        'Shadowing: 10 sentences from the recordings at natural speed, mimicking the melody.',
        'One flashcard session (20 cards) of verbs.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Signalwort-Drill',
          p: 'Du bist mein Hörtrainer für telc Deutsch B2. Schreibe 10 kurze Dialogausschnitte (je 2–3 Sätze), in denen ein Sprecher eine Aussage macht und sie dann mit einem Korrektursignal relativiert oder umkehrt (allerdings, stattdessen, nicht … sondern, eigentlich, leider doch nicht). Ich sage dir jeweils, was am Ende wirklich gilt. Korrigiere sofort und markiere das Signalwort, das ich überhört habe.'
        }
      ]
    },
    {
      day: 25,
      tier: 'extension',
      title: 'Schreiben III — die E-Mail unter Druck',
      focus: 'Routine beats inspiration',
      tasks: [
        'Write 2 halbformelle e-mails at 30 minutes each, one Beschwerde and one Anfrage, so both registers are equally automatic (the real exam sets only one task, not a choice).',
        'Score each yourself with the cheatsheet checklist, honestly, then rewrite ONLY the weaker one.',
        'Drill your 10 standard halbformell phrases from day 12 — they must flow without thinking.'
      ],
      cheats: ['brief', 'kii'],
      ai: [
        {
          t: 'Doppel-Prüfer',
          p: 'Du bist telc-Prüfer für Deutsch B2. Gib mir eine Leserbrief-Aufgabe UND separat eine Anfrage-Aufgabe zum Üben — nicht als Wahl, im echten Test bekomme ich nur eine E-Mail-Aufgabe. Ich schreibe für jede eine halbformelle E-Mail in 30 Minuten, Zielumfang etwa 150–220 Wörter. Bewerte beide nach den telc-Kriterien mit maximal 45 Punkten, korrigiere alles und zeige je eine Musterlösung.'
        }
      ]
    },
    {
      day: 26,
      tier: 'extension',
      title: 'Modelltest 9 + mündliche Generalprobe II',
      focus: 'Both exam halves in one day',
      tasks: [
        'Take Modelltest 9 under real timing.',
        'Do the full oral simulation once more in a single recording (Über Erfahrungen sprechen, Diskussion, Planung) and compare with day 20 — what improved?',
        'Cheatsheet: Redemittel — final drill of the repair phrases: Könnten Sie das bitte noch einmal erklären? Was genau meinen Sie mit …?'
      ],
      cheats: ['muendlich'],
      ai: [
        {
          t: 'Prüfer mit Nachfragen',
          p: 'Du bist ein strenger telc-Prüfer für die mündliche B2-Prüfung. Führe die komplette Prüfung auf Deutsch mit mir durch, aber stelle diesmal in jedem Teil eine unerwartete Nachfrage, die mich zwingt, spontan zu reagieren und Reparatur-Redemittel zu benutzen. Am Ende: Bewertung nach den telc-Kriterien und ein Vergleich auf Englisch — was muss ich in den letzten Tagen noch üben?'
        }
      ]
    },
    {
      day: 27,
      tier: 'extension',
      title: 'Modelltest 10 & persönliche Top 100',
      focus: 'Last full mock + your own weak vocabulary',
      tasks: [
        'Take Modelltest 10 under real timing — this is your final full rehearsal, treat it like exam day.',
        'Review it, then sweep the practice hub: collect the 100 words you still hesitate on into a final flashcard round.',
        'Active test: speak 60 seconds each about 5 exam topics (Arbeit, Umwelt, Medien, Gesundheit, Reisen) using your top-100 words.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Wortschatz-Endspurt',
          p: 'Du bist mein Vokabeltrainer (Niveau B2). Ich schicke dir meine Liste schwieriger Wörter. Frage mich in Runden zu je 10: erst Deutsch→Englisch, dann Englisch→Deutsch, dann "Benutze es in einem Satz". Falsche Wörter kommen nach 3 Fragen wieder (Spaced Repetition). Bei Nomen bestehst du auf Artikel UND Plural, bei Verben auf der Präposition mit Kasus. Stopp, wenn ich zweimal hintereinander 90 Prozent erreiche.'
        }
      ]
    },
    {
      day: 28,
      tier: 'extension',
      title: 'Generalprobe light & Schlachtplan',
      focus: 'Peak, don’t cram',
      tasks: [
        'Re-read ALL six cheatsheets once, slowly (45 min) — mark the 5 things you still need on a single sheet of paper.',
        'Say your Über-Erfahrungen-sprechen opening, your Kompromiss phrases and your 5 favourite Konjunktiv-II Bitten aloud — they must be automatic.',
        'Check your Modelltest scores on the dashboard against both of this trainer’s 60% lines, decide which single module gets your last review evening — then close the books and rest.'
      ],
      cheats: ['brief', 'muendlich', 'kii', 'nominal'],
      ai: [
        {
          t: 'Finaler Strategie-Talk',
          p: 'Du bist mein Prüfungscoach für telc Deutsch B2. Interviewe mich auf Englisch: meine Modelltest-Ergebnisse pro Modul, mein schwächstes Modul, mein Prüfungstermin. Erstelle dann meinen Schlachtplan für die letzten Tage: was ich am Vorabend wiederhole, meine Teil-Reihenfolge im Lesen, meine E-Mail-Strategie (Register und Struktur sofort parat haben) und ein realistisches Punktziel pro Modul für beide 60-Prozent-Marken, mit denen mein Trainer rechnet. Konkret und ermutigend, kein Geschwafel.'
        }
      ]
    }
  ]
};
