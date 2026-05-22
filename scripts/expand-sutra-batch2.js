const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'ayurknowledge', 'charak', 'sutra-sthana.ts');

function topic(t) {
  return `      { title: ${JSON.stringify(t.title)}, content: ${JSON.stringify(t.content)}, clinicalRelevance: ${JSON.stringify(t.clinicalRelevance)} },`;
}

function shloka(s) {
  return `      { number: ${JSON.stringify(s.number)}, sanskrit: ${JSON.stringify(s.sanskrit)}, translation: ${JSON.stringify(s.translation)}, commentary: ${JSON.stringify(s.commentary)} },`;
}

function disease(d) {
  return `      { name: ${JSON.stringify(d.name)}, sanskrit: ${JSON.stringify(d.sanskrit)}, etiology: ${JSON.stringify(d.etiology)}, symptoms: ${JSON.stringify(d.symptoms)}, prognosis: ${JSON.stringify(d.prognosis)}, treatment: ${JSON.stringify(d.treatment)} },`;
}

function protocol(p) {
  return `      { condition: ${JSON.stringify(p.condition)}, treatment: ${JSON.stringify(p.treatment)}, herbs: ${JSON.stringify(p.herbs)}, dosage: ${JSON.stringify(p.dosage)}, duration: ${JSON.stringify(p.duration)}, precautions: ${JSON.stringify(p.precautions)} },`;
}

// Batch 2: More topics for chapters 1-10
const topics2 = {
  1: [
    { title: 'Mahabhuta Theory Application', content: 'Five Mahabhuta (elements): Prithvi (earth), Jala (water), Tejas (fire), Vayu (air), Akasha (space). All matter is composed of these elements. Each Dosha has Mahabhuta composition: Vata = Vayu+Akasha, Pitta = Tejas+Jala, Kapha = Jala+Prithvi. Treatment targets the predominant Mahabhuta.', clinicalRelevance: 'Mahabhuta theory provides the fundamental framework for understanding all matter and treatment.' },
    { title: 'Agni (Digestive Fire) Types', content: 'Jatharagni: main digestive fire in stomach. Bhutagni: five elemental fires in liver for Dhatu formation. Dhatvagni: seven tissue-level fires for tissue metabolism. All three levels must function properly for health. Agni disturbance at any level causes disease. Treatment: restore Agni at the affected level.', clinicalRelevance: 'Three-level Agni understanding enables precise metabolic disorder treatment.' },
    { title: 'Srotas (Channel) Theory', content: '16 Srotas transport substances throughout the body. Each has a root (Mula) and opening (Mukha). Disease occurs when Srotas are blocked (Sanga), overflow (Atipravritti), or misdirected (Vimarga Gamana). Treatment: unblock (Srotoshodhana), normalize flow, redirect. Srotas-based diagnosis enables targeted treatment.', clinicalRelevance: 'Srotas theory provides the anatomical framework for disease localization and treatment.' },
    { title: 'Dhatu (Tissue) Formation', content: 'Seven Dhatus form sequentially from Rasa (plasma) to Shukra (reproductive tissue). Each Dhatu has a nutritional essence (Sara) and waste product (Mala). Time for formation: Rasa 5 days, Rakta 5 days, Mamsa 10 days, Meda 10 days, Asthi 15 days, Majja 20 days, Shukra 25 days. Dhatu Kshaya (depletion) or Vriddhi (excess) causes disease.', clinicalRelevance: 'Understanding Dhatu formation sequence guides tissue-level treatment and Rasayana therapy.' },
    { title: 'Mala (Waste Products)', content: 'Three primary Mala: Purisha (feces), Mutra (urine), Sweda (sweat). Each Dhatu also produces its own Mala. Mala accumulation causes disease. Mala Kshaya (depletion) also causes disease. Treatment: proper elimination through Shodhana, maintaining Mala balance. Modern parallel: metabolic waste management.', clinicalRelevance: 'Mala assessment provides insight into metabolic health and guides detoxification.' },
    { title: 'Ojas (Vital Essence)', content: 'Ojas is the essence of all seven Dhatus - the final product of tissue metabolism. Two types: Para Ojas (supreme, 8 drops in heart) and Apara Ojas (general, distributed). Strong Ojas: immunity, vitality, mental clarity, disease resistance. Weak Ojas: disease susceptibility, fatigue, mental fog. Building: Rasayana, proper diet, sleep, meditation.', clinicalRelevance: 'Ojas is the ultimate indicator of health and target of Rasayana therapy.' },
    { title: 'Prakriti Assessment Methods', content: 'Assessment: Ashtavidha Pariksha (8-fold), Dashavidha Pariksha (10-fold), Prashna Pariksha (questioning), Darshana (inspection), Sparshana (palpation). Physical signs: body frame, skin quality, hair, nails, eyes, appetite, sleep pattern. Mental signs: temperament, memory, decision-making, stress response. Prakriti is fixed; Vikriti changes.', clinicalRelevance: 'Accurate Prakriti assessment enables personalized treatment and prevention.' },
    { title: 'Vikriti (Imbalance) Assessment', content: 'Vikriti: deviation from Prakriti. Assessment through: current symptoms, Dosha aggravation signs, Dhatu status, Srotas condition, Agni function, Mala quality. Compare with Prakriti baseline. Vikriti assessment guides treatment: treat the deviation, not the constitution. Regular Vikriti monitoring enables early intervention.', clinicalRelevance: 'Vikriti assessment is the basis for disease diagnosis and treatment planning.' },
  ],
  2: [
    { title: 'Vamana Herbs Detail', content: 'Primary: Madanaphala (best emetic), Jimutaka, Ikshvaku, Kutaja. Secondary: Vacha, Yastimadhu, Pippali. Vehicle: honey + rock salt for Kapha. Yastimadhu Kwatha as drink. Dose: Madanaphala Kalka 3-5g with honey. Signs of proper Vamana: Kapha eliminated first, then Pitta. Stop when Pitta appears.', clinicalRelevance: 'Proper herb selection and dosing ensures effective Vamana without complications.' },
    { title: 'Virechana Herbs Detail', content: 'Primary: Trivrit (best purgative), Danti, Saptala, Shankhini. Secondary: Draksha, Amalaki, Haritaki. Vehicle: warm milk, warm water, honey. Dose: Trivrit Kalka 5-10g. Signs: Pitta-colored stool, 4-8 purges. Stop when Pitta appears. Contraindications: pregnancy, severe debility, active bleeding.', clinicalRelevance: 'Proper herb selection ensures effective Virechana for Pitta disorders.' },
    { title: 'Basti Herbs Detail', content: 'Niruha: Dashamula Kwatha + honey + rock salt + oil. Anuvasana: sesame oil, ghee, or medicated oils. Matra Basti: 60ml daily for maintenance. Karma Basti: 30-day course (15 Niruha + 15 Anuvasana). Kala Basti: 16-day course (8+8). Uttara Basti: through urethra/vagina for reproductive disorders.', clinicalRelevance: 'Basti is the most versatile Panchakarma procedure with multiple formulations.' },
    { title: 'Nasya Herbs Detail', content: 'Virechana Nasya: Pippali, Vacha, Apamarga seeds. Brimhana Nasya: Bala, Ashwagandha oils. Shamana Nasya: Anu Taila, Shadbindu Taila. Dose: 4-8 drops each nostril. Position: head low. Time: morning after Shiro Abhyanga. Duration: 7-21 days. Contraindications: acute fever, pregnancy, after eating.', clinicalRelevance: 'Nasya is the primary treatment for all head and neck diseases.' },
    { title: 'Poorvakarma Importance', content: 'Snehana + Swedana are essential Poorvakarma. Without Snehana: Vata aggravation during Shodhana. Without Swedana: incomplete Dosha mobilization. Together: liquefy Ama, mobilize Dosha, open Srotas. Duration: 3-7 days Snehana + 3 days Swedana. Signs of proper preparation: soft stool, lightness, improved appetite.', clinicalRelevance: 'Skipping Poorvakarma is the most common cause of Panchakarma failure.' },
    { title: 'Paschat Karma Importance', content: 'Samsarjana Krama: graduated diet after Shodhana. Purpose: restore Agni, prevent Ama formation. Without Samsarjana: Agni disturbance, disease recurrence. Duration: 7 days minimum. Rasayana: after Samsarjana for long-term tissue rebuilding. Lifestyle modification: ongoing dietary and behavioral changes.', clinicalRelevance: 'Paschat Karma is as important as the Shodhana procedure itself.' },
  ],
  3: [
    { title: 'Herbs for External Use', content: 'Anti-Kushtha: Khadira, Nimba, Haridra, Daruharidra. Anti-inflammatory: Guggulu, Shallaki, Nirgundi. Wound healing: Aloe vera, Jatyadi, Durva. Cooling: Chandana, Ushira, Sariva. Warming: Dashamula, Eranda, Nirgundi. Selection based on disease Dosha and condition.', clinicalRelevance: 'Proper herb selection for external use maximizes therapeutic benefit.' },
    { title: 'Lepa Preparation Methods', content: 'Paste preparation: grind herbs with liquid (water, gopitta, kanji, buttermilk). Consistency: thick enough to stay on skin, thin enough to spread. Temperature: cold for Pitta, warm for Vata-Kapha. Application: thick layer (1-2 cm), extend beyond affected area. Cover: with cloth for Pradeha. Remove: when dry or after prescribed time.', clinicalRelevance: 'Proper Lepa preparation ensures effective drug delivery and therapeutic benefit.' },
    { title: 'External Treatment Monitoring', content: 'Monitor: skin color, temperature, texture, tenderness, swelling. Signs of improvement: reduced redness, reduced swelling, improved texture. Signs of worsening: increased redness, new blisters, increased pain. Adjust: change herbs, frequency, or method based on response. Document: before and after, treatment details.', clinicalRelevance: 'Monitoring external treatment response prevents adverse effects and guides adjustment.' },
  ],
  4: [
    { title: 'Virechana Karma (Procedure)', content: 'Day before: light food with Sneha. Morning: empty stomach. Give Virechana drug. Monitor: stool color, quantity, frequency. Expected: 4-8 purges, Pitta-colored stool. Stop: when Pitta appears. Post: rest, warm water sips. Next day: Samsarjana begins. Assessment: count purges, stool quality, patient comfort.', clinicalRelevance: 'Following complete Virechana Karma protocol ensures effective Pitta elimination.' },
    { title: 'Virechana Assessment', content: 'Samyak (proper): 4-8 purges, Pitta stool, lightness, Agni improvement, symptom relief. Ayoga (insufficient): less than 4 purges, dark stool, no relief. Atiyoga (excessive): more than 12 purges, watery stool, weakness. Management: Ayoga - repeat with higher dose. Atiyoga - stop, supportive care.', clinicalRelevance: 'Proper assessment of Virechana quality guides post-procedure management.' },
    { title: 'Virechana in Specific Conditions', content: 'Prameha: Trivrit + Guduchi for Pittaja Prameha. Kushtha: Virechana eliminates Pitta from Rakta. Kamala: direct Pitta elimination. Raktapitta: removes Pitta from blood. Jvara: for Pittaja Jvara after Ama clears. Each condition has specific Virechana approach.', clinicalRelevance: 'Condition-specific Virechana protocols enhance treatment outcomes.' },
  ],
  5: [
    { title: 'Seasonal Food Rules', content: 'Varsha (monsoon): warm, light, easily digestible - Agni weak. Sharad (autumn): cool, sweet, liquid - Pitta high. Hemanta (winter): heavy, sweet, unctuous - Agni strong. Vasanta (spring): light, bitter, pungent - Kapha accumulated. Grishma (summer): cool, liquid, sweet - Pitta high. Food should match seasonal Agni.', clinicalRelevance: 'Seasonal food selection prevents seasonal Dosha imbalance.' },
    { title: 'Food Quantity by Constitution', content: 'Vata: small frequent meals, warm, moist. Pitta: moderate meals, cool, sweet. Kapha: larger meals, light, warm, spicy. General rule: solid 1/3, liquid 1/3, empty 1/3. Adjust by: Agni strength, activity, season, age. Overeating: Ama, obesity. Undereating: Vata, weakness.', clinicalRelevance: 'Constitutional food quantity prevents both over and under-nourishment.' },
    { title: 'Exercise Guidelines', content: 'Amount: 50% capacity (Ardha Shakti). Best time: morning after Abhyanga. Types: walking, yoga, swimming, sports. Signs of proper: lightness, stable breathing, increased appetite, sweat at axillae and forehead. Over-exercise: dryness, fatigue, Vata aggravation. Under-exercise: heaviness, Kapha accumulation.', clinicalRelevance: 'Proper exercise prescription prevents exercise-related Dosha imbalance.' },
  ],
  6: [
    { title: 'Urge Suppression Consequences', content: 'Each urge suppression has specific consequences: flatus (Udavarta, abdominal pain), defecation (Udavarta, headache), urination (Mutra Krichrata, urinary disorders), hunger (Kshudha Nasha, Agni decrease), thirst (Trishna, Agni decrease), tears (Shiroruja, eye diseases), sleep (Tandra, mental fog), sneezing (Pratishyaya, sinusitis).', clinicalRelevance: 'Knowledge of specific consequences motivates patients to respond to urges.' },
    { title: 'Udavarta Treatment', content: 'Udavarta from urge suppression: symptoms include abdominal distension, pain, constipation, headache. Treatment: Vatanulomana herbs (Hingvastak Churna, Trikatu), warm oil abdominal massage, Basti with Dashamula oil, proper urge response education. Prevention: respond to urges promptly, regular routine.', clinicalRelevance: 'Udavarta is the most common consequence of urge suppression in modern life.' },
    { title: 'Urge Education', content: 'Patient education on urge response: explain the 13 natural urges and consequences of suppression. Teach: proper timing, response techniques, when suppression is acceptable. Workplace: regular breaks, bathroom access. School: flexible bathroom policies. Home: regular meal and sleep times.', clinicalRelevance: 'Urge education prevents chronic urge suppression diseases.' },
  ],
  7: [
    { title: 'Sensory Disease Prevention', content: 'Visual: proper lighting, screen breaks, Triphala eyewash. Auditory: volume limits, ear protection. Olfactory: avoid strong chemicals, Nasya. Gustatory: balanced taste, tongue scraping. Tactile: Abhyanga, comfortable clothing. Each sense has specific protection needs based on its Mahabhuta composition.', clinicalRelevance: 'Systematic sensory hygiene prevents sense organ diseases.' },
    { title: 'Sensory Assessment', content: 'Test each sense: visual acuity, hearing, smell, taste, touch. Note: abnormalities, asymmetry, progression. Correlate with Dosha: Vata - hearing, touch. Pitta - vision, taste. Kapha - smell, taste. Assessment guides treatment: organ-specific therapy for specific deficits.', clinicalRelevance: 'Sensory assessment provides diagnostic information about Dosha status.' },
    { title: 'Medhya Rasayana Details', content: 'Brahmi (Bacopa): enhances all senses, improves memory. Shankhapushpi: calms mind, improves clarity. Mandukaparni: enhances cognitive function. Yashtimadhu: protects eyes and throat. Preparation: powder, tablet, Ghrita. Duration: 45-90 days. Benefits: enhanced perception, improved memory, mental clarity.', clinicalRelevance: 'Medhya Rasayana enhances sensory perception and prevents cognitive decline.' },
  ],
  8: [
    { title: 'Physician Qualities Detail', content: 'Shruta: theoretical knowledge from texts and teachers. Drushtakarma: practical experience from clinical practice. Daksha: dexterity and skill in procedures. Shuchi: purity of body, mind, and conduct. All four are necessary for successful practice. Without Shruta: no foundation. Without Drushtakarma: no practical wisdom. Without Daksha: no effective treatment. Without Shuchi: no patient trust.', clinicalRelevance: 'All four physician qualities are essential for successful practice.' },
    { title: 'Patient Qualities Detail', content: 'Good patient qualities: truthful reporting, compliance with treatment, trust in physician, adequate financial resources, family support, strong will to recover. Poor patient: dishonest, non-compliant, distrustful, financially limited, isolated, resigned. Improving patient qualities: education, counseling, family involvement.', clinicalRelevance: 'Patient qualities significantly affect treatment outcomes.' },
    { title: 'Attendant Qualities Detail', content: 'Good attendant: knowledge of procedures, dexterity, loyalty, cleanliness, compassion, physical strength. Poor attendant: ignorant, clumsy, disloyal, unclean, indifferent, weak. Training: procedure knowledge, patient care, emergency response. Attendant quality directly affects treatment safety and effectiveness.', clinicalRelevance: 'Attendant training is essential for safe and effective treatment delivery.' },
  ],
  9: [
    { title: 'Prognosis Categories', content: 'Sadhya (curable): recent, single Dosha, strong patient, favorable factors. Krichrasadhya (difficult): chronic, dual Dosha, moderate patient. Yapya (manageable): can be controlled but not cured. Asadhya (incurable): very chronic, Sannipataja, weak patient, unfavorable factors. Assessment guides treatment planning.', clinicalRelevance: 'Prognosis assessment prevents futile treatment and guides realistic expectations.' },
    { title: 'Treatment Goals', content: 'Primary: cure disease (Sadhya). Secondary: manage symptoms (Yapya). Tertiary: improve quality of life (Asadhya). Goals must be realistic and communicated to patient. Unrealistic expectations lead to disappointment and non-compliance. Goal setting: based on prognosis assessment and patient capacity.', clinicalRelevance: 'Realistic treatment goals improve patient satisfaction and compliance.' },
    { title: 'Treatment Failure Analysis', content: 'When treatment fails: (1) Reassess diagnosis - was it correct? (2) Check compliance - did patient follow instructions? (3) Verify medicine quality - was it potent? (4) Modify approach - change herbs, dose, route. (5) Consider referral - when beyond expertise. (6) Document - learn from failures.', clinicalRelevance: 'Systematic failure analysis prevents repeating the same mistakes.' },
  ],
  10: [
    { title: 'Purusharthas Detail', content: 'Dharma (virtue): righteous conduct, duty, ethics. Artha (wealth): financial security, resources. Kama (gratification): desires, pleasures, enjoyment. Moksha (liberation): spiritual freedom, self-realization. Health supports all four. Without health, none can be pursued effectively. Ayurveda provides the health foundation.', clinicalRelevance: 'Understanding Purusharthas motivates patients to prioritize health.' },
    { title: 'Life Stages and Health', content: 'Bala (childhood): Kapha dominant, growth focus, immunity building. Madhya (middle age): Pitta dominant, productivity focus, disease prevention. Vriddha (old age): Vata dominant, preservation focus, Rasayana. Each stage has specific health needs and disease susceptibilities.', clinicalRelevance: 'Life stage assessment enables age-appropriate health recommendations.' },
    { title: 'Death and Dying', content: 'Ayurvedic perspective on death: Atma is eternal, body is temporary. Death signs: sensory loss, breath cessation, consciousness loss. Terminal care: comfort measures, spiritual support, family presence. Dharma: maintain ethical conduct until end. Moksha: ultimate goal beyond death. Palliative care: comfort, dignity, spiritual support.', clinicalRelevance: 'Ayurvedic death and dying perspective guides compassionate end-of-life care.' },
  ],
};

// Disease descriptions for chapters 1-10
const diseases = {
  1: [
    { name: 'Vata Vyadhi (Vata Disorders)', sanskrit: 'वातव्याधि', etiology: 'Dry, cold, light foods, excessive travel, exercise, fasting, suppression of urges, grief, anxiety. Seasonal: Varsha Ritu.', symptoms: ['Sandhishoola (joint pain)', 'Gridhrasi (sciatica)', 'Pakshaghata (hemiplegia)', 'Anaha (abdominal distension)', 'Shiroshoola (headache)'], prognosis: 'Sadhya when Vata alone and recent. Yapya when chronic.', treatment: 'Snehana, Swedana, Basti, Vatahara diet, ghee, oil massage.' },
    { name: 'Pitta Vyadhi (Pitta Disorders)', sanskrit: 'पित्तव्याधि', etiology: 'Hot, spicy, sour, salty foods, anger, heat exposure, alcohol. Seasonal: Sharad Ritu.', symptoms: ['Daha (burning)', 'Trishna (excessive thirst)', 'Raktapitta (bleeding)', 'Kamala (jaundice)', 'Visarpa (herpes)'], prognosis: 'Generally Sadhya with Sheeta treatment.', treatment: 'Virechana, Sheeta Dravya, Tikta Rasa, ghee, sandalwood.' },
    { name: 'Kapha Vyadhi (Kapha Disorders)', sanskrit: 'कफव्याधि', etiology: 'Heavy, sweet, oily, cold foods, sedentary lifestyle, excessive sleep. Seasonal: Vasanta Ritu.', symptoms: ['Gaurava (heaviness)', 'Alasya (laziness)', 'Shwasa (dyspnea)', 'Kasa (cough)', 'Shotha (edema)'], prognosis: 'Sadhyasadhya when Kapha predominant.', treatment: 'Vamana, Laghu diet, Ruksha treatment, Ushna substances, Vyayama.' },
    { name: 'Jwara (Fever)', sanskrit: 'ज्वर', etiology: 'Agni disturbance causing Dosha vitiation. Vataja: dry/cold exposure. Pittaja: hot/spicy foods. Kaphaja: heavy/cold foods. Sannipataja: all combined.', symptoms: ['Santapa (temperature rise)', 'Angamarda (body ache)', 'Aruchi (anorexia)', 'Trishna (thirst)', 'Sweda (sweating)'], prognosis: 'Nava (acute): Sadhya. Jirna (chronic): Yapya. Sannipataja: Krichrasadhya.', treatment: 'Langhana first, then Shamana with Tikta Rasa herbs. Dosha-specific treatment.' },
    { name: 'Prameha (Diabetes)', sanskrit: 'प्रमेह', etiology: 'Kapha vitiation from sweet, heavy, oily foods, sedentary lifestyle. Progresses through Pitta to Vata.', symptoms: ['Prabhuta Mutra (excessive urination)', 'Avila Mutra (turbid urine)', 'Madhura Mutra (sweet urine)', 'Trishna (thirst)', 'Daha (burning)'], prognosis: 'Kaphaja: Sadhya. Pittaja: Krichrasadhya. Vataja: Yapya.', treatment: 'Kaphaja: Vamana + Laghu diet. Pittaja: Virechana. Vataaja: Shamana + Rasayana.' },
    { name: 'Kushtha (Skin Diseases)', sanskrit: 'कुष्ठ', etiology: 'Tridoshic vitiation with Rakta Dushti. Viruddha Ahara, excessive sour/salty/pungent.', symptoms: ['Twak Vikara (skin changes)', 'Kandu (itching)', 'Raga (redness)', 'Pidaka (eruptions)', 'Sphota (vesicles)'], prognosis: 'Kshudra: Sadhya. Mahakushtha: Yapya or Krichrasadhya.', treatment: 'Shodhana (Vamana/Virechana/Raktamokshana), Shamana (Khadira/Nimba/Haridra), External (Lepa).' },
  ],
  2: [
    { name: 'Shiroroga (Head Diseases)', sanskrit: 'शिरोरोग', etiology: 'Kapha vitiation in head from cold exposure, day sleep, heavy foods. Vata in chronic cases.', symptoms: ['Shirashoola (headache)', 'Pinasa (sinusitis)', 'Pratishyaya (rhinitis)', 'Ardita (facial paralysis)', 'Shirogaurava (heaviness)'], prognosis: 'Sadhya in acute with Nasya. Yapya in chronic.', treatment: 'Nasya with Apamarga/Pippali, Shiro Abhyanga, Shirodhara, Dhoomapana.' },
    { name: 'Vamya (Emetic Indications)', sanskrit: 'वम्य', etiology: 'Kapha accumulation from heavy, cold, sweet, oily foods, sedentary lifestyle.', symptoms: ['Kasa (cough)', 'Shwasa (dyspnea)', 'Hridya Pida (chest heaviness)', 'Aruchi (anorexia)', 'Praseka (excess salivation)'], prognosis: 'Sadhya with proper Vamana.', treatment: 'Vamana with Madanaphala + honey + Yastimadhu Kwatha. Follow with Samsarjana.' },
    { name: 'Pittaja Kushtha', sanskrit: 'पित्तजकुष्ठ', etiology: 'Pitta-Rakta vitiation from hot, spicy, sour foods, anger, heat exposure.', symptoms: ['Rakta Mandala (red patches)', 'Daha (burning)', 'Kandu (itching)', 'Raga (redness)', 'Sphota (vesicles)'], prognosis: 'Sadhya with Virechana + Sheeta treatment.', treatment: 'Virechana with Trivrit. External: cold Lepa with Chandana, Ushira.' },
    { name: 'Vataja Gridhrasi (Sciatica)', sanskrit: 'वातजगृध्रसी', etiology: 'Vata vitiation from cold, dry foods, excessive exercise, suppression of urges.', symptoms: ['Radiating pain from hip to foot', 'Stiffness', 'Tingling', 'Numbness', 'Difficulty walking'], prognosis: 'Sadhya in recent. Krichrasadhya in chronic.', treatment: 'Basti with Dashamula oil. Snehana-Swedana. Internal: Ashwagandha, Bala, Guggulu.' },
  ],
  3: [
    { name: 'Ekakushtha (Psoriasis)', sanskrit: 'एककुष्ठ', etiology: 'Tridoshic with Vata-Kapha predominant. Viruddha Ahara, stress, genetic.', symptoms: ['Silvery scales', 'Itching', 'Red patches', 'Dry skin', 'Joint pain in some cases'], prognosis: 'Yapya - can be managed but not fully cured.', treatment: 'Virechana for Pitta-Rakta. External: Churnapradeha with Khadira, Nimba. Internal: Khadira Kwatha.' },
    { name: 'Vatarakta (Gouty Arthritis)', sanskrit: 'वातरक्त', etiology: 'Combined Vata and Rakta vitiation. Incompatible foods, trauma.', symptoms: ['Joint pain', 'Swelling', 'Red patches', 'Touch sensitivity', 'Burning in joints'], prognosis: 'Sadhya in acute. Yapya in chronic.', treatment: 'Cold Pradeha with Bala, Madhuka. Internal: Guduchi, Manjistha, Sariva.' },
    { name: 'Dadru (Tinea/Ringworm)', sanskrit: 'दद्रु', etiology: 'Kapha-Pitta with Rakta. Fungal infection aggravated by moisture.', symptoms: ['Ring-shaped lesions', 'Itching', 'Red borders', 'Central clearing', 'Scaling'], prognosis: 'Sadhya with external treatment.', treatment: 'Churnapradeha with Haridra, Nimba. Internal: Khadira Kwatha.' },
  ],
  4: [
    { name: 'Raktaja Atisara (Bloody Diarrhea)', sanskrit: 'रक्तजअतिसार', etiology: 'Pitta-Rakta vitiation from hot, spicy foods, alcohol, anger.', symptoms: ['Bloody stools', 'Burning in rectum', 'Thirst', 'Fever', 'Abdominal pain'], prognosis: 'Sadhya with Virechana and Rakta-Pitta Shamana.', treatment: 'Virechana with Trivrit. Internal: Nagakeshara, Dhataki, Lodhra.' },
    { name: 'Pittaja Grahani (IBS-Pitta type)', sanskrit: 'पित्तजग्रहणी', etiology: 'Pitta vitiation from hot, spicy, sour foods, irregular eating.', symptoms: ['Loose stools', 'Burning in abdomen', 'Thirst', 'Anorexia', 'Sour eructation'], prognosis: 'Sadhya with Virechana and dietary modification.', treatment: 'Virechana with Trivrit. Internal: Kutaja, Bilva, Musta.' },
  ],
  5: [
    { name: 'Ajirna (Indigestion)', sanskrit: 'अजीर्ण', etiology: 'Excess food, eating before digestion, heavy foods with weak Agni.', symptoms: ['Agnimandya (weak digestion)', 'Adhmana (distension)', 'Vibandha (constipation)', 'Aruchi (anorexia)', 'Gaurava (heaviness)'], prognosis: 'Sadhya with Langhana, Deepana, Pachana.', treatment: 'Langhana (fasting), Deepana-Pachana herbs, light diet.' },
    { name: 'Tamaka Shwasa (Bronchial Asthma)', sanskrit: 'तमकश्वास', etiology: 'Kapha-Vata vitiation in Pranavaha Srotas. Cold exposure, allergies.', symptoms: ['Wheezing', 'Difficulty breathing', 'Cough', 'Chest tightness', 'Anxiety'], prognosis: 'Sadhya in acute. Yapya in chronic.', treatment: 'Vamana for Kapha. Shamana: Vasa, Pushkarmool, Shunthi, Pippali, Honey.' },
  ],
  6: [
    { name: 'Anaha (Abdominal Distension)', sanskrit: 'अनाह', etiology: 'Vata vitiation from urge suppression, constipation, cold foods.', symptoms: ['Abdominal distension', 'Pain', 'Constipation', 'Difficulty passing flatus', 'Borborygmi'], prognosis: 'Sadhya with Vatanulomana.', treatment: 'Hingvastak Churna, warm oil massage, Basti with Dashamula oil.' },
    { name: 'Pleeha (Splenomegaly)', sanskrit: 'प्लीहा', etiology: 'Vata-Kapha vitiation from heavy foods, sedentary lifestyle.', symptoms: ['Left upper abdominal pain', 'Distension', 'Anorexia', 'Weakness', 'Anemia'], prognosis: 'Sadhya in early. Yapya in chronic.', treatment: 'Deepana-Pachana, Basti, internal: Chitraka, Pippali, Shunthi.' },
  ],
  7: [
    { name: 'Netra Roga (Eye Diseases)', sanskrit: 'नेत्ररोग', etiology: 'Pitta vitiation from excessive visual stimulation, heat, spicy foods.', symptoms: ['Timira (dimness)', 'Raktanetra (red eyes)', 'Daha (burning)', 'Shoola (pain)', 'Ashru (tearing)'], prognosis: 'Sadhya in early stages. Krichrasadhya when chronic.', treatment: 'Triphala eyewash, Nasya with Anu Taila, internal Triphala Ghrita.' },
    { name: 'Karnashoola (Earache)', sanskrit: 'कर्णशूल', etiology: 'Vata vitiation from cold exposure, loud noise, suppression of urges.', symptoms: ['Ear pain', 'Reduced hearing', 'Tinnitus', 'Headache', 'Discharge in some cases'], prognosis: 'Sadhya with Karna Purna and Vata Shamana.', treatment: 'Karna Purna with Bilva Taila. Internal: Ashwagandha, Bala.' },
  ],
  8: [
    { name: 'Jwara (Fever) - Clinical Assessment', sanskrit: 'ज्वर', etiology: 'Agni disturbance causing Dosha vitiation at tissue level.', symptoms: ['Temperature elevation', 'Body ache', 'Anorexia', 'Fatigue', 'Dosha-specific symptoms'], prognosis: 'Sadhya in acute. Krichrasadhya in chronic Sannipataja.', treatment: 'Langhana first, then Dosha-specific Shamana. Assessment guides treatment.' },
  ],
  9: [
    { name: 'Sadhya-Asadhya Assessment', sanskrit: 'साध्यासाध्य', etiology: 'Assessment of disease curability based on multiple factors.', symptoms: ['Disease duration', 'Dosha involvement', 'Patient strength', 'Season', 'Age'], prognosis: 'Sadhya/Krichrasadhya/Yapya/Asadhya based on assessment.', treatment: 'Sadhya: active treatment. Krichrasadhya: intensive treatment. Yapya: management. Asadhya: palliative.' },
  ],
  10: [
    { name: 'Oja Kshaya (Vital Essence Depletion)', sanskrit: 'ओजक्षय', etiology: 'Chronic disease, overwork, poor nutrition, stress, excessive Shodhana.', symptoms: ['Weakness', 'Disease susceptibility', 'Mental fog', 'Premature aging', 'Low immunity'], prognosis: 'Krichrasadhya - requires long-term Rasayana.', treatment: 'Rasayana: Ashwagandha, Shatavari, Bala. Diet: ghee, milk, almonds. Rest and meditation.' },
  ],
};

// Treatment protocols for chapters 1-10
const protocols = {
  1: [
    { condition: 'Vata Prakopa', treatment: 'Snehana + Swedana + Basti', herbs: ['Ashwagandha', 'Bala', 'Eranda', 'Shunthi', 'Ghee', 'Sesame oil'], dosage: 'Snehapana: 3-7 days. Basti: 600-900ml Niruha', duration: '8-30 days', precautions: ['Assess Agni first', 'Contraindicated in Ama'] },
    { condition: 'Pitta Prakopa', treatment: 'Virechana preceded by Snehapana', herbs: ['Trivrit', 'Amalaki', 'Draksha', 'Guduchi', 'Ghee'], dosage: 'Snehapana: 3-5 days. Virechana based on Koshtha', duration: '1 day + 7 days Samsarjana', precautions: ['Avoid in pregnancy', 'Monitor purgation'] },
    { condition: 'Kapha Prakopa', treatment: 'Vamana preceded by oleation', herbs: ['Madanaphala', 'Jimutaka', 'Yastimadhu', 'Vacha', 'Honey'], dosage: 'Madanaphala kalka 3-5g with honey', duration: '1 day + 7 days Samsarjana', precautions: ['Contraindicated in Pitta-predominant'] },
  ],
  2: [
    { condition: 'Nasya for Kaphaja Shiroroga', treatment: 'Shirovirechana with Apamarga seeds or Pippali powder', herbs: ['Apamarga', 'Pippali', 'Maricha', 'Vidanga'], dosage: '2-3 drops each nostril, 2-3 times daily', duration: '7-14 days', precautions: ['Not in Pitta-predominant head diseases', 'Not in pregnancy'] },
    { condition: 'Vamana for Kaphaja Kasa', treatment: 'Vamana with Madanaphala followed by Samsarjana', herbs: ['Madanaphala', 'Yastimadhu', 'Vacha', 'Honey'], dosage: 'Madanaphala kalka 3-5g with honey', duration: '1 day + 7 days Samsarjana', precautions: ['Previous night: Kapha-aggravating food'] },
    { condition: 'Basti for Vataja Gridhrasi', treatment: 'Niruha and Anuvasana alternating', herbs: ['Dashamula', 'Eranda', 'Bala', 'Sesame oil', 'Honey'], dosage: 'Niruha: 600-900ml. Anuvasana: 60-90ml', duration: 'Kala Basti: 16 days. Karma Basti: 30 days', precautions: ['Preceded by Snehana-Swedana'] },
  ],
  3: [
    { condition: 'Ekakushtha', treatment: 'Combined internal Shodhana and external Churnapradeha', herbs: ['Khadira', 'Nimba', 'Haridra', 'Daruharidra', 'Guduchi'], dosage: 'External: 2-3 times daily. Internal: Khadira Kwatha 40ml twice daily', duration: '28-42 days', precautions: ['Internal Shodana before external', 'Avoid Viruddha Ahara'] },
    { condition: 'Vatarakta', treatment: 'Cold Pradeha + Rakta-Shodhana', herbs: ['Bala', 'Madhuka', 'Vidari', 'Shatavari', 'Ghee'], dosage: 'External: cold Pradeha 1-2 hours daily', duration: '14-28 days', precautions: ['Use only cold applications', 'Elevate affected joints'] },
    { condition: 'Sthaulya', treatment: 'Udvartana + Kapha-Meda Shamana', herbs: ['Triphala', 'Trikatu', 'Musta', 'Haridra', 'Honey'], dosage: 'Udvartana: 30-45 minutes daily', duration: '28-42 days', precautions: ['Avoid in Pitta skin conditions', 'Warm bath after'] },
  ],
  4: [
    { condition: 'Pittaja Atisara', treatment: 'Virechana with Trivrit + Rakta-Pitta Shamana', herbs: ['Trivrit', 'Nagakeshara', 'Dhataki', 'Lodhra', 'Ghee'], dosage: 'Trivrit kalka 5-10g with warm milk', duration: '1 day + 7 days Samsarjana', precautions: ['Assess Koshtha', 'Monitor stool quality'] },
    { condition: 'Pittaja Grahani', treatment: 'Virechana + Deepana-Pachana', herbs: ['Trivrit', 'Kutaja', 'Bilva', 'Musta', 'Ghee'], dosage: 'Virechana single day + Shamana 28 days', duration: '28-42 days total', precautions: ['Dietary modification essential'] },
  ],
  5: [
    { condition: 'Ajirna', treatment: 'Langhana + Deepana-Pachana', herbs: ['Trikatu', 'Chitraka', 'Hingvastak', 'Buttermilk'], dosage: 'Hingvastak Churna 3g with buttermilk', duration: '3-7 days', precautions: ['Assess Agni type', 'Light diet until digestion improves'] },
    { condition: 'Tamaka Shwasa', treatment: 'Vamana + Shamana', herbs: ['Madanaphala', 'Vasa', 'Pushkarmool', 'Shunthi', 'Pippali', 'Honey'], dosage: 'Vamana single day + Shamana 28 days', duration: '28-42 days', precautions: ['Avoid cold exposure', 'Pranayama daily'] },
  ],
  6: [
    { condition: 'Anaha', treatment: 'Vatanulomana + Basti', herbs: ['Hingvastak', 'Trikatu', 'Dashamula', 'Sesame oil'], dosage: 'Hingvastak 3g + warm water. Basti with Dashamula oil', duration: '7-14 days', precautions: ['Respond to urges', 'Regular routine'] },
    { condition: 'Pleeha', treatment: 'Deepana-Pachana + Basti', herbs: ['Chitraka', 'Pippali', 'Shunthi', 'Dashamula', 'Sesame oil'], dosage: 'Internal herbs + Basti alternate days', duration: '28-42 days', precautions: ['Light diet', 'Avoid heavy foods'] },
  ],
  7: [
    { condition: 'Netra Roga', treatment: 'Triphala eyewash + Nasya + Internal Ghrita', herbs: ['Triphala', 'Anu Taila', 'Triphala Ghrita'], dosage: 'Eyewash daily. Nasya 3 times/week. Ghrita 10ml daily', duration: '28-42 days', precautions: ['Reduce screen time', 'Adequate sleep'] },
    { condition: 'Karnashoola', treatment: 'Karna Purna + Vata Shamana', herbs: ['Bilva Taila', 'Ashwagandha', 'Bala', 'Dashamula'], dosage: 'Karna Purna 10-15 min each ear daily', duration: '7-14 days', precautions: ['Avoid cold exposure', 'Ear protection'] },
  ],
  8: [
    { condition: 'Jwara Assessment', treatment: 'Assess Dosha type and stage, then treat accordingly', herbs: ['Tikta Rasa herbs', 'Langhana herbs', 'Deepana herbs'], dosage: 'Based on Dosha and Agni assessment', duration: '7-14 days for acute', precautions: ['Assess Ama status', 'Monitor temperature'] },
  ],
  9: [
    { condition: 'Prognosis Assessment', treatment: 'Systematic assessment of Sadhya-Asadhya factors', herbs: ['Based on disease and Dosha'], dosage: 'Treatment based on prognosis', duration: 'Based on prognosis category', precautions: ['Communicate prognosis to patient', 'Adjust expectations'] },
  ],
  10: [
    { condition: 'Oja Kshaya', treatment: 'Rasayana therapy + lifestyle modification', herbs: ['Ashwagandha', 'Shatavari', 'Bala', 'Ghee', 'Milk', 'Almonds'], dosage: 'Ashwagandha 3g + warm milk daily', duration: '90-180 days', precautions: ['Adequate rest', 'Proper nutrition', 'Stress management'] },
  ],
};

let content = fs.readFileSync(filePath, 'utf8');
const originalLines = content.split('\n').length;

for (let chNum = 1; chNum <= 30; chNum++) {
  const chapterPattern = `chapterNumber: ${chNum},`;
  const chapterIndex = content.indexOf(chapterPattern);
  if (chapterIndex === -1) continue;

  const nextChapterPattern = `chapterNumber: ${chNum + 1},`;
  const nextChapterIndex = content.indexOf(nextChapterPattern, chapterIndex);
  const searchEnd = nextChapterIndex !== -1 ? nextChapterIndex : content.length;

  // Add topics before diseaseDescriptions
  if (topics2[chNum]) {
    const ddIndex = content.indexOf('diseaseDescriptions:', chapterIndex);
    if (ddIndex !== -1 && ddIndex < searchEnd) {
      const beforeDD = content.substring(chapterIndex, ddIndex);
      const lastBracket = beforeDD.lastIndexOf('],');
      if (lastBracket !== -1) {
        const insertPoint = chapterIndex + lastBracket;
        const lines = topics2[chNum].map(t => topic(t)).join('\n');
        content = content.substring(0, insertPoint) + lines + '\n' + content.substring(insertPoint);
      }
    }
  }

  // Add disease descriptions before treatmentProtocols
  if (diseases[chNum]) {
    const tpIndex = content.indexOf('treatmentProtocols:', chapterIndex);
    if (tpIndex !== -1 && tpIndex < searchEnd) {
      const beforeTP = content.substring(chapterIndex, tpIndex);
      const lastBracket = beforeTP.lastIndexOf('],');
      if (lastBracket !== -1) {
        const insertPoint = chapterIndex + lastBracket;
        const lines = diseases[chNum].map(d => disease(d)).join('\n');
        content = content.substring(0, insertPoint) + lines + '\n' + content.substring(insertPoint);
      }
    }
  }

  // Add treatment protocols before importantVerses
  if (protocols[chNum]) {
    const ivIndex = content.indexOf('importantVerses:', chapterIndex);
    if (ivIndex !== -1 && ivIndex < searchEnd) {
      const beforeIV = content.substring(chapterIndex, ivIndex);
      const lastBracket = beforeIV.lastIndexOf('],');
      if (lastBracket !== -1) {
        const insertPoint = chapterIndex + lastBracket;
        const lines = protocols[chNum].map(p => protocol(p)).join('\n');
        content = content.substring(0, insertPoint) + lines + '\n' + content.substring(insertPoint);
      }
    }
  }
}

fs.writeFileSync(filePath, content, 'utf8');
const newLines = content.split('\n').length;
console.log(`Lines: ${originalLines} -> ${newLines} (+${newLines - originalLines})`);
