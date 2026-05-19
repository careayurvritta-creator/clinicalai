import type { CharakChapter } from './types'

export const CHIKITSA_STHANA: CharakChapter[] = [
  {
    id: 'chikitsa-1',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 1,
    name: 'Rasayana Chikitsa',
    sanskrit: 'रसायन चिकित्सा',
    english: 'Rejuvenation Therapy',
    summary: 'Rasayana Chikitsa deals with rejuvenation and anti-ageing therapies, immunity enhancement, and geriatric healthcare. It promotes excellent qualities of body cells through improved nutrition, digestion, metabolism, and microcirculation. The chapter is divided into four padas: Abhayamalakiya, Pranakamiya, Karaprachitiya, and Ayurvedasamutthaniya.',
    keyConcepts: [
      'Rasayana promotes longevity, memory, intelligence, youthfulness, and immunity',
      'Two modes: Kutipraveshika (indoor) and Vatatapika (outdoor)',
      'Body purification (shodhana) is essential before Rasayana therapy',
      'Rasayana acts at three levels: rasa (nutrient), agni (metabolic), srotas (circulatory)',
      'Vyadhikshamatva (immunity) is a key outcome of Rasayana',
      'Achara Rasayana - conduct-based rejuvenation',
      'Medhya Rasayana - intellect-promoting rejuvenation'
    ],
    shlokas: [
      {
        number: '1.1.7-8',
        sanskrit: 'दीर्घमायुः स्मृतिं मेधामारोग्यं तरुणंवयः | प्रभावर्णस्वरौदार्यं देहेन्द्रियबलं परम् || वाक्सिद्धिं प्रणतिंकान्तिं लभते ना रसायनात् |',
        translation: 'By Rasayana therapy, one attains longevity, memory, intelligence, freedom from illness, youthfulness, excellence of lustre, complexion and voice, optimum strength of physique and sense organs, perfection in deliberation, respectability and brilliance.',
        commentary: 'This foundational verse establishes the comprehensive benefits of Rasayana therapy across physical, mental, and social dimensions of health.'
      },
      {
        number: '1.1.3-4',
        sanskrit: 'चिकित्सितं व्याधिहरं पथ्यं साधनमौषधम् | प्रायश्चित्तं प्रशमनंप्रकृतिस्थापनं हितम् ||',
        translation: 'Chikitsa (measures which alleviate disorders), vyadhihara (destroyer of diseases), pathya (beneficial for bodily channels), sadhana (instrument for therapeutic action), aushadha (prepared of herbs), prayashchitta (expiation), prashamana (pacification), prakritisthapana (helps recovery to normalcy) - these are synonyms of bheshaja (therapeutics).',
        commentary: 'Defines the multiple facets of therapeutic intervention in Ayurveda.'
      },
      {
        number: '1.1.29-30',
        sanskrit: 'हरीतकीं पञ्चरसामुष्णामलवणां शिवाम् | दोषानुलोमनीं लघ्वींविद्याद्दीपनपाचनीम् || आयुष्यां पौष्टिकीं धन्यां वयसः स्थापनीं पराम् | सर्वरोगप्रशमनींबुद्धीन्द्रियबलप्रदाम् ||',
        translation: 'Haritaki has five tastes (devoid of saline), is hot in potency, wholesome, carminative, light, appetizer, digestive, life-promoting, tonic, excellent sustainer of youthfulness, relieves all diseases and affords strength to all sense organs.',
        commentary: 'Establishes Haritaki as a supreme Rasayana herb with broad-spectrum therapeutic properties.'
      }
    ],
    topics: [
      {
        title: 'Types of Bheshaja (Therapeutics)',
        content: 'Therapeutics is of two categories: (1) Ojovardhaka - that promotes strength and immunity in the healthy, (2) Roganut - that alleviates disorders. The Ojovardhaka category includes Rasayana (rejuvenation) and Vajikarana (aphrodisiac).',
        clinicalRelevance: 'Fundamental classification guiding treatment approach - promotive vs curative.'
      },
      {
        title: 'Kutipraveshika Rasayana',
        content: 'Indoor Rasayana therapy where the patient stays in a specially constructed cottage (kuti) with three interior chambers, thick walls, season-comfortable design, impermeable to undesirable sense objects. The cottage should face east or north, be in an auspicious location inhabited by physicians and scholars.',
        clinicalRelevance: 'Intensive rejuvenation protocol requiring complete environmental control - used for severe debility and chronic conditions.'
      },
      {
        title: 'Vatatapika Rasayana',
        content: 'Outdoor Rasayana therapy that can be administered while the patient continues normal daily activities. Less intensive than Kutipraveshika but more practical for most patients.',
        clinicalRelevance: 'Practical rejuvenation approach for outpatient settings and maintenance therapy.'
      },
      {
        title: 'Body Purification Before Rasayana',
        content: 'Before Rasayana, the patient must undergo shodhana (purification) with formulations of Haritaki, rock salt, Amalaka, jaggery, Vacha, Vidanga, Haridra, Pippali, and Shunthi with hot water. Followed by barley preparations with ghee for 3-7 days until bowels are clean.',
        clinicalRelevance: 'Essential preparatory step - purification ensures optimal absorption and efficacy of Rasayana drugs.'
      },
      {
        title: 'Chyavanaprasha',
        content: 'The most celebrated Rasayana formulation containing Amalaki as the primary ingredient along with numerous herbs, prepared as an avaleha (confection). Promotes immunity, longevity, respiratory health, and overall vitality.',
        clinicalRelevance: 'Widely used formulation for immune enhancement, respiratory conditions, and anti-ageing.'
      },
      {
        title: 'Brahma Rasayana',
        content: 'A potent Rasayana formulation containing Haritaki, Amalaki, Panchamula, Vidarigandhadi group, and numerous other herbs processed with ghee and honey. Promotes intellect, memory, and longevity.',
        clinicalRelevance: 'Used for cognitive enhancement, neuroprotection, and severe debility.'
      },
      {
        title: 'Medhya Rasayana',
        content: 'Four intellect-promoting Rasayanas: (1) Mandukaparni swarasa, (2) Yastimadhu churna with ksheera, (3) Guduchi swarasa, (4) Sankhapushpi churna. These promote memory, intelligence, and cognitive function.',
        clinicalRelevance: 'Specific protocol for cognitive disorders, learning disabilities, and neurodegenerative conditions.'
      },
      {
        title: 'Achara Rasayana',
        content: 'Code of conduct that provides Rasayana effects: truthfulness, non-violence, compassion, charity, calmness, cleanliness, yoga practice, celibacy, and devotion to spiritual knowledge.',
        clinicalRelevance: 'Lifestyle-based rejuvenation - important for holistic treatment approach.'
      }
    ],
    doshaDiscussion: [
      'Rasayana therapy is suitable for all prakriti types when properly selected',
      'Vata prakriti individuals benefit from snigdha (unctuous) Rasayanas like Chyavanaprasha',
      'Pitta prakriti individuals benefit from cooling Rasayanas like Amalaki',
      'Kapha prakriti individuals benefit from ushna (hot) Rasayanas like Bhallataka',
      'Purification before Rasayana helps balance all three doshas'
    ],
    treatmentProtocols: [
      {
        condition: 'General Immunity Enhancement',
        treatment: 'Chyavanaprasha Avaleha',
        herbs: ['Amalaki', 'Dashamula', 'Bilva', 'Agnimantha', 'Shyonaka', 'Kashmarya', 'Patala', 'Punarnava', 'Shalaparni', 'Prishniparni', 'Bala', 'Eranda'],
        dosage: '10-20 grams daily with milk',
        duration: 'Minimum 3 months, ideally lifelong',
        precautions: ['Avoid during acute fever', 'Use with caution in Kapha disorders', 'Take on empty stomach for best absorption']
      },
      {
        condition: 'Cognitive Enhancement',
        treatment: 'Medhya Rasayana protocol',
        herbs: ['Mandukaparni', 'Yastimadhu', 'Guduchi', 'Sankhapushpi'],
        dosage: '3-6 grams powder with milk or honey',
        duration: '3-6 months',
        precautions: ['Monitor blood pressure with Yastimadhu', 'Avoid in severe Kapha conditions']
      },
      {
        condition: 'Anti-ageing (Kayakalpa)',
        treatment: 'Kutipraveshika Rasayana with Amalaki or Bhallataka',
        herbs: ['Amalaki', 'Bhallataka', 'Shilajatu', 'Loha Bhasma'],
        dosage: 'As per individual capacity under physician supervision',
        duration: '4-8 weeks intensive',
        precautions: ['Requires strict dietary control', 'Must be supervised by experienced physician', 'Contraindicated in pregnancy and severe debility']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      '1.1.7-8 - Benefits of Rasayana: longevity, memory, intelligence, youthfulness',
      '1.1.16 - Two modes of Rasayana administration: Kutipraveshika and Vatatapika',
      '1.1.29-34 - Properties of Haritaki as universal Rasayana',
      '1.1.36-37 - Properties of Amalaki comparable to Haritaki',
      '1.3.5-6 - Medhya Rasayana for cognitive enhancement'
    ],
    clinicalApplications: [
      'Immune deficiency states - Chyavanaprasha, Amalaki Rasayana',
      'Chronic fatigue and debility - Brahma Rasayana, Nagabala Rasayana',
      'Cognitive disorders - Medhya Rasayana group',
      'Respiratory conditions - Chyavanaprasha, Agastya Haritaki',
      'Geriatric care - All Rasayana therapies',
      'Post-illness recovery - Amalaki Ghrita, Pippali Rasayana',
      'Preventive healthcare - Achara Rasayana, Dinacharya'
    ]
  },
  {
    id: 'chikitsa-3',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 3,
    name: 'Jwara Chikitsa',
    sanskrit: 'ज्वर चिकित्सा',
    english: 'Management of Fever',
    summary: 'Jwara Chikitsa establishes fundamental principles for treatment of all diseases. Jwara is not merely increased body temperature but involves malaise affecting body, senses, and mind. It is the first disease to manifest and is considered the principal and most powerful disease. The chapter covers classification, samprapti, ama jwara, nirama jwara, and detailed treatment protocols.',
    keyConcepts: [
      'Jwara afflicts deha (body), indriya (senses), and mana (mind)',
      'Ama (improperly digested substance) is the root cause of Santata Jwara',
      'Classification: 8 types by dosha, 5 by pattern, 7 by dhatu involvement',
      'Treatment follows Langhana (fasting) → Pachana (digestive) → Shodhana (purification) sequence',
      'Doshavastha (ama stage) vs Nirama stage determines treatment approach',
      'Punaravarti Jwara (recurrent fever) requires specific preventive measures',
      'Vyadhi is the lord of diseases - Jwara is the first manifestation'
    ],
    shlokas: [
      {
        number: '3.1.4',
        sanskrit: 'देहेन्द्रियमनस्तापी सर्वरोगाग्रजो बली | ज्वरः प्रधानो रोगाणामुक्तो भगवता पुरा ||',
        translation: 'Jwara afflicts the body, senses and mind, is the first disease to be manifested, and is the principal and most powerful disease.',
        commentary: 'Establishes Jwara as the foremost disease requiring priority treatment.'
      },
      {
        number: '3.1.31',
        sanskrit: 'ज्वरप्रत्यात्मिकं लिङ्गं सन्तापो देहमानसः | ज्वरेणाविशता भूतं न हि किञ्चिन्न तप्यते ||',
        translation: 'The cardinal feature of Jwara is feeling of heat and discomfort in body and mind. Jwara afflicts every living being completely.',
        commentary: 'Defines the pathognomonic sign of Jwara - universal santapa (heat/discomfort).'
      },
      {
        number: '3.1.12',
        sanskrit: 'तस्य प्रकृतिरुद्दिष्टा दोषाः शारीरमानसाः | देहिनं न हि निर्दोषं ज्वरः समुपसेवते ||',
        translation: 'The three physical doshas and two mental doshas are the nature (prakriti) of Jwara, as Jwara cannot originate in a person having balanced doshas.',
        commentary: 'Establishes dosha imbalance as the fundamental cause of all Jwara.'
      }
    ],
    topics: [
      {
        title: 'Classification of Jwara',
        content: 'Jwara is classified in multiple ways: (1) Sharira (physical) and Manasa (mental), (2) Saumya (cold) and Agneya (hot), (3) Antarvega (internal) and Bahirvega (external), (4) Prakrita and Vaikrita, (5) Sadhya (curable) and Asadhya (incurable), (6) Santata, Satata, Anyedyus, Tritiyaka, Chaturthaka (by pattern), (7) Vataja, Pittaja, Kaphaja, Vata-Pittaja, Vata-Kaphaja, Pitta-Kaphaja, Sannipataja, Agantuja (by cause).',
        clinicalRelevance: 'Classification determines treatment approach - each type requires specific therapeutic strategy.'
      },
      {
        title: 'Ama Jwara (Acute Fever)',
        content: 'Initial stage of fever with ama (improperly digested metabolic waste). Symptoms include heaviness, anorexia, indigestion, body ache, fatigue, coated tongue, turbid urine. Treatment focuses on Langhana (fasting) and Pachana (digestive herbs).',
        clinicalRelevance: 'Most common presentation requiring differentiation from nirama stage before treatment.'
      },
      {
        title: 'Nirama Jwara (Chronic Fever)',
        content: 'Fever that has passed the ama stage with clear signs of dosha pacification. Symptoms include appetite returning, clear tongue, normal urine. Treatment shifts to shodhana (purification) and specific dosha-pacifying measures.',
        clinicalRelevance: 'Treatment must not include shodhana during ama stage - critical diagnostic distinction.'
      },
      {
        title: 'Treatment Sequence',
        content: 'The standard treatment sequence for Jwara is: (1) Langhana (therapeutic fasting) to digest ama, (2) Pachana (digestive herbs like Shunthi, Pippali, Maricha) to process ama, (3) Shodhana (purification) when doshas are ready, (4) Shamana (palliative) with specific dosha-pacifying herbs, (5) Rasayana (rejuvenation) for convalescence.',
        clinicalRelevance: 'Sequential treatment approach is fundamental - skipping steps leads to complications.'
      },
      {
        title: 'Punaravarti Jwara (Recurrent Fever)',
        content: 'Fever that returns after apparent cure. Causes include premature discontinuation of treatment, exposure to causative factors, weakened immunity, and improper diet during convalescence. Prevention requires complete treatment course and careful dietary management.',
        clinicalRelevance: 'Common clinical problem - emphasizes importance of complete treatment and follow-up.'
      }
    ],
    doshaDiscussion: [
      'Vataja Jwara - irregular fever, body ache, dryness, insomnia, anxiety - treated with Vata-pacifying herbs',
      'Pittaja Jwara - high fever, burning sensation, thirst, sweating - treated with Pitta-pacifying herbs',
      'Kaphaja Jwara - low-grade fever, heaviness, anorexia, cold symptoms - treated with Kapha-pacifying herbs',
      'Vata-Pittaja - mixed symptoms requiring dual dosha approach',
      'Sannipataja Jwara - most severe, involves all three doshas, often asadhya (incurable)',
      'Agantuja Jwara - external causes like trauma, poison, supernatural factors'
    ],
    treatmentProtocols: [
      {
        condition: 'Ama Jwara (Acute Fever)',
        treatment: 'Langhana + Pachana',
        herbs: ['Shunthi', 'Pippali', 'Maricha', 'Hareetaki', 'Musta'],
        dosage: 'Shunthi kashaya 40ml three times daily',
        duration: 'Until ama signs resolve (3-7 days)',
        precautions: ['No food until ama clears', 'Only warm water to drink', 'Complete rest', 'No shodhana during ama stage']
      },
      {
        condition: 'Vataja Jwara',
        treatment: 'Vata-pacifying Shamana + Basti',
        herbs: ['Dashamula', 'Eranda', 'Rasna', 'Guduchi', 'Shunthi'],
        dosage: 'Dashamula kashaya 40ml with Eranda taila 10ml',
        duration: '7-14 days',
        precautions: ['Warm food only', 'Avoid cold exposure', 'Oil massage before bath']
      },
      {
        condition: 'Pittaja Jwara',
        treatment: 'Pitta-pacifying Shamana + Virechana',
        herbs: ['Guduchi', 'Amalaki', 'Chandana', 'Ushira', 'Shatavari'],
        dosage: 'Guduchi sattva 500mg twice daily with honey',
        duration: '7-14 days',
        precautions: ['Avoid hot, spicy food', 'Cool environment', 'Light diet']
      },
      {
        condition: 'Kaphaja Jwara',
        treatment: 'Kapha-pacifying Shamana + Vamana',
        herbs: ['Trikatu', 'Tulsi', 'Vasa', 'Kantakari', 'Yavani'],
        dosage: 'Trikatu churna 1-3 grams with honey',
        duration: '7-14 days',
        precautions: ['Avoid heavy, oily food', 'Light exercise', 'Warm environment']
      },
      {
        condition: 'Sannipataja Jwara',
        treatment: 'Complex protocol with Shodhana and Shamana',
        herbs: ['Dashamula', 'Guduchi', 'Amritottara kashaya', 'Pippali', 'Shilajatu'],
        dosage: 'Under strict physician supervision',
        duration: 'Variable, often chronic management',
        precautions: ['Requires experienced physician', 'Monitor vitals closely', 'Prognosis may be poor']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Santata Jwara',
        sanskrit: 'सन्तत ज्वर',
        etiology: 'Continuous fever lasting 7-12 days caused by vitiation of all three doshas affecting rasa dhatu',
        symptoms: ['Continuous high fever', 'Severe body ache', 'Anorexia', 'Thirst', 'Insomnia', 'Delirium'],
        prognosis: 'Sadhyam (curable) if treated early, Asadhyam (incurable) if neglected',
        treatment: 'Langhana, Pachana followed by Shamana'
      },
      {
        name: 'Satata Jwara',
        sanskrit: 'सतत ज्वर',
        etiology: 'Fever with two paroxysms daily, primarily Vata-Kapha involvement',
        symptoms: ['Twice daily fever spikes', 'Moderate symptoms', 'Responds to treatment'],
        prognosis: 'Sadhyam (curable)',
        treatment: 'Dosha-specific Shamana'
      },
      {
        name: 'Tritiyaka Jwara',
        sanskrit: 'तृतीयक ज्वर',
        etiology: 'Fever occurring every third day, primarily Vata-Pitta involvement',
        symptoms: ['Fever every third day', 'Mild between episodes'],
        prognosis: 'Sadhyam (curable)',
        treatment: 'Vata-Pitta Shamana'
      },
      {
        name: 'Chaturthaka Jwara',
        sanskrit: 'चतुर्थक ज्वर',
        etiology: 'Fever occurring every fourth day, primarily Kapha-Vata involvement',
        symptoms: ['Fever every fourth day', 'Heaviness during episodes'],
        prognosis: 'Kricchra Sadhyam (difficult to cure)',
        treatment: 'Kapha-Vata Shamana with Langhana'
      }
    ],
    importantVerses: [
      '3.1.4 - Jwara is the principal and most powerful disease',
      '3.1.12 - Doshas are the nature of Jwara',
      '3.1.31 - Cardinal feature is santapa (heat/discomfort)',
      '3.1.32-35 - Classification of Jwara',
      '3.1.28-29 - Premonitory symptoms of Jwara'
    ],
    clinicalApplications: [
      'Acute fever management - Langhana + Pachana protocol',
      'Chronic fever - Dosha-specific treatment',
      'Recurrent fever - Prevention through complete treatment',
      'Fever with complications - Sannipataja management',
      'Post-fever convalescence - Rasayana therapy',
      'Fever in children - Modified dosing and gentle herbs',
      'Fever with ama - Critical distinction from nirama stage'
    ]
  },
  {
    id: 'chikitsa-6',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 6,
    name: 'Prameha Chikitsa',
    sanskrit: 'प्रमेह चिकित्सा',
    english: 'Management of Diabetes/Urinary Disorders',
    summary: 'Prameha Chikitsa covers the treatment of 20 types of Prameha (diabetes/urinary disorders). The chapter details the pathogenesis involving Kapha, Pitta, and Vata doshas affecting meda (fat), mamsa (muscle), and kleda (body fluids). Treatment varies by dosha involvement and stage (Sahaja/Kaphaja vs Pittaja vs Vataja).',
    keyConcepts: [
      '20 types of Prameha: 10 Kaphaja, 4 Pittaja, 6 Vataja',
      'Kaphaja Prameha is curable (Sadhya), Pittaja is manageable (Yapya), Vataja is difficult (Asadhya)',
      'Meda (fat) and Kleda (body fluids) are primary affected dhatus',
      'Prameha can progress to Madhumeha (diabetes mellitus) if untreated',
      'Pathya (beneficial) and Apathya (harmful) foods are critical in management',
      'Shodhana (purification) followed by Shamana (palliative) is the treatment sequence',
      'Herbs like Guduchi, Amalaki, Shilajatu, Triphala are primary treatments'
    ],
    shlokas: [
      {
        number: '6.1.4',
        sanskrit: 'दोषाः सर्वे अपि मेहेषु कफादयो विशेषतः | मेदो मांसं च शुक्रं च शोणितं च विदूष्यते ||',
        translation: 'All doshas are involved in Prameha, especially Kapha. Meda (fat), mamsa (muscle), shukra (reproductive tissue), and rakta (blood) get vitiated.',
        commentary: 'Establishes the multi-dosha and multi-dhatu involvement in Prameha pathogenesis.'
      },
      {
        number: '6.1.10',
        sanskrit: 'सहजः कृतिमश्चैव प्रमेहौ द्विविधौ मतौ | कफजः साध्य उक्तस्तु पित्तजः कृच्छ्र उच्यते || वातजः सन्निपातेन प्रमेहो योsवलक्षितः | तं प्रमेहं विजानीयादसाध्यं सर्वमेव तु ||',
        translation: 'Prameha is of two types: Sahaja (congenital) and Apathyanimittaja (acquired). Kaphaja Prameha is curable, Pittaja is difficult to manage, and Vataja with sannipata is incurable.',
        commentary: 'Establishes prognosis based on dosha involvement - critical for treatment planning.'
      }
    ],
    topics: [
      {
        title: 'Classification of 20 Prameha',
        content: 'Kaphaja (10 types): Kshaudrameha, Ikshumeha, Sandrameha, Sandraprasadameha, Shuklameha, Shukrameha, Sitameha, Sikatameha, Lavanameha, Vasulameha. Pittaja (4 types): Ksharameha, Kalameha, Nilameha, Raktameha. Vataja (6 types): Majjameha, Hastimeha, Medomeha, Vasameha, Madhumeha, Kshinendriyameha.',
        clinicalRelevance: 'Each type has specific dosha and dhu tu involvement requiring tailored treatment.'
      },
      {
        title: 'Madhumeha (Diabetes Mellitus)',
        content: 'The final and most severe stage of Prameha progression where Vata dosha dominates with dhatu kshaya (tissue depletion). Characterized by sweet urine, excessive urination, thirst, fatigue, and complications affecting eyes, nerves, kidneys, and circulation.',
        clinicalRelevance: 'Most clinically relevant type - corresponds to modern diabetes mellitus.'
      },
      {
        title: 'Pathya (Beneficial Foods)',
        content: 'Barley (yava) is the best grain for Prameha. Beneficial: old rice, kulattha (horse gram), mudga (green gram), patola (bitter gourd), bitter vegetables, honey, buttermilk, lukewarm water. Regular exercise and adequate sleep are essential.',
        clinicalRelevance: 'Dietary management is the cornerstone of Prameha treatment.'
      },
      {
        title: 'Apathya (Harmful Foods)',
        content: 'Newly harvested grains, sugarcane products, jaggery, sweet foods, heavy/oily foods, excessive sleep, sedentary lifestyle, daytime sleep, and sexual excess are harmful.',
        clinicalRelevance: 'Avoiding apathya is as important as taking pathya - critical for treatment success.'
      }
    ],
    doshaDiscussion: [
      'Kaphaja Prameha - primarily affects Kapha and Meda dhatu - most treatable',
      'Pittaja Prameha - affects Pitta and Rakta dhatu - moderately treatable',
      'Vataja Prameha - involves Vata with dhatu kshaya - difficult to treat',
      'Madhumeha - Vata dominant with severe dhatu depletion - requires long-term management',
      'Sannipataja Prameha - all three doshas vitiated - often asadhya'
    ],
    treatmentProtocols: [
      {
        condition: 'Kaphaja Prameha (Early Stage)',
        treatment: 'Vamana + Shamana with Kapha-pacifying herbs',
        herbs: ['Triphala', 'Guduchi', 'Shilajatu', 'Musta', 'Kutaja', 'Ativisha'],
        dosage: 'Triphala churna 3-6 grams at bedtime with warm water',
        duration: '3-6 months',
        precautions: ['Strict dietary control', 'Regular exercise', 'Avoid sugar completely']
      },
      {
        condition: 'Pittaja Prameha',
        treatment: 'Virechana + Pitta-pacifying Shamana',
        herbs: ['Guduchi', 'Amalaki', 'Shatavari', 'Chandana', 'Ushira'],
        dosage: 'Guduchi sattva 500mg twice daily',
        duration: '3-6 months',
        precautions: ['Avoid spicy, sour foods', 'Cool environment', 'Regular monitoring']
      },
      {
        condition: 'Madhumeha (Diabetes)',
        treatment: 'Basti + Rasayana with Vata-pacifying herbs',
        herbs: ['Shilajatu', 'Guduchi', 'Amalaki', 'Haritaki', 'Nimba', 'Meshashringi'],
        dosage: 'Shilajatu 250-500mg twice daily with warm water',
        duration: 'Long-term/lifelong management',
        precautions: ['Regular blood sugar monitoring', 'Foot care', 'Eye examination', 'Kidney function monitoring']
      },
      {
        condition: 'Prameha Complications (Prameha Pidika)',
        treatment: 'Shodhana + wound care with Pramehaghna herbs',
        herbs: ['Nimba', 'Haridra', 'Daruharidra', 'Khadira', 'Triphala'],
        dosage: 'External: Haridra paste. Internal: Triphala kashaya',
        duration: 'Variable based on severity',
        precautions: ['Wound care', 'Infection prevention', 'Blood sugar control']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kshaudrameha',
        sanskrit: 'क्षौद्रमेह',
        etiology: 'Kapha vitiation causing sweet urine like honey',
        symptoms: ['Sweet urine', 'Excessive urination', 'Heaviness', 'Thirst'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Vamana, Kapha Shamana, dietary control'
      },
      {
        name: 'Madhumeha',
        sanskrit: 'मधुमेह',
        etiology: 'Vata dominant with dhatu kshaya, final stage of Prameha progression',
        symptoms: ['Sweet and astringent urine', 'Excessive urination', 'Emaciation', 'Fatigue', 'Numbness in extremities'],
        prognosis: 'Yapya (manageable, not fully curable)',
        treatment: 'Basti, Rasayana, long-term dietary management'
      }
    ],
    importantVerses: [
      '6.1.4 - All doshas involved, especially Kapha',
      '6.1.10 - Prognosis based on dosha type',
      '6.1.15-16 - 20 types of Prameha classification',
      '6.1.21 - Pathya foods - barley is best'
    ],
    clinicalApplications: [
      'Type 2 Diabetes management - comprehensive Prameha protocol',
      'Pre-diabetes - Kaphaja Prameha early intervention',
      'Diabetic complications - Prameha Pidika treatment',
      'Metabolic syndrome - Medoroga management',
      'Urinary disorders - symptom-based Prameha treatment',
      'Dietary counseling - Pathya/Apathya guidance',
      'Lifestyle modification - exercise and sleep recommendations'
    ]
  },
  {
    id: 'chikitsa-7',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 7,
    name: 'Kushtha Chikitsa',
    sanskrit: 'कुष्ठ चिकित्सा',
    english: 'Management of Skin Diseases',
    summary: 'Kushtha Chikitsa covers the treatment of 18 types of skin diseases (7 Mahakushtha and 11 Kshudrakushtha). The chapter details pathogenesis involving vitiation of all seven dhatus, treatment with Shodhana (purification), Shamana (palliative), and topical applications.',
    keyConcepts: [
      '18 types of Kushtha: 7 Mahakushtha (major) and 11 Kshudrakushtha (minor)',
      'All seven dhatus are affected in Kushtha',
      'Kapha and Pitta are primary doshas in most skin conditions',
      'Treatment requires both internal (Shamana/Shodhana) and external (Lepa/Parisheka) approaches',
      'Pathya/Apathya is critical - incompatible food combinations are major causes',
      'Krimi (microorganisms) play a role in some skin conditions',
      'Long treatment duration is required - patience and compliance are essential'
    ],
    shlokas: [
      {
        number: '7.4.3',
        sanskrit: 'कुष्ठं सप्तविधं प्रोक्तं दोषैः सम्भिन्नमेव च | कुष्ठं तु कालसेवानाद् दारुणं विषमं भवेत् ||',
        translation: 'Kushtha is of seven types caused by individual doshas and combinations. When neglected over time, it becomes severe and difficult to treat.',
        commentary: 'Emphasizes early treatment of skin diseases before they become chronic.'
      }
    ],
    topics: [
      {
        title: 'Classification of Kushtha',
        content: 'Mahakushtha (7): Kapala, Udumbara, Mandala, Rshyajihva, Pundarika, Sidhma, Kakanaka. Kshudrakushtha (11): Eka, Charmakhya, Vipadika, Kitibha, Alasaka, Dadru, Pama, Charmadala, Visphota, Shataru, Vicharchika.',
        clinicalRelevance: 'Classification guides prognosis and treatment - Mahakushtha requires aggressive Shodhana.'
      },
      {
        title: 'Samprapti (Pathogenesis)',
        content: 'Kushtha develops when vitiated doshas affect all seven dhatus (rasa through shukra). The process involves: (1) Dosha vitiation by causative factors, (2) Dosha migration to skin, (3) Dhatu involvement, (4) Manifestation of specific symptoms based on predominant dosha.',
        clinicalRelevance: 'Understanding pathogenesis explains why treatment must address multiple dhatus.'
      },
      {
        title: 'External Treatment',
        content: 'Lepa (paste application), Parisheka (pouring/irrigation), Abhyanga (oil massage), Dhupana (fumigation), Pradeha (thick paste), Prakshalana (washing) are external therapies. Specific herbs are selected based on dosha involvement.',
        clinicalRelevance: 'Topical treatment provides symptomatic relief while internal treatment addresses root cause.'
      }
    ],
    doshaDiscussion: [
      'Vataja Kushtha - dry, rough, dark-colored, painful lesions',
      'Pittaja Kushtha - reddish, burning, oozing, inflamed lesions',
      'Kaphaja Kushtha - white, thick, itchy, slow-progressing lesions',
      'Sannipataja Kushtha - mixed features, most difficult to treat',
      'Raktaja - blood tissue involvement, common in chronic conditions'
    ],
    treatmentProtocols: [
      {
        condition: 'Mahakushtha (Major Skin Diseases)',
        treatment: 'Shodhana (Vamana + Virechana) followed by Shamana',
        herbs: ['Triphala', 'Khadira', 'Nimba', 'Haridra', 'Daruharidra', 'Sarshapa', 'Chakramarda'],
        dosage: 'Khadira kashaya 40ml twice daily',
        duration: '3-6 months minimum',
        precautions: ['Strict dietary control', 'Avoid incompatible food combinations', 'Regular follow-up', 'Patience required']
      },
      {
        condition: 'Kshudrakushtha (Minor Skin Diseases)',
        treatment: 'Shamana with topical applications',
        herbs: ['Haridra', 'Nimba', 'Aragvadha', 'Saptaparna', 'Karavira'],
        dosage: 'External: Haridra paste. Internal: Nimba kashaya',
        duration: '1-3 months',
        precautions: ['Maintain hygiene', 'Avoid scratching', 'Keep affected area dry']
      },
      {
        condition: 'Dadru (Fungal Infection)',
        treatment: 'Krimighna (anti-microbial) + topical anti-fungal',
        herbs: ['Nimba', 'Haridra', 'Vidanga', 'Sarshapa', 'Chakramarda'],
        dosage: 'External: Nimba-Haridra paste. Internal: Vidanga churna 3g with honey',
        duration: '4-6 weeks',
        precautions: ['Keep area dry', 'Avoid sugar and sweet foods', 'Change clothes frequently']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kapala Kushtha',
        sanskrit: 'कपाल कुष्ठ',
        etiology: 'Vata-Kapha vitiation affecting skin, resembling fish scales',
        symptoms: ['Rough, scaly skin', 'Dark discoloration', 'Dry patches', 'Pain'],
        prognosis: 'Kricchra Sadhya (difficult to cure)',
        treatment: 'Shodhana + Shamana with Vata-Kapha pacifying herbs'
      },
      {
        name: 'Mandala Kushtha',
        sanskrit: 'मण्डल कुष्ठ',
        etiology: 'Kapha-Pitta vitiation causing circular skin lesions',
        symptoms: ['Circular patches', 'Itching', 'Redness', 'Raised borders'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Shamana + topical applications'
      }
    ],
    importantVerses: [
      '7.4.3 - Seven types of Kushtha classification',
      '7.4.5-6 - Pathogenesis involving all dhatus',
      '7.5.25-28 - External treatment methods'
    ],
    clinicalApplications: [
      'Psoriasis - Mahakushtha protocol with Shodhana',
      'Eczema - Kaphaja Kushtha treatment',
      'Fungal infections - Krimighna protocol',
      'Dermatitis - dosha-specific Shamana',
      'Vitiligo - Sidhma Kushtha management',
      'Acne - Yauvan Pidika treatment',
      'Chronic skin conditions - long-term Kushtha management'
    ]
  },
  {
    id: 'chikitsa-15',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 15,
    name: 'Grahani Chikitsa',
    sanskrit: 'ग्रहणी चिकित्सा',
    english: 'Management of Digestive Disorders',
    summary: 'Grahani Chikitsa covers the treatment of disorders of Grahani (duodenum/small intestine), which is the seat of Agni (digestive fire). This chapter is fundamental for treating all digestive disorders including IBS, malabsorption, and chronic digestive weakness.',
    keyConcepts: [
      'Grahani is the seat of Agni (digestive fire)',
      'Grahani Roga results from Agnimandya (digestive weakness)',
      'Ama (improperly digested food) is the primary pathological product',
      'Treatment follows: Langhana → Pachana → Shodhana → Shamana → Bṛmhana',
      'Pathya/Apathya is critical for treatment success',
      'Dietary habits are as important as herbs',
      'Long-term management often required for chronic conditions'
    ],
    shlokas: [
      {
        number: '15.1.3',
        sanskrit: 'ग्रहणी दहनस्योष्मणः स्थानं विशेषतः | तत्र विदग्धं विद्याच्च यत्र विद्धं विडुच्यते ||',
        translation: 'Grahani is the specific site of the digestive fire. When digestion is complete, the food is properly processed; when digestion is impaired, improperly processed food is expelled.',
        commentary: 'Establishes Grahani as the seat of Agni and explains the mechanism of digestive disorders.'
      }
    ],
    topics: [
      {
        title: 'Types of Grahani Roga',
        content: 'Four types based on dosha: Vataja (irregular digestion, gas, bloating), Pittaja (hyperacidity, burning), Kaphaja (slow digestion, heaviness, mucus), Sannipataja (mixed features). Also classified as Sama (with ama) and Nirama (without ama).',
        clinicalRelevance: 'Type determines treatment approach - Vataja needs Agni deepana, Pittaja needs Pitta Shamana.'
      },
      {
        title: 'Ama Pachana',
        content: 'First step in treatment is to digest ama using Deepana (appetizing) and Pachana (digestive) herbs. Key herbs: Shunthi, Pippali, Maricha, Hing, Ajmoda, Jeeraka, Musta.',
        clinicalRelevance: 'Cannot proceed to Shodhana or Shamana until ama is cleared.'
      }
    ],
    doshaDiscussion: [
      'Vataja Grahani - irregular appetite, gas, bloating, constipation alternating with diarrhea',
      'Pittaja Grahani - hyperacidity, burning, loose stools, inflammation',
      'Kaphaja Grahani - slow digestion, heaviness, mucus in stool, anorexia',
      'Sannipataja - mixed features, most difficult to treat'
    ],
    treatmentProtocols: [
      {
        condition: 'Vataja Grahani (IBS-Vata type)',
        treatment: 'Deepana + Vata Shamana + Basti',
        herbs: ['Hing', 'Ajmoda', 'Shunthi', 'Jeeraka', 'Dashamula'],
        dosage: 'Hingvastak churna 3-6 grams with ghee before meals',
        duration: '2-3 months',
        precautions: ['Warm food only', 'Avoid raw food', 'Regular meal times', 'Stress management']
      },
      {
        condition: 'Pittaja Grahani (Hyperacidity/IBS-Pitta type)',
        treatment: 'Pitta Shamana + Cooling herbs',
        herbs: ['Amalaki', 'Shatavari', 'Yashtimadhu', 'Chandana', 'Ushira'],
        dosage: 'Amalaki churna 3 grams with cold water twice daily',
        duration: '2-3 months',
        precautions: ['Avoid spicy, sour foods', 'Cool environment', 'Regular meals']
      },
      {
        condition: 'Kaphaja Grahani (Slow Digestion)',
        treatment: 'Kapha Shamana + Ushna Deepana',
        herbs: ['Trikatu', 'Chitraka', 'Pippali', 'Hing', 'Yavani'],
        dosage: 'Trikatu churna 1-3 grams with honey before meals',
        duration: '2-3 months',
        precautions: ['Light food', 'Avoid heavy, oily food', 'Exercise regularly']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Grahani',
        sanskrit: 'ग्रहणी',
        etiology: 'Agnimandya (digestive weakness) caused by irregular eating habits, incompatible foods, stress, and lifestyle factors',
        symptoms: ['Irregular appetite', 'Bloating', 'Gas', 'Alternating constipation and diarrhea', 'Fatigue', 'Malabsorption'],
        prognosis: 'Sadhya (curable) in acute, Yapya (manageable) in chronic',
        treatment: 'Sequential: Langhana → Pachana → Shodhana → Shamana'
      }
    ],
    importantVerses: [
      '15.1.3 - Grahani as seat of Agni',
      '15.1.5-6 - Types of Grahani Roga'
    ],
    clinicalApplications: [
      'IBS (Irritable Bowel Syndrome) - Grahani protocol',
      'Malabsorption syndrome - Agni Deepana',
      'Chronic digestive weakness - long-term management',
      'Functional dyspepsia - Grahani treatment',
      'Post-antibiotic digestive recovery - Agni restoration'
    ]
  },
  {
    id: 'chikitsa-28',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 28,
    name: 'Vatavyadhi Chikitsa',
    sanskrit: 'वातव्याधि चिकित्सा',
    english: 'Management of Neurological/Vata Disorders',
    summary: 'Vatavyadhi Chikitsa covers the treatment of diseases caused primarily by Vata dosha vitiation. This includes neurological disorders, musculoskeletal conditions, and degenerative diseases. Treatment focuses on Vata Shamana through Basti (medicated enema), Snigdha (unctuous) therapies, and specific herbs.',
    keyConcepts: [
      'Vata is the most important dosha - Pitta and Kapha cannot vitiate without Vata',
      'Vatavyadhi includes neurological, musculoskeletal, and degenerative conditions',
      'Basti is the prime treatment for Vata disorders (Ardhanga - half the treatment)',
      'Snigdha (unctuous) and Ushna (warm) qualities oppose Vata',
      'Ruksha (dry) and Sheeta (cold) are Vata-vitiating factors',
      'Treatment requires both Shamana (palliative) and Shodhana (purification)',
      'Rasayana therapy is important for chronic Vata conditions'
    ],
    shlokas: [
      {
        number: '28.1.3',
        sanskrit: 'वायुः सर्वेषु रोगेषु मुख्यं विद्धि करं सदा | विना वायुं न तत् किञ्चिद् यद् विकारकरं भवेत् ||',
        translation: 'Know that Vata is always the principal causative factor in all diseases. No disease can occur without the involvement of Vata.',
        commentary: 'Establishes Vata as the supreme dosha in pathogenesis.'
      }
    ],
    topics: [
      {
        title: 'Types of Vatavyadhi',
        content: 'Vatavyadhi includes: Pakshaghata (hemiplegia), Ardita (facial paralysis), Gridhrasi (sciatica), Avabahuka (frozen shoulder), Vishvachi (brachial neuritis), Amsashosha (wasting of shoulder), Snayu Shosha (tendon wasting), Manyastambha (torticollis), Sandhigata Vata (osteoarthritis), Mamsagata Vata (muscular dystrophy), Asthigata Vata (bone degeneration), Shukragata Vata (reproductive disorders).',
        clinicalRelevance: 'Classification helps in diagnosis and treatment planning.'
      },
      {
        title: 'Basti - The Prime Treatment',
        content: 'Basti (medicated enema) is the most important treatment for Vata disorders. Types: Anuvasana Basti (oil-based) and Niruha/Asthapana Basti (decoction-based). Basti nourishes dhatus, balances Vata, and removes ama from the colon.',
        clinicalRelevance: 'Basti is considered Ardha Chikitsa (half the treatment) - essential for all Vata conditions.'
      }
    ],
    doshaDiscussion: [
      'Vata Prakopa - primary cause of all Vatavyadhi',
      'Vata with Kapha - conditions like Sandhigata Vata with stiffness',
      'Vata with Pitta - inflammatory Vata conditions like Amavata',
      'Vata with Rakta - Vatarakta (gout-like conditions)',
      'Sannipataja Vatavyadhi - most severe, involving all doshas'
    ],
    treatmentProtocols: [
      {
        condition: 'Pakshaghata (Hemiplegia/Stroke)',
        treatment: 'Shodhana (Basti) + Shamana + Physiotherapy',
        herbs: ['Dashamula', 'Bala', 'Ashwagandha', 'Rasna', 'Eranda', 'Sahachara'],
        dosage: 'Dashamula kashaya 40ml + Bala taila for Basti',
        duration: '3-6 months intensive, then maintenance',
        precautions: ['Physiotherapy essential', 'Prevent pressure sores', 'Monitor blood pressure', 'Diet rich in proteins']
      },
      {
        condition: 'Gridhrasi (Sciatica)',
        treatment: 'Basti + Kati Basti + Shamana',
        herbs: ['Rasna', 'Eranda', 'Guggulu', 'Shunthi', 'Dashamula'],
        dosage: 'Rasna Eranda kashaya 40ml twice daily',
        duration: '1-3 months',
        precautions: ['Avoid sitting on hard surfaces', 'Warm compress', 'Gentle stretching', 'Avoid heavy lifting']
      },
      {
        condition: 'Sandhigata Vata (Osteoarthritis)',
        treatment: 'Shamana + Basti + local treatment',
        herbs: ['Guggulu', 'Ashwagandha', 'Shallaki', 'Rasna', 'Eranda'],
        dosage: 'Yogaraja Guggulu 500mg twice daily with warm water',
        duration: '3-6 months',
        precautions: ['Avoid cold exposure', 'Regular gentle exercise', 'Weight management', 'Warm oil massage']
      },
      {
        condition: 'Ardita (Facial Paralysis)',
        treatment: 'Nasya + Shamana + facial exercises',
        herbs: ['Dashamula', 'Bala', 'Sesame oil', 'Rasna'],
        dosage: 'Nasya with Dashamula taila 4-6 drops daily',
        duration: '1-3 months',
        precautions: ['Protect face from cold wind', 'Facial exercises', 'Eye care if eye closure affected']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Pakshaghata',
        sanskrit: 'पक्षाघात',
        etiology: 'Vata vitiation affecting one side of body, often due to obstruction of Vata channels',
        symptoms: ['Loss of movement on one side', 'Numbness', 'Pain', 'Speech difficulty', 'Facial deviation'],
        prognosis: 'Sadhya (curable) if treated early, Kricchra (difficult) if chronic',
        treatment: 'Basti (primary), Shamana, physiotherapy'
      },
      {
        name: 'Sandhigata Vata',
        sanskrit: 'सन्धिगत वात',
        etiology: 'Vata vitiation in joints causing degeneration, often due to aging, overuse, or injury',
        symptoms: ['Joint pain', 'Stiffness', 'Crepitus', 'Swelling', 'Reduced mobility'],
        prognosis: 'Yapya (manageable)',
        treatment: 'Shamana + Basti + local treatment with Sneha and Sweda'
      }
    ],
    importantVerses: [
      '28.1.3 - Vata is the principal causative factor in all diseases',
      '28.3.35-36 - Basti as Ardha Chikitsa'
    ],
    clinicalApplications: [
      'Stroke rehabilitation - Pakshaghata protocol',
      'Sciatica - Gridhrasi management',
      'Osteoarthritis - Sandhigata Vata treatment',
      'Facial paralysis - Ardita Nasya protocol',
      'Neuropathy - Vatavyadhi Shamana',
      'Back pain - Kati Basti protocol',
      'Joint disorders - comprehensive Vata management'
    ]
  }
]
