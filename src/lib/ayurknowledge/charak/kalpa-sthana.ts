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
      'Formulations include pills (vati), powders (churna), decoctions (kwatha), and linctus (lehya)',
      'Madanaphala is preferred over other emetics due to minimal side effects',
      'The fruit is collected when ripe and dried for pharmaceutical use',
      'Different formulations suit different patient constitutions and disease conditions',
      'The emetic action is achieved through the drug properties, not through forceful expulsion',
      'Post-emesis care (paschatkarma) is as important as the procedure itself',
      'Anupana (adjuvant) selection modifies the action and reduces side effects',
      'The drug is safe for most patients when properly prepared and administered',
      'Madanaphala formulations are used both for therapeutic emesis and as anti-emetics',
      'The chapter describes 25+ different formulations for various clinical scenarios',
      'Proper dose calculation based on patient strength and disease severity is essential',
      'The emetic procedure should be performed in the morning on an empty stomach',
      'Kapha-pitta conditions are the primary indications for vamana karma',
      'The quality of emesis (vega) indicates successful dosha elimination'
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
      },
      {
        number: '10',
        sanskrit: 'kṣīreṇa mathitena ca vamanārthaṁ prayojayet',
        translation: 'The powder mixed with churning motion in milk should be administered for emesis.',
        commentary: 'Describes the milk-based preparation method for Madanaphala emesis.'
      },
      {
        number: '13',
        sanskrit: 'maṇḍena surayā caiva takreṇa ca guḍena ca',
        translation: 'The powder can be administered with fermented liquids, buttermilk, or jaggery water.',
        commentary: 'Multiple adjuvant options for different patient constitutions and disease conditions.'
      },
      {
        number: '15',
        sanskrit: 'samvatsaraṁ dhāryamāṇaṁ guru cūrṇaṁ praśasyate',
        translation: 'The powder stored for one year is considered best for therapeutic use.',
        commentary: 'Aging the powder improves therapeutic efficacy and reduces side effects.'
      },
      {
        number: '18',
        sanskrit: 'samyak yogaḥ sukhavedanā malanirgama agnivṛddhiḥ ca',
        translation: 'In proper emesis, there is comfortable elimination of doshas, removal of waste matter, and enhancement of digestive fire.',
        commentary: 'Describes the signs of successful vamana karma indicating optimal dosha elimination.'
      },
      {
        number: '21',
        sanskrit: 'atiyoge atisāraḥ mūrcchā dāhaḥ sadanaṁ bhramah',
        translation: 'In excessive emesis, there may be diarrhea, fainting, burning sensation, weakness, and giddiness.',
        commentary: 'Warning verse describing complications of excessive emesis requiring immediate management.'
      },
      {
        number: '24',
        sanskrit: 'ayoge gurutā śūlaṁ anānā mala apravṛttiḥ ca',
        translation: 'In insufficient emesis, there is heaviness, pain, anorexia, and non-elimination of waste.',
        commentary: 'Describes signs of inadequate emesis indicating need for repeat or modified therapy.'
      }
    ],
    topics: [
      {
        title: 'Madanaphala Plant Profile',
        content: 'Madanaphala (Randia dumetorum) belongs to Rubiaceae family. The fruit is the primary therapeutic part used for emesis. Synonyms include Trikantaka, Kapitana, Phala, and Madanaka. The tree grows up to 5m height with thorny branches and white flowers. Found throughout India in deciduous forests and wastelands.',
        clinicalRelevance: 'Proper identification and collection of the correct plant part at the right maturity is essential for therapeutic efficacy.'
      },
      {
        title: 'Emetic Drug Properties',
        content: 'Emetic drugs possess ushna (hot), tikshna (sharp), sukshma (subtle), vyavayi (pervading), and vikashi (loosening) properties. These qualities enable the drug to liquefy accumulated doshas and move them upward for expulsion through vamana. Madanaphala uniquely possesses these properties in balanced proportion, making it the safest and most effective emetic.',
        clinicalRelevance: 'Understanding drug properties helps in selecting appropriate emetic drugs for different dosha constitutions.'
      },
      {
        title: 'Pre-emesis Preparation',
        content: 'Before vamana karma, the patient must undergo snehana (internal and external oleation) and swedana (fomentation therapy). This prepares the body by liquefying doshas and moving them from peripheral tissues to the gastrointestinal tract for elimination.',
        clinicalRelevance: 'Proper purvakarma (pre-procedure preparation) is essential for successful vamana and preventing complications.'
      },
      {
        title: 'Vamana Procedure',
        content: 'The emesis procedure is performed in the morning during kapha kala (6-10 AM). The patient takes a light dinner the previous night. On the day of procedure, after snehana-swedana, the emetic drug is administered. The patient is instructed to expectorate freely. The procedure continues until pitta (yellow-green fluid) appears, indicating complete kapha elimination.',
        clinicalRelevance: 'Proper timing and procedure execution ensures maximum therapeutic benefit with minimal complications.'
      },
      {
        title: 'Paschatkarma (Post-emesis Care)',
        content: 'After vamana, the patient follows a specific diet protocol starting with peya (thin gruel) and gradually progressing to regular food over 3-7 days. Dhumapana (medicated smoking) and gandusha (gargling) are performed. This allows the digestive fire to recover gradually and prevents complications from premature dietary advancement.',
        clinicalRelevance: 'Proper paschatkarma is as important as the procedure itself for sustained therapeutic benefit.'
      },
      {
        title: 'Vega Assessment',
        content: 'The quality and quantity of emesis (vega) is assessed to determine therapeutic outcome. Samyak yoga (optimal): 4-8 vega with relief from symptoms. Ayoga (insufficient): less than 4 vega with persistent symptoms. Atiyoga (excessive): more than 8 vega with complications like weakness, fainting.',
        clinicalRelevance: 'Proper vega assessment guides post-procedure care and determines need for repeat therapy.'
      },
      {
        title: 'Madanaphala Formulations',
        content: 'The chapter describes multiple formulations: (1) Churna - powder with honey and warm water, (2) Vati - pills with jaggery, (3) Kwatha - decoction with milk, (4) Lehya - linctus with sugar, (5) Phanta - cold infusion. Each formulation suits different patient constitutions and disease conditions.',
        clinicalRelevance: 'Multiple formulation options allow customization of therapy for individual patient needs.'
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
    diseaseDescriptions: [
      {
        name: 'Kaphaja Shwasa (Bronchial asthma)',
        sanskrit: 'काफज श्वास',
        etiology: 'Aggravated kapha obstructing pranavaha srotas due to cold, heavy foods and sedentary lifestyle',
        symptoms: ['Wheezing', 'Chest congestion', 'Difficulty in breathing', 'Productive cough', 'Heaviness in chest'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases, Sukhasadhya (easily curable) in acute cases',
        treatment: 'Vamana karma with Madanaphala to eliminate kapha from respiratory tract'
      },
      {
        name: 'Kaphaja Kasa (Productive cough)',
        sanskrit: 'काफज कास',
        etiology: 'Aggravated kapha in respiratory tract due to cold foods, exposure to cold, and suppression of natural urges',
        symptoms: ['Productive cough with white sputum', 'Chest congestion', 'Heaviness', 'Loss of appetite', 'Nausea'],
        prognosis: 'Sukhasadhya (easily curable with proper treatment)',
        treatment: 'Vamana with Madanaphala decoction to eliminate kapha from respiratory tract'
      },
      {
        name: 'Sthoulya (Obesity)',
        sanskrit: 'स्थौल्य',
        etiology: 'Aggravated kapha and meda dhatu due to excessive intake of sweet, heavy foods and sedentary lifestyle',
        symptoms: ['Excessive body weight', 'Difficulty in breathing', 'Excessive sweating', 'Loss of stamina', 'Heaviness'],
        prognosis: 'Yapya (manageable) with consistent treatment',
        treatment: 'Vamana karma with Madanaphala to eliminate excess kapha and meda'
      }
    ],
    importantVerses: [
      'Madanaphala is the foremost among emetic drugs due to its balanced tridoshahara action',
      'The fruit should be collected when ripe and dried properly for maximum potency',
      'Snehana and swedana are mandatory prerequisites before vamana karma',
      'The quality of emesis indicates successful dosha elimination',
      'Multiple formulations allow customization for individual patient needs'
    ],
    clinicalApplications: [
      'Vamana karma for kapha disorders',
      'Preparations for respiratory diseases',
      'Treatment of skin diseases with kapha predominance',
      'Management of obesity and metabolic disorders',
      'Purvakarma for panchakarma procedures',
      'Treatment of bronchial asthma and productive cough',
      'Management of kaphaja fever',
      'Treatment of kaphaja skin diseases',
      'Pre-emesis preparation for panchakarma',
      'Therapeutic emesis for dosha elimination'
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
        content: 'For patients too weak for oral emesis, dried flower juice and powdered dried flowers are sprinkled on a garland and inhaled. This gentler method induces emesis without the force of oral administration. The method is also useful for children and elderly patients who cannot tolerate strong oral preparations.',
        clinicalRelevance: 'Inhalation method provides an alternative for patients who cannot tolerate oral emesis preparations.'
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
      },
      {
        condition: 'Gara Visha (Artificial poisoning)',
        treatment: 'Dhamargava emesis with specific detoxifying herbs',
        herbs: ['Dhamargava', 'Shunthi', 'Maricha', 'Pippali', 'Madhu'],
        dosage: 'Dhamargava powder 10-15g with honey and warm water',
        duration: 'Single procedure with monitoring',
        precautions: ['Assess toxin type', 'Have emergency measures available', 'Monitor vital signs']
      },
      {
        condition: 'Pleeha (Splenomegaly)',
        treatment: 'Dhamargava purgation with specific herbs for splenic disorders',
        herbs: ['Dhamargava', 'Kushtha', 'Shunthi', 'Pippali', 'Madhu'],
        dosage: 'Dhamargava preparation 5-8g with warm vehicle',
        duration: 'Single procedure with monitoring',
        precautions: ['Assess splenic size', 'Monitor for complications']
      },
      {
        condition: 'Gulma (Abdominal lumps)',
        treatment: 'Dhamargava emesis for kapha-vata gulma',
        herbs: ['Dhamargava', 'Shunthi', 'Pippali', 'Madhu', 'Saindhava'],
        dosage: 'Dhamargava powder 10-12g with warm adjuvants',
        duration: 'Single administration with post-care',
        precautions: ['Assess gulma location', 'Monitor for complications']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Gara Visha (Artificial poisoning)',
        sanskrit: 'गरविष',
        etiology: 'Ingestion of incompatible food combinations or artificial toxins',
        symptoms: ['Gradual onset of symptoms', 'Multiple organ involvement', 'Chronic course', 'Weakness', 'Loss of appetite'],
        prognosis: 'Depends on severity and chronicity',
        treatment: 'Dhamargava emesis with specific herb combinations to eliminate toxins'
      },
      {
        name: 'Unmada (Mental disorders)',
        sanskrit: 'उन्माद',
        etiology: 'Vitiation of all three doshas affecting manovaha srotas due to suppression of natural urges, trauma, or psychological stress',
        symptoms: ['Abnormal behavior', 'Hallucinations', 'Delusions', 'Loss of memory', 'Sleep disturbance'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases',
        treatment: 'Dhamargava emesis with manasika dosha shamaka herbs'
      }
    ],
    importantVerses: [
      'Rishi Gautam considers Dhamargava the best drug because of its kapha-pitta nashaka property',
      'Maharshi Atreya states the fruit is best for pandu (anemia)',
      '60 formulations represent the most comprehensive emetic preparation collection',
      'Dhamargava has ubhaytobhagahara prabhava - both emetic and purgative action',
      'The drug is safe for delicate persons when properly prepared'
    ],
    clinicalApplications: [
      'Vamana karma for kapha-pitta disorders',
      'Treatment of mental disorders',
      'Management of poisoning cases',
      'Anti-inflammatory applications (COX-2 inhibition)',
      'Analgesic and sedative therapy',
      'Treatment of edema and abdominal disorders',
      'Therapy for splenic disorders',
      'Management of abdominal lumps (gulma)',
      'Treatment of kaphaja fever',
      'Comprehensive emesis therapy with 60 formulation options'
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
      },
      {
        name: 'Raktapitta (Bleeding disorders)',
        sanskrit: 'रक्तपित्त',
        etiology: 'Aggravated pitta vitiating rakta dhatu due to excessive intake of pungent, sour, and salty foods',
        symptoms: ['Bleeding from various sites', 'Burning sensation', 'Redness', 'Fever', 'Thirst'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases',
        treatment: 'Vamana with Vatsaka decoction to eliminate pitta from rakta dhatu'
      },
      {
        name: 'Yauvanapidika (Acne vulgaris)',
        sanskrit: 'यौवनपिडिका',
        etiology: 'Aggravation of kapha and pitta during adolescence affecting twak (skin) and rakta dhatu',
        symptoms: ['Face pimples', 'Blackheads', 'Whiteheads', 'Scarring', 'Oily skin'],
        prognosis: 'Sukhasadhya (easily curable with proper treatment)',
        treatment: 'Therapeutic emesis with Vatsaka Indrayava kalpa to eliminate kapha-pitta'
      }
    ],
    importantVerses: [
      'Vatsaka destroys raktapitta and kapha while being free from harmful effects',
      'Safe for delicate persons - a unique advantage among emetic drugs',
      'Seeds (Indrayava) have specific therapeutic value distinct from the fruit',
      'Male and female varieties have different therapeutic applications',
      'The drug is effective in both bleeding disorders and skin diseases'
    ],
    clinicalApplications: [
      'Vamana karma for pitta-kapha disorders',
      'Treatment of bleeding disorders (raktapitta)',
      'Management of acne vulgaris',
      'Therapy for skin diseases (kushtha, visarpa)',
      'Anti-dysenteric and anti-amoebic applications',
      'Safe emesis for debilitated patients',
      'Treatment of dysentery and amoebic infections',
      'Management of inflammatory skin conditions',
      'Therapy for cardiac disorders (hridroga)',
      'Treatment of kaphaja fever',
      'Safe emesis for children and elderly',
      'Comprehensive skin disease management'
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
      'Progressive dosing protocol includes Kritavedhana at 100-seed dose level',
      'Also known as Kupilu, Vishamushti, and Kuchila',
      'The seeds are the primary therapeutic part used for pharmaceutical preparations',
      'Shodhana (purification) is mandatory before use to reduce toxicity',
      'The drug has strong tikshna (sharp) and ushna (hot) properties',
      'Expert supervision is mandatory due to potential for severe toxicity',
      'The drug is used only when milder emetics fail to achieve adequate dosha elimination',
      'Combined with milk, ghee, or honey to moderate its strong action',
      'The plant is a medium-sized tree found throughout India in deciduous forests',
      'Proper seed collection and drying ensures consistent alkaloid content',
      'Emergency measures including anti-convulsant drugs must be available during administration'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ kṛtavedhanakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Kritavedhana kalpa" (Pharmaceutical preparations of Kritavedhana). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Kritavedhana preparations.'
      },
      {
        number: '3',
        sanskrit: 'kṛtavedhanaḥ kupiluḥ viṣamuṣṭiḥ kucilaḥ',
        translation: 'Kritavedhana, Kupilu, Vishamushti, and Kuchila are synonyms for this drug.',
        commentary: 'Establishes the synonym list for proper drug identification across pharmacopoeias.'
      },
      {
        number: '5',
        sanskrit: 'tikṣṇoṣṇaṁ vamanārthaṁ prayojayet | śodhitam kṣīrayuktam ca',
        translation: 'The purified drug combined with milk should be administered for emesis therapy.',
        commentary: 'Emphasizes the need for purification (shodhana) before use and combination with milk for safety.'
      },
      {
        number: '7',
        sanskrit: 'atyayogamūrchchā daṇḍaḥ śvāsakāsaḥ ca jāyate',
        translation: 'In excessive use, there may be fainting, convulsions, dyspnea, and cough.',
        commentary: 'Warning verse describing complications of excessive use requiring immediate management.'
      }
    ],
    topics: [
      {
        title: 'Kritavedhana Plant Profile',
        content: 'Kritavedhana (Strychnos nux-vomica) belongs to Loganiaceae family. Synonyms include Kupilu, Vishamushti, Kuchila, Karaskara. It is a medium-sized tree (10-15m) with smooth bark and orange-red berries. The seeds are disc-shaped (1-2cm diameter) covered with silky hairs. Found throughout India in deciduous forests.',
        clinicalRelevance: 'Proper identification is crucial due to the toxic nature of the seeds requiring careful handling.'
      },
      {
        title: 'Shodhana (Purification) Process',
        content: 'The seeds of Kritavedhana require shodhana (purification) before pharmaceutical use to reduce toxicity while maintaining therapeutic action. The seeds are soaked in cow urine (gomutra) or buttermilk for 7 days, then dried and powdered. This process reduces the strychnine content while preserving the emetic action.',
        clinicalRelevance: 'Shodhana is mandatory for safe use - unprocessed seeds can cause severe toxicity and convulsions.'
      },
      {
        title: 'Pharmacological Profile',
        content: 'Rasa: Tikta (bitter), Kashaya (astringent). Guna: Laghu (light), Tikshna (sharp), Ruksha (dry). Veerya: Ushna (hot). Vipaka: Katu (pungent). Chemical constituents include strychnine (0.3-1.2%), brucine (0.2-0.5%), vomicine, and other alkaloids. The seeds also contain loganin and other iridoid glycosides.',
        clinicalRelevance: 'The sharp and hot properties explain its strong emetic action and the need for careful dosing.'
      },
      {
        title: 'Mechanism of Strong Emetic Action',
        content: 'Kritavedhana acts on the vomiting center in the medulla oblongata by strongly stimulating chemoreceptors. Strychnine blocks inhibitory neurotransmitters (glycine) leading to uncontrolled neural excitation. This results in forceful emesis when administered in controlled doses.',
        clinicalRelevance: 'Understanding the mechanism helps in predicting the intensity of emesis and managing complications.'
      },
      {
        title: 'Safety Considerations',
        content: 'Kritavedhana is classified as a vishadravya (toxic substance) requiring expert handling. Contraindications include pregnancy, children, elderly, and debilitated patients. Emergency measures including anti-convulsant drugs (diazepam) and IV fluids should be available during administration.',
        clinicalRelevance: 'Mandatory safety precautions prevent severe complications from excessive emesis.'
      }
    ],
    doshaDiscussion: [
      'Kritavedhana has strong kapha-shamaka action',
      'Used when milder emetics fail to achieve adequate dosha elimination',
      'Combined with other emetic drugs to balance potency and safety',
      'Tikshna and ushna properties provide strong kapha-vata shamaka action',
      'The drug requires expert supervision due to potential for atiyoga (excessive emesis)',
      'Effective for deep-seated doshas in mahavaha srotas'
    ],
    treatmentProtocols: [
      {
        condition: 'Severe Kapha disorders',
        treatment: 'Emesis with Kritavedhana preparations under expert supervision',
        herbs: ['Kritavedhana (purified)', 'Madanaphala', 'Jimutaka'],
        dosage: 'Kritavedhana powder 1-2g with milk, carefully titrated under supervision',
        duration: 'Single administration with intensive monitoring for 24 hours',
        precautions: ['Toxicity risk - requires expert supervision', 'Emergency measures must be available', 'Contraindicated in children and elderly']
      },
      {
        condition: 'Severe Kapha-Pitta disorders',
        treatment: 'Emesis with Kritavedhana combined with cooling adjuvants',
        herbs: ['Kritavedhana (purified)', 'Madhuka', 'Draksha', 'Ksheera'],
        dosage: 'Kritavedhana preparation 1-2ml with milk and cooling herbs',
        duration: 'Single procedure with monitoring',
        precautions: ['Assess pitta levels before procedure', 'Monitor for excessive emesis']
      },
      {
        condition: 'Progressive dosha elimination',
        treatment: 'Kritavedhana as part of six-day progressive dosing protocol',
        herbs: ['Kritavedhana', 'Madanaphala', 'Jimutaka', 'Ikshvaku', 'Dhamargava', 'Vatsaka'],
        dosage: 'Day 6: 100 seeds of Kritavedhana with other emetic drugs',
        duration: '6 days with post-procedure care',
        precautions: ['Monitor daily tolerance', 'Expert supervision mandatory for Day 6']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kaphaja Shwasa (Bronchial asthma)',
        sanskrit: 'काफज श्वास',
        etiology: 'Aggravated kapha obstructing pranavaha srotas due to cold, heavy foods and sedentary lifestyle',
        symptoms: ['Wheezing', 'Chest congestion', 'Difficulty in breathing', 'Productive cough', 'Heaviness in chest'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases',
        treatment: 'Strong emesis with Kritavedhana preparations to eliminate deep-seated kapha'
      },
      {
        name: 'Kaphaja Kasa (Productive cough)',
        sanskrit: 'काफज कास',
        etiology: 'Aggravated kapha in respiratory tract due to cold foods, exposure to cold, and suppression of natural urges',
        symptoms: ['Productive cough with white sputum', 'Chest congestion', 'Heaviness', 'Loss of appetite', 'Nausea'],
        prognosis: 'Sukhasadhya (easily curable with proper treatment)',
        treatment: 'Strong emesis with Kritavedhana to eliminate kapha from respiratory tract'
      }
    ],
    importantVerses: [
      'Kritavedhana completes the six emetic drugs of Kalpa Sthana',
      'Proper purification (shodhana) is essential before use',
      'Combined use with other emetic drugs enhances safety',
      'The drug requires expert supervision due to its potent alkaloids',
      'Emergency measures must be available during administration'
    ],
    clinicalApplications: [
      'Vamana karma for severe kapha disorders',
      'Cases where milder emetics are insufficient',
      'Progressive dosing protocol (100-seed dose level)',
      'Requires expert supervision due to toxicity potential',
      'Treatment of severe bronchial asthma',
      'Management of chronic productive cough',
      'Therapy for deep-seated kapha conditions',
      'Emergency dosha elimination in critical cases',
      'Treatment of conditions resistant to milder emetics',
      'Comprehensive emesis therapy for severe conditions'
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
      'The drugs act on purishavaha srotas (channels carrying feces)',
      'Shyama (Ipomoea turpethum) has tikta (bitter) and katu (pungent) rasa',
      'Trivrit (Operculina turpethum) is the root bark used for purgation',
      'Both drugs have ushna virya (hot potency) and katu vipaka',
      'Virechana is indicated when doshas are accumulated in pakvashaya (colon)',
      'Purgation is contraindicated in kshata (injury) and kshina (emaciated) patients',
      'Proper snehana and swedana are prerequisites before virechana karma',
      'Anupana (adjuvant) selection varies by predominant dosha being treated',
      'Madhu (honey) and saindhava (rock salt) are common anupana for purgation',
      'The quality of purgation (vega) indicates successful dosha elimination',
      'Atiyoga (excessive), ayoga (insufficient), and samyak yoga (optimal) are three outcomes'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ śyāmātrivṛtkalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Shyamatrivrita kalpa" (Pharmaceutical preparations of Shyama and Trivrit). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on purgative drug preparations.'
      },
      {
        number: '3',
        sanskrit: 'trivṛt śyāmā ca virechanārthaṁ prayojayet | pittavātaharaṁ ca te',
        translation: 'Trivrit and Shyama should be administered for purgation. They alleviate pitta and vata doshas.',
        commentary: 'Core verse establishing the therapeutic purpose of these primary purgative drugs.'
      },
      {
        number: '5',
        sanskrit: 'trivṛtaḥ mūlatvacam cūrṇayet | madhu saindhava saṁyuktam virechanārthaṁ prayojayet',
        translation: 'The root bark of Trivrit should be powdered and combined with honey and rock salt for purgation therapy.',
        commentary: 'Describes the basic pharmaceutical preparation method for Trivrit purgation.'
      },
      {
        number: '7',
        sanskrit: 'śyāmāyāḥ kvāthaṁ kṣīrayutaṁ pittaroge prayojayet',
        translation: 'The decoction of Shyama combined with milk should be used in pitta disorders.',
        commentary: 'Specifies the milk-based decoction preparation for pitta conditions.'
      },
      {
        number: '9',
        sanskrit: 'virechane samyak yogaḥ sukhavedanā malanirgamah agnivṛddhiḥ ca',
        translation: 'In proper purgation, there is comfortable elimination of doshas, removal of waste matter, and enhancement of digestive fire.',
        commentary: 'Describes the signs of successful virechana karma indicating optimal dosha elimination.'
      },
      {
        number: '11',
        sanskrit: 'atiyoge atisāraḥ mūrcchā dāhaḥ sadanaṁ bhramah',
        translation: 'In excessive purgation, there may be diarrhea, fainting, burning sensation, weakness, and giddiness.',
        commentary: 'Warning verse describing complications of excessive purgation requiring immediate management.'
      },
      {
        number: '13',
        sanskrit: 'ayoge gurutā śūlaṁ anānā mala apravṛttiḥ ca',
        translation: 'In insufficient purgation, there is heaviness, pain, anorexia, and non-elimination of waste.',
        commentary: 'Describes signs of inadequate purgation indicating need for repeat or modified therapy.'
      }
    ],
    topics: [
      {
        title: 'Virechana (Purgation) Therapy',
        content: 'Virechana is the second of the five panchakarma procedures. It eliminates pitta dosha from the body through the anal route. Shyama and Trivrit are the primary drugs used for this purpose. The therapy is indicated for pitta-predominant diseases.',
        clinicalRelevance: 'Understanding virechana therapy is essential for comprehensive panchakarma practice.'
      },
      {
        title: 'Shyama Plant Profile',
        content: 'Shyama (Ipomoea turpethum) belongs to Convolvulaceae family. Synonyms include Trivrit, Shyamalata, Nishoth. The root bark is the primary therapeutic part. The plant is a large climber with white flowers, found throughout India. Rasa: Tikta (bitter), Katu (pungent). Guna: Laghu (light), Tikshna (sharp). Veerya: Ushna (hot). Vipaka: Katu (pungent).',
        clinicalRelevance: 'Proper identification of Shyama ensures correct drug procurement for purgation therapy.'
      },
      {
        title: 'Trivrit Plant Profile',
        content: 'Trivrit (Operculina turpethum) belongs to Convolvulaceae family. Synonyms include Nishoth, Shyama, Sarala. The root bark is used for pharmaceutical preparations. The plant is a large climber found in tropical regions. It has similar pharmacological properties to Shyama but is considered milder in action.',
        clinicalRelevance: 'Trivrit is preferred for patients who require gentler purgation compared to Shyama.'
      },
      {
        title: 'Purvakarma for Virechana',
        content: 'Before virechana karma, the patient must undergo snehana (internal oleation with medicated ghee) for 3-7 days followed by swedana (fomentation therapy). This prepares the body by liquefying doshas and moving them from peripheral tissues to the gastrointestinal tract for elimination through the anal route.',
        clinicalRelevance: 'Proper purvakarma is essential for successful virechana and preventing complications like ayoga or atiyoga.'
      },
      {
        title: 'Virechana Vega Assessment',
        content: 'The quality and quantity of purgation (vega) is assessed to determine therapeutic outcome. Samyak yoga (optimal): 4-8 vega with relief from symptoms. Ayoga (insufficient): less than 4 vega with persistent symptoms. Atiyoga (excessive): more than 8 vega with complications like weakness, fainting.',
        clinicalRelevance: 'Proper vega assessment guides post-procedure care and determines need for repeat therapy.'
      },
      {
        title: 'Paschatkarma (Post-Procedure Care)',
        content: 'After virechana, the patient follows a specific diet protocol starting with peya (thin gruel) and gradually progressing to regular food over 3-7 days. This allows the digestive fire to recover gradually and prevents complications from premature dietary advancement.',
        clinicalRelevance: 'Proper paschatkarma is as important as the procedure itself for sustained therapeutic benefit.'
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
      },
      {
        condition: 'Kamala (Jaundice)',
        treatment: 'Virechana with Trivrit decoction prepared in milk',
        herbs: ['Trivrit', 'Ksheera (milk)', 'Draksha', 'Amalaki', 'Madhu'],
        dosage: 'Trivrit churna 10-15g with milk and honey',
        duration: 'Single administration with 7 days paschatkarma',
        precautions: ['Assess liver function before procedure', 'Monitor bilirubin levels during treatment']
      },
      {
        condition: 'Raktapitta (Bleeding disorders)',
        treatment: 'Virechana with Shyama decoction combined with pitta-shamaka herbs',
        herbs: ['Shyama', 'Chandana', 'Ushira', 'Madhuka', 'Sariva'],
        dosage: 'Shyama decoction 40-60ml with cooling adjuvants',
        duration: 'As per disease severity',
        precautions: ['Monitor bleeding parameters', 'Use cooling anupana for pitta conditions']
      },
      {
        condition: 'Kushtha (Skin diseases)',
        treatment: 'Virechana with Trivrit preparations combined with skin-healing herbs',
        herbs: ['Trivrit', 'Nimba', 'Haridra', 'Khadira', 'Madhu'],
        dosage: 'Trivrit powder 10-12g with honey',
        duration: 'Course of treatment varies by disease severity',
        precautions: ['Monitor skin condition during treatment', 'Assess pitta-kapha levels']
      },
      {
        condition: 'Grahani (IBS/Malabsorption)',
        treatment: 'Virechana with Shyama-Trivrit combined preparations',
        herbs: ['Shyama', 'Trivrit', 'Bilva', 'Musta', 'Shunthi'],
        dosage: 'Combined powder 8-10g with warm water',
        duration: 'Single procedure with dietary management',
        precautions: ['Assess agni strength before procedure', 'Monitor bowel movements during treatment']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kamala (Jaundice)',
        sanskrit: 'कामला',
        etiology: 'Aggravated pitta affecting rakta dhatu and liver function, often due to excessive intake of pitta-aggravating foods and lifestyle',
        symptoms: ['Yellow discoloration of skin and eyes', 'Dark urine (concentrated)', 'Loss of appetite', 'Weakness and fatigue', 'Burning sensation'],
        prognosis: 'Sadhyasadhya (curable with proper treatment)',
        treatment: 'Virechana karma with Trivrit preparations to eliminate excess pitta from the body'
      },
      {
        name: 'Raktapitta (Bleeding disorders)',
        sanskrit: 'रक्तपित्त',
        etiology: 'Aggravated pitta vitiating rakta dhatu, leading to bleeding from various sites',
        symptoms: ['Bleeding from nose, mouth, or other sites', 'Burning sensation', 'Reddish discoloration', 'Fever', 'Thirst'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases',
        treatment: 'Virechana with cooling pitta-shamaka herbs combined with Shyama/Trivrit'
      },
      {
        name: 'Kushtha (Skin diseases)',
        sanskrit: 'कुष्ठ',
        etiology: 'Vitiation of all three doshas, especially pitta and kapha, affecting twak (skin) and rakta dhatu',
        symptoms: ['Skin discoloration', 'Itching', 'Scaling', 'Burning sensation', 'Numbness'],
        prognosis: 'Varies by type - some curable, some manageable',
        treatment: 'Virechana karma with Trivrit preparations combined with skin-healing herbs'
      }
    ],
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
      'Complementary to vamana for comprehensive dosha elimination',
      'Treatment of jaundice and hepatobiliary disorders',
      'Management of bleeding disorders (raktapitta)',
      'Therapy for chronic skin diseases (kushtha)',
      'Treatment of grahani (malabsorption syndrome)',
      'Management of inflammatory bowel conditions',
      'Therapy for pitta-predominant fever',
      'Treatment of burning sensation disorders (daha)'
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
      'The fruit pulp is the primary therapeutic part',
      'Also known as Aragvadha (meaning disease remover)',
      'The tree is found throughout India and is easily accessible',
      'Rasa: Madhura (sweet), Tikta (bitter). Guna: Guru (heavy), Snigdha (unctuous)',
      'Veerya: Ushna (hot). Vipaka: Madhura (sweet)',
      'Contains anthraquinone glycosides responsible for purgative action',
      'The pulp is collected from mature pods and dried for pharmaceutical use',
      'Mild action makes it ideal for children, elderly, and debilitated patients',
      'Can be combined with other purgatives for enhanced efficacy',
      'The fruit is also used in non-pharmaceutical preparations like jams and beverages',
      'Aragvadha is classified among trivirechaniya (three mild purgative drugs)',
      'The drug is safe for long-term use under medical supervision'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaścaturaṅgulakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Chaturangula kalpa" (Pharmaceutical preparations of Chaturangula). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Chaturangula preparations.'
      },
      {
        number: '3',
        sanskrit: 'caturaṅgulaḥ aragvadhaḥ suvarnāhvaḥ kṛtāntakaḥ',
        translation: 'Chaturangula, Aragvadha, Suvarnahva, and Kritantaka are synonyms for this drug.',
        commentary: 'Establishes the synonym list for proper drug identification across pharmacopoeias.'
      },
      {
        number: '5',
        sanskrit: 'madhuratiktakaṣāyoṣṇaḥ pittakaphaharaḥ guruḥ',
        translation: 'The drug has sweet and bitter tastes, hot potency, and is heavy to digest. It alleviates pitta and kapha.',
        commentary: 'Describes the fundamental pharmacological properties of Chaturangula.'
      },
      {
        number: '7',
        sanskrit: 'virechanārthaṁ prayojayet sukumāreṣu bāleṣu vṛddheṣu ca',
        translation: 'It should be administered for purgation in delicate persons, children, and the elderly.',
        commentary: 'Establishes the primary indication - mild purgation for patients who cannot tolerate strong drugs.'
      },
      {
        number: '9',
        sanskrit: 'phalaṁ pacyamānaṁ niṣpāvamātraṁ cūrṇayet',
        translation: 'The ripe fruit pulp should be collected and powdered for pharmaceutical preparation.',
        commentary: 'Instructions for proper harvesting and preparation of Chaturangula fruit.'
      }
    ],
    topics: [
      {
        title: 'Chaturangula Plant Profile',
        content: 'Chaturangula (Cassia fistula) belongs to Fabaceae (Leguminosae) family. Synonyms include Aragvadha, Suvarnahva, Kritantaka, Vyadighna, Rajataru. The tree grows up to 10m height with beautiful yellow flowers. The fruit is a cylindrical pod (30-60cm long) containing pulp between seeds. Found throughout India in tropical and subtropical regions.',
        clinicalRelevance: 'Easy availability and identification make it a practical choice for purgation therapy in resource-limited settings.'
      },
      {
        title: 'Pharmacological Profile',
        content: 'Rasa: Madhura (sweet), Tikta (bitter). Guna: Guru (heavy), Snigdha (unctuous). Veerya: Ushna (hot). Vipaka: Madhura (sweet). Chemical constituents include anthraquinone glycosides (sennosides A and B), rhein, chrysophanol, emodin, and fistulic acid. The pulp contains sugars, pectin, and mucilage that provide the mild purgative action.',
        clinicalRelevance: 'The anthraquinone glycosides provide the purgative action while the sugars and mucilage make it palatable and gentle on the GI tract.'
      },
      {
        title: 'Mild Purgation Mechanism',
        content: 'Unlike stronger purgatives like Trivrit or Shyama, Chaturangula acts gently by stimulating peristalsis without causing severe cramping or dehydration. The anthraquinone glycosides increase intestinal motility and water secretion into the colon, resulting in soft, formed stools rather than watery diarrhea.',
        clinicalRelevance: 'The gentle mechanism makes it suitable for patients with weak digestive fire or those prone to dehydration.'
      },
      {
        title: 'Pediatric and Geriatric Applications',
        content: 'Chaturangula is the preferred purgative for children (bala) and elderly (vriddha) patients who cannot tolerate strong purgatives. The sweet taste makes it palatable for children, and the mild action prevents complications in elderly patients with compromised organ function.',
        clinicalRelevance: 'Special consideration for vulnerable populations ensures safe purgation therapy across all age groups.'
      },
      {
        title: 'Combination Therapies',
        content: 'Chaturangula can be combined with stronger purgatives like Trivrit or Shyama to moderate their action. It is also combined with digestive herbs like Shunthi (ginger) and Maricha (pepper) to enhance absorption and reduce the heavy (guru) quality of the drug.',
        clinicalRelevance: 'Combination therapy allows customization of purgation intensity based on individual patient needs and disease severity.'
      }
    ],
    doshaDiscussion: [
      'Chaturangula primarily eliminates pitta and kapha doshas',
      'Mild action makes it suitable for debilitated patients',
      'Madhura vipaka provides long-term kapha-shamaka action',
      'Ushna virya helps in vata disorders when combined with vata-shamaka herbs',
      'The sweet taste and unctuous quality nourish tissues while purging',
      'Safe for patients with moderate vata vitiation unlike stronger purgatives'
    ],
    treatmentProtocols: [
      {
        condition: 'Mild pitta disorders',
        treatment: 'Mild purgation with Chaturangula preparations',
        herbs: ['Chaturangula', 'Madhu', 'Guda (jaggery)'],
        dosage: 'Chaturangula pulp powder 5-10g with honey or jaggery',
        duration: 'Single administration',
        precautions: ['Monitor purgation response', 'Adjust dose for debilitated patients']
      },
      {
        condition: 'Constipation (Vibandha)',
        treatment: 'Chaturangula pulp with warm milk',
        herbs: ['Chaturangula pulp', 'Ksheera (milk)', 'Ghrita (ghee)'],
        dosage: 'Chaturangula pulp 10-15g boiled in milk 200ml',
        duration: 'Daily at bedtime for 3-7 days',
        precautions: ['Assess for underlying causes', 'Monitor bowel movements']
      },
      {
        condition: 'Pediatric purgation',
        treatment: 'Chaturangula pulp with honey and sugar',
        herbs: ['Chaturangula pulp', 'Madhu (honey)', 'Sharkara (sugar)'],
        dosage: 'Chaturangula pulp 2-5g with honey, adjusted by age',
        duration: 'Single administration as needed',
        precautions: ['Dose must be carefully adjusted for age and weight', 'Monitor for dehydration']
      },
      {
        condition: 'Geriatric purgation',
        treatment: 'Chaturangula with nourishing adjuvants',
        herbs: ['Chaturangula', 'Ghrita', 'Ksheera', 'Draksha'],
        dosage: 'Chaturangula pulp 5-8g with ghee and milk',
        duration: 'Single administration with post-procedure nourishment',
        precautions: ['Assess organ function before procedure', 'Monitor for weakness']
      },
      {
        condition: 'Skin diseases (Kushtha) - mild type',
        treatment: 'Chaturangula with skin-healing herbs',
        herbs: ['Chaturangula', 'Nimba', 'Haridra', 'Khadira', 'Madhu'],
        dosage: 'Chaturangula powder 8-10g with decoction of skin herbs',
        duration: 'Course of treatment varies by disease severity',
        precautions: ['Monitor skin response', 'Assess pitta-kapha levels']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vibandha (Constipation)',
        sanskrit: 'विबन्ध',
        etiology: 'Vata vitiation due to irregular eating habits, lack of fiber, insufficient water intake, and sedentary lifestyle',
        symptoms: ['Hard stools', 'Difficulty in passing stools', 'Abdominal distension', 'Pain during defecation', 'Incomplete evacuation'],
        prognosis: 'Sukhasadhya (easily curable with proper treatment)',
        treatment: 'Chaturangula pulp with warm milk at bedtime for gentle purgation'
      },
      {
        name: 'Pittaja Jwara (Pitta fever)',
        sanskrit: 'पित्तज ज्वर',
        etiology: 'Aggravated pitta due to excessive intake of pungent, sour, and salty foods, anger, and exposure to heat',
        symptoms: ['High fever with burning sensation', 'Excessive thirst', 'Yellow discoloration', 'Bitter taste in mouth', 'Fainting'],
        prognosis: 'Sukhasadhya (curable with proper treatment)',
        treatment: 'Mild purgation with Chaturangula to eliminate excess pitta from the body'
      }
    ],
    importantVerses: [
      'Chaturangula is a gentle purgative for patients who cannot tolerate strong drugs',
      'The fruit pulp is the primary therapeutic part used for purgation',
      'Especially indicated for children, elderly, and debilitated patients',
      'The drug is safe for long-term use under medical supervision',
      'Combination with honey and jaggery enhances palatability and efficacy'
    ],
    clinicalApplications: [
      'Mild virechana for pitta-kapha disorders',
      'Safe purgation for debilitated patients',
      'Treatment of constipation and abdominal disorders',
      'Pediatric purgation therapy',
      'Geriatric purgation with nourishing adjuvants',
      'Mild skin disease treatment',
      'Pitta fever management',
      'Pre-procedure preparation for patients with weak digestion',
      'Combination therapy with stronger purgatives to moderate action',
      'Long-term purgation therapy for chronic conditions'
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
      'The leaves and seeds are therapeutically active',
      'Also known as Chakramarda, Prapunnada, and Edagaja',
      'The plant is a small shrub found throughout India in wastelands',
      'Rasa: Tikta (bitter), Kashaya (astringent). Guna: Laghu (light), Ruksha (dry)',
      'Veerya: Ushna (hot). Vipaka: Katu (pungent)',
      'Contains anthraquinone glycosides (chrysophanic acid, emodin) responsible for purgative action',
      'The leaves are used for external application in skin diseases',
      'Seeds are used for internal purgation therapy',
      'The drug has anti-fungal, anti-bacterial, and anti-inflammatory properties',
      'Tilvaka taila (oil) is used externally for skin diseases and wounds',
      'The plant is easily cultivated and widely available',
      'Combined with other skin-healing herbs for enhanced efficacy in kushtha treatment',
      'The drug acts on rakta dhatu and twak (skin) dhatu specifically'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ tilvakakalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Tilvaka kalpa" (Pharmaceutical preparations of Tilvaka). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Tilvaka preparations.'
      },
      {
        number: '3',
        sanskrit: 'tilvakaḥ cakramardaḥ prapunnādaḥ edagajaḥ',
        translation: 'Tilvaka, Chakramarda, Prapunnada, and Edagaja are synonyms for this drug.',
        commentary: 'Establishes the synonym list for proper drug identification.'
      },
      {
        number: '5',
        sanskrit: 'tiktaḥ kaṣāyoṣṇaḥ pittakaphaharaḥ krimighnaḥ',
        translation: 'The drug has bitter and astringent tastes, hot potency, and alleviates pitta and kapha. It is also anti-parasitic.',
        commentary: 'Describes the pharmacological properties and anti-parasitic action of Tilvaka.'
      },
      {
        number: '7',
        sanskrit: 'kuththa krimi visarpa ca tilvakaḥ virechanārtham',
        translation: 'In skin diseases, parasitic infections, and erysipelas, Tilvaka should be used for purgation.',
        commentary: 'Establishes the primary clinical indications for Tilvaka purgation.'
      }
    ],
    topics: [
      {
        title: 'Tilvaka Plant Profile',
        content: 'Tilvaka (Cassia tora) belongs to Fabaceae (Leguminosae) family. Synonyms include Chakramarda, Prapunnada, Edagaja, Dadrughna. It is a small annual shrub (30-90cm) with compound leaves and yellow flowers. The pods are curved and contain 20-30 seeds. Found throughout India in wastelands and roadsides.',
        clinicalRelevance: 'Easy availability and identification make it a practical choice for skin disease treatment and purgation therapy.'
      },
      {
        title: 'Pharmacological Profile',
        content: 'Rasa: Tikta (bitter), Kashaya (astringent). Guna: Laghu (light), Ruksha (dry). Veerya: Ushna (hot). Vipaka: Katu (pungent). Chemical constituents include anthraquinone glycosides (chrysophanic acid, emodin, obtusifolin, chrysophanol), flavonoids, and fatty acids. The seeds contain higher concentration of anthraquinones than leaves.',
        clinicalRelevance: 'The bitter taste and anthraquinone content explain its purgative and skin-healing properties.'
      },
      {
        title: 'Anti-Dermatophytic Activity',
        content: 'Tilvaka has demonstrated significant anti-dermatophytic activity against common skin pathogens including Trichophyton, Microsporum, and Epidermophyton species. The leaf extract shows both fungistatic and fungicidal properties. This validates its traditional use in kushtha (skin diseases) especially those with fungal etiology.',
        clinicalRelevance: 'Modern research validates traditional use in fungal skin infections, supporting evidence-based Ayurvedic practice.'
      },
      {
        title: 'External Applications for Skin',
        content: 'Tilvaka taila (oil prepared with Tilvaka leaves) is used externally for kushtha (skin diseases), visarpa (erysipelas), and chronic wounds. The leaves can be made into paste (kalka) for local application. The decoction is used for washing wounds and skin lesions.',
        clinicalRelevance: 'Both internal purgation and external application of Tilvaka provide comprehensive treatment for skin diseases.'
      },
      {
        title: 'Seed vs Leaf Applications',
        content: 'Seeds: Used primarily for internal purgation therapy due to higher anthraquinone content. The seed powder is taken with honey or warm water. Leaves: Used primarily for external applications in skin diseases. The leaf paste is applied locally, and the leaf decoction is used for washing.',
        clinicalRelevance: 'Different plant parts have different therapeutic applications - seeds for internal purgation, leaves for external skin treatment.'
      }
    ],
    doshaDiscussion: [
      'Tilvaka eliminates pitta and kapha doshas',
      'Special affinity for skin diseases (twak roga)',
      'Tikta rasa provides pitta-shamaka action',
      'Kashaya rasa provides kapha-shamaka action',
      'Ushna virya helps in vata disorders when combined appropriately',
      'Acts on rakta dhatu and twak dhatu specifically',
      'The drug is effective in sannipataja kushtha (tridoshic skin diseases)'
    ],
    treatmentProtocols: [
      {
        condition: 'Kushtha (Skin diseases)',
        treatment: 'Purgation with Tilvaka preparations combined with external application',
        herbs: ['Tilvaka', 'Nimba', 'Haridra', 'Khadira', 'Madhu'],
        dosage: 'Tilvaka seed powder 8-10g with honey internally; leaf paste externally',
        duration: 'Course of treatment varies by disease severity (2-6 weeks)',
        precautions: ['Monitor skin condition during treatment', 'Assess pitta levels', 'External and internal therapy combined']
      },
      {
        condition: 'Dadru (Fungal skin infection)',
        treatment: 'Tilvaka purgation with anti-fungal herb combination',
        herbs: ['Tilvaka', 'Nimba', 'Gandhaka (sulfur)', 'Haridra', 'Madhu'],
        dosage: 'Tilvaka powder 6-8g with honey internally; leaf decoction for washing',
        duration: '2-4 weeks with external application',
        precautions: ['Maintain hygiene', 'Avoid scratching', 'Monitor for spread of infection']
      },
      {
        condition: 'Visarpa (Erysipelas)',
        treatment: 'Tilvaka with pitta-rakta shamaka herbs',
        herbs: ['Tilvaka', 'Chandana', 'Ushira', 'Sariva', 'Madhu'],
        dosage: 'Tilvaka powder 8-10g with cooling adjuvants',
        duration: 'As per disease severity',
        precautions: ['Monitor skin condition', 'Assess pitta-rakta levels', 'Avoid heat exposure']
      },
      {
        condition: 'Krimi (Parasitic infections)',
        treatment: 'Tilvaka purgation with anti-parasitic herbs',
        herbs: ['Tilvaka', 'Vidanga', 'Palasha', 'Madhu', 'Saindhava'],
        dosage: 'Tilvaka powder 6-8g with Vidanga and honey',
        duration: '3-7 days',
        precautions: ['Monitor stool for parasite elimination', 'Repeat if necessary']
      },
      {
        condition: 'Prameha (Diabetes/Urinary disorders)',
        treatment: 'Tilvaka with anti-diabetic herb combination',
        herbs: ['Tilvaka', 'Nimba', 'Guduchi', 'Amalaki', 'Madhu'],
        dosage: 'Tilvaka powder 5-8g with bitter herbs',
        duration: 'Long-term management',
        precautions: ['Monitor blood sugar levels', 'Assess kidney function']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kushtha (Skin diseases)',
        sanskrit: 'कुष्ठ',
        etiology: 'Vitiation of all three doshas, especially pitta and kapha, affecting twak (skin) and rakta dhatu due to incompatible diet and lifestyle',
        symptoms: ['Skin discoloration', 'Itching', 'Scaling', 'Burning sensation', 'Numbness', 'Thickening of skin'],
        prognosis: 'Varies by type - some curable (sadhyasadhya), some manageable (yapya)',
        treatment: 'Internal purgation with Tilvaka and external application of Tilvaka leaf paste or oil'
      },
      {
        name: 'Dadru (Dermatophytosis)',
        sanskrit: 'दद्रु',
        etiology: 'Kapha-pitta vitiation with fungal infection of the skin',
        symptoms: ['Circular red patches', 'Itching', 'Scaling', 'Clear center with raised borders'],
        prognosis: 'Sukhasadhya (easily curable with proper treatment)',
        treatment: 'Tilvaka purgation with anti-fungal herbs and external application'
      }
    ],
    importantVerses: [
      'Tilvaka is especially indicated for skin diseases',
      'Purgation with Tilvaka eliminates pitta and kapha from the body',
      'The drug has dual action - internal purgation and external skin healing',
      'Seeds are used for purgation while leaves are used for external application',
      'Anti-parasitic action makes it effective for krimi (parasitic) skin conditions'
    ],
    clinicalApplications: [
      'Treatment of skin diseases (kushtha)',
      'Purgation therapy for pitta-kapha disorders',
      'Management of inflammatory skin conditions',
      'Anti-fungal therapy for dermatophytosis',
      'Treatment of erysipelas (visarpa)',
      'Anti-parasitic therapy for skin infections',
      'Management of prameha (diabetes) with skin complications',
      'External application for chronic wounds',
      'Treatment of skin allergies and hypersensitivity reactions',
      'Comprehensive skin disease management with internal and external therapy'
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
      'Requires careful dosing due to strong action',
      'Also known as Snuhi, Sehunda, and Vajradruma',
      'The plant is a succulent shrub found throughout India in dry regions',
      'Rasa: Katu (pungent), Tikta (bitter). Guna: Laghu (light), Tikshna (sharp), Ruksha (dry)',
      'Veerya: Ushna (hot). Vipaka: Katu (pungent)',
      'Contains euphorbol, euphol, and other diterpene alcohols responsible for purgative action',
      'The latex is collected by making incisions in the stem',
      'Shodhana (purification) is essential before pharmaceutical use to reduce toxicity',
      'Combined with other herbs to moderate its strong action',
      'Used primarily when milder purgatives fail to achieve adequate dosha elimination',
      'The drug has anti-inflammatory, analgesic, and anti-tumor properties',
      'Expert supervision is mandatory due to potential for severe purgation'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ sūdhākalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Sudha kalpa" (Pharmaceutical preparations of Sudha). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Sudha preparations.'
      },
      {
        number: '3',
        sanskrit: 'snuhi sehunda vajradruma sudha nāmāni tasya',
        translation: 'Snuhi, Sehunda, Vajradruma, and Sudha are the synonyms for this drug.',
        commentary: 'Establishes the synonym list for proper drug identification.'
      },
      {
        number: '5',
        sanskrit: 'kaṭutiktakaṣāyoṣṇaḥ kaphavātaharaḥ tiktaḥ',
        translation: 'The drug has pungent, bitter, and astringent tastes, hot potency, and alleviates kapha and vata.',
        commentary: 'Describes the fundamental pharmacological properties of Sudha.'
      },
      {
        number: '7',
        sanskrit: 'śodhitam kṣīrayuktam virechanārthaṁ prayojayet',
        translation: 'The purified drug combined with milk should be administered for purgation therapy.',
        commentary: 'Emphasizes the need for purification (shodhana) before use and combination with milk for safety.'
      }
    ],
    topics: [
      {
        title: 'Sudha Plant Profile',
        content: 'Sudha (Euphorbia neriifolia) belongs to Euphorbiaceae family. Synonyms include Snuhi, Sehunda, Vajradruma, Samantadugdha. It is a succulent shrub (2-4m) with thick, fleshy stems and spines. The latex is milky white and highly irritant. Found throughout India in dry and rocky regions.',
        clinicalRelevance: 'Proper identification is crucial due to the toxic nature of the latex requiring careful handling.'
      },
      {
        title: 'Shodhana (Purification) Process',
        content: 'The latex of Sudha requires shodhana (purification) before pharmaceutical use to reduce toxicity while maintaining therapeutic action. The latex is processed with milk, ghee, or specific herbal decoctions. This process reduces the irritant and toxic properties while preserving the purgative action.',
        clinicalRelevance: 'Shodhana is mandatory for safe use of Sudha - unprocessed latex can cause severe GI irritation and toxicity.'
      },
      {
        title: 'Pharmacological Profile',
        content: 'Rasa: Katu (pungent), Tikta (bitter). Guna: Laghu (light), Tikshna (sharp), Ruksha (dry). Veerya: Ushna (hot). Vipaka: Katu (pungent). Chemical constituents include euphorbol, euphol, beta-amyrin, taraxasterol, and other diterpene alcohols. The latex contains euphorbin and other irritant compounds.',
        clinicalRelevance: 'The sharp and hot properties explain its strong purgative action and the need for careful dosing.'
      },
      {
        title: 'Mechanism of Strong Purgation',
        content: 'Sudha acts on the GI tract by strongly stimulating peristalsis and increasing intestinal secretions. The diterpene alcohols directly stimulate the enteric nervous system, causing rapid and forceful bowel movements. This strong action makes it effective when milder purgatives fail.',
        clinicalRelevance: 'Understanding the mechanism helps in predicting the intensity of purgation and managing complications.'
      },
      {
        title: 'Safety Considerations',
        content: 'Sudha is classified as a vishadravya (toxic substance) requiring expert handling. Contraindications include pregnancy, children, elderly, debilitated patients, and those with GI ulcers. Emergency measures including anti-diarrheal drugs and IV fluids should be available during administration.',
        clinicalRelevance: 'Mandatory safety precautions prevent severe complications from excessive purgation.'
      }
    ],
    doshaDiscussion: [
      'Sudha primarily eliminates kapha and vata doshas',
      'Potent action requires careful supervision',
      'Katu rasa and ushna virya provide strong kapha-shamaka action',
      'Tikshna guna enables penetration into deep tissues for dosha elimination',
      'Used in conditions where doshas are deeply seated and milder purgatives are ineffective',
      'The drug requires expert supervision due to potential for atiyoga (excessive purgation)'
    ],
    treatmentProtocols: [
      {
        condition: 'Severe kapha disorders',
        treatment: 'Strong purgation with Sudha preparations under expert supervision',
        herbs: ['Sudha (purified)', 'Madhu', 'Saindhava', 'Ksheera (milk)'],
        dosage: 'Sudha latex (purified) 1-2 drops with milk, carefully titrated',
        duration: 'Single administration with intensive monitoring for 24 hours',
        precautions: ['Toxicity risk - requires expert supervision', 'Emergency measures must be available', 'Contraindicated in pregnancy, children, elderly']
      },
      {
        condition: 'Gulma (Abdominal lumps)',
        treatment: 'Strong purgation with Sudha preparations to eliminate deep-seated doshas',
        herbs: ['Sudha (purified)', 'Shunthi', 'Pippali', 'Madhu', 'Ksheera'],
        dosage: 'Sudha processed with milk 2-3ml under supervision',
        duration: 'Single procedure with extended post-care',
        precautions: ['Assess size and location of gulma', 'Monitor for complications', 'Have emergency measures ready']
      },
      {
        condition: 'Udara (Abdominal diseases)',
        treatment: 'Sudha purgation for severe abdominal conditions',
        herbs: ['Sudha (purified)', 'Dashamoola', 'Madhu', 'Saindhava'],
        dosage: 'Sudha preparation 1-2ml with warm vehicle',
        duration: 'Single administration with monitoring',
        precautions: ['Assess ascites if present', 'Monitor fluid balance', 'Expert supervision mandatory']
      },
      {
        condition: 'Pleeha (Splenomegaly)',
        treatment: 'Sudha with specific herbs for splenic disorders',
        herbs: ['Sudha (purified)', 'Kushtha', 'Shunthi', 'Pippali', 'Madhu'],
        dosage: 'Carefully titrated dose under expert supervision',
        duration: 'Single procedure with extended monitoring',
        precautions: ['Assess splenic size', 'Monitor for rupture risk', 'Emergency surgical backup needed']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Gulma (Abdominal lumps)',
        sanskrit: 'गुल्म',
        etiology: 'Vitiation of vata dosha leading to formation of palpable masses in the abdomen, often due to suppression of natural urges and irregular diet',
        symptoms: ['Palpable abdominal mass', 'Pain in abdomen', 'Constipation', 'Distension', 'Difficulty in breathing'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases',
        treatment: 'Strong purgation with Sudha preparations to eliminate deep-seated vata-kapha doshas'
      },
      {
        name: 'Udara (Abdominal diseases)',
        sanskrit: 'उदर',
        etiology: 'Vitiation of all three doshas leading to abdominal enlargement, often due to liver dysfunction, ascites, or organomegaly',
        symptoms: ['Abdominal enlargement', 'Loss of appetite', 'Weakness', 'Difficulty in breathing', 'Edema'],
        prognosis: 'Asadhya (incurable) in advanced cases, Krichrasadhya (difficult) in early stages',
        treatment: 'Sudha purgation combined with specific herbs for dosha elimination'
      }
    ],
    importantVerses: [
      'Sudha is a potent purgative requiring expert supervision',
      'Shodhana (purification) is mandatory before pharmaceutical use',
      'Combined with milk to moderate its strong action',
      'Used when milder purgatives fail to achieve adequate dosha elimination',
      'Emergency measures must be available during administration'
    ],
    clinicalApplications: [
      'Strong purgation for severe kapha-vata disorders',
      'Treatment of abdominal masses and obstructions',
      'Management of splenic disorders',
      'Therapy for severe udara (abdominal diseases)',
      'Elimination of deep-seated doshas',
      'Treatment of conditions resistant to milder purgatives',
      'Expert-supervised purgation for severe conditions',
      'Emergency dosha elimination in critical cases'
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
      'Combined preparations enhance therapeutic efficacy',
      'Saptala (Acacia concinna) is also used for hair washing and cleaning',
      'Shankhini (Canscora decurrens) has additional nervine properties',
      'Both drugs have tikta (bitter) and kashaya (astringent) rasa',
      'The combination provides balanced purgation without excessive action',
      'Saptala contains saponins that provide both purgative and cleansing action',
      'Shankhini has hepatoprotective and neuroprotective properties',
      'The drugs are effective in pitta-kapha predominant skin diseases',
      'Combined with honey and rock salt for enhanced efficacy',
      'The formulations include powders, decoctions, and linctus preparations',
      'Safe for moderate dosha conditions requiring gentle purgation',
      'The drugs act on purishavaha srotas and raktavaha srotas',
      'Can be combined with other purgatives for customized action'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ saptalāśaṅkhinīkalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Saptalashankhini kalpa" (Pharmaceutical preparations of Saptala and Shankhini). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on Saptala and Shankhini preparations.'
      },
      {
        number: '3',
        sanskrit: 'saptala śaṅkhinī ca virechanārthaṁ prayojayet | pittakaphaharaṁ ca te',
        translation: 'Saptala and Shankhini should be administered for purgation. They alleviate pitta and kapha doshas.',
        commentary: 'Core verse establishing the therapeutic purpose of these combined purgative drugs.'
      },
      {
        number: '5',
        sanskrit: 'tiktaḥ kaṣāyoṣṇaḥ pittakaphaharaḥ raktadoshaharaḥ',
        translation: 'The drugs have bitter and astringent tastes, hot potency, and alleviate pitta, kapha, and blood disorders.',
        commentary: 'Describes the pharmacological properties and blood-purifying action.'
      },
      {
        number: '7',
        sanskrit: 'madhu saindhava saṁyuktam virechanārthaṁ prayojayet',
        translation: 'Combined with honey and rock salt, the drugs should be used for purgation therapy.',
        commentary: 'Specifies the common adjuvants used with Saptala and Shankhini for purgation.'
      }
    ],
    topics: [
      {
        title: 'Saptala Plant Profile',
        content: 'Saptala (Acacia concinna) belongs to Fabaceae (Leguminosae) family. Synonyms include Shikakai, Saptala, Charmakasa, Bahuphenila. It is a climbing shrub with compound leaves and brown pods. The pods contain saponins that provide both purgative and cleansing action. Found throughout India in tropical forests.',
        clinicalRelevance: 'The saponin content provides dual action - purgation internally and cleansing externally.'
      },
      {
        title: 'Shankhini Plant Profile',
        content: 'Shankhini (Canscora decurrens) belongs to Gentianaceae family. It is an annual herb found in moist places throughout India. The whole plant is used for pharmaceutical preparations. The drug has additional nervine and hepatoprotective properties beyond purgation.',
        clinicalRelevance: 'The nervine properties make it suitable for conditions involving both dosha vitiation and nervous system involvement.'
      },
      {
        title: 'Combined Drug Action',
        content: 'The combination of Saptala and Shankhini provides balanced purgation without the excessive action of single potent drugs. Saptala provides the primary purgative action through saponins, while Shankhini adds hepatoprotective and nervine benefits. The combination is gentler than Sudha or Kritavedhana preparations.',
        clinicalRelevance: 'Combined therapy provides comprehensive treatment addressing multiple systems simultaneously.'
      },
      {
        title: 'Blood Purification Properties',
        content: 'Both Saptala and Shankhini have rakta shodhaka (blood-purifying) properties. They help eliminate pitta from the blood, making them effective in skin diseases with pitta-rakta involvement. The blood-purifying action complements the purgative effect for comprehensive dosha elimination.',
        clinicalRelevance: 'The dual action on blood and GI tract makes them ideal for skin diseases with blood involvement.'
      }
    ],
    doshaDiscussion: [
      'Saptala and Shankhini eliminate pitta and kapha doshas',
      'Act on purishavaha srotas and raktavaha srotas',
      'Tikta rasa provides pitta-shamaka action',
      'Kashaya rasa provides kapha-shamaka action',
      'Ushna virya helps in vata disorders when combined appropriately',
      'The combination provides balanced tridoshahara action with pitta-kapha predominance'
    ],
    treatmentProtocols: [
      {
        condition: 'Pitta-kapha disorders',
        treatment: 'Purgation with Saptala-Shankhini preparations',
        herbs: ['Saptala', 'Shankhini', 'Madhu', 'Saindhava'],
        dosage: 'Saptala-Shankhini powder 8-12g with honey and rock salt',
        duration: 'Single administration with 3-5 days paschatkarma',
        precautions: ['Monitor purgation response', 'Assess dosha levels', 'Ensure adequate hydration']
      },
      {
        condition: 'Raktaja Vikara (Blood disorders)',
        treatment: 'Saptala-Shankhini with blood-purifying herbs',
        herbs: ['Saptala', 'Shankhini', 'Sariva', 'Manjistha', 'Madhu'],
        dosage: 'Combined powder 10-12g with blood-purifying decoction',
        duration: 'Course of treatment varies by disease severity',
        precautions: ['Monitor blood parameters', 'Assess pitta-rakta levels']
      },
      {
        condition: 'Kushtha (Skin diseases)',
        treatment: 'Saptala-Shankhini purgation with skin-healing herbs',
        herbs: ['Saptala', 'Shankhini', 'Nimba', 'Haridra', 'Khadira', 'Madhu'],
        dosage: 'Combined powder 10-12g with skin-healing decoction',
        duration: '2-4 weeks with external application',
        precautions: ['Monitor skin condition', 'Assess pitta-kapha levels', 'Combine with external therapy']
      },
      {
        condition: 'Yakrit Vikara (Liver disorders)',
        treatment: 'Saptala-Shankhini with hepatoprotective herbs',
        herbs: ['Saptala', 'Shankhini', 'Kalmegha', 'Bhumyamalaki', 'Madhu'],
        dosage: 'Combined powder 8-10g with hepatoprotective adjuvants',
        duration: '2-4 weeks',
        precautions: ['Monitor liver function tests', 'Assess pitta levels']
      },
      {
        condition: 'Prameha (Urinary disorders)',
        treatment: 'Saptala-Shankhini with anti-diabetic herbs',
        herbs: ['Saptala', 'Shankhini', 'Nimba', 'Guduchi', 'Amalaki', 'Madhu'],
        dosage: 'Combined powder 8-10g with bitter herbs',
        duration: 'Long-term management',
        precautions: ['Monitor blood sugar levels', 'Assess kidney function']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Raktaja Vikara (Blood disorders)',
        sanskrit: 'रक्तज विकार',
        etiology: 'Aggravated pitta vitiating rakta dhatu due to excessive intake of pungent, sour, and salty foods',
        symptoms: ['Skin rashes', 'Burning sensation', 'Redness', 'Inflammation', 'Bleeding tendencies'],
        prognosis: 'Sukhasadhya (curable) in acute cases, Krichrasadhya (difficult) in chronic cases',
        treatment: 'Saptala-Shankhini purgation with blood-purifying herbs to eliminate pitta from rakta dhatu'
      },
      {
        name: 'Yakrit Vikara (Liver disorders)',
        sanskrit: 'यकृत विकार',
        etiology: 'Aggravated pitta affecting liver function due to alcohol, toxins, or incompatible diet',
        symptoms: ['Jaundice', 'Loss of appetite', 'Nausea', 'Abdominal pain', 'Weakness'],
        prognosis: 'Varies by severity - some curable, some manageable',
        treatment: 'Saptala-Shankhini purgation with hepatoprotective herbs'
      }
    ],
    importantVerses: [
      'Saptala and Shankhini are effective purgative drugs for pitta-kapha disorders',
      'The combination provides balanced purgation without excessive action',
      'Both drugs have blood-purifying properties in addition to purgation',
      'Combined with honey and rock salt for enhanced efficacy',
      'Safe for moderate dosha conditions requiring gentle purgation'
    ],
    clinicalApplications: [
      'Virechana for pitta-kapha conditions',
      'Treatment of abdominal disorders',
      'Management of skin diseases with pitta predominance',
      'Blood purification therapy',
      'Treatment of liver disorders',
      'Management of urinary disorders',
      'Therapy for inflammatory conditions',
      'Treatment of blood-borne skin diseases',
      'Comprehensive dosha elimination therapy',
      'Gentle purgation for moderate dosha conditions'
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
      'The chapter was restored by Dridhabala as it was unavailable in the original',
      'Danti (Baliospermum montanum) is also known as Danti, Nakta, and Upakunchika',
      'Dravanti (Jatropha curcas) is also known as Dravanti, Kananaer, and Jangali Erandi',
      'Both drugs have tikshna (sharp) and ushna (hot) properties for strong purgation',
      'Danti root is the primary therapeutic part for purgation',
      'Dravanti seeds and latex are used for pharmaceutical preparations',
      'The drugs are combined to provide balanced purgation action',
      'Requires expert supervision due to strong action potential',
      'The formulations include powders, decoctions, and oil preparations',
      'These are the concluding purgative drugs in the Charak Samhita pharmaceutical section',
      'The chapter completes the six emetic and six purgative drug preparations',
      'Dridhabala restored this chapter from scattered manuscripts of Agnivesha tantra'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ dantīdravantīkalpaṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Dantidravanti kalpa" (Pharmaceutical preparations of Danti and Dravanti). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the final chapter on purgative preparations.'
      },
      {
        number: '3',
        sanskrit: 'dantī dravantī ca virechanārthaṁ prayojayet | tridoshaharaṁ ca te',
        translation: 'Danti and Dravanti should be administered for purgation. They alleviate all three doshas.',
        commentary: 'Core verse establishing the tridoshahara action of these potent purgative drugs.'
      },
      {
        number: '5',
        sanskrit: 'tikṣṇoṣṇaṁ virechanaṁ danti dravantī ca kaphavātaharaṁ',
        translation: 'Danti and Dravanti are sharp and hot purgatives that alleviate kapha and vata.',
        commentary: 'Describes the fundamental pharmacological properties of these potent drugs.'
      },
      {
        number: '7',
        sanskrit: 'dridhabalena pratisamskṛtam etat adhyāyam',
        translation: 'This chapter was restored and compiled by Dridhabala from the original Agnivesha tantra.',
        commentary: 'Acknowledges the contribution of Dridhabala in preserving this final chapter of Kalpa Sthana.'
      }
    ],
    topics: [
      {
        title: 'Danti Plant Profile',
        content: 'Danti (Baliospermum montanum) belongs to Euphorbiaceae family. Synonyms include Danti, Nakta, Upakunchika, Hamsapadi. It is a shrub (1-3m) with thick roots containing milky latex. Found throughout India in deciduous forests. The root bark is the primary therapeutic part for purgation preparations.',
        clinicalRelevance: 'Proper identification and root harvesting ensures maximum therapeutic efficacy of Danti preparations.'
      },
      {
        title: 'Dravanti Plant Profile',
        content: 'Dravanti (Jatropha curcas) belongs to Euphorbiaceae family. Synonyms include Dravanti, Kananaer, Jangali Erandi, Ratanjot. It is a shrub (2-5m) with lobed leaves and seeds containing oil. Found throughout India in dry regions. The seeds and latex are used for pharmaceutical preparations.',
        clinicalRelevance: 'The seeds contain phorbol esters that provide strong purgative action requiring careful dosing.'
      },
      {
        title: 'Kalpa Sthana Completion',
        content: 'This chapter completes the six purgative drug preparations (shat kalpa) of Kalpa Sthana. The twelve chapters cover: 1-6: Emetic drug preparations (Madana, Jimutaka, Ikshvaku, Kutaja, Yastimadhu, Pippali), 7-12: Purgative drug preparations (Shyama-Trivrit, Chaturangula, Tilvaka, Sudha, Saptala-Shankhini, Danti-Dravanti).',
        clinicalRelevance: 'Understanding the complete pharmaceutical section provides comprehensive knowledge of panchakarma drug preparations.'
      },
      {
        title: 'Dridhabala Contribution',
        content: 'The final chapters of Kalpa Sthana (and several other sections) were restored by Dridhabala, a renowned Ayurvedic scholar. He compiled these chapters from scattered manuscripts of the original Agnivesha tantra, ensuring the preservation of this critical pharmaceutical knowledge for future generations.',
        clinicalRelevance: 'Acknowledges the textual history and preservation efforts that made this knowledge available to modern practitioners.'
      },
      {
        title: 'Combined Drug Action',
        content: 'The combination of Danti and Dravanti provides potent tridoshahara purgation. Danti provides the primary purgative action through its root compounds, while Dravanti adds additional potency through its seed compounds. The combination is effective for severe dosha conditions resistant to milder purgatives.',
        clinicalRelevance: 'Combined therapy provides comprehensive treatment for severe dosha conditions requiring strong elimination.'
      }
    ],
    doshaDiscussion: [
      'Danti and Dravanti eliminate all three doshas through strong purgation',
      'Used when milder purgatives are insufficient',
      'Tikshna and ushna properties provide strong kapha-vata shamaka action',
      'Effective for deep-seated doshas in mahavaha srotas',
      'Requires careful dosing to avoid atiyoga (excessive purgation)',
      'The drugs have tridoshahara action with emphasis on kapha-vata elimination'
    ],
    treatmentProtocols: [
      {
        condition: 'Severe dosha accumulation',
        treatment: 'Strong purgation with Danti-Dravanti preparations under expert supervision',
        herbs: ['Danti', 'Dravanti', 'Madhu', 'Saindhava', 'Ksheera'],
        dosage: 'Danti-Dravanti powder 5-8g with honey and rock salt, carefully titrated',
        duration: 'Single administration with intensive monitoring for 24 hours',
        precautions: ['Potent drugs requiring expert supervision', 'Emergency measures must be available', 'Contraindicated in pregnancy, children, elderly']
      },
      {
        condition: 'Gulma (Abdominal lumps)',
        treatment: 'Strong purgation with Danti-Dravanti for deep-seated dosha elimination',
        herbs: ['Danti', 'Dravanti', 'Shunthi', 'Pippali', 'Madhu'],
        dosage: 'Danti-Dravanti preparation 3-5ml under supervision',
        duration: 'Single procedure with extended post-care',
        precautions: ['Assess size and location of gulma', 'Monitor for complications', 'Have emergency measures ready']
      },
      {
        condition: 'Udara (Abdominal diseases)',
        treatment: 'Danti-Dravanti purgation for severe abdominal conditions',
        herbs: ['Danti', 'Dravanti', 'Dashamoola', 'Madhu', 'Saindhava'],
        dosage: 'Danti-Dravanti preparation 2-3ml with warm vehicle',
        duration: 'Single administration with monitoring',
        precautions: ['Assess ascites if present', 'Monitor fluid balance', 'Expert supervision mandatory']
      },
      {
        condition: 'Kapha-Vata disorders (severe)',
        treatment: 'Danti-Dravanti for conditions resistant to milder purgatives',
        herbs: ['Danti', 'Dravanti', 'Trikatu', 'Madhu', 'Saindhava'],
        dosage: 'Danti-Dravanti powder 5-8g with trikatu and honey',
        duration: 'Single procedure with monitoring',
        precautions: ['Assess dosha levels carefully', 'Monitor purgation quality', 'Expert supervision required']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Gulma (Abdominal lumps)',
        sanskrit: 'गुल्म',
        etiology: 'Vitiation of vata dosha leading to formation of palpable masses in the abdomen, often due to suppression of natural urges and irregular diet',
        symptoms: ['Palpable abdominal mass', 'Pain in abdomen', 'Constipation', 'Distension', 'Difficulty in breathing'],
        prognosis: 'Krichrasadhya (difficult to cure) in chronic cases',
        treatment: 'Strong purgation with Danti-Dravanti preparations to eliminate deep-seated vata-kapha doshas'
      },
      {
        name: 'Udara (Abdominal diseases)',
        sanskrit: 'उदर',
        etiology: 'Vitiation of all three doshas leading to abdominal enlargement, often due to liver dysfunction, ascites, or organomegaly',
        symptoms: ['Abdominal enlargement', 'Loss of appetite', 'Weakness', 'Difficulty in breathing', 'Edema'],
        prognosis: 'Asadhya (incurable) in advanced cases, Krichrasadhya (difficult) in early stages',
        treatment: 'Danti-Dravanti purgation combined with specific herbs for dosha elimination'
      }
    ],
    importantVerses: [
      'Danti and Dravanti complete the twelve chapters of Kalpa Sthana',
      'These are the final purgative preparations described by Charaka',
      'Chapter restored by Dridhabala from the original Agnivesha tantra',
      'The drugs have tridoshahara action with emphasis on kapha-vata elimination',
      'Expert supervision is mandatory due to the potent action of these drugs'
    ],
    clinicalApplications: [
      'Strong purgation for severe dosha conditions',
      'Completion of the emesis-purgation pharmaceutical spectrum',
      'Requires expert supervision due to potency',
      'Treatment of abdominal masses and obstructions',
      'Management of severe abdominal diseases',
      'Therapy for conditions resistant to milder purgatives',
      'Deep-seated dosha elimination',
      'Expert-supervised purgation for critical conditions',
      'Treatment of complex kapha-vata disorders',
      'Comprehensive purgation therapy for severe conditions'
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
