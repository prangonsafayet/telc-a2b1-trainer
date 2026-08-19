import { type Exam } from '@shared/types';

const exam = {
  id: 14,
  title: "Modelltest 14",
  difficulty: "b1",
  level: "B1 · Prüfungsnah",
  theme: "Behörden, Termine & Papiere",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie sind umgezogen und müssen sich innerhalb von zwei Wochen ummelden.",
        "Sie brauchen für eine Bewerbung schnell eine beglaubigte Übersetzung Ihrer Zeugnisse.",
        "Sie verstehen einen Brief vom Amt nicht und suchen kostenlose Hilfe bei Formularen.",
        "Ihr Reisepass läuft bald ab, und Sie brauchen neue biometrische Fotos.",
        "Sie möchten Ihre Steuererklärung nicht allein machen und suchen günstige Unterstützung."
      ],
      ads: [
        "Fotostudio Blende: Biometrische Passbilder für Ausweis und Reisepass in zehn Minuten – digital und gedruckt. Ohne Termin, direkt am Marktplatz.",
        "Lohnsteuerhilfe Nord e. V.: Wir erstellen Ihre Steuererklärung – günstig für Mitglieder, schon ab 60 Euro im Jahr. Jetzt Beratungstermin vereinbaren!",
        "Reisebüro Sonnenklar: Last-Minute in den Süden! Eine Woche Türkei ab 399 Euro inklusive Flug. Beratung täglich 10–19 Uhr.",
        "Bürgerbüro Mitte: An- und Ummeldung, Ausweise, Führungszeugnisse. Online-Termine unter www.stadt.de/termin – zurzeit auch viele kurzfristige Termine frei.",
        "Übersetzungsbüro Lingua: Beglaubigte Übersetzungen von Zeugnissen und Urkunden in über 30 Sprachen – Expressservice in 24 Stunden möglich.",
        "Copyshop Print & Go: Drucken, kopieren, scannen und binden. Bewerbungsmappen in Top-Qualität, Mo–Sa 8–20 Uhr.",
        "Migrationsberatung der Caritas: Wir helfen Ihnen kostenlos bei Briefen von Behörden und beim Ausfüllen von Anträgen. Offene Sprechstunde: Di und Do 9–12 Uhr.",
        "Fahrschule Startklar: Führerschein in acht Wochen! Theorieunterricht auch auf Englisch und Arabisch. Jetzt anmelden und Erstberatung sichern."
      ],
      answers: [3, 4, 6, 0, 1]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Der neue Termin-Service des Bürgerbüros",
          text: "Lange Schlangen vor dem Bürgerbüro sollen der Vergangenheit angehören: Termine werden jetzt bequem über die Website der Stadt gebucht. Nach der Buchung erhalten Sie eine Bestätigungs-E-Mail mit einem QR-Code und einer Liste aller Unterlagen, die Sie mitbringen müssen. Kommen Sie bitte höchstens fünf Minuten vor Ihrem Termin – so bleibt der Wartebereich leer. Wer keinen Termin hat, kann trotzdem kommen: Morgens ab acht Uhr wird eine begrenzte Zahl von Wartemarken ausgegeben, erfahrungsgemäß sind sie schnell vergriffen. Wichtig: Können Sie einen Termin nicht wahrnehmen, sagen Sie ihn bitte spätestens 24 Stunden vorher online ab, damit andere nachrücken können."
        },
        {
          titel: "Integrationskurse: Was Sie wissen müssen",
          text: "Der Integrationskurs besteht aus zwei Teilen: einem Sprachkurs mit 600 Stunden und einem Orientierungskurs mit 100 Stunden, in dem es um Politik, Geschichte und Alltag in Deutschland geht. Am Ende stehen zwei Prüfungen: der Deutsch-Test für Zuwanderer (Ziel: Niveau B1) und der Test \"Leben in Deutschland\". Die Teilnahme kostet normalerweise die Hälfte der Kursgebühren; wer bestimmte Leistungen bezieht, kann sich von den Kosten befreien lassen. Die Anmeldung läuft über zugelassene Sprachschulen – bringen Sie dazu Ihren Berechtigungsschein mit. Und falls es beim ersten Mal nicht klappt: Wer die B1-Prüfung nicht besteht, kann einmalig 300 Stunden kostenlos wiederholen."
        }
      ],
      questions: [
        { textIndex: 0, frage: "Wie bucht man einen Termin im Bürgerbüro?", options: ["Online über die Website der Stadt.", "Nur telefonisch.", "Nur persönlich am Schalter."], answer: 0 },
        { textIndex: 0, frage: "Was soll man zum Termin mitbringen?", options: ["Nur den QR-Code.", "Die Unterlagen aus der Bestätigungs-E-Mail.", "Nichts, alles liegt im Amt bereit."], answer: 1 },
        { textIndex: 0, frage: "Was gilt für Besucher ohne Termin?", options: ["Sie werden sofort bedient.", "Sie können gar nicht bedient werden.", "Es gibt morgens eine begrenzte Zahl von Wartemarken."], answer: 2 },
        { textIndex: 1, frage: "Woraus besteht der Integrationskurs?", options: ["Aus Sprachkurs und Orientierungskurs.", "Nur aus einem Test.", "Aus einem Praktikum in einer Firma."], answer: 0 },
        { textIndex: 1, frage: "Was gilt, wenn man die B1-Prüfung nicht besteht?", options: ["Man darf sie nie wiederholen.", "Man kann einmalig 300 Stunden kostenlos wiederholen.", "Man muss den ganzen Kurs noch einmal bezahlen."], answer: 1 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Sehr geehrte Frau Petrova, Ihr neuer Aufenthaltstitel ist fertig und kann ab Montag abgeholt werden. Bitte bringen Sie Ihren Reisepass und 100 Euro in bar mit. Ausländerbehörde, Zimmer 214",
        "Hallo Schatz, denk dran: Morgen um 9:30 Uhr haben wir den Termin beim Standesamt wegen der Hochzeitspapiere. Ich hole dich um 9 Uhr ab. Kuss, Deniz",
        "Sehr geehrter Herr Okon, leider fehlt in Ihrem Antrag noch die Kopie Ihres Mietvertrags. Bitte reichen Sie diese bis zum 30. September nach, sonst können wir den Antrag nicht bearbeiten. Ihre Wohngeldstelle",
        "Hi Leyla, super Neuigkeit: Ich habe den Einbürgerungstest bestanden – 32 von 33 Punkten! Jetzt fehlt nur noch der Termin für die Urkunde. Das müssen wir feiern! Amir",
        "Liebe Kundinnen und Kunden, unsere Filiale bleibt am Freitag wegen eines Feiertags geschlossen. Überweisungen erledigen Sie bequem online oder am Automaten. Am Montag sind wir wieder für Sie da. Ihre Sparkasse"
      ],
      headlines: [
        "Ein Dokument fehlt noch",
        "Test bestanden",
        "Antrag wurde abgelehnt",
        "Dokument kann abgeholt werden",
        "Bank am Freitag geschlossen",
        "Termin wurde verschoben",
        "Erinnerung an einen Termin",
        "Hochzeit fällt aus"
      ],
      answers: [3, 6, 0, 1, 4]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Endlich Deutsche: Aminas langer Weg zur Einbürgerung",
      text: "Als Amina Rahmani den Brief mit dem Stadtwappen öffnet, zittern ihre Hände. Neun Jahre hat sie auf diesen Moment gewartet: Die Einbürgerung ist genehmigt. \"Ich habe erst gelacht und dann geweint\", erzählt die 34-Jährige, die als Krankenpflegerin in einem Klinikum arbeitet.\n\n2016 kam Amina nach Deutschland, lernte die Sprache, machte ihre Ausbildung. Für den Antrag musste sie vieles nachweisen: ihr Einkommen, ihre Sprachkenntnisse und den bestandenen Einbürgerungstest – 33 Fragen zu Politik, Geschichte und Gesellschaft, von denen sie 30 richtig beantwortete. \"Der Test war der leichteste Teil\", sagt sie lachend. \"Das Warten war das Schwerste.\" Weil so viele Menschen gleichzeitig einen Antrag gestellt hatten, dauerte die Bearbeitung am Ende vierzehn Monate.\n\nDie Einbürgerungsfeier fand im großen Saal des Rathauses statt – zusammen mit achtzig anderen neuen Deutschen aus über dreißig Ländern. Die Bürgermeisterin überreichte jedem persönlich die Urkunde. \"In diesem Moment habe ich gedacht: Jetzt gehöre ich wirklich dazu\", erinnert sich Amina.\n\nWas sich für sie ändert? \"Vieles ist praktischer – reisen, arbeiten, planen. Aber am wichtigsten ist mir etwas anderes: Bei der nächsten Wahl darf ich zum ersten Mal wählen. Darauf freue ich mich am meisten.\"",
      statements: [
        { text: "Amina lebt seit ungefähr neun Jahren in Deutschland.", answer: true },
        { text: "Amina arbeitet als Lehrerin an einer Schule.", answer: false },
        { text: "Auf die Entscheidung musste sie länger als ein Jahr warten.", answer: true },
        { text: "Bei der Feier im Rathaus war Amina die einzige neue Deutsche.", answer: false },
        { text: "Amina freut sich darauf, zum ersten Mal wählen zu dürfen.", answer: true }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Sehr geehrte Frau Winkler,\n\nvielen Dank für Ihren Brief vom 12. April. Sie haben mir einen Termin am 5. Mai um 8:30 Uhr gegeben. Leider kann ich zu dieser Zeit nicht kommen, [1] ich an diesem Morgen eine wichtige Prüfung habe. Ich möchte Sie deshalb bitten, mir einen neuen Termin zu [2]. Ab dem 6. Mai [3] ich jederzeit kommen. Zu meinem Antrag habe ich noch eine Frage: In Ihrem Brief steht, dass eine Kopie meines Arbeitsvertrags [4] wird. Diesen Vertrag bekomme ich aber erst Ende Mai. Wäre es möglich, ihn später [5]? Ich wäre Ihnen [6] eine kurze Antwort sehr dankbar.\n\nMit freundlichen Grüßen\nHassan Alavi",
      gaps: [
        { options: ["obwohl", "damit", "weil"], answer: 2 },
        { options: ["gegeben", "gibt", "geben"], answer: 2 },
        { options: ["könnte", "könnten", "konnte"], answer: 0 },
        { options: ["benötigen", "benötigt", "benötigte"], answer: 1 },
        { options: ["nachzureichen", "nachreichen", "nachgereicht"], answer: 0 },
        { options: ["für", "über", "um"], answer: 0 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe Neubürgerinnen und Neubürger,\n\nherzlich willkommen in unserer Stadt! Denken Sie bitte daran, sich innerhalb von zwei Wochen nach dem Einzug [1]. Bringen Sie dazu Ihren Ausweis und die [2] Ihres Vermieters mit – dieses Formular heißt Wohnungsgeberbestätigung. Ohne Termin müssen Sie mit längeren [3] rechnen; buchen Sie deshalb am besten online. Die Anmeldung selbst ist [4]. Danach bekommen Sie automatisch Post: Nach etwa zwei Wochen erhalten Sie Ihre neue Steuer-ID per [5]. Auf unserer Website finden Sie außerdem eine [6] mit den wichtigsten Informationen in acht Sprachen.\n\nIhr Einwohnermeldeamt",
      wordBank: ["Wartezeiten", "anzumelden", "Bestätigung", "kostenlos", "Brief", "Broschüre", "teuer", "Nachbarn", "abmelden", "Telefon", "Antworten", "Schlüssel"],
      answers: [1, 2, 0, 3, 4, 5]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Guten Tag, ich möchte mich ummelden. Ich bin letzte Woche umgezogen.\"", options: ["Gern. Haben Sie die Wohnungsgeberbestätigung dabei?", "Umzüge sind immer sehr anstrengend.", "Die neue Wohnung ist bestimmt schön."], answer: 0 },
        { prompt: "\"Ihr Antrag ist leider noch nicht vollständig.\"", options: ["Vielen Dank, dann ist ja alles fertig.", "Was fehlt denn noch? Ich reiche es sofort nach.", "Ich stelle grundsätzlich keine Anträge."], answer: 1 },
        { prompt: "\"Haben Sie einen Termin?\"", options: ["Termine finde ich generell unpraktisch.", "Nein, das Wetter ist heute schlecht.", "Ja, um 10:15 Uhr – hier ist meine Bestätigung."], answer: 2 },
        { prompt: "\"Sie müssen dieses Formular noch unterschreiben.\"", options: ["Natürlich. Haben Sie einen Stift für mich?", "Meine Unterschrift ist sehr schwer zu lesen.", "Formulare finde ich langweilig."], answer: 0 },
        { prompt: "\"Kann ich die Gebühr auch mit Karte bezahlen?\"", options: ["Karten spielen wir hier nicht.", "Ja, das Lesegerät ist gleich hier vorne.", "Die Gebühren sind seit Januar höher."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Sehr geehrte Besucherinnen und Besucher, bitte beachten Sie: Die Kfz-Zulassungsstelle finden Sie seit dem ersten März nicht mehr im Erdgeschoss, sondern im Neubau hinter dem Hauptgebäude. Folgen Sie einfach den gelben Schildern.",
          statement: "Die Zulassungsstelle ist jetzt im Neubau.",
          answer: true
        },
        {
          audio: "Guten Tag, hier spricht das Bürgertelefon der Stadt. Alle Leitungen sind zurzeit belegt. Bitte bleiben Sie dran – oder nutzen Sie unseren Rückrufservice: Drücken Sie die Eins, und wir rufen Sie innerhalb von zwei Stunden zurück.",
          statement: "Wer die Eins drückt, wird innerhalb von zwei Stunden zurückgerufen.",
          answer: true
        },
        {
          audio: "Achtung, eine Information für alle Wartenden: Wegen eines Wasserschadens schließt das Amt für Ausbildungsförderung heute bereits um zwölf Uhr. Bereits vereinbarte Termine am Nachmittag werden verschoben – Sie werden schriftlich informiert.",
          statement: "Das Amt schließt heute erst am Abend.",
          answer: false
        },
        {
          audio: "Liebe Fahrgäste, für das neue Abo-Ticket benötigen Sie ein Kundenkonto und ein digitales Passfoto. Das Ticket gilt dann ab dem ersten Tag des nächsten Monats. Alle Informationen finden Sie in unserer App und am Serviceschalter.",
          statement: "Das Abo-Ticket gilt sofort ab dem Kauf.",
          answer: false
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Servicehinweis: Das Bürgerbüro erweitert seine Öffnungszeiten. Ab April hat es jeden Donnerstag bis zwanzig Uhr geöffnet – speziell für alle, die tagsüber arbeiten. Termine für den Donnerstagabend können ab sofort online gebucht werden.",
          frage: "Für wen ist das neue Angebot besonders gedacht?",
          options: ["Für Berufstätige.", "Für Studierende.", "Für Familien mit Kindern."],
          answer: 0
        },
        {
          audio: "Eine Meldung aus dem Rathaus: Wer einen neuen Personalausweis beantragt, kann das Passfoto ab sofort direkt im Amt machen lassen. Der Fotoautomat steht im Wartebereich, die Nutzung kostet sechs Euro. Mitgebrachte Papierfotos werden aus Sicherheitsgründen nicht mehr akzeptiert.",
          frage: "Was gilt jetzt für Passfotos?",
          options: ["Man muss sie zu Hause ausdrucken.", "Man kann sie am Automaten im Amt machen.", "Papierfotos sind weiterhin erlaubt."],
          answer: 1
        },
        {
          audio: "Radio-Service: Am Samstag findet im Kulturzentrum ein Informationstag zum Thema Rente statt. Fachleute der Rentenversicherung beantworten von zehn bis sechzehn Uhr kostenlos Ihre Fragen. Bringen Sie Ihre Unterlagen mit – dann kann direkt in Ihre Akte geschaut werden.",
          frage: "Was kostet die Beratung am Informationstag?",
          options: ["Sechs Euro.", "Zehn Euro pro Frage.", "Nichts."],
          answer: 2
        },
        {
          audio: "Wichtige Information des Standesamts: Wegen der großen Nachfrage gibt es für Trauungen im Sommer nur noch wenige freie Termine. Paare, die dieses Jahr heiraten möchten, sollten sich spätestens drei Monate vorher anmelden. Möglich ist die Anmeldung frühestens sechs Monate vor dem Wunschtermin.",
          frage: "Wann soll man sich spätestens für eine Trauung anmelden?",
          options: ["Drei Monate vorher.", "Sechs Monate vorher.", "Eine Woche vorher."],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Kundin", text: "Guten Tag, ich brauche für meinen neuen Job ein Führungszeugnis. Kann ich das hier beantragen?" },
            { speaker: "Mitarbeiter", text: "Ja, gern – oder bequem online. Es kostet dreizehn Euro und kommt dann per Post zu Ihnen, das dauert ungefähr zwei Wochen." },
            { speaker: "Kundin", text: "Zwei Wochen? Gut, das reicht noch. Dann beantrage ich es gleich hier." }
          ],
          statement: "Das Führungszeugnis wird mit der Post geschickt.",
          answer: true
        },
        {
          audio: [
            { speaker: "Sofia", text: "Ivan, du siehst gestresst aus. Was ist los?" },
            { speaker: "Ivan", text: "Ich habe gestern meinen Termin bei der Ausländerbehörde verpasst – mein Bus ist einfach ausgefallen!" },
            { speaker: "Sofia", text: "Oje! Hast du schon angerufen und es erklärt?" },
            { speaker: "Ivan", text: "Ja, heute Morgen sofort. Die Frau war zum Glück nett – ich habe schon einen neuen Termin, nächsten Dienstag um neun." }
          ],
          statement: "Ivan hat noch keinen neuen Termin bekommen.",
          answer: false
        },
        {
          audio: [
            { speaker: "Vater", text: "Guten Tag, ich möchte meine Tochter für einen Kita-Platz anmelden. Geht das telefonisch?" },
            { speaker: "Mitarbeiterin", text: "Leider nein – die Anmeldung läuft komplett über das Online-Portal der Stadt, bis Ende Januar. Aber Sie können uns gern vorher besichtigen: jeden ersten Montag im Monat um neun Uhr." },
            { speaker: "Vater", text: "Ah, verstehe. Dann melde ich sie heute Abend online an und komme am Montag zur Besichtigung." }
          ],
          statement: "Der Vater kann seine Tochter direkt am Telefon anmelden.",
          answer: false
        },
        {
          audio: [
            { speaker: "Lena", text: "Sag mal, bis wann muss man eigentlich die Steuererklärung abgeben? Ende Juli, oder?" },
            { speaker: "Markus", text: "Wenn du sie selbst machst, ja. Aber ich habe es gerade nachgelesen: Mit einem Steuerberater oder der Lohnsteuerhilfe hast du deutlich länger Zeit." },
            { speaker: "Lena", text: "Wirklich? Das ist gut zu wissen – dann gehe ich dieses Jahr zur Lohnsteuerhilfe." }
          ],
          statement: "Mit einem Steuerberater hat man mehr Zeit für die Steuererklärung.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderatorin", text: "Herzlich willkommen! Unser Gast heute ist Yusuf Demir. Er arbeitet ehrenamtlich als Integrationslotse. Herr Demir, wie sind Sie zu dieser Aufgabe gekommen?" },
        { speaker: "Yusuf Demir", text: "Ich bin 2015 selbst nach Deutschland gekommen und weiß noch genau, wie es sich anfühlt, wenn man einen Behördenbrief dreimal liest und trotzdem nichts versteht. Als mein Deutsch gut genug war, wollte ich genau dabei helfen." },
        { speaker: "Moderatorin", text: "Was machen Sie als Integrationslotse konkret?" },
        { speaker: "Yusuf Demir", text: "Ich begleite Menschen zu ihren Terminen beim Amt, übersetze, erkläre Formulare. Oft geht es auch einfach darum, die Angst zu nehmen – ein Amt ist kein Gegner, die meisten Mitarbeiter wollen wirklich helfen." },
        { speaker: "Moderatorin", text: "Haben Sie einen Tipp für unsere Hörerinnen und Hörer?" },
        { speaker: "Yusuf Demir", text: "Den wichtigsten überhaupt: Öffnen Sie jeden Brief vom Amt sofort und achten Sie auf die Fristen! Wer ein Datum verpasst, macht sich das Leben unnötig schwer. Lieber gleich anrufen und um Hilfe bitten, als den Brief in die Schublade zu legen." },
        { speaker: "Moderatorin", text: "Und was gibt Ihnen die Arbeit persönlich?" },
        { speaker: "Yusuf Demir", text: "Das Schönste ist, wenn Menschen, die ich früher begleitet habe, heute selbst anderen helfen. Eine Frau, mit der ich vor Jahren beim Jobcenter war, ist jetzt selbst Lotsin. Das macht mich wirklich stolz." }
      ],
      questions: [
        { frage: "Warum ist Herr Demir Integrationslotse geworden?", options: ["Er kennt die Probleme aus eigener Erfahrung.", "Er verdient damit viel Geld.", "Das Amt hat ihn dazu verpflichtet."], answer: 0 },
        { frage: "Was macht Herr Demir konkret?", options: ["Er arbeitet als Anwalt.", "Er begleitet Menschen zu Behördenterminen.", "Er stellt Ausweise aus."], answer: 1 },
        { frage: "Was ist sein wichtigster Tipp?", options: ["Briefe erst am Wochenende lesen.", "Unangenehme Briefe ignorieren.", "Briefe sofort öffnen und Fristen beachten."], answer: 2 },
        { frage: "Worüber freut sich Herr Demir besonders?", options: ["Wenn Menschen, denen er half, später selbst anderen helfen.", "Über Geschenke von den Ämtern.", "Wenn Termine ausfallen."], answer: 0 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, Herr Kowalczyk, hier spricht Frau Neubauer vom Bürgerbüro der Stadt. Ihr Termin am Dienstag muss leider verschoben werden, weil unsere Kollegin krank ist. Ihr neuer Termin ist am Freitag um elf Uhr fünfzehn, im Zimmer zweihundertdrei im zweiten Stock. Bitte bringen Sie Ihren Reisepass und die Meldebescheinigung mit. Wenn der neue Termin nicht passt, rufen Sie uns bitte an: null drei null, vier vier acht acht. Vielen Dank und auf Wiederhören!",
      noteTitle: "Notiz: Anruf vom Bürgerbüro",
      gaps: [
        { label: "Es ruft an: Frau ____", answer: "Neubauer", alt: [] },
        { label: "Neuer Termin: Freitag um ____ Uhr", answer: "11:15", alt: ["11.15", "elf Uhr fünfzehn", "1115"] },
        { label: "Zimmer: ____ (2. Stock)", answer: "203", alt: ["zweihundertdrei"] },
        { label: "Mitbringen: Reisepass und ____", answer: "Meldebescheinigung", alt: ["die Meldebescheinigung"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Das Bürgerbüro hat Ihnen einen Termin zur Ummeldung bestätigt, aber Sie können an diesem Tag nicht.",
    incomingEmail: {
      von: "termine@stadt-neustadt.de",
      betreff: "Ihr Termin am 12. März",
      text: "Guten Tag,\n\nhiermit bestätigen wir Ihren Termin zur Ummeldung am 12. März um 8:00 Uhr im Bürgerbüro Mitte. Bitte bringen Sie Ihren Ausweis und die Wohnungsgeberbestätigung mit. Falls Sie den Termin nicht wahrnehmen können, informieren Sie uns bitte rechtzeitig und nennen Sie uns Ihre Wunschzeiten für einen Ersatztermin.\n\nMit freundlichen Grüßen\nIhr Bürgerbüro"
    },
    points: [
      "Sagen Sie den Termin ab und nennen Sie den Grund.",
      "Schlagen Sie zwei neue Wunschzeiten vor.",
      "Stellen Sie eine Frage zu den Dokumenten, die Sie mitbringen sollen."
    ],
    musterloesung: "Sehr geehrte Damen und Herren,\n\nvielen Dank für die Bestätigung. Leider muss ich den Termin am 12. März absagen, weil ich an diesem Vormittag arbeiten muss. Wäre stattdessen ein Termin am 14. März nach 14 Uhr oder am 19. März vormittags möglich? Außerdem eine Frage: Reicht eine Kopie der Wohnungsgeberbestätigung, oder brauchen Sie das Original?\n\nMit freundlichen Grüßen",
    tipps: "A formal letter to an office: \"Sehr geehrte Damen und Herren\" and \"Mit freundlichen Grüßen\" are obligatory. Show B1 range with Konjunktiv II (\"Wäre ... möglich?\") and an alternative question (\"..., oder brauchen Sie das Original?\")."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Ich heiße ... – schön, Sie kennenzulernen.",
        "Ich bin ... und komme aus ...",
        "Im Moment wohne ich mit ... in ...",
        "Beruflich bin ich ... / Ich mache gerade ...",
        "Ich spreche ... Sprachen: ...",
        "In meiner Freizeit ... ich am liebsten ...",
        "Später möchte ich gern ..."
      ]
    },
    teil2: {
      thema: "Termine und Pünktlichkeit",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Wie organisieren Sie Ihre Termine – mit dem Handy oder auf Papier?",
        "Sind Sie ein pünktlicher Mensch? Erzählen Sie.",
        "Wie wichtig ist Pünktlichkeit in Ihrem Heimatland?",
        "Was machen Sie, wenn Sie einen wichtigen Termin nicht schaffen?"
      ],
      redemittel: [
        "Meine Termine organisiere ich meistens mit ...",
        "Ehrlich gesagt bin ich ... pünktlich, weil ...",
        "Bei uns ist es normal, dass ...",
        "Im Vergleich dazu ist es in Deutschland ...",
        "Wenn ich es nicht schaffe, würde ich ..."
      ]
    },
    teil3: {
      aufgabe: "Ein Freund aus Ihrem Deutschkurs ist neu in der Stadt und muss vieles erledigen: Anmeldung, Bankkonto, Arzt. Planen Sie zusammen, wie Sie ihm helfen.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Was muss er zuerst erledigen?", "Wer begleitet ihn wohin?", "Welche Dokumente braucht er?", "Wann treffen Sie sich?"],
      redemittel: [
        "Am wichtigsten ist zuerst ..., weil ...",
        "Ich könnte mit ihm zu ... gehen, und du ...",
        "Gute Idee – aber vergiss nicht, dass ...",
        "Er braucht auf jeden Fall ...",
        "Dann treffen wir uns also am ..."
      ]
    }
  }
} as const satisfies Exam;

export default exam;
