/**
 * Sushruta Samhita Chapter Generator
 *
 * Generates structured chapter data for the sushruta_chapters table
 * using known chapter metadata and enriching from external_qa data.
 *
 * Usage:
 *   npx tsx scripts/generate-sushruta-chapters.ts             # generate + insert
 *   npx tsx scripts/generate-sushruta-chapters.ts --dry-run   # show what would be inserted
 */

import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'

// ─── Config ───────────────────────────────────────────────────────────────────
const BATCH_SIZE = 50

// ─── Sushruta Samhita Chapter Structure ───────────────────────────────────────
interface ChapterMeta {
  sthana: string
  chapterNumber: number
  name: string
  sanskrit?: string
  english: string
  keyConcepts: string[]
  keyHerbs?: string[]
  keyDiseases?: string[]
  surgicalProcedures?: string[]
  anatomyTopics?: string[]
}

const SUSHUTA_CHAPTERS: ChapterMeta[] = [
  // ── Sutra Sthana (46 chapters) ──────────────────────────────────────────────
  { sthana: 'Sutra', chapterNumber: 1, name: 'Vrddhagamopakramaniya', english: 'Introduction to Surgery', keyConcepts: ['surgery origin', 'Dhanvantari', 'Ayurveda branches'], surgicalProcedures: ['general surgery principles'] },
  { sthana: 'Sutra', chapterNumber: 2, name: 'Acharya-Disciple', english: 'Teacher-Student Relationship', keyConcepts: ['surgical training', 'qualification of surgeon', 'practice methods'] },
  { sthana: 'Sutra', chapterNumber: 3, name: 'Vidhisotreeya', english: 'Blood and Blood Vessels', keyConcepts: ['blood vessels', 'circulation', 'blood letting'], surgicalProcedures: ['Raktamokshana'] },
  { sthana: 'Sutra', chapterNumber: 4, name: 'Bandhavijnaniya', english: 'Knowledge of Ligatures', keyConcepts: ['bandaging', 'ligatures', 'surgical knots'], surgicalProcedures: ['bandhana'] },
  { sthana: 'Sutra', chapterNumber: 5, name: 'Yogyasutreeya', english: 'Surgical Instruments', keyConcepts: ['surgical instruments', 'classification', 'usage'], surgicalProcedures: ['instrument handling'] },
  { sthana: 'Sutra', chapterNumber: 6, name: 'Chikitsaprakaraniya', english: 'General Treatment Principles', keyConcepts: ['treatment approach', 'three-fold treatment', 'surgical treatment'] },
  { sthana: 'Sutra', chapterNumber: 7, name: 'Snehadhyaya', english: 'Oleation Therapy', keyConcepts: ['snehana', 'oleation', 'internal lubrication'], keyHerbs: ['sesame oil', 'ghee'] },
  { sthana: 'Sutra', chapterNumber: 8, name: 'Swedadhyaya', english: 'Sudation/Fomentation', keyConcepts: ['swedana', 'fomentation', 'sweating therapy'] },
  { sthana: 'Sutra', chapterNumber: 9, name: 'Upakalpaniya', english: 'Pre-operative Procedures', keyConcepts: ['pre-operative care', 'patient preparation', 'surgical setup'], surgicalProcedures: ['pre-operative protocols'] },
  { sthana: 'Sutra', chapterNumber: 10, name: 'Doshadhatumalakshayavruddhivijnaniya', english: 'Tissue Depletion and Augmentation', keyConcepts: ['dhatu kshaya', 'dhatu vriddhi', 'tissue pathology'] },
  { sthana: 'Sutra', chapterNumber: 11, name: 'Kiyantasiras', english: 'Important Blood Vessels', keyConcepts: ['sira', 'vessels', 'surgical anatomy'], anatomyTopics: ['blood vessels', 'vascular system'] },
  { sthana: 'Sutra', chapterNumber: 12, name: 'Vranaprashna', english: 'Wound Management', keyConcepts: ['vrana', 'wound healing', 'wound types'], surgicalProcedures: ['wound care', 'vrana chikitsa'] },
  { sthana: 'Sutra', chapterNumber: 13, name: 'Sadyovranavijnaniya', english: 'Acute Wounds', keyConcepts: ['acute wounds', 'trauma', 'emergency care'] },
  { sthana: 'Sutra', chapterNumber: 14, name: 'Bhagnavijnaniya', english: 'Fracture Management', keyConcepts: ['fractures', 'bone injuries', 'orthopedics'], surgicalProcedures: ['fracture reduction', 'splinting'] },
  { sthana: 'Sutra', chapterNumber: 15, name: 'Bhagnaprachcharya', english: 'Treatment of Fractures', keyConcepts: ['fracture treatment', 'bone setting', 'immobilization'], surgicalProcedures: ['casting', 'traction'] },
  { sthana: 'Sutra', chapterNumber: 16, name: 'Sandhimarmavijnaniya', english: 'Joints and Vital Points', keyConcepts: ['sandhi', 'marma', 'vital points'], anatomyTopics: ['joints', 'marma points'] },
  { sthana: 'Sutra', chapterNumber: 17, name: 'Ksharagnikarmiya', english: 'Caustic and Thermal Cautery', keyConcepts: ['kshara', 'agni karma', 'cautery'], surgicalProcedures: ['kshara karma', 'agni karma'] },
  { sthana: 'Sutra', chapterNumber: 18, name: 'Vishavijnaniya', english: 'Toxicology', keyConcepts: ['visha', 'poisoning', 'toxicology', 'snake bite'] },
  { sthana: 'Sutra', chapterNumber: 19, name: 'Ashtila', english: 'Urinary Calculi', keyConcepts: ['ashmari', 'calculi', 'urolithiasis'], surgicalProcedures: ['lithotomy'] },
  { sthana: 'Sutra', chapterNumber: 20, name: 'Nadivrana', english: 'Sinus and Fistula', keyConcepts: ['nadi vrana', 'fistula', 'sinus tract'], surgicalProcedures: ['fistula surgery'] },
  { sthana: 'Sutra', chapterNumber: 21, name: 'Shalyavijnaniya', english: 'Foreign Bodies', keyConcepts: ['shalya', 'foreign body', 'removal'], surgicalProcedures: ['foreign body removal'] },
  { sthana: 'Sutra', chapterNumber: 22, name: 'Shastravijnaniya', english: 'Surgical Instruments Detailed', keyConcepts: ['shastra', 'instruments', 'sharp instruments'], surgicalProcedures: ['instrument selection'] },
  { sthana: 'Sutra', chapterNumber: 23, name: 'Ashastravijnaniya', english: 'Blunt Instruments', keyConcepts: ['yantra', 'blunt instruments', 'probes'], surgicalProcedures: ['probe usage'] },
  { sthana: 'Sutra', chapterNumber: 24, name: 'Shastrakarmiya', english: 'Surgical Procedures', keyConcepts: ['surgical techniques', 'incision', 'excision'], surgicalProcedures: ['chedana', 'bhedana', 'vyadhana'] },
  { sthana: 'Sutra', chapterNumber: 25, name: 'Anushastrakarmiya', english: 'Minor Surgical Procedures', keyConcepts: ['minor surgery', 'secondary procedures'], surgicalProcedures: ['pracchana', 'lekhana'] },
  { sthana: 'Sutra', chapterNumber: 26, name: 'Vriddhigantukalpa', english: 'Excision of Growths', keyConcepts: ['tumor excision', 'growth removal'], surgicalProcedures: ['tumor surgery'] },
  { sthana: 'Sutra', chapterNumber: 27, name: 'Vraṇashodhanabandhavidhi', english: 'Wound Cleaning and Bandaging', keyConcepts: ['wound cleaning', 'bandaging techniques'], surgicalProcedures: ['wound dressing', 'bandaging'] },
  { sthana: 'Sutra', chapterNumber: 28, name: 'Bastiyantra', english: 'Enema Equipment', keyConcepts: ['basti', 'enema apparatus', 'urological instruments'], surgicalProcedures: ['basti karma'] },
  { sthana: 'Sutra', chapterNumber: 29, name: 'Uttarabasti', english: 'Urethral Catheterization', keyConcepts: ['uttara basti', 'catheterization', 'urological procedures'], surgicalProcedures: ['urethral instrumentation'] },
  { sthana: 'Sutra', chapterNumber: 30, name: 'Mootravarichhidra', english: 'Urethral Stricture', keyConcepts: ['urethral stricture', 'urinary obstruction'], surgicalProcedures: ['urethral dilation'] },
  { sthana: 'Sutra', chapterNumber: 31, name: 'Mootraghata', english: 'Urinary Obstruction', keyConcepts: ['urinary retention', 'bladder disorders'], surgicalProcedures: ['bladder drainage'] },
  { sthana: 'Sutra', chapterNumber: 32, name: 'Mootrakrichra', english: 'Dysuria', keyConcepts: ['painful urination', 'urinary disorders'] },
  { sthana: 'Sutra', chapterNumber: 33, name: 'Vasti', english: 'Enema Therapy', keyConcepts: ['basti', 'medicated enema', 'panchakarma'] },
  { sthana: 'Sutra', chapterNumber: 34, name: 'Virechanakalpa', english: 'Purgation Therapy', keyConcepts: ['virechana', 'purgation', 'therapeutic emesis'] },
  { sthana: 'Sutra', chapterNumber: 35, name: 'Vamanakalpa', english: 'Emesis Therapy', keyConcepts: ['vamana', 'therapeutic vomiting', 'kapha elimination'] },
  { sthana: 'Sutra', chapterNumber: 36, name: 'Nasyakalpa', english: 'Nasal Therapy', keyConcepts: ['nasya', 'nasal medication', 'shirovirechana'] },
  { sthana: 'Sutra', chapterNumber: 37, name: 'Dhumapana', english: 'Medicated Smoking', keyConcepts: ['dhoomapana', 'inhalation therapy'] },
  { sthana: 'Sutra', chapterNumber: 38, name: 'Gandusha', english: 'Oral Rinsing', keyConcepts: ['gandusha', 'kavala', 'oral hygiene'] },
  { sthana: 'Sutra', chapterNumber: 39, name: 'Askabhooteeya', english: 'Eye Diseases', keyConcepts: ['netra roga', 'ophthalmology'] },
  { sthana: 'Sutra', chapterNumber: 40, name: 'Tarunyabhimaniya', english: 'Reproductive Health', keyConcepts: ['reproductive medicine', 'fertility'] },
  { sthana: 'Sutra', chapterNumber: 41, name: 'Bhoomipravibhaktiya', english: 'Regional Anatomy', keyConcepts: ['regional anatomy', 'topographical surgery'], anatomyTopics: ['regional anatomy'] },
  { sthana: 'Sutra', chapterNumber: 42, name: 'Manthanavijnaniya', english: 'Tumor Pathology', keyConcepts: ['tumor', 'granthi', 'cyst'] },
  { sthana: 'Sutra', chapterNumber: 43, name: 'Dosha', english: 'Doshas in Surgery', keyConcepts: ['dosha role', 'surgical dosha management'] },
  { sthana: 'Sutra', chapterNumber: 44, name: 'Pradoshaja', english: 'Dosha-originated Diseases', keyConcepts: ['dosha diseases', 'pathology'] },
  { sthana: 'Sutra', chapterNumber: 45, name: 'Kutaprakaraniya', english: 'Importance of Surgical Skill', keyConcepts: ['surgical competence', 'training'] },
  { sthana: 'Sutra', chapterNumber: 46, name: 'Yogyasutriya', english: 'Apt Qualifications', keyConcepts: ['qualified surgeon', 'surgical ethics'] },

  // ── Nidana Sthana (16 chapters) ─────────────────────────────────────────────
  { sthana: 'Nidana', chapterNumber: 1, name: 'Vatavyadhi', english: 'Vata Disorders', keyConcepts: ['vata diseases', 'neurological disorders', 'musculoskeletal'], keyDiseases: ['hemiplegia', 'paralysis', 'sciatica', 'neuralgia'] },
  { sthana: 'Nidana', chapterNumber: 2, name: 'Vatarakta', english: 'Gout', keyConcepts: ['vatarakta', 'gout', 'joint inflammation'], keyDiseases: ['gout', 'hyperuricemia'], keyHerbs: ['guduchi', 'triphala'] },
  { sthana: 'Nidana', chapterNumber: 3, name: 'Prameha', english: 'Diabetes/Urinary Disorders', keyConcepts: ['prameha', 'diabetes', 'metabolic disorders'], keyDiseases: ['diabetes mellitus', 'glycosuria'] },
  { sthana: 'Nidana', chapterNumber: 4, name: 'Kushtha', english: 'Skin Diseases', keyConcepts: ['kushtha', 'dermatology', 'skin pathology'], keyDiseases: ['eczema', 'psoriasis', 'leucoderma'] },
  { sthana: 'Nidana', chapterNumber: 5, name: 'Raktapitta', english: 'Bleeding Disorders', keyConcepts: ['raktapitta', 'hemorrhagic conditions'], keyDiseases: ['epistaxis', 'hematemesis'] },
  { sthana: 'Nidana', chapterNumber: 6, name: 'Unmada', english: 'Psychiatric Disorders', keyConcepts: ['unmada', 'psychosis', 'mental disorders'], keyDiseases: ['psychosis', 'schizophrenia'] },
  { sthana: 'Nidana', chapterNumber: 7, name: 'Apasmara', english: 'Epilepsy', keyConcepts: ['apasmara', 'epilepsy', 'seizure disorders'], keyDiseases: ['epilepsy'] },
  { sthana: 'Nidana', chapterNumber: 8, name: 'Kshudra Roga', english: 'Minor Diseases', keyConcepts: ['minor diseases', 'common ailments'] },
  { sthana: 'Nidana', chapterNumber: 9, name: 'Maha Roga', english: 'Major Diseases', keyConcepts: ['major diseases', 'serious conditions'] },
  { sthana: 'Nidana', chapterNumber: 10, name: 'Anilashtila', english: 'Vata Tumors', keyConcepts: ['vata tumors', 'soft tissue masses'] },
  { sthana: 'Nidana', chapterNumber: 11, name: 'Sarvayoni', english: 'Gynecological Disorders', keyConcepts: ['yonivyapad', 'gynecological diseases'], keyDiseases: ['menstrual disorders', 'infertility'] },
  { sthana: 'Nidana', chapterNumber: 12, name: 'Sannipatika', english: 'Triple Dosha Disorders', keyConcepts: ['sannipata', 'tridosha vitiation'] },
  { sthana: 'Nidana', chapterNumber: 13, name: 'Adhyaroga', english: 'Secondary Diseases', keyConcepts: ['secondary disease', 'complications'] },
  { sthana: 'Nidana', chapterNumber: 14, name: 'Ardita', english: 'Facial Paralysis', keyConcepts: ['ardita', 'facial palsy'], keyDiseases: ['facial paralysis', 'Bell\'s palsy'] },
  { sthana: 'Nidana', chapterNumber: 15, name: 'Pakshaghata', english: 'Hemiplegia', keyConcepts: ['pakshaghata', 'hemiplegia', 'stroke'], keyDiseases: ['hemiplegia', 'cerebrovascular accident'] },
  { sthana: 'Nidana', chapterNumber: 16, name: 'Gridhrasi', english: 'Sciatica', keyConcepts: ['gridhrasi', 'sciatica', 'nerve pain'], keyDiseases: ['sciatica', 'lumbar radiculopathy'] },

  // ── Sharira Sthana (10 chapters) ────────────────────────────────────────────
  { sthana: 'Sharira', chapterNumber: 1, name: 'Sankhya Sharira', english: 'Number of Body Structures', keyConcepts: ['body count', 'structural enumeration'], anatomyTopics: ['body structure enumeration'] },
  { sthana: 'Sharira', chapterNumber: 2, name: 'Garbha Sharira', english: 'Embryology', keyConcepts: ['embryology', 'fetal development', 'conception'], anatomyTopics: ['embryo', 'fetal development'] },
  { sthana: 'Sharira', chapterNumber: 3, name: 'Garbha Vyakarana', english: 'Fetal Development', keyConcepts: ['fetal growth', 'organogenesis', 'formation'], anatomyTopics: ['organogenesis'] },
  { sthana: 'Sharira', chapterNumber: 4, name: 'Sharira Sankhya', english: 'Anatomical Numbers', keyConcepts: ['anatomical numbers', 'body measurements'], anatomyTopics: ['body measurements'] },
  { sthana: 'Sharira', chapterNumber: 5, name: 'Sharira Vichaya', english: 'Body Knowledge', keyConcepts: ['body knowledge', 'anatomical understanding'], anatomyTopics: ['body systems'] },
  { sthana: 'Sharira', chapterNumber: 6, name: 'Sharira Samkhya', english: 'Body Enumeration', keyConcepts: ['body parts count', 'structural anatomy'], anatomyTopics: ['body parts'] },
  { sthana: 'Sharira', chapterNumber: 7, name: 'Sira Sharira', english: 'Blood Vessels', keyConcepts: ['sira', 'vascular system'], anatomyTopics: ['blood vessels', 'arteries', 'veins'] },
  { sthana: 'Sharira', chapterNumber: 8, name: 'Dhamani Sharira', english: 'Arteries', keyConcepts: ['dhamani', 'arterial system'], anatomyTopics: ['arteries'] },
  { sthana: 'Sharira', chapterNumber: 9, name: 'Srotas Sharira', english: 'Body Channels', keyConcepts: ['srotas', 'channel systems', 'body pathways'], anatomyTopics: ['srotas', 'channels'] },
  { sthana: 'Sharira', chapterNumber: 10, name: 'Jivitam', english: 'Life and Vitality', keyConcepts: ['prana', 'life force', 'vitality'], anatomyTopics: ['vital structures'] },

  // ── Chikitsa Sthana (40 chapters) ──────────────────────────────────────────
  { sthana: 'Chikitsa', chapterNumber: 1, name: 'Dvivraniya Chikitsa', english: 'Treatment of Two Types of Wounds', keyConcepts: ['wound treatment', 'vrana chikitsa'], surgicalProcedures: ['wound suturing', 'wound care'] },
  { sthana: 'Chikitsa', chapterNumber: 2, name: 'Vrana Chikitsa', english: 'Wound Care', keyConcepts: ['vrana', 'wound healing', 'post-operative care'] },
  { sthana: 'Chikitsa', chapterNumber: 3, name: 'Bhagna Chikitsa', english: 'Fracture Treatment', keyConcepts: ['fracture management', 'orthopedics'], surgicalProcedures: ['fracture fixation'] },
  { sthana: 'Chikitsa', chapterNumber: 4, name: 'Raktamokshana', english: 'Blood Letting Therapy', keyConcepts: ['raktamokshana', 'bloodletting', 'leech therapy'], surgicalProcedures: ['jalaukavacharana', 'siravyadhana'] },
  { sthana: 'Chikitsa', chapterNumber: 5, name: 'Kshudra Roga Chikitsa', english: 'Minor Disease Treatment', keyConcepts: ['minor disease treatment'] },
  { sthana: 'Chikitsa', chapterNumber: 6, name: 'Maha Roga Chikitsa', english: 'Major Disease Treatment', keyConcepts: ['major disease treatment'] },
  { sthana: 'Chikitsa', chapterNumber: 7, name: 'Kushtha Chikitsa', english: 'Skin Disease Treatment', keyConcepts: ['kushtha chikitsa', 'dermatology treatment'], keyHerbs: ['neem', 'turmeric', 'khadira'] },
  { sthana: 'Chikitsa', chapterNumber: 8, name: 'Prameha Chikitsa', english: 'Diabetes Treatment', keyConcepts: ['prameha chikitsa', 'diabetes management'], keyHerbs: ['guduchi', 'amalaki', 'haridra'] },
  { sthana: 'Chikitsa', chapterNumber: 9, name: 'Unmada Chikitsa', english: 'Psychiatric Treatment', keyConcepts: ['unmada chikitsa', 'mental health treatment'] },
  { sthana: 'Chikitsa', chapterNumber: 10, name: 'Apasmara Chikitsa', english: 'Epilepsy Treatment', keyConcepts: ['apasmara chikitsa', 'epilepsy management'] },
  { sthana: 'Chikitsa', chapterNumber: 11, name: 'Vatavyadhi Chikitsa', english: 'Vata Disease Treatment', keyConcepts: ['vata treatment', 'neurological treatment'], keyHerbs: ['ashwagandha', 'bala', 'rasna'] },
  { sthana: 'Chikitsa', chapterNumber: 12, name: 'Vatarakta Chikitsa', english: 'Gout Treatment', keyConcepts: ['vatarakta treatment', 'gout management'], keyHerbs: ['guduchi', 'triphala'] },
  { sthana: 'Chikitsa', chapterNumber: 13, name: 'Sarvanga Shotha Chikitsa', english: 'General Edema Treatment', keyConcepts: ['shotha chikitsa', 'edema management'] },
  { sthana: 'Chikitsa', chapterNumber: 14, name: 'Pandu Chikitsa', english: 'Anemia Treatment', keyConcepts: ['pandu', 'anemia', 'iron deficiency'], keyHerbs: ['amalaki', 'triphala'] },
  { sthana: 'Chikitsa', chapterNumber: 15, name: 'Kamala Chikitsa', english: 'Jaundice Treatment', keyConcepts: ['kamala', 'jaundice', 'liver disorders'] },
  { sthana: 'Chikitsa', chapterNumber: 16, name: 'Shotha Chikitsa', english: 'Inflammation Treatment', keyConcepts: ['shotha', 'inflammation', 'swelling'] },
  { sthana: 'Chikitsa', chapterNumber: 17, name: 'Pliha Chikitsa', english: 'Spleen Disease Treatment', keyConcepts: ['plihadosha', 'splenomegaly'] },
  { sthana: 'Chikitsa', chapterNumber: 18, name: 'Hridroga Chikitsa', english: 'Heart Disease Treatment', keyConcepts: ['hridroga', 'cardiac disorders'], keyHerbs: ['arjuna', 'guggulu'] },
  { sthana: 'Chikitsa', chapterNumber: 19, name: 'Mutraghata Chikitsa', english: 'Urinary Obstruction Treatment', keyConcepts: ['mutraghata', 'urinary obstruction'], surgicalProcedures: ['catheterization'] },
  { sthana: 'Chikitsa', chapterNumber: 20, name: 'Ashmari Chikitsa', english: 'Calculus Treatment', keyConcepts: ['ashmari', 'urolithiasis', 'stone management'], surgicalProcedures: ['lithotomy'] },
  { sthana: 'Chikitsa', chapterNumber: 21, name: 'Mutrakrichra Chikitsa', english: 'Dysuria Treatment', keyConcepts: ['mutrakrichra', 'painful urination'] },
  { sthana: 'Chikitsa', chapterNumber: 22, name: 'Basti Chikitsa', english: 'Enema Treatment', keyConcepts: ['basti chikitsa', 'medicated enema', 'panchakarma'] },
  { sthana: 'Chikitsa', chapterNumber: 23, name: 'Nadi Vrana Chikitsa', english: 'Sinus Treatment', keyConcepts: ['nadi vrana', 'sinus tract treatment'], surgicalProcedures: ['fistula surgery'] },
  { sthana: 'Chikitsa', chapterNumber: 24, name: 'Bhagandara Chikitsa', english: 'Fistula Treatment', keyConcepts: ['bhagandara', 'fistula-in-ano'], surgicalProcedures: ['fistulectomy'] },
  { sthana: 'Chikitsa', chapterNumber: 25, name: 'Arsha Chikitsa', english: 'Hemorrhoid Treatment', keyConcepts: ['arsha', 'hemorrhoids', 'piles'], surgicalProcedures: ['hemorrhoidectomy'] },
  { sthana: 'Chikitsa', chapterNumber: 26, name: 'Granthyapachi Chikitsa', english: 'Tumor and Goiter Treatment', keyConcepts: ['granthi', 'tumor', 'goiter'] },
  { sthana: 'Chikitsa', chapterNumber: 27, name: 'Galaganda Chikitsa', english: 'Cervical Lymphadenitis', keyConcepts: ['galaganda', 'goiter', 'lymph node'] },
  { sthana: 'Chikitsa', chapterNumber: 28, name: 'Vrddhi Chikitsa', english: 'Scrotal Swelling Treatment', keyConcepts: ['vrddhi', 'hydrocele', 'scrotal swelling'] },
  { sthana: 'Chikitsa', chapterNumber: 29, name: 'Prameha Pidaka Chikitsa', english: 'Diabetic Carbuncle Treatment', keyConcepts: ['prameha pidaka', 'diabetic complications'] },
  { sthana: 'Chikitsa', chapterNumber: 30, name: 'Upadamsha Chikitsa', english: 'Venereal Disease Treatment', keyConcepts: ['upadamsha', 'STD treatment'] },
  { sthana: 'Chikitsa', chapterNumber: 31, name: 'Shvitra Chikitsa', english: 'Leucoderma Treatment', keyConcepts: ['shvitra', 'vitiligo', 'leucoderma'] },
  { sthana: 'Chikitsa', chapterNumber: 32, name: 'Shleepada Chikitsa', english: 'Elephantiasis Treatment', keyConcepts: ['shleepada', 'filariasis', 'elephantiasis'] },
  { sthana: 'Chikitsa', chapterNumber: 33, name: 'Bala Chikitsa', english: 'Pediatric Treatment', keyConcepts: ['kaumarbhritya', 'pediatrics', 'child health'] },
  { sthana: 'Chikitsa', chapterNumber: 34, name: 'Grahani Chikitsa', english: 'Digestive Disorder Treatment', keyConcepts: ['grahani', 'IBS', 'malabsorption'], keyHerbs: ['bilva', 'kutaja'] },
  { sthana: 'Chikitsa', chapterNumber: 35, name: 'Aruchi Chikitsa', english: 'Anorexia Treatment', keyConcepts: ['aruchi', 'anorexia', 'appetite loss'] },
  { sthana: 'Chikitsa', chapterNumber: 36, name: 'Chhardi Chikitsa', english: 'Vomiting Treatment', keyConcepts: ['chhardi', 'emesis management'] },
  { sthana: 'Chikitsa', chapterNumber: 37, name: 'Trishna Chikitsa', english: 'Thirst Treatment', keyConcepts: ['trishna', 'polydipsia', 'dehydration'] },
  { sthana: 'Chikitsa', chapterNumber: 38, name: 'Shwasa Chikitsa', english: 'Respiratory Disease Treatment', keyConcepts: ['shwasa', 'asthma', 'dyspnea'], keyHerbs: ['vasa', 'kantakari'] },
  { sthana: 'Chikitsa', chapterNumber: 39, name: 'Hikka Chikitsa', english: 'Hiccups Treatment', keyConcepts: ['hikka', 'hiccough'] },
  { sthana: 'Chikitsa', chapterNumber: 40, name: 'Kasa Chikitsa', english: 'Cough Treatment', keyConcepts: ['kasa', 'cough', 'bronchitis'], keyHerbs: ['vasa', 'kantakari', 'talisapatra'] },

  // ── Kalpa Sthana (12 chapters) ─────────────────────────────────────────────
  { sthana: 'Kalpa', chapterNumber: 1, name: 'Vamanakalpa', english: 'Emesis Formulations', keyConcepts: ['vamana yoga', 'emesis formulations'] },
  { sthana: 'Kalpa', chapterNumber: 2, name: 'Virechanakalpa', english: 'Purgation Formulations', keyConcepts: ['virechana yoga', 'purgation formulations'] },
  { sthana: 'Kalpa', chapterNumber: 3, name: 'Asthapana Basti', english: 'Decoction Enema Formulations', keyConcepts: ['asthapana basti', 'niruha basti'] },
  { sthana: 'Kalpa', chapterNumber: 4, name: 'Anuvasana Basti', english: 'Oil Enema Formulations', keyConcepts: ['anuvasana basti', 'sneha basti'] },
  { sthana: 'Kalpa', chapterNumber: 5, name: 'Uttarabasti', english: 'Urethral/Vaginal Formulations', keyConcepts: ['uttara basti formulations'] },
  { sthana: 'Kalpa', chapterNumber: 6, name: 'Nasya Kalpa', english: 'Nasal Formulations', keyConcepts: ['nasya yoga', 'nasal medication formulations'] },
  { sthana: 'Kalpa', chapterNumber: 7, name: 'Dhooma Kalpa', english: 'Fumigation Formulations', keyConcepts: ['dhoopana', 'fumigation recipes'] },
  { sthana: 'Kalpa', chapterNumber: 8, name: 'Gandusha Kalpa', english: 'Oral Rinse Formulations', keyConcepts: ['gandusha yoga', 'oral rinse recipes'] },
  { sthana: 'Kalpa', chapterNumber: 9, name: 'Netra Kalpa', english: 'Eye Treatment Formulations', keyConcepts: ['netra kalpa', 'eye drops', 'eye treatments'] },
  { sthana: 'Kalpa', chapterNumber: 10, name: 'Taila Kalpa', english: 'Medicated Oil Formulations', keyConcepts: ['taila kalpa', 'oil preparation methods'] },
  { sthana: 'Kalpa', chapterNumber: 11, name: 'Ghrita Kalpa', english: 'Medicated Ghee Formulations', keyConcepts: ['ghrita kalpa', 'ghee preparation methods'] },
  { sthana: 'Kalpa', chapterNumber: 12, name: 'Lepa Kalpa', english: 'Paste/Poultice Formulations', keyConcepts: ['lepa', 'external paste', 'poultice'] },

  // ── Uttara Tantra (66 chapters) ────────────────────────────────────────────
  { sthana: 'Uttara', chapterNumber: 1, name: 'Netra Samanya', english: 'General Ophthalmology', keyConcepts: ['netra roga', 'eye diseases general'] },
  { sthana: 'Uttara', chapterNumber: 2, name: 'Vartma Roga', english: 'Eyelid Diseases', keyConcepts: ['vartma roga', 'eyelid pathology'] },
  { sthana: 'Uttara', chapterNumber: 3, name: 'Sandhisheetaja', english: 'Conjunctival Diseases', keyConcepts: ['conjunctivitis', 'eye surface'] },
  { sthana: 'Uttara', chapterNumber: 4, name: 'Shuklagata Roga', english: 'Scleral Diseases', keyConcepts: ['scleritis', 'white of eye'] },
  { sthana: 'Uttara', chapterNumber: 5, name: 'Krishnagata Roga', english: 'Corneal Diseases', keyConcepts: ['corneal disease', 'black of eye'] },
  { sthana: 'Uttara', chapterNumber: 6, name: 'Sarvagata Roga', english: 'Whole Eye Diseases', keyConcepts: ['panophthalmitis', 'whole eye'] },
  { sthana: 'Uttara', chapterNumber: 7, name: 'Drishtigata Roga', english: 'Vision Diseases', keyConcepts: ['refractive errors', 'vision problems'] },
  { sthana: 'Uttara', chapterNumber: 8, name: 'Timira', english: 'Cataract', keyConcepts: ['timira', 'cataract', 'visual impairment'], surgicalProcedures: ['couching'] },
  { sthana: 'Uttara', chapterNumber: 9, name: 'Linganasha', english: 'Blindness', keyConcepts: ['linganasha', 'blindness', 'vision loss'] },
  { sthana: 'Uttara', chapterNumber: 10, name: 'Karna Samanya', english: 'General ENT - Ear', keyConcepts: ['karna roga', 'ear diseases'] },
  { sthana: 'Uttara', chapterNumber: 11, name: 'Nasa Roga', english: 'Nose Diseases', keyConcepts: ['nasa roga', 'nasal disorders'] },
  { sthana: 'Uttara', chapterNumber: 12, name: 'Mukha Roga', english: 'Oral Diseases', keyConcepts: ['mukha roga', 'oral pathology'] },
  { sthana: 'Uttara', chapterNumber: 13, name: 'Shiro Roga', english: 'Head Diseases', keyConcepts: ['shiroroga', 'headache', 'migraine'] },
  { sthana: 'Uttara', chapterNumber: 14, name: 'Karnavedha', english: 'Ear Piercing', keyConcepts: ['karnavedha', 'ear piercing ceremony'] },
  { sthana: 'Uttara', chapterNumber: 15, name: 'Netra Kriya', english: 'Eye Procedures', keyConcepts: ['eye procedures', 'ophthalmic surgery'], surgicalProcedures: ['eye surgery'] },
  { sthana: 'Uttara', chapterNumber: 16, name: 'Ashastra Karma', english: 'Non-invasive Procedures', keyConcepts: ['non-surgical treatments', 'conservative management'] },
  { sthana: 'Uttara', chapterNumber: 17, name: 'Shiro Virechana', english: 'Head Purgation', keyConcepts: ['shirovirechana', 'head purification'] },
  { sthana: 'Uttara', chapterNumber: 18, name: 'Nasya Karma', english: 'Nasal Medication', keyConcepts: ['nasya karma', 'nasal therapy'] },
  { sthana: 'Uttara', chapterNumber: 19, name: 'Kavala Gandusha', english: 'Oral Rinsing Procedures', keyConcepts: ['kavala', 'gandusha', 'oral hygiene'] },
  { sthana: 'Uttara', chapterNumber: 20, name: 'Dhoomapana', english: 'Fumigation', keyConcepts: ['dhoomapana', 'inhalation'] },
  { sthana: 'Uttara', chapterNumber: 21, name: 'Tarpana', english: 'Eye Nourishment', keyConcepts: ['tarpana', 'eye nourishment'] },
  { sthana: 'Uttara', chapterNumber: 22, name: 'Putapaka', english: 'Eye Poultice', keyConcepts: ['putapaka', 'eye poultice'] },
  { sthana: 'Uttara', chapterNumber: 23, name: 'Anjana', english: 'Collyrium Application', keyConcepts: ['anjana', 'eye drops', 'collyrium'] },
  { sthana: 'Uttara', chapterNumber: 24, name: 'Netra Shotha', english: 'Eye Inflammation', keyConcepts: ['eye inflammation', 'ophthalmia'] },
  { sthana: 'Uttara', chapterNumber: 25, name: 'Krimigranthi', english: 'Parasitic Cyst', keyConcepts: ['krimigranthi', 'parasitic infection'] },
  { sthana: 'Uttara', chapterNumber: 26, name: 'Arvabhedaka', english: 'Headache Types', keyConcepts: ['arvabhedaka', 'headache classification'] },
  { sthana: 'Uttara', chapterNumber: 27, name: 'Shankhaka', english: 'Temporal Headache', keyConcepts: ['shankhaka', 'temporal region pain'] },
  { sthana: 'Uttara', chapterNumber: 28, name: 'Ekayana', english: 'Monocular Vision', keyConcepts: ['ekayana', 'single eye vision'] },
  { sthana: 'Uttara', chapterNumber: 29, name: 'Adhimanthaka', english: 'Glaucoma', keyConcepts: ['adhimanthaka', 'glaucoma', 'eye pressure'] },
  { sthana: 'Uttara', chapterNumber: 30, name: 'Shukra Dosha', english: 'Reproductive Disorders', keyConcepts: ['shukra dosha', 'reproductive dysfunction'] },
  { sthana: 'Uttara', chapterNumber: 31, name: 'Yonivyapat', english: 'Gynecological Disorders', keyConcepts: ['yonivyapat', 'gynecological conditions'] },
  { sthana: 'Uttara', chapterNumber: 32, name: 'Garbha Vyapad', english: 'Obstetric Complications', keyConcepts: ['garbha vyapad', 'pregnancy complications'] },
  { sthana: 'Uttara', chapterNumber: 33, name: 'Garbha Sambhava', english: 'Conception', keyConcepts: ['garbha sambhava', 'fertilization', 'conception'] },
  { sthana: 'Uttara', chapterNumber: 34, name: 'Bala Roga', english: 'Pediatric Diseases', keyConcepts: ['bala roga', 'childhood diseases'] },
  { sthana: 'Uttara', chapterNumber: 35, name: 'Bala Graha', english: 'Pediatric Convulsions', keyConcepts: ['bala graha', 'childhood seizures'] },
  { sthana: 'Uttara', chapterNumber: 36, name: 'Kumaratantra', english: 'Pediatric Care', keyConcepts: ['kumaratantra', 'child development'] },
  { sthana: 'Uttara', chapterNumber: 37, name: 'Jara Chikitsa', english: 'Geriatric Treatment', keyConcepts: ['jara', 'aging', 'geriatric care'] },
  { sthana: 'Uttara', chapterNumber: 38, name: 'Rasayana', english: 'Rejuvenation Therapy', keyConcepts: ['rasayana', 'rejuvenation', 'anti-aging'], keyHerbs: ['ashwagandha', 'amalaki', 'shatavari'] },
  { sthana: 'Uttara', chapterNumber: 39, name: 'Vajikarana', english: 'Aphrodisiac Therapy', keyConcepts: ['vajikarana', 'sexual health', 'fertility'] },
  { sthana: 'Uttara', chapterNumber: 40, name: 'Shiroroga', english: 'Head Disease Treatment', keyConcepts: ['shiroroga chikitsa'] },
  { sthana: 'Uttara', chapterNumber: 41, name: 'Karna Roga Chikitsa', english: 'Ear Disease Treatment', keyConcepts: ['karna roga chikitsa'] },
  { sthana: 'Uttara', chapterNumber: 42, name: 'Nasa Roga Chikitsa', english: 'Nose Disease Treatment', keyConcepts: ['nasa roga chikitsa'] },
  { sthana: 'Uttara', chapterNumber: 43, name: 'Mukha Roga Chikitsa', english: 'Oral Disease Treatment', keyConcepts: ['mukha roga chikitsa'] },
  { sthana: 'Uttara', chapterNumber: 44, name: 'Shleepada Chikitsa', english: 'Filariasis Treatment', keyConcepts: ['shleepada chikitsa', 'elephantiasis treatment'] },
  { sthana: 'Uttara', chapterNumber: 45, name: 'Krimi Chikitsa', english: 'Worm Infection Treatment', keyConcepts: ['krimi', 'parasitic infection', 'anthelmintic'] },
  { sthana: 'Uttara', chapterNumber: 46, name: 'Visham Jwara', english: 'Malarial Fever', keyConcepts: ['visham jwara', 'malaria', 'intermittent fever'] },
  { sthana: 'Uttara', chapterNumber: 47, name: 'Vrana Shotha', english: 'Wound Inflammation', keyConcepts: ['vrana shotha', 'wound infection'] },
  { sthana: 'Uttara', chapterNumber: 48, name: 'Marmavedha', english: 'Vital Point Puncture', keyConcepts: ['marma vedha', 'vital point injury'] },
  { sthana: 'Uttara', chapterNumber: 49, name: 'Kshara Karma', english: 'Caustic Application', keyConcepts: ['kshara karma', 'alkaline cautery'] },
  { sthana: 'Uttara', chapterNumber: 50, name: 'Agni Karma', english: 'Thermal Cautery', keyConcepts: ['agni karma', 'fire cautery', 'heat therapy'] },
  { sthana: 'Uttara', chapterNumber: 51, name: 'Raktamokshana', english: 'Blood Letting', keyConcepts: ['raktamokshana', 'bloodletting'] },
  { sthana: 'Uttara', chapterNumber: 52, name: 'Shalya Vigyaniya', english: 'Surgical Knowledge', keyConcepts: ['surgical knowledge', 'operative principles'] },
  { sthana: 'Uttara', chapterNumber: 53, name: 'Vrana Vigyaniya', english: 'Wound Knowledge', keyConcepts: ['wound types', 'wound pathology'] },
  { sthana: 'Uttara', chapterNumber: 54, name: 'Vrana Roga', english: 'Wound Diseases', keyConcepts: ['wound complications', 'infection'] },
  { sthana: 'Uttara', chapterNumber: 55, name: 'Udara Roga', english: 'Abdominal Diseases', keyConcepts: ['udara roga', 'ascites', 'abdominal disorders'] },
  { sthana: 'Uttara', chapterNumber: 56, name: 'Gulma', english: 'Abdominal Tumors', keyConcepts: ['gulma', 'abdominal mass', 'tumor'] },
  { sthana: 'Uttara', chapterNumber: 57, name: 'Pliha Roga', english: 'Spleen Diseases', keyConcepts: ['plihadosha', 'splenic disorders'] },
  { sthana: 'Uttara', chapterNumber: 58, name: 'Hridroga', english: 'Heart Diseases', keyConcepts: ['hridroga', 'cardiac diseases'] },
  { sthana: 'Uttara', chapterNumber: 59, name: 'Mutraghata', english: 'Urinary Obstruction', keyConcepts: ['mutraghata', 'urinary block'] },
  { sthana: 'Uttara', chapterNumber: 60, name: 'Mutrakrichra', english: 'Painful Urination', keyConcepts: ['mutrakrichra', 'dysuria'] },
  { sthana: 'Uttara', chapterNumber: 61, name: 'Meda Roga', english: 'Obesity/Fat Disorders', keyConcepts: ['meda roga', 'obesity', 'lipid disorders'] },
  { sthana: 'Uttara', chapterNumber: 62, name: 'Vatavyadhi', english: 'Vata Disorders Treatment', keyConcepts: ['vata vyadhi chikitsa'] },
  { sthana: 'Uttara', chapterNumber: 63, name: 'Sandhigata Vata', english: 'Joint Disorders', keyConcepts: ['sandhigata vata', 'arthritis', 'joint pain'] },
  { sthana: 'Uttara', chapterNumber: 64, name: 'Sira Shotha', english: 'Vascular Inflammation', keyConcepts: ['sira shotha', 'vascular inflammation'] },
  { sthana: 'Uttara', chapterNumber: 65, name: 'Sannipata', english: 'Triple Dosha Disease', keyConcepts: ['sannipata', 'tridosha vitiation'] },
  { sthana: 'Uttara', chapterNumber: 66, name: 'Arishta Vigyaniya', english: 'Fatal Signs', keyConcepts: ['arishta', 'prognosis', 'fatal signs'] },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function deterministicUuid(input: string): string {
  const hash = createHash('sha256').update(input).digest('hex')
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `4${hash.slice(13, 16)}`,
    hash.slice(16, 20),
    hash.slice(20, 32),
  ].join('-')
}

function batchItems<T>(items: T[], size: number): T[][] {
  const batches: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    batches.push(items.slice(i, i + size))
  }
  return batches
}

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')

  console.log('=== Sushruta Samhita Chapter Generator ===')
  console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`)
  console.log(`Chapters: ${SUSHUTA_CHAPTERS.length}`)

  // Group by sthana
  const bySthana: Record<string, ChapterMeta[]> = {}
  for (const ch of SUSHUTA_CHAPTERS) {
    if (!bySthana[ch.sthana]) bySthana[ch.sthana] = []
    bySthana[ch.sthana].push(ch)
  }
  console.log('\nChapters by Sthana:')
  for (const [sthana, chapters] of Object.entries(bySthana)) {
    console.log(`  ${sthana}: ${chapters.length} chapters`)
  }

  // Transform to DB rows
  const rows = SUSHUTA_CHAPTERS.map(ch => {
    const id = deterministicUuid(`sushruta_${ch.sthana}_${ch.chapterNumber}`)
    const content = [
      `${ch.english} (${ch.name})`,
      ch.sanskrit ? `Sanskrit: ${ch.sanskrit}` : '',
      `\nKey Concepts: ${ch.keyConcepts.join(', ')}`,
      ch.keyHerbs?.length ? `\nKey Herbs: ${ch.keyHerbs.join(', ')}` : '',
      ch.keyDiseases?.length ? `\nKey Diseases: ${ch.keyDiseases.join(', ')}` : '',
      ch.surgicalProcedures?.length ? `\nSurgical Procedures: ${ch.surgicalProcedures.join(', ')}` : '',
      ch.anatomyTopics?.length ? `\nAnatomy Topics: ${ch.anatomyTopics.join(', ')}` : '',
    ].filter(Boolean).join('\n')

    return {
      id,
      chapter_number: ch.chapterNumber,
      sthana: ch.sthana,
      chapter_name: ch.name,
      sanskrit_name: ch.sanskrit || null,
      english_title: ch.english,
      summary: `Chapter ${ch.chapterNumber} of ${ch.sthana} Sthana: ${ch.english}`,
      key_concepts: ch.keyConcepts,
      verses_count: null,
      content,
      key_formulas: [],
      key_herbs: ch.keyHerbs || [],
      key_diseases: ch.keyDiseases || [],
      surgical_procedures: ch.surgicalProcedures?.length ? { procedures: ch.surgicalProcedures } : null,
      anatomy_descriptions: ch.anatomyTopics?.length ? { topics: ch.anatomyTopics } : null,
      relevance_tags: [
        ch.sthana.toLowerCase(),
        ...ch.keyConcepts.slice(0, 3),
      ],
      clinical_applications: ch.keyConcepts.filter(k =>
        k.includes('treatment') || k.includes('therapy') || k.includes('surgery')
      ),
    }
  })

  if (dryRun) {
    console.log(`\nWould upsert ${rows.length} chapters`)
    console.log('Sample:', JSON.stringify(rows[0], null, 2))
    return
  }

  // Connect to Supabase
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Upsert in batches
  const batches = batchItems(rows, BATCH_SIZE)
  let totalUpserted = 0
  let totalErrors = 0

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    const { error } = await supabase
      .from('sushruta_chapters')
      .upsert(batch, { onConflict: 'id' })

    if (error) {
      console.error(`  Batch ${i + 1}/${batches.length} error:`, error.message)
      totalErrors += batch.length
    } else {
      console.log(`  Batch ${i + 1}/${batches.length} done (${batch.length} rows)`)
      totalUpserted += batch.length
    }
  }

  console.log(`\n=== Done: ${totalUpserted} upserted, ${totalErrors} errors ===`)
}

main().catch(console.error)
