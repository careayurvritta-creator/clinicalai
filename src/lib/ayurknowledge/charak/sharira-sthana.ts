/**
 * Charak Samhita - Sharira Sthana (Section on Human Body and Genesis)
 * 8 Chapters covering body constitution, embryology, prakriti, and body measurements
 * Source: carakasamhitaonline.com (CC BY-NC-SA 4.0)
 */

import type { CharakChapter } from './types'

export const SHARIRA_STHANA: CharakChapter[] = [
  {
    id: 'sharira-1',
    sthana: 'Sharira Sthana',
    chapterNumber: 1,
    name: 'Katidha Purusha Sharira',
    sanskrit: 'कटिधापुरुषशरीरम्',
    english: 'Classification of human body components',
    summary: 'This foundational chapter describes the composition of the human body. The purusha (human being) is classified into different categories based on the number of constituent elements: ekavidha (one - consciousness), dvividha (two - body and soul), trividha (three - three dosha), chaturvidha (four - four types of body constituents), panchavidha (five - five elements), shadvidha (six - six taste components), saptavidha (seven - seven dhatu), and ashtavidha (eight - eight body components). The most clinically important classification is saptavidha (seven dhatu) which forms the basis of tissue physiology.',
    keyConcepts: [
      'Ekavidha purusha - one component (consciousness/atma)',
      'Dvividha purusha - two components (body and soul)',
      'Trividha purusha - three components (three dosha)',
      'Chaturvidha purusha - four components (dosha, dhatu, mala, agni)',
      'Panchavidha purusha - five components (pancha mahabhuta)',
      'Shadvidha purusha - six components (six rasa/taste)',
      'Saptavidha purusha - seven components (sapta dhatu)',
      'Ashtavidha purusha - eight components (dosha, dhatu, mala, agni, etc.)',
      'Shodashavidha purusha - sixteen components (dosha, dhatu, mala, indriya, etc.)',
      'Sapta dhatu (seven tissues): rasa, rakta, mamsa, meda, asthi, majja, shukra',
      'Dhatu poshana (tissue nourishment) - sequential nourishment process'
    ],
    shlokas: [
      {
        number: '1.4',
        sanskrit: 'एकविधः पुरुषः- चेतना| द्विविधः- शरीरमात्मा च| त्रिविधः- वातपित्तकफाः|',
        translation: 'Purusha is one-fold (consciousness), two-fold (body and soul), three-fold (vata, pitta, kapha).',
        commentary: 'This establishes multiple valid perspectives on human composition - each classification serves different clinical purposes.'
      },
      {
        number: '1.5',
        sanskrit: 'सप्तविधः पुरुषः- रसरक्तमांसमेदोस्थिमज्जशुक्राणि धातवः|',
        translation: 'Seven-fold is the human - rasa (plasma), rakta (blood), mamsa (muscle), meda (fat), asthi (bone), majja (marrow), shukra (reproductive tissue) are the dhatus.',
        commentary: 'The seven-dhatu model is the most clinically important framework for understanding tissue physiology, disease pathogenesis, and treatment planning.'
      },
      {
        number: '1.8',
        sanskrit: 'षोडशविधः पुरुषः- चतुर्विंशतिकं शरीरं दोषाश्च|',
        translation: 'Sixteen-fold is the human - the twenty-four principles (of Samkhya) plus dosha.',
        commentary: 'This integrates Ayurvedic physiology with Samkhya philosophy for a comprehensive understanding of human existence.'
      }
    ],
    topics: [
      {
        title: 'Sapta Dhatu - Seven Tissues',
        content: 'The seven dhatus form the structural basis of the body: (1) Rasa - plasma/lymph, nourishes all tissues, (2) Rakta - blood tissue, sustains life, (3) Mamsa - muscle tissue, provides movement, (4) Meda - adipose tissue, provides lubrication and insulation, (5) Asthi - bone tissue, provides structure, (6) Majja - marrow/nerve tissue, fills bone cavities, (7) Shukra - reproductive tissue, responsible for reproduction. Each dhatu is nourished sequentially from the previous one through dhatu agni.',
        clinicalRelevance: 'Understanding dhatu physiology is essential for treating tissue-specific diseases and for rasayana (rejuvenation) therapy.'
      },
      {
        title: 'Dhatu Poshana - Tissue Nourishment',
        content: 'Tissue nourishment follows a sequential process: digested food (ahara rasa) first nourishes rasa dhatu, then rakta, and so on through shukra. Each dhatu has its own agni that transforms the nourishing substance into the specific dhatu. When dhatu agni is impaired, either deficient or excess tissue formation occurs.',
        clinicalRelevance: 'Dhatvagni assessment helps understand tissue-level pathology and guides treatment for tissue disorders.'
      }
    ],
    doshaDiscussion: [
      'Dosha exist in every dhatu and srotas',
      'Vata governs movement and nervous function',
      'Pitta governs transformation and metabolism',
      'Kapha governs structure and lubrication',
      'Dosha-dhatu interaction determines health and disease'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['1.4', '1.5', '1.8'],
    clinicalApplications: [
      'Understanding body composition for disease assessment',
      'Dhatu-specific treatment planning',
      'Tissue nourishment assessment',
      'Foundation for rasayana therapy'
    ]
  },
  {
    id: 'sharira-2',
    sthana: 'Sharira Sthana',
    chapterNumber: 2,
    name: 'Atulyagotriya Sharira',
    sanskrit: 'अतुल्यगोत्रीयशरीरम्',
    english: 'Genetics and hereditary factors in health',
    summary: 'This chapter discusses the importance of genetic compatibility in marriage and reproduction. It describes how hereditary factors (gotra) influence offspring health, the dangers of consanguineous marriages, and the qualities desired in progeny. The chapter also covers the concept of beeja (sperm and ovum) and its role in determining offspring characteristics.',
    keyConcepts: [
      'Gotra - genetic lineage and hereditary factors',
      'Beeja - sperm (shukra) and ovum (artava) as seeds of life',
      'Beeja bhaga - genetic components determining offspring traits',
      'Dangers of same-gotra (consanguineous) marriages',
      'Desired qualities in offspring',
      'Role of parental health in progeny quality',
      'Genetic factors in disease susceptibility'
    ],
    shlokas: [
      {
        number: '2.3',
        sanskrit: 'समानगोत्रे विवाहं न कुर्वीत|',
        translation: 'One should not marry within the same gotra (lineage).',
        commentary: 'This ancient wisdom about avoiding consanguineous marriages aligns with modern genetic understanding of inbreeding risks.'
      },
      {
        number: '2.5',
        sanskrit: 'बीजभागशरीरव्यूहाः सम्भवन्ति|',
        translation: 'The structure of the body arises from the components of the seed (beeja).',
        commentary: 'This verse recognizes that body structure is determined by genetic factors present in the reproductive cells.'
      }
    ],
    topics: [
      {
        title: 'Genetic Factors in Health',
        content: 'Ayurveda recognized hereditary transmission of traits and diseases. The concept of gotra (lineage) and beeja (reproductive cells) represents an early understanding of genetics. Parental health, genetic compatibility, and environmental factors all influence offspring health.',
        clinicalRelevance: 'Understanding hereditary factors helps in disease risk assessment and preventive healthcare planning.'
      },
      {
        title: 'Beeja and Beeja Bhaga',
        content: 'Beeja (sperm and ovum) contains beeja bhaga (genetic components) that determine offspring characteristics. The quality of beeja depends on parental health, diet, lifestyle, and genetic factors. Vitiated beeja can lead to congenital disorders.',
        clinicalRelevance: 'Preconception care and parental health optimization are important for preventing congenital diseases.'
      }
    ],
    doshaDiscussion: [
      'Dosha vitiation in parents can affect beeja quality',
      'Hereditary prakriti is determined by predominant dosha at conception',
      'Genetic predisposition to specific dosha-related diseases'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [
      {
        name: 'Congenital Disorders',
        sanskrit: 'Sahaja Vikara',
        etiology: 'Vitiated beeja (reproductive cells), parental dosha imbalance, genetic factors',
        symptoms: ['Present from birth, structural or functional abnormalities'],
        prognosis: 'Varies - some are treatable, others require management',
        treatment: 'Prevention through preconception care; treatment based on specific disorder'
      }
    ],
    importantVerses: ['2.3', '2.5'],
    clinicalApplications: [
      'Genetic counseling in Ayurvedic context',
      'Preconception care planning',
      'Hereditary disease risk assessment',
      'Understanding congenital disorders'
    ]
  },
  {
    id: 'sharira-3',
    sthana: 'Sharira Sthana',
    chapterNumber: 3,
    name: 'Khuddika Garbhavakranti Sharira',
    sanskrit: 'खुद्दिकगर्भवक्रान्तिशरीरम्',
    english: 'Minor details of embryonic development',
    summary: 'This chapter describes the early stages of embryonic development, focusing on the first month after conception. It covers the process of garbha (embryo) formation from the union of shukra (sperm) and artava (ovum), the role of atma (soul) and panchamahabhuta (five elements) in embryonic development, and the initial signs of pregnancy.',
    keyConcepts: [
      'Garbha (embryo) formation from union of shukra and artava',
      'Role of atma (soul) in initiating life',
      'Panchamahabhuta contribution to embryonic development',
      'First month developmental stages',
      'Early signs and symptoms of pregnancy',
      'Kalala stage - initial embryonic form',
      'Factors affecting embryonic health'
    ],
    shlokas: [
      {
        number: '3.3',
        sanskrit: 'शुक्रशोणितसंयोगात् कललं भवति|',
        translation: 'From the union of shukra (sperm) and artava (ovum), the kalala (initial embryo) is formed.',
        commentary: 'This describes the beginning of embryonic development from the union of male and female reproductive cells.'
      },
      {
        number: '3.4',
        sanskrit: 'मातापितृसारात्मकं गर्भम्|',
        translation: 'The embryo is constituted by the essence of mother, father, and soul (atma).',
        commentary: 'This verse recognizes three contributions to the developing embryo: maternal factors, paternal factors, and the life force (atma).'
      }
    ],
    topics: [
      {
        title: 'Embryonic Development Process',
        content: 'Embryo formation begins with the union of shukra and artava in the uterus. The kalala (initial embryo) forms in the first month. The soul (atma, accompanied by rajas and tamas) enters this union to initiate life. The five mahabhuta contribute to different aspects of embryonic structure.',
        clinicalRelevance: 'Understanding normal embryonic development helps identify developmental abnormalities and guide prenatal care.'
      },
      {
        title: 'Prenatal Care Principles',
        content: 'Maternal health, diet, and lifestyle during pregnancy directly affect embryonic development. The concept of garbhini paricharya (pregnancy care) includes month-wise dietary and lifestyle recommendations.',
        clinicalRelevance: 'Foundation for Ayurvedic prenatal care protocols.'
      }
    ],
    doshaDiscussion: [
      'Dosha balance in both parents affects embryonic quality',
      'Vata guides the movement and placement of embryo',
      'Pitta governs metabolic processes in embryonic development',
      'Kapha provides structural material for growth'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['3.3', '3.4'],
    clinicalApplications: [
      'Prenatal care in Ayurveda',
      'Understanding congenital abnormalities',
      'Fertility treatment foundations',
      'Month-wise pregnancy care'
    ]
  },
  {
    id: 'sharira-4',
    sthana: 'Sharira Sthana',
    chapterNumber: 4,
    name: 'Mahatigarbhavakranti Sharira',
    sanskrit: 'महतीगर्भवक्रान्तिशरीरम्',
    english: 'Detailed embryonic development and factors determining offspring characteristics',
    summary: 'This comprehensive chapter details month-by-month embryonic development from conception to birth. It describes how each month specific organs and structures form, the factors determining offspring gender, complexion, constitution, and the eight types of prakriti (constitution). The chapter also covers signs of difficult labor and factors affecting offspring quality.',
    keyConcepts: [
      'Month-by-month embryonic development (9 months)',
      'Month 1: Kalala (formless mass)',
      'Month 2: Ghana (solid mass) - gender determination',
      'Month 3: Development of limbs and organs begins',
      'Month 4: Heart and sense organs develop, consciousness enters',
      'Month 5: Blood and flesh develop, fetal movements felt',
      'Month 6: Skin, hair, nails develop',
      'Month 7: All organs fully formed, fetus viable',
      'Month 8: Ojas fluctuates between mother and fetus',
      'Month 9: Full term, ready for birth',
      'Eight types of prakriti based on dosha combination',
      'Factors determining gender, complexion, constitution',
      'Signs of difficult labor (mudhagarbha)',
      'Role of maternal diet and lifestyle in fetal development'
    ],
    shlokas: [
      {
        number: '4.8',
        sanskrit: 'मासे प्रथमे कललं भवति| द्वितीये घनं भवति| तृतीये अङ्गावयवाः प्रव्यक्ता भवन्ति|',
        translation: 'In the first month, kalala forms. In the second month, a solid mass forms. In the third month, limbs and organs become distinct.',
        commentary: 'This month-by-month developmental description shows remarkable understanding of embryological progression.'
      },
      {
        number: '4.11',
        sanskrit: 'चतुर्थे चेतना जायते|',
        translation: 'In the fourth month, consciousness (chetana) enters the fetus.',
        commentary: 'This verse indicates that the fetus becomes sentient in the fourth month, which has implications for prenatal care and the spiritual aspects of pregnancy.'
      },
      {
        number: '4.14',
        sanskrit: 'पञ्चमे रक्तमांसानि|',
        translation: 'In the fifth month, blood and flesh develop.',
        commentary: 'The fifth month marks significant tissue development, and the mother may begin to feel fetal movements.'
      }
    ],
    topics: [
      {
        title: 'Month-by-Month Fetal Development',
        content: 'The nine months of pregnancy follow a specific developmental sequence: formless mass (1st), solidification (2nd), organ differentiation (3rd), consciousness and heart (4th), blood and flesh (5th), skin and hair (6th), organ completion (7th), ojas stabilization (8th), full maturity (9th). Each month has specific dietary and lifestyle recommendations for the mother.',
        clinicalRelevance: 'Month-wise assessment helps identify developmental delays and guide prenatal care.'
      },
      {
        title: 'Eight Types of Prakriti',
        content: 'The eight constitutional types are: Vataja, Pittaja, Kaphaja (3 single dosha), Vata-Pittaja, Pitta-Kaphaja, Vata-Kaphaja (3 dual dosha), Sannipataja (triple dosha), and Samaja (balanced). Prakriti is determined at conception by the predominant dosha in both parents and the time of conception.',
        clinicalRelevance: 'Prakriti assessment is fundamental to personalized medicine in Ayurveda - it determines disease susceptibility, treatment response, and lifestyle recommendations.'
      },
      {
        title: 'Signs of Difficult Labor',
        content: 'Mudhagarbha (difficult labor) signs include: abnormal fetal position, weak uterine contractions, maternal exhaustion, and signs of fetal distress. Management includes specific herbal formulations, manual techniques, and spiritual measures.',
        clinicalRelevance: 'Understanding labor complications helps in timely intervention and management.'
      }
    ],
    doshaDiscussion: [
      'Prakriti is determined by predominant dosha at conception',
      'Each month of development is governed by specific dosha',
      'Vata guides movement and nervous system development',
      'Pitta governs metabolic processes and blood formation',
      'Kapha provides structural material and lubrication',
      'Dosha imbalance in mother can affect fetal development'
    ],
    treatmentProtocols: [
      {
        condition: 'Month-wise pregnancy care (Garbhini Paricharya)',
        treatment: 'Specific dietary and lifestyle recommendations for each month of pregnancy',
        herbs: ['Shatavari', 'Ashwagandha', 'Bala', 'Amalaki'],
        dosage: 'Gentle doses suitable for pregnancy',
        duration: 'Throughout pregnancy',
        precautions: ['Avoid strong purgatives', 'Avoid excessive heat', 'Maintain emotional balance']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Difficult Labor (Mudhagarbha)',
        sanskrit: 'मूढगर्भ',
        etiology: 'Abnormal fetal position, weak contractions, maternal exhaustion, vitiated vata',
        symptoms: ['Prolonged labor', 'Severe pain', 'Failure to progress', 'Fetal distress'],
        prognosis: 'Depends on cause and timeliness of intervention',
        treatment: 'Herbal formulations, manual techniques, spiritual measures'
      }
    ],
    importantVerses: ['4.8', '4.11', '4.14'],
    clinicalApplications: [
      'Prenatal care month-by-month guidance',
      'Prakriti assessment for personalized medicine',
      'Obstetric management in Ayurveda',
      'Understanding congenital disorders',
      'Fertility and conception optimization'
    ]
  },
  {
    id: 'sharira-5',
    sthana: 'Sharira Sthana',
    chapterNumber: 5,
    name: 'Purusha Vishesha Shareeratantra',
    sanskrit: 'पुरुषविशेषशारीरतन्त्रम्',
    english: 'Specific characteristics of human body - the concept of Purusha',
    summary: 'This chapter elaborates on the concept of Purusha (human being) in detail, describing the relationship between consciousness (atma), mind (manas), body (sharira), and senses (indriya). It explains how the soul, mind, and body interact to produce life, and how disease arises when this interaction is disturbed. The chapter also describes the concept of aushadha purusha (medicinal person) - using the body itself as a therapeutic tool.',
    keyConcepts: [
      'Purusha as the integration of atma, manas, sharira, and indriya',
      'Atma (soul) as the animating principle',
      'Manas (mind) as the bridge between soul and body',
      'Sharira (body) as the physical substrate',
      'Indriya (senses) as the interface with the external world',
      'Interaction between these four components in health and disease',
      'Aushadha purusha - the body as a therapeutic entity',
      'Chikitsa purusha - the treatment-responsive human'
    ],
    shlokas: [
      {
        number: '5.3',
        sanskrit: 'आत्मा मनः शरीरमिन्द्रियाणि च|',
        translation: 'The human consists of soul, mind, body, and senses.',
        commentary: 'This holistic view of the human being integrates physical, mental, and spiritual dimensions.'
      },
      {
        number: '5.7',
        sanskrit: 'चिकित्सा पुरुषः|',
        translation: 'The human being is the subject of treatment.',
        commentary: 'Treatment must address the whole person - body, mind, and spirit - not just physical symptoms.'
      }
    ],
    topics: [
      {
        title: 'Components of Human Being',
        content: 'The complete human being comprises: (1) Atma - the eternal soul/consciousness, (2) Manas - the mind processing thoughts and emotions, (3) Sharira - the physical body made of five elements, (4) Indriya - the ten senses (five jnanendriya for perception and five karmendriya for action). Health requires harmonious interaction of all four components.',
        clinicalRelevance: 'Treatment must address all four components for complete healing - physical treatment alone is insufficient.'
      },
      {
        title: 'Mind-Body Connection',
        content: 'The manas (mind) mediates between atma (soul) and sharira (body). Mental states directly affect physical health through dosha vitiation - anger aggravates Pitta, anxiety aggravates Vata, attachment aggravates Kapha. Conversely, physical imbalances affect mental states.',
        clinicalRelevance: 'Mental health assessment and treatment are integral to comprehensive patient care.'
      }
    ],
    doshaDiscussion: [
      'Dosha exist in both body and mind',
      'Rajas and tamas are mental dosha equivalent to physical pitta and kapha',
      'Sattva represents mental health equivalent to balanced physical dosha',
      'Physical dosha vitiation affects mental state and vice versa'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['5.3', '5.7'],
    clinicalApplications: [
      'Holistic patient assessment including mental and spiritual dimensions',
      'Mind-body medicine in Ayurveda',
      'Understanding psychosomatic diseases',
      'Comprehensive treatment planning'
    ]
  },
  {
    id: 'sharira-6',
    sthana: 'Sharira Sthana',
    chapterNumber: 6,
    name: 'Sharira Sankhya Sharira',
    sanskrit: 'शारीरसंख्याशरीरम्',
    english: 'Numerical classification of body structures',
    summary: 'This chapter provides a detailed numerical classification of body structures and components. It lists the exact numbers of bones, muscles, blood vessels, ligaments, joints, and other structures in the body. This anatomical knowledge was essential for surgical practice and understanding structural diseases.',
    keyConcepts: [
      'Number of bones: 360 (including teeth)',
      'Number of muscles (mamsa peshi): 500',
      'Number of blood vessels (sira): 700',
      'Number of ligaments (snayu): 900',
      'Number of joints (sandhi): 200',
      'Number of tendons (kandara): 16',
      'Number of marma (vital points): 107',
      'Number of srotas (channels): 16',
      'Anatomical knowledge for surgical practice',
      'Marma points and their clinical significance'
    ],
    shlokas: [
      {
        number: '6.3',
        sanskrit: 'अस्थीनि षट् शतानि| मांसपेश्यः पञ्चशतानि|',
        translation: 'There are 360 bones and 500 muscles.',
        commentary: 'This detailed anatomical enumeration demonstrates advanced knowledge of body structure.'
      },
      {
        number: '6.5',
        sanskrit: 'मर्माणि शतमेकम्|',
        translation: 'There are 107 marma (vital) points.',
        commentary: 'Marma points are critical in both surgical practice (to avoid) and therapeutic practice (to stimulate).'
      }
    ],
    topics: [
      {
        title: 'Anatomical Enumeration',
        content: 'The chapter provides precise numbers for all major body structures: 360 bones, 500 muscles, 700 blood vessels, 900 ligaments, 200 joints, 16 tendons, 107 marma points. This knowledge was foundational for both surgical and medical practice.',
        clinicalRelevance: 'Anatomical knowledge guides surgical procedures, marma therapy, and understanding structural diseases.'
      },
      {
        title: 'Marma Points',
        content: 'The 107 marma points are vital areas where muscles, vessels, ligaments, bones, and joints converge. Injury to marma points can cause severe pain, disability, or death. They are also used therapeutically in marma chikitsa (vital point therapy).',
        clinicalRelevance: 'Marma knowledge is essential for surgical safety and for therapeutic applications like marma therapy.'
      }
    ],
    doshaDiscussion: [
      'Dosha circulate through all body structures',
      'Structural diseases involve dosha vitiation in specific tissues',
      'Marma point injuries cause severe dosha vitiation'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['6.3', '6.5'],
    clinicalApplications: [
      'Surgical anatomy knowledge',
      'Marma therapy applications',
      'Structural disease assessment',
      'Physical examination techniques'
    ]
  },
  {
    id: 'sharira-7',
    sthana: 'Sharira Sthana',
    chapterNumber: 7,
    name: 'Sharira Vikriti Vijnaniya Sharira',
    sanskrit: 'शारीरविकृतिविज्ञानीयशरीरम्',
    english: 'Knowledge of body abnormalities and their diagnosis',
    summary: 'This chapter describes the diagnostic methods for detecting abnormalities in the body. It covers the examination of body proportions (pramana), assessment of body build (samhanana), evaluation of tissue quality (sarata), and the significance of body marks and moles. The chapter provides criteria for assessing physical constitution and identifying deviations from normal.',
    keyConcepts: [
      'Pramana - body measurements and proportions',
      'Ideal body proportions and their significance',
      'Samhanana - body build/compactness assessment',
      'Sarata - tissue quality evaluation',
      'Body marks (tila, masha) and their significance',
      'Deviations from normal proportions as disease indicators',
      'Physical constitution assessment for treatment planning'
    ],
    shlokas: [
      {
        number: '7.4',
        sanskrit: 'प्रमाणं शरीरस्य|',
        translation: 'The measurement of the body (is important for assessment).',
        commentary: 'Body proportions indicate constitutional strength and help in assessing health status.'
      },
      {
        number: '7.8',
        sanskrit: 'संहननं शरीरस्य|',
        translation: 'The compactness of the body (indicates strength).',
        commentary: 'Body build assessment helps determine patient strength and treatment capacity.'
      }
    ],
    topics: [
      {
        title: 'Body Proportions (Pramana)',
        content: 'Ideal body proportions are described: face length equals fist length, arm span equals height, etc. Deviations from these proportions indicate constitutional imbalance or disease. Pramana assessment is part of ashtavidha pariksha.',
        clinicalRelevance: 'Body proportion assessment helps identify constitutional tendencies and disease susceptibility.'
      },
      {
        title: 'Body Build Assessment (Samhanana)',
        content: 'Samhanana refers to the compactness and firmness of the body. Three types: samsrishta (compact, strong), visaamsrishta (loose, weak), and madhya (moderate). Compact build indicates good strength and disease resistance.',
        clinicalRelevance: 'Body build assessment helps determine treatment intensity and patient prognosis.'
      }
    ],
    doshaDiscussion: [
      'Body proportions reflect predominant dosha',
      'Vata constitution tends to be thin and tall',
      'Pitta constitution tends to be medium build',
      'Kapha constitution tends to be heavy and compact',
      'Deviations from ideal proportions indicate dosha imbalance'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['7.4', '7.8'],
    clinicalApplications: [
      'Physical examination techniques',
      'Constitutional assessment',
      'Treatment capacity evaluation',
      'Prognosis determination based on body build'
    ]
  },
  {
    id: 'sharira-8',
    sthana: 'Sharira Sthana',
    chapterNumber: 8,
    name: 'Jatisutriya Sharira',
    sanskrit: 'जातिसूत्रीयशरीरम्',
    english: 'Classification of individuals and birth-related factors',
    summary: 'This final chapter of Sharira Sthana discusses the classification of individuals based on their prakriti (constitution), the factors determining individual characteristics at birth, and the relationship between cosmic and individual elements. It describes how the combination of parental factors, time of conception, and cosmic influences determine the unique constitution of each individual.',
    keyConcepts: [
      'Jati - classification of individuals based on prakriti',
      'Factors determining individual characteristics at birth',
      'Relationship between cosmic and individual elements',
      'Parental factors in determining offspring prakriti',
      'Time of conception and its influence on constitution',
      'Unique constitution of each individual',
      'Prakriti as the basis for personalized medicine'
    ],
    shlokas: [
      {
        number: '8.3',
        sanskrit: 'जातिः प्रकृतिः|',
        translation: 'Classification is based on constitution (prakriti).',
        commentary: 'Individual constitution is the most important factor in personalized medical treatment.'
      },
      {
        number: '8.5',
        sanskrit: 'मातृजं पितृजं आत्मजं च|',
        translation: 'Characteristics arise from mother, father, and soul.',
        commentary: 'Individual characteristics are determined by the combined influence of maternal factors, paternal factors, and the soul.'
      }
    ],
    topics: [
      {
        title: 'Individual Constitution (Prakriti)',
        content: 'Each individual is born with a unique constitution (prakriti) determined by the predominant dosha at the time of conception. This constitution determines physical characteristics, mental tendencies, disease susceptibility, and treatment response. The eight types of prakriti (vata, pitta, kapha, and their combinations) form the basis of personalized medicine.',
        clinicalRelevance: 'Prakriti assessment is the foundation of Ayurvedic personalized medicine - all treatment decisions are guided by individual constitution.'
      },
      {
        title: 'Factors Determining Constitution',
        content: 'Constitution is determined by: (1) Parental prakriti, (2) Quality of shukra and artava, (3) Time of conception, (4) Cosmic influences at conception, (5) Maternal diet and lifestyle during pregnancy, (6) Kala (seasonal) factors.',
        clinicalRelevance: 'Understanding these factors helps in preconception care and in predicting offspring constitution.'
      }
    ],
    doshaDiscussion: [
      'Prakriti is determined by predominant dosha at conception',
      'Vata prakriti individuals have specific physical and mental characteristics',
      'Pitta prakriti individuals have different characteristics',
      'Kapha prakriti individuals have yet different characteristics',
      'Dual and triple dosha prakriti are more common in practice'
    ],
    treatmentProtocols: [],
    diseaseDescriptions: [],
    importantVerses: ['8.3', '8.5'],
    clinicalApplications: [
      'Prakriti assessment for personalized medicine',
      'Preconception care planning',
      'Understanding individual disease susceptibility',
      'Treatment response prediction based on constitution',
      'Lifestyle recommendations based on prakriti'
    ]
  }
]
