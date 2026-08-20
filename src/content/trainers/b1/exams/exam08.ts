import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 8,
  level: 'b1',
  title: 'Modelltest 8',
  theme: 'Freizeit, Kultur & Sport',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Stadtmuseum ab sofort einmal im Monat kostenlos',
        'Neuer Radweg verbindet die Stadt mit dem See',
        'Theaterfestival sucht noch freiwillige Helfer',
        'Fußballverein feiert Aufstieg mit großem Fest',
        'Immer mehr Erwachsene lernen ein Instrument',
        'Schwimmkurse für Kinder: Plätze schnell ausgebucht',
        'Bibliothek verlängert ihre Öffnungszeiten',
        'Laufen im Park: Neues Angebot für Anfänger',
        'Kino unter freiem Himmel startet im Juli',
        'Eintrittspreise im Hallenbad steigen deutlich'
      ],
      texts: [
        'Gute Nachrichten für alle Kulturfreunde: Das Stadtmuseum öffnet ab April an jedem ersten Sonntag im Monat seine Türen, ohne dass die Besucher Eintritt bezahlen müssen. Die Direktorin hofft, damit auch Familien und junge Leute zu erreichen, die sonst selten kommen. An den kostenlosen Sonntagen gibt es zusätzlich Führungen für Kinder. Nur die Sonderausstellungen kosten weiterhin Eintritt.',
        'Wer schon lange mit dem Laufen anfangen möchte, bekommt jetzt Hilfe: Der Verein „Aktiv im Grünen“ startet im Mai eine Laufgruppe für Anfängerinnen und Anfänger im Stadtpark. Zweimal pro Woche trainiert die Gruppe unter Anleitung einer erfahrenen Trainerin — langsam und ohne Druck. Die Teilnahme kostet nichts, feste Sportschuhe genügen. Treffpunkt ist dienstags und samstags am Parkeingang.',
        'Klavier, Gitarre oder sogar Schlagzeug: Die Musikschulen der Region melden immer mehr Anmeldungen von Menschen über dreißig. Viele von ihnen wollten schon als Kind ein Instrument lernen, hatten aber nie Zeit oder Geld dafür. „Zum Lernen ist es nie zu spät“, sagt ein Musiklehrer. Die meisten Erwachsenen üben abends nach der Arbeit — und bleiben oft jahrelang dabei.',
        'Ab dem ersten Juliwochenende können Filmfans wieder draußen Filme sehen: Auf der Wiese hinter dem Schloss zeigt das Open-Air-Kino an vier Wochenenden aktuelle Filme und alte Klassiker. Die Vorstellungen beginnen, sobald es dunkel wird. Besucher sollten Decken mitbringen, denn die Abende können kühl werden. Bei starkem Regen fallen Vorstellungen aus, die Karten bleiben dann gültig.',
        'Im September verwandelt das Theaterfestival „Bühne frei“ die Innenstadt wieder in eine große Bühne. Damit alles klappt, werden noch rund fünfzig Freiwillige gesucht, die Karten kontrollieren, Gäste informieren oder beim Aufbau helfen. Wer mitmacht, sieht alle Vorstellungen kostenlos und lernt die Künstlerinnen und Künstler persönlich kennen. Interessierte können sich bis Ende Juli im Festivalbüro melden.'
      ],
      answers: [0, 7, 4, 8, 2]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ein Chor, in dem niemand Noten lesen muss',
      text: `Jeden Sonntagabend treffen sich rund sechzig Menschen in der Aula der Realschule am Park. Sie sind zwischen siebzehn und achtzig Jahre alt, und die meisten von ihnen haben nie ein Instrument gespielt oder in einem Chor gesungen. Trotzdem klingt es nach einer halben Stunde erstaunlich gut. Der „Sonntagschor“ hat nämlich eine einfache Regel: Jeder darf mitsingen — ohne Vorsingen und ohne Notenkenntnisse.

Gegründet hat den Chor vor fünf Jahren die Musiklehrerin Lena Roth. „Immer wieder haben mir Bekannte erzählt, dass sie gern singen würden, sich aber nicht trauen, weil sie glauben, sie könnten es nicht“, erzählt sie. „Genau für diese Menschen wollte ich einen Ort schaffen.“ Am ersten Abend kamen zwölf Leute, heute sind es fünfmal so viele.

Die Lieder — meistens bekannte Popsongs — lernen die Mitglieder, indem sie zuhören und die Melodie Zeile für Zeile nachsingen. Wer einen Fehler macht, singt einfach weiter. Für den Krankenpfleger Jan Bauer ist der Chor die beste Erholung: „Nach einer schweren Woche vergesse ich beim Singen allen Stress. Und danach gehen wir oft noch zusammen in die Pizzeria an der Ecke.“

Zweimal im Jahr tritt der Chor öffentlich auf, beim Sommerfest der Schule und auf dem Weihnachtsmarkt. Wer nicht auf die Bühne möchte, muss nicht — auch das ist eine Regel. Weil sonntags inzwischen alle Plätze besetzt sind, plant Lena Roth ab Herbst eine zweite Gruppe am Mittwochabend. Auf der Warteliste stehen schon über dreißig Namen.`,
      questions: [
        {
          frage: 'Im „Sonntagschor“ kann mitsingen, wer …',
          options: ['ein Instrument spielen kann.', 'Lust am Singen hat.', 'eine Aufnahmeprüfung besteht.'],
          answer: 1
        },
        {
          frage: 'Lena Roth hat den Chor gegründet, weil …',
          options: [
            'sie einen Ort für unsichere Sängerinnen und Sänger schaffen wollte.',
            'ihre Schule dringend einen Chor brauchte.',
            'sie selbst wieder auftreten wollte.'
          ],
          answer: 0
        },
        {
          frage: 'Die Mitglieder lernen neue Lieder, indem sie …',
          options: ['Noten lesen.', 'die Texte zu Hause auswendig lernen.', 'zuhören und nachsingen.'],
          answer: 2
        },
        {
          frage: 'Jan Bauer gefällt am Chor besonders, dass …',
          options: [
            'er beim Singen entspannen kann.',
            'er dort Kolleginnen aus dem Krankenhaus trifft.',
            'die Proben in einer Pizzeria stattfinden.'
          ],
          answer: 0
        },
        {
          frage: 'Ab Herbst …',
          options: [
            'probt der Chor nicht mehr sonntags.',
            'soll es eine zweite Gruppe geben.',
            'tritt der Chor jede Woche öffentlich auf.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ihre Freundin möchte als Erwachsene Gitarre spielen lernen, hat aber noch nie ein Instrument gespielt.',
        'Sie möchten im Urlaub eine Radtour machen und brauchen für zwei Tage ein E-Bike.',
        'Ihr Sohn (8) möchte in einem Verein Fußball spielen.',
        'Ihre Mutter (70) sucht ein sanftes Sportangebot am Vormittag.',
        'Sie und Ihr Partner möchten an Wochenenden tanzen lernen.',
        'Ein Kollege möchte nach der Arbeit draußen etwas für seine Fitness tun, mag aber keine Fitnessstudios.',
        'Sie möchten Ihre alten Skier verkaufen.',
        'Ihre Nichte studiert und möchte günstig ins Theater gehen.',
        'Sie möchten malen lernen und suchen einen Kurs für Anfänger.',
        'Sie planen einen Kindergeburtstag und suchen dafür ein besonderes Angebot.'
      ],
      ads: [
        'Tanzschule Ritmo: Discofox und Walzer im Crashkurs für Paare — an zwei Samstagen zum Ziel. Keine Vorkenntnisse nötig!',
        'Musikschule Tonleiter: Gitarre, Klavier und Geige für Erwachsene — auch für absolute Anfänger. Leihinstrumente vorhanden, Einstieg jederzeit möglich.',
        'Sporthaus Krämer: Großer Wintersale! Neue Skier, Snowboards und Winterjacken jetzt bis zu 50 % reduziert.',
        'Kletterhalle Boulderbär: Kindergeburtstage bei uns — zwei Stunden Klettern mit Betreuer, Raum für die Geburtstagstorte inklusive.',
        'Radstation am Bahnhof: E-Bikes und Tourenräder tageweise oder für das ganze Wochenende mieten. Helme gibt es gratis dazu.',
        'SV Blau-Weiß: Fußballtraining für Mädchen und Jungen von 6 bis 12 Jahren, dienstags und donnerstags. Schnuppertraining kostenlos!',
        'Malatelier Farbklecks: Aquarellmalerei für Anfängerinnen und Anfänger — achtwöchiger Abendkurs, das Material wird gestellt.',
        'Sportbörse im Vereinsheim: Wir verkaufen Ihre gebrauchte Sportausrüstung — Skier, Schlittschuhe, Tennisschläger. Annahme jeden Samstag.',
        'Fitnessstudio PowerFit: Rund um die Uhr geöffnet, moderne Geräte, Sauna. Jetzt Probetraining vereinbaren!',
        'Stadttheater: Für Studierende und Schülerinnen gibt es Restkarten eine Stunde vor Vorstellungsbeginn für nur 8 Euro.',
        'Gesundheitssport 60plus: Sanfte Gymnastik für Seniorinnen und Senioren, jeden Dienstag- und Freitagvormittag im Gemeindesaal.',
        'Yoga im Grünen: Nach Feierabend entspannen — Yoga unter freiem Himmel im Rosengarten, montags und mittwochs um 18.30 Uhr. Matten vorhanden.'
      ],
      answers: [1, 4, 5, 10, 0, 11, 7, 9, 6, 3]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Lieber Jonas,

endlich habe ich Zeit, dir zu schreiben! Du hast mich gefragt, [1] ich immer noch so viel Sport mache. Ja — seit März bin ich Mitglied in einem Volleyballverein, [2] jeden Mittwoch in der Sporthalle trainiert. Das Training macht [3] großen Spaß, obwohl ich am Anfang der schlechteste Spieler war. Ich habe mich [4] entschieden, weil ich neue Leute kennenlernen wollte.

Nach dem Training gehen wir oft noch zusammen etwas trinken — [5] lernt man sich schnell kennen. Nächsten Monat fahren wir zu einem Turnier [6] München. Wenn wir dort gewinnen, [7] wir im Sommer sogar bei den Landesmeisterschaften mitspielen.

Du solltest auch wieder mehr Sport [8]! Ich hoffe, dass du mich bald besuchst. Dann kannst du zum Training mitkommen und [9] alles selbst anschauen. Melde dich, [10] du Zeit hast!

Viele Grüße
Marek`,
      gaps: [
        { options: ['ob', 'dass', 'wenn'], answer: 0 },
        { options: ['den', 'der', 'dem'], answer: 1 },
        { options: ['mich', 'mit', 'mir'], answer: 2 },
        { options: ['darüber', 'dafür', 'damit'], answer: 1 },
        { options: ['so', 'also', 'wie'], answer: 0 },
        { options: ['zu', 'in', 'nach'], answer: 2 },
        { options: ['dürfen', 'dürft', 'darf'], answer: 0 },
        { options: ['machst', 'machen', 'gemacht'], answer: 1 },
        { options: ['dir', 'dich', 'du'], answer: 0 },
        { options: ['weil', 'ob', 'wenn'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

auf Ihrer [1] habe ich gesehen, dass im Oktober ein Fotokurs für Anfänger beginnt. Ich [2] mich sehr für Fotografie, habe aber bisher nur mit dem Handy fotografiert. Deshalb möchte ich gern an dem Kurs [3].

Ich hätte aber noch einige Fragen: Wie hoch ist die [4] für den Kurs? Brauche ich eine eigene Kamera, oder kann ich bei Ihnen ein Gerät [5]? Außerdem möchte ich wissen, ob der Kurs auch für [6] geeignet ist, die noch nie mit einer richtigen Kamera gearbeitet haben.

Ich arbeite bis 17 Uhr. Können Sie mir bestätigen, dass der [7] wirklich erst um 19 Uhr beginnt? Und falls der Kurs schon voll sein sollte: Gibt es eine [8]?

Über eine schnelle [9] würde ich mich sehr freuen. Vielen Dank im [10]!

Mit freundlichen Grüßen
Aylin Demir`,
      wordBank: [
        'Anmeldung',
        'Antwort',
        'ausleihen',
        'besuchen',
        'Erfahrung',
        'Gebühr',
        'interessiere',
        'Internetseite',
        'kaufen',
        'teilnehmen',
        'Teilnehmer',
        'Termin',
        'Unterricht',
        'Voraus',
        'Warteliste'
      ],
      answers: [7, 6, 9, 5, 2, 10, 12, 14, 1, 13]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Das Training am Mittwoch fällt aus.',
          answer: true,
          audio:
            'Hallo, hier spricht Trainer Kowalski vom TV Eintracht. Eine wichtige Information für alle aus der Volleyballgruppe: Das Training am Mittwoch muss leider ausfallen, weil in der Sporthalle der Boden erneuert wird. Am Freitag trainieren wir wieder wie gewohnt um 18 Uhr. Bitte sagt auch den anderen Bescheid. Danke und bis dann!'
        },
        {
          statement: 'Für das Konzert am Samstag gibt es noch Karten.',
          answer: false,
          audio:
            'Und hier noch ein Hinweis für alle Musikfans: Das Konzert der Band „Nordlicht“ am Samstag in der Stadthalle ist seit heute Morgen komplett ausverkauft. Wer keine Karte mehr bekommen hat, muss aber nicht traurig sein: Die Band gibt am Sonntagabend ein Zusatzkonzert. Der Vorverkauf dafür beginnt morgen um zehn Uhr.'
        },
        {
          statement: 'Der Anrufer möchte die Eintrittskarten verkaufen.',
          answer: false,
          audio:
            'Hi Deniz, hier ist Paul. Du glaubst nicht, was passiert ist: Ich habe von meinem Chef zwei Karten für das Basketballspiel am Samstag geschenkt bekommen! Beste Plätze, direkt am Spielfeld. Ich lade dich ein — du musst also nichts bezahlen. Das Spiel beginnt um 19 Uhr. Ruf mich zurück, ob du mitkommst!'
        },
        {
          statement: 'Das Museum ist montags geschlossen.',
          answer: true,
          audio:
            'Guten Tag, hier ist der automatische Ansagedienst des Stadtmuseums. Unsere Öffnungszeiten: Dienstag bis Freitag von zehn bis siebzehn Uhr, am Wochenende von zehn bis achtzehn Uhr. Montags bleibt das Haus geschlossen. Führungen für Gruppen können Sie unter dieser Nummer zu unseren Öffnungszeiten buchen. Vielen Dank für Ihren Anruf.'
        },
        {
          statement: 'Der Flohmarkt findet draußen auf dem Marktplatz statt.',
          answer: false,
          audio:
            'Noch ein Tipp für das Wochenende: Am Samstag findet von neun bis fünfzehn Uhr der große Sportflohmarkt statt — wegen der Bauarbeiten auf dem Marktplatz diesmal in der Messehalle am Stadtrand. Angeboten wird alles rund um den Sport: Fahrräder, Wintersportartikel und Vereinskleidung. Der Eintritt ist frei, Parkplätze gibt es direkt an der Halle.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Herzlich willkommen zu unserer Sendung „Stadt aktiv“! Heute ist Miriam Stein bei uns. Frau Stein, Sie organisieren das Projekt „Sport im Park“. Was muss man sich darunter vorstellen?'
        },
        {
          speaker: 'Miriam Stein',
          text: '„Sport im Park“ bietet von Mai bis September kostenlose Sportkurse unter freiem Himmel an — wir sind jetzt im dritten Sommer. Die Kurse finden von Montag bis Freitag am Abend statt und zusätzlich am Samstagvormittag: Yoga, Gymnastik, Zumba und ein Lauftraining. Die Teilnahme kostet wirklich nichts, man braucht keine Mitgliedschaft und keine teure Ausrüstung.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie sind Sie auf die Idee gekommen?'
        },
        {
          speaker: 'Miriam Stein',
          text: 'Im Urlaub in Kopenhagen. Dort habe ich morgens im Park Gruppen gesehen, die zusammen trainiert haben — einfach so, mitten in der Stadt. Da dachte ich: Das brauchen wir bei uns auch. Zurück zu Hause habe ich gleich am nächsten Tag bei der Stadt angerufen.'
        },
        {
          speaker: 'Moderator',
          text: 'Und wer bezahlt das alles?'
        },
        {
          speaker: 'Miriam Stein',
          text: 'Wir haben zwei Sponsoren, eine Krankenkasse und eine Bank, und auch die Stadt unterstützt uns. Damit können wir unseren Trainerinnen und Trainern eine kleine Bezahlung geben — umsonst arbeiten muss bei uns niemand.'
        },
        {
          speaker: 'Moderator',
          text: 'Welche Kurse sind denn am beliebtesten?'
        },
        {
          speaker: 'Miriam Stein',
          text: 'Ganz klar das Yoga am Donnerstagabend. Da kommen manchmal über hundert Leute auf die Wiese. Aber auch das Lauftraining wächst von Woche zu Woche. Viele Teilnehmer erzählen mir, dass sie durch unsere Kurse zum ersten Mal seit Jahren wieder regelmäßig Sport machen.'
        },
        {
          speaker: 'Moderator',
          text: 'Was passiert, wenn es regnet?'
        },
        {
          speaker: 'Miriam Stein',
          text: 'Bei leichtem Regen trainieren wir trotzdem. Nur bei Gewitter oder sehr starkem Regen fällt ein Kurs aus. Das erfahren die Teilnehmer am schnellsten auf unserer Internetseite — dort steht spätestens zwei Stunden vorher, ob der Kurs stattfindet.'
        },
        {
          speaker: 'Moderator',
          text: 'Muss man sich für die Kurse anmelden?'
        },
        {
          speaker: 'Miriam Stein',
          text: 'Nein, das ist ja das Schöne: Man kommt einfach vorbei, ganz spontan. Nur eine eigene Matte sollte man zum Yoga mitbringen.'
        },
        {
          speaker: 'Moderator',
          text: 'Und was machen Sie im Winter? Wie geht es mit dem Projekt weiter?'
        },
        {
          speaker: 'Miriam Stein',
          text: 'Von Oktober bis April machen wir eine Pause. Viele wünschen sich zwar ein Winterprogramm in einer Halle, aber dafür fehlt uns bisher das Geld. Dafür wollen wir das Angebot nächstes Jahr auf zwei weitere Stadtteile ausweiten, damit die Wege für alle kürzer werden. Die Gespräche mit der Stadt laufen schon.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Stein, herzlichen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Das Projekt „Sport im Park“ gibt es seit vier Jahren.', answer: false },
        { statement: 'Die Kurse finden nur am Wochenende statt.', answer: false },
        { statement: 'Die Teilnahme an den Kursen ist kostenlos.', answer: true },
        { statement: 'Frau Stein hatte die Idee für das Projekt im Urlaub.', answer: true },
        { statement: 'Die Trainerinnen und Trainer arbeiten ohne Bezahlung.', answer: false },
        { statement: 'Am beliebtesten ist der Yogakurs.', answer: true },
        { statement: 'Bei Gewitter fallen die Kurse aus.', answer: true },
        { statement: 'Wer mitmachen möchte, muss sich vorher anmelden.', answer: false },
        { statement: 'Im Winter gibt es ein Programm in der Halle.', answer: false },
        { statement: 'Das Angebot soll auf weitere Stadtteile ausgeweitet werden.', answer: true }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Das Spiel beginnt später als geplant.',
          answer: true,
          audio:
            'Liebe Zuschauerinnen und Zuschauer, herzlich willkommen im Waldstadion! Eine wichtige Information: Wegen eines langen Staus auf der Autobahn ist die Gastmannschaft noch nicht angekommen. Das Spiel beginnt deshalb erst um 16 Uhr, dreißig Minuten später als geplant. Wir bitten um Ihr Verständnis und wünschen Ihnen trotzdem einen schönen Nachmittag.'
        },
        {
          statement: 'Das Schwimmbad ist heute ganztägig geschlossen.',
          answer: false,
          audio:
            'Liebe Badegäste, bitte beachten Sie: Wegen eines Vereinswettkampfs schließt unser Bad heute bereits um 17 Uhr und nicht wie gewohnt um 22 Uhr. Bitte verlassen Sie die Becken bis 16.45 Uhr. Ab morgen gelten wieder die normalen Öffnungszeiten. Wir danken Ihnen für Ihr Verständnis.'
        },
        {
          statement: 'Das Konzert fällt wegen des Wetters aus.',
          answer: false,
          audio:
            'Liebe Besucherinnen und Besucher, Ihre Aufmerksamkeit bitte! Wegen des angekündigten Gewitters kann das Open-Air-Konzert heute Abend nicht im Schlossgarten stattfinden. Es wird in die Stadthalle verlegt und beginnt dort wie geplant um 20 Uhr. Ihre Eintrittskarten bleiben gültig. Die Stadthalle erreichen Sie in zehn Minuten zu Fuß.'
        },
        {
          statement: 'Die Führung ist im Eintrittspreis enthalten.',
          answer: true,
          audio:
            'Sehr geehrte Besucherinnen und Besucher, in wenigen Minuten beginnt unsere Nachmittagsführung durch die neue Ausstellung „Sport und Stadt“. Treffpunkt ist um 15 Uhr im Foyer am Haupteingang. Die Teilnahme ist im Eintrittspreis bereits enthalten, Sie müssen also nichts extra bezahlen. Die Führung dauert ungefähr eine Stunde.'
        },
        {
          statement: 'Nach dem Konzert fahren zusätzliche Züge.',
          answer: true,
          audio:
            'Meine Damen und Herren, eine Durchsage für alle Konzertbesucher: Nach der Veranstaltung setzen wir heute Nacht zusätzliche Züge in Richtung Hauptbahnhof ein. Die Sonderzüge fahren um 23.15 Uhr, 23.45 Uhr und 0.15 Uhr von Gleis zwei. Für die Rückfahrt gilt Ihre Konzertkarte als Fahrkarte. Gute Heimreise!'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf die E-Mail. Schreiben Sie zu allen vier Leitpunkten — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an den Sportverein',
        situation:
          'Sie sind seit einem Jahr Mitglied im Sportverein TV Eintracht. Heute bekommen Sie eine E-Mail vom Vorsitzenden des Vereins.',
        incoming: {
          von: 'm.lorenz@tv-eintracht.de',
          betreff: 'Sommerfest am 20. Juli — machen Sie mit?',
          text: `Liebe Vereinsmitglieder,

am Samstag, dem 20. Juli, feiern wir ab 14 Uhr unser großes Sommerfest auf dem Sportplatz. Geplant sind Spiele für Kinder, ein kleines Turnier und am Abend Musik.

Damit das Fest gelingt, brauchen wir Ihre Hilfe: Wer kann beim Aufbau am Vormittag helfen oder einen Kuchen für das Buffet mitbringen? Außerdem suchen wir noch Ideen für das Programm.

Bitte schreiben Sie uns bis zum 30. Juni, ob Sie kommen und mit wie vielen Personen.

Mit sportlichen Grüßen
Martin Lorenz
1. Vorsitzender`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Einladung und sagen Sie zu.',
          'Schreiben Sie, mit wie vielen Personen Sie kommen.',
          'Erklären Sie, wobei Sie helfen können.',
          'Machen Sie einen Vorschlag für das Programm.'
        ],
        musterloesung: `Sehr geehrter Herr Lorenz,

vielen Dank für die Einladung zum Sommerfest — ich habe mich sehr darüber gefreut und komme gern.

Ich bringe meine Frau und unsere beiden Kinder mit, wir sind also vier Personen. Die Kinder freuen sich schon jetzt auf die Spiele.

Gern helfe ich auch mit: Am Vormittag habe ich Zeit und kann ab 10 Uhr beim Aufbau der Zelte und Tische dabei sein. Außerdem bringt meine Frau einen Apfelkuchen für das Buffet mit.

Für das Programm hätte ich noch eine Idee: Wie wäre es mit einem Elfmeterschießen für Eltern und Kinder? Das hat bei unserem letzten Fest allen viel Spaß gemacht.

Ich freue mich auf das Fest und wünsche Ihnen viel Erfolg bei der Vorbereitung.

Mit freundlichen Grüßen
Karim Said`
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
      punkte: ['Name', 'Wohnort', 'Familie', 'Beruf oder Ausbildung', 'Sprachen', 'Hobbys und Sport'],
      redemittel: [
        'Darf ich mich vorstellen? Ich heiße …',
        'Wie lange wohnen Sie schon in …?',
        'Was machen Sie beruflich? / Was studieren Sie?',
        'Treiben Sie Sport? / Haben Sie ein Hobby?',
        'In meiner Freizeit gehe ich gern … / spiele ich …',
        'Wirklich? Das interessiert mich auch!'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Gespräch über ein Thema',
      anweisung:
        'Sie haben in einer Zeitung gelesen: „Viele Menschen verbringen ihre Freizeit fast nur noch vor dem Bildschirm.“ Berichten Sie: Wie verbringen Sie und die Menschen in Ihrem Land die Freizeit? Sagen Sie Ihre Meinung: Welche Vorteile und Nachteile haben Fernsehen, Internet und Computerspiele in der Freizeit?',
      punkte: [
        'Berichten Sie, wie Sie selbst Ihre Freizeit verbringen.',
        'Wie verbringen die Menschen in Ihrem Heimatland ihre Freizeit?',
        'Nennen Sie Vorteile UND Nachteile der Freizeit am Bildschirm.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'In meiner Freizeit … ich am liebsten …',
        'Bei uns in … verbringen viele Leute ihre Freizeit mit …',
        'Ein großer Vorteil ist, dass …',
        'Andererseits finde ich es problematisch, dass …',
        'Und Sie? Sitzen Sie auch oft vor dem Bildschirm?',
        'Da haben Sie recht. / Das sehe ich anders, denn …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Sie möchten mit Ihrem Deutschkurs am Samstag einen Sportnachmittag im Stadtpark organisieren. Planen Sie den Nachmittag gemeinsam.',
      punkte: [
        'Um wie viel Uhr treffen Sie sich, und wo genau im Park?',
        'Welche Spiele oder Sportarten bieten Sie an?',
        'Essen und Getränke — wer bringt was mit?',
        'Was machen Sie, wenn es regnet?'
      ],
      redemittel: [
        'Ich schlage vor, dass wir uns um … treffen.',
        'Wie wäre es mit Volleyball oder Federball?',
        'Gute Idee! / Das finde ich nicht so gut, weil …',
        'Wer bringt die Getränke mit? — Das übernehme ich.',
        'Falls es regnet, könnten wir …',
        'Einverstanden, dann machen wir es so!'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
