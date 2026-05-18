import { supabase } from './client'
import type { Database } from './database.types'

type Tables = Database['public']['Tables']

// ============================================
// PROFILES
// ============================================
export async function getProfile(userId: string) {
  return supabase
    .from('profiles')
    .select('*')
    .eq('auth_user_id', userId)
    .single()
}

export async function updateProfile(userId: string, data: Tables['profiles']['Update']) {
  return supabase
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
  return supabase
    .from('patients')
    .select('*')
    .eq('doctor_id', doctorId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false })
}

export async function getPatient(patientId: string) {
  return supabase
    .from('patients')
    .select('*')
    .eq('id', patientId)
    .single()
}

export async function createPatient(data: Tables['patients']['Insert']) {
  return supabase
    .from('patients')
    .insert(data)
    .select()
    .single()
}

export async function updatePatient(patientId: string, data: Tables['patients']['Update']) {
  return supabase
    .from('patients')
    .update(data)
    .eq('id', patientId)
    .select()
    .single()
}

export async function searchPatients(doctorId: string, query: string) {
  return supabase
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
  let query = supabase
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
  return supabase
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

export async function createCase(data: Tables['cases']['Insert']) {
  return supabase
    .from('cases')
    .insert(data)
    .select()
    .single()
}

export async function updateCase(caseId: string, data: Tables['cases']['Update']) {
  return supabase
    .from('cases')
    .update(data)
    .eq('id', caseId)
    .select()
    .single()
}

export async function getCasesByPatient(patientId: string) {
  return supabase
    .from('cases')
    .select('*')
    .eq('patient_id', patientId)
    .order('visit_date', { ascending: false })
}

// ============================================
// CHIEF COMPLAINTS
// ============================================
export async function getChiefComplaints(caseId: string) {
  return supabase
    .from('chief_complaints')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at')
}

export async function createChiefComplaint(data: Tables['chief_complaints']['Insert']) {
  return supabase
    .from('chief_complaints')
    .insert(data)
    .select()
    .single()
}

// ============================================
// INVESTIGATION FINDINGS
// ============================================
export async function getInvestigationFindings(caseId: string) {
  return supabase
    .from('investigation_findings')
    .select('*')
    .eq('case_id', caseId)
    .order('report_date', { ascending: false })
}

export async function createInvestigationFinding(data: Tables['investigation_findings']['Insert']) {
  return supabase
    .from('investigation_findings')
    .insert(data)
    .select()
    .single()
}

export async function getCriticalFindings(doctorId: string, daysBack = 30) {
  return supabase
    .rpc('get_critical_findings', { doctor_uuid: doctorId, days_back: daysBack })
}

// ============================================
// TREATMENT PROTOCOLS
// ============================================
export async function getTreatmentProtocols(caseId: string) {
  return supabase
    .from('treatment_protocols')
    .select('*')
    .eq('case_id', caseId)
    .order('protocol_version', { ascending: false })
}

export async function createTreatmentProtocol(data: Tables['treatment_protocols']['Insert']) {
  return supabase
    .from('treatment_protocols')
    .insert(data)
    .select()
    .single()
}

export async function updateTreatmentProtocol(protocolId: string, data: Tables['treatment_protocols']['Update']) {
  return supabase
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
  return supabase
    .from('case_outcomes')
    .select('*')
    .eq('case_id', caseId)
    .order('follow_up_date', { ascending: false })
}

export async function createCaseOutcome(data: Tables['case_outcomes']['Insert']) {
  return supabase
    .from('case_outcomes')
    .insert(data)
    .select()
    .single()
}

// ============================================
// CASE LEARNINGS
// ============================================
export async function getCaseLearnings(caseId: string) {
  return supabase
    .from('case_learnings')
    .select('*')
    .eq('case_id', caseId)
    .order('created_at', { ascending: false })
}

export async function createCaseLearning(data: Tables['case_learnings']['Insert']) {
  return supabase
    .from('case_learnings')
    .insert(data)
    .select()
    .single()
}

// ============================================
// CONVERSATIONS
// ============================================
export async function getConversations(doctorId: string) {
  return supabase
    .from('conversations')
    .select('*')
    .eq('doctor_id', doctorId)
    .order('created_at', { ascending: false })
}

export async function getConversation(sessionId: string) {
  return supabase
    .from('conversations')
    .select('*')
    .eq('session_id', sessionId)
    .single()
}

export async function createConversation(data: Tables['conversations']['Insert']) {
  return supabase
    .from('conversations')
    .insert(data)
    .select()
    .single()
}

export async function updateConversation(conversationId: string, data: Tables['conversations']['Update']) {
  return supabase
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
  return supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
}

export async function createMessage(data: Tables['messages']['Insert']) {
  return supabase
    .from('messages')
    .insert(data)
    .select()
    .single()
}

export async function updateMessage(messageId: string, data: Tables['messages']['Update']) {
  return supabase
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
  let query = supabase
    .from('attachments')
    .select('*')
    .order('created_at', { ascending: false })

  if (caseId) query = query.eq('case_id', caseId)
  if (conversationId) query = query.eq('conversation_id', conversationId)

  return query
}

export async function createAttachment(data: Tables['attachments']['Insert']) {
  return supabase
    .from('attachments')
    .insert(data)
    .select()
    .single()
}

// ============================================
// INTAKE SESSIONS
// ============================================
export async function getIntakeSession(sessionId: string) {
  return supabase
    .from('intake_sessions')
    .select('*')
    .eq('session_id', sessionId)
    .single()
}

export async function createIntakeSession(data: Tables['intake_sessions']['Insert']) {
  return supabase
    .from('intake_sessions')
    .insert(data)
    .select()
    .single()
}

export async function updateIntakeSession(sessionId: string, data: Tables['intake_sessions']['Update']) {
  return supabase
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
  return supabase
    .rpc('search_knowledge_base', {
      search_query: query,
      source_tables: sourceTables || ['who_terminology', 'diseases', 'herbs', 'treatments', 'charak_chapters'],
      limit_results: limit,
    })
}

export async function semanticSearch(embedding: number[], matchThreshold = 0.8, matchCount = 10, sourceTable?: string) {
  return supabase
    .rpc('semantic_search', {
      query_embedding: embedding,
      match_threshold: matchThreshold,
      match_count: matchCount,
      source_table_filter: sourceTable || null,
    })
}

export async function getDisease(diseaseCode: string) {
  return supabase
    .from('diseases')
    .select('*')
    .eq('disease_code', diseaseCode)
    .eq('is_active', true)
    .single()
}

export async function getHerb(herbCode: string) {
  return supabase
    .from('herbs')
    .select('*')
    .eq('herb_code', herbCode)
    .eq('is_active', true)
    .single()
}

export async function getTreatment(treatmentCode: string) {
  return supabase
    .from('treatments')
    .select('*')
    .eq('treatment_code', treatmentCode)
    .eq('is_active', true)
    .single()
}

export async function searchDiseases(query: string) {
  return supabase
    .from('diseases')
    .select('*')
    .eq('is_active', true)
    .textSearch('search_vector', query)
    .limit(10)
}

export async function searchHerbs(query: string) {
  return supabase
    .from('herbs')
    .select('*')
    .eq('is_active', true)
    .textSearch('search_vector', query)
    .limit(10)
}

export async function getDrugInteractions(drug: string, herb: string) {
  return supabase
    .from('allopathy_integration')
    .select('*')
    .or(`allopathic_drug.ilike.%${drug}%,ayurvedic_herb.ilike.%${herb}%`)
}

// ============================================
// ANALYTICS
// ============================================
export async function getDoctorStats(doctorId: string) {
  return supabase
    .rpc('get_doctor_stats', { doctor_uuid: doctorId })
}

export async function getPatientCaseHistory(patientId: string) {
  return supabase
    .rpc('get_patient_case_history', { patient_uuid: patientId })
}

export async function getPatientSummary(doctorId: string) {
  return supabase
    .from('v_patient_summary')
    .select('*')
    .eq('doctor_id', doctorId)
}

export async function getCaseAnalytics(doctorId: string) {
  return supabase
    .from('v_case_analytics')
    .select('*')
    .eq('doctor_id', doctorId)
}

export async function getTreatmentEffectiveness(doctorId: string) {
  return supabase
    .from('v_treatment_effectiveness')
    .select('*')
    .eq('doctor_id', doctorId)
}

// ============================================
// STORAGE HELPERS
// ============================================
export async function uploadFile(bucket: string, path: string, file: File) {
  return supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
}

export async function getFileUrl(bucket: string, path: string) {
  const { data } = await supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}

export async function deleteFile(bucket: string, path: string) {
  return supabase.storage
    .from(bucket)
    .remove([path])
}
