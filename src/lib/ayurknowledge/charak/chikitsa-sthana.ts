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
      'Medhya Rasayana - intellect-promoting rejuvenation',
      'Rasayana therapy improves dhatu quality from Rasa to Shukra',
      'Prana Karma Rasayana prevents premature aging and disease',
      'Naimittika Rasayana targets specific disease prevention',
      'Kamya Rasayana enhances desired qualities like strength and complexion',
      'Rasayana benefits manifest gradually over months of consistent use',
      'Agni (digestive fire) must be optimized before Rasayana administration',
      'Sattvic diet and lifestyle enhance Rasayana efficacy',
      'Rasayana herbs possess Madhura, Tikta, or Kashaya rasa predominantly'
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
      },
      {
        number: '1.1.36-37',
        sanskrit: 'आमलकं हरीतक्या गुणैः समम् | विशेषतः पित्तहरं रसायनम् ||',
        translation: 'Amalaki is comparable to Haritaki in properties but is especially Pitta-pacifying and rejuvenating.',
        commentary: 'Establishes Amalaki as the second supreme Rasayana herb, particularly suited for Pitta-predominant individuals.'
      },
      {
        number: '1.3.5-6',
        sanskrit: 'मण्डूकपर्णी यष्टीमधु गुडूची शङ्खपुष्पी च मेध्यानि रसायनानि |',
        translation: 'Mandukaparni, Yashtimadhu, Guduchi, and Shankhapushpi are the four intellect-promoting Rasayanas.',
        commentary: 'Lists the four Medhya Rasayanas specifically for cognitive enhancement and neuroprotection.'
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
      },
      {
        title: 'Rasayana for Different Age Groups',
        content: 'Children: Medhya Rasayana for brain development. Adults: Chyavanaprasha for vitality. Elderly: Brahma Rasayana for anti-aging. Post-illness: Amalaki Ghrita for recovery. Each age group has specific Rasayana needs.',
        clinicalRelevance: 'Age-specific Rasayana selection ensures optimal benefits and safety.'
      },
      {
        title: 'Seasonal Rasayana Administration',
        content: 'Best seasons for Rasayana: Spring (Vasanta) for Kapha-predominant individuals, Autumn (Sharad) for Pitta-predominant, Winter (Hemanta) for Vata-predominant. Avoid Rasayana during extreme weather conditions.',
        clinicalRelevance: 'Seasonal timing enhances Rasayana efficacy and reduces adverse effects.'
      },
      {
        title: 'Rasayana for Chronic Diseases',
        content: 'Rasayana is beneficial for: post-illness recovery, chronic fatigue, immune deficiency, degenerative conditions, and age-related disorders. Specific Rasayana protocols exist for different chronic conditions.',
        clinicalRelevance: 'Rasayana addresses the root cause of chronic disease - dhatu depletion.'
      },
      {
        title: 'Modern Research on Rasayana',
        content: 'Research validates: Amalaki has highest vitamin C content, Ashwagandha is adaptogenic, Brahmi enhances cognition, Guduchi is immunomodulatory, Shatavari supports reproductive health. Mechanisms include antioxidant, anti-inflammatory, and immunomodulatory effects.',
        clinicalRelevance: 'Evidence-based practice strengthens Rasayana application in modern healthcare.'
      },
      {
        title: 'Rasayana Safety and Contraindications',
        content: 'Rasayana is generally safe but contraindicated in: acute fever, ama state, pregnancy (some herbs), severe debility (use gentle Rasayana), and incompatible constitutions. Proper Purvakarma (preparation) ensures safety and efficacy.',
        clinicalRelevance: 'Safety awareness prevents adverse effects and ensures appropriate use.'
      },
      {
        title: 'Rasayana Duration and Monitoring',
        content: 'Duration varies: acute Rasayana (1-3 months), chronic Rasayana (3-6 months), preventive Rasayana (lifelong). Monitoring includes: symptom assessment, dhatu quality evaluation, Agni status, and overall wellbeing.',
        clinicalRelevance: 'Proper duration and monitoring ensure optimal outcomes.'
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
      },
      {
        condition: 'Respiratory Immunity',
        treatment: 'Chyavanaprasha + Agastya Haritaki',
        herbs: ['Amalaki', 'Pippali', 'Vasa', 'Kantakari', 'Tulsi'],
        dosage: 'Chyavanaprasha 20 grams daily with warm milk',
        duration: '3-6 months',
        precautions: ['Avoid cold exposure', 'Warm food', 'Steam inhalation as needed']
      },
      {
        condition: 'Post-COVID Recovery',
        treatment: 'Rasayana for lung and immune recovery',
        herbs: ['Ashwagandha', 'Guduchi', 'Amalaki', 'Shatavari', 'Pippali'],
        dosage: 'Ashwagandha churna 3 grams with warm milk twice daily',
        duration: '3-6 months',
        precautions: ['Gradual exercise', 'Adequate rest', 'Nutritious diet', 'Monitor lung function']
      },
      {
        condition: 'Stress and Anxiety',
        treatment: 'Medhya Rasayana + lifestyle modification',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Ashwagandha'],
        dosage: 'Brahmi Ghrita 10 grams daily with warm milk',
        duration: '3-6 months',
        precautions: ['Stress management', 'Regular sleep', 'Meditation', 'Avoid stimulants']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Jara (Senile Degeneration)',
        sanskrit: 'जरा',
        etiology: 'Natural aging process accelerated by Vata vitiation, dhatu kshaya, and Agnimandya',
        symptoms: ['Wrinkled skin', 'Gray hair', 'Weak joints', 'Poor memory', 'Reduced strength', 'Insomnia'],
        prognosis: 'Manageable with Rasayana - not curable as aging is natural',
        treatment: 'Rasayana therapy with Chyavanaprasha, Brahma Rasayana, and lifestyle modification'
      },
      {
        name: 'Ojakshaya (Immune Depletion)',
        sanskrit: 'ओजक्षय',
        etiology: 'Depletion of Ojas due to chronic illness, stress, poor nutrition, or excessive physical/mental exertion',
        symptoms: ['Frequent infections', 'Chronic fatigue', 'Weak immunity', 'Mental dullness', 'Cardiac weakness'],
        prognosis: 'Sadhya (curable) with proper Rasayana therapy',
        treatment: 'Rasayana with Chyavanaprasha, Ashwagandha, Shatavari, and Bṛmhana diet'
      }
    ],
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
      'Preventive healthcare - Achara Rasayana, Dinacharya',
      'Stress management - Medhya Rasayana with Brahmi',
      'Skin health - Amalaki and Guduchi Rasayana',
      'Hair health - Bhringaraj and Amalaki Rasayana',
      'Bone health - Ashwagandha and Shatavari Rasayana',
      'Diabetes prevention - Guduchi and Amalaki Rasayana',
      'Cancer support - Ashwagandha and Guduchi Rasayana',
      'Cardiac health - Arjuna and Amalaki Rasayana'
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
      },
      {
        number: '3.1.28-29',
        sanskrit: 'ज्वरस्य पूर्वरूपाणि अङ्गमर्दो गुरुगात्रता | अरतिः सदनं तन्द्रा वैवर्ण्यमन्नद्वेषणम् ||',
        translation: 'Premonitory symptoms of Jwara include body ache, heaviness of body, malaise, weakness, drowsiness, discoloration, and aversion to food.',
        commentary: 'Early recognition of premonitory symptoms enables preventive intervention.'
      },
      {
        number: '3.2.3',
        sanskrit: 'लङ्घनं पाचनं दीपनं ज्वरस्य प्रथमम् औषधम् |',
        translation: 'Langhana (fasting), Pachana (digestive), and Deepana (appetizing) are the first-line treatments for fever.',
        commentary: 'Establishes the initial treatment approach for all types of fever.'
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
      },
      {
        title: 'Jwara with Complications',
        content: 'Jwara with Raktapitta (bleeding), Jwara with Atisara (diarrhea), Jwara with Shwasa (dyspnea), Jwara with Chhardi (vomiting) - each complication requires modified treatment approach.',
        clinicalRelevance: 'Recognizing complications prevents treatment errors and improves outcomes.'
      },
      {
        title: 'Pathya-Apathya in Jwara',
        content: 'Pathya: old rice, Mudga, barley water, light soups, warm water, honey. Apathya: heavy foods, oily foods, cold drinks, milk, curd, meat, new grains. Diet modification is essential for fever recovery.',
        clinicalRelevance: 'Dietary compliance significantly affects treatment outcomes and prevents recurrence.'
      },
      {
        title: 'Jwara in Special Populations',
        content: 'Children: gentle herbs, lower doses, careful monitoring. Elderly: avoid aggressive Shodhana, use Rasayana. Pregnant: contraindicated strong herbs, use mild Shamana. Chronic illness: careful dosing, monitor for complications.',
        clinicalRelevance: 'Modified approaches are needed for vulnerable populations.'
      },
      {
        title: 'Modern Correlation of Jwara',
        content: 'Jwara correlates with: viral infections, bacterial infections, inflammatory conditions, autoimmune diseases, and malignancies. Treatment principles remain relevant - Langhana, Pachana, and Shamana have modern parallels.',
        clinicalRelevance: 'Understanding correlation helps integrate Ayurvedic and modern approaches.'
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
      },
      {
        condition: 'Chronic Fever (Sannipataja)',
        treatment: 'Rasayana + Shamana',
        herbs: ['Guduchi', 'Amalaki', 'Shilajatu', 'Pippali', 'Ashwagandha'],
        dosage: 'Guduchi sattva 500mg with Shilajatu 250mg twice daily',
        duration: '2-3 months',
        precautions: ['Nutritious diet', 'Adequate rest', 'Avoid exertion', 'Regular monitoring']
      },
      {
        condition: 'Recurrent Fever',
        treatment: 'Rasayana for immunity + prevention',
        herbs: ['Guduchi', 'Amalaki', 'Ashwagandha', 'Shatavari', 'Tulsi'],
        dosage: 'Guduchi kashaya 40ml daily for prevention',
        duration: '3-6 months',
        precautions: ['Avoid triggers', 'Adequate sleep', 'Balanced diet', 'Stress management']
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
      'Fever with ama - Critical distinction from nirama stage',
      'Viral infections - Jwara Shamana herbs',
      'Dengue/Malaria - Pittaja Jwara treatment',
      'Post-viral fatigue - Rasayana recovery protocol',
      'Seasonal fevers - Ritucharya-based approach',
      'Fever prevention - immunity-building Rasayana'
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
      },
      {
        number: '6.1.15-16',
        sanskrit: 'कफजाः दश पित्तजाः चत्वारः वातजाः षट् | एकविंशतिः प्रमेहाः समासतः ||',
        translation: 'Twenty types of Prameha: ten Kaphaja, four Pittaja, six Vataja - this is the brief classification.',
        commentary: 'Numerical classification of all Prameha types for systematic diagnosis.'
      },
      {
        number: '6.1.21',
        sanskrit: 'यवाः कुलत्था मुद्गाश्च श्यामाका नीवरास्तथा | जाङ्गलं मांसमार्द्राकं हितं प्रमेहिणां सदा ||',
        translation: 'Barley, horse gram, green gram, Syamaka, Nivara rice, jangala meat, and fresh ginger are always beneficial for Prameha patients.',
        commentary: 'Establishes the dietary foundation for Prameha management.'
      }
    ],
    topics: [
      {
        title: 'Classification of 20 Prameha',
        content: 'Kaphaja (10 types): Kshaudrameha, Ikshumeha, Sandrameha, Sandraprasadameha, Shuklameha, Shukrameha, Sitameha, Sikatameha, Lavanameha, Vasulameha. Pittaja (4 types): Ksharameha, Kalameha, Nilameha, Raktameha. Vataja (6 types): Majjameha, Hastimeha, Medomeha, Vasameha, Madhumeha, Kshinendriyameha.',
        clinicalRelevance: 'Each type has specific dosha and dhatu involvement requiring tailored treatment.'
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
      },
      {
        title: 'Prameha Samprapti (Pathogenesis)',
        content: 'Kapha vitiation leads to Meda and Kleda vitiation, causing turbid urine. If untreated, Pitta involvement causes Rakta vitiation. Further progression to Vata dominance with dhatu kshaya leads to Madhumeha.',
        clinicalRelevance: 'Understanding progression enables early intervention to prevent complications.'
      },
      {
        title: 'Prameha Complications (Prameha Pidika)',
        content: 'Complications include: Prameha Pidika (diabetic carbuncles), Prameha Gandmala (lymphadenopathy), Prameha Upadansha (genital infections), Netra Roga (diabetic retinopathy), Pada Dagdha (diabetic foot).',
        clinicalRelevance: 'Early recognition of complications enables comprehensive management.'
      },
      {
        title: 'Prameha Prevention',
        content: 'Prevention involves: balanced diet (avoid excess sweet, heavy foods), regular exercise, adequate sleep, stress management, weight management, and regular health check-ups. Early intervention at pre-diabetic stage prevents progression.',
        clinicalRelevance: 'Prevention is more effective than treatment of established diabetes.'
      },
      {
        title: 'Dietary Management in Prameha',
        content: 'Pathya: barley (Yava) is best, old rice, Mudga, bitter vegetables, buttermilk, honey. Apathya: sugar, jaggery, sweet foods, heavy/oily foods, new grains, excessive sleep, sedentary lifestyle. Diet is the cornerstone of Prameha management.',
        clinicalRelevance: 'Dietary compliance is as important as herbal treatment.'
      },
      {
        title: 'Exercise in Prameha',
        content: 'Regular exercise (Vyayama) is essential for Prameha management. Benefits: improves insulin sensitivity, reduces Kapha, burns Meda, improves Agni. Type: moderate intensity, regular frequency. Avoid excessive exercise in Vataja Prameha.',
        clinicalRelevance: 'Exercise is a non-pharmacological intervention as important as herbs.'
      },
      {
        title: 'Stress and Prameha',
        content: 'Stress (Manasika factors) significantly impacts Prameha: increases cortisol, worsens insulin resistance, causes emotional eating. Management: Satvavajaya (psychotherapy), meditation, yoga, and stress-reducing herbs like Ashwagandha.',
        clinicalRelevance: 'Addressing stress is essential for comprehensive Prameha management.'
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
      },
      {
        condition: 'Pre-Diabetes (Early Kaphaja Prameha)',
        treatment: 'Shamana + lifestyle modification',
        herbs: ['Guduchi', 'Amalaki', 'Shilajatu', 'Meshashringi', 'Jambu'],
        dosage: 'Guduchi sattva 250mg twice daily, Jambu seed powder 3 grams',
        duration: '3-6 months',
        precautions: ['Dietary control', 'Regular exercise', 'Weight management', 'Stress reduction']
      },
      {
        condition: 'Diabetic Neuropathy (Prameha with Vata)',
        treatment: 'Basti + Shamana with Vata-pacifying herbs',
        herbs: ['Ashwagandha', 'Bala', 'Shatavari', 'Guduchi', 'Shilajatu'],
        dosage: 'Ashwagandha churna 3 grams with warm milk twice daily',
        duration: '6-12 months',
        precautions: ['Foot care', 'Warm oil massage', 'Avoid cold exposure', 'Regular monitoring']
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
      'Lifestyle modification - exercise and sleep recommendations',
      'Diabetic neuropathy - Vata Shamana with Basti',
      'Diabetic retinopathy - Netra Roga management',
      'Diabetic foot - wound care with Haridra and Nimba',
      'Diabetes prevention - early lifestyle intervention',
      'Post-diabetic recovery - Rasayana and Bṛmhana'
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
      },
      {
        number: '7.4.5-6',
        sanskrit: 'सप्त धातून् समाश्रित्य कुष्ठं कुर्वन्ति दोषाः | रसरक्तमांसमेदोस्थिमज्जशुक्रान् ||',
        translation: 'The doshas vitiate all seven dhatus - Rasa, Rakta, Mamsa, Meda, Asthi, Majja, and Shukra - to cause Kushtha.',
        commentary: 'Explains why skin diseases require long-term treatment - deep dhatu involvement.'
      },
      {
        number: '7.5.25-28',
        sanskrit: 'लेपः परिषेको अभ्यङ्गः धूपनं प्रदेहः प्रक्षालनं च बाह्यम् चिकित्सितम् |',
        translation: 'External treatments include Lepa (paste), Parisheka (irrigation), Abhyanga (massage), Dhupana (fumigation), Pradeha (thick paste), and Prakshalana (washing).',
        commentary: 'Lists the six modalities of external treatment for skin diseases.'
      },
      {
        number: '7.6.36',
        sanskrit: 'विरुद्धाहारसेवानात् कुष्ठं जायते दारुणम् |',
        translation: 'Incompatible food combinations lead to severe Kushtha.',
        commentary: 'Highlights the role of dietary incompatibility in skin disease causation.'
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
      },
      {
        title: 'Dietary Management in Kushtha',
        content: 'Pathya: bitter vegetables (Nimba, Karela), old rice, Mudga, barley, honey, ghee. Apathya: fish, milk with incompatible foods, sour foods, salty foods, sesame, jaggery. Strict dietary compliance is essential for skin disease recovery.',
        clinicalRelevance: 'Dietary modification supports treatment and prevents recurrence.'
      },
      {
        title: 'Skin Disease Prevention',
        content: 'Prevention involves: avoiding incompatible food combinations, maintaining hygiene, managing stress, avoiding harsh chemicals, using natural skincare, and addressing early symptoms promptly.',
        clinicalRelevance: 'Prevention is more effective than treating established skin diseases.'
      },
      {
        title: 'Psychological Impact of Skin Diseases',
        content: 'Skin diseases cause significant psychological distress: embarrassment, social withdrawal, depression, anxiety. Treatment should include: counseling, stress management, family support, and addressing the psychological component.',
        clinicalRelevance: 'Psychological support improves treatment compliance and outcomes.'
      },
      {
        title: 'Modern Correlation of Kushtha',
        content: 'Kushtha correlates with: psoriasis, eczema, dermatitis, fungal infections, vitiligo, and leprosy. Treatment principles remain relevant - Shodhana, Shamana, and topical applications have modern parallels.',
        clinicalRelevance: 'Understanding correlation helps integrate Ayurvedic and modern dermatology.'
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
      },
      {
        condition: 'Vicharchika (Eczema)',
        treatment: 'Shamana + Raktamokshana + topical treatment',
        herbs: ['Haridra', 'Nimba', 'Sariva', 'Chandana', 'Guduchi'],
        dosage: 'External: Haridra-Chandana paste. Internal: Guduchi kashaya 40ml',
        duration: '2-4 months',
        precautions: ['Avoid scratching', 'Keep area moisturized', 'Avoid irritants']
      },
      {
        condition: 'Psoriasis (Ekakushtha)',
        treatment: 'Shodhana + Shamana + long-term management',
        herbs: ['Khadira', 'Nimba', 'Guduchi', 'Haridra', 'Amalaki'],
        dosage: 'Khadira kashaya 40ml twice daily, external Haridra paste',
        duration: '6-12 months',
        precautions: ['Strict dietary control', 'Stress management', 'Avoid triggers', 'Regular follow-up']
      },
      {
        condition: 'Vitiligo (Sidhma Kushtha)',
        treatment: 'Shamana + Raktamokshana + photosensitizing herbs',
        herbs: ['Khadira', 'Bakuchi', 'Haridra', 'Nimba', 'Amalaki'],
        dosage: 'Bakuchi oil for local application, Khadira kashaya internally',
        duration: '6-12 months',
        precautions: ['Sun exposure after Bakuchi application', 'Avoid incompatible foods', 'Patience required']
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
      },
      {
        name: 'Sidhma Kushtha',
        sanskrit: 'सिध्म कुष्ठ',
        etiology: 'Kapha-Pitta vitiation causing white patches resembling leprosy',
        symptoms: ['White patches', 'Mild itching', 'Sweating', 'Thin skin'],
        prognosis: 'Sadhya (curable) - easiest among Mahakushtha',
        treatment: 'Shamana with Khadira, Nimba, and Haridra'
      },
      {
        name: 'Vicharchika (Eczema)',
        sanskrit: 'विचर्चिका',
        etiology: 'Kapha-Pitta vitiation with Rakta involvement',
        symptoms: ['Itching', 'Oozing', 'Red patches', 'Thick skin', 'Pain'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Shamana + Lepa with Haridra, Nimba, and Sariva'
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
      'Chronic skin conditions - long-term Kushtha management',
      'Urticaria - Kapha-Pitta Kushtha management',
      'Skin allergies - Rakta-Shodhana approach',
      'Wound healing - Ropana with Haridra and Nimba',
      'Skin rejuvenation - Rasayana for skin health',
      'Autoimmune skin conditions - comprehensive approach'
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
      },
      {
        number: '15.1.5-6',
        sanskrit: 'ग्रहणी दोषभेदेन चतुर्धा समुदाहृता | वातजा पित्तजा श्लेष्मजा सन्निपातजा ||',
        translation: 'Grahani is of four types based on dosha: Vataja, Pittaja, Kaphaja, and Sannipataja.',
        commentary: 'Classifies digestive disorders into four types for targeted treatment.'
      },
      {
        number: '15.2.3',
        sanskrit: 'आमं पचेत् प्रथमम् ततः शमनं बृंहणं च |',
        translation: 'First digest ama, then proceed with Shamana and Bṛmhana.',
        commentary: 'Establishes the treatment sequence for Grahani disorders.'
      },
      {
        number: '15.3.5',
        sanskrit: 'लघु भोजनं नियमितं ग्रहणीरोगिणां हितम् |',
        translation: 'Light and regular food is beneficial for Grahani patients.',
        commentary: 'Emphasizes the importance of dietary discipline in digestive disorders.'
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
      },
      {
        condition: 'Grahani with Ama (Malabsorption)',
        treatment: 'Ama Pachana followed by Shamana',
        herbs: ['Shunthi', 'Pippali', 'Maricha', 'Musta', 'Chitraka'],
        dosage: 'Trikatu churna 1 gram with honey before meals',
        duration: '4-6 weeks',
        precautions: ['Light easily digestible food', 'Avoid heavy, oily, cold food', 'Regular meal times', 'Adequate hydration']
      },
      {
        condition: 'Chronic Grahani (IBS Chronic)',
        treatment: 'Shamana + Rasayana + lifestyle modification',
        herbs: ['Ashwagandha', 'Shatavari', 'Guduchi', 'Amalaki', 'Shunthi'],
        dosage: 'Ashwagandha churna 3 grams with warm milk at bedtime',
        duration: '3-6 months',
        precautions: ['Stress management', 'Regular sleep', 'Avoid triggers', 'Dietary discipline']
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
      },
      {
        name: 'Grahani with Ama',
        sanskrit: 'आमग्रहणी',
        etiology: 'Agnimandya with ama formation due to improper diet and lifestyle',
        symptoms: ['Coated tongue', 'Foul-smelling stool', 'Heavy feeling after eating', 'Fatigue', 'Skin disorders'],
        prognosis: 'Sadhya (curable) with Pachana',
        treatment: 'Langhana, Pachana, Deepana, Shamana'
      },
      {
        name: 'Chronic Grahani (IBS)',
        sanskrit: 'कृच्छ्रग्रहणी',
        etiology: 'Long-standing Agnimandya with stress component, affecting mind-gut axis',
        symptoms: ['Chronic bloating', 'Alternating bowel habits', 'Mucus in stool', 'Weight loss', 'Anxiety'],
        prognosis: 'Yapya (manageable) with long-term treatment',
        treatment: 'Shamana, Rasayana, Satvavajaya, lifestyle modification'
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
      'Post-antibiotic digestive recovery - Agni restoration',
      'Leaky gut syndrome - Grahani with Ama treatment',
      'Food intolerance - Agni-based approach',
      'Chronic gastritis - Pittaja Grahani management'
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
      },
      {
        number: '28.3.35-36',
        sanskrit: 'बस्तिः वातस्य अर्धचिकित्सा वातस्य चिकित्सायाम् |',
        translation: 'Basti is half the treatment for Vata disorders.',
        commentary: 'Establishes Basti as the cornerstone of Vata disease management.'
      },
      {
        number: '28.5.25',
        sanskrit: 'स्नेहः स्वेदः बस्तिः च वातरोगे प्रधानम् |',
        translation: 'Snehana (oleation), Swedana (fomentation), and Basti are the principal treatments for Vata disorders.',
        commentary: 'Lists the three pillars of Vata disease management.'
      },
      {
        number: '28.7.41',
        sanskrit: 'गुग्गुलुः रस्ना एरण्डं वातशमनं परम् |',
        translation: 'Guggulu, Rasna, and Eranda are supreme Vata-pacifying herbs.',
        commentary: 'Identifies the key herbs for Vata disorder management.'
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
      },
      {
        title: 'Snehana and Swedana for Vata',
        content: 'Snehana (oleation) with medicated oils/ghee internally and externally pacifies Vata by providing lubrication. Swedana (fomentation) with steam or warm poultices relieves stiffness and pain. Both are essential pre-treatments before Shodhana.',
        clinicalRelevance: 'Snehana and Swedana are foundational for all Vata disorder management.'
      },
      {
        title: 'Vata-Pacifying Diet',
        content: 'Pathya: warm, oily, sweet, sour, salty foods. Ghee, milk, oil, meat soup, old grains. Apathya: cold, dry, bitter, astringent, pungent foods. Raw vegetables, cold drinks, fasting, irregular meals.',
        clinicalRelevance: 'Dietary modification supports treatment and prevents Vata recurrence.'
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
      },
      {
        condition: 'Avabahuka (Frozen Shoulder)',
        treatment: 'Local Snehana + Swedana + Shamana',
        herbs: ['Rasna', 'Eranda', 'Dashamula', 'Guggulu', 'Bala'],
        dosage: 'Mahanarayan taila for local application, Rasna kashaya 40ml internally',
        duration: '2-3 months',
        precautions: ['Gentle shoulder exercises', 'Avoid cold exposure', 'Warm compress', 'Rest during acute phase']
      },
      {
        condition: 'Manyastambha (Cervical Spondylosis)',
        treatment: 'Greeva Basti + Shamana + local treatment',
        herbs: ['Rasna', 'Eranda', 'Dashamula', 'Guggulu', 'Shunthi'],
        dosage: 'Yogaraja Guggulu 500mg twice daily, Maha Narayan taila for local use',
        duration: '2-4 months',
        precautions: ['Avoid neck strain', 'Ergonomic posture', 'Regular neck exercises', 'Warm compress']
      },
      {
        condition: 'Janu Sandhi Shoola (Knee Pain)',
        treatment: 'Janu Basti + Shamana + gentle exercise',
        herbs: ['Guggulu', 'Ashwagandha', 'Shallaki', 'Rasna', 'Eranda'],
        dosage: 'Yogaraja Guggulu 500mg twice daily with warm water',
        duration: '2-4 months',
        precautions: ['Avoid squatting', 'Use support for stairs', 'Weight management', 'Warm oil massage']
      },
      {
        condition: 'Amsashosha (Shoulder Wasting)',
        treatment: 'Bṛmhana + Shamana + local treatment',
        herbs: ['Ashwagandha', 'Bala', 'Shatavari', 'Guduchi', 'Rasna'],
        dosage: 'Ashwagandha churna 3 grams with warm milk twice daily',
        duration: '3-6 months',
        precautions: ['Nourishing diet', 'Gentle exercises', 'Avoid overexertion', 'Regular massage']
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
      },
      {
        name: 'Gridhrasi',
        sanskrit: 'गृध्रसी',
        etiology: 'Vata-Kapha vitiation affecting sciatic nerve due to prolonged sitting, cold exposure',
        symptoms: ['Radiating pain from back to leg', 'Numbness', 'Weakness', 'Difficulty walking'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Basti + Kati Basti + Shamana'
      },
      {
        name: 'Manyastambha',
        sanskrit: 'मन्यास्तम्भ',
        etiology: 'Vata-Kapha vitiation in cervical region due to poor posture, cold exposure',
        symptoms: ['Neck stiffness', 'Pain radiating to shoulders', 'Limited neck movement', 'Headache'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Greeva Basti + Shamana + local treatment'
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
      'Joint disorders - comprehensive Vata management',
      'Cervical spondylosis - Greeva Basti treatment',
      'Frozen shoulder - Avabahuka management',
      'Neurological disorders - comprehensive Vata approach',
      'Degenerative conditions - Rasayana with Vata Shamana'
    ]
  },
  {
    id: 'chikitsa-2',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 2,
    name: 'Vajikarana Chikitsa',
    sanskrit: 'वाजीकरण चिकित्सा',
    english: 'Aphrodisiac Therapy',
    summary: 'Vajikarana Chikitsa deals with therapies that promote sexual vitality, reproductive health, and shukra dhatu (reproductive tissue) quality. The term Vaji means horse, signifying the strength and vigor of a stallion. This chapter emphasizes that Vajikarana not only enhances sexual performance but also promotes offspring quality, longevity, and overall vitality.',
    keyConcepts: [
      'Vajikarana promotes shukra dhatu quality and quantity',
      'Both physical and mental purity are prerequisites',
      'Shukra is the essence of all seven dhatus',
      'Vajikarana herbs are classified as vrishya (aphrodisiac) and shukrala (semen-promoting)',
      'Diet rich in milk, ghee, and sweet tastes supports shukra dhatu',
      'Achara Rasayana (ethical conduct) enhances Vajikarana effects',
      'Vajikarana is distinct from mere sexual stimulation - it builds reproductive vitality'
    ],
    shlokas: [
      {
        number: '2.1.4',
        sanskrit: 'वाजीकरणमित्युक्तं यत् तत् वाजीकरोति नरम् | अश्वमिव वाजिनं स्त्रीषु शीघ्रमभिगमने ||',
        translation: 'That which makes a man as potent as a horse in sexual intercourse, capable of quick and repeated copulation, is called Vajikarana.',
        commentary: 'Defines Vajikarana as enhancing sexual vigor comparable to a stallion.'
      },
      {
        number: '2.1.7',
        sanskrit: 'शुक्रं सर्वशरीरगतं दधाति शुक्रं बलं वर्णं च दधाति |',
        translation: 'Shukra (reproductive tissue) pervades the entire body, provides strength, complexion, and vitality.',
        commentary: 'Establishes shukra dhatu as the essence supporting the entire body.'
      },
      {
        number: '2.1.11',
        sanskrit: 'वाजीकरणानां सेवानां फलं शीघ्रं निगद्यते | शुक्रं वर्धति सततं बलं वर्णं च जायते ||',
        translation: 'The result of Vajikarana therapy is: shukra continuously increases, strength and complexion improve.',
        commentary: 'Describes the therapeutic outcomes of Vajikarana.'
      },
      {
        number: '2.1.15',
        sanskrit: 'मांसरसौदनक्षीरघृतमध्वाज्यसंयुतम् | वाजीकरं भवेद् भोज्यं स्त्रियं च हरिणीं युवा ||',
        translation: 'Food prepared with meat, rice, milk, ghee, honey, and butter, along with a young and beautiful woman, constitutes Vajikarana.',
        commentary: 'Highlights the role of nourishing diet and psychological arousal in Vajikarana.'
      },
      {
        number: '2.1.20',
        sanskrit: 'वाजीकरं यः पुरुषः सेवते सम्मतं नरः | न स सीदति कामेषु न स सीदति निर्धनः ||',
        translation: 'The man who uses Vajikarana properly never fails in sexual performance and never becomes depleted.',
        commentary: 'Emphasizes the protective and strengthening effects of Vajikarana therapy.'
      },
      {
        number: '2.3.4',
        sanskrit: 'शुक्रस्य सारता यत्र तत्र सर्वस्य सारता | शुक्रस्य क्षयतो यत्र तत्र सर्वस्य क्षयतः ||',
        translation: 'Where there is excellence of shukra, there is excellence of all tissues. Where there is depletion of shukra, there is depletion of all.',
        commentary: 'Confirms the central role of shukra dhatu in overall vitality and health.'
      }
    ],
    topics: [
      {
        title: 'Prerequisites for Vajikarana',
        content: 'Before Vajikarana therapy, the body must be purified through Shodhana (Vamana and Virechana). The person should be physically healthy, mentally calm, and free from ama. Shukra dhatu must be in a receptive state to benefit from Vajikarana herbs.',
        clinicalRelevance: 'Body purification ensures optimal absorption and efficacy of Vajikarana herbs.'
      },
      {
        title: 'Shukra Dhatu Formation',
        content: 'Shukra is the seventh and final dhatu in the tissue hierarchy. It is the essence of all preceding dhatus (Rasa, Rakta, Mamsa, Meda, Asthi, Majja). When all dhatus are well-nourished, their essence forms healthy shukra. Depletion of any dhatu affects shukra quality.',
        clinicalRelevance: 'Understanding shukra formation explains why general nutrition and dhatu health are prerequisites for reproductive vitality.'
      },
      {
        title: 'Vajikarana Herbs',
        content: 'Key Vajikarana herbs include: Ashwagandha (Withania somnifera) - enhances vitality and stamina; Kapikacchu (Mucuna pruriens) - promotes dopamine and shukra; Shatavari (Asparagus racemosus) - nourishes reproductive tissues; Gokshura (Tribulus terrestris) - supports reproductive function; Musali (Chlorophytum borivilianum) - promotes sexual vigor; Vidari (Pueraria tuberosa) - nourishes dhatu.',
        clinicalRelevance: 'Herb selection should be based on individual prakriti and specific dhatu involvement.'
      },
      {
        title: 'Vajikarana Ghrita Formulations',
        content: 'Medicated ghee preparations are the primary vehicle for Vajikarana therapy. Common formulations include: Ashwagandha Ghrita, Shatavari Ghrita, Vajikarana Ghrita (containing Kapikacchu, Gokshura, Ashwagandha in ghee base). Ghee serves as anupana (vehicle) that carries herbs to shukra dhatu.',
        clinicalRelevance: 'Ghee-based formulations are preferred as ghee directly nourishes shukra dhatu.'
      },
      {
        title: 'Diet for Shukra Dhatu',
        content: 'Shukra-promoting foods: milk, ghee, butter, almonds, dates, pomegranate, saffron, sweet foods, meat soup. Avoid: bitter, astringent, pungent foods in excess, alcohol, tobacco. Regular consumption of milk with ghee and honey (in proper proportions) is excellent for shukra.',
        clinicalRelevance: 'Dietary support is essential for Vajikarana - herbs alone cannot compensate for poor diet.'
      },
      {
        title: 'Lifestyle for Vajikarana',
        content: 'Adequate sleep (7-8 hours), stress management, regular exercise (avoid excess), mental peace, and ethical conduct (Achara Rasayana) are essential. Avoid: excessive sexual activity, late nights, mental stress, and incompatible food combinations.',
        clinicalRelevance: 'Lifestyle factors significantly impact reproductive health and Vajikarana efficacy.'
      },
      {
        title: 'Vajikarana vs Rasayana',
        content: 'Rasayana promotes overall longevity and immunity, while Vajikarana specifically targets reproductive vitality. Both share some herbs but differ in application. Rasayana is for general anti-aging, Vajikarana is for reproductive health and sexual vigor.',
        clinicalRelevance: 'Understanding the distinction helps in selecting appropriate therapy for patient needs.'
      }
    ],
    doshaDiscussion: [
      'Vata vitiation causes shukra kshaya (depletion) and erectile dysfunction',
      'Pitta vitiation causes premature ejaculation and burning during intercourse',
      'Kapha vitiation causes low libido and heaviness in reproductive organs',
      'Balanced Vata is essential for proper shukra formation and ejaculation',
      'Apana Vata governs reproductive function and must be in balance'
    ],
    treatmentProtocols: [
      {
        condition: 'Shukra Kshaya (Semen Depletion)',
        treatment: 'Vajikarana Ghrita + Bṛmhana diet',
        herbs: ['Ashwagandha', 'Kapikacchu', 'Shatavari', 'Gokshura', 'Musali', 'Vidari'],
        dosage: 'Vajikarana Ghrita 15-30 grams daily with warm milk',
        duration: '3-6 months',
        precautions: ['Avoid excessive sexual activity during treatment', 'Follow Sattvic diet', 'Avoid alcohol and tobacco', 'Adequate sleep essential']
      },
      {
        condition: 'Klaibya (Erectile Dysfunction)',
        treatment: 'Ashwagandha Ghrita + Shamana',
        herbs: ['Ashwagandha', 'Kapikacchu', 'Bala', 'Atmagupta'],
        dosage: 'Ashwagandha Ghrita 20 grams daily with milk',
        duration: '2-4 months',
        precautions: ['Avoid cold food and exposure', 'Regular exercise', 'Stress management', 'Warm food and environment']
      },
      {
        condition: 'Shukra Dosha (Reproductive Disorder)',
        treatment: 'Shodhana + Vajikarana',
        herbs: ['Shatavari', 'Ashwagandha', 'Guduchi', 'Amalaki'],
        dosage: 'Shatavari Ghrita 15 grams daily',
        duration: '3-6 months',
        precautions: ['Complete body purification before Vajikarana', 'Ama-free state', 'Mental calmness']
      },
      {
        condition: 'Infertility Support',
        treatment: 'Vajikarana + Rasayana for both partners',
        herbs: ['Ashwagandha', 'Shatavari', 'Kapikacchu', 'Gokshura', 'Musali'],
        dosage: 'Ashwagandha churna 3 grams with warm milk for male, Shatavari Ghrita 15 grams for female',
        duration: '3-6 months',
        precautions: ['Both partners should be treated', 'Avoid stress', 'Balanced diet', 'Regular sleep']
      },
      {
        condition: 'Premature Ejaculation',
        treatment: 'Vata Shamana + Vajikarana',
        herbs: ['Ashwagandha', 'Kapikacchu', 'Bala', 'Musali', 'Vidari'],
        dosage: 'Ashwagandha Ghrita 20 grams daily with warm milk',
        duration: '2-4 months',
        precautions: ['Stress management', 'Avoid excess sexual activity', 'Warm diet', 'Adequate sleep']
      },
      {
        condition: 'Infertility Support',
        treatment: 'Vajikarana + Rasayana',
        herbs: ['Ashwagandha', 'Kapikacchu', 'Shatavari', 'Gokshura', 'Amalaki', 'Bala'],
        dosage: 'Kapikacchu churna 3-6 grams with milk daily',
        duration: '3-6 months minimum',
        precautions: ['Both partners should be treated', 'Avoid smoking and alcohol', 'Balanced diet with ghee and milk', 'Regular sleep cycle']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Klaibya',
        sanskrit: 'क्लैब्य',
        etiology: 'Vata vitiation with shukra kshaya caused by excessive sexual activity, stress, poor diet, and aging',
        symptoms: ['Erectile dysfunction', 'Premature ejaculation', 'Low libido', 'Fatigue', 'Weakness'],
        prognosis: 'Sadhya (curable) in young patients, Yapya (manageable) in elderly',
        treatment: 'Vajikarana Ghrita, Ashwagandha, Kapikacchu, Bṛmhana diet'
      },
      {
        name: 'Shukra Kshaya',
        sanskrit: 'शुक्र क्षय',
        etiology: 'Depletion of reproductive tissue due to excessive sexual activity, poor nutrition, chronic illness, or aging',
        symptoms: ['Decreased semen volume', 'Low sperm count', 'Fatigue', 'Dizziness', 'Weakness in joints'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Vajikarana therapy, Bṛmhana diet, Rasayana herbs'
      }
    ],
    importantVerses: [
      '2.1.4 - Definition of Vajikarana',
      '2.1.7 - Shukra pervades entire body',
      '2.1.11 - Results of Vajikarana therapy',
      '2.1.15 - Vajikarana diet and lifestyle'
    ],
    clinicalApplications: [
      'Male infertility - Vajikarana protocol with Kapikacchu and Ashwagandha',
      'Erectile dysfunction - Ashwagandha Ghrita treatment',
      'Premature ejaculation - Shukra-stabilizing herbs',
      'Low libido - comprehensive Vajikarana approach',
      'Reproductive health maintenance - seasonal Vajikarana',
      'Geriatric vitality - Rasayana with Vajikarana herbs',
      'Post-illness reproductive recovery - Bṛmhana with Vajikarana',
      'Female reproductive health - Shatavari-based Vajikarana',
      'Hormonal balance - Gokshura and Ashwagandha protocol',
      'Sperm quality improvement - Kapikacchu and Musali',
      'Sexual wellness - lifestyle and dietary Vajikarana',
      'Assisted reproduction support - Vajikarana as adjunct therapy'
    ]
  },
  {
    id: 'chikitsa-4',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 4,
    name: 'Raktapitta Chikitsa',
    sanskrit: 'रक्तपित्त चिकित्सा',
    english: 'Management of Bleeding Disorders',
    summary: 'Raktapitta Chikitsa covers the treatment of bleeding disorders caused by vitiation of Pitta and Rakta (blood). The chapter describes conditions where blood becomes vitiated and flows in abnormal directions. This includes various hemorrhagic conditions affecting different body systems.',
    keyConcepts: [
      'Raktapitta involves vitiation of both Pitta and Rakta dhatu',
      'Two main types: Uttana (superficial) and Gambhira (deep-seated)',
      'Six subtypes based on dosha combination (Vata, Pitta, Kapha with Rakta)',
      'Treatment involves cooling therapy and Raktamokshana (bloodletting)',
      'Shodhana should be done carefully to avoid further bleeding',
      'Diet should be cooling, sweet, bitter, and astringent',
      'Apathya includes hot, spicy, sour, and salty foods'
    ],
    shlokas: [
      {
        number: '4.1.3',
        sanskrit: 'पित्तं रक्तं च संसृष्टं रक्तपित्तं समासतः | उत्तानं गम्भिरं चैव विज्ञेयं तद् द्विधा मतम् ||',
        translation: 'The combination of Pitta and Rakta causes Raktapitta. It is of two types: Uttana (superficial) and Gambhira (deep-seated).',
        commentary: 'Establishes the fundamental classification of bleeding disorders.'
      },
      {
        number: '4.1.5',
        sanskrit: 'यत्र रक्तं प्रदुष्टं तु पित्तेन सह मूर्च्छति | नासाक्षिकर्णमुखतः तद् रक्तपित्तमुच्यते ||',
        translation: 'When vitiated Rakta combined with Pitta flows out through nose, eyes, ears, or mouth, it is called Raktapitta.',
        commentary: 'Describes the cardinal sign of Raktapitta - bleeding from various orifices.'
      },
      {
        number: '4.2.3',
        sanskrit: 'शीतं लघु हितं तस्य गुरु उष्णं तु वर्जयेत् |',
        translation: 'Cold, light foods are beneficial; heavy and hot foods should be avoided.',
        commentary: 'Establishes the dietary principles for Raktapitta treatment.'
      },
      {
        number: '4.3.1',
        sanskrit: 'स्तम्भनं रक्तपित्तस्य प्रथमं प्रक्रमः स्मृतः |',
        translation: 'Stambhana (styptic therapy) is the first treatment principle for Raktapitta.',
        commentary: 'Emphasizes stopping active bleeding as the primary therapeutic goal.'
      },
      {
        number: '4.4.5',
        sanskrit: 'अम्लं लवणमुष्णं च तीक्ष्णं कटु विवर्जयेत् |',
        translation: 'Sour, salty, hot, sharp, and pungent substances should be strictly avoided.',
        commentary: 'Lists the specific dietary restrictions critical for Raktapitta management.'
      }
    ],
    topics: [
      {
        title: 'Classification of Raktapitta',
        content: 'Raktapitta is classified as: (1) Uttana (superficial) - affects skin and mucous membranes, (2) Gambhira (deep) - affects internal organs. Six subtypes: Vataja, Pittaja, Kaphaja, Vata-Pittaja, Vata-Kaphaja, Pitta-Kaphaja. The prognosis varies - Kaphaja is most curable, Vataja is most difficult.',
        clinicalRelevance: 'Classification determines treatment approach and prognosis.'
      },
      {
        title: 'Uttana vs Gambhira Raktapitta',
        content: 'Uttana (superficial): Bleeding from nose, skin, mouth - easier to treat with Shamana. Gambhira (deep): Internal bleeding affecting organs - requires Shodhana and intensive treatment. Gambhira Raktapitta has a worse prognosis and requires hospitalization.',
        clinicalRelevance: 'Distinguishing between types is critical for treatment planning and prognosis.'
      },
      {
        title: 'Treatment Principles',
        content: 'Treatment follows: (1) Stambhana (styptic) to stop active bleeding, (2) Raktamokshana (bloodletting) for Pittaja type, (3) Shamana with cooling herbs, (4) Shodhana when bleeding stops, (5) Rasayana for recovery. Avoid all hot, spicy, sour foods.',
        clinicalRelevance: 'Sequential treatment approach - stop bleeding first, then address root cause.'
      },
      {
        title: 'Dietary Management',
        content: 'Pathya: old rice, barley, Mudga, ghee, milk, sugar candy, pomegranate, coconut water. Apathya: sour foods, salty foods, spicy foods, alcohol, curd, fish, sesame oil, mustard. Strict dietary compliance is essential for recovery.',
        clinicalRelevance: 'Dietary modification is as important as herbal treatment in Raktapitta.'
      },
      {
        title: 'Complications of Raktapitta',
        content: 'Untreated Raktapitta leads to: Pandu (anemia), Shotha (edema), Jwara (fever), Kshaya (emaciation), Hridroga (cardiac disorders). Early treatment prevents complications.',
        clinicalRelevance: 'Recognizing complications enables comprehensive management.'
      },
      {
        title: 'Raktamokshana in Raktapitta',
        content: 'Bloodletting is indicated for Pittaja Raktapitta with excess Rakta. Methods: Jalaukavacharana (leech therapy), Siravyadha (venepuncture), Pracchana (scarification). Contraindicated in Vataja type and weak patients.',
        clinicalRelevance: 'Bloodletting must be carefully indicated - wrong application worsens condition.'
      }
    ],
    doshaDiscussion: [
      'Pittaja Raktapitta - most common, bright red bleeding, burning sensation, thirst',
      'Kaphaja Raktapitta - dark blood with mucus, heaviness, slow onset',
      'Vataja Raktapitta - dry, frothy blood, pain, irregular bleeding',
      'Vata-Pittaja - mixed features, moderate severity',
      'Pitta-Kaphaja - burning with heaviness, moderate bleeding'
    ],
    treatmentProtocols: [
      {
        condition: 'Pittaja Raktapitta (Active Bleeding)',
        treatment: 'Stambhana (styptic) + Pitta Shamana',
        herbs: ['Amalaki', 'Chandana', 'Ushira', 'Sariva', 'Guduchi', 'Padmaka'],
        dosage: 'Amalaki churna 3 grams with cold water twice daily',
        duration: '2-4 weeks for acute, 2-3 months for chronic',
        precautions: ['Avoid hot, spicy, sour foods', 'Cold environment', 'Complete rest during active bleeding', 'No physical exertion']
      },
      {
        condition: 'Kaphaja Raktapitta',
        treatment: 'Shamana with Kapha-Pitta pacifying herbs',
        herbs: ['Haridra', 'Nimba', 'Amalaki', 'Guduchi', 'Musta'],
        dosage: 'Haridra churna 3 grams with honey twice daily',
        duration: '3-6 weeks',
        precautions: ['Light diet', 'Avoid heavy, oily foods', 'Regular monitoring']
      },
      {
        condition: 'Gambhira Raktapitta (Deep Bleeding)',
        treatment: 'Shodhana + Intensive Shamana',
        herbs: ['Guduchi', 'Amalaki', 'Chandana', 'Padmaka', 'Sariva', 'Shatavari'],
        dosage: 'Guduchi sattva 500mg with Chandanadi kashaya',
        duration: '1-3 months',
        precautions: ['Hospitalization may be required', 'Monitor hemoglobin', 'Avoid all Vata-aggravating factors']
      },
      {
        condition: 'Nasal Bleeding (Nasagata Raktapitta)',
        treatment: 'Local Stambhana + Shamana',
        herbs: ['Chandana', 'Ushira', 'Padmaka', 'Kamala'],
        dosage: 'Chandana taila Nasya 4-6 drops daily',
        duration: '1-2 weeks acute, 1-2 months chronic',
        precautions: ['Cold compress on forehead', 'Avoid bending forward', 'No hot environment']
      },
      {
        condition: 'Chronic Raktapitta',
        treatment: 'Rasayana + Pitta Shamana',
        herbs: ['Amalaki', 'Guduchi', 'Shatavari', 'Chandana', 'Sariva'],
        dosage: 'Amalaki churna 3 grams with cold milk twice daily',
        duration: '3-6 months',
        precautions: ['Regular monitoring', 'Dietary discipline', 'Avoid triggers', 'Stress management']
      },
      {
        condition: 'Raktapitta with Anemia',
        treatment: 'Pandu treatment + Raktapitta Shamana',
        herbs: ['Amalaki', 'Guduchi', 'Loha Bhasma', 'Mandura Bhasma'],
        dosage: 'Loha Bhasma 250mg with Amalaki churna twice daily',
        duration: '3-6 months',
        precautions: ['Iron-rich diet', 'Avoid tea/coffee with meals', 'Regular hemoglobin monitoring']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Uttana Raktapitta',
        sanskrit: 'उत्तान रक्तपित्त',
        etiology: 'Pitta vitiation affecting superficial rakta dhatu, caused by hot, spicy foods, anger, and heat exposure',
        symptoms: ['Bleeding from nose, mouth, skin', 'Reddish discoloration', 'Burning sensation', 'Thirst'],
        prognosis: 'Sadhya (curable) with timely treatment',
        treatment: 'Stambhana, Pitta Shamana, cooling diet'
      },
      {
        name: 'Gambhira Raktapitta',
        sanskrit: 'गम्भीर रक्तपित्त',
        etiology: 'Deep-seated Pitta-Rakta vitiation affecting internal organs, often chronic',
        symptoms: ['Internal bleeding', 'Hematemesis', 'Melena', 'Severe anemia', 'Weakness'],
        prognosis: 'Kricchra Sadhya (difficult to cure)',
        treatment: 'Intensive Shamana, Shodhana, Rasayana'
      }
    ],
    importantVerses: [
      '4.1.3 - Two types of Raktapitta',
      '4.1.5 - Cardinal sign - bleeding from orifices',
      '4.2.3 - Dietary principles - cold and light foods',
      '4.3.1 - Treatment sequence - Stambhana first'
    ],
    clinicalApplications: [
      'Bleeding disorders - comprehensive Raktapitta management',
      'Hematemesis (vomiting blood) - Gambhira Raktapitta protocol',
      'Epistaxis (nosebleed) - Nasagata Raktapitta treatment',
      'Menorrhagia - Uttara Raktapitta management',
      'Purpura - Rakta vitiation treatment',
      'Chronic bleeding - Rasayana for recovery',
      'Anemia secondary to bleeding - Pandu management',
      'Bleeding gums - oral Raktapitta treatment',
      'Hemorrhoids - Guda Raktapitta management',
      'Post-surgical bleeding - Stambhana protocol',
      'Blood disorders - Rakta-Shodhana approach',
      'Vascular disorders - comprehensive Rakta management'
    ]
  },
  {
    id: 'chikitsa-5',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 5,
    name: 'Gulma Chikitsa',
    sanskrit: 'गुल्म चिकित्सा',
    english: 'Management of Abdominal Tumors',
    summary: 'Gulma Chikitsa covers the treatment of palpable abdominal masses caused by vitiation of Vata dosha. Gulma is defined as a mass that arises in the abdomen without suppuration. The chapter describes five types based on dosha involvement plus Sannipataja, with treatment approaches varying by type.',
    keyConcepts: [
      'Gulma is a Vatika disorder - Vata is always involved',
      'Five types: Vataja, Pittaja, Kaphaja, Raktaja, Sannipataja',
      'Gulma arises from Vata obstruction in different abdominal locations',
      'Treatment varies by dosha involvement and location',
      'Basti (medicated enema) is important for Vataja Gulma',
      'Surgical intervention may be required for large or resistant Gulma',
      'Ama Pachana is essential before Shodhana'
    ],
    shlokas: [
      {
        number: '5.1.4',
        sanskrit: 'वायुः प्रकुपितो यत्र निरुद्धः सन्निरुध्यते | गुल्म इत्यभिधीयते तद् विशेषं प्रकुञ्चिकाम् ||',
        translation: 'When vitiated Vata gets obstructed and forms a mass, it is called Gulma.',
        commentary: 'Establishes Gulma as primarily a Vatika disorder with obstruction.'
      },
      {
        number: '5.1.8',
        sanskrit: 'वातजः पित्तजः श्लेष्मजः सन्निपातज एव च | रक्तजः पञ्चमः प्रोक्तो गुल्मानां पञ्चधा स्मृतम् ||',
        translation: 'Gulma is of five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Raktaja.',
        commentary: 'Classifies Gulma into five types based on dosha involvement.'
      },
      {
        number: '5.2.3',
        sanskrit: 'शूलं तीव्रं भवेत् तत्र तोदभेदविवर्जितम् | वातजे गुल्मे ||',
        translation: 'In Vataja Gulma, there is severe colicky pain with pricking and splitting sensations.',
        commentary: 'Describes the cardinal symptom of Vataja Gulma.'
      },
      {
        number: '5.3.1',
        sanskrit: 'आमं पचेत् प्रथमम् ततः शमनं चिकित्सितम् |',
        translation: 'First digest the ama, then proceed with Shamana treatment.',
        commentary: 'Establishes the treatment sequence - Ama Pachana before Shamana.'
      },
      {
        number: '5.4.7',
        sanskrit: 'बस्तिः वातजगुल्मस्य प्रधानं चिकित्सितम् |',
        translation: 'Basti (medicated enema) is the principal treatment for Vataja Gulma.',
        commentary: 'Highlights the importance of Basti in managing Vata-type abdominal masses.'
      }
    ],
    topics: [
      {
        title: 'Location and Types of Gulma',
        content: 'Gulma can arise in different abdominal regions: Parshwa (flanks), Nabhi (umbilicus), Basti (pelvis), Hridaya (epigastrium). Vataja Gulma moves and changes size, Pittaja Gulma is hot and inflamed, Kaphaja Gulma is firm and slow-growing. Raktaja Gulma is fixed and painful.',
        clinicalRelevance: 'Location helps determine dosha involvement and treatment approach.'
      },
      {
        title: 'Samprapti (Pathogenesis)',
        content: 'Gulma forms when Vata is vitiated by causative factors and becomes obstructed in its normal pathway. The obstructed Vata forms a palpable mass. Additional dosha involvement determines the type. Ama (improperly digested food) often contributes to Gulma formation.',
        clinicalRelevance: 'Understanding pathogenesis guides treatment - Ama Pachana is essential.'
      },
      {
        title: 'Treatment Approach',
        content: 'Treatment follows: (1) Langhana (fasting) if ama is present, (2) Pachana (digestive herbs) to clear ama, (3) Shamana with dosha-specific herbs, (4) Shodhana (Basti for Vataja, Virechana for Pittaja, Vamana for Kaphaja), (5) Rasayana for recovery.',
        clinicalRelevance: 'Sequential treatment is critical - treating with Shodhana during ama stage worsens the condition.'
      },
      {
        title: 'Gulma vs Other Abdominal Conditions',
        content: 'Gulma must be differentiated from: Udara (ascites), Pleeha (splenomegaly), Yakrit (hepatomegaly), Grahani (IBS). Gulma is a palpable mass without suppuration, while other conditions have distinct presentations.',
        clinicalRelevance: 'Differential diagnosis prevents misdiagnosis and inappropriate treatment.'
      },
      {
        title: 'Surgical Indications',
        content: 'Surgical intervention is required when: Gulma is large and resistant to medical treatment, causing obstruction, or when malignancy is suspected. Ancient texts describe surgical approaches for resistant Gulma.',
        clinicalRelevance: 'Recognizing surgical indications prevents delayed treatment of serious conditions.'
      },
      {
        title: 'Dietary Management',
        content: 'Pathya: light, warm, easily digestible food. Old rice, Mudga, barley, warm water, ghee. Apathya: heavy, cold, oily foods. Raw food, cold drinks, incompatible food combinations, excessive eating.',
        clinicalRelevance: 'Dietary modification supports treatment and prevents recurrence.'
      },
      {
        title: 'Gulma Diagnosis',
        content: 'Palpation reveals mass in abdomen. Characteristics: Vataja - movable, changes size, gurgling sound. Pittaja - hot, tender, red. Kaphaja - firm, non-tender, slow-growing. Raktaja - fixed, painful, dark colored.',
        clinicalRelevance: 'Proper diagnosis guides treatment selection.'
      }
    ],
    doshaDiscussion: [
      'Vataja Gulma - mobile, changes size, colicky pain, constipation, flatulence',
      'Pittaja Gulma - hot, inflamed, burning pain, fever, thirst',
      'Kaphaja Gulma - firm, slow-growing, heaviness, anorexia',
      'Raktaja Gulma - fixed, severe pain, discoloration',
      'Sannipataja Gulma - mixed features, most difficult to treat'
    ],
    treatmentProtocols: [
      {
        condition: 'Vataja Gulma',
        treatment: 'Deepana + Vata Shamana + Basti',
        herbs: ['Hing', 'Ajmoda', 'Dashamula', 'Eranda', 'Shunthi'],
        dosage: 'Hingvastak churna 3-6 grams with warm ghee',
        duration: '1-3 months',
        precautions: ['Warm food only', 'Avoid cold exposure', 'Regular meals', 'Oil massage on abdomen']
      },
      {
        condition: 'Pittaja Gulma',
        treatment: 'Pitta Shamana + Virechana',
        herbs: ['Guduchi', 'Amalaki', 'Chandana', 'Shatavari'],
        dosage: 'Guduchi sattva 500mg with Amalaki kashaya',
        duration: '1-2 months',
        precautions: ['Avoid hot, spicy foods', 'Cool environment', 'Light diet']
      },
      {
        condition: 'Kaphaja Gulma',
        treatment: 'Kapha Shamana + Vamana',
        herbs: ['Trikatu', 'Chitraka', 'Pippali', 'Hing'],
        dosage: 'Trikatu churna 1-3 grams with honey',
        duration: '1-3 months',
        precautions: ['Light food', 'Avoid heavy, oily foods', 'Exercise regularly']
      },
      {
        condition: 'Sannipataja Gulma',
        treatment: 'Complex protocol with all three dosha pacification',
        herbs: ['Dashamula', 'Guduchi', 'Hing', 'Eranda', 'Shunthi'],
        dosage: 'Under physician supervision',
        duration: '3-6 months',
        precautions: ['Requires experienced physician', 'Monitor carefully', 'Surgical intervention may be needed']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Gulma',
        sanskrit: 'वातज गुल्म',
        etiology: 'Vata vitiation causing abdominal mass, often due to cold food, irregular eating, stress',
        symptoms: ['Colicky pain', 'Mobile mass', 'Constipation', 'Flatulence', 'Distension'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Deepana, Vata Shamana, Basti'
      },
      {
        name: 'Sannipataja Gulma',
        sanskrit: 'सन्निपातज गुल्म',
        etiology: 'All three doshas vitiated causing complex abdominal mass',
        symptoms: ['Mixed symptoms', 'Severe pain', 'Fever', 'Digestive disturbance'],
        prognosis: 'Kricchra Sadhya (difficult to cure)',
        treatment: 'Complex multi-dosha protocol, may require surgery'
      }
    ],
    importantVerses: [
      '5.1.4 - Definition of Gulma',
      '5.1.8 - Five types of Gulma',
      '5.2.3 - Symptoms of Vataja Gulma',
      '5.3.1 - Treatment principles'
    ],
    clinicalApplications: [
      'Abdominal masses - Gulma diagnosis and treatment',
      'IBS with palpable mass - Vataja Gulma protocol',
      'Inflammatory bowel mass - Pittaja Gulma treatment',
      'Fibroids - Raktaja Gulma management',
      'Abdominal tumors - comprehensive Gulma approach',
      'Chronic constipation with mass - Vata Shamana',
      'Post-surgical recovery - Rasayana after Gulma treatment',
      'Lymphadenopathy - Gulma differentiation and treatment',
      'Cysts - Kaphaja Gulma management',
      'Hernia - Vataja Gulma with Shodhana',
      'Abdominal adhesions - post-surgical Gulma protocol',
      'Functional abdominal mass - comprehensive diagnostic approach'
    ]
  },
  {
    id: 'chikitsa-8',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 8,
    name: 'Rajayakshma Chikitsa',
    sanskrit: 'राजयक्ष्मा चिकित्सा',
    english: 'Management of Tuberculosis/Wasting Disease',
    summary: 'Rajayakshma Chikitsa covers the treatment of wasting diseases caused by eight specific etiological factors (Ashtahetu). The condition leads to progressive depletion of all dhatus (tissues), resulting in emaciation, cough, fever, and debility. It corresponds to modern tuberculosis and other chronic wasting conditions.',
    keyConcepts: [
      'Rajayakshma is caused by eight factors (Ashtahetu)',
      'Progressive dhatu depletion (Rasa through Shukra)',
      'Treatment focuses on Bṛmhana (nourishing) and Rasayana',
      'Shodhana should be done cautiously in debilitated patients',
      'Pippali is a key herb for Rajayakshma treatment',
      'Diet should be highly nutritious and easy to digest',
      'Treatment is long-term requiring patience and compliance'
    ],
    shlokas: [
      {
        number: '8.1.4',
        sanskrit: 'अष्टौ रोगाः समासेन राजयक्ष्मसमुद्भवाः | व्यायाममारुतातपसंतापाः क्षयमांसताम् ||',
        translation: 'Rajayakshma arises from eight factors: excessive exercise, exposure to wind, sun exposure, grief, fear, anger, suppression of natural urges, and indulgence in incompatible foods.',
        commentary: 'Lists the eight causative factors that lead to Rajayakshma.'
      },
      {
        number: '8.1.7',
        sanskrit: 'क्षयं गच्छति सर्वेषां धातूनां क्रमशो नरः |',
        translation: 'The person progressively loses all dhatus (tissues) in sequence.',
        commentary: 'Describes the progressive tissue depletion characteristic of Rajayakshma.'
      },
      {
        number: '8.3.5',
        sanskrit: 'बृंहणं राजयक्ष्म्णः प्रधानं चिकित्सितम् |',
        translation: 'Bṛmhana (nourishing therapy) is the principal treatment for Rajayakshma.',
        commentary: 'Establishes nourishing therapy as the primary treatment approach.'
      },
      {
        number: '8.4.1',
        sanskrit: 'पिप्पली राजयक्ष्म्णः प्रधानं औषधम् |',
        translation: 'Pippali is the principal herb for Rajayakshma treatment.',
        commentary: 'Establishes Pippali as the key rejuvenating herb for wasting conditions.'
      },
      {
        number: '8.5.3',
        sanskrit: 'क्षीरं सर्पिः मधु युक्तं राजयक्ष्महरं परम् |',
        translation: 'Milk, ghee, and honey combined is the supreme remedy for Rajayakshma.',
        commentary: 'This Anupana (vehicle) combination nourishes all dhatus and supports recovery.'
      }
    ],
    topics: [
      {
        title: 'Ashtahetu (Eight Causative Factors)',
        content: 'The eight factors are: (1) Vyayama (excessive exercise), (2) Maruta (exposure to wind), (3) Atapa (sun exposure), (4) Santapa (grief/mental stress), (5) Bhaya (fear), (6) Krodha (anger), (7) Vega Dharana (suppression of natural urges), (8) Asatmya Bhojana (incompatible food). These deplete dhatus progressively.',
        clinicalRelevance: 'Identifying and eliminating causative factors is essential for treatment success.'
      },
      {
        title: 'Dhatu Depletion Sequence',
        content: 'Rajayakshma depletes dhatus in sequence: Rasa (first - causing anorexia, fatigue) → Rakta (pallor) → Mamsa (muscle wasting) → Meda (fat loss) → Asthi (bone weakness) → Majja (neurological symptoms) → Shukra (reproductive failure). Each stage has specific symptoms.',
        clinicalRelevance: 'Understanding the depletion sequence helps in staging and treatment planning.'
      },
      {
        title: 'Bṛmhana Therapy',
        content: 'Bṛmhana (nourishing) therapy involves: highly nutritious diet (milk, ghee, meat soup, rice), Rasayana herbs (Ashwagandha, Bala, Shatavari), Snehana (oleation), and rest. Avoid Shodhana in severely debilitated patients. Focus on building dhatus one by one.',
        clinicalRelevance: 'Bṛmhana is the cornerstone of Rajayakshma treatment - aggressive Shodhana is contraindicated.'
      },
      {
        title: 'Rajayakshma vs Modern Tuberculosis',
        content: 'Rajayakshma has similarities with tuberculosis (TB) - chronic cough, fever, emaciation, night sweats. However, Rajayakshma is broader, encompassing any wasting condition from the eight causative factors. Treatment must address both the specific cause and general dhatu depletion.',
        clinicalRelevance: 'Understanding the correlation helps integrate modern diagnostics with Ayurvedic treatment.'
      },
      {
        title: 'Stages of Rajayakshma',
        content: 'Stage 1: Rasa Kshaya - anorexia, fatigue, taste changes. Stage 2: Rakta Kshaya - pallor, mild fever. Stage 3: Mamsa Kshaya - muscle wasting, weakness. Stage 4: Meda Kshaya - weight loss, dry skin. Stage 5: Asthi Kshaya - bone pain, hair loss. Stage 6: Majja Kshaya - neurological symptoms. Stage 7: Shukra Kshaya - reproductive failure.',
        clinicalRelevance: 'Staging determines treatment intensity and prognosis.'
      },
      {
        title: 'Prevention Strategies',
        content: 'Prevention involves: balanced exercise (avoid excess), protection from wind and sun, emotional management, timely expression of urges, compatible diet, adequate rest, and seasonal lifestyle adaptation. Early intervention at premonitory symptoms prevents progression.',
        clinicalRelevance: 'Prevention is more effective than treatment of established disease.'
      },
      {
        title: 'Panchakarma in Rajayakshma',
        content: 'Shodhana should be done cautiously in Rajayakshma. Vamana for Kaphaja type with mild herbs. Virechana for Pittaja type. Basti is most important - Anuvasana (oil) Basti with Bala taila. Avoid aggressive Shodhana in debilitated patients.',
        clinicalRelevance: 'Panchakarma must be adapted to patient strength - aggressive treatment worsens debility.'
      }
    ],
    doshaDiscussion: [
      'Vataja Rajayakshma - dry cough, emaciation, insomnia, pain',
      'Pittaja Rajayakshma - fever, burning, sweating, thirst',
      'Kaphaja Rajayakshma - heaviness, anorexia, mucus production',
      'Sannipataja - mixed features, worst prognosis',
      'All types involve progressive dhatu kshaya'
    ],
    treatmentProtocols: [
      {
        condition: 'Rajayakshma (Early Stage)',
        treatment: 'Bṛmhana + Deepana + Shamana',
        herbs: ['Ashwagandha', 'Bala', 'Shatavari', 'Pippali', 'Guduchi'],
        dosage: 'Ashwagandha churna 3-6 grams with warm milk twice daily',
        duration: '3-6 months minimum',
        precautions: ['Avoid exertion', 'Warm, nutritious diet', 'Adequate rest', 'Avoid cold exposure']
      },
      {
        condition: 'Kshata Kshina (Injury-induced wasting)',
        treatment: 'Bṛmhana + Ropana (healing)',
        herbs: ['Ashwagandha', 'Bala', 'Shatavari', 'Guduchi', 'Amalaki'],
        dosage: 'Bala taila for external use, Ashwagandha Ghrita 20g daily',
        duration: '3-6 months',
        precautions: ['Wound care', 'High protein diet', 'Avoid infection']
      },
      {
        condition: 'Rajayakshma with Cough',
        treatment: 'Shamana + Bṛmhana',
        herbs: ['Vasa', 'Kantakari', 'Pippali', 'Shunthi', 'Madhu'],
        dosage: 'Vasa kashaya 40ml with honey twice daily',
        duration: '2-4 months',
        precautions: ['Avoid cold food and exposure', 'Warm environment', 'Steam inhalation']
      },
      {
        condition: 'Chronic Rajayakshma',
        treatment: 'Rasayana + long-term Bṛmhana',
        herbs: ['Chyavanaprasha', 'Ashwagandha', 'Shilajatu', 'Pippali', 'Bala'],
        dosage: 'Chyavanaprasha 20 grams daily with milk',
        duration: '6-12 months',
        precautions: ['Regular monitoring', 'Nutritious diet', 'Avoid all causative factors', 'Mental support']
      },
      {
        condition: 'Rajayakshma with Fever',
        treatment: 'Jwara Shamana + Bṛmhana',
        herbs: ['Guduchi', 'Amalaki', 'Pippali', 'Shunthi', 'Madhu'],
        dosage: 'Guduchi kashaya 40ml twice daily',
        duration: '2-4 months',
        precautions: ['Light, warm diet', 'Adequate rest', 'Avoid cold exposure', 'Monitor temperature']
      },
      {
        condition: 'Post-TB Recovery',
        treatment: 'Rasayana for lung and immune recovery',
        herbs: ['Ashwagandha', 'Shatavari', 'Guduchi', 'Amalaki', 'Pippali'],
        dosage: 'Ashwagandha churna 3 grams with warm milk twice daily',
        duration: '3-6 months',
        precautions: ['Gradual exercise', 'Nutritious diet', 'Avoid infection', 'Regular monitoring']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Rajayakshma',
        sanskrit: 'राजयक्ष्मा',
        etiology: 'Eight causative factors leading to progressive dhatu depletion',
        symptoms: ['Chronic cough', 'Fever', 'Emaciation', 'Fatigue', 'Night sweats', 'Anorexia', 'Chest pain'],
        prognosis: 'Sadhya (curable) in early stages, Kricchra (difficult) in chronic',
        treatment: 'Bṛmhana, Rasayana, Shamana with nourishing herbs'
      },
      {
        name: 'Kshaya',
        sanskrit: 'क्षय',
        etiology: 'Progressive tissue depletion from multiple causes',
        symptoms: ['Weight loss', 'Weakness', 'Fatigue', 'Dhatu depletion signs'],
        prognosis: 'Variable - depends on stage and treatment compliance',
        treatment: 'Bṛmhana, Rasayana, nutritional support'
      }
    ],
    importantVerses: [
      '8.1.4 - Eight causative factors',
      '8.1.7 - Progressive dhatu depletion',
      '8.3.5 - Bṛmhana as principal treatment',
      '8.4.1 - Role of Pippali in treatment'
    ],
    clinicalApplications: [
      'Tuberculosis - Rajayakshma protocol with anti-microbial herbs',
      'Chronic wasting diseases - comprehensive Bṛmhana approach',
      'Post-illness debility - Rasayana for recovery',
      'Cancer-related wasting - supportive Rajayakshma treatment',
      'Chronic fatigue - dhatu-building protocol',
      'Respiratory wasting - Vasa-Pippali combination',
      'Immune deficiency - Rasayana with Ashwagandha',
      'HIV/AIDS support - immune-building Rajayakshma approach',
      'Post-surgical recovery - tissue rebuilding protocol',
      'Geriatric debility - gentle Bṛmhana therapy',
      'Malnutrition - nutritional rehabilitation approach',
      'Chronic infections - immune Rasayana protocol'
    ]
  },
  {
    id: 'chikitsa-9',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 9,
    name: 'Unmada Chikitsa',
    sanskrit: 'उन्माद चिकित्सा',
    english: 'Management of Psychiatric Disorders',
    summary: 'Unmada Chikitsa covers the treatment of psychiatric and psychological disorders. Unmada is characterized by derangement of mind, intellect, consciousness, knowledge, memory, desire, behavior, and conduct. The chapter describes five types based on dosha involvement plus Agantuja (external cause).',
    keyConcepts: [
      'Five types: Vataja, Pittaja, Kaphaja, Sannipataja, Agantuja',
      'Manasika doshas (Raja and Tama) are primarily involved',
      'Treatment includes Shamana, Shodhana, and Satvavajaya (psychotherapy)',
      'Nasya (nasal medication) is important for psychiatric conditions',
      'Brahmi, Vacha, and Shankhapushpi are key herbs for mental disorders',
      'Environmental and behavioral modification is essential',
      'Satvavajaya (mind-based therapy) is as important as herbal treatment'
    ],
    shlokas: [
      {
        number: '9.1.4',
        sanskrit: 'उन्मादः पञ्चधा प्रोक्तो वाताद्यैः सम्भवाच्च तु |',
        translation: 'Unmada is of five types: caused by Vata, Pitta, Kapha, Sannipata, and external factors.',
        commentary: 'Classifies psychiatric disorders into five etiological categories.'
      },
      {
        number: '9.1.6',
        sanskrit: 'मनो बुद्धिः स्मृतिः सञ्ज्ञा मेधा धीः कृतिरात्मजाः |',
        translation: 'Mind, intellect, memory, consciousness, wisdom, and conduct are the seats of mental disorders.',
        commentary: 'Identifies the psychological faculties affected in Unmada.'
      },
      {
        number: '9.3.5',
        sanskrit: 'सत्त्ववजयं चिकित्सितम् |',
        translation: 'Satvavajaya (mind-based therapy) is the treatment for psychiatric disorders.',
        commentary: 'Establishes psychotherapy as a primary treatment modality.'
      },
      {
        number: '9.4.1',
        sanskrit: 'नस्यं शिरसि रोगेषु प्रधानं औषधम् |',
        translation: 'Nasya (nasal medication) is the principal treatment for head and mental disorders.',
        commentary: 'Establishes Nasya as a key delivery route for psychiatric herbs.'
      },
      {
        number: '9.5.7',
        sanskrit: 'वचा ब्राह्मी शङ्खपुष्पी जटामांसी मनोगदे |',
        translation: 'Vacha, Brahmi, Shankhapushpi, and Jatamansi are the primary herbs for mental disorders.',
        commentary: 'Lists the four key Medhya herbs for psychiatric treatment.'
      }
    ],
    topics: [
      {
        title: 'Types of Unmada',
        content: 'Vataja Unmada: restlessness, talking irrelevantly, laughing/crying without reason, destructive behavior. Pittaja Unmada: anger, violence, seeing things, running around. Kaphaja Unmada: lethargy, excessive sleep, anorexia, muttering. Sannipataja: mixed features. Agantuja: caused by external factors like trauma, poison, supernatural causes.',
        clinicalRelevance: 'Type determines treatment approach - each requires specific dosha pacification.'
      },
      {
        title: 'Satvavajaya (Psychotherapy)',
        content: 'Satvavajaya includes: (1) Jnana (spiritual knowledge), (2) Vijnana (scientific knowledge), (3) Dhairya (courage), (4) Smriti (memory), (5) Samadhi (concentration). Also includes behavioral modification, counseling, and creating a supportive environment.',
        clinicalRelevance: 'Psychotherapy is essential alongside herbal treatment for mental disorders.'
      },
      {
        title: 'Nasya for Psychiatric Conditions',
        content: 'Nasal medication is particularly important for conditions affecting the head and mind. Key Nasya formulations include: Brahmi Ghrita, Vacha churna Nasya, Anu Taila. Nasya delivers herbs directly to the brain through nasal mucosa.',
        clinicalRelevance: 'Nasya is a primary route for delivering psychiatric herbs to the brain.'
      },
      {
        title: 'Herbal Psychopharmacology',
        content: 'Medhya herbs act on neurotransmitter systems: Brahmi (Bacopa) enhances serotonin and acetylcholine. Shankhapushpi (Evolvulus) modulates GABA. Jatamansi (Nardostachys) affects dopamine. Vacha (Acorus) enhances acetylcholine. These herbs have anxiolytic, antidepressant, and cognitive-enhancing effects.',
        clinicalRelevance: 'Understanding pharmacological basis supports evidence-based herbal selection.'
      },
      {
        title: 'Dietary Management in Unmada',
        content: 'Pathya: warm, fresh, light food. Milk, ghee, sweet foods. Regular meal times. Apathya: stale food, alcohol, caffeine, excessive spicy food. Incompatible food combinations. Irregular meal times.',
        clinicalRelevance: 'Dietary modification supports treatment and prevents recurrence.'
      },
      {
        title: 'Family Education',
        content: 'Family should be educated about: nature of mental illness, importance of medication compliance, creating supportive environment, recognizing warning signs, managing aggressive behavior, and when to seek emergency help.',
        clinicalRelevance: 'Family support is crucial for recovery and prevention of relapse.'
      }
    ],
    doshaDiscussion: [
      'Vataja Unmada - restlessness, irrelevant speech, destructive behavior',
      'Pittaja Unmada - anger, violence, hallucinations, running around',
      'Kaphaja Unmada - lethargy, excessive sleep, muttering, anorexia',
      'Sannipataja - mixed features, most difficult to treat',
      'Agantuja - external cause, requires specific cause-based treatment'
    ],
    treatmentProtocols: [
      {
        condition: 'Vataja Unmada',
        treatment: 'Snehana + Shodhana + Shamana',
        herbs: ['Brahmi', 'Vacha', 'Jatamansi', 'Shankhapushpi', 'Ashwagandha'],
        dosage: 'Brahmi Ghrita 15 grams daily with warm milk',
        duration: '3-6 months',
        precautions: ['Calm environment', 'Regular routine', 'Avoid stress', 'Supportive family involvement']
      },
      {
        condition: 'Pittaja Unmada',
        treatment: 'Pitta Shamana + Virechana',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Amalaki', 'Chandana'],
        dosage: 'Shankhapushpi churna 3 grams with honey twice daily',
        duration: '3-6 months',
        precautions: ['Cool environment', 'Avoid anger triggers', 'Light diet', 'Regular sleep']
      },
      {
        condition: 'Kaphaja Unmada',
        treatment: 'Kapha Shamana + Vamana',
        herbs: ['Vacha', 'Brahmi', 'Trikatu', 'Tulsi'],
        dosage: 'Vacha churna 1 gram with honey twice daily',
        duration: '3-6 months',
        precautions: ['Active lifestyle', 'Avoid heavy food', 'Regular exercise', 'Social engagement']
      },
      {
        condition: 'Agantuja Unmada',
        treatment: 'Cause-specific treatment + Shamana',
        herbs: ['Brahmi', 'Vacha', 'Shankhapushpi', 'Jatamansi'],
        dosage: 'As per specific cause and physician guidance',
        duration: 'Variable',
        precautions: ['Identify and eliminate cause', 'Supportive environment', 'Counseling']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Unmada',
        sanskrit: 'वातज उन्माद',
        etiology: 'Vata vitiation affecting mind due to stress, fear, irregular routine',
        symptoms: ['Restlessness', 'Irrelevant speech', 'Laughing/crying without reason', 'Insomnia', 'Destructive behavior'],
        prognosis: 'Sadhya (curable) in acute, Kricchra (difficult) in chronic',
        treatment: 'Snehana, Shodhana, Brahmi Ghrita, Nasya'
      },
      {
        name: 'Pittaja Unmada',
        sanskrit: 'पित्तज उन्माद',
        etiology: 'Pitta vitiation due to anger, frustration, suppressed emotions, heat exposure',
        symptoms: ['Anger', 'Violence', 'Hallucinations of fire', 'Running around', 'Self-harm', 'Irritability'],
        prognosis: 'Sadhya (curable) with Pitta Shamana',
        treatment: 'Virechana + Pitta Shamana + cooling environment'
      },
      {
        name: 'Kaphaja Unmada',
        sanskrit: 'कफज उन्माद',
        etiology: 'Kapha vitiation due to attachment, grief, sedentary lifestyle, heavy food',
        symptoms: ['Depression', 'Lethargy', 'Excessive sleep', 'Loss of appetite', 'Drooling', 'Emotional dullness'],
        prognosis: 'Sadhya (curable) with Kapha Shamana',
        treatment: 'Vamana + Kapha Shamana + stimulants'
      },
      {
        name: 'Agantuja Unmada',
        sanskrit: 'आगन्तुज उन्माद',
        etiology: 'External factors - trauma, poison, psychological shock',
        symptoms: ['Sudden onset', 'Cause-specific symptoms', 'Behavioral changes'],
        prognosis: 'Variable based on cause',
        treatment: 'Cause elimination, Shamana, Satvavajaya'
      }
    ],
    importantVerses: [
      '9.1.4 - Five types of Unmada',
      '9.1.6 - Seats of mental disorders',
      '9.3.5 - Satvavajaya as treatment',
      '9.4.1 - Nasya for psychiatric conditions'
    ],
    clinicalApplications: [
      'Schizophrenia - Sannipataja Unmada protocol',
      'Bipolar disorder - Vata-Pittaja Unmada treatment',
      'Depression - Kaphaja Unmada management',
      'Anxiety disorders - Vataja Unmada Shamana',
      'Psychosis - comprehensive Unmada treatment',
      'Post-traumatic stress - Agantuja Unmada protocol',
      'Behavioral disorders - Satvavajaya counseling',
      'Insomnia - Vata Shamana with Brahmi',
      'Cognitive disorders - Medhya Rasayana approach',
      'Addiction - cause-specific Unmada management',
      'Geriatric psychiatric disorders - gentle Shamana',
      'Childhood behavioral issues - age-appropriate protocols'
    ]
  },
  {
    id: 'chikitsa-10',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 10,
    name: 'Apasmara Chikitsa',
    sanskrit: 'अपस्मार चिकित्सा',
    english: 'Management of Epilepsy',
    summary: 'Apasmara Chikitsa covers the treatment of epilepsy and seizure disorders. Apasmara is characterized by temporary loss of consciousness with convulsions, caused by vitiation of Tama dosha with Vata. The chapter describes four types based on dosha involvement and treatment protocols for each.',
    keyConcepts: [
      'Four types: Vataja, Pittaja, Kaphaja, Sannipataja',
      'Tama dosha with Vata is the primary pathological combination',
      'Seizures are caused by dosha obstruction in manovahaha srotas',
      'Treatment includes Shodhana, Shamana, and Rasayana',
      'Nasya is important for treating seizure disorders',
      'Long-term Rasayana prevents recurrence',
      'Diet and lifestyle modification are essential'
    ],
    shlokas: [
      {
        number: '10.1.3',
        sanskrit: 'अपस्मारो मनोदोषात् तमसा सह सम्भवेत् |',
        translation: 'Apasmara arises from vitiation of mind with Tama dosha.',
        commentary: 'Establishes the role of Tama dosha in seizure disorders.'
      },
      {
        number: '10.1.5',
        sanskrit: 'चतुर्धा अपस्मारः वातपित्तकफसन्निपातजः |',
        translation: 'Apasmara is of four types: Vataja, Pittaja, Kaphaja, and Sannipataja.',
        commentary: 'Classifies epilepsy into four types based on dosha.'
      },
      {
        number: '10.2.1',
        sanskrit: 'मनोवहसिरोविद्धे तमः प्रसक्तं स्मृतिं नाशयति |',
        translation: 'When manovahaha srotas (channels carrying consciousness) are obstructed, Tama destroys memory.',
        commentary: 'Explains the mechanism of seizure - obstruction of consciousness channels.'
      },
      {
        number: '10.3.1',
        sanskrit: 'नस्यं बस्तिः रसायनं च अपस्मारे प्रधानम् |',
        translation: 'Nasya, Basti, and Rasayana are the principal treatments for Apasmara.',
        commentary: 'Establishes the three-pillar treatment approach for epilepsy.'
      }
    ],
    topics: [
      {
        title: 'Seizure Mechanism',
        content: 'During a seizure, vitiated doshas obstruct the channels carrying consciousness (manovahaha srotas). This causes temporary loss of consciousness and involuntary movements. After the seizure, the patient has no memory of the event. The type of seizure depends on the predominant dosha.',
        clinicalRelevance: 'Understanding the mechanism guides treatment - focus on clearing srotas obstruction.'
      },
      {
        title: 'Post-Seizure Care',
        content: 'After a seizure, the patient should be: (1) placed in safe position, (2) given aromatic herbs like Vacha to restore consciousness, (3) given warm water to drink, (4) kept calm and comfortable. Rasayana therapy should be started to prevent recurrence.',
        clinicalRelevance: 'Post-seizure care is as important as acute treatment.'
      },
      {
        title: 'Seizure Triggers',
        content: 'Common triggers include: stress, sleep deprivation, fasting, alcohol, flashing lights, fever, incompatible food. Identifying and avoiding triggers is essential for seizure prevention.',
        clinicalRelevance: 'Trigger identification enables preventive strategies.'
      },
      {
        title: 'Rasayana for Epilepsy',
        content: 'Long-term Rasayana therapy prevents recurrence: Brahmi Ghrita, Shankhapushpi, Vacha, Jatamansi. These herbs strengthen manovahaha srotas and improve cognitive function. Rasayana should continue for 6-12 months after last seizure.',
        clinicalRelevance: 'Rasayana is essential for complete cure - Shamana alone only controls seizures.'
      },
      {
        title: 'Emergency Management',
        content: 'During seizure: protect from injury, place on side, do not restrain, do not put objects in mouth. After seizure: check breathing, give aromatic herbs, keep calm. Seek medical help if seizure lasts >5 minutes or repeats.',
        clinicalRelevance: 'Proper emergency management prevents complications.'
      },
      {
        title: 'Dietary Management in Apasmara',
        content: 'Pathya: warm, light, fresh food. Milk, ghee, sweet foods. Regular meal times. Apathya: alcohol, caffeine, stale food, heavy/oily food, incompatible food combinations. Irregular eating patterns.',
        clinicalRelevance: 'Dietary compliance prevents seizure triggers.'
      },
      {
        title: 'Psychological Support',
        content: 'Patients with epilepsy need: acceptance of condition, education about disease, stress management techniques, social support, occupational guidance, and mental health counseling. Stigma reduction is essential.',
        clinicalRelevance: 'Psychological support improves quality of life and treatment compliance.'
      }
    ],
    doshaDiscussion: [
      'Vataja Apasmara - stiff body, frothing, irregular movements, pain',
      'Pittaja Apasmara - yellowish discoloration, burning, sweating during seizure',
      'Kaphaja Apasmara - heaviness, excessive salivation, prolonged unconsciousness',
      'Sannipataja - mixed features, most severe and difficult to treat'
    ],
    treatmentProtocols: [
      {
        condition: 'Vataja Apasmara',
        treatment: 'Basti + Shamana + Nasya',
        herbs: ['Vacha', 'Brahmi', 'Shankhapushpi', 'Kushtha', 'Dashamula'],
        dosage: 'Vacha churna 1 gram with Brahmi Ghrita',
        duration: '6-12 months',
        precautions: ['Avoid stress', 'Regular sleep', 'Avoid fasting', 'Warm food']
      },
      {
        condition: 'Pittaja Apasmara',
        treatment: 'Virechana + Pitta Shamana',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Amalaki'],
        dosage: 'Shankhapushpi churna 3 grams with ghee',
        duration: '6-12 months',
        precautions: ['Cool environment', 'Avoid heat exposure', 'Light diet']
      },
      {
        condition: 'Kaphaja Apasmara',
        treatment: 'Vamana + Kapha Shamana',
        herbs: ['Vacha', 'Brahmi', 'Trikatu', 'Tulsi'],
        dosage: 'Vacha churna 1 gram with honey',
        duration: '6-12 months',
        precautions: ['Active lifestyle', 'Avoid heavy food', 'Regular exercise']
      },
      {
        condition: 'Seizure Prevention',
        treatment: 'Long-term Rasayana + lifestyle modification',
        herbs: ['Brahmi', 'Shankhapushpi', 'Vacha', 'Jatamansi', 'Ashwagandha'],
        dosage: 'Brahmi Ghrita 10 grams daily with warm milk',
        duration: '6-12 months after last seizure',
        precautions: ['Avoid triggers', 'Regular sleep', 'Stress management', 'Regular medication']
      },
      {
        condition: 'Seizure Prevention (Rasayana)',
        treatment: 'Rasayana therapy after seizure control',
        herbs: ['Brahmi', 'Shankhapushpi', 'Vacha', 'Amalaki'],
        dosage: 'Brahmi Ghrita 10 grams daily',
        duration: '1-2 years',
        precautions: ['Long-term compliance essential', 'Regular follow-up', 'Avoid all triggers']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Apasmara',
        sanskrit: 'वातज अपस्मार',
        etiology: 'Vata vitiation obstructing manovahaha srotas',
        symptoms: ['Sudden seizure', 'Stiff body', 'Frothing', 'Irregular movements', 'Pain'],
        prognosis: 'Kricchra Sadhya (difficult to cure)',
        treatment: 'Basti, Shamana, Nasya, Rasayana'
      },
      {
        name: 'Kaphaja Apasmara',
        sanskrit: 'कफज अपस्मार',
        etiology: 'Kapha vitiation with Tama causing channel obstruction',
        symptoms: ['Prolonged unconsciousness', 'Excessive salivation', 'Heaviness', 'Slow recovery'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Vamana, Kapha Shamana, Rasayana'
      }
    ],
    importantVerses: [
      '10.1.3 - Tama dosha role in epilepsy',
      '10.1.5 - Four types of Apasmara',
      '10.2.1 - Seizure mechanism',
      '10.3.1 - Treatment principles'
    ],
    clinicalApplications: [
      'Epilepsy - comprehensive Apasmara protocol',
      'Seizure disorders - dosha-specific treatment',
      'Post-seizure recovery - Rasayana therapy',
      'Childhood epilepsy - modified treatment protocol',
      'Recurrent seizures - long-term prevention strategy',
      'Status epilepticus - emergency management',
      'Seizure with psychiatric features - Unmada-Apasmara combined treatment',
      'Febrile seizures - Jwara-Apasmara management',
      'Post-traumatic epilepsy - Agantuja Apasmara treatment',
      'Seizure prevention - Rasayana and lifestyle approach',
      'Cognitive decline after seizures - Medhya Rasayana',
      'Quality of life improvement - comprehensive support'
    ]
  },
  {
    id: 'chikitsa-11',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 11,
    name: 'Kshatakshina Chikitsa',
    sanskrit: 'क्षतक्षीण चिकित्सा',
    english: 'Management of Emaciation and Tissue Wasting',
    summary: 'Kshatakshina Chikitsa comprehensively addresses emaciation and wasting caused by progressive tissue (dhatu) depletion. The chapter details seven distinct etiological factors including chronic illness, trauma, nutritional deficiency, physical overexertion, psychological stress, urge suppression, and incompatible food consumption. Treatment follows a staged approach: initially addressing the root cause, then employing Bṛmhana (nourishing) therapy with Snehana (oleation), followed by Rasayana (rejuvenation) to restore tissue integrity.',
    keyConcepts: [
      'Kshatakshina involves progressive dhatu kshaya (tissue depletion) affecting all seven dhatus',
      'Seven causative factors: chronic illness (Vyadhi), trauma (Abhighata), nutritional deficiency (Vishamashana), overexertion (Ati Vyayama), psychological stress (Shoka), urge suppression (Vega Dharana), and Viruddha Ahara',
      'Treatment is primarily Bṛmhana (nourishing) - contraindicated to perform Shodhana in severely debilitated patients',
      'Snehana (oleation) is essential for rebuilding tissues - internal with medicated ghee and external with medicated oils',
      'Diet should be highly nutritious, easy to digest, and rich in sweet (Madhura) taste which promotes tissue building',
      'Rasayana herbs like Ashwagandha, Bala, Shatavari help in tissue regeneration through anabolic properties',
      'Treatment sequence: Langhana (if ama present) → Deepana-Pachana → Snehana → Bṛmhana → Rasayana',
      'Kshatakshina differs from Karshya (constitutional thinness) - Kshatakshina is acquired',
      'Vyayama Shakti (exercise capacity) and Ahara Shakti (diet capacity) assessment guides treatment intensity',
      'Shukra dhatu depletion is the most critical stage - indicates involvement of all preceding dhatus',
      'Mental health support is integral - Shoka (grief) and stress perpetuate tissue depletion',
      'Gradual increase in food quantity prevents digestive overload in debilitated patients'
    ],
    shlokas: [
      {
        number: '11.1.1',
        sanskrit: 'क्षतक्षीणस्य चिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall now explain the treatment of Kshatakshina (emaciation and wasting).',
        commentary: 'Opening verse introducing the chapter on wasting disorders.'
      },
      {
        number: '11.1.3',
        sanskrit: 'क्षतक्षीणः क्षयं प्राप्तः सर्वधातूनाम् | रसरक्तमांसमेदोस्थिमज्जाशुक्रक्षयलक्षणम् ||',
        translation: 'Kshatakshina is the depletion of all dhatus - characterized by depletion of Rasa, Rakta, Mamsa, Meda, Asthi, Majja, and Shukra.',
        commentary: 'Defines the condition as comprehensive tissue depletion affecting all seven structural tissues.'
      },
      {
        number: '11.1.5',
        sanskrit: 'व्याधितः क्षीणधातुः स्यादभिघातादपि क्षयम् | विषमाशनसेवी च अतिव्यायामकर्मणा ||',
        translation: 'One becomes depleted from chronic disease, injury, irregular eating, excessive exercise, grief, urge suppression, and incompatible food.',
        commentary: 'Comprehensive enumeration of seven causative factors leading to wasting.'
      },
      {
        number: '11.2.1',
        sanskrit: 'तस्य चिकित्सा बृंहणं प्रधानम् | स्नेहनं स्वेदनं बृंहणान्नपानं च ||',
        translation: 'The primary treatment is Bṛmhana (nourishing) including Snehana, Swedana, and nourishing food and drinks.',
        commentary: 'Establishes the three pillars of treatment for wasting conditions.'
      },
      {
        number: '11.2.5',
        sanskrit: 'बृंहणं तस्य चिकित्सा | न तु शोधनम् | शोधनं हि धातुक्षयं करोति ||',
        translation: 'Bṛmhana is the treatment. Not Shodhana, for Shodhana further depletes tissues.',
        commentary: 'Critical clinical principle - purification is contraindicated in wasting.'
      },
      {
        number: '11.3.2',
        sanskrit: 'क्षीरं घृतं नवं मांसं रसः शालिः शतं पचेत् |',
        translation: 'Milk, fresh ghee, meat, meat soup, and Shali rice are the sustenance for depleted dhatus.',
        commentary: 'Lists the primary Bṛmhana (nourishing) foods that rebuild depleted tissues.'
      },
      {
        number: '11.4.1',
        sanskrit: 'आश्वगन्धा बला शतावरी गुडूची आमलकं रसायनम् |',
        translation: 'Ashwagandha, Bala, Shatavari, Guduchi, and Amalaki are the Rasayana herbs for tissue rebuilding.',
        commentary: 'Core Rasayana herbs used for tissue regeneration in wasting conditions.'
      },
      {
        number: '11.5.3',
        sanskrit: 'शोकं हित्वा सुखी भूत्वा भुञ्जीत अनसूयकः |',
        translation: 'Abandoning grief, becoming happy, one should eat without malice or anxiety.',
        commentary: 'Emphasizes the critical role of mental health in tissue recovery.'
      }
    ],
    topics: [
      {
        title: 'Seven Causative Factors',
        content: '(1) Vyadhi - chronic illness like Rajayakshma, Prameha, Jwara. (2) Abhighata - trauma with blood loss. (3) Vishamashana - irregular eating. (4) Ati Vyayama - excessive exercise. (5) Shoka - chronic grief. (6) Vega Dharana - urge suppression. (7) Viruddha Ahara - incompatible food.',
        clinicalRelevance: 'Identifying the specific causative factor is essential for targeted treatment.'
      },
      {
        title: 'Bṛmhana Diet Protocol',
        content: 'Milk (Ksheera), ghee (Ghrita), meat soup (Mamsa Rasa), Shali rice, wheat (Godhuma), dry fruits, honey. Food should be warm, freshly prepared, sweet (Madhura) in taste, eaten in calm environment. Avoid raw, cold, stale foods.',
        clinicalRelevance: 'Diet is the cornerstone of Bṛmhana therapy - more important than herbs.'
      },
      {
        title: 'Staged Treatment Approach',
        content: 'Stage 1: Langhana + Deepana-Pachana if Ama present. Stage 2: Snehana with medicated ghee. Stage 3: Bṛmhana with heavy, sweet, unctuous foods. Stage 4: Rasayana for long-term tissue maintenance. Each stage 2-4 weeks.',
        clinicalRelevance: 'Skipping stages leads to treatment failure - especially Ama Pachana before Bṛmhana.'
      },
      {
        title: 'Kshatakshina vs Karshya',
        content: 'Kshatakshina (acquired wasting): specific etiological factors, progressive depletion, associated symptoms. Karshya (constitutional thinness): inherent body type, no pathological symptoms, normal appetite. Differentiation prevents unnecessary treatment.',
        clinicalRelevance: 'Misdiagnosing constitutional thinness as wasting leads to inappropriate treatment.'
      },
      {
        title: 'Mental Health Integration',
        content: 'Shoka and stress are both causes and perpetuating factors. Support includes: counseling, meditation, yoga, Sattvavajaya Chikitsa. Ashwagandha acts as adaptogen for both physical and mental aspects.',
        clinicalRelevance: 'Neglecting mental health leads to treatment failure even with optimal physical treatment.'
      },
      {
        title: 'Dhatu-Specific Nourishment',
        content: 'Rasa - milk, ghee, Shatavari. Rakta - pomegranate, Amalaki. Mamsa - meat soup, Ashwagandha. Meda - ghee, oils. Asthi - sesame, dairy. Majja - bone marrow. Shukra - milk, ghee, Shatavari.',
        clinicalRelevance: 'Dhatu-specific treatment is more efficient than general Bṛmhana.'
      }
    ],
    doshaDiscussion: [
      'Vata kshaya - dryness, emaciation, insomnia, pain, constipation, anxiety',
      'Pitta kshaya - poor digestion, weakness, pallor, low-grade fever, excessive sweating',
      'Kapha kshaya - loss of weight, reduced immunity, dryness of chest, emotional instability',
      'Sannipataja Kshatakshina - all three dosha vitiated, most difficult to treat, poor prognosis',
      'Vata Pradhana - most common, requires Snigdha and Ushna Bṛmhana approach',
      'Agni status determines treatment capacity - Mandagni requires Deepana before Bṛmhana',
      'Ojas depletion is the final common pathway - affects immunity and mental health'
    ],
    treatmentProtocols: [
      {
        condition: 'Kshatakshina (General Emaciation)',
        treatment: 'Bṛmhana + Snehana + Rasayana with Ashwagandha Ghrita',
        herbs: ['Ashwagandha', 'Bala', 'Shatavari', 'Guduchi', 'Amalaki', 'Pippali'],
        dosage: 'Ashwagandha Ghrita 15-20 grams daily with warm milk',
        duration: '3-6 months with monthly assessment',
        precautions: ['Avoid exertion during initial phase', 'Warm nutritious diet', 'Adequate rest', 'Monitor weight weekly']
      },
      {
        condition: 'Post-Illness Wasting',
        treatment: 'Gentle Bṛmhana + Deepana + Rasayana',
        herbs: ['Ashwagandha', 'Bala', 'Shatavari', 'Pippali', 'Guduchi'],
        dosage: 'Ashwagandha Churna 3 grams with warm milk twice daily',
        duration: '2-4 months with biweekly assessment',
        precautions: ['Start slowly', 'Monitor digestion', 'Increase food gradually', 'Treat underlying disease']
      },
      {
        condition: 'Shoka Kshata (Grief-Induced Wasting)',
        treatment: 'Sattvavajaya + Bṛmhana + Rasayana',
        herbs: ['Ashwagandha', 'Brahmi', 'Shankhapushpi', 'Shatavari', 'Jatamansi'],
        dosage: 'Ashwagandha Churna 3g + Brahmi Churna 1g with warm milk twice daily',
        duration: '3-6 months with psychological support',
        precautions: ['Address grief through counseling', 'Meditation and yoga', 'Supportive social environment']
      },
      {
        condition: 'Trauma-Induced Wasting',
        treatment: 'Bṛmhana + Ropana (wound healing)',
        herbs: ['Ashwagandha', 'Bala', 'Guduchi', 'Shatavari', 'Yashtimadhu', 'Haridra'],
        dosage: 'Bala Taila externally, Ashwagandha Ghrita 15g daily with milk',
        duration: '3-6 months depending on severity',
        precautions: ['Wound care', 'High protein diet', 'Avoid infection']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kshatakshina',
        sanskrit: 'क्षतक्षीण',
        etiology: 'Dhatu kshaya from chronic illness, trauma, irregular eating, overexertion, grief, urge suppression, or incompatible food',
        symptoms: ['Progressive emaciation', 'Chronic fatigue', 'Weakness', 'Anorexia', 'Insomnia', 'Dry skin', 'Hair loss', 'Low immunity', 'Breathlessness', 'Muscle wasting'],
        prognosis: 'Sadhya (curable) in early stages. Kricchra Sadhya in chronic cases with Oja Kshaya.',
        treatment: 'Bṛmhana with medicated ghee, milk, meat soup. Rasayana herbs. Snehana. Madhura, Guru, Snigdha diet.'
      },
      {
        name: 'Rajayakshma Kshaya',
        sanskrit: 'राजयक्ष्मा क्षय',
        etiology: 'Chronic infection causing progressive tissue depletion, Oja Kshaya, and Agnimandya',
        symptoms: ['Severe emaciation', 'Chronic cough', 'Low-grade fever', 'Night sweats', 'Hemoptysis', 'Chest pain'],
        prognosis: 'Kricchra Sadhya (difficult to cure) requiring prolonged treatment.',
        treatment: 'Combined Bṛmhana and Shamana. Ashwagandha Ghrita + Chyavanprasha. Light nutritious diet. Rest.'
      },
      {
        name: 'Shoshaja Kshaya',
        sanskrit: 'शोषज क्षय',
        etiology: 'Chronic dehydration causing Rasa dhatu depletion and subsequent tissue wasting',
        symptoms: ['Dry skin and mucous membranes', 'Excessive thirst', 'Dark urine', 'Fatigue', 'Dizziness'],
        prognosis: 'Sadhya (curable) with adequate hydration and Bṛmhana therapy.',
        treatment: 'Rehydration with medicated liquids. Milk-based diet. Shatavari Ghrita for Rasa dhatu nourishment.'
      }
    ],
    importantVerses: [
      '11.1.3 - Kshatakshina is the depletion of all dhatus from Rasa through Shukra',
      '11.1.5 - Seven causative factors: illness, injury, irregular eating, overexertion, grief, urge suppression, incompatible food',
      '11.2.5 - Bṛmhana is the treatment, not Shodhana which further depletes tissues',
      '11.3.2 - Milk, ghee, meat, meat soup, and Shali rice are primary nourishing foods',
      '11.4.1 - Ashwagandha, Bala, Shatavari, Guduchi, Amalaki are Rasayana herbs for rebuilding',
      '11.5.3 - Abandoning grief, one should eat without malice - mental health is integral to recovery'
    ],
    clinicalApplications: [
      'Chronic wasting diseases - Bṛmhana protocol with dhatu-specific treatment',
      'Post-illness recovery - Rasayana therapy for tissue regeneration',
      'Malnutrition - nutritional rehabilitation with gradual dietary increase',
      'Cancer-related wasting (Cachexia) - supportive Bṛmhana treatment',
      'Post-surgical recovery - tissue rebuilding with Ashwagandha Ghrita',
      'Chronic fatigue syndrome - dhatu-building approach',
      'Geriatric debility - gentle Bṛmhana with digestible nutritious foods',
      'HIV/AIDS-related wasting - supportive treatment for weight and immunity',
      'Anorexia nervosa - combined nutritional and psychological approach',
      'Elderly care - Rasayana for maintaining tissue strength'
    ]
  },
  {
    id: 'chikitsa-12',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 12,
    name: 'Shvayathu Chikitsa',
    sanskrit: 'श्वयथु चिकित्सा',
    english: 'Management of Edema and Swelling Conditions',
    summary: 'Shvayathu Chikitsa provides comprehensive management of edema and swelling conditions. The chapter describes eight types of Shvayathu based on dosha involvement (Vataja, Pittaja, Kaphaja, Raktaja, Sannipataja) and causative factors (Agantuja/traumatic). Treatment approach is highly individualized: Langhana (fasting) for Kaphaja, Pitta Shamana for Pittaja, Vata Shamana for Vataja, and combined approaches for Sannipataja. Punarnava (Boerhavia diffusa) emerges as the key herb for edema management across all types. External treatments including Lepa (paste), Parisheka (irrigation), and Upanaha (poultice) provide local relief while internal treatment addresses root cause.',
    keyConcepts: [
      'Eight types of Shvayathu: Vataja, Pittaja, Kaphaja, Raktaja, Sannipataja, Agantuja, Shotha (generalized), Shopha (localized)',
      'Vataja - painful, mobile, changes position, dry skin - requires Vata Shamana and Snehana',
      'Pittaja - hot, red, inflamed, burning - requires Pitta Shamana and Raktamokshana',
      'Kaphaja - cold, firm, slow-growing, itchy - requires Langhana and Kapha Shamana',
      'Raktaja - reddish, associated with Rakta vitiation - requires Rakta Shodhana',
      'Sannipataja - mixed features, most difficult to treat - requires combined approach',
      'Agantuja - traumatic origin - requires Shodhana and Ropana (wound healing)',
      'Punarnava (Boerhavia diffusa) is the best single herb for all types of edema - Mutral (diuretic) and Shothahara (anti-edema)',
      'Treatment principle: Langhana (lightening) is the primary approach for Kaphaja edema',
      'Diet should be light, low salt, and easy to digest - heavy foods worsen edema',
      'External treatments provide symptomatic relief while internal treatment addresses root cause',
      'Edema may indicate serious underlying conditions - cardiac, renal, or hepatic dysfunction'
    ],
    shlokas: [
      {
        number: '12.1.1',
        sanskrit: 'श्वयथुचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Shvayathu (edema).',
        commentary: 'Opening verse introducing edema management.'
      },
      {
        number: '12.1.3',
        sanskrit: 'श्वयथुः अष्टधा प्रोक्तः दोषैः सम्भिन्नमेव च | वातजः पित्तजः श्लेष्मजः सन्निपातजो रक्तजः ||',
        translation: 'Shvayathu is of eight types: Vataja, Pittaja, Kaphaja, Sannipataja, Raktaja, and others.',
        commentary: 'Classifies edema into eight types based on dosha involvement.'
      },
      {
        number: '12.1.5',
        sanskrit: 'वातजः शूलवान् चलः शुष्कः | पित्तजः दाहरागोष्णः | कफजः स्निग्धः स्थिरः कण्डूमान् ||',
        translation: 'Vataja: painful, mobile, dry. Pittaja: burning, red, hot. Kaphaja: unctuous, firm, itchy.',
        commentary: 'Core diagnostic features distinguishing the three primary types of edema.'
      },
      {
        number: '12.2.1',
        sanskrit: 'लङ्घनं शोफहरं प्रधानम् कफजे | पित्तजे शमनं रक्तमोक्षणं च ||',
        translation: 'Langhana is the principal treatment for Kaphaja edema. Pittaja edema requires Shamana and Raktamokshana.',
        commentary: 'Establishes type-specific treatment principles for edema.'
      },
      {
        number: '12.2.5',
        sanskrit: 'पुनर्नवा शोफहरी श्रेष्ठा मूत्रविरेचनी |',
        translation: 'Punarnava is the best anti-edema herb - diuretic and edema-reducing.',
        commentary: 'Establishes Punarnava as the primary herb for edema management.'
      },
      {
        number: '12.3.1',
        sanskrit: 'लेपः परिषेको अभ्यङ्ग उपनाहश्च बाह्यम् |',
        translation: 'External treatments include Lepa (paste), Parisheka (irrigation), Abhyanga (massage), and Upanaha (poultice).',
        commentary: 'Lists the four external treatment modalities for edema.'
      },
      {
        number: '12.4.3',
        sanskrit: 'लवणं गुरु अशक्नुवन् श्वयथुम् वर्धयेत् |',
        translation: 'Salt and heavy foods worsen edema.',
        commentary: 'Dietary restriction essential for edema management.'
      }
    ],
    topics: [
      {
        title: 'Eight Types of Shvayathu with Diagnostic Features',
        content: 'Vataja: painful (Shula Yukta), mobile (Chala), dry (Ruksha), changes position. Pittaja: hot (Ushna), red (Rakta Varana), inflamed (Daha), burning sensation, associated with fever. Kaphaja: cold (Sheeta), firm (Sthira), slow-growing, itchy (Kandu), unctuous (Snigdha). Raktaja: reddish, associated with Rakta vitiation, resembles Pittaja. Sannipataja: mixed features of all three dosha, most difficult to treat. Agantuja: traumatic origin, sudden onset, localized. Shotha: generalized edema affecting multiple areas. Shopha: localized swelling at specific site.',
        clinicalRelevance: 'Accurate type determination is essential - wrong treatment approach worsens the condition.'
      },
      {
        title: 'External Treatment Modalities',
        content: 'Lepa (paste): herbal paste applied locally - Haridra, Nimba, Chandana for Pittaja; Eranda, Dashamula for Vataja. Parisheka (irrigation): pouring medicated liquid over affected area - warm for Vataja, cold for Pittaja. Abhyanga: massage with medicated oils - warm sesame for Vataja, coconut for Pittaja. Upanaha (poultice): warm herbal poultice for Vataja and Kaphaja. Application direction: always toward heart to support venous return.',
        clinicalRelevance: 'External treatment provides immediate symptomatic relief while internal treatment works on root cause.'
      },
      {
        title: 'Punarnava - The Premier Anti-Edema Herb',
        content: 'Punarnava (Boerhavia diffusa): properties - Tikta (bitter), Kashaya (astringent), Ushna (hot), Laghu (light). Actions: Mutral (diuretic), Shothahara (anti-edema), Deepana (appetizer), Hridya (cardiotonic). Indicated for all types of edema - Kaphaja (primary), Pittaja (with cooling herbs), Vataja (with Vata Shamana). Forms: Kashaya (decoction), Churna (powder), Guggulu preparation. Modern research validates its diuretic and anti-inflammatory properties.',
        clinicalRelevance: 'Punarnava can be used as standalone herb for mild edema or combined with other herbs for complex cases.'
      },
      {
        title: 'Dietary Management for Edema',
        content: 'Pathya (wholesome): Mudga (green gram), old Shali rice, barley (Yava), light soups, warm water, Punarnava Kashaya. Apathya (unwholesome): salt (Lavana), heavy foods (Guru Ahara), curd (Dadhi), black gram (Masha), excessive water intake, cold foods. Principle: diet should be Laghu (light), Ushna (warm), and Nir-Lavana (low salt). Fluid management: moderate intake, avoid both excess and deficiency.',
        clinicalRelevance: 'Dietary modification is as important as herbs - salt restriction alone can significantly reduce edema.'
      },
      {
        title: 'Edema as Indicator of Systemic Disease',
        content: 'Edema may indicate: cardiac dysfunction (Hridya Roga), renal disease (Mutra Roga), hepatic dysfunction (Yakrit Roga), malnutrition (Kshaya), venous insufficiency, lymphatic obstruction. Bilateral pedal edema suggests systemic cause (cardiac/renal). Unilateral edema suggests local cause (venous/lymphatic). Facial edema in morning suggests renal cause. Periorbital edema suggests allergic or renal cause.',
        clinicalRelevance: 'Edema is often a symptom, not a disease - always investigate underlying cause before treating locally.'
      }
    ],
    doshaDiscussion: [
      'Vataja Shvayathu - painful (Shula), mobile (Chala), dry (Ruksha), changes position, associated with Vata symptoms like constipation, flatulence',
      'Pittaja Shvayathu - hot (Ushna), red (Rakta), inflamed (Daha), burning sensation (Daha), associated with fever, thirst',
      'Kaphaja Shvayathu - cold (Sheeta), firm (Sthira), slow-growing, itchy (Kandu), unctuous (Snigdha), associated with heaviness',
      'Raktaja - resembles Pittaja but more reddish, associated with Rakta vitiation, skin discoloration',
      'Sannipataja - mixed features, most difficult to treat, poor prognosis, requires combined approach',
      'Agantuja - traumatic origin, sudden onset, localized, may involve Rakta and Mamsa dhatu',
      'Treatment principle: like increases like, opposite pacifies - use opposite qualities for treatment'
    ],
    treatmentProtocols: [
      {
        condition: 'Kaphaja Shvayathu',
        treatment: 'Langhana + Kapha Shamana + Punarnava',
        herbs: ['Punarnava (Boerhavia diffusa)', 'Gokshura (Tribulus terrestris)', 'Varuna (Crataeva nurvala)', 'Shunthi (Zingiber officinale)', 'Trikatu (Three pungents)', 'Musta (Cyperus rotundus)'],
        dosage: 'Punarnava Kashaya 40ml twice daily before meals, Punarnava Guggulu 500mg twice daily',
        duration: '2-4 weeks with weekly assessment',
        precautions: ['Light diet', 'Avoid salt completely', 'Avoid heavy foods', 'Regular light exercise', 'Monitor weight daily']
      },
      {
        condition: 'Pittaja Shvayathu',
        treatment: 'Pitta Shamana + Raktamokshana + cooling herbs',
        herbs: ['Guduchi (Tinospora cordifolia)', 'Amalaki (Emblica officinalis)', 'Chandana (Santalum album)', 'Haridra (Curcuma longa)', 'Sariva (Hemidesmus indicus)', 'Ushira (Vetiveria zizanioides)'],
        dosage: 'Guduchi Sattva 500mg with Chandana Kashaya 40ml twice daily',
        duration: '2-4 weeks with biweekly assessment',
        precautions: ['Cool environment', 'Avoid hot, spicy foods', 'Rest affected area', 'Cold applications locally', 'Raktamokshana if severe']
      },
      {
        condition: 'Vataja Shvayathu',
        treatment: 'Vata Shamana + Snehana + warm applications',
        herbs: ['Eranda (Ricinus communis)', 'Dashamula (Ten roots)', 'Rasna (Pluchea lanceolata)', 'Guggulu (Commiphora mukul)', 'Shunthi (Zingiber officinale)', 'Nirgundi (Vitex negundo)'],
        dosage: 'Eranda Taila 10ml with warm water at bedtime, Dashamula Kashaya 40ml twice daily',
        duration: '2-4 weeks with weekly assessment',
        precautions: ['Warm food', 'Oil massage (Abhyanga)', 'Avoid cold exposure', 'Warm fomentation', 'Vata-pacifying lifestyle']
      },
      {
        condition: 'Agantuja Shvayathu (Traumatic Edema)',
        treatment: 'Shodhana + Ropana + external treatment',
        herbs: ['Haridra (Curcuma longa)', 'Nimba (Azadirachta indica)', 'Yashtimadhu (Glycyrrhiza glabra)', 'Chandana (Santalum album)', 'Guggulu (Commiphora mukul)'],
        dosage: 'Haridra Lepa locally, Guggulu 500mg twice daily internally',
        duration: '1-3 weeks depending on injury severity',
        precautions: ['Rest affected area', 'Elevate limb', 'Cold applications initially', 'Warm applications after 48 hours', 'Wound care if open injury']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kaphaja Shvayathu',
        sanskrit: 'कफज श्वयथु',
        etiology: 'Kapha vitiation causing fluid accumulation in tissues. Heavy, cold, oily foods, sedentary lifestyle, day sleep, and Kapha-aggravating factors.',
        symptoms: ['Cold, firm swelling', 'Slow progression', 'Itching (Kandu)', 'Heaviness (Guruta)', 'Skin appears white/pale', 'Non-pitting or mildly pitting edema'],
        prognosis: 'Sadhya (curable) with Langhana and Kapha Shamana. Responds well to Punarnava-based treatment.',
        treatment: 'Langhana (fasting), Kapha Shamana herbs, Punarnava Kashaya, light low-salt diet, regular exercise.'
      },
      {
        name: 'Pittaja Shvayathu',
        sanskrit: 'पित्तज श्वयथु',
        etiology: 'Pitta vitiation causing inflammatory swelling. Hot, spicy, sour foods, anger, sun exposure, infection, and Pitta-aggravating factors.',
        symptoms: ['Hot, red swelling', 'Burning sensation (Daha)', 'Fever (Jwara)', 'Pain (Shula)', 'Skin appears red/inflamed', 'Rapid progression'],
        prognosis: 'Sadhya (curable) with Pitta Shamana and Raktamokshana. Responds well to cooling herbs.',
        treatment: 'Pitta Shamana, Raktamokshana if severe, cooling herbs (Chandana, Ushira), cold applications, Pitta-pacifying diet.'
      },
      {
        name: 'Vataja Shvayathu',
        sanskrit: 'वातज श्वयथु',
        etiology: 'Vata vitiation causing dry, mobile swelling. Dry, cold, light foods, excessive travel, fasting, cold exposure, and Vata-aggravating factors.',
        symptoms: ['Painful swelling (Shula)', 'Mobile (Chala)', 'Dry skin (Ruksha)', 'Changes position', 'Associated with constipation, flatulence', 'Worse with cold, better with warmth'],
        prognosis: 'Sadhya (curable) with Vata Shamana and Snehana. May require longer treatment.',
        treatment: 'Vata Shamana, Snehana (oleation), warm applications, Eranda Taila, Dashamula, warm Vata-pacifying diet.'
      }
    ],
    importantVerses: [
      '12.1.3 - Eight types of Shvayathu based on dosha involvement',
      '12.1.5 - Vataja: painful, mobile, dry. Pittaja: burning, red, hot. Kaphaja: unctuous, firm, itchy',
      '12.2.1 - Langhana for Kaphaja, Shamana and Raktamokshana for Pittaja',
      '12.2.5 - Punarnava is the best anti-edema herb - diuretic and edema-reducing',
      '12.3.1 - External treatments: Lepa, Parisheka, Abhyanga, Upanaha',
      '12.4.3 - Salt and heavy foods worsen edema'
    ],
    clinicalApplications: [
      'Edema - comprehensive Shvayathu management with type-specific treatment',
      'Swollen joints - localized Shotha treatment with external applications',
      'Cardiac edema - Punarnava-based protocol with Hridya herbs',
      'Renal edema - Gokshura and Punarnava-based diuretic treatment',
      'Traumatic swelling - external treatment with Haridra Lepa and anti-inflammatory herbs',
      'Inflammatory swelling - Pittaja Shvayathu protocol with cooling herbs',
      'Lymphedema - Kaphaja Shvayathu treatment with Langhana and Kapha Shamana',
      'Post-surgical edema - gentle Shothahara treatment with external applications',
      'Pregnancy-related edema - safe herbs like Punarnava and Gokshura',
      'Pedal edema in elderly - gentle Kaphaja Shvayathu approach with Punarnava'
    ]
  },
  {
    id: 'chikitsa-13',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 13,
    name: 'Udara Chikitsa',
    sanskrit: 'उदर चिकित्सा',
    english: 'Management of Abdominal Diseases and Ascites',
    summary: 'Udara Chikitsa provides comprehensive management of abdominal diseases including ascites (Jalodara). The chapter describes eight types of Udara: Vataja, Pittaja, Kaphaja, Sannipataja, Plihodara (splenic), Yakritodara (hepatic), Jalodara (ascites), and Chhidrodara (perforated). Jalodara is the most clinically significant as it represents the terminal stage of all Udara types. Treatment is staged: Langhana for Ama, Shamana for dosha pacification, and Paracentesis (Siravyadha) for severe fluid accumulation. Punarnava is the primary herb for fluid management.',
    keyConcepts: [
      'Eight types of Udara: Vataja, Pittaja, Kaphaja, Sannipataja, Plihodara, Yakritodara, Jalodara, Chhidrodara',
      'Jalodara (ascites) is the terminal stage of all Udara types - represents advanced disease',
      'Treatment follows staged approach: Langhana (if Ama) → Shamana (dosha pacification) → Paracentesis (if severe)',
      'Punarnava is the primary herb for ascites - Mutral (diuretic) and Shothahara (anti-edema)',
      'Diet should be Laghu (light), Nir-Lavana (low salt), and Agni Deepana (digestive stimulant)',
      'Avoid heavy foods, excessive fluid intake, salt, curd, and Kapha-aggravating foods',
      'Udara may indicate serious hepatic, cardiac, or renal dysfunction - investigate underlying cause',
      'Plihodara (splenic) and Yakritodara (hepatic) require organ-specific treatment',
      'Chhidrodara (perforated) is Asadhya (incurable) - requires surgical intervention',
      'Basti (enema) is important for Vataja Udara - Vatanulomana approach',
      'Agni assessment is critical - most Udara patients have Mandagni (weak digestion)',
      'Fluid management requires careful balance - neither excess nor restriction'
    ],
    shlokas: [
      {
        number: '13.1.1',
        sanskrit: 'उदरचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Udara (abdominal diseases).',
        commentary: 'Opening verse introducing abdominal disease management.'
      },
      {
        number: '13.1.3',
        sanskrit: 'उदरं अष्टधा प्रोक्तं वातपित्तकफसन्निपातजं प्लीहयकृज्जलोदरं छिद्रोदरं च ||',
        translation: 'Udara is of eight types: Vataja, Pittaja, Kaphaja, Sannipataja, Pliha (splenic), Yakrit (hepatic), Jalodara (ascites), and Chhidrodara (perforated).',
        commentary: 'Comprehensive classification of abdominal diseases into eight categories.'
      },
      {
        number: '13.2.1',
        sanskrit: 'जलोदरं सर्वेषां उदराणाम् अन्तिमम् अवस्था |',
        translation: 'Jalodara (ascites) is the final stage of all Udara types.',
        commentary: 'Establishes ascites as the terminal stage indicating advanced disease.'
      },
      {
        number: '13.2.5',
        sanskrit: 'यकृतं प्लीहानं च वृद्धिं गच्छतः जलं प्रसहते |',
        translation: 'When liver and spleen enlarge, they obstruct fluid flow causing ascites.',
        commentary: 'Explains the mechanism of ascites formation from hepatosplenomegaly.'
      },
      {
        number: '13.3.1',
        sanskrit: 'पुनर्नवा गोक्षुरकं दशमूलं शुण्ठी पिप्पली उदरहरम् |',
        translation: 'Punarnava, Gokshura, Dashamula, Shunthi, and Pippali are the primary Udara-hara (anti-ascites) herbs.',
        commentary: 'Lists the core herbs for ascites management.'
      },
      {
        number: '13.4.1',
        sanskrit: 'लघ्वन्नं निर्लवणं उदरिणां हितम् | गुरु लवणमद्यं च वर्जयेत् ||',
        translation: 'Light, salt-free food is beneficial for Udara patients. Heavy food, salt, and alcohol should be avoided.',
        commentary: 'Core dietary principles for ascites management.'
      }
    ],
    topics: [
      {
        title: 'Eight Types of Udara with Diagnostic Features',
        content: 'Vataja: distension (Adhmana), pain (Shula), constipation (Vibandha), flatulence (Anaha). Pittaja: burning (Daha), fever (Jwara), thirst (Trishna), yellowish discoloration (Haridra Netra). Kaphaja: heaviness (Guruta), anorexia (Aruchi), mucus, slow progression. Sannipataja: mixed features, poor prognosis. Plihodara: splenic enlargement with left-sided distension. Yakritodara: hepatic enlargement with right-sided distension. Jalodara: fluid thrill, shifting dullness, progressive distension. Chhidrodara: perforation, Asadhya (incurable).',
        clinicalRelevance: 'Accurate type determination guides treatment selection and prognosis assessment.'
      },
      {
        title: 'Jalodara (Ascites) Management Protocol',
        content: 'Stage 1: Langhana with light diet if Ama present - assess tongue coating, appetite. Stage 2: Deepana-Pachana with Hingvastak, Trikatu. Stage 3: Shamana with Punarnava Kashaya, Gokshura, Dashamula. Stage 4: Basti (enema) for Vataja component - Dashamula Taila. Stage 5: Siravyadha (paracentesis) for severe fluid accumulation - only after Shamana. Post-paracentesis: Rasayana therapy to prevent recurrence.',
        clinicalRelevance: 'Staged approach prevents complications - premature paracentesis without addressing cause leads to rapid reaccumulation.'
      },
      {
        title: 'Punarnava - Primary Anti-Ascites Herb',
        content: 'Punarnava (Boerhavia diffusa): properties - Tikta (bitter), Kashaya (astringent), Ushna (hot), Laghu (light). Actions: Mutral (diuretic), Shothahara (anti-edema), Deepana (appetizer), Hridya (cardiotonic), Yakrit Pliha Hara (hepatosplenotonic). Forms: Kashaya (decoction) 40ml twice daily, Churna (powder) 3g with warm water, Guggulu preparation. Synergistic with Gokshura for enhanced diuretic effect.',
        clinicalRelevance: 'Punarnava is the single most important herb for ascites - can be used as base for all formulations.'
      },
      {
        title: 'Dietary Management for Udara',
        content: 'Pathya: Mudga (green gram), old Shali rice, barley (Yava), light soups, warm water, Punarnava Kashaya, old jaggery. Apathya: salt (Lavana), heavy foods (Guru), curd (Dadhi), black gram (Masha), excessive water, cold foods, alcohol, sugarcane. Principles: Laghu (light), Ushna (warm), Nir-Lavana (low salt), Agni Deepana (digestive). Fluid management: moderate intake, avoid both excess and restriction.',
        clinicalRelevance: 'Dietary modification is essential - salt restriction alone can significantly reduce fluid accumulation.'
      },
      {
        title: 'Underlying Causes and Investigation',
        content: 'Udara may indicate: hepatic dysfunction (Yakrit Roga - cirrhosis, hepatitis), cardiac dysfunction (Hridya Roga - right heart failure), renal disease (Mutra Roga - nephrotic syndrome), malnutrition (Kshaya - hypoalbuminemia), peritoneal disease (infection, malignancy). Investigation: liver function tests, kidney function tests, cardiac assessment, abdominal ultrasound, diagnostic paracentesis.',
        clinicalRelevance: 'Treating Udara without investigating underlying cause leads to incomplete treatment and recurrence.'
      }
    ],
    doshaDiscussion: [
      'Vataja Udara - distension (Adhmana), pain (Shula), constipation (Vibandha), flatulence (Anaha), dry skin, Vata symptoms',
      'Pittaja Udara - burning (Daha), fever (Jwara), thirst (Trishna), yellowish discoloration, Pitta symptoms',
      'Kaphaja Udara - heaviness (Guruta), anorexia (Aruchi), mucus, slow progression, Kapha symptoms',
      'Sannipataja - mixed features, most difficult to treat, poor prognosis',
      'Agni status is critical - Mandagni (weak digestion) is present in most Udara patients',
      'Ama (improperly digested food) is a key pathogenic factor - must be addressed before Bṛmhana',
      'Vata involvement is primary in most Udara types - Vatanulomana is essential'
    ],
    treatmentProtocols: [
      {
        condition: 'Jalodara (Ascites)',
        treatment: 'Langhana + Shamana + Punarnava + Paracentesis if needed',
        herbs: ['Punarnava (Boerhavia diffusa)', 'Gokshura (Tribulus terrestris)', 'Dashamula (Ten roots)', 'Shunthi (Zingiber officinale)', 'Pippali (Piper longum)', 'Hing (Ferula asafoetida)'],
        dosage: 'Punarnava Kashaya 40ml twice daily before meals, Punarnava Guggulu 500mg twice daily',
        duration: '4-8 weeks with weekly assessment of abdominal girth',
        precautions: ['Fluid restriction to 1-1.5 liters daily', 'Complete salt avoidance', 'Light digestible food', 'Monitor abdominal girth daily', 'Paracentesis only after Shamana failure']
      },
      {
        condition: 'Vataja Udara',
        treatment: 'Vata Shamana + Deepana + Vatanulomana',
        herbs: ['Hing (Ferula asafoetida)', 'Ajmoda (Trachyspermum ammi)', 'Shunthi (Zingiber officinale)', 'Dashamula (Ten roots)', 'Eranda (Ricinus communis)', 'Saindhava (Rock salt)'],
        dosage: 'Hingvastak Churna 3 grams with warm water before meals, Eranda Taila 10ml at bedtime',
        duration: '4-8 weeks with biweekly assessment',
        precautions: ['Warm food only', 'Avoid cold exposure', 'Regular meals', 'Basti (enema) if severe Vata']
      },
      {
        condition: 'Yakritodara (Hepatic Ascites)',
        treatment: 'Yakrit Roga Shamana + Punarnava + hepatoprotective herbs',
        herbs: ['Punarnava', 'Kalmegh (Andrographis paniculata)', 'Bhumyamalaki (Phyllanthus niruri)', 'Kutki (Picrorhiza kurroa)', 'Guduchi (Tinospora cordifolia)', 'Sharpunkha (Tephrosia purpurea)'],
        dosage: 'Punarnava Kashaya 40ml + Kalmegha Kashaya 40ml twice daily',
        duration: '8-12 weeks with monthly liver function assessment',
        precautions: ['Complete alcohol avoidance', 'Low salt diet', 'Hepatoprotective diet', 'Avoid hepatotoxic drugs']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Jalodara (Ascites)',
        sanskrit: 'जलोदर',
        etiology: 'Fluid accumulation in peritoneal cavity due to liver dysfunction (cirrhosis), heart failure (right-sided), kidney disease (nephrotic syndrome), or malnutrition (hypoalbuminemia)',
        symptoms: ['Progressive abdominal distension', 'Fluid thrill', 'Shifting dullness', 'Dyspnea', 'Pedal edema', 'Weight gain', 'Umbilicus eversion', 'Anorexia'],
        prognosis: 'Sadhya (curable) in early stages with proper treatment. Kricchra (difficult) in chronic cases. Asadhya when associated with malignancy.',
        treatment: 'Staged approach: Langhana → Deepana-Pachana → Shamana with Punarnava → Paracentesis if needed → Rasayana for prevention.'
      },
      {
        name: 'Vataja Udara',
        sanskrit: 'वातज उदर',
        etiology: 'Vata vitiation in abdomen causing distension, pain, and constipation. Dry, cold, light foods, excessive travel, fasting, cold exposure.',
        symptoms: ['Abdominal distension with pain', 'Constipation', 'Flatulence', 'Dry skin', 'Colic pain', 'Worse with cold'],
        prognosis: 'Sadhya (curable) with Vata Shamana and Vatanulomana. Responds well to Basti therapy.',
        treatment: 'Vata Shamana with Hingvastak, Dashamula. Basti with Dashamula Taila. Warm, unctuous diet.'
      },
      {
        name: 'Plihodara (Splenic Ascites)',
        sanskrit: 'प्लीहोदर',
        etiology: 'Spleen enlargement (Pliha Vriddhi) causing abdominal distension. Associated with chronic infections, liver disease, or hematological disorders.',
        symptoms: ['Left-sided abdominal distension', 'Pain in left hypochondrium', 'Early satiety', 'Fatigue', 'Anemia'],
        prognosis: 'Sadhya (curable) in early stages. Kricchra in chronic splenomegaly.',
        treatment: 'Punarnava + Pliha-hara herbs (Kalmegha, Sharpunkha). Low salt diet. Treat underlying cause.'
      }
    ],
    importantVerses: [
      '13.1.3 - Eight types of Udara: Vataja, Pittaja, Kaphaja, Sannipataja, Pliha, Yakrit, Jalodara, Chhidrodara',
      '13.2.1 - Jalodara (ascites) is the final stage of all Udara types',
      '13.2.5 - Liver and spleen enlargement obstructs fluid flow causing ascites',
      '13.3.1 - Punarnava, Gokshura, Dashamula, Shunthi, Pippali are primary anti-ascites herbs',
      '13.4.1 - Light, salt-free food is beneficial; heavy food, salt, and alcohol should be avoided'
    ],
    clinicalApplications: [
      'Ascites - Jalodara protocol with Punarnava and staged treatment approach',
      'Hepatomegaly - Yakrit Udara treatment with hepatoprotective herbs',
      'Splenomegaly - Pliha Udara management with Pliha-hara herbs',
      'Abdominal distension - comprehensive Udara approach based on type',
      'Cardiac edema with ascites - Punarnava with Hridya (cardiotonic) herbs',
      'Renal ascites - Gokshura-based diuretic treatment',
      'Malnutrition-related ascites - Bṛmhana approach with Punarnava',
      'Chronic liver disease - Yakrit Roga Shamana with Kalmegha, Bhumyamalaki'
    ]
  },
  {
    id: 'chikitsa-14',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 14,
    name: 'Arsha Chikitsa',
    sanskrit: 'अर्श चिकित्सा',
    english: 'Management of Hemorrhoids (Piles)',
    summary: 'Arsha Chikitsa provides comprehensive management of hemorrhoids (piles). The chapter describes four types based on dosha involvement: Vataja (dry, hard, painful), Pittaja (red, inflamed, bleeding), Kaphaja (large, soft, mucus-covered), and Sannipataja (mixed features). Treatment follows a hierarchical approach: Shamana (conservative) for mild cases, Kshara (alkaline cauterization) for moderate cases, Agni (thermal cauterization) for severe cases, and Shastra (surgical excision) for complicated cases. Haritaki (Terminalia chebula) is established as the best single herb for hemorrhoid management.',
    keyConcepts: [
      'Four types: Vataja (dry, hard, painful, dark), Pittaja (red, inflamed, bleeding, burning), Kaphaja (large, soft, mucus, itchy), Sannipataja (mixed)',
      'Treatment hierarchy: Shamana (conservative) → Kshara (alkaline) → Agni (thermal) → Shastra (surgical)',
      'Haritaki (Terminalia chebula) is the best single herb for hemorrhoids - Tridoshahara, Deepana, Rechana',
      'Diet should be high fiber (Vata-anulomana), easy to digest, and rich in fluids',
      'Avoid straining during defecation - use stool softeners and adequate hydration',
      'Kshara Karma (alkaline cauterization) is the gold standard Ayurvedic procedure for hemorrhoids',
      'Bleeding hemorrhoids (Raktaja Arsha) require Stambhana (hemostatic) approach',
      'Prevention: regular bowel habits, high fiber diet, adequate hydration, avoid prolonged sitting',
      'Arsha is often associated with Grahani (IBS) and Agnimandya (weak digestion)',
      'Virechana (purgation) with Trivrit is important for Pittaja Arsha',
      'Sitz bath (Avagaha Sweda) with Triphala Kashaya provides local relief',
      'Lifestyle modification: avoid prolonged sitting, heavy lifting, and straining'
    ],
    shlokas: [
      {
        number: '14.1.1',
        sanskrit: 'अर्शसां चिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Arsha (hemorrhoids).',
        commentary: 'Opening verse introducing hemorrhoid management.'
      },
      {
        number: '14.1.3',
        sanskrit: 'अर्शांसि चतुर्विधानि वातजं पित्तजं कफजं सन्निपातजं च ||',
        translation: 'Hemorrhoids are of four types: Vataja, Pittaja, Kaphaja, and Sannipataja.',
        commentary: 'Classifies hemorrhoids into four types based on dosha involvement.'
      },
      {
        number: '14.1.5',
        sanskrit: 'वातजं शुष्कं कठिनं शूलवत् कृष्णवर्णम् | पित्तजं रक्तं सदाहं स्रावि || कफजं गुरु स्निग्धं कण्डूमत् ||',
        translation: 'Vataja: dry, hard, painful, dark. Pittaja: red, burning, bleeding. Kaphaja: heavy, unctuous, itchy.',
        commentary: 'Core diagnostic features distinguishing the three primary types.'
      },
      {
        number: '14.2.1',
        sanskrit: 'चतुर्विधं चिकित्सितं शमनं क्षारमग्निः शस्त्रं च ||',
        translation: 'Four treatment approaches: Shamana (conservative), Kshara (alkaline), Agni (thermal), Shastra (surgical).',
        commentary: 'Establishes the four-tier treatment hierarchy.'
      },
      {
        number: '14.2.5',
        sanskrit: 'हरीतकी अर्शसां श्रेष्ठा सर्वदोषहरा दीपनी रेचनी च ||',
        translation: 'Haritaki is the best herb for hemorrhoids - pacifies all dosha, appetizer, and mild purgative.',
        commentary: 'Establishes Haritaki as the primary herb for hemorrhoid treatment.'
      },
      {
        number: '14.3.1',
        sanskrit: 'क्षारः अर्शसां मध्यमे अवस्थायाम् |',
        translation: 'Kshara (alkaline cauterization) is for moderate-stage hemorrhoids.',
        commentary: 'Establishes Kshara Karma as the gold standard for moderate hemorrhoids.'
      },
      {
        number: '14.4.1',
        sanskrit: 'रक्तार्शसि स्तम्भनं प्रधानम् |',
        translation: 'Stambhana (hemostasis) is the primary approach for bleeding hemorrhoids.',
        commentary: 'Establishes hemostatic approach for bleeding piles.'
      }
    ],
    topics: [
      {
        title: 'Four Types of Arsha with Diagnostic Features',
        content: 'Vataja: dry (Ruksha), hard (Kathina), painful (Shula Yukta), dark-colored (Krishna Varana), associated with constipation. Pittaja: red (Rakta), inflamed, bleeding (Raktasravi), burning (Daha), associated with Pitta symptoms. Kaphaja: large (Guru), soft (Mrudu), mucus-covered (Pichchila), itchy (Kandu), slow-growing. Sannipataja: mixed features of all three dosha, most difficult to treat, poor prognosis.',
        clinicalRelevance: 'Accurate type determination guides treatment selection - wrong treatment worsens condition.'
      },
      {
        title: 'Kshara Karma (Alkaline Cauterization)',
        content: 'Kshara Karma is the gold standard Ayurvedic procedure for moderate hemorrhoids. Preparation: Kshara (alkaline paste) from herbs like Apamarga, Palasha, Snuhi. Procedure: local anesthesia, application of Kshara on hemorrhoid mass, controlled cauterization, neutralization with lemon juice. Advantages: outpatient, minimal bleeding, effective for internal hemorrhoids. Post-procedure: sitz bath, stool softeners, wound care for 2-3 weeks.',
        clinicalRelevance: 'Kshara Karma is highly effective for Grade II-III hemorrhoids with minimal complications.'
      },
      {
        title: 'Dietary Management for Arsha',
        content: 'Pathya: high fiber foods (whole grains, vegetables, fruits), adequate fluids (2-3 liters daily), warm food, Triphala at bedtime, ghee for lubrication. Apathya: spicy food, alcohol, excessive meat, dry food, bread/bakery products, low-fiber diet, excessive tea/coffee. Principles: Vata-anulomana (bowel regularity), stool softening, avoiding straining.',
        clinicalRelevance: 'Dietary modification is the foundation of hemorrhoid management - prevents recurrence after treatment.'
      },
      {
        title: 'Shamana (Conservative) Treatment',
        content: 'For mild hemorrhoids: Haritaki Churna 3g with warm water at bedtime (stool softener). Triphala Kashaya for sitz bath. Nagakeshara for bleeding. Kutaja for diarrhea-associated hemorrhoids. Guggulu preparations for anti-inflammatory effect. Dietary modification with high fiber. Adequate hydration. Regular exercise. Avoid prolonged sitting.',
        clinicalRelevance: 'Shamana is effective for Grade I-II hemorrhoids and as post-procedure maintenance.'
      },
      {
        title: 'Prevention and Lifestyle Modification',
        content: 'Prevention strategies: regular bowel habits (fixed time daily), high fiber diet, adequate hydration (2-3 liters), regular exercise, avoid prolonged sitting/standing, avoid straining during defecation, respond to urge promptly, manage constipation early. Lifestyle: use Indian-style toilet if possible, avoid heavy lifting, sitz bath after defecation if prone to hemorrhoids.',
        clinicalRelevance: 'Prevention is always better than cure - lifestyle modification prevents recurrence after treatment.'
      }
    ],
    doshaDiscussion: [
      'Vataja Arsha - dry (Ruksha), hard (Kathina), painful (Shula), dark-colored (Krishna), associated with constipation and Vata symptoms',
      'Pittaja Arsha - red (Rakta), inflamed, bleeding (Raktasravi), burning (Daha), associated with Pitta symptoms',
      'Kaphaja Arsha - large (Guru), soft (Mrudu), mucus-covered (Pichchila), itchy (Kandu), slow-growing',
      'Sannipataja - mixed features, most difficult to treat, poor prognosis, requires combined approach',
      'Vata involvement causes pain and dryness, Pitta causes bleeding and inflammation, Kapha causes size and mucus',
      'Agni status affects hemorrhoid formation - Mandagni leads to constipation and straining'
    ],
    treatmentProtocols: [
      {
        condition: 'Kaphaja Arsha (Non-Bleeding)',
        treatment: 'Shamana + Kshara Karma if needed',
        herbs: ['Haritaki (Terminalia chebula)', 'Nagakeshara (Mesua ferrea)', 'Kutaja (Holarrhena antidysenterica)', 'Dhataki (Woodfordia fruticosa)', 'Triphala (Three fruits)', 'Guggulu (Commiphora mukul)'],
        dosage: 'Haritaki Churna 3 grams with warm water at bedtime, Triphala Kashaya for sitz bath',
        duration: '4-8 weeks with biweekly assessment',
        precautions: ['High fiber diet', 'Avoid straining', 'Sitz bath daily', 'Adequate hydration', 'Kshara Karma if conservative fails']
      },
      {
        condition: 'Raktaja Arsha (Bleeding Hemorrhoids)',
        treatment: 'Stambhana (hemostasis) + Shamana',
        herbs: ['Nagakeshara (Mesua ferrea)', 'Dhataki (Woodfordia fruticosa)', 'Lodhra (Symplocos racemosa)', 'Amalaki (Emblica officinalis)', 'Mocharasa (Salmalia malabarica)', 'Lajjalu (Mimosa pudica)'],
        dosage: 'Nagakeshara Churna 1 gram with honey twice daily, Dhataki Kashaya 40ml twice daily',
        duration: '2-4 weeks with weekly assessment',
        precautions: ['Avoid straining completely', 'Stool softener (Haritaki)', 'Sitz bath with cold water', 'Rest', 'Avoid spicy food and alcohol']
      },
      {
        condition: 'Vataja Arsha (Dry, Painful)',
        treatment: 'Vata Shamana + Snehana + stool softening',
        herbs: ['Haritaki', 'Eranda (Ricinus communis)', 'Guggulu', 'Shunthi (Zingiber officinale)', 'Saindhava (Rock salt)', 'Ghee'],
        dosage: 'Eranda Taila 10ml with warm water at bedtime, Haritaki Churna 3g with ghee',
        duration: '4-8 weeks',
        precautions: ['Warm food', 'Ghee in diet', 'Avoid dry food', 'Adequate hydration', 'Oil massage on abdomen']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Arsha',
        sanskrit: 'वातज अर्श',
        etiology: 'Vata vitiation causing dry, hard hemorrhoids. Dry, cold, light foods, constipation, prolonged sitting, straining.',
        symptoms: ['Dry, hard mass', 'Pain (Shula)', 'Dark discoloration', 'Constipation (Vibandha)', 'Flatulence', 'Worse with cold'],
        prognosis: 'Sadhya (curable) with Vata Shamana and stool softening.',
        treatment: 'Haritaki, Eranda Taila, ghee, warm food, stool softeners, adequate hydration.'
      },
      {
        name: 'Raktaja Arsha (Bleeding Hemorrhoids)',
        sanskrit: 'रक्तज अर्श',
        etiology: 'Pitta-Rakta vitiation causing bleeding hemorrhoids. Spicy food, alcohol, straining, hot climate.',
        symptoms: ['Bright red bleeding', 'Burning sensation', 'Inflammation', 'Pain', 'Worse with heat'],
        prognosis: 'Sadhya (curable) with Stambhana and Pitta Shamana.',
        treatment: 'Nagakeshara, Dhataki for hemostasis. Pitta-pacifying diet. Avoid straining. Sitz bath with cold water.'
      },
      {
        name: 'Kaphaja Arsha',
        sanskrit: 'कफज अर्श',
        etiology: 'Kapha vitiation causing large, soft, mucus-covered hemorrhoids. Heavy, oily, cold foods, sedentary lifestyle.',
        symptoms: ['Large, soft mass', 'Mucus discharge', 'Itching (Kandu)', 'Heaviness', 'Slow progression'],
        prognosis: 'Sadhya (curable) with Kapha Shamana and Kshara Karma.',
        treatment: 'Haritaki, Triphala, Kshara Karma for moderate cases. Light diet, exercise, avoid heavy foods.'
      }
    ],
    importantVerses: [
      '14.1.3 - Four types: Vataja, Pittaja, Kaphaja, Sannipataja',
      '14.1.5 - Vataja: dry, hard, painful, dark. Pittaja: red, burning, bleeding. Kaphaja: heavy, unctuous, itchy',
      '14.2.1 - Four treatment approaches: Shamana, Kshara, Agni, Shastra',
      '14.2.5 - Haritaki is the best herb for hemorrhoids - pacifies all dosha',
      '14.3.1 - Kshara for moderate-stage hemorrhoids',
      '14.4.1 - Stambhana is primary for bleeding hemorrhoids'
    ],
    clinicalApplications: [
      'Hemorrhoids - comprehensive Arsha management with type-specific treatment',
      'Bleeding piles - Raktaja Arsha treatment with Nagakeshara and Dhataki',
      'Post-surgical hemorrhoid care - Ropana (healing) therapy',
      'Chronic hemorrhoids - long-term dietary management with high fiber diet',
      'Internal hemorrhoids - Kshara Karma procedure',
      'External hemorrhoids - topical treatment with Triphala Lepa',
      'Hemorrhoids with constipation - Haritaki-based stool softening approach',
      'Hemorrhoids with diarrhea - Kutaja-based approach',
      'Pregnancy-related hemorrhoids - gentle Shamana with safe herbs',
      'Prevention in high-risk individuals - lifestyle modification protocol'
    ]
  },
  {
    id: 'chikitsa-16',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 16,
    name: 'Pandu Chikitsa',
    sanskrit: 'पाण्डु चिकित्सा',
    english: 'Management of Anemia and Blood Disorders',
    summary: 'Pandu Chikitsa provides comprehensive management of anemia and related blood disorders. Pandu is characterized by pallor (Pandutva), weakness (Daurbalya), and fatigue caused by vitiation of Pitta and Kapha affecting Rasa and Rakta dhatus. The chapter describes five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Raktaja (Plihaja - associated with splenic disorder). Treatment combines Pitta Shamana with Loha (iron) supplementation, using Loha Bhasma (iron ash) as the primary therapeutic agent. Amalaki (Emblica officinalis) serves as both Pitta Shamana and iron absorption enhancer.',
    keyConcepts: [
      'Five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Raktaja (Plihaja)',
      'Pandu involves vitiation of Pitta-Kapha affecting Rasa and Rakta dhatu primarily',
      'Treatment combines Pitta Shamana with Loha (iron) supplementation',
      'Loha Bhasma (iron ash) is the primary therapeutic agent - 125-250mg twice daily',
      'Amalaki is the best herb for anemia - Pitta Shamana + enhances iron absorption',
      'Diet should be rich in iron (Loha Yukta Ahara) and easy to digest',
      'Pandu can progress to Kamala (jauntice) if untreated - Rakta-Pitta vitiation',
      'Raktaja Pandu (Plihaja) is associated with splenic disorder - Pliha Vriddhi',
      'Grahani (IBS/malabsorption) often coexists - Agnimandya causes iron malabsorption',
      'Treatment sequence: Agni Deepana → Pitta Shamana → Loha supplementation → Rasayana',
      'Vitamin C (Amalaki) enhances iron absorption - always combine Loha with Amalaki',
      'Avoid tea, coffee, and calcium with iron meals - they inhibit absorption'
    ],
    shlokas: [
      {
        number: '16.1.1',
        sanskrit: 'पाण्डुरोगचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Pandu Roga (anemia).',
        commentary: 'Opening verse introducing anemia management.'
      },
      {
        number: '16.1.3',
        sanskrit: 'पाण्डुरोगः पञ्चधा प्रोक्तो वातजः पित्तजः कफजः सन्निपातजो रक्तजश्च ||',
        translation: 'Pandu (anemia) is of five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Raktaja.',
        commentary: 'Classifies anemia into five types based on dosha and associated organ involvement.'
      },
      {
        number: '16.1.5',
        sanskrit: 'पाण्डुरोगः कामलायाः पूर्वरूपम् |',
        translation: 'Pandu Roga is the premonitory stage of Kamala (jaundice).',
        commentary: 'Establishes the progression from anemia to jaundice if untreated.'
      },
      {
        number: '16.2.1',
        sanskrit: 'लोहं पाण्डुहरं प्रधानम् आमलकेन सह सेव्यम् |',
        translation: 'Loha (iron) is the principal treatment for anemia - should be taken with Amalaki.',
        commentary: 'Establishes iron with vitamin C (Amalaki) as primary treatment.'
      },
      {
        number: '16.2.5',
        sanskrit: 'लोहभस्म प्रातः सायं मधुना सह लेहयेत् |',
        translation: 'Loha Bhasma should be taken morning and evening with honey.',
        commentary: 'Dosage protocol for iron supplementation.'
      },
      {
        number: '16.3.1',
        sanskrit: 'पाण्डुरोगे अग्निदीपनं प्रथमम् |',
        translation: 'Agni Deepana (digestive stimulation) is the first step in anemia treatment.',
        commentary: 'Establishes the treatment sequence - digestion must be optimized before iron supplementation.'
      }
    ],
    topics: [
      {
        title: 'Five Types of Pandu with Diagnostic Features',
        content: 'Vataja: dry, rough pallor (Pandu), fatigue (Daurbalya), constipation (Vibandha), dry skin, pain. Pittaja: yellowish pallor (Haridra Netra), burning (Daha), thirst (Trishna), fever, sour taste. Kaphaja: pale, heavy (Guruta), mucus, anorexia (Aruchi), edema, slow progression. Sannipataja: mixed features, poor prognosis. Raktaja/Plihaja: associated with splenomegaly (Pliha Vriddhi), left hypochondrial pain, early satiety.',
        clinicalRelevance: 'Type determination guides treatment - Vataja needs Vata Shamana, Pittaja needs Pitta Shamana, Kaphaja needs Kapha Shamana.'
      },
      {
        title: 'Loha Bhasma (Iron Ash) Therapy',
        content: 'Loha Bhasma is calcined iron ash - the primary Ayurvedic iron supplement. Preparation: purified iron is calcined multiple times with herbal juices to create bioavailable nanoparticles. Dosage: 125-250mg twice daily with honey (Madhu) or ghee (Ghrita). Always combine with Amalaki for enhanced absorption (vitamin C). Duration: 2-3 months for mild anemia, 3-6 months for severe. Monitoring: hemoglobin every 2-4 weeks. Side effects: may cause constipation - use with Triphala if needed.',
        clinicalRelevance: 'Loha Bhasma is more easily absorbed than raw iron due to nanoparticle size - validated by modern research.'
      },
      {
        title: 'Pandu to Kamala Progression',
        content: 'Untreated Pandu can progress to Kamala (jaundice): Stage 1: Pandu (anemia with pallor). Stage 2: Pitta accumulation in Rakta dhatu. Stage 3: Kamala (jaundice with yellow discoloration). The progression indicates worsening Rakta-Pitta vitiation. Early treatment of Pandu prevents Kamala. If Kamala develops, treatment shifts to Rakta-Pitta Shamana with Guduchi, Amalaki, Kutki.',
        clinicalRelevance: 'Early intervention in Pandu prevents progression to more serious Kamala and Rakta-Pitta disorders.'
      },
      {
        title: 'Dietary Management for Anemia',
        content: 'Iron-rich foods (Loha Yukta Ahara): pomegranate (Dadima), dates (Kharjura), jaggery (Guda), black sesame (Tila), green leafy vegetables, beetroot, pomegranate, Amalaki. Absorption enhancers: Amalaki (vitamin C), lemon, tomato. Absorption inhibitors: tea, coffee, calcium, milk (avoid with iron meals). Principles: Pitta-pacifying diet, easy to digest, regular meals, avoid incompatible combinations.',
        clinicalRelevance: 'Dietary iron is more sustainable than supplementation - combine both for optimal results.'
      },
      {
        title: 'Agni Deepana in Anemia',
        content: 'Most anemia patients have Mandagni (weak digestion) causing iron malabsorption. Agni Deepana must precede Loha supplementation. Herbs: Trikatu (Three pungents), Hingvastak Churna, Chitraka (Plumbago zeylanica), Pippali (Piper longum). Diet: light, warm, easy to digest. Assessment: check for Ama (coated tongue, heavy abdomen, loss of appetite). Only start Loha supplementation after Agni is restored.',
        clinicalRelevance: 'Giving iron without optimizing digestion leads to malabsorption and gastrointestinal side effects.'
      }
    ],
    doshaDiscussion: [
      'Vataja Pandu - dry, rough pallor, fatigue, constipation, dry skin, pain, Vata symptoms',
      'Pittaja Pandu - yellowish pallor, burning, thirst, fever, sour taste, Pitta symptoms',
      'Kaphaja Pandu - pale, heavy, mucus, anorexia, edema, Kapha symptoms',
      'Sannipataja - mixed features, poor prognosis, requires combined approach',
      'Raktaja/Plihaja - associated with Pliha Vriddhi (splenomegaly), requires organ-specific treatment',
      'Agni status is critical - Mandagni causes malabsorption, must be treated first',
      'Pitta-Kapha involvement is primary - Pitta affects Rakta, Kapha affects Rasa dhatu'
    ],
    treatmentProtocols: [
      {
        condition: 'Pandu (General Anemia)',
        treatment: 'Agi Deepana + Pitta Shamana + Loha Supplementation',
        herbs: ['Amalaki (Emblica officinalis)', 'Guduchi (Tinospora cordifolia)', 'Loha Bhasma (Iron ash)', 'Triphala (Three fruits)', 'Pippali (Piper longum)', 'Shunthi (Zingiber officinale)'],
        dosage: 'Loha Bhasma 125mg with Amalaki Churna 3 grams and honey, twice daily after meals',
        duration: '2-3 months with monthly hemoglobin assessment',
        precautions: ['Iron-rich diet', 'Avoid tea/coffee with iron meals', 'Combine with Amalaki for absorption', 'Regular blood tests', 'Monitor for constipation']
      },
      {
        condition: 'Pittaja Pandu (Pitta-Predominant Anemia)',
        treatment: 'Pitta Shamana + Loha + cooling herbs',
        herbs: ['Amalaki (Emblica officinalis)', 'Guduchi (Tinospora cordifolia)', 'Chandana (Santalum album)', 'Loha Bhasma', 'Sariva (Hemidesmus indicus)', 'Ushira (Vetiveria zizanioides)'],
        dosage: 'Amalaki Churna 3g + Loha Bhasma 125mg with cold water, twice daily',
        duration: '2-3 months with biweekly assessment',
        precautions: ['Cool diet', 'Avoid spicy, sour foods', 'Avoid alcohol', 'Rest', 'Pitta-pacifying lifestyle']
      },
      {
        condition: 'Plihaja Pandu (Anemia with Splenomegaly)',
        treatment: 'Pliha Shamana + Loha + hepatosplenotonic herbs',
        herbs: ['Loha Bhasma', 'Amalaki', 'Kalmegh (Andrographis paniculata)', 'Sharpunkha (Tephrosia purpurea)', 'Guduchi', 'Kutki (Picrorhiza kurroa)'],
        dosage: 'Loha Bhasma 125mg + Kalmegha Churna 1g twice daily after meals',
        duration: '3-6 months with monthly splenic assessment',
        precautions: ['Treat splenic disorder simultaneously', 'Low salt diet', 'Avoid hepatotoxic substances', 'Regular monitoring']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Pandu (Anemia)',
        sanskrit: 'पाण्डु',
        etiology: 'Pitta-Kapha vitiation affecting Rasa and Rakta dhatu. Causes: poor dietary iron intake, chronic blood loss (menorrhagia, GI bleeding), malabsorption (Grahani), chronic disease, splenic disorders.',
        symptoms: ['Pallor (Pandutva)', 'Fatigue (Daurbalya)', 'Weakness (Shithilata)', 'Anorexia (Aruchi)', 'Dizziness (Bhrama)', 'Breathlessness (Shwasa)', 'Edema (Shopha)', 'Palpitation (Hridrava)', 'Dry skin', 'Brittle nails'],
        prognosis: 'Sadhya (curable) with proper treatment. Kricchra Sadhya in chronic cases with organ involvement.',
        treatment: 'Agi Deepana → Pitta Shamana → Loha Supplementation with Amalaki. Iron-rich diet. Treat underlying cause.'
      },
      {
        name: 'Kamala (Jaundice)',
        sanskrit: 'कामला',
        etiology: 'Progression of untreated Pandu. Rakta-Pitta vitiation affecting Yakrit (liver) and Rasa-Rakta dhatu. Can also arise from direct Pitta vitiation.',
        symptoms: ['Yellow discoloration (Haridra Netra)', 'Yellow urine', 'Pale stool', 'Fatigue', 'Anorexia', 'Burning', 'Fever'],
        prognosis: 'Sadhya (curable) if treated early. Kricchra Sadhya in chronic cases.',
        treatment: 'Pitta Shamana with Guduchi, Amalaki, Kutki. Loha for underlying anemia. Pitta-pacifying diet.'
      },
      {
        name: 'Raktapitta (Bleeding Disorder)',
        sanskrit: 'रक्तपित्त',
        etiology: 'Pitta vitiation in Rakta dhatu causing spontaneous bleeding. Can cause secondary anemia from chronic blood loss.',
        symptoms: ['Bleeding from nose/mouth', 'Blood in stool/urine', 'Pallor', 'Fatigue', 'Burning sensation'],
        prognosis: 'Sadhya (curable) with Pitta Shamana and Rakta Shodhana.',
        treatment: 'Stambhana (hemostasis) + Pitta Shamana + Loha for secondary anemia. Nagakeshara, Dhataki for bleeding.'
      }
    ],
    importantVerses: [
      '16.1.3 - Five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Raktaja',
      '16.1.5 - Pandu is the premonitory stage of Kamala (jaundice)',
      '16.2.1 - Loha is the principal treatment - should be taken with Amalaki',
      '16.2.5 - Loha Bhasma should be taken morning and evening with honey',
      '16.3.1 - Agni Deepana is the first step in anemia treatment'
    ],
    clinicalApplications: [
      'Iron deficiency anemia - Pandu protocol with Loha Bhasma and Amalaki',
      'Anemia in pregnancy - gentle Pandu treatment with safe herbs',
      'Chronic anemia - long-term Loha therapy with monitoring',
      'Nutritional anemia - dietary management with iron-rich foods',
      'Anemia with IBS - combined Grahani-Pandu approach',
      'Anemia with splenomegaly - Plihaja Pandu treatment',
      'Anemia to Kamala prevention - early Pandu treatment',
      'Post-partum anemia - Bṛmhana approach with Loha',
      'Anemia in elderly - gentle approach with Rasayana',
      'Anemia with chronic disease - treat underlying cause + Loha'
    ]
  },
  {
    id: 'chikitsa-17',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 17,
    name: 'Hikka Shwasa Chikitsa',
    sanskrit: 'हिक्का श्वास चिकित्सा',
    english: 'Management of Hiccups and Respiratory Distress',
    summary: 'Hikka Shwasa Chikitsa provides comprehensive management of hiccups (Hikka) and dyspnea (Shwasa). The chapter describes five types of Hikka (Annaja, Yamala, Kshudra, Gambhira, Mahati) and five types of Shwasa (Maha, Urdhva, Chinna, Tamaka, Kshudra). The underlying pathology involves Vata-Kapha obstruction in Pranavaha Srotas (respiratory channels). Treatment is type-specific: Shamana for mild types, Vamana for Kapha-predominant, Basti for Vata-predominant, and emergency measures for severe types. Vasa (Adhatoda vasica) and Kantakari (Solanum xanthocarpum) are the primary herbs for respiratory disorders.',
    keyConcepts: [
      'Five types of Hikka: Annaja (food-related), Yamala (double/hiccup pairs), Kshudra (mild), Gambhira (deep), Mahati (severe)',
      'Five types of Shwasa: Maha (severe/fatal), Urdhva (prolonged expiration), Chinna (interrupted), Tamaka (asthma-like), Kshudra (mild)',
      'Underlying pathology: Vata-Kapha obstruction in Pranavaha Srotas (respiratory channels)',
      'Treatment approach: Shamana for mild, Vamana for Kapha-predominant, Basti for Vata-predominant',
      'Vasa (Adhatoda vasica) is the best single herb for respiratory disorders - bronchodilator, expectorant',
      'Kantakari (Solanum xanthocarpum) is the second best - Kapha Shamana, bronchodilator',
      'Pushkarmool (Inula racemosa) is important for cardiac-related dyspnea (Hridya Shwasa)',
      'Tamaka Shwasa corresponds to bronchial asthma - Yapya (manageable, not fully curable)',
      'Maha Shwasa and Chinna Shwasa are Pranavata vitiation - often fatal, emergency treatment needed',
      'Kshudra Shwasa (mild dyspnea) on exertion is often physiological - reassurance and Rasayana',
      'Steam inhalation (Swedana) with Dashamula provides immediate relief in acute episodes',
      'Lifestyle: avoid cold exposure, dust, smoke, and Kapha-aggravating foods'
    ],
    shlokas: [
      {
        number: '17.1.1',
        sanskrit: 'हिक्काश्वासचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Hikka and Shwasa.',
        commentary: 'Opening verse introducing respiratory disorder management.'
      },
      {
        number: '17.1.3',
        sanskrit: 'हिक्का पञ्चविधा प्रोक्ता श्वासः पञ्चविधः स्मृतः |',
        translation: 'Hikka (hiccups) is of five types and Shwasa (dyspnea) is of five types.',
        commentary: 'Classifies respiratory disorders into ten distinct types for targeted treatment.'
      },
      {
        number: '17.1.5',
        sanskrit: 'महानूर्ध्वश्छिन्नस्तमकः क्षुद्रश्च श्वासः पञ्चमः |',
        translation: 'The five types of Shwasa are: Maha, Urdhva, Chinna, Tamaka, and Kshudra.',
        commentary: 'Lists the five types of dyspnea in order of severity.'
      },
      {
        number: '17.2.1',
        sanskrit: 'वातकफावरणं प्राणवाहस्रोतसाम् श्वासहिक्कयोः कारणम् |',
        translation: 'Vata-Kapha obstruction in Pranavaha Srotas is the cause of Shwasa and Hikka.',
        commentary: 'Establishes the core pathogenesis - obstruction of air channels by vitiated Vata-Kapha.'
      },
      {
        number: '17.2.5',
        sanskrit: 'वासा कण्टकारी श्वासहिक्कानां शमनं परम् |',
        translation: 'Vasa and Kantakari are the best treatments for Shwasa and Hikka.',
        commentary: 'Establishes the two primary herbs for all respiratory disorders.'
      },
      {
        number: '17.3.1',
        sanskrit: 'तमके वमनं बस्तिः शमनं च |',
        translation: 'For Tamaka Shwasa: Vamana (emesis), Basti (enema), and Shamana (pacification).',
        commentary: 'Treatment protocol for the most common chronic respiratory disorder.'
      }
    ],
    topics: [
      {
        title: 'Five Types of Shwasa with Severity Assessment',
        content: 'Kshudra Shwasa: mild dyspnea on exertion, Kapha-related, Sadhya (curable). Tamaka Shwasa: asthma-like with wheezing, Kapha-Vata, Yapya (manageable). Urdhva Shwasa: prolonged expiration, Vata-predominant, Kricchra Sadhya. Chinna Shwasa: interrupted breathing, severe Vata vitiation, difficult to treat. Maha Shwasa: continuous severe dyspnea, Pranavata vitiation, often Asadhya (fatal).',
        clinicalRelevance: 'Severity assessment determines urgency of treatment and prognosis - Maha Shwasa requires emergency intervention.'
      },
      {
        title: 'Tamaka Shwasa (Bronchial Asthma) Protocol',
        content: 'Acute episode: Vasa Kashaya 40ml with honey, steam inhalation with Dashamula, warm water sipping. Sub-acute: Shamana with Vasa-Kantakari, Tulsi, Shunthi. Remission: Vamana (emesis) in Pravrit Ritu (early rainy season), Basti with Dashamula Taila. Prevention: avoid triggers (cold, dust, smoke, allergens), Rasayana with Agastya Haritaki. Lifestyle: warm food, avoid cold exposure, Pranayama (breathing exercises).',
        clinicalRelevance: 'Tamaka Shwasa is the most treatable chronic respiratory disorder - comprehensive protocol reduces frequency and severity of episodes.'
      },
      {
        title: 'Emergency Management of Severe Shwasa',
        content: 'Maha Shwasa and Chinna Shwasa require emergency care: immediate positioning (upright), warm water with Vasa, steam inhalation, Dashamula Kashaya. If cardiac origin (Hridya Shwasa): Pushkarmool with honey. Monitor: respiratory rate, oxygen saturation, consciousness. These conditions may be Asadhya (fatal) - modern emergency care should be sought alongside Ayurvedic management.',
        clinicalRelevance: 'Severe Shwasa can be life-threatening - always assess for emergency and integrate modern emergency care when needed.'
      },
      {
        title: 'Respiratory Diet and Lifestyle',
        content: 'Pathya: warm food, old grains, light soups, honey, ginger, Tulsi tea, warm water. Apathya: cold food, cold drinks, curd, banana, heavy food, fried food, ice cream. Lifestyle: avoid cold exposure, dust, smoke, strong perfumes. Pranayama: Anulom-Vilom, Bhramari. Steam inhalation with Dashamula. Seasonal Vamana in Pravrit Ritu for prevention.',
        clinicalRelevance: 'Diet and lifestyle modification is the foundation of respiratory health - more important than herbs for long-term management.'
      }
    ],
    doshaDiscussion: [
      'Tamaka Shwasa - Kapha-Vata with bronchospasm, Kapha obstructs Vata in Pranavaha Srotas',
      'Maha Shwasa - severe Pranavata vitiation, often fatal, emergency treatment needed',
      'Kshudra Shwasa - mild, Kapha-related, Sadhya (curable)',
      'Urdhva Shwasa - Vata-predominant with prolonged expiration, Kricchra Sadhya',
      'Chinna Shwasa - severe Vata vitiation with interrupted breathing, difficult to treat',
      'Hikka (hiccups) - Vata vitiation in Prana-Udana Vata, varies by type',
      'Kapha reduction is primary in most respiratory disorders - Vamana is key treatment'
    ],
    treatmentProtocols: [
      {
        condition: 'Tamaka Shwasa (Bronchial Asthma)',
        treatment: 'Vamana + Shamana + Basti + Rasayana',
        herbs: ['Vasa (Adhatoda vasica)', 'Kantakari (Solanum xanthocarpum)', 'Pushkarmool (Inula racemosa)', 'Shunthi (Zingiber officinale)', 'Tulsi (Ocimum sanctum)', 'Haridra (Curcuma longa)'],
        dosage: 'Vasa Kashaya 40ml with honey twice daily, Kantakari Ghrita 10g at bedtime',
        duration: '3-6 months with seasonal Vamana',
        precautions: ['Avoid cold exposure', 'Warm food only', 'Steam inhalation daily', 'Avoid dust and smoke', 'Pranayama practice']
      },
      {
        condition: 'Hikka (Persistent Hiccups)',
        treatment: 'Vata Shamana + Snehana + Prana Vata correction',
        herbs: ['Dashamula (Ten roots)', 'Eranda (Ricinus communis)', 'Shunthi (Zingiber officinale)', 'Vasa', 'Bala (Sida cordifolia)', 'Ghee'],
        dosage: 'Dashamula Kashaya 40ml with Eranda Taila 10ml, warm Ghee nasya',
        duration: '1-2 weeks for acute, 4-6 weeks for chronic',
        precautions: ['Warm food', 'Avoid cold drinks', 'Slow eating', 'Avoid talking while eating', 'Gentle abdominal massage']
      },
      {
        condition: 'Kshudra Shwasa (Mild Dyspnea)',
        treatment: 'Kapha Shamana + Rasayana',
        herbs: ['Vasa', 'Kantakari', 'Tulsi', 'Shunthi', 'Chyavanprasha'],
        dosage: 'Chyavanprasha 10g daily with warm milk, Vasa Kashaya 20ml as needed',
        duration: '2-3 months for prevention',
        precautions: ['Regular exercise', 'Pranayama', 'Avoid obesity', 'Seasonal prevention']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Tamaka Shwasa (Bronchial Asthma)',
        sanskrit: 'तमक श्वास',
        etiology: 'Kapha-Vata obstruction in Pranavaha Srotas. Cold exposure, dust, smoke, allergens, Kapha-aggravating food, sedentary lifestyle. Kapha obstructs Vata movement causing bronchospasm.',
        symptoms: ['Wheezing (Shwasa Krichchrata)', 'Dyspnea (Shwasa)', 'Cough (Kasa)', 'Chest tightness (Uras Shoola)', 'Worse at night and early morning', 'Relieved by warm food and position', 'Associated with Kapha symptoms'],
        prognosis: 'Yapya (manageable) - can be controlled but not fully curable. Frequency and severity can be significantly reduced with comprehensive treatment.',
        treatment: 'Acute: Vasa Kashaya, steam inhalation. Remission: Vamana, Basti, Rasayana with Agastya Haritaki. Prevention: trigger avoidance, Pranayama, seasonal Vamana.'
      },
      {
        name: 'Maha Shwasa (Severe Respiratory Distress)',
        sanskrit: 'महा श्वास',
        etiology: 'Severe Pranavata vitiation causing continuous, labored breathing. Often indicates terminal respiratory failure or severe cardiac dysfunction.',
        symptoms: ['Continuous labored breathing', 'Unable to speak in full sentences', 'Cyanosis', 'Altered consciousness', 'Use of accessory muscles', 'Orthopnea'],
        prognosis: 'Asadhya (fatal) in most cases. Emergency modern care essential alongside Ayurvedic support.',
        treatment: 'Emergency: upright positioning, warm Vasa with honey, Pushkarmool if cardiac origin. Seek modern emergency care. Supportive: Dashamula steam, Prana Vata Shamana.'
      },
      {
        name: 'Kshudra Shwasa (Mild Exertional Dyspnea)',
        sanskrit: 'क्षुद्र श्वास',
        etiology: 'Mild Kapha accumulation in Pranavaha Srotas. Sedentary lifestyle, obesity, mild Kapha aggravation. Often physiological in unfit individuals.',
        symptoms: ['Dyspnea on exertion only', 'No symptoms at rest', 'Relieved by rest', 'No wheezing', 'General fitness concern'],
        prognosis: 'Sadhya (curable) with exercise, weight management, and Kapha Shamana.',
        treatment: 'Regular exercise, Pranayama, weight management, Kapha Shamana herbs, Chyavanprasha for Rasayana.'
      }
    ],
    importantVerses: [
      '17.1.3 - Five types each of Hikka and Shwasa',
      '17.1.5 - The five types: Maha, Urdhva, Chinna, Tamaka, Kshudra',
      '17.2.1 - Vata-Kapha obstruction in Pranavaha Srotas is the cause',
      '17.2.5 - Vasa and Kantakari are the best treatments for respiratory disorders',
      '17.3.1 - Tamaka Shwasa: Vamana, Basti, and Shamana'
    ],
    clinicalApplications: [
      'Bronchial asthma - Tamaka Shwasa comprehensive protocol with Vamana and Rasayana',
      'COPD - chronic Shwasa management with Shamana and lifestyle modification',
      'Hiccups - Hikka treatment with Vata Shamana and Snehana',
      'Respiratory allergies - Shwasa Shamana with trigger avoidance',
      'Cardiac dyspnea - Pushkarmool-based Hridya Shwasa treatment',
      'Childhood asthma - modified Tamaka Shwasa protocol with gentle herbs',
      'Exercise-induced dyspnea - Kshudra Shwasa management with fitness improvement',
      'Emergency respiratory distress - Maha Shwasa emergency protocol',
      'Prevention - seasonal Vamana and Rasayana for respiratory health',
      'Pranayama - breathing exercises as adjunct therapy for all respiratory conditions'
    ]
  },
  {
    id: 'chikitsa-18',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 18,
    name: 'Kasa Chikitsa',
    sanskrit: 'कास चिकित्सा',
    english: 'Management of Cough Disorders',
    summary: 'Kasa Chikitsa provides comprehensive management of cough disorders. The chapter describes five types: Vataja (dry, painful), Pittaja (yellowish sputum, burning), Kaphaja (productive, white sputum), Kshayaja (wasting, blood-tinged - associated with Rajayakshma/tuberculosis), and Kshataja (injury-related with chest pain). Each type has distinct etiology, pathology, and treatment approach. Vasa (Adhatoda vasica), Kantakari (Solanum xanthocarpum), and Pushkarmool (Inula racemosa) are the primary herbs. Kshayaja and Kshataja types require special attention as they may indicate serious underlying conditions.',
    keyConcepts: [
      'Five types: Vataja (dry), Pittaja (inflammatory), Kaphaja (productive), Kshayaja (wasting), Kshataja (traumatic)',
      'Vataja Kasa: dry cough (Shushka Kasa), pain (Shula), hoarseness (Svarabheda), worse at night',
      'Pittaja Kasa: yellowish sputum (Peeta Kapha), burning (Daha), fever (Jwara), thirst (Trishna)',
      'Kaphaja Kasa: productive cough (Kapha Yukta Kasa), white sputum, heaviness (Guruta), congestion',
      'Kshayaja Kasa: wasting cough, blood-tinged sputum (Rakta Kapha), associated with Rajayakshma',
      'Kshataja Kasa: injury-related, chest pain (Uras Shula), worse with deep breathing',
      'Treatment varies by type: Vamana for Kaphaja, Pitta Shamana for Pittaja, Snehana for Vataja',
      'Vasa is the best single herb for all types of Kasa - expectorant, bronchodilator, anti-tussive',
      'Kshayaja Kasa requires Rasayana therapy - Chyavanprasha, Agastya Haritaki',
      'Avoid cold food, cold exposure, and Kapha-aggravating foods during treatment',
      'Steam inhalation (Nadi Sweda) provides immediate relief for congestion',
      'Honey (Madhu) is the best Anupana (vehicle) for Kasa herbs - Kapha Shamana property'
    ],
    shlokas: [
      {
        number: '18.1.1',
        sanskrit: 'कासचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Kasa (cough).',
        commentary: 'Opening verse introducing cough management.'
      },
      {
        number: '18.1.3',
        sanskrit: 'कासः पञ्चविधः प्रोक्तो वातजः पित्तजः कफजः क्षयजः क्षतजश्च ||',
        translation: 'Kasa (cough) is of five types: Vataja, Pittaja, Kaphaja, Kshayaja, and Kshataja.',
        commentary: 'Classifies cough into five types based on dosha and causative factors.'
      },
      {
        number: '18.1.5',
        sanskrit: 'वातजः शुष्कः शूलवान् स्वरभेदी | पित्तजः पीतकफः दाहज्वरी || कफजः स्निग्धकफो गुरुः |',
        translation: 'Vataja: dry, painful, hoarse. Pittaja: yellow sputum, burning, fever. Kaphaja: unctuous sputum, heavy.',
        commentary: 'Core diagnostic features distinguishing the three primary dosha-based types.'
      },
      {
        number: '18.2.1',
        sanskrit: 'वासा कण्टकारी पुष्करमूलं कासहरं परम् |',
        translation: 'Vasa, Kantakari, and Pushkarmool are the best anti-tussive herbs.',
        commentary: 'Lists the three primary herbs for cough management.'
      },
      {
        number: '18.2.5',
        sanskrit: 'मधु कासे अनुपानं श्रेष्ठम् |',
        translation: 'Honey is the best vehicle (Anupana) for cough medicines.',
        commentary: 'Honey\'s Kapha Shamana and soothing properties make it ideal for cough treatment.'
      }
    ],
    topics: [
      {
        title: 'Five Types of Kasa with Diagnostic Features',
        content: 'Vataja: dry cough (Shushka), chest pain (Uras Shula), hoarseness (Svarabheda), worse at night, worse with cold. Pittaja: yellow sputum (Peeta Kapha), burning (Daha), fever, thirst, bitter taste. Kaphaja: productive cough, white sputum, heaviness, congestion, worse with cold food. Kshayaja: wasting, blood-tinged sputum, weight loss, night sweats, chronic course. Kshataja: injury-related, sharp chest pain, worse with deep breathing, may have hemoptysis.',
        clinicalRelevance: 'Type determination is essential - wrong treatment worsens the condition.'
      },
      {
        title: 'Kshayaja Kasa (Tuberculosis-Type Cough)',
        content: 'Kshayaja Kasa is associated with Rajayakshma (tuberculosis-like wasting). Features: chronic cough, blood-tinged sputum, weight loss, night sweats, low-grade fever, fatigue. Treatment: Rasayana therapy with Chyavanprasha, Agastya Haritaki. Bṛmhana (nourishing) diet. Rest. Ashwagandha Ghrita for tissue building. Modern integration: this may indicate tuberculosis requiring anti-tubercular treatment alongside Ayurvedic support.',
        clinicalRelevance: 'Kshayaja Kasa requires thorough investigation - may indicate tuberculosis, lung malignancy, or other serious conditions.'
      },
      {
        title: 'Herbal Formulations for Kasa',
        content: 'Vasa Kashaya: 40ml with honey twice daily - primary formulation for all cough types. Kantakari Ghrita: 10g at bedtime - for Kaphaja and chronic cough. Pushkarmool Churna: 2g with honey - for cardiac-related cough. Talisadi Churna: 3g with honey - for Kaphaja cough with congestion. Sitopaladi Churna: 3g with honey - for Vataja cough. Agastya Haritaki: 10g daily - for Kshayaja cough and Rasayana.',
        clinicalRelevance: 'Multiple formulations available - selection based on cough type and associated symptoms.'
      },
      {
        title: 'Diet and Lifestyle for Cough',
        content: 'Pathya: warm food, light soups, old grains, honey, ginger, Tulsi tea, warm water, ghee. Apathya: cold food, cold drinks, curd, banana, heavy food, fried food, ice cream, dry food. Lifestyle: avoid cold exposure, steam inhalation daily, warm salt water gargling, rest during acute phase, avoid talking excessively.',
        clinicalRelevance: 'Diet and lifestyle modification prevents recurrence and supports healing.'
      }
    ],
    doshaDiscussion: [
      'Vataja Kasa - dry (Ruksha), painful (Shula), hoarse voice (Svarabheda), worse at night and with cold',
      'Pittaja Kasa - yellow sputum (Peeta Kapha), burning (Daha), fever (Jwara), thirst (Trishna)',
      'Kaphaja Kasa - productive, white sputum (Shweta Kapha), heaviness (Guruta), congestion, worse with cold food',
      'Kshayaja Kasa - wasting (Kshaya), blood-tinged sputum (Rakta Kapha), associated with Rajayakshma',
      'Kshataja Kasa - traumatic, chest pain (Uras Shula), worse with breathing, may have hemoptysis',
      'Kapha is involved in most cough types - even Vataja and Pittaja have Kapha component',
      'Agni status affects recovery - Mandagni requires Deepana alongside Kasa Chikitsa'
    ],
    treatmentProtocols: [
      {
        condition: 'Kaphaja Kasa (Productive Cough)',
        treatment: 'Vamana + Kapha Shamana + Vasa-Kantakari',
        herbs: ['Vasa (Adhatoda vasica)', 'Kantakari (Solanum xanthocarpum)', 'Pushkarmool (Inula racemosa)', 'Tulsi (Ocimum sanctum)', 'Shunthi (Zingiber officinale)', 'Pippali (Piper longum)'],
        dosage: 'Vasa Kashaya 40ml with honey twice daily, Kantakari Ghrita 10g at bedtime',
        duration: '2-4 weeks with weekly assessment',
        precautions: ['Avoid cold food completely', 'Warm environment', 'Steam inhalation daily', 'Vamana if severe Kapha', 'Honey as vehicle']
      },
      {
        condition: 'Vataja Kasa (Dry Cough)',
        treatment: 'Vata Shamana + Snehana + anti-tussive herbs',
        herbs: ['Vasa', 'Kantakari', 'Dashamula (Ten roots)', 'Eranda (Ricinus communis)', 'Bala (Sida cordifolia)', 'Ghee'],
        dosage: 'Dashamula Kashaya 40ml with Eranda Taila 10ml, Sitopaladi Churna 3g with honey',
        duration: '2-4 weeks with biweekly assessment',
        precautions: ['Warm food', 'Oil massage (Abhyanga)', 'Avoid cold exposure', 'Ghee in diet', 'Avoid dry food']
      },
      {
        condition: 'Pittaja Kasa (Inflammatory Cough)',
        treatment: 'Pitta Shamana + cooling anti-tussive herbs',
        herbs: ['Vasa', 'Kantakari', 'Amalaki (Emblica officinalis)', 'Chandana (Santalum album)', 'Yashtimadhu (Glycyrrhiza glabra)', 'Shatavari (Asparagus racemosus)'],
        dosage: 'Amalaki Churna 3g with honey twice daily, Yashtimadhu Kashaya 40ml',
        duration: '2-4 weeks',
        precautions: ['Cool diet', 'Avoid spicy, sour foods', 'Rest', 'Avoid heat exposure', 'Pitta-pacifying lifestyle']
      },
      {
        condition: 'Kshayaja Kasa (Wasting Cough)',
        treatment: 'Rasayana + Bṛmhana + anti-tussive',
        herbs: ['Chyavanprasha', 'Agastya Haritaki', 'Ashwagandha', 'Bala', 'Shatavari', 'Vasa'],
        dosage: 'Chyavanprasha 10g daily with warm milk, Ashwagandha Ghrita 15g at bedtime',
        duration: '3-6 months with monthly assessment',
        precautions: ['Bṛmhana diet', 'Adequate rest', 'Investigate for tuberculosis', 'Monitor weight', 'Avoid exertion']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kaphaja Kasa (Productive Cough)',
        sanskrit: 'कफज कास',
        etiology: 'Kapha vitiation causing productive cough with mucus. Cold, heavy, oily foods, sedentary lifestyle, cold exposure, day sleep.',
        symptoms: ['Productive cough', 'White sputum (Shweta Kapha)', 'Chest congestion', 'Heaviness (Guruta)', 'Worse with cold food', 'Better with warm food'],
        prognosis: 'Sadhya (curable) with Vamana and Kapha Shamana. Responds well to treatment.',
        treatment: 'Vamana for severe Kapha. Vasa-Kantakari Kashaya. Kantakari Ghrita. Light warm diet. Steam inhalation.'
      },
      {
        name: 'Kshayaja Kasa (Wasting Cough)',
        sanskrit: 'क्षयज कास',
        etiology: 'Dhatu Kshaya (tissue depletion) causing chronic cough. May indicate Rajayakshma (tuberculosis), malignancy, or chronic lung disease.',
        symptoms: ['Chronic cough', 'Blood-tinged sputum (Rakta Kapha)', 'Weight loss', 'Night sweats', 'Low-grade fever', 'Fatigue', 'Progressive weakness'],
        prognosis: 'Kricchra Sadhya (difficult to cure) requiring prolonged treatment. May be Asadhya in advanced cases.',
        treatment: 'Rasayana therapy with Chyavanprasha, Agastya Haritaki. Bṛmhana diet. Rest. Investigate for TB and malignancy.'
      },
      {
        name: 'Kshataja Kasa (Traumatic Cough)',
        sanskrit: 'क्षतज कास',
        etiology: 'Chest injury or trauma causing cough with pain. May result from physical injury, excessive coughing causing secondary injury, or rib fracture.',
        symptoms: ['Sharp chest pain (Uras Shula)', 'Cough worse with deep breathing', 'May have hemoptysis', 'Tenderness on chest palpation', 'Worse with movement'],
        prognosis: 'Sadhya (curable) with Ropana (healing) therapy and rest.',
        treatment: 'Ropana herbs: Yashtimadhu, Ghee, Ashwagandha. Rest. Chest support. Pain management. Investigate for rib fracture.'
      }
    ],
    importantVerses: [
      '18.1.3 - Five types: Vataja, Pittaja, Kaphaja, Kshayaja, Kshataja',
      '18.1.5 - Vataja: dry, painful, hoarse. Pittaja: yellow sputum, burning, fever. Kaphaja: unctuous sputum, heavy',
      '18.2.1 - Vasa, Kantakari, and Pushkarmool are the best anti-tussive herbs',
      '18.2.5 - Honey is the best vehicle for cough medicines'
    ],
    clinicalApplications: [
      'Acute cough - Kaphaja Kasa treatment with Vasa-Kantakari',
      'Chronic cough - comprehensive Kasa management based on type',
      'Dry cough - Vataja Kasa protocol with Snehana and Sitopaladi',
      'Productive cough - Kapha Shamana with Vasa and honey',
      'Tuberculosis-related cough - Kshayaja Kasa with Rasayana therapy',
      'Post-infection cough - Shamana approach with Vasa',
      'Childhood cough - modified Kasa Chikitsa with gentle herbs',
      'Smoker\'s cough - Kapha-Vata Shamana approach',
      'Cardiac cough - Pushkarmool-based treatment',
      'Allergic cough - Shwasa-Kasa combined protocol'
    ]
  },
  {
    id: 'chikitsa-19',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 19,
    name: 'Atisara Chikitsa',
    sanskrit: 'अतिसार चिकित्सा',
    english: 'Management of Diarrhea and Dysentery',
    summary: 'Atisara Chikitsa provides comprehensive management of diarrhea and dysentery. The chapter describes six types: Vataja (watery, frothy), Pittaja (yellowish, burning), Kaphaja (mucoid, heavy), Sannipataja (mixed), Shokaja (grief-related), and Bhayaja (fear-related). Psychological causes (Shoka, Bhaya) are unique to Ayurvedic classification and reflect the gut-brain connection. Treatment follows a staged approach: Agni Deepana (digestive stimulation) → Grahi (binding) → Stambhana (hemostasis if bloody) → Shamana (pacification) → Rasayana (rebuilding). Kutaja (Holarrhena antidysenterica) is the primary herb for all types of diarrhea.',
    keyConcepts: [
      'Six types: Vataja (watery, frothy), Pittaja (yellowish, burning), Kaphaja (mucoid, heavy), Sannipataja (mixed), Shokaja (grief), Bhayaja (fear)',
      'Psychological causes (Shoka, Bhaya) reflect the gut-brain connection - unique to Ayurvedic classification',
      'Treatment staged: Agni Deepana → Grahi → Stambhana → Shamana → Rasayana',
      'Kutaja (Holarrhena antidysenterica) is the primary herb for all diarrhea types',
      'Hydration (Jala Pana) is critical - ORS or medicated liquids to prevent dehydration',
      'Diet should be Laghu (light), Grahi (binding), and easy to digest',
      'Avoid heavy, oily, spicy, and cold foods during treatment',
      'Atisara can become chronic (Chiratvari) leading to Grahani (IBS/malabsorption)',
      'Raktatisara (bloody diarrhea) requires Stambhana approach with Nagakeshara',
      'Shokaja and Bhayaja Atisara require Sattvavajaya (psychological therapy)',
      'Children and elderly are at higher risk of dehydration - monitor closely',
      'Ama (toxin) presence must be assessed - Sama Atisara needs Pachana before Grahi'
    ],
    shlokas: [
      {
        number: '19.1.1',
        sanskrit: 'अतिसारचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Atisara (diarrhea).',
        commentary: 'Opening verse introducing diarrhea management.'
      },
      {
        number: '19.1.3',
        sanskrit: 'अतिसारः षड्विधो वातजः पित्तजः कफजः सन्निपातजः शोकजो भयजश्च ||',
        translation: 'Atisara is of six types: Vataja, Pittaja, Kaphaja, Sannipataja, Shokaja (grief), and Bhayaja (fear).',
        commentary: 'Classifies diarrhea into six types including psychological causes.'
      },
      {
        number: '19.1.5',
        sanskrit: 'वातजः फेनिलः शूलवान् | पित्तजः पीतः सदाहः | कफजः पिच्छिलः गुरुः ||',
        translation: 'Vataja: frothy with pain. Pittaja: yellow with burning. Kaphaja: mucoid with heaviness.',
        commentary: 'Core diagnostic features distinguishing the three primary types.'
      },
      {
        number: '19.2.1',
        sanskrit: 'कुटजो बिल्वं मोचरसं दाडिमं अतिसारहरं परम् |',
        translation: 'Kutaja, Bilva, Mocharasa, and Dadima are the best anti-diarrheal herbs.',
        commentary: 'Lists the four primary herbs for diarrhea management.'
      },
      {
        number: '19.2.5',
        sanskrit: 'जलपानं अतिसारे प्रथमम् लङ्घनं च |',
        translation: 'Hydration and fasting are the first steps in diarrhea treatment.',
        commentary: 'Establishes the initial management - prevent dehydration and rest the gut.'
      }
    ],
    topics: [
      {
        title: 'Six Types of Atisara with Diagnostic Features',
        content: 'Vataja: watery, frothy stool (Phenila), abdominal pain (Shula), flatulence (Anaha), gurgling sounds. Pittaja: yellowish stool (Peeta), burning (Daha), fever (Jwara), thirst (Trishna), blood may be present. Kaphaja: mucoid stool (Pichchila), heaviness (Guruta), anorexia (Aruchi), slow onset. Sannipataja: mixed features, severe, poor prognosis. Shokaja: triggered by grief/shock, sudden onset, anxiety. Bhayaja: triggered by fear, sudden onset, palpitations.',
        clinicalRelevance: 'Type determination guides treatment - Vataja needs Vata Shamana, Pittaja needs Pitta Shamana, Kaphaja needs Kapha Shamana.'
      },
      {
        title: 'Psychological Atisara (Shokaja and Bhayaja)',
        content: 'Shokaja Atisara: triggered by grief (Shoka), loss, or emotional shock. The gut-brain connection causes stress-mediated diarrhea. Treatment: Sattvavajaya (psychotherapy), counseling, meditation, Brahmi, Ashwagandha. Bhayaja Atisara: triggered by fear (Bhaya), anxiety, panic. Treatment: reassurance, calming herbs (Brahmi, Jatamansi), warm oil massage. Both types require addressing the psychological root cause alongside Grahi herbs.',
        clinicalRelevance: 'Modern validation: IBS and stress-related diarrhea are well-documented gut-brain axis disorders.'
      },
      {
        title: 'Kutaja - The Primary Anti-Diarrheal Herb',
        content: 'Kutaja (Holarrhena antidysenterica): properties - Tikta (bitter), Kashaya (astringent), Sheeta (cold). Actions: Grahi (binding), Stambhana (hemostatic), Deepana (appetizer), Krimighna (anti-parasitic). Forms: Kutaja Bark Kashaya (decoction) 40ml twice daily, Kutaja Beeja Churna (seed powder) 3g with honey, Kutajarishta (fermented preparation) 20ml twice daily. Effective for all types of diarrhea - especially Pittaja and Raktatisara.',
        clinicalRelevance: 'Kutaja is to diarrhea what Vasa is to respiratory disorders - the single most important herb.'
      },
      {
        title: 'Hydration and Dietary Management',
        content: 'Hydration: ORS (Jala + Lavana + Shakara), medicated liquids (Dadima Kashaya, Kutaja Kashaya), coconut water. Avoid: plain water in excess (may worsen electrolyte imbalance). Diet: light, binding foods - rice water (Manda), barley water, curd rice (Takra), banana, pomegranate. Avoid: heavy, oily, spicy, cold, raw foods, milk, fiber-rich foods initially. Gradual diet increase as stools normalize.',
        clinicalRelevance: 'Dehydration is the primary danger in diarrhea - especially in children and elderly. Hydration management saves lives.'
      },
      {
        title: 'Chronic Diarrhea and Grahani Connection',
        content: 'Untreated acute diarrhea can become chronic (Chiratvari Atisara) leading to Grahani (IBS/malabsorption). Features: recurrent loose stools, weight loss, malnutrition, fatigue. Treatment: combined Atisara-Grahani approach with Kutaja, Bilva, Musta, Shunthi. Agni Deepana with Hingvastak. Long-term dietary modification. Rasayana for tissue rebuilding.',
        clinicalRelevance: 'Early treatment of acute diarrhea prevents progression to chronic Grahani - a much more difficult condition to treat.'
      }
    ],
    doshaDiscussion: [
      'Vataja Atisara - watery (Drava), frothy (Phenila), painful (Shula), flatulence (Anaha), gurgling (Antrakujana)',
      'Pittaja Atisara - yellowish (Peeta), burning (Daha), fever (Jwara), thirst (Trishna), may have blood',
      'Kaphaja Atisara - mucoid (Pichchila), heavy (Guruta), anorexia (Aruchi), slow onset',
      'Sannipataja - mixed features, severe, poor prognosis, requires combined approach',
      'Shokaja/Bhayaja - psychological origin, Vata involvement from stress/fear',
      'Ama presence must be assessed - Sama Atisara (with Ama) needs Pachana before Grahi',
      'Vata is involved in all types - even Pittaja and Kaphaja have Vata component causing movement'
    ],
    treatmentProtocols: [
      {
        condition: 'Atisara (Acute Diarrhea)',
        treatment: 'Langhana + Grahi + Hydration',
        herbs: ['Kutaja (Holarrhena antidysenterica)', 'Bilva (Aegle marmelos)', 'Mocharasa (Salmalia malabarica)', 'Dadima (Punica granatum)', 'Musta (Cyperus rotundus)', 'Honey'],
        dosage: 'Kutaja Churna 3 grams with honey twice daily, Bilva Kashaya 40ml twice daily',
        duration: '3-7 days for acute',
        precautions: ['ORS for hydration', 'Light diet', 'Avoid heavy foods', 'Rest', 'Monitor for dehydration signs']
      },
      {
        condition: 'Pittaja Atisara (Inflammatory Diarrhea)',
        treatment: 'Pitta Shamana + Grahi + cooling herbs',
        herbs: ['Kutaja', 'Amalaki (Emblica officinalis)', 'Musta', 'Chandana (Santalum album)', 'Dhataki (Woodfordia fruticosa)', 'Nagakeshara (Mesua ferrea)'],
        dosage: 'Kutaja Kashaya 40ml with Amalaki Churna 3g twice daily',
        duration: '5-7 days',
        precautions: ['Cool diet', 'Avoid spicy, sour foods', 'Adequate hydration', 'Rest', 'Monitor for bloody stool']
      },
      {
        condition: 'Raktatisara (Bloody Diarrhea)',
        treatment: 'Stambhana + Rakta Stambhana + Grahi',
        herbs: ['Kutaja', 'Nagakeshara (Mesua ferrea)', 'Dhataki', 'Lodhra (Symplocos racemosa)', 'Mocharasa', 'Lajjalu (Mimosa pudica)'],
        dosage: 'Nagakeshara Churna 1g + Kutaja Churna 3g with honey twice daily',
        duration: '7-14 days',
        precautions: ['Complete rest', 'Liquid diet initially', 'Monitor for anemia', 'Investigate cause', 'Avoid straining']
      },
      {
        condition: 'Shokaja Atisara (Stress-Related Diarrhea)',
        treatment: 'Sattvavajaya + Grahi + Vata Shamana',
        herbs: ['Kutaja', 'Brahmi (Bacopa monnieri)', 'Ashwagandha (Withania somnifera)', 'Jatamansi (Nardostachys jatamansi)', 'Bilva'],
        dosage: 'Kutaja Churna 3g + Brahmi Churna 1g with honey twice daily',
        duration: '2-4 weeks',
        precautions: ['Address psychological cause', 'Counseling', 'Meditation', 'Warm oil massage', 'Supportive environment']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Atisara (Acute Diarrhea)',
        sanskrit: 'अतिसार',
        etiology: 'Dosha vitiation causing frequent, loose stools. Causes: contaminated food/water, food poisoning, infections, dietary indiscretion, emotional stress, aggravating factors for specific dosha.',
        symptoms: ['Frequent loose stools (Atisara)', 'Abdominal pain (Shula)', 'Dehydration (Dhatu Kshaya)', 'Weakness (Daurbalya)', 'Thirst (Trishna)', 'Anorexia (Aruchi)'],
        prognosis: 'Sadhya (curable) in acute cases with prompt treatment. Yapya (manageable) when chronic.',
        treatment: 'Langhana (fasting initially), Grahi herbs (Kutaja, Bilva), hydration (ORS), light diet, Shamana based on dosha type.'
      },
      {
        name: 'Raktatisara (Bloody Dysentery)',
        sanskrit: 'रक्तातिसार',
        etiology: 'Pitta-Rakta vitiation causing bloody diarrhea. Causes: severe infection (amoebic/bacillary dysentery), inflammatory bowel disease, severe Pitta aggravation.',
        symptoms: ['Bloody stools (Rakta Purisha)', 'Severe abdominal pain', 'Tenesmus (straining)', 'Fever', 'Dehydration', 'Weakness'],
        prognosis: 'Sadhya (curable) with prompt Stambhana treatment. Kricchra Sadhya in chronic cases.',
        treatment: 'Stambhana (hemostasis) with Nagakeshara, Dhataki. Kutaja for anti-diarrheal. Pitta Shamana. Hydration. Rest.'
      },
      {
        name: 'Chiratvari Atisara (Chronic Diarrhea)',
        sanskrit: 'चिरात्वरी अतिसार',
        etiology: 'Untreated acute diarrhea becoming chronic. May progress to Grahani (IBS/malabsorption). Causes: repeated infections, dietary factors, stress, weakened Agni.',
        symptoms: ['Recurrent loose stools', 'Weight loss', 'Malnutrition', 'Fatigue', 'Agnimandya', 'Intermittent abdominal pain'],
        prognosis: 'Yapya (manageable) with long-term treatment. Kricchra Sadhya if associated with Grahani.',
        treatment: 'Combined Atisara-Grahani approach. Kutaja, Bilva, Musta for Grahi. Agni Deepana with Hingvastak. Long-term dietary modification. Rasayana for tissue rebuilding.'
      }
    ],
    importantVerses: [
      '19.1.3 - Six types: Vataja, Pittaja, Kaphaja, Sannipataja, Shokaja, Bhayaja',
      '19.1.5 - Vataja: frothy with pain. Pittaja: yellow with burning. Kaphaja: mucoid with heaviness',
      '19.2.1 - Kutaja, Bilva, Mocharasa, and Dadima are the best anti-diarrheal herbs',
      '19.2.5 - Hydration and fasting are the first steps in diarrhea treatment'
    ],
    clinicalApplications: [
      'Acute diarrhea - Kutaja-based Grahi protocol with hydration',
      'Dysentery - Raktatisara treatment with Nagakeshara and Dhataki',
      'Chronic diarrhea - long-term Shamana with dietary modification',
      'IBS with diarrhea - combined Grahani-Atisara approach',
      'Traveler\'s diarrhea - Kutaja prophylaxis and treatment',
      'Childhood diarrhea - gentle Grahi with ORS and banana',
      'Stress-related diarrhea - Sattvavajaya with Kutaja',
      'Antibiotic-associated diarrhea - Agni Deepana with Grahi',
      'Elderly diarrhea - careful hydration monitoring with gentle herbs',
      'Prevention - dietary hygiene and Agni maintenance'
    ]
  },
  {
    id: 'chikitsa-20',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 20,
    name: 'Chhardi Chikitsa',
    sanskrit: 'छर्दि चिकित्सा',
    english: 'Management of Vomiting Disorders',
    summary: 'Chhardi Chikitsa provides comprehensive management of vomiting disorders. The chapter describes six types: Vataja (frothy, scanty, painful), Pittaja (yellowish, bitter, burning), Kaphaja (mucoid, heavy), Sannipataja (mixed), Shokaja (grief-related), and Bhayaja (fear-related). Similar to Atisara, psychological causes are recognized, reflecting the gut-brain connection. Treatment approach is type-specific: Vata Shamana for Vataja, Pitta Shamana for Pittaja, Kapha Shamana for Kaphaja, and Sattvavajaya for psychological types. Ela (cardamom) and Yashtimadhu (licorice) are the primary anti-emetic herbs.',
    keyConcepts: [
      'Six types: Vataja (frothy, scanty), Pittaja (yellowish, bitter), Kaphaja (mucoid, heavy), Sannipataja (mixed), Shokaja (grief), Bhayaja (fear)',
      'Psychological causes (Shoka, Bhaya) reflect the gut-brain connection - similar to Atisara classification',
      'Treatment is type-specific: Vata Shamana for Vataja, Pitta Shamana for Pittaja, Kapha Shamana for Kaphaja',
      'Ela (cardamom) is the primary anti-emetic herb - Madhura, Laghu, Sheeta properties',
      'Yashtimadhu (licorice) is the second key herb - soothing, anti-inflammatory, Pitta Shamana',
      'Diet should be Laghu (light), Sheeta (cool for Pittaja), and easily digestible',
      'Avoid heavy, oily, strong-smelling, and incompatible foods during treatment',
      'Vamana (therapeutic vomiting) may be indicated for Kaphaja Chhardi - controlled emesis',
      'Nausea (Hrillasa) often precedes vomiting - early treatment prevents full Chhardi',
      'Chronic vomiting can lead to dehydration and Rasa dhatu depletion',
      'Pregnancy-related vomiting (Garbha Chhardi) requires gentle, safe herbs',
      'Anti-emetic herbs work best when taken in small, frequent doses'
    ],
    shlokas: [
      {
        number: '20.1.1',
        sanskrit: 'छर्दिचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Chhardi (vomiting).',
        commentary: 'Opening verse introducing vomiting disorder management.'
      },
      {
        number: '20.1.3',
        sanskrit: 'छर्दिः षड्विधा वातजा पित्तजा कफजा सन्निपातजा शोकजा भयजा च ||',
        translation: 'Chhardi (vomiting) is of six types: Vataja, Pittaja, Kaphaja, Sannipataja, Shokaja, and Bhayaja.',
        commentary: 'Classifies vomiting into six types including psychological causes.'
      },
      {
        number: '20.1.5',
        sanskrit: 'वातजा फेनिला अल्पा शूलवती | पित्तजा पीता तिक्ता दाहवती || कफजा पिच्छिला गुर्वी |',
        translation: 'Vataja: frothy, scanty, painful. Pittaja: yellow, bitter, burning. Kaphaja: mucoid, heavy.',
        commentary: 'Core diagnostic features distinguishing the three primary types.'
      },
      {
        number: '20.2.1',
        sanskrit: 'एला यष्टीमधुः चन्दनं कामदुघा छर्दिहरं परम् |',
        translation: 'Ela, Yashtimadhu, Chandana, and Kamadugha are the best anti-emetic herbs.',
        commentary: 'Lists the four primary herbs for vomiting management.'
      },
      {
        number: '20.3.1',
        sanskrit: 'कफजे वमनं शस्तम् |',
        translation: 'Vamana (therapeutic emesis) is indicated for Kaphaja vomiting.',
        commentary: 'Controlled emesis can treat Kapha-predominant vomiting by expelling morbid Kapha.'
      }
    ],
    topics: [
      {
        title: 'Six Types of Chhardi with Diagnostic Features',
        content: 'Vataja: frothy vomit (Phenila), scanty (Alpa), painful (Shula Yukta), dry mouth, associated with Vata symptoms. Pittaja: yellow vomit (Peeta), bitter taste (Tikta), burning (Daha), thirst, associated with Pitta symptoms. Kaphaja: mucoid vomit (Pichchila), heavy (Guru), anorexia (Aruchi), nausea, associated with Kapha symptoms. Sannipataja: mixed features, severe, poor prognosis. Shokaja: triggered by grief, sudden onset, anxiety. Bhayaja: triggered by fear, sudden onset, palpitations.',
        clinicalRelevance: 'Accurate type determination guides treatment - wrong approach worsens vomiting.'
      },
      {
        title: 'Gut-Brain Connection in Vomiting',
        content: 'Shokaja and Bhayaja Chhardi recognize the gut-brain connection in vomiting: grief (Shoka) and fear (Bhaya) trigger vagal response causing nausea and vomiting. Modern validation: psychogenic vomiting, cyclic vomiting syndrome, and anxiety-related nausea are well-documented. Treatment: Sattvavajaya (psychotherapy), counseling, reassurance, calming herbs (Brahmi, Jatamansi), warm oil massage, meditation.',
        clinicalRelevance: 'Psychological vomiting requires addressing the root cause - anti-emetic herbs alone are insufficient.'
      },
      {
        title: 'Anti-Herbal Formulations',
        content: 'Ela (cardamom) Churna: 1g with honey - primary anti-emetic, cooling, soothing. Yashtimadhu Kashaya: 40ml with honey - anti-inflammatory, Pitta Shamana. Kamadugha (mineral preparation): 250mg with honey - antacid, anti-emetic. Chandana (sandalwood) Kashaya: 40ml - cooling, Pitta Shamana. Sitopaladi Churna: 3g with honey - for Vataja Chhardi. Lavangadi Vati: for nausea and vomiting - sucks like lozenge.',
        clinicalRelevance: 'Multiple formulations available - selection based on vomiting type and severity.'
      },
      {
        title: 'Dietary Management for Vomiting',
        content: 'During acute vomiting: sips of cold water, ice chips, ORS. After vomiting subsides: rice water (Manda), barley water, light gruel, banana. Avoid: heavy, oily, spicy, strong-smelling food, milk initially. Small frequent meals. Eating slowly. Rest after meals (15-20 minutes sitting upright). Ginger tea for nausea. Mint tea for cooling.',
        clinicalRelevance: 'Dietary modification prevents vomiting recurrence and supports recovery.'
      },
      {
        title: 'Nausea (Hrillasa) as Pre-Vomiting Stage',
        content: 'Hrillasa (nausea) often precedes full vomiting - early treatment prevents Chhardi. Herbs: Ela, Lavanga (clove), Sonthi (dry ginger), Pudina (mint). Methods: smelling lemon, deep breathing, cold cloth on forehead, acupressure (P6 point on wrist). If nausea persists without vomiting: treat as pre-Chhardi stage with Shamana herbs and dietary modification.',
        clinicalRelevance: 'Early intervention in nausea prevents the more disruptive vomiting and its complications.'
      }
    ],
    doshaDiscussion: [
      'Vataja Chhardi - frothy (Phenila), scanty (Alpa), painful (Shula), dry mouth, Vata symptoms',
      'Pittaja Chhardi - yellow (Peeta), bitter (Tikta), burning (Daha), thirst, Pitta symptoms',
      'Kaphaja Chhardi - mucoid (Pichchila), heavy (Guru), anorexia (Aruchi), nausea, Kapha symptoms',
      'Sannipataja - mixed features, severe, poor prognosis, requires combined approach',
      'Shokaja/Bhayaja - psychological origin, Vata involvement from stress/fear',
      'Kapha is involved in most vomiting types - Kapha Shamana is often needed',
      'Agni status affects recovery - Mandagni requires Deepana after vomiting subsides'
    ],
    treatmentProtocols: [
      {
        condition: 'Chhardi (General Vomiting)',
        treatment: 'Shamana with anti-emetic herbs + dietary modification',
        herbs: ['Ela (Elettaria cardamomum)', 'Yashtimadhu (Glycyrrhiza glabra)', 'Chandana (Santalum album)', 'Kamadugha (mineral preparation)', 'Shunthi (Zingiber officinale)', 'Pudina (Mentha piperita)'],
        dosage: 'Ela Churna 1 gram with honey every 2-4 hours as needed, Yashtimadhu Kashaya 40ml twice daily',
        duration: '3-7 days',
        precautions: ['Light diet', 'Small frequent meals', 'Avoid strong smells', 'Rest', 'Hydration with ORS']
      },
      {
        condition: 'Pittaja Chhardi (Burning Vomiting)',
        treatment: 'Pitta Shamana + cooling anti-emetics',
        herbs: ['Yashtimadhu', 'Chandana', 'Amalaki (Emblica officinalis)', 'Ela', 'Sariva (Hemidesmus indicus)', 'Ushira (Vetiveria zizanioides)'],
        dosage: 'Yashtimadhu Churna 3g with cold water every 3-4 hours, Chandana Kashaya 40ml twice daily',
        duration: '3-7 days',
        precautions: ['Cool diet', 'Avoid spicy, sour, hot foods', 'Cold water sips', 'Rest', 'Avoid heat exposure']
      },
      {
        condition: 'Kaphaja Chhardi (Mucoid Vomiting)',
        treatment: 'Kapha Shamana + controlled Vamana if indicated',
        herbs: ['Ela', 'Shunthi (Zingiber officinale)', 'Pippali (Piper longum)', 'Vacha (Acorus calamus)', 'Madanaphala (Randia dumetorum)', 'Honey'],
        dosage: 'Shunthi Churna 2g with honey before meals, Vacha Churna 500mg with honey',
        duration: '3-7 days',
        precautions: ['Light diet', 'Avoid heavy, oily, cold foods', 'Vamana if Kapha is severe', 'Steam inhalation']
      },
      {
        condition: 'Shokaja/Bhayaja Chhardi (Psychological Vomiting)',
        treatment: 'Sattvavajaya + anti-emetics + calming herbs',
        herbs: ['Ela', 'Brahmi (Bacopa monnieri)', 'Ashwagandha (Withania somnifera)', 'Jatamansi (Nardostachys jatamansi)', 'Yashtimadhu'],
        dosage: 'Ela Churna 1g with honey as needed, Brahmi Churna 1g with warm milk twice daily',
        duration: '2-4 weeks',
        precautions: ['Address psychological cause', 'Counseling', 'Meditation', 'Supportive environment', 'Warm oil massage']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Chhardi (Vomiting)',
        sanskrit: 'छर्दि',
        etiology: 'Dosha vitiation causing vomiting. Causes: contaminated food, overeating, incompatible food, emotional stress, pregnancy, motion sickness, medication side effects, migraine.',
        symptoms: ['Nausea (Hrillasa)', 'Vomiting (Chhardi)', 'Abdominal discomfort', 'Weakness (Daurbalya)', 'Dehydration', 'Loss of appetite'],
        prognosis: 'Sadhya (curable) with proper treatment and dietary modification.',
        treatment: 'Shamana with anti-emetic herbs (Ela, Yashtimadhu). Dietary modification. Hydration. Treat underlying cause.'
      },
      {
        name: 'Garbha Chhardi (Pregnancy Vomiting)',
        sanskrit: 'गर्भ छर्दि',
        etiology: 'Hormonal changes in pregnancy causing nausea and vomiting. Vata-Pitta vitiation in Garbhashaya (uterus). Usually first trimester.',
        symptoms: ['Morning nausea', 'Vomiting after eating', 'Food aversions', 'Fatigue', 'Dehydration if severe'],
        prognosis: 'Sadhya (curable) with gentle treatment. Usually resolves by second trimester.',
        treatment: 'Gentle anti-emetics: Ela, Yashtimadhu, Shunthi. Small frequent meals. Morning crackers before rising. Avoid triggers. Ginger tea.'
      },
      {
        name: 'Chiratvari Chhardi (Chronic Vomiting)',
        sanskrit: 'चिरात्वरी छर्दि',
        etiology: 'Untreated acute vomiting becoming chronic. May indicate underlying gastric ulcer, gastroparesis, or psychological disorder.',
        symptoms: ['Recurrent vomiting', 'Weight loss', 'Dehydration', 'Electrolyte imbalance', 'Weakness', 'Dental erosion'],
        prognosis: 'Yapya (manageable) with long-term treatment. Kricchra Sadhya if underlying cause persists.',
        treatment: 'Combined Shamana and dietary approach. Investigate underlying cause. Long-term anti-emetic herbs. Rasayana for tissue rebuilding.'
      }
    ],
    importantVerses: [
      '20.1.3 - Six types: Vataja, Pittaja, Kaphaja, Sannipataja, Shokaja, Bhayaja',
      '20.1.5 - Vataja: frothy, scanty, painful. Pittaja: yellow, bitter, burning. Kaphaja: mucoid, heavy',
      '20.2.1 - Ela, Yashtimadhu, Chandana, and Kamadugha are the best anti-emetic herbs',
      '20.3.1 - Vamana is indicated for Kaphaja vomiting'
    ],
    clinicalApplications: [
      'Acute vomiting - Shamana with Ela and Yashtimadhu',
      'Pregnancy vomiting - gentle anti-emetic protocol with safe herbs',
      'Motion sickness - preventive herbs before travel',
      'Chemotherapy-induced nausea - supportive anti-emetic treatment',
      'Psychological vomiting - Sattvavajaya with calming herbs',
      'Food poisoning vomiting - initial vomiting is protective, then Shamana',
      'Migraine-associated vomiting - treat underlying condition with anti-emetics',
      'Chronic vomiting - investigate cause with long-term Shamana',
      'Pediatric vomiting - modified gentle protocol',
      'Post-surgical nausea - supportive anti-emetic herbs'
    ]
  },
  {
    id: 'chikitsa-21',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 21,
    name: 'Visarpa Chikitsa',
    sanskrit: 'विसर्प चिकित्सा',
    english: 'Management of Herpes, Erysipelas and Spreading Skin Inflammation',
    summary: 'Visarpa Chikitsa provides comprehensive management of Visarpa - spreading skin conditions resembling herpes, erysipelas, and cellulitis. The chapter describes four main types based on dosha involvement: Vataja (painful, dark), Pittaja (red, burning - most common), Kaphaja (slow, itching), and Sannipataja (mixed - most severe). Treatment is type-specific: Raktamokshana (bloodletting) for Pittaja, Shamana with Vishaghna and Rakta-Shodhana herbs, and external Lepa (paste) application. Haridra, Nimba, Guduchi, and Chandana are the primary herbs. Granthi Visarpa involves glandular spread requiring additional Shotha Shamana.',
    keyConcepts: [
      'Visarpa involves Pitta-Kapha with Rakta vitiation causing spreading skin inflammation',
      'Four types: Vataja (painful, dark), Pittaja (red, burning - most common), Kaphaja (slow, itching), Sannipataja (mixed)',
      'Granthi Visarpa - associated with glandular involvement, more serious prognosis',
      'Treatment includes Raktamokshana (bloodletting) for Pittaja, Shamana for all types',
      'Haridra (Curcuma longa) - primary herb: anti-inflammatory, Rakta-Shodhana',
      'Nimba (Azadirachta indica) - secondary herb: Vishaghna, Krimighna',
      'Guduchi (Tinospora cordifolia) - immunomodulator, Pitta-Rakta Shamana',
      'Chandana (Santalum album) - cooling, external application',
      'Sariva (Hemidesmus indicus) - Rakta-Shodhana, Pitta Shamana',
      'Diet should be cooling and Pitta-pacifying - avoid hot, spicy, and sour foods',
      'External treatment with Lepa (paste) of Haridra-Chandana is important',
      'Raktamokshana is indicated in Pittaja Visarpa for Rakta vitiation',
      'Visarpa can spread rapidly - early treatment is critical'
    ],
    shlokas: [
      {
        number: '21.1.1',
        sanskrit: 'विसर्पचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Visarpa (spreading skin inflammation).',
        commentary: 'Opening verse introducing Visarpa management.'
      },
      {
        number: '21.1.3',
        sanskrit: 'विसर्पः पित्तरक्तजः | वातपित्तकफरक्तसम्भवः |',
        translation: 'Visarpa is primarily caused by Pitta and Rakta vitiation, but can involve all doshas.',
        commentary: 'Establishes the dosha basis - Pitta-Rakta is primary, Vata-Kapha can be secondary.'
      },
      {
        number: '21.1.5',
        sanskrit: 'वातजः श्यावः शूलवान् | पित्तजः रक्तः दाहवान् द्रुतगतिः | कफजः कण्डूयुक्तः मन्दगतिः |',
        translation: 'Vataja: dark, painful. Pittaja: red, burning, rapid spreading. Kaphaja: itchy, slow spreading.',
        commentary: 'Core diagnostic features distinguishing the three primary types.'
      },
      {
        number: '21.2.1',
        sanskrit: 'हरिद्रा निम्बः सारिवा चन्दनं गुडूची विसर्पहरं परम् |',
        translation: 'Haridra, Nimba, Sariva, Chandana, and Guduchi are the best Visarpa treatments.',
        commentary: 'Lists the five primary herbs for Visarpa management.'
      },
      {
        number: '21.2.5',
        sanskrit: 'पित्तजे रक्तमोक्षणं शस्तम् |',
        translation: 'Raktamokshana (bloodletting) is indicated for Pittaja Visarpa.',
        commentary: 'Bloodletting removes vitiated Rakta, reducing the inflammatory spread.'
      },
      {
        number: '21.3.1',
        sanskrit: 'लेपः शीतः विसर्पे बाह्यचिकित्सा |',
        translation: 'Cool Lepa (paste) application is the external treatment for Visarpa.',
        commentary: 'External cooling applications provide local relief and reduce spreading.'
      }
    ],
    topics: [
      {
        title: 'Four Types of Visarpa with Diagnostic Features',
        content: 'Vataja: dark-colored (Shyava), painful (Shula), dry, intermittent spreading. Pittaja: red (Rakta), burning (Daha), rapid spreading (Druta Gati), fever, thirst. Kaphaja: itchy (Kandu), slow spreading (Manda Gati), white/pale, mucus. Sannipataja: mixed features, severe, rapid progression, poor prognosis. Granthi Visarpa: associated with glandular swelling, deeper involvement.',
        clinicalRelevance: 'Type determination guides treatment - Pittaja needs Raktamokshana, Kaphaja needs Shodhana, Vataja needs Snehana.'
      },
      {
        title: 'Raktamokshana in Visarpa',
        content: 'Raktamokshana (bloodletting) is specifically indicated for Pittaja Visarpa with severe Rakta vitiation. Methods: Siravyadha (venesection) or Jalaukavacharana (leech therapy). Leech therapy is preferred for localized Visarpa - apply 4-6 leeches around the affected area. After Raktamokshana: Pitta Shamana herbs, cooling diet, rest. Contraindicated in: Vataja Visarpa, debilitated patients, anemia.',
        clinicalRelevance: 'Raktamokshana provides rapid relief in Pittaja Visarpa by directly removing vitiated blood.'
      },
      {
        title: 'External Treatment (Lepa)',
        content: 'Cool Lepa (paste) application: Haridra + Chandana + Sariva paste with rose water. Apply thick layer over and around affected area. Change every 4-6 hours. Parisheka (pouring) with Chandana-Ushira Kashaya for cooling. Avoid: hot applications, oil massage, scratching. Keep affected area clean and dry.',
        clinicalRelevance: 'External treatment reduces local inflammation and prevents spreading to adjacent areas.'
      },
      {
        title: 'Granthi Visarpa (Glandular Herpes)',
        content: 'Granthi Visarpa involves glandular swelling along with skin inflammation. Features: painful lymph nodes, deeper tissue involvement, slower response to treatment. Treatment: Shotha Shamana (anti-inflammatory) with Guggulu, Guduchi. External: warm Lepa for Granthi resolution. May require Raktamokshana if severely inflamed. Prognosis: Kricchra Sadhya (difficult to cure).',
        clinicalRelevance: 'Granthi Visarpa requires more intensive treatment and longer duration than simple Visarpa.'
      },
      {
        title: 'Prevention and Lifestyle',
        content: 'Prevention: avoid Pitta-aggravating factors (hot, spicy, sour foods, sun exposure, anger). Keep skin clean and dry. Boost immunity with Guduchi and Amalaki. Avoid sharing personal items. During treatment: complete rest, cool environment, light diet. Recovery: gradual return to normal activities, Rasayana for immunity rebuilding.',
        clinicalRelevance: 'Prevention of recurrence is important - Pitta-Rakta vitiation tendency requires long-term management.'
      }
    ],
    doshaDiscussion: [
      'Pittaja Visarpa - most common, red, burning, rapid spreading, fever, thirst, Rakta vitiation prominent',
      'Kaphaja Visarpa - slow spreading, itching, pale color, mucus, Kapha obstruction',
      'Vataja Visarpa - painful, dark-colored, dry, intermittent spreading, Vata movement',
      'Sannipataja - mixed features, severe, rapid progression, poor prognosis',
      'Granthi Visarpa - glandular involvement, deeper tissue, Kapha-Meda with Pitta-Rakta',
      'Rakta is involved in all types - Raktamokshana benefits Pittaja type most',
      'Agni status affects recovery - Mandagni requires Deepana alongside treatment'
    ],
    treatmentProtocols: [
      {
        condition: 'Visarpa (General)',
        treatment: 'Shamana + external Lepa + Raktamokshana if Pittaja',
        herbs: ['Haridra (Curcuma longa)', 'Nimba (Azadirachta indica)', 'Sariva (Hemidesmus indicus)', 'Chandana (Santalum album)', 'Guduchi (Tinospora cordifolia)'],
        dosage: 'Haridra Churna 3 grams with honey twice daily, Guduchi Sattva 500mg twice daily',
        duration: '2-4 weeks',
        precautions: ['Cool diet', 'Avoid spicy food', 'Keep affected area clean', 'Rest', 'Cool environment']
      },
      {
        condition: 'Pittaja Visarpa',
        treatment: 'Raktamokshana + Pitta Shamana + cooling herbs',
        herbs: ['Guduchi', 'Chandana', 'Haridra', 'Sariva', 'Ushira', 'Amalaki'],
        dosage: 'Guduchi Sattva 500mg with Chandana Kashaya 40ml twice daily',
        duration: '2-4 weeks',
        precautions: ['Leech therapy for localized, venesection for widespread', 'Cool environment', 'Light diet', 'Rest']
      },
      {
        condition: 'Granthi Visarpa',
        treatment: 'Shotha Shamana + Guggulu + external treatment',
        herbs: ['Guggulu', 'Guduchi', 'Haridra', 'Nimba', 'Triphala'],
        dosage: 'Kaishore Guggulu 500mg twice daily, Guduchi Kashaya 40ml twice daily',
        duration: '4-8 weeks',
        precautions: ['Warm Lepa for Granthi', 'Monitor for complications', 'Adequate rest', 'Nutritious diet']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Visarpa (Herpes/Erysipelas)',
        sanskrit: 'विसर्प',
        etiology: 'Pitta-Rakta vitiation causing spreading skin inflammation. Causes: excessive spicy/sour food, sun exposure, anger, infections, weakened immunity. Kapha involvement in chronic cases.',
        symptoms: ['Spreading rash (Visarpa)', 'Burning (Daha)', 'Redness (Rakta)', 'Pain (Shula)', 'Fever (Jwara)', 'Thirst (Trishna)', 'Rapid spreading in Pittaja type'],
        prognosis: 'Sadhya (curable) with timely treatment. Kricchra Sadhya in Sannipataja and Granthi types.',
        treatment: 'Pittaja: Raktamokshana + Pitta Shamana. Kaphaja: Shodhana + Kapha Shamana. Vataja: Snehana + Vata Shamana. External: cooling Lepa application.'
      },
      {
        name: 'Granthi Visarpa (Glandular Herpes)',
        sanskrit: 'ग्रन्थि विसर्प',
        etiology: 'Deeper tissue involvement with Pitta-Rakta-Kapha vitiation. Glandular inflammation along with skin spreading. Often secondary to untreated simple Visarpa.',
        symptoms: ['Painful lymph node swelling', 'Skin spreading', 'Deep pain', 'Fever', 'Fatigue', 'Slow progression'],
        prognosis: 'Kricchra Sadhya (difficult to cure) - requires intensive and prolonged treatment.',
        treatment: 'Shotha Shamana with Guggulu, Guduchi. External warm Lepa for Granthi. Raktamokshana if severely inflamed. Rasayana for immunity.'
      }
    ],
    importantVerses: [
      '21.1.1 - We shall explain the treatment of Visarpa',
      '21.1.3 - Visarpa is primarily caused by Pitta and Rakta vitiation',
      '21.1.5 - Vataja: dark, painful. Pittaja: red, burning, rapid. Kaphaja: itchy, slow',
      '21.2.1 - Haridra, Nimba, Sariva, Chandana, and Guduchi are the best treatments',
      '21.2.5 - Raktamokshana is indicated for Pittaja Visarpa'
    ],
    clinicalApplications: [
      'Herpes zoster - Visarpa protocol with Guduchi and Raktamokshana',
      'Erysipelas - Pittaja Visarpa treatment with cooling herbs',
      'Cellulitis - spreading skin infection management',
      'Skin inflammation - Rakta-Pitta Shamana with Haridra',
      'Glandular infections - Granthi Visarpa with Guggulu',
      'Immune-boosting - Rasayana after Visarpa recovery',
      'External applications - Lepa for local inflammation',
      'Prevention - Pitta-pacifying lifestyle for recurrence prevention'
    ]
  },
  {
    id: 'chikitsa-22',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 22,
    name: 'Trishna Chikitsa',
    sanskrit: 'तृष्णा चिकित्सा',
    english: 'Management of Excessive Thirst Disorders',
    summary: 'Trishna Chikitsa provides comprehensive management of excessive thirst (Trishna) - a symptom that can indicate various underlying conditions. The chapter describes five types: Vataja (dry mouth, intermittent), Pittaja (burning, not relieved by drinking), Kaphaja (heaviness, mild thirst), Sannipataja (mixed, severe), and Amaja (associated with Ama/digestive toxins). Treatment is type-specific: Pitta Shamana with cooling herbs for Pittaja, Ama Pachana for Amaja, and Vata Shamana for Vataja. Chandana, Ushira, Amalaki, and Shatavari are the primary herbs. Hydration management is critical - not just water but medicated liquids.',
    keyConcepts: [
      'Five types: Vataja, Pittaja (most common), Kaphaja, Sannipataja, and Amaja',
      'Pittaja Trishna - burning thirst not relieved by drinking, most common type',
      'Vataja Trishna - dry mouth, intermittent thirst, associated with Ruksha (dry) quality',
      'Kaphaja Trishna - heaviness with mild thirst, associated with Guru (heavy) quality',
      'Sannipataja Trishna - mixed features, severe, poor prognosis',
      'Amaja Trishna - caused by Ama (digestive toxins), associated with Mandagni',
      'Trishna can indicate serious conditions: Prameha (diabetes), Jwara (fever), dehydration',
      'Chandana (Santalum album) - primary cooling herb, Pitta Shamana',
      'Ushira (Vetiveria zizanioides) - cooling, Pitta Shamana, Trishna Shamana',
      'Amalaki (Emblica officinalis) - Pitta Shamana, Rasayana, vitamin C',
      'Shatavari (Asparagus racemosus) - cooling, nourishing, Pitta Shamana',
      'Hydration management: medicated liquids (Chandana Kashaya, Ushira Kashaya), not just plain water',
      'Diet should be cooling and hydrating - avoid hot, spicy, and dehydrating substances'
    ],
    shlokas: [
      {
        number: '22.1.1',
        sanskrit: 'तृष्णाचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Trishna (excessive thirst).',
        commentary: 'Opening verse introducing thirst disorder management.'
      },
      {
        number: '22.1.3',
        sanskrit: 'तृष्णा पञ्चविधा प्रोक्ता वातजा पित्तजा कफजा सन्निपातजा आमजा च |',
        translation: 'Trishna (excessive thirst) is of five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Amaja.',
        commentary: 'Classifies excessive thirst into five types based on dosha and Ama.'
      },
      {
        number: '22.1.5',
        sanskrit: 'पित्तजा दाहवती तृष्णा जलसेवनानुपशान्तिः |',
        translation: 'Pittaja Trishna has burning sensation and is not relieved by drinking water.',
        commentary: 'Key diagnostic feature of the most common type.'
      },
      {
        number: '22.2.1',
        sanskrit: 'चन्दनमुशीरमामलकं शतावरी तृष्णाहरं परम् |',
        translation: 'Chandana, Ushira, Amalaki, and Shatavari are the best Trishna Shamana herbs.',
        commentary: 'Lists the four primary herbs for thirst management.'
      },
      {
        number: '22.2.5',
        sanskrit: 'शीतजलं चन्दनोदकं तृष्णायामनुपानम् |',
        translation: 'Cold water and Chandana water are the best vehicles for thirst.',
        commentary: 'Medicated liquids are superior to plain water for thirst management.'
      }
    ],
    topics: [
      {
        title: 'Five Types of Trishna with Diagnostic Features',
        content: 'Vataja: dry mouth (Mukha Shosha), intermittent thirst, rough tongue, associated with Vata symptoms. Pittaja: burning thirst (Daha), not relieved by drinking, bitter taste, yellow urine, associated with Pitta symptoms. Kaphaja: mild thirst with heaviness (Guruta), white tongue, associated with Kapha symptoms. Sannipataja: mixed features, severe, continuous thirst, poor prognosis. Amaja: thirst with Ama symptoms - coated tongue, anorexia, heaviness, Mandagni.',
        clinicalRelevance: 'Type determination guides treatment - Amaja needs Ama Pachana before Shamana.'
      },
      {
        title: 'Amaja Trishna and Ama Connection',
        content: 'Amaja Trishna is caused by Ama (digestive toxins) blocking Rasa Dhatu channels. The body cannot properly absorb and distribute fluids despite adequate intake. Symptoms: thirst with coated tongue, anorexia, heaviness, Mandagni. Treatment: Ama Pachana with Musta, Haridra, Trikatu before Pitta Shamana. Light diet (Laghu Ahara) essential. After Ama clears, Pitta Shamana with Chandana and Ushira.',
        clinicalRelevance: 'Amaja Trishna requires a different treatment sequence - Ama Pachana first, then Shamana.'
      },
      {
        title: 'Medicated Liquids for Thirst',
        content: 'Chandana Kashaya: sandalwood decoction - cooling, Pitta Shamana. Ushira Kashaya: vetiver decoction - cooling, Trishna Shamana. Amalaki Kashaya: Indian gooseberry decoction - Pitta Shamana, Rasayana. Shatavari Kashaya: asparagus decoction - nourishing, Pitta Shamana. Coconut water: natural coolant, hydrating. Buttermilk (Takra): for Amaja Trishna - light, digestive. Avoid: plain cold water in excess (may worsen Kapha).',
        clinicalRelevance: 'Medicated liquids address the root cause of thirst while hydrating - superior to plain water.'
      },
      {
        title: 'Trishna as a Symptom of Serious Conditions',
        content: 'Trishna can indicate: Prameha (diabetes) - persistent thirst with excess urination. Jwara (fever) - thirst with fever and burning. Dehydration - from diarrhea, vomiting, or excessive sweating. Raktapitta (bleeding disorder) - thirst with bleeding. Pitta-Rakta vitiation - thirst with skin inflammation. Always investigate underlying cause - treating Trishna alone without addressing the root disease is incomplete.',
        clinicalRelevance: 'Persistent Trishna requires investigation for underlying conditions - especially diabetes and fever.'
      },
      {
        title: 'Diet and Lifestyle for Thirst Management',
        content: 'Pathya: cooling foods - cucumber, watermelon, coconut, buttermilk, sweet fruits, old rice, barley. Apathya: hot, spicy, sour, salty foods, alcohol, coffee, tea, fried food. Lifestyle: avoid sun exposure, cool environment, rest during peak heat, wear light clothing. Hydration schedule: small frequent sips of medicated liquids rather than large quantities at once.',
        clinicalRelevance: 'Diet and lifestyle modification prevents recurrence and supports treatment.'
      }
    ],
    doshaDiscussion: [
      'Pittaja Trishna - most common, burning (Daha), not relieved by drinking, bitter taste, yellow urine',
      'Vataja Trishna - dry mouth (Mukha Shosha), intermittent, rough tongue, Ruksha (dry) quality',
      'Kaphaja Trishna - mild thirst with heaviness (Guruta), white tongue, Guru (heavy) quality',
      'Sannipataja - mixed features, severe, continuous thirst, poor prognosis',
      'Amaja Trishna - Ama blocking Rasa Dhatu channels, Mandagni, coated tongue',
      'Agni status is critical - Mandagni causes Ama which blocks fluid distribution',
      'Rasa Dhatu involvement - Trishna indicates disturbance in Rasa (nutrient fluid) circulation'
    ],
    treatmentProtocols: [
      {
        condition: 'Trishna (General Excessive Thirst)',
        treatment: 'Pitta Shamana + cooling herbs + medicated liquids',
        herbs: ['Chandana (Santalum album)', 'Ushira (Vetiveria zizanioides)', 'Amalaki (Emblica officinalis)', 'Shatavari (Asparagus racemosus)'],
        dosage: 'Chandana Kashaya 40ml with cold water 3-4 times daily, Amalaki Churna 3g with honey twice daily',
        duration: '1-2 weeks',
        precautions: ['Cool drinks', 'Avoid hot food', 'Hydration with medicated liquids', 'Rest', 'Cool environment']
      },
      {
        condition: 'Amaja Trishna (Toxin-Related Thirst)',
        treatment: 'Ama Pachana + Pitta Shamana',
        herbs: ['Musta (Cyperus rotundus)', 'Amalaki', 'Chandana', 'Guduchi', 'Triphala'],
        dosage: 'Musta Kashaya 40ml twice daily before meals, Triphala Churna 3g at bedtime',
        duration: '2-3 weeks',
        precautions: ['Light diet', 'Avoid heavy food', 'Hydration', 'Agni Deepana', 'Regular meals']
      },
      {
        condition: 'Prameha Trishna (Diabetes-Related Thirst)',
        treatment: 'Prameha Shamana + Trishna Shamana',
        herbs: ['Amalaki', 'Guduchi', 'Shilajatu', 'Meshashringi', 'Jambu'],
        dosage: 'Shilajatu 250mg with Amalaki Churna 3g twice daily',
        duration: '3-6 months',
        precautions: ['Diabetic diet', 'Regular exercise', 'Monitor blood sugar', 'Avoid sugar', 'Regular follow-up']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Trishna (Excessive Thirst)',
        sanskrit: 'तृष्णा',
        etiology: 'Pitta vitiation causing excessive thirst. Can be primary or secondary to Prameha, Jwara, dehydration. Ama involvement in Amaja type. Rasa Dhatu disturbance in all types.',
        symptoms: ['Excessive thirst (Trishna)', 'Dry mouth (Mukha Shosha)', 'Burning (Daha)', 'Not relieved by drinking', 'Weakness (Daurbalya)', 'Fatigue'],
        prognosis: 'Sadhya (curable) with proper treatment. Kricchra Sadhya in Sannipataja type.',
        treatment: 'Pitta Shamana with Chandana, Ushira. Hydration with medicated liquids. Treat underlying cause if secondary.'
      },
      {
        name: 'Amaja Trishna (Toxin-Related Thirst)',
        sanskrit: 'आमज तृष्णा',
        etiology: 'Ama (digestive toxins) blocking Rasa Dhatu channels. Mandagni causes improper fluid distribution. Dietary indiscretion, heavy food, incompatible combinations.',
        symptoms: ['Thirst with coated tongue', 'Anorexia', 'Heaviness', 'Mandagni', 'Not relieved by drinking', 'Abdominal discomfort'],
        prognosis: 'Sadhya (curable) with Ama Pachana and Shamana.',
        treatment: 'Ama Pachana with Musta, Trikatu. Light diet. Then Pitta Shamana with Chandana, Ushira. Agni Deepana.'
      }
    ],
    importantVerses: [
      '22.1.1 - We shall explain the treatment of Trishna',
      '22.1.3 - Five types: Vataja, Pittaja, Kaphaja, Sannipataja, and Amaja',
      '22.1.5 - Pittaja Trishna has burning and is not relieved by drinking',
      '22.2.1 - Chandana, Ushira, Amalaki, and Shatavari are the best treatments',
      '22.2.5 - Cold water and Chandana water are the best vehicles'
    ],
    clinicalApplications: [
      'Excessive thirst - Trishna management with Pitta Shamana',
      'Diabetes-related thirst - Prameha Trishna treatment with Shilajatu',
      'Dehydration - supportive care with medicated liquids',
      'Fever-related thirst - Jwara Trishna protocol with Chandana',
      'Toxin-related thirst - Amaja Trishna with Ama Pachana',
      'Post-illness recovery - Rasayana for Rasa Dhatu restoration',
      'Heat-related thirst - Pitta Shamana with Ushira',
      'Chronic thirst - investigate underlying cause with comprehensive treatment'
    ]
  },
  {
    id: 'chikitsa-23',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 23,
    name: 'Visha Chikitsa',
    sanskrit: 'विष चिकित्सा',
    english: 'Management of Toxicology and Poisoning',
    summary: 'Visha Chikitsa provides comprehensive management of poisoning conditions. The chapter describes three main types: Sthavara Visha (plant and mineral poisons like Dhatura, Aconite, Arsenic, Mercury), Jangama Visha (animal poisons like snake, scorpion, spider bites), and Garavisha (chronic poisoning through food combinations, environmental toxins, or intentional poisoning). Treatment is type-specific: Vamana (emesis) for acute ingestion, Vishaghna herbs (Shirisha, Aragvadha, Saptaparna) as antidotes, and Shodhana for chronic cases. Emergency management is critical for acute poisoning. Prevention through awareness and avoidance is emphasized.',
    keyConcepts: [
      'Three types: Sthavara (plant/mineral), Jangama (animal), Garavisha (chronic poison)',
      'Sthavara Visha: plant poisons (Dhatura, Aconite, Abrus) and mineral poisons (Arsenic, Mercury, Lead)',
      'Jangama Visha: animal poisons - snake (Sarpa), scorpion (Vrishchika), spider (Luta), dog (Shvada)',
      'Garavisha: chronic poisoning through incompatible food combinations, environmental toxins, or intentional poisoning',
      'Treatment includes Vamana (emesis) for acute, Vishaghna herbs as antidotes, Shodhana for chronic',
      'Shirisha (Albizia lebbeck) - universal antidote, Vishaghna, anti-allergic',
      'Aragvadha (Cassia fistula) - purgative antidote, mild Shodhana',
      'Saptaparna (Alstonia scholaris) - anti-venom, Vishaghna',
      'Haridra (Curcuma longa) - anti-inflammatory, Vishaghna, Rakta-Shodhana',
      'Nimba (Azadirachta indica) - detoxifier, Vishaghna, Krimighna',
      'Emergency management is critical - Vamana within 30 minutes of ingestion',
      'Prevention through awareness and avoidance is emphasized'
    ],
    shlokas: [
      {
        number: '23.1.1',
        sanskrit: 'विषचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Visha (poisoning).',
        commentary: 'Opening verse introducing toxicology management.'
      },
      {
        number: '23.1.3',
        sanskrit: 'विषं त्रिविधं स्थावरं जंगमं गरविषम् |',
        translation: 'Poison is of three types: Sthavara (plant/mineral), Jangama (animal), and Garavisha (chronic poison).',
        commentary: 'Classifies poisons into three fundamental categories.'
      },
      {
        number: '23.1.5',
        sanskrit: 'स्थावरं वृक्षगुल्मौषधिभ्यः | जंगमं सर्पवृश्चिकलूतादिभ्यः |',
        translation: 'Sthavara comes from plants and minerals. Jangama comes from snake, scorpion, spider, etc.',
        commentary: 'Specific sources of each poison type.'
      },
      {
        number: '23.2.1',
        sanskrit: 'शिरीषो अरग्वधः सप्तपर्णं विषहरं परम् |',
        translation: 'Shirisha, Aragvadha, and Saptaparna are the best Vishaghna (anti-poison) herbs.',
        commentary: 'Lists the three primary anti-poison herbs.'
      },
      {
        number: '23.2.5',
        sanskrit: 'वमनं विषमध्ये प्रथमम् |',
        translation: 'Vamana (emesis) is the first treatment in acute poisoning.',
        commentary: 'Establishes emesis as the primary emergency measure.'
      }
    ],
    topics: [
      {
        title: 'Sthavara Visha (Plant and Mineral Poisons)',
        content: 'Plant poisons: Dhatura (Datura stramonium) - anticholinergic toxicity, Aconite (Aconitum napellus) - cardiac toxicity, Abrus (Abrus precatorius) - abrin toxicity, Croton (Croton tiglium) - severe GI irritation. Mineral poisons: Arsenic (Haritala) - multi-organ toxicity, Mercury (Parada) - neurological/renal toxicity, Lead (Sisa) - neurological/hematological toxicity. Treatment: Vamana immediately, Vishaghna herbs, Shodhana.',
        clinicalRelevance: 'Specific antidotes for each poison type - knowledge of local poisonous plants is essential.'
      },
      {
        title: 'Jangama Visha (Animal Poisons)',
        content: 'Snake (Sarpa Visha): Cobra (Naja) - neurotoxic, Viper (Daboia) - hemotoxic. Scorpion (Vrishchika Visha): pain, local swelling, systemic effects. Spider (Luta Visha): local necrosis, systemic effects. Dog (Shvada Visha): rabies risk. Treatment: Raktamokshana locally, Vishaghna herbs, anti-venom herbs. Snake bite: pressure bandage, immobilization, immediate medical care.',
        clinicalRelevance: 'Snake bite is a medical emergency - modern anti-venom should be used alongside Ayurvedic support.'
      },
      {
        title: 'Garavisha (Chronic Poisoning)',
        content: 'Garavisha: chronic poisoning through incompatible food combinations (Viruddha Ahara), environmental toxins (water/air pollution), intentional poisoning (food adulteration). Symptoms: gradual onset, chronic fatigue, digestive issues, skin changes, organ dysfunction. Treatment: Shodhana (Vamana, Virechana), Vishaghna herbs, Rasayana for tissue repair. Prevention: food safety awareness, water purification, avoid incompatible combinations.',
        clinicalRelevance: 'Garavisha is often missed in diagnosis - always consider in chronic unexplained symptoms.'
      },
      {
        title: 'Emergency Management Protocol',
        content: 'Immediate actions: (1) Remove from poison source. (2) Vamana within 30 minutes if ingested - use warm salt water or Madanaphala. (3) Raktamokshana if bitten/stung - leech therapy or venesection. (4) Vishaghna herbs - Shirisha Kashaya immediately. (5) Supportive care - maintain airway, hydration, monitoring. (6) Modern emergency care integration - anti-venom, ICU if needed.',
        clinicalRelevance: 'Time is critical in acute poisoning - the first 30 minutes determine outcomes.'
      },
      {
        title: 'Vishaghna Herbs in Detail',
        content: 'Shirisha (Albizia lebbeck): universal antidote, anti-allergic, anti-histaminic. Aragvadha (Cassia fistula): purgative, helps eliminate ingested poison. Saptaparna (Alstonia scholaris): anti-venom, bitter tonic. Haridra (Curcuma longa): anti-inflammatory, Rakta-Shodhana. Nimba (Azadirachta indica): detoxifier, Krimighna. Guduchi (Tinospora cordifolia): immunomodulator, Rasayana. These herbs work through multiple mechanisms: neutralization, elimination, and tissue protection.',
        clinicalRelevance: 'Combining multiple Vishaghna herbs provides broader spectrum protection.'
      }
    ],
    doshaDiscussion: [
      'Sthavara Visha - primarily Pitta with Vata (burning, pain, organ dysfunction)',
      'Jangama Visha - varies by animal type (snake: Vata-Pitta, scorpion: Pitta, spider: Kapha-Pitta)',
      'Garavisha - Kapha with Pitta involvement (chronic, slow progression)',
      'Agni status affects poison absorption - weak Agni may slow absorption but worsens prognosis',
      'Rakta is involved in all types - Raktamokshana is beneficial',
      'Treatment sequence: Vamana first, then Vishaghna, then Shamana and Rasayana'
    ],
    treatmentProtocols: [
      {
        condition: 'Acute Poisoning (Sthavara Visha)',
        treatment: 'Vamana + Vishaghna herbs + Shodhana',
        herbs: ['Shirisha (Albizia lebbeck)', 'Aragvadha (Cassia fistula)', 'Saptaparna (Alstonia scholaris)', 'Haridra (Curcuma longa)', 'Nimba (Azadirachta indica)'],
        dosage: 'Shirisha Kashaya 40ml immediately, repeated every 2 hours. Vamana with warm salt water.',
        duration: 'Emergency - immediate treatment, then 1-2 weeks recovery',
        precautions: ['Emergency management', 'Hospitalization may be needed', 'Supportive care', 'Monitor vital signs']
      },
      {
        condition: 'Snake Bite (Sarpa Visha)',
        treatment: 'Raktamokshana + Vishaghna + emergency care',
        herbs: ['Shirisha', 'Haridra', 'Guduchi', 'Chandana'],
        dosage: 'Shirisha Kashaya 40ml immediately. Haridra paste locally around bite.',
        duration: 'Emergency - immediate, then 2-4 weeks recovery',
        precautions: ['Pressure bandage above bite', 'Immobilization', 'Modern anti-venom ASAP', 'ICU if needed', 'Never cut or suck the wound']
      },
      {
        condition: 'Garavisha (Chronic Poisoning)',
        treatment: 'Shodhana + Rasayana + Vishaghna',
        herbs: ['Shirisha', 'Haridra', 'Amalaki', 'Guduchi', 'Triphala'],
        dosage: 'Shirisha Churna 3g with honey twice daily, Triphala Churna 3g at bedtime',
        duration: '2-4 weeks Shodhana, then 3-6 months Rasayana',
        precautions: ['Avoid exposure to toxins', 'Detox diet', 'Regular monitoring', 'Organ function tests']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Sthavara Visha (Plant/Mineral Poisoning)',
        sanskrit: 'स्थावर विष',
        etiology: 'Ingestion or exposure to plant or mineral poisons. Dhatura, Aconite, Arsenic, Mercury, Lead. Can be accidental, suicidal, or homicidal.',
        symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Weakness', 'Organ dysfunction', 'Altered consciousness', 'Cardiac arrhythmia'],
        prognosis: 'Variable - depends on poison type, amount, and time to treatment. Early treatment improves outcomes.',
        treatment: 'Vamana within 30 minutes. Vishaghna herbs immediately. Shodhana for elimination. Supportive care. Modern emergency care if severe.'
      },
      {
        name: 'Garavisha (Chronic Poisoning)',
        sanskrit: 'गरविष',
        etiology: 'Chronic exposure to low-level toxins through food, water, air, or intentional poisoning. Viruddha Ahara (incompatible food), environmental pollution, food adulteration.',
        symptoms: ['Chronic fatigue', 'Digestive issues', 'Skin changes', 'Hair loss', 'Nail changes', 'Organ dysfunction', 'Unexplained symptoms'],
        prognosis: 'Sadhya (curable) if source identified and removed. Kricchra Sadhya in chronic cases with organ damage.',
        treatment: 'Shodhana (Vamana, Virechana) for elimination. Vishaghna herbs for neutralization. Rasayana for tissue repair. Remove exposure source.'
      }
    ],
    importantVerses: [
      '23.1.1 - We shall explain the treatment of Visha (poisoning)',
      '23.1.3 - Three types: Sthavara, Jangama, and Garavisha',
      '23.1.5 - Sthavara from plants/minerals, Jangama from snake/scorpion/spider',
      '23.2.1 - Shirisha, Aragvadha, and Saptaparna are the best Vishaghna herbs',
      '23.2.5 - Vamana is the first treatment in acute poisoning'
    ],
    clinicalApplications: [
      'Snake bite - Jangama Visha protocol with modern anti-venom integration',
      'Food poisoning - Sthavara Visha treatment with Vamana',
      'Chronic toxin exposure - Garavisha management with Shodhana',
      'Drug overdose - Vishaghna supportive care',
      'Environmental toxicity - Garavisha protocol with Rasayana',
      'Allergic reactions - Shirisha-based anti-allergic treatment',
      'Food adulteration - prevention and Garavisha treatment',
      'Emergency toxicology - integrated Ayurvedic-modern approach'
    ]
  },
  {
    id: 'chikitsa-24',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 24,
    name: 'Madatyaya Chikitsa',
    sanskrit: 'मदात्यय चिकित्सा',
    english: 'Management of Alcoholism and Alcohol-Related Disorders',
    summary: 'Madatyaya Chikitsa provides comprehensive management of alcohol-related disorders. The chapter describes three stages: Prathama (first stage - mild, curable), Madhya (middle stage - moderate, manageable), and Antya (final stage - severe, often incurable). Alcoholism involves Pitta-Kapha vitiation affecting Manas (mind), Yakrit (liver), and Majja Dhatu (nervous tissue). Treatment includes Shamana with Pitta-Kapha Shamana herbs, Shodhana for detoxification, and Sattvavajaya (psychotherapy) for de-addiction. Herbs like Amla, Kashmarya, and Brahmi are primary. Dhatura is mentioned cautiously for severe withdrawal. Diet should be cooling and liver-protective.',
    keyConcepts: [
      'Three stages: Prathama (first - mild, curable), Madhya (middle - moderate, manageable), Antya (final - severe, often incurable)',
      'Alcoholism involves Pitta-Kapha vitiation affecting Manas (mind), Yakrit (liver), Majja Dhatu (nervous tissue)',
      'Prathama Madatyaya - Pitta dominant, early symptoms, Sadhya (curable)',
      'Madhya Madatyaya - Pitta-Kapha, moderate symptoms, Yapya (manageable)',
      'Antya Madatyaya - Sannipata, severe, often Asadhya (incurable)',
      'Treatment includes Shamana, Shodhana, and Sattvavajaya (psychotherapy)',
      'Amlaki (Emblica officinalis) - primary herb: Pitta Shamana, liver protective, Rasayana',
      'Kashmarya (Gmelina arborea) - Pitta Shamana, Medhya (brain tonic)',
      'Brahmi (Bacopa monnieri) - Medhya, Manasika Shamana, de-addiction support',
      'Dhatura (Datura stramonium) - used cautiously for severe withdrawal symptoms only',
      'Yakrit (liver) protection is essential - Kalmegh, Bhumyamalaki, Kutki',
      'Sattvavajaya (psychotherapy) is essential for sustained de-addiction',
      'Diet should be cooling, liver-protective, and easy to digest'
    ],
    shlokas: [
      {
        number: '24.1.1',
        sanskrit: 'मदात्ययचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Madatyaya (alcoholism).',
        commentary: 'Opening verse introducing alcoholism management.'
      },
      {
        number: '24.1.3',
        sanskrit: 'मदात्ययः त्रिविधः प्रथमो मध्यो अन्त्यश्च |',
        translation: 'Madatyaya (alcoholism) is of three types: Prathama (first), Madhya (middle), and Antya (final).',
        commentary: 'Classifies alcoholism into three stages based on severity and chronicity.'
      },
      {
        number: '24.1.5',
        sanskrit: 'प्रथमे पित्तं मध्ये पित्तकफः अन्त्ये सन्निपातः |',
        translation: 'In the first stage Pitta is dominant, in the middle Pitta-Kapha, in the final Sannipata (all three doshas).',
        commentary: 'Dosha progression through stages determines treatment approach.'
      },
      {
        number: '24.2.1',
        sanskrit: 'आमलकी काश्मर्यं ब्राह्मी मदात्यये शमनम् |',
        translation: 'Amalaki, Kashmarya, and Brahmi are the primary Shamana herbs for alcoholism.',
        commentary: 'Lists the three primary herbs for alcoholism management.'
      },
      {
        number: '24.3.1',
        sanskrit: 'सत्त्वावजयः मदात्यये अन्त्यावस्थायाम् |',
        translation: 'Sattvavajaya (psychotherapy) is essential in the final stage of alcoholism.',
        commentary: 'Psychological intervention is critical for advanced alcoholism.'
      }
    ],
    topics: [
      {
        title: 'Three Stages of Madatyaya',
        content: 'Prathama (first): mild symptoms - occasional excess, early liver changes, mild anxiety, curable. Madhya (middle): moderate symptoms - daily drinking, liver damage, tremors, anxiety, manageable. Antya (final): severe symptoms - complete dependence, liver cirrhosis, neurological damage, behavioral changes, often incurable. Each stage requires different treatment intensity.',
        clinicalRelevance: 'Early intervention in Prathama stage prevents progression to incurable Antya stage.'
      },
      {
        title: 'Liver Protection (Yakrit Raksha)',
        content: 'Alcohol damages Yakrit (liver) progressively. Protective herbs: Kalmegh (Andrographis paniculata) - hepatoprotective, Bhumyamalaki (Phyllanthus niruri) - liver regenerative, Kutki (Picrorhiza kurroa) - hepatoprotective, Amlaki - antioxidant, Guduchi - immunomodulator. Treatment: hepatoprotective herbs alongside de-addiction. Avoid: hepatotoxic substances, fatty food, excess medication.',
        clinicalRelevance: 'Liver protection is essential - irreversible liver damage changes prognosis significantly.'
      },
      {
        title: 'Sattvavajaya (Psychotherapy) for De-addiction',
        content: 'Sattvavajaya components: counseling for motivation, cognitive behavioral therapy, stress management, meditation, yoga. Supportive herbs: Brahmi (Bacopa), Jatamansi (Nardostachys), Ashwagandha (Withania), Shankhapushpi (Convolvulus). Environment: supportive family, avoiding triggers, structured routine. Integration: modern de-addiction programs alongside Ayurvedic support.',
        clinicalRelevance: 'Sustained de-addiction requires psychological support - herbs alone are insufficient.'
      },
      {
        title: 'Withdrawal Management',
        content: 'Alcohol withdrawal can be dangerous: tremors, anxiety, insomnia, seizures, delirium tremens. Management: supportive care, hydration, nutrition, calming herbs (Brahmi, Jatamansi). Severe withdrawal: modern medical supervision essential. Dhatura is mentioned cautiously for severe withdrawal but requires expert supervision due to toxicity. Prevention: gradual reduction rather than abrupt cessation in severe cases.',
        clinicalRelevance: 'Alcohol withdrawal can be life-threatening - modern medical supervision is essential for severe cases.'
      }
    ],
    doshaDiscussion: [
      'Prathama Madatyaya - Pitta dominant, early liver inflammation, anxiety',
      'Madhya Madatyaya - Pitta-Kapha, moderate liver damage, tremors, behavioral changes',
      'Antya Madatyaya - Sannipata, severe liver cirrhosis, neurological damage, often incurable',
      'Majja Dhatu involvement - neurological symptoms from alcohol damage to nervous tissue',
      'Agni status affected - Mandagni from liver damage, requires Deepana',
      'Manas Dosha involvement - Rajas and Tamas increase with alcohol abuse'
    ],
    treatmentProtocols: [
      {
        condition: 'Madatyaya (Alcoholism)',
        treatment: 'Shamana + Shodhana + Sattvavajaya',
        herbs: ['Amlaki (Emblica officinalis)', 'Kashmarya (Gmelina arborea)', 'Brahmi (Bacopa monnieri)', 'Kalmegh (Andrographis paniculata)', 'Guduchi (Tinospora cordifolia)'],
        dosage: 'Amlaki Kashaya 40ml twice daily, Brahmi Churna 3g with warm milk at bedtime',
        duration: '3-6 months minimum',
        precautions: ['Complete alcohol cessation', 'Supportive environment', 'Counseling', 'Nutritious diet', 'Liver function monitoring']
      },
      {
        condition: 'Alcohol Liver Disease',
        treatment: 'Yakrit Shamana + hepatoprotective herbs',
        herbs: ['Kalmegh', 'Bhumyamalaki', 'Kutki', 'Amlaki', 'Guduchi'],
        dosage: 'Kalmegha Churna 1g twice daily, Amlaki Kashaya 40ml twice daily',
        duration: '3-6 months',
        precautions: ['Avoid hepatotoxic substances', 'Light diet', 'Regular liver function tests', 'Rest']
      },
      {
        condition: 'Alcohol Withdrawal',
        treatment: 'Supportive care + calming herbs + Sattvavajaya',
        herbs: ['Brahmi', 'Jatamansi', 'Ashwagandha', 'Shankhapushpi'],
        dosage: 'Brahmi Ghrita 10g twice daily with warm milk',
        duration: '2-4 weeks acute, then long-term support',
        precautions: ['Medical supervision for severe withdrawal', 'Gradual reduction', 'Hydration', 'Nutrition', 'Supportive environment']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Madatyaya (Alcoholism)',
        sanskrit: 'मदात्यय',
        etiology: 'Excessive alcohol consumption causing progressive dosha vitiation. Pitta-Kapha involvement affecting liver, brain, and mind. Social, psychological, and genetic factors contribute.',
        symptoms: ['Tremors (Kampa)', 'Anxiety (Chittodvega)', 'Insomnia (Anidra)', 'Liver dysfunction (Yakrit Daurbalya)', 'Behavioral changes', 'Dependence', 'Withdrawal symptoms'],
        prognosis: 'Sadhya (curable) in Prathama stage. Yapya (manageable) in Madhya. Asadhya (incurable) in Antya with organ damage.',
        treatment: 'Stage-specific: Prathama - Shamana + counseling. Madhya - Shodhana + Shamana + Sattvavajaya. Antya - supportive care + Rasayana + Sattvavajaya.'
      }
    ],
    importantVerses: [
      '24.1.1 - We shall explain the treatment of Madatyaya',
      '24.1.3 - Three stages: Prathama, Madhya, and Antya',
      '24.1.5 - Pitta in first, Pitta-Kapha in middle, Sannipata in final',
      '24.2.1 - Amalaki, Kashmarya, and Brahmi are the primary Shamana herbs',
      '24.3.1 - Sattvavajaya is essential in the final stage'
    ],
    clinicalApplications: [
      'Alcoholism - comprehensive Madatyaya management with stage-specific treatment',
      'Alcohol withdrawal - supportive treatment with calming herbs',
      'Liver disease from alcohol - Yakrit Shamana with hepatoprotective herbs',
      'De-addiction - integrated Sattvavajaya with modern programs',
      'Alcoholic neuropathy - Majja Dhatu restoration with Rasayana',
      'Alcoholic hepatitis - Pitta Shamana with Kalmegh',
      'Behavioral changes - Manasika Shamana with Medhya Rasayana',
      'Prevention - Sadvritta and awareness programs'
    ]
  },
  {
    id: 'chikitsa-25',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 25,
    name: 'Dwivraniya Chikitsa',
    sanskrit: 'द्विव्रणीय चिकित्सा',
    english: 'Management of Two Types of Wounds',
    summary: 'Dwivraniya Chikitsa provides comprehensive management of wounds classified into two fundamental types: Shuddha Vrana (clean, healthy wound) and Dushta Vrana (infected, unhealthy wound). The chapter describes wound healing principles based on dosha involvement: Vata Vrana (dry, painful, slow healing), Pitta Vrana (inflamed, burning, rapid progression), and Kapha Vrana (mucus, slow healing, itching). Treatment is type-specific: Ropana (healing) for Shuddha, Shodhana (cleansing) + Krimighna (anti-microbial) for Dushta. Haridra, Nimba, Guggulu, Madhu (honey), and Ghrita are key wound healing agents. Wound hygiene is essential.',
    keyConcepts: [
      'Two types: Shuddha (clean, healthy) and Dushta (infected, unhealthy) wounds',
      'Dosha classification: Vata Vrana (dry, painful), Pitta Vrana (inflamed, burning), Kapha Vrana (mucus, slow)',
      'Shuddha Vrana: clean wound with healthy granulation, heals easily with Ropana',
      'Dushta Vrana: infected wound with unhealthy tissue, requires Shodhana + Krimighna + Ropana',
      'Haridra (Curcuma longa) - primary wound herb: anti-inflammatory, antiseptic, healing',
      'Nimba (Azadirachta indica) - Krimighna, antiseptic, anti-inflammatory',
      'Guggulu (Commiphora mukul) - anti-inflammatory, Ropana (healing), Shothahara',
      'Madhu (honey) - natural antiseptic, wound healing, moisture maintenance',
      'Ghrita (ghee) - wound healing, Ropana, anti-inflammatory',
      'Wound hygiene is essential for healing - regular cleaning, antiseptic care',
      'Diabetic wounds (Prameha Vrana) require special attention - poor healing, infection risk',
      'Burns require cooling treatment - Pitta Shamana, Rakta-Shodhana',
      'Post-surgical wounds - Ropana protocol for clean healing'
    ],
    shlokas: [
      {
        number: '25.1.1',
        sanskrit: 'व्रणचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Vrana (wounds).',
        commentary: 'Opening verse introducing wound management.'
      },
      {
        number: '25.1.3',
        sanskrit: 'व्रणौ द्विविधौ शुद्धः दुष्टः |',
        translation: 'Wounds are of two types: Shuddha (clean) and Dushta (infected).',
        commentary: 'Classifies wounds into two fundamental categories for treatment selection.'
      },
      {
        number: '25.1.5',
        sanskrit: 'वातजः शुष्कः शूलवान् मन्दरोपणः | पित्तजः सदाहः शीघ्रगतिः | कफजः पिच्छिलः कण्डूयुक्तः |',
        translation: 'Vataja: dry, painful, slow healing. Pittaja: burning, rapid progression. Kaphaja: mucus, itchy.',
        commentary: 'Dosha-based wound characteristics guide treatment selection.'
      },
      {
        number: '25.2.1',
        sanskrit: 'हरिद्रा निम्बो गुग्गुलुर्मधु घृतं व्रणे रोपणम् |',
        translation: 'Haridra, Nimba, Guggulu, Madhu, and Ghrita are the best wound healing agents.',
        commentary: 'Lists the five primary wound healing substances.'
      },
      {
        number: '25.3.1',
        sanskrit: 'दुष्टव्रणे शोधनं क्रिमिघ्नं रोपणं च |',
        translation: 'For Dushta Vrana: Shodhana (cleansing), Krimighna (anti-microbial), and Ropana (healing).',
        commentary: 'Three-step treatment protocol for infected wounds.'
      }
    ],
    topics: [
      {
        title: 'Two Types of Vrana with Characteristics',
        content: 'Shuddha Vrana: clean wound bed, healthy granulation tissue, no infection, minimal pain, good blood supply, heals with proper Ropana. Dushta Vrana: unhealthy tissue, pus formation, foul smell, delayed healing, poor blood supply, infection present. Subtypes based on dosha: Vataja (dry, painful, slow), Pittaja (inflamed, burning, fast), Kaphaja (mucus, itchy, slow).',
        clinicalRelevance: 'Accurate wound classification determines treatment approach and expected healing time.'
      },
      {
        title: 'Madhu (Honey) in Wound Care',
        content: 'Madhu (honey) is a superior wound care agent: natural antiseptic (hydrogen peroxide production), maintains moist wound environment, promotes autolytic debridement, reduces scarring, anti-inflammatory. Application: apply directly to wound or on gauze. Change daily. Use raw, unprocessed honey for best results. Modern validation: medical-grade honey (Manuka) is used in modern wound care.',
        clinicalRelevance: 'Honey is one of the most effective traditional wound care agents - validated by modern research.'
      },
      {
        title: 'Diabetic Wounds (Prameha Vrana)',
        content: 'Prameha Vrana (diabetic wounds) have poor healing due to: peripheral neuropathy, vascular insufficiency, immune dysfunction, high blood sugar. Treatment: blood sugar control, wound hygiene, anti-infective herbs (Nimba, Haridra), Ropana (Guggulu, Ghrita), nutrition. Special attention: regular debridement, offloading (for foot wounds), infection monitoring. Prognosis: Kricchra Sadhya (difficult to cure) without blood sugar control.',
        clinicalRelevance: 'Diabetic wounds require integrated management - wound care alone is insufficient without metabolic control.'
      },
      {
        title: 'Burns Management',
        content: 'Burns involve Pitta-Rakta vitiation with tissue destruction. Treatment: immediate cooling (cold water, Chandana paste), Pitta Shamana, Rakta-Shodhana, Ropana. Herbs: Chandana (cooling), Haridra (anti-inflammatory), Ghrita (healing), Aloe Vera (soothing). Avoid: hot applications, oil initially, infection. Modern integration: severe burns require modern burn care alongside Ayurvedic support.',
        clinicalRelevance: 'Burns management requires immediate cooling and infection prevention - modern care for severe burns.'
      },
      {
        title: 'Wound Healing Stages',
        content: 'Four stages: (1) Hemostasis - blood clotting, Stambhana. (2) Inflammation - Shotha, Pitta involvement, Rakta-Shodhana needed. (3) Proliferation - Ropana, new tissue formation, Guggulu and Ghrita. (4) Remodeling - scar formation, Rasayana for tissue quality. Each stage has specific treatment: Stambhana for bleeding, Shothahara for inflammation, Ropana for healing, Rasayana for remodeling.',
        clinicalRelevance: 'Understanding wound healing stages guides stage-appropriate treatment for optimal outcomes.'
      }
    ],
    doshaDiscussion: [
      'Vata Vrana - dry (Ruksha), painful (Shula), slow healing (Manda Ropana), poor blood supply',
      'Pitta Vrana - inflamed (Shotha), burning (Daha), rapid progression (Druta Gati), infection risk',
      'Kapha Vrana - mucus (Pichchila), itchy (Kandu), slow healing (Manda), heavy (Guru)',
      'Dushta Vrana - all doshas involved, infection present, requires Shodhana before Ropana',
      'Agni status affects healing - weak Agni slows tissue regeneration',
      'Rakta involvement in all wounds - Rakta-Shodhana prevents infection'
    ],
    treatmentProtocols: [
      {
        condition: 'Shuddha Vrana (Clean Wound)',
        treatment: 'Ropana (healing) + protective care',
        herbs: ['Haridra (Curcuma longa)', 'Nimba (Azadirachta indica)', 'Guggulu (Commiphora mukul)', 'Madhu (honey)', 'Ghrita (ghee)'],
        dosage: 'Haridra-Madhu paste for external application, change daily',
        duration: '2-4 weeks',
        precautions: ['Keep wound clean', 'Avoid contamination', 'Nutritious diet', 'Adequate rest']
      },
      {
        condition: 'Dushta Vrana (Infected Wound)',
        treatment: 'Shodhana + Krimighna + Ropana',
        herbs: ['Nimba', 'Haridra', 'Vidanga', 'Guggulu', 'Triphala'],
        dosage: 'Nimba-Haridra paste for external use, Triphala Kashaya for washing',
        duration: '4-8 weeks',
        precautions: ['Regular wound cleaning', 'Infection control', 'Antiseptic care', 'Monitor for systemic infection']
      },
      {
        condition: 'Prameha Vrana (Diabetic Wound)',
        treatment: 'Blood sugar control + wound care + Ropana',
        herbs: ['Haridra', 'Nimba', 'Guggulu', 'Ghrita', 'Amalaki'],
        dosage: 'Haridra-Ghrita paste externally, Guggulu 500mg twice daily internally',
        duration: '2-6 months',
        precautions: ['Blood sugar control', 'Regular debridement', 'Offloading for foot wounds', 'Infection monitoring', 'Nutrition']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Dushta Vrana (Infected Wound)',
        sanskrit: 'दुष्ट व्रण',
        etiology: 'Infection and dosha vitiation in wound. Poor hygiene, contaminated wound, weakened immunity, diabetes, malnutrition.',
        symptoms: ['Pus formation (Puya)', 'Foul smell (Durgandha)', 'Pain (Shula)', 'Delayed healing', 'Redness', 'Swelling', 'Fever if systemic'],
        prognosis: 'Sadhya (curable) with proper Shodhana and Krimighna treatment. Kricchra Sadhya in diabetic or immunocompromised patients.',
        treatment: 'Shodhana with Triphala Kashaya. Krimighna with Nimba-Haridra. Ropana with Guggulu-Ghrita. Treat underlying cause.'
      },
      {
        name: 'Prameha Vrana (Diabetic Wound)',
        sanskrit: 'प्रमेह व्रण',
        etiology: 'Wound in diabetic patient with poor healing due to peripheral neuropathy, vascular insufficiency, immune dysfunction, high blood sugar.',
        symptoms: ['Non-healing wound', 'Painless due to neuropathy', 'Infection risk', 'Gangrene risk', 'Slow healing', 'Poor blood supply'],
        prognosis: 'Kricchra Sadhya (difficult to cure) without blood sugar control. Risk of amputation in severe cases.',
        treatment: 'Blood sugar control essential. Wound care with Haridra-Nimba. Guggulu for healing. Regular debridement. Modern vascular assessment if needed.'
      }
    ],
    importantVerses: [
      '25.1.1 - We shall explain the treatment of Vrana (wounds)',
      '25.1.3 - Wounds are of two types: Shuddha (clean) and Dushta (infected)',
      '25.1.5 - Vataja: dry, painful. Pittaja: burning, fast. Kaphaja: mucus, itchy',
      '25.2.1 - Haridra, Nimba, Guggulu, Madhu, and Ghrita are the best wound healing agents',
      '25.3.1 - For Dushta Vrana: Shodhana, Krimighna, and Ropana'
    ],
    clinicalApplications: [
      'Chronic wounds - Dushta Vrana management with Shodhana and Krimighna',
      'Diabetic wounds - Prameha Vrana treatment with blood sugar control',
      'Post-surgical wounds - Ropana protocol for clean healing',
      'Burns - Vrana Shamana with Pitta Shamana approach',
      'Infected wounds - Krimighna with Nimba and Haridra',
      'Wound healing acceleration - Rasayana for tissue rebuilding',
      'Scar prevention - Ghrita and Madhu application',
      'Wound care education - hygiene and dressing techniques'
    ]
  },
  {
    id: 'chikitsa-26',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 26,
    name: 'Trimarmiya Chikitsa',
    sanskrit: 'त्रिमर्मीय चिकित्सा',
    english: 'Management of Three Vital Organ Disorders',
    summary: 'Trimarmiya Chikitsa provides comprehensive management of disorders affecting three vital organs (Marma): Hridaya (heart), Basti (bladder), and Nabhi (navel/Solar Plexus). These organs are called Marma because injury or disease affecting them can be life-threatening. Each organ has specific dosha involvement and treatment: Hridaya Roga involves Vata-Pitta with Rakta, Basti Roga involves Vata-Kapha with Mutra, and Nabhi Roga involves Vata with Agni disturbance. Arjuna is the primary heart herb, Gokshura for bladder, and Hingvastak for navel/Agni disorders. Treatment is organ-specific with targeted herbs, Shamana, and Basti therapy.',
    keyConcepts: [
      'Three vital organs (Marma): Hridaya (heart), Basti (bladder), Nabhi (navel/Solar Plexus)',
      'Hridaya (heart) - seat of consciousness (Chetana), Prana Vaha Srotas, Vata-Pitta with Rakta',
      'Basti (bladder) - Mutra Vaha Srotas, Vata-Kapha with Mutra involvement',
      'Nabhi (navel) - seat of Agni (digestive fire), Agni Vaha Srotas, Vata with Agni disturbance',
      'Arjuna (Terminalia arjuna) - primary cardiac herb: Hridya, Rakta-Shodhana, strengthens heart muscle',
      'Pushkarmool (Inula racemosa) - cardiac herb: Hridya, Shwasa-Shamana',
      'Gokshura (Tribulus terrestris) - primary bladder herb: Mutra-Virechana, Ashmari-Nashaka',
      'Varuna (Crataeva nurvala) - bladder stone dissolving, Mutra-Rogahara',
      'Punarnava (Boerhaavia diffusa) - diuretic, Shothahara, rejuvenative',
      'Hingvastak Churna - for Nabhi Roga: Agni Deepana, Vatanulomana',
      'Basti (medicated enema) is key treatment for both Basti Roga and Hridaya Roga',
      'Diet and lifestyle modification are essential for all three organ disorders',
      'Marma Chikitsa (vital point therapy) may be used alongside herbal treatment'
    ],
    shlokas: [
      {
        number: '26.1.1',
        sanskrit: 'त्रिमर्मीयचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Trimarmiya (three vital organ disorders).',
        commentary: 'Opening verse introducing vital organ disorder management.'
      },
      {
        number: '26.1.3',
        sanskrit: 'त्रीणि मर्माणि हृदयं बस्तिः नाभिः |',
        translation: 'The three vital organs are Hridaya (heart), Basti (bladder), and Nabhi (navel).',
        commentary: 'Identifies the three vital organs requiring special protection.'
      },
      {
        number: '26.1.5',
        sanskrit: 'हृदयं प्राणस्थानं बस्तिर्मूत्रस्थानं नाभिरग्निस्थानम् |',
        translation: 'Heart is the seat of Prana, bladder is the seat of urine, navel is the seat of Agni.',
        commentary: 'Functional significance of each vital organ.'
      },
      {
        number: '26.2.1',
        sanskrit: 'अर्जुनं पुष्करमूलं हृदयरोगे प्रधानम् |',
        translation: 'Arjuna and Pushkarmool are the primary herbs for heart disease.',
        commentary: 'Lists the two primary cardiac herbs.'
      },
      {
        number: '26.3.1',
        sanskrit: 'गोक्षुरकं वरुणं बस्तिरोगे प्रधानम् |',
        translation: 'Gokshura and Varuna are the primary herbs for bladder disease.',
        commentary: 'Lists the two primary bladder herbs.'
      }
    ],
    topics: [
      {
        title: 'Hridaya Roga (Heart Disorders)',
        content: 'Heart disorders involve Vata-Pitta with Rakta. Types: Hridroga (cardiac pain), Hridshoola (angina), Hridkampa (palpitations), Hridaya Daurbalya (heart weakness). Symptoms: chest pain, palpitations, breathlessness, anxiety, fatigue. Treatment: Arjuna (primary), Pushkarmool, Jatamansi (calming), Brahmi (stress relief). Basti therapy for Vata involvement. Lifestyle: stress management, moderate exercise, warm food.',
        clinicalRelevance: 'Heart disorders require immediate attention - modern cardiac evaluation alongside Ayurvedic treatment.'
      },
      {
        title: 'Basti Roga (Bladder Disorders)',
        content: 'Bladder disorders involve Vata-Kapha with Mutra. Types: Ashmari (stones), Mutraghata (retention), Mutrakrichra (painful urination), Prameha (diabetes). Symptoms: painful urination, retention, frequency, urgency, blood in urine. Treatment: Gokshura (primary), Varuna (stone dissolving), Punarnava (diuretic), Basti (medicated enema). Hydration essential.',
        clinicalRelevance: 'Bladder disorders affect quality of life - specific herbs for specific conditions.'
      },
      {
        title: 'Nabhi Roga (Navel/Agni Disorders)',
        content: 'Nabhi is the seat of Agni (digestive fire). Nabhi Roga involves Agni disturbance: Mandagni (weak digestion), Ajirna (indigestion), Gulma (abdominal tumor), Shoola (colic). Symptoms: abdominal pain, bloating, indigestion, constipation. Treatment: Hingvastak Churna (Agni Deepana), Trikatu (three pungents), Chitraka (digestive stimulant). Warm food, regular meals.',
        clinicalRelevance: 'Nabhi Roga affects overall health - Agni is the foundation of health in Ayurveda.'
      },
      {
        title: 'Basti Therapy for Vital Organs',
        content: 'Basti (medicated enema) is key treatment for all three vital organ disorders. For Hridaya: Arjuna Basti (cardiac decoction enema), Dashamula Basti (anti-Vata). For Basti Roga: Gokshura Basti (bladder decoction enema), Mutravirechana Basti (diuretic enema). For Nabhi: Hingvastak Basti (digestive enema), Vatanulomana Basti (Vata-balancing).',
        clinicalRelevance: 'Basti delivers herbs directly to the affected area - most effective for lower vital organs.'
      }
    ],
    doshaDiscussion: [
      'Hridaya Roga - Vata-Pitta with Rakta involvement (chest pain, palpitations, anxiety)',
      'Basti Roga - Vata-Kapha with Mutra involvement (painful urination, retention, stones)',
      'Nabhi Roga - Vata with Agni disturbance (indigestion, colic, bloating)',
      'Prana Vata involvement in Hridaya Roga - affects breathing and consciousness',
      'Apana Vata involvement in Basti Roga - affects urination and elimination',
      'Samana Vata involvement in Nabhi Roga - affects digestion and absorption'
    ],
    treatmentProtocols: [
      {
        condition: 'Hridaya Roga (Heart Disease)',
        treatment: 'Shamana with cardiac herbs + Basti + lifestyle',
        herbs: ['Arjuna (Terminalia arjuna)', 'Pushkarmool (Inula racemosa)', 'Jatamansi (Nardostachys jatamansi)', 'Brahmi (Bacopa monnieri)', 'Guggulu'],
        dosage: 'Arjuna Kashaya 40ml twice daily, Pushkarmool Churna 2g with honey',
        duration: '3-6 months',
        precautions: ['Avoid exertion', 'Stress management', 'Light diet', 'Regular monitoring', 'Modern cardiac evaluation']
      },
      {
        condition: 'Basti Roga (Bladder Disease)',
        treatment: 'Shamana + Basti (medicated enema) + hydration',
        herbs: ['Gokshura (Tribulus terrestris)', 'Varuna (Crataeva nurvala)', 'Punarnava (Boerhaavia diffusa)', 'Dashamula'],
        dosage: 'Gokshura Kashaya 40ml twice daily, Varuna Kashaya 40ml twice daily',
        duration: '2-4 months',
        precautions: ['Adequate hydration', 'Avoid holding urine', 'Warm food', 'Regular monitoring']
      },
      {
        condition: 'Nabhi Roga (Agni Disorders)',
        treatment: 'Agni Deepana + Vatanulomana',
        herbs: ['Hingvastak Churna', 'Trikatu', 'Chitraka (Plumbago zeylanica)', 'Ajwain'],
        dosage: 'Hingvastak Churna 3g with warm water before meals',
        duration: '2-4 weeks',
        precautions: ['Warm food', 'Regular meals', 'Avoid heavy food', 'Light exercise']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Hridaya Roga (Heart Disease)',
        sanskrit: 'हृदय रोग',
        etiology: 'Dosha vitiation affecting Hridaya (heart). Vata-Pitta with Rakta involvement. Causes: stress, poor diet, sedentary lifestyle, emotional disturbance, genetic factors.',
        symptoms: ['Chest pain (Hridshoola)', 'Palpitations (Hridkampa)', 'Breathlessness (Shwasa)', 'Anxiety (Chittodvega)', 'Fatigue (Daurbalya)', 'Edema (Shopha)'],
        prognosis: 'Variable - depends on severity and chronicity. Sadhya in early stages, Kricchra Sadhya in chronic.',
        treatment: 'Arjuna-based protocol. Pushkarmool for breathlessness. Basti for Vata. Stress management. Lifestyle modification.'
      },
      {
        name: 'Ashmari (Urinary Stones)',
        sanskrit: 'अश्मरी',
        etiology: 'Vata-Kapha with Mutra vitiation causing stone formation. Dehydration, diet high in oxalates/purines, sedentary lifestyle.',
        symptoms: ['Severe flank pain', 'Painful urination', 'Blood in urine', 'Urinary frequency', 'Nausea', 'Vomiting'],
        prognosis: 'Sadhya (curable) with herbs if stones are small. Kricchra Sadhya if large stones. May require surgical intervention.',
        treatment: 'Gokshura and Varuna for stone dissolution. Punarnava for diuretic effect. Adequate hydration. Dietary modification.'
      }
    ],
    importantVerses: [
      '26.1.1 - We shall explain the treatment of Trimarmiya',
      '26.1.3 - The three vital organs are Hridaya, Basti, and Nabhi',
      '26.1.5 - Heart is seat of Prana, bladder seat of urine, navel seat of Agni',
      '26.2.1 - Arjuna and Pushkarmool are the primary heart herbs',
      '26.3.1 - Gokshura and Varuna are the primary bladder herbs'
    ],
    clinicalApplications: [
      'Heart disease - Hridaya Roga protocol with Arjuna',
      'Bladder disorders - Basti Roga treatment with Gokshura',
      'Urinary stones - Ashmari treatment with Varuna',
      'Cardiac support - Arjuna-based therapy',
      'Agni disorders - Nabhi Roga with Hingvastak',
      'Digestive problems - Agni Deepana with Trikatu',
      'Urinary problems - Gokshura-based approach',
      'Vital organ protection - Marma Chikitsa principles'
    ]
  },
  {
    id: 'chikitsa-27',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 27,
    name: 'Urustambha Chikitsa',
    sanskrit: 'ऊरुस्तम्भ चिकित्सा',
    english: 'Management of Stiffness of Thighs',
    summary: 'Urustambha Chikitsa provides comprehensive management of thigh stiffness and heaviness caused by Kapha-Meda (fat) blocking Vata in the thigh channels. This condition is characterized by difficulty in movement, stiffness (Stambha), heaviness (Guruta), and pain in the lower limbs. The pathogenesis involves vitiated Kapha and Meda blocking Vata channels in the thighs, similar to sciatica and lower limb stiffness in modern medicine. Treatment includes Shodhana (purification) to remove Kapha-Meda, Shamana with Vata-Kapha balancing herbs, and Basti (medicated enema) for deep Vata pacification. Rasna, Eranda, Dashamula, and Guggulu are the primary herbs. Diet should be light and Kapha-reducing.',
    keyConcepts: [
      'Kapha-Meda (fat) blocking Vata in thigh channels is the primary pathology',
      'Condition similar to sciatica and lower limb stiffness in modern medicine',
      'Treatment includes Shodhana (purification), Shamana (pacification), and Basti (enema)',
      'Rasna (Pluchea lanceolata) - primary Vata Shamana, anti-inflammatory',
      'Eranda (Ricinus communis) - Vata Shamana, purgative, anti-inflammatory',
      'Dashamula (ten roots) - powerful Vata Shamana, anti-inflammatory',
      'Guggulu (Commiphora mukul) - anti-inflammatory, removes Kapha-Meda obstruction',
      'Yogaraja Guggulu - primary formulation for Vata-Kapha disorders',
      'Basti (medicated enema) is key treatment for deep Vata pacification',
      'Diet should be light and Kapha-reducing - avoid heavy, oily, cold foods',
      'Regular exercise and stretching essential for mobility',
      'Oil massage (Abhyanga) with Dashamula Taila provides local relief',
      'Obesity (Sthaulya) is a risk factor - weight management important'
    ],
    shlokas: [
      {
        number: '27.1.1',
        sanskrit: 'ऊरुस्तम्भचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Urustambha (thigh stiffness).',
        commentary: 'Opening verse introducing thigh stiffness management.'
      },
      {
        number: '27.1.3',
        sanskrit: 'ऊरुस्तम्भः कफमेदोवातजः |',
        translation: 'Urustambha is caused by Kapha, Meda (fat), and Vata vitiation.',
        commentary: 'Establishes the tri-dosha basis with Kapha-Meda as primary obstruction.'
      },
      {
        number: '27.1.5',
        sanskrit: 'कफमेदः ऊरुस्रोतसाम् आवृत्य वातं स्तम्भयतः |',
        translation: 'Kapha and Meda obstruct the thigh channels, causing Vata stambhana (stiffness).',
        commentary: 'Describes the pathogenesis - obstruction causing stiffness.'
      },
      {
        number: '27.2.1',
        sanskrit: 'रास्ना एरण्डो दशमूलं गुग्गुलुः ऊरुस्तम्भे प्रधानम् |',
        translation: 'Rasna, Eranda, Dashamula, and Guggulu are the primary herbs for Urustambha.',
        commentary: 'Lists the four primary herbs for thigh stiffness.'
      },
      {
        number: '27.3.1',
        sanskrit: 'बस्तिः ऊरुस्तम्भे श्रेष्ठः |',
        translation: 'Basti (medicated enema) is the best treatment for Urustambha.',
        commentary: 'Establishes Basti as the primary treatment for this Vata disorder.'
      }
    ],
    topics: [
      {
        title: 'Samprapti (Pathogenesis) of Urustambha',
        content: 'Vitiated Kapha and Meda (fat) block the Vata channels (Srotas) in the thighs. This obstruction prevents normal Vata movement, causing Stambha (stiffness), Guruta (heaviness), and Shula (pain). The condition is similar to sciatica, peripheral vascular disease, and lower limb stiffness. Contributing factors: sedentary lifestyle, obesity, heavy diet, cold exposure, Kapha-aggravating foods.',
        clinicalRelevance: 'Understanding pathogenesis guides treatment - remove Kapha-Meda obstruction, then balance Vata.'
      },
      {
        title: 'Guggulu Formulations for Urustambha',
        content: 'Yogaraja Guggulu: primary formulation for Vata-Kapha disorders, anti-inflammatory, removes Ama. Kaishore Guggulu: for Pitta involvement, anti-inflammatory. Triphala Guggulu: for Kapha-Meda obstruction, scraping action. Dosage: 500mg twice daily with warm water. Duration: 2-4 months. Guggulu works by scraping Kapha-Meda from channels and balancing Vata.',
        clinicalRelevance: 'Guggulu is the drug of choice for Kapha-Meda obstruction disorders - unique scraping action.'
      },
      {
        title: 'Basti Therapy for Urustambha',
        content: 'Basti (medicated enema) is the best treatment for Urustambha - delivers herbs directly to lower body. Types: Anuvasana Basti (oil enema) with Dashamula Taila for Vata. Niruha Basti (decoction enema) with Dashamula Kashaya for Kapha. Schedule: alternate Anuvasana and Niruha. Duration: 8-16 days (Kala Basti or Karma Basti).',
        clinicalRelevance: 'Basti addresses the root cause - Vata in lower body channels.'
      },
      {
        title: 'Lifestyle and Exercise',
        content: 'Regular exercise essential for mobility: gentle stretching, walking, yoga (hip openers). Avoid: prolonged sitting, standing, cold exposure. Oil massage: Abhyanga with Dashamula Taila or Mahanarayana Taila. Warm compress on thighs. Weight management if obese. Diet: light, warm, Kapha-reducing.',
        clinicalRelevance: 'Lifestyle modification is as important as herbs - exercise prevents recurrence.'
      }
    ],
    doshaDiscussion: [
      'Kapha-Meda blocking Vata is the primary pathology',
      'Kapha provides the obstruction (Guru, Snigdha qualities blocking channels)',
      'Meda (fat) contributes to channel blockage - obesity is a risk factor',
      'Vata is vitiated by obstruction - causes Stambha (stiffness) and Shula (pain)',
      'Treatment: first reduce Kapha-Meda (Shodhana, Shamana), then balance Vata (Basti)',
      'Agni status affected - Mandagni contributes to Kapha-Meda accumulation'
    ],
    treatmentProtocols: [
      {
        condition: 'Urustambha (Thigh Stiffness)',
        treatment: 'Shodhana + Shamana + Basti',
        herbs: ['Rasna (Pluchea lanceolata)', 'Eranda (Ricinus communis)', 'Dashamula (ten roots)', 'Guggulu (Commiphora mukul)'],
        dosage: 'Rasna-Eranda Kashaya 40ml twice daily, Yogaraja Guggulu 500mg twice daily',
        duration: '2-4 months',
        precautions: ['Light diet', 'Avoid heavy food', 'Regular exercise', 'Oil massage', 'Weight management']
      },
      {
        condition: 'Urustambha with Pain',
        treatment: 'Vata Shamana + local treatment + Basti',
        herbs: ['Guggulu', 'Rasna', 'Eranda', 'Dashamula', 'Nirgundi'],
        dosage: 'Yogaraja Guggulu 500mg twice daily, Nirgundi oil for local application',
        duration: '2-4 months',
        precautions: ['Warm compress', 'Gentle stretching', 'Avoid cold exposure', 'Rest during acute pain']
      },
      {
        condition: 'Urustambha with Obesity',
        treatment: 'Weight management + Kapha-Meda reduction + Vata Shamana',
        herbs: ['Guggulu', 'Triphala', 'Gokshura', 'Dashamula'],
        dosage: 'Triphala Guggulu 500mg twice daily, Triphala Churna 3g at bedtime',
        duration: '3-6 months',
        precautions: ['Calorie restriction', 'Regular exercise', 'Avoid heavy, oily food', 'Weight monitoring']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Urustambha (Thigh Stiffness)',
        sanskrit: 'ऊरुस्तम्भ',
        etiology: 'Kapha-Meda (fat) blocking Vata channels in thighs. Causes: sedentary lifestyle, obesity, heavy diet, cold exposure, Kapha-aggravating foods.',
        symptoms: ['Thigh stiffness (Stambha)', 'Heaviness (Guruta)', 'Difficulty walking', 'Pain (Shula)', 'Reduced mobility', 'Cold sensation'],
        prognosis: 'Sadhya (curable) with proper treatment. Kricchra Sadhya in chronic cases with obesity.',
        treatment: 'Shodhana to remove Kapha-Meda. Shamana with Rasna, Eranda, Guggulu. Basti for deep Vata. Exercise and lifestyle modification.'
      }
    ],
    importantVerses: [
      '27.1.1 - We shall explain the treatment of Urustambha',
      '27.1.3 - Urustambha is caused by Kapha, Meda, and Vata vitiation',
      '27.1.5 - Kapha and Meda obstruct thigh channels, causing Vata stambhana',
      '27.2.1 - Rasna, Eranda, Dashamula, and Guggulu are the primary herbs',
      '27.3.1 - Basti is the best treatment for Urustambha'
    ],
    clinicalApplications: [
      'Thigh stiffness - Urustambha protocol with Guggulu and Basti',
      'Lower limb heaviness - Kapha-Meda reduction with Shodhana',
      'Sciatica-like symptoms - Vata Shamana with Rasna and Eranda',
      'Mobility issues - comprehensive treatment with exercise and herbs',
      'Obesity-related stiffness - weight management with Triphala Guggulu',
      'Peripheral vascular disease - Srotas Shodhana approach',
      'Post-immobilization stiffness - Vata Shamana with Abhyanga',
      'Prevention - regular exercise and Kapha-reducing diet'
    ]
  },
  {
    id: 'chikitsa-29',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 29,
    name: 'Vatarakta Chikitsa',
    sanskrit: 'वातरक्त चिकित्सा',
    english: 'Management of Gout, Rheumatoid Arthritis and Inflammatory Joint Disease',
    summary: 'Vatarakta Chikitsa provides comprehensive management of conditions caused by combined vitiation of Vata and Rakta (blood). This includes gout (Vatarakta), rheumatoid arthritis, and related inflammatory joint conditions. The chapter describes two main types: Uttana (superficial - affecting skin and superficial tissues) and Gambhira (deep - affecting joints and deeper tissues). Also classified by dosha predominance: Vata-dominant (more pain, dryness) and Rakta-dominant (more inflammation, redness). Treatment includes Raktamokshana (bloodletting) for Rakta vitiation, Shamana with anti-inflammatory herbs (Guduchi, Shallaki, Guggulu), Basti for deep Vata involvement, and external treatment with Lepa and Parisheka. Diet should avoid purine-rich and Pitta-aggravating foods.',
    keyConcepts: [
      'Vatarakta involves combined Vata-Rakta vitiation causing inflammatory joint disease',
      'Two types: Uttana (superficial - skin) and Gambhira (deep - joints)',
      'Vata-dominant: more pain (Shula), dryness (Ruksha), cracking (Sphutana)',
      'Rakta-dominant: more inflammation (Shotha), redness (Rakta), burning (Daha)',
      'Treatment includes Raktamokshana (bloodletting) for Rakta vitiation',
      'Shamana with anti-inflammatory herbs: Guduchi, Shallaki, Guggulu',
      'Basti (medicated enema) for deep Vata involvement',
      'External treatment: Lepa (paste) and Parisheka (pouring) for local relief',
      'Guduchi (Tinospora cordifolia) - primary: immunomodulator, anti-inflammatory',
      'Shallaki (Boswellia serrata) - anti-inflammatory, Shothahara',
      'Guggulu (Commiphora mukul) - anti-inflammatory, removes Ama from joints',
      'Diet should avoid purine-rich foods (red meat, organ meats, alcohol)',
      'Both internal and external treatments are important for comprehensive care'
    ],
    shlokas: [
      {
        number: '29.1.1',
        sanskrit: 'वातरक्तचिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Vatarakta (gout/RA).',
        commentary: 'Opening verse introducing inflammatory joint disease management.'
      },
      {
        number: '29.1.3',
        sanskrit: 'वातरक्तं वायुरक्तं संसृष्टं |',
        translation: 'Vatarakta is the combined vitiation of Vata and Rakta.',
        commentary: 'Establishes the dual dosha basis of Vatarakta.'
      },
      {
        number: '29.1.5',
        sanskrit: 'उत्तानं गम्भीरं च वातरक्तं द्विविधम् |',
        translation: 'Vatarakta is of two types: Uttana (superficial) and Gambhira (deep).',
        commentary: 'Classifies by depth of tissue involvement.'
      },
      {
        number: '29.2.1',
        sanskrit: 'गुडूची शल्लकी गुग्गुलुः वातरक्ते प्रधानम् |',
        translation: 'Guduchi, Shallaki, and Guggulu are the primary herbs for Vatarakta.',
        commentary: 'Lists the three primary herbs for inflammatory joint disease.'
      },
      {
        number: '29.3.1',
        sanskrit: 'रक्तमोक्षणं वातरक्ते शस्तम् |',
        translation: 'Raktamokshana (bloodletting) is indicated for Vatarakta.',
        commentary: 'Bloodletting removes vitiated Rakta, reducing inflammation.'
      },
      {
        number: '29.4.1',
        sanskrit: 'बस्तिः गम्भीरवातरक्ते श्रेष्ठः |',
        translation: 'Basti is the best treatment for deep (Gambhira) Vatarakta.',
        commentary: 'Basti delivers herbs directly to the affected joints.'
      }
    ],
    topics: [
      {
        title: 'Two Types of Vatarakta',
        content: 'Uttana (superficial): affects skin and superficial tissues. Symptoms: skin rash, redness, burning, itching, mild joint pain. Easier to treat. Gambhira (deep): affects joints and deeper tissues. Symptoms: severe joint pain, swelling, stiffness, deformity, difficulty walking. Requires intensive treatment. Both types can be Vata-dominant or Rakta-dominant.',
        clinicalRelevance: 'Depth assessment guides treatment intensity - Gambhira requires Basti and longer treatment.'
      },
      {
        title: 'Raktamokshana in Vatarakta',
        content: 'Raktamokshana (bloodletting) is specifically indicated for Rakta-dominant Vatarakta with severe inflammation. Methods: Siravyadha (venesection) for widespread, Jalaukavacharana (leech therapy) for localized. Leech therapy: apply 4-6 leeches around affected joint. Benefits: removes vitiated blood, reduces inflammation, relieves pain. Contraindicated in: Vata-dominant, debilitated, anemic patients.',
        clinicalRelevance: 'Raktamokshana provides rapid relief in acute inflammatory episodes.'
      },
      {
        title: 'External Treatment (Lepa and Parisheka)',
        content: 'Lepa (paste): Haridra + Chandana paste for local application - anti-inflammatory, cooling. Eranda + Nirgundi paste for Vata-dominant - pain relief. Parisheka (pouring): Dashamula Kashaya warm pour on affected joints. Abhyanga: Mahanarayana Taila or Dashamula Taila for gentle massage. Swedana: warm poultice for stiffness (avoid in acute inflammation).',
        clinicalRelevance: 'External treatment provides local relief and complements internal treatment.'
      },
      {
        title: 'Dietary Management',
        content: 'Avoid: purine-rich foods (red meat, organ meats, shellfish), alcohol (especially beer), high-fructose foods, excessive protein. Pathya: old rice, barley, Mudga (green gram), ghee, bitter vegetables, adequate hydration. Lifestyle: avoid cold exposure, rest affected joints during acute episodes, gentle exercise during remission, weight management.',
        clinicalRelevance: 'Dietary modification is essential - purine-rich foods trigger gouty attacks.'
      }
    ],
    doshaDiscussion: [
      'Vata-dominant Vatarakta - more pain (Shula), dryness (Ruksha), cracking (Sphutana), stiffness',
      'Rakta-dominant Vatarakta - more inflammation (Shotha), redness (Rakta), burning (Daha)',
      'Combined - mixed features, requires dual approach',
      'Pitta often involved with Rakta - inflammatory component',
      'Ama (metabolic toxins) can contribute - Ama Vatarakta needs Ama Pachana',
      'Agni status affects prognosis - weak Agni leads to Ama formation'
    ],
    treatmentProtocols: [
      {
        condition: 'Vatarakta (General)',
        treatment: 'Raktamokshana + Shamana + Basti + external treatment',
        herbs: ['Guduchi (Tinospora cordifolia)', 'Shallaki (Boswellia serrata)', 'Guggulu (Commiphora mukul)', 'Rasna (Pluchea lanceolata)', 'Eranda (Ricinus communis)'],
        dosage: 'Guduchi Sattva 500mg with Shallaki extract twice daily, Yogaraja Guggulu 500mg twice daily',
        duration: '3-6 months',
        precautions: ['Avoid purine-rich foods', 'Cool environment', 'Rest affected joints', 'Light diet', 'Adequate hydration']
      },
      {
        condition: 'Acute Vatarakta',
        treatment: 'Local treatment + Shamana + Raktamokshana if Rakta-dominant',
        herbs: ['Haridra', 'Nimba', 'Guduchi', 'Chandana', 'Shallaki'],
        dosage: 'Haridra paste for local application, Guduchi Kashaya 40ml internally twice daily',
        duration: '2-4 weeks',
        precautions: ['Rest', 'Cool compress', 'Avoid hot foods', 'Avoid purine-rich foods']
      },
      {
        condition: 'Chronic Vatarakta',
        treatment: 'Basti + Rasayana + long-term Shamana',
        herbs: ['Guggulu', 'Rasna', 'Eranda', 'Dashamula', 'Guduchi', 'Ashwagandha'],
        dosage: 'Yogaraja Guggulu 500mg twice daily, Ashwagandha Churna 3g with warm milk',
        duration: '6-12 months',
        precautions: ['Long-term compliance', 'Dietary modification', 'Regular exercise', 'Joint protection', 'Weight management']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vatarakta (Gout/RA)',
        sanskrit: 'वातरक्त',
        etiology: 'Combined Vata-Rakta vitiation from dietary and lifestyle factors. Purine-rich food, alcohol, sedentary lifestyle, cold exposure, incompatible food combinations. Ama contribution in some cases.',
        symptoms: ['Joint pain (Sandhi Shula)', 'Swelling (Sandhi Shotha)', 'Redness (Rakta)', 'Stiffness (Stambha)', 'Burning sensation (Daha)', 'Difficulty walking', 'Tophi in chronic gout'],
        prognosis: 'Sadhya (curable) in early stages with Raktamokshana and Shamana. Yapya (manageable) in chronic cases. Kricchra Sadhya with deformity.',
        treatment: 'Raktamokshana for acute Rakta vitiation. Shamana with Guduchi, Shallaki, Guggulu. Basti for deep Vata. External Lepa for local relief. Dietary modification essential.'
      },
      {
        name: 'Vatarakta with Ama',
        sanskrit: 'आम वातरक्त',
        etiology: 'Combined Ama and Vata-Rakta vitiation. Weak Agni leads to Ama formation which deposits in joints causing inflammation and pain.',
        symptoms: ['Joint pain with heaviness', 'Morning stiffness', 'Coated tongue', 'Anorexia', 'Fatigue', 'Swelling'],
        prognosis: 'Sadhya (curable) with Ama Pachana followed by Shamana.',
        treatment: 'Ama Pachana with Trikatu, Musta. Then Shamana with Guduchi, Guggulu. Light diet. Agni Deepana.'
      }
    ],
    importantVerses: [
      '29.1.1 - We shall explain the treatment of Vatarakta',
      '29.1.3 - Vatarakta is the combined vitiation of Vata and Rakta',
      '29.1.5 - Two types: Uttana (superficial) and Gambhira (deep)',
      '29.2.1 - Guduchi, Shallaki, and Guggulu are the primary herbs',
      '29.3.1 - Raktamokshana is indicated for Vatarakta',
      '29.4.1 - Basti is the best treatment for deep Vatarakta'
    ],
    clinicalApplications: [
      'Gout - Vatarakta protocol with Raktamokshana and dietary modification',
      'Rheumatoid arthritis - comprehensive Vatarakta treatment with Basti',
      'Inflammatory joint disease - Guduchi-Shallaki protocol',
      'Joint inflammation - local and internal treatment',
      'Psoriatic arthritis - Vatarakta with Twak involvement',
      'Ankylosing spondylitis - Gambhira Vatarakta with Basti',
      'Acute gouty attack - Raktamokshana with Shamana',
      'Chronic joint disease - long-term Rasayana with Guggulu'
    ]
  },
  {
    id: 'chikitsa-30',
    sthana: 'Chikitsa Sthana',
    chapterNumber: 30,
    name: 'Yonivyapat Chikitsa',
    sanskrit: 'योनिव्यापद् चिकित्सा',
    english: 'Management of Gynecological Disorders',
    summary: 'Yonivyapat Chikitsa provides comprehensive management of gynecological disorders (Yoni Vyapat). The chapter describes twenty types of Yoni Roga classified by dosha: Vataja (7 types - irregular menstruation, pain, dryness), Pittaja (4 types - heavy bleeding, burning, inflammation), Kaphaja (4 types - leucorrhea, heaviness, itching), and Sannipataja (5 types - mixed, severe). Vata is the primary dosha in most gynecological conditions. Treatment includes Shamana with Ashoka, Lodhra, and Shatavari, Basti (medicated enema) for Vata disorders, and Uttara Basti (uterine enema) for uterine and tubal conditions. Diet should be nourishing and Vata-pacifying. The chapter also covers Garbha (pregnancy) management and Prasava (delivery) care.',
    keyConcepts: [
      'Twenty types of Yoni Roga (gynecological disorders) classified by dosha',
      'Vataja (7 types): irregular menstruation, pain, dryness, scanty flow',
      'Pittaja (4 types): heavy bleeding, burning, inflammation, infection',
      'Kaphaja (4 types): leucorrhea, heaviness, itching, white discharge',
      'Sannipataja (5 types): mixed features, severe, difficult to treat',
      'Vata is the primary dosha in most gynecological conditions',
      'Treatment includes Shamana, Basti, and Uttara Basti',
      'Ashoka (Saraca asoca) - primary herb: uterine tonic, regulates menstruation',
      'Lodhra (Symplocos racemosa) - Stambhana, Rakta-Shodhana, leucorrhea treatment',
      'Shatavari (Asparagus racemosus) - female reproductive tonic, hormonal balance',
      'Uttara Basti (uterine enema) - specialized treatment for uterine and tubal conditions',
      'Basti (medicated enema) - Vata Shamana for menstrual disorders',
      'Diet should be nourishing (Brimhana) and Vata-pacifying',
      'Garbha (pregnancy) management and Prasava (delivery) care included'
    ],
    shlokas: [
      {
        number: '30.1.1',
        sanskrit: 'योनिव्यापच्चिकित्सितं व्याख्यास्यामः |',
        translation: 'We shall explain the treatment of Yonivyapat (gynecological disorders).',
        commentary: 'Opening verse introducing gynecological disorder management.'
      },
      {
        number: '30.1.3',
        sanskrit: 'योनिरोगाः विंशतिः वातजाः सप्त पित्तजाश्चत्वारः कफजाश्चत्वारः सन्निपातजाः पञ्च |',
        translation: 'Gynecological disorders are of twenty types: Vataja (7), Pittaja (4), Kaphaja (4), Sannipataja (5).',
        commentary: 'Classifies gynecological disorders into twenty categories by dosha.'
      },
      {
        number: '30.2.1',
        sanskrit: 'वातजाः शूलयोनिः अर्तावदुष्टम् अर्तावक्षयम् |',
        translation: 'Vataja types include painful menstruation, irregular periods, and scanty flow.',
        commentary: 'Common Vataja gynecological conditions.'
      },
      {
        number: '30.2.5',
        sanskrit: 'अशोकं लोध्रं शतावरी स्त्रीरोगेषु प्रधानम् |',
        translation: 'Ashoka, Lodhra, and Shatavari are the primary herbs for female disorders.',
        commentary: 'Establishes the three primary herbs for gynecological treatment.'
      },
      {
        number: '30.3.1',
        sanskrit: 'उत्तरबस्तिः योनिरोगे श्रेष्ठः |',
        translation: 'Uttara Basti (uterine enema) is the best treatment for gynecological disorders.',
        commentary: 'Establishes Uttara Basti as the primary specialized treatment.'
      },
      {
        number: '30.4.1',
        sanskrit: 'गर्भिणी पथ्यं बृंहणं स्निग्धं मधुरम् |',
        translation: 'Pregnant woman should eat nourishing, unctuous, sweet food.',
        commentary: 'Dietary guidelines for pregnancy.'
      }
    ],
    topics: [
      {
        title: 'Twenty Types of Yoni Roga',
        content: 'Vataja (7): Shula Yoni (painful menstruation), Vata Yoni (dryness), Artava Dushta (irregular), Artava Kshaya (scanty), Vatala (Vata discharge), Karnini (cervical), Putraghni (recurrent abortion). Pittaja (4): Pitta Yoni (burning), Raktaja (bleeding), Paittika Shukra (Pittali discharge), Arajaska (amenorrhea). Kaphaja (4): Kaphaja Yoni (leucorrhea), Shleshmala (white discharge), Shvetapradara (excessive white), Kaphaja Artava (Kapha menstrual). Sannipataja (5): mixed, severe.',
        clinicalRelevance: 'Detailed classification guides specific treatment for each condition.'
      },
      {
        title: 'Uttara Basti (Uterine Enema)',
        content: 'Uttara Basti is specialized treatment for gynecological conditions. Procedure: medicated oil or decoction administered through uterine route using special catheter. Indications: infertility, uterine disorders, tubal blockage, recurrent abortion, endometriosis. Herbs: Ashoka Taila, Shatavari Ghrita, Dashamula Kashaya. Timing: after menstruation (day 5-10). Duration: 3-6 cycles. Precautions: sterile technique, experienced practitioner.',
        clinicalRelevance: 'Uttara Basti is unique to Ayurveda - effective for many conditions that are difficult to treat otherwise.'
      },
      {
        title: 'Infertility (Vandhya) Management',
        content: 'Infertility involves Vata vitiation affecting Artava (ovum) and Garbhashaya (uterus). Causes: hormonal imbalance, tubal blockage, uterine disorders, stress, poor nutrition. Treatment: Shamana with Ashoka, Shatavari, Lodhra. Uttara Basti for tubal and uterine conditions. Basti for Vata Shamana. Rasayana for tissue nourishment. Lifestyle: stress management, proper nutrition, regular sleep, avoiding excessive exercise.',
        clinicalRelevance: 'Comprehensive approach addressing multiple causes of infertility.'
      },
      {
        title: 'Garbha (Pregnancy) Management',
        content: 'Monthly Garbha Paricharya (pregnancy care): specific diet and lifestyle for each month. General principles: Brimhana (nourishing), Snigdha (unctuous), Madhura (sweet) diet. Avoid: heavy exercise, excessive travel, incompatible foods, stress. Herbs: Shatavari for nourishment, Ashoka for uterine health. Modern integration: prenatal care, supplements, regular checkups.',
        clinicalRelevance: 'Pregnancy care in Ayurveda provides comprehensive month-by-month guidance.'
      },
      {
        title: 'Prasava (Delivery) and Sutika (Postpartum) Care',
        content: 'Prasava (delivery): natural delivery methods, labor management. Sutika Paricharya (postpartum care): first 45 days after delivery. Diet: light, warm, Vata-pacifying, Brimhana. Herbs: Dashamula for Vata, Shatavari for lactation, Ajwain for digestion. Abhyanga for Vata Shamana. Lifestyle: rest, warmth, avoiding cold exposure. Modern integration: postnatal care, breastfeeding support.',
        clinicalRelevance: 'Postpartum care is critical for mother and child health - Ayurveda provides detailed guidance.'
      }
    ],
    doshaDiscussion: [
      'Vataja Yoni Roga - irregular menstruation, pain (Shula), dryness (Ruksha), scanty flow',
      'Pittaja Yoni Roga - heavy bleeding (Rakta Pradara), burning (Daha), inflammation (Shotha)',
      'Kaphaja Yoni Roga - leucorrhea (Shveta Pradara), heaviness (Guru), itching (Kandu)',
      'Sannipataja - mixed features, severe, difficult to treat, poor prognosis',
      'Vata is the primary dosha in most gynecological conditions - Basti is key treatment',
      'Artava Dhatu (reproductive tissue) involvement in all types',
      'Agni status affects fertility - Mandagni causes Ama affecting Artava quality'
    ],
    treatmentProtocols: [
      {
        condition: 'Dysmenorrhea (Painful Menstruation)',
        treatment: 'Vata Shamana + Basti + lifestyle',
        herbs: ['Ashoka (Saraca asoca)', 'Lodhra (Symplocos racemosa)', 'Shatavari (Asparagus racemosus)', 'Dashamula', 'Eranda (Ricinus communis)'],
        dosage: 'Ashoka Kashaya 40ml twice daily, Dashamula Basti during menstruation',
        duration: '2-3 months',
        precautions: ['Warm food', 'Avoid cold exposure', 'Rest during menstruation', 'Stress management', 'Warm compress on abdomen']
      },
      {
        condition: 'Menorrhagia (Heavy Bleeding)',
        treatment: 'Stambhana + Pitta Shamana + Rakta-Shodhana',
        herbs: ['Lodhra', 'Ashoka', 'Amalaki', 'Nagakeshara (Mesua ferrea)', 'Dhataki'],
        dosage: 'Lodhra Churna 3g with honey twice daily, Nagakeshara Churna 1g twice daily',
        duration: '2-3 months',
        precautions: ['Cool diet', 'Avoid spicy food', 'Rest', 'Iron supplementation', 'Monitor hemoglobin']
      },
      {
        condition: 'Leucorrhea',
        treatment: 'Kapha Shamana + local treatment + hygiene',
        herbs: ['Ashoka', 'Lodhra', 'Haridra', 'Nimba', 'Triphala'],
        dosage: 'Ashoka-Lodhra Kashaya 40ml twice daily, Triphala Kashaya for local wash',
        duration: '4-8 weeks',
        precautions: ['Hygiene', 'Avoid heavy food', 'Cotton undergarments', 'Regular washing']
      },
      {
        condition: 'Infertility Support',
        treatment: 'Shamana + Uttara Basti + Rasayana',
        herbs: ['Ashoka', 'Shatavari', 'Lodhra', 'Bala', 'Ashwagandha'],
        dosage: 'Shatavari Ghrita 15g daily, Ashoka Kashaya 40ml twice daily',
        duration: '3-6 months',
        precautions: ['Body purification first', 'Hormonal balance', 'Stress management', 'Proper nutrition', 'Regular follow-up']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Dysmenorrhea (Shula Yoni)',
        sanskrit: 'शूलयोनि',
        etiology: 'Vata vitiation causing painful menstruation. Causes: cold exposure, stress, irregular diet, excessive exercise, suppressed emotions.',
        symptoms: ['Painful menstruation (Shula)', 'Lower abdominal pain', 'Backache (Prishta Shula)', 'Fatigue (Daurbalya)', 'Nausea', 'Headache'],
        prognosis: 'Sadhya (curable) with Vata Shamana and lifestyle modification.',
        treatment: 'Ashoka-based protocol for uterine health. Basti for Vata Shamana. Warm compress. Stress management.'
      },
      {
        name: 'Shveta Pradara (Leucorrhea)',
        sanskrit: 'श्वेतप्रदार',
        etiology: 'Kapha vitiation causing excessive white vaginal discharge. Causes: heavy diet, sedentary lifestyle, poor hygiene, Kapha-aggravating foods.',
        symptoms: ['White vaginal discharge', 'Heaviness (Guruta)', 'Itching (Kandu)', 'Weakness (Daurbalya)', 'Fatigue'],
        prognosis: 'Sadhya (curable) with Kapha Shamana and local treatment.',
        treatment: 'Kapha Shamana with Ashoka-Lodhra. Local Triphala wash. Hygiene. Light diet. Avoid heavy foods.'
      },
      {
        name: 'Vandhya (Infertility)',
        sanskrit: 'वन्ध्या',
        etiology: 'Vata vitiation affecting Artava (ovum) and Garbhashaya (uterus). Causes: hormonal imbalance, tubal blockage, uterine disorders, stress, poor nutrition, excessive exercise.',
        symptoms: ['Inability to conceive', 'Irregular menstruation', 'Hormonal imbalance', 'Stress', 'Poor nutrition'],
        prognosis: 'Sadhya (curable) in many cases with comprehensive treatment. Kricchra Sadhya in severe structural abnormalities.',
        treatment: 'Shamana with Ashoka, Shatavari. Uttara Basti for tubal/uterine conditions. Rasayana for tissue nourishment. Stress management.'
      }
    ],
    importantVerses: [
      '30.1.1 - We shall explain the treatment of Yonivyapat',
      '30.1.3 - Twenty types: Vataja (7), Pittaja (4), Kaphaja (4), Sannipataja (5)',
      '30.2.1 - Vataja types include painful menstruation, irregular periods, and scanty flow',
      '30.2.5 - Ashoka, Lodhra, and Shatavari are the primary herbs for female disorders',
      '30.3.1 - Uttara Basti is the best treatment for gynecological disorders',
      '30.4.1 - Pregnant woman should eat nourishing, unctuous, sweet food'
    ],
    clinicalApplications: [
      'Dysmenorrhea - Vata Shamana with Ashoka and Basti',
      'Menorrhagia - Stambhana with Lodhra and Nagakeshara',
      'Leucorrhea - Kapha Shamana with Ashoka-Lodhra',
      'Infertility - comprehensive treatment with Uttara Basti and Rasayana',
      'PCOS - hormonal balance with Shamana and lifestyle modification',
      'Endometriosis - Uttara Basti with Ashoka and Shatavari',
      'Pregnancy care - month-by-month Garbha Paricharya',
      'Postpartum care - Sutika Paricharya with Dashamula and Shatavari',
      'Recurrent abortion - Vata Shamana with Basti and Rasayana',
      'Menopausal symptoms - Vata Shamana with Shatavari and Ashwagandha'
    ]
  }
]
