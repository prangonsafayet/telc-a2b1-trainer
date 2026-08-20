import { type TelcExam } from '@shared/types';

const exam = {
  id: 6,
  level: 'b1',
  title: 'Modelltest 6',
  theme: 'Ausbildung & Lernen',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Immer mehr Erwachsene holen den Schulabschluss nach',
        'Handwerk sucht dringend Auszubildende',
        'Neue Mensa an der Universität eröffnet',
        'Studie: Musik hilft beim Vokabellernen',
        'Bibliothek verlängert Öffnungszeiten für die Prüfungszeit',
        'Schüler protestieren gegen Unterrichtsausfall',
        'Kostenlose Nachhilfe von Studenten für Schulkinder',
        'Sprachreisen: Lernen am Strand wird immer beliebter',
        'Erste Schule ohne Noten startet in Bremen',
        'Abendgymnasium feiert fünfzigsten Geburtstag'
      ],
      texts: [
        'Bäcker, Friseure, Elektriker: Viele Betriebe in der Region finden keine Auszubildenden mehr. Allein im letzten Jahr blieben über zweihundert Lehrstellen unbesetzt. Die Handwerkskammer wirbt deshalb jetzt an Schulen und auf Ausbildungsmessen für ihre Berufe. „Wer heute eine Lehre im Handwerk beginnt, hat beste Zukunftschancen“, sagt ihr Sprecher. Auch die Bezahlung sei besser als ihr Ruf.',
        'Mathe, Deutsch oder Englisch: Im Stadtteilzentrum Nord bekommen Schulkinder jetzt jeden Nachmittag kostenlose Hilfe bei den Hausaufgaben. Möglich machen das dreißig Studentinnen und Studenten der Universität, die ehrenamtlich arbeiten. „Viele Familien können sich private Nachhilfe nicht leisten. Da wollen wir helfen“, sagt einer der Helfer. Eine Anmeldung ist nötig, denn die Plätze sind begehrt.',
        'Vokabeln singen statt pauken? Forscher der Universität Graz haben untersucht, wie Erwachsene fremde Wörter am besten behalten. Das Ergebnis: Wer neue Wörter zu einer einfachen Melodie hört und mitsingt, erinnert sich später deutlich besser an sie als Lernende, die dieselben Wörter nur lesen. Die Wissenschaftler empfehlen deshalb, Musik gezielt im Sprachunterricht einzusetzen.',
        'Den Schulabschluss nachholen — dafür ist es nie zu spät. Die Zahl der Erwachsenen, die dafür Abendschulen und Kollegs besuchen, ist im letzten Jahr erneut gestiegen. Die meisten sind zwischen 25 und 40 Jahre alt und arbeiten tagsüber. Ihr Ziel: bessere Chancen im Beruf. Viele Bundesländer unterstützen sie inzwischen mit Geld für Fahrten und Bücher.',
        'Gute Nachrichten für alle, die gerade für Prüfungen lernen: Die Stadtbibliothek hat ihre Öffnungszeiten verlängert. Bis Ende Juli ist der große Lesesaal jetzt auch am Sonntag und abends bis 22 Uhr geöffnet. „Im Frühsommer sind unsere Arbeitsplätze immer voll besetzt, darauf reagieren wir“, erklärt der Leiter. Der Eintritt ist wie immer frei.'
      ],
      answers: [1, 6, 3, 0, 4]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Mit 45 noch einmal Azubi',
      text: `Zwanzig Jahre lang hat Markus Stein in einer Bank gearbeitet, zuletzt als Berater für Kredite. Dann wurde seine Filiale geschlossen, und der 45-Jährige stand vor einer schwierigen Frage: noch einmal dasselbe — oder etwas ganz Neues? Ein Freund erzählte ihm damals, dass Kindergärten überall dringend Personal suchen. Stein entschied sich für das Neue und begann eine Ausbildung zum Erzieher.

„Meine Freunde haben zuerst gelacht“, erzählt Stein. „Aber ich habe schon immer gern mit Kindern gearbeitet, zum Beispiel als Trainer im Fußballverein.“ Heute besucht er an zwei Tagen die Fachschule und arbeitet an drei Tagen in einer Kita. Seine Mitschüler sind zum Teil jünger als seine eigene Tochter. „Am Anfang war das komisch, inzwischen lernen wir viel voneinander.“

Leicht ist der Neuanfang nicht. Stein verdient heute deutlich weniger als früher, die Familie musste sparen und ist in eine kleinere Wohnung gezogen. Auch das Lernen für Prüfungen musste er nach so vielen Jahren erst wieder üben. Dafür helfen ihm seine Lebenserfahrung und seine Ruhe — besonders bei schwierigen Gesprächen mit Eltern, sagt seine Chefin. Unterstützung bekommt er von seiner Frau, die dafür wieder mehr arbeitet.

In einem Jahr ist Stein fertig. Die Kita möchte ihn danach fest übernehmen, denn männliche Erzieher werden überall gesucht. Bereut hat er seine Entscheidung nie: „Zum ersten Mal seit Jahren freue ich mich morgens auf die Arbeit. Für einen Neuanfang ist es fast nie zu spät — damit möchte ich anderen Mut machen.“`,
      questions: [
        {
          frage: 'Markus Stein hat eine Ausbildung begonnen, weil …',
          options: [
            'er in der Bank zu wenig verdient hat.',
            'seine Filiale geschlossen wurde.',
            'seine Tochter das vorgeschlagen hat.'
          ],
          answer: 1
        },
        {
          frage: 'Erfahrungen mit Kindern hatte er schon …',
          options: [
            'als Trainer im Fußballverein.',
            'als Lehrer an einer Schule.',
            'als Berater für junge Familien.'
          ],
          answer: 0
        },
        {
          frage: 'Seine Mitschüler an der Fachschule …',
          options: [
            'sind alle älter als er.',
            'sind zum Teil deutlich jünger als er.',
            'arbeiten alle in derselben Kita.'
          ],
          answer: 1
        },
        {
          frage: 'Seit der Ausbildung …',
          options: [
            'verdient die Familie mehr als früher.',
            'hat die Familie eine größere Wohnung gekauft.',
            'musste die Familie in eine kleinere Wohnung ziehen.'
          ],
          answer: 2
        },
        {
          frage: 'Nach der Ausbildung …',
          options: [
            'will Stein wieder in der Bank arbeiten.',
            'kann Stein in der Kita bleiben.',
            'muss Stein sich eine neue Stelle suchen.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie möchten Ihr Englisch für den Beruf verbessern, haben aber nur am Wochenende Zeit.',
        'Ihre Tochter (8) hat Schwierigkeiten in Mathematik und braucht Unterstützung.',
        'Sie suchen einen ruhigen Ort, an dem Sie mit Ihrem Laptop lernen können.',
        'Ihr Neffe hat die Schule beendet und sucht einen Ausbildungsplatz als Koch.',
        'Sie haben nie richtig schwimmen gelernt und möchten das als Erwachsener nachholen.',
        'Eine Freundin möchte sich auf die Prüfung Deutsch B2 vorbereiten.',
        'Sie möchten beruflich neu anfangen und sich im IT-Bereich umschulen lassen.',
        'Ihr Vater ist Rentner und interessiert sich für Geschichte.',
        'Sie möchten Gitarre spielen lernen, am liebsten zusammen mit anderen Anfängern.',
        'Sie haben die Theorieprüfung für den Führerschein nicht bestanden und möchten sich schnell noch einmal vorbereiten.'
      ],
      ads: [
        'Sprachinstitut Atlantik: Business-Englisch kompakt — Intensivkurse samstags und sonntags, kleine Gruppen, alle Niveaus.',
        'Lernstudio Plus: Professionelle Nachhilfe für Grundschulkinder in Mathe und Deutsch — Einzelunterricht bei Ihnen zu Hause.',
        'Musikschule Tonleiter: Gitarre für erwachsene Anfänger — Gruppenkurse am Abend, Leihinstrumente vorhanden.',
        'Fahrschule Ampel: Theorie-Crashkurs am Wochenende — der schnelle Weg zur Wiederholungsprüfung. Jetzt anmelden!',
        'Restaurant Zur Linde: Wir bilden aus! Ausbildungsplatz Koch/Köchin ab August, faire Bezahlung, Übernahme möglich.',
        'Lerncafé Kapitel: Ruhige Arbeitsplätze mit WLAN und Steckdosen, Kaffee inklusive — Tagesticket 5 Euro.',
        'Akademie Futura: Geförderte Umschulung zur Fachinformatikerin / zum Fachinformatiker — kostenlose Beratung zur Finanzierung.',
        'Schwimmschule Delfin: Anfängerkurse speziell für Erwachsene — in kleinen Gruppen und ohne Zuschauer.',
        'Sprachschule Horizont: Vorbereitungskurse auf die Prüfungen Deutsch B1 und B2 — mit Probetest und Prüfungstraining.',
        'Seniorenakademie: Vortragsreihe „Europäische Geschichte“ — jeden Dienstagvormittag, offen für alle ab 60.',
        'Englisch für Anfänger: Abendkurs Montag bis Donnerstag, 18 bis 19.30 Uhr — Einstieg jederzeit möglich.',
        'Kochschule Aroma: Hobby-Kochkurs „Italienische Küche“ für Anfänger — vier Abende mit Menü und Weinprobe.'
      ],
      answers: [0, 1, 5, 4, 7, 8, 6, 9, 2, 3]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Frau Böhm,

mit großem Interesse habe ich Ihre Anzeige gelesen, [1] Sie einen Praktikanten für Ihre Werbeagentur suchen. Ich studiere seit zwei Jahren Kommunikationsdesign und möchte [2] Sommer gern praktische Erfahrungen sammeln.

Schon in der Schule habe ich mich [3] Grafik und Fotografie interessiert. Letztes Jahr habe ich außerdem ein kurzes Praktikum bei einer Zeitung [4]. Meine Professorin meint, dass ich gut im Team arbeiten [5].

Ich würde mich freuen, [6] ich mich bei Ihnen persönlich vorstellen dürfte. Ab Juli [7] ich drei Monate Zeit. Meinen Lebenslauf schicke ich Ihnen [8] dieser E-Mail. Bitte rufen Sie mich an, [9] Sie noch Fragen haben.

Ich freue mich sehr [10] Ihre Antwort.

Mit freundlichen Grüßen
David Moreno`,
      gaps: [
        { options: ['in der', 'in die', 'in dem'], answer: 0 },
        { options: ['am', 'im', 'um'], answer: 1 },
        { options: ['über', 'für', 'an'], answer: 1 },
        { options: ['machen', 'machte', 'gemacht'], answer: 2 },
        { options: ['können', 'kann', 'könnt'], answer: 1 },
        { options: ['wenn', 'ob', 'dass'], answer: 0 },
        { options: ['wäre', 'würde', 'hätte'], answer: 2 },
        { options: ['zu', 'mit', 'bei'], answer: 1 },
        { options: ['damit', 'obwohl', 'falls'], answer: 2 },
        { options: ['über', 'auf', 'für'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Liebe Frau Krämer,

leider war ich letzte Woche krank und konnte nicht zum [1] kommen. Eine Kollegin aus dem Kurs hat mir erzählt, dass Sie schon Informationen zur [2] verteilt haben. Könnten Sie mir die Unterlagen bitte per E-Mail [3]?

Ich habe große [4], dass ich jetzt zu viel verpasst habe. Zum Glück hatte ich zu Hause ein bisschen [5] und konnte die Grammatik wiederholen. Trotzdem fällt mir das freie Sprechen noch [6]. Haben Sie vielleicht einen [7] für mich, wie ich auch zu Hause das Sprechen üben kann?

Ab nächster Woche werde ich wieder regelmäßig [8]. Ich hoffe sehr, dass ich die Prüfung trotzdem [9] kann.

Vielen Dank für Ihre [10]!

Herzliche Grüße
Tomasz Kowalski`,
      wordBank: [
        'Antwort',
        'bestehen',
        'besuchen',
        'Hilfe',
        'leicht',
        'mitmachen',
        'Note',
        'Prüfung',
        'schicken',
        'schwer',
        'Sorge',
        'Tipp',
        'Unterricht',
        'verpassen',
        'Zeit'
      ],
      answers: [12, 7, 8, 10, 14, 9, 11, 5, 1, 3]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die praktische Prüfung findet wie geplant am Donnerstag statt.',
          answer: false,
          audio:
            'Guten Tag, Herr Yilmaz, hier ist die Fahrschule Berger. Ihre praktische Prüfung am Donnerstag muss leider verschoben werden, weil der Prüfer erkrankt ist. Wir haben für Sie einen neuen Termin am Montag um vierzehn Uhr reserviert. Bitte rufen Sie uns kurz zurück und sagen Sie uns, ob das für Sie passt. Vielen Dank und bis bald!'
        },
        {
          statement: 'Marta hat die Prüfung bestanden und möchte sich bedanken.',
          answer: true,
          audio:
            'Hallo Aylin, hier ist Marta. Ich habe super Neuigkeiten: Ich habe die B1-Prüfung bestanden — sogar mit einer richtig guten Note! Ohne unsere Lerngruppe hätte ich das nie geschafft. Ich möchte mich bei euch allen bedanken und lade euch deshalb am Samstag zu Kaffee und Kuchen ein. Sag den anderen Bescheid, ja? Bis dann!'
        },
        {
          statement: 'Die Eltern sollen heute an der Turnhalle parken.',
          answer: true,
          audio:
            'Liebe Eltern, herzlich willkommen zum Informationsabend! Wir beginnen um neunzehn Uhr in der Aula mit einem kurzen Vortrag der Schulleiterin. Danach können Sie in den Klassenräumen mit den Lehrerinnen und Lehrern sprechen. Bitte beachten Sie: Der Parkplatz am Haupteingang ist heute gesperrt. Nutzen Sie bitte den Parkplatz an der Turnhalle.'
        },
        {
          statement: 'Frau Petrova muss sich bis morgen Mittag melden, wenn sie den Kursplatz möchte.',
          answer: true,
          audio:
            'Guten Tag, Frau Petrova, hier spricht Anna Roth von der Volkshochschule. Sie stehen auf der Warteliste für den Spanischkurs am Dienstagabend. Jetzt ist ein Platz frei geworden! Bitte melden Sie sich bis morgen Mittag bei uns, sonst geben wir den Platz an die nächste Person auf der Liste weiter. Sie erreichen uns unter der bekannten Nummer. Auf Wiederhören!'
        },
        {
          statement: 'Die Anmeldung für die Sommerkurse beginnt früher als geplant.',
          answer: false,
          audio:
            'Und hier eine Meldung für alle Studierenden: Die Anmeldung für die Sommerkurse der Universität beginnt nicht wie geplant am ersten Juni, sondern erst eine Woche später, am achten Juni. Der Grund sind technische Probleme mit dem Anmeldeportal. Alle weiteren Termine bleiben unverändert. Mehr Informationen finden Sie auf der Internetseite der Universität.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Willkommen zu unserer Reihe „Traumberuf gesucht“! Heute ist Lisa Brandt bei uns. Frau Brandt, Sie machen eine Ausbildung zur Tischlerin und sind jetzt im dritten Lehrjahr. Wie kam es dazu?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'Nach dem Abitur habe ich zuerst Architektur studiert, weil alle gesagt haben, das passt zu mir. Aber nach zwei Semestern habe ich das Studium abgebrochen. Ich wollte nicht nur am Computer zeichnen, sondern mit meinen Händen etwas bauen. Ein Praktikum in einer Tischlerei hat mir dann gezeigt: Das ist genau mein Beruf.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie haben Ihre Eltern darauf reagiert?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'Am Anfang waren sie skeptisch und haben gefragt, ob ich mir das wirklich gut überlegt habe. Heute sind sie richtig stolz. Mein Vater erzählt inzwischen jedem, dass seine Tochter Möbel bauen kann.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie sieht Ihre Woche aus?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'An drei Tagen arbeite ich in der Werkstatt, und an zwei Tagen gehe ich in die Berufsschule. Dort lernen wir zum Beispiel, wie man Materialkosten berechnet und technische Zeichnungen liest. Mathe braucht man übrigens öfter, als viele denken. Die Berufsschule macht mir heute mehr Spaß als früher das Gymnasium, weil alles einen praktischen Nutzen hat.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Sie sind die einzige Frau in Ihrem Betrieb. Ist das manchmal schwierig?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'Ehrlich gesagt: nein. Die Kollegen haben mich vom ersten Tag an ernst genommen. Und in meiner Berufsschulklasse sind wir inzwischen fünf Frauen — vor ein paar Jahren war das noch ganz anders.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und wie sieht es mit dem Geld aus?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'Im ersten Lehrjahr war es wirklich wenig, da habe ich jeden Euro zweimal umgedreht. Jetzt geht es besser. Ich wohne aber immer noch bei meinen Eltern, sonst würde das Geld nicht reichen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was gefällt Ihnen an Ihrer Arbeit am meisten?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'Dass man am Abend sieht, was man geschafft hat. Mein schönstes Projekt war mein eigenes Bett — das habe ich komplett selbst gebaut und geölt. Fast vier Wochen habe ich daran gearbeitet, immer nach Feierabend. Darauf schlafe ich jetzt jede Nacht.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie geht es nach der Ausbildung weiter?'
        },
        {
          speaker: 'Lisa Brandt',
          text: 'Im Sommer habe ich meine Gesellenprüfung, auf die ich mich gerade vorbereite. Danach möchte ich ein paar Jahre Erfahrung sammeln und später die Meisterschule besuchen. Mein großer Traum ist eine eigene kleine Werkstatt, in der ich Möbel nach Wunsch baue.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Dafür wünschen wir Ihnen viel Erfolg. Vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Lisa Brandt ist im dritten Lehrjahr.', answer: true },
        { statement: 'Lisa hat ihr Architekturstudium abgeschlossen.', answer: false },
        { statement: 'Ihre Eltern waren von Anfang an begeistert.', answer: false },
        { statement: 'Lisa geht an zwei Tagen pro Woche in die Berufsschule.', answer: true },
        { statement: 'In Lisas Betrieb arbeiten mehrere Frauen.', answer: false },
        { statement: 'Im ersten Lehrjahr hat Lisa sehr wenig verdient.', answer: true },
        { statement: 'Lisa wohnt noch bei ihren Eltern.', answer: true },
        { statement: 'Ihr eigenes Bett hat Lisa selbst gebaut.', answer: true },
        { statement: 'Die Gesellenprüfung hat Lisa schon hinter sich.', answer: false },
        { statement: 'Später möchte Lisa eine eigene Werkstatt haben.', answer: true }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Bibliothek schließt in einer halben Stunde.',
          answer: true,
          audio:
            'Liebe Besucherinnen und Besucher, die Universitätsbibliothek schließt in dreißig Minuten. Bitte bringen Sie ausgeliehene Bücher jetzt zur Ausleihe im Erdgeschoss und speichern Sie Ihre Arbeit an den Computern. Ab morgen früh um acht Uhr sind wir wieder für Sie da. Wir wünschen Ihnen einen schönen Abend.'
        },
        {
          statement: 'Der Vortrag über Bewerbungen findet in einer anderen Halle statt.',
          answer: false,
          audio:
            'Meine Damen und Herren, herzlich willkommen auf der Ausbildungsmesse! Bitte beachten Sie eine Programmänderung: Der Vortrag „Richtig bewerben“ beginnt nicht um elf Uhr, sondern erst um dreizehn Uhr — wie geplant in Halle zwei am Stand der Handwerkskammer. Die Plätze sind begrenzt, kommen Sie bitte rechtzeitig.'
        },
        {
          statement: 'Die Kurse von Frau Molnar sind heute in einem anderen Raum.',
          answer: true,
          audio:
            'Liebe Teilnehmerinnen und Teilnehmer, eine kurze Durchsage: Die B1-Kurse von Frau Molnar finden heute nicht im Raum zwei null vier statt, sondern im Raum drei zehn im dritten Stock. Der Aufzug ist leider außer Betrieb, bitte benutzen Sie die Treppe. Alle anderen Kurse bleiben in ihren gewohnten Räumen.'
        },
        {
          statement: 'Der Schwimmunterricht findet heute wie geplant statt.',
          answer: false,
          audio:
            'Achtung, eine Durchsage für die Schülerinnen und Schüler der Gesamtschule: Der Bus der Linie vierzehn zum Schwimmbad fällt heute aus. Der Schwimmunterricht der Klassen fünf a und fünf b findet deshalb nicht statt. Die Schülerinnen und Schüler haben stattdessen Unterricht im Klassenraum. Die Eltern wurden bereits informiert.'
        },
        {
          statement: 'Die Teilnehmer dürfen keine eigenen Wörterbücher benutzen.',
          answer: true,
          audio:
            'Liebe Prüfungsteilnehmerinnen und Prüfungsteilnehmer, wir beginnen in zehn Minuten. Bitte schalten Sie Ihre Handys aus und geben Sie sie vorne am Tisch ab. Auf Ihrem Platz finden Sie einen Stift und Papier für Notizen. Eigene Wörterbücher sind nicht erlaubt. Wir wünschen Ihnen viel Erfolg!'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf den Brief. Schreiben Sie zu mindestens drei der vier Leitpunkte — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an das Kursbüro',
        situation:
          'Sie haben sich für den Abendkurs „Englisch für den Beruf“ an der Volkshochschule angemeldet. Heute bekommen Sie eine E-Mail vom Kursbüro.',
        incoming: {
          von: 'kursbuero@vhs-mitte.de',
          betreff: 'Änderung bei Ihrem Kurs „Englisch für den Beruf“',
          text: `Liebe Teilnehmerinnen und Teilnehmer,

leider müssen wir Ihren Kurs „Englisch für den Beruf“ ändern: Unsere Dozentin hat ab April eine neue Stelle. Der Kurs findet deshalb nicht mehr dienstags um 18 Uhr statt, sondern mittwochs um 19.30 Uhr — neu im Gebäude B am Westpark.

Wir hoffen, dass Sie weiter dabei sind. Falls der neue Termin für Sie nicht passt, können wir Ihnen alternativ einen Online-Kurs am Montagabend anbieten.

Bitte geben Sie uns bis zum 25. März Bescheid.

Mit freundlichen Grüßen
Sabine Roth, Kursbüro`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Information.',
          'Sagen Sie, ob der neue Termin für Sie passt, und begründen Sie das.',
          'Stellen Sie eine Frage zum neuen Kursort oder zum Online-Kurs.',
          'Bitten Sie um eine schriftliche Bestätigung Ihrer Anmeldung.'
        ],
        musterloesung: `Sehr geehrte Frau Roth,

vielen Dank für Ihre E-Mail und die Information über die Änderungen bei meinem Kurs.

Leider passt der neue Termin am Mittwoch für mich nicht gut, weil ich an diesem Tag immer bis 19 Uhr arbeite und den Weg zum Westpark nicht rechtzeitig schaffe. Deshalb interessiere ich mich für den Online-Kurs am Montagabend.

Dazu habe ich noch eine Frage: Welches Programm benutzen Sie für den Unterricht, und brauche ich eine Kamera? Ich habe bisher noch keinen Online-Kurs besucht.

Wenn der Kurs am Montag um 18 oder 19 Uhr beginnt, melde ich mich gern fest an. Könnten Sie mir bitte eine schriftliche Bestätigung meiner Anmeldung schicken?

Vielen Dank für Ihre Mühe. Ich freue mich auf Ihre Antwort.

Mit freundlichen Grüßen
Tomasz Kowalski`
      }
    ],
    tipps:
      'Alle Leitpunkte kurz abhaken, bevor Sie abgeben: Anrede und Gruß? Mindestens drei Punkte behandelt? Verben an der richtigen Position? Sie/Ihnen großgeschrieben?'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Kontaktaufnahme',
      anweisung:
        'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Lernen Sie sich kennen. Die folgenden Punkte helfen Ihnen.',
      punkte: ['Name', 'Wohnort', 'Familie', 'Schule, Ausbildung oder Beruf', 'Sprachen lernen', 'Freizeit'],
      redemittel: [
        'Wie heißen Sie? / Woher kommen Sie?',
        'Ich wohne seit … in …',
        'Was haben Sie gelernt? / Was machen Sie beruflich?',
        'Seit wann lernen Sie Deutsch?',
        'Was machen Sie gern in Ihrer Freizeit?',
        'Das klingt interessant! Erzählen Sie mehr davon.'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitung gelesen: „Ein Beruf fürs ganze Leben — das gibt es heute kaum noch.“ Berichten Sie: Wie ist das in Ihrem Land oder in Ihrer Familie? Sagen Sie Ihre Meinung: Sollte man als Erwachsener noch einmal etwas ganz Neues lernen?',
      punkte: [
        'Berichten Sie über eigene Erfahrungen mit Lernen oder Weiterbildung.',
        'Wie ist die Situation in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND Nachteile eines Berufswechsels.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'In dem Artikel steht, dass …',
        'Ich habe selbst die Erfahrung gemacht, dass …',
        'Bei uns in … ist das so: …',
        'Ein großer Vorteil ist, dass … / Schwierig finde ich, dass …',
        'Wie sehen Sie das? / Was würden Sie machen?',
        'Da stimme ich Ihnen zu. / Das sehe ich anders, weil …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Sie und Ihre Partnerin / Ihr Partner möchten sich zusammen mit anderen Teilnehmern aus Ihrem Deutschkurs auf die B1-Prüfung vorbereiten. Planen Sie eine Lerngruppe.',
      punkte: [
        'Wann und wie oft soll sich die Gruppe treffen?',
        'Wo können Sie ungestört lernen?',
        'Was wollen Sie gemeinsam üben (Hören, Schreiben, Sprechen …)?',
        'Wer organisiert Materialien und Übungstests?'
      ],
      redemittel: [
        'Wollen wir uns einmal pro Woche treffen?',
        'Wie wäre es mit der Bibliothek? / Ich schlage … vor.',
        'Am wichtigsten finde ich, dass wir … üben.',
        'Das ist eine gute Idee! / Einverstanden!',
        'Wer kümmert sich um …? — Das kann ich übernehmen.',
        'Gut, dann machen wir das so!'
      ]
    }
  }
} as const satisfies TelcExam;

export default exam;
