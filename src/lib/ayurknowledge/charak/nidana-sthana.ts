/**
 * Charak Samhita - Nidana Sthana (Section on Diagnostic Principles)
 * 8 Chapters covering diagnosis of major diseases
 * Source: carakasamhitaonline.com (CC BY-NC-SA 4.0)
 */

export interface CharakChapter {
  id: string
  sthana: string
  chapterNumber: number
  name: string
  sanskrit: string
  english: string
  summary: string
  keyConcepts: string[]
  shlokas: Array<{
    number: string
    sanskrit: string
    translation: string
    commentary: string
  }>
  topics: Array<{
    title: string
    content: string
    clinicalRelevance: string
  }>
  doshaDiscussion: string[]
  treatmentProtocols: Array<{
    condition: string
    treatment: string
    herbs: string[]
    dosage: string
    duration: string
    precautions: string[]
  }>
  diseaseDescriptions: Array<{
    name: string
    sanskrit: string
    etiology: string
    symptoms: string[]
    prognosis: string
    treatment: string
  }>
  importantVerses: string[]
  clinicalApplications: string[]
}

export const NIDANA_STHANA: CharakChapter[] = [
  {
    id: 'nidana-1',
    sthana: 'Nidana Sthana',
    chapterNumber: 1,
    name: 'Jwara Nidana',
    sanskrit: 'ज्वरनिदानम् अध्यायः',
    english: 'Diagnosis of Fever',
    summary: 'Comprehensive diagnosis of fever (jwara) covering 8 types based on dosha involvement, detailed pathogenesis, premonitory symptoms, clinical features, and management principles. Jwara is described as the "king of all diseases" that can affect body, sense organs, and mind.',
    keyConcepts: [
      'Nidana Panchaka (five diagnostic tools): Nidana, Purvarupa, Linga, Upashaya, Samprapti',
      'Eight types of Jwara: Vatika, Paittika, Shlaishmika, Vata-Paittika, Vata-Shlaishmika, Pitta-Shlaishmika, Sannipatika, Agantuja',
      'Amashaya as the common site for all jwara',
      'Agni displacement mechanism - heat pushed out from pakti sthana',
      'Rasa dhatu and svedavaha srotas involvement',
      'Ghee as universal treatment for chronic fever',
      'Jwara as "king of all diseases" (sarvarogadhika)'
    ],
    shlokas: [
      {
        number: '1.6',
        sanskrit: 'निदानपूर्वरूपलिङ्गोपशयसम्प्राप्तिभिः व्याधयो विज्ञायन्ते',
        translation: 'Diseases are diagnosed by studying their nidana (etiology), purvarupa (premonitory symptoms), linga (signs and symptoms), upashaya (pacifying factors), and samprapti (pathogenesis).',
        commentary: 'This foundational verse establishes the five-fold diagnostic framework used throughout Ayurvedic medicine.'
      },
      {
        number: '1.17',
        sanskrit: 'अष्टौ ज्वरा भवन्ति वातपित्तकफवातपित्तवातकफपित्तकफवातपित्तकफसंनिपातागन्तवश्च',
        translation: 'Jwara occurs in humans due to eight causative factors: vata, pitta, kapha, vata-pitta, vata-kapha, pitta-kapha, vata-pitta-kapha, and agantu (exogenous causes).',
        commentary: 'Classification of fever based on dosha combination provides the framework for differential diagnosis and treatment selection.'
      },
      {
        number: '1.38',
        sanskrit: 'घृतं जीर्णज्वरे सर्वश्रेष्ठम् - यथा जलेन सिक्ता दीप्तान् गृहान् निर्वापयन्ति',
        translation: 'As water is sprinkled on burning houses to douse the fire, ghee is administered to manage chronic fever. Ghee is considered superior to all other snehas.',
        commentary: 'Ghee uniquely accepts sanskara (processing with therapeutic drugs) to address all three doshas - pacifies vata by unctuousness, kapha by processed drugs, and pitta by its coldness.'
      },
      {
        number: '1.35',
        sanskrit: 'ज्वरः सर्वप्राणभृतां जीवितं हरति सन्तापयति च शरीरम् इन्द्रियाणि मनश्च',
        translation: 'Jwara could take away the life of all creatures and causes santapa (grief) in body, sense organs, and mind. It is described as the king of all diseases.',
        commentary: 'Establishes the primacy and severity of fever among all diseases in Ayurvedic classification.'
      },
      {
        number: '1.39',
        sanskrit: 'सर्वरोगाधिके ज्वरे घृतं सर्वविरेकिभ्यो विशिष्यते',
        translation: 'Medicated ghee pacifies vata by its unctuousness, kapha by processed drugs, and pitta by its coldness.',
        commentary: 'The triple action of medicated ghee makes it the ideal vehicle for treating chronic fever involving multiple doshas.'
      }
    ],
    topics: [
      {
        title: 'Samprapti (Pathogenesis) of Jwara',
        content: 'Step 1: Vitiated dosha enters amashaya (stomach). Step 2: Mixes with body heat (ushma) and contacts ahara rasa. Step 3: Blocks rasavaha and svedavaha srotas. Step 4: Digestive agni displaced from pakti sthana. Step 5: Heat cannot dissipate through blocked sweat channels, spreads throughout body causing fever.',
        clinicalRelevance: 'Understanding the amashaya as the primary site explains why fasting and light diet are first-line treatments for fever.'
      },
      {
        title: 'Agantuja Jwara (Exogenous Fever)',
        content: 'Caused by abhighata (trauma), abhisanga (evil association/possession), abhichara (fascination/sorcery), and abhisapa (curse). Initially manifests without dosha vitiation, then doshas become secondarily vitiated. Trauma-based involves rakta and vata; evil association involves vata-pitta; sorcery leads to full sannipata.',
        clinicalRelevance: 'Important for differential diagnosis when fever presents without clear dietary or lifestyle triggers.'
      },
      {
        title: 'Classification by Timing',
        content: 'Fever symptoms vary by time of day and season: Vatika worsens at end of digestion/day/night and in summer. Paittika worsens during digestion, at midday/midnight, and in autumn. Shlaishmika worsens just after meals, in forenoon, early night, and spring.',
        clinicalRelevance: 'Temporal patterns help identify the predominant dosha involved in fever presentation.'
      }
    ],
    doshaDiscussion: [
      'Vata: Irregular fever, rough skin, reddish nails/eyes, cramps, joint looseness, dry mouth, thirst, insomnia, desire for warmth',
      'Pitta: High fever throughout body, pungent taste, ulceration of nose/mouth/throat, thirst, bilious vomiting, green/yellow discoloration, burning sensation, desire for cold',
      'Kapha: Mild fever, heaviness, sweet taste, nausea, phlegm, excessive sleep, stiffness, cough, whitish discoloration, desire for warmth'
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
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vatika Jwara',
        sanskrit: 'वातिक ज्वर',
        etiology: 'Excess dry, light, cold foods; overuse of emesis/purgation/basti; overexertion; suppression of urges; fasting; trauma; sexual excess; grief; night vigils',
        symptoms: ['Irregular onset/remission', 'Worsens at end of digestion/summer', 'Rough skin', 'Reddish nails/eyes/face', 'Cramps in calves', 'Joint looseness', 'Dry mouth/throat', 'Thirst', 'Insomnia', 'Desire for warmth'],
        prognosis: 'Sadhya (curable) with proper vata-pacifying treatment',
        treatment: 'Oleation, fomentation, sweet/sour/salty tastes, medicated ghee, basti'
      },
      {
        name: 'Paittika Jwara',
        sanskrit: 'पैत्तिक ज्वर',
        etiology: 'Excess hot, sour, salty, alkaline, pungent foods; eating before digestion; sun/fire exposure; anger',
        symptoms: ['High fever throughout body', 'Worsens during digestion/autumn', 'Pungent taste in mouth', 'Ulceration of nose/mouth/throat', 'Unquenchable thirst', 'Bilious vomiting', 'Green/yellow discoloration', 'Burning sensation'],
        prognosis: 'Sadhya (curable) with pitta-pacifying treatment',
        treatment: 'Sweet, bitter, astringent tastes; cold therapy; purgation (virechana)'
      },
      {
        name: 'Shlaishmika Jwara',
        sanskrit: 'श्लैष्मिक ज्वर',
        etiology: 'Excess unctuous, heavy, sweet, cold foods; daytime sleeping; excessive joy; sedentary lifestyle',
        symptoms: ['Mild fever throughout body', 'Heaviness', 'Sweet taste', 'Nausea', 'Excess phlegm', 'Excessive sleep', 'Cough', 'Whitish discoloration'],
        prognosis: 'Sadhya (curable) with kapha-pacifying treatment',
        treatment: 'Emesis (vamana), light diet, pungent/bitter/astringent tastes, fomentation'
      },
      {
        name: 'Sannipatika Jwara',
        sanskrit: 'सन्निपातिक ज्वर',
        etiology: 'Irregular eating, seasonal disturbances, improper Panchakarma, contaminated water, combination of all three dosha causes',
        symptoms: ['Mixed symptoms of all three doshas', 'Complex and variable presentation'],
        prognosis: 'Krichchrasadhya (difficult to treat) or Asadhya (incurable) depending on severity',
        treatment: 'Sequential dosha management, strong measures, careful monitoring'
      }
    ],
    importantVerses: [
      '1.6: Five diagnostic tools (Nidana Panchaka)',
      '1.17: Eight types of jwara',
      '1.35: Jwara as king of all diseases',
      '1.38: Ghee for chronic fever',
      '1.39: Triple action of medicated ghee'
    ],
    clinicalApplications: [
      'Fever classification guides treatment: vata fever needs oleation, pitta fever needs cooling, kapha fever needs elimination',
      'Temporal patterns (time of day, season) help identify predominant dosha',
      'Ghee-based treatments are universal for chronic fever regardless of dosha type',
      'Fasting is first-line for acute fever since amashaya is the primary site',
      'Exogenous fever must be differentiated from endogenous fever for proper treatment'
    ]
  },

  {
    id: 'nidana-2',
    sthana: 'Nidana Sthana',
    chapterNumber: 2,
    name: 'Raktapitta Nidana',
    sanskrit: 'रक्तपित्तनिदानम् अध्यायः',
    english: 'Diagnosis of Bleeding Disorders',
    summary: 'Diagnosis of Raktapitta (bleeding disorder) covering three types based on route of manifestation (upper, lower, both), detailed etiology with specific dietary and lifestyle causes, pathogenesis involving pitta-rakta vitiation, and prognostic criteria.',
    keyConcepts: [
      'Three types based on bleeding route: Urdhva (upper), Adho (lower), Ubhaya (both)',
      'Pitta mixes with rakta acquiring blood color and smell',
      'Raktavaha srotas (liver/spleen) as origin site',
      'Treatment principle: purify from opposite route',
      'Prognosis: Upper = curable, Lower = palliable, Both = incurable'
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
        translation: 'Blood exceeds its normal quantity. Vitiated pitta reaches the channels of transformation of blood (raktavaha srotas) originating from organs like liver and spleen.',
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
        translation: 'Upper-tract bleeding is curable and treatable by purgation. Lower-tract bleeding is palliable. Both-tract bleeding is incurable because of non-applicability of both emesis and purgation.',
        commentary: 'Critical prognostic criterion based on treatment accessibility.'
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
        treatment: 'Virechana (purgation) with sweet, soft, cold, bitter, astringent drugs. Topical applications, baths.',
        herbs: ['Chandana', 'Ushira', 'Kamala', 'Padmaka', 'Madhuka'],
        dosage: 'As directed',
        duration: 'Until bleeding stops',
        precautions: ['Avoid hot, sour, salty foods', 'Avoid sun exposure']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Urdhva Raktapitta',
        sanskrit: 'ऊर्ध्व रक्तपित्त',
        etiology: 'Excess pitta-aggravating diet, incompatible food combinations, heat exposure',
        symptoms: ['Bleeding from nose, mouth, eyes, ears', 'Red/green/yellow discoloration', 'Burning sensation'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Virechana, cold therapy, bitter/astringent drugs'
      },
      {
        name: 'Adho Raktapitta',
        sanskrit: 'अधो रक्तपित्त',
        etiology: 'Vata-pitta vitiation with same dietary causes',
        symptoms: ['Bleeding from urethra and rectum', 'Vata symptoms predominant'],
        prognosis: 'Yapya (palliable)',
        treatment: 'Vamana, astringent drugs, vata-pacifying measures'
      },
      {
        name: 'Ubhaya Raktapitta',
        sanskrit: 'उभय रक्तपित्त',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['Bleeding from both upper and lower orifices'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      }
    ],
    importantVerses: [
      '2.4: Naming convention of Raktapitta',
      '2.5: Core pathogenesis',
      '2.8: Dosha-dependent routing',
      '2.9: Prognosis criteria',
      '2.22: Signs of incurable Raktapitta - black/blue/rainbow-colored blood'
    ],
    clinicalApplications: [
      'Bleeding direction indicates predominant dosha and guides treatment',
      'Upper bleeding is most treatable - virechana is the primary intervention',
      'Black, blue, or rainbow-colored blood indicates incurable disease',
      'Immediate treatment is critical - disease spreads rapidly like wildfire',
      'Soft, sweet, cold, bitter, astringent diets are foundational'
    ]
  },

  {
    id: 'nidana-3',
    sthana: 'Nidana Sthana',
    chapterNumber: 3,
    name: 'Gulma Nidana',
    sanskrit: 'गुल्मनिदानम् अध्यायः',
    english: 'Diagnosis of Abdominal Masses',
    summary: 'Diagnosis of Gulma (abdominal masses/tumors) covering 5 types (vataja, pittaja, kaphaja, sannipataja, raktaja). Unique pathogenesis where doshas solidify without dhatu involvement. Vata pacification is paramount across all types.',
    keyConcepts: [
      'Five types: Vataja, Pittaja, Kaphaja, Sannipataja, Shonita (raktaja)',
      'Unique pathogenesis: dosha solidification without dushya (dhatu/mala) involvement',
      'Two mechanisms: Dhatukshaya (tissue wasting) and Margavarana (obstruction)',
      'Mahasrotas (GI tract) as the primary site',
      'Shonita Gulma only in females - mimics pregnancy',
      'Vata pacification is primary treatment principle for ALL types'
    ],
    shlokas: [
      {
        number: '3.3',
        sanskrit: 'पञ्च गुल्मा भवन्ति - वातपित्तकफनिचयशोनितजाश्च',
        translation: 'There are five types of gulma: vata dominant, pitta dominant, kapha dominant, sannipataja (tridosha), and shonita (rakta) gulma.',
        commentary: 'Establishes the five-fold classification of abdominal masses.'
      },
      {
        number: '3.12',
        sanskrit: 'सन्निपातिको गुल्मो न साध्यः',
        translation: 'When the symptoms of three doshas are exhibited, a gulma patient is said to be ailing from sannipatika gulma. This condition is incurable.',
        commentary: 'Sannipataja gulma should not be treated due to contradictory treatment requirements.'
      },
      {
        number: '3.16',
        sanskrit: 'गुल्मे सर्वाणि वातहराणि कर्माणि सम्यक् प्रयोजयेत्',
        translation: 'In the case of gulma, all the measures for pacification of vata should be administered properly because after vayu is controlled, other aggravated doshas can be alleviated even with small remedies.',
        commentary: 'Foundational treatment principle - vata is present in ALL types of gulma.'
      },
      {
        number: '3.7',
        sanskrit: 'वायुः महास्रोतसि रौक्ष्यात् कठिनीभूतः गुल्मं निर्मिमीते',
        translation: 'Vitiated vata enters mahasrotas and hardens due to dryness, forming a mass or swelling localized in the regions of heart, urinary bladder, sides, and the navel.',
        commentary: 'Core mechanism of gulma formation through vata solidification.'
      }
    ],
    topics: [
      {
        title: 'Unique Pathogenesis',
        content: 'Gulma forms through solidification of doshas alone, without involvement of dushya (dhatu/mala). This is unique among abdominal diseases. Vata gets vitiated through dhatukshaya (tissue wasting) or margavarana (obstruction), enters mahasrotas, and forms a palpable mass.',
        clinicalRelevance: 'Understanding that gulma is dosha-only pathology (not dhatu involvement) guides the treatment approach toward dosha pacification rather than tissue repair.'
      },
      {
        title: 'Raktaja Gulma vs Pregnancy',
        content: 'Raktaja gulma mimics pregnancy with progressive monthly abdominal enlargement, milk in breasts, food cravings (dohada), dark lip/areolar coloration. Differentiation: gulma pulsation is slight and late-stage only; pregnancy movement is present throughout all trimesters.',
        clinicalRelevance: 'Critical differential diagnosis in female patients presenting with abdominal enlargement.'
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
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Gulma',
        sanskrit: 'वातज गुल्म',
        etiology: 'Cold, dry foods; suppression of urges; excessive sex/exercise; irregular postures',
        symptoms: ['Hard mobile mass', 'Intermittent enlargement', 'Tingling/cramps', 'Gurgling sounds', 'Evening fever', 'Blackish discoloration'],
        prognosis: 'Sadhya (curable) when treated timely',
        treatment: 'Oleation, fomentation, basti, sweet/sour/salty tastes'
      },
      {
        name: 'Pittaja Gulma',
        sanskrit: 'पैत्तिक गुल्म',
        etiology: 'Sour, salty, pungent foods; eating during indigestion; sun exposure',
        symptoms: ['Burning at mass site', 'Smoky eructations', 'Fever', 'Thirst', 'Greenish-yellow discoloration'],
        prognosis: 'Sadhya (curable) when treated timely',
        treatment: 'Cold therapy, bitter/sweet/astringent tastes, purgation'
      },
      {
        name: 'Kaphaja Gulma',
        sanskrit: 'कफज गुल्म',
        etiology: 'Heavy, sweet, cold foods; sedentary lifestyle; excess water intake',
        symptoms: ['Fixed heavy mass', 'Excess sleep', 'Cough', 'Anorexia', 'Whitish discoloration'],
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
      }
    ],
    importantVerses: [
      '3.3: Five types of gulma',
      '3.7: Vata solidification mechanism',
      '3.12: Sannipataja is incurable',
      '3.16: Vata pacification is paramount',
      '3.15: Premonitory symptoms common to all types'
    ],
    clinicalApplications: [
      'Always treat vata first in gulma - even small remedies work for other doshas once vata is controlled',
      'Raktaja gulma must be differentiated from pregnancy in female patients',
      'Sannipataja gulma should not be attempted to treat - focus on palliative care',
      'Suppression of natural urges is a major causative factor - counsel patients accordingly'
    ]
  },

  {
    id: 'nidana-4',
    sthana: 'Nidana Sthana',
    chapterNumber: 4,
    name: 'Prameha Nidana',
    sanskrit: 'प्रमेहनिदानम् अध्यायः',
    english: 'Diagnosis of Diabetes/Urinary Disorders',
    summary: 'Comprehensive diagnosis of Prameha covering 20 types (10 kaphaja, 6 pittaja, 4 vataja), detailed pathogenesis involving kapha-medas-mamsa-kleda vitiation, and prognostic framework. Madhumeha (vataja) correlates with diabetes mellitus.',
    keyConcepts: [
      '20 types: 10 Kaphaja (curable), 6 Pittaja (palliable), 4 Vataja (incurable)',
      '10 dushyas (affected tissues): meda, mamsa, kleda, shukra, rakta, vasa, majja, lasika, rasa, ojas',
      'Pathogenesis: Kapha → Meda → Mamsa → Kleda → Mutra vitiation → urinary channel obstruction',
      'Madhumeha: Ojas converted to astringent form by vata',
      'Sthula pramehi (obese) = Type 2; Krisha pramehi (asthenic) = Type 1',
      'Disease progression: Kaphaja → Pittaja → Vataja if untreated'
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
        sanskrit: 'उपक्लिन्नान् स्निग्धान् स्थिरान् गुरूनभिसमीक्ष्य मेदासं कफः सम्प्राप्य',
        translation: 'Aggravated kapha blends quickly with the medas (fat) because fats typically are excessive in quantity and both share identical qualities. The vitiated complex then obstructs urinary channels.',
        commentary: 'Core pathogenesis explaining why kapha and fat have an affinity for each other.'
      },
      {
        number: '4.37',
        sanskrit: 'ओजः स्वभावात् मधुरम् - वातरौक्ष्येण कषायम् भवति',
        translation: 'Ojas is by nature of sweet taste. However, vata roughness converts it into an astringent tasting element which, entering the urinary bladder, causes madhumeha.',
        commentary: 'Unique pathogenesis of madhumeha - the most severe form of prameha.'
      },
      {
        number: '4.50',
        sanskrit: 'प्रमेहः स्थूलान् आसक्तो भवति - अतिस्थूलानां मृत्युः शीघ्रम्',
        translation: 'Prameha is attracted to gluttonous persons and those averse to bathing and exercise. Death rapidly afflicts those who are very lethargic and morbidly obese.',
        commentary: 'Highlights the lifestyle connection and mortality risk in obesity-associated prameha.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis (Samprapti)',
        content: 'Step 1: Kapha vitiation from dietary/lifestyle causes. Step 2: Kapha blends with medas (fat) due to similar qualities. Step 3: Vitiated kapha-medas combines with mamsa and kleda. Step 4: Muscle vitiation produces pidika (carbuncles). Step 5: Liquid dhatus transform into mutra. Step 6: Kapha obstructs urinary channels → Prameha.',
        clinicalRelevance: 'The kapha-medas connection explains why obesity is the primary risk factor. Weight management is foundational in prevention.'
      },
      {
        title: 'Modern Correlations',
        content: 'Kaphaja prameha correlates with early Type 2 diabetes and metabolic syndrome. Pittaja prameha correlates with moderate hyperglycemia and UTI. Vataja prameha (madhumeha) correlates with Type 1 or advanced Type 2 diabetes. Udakameha may represent diabetes insipidus. Kalamaha may represent alkaptonuria.',
        clinicalRelevance: 'Understanding modern correlations helps integrate Ayurvedic diagnosis with contemporary laboratory findings.'
      }
    ],
    doshaDiscussion: [
      'Kapha (10 types): Curable - shares qualities with medas, amenable to same treatment',
      'Pitta (6 types): Palliable - close locus to medas but treatment contradiction',
      'Vata (4 types): Incurable - treatment contradictions and critical nature'
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
        condition: 'Madhumeha (Advanced Diabetes)',
        treatment: 'Guru (heavy) and snigdha (unctuous) preparations, basti therapy, vata-pacifying measures',
        herbs: ['Ashwagandha', 'Shatavari', 'Guduchi', 'Amalaki', 'Haritaki'],
        dosage: 'As directed',
        duration: 'Lifelong management',
        precautions: ['Cannot be cured - only managed', 'Monitor blood sugar regularly']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kaphaja Prameha (10 types)',
        sanskrit: 'कफज प्रमेह',
        etiology: 'Excess sweet, heavy, oily foods; sedentary lifestyle; excessive sleep',
        symptoms: ['Udakameha: water-like urine', 'Ikshuvalikarasameha: sugarcane juice-like', 'Sandrameha: viscous urine', 'Shuklameha: white urine', 'Shukrameha: semen-like urine', 'Sikatameha: gravel-like particles'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Vamana, langhana, tikshna medicines, exercise'
      },
      {
        name: 'Pittaja Prameha (6 types)',
        sanskrit: 'पैत्तिक प्रमेह',
        etiology: 'Hot, sour, salty foods; heat exposure; anger',
        symptoms: ['Ksharameha: alkali-like urine', 'Kalamaha: black urine', 'Nilameha: blue urine', 'Raktameha: red/bloody urine', 'Manjisthameha: manjistha-colored urine', 'Haridrameha: turmeric-colored urine'],
        prognosis: 'Yapya (palliable)',
        treatment: 'Pitta-pacifying measures, bitter/sweet drugs'
      },
      {
        name: 'Vataja Prameha (4 types)',
        sanskrit: 'वातज प्रमेह',
        etiology: 'Light, dry, cold foods; excessive sex/exercise; suppression of urges; grief',
        symptoms: ['Vasameha: fat-like urine', 'Majjameha: marrow-like urine', 'Hastimeha: copious continuous flow', 'Madhumeha: sweet/astringent, dry urine'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Vata-pacifying, snigdha, guru measures, basti'
      }
    ],
    importantVerses: [
      '4.4: Disease manifestation principles',
      '4.8: Kapha-fat affinity pathogenesis',
      '4.37: Madhumeha - ojas conversion by vata',
      '4.50: Obesity-prameha connection',
      '4.51: Lifestyle factors and mortality'
    ],
    clinicalApplications: [
      '20-type classification guides prognosis and treatment selection',
      'Kaphaja types are most responsive to purification therapy',
      'Madhumeha requires lifelong management - not curable',
      'Obesity management is foundational in prameha prevention',
      'Disease progression from kaphaja to vataja indicates worsening prognosis',
      'Carbuncle (pidika) development indicates mamsa dhatu involvement'
    ]
  },

  {
    id: 'nidana-5',
    sthana: 'Nidana Sthana',
    chapterNumber: 5,
    name: 'Kushtha Nidana',
    sanskrit: 'कुष्ठनिदानम् अध्यायः',
    english: 'Diagnosis of Skin Diseases',
    summary: 'Diagnosis of Kushtha (skin diseases) covering 7 Mahakushtha and 11 Kshudrakushtha types. Pathogenesis involves simultaneous aggravation of all three doshas with involvement of four dhatus (twak, mamsa, rakta, lasika).',
    keyConcepts: [
      'Seven pathogenic factors: 3 vitiated doshas + 4 vitiated dhatus (twak, mamsa, rakta, lasika)',
      '7 Mahakushtha (major) types based on dosha predominance',
      '11 Kshudrakushtha (minor) types - chronic, usually curable',
      'All three doshas always involved - dosha predominance determines type',
      'Fish with milk as classic incompatible food combination causing kushtha'
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
        commentary: 'All seven factors must be considered in treatment - not just the predominant dosha.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis',
        content: 'Step 1: Causative factors simultaneously aggravate all three doshas. Step 2: Four dushyas (twak, mamsa, rakta, lasika) become weakened. Step 3: Aggravated doshas lodge in weakened dhatus. Step 4: Kushtha manifests based on dosha predominance and dhatu involvement.',
        clinicalRelevance: 'Multi-dhatu involvement requires comprehensive treatment addressing both doshas and dhatus.'
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
        treatment: 'Shodhana with vamana/virechana, raktamokshana (bloodletting), external applications, dietary restrictions',
        herbs: ['Khadira', 'Sarshapa', 'Nimba', 'Haridra', 'Daruharidra', 'Manjishtha'],
        dosage: 'As directed',
        duration: 'Long-term treatment',
        precautions: ['Avoid incompatible food combinations', 'Avoid fish with milk']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Kapala Kushtha',
        sanskrit: 'कपाल कुष्ठ',
        etiology: 'Vata predominant - dry, rough foods and lifestyle',
        symptoms: ['Dry, rough skin', 'Crimson-red color', 'Severe numbness', 'Thin elevated margins', 'Mild itching'],
        prognosis: 'Sadhya (curable) with proper treatment',
        treatment: 'Oleation, fomentation, vata-pacifying measures'
      },
      {
        name: 'Kakanaka Kushtha',
        sanskrit: 'काकनक कुष्ठ',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['Multiple colors', 'Resembles Gunja seed', 'Symptoms of all kushtha types'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      }
    ],
    importantVerses: [
      '5.3: Seven types of mahakushtha',
      '5.4: Seven pathogenic factors in kushtha',
      '5.5: Etiology - incompatible food combinations',
      '5.8: Prodromal symptoms'
    ],
    clinicalApplications: [
      'All three doshas are always involved in kushtha - treat based on predominance',
      'Fish with milk is a classic causative combination to avoid',
      'Bloodletting (raktamokshana) is a key treatment for blood-involved skin diseases',
      'Kakanaka (tridosha) kushtha is incurable - focus on palliation',
      'Kshudrakushtha has fewer pathological components and is usually curable'
    ]
  },

  {
    id: 'nidana-6',
    sthana: 'Nidana Sthana',
    chapterNumber: 6,
    name: 'Shosha Nidana',
    sanskrit: 'शोषनिदानम् अध्यायः',
    english: 'Diagnosis of Wasting/Consumption',
    summary: 'Diagnosis of Shosha (wasting/consumption) caused by four factors: overexertion, suppression of urges, tissue depletion, and irregular diet. Progressive depletion of dhatus leads to rajayakshma if untreated.',
    keyConcepts: [
      'Four causative factors: Sahasa (overexertion), Sandharana (suppression of urges), Kshaya (tissue depletion), Vishamashana (irregular diet)',
      'Progressive dhatu depletion reducing ojas and immunity',
      'Lungs as primary target organ (urah kshata)',
      'Progression to rajayakshma if untreated',
      'Rasa dhatu as first affected tissue'
    ],
    shlokas: [
      {
        number: '6.4',
        sanskrit: 'सहसा सन्धारणात् क्षयात् विषमाशनाच्च शोषम् भवति',
        translation: 'Shosha occurs due to overexertion, suppression of natural urges, tissue depletion from grief/anxiety/fasting, and irregular improper diet.',
        commentary: 'Four distinct pathways all leading to progressive tissue wasting.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis',
        content: 'All four factors progressively deplete dhatus (tissues), especially rasa dhatu, reducing ojas and immunity. Vata, Pitta, Kapha become vitiated and spread throughout the body. Vitiated doshas damage the lungs, leading to hemoptysis and progressive wasting. If untreated, shosha progresses to rajayakshma.',
        clinicalRelevance: 'Early intervention at rasa dhatu stage can prevent progression to lung involvement.'
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
        treatment: 'Rasayana (rejuvenation) therapy, snigdha (unctuous) and brimhana (nourishing) diet, rest, stress management',
        herbs: ['Ashwagandha', 'Shatavari', 'Bala', 'Guduchi', 'Amalaki'],
        dosage: 'As directed',
        duration: 'Long-term rejuvenation',
        precautions: ['Avoid overexertion', 'Regular meals', 'Manage stress']
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Shosha',
        sanskrit: 'शोष',
        etiology: 'Overexertion, suppression of urges, tissue depletion, irregular diet',
        symptoms: ['Head heaviness', 'Cough', 'Dyspnea', 'Hoarseness', 'Hemoptysis', 'Chest pain', 'Fever', 'Anorexia'],
        prognosis: 'Sadhya (curable) if strength/muscle/blood preserved; Asadhya if severely depleted',
        treatment: 'Rasayana, brimhana, snigdha measures'
      }
    ],
    importantVerses: [
      '6.4: Four causative factors',
      '6.6: Prodromal symptoms',
      '6.8: Prognostic criteria based on patient strength'
    ],
    clinicalApplications: [
      'Counsel patients to avoid suppression of natural urges',
      'Regular, timely meals are essential for prevention',
      'Early rasayana therapy can halt progression to rajayakshma',
      'Patient strength is the key prognostic indicator'
    ]
  },

  {
    id: 'nidana-7',
    sthana: 'Nidana Sthana',
    chapterNumber: 7,
    name: 'Unmada Nidana',
    sanskrit: 'उन्मादनिदानम् अध्यायः',
    english: 'Diagnosis of Psychiatric Disorders',
    summary: 'Diagnosis of Unmada (psychiatric disorders) covering 5 types: vataja, paittika, kaphaja, sannipataja, and agantuja. Pathology involves dosha pervasion of hridaya (seat of consciousness) disrupting mind, intellect, ego, and sense organs.',
    keyConcepts: [
      'Five types: Vataja, Paittika, Kaphaja, Sannipataja, Agantuja',
      'Eight faculties affected: Manas, Buddhi, Sanjna Jnana, Smriti, Bhakti, Sheela, Cheshta, Achara',
      'Manovahani srotas (mental channels) obstruction',
      'Rajas and tamas (psychic doshas) involvement',
      'Agantuja caused by prajnaparadha (intellectual error)',
      'Sannipataja is incurable; single-dosha types are curable'
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
        translation: 'Neither gods nor gandharvas nor pishachas nor rakshasas afflict a person who himself is free from misdeeds. The person is afflicted by his own vitiated doshas.',
        commentary: 'Rational explanation of psychiatric illness - attributing it to dosha vitiation rather than supernatural causes.'
      },
      {
        number: '7.21',
        sanskrit: 'प्रज्ञापराधात् सम्भूते व्याधौ - सर्वे व्याधयः प्रज्ञापराधजाः',
        translation: 'All diseases arising from karma or self are caused by intellectual errors (prajnaparadha). Gods, ancestors, or rakshasas should not be blamed.',
        commentary: 'Prajnaparadha (intellectual error) as the root cause of all self-inflicted diseases.'
      }
    ],
    topics: [
      {
        title: 'Pathogenesis',
        content: 'When mind is afflicted and intellect destabilized, vitiated doshas ascend to head region. They obstruct manovahani srotas (channels carrying mental activities), reaching hridaya (seat of consciousness), producing unmada. This results in derangement of manas, buddhi, ahamkara, and indriyas.',
        clinicalRelevance: 'Treatment must address both somatic doshas and psychic doshas (rajas/tamas).'
      },
      {
        title: 'Agantuja Unmada',
        content: 'Caused by prajnaparadha (intellectual error). Patient disregards gods, ascetics, ancestors, preceptors. Two subtypes: harm intent (incurable - patient self-destructs) and affection/devotion intent (curable).',
        clinicalRelevance: 'Prognosis depends on the entity intent - harm-seeking entities lead to self-destructive behavior.'
      }
    ],
    doshaDiscussion: [
      'Vataja: Constant wandering, incoherent speech, frothing, emaciation, rough skin, protruding eyes',
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
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Unmada',
        sanskrit: 'वातज उन्माद',
        etiology: 'Vata-aggravating diet/lifestyle, psychological trauma, tissue depletion',
        symptoms: ['Constant wandering', 'Incoherent speech', 'Frothing', 'Emaciation', 'Phantom vehicle riding', 'Self-adornment with false ornaments'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Oleation, basti, nasya, vata-pacifying herbs'
      },
      {
        name: 'Sannipataja Unmada',
        sanskrit: 'सन्निपातज उन्माद',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['All dosha symptoms combined'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      }
    ],
    importantVerses: [
      '7.5: Definition with eight faculties',
      '7.3: Five types of unmada',
      '7.19: Rational explanation of psychiatric illness',
      '7.21: Prajnaparadha as root cause'
    ],
    clinicalApplications: [
      'Psychiatric disorders have both somatic and psychic components - treat both',
      'Single-dosha types are curable with proper purification and pacification',
      'Agantuja unmada prognosis depends on entity intent',
      'Prajnaparadha (intellectual error) is the root cause - address lifestyle and behavior',
      'Safety measures (binding, confinement) may be necessary during acute episodes'
    ]
  },

  {
    id: 'nidana-8',
    sthana: 'Nidana Sthana',
    chapterNumber: 8,
    name: 'Apasmara Nidana',
    sanskrit: 'अपस्मारनिदानम् अध्यायः',
    english: 'Diagnosis of Epilepsy',
    summary: 'Diagnosis of Apasmara (epilepsy) covering 4 dosha types plus agantu. Pathogenesis involves dosha pervasion of hridaya (heart/seat of consciousness) disrupting memory, intellect, and psychic faculties. Characterized by occasional loss of consciousness with aberrant activities.',
    keyConcepts: [
      'Four types: Vataja, Pittaja, Kaphaja, Sannipatika + Agantu (exogenous)',
      'Hridaya (heart) as seat of consciousness - doshas pervade it',
      'Disruption of memory, intellect, and psychic faculties',
      'Aura (prodromal) symptoms are type-specific',
      'Sannipatika is incurable; single-dosha types are curable',
      'Six stages of pathogenesis (Shatkriyakala)'
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
        translation: 'A therapy that alleviates one disease condition but provokes another disease is not ideal. The ideal therapy pacifies a disease without provoking any other disease.',
        commentary: 'Treatment principle applicable to all conditions - aim for comprehensive, balanced therapy.'
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
      }
    ],
    diseaseDescriptions: [
      {
        name: 'Vataja Apasmara',
        sanskrit: 'वातज अपस्मार',
        etiology: 'Vata-aggravating factors, emotional trauma, tissue depletion',
        symptoms: ['Most frequent episodes', 'Irregular limb contractions', 'Frothy vomit', 'Red/rough nails/eyes/skin', 'Vision of unstable dry objects'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Oleation, basti, nasya, vata-pacifying measures'
      },
      {
        name: 'Pittaja Apasmara',
        sanskrit: 'पैत्तिक अपस्मार',
        etiology: 'Pitta-aggravating factors, anger, heat exposure',
        symptoms: ['Stertororous breathing', 'Dragging movements', 'Green/yellow discoloration', 'Rise in temperature', 'Vision of terrifying burning objects'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Cold therapy, purgation, pitta-pacifying measures'
      },
      {
        name: 'Kaphaja Apasmara',
        sanskrit: 'कफज अपस्मार',
        etiology: 'Kapha-aggravating factors, excess sleep, sedentary lifestyle',
        symptoms: ['Least frequent episodes', 'Gradual loss/prolonged regain', 'Excessive salivation', 'Whitish discoloration', 'Vision of white heavy objects'],
        prognosis: 'Sadhya (curable)',
        treatment: 'Emesis, fomentation, kapha-pacifying measures'
      },
      {
        name: 'Sannipatika Apasmara',
        sanskrit: 'सन्निपातिक अपस्मार',
        etiology: 'All three doshas vitiated simultaneously',
        symptoms: ['All dosha symptoms combined'],
        prognosis: 'Asadhya (incurable)',
        treatment: 'Supportive care only'
      }
    ],
    importantVerses: [
      '8.3: Four types of apasmara',
      '8.5: Definition of apasmara',
      '8.17: Nidanarthakara roga (disease causing disease)',
      '8.23: Ideal therapy principle',
      '8.33-34: Prognosis tiers'
    ],
    clinicalApplications: [
      'Aura recognition enables early intervention and type identification',
      'Single-dosha types are curable with strong elimination therapies',
      'Sannipatika epilepsy is incurable - focus on safety and palliation',
      'Treatment should not provoke other diseases - use balanced approach',
      'Six-stage pathogenesis enables preventive intervention at early stages',
      'Epilepsy can be secondary to other diseases (nidanarthakara roga)'
    ]
  }
]

export function searchNidanaSthana(query: string): CharakChapter[] {
  const lowerQuery = query.toLowerCase()
  return NIDANA_STHANA.filter(chapter => {
    const searchText = [
      chapter.name,
      chapter.english,
      chapter.summary,
      ...chapter.keyConcepts,
      ...chapter.diseaseDescriptions.map(d => `${d.name} ${d.sanskrit} ${d.etiology} ${d.symptoms.join(' ')}`),
      ...chapter.shlokas.map(s => s.translation),
      ...chapter.topics.map(t => `${t.title} ${t.content}`)
    ].join(' ').toLowerCase()
    return searchText.includes(lowerQuery)
  })
}

export function getDiseaseDiagnosis(diseaseName: string): CharakChapter | undefined {
  const lowerName = diseaseName.toLowerCase()
  return NIDANA_STHANA.find(chapter =>
    chapter.diseaseDescriptions.some(d =>
      d.name.toLowerCase().includes(lowerName) ||
      d.sanskrit.toLowerCase().includes(lowerName)
    )
  )
}
