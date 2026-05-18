import type { CaseData, ChiefComplaint } from './types'

export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  id: string
  field: string
  question: string
  type: 'text' | 'select' | 'scale' | 'boolean' | 'multi-select' | 'number'
  options?: QuestionOption[]
  suggestions?: string[]
  severityScale?: { min: number; max: number; default: string }
  validation?: {
    required?: boolean
    min?: number
    max?: number
    pattern?: RegExp
  }
  condition?: (caseData: CaseData) => boolean
  adaptivePrompt?: string
  category?: string
}

export interface QuestionCategory {
  id: string
  name: string
  symptoms: string[]
  questions: Question[]
  examinationNotes: string[]
}

export const BASIC_INFO_QUESTIONS: Question[] = [
  {
    id: 'name',
    field: 'name',
    question: "What is the patient's name?",
    type: 'text',
    validation: { required: true, pattern: /^[A-Za-z\s]+$/ },
    suggestions: ['Enter name'],
  },
  {
    id: 'age',
    field: 'age',
    question: 'How old is the patient?',
    type: 'number',
    validation: { required: true, min: 0, max: 120 },
    suggestions: ['Enter age'],
  },
  {
    id: 'gender',
    field: 'gender',
    question: 'What is the patient\'s gender?',
    type: 'select',
    options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' },
      { value: 'Other', label: 'Other' },
    ],
    suggestions: ['Male', 'Female'],
  },
  {
    id: 'occupation',
    field: 'occupation',
    question: 'What is the patient\'s occupation?',
    type: 'text',
    suggestions: ['Business', 'Service', 'Student', 'Homemaker', 'Retired', 'Other'],
  },
  {
    id: 'area',
    field: 'area',
    question: 'Which area/city does the patient live in?',
    type: 'text',
    suggestions: ['Urban', 'Semi-urban', 'Rural'],
  },
]

export const COMPLAINT_INTRO_QUESTION: Question = {
  id: 'chiefComplaints_intro',
  field: 'chiefComplaints',
  question: 'What brings the patient here today? Please describe all the main concerns in detail.',
  type: 'text',
  validation: { required: true },
  adaptivePrompt: 'Take your time to describe all symptoms and concerns.',
}

export const COMPLAINT_FOLLOWUP_QUESTIONS: Question[] = [
  {
    id: 'duration',
    field: 'duration',
    question: 'How long has the patient been experiencing this?',
    type: 'select',
    options: [
      { value: 'Days', label: 'Days' },
      { value: '1-2 weeks', label: '1-2 weeks' },
      { value: '1 month', label: '1 month' },
      { value: '3-6 months', label: '3-6 months' },
      { value: '6-12 months', label: '6-12 months' },
      { value: '1+ years', label: '1+ years' },
    ],
    suggestions: ['1-2 weeks', '1 month', '3-6 months', '1+ years'],
  },
  {
    id: 'severity',
    field: 'severity',
    question: 'On a scale of 1-10, how would you rate the severity? (1=mild, 10=severe)',
    type: 'scale',
    severityScale: { min: 1, max: 10, default: '5' },
    suggestions: ['1-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)'],
  },
  {
    id: 'location',
    field: 'location',
    question: 'Where is the problem located?',
    type: 'text',
    suggestions: ['Specific body part or area'],
  },
  {
    id: 'onset',
    field: 'onset',
    question: 'How did it start? (sudden/gradual)',
    type: 'select',
    options: [
      { value: 'Sudden', label: 'Sudden (within hours/days)' },
      { value: 'Gradual', label: 'Gradual (over weeks/months)' },
    ],
    suggestions: ['Sudden', 'Gradual'],
  },
  {
    id: 'aggravating',
    field: 'aggravatingFactors',
    question: 'What makes it worse?',
    type: 'text',
    suggestions: ['Cold weather', 'Activity', 'Stress', 'Certain foods', 'No specific trigger'],
  },
  {
    id: 'relieving',
    field: 'relievingFactors',
    question: 'What makes it better?',
    type: 'text',
    suggestions: ['Rest', 'Heat', 'Medication', 'Sleep', 'Nothing helps'],
  },
]

export const JOINT_QUESTIONS: Question[] = [
  {
    id: 'joint_location',
    field: 'jointLocation',
    question: 'Which joints are affected?',
    type: 'multi-select',
    options: [
      { value: 'Small joints (fingers, toes)', label: 'Small joints (fingers, toes)' },
      { value: 'Wrist', label: 'Wrist' },
      { value: 'Elbow', label: 'Elbow' },
      { value: 'Shoulder', label: 'Shoulder' },
      { value: 'Neck', label: 'Neck (cervical)' },
      { value: 'Upper back', label: 'Upper back (thoracic)' },
      { value: 'Lower back', label: 'Lower back (lumbar)' },
      { value: 'Hip', label: 'Hip' },
      { value: 'Knee', label: 'Knee' },
      { value: 'Ankle', label: 'Ankle' },
      { value: 'Multiple', label: 'Multiple large joints' },
      { value: 'Entire body', label: 'Entire body' },
    ],
    suggestions: ['Knee', 'Hip', 'Small joints', 'Multiple'],
  },
  {
    id: 'joint_bilateral',
    field: 'jointBilateral',
    question: 'Is the joint involvement on both sides?',
    type: 'select',
    options: [
      { value: 'Yes, both sides', label: 'Yes, both sides (bilateral)' },
      { value: 'No, one side only', label: 'No, one side only' },
      { value: 'Alternating', label: 'Alternating sides' },
    ],
    suggestions: ['Yes, both sides', 'One side only'],
  },
  {
    id: 'morning_stiffness',
    field: 'morningStiffness',
    question: 'How long does morning stiffness last?',
    type: 'select',
    options: [
      { value: 'Less than 30 minutes', label: 'Less than 30 minutes' },
      { value: '30-60 minutes', label: '30-60 minutes' },
      { value: '1-2 hours', label: '1-2 hours' },
      { value: 'More than 2 hours', label: 'More than 2 hours' },
      { value: 'No morning stiffness', label: 'No morning stiffness' },
    ],
    suggestions: ['Less than 30 min', '30-60 min', '>1 hour'],
  },
  {
    id: 'weather_sensitivity',
    field: 'weatherSensitivity',
    question: 'Does the pain change with weather?',
    type: 'select',
    options: [
      { value: 'Worse in cold/humid', label: 'Worse in cold/humid weather' },
      { value: 'Worse in hot/dry', label: 'Worse in hot/dry weather' },
      { value: 'No relation', label: 'No relation to weather' },
      { value: 'Worse before rain', label: 'Worse before rain' },
    ],
    suggestions: ['Cold worsens', 'Hot worsens', 'No change'],
  },
  {
    id: 'joint_sounds',
    field: 'jointSounds',
    question: 'Do you hear any sounds (crepitus) when moving the joint?',
    type: 'select',
    options: [
      { value: 'Clicking', label: 'Clicking' },
      { value: 'Grating', label: 'Grating' },
      { value: 'Popping', label: 'Popping' },
      { value: 'No sounds', label: 'No sounds' },
    ],
    suggestions: ['Clicking', 'Grating', 'No sounds'],
  },
  {
    id: 'movement_restriction',
    field: 'movementRestriction',
    question: 'Is there difficulty in full range of movement?',
    type: 'scale',
    severityScale: { min: 1, max: 10, default: '5' },
    suggestions: ['1-3 (Mild)', '4-6 (Moderate)', '7-10 (Severe)'],
  },
  {
    id: 'rest_vs_activity',
    field: 'restVsActivity',
    question: 'Is the pain better with rest or activity?',
    type: 'select',
    options: [
      { value: 'Better with rest', label: 'Better with rest, worse with activity (Vata pattern)' },
      { value: 'Better with activity', label: 'Better with activity, worse with rest' },
      { value: 'No change', label: 'No change with rest or activity' },
    ],
    suggestions: ['Better with rest', 'Better with activity'],
  },
  {
    id: 'joint_swelling',
    field: 'jointSwelling',
    question: 'Is there visible swelling or warmth in the joint?',
    type: 'select',
    options: [
      { value: 'Yes, swollen and warm', label: 'Yes, swollen and warm' },
      { value: 'Yes, swollen but not warm', label: 'Yes, swollen but not warm' },
      { value: 'Slight swelling', label: 'Slight swelling' },
      { value: 'No swelling', label: 'No swelling' },
    ],
    suggestions: ['Swollen & warm', 'Swollen not warm', 'No swelling'],
  },
]

export const DIGESTIVE_QUESTIONS: Question[] = [
  {
    id: 'appetite_pattern',
    field: 'appetite',
    question: 'How would you describe the patient\'s appetite?',
    type: 'select',
    options: [
      { value: 'Normal and regular', label: 'Normal and regular' },
      { value: 'Increased', label: 'Increased (always hungry)' },
      { value: 'Decreased', label: 'Decreased (forget to eat)' },
      { value: 'Variable', label: 'Variable' },
      { value: 'No appetite', label: 'No appetite at all' },
    ],
    suggestions: ['Normal', 'Increased', 'Decreased', 'Variable'],
  },
  {
    id: 'food_cravings',
    field: 'foodCravings',
    question: 'Do you have strong cravings for any specific tastes?',
    type: 'multi-select',
    options: [
      { value: 'Sweet', label: 'Sweet' },
      { value: 'Sour', label: 'Sour' },
      { value: 'Salty', label: 'Salty' },
      { value: 'Spicy', label: 'Spicy/Pungent' },
      { value: 'Bitter', label: 'Bitter' },
      { value: 'Astringent', label: 'Astringent' },
    ],
    suggestions: ['Sweet', 'Spicy', 'Sour'],
  },
  {
    id: 'food_aversions',
    field: 'foodAversions',
    question: 'Are there foods you strongly dislike or that cause discomfort?',
    type: 'text',
    suggestions: ['Heavy foods', 'Oily foods', 'Cold drinks'],
  },
  {
    id: 'bowel_pattern',
    field: 'bowelPattern',
    question: 'How would you describe bowel movements?',
    type: 'select',
    options: [
      { value: 'Daily, well-formed', label: 'Daily, well-formed (Normal)' },
      { value: 'Hard, dry pellets', label: 'Hard, dry pellets (Vata constipation)' },
      { value: 'Soft/liquid', label: 'Soft/liquid stools (Pitta/Kapha)' },
      { value: 'Variable', label: 'Variable' },
      { value: 'Constipation', label: 'Constipation requiring effort' },
      { value: 'Urgency with loose', label: 'Urgency with loose stools' },
    ],
    suggestions: ['Normal', 'Hard/dry', 'Loose', 'Variable'],
  },
  {
    id: 'incomplete_evacuation',
    field: 'incompleteEvacuation',
    question: 'Do you feel incomplete evacuation after bowel movement?',
    type: 'select',
    options: [
      { value: 'Yes often', label: 'Yes, often' },
      { value: 'Sometimes', label: 'Sometimes' },
      { value: 'Rarely', label: 'Rarely' },
      { value: 'No', label: 'No' },
    ],
    suggestions: ['Yes often', 'Sometimes', 'No'],
  },
  {
    id: 'gas_bloating',
    field: 'gasBloating',
    question: 'Do you experience gas or bloating?',
    type: 'select',
    options: [
      { value: 'Frequent gas', label: 'Frequent gas throughout day' },
      { value: 'Bloating after meals', label: 'Bloating after meals' },
      { value: 'Bloating worse in evening', label: 'Bloating worse in evening' },
      { value: 'Bloating with specific foods', label: 'Bloating with specific foods' },
      { value: 'Minimal', label: 'Minimal gas' },
    ],
    suggestions: ['Frequent gas', 'Bloating after meals', 'Minimal'],
  },
  {
    id: 'acidity_heartburn',
    field: 'acidity',
    question: 'Do you experience acidity or heartburn?',
    type: 'select',
    options: [
      { value: 'Frequent', label: 'Frequent (daily)' },
      { value: 'After spicy/oily meals', label: 'After spicy/oily meals' },
      { value: 'When hungry', label: 'When hungry' },
      { value: 'When stressed', label: 'When stressed' },
      { value: 'Occasional', label: 'Occasional' },
      { value: 'Rarely', label: 'Rarely/None' },
    ],
    suggestions: ['Daily', 'After meals', 'When hungry', 'Rarely'],
  },
  {
    id: 'thirst',
    field: 'thirst',
    question: 'How is your thirst?',
    type: 'select',
    options: [
      { value: 'Excessive', label: 'Excessive, always drinking' },
      { value: 'Normal', label: 'Normal' },
      { value: 'Low', label: 'Low, forget to drink' },
      { value: 'Variable', label: 'Variable' },
      { value: 'Thirsty at night', label: 'Thirsty at night' },
    ],
    suggestions: ['Excessive', 'Normal', 'Low', 'Night thirst'],
  },
]

export const METABOLIC_QUESTIONS: Question[] = [
  {
    id: 'polyuria',
    field: 'polyuria',
    question: 'Is there frequent urination?',
    type: 'boolean',
    suggestions: ['Yes', 'No', 'Occasionally'],
  },
  {
    id: 'polydipsia',
    field: 'polydipsia',
    question: 'Is there excessive thirst?',
    type: 'boolean',
    suggestions: ['Yes', 'No', 'Occasionally'],
  },
  {
    id: 'weight_changes',
    field: 'weightChanges',
    question: 'Have there been any weight changes recently?',
    type: 'select',
    options: [
      { value: 'Weight loss', label: 'Weight loss' },
      { value: 'Weight gain', label: 'Weight gain' },
      { value: 'No change', label: 'No change' },
    ],
    suggestions: ['Weight loss', 'Weight gain', 'No change'],
  },
  {
    id: 'fatigue',
    field: 'fatigue',
    question: 'How would you describe energy levels?',
    type: 'select',
    options: [
      { value: 'Very energetic', label: 'Very energetic' },
      { value: 'Normal', label: 'Normal energy levels' },
      { value: 'Fatigue', label: 'Easily fatigued' },
      { value: 'Very fatigued', label: 'Very fatigued all the time' },
    ],
    suggestions: ['Normal', 'Fatigue', 'Very fatigued'],
  },
  {
    id: 'wound_healing',
    field: 'woundHealing',
    question: 'Any issues with wound healing?',
    type: 'select',
    options: [
      { value: 'Normal', label: 'Normal healing' },
      { value: 'Slow', label: 'Slow healing' },
      { value: 'Very slow', label: 'Very slow healing' },
    ],
    suggestions: ['Normal', 'Slow', 'Very slow'],
  },
  {
    id: 'tingling_numbness',
    field: 'tinglingNumbness',
    question: 'Any tingling or numbness in hands/feet?',
    type: 'boolean',
    suggestions: ['Yes', 'No', 'Occasionally'],
  },
]

export const RESPIRATORY_QUESTIONS: Question[] = [
  {
    id: 'cough_type',
    field: 'coughType',
    question: 'What type of cough?',
    type: 'select',
    options: [
      { value: 'Dry', label: 'Dry (no sputum)' },
      { value: 'Productive', label: 'Productive (with sputum)' },
      { value: 'Both', label: 'Sometimes dry, sometimes productive' },
    ],
    suggestions: ['Dry', 'Productive', 'Both'],
  },
  {
    id: 'sputum',
    field: 'sputum',
    question: 'What is the sputum like?',
    type: 'select',
    options: [
      { value: 'Clear', label: 'Clear/white' },
      { value: 'Yellow', label: 'Yellow' },
      { value: 'Green', label: 'Green' },
      { value: 'Blood-tinged', label: 'Blood-tinged' },
      { value: 'No sputum', label: 'No sputum' },
    ],
    suggestions: ['Clear', 'Yellow', 'Green', 'Blood-tinged'],
  },
  {
    id: 'breathlessness',
    field: 'breathlessness',
    question: 'When do you experience breathlessness?',
    type: 'select',
    options: [
      { value: 'At rest', label: 'At rest' },
      { value: 'On exertion', label: 'On exertion (walking/stairs)' },
      { value: 'Night only', label: 'Mainly at night' },
      { value: 'All the time', label: 'All the time' },
    ],
    suggestions: ['On exertion', 'Night only', 'At rest'],
  },
  {
    id: 'wheezing',
    field: 'wheezing',
    question: 'Is there wheezing present?',
    type: 'boolean',
    suggestions: ['Yes', 'No'],
  },
  {
    id: 'seasonal_variation',
    field: 'seasonalVariation',
    question: 'Is there seasonal variation in symptoms?',
    type: 'select',
    options: [
      { value: 'Yes', label: 'Yes, worse in certain season' },
      { value: 'No', label: 'No seasonal pattern' },
    ],
    suggestions: ['Yes, worse in winter', 'Yes, worse in monsoon', 'No pattern'],
  },
  {
    id: 'smoking_history',
    field: 'smokingHistory',
    question: 'Smoking history?',
    type: 'select',
    options: [
      { value: 'Never smoker', label: 'Never smoked' },
      { value: 'Former smoker', label: 'Former smoker' },
      { value: 'Current smoker', label: 'Current smoker' },
    ],
    suggestions: ['Never', 'Former', 'Current'],
  },
]

export const SKIN_QUESTIONS: Question[] = [
  {
    id: 'lesion_location',
    field: 'lesionLocation',
    question: 'Where are the lesions located?',
    type: 'text',
    suggestions: ['Localized area', 'Generalized all over'],
  },
  {
    id: 'itching_timing',
    field: 'itchingTiming',
    question: 'When does itching occur?',
    type: 'select',
    options: [
      { value: 'Day only', label: 'Daytime only' },
      { value: 'Night only', label: 'Night only' },
      { value: 'Both day and night', label: 'Both day and night' },
      { value: 'After certain foods', label: 'After certain foods' },
    ],
    suggestions: ['Day', 'Night', 'Both', 'After food'],
  },
  {
    id: 'seasonal_skin',
    field: 'seasonalSkin',
    question: 'Is there seasonal variation?',
    type: 'boolean',
    suggestions: ['Yes, worse in summer', 'Yes, worse in winter', 'No pattern'],
  },
  {
    id: 'lesion_appearance',
    field: 'lesionAppearance',
    question: 'What do the lesions look like?',
    type: 'multi-select',
    options: [
      { value: 'Red', label: 'Red patches' },
      { value: 'Dark', label: 'Dark/colored patches' },
      { value: 'Raised', label: 'Raised/bumps' },
      { value: 'Flat', label: 'Flat patches' },
      { value: 'Weeping', label: 'Weeping/oozing' },
      { value: 'Dry', label: 'Dry and scaly' },
    ],
    suggestions: ['Red', 'Dark', 'Raised', 'Dry'],
  },
  {
    id: 'associated_burning',
    field: 'associatedBurning',
    question: 'Is there associated burning sensation?',
    type: 'boolean',
    suggestions: ['Yes', 'No'],
  },
  {
    id: 'sleep_affected_skin',
    field: 'sleepAffected',
    question: 'Does the itching affect sleep?',
    type: 'boolean',
    suggestions: ['Yes, significantly', 'A little', 'No'],
  },
]

export const CARDIOVASCULAR_QUESTIONS: Question[] = [
  {
    id: 'chest_pain',
    field: 'chestPain',
    question: 'Is there chest pain? Describe its character.',
    type: 'select',
    options: [
      { value: 'Crushing/pressure', label: 'Crushing/pressure sensation' },
      { value: 'Sharp', label: 'Sharp stabbing pain' },
      { value: 'Burning', label: 'Burning sensation' },
      { value: 'None', label: 'No chest pain' },
    ],
    suggestions: ['Crushing/pressure', 'Sharp', 'Burning', 'None'],
  },
  {
    id: 'pain_radiation',
    field: 'painRadiation',
    question: 'Does the pain radiate to any other area?',
    type: 'select',
    options: [
      { value: 'Left arm', label: 'Left arm' },
      { value: 'Jaw', label: 'Jaw' },
      { value: 'Back', label: 'Back' },
      { value: 'No radiation', label: 'No radiation' },
    ],
    suggestions: ['Left arm', 'Jaw', 'Back', 'No radiation'],
  },
  {
    id: 'palpitations',
    field: 'palpitations',
    question: 'Are palpitations experienced?',
    type: 'select',
    options: [
      { value: 'Yes, frequently', label: 'Yes, frequently' },
      { value: 'Yes, occasionally', label: 'Yes, occasionally' },
      { value: 'Rarely', label: 'Rarely' },
      { value: 'No', label: 'No palpitations' },
    ],
    suggestions: ['Frequently', 'Occasionally', 'No'],
  },
  {
    id: 'exercise_tolerance',
    field: 'exerciseTolerance',
    question: 'What is exercise tolerance?',
    type: 'select',
    options: [
      { value: 'Normal', label: 'Normal - can climb stairs without breathlessness' },
      { value: 'Reduced', label: 'Reduced - gets breathless on exertion' },
      { value: 'Severely reduced', label: 'Severely reduced - breathlessness at rest or minimal activity' },
    ],
    suggestions: ['Normal', 'Reduced', 'Severely reduced'],
  },
  {
    id: 'lower_limb_swelling',
    field: 'lowerLimbSwelling',
    question: 'Is there swelling in feet/ankles?',
    type: 'boolean',
    suggestions: ['Yes', 'No'],
  },
]

export const ASHTAVIDHA_QUESTIONS: Question[] = [
  {
    id: 'nadi',
    field: 'nadi',
    question: 'Nadi (Pulse): What characteristics were noted?',
    type: 'select',
    options: [
      { value: 'Vata (thready, fast, irregular)', label: 'Vata - Thready, fast, irregular' },
      { value: 'Pitta (bounding, moderate)', label: 'Pitta - Bounding, moderate rate' },
      { value: 'Kapha (slow, deep, steady)', label: 'Kapha - Slow, deep, steady' },
      { value: 'Mixed/Difficult to tell', label: 'Mixed/Difficult to determine' },
    ],
    condition: (caseData) => !caseData.nadi,
    suggestions: ['Vata', 'Pitta', 'Kapha', 'Not sure'],
  },
  {
    id: 'mootra',
    field: 'mootra',
    question: 'Mootra (Urine): Describe characteristics.',
    type: 'select',
    options: [
      { value: 'Normal - pale yellow', label: 'Normal - pale yellow' },
      { value: 'Dark yellow', label: 'Dark yellow' },
      { value: 'Frequent urination', label: 'Frequent urination' },
      { value: 'Burning present', label: 'Burning sensation' },
      { value: 'Foam present', label: 'Foam in urine' },
    ],
    condition: (caseData) => !caseData.mootra && !caseData.investigations.some(i => i.parameter.toLowerCase().includes('urine')),
    suggestions: ['Normal', 'Dark', 'Frequent', 'Burning'],
  },
  {
    id: 'mala',
    field: 'mala',
    question: 'Mala (Stool): What are the stool characteristics?',
    type: 'select',
    options: [
      { value: 'Normal daily', label: 'Normal daily' },
      { value: 'Constipation', label: 'Constipation' },
      { value: 'Loose', label: 'Loose/watery' },
      { value: 'Variable', label: 'Variable' },
    ],
    condition: (caseData) => !caseData.mala,
    suggestions: ['Normal', 'Constipation', 'Loose', 'Variable'],
  },
  {
    id: 'jivha',
    field: 'jivha',
    question: 'Jivha (Tongue): Any coating or changes observed?',
    type: 'select',
    options: [
      { value: 'Clean', label: 'Clean tongue' },
      { value: 'White coating', label: 'White coating' },
      { value: 'Yellow coating', label: 'Yellow coating' },
      { value: 'Brown/black', label: 'Brown/black coating' },
      { value: 'Teeth marks', label: 'Teeth marks on sides' },
    ],
    condition: (caseData) => !caseData.jivha,
    suggestions: ['Clean', 'White coating', 'Yellow coating', 'Not sure'],
  },
  {
    id: 'drik',
    field: 'drik',
    question: 'Drik (Eyes): Any changes in eyes?',
    type: 'select',
    options: [
      { value: 'Normal', label: 'Normal' },
      { value: 'Redness', label: 'Redness/irritation' },
      { value: 'Yellowish', label: 'Yellowish tinge' },
      { value: 'Dry eyes', label: 'Dry eyes' },
      { value: 'Dark circles', label: 'Dark circles' },
    ],
    condition: (caseData) => !caseData.drik,
    suggestions: ['Normal', 'Redness', 'Yellowish', 'Dark circles'],
  },
  {
    id: 'sparsh',
    field: 'sparSh',
    question: 'Sparsh (Skin temperature): Preference for environment?',
    type: 'select',
    options: [
      { value: 'Prefers warmth', label: 'Prefers warm environment' },
      { value: 'Prefers cool', label: 'Prefers cool environment' },
      { value: 'No preference', label: 'No particular preference' },
    ],
    condition: (caseData) => !caseData.sparSh,
    suggestions: ['Warm environment', 'Cool environment', 'No preference'],
  },
  {
    id: 'shabda',
    field: 'shabda',
    question: 'Shabda (Voice): Any changes in voice?',
    type: 'select',
    options: [
      { value: 'Normal', label: 'Normal' },
      { value: 'Hoarse', label: 'Hoarse' },
      { value: 'Weak', label: 'Weak voice' },
      { value: 'Other', label: 'Other changes' },
    ],
    condition: (caseData) => !caseData.shabda,
    suggestions: ['Normal', 'Hoarse', 'Weak'],
  },
  {
    id: 'aakriti',
    field: 'aakriti',
    question: 'Aakriti (Body build): How would you describe body type?',
    type: 'select',
    options: [
      { value: 'Thin', label: 'Thin/Slight' },
      { value: 'Medium', label: 'Medium built' },
      { value: 'Heavy', label: 'Heavy/Robust' },
    ],
    condition: (caseData) => !caseData.aakriti,
    suggestions: ['Thin', 'Medium', 'Heavy'],
  },
]

export const DASHVIDHA_QUESTIONS: Question[] = [
  {
    id: 'prakriti_detail',
    field: 'prakritiDetail',
    question: 'Based on lifelong characteristics, what is the natural constitution?',
    type: 'select',
    options: [
      { value: 'Vata', label: 'Vata' },
      { value: 'Pitta', label: 'Pitta' },
      { value: 'Kapha', label: 'Kapha' },
      { value: 'Vata-Pitta', label: 'Vata-Pitta' },
      { value: 'Pitta-Kapha', label: 'Pitta-Kapha' },
      { value: 'Kapha-Vata', label: 'Kapha-Vata' },
      { value: 'Tridosha', label: 'Tridosha' },
      { value: 'Not sure', label: 'Not sure' },
    ],
    condition: (caseData) => !caseData.prakritiDetail,
    suggestions: ['Vata', 'Pitta', 'Kapha', 'Vata-Pitta'],
  },
  {
    id: 'saara',
    field: 'saara',
    question: 'Saara (Tissue strength): How is overall tissue strength?',
    type: 'select',
    options: [
      { value: 'Weak', label: 'Weak - bones/muscles feel weak' },
      { value: 'Moderate', label: 'Moderate' },
      { value: 'Strong', label: 'Strong - good tissue strength' },
    ],
    condition: (caseData) => !caseData.saara,
    suggestions: ['Weak', 'Moderate', 'Strong'],
  },
  {
    id: 'samhanana',
    field: 'samhanana',
    question: 'Samhanana (Musculature): Body build description?',
    type: 'select',
    options: [
      { value: 'Thin', label: 'Thin - less musculature' },
      { value: 'Average', label: 'Average' },
      { value: 'Well-built', label: 'Well-built' },
      { value: 'Heavyset', label: 'Heavy set' },
    ],
    condition: (caseData) => !caseData.samhanana,
    suggestions: ['Thin', 'Average', 'Well-built', 'Heavyset'],
  },
  {
    id: 'satva',
    field: 'satva',
    question: 'Satva (Mental strength): How is mental resilience?',
    type: 'select',
    options: [
      { value: 'Low', label: 'Low - gets anxious/stressed easily' },
      { value: 'Moderate', label: 'Moderate' },
      { value: 'High', label: 'High - handles stress well' },
    ],
    condition: (caseData) => !caseData.satva,
    suggestions: ['Low', 'Moderate', 'High'],
  },
  {
    id: 'ahara_shakti',
    field: 'aharaShakti',
    question: 'Ahara Shakti (Digestion capacity): How is digestive ability?',
    type: 'select',
    options: [
      { value: 'Strong', label: 'Strong - digests anything easily' },
      { value: 'Moderate', label: 'Moderate - sometimes difficulty' },
      { value: 'Weak', label: 'Weak - frequent digestive issues' },
    ],
    condition: (caseData) => !caseData.aharaShakti,
    suggestions: ['Strong', 'Moderate', 'Weak'],
  },
  {
    id: 'vyayama_shakti',
    field: 'vyayamaShakti',
    question: 'Vyayama Shakti (Exercise tolerance): What is exercise capacity?',
    type: 'select',
    options: [
      { value: 'High', label: 'High - can exercise vigorously' },
      { value: 'Moderate', label: 'Moderate - regular walks/light exercise' },
      { value: 'Low', label: 'Low - gets tired easily' },
    ],
    condition: (caseData) => !caseData.vyayamaShakti,
    suggestions: ['High', 'Moderate', 'Low'],
  },
]

export const MEDICAL_HISTORY_QUESTIONS: Question[] = [
  {
    id: 'comorbidities',
    field: 'comorbidities',
    question: 'Any known medical conditions? (Diabetes, BP, Thyroid, Heart disease, etc.)',
    type: 'multi-select',
    options: [
      { value: 'Diabetes', label: 'Diabetes' },
      { value: 'Hypertension', label: 'Hypertension (High BP)' },
      { value: 'Thyroid', label: 'Thyroid disorders' },
      { value: 'Heart disease', label: 'Heart disease' },
      { value: 'Kidney disease', label: 'Kidney disease' },
      { value: 'Liver disease', label: 'Liver disease' },
      { value: 'None', label: 'None known' },
    ],
    suggestions: ['Diabetes', 'Hypertension', 'Thyroid', 'Heart disease'],
  },
  {
    id: 'ongoing_medications',
    field: 'ongoingMedications',
    question: 'Currently taking any medications?',
    type: 'text',
    suggestions: ['No medications', 'Allopathic', 'Ayurvedic', 'Both'],
  },
  {
    id: 'allergies',
    field: 'allergies',
    question: 'Any known allergies? (Medications, foods, substances)',
    type: 'text',
    suggestions: ['No allergies', 'Drug allergies', 'Food allergies'],
  },
  {
    id: 'family_history',
    field: 'familyHistory',
    question: 'Family history of any significant diseases?',
    type: 'text',
    suggestions: ['No significant family history', 'Diabetes', 'BP/Heart disease', 'Cancer'],
  },
]

export const QUESTION_CATEGORIES: QuestionCategory[] = [
  {
    id: 'joint',
    name: 'Joint/Musculoskeletal',
    symptoms: ['joint pain', 'knee pain', 'back pain', 'arthritis', 'stiffness', 'swelling'],
    questions: JOINT_QUESTIONS,
    examinationNotes: ['Morning stiffness duration', 'Joint sounds', 'Range of motion'],
  },
  {
    id: 'digestive',
    name: 'Gastrointestinal',
    symptoms: ['acidity', 'bloating', 'constipation', 'gas', 'stomach pain', 'digestion'],
    questions: DIGESTIVE_QUESTIONS,
    examinationNotes: ['Appetite pattern', 'Bowel habits', 'Tongue examination'],
  },
  {
    id: 'metabolic',
    name: 'Metabolic/Endocrine',
    symptoms: ['diabetes', 'thyroid', 'weight', 'thirst', 'fatigue', 'metabolism'],
    questions: METABOLIC_QUESTIONS,
    examinationNotes: ['Thirst levels', 'Weight changes', 'Energy levels'],
  },
  {
    id: 'respiratory',
    name: 'Respiratory',
    symptoms: ['cough', 'breathlessness', 'asthma', 'wheezing', 'cold', 'respiratory'],
    questions: RESPIRATORY_QUESTIONS,
    examinationNotes: ['Cough type', 'Breathlessness pattern', 'Voice changes'],
  },
  {
    id: 'skin',
    name: 'Dermatological',
    symptoms: ['skin', 'rash', 'itching', 'lesion', 'allergy', 'dermatitis'],
    questions: SKIN_QUESTIONS,
    examinationNotes: ['Lesion characteristics', 'Itching pattern', 'Skin examination'],
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular',
    symptoms: ['chest pain', 'heart', 'palpitations', 'breathlessness', 'edema', 'blood pressure'],
    questions: CARDIOVASCULAR_QUESTIONS,
    examinationNotes: ['Chest pain characteristics', 'Exercise tolerance', 'Swelling'],
  },
]

export function getQuestionsForComplaint(complaint: string): Question[] {
  const lowerComplaint = complaint.toLowerCase()
  
  for (const category of QUESTION_CATEGORIES) {
    for (const symptom of category.symptoms) {
      if (lowerComplaint.includes(symptom)) {
        return category.questions
      }
    }
  }
  
  return []
}

export function getQuestionsForDisease(diseaseKeywords: string[]): Question[] {
  const questions: Question[] = []
  
  for (const keyword of diseaseKeywords) {
    const lowerKeyword = keyword.toLowerCase()
    
    if (lowerKeyword.includes('diabetes') || lowerKeyword.includes('prameha') || lowerKeyword.includes('madhu')) {
      questions.push(...METABOLIC_QUESTIONS)
    }
    if (lowerKeyword.includes('joint') || lowerKeyword.includes('arthritis') || lowerKeyword.includes('sandhi')) {
      questions.push(...JOINT_QUESTIONS)
    }
    if (lowerKeyword.includes('digest') || lowerKeyword.includes('grahani') || lowerKeyword.includes('amlapitta')) {
      questions.push(...DIGESTIVE_QUESTIONS)
    }
    if (lowerKeyword.includes('skin') || lowerKeyword.includes('kushtha')) {
      questions.push(...SKIN_QUESTIONS)
    }
    if (lowerKeyword.includes('respiratory') || lowerKeyword.includes('shwasa') || lowerKeyword.includes('kasa')) {
      questions.push(...RESPIRATORY_QUESTIONS)
    }
    if (lowerKeyword.includes('heart') || lowerKeyword.includes('hrid')) {
      questions.push(...CARDIOVASCULAR_QUESTIONS)
    }
  }
  
  return questions
}

export function getNextQuestion(
  caseData: CaseData,
  currentStep: number,
  pendingComplaints: string[]
): Question | null {
  if (currentStep === 0 && !caseData.name) {
    return BASIC_INFO_QUESTIONS[0]
  }
  
  if (currentStep === 1 && !caseData.age) {
    return BASIC_INFO_QUESTIONS[1]
  }
  
  if (currentStep === 2 && !caseData.gender) {
    return BASIC_INFO_QUESTIONS[2]
  }
  
  if (currentStep === 3 && !caseData.occupation) {
    return BASIC_INFO_QUESTIONS[3]
  }
  
  if (currentStep === 4 && !caseData.area) {
    return BASIC_INFO_QUESTIONS[4]
  }
  
  if (caseData.chiefComplaints.length === 0) {
    return COMPLAINT_INTRO_QUESTION
  }
  
  if (pendingComplaints.length > 0) {
    const symptomQuestions = getQuestionsForComplaint(pendingComplaints[0])
    if (symptomQuestions.length > 0) {
      return symptomQuestions[0]
    }
  }
  
  const unaskedAshtavidha = ASHTAVIDHA_QUESTIONS.filter(q => {
    if (q.condition) {
      return q.condition(caseData)
    }
    return !caseData[q.field as keyof CaseData]
  })
  
  if (unaskedAshtavidha.length > 0) {
    return unaskedAshtavidha[0]
  }
  
  const unaskedDashavidha = DASHVIDHA_QUESTIONS.filter(q => {
    if (q.condition) {
      return q.condition(caseData)
    }
    return !caseData[q.field as keyof CaseData]
  })
  
  if (unaskedDashavidha.length > 0) {
    return unaskedDashavidha[0]
  }
  
  if (!caseData.comorbidities || caseData.comorbidities.length === 0) {
    return MEDICAL_HISTORY_QUESTIONS[0]
  }
  
  if (!caseData.ongoingMedications) {
    return MEDICAL_HISTORY_QUESTIONS[1]
  }
  
  return null
}