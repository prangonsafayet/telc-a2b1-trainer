import { type Exam } from '@shared/types';

const exam = {
  id: 15,
  title: "Modelltest 15",
  difficulty: "b1",
  level: "B1 · Endspurt",
  theme: "Leben & Arbeiten im Ausland",

  lesen: {
    teil1: {
      anweisung: "Lesen Sie die Situationen 1–5 und die Anzeigen a–h. Welche Anzeige passt zu welcher Situation?",
      situations: [
        "Sie möchten Ihr Deutsch für den Beruf verbessern und suchen einen Kurs mit Fachsprache.",
        "Ihre ausländischen Berufsabschlüsse sollen in Deutschland anerkannt werden. Sie suchen eine Beratung.",
        "Sie möchten Menschen aus verschiedenen Ländern kennenlernen und gemeinsam kochen.",
        "Sie gehen für ein Jahr nach Kanada und möchten Ihre Möbel so lange günstig unterstellen.",
        "Sie möchten regelmäßig Geld zu Ihrer Familie ins Ausland schicken, ohne hohe Gebühren."
      ],
      ads: [
        "Sprachschule Aktiv: Berufssprachkurse Deutsch B2 – Fachsprache für Pflege, Handwerk und Büro. Abendkurse, teilweise vom Arbeitsamt gefördert.",
        "Umzüge International Meyer: Wir bringen Ihren Hausrat sicher nach Übersee – inklusive Verpackung und Zoll-Service. Fordern Sie ein kostenloses Angebot an!",
        "IQ-Netzwerk: Kostenlose Beratung zur Anerkennung ausländischer Berufsabschlüsse. Wir prüfen Ihre Zeugnisse und begleiten Sie durch das ganze Verfahren.",
        "Weltküche e. V.: Internationaler Kochtreff jeden zweiten Freitag – jeder bringt ein Rezept aus seiner Heimat mit, gekocht und gegessen wird gemeinsam!",
        "TransferFix: Geld ins Ausland senden – faire Wechselkurse, nur 1,90 Euro Gebühr pro Überweisung. In über 120 Länder, direkt per App.",
        "Lager24: Self-Storage ab 29 Euro im Monat – trockene, sichere Lagerräume von 1 bis 50 Quadratmetern. Flexibel kündbar, Zugang rund um die Uhr.",
        "Sprachcamp Junior: Englisch-Ferienkurse für Kinder von 8 bis 14 Jahren am Bodensee. Sport, Spiel und Sprache – jetzt Plätze für den Sommer sichern!",
        "Kreditbank direkt: Ihr Wunschkredit bis 50.000 Euro – schnelle Online-Zusage, flexible Raten. Jetzt unverbindlich anfragen!"
      ],
      answers: [0, 2, 3, 5, 4]
    },
    teil2: {
      anweisung: "Lesen Sie die Texte und die Aufgaben. Kreuzen Sie an: a, b oder c.",
      texts: [
        {
          titel: "Fachkräfte gesucht: Arbeiten in Deutschland",
          text: "Deutschland sucht Personal – besonders in der Pflege, im Handwerk und in der IT fehlen viele Fachkräfte. Wer aus dem Ausland kommt und hier arbeiten möchte, sollte einige Dinge wissen: Für sogenannte reglementierte Berufe wie die Pflege muss der ausländische Abschluss zuerst anerkannt werden; dafür gibt es kostenlose Beratungsstellen in jedem Bundesland. In anderen Bereichen, etwa der IT, zählt oft vor allem die Berufserfahrung. Gute Deutschkenntnisse werden fast überall erwartet – für den Alltag meist Niveau B1, für qualifizierte Tätigkeiten häufig mehr. Umfassende Informationen bietet das offizielle Portal für internationale Fachkräfte, das auch eine Telefon-Hotline in mehreren Sprachen anbietet."
        },
        {
          titel: "Auslandsjahr mit 50 plus: Immer mehr Ältere wagen den Schritt",
          text: "Ein Jahr im Ausland – das ist längst nicht mehr nur etwas für junge Leute. Organisationen, die Freiwilligendienste und längere Auslandsaufenthalte vermitteln, berichten: Die Zahl der Teilnehmenden über fünfzig hat sich in den letzten zehn Jahren verdoppelt. Die Gründe sind vielfältig: Manche wollen endlich eine neue Sprache lernen, andere erfüllen sich einen Lebenstraum. Wichtig ist eine gute Vorbereitung – vor allem bei der Krankenversicherung, die im Ausland oft extra abgeschlossen werden muss. Wie man so ein Jahr bezahlt? Das Ehepaar Lindner aus Bremen, das gerade acht Monate in Ecuador verbracht hat, hat dafür die eigene Wohnung vermietet: \"So hat unsere Reise fast nichts extra gekostet.\""
        }
      ],
      questions: [
        { textIndex: 0, frage: "In welchen Bereichen fehlen besonders viele Fachkräfte?", options: ["In Pflege, Handwerk und IT.", "Nur im Tourismus.", "In der Landwirtschaft."], answer: 0 },
        { textIndex: 0, frage: "Was gilt für Pflegeberufe?", options: ["Man darf sofort ohne Papiere arbeiten.", "Der ausländische Abschluss muss anerkannt werden.", "Es gibt dort keine freien Stellen."], answer: 1 },
        { textIndex: 0, frage: "Wo bekommt man weitere Informationen?", options: ["Nur persönlich in Berlin.", "Nur direkt beim Arbeitgeber.", "Auf einem Portal und über eine Hotline."], answer: 2 },
        { textIndex: 1, frage: "Was berichten die Organisationen?", options: ["Immer weniger Ältere gehen ins Ausland.", "Die Zahl älterer Teilnehmer hat sich verdoppelt.", "Nur Studierende dürfen teilnehmen."], answer: 1 },
        { textIndex: 1, frage: "Wie hat das Ehepaar Lindner den Aufenthalt bezahlt?", options: ["Es hat die eigene Wohnung vermietet.", "Es hat im Lotto gewonnen.", "Es hat in Ecuador gearbeitet."], answer: 0 }
      ]
    },
    teil3: {
      anweisung: "Lesen Sie die Nachrichten 1–5. Welche Überschrift (a–h) passt?",
      messages: [
        "Hallo Mama, gute Nachricht: Meine Zeugnisse sind endlich anerkannt! Ich darf ab Januar als Erzieherin arbeiten – im Kindergarten gleich um die Ecke. Der ganze Papierkram hat sich gelohnt! Deine Blanka",
        "Hi Jonas, mein Chef hat Ja gesagt: Ich bekomme das Sabbatjahr! Ab März reise ich sechs Monate durch Südamerika. Können wir uns vorher unbedingt noch treffen? LG Tarek",
        "Liebe Kolleginnen und Kollegen, ab nächstem Monat verstärkt uns Yuki Tanaka aus Osaka im Projektteam. Bitte helft ihr in den ersten Wochen, sich bei uns zurechtzufinden. Viele Grüße, die Teamleitung",
        "Hallo Selma, schlechte Nachricht: Mein Visum ist immer noch nicht fertig, die Botschaft braucht noch mindestens zwei Wochen. Ich muss meinen Flug leider umbuchen. Drück mir die Daumen! Rasid",
        "Hi Papa, ich habe die Wohnung in Lissabon! Klein, aber mit Blick aufs Meer. Den Mietvertrag unterschreibe ich morgen, danach schicke ich euch Fotos. Eure Marina"
      ],
      headlines: [
        "Warten auf das Visum",
        "Neue Kollegin aus dem Ausland",
        "Visum ist endlich da",
        "Abschluss wurde anerkannt",
        "Wohnung im Ausland gefunden",
        "Flug wurde gestrichen",
        "Lange Reise genehmigt",
        "Arbeit im Kindergarten verloren"
      ],
      answers: [3, 6, 1, 0, 4]
    },
    teil4: {
      anweisung: "Lesen Sie den Text. Sind die Aussagen richtig oder falsch?",
      titel: "Zwischen zwei Welten: Ein Leben in zwei Ländern",
      text: "Wenn Carlos Mendes von \"zu Hause\" spricht, muss er kurz überlegen, welches er meint. Der 41-jährige Ingenieur aus Porto lebt seit zwölf Jahren in Deutschland – mit seiner Frau und zwei Kindern, die hier geboren wurden und selbstverständlich zweisprachig aufwachsen.\n\nSeit zwei Jahren hat Carlos ein besonderes Arbeitsmodell: Seine Firma erlaubt allen Mitarbeitenden, bis zu dreißig Tage im Jahr aus dem europäischen Ausland zu arbeiten. Diese Tage verbringt die Familie jeden Sommer in Porto. \"Vormittags sitze ich am Laptop wie in Deutschland auch – aber in der Mittagspause sehe ich das Meer\", erzählt er.\n\nDer wichtigste Grund für die Sommerwochen in Portugal sind allerdings seine Eltern. \"Sie werden älter, und ich möchte, dass meine Kinder ihre Großeltern wirklich kennen – nicht nur vom Bildschirm.\" Auch sprachlich hätten die Wochen in Porto den Kindern mehr gebracht als jeder Unterricht.\n\nOb er irgendwann ganz zurückgeht? Carlos schüttelt den Kopf. \"Früher dachte ich: Irgendwann muss ich mich entscheiden. Heute weiß ich, dass ich beides haben kann. Heimat ist für mich kein Ort mehr – es sind zwei.\" Nur eines, gibt er zu, werde nie eine der beiden Welten schaffen: \"Portugiesischen Kaffee und deutsches Brot – beides zusammen gibt es leider nirgendwo.\"",
      statements: [
        { text: "Carlos lebt seit zwölf Jahren in Deutschland.", answer: true },
        { text: "Seine Firma erlaubt bis zu dreißig Arbeitstage im europäischen Ausland pro Jahr.", answer: true },
        { text: "Seine Kinder sprechen nur Deutsch.", answer: false },
        { text: "Ein wichtiger Grund für die Sommerwochen in Porto sind seine Eltern.", answer: true },
        { text: "Carlos plant, bald für immer nach Portugal zurückzukehren.", answer: false }
      ]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung: "Lesen Sie den Text. Welches Wort passt in die Lücke? Kreuzen Sie an: a, b oder c.",
      text: "Liebe Frau Berger,\n\nSie haben mich damals im Deutschkurs immer unterstützt, deshalb möchte ich Ihnen etwas Schönes erzählen: Mir [1] eine Stelle als Elektriker in München angeboten! Bevor ich anfangen kann, muss mein Abschluss anerkannt [2]. Die Beraterin, [3] mich betreut, sagt, dass das etwa drei Monate dauert. Ich habe auch schon eine Wohnung gefunden, [4] ich mir mit einem Kollegen teile. Am Anfang hatte ich Angst [5] der Bürokratie, aber inzwischen komme ich gut zurecht. Ohne Ihren Unterricht [6] ich das alles nicht geschafft.\n\nHerzliche Grüße\nOmar",
      gaps: [
        { options: ["wurde", "würde", "werde"], answer: 0 },
        { options: ["worden", "werden", "wurde"], answer: 1 },
        { options: ["die", "der", "das"], answer: 0 },
        { options: ["der", "die", "das"], answer: 1 },
        { options: ["über", "von", "vor"], answer: 2 },
        { options: ["habe", "hätte", "hatte"], answer: 1 }
      ]
    },
    teil2: {
      anweisung: "Lesen Sie den Text. Welches Wort (a–l) passt in welche Lücke? Jedes Wort passt nur einmal.",
      text: "Liebe neue Kolleginnen und Kollegen,\n\nherzlich willkommen in unserem [1]! Damit Ihr Start gut gelingt, haben wir ein Willkommensprogramm vorbereitet. In der ersten Woche bekommen Sie eine [2] durch alle Abteilungen und lernen Ihre Ansprechpartner kennen. Jede und jeder Neue erhält außerdem einen [3]: eine erfahrene Kollegin oder einen erfahrenen Kollegen, die Ihnen bei allen Fragen [4] – auch bei privaten, zum Beispiel bei der Wohnungssuche. Zweimal pro Woche bietet die Firma einen kostenlosen Deutschkurs an; die Teilnahme ist während der [5] möglich. Bei Fragen zu Vertrag oder Gehalt wenden Sie sich bitte direkt an die [6].\n\nIhre Geschäftsleitung",
      wordBank: ["Führung", "helfen", "Team", "Paten", "Arbeitszeit", "Personalabteilung", "Straße", "Kantine", "fragen", "Chef", "Sprache", "Urlaub"],
      answers: [2, 0, 3, 1, 4, 5]
    },
    teil3: {
      anweisung: "Was antworten Sie? Kreuzen Sie die passende Antwort an: a, b oder c.",
      items: [
        { prompt: "\"Wie lange leben Sie schon in Deutschland?\"", options: ["Seit ungefähr vier Jahren.", "Deutschland ist ein großes Land.", "Ich lebe sehr gern."], answer: 0 },
        { prompt: "\"Vermissen Sie Ihre Heimat manchmal?\"", options: ["Meine Heimat hat sehr viele Einwohner.", "Ja, besonders meine Familie und das Essen.", "Nein, ich habe schon gegessen."], answer: 1 },
        { prompt: "\"Ihr Deutsch ist wirklich gut geworden!\"", options: ["Deutsch hat wirklich sehr lange Wörter.", "Das finde ich auch schade.", "Danke! Ich übe jeden Tag mit meinen Kollegen."], answer: 2 },
        { prompt: "\"Was hat Sie in Deutschland am meisten überrascht?\"", options: ["Dass die Geschäfte am Sonntag geschlossen sind.", "Ich bin nie überrascht.", "Deutschland liegt mitten in Europa."], answer: 0 },
        { prompt: "\"Möchten Sie für immer hierbleiben?\"", options: ["Hier ist es heute acht Grad kalt.", "Das weiß ich noch nicht – im Moment fühle ich mich sehr wohl hier.", "Ich bleibe heute lieber zu Hause."], answer: 1 }
      ]
    }
  },

  hoeren: {
    teil1: {
      anweisung: "Sie hören vier kurze Ansagen. Richtig oder falsch?",
      items: [
        {
          audio: "Meine Damen und Herren, willkommen an Bord des Fluges nach Frankfurt. Wegen des starken Gegenwinds verlängert sich unsere Flugzeit heute um etwa vierzig Minuten. Wir landen voraussichtlich um einundzwanzig Uhr fünfzehn.",
          statement: "Das Flugzeug landet früher als geplant.",
          answer: false
        },
        {
          audio: "Eine Durchsage der Sprachschule: Der Einstufungstest für die neuen Berufssprachkurse findet am Samstag um neun Uhr in Raum zwölf statt. Bitte bringen Sie einen Ausweis und, falls vorhanden, alte Sprachzertifikate mit.",
          statement: "Zum Einstufungstest soll man einen Ausweis mitbringen.",
          answer: true
        },
        {
          audio: "Guten Tag, hier ist das Welcome-Center der Stadt. Unsere englischsprachige Beratung für internationale Fachkräfte ist ab sofort auch dienstags geöffnet, jeweils von vierzehn bis achtzehn Uhr. Eine Terminvereinbarung ist nicht erforderlich.",
          statement: "Für die Beratung am Dienstag braucht man unbedingt einen Termin.",
          answer: false
        },
        {
          audio: "Liebe Teilnehmerinnen und Teilnehmer des interkulturellen Sommerfests: Das Fest findet bei jedem Wetter statt. Bei Regen feiern wir allerdings nicht im Park, sondern in der Aula der Musikschule. Der Eintritt bleibt in jedem Fall frei.",
          statement: "Bei Regen findet das Fest in der Musikschule statt.",
          answer: true
        }
      ]
    },
    teil2: {
      anweisung: "Sie hören vier kurze Informationen. Kreuzen Sie an: a, b oder c.",
      items: [
        {
          audio: "Karrieretipp im Radio: Wer im Ausland arbeiten möchte, sollte früh mit der Sprache anfangen – am besten ein Jahr vor dem Umzug. Fachleute empfehlen mindestens Niveau B1 für den Alltag und B2 für qualifizierte Berufe.",
          frage: "Welches Sprachniveau empfehlen Fachleute für qualifizierte Berufe?",
          options: ["A2.", "B1.", "B2."],
          answer: 2
        },
        {
          audio: "Information des Studierendenwerks: Für internationale Studierende gibt es ab sofort ein neues Beratungsangebot rund ums Wohnen. Jeden Mittwoch hilft ein Team bei der Zimmersuche und prüft auf Wunsch auch Mietverträge – kostenlos, auf Deutsch oder Englisch.",
          frage: "Was macht das neue Beratungsteam unter anderem?",
          options: ["Es prüft Mietverträge.", "Es vermietet eigene Wohnungen.", "Es bezahlt die Miete."],
          answer: 0
        },
        {
          audio: "Und eine Meldung vom Flughafen: Ab Oktober gibt es dreimal pro Woche eine Direktverbindung nach Toronto. Tickets sind ab sofort buchbar – und in den ersten zwei Wochen gibt es zwanzig Prozent Frühbucherrabatt.",
          frage: "Was bekommen Frühbucher?",
          options: ["Einen kostenlosen Koffer.", "Zwanzig Prozent Rabatt.", "Ein besseres Sitzplatzangebot."],
          answer: 1
        },
        {
          audio: "Servicezeit: Wer länger im Ausland lebt, sollte an die Krankenversicherung denken. Innerhalb Europas hilft die europäische Versichertenkarte, außerhalb brauchen Sie fast immer eine zusätzliche Auslandsversicherung. Vergleichen lohnt sich – die Preise unterscheiden sich stark.",
          frage: "Was braucht man außerhalb Europas fast immer?",
          options: ["Eine zusätzliche Auslandsversicherung.", "Nur die normale Versichertenkarte.", "Gar keine Versicherung."],
          answer: 0
        }
      ]
    },
    teil3: {
      anweisung: "Sie hören vier kurze Gespräche. Richtig oder falsch?",
      items: [
        {
          audio: [
            { speaker: "Aiko", text: "Jan, in meiner Gehaltsabrechnung steht im November ein Extra-Betrag. Was ist denn Weihnachtsgeld?" },
            { speaker: "Jan", text: "Das ist ein zusätzliches Gehalt am Jahresende – aber Achtung, nicht jede Firma zahlt das. Steht es denn in deinem Vertrag?" },
            { speaker: "Aiko", text: "Moment ... ja, hier: ein halbes Monatsgehalt im November. Was für eine schöne Überraschung!" }
          ],
          statement: "In Aikos Vertrag steht, dass sie Weihnachtsgeld bekommt.",
          answer: true
        },
        {
          audio: [
            { speaker: "Paula", text: "Ich würde so gern ein Auslandssemester in Spanien machen, aber ich habe Angst, dass es zu teuer wird." },
            { speaker: "Nele", text: "Dafür gibt es doch die Erasmus-Förderung! Und nebenbei arbeiten darfst du auch ein paar Stunden." },
            { speaker: "Paula", text: "Stimmt – die Bewerbung für Erasmus habe ich gestern tatsächlich schon abgeschickt. Jetzt heißt es Daumen drücken!" }
          ],
          statement: "Paula hat sich noch nicht für die Förderung beworben.",
          answer: false
        },
        {
          audio: [
            { speaker: "Berater", text: "Herr Trabelsi, Ihre Unterlagen aus Tunesien sehen gut aus. Für die Anerkennung als Pfleger brauchen Sie aber noch das Sprachniveau B2." },
            { speaker: "Herr Trabelsi", text: "Ich habe bis jetzt B1. Der B2-Kurs beginnt nächsten Monat, da bin ich schon angemeldet." },
            { speaker: "Berater", text: "Sehr gut. Dann melde ich Sie direkt danach für den Anpassungslehrgang an." }
          ],
          statement: "Herr Trabelsi hat das Sprachniveau B2 schon erreicht.",
          answer: false
        },
        {
          audio: [
            { speaker: "Vater", text: "Und, wie war deine erste Woche in Amsterdam?" },
            { speaker: "Tochter", text: "Toll! Das Team ist super nett, und meine Wohnung ist winzig, aber mitten im Zentrum." },
            { speaker: "Vater", text: "Und wie kommst du zur Arbeit?" },
            { speaker: "Tochter", text: "Mit dem Fahrrad, wie alle hier! Nur eins fehlt mir wirklich: richtiges deutsches Brot." }
          ],
          statement: "Die Tochter fährt mit dem Fahrrad zur Arbeit.",
          answer: true
        }
      ]
    },
    teil4: {
      anweisung: "Sie hören ein Interview. Kreuzen Sie an: a, b oder c.",
      audio: [
        { speaker: "Moderatorin", text: "Willkommen zur Karrierezeit! Bei uns ist heute Anna Roth, sie leitet die Personalabteilung eines großen Logistikunternehmens und führt viele Gespräche mit internationalen Bewerberinnen und Bewerbern. Frau Roth, was ist bei Bewerbungen in Deutschland besonders?" },
        { speaker: "Anna Roth", text: "Deutsche Personaler lieben Vollständigkeit: ein Lebenslauf ohne Lücken, dazu Zeugnisse und Zertifikate. Das überrascht viele, denn in anderen Ländern zählt oft nur das Gespräch. Ein Foto ist übrigens keine Pflicht mehr." },
        { speaker: "Moderatorin", text: "Welchen Fehler sehen Sie bei internationalen Bewerbern am häufigsten?" },
        { speaker: "Anna Roth", text: "Zu viel Bescheidenheit! Viele erzählen kaum, was sie können, weil das in ihrer Kultur unhöflich wäre. Aber im Vorstellungsgespräch darf – nein, muss – man seine Stärken zeigen." },
        { speaker: "Moderatorin", text: "Und womit kann man Sie beeindrucken?" },
        { speaker: "Anna Roth", text: "Mit konkreten Beispielen statt allgemeiner Sätze. Und mit guten, vorbereiteten Fragen am Ende – daran erkenne ich echtes Interesse." },
        { speaker: "Moderatorin", text: "Wie wichtig ist perfektes Deutsch?" },
        { speaker: "Anna Roth", text: "Perfekt muss es gar nicht sein! Für viele Stellen reicht B1 völlig – wenn man ehrlich damit umgeht und weiterlernt. Wir bieten dafür sogar Kurse während der Arbeitszeit an. Mut ist wichtiger als Perfektion." }
      ],
      questions: [
        { frage: "Was ist typisch für Bewerbungen in Deutschland?", options: ["Vollständige Lebensläufe und Zeugnisse sind wichtig.", "Man bewirbt sich nur telefonisch.", "Ein Foto ist Pflicht."], answer: 0 },
        { frage: "Welchen Fehler machen internationale Bewerber oft?", options: ["Sie kommen zu früh zum Gespräch.", "Sie sind zu bescheiden.", "Sie schicken zu viele Unterlagen."], answer: 1 },
        { frage: "Womit kann man Frau Roth beeindrucken?", options: ["Mit teurer Kleidung.", "Mit langen Monologen.", "Mit konkreten Beispielen und vorbereiteten Fragen."], answer: 2 },
        { frage: "Was sagt Frau Roth über Deutschkenntnisse?", options: ["B1 reicht für viele Stellen, wenn man weiterlernt.", "Ohne perfektes Deutsch bekommt man keine Stelle.", "Deutsch ist im Beruf unwichtig."], answer: 0 }
      ]
    },
    teil5: {
      anweisung: "Sie hören eine Nachricht auf dem Anrufbeantworter. Ergänzen Sie die Notiz.",
      audio: "Guten Tag, Frau Bianchi, hier ist die Sprachschule Aktiv, Sie sprechen mit Herrn Kaya. Es geht um Ihren Berufssprachkurs B2: Der Kurs beginnt am Montag, dem zweiten September, um achtzehn Uhr dreißig in Raum vier. Bitte bringen Sie zur ersten Stunde unbedingt Ihren Berechtigungsschein vom Arbeitsamt mit, sonst können wir Sie nicht anmelden. Die Bücher müssen Sie nicht kaufen, die stellt die Schule. Ach ja, wichtig: Der Eingang ist jetzt auf der Rückseite des Gebäudes, in der Mozartstraße. Bei Fragen erreichen Sie uns unter null sieben eins eins, fünf fünf zwei null. Auf Wiederhören!",
      noteTitle: "Notiz: Anruf von der Sprachschule",
      gaps: [
        { label: "Es ruft an: Herr ____", answer: "Kaya", alt: [] },
        { label: "Kursbeginn: Montag um ____ Uhr", answer: "18:30", alt: ["18.30", "achtzehn Uhr dreißig", "halb sieben", "1830"] },
        { label: "Mitbringen: ____ vom Arbeitsamt", answer: "Berechtigungsschein", alt: ["den Berechtigungsschein"] },
        { label: "Neuer Eingang: in der ____", answer: "Mozartstraße", alt: ["Mozartstrasse"] }
      ]
    }
  },

  schreiben: {
    anweisung: "Beantworten Sie die E-Mail. Schreiben Sie zu allen drei Punkten (insgesamt ca. 40–60 Wörter).",
    situation: "Ihre Freundin Elif hat ein Jobangebot aus Deutschland und fragt Sie nach Ihren Erfahrungen.",
    incomingEmail: {
      von: "elif.arslan@mail.com",
      betreff: "Vielleicht komme ich auch!",
      text: "Hallo!\n\nstell dir vor: Eine Firma in Deutschland hat mir eine Stelle angeboten! Jetzt muss ich mich entscheiden. Du lebst ja schon länger dort – wie war dein Anfang? Was war für dich am schwersten? Und hast du einen Tipp, was ich vor dem Umzug unbedingt erledigen soll?\n\nLiebe Grüße\nElif"
    },
    points: [
      "Erzählen Sie kurz, wie Ihr Anfang in Deutschland war.",
      "Schreiben Sie, was am Anfang am schwersten war.",
      "Geben Sie Elif einen Tipp, was sie vor dem Umzug erledigen soll."
    ],
    musterloesung: "Hallo Elif,\n\nwas für eine tolle Nachricht! Mein Anfang war aufregend: Die Kollegen waren nett, und ich habe schnell Freunde gefunden. Am schwersten war die Bürokratie – so viele Formulare! Mein Tipp: Lass deine Zeugnisse schon vor dem Umzug übersetzen und kümmere dich früh um die wichtigen Dokumente. Dann ist der Start viel leichter. Frag mich gern, wenn du mehr wissen möchtest!\n\nLiebe Grüße",
    tipps: "Three clear parts: your experience (Perfekt!), the hardest thing (superlative \"am schwersten\"), and an imperative tip (\"Lass ... übersetzen\", \"kümmere dich um ...\"). That combination shows exactly the B1 range examiners reward."
  },

  sprechen: {
    teil1: {
      anweisung: "Stellen Sie sich vor. Sprechen Sie über die Punkte.",
      punkte: ["Name", "Alter", "Wohnort", "Familie", "Arbeit / Beruf", "Sprachen", "Hobbys"],
      redemittel: [
        "Darf ich mich vorstellen? Mein Name ist ...",
        "Ich bin vor ... Jahren nach Deutschland gekommen.",
        "Ursprünglich stamme ich aus ..., jetzt lebe ich in ...",
        "Ich lebe hier mit ... / Meine Familie ist noch in ...",
        "Ich arbeite als ... und möchte später ...",
        "Neben ... und ... lerne ich jetzt Deutsch.",
        "Meine Freizeit verbringe ich am liebsten mit ..."
      ]
    },
    teil2: {
      thema: "Leben in einem anderen Land",
      anweisung: "Sprechen Sie über das Thema. Die Fragen helfen Ihnen.",
      leitfragen: [
        "Was war für Sie am Anfang in Deutschland neu oder überraschend?",
        "Was vermissen Sie aus Ihrer Heimat am meisten?",
        "Was gefällt Ihnen hier besser, was weniger?",
        "Könnten Sie sich vorstellen, noch einmal in ein anderes Land zu ziehen?"
      ],
      redemittel: [
        "Am Anfang war für mich ... völlig neu.",
        "Am meisten vermisse ich ..., vor allem ...",
        "Einerseits gefällt mir hier ..., andererseits ...",
        "Im Vergleich zu meiner Heimat ist ...",
        "Ich könnte mir (nicht) vorstellen, ..., weil ..."
      ]
    },
    teil3: {
      aufgabe: "Eine Freundin aus Ihrem Heimatland zieht nächsten Monat in Ihre Stadt. Planen Sie zusammen ihre erste Woche.",
      anweisung: "Planen Sie gemeinsam. Sprechen Sie über die Punkte.",
      punkte: ["Wer holt sie vom Flughafen ab?", "Welche Ämter und Termine sind wichtig?", "Was zeigen Sie ihr in der Stadt?", "Wie organisieren Sie das Willkommensessen?"],
      redemittel: [
        "Ich schlage vor, dass ich ... übernehme.",
        "Ganz wichtig ist, dass sie zuerst ...",
        "Wir könnten ihr am Wochenende ... zeigen.",
        "Sollen wir für das Essen ... oder lieber ...?",
        "Perfekt, dann ist alles geplant!"
      ]
    }
  }
} as const satisfies Exam;

export default exam;
