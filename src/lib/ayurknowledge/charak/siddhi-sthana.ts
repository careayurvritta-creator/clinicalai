import type { CharakChapter } from './types'

export const SIDDHI_STHANA: CharakChapter[] = [
  {
    id: 'siddhi-1',
    sthana: 'Siddhi Sthana',
    chapterNumber: 1,
    name: 'Kalpana Siddhi',
    sanskrit: 'कल्पना सिद्धि',
    english: 'Success of Pharmaceutical Preparations',
    summary: 'This chapter discusses the success factors in pharmaceutical preparations and therapeutic procedures. It covers the principles of proper drug preparation, quality control, and the factors that determine the success or failure of panchakarma procedures.',
    keyConcepts: [
      'Success of treatment depends on proper pharmaceutical preparation',
      'Quality of drugs, timing, and preparation methods affect therapeutic outcome',
      'Patient factors (prakriti, agni, satva) influence treatment success',
      'Proper planning and execution ensure optimal results',
      'Knowledge of drug properties and interactions is essential'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ kalpanāsiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Kalpana Siddhi" (Success of pharmaceutical preparations). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on treatment success factors.'
      }
    ],
    topics: [
      {
        title: 'Factors for Treatment Success',
        content: 'Treatment success depends on: 1) Quality of drugs (dravya), 2) Proper timing (kala), 3) Correct preparation method (kalpana), 4) Patient compliance (upasthita), 5) Physician expertise (bhisak). All five factors must be optimal for successful outcome.',
        clinicalRelevance: 'Understanding success factors helps physicians optimize treatment outcomes.'
      }
    ],
    doshaDiscussion: [
      'Treatment success varies by dosha predominance',
      'Kapha disorders respond well to emesis',
      'Pitta disorders respond well to purgation',
      'Vata disorders require specialized procedures like basti'
    ],
    treatmentProtocols: [
      {
        condition: 'All dosha disorders',
        treatment: 'Properly executed panchakarma with quality drugs',
        herbs: ['As per specific disease protocol'],
        dosage: 'As per physician prescription',
        duration: 'Complete panchakarma course',
        precautions: ['Ensure all success factors are optimized', 'Monitor patient response throughout']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Treatment success depends on five factors: drug quality, timing, preparation, patient compliance, and physician expertise',
      'Proper pharmaceutical preparation is the foundation of successful treatment'
    ],
    clinicalApplications: [
      'Quality control in pharmaceutical preparations',
      'Treatment planning and optimization',
      'Patient assessment for treatment suitability',
      'Monitoring treatment progress and outcomes'
    ]
  },
  {
    id: 'siddhi-2',
    sthana: 'Siddhi Sthana',
    chapterNumber: 2,
    name: 'Panchakarmiya Siddhi',
    sanskrit: 'पञ्चकर्मीय सिद्धि',
    english: 'Success of Panchakarma Procedures',
    summary: 'This chapter comprehensively discusses the success of all five panchakarma procedures - vamana (emesis), virechana (purgation), basti (enema), nasya (nasal therapy), and raktamokshana (bloodletting). It covers the criteria for successful completion, post-procedure care, and management of complications.',
    keyConcepts: [
      'Five panchakarma procedures: vamana, virechana, basti, nasya, raktamokshana',
      'Each procedure has specific success criteria (siddhi lakshanas)',
      'Post-procedure care (paschat karma) is as important as the procedure itself',
      'Dietary regimen after panchakarma ensures lasting benefits',
      'Complications can arise from improper execution or patient non-compliance',
      'Sequential procedures should follow proper order for maximum benefit'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ pañcakarmīyasiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Panchakarmiya Siddhi" (Success of Panchakarma procedures). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the comprehensive chapter on panchakarma success.'
      },
      {
        number: '3',
        sanskrit: 'pañcakarmāṇi - vamanam virecanam bastiḥ nasyaṁ raktamokṣaṇam ca',
        translation: 'The five procedures are: emesis, purgation, enema, nasal therapy, and bloodletting.',
        commentary: 'Core verse listing the five fundamental panchakarma procedures.'
      },
      {
        number: '5',
        sanskrit: 'vamanasya siddhiṁ lakṣayet - śuddhāṁ kaphaṁ vamati yadā puruṣaḥ sukhaṁ ca',
        translation: 'Success of emesis is recognized when the patient vomits purified kapha and feels comfortable.',
        commentary: 'Defines the success criteria for vamana karma.'
      }
    ],
    topics: [
      {
        title: 'Vamana Siddhi (Success of Emesis)',
        content: 'Success criteria for emesis: 1) Patient vomits kapha mixed with pitta and vata, 2) Feeling of lightness in chest and throat, 3) Clear voice, 4) Good appetite returns, 5) Symptoms of kapha disorders subside. Signs of excessive emesis: fatigue, fainting, dry mouth, excessive thirst.',
        clinicalRelevance: 'Recognizing success and complications ensures proper post-procedure management.'
      },
      {
        title: 'Virechana Siddhi (Success of Purgation)',
        content: 'Success criteria for purgation: 1) Elimination of pitta through stools, 2) Feeling of lightness in abdomen, 3) Good appetite, 4) Symptoms of pitta disorders subside. Signs of excessive purgation: weakness, dehydration, colic pain.',
        clinicalRelevance: 'Monitoring purgation quality and quantity prevents complications.'
      },
      {
        title: 'Basti Siddhi (Success of Enema)',
        content: 'Success criteria for basti: 1) Proper retention and expulsion of enema fluid, 2) Elimination of vata through flatus and stools, 3) Feeling of lightness, 4) Symptoms of vata disorders subside. Types: anuvasana (oil-based) and niruha (decoction-based).',
        clinicalRelevance: 'Basti is the most important procedure for vata disorders and requires careful monitoring.'
      },
      {
        title: 'Post-Procedure Care (Paschat Karma)',
        content: 'After panchakarma: 1) Samsarjana krama (gradual dietary progression from liquid to solid food), 2) Avoidance of viruddha ahara (incompatible foods), 3) Rest and lifestyle modifications, 4) Rasayana (rejuvenation therapy) for long-term benefits.',
        clinicalRelevance: 'Proper post-procedure care ensures lasting benefits and prevents recurrence.'
      }
    ],
    doshaDiscussion: [
      'Vamana primarily eliminates kapha dosha',
      'Virechana primarily eliminates pitta dosha',
      'Basti primarily eliminates vata dosha',
      'Nasya eliminates doshas from head and neck region',
      'Raktamokshana eliminates rakta (blood) impurities',
      'Sequential procedure order: vamana → virechana → basti → nasya → raktamokshana'
    ],
    treatmentProtocols: [
      {
        condition: 'Kapha disorders (Kaphaja roga)',
        treatment: 'Vamana karma followed by samsarjana krama',
        herbs: ['Madanaphala', 'Yashtimadhu', 'Saindhava', 'Madhu'],
        dosage: 'As per physician prescription',
        duration: 'Pre-procedure: 3-7 days, Procedure: 1 day, Post-procedure: 7-14 days',
        precautions: ['Proper purvakarma essential', 'Monitor emesis quality', 'Manage complications promptly']
      },
      {
        condition: 'Pitta disorders (Pittaja roga)',
        treatment: 'Virechana karma followed by samsarjana krama',
        herbs: ['Trivrit', 'Shyama', 'Draksha', 'Amalaki', 'Madhu'],
        dosage: 'As per physician prescription',
        duration: 'Pre-procedure: 3-7 days, Procedure: 1 day, Post-procedure: 7-14 days',
        precautions: ['Assess agni strength', 'Monitor purgation response', 'Ensure proper hydration']
      },
      {
        condition: 'Vata disorders (Vataja roga)',
        treatment: 'Basti karma with anuvasana and niruha types',
        herbs: ['Tila taila', 'Dashamoola', 'Saindhava', 'Madhu', 'Eranda taila'],
        dosage: 'As per physician prescription (typically 600-900ml for adults)',
        duration: 'Course of 8, 15, or 30 bastis as per condition',
        precautions: ['Proper assessment of basti readiness', 'Monitor retention time', 'Manage complications']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vamana Vyapat (Emesis Complications)',
        sanskrit: 'वमन व्यापत्',
        etiology: 'Improper execution of emesis or patient non-compliance',
        symptoms: ['Excessive vomiting', 'Weakness', 'Fainting', 'Dry mouth', 'Thirst'],
        prognosis: 'Manageable with proper intervention',
        treatment: 'Supportive care, oral rehydration, rest, and appropriate medications'
      },
      {
        name: 'Virechana Vyapat (Purgation Complications)',
        sanskrit: 'विरेचन व्यापत्',
        etiology: 'Excessive purgation or improper drug selection',
        symptoms: ['Dehydration', 'Weakness', 'Colic pain', 'Excessive loose stools'],
        prognosis: 'Manageable with proper intervention',
        treatment: 'Oral rehydration, rest, light diet, and supportive medications'
      }
    ],
    importantVerses: [
      'Five panchakarma procedures form the foundation of Ayurvedic detoxification',
      'Each procedure has specific success criteria that must be monitored',
      'Post-procedure care is as important as the procedure itself',
      'Sequential order of procedures ensures comprehensive dosha elimination'
    ],
    clinicalApplications: [
      'Comprehensive panchakarma practice',
      'Treatment planning and sequencing',
      'Complication management',
      'Post-procedure care optimization',
      'Long-term health maintenance through proper detoxification'
    ]
  },
  {
    id: 'siddhi-3',
    sthana: 'Siddhi Sthana',
    chapterNumber: 3,
    name: 'Bastisutriyam Siddhi',
    sanskrit: 'बस्तिसूत्रीयम् सिद्धि',
    english: 'Success of Basti Therapy - Detailed Principles',
    summary: 'This chapter provides comprehensive details on basti (enema) therapy, including types of basti, preparation methods, administration techniques, success criteria, and management of complications. Basti is considered the most important panchakarma procedure for vata disorders.',
    keyConcepts: [
      'Basti is the most important panchakarma procedure for vata disorders',
      'Two main types: Anuvasana (oil-based) and Niruha/Asthapana (decoction-based)',
      'Basti apparatus includes basti netra (nozzle), basti putaka (bag), and basti yantra (syringe)',
      'Proper patient positioning and technique are essential for success',
      'Retention time and expulsion quality are key success indicators',
      'Complications arise from improper technique or patient factors'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ bastisūtrīyasiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Bastisutriyam Siddhi" (Success of Basti therapy). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the detailed chapter on basti therapy.'
      },
      {
        number: '3',
        sanskrit: 'bastiḥ sarvadā vātaghnaḥ | vāyorāśrayaṁ koshṭhaṁ bastiḥ praviśya vāyuṁ nihanti',
        translation: 'Basti is always vata-destroying. The basti enters the koshtha (colon), the seat of vata, and eliminates the aggravated vata.',
        commentary: 'Core verse establishing basti as the primary treatment for vata disorders.'
      },
      {
        number: '5',
        sanskrit: 'anuvāsanaṁ snehabastiḥ | nirūhaḥ kṣārabastiḥ | tayormiśraḥ kalpabastiḥ',
        translation: 'Anuvasana is oil-based basti. Niruha is decoction-based basti. Their combination is kalpa basti.',
        commentary: 'Classifies the three main types of basti therapy.'
      }
    ],
    topics: [
      {
        title: 'Types of Basti',
        content: '1) Anuvasana Basti (oil-based): Retained for longer duration, nourishing, can be given daily. 2) Niruha/Asthapana Basti (decoction-based): Retained for shorter duration, cleansing, given at specific intervals. 3) Matra Basti (small oil dose): Daily maintenance dose. 4) Uttar Basti (urogenital enema): For urinary and reproductive disorders. 5) Guda Basti (rectal enema): Standard basti procedure.',
        clinicalRelevance: 'Selection of basti type depends on the disease, patient condition, and treatment goals.'
      },
      {
        title: 'Basti Administration Technique',
        content: 'Patient lies in left lateral position with left leg extended and right leg flexed. Lubricated basti netra (nozzle) is inserted 4 inches into the rectum. Fluid is administered slowly and steadily. Patient should retain the fluid for the prescribed duration. Left side position is preferred as it facilitates fluid distribution in the colon.',
        clinicalRelevance: 'Proper technique ensures maximum retention and therapeutic benefit.'
      },
      {
        title: 'Success Criteria for Basti',
        content: 'Successful basti results in: 1) Proper retention of fluid, 2) Gradual and comfortable expulsion, 3) Elimination of vitiated vata, 4) Relief from vata symptoms, 5) Improved appetite and digestion, 6) Feeling of lightness and well-being. Signs of failure: immediate expulsion, no relief from symptoms, or development of complications.',
        clinicalRelevance: 'Monitoring success criteria helps in adjusting treatment protocol.'
      },
      {
        title: 'Basti Complications and Management',
        content: 'Common complications: 1) Immediate expulsion - improper technique or patient anxiety, 2) Colic pain - excessive vata or air entry, 3) Retention difficulty - weak anal sphincter or improper fluid temperature, 4) Nausea - fluid reaching stomach. Management includes supportive care, position adjustment, and appropriate medications.',
        clinicalRelevance: 'Recognizing and managing complications ensures patient safety and treatment success.'
      }
    ],
    doshaDiscussion: [
      'Basti is the primary treatment for vata disorders',
      'Anuvasana basti nourishes and calms vata',
      'Niruha basti cleanses vata and removes ama',
      'Basti also indirectly affects pitta and kapha through vata regulation',
      'The colon (purishadhara kala) is the primary seat of vata'
    ],
    treatmentProtocols: [
      {
        condition: 'Vata Vyadhi (Vata disorders)',
        treatment: 'Course of basti therapy with alternating anuvasana and niruha',
        herbs: ['Tila taila (sesame oil)', 'Dashamoola', 'Saindhava', 'Madhu', 'Eranda taila'],
        dosage: 'Anuvasana: 600-900ml oil, Niruha: 400-600ml decoction',
        duration: '8, 15, or 30 bastis as per disease severity',
        precautions: ['Assess basti readiness', 'Proper technique essential', 'Monitor retention and expulsion']
      },
      {
        condition: 'Sandhivata (Osteoarthritis)',
        treatment: 'Anuvasana basti with medicated oils',
        herbs: ['Mahanarayan taila', 'Dashamoola kwatha', 'Saindhava'],
        dosage: '600-900ml as per patient capacity',
        duration: '15-30 bastis in course',
        precautions: ['Assess joint condition', 'Combine with external oleation']
      },
      {
        condition: 'Pakshaghata (Hemiplegia/Paralysis)',
        treatment: 'Intensive basti therapy with both types',
        herbs: ['Sesame oil', 'Dashamoola', 'Rasna', 'Eranda', 'Saindhava'],
        dosage: 'As per patient capacity and disease severity',
        duration: '30 bastis minimum for neurological conditions',
        precautions: ['Neurological assessment essential', 'Monitor motor function recovery']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Gridhrasi (Sciatica)',
        sanskrit: 'गृध्रसी',
        etiology: 'Vata vitiation affecting the sciatic nerve pathway',
        symptoms: ['Pain radiating from lower back to leg', 'Difficulty walking', 'Numbness', 'Tingling sensation'],
        prognosis: 'Sadhyasadhya (curable with proper basti therapy)',
        treatment: 'Anuvasana and niruha basti with vata-shamaka drugs'
      },
      {
        name: 'Apana Vata Dushti',
        sanskrit: 'अपान वात दुष्टि',
        etiology: 'Vitiation of apana vata in the lower abdomen and pelvis',
        symptoms: ['Urinary disorders', 'Constipation', 'Lower abdominal pain', 'Reproductive disorders'],
        prognosis: 'Sadhyasadhya (curable with basti therapy)',
        treatment: 'Basti therapy with appropriate medicated oils and decoctions'
      }
    ],
    importantVerses: [
      'Basti is always vata-destroying and is the most important panchakarma procedure',
      'The colon is the primary seat of vata, making basti the ideal delivery method',
      'Anuvasana and niruha basti complement each other for comprehensive vata management',
      'Proper technique and patient positioning are essential for successful basti'
    ],
    clinicalApplications: [
      'Primary treatment for all vata disorders',
      'Management of neurological conditions (paralysis, sciatica)',
      'Treatment of musculoskeletal disorders (arthritis, back pain)',
      'Reproductive and urinary disorder management',
      'Chronic pain management',
      'Post-panchakarma maintenance therapy'
    ]
  },
  {
    id: 'siddhi-4',
    sthana: 'Siddhi Sthana',
    chapterNumber: 4,
    name: 'Snehavyapat Siddhi',
    sanskrit: 'स्नेहव्यापत् सिद्धि',
    english: 'Success in Managing Oleation Complications',
    summary: 'This chapter discusses the complications that can arise from improper oleation (sneha) therapy and their management. Oleation is a crucial pre-procedure step in panchakarma, and understanding its complications ensures safe practice.',
    keyConcepts: [
      'Oleation (snehana) is a prerequisite for panchakarma procedures',
      'Internal oleation uses medicated ghee or oil',
      'External oleation uses oil massage (abhyanga)',
      'Complications arise from improper dose, timing, or patient selection',
      'Signs of proper oleation include softness of body parts and improved digestion',
      'Complications include nausea, heaviness, and digestive disturbance'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ snehavyāpatsiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Snehavyapat Siddhi" (Success in managing oleation complications). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on oleation complication management.'
      }
    ],
    topics: [
      {
        title: 'Types of Oleation',
        content: '1) Internal oleation (antah snehana): Intake of medicated ghee or oil in increasing doses over 3-7 days. 2) External oleation (bahih snehana): Oil massage (abhyanga), oil pooling (shirodhara), oil application to specific body parts. 3) Combined oleation: Both internal and external simultaneously.',
        clinicalRelevance: 'Proper selection and execution of oleation type ensures optimal preparation for panchakarma.'
      },
      {
        title: 'Signs of Proper Oleation',
        content: 'Proper oleation is indicated by: 1) Softness of body parts, 2) Improved digestion, 3) Feeling of lightness, 4) Proper sleep, 5) Comfortable bowel movements, 6) Symptoms of dosha disorders begin to improve. These signs indicate the body is ready for the main panchakarma procedure.',
        clinicalRelevance: 'Recognizing proper oleation ensures the body is adequately prepared for elimination procedures.'
      },
      {
        title: 'Oleation Complications',
        content: 'Complications from improper oleation: 1) Nausea and vomiting - excessive dose or weak agni, 2) Heaviness - incompatible oil or excessive quantity, 3) Digestive disturbance - improper timing or patient selection, 4) Skin reactions - external oleation complications. Management includes adjusting dose, changing oil type, and supportive care.',
        clinicalRelevance: 'Early recognition and management of complications ensures patient safety.'
      }
    ],
    doshaDiscussion: [
      'Oleation primarily affects vata and pitta doshas',
      'Proper oleation pacifies vata and nourishes body tissues',
      'Excessive oleation can increase kapha and cause digestive disturbance',
      'Selection of oil type depends on predominant dosha'
    ],
    treatmentProtocols: [
      {
        condition: 'Pre-panchakarma preparation',
        treatment: 'Graduated internal oleation with medicated ghee',
        herbs: ['Ghrita (ghee)', 'Pippali', 'Shunthi', 'Maricha'],
        dosage: 'Start with 50ml, increase by 50ml daily up to maximum tolerated dose',
        duration: '3-7 days depending on disease and patient capacity',
        precautions: ['Monitor digestion daily', 'Adjust dose based on tolerance', 'Stop if complications arise']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Snehavyapat (Oleation Complications)',
        sanskrit: 'स्नेहव्यापत्',
        etiology: 'Improper dose, timing, or patient selection for oleation',
        symptoms: ['Nausea', 'Heaviness', 'Digestive disturbance', 'Skin reactions'],
        prognosis: 'Manageable with proper intervention',
        treatment: 'Dose adjustment, oil type change, supportive care, and digestive stimulants'
      }
    ],
    importantVerses: [
      'Oleation is a crucial prerequisite for panchakarma procedures',
      'Proper oleation ensures the body is ready for elimination procedures',
      'Complications from improper oleation must be recognized and managed promptly'
    ],
    clinicalApplications: [
      'Pre-panchakarma preparation',
      'Management of oleation complications',
      'Optimization of treatment protocols',
      'Patient education on pre-procedure requirements'
    ]
  },
  {
    id: 'siddhi-5',
    sthana: 'Siddhi Sthana',
    chapterNumber: 5,
    name: 'Netrabastivyapat Siddhi',
    sanskrit: 'नेत्रबस्तिव्यापत् सिद्धि',
    english: 'Success in Managing Eye Basti Complications',
    summary: 'This chapter discusses the complications that can arise from netra basti (eye bath/enema with medicated oils) and their management. Netra basti is a specialized procedure for eye disorders.',
    keyConcepts: [
      'Netra basti is a specialized panchakarma procedure for eye disorders',
      'Uses medicated oils or ghee applied to the eyes using a dough dam',
      'Complications can arise from improper technique or drug selection',
      'Proper assessment of eye condition is essential before procedure',
      'Post-procedure care includes eye rest and light diet'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ netravastivyāpatsiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Netrabastivyapat Siddhi" (Success in managing eye basti complications). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on eye basti complication management.'
      }
    ],
    topics: [
      {
        title: 'Netra Basti Procedure',
        content: 'A dough dam is created around the eyes and filled with warm medicated oil or ghee. The patient opens and closes eyes periodically to allow the medicine to penetrate. Duration: 15-30 minutes. After removal of oil, gentle massage is done around the eyes.',
        clinicalRelevance: 'Proper technique ensures therapeutic benefit and prevents complications.'
      },
      {
        title: 'Eye Basti Indications',
        content: 'Indicated for: 1) Timira (early cataract), 2) Druk shushkata (dry eyes), 3) Eye strain and fatigue, 4) Vision problems, 5) Pitta disorders affecting eyes, 6) Vata disorders affecting eyes.',
        clinicalRelevance: 'Understanding indications helps in proper patient selection for netra basti.'
      }
    ],
    doshaDiscussion: [
      'Netra basti primarily addresses pitta and vata doshas affecting the eyes',
      'Medicated oils pacify vata and nourish eye tissues',
      'Cool potency oils are preferred for pitta eye disorders'
    ],
    treatmentProtocols: [
      {
        condition: 'Eye disorders (Drishti dosha)',
        treatment: 'Netra basti with appropriate medicated oil',
        herbs: ['Triphala ghrita', 'Anu taila', 'Jeevantyadi ghrita'],
        dosage: 'Sufficient oil to fill the dough dam around eyes',
        duration: '15-30 minutes per session, course of 7-14 sessions',
        precautions: ['Assess eye condition before procedure', 'Use appropriate temperature oil', 'Monitor for adverse reactions']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Timira (Early cataract)',
        sanskrit: 'तिमिर',
        etiology: 'Vata-pitta vitiation affecting eye tissues',
        symptoms: ['Blurred vision', 'Difficulty seeing in dim light', 'Eye strain'],
        prognosis: 'Early stages are treatable with netra basti',
        treatment: 'Netra basti with triphala ghrita and internal medications'
      }
    ],
    importantVerses: [
      'Netra basti is a specialized procedure for eye disorders',
      'Proper technique and drug selection prevent complications',
      'Post-procedure eye rest is essential for lasting benefits'
    ],
    clinicalApplications: [
      'Treatment of early cataract and vision problems',
      'Management of dry eyes and eye strain',
      'Prevention of age-related eye disorders',
      'Supportive therapy for eye diseases'
    ]
  },
  {
    id: 'siddhi-6',
    sthana: 'Siddhi Sthana',
    chapterNumber: 6,
    name: 'Vamana Virechana Vyapat Siddhi',
    sanskrit: 'वमन विरेचन व्यापत् सिद्धि',
    english: 'Success in Managing Emesis and Purgation Complications',
    summary: 'This chapter comprehensively discusses the complications arising from vamana (emesis) and virechana (purgation) procedures and their management. It provides detailed guidance on recognizing and treating adverse reactions to ensure patient safety.',
    keyConcepts: [
      'Complications from emesis and purgation are predictable and manageable',
      'Early recognition of complications prevents serious adverse outcomes',
      'Specific treatments exist for each type of complication',
      'Patient factors (prakriti, agni, disease severity) influence complication risk',
      'Proper pre-procedure preparation reduces complication incidence',
      'Emergency management protocols must be available during procedures'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ vamanavirecanavyāpatsiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Vamana Virechana Vyapat Siddhi" (Success in managing emesis and purgation complications). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the comprehensive chapter on procedure complication management.'
      }
    ],
    topics: [
      {
        title: 'Vamana Complications and Management',
        content: '1) Ativamana (excessive emesis): Rest, oral rehydration, light diet. 2) Avamana (no emesis): Repeat procedure with adjusted dose. 3) Raktayukta vamana (blood in vomit): Stop procedure, assess cause, supportive care. 4) Shvasa (dyspnea during emesis): Stop procedure, position adjustment, respiratory support. 5) Hikka (hiccups): Specific medications and position change.',
        clinicalRelevance: 'Immediate recognition and management of emesis complications prevents serious outcomes.'
      },
      {
        title: 'Virechana Complications and Management',
        content: '1) Atisara (excessive purgation): Oral rehydration, rest, binding foods. 2) Avirechana (no purgation): Repeat with adjusted dose. 3) Raktatisara (bloody stools): Stop procedure, assess cause, supportive care. 4) Parikartika (anal fissure pain): Local application, sitz bath. 5) Shula (colic pain): Antispasmodics, warm application.',
        clinicalRelevance: 'Proper management of purgation complications ensures patient recovery and treatment success.'
      }
    ],
    doshaDiscussion: [
      'Emesis complications primarily involve kapha disturbance',
      'Purgation complications primarily involve pitta disturbance',
      'Vata can be disturbed by either procedure if improperly executed',
      'Complication management must address the disturbed dosha'
    ],
    treatmentProtocols: [
      {
        condition: 'Ativamana (Excessive emesis)',
        treatment: 'Stop procedure, oral rehydration, rest, light diet',
        herbs: ['Yashtimadhu', 'Guduchi', 'Madhu'],
        dosage: 'Oral rehydration solution and light food as tolerated',
        duration: '24-48 hours of observation and care',
        precautions: ['Monitor vital signs', 'Assess dehydration', 'Ensure adequate rest']
      },
      {
        condition: 'Atisara (Excessive purgation)',
        treatment: 'Oral rehydration, binding foods, rest',
        herbs: ['Bilva', 'Dadima', 'Kutaja', 'Madhu'],
        dosage: 'Oral rehydration and binding foods as tolerated',
        duration: '24-48 hours of observation and care',
        precautions: ['Monitor dehydration signs', 'Assess electrolyte balance', 'Ensure adequate rest']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vamana Vyapat (Emesis Complications)',
        sanskrit: 'वमन व्यापत्',
        etiology: 'Improper execution of emesis or patient factors',
        symptoms: ['Excessive vomiting', 'Blood in vomit', 'Dyspnea', 'Hiccups', 'Weakness'],
        prognosis: 'Manageable with prompt intervention',
        treatment: 'Stop procedure, supportive care, appropriate medications'
      },
      {
        name: 'Virechana Vyapat (Purgation Complications)',
        sanskrit: 'विरेचन व्यापत्',
        etiology: 'Improper execution of purgation or patient factors',
        symptoms: ['Excessive loose stools', 'Blood in stools', 'Colic pain', 'Anal fissure pain', 'Dehydration'],
        prognosis: 'Manageable with prompt intervention',
        treatment: 'Stop procedure, oral rehydration, supportive care, appropriate medications'
      }
    ],
    importantVerses: [
      'Complications from emesis and purgation are predictable and manageable',
      'Early recognition prevents serious adverse outcomes',
      'Emergency management protocols must be available during all panchakarma procedures'
    ],
    clinicalApplications: [
      'Complication management during panchakarma',
      'Emergency preparedness for panchakarma practice',
      'Quality assurance in panchakarma procedures',
      'Patient safety optimization'
    ]
  },
  {
    id: 'siddhi-7',
    sthana: 'Siddhi Sthana',
    chapterNumber: 7,
    name: 'Bastivyapat Siddhi',
    sanskrit: 'बस्तिव्यापत् सिद्धि',
    english: 'Success in Managing Basti Complications',
    summary: 'This chapter discusses the complications that can arise from basti (enema) therapy and their management. Basti is the most important panchakarma procedure, and understanding its complications is essential for safe practice.',
    keyConcepts: [
      'Basti complications are predictable based on technique and patient factors',
      'Immediate expulsion, colic pain, and retention difficulty are common complications',
      'Proper technique and patient preparation prevent most complications',
      'Complications from basti can be more serious than from emesis or purgation',
      'Emergency management protocols are essential for basti practice'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ bastivyāpatsiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Bastivyapat Siddhi" (Success in managing basti complications). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on basti complication management.'
      }
    ],
    topics: [
      {
        title: 'Basti Complications and Management',
        content: '1) Avasandhi (immediate expulsion): Improve technique, adjust fluid temperature. 2) Shula (colic pain): Antispasmodics, warm application, position change. 3) Basti adhmana (abdominal distension): Position change, gentle massage, passage of flatus. 4) Basti pratiloma (reverse movement): Stop procedure, position adjustment. 5) Guda bheda (anal tearing): Local care, healing applications.',
        clinicalRelevance: 'Immediate recognition and management of basti complications prevents serious outcomes.'
      }
    ],
    doshaDiscussion: [
      'Basti complications primarily involve vata disturbance',
      'Improper technique can disturb all three doshas',
      'Complication management must address the disturbed dosha pattern'
    ],
    treatmentProtocols: [
      {
        condition: 'Basti Shula (Colic during basti)',
        treatment: 'Stop procedure, warm application, antispasmodics',
        herbs: ['Hing', 'Saindhava', 'Eranda taila'],
        dosage: 'Antispasmodic medication as per severity',
        duration: 'Symptomatic relief usually within 30 minutes',
        precautions: ['Assess for other complications', 'Monitor vital signs']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Basti Vyapat (Basti Complications)',
        sanskrit: 'बस्तिव्यापत्',
        etiology: 'Improper technique, fluid temperature, or patient factors',
        symptoms: ['Immediate expulsion', 'Colic pain', 'Abdominal distension', 'Anal discomfort'],
        prognosis: 'Manageable with prompt intervention',
        treatment: 'Technique adjustment, supportive care, appropriate medications'
      }
    ],
    importantVerses: [
      'Basti complications require immediate attention and management',
      'Proper technique is the best prevention for basti complications',
      'Emergency management protocols must be available during basti practice'
    ],
    clinicalApplications: [
      'Safe basti practice with complication management',
      'Emergency preparedness for basti therapy',
      'Quality assurance in basti procedures',
      'Training and competency development for basti practitioners'
    ]
  },
  {
    id: 'siddhi-8',
    sthana: 'Siddhi Sthana',
    chapterNumber: 8,
    name: 'Prasrita Yogiyam Siddhi',
    sanskrit: 'प्रसृत योगीयम् सिद्धि',
    english: 'Success in Specific Treatment Combinations',
    summary: 'This chapter discusses specific treatment combinations and their success in managing complex disease conditions. It covers the integration of multiple panchakarma procedures with internal medications for optimal outcomes.',
    keyConcepts: [
      'Complex diseases require integrated treatment approaches',
      'Combination of panchakarma procedures enhances therapeutic outcomes',
      'Internal medications complement external procedures',
      'Treatment sequencing is crucial for maximum benefit',
      'Patient assessment guides treatment combination selection'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ prasṛtoyīyasiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Prasrita Yogiyam Siddhi" (Success in specific treatment combinations). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on integrated treatment approaches.'
      }
    ],
    topics: [
      {
        title: 'Integrated Treatment Approaches',
        content: 'Complex diseases benefit from combining multiple treatment modalities: 1) Panchakarma for detoxification, 2) Internal medications for ongoing management, 3) External therapies for local conditions, 4) Dietary modifications for prevention, 5) Lifestyle changes for long-term health.',
        clinicalRelevance: 'Integrated approaches address the multifactorial nature of chronic diseases.'
      }
    ],
    doshaDiscussion: [
      'Complex diseases often involve multiple doshas',
      'Treatment combinations must address all involved doshas',
      'Sequential treatment allows for comprehensive dosha management'
    ],
    treatmentProtocols: [
      {
        condition: 'Complex chronic diseases',
        treatment: 'Integrated panchakarma with internal and external therapies',
        herbs: ['As per specific disease protocol'],
        dosage: 'Individualized based on disease and patient factors',
        duration: 'Extended treatment courses for chronic conditions',
        precautions: ['Comprehensive patient assessment essential', 'Monitor response and adjust protocol']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Complex diseases require integrated treatment approaches',
      'Treatment combinations must be individualized for each patient',
      'Sequential treatment allows for comprehensive disease management'
    ],
    clinicalApplications: [
      'Management of complex chronic diseases',
      'Integrated treatment planning',
      'Optimization of treatment outcomes',
      'Long-term disease management strategies'
    ]
  },
  {
    id: 'siddhi-9',
    sthana: 'Siddhi Sthana',
    chapterNumber: 9,
    name: 'Trimarmiya Siddhi',
    sanskrit: 'त्रिमर्मीय सिद्धि',
    english: 'Success in Managing Three Vital Organ Disorders',
    summary: 'This chapter discusses the treatment success in disorders affecting the three vital organs (trimarma) - head (shiras), heart (hridaya), and bladder (basti). These are critical areas that require specialized treatment approaches.',
    keyConcepts: [
      'Three vital organs: head (shiras), heart (hridaya), bladder (basti)',
      'Disorders of vital organs are potentially life-threatening',
      'Specialized treatment approaches are required for each vital organ',
      'Early intervention improves treatment outcomes',
      'Prevention of vital organ disorders is emphasized'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ trimarmīyasiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Trimarmiya Siddhi" (Success in managing vital organ disorders). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on vital organ disorder management.'
      }
    ],
    topics: [
      {
        title: 'Vital Organ Assessment',
        content: 'The three vital organs (trimarma) are critical areas where dosha vitiation can be life-threatening: 1) Shiras (head) - seat of indriya (senses), 2) Hridaya (heart) - seat of consciousness, 3) Basti (bladder) - seat of apana vata. Assessment of these areas is essential in all disease evaluations.',
        clinicalRelevance: 'Vital organ assessment helps in prioritizing treatment and preventing serious complications.'
      }
    ],
    doshaDiscussion: [
      'Head disorders involve vata and kapha doshas',
      'Heart disorders involve vata and pitta doshas',
      'Bladder disorders involve vata dosha primarily',
      'Vital organ disorders require urgent and specialized treatment'
    ],
    treatmentProtocols: [
      {
        condition: 'Shiroroga (Head disorders)',
        treatment: 'Nasya, shirodhara, and internal medications',
        herbs: ['Anu taila', 'Brahmi', 'Shankhapushpi', 'Jatamansi'],
        dosage: 'As per physician prescription',
        duration: 'Extended treatment courses',
        precautions: ['Neurological assessment essential', 'Monitor for serious complications']
      },
      {
        condition: 'Hridroga (Heart disorders)',
        treatment: 'Internal medications and lifestyle modifications',
        herbs: ['Arjuna', 'Pushkarmoola', 'Jatamansi', 'Brahmi'],
        dosage: 'As per physician prescription',
        duration: 'Long-term management',
        precautions: ['Cardiac monitoring essential', 'Emergency measures must be available']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Shiroroga (Head disorders)',
        sanskrit: 'शिरोरोग',
        etiology: 'Vata-kapha vitiation affecting the head region',
        symptoms: ['Headache', 'Sinusitis', 'Neurological symptoms', 'Sensory disturbances'],
        prognosis: 'Varies by specific condition',
        treatment: 'Nasya, shirodhara, and internal medications'
      }
    ],
    importantVerses: [
      'Three vital organs require special attention in all disease assessments',
      'Disorders of vital organs are potentially life-threatening',
      'Early intervention improves treatment outcomes for vital organ disorders'
    ],
    clinicalApplications: [
      'Assessment and management of vital organ disorders',
      'Emergency management of critical conditions',
      'Prevention of vital organ complications',
      'Specialized treatment approaches for critical areas'
    ]
  },
  {
    id: 'siddhi-10',
    sthana: 'Siddhi Sthana',
    chapterNumber: 10,
    name: 'Basti Siddhi',
    sanskrit: 'बस्ति सिद्धि',
    english: 'Success of Basti Therapy - Advanced Principles',
    summary: 'This chapter provides advanced principles of basti therapy, including specialized formulations, advanced techniques, and management of complex basti scenarios. It builds upon the foundational basti knowledge from earlier chapters.',
    keyConcepts: [
      'Advanced basti formulations for specific disease conditions',
      'Specialized techniques for complex clinical scenarios',
      'Integration of basti with other panchakarma procedures',
      'Long-term basti therapy management',
      'Monitoring and adjusting basti protocols based on response'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ bastisiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Basti Siddhi" (Success of basti therapy - advanced principles). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the advanced chapter on basti therapy.'
      }
    ],
    topics: [
      {
        title: 'Advanced Basti Formulations',
        content: 'Specialized basti formulations for specific conditions: 1) Dashamoola basti for inflammatory conditions, 2) Tikta ksheera basti for skin diseases, 3) Madhutailika basti for neurological conditions, 4) Yoga basti combining multiple drugs. Formulations are customized based on disease, dosha, and patient factors.',
        clinicalRelevance: 'Advanced formulations allow targeted treatment for specific disease conditions.'
      },
      {
        title: 'Complex Basti Scenarios',
        content: 'Managing basti in complex situations: 1) Multiple dosha involvement, 2) Chronic diseases with complications, 3) Debilitated patients, 4) Pediatric and geriatric patients, 5) Patients with comorbidities. Each scenario requires modified protocols and careful monitoring.',
        clinicalRelevance: 'Expert management of complex scenarios ensures treatment success across diverse patient populations.'
      }
    ],
    doshaDiscussion: [
      'Advanced basti therapy addresses complex dosha patterns',
      'Multiple dosha involvement requires combination formulations',
      'Chronic conditions require extended treatment protocols'
    ],
    treatmentProtocols: [
      {
        condition: 'Complex vata disorders',
        treatment: 'Advanced basti protocols with specialized formulations',
        herbs: ['Dashamoola', 'Tila taila', 'Eranda taila', 'Saindhava', 'Madhu'],
        dosage: 'Individualized based on disease and patient capacity',
        duration: 'Extended courses as per disease chronicity',
        precautions: ['Comprehensive assessment essential', 'Regular monitoring and protocol adjustment']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Advanced basti therapy addresses complex clinical scenarios',
      'Specialized formulations allow targeted treatment for specific conditions',
      'Expert management ensures treatment success across diverse patient populations'
    ],
    clinicalApplications: [
      'Advanced basti practice for complex conditions',
      'Specialized formulation development',
      'Expert-level panchakarma practice',
      'Research and development in basti therapy'
    ]
  },
  {
    id: 'siddhi-11',
    sthana: 'Siddhi Sthana',
    chapterNumber: 11,
    name: 'Phalamatra Siddhi',
    sanskrit: 'फलमात्रा सिद्धि',
    english: 'Success in Determining Treatment Outcomes',
    summary: 'This chapter discusses the factors that determine treatment outcomes and success metrics in panchakarma therapy. It provides guidelines for assessing treatment response and determining the appropriate duration and intensity of therapy.',
    keyConcepts: [
      'Treatment outcomes depend on multiple factors',
      'Success metrics must be defined before treatment begins',
      'Regular assessment guides treatment adjustments',
      'Patient compliance is crucial for treatment success',
      'Long-term outcomes require follow-up and maintenance'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athātaḥ phalamātrāsiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Phalamatra Siddhi" (Success in determining treatment outcomes). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on treatment outcome assessment.'
      }
    ],
    topics: [
      {
        title: 'Treatment Outcome Assessment',
        content: 'Factors determining treatment outcomes: 1) Disease severity and chronicity, 2) Patient prakriti and agni, 3) Treatment appropriateness, 4) Patient compliance, 5) Environmental and lifestyle factors. Regular assessment using defined success metrics guides treatment adjustments.',
        clinicalRelevance: 'Systematic outcome assessment ensures treatment optimization and patient satisfaction.'
      }
    ],
    doshaDiscussion: [
      'Treatment outcomes vary by dosha predominance',
      'Kapha disorders generally respond faster to treatment',
      'Vata disorders may require longer treatment courses',
      'Multiple dosha involvement affects treatment timeline'
    ],
    treatmentProtocols: [
      {
        condition: 'All conditions - outcome assessment',
        treatment: 'Regular monitoring and protocol adjustment',
        herbs: ['As per specific disease protocol'],
        dosage: 'Adjusted based on treatment response',
        duration: 'Varies by disease and treatment goals',
        precautions: ['Define success metrics before treatment', 'Regular follow-up essential']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: [
      'Treatment outcomes depend on multiple interconnected factors',
      'Regular assessment and protocol adjustment optimize treatment success',
      'Patient compliance is crucial for achieving desired outcomes'
    ],
    clinicalApplications: [
      'Treatment outcome assessment and optimization',
      'Quality assurance in panchakarma practice',
      'Patient communication and expectation management',
      'Research methodology for treatment evaluation'
    ]
  },
  {
    id: 'siddhi-12',
    sthana: 'Siddhi Sthana',
    chapterNumber: 12,
    name: 'Uttar Basti Siddhi',
    sanskrit: 'उत्तर बस्ति सिद्धि',
    english: 'Success of Uttar Basti (Urogenital Enema)',
    summary: 'This chapter discusses uttar basti (urogenital enema), a specialized basti procedure administered through the urethral or vaginal route for urinary and reproductive disorders. It covers indications, techniques, success criteria, and complication management.',
    keyConcepts: [
      'Uttar basti is a specialized basti procedure for urogenital disorders',
      'Two types: urethral (mutra margha) and vaginal (yoni) route',
      'Indicated for urinary disorders, infertility, and reproductive conditions',
      'Requires specialized training and expertise',
      'Success criteria include symptom relief and functional improvement',
      'Complications are manageable with proper technique and monitoring'
    ],
    shlokas: [
      {
        number: '1-2',
        sanskrit: 'athāta uttarabastisiddhiṁ vyākhyāsyāmaḥ || iti ha smāha bhagavānātreyaḥ',
        translation: 'Now we shall expound the chapter "Uttar Basti Siddhi" (Success of uttar basti). Thus said Lord Atreya.',
        commentary: 'Opening verse establishing the chapter on uttar basti therapy.'
      },
      {
        number: '3',
        sanskrit: 'uttara basti mutra margha yoni ca | tatra mutra margha basti mutra rogeshu | yoni basti yoni rogeshu',
        translation: 'Uttar basti is administered through urethral and vaginal routes. Urethral route for urinary disorders, vaginal route for reproductive disorders.',
        commentary: 'Core verse establishing the two routes and their indications for uttar basti.'
      }
    ],
    topics: [
      {
        title: 'Urethral Uttar Basti (Mutra Margha Basti)',
        content: 'Indicated for: 1) Mutraghata (urinary obstruction), 2) Ashmari (calculi), 3) Prameha (urinary disorders), 4) Mutrakrichra (dysuria). Uses medicated oils or decoctions. Requires specialized catheter and technique. Duration: 5-15 minutes per session.',
        clinicalRelevance: 'Urethral uttar basti provides direct drug delivery to the urinary system.'
      },
      {
        title: 'Vaginal Uttar Basti (Yoni Basti)',
        content: 'Indicated for: 1) Yoni roga (vaginal disorders), 2) Artava dosha (menstrual disorders), 3) Infertility, 4) Garbha ashayu shuddhi (uterine cleansing). Uses medicated oils or decoctions. Duration: 15-30 minutes per session. Requires specialized expertise.',
        clinicalRelevance: 'Vaginal uttar basti is essential for reproductive health and fertility management.'
      }
    ],
    doshaDiscussion: [
      'Uttar basti primarily addresses vata dosha in the urogenital region',
      'Urinary disorders involve vata and kapha doshas',
      'Reproductive disorders involve vata and pitta doshas',
      'Uttar basti can balance all three doshas in the pelvic region'
    ],
    treatmentProtocols: [
      {
        condition: 'Mutraghata (Urinary obstruction)',
        treatment: 'Urethral uttar basti with medicated oil',
        herbs: ['Tila taila', 'Gokshura', 'Pashanbheda', 'Shilajit'],
        dosage: '10-30ml medicated oil per session',
        duration: '5-15 minutes per session, course of 7-14 sessions',
        precautions: ['Specialized training required', 'Sterile technique essential', 'Monitor for complications']
      },
      {
        condition: 'Infertility (Vandhyatva)',
        treatment: 'Vaginal uttar basti with medicated oils',
        herbs: ['Phala ghrita', 'Shatavari', 'Ashoka', 'Lodhra'],
        dosage: '30-60ml medicated oil per session',
        duration: '15-30 minutes per session, course based on menstrual cycle',
        precautions: ['Specialized gynecological expertise required', 'Timing with menstrual cycle important']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Mutraghata (Urinary obstruction)',
        sanskrit: 'मूत्राघात',
        etiology: 'Vata vitiation affecting urinary flow',
        symptoms: ['Difficulty in urination', 'Incomplete emptying', 'Abdominal distension', 'Pain'],
        prognosis: 'Sadhyasadhya (curable with uttar basti)',
        treatment: 'Urethral uttar basti with vata-shamaka drugs'
      },
      {
        name: 'Vandhyatva (Infertility)',
        sanskrit: 'वन्ध्यत्व',
        etiology: 'Vata-pitta vitiation affecting reproductive tissues',
        symptoms: ['Inability to conceive', 'Menstrual irregularities', 'Pelvic pain'],
        prognosis: 'Varies by underlying cause',
        treatment: 'Vaginal uttar basti with reproductive-supportive drugs'
      }
    ],
    importantVerses: [
      'Uttar basti is administered through urethral and vaginal routes',
      'Urethral route for urinary disorders, vaginal route for reproductive disorders',
      'Specialized training and expertise are essential for uttar basti practice'
    ],
    clinicalApplications: [
      'Management of urinary disorders',
      'Treatment of infertility and reproductive conditions',
      'Urogenital health maintenance',
      'Specialized panchakarma practice for pelvic disorders'
    ]
  }
];

// Export summary for reference
export const SIDDHI_STHANA_SUMMARY = {
  sthana: 'Siddhi Sthana',
  totalChapters: 12,
  focus: 'Success of panchakarma procedures, complication management, and advanced therapeutic techniques',
  keyTopics: [
    'Panchakarma success criteria and monitoring',
    'Complication management for all panchakarma procedures',
    'Advanced basti therapy principles',
    'Vital organ disorder management',
    'Treatment outcome assessment',
    'Specialized procedures like uttar basti'
  ],
  restoredBy: 'Dridhabala (original chapters by Agnivesha, revised by Charaka)'
};
