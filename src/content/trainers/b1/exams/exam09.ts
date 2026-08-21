import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 9,
  level: 'b1',
  title: 'Modelltest 9',
  theme: 'Familie & Zusammenleben',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Immer mehr Väter nehmen Elternzeit',
        'Kita-Plätze: Eltern warten immer länger',
        'Streit unter Nachbarn: Was tun bei Lärm?',
        'Großeltern als Babysitter: Hilfe mit Grenzen',
        'Familienurlaub: Die beliebtesten Reiseziele',
        'Stadt eröffnet neues Familienzentrum',
        'Hausarbeit: Paare teilen sich die Aufgaben noch immer ungleich',
        'Väter und Karriere: Teilzeit bleibt die Ausnahme',
        'Geschwister: Der erste Streit — und die längste Freundschaft',
        'Nachbarschaftshilfe per App: Neue Plattform gestartet'
      ],
      texts: [
        'Rund zwei Drittel der Großeltern in Deutschland betreuen regelmäßig ihre Enkelkinder — ohne diese Hilfe könnten viele Eltern gar nicht arbeiten. Eine neue Umfrage zeigt aber auch: Fast die Hälfte der Befragten fühlt sich manchmal überfordert und sagt das aus Rücksicht nicht. Fachleute empfehlen deshalb klare Absprachen — feste Tage, feste Zeiten und ein offenes Gespräch, wenn es zu viel wird.',
        'Nach neuen Zahlen des Statistischen Amtes bleiben immer mehr Männer nach der Geburt ihres Kindes zu Hause. Jeder vierte Vater beantragt inzwischen Elternzeit — vor zehn Jahren war es nur jeder zehnte. Allerdings bleiben die meisten Väter nur zwei Monate zu Hause, während Mütter im Durchschnitt ein Jahr pausieren. Experten fordern deshalb bessere Bedingungen für Familien.',
        'Wer trägt der alten Dame von nebenan den Einkauf in den vierten Stock? Wer leiht einen Werkzeugkasten? Die neue kostenlose App „Nebenan aktiv“ bringt Menschen aus demselben Viertel zusammen, die sich gegenseitig unterstützen möchten. Schon in der ersten Woche haben sich über zweitausend Nutzerinnen und Nutzer angemeldet. Die Stadt unterstützt das Projekt.',
        'Kochen, putzen, Wäsche waschen: Eine aktuelle Untersuchung zeigt, dass Frauen in Deutschland pro Tag fast zwei Stunden mehr im Haushalt arbeiten als ihre Partner — auch dann, wenn beide berufstätig sind. Zwar sagen die meisten Paare, sie wollten sich die Arbeit fair teilen. Im Alltag klappt das aber offenbar selten.',
        'Beratung für Eltern, eine Krabbelgruppe für die Kleinsten und ein offenes Café für alle: Am Samstag eröffnet die Stadt in der Bahnhofstraße ein neues Zentrum für Familien. Dort finden Mütter und Väter künftig alle Angebote an einem Ort — von der Hebammensprechstunde bis zum Erste-Hilfe-Kurs am Kind. Zur Eröffnung gibt es ein Fest mit Kinderprogramm.'
      ],
      answers: [3, 0, 9, 6, 5]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ein Haus für Jung und Alt',
      text: `Vormittags üben Seniorinnen mit Grundschulkindern Lesen, nachmittags reparieren Jugendliche gemeinsam mit Rentnern Fahrräder, und im Café sitzen junge Mütter neben achtzigjährigen Nachbarn: Im Mehrgenerationenhaus „Am Weinberg“ in Kassel begegnen sich Menschen, die sich im Alltag sonst kaum treffen würden. Das offene Café ist das Herz des Hauses — hierher kann jeder ohne Anmeldung kommen.

„Früher lebten Großeltern, Eltern und Kinder oft unter einem Dach und halfen sich gegenseitig“, sagt die Leiterin Petra Hoffmann. „Heute wohnen die Generationen häufig weit voneinander entfernt. Wir holen ein Stück davon zurück.“ Mehr als vierzig Ehrenamtliche organisieren die Angebote: einen günstigen Mittagstisch, Computerkurse für Ältere, eine Krabbelgruppe und Hausaufgabenhilfe für Schulkinder. Geöffnet ist das Haus an sechs Tagen in der Woche, und fast alle Angebote kosten nichts oder nur sehr wenig.

Von diesem Austausch profitieren alle Seiten. Die 74-jährige Helga Brandt kommt dreimal in der Woche: „Meine Enkel leben in Kanada. Wenn ich hier mit den Kindern spiele, fühle ich mich gebraucht.“ Die Studentin Merve Aslan wiederum spart Geld, weil sie im Haus günstig zu Mittag isst — und von einem früheren Finanzbeamten bekam sie sogar Hilfe bei ihrer Steuererklärung.

Finanziert wird das Haus von der Stadt und durch Spenden, das Geld ist allerdings knapp. Trotzdem gibt es Pläne für das nächste Jahr: Hinter dem Haus soll ein Garten entstehen, in dem Jung und Alt gemeinsam Gemüse anbauen können. „Die Nachfrage ist riesig“, sagt Hoffmann. „Viele Besucher sagen uns: Dieses Haus ist wie eine große Familie.“`,
      questions: [
        {
          frage: 'Das Café im Mehrgenerationenhaus …',
          options: [
            'ist nur für angemeldete Gruppen geöffnet.',
            'steht allen Besuchern offen.',
            'öffnet nur am Vormittag.'
          ],
          answer: 1
        },
        {
          frage: 'Frau Hoffmann sagt, dass …',
          options: [
            'die Generationen heute oft weit voneinander entfernt wohnen.',
            'Großeltern früher weniger geholfen haben als heute.',
            'Familien heute wieder häufiger zusammenwohnen.'
          ],
          answer: 0
        },
        {
          frage: 'Helga Brandt kommt in das Haus, weil …',
          options: [
            'ihre Enkel dort betreut werden.',
            'sie sich dort gebraucht fühlt.',
            'sie dort Computerkurse gibt.'
          ],
          answer: 1
        },
        {
          frage: 'Merve Aslan …',
          options: [
            'hilft Rentnern bei der Steuererklärung.',
            'kocht für den Mittagstisch.',
            'isst im Haus günstig zu Mittag.'
          ],
          answer: 2
        },
        {
          frage: 'Im nächsten Jahr …',
          options: [
            'soll ein gemeinsamer Garten entstehen.',
            'muss das Haus wegen Geldmangels schließen.',
            'zieht das Haus in ein neues Gebäude.'
          ],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie suchen für Samstagabend einen Babysitter für Ihre Tochter (3).',
        'Ihre Großmutter braucht vormittags Hilfe im Haushalt.',
        'Sie ziehen nächsten Monat um und suchen Helfer mit einem Transporter.',
        'Ihr Sohn (13) hat Probleme in Mathematik und braucht Unterstützung.',
        'Sie möchten mit Ihrem kleinen Kind andere Eltern und Kinder treffen.',
        'Sie suchen einen Raum für eine Familienfeier mit vierzig Personen.',
        'Sie erwarten ein Baby und möchten günstig gebrauchte Kindersachen kaufen.',
        'Ihre Eltern möchten zu ihrem 40. Hochzeitstag schöne Fotos machen lassen.',
        'Ihr Nachbar ist neu in Deutschland und sucht Kontakt zu anderen Familien.',
        'Sie arbeiten wieder und suchen für Ihren Sohn (7) eine Betreuung am Nachmittag.'
      ],
      ads: [
        'Gasthof Zur Linde: Feiern Sie bei uns! Gemütlicher Saal für bis zu 60 Personen, Menüs ab 25 Euro, große Terrasse.',
        'Nachhilfe-Insel: Mathe, Deutsch und Englisch für die Klassen 5 bis 10 — Einzelunterricht bei Ihnen zu Hause, erste Stunde gratis.',
        'Möbel-Discount: Alles fürs Kinderzimmer — neue Betten, Schränke und Schreibtische zu kleinen Preisen. 0%-Finanzierung möglich!',
        'Familiencafé International: Treffpunkt für Familien aus aller Welt — jeden Freitagnachmittag, Eintritt frei. Deutschkenntnisse nicht nötig!',
        'Hilfe-Zentrale: Zuverlässige Haushaltshilfen für Seniorinnen und Senioren — putzen, waschen, einkaufen. Stundenweise, auch vormittags.',
        'Zwei starke Studenten mit großem Transporter helfen bei Ihrem Umzug — auch am Wochenende, faire Preise, kurzfristig möglich.',
        'Fotostudio Lichtblick: Familien- und Paarfotos zu allen Anlässen, auch zu Jubiläen. Termine am Wochenende möglich.',
        'Zwergenstube: Eltern-Kind-Gruppe für Kinder von 1 bis 3 Jahren — singen, spielen und Kaffee trinken, dienstags im Gemeindehaus.',
        'Erfahrene Erzieherin betreut Ihre Kinder abends und am Wochenende bei Ihnen zu Hause. Auch kurzfristig, Referenzen vorhanden.',
        'Second-Hand-Laden „Kleine Preise“: Gut erhaltene Baby- und Kinderkleidung, Kinderwagen und Spielzeug — Ankauf und Verkauf.',
        'Blitz-Reinigung GmbH: Professionelle Reinigung für Büros und Praxen — täglich, wöchentlich oder monatlich. Angebot anfordern!',
        'Schülertreff Regenbogen: Betreuung für Grundschulkinder nach dem Unterricht bis 17 Uhr — mit Mittagessen und Hausaufgabenhilfe.'
      ],
      answers: [8, 4, 5, 1, 7, 0, 9, 6, 3, 11]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Liebe Tante Karin,

vielen Dank für deinen lieben Brief! Entschuldige, dass ich erst jetzt antworte — bei uns war in den letzten Wochen sehr viel los. Wie du weißt, [1] wir vor zwei Wochen umgezogen. Die neue Wohnung ist größer [2] die alte und hat sogar einen Balkon.

Die Kinder mussten zwar die Schule wechseln, [3] sie haben schon neue Freunde gefunden. Lea spielt jeden Nachmittag mit einem Mädchen, [4] Familie im Erdgeschoss wohnt. Unsere Nachbarn haben uns beim Einzug übrigens sehr [5]. Deshalb laden wir sie am Samstag [6] einem kleinen Fest ein.

Es wäre schön, [7] du auch kommen könntest! Du kannst gern bei [8] übernachten, das Gästezimmer ist schon fertig. Papa holt dich auch vom Bahnhof ab, wenn du uns sagst, wann dein Zug [9].

Ich freue mich schon sehr [10] deinen Besuch!

Liebe Grüße
deine Nichte Sofia`,
      gaps: [
        { options: ['haben', 'sind', 'werden'], answer: 1 },
        { options: ['als', 'wie', 'so'], answer: 0 },
        { options: ['sondern', 'aber', 'denn'], answer: 1 },
        { options: ['dessen', 'die', 'deren'], answer: 0 },
        { options: ['geholfen', 'helfen', 'hilft'], answer: 0 },
        { options: ['für', 'zu', 'auf'], answer: 1 },
        { options: ['ob', 'wenn', 'dass'], answer: 1 },
        { options: ['wir', 'unser', 'uns'], answer: 2 },
        { options: ['ankommt', 'ankommen', 'kommt an'], answer: 0 },
        { options: ['über', 'um', 'auf'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Frau Albers,

im Familienzentrum habe ich einen [1] über Ihre Ferienbetreuung im August gelesen. Mein Sohn Ben ist sieben Jahre alt und geht in die erste [2]. Da mein Mann und ich im August beide arbeiten [3], suchen wir für zwei Wochen eine Betreuung.

Könnten Sie mir bitte [4], ob in der zweiten und dritten Augustwoche noch Plätze frei sind? Außerdem habe ich eine [5] zum Mittagessen: Ben verträgt keine Milch. Ist es möglich, dafür eine [6] zu finden?

Ben schwimmt außerdem noch nicht sicher. Ich habe gelesen, dass die Gruppe auch ins Schwimmbad geht — bitte geben Sie den Betreuerinnen und Betreuern [7]. Die [8] von 80 Euro pro Woche überweise ich gern im Voraus.

Bitte schicken Sie mir das Anmeldeformular per [9]. Herzlichen [10] für Ihre Hilfe!

Mit freundlichen Grüßen
Olena Kovalenko`,
      wordBank: [
        'Antwort',
        'Aushang',
        'Bescheid',
        'Dank',
        'erlauben',
        'Frage',
        'Gebühr',
        'Klasse',
        'Lösung',
        'mitteilen',
        'müssen',
        'Post',
        'sollen',
        'Termin',
        'Wunsch'
      ],
      answers: [1, 7, 10, 9, 5, 8, 2, 6, 11, 3]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Anrufer bittet seine Schwester, einen Nachtisch mitzubringen.',
          answer: true,
          audio:
            'Hallo Julia, hier ist Stefan. Ich wollte dir nur sagen: Das Essen bei Mama und Papa am Sonntag beginnt schon um zwölf, nicht erst um eins. Mama kocht ihren berühmten Braten. Kannst du vielleicht einen Nachtisch mitbringen? Vielleicht deinen Schokoladenpudding, den mögen ja alle. Bis Sonntag, tschüss!'
        },
        {
          statement: 'Die Kita ist am Freitag wegen Krankheit geschlossen.',
          answer: false,
          audio:
            'Guten Tag, hier ist der Anrufbeantworter der Kindertagesstätte Sonnenblume. Liebe Eltern, bitte denken Sie daran: Am kommenden Freitag bleibt unsere Kita ganztägig geschlossen, weil das gesamte Team an einer Fortbildung teilnimmt. Ab Montag sind wir wieder wie gewohnt ab sieben Uhr für Ihre Kinder da. Vielen Dank für Ihr Verständnis.'
        },
        {
          statement: 'Laut der Studie essen die meisten Familien jeden Abend zusammen.',
          answer: false,
          audio:
            'Und nun ein Thema aus dem Familienleben: Eine neue Studie zeigt, dass gemeinsame Mahlzeiten in deutschen Familien immer seltener werden. Nur noch jede dritte Familie isst abends zusammen am Tisch. Als Gründe nennen die Befragten lange Arbeitszeiten und die vielen Termine der Kinder. Forscher empfehlen, wenigstens am Wochenende gemeinsam zu essen.'
        },
        {
          statement: 'Die Großmutter kann am Donnerstag nicht auf die Kinder aufpassen.',
          answer: true,
          audio:
            'Hallo Sandra, hier ist Oma. Du, es tut mir schrecklich leid, aber am Donnerstag kann ich doch nicht auf Max und Lina aufpassen. Ich habe einen Termin beim Augenarzt bekommen, auf den ich schon seit Monaten warte. Am Freitag hätte ich aber den ganzen Nachmittag Zeit. Ruf mich doch bitte kurz an. Küsschen!'
        },
        {
          statement: 'Am Dienstagvormittag gibt es im Haus kein Wasser.',
          answer: true,
          audio:
            'Guten Tag, hier spricht Herr Wolf von der Hausverwaltung Lindenhof. Diese Nachricht geht an alle Mieterinnen und Mieter: Am Dienstag wird zwischen acht und zwölf Uhr das Wasser im ganzen Haus abgestellt, weil wir die alten Leitungen im Keller erneuern. Bitte füllen Sie sich vorher etwas Wasser ab. Vielen Dank für Ihr Verständnis.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Willkommen zu unserer Reihe „Familie heute“! Mein Gast ist Jan Krüger. Herr Krüger, Sie sind zurzeit in Elternzeit. Erzählen Sie doch kurz: Wie ist Ihre Situation?'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Gern. Ich bin Bankkaufmann und Vater einer Tochter — Emma ist jetzt vierzehn Monate alt. Ich habe mich entschieden, ein ganzes Jahr Elternzeit zu nehmen. Meine Frau arbeitet seitdem wieder in ihrem Beruf als Ärztin.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Ein ganzes Jahr — das machen nicht viele Väter. Wie haben Ihr Chef und die Kollegen reagiert?'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Mein Chef hat sofort gesagt: „Machen Sie das, die Zeit kommt nie zurück.“ Das hat mich wirklich gefreut. Einige Kollegen waren allerdings überrascht, einer meinte sogar, das sei mutig. Für Mütter ist ein Jahr normal, für Väter offenbar immer noch nicht.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie sieht denn Ihr Alltag mit Emma aus?'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Wir stehen früh auf, dann koche ich Brei, und vormittags gehen wir oft in eine Krabbelgruppe. Dort bin ich übrigens fast immer der einzige Mann. Nachmittags schläft Emma, dann erledige ich den Haushalt, und danach gehen wir auf den Spielplatz.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was ist für Sie das Schwierigste an der Elternzeit?'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Ehrlich gesagt: Die Tage sind anstrengender als mein Bürojob. Man hat nie Pause und sehr wenig Zeit für sich selbst. Trotzdem bereue ich die Entscheidung keine Sekunde — ich erlebe jeden Fortschritt meiner Tochter mit.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und wie kommen Sie finanziell zurecht? Das Elterngeld ist ja weniger als ein Gehalt.'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Das stimmt, wir haben jetzt deutlich weniger Geld. Aber wir haben vor der Elternzeit ein Jahr lang gespart, deshalb kommen wir gut zurecht. Man muss das einfach früh planen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was raten Sie anderen Vätern?'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Sprecht früh mit eurem Arbeitgeber — und nehmt euch richtig Zeit! Zwei Monate sind besser als nichts, aber ich empfehle mindestens ein halbes Jahr. Erst dann versteht man wirklich, was zu Hause alles zu tun ist.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie geht es nach der Elternzeit für Sie weiter?'
        },
        {
          speaker: 'Jan Krüger',
          text: 'Ich gehe zurück in die Bank, aber nicht mehr in Vollzeit — ich werde nur noch dreißig Stunden pro Woche arbeiten, damit ich die Nachmittage mit Emma verbringen kann. Außerdem schreibe ich im Internet einen Blog über meine Erfahrungen als Vater. Der wird erstaunlich oft gelesen!'
        },
        {
          speaker: 'Moderatorin',
          text: 'Herr Krüger, vielen Dank für diese Einblicke und alles Gute für Sie und Ihre Familie!'
        }
      ],
      statements: [
        { statement: 'Herr Krüger bleibt ein ganzes Jahr zu Hause.', answer: true },
        { statement: 'Seine Frau arbeitet zurzeit nicht.', answer: false },
        { statement: 'Sein Chef hatte kein Verständnis für die Elternzeit.', answer: false },
        { statement: 'In der Krabbelgruppe ist Herr Krüger meistens der einzige Mann.', answer: true },
        {
          statement: 'Er findet die Tage mit seiner Tochter anstrengender als seine Arbeit im Büro.',
          answer: true
        },
        { statement: 'Er bereut seine Entscheidung manchmal.', answer: false },
        { statement: 'Die Familie hat vor der Elternzeit Geld zurückgelegt.', answer: true },
        {
          statement: 'Er empfiehlt anderen Vätern, höchstens zwei Monate Elternzeit zu nehmen.',
          answer: false
        },
        { statement: 'Nach der Elternzeit möchte Herr Krüger wieder Vollzeit arbeiten.', answer: false },
        { statement: 'Herr Krüger schreibt im Internet über seine Erfahrungen.', answer: true }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf Durchsagen. Sie hören jede Durchsage einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Eltern können ihre Kinder am Samstag kostenlos betreuen lassen.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden, herzlich willkommen zu unserem großen Familientag! Heute, am Samstag, betreuen ausgebildete Erzieherinnen Ihre Kinder kostenlos in unserer Spielecke im zweiten Stock — von zehn bis achtzehn Uhr. So können Sie in Ruhe einkaufen. Außerdem gibt es auf alle Kindermöbel zehn Prozent Rabatt.'
        },
        {
          statement: 'Der Zug hält heute an allen Bahnhöfen.',
          answer: false,
          audio:
            'Meine Damen und Herren, eine wichtige Information zu diesem Zug: Wegen Bauarbeiten hält der Regionalexpress nach Osterburg heute nicht in Kleinfeld und Marwitz. Reisende nach Kleinfeld und Marwitz steigen bitte in Dornbach in den Bus der Linie 7 um. Wir bitten um Entschuldigung für die Unannehmlichkeiten.'
        },
        {
          statement: 'Das Familienfest fällt heute aus.',
          answer: false,
          audio:
            'Liebe Besucherinnen und Besucher, eine Durchsage zum Familienfest: Wegen des Regens verlegen wir das Programm vom Innenhof in den großen Saal im Erdgeschoss. Alle Angebote finden dort wie geplant statt — auch das Kindertheater um fünfzehn Uhr. Folgen Sie bitte einfach den Schildern. Wir wünschen Ihnen weiterhin viel Spaß!'
        },
        {
          statement: 'Die Rosen kosten heute weniger als sonst.',
          answer: true,
          audio:
            'Sehr geehrte Kundinnen und Kunden, am Sonntag ist Muttertag! In unserer Blumenabteilung finden Sie heute ein besonderes Angebot: Der Strauß mit zehn roten Rosen kostet nur noch zehn statt fünfzehn Euro. Dazu erhalten Sie eine Grußkarte gratis. Sie finden die Blumenabteilung direkt am Eingang. Wir wünschen einen schönen Einkauf!'
        },
        {
          statement: 'Das Eltern-Kind-Schwimmen findet am Vormittag statt.',
          answer: false,
          audio:
            'Liebe Badegäste, eine Durchsage für unsere Familien: Das beliebte Eltern-Kind-Schwimmen beginnt heute um fünfzehn Uhr im Nichtschwimmerbecken. Eltern mit Kindern von zwei bis fünf Jahren sind herzlich willkommen. Die Teilnahme kostet nichts, Schwimmflügel bekommen Sie kostenlos an der Aufsicht. Viel Spaß!'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Antworten Sie auf die E-Mail. Schreiben Sie zu allen vier Leitpunkten — zu jedem Punkt ein bis zwei Sätze. Vergessen Sie Anrede und Gruß nicht.',
    tasks: [
      {
        titel: 'Antwort an die Hausverwaltung',
        situation:
          'Sie wohnen seit zwei Jahren in einem Mehrfamilienhaus. Heute bekommen Sie eine E-Mail von der Hausverwaltung.',
        incoming: {
          von: 'p.krause@hausverwaltung-lindenhof.de',
          betreff: 'Nachbarschaftsfest im Innenhof am 14. Juni',
          text: `Liebe Mieterinnen und Mieter,

gemeinsam mit dem Mieterbeirat möchten wir am Samstag, dem 14. Juni, ab 15 Uhr ein Nachbarschaftsfest im Innenhof feiern — mit Buffet, Musik und Spielen für die Kinder.

Dafür brauchen wir Ihre Unterstützung: Wer bringt etwas für das Buffet mit? Wer kann am Vormittag beim Aufbau der Tische und Bänke helfen? Und wer hat eine Idee für das Kinderprogramm?

Bitte antworten Sie uns bis zum 31. Mai, ob Sie kommen.

Mit freundlichen Grüßen
Petra Krause
Hausverwaltung Lindenhof`
        },
        leitpunkte: [
          'Bedanken Sie sich und sagen Sie zu.',
          'Schreiben Sie, was Sie für das Buffet mitbringen.',
          'Erklären Sie, ob Sie beim Aufbau helfen können.',
          'Machen Sie einen Vorschlag für das Kinderprogramm.'
        ],
        musterloesung: `Sehr geehrte Frau Krause,

vielen Dank für die Einladung zum Nachbarschaftsfest. Das ist eine wunderbare Idee, und ich komme sehr gern — zusammen mit meinem Mann und unseren zwei Kindern.

Für das Buffet bringen wir gern etwas mit: Ich koche einen großen Topf Linsensuppe, eine Spezialität aus meiner Heimat, und mein Mann backt dazu frisches Brot.

Beim Aufbau kann ich leider nicht helfen, weil ich am Samstagvormittag arbeiten muss. Mein Mann hat aber Zeit und hilft ab 10 Uhr gern beim Aufstellen der Tische und Bänke.

Für die Kinder hätte ich noch einen Vorschlag: Wie wäre es mit einer Schatzsuche im Innenhof? Ich könnte die kleinen Preise dafür besorgen.

Wir freuen uns schon auf das Fest!

Mit freundlichen Grüßen
Amira Haddad`
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
        'Herkunft',
        'Familie und Kinder',
        'Wohnsituation',
        'Beruf oder Ausbildung',
        'Freizeit'
      ],
      redemittel: [
        'Guten Tag! Ich heiße … Und wie heißen Sie?',
        'Haben Sie Familie? / Haben Sie Geschwister?',
        'Wohnen Sie allein oder mit Ihrer Familie zusammen?',
        'Meine Eltern leben in … / Meine Kinder sind … Jahre alt.',
        'Was machen Sie am Wochenende am liebsten?',
        'Ach, wirklich? Das machen wir auch oft zusammen.'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Über ein Thema sprechen',
      anweisung:
        'Sie haben in einer Zeitschrift gelesen: „In Deutschland lebt fast jeder Fünfte allein.“ Berichten Sie: Wie wohnen die Menschen in Ihrem Land — allein, als Paar oder mit der großen Familie? Sagen Sie Ihre Meinung: Welche Vorteile und Nachteile hat das Leben allein oder mit der Familie?',
      punkte: [
        'Berichten Sie, wie Sie selbst wohnen und leben.',
        'Wie leben die Familien in Ihrem Heimatland?',
        'Nennen Sie Vorteile UND Nachteile des Alleinlebens.',
        'Fragen Sie auch Ihre Partnerin / Ihren Partner nach ihrer/seiner Meinung.'
      ],
      redemittel: [
        'Ich wohne zurzeit allein / mit meiner Familie, weil …',
        'In meinem Heimatland ist es üblich, dass …',
        'Wer allein lebt, kann zwar …, aber …',
        'Ein großer Vorteil der Familie ist, dass man …',
        'Wie ist das bei Ihnen? Leben Sie gern allein?',
        'Das kann ich gut verstehen. / Da bin ich anderer Meinung, denn …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihre Familien sind befreundet. Sie möchten am Sonntag einen gemeinsamen Ausflug mit beiden Familien machen. Planen Sie den Ausflug gemeinsam.',
      punkte: [
        'Wohin fahren Sie, und wie kommen Sie dorthin?',
        'Was unternehmen Sie dort mit den Kindern?',
        'Essen und Getränke — Picknick oder Restaurant?',
        'Was machen Sie, wenn das Wetter schlecht ist?'
      ],
      redemittel: [
        'Wollen wir am Sonntag an den See / in den Tierpark fahren?',
        'Sollen wir mit dem Zug oder mit zwei Autos fahren?',
        'Für die Kinder könnten wir … mitnehmen.',
        'Ich schlage vor, dass jede Familie etwas zu essen mitbringt.',
        'Bei Regen könnten wir stattdessen …',
        'Prima, dann ist ja alles geplant!'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
