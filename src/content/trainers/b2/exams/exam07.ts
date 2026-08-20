import { type TelcExam } from '@shared/types';

const exam = {
  id: 7,
  level: 'b2',
  title: 'Modelltest 7',
  theme: 'Stadtleben & Wohnen',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Mietpreisbremse zeigt laut Studie kaum Wirkung',
        'Urban Gardening: Gemüsebeete erobern die Innenstädte',
        'Leerstehende Büros werden zu Wohnungen umgebaut',
        'Streit um autofreie Innenstadt spitzt sich zu',
        'Wohnungstausch: Senioren überlassen Familien ihre großen Wohnungen',
        'Neubaugebiet am Stadtrand: Anwohner fürchten Verkehrschaos',
        'Winternothilfe für Obdachlose wird ausgeweitet',
        'Nachbarschafts-App bringt die Generationen zusammen',
        'Steigende Baukosten: Verbände fordern staatliche Förderung',
        'Gericht entscheidet: Kinderlärm ist kein Kündigungsgrund'
      ],
      texts: [
        'Seit der Corona-Zeit arbeiten viele Beschäftigte von zu Hause — mit sichtbaren Folgen für die Geschäftsviertel: In manchen Großstädten steht inzwischen jede sechste Bürofläche leer. Mehrere Kommunen machen daraus nun eine Tugend und unterstützen Eigentümer dabei, ungenutzte Verwaltungsgebäude in bezahlbare Wohnungen umzuwandeln. Fachleute dämpfen allerdings die Erwartungen: Nicht jedes Bürohaus eigne sich dafür, und die Umbaukosten seien oft beträchtlich.',
        'Wo früher Autos parkten, wachsen heute Tomaten: Auf dem ehemaligen Parkdeck eines Kaufhauses in der Innenstadt bewirtschaften Anwohnerinnen und Anwohner seit dem Frühjahr über hundert Hochbeete. Ähnliche Projekte entstehen derzeit in vielen deutschen Städten — auf Dächern, Brachflächen und sogar an Hauswänden. Den Initiativen geht es dabei um mehr als Gemüse: Sie wollen Nachbarn zusammenbringen und das Stadtklima verbessern.',
        'Viele ältere Menschen leben allein in großen Wohnungen, während junge Familien verzweifelt Platz suchen. Eine städtische Wohnungsgesellschaft bringt nun beide Seiten gezielt zusammen: Wer seine zu groß gewordene Wohnung abgibt, erhält garantiert eine kleinere im selben Viertel — zur alten Quadratmetermiete und mit kostenlosem Umzugsservice. Über zweihundert Haushalte haben das Angebot bereits genutzt, die Warteliste wächst.',
        'Eigentlich sollte der Beschluss längst gefasst sein, doch nun eskaliert die Auseinandersetzung: Nachdem der Gemeinderat angekündigt hatte, die Kernstadt bis auf Lieferverkehr und Busse für Autos zu sperren, sammelt ein Bündnis aus Händlern und Pendlern Unterschriften für einen Bürgerentscheid. Umweltgruppen halten dagegen und verweisen auf Städte, in denen der Handel von der Sperrung sogar profitiert habe.',
        'Einen Bohrer ausleihen, gemeinsam kochen oder einfach jemanden zum Reden finden: Eine Plattform, die zunächst nur in einem Münchner Stadtteil erprobt wurde, vernetzt inzwischen bundesweit mehr als zwei Millionen Nachbarinnen und Nachbarn. Besonders beliebt ist sie bei Älteren, die über die digitale Pinnwand Anschluss finden — und bei Jüngeren, die spontan Hilfe im Alltag suchen oder anbieten.'
      ],
      answers: [2, 1, 4, 3, 7]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Unter einem Dach — mit 9 und 79',
      text: `Wenn Ingrid Sommer morgens die Zeitung holt, wird sie im Treppenhaus meist schon erwartet: Der neunjährige Erik aus dem zweiten Stock übt mit ihr Kopfrechnen, seit sie ihm einmal bei den Hausaufgaben geholfen hat. Die 79-Jährige lebt seit drei Jahren im „Hofgarten“, einem Mehrgenerationenprojekt mit vierundzwanzig Wohnungen in Bochum. Nach dem Tod ihres Mannes war ihr das Einfamilienhaus am Stadtrand zu groß und zu still geworden. „Ich wollte kleiner wohnen, aber auf keinen Fall in ein Seniorenheim“, erzählt sie.

Das Zusammenleben im Hofgarten folgt klaren Regeln: Jede Partei hat ihre eigene, abgeschlossene Wohnung, verpflichtet sich aber, monatlich einige Stunden für die Gemeinschaft zu übernehmen — im geteilten Garten, beim wöchentlichen Kochabend oder bei der Betreuung des Gemeinschaftsraums. Dass es dabei nicht immer harmonisch zugeht, verschweigt hier niemand. Über Lärm im Hof und die Nutzung der Waschküche wurde anfangs heftig gestritten. Geholfen hat eine feste Einrichtung: Einmal im Monat setzen sich alle Bewohnerinnen und Bewohner zusammen und verhandeln die strittigen Punkte, bis eine Lösung gefunden ist.

Die Soziologin Prof. Carla Menzel beobachtet solche Wohnprojekte seit Jahren. Die Nachfrage sei enorm, sagt sie; auf einen freien Platz kämen vielerorts zwanzig Bewerbungen. Studien zeigten, dass die Bewohner seltener vereinsamen und sich im Alltag spürbar entlasten. Geeignet sei das Modell dennoch nicht für jeden: „Wer sich nicht einbringen will, wird hier nicht glücklich.“ Damit die Projekte mehr als eine Nische bleiben, müssten die Städte zudem günstige Grundstücke bereitstellen — daran scheitere es bislang am häufigsten.

Ingrid Sommer hat ihre Entscheidung nie bereut. Wenn sie krank ist, kauft die Nachbarin für sie ein; dafür gießt sie deren Blumen und passt auf Erik auf, wenn dessen Eltern länger arbeiten. „Ich habe hier mehr Gesellschaft als in vierzig Jahren Einfamilienhaus“, sagt sie. „Hier ziehe ich erst wieder aus, wenn es gar nicht mehr anders geht.“`,
      questions: [
        {
          frage: 'Frau Sommer zog in das Wohnprojekt, weil …',
          options: [
            'ihr Haus nach dem Tod ihres Mannes zu groß und einsam war.',
            'ihre Familie sie dazu überredet hatte.',
            'sie dort betreut und gepflegt werden wollte.'
          ],
          answer: 0
        },
        {
          frage: 'Die Bewohnerinnen und Bewohner des Hofgartens …',
          options: [
            'teilen sich große Gemeinschaftswohnungen.',
            'müssen regelmäßig Aufgaben für die Gemeinschaft übernehmen.',
            'sind zur Teilnahme am wöchentlichen Kochabend verpflichtet.'
          ],
          answer: 1
        },
        {
          frage: 'Konflikte im Haus …',
          options: [
            'kommen praktisch nicht vor.',
            'werden bei regelmäßigen Treffen gemeinsam gelöst.',
            'haben mehrere Parteien zum Auszug bewegt.'
          ],
          answer: 1
        },
        {
          frage: 'Prof. Menzel meint, dass solche Projekte …',
          options: [
            'nur wenige Interessenten finden.',
            'für alle Menschen die passende Wohnform sind.',
            'ohne günstige Grundstücke der Städte selten bleiben.'
          ],
          answer: 2
        },
        {
          frage: 'Heute …',
          options: [
            'denkt Frau Sommer über eine Rückkehr ins Einfamilienhaus nach.',
            'möchte Frau Sommer so lange wie möglich im Projekt bleiben.',
            'fühlt sich Frau Sommer im Projekt oft allein.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Eine Studentin sucht ein Zimmer in einer Wohngemeinschaft.',
        'Sie brauchen für Ihren Umzug kurzfristig Helfer und einen Transporter.',
        'Ein älterer Nachbar sucht eine barrierefreie Wohnung mit Aufzug.',
        'Eine Freundin hält ihre Mieterhöhung für unberechtigt und möchte sie prüfen lassen.',
        'Sie möchten Gemüse anbauen, haben aber keinen eigenen Garten.',
        'Ein Kollege will eine Eigentumswohnung kaufen und sucht eine neutrale Finanzierungsberatung.',
        'Ihre Eltern wollen ihr Haus energetisch sanieren und über Fördermittel informiert werden.',
        'Ein Freund braucht für ein dreimonatiges Praktikum ein möbliertes Zimmer.',
        'Sie suchen in Ihrem Viertel einen Raum für eine private Familienfeier.',
        'Eine Familie möchte ihre kleine Wohnung gegen eine größere tauschen.'
      ],
      ads: [
        'Immobilien Royal: Exklusive Villen und Penthouse-Wohnungen in Bestlagen — diskrete Vermittlung für anspruchsvolle Kundschaft.',
        'WG-Börse Campus: Geprüfte Zimmerangebote in Wohngemeinschaften, speziell für Studierende — kostenlos inserieren und suchen.',
        'Umzugsprofis 24: Transporter inklusive zwei Helfern ab 89 Euro — kurzfristige Termine, auch am Wochenende und feiertags.',
        'Mieterverein Stadtmitte: Wir prüfen Mieterhöhungen, Nebenkostenabrechnungen und Mietverträge — Erstberatung für Mitglieder inklusive.',
        'Wohnungsgenossenschaft Am Park: Barrierefreie Zwei-Zimmer-Wohnungen mit Aufzug und Notrufsystem, auf Wunsch mit Betreuungsservice.',
        'Gartenprojekt Stadtacker: Mieten Sie Ihre eigene Gemüseparzelle ab 30 Quadratmetern mitten in der Stadt — Wasser und Geräte vorhanden.',
        'FinanzKompass: Unabhängige Baufinanzierungsberatung auf Honorarbasis — wir verkaufen keine Kredite, wir vergleichen sie für Sie.',
        'Zeitwohnen City: Möblierte Zimmer und Apartments für einen bis sechs Monate — ideal für Praktikum oder Projektarbeit, alles inklusive.',
        'Lagerbox Nord: Saubere und trockene Lagerräume von 1 bis 50 Quadratmetern, Zugang rund um die Uhr — schon ab einem Monat Laufzeit.',
        'Nachbarschaftszentrum Lindenhof: Unser Saal für bis zu 80 Personen kann für private Feiern gemietet werden — Küche und Geschirr inklusive.',
        'Energieagentur Region: Neutrale Beratung zu Dämmung, Heizung und Solarenergie — mit Überblick über alle staatlichen Förderprogramme.',
        'Tauschwohnung.de: Groß gegen klein, klein gegen groß — die Online-Börse für den direkten Wohnungstausch. Inserieren Sie kostenlos!'
      ],
      answers: [1, 2, 4, 3, 5, 6, 10, 7, 9, 11]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Frau Neumann,

leider muss ich mich erneut an Sie wenden, [1] die Heizung in meiner Wohnung (Fichtenweg 12, 3. Obergeschoss) seit dem 2. November wieder ausgefallen ist. Trotz meiner telefonischen Meldung vor zwei Wochen ist bisher nichts [2].

Die Temperatur in den Wohnräumen [3] tagsüber kaum noch 16 Grad. Da ich ein kleines Kind habe, ist dieser Zustand für mich nicht länger [4]. Hinzu kommt, dass sich im Schlafzimmer an der Außenwand Schimmel gebildet hat, [5] Beseitigung ich hiermit ebenfalls fordere.

Ich setze Ihnen eine Frist [6] 30. November, um die Heizung reparieren und den Schimmel fachgerecht entfernen zu [7]. Sollte bis dahin nichts geschehen, werde ich die Miete [8] und mich an den Mieterverein wenden.

Im Übrigen [9] ich Sie darauf hin, dass laut Mietvertrag in der Heizperiode eine Mindesttemperatur von 20 Grad gewährleistet sein muss. Ich gehe davon aus, dass Sie die Angelegenheit nun mit der gebotenen Dringlichkeit [10].

Mit freundlichen Grüßen
Leila Haddad`,
      gaps: [
        { options: ['denn', 'da', 'ob'], answer: 1 },
        { options: ['gelungen', 'entstanden', 'geschehen'], answer: 2 },
        { options: ['erreicht', 'gelangt', 'steigt'], answer: 0 },
        { options: ['bemerkbar', 'verfügbar', 'zumutbar'], answer: 2 },
        { options: ['deren', 'dessen', 'welcher'], answer: 1 },
        { options: ['seit dem', 'ab dem', 'bis zum'], answer: 2 },
        { options: ['lassen', 'werden', 'haben'], answer: 0 },
        { options: ['sinken', 'mindern', 'ermäßigen'], answer: 1 },
        { options: ['zeige', 'deute', 'weise'], answer: 2 },
        { options: ['behandeln', 'verhandeln', 'handeln'], answer: 0 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

als Anwohnerin der Birkenstraße möchte ich Sie auf den [1] des Spielplatzes an der Ecke Birkenstraße/Ahornweg aufmerksam machen.

Mehrere Geräte sind seit Monaten beschädigt: Die Rutsche ist gesperrt, zwei Schaukeln fehlen [2], und der Sandkasten wird immer wieder durch Glasscherben [3]. Für die vielen Familien im Viertel ist der Platz dadurch praktisch nicht mehr [4].

Bereits im Juni habe ich mich telefonisch an Ihr Amt [5]. Damals wurde mir eine baldige Reparatur [6] — geschehen ist jedoch bis heute nichts.

Ich [7] Sie daher dringend, die Geräte instand zu setzen und den Platz wieder regelmäßig reinigen zu lassen. Gern bin ich auch bereit, mich gemeinsam mit anderen Eltern ehrenamtlich an der Pflege zu [8].

Über eine kurze Rückmeldung, bis wann mit einer Reparatur zu [9] ist, würde ich mich sehr freuen. Eine Liste der Mängel mit Fotos habe ich diesem Schreiben [10].

Mit freundlichen Grüßen
Marta Nowak`,
      wordBank: [
        'Anblick',
        'beigefügt',
        'beteiligen',
        'bitte',
        'erwarten',
        'gewandt',
        'nutzbar',
        'rechnen',
        'sauber',
        'teilnehmen',
        'unbrauchbar',
        'verschmutzt',
        'vollständig',
        'zugesagt',
        'Zustand'
      ],
      answers: [14, 12, 11, 6, 5, 13, 3, 2, 7, 1]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Fahrgäste können die neue Straßenbahnlinie ab kommendem Montag nutzen.',
          answer: false,
          audio:
            'Nachrichten aus dem Rathaus: Die neue Straßenbahnlinie 7 zum Universitätsklinikum ist so gut wie fertig. Ab Montag beginnen auf der Strecke die mehrwöchigen Testfahrten — allerdings noch ohne Fahrgäste. Für den regulären Betrieb nennt die Verkehrsgesellschaft nun Mitte Dezember als Termin. Bis dahin verkehrt auf der Strecke weiterhin die Buslinie 47.'
        },
        {
          statement: 'Die Stadt will künftig mehr Sozialwohnungen pro Jahr bauen als bisher.',
          answer: true,
          audio:
            'Der Stadtrat hat gestern Abend ein neues Wohnungsbauprogramm beschlossen. Danach sollen in den kommenden zehn Jahren jährlich achthundert Sozialwohnungen entstehen — doppelt so viele wie bisher. Finanziert wird das Programm über einen städtischen Fonds und Fördermittel des Landes. Die Opposition begrüßte das Ziel, bezweifelte jedoch, dass genügend Bauland zur Verfügung steht.'
        },
        {
          statement: 'Laut dem neuen Mietspiegel sind die Mieten in der Stadt gesunken.',
          answer: false,
          audio:
            'Der neue Mietspiegel ist da — und er bestätigt den Trend der vergangenen Jahre: Die Durchschnittsmieten in der Stadt sind erneut gestiegen, um knapp sechs Prozent innerhalb von zwei Jahren. Besonders teuer wurden kleine Wohnungen in zentralen Lagen. Der Mieterverein forderte die Politik auf, endlich wirksame Maßnahmen gegen den Anstieg zu ergreifen.'
        },
        {
          statement: 'Während des Stadtfests sind mehrere Straßen für den Autoverkehr gesperrt.',
          answer: true,
          audio:
            'Am Wochenende feiert unsere Stadt ihr großes Sommerfest rund um den Marktplatz. Autofahrer müssen sich auf Einschränkungen einstellen: Von Freitagnachmittag bis Sonntagnacht bleiben die Hauptstraße, der Kirchweg und die Uferstraße komplett für den Verkehr gesperrt. Die Stadt empfiehlt, mit Bus und Bahn anzureisen — alle Linien fahren am Festwochenende häufiger.'
        },
        {
          statement: 'Das Freibad öffnet in dieser Saison früher als in den Vorjahren.',
          answer: true,
          audio:
            'Gute Nachrichten für alle Schwimmfans: Dank des milden Frühlings öffnet das Freibad am Stadtwald bereits am ersten Aprilwochenende — so früh wie nie zuvor. In den vergangenen Jahren begann die Saison stets erst Anfang Mai. Die Eintrittspreise bleiben in dieser Saison unverändert, Dauerkarten sind ab sofort online sowie an der Kasse des Hallenbads erhältlich.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Herzlich willkommen zu „Stadtgespräch“. Mein Gast ist heute Professor Jan Roth, er lehrt Stadtplanung und berät Kommunen beim Umbau ihrer Zentren. Herr Roth, Sie beschäftigen sich seit mehr als zwanzig Jahren mit der Frage, was Städte lebenswert macht. Wie fällt Ihr Urteil über deutsche Innenstädte aus?'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Gemischt. Unsere Innenstädte wurden über Jahrzehnte in erster Linie für das Auto geplant — breite Fahrbahnen, Parkplätze auf jedem freien Fleck. Für Menschen, die zu Fuß unterwegs sind, für Kinder oder für ältere Leute bleibt oft erstaunlich wenig Raum. Genau das rächt sich jetzt, wo die Zentren um ihre Besucher kämpfen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Andere Länder sind da weiter. Welches Beispiel finden Sie überzeugend?'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Barcelona ist ein gutes Beispiel. Dort wurden ganze Wohnviertel zu sogenannten Superblocks zusammengefasst: Der Durchgangsverkehr muss außen herumfahren, im Inneren gehören die Straßen den Anwohnern — mit Bänken, Spielflächen und Bäumen. Die Luft ist messbar besser geworden, und der Lärm hat deutlich abgenommen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Solche Umbauten klingen nach Großbaustellen, die Jahrzehnte dauern.'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Das ist ein weit verbreiteter Irrtum. Vieles lässt sich zunächst mit einfachen Mitteln erproben: Farbe auf dem Asphalt, Pflanzkübel, ein paar Bänke — fertig ist der Versuch. Wenn er sich bewährt, baut man dauerhaft um; wenn nicht, nimmt man alles wieder weg. So ein Probelauf kostet einen Bruchteil und schafft Vertrauen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Sie haben so einen Versuch in Ihrer eigenen Stadt begleitet. Wie waren die Reaktionen?'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Anfangs gab es heftigen Protest — Unterschriftenlisten, wütende Leserbriefe, vor allem wegen der wegfallenden Parkplätze. Das muss man aushalten. Nach einem Jahr haben wir die Anwohner dann befragen lassen: Fast siebzig Prozent wollten die neue Straße behalten, nur eine kleine Minderheit wünschte sich den alten Zustand zurück.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Die Händler fürchten trotzdem um ihre Umsätze, wenn Kunden nicht mehr mit dem Auto vorfahren können.'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Diese Sorge ist verständlich, aber die Daten sprechen eine andere Sprache. Studien aus mehreren Ländern zeigen: In verkehrsberuhigten Straßen bleiben die Menschen länger, kommen häufiger wieder und geben insgesamt mehr aus. Wer zu Fuß oder mit dem Rad kommt, kauft zwar pro Besuch weniger — dafür aber öfter.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Kommen wir zum zweiten großen Thema: dem Wohnungsmangel. Was schlagen Sie vor?'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Zuallererst: das Vorhandene besser nutzen. In vielen Städten stehen Bürogebäude und sogar ganze Parkhäuser halb leer — die lassen sich zu Wohnungen umbauen. Immer neue Wohngebiete auf der grünen Wiese am Stadtrand halte ich dagegen für den falschen Weg: Sie zerstören Flächen, erzeugen Pendlerverkehr und teure Infrastruktur.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was raten Sie Städten, die jetzt mit dem Umbau beginnen wollen?'
        },
        {
          speaker: 'Prof. Roth',
          text: 'Beteiligen Sie die Bürgerinnen und Bürger so früh wie möglich — nicht erst, wenn die Pläne fertig sind. Wer mitreden und mitgestalten darf, trägt Veränderungen später mit. Und: Fangen Sie klein an, mit einer Straße, einem Platz. Der sichtbare Erfolg überzeugt am Ende mehr als jedes Gutachten.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Professor Roth, haben Sie vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        {
          statement: 'Herr Roth beschäftigt sich seit über zwanzig Jahren mit Stadtplanung.',
          answer: true
        },
        {
          statement: 'Deutsche Innenstädte wurden seiner Ansicht nach vor allem für Fußgänger geplant.',
          answer: false
        },
        {
          statement: 'In den Superblocks von Barcelona muss der Durchgangsverkehr außen herumfahren.',
          answer: true
        },
        {
          statement: 'Umbauten können laut Herrn Roth nur durch jahrelange Großbaustellen erprobt werden.',
          answer: false
        },
        {
          statement: 'Gegen den Versuch in seiner Stadt gab es zu Beginn starken Protest.',
          answer: true
        },
        {
          statement: 'Nach einem Jahr wollte die Mehrheit der Anwohner den alten Zustand der Straße zurück.',
          answer: false
        },
        {
          statement:
            'Studien zeigen, dass Kunden in verkehrsberuhigten Straßen insgesamt mehr Geld ausgeben.',
          answer: true
        },
        {
          statement: 'Herr Roth schlägt vor, leere Büros und Parkhäuser zu Wohnungen umzubauen.',
          answer: true
        },
        {
          statement: 'Neue Wohngebiete am Stadtrand hält Herr Roth für die beste Lösung.',
          answer: false
        },
        {
          statement: 'Herr Roth empfiehlt, die Bürger möglichst früh an Planungen zu beteiligen.',
          answer: true
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Linie U3 fährt heute nicht auf der gesamten Strecke.',
          answer: true,
          audio:
            'Achtung an Gleis zwei, eine Information zur Linie U3 in Richtung Hauptbahnhof: Wegen einer technischen Störung ist der Abschnitt zwischen Messegelände und Westpark heute bis Betriebsschluss gesperrt. Zwischen diesen Stationen sind Ersatzbusse für Sie im Einsatz, die alle Zwischenhalte bedienen. Auf dem übrigen Streckenabschnitt verkehrt die U3 planmäßig. Wir bitten um Entschuldigung.'
        },
        {
          statement: 'Das Bürgeramt bleibt am Donnerstag den ganzen Tag geschlossen.',
          answer: false,
          audio:
            'Eine Mitteilung der Stadtverwaltung: Wegen einer internen Fortbildung öffnet das Bürgeramt am Rathausplatz am kommenden Donnerstag erst um dreizehn Uhr. Ab dem Nachmittag sind alle Schalter wieder wie gewohnt bis achtzehn Uhr für Sie besetzt. Bereits vereinbarte Vormittagstermine werden telefonisch verschoben. Online-Dienste stehen Ihnen selbstverständlich rund um die Uhr zur Verfügung.'
        },
        {
          statement: 'Die Anwohner sollen ihre Fahrzeuge bis Montag umparken.',
          answer: true,
          audio:
            'Eine Durchsage des Ordnungsamts an die Anwohnerinnen und Anwohner der Gartenstraße: Ab Montag früh sieben Uhr beginnen in Ihrer Straße die angekündigten Arbeiten zur Fahrbahnerneuerung. Bitte parken Sie Ihre Fahrzeuge bis Sonntagabend außerhalb des Baustellenbereichs um. Fahrzeuge, die am Montag noch dort stehen, müssen kostenpflichtig abgeschleppt werden. Ausweichparkplätze finden Sie am Sportplatz.'
        },
        {
          statement: 'Das Hallenbad ist mehrere Wochen lang geschlossen.',
          answer: false,
          audio:
            'Liebe Badegäste, bitte beachten Sie: Wegen einer Reparatur an der Lüftungsanlage bleibt unser Hallenbad von Montag bis einschließlich Mittwoch geschlossen. Ab Donnerstag früh um sechs Uhr dreißig sind wir wieder mit allen Becken und der Sauna für Sie da. Gültige Tageskarten können an der Kasse umgetauscht oder erstattet werden. Wir danken für Ihr Verständnis.'
        },
        {
          statement: 'Der Wertstoffhof ist künftig auch samstags geöffnet.',
          answer: true,
          audio:
            'Eine Information der Stadtwerke: Um lange Wartezeiten zu vermeiden, erweitert der Wertstoffhof an der Industriestraße seine Öffnungszeiten. Ab dem ersten März können Sie Sperrmüll, Elektrogeräte und Grünschnitt zusätzlich auch samstags von acht bis vierzehn Uhr abgeben. Unter der Woche gelten die gewohnten Zeiten. Bitte denken Sie daran, einen Nachweis Ihres Wohnsitzes mitzubringen.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Wählen Sie EINE der beiden Aufgaben. Sie haben 30 Minuten Zeit. Schreiben Sie einen formellen Brief (150–200 Wörter). Behandeln Sie mindestens zwei der vier Leitpunkte sowie einen eigenen Punkt. Achten Sie auf Betreff, Anrede und Grußformel.',
    tasks: [
      {
        titel: 'Anfrage: Wohnung bei einer Genossenschaft',
        situation:
          'Sie suchen seit Längerem eine bezahlbare Drei-Zimmer-Wohnung. Eine Wohnungsgenossenschaft in Ihrem Wunschviertel vergibt Wohnungen an ihre Mitglieder. Schreiben Sie an die Genossenschaft.',
        leitpunkte: [
          'Stellen Sie sich und Ihre Wohnsituation kurz vor.',
          'Beschreiben Sie, was für eine Wohnung Sie suchen.',
          'Fragen Sie nach den Bedingungen einer Mitgliedschaft und den Wartezeiten.',
          'Bitten Sie um Unterlagen oder einen Beratungstermin.'
        ],
        musterloesung: `Betreff: Anfrage zu Mitgliedschaft und Wohnungsangebot

Sehr geehrte Damen und Herren,

durch einen Bericht in der Stadtteilzeitung bin ich auf Ihre Genossenschaft aufmerksam geworden und möchte mich nach einer Wohnung sowie den Aufnahmebedingungen erkundigen.

Ich bin 34 Jahre alt, arbeite als Erzieherin und lebe mit meinem Mann und unserer kleinen Tochter derzeit in einer Zwei-Zimmer-Wohnung am Stadtrand. Da unsere Wohnung für drei Personen inzwischen deutlich zu klein ist, suchen wir eine Drei-Zimmer-Wohnung mit etwa 75 Quadratmetern, gern mit Balkon — bevorzugt im Lindenviertel, wo auch die Kita unserer Tochter liegt.

Ihrer Internetseite habe ich entnommen, dass Wohnungen nur an Mitglieder vergeben werden. Könnten Sie mir mitteilen, wie hoch die Genossenschaftsanteile sind, welche Unterlagen Sie für die Aufnahme benötigen und mit welcher Wartezeit wir rechnen müssten? Außerdem wüsste ich gern, ob junge Familien bei der Vergabe besonders berücksichtigt werden.

Über die Zusendung der Unterlagen oder einen persönlichen Beratungstermin würde ich mich sehr freuen.

Mit freundlichen Grüßen
Marta Nowak`
      },
      {
        titel: 'Antrag: Genehmigung eines Nachbarschaftsfests',
        situation:
          'Sie möchten mit Ihren Nachbarinnen und Nachbarn ein Straßenfest organisieren, damit sich die Menschen im Viertel besser kennenlernen. Dafür muss die Straße einen Tag lang gesperrt werden. Schreiben Sie an das Bezirksamt.',
        leitpunkte: [
          'Beschreiben Sie, was Sie planen (Anlass, Datum, Ort, Programm).',
          'Beantragen Sie die Sperrung der Straße für diesen Tag.',
          'Erklären Sie, wie Sie für Sicherheit, Lärmschutz und Sauberkeit sorgen.',
          'Bitten Sie um Informationen zu Auflagen und Gebühren.'
        ],
        musterloesung: `Betreff: Antrag auf Genehmigung eines Nachbarschaftsfests am 6. September

Sehr geehrte Damen und Herren,

im Namen der Nachbarschaftsinitiative Holunderweg beantrage ich die Genehmigung für ein Straßenfest am Samstag, dem 6. September, von 14 bis 22 Uhr.

Viele Bewohnerinnen und Bewohner unserer Straße kennen einander kaum. Mit einem gemeinsamen Fest — geplant sind ein Kuchenbuffet, Spiele für Kinder und Musik einer Schülerband — möchten wir das ändern. Erwartet werden etwa 120 Gäste.

Hierfür beantragen wir, den Holunderweg zwischen Hausnummer 2 und 28 an diesem Tag von 10 bis 24 Uhr für den Verkehr zu sperren. Die Anwohner wurden bereits informiert und unterstützen das Vorhaben mit großer Mehrheit.

Selbstverständlich übernehmen wir die Verantwortung vor Ort: Zwei Ordner begleiten die Veranstaltung, die Musik endet um 21 Uhr, und die Straße wird noch am Abend vollständig gereinigt.

Bitte teilen Sie uns mit, welche Auflagen wir beachten müssen und welche Gebühren anfallen. Für Rückfragen stehe ich jederzeit gern zur Verfügung.

Mit freundlichen Grüßen
Jonas Keller`
      }
    ],
    tipps:
      'Formell heißt: Betreff, Sie-Form, keine Umgangssprache. Bei Anfrage und Antrag gilt: erst der Anlass, dann das konkrete Anliegen, zum Schluss die höfliche Bitte um Antwort. Nutzen Sie den Konjunktiv II (könnten, würde, wüsste gern) und Konnektoren (da, außerdem, hierfür). Am Ende zählen: 150–200 Wörter, mindestens zwei Leitpunkte plus ein eigener Punkt.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Präsentation',
      anweisung:
        'Wählen Sie ein Thema und präsentieren Sie es Ihrer Partnerin / Ihrem Partner (ca. 2,5 Minuten): „Ein Ort, an dem ich gern gelebt habe“. Gehen Sie auf die Punkte ein und beantworten Sie danach Fragen.',
      punkte: [
        'Beschreiben Sie den Ort und Ihre damalige Wohnsituation.',
        'Erklären Sie, was das Leben dort besonders gemacht hat.',
        'Vergleichen Sie das Wohnen dort mit Ihrem heutigen Wohnort.',
        'Ziehen Sie ein kurzes Fazit: Wie möchten Sie in Zukunft wohnen?'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von … erzählen, wo ich … gelebt habe.',
        'Das Besondere an diesem Ort war, dass …',
        'Verglichen mit meinem heutigen Wohnort …',
        'Was mir dort gefehlt hat, war allerdings …',
        'Alles in allem wünsche ich mir für die Zukunft, dass …',
        'Möchten Sie noch etwas genauer wissen?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Wohnen ist ein Grundrecht — der Staat muss die Mieten deckeln!“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen oder eigenen Erfahrungen bei der Wohnungssuche.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Ich halte diese Forderung für richtig/übertrieben, weil …',
        'Bei meiner eigenen Wohnungssuche habe ich erlebt, dass …',
        'Auf der anderen Seite darf man nicht vergessen, dass …',
        'Das Argument überzeugt mich nicht ganz, denn …',
        'In diesem Punkt sind wir uns einig, aber …',
        'Als Kompromiss könnten wir festhalten, dass …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Der Innenhof Ihres Wohnhauses ist ungenutzt und soll von der Hausgemeinschaft neu gestaltet werden. Die Hausverwaltung stellt dafür 800 Euro zur Verfügung. Planen Sie die Umgestaltung gemeinsam.',
      punkte: [
        'Was soll im Hof entstehen (Sitzecke, Beete, Spielbereich, Fahrradständer)?',
        'Wofür geben Sie das Budget aus und was kann gespendet oder selbst gebaut werden?',
        'Wer übernimmt welche Aufgaben bei Umbau und späterer Pflege?',
        'Wie informieren und beteiligen Sie die übrigen Nachbarinnen und Nachbarn?'
      ],
      redemittel: [
        'Ich fände es schön, wenn wir zuerst …',
        'Dafür sollten wir höchstens … ausgeben, denn …',
        'Das könnte ich übernehmen. / Wären Sie bereit, sich um … zu kümmern?',
        'Gute Idee — allerdings müssen wir auch an … denken.',
        'Einigen wir uns also darauf, dass …',
        'Zum Schluss halten wir fest, wer was bis wann erledigt.'
      ]
    }
  }
} as const satisfies TelcExam;

export default exam;
