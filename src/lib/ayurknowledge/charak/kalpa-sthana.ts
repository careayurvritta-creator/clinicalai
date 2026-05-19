import type { CharakChapter } from './types'

export const KALPA_STHANA: CharakChapter[] = [
  {
    id: 'kalpa-1',
    sthana: 'Kalpa Sthana',
    chapterNumber: 1,
    name: 'Madanakalpa Adhyaya',
    sanskrit: 'मदनकल्प अध्याय',
    english: 'Pharmaceutical Preparations of Madanaphala',
    summary: 'This chapter describes pharmaceutical preparations of Madanaphala (Randia dumetorum), the foremost emetic drug in Ayurveda. It details various formulations processed in different media including milk, decoctions, and fermented liquids for therapeutic emesis (vamana karma). Madanaphala is considered the best emetic due to its balanced action on all three doshas and minimal side effects.',
    keyConcepts: [
      'Madanaphala (Randia dumetorum) is the foremost emetic drug (vamaka dravya)',
      'Emetic drugs are constituted by agni and vayu mahabhutas',
      'Pre-emesis preparation requires snehana (oleation) and swedana (fomentation)',
      'The emetic mechanism involves drugs reaching the heart, circulating via blood vessels, liquefying morbid matter, and expelling doshas through the oral route',
      'Madanaphala has tridoshahara karma with special affinity for kapha',
      'Fruits collected at proper maturity ensure maximum potency',
      'Formulations include pills (vati), powders (churna), decoctions (kwatha), and linctus (lehya)'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ madanakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Madanakalpa" (Pharmaceutical preparations of Madanaphala). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on pharmaceutical preparations of Madanaphala, the principal emetic drug.'
      },
      {
        number: '4',
        sanskrit: 'madanaphalaṁ vamanārthaṁ prayojayet | tacca kaphapittaharaṁ laghu rūkṣaṁ kaṭuvipākam',
        translation: 'Madanaphala should be administered for emesis. It alleviates kapha and pitta, is light and dry in quality, with pungent post-digestive effect.',
        commentary: 'Describes the fundamental pharmacological properties that make Madanaphala the ideal emetic drug.'
      },
      {
        number: '7',
        sanskrit: 'tasya phalaṁ pacyamānaṁ śuklatvaṁ āpadyate | tacca suśuṣkaṁ cūrṇīkṛtya kalpayet',
        translation: 'The fruit when ripened becomes white. That well-dried fruit should be powdered and prepared as formulation.',
        commentary: 'Instructions for proper harvesting and preparation of Madanaphala fruit for pharmaceutical use.'
      }
    ],
    topics: [
      {
        title: 'Madanaphala Plant Profile',
        content: 'Madanaphala (Randia dumetorum) belongs to Rubiaceae family. The fruit is the primary therapeutic part used for emesis. Synonyms include Trikantaka, Kapitana, and Phala. The tree is found throughout India in deciduous forests.',
        clinicalRelevance: 'Proper identification and collection of the correct plant part at the right maturity is essential for therapeutic efficacy.'
      },
      {
        title: 'Emetic Drug Properties',
        content: 'Emetic drugs possess ushna (hot), tikshna (sharp), sukshma (subtle), vyavayi (pervading), and vikashi (loosening) properties. These qualities enable the drug to liquefy accumulated doshas and move them upward for expulsion through vamana.',
        clinicalRelevance: 'Understanding drug properties helps in selecting appropriate emetic drugs for different dosha constitutions.'
      },
      {
        title: 'Pre-emesis Preparation',
        content: 'Before vamana karma, the patient must undergo snehana (internal and external oleation) and swedana (fomentation therapy). This prepares the body by liquefying doshas and moving them from peripheral tissues to the gastrointestinal tract for elimination.',
        clinicalRelevance: 'Proper purvakarma (pre-procedure preparation) is essential for successful vamana and preventing complications.'
      }
    ],
    doshaDiscussion: [
      'Madanaphala primarily alleviates kapha and pitta doshas',
      'Its katu vipaka (pungent post-digestive effect) helps in kapha dissolution',
      'The drug acts on vata through its ushna virya (hot potency)',
      'Tridoshahara action makes it suitable for all prakriti types'
    ],
    treatmentProtocols: [
      {
        condition: 'Kapha disorders (Kaphaja roga)',
        treatment: 'Vamana karma with Madanaphala preparations',
        herbs: ['Madanaphala', 'Yashtimadhu', 'Saindhava', 'Madhu (honey)'],
        dosage: 'Madanaphala churna 10-15g with honey and warm water',
        duration: 'Single procedure with pre and post care over 7 days',
        precautions: ['Contraindicated in pregnancy', 'Avoid in severe vata disorders', 'Monitor for excessive emesis']
      },
      {
        condition: 'Kapha-Pitta disorders',
        treatment: 'Vamana with Madanaphala processed in milk',
        herbs: ['Madanaphala', 'Ksheera (milk)', 'Madhuka', 'Pippali'],
        dosage: 'Madanaphala ksheera preparation 200-300ml',
        duration: 'Single administration with 3 days post-procedure care',
        precautions: ['Assess agni strength before procedure', 'Ensure proper snehana-swedana completion']
      },
      {
        condition: 'Respiratory disorders (Shwasa-Kasa)',
        treatment: 'Emesis with Madanaphala decoction',
        herbs: ['Madanaphala', 'Vasa', 'Kantakari', 'Talisadi churna'],
        dosage: 'Decoction of Madanaphala 40-60ml',
        duration: 'As per severity, 1-3 sessions',
        precautions: ['Avoid during acute respiratory distress', 'Monitor respiratory function']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Madanaphala is the foremost among emetic drugs due to its balanced tridoshahara action',
      'The fruit should be collected when ripe and dried properly for maximum potency',
      'Snehana and swedana are mandatory prerequisites before vamana karma'
    ],
    clinicalApplications: [
      'Vamana karma for kapha disorders',
      'Preparations for respiratory diseases',
      'Treatment of skin diseases with kapha predominance',
      'Management of obesity and metabolic disorders',
      'Purvakarma for panchakarma procedures'
    ]
  },
  {
    id: 'kalpa-2',
    sthana: 'Kalpa Sthana',
    chapterNumber: 2,
    name: 'Jimutaka Kalpa Adhyaya',
    sanskrit: 'जीमुतक कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Jimutaka',
    summary: 'This chapter describes 39 pharmaceutical formulations of Jimutaka (Luffa echinata Roxb.) for therapeutic emesis. Jimutaka produces emesis at relatively smaller doses compared to Madanaphala and has tridoshahara karma. The fruits and flowers are the therapeutically useful parts, while leaves and branches are not effective for vamanakarma.',
    keyConcepts: [
      'Jimutaka (Luffa echinata) is one of six emetic drugs described in Kalpa Sthana',
      'Jimutaka has stronger emetic potency than Madanaphala at smaller doses',
      'The drug possesses tridoshahara karma - addresses all three doshas',
      '39 formulations include preparations in milk, alcohol, water, whey, buttermilk, and ghee',
      'Proper soil quality, harvesting season, and storage enhance drug potency',
      'Male and female varieties have different therapeutic applications',
      'Anupana (adjuvant) selection varies by predominant dosha'
    ],
    shlokas: [
      {
        number: '3',
        sanskrit: 'jīmutakasya kalpaṁ vyākhyāsyāmaḥ | garagarī veṇī devatāḍakamākhyāḥ',
        translation: 'I shall describe the pharmaceutics of Jimutaka. Garagari, Veni, and Devatadaka are its synonyms.',
        commentary: 'Establishes the synonyms of Jimutaka for proper identification in clinical practice.'
      },
      {
        number: '4',
        sanskrit: 'jīmutakaṁ doṣaharaṁ sarvadoṣeṣu yojayet | jvaraśvāsahikkādiṣu kaphapittanibarhaṇam',
        translation: 'Jimutaka administered with appropriate drugs cures conditions caused by all three doshas. It is indicated in fever, dyspnea, hiccup, and similar disorders.',
        commentary: 'Core verse establishing Jimutaka as tridoshahara with specific clinical indications.'
      },
      {
        number: '5-7',
        sanskrit: 'kṣīreṇa puṣpairbhavati payasā ca tathā | navaphalānāṁ kṣīrasarasānāṁ ca',
        translation: 'Flowers prepared with milk; milky gruel from freshly appeared fruits; milk cream from hairy fruits; curd from non-hairy fruits.',
        commentary: 'Describes the 6 milk-based preparations and their specific applications based on fruit maturity.'
      },
      {
        number: '9',
        sanskrit: 'guḍūcyādi kṣārairvāpi yojayet kolaṁ pramāṇam',
        translation: 'Two or three fruits squeezed into decoctions of Guduchi, Yashti, Kovidara, and other drugs, kept overnight and strained.',
        commentary: 'Details the 12 decoction-based preparations using the Guduchi group of drugs.'
      },
      {
        number: '14-15',
        sanskrit: 'pañcāśatprayuktānāṁ vidhiṁ vakṣyāmi yonim',
        translation: 'I shall describe the method of using fifty formulations. Total 39 preparations are described.',
        commentary: 'Summary verse indicating the comprehensive nature of formulations described.'
      }
    ],
    topics: [
      {
        title: 'Jimutaka Plant Profile',
        content: 'Jimutaka (Luffa echinata Roxb.) belongs to Cucurbitaceae family. Synonyms include Devadali, Garagari, Devatadaka, Veni, Karkati, Vrittakosha. The fruit is ellipsoid (3-5 x 1.5-3 cm) covered with needle-like outgrowths. Flowering occurs September-December. Found in Diu, Gujarat, Rajasthan, Pakistan, and Tropical Africa.',
        clinicalRelevance: 'Proper identification using synonyms ensures correct drug procurement and preparation.'
      },
      {
        title: 'Pharmacological Profile',
        content: 'Rasa: Katu (pungent), Tikta (bitter). Guna: Laghu (light), Ruksha (dry). Veerya: Ushna (hot). Vipaka: Katu (pungent). Chemical constituents include chrysoeriol and glycosides (principal flavonoids), cucurbitacin B, triterpene alcohols, oleanolic acid-based saponin, echinatin, echinatol-A & B, β-sitosterol.',
        clinicalRelevance: 'The hot potency and pungent taste explain its emetic and kapha-destroying properties.'
      },
      {
        title: 'Emetic Mechanism',
        content: 'Emetic drugs reach the heart, circulate via blood vessels, liquefy morbid matter, separate doshas from channels, and bring them to koshtha (GI tract) for expulsion. Jimutaka possesses ushna (hot), tikshna (sharp), sukshma (subtle), vyavayi (pervading), and vikashi (loosening) properties.',
        clinicalRelevance: 'Understanding the mechanism helps in predicting drug action and managing complications.'
      }
    ],
    doshaDiscussion: [
      'Jimutaka has tridoshahara karma - addresses all three doshas',
      'Katu rasa and ushna virya make it especially effective for kapha',
      'Tikta rasa provides pitta-shamaka action',
      'Laghu and ruksha guna help in vata disorders when combined with appropriate anupana'
    ],
    treatmentProtocols: [
      {
        condition: 'Kaphaja Jwara (Kapha fever)',
        treatment: 'Vamana with Jimutaka milk preparations',
        herbs: ['Jimutaka flowers', 'Ksheera (milk)', 'Madhuka', 'Pippali'],
        dosage: 'Jimutaka shukti dose ~20g for vata-pitta conditions',
        duration: 'Single administration with post-procedure care',
        precautions: ['Contraindicated in pregnancy', 'Avoid in severe debility', 'Monitor emesis quality']
      },
      {
        condition: 'Shwasa (Dyspnea/Asthma)',
        treatment: 'Emesis with Jimutaka decoction preparations',
        herbs: ['Jimutaka', 'Vasa', 'Kantakari', 'Talisadi'],
        dosage: 'Jimutaka powder 1-3g (non-emetic dose) or as per emetic protocol',
        duration: 'As per clinical severity',
        precautions: ['Assess respiratory function before procedure', 'Have emergency measures available']
      },
      {
        condition: 'Kushtha (Skin diseases)',
        treatment: 'Vamana with Jimutaka impregnated with Snuhi latex',
        herbs: ['Jimutaka', 'Snuhi latex (Euphorbia nerifolia)', 'Ksheera'],
        dosage: 'Fruit impregnated with Snuhi latex 7 times, 125mg with milk on salt-free diet',
        duration: 'Course of treatment varies by disease severity',
        precautions: ['Strict salt-free diet during treatment', 'Monitor for skin reactions']
      },
      {
        condition: 'Pandu (Anemia)',
        treatment: 'Emesis with Jimutaka preparations in milk',
        herbs: ['Jimutaka', 'Ksheera', 'Draksha', 'Amalaka'],
        dosage: 'Jimutaka powder with milk adjuvant',
        duration: 'As per disease severity',
        precautions: ['Monitor hemoglobin levels', 'Assess liver function']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kamala (Jaundice)',
        sanskrit: 'कामला',
        etiology: 'Aggravated pitta affecting rakta dhatu and liver function',
        symptoms: ['Yellow discoloration of skin and eyes', 'Dark urine', 'Weakness', 'Loss of appetite'],
        prognosis: 'Sadhyasadhya (curable with proper treatment)',
        treatment: 'Jimutaka nasal drops preparation - water-soaked dry fruits reduced bilirubin and SGPT within 3-7 days'
      }
    ],
    importantVerses: [
      'Jimutaka has stronger emetic potency than Madanaphala at smaller doses',
      'The fruits and flowers are the therapeutically useful parts for emesis',
      'Leaves and branches are not effective for vamanakarma',
      'Anupana selection varies by predominant dosha - milk for pitta, honey for kapha, wine for vata'
    ],
    clinicalApplications: [
      'Vamana karma for kapha disorders at lower doses',
      'Treatment of jaundice and liver disorders (nasal drops preparation)',
      'Management of skin diseases with kapha-pitta predominance',
      'Anti-arthritic applications',
      'Hepatoprotective therapy',
      'Treatment of edema and parasitic conditions'
    ]
  },
  {
    id: 'kalpa-3',
    sthana: 'Kalpa Sthana',
    chapterNumber: 3,
    name: 'Ikshvaku Kalpa Adhyaya',
    sanskrit: 'इक्ष्वाकु कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Ikshvaku',
    summary: 'This chapter details 45 pharmaceutical preparations of Ikshvaku (Lagenaria siceraria / Bottle Gourd) processed in diverse media including milk, alcohol, whey, buttermilk, oil cake, clarified butter, and meat soup. The leaves, flowers, and seeds are employed for therapeutic emesis. One notable recipe involves incremental dosing of seeds from fifty up to one hundred per day.',
    keyConcepts: [
      'Ikshvaku (Lagenaria siceraria) is a key emetic drug in the Kalpa Sthana',
      '45 formulations are described across multiple pharmaceutical bases',
      'Both sweet (vegetable) and bitter (medicinal) varieties exist',
      'Progressive seed dosing from 50-100 seeds per day is a unique feature',
      'Inhalation method using flower powder sprinkled on garland for delicate patients',
      'The drug has Pittahara and Hridya (cardio-protective) properties',
      'Cold potency (Sheeta veerya) distinguishes it from other emetic drugs'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athāta ikṣvākukalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātrēyaḥ',
        translation: 'Now we shall expound the chapter "Ikshvaku kalpa" (Pharmaceutical preparations of Ikshvaku). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Ikshvaku preparations.'
      },
      {
        number: '4-5',
        sanskrit: 'ikṣvākuṁ vamanārthaṁ prayojayet | kāsaśvāsavamanajvaraviṣeṣu',
        translation: 'It is recommended for purpose of emesis in patients suffering from cough, dyspnea, poisoning, vomiting and fever.',
        commentary: 'Establishes the clinical indications for Ikshvaku emesis.'
      },
      {
        number: '7',
        sanskrit: 'ekāṁ bhāgaṁ svarasaṁ tribhāgaṁ kṣīraṁ saṁyuktam',
        translation: 'One part expressed fruit juice boiled with three parts milk, administered for kapha accumulation in chest.',
        commentary: 'Describes the milk-juice preparation for respiratory conditions.'
      }
    ],
    topics: [
      {
        title: 'Ikshvaku Plant Profile',
        content: 'Ikshvaku (Lagenaria siceraria) belongs to Cucurbitaceae family. Synonyms: Lamba, Katukalabu, Tumbi, Pindaphala, Phalini, Katutumbi, Mahaphala, Tumbini, Tiktabeeja, Alabu. It is a tendrillar climber up to 10m long. Fruit is variable in shape—club-shaped up to 75 cm or bottle/dumbbell-shaped.',
        clinicalRelevance: 'Multiple synonyms help in identification across different regions and texts.'
      },
      {
        title: 'Progressive Seed Dosing Protocol',
        content: 'A unique dosing protocol starts with 50 seeds and increases by 10 daily up to 100 seeds. Each dose is combined with decoctions of successive emetic drugs: 50 seeds with Madanaphala, 60 with Jimutaka, 70 with Ikshvaku, 80 with Dhamargava, 90 with Indrayava, 100 with Kritavedhana.',
        clinicalRelevance: 'Progressive dosing allows tolerance building and comprehensive dosha elimination.'
      },
      {
        title: 'Inhalation Method for Delicate Patients',
        content: 'For patients too weak for oral emesis, dried flower juice and powdered dried flowers are sprinkled on a garland and inhaled. This gentler method induces emesis without the force of oral administration.',
        clinicalRelevance: 'Provides alternative emesis method for pediatric, geriatric, or debilitated patients.'
      }
    ],
    doshaDiscussion: [
      'Ikshvaku has Pittahara (pitta-pacifying) action due to Sheeta veerya (cold potency)',
      'Tikta rasa and Laghu guna provide kapha-shamaka action',
      'Katu vipaka helps in long-term dosha balance',
      'Hridya (cardio-protective) property makes it suitable for cardiac-related dosha disorders'
    ],
    treatmentProtocols: [
      {
        condition: 'Kapha accumulation in chest (Urah kapha)',
        treatment: 'Vamana with Ikshvaku juice-milk preparation',
        herbs: ['Ikshvaku fruit juice', 'Ksheera (milk)', 'Madhuka', 'Pippali'],
        dosage: 'One part fruit juice with three parts milk, 200-300ml',
        duration: 'Single administration',
        precautions: ['Assess chest congestion severity', 'Monitor respiratory function']
      },
      {
        condition: 'Delicate patients (Sukumara)',
        treatment: 'Inhalation emesis with Ikshvaku flower powder',
        herbs: ['Ikshvaku dried flowers', 'Utpala (water lily)'],
        dosage: 'Flower powder sprinkled on garland for inhalation',
        duration: 'Single session',
        precautions: ['Ensure patient comfort', 'Have emergency measures available']
      },
      {
        condition: 'Progressive dosha elimination',
        treatment: 'Six-day progressive seed dosing protocol',
        herbs: ['Ikshvaku seeds', 'Madanaphala', 'Jimutaka', 'Dhamargava', 'Indrayava', 'Kritavedhana'],
        dosage: 'Day 1: 50 seeds, Day 2: 60, Day 3: 70, Day 4: 80, Day 5: 90, Day 6: 100',
        duration: '6 days with post-procedure care',
        precautions: ['Monitor daily tolerance', 'Adjust if adverse reactions occur']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Ashmari (Calculi)',
        sanskrit: 'अश्मरी',
        etiology: 'Vata-kapha imbalance affecting urinary system',
        symptoms: ['Urinary obstruction', 'Pain in lower abdomen', 'Difficulty in urination'],
        prognosis: 'Sadhyasadhya (curable in early stages)',
        treatment: 'Ikshvaku seed powder with honey and sheep\'s milk for 7 days'
      }
    ],
    importantVerses: [
      'King Vamaka considered Katutumbi (Ikshvaku) the best emetic',
      'Lord Atreya concluded Madanaphala is superior because it applies to more disease conditions',
      'Progressive dosing from 50-100 seeds ensures comprehensive dosha elimination'
    ],
    clinicalApplications: [
      'Vamana karma for kapha disorders',
      'Treatment of respiratory conditions (cough, dyspnea)',
      'Management of poisoning cases',
      'Gentle emesis for delicate patients via inhalation',
      'Progressive dosing protocol for chronic conditions',
      'Anti-hyperglycemic and cardioprotective applications'
    ]
  },
  {
    id: 'kalpa-4',
    sthana: 'Kalpa Sthana',
    chapterNumber: 4,
    name: 'Dhamargava Kalpa Adhyaya',
    sanskrit: 'धामार्गव कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Dhamargava',
    summary: 'This chapter describes 60 pharmaceutical preparations of Dhamargava (Luffa cylindrica / Sponge Gourd) for therapeutic emesis. Dhamargava is classified as a vamaka drug with ubhaytobhagahara prabhava (both emetic and purgative action). Rishi Gautam considers it the best drug because of its kapha-pitta nashaka property.',
    keyConcepts: [
      'Dhamargava (Luffa cylindrica) has ubhaytobhagahara prabhava - both emetic and purgative action',
      '60 formulations are described - the largest number among Kalpa Sthana chapters',
      'Two varieties exist: Tikta (wild, medicinal) and Madhura (sweet, vegetable)',
      'Predominant mahabhutas are agni and vayu, facilitating upward dosha movement',
      'Uses include vamana and asthapana basti therapy',
      'One of 19 phalini dravyas (fruit-bearing drugs)',
      'Chemical constituents include cucurbitacin saponins and flavonoids'
    ],
    shlokas: [
      {
        number: '3',
        sanskrit: 'karkoṭakī koṭhaphalaṁ mahājalīnī rājakōśātakī dhāmārgravasyākhyāḥ',
        translation: 'Karkotaki, Kothaphala, Mahajalini, and Rajakoshataki are synonyms for Dhamargava.',
        commentary: 'Establishes synonyms for proper drug identification across pharmacopoeias.'
      },
      {
        number: '4-5',
        sanskrit: 'gāraviṣagulmodararogeṣu kāsavātakapharogeṣu ca prayojayet',
        translation: 'Indicated for garavisha (artificial poisoning), gulma (abdominal lumps), udara roga (abdominal swellings), kasa (cough), vata seated in kapha location, and mental disorders.',
        commentary: 'Comprehensive list of clinical indications spanning multiple dosha patterns.'
      },
      {
        number: '6',
        sanskrit: 'pravalaṁ puṣpaṁ phalaṁ ca tasya upayojyam',
        translation: 'Tender leaves (pravala), flowers (pushpa), and fruits (phala) are the useful parts.',
        commentary: 'Specifies the therapeutically active plant parts for pharmaceutical preparation.'
      }
    ],
    topics: [
      {
        title: 'Sixty Formulations Breakdown',
        content: '9 tender leaf preparations, 4 milk-based, 1 alcohol/wine-based, 20 decoction-based, 1 paste (kalka), 12 cow/horse dung juice-based, 1 with food, 1 inhalation (ghreya), 10 linctus (lehya), 1 ghee (ghrita) - Total 60.',
        clinicalRelevance: 'The diverse formulation base allows customization for different patient constitutions and disease severity.'
      },
      {
        title: 'Kovidaradi Gana Companion Drugs',
        content: '8 drugs used in combination: Rakta Kanchanara (Bauhinia variegata), Shweta Kanchanara (Bauhinia purpurea), Kadamba (Anthocephalus indicus), Jalaveta (Salix tetrasperma), Kundaru (Boswellia serrata), Shanapushpi (Crotolaria verrucosa), Madara (Calotropis procera), Apamarga (Achyranthes aspera).',
        clinicalRelevance: 'These companion drugs enhance emetic action and provide additional therapeutic benefits.'
      },
      {
        title: 'Anti-inflammatory and Analgesic Properties',
        content: 'Fruit peel extract may inhibit cyclooxygenase (COX-2), suppressing prostaglandin synthesis. Flavonoids in ethanol extract contribute significantly to anti-inflammatory activity. Water decoction shows analgesic and sedative effects.',
        clinicalRelevance: 'Modern research validates traditional anti-inflammatory uses beyond emesis.'
      }
    ],
    doshaDiscussion: [
      'Dhamargava destroys kapha and pitta (kapha-pitta nashaka)',
      'Ushna virya (hot potency) helps in vata disorders',
      'Ubhaytobhagahara prabhava provides dual action on upper and lower GI tract',
      'Mental disorder applications suggest manovaha srotas action'
    ],
    treatmentProtocols: [
      {
        condition: 'Mental disorders (Mano vikara)',
        treatment: 'Emesis with Dhamargava decoction of mental disorder herbs',
        herbs: ['Dhamargava', 'Jati (Jasminum)', 'Haridra (Turmeric)', 'Punarnava', 'Bimbi'],
        dosage: '1-2 Dhamargava fruits powdered and added to decoction, filtered and taken as emetic',
        duration: 'As per disease severity',
        precautions: ['Monitor mental status', 'Have psychiatric support available']
      },
      {
        condition: 'Kapha-pitta fever',
        treatment: 'Emesis with Dhamargava + Jivakadi herbs',
        herbs: ['Dhamargava', 'Jivaka', 'Rishabhaka', 'Shatavari', 'Kakoli'],
        dosage: 'Dhamargava powder mixed with sugar and honey as linctus',
        duration: 'Single administration',
        precautions: ['Assess fever severity', 'Monitor temperature during procedure']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Gara Visha (Artificial poisoning)',
        sanskrit: 'गरविष',
        etiology: 'Ingestion of incompatible food combinations or artificial toxins',
        symptoms: ['Gradual onset of symptoms', 'Multiple organ involvement', 'Chronic course'],
        prognosis: 'Depends on severity and chronicity',
        treatment: 'Dhamargava emesis with specific herb combinations'
      }
    ],
    importantVerses: [
      'Rishi Gautam considers Dhamargava the best drug because of its kapha-pitta nashaka property',
      'Maharshi Atreya states the fruit is best for pandu (anemia)',
      '60 formulations represent the most comprehensive emetic preparation collection'
    ],
    clinicalApplications: [
      'Vamana karma for kapha-pitta disorders',
      'Treatment of mental disorders',
      'Management of poisoning cases',
      'Anti-inflammatory applications (COX-2 inhibition)',
      'Analgesic and sedative therapy',
      'Treatment of edema and abdominal disorders'
    ]
  },
  {
    id: 'kalpa-5',
    sthana: 'Kalpa Sthana',
    chapterNumber: 5,
    name: 'Vatsaka Kalpa Adhyaya',
    sanskrit: 'वत्सक कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Vatsaka',
    summary: 'This chapter describes 18 pharmaceutical preparations of Vatsaka (Holarrhena antidysenterica Linn. Wall.) for therapeutic emesis. Vatsaka is indicated for conditions involving raktapitta, kapha, vatarakta, visarpa, and is considered safe for delicate persons. The seeds are called Indrayava or Kalingaka.',
    keyConcepts: [
      'Vatsaka (Holarrhena antidysenterica) is safe for delicate persons',
      '18 formulations are described using decoctions, powders, waters, and krishara',
      'Male (Shweta Kutaja) and female (Krishna Kutaja) varieties have different properties',
      'Seeds called Indrayava or Kalingaka have specific therapeutic value',
      'The drug destroys raktapitta and kapha while being free from harmful effects',
      'Alkaloids (conessine ~0.4%) have powerful emetic and anti-amoebic action',
      'Average vamana reflex initiation time is 8 minutes'
    ],
    shlokas: [
      {
        number: '3-4',
        sanskrit: 'vatsakasya kalpaṁ vyākhyāsyāmaḥ | vatsakaḥ kuṭajaḥ śakraḥ vṛkṣakhaḥ girimallikā',
        translation: 'I shall describe the pharmaceutics of Vatsaka. Vatsaka, kutaja, shakra, vrikshaka, and girimallika are synonymous.',
        commentary: 'Establishes the comprehensive synonym list for proper drug identification.'
      },
      {
        number: '6',
        sanskrit: 'raktapittaṁ kaphaṁ hanti vātaraktaṁ visarpaṁ ca | hṛdrogaṁ jvaraṁ ca nāśayet',
        translation: 'Destroys raktapitta and kapha, alleviates vatarakta, visarpa, cardiac disorders, and fever.',
        commentary: 'Core therapeutic indications establishing the broad clinical utility of Vatsaka.'
      },
      {
        number: '9',
        sanskrit: 'indrayava cūrṇaṁ arkalatāyāṁ saptāhaṁ bhāvitam | jīvakakvāthena yojayet',
        translation: 'Seed powder impregnated with arka latex for eight days, then taken with jivaka decoction.',
        commentary: 'Describes the specialized preparation method for enhanced potency.'
      }
    ],
    topics: [
      {
        title: 'Male vs Female Plant Distinction',
        content: 'Male (Shweta Kutaja - Holarrhena antidysenterica): Big fruits in groups of two, not joined, white flowers, smooth leaves, bitter seeds. Female (Krishna Kutaja - Wrightia tinctoria): Fruits in groups of two joined at end, blackish/reddish flowers, sweet seeds.',
        clinicalRelevance: 'Proper identification of male vs female variety is essential for correct therapeutic application.'
      },
      {
        title: 'Pharmacological Profile',
        content: 'Rasa: Tikta (bitter), Kashaya (astringent). Guna: Laghu (light), Ruksha (dry). Veerya: Sheeta (cool). Vipaka: Katu (pungent). Total alkaloids ~4%; bioactive steroidal alkaloid conessine ~0.4%; kurchicine, conkurchine, holarrhine, kurchiline.',
        clinicalRelevance: 'Cool potency and bitter taste explain its effectiveness in bleeding disorders and pitta conditions.'
      },
      {
        title: 'Clinical Research on Acne',
        content: 'A study on therapeutic emesis with vatsaka indrayava kalpa in acne vulgaris found: average vega initiation time 8 minutes, average vamana reflex duration 6 seconds, mean vamaka dose 718.67 ml. Results were highly significant for lesion count, size, color, pain, itching, and burning.',
        clinicalRelevance: 'Modern clinical evidence supports traditional use in skin diseases with kapha-pitta predominance.'
      }
    ],
    doshaDiscussion: [
      'Vatsaka destroys raktapitta (pitta in blood) and kapha',
      'Sheeta veerya (cool potency) makes it ideal for pitta conditions',
      'Laghu and ruksha guna with tikta-kashaya rasa provide kapha-shamaka action',
      'Safe for delicate persons due to balanced action'
    ],
    treatmentProtocols: [
      {
        condition: 'Raktapitta (Bleeding disorders)',
        treatment: 'Vamana with Vatsaka decoction preparations',
        herbs: ['Vatsaka', 'Indrayava', 'Madhuka', 'Kovidaradi'],
        dosage: 'Antarnakhamushi (closed fist quantity) ~40g crushed seeds/fruits',
        duration: 'Single administration with post-procedure care',
        precautions: ['Monitor bleeding parameters', 'Assess pitta level before procedure']
      },
      {
        condition: 'Acne vulgaris (Yauvanapidika)',
        treatment: 'Therapeutic emesis with Vatsaka Indrayava kalpa',
        herbs: ['Indrayava (Vatsaka seeds)', 'Madhuka decoction', 'Saindhava', 'Madhu'],
        dosage: 'Indrayava churna 24g in madhuka decoction 160ml, with salt 10g and honey 25g',
        duration: 'Single procedure with follow-up',
        precautions: ['Assess acne severity', 'Monitor skin response post-procedure']
      },
      {
        condition: 'Visarpa (Erysipelas)',
        treatment: 'Emesis with Vatsaka preparations',
        herbs: ['Vatsaka', 'Guduchi', 'Amalaki', 'Draksha'],
        dosage: 'Vatsaka powder with appropriate decoction',
        duration: 'As per disease severity',
        precautions: ['Monitor skin condition', 'Assess pitta-kapha levels']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Visarpa (Erysipelas)',
        sanskrit: 'विसर्प',
        etiology: 'Aggravation of all three doshas, especially pitta and kapha, affecting skin and blood',
        symptoms: ['Spreading skin eruption', 'Burning sensation', 'Redness', 'Pain', 'Fever'],
        prognosis: 'Sadhyasadhya (curable with proper treatment)',
        treatment: 'Vamana with Vatsaka preparations to eliminate pitta and kapha'
      }
    ],
    importantVerses: [
      'Vatsaka destroys raktapitta and kapha while being free from harmful effects',
      'Safe for delicate persons - a unique advantage among emetic drugs',
      'Seeds (Indrayava) have specific therapeutic value distinct from the fruit'
    ],
    clinicalApplications: [
      'Vamana karma for pitta-kapha disorders',
      'Treatment of bleeding disorders (raktapitta)',
      'Management of acne vulgaris',
      'Therapy for skin diseases (kushtha, visarpa)',
      'Anti-dysenteric and anti-amoebic applications',
      'Safe emesis for debilitated patients'
    ]
  },
  {
    id: 'kalpa-6',
    sthana: 'Kalpa Sthana',
    chapterNumber: 6,
    name: 'Kritavedhana Kalpa Adhyaya',
    sanskrit: 'कृतवेधन कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Kritavedhana',
    summary: 'This chapter describes pharmaceutical preparations of Kritavedhana (Strychnos nux-vomica) for therapeutic emesis. Kritavedhana is the last of the six emetic drugs described in Kalpa Sthana and is used for conditions requiring strong emetic action. The drug requires careful preparation due to its potent alkaloids.',
    keyConcepts: [
      'Kritavedhana (Strychnos nux-vomica) is the sixth emetic drug in Kalpa Sthana',
      'Requires careful preparation due to strychnine and brucine alkaloids',
      'Used for conditions requiring strong emetic action',
      'Combined with other emetic drugs for enhanced safety and efficacy',
      'Progressive dosing protocol includes Kritavedhana at 100-seed dose level'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ kṛtavedhanakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Kritavedhana kalpa" (Pharmaceutical preparations of Kritavedhana). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Kritavedhana preparations.'
      }
    ],
    topics: [
      {
        title: 'Kritavedhana Plant Profile',
        content: 'Kritavedhana (Strychnos nux-vomica) belongs to Loganiaceae. The seeds contain strychnine and brucine alkaloids which are potent but toxic. Proper purification (shodhana) is essential before pharmaceutical use to reduce toxicity while maintaining therapeutic action.',
        clinicalRelevance: 'The toxic nature requires expert supervision and precise preparation methods.'
      }
    ],
    doshaDiscussion: [
      'Kritavedhana has strong kapha-shamaka action',
      'Used when milder emetics fail to achieve adequate dosha elimination',
      'Combined with other emetic drugs to balance potency and safety'
    ],
    treatmentProtocols: [
      {
        condition: 'Severe Kapha disorders',
        treatment: 'Emesis with Kritavedhana preparations under expert supervision',
        herbs: ['Kritavedhana (purified)', 'Madanaphala', 'Jimutaka'],
        dosage: 'As per physician prescription - requires careful titration',
        duration: 'Single administration with intensive monitoring',
        precautions: ['Toxicity risk - requires expert supervision', 'Emergency measures must be available', 'Contraindicated in children and elderly']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Kritavedhana completes the six emetic drugs of Kalpa Sthana',
      'Proper purification (shodhana) is essential before use',
      'Combined use with other emetic drugs enhances safety'
    ],
    clinicalApplications: [
      'Vamana karma for severe kapha disorders',
      'Cases where milder emetics are insufficient',
      'Progressive dosing protocol (100-seed dose level)',
      'Requires expert supervision due to toxicity potential'
    ]
  },
  {
    id: 'kalpa-7',
    sthana: 'Kalpa Sthana',
    chapterNumber: 7,
    name: 'Shyamatrivrita Kalpa Adhyaya',
    sanskrit: 'श्यामात्रिवृत कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Shyama and Trivrit',
    summary: 'This chapter describes pharmaceutical preparations of Shyama (Ipomoea turpethum) and Trivrit (Operculina turpethum) for therapeutic purgation (virechana karma). These are the primary purgative drugs in Ayurveda, used for eliminating pitta and vata doshas from the lower body.',
    keyConcepts: [
      'Shyama and Trivrit are the primary purgative (virechaka) drugs',
      'Used for conditions requiring elimination of pitta and vata',
      'Formulations include powders, decoctions, linctus, and pills',
      'Purgation therapy complements emesis for comprehensive dosha elimination',
      'The drugs act on purishavaha srotas (channels carrying feces)'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ śyāmātrivṛtkalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Shyamatrivrita kalpa" (Pharmaceutical preparations of Shyama and Trivrit). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on purgative drug preparations.'
      }
    ],
    topics: [
      {
        title: 'Virechana (Purgation) Therapy',
        content: 'Virechana is the second of the five panchakarma procedures. It eliminates pitta dosha from the body through the anal route. Shyama and Trivrit are the primary drugs used for this purpose. The therapy is indicated for pitta-predominant diseases.',
        clinicalRelevance: 'Understanding virechana therapy is essential for comprehensive panchakarma practice.'
      }
    ],
    doshaDiscussion: [
      'Shyama and Trivrit primarily eliminate pitta dosha',
      'Effective for vata disorders when combined with appropriate vehicles',
      'Act on purishavaha srotas (channels carrying feces)'
    ],
    treatmentProtocols: [
      {
        condition: 'Pitta-predominant disorders',
        treatment: 'Virechana karma with Shyama/Trivrit preparations',
        herbs: ['Shyama', 'Trivrit', 'Draksha', 'Amalaki', 'Madhu'],
        dosage: 'As per physician prescription based on disease and patient strength',
        duration: 'Single procedure with 3-7 days post-procedure care',
        precautions: ['Contraindicated in pregnancy', 'Avoid in severe vata disorders', 'Monitor purgation quality and quantity']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Shyama and Trivrit are the foremost purgative drugs in Ayurveda',
      'Virechana eliminates pitta dosha from the body',
      'Proper pre-procedure preparation ensures safe and effective purgation'
    ],
    clinicalApplications: [
      'Virechana karma for pitta disorders',
      'Treatment of skin diseases with pitta predominance',
      'Management of liver and gallbladder disorders',
      'Therapy for inflammatory conditions',
      'Complementary to vamana for comprehensive dosha elimination'
    ]
  },
  {
    id: 'kalpa-8',
    sthana: 'Kalpa Sthana',
    chapterNumber: 8,
    name: 'Chaturangula Kalpa Adhyaya',
    sanskrit: 'चतुरङ्गुल कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Chaturangula',
    summary: 'This chapter describes pharmaceutical preparations of Chaturangula (Cassia fistula) for therapeutic purgation. Chaturangula is a mild purgative suitable for patients who cannot tolerate strong purgative drugs.',
    keyConcepts: [
      'Chaturangula (Cassia fistula) is a mild purgative drug',
      'Suitable for patients who cannot tolerate strong purgatives',
      'Used for pitta and kapha disorders',
      'The fruit pulp is the primary therapeutic part'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaścaturaṅgulakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Chaturangula kalpa" (Pharmaceutical preparations of Chaturangula). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Chaturangula preparations.'
      }
    ],
    topics: [],
    doshaDiscussion: [
      'Chaturangula primarily eliminates pitta and kapha',
      'Mild action makes it suitable for debilitated patients'
    ],
    treatmentProtocols: [
      {
        condition: 'Mild pitta disorders',
        treatment: 'Mild purgation with Chaturangula preparations',
        herbs: ['Chaturangula', 'Madhu', 'Guda (jaggery)'],
        dosage: 'As per physician prescription',
        duration: 'Single administration',
        precautions: ['Monitor purgation response', 'Adjust dose for debilitated patients']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Chaturangula is a gentle purgative for patients who cannot tolerate strong drugs'
    ],
    clinicalApplications: [
      'Mild virechana for pitta-kapha disorders',
      'Safe purgation for debilitated patients',
      'Treatment of constipation and abdominal disorders'
    ]
  },
  {
    id: 'kalpa-9',
    sthana: 'Kalpa Sthana',
    chapterNumber: 9,
    name: 'Tilvaka Kalpa Adhyaya',
    sanskrit: 'तिल्वक कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Tilvaka',
    summary: 'This chapter describes pharmaceutical preparations of Tilvaka (Cassia tora) for therapeutic purgation. Tilvaka is used for skin diseases and conditions requiring elimination of pitta and kapha doshas.',
    keyConcepts: [
      'Tilvaka (Cassia tora) is a purgative drug with skin-healing properties',
      'Used for kushtha (skin diseases) and pitta-kapha disorders',
      'The leaves and seeds are therapeutically active'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ tilvakakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Tilvaka kalpa" (Pharmaceutical preparations of Tilvaka). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Tilvaka preparations.'
      }
    ],
    topics: [],
    doshaDiscussion: [
      'Tilvaka eliminates pitta and kapha',
      'Special affinity for skin diseases (twak roga)'
    ],
    treatmentProtocols: [
      {
        condition: 'Kushtha (Skin diseases)',
        treatment: 'Purgation with Tilvaka preparations',
        herbs: ['Tilvaka', 'Nimba', 'Haridra', 'Madhu'],
        dosage: 'As per physician prescription',
        duration: 'Course of treatment varies by disease severity',
        precautions: ['Monitor skin condition during treatment', 'Assess pitta levels']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Tilvaka is especially indicated for skin diseases',
      'Purgation with Tilvaka eliminates pitta and kapha from the body'
    ],
    clinicalApplications: [
      'Treatment of skin diseases (kushtha)',
      'Purgation therapy for pitta-kapha disorders',
      'Management of inflammatory skin conditions'
    ]
  },
  {
    id: 'kalpa-10',
    sthana: 'Kalpa Sthana',
    chapterNumber: 10,
    name: 'Sudha Kalpa Adhyaya',
    sanskrit: 'सूधा कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Sudha',
    summary: 'This chapter describes pharmaceutical preparations of Sudha (Euphorbia neriifolia / Snuhi) for therapeutic purgation. Sudha is a potent purgative used for severe kapha and vata disorders.',
    keyConcepts: [
      'Sudha (Euphorbia neriifolia) is a potent purgative drug',
      'Used for severe kapha and vata disorders',
      'The latex (swarasa) is the primary therapeutic part',
      'Requires careful dosing due to strong action'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ sūdhākalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Sudha kalpa" (Pharmaceutical preparations of Sudha). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Sudha preparations.'
      }
    ],
    topics: [],
    doshaDiscussion: [
      'Sudha primarily eliminates kapha and vata',
      'Potent action requires careful supervision'
    ],
    treatmentProtocols: [
      {
        condition: 'Severe kapha disorders',
        treatment: 'Strong purgation with Sudha preparations',
        herbs: ['Sudha (latex)', 'Madhu', 'Saindhava'],
        dosage: 'Carefully titrated dose under supervision',
        duration: 'Single administration with intensive monitoring',
        precautions: ['Toxicity risk - requires expert supervision', 'Emergency measures must be available']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Sudha is a potent purgative requiring expert supervision'
    ],
    clinicalApplications: [
      'Strong purgation for severe kapha-vata disorders',
      'Treatment of abdominal masses and obstructions',
      'Requires expert supervision due to potency'
    ]
  },
  {
    id: 'kalpa-11',
    sthana: 'Kalpa Sthana',
    chapterNumber: 11,
    name: 'Saptalashankhini Kalpa Adhyaya',
    sanskrit: 'सप्तलाशङ्खिनी कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Saptala and Shankhini',
    summary: 'This chapter describes pharmaceutical preparations of Saptala (Acacia concinna) and Shankhini (Canscora decurrens) for therapeutic purgation. These drugs are used for pitta and kapha disorders.',
    keyConcepts: [
      'Saptala and Shankhini are purgative drugs for pitta-kapha disorders',
      'Used for conditions requiring elimination of morbid doshas through the anal route',
      'Combined preparations enhance therapeutic efficacy'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ saptalāśaṅkhinīkalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Saptalashankhini kalpa" (Pharmaceutical preparations of Saptala and Shankhini). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Saptala and Shankhini preparations.'
      }
    ],
    topics: [],
    doshaDiscussion: [
      'Saptala and Shankhini eliminate pitta and kapha',
      'Act on purishavaha srotas'
    ],
    treatmentProtocols: [
      {
        condition: 'Pitta-kapha disorders',
        treatment: 'Purgation with Saptala-Shankhini preparations',
        herbs: ['Saptala', 'Shankhini', 'Madhu', 'Guda'],
        dosage: 'As per physician prescription',
        duration: 'Single administration',
        precautions: ['Monitor purgation response', 'Assess dosha levels']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Saptala and Shankhini are effective purgative drugs for pitta-kapha disorders'
    ],
    clinicalApplications: [
      'Virechana for pitta-kapha conditions',
      'Treatment of abdominal disorders',
      'Management of skin diseases with pitta predominance'
    ]
  },
  {
    id: 'kalpa-12',
    sthana: 'Kalpa Sthana',
    chapterNumber: 12,
    name: 'Dantidravanti Kalpa Adhyaya',
    sanskrit: 'दन्तीद्रवन्ती कल्प अध्याय',
    english: 'Pharmaceutical Preparations of Danti and Dravanti',
    summary: 'This chapter describes pharmaceutical preparations of Danti (Baliospermum montanum) and Dravanti (Jatropha curcas) for therapeutic purgation. These are the concluding purgative drug preparations in Kalpa Sthana, completing the pharmaceutical section of Charak Samhita.',
    keyConcepts: [
      'Danti and Dravanti are potent purgative drugs',
      'Complete the pharmaceutical preparations section of Kalpa Sthana',
      'Used for severe dosha conditions requiring strong elimination',
      'The chapter was restored by Dridhabala as it was unavailable in the original'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ dantīdravantīkalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Dantidravanti kalpa" (Pharmaceutical preparations of Danti and Dravanti). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the final chapter on purgative preparations.'
      }
    ],
    topics: [],
    doshaDiscussion: [
      'Danti and Dravanti eliminate all three doshas through strong purgation',
      'Used when milder purgatives are insufficient'
    ],
    treatmentProtocols: [
      {
        condition: 'Severe dosha accumulation',
        treatment: 'Strong purgation with Danti-Dravanti preparations',
        herbs: ['Danti', 'Dravanti', 'Madhu', 'Saindhava'],
        dosage: 'Carefully titrated under expert supervision',
        duration: 'Single administration with intensive monitoring',
        precautions: ['Potent drugs requiring expert supervision', 'Emergency measures must be available']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Danti and Dravanti complete the twelve chapters of Kalpa Sthana',
      'These are the final purgative preparations described by Charaka',
      'Chapter restored by Dridhabala from the original Agnivesha tantra'
    ],
    clinicalApplications: [
      'Strong purgation for severe dosha conditions',
      'Completion of the emesis-purgation pharmaceutical spectrum',
      'Requires expert supervision due to potency'
    ]
  }
];

// Export summary for reference
export const KALPA_STHANA_SUMMARY = {
  sthana: 'Kalpa Sthana',
  totalChapters: 12,
  focus: 'Pharmaceutical preparations for emesis (vamana) and purgation (virechana)',
  keyDrugs: {
    emetic: ['Madanaphala (Randia dumetorum)', 'Jimutaka (Luffa echinata)', 'Ikshvaku (Lagenaria siceraria)', 'Dhamargava (Luffa cylindrica)', 'Vatsaka (Holarrhena antidysenterica)', 'Kritavedhana (Strychnos nux-vomica)'],
    purgative: ['Shyama (Ipomoea turpethum)', 'Trivrit (Operculina turpethum)', 'Chaturangula (Cassia fistula)', 'Tilvaka (Cassia tora)', 'Sudha (Euphorbia neriifolia)', 'Saptala (Acacia concinna)', 'Shankhini (Canscora decurrens)', 'Danti (Baliospermum montanum)', 'Dravanti (Jatropha curcas)']
  },
  totalFormulations: 'Approximately 250+ formulations across all chapters',
  restoredBy: 'Dridhabala (original chapters 1-17 by Agnivesha, revised by Charaka)'
};
