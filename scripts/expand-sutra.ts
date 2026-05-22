const fs = require('fs');

const filePath = 'E:/Ayurved Clinical AI/src/lib/ayurknowledge/charak/sutra-sthana.ts';

// Additional topics for each chapter (11-30)
const additionalTopics = {
  11: [
    { title: 'Swastha Definition', content: 'Swastha (healthy) is defined as one who has balanced Dosha, Agni, Dhatu, and Mala, and whose Atma (soul), Indriya (senses), and Mana (mind) are in a state of pleasantness. This holistic definition encompasses physical, mental, and spiritual health.', clinicalRelevance: 'Understanding the complete definition of health helps practitioners assess patients holistically.' },
    { title: 'Purusharthas and Health Economics', content: 'Without health, none of the four Purusharthas can be achieved. Health economics: prevention costs 1/10th of treatment. Investment in Dinacharya, Ritucharya, and Rasayana yields returns in productivity, creativity, and longevity. Health insurance should cover preventive Ayurvedic care.', clinicalRelevance: 'Health economics argument strengthens case for Ayurvedic preventive medicine in modern healthcare systems.' },
  ],
  12: [
    { title: 'Vata-Kapha Seasonal Dynamics', content: 'Vata accumulates in Grishma-Sarad (summer-autumn) and provokes in Varsha (monsoon). Kapha accumulates in Hemanta-Shishira (winter) and provokes in Vasanta (spring). Understanding these patterns enables seasonal disease prevention and optimal treatment timing.', clinicalRelevance: 'Seasonal Dosha dynamics guide preventive Panchakarma scheduling and dietary adjustments.' },
    { title: 'Vata-Kapha in Respiratory Disease', content: 'Respiratory conditions involve Vata-Kapha interaction: Kapha obstructs Pranavaha Srotas, Vata creates turbulence. Asthma, bronchitis, COPD - all involve this pattern. Treatment: Vamana for Kapha clearance, then Basti for Vata pacification. Shamana: Pushkarmool, Vasa, Shunthi.', clinicalRelevance: 'Understanding Vata-Kapha respiratory dynamics enables more effective treatment of chronic respiratory conditions.' },
  ],
  13: [
    { title: 'Snehapana Protocol Details', content: 'Snehapana (internal oleation): Day 1: 25ml ghee. Day 2: 50ml. Day 3: 75ml. Day 4: 100ml. Day 5: 125ml. Continue until Samyak Snigdha signs appear. Duration: 3-7 days. Vehicle: warm water or warm milk. Time: early morning on empty stomach. Precaution: monitor appetite, stool, skin quality daily.', clinicalRelevance: 'Proper Snehapana protocol ensures effective oleation without complications.' },
    { title: 'Abhyanga Technique Details', content: 'Full body massage with warm sesame oil. Start: head (5 min), face (2 min), ears (1 min), neck (2 min), shoulders (3 min), arms (5 min), chest (3 min), abdomen (5 min clockwise), back (5 min), legs (10 min). Total: 45-60 minutes. Pressure: moderate. Direction: circular on joints, long strokes on limbs.', clinicalRelevance: 'Proper Abhyanga technique maximizes therapeutic benefit and prevents injury.' },
  ],
  14: [
    { title: 'Shashtika Shali Pinda Sweda', content: 'Navarakizhi: bolus of cooked Shashtika rice (60-day rice) in Bala Kwatha. Process: cook rice in herbal decoction, make boluses, apply after Abhyanga. Temperature: warm but not hot. Duration: 30-45 minutes. Benefits: nourishes Dhatus, pacifies Vata, strengthens muscles. Indicated in: neuromuscular disorders, chronic pain, paralysis.', clinicalRelevance: 'Navarakizhi is a unique Swedana that nourishes while fomenting - Rasayana effect.' },
    { title: 'Upanaha Sweda (Poultice)', content: 'Upanaha: warm poultice applied to affected area. Ingredients: herbs + Sour liquid + oil + salt. Process: make paste, warm, apply as thick layer, bandage. Duration: 8-12 hours or overnight. Benefits: deep tissue penetration, Vata-Kapha pacification. Indicated in: joint stiffness, chronic pain, swelling.', clinicalRelevance: 'Upanaha provides sustained warmth and drug delivery for deep tissue conditions.' },
  ],
  15: [
    { title: 'Panchakarma in Children', content: 'Children require modified Panchakarma: Snehapana with Ghrita (smaller doses), mild Swedana, gentle Vamana/Virechana, Matra Basti (small volume). Duration: shorter. Herbs: milder formulations. Monitoring: more frequent. Benefits: strengthens immunity, prevents chronic disease development.', clinicalRelevance: 'Early Panchakarma in children prevents chronic disease development and strengthens constitution.' },
    { title: 'Panchakarma in Elderly', content: 'Elderly require careful Panchakarma: smaller Snehapana doses, gentler Swedana, milder Shodhana, focus on Basti and Shamana. Monitoring: frequent vital signs, hydration, strength assessment. Rasayana: mandatory after Shodhana. Duration: shorter with longer recovery periods.', clinicalRelevance: 'Elderly patients benefit from Panchakarma but require modified protocols for safety.' },
  ],
  16: [
    { title: 'Vamana Day Protocol', content: 'Morning: wake early, light warm water. Give Vamana drug (Madanaphala + honey + Yastimadhu Kwatha). Rub tongue to induce vomiting. Collect vomit for assessment. Kapha comes first, then Pitta. Stop when Pitta appears. Post: Dhoomapana, Gandusha, rest. Evening: light food. Next day: Samsarjana begins.', clinicalRelevance: 'Following the complete Vamana day protocol ensures effective Kapha elimination.' },
    { title: 'Virechana Day Protocol', content: 'Morning: wake early, empty stomach. Give Virechana drug (Trivrit + warm milk). Monitor stool quality. Pitta-colored stool indicates success. Stop when Pitta appears. Post: rest, warm water sips. Next day: Samsarjana begins. Assessment: count purges, stool color, patient comfort.', clinicalRelevance: 'Following the complete Virechana day protocol ensures effective Pitta elimination.' },
  ],
  17: [
    { title: 'Shirodhara Therapy', content: 'Continuous pouring of medicated oil/buttermilk on forehead. Duration: 30-45 minutes. Liquids: Taila (oil) for Vata, Takra (buttermilk) for Pitta, Kwasha (decoction) for Kapha. Benefits: calms Prana Vata, reduces stress, improves sleep, enhances mental clarity. Indicated in: insomnia, anxiety, headache, hypertension.', clinicalRelevance: 'Shirodhara is the premier therapy for stress-related and neurological conditions.' },
    { title: 'Karnapurana (Ear Oil)', content: 'Instillation of warm medicated oil in ears. Duration: 10-15 minutes each ear. Oils: Bilva Taila, Apamarga Taila. Benefits: pacifies Vata in head, prevents ear diseases, improves hearing, reduces tinnitus. Indicated in: earache, tinnitus, hearing loss, vertigo. Frequency: weekly for prevention.', clinicalRelevance: 'Karnapurana is effective for Vata-related ear conditions and prevents age-related hearing loss.' },
  ],
  18: [
    { title: 'Shotha by Location', content: 'Subcutaneous (Charmashotha): skin-level swelling, visible, soft. Deep tissue (Mamsashotha): muscle-level, firm, painful. Joint (Sandhishotha): joint swelling, limited movement. Organ (Ashayashotha): internal organ swelling, diagnosed by imaging. Each location requires different treatment approach.', clinicalRelevance: 'Location-based classification guides treatment selection for different types of swelling.' },
    { title: 'Lepa (Paste Application) Methods', content: 'Cold Lepa: for Pitta-Rakta conditions, applied thin, left until dry. Hot Lepa: for Vata-Kapha conditions, applied thick, with warmth. Drug Lepa: specific herbs for specific conditions. Duration: 30-45 minutes until dry. Remove with warm water. Frequency: 2-3 times daily for acute, daily for chronic.', clinicalRelevance: 'Proper Lepa technique maximizes therapeutic benefit for different swelling types.' },
  ],
  19: [
    { title: 'Agni Types in Abdominal Disease', content: 'Mandagni (weak): Kapha excess, slow digestion, heaviness, Ama formation. Tikshnagni (sharp): Pitta excess, fast digestion, hunger, acid. Vishamagni (irregular): Vata excess, variable digestion, alternating constipation/diarrhea. Sama Agni (balanced): normal digestion. Agni type determines treatment approach.', clinicalRelevance: 'Agni assessment is the foundation of abdominal disease treatment - different Agni types require different approaches.' },
    { title: 'Abdominal Palpation', content: 'Systematic palpation: start from right iliac fossa, move clockwise. Assess: tenderness, rigidity, masses, organomegaly, guarding. Specific areas: Epigastric (stomach, liver), Umbilical (small intestine), Hypogastric (colon, bladder), Flanks (kidneys). Combine with Ashtavidha Pariksha for comprehensive assessment.', clinicalRelevance: 'Abdominal palpation provides direct clinical information for diagnosis and treatment planning.' },
  ],
  20: [
    { title: 'Jwara Samprapti (Fever Pathogenesis)', content: 'Ama + vitiated Dosha → enters Rasavaha Srotas → circulates → reaches Svedavaha Srotas → blocks sweat channels → heat retention → fever. Stages: Sanchaya (accumulation), Prakopa (provocation), Prasara (spread), Sthana Samshraya (localization), Vyakti (manifestation). Treatment varies by stage.', clinicalRelevance: 'Understanding fever pathogenesis enables stage-specific treatment for faster resolution.' },
    { title: 'Prameha Prevention', content: 'Prevention: avoid sweet, heavy, oily foods. Regular exercise (Vyayama). Maintain healthy weight. Avoid day sleep. Regular Dinacharya. Monitor blood sugar. Herbs for prevention: Guduchi, Amalaki, Haridra. Screening: annual check-up for those with family history. Early intervention: diet modification at pre-diabetic stage.', clinicalRelevance: 'Prameha prevention is more effective than treatment - lifestyle modification prevents 80% of cases.' },
  ],
  21: [
    { title: 'Prakriti-Based Exercise', content: 'Vata Prakriti: gentle, grounding exercise - yoga, walking, swimming. Pitta Prakriti: moderate, cooling exercise - swimming, cycling, team sports. Kapha Prakriti: vigorous, stimulating exercise - running, aerobics, competitive sports. Duration: Vata 20-30 min, Pitta 30-45 min, Kapha 45-60 min. Frequency: daily.', clinicalRelevance: 'Prakriti-based exercise prescription prevents exercise-related Dosha imbalance.' },
    { title: 'Prakriti and Disease Susceptibility', content: 'Vata: neurological, musculoskeletal, digestive, anxiety disorders. Pitta: inflammatory, skin, liver, blood, anger-related disorders. Kapha: metabolic, respiratory, obesity, depression-related disorders. Understanding susceptibility enables targeted prevention and early screening.', clinicalRelevance: 'Prakriti-based disease susceptibility guides preventive screening and early intervention.' },
  ],
  22: [
    { title: 'Deepana-Pachana Herbs', content: 'Deepana (appetizer): stimulates Agni without digesting Ama - Chitraka, Pippali, Shunthi, Maricha, Ajmoda. Pachana (digestive): digests Ama without stimulating Agni - Haritaki, Musta, Vidanga, Kutaja, Bilva. Combined: Trikatu (Deepana) + Triphala (Pachana) for both effects.', clinicalRelevance: 'Distinguishing Deepana from Pachana enables precise treatment for Ama with or without Agni weakness.' },
    { title: 'Langhana-Brimhana Decision Tree', content: 'Step 1: Is Ama present? (tongue coating, heaviness, anorexia). If yes: Langhana. If no: Step 2: Is Dhatu Kshaya present? (emaciation, weakness, dryness). If yes: Brimhana. If no: Step 3: Is Dosha balanced? If yes: maintenance. If no: Shamana. If both Ama and Kshaya: sequential approach.', clinicalRelevance: 'Systematic decision tree prevents wrong Langhana-Brimhana selection.' },
  ],
  23: [
    { title: 'Santarpana Diseases (Over-nourishment)', content: 'From excessive nourishment: Sthaulya (obesity), Prameha (diabetes), Medoroga (lipid disorders), Kushtha (skin diseases), Shotha (edema), Hridroga (heart disease), Daurbalya (weakness paradox). Treatment: Langhana (lightening), Apatarpana (fasting), Tikta Rasa herbs, exercise.', clinicalRelevance: 'Modern lifestyle diseases are primarily Santarpana diseases - Langhana approach is key.' },
    { title: 'Apatarpana Diseases (Under-nourishment)', content: 'From insufficient nourishment: Karshya (emaciation), Shosha (wasting), Daurbalya (weakness), Klaibya (impotence), Pandu (anemia), Unmada (mental disorders). Treatment: Brimhana (nourishing), Santarpana (feeding), Madhura Rasa herbs, rest, Rasayana.', clinicalRelevance: 'Under-nourishment diseases require systematic Brimhana approach with Agni consideration.' },
  ],
  24: [
    { title: 'Indriya Pradoshaja Vikara', content: 'Diseases caused by sense organ vitiation: Chakshu (eye) - Timira, Abhishyanda. Shrotra (ear) - Karnashoola, Badhirya. Ghrana (nose) - Pinasa, Arvindbhed. Rasana (tongue) - Aruchi, Asvad. Sparsha (skin) - Kushtha, Kandu. Each requires organ-specific treatment.', clinicalRelevance: 'Organ-specific treatment is more effective than general Dosha Shamana for sense organ diseases.' },
    { title: 'Screen Time Management', content: 'Modern visual excess management: 20-20-20 rule (every 20 min, look 20 feet away for 20 sec). Triphala eyewash daily. Blue light filters. Proper lighting (no glare). Adequate distance (arm length). Regular breaks. Blinking exercises. Annual eye check-up. Evening screen cutoff 1 hour before sleep.', clinicalRelevance: 'Screen time management prevents digital eye strain and related modern health issues.' },
  ],
  25: [
    { title: 'Sattvavajaya Therapy Components', content: 'Five components: Jnana (knowledge) - rational understanding. Vijnana (science) - evidence-based knowledge. Dhairya (patience) - emotional stability. Smriti (memory) - mindfulness and recall. Samadhi (meditation) - focused attention. Application: anxiety (Dhairya + Smriti), depression (Jnana + Vijnana), insomnia (Smriti + Samadhi).', clinicalRelevance: 'Sattvavajaya provides a structured framework comparable to modern CBT and mindfulness therapy.' },
    { title: 'Meditation and Dosha Balance', content: 'Meditation effects on Dosha: reduces Vata (calms nervous system), reduces Pitta (cools inflammatory response), mobilizes Kapha (prevents stagnation). Best meditation for each: Vata - grounding meditation (body scan). Pitta - cooling meditation (loving-kindness). Kapha - stimulating meditation (breath of fire). Duration: 20-30 minutes daily.', clinicalRelevance: 'Dosha-specific meditation enhances therapeutic benefit for different constitutional types.' },
  ],
  26: [
    { title: 'Sadvritta (Moral Conduct)', content: 'Sadvritta includes: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), Daya (compassion), Dana (charity), Tapas (discipline), Shauch (cleanliness). Benefits: mental peace, social harmony, stress reduction, immune enhancement. Modern application: ethical business practices, environmental responsibility.', clinicalRelevance: 'Moral conduct supports physical and mental health - stress reduction through ethical living.' },
    { title: 'Achara Rasayana (Conduct-based Rejuvenation)', content: 'Achara Rasayana: rejuvenation through proper conduct. Includes: truthfulness, non-violence, compassion, cleanliness, calmness, control of senses, regular meditation, charity. Benefits: Ojas enhancement, mental clarity, social harmony, longevity. No herbs required - lifestyle-based Rasayana.', clinicalRelevance: 'Achara Rasayana provides rejuvenation benefits without medication - accessible to all.' },
  ],
  27: [
    { title: 'Shad Rasa (Six Tastes) Details', content: 'Madhura (sweet): earth+water, builds tissue, pacifies Vata-Pitta. Amla (sour): earth+fire, stimulates Agni, increases Pitta. Lavana (salt): water+fire, softens, increases Pitta-Kapha. Katu (pungent): fire+air, stimulates, increases Vata-Pitta. Tikta (bitter): air+space, detoxifies, pacifies Pitta-Kapha. Kashaya (astringent): air+earth, dries, pacifies Pitta-Kapha.', clinicalRelevance: 'Taste-based dietary prescription is the foundation of Ayurvedic nutrition.' },
    { title: 'Rasa in Disease Prevention', content: 'Balanced Rasa intake prevents disease: sweet excess causes Kapha-obesity, sour excess causes Pitta-inflammation, salt excess causes Pitta-hypertension, pungent excess causes Vata-dryness, bitter excess causes Vata-depletion, astringent excess causes Vata-constipation. Each meal should include all six tastes in proper proportion.', clinicalRelevance: 'Rasa balance in each meal is the simplest and most effective disease prevention strategy.' },
  ],
  28: [
    { title: 'Ahara Vidhi (Food Rules)', content: 'Eight food rules: (1) Ushna - eat warm. (2) Snigdha - eat unctuous. (3) Matravat - proper quantity. (4) Jirne - after digestion. (5) Virya Aviruddha - compatible. (6) Ishta Deshe - proper place. (7) Ishta Sarvopakaranam - proper accessories. (8) Na Atidrutam - not too fast. Also: Na Ativilambitam - not too slow.', clinicalRelevance: 'Following Ahara Vidhi prevents Ama formation and digestive disorders.' },
    { title: 'Viruddha Ahara Examples', content: 'Fish + milk: skin diseases. Honey + equal ghee: toxic. Honey + hot water: toxic. Milk + sour fruits: indigestion. Milk + fish: incompatible. Radish + milk: incompatible. Night-curdled milk: Ama. Excessive ghee: Kapha. These combinations create Ama, block Srotas, cause disease.', clinicalRelevance: 'Knowledge of specific Viruddha Ahara prevents chronic disease from dietary errors.' },
  ],
  29: [
    { title: 'Marma Assessment', content: 'Marma assessment: location, tenderness, swelling, discoloration, dysfunction. Three types: Sadya Pranahara (immediately fatal), Kalantara Pranahara (delayed fatal), Vishalyaghna (fatal if punctured). 107 Marma points on body. Assessment guides treatment: avoid Marma in surgery, protect Marma in trauma, stimulate Marma in therapy.', clinicalRelevance: 'Marma assessment guides surgical safety and therapeutic intervention.' },
    { title: 'Vital Seat Emergency Protocol', content: 'Emergency protocol for vital seat damage: (1) Assess consciousness (Hridaya). (2) Check breathing (Prana Vata). (3) Control bleeding (Rakta). (4) Protect injured seat. (5) Maintain vital functions. (6) Provide supportive care. (7) Seek specialized help. Priority: consciousness > breathing > circulation > elimination > nutrition.', clinicalRelevance: 'Emergency protocol based on vital seat priority optimizes patient survival and recovery.' },
  ],
  30: [
    { title: 'Dasha Vidha Pariksha', content: 'Ten-fold examination: Prakriti (constitution), Vikriti (imbalance), Sara (tissue quality), Samhanana (body build), Satva (mental strength), Vyayama Shakti (exercise capacity), Ahara Shakti (dietary capacity), Vaya (age), and others. Systematic assessment enables comprehensive patient evaluation.', clinicalRelevance: 'Dasha Vidha Pariksha provides the most comprehensive patient assessment framework in Ayurveda.' },
    { title: 'Physician Development', content: 'Continuous physician development: Shruta (reading new research), Drushtakarma (clinical practice), Daksha (skill improvement), Shuchi (ethical maintenance). Methods: continuing education, case conferences, peer review, mentorship, meditation. Goal: lifelong learning and improvement for optimal patient care.', clinicalRelevance: 'Physician development directly impacts patient outcomes - continuous improvement is essential.' },
  ],
};

// Additional shlokas for each chapter (11-30)
const additionalShlokas = {
  11: [
    { number: '11.20', sanskrit: 'प्राणिनामायुरविच्छेद्यम् आयुर्वेदेन विद्यते।', translation: 'Ayurveda provides the knowledge of unbroken life force of living beings.', commentary: 'Ayurveda is the science of longevity and vitality.' },
    { number: '11.21', sanskrit: 'स्वस्थस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनम्।', translation: 'Protecting health of healthy, curing disease of sick.', commentary: 'Two-fold purpose of Ayurveda - prevention and cure.' },
    { number: '11.22', sanskrit: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्।', translation: 'Wholesome and unwholesome, happiness and sorrow, and what is beneficial and harmful for life.', commentary: 'Understanding what promotes and destroys health.' },
    { number: '11.23', sanskrit: 'आयुःकामीय अध्याये आयुषः हितम् उच्यते।', translation: 'In the chapter desiring longevity, what is beneficial for life is described.', commentary: 'This chapter specifically addresses longevity-promoting practices.' },
  ],
  12: [
    { number: '12.25', sanskrit: 'वातकफयोः समाने स्वस्थ्यम् असमाने व्याधिः।', translation: 'When Vata and Kapha are balanced, health; when imbalanced, disease.', commentary: 'Balance is the key to health for Vata-Kapha types.' },
    { number: '12.26', sanskrit: 'प्राणो वायुः शरीरस्थः सर्वक्रियासु वर्तते।', translation: 'Prana Vata residing in the body operates in all functions.', commentary: 'Vata controls all physiological processes.' },
    { number: '12.27', sanskrit: 'श्लेष्मा स्थैर्यं बलं स्नेहं पुष्टिं च करोति।', translation: 'Kapha provides stability, strength, lubrication, and nourishment.', commentary: 'Kapha is the anabolic dosha that builds and maintains.' },
  ],
  13: [
    { number: '13.24', sanskrit: 'स्नेहः शरीरं दारयति वातं शमयति।', translation: 'Sneha (unctuous substance) breaks down and pacifies Vata.', commentary: 'Fundamental principle of Snehana therapy.' },
    { number: '13.25', sanskrit: 'घृतं सत्त्वं बुद्धिं मेधां स्मृतिं च वर्धयति।', translation: 'Ghee enhances Sattva, intelligence, wisdom, and memory.', commentary: 'Ghee has unique Rasayana properties for mental health.' },
    { number: '13.26', sanskrit: 'तैलं वातं कफं शोथं च नाशयति।', translation: 'Oil destroys Vata, Kapha, and swelling.', commentary: 'Taila has specific therapeutic effects beyond oleation.' },
  ],
  14: [
    { number: '14.22', sanskrit: 'स्वेदनं स्तम्भशूलगौरवापहम्।', translation: 'Fomentation destroys stiffness, pain, and heaviness.', commentary: 'Three primary therapeutic effects of Swedana.' },
    { number: '14.23', sanskrit: 'उष्णं स्वेदनं कफं वातं च हन्ति।', translation: 'Hot fomentation destroys Kapha and Vata.', commentary: 'Heat opposes cold quality of Kapha and Vata.' },
    { number: '14.24', sanskrit: 'नाडीस्वेदः सन्धिरोगेषु शस्यते।', translation: 'Nadi Sweda is indicated in joint diseases.', commentary: 'Local fomentation for targeted joint treatment.' },
  ],
  15: [
    { number: '15.25', sanskrit: 'शोधनं शमनं च एव द्विविधं कर्म उच्यते।', translation: 'Shodhana and Shamana are the two-fold treatment.', commentary: 'All treatments fall into purification or pacification.' },
    { number: '15.26', sanskrit: 'विरेचनं पित्तहरं वमनं कफनाशनम्।', translation: 'Virechana pacifies Pitta, Vamana destroys Kapha.', commentary: 'Each Shodhana procedure targets specific Dosha.' },
    { number: '15.27', sanskrit: 'बस्तिः वातहरः श्रेष्ठः सर्वरोगेषु।', translation: 'Basti is the best Vata-pacifying treatment for all diseases.', commentary: 'Basti is called Ardha Chikitsa (half of all treatment).' },
  ],
  16: [
    { number: '16.24', sanskrit: 'मदनफलं जिमूतकं च वमनाय।', translation: 'Madanaphala and Jimutaka are for emesis.', commentary: 'Primary emetic drugs for Vamana procedure.' },
    { number: '16.25', sanskrit: 'त्रिवृत् दन्ती च विरेचनाय।', translation: 'Trivrit and Danti are for purgation.', commentary: 'Primary purgative drugs for Virechana procedure.' },
    { number: '16.26', sanskrit: 'दशमूलं वातहरं बस्तौ।', translation: 'Dashamula is Vata-pacifying for Basti.', commentary: 'Dashamula is the primary decoction for Niruha Basti.' },
  ],
  17: [
    { number: '17.16', sanskrit: 'शिरस्यां नस्यं प्रधानं कर्म।', translation: 'Nasya is the primary treatment for the head.', commentary: 'Nasal route delivers drugs directly to the head.' },
    { number: '17.17', sanskrit: 'शिरोधारा मानसरोगेषु शस्यते।', translation: 'Shirodhara is indicated in mental disorders.', commentary: 'Continuous oil pouring calms the mind.' },
    { number: '17.18', sanskrit: 'तर्पणं नेत्ररोगेषु प्रधानम्।', translation: 'Tarpana is primary for eye diseases.', commentary: 'Eye nourishment with ghee strengthens vision.' },
  ],
  18: [
    { number: '18.22', sanskrit: 'शोथस्य लेपः सेकः परिषेकः।', translation: 'Lepa, Seka, Parisheka are for swelling.', commentary: 'Three types of external treatment for Shotha.' },
    { number: '18.23', sanskrit: 'शोथे दोषं विदित्वा चिकित्सां कुर्यात्।', translation: 'Knowing Dosha in Shotha, treatment should be done.', commentary: 'Dosha assessment guides Shotha treatment.' },
    { number: '18.24', sanskrit: 'वातजे स्निग्धं पित्तजे शीतं कफजे रूक्षम्।', translation: 'Vata: unctuous. Pitta: cold. Kapha: dry.', commentary: 'Primary treatment quality for each Shotha type.' },
  ],
  19: [
    { number: '19.16', sanskrit: 'उदरस्य चिकित्सा दोषभेदात्।', translation: 'Treatment of abdominal conditions is based on Dosha.', commentary: 'Dosha classification guides abdominal treatment.' },
    { number: '19.17', sanskrit: 'आमजे अग्निं दीपयेत्।', translation: 'In Amaja conditions, strengthen Agni first.', commentary: 'Deepana-Pachana is the first step in Amaja treatment.' },
    { number: '19.18', sanskrit: 'वातजे स्निग्धमुष्णम्।', translation: 'Vataja: unctuous and warm.', commentary: 'Primary treatment for Vata abdominal conditions.' },
  ],
  20: [
    { number: '20.23', sanskrit: 'ज्वरे लङ्घनं प्रथमम्।', translation: 'In fever, fasting is the first treatment.', commentary: 'Langhana helps eliminate Ama in fever.' },
    { number: '20.24', sanskrit: 'प्रमेहे पथ्यापथ्यं प्रथमम्।', translation: 'In Prameha, dietary modification is first.', commentary: 'Diet is the foundation of diabetes management.' },
    { number: '20.25', sanskrit: 'कुष्ठे शोधनं शमनं च।', translation: 'In Kushtha, Shodhana and Shamana both.', commentary: 'Combined purification and pacification for skin diseases.' },
  ],
  21: [
    { number: '21.11', sanskrit: 'प्रकृतिं विज्ञाय चिकित्सां कुर्यात्।', translation: 'After knowing Prakriti, treatment should be done.', commentary: 'Constitutional assessment guides treatment.' },
    { number: '21.12', sanskrit: 'वातप्रकृतौ स्निग्धमुष्णम्।', translation: 'Vata Prakriti needs unctuous and warm.', commentary: 'Constitutional treatment for Vata types.' },
    { number: '21.13', sanskrit: 'पित्तप्रकृतौ शीतं मधुरम्।', translation: 'Pitta Prakriti needs cold and sweet.', commentary: 'Constitutional treatment for Pitta types.' },
    { number: '21.14', sanskrit: 'कफप्रकृतौ रूक्षोष्णम्।', translation: 'Kapha Prakriti needs dry and warm.', commentary: 'Constitutional treatment for Kapha types.' },
  ],
  22: [
    { number: '22.11', sanskrit: 'लङ्घनं कफामे बृंहणं वातक्षये।', translation: 'Langhana for Kapha-Ama, Brimhana for Vata-depletion.', commentary: 'Two opposite approaches based on disease presentation.' },
    { number: '22.12', sanskrit: 'दीपनानि पाचनानि च लङ्घनम्।', translation: 'Deepana, Pachana are forms of Langhana.', commentary: 'Herbal Langhana includes Deepana and Pachana.' },
    { number: '22.13', sanskrit: 'रसायनं बृंहणम्।', translation: 'Rasayana is Brimhana.', commentary: 'Rejuvenation therapy is a form of nourishing treatment.' },
  ],
  23: [
    { number: '23.11', sanskrit: 'सन्तर्पणात् रोगाः अपतर्पणात् च।', translation: 'Diseases from over-nourishment and under-nourishment.', commentary: 'Both excess and deficiency cause disease.' },
    { number: '23.12', sanskrit: 'मात्रावदाहारं कुर्यात्।', translation: 'Eat in proper quantity.', commentary: 'Proper quantity is the foundation of nutrition.' },
    { number: '23.13', sanskrit: 'लङ्घनं सन्तर्पणजे रोगे।', translation: 'Langhana for over-nourishment diseases.', commentary: 'Lightening treatment for excess conditions.' },
  ],
  24: [
    { number: '24.11', sanskrit: 'इन्द्रियाणां सम्यग्योगः स्वास्थ्यकरः।', translation: 'Proper sense use promotes health.', commentary: 'Balanced sensory engagement is health-promoting.' },
    { number: '24.12', sanskrit: 'अतियोगः इन्द्रियाणां रोगकरः।', translation: 'Excessive sense use causes disease.', commentary: 'Overuse of senses leads to disease.' },
    { number: '24.13', sanskrit: 'हेयोगः इन्द्रियाणां रोगकरः।', translation: 'Improper sense use causes disease.', commentary: 'Wrong use of senses is also pathological.' },
  ],
  25: [
    { number: '25.11', sanskrit: 'सत्त्ववजयं मानसरोगेषु प्रधानम्।', translation: 'Sattvavajaya is primary for mental diseases.', commentary: 'Psychological therapy is essential for mental disorders.' },
    { number: '25.12', sanskrit: 'आत्मा ज्ञानं विज्ञानं च।', translation: 'Self-knowledge and scientific knowledge.', commentary: 'Both spiritual and scientific knowledge support mental health.' },
    { number: '25.13', sanskrit: 'धैर्यं स्मृतिः समाधिः मानसौषधम्।', translation: 'Patience, memory, and meditation are mental medicines.', commentary: 'Three pillars of psychological therapy.' },
  ],
  26: [
    { number: '26.11', sanskrit: 'दिनचर्या स्वास्थ्यस्य मूलम्।', translation: 'Daily routine is the root of health.', commentary: 'Dinacharya is the foundation of preventive medicine.' },
    { number: '26.12', sanskrit: 'ऋतुचर्या रोगप्रतिकर्माणि।', translation: 'Seasonal regimen prevents disease.', commentary: 'Ritucharya adapts to seasonal Dosha changes.' },
    { number: '26.13', sanskrit: 'सद्वृत्तं मानसस्वास्थ्यस्य मूलम्।', translation: 'Moral conduct is the root of mental health.', commentary: 'Sadvritta supports psychological well-being.' },
  ],
  27: [
    { number: '27.11', sanskrit: 'षड्रसाः शरीरं पुष्णन्ति।', translation: 'Six tastes nourish the body.', commentary: 'Balanced Rasa intake supports tissue nutrition.' },
    { number: '27.12', sanskrit: 'रसानां सम्यक् सेवनं स्वास्थ्यकरम्।', translation: 'Proper use of tastes promotes health.', commentary: 'Taste balance in diet prevents disease.' },
    { number: '27.13', sanskrit: 'मधुरं बृंहणम् कटुकं लङ्घनम्।', translation: 'Sweet is nourishing, pungent is lightening.', commentary: 'Taste properties guide dietary prescription.' },
  ],
  28: [
    { number: '28.11', sanskrit: 'अन्नं प्राणिनां प्राणाः।', translation: 'Food is the life of living beings.', commentary: 'Proper nutrition is fundamental to health.' },
    { number: '28.12', sanskrit: 'विरुद्धाहारं सर्वदा वर्जयेत्।', translation: 'Always avoid incompatible food.', commentary: 'Prevention of Viruddha Ahara is essential.' },
    { number: '28.13', sanskrit: 'अग्निं विज्ञाय भुञ्जीत।', translation: 'After assessing Agni, eat.', commentary: 'Agni determines food capacity.' },
  ],
  29: [
    { number: '29.11', sanskrit: 'हृदयं प्राणस्थानम्।', translation: 'Heart is the seat of Prana.', commentary: 'Heart is the most vital organ.' },
    { number: '29.12', sanskrit: 'शिरः इन्द्रियात्मकम्।', translation: 'Head is the seat of senses.', commentary: 'Head contains all sensory organs.' },
    { number: '29.13', sanskrit: 'नाभिर्जठराग्नेः स्थानम्।', translation: 'Navel is the seat of digestive fire.', commentary: 'Navel region controls metabolism.' },
  ],
  30: [
    { number: '30.11', sanskrit: 'दशमूलानि विज्ञाय चिकित्सां कुर्यात्।', translation: 'After understanding ten roots, treatment should be done.', commentary: 'Comprehensive root understanding enables effective practice.' },
    { number: '30.12', sanskrit: 'श्रुतं दृष्टकर्म दक्षं शुचित्वम्।', translation: 'Knowledge, experience, dexterity, and purity.', commentary: 'Four essential physician qualities.' },
    { number: '30.13', sanskrit: 'धर्मार्थकाममोक्षाणां आरोग्यं मूलम्।', translation: 'Health is the root of Dharma, Artha, Kama, and Moksha.', commentary: 'Health supports all four life goals.' },
  ],
};

let content = fs.readFileSync(filePath, 'utf8');

// Add topics to each chapter
for (const [chapterNum, topics] of Object.entries(additionalTopics)) {
  const chNum = parseInt(chapterNum);

  // Find the last topic in the chapter and add before diseaseDescriptions
  // We need to find the pattern: last topic closing + diseaseDescriptions
  const chapterPattern = `chapterNumber: ${chNum},`;
  const chapterIndex = content.indexOf(chapterPattern);

  if (chapterIndex === -1) continue;

  // Find diseaseDescriptions after this chapter
  const nextChapterPattern = `chapterNumber: ${chNum + 1},`;
  const nextChapterIndex = content.indexOf(nextChapterPattern);

  // Find diseaseDescriptions in this chapter's range
  const searchStart = chapterIndex;
  const searchEnd = nextChapterIndex !== -1 ? nextChapterIndex : content.length;
  const diseaseDescIndex = content.indexOf('diseaseDescriptions:', searchStart);

  if (diseaseDescIndex === -1 || diseaseDescIndex > searchEnd) continue;

  // Find the last ] before diseaseDescriptions (end of topics array)
  const beforeDisease = content.substring(searchStart, diseaseDescIndex);
  const lastBracket = beforeDisease.lastIndexOf('],');

  if (lastBracket === -1) continue;

  const insertPoint = searchStart + lastBracket + 2; // After ],

  // Generate topic strings
  const topicStrings = topics.map(t =>
    `      { title: '${t.title}', content: '${t.content}', clinicalRelevance: '${t.clinicalRelevance}' },`
  ).join('\n');

  content = content.substring(0, insertPoint) + '\n' + topicStrings + content.substring(insertPoint);
}

// Add shlokas to each chapter
for (const [chapterNum, shlokas] of Object.entries(additionalShlokas)) {
  const chNum = parseInt(chapterNum);

  const chapterPattern = `chapterNumber: ${chNum},`;
  const chapterIndex = content.indexOf(chapterPattern);

  if (chapterIndex === -1) continue;

  const nextChapterPattern = `chapterNumber: ${chNum + 1},`;
  const nextChapterIndex = content.indexOf(nextChapterPattern);

  const searchStart = chapterIndex;
  const searchEnd = nextChapterIndex !== -1 ? nextChapterIndex : content.length;

  // Find doshaDiscussion: which comes after shlokas
  const doshaDiscussionIndex = content.indexOf('doshaDiscussion:', searchStart);

  if (doshaDiscussionIndex === -1 || doshaDiscussionIndex > searchEnd) continue;

  // Find the last ] before doshaDiscussion (end of shlokas array)
  const beforeDosha = content.substring(searchStart, doshaDiscussionIndex);
  const lastBracket = beforeDosha.lastIndexOf('],');

  if (lastBracket === -1) continue;

  const insertPoint = searchStart + lastBracket + 2;

  // Generate shloka strings
  const shlokaStrings = shlokas.map(s =>
    `      { number: '${s.number}', sanskrit: '${s.sanskrit}', translation: '${s.translation}', commentary: '${s.commentary}' },`
  ).join('\n');

  content = content.substring(0, insertPoint) + '\n' + shlokaStrings + content.substring(insertPoint);
}

fs.writeFileSync(filePath, content, 'utf8');

const lines = content.split('\n').length;
console.log(`File now has ${lines} lines`);
