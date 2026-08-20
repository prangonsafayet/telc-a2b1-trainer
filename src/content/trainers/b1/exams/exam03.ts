import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 3,
  level: 'b1',
  title: 'Modelltest 3',
  theme: 'Gesundheit & Ernährung',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Zu wenig Schlaf macht krank, warnen Forscher',
        'Neue Sporthalle öffnet im Herbst',
        'Immer mehr Deutsche kaufen Bio-Lebensmittel',
        'Apotheken bieten jetzt auch Impfungen an',
        'Zucker in Getränken: Ärzte fordern eine Steuer',
        'Kochen mit Kindern: Neues Kursangebot der Familienbildung',
        'Hausärzte auf dem Land werden knapp',
        'Stadtlauf bricht alle Rekorde',
        'Kantinenessen wird gesünder — und beliebter',
        'Weniger Jugendliche rauchen als früher'
      ],
      texts: [
        'Wie viel Schlaf braucht der Mensch? Wissenschaftler der Universität Bremen haben dazu über zehntausend Erwachsene untersucht. Das Ergebnis: Wer dauerhaft weniger als sechs Stunden pro Nacht schläft, wird häufiger krank und kann sich schlechter konzentrieren. Die Forscher empfehlen sieben bis acht Stunden — und raten, das Handy nachts aus dem Schlafzimmer zu verbannen.',
        'In vielen Dörfern wird es schwer, einen Arzt zu finden: Fast die Hälfte der Hausärzte auf dem Land ist über sechzig und findet keinen Nachfolger. Junge Medizinerinnen und Mediziner bleiben lieber in den Großstädten. Einige Gemeinden zahlen deshalb inzwischen Prämien oder bieten günstige Praxisräume an, um Ärzte aufs Land zu holen.',
        'Obwohl die Preise gestiegen sind, greifen die Deutschen im Supermarkt immer öfter zu Produkten aus ökologischer Landwirtschaft. Nach einer aktuellen Umfrage kauft mehr als die Hälfte der Haushalte regelmäßig Bio-Eier, Bio-Gemüse oder Bio-Milch. Die wichtigsten Gründe: Die Kunden möchten sich gesund ernähren und die Umwelt schonen. Am liebsten kaufen sie regionale Produkte.',
        'So viele waren es noch nie: Beim fünfzehnten Stadtlauf am Sonntag gingen mehr als siebentausend Läuferinnen und Läufer an den Start — zweitausend mehr als im letzten Jahr. Bei bestem Wetter führte die Strecke durch die Altstadt und den Schlosspark. Ein Teil des Startgeldes geht an den Kinderschutzbund. Die Sieger kamen aus Kenia und aus Polen.',
        'Currywurst mit Pommes war gestern: Die Kantine der Stadtwerke hat ihre Karte umgestellt. Es gibt jetzt jeden Tag ein vegetarisches Gericht, mehr Salate und weniger Fertigprodukte. Anfangs gab es Kritik von der Belegschaft — inzwischen kommen aber deutlich mehr Mitarbeiterinnen und Mitarbeiter zum Mittagessen als vorher. Andere Firmen haben schon nachgefragt, wie das gelungen ist.'
      ],
      answers: [0, 6, 2, 7, 8]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Sport auf Rezept',
      text: `Wer krank ist, bekommt vom Arzt normalerweise Tabletten. In Halden verschreiben viele Ärztinnen und Ärzte seit zwei Jahren etwas anderes: Bewegung. „Sport auf Rezept“ heißt das Programm, das die Stadt zusammen mit den Krankenkassen und den Sportvereinen entwickelt hat.

Und so funktioniert es: Wer zum Beispiel Rückenschmerzen, leichtes Übergewicht oder zu hohen Blutdruck hat, bekommt vom Hausarzt ein Rezept für einen Bewegungskurs. Zwölf Wochen lang trainieren die Teilnehmer dann zweimal pro Woche in kleinen Gruppen — unter Anleitung von speziell ausgebildeten Trainern. Die Krankenkasse übernimmt den größten Teil der Kosten, die Teilnehmer zahlen nur zwanzig Euro.

Einer von ihnen ist Hasan Yilmaz, 54, Busfahrer. „Ich sitze den ganzen Tag, und mein Rücken hat immer wehgetan“, erzählt er. „Tabletten haben nur kurz geholfen.“ Seit einem halben Jahr macht er beim Programm mit. Die Schmerzen sind deutlich weniger geworden, und er hat fünf Kilo abgenommen. „Am Anfang musste mich meine Frau fast zwingen. Heute möchte ich das Training nicht mehr missen.“

Ein Problem gibt es allerdings: Viele Teilnehmer hören auf, sobald der Kurs zu Ende ist. Die Sportvereine bieten deshalb jetzt spezielle Anschlussgruppen an, in denen man für wenig Geld weitertrainieren kann. Herr Yilmaz hat sich schon angemeldet.

Die Stadt ist zufrieden: Über achthundert Menschen haben bisher ein Rezept für Bewegung bekommen. Im nächsten Jahr sollen auch Kurse speziell für ältere Menschen und für Kinder mit Übergewicht dazukommen.`,
      questions: [
        {
          frage: 'Beim Programm „Sport auf Rezept“ …',
          options: [
            'verschreiben Ärzte Bewegungskurse statt Tabletten.',
            'bekommen Patienten kostenlose Medikamente.',
            'müssen Patienten allein zu Hause trainieren.'
          ],
          answer: 0
        },
        {
          frage: 'Die Teilnehmer der Kurse …',
          options: [
            'zahlen die Kurse komplett selbst.',
            'zahlen nur einen kleinen Teil der Kosten.',
            'bekommen Geld von der Stadt.'
          ],
          answer: 1
        },
        {
          frage: 'Herr Yilmaz …',
          options: [
            'hatte wegen seiner Arbeit oft Rückenschmerzen.',
            'hat durch Tabletten dauerhaft keine Schmerzen mehr.',
            'wollte von Anfang an unbedingt mitmachen.'
          ],
          answer: 0
        },
        {
          frage: 'Nach dem Ende des Kurses …',
          options: [
            'trainieren alle Teilnehmer automatisch weiter.',
            'hören viele Teilnehmer mit dem Sport auf.',
            'müssen die Teilnehmer in ein Fitnessstudio wechseln.'
          ],
          answer: 1
        },
        {
          frage: 'Im nächsten Jahr …',
          options: [
            'endet das Programm.',
            'steigen die Preise für die Teilnehmer.',
            'soll es neue Kurse für Ältere und für Kinder geben.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ein Kollege hat vom langen Sitzen im Büro oft Rückenschmerzen und möchte etwas dagegen tun.',
        'Ihre Großmutter kann das Haus kaum verlassen, braucht aber regelmäßig ihre Medikamente.',
        'Ihre Tochter (6) soll endlich schwimmen lernen.',
        'Sie möchten etwas gegen Stress tun und suchen einen Entspannungskurs am Morgen.',
        'Ein Freund hat eine Lebensmittelallergie und weiß nicht genau, was er essen darf.',
        'Sie sind neu in der Stadt und suchen eine Arztpraxis, die noch Patienten annimmt.',
        'Sie möchten lernen, leckere Gerichte ohne Fleisch zu kochen.',
        'Sie hätten gern frisches Gemüse aus der Region, haben aber wenig Zeit zum Einkaufen.',
        'Sie möchten regelmäßig joggen, aber nicht allein laufen.',
        'Ihr Mann hat große Angst vorm Zahnarzt, braucht aber dringend eine Behandlung.'
      ],
      ads: [
        'Yogastudio Balance: Entspannung für Körper und Geist — Anfängerkurse täglich um 7 und um 19 Uhr, die erste Stunde ist kostenlos!',
        'Hausarztpraxis Dr. Weber: Wir nehmen neue Patientinnen und Patienten auf! Termine auch samstags, alle Kassen, barrierefreier Zugang.',
        'Lauftreff Südpark: Gemeinsam macht Joggen mehr Spaß! Jeden Mittwoch um 18 Uhr, Gruppen für alle Niveaus, Teilnahme kostenlos.',
        'Kochkurs „Vegetarisch genießen“: An vier Abenden zeigen wir Ihnen fleischlose Gerichte für den Alltag — alle Zutaten inklusive.',
        'Ernährungsberatung Vital: Individuelle Beratung bei Allergien und Unverträglichkeiten. Viele Krankenkassen übernehmen einen Teil der Kosten.',
        'Bio-Kiste Grünland: Frisches Obst und Gemüse von Höfen aus der Region — jede Woche bequem bis an Ihre Haustür geliefert.',
        'Fitnessstudio 24: Trainieren rund um die Uhr an modernen Geräten! Probemonat für nur 19 €, keine Vertragsbindung.',
        'Schwimmschule Delfin: Schwimmkurse für Kinder ab fünf Jahren in kleinen Gruppen — geduldige Trainer, Abzeichen am Kursende.',
        'Apotheke am Markt: Unser Lieferservice bringt Ihnen Ihre Medikamente nach Hause — einfach bis 16 Uhr anrufen, Lieferung noch am selben Tag.',
        'Zahnarztpraxis Dr. Lindner: Angstpatienten sind bei uns in guten Händen — einfühlsame Behandlung, auf Wunsch Termine am Abend.',
        'Rückenschule im Gesundheitszentrum: Zehn Abende Übungen und Tipps für alle, die viel am Schreibtisch sitzen. Die Krankenkasse erstattet die Gebühr.',
        'Restaurant Grüner Garten: Täglich wechselndes veganes Mittagsmenü, auch zum Mitnehmen — direkt am Rathausplatz.'
      ],
      answers: [10, 8, 7, 0, 4, 1, 3, 5, 2, 9]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Frau Albrecht,

vielen Dank für Ihre E-Mail mit den Informationen [1] Ihrem Kursprogramm. Ich habe mich sehr [2] gefreut.

Leider kann ich am ersten Kurstermin nicht teilnehmen, [3] ich beruflich verreisen muss. Wäre es möglich, dass ich erst in der zweiten Woche [4]?

Außerdem habe ich eine Frage: Meine Ärztin hat mir mehr Bewegung [5]. Wissen Sie, [6] meine Krankenkasse einen Teil der Kursgebühr übernimmt?

Ich habe vor einigen Jahren schon einmal einen Yogakurs besucht, aber das ist lange [7]. Ich hoffe, dass der Kurs auch für Anfänger geeignet ist. Können Sie mir noch sagen, [8] ich zum Kurs mitbringen soll — zum Beispiel eine eigene Matte?

Bitte schicken Sie mir die Anmeldebestätigung [9] E-Mail. Ich freue mich schon [10] die erste Stunde!

Mit freundlichen Grüßen
Sofia Ricci`,
      gaps: [
        { options: ['an', 'zu', 'für'], answer: 1 },
        { options: ['darauf', 'darüber', 'damit'], answer: 1 },
        { options: ['denn', 'deshalb', 'weil'], answer: 2 },
        { options: ['anfange', 'anfangen', 'angefangen'], answer: 0 },
        { options: ['empfehlen', 'empfohlen', 'empfiehlt'], answer: 1 },
        { options: ['ob', 'dass', 'wenn'], answer: 0 },
        { options: ['her', 'hin', 'vor'], answer: 0 },
        { options: ['wann', 'was', 'wo'], answer: 1 },
        { options: ['per', 'mit', 'auf'], answer: 0 },
        { options: ['über', 'für', 'auf'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrter Herr Kaufmann,

seit zwei Jahren bin ich [1] in Ihrem Fitnessstudio und war bisher immer sehr zufrieden. Leider muss ich meine [2] jetzt zum 31. Dezember kündigen.

Der [3] ist mein Umzug nach Bremen: Ich habe dort eine neue [4] gefunden und wohne dann über dreihundert Kilometer [5]. Ein Training bei Ihnen ist deshalb leider nicht mehr [6].

Meine Ärztin hat mir geraten, weiter regelmäßig Sport zu [7], weil mein Rücken sonst wieder Probleme macht. Ich werde mir also in Bremen ein neues Studio [8].

Bitte schicken Sie mir eine schriftliche [9] meiner Kündigung. Falls Sie noch Fragen haben, [10] Sie mich gern unter der Nummer 0176 55 33 21 an.

Mit freundlichen Grüßen
Pavel Novak`,
      wordBank: [
        'Bestätigung',
        'dankbar',
        'entfernt',
        'Gesundheit',
        'Grund',
        'Mitglied',
        'Mitgliedschaft',
        'möglich',
        'pünktlich',
        'rufen',
        'Stelle',
        'suchen',
        'treiben',
        'Verein',
        'zahlen'
      ],
      answers: [5, 6, 4, 10, 2, 7, 12, 11, 0, 9]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Praxis ist am Donnerstag geschlossen.',
          answer: true,
          audio:
            'Guten Tag, hier ist die Praxis Doktor Hartmann. Diese Nachricht ist für Frau Kowalski: Ihren Termin am Donnerstag um vierzehn Uhr müssen wir leider absagen, weil die Praxis wegen einer Fortbildung ganztägig geschlossen bleibt. Wir bieten Ihnen als Ersatz Freitag um neun Uhr an. Bitte rufen Sie uns kurz zurück, ob das für Sie passt.'
        },
        {
          statement: 'Katja möchte heute Abend zum Volleyballtraining gehen.',
          answer: false,
          audio:
            'Hallo Selma, hier ist Katja. Ich wollte fragen, ob wir heute Abend nicht mal etwas anderes machen: Statt zum Volleyball zu gehen, könnten wir das neue vegetarische Restaurant am Markt ausprobieren. Ich habe gehört, das Essen soll fantastisch sein. Das Training fällt sowieso aus, weil die Halle renoviert wird. Sag mir Bescheid!'
        },
        {
          statement: 'An heißen Tagen soll man weniger trinken als sonst.',
          answer: false,
          audio:
            'Und hier noch unser Gesundheitstipp: Bei diesen sommerlichen Temperaturen vergessen viele Menschen das Trinken. Ärzte empfehlen, an heißen Tagen mindestens zwei bis drei Liter zu trinken — am besten Wasser oder ungesüßten Tee. Warten Sie nicht, bis Sie Durst haben, sondern trinken Sie regelmäßig über den ganzen Tag verteilt.'
        },
        {
          statement: 'Das Medikament kann noch heute abgeholt werden.',
          answer: true,
          audio:
            'Guten Tag, hier spricht die Rosen-Apotheke. Das Medikament, das Sie heute Morgen bestellt haben, ist jetzt da. Sie können es gern noch heute abholen — wir haben bis achtzehn Uhr dreißig geöffnet. Denken Sie bitte daran, das Rezept von Ihrer Ärztin mitzubringen. Bis später, auf Wiederhören!'
        },
        {
          statement: 'Der Termin beim Zahnarzt ist morgen Vormittag.',
          answer: true,
          audio:
            'Guten Tag, hier ist die Zahnarztpraxis Doktor Lindner. Wir möchten Sie an Ihren Termin morgen um Viertel nach neun erinnern. Bitte kommen Sie zehn Minuten früher und bringen Sie Ihre Versichertenkarte mit. Falls Sie den Termin nicht wahrnehmen können, sagen Sie bitte bis heute Abend telefonisch Bescheid.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Willkommen bei „Mahlzeit!“, unserer Sendung rund ums Essen. Mein Gast ist heute Markus Weiß, Koch an der Gesamtschule Am Park. Herr Weiß, wie lange kochen Sie schon für Schülerinnen und Schüler?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Seit acht Jahren. Davor habe ich lange in einem Hotelrestaurant gearbeitet, aber die Arbeitszeiten dort waren nichts für ein Familienleben.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Vor drei Jahren haben Sie die Mensa komplett umgestellt. Was war vorher anders?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Früher wurde das Essen fertig geliefert, wir haben es nur noch warm gemacht. Heute kochen wir jeden Tag frisch, und das Gemüse kommt von Bauern aus der Region.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie haben die Schülerinnen und Schüler reagiert?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Ehrlich gesagt: erst einmal skeptisch. Viele sind in der Pause lieber zum Supermarkt gegangen. Aber das hat sich geändert — heute verkaufen wir vierhundertfünfzig Essen am Tag, doppelt so viele wie früher.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was kostet ein Mittagessen bei Ihnen?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Vier Euro zwanzig. Familien mit wenig Geld zahlen aber nur einen Euro — den Rest übernimmt die Stadt. Beim Essen soll niemand draußen bleiben.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Dürfen die Schüler mitentscheiden, was auf den Tisch kommt?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Unbedingt! Es gibt einen Mensa-Rat, der jeden Monat über den Speiseplan abstimmt. Und mittwochs leite ich eine Koch-AG, da stehen die Schüler selbst am Herd.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie oft gibt es bei Ihnen Fleisch?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Nur noch zweimal pro Woche. Am Anfang gab es deshalb Beschwerden. Aber inzwischen ist unser beliebtester Tag ausgerechnet der Mittwoch — da gibt es nämlich den vegetarischen Burger.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Ein großes Thema ist ja, dass in Kantinen viel Essen weggeworfen wird.'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Genau. Wir haben ein Jahr lang gewogen, was übrig bleibt. Jetzt geben wir kleinere Portionen aus — und wer noch Hunger hat, bekommt kostenlos Nachschlag. So werfen wir nur noch halb so viel weg.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und was planen Sie als Nächstes?'
        },
        {
          speaker: 'Markus Weiß',
          text: 'Im Frühjahr legen wir zusammen mit den Biologieklassen einen Schulgarten an. Kräuter, Tomaten, Salat — die Schüler sollen sehen, wo das Essen herkommt, bevor es auf dem Teller liegt.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Herr Weiß, vielen Dank für das Gespräch — und guten Appetit!'
        }
      ],
      statements: [
        { statement: 'Herr Weiß arbeitet seit mehr als zehn Jahren an der Schule.', answer: false },
        { statement: 'Vor seiner Zeit an der Schule hat Herr Weiß in einem Hotel gearbeitet.', answer: true },
        { statement: 'Früher wurde das gelieferte Essen in der Mensa nur warm gemacht.', answer: true },
        { statement: 'Die Schüler waren von der Umstellung sofort begeistert.', answer: false },
        { statement: 'Die Mensa verkauft heute doppelt so viele Essen wie früher.', answer: true },
        { statement: 'Alle Schüler zahlen den gleichen Preis für das Mittagessen.', answer: false },
        { statement: 'Ein Schülerrat stimmt regelmäßig über den Speiseplan ab.', answer: true },
        { statement: 'Fleisch steht jeden Tag auf dem Speiseplan.', answer: false },
        { statement: 'Wer noch Hunger hat, bekommt gratis eine zweite Portion.', answer: true },
        { statement: 'Der Schulgarten ist bereits fertig.', answer: false }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Kunden bekommen für den zurückgegebenen Joghurt ihr Geld zurück.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden, eine wichtige Information: Der Hersteller ruft den Erdbeerjoghurt der Marke „Landgut“ mit dem Haltbarkeitsdatum zwölfter September zurück. Bitte essen Sie diesen Joghurt nicht. Sie können ihn an der Information zurückgeben — den Kaufpreis erstatten wir Ihnen selbstverständlich auch ohne Kassenbon.'
        },
        {
          statement: 'Die Besucher dürfen bis zwanzig Uhr auf den Stationen bleiben.',
          answer: false,
          audio:
            'Sehr geehrte Besucherinnen und Besucher, in wenigen Minuten enden die heutigen Besuchszeiten. Wir bitten Sie, die Stationen bis neunzehn Uhr zu verlassen, damit unsere Patientinnen und Patienten zur Ruhe kommen. Die Cafeteria im Erdgeschoss ist noch bis zwanzig Uhr geöffnet. Wir danken für Ihr Verständnis und wünschen einen guten Heimweg.'
        },
        {
          statement: 'Der Aqua-Fitness-Kurs findet heute wie geplant statt.',
          answer: false,
          audio:
            'Liebe Sportlerinnen und Sportler, bitte beachten Sie: Der Aqua-Fitness-Kurs um siebzehn Uhr muss heute leider ausfallen, weil die Kursleiterin erkrankt ist. Der Kurs wird am kommenden Montag um dieselbe Uhrzeit nachgeholt. Ihre Kurskarte behält natürlich ihre Gültigkeit. Das Schwimmerbecken steht Ihnen heute uneingeschränkt zur Verfügung.'
        },
        {
          statement: 'Am Stand vierzehn kann man kostenlos den Blutdruck messen lassen.',
          answer: true,
          audio:
            'Meine Damen und Herren, herzlich willkommen auf unserem Gesundheitstag! Um vierzehn Uhr beginnt im großen Saal der Vortrag „Gesund essen im Alltag“. Außerdem können Sie am Stand vierzehn noch bis sechzehn Uhr kostenlos Ihren Blutdruck und Ihren Blutzucker messen lassen. Das Team der Sportvereine finden Sie im Foyer.'
        },
        {
          statement: 'Es gibt heute Rabatt auf Obst und Gemüse aus der Region.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden unseres Biomarktes, heute lohnt sich der Einkauf besonders: Auf sämtliches Obst und Gemüse aus der Region erhalten Sie an der Kasse zwanzig Prozent Rabatt. Probieren Sie auch die frischen Äpfel der neuen Ernte — heute am Probierstand im Eingangsbereich. Wir wünschen Ihnen einen guten Einkauf!'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf die E-Mail. Schreiben Sie zu allen vier Leitpunkten — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an das Gesundheitszentrum',
        situation:
          'Sie haben sich für einen Rückenkurs im Gesundheitszentrum angemeldet. Kurz vor dem Kursbeginn bekommen Sie eine E-Mail.',
        incoming: {
          von: 'info@gesundheitszentrum-mitte.de',
          betreff: 'Ihr Rückenkurs — wichtige Änderung',
          text: `Liebe Teilnehmerin, lieber Teilnehmer,

Sie haben sich für unseren Rückenkurs angemeldet, der am 5. Oktober beginnen sollte. Leider ist unsere Kursleiterin für längere Zeit erkrankt. Wir können Ihnen aber eine Lösung anbieten: Der Kurs findet mit einem neuen Trainer statt — allerdings nicht mehr donnerstags um 18 Uhr, sondern montags um 19.30 Uhr.

Bitte teilen Sie uns bis zum 25. September mit, ob Sie am neuen Termin teilnehmen möchten. Wenn der Termin für Sie nicht passt, bekommen Sie die Kursgebühr selbstverständlich zurück.

Damit sich der neue Trainer vorbereiten kann, schreiben Sie uns bitte auch kurz, welche Beschwerden Sie haben und ob Sie schon Sporterfahrung mitbringen.

Mit freundlichen Grüßen
Ihr Gesundheitszentrum Mitte`
        },
        leitpunkte: [
          'Bedanken Sie sich für die Nachricht.',
          'Sagen Sie, ob der neue Termin für Sie passt, und begründen Sie das.',
          'Beschreiben Sie kurz Ihre Rückenprobleme und Ihre Erfahrung mit Sport.',
          'Stellen Sie eine Frage zum Kurs (zum Beispiel zur Kleidung oder zu den Geräten).'
        ],
        musterloesung: `Sehr geehrte Damen und Herren,

vielen Dank für Ihre E-Mail und für die schnelle Lösung.

Der neue Termin am Montag passt mir sogar besser als der alte, weil ich donnerstags oft lange arbeiten muss. Ich nehme also gern am Kurs teil.

Zu Ihrer Frage: Ich arbeite im Büro und sitze täglich viele Stunden am Computer. Seit ungefähr einem Jahr habe ich deshalb oft Schmerzen im unteren Rücken. Früher bin ich regelmäßig geschwommen, aber im Moment mache ich leider fast keinen Sport.

Eine Frage habe ich noch: Was soll ich zum Kurs mitbringen? Brauche ich eine eigene Matte und ein Handtuch, oder gibt es diese Sachen bei Ihnen?

Vielen Dank im Voraus für Ihre Antwort.

Mit freundlichen Grüßen
Pavel Novak`
      }
    ],
    tipps:
      'Prüfen Sie vor der Abgabe: Anrede und Gruß vorhanden? Alle vier Leitpunkte behandelt? Haben Sie Ihre Aussagen begründet? Verben an der richtigen Position?'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Einander kennenlernen',
      anweisung:
        'Sprechen Sie mit Ihrer Partnerin / Ihrem Partner. Lernen Sie sich kennen. Die folgenden Punkte helfen Ihnen.',
      punkte: ['Name', 'Wohnort und Wohnung', 'Familie', 'Beruf oder Ausbildung', 'Sprachen', 'Freizeit'],
      redemittel: [
        'Entschuldigung, wir kennen uns noch nicht. Ich heiße …',
        'Und woher kommen Sie, wenn ich fragen darf?',
        'Wohnen Sie in der Stadt oder eher außerhalb?',
        'Was machen Sie beruflich? / Studieren Sie noch?',
        'Treiben Sie in Ihrer Freizeit Sport?',
        'Das klingt spannend! Wie sind Sie dazu gekommen?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Über ein Thema sprechen',
      anweisung:
        'Sie haben in einer Zeitschrift gelesen: „Immer mehr Menschen ernähren sich vegetarisch oder essen nur noch selten Fleisch.“ Berichten Sie: Wie ernähren Sie sich, und wie ist das in Ihrem Land? Sagen Sie Ihre Meinung: Welche Vorteile und Nachteile hat eine Ernährung ohne Fleisch?',
      punkte: [
        'Berichten Sie, was Sie selbst gern essen und wie wichtig Ihnen gesunde Ernährung ist.',
        'Wie isst man in Ihrem Heimatland? Welche Rolle spielt Fleisch dort?',
        'Nennen Sie Vorteile UND Nachteile einer vegetarischen Ernährung.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'In dem Artikel geht es darum, dass …',
        'Bei uns zu Hause essen wir meistens …',
        'In meinem Heimatland ist es üblich, dass …',
        'Ein Vorteil ist sicher, dass … / Allerdings …',
        'Essen Sie selbst Fleisch? Was meinen Sie dazu?',
        'Da bin ich ganz Ihrer Meinung. / Das überzeugt mich nicht ganz, weil …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'In Ihrer Stadt findet in zwei Monaten ein Stadtlauf für einen guten Zweck statt. Sie möchten zusammen mit Ihrer Partnerin / Ihrem Partner daran teilnehmen. Planen Sie die Teilnahme gemeinsam.',
      punkte: [
        'Laufen Sie die kurze Strecke (fünf Kilometer) oder die lange (zehn Kilometer)?',
        'Wie und wann trainieren Sie vorher zusammen?',
        'Wer kümmert sich um die Anmeldung, und was kostet sie?',
        'Was machen Sie nach dem Lauf?'
      ],
      redemittel: [
        'Was halten Sie davon, wenn wir die kurze Strecke laufen?',
        'Wir könnten zweimal pro Woche zusammen trainieren, zum Beispiel …',
        'Gute Idee! / Da bin ich dabei!',
        'Ich würde lieber …, weil …',
        'Um die Anmeldung kann ich mich kümmern.',
        'Prima, dann steht unser Plan!'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
