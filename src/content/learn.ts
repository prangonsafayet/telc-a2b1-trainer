import { type LearnPlan } from '@shared/types/learn.ts';

/* The 14-day study plan, its cheatsheets and the copy-paste AI tutor prompts.
   `intro` and every `cheatsheets[].html` are authored HTML and are injected; all other
   strings are plain text and are rendered as text. */
export const LEARN = {
  intro: `You have a <b>2-week learning phase</b> before mock-exam season. Work through one day per box below (60–90 min/day).
  Each day = focused study + a cheatsheet + an <b>AI practice session</b>: copy the prompt into Claude (or any AI chat) and it becomes your personal tutor, speaking partner or corrector.
  After Day 14, switch to the Dashboard and take the mock exams — roughly one per day, easiest first, reviewing every mistake.`,

  cheatsheets: {
    cases: {
      title: 'Cases & articles (der/die/das)',
      html: `<table class="history"><tr><th></th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td><b>Nominativ</b> (subject)</td><td>der / ein</td><td>die / eine</td><td>das / ein</td><td>die / –</td></tr>
<tr><td><b>Akkusativ</b> (direct object)</td><td><b>den / einen</b></td><td>die / eine</td><td>das / ein</td><td>die / –</td></tr>
<tr><td><b>Dativ</b> (indirect object)</td><td><b>dem / einem</b></td><td><b>der / einer</b></td><td><b>dem / einem</b></td><td><b>den …n</b></td></tr></table>
<p><b>Always Akkusativ after:</b> für, ohne, gegen, um, durch, bis.<br>
<b>Always Dativ after:</b> mit, nach, aus, zu, von, bei, seit, gegenüber.<br>
<b>Wechselpräpositionen</b> (in, an, auf, über, unter, vor, hinter, neben, zwischen): Wohin? → Akkusativ (Ich gehe <i>in die</i> Schule). Wo? → Dativ (Ich bin <i>in der</i> Schule).</p>
<p><b>Personal pronouns:</b> ich→mich/mir · du→dich/dir · er→ihn/ihm · sie→sie/ihr · es→es/ihm · wir→uns/uns · ihr→euch/euch · sie/Sie→sie/ihnen (Akk/Dat).</p>`
    },
    verbs: {
      title: 'Verbs: present, Perfekt, Präteritum',
      html: `<p><b>Present endings:</b> ich -e · du -st · er/sie/es -t · wir -en · ihr -t · sie/Sie -en. Vowel change verbs: fahren→du fährst, essen→du isst, sprechen→du sprichst, nehmen→du nimmst, lesen→du liest, schlafen→du schläfst.</p>
<p><b>Perfekt = haben/sein + Partizip II.</b> <b>sein</b> for movement/change: gegangen, gefahren, gekommen, geflogen, aufgestanden, geblieben, passiert, gewesen. Everything else: <b>haben</b>.</p>
<p><b>Key participles:</b> gemacht, gekauft, gearbeitet, gelernt · gesehen, gegessen, getrunken, gelesen, geschrieben, gesprochen, genommen, gefunden, geholfen, getroffen · angerufen, eingekauft, ferngesehen (separable: ge- goes inside) · besucht, bekommen, erzählt, verstanden (no ge- for be-/er-/ver-…) · telefoniert, studiert (no ge- for -ieren).</p>
<p><b>Präteritum you MUST know:</b> ich war / du warst / er war / wir waren · ich hatte / er hatte / wir hatten · es gab · ich wollte, konnte, musste, durfte, sollte.</p>
<p><b>Höflichkeit (Konjunktiv II):</b> ich würde gern… · Könnten Sie…? · Ich hätte gern… · Das wäre schön.</p>`
    },
    connectors: {
      title: 'Connectors & word order',
      html: `<p><b>Position 0 (no change):</b> und, aber, oder, denn, sondern → "Ich komme, <b>aber</b> ich bin spät."</p>
<p><b>Verb to the END (Nebensatz):</b> weil, dass, wenn, als, obwohl, damit, bis, seit → "Ich lerne Deutsch, <b>weil</b> ich in Berlin <b>wohne</b>."</p>
<p><b>Verb directly after (inversion):</b> deshalb, deswegen, trotzdem, dann, danach, außerdem → "Es regnet, <b>deshalb bleibe</b> ich zu Hause."</p>
<p><b>Time before place:</b> "Ich fahre <i>am Montag</i> <i>nach Berlin</i>." · <b>Verb always position 2</b> in main clauses: "Am Montag <b>fahre</b> ich…"</p>
<p><b>B1 bonus pairs:</b> zwar … aber · nicht nur … sondern auch · entweder … oder · je … desto.</p>`
    },
    writing: {
      title: 'Writing template (the 60-point email)',
      html: `<p><b>Fixed skeleton — memorize it:</b></p>
<p>1. <b>Anrede:</b> Liebe Anna, / Lieber Tom, (friend) · Sehr geehrte Frau X, / Sehr geehrter Herr Y, (formal)<br>
2. <b>Einstieg:</b> danke für deine E-Mail! / vielen Dank für Ihre Nachricht. Ich freue mich sehr!<br>
3. <b>Punkt 1–3</b> — one or two sentences each. Useful moves:<br>
&nbsp;&nbsp;· zusagen: Das passt gut. / Ich komme gern.<br>
&nbsp;&nbsp;· absagen: Leider kann ich nicht kommen, weil …<br>
&nbsp;&nbsp;· vorschlagen: Wir können uns um … treffen. / Wie wäre es mit …?<br>
&nbsp;&nbsp;· bitten: Kannst du bitte … mitbringen? / Könnten Sie mir bitte … schicken?<br>
&nbsp;&nbsp;· informieren: Ich möchte dir sagen, dass …<br>
4. <b>Schluss:</b> Ich freue mich auf deine Antwort! / Bis Samstag!<br>
5. <b>Gruß:</b> Liebe Grüße / Viele Grüße / Mit freundlichen Grüßen + name</p>
<p><b>Checklist (2 min):</b> all 3 points? verb in position 2? nouns capitalized? du/dich/dein consistent (or Sie/Ihnen/Ihr)? greeting + sign-off present?</p>`
    },
    speaking: {
      title: 'Speaking Redemittel (all 3 parts)',
      html: `<p><b>Teil 1 — your script:</b> Ich heiße … und bin … Jahre alt. Ich komme aus … und wohne seit … in … Ich bin verheiratet / ledig und habe … Kinder. Ich arbeite als … / Ich bin … von Beruf. Ich spreche …, … und ein bisschen Deutsch. In meiner Freizeit … ich gern … — <i>Drill this until automatic.</i></p>
<p><b>Teil 2 — opinions:</b> Ich finde, dass … · Ich glaube / Ich denke, … · Meiner Meinung nach … · Bei uns in … ist das so: … · Zum Beispiel … · Und wie ist das bei dir? · Da stimme ich dir zu. · Das sehe ich anders, weil …</p>
<p><b>Teil 3 — planning:</b> Wollen wir …? · Wie wäre es mit …? · Hast du eine Idee? · Das ist eine gute Idee! · Einverstanden! · Vielleicht lieber …, weil … · Wer bringt … mit? · Ich kann … kaufen. · Gut, dann machen wir das so!</p>
<p><b>Repair phrases (gold on exam day):</b> Wie bitte? · Können Sie das bitte wiederholen? · Wie sagt man …? · Einen Moment, bitte. · Ich meine …</p>`
    },
    listening: {
      title: 'Listening survival: numbers, times, spelling',
      html: `<p><b>Clock traps:</b> halb zehn = <b>9:30</b> (not 10:30!) · Viertel nach acht = 8:15 · Viertel vor sieben = 6:45 · zwanzig nach drei = 3:20 · kurz vor/nach … </p>
<p><b>Number traps:</b> vierzehn (14) vs. vierzig (40) — listen for -zehn vs. -zig · zweiundzwanzig = 22 (units FIRST) · Telefonnummern come in pairs or single digits — write instantly.</p>
<p><b>Dates:</b> am zweiten Mai, am dritten, am siebten, am zwanzigsten · Ordinals: erste, zweite, dritte, siebte, achte.</p>
<p><b>Correction signal words</b> (the answer changes!): nicht … sondern · leider · doch nicht · stattdessen · Achtung, eine Änderung.</p>
<p><b>Spelling alphabet rhythm:</b> practice hearing double letters ("Doppel-s"), Umlaute ("A-Umlaut = Ä") and ß ("Eszett").</p>`
    },
    vocab: {
      title: 'Theme vocabulary (the 10 exam fields)',
      html: `<p><b>Familie & Alltag:</b> der Ehemann, die Ehefrau, die Geschwister, der Enkel, aufstehen, sich treffen, der Haushalt, gemeinsam.</p>
<p><b>Einkaufen & Essen:</b> das Angebot, günstig/teuer, die Rechnung, bestellen, bezahlen, das Gericht, schmecken, die Lieferung.</p>
<p><b>Wohnen:</b> die Miete, der Vermieter, der Nachbar, umziehen, die Nebenkosten, renovieren, der Stock/die Etage, kündigen.</p>
<p><b>Arbeit:</b> die Stelle, sich bewerben, der Lebenslauf, das Vorstellungsgespräch, die Schicht, der Feierabend, verdienen, der Kollege.</p>
<p><b>Gesundheit:</b> der Termin, die Praxis, das Rezept, die Versichertenkarte, wehtun, sich erkälten, die Apotheke, das Medikament.</p>
<p><b>Reisen & Verkehr:</b> die Verspätung, das Gleis, umsteigen, die Auskunft, der Stau, die Umleitung, buchen, die Unterkunft.</p>
<p><b>Lernen:</b> die Prüfung, bestehen/durchfallen, die Note, üben, der Unterricht, die Volkshochschule, sich anmelden, das Zeugnis.</p>
<p><b>Freizeit & Medien:</b> der Verein, die Ausstellung, die Veranstaltung, kostenlos, die Nachrichten, das Angebot, teilnehmen, stattfinden.</p>
<p><b>Umwelt & Stadt:</b> die Umwelt, der Müll, trennen, sparen, das Klima, öffentliche Verkehrsmittel, die Baustelle, der Bürgersteig.</p>
<p><b>Feste & Pläne:</b> die Einladung, feiern, das Geschenk, die Hochzeit, vorhaben, planen, verschieben, absagen/zusagen.</p>`
    },
    modal: {
      title: 'Modal verbs & separable verbs',
      html: `<p><b>Modals push the infinitive to the END:</b> "Ich <b>muss</b> heute lange <b>arbeiten</b>."</p>
<p>können (ability) · müssen (necessity) · dürfen (permission) · wollen (want) · sollen (advice/duty) · möchten (polite want) · <b>nicht müssen</b> = don't have to · <b>nicht dürfen</b> = forbidden!</p>
<p><b>Separable verbs</b> (prefix goes to the end): anrufen → Ich rufe dich an. · einkaufen, aufstehen, abholen, mitbringen, ankommen, ausfüllen, zumachen, vorbereiten, stattfinden.<br>
With modal: Ich muss dich <b>anrufen</b>. · Perfekt: Ich habe dich <b>angerufen</b>.</p>`
    },
    nebensaetze: {
      title: 'Relativsätze & Nebensätze II',
      html: `<p><b>Relativpronomen = fast wie der/die/das:</b></p>
<table class="history"><tr><th></th><th>Maskulin</th><th>Feminin</th><th>Neutrum</th><th>Plural</th></tr>
<tr><td><b>Nominativ</b></td><td>der</td><td>die</td><td>das</td><td>die</td></tr>
<tr><td><b>Akkusativ</b></td><td><b>den</b></td><td>die</td><td>das</td><td>die</td></tr>
<tr><td><b>Dativ</b></td><td>dem</td><td>der</td><td>dem</td><td><b>denen</b></td></tr></table>
<p>Das ist der Mann, <b>der</b> nebenan wohnt (er wohnt → Nominativ). · Das ist der Mann, <b>den</b> ich kenne (ich kenne ihn → Akkusativ). · Die Freunde, <b>mit denen</b> ich lerne … (Präposition zuerst!).</p>
<p><b>wo & was:</b> Das ist die Stadt, <b>wo</b> ich wohne. · Alles, <b>was</b> ich brauche.</p>
<p><b>Indirekte Fragen (Verb ans Ende):</b> Ich weiß nicht, <b>ob</b> er kommt. · Können Sie mir sagen, <b>wann</b> der Kurs beginnt? · Sie fragt, <b>warum</b> das so lange dauert.</p>
<p><b>als vs. wenn (Vergangenheit):</b> <b>als</b> = einmalig (Als ich nach Deutschland kam, …) · <b>wenn</b> = immer wieder (Immer wenn ich Zeit hatte, …).</p>`
    },
    passivkii: {
      title: 'Passiv & Konjunktiv II',
      html: `<p><b>Passiv = werden + Partizip II.</b> Wichtig, wenn der Täter egal ist:</p>
<p>Präsens: Das Formular <b>wird</b> online <b>ausgefüllt</b>. · Die Wohnung <b>wird</b> renoviert.<br>
Präteritum: Das Haus <b>wurde</b> 1950 <b>gebaut</b>. · Ich <b>wurde</b> zum Gespräch <b>eingeladen</b>.<br>
Mit Modalverb: Der Antrag <b>muss</b> unterschrieben <b>werden</b>.</p>
<p><b>Alltags-Alternative mit man:</b> Man spricht hier Deutsch. = Hier wird Deutsch gesprochen.</p>
<p><b>Konjunktiv II — die 5, die Sie brauchen:</b> ich <b>wäre</b> · ich <b>hätte</b> · ich <b>könnte</b> · ich <b>müsste</b> · ich <b>würde</b> + Infinitiv.</p>
<p><b>Höflichkeit:</b> Könnten Sie mir helfen? · Ich hätte gern einen Termin. · Wären Sie so nett, …?<br>
<b>Irreale Bedingungen (B1-Bonuspunkte!):</b> <b>Wenn</b> ich mehr Zeit <b>hätte</b>, <b>würde</b> ich jeden Tag lernen. · <b>Wenn</b> ich du <b>wäre</b>, <b>würde</b> ich den Kurs machen. · An deiner Stelle <b>würde</b> ich sofort anrufen.</p>`
    },
    verbpraep: {
      title: 'Verben mit Präpositionen',
      html: `<p><b>Mit Akkusativ:</b> warten <b>auf</b> · sich freuen <b>auf</b> (Zukunft!) / <b>über</b> (jetzt!) · denken <b>an</b> · sich erinnern <b>an</b> · sich interessieren <b>für</b> · danken <b>für</b> · sich bewerben <b>um</b> · sich kümmern <b>um</b> · bitten <b>um</b> · sich ärgern <b>über</b> · sprechen/diskutieren <b>über</b> · sich beschweren <b>über</b>.</p>
<p><b>Mit Dativ:</b> anfangen/aufhören <b>mit</b> · sich treffen <b>mit</b> · träumen <b>von</b> · erzählen <b>von</b> · fragen <b>nach</b> · suchen <b>nach</b> · teilnehmen <b>an</b> · Angst haben <b>vor</b> · gehören <b>zu</b> · passen <b>zu</b>.</p>
<p><b>Merksatz-Paare:</b> Ich freue mich <b>auf den</b> Urlaub (kommt noch) · Ich freue mich <b>über das</b> Geschenk (ist da).</p>
<p><b>da(r)- und wo(r)-Wörter:</b> Wartest du auf den Bus? — Ja, ich warte <b>darauf</b>. · <b>Worauf</b> wartest du? · Ich ärgere mich <b>darüber</b>, dass … (dar- vor Vokal: darauf, darüber, daran).</p>`
    },
    formal: {
      title: 'Formelle Briefe & E-Mails',
      html: `<p><b>Das formelle Skelett (Sie-Form!):</b></p>
<p>1. <b>Anrede:</b> Sehr geehrte Damen und Herren, / Sehr geehrte Frau Weber, / Sehr geehrter Herr Braun,<br>
2. <b>Einstieg — warum schreiben Sie?</b> Ich schreibe Ihnen, weil … · Vielen Dank für Ihre E-Mail vom … · Ich habe Ihre Anzeige gelesen und …<br>
3. <b>Anliegen — höflich mit Konjunktiv II:</b> Ich möchte Sie bitten, … · Könnten Sie mir mitteilen, ob/wann …? · Wäre es möglich, den Termin zu verschieben? · Leider muss ich den Termin absagen, weil …<br>
4. <b>Beschwerde-Bausteine:</b> Leider musste ich feststellen, dass … · Das Gerät funktioniert nicht richtig. · Ich bitte Sie, das Problem bis … zu lösen. · Ich erwarte Ihre Antwort bis …<br>
5. <b>Schluss:</b> Ich wäre Ihnen für eine schnelle Antwort dankbar. · Vielen Dank im Voraus! · Ich freue mich auf Ihre Antwort.<br>
6. <b>Gruß:</b> Mit freundlichen Grüßen + voller Name (kein "LG"!)</p>
<p><b>Formelle Konnektoren:</b> deshalb · daher · außerdem · allerdings · bezüglich (+ Genitiv) · trotzdem.</p>
<p><b>Checkliste:</b> Überall Sie/Ihnen/Ihr groß? Keine Umgangssprache (super, echt, kriegen → erhalten)? Betreff kurz und klar?</p>`
    }
  },

  days: [
    {
      day: 1,
      tier: 'core',
      title: 'Baseline & the exam map',
      focus: 'Know the enemy',
      tasks: [
        'Read the whole Exam Guide tab (15 min) — know every module and its point value.',
        'Cheatsheet: Cases & articles — read it, then write 10 own sentences using mit/für/in.',
        'Learn your Teil-1 speaking introduction by heart (write it down, say it aloud 5×).'
      ],
      cheats: ['cases', 'speaking'],
      ai: [
        {
          t: 'Placement chat',
          p: 'You are a friendly German tutor. My level is early A2 and I am preparing for the telc Deutsch A2·B1 exam. Have a simple German conversation with me about my day (short sentences). After every message I send, correct my mistakes briefly in English, then continue the conversation in German. Start now.'
        }
      ]
    },
    {
      day: 2,
      tier: 'core',
      title: 'Reading I — ads & matching',
      focus: 'Lesen Teil 1+3 tactics',
      tasks: [
        'Re-read the Lesen tactics in the Exam Guide.',
        'Cheatsheet: Theme vocabulary — study fields 1–5, make flashcards for 20 unknown words.',
        'Practice scanning: give yourself 60 seconds per ad-matching situation.'
      ],
      cheats: ['vocab'],
      ai: [
        {
          t: 'Ad-matching drill',
          p: 'Create a telc A2-B1 style reading exercise: 5 short situations and 8 German classified ads (a-h), A2 level. I must match them. Wait for my answers, then correct me and explain the trap in each wrong distractor. Then make another round, slightly harder.'
        }
      ]
    },
    {
      day: 3,
      tier: 'core',
      title: 'Grammar I — cases & prepositions',
      focus: 'Sprachbausteine foundation',
      tasks: [
        'Cheatsheet: Cases & articles — memorize the two preposition lists (Akk/Dat).',
        'Cheatsheet: Modal & separable verbs — write 8 sentences with modals.',
        'Do 20 self-made gap sentences: mit ___ Bus, für ___ Kind, etc.'
      ],
      cheats: ['cases', 'modal'],
      ai: [
        {
          t: 'Gap-fill trainer',
          p: 'Quiz me with telc-style Sprachbausteine: a short German letter (A2 level) with 6 gaps and 3 options each (a/b/c), testing cases, prepositions and verb endings. After my answers, explain each briefly in English. Repeat with a new letter until I get 6/6 twice.'
        }
      ]
    },
    {
      day: 4,
      tier: 'core',
      title: 'Listening I — numbers & announcements',
      focus: 'Hören Teil 1+2',
      tasks: [
        'Cheatsheet: Listening survival — master the clock traps (halb zehn!).',
        'Listen to 10 minutes of slow German news (e.g. Nachrichten in einfacher Sprache).',
        'Dictation drill: have someone/AI read 10 times & prices, write them as digits.'
      ],
      cheats: ['listening'],
      ai: [
        {
          t: 'Numbers dictation',
          p: "You are my German listening trainer. Write 10 German sentences containing times, dates, prices or platform numbers written out as words (like 'halb zehn', 'vierzehn Euro neunzig'). I will 'translate' each into digits. Check my answers, then give 10 more, faster/trickier (Viertel vor, kurz nach, -zehn vs -zig)."
        }
      ]
    },
    {
      day: 5,
      tier: 'core',
      title: 'Writing I — the template',
      focus: 'Schreiben skeleton',
      tasks: [
        'Cheatsheet: Writing template — memorize the 5-step skeleton and greetings.',
        'Write 2 emails (40–60 words): accept an invitation + ask a question; cancel an appointment + suggest new time.',
        'Time yourself: 10 minutes per email, like the real exam.'
      ],
      cheats: ['writing'],
      ai: [
        {
          t: 'Email corrector',
          p: 'I will write a short German email (telc A2-B1 writing task: reply covering 3 content points, 40-60 words). Give me a realistic task first (an incoming email + 3 points). Then score my reply like a telc examiner out of 60 (content points, comprehensibility, vocabulary, grammar), correct every mistake, and show an improved model version. Then give me the next task.'
        }
      ]
    },
    {
      day: 6,
      tier: 'core',
      title: 'Speaking I — introduction & opinions',
      focus: 'Sprechen Teil 1+2',
      tasks: [
        'Cheatsheet: Speaking Redemittel — learn the Teil 2 opinion phrases.',
        'Record yourself doing your Teil-1 introduction (90 sec) — listen and fix one thing.',
        'Speak 2 minutes each about: Einkaufen, Familie, Wetter (use a timer).'
      ],
      cheats: ['speaking'],
      ai: [
        {
          t: 'Speaking partner (Teil 2)',
          p: 'Act as my telc A2-B1 speaking partner. Pick an everyday topic (like shopping, weather, family). Ask me 4 guiding questions one by one, in simple German. React to my answers like a conversation partner, ask one follow-up each time. At the end, list my 5 most important mistakes and better phrases I could have used.'
        }
      ]
    },
    {
      day: 7,
      tier: 'core',
      title: 'Checkpoint week 1',
      focus: 'Consolidate',
      tasks: [
        'Review ALL flashcards from days 1–6.',
        'Cheatsheet: Connectors — learn the three word-order groups (und / weil / deshalb).',
        "Optional reality check: take Modelltest 1 (easy) on the Dashboard — don't worry about the result, it's a baseline."
      ],
      cheats: ['connectors'],
      ai: [
        {
          t: 'Weak-point analysis',
          p: 'Interview me in English about what felt hardest in my first week of telc A2-B1 prep (reading, listening, writing, speaking, grammar). Then build me a concrete 30-minute daily micro-plan for week 2 targeting my two weakest areas, using free resources.'
        }
      ]
    },
    {
      day: 8,
      tier: 'core',
      title: 'Grammar II — Perfekt & word order',
      focus: 'Talking about the past',
      tasks: [
        "Cheatsheet: Verbs — memorize the 'sein' Perfekt list and 15 key participles.",
        'Write 10 sentences about yesterday (Perfekt) + 5 with war/hatte.',
        'Connectors drill: join sentence pairs with weil, deshalb, aber, dass — mind the verb position.'
      ],
      cheats: ['verbs', 'connectors'],
      ai: [
        {
          t: 'Past-tense chat',
          p: 'Have a German conversation with me strictly about last weekend, so I must use Perfekt and war/hatte. My level is A2. Correct every verb-form and word-order mistake immediately (brief English note), then continue. After 10 exchanges, summarize my error patterns.'
        }
      ]
    },
    {
      day: 9,
      tier: 'core',
      title: 'Reading II — long texts & richtig/falsch',
      focus: 'Lesen Teil 2+4',
      tasks: [
        'Re-read Teil 2/Teil 4 tactics; remember: not stated = falsch.',
        'Cheatsheet: Theme vocabulary — fields 6–10, 20 new flashcards.',
        'Read one longer easy-German article; write 3 richtig/falsch statements about it yourself (thinking like the examiner teaches you the traps).'
      ],
      cheats: ['vocab'],
      ai: [
        {
          t: 'Trap-maker',
          p: 'Write a German text (about 200 words, A2-B1 level) about everyday life, then 5 richtig/falsch statements with typical telc traps (changed numbers, wrong person, negation, plausible-but-not-stated). I answer; you reveal and explain each trap. Repeat with a new text.'
        }
      ]
    },
    {
      day: 10,
      tier: 'core',
      title: 'Listening II — dialogues & note-taking',
      focus: 'Hören Teil 3+5',
      tasks: [
        'Practice Teil 5 style: listen to any German voicemail/dialogue and note WHO, WHEN, WHAT, NUMBER.',
        'Cheatsheet: Listening survival — re-test yourself on all clock/number traps.',
        'Shadowing: repeat 10 sentences from a slow German podcast out loud.'
      ],
      cheats: ['listening'],
      ai: [
        {
          t: 'Voicemail drill',
          p: "Write a German answering-machine message (60-80 words, A2-B1, numbers as words) containing: a caller name, a weekday, a time, and one thing to bring. Show it to me for 45 seconds as 'audio transcript', then hide-style quiz me: 4 note-gaps to fill from memory. Check, then next message."
        }
      ]
    },
    {
      day: 11,
      tier: 'core',
      title: 'Writing II — every point type',
      focus: 'Schreiben variations',
      tasks: [
        'Write 3 emails (10 min each): invite someone; apologize + explain; ask for information.',
        'Self-check each with the template checklist (all points? verb position 2? capitals?).',
        'Collect your personal top-5 mistakes and write their corrections 3 times.'
      ],
      cheats: ['writing'],
      ai: [
        {
          t: 'Examiner mode',
          p: 'Give me three telc A2-B1 writing tasks, one at a time (incoming email + 3 content points). I answer in 40-60 words. Grade each out of 60 with the telc criteria, list mistakes, show a model answer. Track whether my score improves across the three.'
        }
      ]
    },
    {
      day: 12,
      tier: 'core',
      title: 'Speaking II — planning together',
      focus: 'Sprechen Teil 3',
      tasks: [
        'Cheatsheet: Speaking Redemittel — drill the Teil 3 planning phrases aloud.',
        'Plan 3 things out loud, solo, 3 minutes each: a birthday party, a picnic, a visit to a sick friend (Wann? Wo? Was? Wer?).',
        'Practice repair phrases: Wie bitte? Können Sie das wiederholen?'
      ],
      cheats: ['speaking'],
      ai: [
        {
          t: 'Planning partner (Teil 3)',
          p: 'Simulate telc A2-B1 speaking part 3: we plan something together (you choose: party, trip, dinner for a colleague). Speak simple German, make suggestions, sometimes disagree politely so I must react. Push me to cover when/where/what/who brings what and reach a final agreement. Afterwards: feedback on my interaction phrases.'
        }
      ]
    },
    {
      day: 13,
      tier: 'core',
      title: 'Grammar III — B1 boosters',
      focus: 'The 70%+ structures',
      tasks: [
        'Cheatsheet: Verbs — Konjunktiv II politeness (würde/könnte/hätte/wäre) — 8 own sentences.',
        'Learn 5 B1 connectors: obwohl, trotzdem, damit, als, zwar…aber — one sentence each.',
        'Review ALL cheatsheets once (30 min sweep).'
      ],
      cheats: ['verbs', 'connectors', 'modal'],
      ai: [
        {
          t: 'Level-up drill',
          p: 'Test whether I control B1 structures for telc A2-B1: give me 12 transformation tasks (e.g. join with obwohl, make it polite with Konjunktiv II, passive voice basics, relative clause). One at a time, correct immediately. End with a score and the 3 structures I must review.'
        }
      ]
    },
    {
      day: 14,
      tier: 'core',
      title: 'Dress rehearsal & switch to mocks',
      focus: 'Full-format day',
      tasks: [
        'Say your Teil-1 introduction once — still automatic?',
        'Take Modelltest 1 or 2 on the Dashboard under REAL conditions (timer, no pausing, no dictionary).',
        'Review every mistake in the review screen; add unknown words to flashcards. From tomorrow: one mock exam per day, easier → harder, always with full review.'
      ],
      cheats: ['writing', 'speaking', 'listening'],
      ai: [
        {
          t: 'Error debrief',
          p: 'I just took a full telc A2-B1 mock exam. I will paste my mistakes (questions + my wrong answers + correct answers). Analyze the patterns, tell me the 3 highest-impact things to fix before my exam, and create a mini-exercise for each. Be concrete and brief.'
        }
      ]
    },
    {
      day: 15,
      tier: 'extension',
      title: 'Reading II — detail comprehension',
      focus: 'Lesen Teil 2+4 at B1 speed',
      tasks: [
        'Re-read the Teil 2/4 tactics; this week the texts get longer — budget 90 seconds of skimming BEFORE reading the questions.',
        'Cheatsheet: Theme vocabulary — fields 6–10, 20 new flashcards from words you still miss.',
        'Read one full-length easy-German article (300+ words) and summarize it out loud in 5 German sentences.'
      ],
      cheats: ['vocab'],
      ai: [
        {
          t: 'B1 text grinder',
          p: 'Write a German text of about 250 words at B1 level (a magazine-style portrait or report about everyday life). Then give me 3 multiple-choice questions (a/b/c) AND 5 richtig/falsch statements with realistic telc traps. I answer; you correct with short English explanations and quote the sentence in the text that proves each answer. Then a new text, slightly harder.'
        }
      ]
    },
    {
      day: 16,
      tier: 'extension',
      title: 'Grammar upgrade I — Relativsätze & Nebensätze',
      focus: 'The B1 sentence machine',
      tasks: [
        'Cheatsheet: Relativsätze & Nebensätze II — learn the pronoun table, especially den/dem/denen.',
        'Write 12 own sentences: 6 relative clauses (2 with Präposition: mit dem, in der …), 6 indirect questions (ob/wann/warum).',
        'Transformation drill: join 10 sentence pairs from your notes into one sentence each.'
      ],
      cheats: ['nebensaetze', 'connectors'],
      ai: [
        {
          t: 'Clause builder',
          p: 'Train me on German relative clauses and indirect questions at B1 level (telc Deutsch A2·B1). Give me two short sentences at a time (like "Das ist der Kollege. Ich arbeite mit ihm.") and I combine them into one sentence. Correct each answer immediately, explain the case of the relative pronoun in one English sentence, and count my score out of 12. Mix in 3 indirect questions (Ich weiß nicht, ob …).'
        }
      ]
    },
    {
      day: 17,
      tier: 'extension',
      title: 'Listening II — interviews & note-taking',
      focus: 'Hören Teil 4+5 under pressure',
      tasks: [
        'Listen to one slow-German interview or podcast episode (10 min) and note WHO, WHAT, WHEN, HOW MANY while listening.',
        'Cheatsheet: Listening survival — re-test every clock and number trap; write 10 dictated numbers as digits.',
        'Replay one Teil-5 style voicemail from a mock exam you already took and fill the note sheet again from memory.'
      ],
      cheats: ['listening'],
      ai: [
        {
          t: 'Interview simulator',
          p: 'Write a German radio interview (about 200 words, B1 level, two speakers: Moderator and a guest with an interesting hobby or job). Show it to me for 60 seconds as the "audio transcript", then hide-style quiz me with 4 a/b/c questions where the wrong options are words that DID appear in the text. Reveal, explain each trap in English, then a new interview.'
        }
      ]
    },
    {
      day: 18,
      tier: 'extension',
      title: 'Writing II — the formal register',
      focus: 'Sie-Briefe: Anfrage & Beschwerde',
      tasks: [
        'Cheatsheet: Formelle Briefe & E-Mails — memorize the skeleton and the Konjunktiv-II request phrases.',
        'Write 2 formal emails (10 min each): request an appointment change at an office; complain about a broken product and demand a solution.',
        'Underline every du/dich in your drafts — in a Sie-letter there must be ZERO.'
      ],
      cheats: ['formal', 'writing'],
      ai: [
        {
          t: 'Formal examiner',
          p: 'Give me a telc A2·B1 writing task with a FORMAL context (an email from a landlord, a company or an office + 3 content points). I reply in 40–60 words using the Sie-form. Grade me out of 60 like a telc examiner, check especially the register (no du, no slang, correct greeting "Sehr geehrte…" and closing), correct all mistakes, show a model answer. Then the next formal task.'
        }
      ]
    },
    {
      day: 19,
      tier: 'extension',
      title: 'Grammar upgrade II — Passiv & Konjunktiv II',
      focus: 'The structures that impress examiners',
      tasks: [
        'Cheatsheet: Passiv & Konjunktiv II — learn both Passiv forms and the 5 Konjunktiv-II verbs.',
        'Write 8 Passiv sentences about processes you know (Das Brot wird gebacken …) + 6 irreale Wenn-Sätze about your life.',
        'Say 5 polite requests out loud (Könnten Sie …? Wäre es möglich …?) until they come automatically.'
      ],
      cheats: ['passivkii'],
      ai: [
        {
          t: 'Transformation gym',
          p: 'Drill me on German Passiv and Konjunktiv II at B1 level. Give me 12 tasks one at a time, mixed: (1) rewrite an active sentence in Passiv, (2) make a request polite with Konjunktiv II, (3) complete an unreal condition ("Wenn ich reich wäre, …"). Correct instantly with a one-line English explanation. Finish with my score and the pattern I got wrong most.'
        }
      ]
    },
    {
      day: 20,
      tier: 'extension',
      title: 'Speaking II — opinions with structure',
      focus: 'Sprechen Teil 2 at B1 level',
      tasks: [
        'Cheatsheet: Speaking Redemittel — upgrade your opinions: einerseits … andererseits, Vor- und Nachteile, im Vergleich zu.',
        'Record yourself speaking 3 minutes about "Leben in der Stadt oder auf dem Land?" using at least 4 B1 connectors — listen back and count them.',
        'Prepare 2 sentences of personal experience for 5 common topics (Arbeit, Medien, Feste, Reisen, Essen) — examiners love examples.'
      ],
      cheats: ['speaking'],
      ai: [
        {
          t: 'Opinion sparring partner',
          p: 'Act as my telc A2·B1 speaking partner for Teil 2. Pick a topic (city vs countryside, homemade vs restaurant food, online vs offline shopping). Ask my opinion in simple German, then politely DISAGREE with me so I must defend my view. Push me to use "einerseits/andererseits", "im Vergleich zu" and an example from my life. After 8 exchanges, give feedback: my 5 best phrases and 5 mistakes with corrections.'
        }
      ]
    },
    {
      day: 21,
      tier: 'extension',
      title: 'Error clinic I',
      focus: 'Turn mistakes into points',
      tasks: [
        'Open your last mock-exam reviews and redo every single item you got wrong — out loud, with the reason why the right answer is right.',
        'Build your personal error top-10 list (grammar + vocabulary) and write each correction 3 times.',
        'Review ALL flashcards from days 15–20; delete the ones you know instantly.'
      ],
      cheats: [],
      ai: [
        {
          t: 'Error debrief II',
          p: 'I will paste mistakes from my recent telc A2·B1 practice (questions, my wrong answers, correct answers). Group them into patterns, rank the 3 patterns that cost me the most points, and create a 10-question mini-quiz that targets exactly those patterns. Quiz me one question at a time and correct immediately.'
        }
      ]
    },
    {
      day: 22,
      tier: 'extension',
      title: 'Sprachbausteine mastery',
      focus: 'Teil 1+2 without guessing',
      tasks: [
        'Cheatsheet: Verben mit Präpositionen — learn all pairs with their case; write 10 own sentences.',
        'Learn the da(r)-/wo(r)- rule and write 6 mini-dialogues (Worauf wartest du? — Darauf …).',
        'Gap tactics drill: in any German text, cover one word per sentence and predict it from left AND right context.'
      ],
      cheats: ['verbpraep', 'cases'],
      ai: [
        {
          t: 'Sprachbausteine machine',
          p: 'Create a telc A2·B1 Sprachbausteine exercise at B1 level: a short formal letter with 6 gaps and 3 options each, testing relative pronouns, verbs with prepositions, Konjunktiv II and connectors. After my answers, explain each gap in one English sentence. Then a Teil-2 style exercise: a text with 6 gaps and a 12-word bank. Repeat until I score 11/12 or better.'
        }
      ]
    },
    {
      day: 23,
      tier: 'extension',
      title: 'Reading III — the full module on the clock',
      focus: 'Strategy: 45 minutes, 20 items',
      tasks: [
        'Take ONE full Lesen module from a mock exam on the Dashboard (module practice), strictly timed: 45 minutes.',
        'Afterwards analyze your timing: which Teil ate the most minutes? Plan your order for the real exam (many start with Teil 3).',
        'Never-leave-a-blank check: count your guesses — every blank is a wasted free chance.'
      ],
      cheats: ['vocab'],
      ai: [
        {
          t: 'Speed-reading coach',
          p: 'Train my exam reading strategy for telc A2·B1. Write 5 German mini-texts (50 words each, B1) and for each ONE question. I have to answer all 5 in 4 minutes total — time me by counting my messages. Afterwards, show me which signal words in each text carried the answer, and teach me 3 scanning tricks in English. Then a second, faster round.'
        }
      ]
    },
    {
      day: 24,
      tier: 'extension',
      title: 'Listening III — numbers bootcamp',
      focus: 'Zero points lost on digits',
      tasks: [
        'Dictation marathon: 20 times, dates, prices and phone numbers — written as digits, checked, repeated until 20/20.',
        'Cheatsheet: Listening survival — drill the correction signals (nicht … sondern, leider, stattdessen); they flip answers in Teil 1+3.',
        'Shadowing: repeat 10 sentences from a German podcast at natural speed, mimicking the melody.'
      ],
      cheats: ['listening'],
      ai: [
        {
          t: 'Numbers at full speed',
          p: 'Dictate German numbers in words for me to convert to digits: mix times (Viertel vor acht, halb zehn), dates (am einundzwanzigsten März), prices (neunundneunzig Cent) and phone numbers in pairs. 10 per round, get faster and meaner each round (vierzehn vs vierzig!). Correct me instantly. After 3 rounds, list every trap I fell into.'
        }
      ]
    },
    {
      day: 25,
      tier: 'extension',
      title: 'Writing III — three timed emails',
      focus: 'Routine beats inspiration',
      tasks: [
        'Write 3 emails at 10 minutes each: one private (du), one half-formal invitation reply, one formal complaint (Sie).',
        'Score each yourself with the 4 telc criteria (Inhalt, Verständlichkeit, Wortschatz, Korrektheit) — honestly.',
        'Rewrite ONLY your weakest email once more, fixing every marked mistake.'
      ],
      cheats: ['writing', 'formal'],
      ai: [
        {
          t: 'Triple-task examiner',
          p: 'Give me three telc A2·B1 writing tasks in a row: (1) informal (a friend, du-form), (2) half-formal (a course teacher), (3) formal (a company, Sie-form). I answer each in 40–60 words. Grade each out of 60 with the telc criteria, compare the three results, and tell me which register I control worst and exactly how to fix it.'
        }
      ]
    },
    {
      day: 26,
      tier: 'extension',
      title: 'Speaking III — full simulation',
      focus: 'All three Teile in one run',
      tasks: [
        'Do a complete 15-minute oral exam in one recording: Vorstellung, then a Teil-2 topic, then a Teil-3 planning task — no pausing.',
        'Listen back and rate yourself with the 4 criteria; write down your 3 most repeated mistakes.',
        'Drill your repair phrases one more time: Wie bitte? Können Sie das wiederholen? Ich meine …'
      ],
      cheats: ['speaking'],
      ai: [
        {
          t: 'Full oral exam',
          p: 'Simulate the complete telc A2·B1 oral exam with me in German. Part 1: ask me to introduce myself, then ask 2 follow-up questions. Part 2: give me a topic and 4 guiding questions, discuss with me. Part 3: we plan something together — make suggestions, disagree once, reach an agreement. Stay in the examiner role until the end, THEN break character and grade me out of 60 with detailed feedback in English.'
        }
      ]
    },
    {
      day: 27,
      tier: 'extension',
      title: 'Vocabulary consolidation',
      focus: 'Your personal top 100',
      tasks: [
        'Cheatsheet: Theme vocabulary — final sweep through all 10 fields; collect the 100 words YOU still hesitate on.',
        'Sort your top 100 into: verbs with prepositions / nouns with article+plural / phrases — learn them in these chunks.',
        'Active test: for each of the 10 fields, speak 60 seconds using at least 5 field words.'
      ],
      cheats: ['vocab', 'verbpraep'],
      ai: [
        {
          t: 'Spaced quiz master',
          p: 'I will paste my personal list of difficult German words. Quiz me in rounds of 10: German→English first, then English→German, then use-it-in-a-sentence. Words I get wrong come back after 3 questions (spaced repetition). Track my percentage per round and stop when I reach 90 percent twice in a row.'
        }
      ]
    },
    {
      day: 28,
      tier: 'extension',
      title: 'Generalprobe & battle plan',
      focus: 'Peak, don’t cram',
      tasks: [
        'Re-read ALL cheatsheets once, slowly (45 min) — mark the 5 things you still need on a single sheet of paper.',
        'Say your Teil-1 introduction and your 5 polite Konjunktiv-II phrases out loud — they must be automatic.',
        'Plan your mock-exam phase on the Dashboard: which test on which day, always with a full review afterwards. Then close the books and rest.'
      ],
      cheats: ['writing', 'speaking', 'listening', 'formal'],
      ai: [
        {
          t: 'Final strategy talk',
          p: 'Interview me in English about my telc A2·B1 preparation: my mock-exam scores per skill, my weakest module, my exam date. Then build my final-phase battle plan: which mock exams to take on which remaining days, what to review the evening before, and a realistic point target per module for the grade I want. Be concrete and encouraging, no fluff.'
        }
      ]
    }
  ]
} satisfies LearnPlan;
