import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 10,
  level: 'b2',
  title: 'Modelltest 10',
  theme: 'Kultur, Reisen & Tourismus',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Übertourismus: Inselbewohner fordern Obergrenzen',
        'Museen locken junges Publikum mit langen Nächten',
        'Bahn statt Flugzeug: Nachtzüge erleben ein Comeback',
        'Streit um Eintrittspreise: Theater wehrt sich gegen Kritik',
        'Urlaub auf dem Bauernhof so gefragt wie nie',
        'Studie: Kreuzfahrten schaden dem Klima besonders stark',
        'Stadt führt Übernachtungssteuer für Touristen ein',
        'Reisebüros vor dem Aus? Branche erfindet sich neu',
        'Weltkulturerbe in Gefahr: UNESCO schlägt Alarm',
        'Immer mehr Deutsche verbringen den Urlaub im eigenen Land'
      ],
      texts: [
        'Wer glaubt, das Internet habe den klassischen Reisevermittlern längst den Garaus gemacht, irrt: Zwar ist die Zahl der Filialen in den letzten zehn Jahren um fast die Hälfte gesunken, doch die verbliebenen Anbieter haben ihr Geschäftsmodell gründlich umgebaut. Statt Kataloge zu wälzen, verkaufen sie heute vor allem Beratung — etwa für komplexe Fernreisen — und lassen sich diese als eigenständige Dienstleistung bezahlen.',
        'Auf der beliebten Ferieninsel reicht es den Einheimischen: Bei einer Großdemonstration verlangten am Wochenende mehrere tausend Menschen, die Zahl der täglich anlandenden Gäste gesetzlich zu begrenzen. Die Mieten hätten sich verdreifacht, Trinkwasser werde knapp, und vom Gewinn der Hotelkonzerne komme bei den Bewohnern kaum etwas an. Die Regionalregierung kündigte einen runden Tisch an.',
        'Jahrzehntelang galten sie als unrentables Relikt, nun werden vielerorts sogar neue Verbindungen eingerichtet: Schlafwagenzüge zwischen europäischen Metropolen sind oft Monate im Voraus ausgebucht. Bahngesellschaften reagieren damit auf eine wachsende Kundschaft, die aus Klimagründen nicht mehr fliegen möchte, ohne auf Fernreisen zu verzichten. Kritiker bemängeln allerdings die hohen Ticketpreise.',
        'Melken um sechs, Heuernte am Nachmittag: Was für Landwirte Alltag ist, buchen Städter inzwischen als Erholung. Die Nachfrage nach Ferien auf dem Land hat den höchsten Stand seit Beginn der Erhebungen erreicht; besonders Familien mit kleinen Kindern schätzen den Kontakt zu Tieren und die überschaubaren Kosten. Viele Höfe sichern sich mit den Gästezimmern ein zweites Standbein.',
        'Mit Taschenlampenführungen um Mitternacht, Konzerten zwischen Gemälden und Eintritt bis zwei Uhr früh kämpfen die Ausstellungshäuser der Region um eine Zielgruppe, die ihnen lange fernblieb: die Unter-Dreißigjährigen. Die Rechnung geht offenbar auf — bei der jüngsten Auflage der Veranstaltung war fast jeder zweite Besucher jünger als dreißig, und viele lösten anschließend eine Jahreskarte.'
      ],
      answers: [7, 0, 2, 4, 1]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Reisen ohne Ziel — der Trend zum langsamen Unterwegssein',
      text: `Fünf Länder in acht Tagen, jede Sehenswürdigkeit im Laufschritt, abends erschöpft ins Hotelbett: So sah für Generationen von Touristen der Inbegriff einer gelungenen Reise aus. Doch dieses Modell bekommt Konkurrenz. Unter dem Schlagwort „Slow Travel“ entscheiden sich immer mehr Menschen bewusst für das Gegenteil — weniger Orte, mehr Zeit, und häufig gar kein festes Programm.

Die Soziologin Dr. Carla Menzel erforscht das Phänomen seit mehreren Jahren. Sie sieht darin keine Modeerscheinung, sondern eine Reaktion auf den beschleunigten Alltag: „Wer ständig erreichbar ist und nach Effizienz lebt, will im Urlaub nicht auch noch eine Liste abarbeiten.“ Bemerkenswert findet sie, dass der Trend keineswegs nur ältere Reisende erfasst. Gerade junge Berufstätige, die es sich leisten können, tauschten die dritte Städtereise des Jahres gegen vier Wochen an einem einzigen Ort.

Dass daraus ein Geschäft geworden ist, zeigt das Beispiel des Reiseveranstalters „Anderswo“, der ausschließlich Bahn- und Wanderreisen anbietet. Geschäftsführer Jens Brauer berichtet von zweistelligen Zuwachsraten — und von einer veränderten Erwartungshaltung: „Unsere Kunden fragen nicht mehr, wie viel sie sehen. Sie fragen, wie gut sie ankommen.“ Sein Unternehmen hat deshalb feste Programmpunkte radikal reduziert; stattdessen erhalten die Gäste Vorschläge, aus denen sie vor Ort frei wählen.

Ganz ohne Widersprüche ist die Bewegung freilich nicht. Wer wochenlang unterwegs sein kann, braucht Zeit und Geld — Ressourcen, über die längst nicht alle verfügen. Menzel räumt ein, dass Slow Travel bislang vor allem ein Angebot für Bessergestellte sei. Sie beobachtet jedoch, dass zentrale Ideen inzwischen auch den Kurzurlaub erreichen: Immer mehr Menschen verzichteten etwa darauf, am Wochenende möglichst weit wegzufahren, und entdeckten stattdessen die eigene Region. „Entschleunigung“, sagt sie, „ist keine Frage der Entfernung.“`,
      questions: [
        {
          frage: 'Beim „Slow Travel“ geht es vor allem darum, …',
          options: [
            'möglichst viele Orte in kurzer Zeit zu besuchen.',
            'an wenigen Orten mehr Zeit zu verbringen.',
            'grundsätzlich auf Urlaubsreisen zu verzichten.'
          ],
          answer: 1
        },
        {
          frage: 'Dr. Menzel erklärt den Trend damit, dass viele Menschen …',
          options: [
            'sich vom beschleunigten Alltag erholen wollen.',
            'sich lange Reisen nicht mehr leisten können.',
            'Sehenswürdigkeiten grundsätzlich langweilig finden.'
          ],
          answer: 0
        },
        {
          frage: 'Der Veranstalter „Anderswo“ hat auf den Trend reagiert, indem er …',
          options: [
            'mehr Flugreisen ins Programm aufgenommen hat.',
            'feste Programmpunkte stark verringert hat.',
            'die Zahl der Reiseziele deutlich erhöht hat.'
          ],
          answer: 1
        },
        {
          frage: 'Als Schwäche der Bewegung nennt der Text, dass …',
          options: [
            'sie bisher vor allem wohlhabenden Menschen offensteht.',
            'die Nachfrage seit Jahren zurückgeht.',
            'die Reisenden vor Ort keine Vorschläge bekommen.'
          ],
          answer: 0
        },
        {
          frage: 'Laut Menzel zeigt sich der Gedanke der Entschleunigung inzwischen auch darin, dass …',
          options: [
            'Wochenendausflüge immer weiter wegführen.',
            'viele Menschen ihre eigene Region entdecken.',
            'Kurzurlaube kaum noch gebucht werden.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ihre Eltern möchten eine mehrtägige Flusskreuzfahrt mit deutschsprachiger Reiseleitung machen.',
        'Eine Freundin sucht für ihre Hochzeit eine historische Location mit Übernachtungsmöglichkeit.',
        'Ein Kollege möchte im Urlaub einen Fotokurs in den Bergen belegen.',
        'Sie planen eine Radtour und brauchen jemanden, der das Gepäck von Etappe zu Etappe bringt.',
        'Ihre Nachbarin sucht eine seriöse Betreuung für ihren Hund während einer Fernreise.',
        'Ein befreundetes Paar möchte Weihnachten in einem Ferienhaus mit Kamin verbringen — der Hund soll mit.',
        'Sie möchten Ihre Italienischkenntnisse vor einer Reise in einem Crashkurs auffrischen.',
        'Ein Bekannter mit Gehbehinderung sucht eine Städtereise mit barrierefreiem Programm.',
        'Sie suchen für einen Junggesellinnenabschied eine ausgefallene Stadtführung am Abend.',
        'Ihre Tante möchte ihre alten Reisedias digitalisieren lassen, bevor sie verblassen.'
      ],
      ads: [
        'Flussreisen Donau-Melodie: 5–8 Tage auf Rhein oder Donau, Vollpension, Landausflüge mit deutschsprachigen Guides — Einschiffung in sechs Städten.',
        'Gut Falkenhorst: Feiern Sie im Rittersaal unseres Schlossguts — Trauungen im Park, Catering nach Wunsch, 24 Gästezimmer im Kavaliershaus.',
        'Lichtblick-Werkstatt: Wir digitalisieren Dias, Negative und Super-8-Filme in Archivqualität — Abholung auf Wunsch, Festpreis pro Medium.',
        'Alpenlicht-Akademie: Einwöchige Fotoworkshops im Hochgebirge, kleine Gruppen, Leihkameras vorhanden — von Sonnenaufgang bis Sternenhimmel.',
        'Radler-Service Mosel: Wir transportieren Ihre Koffer täglich zur nächsten Unterkunft — buchbar ab zwei Etappen, auch für Gruppen.',
        'Pfoten-Ferien: Liebevolle Urlaubsbetreuung für Hunde in geprüften Gastfamilien, tägliche Foto-Updates, Abhol- und Bringservice.',
        'Sprachinstitut Rapido: Italienisch-Intensivkurse (A1–B2) in zwei Wochen, täglich vier Stunden, Kleingruppen — Konversation im Mittelpunkt.',
        'Ferienhof Kaminglück im Erzgebirge: Freistehende Holzhäuser mit offenem Kamin und eingezäuntem Garten — Haustiere herzlich willkommen, Winterrabatt.',
        'Stadtabenteuer bei Nacht: Kriminalführungen mit Schauspielern durch die Altstadt — private Touren für Gruppen, gern mit Sektempfang.',
        'Reisen ohne Barrieren e. K.: Städtetrips mit rollstuhlgerechten Hotels, stufenfreien Routen und Begleitservice — Kataloge kostenlos.',
        'Bergwacht-Shop: Alles für die Hochtour — Ausrüstungsverleih, Wetterberatung und geführte Klettersteige für Einsteiger.',
        'Studio Klangfarbe: Professionelle Hochzeitsfotografie und -videos, Vorgespräch kostenlos, Pakete ab 890 €.'
      ],
      answers: [0, 1, 3, 4, 5, 7, 6, 9, 8, 2]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

vom 3. bis 17. August verbrachten meine Frau und ich einen Pauschalurlaub in dem von Ihnen vermittelten „Strandhotel Miramar“, [1] wir uns im Vorfeld sehr gefreut hatten. Leider entsprach der Aufenthalt in wesentlichen Punkten nicht [2], was in Ihrem Katalog zugesichert wird.

[3] der gebuchten ruhigen Lage zur Meerseite erhielten wir ein Zimmer direkt über der Hotelküche, [4] Lärm uns bereits ab fünf Uhr morgens weckte. Unsere Bitte, das Zimmer zu wechseln, wurde mit dem Hinweis auf volle Belegung [5]. Darüber hinaus war der im Reisepreis [6] Wellnessbereich während des gesamten Aufenthalts wegen Renovierung geschlossen — ein Umstand, [7] man uns weder bei der Buchung noch bei der Ankunft informiert hatte.

Noch vor Ort habe ich die Mängel der Reiseleitung gemeldet und mir schriftlich bestätigen [8]. Gemäß den gesetzlichen Bestimmungen fordere ich Sie hiermit auf, den Reisepreis um zwanzig Prozent zu [9]. Die entsprechenden Belege füge ich diesem Schreiben [10].

Sollte ich bis zum 30. September keine Rückmeldung erhalten, werde ich einen Anwalt einschalten.

Mit freundlichen Grüßen
Robert Steinbach`,
      gaps: [
        { options: ['worauf', 'auf das', 'wofür'], answer: 0 },
        { options: ['das', 'dem', 'den'], answer: 1 },
        { options: ['Wegen', 'Statt', 'Während'], answer: 1 },
        { options: ['dessen', 'deren', 'seinen'], answer: 0 },
        { options: ['abgelehnt', 'verweigert', 'widersprochen'], answer: 0 },
        { options: ['enthaltene', 'enthaltenen', 'enthalten'], answer: 0 },
        { options: ['über den', 'worüber', 'darüber'], answer: 1 },
        { options: ['gelassen', 'geworden', 'lassen'], answer: 2 },
        { options: ['mindern', 'sinken', 'verkleinern'], answer: 0 },
        { options: ['an', 'bei', 'zu'], answer: 1 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Frau Dr. Albrecht,

mit großem Interesse habe ich gelesen, dass Ihr Museum für die kommende Sonderausstellung „Reisebilder aus zwei Jahrhunderten“ ehrenamtliche Kulturvermittler sucht. Auf diese Aufgabe möchte ich mich hiermit [1].

Nach meinem [2] in den Ruhestand vor zwei Jahren habe ich an der Volkshochschule mehrere Kurse zur Kunstgeschichte besucht und dabei meine Leidenschaft für die Malerei des 19. Jahrhunderts entdeckt. Beruflich war ich über dreißig Jahre im Fremdenverkehrsamt unserer Stadt tätig, [3] ich täglich Besuchergruppen aus aller Welt betreut habe. Der Umgang mit Menschen unterschiedlicher Herkunft ist mir daher bestens [4].

Gern würde ich Führungen in deutscher und englischer Sprache [5]; auch die Betreuung von Schulklassen kann ich mir gut vorstellen. Zeitlich bin ich flexibel und könnte auch kurzfristig [6], etwa wenn eine Kollegin ausfällt.

Über die [7], das Team vorab kennenzulernen, würde ich mich sehr freuen. Ein erweitertes Führungszeugnis kann ich selbstverständlich [8]. Bitte teilen Sie mir mit, welche Unterlagen Sie darüber hinaus [9].

Ich danke Ihnen für die Prüfung meiner Bewerbung und stehe für Rückfragen jederzeit gern zur [10].

Mit freundlichen Grüßen
Helga Winterberg`,
      wordBank: [
        'benötigen',
        'bewerben',
        'dennoch',
        'einspringen',
        'Eintritt',
        'Gelegenheit',
        'gewissenhaft',
        'übernehmen',
        'Verfügung',
        'vertraut',
        'vorlegen',
        'Voraussetzung',
        'wobei',
        'wodurch',
        'wofür'
      ],
      answers: [1, 4, 12, 9, 7, 3, 5, 10, 0, 8]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Ausstellung wird wegen der großen Nachfrage verlängert.',
          answer: true,
          audio:
            'Kulturnachrichten: Die Sonderausstellung „Schätze der Seidenstraße“ im Landesmuseum zieht weiterhin Zehntausende an. Wie die Direktion heute mitteilte, wird die Schau wegen des anhaltenden Andrangs um sechs Wochen bis Ende Januar verlängert. An den Adventswochenenden öffnet das Haus zusätzlich bereits um acht Uhr morgens.'
        },
        {
          statement: 'Der neue Radweg an der Küste ist bereits vollständig befahrbar.',
          answer: false,
          audio:
            'Aus der Region: Der geplante Küstenradweg zwischen Fischerhafen und Leuchtturm nimmt Gestalt an. Zwei der drei Abschnitte sind inzwischen asphaltiert, das letzte Teilstück durch das Naturschutzgebiet soll jedoch erst im kommenden Frühjahr freigegeben werden. Bis dahin werden Radfahrer über die Landstraße umgeleitet.'
        },
        {
          statement: 'Fluggäste sollen wegen eines Streiks mehr Zeit einplanen.',
          answer: true,
          audio:
            'Reisende aufgepasst: Am Frankfurter Flughafen hat das Sicherheitspersonal für morgen einen ganztägigen Warnstreik angekündigt. Die Gewerkschaft rechnet mit erheblichen Wartezeiten an den Kontrollen. Passagiere werden gebeten, mindestens drei Stunden vor Abflug am Terminal zu sein und Handgepäck möglichst zu reduzieren.'
        },
        {
          statement: 'Die Stadt senkt die Übernachtungssteuer für Touristen.',
          answer: false,
          audio:
            'Aus dem Rathaus: Der Stadtrat hat gestern Abend beschlossen, die Übernachtungsabgabe für Touristen von drei auf fünf Prozent des Zimmerpreises zu erhöhen. Mit den zusätzlichen Einnahmen sollen der Ausbau der Radwege und die Reinigung der Altstadt finanziert werden. Der Hotelverband kündigte Protest an.'
        },
        {
          statement: 'Für die Wanderung am Sonntag ist eine Anmeldung erforderlich.',
          answer: true,
          audio:
            'Und noch ein Veranstaltungshinweis: Der Alpenverein lädt am Sonntag zur geführten Herbstwanderung durch das Felsental ein. Die Strecke ist etwa vierzehn Kilometer lang und auch für geübte Familien geeignet. Da die Teilnehmerzahl auf fünfundzwanzig begrenzt ist, ist eine Anmeldung bis Freitagmittag auf der Website des Vereins unbedingt erforderlich.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Willkommen bei „Unterwegs“! Mein heutiger Gast ist Katrin Lohse. Sie leitet das Tourismusbüro einer kleinen Alpengemeinde, die vor einem ungewöhnlichen Problem stand: zu viele Gäste. Frau Lohse, wie kam es dazu?'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Schuld war ausgerechnet ein Foto. Vor vier Jahren hat eine Influencerin unseren Bergsee gepostet, das Bild ging um die Welt. Plötzlich kamen an schönen Sommertagen bis zu achttausend Tagesgäste in ein Dorf mit neunhundert Einwohnern.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was bedeutete das konkret für den Ort?'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Die Zufahrtsstraße war regelmäßig verstopft, Rettungsfahrzeuge kamen kaum noch durch, und auf den Wiesen rund um den See blieb der Müll liegen. Die Stimmung im Dorf ist gekippt — einige wollten den See am liebsten komplett sperren lassen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'So weit ist es aber nicht gekommen.'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Nein, wir haben stattdessen ein Besucherlenkungssystem eingeführt. Wer mit dem Auto kommt, muss vorab online einen Parkplatz reservieren — die Zahl ist auf vierhundert pro Tag begrenzt. Wer mit Bahn und Bus anreist, zahlt dagegen nichts für den Seezugang und bekommt sogar ein Getränk gratis.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Hat das funktioniert?'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Besser, als wir zu hoffen gewagt hatten. Die Zahl der Autos hat sich mehr als halbiert, während die Gesamtzahl der Gäste nur leicht zurückgegangen ist. Entscheidend ist: Die Wertschöpfung ist gestiegen, weil die Besucher länger bleiben und häufiger einkehren, statt nur ein Foto zu machen und weiterzufahren.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Gab es auch Kritik an dem Modell?'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Durchaus. Anfangs warfen uns manche vor, wir würden den Berg nur noch für Reiche öffnen. Das Gegenteil ist der Fall: Die Reservierung selbst ist kostenlos, begrenzt ist nur der Platz. Und für die Einheimischen sowie für Übernachtungsgäste gilt die Regelung ohnehin nicht.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Andere Orte kämpfen mit ähnlichen Problemen. Was raten Sie den Kolleginnen und Kollegen?'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Nicht auf noch mehr Werbung setzen, sondern auf Steuerung — und die Bevölkerung von Anfang an einbeziehen. Wir haben jede Maßnahme vorher in einer Bürgerversammlung diskutiert. Ohne diese Rückendeckung wäre das Projekt gescheitert.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und wie geht es bei Ihnen weiter?'
        },
        {
          speaker: 'Katrin Lohse',
          text: 'Im nächsten Jahr weiten wir das System auf die Wintersaison aus, und wir prüfen gerade einen Shuttlebus vom Bahnhof, der mit Solarstrom fährt. Unser Ziel ist, dass in fünf Jahren die Mehrheit unserer Gäste ohne eigenes Auto anreist.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Frau Lohse, vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Der Ansturm auf das Dorf begann mit einem Foto in den sozialen Medien.', answer: true },
        { statement: 'Das Dorf hat mehr als achttausend Einwohner.', answer: false },
        {
          statement: 'Durch die vielen Autos wurden zeitweise sogar Rettungseinsätze behindert.',
          answer: true
        },
        { statement: 'Der Bergsee wurde für Besucher komplett gesperrt.', answer: false },
        { statement: 'Autofahrer müssen ihren Parkplatz im Voraus reservieren.', answer: true },
        {
          statement: 'Wer mit öffentlichen Verkehrsmitteln anreist, muss für den Seezugang extra bezahlen.',
          answer: false
        },
        { statement: 'Seit der Neuregelung geben die Gäste vor Ort insgesamt mehr Geld aus.', answer: true },
        { statement: 'Die Parkplatzreservierung kostet eine hohe Gebühr.', answer: false },
        { statement: 'Die Maßnahmen wurden vorab mit den Bürgern diskutiert.', answer: true },
        { statement: 'Eine Ausweitung des Systems auf den Winter ist bereits beschlossen.', answer: true }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Stadtrundfahrt startet heute an einem anderen Ort.',
          answer: true,
          audio:
            'Liebe Gäste der Stadtrundfahrt um elf Uhr: Wegen des Wochenmarkts auf dem Rathausplatz startet unser Bus heute ausnahmsweise nicht dort, sondern an der Haltestelle Opernhaus, Ausgang Nord. Der Fußweg vom Rathausplatz dauert etwa fünf Minuten. Ihre Tickets behalten selbstverständlich ihre Gültigkeit.'
        },
        {
          statement: 'Das Museum schließt heute früher als üblich.',
          answer: false,
          audio:
            'Verehrte Besucherinnen und Besucher, ein Hinweis in eigener Sache: Anlässlich der heutigen Museumsnacht bleibt unser Haus abweichend von den üblichen Öffnungszeiten bis Mitternacht geöffnet. Die letzte Führung durch die Sonderausstellung beginnt um dreiundzwanzig Uhr im Foyer. Wir wünschen Ihnen einen inspirierenden Abend.'
        },
        {
          statement: 'Die Fähre fällt wegen des Wetters ersatzlos aus.',
          answer: false,
          audio:
            'Achtung an alle Fahrgäste der Inselfähre: Wegen des starken Westwinds kann die Fähre um vierzehn Uhr dreißig heute nicht auslaufen. Die Überfahrt wird auf sechzehn Uhr verschoben, sofern der Wind wie vorhergesagt nachlässt. Bereits gekaufte Tickets gelten für die spätere Abfahrt. Aktuelle Informationen erhalten Sie am Schalter.'
        },
        {
          statement: 'Reisende nach Salzburg müssen heute umsteigen.',
          answer: true,
          audio:
            'Information zu Ihrer Zugfahrt: Der Eurocity nach Salzburg endet heute außerplanmäßig in Rosenheim. Grund ist eine Oberleitungsstörung auf der Grenzstrecke. Reisende in Richtung Salzburg steigen bitte in Rosenheim in die bereitgestellten Busse um; die Fahrzeit verlängert sich um rund vierzig Minuten.'
        },
        {
          statement: 'Das Zimmer der Reisegruppe ist schon bezugsfertig.',
          answer: true,
          audio:
            'Eine Durchsage für die Reisegruppe Sonnenschein: Ihre Zimmer sind nun doch früher fertig geworden als angekündigt. Sie können Ihre Schlüsselkarten ab sofort an der Rezeption abholen und das Gepäck direkt auf die Zimmer bringen. Das Abendessen wird wie besprochen um neunzehn Uhr im Wintergarten serviert.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Leserbrief: Braucht unsere Stadt mehr Tourismus?',
        situation:
          'In der Lokalzeitung erschien ein Artikel mit der These: „Mehr Touristen bedeuten mehr Wohlstand für alle — unsere Stadt sollte kräftig dafür werben.“ Schreiben Sie einen Leserbrief.',
        leitpunkte: [
          'Nehmen Sie Bezug auf den Artikel und formulieren Sie Ihre Position.',
          'Nennen Sie Vorteile UND Nachteile von mehr Tourismus für die Stadt.',
          'Belegen Sie Ihre Meinung mit einem Beispiel oder einer Erfahrung.',
          'Machen Sie einen eigenen Vorschlag, wie die Stadt vorgehen sollte.'
        ],
        musterloesung: `Betreff: Leserbrief zum Artikel „Mehr Touristen, mehr Wohlstand“ vom 12. Mai

Sehr geehrte Damen und Herren,

mit Interesse habe ich Ihren Artikel gelesen, in dem für eine massive Tourismuswerbung geworben wird. Dieser Einschätzung kann ich nur teilweise zustimmen.

Zweifellos profitieren Gastronomie, Hotels und Einzelhandel von zusätzlichen Gästen, und manches Kulturangebot gäbe es ohne Touristen längst nicht mehr. Verschwiegen wird jedoch, welche Folgen ein ungebremster Zustrom hat: steigende Mieten, überfüllte Innenstädte und Lärm bis tief in die Nacht. Wer einmal im August versucht hat, samstags über unseren Marktplatz zu gehen, weiß, wovon ich spreche — als Anwohnerin komme ich seit Jahren kaum noch an mein eigenes Haus heran.

Statt pauschal um „mehr“ zu werben, sollte die Stadt gezielt steuern: Werbung außerhalb der Hauptsaison, bessere Bus- und Bahnanbindung statt neuer Parkplätze und eine Übernachtungsabgabe, deren Einnahmen sichtbar allen Bewohnern zugutekommen, etwa in Form günstigerer Nahverkehrstickets.

Tourismus ist kein Selbstzweck — er muss der Stadt dienen, nicht umgekehrt.

Mit freundlichen Grüßen
Helga Winterberg`
      }
    ],
    tipps:
      'Beim Leserbrief gehören der Bezug auf den Artikel, eine klare Position und ein eigenes Beispiel dazu. Verwenden Sie Konnektoren (jedoch, zweifellos, statt … zu). Gehen Sie auf alle vier Leitpunkte ein und prüfen Sie am Ende: Zielumfang etwa 150–220 Wörter, Anrede und Grußformel vorhanden.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Eine Reise, die mich verändert hat“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie die Reise (Ziel, Anlass, Ablauf).',
        'Erzählen Sie, was dabei passiert ist und was Sie über sich oder andere gelernt haben.',
        'Sagen Sie, was Sie heute anders machen würden.',
        'Sagen Sie, wie man in Ihrem Heimatland typischerweise reist.'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Reise erzählen, die …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Rückblickend hat mich vor allem … geprägt.',
        'Daraus habe ich gelernt, dass …',
        'Habt ihr/Haben Sie schon einmal etwas Ähnliches erlebt?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Fliegen muss teurer werden — nur so lernen wir, verantwortungsvoll zu reisen.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen (Klima, Preise, soziale Gerechtigkeit).',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Versuchen Sie am Ende, ein gemeinsames Fazit zu ziehen.'
      ],
      redemittel: [
        'Meiner Überzeugung nach …',
        'Einerseits …, andererseits …',
        'Das Argument leuchtet mir ein, allerdings …',
        'Man sollte dabei berücksichtigen, dass …',
        'Da widerspreche ich Ihnen ungern, aber …',
        'Vielleicht können wir uns darauf verständigen, dass …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Eine Partnerstadt schickt im Sommer eine Besuchergruppe (zwölf Personen, verschiedene Altersstufen) für ein Wochenende in Ihre Stadt. Sie und Ihre Partnerin / Ihr Partner sollen das Programm organisieren. Planen Sie gemeinsam.',
      punkte: [
        'Welche Programmpunkte bieten Sie an (Kultur, Natur, Kulinarik)?',
        'Wie organisieren Sie Transport und Verpflegung?',
        'Wie gehen Sie auf die unterschiedlichen Altersgruppen ein?',
        'Wer übernimmt welche Aufgaben, und was darf das Wochenende kosten?'
      ],
      redemittel: [
        'Wie wäre es, wenn wir am Samstag mit … beginnen?',
        'Dagegen spricht allerdings, dass …',
        'Für die Älteren könnten wir …, während die Jüngeren …',
        'Das übernehme ich gern. / Könnten Sie sich um … kümmern?',
        'Kostenmäßig sollten wir bei … bleiben.',
        'Halten wir also fest: …'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
