/**
 * Charak Samhita - Vimana Sthana (Section on Specific Medical Principles)
 * 8 Chapters covering taste, diet, disease classification, srotas, and diagnostic methods
 * Source: carakasamhitaonline.com (CC BY-NC-SA 4.0)
 */

import type { CharakChapter } from './types'
export type { CharakChapter }

export const VIMANA_STHANA: CharakChapter[] = [
  {
    id: 'vimana-1',
    sthana: 'Vimana Sthana',
    chapterNumber: 1,
    name: 'Rasa Vimana',
    sanskrit: 'रसविमानम्',
    english: 'Taste-based factors for measurement of diseases and drugs',
    summary: 'This foundational chapter establishes the relationship between rasa (taste) and dosha. Six rasas - madhura (sweet), amla (sour), lavana (saline), katu (pungent), tikta (bitter), kashaya (astringent) - each have specific effects on the three doshas. The chapter describes ashta vidha ahara visheshayatana (eight factors of diet) and dwadasha ahara vidhi vidhana (twelve rules of eating). It establishes that proper understanding of rasa-dosha interaction is fundamental to both diagnosis and treatment.',
    keyConcepts: [
      'Six rasas and their effects on three doshas',
      'Rasa-dosha interaction: similar properties aggravate, opposite properties pacify',
      'Madhura, amla, lavana pacify Vata; katu, tikta, kashaya aggravate Vata',
      'Madhura, tikta, kashaya pacify Pitta; katu, amla, lavana aggravate Pitta',
      'Katu, tikta, kashaya pacify Kapha; madhura, amla, lavana aggravate Kapha',
      'Prakriti samavaya - direct effect of substance based on inherent properties',
      'Vikriti vishama samavaya - unpredictable effect when substances are combined',
      'Ashta vidha ahara visheshayatana - eight specific dietary factors',
      'Dwadasha ahara vidhi vidhana - twelve rules for taking meals',
      'Satmya - adaptation/habituation to food and lifestyle',
      'Three substances contra-indicated for long-term use: pippali, kshara (alkali), lavana (salt)',
      'Dravya prabhava - effect of substance beyond rasa and guna'
    ],
    shlokas: [
      {
        number: '1.4',
        sanskrit: 'रसास्तावत् षट्- मधुराम्ललवणकटुतिक्तकषायाः| ते सम्यगुपयुज्यमानाः शरीरं यापयन्ति, मिथ्योपयुज्यमानास्तु खलु दोषप्रकोपायोपकल्पन्ते||',
        translation: 'Rasas are six - sweet, sour, saline, pungent, bitter and astringent. These maintain the body when used appropriately, but vitiate dosha when used improperly.',
        commentary: 'This foundational verse establishes that food is medicine when used correctly, and poison when misused. The key is proper assessment of individual constitution and current dosha status.'
      },
      {
        number: '1.6',
        sanskrit: 'कटुतिक्तकषाया वातं जनयन्ति, मधुराम्ललवणास्त्वेनं शमयन्ति; कट्वम्ललवणाः पित्तं जनयन्ति, मधुरतिक्तकषायास्त्वेनच्छ्मयन्ति; मधुराम्ललवणाः श्लेष्माणं जनयन्ति, कटुतिक्तकाषायास्त्वेनं शमयन्ति||',
        translation: 'Pungent, bitter and astringent aggravate Vata while sweet, sour and saline pacify it. Pungent, sour and saline aggravate Pitta while sweet, bitter and astringent pacify it. Sweet, sour and saline aggravate Kapha while pungent, bitter and astringent pacify it.',
        commentary: 'This is the fundamental verse for understanding rasa-dosha interaction in Ayurvedic pharmacology and dietetics. Every dietary and treatment decision is based on this principle.'
      },
      {
        number: '1.25-26',
        sanskrit: 'अष्टौ विशेषाः- द्रव्यसंयोगविकल्पप्रभावसंस्कारमात्रादेशकालोपयोगसंस्थोपयोगसम्यक् इति|',
        translation: 'Eight specific factors are: inherent nature of substance, combination, processing/prabhava, method of preparation, quantity, place, time of use, and mode of use.',
        commentary: 'These eight factors (ashta vidha ahara visheshayatana) form the complete framework for dietary assessment. Each factor must be considered when prescribing diet.'
      },
      {
        number: '1.27',
        sanskrit: 'उष्णं स्निग्धं मात्रावत् जीर्णे वीर्याविरुद्धम्| इष्टदेशे इष्टसर्वोपकरणं नातिद्रुतं नातिविलम्बितम्| आस्मिन् अन्नम् आत्माभिप्रायेण सम्यक् प्रयोजयेत्||',
        translation: 'Eat food that is warm, unctuous, in proper quantity, after digestion of previous meal, not contradictory in potency, at proper place with all accessories, neither too fast nor too slowly, with concentration and self-awareness.',
        commentary: 'This verse contains the twelve rules of eating (dwadasha ahara vidhi vidhana) that form the basis of mindful eating in Ayurveda.'
      }
    ],
    topics: [
      {
        title: 'Rasa-Dosha Interaction',
        content: 'Each dosha is aggravated by three rasas sharing similar properties and pacified by three with opposite properties. This forms the basis for dietary prescription in all diseases.',
        clinicalRelevance: 'Essential for prescribing pathya-apathya (suitable-unsuitable) diet based on vitiated dosha.'
      },
      {
        title: 'Ashta Vidha Ahara Visheshayatana',
        content: 'Eight factors for dietary assessment: (1) Prakriti - nature of food, (2) Samyoga - combination, (3) Sanskara - processing, (4) Matriya - quantity, (5) Desha - habitat, (6) Kala - time, (7) Upayoga - usage rules, (8) Upayokta - consumer constitution.',
        clinicalRelevance: 'Complete dietary assessment requires considering all eight factors, not just the food itself.'
      },
      {
        title: 'Dwadasha Ahara Vidhi Vidhana',
        content: 'Twelve rules for eating: (1) Ushna - eat warm, (2) Snigdha - eat unctuous, (3) Matravat - proper quantity, (4) Jirne - after digestion, (5) Virya-aviruddha - non-contradictory, (6) Ishta-dese - proper place, (7) Na ati-druta - not too fast, (8) Na ati-vilambita - not too slow, (9) Tanmana - with concentration, (10) Atmanam abhisamikshya - with self-awareness, (11) Samyak prayojayet - properly utilize, (12) Hitam prayojayet - consume beneficial food.',
        clinicalRelevance: 'These rules are foundational for all dietary counseling in Ayurvedic practice.'
      },
      {
        title: 'Three Substances for Limited Use',
        content: 'Pippali (Piper longum), Kshara (alkali), and Lavana (salt) invariably vitiate dosha on frequent use and should be used in limited quantities with proper breaks.',
        clinicalRelevance: 'Important for long-term treatment planning - these substances need cycling protocols.'
      }
    ],
    doshaDiscussion: [
      'Vata aggravated by katu, tikta, kashaya; pacified by madhura, amla, lavana',
      'Pitta aggravated by katu, amla, lavana; pacified by madhura, tikta, kashaya',
      'Kapha aggravated by madhura, amla, lavana; pacified by katu, tikta, kashaya',
      'When rasa shares similar guna with dosha, it aggravates that dosha',
      'When rasa has opposite guna to dosha, it pacifies that dosha'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['1.4', '1.6', '1.25-26', '1.27'],
    clinicalApplications: [
      'Basis for all dietary prescriptions in Ayurveda',
      'Understanding rasa-dosha interaction for drug selection',
      'Assessing food suitability based on eight factors',
      'Mindful eating practices for prevention of disease'
    ]
  },
  {
    id: 'vimana-2',
    sthana: 'Vimana Sthana',
    chapterNumber: 2,
    name: 'Trividhakukshiya Vimana',
    sanskrit: 'त्रिविधकुक्षीयविमानम्',
    english: 'Three types of abdominal conditions and dietary assessment',
    summary: 'This chapter classifies three states of the stomach/kukshi: empty (shuna), properly filled (hita), and overfilled (ahita). It describes how to assess proper nutrition, the importance of agni (digestive fire) in health, and the relationship between food quantity and dosha balance. The concept of adhyashana (eating before previous meal is digested) and its harmful effects are detailed.',
    keyConcepts: [
      'Three states of kukshi: shuna (empty), hita (properly filled), ahita (overfilled)',
      'Assessment of proper food quantity based on individual agni',
      'Adhyashana - eating before digestion is complete, leading to ama',
      'Role of agni in health and disease',
      'Proper timing of meals based on digestive capacity'
    ],
    shlokas: [
      {
        number: '2.3',
        sanskrit: 'हिताहितं मात्रया द्रव्यं ज्ञातव्यम्|',
        translation: 'The suitability and unsuitability of food should be known by its quantity.',
        commentary: 'Quantity is one of the most critical factors in dietary assessment - even wholesome food becomes harmful in improper quantity.'
      },
      {
        number: '2.6',
        sanskrit: 'युक्त्या च भुञ्जानस्य| अशनस्य प्रमाणमाहारशक्तिमवेक्ष्य|',
        translation: 'One should eat according to one\'s digestive capacity (ahara shakti), considering both the quantity and the nature of food.',
        commentary: 'Individual digestive capacity varies and must be assessed before prescribing dietary quantity.'
      }
    ],
    topics: [
      {
        title: 'Assessment of Food Quantity',
        content: 'Food quantity should be determined by individual agni strength. One-third of stomach capacity should be filled with solid food, one-third with liquid, and one-third left empty for proper digestion.',
        clinicalRelevance: 'Fundamental rule for dietary prescription - prevents overeating and promotes optimal digestion.'
      },
      {
        title: 'Adhyashana (Eating Before Digestion)',
        content: 'Eating before the previous meal is fully digested leads to formation of ama (metabolic toxins), which is the root cause of many diseases.',
        clinicalRelevance: 'Important for understanding the pathogenesis of metabolic disorders and advising proper meal timing.'
      }
    ],
    doshaDiscussion: [
      'Improper food quantity directly affects agni and leads to dosha vitiation',
      'Overeating aggravates Kapha, undereating aggravates Vata'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['2.3', '2.6'],
    clinicalApplications: [
      'Dietary quantity assessment for individual patients',
      'Prevention of ama formation through proper meal timing',
      'Understanding digestive capacity variation'
    ]
  },
  {
    id: 'vimana-3',
    sthana: 'Vimana Sthana',
    chapterNumber: 3,
    name: 'Janapadodhvansaniya Vimana',
    sanskrit: 'जनपदोद्ध्वंसनीयविमानम्',
    english: 'Epidemic diseases and their management',
    summary: 'This chapter describes epidemic diseases (janapada uddhvamsa) that affect entire communities. It explains how vitiation of vayu (air), jala (water), desha (land), and kala (season) leads to widespread disease. The chapter emphasizes that even though individual prakriti varies, epidemics affect everyone due to environmental factors. Prevention through proper public health measures and treatment of affected individuals are discussed.',
    keyConcepts: [
      'Janapada uddhvamsa - epidemic/endemic disease affecting communities',
      'Four factors causing epidemics: vayu, jala, desha, kala',
      'Environmental factors override individual prakriti in epidemics',
      'Public health measures for prevention',
      'Treatment principles for epidemic diseases',
      'Role of satau-satmya (universal suitability) in epidemic management'
    ],
    shlokas: [
      {
        number: '3.4',
        sanskrit: 'वायुः जलं देशः कालः इति जनपदोद्ध्वंसकराः|',
        translation: 'Vitiated air, water, land and season are the destroyers of communities (causes of epidemics).',
        commentary: 'This verse identifies the four environmental factors responsible for epidemics, which is remarkably similar to modern epidemiological understanding of environmental disease determinants.'
      },
      {
        number: '3.6',
        sanskrit: 'सर्वप्राणिनां हि समानं दुःखम्|',
        translation: 'The suffering is common to all living beings in an epidemic.',
        commentary: 'Even though individual constitution varies, epidemic factors are strong enough to affect everyone.'
      }
    ],
    topics: [
      {
        title: 'Epidemic Disease Factors',
        content: 'Four environmental factors - vitiated vayu (air pollution), jala (water contamination), desha (land/geographical changes), kala (seasonal abnormalities) - combine to cause epidemics. These factors are stronger than individual prakriti.',
        clinicalRelevance: 'Understanding environmental causes of disease is essential for public health and community medicine.'
      },
      {
        title: 'Prevention in Epidemics',
        content: 'Prevention involves avoiding vitiated environmental factors, maintaining proper hygiene, using purified water and air, following seasonal regimen, and strengthening individual immunity through rasayana.',
        clinicalRelevance: 'Applicable to modern public health practice and pandemic management.'
      }
    ],
    doshaDiscussion: [
      'Epidemics involve simultaneous vitiation of all three dosha due to environmental factors',
      'Individual dosha vitiation patterns vary but are overridden by epidemic causation'
    ],
    treatmentProtocols: [
      {
        condition: 'Epidemic disease management',
        treatment: 'Environmental purification, rasayana therapy, dosha-specific treatment based on presentation',
        herbs: ['Guduchi', 'Amalaki', 'Haritaki', 'Ashwagandha', 'Shunthi'],
        dosage: 'Standard rasayana doses',
        duration: 'Duration of epidemic plus recovery period',
        precautions: ['Avoid vitiated environment', 'Maintain hygiene', 'Strengthen immunity']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Epidemic Disease',
        sanskrit: 'Janapada Uddhvamsa',
        etiology: 'Vitiated vayu, jala, desha, kala affecting communities',
        symptoms: ['Varies based on predominant dosha vitiation and environmental factor'],
        prognosis: 'Depends on severity of environmental vitiation and individual resistance',
        treatment: 'Environmental measures plus individual dosha-specific treatment'
      }
    ],
    importantVerses: ['3.4', '3.6'],
    clinicalApplications: [
      'Epidemic/pandemic disease management',
      'Public health measures in Ayurvedic context',
      'Environmental medicine principles',
      'Community-level disease prevention'
    ]
  },
  {
    id: 'vimana-4',
    sthana: 'Vimana Sthana',
    chapterNumber: 4,
    name: 'Trividha Roga Vishesha Vijnaniya Vimana',
    sanskrit: 'त्रिविधरोगविशेषविज्ञानीयविमानम्',
    english: 'Three-fold specific knowledge of diseases',
    summary: 'This chapter describes the three-fold approach to disease diagnosis: (1) Aptopadesha (authoritative testimony), (2) Pratyaksha (direct observation), and (3) Anumana (inference). It details how to assess disease severity, prognosis, and treatability using these three methods. The concept of trividha pariksha (three-fold examination) is elaborated with clinical examples.',
    keyConcepts: [
      'Three methods of diagnosis: Aptopadesha, Pratyaksha, Anumana',
      'Aptopadesha - authoritative knowledge from learned texts and teachers',
      'Pratyaksha - direct observation through senses and examination',
      'Anumana - inference from observed signs and symptoms',
      'Assessment of disease treatability (sadhya/asadhya)',
      'Three types of diseases based on curability'
    ],
    shlokas: [
      {
        number: '4.3',
        sanskrit: 'त्रिविधं विज्ञानम्- आप्तोपदेशः, प्रत्यक्षम्, अनुमानम् च|',
        translation: 'Knowledge is three-fold: authoritative testimony, direct observation, and inference.',
        commentary: 'This establishes the epistemological foundation of Ayurvedic diagnosis - combining textual knowledge with clinical observation and reasoning.'
      }
    ],
    topics: [
      {
        title: 'Three-fold Diagnostic Method',
        content: 'Aptopadesha provides the theoretical framework from classical texts. Pratyaksha involves direct examination of the patient including darshana (inspection), sparshana (palpation), prashna (questioning). Anumana involves logical inference from observed data to reach a diagnosis.',
        clinicalRelevance: 'This systematic diagnostic approach ensures comprehensive assessment and reduces diagnostic errors.'
      },
      {
        title: 'Disease Curability Assessment',
        content: 'Diseases are classified as: (1) Sukhasadhya - easily curable, (2) Kricchrasadhya - curable with difficulty, (3) Asadhya - incurable. Factors determining curability include disease strength, patient strength, time of presentation, and available treatment.',
        clinicalRelevance: 'Essential for prognosis determination and treatment planning - helps set realistic expectations.'
      }
    ],
    doshaDiscussion: [
      'All three methods of diagnosis must be applied to assess dosha vitiation accurately',
      'Dosha assessment guides treatment approach and prognosis determination'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [
      {
        name: 'Easily Curable Disease (Sukhasadhya)',
        sanskrit: 'सुकसाध्य',
        etiology: 'Recent onset, single dosha involvement, strong patient',
        symptoms: ['Mild symptoms, good patient constitution'],
        prognosis: 'Good - responds quickly to treatment',
        treatment: 'Simple measures - shamana (pacification) therapy'
      },
      {
        name: 'Difficult to Cure (Kricchrasadhya)',
        sanskrit: 'कृच्छ्रसाध्य',
        etiology: 'Multiple dosha involvement, moderate duration, moderate patient strength',
        symptoms: ['Moderate symptoms, some complications'],
        prognosis: 'Guardian - requires intensive treatment',
        treatment: 'Shodhana (purification) plus shamana therapy'
      },
      {
        name: 'Incurable Disease (Asadhya)',
        sanskrit: 'असाध्य',
        etiology: 'Long-standing, all three dosha involved, weak patient',
        symptoms: ['Severe symptoms', 'Complications', 'Poor response to treatment'],
        prognosis: 'Poor - palliative care only',
        treatment: 'Palliative measures for comfort'
      }
    ],
    importantVerses: ['4.3'],
    clinicalApplications: [
      'Systematic diagnostic approach in clinical practice',
      'Prognosis determination and patient counseling',
      'Treatment planning based on disease curability',
      'Integration of textual knowledge with clinical observation'
    ]
  },
  {
    id: 'vimana-5',
    sthana: 'Vimana Sthana',
    chapterNumber: 5,
    name: 'Sroto Vimana',
    sanskrit: 'स्रोतोविमानम्',
    english: 'Channels of circulation and their disorders',
    summary: 'This comprehensive chapter describes the srotas (channels/circulatory systems) of the body. There are 16 primary srotas, each associated with specific dhatus (tissues) and functions. When srotas are vitiated by dosha, they become blocked (sanga), excessive (atipravritti), or deviated (vimargamana), leading to disease. Understanding srotas is essential for understanding disease pathogenesis and treatment.',
    keyConcepts: [
      '16 primary srotas (channels) of the body',
      'Pranavaha srotas - respiratory channels (heart and lungs)',
      'Annavaha srotas - alimentary channels (stomach and intestines)',
      'Udakavaha srotas - water channels (palate, pancreas)',
      'Rasavaha srotas - plasma channels (heart, blood vessels)',
      'Raktavaha srotas - blood channels (liver, spleen)',
      'Mamsavaha srotas - muscle channels (ligaments, skin)',
      'Medovaha srotas - fat channels (kidneys, omentum)',
      'Asthivaha srotas - bone channels (bones, joints)',
      'Majjavaha srotas - marrow channels (bones, joints)',
      'Shukravaha srotas - reproductive channels (testes/ovaries)',
      'Mutravaha srotas - urinary channels (kidneys, bladder)',
      'Purishavaha srotas - fecal channels (colon, rectum)',
      'Svedavaha srotas - sweat channels (skin, lymphatics)',
      'Artavavaha srotas - menstrual channels (uterus, ovaries)',
      'Stanyavaha srotas - lactation channels (breasts)',
      'Manovaha srotas - mind channels (heart, brain)',
      'Three types of srotas vitiation: sanga, atipravritti, vimargamana',
      'Roots (mula) of each srotas for diagnosis and treatment'
    ],
    shlokas: [
      {
        number: '5.3',
        sanskrit: 'स्रोतसां षोडश विभागान् वक्ष्यामः|',
        translation: 'We shall describe the sixteen divisions of srotas.',
        commentary: 'The srotas system is one of the most important theoretical frameworks in Ayurveda for understanding body physiology and disease pathogenesis.'
      },
      {
        number: '5.4',
        sanskrit: 'प्राणवहान्नवहमुदकवहरसवहरक्तवहमांसवहमेदोवहास्थिवहमज्जवहशुक्रवहमूत्रवहपुरीषवहस्वेदवहार्तववहस्तन्यवहमनोवहानीति षोडश स्रोतसां विभागाः|',
        translation: 'The sixteen divisions of srotas are: pranavaha, annavaha, udakavaha, rasavaha, raktavaha, mamsavaha, medovaha, asthivaha, majjavaha, shukravaha, mutravaha, purishavaha, svedavaha, artavavaha, stanyavaha, and manovaha.',
        commentary: 'This enumeration covers all the physiological systems of the body - from respiration to mental function.'
      },
      {
        number: '5.7',
        sanskrit: 'स्रोतसां हि सिराः सूक्ष्माः शाखास्वन्तर्बहिर्गताः| दोषधातुमलानां च प्रणेतारः पृथक् पृथक्||',
        translation: 'The srotas contain minute channels (sira) that pervade inside and outside the body parts, carrying dosha, dhatu and mala separately.',
        commentary: 'The srotas system is a network of micro-channels that facilitate transport of nutrients, waste products, and regulatory factors throughout the body.'
      }
    ],
    topics: [
      {
        title: 'Srotas Vitiation Patterns',
        content: 'Three patterns of srotas dysfunction: (1) Sanga - obstruction/blockage causing accumulation, (2) Atipravritti - excessive flow/discharge, (3) Vimargamana - deviation of flow to wrong channels. Each pattern produces distinct clinical presentations.',
        clinicalRelevance: 'Understanding vitiation patterns guides treatment - sanga requires opening/blockage removal, atipravritti requires reducing flow, vimargamana requires redirecting flow.'
      },
      {
        title: 'Roots of Srotas',
        content: 'Each srotas has a root (mula) - a specific organ or structure from which it originates. Disease of a srotas manifests through its root. For example, pranavaha srotas has roots in heart and lungs; annavaha srotas has roots in stomach and large intestine.',
        clinicalRelevance: 'The root of the srotas is the primary target for treatment - addressing the root heals the entire channel.'
      }
    ],
    doshaDiscussion: [
      'All three dosha can vitiate any srotas',
      'Specific dosha tend to affect specific srotas preferentially',
      'Vata primarily affects pranavaha, asthivaha, shukravaha srotas',
      'Pitta primarily affects raktavaha, mamsavaha, medovaha srotas',
      'Kapha primarily affects rasavaha, annavaha, stanyavaha srotas'
    ],
    treatmentProtocols: [
      {
        condition: 'Sanga (obstruction) of any srotas',
        treatment: 'Langhana (fasting), ruksha (dry) therapy, tikshna (sharp) herbs to break obstruction',
        herbs: ['Trikatu', 'Guggulu', 'Musta', 'Pippali'],
        dosage: 'Based on individual assessment',
        duration: 'Until obstruction clears',
        precautions: ['Monitor patient strength', 'Avoid in debilitated patients']
      },
      {
        condition: 'Atipravritti (excessive flow)',
        treatment: 'Stambhana (blocking) therapy, grahi (absorbent) herbs, cooling measures',
        herbs: ['Lodhra', 'Ashoka', 'Nagakeshara', 'Musta'],
        dosage: 'Based on severity',
        duration: 'Until flow normalizes',
        precautions: ['Ensure underlying cause is addressed']
      },
      {
        condition: 'Vimargamana (deviated flow)',
        treatment: 'Correcting flow direction using specific formulations and procedures',
        herbs: ['Dashamoola', 'Guduchi', 'Triphala'],
        dosage: 'Individualized',
        duration: 'Until normal flow is restored',
        precautions: ['Monitor for complications']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: ['5.3', '5.4', '5.7'],
    clinicalApplications: [
      'Understanding disease pathogenesis through srotas framework',
      'Targeted treatment based on affected srotas',
      'Diagnostic approach through srotas root assessment',
      'Comprehensive physiological understanding of body systems'
    ]
  },
  {
    id: 'vimana-6',
    sthana: 'Vimana Sthana',
    chapterNumber: 6,
    name: 'Roganika Vimana',
    sanskrit: 'रोगनिकविमानम्',
    english: 'Classification of diseases',
    summary: 'This chapter provides a comprehensive classification of diseases based on multiple criteria: dosha involvement (vataja, pittaja, kaphaja, sannipataja), location (bahya/external, abhyantara/internal), severity (prabhava/mild, mahan/strong), and treatability. It also describes the concept of ekadoshaja (single dosha), dwandvaja (dual dosha), and sannipataja (triple dosha) diseases with their prognosis.',
    keyConcepts: [
      'Classification by dosha: vataja, pittaja, kaphaja, sannipataja',
      'Classification by location: bahya (external), abhyantara (internal)',
      'Classification by severity: prabhava (mild), mahan (strong)',
      'Ekadoshaja diseases - involving single dosha, better prognosis',
      'Dwandvaja diseases - involving two dosha, moderate prognosis',
      'Sannipataja diseases - involving all three dosha, poor prognosis',
      'Nija diseases - endogenous, caused by internal dosha vitiation',
      'Agantuja diseases - exogenous, caused by external factors',
      'Manasika diseases - mental disorders',
      'Sharirika diseases - physical disorders'
    ],
    shlokas: [
      {
        number: '6.5',
        sanskrit: 'द्विविधा रोगाः- निजाः, आगन्तवश्च|',
        translation: 'Diseases are of two types: nija (endogenous) and agantuja (exogenous).',
        commentary: 'This fundamental classification helps determine treatment approach - nija diseases require dosha-balancing treatment while agantuja diseases require removal of external causative factors.'
      },
      {
        number: '6.8',
        sanskrit: 'एकदोषजा द्वन्द्वजाः सन्निपातजाश्च|',
        translation: 'Diseases are born from single dosha, dual dosha, or triple dosha vitiation.',
        commentary: 'This classification directly correlates with prognosis - single dosha diseases are most treatable, while sannipataja (triple dosha) diseases are most difficult to treat.'
      }
    ],
    topics: [
      {
        title: 'Disease Classification Framework',
        content: 'Ayurveda classifies diseases along multiple axes: origin (nija/agantuja), dosha involvement (ekadoshaja/dwandvaja/sannipataja), location (bahya/abhyantara), severity, and treatability. This multi-dimensional classification guides comprehensive treatment planning.',
        clinicalRelevance: 'Systematic classification ensures appropriate treatment selection and accurate prognosis determination.'
      },
      {
        title: 'Prognosis by Dosha Involvement',
        content: 'Ekadoshaja (single dosha) diseases are easily curable. Dwandvaja (two dosha) diseases are curable with difficulty. Sannipataja (three dosha) diseases are generally incurable or very difficult to treat.',
        clinicalRelevance: 'Essential for setting treatment goals and patient expectations.'
      }
    ],
    doshaDiscussion: [
      'Single dosha vitiation produces milder, more localized diseases',
      'Dual dosha vitiation produces moderate diseases with mixed presentations',
      'Triple dosha (sannipata) vitiation produces severe, systemic diseases with poor prognosis',
      'Understanding dosha involvement pattern guides herb and treatment selection'
    ],
    treatmentProtocols: [
      {
        condition: 'Ekadoshaja (single dosha) disease',
        treatment: 'Shamana (pacification) therapy targeting the specific vitiated dosha',
        herbs: ['Vata: Ashwagandha, Bala; Pitta: Guduchi, Amalaki; Kapha: Trikatu, Guggulu'],
        dosage: 'Standard doses',
        duration: 'Short to moderate',
        precautions: ['Prevent secondary dosha vitiation']
      },
      {
        condition: 'Dwandvaja (dual dosha) disease',
        treatment: 'Combined shamana therapy addressing both dosha simultaneously',
        herbs: ['Combined formulations based on specific dosha combination'],
        dosage: 'Adjusted for dual dosha',
        duration: 'Moderate to long',
        precautions: ['Avoid treatments that aggravate one while treating the other']
      },
      {
        condition: 'Sannipataja (triple dosha) disease',
        treatment: 'Shodhana (purification) followed by rasayana (rejuvenation); palliative care',
        herbs: ['Dashamoola', 'Rasayana herbs', 'Complex formulations'],
        dosage: 'Individualized',
        duration: 'Long-term management',
        precautions: ['Patient strength must be assessed carefully', 'Treatment may be palliative rather than curative']
      }
    ],
    diseaseDescriptions: [],
    importantVerses: ['6.5', '6.8'],
    clinicalApplications: [
      'Systematic disease classification for clinical practice',
      'Prognosis determination based on dosha involvement',
      'Treatment planning based on disease type',
      'Communication with patients about disease severity'
    ]
  },
  {
    id: 'vimana-7',
    sthana: 'Vimana Sthana',
    chapterNumber: 7,
    name: 'Vyadhita Rupiya Vimana',
    sanskrit: 'व्याधितरूपीयविमानम्',
    english: 'Signs and symptoms of diseased persons',
    summary: 'This chapter describes the physical and mental signs that indicate disease in a person. It covers the examination of body constitution (sarata), body measurements (pramana), and the signs of healthy versus diseased states. The concept of ashta vidha pariksha (eight-fold examination) and dasha vidha pariksha (ten-fold examination) are elaborated for comprehensive patient assessment.',
    keyConcepts: [
      'Signs of healthy person vs diseased person',
      'Sarata assessment - excellence of dhatu (tissue quality)',
      'Pramana - body measurements and proportions',
      'Ashta vidha pariksha - eight-fold examination',
      'Dasha vidha pariksha - ten-fold examination',
      'Assessment of bala (strength), varna (complexion), and sparsha (touch)',
      'Mental assessment - satva (mental strength), rajas, tamas',
      'Agni assessment as indicator of health'
    ],
    shlokas: [
      {
        number: '7.4',
        sanskrit: 'समदोषः समाग्निश्च समधातुमलक्रियः| प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते||',
        translation: 'One who has balanced dosha, balanced agni, balanced dhatu and mala, whose soul, senses and mind are content, is called swastha (healthy).',
        commentary: 'This is the most comprehensive definition of health in Ayurveda - encompassing physical, mental, and spiritual well-being.'
      }
    ],
    topics: [
      {
        title: 'Definition of Health',
        content: 'Health (swastha) is defined as balanced dosha, balanced agni (digestive fire), balanced dhatu (tissues), proper elimination of mala (waste), and a contented soul, mind, and senses. This holistic definition goes beyond mere absence of disease.',
        clinicalRelevance: 'The goal of Ayurvedic treatment is not just disease cure but achieving this comprehensive state of health.'
      },
      {
        title: 'Sarata Assessment',
        content: 'Sarata (tissue excellence) is assessed through: rasa sarata (good complexion, soft skin), rakta sarata (good skin color, warmth), mamsa sarata (good muscle development), meda sarata (good fat distribution), asthi sarata (strong bones, nails), majja sarata (strong bones, eyes), shukra sarata (good reproductive health, charm).',
        clinicalRelevance: 'Sarata assessment helps determine patient strength and treatment capacity.'
      }
    ],
    doshaDiscussion: [
      'Balanced dosha is the foundation of health',
      'Imbalanced dosha manifests through specific signs in each tissue',
      'Dosha assessment is part of comprehensive patient evaluation'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['7.4'],
    clinicalApplications: [
      'Comprehensive patient assessment',
      'Health status determination',
      'Treatment capacity assessment',
      'Baseline evaluation before treatment planning'
    ]
  },
  {
    id: 'vimana-8',
    sthana: 'Vimana Sthana',
    chapterNumber: 8,
    name: 'Rogabhishagjitiya Vimana',
    sanskrit: 'रोगभिषज्जितीयविमानम्',
    english: 'Physician, patient, medicine and attendant - four pillars of treatment',
    summary: 'This concluding chapter of Vimana Sthana describes the four essential components of successful treatment: (1) Bhishak (physician), (2) Upasthata (attendant/nurse), (3) Rogi (patient), and (4) Dravya (medicine). Each component must possess specific qualities for treatment to succeed. The chapter also describes the qualities of an ideal physician, the importance of patient compliance, and the role of attendants in recovery.',
    keyConcepts: [
      'Four pillars of treatment: Bhishak, Upasthata, Rogi, Dravya',
      'Qualities of ideal physician: theoretical knowledge, practical experience, skill, purity',
      'Qualities of ideal patient: memory, obedience, courage, ability to describe symptoms',
      'Qualities of ideal attendant: knowledge of nursing, skill, affection, cleanliness',
      'Qualities of ideal medicine: abundance, multi-utility, effectiveness, potency',
      'All four components must be present for successful treatment'
    ],
    shlokas: [
      {
        number: '8.4',
        sanskrit: 'चतुष्पादा चिकित्सा- भिषगुपस्थातारोगी द्रव्याणि च|',
        translation: 'Treatment has four pillars: physician, attendant, patient, and medicine.',
        commentary: 'This concept emphasizes that treatment success depends not just on the physician or medicine, but on the collective contribution of all four components.'
      },
      {
        number: '8.6',
        sanskrit: 'भिषग्गुणाः- श्रुतवान् प्रतिपत्तिदक्षः दृष्टकर्मा शुचिः|',
        translation: 'Qualities of a physician: learned (theoretical knowledge), skilled in practice, experienced, and pure/clean.',
        commentary: 'These four qualities define the ideal physician - theoretical knowledge alone is insufficient without practical experience and skill.'
      }
    ],
    topics: [
      {
        title: 'Four Pillars of Treatment',
        content: 'Successful treatment requires: (1) Bhishak - physician with knowledge, experience, skill, and purity; (2) Upasthata - attendant with nursing knowledge, skill, affection, and cleanliness; (3) Rogi - patient with memory, obedience, courage, and ability to describe symptoms; (4) Dravya - medicine that is abundant, multi-utility, effective, and potent.',
        clinicalRelevance: 'Ensuring all four pillars are in place before starting treatment maximizes success rates.'
      },
      {
        title: 'Patient Qualities for Successful Treatment',
        content: 'The ideal patient has: good memory (to follow instructions), obedience (to physician\'s orders), courage (to endure treatment), and ability to clearly describe symptoms. Patient compliance is as important as physician skill.',
        clinicalRelevance: 'Patient selection and counseling are important aspects of treatment planning.'
      }
    ],
    doshaDiscussion: [
      'Physician must understand dosha to diagnose correctly',
      'Treatment success depends on proper dosha assessment',
      'Patient constitution (prakriti) affects treatment response'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['8.4', '8.6'],
    clinicalApplications: [
      'Treatment success factors assessment',
      'Physician self-assessment and development',
      'Patient selection and counseling',
      'Team-based healthcare approach',
      'Quality assurance in medical practice'
    ]
  }
]
