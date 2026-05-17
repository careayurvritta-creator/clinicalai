# Ayurveda Clinical AI - Knowledge Base & RAG System

## Overview

This is a comprehensive Ayurveda knowledge system designed for the Clinical AI application. It provides a structured, searchable knowledge base covering all aspects of Ayurveda from fundamentals to advanced treatment protocols, including allopathy integration.

---

## Structure

```
src/lib/ayurknowledge/
├── index.ts          # Main exports and query functions
├── fundamentals.ts   # Tridosha, Saptadhatu, Agni, Srotas, Ama
├── diagnostics.ts    # Examination methods, Prakriti assessment
├── diseases.ts       # Disease database with modern correlations
├── herbs.ts          # 15+ core herbs with full pharmacopeia data
├── treatments.ts     # Panchakarma, therapies, lifestyle
└── allopathy.ts      # Drug-herb interactions, integration

src/lib/ayurrag/
├── index.ts          # RAG configuration
└── query-engine.ts   # Query analysis and response generation
```

---

## Features

### ✅ Comprehensive Knowledge Base

1. **Fundamentals**
   - Tridosha (Vata, Pitta, Kapha)
   - Saptadhatu (7 tissues)
   - Agni (Digestive fire) - 4 types
   - Srotas (13 channels)
   - Ama (Toxicity)
   - 8 branches of Ayurveda (Ashtanga)

2. **Diagnostics**
   - Trividha, Ashtavidha, Dashavidha Pariksha
   - Naadi (Pulse) diagnosis with dosha characteristics
   - Prakriti (Constitution) vs Vikriti (Imbalance)

3. **Diseases** (12+ conditions)
   - Prameha (Diabetes), Raktagata Vata (Hypertension)
   - Sandhivata (Arthritis), Amavata (RA)
   - Grahani (IBS), Kushhta (Skin), Swasa (Respiratory)
   - Each with: Samprapti, clinical features, treatment, prognosis

4. **Herbs** (15 core, extensible to 700+)
   - Full pharmacopeia: Rasa, Guna, Virya, Vipaka, Prabhava
   - Dosha karma (effect on each dosha)
   - Indications, dosage, contraindications
   - Drug interactions database

5. **Treatments**
   - Panchakarma: Vamana, Virechana, Basti, Nasya, Raktamokshana
   - Purva Karma: Deepana, Pachana, Snehana, Swedana
   - Rasayana therapies
   - Pathya-Apathya (do's and don'ts)
   - Dinacharya (daily routine)
   - Ritucharya (seasonal routine)

6. **Allopathy Integration**
   - 12+ condition integration protocols
   - Drug-herb interactions database (high/moderate/low risk)
   - Safety warnings and monitoring parameters
   - Schedule E1 drug warnings

### ✅ RAG Query Engine

- **Intent Classification**: diagnosis, treatment, herb, drug_interaction, prakriti, integration
- **Entity Extraction**: Diseases, herbs, treatments
- **Safety Warnings**: Automatic for drug interactions and integrations
- **Context-Aware**: Responds based on user context (prakriti, conditions)

### ✅ Query Functions

```typescript
import { 
  getDiseaseInfo,
  getTreatmentInfo,
  getHerbInteractions,
  checkDrugInteraction,
  getAllopathyIntegration,
  getPrakritiGuidance,
  searchKnowledge,
  generateAyurvedaResponse
} from '@/lib/ayurknowledge'
```

---

## Usage Examples

### Get Disease Information
```typescript
const info = getDiseaseInfo('prameha')
// Returns: Ayurvedic name, samprapti, treatment, prognosis
```

### Check Drug Interactions
```typescript
const interaction = checkDrugInteraction('ashwagandha', 'sedatives')
// Returns: Severity, mechanism, recommendation
```

### Get Allopathy Integration
```typescript
const integration = getAllopathyIntegration('diabetes')
// Returns: Combined treatment approach, safety notes
```

### Get Prakriti Guidance
```typescript
const guidance = getPrakritiGuidance('vata')
// Returns: Personalized recommendations
```

### Generate Complete Response
```typescript
const response = generateAyurvedaResponse(
  'What is the treatment for diabetes in Ayurveda?',
  { prakriti: 'vata', conditions: ['diabetes'] }
)
```

---

## Allopathy Integration - Safety First

### High Risk Interactions ⚠️

| Herb | Drug Class | Effect |
|------|------------|--------|
| St. John's Wort | Warfarin, SSRI, HIV | Enzyme induction |
| Garlic | Warfarin, HIV meds | Bleeding, reduced efficacy |
| Ginkgo | Anticoagulants | Bleeding |
| Kava | Sedatives | CNS depression |

### Moderate Risk Interactions

| Herb | Drug Class | Effect |
|------|------------|--------|
| Ashwagandha | Sedatives, Thyroid | Additive |
| Guggulu | Statins, Anticoagulants | Various |
| Turmeric | Anticoagulants | Bleeding |
| Ginger | Anticoagulants, Diabetes | Bleeding, Hypoglycemia |

---

## Condition Integration Examples

### Diabetes (Prameha/Madhumeha)
- Ayurvedic: Madhumehari chikitsa, Panchakarma
- Herbs: Turmeric, Gymnema, Methi
- Integration: Monitor blood sugar, adjust doses
- Safety: Gymnema may potentiate hypoglycemia

### Hypertension (Raktagata Vata)
- Ayurvedic: Raktashamaka, Basti
- Herbs: Arjuna, Garlic
- Integration: May potentiate antihypertensives
- Safety: Monitor BP closely

### Arthritis (Sandhivata/Amavata)
- Ayurvedic: Vata pacification, Guggulu
- Herbs: Guggulu, Ashwagandha, Shallaki
- Integration: May interact with DMARDs
- Safety: Avoid with immunosuppressants

---

## System Prompt Integration

The system prompt (`SYSTEM_PROMPT` in types.ts) now includes:
- Complete knowledge structure reference
- Drug interaction warnings
- Response format guidelines
- Safety protocols

---

## Next Steps for Enhancement

1. **Add More Data**: Extend herbs to 700+, add more diseases
2. **RAG Pipeline**: Implement vector embeddings and semantic search
3. **User Profiles**: Store Prakriti, conditions, medications
4. **Safety Engine**: Automated interaction checking
5. **Clinical Decision Support**: Treatment recommendations based on Prakriti

---

## Files Created

- `src/lib/ayurknowledge/fundamentals.ts` - Core principles
- `src/lib/ayurknowledge/diagnostics.ts` - Examination methods  
- `src/lib/ayurknowledge/diseases.ts` - Disease database
- `src/lib/ayurknowledge/herbs.ts` - Pharmacopeia & interactions
- `src/lib/ayurknowledge/treatments.ts` - Therapies & lifestyle
- `src/lib/ayurknowledge/allopathy.ts` - Integration & safety
- `src/lib/ayurknowledge/index.ts` - Main exports & functions
- `src/lib/ayurrag/query-engine.ts` - RAG query engine
- `src/lib/ayurrag/index.ts` - RAG configuration

---

## Testing the Knowledge Base

To test, you can query using:
1. Console: `node -e "console.log(require('./src/lib/ayurknowledge').getDiseaseInfo('diabetes'))"`
2. Browser: Check Network tab for API calls
3. Direct: Import functions in any component

---

## Disclaimer

⚠️ This knowledge base is for educational purposes. Always consult qualified practitioners for treatment decisions. Drug interactions should be verified with a pharmacist.