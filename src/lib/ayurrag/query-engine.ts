import {
  AYURVEDA_KNOWLEDGE,
  getDiseaseInfo,
  getTreatmentInfo,
  getHerbInteractions,
  checkDrugInteraction,
  getAllopathyIntegration,
  getPrakritiGuidance,
  searchKnowledge
} from '../ayurknowledge'

export interface QueryAnalysis {
  intent: 'diagnosis' | 'treatment' | 'herb' | 'drug_interaction' | 'prakriti' | 'integration' | 'general' | 'procedure'
  entities: string[]
  context: string[]
  requiresSafetyWarning: boolean
  complexity: 'simple' | 'moderate' | 'complex'
}

export function analyzeQuery(query: string): QueryAnalysis {
  const lowerQuery = query.toLowerCase()
  
  const intents = {
    diagnosis: ['diagnosis', 'diagnose', 'symptom', 'disease', 'what is', 'caused by', 'treatment for'],
    treatment: ['treatment', 'therapy', 'chikitsa', 'manage', 'cure', 'panchakarma', 'basti', 'vamana', 'virechana'],
    herb: ['herb', 'medicine', 'drug', ' formulation', 'churna', 'ghrita', 'taila', 'ayush', 'herbal'],
    drug_interaction: ['interaction', 'side effect', 'combine', 'with allopathy', 'with medicine', 'with tablet', 'with syrup'],
    prakriti: ['prakriti', 'constitution', 'body type', 'vata', 'pitta', 'kapha', 'dosha'],
    integration: ['allopathy', 'modern medicine', 'with english medicine', 'integrate', 'with modern', 'combine'],
    procedure: ['procedure', 'how to', 'process', 'steps', 'method', 'protocol']
  }

  let intent: QueryAnalysis['intent'] = 'general'
  for (const [key, patterns] of Object.entries(intents)) {
    if (patterns.some(p => lowerQuery.includes(p))) {
      intent = key as QueryAnalysis['intent']
      break
    }
  }

  const requiresSafetyWarning = ['drug_interaction', 'integration', 'treatment'].includes(intent)
  const complexity = intent === 'general' ? 'simple' : 
                    ['herb', 'prakriti'].includes(intent) ? 'moderate' : 'complex'

  return {
    intent,
    entities: extractEntities(query),
    context: [],
    requiresSafetyWarning,
    complexity
  }
}

function extractEntities(query: string): string[] {
  const entities: string[] = []
  
  // Extract disease names
  for (const disease of AYURVEDA_KNOWLEDGE.diseases) {
    if (query.toLowerCase().includes(disease.name.toLowerCase()) ||
        query.toLowerCase().includes(disease.sanskrit.toLowerCase())) {
      entities.push(disease.name)
    }
  }
  
  // Extract herb names
  for (const herb of AYURVEDA_KNOWLEDGE.herbs) {
    if (query.toLowerCase().includes(herb.name.toLowerCase()) ||
        query.toLowerCase().includes(herb.sanskrit.toLowerCase())) {
      entities.push(herb.name)
    }
  }
  
  // Extract treatment names
  for (const treatment of AYURVEDA_KNOWLEDGE.treatments) {
    if (query.toLowerCase().includes(treatment.name.toLowerCase()) ||
        query.toLowerCase().includes(treatment.sanskrit.toLowerCase())) {
      entities.push(treatment.name)
    }
  }
  
  return entities
}

export function generateAyurvedaResponse(query: string, userContext?: { prakriti?: string; conditions?: string[] }): string {
  const analysis = analyzeQuery(query)
  let response = ''
  
  switch (analysis.intent) {
    case 'diagnosis':
      const diseaseInfo = analysis.entities.length > 0 
        ? getDiseaseInfo(analysis.entities[0])
        : null
      response = diseaseInfo || searchKnowledge(query)
      break
      
    case 'treatment':
      const treatmentInfo = analysis.entities.length > 0
        ? getTreatmentInfo(analysis.entities[0])
        : null
      response = treatmentInfo || searchKnowledge(query)
      break
      
    case 'herb':
      response = searchKnowledge(query)
      break
      
    case 'drug_interaction':
      const herbName = analysis.entities[0] || extractDrugFromQuery(query)
      const drugClass = extractDrugClassFromQuery(query)
      response = checkDrugInteraction(herbName, drugClass)
      break
      
    case 'prakriti':
      if (analysis.entities.length > 0) {
        response = getPrakritiGuidance(analysis.entities[0])
      } else if (userContext?.prakriti) {
        response = getPrakritiGuidance(userContext.prakriti)
      } else {
        response = explainPrakriti(query)
      }
      break
      
    case 'integration':
      const condition = analysis.entities.length > 0 
        ? analysis.entities[0]
        : extractConditionFromQuery(query)
      const integration = getAllopathyIntegration(condition)
      response = integration || searchKnowledge(query)
      break
      
    case 'procedure':
      response = explainProcedure(query)
      break
      
    default:
      response = generateGeneralResponse(query, userContext)
  }

  // Add safety warnings if needed
  if (analysis.requiresSafetyWarning) {
    response += SAFETY_WARNING
  }

  return response
}

function extractDrugFromQuery(query: string): string {
  const drugs = ['ashwagandha', 'turmeric', 'ginger', 'garlic', 'guggulu', 'triphala', 'shatavari', 'guduchi', 'brahmi', 'amla', 'arjuna', 'neem', 'pippali']
  for (const drug of drugs) {
    if (query.toLowerCase().includes(drug)) return drug
  }
  return ''
}

function extractDrugClassFromQuery(query: string): string {
  const classes: [string, string][] = [
    ['aspirin', 'Anticoagulants'],
    ['warfarin', 'Anticoagulants'],
    ['metformin', 'Hypoglycemics'],
    ['insulin', 'Hypoglycemics'],
    ['thyroid', 'Thyroid medications'],
    ['sedative', 'Sedatives'],
    ['antidepressant', 'Antidepressants'],
    ['statins', 'Statins'],
    ['blood pressure', 'Antihypertensives'],
    ['antibiotic', 'Antibiotics']
  ]
  
  for (const [keyword, className] of classes) {
    if (query.toLowerCase().includes(keyword)) return className
  }
  
  return 'Allopathic medication'
}

function extractConditionFromQuery(query: string): string {
  const conditions = ['diabetes', 'hypertension', 'arthritis', 'depression', 'anxiety', 'asthma', 'thyroid', 'cancer', 'fertility', 'insomnia']
  for (const cond of conditions) {
    if (query.toLowerCase().includes(cond)) return cond
  }
  return query
}

function explainPrakriti(query: string): string {
  return `
Prakriti (Constitution) Assessment:

Your inherent constitution (Prakriti) is determined at conception and remains unchanged throughout life. It influences:
- Your physical body structure
- Your mental tendencies
- Your disease susceptibility
- Your treatment response

Three Main Types:
1. Vata - Movement, creativity, quick learning
2. Pitta - Transformation, intelligence, leadership  
3. Kapha - Structure, stability, good memory

Most people are dual types (e.g., Vata-Pitta).

To determine your Prakriti, I need to assess:
- Physical characteristics (body build, skin, hair)
- Physiological patterns (digestion, sleep, energy)
- Psychological traits (mindset, emotions, memory)

Would you like me to guide you through a Prakriti assessment questionnaire?

Alternatively, if you already know your Prakriti, I can provide personalized recommendations.
  `.trim()
}

function explainProcedure(query: string): string {
  const lower = query.toLowerCase()
  
  if (lower.includes('panchakarma')) {
    return `
Panchakarma (5 Purifying Therapies):

Panchakarma is the cornerstone of Ayurvedic treatment. It involves:

1. Vamana (Therapeutic Emesis) - Eliminates Kapha
2. Virechana (Purgation) - Eliminates Pitta  
3. Basti (Medicated Enema) - Eliminates Vata
4. Nasya (Nasal Therapy) - Cleans head region
5. Raktamokshana (Bloodletting) - Purifies blood

Process:
1. Purva Karma (Preparation) - Oilation & fomentation
2. Pradhana Karma (Main treatment)
3. Paschat Karma (After-care - diet & lifestyle)

Duration: 7-21 days for each therapy
Must be done under qualified supervision

Would you like details on a specific therapy?
    `.trim()
  }
  
  return 'Please specify which Ayurvedic procedure or therapy you want to learn about.'
}

function generateGeneralResponse(query: string, userContext?: { prakriti?: string; conditions?: string[] }): string {
  const lowerQuery = query.toLowerCase()
  
  // Check for specific terms
  if (lowerQuery.includes('dosha') || lowerQuery.includes('tridosha')) {
    return `
Tridosha - Three Fundamental Principles:

1. VATA (Air + Space) - Movement
   Qualities: Dry, light, cold, rough
   Functions: Circulation, nerve impulses, elimination
   Imbalance: Anxiety, constipation, arthritis

2. PITTA (Fire + Water) - Transformation  
   Qualities: Hot, sharp, oily
   Functions: Digestion, metabolism, vision
   Imbalance: Ulcers, inflammation, anger

3. KAPHA (Earth + Water) - Structure
   Qualities: Heavy, slow, cold, oily
   Functions: Growth, immunity, lubrication
   Imbalance: Weight gain, congestion, depression

Balance of all three is essential for health.
    `.trim()
  }
  
  if (lowerQuery.includes('agni')) {
    return `
Agni (Digestive Fire):

Agni is the digestive capacity that determines:
- How well you digest food
- How efficiently you absorb nutrients
- Your immunity and vitality

Types of Agni:
1. Samagni (Balanced) - Ideal
2. Mandagni (Weak) - Slow digestion
3. Tikshnagni (Strong) - Rapid digestion
4. Vishamagni (Irregular) - Variable

Strengthen Agni through:
- Warm cooked foods
- Proper meal timing
- Avoiding overeating
- Herbs: Ginger, Pippali, Triphala

Would you like a specific Agni assessment?
    `.trim()
  }
  
  if (lowerQuery.includes('ama')) {
    return `
Ama (Toxicity):

Ama is undigested metabolic waste that accumulates when Agni is weak. It clogs channels (srotas) and creates disease.

Signs of Ama:
- Heaviness, lethargy
- Foggy mind
- Coated tongue
- Bad breath
- Low digestion
- Skin issues

Eliminate Ama through:
- Light fasting or kitchari diet
- Ginger, cinnamon, cardamom
- Adequate hydration
- Exercise
- Panchakarma

Would you like ama reduction recommendations?
    `.trim()
  }
  
  if (lowerQuery.includes('diagnos') || lowerQuery.includes('examination') || lowerQuery.includes('pariksha')) {
    return `
Ayurvedic Diagnostic Methods:

Ashtavidha Pariksha (8-fold examination):
1. Naadi (Pulse) - Vata, Pitta, Kapha characteristics
2. Mootra (Urine) - Color, consistency
3. Mala (Stool) - Digestion indicator
4. Jivha (Tongue) - Coating, color
5. Drik (Eyes) - Health indicator
6. Shabda (Voice) - Body state
7. Sparsh (Skin) - Temperature, texture
8. Aakriti (Body build) - Constitution

Trividha Pariksha:
- Prashna (Questioning)
- Darshana (Observation)
- Sparsha (Palpation)

Would you like me to explain any specific diagnostic method?
    `.trim()
  }
  
  return `
Welcome to Clinical AI - Your Ayurvedic Assistant!

I can help you with:

🏥 DISEASES
- Ayurvedic diagnosis and correlation with modern conditions
- Treatment approaches and prognosis

🌿 HERBS & MEDICATIONS
- Herb information and indications
- Drug interactions (herb-herb, herb-allopathy)

💊 TREATMENTS
- Panchakarma procedures
- Detoxification protocols
- Rejuvenation therapies

🩺 ALLOPATHY INTEGRATION
- Combining Ayurveda with modern medicine
- Safety warnings and monitoring

📋 YOUR CONSTITUTION
- Prakriti (body type) assessment
- Personalized recommendations

What would you like to know more about?
  `.trim()
}

const SAFETY_WARNING = `

---
⚠️ IMPORTANT SAFETY NOTICE:
This information is for educational purposes only. Please consult qualified Ayurvedic and modern medicine practitioners before combining treatments. Individual responses may vary. Not a substitute for professional medical advice.
`.trim()

export function formatResponseForDisplay(response: string): string {
  // Add markdown formatting for better display
  let formatted = response
  
  // Format section headers
  formatted = formatted.replace(/=== /g, '## ').replace(/ ===/g, '')
  
  // Format list items
  formatted = formatted.replace(/^- /g, '• ')
  formatted = formatted.replace(/^• /gm, (match) => match.replace('•', '- '))
  
  return formatted
}