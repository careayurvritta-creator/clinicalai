import { createServerClient } from './client'

let _supabase: ReturnType<typeof createServerClient> | null = null
function getSupabase() {
  if (!_supabase) _supabase = createServerClient()
  return _supabase
}

// ============================================
// PROFILES
// ============================================
export async function getProfile(userId: string) {
  return getSupabase()
    .from('profiles')
    .select('*')
    .eq('auth_user_id', userId)
    .single()
}

export async function updateProfile(userId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('profiles')
    .update(data)
    .eq('auth_user_id', userId)
    .select()
    .single()
}

// ============================================
// PATIENTS
// ============================================
export async function getPatients(doctorId: string) {
  return getSupabase()
    .from('patients')
    .select('*')
    .eq('doctor_id', doctorId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
}

export async function getPatient(patientId: string) {
  return getSupabase()
    .from('patients')
    .select('*')
    .eq('id', patientId)
    .single()
}

function calculateAndSetBMI(data: Record<string, unknown>): Record<string, unknown> {
  const height = data.height_cm as number | undefined
  const weight = data.weight_kg as number | undefined
  if (height && weight && height > 0) {
    const heightM = height / 100
    data.bmi = Math.round((weight / (heightM * heightM)) * 10) / 10
  }
  return data
}

export async function createPatient(data: Record<string, unknown>) {
  return getSupabase()
    .from('patients')
    .insert(calculateAndSetBMI(data))
    .select()
    .single()
}

export async function updatePatient(patientId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('patients')
    .update(calculateAndSetBMI(data))
    .eq('id', patientId)
    .select()
    .single()
}

export async function searchPatients(doctorId: string, query: string) {
  return getSupabase()
    .from('patients')
    .select('*')
    .eq('doctor_id', doctorId)
    .ilike('name', `%${query}%`)
    .order('name')
}

// ============================================
// CASES
// ============================================
export async function getCases(doctorId: string, status?: string) {
  let query = getSupabase()
    .from('cases')
    .select(`
      *,
      patients (name, age, gender, patient_code)
    `)
    .eq('doctor_id', doctorId)
    .order('created_at', { ascending: false })

  if (status) {
    query = query.eq('status', status)
  }

  return query
}

export async function getCase(caseId: string) {
  return getSupabase()
    .from('cases')
    .select(`
      *,
      patients (*),
      chief_complaints (*),
      investigation_findings (*),
      treatment_protocols (*),
      case_outcomes (*)
    `)
    .eq('id', caseId)
    .single()
}

export async function createCase(data: Record<string, unknown>) {
  return getSupabase()
    .from('cases')
    .insert(data)
    .select()
    .single()
}

export async function updateCase(caseId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('cases')
    .update(data)
    .eq('id', caseId)
    .select()
    .single()
}

export async function getCasesByPatient(patientId: string) {
  return getSupabase()
    .from('cases')
    .select('*')
    .eq('patient_id', patientId)
    .order('visit_date', { ascending: false })
}

// ============================================
// CHIEF COMPLAINTS
// ============================================
export async function getChiefComplaints(caseId: string) {
  return getSupabase()
    .from('chief_complaints')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at')
}

export async function createChiefComplaint(data: Record<string, unknown>) {
  return getSupabase()
    .from('chief_complaints')
    .insert(data)
    .select()
    .single()
}

// ============================================
// INVESTIGATION FINDINGS
// ============================================
export async function getInvestigationFindings(caseId: string) {
  return getSupabase()
    .from('investigation_findings')
    .select('*')
    .eq('case_id', caseId)
    .order('report_date', { ascending: false })
}

export async function createInvestigationFinding(data: Record<string, unknown>) {
  return getSupabase()
    .from('investigation_findings')
    .insert(data)
    .select()
    .single()
}

export async function getCriticalFindings(doctorId: string, daysBack = 30) {
  return getSupabase()
    .rpc('get_critical_findings', { doctor_uuid: doctorId, days_back: daysBack })
}

// ============================================
// TREATMENT PROTOCOLS
// ============================================
export async function getTreatmentProtocols(caseId: string) {
  return getSupabase()
    .from('treatment_protocols')
    .select('*')
    .eq('case_id', caseId)
    .order('protocol_version', { ascending: false })
}

export async function createTreatmentProtocol(data: Record<string, unknown>) {
  return getSupabase()
    .from('treatment_protocols')
    .insert(data)
    .select()
    .single()
}

export async function updateTreatmentProtocol(protocolId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('treatment_protocols')
    .update(data)
    .eq('id', protocolId)
    .select()
    .single()
}

// ============================================
// CASE OUTCOMES
// ============================================
export async function getCaseOutcomes(caseId: string) {
  return getSupabase()
    .from('case_outcomes')
    .select('*')
    .eq('case_id', caseId)
    .order('follow_up_date', { ascending: false })
}

export async function createCaseOutcome(data: Record<string, unknown>) {
  return getSupabase()
    .from('case_outcomes')
    .insert(data)
    .select()
    .single()
}

// ============================================
// CASE LEARNINGS
// ============================================
export async function getCaseLearnings(caseId: string) {
  return getSupabase()
    .from('case_learnings')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: false })
}

export async function createCaseLearning(data: Record<string, unknown>) {
  return getSupabase()
    .from('case_learnings')
    .insert(data)
    .select()
    .single()
}

// ============================================
// CONVERSATIONS
// ============================================
export async function getConversations(doctorId: string) {
  return getSupabase()
    .from('conversations')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('created_at', { ascending: false })
}

export async function getConversation(sessionId: string) {
  return getSupabase()
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .single()
}

export async function createConversation(data: Record<string, unknown>) {
  return getSupabase()
    .from('conversations')
    .insert(data)
    .select()
    .single()
}

export async function updateConversation(conversationId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('conversations')
    .update(data)
    .eq('id', conversationId)
    .select()
    .single()
}

// ============================================
// MESSAGES
// ============================================
export async function getMessages(conversationId: string) {
  return getSupabase()
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
}

export async function createMessage(data: Record<string, unknown>) {
  return getSupabase()
    .from('messages')
    .insert(data)
    .select()
    .single()
}

export async function updateMessage(messageId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('messages')
    .update(data)
    .eq('id', messageId)
    .select()
    .single()
}

// ============================================
// ATTACHMENTS
// ============================================
export async function getAttachments(caseId?: string, conversationId?: string) {
  let query = getSupabase()
    .from('attachments')
    .select('*')
    .order('created_at', { ascending: false })

  if (caseId) query = query.eq('case_id', caseId)
  if (conversationId) query = query.eq('conversation_id', conversationId)

  return query
}

export async function createAttachment(data: Record<string, unknown>) {
  return getSupabase()
    .from('attachments')
    .insert(data)
    .select()
    .single()
}

// ============================================
// INTAKE SESSIONS
// ============================================
export async function getIntakeSession(sessionId: string) {
  return getSupabase()
    .from('intake_sessions')
    .select('*')
    .eq('session_id', sessionId)
    .single()
}

export async function createIntakeSession(data: Record<string, unknown>) {
  return getSupabase()
    .from('intake_sessions')
    .insert(data)
    .select()
    .single()
}

export async function updateIntakeSession(sessionId: string, data: Record<string, unknown>) {
  return getSupabase()
    .from('intake_sessions')
    .update(data)
    .eq('session_id', sessionId)
    .select()
    .single()
}

// ============================================
// KNOWLEDGE BASE (Read-only)
// ============================================
export async function searchKnowledgeBase(query: string, sourceTables?: string[], limit = 10) {
  return getSupabase()
    .rpc('search_knowledge_base', {
      search_query: query,
      source_tables: sourceTables || ['who_terminology', 'diseases', 'herbs', 'treatments', 'charak_chapters'],
      limit_results: limit,
    })
}

export async function semanticSearch(embedding: number[], matchThreshold = 0.5, matchCount = 10, sourceTable?: string) {
  return getSupabase()
    .rpc('semantic_search', {
      query_embedding: embedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
      source_table_filter: sourceTable || null,
    })
}

export async function logRagSearch(data: {
  query: string
  query_type?: string
  results_count: number
  results_used: number
  latency_ms: number
  embedding_used: boolean
}) {
  return getSupabase().from('rag_search_history').insert(data)
}

export async function getDisease(diseaseCode: string) {
  return getSupabase()
    .from('diseases')
    .select('*')
    .eq('disease_code', diseaseCode)
    .eq('is_active', true)
    .single()
}

export async function getHerb(herbCode: string) {
  return getSupabase()
    .from('herbs')
    .select('*')
    .eq('herb_code', herbCode)
    .eq('is_active', true)
    .single()
}

export async function getTreatment(treatmentCode: string) {
  return getSupabase()
    .from('treatments')
    .select('*')
    .eq('treatment_code', treatmentCode)
    .eq('is_active', true)
    .single()
}

export async function searchDiseases(query: string) {
  return getSupabase()
    .from('diseases')
    .select('*')
    .eq('is_active', true)
    .textSearch('search_vector', query)
    .limit(10)
}

export async function searchHerbs(query: string) {
  return getSupabase()
    .from('herbs')
    .select('*')
    .eq('is_active', true)
    .textSearch('search_vector', query)
    .limit(10)
}

export async function getDrugInteractions(drug: string, herb: string) {
  return getSupabase()
    .from('allopathy_integration')
    .select('*')
    .or(`allopathic_drug.ilike.%${drug}%,ayurvedic_herb.ilike.%${herb}%`)
}

// ============================================
// ANALYTICS
// ============================================
export async function getDoctorStats(doctorId: string) {
  return getSupabase()
    .rpc('get_doctor_stats', { doctor_uuid: doctorId })
}

export async function getPatientCaseHistory(patientId: string) {
  return getSupabase()
    .rpc('get_patient_case_history', { patient_uuid: patientId })
}

// TODO: v_patient_summary view needs doctor_id column added
export async function getPatientSummary(doctorId: string) {
  return getSupabase()
    .from('v_patient_summary')
    .select('*')
}

// TODO: v_case_analytics view needs doctor_id column added
export async function getCaseAnalytics(doctorId: string) {
  return getSupabase()
    .from('v_case_analytics')
    .select('*')
}

// TODO: v_treatment_effectiveness view needs doctor_id column added
export async function getTreatmentEffectiveness(doctorId: string) {
  return getSupabase()
    .from('v_treatment_effectiveness')
    .select('*')
}

// ============================================
// STORAGE HELPERS
// ============================================
export async function uploadFile(bucket: string, path: string, file: File) {
  return getSupabase().storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
}

export async function getFileUrl(bucket: string, path: string) {
  const { data } = await getSupabase().storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  return getSupabase().storage
    .from(bucket)
    .remove([path])
}
