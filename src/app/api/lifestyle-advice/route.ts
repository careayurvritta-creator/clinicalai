export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const lifestyleSchema = z.object({
  prakriti: z.enum(['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridosha']),
  season: z.enum(['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter', 'Late Winter']).optional(),
  age: z.number().optional(),
  health_conditions: z.array(z.string()).optional(),
})

interface DinacharyaItem {
  time: string
  activity: string
  description: string
  benefits: string
}

interface LifestyleAdvice {
  prakriti: string
  dinacharya: DinacharyaItem[]
  ritucharya: string[]
  exercise: string[]
  yoga: string[]
  breathing: string[]
  sleep: string[]
  mentalHealth: string[]
}

function generateLifestyleAdvice(params: z.infer<typeof lifestyleSchema>): LifestyleAdvice {
  const { prakriti, season } = params

  const dinacharya: DinacharyaItem[] = [
    {
      time: '5:00-6:00 AM',
      activity: 'Brahma Muhurta (Wake up)',
      description: 'Wake up during Brahma Muhurta (1.5 hours before sunrise). This is the most auspicious time for health.',
      benefits: 'Fresh mind, better digestion, spiritual clarity',
    },
    {
      time: '6:00-6:30 AM',
      activity: 'Elimination',
      description: 'Natural bowel movement. If constipated, drink warm water.',
      benefits: 'Proper waste elimination, prevents toxin accumulation',
    },
    {
      time: '6:30-7:00 AM',
      activity: 'Oral Hygiene',
      description: 'Tongue scraping, oil pulling (10-15 min), brushing teeth with herbal powder.',
      benefits: 'Removes toxins, freshens breath, strengthens teeth',
    },
    {
      time: '7:00-7:30 AM',
      activity: 'Nasya & Netra Tarpana',
      description: 'Nasya (2-3 drops medicated oil in nostrils). Netra Tarpana (eye wash with triphala water).',
      benefits: 'Clears sinuses, improves vision, prevents headaches',
    },
    {
      time: '7:30-8:00 AM',
      activity: 'Abhyanga (Self-Massage)',
      description: `Self-massage with ${prakriti === 'Pitta' ? 'coconut oil' : prakriti === 'Kapha' ? 'mustard oil' : 'sesame oil'} for 15-20 minutes.`,
      benefits: 'Nourishes tissues, calms nervous system, improves circulation',
    },
    {
      time: '8:00-8:30 AM',
      activity: 'Vyayama (Exercise)',
      description: `Exercise for ${prakriti === 'Kapha' ? '45-60 minutes' : prakriti === 'Pitta' ? '30-45 minutes' : '20-30 minutes'} - ${prakriti === 'Vata' ? 'gentle yoga, walking' : prakriti === 'Pitta' ? 'swimming, moderate exercise' : 'vigorous exercise, running'}.`,
      benefits: 'Improves strength, circulation, digestion, and mood',
    },
    {
      time: '8:30-9:00 AM',
      activity: 'Snana (Bath)',
      description: `Warm water bath. ${prakriti === 'Pitta' ? 'Cool water for head.' : 'Warm water for entire body.'}`,
      benefits: 'Cleanses body, refreshes mind, prepares for day',
    },
    {
      time: '9:00-9:30 AM',
      activity: 'Ahara (Breakfast)',
      description: 'Warm, nourishing breakfast appropriate for prakriti.',
      benefits: 'Provides energy, maintains Agni, supports tissues',
    },
    {
      time: '12:00-1:00 PM',
      activity: 'Ahara (Lunch - Main Meal)',
      description: 'Largest meal of the day when Agni is strongest. Include all six tastes.',
      benefits: 'Maximum nutrition, proper digestion, tissue nourishment',
    },
    {
      time: '5:00-6:00 PM',
      activity: 'Sandhya (Evening Transition)',
      description: 'Light snack, herbal tea, meditation or prayer.',
      benefits: 'Mental clarity, stress relief, spiritual connection',
    },
    {
      time: '6:00-7:00 PM',
      activity: 'Ahara (Dinner)',
      description: 'Light, easily digestible dinner. At least 2 hours before sleep.',
      benefits: 'Supports digestion, prevents ama formation',
    },
    {
      time: '8:00-9:00 PM',
      activity: 'Padabhyanga (Foot Massage)',
      description: 'Massage feet with warm oil for 10-15 minutes.',
      benefits: 'Improves sleep, calms nervous system, grounds Vata',
    },
    {
      time: '9:00-10:00 PM',
      activity: 'Ratri Nidra (Sleep)',
      description: 'Sleep during Kapha time (before 10 PM). 7-8 hours of quality sleep.',
      benefits: 'Tissue repair, mental restoration, immune support',
    },
  ]

  const ritucharya: string[] = season ? {
    'Spring': [
      'Light, dry foods - reduce Kapha accumulation',
      'Honey as sweetener',
      'Bitter and astringent tastes',
      'Vigorous exercise',
      'Avoid daytime sleep',
      'Dry massage (Udvartana)',
    ],
    'Summer': [
      'Cool, sweet foods - pacify Pitta',
      'Coconut water, mint, cucumber',
      'Light exercise, swimming',
      'Avoid midday sun',
      'Cooling oils (coconut, sandalwood)',
      'Moonlight walks',
    ],
    'Monsoon': [
      'Warm, light foods - counter Vata aggravation',
      'Ginger, honey, cooked vegetables',
      'Moderate indoor exercise',
      'Avoid getting wet in rain',
      'Fumigation of living spaces',
      'Avoid raw foods',
    ],
    'Autumn': [
      'Sweet, bitter, astringent tastes',
      'Warm, cooked foods with ghee',
      'Moderate exercise',
      'Oil massage (Abhyanga)',
      'Early bedtime',
      'Avoid excessive sun exposure',
    ],
    'Winter': [
      'Warm, nourishing foods - build strength',
      'Soups, nuts, root vegetables',
      'Vigorous exercise',
      'Heavy oil massage',
      'Warm baths',
      'Avoid cold exposure',
    ],
    'Late Winter': [
      'Transitional diet - lighter than winter',
      'Bitter vegetables, honey',
      'Moderate exercise',
      'Dry massage',
      'Gradual reduction of heavy foods',
      'Prepare body for spring',
    ],
  }[season] : ['Follow seasonal eating patterns', 'Adjust lifestyle to climate']

  const exercise: string[] = prakriti === 'Vata'
    ? ['Gentle yoga', 'Walking', 'Tai Chi', 'Swimming (warm water)', 'Light cycling', 'Avoid vigorous exercise']
    : prakriti === 'Pitta'
    ? ['Swimming', 'Moderate yoga', 'Walking in nature', 'Cycling', 'Avoid competitive sports', 'Exercise in cool environment']
    : ['Running', 'Vigorous yoga', 'HIIT', 'Weight training', 'Competitive sports', 'Exercise in morning']

  const yoga: string[] = prakriti === 'Vata'
    ? ['Tadasana (Mountain Pose)', 'Vrksasana (Tree Pose)', 'Balasana (Child Pose)', 'Shavasana (Corpse Pose)', 'Gentle forward bends', 'Grounding poses']
    : prakriti === 'Pitta'
    ? ['Shavasana (Corpse Pose)', 'Balasana (Child Pose)', 'Supta Virasana (Reclined Hero)', 'Paschimottanasana (Seated Forward Bend)', 'Moon salutation', 'Cooling pranayama']
    : ['Surya Namaskar (Sun Salutation)', 'Virabhadrasana (Warrior Pose)', 'Navasana (Boat Pose)', 'Kapalbhati', 'Ujjayi pranayama', 'Vigorous flows']

  const breathing: string[] = prakriti === 'Vata'
    ? ['Nadi Shodhana (Alternate Nostril) - 10 min', 'Bhramari (Humming Bee) - 5 min', 'Deep belly breathing - 10 min', 'Ujjayi (Ocean Breath) - 5 min']
    : prakriti === 'Pitta'
    ? ['Sheetali (Cooling Breath) - 5 min', 'Shitkari (Hissing Breath) - 5 min', 'Nadi Shodhana (Alternate Nostril) - 10 min', 'Bhramari (Humming Bee) - 5 min']
    : ['Kapalbhati (Skull Shining) - 5 min', 'Bhastrika (Bellows Breath) - 3 min', 'Surya Bhedana (Right Nostril) - 5 min', 'Ujjayi (Ocean Breath) - 5 min']

  const sleep: string[] = [
    'Sleep by 10 PM during Kapha time',
    '7-8 hours of quality sleep',
    'Avoid screens 1 hour before bed',
    'Warm milk with nutmeg or turmeric before sleep',
    'Foot massage with warm oil',
    'Cool, dark, quiet sleeping environment',
    'Avoid heavy meals 3 hours before sleep',
    'Consistent sleep-wake schedule',
  ]

  const mentalHealth: string[] = [
    'Daily meditation (15-30 min)',
    'Pranayama (breathing exercises)',
    'Sattvic diet (pure, balanced foods)',
    'Positive affirmations',
    'Gratitude practice',
    'Limit social media and news',
    'Spend time in nature',
    'Connect with loved ones',
    'Practice self-compassion',
    'Seek professional help when needed',
  ]

  return {
    prakriti,
    dinacharya,
    ritucharya,
    exercise,
    yoga,
    breathing,
    sleep,
    mentalHealth,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const params = lifestyleSchema.parse(body)
    const advice = generateLifestyleAdvice(params)

    return NextResponse.json({ lifestyleAdvice: advice })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    console.error('[Lifestyle Advice API] Error:', error)
    return NextResponse.json({ error: 'Failed to generate lifestyle advice' }, { status: 500 })
  }
}
