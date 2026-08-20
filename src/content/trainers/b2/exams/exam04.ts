import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 4,
  level: 'b2',
  title: 'Modelltest 4',
  theme: 'Gesundheit & Ernährung',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Zuckersteuer im Gespräch: Regierung prüft Abgabe auf Softdrinks',
        'Immer mehr Deutsche verzichten auf Fleisch',
        'Landärzte verzweifelt gesucht: Gemeinden locken mit Prämien',
        'Krankenkassen zahlen künftig mehr für Vorsorgekurse',
        'Studie: Wer dauerhaft zu wenig schläft, riskiert seine Gesundheit',
        'Schulessen in der Kritik: zu fett, zu süß, zu eintönig',
        'Fitness-Apps: Motivation aus der Hosentasche?',
        'Lebensmittelverschwendung: 75 Kilo pro Kopf landen jährlich im Müll',
        'Neue Kampagne wirbt für mehr Bewegung im Büroalltag',
        'Allergien nehmen zu: Forscher suchen nach den Ursachen'
      ],
      texts: [
        'Wenn Dr. Martha Feldmann Ende des Jahres ihre Praxis schließt, müssen ihre Patienten künftig dreißig Kilometer bis zum nächsten Hausarzt fahren — ein Nachfolger ist nicht in Sicht. So wie der Gemeinde Oberried geht es vielen Dörfern. Manche Kommunen zahlen jungen Medizinern inzwischen Prämien von bis zu 100.000 Euro, stellen günstige Praxisräume oder finanzieren das Studium mit — unter der Bedingung, dass sich die Ärzte für mehrere Jahre verpflichten.',
        'Nudeln mit Soße, Pizza, panierte Schnitzel: Was in deutschen Schulkantinen auf den Tellern landet, hat Ernährungsfachleute einer aktuellen Untersuchung zufolge alarmiert. An den meisten der geprüften Schulen enthielt das Mittagessen zu viel Fett und Zucker, Gemüse und frisches Obst standen dagegen viel zu selten auf dem Speiseplan. Die Studienautoren fordern verbindliche Qualitätsstandards — bisher sind entsprechende Empfehlungen freiwillig.',
        'Wer über Jahre hinweg weniger als sechs Stunden pro Nacht schläft, schadet offenbar seiner Gesundheit erheblich: Eine Langzeituntersuchung mit mehr als zehntausend Teilnehmern zeigt, dass chronischer Schlafmangel das Risiko für Herz-Kreislauf-Erkrankungen und Diabetes deutlich erhöht. Die Forscher warnen zudem davor, den Schlaf am Wochenende einfach nachholen zu wollen — dies gleiche das Defizit nur zum Teil aus.',
        'Ob aus Sorge um das Klima, aus Liebe zu den Tieren oder der Gesundheit zuliebe: Der Fleischkonsum in Deutschland sinkt seit Jahren. Einer neuen Erhebung zufolge isst inzwischen fast jeder Fünfte höchstens einmal pro Woche Fleisch, rund zehn Prozent verzichten ganz darauf. Der Handel reagiert längst: Die Auswahl an pflanzlichen Alternativen hat sich in den Supermärkten innerhalb von fünf Jahren mehr als verdreifacht.',
        'Acht Stunden sitzen, dazwischen Meetings, abends erschöpft aufs Sofa — der Büroalltag macht träge. Eine gemeinsame Kampagne von Gesundheitsministerium und Krankenkassen will das ändern: Unter dem Motto „Jede Bewegung zählt“ werben Plakate und kurze Videos dafür, Treppen zu steigen, Besprechungen im Stehen abzuhalten und kleine Übungen in den Arbeitstag einzubauen. Betriebe erhalten kostenloses Material und können Bewegungslotsen ausbilden lassen.'
      ],
      answers: [2, 5, 4, 1, 8]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Die Kantine, in der das Gemüse gewinnt',
      text: `Als Peter Lang vor drei Jahren die Küche eines großen Versicherungsunternehmens mit 1200 Beschäftigten übernahm, dominierten Currywurst und Schnitzel den Speiseplan; die Salatbar führte ein Schattendasein. Der gelernte Koch, der zuvor jahrelang in einem Bio-Restaurant gearbeitet hatte, wollte das ändern — allerdings behutsam, denn eines war ihm von Anfang an klar: „Mit erhobenem Zeigefinger erreicht man in einer Kantine gar nichts.“

Statt Verbote auszusprechen, veränderte Lang das Angebot Schritt für Schritt. Die Rezepte wurden nach und nach angepasst — weniger Salz, weniger Zucker, mehr frisches Gemüse, ohne dass dies groß angekündigt wurde. Das vegetarische Gericht steht seitdem an erster Stelle der Ausgabe, die Portionen wurden kleiner, ein kostenloser Nachschlag ist selbstverständlich. Der Protest ließ nicht lange auf sich warten: Eine Unterschriftenliste zur Rettung der Currywurst machte die Runde. Lang reagierte gelassen — die Currywurst blieb, allerdings gibt es sie nur noch einmal pro Woche. Ein halbes Jahr später wählte fast die Hälfte der Gäste freiwillig das vegetarische Gericht.

Die Ernährungswissenschaftlerin Prof. Renate Holl sieht in solchen Konzepten großes Potenzial. Die Umgebung beeinflusse das Essverhalten weit stärker als jedes Wissen über gesunde Ernährung, erklärt sie. Kantinen erreichten zudem gerade jene Menschen, die eine Ernährungsberatung niemals aufsuchen würden. Entscheidend sei jedoch, die Wahlfreiheit zu erhalten: „Wer sich bevormundet fühlt, isst aus Trotz erst recht ungesund.“

Inzwischen bekommt Lang Anfragen von anderen Unternehmen und schult Kantinenköche im ganzen Land. Sein nächstes Ziel: deutlich mehr Zutaten aus der Region. Weil das Budget knapp bleibt, verhandelt er dafür direkt mit Landwirten aus der Umgebung — lange Transportwege und Zwischenhändler will er sich schlicht sparen. Die Currywurst übrigens hat ihren festen Platz behalten. „Genuss gehört dazu“, sagt Lang. „Nur eben nicht jeden Tag.“`,
      questions: [
        {
          frage: 'Als Lang die Küche übernahm, …',
          options: [
            'war das vegetarische Angebot besonders beliebt.',
            'aßen die Beschäftigten überwiegend Fleischgerichte.',
            'gab es bereits viele Beschwerden über das Essen.'
          ],
          answer: 1
        },
        {
          frage: 'Lang veränderte das Angebot, indem er …',
          options: [
            'die Rezepte nach und nach anpasste.',
            'ungesunde Gerichte sofort vom Speiseplan strich.',
            'die Preise für Fleischgerichte deutlich erhöhte.'
          ],
          answer: 0
        },
        {
          frage: 'Auf den Protest der Belegschaft reagierte Lang, indem er die Currywurst …',
          options: [
            'vollständig abschaffte.',
            'weiterhin, aber seltener anbot.',
            'täglich als Alternative anbot.'
          ],
          answer: 1
        },
        {
          frage: 'Prof. Holl betont, dass …',
          options: [
            'Kantinen auch Menschen erreichen, die nie eine Beratung besuchen würden.',
            'Wissen über Ernährung das Verhalten am stärksten beeinflusst.',
            'die Wahlfreiheit beim Essen keine große Rolle spielt.'
          ],
          answer: 0
        },
        {
          frage: 'Für die Zukunft plant Lang, …',
          options: [
            'ein eigenes Restaurant zu eröffnen.',
            'das Budget der Kantine zu verdoppeln.',
            'verstärkt Zutaten aus der Region einzusetzen.'
          ],
          answer: 2
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie suchen für Ihren Vater, der Diabetes hat, eine individuelle Ernährungsberatung.',
        'Eine Kollegin möchte mit dem Rauchen aufhören und wünscht sich Unterstützung in einer Gruppe.',
        'Sie möchten nach einer Knieverletzung wieder vorsichtig mit Sport beginnen.',
        'Ihre Firma sucht ein Angebot für wöchentliche Rückengymnastik im Betrieb.',
        'Ein Freund arbeitet im Schichtdienst und findet nachts kaum Schlaf; er sucht professionelle Hilfe.',
        'Sie möchten am Wochenende einen Kochkurs für gesunde, schnelle Gerichte besuchen.',
        'Ihre 14-jährige Tochter möchte in den Sommerferien an einem Sportcamp teilnehmen.',
        'Eine ältere Nachbarin sucht jemanden, der ihr die Medikamente nach Hause bringt.',
        'Sie brauchen für die Führerscheinprüfung noch einen Erste-Hilfe-Kurs.',
        'Ein Bekannter verträgt bestimmte Lebensmittel nicht und möchte endlich testen lassen, worauf er reagiert.'
      ],
      ads: [
        'Kochwerkstatt Olive: Samstagskurs „Gesund und schnell durch die Woche“ — einfache Rezepte für Berufstätige, inklusive Rezeptheft.',
        'DRK-Kreisverband: Erste-Hilfe-Kurse an jedem ersten Samstag im Monat — anerkannt für alle Führerscheinklassen und betriebliche Ersthelfer.',
        'Praxis Dr. Weinert: Allergie- und Unverträglichkeitstests mit ausführlicher Beratung — wir finden heraus, welche Lebensmittel Sie meiden sollten.',
        'Ernährungsberatung Vital: Individuelle Begleitung bei Diabetes, Bluthochdruck und Übergewicht — von den Krankenkassen bezuschusst.',
        'Sportverein TuS 04: Reha-Sport für Rücken, Hüfte und Knie — sanfter Wiedereinstieg unter Anleitung ausgebildeter Übungsleiter, ärztlich empfohlen.',
        'Apotheke am Markt: Unser Botendienst bringt Ihnen Medikamente noch am selben Tag nach Hause — kostenlos ab 15 Euro Bestellwert.',
        'Institut Balance: Rauchfrei in acht Wochen — Gruppenkurs mit erfahrener Therapeutin, Erstattung durch viele Krankenkassen möglich.',
        'Schlafzentrum Nord: Diagnostik und Beratung bei Schlafstörungen — mit spezieller Sprechstunde für Schichtarbeitende.',
        'Firmenfit: Wir kommen in Ihr Unternehmen! Rückengymnastik, Pausen-Workouts und Gesundheitstage für Ihre Belegschaft.',
        'Feriencamp Bewegte Zeit: Sport, Spiel und gesunde Küche für Jugendliche von 12 bis 16 Jahren — jetzt für den Sommer anmelden!',
        'Fitness-Loft: Krafttraining, Kurse und Sauna auf 2000 Quadratmetern — sichern Sie sich jetzt den Probemonat für 19,90 Euro!',
        'Hotel Seeblick: Wellness-Wochenende mit Massagen und leichter Naturküche — buchbar ab zwei Übernachtungen.'
      ],
      answers: [3, 6, 4, 8, 7, 0, 9, 5, 1, 2]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

seit vielen Jahren bin ich Mitglied Ihrer Krankenkasse und habe Ihre Leistungen bisher nur selten in Anspruch [1]. Nun wende ich mich mit einer Frage an Sie.

Auf Ihrer Internetseite bin ich auf ein Angebot gestoßen, [2] mich sehr interessiert. Es handelt sich [3] einen achtwöchigen Kurs zur Stressbewältigung. Mein Hausarzt hat mir ausdrücklich [4], an einem solchen Kurs teilzunehmen.

[5] ich im Schichtdienst arbeite, kommt für mich allerdings nur ein Onlinekurs infrage. Deshalb möchte ich fragen, ob auch digitale Kurse von Ihnen bezuschusst [6]. Ferner wäre für mich wichtig zu wissen, welche Unterlagen ich nach Kursende [7] muss, um die Erstattung zu erhalten.

Einem Hinweis auf Ihrer Website [8] ich, dass die Erstattung erst nach Abschluss des Kurses erfolgt. Gilt dies auch dann, wenn der Kurs bereits vor der Antragstellung begonnen [9]?

Für eine baldige Antwort wäre ich Ihnen sehr [10].

Mit freundlichen Grüßen
Deniz Karaca`,
      gaps: [
        { options: ['gestellt', 'genommen', 'gebracht'], answer: 1 },
        { options: ['das', 'was', 'dem'], answer: 0 },
        { options: ['über', 'auf', 'um'], answer: 2 },
        { options: ['verlangt', 'empfohlen', 'überzeugt'], answer: 1 },
        { options: ['Da', 'Denn', 'Deshalb'], answer: 0 },
        { options: ['worden', 'wurden', 'werden'], answer: 2 },
        { options: ['einreichen', 'einrichten', 'erreichen'], answer: 0 },
        { options: ['erfahre', 'entnehme', 'ergebe'], answer: 1 },
        { options: ['hat', 'ist', 'wird'], answer: 0 },
        { options: ['freundlich', 'dankbar', 'höflich'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrter Herr Brandner,

als Vorsitzende des Elternbeirats der Goethe-Schule wende ich mich heute im [1] vieler Eltern an Sie.

Seit August beliefert Ihre Firma unsere Schulmensa. Leider haben uns in den vergangenen Wochen zahlreiche [2] über die Qualität des Essens erreicht. Nach Aussage vieler Schülerinnen und Schüler wird das Essen häufig kalt [3], und frisches Obst fehlt fast völlig. Auch die Auswahl für Kinder, die aus gesundheitlichen Gründen bestimmte Lebensmittel [4] müssen, ist sehr begrenzt. Dabei hatten Sie in Ihrem Angebot ausdrücklich [5], täglich ein frisch gekochtes und ausgewogenes Gericht bereitzustellen.

Wir bitten Sie daher, die Qualität kurzfristig zu [6]. Gern möchten wir Ihnen unsere Kritikpunkte auch in einem persönlichen Gespräch [7]; als Termin schlagen wir die erste Woche nach den Herbstferien [8]. Sollten sich die Mängel nicht beheben lassen, müssten wir dem Schulträger [9], den Vertrag zu überprüfen.

Wir hoffen jedoch auf eine gute [10] und verbleiben

mit freundlichen Grüßen
Sabine Dörner
(Vorsitzende des Elternbeirats)`,
      wordBank: [
        'ab',
        'aufgefallen',
        'Beschwerden',
        'Eindruck',
        'empfehlen',
        'entschuldigen',
        'erläutern',
        'meiden',
        'Namen',
        'serviert',
        'verbessern',
        'verzichten',
        'vor',
        'zugesichert',
        'Zusammenarbeit'
      ],
      answers: [8, 2, 9, 7, 13, 10, 6, 12, 4, 14]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Zahl der Grippefälle ist in diesem Winter ungewöhnlich hoch.',
          answer: true,
          audio:
            'Zunächst eine Meldung aus dem Gesundheitsbereich: Die Grippewelle hat das Land in diesem Winter besonders früh und besonders heftig erfasst. Nach Angaben der Gesundheitsämter liegt die Zahl der gemeldeten Fälle deutlich über den Werten der vergangenen Jahre. Fachleute raten vor allem älteren Menschen und chronisch Kranken, sich jetzt noch impfen zu lassen — die Impfung wirkt nach etwa zwei Wochen.'
        },
        {
          statement: 'Der betroffene Käse kann bedenkenlos gegessen werden.',
          answer: false,
          audio:
            'Achtung, ein wichtiger Produktrückruf: Die Molkerei Bergland ruft ihren Schnittkäse „Alpenglück“ mit dem Mindesthaltbarkeitsdatum 15. März zurück. Bei einer Kontrolle wurden krankheitserregende Bakterien festgestellt. Vom Verzehr wird dringend abgeraten. Kundinnen und Kunden können die Packung auch ohne Kassenbon in ihrem Geschäft zurückgeben und erhalten den Kaufpreis erstattet.'
        },
        {
          statement: 'Schon zehn Minuten Spazierengehen am Tag haben laut der Studie einen positiven Effekt.',
          answer: true,
          audio:
            'Bewegung muss nicht anstrengend sein, um zu wirken — das zeigt eine neue Studie mit über zwanzigtausend Teilnehmerinnen und Teilnehmern. Bereits ein täglicher Spaziergang von zehn Minuten senkte demnach das Risiko für Herzerkrankungen messbar. Die Forscher betonen: Wer sich mehr bewegt, profitiert stärker — aber der größte Unterschied besteht zwischen gar keiner und ein wenig Bewegung.'
        },
        {
          statement: 'Die Notaufnahme des Stadtkrankenhauses wird geschlossen.',
          answer: false,
          audio:
            'Zu den Gerüchten um das Stadtkrankenhaus erklärte die Geschäftsführung heute: Die Notaufnahme wird keineswegs geschlossen — im Gegenteil, sie soll im kommenden Jahr erweitert und modernisiert werden. Geplant sind zusätzliche Behandlungsräume und mehr Personal, um die langen Wartezeiten zu verkürzen. Die Bauarbeiten beginnen voraussichtlich im Mai und sollen den laufenden Betrieb nicht beeinträchtigen.'
        },
        {
          statement: 'Ältere Menschen können sich bei großer Hitze telefonisch beraten lassen.',
          answer: true,
          audio:
            'Angesichts der angekündigten Hitzewelle schaltet die Stadt ab morgen wieder ihr Hitzetelefon frei. Unter der bekannten Nummer erhalten vor allem ältere und alleinlebende Menschen praktische Tipps — vom richtigen Trinken bis zum Kühlen der Wohnung. Auf Wunsch rufen geschulte Freiwillige an besonders heißen Tagen auch regelmäßig zurück, um sich nach dem Befinden zu erkundigen. Der Service ist kostenlos.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Herzlich willkommen zu „Sprechstunde“, unserem Gesundheitsmagazin! Zu Gast ist heute die Ernährungswissenschaftlerin Dr. Julia Roth. Sie hat gerade ein Buch über die häufigsten Irrtümer rund ums Essen veröffentlicht. Frau Roth, welcher Irrtum ärgert Sie am meisten?'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Es gibt viele Kandidaten! Nehmen wir gleich einen Klassiker: Das Frühstück sei die wichtigste Mahlzeit des Tages, und wer es auslässt, lebe ungesund. Das lässt sich wissenschaftlich so nicht halten. Manche Menschen brauchen morgens einfach nichts — und das ist völlig in Ordnung. Entscheidend ist, was man über den ganzen Tag verteilt isst, nicht die Uhrzeit.'
        },
        {
          speaker: 'Moderator',
          text: 'Sehr beliebt sind ja auch sogenannte Detox-Kuren, die den Körper entgiften sollen. Was ist davon zu halten?'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Ehrlich gesagt: nichts. Für die Wirkung dieser Kuren gibt es keinerlei wissenschaftliche Belege. Unser Körper entgiftet sich selbst, dafür haben wir Leber und Nieren — die machen ihren Job hervorragend, ganz ohne teure Säfte. Wer sich nach einer solchen Woche besser fühlt, fühlt das vor allem, weil er auf Alkohol und Fertigessen verzichtet hat.'
        },
        {
          speaker: 'Moderator',
          text: 'Und was ist mit Superfoods — Chiasamen, Gojibeeren und Co.? Die gelten doch als besonders gesund.'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Diese Produkte sind nicht schlecht, aber sie sind auch nicht besser als heimische Alternativen. Leinsamen liefern ähnliche Nährstoffe wie Chiasamen, schwarze Johannisbeeren mehr Vitamin C als exotische Beeren — zu einem Bruchteil des Preises und ohne lange Transportwege. Das Etikett „Superfood“ ist vor allem eines: geschicktes Marketing.'
        },
        {
          speaker: 'Moderator',
          text: 'Beim Thema Zucker sind sich doch aber alle einig: Der ist ungesund. Oder etwa nicht?'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Zucker ist kein Gift, auf das man vollständig verzichten müsste — die Menge macht das Problem. Und da liegt das eigentliche Übel gar nicht im Stück Kuchen am Sonntag, sondern im versteckten Zucker: Er steckt in Fertigpizza, in Salatsoßen, sogar in Wurst. Wer viel Verarbeitetes isst, nimmt große Mengen auf, ohne es zu merken. Mein Rat: Zutatenlisten lesen.'
        },
        {
          speaker: 'Moderator',
          text: 'Viele greifen deshalb zu Light-Produkten. Eine gute Idee?'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Leider oft nicht. Wird das Fett reduziert, fehlt Geschmack — und der wird nicht selten durch Zucker oder Zusatzstoffe ersetzt. Manches Light-Produkt enthält am Ende mehr Zucker als das Original. Auch strenge Diäten sehe ich kritisch: Nach meiner Erfahrung führen sie bei den meisten Menschen geradewegs zum Jo-Jo-Effekt — nach der Diät wiegt man mehr als vorher.'
        },
        {
          speaker: 'Moderator',
          text: 'Was raten Sie stattdessen? Muss man jetzt jeden Tag frisch kochen?'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Nein, dieser Anspruch überfordert nur. Wer an zwei, drei Tagen pro Woche selbst kocht, hat schon viel gewonnen — es darf auch schnell und einfach sein. Wichtig finde ich, dass Kinder früh mit in die Küche dürfen. Der Geschmack wird in den ersten Lebensjahren geprägt, und wer als Kind schneiden, rühren und probieren durfte, isst als Erwachsener meist abwechslungsreicher.'
        },
        {
          speaker: 'Moderator',
          text: 'Zum Schluss: Wenn Sie nur einen einzigen Ratschlag geben dürften — welcher wäre das?'
        },
        {
          speaker: 'Dr. Roth',
          text: 'Mehr Gemüse, und Wasser statt Softdrinks — damit ist das meiste erreicht. Und bitte keine Verbote: Kein Lebensmittel muss vollständig vom Speiseplan verschwinden. Essen soll ja auch Freude machen, sonst hält niemand durch.'
        },
        {
          speaker: 'Moderator',
          text: 'Frau Dr. Roth, haben Sie vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement: 'Frau Dr. Roth hat ein Buch über Ernährungsirrtümer veröffentlicht.',
          answer: true
        },
        {
          statement: 'Frau Roth zufolge muss jeder Mensch unbedingt frühstücken.',
          answer: false
        },
        {
          statement:
            'Für die Wirkung von Detox-Kuren gibt es laut Frau Roth keine wissenschaftlichen Belege.',
          answer: true
        },
        {
          statement: 'Exotische Superfoods sind nach Ansicht der Expertin gesünder als heimische Produkte.',
          answer: false
        },
        {
          statement:
            'Ein großes Problem sieht Frau Roth im versteckten Zucker in verarbeiteten Lebensmitteln.',
          answer: true
        },
        {
          statement: 'Light-Produkte sind nach Aussage der Expertin immer die gesündere Wahl.',
          answer: false
        },
        {
          statement: 'Strenge Diäten führen ihrer Erfahrung nach häufig zum Jo-Jo-Effekt.',
          answer: true
        },
        {
          statement: 'Wer gesund essen will, muss laut Frau Roth jeden Tag selbst kochen.',
          answer: false
        },
        {
          statement: 'Kinder sollten nach Meinung von Frau Roth früh beim Kochen mithelfen dürfen.',
          answer: true
        },
        {
          statement: 'Frau Roth empfiehlt, bestimmte Lebensmittel vollständig zu verbieten.',
          answer: false
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Praxis ist wegen Urlaub geschlossen; in dringenden Fällen hilft die Vertretung.',
          answer: true,
          audio:
            'Guten Tag, Sie sind mit der Praxis Dr. Neumann verbunden. Unsere Praxis bleibt vom 3. bis zum 14. August wegen Urlaubs geschlossen. In dringenden Fällen wenden Sie sich bitte an unsere Vertretung, die Praxis Dr. Yilmaz in der Bahnhofstraße 7, Telefon 42 38 91. Bei lebensbedrohlichen Notfällen wählen Sie bitte sofort die 112. Ab dem 17. August sind wir wieder wie gewohnt für Sie da.'
        },
        {
          statement: 'Für den Aquafitness-Kurs am Abend gibt es keine freien Plätze mehr.',
          answer: false,
          audio:
            'Liebe Badegäste, eine Durchsage zu unseren Kursen: Der neue Aquafitness-Kurs startet kommende Woche. Der Vormittagskurs am Dienstag ist bereits vollständig ausgebucht — für den Abendkurs am Donnerstag um neunzehn Uhr sind dagegen noch einige Plätze frei. Anmeldungen nehmen wir an der Kasse oder telefonisch entgegen. Die Teilnahme kostet acht Euro pro Termin, eine Zehnerkarte ist günstiger.'
        },
        {
          statement: 'An der Fleischtheke können Kunden heute vegetarische Produkte probieren.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden, heute ist bei uns Aktionstag „Bewusst genießen“! An der Fleischtheke in der Frischeabteilung können Sie den ganzen Tag über vegetarische Alternativen kostenlos probieren — von Aufschnitt bis Bratwurst auf Pflanzenbasis. Unsere Ernährungsberaterin beantwortet dort gern Ihre Fragen. Außerdem erhalten Sie heute zehn Prozent Rabatt auf alle Produkte unserer Eigenmarke „Grüner Teller“.'
        },
        {
          statement: 'Die Untersuchungen beim Gesundheitstag sind für die Beschäftigten kostenlos.',
          answer: true,
          audio:
            'Eine Durchsage der Personalabteilung: Am kommenden Mittwoch findet in der Kantine unser betrieblicher Gesundheitstag statt. Von neun bis sechzehn Uhr können Sie Ihren Blutdruck, Ihren Blutzucker und Ihre Sehkraft überprüfen lassen — sämtliche Untersuchungen sind für alle Beschäftigten kostenlos. Eine Anmeldung ist nicht nötig, bitte bringen Sie lediglich Ihren Mitarbeiterausweis mit. Die Teilnahme ist während der Arbeitszeit möglich.'
        },
        {
          statement: 'Die Teilnahme am Lauftreff kostet zehn Euro pro Termin.',
          answer: false,
          audio:
            'Und noch ein Hinweis für alle Sportbegeisterten: Ab April lädt das Gesundheitsamt jeden Samstag um neun Uhr zum offenen Lauftreff im Stadtpark ein. Erfahrene Übungsleiter begleiten drei Gruppen — vom gemütlichen Walken bis zum sportlichen Lauftraining. Die Teilnahme ist kostenlos, eine Anmeldung ist nicht erforderlich. Treffpunkt ist der Brunnen am Haupteingang. Kommen Sie einfach vorbei, jedes Tempo ist willkommen!'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail (150–220 Wörter) und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Bewerbung: Mitarbeit im Gesundheitszentrum',
        situation:
          'Das Gesundheitszentrum Vitalis sucht laut Anzeige eine Mitarbeiterin / einen Mitarbeiter für die Organisation von Kursen (Anmeldung, Kursplanung, Kontakt zu den Kursleitern). Sie haben Erfahrung im Büro und interessieren sich für Gesundheitsthemen. Schreiben Sie eine Bewerbung.',
        leitpunkte: [
          'Nennen Sie, worauf Sie sich bewerben und wie Sie auf die Anzeige aufmerksam wurden.',
          'Beschreiben Sie Ihre Ausbildung und Ihre bisherigen Erfahrungen.',
          'Erklären Sie, warum Sie für die Stelle besonders geeignet sind.',
          'Nennen Sie Ihren möglichen Anfangstermin und bitten Sie um ein Gespräch.'
        ],
        musterloesung: `Betreff: Bewerbung um die Stelle in der Kursorganisation

Sehr geehrte Frau Albers,

mit großem Interesse habe ich Ihre Anzeige im Stadtanzeiger vom 8. März gelesen und bewerbe mich hiermit um die ausgeschriebene Stelle in der Kursorganisation Ihres Gesundheitszentrums.

Nach meiner Ausbildung zur Kauffrau für Büromanagement habe ich fünf Jahre im Sekretariat einer Sprachschule gearbeitet. Dort war ich für die Kursanmeldungen, die Raumplanung und den Kontakt zu den Lehrkräften verantwortlich — Aufgaben, die den in Ihrer Anzeige beschriebenen sehr ähnlich sind. Der Umgang mit Kundinnen und Kunden bereitet mir große Freude, und auch in stressigen Situationen behalte ich den Überblick.

Für Ihr Haus interessiere ich mich besonders, weil mir Gesundheitsthemen auch persönlich am Herzen liegen: Seit Jahren besuche ich selbst Rücken- und Entspannungskurse und weiß daher, worauf es den Teilnehmenden ankommt. Zudem bin ich es gewohnt, freundlich und geduldig mit unterschiedlichen Anliegen umzugehen.

Die Stelle könnte ich zum 1. Juni antreten. Über die Einladung zu einem persönlichen Gespräch würde ich mich sehr freuen.

Mit freundlichen Grüßen
Deniz Karaca

Anlagen: Lebenslauf, Zeugnisse`
      }
    ],
    tipps:
      'Bei der Bewerbung zählen Struktur und positiver Ton: Bezug zur Anzeige, Qualifikationen mit Beispielen, ein konkreter Anfangstermin und der Wunsch nach einem Gespräch. Gehen Sie auf alle vier Leitpunkte ein. Prüfen Sie am Ende: 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Ein besonderes Essen, das mir in Erinnerung geblieben ist“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie, wann und mit wem Sie dieses Essen erlebt haben.',
        'Erzählen Sie, was das Besondere daran war.',
        'Sagen Sie, welche Rolle gemeinsames Essen in Ihrem Heimatland spielt.',
        'Vergleichen Sie kurz mit einer Erfahrung, die Sie in Deutschland gemacht haben.'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Besonders war daran, dass …',
        'Das kann ich gut nachvollziehen, weil …',
        'Habt ihr/Haben Sie so etwas Ähnliches schon erlebt?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Wer ungesund lebt, soll höhere Krankenkassenbeiträge zahlen.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen oder eigenen Erfahrungen.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Auf den ersten Blick klingt das gerecht, aber …',
        'Ich halte diesen Vorschlag für problematisch, weil …',
        'Man darf dabei nicht außer Acht lassen, dass …',
        'Genau das sehe ich anders, denn …',
        'In diesem Punkt gebe ich Ihnen recht, allerdings …',
        'Ich denke, wir können uns darauf einigen, dass …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihre Firma möchte für die Belegschaft einen Gesundheitstag organisieren — mit Untersuchungen, Bewegungsangeboten und gesundem Essen. Sie beide gehören zum Organisationsteam. Planen Sie die Veranstaltung gemeinsam.',
      punkte: [
        'Legen Sie Termin, Ort und Dauer des Gesundheitstags fest.',
        'Wählen Sie passende Angebote aus (Untersuchungen, Kurse, Vorträge, Essen).',
        'Überlegen Sie, welche externen Partner Sie einladen (Krankenkasse, Sportverein, Kantine).',
        'Planen Sie, wie Sie möglichst viele Kolleginnen und Kollegen zur Teilnahme motivieren.'
      ],
      redemittel: [
        'Zuerst sollten wir klären, wann …',
        'Was halten Sie davon, wenn wir …?',
        'Ich könnte mich um … kümmern, während Sie … übernehmen.',
        'Wichtig wäre mir außerdem, dass …',
        'Da stimme ich Ihnen zu — allerdings sollten wir auch …',
        'Halten wir also fest: …'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
