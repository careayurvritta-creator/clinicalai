export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          auth_user_id: string | null
          email: string
          full_name: string
          specialization: string | null
          qualification: string | null
          registration_number: string | null
          clinic_name: string | null
          clinic_address: string | null
          phone: string | null
          avatar_url: string | null
          prakriti_preference: string | null
          default_model: string
          settings: Json
          is_active: boolean
          last_login_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          auth_user_id?: string | null
          email: string
          full_name: string
          specialization?: string | null
          qualification?: string | null
          registration_number?: string | null
          clinic_name?: string | null
          clinic_address?: string | null
          phone?: string | null
          avatar_url?: string | null
          prakriti_preference?: string | null
          default_model?: string
          settings?: Json
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          auth_user_id?: string | null
          email?: string
          full_name?: string
          specialization?: string | null
          qualification?: string | null
          registration_number?: string | null
          clinic_name?: string | null
          clinic_address?: string | null
          phone?: string | null
          avatar_url?: string | null
          prakriti_preference?: string | null
          default_model?: string
          settings?: Json
          is_active?: boolean
          last_login_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      patients: {
        Row: {
          id: string
          doctor_id: string
          patient_code: string | null
          name: string
          age: number | null
          date_of_birth: string | null
          gender: 'Male' | 'Female' | 'Other' | null
          occupation: string | null
          area: string | null
          phone: string | null
          email: string | null
          address: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          blood_group: string | null
          height_cm: number | null
          weight_kg: number | null
          bmi: number | null
          profile_image_url: string | null
          notes: string | null
          is_archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          doctor_id: string
          patient_code?: string | null
          name: string
          age?: number | null
          date_of_birth?: string | null
          gender?: 'Male' | 'Female' | 'Other' | null
          occupation?: string | null
          area?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          blood_group?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          profile_image_url?: string | null
          notes?: string | null
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string
          patient_code?: string | null
          name?: string
          age?: number | null
          date_of_birth?: string | null
          gender?: 'Male' | 'Female' | 'Other' | null
          occupation?: string | null
          area?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          blood_group?: string | null
          height_cm?: number | null
          weight_kg?: number | null
          profile_image_url?: string | null
          notes?: string | null
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cases: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string | null
          case_number: string
          visit_date: string | null
          visit_type: 'initial' | 'follow-up' | 'emergency' | 'referral' | null
          visit_number: number | null
          chief_complaints: Json
          duration: string | null
          severity_score: number | null
          nadi: string | null
          mootra: string | null
          mala: string | null
          jivha: string | null
          drik: string | null
          sparsh: string | null
          shabda: string | null
          aakriti: string | null
          prakriti: string | null
          prakriti_detail: string | null
          vikriti: string | null
          saara: string | null
          samhanana: string | null
          satva: string | null
          ahara_shakti: string | null
          vyayama_shakti: string | null
          desha: string | null
          comorbidities: Json
          medical_history: string | null
          allergies: string | null
          family_history: string | null
          ongoing_medications: string | null
          investigation_text: string | null
          investigation_findings: Json
          provisional_diagnosis: string | null
          provisional_reasoning: string | null
          final_diagnosis: string | null
          diagnosis_confidence: 'low' | 'medium' | 'high' | null
          treatment_plan: string | null
          treatment_protocol: Json | null
          prescribed_herbs: Json
          prescribed_panchakarma: Json
          diet_recommendations: string | null
          lifestyle_recommendations: string | null
          status: 'active' | 'completed' | 'referred' | 'archived' | null
          follow_up_date: string | null
          follow_up_notes: string | null
          ai_model_used: string | null
          ai_session_id: string | null
          ai_tokens_used: number | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id?: string | null
          case_number?: string
          visit_date?: string | null
          visit_type?: 'initial' | 'follow-up' | 'emergency' | 'referral' | null
          visit_number?: number | null
          chief_complaints?: Json
          duration?: string | null
          severity_score?: number | null
          nadi?: string | null
          mootra?: string | null
          mala?: string | null
          jivha?: string | null
          drik?: string | null
          sparsh?: string | null
          shabda?: string | null
          aakriti?: string | null
          prakriti?: string | null
          prakriti_detail?: string | null
          vikriti?: string | null
          saara?: string | null
          samhanana?: string | null
          satva?: string | null
          ahara_shakti?: string | null
          vyayama_shakti?: string | null
          desha?: string | null
          comorbidities?: Json
          medical_history?: string | null
          allergies?: string | null
          family_history?: string | null
          ongoing_medications?: string | null
          investigation_text?: string | null
          investigation_findings?: Json
          provisional_diagnosis?: string | null
          provisional_reasoning?: string | null
          final_diagnosis?: string | null
          diagnosis_confidence?: 'low' | 'medium' | 'high' | null
          treatment_plan?: string | null
          treatment_protocol?: Json | null
          prescribed_herbs?: Json
          prescribed_panchakarma?: Json
          diet_recommendations?: string | null
          lifestyle_recommendations?: string | null
          status?: 'active' | 'completed' | 'referred' | 'archived' | null
          follow_up_date?: string | null
          follow_up_notes?: string | null
          ai_model_used?: string | null
          ai_session_id?: string | null
          ai_tokens_used?: number | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string | null
          case_number?: string
          visit_date?: string | null
          visit_type?: 'initial' | 'follow-up' | 'emergency' | 'referral' | null
          visit_number?: number | null
          chief_complaints?: Json
          duration?: string | null
          severity_score?: number | null
          nadi?: string | null
          mootra?: string | null
          mala?: string | null
          jivha?: string | null
          drik?: string | null
          sparsh?: string | null
          shabda?: string | null
          aakriti?: string | null
          prakriti?: string | null
          prakriti_detail?: string | null
          vikriti?: string | null
          saara?: string | null
          samhanana?: string | null
          satva?: string | null
          ahara_shakti?: string | null
          vyayama_shakti?: string | null
          desha?: string | null
          comorbidities?: Json
          medical_history?: string | null
          allergies?: string | null
          family_history?: string | null
          ongoing_medications?: string | null
          investigation_text?: string | null
          investigation_findings?: Json
          provisional_diagnosis?: string | null
          provisional_reasoning?: string | null
          final_diagnosis?: string | null
          diagnosis_confidence?: 'low' | 'medium' | 'high' | null
          treatment_plan?: string | null
          treatment_protocol?: Json | null
          prescribed_herbs?: Json
          prescribed_panchakarma?: Json
          diet_recommendations?: string | null
          lifestyle_recommendations?: string | null
          status?: 'active' | 'completed' | 'referred' | 'archived' | null
          follow_up_date?: string | null
          follow_up_notes?: string | null
          ai_model_used?: string | null
          ai_session_id?: string | null
          ai_tokens_used?: number | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      chief_complaints: {
        Row: {
          id: string
          case_id: string
          complaint: string
          duration: string | null
          severity: number | null
          location: string | null
          onset: string | null
          character: string | null
          radiation: string | null
          aggravating_factors: string[] | null
          relieving_factors: string[] | null
          associated_symptoms: string[] | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          complaint: string
          duration?: string | null
          severity?: number | null
          location?: string | null
          onset?: string | null
          character?: string | null
          radiation?: string | null
          aggravating_factors?: string[] | null
          relieving_factors?: string[] | null
          associated_symptoms?: string[] | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          complaint?: string
          duration?: string | null
          severity?: number | null
          location?: string | null
          onset?: string | null
          character?: string | null
          radiation?: string | null
          aggravating_factors?: string[] | null
          relieving_factors?: string[] | null
          associated_symptoms?: string[] | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      investigation_findings: {
        Row: {
          id: string
          case_id: string
          report_type: 'blood' | 'urine' | 'imaging' | 'ecg' | 'general' | null
          report_date: string | null
          lab_name: string | null
          parameter: string
          value: string
          unit: string | null
          normal_range: string | null
          status: 'normal' | 'abnormal' | 'critical' | 'pending' | null
          clinical_correlation: string | null
          ayurvedic_correlation: string | null
          dosha_implication: string | null
          dhatu_involvement: string | null
          srotas_involvement: string | null
          recommended_action: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          report_type?: 'blood' | 'urine' | 'imaging' | 'ecg' | 'general' | null
          report_date?: string | null
          lab_name?: string | null
          parameter: string
          value: string
          unit?: string | null
          normal_range?: string | null
          status?: 'normal' | 'abnormal' | 'critical' | 'pending' | null
          clinical_correlation?: string | null
          ayurvedic_correlation?: string | null
          dosha_implication?: string | null
          dhatu_involvement?: string | null
          srotas_involvement?: string | null
          recommended_action?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          report_type?: 'blood' | 'urine' | 'imaging' | 'ecg' | 'general' | null
          report_date?: string | null
          lab_name?: string | null
          parameter?: string
          value?: string
          unit?: string | null
          normal_range?: string | null
          status?: 'normal' | 'abnormal' | 'critical' | 'pending' | null
          clinical_correlation?: string | null
          ayurvedic_correlation?: string | null
          dosha_implication?: string | null
          dhatu_involvement?: string | null
          srotas_involvement?: string | null
          recommended_action?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      treatment_protocols: {
        Row: {
          id: string
          case_id: string
          protocol_version: number | null
          protocol_name: string
          protocol_text: string | null
          purvakarma: Json
          purvakarma_duration: number | null
          panchakarma: Json
          panchakarma_duration: number | null
          herbs: Json
          herb_duration: number | null
          rasayana: Json
          diet_plan: Json
          pathya: string[] | null
          apathya: string[] | null
          dinacharya: string[] | null
          ritucharya: string[] | null
          lifestyle_recommendations: string[] | null
          total_duration_days: number | null
          start_date: string | null
          end_date: string | null
          status: 'draft' | 'approved' | 'in-progress' | 'completed' | 'modified' | null
          doctor_notes: string | null
          modifications: string | null
          generated_by: string | null
          ai_model: string | null
          ai_prompt: string | null
          created_at: string
          updated_at: string
          approved_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          case_id: string
          protocol_version?: number | null
          protocol_name: string
          protocol_text?: string | null
          purvakarma?: Json
          purvakarma_duration?: number | null
          panchakarma?: Json
          panchakarma_duration?: number | null
          herbs?: Json
          herb_duration?: number | null
          rasayana?: Json
          diet_plan?: Json
          pathya?: string[] | null
          apathya?: string[] | null
          dinacharya?: string[] | null
          ritucharya?: string[] | null
          lifestyle_recommendations?: string[] | null
          total_duration_days?: number | null
          start_date?: string | null
          end_date?: string | null
          status?: 'draft' | 'approved' | 'in-progress' | 'completed' | 'modified' | null
          doctor_notes?: string | null
          modifications?: string | null
          generated_by?: string | null
          ai_model?: string | null
          ai_prompt?: string | null
          created_at?: string
          updated_at?: string
          approved_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          case_id?: string
          protocol_version?: number | null
          protocol_name?: string
          protocol_text?: string | null
          purvakarma?: Json
          purvakarma_duration?: number | null
          panchakarma?: Json
          panchakarma_duration?: number | null
          herbs?: Json
          herb_duration?: number | null
          rasayana?: Json
          diet_plan?: Json
          pathya?: string[] | null
          apathya?: string[] | null
          dinacharya?: string[] | null
          ritucharya?: string[] | null
          lifestyle_recommendations?: string[] | null
          total_duration_days?: number | null
          start_date?: string | null
          end_date?: string | null
          status?: 'draft' | 'approved' | 'in-progress' | 'completed' | 'modified' | null
          doctor_notes?: string | null
          modifications?: string | null
          generated_by?: string | null
          ai_model?: string | null
          ai_prompt?: string | null
          created_at?: string
          updated_at?: string
          approved_at?: string | null
          completed_at?: string | null
        }
      }
      case_outcomes: {
        Row: {
          id: string
          case_id: string
          follow_up_visit_number: number | null
          follow_up_date: string | null
          outcome_rating: number | null
          outcome_label: string | null
          doctor_notes: string | null
          clinical_observations: string | null
          what_worked: string[] | null
          what_didnt_work: string[] | null
          patient_feedback: string | null
          symptom_improvement: Json | null
          quality_of_life_score: number | null
          treatment_modified: boolean | null
          modified_treatment_plan: string | null
          new_medications: string[] | null
          discontinued_medications: string[] | null
          next_follow_up_date: string | null
          next_steps: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          follow_up_visit_number?: number | null
          follow_up_date?: string | null
          outcome_rating?: number | null
          outcome_label?: string | null
          doctor_notes?: string | null
          clinical_observations?: string | null
          what_worked?: string[] | null
          what_didnt_work?: string[] | null
          patient_feedback?: string | null
          symptom_improvement?: Json | null
          quality_of_life_score?: number | null
          treatment_modified?: boolean | null
          modified_treatment_plan?: string | null
          new_medications?: string[] | null
          discontinued_medications?: string[] | null
          next_follow_up_date?: string | null
          next_steps?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          follow_up_visit_number?: number | null
          follow_up_date?: string | null
          outcome_rating?: number | null
          outcome_label?: string | null
          doctor_notes?: string | null
          clinical_observations?: string | null
          what_worked?: string[] | null
          what_didnt_work?: string[] | null
          patient_feedback?: string | null
          symptom_improvement?: Json | null
          quality_of_life_score?: number | null
          treatment_modified?: boolean | null
          modified_treatment_plan?: string | null
          new_medications?: string[] | null
          discontinued_medications?: string[] | null
          next_follow_up_date?: string | null
          next_steps?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      case_learnings: {
        Row: {
          id: string
          case_id: string
          outcome_id: string | null
          pattern_corrected: string
          correction_reason: string | null
          original_prediction: string | null
          corrected_prediction: string | null
          pattern_category: string | null
          frequency: number | null
          confidence_before: number | null
          confidence_after: number | null
          doctor_feedback: string | null
          is_validated: boolean | null
          validated_by: string | null
          validated_at: string | null
          ai_model: string | null
          learning_weight: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          outcome_id?: string | null
          pattern_corrected: string
          correction_reason?: string | null
          original_prediction?: string | null
          corrected_prediction?: string | null
          pattern_category?: string | null
          frequency?: number | null
          confidence_before?: number | null
          confidence_after?: number | null
          doctor_feedback?: string | null
          is_validated?: boolean | null
          validated_by?: string | null
          validated_at?: string | null
          ai_model?: string | null
          learning_weight?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          outcome_id?: string | null
          pattern_corrected?: string
          correction_reason?: string | null
          original_prediction?: string | null
          corrected_prediction?: string | null
          pattern_category?: string | null
          frequency?: number | null
          confidence_before?: number | null
          confidence_after?: number | null
          doctor_feedback?: string | null
          is_validated?: boolean | null
          validated_by?: string | null
          validated_at?: string | null
          ai_model?: string | null
          learning_weight?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      intake_sessions: {
        Row: {
          id: string
          case_id: string | null
          doctor_id: string | null
          patient_id: string | null
          session_id: string
          status: 'active' | 'paused' | 'completed' | 'abandoned' | null
          current_step: number | null
          total_steps: number | null
          progress_percentage: number | null
          collected_data: Json
          question_history: Json
          answer_history: Json
          pending_complaints: string[] | null
          current_complaint_index: number | null
          show_provisional_diagnosis: boolean | null
          provisional_diagnosis: string | null
          provisional_reasoning: string | null
          started_at: string | null
          paused_at: string | null
          completed_at: string | null
          abandoned_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id?: string | null
          doctor_id?: string | null
          patient_id?: string | null
          session_id: string
          status?: 'active' | 'paused' | 'completed' | 'abandoned' | null
          current_step?: number | null
          total_steps?: number | null
          progress_percentage?: number | null
          collected_data?: Json
          question_history?: Json
          answer_history?: Json
          pending_complaints?: string[] | null
          current_complaint_index?: number | null
          show_provisional_diagnosis?: boolean | null
          provisional_diagnosis?: string | null
          provisional_reasoning?: string | null
          started_at?: string | null
          paused_at?: string | null
          completed_at?: string | null
          abandoned_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string | null
          doctor_id?: string | null
          patient_id?: string | null
          session_id?: string
          status?: 'active' | 'paused' | 'completed' | 'abandoned' | null
          current_step?: number | null
          total_steps?: number | null
          progress_percentage?: number | null
          collected_data?: Json
          question_history?: Json
          answer_history?: Json
          pending_complaints?: string[] | null
          current_complaint_index?: number | null
          show_provisional_diagnosis?: boolean | null
          provisional_diagnosis?: string | null
          provisional_reasoning?: string | null
          started_at?: string | null
          paused_at?: string | null
          completed_at?: string | null
          abandoned_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      treatment_adherence: {
        Row: {
          id: string
          case_id: string
          protocol_id: string | null
          adherence_date: string | null
          herb_adherence: 'full' | 'partial' | 'none' | 'unknown' | null
          diet_adherence: 'full' | 'partial' | 'none' | 'unknown' | null
          lifestyle_adherence: 'full' | 'partial' | 'none' | 'unknown' | null
          panchakarma_adherence: 'completed' | 'in-progress' | 'not-started' | 'skipped' | null
          side_effects: string[] | null
          adverse_events: string | null
          patient_notes: string | null
          doctor_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id: string
          protocol_id?: string | null
          adherence_date?: string | null
          herb_adherence?: 'full' | 'partial' | 'none' | 'unknown' | null
          diet_adherence?: 'full' | 'partial' | 'none' | 'unknown' | null
          lifestyle_adherence?: 'full' | 'partial' | 'none' | 'unknown' | null
          panchakarma_adherence?: 'completed' | 'in-progress' | 'not-started' | 'skipped' | null
          side_effects?: string[] | null
          adverse_events?: string | null
          patient_notes?: string | null
          doctor_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string
          protocol_id?: string | null
          adherence_date?: string | null
          herb_adherence?: 'full' | 'partial' | 'none' | 'unknown' | null
          diet_adherence?: 'full' | 'partial' | 'none' | 'unknown' | null
          lifestyle_adherence?: 'full' | 'partial' | 'none' | 'unknown' | null
          panchakarma_adherence?: 'completed' | 'in-progress' | 'not-started' | 'skipped' | null
          side_effects?: string[] | null
          adverse_events?: string | null
          patient_notes?: string | null
          doctor_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      conversations: {
        Row: {
          id: string
          case_id: string | null
          doctor_id: string | null
          session_id: string
          title: string | null
          module: string | null
          ai_model: string
          system_prompt: string | null
          temperature: number | null
          max_tokens: number | null
          status: 'active' | 'completed' | 'archived' | null
          message_count: number | null
          total_tokens_used: number | null
          metadata: Json
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          case_id?: string | null
          doctor_id?: string | null
          session_id: string
          title?: string | null
          module?: string | null
          ai_model?: string
          system_prompt?: string | null
          temperature?: number | null
          max_tokens?: number | null
          status?: 'active' | 'completed' | 'archived' | null
          message_count?: number | null
          total_tokens_used?: number | null
          metadata?: Json
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          case_id?: string | null
          doctor_id?: string | null
          session_id?: string
          title?: string | null
          module?: string | null
          ai_model?: string
          system_prompt?: string | null
          temperature?: number | null
          max_tokens?: number | null
          status?: 'active' | 'completed' | 'archived' | null
          message_count?: number | null
          total_tokens_used?: number | null
          metadata?: Json
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          status: 'complete' | 'streaming' | 'error' | 'cancelled' | null
          tokens_used: number | null
          latency_ms: number | null
          model_used: string | null
          is_question: boolean | null
          question_data: Json | null
          suggestions: Json | null
          attachment_ids: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          conversation_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          status?: 'complete' | 'streaming' | 'error' | 'cancelled' | null
          tokens_used?: number | null
          latency_ms?: number | null
          model_used?: string | null
          is_question?: boolean | null
          question_data?: Json | null
          suggestions?: Json | null
          attachment_ids?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          conversation_id?: string
          role?: 'user' | 'assistant' | 'system'
          content?: string
          status?: 'complete' | 'streaming' | 'error' | 'cancelled' | null
          tokens_used?: number | null
          latency_ms?: number | null
          model_used?: string | null
          is_question?: boolean | null
          question_data?: Json | null
          suggestions?: Json | null
          attachment_ids?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      attachments: {
        Row: {
          id: string
          case_id: string | null
          conversation_id: string | null
          message_id: string | null
          doctor_id: string | null
          file_name: string
          file_type: 'image' | 'pdf' | 'document' | 'lab-report' | 'prescription' | 'other'
          mime_type: string | null
          file_size: number | null
          storage_path: string
          public_url: string | null
          extracted_text: string | null
          text_extraction_status: 'pending' | 'completed' | 'failed' | null
          analysis_results: Json | null
          analysis_status: 'pending' | 'completed' | 'failed' | null
          description: string | null
          tags: string[] | null
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          case_id?: string | null
          conversation_id?: string | null
          message_id?: string | null
          doctor_id?: string | null
          file_name: string
          file_type: 'image' | 'pdf' | 'document' | 'lab-report' | 'prescription' | 'other'
          mime_type?: string | null
          file_size?: number | null
          storage_path: string
          public_url?: string | null
          extracted_text?: string | null
          text_extraction_status?: 'pending' | 'completed' | 'failed' | null
          analysis_results?: Json | null
          analysis_status?: 'pending' | 'completed' | 'failed' | null
          description?: string | null
          tags?: string[] | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          case_id?: string | null
          conversation_id?: string | null
          message_id?: string | null
          doctor_id?: string | null
          file_name?: string
          file_type?: 'image' | 'pdf' | 'document' | 'lab-report' | 'prescription' | 'other'
          mime_type?: string | null
          file_size?: number | null
          storage_path?: string
          public_url?: string | null
          extracted_text?: string | null
          text_extraction_status?: 'pending' | 'completed' | 'failed' | null
          analysis_results?: Json | null
          analysis_status?: 'pending' | 'completed' | 'failed' | null
          description?: string | null
          tags?: string[] | null
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      who_terminology: {
        Row: {
          id: string
          ita_code: string
          term: string
          sanskrit_term: string | null
          category: string
          definition: string | null
          synonyms: string[] | null
          related_terms: string[] | null
          parent_term: string | null
          notes: string | null
          search_vector: unknown
          created_at: string
          updated_at: string
        }
      }
      diseases: {
        Row: {
          id: string
          disease_code: string
          name: string
          sanskrit_name: string | null
          category: string | null
          modern_correlation: string | null
          samprapti: string | null
          dosha_involvement: string[] | null
          dhatu_involvement: string[] | null
          srotas_involvement: string[] | null
          agni_status: string | null
          ama_involvement: boolean | null
          clinical_features: string[] | null
          diagnostic_criteria: string[] | null
          stages: string[] | null
          complications: string[] | null
          treatment_principles: string[] | null
          recommended_herbs: string[] | null
          recommended_panchakarma: string[] | null
          pathya: string[] | null
          apathya: string[] | null
          prognosis: string | null
          prognosis_category: string | null
          charaka_reference: string | null
          sushruta_reference: string | null
          ashtanga_reference: string | null
          classical_chapters: string[] | null
          search_vector: unknown
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      herbs: {
        Row: {
          id: string
          herb_code: string
          name: string
          botanical_name: string | null
          family: string | null
          sanskrit_name: string | null
          hindi_name: string | null
          common_names: string[] | null
          rasa: string[] | null
          guna: string[] | null
          virya: 'Sheeta' | 'Ushna' | null
          vipaka: 'Madhura' | 'Amla' | 'Katu' | null
          prabhava: string | null
          dosha_karma: Json | null
          indications: string[] | null
          primary_uses: string[] | null
          contraindications: string[] | null
          side_effects: string[] | null
          interactions: string[] | null
          part_used: string[] | null
          preparation_methods: string[] | null
          dosage: string | null
          anupana: string[] | null
          classical_formulations: Json | null
          active_compounds: string[] | null
          pharmacological_actions: string[] | null
          search_vector: unknown
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      treatments: {
        Row: {
          id: string
          treatment_code: string
          name: string
          sanskrit_name: string | null
          category: string | null
          description: string | null
          indications: string[] | null
          contraindications: string[] | null
          procedure: string[] | null
          preparation: string[] | null
          post_treatment: string[] | null
          typical_duration: string | null
          frequency: string | null
          best_season: string | null
          materials_required: string[] | null
          herbs_used: string[] | null
          charaka_reference: string | null
          classical_chapters: string[] | null
          search_vector: unknown
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      charak_chapters: {
        Row: {
          id: string
          chapter_number: number
          sthana: string
          chapter_name: string
          sanskrit_name: string | null
          english_title: string | null
          summary: string | null
          key_concepts: string[] | null
          verses_count: number | null
          content: string | null
          key_formulas: string[] | null
          key_herbs: string[] | null
          key_diseases: string[] | null
          relevance_tags: string[] | null
          clinical_applications: string[] | null
          search_vector: unknown
          created_at: string
          updated_at: string
        }
      }
      allopathy_integration: {
        Row: {
          id: string
          condition_name: string
          allopathic_drug: string
          ayurvedic_herb: string
          interaction_type: 'contraindicated' | 'caution' | 'safe' | 'synergistic' | null
          severity: 'high' | 'medium' | 'low' | null
          description: string | null
          mechanism: string | null
          recommendation: string | null
          monitoring_parameters: string[] | null
          evidence_level: 'strong' | 'moderate' | 'weak' | 'anecdotal' | null
          source_references: string[] | null
          search_vector: unknown
          created_at: string
          updated_at: string
        }
      }
      combined_protocols: {
        Row: {
          id: string
          condition_name: string
          protocol_name: string
          description: string | null
          ayurvedic_treatment: Json | null
          allopathic_treatment: Json | null
          integration_notes: string | null
          timing_recommendations: string | null
          warnings: string[] | null
          monitoring_parameters: string[] | null
          contraindications: string[] | null
          evidence_level: string | null
          source_references: string[] | null
          created_by: string | null
          search_vector: unknown
          is_active: boolean
          created_at: string
          updated_at: string
        }
      }
      knowledge_embeddings: {
        Row: {
          id: string
          source_table: string
          source_id: string
          source_title: string
          content_type: string | null
          content: string
          content_hash: string | null
          metadata: Json
          embedding: unknown
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          source_table: string
          source_id: string
          source_title: string
          content_type?: string | null
          content: string
          content_hash?: string | null
          metadata?: Json
          embedding?: unknown
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          source_table?: string
          source_id?: string
          source_title?: string
          content_type?: string | null
          content?: string
          content_hash?: string | null
          metadata?: Json
          embedding?: unknown
          created_at?: string
          updated_at?: string
        }
      }
      rag_search_history: {
        Row: {
          id: string
          doctor_id: string | null
          case_id: string | null
          query: string
          query_type: string | null
          results_count: number | null
          results_used: number | null
          latency_ms: number | null
          embedding_used: boolean | null
          metadata: Json
          created_at: string
        }
        Insert: {
          id?: string
          doctor_id?: string | null
          case_id?: string | null
          query: string
          query_type?: string | null
          results_count?: number | null
          results_used?: number | null
          latency_ms?: number | null
          embedding_used?: boolean | null
          metadata?: Json
          created_at?: string
        }
        Update: {
          id?: string
          doctor_id?: string | null
          case_id?: string | null
          query?: string
          query_type?: string | null
          results_count?: number | null
          results_used?: number | null
          latency_ms?: number | null
          embedding_used?: boolean | null
          metadata?: Json
          created_at?: string
        }
      }
    }
    Views: {
      v_patient_summary: {
        Row: {
          id: string
          patient_code: string | null
          name: string
          age: number | null
          gender: 'Male' | 'Female' | 'Other' | null
          phone: string | null
          area: string | null
          bmi: number | null
          total_visits: number | null
          last_visit_date: string | null
          latest_diagnosis: string | null
          latest_case_status: string | null
          total_follow_ups: number | null
          avg_outcome_rating: number | null
        }
      }
      v_case_analytics: {
        Row: {
          id: string
          case_number: string
          visit_date: string | null
          visit_type: string | null
          visit_number: number | null
          patient_name: string
          patient_age: number | null
          patient_gender: 'Male' | 'Female' | 'Other' | null
          provisional_diagnosis: string | null
          final_diagnosis: string | null
          status: string | null
          severity_score: number | null
          prakriti: string | null
          vikriti: string | null
          dosha_involvement: string | null
          follow_up_count: number | null
          avg_outcome_rating: number | null
          protocol_count: number | null
          investigation_count: number | null
          complaint_count: number | null
        }
      }
      v_doctor_dashboard: {
        Row: {
          doctor_id: string
          full_name: string
          specialization: string | null
          clinic_name: string | null
          total_patients: number | null
          total_cases: number | null
          active_cases: number | null
          completed_cases: number | null
          today_visits: number | null
          upcoming_follow_ups: number | null
          avg_outcome_rating: number | null
          total_conversations: number | null
          active_conversations: number | null
        }
      }
      v_treatment_effectiveness: {
        Row: {
          protocol_id: string
          protocol_name: string
          protocol_status: string | null
          case_number: string
          provisional_diagnosis: string | null
          prakriti: string | null
          patient_name: string
          patient_age: number | null
          outcome_rating: number | null
          outcome_label: string | null
          what_worked: string[] | null
          what_didnt_work: string[] | null
          herb_adherence: string | null
          diet_adherence: string | null
          lifestyle_adherence: string | null
        }
      }
      v_rag_analytics: {
        Row: {
          query_type: string | null
          total_searches: number | null
          avg_results: number | null
          avg_results_used: number | null
          avg_latency_ms: number | null
          embedding_searches: number | null
          text_searches: number | null
        }
      }
    }
    Functions: {
      get_patient_case_history: {
        Args: { patient_uuid: string }
        Returns: {
          case_id: string
          case_number: string
          visit_date: string
          visit_type: string
          visit_number: number
          provisional_diagnosis: string
          final_diagnosis: string
          status: string
          treatment_plan: string
          outcome_rating: number
          outcome_label: string
        }[]
      }
      get_doctor_stats: {
        Args: { doctor_uuid: string }
        Returns: Json
      }
      search_knowledge_base: {
        Args: {
          search_query: string
          source_tables?: string[]
          limit_results?: number
        }
        Returns: {
          source_table: string
          source_id: string
          title: string
          content: string
          rank: number
        }[]
      }
      semantic_search: {
        Args: {
          query_embedding: unknown
          match_threshold?: number
          match_count?: number
          source_table_filter?: string
        }
        Returns: {
          id: string
          source_table: string
          source_id: string
          source_title: string
          content: string
          similarity: number
        }[]
      }
      get_critical_findings: {
        Args: { doctor_uuid: string; days_back?: number }
        Returns: {
          finding_id: string
          case_number: string
          patient_name: string
          parameter: string
          value: string
          unit: string
          normal_range: string
          clinical_correlation: string
          visit_date: string
        }[]
      }
      archive_old_cases: {
        Args: { days_threshold?: number }
        Returns: number
      }
    }
  }
}
