import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 10,
  level: 'b1',
  title: 'Modelltest 10',
  theme: 'Feste, Pläne & Behörden',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Bürgeramt: Termine gibt es jetzt nur noch online',
        'Weihnachtsmarkt öffnet dieses Jahr eine Woche früher',
        'Stadtfest: Straßen im Zentrum am Wochenende gesperrt',
        'Neue Regeln für Feuerwerk an Silvester',
        'Heiraten wird immer teurer',
        'Lange Wartezeiten: Neuer Reisepass dauert bis zu acht Wochen',
        'Alte Führerscheine müssen umgetauscht werden',
        'Karnevalsumzug: Stadt erwartet hunderttausend Besucher',
        'Volkshochschule: Anmeldung für Frühjahrskurse gestartet',
        'Stadt sucht noch Helfer für das Sommerfest'
      ],
      texts: [
        'Wer im Bürgeramt einen Ausweis beantragen oder seine neue Adresse anmelden möchte, kann ab dem nächsten Monat nicht mehr einfach vorbeikommen. Alle Besucher brauchen dann einen Termin, den sie vorher im Internet buchen müssen. Die Stadt verspricht sich davon kürzere Wartezeiten. Wer keinen Computer hat, kann Termine auch telefonisch vereinbaren.',
        'Sie planen eine Reise ins Ausland? Dann sollten Sie rechtzeitig Ihre Dokumente prüfen. Wer aktuell einen neuen Reisepass beantragt, muss bis zu acht Wochen auf ihn warten, teilt die Stadtverwaltung mit. Der Grund sind viele Anträge vor der Urlaubssaison. Für dringende Fälle gibt es einen Expresspass, der allerdings deutlich mehr kostet.',
        'Am kommenden Wochenende feiert die Stadt ihr großes Stadtfest. Autofahrer brauchen Geduld: Von Freitagabend bis Montagfrüh sind der Marktplatz, die Königstraße und alle Nebenstraßen im Zentrum für den Verkehr gesperrt. Die Stadt empfiehlt, mit Bus und Bahn zu kommen. Die Verkehrsbetriebe verstärken ihr Angebot in dieser Zeit.',
        'Millionen Deutsche haben noch einen grauen oder rosafarbenen Führerschein aus Papier. Diese alten Dokumente verlieren bald ihre Gültigkeit: Bis zum 19. Januar müssen die Papierführerscheine gegen eine Plastikkarte umgetauscht werden. Der Umtausch kostet ungefähr 25 Euro, eine neue Prüfung ist aber nicht nötig. Wer die Frist verpasst, muss mit einer Strafe rechnen.',
        'Raketen und Böller gehören für viele zu Silvester dazu. In diesem Jahr gilt jedoch: In der gesamten Altstadt ist privates Feuerwerk verboten, weil die engen Gassen zu gefährlich sind. Wer trotzdem knallt, muss mit einem Bußgeld rechnen. Erlaubt bleibt das Feuerwerk auf den großen Plätzen am Flussufer, wo die Stadt Flächen ausweist.'
      ],
      answers: [0, 5, 2, 6, 3]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ein Fest für die ganze Straße',
      text: `Einmal im Jahr bleibt der Holunderweg in Nürnberg autofrei: Dann stehen lange Tische auf der Straße, es duftet nach Gegrilltem, und rund hundert Nachbarinnen und Nachbarn feiern bis in den Abend. Organisiert wird das Straßenfest von Sabine Koch. „Angefangen haben wir vor sechs Jahren, weil sich hier kaum jemand kannte“, erzählt sie. „Viele wussten nicht einmal, wer im Haus nebenan wohnt.“

Ganz ohne Papierkram geht so ein Fest allerdings nicht. Drei Monate vorher stellt Frau Koch beim Ordnungsamt einen Antrag, damit die Straße für einen Tag gesperrt werden darf. Die Genehmigung kostet etwa fünfzig Euro, außerdem braucht das Fest eine Versicherung. „Beim ersten Mal fand ich die Formulare kompliziert“, gibt sie zu. „Inzwischen kenne ich die Mitarbeiter im Amt, und alles geht ganz schnell.“

Beim Fest selbst bringt jeder Haushalt etwas mit: Salate, Kuchen oder Spezialitäten aus der Heimat — im Holunderweg leben Familien aus acht Ländern. Die Kinder verkaufen auf einem kleinen Flohmarkt ihr altes Spielzeug. Nur eine Regel ist streng: Um 22 Uhr muss die Musik leiser werden, das verlangt das Amt. Die Kosten für das Fest teilen sich alle Haushalte.

Wichtiger als das Fest ist für Frau Koch aber, was es verändert hat: Die Nachbarn grüßen sich, gießen im Urlaub gegenseitig die Blumen und nehmen Pakete an. Für das nächste Jahr gibt es schon einen neuen Plan: Zusätzlich zum Fest soll ein gemeinsamer Garten hinter den Häusern entstehen. „Die Ideen gehen uns nicht aus“, lacht sie.`,
      questions: [
        {
          frage: 'Das Straßenfest wurde gegründet, weil …',
          options: [
            'die Nachbarn sich kaum kannten.',
            'das Ordnungsamt es vorgeschlagen hat.',
            'die Straße neu gebaut worden war.'
          ],
          answer: 0
        },
        {
          frage: 'Für das Fest muss Frau Koch …',
          options: [
            'beim Ordnungsamt eine Erlaubnis beantragen.',
            'eine neue Versicherung für ihr Haus abschließen.',
            'drei Monate Urlaub nehmen.'
          ],
          answer: 0
        },
        {
          frage: 'Das Essen beim Fest …',
          options: [
            'wird von einer Firma geliefert.',
            'bringen die Bewohner selbst mit.',
            'bezahlt das Ordnungsamt.'
          ],
          answer: 1
        },
        {
          frage: 'Ab 22 Uhr …',
          options: [
            'endet das Fest sofort.',
            'darf die Musik nicht mehr laut sein.',
            'beginnt der Flohmarkt der Kinder.'
          ],
          answer: 1
        },
        {
          frage: 'Im nächsten Jahr …',
          options: [
            'soll ein gemeinsamer Garten entstehen.',
            'fällt das Fest zum ersten Mal aus.',
            'übernimmt das Amt die Organisation.'
          ],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie brauchen schnell ein Passfoto für Ihren neuen Ausweis.',
        'Sie heiraten im Mai und suchen noch einen DJ für die Feier.',
        'Ihre Freundin braucht eine beglaubigte Übersetzung ihrer Geburtsurkunde.',
        'Sie ziehen in eine andere Stadt und suchen eine Firma für den Umzug.',
        'Sie möchten für eine Gartenparty ein Zelt, Tische und Bänke ausleihen.',
        'Ihr Verein sucht für das Sommerfest eine Band, die deutsche und internationale Musik spielt.',
        'Ihr Nachbar versteht Briefe vom Amt nicht und braucht Hilfe beim Ausfüllen von Anträgen.',
        'Sie suchen ein Kostüm für den Karneval, möchten aber keins kaufen.',
        'Sie suchen einen Raum, in dem Sie mit Freunden Silvester feiern können.',
        'Sie möchten für den Abschied einer Kollegin eine besondere Torte bestellen.'
      ],
      ads: [
        'DJ Marco: Musik für Hochzeiten und Geburtstage — von Schlager bis zu aktuellen Charts. Licht- und Musikanlage bringe ich mit!',
        'Kostümkiste: Über 500 Kostüme zum Ausleihen — für Karneval, Mottopartys und Theater. Änderungen inklusive, Reservierung empfohlen.',
        'Übersetzungsbüro Lingua Plus: Beglaubigte Übersetzungen von Urkunden und Zeugnissen durch vereidigte Übersetzer — in 15 Sprachen.',
        'Foto-Druck online: Poster, Kalender und Tassen mit Ihren schönsten Fotos — einfach hochladen, in drei Tagen geliefert!',
        'Festzeltverleih Hubert: Zelte, Biertischgarnituren und Stehtische für private Feste. Lieferung und Aufbau auf Wunsch.',
        'Konditorei Zuckerguss: Torten nach Ihren Wünschen — mit Foto, Namen oder Firmenlogo. Bitte drei Tage im Voraus bestellen.',
        'Umzüge Berger: Komplettservice — wir packen, transportieren und bauen Ihre Möbel wieder auf. Auch Fernumzüge, Besichtigung kostenlos.',
        'Beratungscafé Kompass: Wir helfen kostenlos beim Lesen von Behördenbriefen und beim Ausfüllen von Anträgen. Mittwochs 14 bis 18 Uhr.',
        'Fotostudio Blende: Biometrische Passbilder in zehn Minuten — ohne Termin, auch für Kinder und Babys. Direkt neben dem Rathaus.',
        'Sprachschule Horizont: Deutsch lernen von A1 bis C1 — neue Abendkurse ab März, kostenloser Einstufungstest.',
        'Band „Die Notenbrüder“: Live-Musik für Ihre Feste — deutsche Hits, internationale Songs und Wünsche des Publikums.',
        'Eventraum Fabrik: Partyraum für bis zu 50 Gäste mit Küche und Musikanlage — auch an Feiertagen und Silvester zu mieten.'
      ],
      answers: [8, 0, 2, 6, 4, 10, 7, 1, 11, 5]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Lieber Tomasz,

ich habe tolle Neuigkeiten: Anna und ich heiraten! Seit Wochen gibt es so viel zu organisieren, [1] wir nur noch Listen schreiben. Zuerst mussten wir zum Standesamt gehen, [2] einen Termin zu bekommen. Der Beamte hat uns genau erklärt, welche Dokumente [3] werden. Anna hat ihre Geburtsurkunde übrigens erst nach stundenlangem Suchen [4].

Gefeiert wird im August in einem kleinen Gasthof, [5] Garten direkt am See liegt. Wir laden nur die Familie und enge Freunde ein — und du gehörst natürlich [6]! Kannst du mir bis Ende Mai sagen, [7] du kommst? Wenn du schon am Freitag anreist, kannst du gern bei [8] übernachten.

Nach der Hochzeit wollen wir für eine Woche [9] Italien fahren. Ich freue mich riesig [10], dich endlich wiederzusehen!

Herzliche Grüße
Daniel`,
      gaps: [
        { options: ['weil', 'dass', 'ob'], answer: 1 },
        { options: ['um', 'damit', 'für'], answer: 0 },
        { options: ['brauchen', 'brauchte', 'gebraucht'], answer: 2 },
        { options: ['gefunden', 'finden', 'fand'], answer: 0 },
        { options: ['deren', 'dessen', 'das'], answer: 1 },
        { options: ['damit', 'dabei', 'dazu'], answer: 2 },
        { options: ['ob', 'wenn', 'dass'], answer: 0 },
        { options: ['mich', 'mir', 'ich'], answer: 1 },
        { options: ['zu', 'in', 'nach'], answer: 2 },
        { options: ['darüber', 'darauf', 'dafür'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

unsere Nachbarschaft möchte auch in diesem Jahr wieder ein Straßenfest feiern. Dafür beantrage ich die [1] der Beethovenstraße zwischen Hausnummer 2 und 20. Das Fest soll am Samstag, dem 12. Juli, von 14 bis 22 Uhr [2].

Wir erwarten ungefähr 80 [3]. Die Musik werden wir wie vorgeschrieben um 22 Uhr [4], und selbstverständlich werden wir die Straße danach gründlich [5]. Im letzten Jahr hat alles ohne [6] funktioniert — das kann Ihnen sicher auch das Ordnungsamt bestätigen.

Bitte schicken Sie mir das nötige [7] für den Antrag zu. Außerdem möchte ich gern wissen: Welche [8] entstehen in diesem Jahr für die Genehmigung?

Für weitere Fragen stehe ich Ihnen gern zur [9]. Ich bedanke mich im [10] für Ihre Mühe.

Mit freundlichen Grüßen
Robert Steiner`,
      wordBank: [
        'Anmeldung',
        'beenden',
        'Einladung',
        'Formular',
        'Gäste',
        'Kosten',
        'Nachricht',
        'Probleme',
        'reinigen',
        'Sperrung',
        'stattfinden',
        'Termin',
        'Verfügung',
        'Voraus',
        'zufrieden'
      ],
      answers: [9, 10, 4, 1, 8, 7, 3, 5, 12, 13]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der neue Reisepass kann abgeholt werden.',
          answer: true,
          audio:
            'Guten Tag, hier spricht Frau Lindner vom Bürgeramt Mitte. Ich rufe an, weil Ihr neuer Reisepass fertig ist. Sie können ihn ab morgen zu unseren Öffnungszeiten abholen. Bitte bringen Sie Ihren alten Pass und die Gebühr von sechzig Euro mit. Denken Sie daran: Zum Abholen brauchen Sie keinen Termin. Auf Wiederhören!'
        },
        {
          statement: 'Die Party beginnt um 17 Uhr.',
          answer: false,
          audio:
            'Hallo Fatima, hier ist Lukas! Du hast es bestimmt schon gehört: Wir feiern Silvester dieses Jahr bei mir in der Wohnung. Es geht ab 19 Uhr los, du kannst aber auch später kommen. Bring bitte einen Salat oder etwas anderes fürs Buffet mit. Um Mitternacht schauen wir uns dann das Feuerwerk vom Balkon an. Sag Bescheid, ob du kommst!'
        },
        {
          statement: 'Der Weihnachtsmarkt ist bis Ende Dezember geöffnet.',
          answer: false,
          audio:
            'Und jetzt ein Tipp für die Adventszeit: Am Freitag öffnet der Weihnachtsmarkt auf dem Rathausplatz. Bis zum 23. Dezember gibt es dort täglich von elf bis zwanzig Uhr Glühwein, Kunsthandwerk und ein Programm für Kinder. Neu in diesem Jahr ist eine Eisbahn, auf der Kinder bis zwölf Jahre kostenlos laufen können.'
        },
        {
          statement: 'Die Teilnehmer bekommen ihr Geld zurück.',
          answer: true,
          audio:
            'Guten Tag, hier ist die Volkshochschule, mein Name ist Berger. Diese Nachricht geht an alle Teilnehmerinnen und Teilnehmer des Fotokurses am Donnerstag: Der Kurs muss leider komplett ausfallen, weil der Dozent längere Zeit krank ist. Die Kursgebühr überweisen wir Ihnen in den nächsten zwei Wochen vollständig zurück. Wir bitten um Ihr Verständnis.'
        },
        {
          statement: 'Am Sonntag fahren die Busse in der Innenstadt wie immer.',
          answer: false,
          audio:
            'Achtung, Autofahrer und Fahrgäste! Wegen des großen Karnevalsumzugs ist die Innenstadt am Sonntag von zehn bis achtzehn Uhr komplett gesperrt. Auch die Buslinien 3, 5 und 8 fahren in dieser Zeit nicht durch das Zentrum, sondern eine Umleitung über den Ring. Am Montag läuft der Verkehr wieder normal.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Guten Abend und willkommen zu „Menschen und Berufe“! Heute spreche ich mit Nadine Vogt. Frau Vogt, Sie sind Hochzeitsplanerin. Wie lange machen Sie diesen Beruf schon?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Seit acht Jahren. Vorher habe ich lange in einem Hotel gearbeitet und dort viele Feiern organisiert. Irgendwann dachte ich: Das kann ich auch selbstständig — und habe meine eigene Firma gegründet.'
        },
        {
          speaker: 'Moderator',
          text: 'Was genau macht eine Hochzeitsplanerin?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Ich kümmere mich um die Organisation: Ich suche Räume, Musiker und Fotografen, vergleiche Preise und mache Zeitpläne. Aber ganz wichtig: Die großen Entscheidungen treffen die Paare immer selbst. Ich berate nur und sorge dafür, dass am Ende alles klappt.'
        },
        {
          speaker: 'Moderator',
          text: 'Wann sollte man mit der Planung anfangen?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Am besten ein Jahr vor der Hochzeit. Beliebte Termine im Sommer sind oft schon sehr früh vergeben — mit einem Monat Vorlauf schafft man höchstens eine ganz kleine Feier. Auch gute Fotografen und Bands muss man viele Monate im Voraus buchen.'
        },
        {
          speaker: 'Moderator',
          text: 'Ist so eine Planerin nicht nur etwas für reiche Leute?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Das denken viele, aber es stimmt nicht. Die meisten meiner Kunden sind ganz normale Paare, die einfach wenig Zeit haben. Sie sparen mit mir sogar oft Geld, weil ich die Preise in der Region gut kenne.'
        },
        {
          speaker: 'Moderator',
          text: 'Was war Ihre ungewöhnlichste Hochzeit?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Eine Feier auf einer alten Burg mit zweihundert Gästen. Eine Stunde vor der Party kam ein schweres Gewitter, und wir mussten alles in den großen Saal verlegen — Blumen, Tische, Technik, in nur dreißig Minuten. Die Gäste haben davon fast nichts gemerkt.'
        },
        {
          speaker: 'Moderator',
          text: 'Und was ist der schwierigste Teil Ihrer Arbeit?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Der Papierkram, ganz klar. Termine beim Standesamt sind manchmal schwer zu bekommen, und wenn ein Partner aus dem Ausland kommt, dauern die Dokumente oft Monate. Da helfe ich den Paaren, an alle Fristen zu denken — das gehört bei mir immer zum Service dazu. Zum Glück bieten viele Ämter inzwischen auch Online-Termine an.'
        },
        {
          speaker: 'Moderator',
          text: 'Zum Schluss: Was sind Ihre Pläne für die Zukunft?'
        },
        {
          speaker: 'Nadine Vogt',
          text: 'Die Nachfrage ist so groß, dass ich es allein nicht mehr schaffe — nächstes Jahr stelle ich deshalb zum ersten Mal eine Mitarbeiterin ein. Und ich träume davon, irgendwann auch Feste für Firmen zu organisieren. Das habe ich bisher noch nie gemacht.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Vogt, vielen Dank für das interessante Gespräch!'
        }
      ],
      statements: [
        { statement: 'Frau Vogt arbeitet seit acht Jahren als Hochzeitsplanerin.', answer: true },
        { statement: 'Vor ihrer Selbstständigkeit hat sie in einem Reisebüro gearbeitet.', answer: false },
        { statement: 'Die wichtigen Entscheidungen treffen die Paare selbst.', answer: true },
        { statement: 'Für die Planung einer großen Hochzeit reicht meistens ein Monat.', answer: false },
        { statement: 'Nur sehr reiche Paare buchen eine Hochzeitsplanerin.', answer: false },
        {
          statement:
            'Bei einer Feier auf einer Burg musste wegen eines Gewitters alles nach drinnen verlegt werden.',
          answer: true
        },
        { statement: 'Termine beim Standesamt sind manchmal schwer zu bekommen.', answer: true },
        { statement: 'Um die Dokumente kümmern sich die Paare immer ganz allein.', answer: false },
        { statement: 'Frau Vogt möchte bald eine Mitarbeiterin einstellen.', answer: true },
        { statement: 'Feste für Firmen organisiert sie schon seit vielen Jahren.', answer: false }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Das Feuerwerk beginnt um 22.30 Uhr.',
          answer: true,
          audio:
            'Liebe Besucherinnen und Besucher des Stadtfests, hier eine Information zum Abendprogramm: Das große Feuerwerk beginnt heute um 22.30 Uhr am Flussufer. Den besten Blick haben Sie von der Alten Brücke und von der Uferpromenade. Bitte halten Sie die Rettungswege frei und werfen Sie keine Flaschen ins Wasser. Wir wünschen viel Vergnügen!'
        },
        {
          statement: 'Das Bürgeramt bleibt heute den ganzen Tag geöffnet.',
          answer: false,
          audio:
            'Sehr geehrte Besucherinnen und Besucher des Rathauses, bitte beachten Sie: Das Bürgeramt schließt heute bereits um 13 Uhr, weil eine Personalversammlung stattfindet. Bereits gebuchte Termine am Nachmittag werden verschoben — Sie erhalten automatisch eine Nachricht mit einem neuen Termin. Ab morgen gelten wieder die gewohnten Öffnungszeiten.'
        },
        {
          statement: 'Die Straßenbahnen fahren heute Nacht länger als sonst.',
          answer: true,
          audio:
            'Meine Damen und Herren, ein Hinweis der Verkehrsbetriebe: Wegen des Stadtfests fahren die Straßenbahnen der Linien 1 und 4 heute Nacht bis ein Uhr — deutlich länger als im normalen Fahrplan. Die letzte Bahn in Richtung Nordstadt fährt um 1.05 Uhr an der Haltestelle Marktplatz ab. Wir wünschen einen schönen Abend!'
        },
        {
          statement: 'Das Konzert des Chores fällt aus.',
          answer: false,
          audio:
            'Liebe Gäste des Weihnachtsmarkts, eine kurze Programmänderung: Der Auftritt des Gospelchors auf der Bühne am Brunnen beginnt heute nicht um 17 Uhr, sondern erst um 18 Uhr. Der Chor singt dafür eine halbe Stunde länger. Bis dahin spielt für Sie das Bläserquartett der Musikschule. Vielen Dank für Ihr Verständnis!'
        },
        {
          statement: 'Das Parken im Parkhaus am Theater ist heute kostenlos.',
          answer: true,
          audio:
            'Achtung, eine Durchsage für alle Autofahrer: Bitte parken Sie während des Festes nicht auf dem Marktplatz — falsch geparkte Fahrzeuge werden kostenpflichtig abgeschleppt. Nutzen Sie stattdessen das Parkhaus am Theater: Es ist heute für alle Festbesucher kostenlos geöffnet. Von dort sind es nur fünf Minuten zu Fuß bis zum Festgelände.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf die E-Mail. Schreiben Sie zu allen vier Leitpunkten — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an das Kulturamt',
        situation:
          'Sie haben sich mit einem Essensstand für das Internationale Stadtfest angemeldet. Heute bekommen Sie eine E-Mail vom Kulturamt der Stadt.',
        incoming: {
          von: 'winter@kulturamt-stadt.de',
          betreff: 'Ihr Stand beim Internationalen Stadtfest am 5. Juli',
          text: `Sehr geehrte Damen und Herren,

vielen Dank für Ihre Anmeldung zum Internationalen Stadtfest am 5. Juli auf dem Marktplatz. Damit wir gut planen können, brauchen wir noch einige Informationen von Ihnen:

Bitte bestätigen Sie bis zum 15. Mai Ihre Teilnahme. Teilen Sie uns außerdem mit, was Sie an Ihrem Stand anbieten möchten und was Sie von uns brauchen (zum Beispiel Tische oder einen Stromanschluss).

Haben Sie noch Fragen? Dann schreiben Sie uns gern.

Mit freundlichen Grüßen
Claudia Winter
Kulturamt`
        },
        leitpunkte: [
          'Bestätigen Sie Ihre Teilnahme und bedanken Sie sich.',
          'Beschreiben Sie, was Sie an Ihrem Stand anbieten.',
          'Schreiben Sie, was Sie vom Kulturamt brauchen.',
          'Stellen Sie eine Frage zum Aufbau oder zum Parken.'
        ],
        musterloesung: `Sehr geehrte Frau Winter,

vielen Dank für Ihre E-Mail. Hiermit bestätige ich gern meine Teilnahme am Internationalen Stadtfest am 5. Juli.

An meinem Stand möchte ich Spezialitäten aus meiner Heimat Syrien anbieten: gefüllte Teigtaschen, verschiedene Salate und süßes Gebäck. Alle Gerichte bereite ich frisch vor Ort zu.

Dafür brauche ich von Ihnen bitte zwei Tische und einen Stromanschluss für meine Kochplatte. Einen Sonnenschirm und Geschirr bringe ich selbst mit.

Eine Frage habe ich noch: Ab wann können wir am Samstag mit dem Aufbau beginnen? Und gibt es in der Nähe des Marktplatzes einen Parkplatz, auf dem ich morgens kurz mein Auto entladen darf?

Vielen Dank im Voraus für Ihre Antwort. Ich freue mich sehr auf das Fest!

Mit freundlichen Grüßen
Samir Alou`
      }
    ],
    tipps:
      'Alle Leitpunkte kurz abhaken, bevor Sie abgeben: Anrede und Gruß? Alle vier Punkte behandelt? Verben an der richtigen Position? Sie/Ihnen großgeschrieben?'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Einander kennenlernen',
      anweisung:
        'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Lernen Sie sich kennen. Die folgenden Punkte helfen Ihnen.',
      punkte: [
        'Name',
        'Herkunft und Wohnort',
        'Familie',
        'Arbeit oder Studium',
        'Sprachen',
        'Pläne für die Zukunft'
      ],
      redemittel: [
        'Guten Tag, ich heiße … Und Sie?',
        'Seit wann leben Sie in Deutschland?',
        'Welche Sprachen sprechen Sie?',
        'Was machen Sie zurzeit — arbeiten Sie oder studieren Sie?',
        'Was haben Sie für die Zukunft geplant?',
        'Das klingt spannend! Viel Erfolg dabei!'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitschrift gelesen: „In vielen Familien werden traditionelle Feste immer seltener gefeiert.“ Berichten Sie: Welche Feste feiert man in Ihrem Land, und wie feiern Sie selbst? Sagen Sie Ihre Meinung: Wie wichtig sind Feste und Traditionen?',
      punkte: [
        'Berichten Sie, welche Feste Sie selbst feiern und wie.',
        'Welche Feste und Traditionen gibt es in Ihrem Heimatland?',
        'Sagen Sie Ihre Meinung: Warum sind Feste wichtig — oder auch nicht?',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihren/seinen Festen.'
      ],
      redemittel: [
        'Das wichtigste Fest in meinem Land ist …',
        'Bei uns feiert man … mit der ganzen Familie.',
        'Ich finde Traditionen wichtig, weil …',
        'Manche Feste sind mir zu teuer / zu stressig, denn …',
        'Welche Feste feiern Sie in Ihrer Familie?',
        'Interessant! Bei uns ist das ganz ähnlich / ganz anders.'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Sie möchten dieses Jahr zusammen mit Freunden Silvester feiern. Planen Sie die Feier gemeinsam.',
      punkte: [
        'Wo feiern Sie — zu Hause, in einem gemieteten Raum oder draußen?',
        'Wen laden Sie ein, und wie informieren Sie die Gäste?',
        'Essen, Getränke und Musik — wer organisiert was?',
        'Was machen Sie um Mitternacht?'
      ],
      redemittel: [
        'Wollen wir bei mir zu Hause feiern oder lieber einen Raum mieten?',
        'Wir könnten alle Gäste über eine Nachrichtengruppe einladen.',
        'Ich kümmere mich um die Musik, wenn du das Essen übernimmst.',
        'Wie wäre es, wenn jeder etwas zu essen mitbringt?',
        'Um Mitternacht könnten wir …',
        'Super, dann steht unser Plan!'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
