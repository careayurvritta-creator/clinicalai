const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'ayurknowledge', 'charak', 'sutra-sthana.ts');

// Helper to generate a topic entry line
function topic(t) {
  return `      { title: ${JSON.stringify(t.title)}, content: ${JSON.stringify(t.content)}, clinicalRelevance: ${JSON.stringify(t.clinicalRelevance)} },`;
}

// Helper to generate a shloka entry line
function shloka(s) {
  return `      { number: ${JSON.stringify(s.number)}, sanskrit: ${JSON.stringify(s.sanskrit)}, translation: ${JSON.stringify(s.translation)}, commentary: ${JSON.stringify(s.commentary)} },`;
}

// Additional topics per chapter
const topics = {
  1: [
    { title: 'Swastha Definition', content: 'Swastha (healthy) is one who has balanced Dosha, Agni, Dhatu, and Mala, and whose Atma, Indriya, and Mana are in pleasantness. This holistic definition encompasses physical, mental, and spiritual health beyond mere absence of disease.', clinicalRelevance: 'Complete health assessment must evaluate physical, mental, and spiritual dimensions.' },
    { title: 'Ayurveda as Upaveda', content: 'Ayurveda is considered Upaveda of Atharvaveda. It integrates spiritual knowledge with practical medicine. The eight branches (Ashtanga Ayurveda) cover: Kaya Chikitsa (internal medicine), Bala Chikitsa (pediatrics), Graha Chikitsa (psychiatry), Urdhvanga Chikitsa (ENT), Shalya Chikitsa (surgery), Damstra Chikitsa (toxicology), Jara Chikitsa (geriatrics), Vrishya Chikitsa (aphrodisiacs).', clinicalRelevance: 'Understanding Ayurveda scope enables comprehensive patient care across all medical specialties.' },
    { title: 'Hetu-Linga-Aushadha Framework', content: 'Trisutra: Hetu (cause), Linga (symptoms), Aushadha (medicine). This three-fold framework applies to every clinical encounter. Hetu: identify root cause through Ashtavidha Pariksha. Linga: recognize disease manifestations through Nidana Panchaka. Aushadha: select treatment through Chikitsa Sutra. This systematic approach prevents empirical treatment.', clinicalRelevance: 'Trisutra framework is the most practical clinical reasoning tool in Ayurveda.' },
  ],
  2: [
    { title: 'Nasya Classification', content: 'Five types of Nasya: Virechana (purgative - clears Kapha from head), Brimhana (nourishing - strengthens tissues), Shamana (pacifying - calms Dosha), Pratimarsha (daily preventive - 2 drops), Marshya (therapeutic - 4-8 drops). Selection based on disease type, patient strength, and season.', clinicalRelevance: 'Nasya type selection determines treatment outcome - wrong type worsens condition.' },
    { title: 'Basti Classification', content: 'Niruha (Asthapana): decoction-based, eliminates Vata-Kapha, given on empty stomach. Anuvasana (Sneha Basti): oil-based, nourishes Vata, given after food. Matra Basti: small daily dose (60ml) for maintenance. Karma Basti: 30-day course. Kala Basti: 16-day course. Uttara Basti: through urethra/vagina.', clinicalRelevance: 'Basti classification enables precise enema therapy for different conditions.' },
    { title: 'Raktamokshana Methods', content: 'Siravyadha (venepuncture): for large area bloodletting. Jalaukavacharana (leech therapy): for localized inflammation. Pracchana (scarification): for skin conditions. Shrungavacharana (horn): for children. Alabu (gourd): for large area. Selection based on disease location, patient age, and Dosha involvement.', clinicalRelevance: 'Raktamokshana method selection based on disease presentation ensures optimal outcomes.' },
  ],
  3: [
    { title: 'Churnapradeha (Powder Poultice)', content: 'Fine powder of herbs mixed with liquid (Gopitta, Kanji, buttermilk) applied as thick paste. Duration: until dry, 30-45 minutes. For Pitta-Rakta conditions: use cold liquids. For Vata-Kapha: use warm liquids. Herbs: anti-Kushtha drugs - Khadira, Nimba, Haridra. Benefits: direct drug delivery, cooling/heating effect.', clinicalRelevance: 'Churnapradeha provides targeted external therapy for skin and joint conditions.' },
    { title: 'Udvartana (Dry Massage)', content: 'Upward-stroke massage with dry herbal powder. Direction: opposite to hair growth (upward). Duration: 30-45 minutes. Herbs: Triphala, Trikatu, Musta, Haridra. Benefits: Kapha-Meda reduction, skin exfoliation, weight management, cellulite reduction. Contraindications: Pitta skin conditions, broken skin, pregnancy.', clinicalRelevance: 'Udvartana is the primary external treatment for obesity and Kapha-Meda conditions.' },
    { title: 'Avachurnana (Dusting)', content: 'Fine herbal powder dusted over affected area. Herbs: Chandana (cooling), Haridra (anti-inflammatory), Kutaja (anti-diarrheal). For wounds: Ropana (healing) herbs. For skin: Shodhana (cleansing) herbs. Application: 2-3 times daily on clean, dry skin. Benefits: moisture absorption, antimicrobial action, wound healing.', clinicalRelevance: 'Avachurnana is simple, effective external therapy for wounds and skin conditions.' },
  ],
  4: [
    { title: 'Koshtha Assessment for Virechana', content: 'Krura Koshtha (hard): needs stronger purgatives, higher doses, 8-12 purges expected. Mrudu Koshtha (soft): needs milder purgatives, lower doses, 4-6 purges expected. Madhyama Koshtha: moderate dose, 6-8 purges expected. Assessment: observe bowel habits, stool consistency, previous purgation response.', clinicalRelevance: 'Koshtha assessment is critical for Virechana success - wrong dose causes under or over-purgation.' },
    { title: 'Virechana Drugs by Dosha', content: 'For Pitta: Trivrit (best), Amalaki, Draksha. For Pitta-Kapha: Danti, Saptala, Shankhini. For Vata-Pitta: Trivrit + Eranda. For Sannipata: combination approach. Vehicle selection: warm water (Pitta), warm milk (Vata-Pitta), honey (Kapha), buttermilk (Ama). Individualized prescription based on predominant Dosha.', clinicalRelevance: 'Dosha-specific Virechana drug selection enhances treatment effectiveness.' },
    { title: 'Virechana Success Indicators', content: 'Samyak Virechana: 4-8 purges, Pitta-colored stool, lightness in body, improved appetite, clarity of mind, symptom relief. Ayoga (insufficient): less than 4 purges, dark stool, no relief - repeat with higher dose. Atiyoga (excessive): more than 12 purges, watery stool, weakness - stop and provide supportive care.', clinicalRelevance: 'Monitoring Virechana quality ensures treatment effectiveness and patient safety.' },
  ],
  5: [
    { title: 'Dinacharya Timing', content: 'Brahma Muhurta (4:30-6 AM): wake up. 6-7 AM: evacuation, oral care. 7-8 AM: Abhyanga, exercise, bath. 8-9 AM: breakfast. 10 AM-2 PM: main meal (Pitta Kala). 2-6 PM: work. 6-7 PM: light dinner. 8-9 PM: relaxation. 10 PM: sleep. This timing aligns with natural circadian rhythms.', clinicalRelevance: 'Following Dinacharya timing prevents lifestyle diseases and optimizes health.' },
    { title: 'Food Quantity Guidelines', content: 'Proper quantity: solid food - fill stomach 1/3 full. Liquid - 1/3. Empty space - 1/3 for Agni to work. Total: 2 handfuls (Anjali) for most people. Adjust by: Agni strength (strong = more, weak = less), activity level (active = more, sedentary = less), season (winter = more, summer = less).', clinicalRelevance: 'Proper food quantity prevents both over and under-nourishment.' },
    { title: 'Abhyanga Benefits', content: 'Full body oil massage benefits: Vata pacification, skin nourishment, muscle relaxation, joint lubrication, improved circulation, better sleep, stress reduction, anti-aging, immunity support. Oils: sesame (Vata), coconut (Pitta), mustard (Kapha). Duration: 45-60 minutes. Frequency: daily for prevention, weekly for maintenance.', clinicalRelevance: 'Daily Abhyanga is the most accessible and effective Dinacharya practice.' },
  ],
  6: [
    { title: 'Urges by Dosha', content: 'Vata urges (3): flatus (Vata), defecation (Apana Vata), urination (Apana Vata). Pitta urges (2): hunger (Pachaka Pitta), thirst (Ranjaka Pitta). Kapha urges (2): tears (Tarpaka Kapha), sleep (Tarpaka Kapha). Tridoshic (2): sneezing (Prana Vata), yawning (Prana Vata). Mixed (4): breathlessness, shivering, vomiting, seminal urge.', clinicalRelevance: 'Classifying urges by Dosha helps predict diseases from suppression.' },
    { title: 'Udavarta Management', content: 'Udavarta (upward Vata movement) from urge suppression. Symptoms: abdominal distension, pain, constipation, headache. Treatment: Vatanulomana herbs (Hingvastak Churna, Trikatu), warm oil abdominal massage, Basti with Dashamula oil, proper urge response education. Prevention: respond to urges promptly, regular routine, adequate fiber.', clinicalRelevance: 'Udavarta is the most common consequence of urge suppression in modern life.' },
    { title: 'Modern Workplace Urge Suppression', content: 'Modern workplace: meetings suppress urination/defecation/flatus. Open offices suppress emotional expression. Deadline pressure suppresses hunger/thirst/sleep. Consequences: chronic Udavarta, urinary disorders, digestive issues, sleep disorders. Solutions: regular breaks, bathroom access, meal breaks, sleep hygiene, emotional support.', clinicalRelevance: 'Workplace health policies should address urge suppression as occupational health issue.' },
  ],
  7: [
    { title: 'Sense-Mahabhuta Connection', content: 'Chakshu (eyes) = Tejas (fire). Shrotra (ears) = Akasha (space). Ghrana (nose) = Prithvi (earth). Rasana (tongue) = Jala (water). Sparsha (skin) = Vayu (air). Each sense organ nourished by corresponding Mahabhuta through diet and lifestyle. Treatment: balance Mahabhuta through appropriate diet and herbs.', clinicalRelevance: 'Mahabhuta-Sense connection enables targeted dietary recommendations for sensory disorders.' },
    { title: 'Sattvavajaya Components', content: 'Five components: Jnana (knowledge of self), Vijnana (scientific understanding), Dhairya (patience), Smriti (memory/mindfulness), Samadhi (meditation). Application: anxiety (Dhairya + Smriti), depression (Jnana + Vijnana), insomnia (Smriti + Samadhi), anger (Dhairya + meditation). Modern parallels: CBT, mindfulness, meditation therapy.', clinicalRelevance: 'Sattvavajaya provides comprehensive psychological therapy framework.' },
    { title: 'Screen Time Management', content: 'Digital eye strain prevention: 20-20-20 rule (every 20 min, look 20 feet away for 20 sec). Triphala eyewash daily. Blue light filters. Proper lighting. Adequate distance. Regular breaks. Blinking exercises. Evening cutoff 1 hour before sleep. Annual eye check-up. Nasya with Anu Taila for head region health.', clinicalRelevance: 'Screen time management is essential for modern sensory health.' },
  ],
  8: [
    { title: 'Patient Compliance Factors', content: 'Factors affecting compliance: disease understanding, treatment belief, physician trust, cost accessibility, family support, treatment complexity, side effects. Improving compliance: clear explanation, written instructions, family involvement, simplified regimen, regular follow-up, positive reinforcement, addressing barriers.', clinicalRelevance: 'Patient compliance is the strongest predictor of treatment outcomes.' },
    { title: 'Quality Assurance', content: 'Systematic review of all four Chatushpada components: Bhishak - diagnostic accuracy, complication rate. Dravya - purity testing, potency verification. Upasthata - training hours, patient feedback. Rogi - compliance rate, self-management skills. Regular audits ensure continuous improvement and patient safety.', clinicalRelevance: 'Quality assurance prevents treatment failures and improves outcomes.' },
    { title: 'Chatushpada in Modern Healthcare', content: 'Bhishak = Attending physician. Upasthata = Nursing staff. Dravya = Pharmaceuticals/equipment. Rogi = Patient. Same principles apply: all four must be optimal for success. Team dynamics, communication, and quality assurance are universal healthcare principles.', clinicalRelevance: 'Ancient Chatushpada framework maps directly to modern healthcare team management.' },
  ],
  9: [
    { title: 'Treatment Modification', content: 'When treatment fails: (1) Reassess diagnosis. (2) Check patient compliance. (3) Verify medicine quality. (4) Modify approach - change herbs, dosage, route. (5) Consider referral. (6) Document learnings. Systematic modification prevents abandoning effective approaches prematurely.', clinicalRelevance: 'Systematic treatment modification prevents both premature abandonment and futile persistence.' },
    { title: 'Treatment Sequencing', content: 'Optimal sequence: (1) Langhana-Pachana (clear Ama). (2) Shodhana (eliminate Dosha). (3) Shamana (pacify residual). (4) Rasayana (rebuild tissues). (5) Lifestyle modification (prevent recurrence). Skipping steps leads to incomplete treatment and disease recurrence.', clinicalRelevance: 'Proper treatment sequencing maximizes effectiveness and prevents recurrence.' },
    { title: 'Multidisciplinary Care', content: 'Complex cases benefit from multidisciplinary team: Ayurvedic physician, modern physician, nutritionist, psychologist, physiotherapist, yoga therapist. Coordination: regular case conferences, shared treatment plan, clear communication. Integration: complementary approaches, not conflicting.', clinicalRelevance: 'Multidisciplinary care provides comprehensive treatment for complex chronic conditions.' },
  ],
  10: [
    { title: 'Ojas and Immunity', content: 'Ojas (vital essence) is the subtle essence of all seven Dhatus. Strong Ojas: immunity, vitality, mental clarity, disease resistance. Weak Ojas: disease susceptibility, fatigue, mental fog. Building Ojas: proper diet, adequate sleep, Rasayana herbs (Ashwagandha, Shatavari), meditation, positive relationships.', clinicalRelevance: 'Ojas assessment and building is the ultimate goal of Ayurvedic health maintenance.' },
    { title: 'Health Economics', content: 'Preventive health is more cost-effective than treatment. Dinacharya costs minimal time and resources. Rasayana prevents expensive chronic diseases. Panchakarma eliminates accumulated toxins before disease manifests. Economic argument: for every rupee spent on prevention, ten rupees saved on treatment.', clinicalRelevance: 'Health economics argument for prevention strengthens case for Ayurvedic preventive medicine.' },
    { title: 'Global Health and Ayurveda', content: 'Ayurveda addresses global health challenges: non-communicable diseases (lifestyle modification), mental health (Sattvavajaya), antimicrobial resistance (herbal alternatives), healthcare access (low-cost prevention), aging (Rasayana). WHO recognizes traditional medicine for universal health coverage.', clinicalRelevance: 'Ayurveda offers solutions to global health challenges through prevention and lifestyle medicine.' },
  ],
  11: [
    { title: 'Swastha Vritta', content: 'Swastha Vritta (preventive regimen) includes Dinacharya (daily routine), Ritucharya (seasonal regimen), Sadvritta (moral conduct), and Rasayana (rejuvenation). Dinacharya: waking early, oral hygiene, Abhyanga, exercise, bath, meditation. Ritucharya: seasonal diet adjustments. Sadvritta: ethical conduct, compassion, truthfulness.', clinicalRelevance: 'Preventive regimen is superior to curative medicine - health maintenance is more valuable than disease treatment.' },
    { title: 'Mental Health and Desires', content: 'Mental health is essential for desire fulfillment. Sattva Guna enables clear thinking. Rajas causes restlessness. Tamas causes inertia. Mental health maintenance: Sattvavajaya, meditation, proper diet, adequate sleep, positive environment. Mental illness prevents effective pursuit of all desires.', clinicalRelevance: 'Mental health assessment should be part of comprehensive health evaluation.' },
    { title: 'Patient Motivation', content: 'Connect health to patient life goals. Show how disease prevents achievement of desires. Celebrate health milestones. Involve family in health support. Use Rasayana for vitality and confidence. Motivated patients have better compliance and outcomes.', clinicalRelevance: 'Patient motivation through desire connection improves treatment compliance.' },
  ],
  12: [
    { title: 'Vata-Kapha in Chronic Disease', content: 'Chronic diseases often involve Vata and Kapha: Vata causes degeneration and pain, Kapha causes obstruction and swelling. Example: Sandhivata (osteoarthritis) - Vata causes joint degeneration, Kapha causes fluid changes. Treatment: Snehana for Vata, Swedana for Kapha, combined Panchakarma.', clinicalRelevance: 'Chronic disease management requires understanding Vata-Kapha interaction patterns.' },
    { title: 'Vata and Nervous System', content: 'Vata governs nervous system: Prana Vata controls autonomic functions, Udana Vata controls voluntary actions, Vyana Vata controls reflexes, Samana Vata controls enteric nervous system, Apana Vata controls pelvic nerves. Vata vitiation manifests as neurological symptoms.', clinicalRelevance: 'Vata framework provides comprehensive approach to neurological conditions.' },
    { title: 'Kapha and Immunity', content: 'Kapha provides immune defense: Avalambaka Kapha protects chest organs, Kledaka Kapha protects gastric mucosa, Bodhaka Kapha protects oral mucosa, Tarpaka Kapha protects brain, Shleshaka Kapha protects joints. Kapha vitiation causes immune dysfunction.', clinicalRelevance: 'Kapha assessment provides insight into immune function.' },
  ],
  13: [
    { title: 'Snehapana Protocol', content: 'Snehapana (internal oleation): Day 1: 25ml ghee. Day 2: 50ml. Day 3: 75ml. Day 4: 100ml. Continue until Samyak Snigdha signs appear. Duration: 3-7 days. Vehicle: warm water or milk. Time: early morning empty stomach. Monitor appetite, stool, skin daily.', clinicalRelevance: 'Proper Snehapana protocol ensures effective oleation without complications.' },
    { title: 'Abhyanga Technique', content: 'Full body massage with warm sesame oil. Head (5 min), face (2 min), ears (1 min), neck (2 min), shoulders (3 min), arms (5 min), chest (3 min), abdomen (5 min clockwise), back (5 min), legs (10 min). Total: 45-60 minutes. Pressure: moderate. Direction: circular on joints, long strokes on limbs.', clinicalRelevance: 'Proper Abhyanga technique maximizes therapeutic benefit.' },
    { title: 'Medicated Sneha Preparation', content: 'Siddha Ghrita/Taila: base Sneha processed with herb decoction and paste. Ratio: Sneha:Kashaya:Kalka = 4:2:1. Process: cook on low flame until water evaporates, filter. Examples: Brahmi Ghrita for memory, Mahanarayan Taila for Vata, Tikta Ghrita for skin diseases.', clinicalRelevance: 'Understanding medicated Sneha preparation enables custom formulation.' },
  ],
  14: [
    { title: 'Swedana Types', content: '13 types of Swedana: Sagnisveda (with fire): Sankara, Prastara, Nadi, Parisheka, Avagaha, Ashmaghna, Karshu, Bhupada, Kuti, Bhoopana. Niragnisveda (without fire): Vyayama, Atapa, Guru. Selection based on disease, patient strength, and affected area.', clinicalRelevance: 'Swedana type selection determines treatment effectiveness and safety.' },
    { title: 'Nadi Sweda (Tube Fomentation)', content: 'Steam delivered through tube to specific body part. Process: boil herbs in water, direct steam through tube to affected area. Duration: 10-15 minutes per area. Herbs: Dashamula, Nirgundi, Eranda. Benefits: localized treatment, joint-specific, safe for weak patients. Indicated in: joint pain, stiffness, localized Vata conditions.', clinicalRelevance: 'Nadi Sweda provides targeted fomentation for joint and musculoskeletal conditions.' },
    { title: 'Swedana Contraindications', content: 'Avoid Swedana in: Pitta conditions, bleeding disorders, diabetes (advanced), pregnancy, acute inflammation, skin infections, weak patients (excessive), children (excessive), elderly (excessive). Use only local Swedana for: Vata-Pitta conditions, moderate debility. Always assess patient strength before Swedana.', clinicalRelevance: 'Swedana contraindication awareness prevents complications.' },
  ],
  15: [
    { title: 'Poorvakarma Details', content: 'Snehana (oleation): internal (Snehapana) and external (Abhyanga). Swedana (fomentation): 13 types based on disease. Purpose: liquefy Ama, mobilize Dosha, open Srotas, prepare for Shodhana. Duration: 3-7 days Snehana + 3 days Swedana. Signs of proper preparation: soft stool, lightness, improved appetite.', clinicalRelevance: 'Proper Poorvakarma is essential for successful Shodhana.' },
    { title: 'Samsarjana Krama', content: 'Post-purification graduated diet: Day 1-2: Peya (thin gruel). Day 3: Vilepi (thick gruel). Day 4: Akrita Yavagu (gruel with ghee). Day 5: Krita Yavagu (medicated gruel). Day 6: Akrita Rasa (meat soup). Day 7: Krita Rasa (medicated soup). Day 8+: regular diet. Purpose: gradual Agni restoration.', clinicalRelevance: 'Samsarjana Krama is critical for Panchakarma success - skipping causes Agni disturbance.' },
    { title: 'Panchakarma in Elderly', content: 'Elderly require careful Panchakarma: smaller Snehapana doses, gentler Swedana, milder Shodhana, focus on Basti and Shamana. Monitoring: frequent vitals, hydration, strength. Rasayana: mandatory after Shodhana. Duration: shorter with longer recovery. Herbs: milder formulations.', clinicalRelevance: 'Elderly patients benefit from modified Panchakarma protocols.' },
  ],
  16: [
    { title: 'Vamana Day Protocol', content: 'Morning: wake early, warm water. Give Vamana drug (Madanaphala + honey + Yastimadhu Kwatha). Rub tongue to induce vomiting. Collect vomit for assessment. Kapha comes first, then Pitta. Stop when Pitta appears. Post: Dhoomapana, Gandusha, rest. Evening: light food. Next day: Samsarjana.', clinicalRelevance: 'Following complete Vamana protocol ensures effective Kapha elimination.' },
    { title: 'Virechana Day Protocol', content: 'Morning: empty stomach. Give Virechana drug (Trivrit + warm milk). Monitor stool quality. Pitta-colored stool indicates success. Stop when Pitta appears. Post: rest, warm water sips. Next day: Samsarjana. Assessment: count purges, stool color, patient comfort.', clinicalRelevance: 'Following complete Virechana protocol ensures effective Pitta elimination.' },
    { title: 'Emergency Management', content: 'Vamana complications: excessive emesis - give cold water, rest. Virechana complications: excessive purgation - rice water, buttermilk. Basti complications: poor retention - smaller volume, slower administration. General: monitor vitals, provide supportive care, adjust treatment plan.', clinicalRelevance: 'Emergency preparedness ensures safe Panchakarma practice.' },
  ],
  17: [
    { title: 'Shirodhara Therapy', content: 'Continuous pouring of medicated oil/buttermilk on forehead. Duration: 30-45 minutes. Liquids: Taila (Vata), Takra (Pitta), Kwasha (Kapha). Benefits: calms Prana Vata, reduces stress, improves sleep, mental clarity. Indicated in: insomnia, anxiety, headache, hypertension.', clinicalRelevance: 'Shirodhara is premier therapy for stress-related and neurological conditions.' },
    { title: 'Karnapurana (Ear Oil)', content: 'Instillation of warm medicated oil in ears. Duration: 10-15 minutes each ear. Oils: Bilva Taila, Apamarga Taila. Benefits: pacifies Vata, prevents ear diseases, improves hearing, reduces tinnitus. Indicated in: earache, tinnitus, hearing loss, vertigo.', clinicalRelevance: 'Karnapurana is effective for Vata-related ear conditions.' },
    { title: 'Head Disease Prevention', content: 'Regular Shiro Abhyanga, proper head hygiene, avoid head exposure to cold/wind/sun, adequate sleep, stress management, balanced diet. Seasonal: Nasya with Anu Taila in Varsha Ritu. Rasayana: Brahmi, Shankhapushpi for brain health.', clinicalRelevance: 'Preventive measures reduce Shiroroga incidence and severity.' },
  ],
  18: [
    { title: 'Shotha by Dosha', content: 'Vataja: mobile, soft, cold, painful, crepitus. Pittaja: hot, red, painful, rapid growth, burning. Kaphaja: hard, cold, white, slow growth, itchy. Sannipataja: mixed features, difficult to treat. Raktaja: red, hot, painful, spreading. Agantuja: traumatic, localized.', clinicalRelevance: 'Dosha-based Shotha classification guides treatment selection.' },
    { title: 'Lepa Application Methods', content: 'Cold Lepa: for Pitta-Rakta, applied thin, until dry. Hot Lepa: for Vata-Kapha, applied thick, with warmth. Drug Lepa: specific herbs for specific conditions. Duration: 30-45 minutes. Remove with warm water. Frequency: 2-3 times daily for acute, daily for chronic.', clinicalRelevance: 'Proper Lepa technique maximizes therapeutic benefit.' },
    { title: 'Shotha Prevention', content: 'Prevention: proper diet (avoid Viruddha Ahara), regular exercise, adequate sleep, seasonal regimen, timely treatment of minor conditions, avoid trauma, proper posture, compression stockings for venous edema.', clinicalRelevance: 'Prevention of Shotha is more effective than treatment once established.' },
  ],
  19: [
    { title: 'Agni Types in Abdominal Disease', content: 'Mandagni (weak): Kapha excess, slow digestion, heaviness, Ama. Tikshnagni (sharp): Pitta excess, fast digestion, acid. Vishamagni (irregular): Vata excess, variable digestion. Sama Agni (balanced): normal. Agni type determines treatment approach for all abdominal conditions.', clinicalRelevance: 'Agni assessment is the foundation of abdominal disease treatment.' },
    { title: 'Abdominal Palpation', content: 'Systematic palpation: start from right iliac fossa, move clockwise. Assess: tenderness, rigidity, masses, organomegaly, guarding. Epigastric (stomach, liver), Umbilical (small intestine), Hypogastric (colon, bladder), Flanks (kidneys). Combine with Ashtavidha Pariksha.', clinicalRelevance: 'Abdominal palpation provides direct clinical information for diagnosis.' },
    { title: 'Udara (Ascites) Management', content: 'Udara: fluid accumulation in abdomen from Kapha-Meda excess, liver dysfunction, or heart failure. Symptoms: progressive abdominal distension, fluid thrill, dyspnea. Treatment: Langhana (lightening), Deepana-Pachana, diuretic herbs (Punarnava, Gokshura, Musta), Basti for Vata pacification.', clinicalRelevance: 'Udara management requires systematic approach addressing underlying Dosha imbalance.' },
  ],
  20: [
    { title: 'Jwara Types by Dosha', content: 'Vataja: irregular fever, body ache, dryness, cold preference. Pittaja: high fever, burning, thirst, delirium. Kaphaja: low-grade fever, heaviness, anorexia, cold preference. Sannipataja: mixed, difficult to treat. Santata: continuous. Anyedyushka: alternate days. Tritiyaka: third day. Chaturthaka: fourth day.', clinicalRelevance: 'Jwara type determines treatment approach - Dosha-specific management.' },
    { title: 'Prameha Prevention', content: 'Prevention: avoid sweet, heavy, oily foods. Regular exercise. Maintain healthy weight. Avoid day sleep. Regular Dinacharya. Monitor blood sugar. Herbs: Guduchi, Amalaki, Haridra. Screening: annual check-up for family history. Early intervention at pre-diabetic stage.', clinicalRelevance: 'Prameha prevention is more effective than treatment - lifestyle prevents 80% of cases.' },
    { title: 'Kushtha Treatment Principles', content: 'Treatment: Shodhana (Vamana for Kapha, Virechana for Pitta, Raktamokshana for Rakta). Shamana: Khadira, Nimba, Haridra, Guduchi, Manjistha. External: Churnapradeha, Udvartana. Diet: avoid Viruddha Ahara, sour, salty, spicy. Duration: 3-6 months for chronic conditions.', clinicalRelevance: 'Combined internal and external treatment is essential for Kushtha management.' },
  ],
  21: [
    { title: 'Prakriti-Based Diet', content: 'Vata: warm, moist, grounding foods - cooked grains, soups, stews, ghee, nuts. Pitta: cool, moderate, sweet foods - salads, fruits, dairy, grains. Kapha: light, warm, spicy foods - vegetables, legumes, spices, honey. Each Prakriti has specific dietary needs for optimal health.', clinicalRelevance: 'Prakriti-based diet prevents constitutional imbalance and supports health.' },
    { title: 'Prakriti-Based Exercise', content: 'Vata: gentle, grounding - yoga, walking, swimming. Pitta: moderate, cooling - swimming, cycling, team sports. Kapha: vigorous, stimulating - running, aerobics, competitive sports. Duration: Vata 20-30 min, Pitta 30-45 min, Kapha 45-60 min. Frequency: daily.', clinicalRelevance: 'Prakriti-based exercise prevents exercise-related Dosha imbalance.' },
    { title: 'Prakriti and Disease Susceptibility', content: 'Vata: neurological, musculoskeletal, digestive, anxiety disorders. Pitta: inflammatory, skin, liver, blood disorders. Kapha: metabolic, respiratory, obesity, depression. Understanding susceptibility enables targeted prevention and early screening.', clinicalRelevance: 'Prakriti-based susceptibility guides preventive screening.' },
  ],
  22: [
    { title: 'Deepana vs Pachana', content: 'Deepana (appetizer): stimulates Agni without digesting Ama - Chitraka, Pippali, Shunthi. Pachana (digestive): digests Ama without stimulating Agni - Haritaki, Musta, Vidanga, Kutaja. Combined: Trikatu (Deepana) + Triphala (Pachana). Selection: Deepana for Mandagni, Pachana for Ama, both for Mandagni + Ama.', clinicalRelevance: 'Distinguishing Deepana from Pachana enables precise treatment.' },
    { title: 'Langhana-Brimhana Decision', content: 'Step 1: Ama present? (tongue coating, heaviness, anorexia). If yes: Langhana. Step 2: Dhatu Kshaya? (emaciation, weakness). If yes: Brimhana. Step 3: Dosha balanced? If yes: maintenance. If both Ama and Kshaya: sequential - Langhana first, then Brimhana.', clinicalRelevance: 'Systematic decision tree prevents wrong Langhana-Brimhana selection.' },
    { title: 'Langhana Complications', content: 'Excessive Langhana: Vata aggravation, Dhatu depletion, weakness, dizziness. Prevention: monitor daily, stop when Ama clears. Insufficient Langhana: Ama persists. Wrong type: Pitta patients with Ushna Langhana worsen. Prevention: Dosha-specific Langhana selection.', clinicalRelevance: 'Preventing Langhana complications requires daily monitoring and Dosha-specific approach.' },
  ],
  23: [
    { title: 'Santarpana Diseases', content: 'From over-nourishment: Sthaulya (obesity), Prameha (diabetes), Medoroga (lipid disorders), Kushtha (skin diseases), Shotha (edema), Hridroga (heart disease). Treatment: Langhana, Apatarpana, Tikta Rasa herbs, exercise. Modern lifestyle diseases are primarily Santarpana diseases.', clinicalRelevance: 'Modern lifestyle diseases require Langhana approach, not Brimhana.' },
    { title: 'Apatarpana Diseases', content: 'From under-nourishment: Karshya (emaciation), Shosha (wasting), Daurbalya (weakness), Pandu (anemia), Unmada (mental disorders). Treatment: Brimhana, Santarpana, Madhura Rasa herbs, rest, Rasayana. Requires Agni assessment before nourishment.', clinicalRelevance: 'Under-nourishment diseases require systematic Brimhana with Agni consideration.' },
    { title: 'Food Quantity Guidelines', content: 'Proper quantity: solid food 1/3 stomach, liquid 1/3, empty space 1/3 for Agni. Total: 2 handfuls (Anjali). Adjust by: Agni strength, activity level, season. Overeating causes Ama, obesity. Undereating causes Vata, weakness. Right quantity prevents both.', clinicalRelevance: 'Proper food quantity is the foundation of nutrition.' },
  ],
  24: [
    { title: 'Sensory Balance', content: 'Modern life creates sensory imbalance: visual excess (screens), auditory excess (noise), gustatory excess (processed food), tactile deficit (sedentary), olfactory excess (chemicals). Restoration: digital detox, nature exposure, mindful eating, physical activity, natural aromatherapy.', clinicalRelevance: 'Restoring sensory balance prevents modern lifestyle diseases.' },
    { title: 'Sensory Rehabilitation', content: 'After sensory loss: visual rehabilitation with Braille, magnifiers. Auditory with sign language, hearing aids. Tactile with Abhyanga, texture therapy. Olfactory with Nasya, aromatherapy. Multi-sensory approach enhances remaining senses to compensate for loss.', clinicalRelevance: 'Sensory rehabilitation improves quality of life after sensory loss.' },
    { title: 'Indriya Sevana Vidhi', content: 'Proper sense use guidelines: eyes - adequate lighting, screen breaks, Triphala eyewash. ears - volume limits, ear protection. nose - avoid strong chemicals, Nasya. tongue - balanced taste, tongue scraping. skin - Abhyanga, comfortable clothing. Each sense has specific protection needs.', clinicalRelevance: 'Systematic sensory hygiene prevents sense organ diseases.' },
  ],
  25: [
    { title: 'Meditation Types', content: 'Vata: grounding meditation (body scan, breath awareness). Pitta: cooling meditation (loving-kindness, compassion). Kapha: stimulating meditation (breath of fire, visualization). Duration: 20-30 minutes daily. Benefits: reduces stress, improves sleep, enhances immunity, balances Dosha.', clinicalRelevance: 'Dosha-specific meditation enhances therapeutic benefit.' },
    { title: 'Yoga for Mental Health', content: 'Yoga supports mental health: Asana (physical postures) releases tension, Pranayama (breathing) calms nervous system, Dharana (concentration) improves focus, Dhyana (meditation) reduces stress, Samadhi (absorption) provides inner peace. Regular practice prevents and treats mental disorders.', clinicalRelevance: 'Yoga provides comprehensive mental health support through multiple mechanisms.' },
    { title: 'Sleep and Mental Health', content: 'Adequate sleep is essential for mental health: 7-8 hours for adults. Sleep deprivation causes: anxiety, depression, irritability, poor concentration, weakened immunity. Ayurvedic sleep support: Padabhyanga, warm milk with nutmeg, regular sleep schedule, dark room, no screens before bed.', clinicalRelevance: 'Sleep quality directly impacts mental health and disease susceptibility.' },
  ],
  26: [
    { title: 'Sadvritta Details', content: 'Moral conduct includes: Ahimsa (non-violence), Satya (truthfulness), Asteya (non-stealing), Brahmacharya (moderation), Daya (compassion), Dana (charity), Tapas (discipline), Shauch (cleanliness). Benefits: mental peace, social harmony, stress reduction, immune enhancement.', clinicalRelevance: 'Moral conduct supports physical and mental health through stress reduction.' },
    { title: 'Achara Rasayana', content: 'Rejuvenation through proper conduct: truthfulness, non-violence, compassion, cleanliness, calmness, sense control, meditation, charity. Benefits: Ojas enhancement, mental clarity, social harmony, longevity. No herbs required - lifestyle-based Rasayana accessible to all.', clinicalRelevance: 'Achara Rasayana provides rejuvenation benefits without medication.' },
    { title: 'Community Health', content: 'Ayurveda extends beyond individual health: epidemic prevention, public health education, environmental protection, social harmony. Community health measures: seasonal health camps, dietary education, hygiene promotion, disease surveillance. Physician responsibility: serve community.', clinicalRelevance: 'Community health perspective extends Ayurvedic practice beyond individual care.' },
  ],
  27: [
    { title: 'Shad Rasa Details', content: 'Madhura (sweet): earth+water, builds tissue, pacifies Vata-Pitta. Amla (sour): earth+fire, stimulates Agni, increases Pitta. Lavana (salt): water+fire, softens, increases Pitta-Kapha. Katu (pungent): fire+air, stimulates, increases Vata-Pitta. Tikta (bitter): air+space, detoxifies. Kashaya (astringent): air+earth, dries.', clinicalRelevance: 'Taste-based dietary prescription is the foundation of Ayurvedic nutrition.' },
    { title: 'Food Processing Effects', content: 'Cooking: makes food lighter, easier to digest. Frying: makes heavier, increases Snigdha. Roasting: makes lighter, reduces Guru. Fermentation: increases Amla, stimulates Agni. Drying: concentrates, makes lighter. Understanding processing helps adjust dietary prescription.', clinicalRelevance: 'Same food with different processing has different therapeutic effects.' },
    { title: 'Seasonal Food Selection', content: 'Varsha (monsoon): warm, light, easily digestible. Sharad (autumn): cool, sweet, liquid. Hemanta (winter): heavy, sweet, unctuous. Vasanta (spring): light, bitter, pungent. Grishma (summer): cool, liquid, sweet. Food should match seasonal Agni capacity.', clinicalRelevance: 'Seasonal food selection prevents seasonal Dosha imbalance.' },
  ],
  28: [
    { title: 'Ahara Vidhi (Food Rules)', content: 'Eight rules: (1) Ushna - warm. (2) Snigdha - unctuous. (3) Matravat - proper quantity. (4) Jirne - after digestion. (5) Virya Aviruddha - compatible. (6) Ishta Deshe - proper place. (7) Ishta Sarvopakaranam - proper accessories. (8) Na Atidrutam - not too fast. Also: Na Ativilambitam - not too slow.', clinicalRelevance: 'Following Ahara Vidhi prevents Ama formation and digestive disorders.' },
    { title: 'Viruddha Ahara Examples', content: 'Fish + milk: skin diseases. Honey + equal ghee: toxic. Honey + hot water: toxic. Milk + sour fruits: indigestion. Night-curdled milk: Ama. Excessive ghee: Kapha. These combinations create Ama, block Srotas, cause chronic disease.', clinicalRelevance: 'Knowledge of specific Viruddha Ahara prevents chronic disease.' },
    { title: 'Food Timing', content: 'Main meal at midday (10 AM-2 PM) when Agni is strongest. Light dinner before sunset. Avoid late-night eating. Morning: light breakfast if hungry. Seasonal: eat earlier in summer, later in winter. Proper timing aligns with natural Agni rhythms.', clinicalRelevance: 'Proper food timing enhances digestion and prevents Ama formation.' },
  ],
  29: [
    { title: 'Marma Assessment', content: 'Marma assessment: location, tenderness, swelling, discoloration, dysfunction. Three types: Sadya Pranahara (immediately fatal), Kalantara Pranahara (delayed fatal), Vishalyaghna (fatal if punctured). 107 Marma points. Assessment guides treatment: avoid in surgery, protect in trauma, stimulate in therapy.', clinicalRelevance: 'Marma assessment guides surgical safety and therapeutic intervention.' },
    { title: 'Ojas Protection', content: 'Ojas is the most subtle Prana Ayatana - essence of all Dhatus. Depletion causes: weakness, disease susceptibility, consciousness dullness, premature aging. Protection: adequate rest, proper nourishment, emotional balance, Rasayana therapy. Building: Ashwagandha, Shatavari, Bala, Ghee, Milk.', clinicalRelevance: 'Ojas protection is the ultimate goal of health maintenance.' },
    { title: 'Seat-Specific Protection', content: 'Each seat has specific protection: Shira - Nasya, Shiro Abhyanga. Kantha - voice care. Hridaya - emotional management, Hridya herbs. Nabhi - Agni maintenance. Basti - urinary health. Guru - bowel health. Oja - Rasayana. Shukra - reproductive health. Rakta - blood health. Mamsa - exercise.', clinicalRelevance: 'Seat-specific protection enables targeted prevention for each vital organ.' },
  ],
  30: [
    { title: 'Dasha Vidha Pariksha', content: 'Ten-fold examination: Prakriti (constitution), Vikriti (imbalance), Sara (tissue quality), Samhanana (body build), Satva (mental strength), Vyayama Shakti (exercise capacity), Ahara Shakti (dietary capacity), Vaya (age), and others. Systematic comprehensive patient evaluation.', clinicalRelevance: 'Dasha Vidha Pariksha provides the most comprehensive assessment framework.' },
    { title: 'Physician Development', content: 'Continuous development: Shruta (reading new research), Drushtakarma (clinical practice), Daksha (skill improvement), Shuchi (ethical maintenance). Methods: continuing education, case conferences, peer review, mentorship. Goal: lifelong learning for optimal patient care.', clinicalRelevance: 'Physician development directly impacts patient outcomes.' },
    { title: 'Dharma-Based Practice', content: 'Dharma is the foundation of sustainable medical practice. Benefits: patient trust, professional respect, long-term success, inner peace. Includes: non-harm, truthfulness, compassion, service, humility. Without Dharma, even skilled practice fails eventually.', clinicalRelevance: 'Dharma-based practice ensures sustainable professional development.' },
  ],
};

// Additional shlokas per chapter
const shlokas = {
  1: [
    { number: '1.51', sanskrit: 'प्राणिनामायुरविच्छेद्यम् आयुर्वेदेन विद्यते।', translation: 'Ayurveda provides the knowledge of unbroken life force of living beings.', commentary: 'Ayurveda is the science of longevity and vitality.' },
    { number: '1.52', sanskrit: 'स्वस्थस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनम्।', translation: 'Protecting health of healthy, curing disease of sick.', commentary: 'Two-fold purpose of Ayurveda - prevention and cure.' },
    { number: '1.53', sanskrit: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्।', translation: 'Wholesome and unwholesome, happiness and sorrow, and what is beneficial for life.', commentary: 'Understanding what promotes and destroys health.' },
    { number: '1.54', sanskrit: 'आयुःकामीय अध्याये आयुषः हितम् उच्यते।', translation: 'In the chapter desiring longevity, what is beneficial for life is described.', commentary: 'This chapter specifically addresses longevity-promoting practices.' },
  ],
  2: [
    { number: '2.40', sanskrit: 'वातकफयोः समाने स्वस्थ्यम् असमाने व्याधिः।', translation: 'When Vata and Kapha are balanced, health; when imbalanced, disease.', commentary: 'Balance is the key to health.' },
    { number: '2.41', sanskrit: 'प्राणो वायुः शरीरस्थः सर्वक्रियासु वर्तते।', translation: 'Prana Vata residing in the body operates in all functions.', commentary: 'Vata controls all physiological processes.' },
    { number: '2.42', sanskrit: 'श्लेष्मा स्थैर्यं बलं स्नेहं पुष्टिं च करोति।', translation: 'Kapha provides stability, strength, lubrication, and nourishment.', commentary: 'Kapha is the anabolic dosha.' },
  ],
  3: [
    { number: '3.32', sanskrit: 'स्नेहः शरीरं दारयति वातं शमयति।', translation: 'Sneha breaks down and pacifies Vata.', commentary: 'Fundamental principle of Snehana therapy.' },
    { number: '3.33', sanskrit: 'घृतं सत्त्वं बुद्धिं मेधां स्मृतिं च वर्धयति।', translation: 'Ghee enhances Sattva, intelligence, wisdom, and memory.', commentary: 'Ghee has unique Rasayana properties.' },
    { number: '3.34', sanskrit: 'तैलं वातं कफं शोथं च नाशयति।', translation: 'Oil destroys Vata, Kapha, and swelling.', commentary: 'Taila has specific therapeutic effects.' },
  ],
  4: [
    { number: '4.5', sanskrit: 'त्रिवृत् सर्वेषां विरेचनानां श्रेष्ठा।', translation: 'Trivrit is the best of all purgatives.', commentary: 'Trivrit is the safest and most reliable purgative.' },
    { number: '4.6', sanskrit: 'कोष्ठं विज्ञाय मात्रां प्रकल्पयेत्।', translation: 'After assessing Koshtha, determine the dose.', commentary: 'Koshtha assessment is critical for Virechana success.' },
    { number: '4.7', sanskrit: 'विरेचनं पित्तहरम्।', translation: 'Virechana pacifies Pitta.', commentary: 'Virechana is the primary treatment for Pitta disorders.' },
  ],
  5: [
    { number: '5.5', sanskrit: 'दिनचर्या स्वास्थ्यस्य मूलम्।', translation: 'Daily routine is the root of health.', commentary: 'Dinacharya is the foundation of preventive medicine.' },
    { number: '5.6', sanskrit: 'ऋतुचर्या रोगप्रतिकर्माणि।', translation: 'Seasonal regimen prevents disease.', commentary: 'Ritucharya adapts to seasonal Dosha changes.' },
    { number: '5.7', sanskrit: 'अभ्यंगं वातहरं केश्यं दृष्टिप्रसादनम्।', translation: 'Abhyanga pacifies Vata, strengthens hair, improves vision.', commentary: 'Daily Abhyanga has multiple health benefits.' },
  ],
  6: [
    { number: '6.5', sanskrit: 'वेगान् न धारयेत्।', translation: 'Do not suppress natural urges.', commentary: 'Urge suppression is the root cause of many diseases.' },
    { number: '6.6', sanskrit: 'उदावर्तः सर्ववेगधारणात्।', translation: 'Udavarta arises from suppression of all urges.', commentary: 'Udavarta is the primary consequence of urge suppression.' },
    { number: '6.7', sanskrit: 'शुक्रवेगं धारयित्वा शुक्रमेहं लभते।', translation: 'Suppressing seminal urge causes seminal disorders.', commentary: 'Each urge suppression has specific disease consequences.' },
  ],
  7: [
    { number: '7.4', sanskrit: 'इन्द्रियाणां सम्यग्योगः स्वास्थ्यकरः।', translation: 'Proper sense use promotes health.', commentary: 'Balanced sensory engagement is health-promoting.' },
    { number: '7.5', sanskrit: 'अतियोगः इन्द्रियाणां रोगकरः।', translation: 'Excessive sense use causes disease.', commentary: 'Overuse of senses leads to disease.' },
    { number: '7.6', sanskrit: 'हेयोगः इन्द्रियाणां रोगकरः।', translation: 'Improper sense use causes disease.', commentary: 'Wrong use of senses is also pathological.' },
  ],
  8: [
    { number: '8.5', sanskrit: 'भिषक् उपस्थाता औषधं पतिः चतुष्पदम्।', translation: 'Physician, attendant, medicine, and patient are the four pillars.', commentary: 'All four components must be optimal for treatment success.' },
    { number: '8.6', sanskrit: 'श्रुतं दृष्टकर्म दक्षं शुचित्वं वैद्यगुणाः।', translation: 'Knowledge, experience, dexterity, and purity are physician qualities.', commentary: 'Four essential physician qualities.' },
    { number: '8.7', sanskrit: 'चतुष्पदे सर्वे सम्यक् भवेत् चिकित्सा सफला।', translation: 'When all four are proper, treatment is successful.', commentary: 'Treatment success depends on all four pillars.' },
  ],
  9: [
    { number: '9.5', sanskrit: 'रोगी रोगं च औषधं च परीक्ष्य चिकित्सेत्।', translation: 'After examining patient, disease, and medicine, treat.', commentary: 'Comprehensive assessment before treatment.' },
    { number: '9.6', sanskrit: 'साध्यासाध्यविवेकं कृत्वा चिकित्सां कुर्यात्।', translation: 'After determining curability, treatment should be done.', commentary: 'Prognosis assessment guides treatment planning.' },
    { number: '9.7', sanskrit: 'योगवाही भिषक् श्रेष्ठः।', translation: 'The physician who uses rational treatment is best.', commentary: 'Rational, individualized treatment is superior.' },
  ],
  10: [
    { number: '10.5', sanskrit: 'आयुः कामयमानेन धर्मार्थसुखसाधनम्।', translation: 'Desiring longevity, pursue means of Dharma, Artha, and Sukha.', commentary: 'Longevity supports all life goals.' },
    { number: '10.6', sanskrit: 'ओजः सर्वधातूनां सारः प्राणायतनम्।', translation: 'Ojas is the essence of all Dhatus and a Prana Ayatana.', commentary: 'Ojas preservation is critical for longevity.' },
    { number: '10.7', sanskrit: 'सत्त्वम् आत्मा शरीरं च त्रिविधं कर्मसाधनम्।', translation: 'Mind, soul, and body are the three instruments of action.', commentary: 'Health of all three is necessary for desire fulfillment.' },
  ],
  11: [
    { number: '11.20', sanskrit: 'प्राणिनामायुरविच्छेद्यम् आयुर्वेदेन विद्यते।', translation: 'Ayurveda provides the knowledge of unbroken life force.', commentary: 'Ayurveda is the science of longevity.' },
    { number: '11.21', sanskrit: 'स्वस्थस्य स्वास्थ्यरक्षणं आतुरस्य विकारप्रशमनम्।', translation: 'Protecting health of healthy, curing disease of sick.', commentary: 'Two-fold purpose of Ayurveda.' },
    { number: '11.22', sanskrit: 'हिताहितं सुखं दुःखमायुस्तस्य हिताहितम्।', translation: 'Wholesome and unwholesome, happiness and sorrow for life.', commentary: 'Understanding health determinants.' },
  ],
  12: [
    { number: '12.25', sanskrit: 'वातकफयोः समाने स्वस्थ्यम्।', translation: 'When Vata and Kapha are balanced, health.', commentary: 'Balance is the key for Vata-Kapha types.' },
    { number: '12.26', sanskrit: 'प्राणो वायुः शरीरस्थः।', translation: 'Prana Vata resides in the body.', commentary: 'Vata controls all functions.' },
    { number: '12.27', sanskrit: 'श्लेष्मा स्थैर्यं बलं करोति।', translation: 'Kapha provides stability and strength.', commentary: 'Kapha is the anabolic dosha.' },
  ],
  13: [
    { number: '13.24', sanskrit: 'स्नेहः वातं शमयति।', translation: 'Sneha pacifies Vata.', commentary: 'Fundamental principle of Snehana.' },
    { number: '13.25', sanskrit: 'घृतं सत्त्वं वर्धयति।', translation: 'Ghee enhances Sattva.', commentary: 'Ghee has unique mental health benefits.' },
    { number: '13.26', sanskrit: 'तैलं वातं नाशयति।', translation: 'Oil destroys Vata.', commentary: 'Taila is specific for Vata conditions.' },
  ],
  14: [
    { number: '14.22', sanskrit: 'स्वेदनं स्तम्भशूलगौरवापहम्।', translation: 'Fomentation destroys stiffness, pain, and heaviness.', commentary: 'Three primary effects of Swedana.' },
    { number: '14.23', sanskrit: 'उष्णं स्वेदनं कफं वातं च हन्ति।', translation: 'Hot fomentation destroys Kapha and Vata.', commentary: 'Heat opposes cold quality of Kapha and Vata.' },
    { number: '14.24', sanskrit: 'नाडीस्वेदः सन्धिरोगेषु शस्यते।', translation: 'Nadi Sweda is indicated in joint diseases.', commentary: 'Local fomentation for joint treatment.' },
  ],
  15: [
    { number: '15.25', sanskrit: 'शोधनं शमनं च एव द्विविधं कर्म।', translation: 'Shodhana and Shamana are the two-fold treatment.', commentary: 'All treatments fall into purification or pacification.' },
    { number: '15.26', sanskrit: 'विरेचनं पित्तहरं वमनं कफनाशनम्।', translation: 'Virechana pacifies Pitta, Vamana destroys Kapha.', commentary: 'Each procedure targets specific Dosha.' },
    { number: '15.27', sanskrit: 'बस्तिः वातहरः श्रेष्ठः।', translation: 'Basti is the best Vata-pacifying treatment.', commentary: 'Basti is called Ardha Chikitsa.' },
  ],
  16: [
    { number: '16.24', sanskrit: 'मदनफलं वमनाय।', translation: 'Madanaphala is for emesis.', commentary: 'Primary emetic drug.' },
    { number: '16.25', sanskrit: 'त्रिवृत् विरेचनाय।', translation: 'Trivrit is for purgation.', commentary: 'Primary purgative drug.' },
    { number: '16.26', sanskrit: 'दशमूलं बस्तौ।', translation: 'Dashamula is for Basti.', commentary: 'Primary Basti drug.' },
  ],
  17: [
    { number: '17.16', sanskrit: 'नस्यं ऊर्ध्वजत्रुगतव्याधिषु प्रधानम्।', translation: 'Nasya is primary for head diseases.', commentary: 'Nasal route delivers drugs to the head.' },
    { number: '17.17', sanskrit: 'शिरोधारा मानसरोगेषु शस्यते।', translation: 'Shirodhara is indicated in mental disorders.', commentary: 'Continuous oil pouring calms the mind.' },
    { number: '17.18', sanskrit: 'तर्पणं नेत्ररोगेषु प्रधानम्।', translation: 'Tarpana is primary for eye diseases.', commentary: 'Eye nourishment strengthens vision.' },
  ],
  18: [
    { number: '18.22', sanskrit: 'शोथस्य लेपः सेकः परिषेकः।', translation: 'Lepa, Seka, Parisheka are for swelling.', commentary: 'Three external treatments for Shotha.' },
    { number: '18.23', sanskrit: 'शोथे दोषं विदित्वा चिकित्सां कुर्यात्।', translation: 'Knowing Dosha in Shotha, treat.', commentary: 'Dosha assessment guides Shotha treatment.' },
    { number: '18.24', sanskrit: 'वातजे स्निग्धं पित्तजे शीतं कफजे रूक्षम्।', translation: 'Vata: unctuous. Pitta: cold. Kapha: dry.', commentary: 'Primary treatment quality for each type.' },
  ],
  19: [
    { number: '19.16', sanskrit: 'उदरस्य चिकित्सा दोषभेदात्।', translation: 'Abdominal treatment is based on Dosha.', commentary: 'Dosha classification guides treatment.' },
    { number: '19.17', sanskrit: 'आमजे अग्निं दीपयेत्।', translation: 'In Amaja, strengthen Agni first.', commentary: 'Deepana-Pachana is first step.' },
    { number: '19.18', sanskrit: 'वातजे स्निग्धमुष्णम्।', translation: 'Vataja: unctuous and warm.', commentary: 'Primary treatment for Vata conditions.' },
  ],
  20: [
    { number: '20.23', sanskrit: 'ज्वरे लङ्घनं प्रथमम्।', translation: 'In fever, fasting is first.', commentary: 'Langhana helps eliminate Ama in fever.' },
    { number: '20.24', sanskrit: 'प्रमेहे पथ्यापथ्यं प्रथमम्।', translation: 'In Prameha, dietary modification is first.', commentary: 'Diet is foundation of diabetes management.' },
    { number: '20.25', sanskrit: 'कुष्ठे शोधनं शमनं च।', translation: 'In Kushtha, Shodhana and Shamana both.', commentary: 'Combined treatment for skin diseases.' },
  ],
  21: [
    { number: '21.11', sanskrit: 'प्रकृतिं विज्ञाय चिकित्सां कुर्यात्।', translation: 'After knowing Prakriti, treat.', commentary: 'Constitutional assessment guides treatment.' },
    { number: '21.12', sanskrit: 'वातप्रकृतौ स्निग्धमुष्णम्।', translation: 'Vata Prakriti needs unctuous and warm.', commentary: 'Constitutional treatment for Vata.' },
    { number: '21.13', sanskrit: 'पित्तप्रकृतौ शीतं मधुरम्।', translation: 'Pitta Prakriti needs cold and sweet.', commentary: 'Constitutional treatment for Pitta.' },
    { number: '21.14', sanskrit: 'कफप्रकृतौ रूक्षोष्णम्।', translation: 'Kapha Prakriti needs dry and warm.', commentary: 'Constitutional treatment for Kapha.' },
  ],
  22: [
    { number: '22.11', sanskrit: 'लङ्घनं कफामे बृंहणं वातक्षये।', translation: 'Langhana for Kapha-Ama, Brimhana for Vata-depletion.', commentary: 'Two opposite approaches.' },
    { number: '22.12', sanskrit: 'दीपनानि पाचनानि च लङ्घनम्।', translation: 'Deepana and Pachana are forms of Langhana.', commentary: 'Herbal Langhana includes Deepana and Pachana.' },
    { number: '22.13', sanskrit: 'रसायनं बृंहणम्।', translation: 'Rasayana is Brimhana.', commentary: 'Rejuvenation is nourishing treatment.' },
  ],
  23: [
    { number: '23.11', sanskrit: 'सन्तर्पणात् रोगाः अपतर्पणात् च।', translation: 'Diseases from over and under-nourishment.', commentary: 'Both excess and deficiency cause disease.' },
    { number: '23.12', sanskrit: 'मात्रावदाहारं कुर्यात्।', translation: 'Eat in proper quantity.', commentary: 'Proper quantity is foundation of nutrition.' },
    { number: '23.13', sanskrit: 'लङ्घनं सन्तर्पणजे रोगे।', translation: 'Langhana for over-nourishment diseases.', commentary: 'Lightening for excess conditions.' },
  ],
  24: [
    { number: '24.11', sanskrit: 'इन्द्रियाणां सम्यग्योगः स्वास्थ्यकरः।', translation: 'Proper sense use promotes health.', commentary: 'Balanced sensory engagement is health-promoting.' },
    { number: '24.12', sanskrit: 'अतियोगः इन्द्रियाणां रोगकरः।', translation: 'Excessive sense use causes disease.', commentary: 'Overuse leads to disease.' },
    { number: '24.13', sanskrit: 'हेयोगः इन्द्रियाणां रोगकरः।', translation: 'Improper sense use causes disease.', commentary: 'Wrong use is pathological.' },
  ],
  25: [
    { number: '25.11', sanskrit: 'सत्त्ववजयं मानसरोगेषु प्रधानम्।', translation: 'Sattvavajaya is primary for mental diseases.', commentary: 'Psychological therapy is essential.' },
    { number: '25.12', sanskrit: 'आत्मा ज्ञानं विज्ञानं च।', translation: 'Self-knowledge and scientific knowledge.', commentary: 'Both spiritual and scientific knowledge support mental health.' },
    { number: '25.13', sanskrit: 'धैर्यं स्मृतिः समाधिः मानसौषधम्।', translation: 'Patience, memory, and meditation are mental medicines.', commentary: 'Three pillars of psychological therapy.' },
  ],
  26: [
    { number: '26.11', sanskrit: 'दिनचर्या स्वास्थ्यस्य मूलम्।', translation: 'Daily routine is the root of health.', commentary: 'Dinacharya is foundation of prevention.' },
    { number: '26.12', sanskrit: 'ऋतुचर्या रोगप्रतिकर्माणि।', translation: 'Seasonal regimen prevents disease.', commentary: 'Ritucharya adapts to seasonal changes.' },
    { number: '26.13', sanskrit: 'सद्वृत्तं मानसस्वास्थ्यस्य मूलम्।', translation: 'Moral conduct is the root of mental health.', commentary: 'Sadvritta supports well-being.' },
  ],
  27: [
    { number: '27.11', sanskrit: 'षड्रसाः शरीरं पुष्णन्ति।', translation: 'Six tastes nourish the body.', commentary: 'Balanced Rasa intake supports nutrition.' },
    { number: '27.12', sanskrit: 'रसानां सम्यक् सेवनं स्वास्थ्यकरम्।', translation: 'Proper use of tastes promotes health.', commentary: 'Taste balance prevents disease.' },
    { number: '27.13', sanskrit: 'मधुरं बृंहणम् कटुकं लङ्घनम्।', translation: 'Sweet is nourishing, pungent is lightening.', commentary: 'Taste properties guide prescription.' },
  ],
  28: [
    { number: '28.11', sanskrit: 'अन्नं प्राणिनां प्राणाः।', translation: 'Food is the life of living beings.', commentary: 'Proper nutrition is fundamental.' },
    { number: '28.12', sanskrit: 'विरुद्धाहारं सर्वदा वर्जयेत्।', translation: 'Always avoid incompatible food.', commentary: 'Prevention of Viruddha Ahara is essential.' },
    { number: '28.13', sanskrit: 'अग्निं विज्ञाय भुञ्जीत।', translation: 'After assessing Agni, eat.', commentary: 'Agni determines food capacity.' },
  ],
  29: [
    { number: '29.11', sanskrit: 'हृदयं प्राणस्थानम्।', translation: 'Heart is the seat of Prana.', commentary: 'Heart is the most vital organ.' },
    { number: '29.12', sanskrit: 'शिरः इन्द्रियात्मकम्।', translation: 'Head is the seat of senses.', commentary: 'Head contains all sensory organs.' },
    { number: '29.13', sanskrit: 'नाभिर्जठराग्नेः स्थानम्।', translation: 'Navel is the seat of digestive fire.', commentary: 'Navel region controls metabolism.' },
  ],
  30: [
    { number: '30.11', sanskrit: 'दशमूलानि विज्ञाय चिकित्सां कुर्यात्।', translation: 'After understanding ten roots, treat.', commentary: 'Comprehensive understanding enables effective practice.' },
    { number: '30.12', sanskrit: 'श्रुतं दृष्टकर्म दक्षं शुचित्वम्।', translation: 'Knowledge, experience, dexterity, and purity.', commentary: 'Four essential physician qualities.' },
    { number: '30.13', sanskrit: 'धर्मार्थकाममोक्षाणां आरोग्यं मूलम्।', translation: 'Health is the root of Dharma, Artha, Kama, and Moksha.', commentary: 'Health supports all life goals.' },
  ],
};

// Process the file
let content = fs.readFileSync(filePath, 'utf8');
const originalLines = content.split('\n').length;

// For each chapter, add topics before diseaseDescriptions and shlokas before doshaDiscussion
for (let chNum = 1; chNum <= 30; chNum++) {
  const chapterPattern = `chapterNumber: ${chNum},`;
  const chapterIndex = content.indexOf(chapterPattern);
  if (chapterIndex === -1) continue;

  const nextChapterPattern = `chapterNumber: ${chNum + 1},`;
  const nextChapterIndex = content.indexOf(nextChapterPattern, chapterIndex);
  const searchEnd = nextChapterIndex !== -1 ? nextChapterIndex : content.length;

  // Add topics before diseaseDescriptions (insert BEFORE the closing ], of the topics array)
  if (topics[chNum]) {
    const ddIndex = content.indexOf('diseaseDescriptions:', chapterIndex);
    if (ddIndex !== -1 && ddIndex < searchEnd) {
      const beforeDD = content.substring(chapterIndex, ddIndex);
      const lastBracket = beforeDD.lastIndexOf('],');
      if (lastBracket !== -1) {
        // Insert BEFORE ], (inside the array, after the last entry)
        const insertPoint = chapterIndex + lastBracket;
        const topicLines = topics[chNum].map(t => topic(t)).join('\n');
        content = content.substring(0, insertPoint) + topicLines + '\n' + content.substring(insertPoint);
      }
    }
  }

  // Add shlokas before doshaDiscussion (insert BEFORE the closing ], of the shlokas array)
  if (shlokas[chNum]) {
    const ddIndex = content.indexOf('doshaDiscussion:', chapterIndex);
    if (ddIndex !== -1 && ddIndex < searchEnd) {
      const beforeDD = content.substring(chapterIndex, ddIndex);
      const lastBracket = beforeDD.lastIndexOf('],');
      if (lastBracket !== -1) {
        // Insert BEFORE ], (inside the array, after the last entry)
        const insertPoint = chapterIndex + lastBracket;
        const shlokaLines = shlokas[chNum].map(s => shloka(s)).join('\n');
        content = content.substring(0, insertPoint) + shlokaLines + '\n' + content.substring(insertPoint);
      }
    }
  }
}

fs.writeFileSync(filePath, content, 'utf8');
const newLines = content.split('\n').length;
console.log(`Lines: ${originalLines} -> ${newLines} (+${newLines - originalLines})`);
