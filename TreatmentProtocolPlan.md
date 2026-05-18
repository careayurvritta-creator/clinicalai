# Treatment Protocol Plan - Clinical AI Ayurveda System

**Last Updated:** May 18, 2026  
**Version:** 1.0

---

## Project Overview

Build an adaptive AI-powered Ayurvedic clinical case collection and treatment protocol system for doctors. The system will feature conversational Q&A (ADA-style), PDF investigation analysis, comprehensive question bank, real-time provisional diagnosis display, and continuous learning from doctor feedback.

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         CLINICAL AI INTAKE SYSTEM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  1. PDF INVESTIGATION UPLOAD                                                 │
│     User uploads PDF → AI analyzes → Shows findings in chat → Adds to context│
│                                                                             │
│  2. CONVERSATIONAL Q&A ENGINE (ADA-Style)                                   │
│     Step 1: Basic Info (Name, Age, Gender, Occupation, Area)                │
│     Step 2: Chief Complaints → Adaptive follow-up per complaint            │
│     Step 3: System-specific questions (joints, digestive, etc.)              │
│     Step 4: Ashtavidha Pariksha (conditionally, based on context)           │
│     Step 5: Dashavidha Pariksha (contextually relevant only)               │
│     Step 6: Medical History                                                 │
│     Step 7: PROVISIONAL DIAGNOSIS (Live display, doctor can correct)         │
│     Step 8: Generate Treatment Protocol                                     │
│                                                                             │
│  3. CASE PRESENTATION OUTPUT                                                │
│     Structured format with Patient Info, Complaints, Medications,           │
│     Panchakarma Procedures, Diet Advice, References                         │
│                                                                             │
│  4. LEARNING & FEEDBACK SYSTEM                                              │
│     Case stored locally → Doctor rates outcome → System learns patterns     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Configuration Decisions

| Decision | Choice |
|----------|--------|
| PDF Analysis Display | Show findings in chat + add to context |
| Ashtavidha/Dashavidha Questions | Ask only if data not available from symptoms |
| Question Bank Scope | All major Ayurvedic diseases + common NCDs |
| Unknown Disease Handling | AI researches first, then asks relevant questions |
| Provisional Diagnosis | Show in real-time, allow doctor correction |
| Case Storage | Local Storage + JSON export for MVP |
| PDF Analysis Scope | Major reports (CBC, Lipid, LFT, KFT, TFT, Urine, HbA1c) with abnormal highlighting |

---

## Question Bank Categories

### 1. By Disease Category (Ayurvedic)

| Category | Diseases | Key Questions Focus |
|----------|----------|---------------------|
| **Vata Vyadhi** | Sandhivata, Amavata, Pakshaghata, Gridhrasi, Ardita | Joint pain, stiffness, neurological symptoms |
| **Prameha** | Madhumeha, Prameha pidika, Sthhoulya | Urinary symptoms, thirst, weight changes |
| **Digestive (GI)** | Grahani, Amlapitta, Parinama Shula, Bahara Sotha | Appetite, bowel patterns, acidity |
| **Skin (Kushtha)** | Vicharchika, Ekakushta, Kitibha | Rashes, itching, lesion patterns |
| **Respiratory** | Swasa Kasa, Tamaka Shwasa, Rajayakshma | Breathlessness, cough, sputum |
| **Mental (Mansa)** | Vishada, Unmada, Apasmara | Sleep, mood, cognitive patterns |
| **Fever (Jwara)** | Vataja, Pittaja, Kaphaja Jwara | Fever pattern, associated symptoms |
| **Women's Health** | Artava Dusti, Yoni Vyapat, Vandhya | Menstrual patterns, discharge |
| **Urinary** | Mutrakrichra, Ashmari | Burning, frequency, pain |
| **Heart/Circulatory** | Hridroga, Raktagata Vata | Chest pain, palpitations, BP |

### 2. By System (Modern Clinical)

| System | Symptoms | Questions Focus |
|--------|----------|-----------------|
| **Musculoskeletal** | Joint pain, stiffness, swelling | Location, bilateral, morning stiffness, weather sensitivity |
| **Gastrointestinal** | Acidity, bloating, constipation | Appetite, bowel, gas, food preferences |
| **Cardiovascular** | Chest pain, palpitations, edema | Pain character, swelling, exercise tolerance |
| **Respiratory** | Cough, breathlessness, wheezing | Type, sputum, triggers, seasonal |
| **Neurological** | Headache, dizziness, numbness | Location, character, triggers, associated symptoms |
| **Endocrine** | Weight changes, thirst, fatigue | Appetite, thirst, energy patterns |
| **Dermatological** | Rashes, itching, lesions | Location, timing, seasonal variation |
| **Urinary** | Burning, frequency, retention | Color, frequency, foam, back pain |

### 3. Ashtavidha Pariksha (8-Fold Examination)

| Parameter | Assessment | When to Ask |
|-----------|------------|-------------|
| Nadi (Pulse) | Rate, rhythm, V/P/K characteristics | Not covered in symptoms |
| Mootra (Urine) | Color, frequency, abnormalities | Urinary symptoms present |
| Mala (Stool) | Consistency, frequency, abnormalities | Digestive symptoms present |
| Jivha (Tongue) | Coating, color, teeth marks | Self-reported check |
| Drik (Eyes) | Color, clarity, discharge | Eye symptoms mentioned |
| Sparsh (Skin) | Temperature, dryness | Not clear from symptoms |
| Shabda (Voice) | Hoarseness, clarity | Respiratory issues present |
| Aakriti (Build) | Body type, features | Not visible from intake |

### 4. Dashavidha Pariksha (10-Fold Examination)

| Parameter | Assessment | When to Ask |
|-----------|------------|-------------|
| Prakriti | Constitution | Early in intake |
| Vikriti | Current imbalance | Derived from symptoms |
| Saara | Tissue strength | Weakness mentioned |
| Samhanana | Musculature | Weight/strength discussed |
| Satva | Mental strength | Mental symptoms present |
| Ahara Shakti | Digestion capacity | Digestive questions |
| Vyayama Shakti | Exercise tolerance | Fatigue mentioned |
| Vaya | Age considerations | From basic info |
| Desha | Environment | Relevant to case |

---

## Unknown Disease Handling Protocol

```
When user describes unknown/uncommon complaint:
      │
      ▼
1. AI searches internal knowledge base
      │
      ▼
2. If no match found → Search RAG for similar symptoms
      │
      ▼
3. Present possible conditions to doctor:
   "I don't have specific knowledge about [condition]. Based on symptoms,
    it resembles [condition A] or [condition B]. Should I research further
    and prepare relevant questions?"
      │
      ▼
4. If doctor agrees → Research and generate relevant Q&A
      │
      ▼
5. Continue with adaptive flow using new question set
```

---

## File Structure

```
src/
├── app/
│   └── api/
│       ├── intake/
│       │   └── route.ts              # Q&A processing
│       ├── analyze-investigation/
│       │   └── route.ts              # PDF analysis
│       ├── case-presentation/
│       │   └── route.ts              # Generate output
│       └── feedback/
│           └── route.ts              # Store feedback
├── components/
│   ├── ChatPanel.tsx                 # Q&A mode routing
│   ├── CaseCollectorChat.tsx         # Conversational interface
│   ├── QuickReplies.tsx              # Suggestion chips
│   └── CanvasPanel.tsx               # Case presentation display
├── lib/
│   ├── intake-questions.ts           # Question bank
│   ├── diagnosis-engine.ts           # Progressive diagnosis
│   ├── case-learner.ts                # Learning system
│   ├── investigation-analyzer.ts     # Lab value parsing
│   └── store.ts                       # State management
└── app/
    └── globals.css                   # Styles
```

---

## Implementation Phases

### Phase 1: Core Infrastructure ✅ COMPLETED
- [x] Update store with intake state management
- [x] Create Question Bank (`intake-questions.ts`)
- [x] Create Diagnosis Engine (`diagnosis-engine.ts`)
- [x] Create Investigation Analyzer (`investigation-analyzer.ts`)

### Phase 2: API Endpoints ✅ COMPLETED
- [x] `/api/intake` - Process Q&A, return next question
- [x] `/api/analyze-investigation` - Analyze PDF findings
- [ ] `/api/case-presentation` - Generate formatted output (use existing treatment protocol API)
- [ ] `/api/feedback` - Store outcome feedback

### Phase 3: UI Components ✅ COMPLETED
- [x] `QuickReplies.tsx` - Suggestion chips
- [x] `CaseCollectorChat.tsx` - Conversational Q&A interface
- [x] Update `ChatPanel.tsx` - Route to Q&A mode
- [x] Update `CanvasPanel.tsx` - Display case presentation

### Phase 4: Learning System
- [ ] Case storage in localStorage (partially done)
- [ ] Outcome tracking interface
- [ ] Pattern learning from corrections
- [ ] Export functionality

---

## Output Format: Case Presentation

```markdown
═══════════════════════════════════════════════════════════════════════
              AYURVEDIC CLINICAL CASE PRESENTATION
═══════════════════════════════════════════════════════════════════════

Date: [Date] | Case ID: [Generated]

─────────────────────────────────────────────────────────────────────
PATIENT INFORMATION
─────────────────────────────────────────────────────────────────────
Name           : [Name]
Age/Gender     : [Age]/[Gender]
Occupation     : [Occupation]
Area          : [Area]
Prakriti      : [Constitution]

─────────────────────────────────────────────────────────────────────
INVESTIGATION ANALYSIS
─────────────────────────────────────────────────────────────────────
📋 Reports Analyzed: [Count]
⚠️  Abnormalities Detected:
    • [Finding 1]: [Value] (Ref: [Range])
    • [Finding 2]: [Value] (Ref: [Range])

─────────────────────────────────────────────────────────────────────
CHIEF COMPLAINTS
─────────────────────────────────────────────────────────────────────
┌────┬────────────────────────┬───────────┬──────────┬─────────────────┐
│ No │ Complaint              │ Duration  │ Severity │ Additional Info │
├────┼────────────────────────┼───────────┼──────────┼─────────────────┤
│ 1  │ [Complaint]            │ [Duration]│ [X/10]   │ [Context]      │
└────┴────────────────────────┴───────────┴──────────┴─────────────────┘

─────────────────────────────────────────────────────────────────────
PROVISIONAL DIAGNOSIS
─────────────────────────────────────────────────────────────────────
┌────────────────────────────────────────────────────────────────────┐
│ [Disease Name]                                    │
│ Samprapti: [Brief description]                     │
│ Involved Doshas: [V/P/K combination]               │
│ Disease Category: [Ayurvedic/Modern]              │
└────────────────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────────────
SUGGESTED TREATMENT PLAN
─────────────────────────────────────────────────────────────────────

ORAL MEDICATIONS
─────────────────────────────────────────────────────────────────────
┌────┬──────────────────────────┬──────────┬───────────┬────────────┬──────────────┐
│ No │ Medicine                │ Dosage   │ Frequency │ Anupana    │ Duration    │
├────┼──────────────────────────┼──────────┼───────────┼────────────┼──────────────┤
│ 1  │ [Name]                 │ [Dose]   │ [Freq]    │ [Anupana]  │ [Duration]  │
└────┴──────────────────────────┴──────────┴───────────┴────────────┴──────────────┘

PANCHKARMA PROCEDURES
─────────────────────────────────────────────────────────────────────
┌────┬──────────────────────┬──────────────────┬────────┬───────────────┐
│ No │ Procedure           │ Drug/Medium       │ Duration│ Necessity    │
├────┼──────────────────────┼──────────────────┼────────┼───────────────┤
│ 1  │ [Procedure]         │ [Drug]            │ [Days] │ [Purpose]    │
└────┴──────────────────────┴──────────────────┴────────┴───────────────┘

─────────────────────────────────────────────────────────────────────
DIET & LIFESTYLE
─────────────────────────────────────────────────────────────────────
✅ Pathya (Recommended):
   • [Items]

❌ Apathya (To Avoid):
   • [Items]

─────────────────────────────────────────────────────────────────────
FOLLOW-UP SCHEDULE
─────────────────────────────────────────────────────────────────────
📅 Day 3  : Initial Assessment
📅 Day 7  : Mid-course Evaluation
📅 Day 14 : Re-assessment
📅 Day 30 : Final Evaluation

═══════════════════════════════════════════════════════════════════════
Generated by Clinical AI | AyurVritta Ayurveda
═══════════════════════════════════════════════════════════════════════
```

---

## Learning System Design

### Case Storage Schema
```typescript
interface StoredCase {
  id: string
  date: string
  patientData: CaseData
  aiDiagnosis: string
  doctorCorrection?: string
  treatmentPlan: TreatmentPlan
  outcome?: {
    followUpDate: string
    outcomeRating: 1 | 2 | 3 | 4 | 5
    doctorNotes: string
    whatWorked: string[]
    whatDidntWork: string[]
  }
  learnings: {
    patternCorrected: string
    correctionReason: string
    frequency: number
  }[]
}
```

### Learning Pipeline
```
1. Case Completed → Stored in localStorage
2. Follow-up After Treatment → Doctor rates outcome
3. System Extracts Learnings:
   - If AI diagnosis == Doctor diagnosis → Pattern reinforced
   - If AI diagnosis != Doctor diagnosis → Correction stored
   - Extract symptom patterns for future improvement
4. Export/Import for multi-device sync (JSON)
```

---

## PDF Investigation Parameters

### Supported Reports
| Report | Key Parameters | Abnormal Thresholds |
|--------|---------------|---------------------|
| **CBC** | Hb, WBC, RBC, Platelets, ESR, CRP | Hb <12/>18, WBC <4000/>11000 |
| **Lipid Profile** | Total Chol, TG, HDL, LDL | LDL >100, TG >150, HDL <40 |
| **LFT** | Bilirubin, SGOT, SGPT, ALP | SGOT/SGPT >40, ALP >120 |
| **KFT** | Creatinine, BUN, eGFR | Creatinine >1.2, eGFR <90 |
| **TFT** | TSH, T3, T4 | TSH <0.4/>4.0 |
| **Blood Glucose** | Fasting, PP, HbA1c | FBS >100, HbA1c >5.7 |
| **Urine** | pH, Protein, Glucose, Ketones | Any positive values |

### Analysis Output
```
## Key Abnormalities Found:
1. **Parameter**: Value
   Normal: Range ⚠️ Status
   Clinical Correlation: [Ayurvedic interpretation]
```

---

## Question Bank Details

### Major Ayurvedic Disease Categories

#### 1. Vata Vyadhi (Neurological/Movement Disorders)
- **Sandhivata** (Osteoarthritis) - Joint pain, crepitus, stiffness, Vata aggravation
- **Amavata** (Rheumatoid Arthritis) - Joint swelling, morning stiffness >1hr, Ama
- **Pakshaghata** (Paralysis) - Sudden onset weakness, loss of movement, facial deviation
- **Gridhrasi** (Sciatica) - Radiating pain from low back to leg, numbness, Vata
- **Ardita** (Facial Palsy) - Facial deviation, inability to close eye, Vata Kapha

#### 2. Prameha (Metabolic Disorders)
- **Madhumeha** (Diabetes Type 2) - Polyuria, polydipsia, weight loss, fatigue
- **Prameha Pidika** (Boils in Diabetes) - Skin infections, recurrent boils
- **Sthhoulya** (Obesity) - Weight gain, lethargy, Kapha predominant

#### 3. Gastrointestinal Disorders
- **Grahani** (IBS/Sprue) - Altered bowel habits, malabsorption, Agnimandya
- **Amlapitta** (GERD/Acid Peptic Disease) - Heartburn, sour belching, Pitta
- **Parinama Shula** (Duodenal Ulcer) - Pain before meals, relieved by food
- **Bahara Sotha** (Bloating) - Abdominal distension, gas, Kapha Vata

#### 4. Skin Diseases (Kushtha)
- **Vicharchika** (Eczema/Dermatitis) - Itching, oozing, dark patches
- **Ekakushta** (Psoriasis) - Silver scales, plaque, dry lesions
- **Kitibha** (Lichen Planus) - Itching, pigmentation, rough texture

#### 5. Respiratory Disorders
- **Tamaka Shwasa** (Bronchial Asthma) - Breathlessness, wheezing, seasonal
- **Kasa** (Chronic Cough) - Productive/dry cough, throat clearing
- **Rajayakshma** (TB-like symptoms) - Weight loss, fever, cough >2 weeks

#### 6. Mental/Nervous Disorders
- **Vishada** (Depression) - Low mood, anhedonia, loss of interest
- **Unmada** (Psychosis) - Altered behavior, hallucinations
- **Apasmara** (Epilepsy) - Seizures, loss of consciousness

#### 7. Fever (Jwara)
- **Vataja Jwara** - Fever with shivering, body aches, thirst
- **Pittaja Jwara** - High fever, burning sensation, sweating
- **Kaphaja Jwara** - Low-grade fever, heaviness, lethargy

#### 8. Women's Health
- **Artava Dusti** (Menstrual Disorders) - Irregular menses, PCOS
- **Yoni Vyapat** (Vaginal Disorders) - Discharge, itching, infection
- **Vandhya** (Infertility) - Unable to conceive, lifestyle factors

#### 9. Urinary Disorders
- **Mutrakrichra** (Dysuria) - Painful urination, burning
- **Ashmari** (Kidney Stones) - Renal colic, hematuria

#### 10. Heart/Circulatory Disorders
- **Hridroga** (Heart Disease) - Chest pain, palpitations
- **Raktagata Vata** (Hypertension) - High BP, headache, stress

### NCDs (Non-Communicable Diseases)

| Disease | Key Questions |
|---------|--------------|
| **Diabetes (Prameha)** | Thirst (polydipsia), urination (polyuria), weight, fatigue, hunger, family history |
| **Hypertension (Raktagata Vata)** | Headache, dizziness, family history, stress, salt intake, sleep |
| **Heart Disease (Hridroga)** | Chest pain (character), breathlessness, exercise tolerance, palpitations |
| **Stroke (Pakshaghata)** | Weakness one side, facial deviation, speech difficulty, onset time |
| **COPD (Tama Kas)** | Smoking history, breathlessness, cough, sputum, winter exacerbation |
| **Arthritis (Sandhivata)** | Joint pain, stiffness, swelling, function limitation, X-ray findings |
| **Thyroid Disorders** | Weight changes, energy, temperature preference, hair loss, constipation |
| **Obesity (Sthhoulya)** | BMI, weight history, diet, exercise, family history |

---

## Question Bank by Symptom Category

### JOINT/MUSCULOSKELETAL Questions
1. Which joints are affected? (multi-select)
2. Is it bilateral or one side?
3. Morning stiffness duration? (<30min / 30-60min / >1hr)
4. Weather sensitivity? (cold worsens / hot worsens / no change)
5. Joint sounds? (clicking / grating / popping / none)
6. Movement restriction severity? (1-10 scale)
7. Better with rest or activity?
8. Visible swelling or warmth?
9. Redness over joint?
10. History of injury?

### DIGESTIVE Questions
1. Appetite pattern? (normal / increased / decreased / variable)
2. Food cravings? (sweet / sour / salty / spicy / bitter / astringent)
3. Food aversions? (text)
4. Bowel pattern? (daily normal / hard pellets / loose / variable)
5. Incomplete evacuation feeling?
6. Gas/bloating? (frequent / after meals / evening / minimal)
7. Acidity/heartburn? (frequent / after meals / when hungry / rare)
8. Belching pattern?
9. Thirst level? (excessive / normal / low / night thirst)
10. Digestion time? (2-3hr / 3-4hr / >4hr)

### RESPIRATORY Questions
1. Cough type? (dry / productive / both)
2. Sputum color? (clear / white / yellow / green / blood)
3. Breathlessness? (at rest / on exertion / night only)
4. Wheezing present?
5. Chest tightness?
6. Duration of symptoms?
7. Seasonal variation?
8. Night symptoms?
9. Smoking history?
10. Environmental triggers?

### SKIN Questions
1. Lesion location? (localized / generalized)
2. Itching timing? (day / night / both / after certain foods)
3. Seasonal variation?
4. Lesion appearance? (red / dark / raised / flat / weeping)
5. Associated burning?
6. Sleep affected?
7. Previous episodes?
8. Oil application effect?
9. Any triggers identified?
10. Family history of skin conditions?

### CARDIOVASCULAR Questions
1. Chest pain location and character?
2. Radiation to arm/jaw?
3. Breathlessness on exertion?
4. Palpitations awareness?
5. Swelling in feet?
6. Sleep position preference?
7. Exercise tolerance?
8. Stress levels?
9. Family history of heart disease?
10. History of smoking?

### NEUROLOGICAL Questions
1. Headache location?
2. Character? (throbbing / pressure / stabbing)
3. Associated nausea/vomiting?
4. Visual disturbances?
5. Triggers identified?
6. Duration of episode?
7. Frequency?
8. Dizziness type? (spinning / lightheadedness)
9. Numbness location?
10. Weakness in limbs?

### ENDOCRINE/METABOLIC Questions
1. Thirst level?
2. Urination frequency day/night?
3. Weight changes?
4. Fatigue pattern?
5. Hunger pattern?
6. Cold/heat intolerance?
7. Skin changes?
8. Hair loss?
9. Family history of diabetes?
10. Recent illness/stress?

### PSYCHIATRIC Questions
1. Sleep pattern?
2. Mood pattern?
3. Appetite changes?
4. Interest in activities?
5. Energy levels?
6. Concentration?
7. Anxiety levels?
8. Irritability?
9. Suicidal thoughts?
10. Support system?

---

## NCD-Specific Question Sets

### DIABETES (Prameha) Full Question Set
1. Family history of diabetes?
2. Polyuria (frequent urination)?
3. Polydipsia (excessive thirst)?
4. Polyphagia (excessive hunger)?
5. Unexplained weight loss?
6. Fatigue and weakness?
7. Blurry vision?
8. Slow wound healing?
9. Recurrent infections?
10. Tingling/numbness in hands/feet?
11. Dark patches on skin?
12. FBS/PP values from reports?
13. HbA1c value?
14. Current medications?

### HYPERTENSION (Raktagata Vata) Full Question Set
1. Headache, especially morning?
2. Dizziness?
3. Visual disturbances?
4. Family history of BP?
5. Stress levels?
6. Salt intake habits?
7. Exercise routine?
8. Sleep quality?
9. Last BP readings?
10. On BP medications?

### CORONARY HEART DISEASE Full Question Set
1. Chest pain on exertion?
2. Pain relieved by rest?
3. Duration of chest pain episodes?
4. Radiation to left arm/jaw?
5. Breathlessness with activity?
6. Palpitations awareness?
7. Lower limb swelling?
8. BP readings?
9. Lipid profile values?
10. ECG findings if available?
11. Echocardiography findings?

### ARTHRITIS (Sandhivata) Full Question Set
1. Joint pain in knees/hips?
2. Pain worse with activity?
3. No morning stiffness or <30 min?
4. Crepitus on movement?
5. X-ray shows OA changes?
6. Restricted range of motion?
7. Affects walking/daily activities?
8. Obesity or weight gain?
9. Previous injury to joint?

---

## Ashtavidha Pariksha Questions

### Nadi (Pulse)
- "Have you had your pulse examined? What characteristics were noted?"
- "Rate: Slow (<60) / Normal (60-80) / Fast (>80)"
- "Rhythm: Regular / Irregular / Occasionally irregular"
- "Character: Thready (Vata) / Bounding (Pitta) / Slow deep (Kapha)"

### Mootra (Urine)
- "Color: Pale yellow / Dark yellow / Amber / Other"
- "Frequency: Normal / Frequent / Less frequent"
- "Any burning sensation?"
- "Foam in urine?"
- "Night urination frequency?"

### Mala (Stool)
- "Consistency: Well-formed / Hard pellets / Loose / watery"
- "Frequency: Daily / Every other day / Multiple times"
- "Incomplete evacuation?"
- "Blood or mucus?"
- "Color: Brown / Yellow / Black / Pale"

### Jivha (Tongue)
- "Coating: None / White / Yellow / Brown"
- "Color: Pink / Pale / Red / Purple"
- "Teeth marks on sides?"
- "Cracks/fissures?"
- "Self-examination: Clean tongue suggests good digestion"

### Drik (Eyes)
- "Any redness or irritation?"
- "Dryness or excessive tearing?"
- "Dark circles under eyes?"
- "Yellowish tinge to eyes?"
- "Blurred vision?"

### Sparsh (Skin Touch)
- "Prefer warm or cool environment?"
- "Hands/feet usually warm or cold?"
- "Dry skin areas?"
- "Localized heat in any body part?"
- "Any numbness or tingling?"

### Shabda (Voice)
- "Hoarseness present?"
- "Voice weak or strong?"
- "Clarity normal or altered?"
- "Painful to speak?"

### Aakriti (Body Appearance)
- "Body type: Thin / Medium / Heavy set"
- "Weight distribution: Upper/lower body"
- "Facial features: Sharp/soft/medium"
- "Overall energy appearing in eyes?"

---

## Dashavidha Pariksha Questions

### Prakriti
- "Based on your life-long characteristics, what is your natural constitution?"
- Options: Vata, Pitta, Kapha, Vata-Pitta, Pitta-Kapha, Kapha-Vata, Tridosha

### Vikriti
- AI derives from current symptoms

### Saara (Tissue Strength)
- "How would you rate your tissue strength? (Bones, muscles, skin quality)"
- Options: Weak / Moderate / Strong / Variable by tissue type

### Samhanana (Musculature)
- "Describe your body build and musculature."
- Options: Thin / Average / Well-built / Heavyset

### Satva (Mental Strength)
- "How would you describe your mental resilience?"
- Options: Strong / Moderate / Low / Variable

### Ahara Shakti (Digestion)
- "How is your digestive capacity?"
- Options: Strong / Moderate / Weak

### Vyayama Shakti (Exercise)
- "What is your exercise tolerance?"
- Options: High / Moderate / Low

### Vaya (Age)
- From basic info

### Desha (Environment)
- "Where do you live? (Climate, urban/rural)"
- "Occupation nature? (Sedentary/active/stressful)"

---

## Learning System Implementation

### LocalStorage Structure
```typescript
interface CaseStore {
  cases: StoredCase[]
  questionWeights: Record<string, number>
  diagnosisPatterns: DiagnosisPattern[]
  exportData: () => string
  importData: (json: string) => void
}
```

### Feedback Collection
After treatment completion:
1. Doctor rates outcome (1-5)
2. Doctor notes what worked/didn't
3. Any diagnosis corrections
4. System updates patterns

### Pattern Improvement
- Track which symptoms led to correct diagnoses
- Track which questions improved diagnostic accuracy
- Adjust question importance weights
- Store frequent correction patterns

---

## Next Steps

1. Create core infrastructure files (Phase 1)
2. Build API endpoints (Phase 2)
3. Implement UI components (Phase 3)
4. Add learning system (Phase 4)
5. Test with sample cases
6. Gather doctor feedback
7. Iterate and improve

---

## Notes

- All questions should have quick reply suggestions
- AI shows provisional diagnosis early for doctor correction
- Learning system stores corrections for pattern improvement
- PDF analysis highlights abnormal values with Ayurvedic correlation
- Export functionality for sharing case presentations
- Keep question bank expandable for new diseases
- Store learnings locally for privacy and offline use