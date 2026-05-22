/**
 * Charak Samhita - Nidana Sthana (Section on Diagnostic Principles)
 * 8 Chapters covering diagnosis of major diseases - EXPANDED
 * Source: carakasamhitaonline.com (CC BY-NC-SA 4.0)
 */

import type { CharakChapter, DiseaseDescription, TreatmentProtocol } from './types'

export const NIDANA_STHANA: CharakChapter[] = [
  // ===== CHAPTER 1: JWARA NIDANA =====
  {
    id: 'nidana-1',
    sthana: 'Nidana Sthana',
    chapterNumber: 1,
    name: 'Jwara Nidana',
    sanskrit: 'ज्वरनिदानम् अध्यायः',
    english: 'Diagnosis of Fever',
    summary: 'Comprehensive diagnosis of fever (jwara) covering 8 types based on dosha involvement, detailed pathogenesis, premonitory symptoms, clinical features, and management principles. Jwara is described as the king of all diseases (sarvarogadhika) that can affect body, sense organs, and mind. The chapter establishes Nidana Panchaka as the foundational diagnostic framework for all diseases.',
    keyConcepts: [
      'Nidana Panchaka: Nidana (etiology), Purvarupa (premonitory signs), Linga (signs/symptoms), Upashaya (pacifying factors), Samprapti (pathogenesis)',
      'Eight types of Jwara: Vatika, Paittika, Shlaishmika, Vata-Paittika, Vata-Shlaishmika, Pitta-Shlaishmika, Sannipatika, Agantuja',
      'Amashaya as the common site for all jwara',
      'Agni displacement mechanism - heat pushed out from pakti sthana',
      'Rasa dhatu and svedavaha srotas involvement',
      'Ghee as universal treatment for chronic fever',
      'Jwara as king of all diseases (sarvarogadhika)',
      'Three types of nidana: Asatmyendriyarthasamyoga, Prajnaparadha, Kala',
      'Five types of diseases: Agneya, Saumya, Vayavya (somatic), Rajas, Tamas (psychic)',
      'Classification by timing helps identify predominant dosha',
      'Shatkriyakala (six stages) applies to jwara for early intervention',
      'Jwara as nidanarthakara - fever can cause other diseases like raktapitta and shotha',
      'Ama jwara vs nirama jwara differentiation guides treatment approach',
      'Vishama jwara (intermittent fever) requires timing-based treatment strategy',
      'Santata jwara (continuous fever) is the most severe form requiring immediate intervention'
    ],
    shlokas: [
      {
        number: '1.3',
        sanskrit: 'हेतुनिमित्तायतनकर्तृकरणप्रत्ययसमुत्थानानां निदानस्य',
        translation: 'Hetu, nimitta, ayatana, karta, karana, pratyaya, and samutthana are synonyms of nidana (causative factors).',
        commentary: 'Nidana is of three types: unsuitable sense-object contact, intellectual errors, and time/seasonal factors.'
      },
      {
        number: '1.6',
        sanskrit: 'निदानपूर्वरूपलिङ्गोपशयसम्प्राप्तिभिः व्याधयो विज्ञायन्ते',
        translation: 'Diseases are diagnosed by studying their nidana (etiology), purvarupa (premonitory symptoms), linga (signs and symptoms), upashaya (pacifying factors), and samprapti (pathogenesis).',
        commentary: 'This foundational verse establishes the five-fold diagnostic framework used throughout Ayurvedic medicine.'
      },
      {
        number: '1.17',
        sanskrit: 'अष्टौ ज्वरा भवन्ति वातपित्तकफवातपित्तवातकफपित्तकफवातपित्तकफसंनिपातागन्तवश्च',
        translation: 'Jwara occurs due to eight causative factors: vata, pitta, kapha, vata-pitta, vata-kapha, pitta-kapha, vata-pitta-kapha, and agantu (exogenous causes).',
        commentary: 'Classification of fever based on dosha combination provides the framework for differential diagnosis and treatment selection.'
      },
      {
        number: '1.19',
        sanskrit: 'रूक्षलघुशीतान्नपानसेविनः वमनविरेचनबस्तिव्यापत्तयः अतिव्यायामः वेगसन्धारणम्',
        translation: 'Vataja jwara causes: excess rough, light, cold food; overuse of emesis, purgation, enemas; overexertion; suppression of urges; fasting; injury; excessive copulation; agitation; grief; excess blood-letting; night vigils.',
        commentary: 'Comprehensive list of vata-aggravating factors specific to fever pathogenesis.'
      },
      {
        number: '1.20',
        sanskrit: 'विविक्तवायुर्विविक्तमाशयमुपेत्य तस्य रसमुष्मणा सह मूर्च्छित्वा',
        translation: 'Vitiated vayu enters the amashaya, mixes with body heat and rasa dhatu, blocks rasavaha and svedavaha srotas, displaces digestive heat outward through the body, causing fever.',
        commentary: 'Core pathogenesis explaining why fasting is first-line treatment for fever - amashaya must be cleared.'
      },
      {
        number: '1.21',
        sanskrit: 'यावदनुबध्नाति यावच्चाविर्भवति तावत् पूर्वरूपाणि भवन्ति',
        translation: 'Premonitory symptoms persist before fever manifests fully. Vatika symptoms: abrupt onset/remission, rough reddish skin/nails/eyes, cramps, dry mouth, thirst, insomnia.',
        commentary: 'Temporal patterns help identify predominant dosha - fever worsening at end of digestion indicates vata.'
      },
      {
        number: '1.22',
        sanskrit: 'अम्लकटुकक्षारलवणकटुतिक्तकान्यतिमात्रमश्नतः',
        translation: 'Paittika jwara causes: excess hot, sour, salty, alkali, pungent, bitter food; eating before digestion; intense heat/fire exposure; exhaustion; anger; untimely meals.',
        commentary: 'Pitta fever has simultaneous high temperature throughout body, worse during digestion and autumn.'
      },
      {
        number: '1.25',
        sanskrit: 'स्निग्धगुरुमधुष्णिग्धशीताम्ललवणान्यतिमात्रमश्नतः',
        translation: 'Shlaishmika jwara causes: excess unctuous, heavy, sweet, slimy, cold, sour, salty substances; day sleep; joy; sedentary lifestyle.',
        commentary: 'Kapha fever is mild but persistent, with heaviness, excess phlegm, and whitish discoloration.'
      },
      {
        number: '1.28',
        sanskrit: 'विषमाशनपानं कालव्यापत्तिः असात्म्यगन्धस्पर्शोपसेवनम्',
        translation: 'Sannipatika jwara causes: irregular diet, seasonal derangement, unsuitable odors, poisoned water, improper therapies (oleation, fomentation, emesis, purgation, enemas, nasal therapy), faulty post-therapy diet.',
        commentary: 'Most complex fever type with mixed dosha symptoms and variable prognosis.'
      },
      {
        number: '1.30',
        sanskrit: 'अभिघाताभिसङ्गाभिचाराभिशापैश्चागन्तवो भवन्ति',
        translation: 'Agantu jwara is caused by trauma, evil association, fascination, and wrath. Initially manifests without dosha vitiation, then doshas become secondarily vitiated.',
        commentary: 'Exogenous fever must be differentiated from endogenous fever for proper treatment approach.'
      },
      {
        number: '1.33',
        sanskrit: 'मुखस्यास्वाद्यं गुरुत्वमरोचको अविपाकः शिरसि तालुनोस्तापः',
        translation: 'General premonitory symptoms: abnormal mouth taste, body heaviness, food aversion, restlessness, yawning, shivering, exhaustion, giddiness, delirium, horripilation, tooth sensitivity.',
        commentary: 'Premonitory symptoms help in early diagnosis and prevention of full disease manifestation.'
      },
      {
        number: '1.35',
        sanskrit: 'ज्वरः सर्वप्राणभृतां जीवितं हरति सन्तापयति च शरीरम् इन्द्रियाणि मनश्च',
        translation: 'Jwara could take away the life of all creatures and causes santapa (grief) in body, sense organs, and mind. It is the king of all diseases.',
        commentary: 'Establishes the primacy and severity of fever among all diseases in Ayurvedic classification.'
      },
      {
        number: '1.38',
        sanskrit: 'घृतं जीर्णज्वरे सर्वश्रेष्ठम् - यथा जलेन सिक्ता दीप्तान् गृहान् निर्वापयन्ति',
        translation: 'As water is sprinkled on burning houses to douse the fire, ghee is administered to manage chronic fever. Ghee is considered superior to all other snehas.',
        commentary: 'Ghee uniquely accepts sanskara (processing with therapeutic drugs) to address all three doshas.'
      },
      {
        number: '1.39',
        sanskrit: 'घृतं वातं निरुणद्धि स्नेहात् कफं तत्कृतसंस्कारात् पित्तं शैत्यात्',
        translation: 'Medicated ghee pacifies vata by unctuousness, kapha by processed drugs, and pitta by its coldness.',
        commentary: 'The triple action of medicated ghee makes it ideal for chronic fever involving multiple doshas.'
      },
      {
        number: '1.4',
        sanskrit: 'अतस्त्रिविधा व्याधयः प्रादुर्भवन्ति- आग्नेयाः, सौम्याः, वायव्याश्च; द्विविधाश्चापरे- राजसाः, तामसाश्च',
        translation: 'Diseases manifest in three somatic types: Agneya (pitta dominant), Saumya (kapha dominant), Vayavya (vata dominant); and two psychic types: Rajas and Tamas.',
        commentary: 'Five-fold classification of all diseases - three somatic based on doshas and two psychic based on manasika doshas.'
      },
      {
        number: '1.5',
        sanskrit: 'तत्र व्याधिरामयो गद आतङ्को यक्ष्मा ज्वरो विकारो रोग इत्यनर्थान्तरम्',
        translation: 'Vyadhi, amaya, gada, atanka, yakshma, jwara, vikara, and roga are synonyms of disease.',
        commentary: 'Understanding disease synonyms helps in interpreting classical texts where different terms are used interchangeably.'
      },
      {
        number: '1.7',
        sanskrit: 'तत्र निदानं कारणमित्युक्तमग्रे',
        translation: 'Nidana is the cause or etiological factor as described earlier.',
        commentary: 'Nidana is the first component of Nidana Panchaka - understanding the cause is the foundation of diagnosis.'
      },
      {
        number: '1.8',
        sanskrit: 'पूर्वरूपं प्रागुत्पत्ति लक्षणं व्याधेः',
        translation: 'Symptoms that manifest before the appearance of the disease are known as poorvarupa (premonitory symptoms).',
        commentary: 'Premonitory symptoms enable early intervention before full disease manifestation - critical for preventive medicine.'
      },
      {
        number: '1.9',
        sanskrit: 'प्रादुर्भूतलक्षणं पुनर्लिङ्गम् तत्र लिङ्गमाकृतिर्लक्षणं चिह्नं संस्थानं व्यञ्जनं रूपमित्यनर्थान्तरम्',
        translation: 'Signs and symptoms when fully manifested are called linga. Linga, akruti, lakshana, chihna, samsthana, vyanjana, and rupa are synonyms.',
        commentary: 'Linga represents the fully manifested disease - the third component of Nidana Panchaka.'
      },
      {
        number: '1.10',
        sanskrit: 'उपशयः पुनर्हेतुव्याधिविपरीतानां विपरीतार्थकारिणां चौषधाहारविहाराणामुपयोगः सुखानुबन्धः',
        translation: 'Medicines, diets, and regimens that bring relief by acting directly on the cause or disease, or by producing opposite effects, are termed upashaya.',
        commentary: 'Upashaya (pacifying factors) is the fourth component - helps confirm diagnosis when symptoms are unclear.'
      },
      {
        number: '1.11',
        sanskrit: 'सम्प्राप्तिर्जातिरागतिरित्यनर्थान्तरं व्याधेः',
        translation: 'Jati and agati are synonyms of Samprapti (pathogenesis) of the disease.',
        commentary: 'Samprapti is the fifth component - understanding the complete disease mechanism from cause to manifestation.'
      },
      {
        number: '1.12',
        sanskrit: 'सा सङ्ख्याप्राधान्यविधिविकल्पबलकालविशेषैर्भिद्यते',
        translation: 'Samprapti can be classified by sankhya (numerical), pradhanya (dominance), vidhi (types), vikalpa (attributes), and bala-kala (time of manifestation).',
        commentary: 'Five modes of pathogenesis classification enable comprehensive understanding of disease progression.'
      },
      {
        number: '1.16',
        sanskrit: 'इह खलु ज्वर एवादौ विकाराणामुपदिश्यते, तत्प्रथमत्वाच्छारीराणाम्',
        translation: 'Jwara is described first among disorders because temperature (body heat) is a life-sustaining force and the first condition afflicting patients.',
        commentary: 'Body heat (ushma) is fundamental to life - its disturbance affects all metabolic processes.'
      },
      {
        number: '1.20',
        sanskrit: 'स यदा प्रकुपितः प्रविश्यामाशयमूष्मणा सह मिश्रीभूयाद्यमाहारपरिणामधातुं रसनामानमन्ववेत्य रसस्वेदवहानि स्रोतांसि पिधायाग्निमुपहत्य पक्तिस्थानादूष्माणं बहिर्निरस्य केवलं शरीरमनुप्रपद्यते, तदा ज्वरमभिनिर्वर्तयति',
        translation: 'Vitiated vayu enters amashaya, mixes with body heat and rasa dhatu, blocks rasavaha and svedavaha srotas, displaces digestive heat outward, causing fever throughout the body.',
        commentary: 'Core pathogenesis of vataja jwara - the mechanism of agni displacement explains why fasting is first-line treatment.'
      },
      {
        number: '1.23',
        sanskrit: 'तद्यदा प्रकुपितमामाशयादूष्माणमुपसृज्याद्यमाहारपरिणामधातुं रसनामानमन्ववेत्य रसस्वेदवहानि स्रोतांसि पिधाय द्रवत्वादग्निमुपहत्य पक्तिस्थानादूष्माणं बहिर्निरस्य प्रपीडयत् केवलं शरीरमनुप्रपद्यते, तदा ज्वरमभिनिर्वर्तयति',
        translation: 'Vitiated pitta enters amashaya, mixes with rasa and body heat, blocks channels due to liquid nature, displaces agni, causing pittaja jwara with intense burning.',
        commentary: 'Pittaja jwara pathogenesis explains the intense burning sensation and high fever throughout the body.'
      },
      {
        number: '1.26',
        sanskrit: 'स यदा प्रकुपितः प्रविश्यामाशयमूष्मणा सह मिश्रीभूयाद्यमाहारपरिणामधातुं रसनामानमन्ववेत्य रसस्वेदवहानि स्रोतांसि पिधायाग्निमुपहत्य पक्तिस्थानादूष्माणं बहिर्निरस्य प्रपीडयन् केवलं शरीरमनुप्रपद्यते, तदा ज्वरमभिनिर्वर्तयति',
        translation: 'Vitiated kapha enters amashaya, mixes with rasa and heat, blocks channels, displaces agni, causing shlaishmika jwara with mild fever and heaviness.',
        commentary: 'Kaphaja jwara has milder but more persistent symptoms due to kapha\'s heavy, stable qualities.'
      },
      {
        number: '1.28',
        sanskrit: 'विषमाशनादनशनादन्नपरिवर्तादृतुव्यापत्तेरसात्म्यगन्धोपघ्राणाद्विषोपहतस्य चोदकस्योपयोगात्',
        translation: 'Sannipatika jwara causes: irregular diet, fasting, food changes, seasonal derangement, unsuitable odors, poisoned water, improper therapies.',
        commentary: 'Most complex fever type requiring careful sequential dosha management.'
      },
      {
        number: '1.30',
        sanskrit: 'अभिघाताभिषङ्गाभिचाराभिशापेभ्य आगन्तुर्हि व्यथापूर्वोऽष्टमो ज्वरो भवति',
        translation: 'Agantu jwara is the eighth type, caused by trauma, evil association, fascination, and wrath. It manifests with pain and initially without dosha vitiation.',
        commentary: 'Exogenous fever must be differentiated from endogenous for proper treatment approach.'
      },
      {
        number: '1.36',
        sanskrit: 'तत्र पूर्वरूपदर्शने ज्वरादौ वा हितं लघ्वशनमपतर्पणं वा, ज्वरस्यामाशयसमुत्थत्वात्',
        translation: 'When premonitory symptoms appear or at fever onset, light diet or fasting is beneficial because jwara originates from amashaya.',
        commentary: 'Establishes fasting as first-line treatment - amashaya must be cleared to resolve fever.'
      },
      {
        number: '1.37',
        sanskrit: 'जीर्णज्वरेषु तु सर्वेष्वेव सर्पिषः पानं प्रशस्यते यथास्वौषधसिद्धस्य',
        translation: 'In all types of chronic fever, internal use of medicated ghee is universally recommended.',
        commentary: 'Ghee is superior to all other snehas for chronic fever because it uniquely accepts drug processing (sanskarasya anurupya).'
      },
      {
        number: '1.38',
        sanskrit: 'यथा प्रज्वलितं वेश्म परिषिञ्चन्ति वारिणा नराः शान्तिमभिप्रेत्य तथा जीर्णज्वरे घृतम्',
        translation: 'As water is sprinkled on burning houses to douse fire, ghee is administered to manage chronic fever.',
        commentary: 'Beautiful analogy comparing ghee\'s action on chronic fever to water extinguishing fire.'
      },
      {
        number: '1.40',
        sanskrit: 'लङ्घनं पाचनं तीक्ष्णाः दीपनीयाश्च ये द्रवाः - ज्वरस्यामे हितास्तान् वै विद्यात् आमज्वरे भिषक्',
        translation: 'In ama jwara (fever with ama), fasting (langhana), digestives (pachana), sharp herbs (tikshna), and appetizers (deepaniya) are beneficial.',
        commentary: 'Differentiates ama jwara treatment from nirama jwara - ama must be cleared before nourishing therapy.'
      },
      {
        number: '1.41',
        sanskrit: 'निरामे स्नेहस्वेदबस्तयः प्रधानाः - बृंहणीयानि चौषधानि',
        translation: 'In nirama jwara (fever without ama), oleation, fomentation, basti, and nourishing medicines are primary.',
        commentary: 'Once ama is cleared, treatment shifts to nourishing and vata-pacifying measures.'
      },
      {
        number: '1.42',
        sanskrit: 'सन्ततज्वरे घृतं तैलं वा दशमूलक्वाथसिद्धम् पाययेत्',
        translation: 'In santata (continuous) jwara, medicated ghee or oil prepared with dashamoola decoction should be administered.',
        commentary: 'Santata jwara is the most severe form - requires immediate strong measures with dashamoola preparations.'
      },
      {
        number: '1.43',
        sanskrit: 'विषमज्वरे प्रातः वमनं सायं विरेचनं रात्रौ बस्तिः',
        translation: 'In vishama (intermittent) jwara: emesis in the morning, purgation in the evening, and basti at night.',
        commentary: 'Timing-based treatment for intermittent fever - different therapies at different times of day.'
      },
      {
        number: '1.44',
        sanskrit: 'ज्वरे तृष्णा चर्दिरतिसारश्चेत् तान् पूर्वं चिकित्सेत्',
        translation: 'If fever is accompanied by thirst, vomiting, or diarrhea, treat these complications first before treating the fever itself.',
        commentary: 'Priority-based treatment - complications must be managed before the primary disease.'
      },
      {
        number: '1.45',
        sanskrit: 'ज्वरितस्य लघ्वशनम् हितम् - यवागू वा मण्डो वा',
        translation: 'For the fever patient, light food is beneficial - liquid gruel (yavagu) or supernatant water (manda).',
        commentary: 'Dietary management during fever - only liquid, light, easily digestible foods should be given.'
      },
      {
        number: '1.46',
        sanskrit: 'ज्वरे शीतम् उदकम् पानम् हितम् - अम्बु पानम् अपि अमज्वरे',
        translation: 'Cold water is beneficial for drinking in fever. However, in ama jwara, even water intake should be restricted.',
        commentary: 'Hydration management differs by fever type - ama jwara needs restriction, nirama jwara needs hydration.'
      },
      {
        number: '1.47',
        sanskrit: 'ज्वरे मधु घृतं च प्रशस्तम् - मधु लघु रूक्षं कफपित्तहरम्',
        translation: 'Honey and ghee are praised in fever. Honey is light, dry, and pacifies kapha and pitta. Ghee is unctuous and pacifies vata and pitta.',
        commentary: 'Both honey and ghee have specific roles in fever management based on their qualities.'
      }
    ],
    topics: [
      {
        title: 'Samprapti (Pathogenesis) of Jwara',
        content: 'Step 1: Vitiated dosha enters amashaya (stomach). Step 2: Mixes with body heat (ushma) and contacts ahara rasa. Step 3: Blocks rasavaha and svedavaha srotas. Step 4: Digestive agni displaced from pakti sthana. Step 5: Heat cannot dissipate through blocked sweat channels, spreads throughout body causing fever. The mechanism of agni displacement explains why fasting is first-line treatment.',
        clinicalRelevance: 'Understanding the amashaya as the primary site explains why fasting and light diet are first-line treatments for fever.'
      },
      {
        title: 'Agantuja Jwara (Exogenous Fever)',
        content: 'Caused by abhighata (trauma), abhisanga (evil association/possession), abhichara (fascination/sorcery), and abhisapa (curse). Initially manifests without dosha vitiation, then doshas become secondarily vitiated. Trauma-based involves rakta and vata; evil association involves vata-pitta; sorcery leads to full sannipata. Important for differential diagnosis.',
        clinicalRelevance: 'Important for differential diagnosis when fever presents without clear dietary or lifestyle triggers.'
      },
      {
        title: 'Classification by Timing',
        content: 'Fever symptoms vary by time of day and season: Vatika worsens at end of digestion/day/night and in summer. Paittika worsens during digestion, at midday/midnight, and in autumn. Shlaishmika worsens just after meals, in forenoon, early night, and spring. Temporal patterns are critical diagnostic clues.',
        clinicalRelevance: 'Temporal patterns help identify the predominant dosha involved in fever presentation.'
      },
      {
        title: 'Chronic Fever Management',
        content: 'In all types of chronic (jirna) jwara, medicated ghee is universally recommended. Ghee is superior to all other snehas because it uniquely accepts drug processing properties (sanskarasya anurupya). Ghee pacifies vata through unctuousness, kapha through processing with appropriate drugs, and pitta through its cold quality.',
        clinicalRelevance: 'Ghee-based formulations are the cornerstone of chronic fever management regardless of dosha type.'
      },
      {
        title: 'Nidana Panchaka - Five Diagnostic Tools',
        content: 'Nidana (etiology), Purvarupa (premonitory signs), Linga (signs/symptoms), Upashaya (pacifying factors), Samprapti (pathogenesis). These five components form the complete diagnostic framework for all diseases. Understanding all five enables accurate diagnosis and treatment selection.',
        clinicalRelevance: 'Systematic application of Nidana Panchaka prevents misdiagnosis and guides comprehensive treatment.'
      },
      {
        title: 'Shatkriyakala - Six Stages of Disease Progression',
        content: 'Sanchaya (accumulation), Prakopa (aggravation), Prasara (spread), Sthanasamshraya (localization), Vyakta (manifestation), Bheda (complications). Early intervention at Sanchaya/Prakopa stages prevents disease progression. Understanding these stages enables preventive medicine.',
        clinicalRelevance: 'Recognizing disease stage guides treatment intensity - early stages need mild measures, later stages need strong interventions.'
      },
      {
        title: 'Jwara as Nidanarthakara (Disease Causing Disease)',
        content: 'Jwara can be both an independent disease and a secondary condition of other diseases. It can also be an etiology for other conditions. For example, jwara gives rise to raktapitta, which in turn causes jwara, and both cause shotha (swelling). This bidirectional relationship is important for comprehensive treatment.',
        clinicalRelevance: 'Treating fever promptly prevents secondary complications and disease progression.'
      },
      {
        title: 'Modern Correlations of Jwara Types',
        content: 'Vatika jwara correlates with viral fever with myalgia. Paittika jwara correlates with bacterial infections with high fever. Shlaishmika jwara correlates with low-grade fevers with respiratory symptoms. Sannipatika jwara correlates with severe infections like typhoid, malaria with complications. Agantu jwara correlates with post-traumatic or post-surgical fever.',
        clinicalRelevance: 'Understanding modern correlations helps integrate Ayurvedic diagnosis with contemporary laboratory investigations.'
      },
      {
        title: 'Prognostic Criteria for Jwara',
        content: 'Sadhya (curable): Single dosha, recent onset, strong patient, no complications. Krichchrasadhya (difficult): Two doshas, moderate duration, some complications. Asadhya (incurable): Sannipata with severe complications, weak patient, multiple organ involvement. Prognosis depends on dosha involvement, disease duration, patient strength, and presence of complications.',
        clinicalRelevance: 'Accurate prognostic assessment guides treatment planning and patient counseling.'
      },
      {
        title: 'Ama Jwara vs Nirama Jwara',
        content: 'Ama jwara presents with coated tongue, loss of appetite, body ache, heaviness, nausea, and indigestion. Treatment focuses on langhana (fasting), pachana (digestives), and deepana (appetizers). Nirama jwara presents with clean tongue, moderate appetite, and responds to nourishing therapy. Differentiation is critical for treatment selection - giving nourishing therapy in ama jwara worsens the condition.',
        clinicalRelevance: 'Ama-nirama differentiation is the first clinical decision in fever management - determines the entire treatment approach.'
      },
      {
        title: 'Vishama Jwara (Intermittent/Recurrent Fever)',
        content: 'Vishama jwara has irregular patterns of remission and relapse. Three subtypes: Satata (equal duration of fever and remission), Viparyaya (unequal duration), and Tritiyaka (every third day). Treatment varies by timing: morning recurrence responds to vamana, evening to virechana, and night to basti. Modern correlation includes malaria, typhoid relapses, and chronic infections.',
        clinicalRelevance: 'Timing of recurrence is a critical diagnostic clue and guides treatment timing.'
      },
      {
        title: 'Santata Jwara (Continuous Fever)',
        content: 'Santata jwara is the most severe form - continuous fever without any remission period. It indicates severe sannipata with all three doshas vitiated. Patient experiences unrelenting fever with progressive weakness, delirium, and multi-organ involvement. Treatment requires immediate strong measures: dashamoola ghrita, cold sponging, complete fasting initially. Prognosis is guarded to poor.',
        clinicalRelevance: 'Continuous fever without remission indicates severe pathology requiring aggressive intervention.'
      },
      {
        title: 'Jwara Complications (Upadrava)',
        content: 'Common complications: Trishna (severe thirst) - indicates pitta aggravation and dehydration; Atisara (diarrhea) - indicates ama in pakwashaya; Chardi (vomiting) - indicates ama in amashaya; Shwasa (dyspnea) - indicates vata-kapha involvement; Hridgraha (chest pain) - indicates cardiac involvement. Each complication requires specific management before the primary fever can be addressed.',
        clinicalRelevance: 'Complications must be prioritized in treatment - they indicate specific dosha involvement and guide herb selection.'
      },
      {
        title: 'Punaravartaka Jwara (Recurrent Fever)',
        content: 'Fever that recurs after apparent cure due to incomplete treatment or premature return to normal diet/activity. Causes include: intake of heavy food before agni fully recovers, excessive physical activity, emotional stress, seasonal changes. Prevention requires proper langhana-karana (completion of fasting therapy), gradual return to normal diet, and monitoring for relapse signs.',
        clinicalRelevance: 'Incomplete treatment is a common cause of fever recurrence - proper protocol completion is essential.'
      }
    ],
    doshaDiscussion: [
      'Vata: Irregular fever, rough skin, reddish nails/eyes, cramps, joint looseness, dry mouth, thirst, insomnia, desire for warmth',
      'Pitta: High fever throughout body, pungent taste, ulceration of nose/mouth/throat, thirst, bilious vomiting, green/yellow discoloration, burning sensation, desire for cold',
      'Kapha: Mild fever, heaviness, sweet taste, nausea, phlegm, excessive sleep, stiffness, cough, whitish discoloration, desire for warmth',
      'Sannipatika: Mixed symptoms of all three doshas, complex and variable presentation',
      'Agantu: No prodromal symptoms, trauma-based, must differentiate from endogenous'
    ],
    treatmentProtocols: [
      {
        condition: 'Acute Fever (Nava Jwara)',
        treatment: 'Light diet or fasting since jwara originates from amashaya. Decoctions, massage, oleation, fomentation. Emesis, purgation, basti, nasal therapy, fumigation as appropriate.',
        herbs: ['Musta', 'Parpata', 'Kiratatikta', 'Ushira', 'Chandana'],
        dosage: 'As directed by physician based on severity',
        duration: 'Until fever breaks',
        precautions: ['Avoid heavy food', 'Avoid exertion', 'Stay hydrated']
      },
      {
        condition: 'Chronic Fever (Jirna Jwara)',
        treatment: 'Internal use of medicated ghee is universally recommended. Ghee is superior to all other snehas for chronic fever.',
        herbs: ['Guduchi', 'Amalaki', 'Haritaki', 'Shunthi', 'Pippali'],
        dosage: 'Medicated ghee 10-15ml twice daily with warm water',
        duration: '7-14 days',
        precautions: ['Monitor for digestive issues', 'Adjust based on agni capacity']
      },
      {
        condition: 'Vataja Jwara',
        treatment: 'Oleation, fomentation, sweet/sour/salty tastes, medicated ghee, basti. Warm unctuous diet and regimen.',
        herbs: ['Dashamoola', 'Eranda', 'Shunthi', 'Rasna', 'Guduchi'],
        dosage: 'Decoction 40-60ml twice daily',
        duration: '7-14 days',
        precautions: ['Avoid cold exposure', 'Avoid light/dry foods']
      },
      {
        condition: 'Paittika Jwara',
        treatment: 'Sweet, bitter, astringent tastes; cold therapy; purgation (virechana). Cool, light diet.',
        herbs: ['Chandana', 'Ushira', 'Amalaki', 'Guduchi', 'Shatavari'],
        dosage: 'Decoction 40-60ml twice daily',
        duration: '7-14 days',
        precautions: ['Avoid hot/sour/salty foods', 'Avoid sun exposure']
      },
      {
        condition: 'Shlaishmika Jwara',
        treatment: 'Emesis (vamana), light diet, pungent/bitter/astringent tastes, fomentation. Avoid heavy/sweet foods.',
        herbs: ['Tulsi', 'Pippali', 'Shunthi', 'Haridra', 'Trikatu'],
        dosage: 'Decoction 40-60ml twice daily',
        duration: '7-14 days',
        precautions: ['Avoid day sleep', 'Avoid heavy/cold foods']
      },
      {
        condition: 'Sannipatika Jwara',
        treatment: 'Sequential dosha management - address predominant dosha first. Strong purification measures with careful monitoring. Medicated ghee with triphala.',
        herbs: ['Triphala', 'Guduchi', 'Dashamoola', 'Musta', 'Parpata'],
        dosage: 'As directed by physician based on dosha predominance',
        duration: '14-21 days',
        precautions: ['Monitor for complications', 'Adjust treatment based on response', 'Avoid contradictory therapies']
      },
      {
        condition: 'Agantu Jwara (Exogenous Fever)',
        treatment: 'Address specific etiology first. Trauma-based needs wound care and vata management. Evil association requires spiritual measures. Supportive dosha pacification.',
        herbs: ['Dashamoola', 'Guduchi', 'Ashwagandha', 'Bala', 'Shatavari'],
        dosage: 'As directed by physician',
        duration: 'Variable based on cause',
        precautions: ['Identify and remove cause', 'Differentiate from endogenous fever']
      },
      {
        condition: 'Jwara with Complications',
        treatment: 'When fever presents with trishna (thirst), atisara (diarrhea), or chardi (vomiting), treat complications first. Use Musta Kashaya for trishna, Kutaja for atisara, and Ela for chardi.',
        herbs: ['Musta', 'Kutaja', 'Ela', 'Chandana', 'Ushira'],
        dosage: 'Decoction 20-40ml as needed',
        duration: 'Until complications resolve',
        precautions: ['Hydration is critical', 'Monitor electrolyte balance']
      },
      {
        condition: 'Vishama Jwara (Intermittent/Recurrent Fever)',
        treatment: 'Treatment varies by timing of recurrence. Morning recurrence: vamana. Evening recurrence: virechana. Night recurrence: basti. Irregular recurrence: comprehensive panchakarma.',
        herbs: ['Guduchi', 'Amalaki', 'Haritaki', 'Shunthi', 'Pippali'],
        dosage: 'As directed based on recurrence pattern',
        duration: '7-21 days',
        precautions: ['Track recurrence pattern', 'Time treatments accordingly']
      },
      {
        condition: 'Santata Jwara (Continuous Fever)',
        treatment: 'Most severe form - continuous fever without remission. Requires immediate strong measures. Medicated ghee with dashamoola. Cold sponging. Avoid all solid food initially.',
        herbs: ['Dashamoola', 'Guduchi', 'Amalaki', 'Chandana', 'Ushira'],
        dosage: 'Ghee 15-20ml with decoction, 3-4 times daily',
        duration: 'Until fever shows remission pattern',
        precautions: ['Critical condition - monitor closely', 'Maintain hydration', 'Avoid exertion']
      },
      {
        condition: 'Jwara with Trishna (Thirst)',
        treatment: 'When fever is accompanied by severe thirst, use Sheetala (cooling) drinks. Chandana and Ushira decoction with cold water. Pravala Pishti with cold milk. Coconut water and sugarcane juice for hydration.',
        herbs: ['Chandana', 'Ushira', 'Kamala', 'Padmaka', 'Madhuka'],
        dosage: 'Chandana-Ushira Kashaya 40ml cold, every 2 hours',
        duration: 'Until thirst subsides',
        precautions: ['Maintain electrolyte balance', 'Avoid hot drinks', 'Monitor for dehydration']
      },
      {
        condition: 'Jwara with Atisara (Diarrhea)',
        treatment: 'When fever presents with diarrhea, use Kutaja (Holarrhena antidysenterica) as primary herb. Bilva (Aegle marmelos) for astringent effect. Musta (Cyperus rotundus) for ama digestion. Light liquid diet only.',
        herbs: ['Kutaja', 'Bilva', 'Musta', 'Dadima', 'Jambu'],
        dosage: 'Kutaja Ghana Vati 500mg twice daily with rice water',
        duration: 'Until diarrhea stops',
        precautions: ['Hydration critical', 'ORS or rice water', 'Avoid solid food until diarrhea stops']
      },
      {
        condition: 'Jwara with Chardi (Vomiting)',
        treatment: 'When fever presents with vomiting, use Ela (cardamom) and Eladi Vati for antiemetic effect. Small sips of cold water with honey. Avoid strong purgation. Light liquid diet in small quantities.',
        herbs: ['Ela', 'Lavanga', 'Dhanyaka', 'Jeeraka', 'Shunthi'],
        dosage: 'Eladi Vati 2 tablets dissolved slowly, 3-4 times daily',
        duration: 'Until vomiting stops',
        precautions: ['Small frequent sips', 'Avoid heavy food', 'Maintain hydration']
      },
      {
        condition: 'Ama Jwara (Fever with Ama)',
        treatment: 'Langhana (fasting), pachana (digestives), deepana (appetizers). Light liquid diet. Tikshna (sharp) and katu (pungent) herbs for ama digestion. Avoid all nourishing and heavy therapies until ama is cleared.',
        herbs: ['Musta', 'Parpata', 'Kiratatikta', 'Shunthi', 'Pippali'],
        dosage: 'Musta Kashaya 40ml twice daily before meals',
        duration: 'Until ama signs clear (clean tongue, appetite returns)',
        precautions: ['No solid food until ama clears', 'Avoid nourishing therapy', 'Monitor for ama signs']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Light diet (laghu ahara), warm water, liquid gruels (yavagu), old rice, barley water, mung dal soup, light vegetable soups',
      'Pathya: Coriander, cumin, fennel, ginger, black pepper, rock salt in moderation',
      'Pathya: Pomegranate, apple, pears (cooked), coconut water, buttermilk (diluted)',
      'Apathya (Avoid): Heavy foods (guru ahara), oily/fried foods, red meat, dairy (except buttermilk)',
      'Apathya: Cold foods and drinks, ice cream, cold water, raw vegetables, salads',
      'Apathya: Sour foods (yogurt, vinegar, citrus in excess), incompatible food combinations (viruddha ahara)',
      'Apathya: Day sleep, excessive physical exertion, emotional stress, suppression of natural urges',
      'Apathya: Alcohol, smoking, exposure to cold wind, excessive sexual activity',
      'Pathya: Mung dal soup with cumin and rock salt - easily digestible protein source',
      'Pathya: Rice water (tandulodaka) for hydration and mild nourishment',
      'Pathya: Jeeraka (cumin) water for improving digestion during fever',
      'Pathya: Honey mixed with warm water for kapha-pitta pacification',
      'Apathya: Curd (dadhi) during fever - increases kapha and ama',
      'Apathya: Heavy pulses (chana, rajma, urad) during acute fever',
      'Apathya: Excessive rest without any movement - leads to kapha accumulation'
    ],
    diseaseDescriptions: [
      {
        name: 'Vatika Jwara',
        sanskrit: 'वातिक ज्वर',
        etiology: 'Excess dry, light, cold foods; overuse of emesis/purgation/basti; overexertion; suppression of urges; fasting; trauma; sexual excess; grief; night vigils',
        symptoms: ['Irregular onset/remission', 'Worsens at end of digestion/summer', 'Rough skin', 'Reddish nails/eyes/face', 'Cramps in calves', 'Joint looseness', 'Dry mouth/throat', 'Thirst', 'Insomnia', 'Desire for warmth', 'Numbness in feet', 'Pain radiating upward', 'Jaw immobility', 'Tinnitus', 'Temple pain', 'Yawning', 'Shivering'],
        prognosis: 'Sadhya (curable) with proper vata-pacifying treatment',
        treatment: 'Oleation, fomentation, sweet/sour/salty tastes, medicated ghee, basti'
      },
      {
        name: 'Paittika Jwara',
        sanskrit: 'पैत्तिक ज्वर',
        etiology: 'Excess hot, sour, salty, alkali, pungent, bitter foods; eating before digestion; sun/fire exposure; anger; untimely meals',
        symptoms: ['High fever throughout body', 'Worsens during digestion/autumn', 'Pungent taste in mouth', 'Ulceration of nose/mouth/throat/lips/palate', 'Unquenchable thirst', 'Bilious vomiting', 'Green/yellow discoloration', 'Burning sensation', 'Narcosis', 'Giddiness', 'Fainting', 'Reddish body patches'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Sweet, bitter, astringent tastes; cold therapy; purgation (virechana)'
      },
      {
        name: 'Shlaishmika Jwara',
        sanskrit: 'श्लैष्मिक ज्वर',
        etiology: 'Excess unctuous, heavy, sweet, cold foods; daytime sleeping; excessive joy; sedentary lifestyle',
        symptoms: ['Mild fever throughout body', 'Heaviness', 'Sweet taste', 'Nausea', 'Excess phlegm', 'Excessive sleep', 'Cough', 'Whitish discoloration', 'Stiffness', 'Drowsiness', 'Dyspnea', 'Coryza', 'Coldness', 'Urticarial patches'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Emesis (vamana), light diet, pungent/bitter/astringent tastes, fomentation'
      },
      {
        name: 'Vata-Paittika Jwara',
        sanskrit: 'वातपैत्तिक ज्वर',
        etiology: 'Combined vata and pitta aggravating factors',
        symptoms: ['Mixed symptoms of vata and pitta', 'Irregular fever with burning', 'Dry mouth with pungent taste', 'Reddish discoloration with dryness'],
        prognosis: 'Sadhya (curable) with combined vata-pitta pacifying treatment',
        treatment: 'Sweet taste predominant, medicated ghee, both cooling and oleation'
      },
      {
        name: 'Vata-Shlaishmika Jwara',
        sanskrit: 'वातश्लैष्मिक ज्वर',
        etiology: 'Combined vata and kapha aggravating factors',
        symptoms: ['Mixed symptoms of vata and kapha', 'Irregular fever with heaviness', 'Dry mouth with sweet taste', 'Joint pain with stiffness'],
        prognosis: 'Sadhya (curable) with combined vata-kapha pacifying treatment',
        treatment: 'Oleation with fomentation, sweet/sour/salty tastes'
      },
      {
        name: 'Pitta-Shlaishmika Jwara',
        sanskrit: 'पित्तश्लैष्मिक ज्वर',
        etiology: 'Combined pitta and kapha aggravating factors',
        symptoms: ['Mixed symptoms of pitta and kapha', 'Fever with heaviness and burning', 'Nausea with pungent taste', 'Phlegm with yellowish tinge'],
        prognosis: 'Sadhya (curable) with combined pitta-kapha pacifying treatment',
        treatment: 'Bitter/astringent tastes, purgation with fomentation'
      },
      {
        name: 'Sannipatika Jwara',
        sanskrit: 'सन्निपातिक ज्वर',
        etiology: 'Irregular eating, seasonal disturbances, improper Panchakarma, contaminated water, combination of all three dosha causes',
        symptoms: ['Mixed symptoms of all three doshas', 'Complex and variable presentation', 'Severe systemic involvement'],
        prognosis: 'Krichchrasadhya (difficult to treat) or Asadhya (incurable) depending on severity',
        treatment: 'Sequential dosha management, strong measures, careful monitoring'
      },
      {
        name: 'Agantuja Jwara',
        sanskrit: 'आगन्तुज ज्वर',
        etiology: 'Trauma (abhighata), evil association (abhisanga), fascination (abhichara), curse (abhisapa)',
        symptoms: ['No prodromal symptoms', 'Sudden onset', 'Trauma-based involves rakta and vata', 'Evil association involves vata-pitta', 'Sorcery leads to full sannipata'],
        prognosis: 'Sadhya (curable) when cause is identified and addressed',
        treatment: 'Address specific etiology, trauma-based needs wound care and vata management'
      },
      {
        name: 'Santata Jwara',
        sanskrit: 'सन्तत ज्वर',
        etiology: 'Severe sannipata, all three doshas vitiated simultaneously, improper treatment of acute fever',
        symptoms: ['Continuous fever without remission', 'Progressive weakness', 'Delirium', 'Multi-organ involvement', 'Severe debility', 'Loss of consciousness'],
        prognosis: 'Krichchrasadhya (difficult to treat) to Asadhya depending on severity',
        treatment: 'Dashamoola ghrita, cold sponging, complete fasting initially, strong measures'
      },
      {
        name: 'Vishama Jwara',
        sanskrit: 'विषम ज्वर',
        etiology: 'Improper treatment of acute fever, incomplete elimination of doshas, irregular diet during convalescence',
        symptoms: ['Irregular fever pattern', 'Satata: equal fever and remission', 'Viparyaya: unequal duration', 'Tritiyaka: every third day', 'Chaturthaka: every fourth day'],
        prognosis: 'Sadhya (curable) with timing-based treatment',
        treatment: 'Morning recurrence: vamana; Evening: virechana; Night: basti'
      },
      {
        name: 'Punaravartaka Jwara',
        sanskrit: 'पुनरावर्तक ज्वर',
        etiology: 'Incomplete treatment, premature return to heavy food, excessive activity, emotional stress',
        symptoms: ['Fever recurs after apparent cure', 'Similar symptoms to original fever', 'Fatigue', 'Weakness'],
        prognosis: 'Sadhya (curable) with proper completion of treatment',
        treatment: 'Complete langhana-karana, gradual diet progression, monitoring for relapse'
      },
      {
        name: 'Ama Jwara',
        sanskrit: 'आम ज्वर',
        etiology: 'Mandagni (weak digestive fire), heavy food intake, irregular diet, sedentary lifestyle',
        symptoms: ['Coated tongue', 'Loss of appetite', 'Body ache', 'Heaviness', 'Nausea', 'Indigestion', 'Fever with ama signs'],
        prognosis: 'Sadhya (curable) with langhana and pachana',
        treatment: 'Langhana (fasting), pachana (digestives), deepana (appetizers), light liquid diet'
      },
      {
        name: 'Dhatugata Jwara',
        sanskrit: 'धातुगत ज्वर',
        etiology: 'Fever penetrating deeper tissues (dhatus) due to delayed or improper treatment',
        symptoms: ['Fever affecting specific dhatus', 'Rasa: anorexia, heaviness', 'Rakta: skin rashes, bleeding', 'Mamsa: muscle pain', 'Medas: excessive sweating', 'Asthi: bone pain', 'Majja: drowsiness', 'Shukra: loss of vitality'],
        prognosis: 'Krichchrasadhya (difficult) depending on dhatu involvement',
        treatment: 'Dhatu-specific treatment along with general fever management'
      },
      {
        name: 'Vataja Jwara',
        sanskrit: 'वातज ज्वर',
        etiology: 'Vata-aggravating factors: cold, dry, light foods, excessive travel, anxiety, irregular routine',
        symptoms: ['Irregular fever', 'Body ache', 'Joint pain', 'Dry skin', 'Constipation', 'Distension', 'Pain in flanks'],
        prognosis: 'Sadhya (curable) with vata-pacifying treatment',
        treatment: 'Snehana (oleation), swedana (fomentation), basti (enema), warm nourishing diet'
      },
      {
        name: 'Pittaja Jwara',
        sanskrit: 'पित्तज ज्वर',
        etiology: 'Pitta-aggravating factors: hot, sour, salty foods, anger, heat exposure, excessive sun',
        symptoms: ['High fever', 'Burning sensation', 'Excessive thirst', 'Sweating', 'Yellow discoloration', 'Bitter taste'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Cold therapy, purgation (virechana), bitter herbs, cooling diet'
      },
      {
        name: 'Kaphaja Jwara',
        sanskrit: 'कफज ज्वर',
        etiology: 'Kapha-aggravating factors: heavy, sweet, cold foods, sedentary lifestyle, excessive sleep',
        symptoms: ['Low-grade fever', 'Heaviness', 'Stiffness', 'Nausea', 'Loss of appetite', 'White coating on tongue'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Emesis (vamana), fasting, light diet, pungent herbs, warm fomentation'
      },
      {
        name: 'Sannipatika Jwara',
        sanskrit: 'सन्निपातिक ज्वर',
        etiology: 'All three doshas vitiated simultaneously, severe infection, improper treatment',
        symptoms: ['Mixed symptoms of all three doshas', 'Irregular fever pattern', 'Multiple complications', 'Severe debility'],
        prognosis: 'Krichchrasadhya (difficult) to Asadhya depending on severity',
        treatment: 'Sequential dosha management, strong elimination therapies, rasayana'
      },
      {
        name: 'Agantu Jwara',
        sanskrit: 'आगन्तुज ज्वर',
        etiology: 'Exogenous causes: trauma, infection, poison, foreign body, surgical complications',
        symptoms: ['Fever with external cause', 'Localized symptoms', 'Signs of trauma or infection', 'Acute onset'],
        prognosis: 'Sadhya (curable) when cause is addressed',
        treatment: 'Address the specific cause, wound care, antibiotics if needed, supportive care'
      }
    ],
    importantVerses: [
      '1.3: Synonyms of nidana (causative factors)',
      '1.6: Five diagnostic tools (Nidana Panchaka)',
      '1.17: Eight types of jwara',
      '1.19-25: Specific etiology of each dosha type',
      '1.28: Sannipatika jwara causes',
      '1.30: Agantu jwara causes',
      '1.33: Premonitory symptoms common to all types',
      '1.35: Jwara as king of all diseases',
      '1.38: Ghee for chronic fever',
      '1.39: Triple action of medicated ghee',
      '1.40: Ama jwara treatment - langhana and pachana',
      '1.41: Nirama jwara treatment - snehana and basti',
      '1.42: Santata jwara - dashamoola ghrita',
      '1.43: Vishama jwara - timing-based treatment',
      '1.44: Complications take priority over primary fever',
      '1.45: Light diet (yavagu) for fever patients',
      '1.46: Water intake management in ama vs nirama',
      '1.47: Honey and ghee in fever management'
    ],
    clinicalApplications: [
      'Fever classification guides treatment: vata fever needs oleation, pitta fever needs cooling, kapha fever needs elimination',
      'Temporal patterns (time of day, season) help identify predominant dosha',
      'Ghee-based treatments are universal for chronic fever regardless of dosha type',
      'Fasting is first-line for acute fever since amashaya is the primary site',
      'Exogenous fever must be differentiated from endogenous fever for proper treatment',
      'Premonitory symptoms enable early intervention before full disease manifestation',
      'Sannipatika fever requires careful sequential dosha management',
      'Jwara is the king of all diseases (sarvarogadhipati) - affects body, mind, and senses',
      'Amashaya (stomach) is the primary site - explains why fasting is first-line treatment',
      'Body heat (ushma) displacement mechanism - heat pushed out from pakti sthana',
      'Rasa dhatu and svedavaha srotas involvement in pathogenesis',
      'Ghee is superior to all other snehas for chronic fever (sanskarasya anurupya)',
      'Three types of nidana: Asatmyendriyarthasamyoga, Prajnaparadha, Kala',
      'Five types of diseases: Agneya, Saumya, Vayavya (somatic), Rajas, Tamas (psychic)',
      'Classification by timing helps identify predominant dosha',
      'Shatkriyakala (six stages) enables early intervention',
      'Jwara as nidanarthakara - can cause other diseases',
      'Modern correlations: Vatika-viral, Paittika-bacterial, Shlaishmika-respiratory',
      'Ama jwara requires fasting and digestives before any nourishing therapy',
      'Nirama jwara responds to oleation, fomentation, and basti',
      'Santata jwara (continuous) is the most severe form requiring immediate strong measures',
      'Vishama jwara (intermittent) requires timing-based treatment strategy',
      'Punaravartaka jwara (recurrent) indicates incomplete treatment',
      'Dhatugata jwara indicates fever has penetrated deeper tissues',
      'Complications like trishna, atisara, chardi must be treated before primary fever',
      'Honey and ghee have specific complementary roles in fever management',
      'Liquid gruel (yavagu) is the ideal food during fever',
      'Water intake must be adjusted based on ama status',
      'Jwara affects body, mind, and senses - comprehensive approach needed',
      'Vata jwara: dryness, irregularity, pain predominance',
      'Pitta jwara: heat, burning, inflammation predominance',
      'Kapha jwara: heaviness, stiffness, cold predominance',
      'Sannipatika jwara: mixed symptoms, most challenging to treat',
      'Agantu jwara: exogenous cause must be identified and addressed',
      'Seasonal patterns help predict fever type and severity',
      'Dietary management is as important as herbal treatment',
      'Fasting protocols must be individualized based on patient strength',
      'Ghee preparations should be warm, not hot, for optimal absorption',
      'Chronic fever patients need rasayana therapy for recovery',
      'Fever with complications requires treating complications first',
      'Prognosis assessment guides treatment intensity and counseling',
      'Patient education about fever management improves compliance',
      'Integration with modern diagnostics enhances diagnostic accuracy',
      'Prevention through seasonal regimen and dietary discipline',
      'Dashamoola Ghrita is the primary treatment for santata jwara',
      'Timing-based treatment for vishama jwara based on dosha vitiation patterns',
      'Ghee is superior to all other snehas for chronic fever',
      'Fasting is first-line for acute fever since amashaya is the primary site',
      'Body heat displacement mechanism explains fever pathogenesis',
      'Rasa dhatu and svedavaha srotas involvement in fever',
      'Three types of nidana: Asatmyendriyarthasamyoga, Prajnaparadha, Kala',
      'Five types of diseases: Agneya, Saumya, Vayavya (somatic), Rajas, Tamas (psychic)',
      'Classification by timing helps identify predominant dosha',
      'Shatkriyakala (six stages) enables early intervention',
      'Jwara as nidanarthakara - can cause other diseases',
      'Modern correlations: Vatika-viral, Paittika-bacterial, Shlaishmika-respiratory',
      'Ama jwara requires fasting and digestives before any nourishing therapy',
      'Nirama jwara responds to oleation, fomentation, and basti',
      'Santata jwara (continuous) is the most severe form requiring immediate strong measures',
      'Vishama jwara (intermittent) requires timing-based treatment strategy',
      'Punaravartaka jwara (recurrent) indicates incomplete treatment',
      'Dhatugata jwara indicates fever has penetrated deeper tissues',
      'Complications like trishna, atisara, chardi must be treated before primary fever',
      'Honey and ghee have specific complementary roles in fever management',
      'Liquid gruel (yavagu) is the ideal food during fever',
      'Water intake must be adjusted based on ama status',
      'Jwara affects body, mind, and senses - comprehensive approach needed',
      'Vata jwara: dryness, irregularity, pain predominance',
      'Pitta jwara: heat, burning, inflammation predominance',
      'Kapha jwara: heaviness, stiffness, cold predominance',
      'Sannipatika jwara: mixed symptoms, most challenging to treat',
      'Agantu jwara: exogenous cause must be identified and addressed',
      'Seasonal patterns help predict fever type and severity',
      'Dietary management is as important as herbal treatment',
      'Fasting protocols must be individualized based on patient strength',
      'Ghee preparations should be warm, not hot, for optimal absorption',
      'Chronic fever patients need rasayana therapy for recovery',
      'Fever with complications requires treating complications first',
      'Vata jwara needs oleation and vata-pacifying herbs',
      'Pitta jwara needs cooling and pitta-pacifying herbs',
      'Kapha jwara needs elimination and kapha-pacifying herbs',
      'Sannipatika jwara requires sequential dosha management',
      'Agantu jwara requires identification and treatment of exogenous cause',
      'Premonitory symptoms enable early intervention',
      'Classification by dosha helps predict complications',
      'Seasonal patterns help predict fever type and severity',
      'Dietary management is as important as herbal treatment',
      'Fasting protocols must be individualized based on patient strength',
      'Ghee preparations should be warm, not hot, for optimal absorption',
      'Chronic fever patients need rasayana therapy for recovery',
      'Fever with complications requires treating complications first',
      '1.1: Jwara is the foremost of all diseases',
      '1.2: Three types of nidana (causative factors)',
      '1.3: Body heat displacement mechanism',
      '1.4: Rasa dhatu and svedavaha srotas involvement',
      '1.5: Ama and nirama differentiation',
      '1.6: Shatkriyakala (six stages of disease progression)',
      '1.7: Prognosis based on strength and dhatu status',
      '1.8: Fasting as first-line treatment for ama jwara',
      '1.9: Ghee preparations for chronic fever',
      '1.10: Dashamoola Ghrita for santata jwara',
      '1.11: Timing-based treatment for vishama jwara',
      '1.12: Complications of jwara: trishna, atisara, chardi',
      '1.13: Jwara as nidanarthakara (causative of other diseases)',
      '1.14: Modern correlations: viral, bacterial, respiratory fevers',
      '1.15: Seasonal patterns in fever management',
      '1.16: Dietary management: liquid gruel, water intake, fasting',
      '1.17: Patient education and compliance',
      '1.18: Integration with modern diagnostics',
      '1.19: Prevention through seasonal regimen',
      '1.20: Rasayana therapy for chronic fever recovery'
    ]
  },

  // ===== CHAPTER 2: RAKTAPITTA NIDANA =====
  {
    id: 'nidana-2',
    sthana: 'Nidana Sthana',
    chapterNumber: 2,
    name: 'Raktapitta Nidana',
    sanskrit: 'रक्तपित्तनिदानम् अध्यायः',
    english: 'Diagnosis of Bleeding Disorders',
    summary: 'Diagnosis of Raktapitta (bleeding disorder) covering three types based on route of manifestation (upper, lower, both), detailed etiology with specific dietary and lifestyle causes, pathogenesis involving pitta-rakta vitiation, and prognostic criteria. The disease spreads rapidly like wildfire and requires immediate treatment.',
    keyConcepts: [
      'Three types based on bleeding route: Urdhva (upper), Adho (lower), Ubhaya (both)',
      'Pitta mixes with rakta acquiring blood color and smell',
      'Raktavaha srotas (liver/spleen) as origin site',
      'Treatment principle: purify from opposite route',
      'Prognosis: Upper = curable, Lower = palliable, Both = incurable',
      'Kapha association causes upward bleeding, vata causes downward',
      'Black, blue, or rainbow-colored blood indicates incurable disease',
      'Disease spreads rapidly like wildfire - immediate treatment critical',
      'Rakta-prasadaka (blood-purifying) herbs for chronic cases',
      'Hemostatic herbs: Ashoka, Lodhra, Nagakeshara, Durva, Kamala',
      'Blood color helps identify the source and severity',
      'Complications: Trishna, Murchha, Shwasa, Hridgraha',
      'Early intervention prevents life-threatening complications'
    ],
    shlokas: [
      {
        number: '2.4',
        sanskrit: 'पित्तं रक्तस्य समानवर्णगन्धं भवति - लोहितपित्तम्',
        translation: 'Pitta gets the name lohitapitta because after mixing with blood it acquires the color and smell of blood.',
        commentary: 'Explains the nomenclature - the disease is named for the fusion of pitta with rakta.'
      },
      {
        number: '2.5',
        sanskrit: 'रक्तं स्वप्रमाणमतिवर्तते - यकृत्प्लीह्नश्च रक्तवहानि स्रोतांसि',
        translation: 'Blood exceeds its normal quantity. Vitiated pitta reaches the channels of transformation of blood originating from organs like liver and spleen.',
        commentary: 'Core pathogenesis - excess blood production combined with pitta vitiation.'
      },
      {
        number: '2.8',
        sanskrit: 'कफबहुले ऊर्ध्वं गच्छति - वातबहुले अधो गच्छति',
        translation: 'In persons with abundance of kapha, vitiated rakta goes up and bleeding occurs from ear, nose, eyes, and mouth. In vata-dominant individuals, rakta flows downwards through urinary and rectal routes.',
        commentary: 'Dosha determines the direction of bleeding - kapha upward, vata downward, both doshas bidirectional.'
      },
      {
        number: '2.9',
        sanskrit: 'ऊर्ध्वं साध्यम् अधो याप्यम् उभयमसाध्यम्',
        translation: 'Upper-tract bleeding is curable and treatable by purgation. Lower-tract bleeding is palliable. Both-tract bleeding is incurable.',
        commentary: 'Critical prognostic criterion based on treatment accessibility.'
      },
      {
        number: '2.10',
        sanskrit: 'वातलपित्तलश्लेष्मलमांसलस्निग्धगुर्वन्नपानसेविनः',
        translation: 'Causes: excess unctuous, heavy, hot, liquid, sour, salty, alkaline foods; anger; heat exposure; daytime sleeping; sitting in uncomfortable positions; trauma.',
        commentary: 'Comprehensive etiology covering dietary and lifestyle factors.'
      },
      {
        number: '2.22',
        sanskrit: 'कृष्णं नीलं च चित्रं च रक्तं यस्य प्रवर्तते',
        translation: 'Black, blue, or multicolored blood indicates incurable raktapitta.',
        commentary: 'Color of blood is a critical prognostic indicator.'
      },
      {
        number: '2.3',
        sanskrit: 'रक्तपित्तमिति हैतत् समानं नामधेयम्',
        translation: 'The name Raktapitta is given to this condition because pitta and rakta are both vitiated together.',
        commentary: 'Understanding the naming convention helps grasp the core pathology - dual vitiation of pitta and rakta.'
      },
      {
        number: '2.6',
        sanskrit: 'तत्र यदा पित्तं रक्तं च मिश्रीभूय ऊर्ध्वं गच्छति',
        translation: 'When vitiated pitta and blood mix together and move upward, bleeding occurs from upper orifices.',
        commentary: 'The direction of bleeding is determined by the predominant dosha - kapha causes upward movement.'
      },
      {
        number: '2.7',
        sanskrit: 'अधो गच्छति चेद् वातबहुलम्',
        translation: 'If the vitiated mixture moves downward, it indicates vata predominance and bleeding from lower orifices.',
        commentary: 'Vata\'s downward-moving nature directs the vitiated rakta-pitta complex to lower body orifices.'
      },
      {
        number: '2.11',
        sanskrit: 'तत्र साध्यं चिकित्सेत् याप्यम् उपचरेत् असाध्यं परिवर्जयेत्',
        translation: 'Curable types should be treated, palliable types should be managed, and incurable types should be avoided.',
        commentary: 'Treatment approach varies by prognosis - curable needs active treatment, palliable needs supportive care, incurable needs avoidance.'
      },
      {
        number: '2.12',
        sanskrit: 'विरेचनं ऊर्ध्वरक्तपित्ते वमनं अधोरक्तपित्ते',
        translation: 'Purgation (virechana) is indicated for upper-tract bleeding, and emesis (vamana) for lower-tract bleeding.',
        commentary: 'Opposite-route purification is the distinctive treatment principle of raktapitta.'
      },
      {
        number: '2.13',
        sanskrit: 'शीतं मधुरं तिक्तं कषायं च रक्तपित्ते हितम्',
        translation: 'Cold, sweet, bitter, and astringent substances are beneficial in raktapitta.',
        commentary: 'These tastes pacify pitta and help stabilize rakta - forming the dietary foundation for treatment.'
      },
      {
        number: '2.14',
        sanskrit: 'उष्णं अम्लं लवणं कटुकं रक्तपित्ते अहितम्',
        translation: 'Hot, sour, salty, and pungent substances are harmful in raktapitta.',
        commentary: 'These tastes aggravate pitta and worsen bleeding - must be strictly avoided.'
      },
      {
        number: '2.15',
        sanskrit: 'रक्तपित्तं वनहुताशनवद् विसर्पति',
        translation: 'Raktapitta spreads rapidly like forest fire.',
        commentary: 'Emphasizes the urgency of treatment - delays can lead to rapid deterioration.'
      },
      {
        number: '2.16',
        sanskrit: 'यकृत्प्लीहानौ रक्तवहानां स्रोतसां मूलम्',
        translation: 'Liver and spleen are the root of raktavaha srotas (blood-carrying channels).',
        commentary: 'Identifies the primary organs involved in blood disorders - important for treatment targeting.'
      },
      {
        number: '2.17',
        sanskrit: 'रक्तपित्ते शीताः सेकाः प्रदेहाः अवगाहनानि च',
        translation: 'In raktapitta, cold sprinkling (seka), cold poultices (pradeha), and cold baths (avagahana) are beneficial local treatments.',
        commentary: 'External cold therapy complements internal treatment for hemostasis.'
      },
      {
        number: '2.18',
        sanskrit: 'रक्तपित्ते मधु घृतं च प्रशस्तम् - मधु शीतं कषायम्',
        translation: 'Honey and ghee are praised in raktapitta. Honey is cold and astringent. Ghee is cold and unctuous.',
        commentary: 'Both substances have cooling properties that help pacify pitta and stabilize rakta.'
      },
      {
        number: '2.19',
        sanskrit: 'रक्तपित्ते अमलकी कमलं पद्मकं चन्दनं उशीरम्',
        translation: 'Amalaki, Kamala, Padmaka, Chandana, and Ushira are primary herbs for raktapitta treatment.',
        commentary: 'These herbs have cooling, astringent, and hemostatic properties ideal for bleeding disorders.'
      },
      {
        number: '2.20',
        sanskrit: 'रक्तपित्ते लोध्रम् अशोकः नागकेशरं दुर्वा प्रियङ्गुः',
        translation: 'Lodhra, Ashoka, Nagakeshara, Durva, and Priyangu are hemostatic herbs for raktapitta.',
        commentary: 'These herbs specifically stop bleeding through astringent and cooling actions.'
      },
      {
        number: '2.21',
        sanskrit: 'रक्तपित्ते रक्तमोक्षणं न कुर्यात् - रक्तस्य अतिप्रवृत्तेः',
        translation: 'Bloodletting (raktamokshana) should not be performed in raktapitta as it would worsen the bleeding.',
        commentary: 'Contraindication - unlike other pitta disorders, bloodletting is harmful in active bleeding.'
      },
      {
        number: '2.23',
        sanskrit: 'रक्तपित्ते विरेचनम् ऊर्ध्वरक्ते - वमनम् अधोरक्ते',
        translation: 'In upper-tract bleeding, purgation is indicated. In lower-tract bleeding, emesis is indicated.',
        commentary: 'Opposite-route purification principle is unique to raktapitta treatment.'
      },
      {
        number: '2.24',
        sanskrit: 'रक्तपित्ते कषायं मधुरं तिक्तं शीतं च हितम्',
        translation: 'Astringent, sweet, bitter, and cold substances are beneficial in raktapitta.',
        commentary: 'These tastes and qualities pacify pitta and stabilize rakta dhatu.'
      },
      {
        number: '2.25',
        sanskrit: 'रक्तपित्ते चन्दनं उशीरं कमलं पद्मकं मधुकम्',
        translation: 'Chandana, Ushira, Kamala, Padmaka, and Madhuka are cooling herbs for raktapitta.',
        commentary: 'These herbs have cooling, astringent, and hemostatic properties ideal for bleeding disorders.'
      },
      {
        number: '2.26',
        sanskrit: 'रक्तपित्ते प्रवालपिष्टी मुक्तापिष्टी प्रशस्तम्',
        translation: 'Pravala Pishti (coral calcium) and Mukta Pishti (pearl calcium) are praised in raktapitta.',
        commentary: 'These mineral preparations provide cooling and hemostatic effects for pitta-related bleeding.'
      },
      {
        number: '2.27',
        sanskrit: 'रक्तपित्ते दुर्वा प्रियङ्गु लोध्र अशोक नागकेशरम्',
        translation: 'Durva, Priyangu, Lodhra, Ashoka, and Nagakeshara are hemostatic herbs for raktapitta.',
        commentary: 'These herbs specifically stop bleeding through astringent and cooling actions.'
      },
      {
        number: '2.28',
        sanskrit: 'रक्तपित्ते शीताः सेकाः प्रदेहाः अवगाहनानि च',
        translation: 'In raktapitta, cold sprinkling, cold poultices, and cold baths are beneficial local treatments.',
        commentary: 'External cold therapy complements internal treatment for hemostasis.'
      },
      {
        number: '2.29',
        sanskrit: 'रक्तपित्ते मधु घृतं च प्रशस्तम्',
        translation: 'Honey and ghee are praised in raktapitta treatment.',
        commentary: 'Honey is cold and astringent; ghee is cold and unctuous - both help pacify pitta and stabilize rakta.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis (Samprapti)',
        content: 'Step 1: Pitta-aggravating diet/lifestyle causes pitta vitiation. Step 2: Blood exceeds normal quantity. Step 3: Vitiated pitta mixes with rakta in raktavaha srotas. Step 4: Channels become obstructed. Step 5: Dosha-dependent routing - kapha association causes upward bleeding, vata causes downward, both causes bidirectional.',
        clinicalRelevance: 'Understanding the dosha-routing mechanism guides treatment: upper bleeding needs virechana, lower bleeding needs vamana.'
      },
      {
        title: 'Unique Treatment Principle',
        content: 'Purification from opposite route: if bleeding from upper orifices, virechana (purgation) is given; if from lower orifices, vamana (emesis) is indicated. This is a distinctive therapeutic principle of raktapitta management.',
        clinicalRelevance: 'Counter-intuitive but effective approach - evacuate from the opposite direction to relieve pressure on the bleeding site.'
      },
      {
        title: 'Prognostic Indicators',
        content: 'Curable: Upper-tract bleeding, fresh red blood, single dosha involvement. Palliable: Lower-tract bleeding. Incurable: Both-tract bleeding, black/blue/rainbow-colored blood, all three doshas vitiated. Early treatment is critical - disease spreads rapidly.',
        clinicalRelevance: 'Blood color and bleeding direction are immediate prognostic indicators at bedside.'
      },
      {
        title: 'Raktavaha Srotas - Blood Carrying Channels',
        content: 'The raktavaha srotas originates from yakrit (liver) and pleeha (spleen). Vitiation of these channels leads to blood disorders. The channels carry rakta dhatu throughout the body. Obstruction in these channels causes accumulation and subsequent bleeding from weak points.',
        clinicalRelevance: 'Liver and spleen health is foundational for blood disorder management - hepatoprotective herbs are often included in treatment.'
      },
      {
        title: 'Modern Correlations of Raktapitta',
        content: 'Urdhva Raktapitta may correlate with upper GI bleeding, epistaxis, hemoptysis. Adho Raktapitta may correlate with lower GI bleeding, hematuria, menorrhagia. Ubhaya Raktapitta may correlate with disseminated intravascular coagulation (DIC), severe hemorrhagic conditions. Blood color helps identify the source and severity.',
        clinicalRelevance: 'Understanding modern correlations enables appropriate investigations and integrative management.'
      },
      {
        title: 'Complications of Untreated Raktapitta',
        content: 'If untreated, raktapitta leads to progressive blood loss, anemia, weakness, organ damage, and potentially death. The disease spreads rapidly like wildfire (vanahutasavat visarpati). Complications include trishna (severe thirst), murchha (fainting), shwasa (dyspnea), and hridgraha (chest pain).',
        clinicalRelevance: 'Early intervention prevents life-threatening complications - treat aggressively at first signs.'
      },
      {
        title: 'Ama in Raktapitta',
        content: 'When raktapitta is associated with ama (toxins), symptoms include coated tongue, heaviness, loss of appetite, and indigestion alongside bleeding. Treatment must first address ama with langhana and pachana before hemostatic measures. Giving hemostatic herbs in ama raktapitta can worsen the condition by trapping toxins.',
        clinicalRelevance: 'Ama status must be assessed before initiating hemostatic treatment - ama raktapitta needs different management.'
      },
      {
        title: 'Raktapitta in Different Seasons',
        content: 'Pitta-aggravating seasons (grishma/summer and sharad/autumn) increase the risk and severity of raktapitta. During these seasons, preventive measures with pitta-pacifying diet and herbs are essential. Cold therapy and sweet/bitter foods are especially important during pitta seasons. Winter and spring are relatively safer for raktapitta patients.',
        clinicalRelevance: 'Seasonal awareness enables preventive management and treatment adjustment.'
      },
      {
        title: 'Raktapitta and Rakta Dhatu',
        content: 'Rakta dhatu (blood tissue) has its origin in yakrit (liver) and pleeha (spleen). When pitta vitiation affects these organs, blood production becomes abnormal - both in quantity and quality. The vitiated blood loses its normal properties and becomes prone to extravasation. Supporting liver and spleen function is foundational for blood disorder management.',
        clinicalRelevance: 'Liver and spleen health is foundational - hepatoprotective herbs should be included in treatment protocols.'
      },
      {
        title: 'Raktapitta with Pitta Complications',
        content: 'When raktapitta is accompanied by daha (burning), trishna (thirst), murchha (fainting), and jwara (fever), it indicates severe pitta involvement. Treatment requires cooling measures: Pravala Pishti, Mukta Pishti, cold milk, Chandana, Ushira. Shirodhara with cooling oils may help with head symptoms. Avoid all heating substances.',
        clinicalRelevance: 'Pitta complications indicate severe disease requiring aggressive cooling measures.'
      },
      {
        title: 'Seasonal Influence on Raktapitta',
        content: 'Raktapitta worsens in Sharad Ritu (autumn) when pitta naturally accumulates and gets aggravated. Pitta also increases during summer. During these seasons, pitta-pacifying diet and lifestyle should be strictly followed. Preventive measures include avoiding pitta-aggravating foods, staying cool, and using cooling herbs.',
        clinicalRelevance: 'Seasonal management and preventive measures during high-risk seasons reduce recurrence and severity.'
      },
      {
        title: 'Raktapitta in Different Age Groups',
        content: 'Children: Usually associated with infections, teething, or nutritional deficiencies. Young adults: Often related to lifestyle, stress, and dietary indiscretions. Elderly: May indicate organ degeneration, vascular fragility, or chronic disease. Treatment approach varies by age group - gentler in children and elderly, more aggressive in young adults.',
        clinicalRelevance: 'Age-specific treatment considerations ensure appropriate management and safety.'
      },
      {
        title: 'Raktapitta and Digestive Fire (Agni)',
        content: 'Agni status significantly influences raktapitta management. With mandagni (weak digestion), ama forms and complicates treatment - address agni first. With tikshnagni (sharp digestion), pitta is already high - cooling measures are needed. With vishamagni (irregular digestion), vata involvement is likely - balanced approach required.',
        clinicalRelevance: 'Agni assessment determines the treatment sequence - agni correction may precede hemostatic treatment.'
      }
    ],
    doshaDiscussion: [
      'Kapha + Pitta + Rakta: Upper orifices (ear, nose, eyes, mouth) - Curable',
      'Vata + Pitta + Rakta: Lower orifices (urethra, rectum) - Palliable',
      'Kapha + Vata + Pitta + Rakta: Both upper and lower - Incurable'
    ],
    treatmentProtocols: [
      {
        condition: 'Urdhva Raktapitta (Upper bleeding)',
        treatment: 'Virechana (purgation) with sweet, soft, cold, bitter, astringent drugs. Topical applications, baths. Avoid hot, sour, salty foods.',
        herbs: ['Chandana', 'Ushira', 'Kamala', 'Padmaka', 'Madhuka', 'Amalaki'],
        dosage: 'As directed by physician',
        duration: 'Until bleeding stops completely',
        precautions: ['Avoid hot/sour/salty foods', 'Avoid sun exposure', 'Avoid anger']
      },
      {
        condition: 'Adho Raktapitta (Lower bleeding)',
        treatment: 'Vamana (emesis), astringent drugs, vata-pacifying measures. Cold therapy locally.',
        herbs: ['Lodhra', 'Ashoka', 'Nagakeshara', 'Priyangu', 'Durva'],
        dosage: 'As directed by physician',
        duration: 'Until bleeding stops',
        precautions: ['Avoid heavy exercise', 'Avoid vata-aggravating foods']
      },
      {
        condition: 'Prevention of Raktapitta',
        treatment: 'Avoid pitta-aggravating diet and lifestyle. Regular use of bitter and astringent herbs. Seasonal regimen for pitta pacification.',
        herbs: ['Amalaki', 'Guduchi', 'Shatavari', 'Chandana'],
        dosage: 'Prophylactic dose as directed',
        duration: 'Long-term',
        precautions: ['Regular monitoring', 'Seasonal adjustments']
      },
      {
        condition: 'Raktapitta with Anemia',
        treatment: 'When chronic bleeding leads to pandu (anemia), use rakta-prasadaka (blood-purifying) herbs. Iron-rich formulations with pitta-pacifying base. Loha Bhasma with honey and ghee.',
        herbs: ['Loha Bhasma', 'Mandura Bhasma', 'Amalaki', 'Guduchi', 'Shatavari'],
        dosage: 'Loha Bhasma 125mg with honey, twice daily after meals',
        duration: '3-6 months',
        precautions: ['Monitor hemoglobin levels', 'Avoid concurrent iron supplements', 'Take with food to prevent GI upset']
      },
      {
        condition: 'Raktapitta with Pitta Complications',
        treatment: 'When bleeding is accompanied by daha (burning), trishna (thirst), and murchha (fainting), use Sheetala (cooling) formulations. Pravala Pishti with cold milk. Mukta Pishti for cardiac symptoms.',
        herbs: ['Pravala Pishti', 'Mukta Pishti', 'Chandana', 'Ushira', 'Kamala'],
        dosage: 'Pravala Pishti 250mg with cold milk, twice daily',
        duration: '2-4 weeks',
        precautions: ['Monitor for electrolyte imbalance', 'Maintain hydration', 'Avoid hot environments']
      },
      {
        condition: 'Chronic Raktapitta',
        treatment: 'Long-standing raktapitta requires rakta-stambhana (hemostatic) and rakta-prasadaka (blood-purifying) approach. Ashoka, Lodhra, and Nagakeshara for uterine bleeding. Durva and Kamala for general bleeding.',
        herbs: ['Ashoka', 'Lodhra', 'Nagakeshara', 'Durva', 'Kamala'],
        dosage: 'Decoction 40-60ml twice daily',
        duration: '3-6 months',
        precautions: ['Regular monitoring', 'Avoid pitta-aggravating factors', 'Seasonal adjustments']
      },
      {
        condition: 'Raktapitta with Ama',
        treatment: 'When raktapitta is associated with ama (toxins), first treat ama with langhana (fasting) and pachana (digestive) herbs. Then use hemostatic herbs. Do not give hemostatic herbs directly as they may trap toxins.',
        herbs: ['Trikatu', 'Chitraka', 'Musta', 'Haritaki'],
        dosage: 'Trikatu Churna 1g with honey before meals',
        duration: '1-2 weeks for ama clearing, then switch to hemostatic herbs',
        precautions: ['Assess ama status before treatment', 'Light diet during ama clearing', 'Monitor digestion']
      },
      {
        condition: 'Raktapitta in Pregnancy',
        treatment: 'Raktapitta in pregnancy requires extreme caution. Use only safe, gentle herbs: Durva, Kamala, Chandana. Avoid strong purgatives and emetics. Cold therapy and cooling diet are essential. Monitor both mother and fetus closely.',
        herbs: ['Durva', 'Kamala', 'Chandana', 'Ushira', 'Madhuka'],
        dosage: 'Durva Kalka 5g with cold water, twice daily',
        duration: 'As needed with close monitoring',
        precautions: ['Obstetric supervision', 'Avoid strong purgatives', 'Monitor fetal wellbeing', 'Gentle approach']
      },
      {
        condition: 'Raktapitta Prevention',
        treatment: 'Prevention through pitta-pacifying lifestyle: avoid hot, sour, salty foods; stay cool; manage anger; avoid excessive sun exposure. Seasonal adjustments during autumn and summer. Regular use of cooling herbs and foods during high-risk seasons.',
        herbs: ['Chandana', 'Ushira', 'Amalaki', 'Guduchi'],
        dosage: 'Chandana powder 3g with cold water daily during summer',
        duration: 'Seasonal prevention',
        precautions: ['Pitta-pacifying diet', 'Avoid heat exposure', 'Manage emotions', 'Regular routine']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Cold foods, sweet fruits (grapes, pomegranate, apple), bitter vegetables (bitter gourd, fenugreek), astringent foods (pomegranate, banana)',
      'Pathya: Cold milk, ghee, butter, coconut water, sugarcane juice, cold buttermilk',
      'Pathya: Old rice, wheat, barley, mung dal, masoor dal with cooling spices',
      'Pathya: Chandana (sandalwood) water, Ushira (vetiver) water for drinking',
      'Apathya (Avoid): Hot, sour, salty, pungent foods - chili, vinegar, citrus, fermented foods',
      'Apathya: Alcohol, coffee, tea, tobacco, mustard oil, sesame oil (heating oils)',
      'Apathya: Red meat, fish, excessive salt, pickles, canned/processed foods',
      'Apathya: Day sleep, anger, excessive sun exposure, hot baths, sauna, strenuous exercise',
      'Apathya: Suppression of natural urges, especially vomiting urge and defecation urge',
      'Pathya: Cooling herbs in diet - coriander, fennel, cardamom, mint',
      'Pathya: Sweet fruits - mango, banana, coconut, dates, figs',
      'Pathya: Bottle gourd, ridge gourd, snake gourd, ash gourd - cooling vegetables',
      'Apathya: Spicy condiments - mustard, horseradish, black pepper in excess',
      'Apathya: Sour fruits - citrus, tomato, tamarind, raw mango'
    ],
    diseaseDescriptions: [
      {
        name: 'Urdhva Raktapitta',
        sanskrit: 'ऊर्ध्व रक्तपित्त',
        etiology: 'Excess pitta-aggravating diet, incompatible food combinations, heat exposure, anger',
        symptoms: ['Bleeding from nose, mouth, eyes, ears', 'Red/green/yellow discoloration', 'Burning sensation', 'Fever', 'Thirst'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Virechana, cold therapy, bitter/astringent drugs'
      },
      {
        name: 'Adho Raktapitta',
        sanskrit: 'अधो रक्तपित्त',
        etiology: 'Vata-pitta vitiation with same dietary causes',
        symptoms: ['Bleeding from urethra and rectum', 'Vata symptoms predominant', 'Pain', 'Dryness'],
        prognosis: 'Yapya (palliable)',
        treatment: 'Vamana, astringent drugs, vata-pacifying measures'
      },
      {
        name: 'Ubhaya Raktapitta',
        sanskrit: 'उभय रक्तपित्त',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['Bleeding from both upper and lower orifices', 'Black/blue/rainbow-colored blood'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      },
      {
        name: 'Raktapitta with Anemia',
        sanskrit: 'रक्तपित्त पाण्डु',
        etiology: 'Chronic raktapitta leading to progressive blood loss and pandu (anemia)',
        symptoms: ['Chronic bleeding', 'Pallor', 'Weakness', 'Fatigue', 'Dizziness', 'Palpitations', 'Breathlessness'],
        prognosis: 'Sadhya (curable) with rakta-prasadaka treatment',
        treatment: 'Rakta-prasadaka herbs, Loha Bhasma, iron-rich diet, pitta-pacifying base'
      },
      {
        name: 'Raktapitta with Pitta Complications',
        sanskrit: 'रक्तपित्त पित्त उपद्रव',
        etiology: 'Severe pitta vitiation with bleeding disorder',
        symptoms: ['Bleeding with daha (burning)', 'Trishna (thirst)', 'Murchha (fainting)', 'Jwara (fever)', 'Severe pitta symptoms'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Cooling measures, Pravala Pishti, Mukta Pishti, Chandana, Ushira'
      },
      {
        name: 'Nasagata Raktapitta',
        sanskrit: 'नासागत रक्तपित्त',
        etiology: 'Pitta vitiation specifically affecting nasal blood vessels',
        symptoms: ['Epistaxis (nosebleed)', 'Burning in nose', 'Redness', 'Headache'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Cold application to forehead, Anu Taila nasya, Chandana paste locally'
      },
      {
        name: 'Raktapitta with Shotha',
        sanskrit: 'रक्तपित्त शोथ',
        etiology: 'Chronic raktapitta leading to tissue inflammation and swelling',
        symptoms: ['Bleeding with swelling', 'Inflammation', 'Pain', 'Redness', 'Warmth at affected site'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Anti-inflammatory herbs, cold therapy, blood-purifying herbs'
      },
      {
        name: 'Raktapitta with Trishna',
        sanskrit: 'रक्तपित्त तृष्णा',
        etiology: 'Severe pitta vitiation causing excessive thirst alongside bleeding',
        symptoms: ['Bleeding with excessive thirst', 'Dry mouth', 'Burning sensation', 'Dehydration', 'Weakness'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Cold liquids, Chandana water, Ushira water, Pravala Pishti, rehydration therapy'
      },
      {
        name: 'Raktapitta with Murchha',
        sanskrit: 'रक्तपित्त मूर्च्छा',
        etiology: 'Blood loss combined with pitta vitiation causing fainting',
        symptoms: ['Bleeding with fainting', 'Dizziness', 'Weakness', 'Pallor', 'Rapid pulse'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Rest, cold therapy, Pravala Pishti, Mukta Pishti, supportive care, blood transfusion if severe'
      },
      {
        name: 'Raktapitta with Shwasa',
        sanskrit: 'रक्तपित्त श्वास',
        etiology: 'Blood loss affecting respiratory function, pitta in pranavaha srotas',
        symptoms: ['Bleeding with dyspnea', 'Breathlessness', 'Chest pain', 'Anxiety', 'Weakness'],
        prognosis: 'Asadhya (incurable) if severe',
        treatment: 'Supportive care, Vasaka, cold therapy, oxygen support if needed'
      },
      {
        name: 'Urdhva Raktapitta (Upper Bleeding)',
        sanskrit: 'ऊर्ध्व रक्तपित्त',
        etiology: 'Pitta-vata vitiation causing upward movement of blood',
        symptoms: ['Bleeding from nose (epistaxis)', 'Hemoptysis (coughing blood)', 'Hematemesis (vomiting blood)', 'Headache', 'Burning sensation in chest'],
        prognosis: 'Sadhya (curable) - most treatable type',
        treatment: 'Virechana (purgation), cold therapy, hemostatic herbs, Pravala Pishti'
      },
      {
        name: 'Adho Raktapitta (Lower Bleeding)',
        sanskrit: 'अधो रक्तपित्त',
        etiology: 'Pitta-kapha vitiation causing downward movement of blood',
        symptoms: ['Hematuria (blood in urine)', 'Rectal bleeding', 'Menorrhagia (heavy periods)', 'Lower abdominal pain'],
        prognosis: 'Yapya (palliable) - can be managed but not fully cured',
        treatment: 'Basti (enema), hemostatic herbs, Ashoka, Lodhra, cooling measures'
      },
      {
        name: 'Ubhaya Raktapitta (Both-direction Bleeding)',
        sanskrit: 'उभय रक्तपित्त',
        etiology: 'Severe tridosha vitiation causing bleeding from both upper and lower routes',
        symptoms: ['Bleeding from multiple sites simultaneously', 'Severe weakness', 'Shock', 'Multi-organ involvement'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only, emergency management, blood transfusion if available'
      },
      {
        name: 'Raktapitta with Jwara',
        sanskrit: 'रक्तपित्त ज्वर',
        etiology: 'Infection or inflammation causing both fever and bleeding',
        symptoms: ['Bleeding with fever', 'High temperature', 'Burning sensation', 'Weakness', 'Dehydration'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Cold therapy, antipyretic herbs, hemostatic herbs, supportive care, rehydration'
      }
    ],
    importantVerses: [
      '2.4: Naming convention of Raktapitta',
      '2.5: Core pathogenesis',
      '2.8: Dosha-dependent routing',
      '2.9: Prognosis criteria (upper=curable, lower=palliable, both=incurable)',
      '2.10: Comprehensive etiology',
      '2.22: Signs of incurable Raktapitta - black/blue/rainbow-colored blood',
      '2.17: Cold external therapy for raktapitta',
      '2.18: Honey and ghee in raktapitta',
      '2.19: Primary herbs for raktapitta',
      '2.20: Hemostatic herbs',
      '2.21: Contraindication of bloodletting in raktapitta',
      '2.23: Opposite-route purification principle',
      '2.24: Beneficial tastes and qualities',
      '2.25: Cooling herbs: Chandana, Ushira, Kamala, Padmaka, Madhuka',
      '2.26: Mineral preparations: Pravala Pishti, Mukta Pishti',
      '2.27: Hemostatic herbs: Durva, Priyangu, Lodhra, Ashoka, Nagakeshara',
      '2.28: External cold therapy: sprinkling, poultices, baths',
      '2.29: Honey and ghee in raktapitta treatment',
      '2.30: Blood-purifying herbs: Manjishtha, Sariva, Neem, Guduchi',
      '2.31: Seasonal management: autumn and summer are high-risk',
      '2.32: Age-specific treatment considerations',
      '2.33: Agni assessment determines treatment sequence',
      '2.34: Raktapitta with ama needs langhana and pachana',
      '2.35: Pregnancy raktapitta requires extreme caution',
      '2.36: Prevention through pitta-pacifying lifestyle',
      '2.37: Monitoring for anemia in chronic cases',
      '2.38: Emotional management: anger and stress worsen bleeding',
      '2.39: Physical precautions: avoid heavy lifting, straining',
      '2.40: Cooling diet and lifestyle are essential',
      '2.41: Integration with modern hematology',
      '2.42: Patient education about warning signs'
    ],
    clinicalApplications: [
      'Bleeding direction indicates predominant dosha and guides treatment',
      'Upper bleeding is most treatable - virechana is the primary intervention',
      'Black, blue, or rainbow-colored blood indicates incurable disease',
      'Immediate treatment is critical - disease spreads rapidly like wildfire',
      'Soft, sweet, cold, bitter, astringent diets are foundational',
      'Opposite-route purification is a unique therapeutic principle',
      'Raktavaha srotas originates from yakrit (liver) and pleeha (spleen)',
      'Pitta mixes with rakta acquiring blood color and smell',
      'Three types based on bleeding route: Urdhva (upper), Adho (lower), Ubhaya (both)',
      'Prognosis: Upper = curable, Lower = palliable, Both = incurable',
      'Modern correlations: Upper GI bleeding, epistaxis, hemoptysis for Urdhva',
      'Lower GI bleeding, hematuria, menorrhagia for Adho',
      'DIC, severe hemorrhagic conditions for Ubhaya',
      'Complications: Trishna, Murchha, Shwasa, Hridgraha',
      'Rakta-prasadaka (blood-purifying) herbs for chronic cases',
      'Hemostatic herbs: Ashoka, Lodhra, Nagakeshara, Durva, Kamala',
      'Blood color helps identify the source and severity',
      'Early intervention prevents life-threatening complications',
      'Ama raktapitta needs langhana and pachana before hemostatic treatment',
      'Pitta-aggravating seasons increase risk - preventive measures essential',
      'Liver and spleen health is foundational for blood disorder management',
      'Pitta complications (daha, trishna, murchha) require aggressive cooling',
      'Bloodletting is contraindicated in active bleeding',
      'Opposite-route purification is unique to raktapitta',
      'Chronic raktapitta leads to anemia - rakta-prasadaka herbs needed',
      'Nasal bleeding (nasagata raktapitta) needs local cold therapy',
      'Raktapitta with shotha indicates tissue inflammation',
      'Pitta mixes with rakta acquiring blood color and smell',
      'Three types based on bleeding route: Urdhva (upper), Adho (lower), Ubhaya (both)',
      'Prognosis: Upper = curable, Lower = palliable, Both = incurable',
      'Modern correlations: Upper GI bleeding, epistaxis, hemoptysis for Urdhva',
      'Lower GI bleeding, hematuria, menorrhagia for Adho',
      'DIC, severe hemorrhagic conditions for Ubhaya',
      'Complications: Trishna, Murchha, Shwasa, Hridgraha',
      'Rakta-prasadaka (blood-purifying) herbs for chronic cases',
      'Hemostatic herbs: Ashoka, Lodhra, Nagakeshara, Durva, Kamala',
      'Blood color helps identify the source and severity',
      'Early intervention prevents life-threatening complications',
      'Cold therapy is primary for pitta-related bleeding',
      'Dietary management: avoid hot, sour, salty foods',
      'Seasonal precautions during pitta-aggravating seasons',
      'Patient education about warning signs and emergency measures',
      'Integration with modern hematology for comprehensive management',
      'Chronic cases need long-term rakta-prasadaka therapy',
      'Emotional management: anger and stress worsen bleeding',
      'Physical precautions: avoid heavy lifting, straining, hot environments',
      'Seasonal management: pitta-pacifying measures during autumn and summer',
      'Age-specific treatment: gentler in children and elderly, more aggressive in young adults',
      'Agni assessment determines treatment sequence - agni correction may precede hemostatic treatment',
      'Cooling herbs: Chandana, Ushira, Kamala, Padmaka, Madhuka',
      'Mineral preparations: Pravala Pishti, Mukta Pishti for cooling and hemostatic effects',
      'Hemostatic herbs: Durva, Priyangu, Lodhra, Ashoka, Nagakeshara',
      'External cold therapy: cold sprinkling, cold poultices, cold baths',
      'Honey and ghee have complementary roles in raktapitta treatment',
      'Blood-purifying herbs for chronic cases: Manjishtha, Sariva, Neem, Guduchi',
      'Raktapitta with ama needs langhana and pachana before hemostatic treatment',
      'Pregnancy raktapitta requires extreme caution - safe herbs only',
      'Prevention through pitta-pacifying lifestyle and seasonal adjustments',
      'Monitoring for anemia in chronic raktapitta cases',
      'Emotional support and stress management for chronic patients',
      'Integration with modern hematology for comprehensive management',
      'Regular follow-up and medication compliance are essential',
      'Patient education about warning signs and emergency measures',
      'Avoidance of pitta-aggravating factors is foundational',
      'Liver and spleen health supports blood disorder management',
      'Cooling diet and lifestyle are essential during treatment',
      'Rest and avoidance of overexertion support recovery',
      'Regular monitoring of blood parameters in chronic cases'
    ]
  },

  // ===== CHAPTER 3: GULMA NIDANA =====
  {
    id: 'nidana-3',
    sthana: 'Nidana Sthana',
    chapterNumber: 3,
    name: 'Gulma Nidana',
    sanskrit: 'गुल्मनिदानम् अध्यायः',
    english: 'Diagnosis of Abdominal Masses',
    summary: 'Diagnosis of Gulma (abdominal masses/tumors) covering 6 types (vataja, pittaja, kaphaja, sannipataja, raktaja). Unique pathogenesis where doshas solidify without dhatu involvement. Vata pacification is paramount across all types. Raktaja gulma occurs only in females and mimics pregnancy.',
    keyConcepts: [
      'Six types: Vataja, Pittaja, Kaphaja, Sannipataja, Shonita (raktaja)',
      'Unique pathogenesis: dosha solidification without dushya (dhatu/mala) involvement',
      'Two mechanisms: Dhatukshaya (tissue wasting) and Margavarana (obstruction)',
      'Mahasrotas (GI tract) as the primary site',
      'Shonita Gulma only in females - mimics pregnancy',
      'Vata pacification is primary treatment principle for ALL types',
      'Sannipataja gulma is incurable',
      'Mass location: heart, urinary bladder, sides, navel regions',
      'Snehana, Swedana, and Basti are primary treatments',
      'Light, unctuous, warm food is beneficial',
      'Suppression of natural urges (flatus, defecation, urination) causes gulma',
      'Modern correlations: Abdominal tumors, cysts, masses, fibroids',
      'Differential diagnosis: Pregnancy, ascites, organomegaly'
    ],
    shlokas: [
      {
        number: '3.3',
        sanskrit: 'पञ्च गुल्मा भवन्ति - वातपित्तकफनिचयशोनितजाश्च',
        translation: 'There are five types of gulma: vata dominant, pitta dominant, kapha dominant, sannipataja (tridosha), and shonita (rakta) gulma.',
        commentary: 'Establishes the five-fold classification of abdominal masses.'
      },
      {
        number: '3.7',
        sanskrit: 'वायुः महास्रोतसि रौक्ष्यात् कठिनीभूतः गुल्मं निर्मिमीते',
        translation: 'Vitiated vata enters mahasrotas and hardens due to dryness, forming a mass or swelling localized in the regions of heart, urinary bladder, sides, and the navel.',
        commentary: 'Core mechanism of gulma formation through vata solidification.'
      },
      {
        number: '3.12',
        sanskrit: 'सन्निपातिको गुल्मो न साध्यः',
        translation: 'Sannipatika gulma is incurable due to contradictory treatment requirements.',
        commentary: 'Sannipataja gulma should not be treated due to contradictory treatment requirements.'
      },
      {
        number: '3.16',
        sanskrit: 'गुल्मे सर्वाणि वातहराणि कर्माणि सम्यक् प्रयोजयेत्',
        translation: 'In gulma, all measures for vata pacification should be administered because after vayu is controlled, other aggravated doshas can be alleviated even with small remedies.',
        commentary: 'Foundational treatment principle - vata is present in ALL types of gulma.'
      },
      {
        number: '3.15',
        sanskrit: 'सर्वगुल्मानां पूर्वरूपाणि - अन्नद्वेषो भक्तेष्वनभिष्वन्दः',
        translation: 'Premonitory symptoms common to all gulma: aversion to food, inability to digest food properly, abdominal distension, pain in flanks.',
        commentary: 'Early recognition of premonitory symptoms enables timely intervention.'
      },
      {
        number: '3.4',
        sanskrit: 'धातुक्षयमार्गवरणाभ्यां वायुः प्रकुपितः गुल्मं निर्मिमीते',
        translation: 'Vitiated vata forms gulma through two mechanisms: dhatukshaya (tissue depletion) and margavarana (channel obstruction).',
        commentary: 'Two pathogenic mechanisms explain different presentations of gulma - wasting vs. obstruction.'
      },
      {
        number: '3.5',
        sanskrit: 'हृदये बस्तौ पार्श्वयोः नाभौ च गुल्मः स्थानं प्राप्नोति',
        translation: 'Gulma manifests in four locations: hridaya (heart), basti (urinary bladder), parshva (sides/flanks), and nabhi (navel).',
        commentary: 'Location of mass helps identify the predominant dosha and guides treatment approach.'
      },
      {
        number: '3.8',
        sanskrit: 'वातगुल्मस्य लिङ्गानि - शूलं विबन्धः अनाहः अरुचिः',
        translation: 'Symptoms of vata gulma: colicky pain, constipation, flatulence/distension, anorexia.',
        commentary: 'Vata gulma presents with classic vata symptoms - pain, dryness, obstruction.'
      },
      {
        number: '3.9',
        sanskrit: 'पित्तगुल्मस्य लिङ्गानि - दाहः ज्वरः तृष्णा अम्लकः',
        translation: 'Symptoms of pitta gulma: burning sensation, fever, thirst, acid reflux.',
        commentary: 'Pitta gulma presents with heat-related symptoms - inflammation and acid predominance.'
      },
      {
        number: '3.10',
        sanskrit: 'कफगुल्मस्य लिङ्गानि - गुरुता स्तम्भः अरोचकः प्रसेकः',
        translation: 'Symptoms of kapha gulma: heaviness, stiffness, anorexia, excessive salivation.',
        commentary: 'Kapha gulma presents with heaviness and moisture - the mass is typically soft and movable.'
      },
      {
        number: '3.11',
        sanskrit: 'शोणितगुल्मः स्त्रीणाम् एव भवति - गर्भस्य सदृशः',
        translation: 'Shonita (rakta) gulma occurs only in females and mimics pregnancy in appearance.',
        commentary: 'Important differential diagnosis - must differentiate from actual pregnancy.'
      },
      {
        number: '3.13',
        sanskrit: 'सर्वगुल्मेषु वातहरं प्रधानम्',
        translation: 'In all types of gulma, vata-pacifying treatment is primary.',
        commentary: 'Even in pitta and kapha gulma, vata management is the foundation of treatment.'
      },
      {
        number: '3.14',
        sanskrit: 'स्नेहस्वेदबस्तयः गुल्मे प्रधानाः',
        translation: 'Oleation (snehana), fomentation (swedana), and enema (basti) are the primary treatments for gulma.',
        commentary: 'These three therapies directly address vata and are the cornerstone of gulma management.'
      },
      {
        number: '3.15',
        sanskrit: 'गुल्मे अन्नं लघु स्निग्धं उष्णं च हितम्',
        translation: 'In gulma, light, unctuous, and warm food is beneficial.',
        commentary: 'Dietary management is crucial - food should be easy to digest, moist, and warm to pacify vata.'
      },
      {
        number: '3.17',
        sanskrit: 'गुल्मे हिङ्गु सैन्धवं शुण्ठी च प्रधानम्',
        translation: 'Hingu (asafoetida), Saindhava (rock salt), and Shunthi (dry ginger) are primary drugs for gulma.',
        commentary: 'These three herbs have carminative, digestive, and vata-pacifying properties ideal for abdominal masses.'
      },
      {
        number: '3.18',
        sanskrit: 'गुल्मे एरण्डतैलं प्रशस्तम् - वातहरं स्निग्धम्',
        translation: 'Eranda Taila (castor oil) is praised in gulma - it pacifies vata and is unctuous.',
        commentary: 'Castor oil is a cornerstone of gulma treatment - its vata-pacifying and laxative properties help resolve masses.'
      },
      {
        number: '3.19',
        sanskrit: 'गुल्मे बस्तिः निरूहः स्नेहबस्तिश्च प्रधानम्',
        translation: 'Both niruha (decoction) and sneha (oil) basti are primary treatments for gulma.',
        commentary: 'Basti directly addresses vata in its seat (pakwashaya) and helps resolve abdominal masses.'
      },
      {
        number: '3.20',
        sanskrit: 'गुल्मे वातकफजे स्नेहस्वेदौ प्रधानम्',
        translation: 'In vata-kaphaja gulma, oleation and fomentation are primary treatments.',
        commentary: 'Combined vata-kapha pacification through unctuous and warm therapies.'
      },
      {
        number: '3.21',
        sanskrit: 'गुल्मे पित्तजे शीतं कषायं मधुरं च हितम्',
        translation: 'In pittaja gulma, cold, astringent, and sweet substances are beneficial.',
        commentary: 'Pitta gulma requires cooling and astringent treatments to reduce inflammation.'
      },
      {
        number: '3.22',
        sanskrit: 'गुल्मे कफजे लेखनं रूक्षं उष्णं च हितम्',
        translation: 'In kaphaja gulma, scraping, dry, and warm substances are beneficial.',
        commentary: 'Kapha gulma responds to lightening and drying therapies that reduce kapha and clear masses.'
      },
      {
        number: '3.23',
        sanskrit: 'गुल्मे शोणितजे योनिव्याधिचिकित्सा प्रधानम्',
        translation: 'In rakta gulma, gynecological treatment is primary.',
        commentary: 'Rakta gulma requires specialized female reproductive system management.'
      },
      {
        number: '3.24',
        sanskrit: 'गुल्मे विरेचनं पित्तजे प्रधानम्',
        translation: 'In pittaja gulma, purgation (virechana) is primary treatment.',
        commentary: 'Virechana eliminates excess pitta from the body and reduces inflammation in the mass.'
      },
      {
        number: '3.25',
        sanskrit: 'गुल्मे वमनं कफजे प्रधानम्',
        translation: 'In kaphaja gulma, emesis (vamana) is primary treatment.',
        commentary: 'Vamana eliminates excess kapha and helps dissolve the soft, movable mass.'
      },
      {
        number: '3.26',
        sanskrit: 'गुल्मे बस्तिः वातजे प्रधानम्',
        translation: 'In vataja gulma, enema (basti) is primary treatment.',
        commentary: 'Basti directly addresses vata in its seat (pakwashaya) and is most effective for vata gulma.'
      },
      {
        number: '3.27',
        sanskrit: 'गुल्मे पाचनं दीपनं च प्रधानम्',
        translation: 'In gulma, digestive and carminative herbs are primary.',
        commentary: 'Herbs like Hingu, Shunthi, Chitraka help digest the mass and restore normal function.'
      }
    ],
    topics: [
      {
        title: 'Unique Pathogenesis',
        content: 'Gulma forms through solidification of doshas alone, without involvement of dushya (dhatu/mala). This is unique among abdominal diseases. Vata gets vitiated through dhatukshaya (tissue wasting) or margavarana (obstruction), enters mahasrotas, and forms a palpable mass.',
        clinicalRelevance: 'Understanding that gulma is dosha-only pathology guides treatment toward dosha pacification rather than tissue repair.'
      },
      {
        title: 'Raktaja Gulma vs Pregnancy',
        content: 'Raktaja gulma mimics pregnancy with progressive monthly abdominal enlargement, milk in breasts, food cravings (dohada), dark lip/areolar coloration. Differentiation: gulma pulsation is slight and late-stage only; pregnancy movement is present throughout all trimesters.',
        clinicalRelevance: 'Critical differential diagnosis in female patients presenting with abdominal enlargement.'
      },
      {
        title: 'Two Mechanisms of Formation',
        content: 'Dhatukshaya: Tissue wasting leads to vata vitiation which solidifies in mahasrotas. Margavarana: Obstruction in channels causes vata to accumulate and harden. Both mechanisms result in palpable masses at characteristic locations.',
        clinicalRelevance: 'Identifying the mechanism guides treatment - nourishing for dhatukshaya, clearing obstruction for margavarana.'
      },
      {
        title: 'Gulma and Agni',
        content: 'Weak digestive fire (mandagni) is both a cause and consequence of gulma. When agni is weak, ama (toxins) accumulates in the GI tract, contributing to mass formation. Conversely, the mass obstructs normal digestive function, further weakening agni. Treatment must address agni through deepana (appetizing) and pachana (digestive) herbs alongside vata-pacifying measures.',
        clinicalRelevance: 'Restoring agni is essential for both treating existing gulma and preventing recurrence.'
      },
      {
        title: 'Gulma Location and Dosha Correlation',
        content: 'Hridaya (heart): Primarily vata - presents with chest pain, palpitations, anxiety. Basti (urinary bladder): Primarily vata-kapha - presents with urinary symptoms, lower abdominal pain. Parshva (sides/flanks): Vata-pitta - presents with flank pain, digestive disturbances. Nabhi (navel): Vata-kapha - presents with periumbilical pain, bloating. Each location guides treatment focus.',
        clinicalRelevance: 'Mass location is a key diagnostic clue for dosha predominance and treatment targeting.'
      },
      {
        title: 'Gulma vs Other Abdominal Conditions',
        content: 'Gulma must be differentiated from: Udara (ascites) - fluid accumulation vs solid mass; Pleeha vridhi (splenomegaly) - specific organ enlargement; Yakrit vridhi (hepatomegaly) - liver enlargement; Granthi (cyst) - encapsulated mass with different pathology; Arbuda (tumor) - involves dhatu involvement unlike gulma. Each condition has distinct pathogenesis and treatment.',
        clinicalRelevance: 'Accurate differentiation prevents misdiagnosis and ensures appropriate treatment selection.'
      },
      {
        title: 'Chronic Gulma Management',
        content: 'Long-standing gulma requires comprehensive approach: regular basti therapy, internal oleation with medicated ghee, dietary discipline, stress management, and regular follow-up. Rasayana (rejuvenation) therapy may be needed to strengthen tissues. Surgical intervention is considered only when conservative treatment fails. Regular monitoring of mass size is essential.',
        clinicalRelevance: 'Chronic gulma requires long-term commitment to treatment and lifestyle modification.'
      },
      {
        title: 'Gulma and Agni (Digestive Fire)',
        content: 'Gulma directly affects agni. The mass obstructs normal digestive function, leading to mandagni (weak digestion). This creates a vicious cycle: weak digestion produces ama, which further contributes to mass formation. Treatment must address both the mass and agni simultaneously. Deepana (carminative) and Pachana (digestive) herbs are essential components.',
        clinicalRelevance: 'Agni correction is foundational - without restoring digestion, other treatments have limited efficacy.'
      },
      {
        title: 'Gulma Location and Dosha Correlation',
        content: 'Heart region (hridaya): Usually vata or sannipataja. Urinary bladder (basti): Often vata-kapha. Sides/flanks (parshva): Vata predominant. Navel (nabhi): Can be any dosha. The location helps identify the predominant dosha and guides treatment selection.',
        clinicalRelevance: 'Location-based dosha assessment enables targeted treatment approach.'
      },
      {
        title: 'Modern Correlations of Gulma',
        content: 'Vata gulma: Functional abdominal masses, intestinal spasm, irritable bowel syndrome. Pitta gulma: Inflammatory masses, abscess, inflammatory bowel disease. Kapha gulma: Cysts, lipomas, benign tumors. Rakta gulma: Uterine fibroids, endometriosis, ovarian cysts. Sannipataja: Malignant tumors, advanced pathology.',
        clinicalRelevance: 'Understanding modern correlations enables appropriate investigations and integrative management.'
      },
      {
        title: 'Basti Therapy in Gulma',
        content: 'Basti is the most effective treatment for gulma, especially vata gulma. Types: Niruha Basti (decoction enema) with Dashamoola kwatha, and Anuvasana Basti (oil enema) with Eranda Taila or Dashamoola Taila. Basti directly reaches pakwashaya (colon, seat of vata) and helps resolve the mass through vata pacification and channel clearing.',
        clinicalRelevance: 'Regular basti therapy is the cornerstone of gulma management - should be administered systematically.'
      }
    ],
    doshaDiscussion: [
      'Vata: Hard, mobile, intermittent mass, tingling, cramps, gurgling, evening fever, blackish discoloration',
      'Pitta: Burning sensation, smoky eructations, sweating at mass site, fever, thirst, greenish-yellow discoloration',
      'Kapha: Fixed, heavy, hard mass, excess sleep, lassitude, cough, whitish discoloration',
      'Sannipataja: All symptoms, progressively increasing, fixed, incurable',
      'Raktaja: Monthly enlargement, pregnancy-like symptoms, pulsation in mass, females only'
    ],
    treatmentProtocols: [
      {
        condition: 'All Types of Gulma',
        treatment: 'Vata pacification is primary: Snehana (oleation), Swedana (fomentation), Mridu virechana (mild purgation), Basti (enema). Sweet, sour, salty tastes judiciously.',
        herbs: ['Eranda', 'Shunthi', 'Hingu', 'Saindhava', 'Dashamoola'],
        dosage: 'As directed by physician',
        duration: 'Variable based on type and severity',
        precautions: ['Avoid vata-aggravating foods', 'Avoid suppression of urges']
      },
      {
        condition: 'Vataja Gulma',
        treatment: 'Oleation, fomentation, basti, sweet/sour/salty tastes. Warm unctuous diet.',
        herbs: ['Eranda', 'Hingu', 'Saindhava', 'Shunthi', 'Dashamoola'],
        dosage: 'As directed',
        duration: 'Long-term management',
        precautions: ['Avoid cold/dry foods', 'Regular meals essential']
      },
      {
        condition: 'Pittaja Gulma',
        treatment: 'Cold therapy, bitter/sweet/astringent tastes, purgation. Cool diet.',
        herbs: ['Chandana', 'Ushira', 'Amalaki', 'Guduchi'],
        dosage: 'As directed',
        duration: 'Variable',
        precautions: ['Avoid hot/sour/salty foods']
      },
      {
        condition: 'Kaphaja Gulma',
        treatment: 'Emesis, fomentation, pungent/bitter/astringent tastes. Light diet.',
        herbs: ['Trikatu', 'Trikatu', 'Musta', 'Nagakeshara'],
        dosage: 'As directed',
        duration: 'Variable',
        precautions: ['Avoid heavy/sweet/cold foods']
      },
      {
        condition: 'Shonita Gulma (Raktaja Gulma)',
        treatment: 'Specific to females. Rakta-pacifying treatment with vata management. Cold therapy locally. Ashoka, Lodhra for uterine health. Avoid strenuous measures.',
        herbs: ['Ashoka', 'Lodhra', 'Nagakeshara', 'Shatavari', 'Chandana'],
        dosage: 'As directed by gynecologist/Ayurvedic physician',
        duration: 'Long-term management',
        precautions: ['Differentiate from pregnancy', 'Avoid strong purgation', 'Monitor for complications']
      },
      {
        condition: 'Gulma with Pain (Shula)',
        treatment: 'When gulma presents with severe colicky pain, use Hinguvachadi Churna or Hingwastak Churna with warm water or buttermilk. Dashamoola Kashaya for vata management.',
        herbs: ['Hingu', 'Vacha', 'Saindhava', 'Shunthi', 'Ajwain'],
        dosage: 'Hinguvachadi Churna 3-5g with warm water, twice daily',
        duration: 'Until pain resolves',
        precautions: ['Take with warm liquids', 'Avoid cold foods', 'Regular meals']
      },
      {
        condition: 'Gulma with Constipation',
        treatment: 'When gulma presents with vibandha (constipation), use mild purgation with Eranda Taila (castor oil) or Triphala Kashaya. Basti with oil-based formulations.',
        herbs: ['Eranda', 'Triphala', 'Senna', 'Isabgol', 'Haritaki'],
        dosage: 'Eranda Taila 10-15ml with warm milk at bedtime',
        duration: 'Until regular bowel movement established',
        precautions: ['Avoid strong purgation', 'Maintain hydration', 'Fiber-rich diet']
      },
      {
        condition: 'Gulma with Anaha (Flatulence)',
        treatment: 'When gulma presents with anaha (flatulence/distension), use Hingwadi Taila for abdominal massage. Internal use of Hingu, Saindhava, and Shunthi combination.',
        herbs: ['Hingu', 'Saindhava', 'Shunthi', 'Ajwain', 'Jeeraka'],
        dosage: 'Hinguvachadi Churna 3g with warm buttermilk, after meals',
        duration: 'Until symptoms resolve',
        precautions: ['Avoid gas-producing foods', 'Regular physical activity', 'Warm food only']
      },
      {
        condition: 'Gulma with Agnimandya (Weak Digestion)',
        treatment: 'When gulma presents with weak digestion, use Deepana-Pachana herbs first. Chitraka, Pippali, and Musta to restore agni. Then address the mass with appropriate dosha-specific treatment.',
        herbs: ['Chitraka', 'Pippali', 'Musta', 'Haritaki', 'Shunthi'],
        dosage: 'Chitrakadi Vati 2 tablets twice daily before meals',
        duration: '2-4 weeks for agni correction',
        precautions: ['Light diet during agni correction', 'Avoid heavy foods', 'Regular meal timing']
      },
      {
        condition: 'Gulma Prevention',
        treatment: 'Prevention through regular bowel habits, avoiding suppression of natural urges (flatus, defecation, urination), regular exercise, stress management, and balanced diet. Avoid vata-aggravating foods and irregular meal timing.',
        herbs: ['Triphala', 'Haritaki', 'Shunthi'],
        dosage: 'Triphala 3g with warm water at bedtime',
        duration: 'Long-term prevention',
        precautions: ['Regular bowel habits', 'Avoid urge suppression', 'Balanced diet', 'Stress management']
      },
      {
        condition: 'Gulma with Rakta Dusti (Blood Impurity)',
        treatment: 'When gulma is associated with blood impurity, use blood-purifying herbs along with vata-pacifying treatment. Manjishtha, Sariva, and Neem for blood purification. Combined with standard gulma treatment.',
        herbs: ['Manjishtha', 'Sariva', 'Neem', 'Guduchi', 'Amalaki'],
        dosage: 'Manjishtha Kwatha 20ml twice daily',
        duration: '2-3 months',
        precautions: ['Monitor blood parameters', 'Avoid alcohol', 'Pitta-pacifying diet']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Light, warm, unctuous foods - old rice, wheat, mung dal, warm milk, ghee, buttermilk',
      'Pathya: Hingu (asafoetida), saindhava (rock salt), shunthi (dry ginger), ajwain, cumin in cooking',
      'Pathya: Warm soups, gruels (yavagu), cooked vegetables, ripe fruits (banana, mango, papaya)',
      'Pathya: Regular meal times, eating only when hungry, not overeating',
      'Apathya (Avoid): Cold, dry, light foods - raw vegetables, salads, cold drinks, ice cream',
      'Apathya: Heavy, difficult-to-digest foods - fried foods, red meat, cheese, processed foods',
      'Apathya: Vata-aggravating foods - excess raw food, dry snacks, stale food, incompatible combinations',
      'Apathya: Suppression of natural urges (flatus, defecation, urination), irregular meal times, fasting',
      'Apathya: Cold exposure, excessive travel, irregular sleep, stress, anxiety'
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Gulma',
        sanskrit: 'वातज गुल्म',
        etiology: 'Cold, dry foods; suppression of urges; excessive sex/exercise; irregular postures',
        symptoms: ['Hard mobile mass', 'Intermittent enlargement', 'Tingling/cramps', 'Gurgling sounds', 'Evening fever', 'Blackish discoloration', 'Pain in flanks'],
        prognosis: 'Sadhya (curable) when treated timely',
        treatment: 'Oleation, fomentation, basti, sweet/sour/salty tastes'
      },
      {
        name: 'Pittaja Gulma',
        sanskrit: 'पैत्तिक गुल्म',
        etiology: 'Sour, salty, pungent foods; eating during indigestion; sun exposure',
        symptoms: ['Burning at mass site', 'Smoky eructations', 'Fever', 'Thirst', 'Greenish-yellow discoloration', 'Sweating at site'],
        prognosis: 'Sadhya (curable) when treated timely',
        treatment: 'Cold therapy, bitter/sweet/astringent tastes, purgation'
      },
      {
        name: 'Kaphaja Gulma',
        sanskrit: 'कफज गुल्म',
        etiology: 'Heavy, sweet, cold foods; sedentary lifestyle; excess water intake',
        symptoms: ['Fixed heavy mass', 'Excess sleep', 'Cough', 'Anorexia', 'Whitish discoloration', 'Lassitude'],
        prognosis: 'Sadhya (curable) when treated timely',
        treatment: 'Emesis, fomentation, pungent/bitter/astringent tastes'
      },
      {
        name: 'Sannipataja Gulma',
        sanskrit: 'सन्निपातज गुल्म',
        etiology: 'All three dosha causes combined',
        symptoms: ['All dosha symptoms', 'Progressively increasing', 'Fixed, deep-rooted'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      },
      {
        name: 'Raktaja Gulma',
        sanskrit: 'रक्तज गुल्म',
        etiology: 'Pitta-vata vitiation affecting rakta, only in females',
        symptoms: ['Monthly abdominal enlargement', 'Milk in breasts', 'Food cravings (dohada)', 'Dark lip/areolar coloration', 'Pulsation in mass'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Raktamokshana, pitta-vata pacifying measures, astringent drugs'
      },
      {
        name: 'Vataja Gulma with Constipation',
        sanskrit: 'वातज गुल्म कब्ज',
        etiology: 'Severe vata vitiation with constipation and gas accumulation',
        symptoms: ['Hard, immovable mass', 'Severe constipation', 'Flatulence', 'Abdominal distension', 'Colicky pain', 'Dryness'],
        prognosis: 'Sadhya (curable) with snehana, swedana, basti',
        treatment: 'Eranda Taila, Hinguvachadi Churna, Basti with Dashamoola Taila'
      },
      {
        name: 'Kaphaja Gulma with Heaviness',
        sanskrit: 'कफज गुल्म गौरव',
        etiology: 'Kapha vitiation with mucus accumulation and heaviness',
        symptoms: ['Soft, movable mass', 'Heaviness', 'Nausea', 'Sweet taste', 'Excess salivation', 'Indigestion'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Laghu (light) diet, Tikshna (sharp) herbs, Vamana, Deepana-Pachana herbs'
      },
      {
        name: 'Pittaja Gulma with Inflammation',
        sanskrit: 'पित्तज गुल्म दाह',
        etiology: 'Pitta vitiation with inflammation and heat in the mass',
        symptoms: ['Warm, tender mass', 'Burning sensation', 'Fever', 'Yellowish discoloration', 'Sour/bitter taste'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Cold, bitter, sweet herbs; Chandana, Ushira, Guduchi; avoid heat'
      },
      {
        name: 'Nabhi Gulma (Umbilical Gulma)',
        sanskrit: 'नाभि गुल्म',
        etiology: 'Vata-kapha vitiation around the umbilical region',
        symptoms: ['Mass around navel', 'Periumbilical pain', 'Bloating', 'Indigestion', 'Nausea'],
        prognosis: 'Sadhya (curable) with vata-kapha pacifying treatment',
        treatment: 'Basti, Hinguvachadi Churna, warm fomentation around navel'
      },
      {
        name: 'Hridaya Gulma (Cardiac Gulma)',
        sanskrit: 'हृदय गुल्म',
        etiology: 'Vata vitiation affecting the heart region',
        symptoms: ['Mass near heart', 'Chest pain', 'Palpitations', 'Anxiety', 'Breathlessness'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Hridya (cardiac) herbs, Arjuna, Pushkarmoola, Basti, stress management'
      },
      {
        name: 'Basti Gulma (Bladder Gulma)',
        sanskrit: 'बस्ति गुल्म',
        etiology: 'Vata-kapha vitiation in the urinary bladder region',
        symptoms: ['Mass in lower abdomen', 'Urinary difficulty', 'Pelvic pain', 'Heaviness'],
        prognosis: 'Sadhya (curable) with basti therapy',
        treatment: 'Basti with Dashamoola Taila, Basti (urinary) herbs, warm fomentation'
      },
      {
        name: 'Parshva Gulma (Flank Gulma)',
        sanskrit: 'पार्श्व गुल्म',
        etiology: 'Vata vitiation in the flanks/sides',
        symptoms: ['Mass in flanks', 'Colicky pain', 'Breathing difficulty', 'Side pain'],
        prognosis: 'Sadhya (curable) with vata-pacifying treatment',
        treatment: 'Snehana, Swedana, Basti, Hinguvachadi Churna, warm compress on flanks'
      },
      {
        name: 'Gulma with Ama (Toxins)',
        sanskrit: 'गुल्म आम',
        etiology: 'Weak digestion leading to ama accumulation and mass formation',
        symptoms: ['Mass with indigestion', 'Heavy abdomen', 'Coated tongue', 'Foul breath', 'Fatigue'],
        prognosis: 'Sadhya (curable) with agni correction',
        treatment: 'Deepana-Pachana herbs first (Trikatu, Chitraka), then address the mass'
      },
      {
        name: 'Vataja Gulma',
        sanskrit: 'वातज गुल्म',
        etiology: 'Vata-aggravating factors: cold, dry, light foods, irregular routine, suppression of urges',
        symptoms: ['Hard mass', 'Variable pain', 'Constipation', 'Flatulence', 'Dry skin', 'Distension'],
        prognosis: 'Sadhya (curable) with basti and vata-pacifying treatment',
        treatment: 'Snehana (oleation), swedana (fomentation), basti (enema), Eranda Taila, Hinguvachadi Churna'
      },
      {
        name: 'Pittaja Gulma',
        sanskrit: 'पित्तज गुल्म',
        etiology: 'Pitta-aggravating factors: hot, sour, salty foods, anger, heat exposure',
        symptoms: ['Soft mass', 'Burning pain', 'Fever', 'Yellowish discoloration', 'Thirst', 'Inflammation'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Cold therapy, virechana (purgation), bitter herbs, cooling diet, Pravala Pishti'
      },
      {
        name: 'Kaphaja Gulma',
        sanskrit: 'कफज गुल्म',
        etiology: 'Kapha-aggravating factors: heavy, sweet, cold foods, sedentary lifestyle',
        symptoms: ['Soft movable mass', 'Dull pain', 'Heaviness', 'Nausea', 'Loss of appetite', 'White coating'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Vamana (emesis), fasting, light diet, pungent herbs, warm fomentation'
      },
      {
        name: 'Sannipataja Gulma',
        sanskrit: 'सन्निपातज गुल्म',
        etiology: 'All three doshas vitiated simultaneously, chronic disease, improper treatment',
        symptoms: ['Mixed symptoms of all three doshas', 'Complex presentation', 'Rapid growth', 'Multiple complications'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only, palliative measures, pain management'
      },
      {
        name: 'Nabhi Gulma (Umbilical Gulma)',
        sanskrit: 'नाभि गुल्म',
        etiology: 'Vata-pitta vitiation in the umbilical region',
        symptoms: ['Mass near navel', 'Pain around navel', 'Digestive disturbance', 'Nausea'],
        prognosis: 'Sadhya (curable) with appropriate treatment',
        treatment: 'Vata-pitta pacification, warm compress, Hinguvachadi Churna, light diet'
      }
    ],
    importantVerses: [
      '3.3: Five types of gulma',
      '3.7: Vata solidification mechanism',
      '3.12: Sannipataja is incurable',
      '3.15: Premonitory symptoms common to all types',
      '3.16: Vata pacification is paramount for ALL types',
      '3.17: Hingu, Saindhava, Shunthi - primary gulma drugs',
      '3.18: Eranda Taila for gulma',
      '3.19: Basti as primary treatment',
      '3.20: Snehana-Swedana for vata-kaphaja gulma',
      '3.21: Cold treatment for pittaja gulma',
      '3.22: Scraping, dry, warm substances for kaphaja gulma',
      '3.23: Gynecological treatment for rakta gulma',
      '3.24: Virechana for pittaja gulma',
      '3.25: Vamana for kaphaja gulma',
      '3.26: Basti for vataja gulma',
      '3.27: Digestive and carminative herbs (Hingu, Shunthi, Chitraka)',
      '3.28: Gulma and agni: weak digestion creates vicious cycle',
      '3.29: Location-based dosha correlation',
      '3.30: Modern correlations: functional masses, cysts, fibroids',
      '3.31: Basti therapy: Niruha and Anuvasana types',
      '3.32: Chronic gulma requires sustained treatment',
      '3.33: Rasayana therapy for tissue strengthening',
      '3.34: Surgical intervention as last resort',
      '3.35: Regular monitoring of mass size',
      '3.36: Patient motivation and compliance',
      '3.37: Stress management supports treatment',
      '3.38: Dietary discipline: light, unctuous, warm food',
      '3.39: Avoid heavy, cold, dry foods',
      '3.40: Regular physical activity supports digestion'
    ],
    clinicalApplications: [
      'Always treat vata first in gulma - even small remedies work for other doshas once vata is controlled',
      'Raktaja gulma must be differentiated from pregnancy in female patients',
      'Sannipataja gulma should not be attempted to treat - focus on palliative care',
      'Suppression of natural urges is a major causative factor - counsel patients accordingly',
      'Mass location (heart, bladder, flanks, navel) helps determine predominant dosha',
      'Five types: Vataja, Pittaja, Kaphaja, Sannipataja, Raktaja',
      'Unique pathogenesis - doshas solidify without dhatu involvement',
      'Two mechanisms: Dhatukshaya (tissue depletion) and Margavarana (channel obstruction)',
      'Mass location guides treatment: Hridaya, Basti, Parshva, Nabhi',
      'Snehana, Swedana, and Basti are primary treatments',
      'Light, unctuous, warm food is beneficial',
      'Suppression of natural urges (flatus, defecation, urination) causes gulma',
      'Modern correlations: Abdominal tumors, cysts, masses, fibroids',
      'Differential diagnosis: Pregnancy, ascites, organomegaly',
      'Hinguvachadi Churna for pain management',
      'Eranda Taila for constipation associated with gulma',
      'Regular follow-up essential for monitoring mass size',
      'Restoring agni is essential for gulma treatment and prevention',
      'Mass location guides dosha predominance and treatment targeting',
      'Gulma must be differentiated from udara, pleeha vridhi, yakrit vridhi',
      'Chronic gulma requires long-term basti and rasayana therapy',
      'Surgical intervention only when conservative treatment fails',
      'Hingu-Saindhava-Shunthi combination is carminative and vata-pacifying',
      'Eranda Taila is a cornerstone for vata gulma management',
      'Stress management supports gulma treatment',
      'Six types: Vataja, Pittaja, Kaphaja, Sannipataja, Raktaja',
      'Unique pathogenesis: dosha solidification without dushya involvement',
      'Two mechanisms: Dhatukshaya and Margavarana',
      'Mahasrotas (GI tract) as the primary site',
      'Shonita Gulma only in females - mimics pregnancy',
      'Vata pacification is primary treatment principle for ALL types',
      'Sannipataja gulma is incurable',
      'Mass location: heart, urinary bladder, sides, navel regions',
      'Snehana, Swedana, and Basti are primary treatments',
      'Light, unctuous, warm food is beneficial',
      'Suppression of natural urges causes gulma',
      'Modern correlations: Abdominal tumors, cysts, masses, fibroids',
      'Differential diagnosis: Pregnancy, ascites, organomegaly',
      'Regular follow-up essential for monitoring mass size',
      'Patient education about dietary and lifestyle modifications',
      'Integration with modern imaging for accurate diagnosis',
      'Hinguvachadi Churna for pain management',
      'Eranda Taila for constipation associated with gulma',
      'Warm fomentation around the mass area provides relief',
      'Avoid suppression of flatus, defecation, and urination',
      'Regular meal timing and warm food consumption essential',
      'Basti therapy is the most effective treatment for vata gulma',
      'Niruha Basti (decoction enema) with Dashamoola kwatha',
      'Anuvasana Basti (oil enema) with Eranda Taila or Dashamoola Taila',
      'Gulma affects agni - treatment must address both mass and digestion',
      'Agni correction is foundational - without restoring digestion, other treatments have limited efficacy',
      'Location-based dosha assessment enables targeted treatment',
      'Modern correlations: Vata-functional masses, Pitta-inflammatory, Kapha-cysts',
      'Rakta gulma: Uterine fibroids, endometriosis, ovarian cysts',
      'Sannipataja: Malignant tumors, advanced pathology',
      'Chronic gulma requires sustained treatment and patient compliance',
      'Long-term basti therapy is the cornerstone of gulma management',
      'Internal oleation with medicated ghee (Dashamoola Ghrita, Eranda Ghrita)',
      'Rasayana therapy may be needed to strengthen tissues in chronic cases',
      'Surgical intervention only when conservative treatment fails',
      'Regular monitoring of mass size is essential during treatment',
      'Patient motivation and compliance are key to successful resolution',
      'Stress management supports gulma treatment',
      'Dietary discipline: light, unctuous, warm food is beneficial',
      'Avoid heavy, cold, dry foods that aggravate vata',
      'Regular physical activity supports digestion and vata pacification',
      'Integration with modern imaging for accurate diagnosis and monitoring',
      'Patient education about disease management and lifestyle modifications',
      'Family support is important for long-term treatment compliance',
      'Prevention through regular bowel habits and urge suppression avoidance'
    ]
  },

  // ===== CHAPTER 4: PRAMEHA NIDANA =====
  {
    id: 'nidana-4',
    sthana: 'Nidana Sthana',
    chapterNumber: 4,
    name: 'Prameha Nidana',
    sanskrit: 'प्रमेहनिदानम् अध्यायः',
    english: 'Diagnosis of Diabetes/Urinary Disorders',
    summary: 'Comprehensive diagnosis of Prameha covering 20 types (10 kaphaja, 6 pittaja, 4 vataja), detailed pathogenesis involving kapha-medas-mamsa-kleda vitiation, and prognostic framework. Madhumeha (vataja) correlates with diabetes mellitus. Disease progression from kaphaja to vataja indicates worsening prognosis.',
    keyConcepts: [
      '20 types: 10 Kaphaja (curable), 6 Pittaja (palliable), 4 Vataja (incurable)',
      '10 dushyas (affected tissues): meda, mamsa, kleda, shukra, rakta, vasa, majja, lasika, rasa, ojas',
      'Pathogenesis: Kapha → Meda → Mamsa → Kleda → Mutra vitiation → urinary channel obstruction',
      'Madhumeha: Ojas converted to astringent form by vata',
      'Sthula pramehi (obese) = Type 2; Krisha pramehi (asthenic) = Type 1',
      'Disease progression: Kaphaja → Pittaja → Vataja if untreated',
      'Obesity is the primary risk factor',
      'Carbuncle (pidika) development indicates mamsa dhatu involvement',
      'Disease progression: Kaphaja → Pittaja → Vataja if untreated',
      'Obesity is the primary risk factor',
      'Madhumeha (vataja) correlates with diabetes mellitus',
      'Sthula pramehi (obese) = Type 2; Krisha pramehi (asthenic) = Type 1',
      '10 dushyas (affected tissues) must be assessed',
      'Pathogenesis involves kapha-medas-mamsa-kleda vitiation'
    ],
    shlokas: [
      {
        number: '4.4',
        sanskrit: 'निदानदोषदुष्याणां साम्यम् उद्रिक्तम् अनुद्रिक्तम् वा व्याधिम् उत्पादयति',
        translation: 'The interaction of etiological factors, doshas, and dushyas along with disease-resisting factors determines whether disease manifests, is delayed, or remains absent.',
        commentary: 'Foundational principle of disease manifestation applicable to all conditions.'
      },
      {
        number: '4.8',
        sanskrit: 'उपक्लिन्नान् स्निग्धान् स्थिरान् गुरूनभिसमीक्ष्य मेदांसं कफः सम्प्राप्य',
        translation: 'Aggravated kapha blends quickly with medas (fat) because fats are excessive and both share identical qualities. The vitiated complex then obstructs urinary channels.',
        commentary: 'Core pathogenesis explaining why kapha and fat have an affinity for each other.'
      },
      {
        number: '4.37',
        sanskrit: 'ओजः स्वभावात् मधुरम् - वातरौक्ष्येण कषायम् भवति',
        translation: 'Ojas is by nature sweet. However, vata roughness converts it into astringent tasting element which, entering the urinary bladder, causes madhumeha.',
        commentary: 'Unique pathogenesis of madhumeha - the most severe form of prameha.'
      },
      {
        number: '4.50',
        sanskrit: 'प्रमेहः स्थूलान् आसक्तो भवति - अतिस्थूलानां मृत्युः शीघ्रम्',
        translation: 'Prameha is attracted to gluttonous persons and those averse to bathing and exercise. Death rapidly afflicts those who are morbidly obese.',
        commentary: 'Highlights the lifestyle connection and mortality risk in obesity-associated prameha.'
      },
      {
        number: '4.5',
        sanskrit: 'दश प्रमेहाः कफजाः - उदकमेहः इक्षुविकिरासमेहः सन्द्रमेहः सन्द्रप्रसादमेहः शुक्लमेहः शुक्रमेहः शीतमेहः सिकतामेहः शनैर्मेहः आलमेहः',
        translation: 'Ten types of kaphaja prameha: Udakameha (clear like water), Ikshuvalikarasameha (like sugarcane juice), Sandrameha (viscous), Sandraprasadameha (viscous then clear), Shuklameha (white), Shukrameha (semen-like), Sheetameha (cold), Sikatameha (gravel), Shanirameha (slow), Alalameha (slimy).',
        commentary: 'Detailed classification of kaphaja prameha - all ten are curable with proper treatment.'
      },
      {
        number: '4.6',
        sanskrit: 'षट् प्रमेहाः पित्तजाः - क्षारमेहः कालमेहः नीलमेहः रक्तमेहः मञ्जिष्ठामेहः हरिद्रामेहः',
        translation: 'Six types of pittaja prameha: Ksharameha (alkaline), Kalamaha (black), Nilameha (blue), Raktameha (bloody), Manjisthameha (like manjistha), Haridrameha (like turmeric).',
        commentary: 'Pittaja prameha types indicate moderate disease progression - palliable but more challenging than kaphaja.'
      },
      {
        number: '4.7',
        sanskrit: 'चत्वारः प्रमेहाः वातजाः - वसामेहः मज्जामेहः हस्तिमेहः मधुमेहः',
        translation: 'Four types of vataja prameha: Vasameha (fat-like), Majjameha (marrow-like), Hastimeha (copious continuous), Madhumeha (sweet/astringent).',
        commentary: 'Vataja prameha represents the most severe stage - incurable, requiring lifelong management.'
      },
      {
        number: '4.9',
        sanskrit: 'दश दुष्याः - मेदः मांसं क्लेदः शुक्रं रक्तं वसा मज्जा लसीका रस ओजः',
        translation: 'Ten dushyas (affected tissues): meda (fat), mamsa (muscle), kleda (moisture), shukra (reproductive), rakta (blood), vasa (fat), majja (marrow), lasika (lymph), rasa (plasma), ojas (essence).',
        commentary: 'Multiple tissue involvement explains the systemic nature of prameha and its complications.'
      },
      {
        number: '4.10',
        sanskrit: 'प्रमेहाणां पूर्वरूपाणि - केशानां शाथिल्यं माधुर्यम् अङ्गेषु सुप्तिः हस्तपादयोः दाहः तृष्णा मूत्रे वृश्चिकाः',
        translation: 'Premonitory symptoms of prameha: matting of hair, sweet taste in mouth, numbness in limbs, burning in hands/feet, thirst, insects attracted to urine.',
        commentary: 'Early recognition enables intervention before full disease manifestation.'
      },
      {
        number: '4.11',
        sanskrit: 'मधुमेहे ओजः कषायम् भवति - वातरौक्ष्यात्',
        translation: 'In madhumeha, ojas is converted to astringent form by vata roughness, entering the urinary bladder.',
        commentary: 'Unique pathogenesis of the most severe form - ojas vitiation indicates deep metabolic disturbance.'
      },
      {
        number: '4.12',
        sanskrit: 'स्थूलप्रमेही कृशप्रमेही च - स्थूलः साध्यः कृशः असाध्यः',
        translation: 'Two patient types: sthula pramehi (obese) is curable, krisha pramehi (asthenic) is incurable.',
        commentary: 'Patient constitution determines prognosis - obesity-linked diabetes is more treatable than wasting diabetes.'
      },
      {
        number: '4.13',
        sanskrit: 'प्रमेहाः कफजाः साध्याः पित्तजाः याप्याः वातजाः असाध्याः',
        translation: 'Kaphaja prameha is curable, pittaja is palliable, vataja is incurable.',
        commentary: 'Three-tier prognostic framework based on dosha predominance.'
      },
      {
        number: '4.14',
        sanskrit: 'पिडिका वा मांसप्रदरो वा प्रमेहिणाम्',
        translation: 'Prameha patients may develop pidika (carbuncles) or mamsa-pradara (flesh-oozing wounds) as complications.',
        commentary: 'Carbuncle development indicates mamsa dhatu involvement and worsened prognosis.'
      },
      {
        number: '4.15',
        sanskrit: 'असाध्यानां प्रमेहाणां उपद्रवाः - छर्दिः अतिसारः ज्वरः दाहः तृष्णा',
        translation: 'Complications of incurable prameha: vomiting, diarrhea, fever, burning sensation, severe thirst.',
        commentary: 'Systemic complications indicate multi-organ involvement and poor prognosis.'
      },
      {
        number: '4.16',
        sanskrit: 'प्रमेहे मेदस्विनी कफबहुला मांसला मधुराहारसेवी - स्थूलप्रमेही',
        translation: 'The sthula pramehi (obese diabetic) is characterized by excess medas, kapha, musculature, and sweet food consumption.',
        commentary: 'Clinical profile of the obese diabetic - correlates with Type 2 diabetes.'
      },
      {
        number: '4.17',
        sanskrit: 'कृशप्रमेही रूक्षः शीतः वातबहुलः अल्पशुक्रः',
        translation: 'The krisha pramehi (asthenic diabetic) is dry, cold, vata-predominant, with depleted shukra.',
        commentary: 'Clinical profile of the wasting diabetic - correlates with Type 1 or advanced Type 2.'
      },
      {
        number: '4.18',
        sanskrit: 'प्रमेहिणां व्यायामः प्रधानम् - व्यायामात् मेदः क्षीयते',
        translation: 'Exercise is primary for prameha patients - through exercise, excess medas (fat) is reduced.',
        commentary: 'Physical activity is a cornerstone of prameha management, especially for sthula pramehi.'
      },
      {
        number: '4.19',
        sanskrit: 'प्रमेहे कटुतिक्तकषायाः हिताः - मधुराम्ललवणाः अहिताः',
        translation: 'Pungent, bitter, and astringent tastes are beneficial in prameha. Sweet, sour, and salty tastes are harmful.',
        commentary: 'Taste-based dietary management - the three lighter tastes counter kapha and medas vitiation.'
      },
      {
        number: '4.20',
        sanskrit: 'प्रमेहे यवगोधूमा हिताः - शालिषष्टिका च',
        translation: 'Barley and wheat are beneficial in prameha. Shashtika rice (short-term rice) is also good.',
        commentary: 'Specific grain recommendations - barley has kapha-reducing properties ideal for prameha.'
      },
      {
        number: '4.21',
        sanskrit: 'प्रमेहे मधु प्रशस्तम् - कफमेदोहरम् लघु रूक्षम्',
        translation: 'Honey is praised in prameha - it reduces kapha and medas, is light and dry.',
        commentary: 'Honey is the ideal sweetener for prameha patients - satisfies sweet craving without aggravating kapha.'
      },
      {
        number: '4.22',
        sanskrit: 'प्रमेहे त्रिफला प्रधानम् - कफपित्तहरम्',
        translation: 'Triphala is primary in prameha management - it pacifies kapha and pitta.',
        commentary: 'Triphala addresses multiple aspects of prameha: kapha reduction, digestion support, and tissue cleansing.'
      },
      {
        number: '4.23',
        sanskrit: 'प्रमेहे गुडूची प्रशस्तम् - कषायतिक्तमधुरा',
        translation: 'Guduchi is praised in prameha - it is astringent, bitter, and sweet in taste.',
        commentary: 'Guduchi has multiple properties that help manage prameha: bitter reduces kapha, sweet nourishes tissues.'
      },
      {
        number: '4.24',
        sanskrit: 'प्रमेहे अमलकी प्रशस्तम् - अम्लरसपरिहारेण',
        translation: 'Amalaki is praised in prameha when used avoiding sour taste.',
        commentary: 'Amalaki provides vitamin C and antioxidants while being safe for prameha when properly prepared.'
      },
      {
        number: '4.25',
        sanskrit: 'प्रमेहे शिलाजतु प्रशस्तम् - मधुरकषायम्',
        translation: 'Shilajatu is praised in prameha - it has sweet and astringent tastes.',
        commentary: 'Shilajatu is a powerful anti-diabetic mineral preparation used in traditional prameha management.'
      },
      {
        number: '4.26',
        sanskrit: 'प्रमेहे व्यायामः प्रधानम् - अल्पस्निग्धमधुराहारः च',
        translation: 'Exercise and light, less sweet, less unctuous food are primary in prameha.',
        commentary: 'Lifestyle modification through exercise and diet control is the foundation of prameha management.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis (Samprapti)',
        content: 'Step 1: Kapha vitiation from dietary/lifestyle causes. Step 2: Kapha blends with medas (fat) due to similar qualities. Step 3: Vitiated kapha-medas combines with mamsa and kleda. Step 4: Muscle vitiation produces pidika (carbuncles). Step 5: Liquid dhatus transform into mutra. Step 6: Kapha obstructs urinary channels → Prameha.',
        clinicalRelevance: 'The kapha-medas connection explains why obesity is the primary risk factor. Weight management is foundational.'
      },
      {
        title: 'Modern Correlations',
        content: 'Kaphaja prameha correlates with early Type 2 diabetes and metabolic syndrome. Pittaja prameha correlates with moderate hyperglycemia and UTI. Vataja prameha (madhumeha) correlates with Type 1 or advanced Type 2 diabetes. Udakameha may represent diabetes insipidus. Kalamaha may represent alkaptonuria.',
        clinicalRelevance: 'Understanding modern correlations helps integrate Ayurvedic diagnosis with contemporary laboratory findings.'
      },
      {
        title: '20 Types of Prameha - Detailed Classification',
        content: 'Kaphaja (10): Udakameha (water-like), Ikshuvalikarasameha (sugarcane juice-like), Sandrameha (viscous), Shuklameha (white), Shukrameha (semen-like), Sikatameha (gravel), Lavanameha (salty), Pishtameha (starch-like), Sandra meha (thick), Malameha (fecal). Pittaja (6): Ksharameha (alkaline), Kalamaha (black), Nilameha (blue), Raktameha (bloody), Manjisthameha (manjistha-colored), Haridrameha (turmeric-colored). Vataja (4): Vasameha (fat-like), Majjameha (marrow-like), Hastimeha (copious continuous), Madhumeha (sweet/astringent/dry).',
        clinicalRelevance: 'Each type has specific urine characteristics that guide diagnosis and prognosis.'
      },
      {
        title: 'Exercise and Prameha',
        content: 'Physical exercise (vyayama) is a cornerstone of prameha management. Exercise reduces medas (fat), improves agni (digestion), and enhances tissue metabolism. For sthula pramehi (obese), vigorous exercise is recommended. For krisha pramehi (asthenic), moderate exercise is advised. Walking, yoga, and strength training are beneficial. Exercise should be done regularly, ideally in the morning, and should not cause excessive fatigue.',
        clinicalRelevance: 'Exercise prescription must be individualized based on patient constitution and disease severity.'
      },
      {
        title: 'Prameha and Obesity',
        content: 'Obesity (sthaulya) is the primary risk factor for prameha. Excess medas (fat) shares qualities with kapha, creating a pathway for disease. The sthula pramehi (obese diabetic) is more treatable than krisha pramehi (wasting diabetic). Weight management through diet, exercise, and lifestyle modification is foundational. Even modest weight loss (5-10%) significantly improves outcomes.',
        clinicalRelevance: 'Weight management is the most impactful intervention for Type 2 prameha.'
      },
      {
        title: 'Prameha Complications (Upadrava)',
        content: 'Common complications: Pidika (carbuncles) - indicates mamsa dhatu involvement; Mamsa-pradara (flesh-oozing wounds); Trishna (severe thirst); Daha (burning); Shwasa (dyspnea); Hridroga (heart disease); Netra-roga (eye disease); Vrana (non-healing wounds). Each complication requires specific management alongside prameha treatment.',
        clinicalRelevance: 'Early detection of complications guides treatment intensification and prevents progression.'
      },
      {
        title: 'Dietary Management in Prameha',
        content: 'Pathya (Beneficial): Barley (yava), wheat (godhuma), shashtika rice, mung dal, bitter vegetables (karela, neem), honey, buttermilk, light foods. Apathya (Avoid): Sweet foods, heavy/oily foods, new rice, sugarcane products, dairy (except buttermilk), cold drinks, sedentary lifestyle. Meal timing: Regular meals, avoid skipping, avoid late-night eating.',
        clinicalRelevance: 'Dietary management is foundational - even medications are less effective without dietary compliance.'
      },
      {
        title: 'Exercise and Prameha',
        content: 'Exercise (vyayama) is a cornerstone of prameha management. Physical activity reduces medas (fat), improves agni (digestion), and helps regulate blood sugar. Types: brisk walking, yoga, swimming, cycling. Intensity: moderate, avoiding exhaustion. Timing: after meals for blood sugar control. Precautions: monitor blood sugar before/after, carry sugar source, avoid in hypoglycemia.',
        clinicalRelevance: 'Regular exercise improves insulin sensitivity and reduces medication requirements.'
      },
      {
        title: 'Prameha and Agni',
        content: 'Agni status varies in prameha: mandagni (weak digestion) is common in kaphaja prameha with obesity. Tikshnagni (sharp digestion) may be seen in vataja prameha with wasting. Vishamagni (irregular digestion) can occur in mixed presentations. Treatment must address agni appropriately: deepana for mandagni, brimhana for tikshnagni, balanced approach for vishamagni.',
        clinicalRelevance: 'Agni assessment guides treatment selection and dietary recommendations.'
      },
      {
        title: 'Madhumeha (Diabetes Mellitus) - Detailed',
        content: 'Madhumeha is the most severe form of prameha, correlating with diabetes mellitus. Pathogenesis: vata roughness converts ojas (sweet by nature) into astringent form. This enters urinary bladder causing madhumeha. Characteristics: sweet and astringent urine, dry skin, excessive thirst, polyuria, wasting. Management: lifelong with diet control, exercise, rasayana therapy, and specific herbs like Shilajatu, Guduchi, and Amalaki.',
        clinicalRelevance: 'Madhumeha requires comprehensive long-term management integrating diet, exercise, herbs, and lifestyle.'
      },
      {
        title: 'Sthula vs Krisha Pramehi',
        content: 'Sthula pramehi (obese diabetic): Excess medas, kapha predominant, sweet food addiction, sedentary lifestyle. More treatable - weight loss improves outcomes. Krisha pramehi (wasting diabetic): Depleted tissues, vata predominant, insulin-dependent. Incurable - requires insulin support and rasayana therapy. Treatment differs significantly between these two types.',
        clinicalRelevance: 'Distinguishing between obese and wasting types guides treatment strategy and prognosis counseling.'
      }
    ],
    doshaDiscussion: [
      'Kapha (10 types): Curable - shares qualities with medas, amenable to same treatment',
      'Pitta (6 types): Palliable - close locus to medas but treatment contradiction',
      'Vata (4 types): Incurable - treatment contradictions and critical nature',
      'Disease progression: Kaphaja → Pittaja → Vataja indicates worsening prognosis'
    ],
    treatmentProtocols: [
      {
        condition: 'Kaphaja Prameha (Early Diabetes)',
        treatment: 'Shodhana (purification) with vamana, langhana (fasting), tikshna (sharp) medicines, kashaya (astringent) drugs, physical exercise',
        herbs: ['Guduchi', 'Kutaja', 'Musta', 'Haridra', 'Daruharidra', 'Triphala'],
        dosage: 'As directed',
        duration: 'Long-term management',
        precautions: ['Avoid sweet, heavy, oily foods', 'Regular exercise essential']
      },
      {
        condition: 'Pittaja Prameha (Moderate Diabetes)',
        treatment: 'Pitta-pacifying measures, bitter/sweet drugs, moderate purification',
        herbs: ['Amalaki', 'Guduchi', 'Shatavari', 'Chandana', 'Musta'],
        dosage: 'As directed',
        duration: 'Long-term management',
        precautions: ['Avoid hot/sour/salty foods', 'Monitor blood sugar']
      },
      {
        condition: 'Madhumeha (Advanced Diabetes)',
        treatment: 'Guru (heavy) and snigdha (unctuous) preparations, basti therapy, vata-pacifying measures',
        herbs: ['Ashwagandha', 'Shatavari', 'Guduchi', 'Amalaki', 'Haritaki'],
        dosage: 'As directed',
        duration: 'Lifelong management',
        precautions: ['Cannot be cured - only managed', 'Monitor blood sugar regularly']
      },
      {
        condition: 'Prameha with Obesity (Sthaulya)',
        treatment: 'Langhana (fasting), rukshana (drying), exercise, tikshna vamana, laghu ahara (light diet). Weight management is foundational.',
        herbs: ['Triphala', 'Guggulu', 'Musta', 'Haridra', 'Daruharidra'],
        dosage: 'Triphala Kashaya 40ml twice daily before meals',
        duration: 'Long-term until weight normalized',
        precautions: ['Gradual weight loss', 'Monitor for weakness', 'Avoid crash diets']
      },
      {
        condition: 'Prameha with Carbuncles (Pidika)',
        treatment: 'When carbuncles develop, use Haridra and Daruharidra internally and externally. Jatyadi Taila for local application. Avoid incision in diabetic carbuncles.',
        herbs: ['Haridra', 'Daruharidra', 'Neem', 'Guduchi', 'Amalaki'],
        dosage: 'Haridra Churna 3g with honey, twice daily',
        duration: 'Until carbuncles heal',
        precautions: ['Blood sugar control essential', 'Wound care critical', 'Avoid surgical intervention unless necessary']
      },
      {
        condition: 'Prameha with Complications (Upadrava)',
        treatment: 'Manage specific complications: Trishna (thirst) - Chandana, Ushira. Atisara (diarrhea) - Kutaja, Bilva. Jwara (fever) - Guduchi, Musta. Daha (burning) - Pravala, Mukta Pishti.',
        herbs: ['Chandana', 'Ushira', 'Kutaja', 'Bilva', 'Guduchi'],
        dosage: 'As directed for specific complication',
        duration: 'Until complications resolve',
        precautions: ['Treat underlying prameha simultaneously', 'Monitor blood sugar']
      },
      {
        condition: 'Prevention of Prameha',
        treatment: 'Regular exercise, avoidance of sweet/heavy/oily foods, weight management, regular sleep patterns, stress management. Seasonal regimen adjustments.',
        herbs: ['Guduchi', 'Amalaki', 'Haridra', 'Triphala', 'Shilajit'],
        dosage: 'Prophylactic dose as directed',
        duration: 'Lifestyle modification - lifelong',
        precautions: ['Regular health checkups', 'Family history awareness', 'Early intervention at premonitory stage']
      },
      {
        condition: 'Sthula Pramehi (Type 2 Diabetes)',
        treatment: 'Langhana, rukshana, tikshna vamana, exercise, laghu ahara. Focus on weight reduction and metabolic correction.',
        herbs: ['Guduchi', 'Musta', 'Haridra', 'Daruharidra', 'Triphala', 'Guggulu'],
        dosage: 'Guduchi Satva 500mg twice daily with warm water',
        duration: 'Long-term management',
        precautions: ['Monitor blood sugar regularly', 'Gradual exercise progression', 'Dietary compliance essential']
      },
      {
        condition: 'Krisha Pramehi (Type 1 Diabetes)',
        treatment: 'Guru (heavy) and snigdha (unctuous) preparations, basti, vata-pacifying measures. Cannot be cured - only managed.',
        herbs: ['Ashwagandha', 'Shatavari', 'Bala', 'Guduchi', 'Amalaki'],
        dosage: 'As directed',
        duration: 'Lifelong management',
        precautions: ['Insulin may be required', 'Regular monitoring', 'Avoid strong purification']
      },
      {
        condition: 'Prameha with Eye Complications (Netra Roga)',
        treatment: 'When prameha affects eyes, use Triphala Ghrita internally and Triphala eye wash. Saptamrita Lauha for chronic eye complications. Regular ophthalmological monitoring.',
        herbs: ['Triphala', 'Amalaki', 'Haritaki', 'Vibhitaki', 'Saptamrita Lauha'],
        dosage: 'Triphala Ghrita 10g twice daily with warm water',
        duration: 'Long-term eye protection',
        precautions: ['Regular eye examination', 'Blood sugar control', 'Avoid eye strain']
      },
      {
        condition: 'Prameha with Heart Complications (Hridroga)',
        treatment: 'When prameha affects the heart, use Arjuna, Pushkarmoola, and Guggulu for cardiac protection. Monitor cardiac function regularly. Manage blood pressure and cholesterol.',
        herbs: ['Arjuna', 'Pushkarmoola', 'Guggulu', 'Guduchi', 'Amalaki'],
        dosage: 'Arjuna Kwatha 40ml twice daily',
        duration: 'Long-term cardiac protection',
        precautions: ['Regular cardiac monitoring', 'Blood pressure control', 'Stress management']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Barley (yava) - best grain for prameha, old rice, wheat, mung dal, masoor dal',
      'Pathya: Bitter vegetables (bitter gourd, fenugreek, neem), astringent foods (pomegranate, raw banana)',
      'Pathya: Buttermilk (takra), honey (madhu) in moderation, ghee (small quantities)',
      'Pathya: Regular exercise (vyayama), light food, early dinner, adequate sleep',
      'Pathya: Guduchi, Amalaki, Haridra as daily supplements',
      'Apathya (Avoid): Sweet foods (guru, madhura) - sugar, jaggery, honey in excess, sweet fruits',
      'Apathya: Heavy, oily, fried foods - ghee in excess, cheese, butter, cream',
      'Apathya: Sedentary lifestyle, excessive sleep, day sleeping, lack of exercise',
      'Apathya: New rice, wheat flour (fresh), sugarcane products, dairy in excess',
      'Apathya: Alcohol, tobacco, cold drinks, ice cream, processed foods',
      'Apathya: Suppression of natural urges, irregular meal times, stress'
    ],
    diseaseDescriptions: [
      {
        name: 'Kaphaja Prameha (10 types)',
        sanskrit: 'कफज प्रमेह',
        etiology: 'Excess sweet, heavy, oily foods; sedentary lifestyle; excessive sleep; lack of exercise',
        symptoms: ['Udakameha: water-like urine', 'Ikshuvalikarasameha: sugarcane juice-like', 'Sandrameha: viscous urine', 'Shuklameha: white urine', 'Shukrameha: semen-like urine', 'Sikatameha: gravel-like particles', 'Lavanameha: salty taste', 'Pishtameha: starch-like', 'Sandra: thick', 'Mala: fecal smell'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Vamana, langhana, tikshna medicines, exercise'
      },
      {
        name: 'Pittaja Prameha (6 types)',
        sanskrit: 'पैत्तिक प्रमेह',
        etiology: 'Hot, sour, salty foods; heat exposure; anger; excess pitta-aggravating diet',
        symptoms: ['Ksharameha: alkali-like urine', 'Kalamaha: black urine', 'Nilameha: blue urine', 'Raktameha: red/bloody urine', 'Manjisthameha: manjistha-colored urine', 'Haridrameha: turmeric-colored urine'],
        prognosis: 'Yapya (palliable)',
        treatment: 'Pitta-pacifying measures, bitter/sweet drugs'
      },
      {
        name: 'Vataja Prameha (4 types)',
        sanskrit: 'वातज प्रमेह',
        etiology: 'Light, dry, cold foods; excessive sex/exercise; suppression of urges; grief; tissue depletion',
        symptoms: ['Vasameha: fat-like urine', 'Majjameha: marrow-like urine', 'Hastimeha: copious continuous flow', 'Madhumeha: sweet/astringent, dry urine'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Vata-pacifying, snigdha, guru measures, basti'
      },
      {
        name: 'Madhumeha',
        sanskrit: 'मधुमेह',
        etiology: 'Vata roughness converts ojas to astringent form',
        symptoms: ['Sweet/astringent urine', 'Dry urine', 'Copious flow', 'Emaciation', 'Weakness', 'Ojas depletion'],
        prognosis: 'Asadhya (incurable) - lifelong management only',
        treatment: 'Snigdha, guru measures, basti, rasayana therapy'
      },
      {
        name: 'Prameha Pidika (Carbuncles)',
        sanskrit: 'प्रमेह पिडिका',
        etiology: 'Mamsa dhatu involvement in prameha, kapha-pitta vitiation',
        symptoms: ['Carbuncle formation', 'Painful swelling', 'Pus formation', 'Non-healing wounds', 'Fever'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Wound care, kapha-pitta pacifying herbs, Haridra, Neem, Manjistha'
      },
      {
        name: 'Prameha with Trishna',
        sanskrit: 'प्रमेह तृष्णा',
        etiology: 'Pitta vitiation and dehydration in prameha',
        symptoms: ['Severe thirst', 'Dry mouth', 'Burning sensation', 'Frequent urination', 'Dehydration'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Cooling drinks, Chandana, Ushira, electrolyte management'
      },
      {
        name: 'Prameha with Hridroga',
        sanskrit: 'प्रमेह हृद्रोग',
        etiology: 'Chronic prameha affecting cardiac function, medas accumulation in heart',
        symptoms: ['Chest pain', 'Palpitations', 'Breathlessness', 'Fatigue', 'Edema'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Arjuna, Pushkarmoola, cardiac support, lifestyle modification'
      },
      {
        name: 'Prameha with Netra Roga',
        sanskrit: 'प्रमेह नेत्र रोग',
        etiology: 'Chronic prameha affecting eye tissues, pitta vitiation',
        symptoms: ['Blurred vision', 'Eye pain', 'Sensitivity to light', 'Progressive vision loss'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Triphala eye wash, Saptamrita Lauha, pitta-pacifying measures'
      },
      {
        name: 'Prameha with Vrana',
        sanskrit: 'प्रमेह व्रण',
        etiology: 'Non-healing wounds due to tissue depletion and ama',
        symptoms: ['Non-healing ulcers', 'Especially on feet', 'Numbness', 'Tissue necrosis', 'Infection'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Wound care, Haridra, Neem, tissue-healing herbs, blood sugar management'
      },
      {
        name: 'Kaphaja Prameha (10 types)',
        sanskrit: 'कफज प्रमेह',
        etiology: 'Kapha-aggravating factors: heavy, sweet, cold foods, sedentary lifestyle',
        symptoms: ['Udra: urine like washings of barley', 'Ikshu: sugarcane juice-like', 'Sandra: thick urine', 'Sukra: semen-like', 'Shukra: semen-like', 'Sheeta: cold urine', 'Sikat: sandy urine', 'Shanai: slowly passing', 'Lala: saliva-like', 'Pisht: flour-like'],
        prognosis: 'Sadhya (curable) - most responsive to treatment',
        treatment: 'Emesis (vamana), fasting, light diet, kapha-pacifying herbs'
      },
      {
        name: 'Pittaja Prameha (6 types)',
        sanskrit: 'पित्तज प्रमेह',
        etiology: 'Pitta-aggravating factors: hot, sour, salty foods, anger, heat exposure',
        symptoms: ['Kshara: alkaline urine', 'Neela: blue urine', 'Haridra: turmeric-colored', 'Manjistha: madder-colored', 'Rohini: red/yellow', 'Palasha: leaf-colored'],
        prognosis: 'Yapya (palliable) - can be managed but not fully cured',
        treatment: 'Purgation (virechana), cooling herbs, pitta-pacifying diet'
      },
      {
        name: 'Sthula Pramehi (Obese Diabetic)',
        sanskrit: 'स्थूल प्रमेही',
        etiology: 'Excess medas (fat), kapha predominant, sweet food addiction, sedentary lifestyle',
        symptoms: ['Obesity', 'Excessive urination', 'Sweet taste in mouth', 'Heavy body', 'Excessive thirst'],
        prognosis: 'Sadhya (curable) - weight loss improves outcomes',
        treatment: 'Langhana (lightening), rukshana (drying), tikshna (sharp) treatment, exercise, weight management'
      },
      {
        name: 'Krisha Pramehi (Wasting Diabetic)',
        sanskrit: 'कृश प्रमेही',
        etiology: 'Depleted tissues, vata predominant, insulin-dependent',
        symptoms: ['Emaciation', 'Excessive urination', 'Dry skin', 'Weakness', 'Ojas depletion'],
        prognosis: 'Asadhya (incurable) - requires lifelong management',
        treatment: 'Guru (heavy), snigdha (unctuous), brimhana (nourishing) treatment, insulin support'
      }
    ],
    importantVerses: [
      '4.4: Disease manifestation principles',
      '4.8: Kapha-fat affinity pathogenesis',
      '4.37: Madhumeha - ojas conversion by vata',
      '4.50: Obesity-prameha connection',
      '4.51: Lifestyle factors and mortality',
      '4.14: Carbuncle development in prameha',
      '4.15: Complications of incurable prameha',
      '4.16: Clinical profile of sthula pramehi',
      '4.17: Clinical profile of krisha pramehi',
      '4.18: Exercise as primary treatment',
      '4.19: Taste-based dietary management',
      '4.20: Grain recommendations for prameha',
      '4.21: Honey as ideal sweetener',
      '4.22: Triphala in prameha management',
      '4.23: Guduchi in prameha management',
      '4.24: Amalaki in prameha management',
      '4.25: Shilajatu in prameha management',
      '4.26: Exercise and diet control as foundation',
      '4.27: Sthula vs Krisha pramehi classification',
      '4.28: Carbuncle (pidika) development',
      '4.29: Complications: Trishna, Daha, Shwasa, Hridroga, Netra-roga, Vrana',
      '4.30: Prameha with eye complications',
      '4.31: Prameha with heart complications',
      '4.32: Prameha with non-healing wounds',
      '4.33: Prameha with thirst and burning',
      '4.34: Prameha with respiratory complications',
      '4.35: Prameha with skin complications',
      '4.36: Prameha with urinary complications',
      '4.37: Prameha with neurological complications',
      '4.38: Prameha with digestive complications',
      '4.39: Prameha with reproductive complications',
      '4.40: Prameha with immune complications'
    ],
    clinicalApplications: [
      '20-type classification guides prognosis and treatment selection',
      'Kaphaja types are most responsive to purification therapy',
      'Madhumeha requires lifelong management - not curable',
      'Obesity management is foundational in prameha prevention',
      'Disease progression from kaphaja to vataja indicates worsening prognosis',
      'Carbuncle (pidika) development indicates mamsa dhatu involvement',
      'Sthula (obese) vs Krisha (asthenic) classification guides treatment approach',
      '10 dushyas (affected tissues): meda, mamsa, kleda, shukra, rakta, vasa, majja, lasika, rasa, ojas',
      'Pathogenesis: Kapha blends with medas due to similar qualities',
      'Madhumeha: ojas converted to astringent by vata roughness',
      'Premonitory symptoms: matting of hair, sweet taste, numbness, thirst',
      'Insects attracted to urine is a classic diagnostic sign',
      'Obesity-linked diabetes (sthula pramehi) is curable',
      'Asthenic diabetes (krisha pramehi) is incurable',
      'Barley (yava) is the best grain for prameha',
      'Regular exercise (vyayama) is essential for prevention and management',
      'Complications: Trishna, Atisara, Jwara, Daha, Pidika',
      'Modern correlation: Madhumeha - Diabetes mellitus',
      'Guduchi is the most important herb for prameha management',
      'Exercise prescription must be individualized based on patient constitution',
      'Weight management is the most impactful intervention for Type 2 prameha',
      'Dietary management is foundational - even medications are less effective without dietary compliance',
      'Prameha complications: Pidika, Trishna, Daha, Shwasa, Hridroga, Netra-roga, Vrana',
      'Honey is the ideal sweetener for prameha patients',
      'Triphala addresses multiple aspects: kapha reduction, digestion, tissue cleansing',
      'Bitter vegetables (karela, neem) are beneficial for prameha patients',
      '20 types: 10 Kaphaja (curable), 6 Pittaja (palliable), 4 Vataja (incurable)',
      '10 dushyas: meda, mamsa, kleda, shukra, rakta, vasa, majja, lasika, rasa, ojas',
      'Pathogenesis: Kapha blends with medas due to similar qualities',
      'Madhumeha: ojas converted to astringent by vata roughness',
      'Premonitory symptoms: matting of hair, sweet taste, numbness, thirst',
      'Insects attracted to urine is a classic diagnostic sign',
      'Obesity-linked diabetes (sthula pramehi) is curable',
      'Asthenic diabetes (krisha pramehi) is incurable',
      'Barley (yava) is the best grain for prameha',
      'Regular exercise (vyayama) is essential for prevention and management',
      'Sthula pramehi needs langhana, rukshana, tikshna treatment',
      'Krisha pramehi needs guru, snigdha, brimhana treatment',
      'Blood sugar monitoring is essential for all prameha patients',
      'Carbuncle development is a serious complication requiring wound care',
      'Eye complications (netra roga) require Triphala eye wash',
      'Cardiac complications (hridroga) require Arjuna-based treatment',
      'Non-healing wounds (vrana) indicate severe tissue depletion',
      'Patient education about dietary compliance and exercise is critical',
      'Integration with modern diabetes management for comprehensive care',
      'Seasonal adjustments in treatment and diet are important',
      'Stress management supports prameha treatment',
      'Family history awareness enables early screening and prevention',
      'Guduchi is the most important herb for prameha management',
      'Shilajatu is a powerful anti-diabetic mineral preparation',
      'Amalaki provides vitamin C and antioxidants for prameha',
      'Haridra (turmeric) has anti-inflammatory and blood sugar regulating properties',
      'Exercise prescription must be individualized based on patient constitution',
      'Weight management is the most impactful intervention for Type 2 prameha',
      'Dietary management is foundational - even medications are less effective without dietary compliance',
      'Prameha complications: Pidika, Trishna, Daha, Shwasa, Hridroga, Netra-roga, Vrana',
      'Honey is the ideal sweetener for prameha patients',
      'Triphala addresses multiple aspects: kapha reduction, digestion, tissue cleansing',
      'Bitter vegetables (karela, neem) are beneficial for prameha patients',
      '20 types: 10 Kaphaja (curable), 6 Pittaja (palliable), 4 Vataja (incurable)',
      '10 dushyas: meda, mamsa, kleda, shukra, rakta, vasa, majja, lasika, rasa, ojas',
      'Pathogenesis: Kapha blends with medas due to similar qualities',
      'Madhumeha: ojas converted to astringent by vata roughness',
      'Premonitory symptoms: matting of hair, sweet taste, numbness, thirst',
      'Insects attracted to urine is a classic diagnostic sign',
      'Obesity-linked diabetes (sthula pramehi) is curable',
      'Asthenic diabetes (krisha pramehi) is incurable',
      'Barley (yava) is the best grain for prameha',
      'Regular exercise (vyayama) is essential for prevention and management',
      'Sthula pramehi needs langhana, rukshana, tikshna treatment',
      'Krisha pramehi needs guru, snigdha, brimhana treatment',
      'Blood sugar monitoring is essential for all prameha patients',
      'Carbuncle development is a serious complication requiring wound care',
      'Eye complications (netra roga) require Triphala eye wash',
      'Cardiac complications (hridroga) require Arjuna-based treatment',
      'Non-healing wounds (vrana) indicate severe tissue depletion',
      'Patient education about dietary compliance and exercise is critical',
      'Integration with modern diabetes management for comprehensive care',
      'Seasonal adjustments in treatment and diet are important',
      'Stress management supports prameha treatment',
      'Family history awareness enables early screening and prevention',
      'Guduchi Satva 500mg twice daily for blood sugar management',
      'Triphala Kashaya 40ml twice daily before meals for kapha reduction',
      'Haridra Churna 3g with honey for carbuncle management',
      'Shilajatu for rejuvenation and blood sugar regulation',
      'Regular meal timing and avoidance of late-night eating',
      'Adequate sleep and stress management are important',
      'Regular health checkups and blood sugar monitoring',
      'Patient education about disease management and lifestyle',
      'Integration with modern diabetes care for comprehensive management',
      'Long-term follow-up and medication compliance are essential'
    ]
  },

  // ===== CHAPTER 5: KUSHTHA NIDANA =====
  {
    id: 'nidana-5',
    sthana: 'Nidana Sthana',
    chapterNumber: 5,
    name: 'Kushtha Nidana',
    sanskrit: 'कुष्ठनिदानम् अध्यायः',
    english: 'Diagnosis of Skin Diseases',
    summary: 'Diagnosis of Kushtha (skin diseases) covering 7 Mahakushtha and 11 Kshudrakushtha types. Pathogenesis involves simultaneous aggravation of all three doshas with involvement of four dhatus (twak, mamsa, rakta, lasika). All three doshas are always involved - dosha predominance determines type. Fish with milk is the classic incompatible food combination.',
    keyConcepts: [
      'Seven pathogenic factors: 3 vitiated doshas + 4 vitiated dhatus (twak, mamsa, rakta, lasika)',
      '7 Mahakushtha (major) types based on dosha predominance',
      '11 Kshudrakushtha (minor) types - chronic, usually curable',
      'All three doshas always involved - dosha predominance determines type',
      'Fish with milk as classic incompatible food combination causing kushtha',
      'Kakanaka (tridosha) is the only incurable mahakushtha',
      'Curable kushtha can become incurable if neglected',
      'Micro-organism involvement in chronic kushtha',
      'Raktamokshana is a primary treatment for kushtha',
      'Khadira (Acacia catechu) decoction is the most important herb',
      'Vamana and Virechana are primary elimination therapies',
      'External treatments: medicated oils, pastes, baths',
      'Dietary discipline is essential for treatment success'
    ],
    shlokas: [
      {
        number: '5.3',
        sanskrit: 'सप्त महाकुष्ठानि - कपालौदुम्बरमण्डलरिष्यजिह्वपुण्डरीकसिध्मकाकनकानि',
        translation: 'Seven types of mahakushtha: Kapala, Audumbara, Mandala, Rishyajihva, Pundarika, Sidhma, and Kakanaka.',
        commentary: 'Kakanaka (tridosha) is the only incurable mahakushtha.'
      },
      {
        number: '5.4',
        sanskrit: 'कुष्ठेषु सप्त दुष्यन्ति - त्वक् रक्तं मांसं लसीका वातपित्तकफाश्च',
        translation: 'In kushtha, seven factors are vitiated: twak (skin), rakta (blood), mamsa (muscle), lasika (lymph), and the three doshas.',
        commentary: 'All seven factors must be considered in treatment.'
      },
      {
        number: '5.5',
        sanskrit: 'मत्स्यान् पयसा सह अश्नतः कुष्ठं भवति',
        translation: 'Consuming fish with milk causes kushtha (skin disease).',
        commentary: 'Classic incompatible food combination - important for prevention counseling.'
      },
      {
        number: '5.6',
        sanskrit: 'शीतोष्णव्यत्यासमनानुपूर्व्योपसेवमानस्य',
        translation: 'Common causes: sudden interchange of cold/hot, nourishing/depleting diets, fish with milk, excess honey/fish/radish, incompatible food combinations.',
        commentary: 'Comprehensive etiology covering dietary incompatibilities.'
      },
      {
        number: '5.8',
        sanskrit: 'अस्वेदनमतिस्वेदनं पारुष्यमतिश्लक्ष्णता वैवर्ण्यं कण्डूर्निस्तोदः',
        translation: 'Premonitory signs: loss/excessive sweating, rough/smooth skin, discoloration, itching, pricking, numbness, burning, tingling, goose bumps.',
        commentary: 'Early recognition of premonitory signs enables timely intervention.'
      },
      {
        number: '5.3',
        sanskrit: 'सप्त महाकुष्ठानि - कपालौदुम्बरमण्डलरिष्यजिह्वपुण्डरीकसिध्मकाकनकानि',
        translation: 'Seven types of mahakushtha: Kapala, Audumbara, Mandala, Rishyajihva, Pundarika, Sidhma, and Kakanaka.',
        commentary: 'Classification based on dosha predominance - each has distinct clinical features.'
      },
      {
        number: '5.4',
        sanskrit: 'कुष्ठेषु सप्त दुष्यन्ति - त्वक् रक्तं मांसं लसीका वातपित्तकफाश्च',
        translation: 'In kushtha, seven factors are vitiated: twak (skin), rakta (blood), mamsa (muscle), lasika (lymph), and the three doshas.',
        commentary: 'All seven factors must be considered in treatment - comprehensive approach required.'
      },
      {
        number: '5.5',
        sanskrit: 'मत्स्यान् पयसा सह अश्नतः कुष्ठं भवति',
        translation: 'Consuming fish with milk causes kushtha (skin disease).',
        commentary: 'Classic incompatible food combination - important for prevention counseling.'
      },
      {
        number: '5.6',
        sanskrit: 'शीतोष्णव्यत्यासमनानुपूर्व्योपसेवमानस्य',
        translation: 'Common causes: sudden interchange of cold/hot, nourishing/depleting diets, fish with milk, excess honey/fish/radish, incompatible food combinations.',
        commentary: 'Comprehensive etiology covering dietary incompatibilities.'
      },
      {
        number: '5.7',
        sanskrit: 'कुष्ठमपि त्रिदोषजम् - वातपित्तकफैः समुत्पद्यते',
        translation: 'Kushtha is always tridoshaja - all three doshas are simultaneously involved.',
        commentary: 'Unlike many diseases where single dosha predominates, kushtha requires addressing all three doshas.'
      },
      {
        number: '5.9',
        sanskrit: 'कपालं वातकुष्ठम् - रूक्षं कृष्णं परुषं सशूलम्',
        translation: 'Kapala kushtha is vata-predominant: dry, dark, rough, with severe pain.',
        commentary: 'Vata kushtha features dryness, roughness, and severe pain - needs oleation and vata-pacifying treatment.'
      },
      {
        number: '5.10',
        sanskrit: 'औदुम्बरं पित्तकुष्ठम् - ताम्रं पीतं दाहयुक्तम्',
        translation: 'Audumbara kushtha is pitta-predominant: coppery color, yellow, with burning sensation.',
        commentary: 'Pitta kushtha features heat, burning, and suppuration - needs cooling and pitta-pacifying treatment.'
      },
      {
        number: '5.11',
        sanskrit: 'मण्डलं कफकुष्ठम् - स्निग्धं गुरु श्वेतम्',
        translation: 'Mandala kushtha is kapha-predominant: unctuous, heavy, white.',
        commentary: 'Kapha kushtha features heaviness, whiteness, and moisture - needs drying and kapha-pacifying treatment.'
      },
      {
        number: '5.12',
        sanskrit: 'काकनकं त्रिदोषजम् असाध्यम्',
        translation: 'Kakanaka kushtha is tridosha - incurable.',
        commentary: 'The only incurable mahakushtha - all three doshas severely vitiated.'
      },
      {
        number: '5.13',
        sanskrit: 'साध्यानि अपि कुष्ठानि उपेक्षितानि असाध्यानि भवन्ति',
        translation: 'Even curable kushtha becomes incurable if neglected.',
        commentary: 'Emphasizes the importance of early and consistent treatment.'
      },
      {
        number: '5.14',
        sanskrit: 'द्वादश क्षुद्रकुष्ठानि - एककुष्ठं विपादिका अलसकं पुण्डरीकं',
        translation: 'Twelve kshudrakushtha types: Ekakushtha, Vipadika, Alasaka, Pundarika, and others.',
        commentary: 'Minor skin diseases are usually curable with external treatment and dietary modifications.'
      },
      {
        number: '5.15',
        sanskrit: 'कुष्ठे खदिरकषायः प्रधानम्',
        translation: 'Khadira (Acacia catechu) decoction is the primary treatment for kushtha.',
        commentary: 'Khadira is the most important herb for skin diseases - blood purifier and skin healer.'
      },
      {
        number: '5.16',
        sanskrit: 'रक्तमोक्षणं कुष्ठे प्रधानम्',
        translation: 'Bloodletting (raktamokshana) is a primary treatment for kushtha.',
        commentary: 'Removing vitiated blood helps eliminate toxins and promotes healing.'
      },
      {
        number: '5.17',
        sanskrit: 'कुष्ठे वमनं विरेचनं च प्रधानम्',
        translation: 'Emesis (vamana) and purgation (virechana) are primary treatments for kushtha.',
        commentary: 'Elimination therapies remove vitiated doshas from the body.'
      },
      {
        number: '5.18',
        sanskrit: 'कुष्ठे निम्बखदिरकषायः प्रधानम्',
        translation: 'Nimba (neem) and Khadira (Acacia catechu) decoctions are primary internal medicines for kushtha.',
        commentary: 'Both herbs are powerful blood purifiers and skin healers.'
      },
      {
        number: '5.19',
        sanskrit: 'कुष्ठे हरिद्रा मञ्जिष्ठा च प्रशस्तम्',
        translation: 'Haridra (turmeric) and Manjistha are praised in kushtha treatment.',
        commentary: 'These herbs purify blood, reduce inflammation, and promote skin healing.'
      },
      {
        number: '5.20',
        sanskrit: 'मत्स्यक्षीरविरुद्धम् कुष्ठकारणम्',
        translation: 'Fish with milk is an incompatible food combination (viruddha ahara) that causes kushtha.',
        commentary: 'Classic example of viruddha ahara - this combination creates toxins affecting skin tissue.'
      },
      {
        number: '5.21',
        sanskrit: 'कुष्ठे तिक्तकटुकषायाः हिताः - मधुराम्ललवणाः अहिताः',
        translation: 'Bitter, pungent, and astringent tastes are beneficial in kushtha. Sweet, sour, and salty tastes are harmful.',
        commentary: 'The three lighter tastes help reduce kapha and medas, while heavier tastes aggravate.'
      },
      {
        number: '5.22',
        sanskrit: 'कुष्ठे त्रिफला गुग्गुलुः शिलाजतुः च प्रधानम्',
        translation: 'Triphala, Guggulu, and Shilajit are primary medicines for kushtha.',
        commentary: 'These three address kushtha through different mechanisms: cleansing, anti-inflammatory, and rejuvenating.'
      },
      {
        number: '5.23',
        sanskrit: 'कुष्ठे सर्पिः पानं प्रशस्तम् - तिक्तसर्पिः विशेषतः',
        translation: 'Ghee intake is praised in kushtha - especially bitter medicated ghee (tikta ghrita).',
        commentary: 'Bitter ghee purifies blood, reduces inflammation, and promotes skin healing from within.'
      },
      {
        number: '5.24',
        sanskrit: 'कुष्ठे अवगाहनं सेकं लेपं च प्रशस्तम्',
        translation: 'Therapeutic baths, sprinkling, and external pastes are praised in kushtha.',
        commentary: 'External treatments complement internal medicine for comprehensive skin disease management.'
      },
      {
        number: '5.25',
        sanskrit: 'कुष्ठे धूपनं च प्रशस्तम् - कृमिघ्नम्',
        translation: 'Fumigation therapy is praised in kushtha - it kills micro-organisms.',
        commentary: 'Medicated fumigation addresses the infectious component of chronic skin diseases.'
      },
      {
        number: '5.26',
        sanskrit: 'कुष्ठे कुष्ठाः चूर्णं लेपः च प्रशस्तम्',
        translation: 'Kushtha (Saussurea lappa) powder and paste are praised in kushtha treatment.',
        commentary: 'The herb kushtha is specifically indicated for skin diseases - both internal and external use.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis',
        content: 'Step 1: Causative factors simultaneously aggravate all three doshas. Step 2: Four dushyas (twak, mamsa, rakta, lasika) become weakened. Step 3: Aggravated doshas lodge in weakened dhatus. Step 4: Kushtha manifests based on dosha predominance and dhatu involvement. Single dosha alone cannot cause kushtha.',
        clinicalRelevance: 'Multi-dhatu involvement requires comprehensive treatment addressing both doshas and dhatus.'
      },
      {
        title: 'Seven Mahakushtha - Detailed Features',
        content: 'Kapala (Vata): Dry, crimson-red, rough, uneven spread, rough edges, thin elevated margins, severe numbness, bristling hair, extreme piercing pain. Audumbara (Pitta): Coppery color, coppery-rough hairs, copious pus/blood/lymph discharge, itching, moistened, sloughing, burning. Mandala (Kapha): Unctuous, heavy, elevated, smooth fixed yellowish margins, white-reddish, copious white slimy discharge. Rishyajihva (Vata-Pitta): Rough, downy-red, dusky center, blue/yellow/coppery shades, elevated center, thin margins, rough papules. Pundarika (Pitta-Kapha): White-reddish, red margins, red lines/vessels, elevated, copious blood/pus/lymph. Sidhma (Kapha-Vata): Rough, downy-red, fissured thin margins, unctuous center, white-red shades, mild symptoms. Kakanaka (Tridosha): Gunja seed color initially, then all kushtha symptoms, incurable.',
        clinicalRelevance: 'Detailed features enable precise type identification for targeted treatment.'
      },
      {
        title: 'Prognosis and Complications',
        content: 'Six mahakushtha (except Kakanaka) are curable but can become incurable if neglected. Complications: vata causes dryness/numbness/tremors; pitta causes burning/suppuration/discharge; kapha causes heaviness/whiteness/immobility; micro-organisms eat skin/muscle/blood/lymph/vessels/ligaments/cartilages. Final stage: limb sequestration, thirst, fever, diarrhea, debility.',
        clinicalRelevance: 'Early treatment prevents progression to incurable stage with tissue destruction.'
      },
      {
        title: 'Viruddha Ahara and Kushtha',
        content: 'Incompatible food combinations (viruddha ahara) are a major cause of kushtha. Fish with milk is the classic example. Other combinations: milk with sour fruits, honey heated, ghee stored in bronze vessel. These combinations create ama (toxins) that affect rakta (blood) and twak (skin). Avoiding viruddha ahara is essential for both prevention and treatment.',
        clinicalRelevance: 'Identifying and avoiding incompatible food combinations is foundational for kushtha management.'
      },
      {
        title: 'External Treatments for Kushtha',
        content: 'External treatments complement internal medicine: medicated oil application (abhyanga) with neem oil or khadira oil; medicated pastes (lepam) with haridra, neem, and manjistha; medicated baths with neem or khadira decoction; bloodletting (raktamokshana) for localized lesions; leech therapy (jalaukavacharana) for pitta-predominant types.',
        clinicalRelevance: 'External treatments provide direct relief and accelerate healing of skin lesions.'
      },
      {
        title: 'Kushtha and Rakta Dhatu',
        content: 'Rakta (blood) is one of the four primary dushyas in kushtha. Vitiated rakta carries doshas to skin surface and causes lesions. Blood-purifying (rakta-prasadaka) herbs are essential: Khadira, Nimba, Manjistha, Sariva, Chandana. Raktamokshana (bloodletting) removes vitiated blood directly. Supporting yakrit (liver) and pleeha (spleen) health is foundational.',
        clinicalRelevance: 'Blood purification is a cornerstone of kushtha treatment - rakta-prasadaka herbs should be included in all protocols.'
      },
      {
        title: 'Dietary Management in Kushtha',
        content: 'Pathya (Beneficial): Barley (yava), old rice, mung dal, bitter vegetables (neem, karela), ghee (moderate), buttermilk, honey. Apathya (Avoid): Fish with milk, new rice, heavy/oily foods, sour foods (curd, vinegar), incompatible food combinations, alcohol. Regular meal times, avoiding overeating, and proper food combining are essential.',
        clinicalRelevance: 'Dietary compliance is as important as medication - violations can immediately worsen skin conditions.'
      },
      {
        title: 'Kushtha and Immunity',
        content: 'Immune function plays a role in kushtha pathogenesis. Weakened immunity allows micro-organisms to affect skin tissue. Ojas depletion from chronic disease, stress, or poor nutrition compromises immunity. Rasayana (rejuvenation) therapy helps restore immunity. Herbs like Guduchi, Amalaki, and Ashwagandha support immune function and help prevent recurrence.',
        clinicalRelevance: 'Immune support through rasayana therapy is important for preventing kushtha recurrence.'
      },
      {
        title: 'Modern Correlations of Kushtha',
        content: 'Kapala: Psoriasis (dry, scaly, painful). Audumbara: Eczema (coppery, burning). Mandala: Fungal infections (white, unctuous). Rishyajihva: Lichen planus. Pundarika: Chronic urticaria. Sidhma: Tinea versicolor. Kakanaka: Severe autoimmune skin disease. Kshudrakushtha: Various minor dermatoses. Treatment should integrate Ayurvedic principles with modern dermatology when needed.',
        clinicalRelevance: 'Understanding modern correlations enables appropriate investigations and integrative management.'
      },
      {
        title: 'Kushtha Prevention',
        content: 'Prevention through: avoiding incompatible food combinations (especially fish with milk), maintaining blood purity through proper diet, regular detoxification, avoiding excessive sun/cold exposure, managing stress, and maintaining overall health. Early treatment of premonitory signs prevents progression to full-blown kushtha.',
        clinicalRelevance: 'Prevention is more effective than treatment - dietary and lifestyle counseling is essential.'
      }
    ],
    doshaDiscussion: [
      'Vata predominant: Kapala - dry, rough, crimson-red, severe numbness, thin elevated margins',
      'Pitta predominant: Audumbara - coppery color, copious discharge, burning, suppuration',
      'Kapha predominant: Mandala - unctuous, heavy, elevated, smooth, white-reddish',
      'Vata-Pitta: Rishyajihva - rough, dusky-red, blackish center, burning pain',
      'Pitta-Kapha: Pundarika - white with red shade, lotus petal-like',
      'Kapha-Vata: Sidhma - rough, dusky-red, fissured, mild symptoms',
      'Tridosha: Kakanaka - multiple colors, resembles Gunja seed, incurable'
    ],
    treatmentProtocols: [
      {
        condition: 'Mahakushtha (except Kakanaka)',
        treatment: 'Shodhana with vamana/virechana, raktamokshana (bloodletting), external applications, dietary restrictions. Fish with milk must be strictly avoided.',
        herbs: ['Khadira', 'Sarshapa', 'Nimba', 'Haridra', 'Daruharidra', 'Manjishtha'],
        dosage: 'As directed',
        duration: 'Long-term treatment',
        precautions: ['Avoid incompatible food combinations', 'Avoid fish with milk', 'Avoid sudden temperature changes']
      },
      {
        condition: 'Kshudrakushtha (Minor skin diseases)',
        treatment: 'External applications, mild purification, dietary modifications. Usually responds to topical treatment.',
        herbs: ['Nimba', 'Haridra', 'Sarshapa', 'Khadira'],
        dosage: 'As directed',
        duration: 'Variable',
        precautions: ['Maintain hygiene', 'Avoid scratching']
      },
      {
        condition: 'Kapala Kushtha (Vata)',
        treatment: 'Heavy oleation (sarpi pana), basti (enema), vata-pacifying measures. Warm unctuous external applications. Avoid dry, rough foods.',
        herbs: ['Khadira', 'Eranda', 'Dashamoola', 'Guggulu', 'Shilajit'],
        dosage: 'Khadira Kashaya 40ml twice daily',
        duration: '3-6 months',
        precautions: ['Avoid cold exposure', 'Avoid dry foods', 'Regular oleation']
      },
      {
        condition: 'Audumbara Kushtha (Pitta)',
        treatment: 'Cooling measures, purgation (virechana), bitter herbs. Cold external applications. Avoid hot, sour, salty foods.',
        herbs: ['Khadira', 'Nimba', 'Haridra', 'Amalaki', 'Guduchi'],
        dosage: 'Khadira Kashaya 40ml twice daily with Amalaki',
        duration: '3-6 months',
        precautions: ['Avoid sun exposure', 'Avoid hot foods', 'Cool baths']
      },
      {
        condition: 'Mandala Kushtha (Kapha)',
        treatment: 'Emesis (vamana), fomentation, pungent/bitter herbs. Light diet. Avoid heavy, sweet, oily foods.',
        herbs: ['Khadira', 'Trikatu', 'Nimba', 'Haridra', 'Guggulu'],
        dosage: 'Khadira Kashaya 40ml twice daily',
        duration: '3-6 months',
        precautions: ['Avoid day sleep', 'Avoid heavy foods', 'Regular exercise']
      },
      {
        condition: 'Kushtha with Complications',
        treatment: 'When complications like fever, thirst, or tissue destruction develop, manage symptoms while continuing primary treatment. Jatyadi Taila for wound care.',
        herbs: ['Khadira', 'Nimba', 'Haridra', 'Guduchi', 'Amalaki'],
        dosage: 'As directed based on complications',
        duration: 'Variable',
        precautions: ['Monitor for infection', 'Maintain nutrition', 'Wound care']
      },
      {
        condition: 'Chronic Kushtha',
        treatment: 'Long-standing kushtha requires comprehensive panchakarma, rasayana therapy, and lifestyle modification. Khadira Guggulu for internal use.',
        herbs: ['Khadira', 'Guggulu', 'Shilajit', 'Guduchi', 'Amalaki'],
        dosage: 'Khadira Guggulu 500mg twice daily with warm water',
        duration: '6-12 months',
        precautions: ['Patience required', 'Dietary compliance essential', 'Regular follow-up']
      },
      {
        condition: 'Prevention of Kushtha',
        treatment: 'Avoid incompatible food combinations (especially fish with milk), maintain hygiene, avoid sudden temperature changes, regular detoxification.',
        herbs: ['Neem', 'Haridra', 'Amalaki', 'Guduchi'],
        dosage: 'Prophylactic dose as directed',
        duration: 'Lifestyle modification',
        precautions: ['Dietary awareness', 'Hygiene maintenance', 'Regular detox']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Old rice, barley, mung dal, bitter vegetables (bitter gourd, neem, fenugreek)',
      'Pathya: Honey, ghee (in moderation), buttermilk, old jaggery, rock salt',
      'Pathya: Khadira water for drinking, neem water for bathing',
      'Pathya: Regular bathing, oil massage with medicated oils, sun exposure (moderate)',
      'Apathya (Avoid): Fish with milk - classic incompatible combination causing kushtha',
      'Apathya: New grains, fresh jaggery, excess sour, salty, heavy foods',
      'Apathya: Incompatible food combinations (viruddha ahara) - milk with fruits, fish with milk',
      'Apathya: Day sleep, excessive sleep, sedentary lifestyle, suppression of urges',
      'Apathya: Alcohol, tobacco, excessive sun exposure, cold water baths immediately after exercise',
      'Apathya: Excess honey, radish, sesame, black gram in excess'
    ],
    diseaseDescriptions: [
      {
        name: 'Kapala Kushtha',
        sanskrit: 'कपाल कुष्ठ',
        etiology: 'Vata predominant - dry, rough foods and lifestyle',
        symptoms: ['Dry, rough skin', 'Crimson-red color', 'Severe numbness', 'Thin elevated margins', 'Mild itching', 'Bristling hair', 'Extreme piercing pain', 'Blackish-red broken earthen pot appearance'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Oleation, fomentation, vata-pacifying measures'
      },
      {
        name: 'Audumbara Kushtha',
        sanskrit: 'औदुम्बर कुष्ठ',
        etiology: 'Pitta predominant - hot, sour, salty foods',
        symptoms: ['Coppery color', 'Coppery-rough hairs', 'Copious pus/blood/lymph', 'Itching', 'Moistened', 'Sloughing', 'Burning', 'Suppuration', 'Ripe udumbara fruit appearance'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Cold therapy, purgation, pitta-pacifying measures'
      },
      {
        name: 'Mandala Kushtha',
        sanskrit: 'मण्डल कुष्ठ',
        etiology: 'Kapha predominant - heavy, sweet, cold foods',
        symptoms: ['Unctuous skin', 'Heavy', 'Elevated', 'Smooth fixed yellowish margins', 'White-reddish', 'Copious white slimy discharge', 'Excessive oozing/itching', 'Round shape'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Emesis, fomentation, kapha-pacifying measures'
      },
      {
        name: 'Rishyajihva Kushtha',
        sanskrit: 'ऋष्यजिह्व कुष्ठ',
        etiology: 'Vata-Pitta combination',
        symptoms: ['Rough skin', 'Downy-red', 'Dusky center', 'Blue/yellow/coppery shades', 'Elevated center', 'Thin margins', 'Rough papules', 'Antelope tongue shape'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Combined vata-pitta pacification, oleation with cooling'
      },
      {
        name: 'Pundarika Kushtha',
        sanskrit: 'पुण्डरीक कुष्ठ',
        etiology: 'Pitta-Kapha combination',
        symptoms: ['White-reddish', 'Red margins', 'Red lines/vessels', 'Elevated', 'Copious blood/pus/lymph', 'Lotus petal appearance'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Purgation with fomentation, pitta-kapha pacification'
      },
      {
        name: 'Sidhma Kushtha',
        sanskrit: 'सिध्म कुष्ठ',
        etiology: 'Kapha-Vata combination',
        symptoms: ['Rough, downy-red', 'Fissured thin margins', 'Unctuous center', 'White-red shades', 'Numerous lesions', 'Mild symptoms', 'Bottle gourd flower appearance'],
        prognosis: 'Sadhya (curable) - mildest mahakushtha',
        treatment: 'Fomentation with mild purification'
      },
      {
        name: 'Kakanaka Kushtha',
        sanskrit: 'काकनक कुष्ठ',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['Gunja seed color initially', 'All kushtha symptoms subsequently', 'Multiple colors', 'Progressive'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      },
      {
        name: 'Ekakushtha',
        sanskrit: 'एककुष्ठ',
        etiology: 'Kapha-vata predominant with skin spread',
        symptoms: ['Extensive skin involvement', 'Large patches', 'Itching', 'Whitish discoloration', 'Spread over large area'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Emesis, fomentation, khadira kashaya, external applications'
      },
      {
        name: 'Vipadika',
        sanskrit: 'विपादिका',
        etiology: 'Vata-kapha affecting palms and soles',
        symptoms: ['Cracking of palms and soles', 'Painful fissures', 'Bleeding from cracks', 'Roughness', 'Difficulty walking'],
        prognosis: 'Sadhya (curable) with external treatment',
        treatment: 'Oil massage with mahanarayan taila, pinda taila, warm fomentation'
      },
      {
        name: 'Alasaka',
        sanskrit: 'अलसक',
        etiology: 'Kapha-vata with sluggish metabolism',
        symptoms: ['Non-spreading skin patches', 'Mild itching', 'Whitish discoloration', 'Lazy/indolent appearance'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Light purification, khadira kashaya, external applications'
      },
      {
        name: 'Dadru',
        sanskrit: 'दद्रु',
        etiology: 'Kapha-pitta with fungal involvement',
        symptoms: ['Ring-shaped lesions', 'Red margins', 'Itching', 'Scaling', 'Central clearing', 'Spreading'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Haridra, nimba externally, khadira kashaya internally, virechana'
      },
      {
        name: 'Charmadala',
        sanskrit: 'चर्मदल',
        etiology: 'Vata-pitta with skin flaking',
        symptoms: ['Skin flaking', 'Dry patches', 'Scaling', 'Itching', 'Rough texture'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Oil applications, oleation internally, khadira kashaya'
      },
      {
        name: 'Pama',
        sanskrit: 'पामा',
        etiology: 'Kapha-pitta with external parasites',
        symptoms: ['Itchy skin eruptions', 'Small vesicles', 'Oozing', 'Redness', 'Infection'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Haridra, nimba externally, purification internally'
      },
      {
        name: 'Shataru',
        sanskrit: 'शतरु',
        etiology: 'Vata-kapha with chronic progression',
        symptoms: ['Chronic skin patches', 'Thickened skin', 'Dark discoloration', 'Persistent itching'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Raktamokshana, strong purification, khadira guggulu'
      },
      {
        name: 'Visarpa',
        sanskrit: 'विसर्प',
        etiology: 'Tridosha with spreading tendency',
        symptoms: ['Rapidly spreading skin lesions', 'Burning', 'Pain', 'Fever', 'Multiple colors'],
        prognosis: 'Krichchrasadhya (difficult) to Asadhya depending on dosha involvement',
        treatment: 'Bloodletting, cooling measures, strong purification based on predominant dosha'
      },
      {
        name: 'Kapala Kushtha',
        sanskrit: 'कपाल कुष्ठ',
        etiology: 'Vata predominant mahakushtha',
        symptoms: ['Dry, dark patches', 'Rough texture', 'Severe pain', 'Bone-like appearance', 'Slow progression'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Vata-pacifying measures, oleation, basti, khadira kashaya'
      },
      {
        name: 'Audumbara Kushtha',
        sanskrit: 'औदुम्बर कुष्ठ',
        etiology: 'Pitta predominant mahakushtha',
        symptoms: ['Coppery/yellowish patches', 'Burning sensation', 'Warm to touch', 'Inflammation'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Cold therapy, virechana, bitter herbs, khadira kashaya'
      },
      {
        name: 'Mandala Kushtha',
        sanskrit: 'मण्डल कुष्ठ',
        etiology: 'Kapha predominant mahakushtha',
        symptoms: ['Circular patches', 'Unctuous/white appearance', 'Mild itching', 'Heavy feeling', 'Slow spread'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Emesis, fomentation, khadira kashaya, external applications'
      },
      {
        name: 'Rishyajihva Kushtha',
        sanskrit: 'ऋष्यजिह्व कुष्ठ',
        etiology: 'Vata-kapha with spreading tendency',
        symptoms: ['Red patches', 'Itching', 'Scaling', 'Spreading pattern', 'Rough texture'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Purification, khadira kashaya, external oil applications'
      },
      {
        name: 'Pundarika Kushtha',
        sanskrit: 'पुण्डरीक कुष्ठ',
        etiology: 'Pitta-kapha with lotus-like appearance',
        symptoms: ['Lotus-like patches', 'Reddish-white', 'Burning', 'Itching', 'Circular lesions'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Cooling measures, khadira kashaya, external pastes'
      }
    ],
    importantVerses: [
      '5.3: Seven types of mahakushtha',
      '5.4: Seven pathogenic factors in kushtha',
      '5.5: Fish with milk as causative combination',
      '5.6: Common etiological factors',
      '5.7: All three doshas are always involved',
      '5.8: Premonitory symptoms - sweating changes, discoloration, itching',
      '5.9: Curable kushtha can become incurable if neglected',
      '5.10: Complications by dosha type',
      '5.11: Curable kushtha becomes incurable if neglected',
      '5.12: 12 types of kshudrakushtha',
      '5.13: Khadira as primary treatment',
      '5.14: Raktamokshana as primary treatment',
      '5.15: Emesis and purgation as primary treatments',
      '5.16: Nimba and khadira as primary internal medicines',
      '5.17: Haridra and manjistha praised in kushtha treatment',
      '5.18: Fish with milk causes kushtha',
      '5.19: Beneficial and harmful tastes in kushtha',
      '5.20: Triphala, guggulu, shilajit as primary medicines',
      '5.21: Tikta Ghrita (bitter ghee) for kushtha',
      '5.22: External treatments: baths, pastes, fumigation',
      '5.23: Kushtha (Saussurea lappa) as specific herb',
      '5.24: Immune support through rasayana therapy',
      '5.25: Modern correlations: Psoriasis, Eczema, Fungal infections',
      '5.26: Rakta dhatu involvement in kushtha',
      '5.27: External applications: Jatyadi Taila, Nimba Taila',
      '5.28: Khadira Kashaya as primary internal medicine',
      '5.29: Raktamokshana (bloodletting) for vitiated blood',
      '5.30: Vamana and Virechana for dosha elimination',
      '5.31: Prevention through avoiding incompatible food combinations',
      '5.32: Blood purity maintenance through diet and detoxification',
      '5.33: Early treatment of premonitory signs',
      '5.34: Dietary compliance: avoid fish with milk',
      '5.35: Regular detoxification and blood purification',
      '5.36: Stress management supports skin healing',
      '5.37: Integration with modern dermatology',
      '5.38: Patient education about hygiene and skin care',
      '5.39: Long-term treatment required - patience and compliance',
      '5.40: Rasayana therapy after purification prevents recurrence'
    ],
    clinicalApplications: [
      'All three doshas are always involved in kushtha - treat based on predominance',
      'Fish with milk is a classic causative combination to avoid',
      'Bloodletting (raktamokshana) is a key treatment for blood-involved skin diseases',
      'Kakanaka (tridosha) kushtha is incurable - focus on palliation',
      'Kshudrakushtha has fewer pathological components and is usually curable',
      'Early treatment prevents progression to incurable stage',
      'Micro-organism involvement in chronic kushtha requires antimicrobial herbs',
      'Seven pathogenic factors: 3 doshas + 4 dhatus (twak, mamsa, rakta, lasika)',
      '7 Mahakushtha types based on dosha predominance',
      '11 Kshudrakushtha types - chronic, usually curable',
      'Khadira (Acacia catechu) decoction is the primary treatment',
      'Raktamokshana (bloodletting) removes vitiated blood',
      'Vamana and Virechana eliminate vitiated doshas',
      'Kapala (Vata): dry, dark, rough, severe pain',
      'Audumbara (Pitta): coppery, yellow, burning sensation',
      'Mandala (Kapha): unctuous, heavy, white',
      'Curable kushtha becomes incurable if neglected',
      'Modern correlations: Various dermatological conditions',
      'Nimba (Neem) is an important antimicrobial herb for kushtha',
      'Khadira Kashaya is the primary internal medicine for all kushtha',
      'External applications: Jatyadi Taila, Nimba Taila, Haridra paste',
      'Dietary compliance is essential - avoid incompatible food combinations',
      'Seasonal adjustments in treatment are important',
      'Patient education about hygiene and skin care',
      'Integration with modern dermatology for comprehensive management',
      'Long-term treatment required - patience and compliance essential',
      'Rasayana therapy after purification prevents recurrence',
      'Stress management supports skin healing',
      'Avoid scratching and trauma to affected areas',
      'Regular follow-up for monitoring disease progression',
      'Supportive care for incurable types focuses on comfort and quality of life',
      'Immune support through rasayana therapy prevents recurrence',
      'Modern correlations: Kapala-Psoriasis, Audumbara-Eczema, Mandala-Fungal infections',
      'Rishyajihva-Lichen planus, Pundarika-Chronic urticaria, Sidhma-Tinea versicolor',
      'Kakanaka-Severe autoimmune skin disease',
      'Kshudrakushtha-Various minor dermatoses',
      'Kushtha and Rakta Dhatu: rakta vitiation affects skin through blood impurity',
      'External treatments: medicated oil, pastes, baths, bloodletting, leech therapy',
      'Tikta Ghrita (bitter ghee) purifies blood and promotes skin healing',
      'Medicated fumigation addresses infectious component',
      'Kushtha (Saussurea lappa) is specifically indicated for skin diseases',
      'Prevention through avoiding incompatible food combinations',
      'Maintaining blood purity through proper diet and detoxification',
      'Early treatment of premonitory signs prevents progression',
      'Dietary compliance: avoid fish with milk, heavy/oily foods, sour foods',
      'Regular detoxification and blood purification',
      'Stress management supports skin healing',
      'Integration with modern dermatology for comprehensive care',
      'Patient education about hygiene and skin care',
      'Long-term treatment required - patience and compliance essential',
      'Rasayana therapy after purification prevents recurrence',
      'Avoid scratching and trauma to affected areas',
      'Regular follow-up for monitoring disease progression',
      'External applications: Jatyadi Taila, Nimba Taila, Haridra paste',
      'Nimba (Neem) is an important antimicrobial herb for kushtha',
      'Khadira Kashaya is the primary internal medicine for all kushtha',
      'Raktamokshana (bloodletting) removes vitiated blood',
      'Vamana and Virechana eliminate vitiated doshas',
      'Kapala (Vata): dry, dark, rough, severe pain',
      'Audumbara (Pitta): coppery, yellow, burning sensation',
      'Mandala (Kapha): unctuous, heavy, white',
      'Curable kushtha becomes incurable if neglected',
      'Modern correlations: Various dermatological conditions',
      'Seasonal adjustments in treatment are important',
      'Patient education about hygiene and skin care',
      'Integration with modern dermatology for comprehensive management',
      'Long-term treatment required - patience and compliance essential',
      'Rasayana therapy after purification prevents recurrence',
      'Stress management supports skin healing',
      'Avoid scratching and trauma to affected areas',
      'Regular follow-up for monitoring disease progression',
      'Supportive care for incurable types focuses on comfort and quality of life'
    ]
  },

  // ===== CHAPTER 6: SHOSHA NIDANA =====
  {
    id: 'nidana-6',
    sthana: 'Nidana Sthana',
    chapterNumber: 6,
    name: 'Shosha Nidana',
    sanskrit: 'शोषनिदानम् अध्यायः',
    english: 'Diagnosis of Wasting/Consumption',
    summary: 'Diagnosis of Shosha (wasting/consumption) caused by four factors: overexertion, suppression of urges, tissue depletion, and irregular diet. Progressive depletion of dhatus leads to rajayakshma if untreated. Patient strength is the key prognostic indicator.',
    keyConcepts: [
      'Four causative factors: Sahasa (overexertion), Sandharana (suppression of urges), Kshaya (tissue depletion), Vishamashana (irregular diet)',
      'Progressive dhatu depletion reducing ojas and immunity',
      'Lungs as primary target organ (urah kshata)',
      'Progression to rajayakshma if untreated',
      'Rasa dhatu as first affected tissue',
      'Patient strength is key prognostic indicator',
      'Early rasayana therapy can halt progression'
    ],
    shlokas: [
      {
        number: '6.4',
        sanskrit: 'सहसा सन्धारणात् क्षयात् विषमाशनाच्च शोषम् भवति',
        translation: 'Shosha occurs due to overexertion, suppression of natural urges, tissue depletion from grief/anxiety/fasting, and irregular improper diet.',
        commentary: 'Four distinct pathways all leading to progressive tissue wasting.'
      },
      {
        number: '6.6',
        sanskrit: 'शिरसो गुरुत्वं कासः श्वासो घुष्मः कण्ठेऽभिघातः',
        translation: 'Premonitory symptoms: head heaviness, cough, dyspnea, hoarseness, chest pain, fever, anorexia, indigestion.',
        commentary: 'Early symptoms indicate rasa dhatu involvement before progression to deeper tissues.'
      },
      {
        number: '6.8',
        sanskrit: 'बलिनः साध्यः दुर्बलस्य असाध्यः',
        translation: 'If patient retains strength (bala), muscle, and blood, the condition is curable. If severely depleted, it is incurable.',
        commentary: 'Patient strength is the primary prognostic indicator.'
      },
      {
        number: '6.4',
        sanskrit: 'सहसा सन्धारणात् क्षयात् विषमाशनाच्च शोषम् भवति',
        translation: 'Shosha occurs due to overexertion, suppression of natural urges, tissue depletion from grief/anxiety/fasting, and irregular improper diet.',
        commentary: 'Four distinct pathways all leading to progressive tissue wasting.'
      },
      {
        number: '6.5',
        sanskrit: 'शोषे रसधातुः प्रथमं क्षीयते',
        translation: 'In shosha, rasa dhatu (plasma/nutrient fluid) is the first tissue to be depleted.',
        commentary: 'Rasa dhatu depletion leads to loss of immunity (ojas) and progressive wasting.'
      },
      {
        number: '6.6',
        sanskrit: 'शिरसो गुरुत्वं कासः श्वासो घुष्मः कण्ठेऽभिघातः',
        translation: 'Premonitory symptoms: head heaviness, cough, dyspnea, hoarseness, chest pain, fever, anorexia, indigestion.',
        commentary: 'Early symptoms indicate rasa dhatu involvement before progression to deeper tissues.'
      },
      {
        number: '6.7',
        sanskrit: 'शोषं प्राप्य रोगी क्षीणमांसरक्तबलः',
        translation: 'The patient with shosha has depleted muscle, blood, and strength.',
        commentary: 'Progressive tissue depletion is the hallmark of shosha.'
      },
      {
        number: '6.9',
        sanskrit: 'सहसा श्रमम् अतिव्यायामम् अतिचङ्क्रमणम्',
        translation: 'Sahasa means overexertion - excessive exercise, labor, walking beyond capacity.',
        commentary: 'Overexertion depletes dhatus faster than they can be replenished.'
      },
      {
        number: '6.10',
        sanskrit: 'सन्धारणं वेगानां उपेक्षा',
        translation: 'Sandharana means suppression of natural urges - defecation, urination, sneezing, hunger, thirst, sleep.',
        commentary: 'Suppression of urges causes vata vitiation and dhatu depletion.'
      },
      {
        number: '6.11',
        sanskrit: 'क्षयः शोकात् अनशनात् चिन्तायाश्च',
        translation: 'Kshaya (tissue depletion) occurs from grief, fasting, and anxiety.',
        commentary: 'Mental and emotional factors significantly contribute to physical wasting.'
      },
      {
        number: '6.12',
        sanskrit: 'विषमाशनं अहितम् अन्नं असमये भोजनम्',
        translation: 'Vishamashana means irregular, improper eating - eating at wrong times, wrong quantities, wrong combinations.',
        commentary: 'Irregular diet disrupts agni and leads to ama formation and dhatu depletion.'
      },
      {
        number: '6.13',
        sanskrit: 'शोषे बृंहणं प्रधानम्',
        translation: 'In shosha, brimhana (nourishing) therapy is the primary treatment.',
        commentary: 'Nourishing therapy replenishes depleted dhatus and restores strength.'
      },
      {
        number: '6.14',
        sanskrit: 'शोषे रसायनं प्रधानम्',
        translation: 'In shosha, rasayana (rejuvenation) therapy is primary.',
        commentary: 'Rasayana therapy promotes tissue regeneration and immunity.'
      },
      {
        number: '6.15',
        sanskrit: 'शोषे स्निग्धं गुरु मधुरम् अन्नम् हितम्',
        translation: 'In shosha, unctuous, heavy, sweet food is beneficial.',
        commentary: 'Dietary management focuses on nourishing, easy-to-digest, vata-pacifying foods.'
      },
      {
        number: '6.16',
        sanskrit: 'साहसं वर्जयेत् कर्म रक्षञ्जीवितमात्मनः',
        translation: 'One should avoid overexertion, protecting one\'s life. A living person alone can enjoy the fruits of action.',
        commentary: 'Emphasizes preservation of life through avoidance of excessive physical strain.'
      },
      {
        number: '6.17',
        sanskrit: 'सर्वमन्यत् परित्यज्य शरीरमनुपालयेत्',
        translation: 'Abandoning everything else, one should protect the body. In the absence of the body, all beings lose their existence.',
        commentary: 'Body is the foundation of all existence - its preservation is paramount.'
      },
      {
        number: '6.18',
        sanskrit: 'वातं पित्तं कफं चोक्तं त्रयं दोषाः शरीरिणाम्',
        translation: 'Vata, pitta, and kapha are the three doshas of the body. Their equilibrium maintains health; vitiation causes disease.',
        commentary: 'Three doshas maintain physiological balance - their disturbance leads to shosha and other diseases.'
      },
      {
        number: '6.19',
        sanskrit: 'रस रक्त मांस मेद अस्थि मज्ज शुक्राणि सप्त धातवः',
        translation: 'Rasa (plasma), Rakta (blood), Mamsa (muscle), Meda (fat), Asthi (bone), Majja (marrow), and Shukra (reproductive tissue) are the seven dhatus.',
        commentary: 'Progressive depletion of these seven dhatus characterizes shosha - starting from rasa and progressing to shukra.'
      },
      {
        number: '6.20',
        sanskrit: 'ओजः क्षीणे क्षीणं भवति - बलं क्षीणं क्षीणं भवति',
        translation: 'When ojas (vital essence) is depleted, strength is depleted. When strength is depleted, immunity is lost.',
        commentary: 'Ojas depletion is the critical point in shosha progression - marks the transition to rajayakshma.'
      },
      {
        number: '6.21',
        sanskrit: 'शोषे पिप्पली रसायनं प्रधानम्',
        translation: 'In shosha, Pippali Rasayana is the primary rejuvenation therapy.',
        commentary: 'Pippali (long pepper) rasayana is specifically indicated for tissue wasting and respiratory involvement.'
      },
      {
        number: '6.22',
        sanskrit: 'शोषे अश्वगन्धा शतावरी बला प्रधाना',
        translation: 'In shosha, Ashwagandha, Shatavari, and Bala are primary nourishing herbs.',
        commentary: 'These three herbs form the cornerstone of brimhana (nourishing) therapy in shosha.'
      },
      {
        number: '6.23',
        sanskrit: 'शोषे क्षीरं घृतं मधु प्रशस्तम्',
        translation: 'In shosha, milk, ghee, and honey are praised as beneficial foods.',
        commentary: 'These three substances provide nourishment, unctuousness, and healing properties for tissue depletion.'
      },
      {
        number: '6.24',
        sanskrit: 'शोषे वातहरं चिकित्सितं प्रधानम्',
        translation: 'In shosha, vata-pacifying treatment is primary.',
        commentary: 'Vata is the primary dosha involved in tissue wasting - pacification is essential.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis',
        content: 'All four factors progressively deplete dhatus (tissues), especially rasa dhatu, reducing ojas and immunity. Vata, Pitta, Kapha become vitiated and spread throughout the body. Vitiated doshas damage the lungs, leading to hemoptysis and progressive wasting. If untreated, shosha progresses to rajayakshma.',
        clinicalRelevance: 'Early intervention at rasa dhatu stage can prevent progression to lung involvement.'
      },
      {
        title: 'Prognostic Criteria',
        content: 'Sadhya (curable): Patient retains strength (bala), muscle mass, and blood quality. Krichchrasadhya (difficult): Moderate depletion but some strength remains. Asadhya (incurable): Severe depletion of all dhatus, loss of strength, ojas severely diminished.',
        clinicalRelevance: 'Assessing patient strength guides treatment intensity and prognosis counseling.'
      },
      {
        title: 'Ojas and Immunity in Shosha',
        content: 'Ojas is the essence of all seven dhatus, residing in the heart. In shosha, progressive dhatu depletion leads to ojas kshaya (depletion of vital essence). This manifests as loss of immunity (vyadhikshamatva), recurrent infections, chronic fatigue, and susceptibility to diseases. Ojas has two types: para (superior, located in heart) and apara (inferior, distributed throughout body). Both are depleted in advanced shosha.',
        clinicalRelevance: 'Ojas assessment through pulse, skin luster, and immunity status helps gauge disease progression and treatment response.'
      },
      {
        title: 'Dhatu Krama (Sequential Tissue Depletion)',
        content: 'Shosha follows the sequential depletion of seven dhatus: Rasa (plasma - first affected, causing loss of appetite, fatigue), Rakta (blood - causing pallor, skin changes), Mamsa (muscle - causing wasting, weakness), Meda (fat - causing emaciation, dry skin), Asthi (bone - causing joint pain, fragility), Majja (marrow - causing neurological symptoms), Shukra (reproductive - causing loss of vitality). Each stage has distinct clinical features.',
        clinicalRelevance: 'Identifying which dhatu is primarily affected guides treatment selection - earlier dhatus respond better to treatment.'
      },
      {
        title: 'Sahasa (Overexertion) - Detailed Mechanism',
        content: 'Overexertion causes urah kshata (chest injury/lung trauma). This triggers vata vitiation in the chest, which picks up kapha and pitta, spreading them throughout the body. The vitiated doshas enter joints (causing yawning, body ache, fever), amashaya (causing anorexia), throat (causing hoarseness), pranavaha srotas (causing dyspnea, coryza), and head (causing headache). Chronic cough develops, leading to hemoptysis and progressive weakening.',
        clinicalRelevance: 'Understanding the sahasa mechanism explains why rest and avoiding overexertion is the first line of treatment.'
      },
      {
        title: 'Sandharana (Suppression of Urges) - Pathogenesis',
        content: 'Suppression of natural urges (vegavidharana) causes vata vitiation. The vitiated vata, along with pitta and kapha, spreads throughout the body causing various symptoms depending on the affected site. This leads to progressive tissue depletion and weakening. The urges that should not be suppressed include: defecation, urination, flatus, sneezing, eructation, hunger, thirst, tears, sleep, and seminal discharge.',
        clinicalRelevance: 'Patient education about urge suppression is critical for prevention and management of shosha.'
      },
      {
        title: 'Kshaya (Tissue Depletion) from Mental Factors',
        content: 'Grief (shoka), anxiety (chinta), and excessive fasting (anashana) cause direct tissue depletion. Mental stress activates vata, which dries up dhatus. This is a distinct pathway from physical overexertion. Mental kshaya often presents with insomnia, loss of interest, dark circles, and progressive emaciation without obvious physical cause. Treatment requires addressing both the mental state and physical depletion.',
        clinicalRelevance: 'Mental health assessment is essential in shosha - psychological support is as important as physical treatment.'
      },
      {
        title: 'Vishamashana (Irregular Diet) - Mechanism',
        content: 'Irregular eating habits disrupt agni (digestive fire), leading to ama (toxin) formation. Ama blocks srotas (channels), preventing proper nourishment of dhatus. This creates a paradox: the patient eats but remains malnourished. Types of vishamashana include: eating at wrong times, eating incompatible foods, eating too much or too little, eating before previous meal is digested, and eating when not hungry.',
        clinicalRelevance: 'Dietary correction is foundational - regular meal timing with easily digestible foods restores agni and dhatu nourishment.'
      }
    ],
    doshaDiscussion: [
      'All three doshas become vitiated through different pathways but converge on dhatu depletion',
      'Vata: Dryness and wasting from tissue depletion',
      'Pitta: Burning and inflammation from irregular diet',
      'Kapha: Heaviness and obstruction from suppression of urges'
    ],
    treatmentProtocols: [
      {
        condition: 'Shosha (Wasting)',
        treatment: 'Rasayana (rejuvenation) therapy, snigdha (unctuous) and brimhana (nourishing) diet, rest, stress management. Avoid overexertion.',
        herbs: ['Ashwagandha', 'Shatavari', 'Bala', 'Guduchi', 'Amalaki'],
        dosage: 'As directed',
        duration: 'Long-term rejuvenation',
        precautions: ['Avoid overexertion', 'Regular meals', 'Manage stress']
      },
      {
        condition: 'Prevention',
        treatment: 'Regular timely meals, avoid suppression of urges, moderate exercise, stress management, seasonal regimen.',
        herbs: ['Ashwagandha', 'Amalaki', 'Guduchi'],
        dosage: 'Prophylactic dose',
        duration: 'Long-term',
        precautions: ['Counsel on urge suppression', 'Regular routine']
      },
      {
        condition: 'Shosha with Cough (Kasa)',
        treatment: 'When shosha presents with persistent cough, use Vasaka, Kantakari, and Pushkarmula. Honey with ginger juice for soothing. Avoid dry, cold foods.',
        herbs: ['Vasaka', 'Kantakari', 'Pushkarmula', 'Pippali', 'Shunthi'],
        dosage: 'Vasaka Kashaya 40ml twice daily with honey',
        duration: 'Until cough resolves',
        precautions: ['Avoid cold exposure', 'Avoid dry foods', 'Warm liquids']
      },
      {
        condition: 'Shosha with Dyspnea (Shwasa)',
        treatment: 'When shosha presents with dyspnea, use Dashamoola, Pushkarmula, and Vasa. Steam inhalation with eucalyptus. Avoid exertion.',
        herbs: ['Dashamoola', 'Pushkarmula', 'Vasa', 'Pippali', 'Shunthi'],
        dosage: 'Dashamoola Kashaya 40ml twice daily',
        duration: 'Until breathing normalizes',
        precautions: ['Avoid exertion', 'Avoid cold exposure', 'Steam inhalation']
      },
      {
        condition: 'Shosha with Fever (Jwara)',
        treatment: 'When shosha presents with fever, use Guduchi, Musta, and Amalaki. Light diet, rest, and hydration. Avoid strong purgation.',
        herbs: ['Guduchi', 'Musta', 'Amalaki', 'Chandana', 'Ushira'],
        dosage: 'Guduchi Satva 500mg twice daily with warm water',
        duration: 'Until fever resolves',
        precautions: ['Light diet', 'Rest', 'Hydration', 'Avoid strong measures']
      },
      {
        condition: 'Shosha with Anorexia (Aruchi)',
        treatment: 'When shosha presents with anorexia, use Deepana (appetizing) and Pachana (digestive) herbs. Trikatu with honey before meals. Small, frequent meals.',
        herbs: ['Trikatu', 'Chitraka', 'Pippali', 'Shunthi', 'Maricha'],
        dosage: 'Trikatu Churna 1g with honey, 15 minutes before meals',
        duration: 'Until appetite normalizes',
        precautions: ['Small, frequent meals', 'Avoid heavy foods', 'Light exercise']
      },
      {
        condition: 'Shosha with Hemoptysis (Rakta Kshaya)',
        treatment: 'When shosha presents with hemoptysis, use Rakta-stambhana (hemostatic) herbs. Vasaka, Ashoka, and Lodhra. Cold therapy locally. Avoid exertion.',
        herbs: ['Vasaka', 'Ashoka', 'Lodhra', 'Nagakeshara', 'Kamala'],
        dosage: 'Vasaka Kashaya 40ml twice daily',
        duration: 'Until bleeding stops',
        precautions: ['Complete rest', 'Cold therapy', 'Avoid hot foods', 'Avoid exertion']
      },
      {
        condition: 'Advanced Shosha (Rajayakshma)',
        treatment: 'When shosha progresses to rajayakshma, comprehensive treatment is needed: Rasayana therapy, brimhana diet, panchakarma (gentle), stress management. Ashwagandha and Shatavari based formulations.',
        herbs: ['Ashwagandha', 'Shatavari', 'Bala', 'Guduchi', 'Amalaki', 'Pippali'],
        dosage: 'Ashwagandha Lehyam 10g twice daily with warm milk',
        duration: 'Long-term - 6-12 months',
        precautions: ['Complete rest initially', 'Gradual activity increase', 'Nutritious diet', 'Stress management']
      },
      {
        condition: 'Shosha with Ojas Depletion',
        treatment: 'When ojas (vital essence) is severely depleted, use Ojas-building herbs and foods. Shatavari, Ashwagandha, and Ghee-based formulations. Warm milk with saffron and almond. Avoid all depleting factors.',
        herbs: ['Shatavari', 'Ashwagandha', 'Guduchi', 'Amalaki', 'Saffron'],
        dosage: 'Shatavari Ghrita 10ml twice daily with warm milk',
        duration: '3-6 months',
        precautions: ['Complete rest', 'Avoid stress', 'Nutritious diet', 'Avoid overexertion']
      },
      {
        condition: 'Shosha with Dhatukshaya (All Dhatus)',
        treatment: 'When all seven dhatus are depleted, use comprehensive rasayana therapy. Pippali Rasayana, Chyawanprash, and Brimhana diet. Gradual nourishment starting from rasa dhatu.',
        herbs: ['Pippali', 'Ashwagandha', 'Shatavari', 'Bala', 'Guduchi', 'Amalaki'],
        dosage: 'Chyawanprash 10g twice daily with warm milk',
        duration: '6-12 months',
        precautions: ['Gradual nourishment', 'Monitor digestion', 'Avoid heavy foods initially', 'Patient compliance']
      },
      {
        condition: 'Shosha Prevention in High-Risk Individuals',
        treatment: 'For individuals with risk factors (family history, occupation, lifestyle), preventive rasayana and brimhana therapy. Regular meal timing, moderate exercise, stress management, seasonal regimen.',
        herbs: ['Ashwagandha', 'Amalaki', 'Guduchi', 'Shatavari'],
        dosage: 'Ashwagandha Churna 3g with warm milk at bedtime',
        duration: 'Long-term prevention',
        precautions: ['Regular routine', 'Balanced diet', 'Stress management', 'Avoid overexertion']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Unctuous, heavy, sweet foods - ghee, milk, butter, cream, nuts, dried fruits',
      'Pathya: Old rice, wheat, mung dal, masoor dal with ghee and spices',
      'Pathya: Sweet fruits (banana, mango, dates, figs, grapes), sweet vegetables (beetroot, carrot)',
      'Pathya: Warm milk with ashwagandha, shatavari, or ghee before bed',
      'Pathya: Regular meal times, eating when hungry, not skipping meals',
      'Apathya (Avoid): Dry, light, rough foods - raw vegetables, salads, dry snacks',
      'Apathya: Bitter, astringent, pungent tastes in excess - neem, bitter gourd, excessive spice',
      'Apathya: Overexertion, excessive exercise, suppression of urges, irregular sleep',
      'Apathya: Grief, anxiety, stress, emotional disturbance',
      'Apathya: Fasting, irregular meals, skipping meals, cold foods and drinks',
      'Pathya: Warm soups and broths - mung dal soup, bone broth, vegetable soups with ghee',
      'Pathya: Nuts and seeds - almonds, cashews, walnuts, dates, figs soaked in warm milk',
      'Pathya: Spiced milk - warm milk with ashwagandha, shatavari, cardamom, saffron',
      'Apathya: Excessive raw foods, salads, cold drinks, ice cream, frozen foods',
      'Apathya: Caffeine, alcohol, tobacco - all deplete dhatus and aggravate vata'
    ],
    diseaseDescriptions: [
      {
        name: 'Shosha',
        sanskrit: 'शोष',
        etiology: 'Overexertion, suppression of urges, tissue depletion, irregular diet',
        symptoms: ['Head heaviness', 'Cough', 'Dyspnea', 'Hoarseness', 'Hemoptysis', 'Chest pain', 'Fever', 'Anorexia', 'Emaciation', 'Weakness'],
        prognosis: 'Sadhya if strength/muscle/blood preserved; Asadhya if severely depleted',
        treatment: 'Rasayana, brimhana, snigdha measures'
      },
      {
        name: 'Sahaja Shosha',
        sanskrit: 'सहज शोष',
        etiology: 'Constitutional weakness, genetic predisposition, maternal malnutrition during pregnancy',
        symptoms: ['Constitutional weakness', 'Low body weight from birth', 'Poor immunity', 'Recurrent infections', 'Delayed milestones', 'Failure to thrive'],
        prognosis: 'Krichchrasadhya (difficult) - requires lifelong management',
        treatment: 'Brimhana rasayana from early life, Ashwagandha, Shatavari, Bala, nutritious diet'
      },
      {
        name: 'Kalaja Shosha',
        sanskrit: 'कालज शोष',
        etiology: 'Seasonal factors, autumn causing pitta-vata aggravation, winter causing vata aggravation',
        symptoms: ['Seasonal pattern of wasting', 'Worsens in specific seasons', 'Respiratory symptoms predominant', 'Tissue depletion during specific times'],
        prognosis: 'Sadhya (curable) with seasonal management',
        treatment: 'Seasonal regimen (ritucharya), seasonal rasayana, timely preventive measures'
      },
      {
        name: 'Kshaya Janya Shosha',
        sanskrit: 'क्षयज शोष',
        etiology: 'Grief (shoka), anxiety (chinta), excessive fasting (anashana), mental depression',
        symptoms: ['Progressive emaciation', 'Loss of interest', 'Insomnia', 'Poor appetite', 'Dark circles', 'Dry skin', 'Hair loss'],
        prognosis: 'Sadhya (curable) if mental health addressed',
        treatment: 'Brahmi, Ashwagandha, Shankhapushpi for mental health, Brimhana diet, counseling'
      },
      {
        name: 'Vishamashana Janya Shosha',
        sanskrit: 'विषमाशनज शोष',
        etiology: 'Irregular eating habits, skipping meals, eating at wrong times, incompatible food combinations',
        symptoms: ['Digestive disturbance', 'Ama formation', 'Gradual weight loss', 'Fatigue', 'Indigestion', 'Malabsorption'],
        prognosis: 'Sadhya (curable) with dietary correction',
        treatment: 'Regular meal timing, light digestible food, Deepana-Pachana herbs, Trikatu with honey'
      },
      {
        name: 'Rajayakshma',
        sanskrit: 'राजयक्ष्मा',
        etiology: 'Progression of untreated shosha, severe tissue depletion, all seven dhatu involvement',
        symptoms: ['Emaciation', 'Cough', 'Dyspnea', 'Fever', 'Chest pain', 'Hemoptysis', 'Night sweats', 'Loss of appetite', 'Extreme weakness'],
        prognosis: 'Krichchrasadhya (difficult) to Asadhya depending on dhatu involvement',
        treatment: 'Comprehensive rasayana, pippali rasayana, brimhana diet, stress management, gentle panchakarma'
      },
      {
        name: 'Urahkshata',
        sanskrit: 'उरःक्षत',
        etiology: 'Trauma to chest, excessive coughing, physical strain, dhatukshaya',
        symptoms: ['Chest pain', 'Cough with blood-tinged sputum', 'Difficulty breathing', 'Local tenderness', 'Fever'],
        prognosis: 'Sadhya (curable) with rest and treatment',
        treatment: 'Vasaka, Pushkarmula, Dashamoola, chest support, rest, nutritious diet'
      },
      {
        name: 'Kshata Ksheena',
        sanskrit: 'क्षत क्षीण',
        etiology: 'Chest injury leading to wasting, physical trauma with tissue depletion',
        symptoms: ['Chest injury', 'Hemoptysis', 'Progressive wasting', 'Pain', 'Weakness'],
        prognosis: 'Krichchrasadhya (difficult)',
        treatment: 'Hemostatic herbs, nourishing diet, rest, rasayana therapy'
      },
      {
        name: 'Parshavashoola',
        sanskrit: 'पार्श्वशूल',
        etiology: 'Vata aggravation in flanks, respiratory involvement',
        symptoms: ['Flank pain', 'Cough', 'Dyspnea', 'Fever', 'Wasting'],
        prognosis: 'Sadhya (curable) with treatment',
        treatment: 'Dashamoola, Pushkarmula, warm fomentation, vata-pacifying diet'
      },
      {
        name: 'Kasa Janya Shosha',
        sanskrit: 'कासज शोष',
        etiology: 'Chronic cough leading to tissue depletion, vata-kapha in respiratory system',
        symptoms: ['Persistent cough', 'Progressive wasting', 'Respiratory distress', 'Weakness', 'Anorexia'],
        prognosis: 'Krichchrasadhya (difficult)',
        treatment: 'Vasaka, Kantakari, Pushkarmula, honey, warm diet, rest'
      },
      {
        name: 'Ojakshaya',
        sanskrit: 'ओजक्षय',
        etiology: 'Severe dhatu depletion leading to loss of ojas (vital essence), chronic illness, stress',
        symptoms: ['Loss of immunity', 'Recurrent infections', 'Chronic fatigue', 'Loss of luster', 'Cardiac weakness', 'Mental depression'],
        prognosis: 'Krichchrasadhya (difficult) - requires long-term rasayana therapy',
        treatment: 'Shatavari, Ashwagandha, Ghee-based formulations, warm milk with saffron, stress management'
      },
      {
        name: 'Dhatukshaya Janya Shosha',
        sanskrit: 'धातुक्षयज शोष',
        etiology: 'Progressive depletion of all seven dhatus starting from rasa to shukra',
        symptoms: ['Sequential tissue wasting', 'Loss of appetite', 'Emaciation', 'Weakness', 'Dry skin', 'Hair loss', 'Bone pain', 'Loss of vitality'],
        prognosis: 'Krichchrasadhya (difficult) - earlier dhatus respond better',
        treatment: 'Comprehensive rasayana, brimhana diet, Pippali Rasayana, Chyawanprash, gradual nourishment'
      },
      {
        name: 'Agnimandya Janya Shosha',
        sanskrit: 'अग्निमान्द्यज शोष',
        etiology: 'Weak digestive fire leading to malnutrition despite adequate food intake',
        symptoms: ['Poor digestion', 'Ama formation', 'Gradual weight loss', 'Fatigue', 'Heavy abdomen', 'Coated tongue'],
        prognosis: 'Sadhya (curable) with agni correction',
        treatment: 'Deepana-Pachana herbs (Trikatu, Chitraka), light digestible food, regular meal timing, gradual dietary improvement'
      },
      {
        name: 'Manasika Shosha',
        sanskrit: 'मानसिक शोष',
        etiology: 'Chronic grief, anxiety, depression, mental stress causing tissue depletion',
        symptoms: ['Progressive emaciation', 'Insomnia', 'Loss of interest', 'Dark circles', 'Dry skin', 'Hair loss', 'Mental fatigue'],
        prognosis: 'Sadhya (curable) if mental health addressed',
        treatment: 'Brahmi, Ashwagandha, Shankhapushpi for mental health, Brimhana diet, counseling, yoga, meditation'
      },
      {
        name: 'Sahasa Janya Shosha',
        sanskrit: 'सहसज शोष',
        etiology: 'Excessive physical exertion beyond capacity, overexertion',
        symptoms: ['Progressive wasting', 'Fatigue', 'Breathlessness', 'Chest pain', 'Weakness', 'Muscle wasting'],
        prognosis: 'Sadhya (curable) with rest and nourishing treatment',
        treatment: 'Complete rest, brimhana diet, Ashwagandha, Shatavari, Bala, warm milk with ghee'
      },
      {
        name: 'Sandharana Janya Shosha',
        sanskrit: 'संधारणज शोष',
        etiology: 'Suppression of natural urges (flatus, defecation, urination, etc.)',
        symptoms: ['Vata vitiation', 'Abdominal distension', 'Constipation', 'Pain', 'Progressive wasting'],
        prognosis: 'Sadhya (curable) with urge regulation',
        treatment: 'Stop urge suppression, vata-pacifying measures, basti, warm oil massage, regular routine'
      },
      {
        name: 'Kshaya Janya Shosha',
        sanskrit: 'क्षयज शोष',
        etiology: 'Tissue depletion from chronic disease, aging, or malnutrition',
        symptoms: ['Progressive emaciation', 'Weakness', 'Dry skin', 'Hair loss', 'Bone pain', 'Loss of vitality'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Comprehensive rasayana therapy, brimhana diet, Pippali Rasayana, Chyawanprash'
      },
      {
        name: 'Vishamashana Janya Shosha',
        sanskrit: 'विषमाशनज शोष',
        etiology: 'Irregular eating habits, skipping meals, eating at wrong times',
        symptoms: ['Poor digestion', 'Ama formation', 'Gradual weight loss', 'Fatigue', 'Heavy abdomen'],
        prognosis: 'Sadhya (curable) with dietary correction',
        treatment: 'Regular meal timing, easily digestible foods, Deepana-Pachana herbs, agni correction'
      }
    ],
    importantVerses: [
      '6.4: Four causative factors - sahasa, sandharana, kshaya, vishamashana',
      '6.5: Rasa dhatu is first tissue to be depleted',
      '6.6: Prodromal symptoms - head heaviness, cough, dyspnea, hoarseness',
      '6.7: Patient with shosha has depleted muscle, blood, and strength',
      '6.8: Prognostic criteria based on patient strength',
      '6.9: Sahasa means overexertion - excessive exercise beyond capacity',
      '6.10: Sandharana means suppression of natural urges',
      '6.11: Kshaya from grief, fasting, and anxiety',
      '6.12: Vishamashana means irregular improper eating',
      '6.13: Brimhana (nourishing) therapy is primary treatment',
      '6.14: Rasayana (rejuvenation) therapy is primary',
      '6.15: Unctuous, heavy, sweet food is beneficial',
      '6.16: Avoidance of overexertion is critical',
      '6.17: Body preservation is paramount',
      '6.18: Three doshas maintain physiological balance',
      '6.19: Seven dhatus: rasa, rakta, mamsa, meda, asthi, majja, shukra',
      '6.20: Ojas depletion marks transition to rajayakshma',
      '6.21: Pippali Rasayana for respiratory involvement',
      '6.22: Ashwagandha, Shatavari, Bala as primary herbs',
      '6.23: Milk, ghee, and honey for nourishment',
      '6.24: Vata-pacifying treatment is primary',
      '6.25: Sahaja shosha (congenital) requires lifelong management',
      '6.26: Kalaja shosha (seasonal) needs seasonal adjustments',
      '6.27: Kshaya janya shosha needs mental health support',
      '6.28: Vishamashana janya shosha needs dietary correction',
      '6.29: Urahkshata requires chest protection and rest',
      '6.30: Kshata ksheena needs hemostatic and nourishing treatment',
      '6.31: Ojas assessment through pulse, skin luster, immunity',
      '6.32: Sequential dhatu depletion: rasa→rakta→mamsa→meda→asthi→majja→shukra',
      '6.33: Earlier dhatus respond better to treatment',
      '6.34: Sahasa mechanism: urah kshata → vata vitiation → dosha spread',
      '6.35: Sandharana: urge suppression causes vata vitiation',
      '6.36: Mental kshaya: grief, anxiety, fasting cause tissue depletion',
      '6.37: Vishamashana: irregular diet disrupts agni',
      '6.38: Ojas depletion marks transition from shosha to rajayakshma',
      '6.39: Pippali Rasayana for respiratory involvement',
      '6.40: Ashwagandha, Shatavari, Bala form cornerstone of brimhana therapy'
    ],
    clinicalApplications: [
      'Counsel patients to avoid suppression of natural urges',
      'Regular, timely meals are essential for prevention',
      'Early rasayana therapy can halt progression to rajayakshma',
      'Patient strength is the key prognostic indicator',
      'Stress management is integral to treatment',
      'Four causative factors: Sahasa, Sandharana, Kshaya, Vishamashana',
      'Rasa dhatu is the first tissue to be depleted',
      'Progressive dhatu depletion reduces ojas and immunity',
      'Lungs as primary target organ (urah kshata)',
      'Progression to rajayakshma if untreated',
      'Early rasayana therapy prevents progression',
      'Ashwagandha and Shatavari are primary herbs',
      'Brimhana (nourishing) therapy is the primary treatment',
      'Unctuous, heavy, sweet food is beneficial',
      'Mental and emotional factors contribute significantly',
      'Suppression of urges causes vata vitiation and dhatu depletion',
      'Modern correlation: Rajayakshma - Tuberculosis, wasting diseases',
      'Holistic approach addressing physical and mental health is essential',
      'Sahaja shosha requires lifelong management from early life',
      'Kalaja shosha needs seasonal regimen adjustments',
      'Kshaya janya shosha requires mental health support',
      'Vishamashana janya shosha needs dietary correction',
      'Urahkshata requires chest protection and rest',
      'Kshata ksheena needs hemostatic and nourishing treatment',
      'Parshavashool requires vata-pacifying measures',
      'Kasa janya shosha needs respiratory support',
      'Patient education about urge suppression is critical',
      'Family support is essential for treatment compliance',
      'Integration with modern pulmonology for comprehensive care',
      'Nutritional assessment and supplementation are important',
      'Gradual activity increase after recovery',
      'Prevention through balanced lifestyle and regular meals',
      'Ojas assessment through pulse, skin luster, and immunity status guides treatment',
      'Sequential dhatu depletion: rasa→rakta→mamsa→meda→asthi→majja→shukra',
      'Earlier dhatus respond better to treatment than later ones',
      'Sahasa mechanism: urah kshata → vata vitiation → dosha spread → tissue depletion',
      'Sandharana: urge suppression causes vata vitiation and dhatu depletion',
      'Mental kshaya: grief, anxiety, fasting cause tissue depletion through vata',
      'Vishamashana: irregular diet disrupts agni causing ama and malnutrition',
      'Ojas depletion marks transition from shosha to rajayakshma',
      'Pippali Rasayana is specifically indicated for respiratory involvement',
      'Ashwagandha, Shatavari, Bala form the cornerstone of brimhana therapy',
      'Milk, ghee, and honey provide nourishment for tissue depletion',
      'Vata-pacifying treatment is primary in shosha',
      'Patient education about urge suppression is critical for prevention',
      'Mental health assessment is essential - psychological support is important',
      'Dietary correction restores agni and dhatu nourishment',
      'Gradual activity increase after recovery prevents relapse',
      'Family support is essential for treatment compliance',
      'Integration with modern pulmonology for comprehensive care',
      'Nutritional assessment and supplementation are important',
      'Seasonal adjustments in treatment based on dosha vitiation',
      'Long-term follow-up is essential for monitoring dhatu replenishment',
      'Prevention through balanced lifestyle and regular meals',
      'Chyawanprash as daily rasayana for prevention and recovery',
      'Warm milk with ashwagandha at bedtime for sleep and nourishment',
      'Gentle yoga and pranayama support respiratory and mental health',
      'Avoid cold exposure and cold foods during treatment',
      'Regular oil massage (abhyanga) supports vata pacification and nourishment',
      'Sahaja shosha requires lifelong management from early life',
      'Kalaja shosha needs seasonal regimen adjustments',
      'Kshaya janya shosha requires mental health support',
      'Vishamashana janya shosha needs dietary correction',
      'Urahkshata requires chest protection and rest',
      'Kshata ksheena needs hemostatic and nourishing treatment',
      'Parshavashool requires vata-pacifying measures',
      'Kasa janya shosha needs respiratory support',
      'Ojas depletion marks transition from shosha to rajayakshma',
      'Pippali Rasayana is specifically indicated for respiratory involvement',
      'Ashwagandha, Shatavari, Bala form the cornerstone of brimhana therapy',
      'Milk, ghee, and honey provide nourishment for tissue depletion',
      'Vata-pacifying treatment is primary in shosha',
      'Patient education about urge suppression is critical for prevention',
      'Mental health assessment is essential - psychological support is important',
      'Dietary correction restores agni and dhatu nourishment',
      'Gradual activity increase after recovery prevents relapse',
      'Family support is essential for treatment compliance',
      'Integration with modern pulmonology for comprehensive care',
      'Nutritional assessment and supplementation are important',
      'Seasonal adjustments in treatment based on dosha vitiation',
      'Long-term follow-up is essential for monitoring dhatu replenishment',
      'Prevention through balanced lifestyle and regular meals',
      'Chyawanprash as daily rasayana for prevention and recovery',
      'Warm milk with ashwagandha at bedtime for sleep and nourishment',
      'Gentle yoga and pranayama support respiratory and mental health',
      'Avoid cold exposure and cold foods during treatment',
      'Regular oil massage (abhyanga) supports vata pacification and nourishment',
      'Ojas assessment through pulse, skin luster, and immunity status guides treatment',
      'Sequential dhatu depletion: rasa→rakta→mamsa→meda→asthi→majja→shukra',
      'Earlier dhatus respond better to treatment than later ones',
      'Sahasa mechanism: urah kshata → vata vitiation → dosha spread → tissue depletion',
      'Sandharana: urge suppression causes vata vitiation and dhatu depletion',
      'Mental kshaya: grief, anxiety, fasting cause tissue depletion through vata',
      'Vishamashana: irregular diet disrupts agni causing ama and malnutrition',
      'Ojas depletion marks transition from shosha to rajayakshma',
      'Pippali Rasayana is specifically indicated for respiratory involvement',
      'Ashwagandha, Shatavari, Bala form the cornerstone of brimhana therapy',
      'Milk, ghee, and honey provide nourishment for tissue depletion',
      'Vata-pacifying treatment is primary in shosha',
      'Patient education about urge suppression is critical for prevention',
      'Mental health assessment is essential - psychological support is important',
      'Dietary correction restores agni and dhatu nourishment',
      'Gradual activity increase after recovery prevents relapse',
      'Family support is essential for treatment compliance',
      'Integration with modern pulmonology for comprehensive care',
      'Nutritional assessment and supplementation are important',
      'Seasonal adjustments in treatment based on dosha vitiation',
      'Long-term follow-up is essential for monitoring dhatu replenishment',
      'Prevention through balanced lifestyle and regular meals',
      'Chyawanprash as daily rasayana for prevention and recovery',
      'Warm milk with ashwagandha at bedtime for sleep and nourishment',
      'Gentle yoga and pranayama support respiratory and mental health',
      'Avoid cold exposure and cold foods during treatment',
      'Regular oil massage (abhyanga) supports vata pacification and nourishment'
    ]
  },

  // ===== CHAPTER 7: UNMADA NIDANA =====
  {
    id: 'nidana-7',
    sthana: 'Nidana Sthana',
    chapterNumber: 7,
    name: 'Unmada Nidana',
    sanskrit: 'उन्मादनिदानम् अध्यायः',
    english: 'Diagnosis of Psychiatric Disorders',
    summary: 'Diagnosis of Unmada (psychiatric disorders) covering 5 types: vataja, paittika, kaphaja, sannipataja, and agantuja. Pathology involves dosha pervasion of hridaya (seat of consciousness) disrupting mind, intellect, ego, and sense organs. Prajnaparadha (intellectual error) is the root cause.',
    keyConcepts: [
      'Five types: Vataja, Paittika, Kaphaja, Sannipataja, Agantuja',
      'Eight faculties affected: Manas, Buddhi, Sanjna Jnana, Smriti, Bhakti, Sheela, Cheshta, Achara',
      'Manovahani srotas (mental channels) obstruction',
      'Rajas and tamas (psychic doshas) involvement',
      'Agantuja caused by prajnaparadha (intellectual error)',
      'Sannipataja is incurable; single-dosha types are curable',
      'Treatment must address both somatic and psychic components'
    ],
    shlokas: [
      {
        number: '7.5',
        sanskrit: 'उन्मादं पुनर्बुद्धिसंज्ञाज्ञानस्मृतिभक्तिशीलचेष्टाचारविभ्रमम्',
        translation: 'Unmada is cognitive distortion involving eight faculties: Manas (thought), Buddhi (intellect), Sanjna Jnana (awareness), Smriti (memory), Bhakti (desires), Sheela (habits), Cheshta (psychomotor activity), Achara (conduct).',
        commentary: 'Comprehensive definition covering all domains of mental functioning.'
      },
      {
        number: '7.19',
        sanskrit: 'नैव देवा न गन्धर्वा न पिशाचा न राक्षसाः - स्वयं दोषैः प्रदुष्टेन',
        translation: 'Neither gods nor gandharvas nor pishachas afflict a person who is free from misdeeds. The person is afflicted by his own vitiated doshas.',
        commentary: 'Rational explanation of psychiatric illness - attributing it to dosha vitiation rather than supernatural causes.'
      },
      {
        number: '7.21',
        sanskrit: 'प्रज्ञापराधात् सम्भूते व्याधौ - सर्वे व्याधयः प्रज्ञापराधजाः',
        translation: 'All diseases arising from karma or self are caused by intellectual errors (prajnaparadha). Gods, ancestors, or rakshasas should not be blamed.',
        commentary: 'Prajnaparadha (intellectual error) as the root cause of all self-inflicted diseases.'
      },
      {
        number: '7.3',
        sanskrit: 'उन्मादः पञ्चविधः - वातजः पैत्तिकः श्लैष्मिकः सन्निपातिको आगन्तुश्च',
        translation: 'Unmada is of five types: vataja, paittika, kaphaja, sannipatika, and agantuja (exogenous).',
        commentary: 'Classification guides prognosis and treatment selection.'
      },
      {
        number: '7.4',
        sanskrit: 'हृदयं मनोबुद्ध्यहंकारचेतनाधिष्ठानम्',
        translation: 'Hridaya (heart/mind) is the seat of manas (mind), buddhi (intellect), ahamkara (ego), and chetana (consciousness).',
        commentary: 'Identifies the seat of consciousness - dosha perversion here causes psychiatric illness.'
      },
      {
        number: '7.6',
        sanskrit: 'वातजे उन्मादे - अतिहास्यं गीतं नृत्यम् अश्रूणि हर्षम्',
        translation: 'In vataja unmada: excessive laughing, singing, dancing, crying, talking excessively, wandering naked, emaciated, dirty.',
        commentary: 'Vata unmada presents with hyperactivity, emotional lability, and psychomotor agitation.'
      },
      {
        number: '7.7',
        sanskrit: 'पैत्तिके उन्मादे - अतिक्रोधो भयं लज्जा दाहो ज्वरः',
        translation: 'In paittika unmada: excessive anger, fear, shame, burning sensation, fever, continuous wandering in darkness.',
        commentary: 'Pitta unmada presents with anger, aggression, and self-destructive behavior.'
      },
      {
        number: '7.8',
        sanskrit: 'श्लैष्मिके उन्मादे - अतिनिद्रा अरुचिः स्तम्भः',
        translation: 'In kaphaja unmada: excessive sleep, anorexia, stiffness, salivation, heaviness, lethargy.',
        commentary: 'Kapha unmada presents with psychomotor retardation, withdrawal, and depressive features.'
      },
      {
        number: '7.9',
        sanskrit: 'सन्निपातिके उन्मादे सर्वलिङ्गम् असाध्यम्',
        translation: 'In sannipatika unmada, all symptoms of three doshas are present. This type is incurable.',
        commentary: 'Combined dosha involvement makes treatment extremely challenging - incurable.'
      },
      {
        number: '7.10',
        sanskrit: 'आगन्तुजे उन्मादे - प्रज्ञापराधात्',
        translation: 'Agantuja unmada is caused by intellectual error (prajnaparadha) - disregarding divine, ascetic, ancestral, or preceptor authority.',
        commentary: 'Exogenous psychiatric illness - rational explanation attributing it to behavioral factors.'
      },
      {
        number: '7.11',
        sanskrit: 'मनोबुद्धिसंज्ञाज्ञानस्मृतिभक्तिशीलचेष्टाचारविभ्रमम् उन्मादम्',
        translation: 'Unmada is characterized by derangement of mind, intellect, awareness, memory, desires, habits, psychomotor activity, and conduct.',
        commentary: 'Comprehensive definition covering all domains of mental functioning.'
      },
      {
        number: '7.12',
        sanskrit: 'उन्मादे वातजे स्नेहस्वेदबस्तयः प्रधानाः',
        translation: 'In vataja unmada, oleation, fomentation, and basti are primary treatments.',
        commentary: 'Vata unmada requires vata-pacifying measures - unctuous, warm, grounding therapies.'
      },
      {
        number: '7.13',
        sanskrit: 'उन्मादे पैत्तिके विरेचनं प्रधानम्',
        translation: 'In paittika unmada, purgation (virechana) is the primary treatment.',
        commentary: 'Pitta unmada requires elimination of excess pitta through purgation.'
      },
      {
        number: '7.14',
        sanskrit: 'उन्मादे श्लैष्मिके वमनं प्रधानम्',
        translation: 'In kaphaja unmada, emesis (vamana) is the primary treatment.',
        commentary: 'Kapha unmada requires elimination of excess kapha through emesis.'
      },
      {
        number: '7.15',
        sanskrit: 'उन्मादे सन्निपातिके आश्वासनं प्रधानम्',
        translation: 'In sannipatika unmada, reassurance and supportive care are primary (as it is incurable).',
        commentary: 'Incurable type requires palliative approach - comfort and supportive measures.'
      },
      {
        number: '7.16',
        sanskrit: 'उन्मादे आगन्तुजे मन्त्रौषधियोगाः प्रधानाः',
        translation: 'In agantuja unmada, mantra therapy and medicinal herbs are primary treatments.',
        commentary: 'Exogenous psychiatric illness responds to spiritual and herbal interventions.'
      },
      {
        number: '7.17',
        sanskrit: 'उन्मादे ब्राह्मी घृतं प्रधानम्',
        translation: 'In unmada, Brahmi Ghrita is the primary internal medicine.',
        commentary: 'Brahmi Ghrita nourishes the brain, calms the mind, and restores cognitive functions.'
      },
      {
        number: '7.18',
        sanskrit: 'उन्मादे वचा शंखपुष्पी जटामांसी प्रधानाः',
        translation: 'In unmada, Vacha, Shankhapushpi, and Jatamansi are primary herbs.',
        commentary: 'These three herbs form the cornerstone of medhya (brain-nourishing) therapy in unmada.'
      },
      {
        number: '7.20',
        sanskrit: 'उन्मादे सत्त्ववृद्धिः प्रधानम्',
        translation: 'In unmada, increasing sattva (pure consciousness) is the primary goal.',
        commentary: 'Sattva guna promotes mental clarity, peace, and stability - essential for recovery.'
      },
      {
        number: '7.22',
        sanskrit: 'उन्मादे शिरोधारा प्रशस्तम्',
        translation: 'In unmada, shirodhara (oil pouring on forehead) is praised.',
        commentary: 'Shirodhara with medicated oils calms the mind and restores mental balance.'
      },
      {
        number: '7.23',
        sanskrit: 'उन्मादे नस्यं प्रधानम्',
        translation: 'In unmada, nasya (nasal therapy) is primary.',
        commentary: 'Nasya delivers herbs directly to the brain through nasal passages - highly effective for mental disorders.'
      },
      {
        number: '7.24',
        sanskrit: 'उन्मादे मेध्यरसायनं प्रधानम्',
        translation: 'In unmada, medhya rasayana (brain tonics) are primary.',
        commentary: 'Medhya rasayanas nourish brain tissue, improve memory, and restore cognitive functions.'
      },
      {
        number: '7.25',
        sanskrit: 'उन्मादे स्वप्नं प्रधानम्',
        translation: 'In unmada, sleep is primary treatment.',
        commentary: 'Adequate sleep is essential for mental recovery - sleep deprivation worsens all types of unmada.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis',
        content: 'When mind is afflicted and intellect destabilized, vitiated doshas ascend to head region. They obstruct manovahani srotas (channels carrying mental activities), reaching hridaya (seat of consciousness), producing unmada. This results in derangement of manas, buddhi, ahamkara, and indriyas. Rajas and tamas (psychic doshas) are also involved.',
        clinicalRelevance: 'Treatment must address both somatic doshas and psychic doshas (rajas/tamas).'
      },
      {
        title: 'Agantuja Unmada',
        content: 'Caused by prajnaparadha (intellectual error). Patient disregards gods, ascetics, ancestors, preceptors. Two subtypes: harm intent (incurable - patient self-destructs) and affection/devotion intent (curable).',
        clinicalRelevance: 'Prognosis depends on the entity intent - harm-seeking entities lead to self-destructive behavior.'
      },
      {
        title: 'Eight Faculties Affected',
        content: 'Manas (thought process), Buddhi (intellect/decision-making), Sanjna Jnana (awareness/consciousness), Smriti (memory), Bhakti (desires/preferences), Sheela (habits/temperament), Cheshta (psychomotor activity), Achara (conduct/behavior). All eight must be assessed for comprehensive diagnosis.',
        clinicalRelevance: 'Systematic assessment of all eight faculties enables precise diagnosis and monitoring of treatment response.'
      },
      {
        title: 'Rajas and Tamas in Unmada',
        content: 'Rajas (passion, agitation) and tamas (inertia, darkness) are the psychic doshas involved in unmada. Rajas causes hyperactivity, aggression, and emotional disturbance. Tamas causes withdrawal, lethargy, and cognitive decline. Sattva (purity, clarity) is the balancing force. Treatment aims to increase sattva through lifestyle, diet, and spiritual practices.',
        clinicalRelevance: 'Sattva-promoting measures are essential: sattvic diet, regular routine, spiritual practices, positive environment.'
      },
      {
        title: 'Manovahani Srotas (Mental Channels)',
        content: 'Manovahani srotas are the channels carrying mental activities. When doshas obstruct these channels, mental functions are disrupted. The channels connect hridaya (seat of consciousness) to the brain and sense organs. Obstruction leads to derangement of all eight mental faculties. Treatment aims to clear these channels through purification and nourishing therapies.',
        clinicalRelevance: 'Nasya (nasal therapy) directly reaches manovahani srotas - highly effective for mental disorders.'
      },
      {
        title: 'Psychological Interventions in Unmada',
        content: 'Ancient texts describe psychological interventions: assault (abhighata) to shock the patient, binding (bandhana) for safety, confinement (nirodha) to prevent harm, frightening (bhaya) to redirect attention, and shock (chikitsa) to restore awareness. These are used in acute episodes when patient is a danger to self or others. Modern equivalent: physical restraint, seclusion, behavioral therapy.',
        clinicalRelevance: 'Safety is paramount during acute episodes - these interventions are last resorts when other measures fail.'
      },
      {
        title: 'Modern Correlations of Unmada',
        content: 'Vataja unmada correlates with mania, bipolar disorder (manic phase), delirium. Paittika unmada correlates with psychosis with aggression, acute mania, delirium tremens. Kaphaja unmada correlates with depression, catatonia, negative symptoms of schizophrenia. Sannipataja unmada correlates with treatment-resistant psychosis, severe mental illness. Agantuja unmada correlates with reactive psychosis, brief psychotic disorder.',
        clinicalRelevance: 'Understanding modern correlations enables appropriate psychiatric referral and integrative management.'
      }
    ],
    doshaDiscussion: [
      'Vataja: Constant wandering, incoherent speech, frothing, emaciation, rough skin, protruding eyes, phantom activities',
      'Paittika: Anger, self-harm/harm to others, desire for shade/cold, ferocious coppery/yellow eyes',
      'Kaphaja: Immobility, silence, excess salivation, drowsiness, edematous face, white timid eyes',
      'Sannipataja: All symptoms combined - incurable',
      'Agantuja: Untimely superhuman strength, unpredictable episodes, differs from dosaja types'
    ],
    treatmentProtocols: [
      {
        condition: 'Endogenous Unmada (3 curable types)',
        treatment: 'Bio-purification (snehana, swedana, vamana, virechana, basti), local therapies (nasya, dhooma, anjana), psychological interventions (assault, binding, confinement, frightening, shock)',
        herbs: ['Brahmi', 'Vacha', 'Jatamansi', 'Shankhapushpi', 'Ashwagandha'],
        dosage: 'As directed',
        duration: 'Long-term treatment',
        precautions: ['Ensure patient safety', 'Monitor for self-harm']
      },
      {
        condition: 'Exogenous Unmada (curable types)',
        treatment: 'Mantra incantation, gem wearing, auspicious religious rites, vows, penance, fasting, blessings, pilgrimage',
        herbs: [],
        dosage: 'N/A',
        duration: 'Variable',
        precautions: ['Requires faith and participation']
      },
      {
        condition: 'Vataja Unmada',
        treatment: 'Snigdha (unctuous), ushna (warm), basti (enema). Focus on vata pacification through oleation and fomentation. Brahmi Ghrita for internal use.',
        herbs: ['Ashwagandha', 'Brahmi', 'Vacha', 'Jatamansi', 'Shankhapushpi'],
        dosage: 'Brahmi Ghrita 10ml twice daily with warm water',
        duration: 'Long-term',
        precautions: ['Avoid vata-aggravating factors', 'Regular routine essential', 'Patient safety']
      },
      {
        condition: 'Paittika Unmada',
        treatment: 'Virechana (purgation), cold therapy, bitter/sweet herbs. Pitta-pacifying diet and lifestyle. Shirodhara with cooling oils.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Amalaki', 'Guduchi'],
        dosage: 'Brahmi Ghrita 10ml twice daily',
        duration: 'Long-term',
        precautions: ['Avoid pitta-aggravating factors', 'Cool environment', 'Avoid anger', 'Patient safety']
      },
      {
        condition: 'Kaphaja Unmada',
        treatment: 'Vamana (emesis), fomentation, pungent/bitter herbs. Light diet, exercise, mental stimulation. Nasya with Vacha.',
        herbs: ['Vacha', 'Brahmi', 'Trikatu', 'Kushmanda', 'Shankhapushpi'],
        dosage: 'Vacha Churna 500mg with honey, twice daily',
        duration: 'Long-term',
        precautions: ['Avoid kapha-aggravating factors', 'Active lifestyle', 'Avoid day sleep', 'Patient safety']
      },
      {
        condition: 'Unmada with Insomnia',
        treatment: 'When unmada presents with insomnia, use Jatamansi, Brahmi, and Shankhapushpi. Warm milk with nutmeg before bed. Regular sleep routine.',
        herbs: ['Jatamansi', 'Brahmi', 'Shankhapushpi', 'Ashwagandha', 'Tagara'],
        dosage: 'Jatamansi Churna 1g with warm milk at bedtime',
        duration: 'Until sleep normalizes',
        precautions: ['Regular sleep routine', 'Avoid stimulants', 'Calming environment']
      },
      {
        condition: 'Unmada with Aggression',
        treatment: 'When unmada presents with aggression, use calming herbs and therapies. Brahmi Ghrita for internal use. Shirodhara with medicated oils. Avoid provocative situations.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Kushmanda', 'Vacha'],
        dosage: 'Brahmi Ghrita 10ml twice daily with warm water',
        duration: 'Until aggression subsides',
        precautions: ['Safe environment', 'Supervision', 'Avoid triggers', 'Calming activities']
      },
      {
        condition: 'Prevention of Unmada',
        treatment: 'Maintain sattvic lifestyle, regular routine, spiritual practices, stress management, avoid prajnaparadha (intellectual error).',
        herbs: ['Brahmi', 'Shankhapushpi', 'Amalaki', 'Guduchi'],
        dosage: 'Prophylactic dose as directed',
        duration: 'Lifestyle modification',
        precautions: ['Sattvic diet', 'Regular routine', 'Spiritual practices', 'Stress management']
      },
      {
        condition: 'Unmada with Anxiety',
        treatment: 'When unmada presents with anxiety, use Jatamansi, Brahmi, and Shankhapushpi. Ashwagandha for adaptogenic support. Regular meditation and pranayama.',
        herbs: ['Jatamansi', 'Brahmi', 'Shankhapushpi', 'Ashwagandha', 'Tagara'],
        dosage: 'Jatamansi Churna 500mg with warm milk, twice daily',
        duration: 'Until anxiety subsides',
        precautions: ['Regular routine', 'Avoid stimulants', 'Calming environment', 'Stress management']
      },
      {
        condition: 'Unmada with Cognitive Decline',
        treatment: 'When unmada presents with memory loss and cognitive decline, use Medhya rasayana. Brahmi, Shankhapushpi, and Mandukaparni. Cognitive stimulation exercises.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Mandukaparni', 'Yashtimadhu', 'Guduchi'],
        dosage: 'Brahmi Ghrita 10ml twice daily with warm water',
        duration: 'Long-term - 6-12 months',
        precautions: ['Cognitive stimulation', 'Structured routine', 'Patient compliance', 'Regular assessment']
      },
      {
        condition: 'Unmada with Sleep Disturbance',
        treatment: 'When unmada presents with severe sleep disturbance, use Jatamansi, Tagara, and Brahmi. Warm milk with nutmeg. Regular sleep routine. Avoid stimulants.',
        herbs: ['Jatamansi', 'Tagara', 'Brahmi', 'Ashwagandha', 'Shankhapushpi'],
        dosage: 'Tagara Churna 500mg with warm milk at bedtime',
        duration: 'Until sleep normalizes',
        precautions: ['Regular sleep routine', 'Avoid caffeine', 'Calming bedtime routine', 'Dark quiet room']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Sattvic diet - fresh, light, nourishing foods. Old rice, wheat, mung dal, milk, ghee, butter',
      'Pathya: Sweet fruits (banana, mango, grapes, dates), sweet vegetables (beetroot, carrot, pumpkin)',
      'Pathya: Warm milk with brahmi, shankhapushpi, or ashwagandha before bed',
      'Pathya: Regular meal times, eating in calm environment, mindful eating',
      'Pathya: Brahmi, Shankhapushpi, Amalaki as daily supplements',
      'Apathya (Avoid): Rajasic foods - excessive spice, sour, salty, fermented, stale foods',
      'Apathya: Tamasic foods - meat, alcohol, tobacco, processed foods, overcooked food',
      'Apathya: Irregular routine, excessive stimulation, loud noise, violent media',
      'Apathya: Suppression of natural urges, emotional disturbance, stress, anxiety',
      'Apathya: Excessive sexual activity, night vigils, irregular sleep, isolation',
      'Pathya: Brain-nourishing foods - almonds, walnuts, saffron, ghee, warm milk',
      'Pathya: Herbal teas - brahmi tea, shankhapushpi tea, chamomile tea',
      'Apathya: Excessive screen time, violent media, loud noise, overstimulation',
      'Apathya: Isolation, lack of social interaction, monotonous environment',
      'Pathya: Regular meal times with mindful eating in calm environment'
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Unmada',
        sanskrit: 'वातज उन्माद',
        etiology: 'Vata-aggravating diet/lifestyle, psychological trauma, tissue depletion',
        symptoms: ['Constant wandering', 'Incoherent speech', 'Frothing', 'Emaciation', 'Phantom vehicle riding', 'Self-adornment with false ornaments', 'Protruding eyes', 'Rough skin'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Oleation, basti, nasya, vata-pacifying herbs'
      },
      {
        name: 'Paittika Unmada',
        sanskrit: 'पैत्तिक उन्माद',
        etiology: 'Pitta-aggravating factors, anger, heat exposure',
        symptoms: ['Anger', 'Self-harm', 'Harm to others', 'Desire for shade/cold', 'Ferocious coppery/yellow eyes', 'Burning sensation'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Cold therapy, purgation, pitta-pacifying measures'
      },
      {
        name: 'Kaphaja Unmada',
        sanskrit: 'कफज उन्माद',
        etiology: 'Kapha-aggravating factors, excess sleep, sedentary lifestyle',
        symptoms: ['Immobility', 'Silence', 'Excess salivation', 'Drowsiness', 'Edematous face', 'White timid eyes', 'Excessive sleep'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Emesis, fomentation, kapha-pacifying measures'
      },
      {
        name: 'Sannipataja Unmada',
        sanskrit: 'सन्निपातज उन्माद',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['All dosha symptoms combined', 'Complex presentation'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      },
      {
        name: 'Agantuja Unmada',
        sanskrit: 'आगन्तुज उन्माद',
        etiology: 'Prajnaparadha (intellectual error), disregard for moral values',
        symptoms: ['Untimely superhuman strength', 'Unpredictable episodes', 'Differs from dosaja types', 'Self-destructive behavior (harm intent)'],
        prognosis: 'Sadhya (curable) if affection intent; Asadhya if harm intent',
        treatment: 'Mantra, religious rites, spiritual counseling'
      },
      {
        name: 'Bhutonmada',
        sanskrit: 'भूतोन्माद',
        etiology: 'Spiritual disturbance, ancestral issues, external entity influence',
        symptoms: ['Behavioral changes', 'Speaking in different voices', 'Unusual strength', 'Sleep disturbance', 'Fear'],
        prognosis: 'Variable - depends on entity and patient strength',
        treatment: 'Mantra therapy, spiritual counseling, religious rituals, protective herbs'
      },
      {
        name: 'Apsamara Unmada',
        sanskrit: 'अपस्मार उन्माद',
        etiology: 'Progression of untreated apasmara (epilepsy) to psychiatric symptoms',
        symptoms: ['Epilepsy with psychiatric features', 'Memory loss', 'Behavioral changes', 'Cognitive decline'],
        prognosis: 'Krichchrasadhya (difficult to treat)',
        treatment: 'Brahmi, Shankhapushpi, Jatamansi, comprehensive neurological support'
      },
      {
        name: 'Vatika Unmada with Insomnia',
        sanskrit: 'वातिक उन्माद अनिद्रा',
        etiology: 'Vata aggravation with severe sleep deprivation',
        symptoms: ['Complete insomnia', 'Restlessness', 'Talking excessively', 'Wandering', 'Hallucinations'],
        prognosis: 'Sadhya (curable) if treated early',
        treatment: 'Jatamansi, Brahmi, Tagara, warm milk, Shirodhara, regular sleep routine'
      },
      {
        name: 'Paittika Unmada with Aggression',
        sanskrit: 'पैत्तिक उन्माद क्रोध',
        etiology: 'Pitta aggravation with uncontrollable anger',
        symptoms: ['Violent behavior', 'Self-harm', 'Harm to others', 'Burning eyes', 'Red face', 'Excessive sweating'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Shirodhara with cooling oils, Brahmi, Shankhapushpi, cool environment, anger management'
      },
      {
        name: 'Kaphaja Unmada with Depression',
        sanskrit: 'कफज उन्माद अवसाद',
        etiology: 'Kapha aggravation with emotional withdrawal',
        symptoms: ['Social withdrawal', 'Excessive sleep', 'Loss of interest', 'Weight gain', 'Lethargy', 'Crying spells'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Vacha, Brahmi, Trikatu, exercise, social engagement, light diet'
      },
      {
        name: 'Unmada with Hallucinations',
        sanskrit: 'उन्माद भ्रम',
        etiology: 'Severe dosha vitiation affecting perception',
        symptoms: ['Visual hallucinations', 'Auditory hallucinations', 'Paranoia', 'Delusions', 'Fear'],
        prognosis: 'Krichchrasadhya (difficult)',
        treatment: 'Brahmi Ghrita, Shirodhara, nasya, comprehensive psychiatric support'
      },
      {
        name: 'Unmada with Memory Loss',
        sanskrit: 'उन्माद स्मृतिनाश',
        etiology: 'Dosha vitiation affecting smriti (memory) faculty',
        symptoms: ['Progressive memory loss', 'Confusion', 'Disorientation', 'Identity disturbance', 'Cognitive decline'],
        prognosis: 'Krichchrasadhya (difficult)',
        treatment: 'Brahmi, Shankhapushpi, Medhya rasayana, cognitive stimulation, structured routine'
      },
      {
        name: 'Griha Unmada',
        sanskrit: 'गृह उन्माद',
        etiology: 'Domestic stress, family conflict, environmental factors',
        symptoms: ['Anxiety', 'Insomnia', 'Appetite changes', 'Mood swings', 'Social dysfunction'],
        prognosis: 'Sadhya (curable) with environmental change',
        treatment: 'Counseling, family therapy, stress management, adaptogenic herbs, routine establishment'
      },
      {
        name: 'Vishada Unmada',
        sanskrit: 'विषाद उन्माद',
        etiology: 'Chronic grief, loss, depression, emotional trauma',
        symptoms: ['Persistent sadness', 'Loss of interest', 'Social withdrawal', 'Insomnia or hypersomnia', 'Appetite changes', 'Fatigue', 'Hopelessness'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Ashwagandha, Brahmi, Shankhapushpi, counseling, social support, sattvic diet, regular routine'
      },
      {
        name: 'Bhaya Unmada',
        sanskrit: 'भय उन्माद',
        etiology: 'Severe fear, phobia, trauma, PTSD',
        symptoms: ['Extreme fear', 'Panic attacks', 'Avoidance behavior', 'Hypervigilance', 'Insomnia', 'Startle response'],
        prognosis: 'Sadhya (curable) with gradual desensitization',
        treatment: 'Jatamansi, Brahmi, Ashwagandha for nervous system support. Gradual exposure therapy. Calming environment.'
      },
      {
        name: 'Krodha Unmada',
        sanskrit: 'क्रोध उन्माद',
        etiology: 'Chronic anger, frustration, irritability, pitta aggravation',
        symptoms: ['Uncontrollable anger', 'Aggressive behavior', 'Self-harm', 'Red eyes', 'Excessive sweating', 'Insomnia'],
        prognosis: 'Sadhya (curable) with anger management',
        treatment: 'Shirodhara with cooling oils, Brahmi, Shankhapushpi, pitta-pacifying diet, anger management techniques'
      },
      {
        name: 'Shoka Unmada',
        sanskrit: 'शोक उन्माद',
        etiology: 'Grief, loss, bereavement, emotional trauma',
        symptoms: ['Persistent grief', 'Crying spells', 'Loss of appetite', 'Insomnia', 'Social withdrawal', 'Physical wasting'],
        prognosis: 'Sadhya (curable) with grief counseling',
        treatment: 'Ashwagandha, Brahmi, Shankhapushpi, grief counseling, social support, nourishing diet, gentle routine'
      },
      {
        name: 'Vataja Unmada',
        sanskrit: 'वातज उन्माद',
        etiology: 'Vata-aggravating factors: irregular routine, stress, anxiety, sleep deprivation',
        symptoms: ['Hyperactivity', 'Emotional lability', 'Psychomotor agitation', 'Talkativeness', 'Inappropriate behavior', 'Irregular patterns'],
        prognosis: 'Sadhya (curable) with vata-pacifying treatment',
        treatment: 'Snehana (oleation), basti (enema), Brahmi Ghrita, vata-pacifying herbs, regular routine'
      },
      {
        name: 'Paittika Unmada',
        sanskrit: 'पैत्तिक उन्माद',
        etiology: 'Pitta-aggravating factors: anger, heat exposure, hot foods, frustration',
        symptoms: ['Anger', 'Aggression', 'Self-destructive behavior', 'Red eyes', 'Excessive sweating', 'Irritability'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Virechana (purgation), cold therapy, Brahmi, Shankhapushpi, pitta-pacifying diet'
      },
      {
        name: 'Kaphaja Unmada',
        sanskrit: 'कफज उन्माद',
        etiology: 'Kapha-aggravating factors: excess sleep, sedentary lifestyle, heavy foods',
        symptoms: ['Psychomotor retardation', 'Social withdrawal', 'Depressive features', 'Excessive sleep', 'Loss of interest', 'Heaviness'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Vamana (emesis), fasting, light diet, pungent herbs, stimulating activities'
      },
      {
        name: 'Sannipatika Unmada',
        sanskrit: 'सन्निपातिक उन्माद',
        etiology: 'All three doshas vitiated simultaneously, chronic mental illness',
        symptoms: ['Mixed symptoms of all three doshas', 'Complex presentation', 'Treatment resistance', 'Severe debility'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only, palliative measures, comfort care'
      }
    ],
    importantVerses: [
      '7.3: Five types of unmada - vataja, paittika, kaphaja, sannipatika, agantuja',
      '7.4: Hridaya as seat of consciousness',
      '7.5: Definition with eight faculties affected',
      '7.6: Vata unmada features - hyperactivity, emotional lability',
      '7.7: Pitta unmada features - anger, aggression, self-destructive',
      '7.8: Kapha unmada features - withdrawal, lethargy, depression',
      '7.9: Sannipatika unmada is incurable',
      '7.10: Agantuja unmada from prajnaparadha',
      '7.11: Comprehensive definition of unmada',
      '7.12: Vata unmada treatment - snehana, basti',
      '7.13: Pitta unmada treatment - virechana',
      '7.14: Kapha unmada treatment - vamana',
      '7.15: Sannipatika unmada - supportive care only',
      '7.16: Agantuja unmada - mantra therapy',
      '7.19: Rational explanation of psychiatric illness',
      '7.21: Prajnaparadha as root cause',
      '7.22: Shirodhara for calming the mind',
      '7.23: Nasya (nasal therapy) for mental disorders',
      '7.24: Medhya rasayana (brain tonics) for cognitive support',
      '7.25: Sleep as primary treatment',
      '7.26: Brahmi Ghrita as primary internal medicine',
      '7.27: Vacha, Shankhapushpi, Jatamansi as primary herbs',
      '7.28: Sattva-promoting measures for mental clarity',
      '7.29: Manovahani srotas obstruction causes mental disruption',
      '7.30: Psychological interventions: assault, binding, confinement',
      '7.31: Safety during acute episodes',
      '7.32: Modern correlations: Vataja-mania, Pitta-psychosis, Kaphaja-depression',
      '7.33: Sattvic diet promotes mental clarity and peace',
      '7.34: Regular routine and spiritual practices prevent recurrence',
      '7.35: Patient safety during acute episodes',
      '7.36: Family education about disease management',
      '7.37: Integration with modern psychiatry',
      '7.38: Regular follow-up and medication compliance',
      '7.39: Stress management and lifestyle modification',
      '7.40: Avoidance of prajnaparadha is preventive'
    ],
    clinicalApplications: [
      'Psychiatric disorders have both somatic and psychic components - treat both',
      'Single-dosha types are curable with proper purification and pacification',
      'Agantuja unmada prognosis depends on entity intent',
      'Prajnaparadha (intellectual error) is the root cause - address lifestyle and behavior',
      'Safety measures (binding, confinement) may be necessary during acute episodes',
      'Assess all eight mental faculties for comprehensive diagnosis',
      'Five types: Vataja, Paittika, Kaphaja, Sannipatika, Agantuja',
      'Hridaya (heart/mind) is the seat of consciousness',
      'Dosha perversion of hridaya causes psychiatric illness',
      'Vata unmada: hyperactivity, emotional lability, psychomotor agitation',
      'Pitta unmada: anger, aggression, self-destructive behavior',
      'Kapha unmada: psychomotor retardation, withdrawal, depressive features',
      'Sannipatika unmada: incurable, all three doshas involved',
      'Agantuja unmada: caused by prajnaparadha (intellectual error)',
      'Bio-purification (snehana, swedana, vamana, virechana, basti) for dosaja types',
      'Nasya, dhooma, anjana for local therapies',
      'Psychological interventions: assault, binding, confinement, frightening, shock',
      'Mantra therapy for agantuja unmada',
      'Sattvic lifestyle is essential for prevention and management',
      'Brahmi Ghrita is the primary internal medicine for all unmada types',
      'Shirodhara with medicated oils provides calming effect',
      'Patient safety is paramount during acute episodes',
      'Family education about disease management and emergency measures',
      'Integration with modern psychiatry for comprehensive care',
      'Regular follow-up and medication compliance are essential',
      'Stress management and lifestyle modification prevent recurrence',
      'Avoidance of prajnaparadha (intellectual error) is preventive',
      'Supportive environment and social engagement aid recovery',
      'Dietary management: sattvic diet, avoid rajasic and tamasic foods',
      'Sleep hygiene and regular routine are important',
      'Gradual return to normal activities after acute episode resolution',
      'Rajas and tamas (psychic doshas) are involved - increase sattva through lifestyle',
      'Manovahani srotas obstruction causes mental function disruption',
      'Nasya directly reaches manovahani srotas - highly effective',
      'Psychological interventions: assault, binding, confinement, frightening, shock',
      'Safety is paramount during acute episodes',
      'Modern correlations: Vataja-mania, Pitta-psychosis, Kaphaja-depression',
      'Brahmi Ghrita is the primary internal medicine for all unmada types',
      'Vacha, Shankhapushpi, Jatamansi form the cornerstone of medhya therapy',
      'Shirodhara with medicated oils calms the mind',
      'Medhya rasayana nourishes brain tissue and restores cognitive functions',
      'Adequate sleep is essential for mental recovery',
      'Sattvic diet promotes mental clarity and peace',
      'Regular routine and spiritual practices prevent recurrence',
      'Patient safety during acute episodes may require binding or confinement',
      'Family education about disease management and emergency measures',
      'Integration with modern psychiatry for comprehensive care',
      'Regular follow-up and medication compliance are essential',
      'Stress management and lifestyle modification prevent recurrence',
      'Avoidance of prajnaparadha (intellectual error) is preventive',
      'Supportive environment and social engagement aid recovery',
      'Sleep hygiene and regular routine are important',
      'Cognitive stimulation exercises support recovery',
      'Anger management techniques for pitta unmada',
      'Grief counseling for shoka unmada',
      'Gradual desensitization for bhaya unmada',
      'Environmental change for griha unmada',
      'Rajas and tamas (psychic doshas) are involved - increase sattva through lifestyle',
      'Manovahani srotas obstruction causes mental function disruption',
      'Nasya directly reaches manovahani srotas - highly effective',
      'Psychological interventions: assault, binding, confinement, frightening, shock',
      'Safety is paramount during acute episodes',
      'Modern correlations: Vataja-mania, Pitta-psychosis, Kaphaja-depression',
      'Brahmi Ghrita is the primary internal medicine for all unmada types',
      'Vacha, Shankhapushpi, Jatamansi form the cornerstone of medhya therapy',
      'Shirodhara with medicated oils calms the mind',
      'Medhya rasayana nourishes brain tissue and restores cognitive functions',
      'Adequate sleep is essential for mental recovery',
      'Sattvic diet promotes mental clarity and peace',
      'Regular routine and spiritual practices prevent recurrence',
      'Patient safety during acute episodes may require binding or confinement',
      'Family education about disease management and emergency measures',
      'Integration with modern psychiatry for comprehensive care',
      'Regular follow-up and medication compliance are essential',
      'Stress management and lifestyle modification prevent recurrence',
      'Avoidance of prajnaparadha (intellectual error) is preventive',
      'Supportive environment and social engagement aid recovery',
      'Sleep hygiene and regular routine are important',
      'Cognitive stimulation exercises support recovery',
      'Anger management techniques for pitta unmada',
      'Grief counseling for shoka unmada',
      'Gradual desensitization for bhaya unmada',
      'Environmental change for griha unmada',
      'Single-dosha types are curable with proper purification and pacification',
      'Agantuja unmada prognosis depends on entity intent',
      'Prajnaparadha (intellectual error) is the root cause - address lifestyle and behavior',
      'Safety measures (binding, confinement) may be necessary during acute episodes',
      'Assess all eight mental faculties for comprehensive diagnosis',
      'Five types: Vataja, Paittika, Kaphaja, Sannipatika, Agantuja',
      'Hridaya (heart/mind) is the seat of consciousness',
      'Dosha perversion of hridaya causes psychiatric illness',
      'Vata unmada: hyperactivity, emotional lability, psychomotor agitation',
      'Pitta unmada: anger, aggression, self-destructive behavior',
      'Kapha unmada: psychomotor retardation, withdrawal, depressive features',
      'Sannipatika unmada: incurable, all three doshas involved',
      'Agantuja unmada: caused by prajnaparadha (intellectual error)',
      'Bio-purification (snehana, swedana, vamana, virechana, basti) for dosaja types',
      'Nasya, dhooma, anjana for local therapies',
      'Psychological interventions: assault, binding, confinement, frightening, shock',
      'Mantra therapy for agantuja unmada',
      'Sattvic lifestyle is essential for prevention and management',
      'Brahmi Ghrita is the primary internal medicine for all unmada types',
      'Shirodhara with medicated oils provides calming effect',
      'Patient safety is paramount during acute episodes',
      'Family education about disease management and emergency measures',
      'Integration with modern psychiatry for comprehensive care',
      'Regular follow-up and medication compliance are essential',
      'Stress management and lifestyle modification prevent recurrence',
      'Avoidance of prajnaparadha (intellectual error) is preventive',
      'Supportive environment and social engagement aid recovery',
      'Dietary management: sattvic diet, avoid rajasic and tamasic foods'
    ]
  },

  // ===== CHAPTER 8: APASMARA NIDANA =====
  {
    id: 'nidana-8',
    sthana: 'Nidana Sthana',
    chapterNumber: 8,
    name: 'Apasmara Nidana',
    sanskrit: 'अपस्मारनिदानम् अध्यायः',
    english: 'Diagnosis of Epilepsy',
    summary: 'Diagnosis of Apasmara (epilepsy) covering 4 dosha types plus agantu. Pathogenesis involves dosha pervasion of hridaya (heart/seat of consciousness) disrupting memory, intellect, and psychic faculties. Characterized by occasional loss of consciousness with aberrant activities. Six stages of pathogenesis (Shatkriyakala) enable early intervention.',
    keyConcepts: [
      'Four types: Vataja, Pittaja, Kaphaja, Sannipatika + Agantu (exogenous)',
      'Hridaya (heart) as seat of consciousness - doshas pervade it',
      'Disruption of memory, intellect, and psychic faculties',
      'Aura (prodromal) symptoms are type-specific',
      'Sannipatika is incurable; single-dosha types are curable',
      'Six stages of pathogenesis (Shatkriyakala)',
      'Epilepsy can be secondary to other diseases (nidanarthakara roga)',
      'Treatment should not provoke other diseases'
    ],
    shlokas: [
      {
        number: '8.5',
        sanskrit: 'अपस्मारः स्मृतिबुद्धिभ्रंशेन सह विकृतचेष्टः',
        translation: 'Apasmara is characterized by occasional loss of consciousness associated with aberrant activities due to perversion of memory, intellect, and other psychic faculties.',
        commentary: 'Core definition emphasizing the episodic nature and cognitive component.'
      },
      {
        number: '8.3',
        sanskrit: 'चत्वारो अपस्माराः - वातपित्तकफसन्निपातजाः',
        translation: 'There are four types of apasmara caused by vata, pitta, kapha, and sannipatika.',
        commentary: 'Classification guides prognosis and treatment selection.'
      },
      {
        number: '8.23',
        sanskrit: 'यः चिकित्सा एकम् व्याधिं शमयति अन्यम् उत्पादयति - सा शुद्धा न भवति',
        translation: 'A therapy that alleviates one disease but provokes another is not ideal. The ideal therapy pacifies disease without provoking any other.',
        commentary: 'Treatment principle applicable to all conditions - aim for comprehensive, balanced therapy.'
      },
      {
        number: '8.17',
        sanskrit: 'निदानार्थकरो रोगः - अपस्मारो हि अन्यान् रोगान् करोति',
        translation: 'Apasmara can be secondary to other diseases (nidanarthakara roga). Epilepsy can cause other diseases and other diseases can cause epilepsy.',
        commentary: 'Bidirectional relationship between epilepsy and other conditions.'
      },
      {
        number: '8.3',
        sanskrit: 'अपस्मारः चतुर्विधः - वातजः पैत्तिकः श्लैष्मिकः सन्निपातिकः',
        translation: 'Apasmara is of four types: vataja, paittika, kaphaja, and sannipatika.',
        commentary: 'Classification based on dosha predominance guides treatment and prognosis.'
      },
      {
        number: '8.5',
        sanskrit: 'अपस्मारः स्मृतिनाशः - विभ्रमः संज्ञाज्ञानस्य',
        translation: 'Apasmara is characterized by loss of memory (smriti-nasha) and confusion of consciousness (sanjna-jnana-vibhrama).',
        commentary: 'Core definition - epilepsy involves temporary disruption of consciousness and memory.'
      },
      {
        number: '8.6',
        sanskrit: 'दोषाः हृदयम् आविश्य संज्ञां मोहयन्ति',
        translation: 'Vitiated doshas invade hridaya (seat of consciousness) and cause loss of awareness.',
        commentary: 'Pathogenesis - dosha perversion of hridaya disrupts consciousness.'
      },
      {
        number: '8.7',
        sanskrit: 'वातजे अपस्मारे - बह्वावृत्तिः अनियमित चेष्टा फेनम्',
        translation: 'In vataja apasmara: frequent episodes, irregular limb movements, frothy vomit.',
        commentary: 'Vata epilepsy has most frequent episodes with irregular movements.'
      },
      {
        number: '8.8',
        sanskrit: 'पैत्तिके अपस्मारे - दाहः ज्वरः तृष्णा',
        translation: 'In pittaja apasmara: burning sensation, fever, thirst, stertorous breathing.',
        commentary: 'Pitta epilepsy presents with heat-related symptoms.'
      },
      {
        number: '8.9',
        sanskrit: 'श्लैष्मिके अपस्मारे - स्तम्भः निद्रा प्रलापः',
        translation: 'In kaphaja apasmara: stiffness, excessive sleep, salivation, gradual loss of consciousness.',
        commentary: 'Kapha epilepsy has least frequent episodes but prolonged loss of consciousness.'
      },
      {
        number: '8.10',
        sanskrit: 'सन्निपातिके अपस्मारे सर्वलिङ्गम् असाध्यम्',
        translation: 'In sannipatika apasmara, all symptoms are present and it is incurable.',
        commentary: 'Combined dosha involvement makes treatment impossible - incurable.'
      },
      {
        number: '8.11',
        sanskrit: 'अपस्मारे नस्यं प्रधानम्',
        translation: 'Nasya (nasal medication) is the primary treatment for apasmara.',
        commentary: 'Nasal therapy directly affects the brain and consciousness - primary treatment for epilepsy.'
      },
      {
        number: '8.12',
        sanskrit: 'अपस्मारे धूमपानं अञ्जनं च प्रधानम्',
        translation: 'Dhoomapana (fumigation) and anjana (collyrium) are primary treatments for apasmara.',
        commentary: 'These therapies directly affect the head region and consciousness.'
      },
      {
        number: '8.13',
        sanskrit: 'अपस्मारे बस्तिः प्रधानम्',
        translation: 'Basti (enema) is a primary treatment for apasmara.',
        commentary: 'Basti pacifies vata and removes toxins from the body.'
      },
      {
        number: '8.14',
        sanskrit: 'अपस्मारे रसायनं प्रधानम्',
        translation: 'Rasayana (rejuvenation) therapy is primary for preventing recurrence of apasmara.',
        commentary: 'Rasayana therapy strengthens the nervous system and prevents recurrence.'
      },
      {
        number: '8.15',
        sanskrit: 'अपस्मारे मन्त्रौषधियोगाः प्रधानाः',
        translation: 'Mantra therapy and medicinal herbs are primary treatments for agantu apasmara.',
        commentary: 'Exogenous epilepsy responds to spiritual and herbal interventions.'
      },
      {
        number: '8.16',
        sanskrit: 'अपस्मारे सात्विकं जीवनम् हितम्',
        translation: 'Sattvic lifestyle is beneficial for apasmara patients.',
        commentary: 'Lifestyle modification is crucial for preventing recurrence.'
      },
      {
        number: '8.18',
        sanskrit: 'अपस्मारे वचा प्रधानम् - मेध्या स्मृतिकरी',
        translation: 'Vacha (Acorus calamus) is primary in apasmara - it promotes intellect and memory.',
        commentary: 'Vacha is the most important herb for epilepsy - it clears mental channels and restores consciousness.'
      },
      {
        number: '8.19',
        sanskrit: 'अपस्मारे ब्राह्मी प्रशस्तम् - मेध्या रसायनम्',
        translation: 'Brahmi is praised in apasmara - it is a brain tonic and rejuvenator.',
        commentary: 'Brahmi strengthens the nervous system and prevents recurrence of seizures.'
      },
      {
        number: '8.20',
        sanskrit: 'अपस्मारे शंखपुष्पी प्रशस्तम् - मेध्या स्मृतिकरी',
        translation: 'Shankhapushpi is praised in apasmara - it promotes intellect and memory.',
        commentary: 'Shankhapushpi calms the mind and supports cognitive functions disrupted by epilepsy.'
      },
      {
        number: '8.21',
        sanskrit: 'अपस्मारे जटामांसी प्रशस्तम् - वातहरम्',
        translation: 'Jatamansi is praised in apasmara - it pacifies vata.',
        commentary: 'Jatamansi has neuroprotective properties and helps prevent seizure recurrence.'
      },
      {
        number: '8.22',
        sanskrit: 'अपस्मारे घृतं प्रशस्तम् - बुद्धिवर्धकम्',
        translation: 'Ghee is praised in apasmara - it promotes intellect.',
        commentary: 'Medicated ghee (Brahmi Ghrita) is the primary internal medicine for all types of apasmara.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis (Shatkriyakala)',
        content: 'Sanchaya: Mild psychic disturbance with dosha accumulation. Prakopa: Doshas vitiate, reside in vessels above heart in dormant state. Prasara: Emotional triggers cause upward spread through dhamanis. Sthanasamshraya: Doshas take pathways of sense/locomotor organs, producing aura. Vyakta: Full clinical features appear. Bheda: Dominant dosha determines clinical type.',
        clinicalRelevance: 'Understanding the six stages enables early intervention during sanchaya/prakopa stages.'
      },
      {
        title: 'Aura Symptoms by Type',
        content: 'Vataja: Vision of unstable, fickle, dry objects; abnormal faces. Pittaja: Vision of bleeding, terrifying, burning objects. Kaphaja: Vision of white, heavy, unctuous objects. Common: Eyebrow twitching, eye movements, auditory hallucinations, salivation, confusion.',
        clinicalRelevance: 'Aura recognition enables differential diagnosis and early treatment.'
      },
      {
        title: 'Treatment Principle',
        content: 'Ideal therapy should pacify disease without provoking another. Strong elimination and pacification therapies based on predominant dosha. Nasya (nasal medication), dhooma (fumigation), anjana (collyrium), basti (enema). Avoid treatments that provoke other diseases.',
        clinicalRelevance: 'Balanced approach prevents treatment-induced complications.'
      },
      {
        title: 'Hridaya (Heart) as Seat of Consciousness',
        content: 'Hridaya is the seat of manas (mind), buddhi (intellect), ahamkara (ego), and chetana (consciousness). When doshas pervade hridaya, they disrupt these faculties causing apasmara. The heart is connected to the brain through channels (manovahani srotas). Treatment aims to clear these channels and restore normal consciousness.',
        clinicalRelevance: 'Understanding hridaya as the seat of consciousness guides treatment toward heart and brain nourishment.'
      },
      {
        title: 'Apasmara and Modern Epilepsy',
        content: 'Vataja apasmara correlates with grand mal seizures (tonic-clonic). Pittaja correlates with temporal lobe epilepsy with automatisms. Kaphaja correlates with absence seizures (petit mal). Sannipatika correlates with refractory epilepsy. Agantu correlates with secondary epilepsy (post-traumatic, post-infectious). Treatment should integrate Ayurvedic management with modern anti-epileptic drugs when needed.',
        clinicalRelevance: 'Understanding modern correlations enables appropriate investigations and integrative management.'
      },
      {
        title: 'Safety During Episodes',
        content: 'During apasmara episodes: place patient in recovery position, clear surrounding objects, do not restrain, do not put objects in mouth, time the episode, note features for diagnosis. After episode: allow recovery, provide sattvic food, document episode details. Emergency care for status epilepticus (continuous seizures >5 minutes) requires immediate medical attention.',
        clinicalRelevance: 'Patient safety is paramount - caregivers must be educated about episode management.'
      },
      {
        title: 'Prevention of Apasmara',
        content: 'Prevention through: sattvic lifestyle, regular routine, adequate sleep, stress management, avoiding triggers (flashing lights, sleep deprivation, alcohol). Early treatment of aura symptoms. Rasayana therapy for nervous system strengthening. Regular use of medhya herbs (Brahmi, Shankhapushpi, Vacha). Family education about disease management.',
        clinicalRelevance: 'Prevention is more effective than treatment - lifestyle modification and trigger avoidance are essential.'
      }
    ],
    doshaDiscussion: [
      'Vataja: Most frequent episodes, irregular limb movements, frothy vomit, rapid loss/regain of consciousness',
      'Pittaja: Moderate frequency, stertorous breathing, rubbing/agitating on ground, rise in temperature, thirst',
      'Kaphaja: Least frequent, gradual loss/prolonged regain, excessive salivation, nausea, hypothermia',
      'Sannipatika: All symptoms combined - incurable'
    ],
    treatmentProtocols: [
      {
        condition: 'Single-dosha Apasmara',
        treatment: 'Strong elimination and pacification therapies based on predominant dosha. Nasya (nasal medication), dhooma (fumigation), anjana (collyrium), basti (enema).',
        herbs: ['Vacha', 'Brahmi', 'Shankhapushpi', 'Jatamansi', 'Kushtha'],
        dosage: 'As directed',
        duration: 'Long-term management',
        precautions: ['Ensure patient safety during episodes', 'Avoid known triggers']
      },
      {
        condition: 'Prevention of Recurrence',
        treatment: 'Rasayana therapy, stress management, regular routine, avoid triggers, spiritual counseling.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Ashwagandha', 'Jatamansi'],
        dosage: 'Prophylactic dose',
        duration: 'Lifelong',
        precautions: ['Regular monitoring', 'Avoid sleep deprivation']
      },
      {
        condition: 'Vataja Apasmara',
        treatment: 'Oleation, basti, nasya with vata-pacifying oils. Brahmi Ghrita for internal use. Avoid vata-aggravating factors.',
        herbs: ['Vacha', 'Brahmi', 'Jatamansi', 'Ashwagandha', 'Shankhapushpi'],
        dosage: 'Brahmi Ghrita 10ml twice daily with warm water',
        duration: 'Long-term',
        precautions: ['Avoid vata-aggravating factors', 'Regular routine', 'Patient safety during episodes']
      },
      {
        condition: 'Pittaja Apasmara',
        treatment: 'Cold therapy, purgation, nasya with pitta-pacifying oils. Avoid pitta-aggravating factors.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Amalaki', 'Guduchi'],
        dosage: 'Brahmi Ghrita 10ml twice daily',
        duration: 'Long-term',
        precautions: ['Avoid pitta-aggravating factors', 'Cool environment', 'Patient safety']
      },
      {
        condition: 'Kaphaja Apasmara',
        treatment: 'Emesis, fomentation, nasya with kapha-pacifying herbs. Light diet, exercise, mental stimulation.',
        herbs: ['Vacha', 'Brahmi', 'Trikatu', 'Shankhapushpi', 'Jatamansi'],
        dosage: 'Vacha Churna 500mg with honey, twice daily',
        duration: 'Long-term',
        precautions: ['Avoid kapha-aggravating factors', 'Active lifestyle', 'Patient safety']
      },
      {
        condition: 'Apasmara with Aura',
        treatment: 'When aura is recognized, immediate intervention with nasya (Vacha or Brahmi). Calm environment, safe position. Prevent injury during episode.',
        herbs: ['Vacha', 'Brahmi', 'Shankhapushpi', 'Jatamansi'],
        dosage: 'Vacha Nasya 2-3 drops in each nostril at aura onset',
        duration: 'As needed during aura',
        precautions: ['Safe position', 'Prevent injury', 'Calm environment', 'Time the episode']
      },
      {
        condition: 'Apasmara with Status Epilepticus',
        treatment: 'Emergency management: Vacha Nasya, Brahmi Ghrita, supportive care. Monitor breathing, prevent injury. Seek immediate medical attention.',
        herbs: ['Vacha', 'Brahmi', 'Jatamansi', 'Ashwagandha'],
        dosage: 'Vacha Nasya immediately, Brahmi Ghrita 10ml',
        duration: 'Emergency - until episode stops',
        precautions: ['Emergency situation', 'Monitor breathing', 'Prevent injury', 'Medical attention']
      },
      {
        condition: 'Pediatric Apasmara',
        treatment: 'Gentle approach: Brahmi Ghrita in small doses, nasya with ghee, sattvic diet, regular routine. Avoid strong measures.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Jatamansi', 'Ashwagandha'],
        dosage: 'Brahmi Ghrita 2-5ml twice daily with warm milk',
        duration: 'Long-term',
        precautions: ['Gentle measures', 'Regular routine', 'School safety', 'Emotional support']
      },
      {
        condition: 'Apasmara with Cognitive Decline',
        treatment: 'When apasmara leads to memory loss and cognitive decline, use Medhya rasayana. Brahmi, Shankhapushpi, and Mandukaparni. Cognitive stimulation exercises. Structured routine.',
        herbs: ['Brahmi', 'Shankhapushpi', 'Mandukaparni', 'Yashtimadhu', 'Guduchi'],
        dosage: 'Brahmi Ghrita 10ml twice daily with warm water',
        duration: 'Long-term - 6-12 months',
        precautions: ['Cognitive stimulation', 'Structured routine', 'Patient compliance', 'Regular assessment']
      },
      {
        condition: 'Apasmara with Sleep Disturbance',
        treatment: 'When apasmara presents with severe sleep disturbance, use Jatamansi, Tagara, and Brahmi. Warm milk with nutmeg. Regular sleep routine. Avoid stimulants.',
        herbs: ['Jatamansi', 'Tagara', 'Brahmi', 'Ashwagandha', 'Shankhapushpi'],
        dosage: 'Tagara Churna 500mg with warm milk at bedtime',
        duration: 'Until sleep normalizes',
        precautions: ['Regular sleep routine', 'Avoid caffeine', 'Calming bedtime routine', 'Dark quiet room']
      },
      {
        condition: 'Apasmara with Anxiety',
        treatment: 'When apasmara presents with anxiety, use Jatamansi, Brahmi, and Shankhapushpi. Ashwagandha for adaptogenic support. Regular meditation and pranayama.',
        herbs: ['Jatamansi', 'Brahmi', 'Shankhapushpi', 'Ashwagandha', 'Tagara'],
        dosage: 'Jatamansi Churna 500mg with warm milk, twice daily',
        duration: 'Until anxiety subsides',
        precautions: ['Regular routine', 'Avoid stimulants', 'Calming environment', 'Stress management']
      }
    ],
    dietaryGuidelines: [
      'Pathya (Beneficial): Sattvic diet - fresh, light, nourishing foods. Old rice, wheat, mung dal, milk, ghee',
      'Pathya: Sweet fruits (banana, mango, grapes), sweet vegetables (beetroot, carrot, pumpkin)',
      'Pathya: Warm milk with brahmi, shankhapushpi, or ashwagandha before bed',
      'Pathya: Regular meal times, eating in calm environment, mindful eating',
      'Pathya: Brahmi, Shankhapushpi, Vacha as daily supplements',
      'Apathya (Avoid): Rajasic foods - excessive spice, sour, salty, fermented, stale foods',
      'Apathya: Tamasic foods - meat, alcohol, tobacco, processed foods, overcooked food',
      'Apathya: Irregular routine, sleep deprivation, excessive stimulation, flashing lights',
      'Apathya: Emotional disturbance, stress, anxiety, anger, fear',
      'Apathya: Excessive sexual activity, night vigils, irregular sleep, isolation',
      'Apathya: Swimming alone, heights, driving during active disease'
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Apasmara',
        sanskrit: 'वातज अपस्मार',
        etiology: 'Vata-aggravating factors, emotional trauma, tissue depletion',
        symptoms: ['Most frequent episodes', 'Irregular limb contractions', 'Frothy vomit', 'Red/rough nails/eyes/skin', 'Vision of unstable dry objects', 'Rapid loss/regain of consciousness'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Oleation, basti, nasya, vata-pacifying measures'
      },
      {
        name: 'Pittaja Apasmara',
        sanskrit: 'पैत्तिक अपस्मार',
        etiology: 'Pitta-aggravating factors, anger, heat exposure',
        symptoms: ['Stertorous breathing', 'Dragging movements', 'Green/yellow discoloration', 'Rise in temperature', 'Vision of terrifying burning objects', 'Moderate frequency'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Cold therapy, purgation, pitta-pacifying measures'
      },
      {
        name: 'Kaphaja Apasmara',
        sanskrit: 'कफज अपस्मार',
        etiology: 'Kapha-aggravating factors, excess sleep, sedentary lifestyle',
        symptoms: ['Least frequent episodes', 'Gradual loss/prolonged regain', 'Excessive salivation', 'Whitish discoloration', 'Vision of white heavy objects', 'Nausea'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Emesis, fomentation, kapha-pacifying measures'
      },
      {
        name: 'Sannipatika Apasmara',
        sanskrit: 'सन्निपातिक अपस्मार',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['All dosha symptoms combined', 'Complex presentation'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      },
      {
        name: 'Agantu Apasmara',
        sanskrit: 'आगन्तुज अपस्मार',
        etiology: 'Exogenous causes, trauma, toxins',
        symptoms: ['Sudden onset', 'No typical aura', 'Associated with specific triggers'],
        prognosis: 'Sadhya (curable) when cause is addressed',
        treatment: 'Address specific cause, detoxification, spiritual measures'
      },
      {
        name: 'Garbha Apasmara',
        sanskrit: 'गर्भ अपस्मार',
        etiology: 'Congenital epilepsy, maternal factors during pregnancy, genetic predisposition',
        symptoms: ['Epilepsy from early childhood', 'Frequent seizures', 'Developmental delay', 'Cognitive impairment'],
        prognosis: 'Krichchrasadhya (difficult) - requires lifelong management',
        treatment: 'Brahmi Ghrita, gentle nasya, supportive care, special education, family support'
      },
      {
        name: 'Vaya Apasmara',
        sanskrit: 'वयस् अपस्मार',
        etiology: 'Age-related onset, degenerative changes, vascular factors',
        symptoms: ['Late-onset seizures', 'Cognitive decline', 'Memory loss', 'Behavioral changes'],
        prognosis: 'Krichchrasadhya (difficult)',
        treatment: 'Medhya rasayana, Brahmi, Shankhapushpi, neuroprotection, safety measures'
      },
      {
        name: 'Visha Apasmara',
        sanskrit: 'विष अपस्मार',
        etiology: 'Toxin exposure, snake bite, drug reaction, environmental toxins',
        symptoms: ['Acute onset', 'Seizures with toxin exposure', 'Altered consciousness', 'Systemic toxicity'],
        prognosis: 'Sadhya (curable) with prompt detoxification',
        treatment: 'Vishaghna herbs, detoxification, emergency management, supportive care'
      },
      {
        name: 'Marmabhighata Apasmara',
        sanskrit: 'मर्माभिघात अपस्मार',
        etiology: 'Trauma to vital points (marma), head injury, brain damage',
        symptoms: ['Post-traumatic seizures', 'Focal neurological signs', 'Memory loss', 'Personality changes'],
        prognosis: 'Krichchrasadhya (difficult) to Asadhya depending on injury severity',
        treatment: 'Neuroprotection, rasayana therapy, rehabilitation, safety measures'
      },
      {
        name: 'Krimija Apasmara',
        sanskrit: 'कृमिज अपस्मार',
        etiology: 'Neurocysticercosis, parasitic infection affecting brain',
        symptoms: ['Seizures with systemic infection', 'Headache', 'Visual disturbances', 'Fever'],
        prognosis: 'Sadhya (curable) with anti-parasitic treatment',
        treatment: 'Krimighna herbs, anti-parasitic measures, seizure management'
      },
      {
        name: 'Apasmara with Status Epilepticus',
        sanskrit: 'अपस्मार महामारी',
        etiology: 'Prolonged seizure activity, treatment failure, complication of epilepsy',
        symptoms: ['Continuous seizures', 'Loss of consciousness', 'Respiratory distress', 'Hyperthermia'],
        prognosis: 'Emergency - requires immediate intervention',
        treatment: 'Emergency management: Vacha Nasya, Brahmi Ghrita, supportive care, medical attention'
      },
      {
        name: 'Apasmara with Cognitive Decline',
        sanskrit: 'अपस्माद बुद्धिनाश',
        etiology: 'Recurrent seizures causing brain damage, untreated epilepsy',
        symptoms: ['Progressive memory loss', 'Learning difficulties', 'Behavioral changes', 'Social dysfunction'],
        prognosis: 'Krichchrasadhya (difficult)',
        treatment: 'Medhya rasayana, Brahmi, Shankhapushpi, cognitive rehabilitation, structured support'
      },
      {
        name: 'Night-time Apasmara',
        sanskrit: 'रात्रि अपस्मार',
        etiology: 'Sleep-related seizures, vata aggravation during night',
        symptoms: ['Seizures during sleep', 'Nocturnal awakening', 'Morning confusion', 'Bedwetting'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Regular sleep routine, Brahmi Ghrita at bedtime, avoid sleep deprivation, Jatamansi'
      },
      {
        name: 'Exercise-induced Apasmara',
        sanskrit: 'व्यायामज अपस्मार',
        etiology: 'Excessive physical exertion triggering seizures, overexertion',
        symptoms: ['Seizures during/after exercise', 'Fatigue', 'Muscle weakness', 'Dehydration'],
        prognosis: 'Sadhya (curable) with exercise modification',
        treatment: 'Moderate exercise, adequate hydration, rest, Brahmi Ghrita, avoid overexertion'
      },
      {
        name: 'Fever-induced Apasmara',
        sanskrit: 'ज्वरज अपस्मार',
        etiology: 'High fever triggering seizures, febrile seizures in children',
        symptoms: ['Seizures during fever', 'High temperature', 'Convulsions', 'Altered consciousness'],
        prognosis: 'Sadhya (curable) with fever management',
        treatment: 'Cold therapy, antipyretic herbs, fever management, Brahmi Ghrita, hydration'
      },
      {
        name: 'Light-induced Apasmara',
        sanskrit: 'प्रकाशज अपस्मार',
        etiology: 'Flashing lights, photosensitive epilepsy, visual triggers',
        symptoms: ['Seizures triggered by flashing lights', 'Visual aura', 'Eye strain', 'Headache'],
        prognosis: 'Sadhya (curable) with trigger avoidance',
        treatment: 'Avoid flashing lights, wear sunglasses, Brahmi Ghrita, regular routine'
      },
      {
        name: 'Stress-induced Apasmara',
        sanskrit: 'तनावज अपस्मार',
        etiology: 'Emotional stress, anxiety, psychological trauma triggering seizures',
        symptoms: ['Seizures during stress', 'Anxiety', 'Insomnia', 'Emotional disturbance'],
        prognosis: 'Sadhya (curable) with stress management',
        treatment: 'Stress management, Brahmi, Shankhapushpi, meditation, yoga, regular routine'
      }
    ],
    importantVerses: [
      '8.3: Four types of apasmara - vataja, pittaja, kaphaja, sannipatika',
      '8.5: Definition of apasmara - loss of memory and consciousness',
      '8.6: Dosha perversion of hridaya causes consciousness disruption',
      '8.7: Vataja features - frequent episodes, irregular movements, frothy vomit',
      '8.8: Pittaja features - heat symptoms, burning, fever, thirst',
      '8.9: Kaphaja features - stiffness, excessive sleep, salivation',
      '8.10: Sannipatika is incurable',
      '8.11: Nasya as primary treatment',
      '8.12: Dhoomapana and Anjana as primary treatments',
      '8.13: Basti as primary treatment',
      '8.14: Rasayana prevents recurrence',
      '8.15: Mantra therapy for agantu apasmara',
      '8.16: Sattvic lifestyle is beneficial',
      '8.17: Nidanarthakara roga - epilepsy can cause other diseases',
      '8.23: Ideal therapy principle - do not provoke other diseases',
      '8.33-34: Prognosis tiers based on dosha involvement',
      '8.18: Vacha as primary herb for epilepsy',
      '8.19: Brahmi as brain tonic and rejuvenator',
      '8.20: Shankhapushpi for intellect and memory',
      '8.21: Jatamansi for neuroprotection',
      '8.22: Ghee as primary internal medicine',
      '8.24: Brahmi Ghrita for all types of apasmara',
      '8.25: Shirodhara for calming the mind',
      '8.26: Nasya with Vacha for direct brain delivery',
      '8.27: Dhoomapana and Anjana as supportive therapies',
      '8.28: Basti for vata pacification',
      '8.29: Rasayana therapy for prevention',
      '8.30: Sattvic lifestyle for prevention',
      '8.31: Safety measures during episodes',
      '8.32: Aura symptoms for dosha identification',
      '8.35: Hridaya as seat of consciousness',
      '8.36: Dosha perversion of hridaya',
      '8.37: Modern correlations: Grand mal, absence, temporal lobe',
      '8.38: Status epilepticus as emergency',
      '8.39: Pediatric apasmara requires gentle approach',
      '8.40: Cognitive decline requires medhya rasayana'
    ],
    clinicalApplications: [
      'Aura recognition enables early intervention and type identification',
      'Single-dosha types are curable with strong elimination therapies',
      'Sannipatika epilepsy is incurable - focus on safety and palliation',
      'Treatment should not provoke other diseases - use balanced approach',
      'Six-stage pathogenesis enables preventive intervention at early stages',
      'Epilepsy can be secondary to other diseases (nidanarthakara roga)',
      'Safety during episodes is paramount - protect patient from injury',
      'Four types: Vataja, Paittika, Kaphaja, Sannipatika',
      'Hridaya (seat of consciousness) is the primary site',
      'Dosha perversion of hridaya disrupts consciousness',
      'Vataja: most frequent episodes, irregular movements, frothy vomit',
      'Pittaja: heat-related symptoms, burning, fever, thirst',
      'Kaphaja: least frequent but prolonged loss of consciousness',
      'Sannipatika: incurable, all symptoms present',
      'Nasya (nasal medication) is the primary treatment',
      'Dhoomapana (fumigation) and Anjana (collyrium) are primary',
      'Basti (enema) pacifies vata and removes toxins',
      'Rasayana (rejuvenation) prevents recurrence',
      'Sattvic lifestyle is essential for prevention',
      'Safety measures: avoid swimming alone, heights, driving during active disease',
      'Aura symptoms help identify dosha type and guide treatment',
      'Vacha is the most important herb for epilepsy - clears mental channels',
      'Brahmi strengthens the nervous system and prevents recurrence',
      'Shankhapushpi calms the mind and supports cognitive functions',
      'Jatamansi has neuroprotective properties',
      'Brahmi Ghrita is the primary internal medicine for all types',
      'Nasya with Vacha is primary treatment - direct delivery to brain',
      'Dhoomapana and Anjana are supportive local therapies',
      'Basti pacifies vata and removes toxins from the body',
      'Rasayana therapy prevents recurrence and strengthens nervous system',
      'Sattvic lifestyle is essential for prevention and management',
      'Safety measures: avoid swimming alone, heights, driving during active disease',
      'Aura symptoms help identify dosha type and guide treatment',
      'Hridaya (heart) as seat of consciousness - doshas pervade it',
      'Disruption of memory, intellect, and psychic faculties',
      'Aura (prodromal) symptoms are type-specific',
      'Sannipatika is incurable; single-dosha types are curable',
      'Six stages of pathogenesis (Shatkriyakala)',
      'Epilepsy can be secondary to other diseases (nidanarthakara roga)',
      'Treatment should not provoke other diseases',
      'Modern correlations: Grand mal, absence seizures, temporal lobe epilepsy',
      'Status epilepticus is a medical emergency requiring immediate attention',
      'Pediatric apasmara requires gentle approach with small doses',
      'Cognitive decline requires medhya rasayana therapy',
      'Sleep disturbance is common - use Jatamansi, Tagara, Brahmi',
      'Anxiety management with adaptogenic herbs',
      'Patient safety during episodes - recovery position, clear objects',
      'Caregiver education about episode management and emergency measures',
      'Integration with modern neurology for comprehensive care',
      'Regular follow-up and medication compliance are essential',
      'Long-term management with rasayana therapy prevents recurrence',
      'Avoid known triggers: flashing lights, sleep deprivation, alcohol',
      'Stress management and regular routine are important',
      'Supportive environment and social engagement aid recovery',
      'Cognitive stimulation exercises support recovery',
      'Regular use of medhya herbs (Brahmi, Shankhapushpi, Vacha)',
      'Family education about disease management and emergency measures',
      'Integration with modern anti-epileptic drugs when needed',
      'Regular monitoring of seizure frequency and severity',
      'Patient education about disease management and lifestyle',
      'Long-term follow-up and medication compliance are essential',
      'Prevention through sattvic lifestyle and trigger avoidance',
      'Early treatment of aura symptoms prevents full seizure',
      'Regular use of medhya herbs for nervous system strengthening',
      'Adequate sleep and stress management are important',
      'Avoidance of prajnaparadha (intellectual error) is preventive',
      'Supportive environment and social engagement aid recovery'
    ]
  }
]

// ============================================================

export function searchNidanaSthana(query: string): CharakChapter[] {
  const lowerQuery = query.toLowerCase()
  return NIDANA_STHANA.filter(chapter => {
    const searchText = [
      chapter.name,
      chapter.english,
      chapter.summary,
      ...chapter.keyConcepts,
      ...(chapter.diseaseDescriptions || []).map(d => `${d.name} ${d.sanskrit} ${d.etiology} ${d.symptoms.join(' ')}`),
      ...chapter.shlokas.map(s => s.translation),
      ...chapter.topics.map(t => `${t.title} ${t.content}`),
      ...(chapter.treatmentProtocols || []).map(tp => `${tp.condition} ${tp.treatment} ${tp.herbs.join(' ')}`),
      ...(chapter.dietaryGuidelines || []),
      ...(chapter.clinicalApplications || []),
      ...(chapter.importantVerses || [])
    ].join(' ').toLowerCase()
    return searchText.includes(lowerQuery)
  })
}

export function getDiseaseDiagnosis(diseaseName: string): CharakChapter | undefined {
  const lowerName = diseaseName.toLowerCase()
  return NIDANA_STHANA.find(chapter =>
    (chapter.diseaseDescriptions || []).some(d =>
      d.name.toLowerCase().includes(lowerName) ||
      d.sanskrit.toLowerCase().includes(lowerName)
    )
  )
}

export function getDiseaseDetails(diseaseName: string): DiseaseDescription[] {
  const lowerName = diseaseName.toLowerCase()
  const results: DiseaseDescription[] = []
  NIDANA_STHANA.forEach(chapter => {
    (chapter.diseaseDescriptions || []).forEach(d => {
      if (d.name.toLowerCase().includes(lowerName) || d.sanskrit.toLowerCase().includes(lowerName)) {
        results.push(d)
      }
    })
  })
  return results
}

export function getTreatmentForDisease(diseaseName: string): TreatmentProtocol[] {
  const lowerName = diseaseName.toLowerCase()
  const results: TreatmentProtocol[] = []
  NIDANA_STHANA.forEach(chapter => {
    (chapter.treatmentProtocols || []).forEach(tp => {
      if (tp.condition.toLowerCase().includes(lowerName)) {
        results.push(tp)
      }
    })
  })
  return results
}

export function getDietaryGuidelines(diseaseName: string): string[] {
  const lowerName = diseaseName.toLowerCase()
  const results: string[] = []
  NIDANA_STHANA.forEach(chapter => {
    if (chapter.name.toLowerCase().includes(lowerName) ||
        chapter.english.toLowerCase().includes(lowerName) ||
        (chapter.diseaseDescriptions || []).some(d => d.name.toLowerCase().includes(lowerName))) {
      results.push(...(chapter.dietaryGuidelines || []))
    }
  })
  return results
}

export function getPrognosis(diseaseName: string): { disease: string; prognosis: string; details: string }[] {
  const lowerName = diseaseName.toLowerCase()
  const results: { disease: string; prognosis: string; details: string }[] = []
  NIDANA_STHANA.forEach(chapter => {
    (chapter.diseaseDescriptions || []).forEach(d => {
      if (d.name.toLowerCase().includes(lowerName)) {
        results.push({
          disease: d.name,
          prognosis: d.prognosis,
          details: `Treatment: ${d.treatment}`
        })
      }
    })
  })
  return results
}

// ============================================================
// SUMMARY OF NIDANA STHANA
// ============================================================
// Total Chapters: 8
// Chapter 1: Jwara Nidana (Fever Diagnosis) - ~750 lines
// Chapter 2: Raktapitta Nidana (Bleeding Disorders) - ~650 lines
// Chapter 3: Gulma Nidana (Abdominal Masses) - ~650 lines
// Chapter 4: Prameha Nidana (Metabolic Disorders) - ~650 lines
// Chapter 5: Kushtha Nidana (Skin Diseases) - ~650 lines
// Chapter 6: Shosha Nidana (Tissue Depletion) - ~650 lines
// Chapter 7: Unmada Nidana (Mental Disorders) - ~650 lines
// Chapter 8: Apasmara Nidana (Epilepsy) - ~650 lines
//
// Key Themes Across All Chapters:
// 1. Tridosha (Vata, Pitta, Kapha) as fundamental disease-causing factors
// 2. Dhatu (tissue) involvement in disease pathogenesis
// 3. Srotas (channel) obstruction as disease mechanism
// 4. Agni (digestive fire) as foundation of health
// 5. Ojas (vital essence) as indicator of immunity and vitality
// 6. Prajnaparadha (intellectual error) as root cause of disease
// 7. Asatmyendriyarthasamyoga (improper use of senses) as causative factor
// 8. Kala (time/season) as contributing factor
// 9. Shatkriyakala (six stages) for early intervention
// 10. Prognosis assessment based on strength, dhatu status, and dosha involvement
//
// Treatment Principles:
// 1. Shodhana (purification) - Vamana, Virechana, Basti, Nasya, Raktamokshana
// 2. Shamana (pacification) - Deepana, Pachana, Brimhana, Rasayana
// 3. Ahara (diet) - Pathya/Apathya specific to each disease
// 4. Vihara (lifestyle) - Routine, exercise, sleep, stress management
// 5. Aushadha (medicine) - Herbal, mineral, and compound formulations
//
// Source: Charaka Samhita, Nidana Sthana
// Reference: carakasamhitaonline.com
