import { type SingleLevelExam } from '@shared/types';

const exam = {
  id: 6,
  level: 'b2',
  title: 'Modelltest 6',
  theme: 'Konsum & Verbraucherschutz',

  lesen: {
    teil1: {
      anweisung:
        'Lesen Sie zuerst die zehn Überschriften. Lesen Sie dann die fünf Texte und entscheiden Sie: Welche Überschrift passt am besten zu welchem Text?',
      headlines: [
        'Mogelpackungen: Verbraucherschützer prangern versteckte Preiserhöhungen an',
        'Online-Bewertungen: Jede dritte Rezension ist offenbar gefälscht',
        'Reparieren statt wegwerfen: Repair-Cafés erleben starken Zulauf',
        'Neue EU-Regeln stärken Fluggäste bei Verspätungen',
        'Supermärkte verschenken Lebensmittel kurz vor dem Ablaufdatum',
        'Abo-Falle im Internet: Gericht verurteilt Streaming-Anbieter',
        'Kartenzahlung überholt erstmals das Bargeld',
        'Rückruf: Hersteller warnt vor Verletzungsgefahr bei Küchenmaschine',
        'Secondhand wird salonfähig: Gebrauchtwaren boomen',
        'Werbung für Süßigkeiten: Kinderschutz soll verschärft werden'
      ],
      texts: [
        'Die Packung bleibt gleich groß, der Preis auch — nur der Inhalt schrumpft: Nach Angaben der Verbraucherzentrale Hamburg füllen immer mehr Hersteller weniger Ware in ihre gewohnten Verpackungen, ohne die Kundschaft darauf hinzuweisen. Bei Chips, Waschmittel und Schokolade seien so versteckte Preisaufschläge von bis zu vierzig Prozent üblich. Die Verbraucherschützer fordern eine Pflicht, solche Änderungen deutlich auf der Packung anzugeben.',
        'Fünf Sterne, überschwängliches Lob, kein einziger kritischer Satz — echt ist das oft nicht. Eine Untersuchung im Auftrag des Bundeskartellamts kommt zu dem Ergebnis, dass rund ein Drittel der Produktbewertungen in großen Online-Shops nicht von tatsächlichen Käufern stammt. Ganze Agenturen verkaufen demnach positive Rezensionen im Paket. Die Behörde prüft nun, ob die Plattformen ausreichend dagegen vorgehen.',
        'Wer das kostenlose Probeabo einer Filmplattform nicht rechtzeitig kündigte, zahlte plötzlich monatlich — und fand den Kündigungsbutton tief in den Menüs versteckt. Damit ist nun Schluss: Das Landgericht München untersagte dem Anbieter die Praxis und sprach den betroffenen Kundinnen und Kunden die Rückerstattung der Beiträge zu. Verbraucherverbände sprechen von einem Signal für die gesamte Branche.',
        'Der Toaster streikt, die Lieblingslampe flackert? In über tausend ehrenamtlich betriebenen Werkstätten in Deutschland wird defekten Alltagsgegenständen inzwischen ein zweites Leben geschenkt — gemeinsam mit den Besitzern, bei Kaffee und Kuchen. Die Initiativen melden so viele Besucher wie nie; mancherorts muss man sich Wochen im Voraus anmelden. Die Motive reichen vom Umweltschutz bis zur Freude am Selbermachen.',
        'Der Hersteller Kuchenwelt ruft sein Modell „MixMaster 3000“ zurück: Bei einigen Geräten kann sich das Rührmesser während des Betriebs lösen, wie das Unternehmen mitteilte. Kunden werden aufgefordert, die Maschine sofort vom Strom zu trennen und nicht weiter zu benutzen. Betroffene Geräte können in jedem Fachgeschäft gegen Erstattung des vollen Kaufpreises zurückgegeben werden — auch ohne Kassenbon.'
      ],
      answers: [0, 1, 5, 2, 7]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und die Aufgaben. Entscheiden Sie: Ist a, b oder c richtig? Nur eine Antwort ist richtig.',
      titel: 'Ein Jahr lang nichts Neues',
      text: `Als Familie Berger im vergangenen Frühjahr umzog, standen am Ende sechzig Kartons im Flur — voll mit Dingen, die seit Jahren niemand benutzt hatte. „Da haben wir uns gefragt: Warum kaufen wir eigentlich ständig nach?“, erzählt Miriam Berger. Noch am selben Abend beschloss die vierköpfige Familie aus Kassel ein Experiment: zwölf Monate lang nichts Neues anschaffen. Ausgenommen waren lediglich Lebensmittel, Hygieneartikel und Medikamente.

Die Regeln waren streng, aber nicht unmöglich: Was kaputtging, wurde repariert, geliehen oder gebraucht ersetzt. Auf die Probe gestellt wurde die Familie schon im zweiten Monat, als die Waschmaschine ausfiel. Statt ein neues Gerät zu bestellen, brachte Thomas Berger die Maschine ins Repair-Café im Stadtteilzentrum — mit Erfolg: Ein pensionierter Elektriker fand den Fehler, ein Ersatzteil für zwölf Euro genügte. „Das war der Moment, in dem aus dem Verzicht ein Sport wurde“, sagt Berger. Schwieriger waren die Kindergeburtstage; die Söhne wünschten sich Neues und mussten sich mit gebrauchten Spielsachen und selbst gebauten Geschenken anfreunden.

Die Konsumforscherin Dr. Eva Lindström beobachtet solche Experimente mit Interesse. Viele Teilnehmer behielten einen Teil ihrer neuen Gewohnheiten dauerhaft bei, sagt sie, gerade weil sie den Verzicht als Gewinn an Zeit und Geld erlebten. Zugleich warnt sie vor überzogenen Erwartungen: „Der Verzicht Einzelner ist wertvoll, ersetzt aber keine politischen Regeln — etwa ein Recht auf Reparatur oder Vorgaben für langlebige Produkte.“

Nach zwölf Monaten hat Familie Berger Bilanz gezogen: rund 4.300 Euro gespart, davon zwei gebrauchte Fahrräder gekauft und den Rest für eine Reise zurückgelegt. Vieles ist geblieben — vor dem Kauf fragen sich alle bis heute, ob sie eine Sache wirklich brauchen. Ganz konsequent sind sie allerdings nicht mehr: Als Miriams Smartphone endgültig den Dienst quittierte, kaufte sie ein neues Gerät. „Gebraucht war mir beim Akku zu riskant“, gibt sie zu. „Aber es war der einzige Neukauf in diesem Jahr.“`,
      questions: [
        {
          frage: 'Der Anlass für das Experiment war, …',
          options: [
            'dass der Familie beim Umzug ihr großer Besitz bewusst wurde.',
            'dass die Familie nach dem Umzug Geldprobleme hatte.',
            'dass die Kinder sich weniger Spielzeug wünschten.'
          ],
          answer: 0
        },
        {
          frage: 'Während des Jahres durfte die Familie …',
          options: [
            'überhaupt keine Waren kaufen.',
            'kaputte Dinge durch Gebrauchtes ersetzen.',
            'nur an Geburtstagen etwas Neues kaufen.'
          ],
          answer: 1
        },
        {
          frage: 'Das Problem mit der Waschmaschine …',
          options: [
            'zwang die Familie zum Kauf eines neuen Geräts.',
            'wurde im Repair-Café für wenig Geld gelöst.',
            'blieb bis zum Ende des Jahres ungelöst.'
          ],
          answer: 1
        },
        {
          frage: 'Dr. Lindström ist der Meinung, dass …',
          options: [
            'solche Experimente langfristig nichts verändern.',
            'privater Verzicht politische Regeln überflüssig macht.',
            'privater Verzicht politische Maßnahmen nicht ersetzt.'
          ],
          answer: 2
        },
        {
          frage: 'Nach dem Ende des Experiments …',
          options: [
            'kauft die Familie wieder genauso ein wie früher.',
            'hat die Familie manche Gewohnheiten beibehalten.',
            'hat die Familie das gesparte Geld vollständig gespendet.'
          ],
          answer: 1
        }
      ]
    },
    teil3: {
      anweisung:
        'Lesen Sie die Situationen und die Anzeigen. Welche Anzeige passt zu welcher Situation? Jede Anzeige passt höchstens einmal.',
      situations: [
        'Ein Kollege hat online Ware bezahlt, die nie geliefert wurde, und sucht rechtlichen Beistand.',
        'Sie möchten Ihren Strom- und Gastarif unabhängig prüfen und vergleichen lassen.',
        'Ihre Nachbarin möchte gut erhaltene Möbel spenden und abholen lassen.',
        'Ein Freund braucht für sein Smartphone einen neuen Akku — die Garantie ist abgelaufen.',
        'Eine ältere Dame möchte ihr defektes Radio reparieren lassen, ohne Geld auszugeben.',
        'Sie möchten sich wöchentlich frisches Gemüse aus der Region liefern lassen.',
        'Eine Freundin möchte ihre Kleidung tauschen, statt neue zu kaufen.',
        'Ihre Tante zahlt zu viel für ihren Handyvertrag und möchte beim Wechsel unterstützt werden.',
        'Sie möchten Lebensmittel vor der Tonne retten und dabei günstig einkaufen.',
        'Ein Bekannter möchte neutral prüfen lassen, ob seine Versicherungen zu teuer sind.'
      ],
      ads: [
        'Elektro-Discount MegaWatt: Alt gegen neu! Beim Kauf eines Neugeräts nehmen wir Ihr Altgerät in Zahlung — nur diese Woche.',
        'Verbraucherzentrale, Beratungsstelle Mitte: Unabhängiger Energie-Check — wir vergleichen Ihre Strom- und Gastarife und begleiten den Wechsel.',
        'Sozialkaufhaus Brücke: Wir holen gut erhaltene Möbel und Hausrat kostenlos bei Ihnen ab und geben sie günstig an Bedürftige weiter.',
        'Kanzlei Weidmann & Kollegen: Schwerpunkt Verbraucherrecht — Ärger mit Online-Bestellungen, Fake-Shops oder Abo-Fallen? Erstberatung zum Festpreis.',
        'Repair-Café im Stadtteilhaus West: Ehrenamtliche reparieren gemeinsam mit Ihnen Radios, Toaster und Lampen — kostenlos, jeden ersten Samstag im Monat.',
        'Handyklinik am Markt: Display- und Akkutausch für alle Smartphone-Modelle zum Festpreis — auch ohne Garantie, fertig in 24 Stunden.',
        'Biohof Lindental: Unsere Gemüsekiste im Abo — jede Woche frisch, regional und saisonal bis an Ihre Haustür. Jederzeit pausierbar.',
        'Tarifheld: Wir kündigen Ihren alten Handyvertrag und finden den passenden günstigen Tarif — im Schnitt 180 Euro Ersparnis pro Jahr.',
        'Kleidertauschparty im Kulturzentrum: Bringen Sie bis zu acht gut erhaltene Kleidungsstücke mit und tauschen Sie sie gegen neue Lieblingsteile. Eintritt frei.',
        'Honorarberatung Klar: Unabhängige Analyse Ihrer Versicherungsverträge gegen feste Gebühr — wir verkaufen nichts, wir beraten nur.',
        'Krumme Gurke: Der Laden für gerettete Lebensmittel — Ware kurz vor dem Mindesthaltbarkeitsdatum bis zu 70 Prozent günstiger.',
        'Möbelhaus Living: Großer Räumungsverkauf wegen Umbaus — Sofas, Schränke und Betten bis zu 50 Prozent reduziert.'
      ],
      answers: [3, 1, 2, 5, 4, 6, 8, 7, 10, 9]
    }
  },

  sprachbausteine: {
    teil1: {
      anweisung:
        'Lesen Sie den Brief und entscheiden Sie, welches Wort (a, b oder c) in die Lücken [1] bis [10] passt.',
      text: `Sehr geehrte Damen und Herren,

am 2. Mai habe ich in Ihrer Filiale in der Bahnhofstraße einen Kleiderschrank des Modells „Verona“ bestellt, [1] Lieferung mir verbindlich für Ende Mai zugesagt wurde. Tatsächlich wurde der Schrank erst am 24. Juni geliefert, also fast vier Wochen [2].

Beim Auspacken musste ich außerdem [3], dass die linke Tür einen tiefen Kratzer aufweist. Der Monteur, [4] ich den Schaden sofort zeigte, hat ihn im Lieferprotokoll schriftlich bestätigt. Ich habe daher [5], die Rechnung vorerst nur zum Teil zu bezahlen.

[6] Ihren Allgemeinen Geschäftsbedingungen habe ich in einem solchen Fall Anspruch auf kostenlosen Ersatz. Ich fordere Sie deshalb auf, die beschädigte Tür [7] von drei Wochen auszutauschen. Sollte dies nicht geschehen, werde ich vom Kaufvertrag [8] und den bereits gezahlten Betrag zurückverlangen.

Bitte nennen Sie mir rechtzeitig einen Termin für den Austausch, [9] ich mich einstellen kann.

In der Hoffnung auf eine rasche Lösung [10] ich

mit freundlichen Grüßen
Sofia Petrou`,
      gaps: [
        { options: ['deren', 'dessen', 'wessen'], answer: 1 },
        { options: ['nachher', 'danach', 'später'], answer: 2 },
        { options: ['feststellen', 'festhalten', 'festlegen'], answer: 0 },
        { options: ['den', 'dem', 'der'], answer: 1 },
        { options: ['geschlossen', 'entschlossen', 'beschlossen'], answer: 2 },
        { options: ['Laut', 'Trotz', 'Gegen'], answer: 0 },
        { options: ['zwischen', 'außerhalb', 'innerhalb'], answer: 2 },
        { options: ['zurücktreten', 'zurückgehen', 'zurückkommen'], answer: 0 },
        { options: ['auf dem', 'auf den', 'an dem'], answer: 1 },
        { options: ['verbleibe', 'befinde', 'erhalte'], answer: 0 }
      ]
    },
    teil2: {
      anweisung:
        'Lesen Sie den Text und entscheiden Sie, welches Wort aus dem Kasten in die Lücken [1] bis [10] passt. Jedes Wort passt nur einmal.',
      text: `Sehr geehrte Damen und Herren,

ich wende mich an Sie, weil ich mit meinem Fitnessstudio in einen [1] geraten bin und Ihre Unterstützung benötige.

Im Januar habe ich dort einen Vertrag mit einer [2] von zwölf Monaten unterschrieben. Wegen eines Umzugs in eine andere Stadt habe ich die Mitgliedschaft im August fristgerecht [3]. Das Studio besteht jedoch [4], dass sich der Vertrag automatisch um ein weiteres Jahr verlängert habe, und [5] weiterhin jeden Monat 39 Euro von meinem Konto ab.

In den Vertragsunterlagen findet sich zu einer solchen Verlängerung allerdings kein [6]. Auf mein Einschreiben vom 5. September habe ich bis heute keine [7] erhalten.

Ich möchte Sie daher um eine rechtliche [8] bitten: Bin ich wirklich [9], die Beiträge weiterzuzahlen? Gern sende ich Ihnen alle Unterlagen zu. Für Ihre Mühe [10] ich mich schon jetzt herzlich.

Mit freundlichen Grüßen
Tomasz Kowalski`,
      wordBank: [
        'abgeschlossen',
        'bedanke',
        'Beratung',
        'bucht',
        'dagegen',
        'darauf',
        'erlaubt',
        'gekündigt',
        'Hinweis',
        'Laufzeit',
        'Meinung',
        'Reaktion',
        'Streit',
        'verpflichtet',
        'Zahlung'
      ],
      answers: [12, 9, 7, 5, 3, 8, 11, 2, 13, 1]
    }
  },

  hoeren: {
    teil1: {
      anweisung:
        'Sie hören fünf kurze Texte aus dem Radio. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Der Rückruf betrifft nur Geräte aus einer bestimmten Produktionsserie.',
          answer: true,
          audio:
            'Eine Verbraucherwarnung: Der Hersteller Heißluft ruft seine Friteuse „Crispy Deluxe“ zurück, weil sich das Gehäuse bei längerem Betrieb stark erhitzen kann. Betroffen sind ausschließlich Geräte der Produktionsserie mit den Nummern 44 bis 47 — die Seriennummer finden Sie auf der Unterseite des Geräts. Alle anderen Modelle können bedenkenlos weiterverwendet werden. Betroffene Kunden erhalten den Kaufpreis zurück.'
        },
        {
          statement: 'Butter ist im Vergleich zum Vorjahr wieder teurer geworden.',
          answer: false,
          audio:
            'Und nun zu den Verbraucherpreisen: Nach den starken Steigerungen der vergangenen Jahre gibt es an der Kühltheke eine spürbare Entlastung. Butter kostet derzeit gut zwanzig Prozent weniger als vor einem Jahr, auch Milch und Sahne sind günstiger geworden. Fachleute begründen den Rückgang mit gesunkenen Energiekosten und einer höheren Milchproduktion in Europa.'
        },
        {
          statement: 'Das Pfandsystem soll künftig auch für Saftflaschen gelten.',
          answer: true,
          audio:
            'Aus der Politik: Der Bundesrat hat heute eine Erweiterung des Einwegpfands beschlossen. Ab Januar müssen Verbraucherinnen und Verbraucher auch auf Plastikflaschen mit Fruchtsäften und Milchmischgetränken fünfundzwanzig Cent Pfand zahlen — bisher waren diese Getränke ausgenommen. Handel und Umweltverbände begrüßten die Entscheidung, kritisierten jedoch die kurze Übergangsfrist für die Umstellung der Automaten.'
        },
        {
          statement: 'Betroffene Fluggäste bekommen die Entschädigung automatisch ausgezahlt.',
          answer: false,
          audio:
            'Reisende aufgepasst: Nach der gestrigen Computerpanne am Flughafen fielen über einhundert Flüge aus. Betroffene Passagiere haben nach europäischem Recht Anspruch auf eine Entschädigung von bis zu sechshundert Euro. Wichtig zu wissen: Die Fluggesellschaften zahlen nicht von sich aus — Reisende müssen die Entschädigung schriftlich beantragen und dafür Buchungsunterlagen und Belege einreichen.'
        },
        {
          statement: 'Im Test erhielten auch preiswerte Waschmittel gute Noten.',
          answer: true,
          audio:
            'Die Stiftung Warentest hat zwanzig Vollwaschmittel untersucht — mit einem erfreulichen Ergebnis für Sparsame: Gleich mehrere günstige Eigenmarken von Drogerien und Supermärkten erhielten die Note „gut“ und wuschen ebenso sauber wie teure Markenprodukte. Zwei bekannte Markenwaschmittel landeten dagegen nur im Mittelfeld. Der ausführliche Test ist ab morgen im Heft und online nachzulesen.'
        }
      ]
    },
    teil2: {
      anweisung:
        'Sie hören ein Interview. Sie hören das Interview einmal. Entscheiden Sie: Sind die Aussagen richtig oder falsch?',
      audio: [
        {
          speaker: 'Moderatorin',
          text: 'Guten Tag und willkommen bei „Ratgeber Alltag“. Bei mir ist heute Katrin Sander von der Verbraucherzentrale. Frau Sander, worüber beschweren sich die Menschen bei Ihnen zurzeit am häufigsten?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Ganz klar über Probleme beim Online-Einkauf. Die Zahl dieser Beschwerden ist bei uns innerhalb von zwei Jahren um fast die Hälfte gestiegen. Die meisten Fälle betreffen dabei nicht etwa Möbel oder Kleidung, sondern Elektronik — und immer öfter sogenannte Fake-Shops, also gefälschte Online-Läden, die kassieren, aber nie liefern.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Woran erkenne ich denn so einen gefälschten Shop?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Das erste Warnsignal ist der Preis: Wenn ein aktuelles Smartphone die Hälfte des üblichen Preises kostet, sollten alle Alarmglocken läuten. Verdächtig ist auch ein fehlendes oder unvollständiges Impressum. Und ganz wichtig: die Bezahlung. Wenn am Ende der Bestellung plötzlich nur noch Vorkasse per Überweisung möglich ist, obwohl vorher andere Zahlungsarten angezeigt wurden, sollte man den Kauf abbrechen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Wie bezahle ich denn am sichersten im Internet?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Am besten auf Rechnung — dann zahlen Sie erst, wenn die Ware tatsächlich bei Ihnen angekommen ist und Sie sie geprüft haben. Damit tragen Sie das geringste Risiko. Beim Lastschriftverfahren können Sie einer Abbuchung immerhin noch acht Wochen lang widersprechen und das Geld zurückholen. Überweisen Sie dagegen im Voraus, ist das Geld im Betrugsfall in aller Regel verloren.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Angenommen, die Ware kommt an, gefällt mir aber nicht. Welche Rechte habe ich dann?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Bei Online-Käufen haben Sie grundsätzlich ein Widerrufsrecht von vierzehn Tagen — ohne Angabe von Gründen. Sie schicken die Ware zurück und bekommen Ihr Geld wieder. Die Kosten der Rücksendung darf der Händler Ihnen nur dann auferlegen, wenn er vorher klar darüber informiert hat, und dann auch nur in Höhe der tatsächlichen Portokosten. Fantasiegebühren sind unzulässig.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Viele verlassen sich beim Einkaufen auf Kundenbewertungen. Ist das klug?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Mit Vorsicht. Ein erheblicher Teil der Bewertungen ist gekauft oder schlicht gefälscht. Typisch für gefälschte Rezensionen ist eine auffällig überschwängliche Sprache — alles ist perfekt, großartig, das beste Produkt aller Zeiten, ohne ein einziges kritisches Wort. Lesen Sie lieber die mittleren Bewertungen mit drei Sternen, die sind erfahrungsgemäß am ehrlichsten.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Was tut die Verbraucherzentrale konkret gegen Fake-Shops?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Wir betreiben einen sogenannten Fake-Shop-Finder: eine ständig aktualisierte Liste bekannter betrügerischer Seiten, die jeder kostenlos auf unserer Internetseite abrufen kann. Dort kann man eine Webadresse eingeben und bekommt sofort eine Einschätzung. Zusätzlich mahnen wir unseriöse Anbieter ab und gehen notfalls vor Gericht.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Und wenn ich persönlich beraten werden möchte — was kostet mich das?'
        },
        {
          speaker: 'Frau Sander',
          text: 'Eine kurze telefonische Erstauskunft ist kostenlos. Für eine ausführliche rechtliche Beratung, etwa wenn wir Verträge prüfen oder Schreiben aufsetzen, berechnen wir eine geringe Gebühr — je nach Aufwand zwischen zehn und dreißig Euro. Für Menschen mit sehr geringem Einkommen gibt es Ermäßigungen.'
        },
        {
          speaker: 'Moderatorin',
          text: 'Frau Sander, vielen Dank für diese hilfreichen Tipps!'
        }
      ],
      statements: [
        {
          statement: 'Die Zahl der Beschwerden über Online-Käufe ist deutlich gestiegen.',
          answer: true
        },
        { statement: 'Die meisten Beschwerden betreffen Möbelkäufe.', answer: false },
        {
          statement: 'Auffällig niedrige Preise können auf einen Fake-Shop hinweisen.',
          answer: true
        },
        {
          statement: 'Wenn nur Zahlung per Vorkasse möglich ist, sollte man misstrauisch werden.',
          answer: true
        },
        { statement: 'Beim Kauf auf Rechnung tragen Kunden das größte Risiko.', answer: false },
        {
          statement: 'Online-Käufe können in der Regel vierzehn Tage lang widerrufen werden.',
          answer: true
        },
        {
          statement: 'Händler dürfen für Rücksendungen beliebig hohe Gebühren verlangen.',
          answer: false
        },
        {
          statement: 'Gefälschte Bewertungen sind oft auffällig positiv formuliert.',
          answer: true
        },
        {
          statement: 'Die Verbraucherzentrale veröffentlicht eine Liste bekannter Fake-Shops.',
          answer: true
        },
        { statement: 'Jede Beratung der Verbraucherzentrale ist kostenlos.', answer: false }
      ]
    },
    teil3: {
      anweisung:
        'Sie hören fünf kurze Durchsagen und Mitteilungen. Sie hören jeden Text einmal. Entscheiden Sie: Ist die Aussage richtig oder falsch?',
      items: [
        {
          statement: 'Ohne Kassenbon wird der Kaufpreis nicht erstattet.',
          answer: false,
          audio:
            'Liebe Kundinnen und Kunden, eine wichtige Mitteilung: Der Hersteller unseres Apfelsafts der Marke „Sonnengold“ ruft die Charge mit dem Haltbarkeitsdatum 12. Oktober zurück, da einzelne Flaschen Glassplitter enthalten können. Bitte trinken Sie diesen Saft nicht. Sie können die Flaschen an der Information zurückgeben — den Kaufpreis erstatten wir selbstverständlich auch ohne Vorlage des Kassenbons.'
        },
        {
          statement: 'Die Rabattaktion gilt für alle Kundinnen und Kunden.',
          answer: true,
          audio:
            'Verehrte Kundschaft, heute lohnt sich Ihr Einkauf doppelt: Anlässlich unseres Jubiläums erhalten alle Kundinnen und Kunden an der Kasse zwanzig Prozent Rabatt auf das gesamte Sortiment — ausgenommen sind lediglich Tabakwaren und bereits reduzierte Artikel. Eine Kundenkarte oder Anmeldung ist nicht erforderlich. Die Aktion endet heute Abend mit Ladenschluss.'
        },
        {
          statement: 'Das Einkaufszentrum schließt heute früher als gewöhnlich.',
          answer: true,
          audio:
            'Werte Besucherinnen und Besucher, bitte beachten Sie: Wegen der jährlichen Inventur schließt unser Einkaufszentrum heute bereits um achtzehn Uhr, also zwei Stunden früher als gewöhnlich. Wir bitten Sie, Ihre Einkäufe rechtzeitig zu beenden und sich zu den Ausgängen zu begeben. Ab morgen früh um neun Uhr sind wir wieder wie gewohnt für Sie da.'
        },
        {
          statement: 'Gekaufte Artikel können nur noch heute umgetauscht werden.',
          answer: false,
          audio:
            'Eine Information für unsere Kundinnen und Kunden im Erdgeschoss: An unserem Aktionsstand für Wintersportartikel gilt weiterhin unser erweitertes Umtauschrecht. Alle dort gekauften Artikel können bis zum Ende des Monats gegen Vorlage des Kassenbons umgetauscht oder zurückgegeben werden. Das Team am Stand berät Sie gern bei Fragen zu Größen und Modellen.'
        },
        {
          statement: 'Der Wochenmarkt findet nächste Woche an einem anderen Ort statt.',
          answer: true,
          audio:
            'Achtung, eine Durchsage des Marktamts: Wegen der Bauarbeiten am Rathausplatz wird der Wochenmarkt in der kommenden Woche auf den Parkplatz an der Stadthalle verlegt. Die Marktzeiten bleiben unverändert: dienstags und freitags von sieben bis dreizehn Uhr. Alle Händlerinnen und Händler sind auch am neuen Standort vertreten. Ab übernächster Woche findet der Markt wieder wie gewohnt statt.'
        }
      ]
    }
  },

  schreiben: {
    anweisung:
      'Sie haben 30 Minuten Zeit. Schreiben Sie eine halbformelle E-Mail und gehen Sie auf alle vier Leitpunkte ein. Achten Sie auf eine passende Anrede und einen passenden Gruß.',
    tasks: [
      {
        titel: 'Leserbrief: Werbeverbot für ungesunde Lebensmittel',
        situation:
          'In einer Zeitung haben Sie einen Artikel über den Plan gelesen, Werbung für Süßigkeiten und Fastfood, die sich an Kinder richtet, gesetzlich zu verbieten. Schreiben Sie einen Leserbrief an die Redaktion.',
        leitpunkte: [
          'Nehmen Sie Bezug auf den Artikel und das geplante Verbot.',
          'Erläutern Sie Ihre Meinung mit Argumenten.',
          'Berichten Sie von eigenen Erfahrungen oder Beobachtungen.',
          'Formulieren Sie einen Vorschlag oder eine Forderung.'
        ],
        musterloesung: `Betreff: Leserbrief zum Artikel „Streit um Werbeverbot für Kinderprodukte“ vom 12. Mai

Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihren Artikel über das geplante Werbeverbot für ungesunde Lebensmittel gelesen. Als Vater zweier Grundschulkinder begrüße ich den Vorstoß ausdrücklich.

Kritiker nennen das Verbot Bevormundung, doch das überzeugt mich nicht: Kinder können Werbung von Information noch gar nicht unterscheiden. Genau darauf zielen die Hersteller ab, wenn sie Zucker mit Comicfiguren und Gewinnspielen verknüpfen.

Meine Erfahrung bestätigt das täglich: Nach jedem Fernsehnachmittag wünschen sich meine Söhne exakt die Produkte aus den Werbespots, und im Supermarkt sind Süßigkeiten gezielt in Augenhöhe der Kinder platziert. Gegen diese Strategien haben Eltern kaum eine Chance.

Ein Werbeverbot allein reicht allerdings nicht. Ich fordere daher, gleichzeitig die Ernährungsbildung in Schulen zu stärken und gesunde Schulessen verbindlich zu machen. Erst dann hätte das Gesetz eine echte Wirkung, statt nur Symbolpolitik zu bleiben.

Ich würde mich freuen, wenn Ihre Zeitung dem Thema weiter so viel Raum geben würde.

Mit freundlichen Grüßen
Daniel Okafor`
      }
    ],
    tipps:
      'Beim Leserbrief gehören der Bezug auf den Artikel und das Datum dazu. Nutzen Sie Konnektoren (jedoch, daher, allerdings) und stützen Sie Ihre Meinung mit einer eigenen Erfahrung. Gehen Sie auf alle vier Leitpunkte ein und prüfen Sie am Ende: Zielumfang etwa 150–220 Wörter, passende Anrede und Grußformel.'
  },

  sprechen: {
    teil1: {
      titel: 'Teil 1 — Über Erfahrungen sprechen',
      anweisung:
        'Erzählen Sie Ihrer Partnerin / Ihrem Partner von einer eigenen Erfahrung zum Thema „Einkaufen früher und heute in meinem Heimatland“ (ca. 2,5 Minuten pro Person). Gehen Sie auf die Punkte ein und reagieren Sie anschließend auf die Fragen Ihres Partners.',
      punkte: [
        'Beschreiben Sie eine konkrete Einkaufssituation von früher.',
        'Erzählen Sie, was sich seitdem für Sie verändert hat.',
        'Sagen Sie, was Ihnen daran gefällt oder was Ihnen fehlt.',
        'Ziehen Sie ein kurzes Fazit: Wie kaufen Sie selbst am liebsten ein?'
      ],
      redemittel: [
        'Ich möchte euch/Ihnen von einer Erfahrung erzählen, bei der …',
        'Bei mir war das so: …',
        'Aus meiner Erfahrung …',
        'Inzwischen hat sich für mich vieles verändert: …',
        'Rückblickend würde ich sagen, dass …',
        'Wie ist das eigentlich bei dir/Ihnen?'
      ]
    },
    teil2: {
      titel: 'Teil 2 — Diskussion',
      anweisung:
        'Sie haben folgende Schlagzeile gelesen: „Der Onlinehandel zerstört unsere Innenstädte — kauft wieder im Geschäft!“ Diskutieren Sie mit Ihrer Partnerin / Ihrem Partner: Stimmen Sie zu? Begründen Sie Ihre Meinung und reagieren Sie auf die Argumente der anderen Seite.',
      punkte: [
        'Formulieren Sie Ihre Position klar.',
        'Begründen Sie mit Beispielen oder eigenen Einkaufserfahrungen.',
        'Gehen Sie auf die Argumente Ihrer Partnerin / Ihres Partners ein.',
        'Finden Sie zum Schluss eine gemeinsame Einschätzung.'
      ],
      redemittel: [
        'Ich bin der festen Überzeugung, dass …',
        'Dagegen spricht allerdings, dass …',
        'Man muss auch bedenken, dass …',
        'Genau das habe ich selbst erlebt, als …',
        'Das ist ein berechtigter Einwand, trotzdem …',
        'Vielleicht können wir uns darauf verständigen, dass …'
      ]
    },
    teil3: {
      titel: 'Teil 3 — Gemeinsam etwas planen',
      anweisung:
        'Ihre Sprachschule möchte einen Secondhand-Basar organisieren, auf dem Teilnehmende gebrauchte Bücher, Kleidung und Haushaltsgegenstände verkaufen oder tauschen können. Planen Sie die Veranstaltung gemeinsam.',
      punkte: [
        'Wann und wo soll der Basar stattfinden?',
        'Was darf verkauft oder getauscht werden — und was nicht?',
        'Wie informieren Sie Teilnehmende und Nachbarschaft über den Basar?',
        'Wer übernimmt welche Aufgaben (Aufbau, Kasse, Aufräumen)?'
      ],
      redemittel: [
        'Am besten fangen wir damit an, dass …',
        'Ich fände es sinnvoll, wenn …',
        'Dafür könnte ich zuständig sein. / Das würde gut zu Ihnen passen.',
        'Da bin ich anderer Meinung — wäre es nicht besser, …?',
        'Halten wir also fest: …',
        'Zum Schluss verteilen wir noch die Aufgaben.'
      ]
    }
  }
} as const satisfies SingleLevelExam;

export default exam;
