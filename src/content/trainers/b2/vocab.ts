import { type AdjectiveEntry, type NounEntry, type VerbEntry, type VocabBank } from '@shared/types';

import { B2_CASE_ITEMS, B2_PREP_VERBS } from './grammar.ts';

/* The B2 vocabulary bank. Ids are persisted SRS keys — never renumber existing items. */

export const B2_VERBS: readonly VerbEntry[] = [
  {
    id: 'b2.v.001',
    de: 'ablehnen',
    en: 'to reject, to turn down',
    praesens: 'lehnt ab',
    praeteritum: 'lehnte ab',
    perfekt: 'hat abgelehnt',
    example: {
      de: 'Der Betriebsrat hat den Vorschlag der Geschäftsführung einstimmig abgelehnt.',
      en: 'The works council unanimously rejected the management proposal.'
    }
  },
  {
    id: 'b2.v.002',
    de: 'abschaffen',
    en: 'to abolish',
    praesens: 'schafft ab',
    praeteritum: 'schaffte ab',
    perfekt: 'hat abgeschafft',
    example: {
      de: 'Die Regierung will die Studiengebühren abschaffen, obwohl viele Experten davor warnen.',
      en: 'The government wants to abolish tuition fees, although many experts warn against it.'
    }
  },
  {
    id: 'b2.v.003',
    de: 'abwägen',
    en: 'to weigh up, to consider carefully',
    praesens: 'wägt ab',
    praeteritum: 'wog ab',
    perfekt: 'hat abgewogen',
    example: {
      de: 'Bevor man kündigt, sollte man die Vor- und Nachteile sorgfältig gegeneinander abwägen.',
      en: 'Before resigning, you should carefully weigh the pros and cons against each other.'
    }
  },
  {
    id: 'b2.v.004',
    de: 'anerkennen',
    en: 'to recognise, to acknowledge',
    praesens: 'erkennt an',
    praeteritum: 'erkannte an',
    perfekt: 'hat anerkannt',
    example: {
      de: 'Ihr ausländischer Abschluss wurde erst nach einem langwierigen Verfahren anerkannt.',
      en: 'Her foreign degree was only recognised after a lengthy procedure.'
    }
  },
  {
    id: 'b2.v.005',
    de: 'sich anpassen',
    en: 'to adapt (to)',
    praesens: 'passt sich an',
    praeteritum: 'passte sich an',
    perfekt: 'hat sich angepasst',
    example: {
      de: 'Unternehmen, die sich nicht an den digitalen Wandel anpassen, verlieren langfristig ihre Wettbewerbsfähigkeit.',
      en: 'Companies that do not adapt to digital change lose their competitiveness in the long run.'
    }
  },
  {
    id: 'b2.v.006',
    de: 'ansteigen',
    en: 'to rise, to increase',
    praesens: 'steigt an',
    praeteritum: 'stieg an',
    perfekt: 'ist angestiegen',
    example: {
      de: 'Die Mieten in deutschen Großstädten sind in den letzten Jahren drastisch angestiegen.',
      en: 'Rents in large German cities have risen drastically in recent years.'
    }
  },
  {
    id: 'b2.v.007',
    de: 'appellieren',
    en: 'to appeal (to)',
    praesens: 'appelliert',
    praeteritum: 'appellierte',
    perfekt: 'hat appelliert',
    example: {
      de: 'Die Ministerin appellierte an die Bevölkerung, sparsamer mit Energie umzugehen.',
      en: 'The minister appealed to the population to use energy more sparingly.'
    }
  },
  {
    id: 'b2.v.008',
    de: 'auffordern',
    en: 'to call upon, to urge',
    praesens: 'fordert auf',
    praeteritum: 'forderte auf',
    perfekt: 'hat aufgefordert',
    example: {
      de: 'Die Opposition forderte die Regierung auf, den umstrittenen Gesetzentwurf zurückzuziehen.',
      en: 'The opposition called on the government to withdraw the controversial bill.'
    }
  },
  {
    id: 'b2.v.009',
    de: 'aufklären',
    en: 'to inform, to clear up',
    praesens: 'klärt auf',
    praeteritum: 'klärte auf',
    perfekt: 'hat aufgeklärt',
    example: {
      de: 'Die Kampagne soll Jugendliche über die Risiken sozialer Medien aufklären.',
      en: 'The campaign is meant to inform young people about the risks of social media.'
    }
  },
  {
    id: 'b2.v.010',
    de: 'sich auseinandersetzen',
    en: 'to engage with, to grapple with',
    praesens: 'setzt sich auseinander',
    praeteritum: 'setzte sich auseinander',
    perfekt: 'hat sich auseinandergesetzt',
    example: {
      de: 'Im Seminar setzen wir uns kritisch mit den Folgen der Globalisierung auseinander.',
      en: 'In the seminar we critically engage with the consequences of globalisation.'
    }
  },
  {
    id: 'b2.v.011',
    de: 'ausgleichen',
    en: 'to compensate for, to balance out',
    praesens: 'gleicht aus',
    praeteritum: 'glich aus',
    perfekt: 'hat ausgeglichen',
    example: {
      de: 'Der Konzern versucht, seine Emissionen durch Investitionen in Klimaprojekte auszugleichen.',
      en: 'The corporation is trying to offset its emissions by investing in climate projects.'
    }
  },
  {
    id: 'b2.v.012',
    de: 'ausschließen',
    en: 'to rule out, to exclude',
    praesens: 'schließt aus',
    praeteritum: 'schloss aus',
    perfekt: 'hat ausgeschlossen',
    example: {
      de: 'Die Polizei schließt ein technisches Versagen als Unfallursache nicht aus.',
      en: 'The police are not ruling out technical failure as the cause of the accident.'
    }
  },
  {
    id: 'b2.v.013',
    de: 'auswerten',
    en: 'to evaluate, to analyse (data)',
    praesens: 'wertet aus',
    praeteritum: 'wertete aus',
    perfekt: 'hat ausgewertet',
    example: {
      de: 'Die Daten der Studie werden derzeit von einem unabhängigen Institut ausgewertet.',
      en: 'The data from the study is currently being analysed by an independent institute.'
    }
  },
  {
    id: 'b2.v.014',
    de: 'beantragen',
    en: 'to apply for (officially)',
    praesens: 'beantragt',
    praeteritum: 'beantragte',
    perfekt: 'hat beantragt',
    example: {
      de: 'Wer Elterngeld beantragen möchte, muss zahlreiche Unterlagen bei der Behörde einreichen.',
      en: 'Anyone wishing to apply for parental allowance must submit numerous documents to the authority.'
    }
  },
  {
    id: 'b2.v.015',
    de: 'beeinträchtigen',
    en: 'to impair, to affect adversely',
    praesens: 'beeinträchtigt',
    praeteritum: 'beeinträchtigte',
    perfekt: 'hat beeinträchtigt',
    example: {
      de: 'Ständiger Lärm kann die Konzentrationsfähigkeit und die Gesundheit erheblich beeinträchtigen.',
      en: 'Constant noise can considerably impair concentration and health.'
    }
  },
  {
    id: 'b2.v.016',
    de: 'befürworten',
    en: 'to advocate, to be in favour of',
    praesens: 'befürwortet',
    praeteritum: 'befürwortete',
    perfekt: 'hat befürwortet',
    example: {
      de: 'Eine Mehrheit der Befragten befürwortet ein Tempolimit auf deutschen Autobahnen.',
      en: 'A majority of those surveyed are in favour of a speed limit on German motorways.'
    }
  },
  {
    id: 'b2.v.017',
    de: 'begründen',
    en: 'to justify, to give reasons for',
    praesens: 'begründet',
    praeteritum: 'begründete',
    perfekt: 'hat begründet',
    example: {
      de: 'Der Richter begründete das Urteil damit, dass keine ausreichenden Beweise vorlagen.',
      en: 'The judge justified the verdict by stating that there was insufficient evidence.'
    }
  },
  {
    id: 'b2.v.018',
    de: 'behaupten',
    en: 'to claim, to assert',
    praesens: 'behauptet',
    praeteritum: 'behauptete',
    perfekt: 'hat behauptet',
    example: {
      de: 'Der Angeklagte behauptet, zum Zeitpunkt der Tat im Ausland gewesen zu sein.',
      en: 'The defendant claims to have been abroad at the time of the crime.'
    }
  },
  {
    id: 'b2.v.019',
    de: 'beitragen',
    en: 'to contribute (to)',
    praesens: 'trägt bei',
    praeteritum: 'trug bei',
    perfekt: 'hat beigetragen',
    example: {
      de: 'Ehrenamtliches Engagement trägt wesentlich zum Zusammenhalt unserer Gesellschaft bei.',
      en: 'Voluntary work contributes significantly to the cohesion of our society.'
    }
  },
  {
    id: 'b2.v.020',
    de: 'belasten',
    en: 'to burden, to strain',
    praesens: 'belastet',
    praeteritum: 'belastete',
    perfekt: 'hat belastet',
    example: {
      de: 'Die steigenden Energiepreise belasten vor allem Haushalte mit geringem Einkommen.',
      en: 'Rising energy prices put a strain above all on low-income households.'
    }
  },
  {
    id: 'b2.v.021',
    de: 'sich bemühen',
    en: 'to make an effort, to strive',
    praesens: 'bemüht sich',
    praeteritum: 'bemühte sich',
    perfekt: 'hat sich bemüht',
    example: {
      de: 'Die Stadt bemüht sich seit Jahren darum, bezahlbaren Wohnraum zu schaffen.',
      en: 'The city has been making an effort for years to create affordable housing.'
    }
  },
  {
    id: 'b2.v.022',
    de: 'berücksichtigen',
    en: 'to take into account',
    praesens: 'berücksichtigt',
    praeteritum: 'berücksichtigte',
    perfekt: 'hat berücksichtigt',
    example: {
      de: 'Bei der Planung wurden die Bedürfnisse älterer Menschen leider kaum berücksichtigt.',
      en: 'Unfortunately, the needs of older people were hardly taken into account in the planning.'
    }
  },
  {
    id: 'b2.v.023',
    de: 'beruhen',
    en: 'to be based (on)',
    praesens: 'beruht',
    praeteritum: 'beruhte',
    perfekt: 'hat beruht',
    example: {
      de: 'Der Erfolg des Unternehmens beruht auf einer konsequenten Qualitätsstrategie.',
      en: 'The success of the company is based on a consistent quality strategy.'
    }
  },
  {
    id: 'b2.v.024',
    de: 'beschleunigen',
    en: 'to accelerate, to speed up',
    praesens: 'beschleunigt',
    praeteritum: 'beschleunigte',
    perfekt: 'hat beschleunigt',
    example: {
      de: 'Die Digitalisierung hat den Wandel der Arbeitswelt in vielen Branchen deutlich beschleunigt.',
      en: 'Digitalisation has clearly accelerated the transformation of the working world in many sectors.'
    }
  },
  {
    id: 'b2.v.025',
    de: 'beseitigen',
    en: 'to eliminate, to remove',
    praesens: 'beseitigt',
    praeteritum: 'beseitigte',
    perfekt: 'hat beseitigt',
    example: {
      de: 'Die Ursachen der Krise lassen sich nicht von heute auf morgen beseitigen.',
      en: 'The causes of the crisis cannot be eliminated overnight.'
    }
  },
  {
    id: 'b2.v.026',
    de: 'bestreiten',
    en: 'to deny, to dispute',
    praesens: 'bestreitet',
    praeteritum: 'bestritt',
    perfekt: 'hat bestritten',
    example: {
      de: 'Der Konzern bestreitet, von den Manipulationen an den Abgaswerten gewusst zu haben.',
      en: 'The corporation denies having known about the manipulation of the emission values.'
    }
  },
  {
    id: 'b2.v.027',
    de: 'betonen',
    en: 'to emphasise, to stress',
    praesens: 'betont',
    praeteritum: 'betonte',
    perfekt: 'hat betont',
    example: {
      de: 'Die Expertin betonte, dass Prävention wirksamer sei als jede spätere Behandlung.',
      en: 'The expert emphasised that prevention is more effective than any later treatment.'
    }
  },
  {
    id: 'b2.v.028',
    de: 'beurteilen',
    en: 'to assess, to judge',
    praesens: 'beurteilt',
    praeteritum: 'beurteilte',
    perfekt: 'hat beurteilt',
    example: {
      de: 'Ob sich die Investition lohnt, lässt sich zum jetzigen Zeitpunkt schwer beurteilen.',
      en: 'Whether the investment will pay off is difficult to assess at this point in time.'
    }
  },
  {
    id: 'b2.v.029',
    de: 'bevorzugen',
    en: 'to prefer, to favour',
    praesens: 'bevorzugt',
    praeteritum: 'bevorzugte',
    perfekt: 'hat bevorzugt',
    example: {
      de: 'Immer mehr Verbraucher bevorzugen regionale Produkte, obwohl diese häufig teurer sind.',
      en: 'More and more consumers prefer regional products, even though they are often more expensive.'
    }
  },
  {
    id: 'b2.v.030',
    de: 'sich bewähren',
    en: 'to prove itself, to stand the test',
    praesens: 'bewährt sich',
    praeteritum: 'bewährte sich',
    perfekt: 'hat sich bewährt',
    example: {
      de: 'Das neue Verfahren hat sich in der Praxis bereits mehrfach bewährt.',
      en: 'The new procedure has already proven itself several times in practice.'
    }
  },
  {
    id: 'b2.v.031',
    de: 'bewältigen',
    en: 'to cope with, to master',
    praesens: 'bewältigt',
    praeteritum: 'bewältigte',
    perfekt: 'hat bewältigt',
    example: {
      de: 'Viele Alleinerziehende bewältigen den Alltag nur mit Unterstützung ihrer Familie.',
      en: 'Many single parents only manage everyday life with the support of their family.'
    }
  },
  {
    id: 'b2.v.032',
    de: 'sich beziehen',
    en: 'to refer (to)',
    praesens: 'bezieht sich',
    praeteritum: 'bezog sich',
    perfekt: 'hat sich bezogen',
    example: {
      de: 'In seinem Vortrag bezog sich der Redner auf eine aktuelle Studie zur Mediennutzung.',
      en: 'In his lecture, the speaker referred to a recent study on media use.'
    }
  },
  {
    id: 'b2.v.033',
    de: 'bezweifeln',
    en: 'to doubt',
    praesens: 'bezweifelt',
    praeteritum: 'bezweifelte',
    perfekt: 'hat bezweifelt',
    example: {
      de: 'Viele Ökonomen bezweifeln, dass die geplante Steuerreform die erhoffte Wirkung erzielt.',
      en: 'Many economists doubt that the planned tax reform will achieve the hoped-for effect.'
    }
  },
  {
    id: 'b2.v.034',
    de: 'sich durchsetzen',
    en: 'to prevail, to assert oneself',
    praesens: 'setzt sich durch',
    praeteritum: 'setzte sich durch',
    perfekt: 'hat sich durchgesetzt',
    example: {
      de: 'Am Ende setzte sich die Bewerberin mit der überzeugendsten Präsentation durch.',
      en: 'In the end, the applicant with the most convincing presentation prevailed.'
    }
  },
  {
    id: 'b2.v.035',
    de: 'sich einigen',
    en: 'to come to an agreement (on)',
    praesens: 'einigt sich',
    praeteritum: 'einigte sich',
    perfekt: 'hat sich geeinigt',
    example: {
      de: 'Nach zähen Verhandlungen einigten sich die Tarifparteien auf eine Lohnerhöhung von vier Prozent.',
      en: 'After tough negotiations, the collective bargaining parties agreed on a wage increase of four percent.'
    }
  },
  {
    id: 'b2.v.036',
    de: 'einschätzen',
    en: 'to assess, to estimate',
    praesens: 'schätzt ein',
    praeteritum: 'schätzte ein',
    perfekt: 'hat eingeschätzt',
    example: {
      de: 'Fachleute schätzen die Lage auf dem Arbeitsmarkt derzeit vorsichtig optimistisch ein.',
      en: 'Experts currently assess the situation on the labour market with cautious optimism.'
    }
  },
  {
    id: 'b2.v.037',
    de: 'sich einsetzen',
    en: 'to campaign for, to stand up for',
    praesens: 'setzt sich ein',
    praeteritum: 'setzte sich ein',
    perfekt: 'hat sich eingesetzt',
    example: {
      de: 'Die Organisation setzt sich seit Jahrzehnten für die Rechte von Minderheiten ein.',
      en: 'The organisation has been campaigning for the rights of minorities for decades.'
    }
  },
  {
    id: 'b2.v.038',
    de: 'entlassen',
    en: 'to dismiss, to lay off',
    praesens: 'entlässt',
    praeteritum: 'entließ',
    perfekt: 'hat entlassen',
    example: {
      de: 'Wegen der schlechten Auftragslage mussten mehrere hundert Beschäftigte entlassen werden.',
      en: 'Due to the poor order situation, several hundred employees had to be laid off.'
    }
  },
  {
    id: 'b2.v.039',
    de: 'sich erkundigen',
    en: 'to inquire (about)',
    praesens: 'erkundigt sich',
    praeteritum: 'erkundigte sich',
    perfekt: 'hat sich erkundigt',
    example: {
      de: 'Er erkundigte sich bei der Personalabteilung nach den Aufstiegsmöglichkeiten im Unternehmen.',
      en: 'He inquired with the HR department about promotion opportunities within the company.'
    }
  },
  {
    id: 'b2.v.040',
    de: 'erläutern',
    en: 'to explain in detail',
    praesens: 'erläutert',
    praeteritum: 'erläuterte',
    perfekt: 'hat erläutert',
    example: {
      de: 'Die Professorin erläuterte anhand mehrerer Beispiele, wie das Modell funktioniert.',
      en: 'The professor explained how the model works using several examples.'
    }
  },
  {
    id: 'b2.v.041',
    de: 'ermitteln',
    en: 'to determine, to investigate',
    praesens: 'ermittelt',
    praeteritum: 'ermittelte',
    perfekt: 'hat ermittelt',
    example: {
      de: 'Die Staatsanwaltschaft ermittelt gegen mehrere Manager wegen des Verdachts auf Betrug.',
      en: 'The public prosecutor is investigating several managers on suspicion of fraud.'
    }
  },
  {
    id: 'b2.v.042',
    de: 'ermöglichen',
    en: 'to enable, to make possible',
    praesens: 'ermöglicht',
    praeteritum: 'ermöglichte',
    perfekt: 'hat ermöglicht',
    example: {
      de: 'Das Stipendium ermöglichte ihr ein Studium, das sie sich sonst nicht hätte leisten können.',
      en: 'The scholarship enabled her to study, which she otherwise could not have afforded.'
    }
  },
  {
    id: 'b2.v.043',
    de: 'erwerben',
    en: 'to acquire, to gain',
    praesens: 'erwirbt',
    praeteritum: 'erwarb',
    perfekt: 'hat erworben',
    example: {
      de: 'Während des Praktikums erwarb sie wertvolle Kenntnisse im Projektmanagement.',
      en: 'During the internship she acquired valuable knowledge of project management.'
    }
  },
  {
    id: 'b2.v.044',
    de: 'erzielen',
    en: 'to achieve, to obtain',
    praesens: 'erzielt',
    praeteritum: 'erzielte',
    perfekt: 'hat erzielt',
    example: {
      de: 'Trotz der Krise erzielte das Unternehmen im vergangenen Jahr einen Rekordgewinn.',
      en: 'Despite the crisis, the company achieved a record profit last year.'
    }
  },
  {
    id: 'b2.v.045',
    de: 'festlegen',
    en: 'to determine, to stipulate',
    praesens: 'legt fest',
    praeteritum: 'legte fest',
    perfekt: 'hat festgelegt',
    example: {
      de: 'Im Vertrag wird genau festgelegt, welche Pflichten beide Seiten übernehmen.',
      en: 'The contract stipulates exactly which obligations both sides assume.'
    }
  },
  {
    id: 'b2.v.046',
    de: 'finanzieren',
    en: 'to finance, to fund',
    praesens: 'finanziert',
    praeteritum: 'finanzierte',
    perfekt: 'hat finanziert',
    example: {
      de: 'Das Forschungsprojekt wird überwiegend aus öffentlichen Mitteln finanziert.',
      en: 'The research project is largely funded from public money.'
    }
  },
  {
    id: 'b2.v.047',
    de: 'folgern',
    en: 'to conclude, to infer',
    praesens: 'folgert',
    praeteritum: 'folgerte',
    perfekt: 'hat gefolgert',
    example: {
      de: 'Aus den Ergebnissen lässt sich folgern, dass das Medikament gut verträglich ist.',
      en: 'From the results it can be concluded that the medication is well tolerated.'
    }
  },
  {
    id: 'b2.v.048',
    de: 'fordern',
    en: 'to demand',
    praesens: 'fordert',
    praeteritum: 'forderte',
    perfekt: 'hat gefordert',
    example: {
      de: 'Die Gewerkschaft fordert höhere Löhne und bessere Arbeitsbedingungen für das Pflegepersonal.',
      en: 'The union is demanding higher wages and better working conditions for nursing staff.'
    }
  },
  {
    id: 'b2.v.049',
    de: 'fördern',
    en: 'to promote, to subsidise',
    praesens: 'fördert',
    praeteritum: 'förderte',
    perfekt: 'hat gefördert',
    example: {
      de: 'Der Staat fördert den Ausbau erneuerbarer Energien mit erheblichen Summen.',
      en: 'The state is promoting the expansion of renewable energies with considerable sums.'
    }
  },
  {
    id: 'b2.v.050',
    de: 'gefährden',
    en: 'to endanger, to jeopardise',
    praesens: 'gefährdet',
    praeteritum: 'gefährdete',
    perfekt: 'hat gefährdet',
    example: {
      de: 'Der Klimawandel gefährdet die Lebensgrundlagen von Millionen Menschen weltweit.',
      en: 'Climate change endangers the livelihoods of millions of people worldwide.'
    }
  },
  {
    id: 'b2.v.051',
    de: 'gestalten',
    en: 'to shape, to design',
    praesens: 'gestaltet',
    praeteritum: 'gestaltete',
    perfekt: 'hat gestaltet',
    example: {
      de: 'Die Beschäftigten dürfen ihre Arbeitszeiten künftig deutlich flexibler gestalten.',
      en: 'In future, employees will be allowed to organise their working hours much more flexibly.'
    }
  },
  {
    id: 'b2.v.052',
    de: 'gewährleisten',
    en: 'to guarantee, to ensure',
    praesens: 'gewährleistet',
    praeteritum: 'gewährleistete',
    perfekt: 'hat gewährleistet',
    example: {
      de: 'Der Betreiber muss gewährleisten, dass die persönlichen Daten sicher gespeichert werden.',
      en: 'The operator must ensure that personal data is stored securely.'
    }
  },
  {
    id: 'b2.v.053',
    de: 'hinterfragen',
    en: 'to question critically',
    praesens: 'hinterfragt',
    praeteritum: 'hinterfragte',
    perfekt: 'hat hinterfragt',
    example: {
      de: 'Man sollte Informationen aus dem Internet stets kritisch hinterfragen, bevor man sie teilt.',
      en: 'You should always critically question information from the internet before sharing it.'
    }
  },
  {
    id: 'b2.v.054',
    de: 'kündigen',
    en: 'to resign, to give notice',
    praesens: 'kündigt',
    praeteritum: 'kündigte',
    perfekt: 'hat gekündigt',
    example: {
      de: 'Nach dem Streit mit ihrem Vorgesetzten hat sie ihre Stelle fristgerecht gekündigt.',
      en: 'After the argument with her superior, she duly resigned from her position.'
    }
  },
  {
    id: 'b2.v.055',
    de: 'nachvollziehen',
    en: 'to comprehend, to relate to',
    praesens: 'vollzieht nach',
    praeteritum: 'vollzog nach',
    perfekt: 'hat nachvollzogen',
    example: {
      de: 'Ich kann gut nachvollziehen, warum viele Beschäftigte im Homeoffice bleiben möchten.',
      en: 'I can well understand why many employees want to keep working from home.'
    }
  },
  {
    id: 'b2.v.056',
    de: 'nachweisen',
    en: 'to prove, to demonstrate',
    praesens: 'weist nach',
    praeteritum: 'wies nach',
    perfekt: 'hat nachgewiesen',
    example: {
      de: 'Die Studie weist nach, dass regelmäßige Bewegung das Risiko für Herzkrankheiten senkt.',
      en: 'The study proves that regular exercise lowers the risk of heart disease.'
    }
  },
  {
    id: 'b2.v.057',
    de: 'prägen',
    en: 'to shape, to leave a mark on',
    praesens: 'prägt',
    praeteritum: 'prägte',
    perfekt: 'hat geprägt',
    example: {
      de: 'Die Erfahrungen der Kindheit prägen unser Verhalten oft ein Leben lang.',
      en: 'Childhood experiences often shape our behaviour for a lifetime.'
    }
  },
  {
    id: 'b2.v.058',
    de: 'profitieren',
    en: 'to benefit (from)',
    praesens: 'profitiert',
    praeteritum: 'profitierte',
    perfekt: 'hat profitiert',
    example: {
      de: 'Vor allem größere Unternehmen profitieren von den neuen steuerlichen Regelungen.',
      en: 'Larger companies in particular benefit from the new tax regulations.'
    }
  },
  {
    id: 'b2.v.059',
    de: 'recherchieren',
    en: 'to research, to investigate',
    praesens: 'recherchiert',
    praeteritum: 'recherchierte',
    perfekt: 'hat recherchiert',
    example: {
      de: 'Die Journalistin recherchierte monatelang, bevor sie den Skandal öffentlich machte.',
      en: 'The journalist researched for months before she made the scandal public.'
    }
  },
  {
    id: 'b2.v.060',
    de: 'rechtfertigen',
    en: 'to justify',
    praesens: 'rechtfertigt',
    praeteritum: 'rechtfertigte',
    perfekt: 'hat gerechtfertigt',
    example: {
      de: 'Der Minister musste sich vor dem Parlament für die hohen Kosten des Projekts rechtfertigen.',
      en: 'The minister had to justify the high costs of the project before parliament.'
    }
  },
  {
    id: 'b2.v.061',
    de: 'reduzieren',
    en: 'to reduce',
    praesens: 'reduziert',
    praeteritum: 'reduzierte',
    perfekt: 'hat reduziert',
    example: {
      de: 'Die Stadt will den Autoverkehr in der Innenstadt in den kommenden Jahren deutlich reduzieren.',
      en: 'The city wants to significantly reduce car traffic in the city centre in the coming years.'
    }
  },
  {
    id: 'b2.v.062',
    de: 'scheitern',
    en: 'to fail',
    praesens: 'scheitert',
    praeteritum: 'scheiterte',
    perfekt: 'ist gescheitert',
    example: {
      de: 'Die Verhandlungen scheiterten letztlich daran, dass keine Seite nachgeben wollte.',
      en: 'The negotiations ultimately failed because neither side was willing to give in.'
    }
  },
  {
    id: 'b2.v.063',
    de: 'stammen',
    en: 'to originate, to come (from)',
    praesens: 'stammt',
    praeteritum: 'stammte',
    perfekt: 'hat gestammt',
    example: {
      de: 'Ein Großteil der Rohstoffe stammt aus Ländern mit fragwürdigen Arbeitsbedingungen.',
      en: 'A large proportion of the raw materials comes from countries with questionable working conditions.'
    }
  },
  {
    id: 'b2.v.064',
    de: 'streben',
    en: 'to strive (for)',
    praesens: 'strebt',
    praeteritum: 'strebte',
    perfekt: 'hat gestrebt',
    example: {
      de: 'Das Unternehmen strebt danach, bis 2035 vollständig klimaneutral zu wirtschaften.',
      en: 'The company is striving to operate completely climate-neutrally by 2035.'
    }
  },
  {
    id: 'b2.v.065',
    de: 'thematisieren',
    en: 'to address (a topic)',
    praesens: 'thematisiert',
    praeteritum: 'thematisierte',
    perfekt: 'hat thematisiert',
    example: {
      de: 'Der preisgekrönte Film thematisiert die Einsamkeit älterer Menschen in Großstädten.',
      en: 'The award-winning film addresses the loneliness of elderly people in big cities.'
    }
  },
  {
    id: 'b2.v.066',
    de: 'übertragen',
    en: 'to broadcast, to transfer',
    praesens: 'überträgt',
    praeteritum: 'übertrug',
    perfekt: 'hat übertragen',
    example: {
      de: 'Die Debatte im Bundestag wird heute Abend live im Fernsehen übertragen.',
      en: 'The debate in the Bundestag will be broadcast live on television this evening.'
    }
  },
  {
    id: 'b2.v.067',
    de: 'überwinden',
    en: 'to overcome',
    praesens: 'überwindet',
    praeteritum: 'überwand',
    perfekt: 'hat überwunden',
    example: {
      de: 'Mit professioneller Hilfe hat er seine Prüfungsangst schließlich überwunden.',
      en: 'With professional help, he finally overcame his exam anxiety.'
    }
  },
  {
    id: 'b2.v.068',
    de: 'überzeugen',
    en: 'to convince',
    praesens: 'überzeugt',
    praeteritum: 'überzeugte',
    perfekt: 'hat überzeugt',
    example: {
      de: 'Die Bewerberin überzeugte die Jury mit einem durchdachten und originellen Konzept.',
      en: 'The applicant convinced the jury with a well-thought-out and original concept.'
    }
  },
  {
    id: 'b2.v.069',
    de: 'umsetzen',
    en: 'to implement, to put into practice',
    praesens: 'setzt um',
    praeteritum: 'setzte um',
    perfekt: 'hat umgesetzt',
    example: {
      de: 'Die Reform wurde zwar beschlossen, aber bis heute nur teilweise umgesetzt.',
      en: 'The reform was indeed passed, but to this day it has only been partially implemented.'
    }
  },
  {
    id: 'b2.v.070',
    de: 'unterschätzen',
    en: 'to underestimate',
    praesens: 'unterschätzt',
    praeteritum: 'unterschätzte',
    perfekt: 'hat unterschätzt',
    example: {
      de: 'Viele unterschätzen, wie viel Zeit die Pflege eines Angehörigen in Anspruch nimmt.',
      en: 'Many people underestimate how much time caring for a relative takes up.'
    }
  },
  {
    id: 'b2.v.071',
    de: 'veranlassen',
    en: 'to arrange for, to prompt',
    praesens: 'veranlasst',
    praeteritum: 'veranlasste',
    perfekt: 'hat veranlasst',
    example: {
      de: 'Die Behörde veranlasste eine gründliche Überprüfung sämtlicher Sicherheitsvorkehrungen im Werk.',
      en: 'The authority arranged for a thorough review of all safety precautions at the plant.'
    }
  },
  {
    id: 'b2.v.072',
    de: 'verarbeiten',
    en: 'to process',
    praesens: 'verarbeitet',
    praeteritum: 'verarbeitete',
    perfekt: 'hat verarbeitet',
    example: {
      de: 'Die App verarbeitet persönliche Daten, ohne die Nutzer ausreichend darüber zu informieren.',
      en: 'The app processes personal data without sufficiently informing users about it.'
    }
  },
  {
    id: 'b2.v.073',
    de: 'verdrängen',
    en: 'to displace, to push out',
    praesens: 'verdrängt',
    praeteritum: 'verdrängte',
    perfekt: 'hat verdrängt',
    example: {
      de: 'Große Ketten verdrängen zunehmend die kleinen Läden aus den Innenstädten.',
      en: 'Large chains are increasingly pushing small shops out of city centres.'
    }
  },
  {
    id: 'b2.v.074',
    de: 'vereinbaren',
    en: 'to agree on, to reconcile',
    praesens: 'vereinbart',
    praeteritum: 'vereinbarte',
    perfekt: 'hat vereinbart',
    example: {
      de: 'Beruf und Familie lassen sich nur schwer vereinbaren, wenn Betreuungsplätze fehlen.',
      en: 'Work and family are difficult to reconcile when childcare places are lacking.'
    }
  },
  {
    id: 'b2.v.075',
    de: 'verfassen',
    en: 'to write, to compose',
    praesens: 'verfasst',
    praeteritum: 'verfasste',
    perfekt: 'hat verfasst',
    example: {
      de: 'Für die Bewerbung müssen Sie ein aussagekräftiges Motivationsschreiben verfassen.',
      en: 'For the application you have to write a convincing letter of motivation.'
    }
  },
  {
    id: 'b2.v.076',
    de: 'verfügen',
    en: "to have at one's disposal",
    praesens: 'verfügt',
    praeteritum: 'verfügte',
    perfekt: 'hat verfügt',
    example: {
      de: 'Die Bewerberin verfügt über langjährige Erfahrung im internationalen Vertrieb.',
      en: 'The applicant has many years of experience in international sales.'
    }
  },
  {
    id: 'b2.v.077',
    de: 'verhandeln',
    en: 'to negotiate',
    praesens: 'verhandelt',
    praeteritum: 'verhandelte',
    perfekt: 'hat verhandelt',
    example: {
      de: 'Die beiden Konzerne verhandeln seit Monaten über eine mögliche Fusion.',
      en: 'The two corporations have been negotiating a possible merger for months.'
    }
  },
  {
    id: 'b2.v.078',
    de: 'vermeiden',
    en: 'to avoid',
    praesens: 'vermeidet',
    praeteritum: 'vermied',
    perfekt: 'hat vermieden',
    example: {
      de: 'Wer Verpackungsmüll vermeiden will, kauft am besten unverpackte Lebensmittel ein.',
      en: 'Anyone who wants to avoid packaging waste is best off buying unpackaged food.'
    }
  },
  {
    id: 'b2.v.079',
    de: 'vermitteln',
    en: 'to convey, to impart',
    praesens: 'vermittelt',
    praeteritum: 'vermittelte',
    perfekt: 'hat vermittelt',
    example: {
      de: 'Die Schule soll nicht nur Wissen, sondern auch soziale Kompetenzen vermitteln.',
      en: 'School should impart not only knowledge but also social skills.'
    }
  },
  {
    id: 'b2.v.080',
    de: 'vernachlässigen',
    en: 'to neglect',
    praesens: 'vernachlässigt',
    praeteritum: 'vernachlässigte',
    perfekt: 'hat vernachlässigt',
    example: {
      de: 'Wer beruflich stark eingespannt ist, vernachlässigt häufig seine sozialen Kontakte.',
      en: 'People who are very busy at work often neglect their social contacts.'
    }
  },
  {
    id: 'b2.v.081',
    de: 'veröffentlichen',
    en: 'to publish',
    praesens: 'veröffentlicht',
    praeteritum: 'veröffentlichte',
    perfekt: 'hat veröffentlicht',
    example: {
      de: 'Die Ergebnisse der Untersuchung wurden in einer renommierten Fachzeitschrift veröffentlicht.',
      en: 'The results of the investigation were published in a renowned specialist journal.'
    }
  },
  {
    id: 'b2.v.082',
    de: 'sich verpflichten',
    en: 'to commit oneself (to)',
    praesens: 'verpflichtet sich',
    praeteritum: 'verpflichtete sich',
    perfekt: 'hat sich verpflichtet',
    example: {
      de: 'Der Konzern hat sich verpflichtet, seine Lieferketten regelmäßig kontrollieren zu lassen.',
      en: 'The corporation has committed itself to having its supply chains checked regularly.'
    }
  },
  {
    id: 'b2.v.083',
    de: 'verringern',
    en: 'to reduce, to decrease',
    praesens: 'verringert',
    praeteritum: 'verringerte',
    perfekt: 'hat verringert',
    example: {
      de: 'Durch das neue Sicherheitskonzept konnte die Zahl der Unfälle deutlich verringert werden.',
      en: 'Thanks to the new safety concept, the number of accidents could be significantly reduced.'
    }
  },
  {
    id: 'b2.v.084',
    de: 'verschärfen',
    en: 'to tighten, to intensify',
    praesens: 'verschärft',
    praeteritum: 'verschärfte',
    perfekt: 'hat verschärft',
    example: {
      de: 'Als Reaktion auf die Vorfälle wurden die Sicherheitsgesetze weiter verschärft.',
      en: 'In response to the incidents, the security laws were tightened further.'
    }
  },
  {
    id: 'b2.v.085',
    de: 'vertreten',
    en: 'to represent, to hold (an opinion)',
    praesens: 'vertritt',
    praeteritum: 'vertrat',
    perfekt: 'hat vertreten',
    example: {
      de: 'Die Anwältin vertritt die Interessen der Beschäftigten vor dem Arbeitsgericht.',
      en: 'The lawyer represents the interests of the employees before the labour court.'
    }
  },
  {
    id: 'b2.v.086',
    de: 'verursachen',
    en: 'to cause',
    praesens: 'verursacht',
    praeteritum: 'verursachte',
    perfekt: 'hat verursacht',
    example: {
      de: 'Der Straßenverkehr verursacht einen erheblichen Teil der Luftverschmutzung in den Städten.',
      en: 'Road traffic causes a considerable proportion of the air pollution in cities.'
    }
  },
  {
    id: 'b2.v.087',
    de: 'verwirklichen',
    en: 'to realise (a plan or dream)',
    praesens: 'verwirklicht',
    praeteritum: 'verwirklichte',
    perfekt: 'hat verwirklicht',
    example: {
      de: 'Mit der eigenen Praxis hat sie sich einen lang gehegten Traum verwirklicht.',
      en: 'With her own practice, she has realised a long-cherished dream.'
    }
  },
  {
    id: 'b2.v.088',
    de: 'verzeichnen',
    en: 'to record, to register',
    praesens: 'verzeichnet',
    praeteritum: 'verzeichnete',
    perfekt: 'hat verzeichnet',
    example: {
      de: 'Die Branche verzeichnete im vergangenen Quartal einen spürbaren Rückgang der Aufträge.',
      en: 'The sector recorded a noticeable decline in orders in the past quarter.'
    }
  },
  {
    id: 'b2.v.089',
    de: 'verzichten',
    en: 'to do without, to forgo',
    praesens: 'verzichtet',
    praeteritum: 'verzichtete',
    perfekt: 'hat verzichtet',
    example: {
      de: 'Immer mehr Menschen verzichten aus ökologischen Gründen bewusst auf Flugreisen.',
      en: 'More and more people deliberately forgo air travel for ecological reasons.'
    }
  },
  {
    id: 'b2.v.090',
    de: 'voraussetzen',
    en: 'to require, to presuppose',
    praesens: 'setzt voraus',
    praeteritum: 'setzte voraus',
    perfekt: 'hat vorausgesetzt',
    example: {
      de: 'Die Stelle setzt voraus, dass Bewerber verhandlungssicheres Englisch beherrschen.',
      en: 'The position requires applicants to have a business-fluent command of English.'
    }
  },
  {
    id: 'b2.v.091',
    de: 'vorbeugen',
    en: 'to prevent, to guard against',
    praesens: 'beugt vor',
    praeteritum: 'beugte vor',
    perfekt: 'hat vorgebeugt',
    example: {
      de: 'Eine ausgewogene Ernährung kann vielen chronischen Krankheiten wirksam vorbeugen.',
      en: 'A balanced diet can effectively prevent many chronic diseases.'
    }
  },
  {
    id: 'b2.v.092',
    de: 'vorschreiben',
    en: 'to prescribe, to stipulate',
    praesens: 'schreibt vor',
    praeteritum: 'schrieb vor',
    perfekt: 'hat vorgeschrieben',
    example: {
      de: 'Das Gesetz schreibt vor, dass Überstunden gesondert vergütet werden müssen.',
      en: 'The law stipulates that overtime must be remunerated separately.'
    }
  },
  {
    id: 'b2.v.093',
    de: 'wahrnehmen',
    en: 'to perceive, to make use of',
    praesens: 'nimmt wahr',
    praeteritum: 'nahm wahr',
    perfekt: 'hat wahrgenommen',
    example: {
      de: 'Viele Bürger nehmen die Möglichkeit, sich politisch zu beteiligen, kaum wahr.',
      en: 'Many citizens hardly make use of the opportunity to participate politically.'
    }
  },
  {
    id: 'b2.v.094',
    de: 'sich weigern',
    en: 'to refuse',
    praesens: 'weigert sich',
    praeteritum: 'weigerte sich',
    perfekt: 'hat sich geweigert',
    example: {
      de: 'Der Mieter weigert sich, die angekündigte Mieterhöhung zu akzeptieren.',
      en: 'The tenant refuses to accept the announced rent increase.'
    }
  },
  {
    id: 'b2.v.095',
    de: 'sich wenden',
    en: 'to turn (to someone)',
    praesens: 'wendet sich',
    praeteritum: 'wandte sich',
    perfekt: 'hat sich gewandt',
    example: {
      de: 'Bei Problemen mit dem Arbeitgeber können Sie sich jederzeit an den Betriebsrat wenden.',
      en: 'If you have problems with your employer, you can turn to the works council at any time.'
    }
  },
  {
    id: 'b2.v.096',
    de: 'widersprechen',
    en: 'to contradict, to object',
    praesens: 'widerspricht',
    praeteritum: 'widersprach',
    perfekt: 'hat widersprochen',
    example: {
      de: 'Die Wissenschaftlerin widersprach der These, dass Digitalisierung zwangsläufig Arbeitsplätze vernichtet.',
      en: 'The scientist contradicted the thesis that digitalisation inevitably destroys jobs.'
    }
  },
  {
    id: 'b2.v.097',
    de: 'zurückführen',
    en: 'to attribute (to)',
    praesens: 'führt zurück',
    praeteritum: 'führte zurück',
    perfekt: 'hat zurückgeführt',
    example: {
      de: 'Experten führen den Anstieg der Preise vor allem auf gestörte Lieferketten zurück.',
      en: 'Experts attribute the rise in prices mainly to disrupted supply chains.'
    }
  },
  {
    id: 'b2.v.098',
    de: 'zusammenfassen',
    en: 'to summarise',
    praesens: 'fasst zusammen',
    praeteritum: 'fasste zusammen',
    perfekt: 'hat zusammengefasst',
    example: {
      de: 'Fassen Sie die wichtigsten Argumente des Textes in eigenen Worten zusammen.',
      en: 'Summarise the most important arguments of the text in your own words.'
    }
  },
  {
    id: 'b2.v.099',
    de: 'zutreffen',
    en: 'to be accurate, to apply',
    praesens: 'trifft zu',
    praeteritum: 'traf zu',
    perfekt: 'hat zugetroffen',
    example: {
      de: 'Die Vorwürfe treffen nach Angaben des Unternehmens in keinem einzigen Punkt zu.',
      en: 'According to the company, the accusations are not accurate on a single point.'
    }
  },
  {
    id: 'b2.v.100',
    de: 'sich engagieren',
    en: 'to get involved, to volunteer',
    praesens: 'engagiert sich',
    praeteritum: 'engagierte sich',
    perfekt: 'hat sich engagiert',
    example: {
      de: 'Immer weniger junge Menschen engagieren sich dauerhaft in Vereinen oder Parteien.',
      en: 'Fewer and fewer young people get involved in clubs or political parties on a lasting basis.'
    }
  }
];

export const B2_NOUNS: readonly NounEntry[] = [
  {
    id: 'b2.n.001',
    de: 'Voraussetzung',
    en: 'prerequisite, requirement',
    article: 'die',
    plural: 'die Voraussetzungen',
    example: {
      de: 'Gute Englischkenntnisse sind eine wichtige Voraussetzung für diese Position im internationalen Vertrieb.',
      en: 'A good command of English is an important prerequisite for this position in international sales.'
    }
  },
  {
    id: 'b2.n.002',
    de: 'Herausforderung',
    en: 'challenge',
    article: 'die',
    plural: 'die Herausforderungen',
    example: {
      de: 'Der Fachkräftemangel stellt viele Betriebe vor große Herausforderungen.',
      en: 'The shortage of skilled workers presents many companies with major challenges.'
    }
  },
  {
    id: 'b2.n.003',
    de: 'Anforderung',
    en: 'requirement, demand',
    article: 'die',
    plural: 'die Anforderungen',
    example: {
      de: 'Die Anforderungen an Berufseinsteiger sind in den letzten Jahren deutlich gestiegen.',
      en: 'The demands placed on career starters have risen considerably in recent years.'
    }
  },
  {
    id: 'b2.n.004',
    de: 'Kündigung',
    en: 'dismissal, notice of termination',
    article: 'die',
    plural: 'die Kündigungen',
    example: {
      de: 'Nach der Kündigung stand er plötzlich ohne Einkommen und ohne Perspektive da.',
      en: 'After the dismissal he was suddenly left without an income and without prospects.'
    }
  },
  {
    id: 'b2.n.005',
    de: 'Arbeitgeber',
    en: 'employer',
    article: 'der',
    plural: 'die Arbeitgeber',
    example: {
      de: 'Viele Arbeitgeber bieten inzwischen flexible Arbeitsmodelle an, um Fachkräfte zu gewinnen.',
      en: 'Many employers now offer flexible working models in order to attract skilled workers.'
    }
  },
  {
    id: 'b2.n.006',
    de: 'Arbeitnehmer',
    en: 'employee',
    article: 'der',
    plural: 'die Arbeitnehmer',
    example: {
      de: 'Arbeitnehmer haben das Recht, sich in Gewerkschaften zu organisieren.',
      en: 'Employees have the right to organise themselves in trade unions.'
    }
  },
  {
    id: 'b2.n.007',
    de: 'Führungskraft',
    en: 'manager, executive',
    article: 'die',
    plural: 'die Führungskräfte',
    example: {
      de: 'Von Führungskräften wird erwartet, dass sie Verantwortung für ihr Team übernehmen.',
      en: 'Managers are expected to take responsibility for their team.'
    }
  },
  {
    id: 'b2.n.008',
    de: 'Betriebsrat',
    en: 'works council',
    article: 'der',
    plural: 'die Betriebsräte',
    example: {
      de: 'Der Betriebsrat hat der geplanten Verlängerung der Arbeitszeiten widersprochen.',
      en: 'The works council objected to the planned extension of working hours.'
    }
  },
  {
    id: 'b2.n.009',
    de: 'Weiterbildung',
    en: 'further training, professional development',
    article: 'die',
    plural: 'die Weiterbildungen',
    example: {
      de: 'Wer im Beruf mithalten will, kommt um regelmäßige Weiterbildung nicht herum.',
      en: 'Anyone who wants to keep up professionally cannot avoid regular further training.'
    }
  },
  {
    id: 'b2.n.010',
    de: 'Qualifikation',
    en: 'qualification',
    article: 'die',
    plural: 'die Qualifikationen',
    example: {
      de: 'Für die ausgeschriebene Stelle fehlt ihm schlicht die erforderliche Qualifikation.',
      en: 'He simply lacks the necessary qualification for the advertised position.'
    }
  },
  {
    id: 'b2.n.011',
    de: 'Fähigkeit',
    en: 'ability, skill',
    article: 'die',
    plural: 'die Fähigkeiten',
    example: {
      de: 'Die Fähigkeit, im Team zu arbeiten, wird in fast jeder Stellenanzeige verlangt.',
      en: 'The ability to work in a team is demanded in almost every job advertisement.'
    }
  },
  {
    id: 'b2.n.012',
    de: 'Vergütung',
    en: 'remuneration, pay',
    article: 'die',
    plural: 'die Vergütungen',
    example: {
      de: 'Die Vergütung richtet sich nach der Berufserfahrung und der jeweiligen Tarifgruppe.',
      en: 'The remuneration depends on professional experience and the respective pay grade.'
    }
  },
  {
    id: 'b2.n.013',
    de: 'Belastung',
    en: 'burden, strain',
    article: 'die',
    plural: 'die Belastungen',
    example: {
      de: 'Die ständige Erreichbarkeit empfinden viele Beschäftigte als erhebliche Belastung.',
      en: 'Many employees perceive constant availability as a considerable strain.'
    }
  },
  {
    id: 'b2.n.014',
    de: 'Vereinbarkeit',
    en: 'compatibility (e.g. of work and family)',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Vereinbarkeit von Beruf und Familie bleibt für viele Eltern ein ungelöstes Problem.',
      en: 'Reconciling work and family remains an unsolved problem for many parents.'
    }
  },
  {
    id: 'b2.n.015',
    de: 'Frist',
    en: 'deadline, time limit',
    article: 'die',
    plural: 'die Fristen',
    example: {
      de: 'Bitte beachten Sie, dass die Frist für den Widerspruch vier Wochen beträgt.',
      en: 'Please note that the deadline for lodging an objection is four weeks.'
    }
  },
  {
    id: 'b2.n.016',
    de: 'Vertrag',
    en: 'contract',
    article: 'der',
    plural: 'die Verträge',
    example: {
      de: 'Lesen Sie den Vertrag gründlich durch, bevor Sie ihn unterschreiben.',
      en: 'Read the contract thoroughly before you sign it.'
    }
  },
  {
    id: 'b2.n.017',
    de: 'Verhandlung',
    en: 'negotiation',
    article: 'die',
    plural: 'die Verhandlungen',
    example: {
      de: 'Die Verhandlungen über den neuen Tarifvertrag wurden gestern ergebnislos abgebrochen.',
      en: 'The negotiations on the new collective agreement were broken off yesterday without a result.'
    }
  },
  {
    id: 'b2.n.018',
    de: 'Entlassung',
    en: 'dismissal, redundancy',
    article: 'die',
    plural: 'die Entlassungen',
    example: {
      de: 'Die angekündigten Entlassungen lösten unter den Beschäftigten große Unruhe aus.',
      en: 'The announced redundancies caused great unrest among the employees.'
    }
  },
  {
    id: 'b2.n.019',
    de: 'Gesellschaft',
    en: 'society',
    article: 'die',
    plural: 'die Gesellschaften',
    example: {
      de: 'Eine alternde Gesellschaft steht vor der Frage, wer die Renten künftig finanzieren soll.',
      en: 'An ageing society faces the question of who is to finance pensions in future.'
    }
  },
  {
    id: 'b2.n.020',
    de: 'Gerechtigkeit',
    en: 'justice, fairness',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'In der Debatte um soziale Gerechtigkeit spielt das Bildungssystem eine zentrale Rolle.',
      en: 'The education system plays a central role in the debate about social justice.'
    }
  },
  {
    id: 'b2.n.021',
    de: 'Gleichberechtigung',
    en: 'equal rights, equality',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Trotz gesetzlicher Gleichberechtigung verdienen Frauen im Durchschnitt noch immer weniger als Männer.',
      en: 'Despite legal equality, women on average still earn less than men.'
    }
  },
  {
    id: 'b2.n.022',
    de: 'Zusammenhalt',
    en: 'cohesion, solidarity',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Krise hat den Zusammenhalt in der Nachbarschaft überraschend gestärkt.',
      en: 'The crisis has surprisingly strengthened the cohesion in the neighbourhood.'
    }
  },
  {
    id: 'b2.n.023',
    de: 'Armut',
    en: 'poverty',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Immer mehr Rentner sind trotz jahrzehntelanger Arbeit von Armut bedroht.',
      en: 'More and more pensioners are threatened by poverty despite decades of work.'
    }
  },
  {
    id: 'b2.n.024',
    de: 'Wohlstand',
    en: 'prosperity, affluence',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Der Wohlstand eines Landes lässt sich nicht allein am Bruttoinlandsprodukt messen.',
      en: 'The prosperity of a country cannot be measured by gross domestic product alone.'
    }
  },
  {
    id: 'b2.n.025',
    de: 'Bevölkerung',
    en: 'population',
    article: 'die',
    plural: 'die Bevölkerungen',
    example: {
      de: 'Ein wachsender Teil der Bevölkerung lebt allein in großen Städten.',
      en: 'A growing part of the population lives alone in large cities.'
    }
  },
  {
    id: 'b2.n.026',
    de: 'Regierung',
    en: 'government',
    article: 'die',
    plural: 'die Regierungen',
    example: {
      de: 'Die Regierung kündigte an, den sozialen Wohnungsbau stärker zu fördern.',
      en: 'The government announced that it would promote social housing more strongly.'
    }
  },
  {
    id: 'b2.n.027',
    de: 'Gesetz',
    en: 'law',
    article: 'das',
    plural: 'die Gesetze',
    example: {
      de: 'Das neue Gesetz verpflichtet Unternehmen, ihre Lieferketten regelmäßig zu überprüfen.',
      en: 'The new law obliges companies to review their supply chains regularly.'
    }
  },
  {
    id: 'b2.n.028',
    de: 'Meinungsfreiheit',
    en: 'freedom of expression',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Meinungsfreiheit endet dort, wo andere Menschen beleidigt oder bedroht werden.',
      en: 'Freedom of expression ends where other people are insulted or threatened.'
    }
  },
  {
    id: 'b2.n.029',
    de: 'Minderheit',
    en: 'minority',
    article: 'die',
    plural: 'die Minderheiten',
    example: {
      de: 'Der Schutz von Minderheiten gehört zu den Grundprinzipien jeder Demokratie.',
      en: 'The protection of minorities is one of the basic principles of every democracy.'
    }
  },
  {
    id: 'b2.n.030',
    de: 'Vorurteil',
    en: 'prejudice',
    article: 'das',
    plural: 'die Vorurteile',
    example: {
      de: 'Vorurteile lassen sich am besten durch persönliche Begegnungen abbauen.',
      en: 'Prejudices can best be broken down through personal encounters.'
    }
  },
  {
    id: 'b2.n.031',
    de: 'Integration',
    en: 'integration',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Sprachkurse gelten als Schlüssel für eine gelungene Integration von Zugewanderten.',
      en: 'Language courses are considered the key to the successful integration of immigrants.'
    }
  },
  {
    id: 'b2.n.032',
    de: 'Herkunft',
    en: 'origin, background',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Der Bildungserfolg hängt in Deutschland noch immer stark von der sozialen Herkunft ab.',
      en: 'In Germany, educational success still depends heavily on social background.'
    }
  },
  {
    id: 'b2.n.033',
    de: 'Debatte',
    en: 'debate',
    article: 'die',
    plural: 'die Debatten',
    example: {
      de: 'Die Debatte über ein Verbot von Werbung für ungesunde Lebensmittel hält weiter an.',
      en: 'The debate about banning advertising for unhealthy food continues.'
    }
  },
  {
    id: 'b2.n.034',
    de: 'Kompromiss',
    en: 'compromise',
    article: 'der',
    plural: 'die Kompromisse',
    example: {
      de: 'Nach langem Streit einigten sich beide Parteien auf einen tragfähigen Kompromiss.',
      en: 'After a long dispute, both parties agreed on a viable compromise.'
    }
  },
  {
    id: 'b2.n.035',
    de: 'Vorwurf',
    en: 'accusation, reproach',
    article: 'der',
    plural: 'die Vorwürfe',
    example: {
      de: 'Der Vorwurf der Bestechlichkeit konnte dem Politiker bislang nicht nachgewiesen werden.',
      en: 'The accusation of corruptibility could not be proven against the politician so far.'
    }
  },
  {
    id: 'b2.n.036',
    de: 'Maßnahme',
    en: 'measure',
    article: 'die',
    plural: 'die Maßnahmen',
    example: {
      de: 'Die beschlossenen Maßnahmen zur Luftreinhaltung zeigen erste messbare Erfolge.',
      en: 'The adopted measures for keeping the air clean are showing the first measurable successes.'
    }
  },
  {
    id: 'b2.n.037',
    de: 'Auswirkung',
    en: 'effect, impact',
    article: 'die',
    plural: 'die Auswirkungen',
    example: {
      de: 'Die Auswirkungen der Pandemie auf die psychische Gesundheit werden noch erforscht.',
      en: 'The effects of the pandemic on mental health are still being researched.'
    }
  },
  {
    id: 'b2.n.038',
    de: 'Wissenschaft',
    en: 'science, scholarship',
    article: 'die',
    plural: 'die Wissenschaften',
    example: {
      de: 'Die Wissenschaft warnt seit Jahrzehnten vor den Folgen der Erderwärmung.',
      en: 'Science has been warning of the consequences of global warming for decades.'
    }
  },
  {
    id: 'b2.n.039',
    de: 'Forscher',
    en: 'researcher',
    article: 'der',
    plural: 'die Forscher',
    example: {
      de: 'Die Forscher untersuchen, wie sich Mikroplastik auf den menschlichen Körper auswirkt.',
      en: 'The researchers are investigating how microplastics affect the human body.'
    }
  },
  {
    id: 'b2.n.040',
    de: 'Untersuchung',
    en: 'examination, investigation',
    article: 'die',
    plural: 'die Untersuchungen',
    example: {
      de: 'Eine aktuelle Untersuchung belegt den Zusammenhang zwischen Schlafmangel und Konzentrationsschwäche.',
      en: 'A recent investigation proves the connection between lack of sleep and poor concentration.'
    }
  },
  {
    id: 'b2.n.041',
    de: 'Studie',
    en: 'study',
    article: 'die',
    plural: 'die Studien',
    example: {
      de: 'Laut einer neuen Studie arbeitet jeder vierte Beschäftigte regelmäßig am Wochenende.',
      en: 'According to a new study, one in four employees regularly works at weekends.'
    }
  },
  {
    id: 'b2.n.042',
    de: 'Erkenntnis',
    en: 'insight, finding',
    article: 'die',
    plural: 'die Erkenntnisse',
    example: {
      de: 'Die neuen Erkenntnisse stellen bisherige Annahmen über das Klima grundlegend infrage.',
      en: 'The new findings fundamentally call previous assumptions about the climate into question.'
    }
  },
  {
    id: 'b2.n.043',
    de: 'Fortschritt',
    en: 'progress',
    article: 'der',
    plural: 'die Fortschritte',
    example: {
      de: 'Der medizinische Fortschritt hat die durchschnittliche Lebenserwartung deutlich erhöht.',
      en: 'Medical progress has significantly increased average life expectancy.'
    }
  },
  {
    id: 'b2.n.044',
    de: 'Erfindung',
    en: 'invention',
    article: 'die',
    plural: 'die Erfindungen',
    example: {
      de: 'Manche Erfindung, die zunächst belächelt wurde, hat später die Welt verändert.',
      en: 'Some inventions that were initially ridiculed later changed the world.'
    }
  },
  {
    id: 'b2.n.045',
    de: 'Verfahren',
    en: 'procedure, process',
    article: 'das',
    plural: 'die Verfahren',
    example: {
      de: 'Das neue Verfahren ermöglicht es, Kunststoffe nahezu vollständig zu recyceln.',
      en: 'The new process makes it possible to recycle plastics almost completely.'
    }
  },
  {
    id: 'b2.n.046',
    de: 'Anwendung',
    en: 'application, use',
    article: 'die',
    plural: 'die Anwendungen',
    example: {
      de: 'Die praktische Anwendung der Forschungsergebnisse wird noch mehrere Jahre dauern.',
      en: 'The practical application of the research results will take several more years.'
    }
  },
  {
    id: 'b2.n.047',
    de: 'Digitalisierung',
    en: 'digitalisation',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Digitalisierung verändert nicht nur die Wirtschaft, sondern auch das Privatleben.',
      en: 'Digitalisation is changing not only the economy but also private life.'
    }
  },
  {
    id: 'b2.n.048',
    de: 'Datenschutz',
    en: 'data protection',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Kritiker bemängeln, dass der Datenschutz bei der neuen App vernachlässigt wurde.',
      en: 'Critics complain that data protection was neglected in the new app.'
    }
  },
  {
    id: 'b2.n.049',
    de: 'Netzwerk',
    en: 'network',
    article: 'das',
    plural: 'die Netzwerke',
    example: {
      de: 'Berufliche Netzwerke spielen bei der Stellensuche eine immer größere Rolle.',
      en: 'Professional networks are playing an ever greater role in the job search.'
    }
  },
  {
    id: 'b2.n.050',
    de: 'Medium',
    en: 'medium',
    article: 'das',
    plural: 'die Medien',
    example: {
      de: 'Soziale Medien beeinflussen zunehmend, wie sich junge Menschen politisch informieren.',
      en: 'Social media increasingly influence how young people inform themselves about politics.'
    }
  },
  {
    id: 'b2.n.051',
    de: 'Quelle',
    en: 'source',
    article: 'die',
    plural: 'die Quellen',
    example: {
      de: 'Seriöser Journalismus zeichnet sich dadurch aus, dass Quellen sorgfältig geprüft werden.',
      en: 'Serious journalism is characterised by the fact that sources are carefully checked.'
    }
  },
  {
    id: 'b2.n.052',
    de: 'Schlagzeile',
    en: 'headline',
    article: 'die',
    plural: 'die Schlagzeilen',
    example: {
      de: 'Der Skandal beherrschte wochenlang die Schlagzeilen der großen Zeitungen.',
      en: 'The scandal dominated the headlines of the major newspapers for weeks.'
    }
  },
  {
    id: 'b2.n.053',
    de: 'Öffentlichkeit',
    en: 'the public',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Der Konzern informierte die Öffentlichkeit erst, als der Schaden nicht mehr zu verbergen war.',
      en: 'The corporation only informed the public when the damage could no longer be concealed.'
    }
  },
  {
    id: 'b2.n.054',
    de: 'Falschmeldung',
    en: 'false report, fake news item',
    article: 'die',
    plural: 'die Falschmeldungen',
    example: {
      de: 'Falschmeldungen verbreiten sich in sozialen Netzwerken oft schneller als seriöse Nachrichten.',
      en: 'False reports often spread faster on social networks than serious news.'
    }
  },
  {
    id: 'b2.n.055',
    de: 'Einfluss',
    en: 'influence',
    article: 'der',
    plural: 'die Einflüsse',
    example: {
      de: 'Der Einfluss der Werbung auf das Kaufverhalten wird häufig unterschätzt.',
      en: 'The influence of advertising on buying behaviour is frequently underestimated.'
    }
  },
  {
    id: 'b2.n.056',
    de: 'Sucht',
    en: 'addiction',
    article: 'die',
    plural: 'die Süchte',
    example: {
      de: 'Die ständige Nutzung des Smartphones kann in eine regelrechte Sucht münden.',
      en: 'Constant smartphone use can turn into a genuine addiction.'
    }
  },
  {
    id: 'b2.n.057',
    de: 'Wirtschaft',
    en: 'economy',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die deutsche Wirtschaft ist in hohem Maße vom Export abhängig.',
      en: 'The German economy is highly dependent on exports.'
    }
  },
  {
    id: 'b2.n.058',
    de: 'Verbraucher',
    en: 'consumer',
    article: 'der',
    plural: 'die Verbraucher',
    example: {
      de: 'Verbraucher haben ein Recht darauf zu erfahren, woher die Zutaten stammen.',
      en: 'Consumers have a right to know where the ingredients come from.'
    }
  },
  {
    id: 'b2.n.059',
    de: 'Konsum',
    en: 'consumption',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Ein bewussterer Konsum könnte die Belastung der Umwelt erheblich verringern.',
      en: 'More conscious consumption could considerably reduce the burden on the environment.'
    }
  },
  {
    id: 'b2.n.060',
    de: 'Behauptung',
    en: 'claim, assertion',
    article: 'die',
    plural: 'die Behauptungen',
    example: {
      de: 'Für seine Behauptung konnte der Redner keinerlei Belege vorlegen.',
      en: 'The speaker could not present any evidence for his claim.'
    }
  },
  {
    id: 'b2.n.061',
    de: 'Hersteller',
    en: 'manufacturer',
    article: 'der',
    plural: 'die Hersteller',
    example: {
      de: 'Der Hersteller musste mehrere Modelle wegen eines Sicherheitsmangels zurückrufen.',
      en: 'The manufacturer had to recall several models because of a safety defect.'
    }
  },
  {
    id: 'b2.n.062',
    de: 'Dienstleistung',
    en: 'service',
    article: 'die',
    plural: 'die Dienstleistungen',
    example: {
      de: 'Immer mehr Dienstleistungen werden inzwischen über digitale Plattformen angeboten.',
      en: 'More and more services are now being offered via digital platforms.'
    }
  },
  {
    id: 'b2.n.063',
    de: 'Konkurrenz',
    en: 'competition (rivals)',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Kleine Buchhandlungen können der Konkurrenz durch den Onlinehandel kaum standhalten.',
      en: 'Small bookshops can hardly withstand the competition from online retail.'
    }
  },
  {
    id: 'b2.n.064',
    de: 'Umsatz',
    en: 'turnover, revenue',
    article: 'der',
    plural: 'die Umsätze',
    example: {
      de: 'Der Umsatz des Unternehmens ist im vergangenen Geschäftsjahr um zehn Prozent gestiegen.',
      en: 'The turnover of the company rose by ten percent in the past financial year.'
    }
  },
  {
    id: 'b2.n.065',
    de: 'Gewinn',
    en: 'profit',
    article: 'der',
    plural: 'die Gewinne',
    example: {
      de: 'Ein Teil des Gewinns wird in die Entwicklung neuer Produkte investiert.',
      en: 'Part of the profit is invested in the development of new products.'
    }
  },
  {
    id: 'b2.n.066',
    de: 'Verlust',
    en: 'loss',
    article: 'der',
    plural: 'die Verluste',
    example: {
      de: 'Die Fluggesellschaft verzeichnete durch die Streiks Verluste in Millionenhöhe.',
      en: 'The airline recorded losses in the millions as a result of the strikes.'
    }
  },
  {
    id: 'b2.n.067',
    de: 'Steuer',
    en: 'tax',
    article: 'die',
    plural: 'die Steuern',
    example: {
      de: 'Mit den Einnahmen aus der neuen Steuer soll der Nahverkehr ausgebaut werden.',
      en: 'The revenue from the new tax is to be used to expand local public transport.'
    }
  },
  {
    id: 'b2.n.068',
    de: 'Haushalt',
    en: 'household; budget',
    article: 'der',
    plural: 'die Haushalte',
    example: {
      de: 'Viele Haushalte müssen inzwischen mehr als ein Drittel ihres Einkommens für Miete ausgeben.',
      en: 'Many households now have to spend more than a third of their income on rent.'
    }
  },
  {
    id: 'b2.n.069',
    de: 'Nachfrage',
    en: 'demand',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Nachfrage nach gebrauchten Elektrogeräten ist zuletzt stark gestiegen.',
      en: 'Demand for used electrical appliances has risen sharply recently.'
    }
  },
  {
    id: 'b2.n.070',
    de: 'Klimawandel',
    en: 'climate change',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Der Klimawandel gilt als eine der größten Herausforderungen unserer Zeit.',
      en: 'Climate change is considered one of the greatest challenges of our time.'
    }
  },
  {
    id: 'b2.n.071',
    de: 'Erderwärmung',
    en: 'global warming',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Um die Erderwärmung zu begrenzen, müssen die Emissionen drastisch sinken.',
      en: 'In order to limit global warming, emissions must fall drastically.'
    }
  },
  {
    id: 'b2.n.072',
    de: 'Emission',
    en: 'emission',
    article: 'die',
    plural: 'die Emissionen',
    example: {
      de: 'Die Emissionen des Verkehrssektors sind seit Jahren kaum zurückgegangen.',
      en: 'Emissions from the transport sector have hardly fallen in years.'
    }
  },
  {
    id: 'b2.n.073',
    de: 'Ressource',
    en: 'resource',
    article: 'die',
    plural: 'die Ressourcen',
    example: {
      de: 'Der sparsame Umgang mit natürlichen Ressourcen sollte eigentlich selbstverständlich sein.',
      en: 'Using natural resources sparingly should really go without saying.'
    }
  },
  {
    id: 'b2.n.074',
    de: 'Rohstoff',
    en: 'raw material',
    article: 'der',
    plural: 'die Rohstoffe',
    example: {
      de: 'Viele Rohstoffe für Batterien werden unter problematischen Bedingungen abgebaut.',
      en: 'Many raw materials for batteries are mined under problematic conditions.'
    }
  },
  {
    id: 'b2.n.075',
    de: 'Energiewende',
    en: 'energy transition',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die Energiewende kommt nur voran, wenn die Stromnetze schneller ausgebaut werden.',
      en: 'The energy transition will only make progress if the power grids are expanded more quickly.'
    }
  },
  {
    id: 'b2.n.076',
    de: 'Verzicht',
    en: 'renunciation, doing without',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Für viele bedeutet Klimaschutz vor allem Verzicht, dabei eröffnet er auch Chancen.',
      en: 'For many, climate protection means above all doing without, yet it also opens up opportunities.'
    }
  },
  {
    id: 'b2.n.077',
    de: 'Verpackung',
    en: 'packaging',
    article: 'die',
    plural: 'die Verpackungen',
    example: {
      de: 'Ein Großteil der Verpackungen landet nach einmaligem Gebrauch im Müll.',
      en: 'A large proportion of packaging ends up in the rubbish after a single use.'
    }
  },
  {
    id: 'b2.n.078',
    de: 'Abfall',
    en: 'waste, rubbish',
    article: 'der',
    plural: 'die Abfälle',
    example: {
      de: 'Die getrennte Sammlung von Abfällen erleichtert das Recycling erheblich.',
      en: 'The separate collection of waste makes recycling considerably easier.'
    }
  },
  {
    id: 'b2.n.079',
    de: 'Artenvielfalt',
    en: 'biodiversity',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Die intensive Landwirtschaft trägt maßgeblich zum Rückgang der Artenvielfalt bei.',
      en: 'Intensive agriculture contributes significantly to the decline in biodiversity.'
    }
  },
  {
    id: 'b2.n.080',
    de: 'Dürre',
    en: 'drought',
    article: 'die',
    plural: 'die Dürren',
    example: {
      de: 'Nach der monatelangen Dürre rechnen die Landwirte mit erheblichen Ernteausfällen.',
      en: 'After months of drought, farmers are expecting considerable crop failures.'
    }
  },
  {
    id: 'b2.n.081',
    de: 'Überschwemmung',
    en: 'flood',
    article: 'die',
    plural: 'die Überschwemmungen',
    example: {
      de: 'Die Überschwemmungen zerstörten zahlreiche Häuser und Brücken in der Region.',
      en: 'The floods destroyed numerous houses and bridges in the region.'
    }
  },
  {
    id: 'b2.n.082',
    de: 'Ernährung',
    en: 'diet, nutrition',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Eine ausgewogene Ernährung senkt das Risiko für zahlreiche chronische Krankheiten.',
      en: 'A balanced diet lowers the risk of numerous chronic diseases.'
    }
  },
  {
    id: 'b2.n.083',
    de: 'Nahrungsmittel',
    en: 'foodstuff',
    article: 'das',
    plural: 'die Nahrungsmittel',
    example: {
      de: 'Weltweit wird ein Drittel aller Nahrungsmittel weggeworfen, bevor es verzehrt wird.',
      en: 'Worldwide, a third of all foodstuffs are thrown away before they are consumed.'
    }
  },
  {
    id: 'b2.n.084',
    de: 'Bewegungsmangel',
    en: 'lack of exercise',
    article: 'der',
    plural: '– (nur Singular)',
    example: {
      de: 'Bewegungsmangel gilt neben Stress als eine der häufigsten Ursachen für Rückenbeschwerden.',
      en: 'Along with stress, lack of exercise is considered one of the most common causes of back problems.'
    }
  },
  {
    id: 'b2.n.085',
    de: 'Vorsorge',
    en: 'preventive care, provision',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Regelmäßige Vorsorge hilft, Krankheiten frühzeitig zu erkennen und zu behandeln.',
      en: 'Regular preventive care helps to detect and treat illnesses at an early stage.'
    }
  },
  {
    id: 'b2.n.086',
    de: 'Impfung',
    en: 'vaccination',
    article: 'die',
    plural: 'die Impfungen',
    example: {
      de: 'Dank flächendeckender Impfungen konnten manche Krankheiten nahezu ausgerottet werden.',
      en: 'Thanks to widespread vaccinations, some diseases have been almost eradicated.'
    }
  },
  {
    id: 'b2.n.087',
    de: 'Krankenkasse',
    en: 'health insurance fund',
    article: 'die',
    plural: 'die Krankenkassen',
    example: {
      de: 'Die Krankenkasse übernimmt die Kosten für die Behandlung leider nur teilweise.',
      en: 'Unfortunately, the health insurance fund only partially covers the costs of the treatment.'
    }
  },
  {
    id: 'b2.n.088',
    de: 'Eingriff',
    en: 'operation, intervention',
    article: 'der',
    plural: 'die Eingriffe',
    example: {
      de: 'Der Eingriff verlief ohne Komplikationen, dennoch muss die Patientin einige Tage bleiben.',
      en: 'The operation went without complications, yet the patient has to stay for a few days.'
    }
  },
  {
    id: 'b2.n.089',
    de: 'Gedächtnis',
    en: 'memory',
    article: 'das',
    plural: 'die Gedächtnisse',
    example: {
      de: 'Ausreichend Schlaf ist entscheidend dafür, dass das Gedächtnis zuverlässig funktioniert.',
      en: 'Sufficient sleep is crucial for the memory to function reliably.'
    }
  },
  {
    id: 'b2.n.090',
    de: 'Bildung',
    en: 'education',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'Bildung gilt als das wirksamste Mittel gegen Armut und Ausgrenzung.',
      en: 'Education is regarded as the most effective means against poverty and exclusion.'
    }
  },
  {
    id: 'b2.n.091',
    de: 'Abschluss',
    en: 'degree, qualification',
    article: 'der',
    plural: 'die Abschlüsse',
    example: {
      de: 'Ohne anerkannten Abschluss sind die Chancen auf dem Arbeitsmarkt deutlich geringer.',
      en: 'Without a recognised qualification, the chances on the labour market are considerably lower.'
    }
  },
  {
    id: 'b2.n.092',
    de: 'Kenntnis',
    en: 'knowledge',
    article: 'die',
    plural: 'die Kenntnisse',
    example: {
      de: 'Grundlegende Kenntnisse in Statistik werden in diesem Studiengang vorausgesetzt.',
      en: 'Basic knowledge of statistics is a prerequisite in this degree programme.'
    }
  },
  {
    id: 'b2.n.093',
    de: 'Leistung',
    en: 'performance, achievement',
    article: 'die',
    plural: 'die Leistungen',
    example: {
      de: 'Die schulischen Leistungen hängen oft stärker vom Elternhaus ab als vom Talent.',
      en: 'School performance often depends more on the parental home than on talent.'
    }
  },
  {
    id: 'b2.n.094',
    de: 'Stipendium',
    en: 'scholarship',
    article: 'das',
    plural: 'die Stipendien',
    example: {
      de: 'Dank eines Stipendiums konnte sie ein Auslandssemester in Kanada verbringen.',
      en: 'Thanks to a scholarship, she was able to spend a semester abroad in Canada.'
    }
  },
  {
    id: 'b2.n.095',
    de: 'Vorlesung',
    en: 'lecture',
    article: 'die',
    plural: 'die Vorlesungen',
    example: {
      de: 'Die Vorlesungen werden aufgezeichnet, damit Studierende sie flexibel nachholen können.',
      en: 'The lectures are recorded so that students can catch up on them flexibly.'
    }
  },
  {
    id: 'b2.n.096',
    de: 'Erziehung',
    en: 'upbringing, education',
    article: 'die',
    plural: '– (nur Singular)',
    example: {
      de: 'In Fragen der Erziehung sind sich die beiden Elternteile nur selten einig.',
      en: 'The two parents rarely agree on questions of upbringing.'
    }
  },
  {
    id: 'b2.n.097',
    de: 'Vertrauen',
    en: 'trust, confidence',
    article: 'das',
    plural: '– (nur Singular)',
    example: {
      de: 'Das Vertrauen in die klassischen Medien hat in den letzten Jahren spürbar gelitten.',
      en: 'Trust in the traditional media has suffered noticeably in recent years.'
    }
  },
  {
    id: 'b2.n.098',
    de: 'Auseinandersetzung',
    en: 'dispute, confrontation',
    article: 'die',
    plural: 'die Auseinandersetzungen',
    example: {
      de: 'Nach einer heftigen Auseinandersetzung mit seinem Kollegen ließ er sich versetzen.',
      en: 'After a fierce dispute with his colleague, he had himself transferred.'
    }
  },
  {
    id: 'b2.n.099',
    de: 'Missverständnis',
    en: 'misunderstanding',
    article: 'das',
    plural: 'die Missverständnisse',
    example: {
      de: 'Das Missverständnis hätte sich durch ein offenes Gespräch leicht vermeiden lassen.',
      en: 'The misunderstanding could easily have been avoided through an open conversation.'
    }
  },
  {
    id: 'b2.n.100',
    de: 'Verhältnis',
    en: 'relationship, ratio',
    article: 'das',
    plural: 'die Verhältnisse',
    example: {
      de: 'Das Verhältnis zwischen den Nachbarn hat sich nach dem Streit deutlich verschlechtert.',
      en: 'The relationship between the neighbours deteriorated noticeably after the quarrel.'
    }
  }
];

export const B2_ADJECTIVES: readonly AdjectiveEntry[] = [
  {
    id: 'b2.a.001',
    de: 'angemessen',
    en: 'appropriate, adequate',
    komparativ: 'angemessener',
    superlativ: 'am angemessensten',
    example: {
      de: 'Die Beschäftigten fordern eine angemessene Bezahlung für ihre verantwortungsvolle Arbeit.',
      en: 'The employees are demanding appropriate pay for their responsible work.'
    }
  },
  {
    id: 'b2.a.002',
    de: 'anspruchsvoll',
    en: 'demanding, sophisticated',
    komparativ: 'anspruchsvoller',
    superlativ: 'am anspruchsvollsten',
    example: {
      de: 'Die neue Stelle ist deutlich anspruchsvoller, als sie zunächst erwartet hatte.',
      en: 'The new position is considerably more demanding than she had initially expected.'
    }
  },
  {
    id: 'b2.a.003',
    de: 'aufschlussreich',
    en: 'revealing, informative',
    komparativ: 'aufschlussreicher',
    superlativ: 'am aufschlussreichsten',
    example: {
      de: 'Das Interview mit der Ministerin war in mehrfacher Hinsicht äußerst aufschlussreich.',
      en: 'The interview with the minister was extremely revealing in several respects.'
    }
  },
  {
    id: 'b2.a.004',
    de: 'aufwendig',
    en: 'elaborate, costly',
    komparativ: 'aufwendiger',
    superlativ: 'am aufwendigsten',
    example: {
      de: 'Die Restaurierung des Gemäldes war deutlich aufwendiger als ursprünglich geplant.',
      en: 'The restoration of the painting was considerably more elaborate than originally planned.'
    }
  },
  {
    id: 'b2.a.005',
    de: 'ausführlich',
    en: 'detailed, thorough',
    komparativ: 'ausführlicher',
    superlativ: 'am ausführlichsten',
    example: {
      de: 'Der Arzt informierte die Patientin ausführlich über mögliche Nebenwirkungen der Therapie.',
      en: 'The doctor informed the patient in detail about possible side effects of the therapy.'
    }
  },
  {
    id: 'b2.a.006',
    de: 'ausgewogen',
    en: 'balanced',
    komparativ: 'ausgewogener',
    superlativ: 'am ausgewogensten',
    example: {
      de: 'Eine ausgewogene Berichterstattung lässt beide Seiten des Konflikts zu Wort kommen.',
      en: 'Balanced reporting lets both sides of the conflict have their say.'
    }
  },
  {
    id: 'b2.a.007',
    de: 'aussagekräftig',
    en: 'meaningful, informative',
    komparativ: 'aussagekräftiger',
    superlativ: 'am aussagekräftigsten',
    example: {
      de: 'Ein aussagekräftiges Anschreiben erhöht die Chancen auf eine Einladung deutlich.',
      en: 'A meaningful cover letter significantly increases the chances of an invitation.'
    }
  },
  {
    id: 'b2.a.008',
    de: 'bedenklich',
    en: 'worrying, questionable',
    komparativ: 'bedenklicher',
    superlativ: 'am bedenklichsten',
    example: {
      de: 'Fachleute halten die aktuelle Entwicklung auf dem Wohnungsmarkt für äußerst bedenklich.',
      en: 'Experts consider the current development on the housing market extremely worrying.'
    }
  },
  {
    id: 'b2.a.009',
    de: 'bedeutend',
    en: 'significant, important',
    komparativ: 'bedeutender',
    superlativ: 'am bedeutendsten',
    example: {
      de: 'Die Entdeckung gilt als eine der bedeutendsten der letzten Jahrzehnte.',
      en: 'The discovery is considered one of the most significant of recent decades.'
    }
  },
  {
    id: 'b2.a.010',
    de: 'beeindruckend',
    en: 'impressive',
    komparativ: 'beeindruckender',
    superlativ: 'am beeindruckendsten',
    example: {
      de: 'Mit welcher Geschwindigkeit die Stadt wieder aufgebaut wurde, ist wirklich beeindruckend.',
      en: 'The speed with which the city was rebuilt is truly impressive.'
    }
  },
  {
    id: 'b2.a.011',
    de: 'belastbar',
    en: 'resilient, able to work under pressure',
    komparativ: 'belastbarer',
    superlativ: 'am belastbarsten',
    example: {
      de: 'Für diese Position suchen wir eine flexible und belastbare Persönlichkeit.',
      en: 'For this position we are looking for a flexible and resilient personality.'
    }
  },
  {
    id: 'b2.a.012',
    de: 'bemerkenswert',
    en: 'remarkable',
    komparativ: 'bemerkenswerter',
    superlativ: 'am bemerkenswertesten',
    example: {
      de: 'Es ist bemerkenswert, wie ruhig sie während der gesamten Krise geblieben ist.',
      en: 'It is remarkable how calm she remained throughout the entire crisis.'
    }
  },
  {
    id: 'b2.a.013',
    de: 'bescheiden',
    en: 'modest',
    komparativ: 'bescheidener',
    superlativ: 'am bescheidensten',
    example: {
      de: 'Trotz seines großen Erfolgs ist der Unternehmer stets bescheiden geblieben.',
      en: 'Despite his great success, the entrepreneur has always remained modest.'
    }
  },
  {
    id: 'b2.a.014',
    de: 'beträchtlich',
    en: 'considerable',
    example: {
      de: 'Zwischen den Gehältern von Männern und Frauen besteht noch immer ein beträchtlicher Unterschied.',
      en: 'There is still a considerable difference between the salaries of men and women.'
    }
  },
  {
    id: 'b2.a.015',
    de: 'differenziert',
    en: 'nuanced, differentiated',
    komparativ: 'differenzierter',
    superlativ: 'am differenziertesten',
    example: {
      de: 'Das Thema verlangt eine differenzierte Betrachtung statt einfacher Antworten.',
      en: 'The topic requires a nuanced examination rather than simple answers.'
    }
  },
  {
    id: 'b2.a.016',
    de: 'dringend',
    en: 'urgent',
    komparativ: 'dringender',
    superlativ: 'am dringendsten',
    example: {
      de: 'Die Klinik benötigt dringend zusätzliches Personal für die überlastete Notaufnahme.',
      en: 'The clinic urgently needs additional staff for the overstretched emergency department.'
    }
  },
  {
    id: 'b2.a.017',
    de: 'effizient',
    en: 'efficient',
    komparativ: 'effizienter',
    superlativ: 'am effizientesten',
    example: {
      de: 'Durch die neue Software lassen sich Bestellungen wesentlich effizienter bearbeiten.',
      en: 'The new software allows orders to be processed much more efficiently.'
    }
  },
  {
    id: 'b2.a.018',
    de: 'ehrgeizig',
    en: 'ambitious',
    komparativ: 'ehrgeiziger',
    superlativ: 'am ehrgeizigsten',
    example: {
      de: 'Die Regierung hat sich beim Klimaschutz besonders ehrgeizige Ziele gesetzt.',
      en: 'The government has set itself particularly ambitious goals for climate protection.'
    }
  },
  {
    id: 'b2.a.019',
    de: 'eigenständig',
    en: 'independent, autonomous',
    komparativ: 'eigenständiger',
    superlativ: 'am eigenständigsten',
    example: {
      de: 'Von Studierenden wird erwartet, dass sie eigenständig wissenschaftlich arbeiten können.',
      en: 'Students are expected to be able to work academically on their own.'
    }
  },
  {
    id: 'b2.a.020',
    de: 'eindeutig',
    en: 'clear, unambiguous',
    komparativ: 'eindeutiger',
    superlativ: 'am eindeutigsten',
    example: {
      de: 'Die Studienlage ist eindeutig: Rauchen erhöht das Krebsrisiko erheblich.',
      en: 'The research is unambiguous: smoking considerably increases the risk of cancer.'
    }
  },
  {
    id: 'b2.a.021',
    de: 'einheitlich',
    en: 'uniform, standardised',
    komparativ: 'einheitlicher',
    superlativ: 'am einheitlichsten',
    example: {
      de: 'Die Bundesländer konnten sich nicht auf einheitliche Regeln für die Schulen einigen.',
      en: 'The federal states could not agree on uniform rules for schools.'
    }
  },
  {
    id: 'b2.a.022',
    de: 'empfindlich',
    en: 'sensitive',
    komparativ: 'empfindlicher',
    superlativ: 'am empfindlichsten',
    example: {
      de: 'Das Ökosystem der Alpen reagiert besonders empfindlich auf steigende Temperaturen.',
      en: 'The Alpine ecosystem reacts particularly sensitively to rising temperatures.'
    }
  },
  {
    id: 'b2.a.023',
    de: 'entscheidend',
    en: 'decisive, crucial',
    komparativ: 'entscheidender',
    superlativ: 'am entscheidendsten',
    example: {
      de: 'Für den Erfolg einer Bewerbung ist der erste Eindruck oft entscheidend.',
      en: 'The first impression is often decisive for the success of an application.'
    }
  },
  {
    id: 'b2.a.024',
    de: 'erforderlich',
    en: 'required, necessary',
    example: {
      de: 'Für die Teilnahme an der Prüfung ist eine rechtzeitige Anmeldung zwingend erforderlich.',
      en: 'Timely registration is absolutely required for participation in the exam.'
    }
  },
  {
    id: 'b2.a.025',
    de: 'erheblich',
    en: 'considerable, substantial',
    example: {
      de: 'Der Sturm verursachte erhebliche Schäden an Gebäuden und Stromleitungen.',
      en: 'The storm caused considerable damage to buildings and power lines.'
    }
  },
  {
    id: 'b2.a.026',
    de: 'ernsthaft',
    en: 'serious, earnest',
    komparativ: 'ernsthafter',
    superlativ: 'am ernsthaftesten',
    example: {
      de: 'Niemand hat sich bisher ernsthaft mit den eigentlichen Ursachen des Problems beschäftigt.',
      en: 'So far, nobody has seriously dealt with the actual causes of the problem.'
    }
  },
  {
    id: 'b2.a.027',
    de: 'flexibel',
    en: 'flexible',
    komparativ: 'flexibler',
    superlativ: 'am flexibelsten',
    example: {
      de: 'Wer flexibel bleibt, findet auf dem Arbeitsmarkt leichter eine neue Stelle.',
      en: 'Those who remain flexible find a new job on the labour market more easily.'
    }
  },
  {
    id: 'b2.a.028',
    de: 'fortschrittlich',
    en: 'progressive',
    komparativ: 'fortschrittlicher',
    superlativ: 'am fortschrittlichsten',
    example: {
      de: 'Das Unternehmen gilt als besonders fortschrittlich, was familienfreundliche Arbeitsmodelle betrifft.',
      en: 'The company is considered particularly progressive when it comes to family-friendly working models.'
    }
  },
  {
    id: 'b2.a.029',
    de: 'geeignet',
    en: 'suitable',
    komparativ: 'geeigneter',
    superlativ: 'am geeignetsten',
    example: {
      de: 'Nicht jede Wohnung ist für ältere Menschen mit eingeschränkter Mobilität geeignet.',
      en: 'Not every flat is suitable for older people with limited mobility.'
    }
  },
  {
    id: 'b2.a.030',
    de: 'gegenwärtig',
    en: 'current, present',
    example: {
      de: 'Die gegenwärtige Lage auf dem Wohnungsmarkt lässt kaum Raum für Optimismus.',
      en: 'The current situation on the housing market leaves hardly any room for optimism.'
    }
  },
  {
    id: 'b2.a.031',
    de: 'gerecht',
    en: 'just, fair',
    komparativ: 'gerechter',
    superlativ: 'am gerechtesten',
    example: {
      de: 'Viele Bürger empfinden das derzeitige Steuersystem als nicht besonders gerecht.',
      en: 'Many citizens do not perceive the current tax system as particularly fair.'
    }
  },
  {
    id: 'b2.a.032',
    de: 'gering',
    en: 'low, slight',
    komparativ: 'geringer',
    superlativ: 'am geringsten',
    example: {
      de: 'Die Wahlbeteiligung fiel deutlich geringer aus als bei der letzten Abstimmung.',
      en: 'Voter turnout was significantly lower than in the last vote.'
    }
  },
  {
    id: 'b2.a.033',
    de: 'gesellschaftlich',
    en: 'social, societal',
    example: {
      de: 'Ehrenamtliche Arbeit verdient mehr gesellschaftliche Anerkennung, als sie derzeit erhält.',
      en: 'Voluntary work deserves more social recognition than it currently receives.'
    }
  },
  {
    id: 'b2.a.034',
    de: 'gewissenhaft',
    en: 'conscientious',
    komparativ: 'gewissenhafter',
    superlativ: 'am gewissenhaftesten',
    example: {
      de: 'Sie erledigt auch unangenehme Aufgaben stets gewissenhaft und zuverlässig.',
      en: 'She always completes even unpleasant tasks conscientiously and reliably.'
    }
  },
  {
    id: 'b2.a.035',
    de: 'gründlich',
    en: 'thorough',
    komparativ: 'gründlicher',
    superlativ: 'am gründlichsten',
    example: {
      de: 'Der Fall wurde gründlicher untersucht, als es zunächst den Anschein hatte.',
      en: 'The case was investigated more thoroughly than it initially appeared.'
    }
  },
  {
    id: 'b2.a.036',
    de: 'herausfordernd',
    en: 'challenging',
    komparativ: 'herausfordernder',
    superlativ: 'am herausforderndsten',
    example: {
      de: 'Die Arbeit mit traumatisierten Geflüchteten ist emotional äußerst herausfordernd.',
      en: 'Working with traumatised refugees is emotionally extremely challenging.'
    }
  },
  {
    id: 'b2.a.037',
    de: 'hervorragend',
    en: 'outstanding, excellent',
    example: {
      de: 'Das kleine Restaurant ist für seine hervorragende regionale Küche weit über die Stadt hinaus bekannt.',
      en: 'The small restaurant is known far beyond the city for its outstanding regional cuisine.'
    }
  },
  {
    id: 'b2.a.038',
    de: 'hochwertig',
    en: 'high-quality',
    komparativ: 'hochwertiger',
    superlativ: 'am hochwertigsten',
    example: {
      de: 'Hochwertige Geräte sind teurer, halten dafür aber meist deutlich länger.',
      en: 'High-quality appliances are more expensive, but usually last considerably longer.'
    }
  },
  {
    id: 'b2.a.039',
    de: 'innovativ',
    en: 'innovative',
    komparativ: 'innovativer',
    superlativ: 'am innovativsten',
    example: {
      de: 'Mit seinem innovativen Konzept gewann das junge Start-up mehrere Preise.',
      en: 'With its innovative concept, the young start-up won several awards.'
    }
  },
  {
    id: 'b2.a.040',
    de: 'knapp',
    en: 'scarce, tight',
    komparativ: 'knapper',
    superlativ: 'am knappsten',
    example: {
      de: 'Bezahlbarer Wohnraum ist in den Ballungsräumen zu einem knappen Gut geworden.',
      en: 'Affordable housing has become a scarce commodity in metropolitan areas.'
    }
  },
  {
    id: 'b2.a.041',
    de: 'kompetent',
    en: 'competent',
    komparativ: 'kompetenter',
    superlativ: 'am kompetentesten',
    example: {
      de: 'Die Kunden wurden von den Mitarbeitern freundlich und kompetent beraten.',
      en: 'The customers were advised by the staff in a friendly and competent manner.'
    }
  },
  {
    id: 'b2.a.042',
    de: 'komplex',
    en: 'complex',
    komparativ: 'komplexer',
    superlativ: 'am komplexesten',
    example: {
      de: 'Die Zusammenhänge sind zu komplex, um sie in einem einzigen Satz zu erklären.',
      en: 'The connections are too complex to explain in a single sentence.'
    }
  },
  {
    id: 'b2.a.043',
    de: 'konsequent',
    en: 'consistent, rigorous',
    komparativ: 'konsequenter',
    superlativ: 'am konsequentesten',
    example: {
      de: 'Nur wenn die Regeln konsequent durchgesetzt werden, verlieren sie nicht an Wirkung.',
      en: 'Only if the rules are enforced consistently do they not lose their effect.'
    }
  },
  {
    id: 'b2.a.044',
    de: 'kontrovers',
    en: 'controversial',
    komparativ: 'kontroverser',
    superlativ: 'am kontroversesten',
    example: {
      de: 'Über die Einführung eines bedingungslosen Grundeinkommens wird seit Jahren kontrovers diskutiert.',
      en: 'The introduction of an unconditional basic income has been controversially debated for years.'
    }
  },
  {
    id: 'b2.a.045',
    de: 'kritisch',
    en: 'critical',
    komparativ: 'kritischer',
    superlativ: 'am kritischsten',
    example: {
      de: 'Verbraucherschützer sehen die neuen Vertragsbedingungen der Bank äußerst kritisch.',
      en: "Consumer advocates view the bank's new contract terms extremely critically."
    }
  },
  {
    id: 'b2.a.046',
    de: 'langfristig',
    en: 'long-term',
    example: {
      de: 'Langfristig zahlt sich die Investition in erneuerbare Energien mit Sicherheit aus.',
      en: 'In the long term, the investment in renewable energies will certainly pay off.'
    }
  },
  {
    id: 'b2.a.047',
    de: 'leistungsfähig',
    en: 'efficient, powerful',
    komparativ: 'leistungsfähiger',
    superlativ: 'am leistungsfähigsten',
    example: {
      de: 'Ein gut ausgebautes Schienennetz macht den Güterverkehr deutlich leistungsfähiger.',
      en: 'A well-developed rail network makes freight transport considerably more efficient.'
    }
  },
  {
    id: 'b2.a.048',
    de: 'mangelhaft',
    en: 'deficient, inadequate',
    example: {
      de: 'Mehrere Produkte wurden im Test wegen mangelhafter Sicherheit deutlich abgewertet.',
      en: 'Several products were marked down significantly in the test because of inadequate safety.'
    }
  },
  {
    id: 'b2.a.049',
    de: 'maßgeblich',
    en: 'decisive, significant',
    example: {
      de: 'Die Gewerkschaften waren an der Ausarbeitung der Reform maßgeblich beteiligt.',
      en: 'The trade unions were significantly involved in drafting the reform.'
    }
  },
  {
    id: 'b2.a.050',
    de: 'nachhaltig',
    en: 'sustainable, lasting',
    komparativ: 'nachhaltiger',
    superlativ: 'am nachhaltigsten',
    example: {
      de: 'Immer mehr Firmen bemühen sich um eine nachhaltige Produktion ihrer Waren.',
      en: 'More and more companies are striving for sustainable production of their goods.'
    }
  },
  {
    id: 'b2.a.051',
    de: 'nachvollziehbar',
    en: 'comprehensible, understandable',
    komparativ: 'nachvollziehbarer',
    superlativ: 'am nachvollziehbarsten',
    example: {
      de: 'Die Entscheidung des Gerichts ist für viele Betroffene kaum nachvollziehbar.',
      en: 'The court decision is hardly comprehensible for many of those affected.'
    }
  },
  {
    id: 'b2.a.052',
    de: 'notwendig',
    en: 'necessary',
    komparativ: 'notwendiger',
    superlativ: 'am notwendigsten',
    example: {
      de: 'Die Sanierung der Schule ist dringend notwendig, wird aber immer wieder verschoben.',
      en: 'The renovation of the school is urgently necessary but keeps being postponed.'
    }
  },
  {
    id: 'b2.a.053',
    de: 'nüchtern',
    en: 'sober, matter-of-fact',
    komparativ: 'nüchterner',
    superlativ: 'am nüchternsten',
    example: {
      de: 'Betrachtet man die Zahlen nüchtern, fällt die Bilanz eher ernüchternd aus.',
      en: 'If you look at the figures soberly, the results are rather sobering.'
    }
  },
  {
    id: 'b2.a.054',
    de: 'oberflächlich',
    en: 'superficial',
    komparativ: 'oberflächlicher',
    superlativ: 'am oberflächlichsten',
    example: {
      de: 'Die Berichterstattung über das komplizierte Thema blieb erstaunlich oberflächlich.',
      en: 'The reporting on the complicated topic remained astonishingly superficial.'
    }
  },
  {
    id: 'b2.a.055',
    de: 'objektiv',
    en: 'objective',
    komparativ: 'objektiver',
    superlativ: 'am objektivsten',
    example: {
      de: 'Kaum ein Bericht über den Konflikt ist wirklich objektiv und ausgewogen.',
      en: 'Hardly any report on the conflict is truly objective and balanced.'
    }
  },
  {
    id: 'b2.a.056',
    de: 'offensichtlich',
    en: 'obvious, evident',
    komparativ: 'offensichtlicher',
    superlativ: 'am offensichtlichsten',
    example: {
      de: 'Es ist offensichtlich, dass die Maßnahmen bisher nicht die gewünschte Wirkung zeigen.',
      en: 'It is obvious that the measures have so far not shown the desired effect.'
    }
  },
  {
    id: 'b2.a.057',
    de: 'pauschal',
    en: 'sweeping, across the board',
    example: {
      de: 'Man sollte nicht pauschal behaupten, dass junge Leute unpolitisch seien.',
      en: 'One should not make the sweeping claim that young people are apolitical.'
    }
  },
  {
    id: 'b2.a.058',
    de: 'plausibel',
    en: 'plausible',
    komparativ: 'plausibler',
    superlativ: 'am plausibelsten',
    example: {
      de: 'Seine Erklärung klingt durchaus plausibel, lässt sich aber nicht überprüfen.',
      en: 'His explanation sounds quite plausible but cannot be verified.'
    }
  },
  {
    id: 'b2.a.059',
    de: 'präzise',
    en: 'precise',
    komparativ: 'präziser',
    superlativ: 'am präzisesten',
    example: {
      de: 'Moderne Messgeräte liefern deutlich präzisere Daten als noch vor zehn Jahren.',
      en: 'Modern measuring devices deliver considerably more precise data than ten years ago.'
    }
  },
  {
    id: 'b2.a.060',
    de: 'realistisch',
    en: 'realistic',
    komparativ: 'realistischer',
    superlativ: 'am realistischsten',
    example: {
      de: 'Es erscheint wenig realistisch, dass das Bauprojekt fristgerecht abgeschlossen wird.',
      en: 'It seems hardly realistic that the construction project will be completed on schedule.'
    }
  },
  {
    id: 'b2.a.061',
    de: 'relevant',
    en: 'relevant',
    komparativ: 'relevanter',
    superlativ: 'am relevantesten',
    example: {
      de: 'Für die endgültige Entscheidung sind nur wenige der genannten Punkte wirklich relevant.',
      en: 'Only a few of the points mentioned are really relevant for the final decision.'
    }
  },
  {
    id: 'b2.a.062',
    de: 'rentabel',
    en: 'profitable',
    komparativ: 'rentabler',
    superlativ: 'am rentabelsten',
    example: {
      de: 'Ohne staatliche Förderung wäre die Anlage kaum rentabel zu betreiben.',
      en: 'Without state subsidies, the plant could hardly be operated profitably.'
    }
  },
  {
    id: 'b2.a.063',
    de: 'rücksichtsvoll',
    en: 'considerate',
    komparativ: 'rücksichtsvoller',
    superlativ: 'am rücksichtsvollsten',
    example: {
      de: 'Ein rücksichtsvoller Umgang miteinander würde viele Konflikte gar nicht erst entstehen lassen.',
      en: 'Treating each other considerately would prevent many conflicts from arising in the first place.'
    }
  },
  {
    id: 'b2.a.064',
    de: 'sachlich',
    en: 'objective, factual',
    komparativ: 'sachlicher',
    superlativ: 'am sachlichsten',
    example: {
      de: 'Bleiben Sie in der Diskussion sachlich, auch wenn Sie anderer Meinung sind.',
      en: 'Stay factual in the discussion, even if you are of a different opinion.'
    }
  },
  {
    id: 'b2.a.065',
    de: 'selbstbewusst',
    en: 'self-confident',
    komparativ: 'selbstbewusster',
    superlativ: 'am selbstbewusstesten',
    example: {
      de: 'Im Vorstellungsgespräch trat die junge Bewerberin erstaunlich selbstbewusst auf.',
      en: 'In the job interview, the young applicant came across as astonishingly self-confident.'
    }
  },
  {
    id: 'b2.a.066',
    de: 'sinnvoll',
    en: 'sensible, meaningful',
    komparativ: 'sinnvoller',
    superlativ: 'am sinnvollsten',
    example: {
      de: 'Es wäre sinnvoller, in Prävention zu investieren, statt nur Schäden zu beheben.',
      en: 'It would be more sensible to invest in prevention instead of just repairing damage.'
    }
  },
  {
    id: 'b2.a.067',
    de: 'sorgfältig',
    en: 'careful, meticulous',
    komparativ: 'sorgfältiger',
    superlativ: 'am sorgfältigsten',
    example: {
      de: 'Prüfen Sie die Vertragsbedingungen sorgfältig, bevor Sie den Kredit aufnehmen.',
      en: 'Check the contract terms carefully before you take out the loan.'
    }
  },
  {
    id: 'b2.a.068',
    de: 'spürbar',
    en: 'noticeable, tangible',
    example: {
      de: 'Nach der Reform hat sich die Wartezeit auf einen Termin spürbar verkürzt.',
      en: 'After the reform, the waiting time for an appointment has shortened noticeably.'
    }
  },
  {
    id: 'b2.a.069',
    de: 'stabil',
    en: 'stable',
    komparativ: 'stabiler',
    superlativ: 'am stabilsten',
    example: {
      de: 'Trotz der weltweiten Krisen blieb der deutsche Arbeitsmarkt erstaunlich stabil.',
      en: 'Despite the global crises, the German labour market remained astonishingly stable.'
    }
  },
  {
    id: 'b2.a.070',
    de: 'ständig',
    en: 'constant, permanent',
    example: {
      de: 'Der ständige Vergleich mit anderen macht viele Jugendliche zunehmend unzufrieden.',
      en: 'The constant comparison with others makes many young people increasingly dissatisfied.'
    }
  },
  {
    id: 'b2.a.071',
    de: 'stichhaltig',
    en: 'sound, valid (argument)',
    komparativ: 'stichhaltiger',
    superlativ: 'am stichhaltigsten',
    example: {
      de: 'Für ein vollständiges Verbot fehlen bislang stichhaltige wissenschaftliche Argumente.',
      en: 'So far, sound scientific arguments for a complete ban are lacking.'
    }
  },
  {
    id: 'b2.a.072',
    de: 'tiefgreifend',
    en: 'profound, far-reaching',
    komparativ: 'tiefgreifender',
    superlativ: 'am tiefgreifendsten',
    example: {
      de: 'Die Digitalisierung hat tiefgreifende Veränderungen in der Arbeitswelt ausgelöst.',
      en: 'Digitalisation has triggered profound changes in the world of work.'
    }
  },
  {
    id: 'b2.a.073',
    de: 'transparent',
    en: 'transparent',
    komparativ: 'transparenter',
    superlativ: 'am transparentesten',
    example: {
      de: 'Die Bürger fordern, dass politische Entscheidungen transparenter getroffen werden.',
      en: 'Citizens are demanding that political decisions be made more transparently.'
    }
  },
  {
    id: 'b2.a.074',
    de: 'üblich',
    en: 'usual, customary',
    example: {
      de: 'In der Branche ist es leider üblich, unbezahlte Überstunden stillschweigend hinzunehmen.',
      en: 'In the industry it is unfortunately customary to tacitly accept unpaid overtime.'
    }
  },
  {
    id: 'b2.a.075',
    de: 'überflüssig',
    en: 'superfluous, unnecessary',
    example: {
      de: 'Vieles, was wir kaufen, erweist sich später als völlig überflüssig.',
      en: 'Much of what we buy later turns out to be completely superfluous.'
    }
  },
  {
    id: 'b2.a.076',
    de: 'überzeugend',
    en: 'convincing',
    komparativ: 'überzeugender',
    superlativ: 'am überzeugendsten',
    example: {
      de: 'Ihre Argumentation war so überzeugend, dass selbst die Kritiker am Ende zustimmten.',
      en: 'Her argumentation was so convincing that even the critics agreed in the end.'
    }
  },
  {
    id: 'b2.a.077',
    de: 'umfangreich',
    en: 'extensive, comprehensive',
    komparativ: 'umfangreicher',
    superlativ: 'am umfangreichsten',
    example: {
      de: 'Vor der endgültigen Entscheidung wurde ein umfangreiches Gutachten in Auftrag gegeben.',
      en: 'Before the final decision, an extensive expert report was commissioned.'
    }
  },
  {
    id: 'b2.a.078',
    de: 'umstritten',
    en: 'controversial, disputed',
    komparativ: 'umstrittener',
    superlativ: 'am umstrittensten',
    example: {
      de: 'Der Einsatz von Gentechnik in der Landwirtschaft bleibt höchst umstritten.',
      en: 'The use of genetic engineering in agriculture remains highly controversial.'
    }
  },
  {
    id: 'b2.a.079',
    de: 'umweltfreundlich',
    en: 'environmentally friendly',
    komparativ: 'umweltfreundlicher',
    superlativ: 'am umweltfreundlichsten',
    example: {
      de: 'Die Bahn gilt nach wie vor als eines der umweltfreundlichsten Verkehrsmittel überhaupt.',
      en: 'The railway is still considered one of the most environmentally friendly means of transport of all.'
    }
  },
  {
    id: 'b2.a.080',
    de: 'unabhängig',
    en: 'independent',
    komparativ: 'unabhängiger',
    superlativ: 'am unabhängigsten',
    example: {
      de: 'Eine unabhängige Kommission soll die Vorwürfe gegen die Behörde prüfen.',
      en: 'An independent commission is to examine the accusations against the authority.'
    }
  },
  {
    id: 'b2.a.081',
    de: 'unerlässlich',
    en: 'indispensable, essential',
    example: {
      de: 'Gründliche Vorbereitung ist unerlässlich, wenn man die Prüfung bestehen will.',
      en: 'Thorough preparation is essential if you want to pass the exam.'
    }
  },
  {
    id: 'b2.a.082',
    de: 'ungewöhnlich',
    en: 'unusual',
    komparativ: 'ungewöhnlicher',
    superlativ: 'am ungewöhnlichsten',
    example: {
      de: 'Für diese Jahreszeit sind derart hohe Temperaturen höchst ungewöhnlich.',
      en: 'Such high temperatures are highly unusual for this time of year.'
    }
  },
  {
    id: 'b2.a.083',
    de: 'unvermeidlich',
    en: 'unavoidable, inevitable',
    example: {
      de: 'Konflikte sind im Berufsleben unvermeidlich; entscheidend ist der Umgang mit ihnen.',
      en: 'Conflicts are unavoidable in professional life; what matters is how you deal with them.'
    }
  },
  {
    id: 'b2.a.084',
    de: 'unverzichtbar',
    en: 'indispensable',
    example: {
      de: 'Fremdsprachenkenntnisse sind in international tätigen Unternehmen inzwischen unverzichtbar.',
      en: 'Foreign language skills are now indispensable in internationally active companies.'
    }
  },
  {
    id: 'b2.a.085',
    de: 'verantwortungsbewusst',
    en: 'responsible, conscious of responsibility',
    komparativ: 'verantwortungsbewusster',
    superlativ: 'am verantwortungsbewusstesten',
    example: {
      de: 'Ein verantwortungsbewusster Umgang mit Ressourcen beginnt bereits im eigenen Haushalt.',
      en: 'A responsible use of resources begins in your own household.'
    }
  },
  {
    id: 'b2.a.086',
    de: 'verbindlich',
    en: 'binding',
    komparativ: 'verbindlicher',
    superlativ: 'am verbindlichsten',
    example: {
      de: 'Die Anmeldung wird erst mit der Zahlung der Gebühr verbindlich.',
      en: 'The registration only becomes binding upon payment of the fee.'
    }
  },
  {
    id: 'b2.a.087',
    de: 'verlässlich',
    en: 'reliable, dependable',
    komparativ: 'verlässlicher',
    superlativ: 'am verlässlichsten',
    example: {
      de: 'Verlässliche Zahlen zur tatsächlichen Zahl der Betroffenen fehlen bislang völlig.',
      en: 'Reliable figures on the actual number of those affected are so far completely lacking.'
    }
  },
  {
    id: 'b2.a.088',
    de: 'vermutlich',
    en: 'presumable, probable',
    example: {
      de: 'Die Verhandlungen werden sich vermutlich noch über mehrere Wochen hinziehen.',
      en: 'The negotiations will presumably drag on for several more weeks.'
    }
  },
  {
    id: 'b2.a.089',
    de: 'vernünftig',
    en: 'reasonable, sensible',
    komparativ: 'vernünftiger',
    superlativ: 'am vernünftigsten',
    example: {
      de: 'Es wäre vernünftiger, das Geld in Bildung statt in Prestigeprojekte zu stecken.',
      en: 'It would be more reasonable to put the money into education instead of prestige projects.'
    }
  },
  {
    id: 'b2.a.090',
    de: 'vertraulich',
    en: 'confidential',
    example: {
      de: 'Alle Angaben werden selbstverständlich vertraulich behandelt und nicht an Dritte weitergegeben.',
      en: 'All information is of course treated confidentially and not passed on to third parties.'
    }
  },
  {
    id: 'b2.a.091',
    de: 'vielfältig',
    en: 'diverse, varied',
    komparativ: 'vielfältiger',
    superlativ: 'am vielfältigsten',
    example: {
      de: 'Die Ursachen für den Lehrermangel sind vielfältiger, als oft angenommen wird.',
      en: 'The causes of the teacher shortage are more varied than is often assumed.'
    }
  },
  {
    id: 'b2.a.092',
    de: 'vorbildlich',
    en: 'exemplary',
    komparativ: 'vorbildlicher',
    superlativ: 'am vorbildlichsten',
    example: {
      de: 'Die kleine Gemeinde gilt beim Ausbau der Radwege als geradezu vorbildlich.',
      en: 'The small municipality is regarded as downright exemplary in expanding its cycle paths.'
    }
  },
  {
    id: 'b2.a.093',
    de: 'vorläufig',
    en: 'provisional, preliminary',
    example: {
      de: 'Die Behörde hat den Betrieb der umstrittenen Anlage vorläufig untersagt.',
      en: 'The authority has provisionally prohibited the operation of the controversial plant.'
    }
  },
  {
    id: 'b2.a.094',
    de: 'wesentlich',
    en: 'essential, substantial',
    example: {
      de: 'Der Abschlussbericht enthält keine wesentlichen neuen Erkenntnisse zum Unfallhergang.',
      en: 'The final report contains no substantial new findings on the course of the accident.'
    }
  },
  {
    id: 'b2.a.095',
    de: 'wettbewerbsfähig',
    en: 'competitive',
    komparativ: 'wettbewerbsfähiger',
    superlativ: 'am wettbewerbsfähigsten',
    example: {
      de: 'Ohne Investitionen in Forschung bleibt die Industrie langfristig nicht wettbewerbsfähig.',
      en: 'Without investment in research, the industry will not remain competitive in the long term.'
    }
  },
  {
    id: 'b2.a.096',
    de: 'widersprüchlich',
    en: 'contradictory',
    komparativ: 'widersprüchlicher',
    superlativ: 'am widersprüchlichsten',
    example: {
      de: 'Die Aussagen der Zeugen waren so widersprüchlich, dass der Prozess vertagt wurde.',
      en: 'The statements of the witnesses were so contradictory that the trial was adjourned.'
    }
  },
  {
    id: 'b2.a.097',
    de: 'wirksam',
    en: 'effective',
    komparativ: 'wirksamer',
    superlativ: 'am wirksamsten',
    example: {
      de: 'Aufklärung ist langfristig wirksamer als jedes noch so strenge Verbot.',
      en: 'In the long run, education is more effective than any ban, however strict.'
    }
  },
  {
    id: 'b2.a.098',
    de: 'wirtschaftlich',
    en: 'economic, economical',
    komparativ: 'wirtschaftlicher',
    superlativ: 'am wirtschaftlichsten',
    example: {
      de: 'Die neue Anlage arbeitet deutlich wirtschaftlicher als das alte Kraftwerk.',
      en: 'The new facility operates considerably more economically than the old power plant.'
    }
  },
  {
    id: 'b2.a.099',
    de: 'zahlreich',
    en: 'numerous',
    example: {
      de: 'Zahlreiche Studien belegen den Nutzen von frühkindlicher Sprachförderung.',
      en: 'Numerous studies prove the benefits of early childhood language support.'
    }
  },
  {
    id: 'b2.a.100',
    de: 'zeitaufwendig',
    en: 'time-consuming',
    komparativ: 'zeitaufwendiger',
    superlativ: 'am zeitaufwendigsten',
    example: {
      de: 'Die Pflege des großen Gartens ist zeitaufwendiger, als er gedacht hatte.',
      en: 'Maintaining the large garden is more time-consuming than he had thought.'
    }
  }
];

export const B2_VOCAB: VocabBank = {
  verbs: B2_VERBS,
  nouns: B2_NOUNS,
  adjectives: B2_ADJECTIVES,
  prepVerbs: B2_PREP_VERBS,
  caseItems: B2_CASE_ITEMS
};
