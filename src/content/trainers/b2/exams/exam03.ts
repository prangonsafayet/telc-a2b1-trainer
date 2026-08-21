import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 3,
  level: 'b2',
  title: 'Modelltest 3',
  theme: 'Umwelt & Nachhaltigkeit',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Rekordsommer: Landwirte beklagen massive Ernteausfälle',
        'Pfandsystem für Kaffeebecher startet in der Innenstadt',
        'Studie: Deutsche trennen Müll so gewissenhaft wie nie',
        'Umstrittener Windpark: Gericht stoppt den Bau vorerst',
        'Immer mehr Unternehmen verzichten auf Plastikverpackungen',
        'Klimawandel bedroht heimische Vogelarten',
        'Solarpflicht für Neubauten beschlossen',
        'Repair-Cafés im Aufwind: Reparieren statt Wegwerfen',
        'Stadt pflanzt tausend Bäume gegen die Sommerhitze',
        'Weniger Autos, mehr Räder: Verkehrswende zeigt erste Erfolge'
      ],
      texts: [
        'Ein defekter Toaster, ein klemmender Reißverschluss, ein Radio ohne Ton — was früher im Container landete, bekommt samstags im Gemeindehaus eine zweite Chance. Ehrenamtliche Fachleute reparieren dort gemeinsam mit den Besitzern deren kaputte Alltagsgegenstände, bezahlt wird mit einer freiwilligen Spende. Das Konzept verbreitet sich rasant: Bundesweit ist die Zahl solcher Treffpunkte innerhalb von fünf Jahren auf über tausend gestiegen.',
        'Eigentlich sollten sich die zwölf Rotoren bei Hallstedt längst drehen, doch daraus wird vorerst nichts: Das Verwaltungsgericht hat den Weiterbau der Anlage gestern überraschend untersagt. Geklagt hatte eine Bürgerinitiative, die im Genehmigungsverfahren den Schutz seltener Greifvögel nicht ausreichend berücksichtigt sieht. Die Betreiberfirma zeigte sich enttäuscht und kündigte an, die geforderten Gutachten schnellstmöglich nachzuliefern. Wann gebaut werden darf, ist offen.',
        'Wer im Hochsommer über den Rathausplatz geht, sucht Schatten meist vergeblich — noch. In den kommenden zwei Jahren lässt die Stadtverwaltung tausend zusätzliche Bäume pflanzen, vor allem in dicht bebauten Vierteln, die sich im Sommer besonders stark aufheizen. Ausgewählt wurden widerstandsfähige Arten, die mit Trockenheit zurechtkommen. Fachleute versprechen sich davon spürbar kühlere Straßen und eine bessere Luftqualität.',
        'Wegwerfen war gestern: Wer sich in der Innenstadt künftig einen Kaffee zum Mitnehmen holt, bekommt ihn auf Wunsch im Mehrwegbecher. Gegen zwei Euro Pfand kann das Gefäß in jedem der über vierzig teilnehmenden Cafés und Bäckereien zurückgegeben werden — egal, wo es ausgeliehen wurde. Die Initiatoren hoffen, damit einen großen Teil der täglich rund zwanzigtausend Einwegbecher überflüssig zu machen.',
        'Der Kuckuck kommt zu spät: Wenn er im Frühjahr aus Afrika zurückkehrt, haben viele heimische Vögel wegen der milden Winter bereits gebrütet. Eine neue Untersuchung zeigt, dass steigende Temperaturen den Lebensrhythmus zahlreicher Arten durcheinanderbringen; einige finden nicht mehr genug Insekten für ihre Jungen. Die Bestände mehrerer früher häufiger Arten sind innerhalb von zwanzig Jahren um ein Drittel geschrumpft.'
      ],
      answers: [7, 3, 8, 1, 5]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Einkaufen ohne Verpackung — mehr als ein Trend?',
      text: `Wer den kleinen Laden von Miriam Stein betritt, sucht bunte Verpackungen vergeblich: Nudeln, Reis, Müsli und Waschmittel lagern in großen Glasbehältern an der Wand, die Kundschaft bringt eigene Dosen und Gläser mit und füllt ab, was sie braucht. Vor fünf Jahren eröffnete die gelernte Einzelhandelskauffrau ihr Geschäft — es war das erste dieser Art in der Stadt.

Die Anfänge waren alles andere als einfach. Die Bank zögerte lange, den Kredit zu bewilligen, und geeignete Lieferanten zu finden, die ihre Ware in großen Gebinden und ohne Plastik anliefern, kostete Monate. Anfangs kamen vor allem junge, umweltbewusste Studentinnen und Studenten; inzwischen reicht die Stammkundschaft von der Schülerin bis zum Rentner. Dennoch bleibt das Geschäft ein Kraftakt: Als die Energiepreise stiegen, mussten zwei Unverpackt-Läden in der Region schließen. Dass ihr eigener Laden überlebt hat, erklärt Stein mit ihrer treuen Kundschaft — und mit zusätzlichen Angeboten wie Abfüll-Workshops und einem Lieferdienst für Büros.

Der Konsumforscher Dr. Jan Albrecht ordnet das Phänomen nüchtern ein: Gemessen am gesamten Lebensmittelhandel sei der Marktanteil der Unverpackt-Läden verschwindend gering. Ihre Wirkung reiche jedoch weit über die Ladentheke hinaus, denn die großen Supermarktketten übernähmen zunehmend Ideen aus der Szene — von Mehrwegnetzen für Obst bis zu Nachfüllstationen für Reinigungsmittel. Den wichtigsten Effekt sieht Albrecht im veränderten Verhalten der Kundschaft: Wer nur die tatsächlich benötigte Menge abfülle, kaufe bewusster ein und werfe deutlich weniger weg.

Und die Zukunft? Filialen will Stein ausdrücklich nicht eröffnen. Statt zu expandieren, gibt sie ihr Wissen weiter: Sie berät angehende Ladengründerinnen und -gründer und besucht Schulklassen, die wissen wollen, wie verpackungsfreies Einkaufen funktioniert. Von überzogenen Erwartungen hält sie wenig: „Niemand muss perfekt sein. Wer auch nur einen Teil seines Einkaufs unverpackt erledigt, bewirkt schon etwas.“`,
      questions: [
        {
          frage: 'Der Laden von Miriam Stein …',
          options: [
            'gehört zu einer bundesweiten Kette.',
            'war der erste seiner Art in der Stadt.',
            'wurde vor zwei Jahren eröffnet.'
          ],
          answer: 1
        },
        {
          frage: 'In der Anfangszeit …',
          options: [
            'war es schwierig, passende Lieferanten zu finden.',
            'kamen vor allem ältere Kundinnen und Kunden.',
            'bewilligte die Bank den Kredit ohne Zögern.'
          ],
          answer: 0
        },
        {
          frage: 'Dass ihr Geschäft die Energiekrise überstanden hat, erklärt Stein mit …',
          options: [
            'niedrigeren Preisen als im Supermarkt.',
            'staatlicher finanzieller Unterstützung.',
            'treuer Kundschaft und zusätzlichen Angeboten.'
          ],
          answer: 2
        },
        {
          frage: 'Laut Dr. Albrecht …',
          options: [
            'beeinflussen Unverpackt-Läden auch die großen Supermarktketten.',
            'ist der Marktanteil der Unverpackt-Läden stark gewachsen.',
            'füllen die Kunden meist zu große Mengen ab.'
          ],
          answer: 0
        },
        {
          frage: 'Für die Zukunft plant Stein, …',
          options: [
            'weitere Filialen zu eröffnen.',
            'ihr Wissen an Gründer und Schulen weiterzugeben.',
            'den Laden an eine Nachfolgerin zu verkaufen.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Sie möchten Ihr defektes Fahrrad selbst reparieren, haben aber weder Werkzeug noch Erfahrung.',
        'Eine Freundin sucht ein Gemüseabo mit Lieferung aus der Region.',
        'Ihr Balkon soll insektenfreundlich bepflanzt werden; Sie brauchen fachliche Beratung.',
        'Ihre Familie möchte Strom und Heizkosten sparen und sucht eine Beratung zu Hause.',
        'Sie wollen gut erhaltene Kinderkleidung und Spielsachen abgeben, statt sie wegzuwerfen.',
        'Ihr Verein plant ein Sommerfest und möchte Geschirr ausleihen, um Einwegteller zu vermeiden.',
        'Ein Nachbar möchte auf seinem Hausdach eine Solaranlage installieren lassen und sucht ein Angebot.',
        'Sie interessieren sich für gemeinschaftliches Gärtnern und möchten ein eigenes Beet übernehmen.',
        'Ein Kollege möchte seine gut erhaltenen Möbel abholen lassen, weil er ins Ausland zieht.',
        'Sie möchten an einer geführten Wanderung durch ein Naturschutzgebiet teilnehmen.'
      ],
      ads: [
        'Sonnenkraft GmbH: Photovoltaik für Ihr Eigenheim — kostenlose Dachprüfung und Festpreisangebot innerhalb einer Woche.',
        'Grüne Kiste: Wöchentliches Gemüseabo direkt vom Biohof aus der Region — Lieferung bis an die Haustür, jederzeit kündbar.',
        'Selbsthilfewerkstatt Speiche: Reparieren Sie Ihr Rad unter fachkundiger Anleitung — Werkzeug und Ersatzteile vorhanden, Sie zahlen nur eine kleine Spende.',
        'Verbraucherzentrale: Energie-Check bei Ihnen zu Hause — unsere Fachleute zeigen, wo Sie Strom und Heizkosten sparen können. Termin ab 30 Euro.',
        'Naturgarten Flora: Beratung und Bepflanzung für Balkon und Terrasse — bienenfreundlich, pflegeleicht und standortgerecht.',
        'Geschirrmobil der Stadt: Teller, Tassen und Besteck für Feste bis 400 Personen — inklusive Spülservice. Bitte frühzeitig reservieren!',
        'Möbelbörse der Diakonie: Wir holen gut erhaltene Möbel kostenlos bei Ihnen ab und geben sie an Bedürftige weiter.',
        'Kleiderkammer Arche: Gut erhaltene Kinderkleidung und Spielsachen können montags bis freitags von 9 bis 17 Uhr abgegeben werden.',
        'Der NABU lädt ein: Geführte Wanderung durch das Naturschutzgebiet Riedwiesen — jeden ersten Sonntag im Monat, Fernglas empfohlen.',
        'Gemeinschaftsgarten Sonnenacker: Wir vergeben wieder Beete an alle, die Lust auf gemeinsames Gärtnern haben — Vorkenntnisse nicht erforderlich.',
        'Autohaus Grünewald: Jetzt e-mobil werden! Probefahrten mit unseren neuen Elektromodellen an jedem Samstag — ohne Voranmeldung.',
        'Baumschule Wiesengrund: Obstbäume alter Sorten und Beratung zum Pflanzschnitt — Lieferung ab Hof, mittwochs Hofführung.'
      ],
      answers: [2, 1, 4, 3, 7, 5, 0, 9, 6, 8]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrter Herr Oberbürgermeister,

mit großem Interesse habe ich in der Zeitung gelesen, dass die Stadt ein neues Konzept [1] nachhaltige Mobilität erarbeitet. Als Bürgerin, [2] täglich mit dem Rad zur Arbeit fährt, möchte ich dazu einige Anregungen geben.

Der Radweg entlang der Hauptstraße befindet sich in einem Zustand, [3] eine sichere Nutzung kaum möglich ist. Bereits im vergangenen Jahr wurde eine Sanierung [4], bislang ist jedoch nichts geschehen. [5] hinaus fehlen an mehreren großen Kreuzungen sichere Übergänge für Radfahrer und Fußgänger.

Ich rege daher an, die Bedürfnisse der Radfahrerinnen und Radfahrer bei der Planung künftig stärker zu [6]. Viele Bürgerinnen und Bürger wären durchaus bereit, auf das Auto zu [7], wenn die Alternativen attraktiver wären. Einer aktuellen Umfrage zufolge wünscht sich zudem eine Mehrheit der Einwohner mehr Grünflächen [8] neuer Parkplätze.

Ich wäre Ihnen dankbar, wenn Sie mir mitteilen könnten, bis [9] mit dem Beginn der Bauarbeiten zu rechnen ist. Gern [10] ich mich auch persönlich an einer Bürgerversammlung beteiligen.

Mit freundlichen Grüßen
Johanna Reuter`,
      gaps: [
        { options: ['für', 'über', 'gegen'], answer: 0 },
        { options: ['der', 'die', 'deren'], answer: 1 },
        { options: ['durch den', 'in dem', 'auf dem'], answer: 1 },
        { options: ['anzukündigen', 'ankündigt', 'angekündigt'], answer: 2 },
        { options: ['Darüber', 'Außerdem', 'Dazu'], answer: 0 },
        { options: ['berücksichtigend', 'berücksichtigen', 'berücksichtigt'], answer: 1 },
        { options: ['vermeiden', 'verlassen', 'verzichten'], answer: 2 },
        { options: ['statt', 'außer', 'ohne'], answer: 0 },
        { options: ['wohin', 'wann', 'wie'], answer: 1 },
        { options: ['hätte', 'wäre', 'würde'], answer: 2 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

ich wohne seit zwei Jahren in Ihrer Wohnanlage in der Gartenstraße 12 und wende mich heute mit einem [1] an Sie.

Seit einigen Monaten werden die Abfälle in unserem Innenhof nicht mehr richtig [2]. Neben den Containern [3] sich regelmäßig Sperrmüll und Tüten mit Restmüll. Dadurch entsteht nicht nur ein unangenehmer [4], sondern es werden auch Ratten [5]. Mehrere Mieterinnen und Mieter haben sich deswegen bereits bei der Hausverwaltung [6] — leider ohne Erfolg.

Ich schlage deshalb [7], zusätzliche Behälter aufzustellen und die Abholung häufiger durchführen zu lassen. Außerdem könnten mehrsprachige Hinweisschilder helfen, [8] bei der Mülltrennung zu vermeiden. Selbstverständlich bin ich gern bereit, an einer gemeinsamen Lösung [9].

Über eine baldige [10] würde ich mich sehr freuen.

Mit freundlichen Grüßen
Tomasz Kowalski`,
      wordBank: [
        'angelockt',
        'Anliegen',
        'beschwert',
        'dagegen',
        'geöffnet',
        'Geruch',
        'getrennt',
        'Missverständnisse',
        'mitzuwirken',
        'Rückmeldung',
        'stapeln',
        'Umgebung',
        'verursacht',
        'vor',
        'zuständig'
      ],
      answers: [1, 6, 10, 5, 0, 2, 13, 7, 8, 9]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Die Bürger werden gebeten, ihre Gärten vorerst nicht mit Trinkwasser zu bewässern.',
          answer: true,
          audio:
            'Und nun eine Meldung aus der Region: Wegen der anhaltenden Trockenheit sind die Trinkwasserspeicher des Landkreises auf einem historisch niedrigen Stand. Die Kreisverwaltung appelliert deshalb an alle Haushalte, bis auf Weiteres auf das Bewässern von Gärten und Rasenflächen mit Trinkwasser zu verzichten. Auch das Befüllen privater Schwimmbecken ist vorerst untersagt. Bei Verstößen drohen Bußgelder.'
        },
        {
          statement: 'Das neue Mehrwegsystem gilt nur in einem einzigen Café.',
          answer: false,
          audio:
            'Gute Nachrichten für alle Kaffeetrinker: Ab Montag startet in der Innenstadt das neue Mehrwegsystem für Getränkebecher. Mehr als vierzig Cafés, Bäckereien und Kioske machen mit. Kundinnen und Kunden zahlen zwei Euro Pfand und können den Becher in jedem teilnehmenden Geschäft zurückgeben — ganz gleich, wo sie ihn ausgeliehen haben. Die Stadt erhofft sich davon deutlich weniger Müll in den öffentlichen Abfalleimern.'
        },
        {
          statement: 'Die Stadt will bis 2030 ausschließlich elektrische Busse einsetzen.',
          answer: true,
          audio:
            'Die Verkehrsbetriebe haben heute ihre Pläne für die kommenden Jahre vorgestellt: Bis zum Jahr 2030 soll die gesamte Busflotte auf Elektroantrieb umgestellt werden. Schon im nächsten Frühjahr gehen die ersten zwanzig E-Busse in den Linienbetrieb, die dazugehörigen Ladestationen auf dem Betriebshof sind bereits im Bau. Finanziert wird die Umstellung zu einem großen Teil aus Fördermitteln des Bundes.'
        },
        {
          statement: 'Dem Bericht zufolge geht es dem Wald deutlich besser als im Vorjahr.',
          answer: false,
          audio:
            'Der heute veröffentlichte Waldzustandsbericht zeichnet ein düsteres Bild: Vier von fünf Bäumen im Land gelten als geschädigt, das sind noch einmal mehr als im vergangenen Jahr. Besonders betroffen sind Fichten und Buchen, die unter Trockenheit und Schädlingen leiden. Die Forstministerin kündigte an, den Umbau zu widerstandsfähigen Mischwäldern mit zusätzlichen Millionen zu fördern.'
        },
        {
          statement: 'Die Stadt bezuschusst kleine Solaranlagen für den Balkon.',
          answer: true,
          audio:
            'Wer auf dem eigenen Balkon Strom erzeugen möchte, bekommt dafür jetzt Geld von der Stadt: Ab sofort können alle Haushalte einen Zuschuss von bis zu zweihundert Euro für ein sogenanntes Balkonkraftwerk beantragen. Die kleinen Solaranlagen lassen sich am Geländer befestigen und speisen den Strom direkt in die Steckdose ein. Anträge sind online oder im Bürgerbüro möglich; der Fördertopf ist allerdings begrenzt.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderator',
          text: 'Guten Abend und willkommen zu „Stadtgespräch“! Heute geht es um die Frage, wie eine Stadt klimafreundlicher werden kann. Dazu begrüße ich Malte Jansen, den Klimaschutzmanager unserer Stadt. Herr Jansen, was macht eigentlich ein Klimaschutzmanager?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Guten Abend! Ich koordiniere alle Klimaschutzprojekte der Stadtverwaltung — von der Gebäudesanierung bis zur Solarförderung. Die Stelle wurde vor gut fünf Jahren geschaffen, und ich übe diese Tätigkeit seitdem aus, als Erster übrigens in dieser Funktion.'
        },
        {
          speaker: 'Moderator',
          text: 'Die Stadt hat sich ein großes Ziel gesetzt. Welches genau?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Der Stadtrat hat beschlossen, dass wir bis zum Jahr 2040 klimaneutral sein wollen. Das klingt weit weg, ist aber ehrgeizig — dafür müssen wir unseren Ausstoß an Treibhausgasen in jedem einzelnen Jahr deutlich senken.'
        },
        {
          speaker: 'Moderator',
          text: 'Wo entstehen denn in unserer Stadt die meisten Emissionen? Beim Verkehr, oder?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Das vermuten die meisten, es stimmt aber nicht. Den mit Abstand größten Anteil haben die Gebäude, genauer gesagt das Heizen — fast die Hälfte der Emissionen entsteht dort. Der Verkehr folgt erst an zweiter Stelle. Deshalb setzen wir vor allem bei der Sanierung an: Hausbesitzerinnen und Hausbesitzer bekommen bei uns eine kostenlose Erstberatung, und wer sein Haus dämmt oder die Heizung austauscht, erhält zusätzlich einen Zuschuss von der Stadt.'
        },
        {
          speaker: 'Moderator',
          text: 'Und wie läuft es beim Ausbau der Solarenergie?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Erfreulich gut. Die Zahl der Solaranlagen auf unseren Dächern hat sich innerhalb von zwei Jahren verdoppelt. Dazu haben sicher auch die gestiegenen Strompreise beigetragen, aber ebenso unser Förderprogramm und die Beratungsangebote im Bürgerbüro.'
        },
        {
          speaker: 'Moderator',
          text: 'Es gibt allerdings auch Kritik: Vielen geht das alles zu langsam. Was sagen Sie dazu?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Diese Kritik kann ich ehrlich gesagt gut nachvollziehen. Manche Verfahren dauern wirklich zu lange, etwa Genehmigungen für größere Anlagen. Das liegt vor allem daran, dass uns Personal fehlt — da will ich gar nichts beschönigen. Wir versuchen, Abläufe zu vereinfachen, aber über Nacht geht das nicht.'
        },
        {
          speaker: 'Moderator',
          text: 'Wie können sich die Bürgerinnen und Bürger eigentlich einbringen?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Zum Beispiel über unseren Klimabeirat. Dort sitzen Fachleute, aber eben nicht nur: Ein Drittel der Mitglieder sind zufällig ausgewählte Bürgerinnen und Bürger, die per Los bestimmt werden. Der Beirat trifft sich viermal im Jahr und gibt Empfehlungen an den Stadtrat. Daneben läuft ein Projekt an den Schulen, bei dem die Klassen den Energieverbrauch ihres Gebäudes selbst messen und Sparideen entwickeln. Das kommt so gut an, dass wir es gerade auf weitere Schulen ausweiten.'
        },
        {
          speaker: 'Moderator',
          text: 'Zum Schluss eine persönliche Frage: Wie klimafreundlich leben Sie selbst?'
        },
        {
          speaker: 'Herr Jansen',
          text: 'Ich bemühe mich, ohne mich zu quälen. Mein Auto habe ich vor drei Jahren verkauft; ich fahre Rad und nutze für größere Transporte Carsharing. Und mein Rat an alle: Fangen Sie nicht überall gleichzeitig an, das überfordert nur. Suchen Sie sich einen Bereich aus — das Heizen, das Fliegen oder die Ernährung — und ändern Sie dort zuerst etwas. Der Rest kommt oft von allein.'
        },
        {
          speaker: 'Moderator',
          text: 'Herr Jansen, vielen Dank für das Gespräch!'
        }
      ],
      statements: [
        { statement: 'Herr Jansen übt seine Tätigkeit seit ungefähr fünf Jahren aus.', answer: true },
        { statement: 'Die Stadt möchte bereits im Jahr 2030 klimaneutral sein.', answer: false },
        {
          statement: 'Den größten Anteil an den Emissionen der Stadt hat der Verkehr.',
          answer: false
        },
        {
          statement:
            'Hausbesitzer können neben der kostenlosen Beratung auch einen Zuschuss der Stadt erhalten.',
          answer: true
        },
        {
          statement: 'Die Zahl der Solaranlagen hat sich innerhalb von zwei Jahren verdoppelt.',
          answer: true
        },
        {
          statement: 'Herr Jansen weist die Kritik am langsamen Tempo vollständig zurück.',
          answer: false
        },
        {
          statement: 'Im Klimabeirat sitzen auch per Los ausgewählte Bürgerinnen und Bürger.',
          answer: true
        },
        {
          statement: 'Das Energieprojekt an den Schulen wurde mangels Interesse eingestellt.',
          answer: false
        },
        { statement: 'Herr Jansen besitzt selbst kein Auto mehr.', answer: true },
        {
          statement: 'Herr Jansen empfiehlt, alle Lebensbereiche gleichzeitig klimafreundlich umzustellen.',
          answer: false
        }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Wertstoffhof ist am Samstag länger geöffnet als bisher.',
          answer: true,
          audio:
            'Eine Information der Stadtwerke: Ab dem 1. April gelten am Wertstoffhof in der Industriestraße neue Öffnungszeiten. Samstags haben wir künftig durchgehend von acht bis achtzehn Uhr für Sie geöffnet — das sind vier Stunden mehr als bisher. Unter der Woche bleiben die Zeiten unverändert. Bitte beachten Sie: Die Anlieferung von Bauschutt ist weiterhin nur werktags möglich.'
        },
        {
          statement: 'Die Besucher des Stadtfests sollen möglichst mit dem Auto anreisen.',
          answer: false,
          audio:
            'Liebe Bürgerinnen und Bürger, am kommenden Wochenende feiern wir das Stadtfest — in diesem Jahr erstmals als klimafreundliche Veranstaltung. Wir bitten Sie, möglichst mit Bus, Bahn oder Fahrrad anzureisen: Alle Buslinien fahren am Samstag kostenlos, und am Festgelände stehen bewachte Fahrradparkplätze bereit. Die Innenstadt ist für den Autoverkehr an beiden Tagen gesperrt.'
        },
        {
          statement:
            'Die Rettertüten enthalten Lebensmittel, die noch gut, aber nicht mehr einwandfrei im Aussehen sind.',
          answer: true,
          audio:
            'Liebe Kundinnen und Kunden, ein Hinweis auf unsere Aktion gegen Lebensmittelverschwendung: In der Obst- und Gemüseabteilung finden Sie ab sofort unsere Rettertüten. Sie enthalten Obst und Gemüse mit kleinen Schönheitsfehlern — völlig genießbar, nur eben nicht mehr perfekt im Aussehen. Jede Tüte kostet nur zwei Euro. Helfen Sie mit, dass gute Lebensmittel nicht in der Tonne landen!'
        },
        {
          statement: 'Das Wasser im Schwimmbad ist wärmer als früher.',
          answer: false,
          audio:
            'Liebe Badegäste, herzlich willkommen im Hallenbad Süd! Bitte beachten Sie: Um Energie zu sparen, haben wir die Wassertemperatur in den Schwimmbecken um zwei Grad abgesenkt. Das Kinderbecken bleibt von dieser Maßnahme ausgenommen. Mit der eingesparten Energie leisten wir gemeinsam einen Beitrag zum Klimaschutz. Wir danken Ihnen für Ihr Verständnis und wünschen viel Spaß beim Schwimmen.'
        },
        {
          statement: 'Die freiwilligen Helfer müssen eigenes Werkzeug zur Pflanzaktion mitbringen.',
          answer: false,
          audio:
            'Eine Durchsage des Umweltamts: Für die große Baumpflanzaktion am Samstag im Stadtpark suchen wir noch freiwillige Helferinnen und Helfer. Treffpunkt ist um neun Uhr am Parkeingang Lindenallee. Spaten, Handschuhe und alle weiteren Geräte werden von uns gestellt — bringen Sie lediglich wetterfeste Kleidung und gute Laune mit. Für Getränke und einen Mittagsimbiss ist gesorgt. Eine Anmeldung ist nicht erforderlich.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail (150–220 Wörter) und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Anfrage: Förderprogramm für Balkon-Solaranlagen',
        situation:
          'Sie haben gelesen, dass Ihre Stadt kleine Solaranlagen für den Balkon finanziell fördert. Sie wohnen zur Miete und möchten eine solche Anlage anschaffen. Schreiben Sie an das Umweltamt der Stadt.',
        leitpunkte: [
          'Erklären Sie, warum Sie sich für das Programm interessieren.',
          'Fragen Sie nach den Voraussetzungen und der Höhe der Förderung.',
          'Erkundigen Sie sich, ob Mieter die Zustimmung des Vermieters brauchen.',
          'Bitten Sie um die Antragsunterlagen und um eine Frist, bis wann der Antrag möglich ist.'
        ],
        musterloesung: `Betreff: Anfrage zum Förderprogramm für Balkonkraftwerke

Sehr geehrte Damen und Herren,

aus der Zeitung habe ich erfahren, dass die Stadt die Anschaffung kleiner Solaranlagen für den Balkon mit bis zu zweihundert Euro bezuschusst. Da ich meine Stromkosten senken und zugleich einen Beitrag zum Klimaschutz leisten möchte, interessiere ich mich sehr für dieses Programm.

Dazu habe ich einige Fragen. Zunächst würde ich gern wissen, welche Voraussetzungen für die Förderung erfüllt sein müssen und ob es Vorgaben zu Leistung oder Hersteller der Anlage gibt. Außerdem wäre für mich wichtig zu erfahren, in welcher Höhe die Kosten tatsächlich übernommen werden.

Da ich zur Miete wohne, bitte ich zudem um Auskunft, ob ich vor der Montage die schriftliche Zustimmung meines Vermieters einholen muss und ob diese dem Antrag beizulegen ist.

Schließlich wäre ich Ihnen dankbar, wenn Sie mir die Antragsunterlagen zusenden und mir mitteilen könnten, bis wann Anträge gestellt werden können, da der Fördertopf laut Presse begrenzt ist.

Vielen Dank im Voraus für Ihre Mühe.

Mit freundlichen Grüßen
Tomasz Kowalski`
      }
    ],
    tipps:
      'Eine halbformelle Anfrage bleibt höflich und konkret: Formulieren Sie präzise Fragen (Konjunktiv II: „Ich würde gern wissen, ob …“) und nennen Sie klar, was Sie benötigen. Gliedern Sie in Absätze und gehen Sie auf alle vier Leitpunkte ein. Prüfen Sie am Ende: 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Ein Umweltproblem, das mich beschäftigt“ (ca. 2,5 Minuten). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie eine konkrete Situation, in der Ihnen das Problem bewusst wurde.',
        'Erzählen Sie, was genau passiert ist.',
        'Sagen Sie, wie Sie sich dabei gefühlt haben.',
        'Berichten Sie, wie mit dem Problem in Ihrem Heimatland umgegangen wird.'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Besonders bewusst wurde mir das, als …',
        'Rückblickend würde ich sagen, dass …',
        'Kennt ihr/Kennen Sie das auch aus eurem/Ihrem Alltag?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Fliegen muss deutlich teurer werden — nur hohe Preise ändern unser Verhalten.“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen oder eigenen Erfahrungen.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Ich vertrete den Standpunkt, dass …',
        'Man muss allerdings bedenken, dass …',
        'Genau da sehe ich das Problem, denn …',
        'Einerseits …, andererseits …',
        'Ihrem Argument kann ich nur teilweise folgen, weil …',
        'Könnten wir uns darauf verständigen, dass …?'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihr Stadtteil möchte im Frühjahr einen „Umwelttag“ veranstalten — mit einer Müllsammelaktion am Vormittag und einem Tausch- und Reparaturmarkt am Nachmittag. Sie gehören zum Organisationsteam. Planen Sie die Veranstaltung gemeinsam.',
      punkte: [
        'Legen Sie Termin, Ort und Ablauf des Umwelttags fest.',
        'Überlegen Sie, wie Sie Freiwillige und lokale Vereine einbinden.',
        'Klären Sie, welche Ausrüstung und welche Genehmigungen nötig sind.',
        'Entscheiden Sie, wie Sie für die Veranstaltung werben.'
      ],
      redemittel: [
        'Am besten fangen wir damit an, dass …',
        'Hielten Sie es für sinnvoll, wenn …?',
        'Diesen Punkt würde ich übernehmen — kümmern Sie sich dann um …?',
        'Dabei sollten wir unbedingt berücksichtigen, dass …',
        'Gut, dann sind wir uns einig, dass …',
        'Fassen wir zum Schluss zusammen, wer was erledigt.'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
