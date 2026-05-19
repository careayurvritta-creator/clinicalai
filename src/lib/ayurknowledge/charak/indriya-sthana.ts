/**
 * Charak Samhita - Indriya Sthana (Section on Sensorial Prognosis)
 * 12 Chapters covering prognosis, signs of impending death, and sensory examination
 * Source: carakasamhitaonline.com (CC BY-NC-SA 4.0)
 */

import type { CharakChapter } from './types'

export const INDRIYA_STHANA: CharakChapter[] = [
  {
    id: 'indriya-1',
    sthana: 'Indriya Sthana',
    chapterNumber: 1,
    name: 'Varnasvariya Indriya',
    sanskrit: 'वर्णस्वरीयइन्द्रियम्',
    english: 'Prognosis through color and voice',
    summary: 'This chapter describes how to assess prognosis through examination of skin color (varna) and voice (svara). Changes in skin complexion indicate specific dosha vitiation and disease progression. Voice quality changes serve as important prognostic indicators. The chapter describes favorable and unfavorable signs in color and voice that help predict disease outcome.',
    keyConcepts: [
      'Varna (color/complexion) examination for prognosis',
      'Svara (voice) examination for prognosis',
      'Favorable color signs: natural complexion maintained',
      'Unfavorable color signs: abnormal color changes indicating dosha vitiation',
      'Voice quality changes as prognostic indicators',
      'Combination of color and voice signs for accurate prognosis',
      'Specific color-disease associations',
      'Voice-disease correlations'
    ],
    shlokas: [
      {
        number: '1.4',
        sanskrit: 'वर्णः स्वरश्च इन्द्रियाणां विज्ञानम्|',
        translation: 'Color and voice are the means of knowledge for the senses (prognosis).',
        commentary: 'Color and voice are two accessible clinical signs that provide valuable prognostic information without invasive examination.'
      },
      {
        number: '1.7',
        sanskrit: 'हितवर्णस्वराः सुखसाध्याः| अहितवर्णस्वराः कृच्छ्रसाध्याः|',
        translation: 'Favorable color and voice indicate easily curable disease. Unfavorable color and voice indicate difficult to cure disease.',
        commentary: 'This provides a simple clinical tool for initial prognosis assessment based on readily observable signs.'
      }
    ],
    topics: [
      {
        title: 'Color (Varna) Examination',
        content: 'Skin complexion reveals dosha status: Vata vitiation causes dark/dry skin, Pitta causes yellowish/reddish skin, Kapha causes white/pale skin. Sudden changes in complexion indicate acute disease, while gradual changes indicate chronic conditions. Return to natural complexion indicates recovery.',
        clinicalRelevance: 'Color examination is a quick, non-invasive method for assessing disease progression and treatment response.'
      },
      {
        title: 'Voice (Svara) Examination',
        content: 'Voice quality reveals dosha status: Vata causes hoarse/broken voice, Pitta causes sharp/irritable speech, Kapha causes heavy/slow speech. Changes in voice quality indicate disease progression. Voice deterioration is a serious prognostic sign.',
        clinicalRelevance: 'Voice examination helps assess disease severity and prognosis, especially in respiratory and systemic diseases.'
      }
    ],
    doshaDiscussion: [
      'Vata vitiation causes dark complexion, hoarse voice',
      'Pitta vitiation causes yellowish/reddish complexion, sharp voice',
      'Kapha vitiation causes pale/white complexion, heavy voice',
      'Return to natural color and voice indicates dosha normalization'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [
      {
        name: 'Favorable Prognosis Signs',
        sanskrit: 'Sukha Sadhya Lakshana',
        etiology: 'Single dosha involvement, recent onset',
        symptoms: ['Natural complexion maintained', 'Normal voice quality'],
        prognosis: 'Good - easily curable',
        treatment: 'Simple shamana therapy'
      },
      {
        name: 'Unfavorable Prognosis Signs',
        sanskrit: 'Kricchra Sadhya Lakshana',
        etiology: 'Multiple dosha involvement, long-standing disease',
        symptoms: ['Abnormal color changes', 'Voice deterioration'],
        prognosis: 'Guardian - difficult to cure',
        treatment: 'Intensive shodhana and rasayana therapy'
      }
    ],
    importantVerses: ['1.4', '1.7'],
    clinicalApplications: [
      'Quick bedside prognosis assessment',
      'Monitoring treatment response through color changes',
      'Voice assessment in respiratory diseases',
      'Non-invasive prognostic evaluation'
    ]
  },
  {
    id: 'indriya-2',
    sthana: 'Indriya Sthana',
    chapterNumber: 2,
    name: 'Pushpitaka Indriya',
    sanskrit: 'पुष्पितकइन्द्रियम्',
    english: 'Prognosis through signs resembling flowers',
    summary: 'This chapter describes prognostic signs that resemble the appearance of various flowers. Specific color changes in the skin, nails, eyes, and other body parts that resemble the colors of specific flowers indicate particular diseases and their prognosis. This poetic but clinically useful method of description helps in visual identification of disease signs.',
    keyConcepts: [
      'Flower-like color changes as prognostic signs',
      'Specific flower-disease associations',
      'Skin color changes resembling flowers of specific colors',
      'Nail color changes as prognostic indicators',
      'Eye color changes indicating disease severity',
      'Visual pattern recognition for prognosis'
    ],
    shlokas: [
      {
        number: '2.3',
        sanskrit: 'पुष्पितानि इव लक्षणानि|',
        translation: 'The signs are like flowers (in their coloration).',
        commentary: 'Using flower colors as reference points for skin color changes is a memorable and clinically practical method.'
      }
    ],
    topics: [
      {
        title: 'Flower-like Prognostic Signs',
        content: 'Specific skin colors resembling flowers indicate particular conditions: skin resembling blue lotus indicates severe Vata vitiation, skin resembling yellow jasmine indicates Pitta disorders, skin resembling white lotus indicates Kapha disorders. Mixed flower-like colors indicate sannipataja (triple dosha) conditions.',
        clinicalRelevance: 'Visual pattern recognition for color changes provides quick diagnostic and prognostic information.'
      }
    ],
    doshaDiscussion: [
      'Each dosha produces characteristic color changes resembling specific flowers',
      'Mixed flower-like colors indicate multiple dosha involvement',
      'Color changes in specific body parts have localized significance'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['2.3'],
    clinicalApplications: [
      'Visual diagnosis through color pattern recognition',
      'Prognosis assessment through skin examination',
      'Teaching tool for clinical examination'
    ]
  },
  {
    id: 'indriya-3',
    sthana: 'Indriya Sthana',
    chapterNumber: 3,
    name: 'Parimarshaniya Indriya',
    sanskrit: 'परिमर्शनीयइन्द्रियम्',
    english: 'Prognosis through palpation and touch',
    summary: 'This chapter describes how palpation (sparshana) and touch provide important prognostic information. Temperature, texture, moisture, and tenderness of body parts during palpation reveal dosha status and disease severity. The chapter details specific tactile findings associated with different conditions and their prognostic significance.',
    keyConcepts: [
      'Sparshana (palpation) as diagnostic method',
      'Temperature assessment through touch',
      'Texture changes indicating disease',
      'Moisture assessment for dosha evaluation',
      'Tenderness and pain on palpation',
      'Specific tactile findings for prognosis',
      'Touch as part of trividha pariksha'
    ],
    shlokas: [
      {
        number: '3.3',
        sanskrit: 'स्पर्शनं विज्ञानम्|',
        translation: 'Touch (palpation) is a means of knowledge (diagnosis).',
        commentary: 'Palpation is one of the three fundamental diagnostic methods in Ayurveda, providing information not available through other senses.'
      }
    ],
    topics: [
      {
        title: 'Palpation Findings by Dosha',
        content: 'Vata disorders: cold, dry, rough, crepitus on movement. Pitta disorders: hot, oily, tender, inflamed. Kapha disorders: cold, moist, smooth, swollen. Mixed findings indicate multiple dosha involvement.',
        clinicalRelevance: 'Palpation findings directly guide dosha assessment and treatment selection.'
      },
      {
        title: 'Prognostic Significance of Touch',
        content: 'Extreme coldness indicates severe Vata (poor prognosis). Extreme heat indicates severe Pitta. Loss of sensation indicates nerve involvement. Return to normal temperature and texture indicates recovery.',
        clinicalRelevance: 'Temperature and texture changes on palpation provide immediate prognostic information.'
      }
    ],
    doshaDiscussion: [
      'Vata: cold, dry, rough on palpation',
      'Pitta: hot, oily, tender on palpation',
      'Kapha: cold, moist, smooth on palpation',
      'Mixed findings indicate sannipataja conditions'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['3.3'],
    clinicalApplications: [
      'Physical examination technique',
      'Dosha assessment through palpation',
      'Disease severity evaluation',
      'Treatment response monitoring'
    ]
  },
  {
    id: 'indriya-4',
    sthana: 'Indriya Sthana',
    chapterNumber: 4,
    name: 'Indriyaneeka Indriya',
    sanskrit: 'इन्द्रियाणीकइन्द्रियम्',
    english: 'Prognosis through sensory examination',
    summary: 'This chapter describes the comprehensive examination of all five senses (jnanendriya) for prognosis. Each sense organ has specific signs that indicate health or disease. The chapter covers examination of eyes (sight), ears (hearing), nose (smell), tongue (taste), and skin (touch), and how findings from each contribute to overall prognosis.',
    keyConcepts: [
      'Five jnanendriya (sensory organs) examination',
      'Eye examination for prognosis - clarity, color, movement',
      'Ear examination - hearing acuity, sounds',
      'Nose examination - smell, breathing',
      'Tongue examination - taste, coating',
      'Skin examination - sensation, temperature',
      'Combined sensory findings for comprehensive prognosis',
      'Sensory deterioration as poor prognostic sign'
    ],
    shlokas: [
      {
        number: '4.3',
        sanskrit: 'इन्द्रियाणां विज्ञानम्|',
        translation: 'The examination of the senses (is important for prognosis).',
        commentary: 'Sensory examination provides crucial information about nervous system function and overall health status.'
      },
      {
        number: '4.6',
        sanskrit: 'प्रसन्नेन्द्रियाः स्वस्थाः| अप्रसन्नेन्द्रियाः व्याधिताः|',
        translation: 'Clear senses indicate health. Diminished senses indicate disease.',
        commentary: 'Sensory clarity is a direct indicator of nervous system health and overall vitality.'
      }
    ],
    topics: [
      {
        title: 'Eye Examination for Prognosis',
        content: 'Healthy eyes: clear, bright, moist, with normal pupil reaction. Diseased eyes: dull, dry, yellowish (Pitta), cloudy (Kapha), sunken (Vata). Specific eye signs indicate particular diseases and prognosis.',
        clinicalRelevance: 'Eye examination reveals both local and systemic disease, making it valuable for comprehensive assessment.'
      },
      {
        title: 'Comprehensive Sensory Assessment',
        content: 'All five senses should be systematically examined. Loss of any sense function is a serious prognostic sign. Combined sensory deterioration indicates severe systemic disease with poor prognosis.',
        clinicalRelevance: 'Sensory examination is part of ashtavidha pariksha and provides essential prognostic information.'
      }
    ],
    doshaDiscussion: [
      'Each dosha affects specific senses preferentially',
      'Vata affects hearing and touch',
      'Pitta affects vision and taste',
      'Kapha affects smell and taste',
      'Multiple sensory involvement indicates severe dosha vitiation'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['4.3', '4.6'],
    clinicalApplications: [
      'Systematic sensory examination',
      'Neurological assessment in Ayurvedic context',
      'Prognosis determination through sensory function',
      'Treatment response monitoring'
    ]
  },
  {
    id: 'indriya-5',
    sthana: 'Indriya Sthana',
    chapterNumber: 5,
    name: 'Purvarupeeya Indriya',
    sanskrit: 'पूर्वरूपीयइन्द्रियम्',
    english: 'Premonitory signs and symptoms for prognosis',
    summary: 'This chapter describes purvarupa (premonitory signs) - early signs that appear before the full manifestation of disease. Recognition of purvarupa allows for early intervention and prevention of disease progression. The chapter covers premonitory signs for various diseases and their prognostic significance.',
    keyConcepts: [
      'Purvarupa - premonitory signs appearing before disease manifestation',
      'Early recognition for disease prevention',
      'Specific purvarupa for different diseases',
      'Duration of purvarupa stage',
      'Prognostic significance of premonitory signs',
      'Window of opportunity for prevention',
      'Difference between purvarupa and rupa (manifest signs)'
    ],
    shlokas: [
      {
        number: '5.3',
        sanskrit: 'पूर्वरूपं रोगस्य|',
        translation: 'The premonitory signs of disease (should be recognized).',
        commentary: 'Early recognition of premonitory signs allows for preventive intervention before disease fully manifests.'
      },
      {
        number: '5.5',
        sanskrit: 'पूर्वरूपदर्शने चिकित्सा|',
        translation: 'When premonitory signs are seen, treatment should begin.',
        commentary: 'Treatment should not wait for full disease manifestation - early intervention during the purvarupa stage yields best results.'
      }
    ],
    topics: [
      {
        title: 'Premonitory Signs (Purvarupa)',
        content: 'Purvarupa are early signs that precede full disease manifestation. For example, heaviness and sweet taste in mouth may precede Prameha (diabetes), while stiffness and pain may precede Sandhivata (osteoarthritis). Recognition of these signs allows preventive treatment.',
        clinicalRelevance: 'Early recognition of purvarupa is the foundation of preventive medicine in Ayurveda.'
      },
      {
        title: 'Window for Prevention',
        content: 'The purvarupa stage provides a window of opportunity for intervention. Simple measures during this stage can prevent disease progression. Once the disease fully manifests (rupa stage), more intensive treatment is required.',
        clinicalRelevance: 'Preventive intervention during purvarupa stage is more effective and less intensive than treating manifest disease.'
      }
    ],
    doshaDiscussion: [
      'Purvarupa reflects the dosha that will cause the disease',
      'Vata purvarupa: pain, stiffness, cold sensation',
      'Pitta purvarupa: burning, heat, inflammation',
      'Kapha purvarupa: heaviness, lethargy, congestion',
      'Mixed purvarupa indicates sannipataja disease'
    ],
    treatmentProtocols: [
      {
        condition: 'Purvarupa stage of any disease',
        treatment: 'Preventive measures: dosha-specific shamana, lifestyle modification, dietary changes',
        herbs: ['Guduchi', 'Triphala', 'Ashwagandha'],
        dosage: 'Preventive doses (lower than therapeutic)',
        duration: 'Until purvarupa resolve',
        precautions: ['Monitor for progression to manifest disease']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Premonitory Signs Stage',
        sanskrit: 'Purvarupa Avastha',
        etiology: 'Initial dosha vitiation before manifesting as disease',
        symptoms: ['Subtle, non-specific symptoms preceding disease'],
        prognosis: 'Excellent if treated early, poor if ignored',
        treatment: 'Preventive shamana and lifestyle modification'
      }
    ],
    importantVerses: ['5.3', '5.5'],
    clinicalApplications: [
      'Preventive medicine in Ayurveda',
      'Early disease detection',
      'Proactive treatment planning',
      'Patient education on warning signs'
    ]
  },
  {
    id: 'indriya-6',
    sthana: 'Indriya Sthana',
    chapterNumber: 6,
    name: 'Katamaksharneeya Indriya',
    sanskrit: 'कटमाक्षर्णीयइन्द्रियम्',
    english: 'Signs of impending death through specific body signs',
    summary: 'This critical chapter describes specific body signs that indicate imminent death. These signs are observed in the final stages of terminal illness and help physicians counsel families and make appropriate care decisions. The chapter covers signs in the eyes, face, skin, consciousness, and overall appearance that indicate the body is failing.',
    keyConcepts: [
      'Signs of impending death (arishta lakshana)',
      'Eye signs: sunken eyes, loss of luster, fixed gaze',
      'Facial signs: altered features, loss of muscle tone',
      'Skin signs: cold, dry, discolored',
      'Consciousness signs: confusion, delirium, loss of awareness',
      'Respiratory signs: irregular breathing, gasping',
      'Cardiac signs: irregular pulse, weak heartbeat',
      'Timeframe from sign appearance to death',
      'Prognostic certainty of death signs'
    ],
    shlokas: [
      {
        number: '6.4',
        sanskrit: 'मरणस्य लक्षणानि|',
        translation: 'The signs of death (should be known).',
        commentary: 'Recognizing signs of impending death is essential for appropriate end-of-life care and family counseling.'
      },
      {
        number: '6.8',
        sanskrit: 'नासिकायाः शिथिलत्वं नेत्राणां अवसन्नत्वं|',
        translation: 'Loosening of the nose and sinking of the eyes (are signs of impending death).',
        commentary: 'These specific facial signs are reliable indicators of imminent death.'
      }
    ],
    topics: [
      {
        title: 'Signs of Impending Death',
        content: 'Terminal signs include: (1) Eyes: sunken, loss of luster, fixed gaze, inability to see, (2) Face: altered features, loss of muscle tone, nose deviation, (3) Skin: cold, dry, discolored, mottled, (4) Consciousness: confusion, delirium, unresponsiveness, (5) Breathing: irregular, gasping, labored, (6) Pulse: irregular, weak, thready. When multiple signs appear together, death is imminent.',
        clinicalRelevance: 'Recognizing terminal signs allows for appropriate end-of-life care and honest communication with families.'
      },
      {
        title: 'Timeframe Assessment',
        content: 'Some signs indicate death within hours, others within days. The combination and severity of signs helps estimate the timeframe. Single signs may be reversible; multiple concurrent signs indicate irreversible decline.',
        clinicalRelevance: 'Timeframe estimation helps families prepare and guides care decisions.'
      }
    ],
    doshaDiscussion: [
      'Vata vitiation in terminal stages causes irregular breathing, cold skin, restlessness',
      'Pitta vitiation causes burning, fever, delirium',
      'Kapha vitiation causes heaviness, unconsciousness, congestion',
      'Sannipataja terminal signs indicate all three dosha are severely vitiated'
    ],
    treatmentProtocols: [
      {
        condition: 'Terminal illness with impending death signs',
        treatment: 'Palliative care, spiritual support, comfort measures',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi'],
        dosage: 'Comfort doses',
        duration: 'Until end of life',
        precautions: ['Focus on comfort, not cure', 'Support family', 'Provide spiritual care']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Terminal Illness Signs',
        sanskrit: 'Arishta Lakshana',
        etiology: 'Severe, irreversible disease progression',
        symptoms: ['Multiple terminal signs in eyes', 'Face changes', 'Skin discoloration', 'Consciousness alterations', 'Breathing irregularities', 'Pulse abnormalities'],
        prognosis: 'Inevitable death within hours to days',
        treatment: 'Palliative care and spiritual support'
      }
    ],
    importantVerses: ['6.4', '6.8'],
    clinicalApplications: [
      'End-of-life care planning',
      'Family counseling about prognosis',
      'Appropriate care decisions in terminal illness',
      'Honest communication about disease outcome'
    ]
  },
  {
    id: 'indriya-7',
    sthana: 'Indriya Sthana',
    chapterNumber: 7,
    name: 'Pannarupiya Indriya',
    sanskrit: 'पन्नरूपीयइन्द्रियम्',
    english: 'Prognosis through loss of sensory perception',
    summary: 'This chapter describes how progressive loss of sensory perception (indriya dhwamsa) indicates disease severity and prognosis. The chapter covers the stages of sensory loss from mild impairment to complete loss, and how the pattern of sensory loss relates to specific diseases and their outcomes.',
    keyConcepts: [
      'Progressive sensory loss as prognostic indicator',
      'Stages of sensory impairment',
      'Specific sensory loss patterns for different diseases',
      'Reversibility assessment of sensory loss',
      'Sensory recovery as sign of improvement',
      'Combined sensory loss indicating poor prognosis'
    ],
    shlokas: [
      {
        number: '7.3',
        sanskrit: 'इन्द्रियध्वंसः रोगस्य|',
        translation: 'Sensory loss indicates disease (severity).',
        commentary: 'Progressive sensory loss is a reliable indicator of disease severity and prognosis.'
      }
    ],
    topics: [
      {
        title: 'Sensory Loss Patterns',
        content: 'Each disease has characteristic patterns of sensory involvement. Vata diseases primarily affect touch and hearing. Pitta diseases affect vision and taste. Kapha diseases affect smell. Progressive involvement of multiple senses indicates severe, systemic disease.',
        clinicalRelevance: 'Sensory loss patterns help identify disease type and severity.'
      },
      {
        title: 'Reversibility Assessment',
        content: 'Partial sensory loss is often reversible with treatment. Complete sensory loss indicates permanent damage. Recovery of sensory function is a reliable sign of treatment success.',
        clinicalRelevance: 'Assessing reversibility helps set treatment goals and predict outcomes.'
      }
    ],
    doshaDiscussion: [
      'Vata primarily affects hearing and touch sensation',
      'Pitta primarily affects vision and taste sensation',
      'Kapha primarily affects smell sensation',
      'Multiple sensory involvement indicates severe dosha vitiation'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['7.3'],
    clinicalApplications: [
      'Sensory function assessment',
      'Disease severity evaluation',
      'Treatment response monitoring',
      'Prognosis determination'
    ]
  },
  {
    id: 'indriya-8',
    sthana: 'Indriya Sthana',
    chapterNumber: 8,
    name: 'Avakshirasiya Indriya',
    sanskrit: 'अवक्षिरसीयइन्द्रियम्',
    english: 'Prognosis through signs in the head region',
    summary: 'This chapter describes prognostic signs observed specifically in the head region. Changes in the eyes, ears, nose, tongue, and facial features provide important prognostic information. The chapter details specific head signs that indicate disease severity and outcome.',
    keyConcepts: [
      'Head region signs for prognosis',
      'Eye signs: pupil changes, eye movement, vision changes',
      'Ear signs: hearing changes, ear discharge',
      'Nose signs: breathing pattern, nasal discharge',
      'Tongue signs: coating, color, movement',
      'Facial signs: symmetry, muscle tone, expression',
      'Combined head signs for comprehensive prognosis'
    ],
    shlokas: [
      {
        number: '8.3',
        sanskrit: 'शिरसो लक्षणानि|',
        translation: 'The signs of the head (should be examined for prognosis).',
        commentary: 'The head contains the organs of all five senses, making it the most important region for prognostic assessment.'
      }
    ],
    topics: [
      {
        title: 'Head Region Examination',
        content: 'The head region is examined for: eyes (luster, movement, pupil), ears (hearing, discharge), nose (breathing, discharge), tongue (coating, color, movement), face (symmetry, expression, muscle tone). Each finding has specific prognostic significance.',
        clinicalRelevance: 'Head examination is a quick, comprehensive method for assessing multiple organ systems simultaneously.'
      }
    ],
    doshaDiscussion: [
      'Head region signs reflect overall dosha status',
      'Vata signs: dry eyes, hearing loss, deviated face',
      'Pitta signs: red eyes, burning nose, yellow tongue',
      'Kapha signs: cloudy eyes, nasal congestion, white tongue coating'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['8.3'],
    clinicalApplications: [
      'Comprehensive head examination',
      'Multi-system assessment through head signs',
      'Quick prognosis evaluation',
      'Neurological assessment'
    ]
  },
  {
    id: 'indriya-9',
    sthana: 'Indriya Sthana',
    chapterNumber: 9,
    name: 'Yasyashya Vijnaniya Indriya',
    sanskrit: 'यश्यश्यविज्ञानीयइन्द्रियम्',
    english: 'Prognosis through specific individual signs',
    summary: 'This chapter describes how individual signs in specific patients provide prognostic information. It emphasizes that prognosis must be individualized - the same sign may have different significance in different patients based on their constitution, age, strength, and disease duration.',
    keyConcepts: [
      'Individualized prognosis assessment',
      'Constitution-specific interpretation of signs',
      'Age-related prognostic variations',
      'Strength assessment for prognosis',
      'Disease duration impact on prognosis',
      'Context-dependent sign interpretation'
    ],
    shlokas: [
      {
        number: '9.3',
        sanskrit: 'प्रकृतिं वयो बलं कालं च अवेक्ष्य प्रोग्नोसिस|',
        translation: 'Considering constitution, age, strength, and time, prognosis should be determined.',
        commentary: 'Prognosis is not absolute - it must be interpreted in the context of the individual patient.'
      }
    ],
    topics: [
      {
        title: 'Individualized Prognosis',
        content: 'The same sign may indicate different outcomes in different patients. For example, fever in a strong young person with kapha prakriti has better prognosis than the same fever in an elderly person with vata prakriti. Age, constitution, strength, and disease duration must all be considered.',
        clinicalRelevance: 'Individualized prognosis prevents both over-optimism and unnecessary pessimism.'
      }
    ],
    doshaDiscussion: [
      'Patient prakriti influences disease prognosis',
      'Vata prakriti patients have poorer prognosis for chronic diseases',
      'Kapha prakriti patients have better disease resistance',
      'Age affects prognosis - extremes of age are more vulnerable'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['9.3'],
    clinicalApplications: [
      'Individualized patient assessment',
      'Context-dependent prognosis',
      'Treatment planning based on patient factors',
      'Realistic outcome expectations'
    ]
  },
  {
    id: 'indriya-10',
    sthana: 'Indriya Sthana',
    chapterNumber: 10,
    name: 'Sadyomaraniya Indriya',
    sanskrit: 'सद्योमरणीयइन्द्रियम्',
    english: 'Signs indicating immediate death',
    summary: 'This chapter describes signs that indicate death will occur very soon - within hours to days. These are the most severe prognostic signs and indicate that treatment is futile. The chapter helps physicians make appropriate decisions about continued treatment versus palliative care.',
    keyConcepts: [
      'Signs of immediate death (sadyo marana)',
      'Irreversible prognostic signs',
      'Eye signs: complete loss of luster, fixed dilated pupils',
      'Breathing signs: gasping, Cheyne-Stokes pattern',
      'Consciousness signs: complete unresponsiveness',
      'Pulse signs: imperceptible, irregular',
      'When to discontinue active treatment',
      'Transition to palliative care'
    ],
    shlokas: [
      {
        number: '10.3',
        sanskrit: 'सद्यो मरणीयानि लक्षणानि|',
        translation: 'The signs indicating immediate death (should be known).',
        commentary: 'Recognizing signs of immediate death is essential for appropriate clinical decisions and family communication.'
      },
      {
        number: '10.6',
        sanskrit: 'एतानि लक्षणानि दृष्ट्वा न चिकित्सेत्|',
        translation: 'When these signs are seen, one should not treat (actively).',
        commentary: 'When death is imminent, active treatment is futile and may cause additional suffering. Palliative care is appropriate.'
      }
    ],
    topics: [
      {
        title: 'Signs of Immediate Death',
        content: 'Signs indicating death within hours: (1) Complete loss of eye luster and fixed dilated pupils, (2) Gasping or Cheyne-Stokes breathing, (3) Complete unresponsiveness, (4) Imperceptible pulse, (5) Cold extremities with central cyanosis, (6) Loss of all sensory function. These signs indicate irreversible physiological failure.',
        clinicalRelevance: 'Recognizing these signs prevents futile treatment and allows appropriate transition to comfort care.'
      },
      {
        title: 'Clinical Decision Making',
        content: 'When multiple signs of immediate death appear, the physician should: (1) Inform the family honestly, (2) Discontinue active aggressive treatment, (3) Provide comfort measures, (4) Offer spiritual support, (5) Allow the family to prepare.',
        clinicalRelevance: 'Appropriate clinical decisions in terminal situations benefit both patient and family.'
      }
    ],
    doshaDiscussion: [
      'All three dosha are severely vitiated in terminal stages',
      'Vata predominance causes restlessness and irregular breathing',
      'Pitta predominance causes fever and delirium',
      'Kapha predominance causes unconsciousness and congestion'
    ],
    treatmentProtocols: [
      {
        condition: 'Signs of immediate death',
        treatment: 'Palliative care only - comfort measures, spiritual support',
        herbs: ['None - active treatment discontinued'],
        dosage: 'N/A',
        duration: 'Until death',
        precautions: ['Do not cause additional suffering', 'Support family emotionally']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Immediate Death Signs',
        sanskrit: 'Sadyo Marana Lakshana',
        etiology: 'Irreversible multi-organ failure',
        symptoms: ['Multiple terminal signs indicating imminent death'],
        prognosis: 'Inevitable death within hours',
        treatment: 'Palliative care only'
      }
    ],
    importantVerses: ['10.3', '10.6'],
    clinicalApplications: [
      'End-of-life decision making',
      'Transition from curative to palliative care',
      'Family communication about prognosis',
      'Ethical decision making in terminal illness'
    ]
  },
  {
    id: 'indriya-11',
    sthana: 'Indriya Sthana',
    chapterNumber: 11,
    name: 'Anujyotiya Indriya',
    sanskrit: 'अनुज्योतीयइन्द्रियम्',
    english: 'Prognosis through luminosity and complexion',
    summary: 'This chapter describes how the luminosity (jyoti) and overall complexion of a person indicate their vital force and prognosis. Loss of natural luster and glow indicates declining vitality and poor prognosis, while maintained luminosity indicates good health and favorable outcome.',
    keyConcepts: [
      'Jyoti (luminosity) as indicator of vital force',
      'Natural glow and complexion assessment',
      'Loss of luster as poor prognostic sign',
      'Ojas and its relationship to luminosity',
      'Specific luminosity signs for different diseases',
      'Recovery of luminosity indicating improvement'
    ],
    shlokas: [
      {
        number: '11.3',
        sanskrit: 'ज्योतिः शरीरस्य|',
        translation: 'The luminosity of the body (indicates vitality).',
        commentary: 'Luminosity reflects the state of ojas (vital essence) and overall vitality.'
      },
      {
        number: '11.5',
        sanskrit: 'प्रज्वलितं शरीरं स्वस्थम्| निर्ज्वलितं व्याधितम्|',
        translation: 'A luminous body is healthy. A dim body is diseased.',
        commentary: 'This simple assessment provides quick prognostic information.'
      }
    ],
    topics: [
      {
        title: 'Luminosity Assessment',
        content: 'Natural body luminosity reflects the state of ojas (vital essence), dhatu (tissue) quality, and overall vitality. Loss of luster indicates declining health. Specific luminosity changes indicate particular diseases.',
        clinicalRelevance: 'Luminosity assessment is a quick, non-invasive method for overall health evaluation.'
      },
      {
        title: 'Ojas and Luminosity',
        content: 'Ojas is the essence of all seven dhatu and is responsible for vitality, immunity, and natural glow. When ojas is depleted, luminosity decreases. Protection and enhancement of ojas is a key therapeutic goal.',
        clinicalRelevance: 'Understanding ojas-luminosity relationship guides rasayana (rejuvenation) therapy.'
      }
    ],
    doshaDiscussion: [
      'Vata depletion causes dull, dry complexion',
      'Pitta excess causes yellowish, inflamed complexion',
      'Kapha excess causes pale, oily complexion',
      'Balanced dosha maintains natural luminosity'
    ],
    treatmentProtocols: [
      {
        condition: 'Loss of luminosity (ojas depletion)',
        treatment: 'Rasayana therapy to restore ojas and vitality',
        herbs: ['Ashwagandha', 'Shatavari', 'Amalaki', 'Guduchi'],
        dosage: 'Rasayana doses',
        duration: '3-6 months',
        precautions: ['Assess agni before rasayana', 'Treat underlying cause']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: ['11.3', '11.5'],
    clinicalApplications: [
      'Overall health assessment',
      'Ojas status evaluation',
      'Rasayana therapy planning',
      'Treatment response monitoring'
    ]
  },
  {
    id: 'indriya-12',
    sthana: 'Indriya Sthana',
    chapterNumber: 12,
    name: 'Gomaya Churniya Indriya',
    sanskrit: 'गोमयचूर्णीयइन्द्रियम्',
    english: 'Prognosis through signs resembling cow-dung powder',
    summary: 'This final chapter of Indriya Sthana describes prognostic signs where the skin resembles the appearance of dried cow-dung powder (gomaya churna). This specific texture and color change in the skin indicates particular diseases and their prognosis. The chapter concludes the comprehensive system of prognostic assessment through sensory examination.',
    keyConcepts: [
      'Skin texture resembling dried cow-dung powder',
      'Specific disease associations for this sign',
      'Prognostic significance of skin texture changes',
      'Combination with other signs for accurate prognosis',
      'Treatment implications of this finding'
    ],
    shlokas: [
      {
        number: '12.3',
        sanskrit: 'गोमयचूर्णवत् त्वक्|',
        translation: 'The skin is like dried cow-dung powder.',
        commentary: 'This specific texture change indicates severe tissue depletion and poor prognosis.'
      }
    ],
    topics: [
      {
        title: 'Skin Texture Assessment',
        content: 'Skin texture changes provide important prognostic information. Skin resembling dried cow-dung powder indicates severe malnutrition, tissue depletion, or chronic disease. This finding is associated with poor prognosis.',
        clinicalRelevance: 'Specific texture changes help identify disease severity and guide treatment intensity.'
      }
    ],
    doshaDiscussion: [
      'This sign primarily indicates severe Vata vitiation with tissue depletion',
      'May also indicate sannipataja (triple dosha) involvement',
      'Associated with severe dhatu kshaya (tissue depletion)'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['12.3'],
    clinicalApplications: [
      'Skin texture examination',
      'Malnutrition assessment',
      'Chronic disease prognosis',
      'Treatment intensity planning'
    ]
  }
]
