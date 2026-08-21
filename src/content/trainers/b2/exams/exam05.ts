import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 5,
  level: 'b2',
  title: 'Modelltest 5',
  theme: 'Bildung & lebenslanges Lernen',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Volkshochschulen melden Rekordnachfrage bei Sprachkursen',
        'Studie: Digitale Lernplattformen ersetzen den Unterricht nicht',
        'Bildungsurlaub: Kaum ein Beschäftigter kennt seinen Anspruch',
        'Immer mehr Erwachsene holen den Schulabschluss nach',
        'Ganztagsschulen: Bund und Länder streiten um die Finanzierung',
        'Universität öffnet ihre Hörsäle für Seniorinnen und Senioren',
        'Lehrermangel: Quereinsteiger sollen die Lücken schließen',
        'Stiftung vergibt Stipendien an besonders begabte Auszubildende',
        'Vorlesen fördert die Sprachentwicklung schon im Kleinkindalter',
        'Handwerkskammer beklagt sinkende Zahl von Lehrverträgen'
      ],
      texts: [
        'In den meisten Bundesländern haben Beschäftigte das Recht, sich für fünf Tage im Jahr bezahlt freistellen zu lassen, um an einer anerkannten Weiterbildung teilzunehmen. Genutzt wird diese Möglichkeit allerdings kaum: Nach einer aktuellen Erhebung nehmen nicht einmal zwei Prozent der Berechtigten sie in Anspruch. Als Hauptgrund nennen die Forscher schlichte Unkenntnis — mehr als die Hälfte der Befragten hatte von dem gesetzlichen Anspruch noch nie gehört.',
        'Sie sitzen abends im Klassenzimmer, nach Feierabend oder neben der Kinderbetreuung: An den Abendschulen und Kollegs des Landes lernen inzwischen so viele Erwachsene wie seit Jahren nicht mehr für das Abitur oder den Realschulabschluss. Die Schulleitungen führen den Zulauf darauf zurück, dass viele Arbeitgeber formale Abschlüsse wieder stärker gewichten. Wer die Prüfung besteht, hat gute Chancen — die Abbrecherquote ist allerdings weiterhin hoch.',
        'Weil an den Schulen des Landes derzeit mehrere Tausend Stellen unbesetzt bleiben, dürfen künftig auch Bewerberinnen und Bewerber ohne abgeschlossenes Lehramtsstudium unterrichten — vorausgesetzt, sie bringen einen Hochschulabschluss in einem Mangelfach mit und absolvieren berufsbegleitend eine pädagogische Qualifizierung. Die Lehrergewerkschaft warnt vor einem Qualitätsverlust, das Ministerium verweist dagegen auf gute Erfahrungen anderer Bundesländer mit solchen Programmen.',
        'Lern-Apps und Videoportale gehören für viele Schülerinnen und Schüler längst zum Alltag. Eine Untersuchung der Universität Tübingen dämpft nun jedoch überzogene Erwartungen: Wer ausschließlich mit digitalen Angeboten lernte, schnitt in Vergleichstests deutlich schlechter ab als Jugendliche, die zusätzlich von Lehrkräften begleitet wurden. Die Autoren folgern, digitale Medien könnten guten Unterricht sinnvoll ergänzen, ihn aber keinesfalls überflüssig machen.',
        'Der Altersdurchschnitt in den Vorlesungen der Universität Münster dürfte ab Oktober deutlich steigen: Unter dem Titel „Studieren 60 plus“ können ältere Menschen künftig reguläre Veranstaltungen in über zwanzig Fächern besuchen, von Geschichte bis Biologie. Prüfungen müssen sie keine ablegen, eine Anmeldung genügt. Die Hochschule reagiert damit nach eigenen Angaben auf die stark gestiegene Nachfrage der vergangenen Jahre.'
      ],
      answers: [2, 3, 6, 1, 5]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Zurück im Klassenzimmer — mit 52',
      text: `Montagabend, kurz vor sechs: Während sich das Bürogebäude langsam leert, packt Karin Vogel ihre Hefte aus. Zweiundzwanzig Jahre lang hat die 52-Jährige in der Verwaltung einer Spedition gearbeitet, zuletzt als Sachbearbeiterin für Frachtpapiere. Dann stellte das Unternehmen auf eine neue Software um — und kündigte an, dass mittelfristig ein Drittel der Verwaltungsstellen wegfallen werde. Vogel entschied sich, nicht abzuwarten, bis es sie selbst treffen würde: Sie meldete sich für eine zweijährige Umschulung zur Fachinformatikerin an.

Leicht gefallen sei ihr der Schritt nicht, erzählt sie. „In der ersten Woche saß ich zwischen lauter Zwanzigjährigen und habe abends ernsthaft überlegt aufzugeben.“ Geblieben ist sie trotzdem — auch, weil die Arbeitsagentur die Kosten der Umschulung vollständig übernimmt und während der zwei Jahre zusätzlich einen Teil ihres früheren Gehalts weiterzahlt. Ohne diese Unterstützung, sagt Vogel, hätte sie sich die lange Ausbildungszeit schlicht nicht leisten können.

Fälle wie ihrer werden sich häufen, davon ist der Bildungsforscher Professor Henning Krauß überzeugt. Wer heute ins Berufsleben eintrete, müsse damit rechnen, sich im Laufe des Arbeitslebens zwei- oder dreimal grundlegend neu zu orientieren. „Das Problem ist nicht die Lernfähigkeit der Älteren“, betont Krauß. „Erwachsene lernen anders als Jugendliche, aber keineswegs schlechter. Was fehlt, sind passende Angebote — und Arbeitgeber, die Weiterbildung nicht als verlorene Arbeitszeit betrachten, sondern als Investition.“

Karin Vogel hat inzwischen die Zwischenprüfung bestanden, als Zweitbeste ihres Jahrgangs. Ihr früherer Arbeitgeber hat ihr bereits eine Stelle in der IT-Abteilung angeboten — ausgerechnet in dem Team, das jene Software betreut, wegen der ihre alte Stelle überflüssig wurde. Ob sie das Angebot annimmt, weiß sie noch nicht; auch zwei andere Firmen haben sich schon bei ihr gemeldet. „Zum ersten Mal in meinem Berufsleben habe ich das Gefühl, wählen zu können. Dieses Gefühl hätte ich gern früher gekannt — deshalb rate ich allen, nicht erst auf die Krise zu warten.“`,
      questions: [
        {
          frage: 'Karin Vogel begann die Umschulung, …',
          options: [
            'nachdem ihr gekündigt worden war.',
            'bevor sie ihre Stelle tatsächlich verlor.',
            'weil ihr Arbeitgeber sie dazu verpflichtete.'
          ],
          answer: 1
        },
        {
          frage: 'In der Anfangszeit der Umschulung …',
          options: [
            'dachte Vogel daran, wieder aufzuhören.',
            'fühlte sich Vogel unter den Jüngeren sofort wohl.',
            'musste Vogel die Kursgebühren selbst bezahlen.'
          ],
          answer: 0
        },
        {
          frage: 'Die Arbeitsagentur …',
          options: [
            'zahlt Vogel ihr früheres Gehalt in voller Höhe weiter.',
            'übernimmt die Kurskosten und einen Teil des Gehalts.',
            'hat Vogels Antrag zunächst abgelehnt.'
          ],
          answer: 1
        },
        {
          frage: 'Professor Krauß ist der Ansicht, dass ältere Lernende …',
          options: [
            'grundsätzlich langsamer und schlechter lernen.',
            'anders, aber nicht schlechter lernen als junge.',
            'keine besonderen Angebote benötigen.'
          ],
          answer: 1
        },
        {
          frage: 'Auf das Stellenangebot ihres früheren Arbeitgebers …',
          options: [
            'hat Vogel bereits mit einer Zusage reagiert.',
            'hat Vogel mit einer Absage reagiert.',
            'hat Vogel sich noch nicht festgelegt.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ein Bekannter möchte neben dem Beruf am Abend das Abitur nachholen.',
        'Ihre Nachbarin sucht für ihren Sohn Nachhilfe in Mathematik vor der Abschlussprüfung.',
        'Eine Kollegin möchte sich gezielt auf die Prüfung telc Deutsch B2 vorbereiten.',
        'Ihr Vater ist Rentner und möchte sich wissenschaftlichen Vorträgen widmen.',
        'Eine Freundin sucht einen Computerkurs, der vormittags mit Kinderbetreuung stattfindet.',
        'Ihr Betrieb möchte mehrere Beschäftigte in Erster Hilfe schulen lassen.',
        'Ein Freund möchte endlich ein Musikinstrument lernen — am liebsten abends.',
        'Eine Studentin braucht kurzfristig Unterstützung in Statistik, möglichst online.',
        'Eine Familie mit geringem Einkommen sucht kostenlose Lernförderung für ihre Tochter.',
        'Ein Kollege möchte per Fernstudium einen anerkannten Berufsabschluss im Bereich Personal erwerben.'
      ],
      ads: [
        'Abendgymnasium der Stadt: Abitur in dreieinhalb Jahren, Unterricht Montag bis Donnerstag ab 17:30 Uhr — kostenfrei, auch für Berufstätige.',
        'Lernstudio Pythagoras: Einzelnachhilfe in Mathe und Physik für die Klassen 5 bis 13, gezieltes Prüfungstraining vor Abschlussprüfungen.',
        'Fernakademie Comenius: Staatlich zugelassener Lehrgang „Personalfachkaufmann/-frau (IHK)“ — ortsunabhängig lernen, Präsenz nur zur Prüfung.',
        'Musikschule Crescendo: Gitarre, Klavier oder Saxofon für Erwachsene — Anfängerkurse dienstags und donnerstags ab 19 Uhr.',
        'Sprachinstitut Lingua: Intensivtraining für die Prüfung telc Deutsch B2 mit Modelltests und individueller Fehleranalyse. Nächster Start: 5. März.',
        'Universität im Alter: Öffentliche Ringvorlesung für Menschen ab 60 — jeden Mittwochnachmittag, Semesterbeitrag 40 Euro, keine Prüfungen.',
        'DRK-Kreisverband: Erste-Hilfe-Kurse für Firmen — wir kommen mit unserem Schulungsteam direkt in Ihren Betrieb, Termine nach Absprache.',
        'Verein Chancenwerk e. V.: Kostenlose Hausaufgaben- und Lernhilfe für Kinder aus Familien mit geringem Einkommen, gefördert von der Stadt.',
        'Frauenzentrum Mitte: PC-Grundkurse dienstags und freitags 9–12 Uhr — Kinderbetreuung im Haus inklusive, kleine Gruppen.',
        'Studycoach24: Online-Einzelunterricht in Statistik und Mathematik für Studierende — Termine noch in derselben Woche, per Videokonferenz.',
        'Stadtbibliothek: Neue Medienausweise für Jugendliche — E-Books, Lernvideos und Zeitschriften jetzt zwölf Monate gratis testen.',
        'Sprachschule Mundo: Spanisch für den Urlaub — Crashkurs an zwei Wochenenden, inklusive Landeskunde und Tapas-Abend.'
      ],
      answers: [0, 1, 4, 5, 8, 6, 3, 9, 7, 2]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrter Herr Dr. Brandt,

hiermit beantrage ich für die Zeit vom 3. bis zum 7. November Bildungsurlaub, [1] mir nach dem Landesgesetz jährlich zusteht. Ich möchte in dieser Woche an einem Intensivkurs „Spanisch für den Beruf“ teilnehmen, [2] von der zuständigen Behörde als Bildungsveranstaltung anerkannt ist.

Da unser Unternehmen seine Geschäftsbeziehungen nach Südamerika derzeit ausbaut, dürften die Kursinhalte auch [3] Interesse der Firma liegen. Ich wäre dadurch künftig in der Lage, Anfragen spanischsprachiger Kunden selbstständig zu [4].

Die Anmeldebestätigung sowie das Programm des Veranstalters [5] ich diesem Schreiben bei. Selbstverständlich werde ich meine laufenden Aufgaben so organisieren, dass [6] meiner Abwesenheit keine Verzögerungen entstehen. Frau Petrova hat sich außerdem bereit erklärt, dringende Vorgänge zu [7].

Ich bitte Sie, mir den Bildungsurlaub schriftlich zu [8]. Sollten Sie noch Fragen haben, [9] ich Ihnen selbstverständlich gern für ein Gespräch zur Verfügung. Für eine Rückmeldung bis Ende des Monats wäre ich Ihnen [10] dankbar.

Mit freundlichen Grüßen
Jonas Keller`,
      gaps: [
        { options: ['der', 'den', 'dem'], answer: 0 },
        { options: ['die', 'der', 'das'], answer: 1 },
        { options: ['zum', 'im', 'am'], answer: 1 },
        { options: ['verantworten', 'antworten', 'beantworten'], answer: 2 },
        { options: ['lege', 'liege', 'stelle'], answer: 0 },
        { options: ['seit', 'während', 'binnen'], answer: 1 },
        { options: ['unternehmen', 'übernehmen', 'entnehmen'], answer: 1 },
        { options: ['genehmigen', 'verabschieden', 'zulassen'], answer: 0 },
        { options: ['halte', 'bleibe', 'stehe'], answer: 2 },
        { options: ['ganz', 'sehr', 'viel'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

im September habe ich mich bei Ihrer Volkshochschule für den Abendkurs „Englisch B2“ angemeldet und die Kursgebühr von 240 Euro im [1] überwiesen. Zu meinem Bedauern wurde der Kurs nach nur zwei Terminen ohne Angabe von [2] abgesagt.

Auf Ihrer Internetseite heißt es, dass die Teilnehmerinnen und Teilnehmer in einem solchen [3] die Gebühr vollständig zurückerhalten. [4] warte ich seit nunmehr sechs Wochen vergeblich auf die Rückzahlung. Auch mein Anruf bei Ihrer Verwaltung blieb leider ohne [5].

Ich bitte Sie [6], den Betrag bis zum 15. Dezember auf mein Konto zu überweisen. [7] sehe ich mich gezwungen, rechtliche Schritte einzuleiten.

Unabhängig davon möchte ich mich nach einem [8] erkundigen: Wird der Kurs im Frühjahrssemester erneut [9]? In diesem Fall würde ich mich gern wieder anmelden, da ich mit der Dozentin sehr [10] war.

Mit freundlichen Grüßen
Ana Ribeiro`,
      wordBank: [
        'Absicht',
        'Andernfalls',
        'angeboten',
        'Anlass',
        'daher',
        'Dennoch',
        'Erfolg',
        'Ersatztermin',
        'Fall',
        'geöffnet',
        'Gründen',
        'nachdem',
        'Umstände',
        'Voraus',
        'zufrieden'
      ],
      answers: [13, 10, 8, 5, 6, 4, 1, 7, 2, 14]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Stadtbibliothek ist während der Prüfungszeit länger geöffnet.',
          answer: true,
          audio:
            'Ein Hinweis für alle, die gerade für Prüfungen lernen: Die Stadtbibliothek verlängert ab kommender Woche ihre Öffnungszeiten. Bis Ende Februar sind die Lesesäle täglich von acht bis dreiundzwanzig Uhr geöffnet, also drei Stunden länger als sonst — auch am Sonntag. Zusätzliche Arbeitsplätze mit Steckdosen wurden im zweiten Obergeschoss eingerichtet. Eine Reservierung ist nicht erforderlich, Gruppenräume können jedoch online gebucht werden.'
        },
        {
          statement: 'Den Studiengang Psychologie kann künftig jeder ohne Beschränkung studieren.',
          answer: false,
          audio:
            'Nachrichten aus der Hochschulpolitik: Die Universität führt zum Wintersemester für den Studiengang Psychologie wieder eine Zulassungsbeschränkung ein. Wegen der stark gestiegenen Bewerberzahlen wird künftig nur zugelassen, wer eine bestimmte Abiturnote erreicht oder einen Studieneignungstest besteht. Der Studierendenrat kritisierte die Entscheidung scharf und forderte stattdessen deutlich mehr Studienplätze sowie zusätzliches Lehrpersonal für die überfüllten Seminare.'
        },
        {
          statement: 'Das neue Kursprogramm der Volkshochschule erscheint nicht mehr als gedrucktes Heft.',
          answer: true,
          audio:
            'Die Volkshochschule hat heute ihr Frühjahrsprogramm vorgestellt — mit über sechshundert Kursen, von Buchführung bis Yoga. Eine Neuerung betrifft die Veröffentlichung: Aus Kostengründen verzichtet die Einrichtung künftig vollständig auf das gedruckte Programmheft. Alle Kurse sind ausschließlich im Internet zu finden, wo man sich auch direkt anmelden kann. Wer keinen Internetzugang hat, kann sich telefonisch beraten lassen.'
        },
        {
          statement: 'Immer mehr Studierende brechen ihr Studium ab.',
          answer: false,
          audio:
            'Erfreuliche Zahlen aus dem Bildungsministerium: Die Quote der Studienabbrecher ist im dritten Jahr in Folge gesunken. Brach vor fünf Jahren noch fast ein Drittel der Studierenden das Studium vorzeitig ab, ist es heute nur noch etwa ein Viertel. Die Ministerin führt die Entwicklung auf den Ausbau von Beratungsangeboten und Brückenkursen in den ersten Semestern zurück.'
        },
        {
          statement: 'Für den Vorlesewettbewerb sind noch Anmeldungen möglich.',
          answer: true,
          audio:
            'Und zum Schluss ein Tipp für Familien: Beim großen Vorlesewettbewerb der Region können Kinder zwischen acht und zwölf Jahren wieder ihr Können zeigen. Die Vorentscheide finden im April in den Stadtteilbibliotheken statt, das Finale steigt im Mai im Rathaussaal. Anmeldungen nimmt die Zentralbibliothek noch bis zum 15. März entgegen — telefonisch oder über ihre Internetseite.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Willkommen bei „Campus und Karriere“. Mein Gast ist heute Professorin Renate Albers von der Universität Leipzig, sie forscht seit vielen Jahren zum lebenslangen Lernen. Frau Albers, wie viele Erwachsene in Deutschland bilden sich eigentlich regelmäßig weiter?'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Den Statistiken zufolge nimmt etwa jeder zweite Erwachsene mindestens einmal im Jahr an einer Weiterbildung teil — das klingt zunächst ordentlich. Wenn man genauer hinschaut, wird es allerdings problematisch: Es bilden sich vor allem diejenigen weiter, die ohnehin gut ausgebildet sind. Menschen mit niedrigem Schulabschluss, die am stärksten profitieren würden, erreichen wir am schlechtesten.'
        },
        {
          speaker: 'Moderator',
          text: 'Woran liegt das? Am Geld?'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Nur zum Teil. Viele wissen schlicht nicht, welche Fördermöglichkeiten es überhaupt gibt — Bildungsprämien, Bildungsurlaub, Zuschüsse der Arbeitsagentur. In unseren Befragungen kannte nicht einmal ein Drittel der Beschäftigten diese Instrumente. Und ich muss dazusagen: Der Staat übernimmt in der Regel nur einen Teil der Kosten, den Rest tragen die Teilnehmer selbst oder die Betriebe.'
        },
        {
          speaker: 'Moderator',
          text: 'Viele Berufstätige sagen: Ich habe schlicht keine Zeit für einen Kurs.'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Das höre ich oft, und ich nehme den Einwand ernst. Genau deshalb empfehle ich kurze Lerneinheiten, die sich in den Alltag einbauen lassen — zwanzig Minuten am Tag, etwa auf dem Arbeitsweg. Das ist deutlich wirksamer, als einmal im Jahr ein Wochenendseminar zu besuchen und danach das meiste wieder zu vergessen.'
        },
        {
          speaker: 'Moderator',
          text: 'Stichwort Online-Kurse: Sind die die Lösung?'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Sie sind ein Teil davon, aber kein Wundermittel. Die Abbruchquoten sind enorm — bei manchen offenen Online-Kursen beendet nicht einmal jeder zehnte Teilnehmer den Kurs. Was nachweislich hilft, ist Verbindlichkeit: feste Termine, eine Lerngruppe, ein Mensch, der nachfragt. Wer gemeinsam mit anderen lernt, hält deutlich häufiger durch als jemand, der allein vor dem Bildschirm sitzt.'
        },
        {
          speaker: 'Moderator',
          text: 'Nun sagen manche Ältere: Für mich lohnt sich das nicht mehr, ich lerne ohnehin viel schwerer als früher.'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Dem widerspreche ich entschieden. Ältere lernen anders — sie brauchen mehr Bezug zur eigenen Erfahrung und etwas mehr Zeit beim Auswendiglernen. Aber sie verstehen Zusammenhänge oft schneller als Jüngere. In unseren Studien schneiden Sechzigjährige bei komplexen Aufgaben regelmäßig genauso gut ab wie Dreißigjährige. Die Lernfähigkeit geht nicht verloren, solange man sie benutzt.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie finde ich denn den Kurs, der zu mir passt? Das Angebot ist ja riesig.'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Genau dafür haben wir an unserem Institut einen kostenlosen Online-Test entwickelt. Er fragt Vorkenntnisse, Ziele und Lerngewohnheiten ab und schlägt anschließend passende Kursformate vor. Über vierzigtausend Menschen haben ihn bereits genutzt. Man findet ihn über die Internetseite unserer Universität.'
        },
        {
          speaker: 'Moderator',
          text: 'Zum Schluss: Was raten Sie unseren Hörerinnen und Hörern ganz persönlich?'
        },
        {
          speaker: 'Prof. Albers',
          text: 'Warten Sie nicht auf die Krise — nicht auf die Kündigung und nicht auf die nächste Umstrukturierung. Fangen Sie mit etwas Kleinem an, gern noch in dieser Woche. Und trauen Sie sich, dabei Fehler zu machen: Wer nie wieder Anfänger sein will, hat mit dem Lernen im Grunde schon aufgehört.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Professor Albers, herzlichen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement:
            'Ungefähr die Hälfte der Erwachsenen nimmt mindestens einmal jährlich an einer Weiterbildung teil.',
          answer: true
        },
        {
          statement: 'Menschen mit niedrigem Schulabschluss bilden sich besonders häufig weiter.',
          answer: false
        },
        {
          statement: 'Viele Beschäftigte kennen die staatlichen Fördermöglichkeiten nicht.',
          answer: true
        },
        {
          statement: 'Der Staat übernimmt die Kosten einer Weiterbildung in der Regel vollständig.',
          answer: false
        },
        {
          statement: 'Frau Albers hält kurze, regelmäßige Lerneinheiten für wirksamer als seltene Seminare.',
          answer: true
        },
        {
          statement: 'Die meisten Teilnehmer offener Online-Kurse lernen bis zum Kursende.',
          answer: false
        },
        { statement: 'Wer in einer Gruppe lernt, bricht seltener ab.', answer: true },
        {
          statement:
            'Laut den Studien lösen Sechzigjährige komplexe Aufgaben oft genauso gut wie Dreißigjährige.',
          answer: true
        },
        { statement: 'Der Online-Test des Instituts ist kostenlos.', answer: true },
        {
          statement: 'Frau Albers rät, mit der Weiterbildung bis zu einer beruflichen Krise zu warten.',
          answer: false
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Fotografie-Kurs fällt heute ersatzlos aus.',
          answer: false,
          audio:
            'Eine Durchsage der Volkshochschule: Der Kurs „Digitale Fotografie für Einsteiger“ kann heute Abend nicht wie gewohnt im Raum 12 stattfinden, da dort die Beleuchtung ausgefallen ist. Der Unterricht wird stattdessen in den Zeichensaal im dritten Stock verlegt und beginnt pünktlich um achtzehn Uhr dreißig. Bitte nutzen Sie den Aufzug am Haupteingang.'
        },
        {
          statement: 'Die Universitätsbibliothek ist am Samstag geöffnet.',
          answer: true,
          audio:
            'Liebe Studierende, bitte beachten Sie die geänderten Öffnungszeiten in der Prüfungsphase: Die Universitätsbibliothek öffnet am kommenden Samstag ausnahmsweise von neun bis achtzehn Uhr. Die Ausleihe schließt bereits um siebzehn Uhr, die Lesesäle und die Gruppenarbeitsräume stehen Ihnen dagegen bis zum Schluss zur Verfügung. Am Sonntag bleibt das Haus wie üblich geschlossen.'
        },
        {
          statement: 'Der Elternabend findet wie ursprünglich geplant statt.',
          answer: false,
          audio:
            'Eine Mitteilung des Sekretariats an alle Eltern der Jahrgangsstufe zehn: Der für morgen angekündigte Elternabend zur Berufsorientierung muss leider verschoben werden, da mehrere Lehrkräfte erkrankt sind. Als neuer Termin ist Donnerstag nächster Woche um neunzehn Uhr vorgesehen, wieder in der Aula. Eine gesonderte Einladung mit allen Informationen erhalten Sie über Ihre Kinder.'
        },
        {
          statement: 'Der Vortrag über Auslandsstipendien wird am Nachmittag wiederholt.',
          answer: true,
          audio:
            'Meine Damen und Herren, willkommen auf der Bildungsmesse! Wegen des großen Andrangs war der Vortrag „Mit Stipendium ins Ausland“ heute Vormittag leider schnell überfüllt. Wir freuen uns, Ihnen mitteilen zu können, dass der Referent den Vortrag um fünfzehn Uhr im großen Saal wiederholt. Der Eintritt ist frei, Plätze gibt es diesmal ausreichend.'
        },
        {
          statement: 'Die Mensa ist in den Semesterferien durchgehend geschlossen.',
          answer: false,
          audio:
            'Eine Information des Studierendenwerks: Während der Semesterferien gilt in der Mensa am Campus Nord ein eingeschränkter Betrieb. Von Montag bis Freitag bieten wir zwischen elf Uhr dreißig und vierzehn Uhr eine kleine Auswahl an Gerichten an; die Cafeteria im Erdgeschoss bleibt zusätzlich bis sechzehn Uhr geöffnet. Am Wochenende bleibt das Haus geschlossen.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Bewerbung: Weiterbildungsstipendium',
        situation:
          'Eine Stiftung vergibt Stipendien für berufliche Weiterbildungen an Berufstätige. Sie möchten sich um die Förderung eines Kurses bewerben, den Sie sich sonst nicht leisten könnten. Schreiben Sie an die Stiftung.',
        leitpunkte: [
          'Stellen Sie sich und Ihre berufliche Situation kurz vor.',
          'Beschreiben Sie die Weiterbildung, für die Sie sich bewerben.',
          'Begründen Sie, warum Sie die Förderung benötigen.',
          'Erklären Sie, was Sie mit der Weiterbildung erreichen wollen.'
        ],
        musterloesung: `Betreff: Bewerbung um ein Weiterbildungsstipendium

Sehr geehrte Frau Dr. Sommer,

mit großem Interesse habe ich von Ihrem Stipendienprogramm für Berufstätige erfahren und bewerbe mich hiermit um eine Förderung.

Ich bin 29 Jahre alt und arbeite seit fünf Jahren als Pflegehelfer in einem Seniorenheim. Die Arbeit mit den Bewohnerinnen und Bewohnern erfüllt mich sehr, doch ohne anerkannten Abschluss sind meine Aufgaben und mein Gehalt begrenzt.

Deshalb möchte ich ab September die berufsbegleitende Ausbildung zur Pflegefachkraft an der Akademie Sankt Marien absolvieren. Der Lehrgang dauert drei Jahre und kostet insgesamt 5.400 Euro. Da ich alleinerziehend bin und meine Miete allein trage, kann ich diese Summe trotz sorgfältiger Planung nicht selbst aufbringen; mein Arbeitgeber unterstützt mich zwar mit Freistellungen, aber nicht finanziell.

Mit dem Abschluss könnte ich endlich eigenverantwortlich pflegen und später Auszubildende anleiten — gerade in Zeiten des Personalmangels möchte ich in diesem Beruf Verantwortung übernehmen und mein Wissen an neue Kolleginnen und Kollegen weitergeben.

Über die Möglichkeit, mich persönlich vorzustellen, würde ich mich sehr freuen.

Mit freundlichen Grüßen
Daniel Okafor`
      }
    ],
    tipps:
      'Gliedern Sie in Absätze: Anlass, Sachverhalt, Begründung, Schluss. Nutzen Sie Konnektoren (daher, jedoch, sodass) und den Konjunktiv II für höfliche Bitten. Gehen Sie auf alle vier Leitpunkte ein und prüfen Sie am Ende: Zielumfang etwa 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Eine Lernerfahrung, die mich geprägt hat“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie, was Sie gelernt haben und in welcher Situation.',
        'Erzählen Sie, welche Schwierigkeiten es gab und wie Sie sie überwunden haben.',
        'Sagen Sie, wie Sie sich dabei gefühlt haben.',
        'Ziehen Sie ein kurzes Fazit: Was hat Ihnen die Erfahrung gebracht?'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Am Anfang fiel es mir schwer, weil …',
        'Rückblickend würde ich sagen, dass …',
        'Habt ihr/Haben Sie so etwas auch schon erlebt?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Schulnoten abschaffen — Kinder lernen besser ohne Druck.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen aus Ihrer eigenen Schulzeit oder Erfahrung.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Meiner Ansicht nach spricht vieles dafür/dagegen, dass …',
        'Aus eigener Erfahrung kann ich sagen, dass …',
        'Das sehe ich anders, denn …',
        'Einerseits …, andererseits …',
        'Da stimme ich Ihnen zu, allerdings …',
        'Könnten wir uns darauf einigen, dass …?'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'An Ihrer Sprachschule soll ein „Abend des Lernens“ stattfinden, an dem Teilnehmende ihr Wissen in kurzen Workshops weitergeben. Planen Sie die Veranstaltung gemeinsam.',
      punkte: [
        'Welche Workshops soll es geben und wer könnte sie leiten?',
        'Wann und wo soll die Veranstaltung stattfinden?',
        'Wie machen Sie Werbung für den Abend (Plakate, soziale Medien, Einladungen)?',
        'Wer kümmert sich um Organisation vor Ort (Räume, Technik, Getränke)?'
      ],
      redemittel: [
        'Ich schlage vor, dass wir mit … beginnen.',
        'Was halten Sie davon, wenn …?',
        'Das könnte ich übernehmen. / Darum könnten Sie sich kümmern.',
        'Gute Idee, aber wir dürfen … nicht vergessen.',
        'Lassen Sie uns festhalten, wer was bis wann erledigt.',
        'Dann fassen wir zum Schluss noch einmal zusammen.'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
