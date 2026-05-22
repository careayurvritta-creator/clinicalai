import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { searchKnowledge, AYURVEDA_KNOWLEDGE } from '@/lib/ayurknowledge'

const dietChartSchema = z.object({
  prakriti: z.enum(['Vata', 'Pitta', 'Kapha', 'Vata-Pitta', 'Pitta-Kapha', 'Vata-Kapha', 'Tridosha']),
  vikriti: z.string().optional(),
  season: z.enum(['Spring', 'Summer', 'Monsoon', 'Autumn', 'Winter', 'Late Winter']).optional(),
  diseases: z.array(z.string()).optional(),
  age: z.number().optional(),
  activity_level: z.enum(['Sedentary', 'Moderate', 'Active']).default('Moderate'),
})

interface MealPlan {
  time: string
  meal: string
  foods: string[]
  rationale: string
}

interface DietChart {
  prakriti: string
  season: string
  favorable: string[]
  unfavorable: string[]
  mealPlan: MealPlan[]
  generalGuidelines: string[]
  pathya: string[]
  apathya: string[]
}

function generateDietChart(params: z.infer<typeof dietChartSchema>): DietChart {
  const { prakriti, season, diseases, activity_level } = params

  // Prakriti-based food recommendations
  const prakritiFoods: Record<string, { favorable: string[]; unfavorable: string[] }> = {
    'Vata': {
      favorable: ['Warm soups', 'Cooked grains (rice, wheat)', 'Root vegetables', 'Ghee', 'Milk', 'Sweet fruits', 'Nuts', 'Warm spices (ginger, cinnamon)'],
      unfavorable: ['Raw vegetables', 'Cold foods', 'Dry crackers', 'Beans (except mung)', 'Bitter vegetables', 'Caffeine'],
    },
    'Pitta': {
      favorable: ['Cool foods', 'Sweet fruits', 'Coconut', 'Cucumber', 'Milk', 'Ghee', 'Rice', 'Sweet vegetables'],
      unfavorable: ['Spicy foods', 'Sour fruits', 'Fermented foods', 'Red meat', 'Alcohol', 'Coffee'],
    },
    'Kapha': {
      favorable: ['Light foods', 'Honey', 'Warm spices', 'Vegetables', 'Mung dal', 'Barley', 'Light fruits'],
      unfavorable: ['Heavy foods', 'Dairy', 'Sweet foods', 'Cold foods', 'Oily foods', 'Wheat'],
    },
    'Vata-Pitta': {
      favorable: ['Warm, moderately spiced foods', 'Sweet fruits', 'Cooked vegetables', 'Ghee', 'Rice', 'Mung dal'],
      unfavorable: ['Very cold foods', 'Very spicy foods', 'Raw vegetables', 'Fermented foods'],
    },
    'Pitta-Kapha': {
      favorable: ['Light, cool foods', 'Bitter vegetables', 'Mung dal', 'Barley', 'Light fruits', 'Moderate spices'],
      unfavorable: ['Heavy, oily foods', 'Very spicy foods', 'Dairy excess', 'Sweet excess'],
    },
    'Vata-Kapha': {
      favorable: ['Warm, light foods', 'Cooked vegetables', 'Mung dal', 'Honey', 'Warm spices', 'Light grains'],
      unfavorable: ['Cold, heavy foods', 'Raw vegetables', 'Excess dairy', 'Excess sweet'],
    },
    'Tridosha': {
      favorable: ['Balanced diet with all six tastes', 'Seasonal foods', 'Moderate portions', 'Fresh, whole foods'],
      unfavorable: ['Extreme tastes', 'Processed foods', 'Irregular eating patterns'],
    },
  }

  // Seasonal adjustments
  const seasonalFoods: Record<string, { favorable: string[]; unfavorable: string[] }> = {
    'Spring': {
      favorable: ['Light, dry foods', 'Honey', 'Bitter vegetables', 'Barley', 'Mung dal'],
      unfavorable: ['Heavy, oily foods', 'Sweet excess', 'Dairy excess'],
    },
    'Summer': {
      favorable: ['Cool foods', 'Sweet fruits', 'Coconut water', 'Cucumber', 'Mint', 'Light meals'],
      unfavorable: ['Spicy foods', 'Hot foods', 'Fried foods', 'Alcohol'],
    },
    'Monsoon': {
      favorable: ['Warm, light foods', 'Ginger', 'Honey', 'Cooked vegetables', 'Mung dal'],
      unfavorable: ['Raw foods', 'Street food', 'Heavy meals', 'Excess water'],
    },
    'Autumn': {
      favorable: ['Sweet, bitter, astringent tastes', 'Cooked foods', 'Ghee', 'Rice', 'Light proteins'],
      unfavorable: ['Spicy foods', 'Sour foods', 'Fermented foods'],
    },
    'Winter': {
      favorable: ['Warm, nourishing foods', 'Soups', 'Nuts', 'Ghee', 'Root vegetables', 'Warm spices'],
      unfavorable: ['Cold foods', 'Raw foods', 'Light meals'],
    },
    'Late Winter': {
      favorable: ['Lighter foods', 'Bitter vegetables', 'Honey', 'Warm spices', 'Mung dal'],
      unfavorable: ['Heavy foods', 'Excess sweet', 'Oily foods'],
    },
  }

  const currentSeason = season || 'Winter'
  const prakritiKey = prakriti in prakritiFoods ? prakriti : 'Tridosha'

  const favorable = [
    ...(prakritiFoods[prakritiKey]?.favorable || []),
    ...(seasonalFoods[currentSeason]?.favorable || []),
  ]
  const unfavorable = [
    ...(prakritiFoods[prakritiKey]?.unfavorable || []),
    ...(seasonalFoods[currentSeason]?.unfavorable || []),
  ]

  // Activity level adjustments
  const activityMultiplier = activity_level === 'Active' ? 1.3 : activity_level === 'Sedentary' ? 0.8 : 1.0

  const mealPlan: MealPlan[] = [
    {
      time: '6:00-7:00 AM',
      meal: 'Early Morning',
      foods: ['Warm water with lemon', 'Soaked almonds (5-7)', 'Raisins (5-7)'],
      rationale: 'Gently activates Agni after overnight fast',
    },
    {
      time: '7:30-8:30 AM',
      meal: 'Breakfast',
      foods: prakriti === 'Vata'
        ? ['Warm porridge with ghee', 'Sweet fruits', 'Warm milk']
        : prakriti === 'Pitta'
        ? ['Cool cereal with milk', 'Sweet fruits', 'Coconut']
        : ['Light breakfast', 'Honey', 'Warm water'],
      rationale: 'Provides sustained energy, respects digestive capacity',
    },
    {
      time: '10:00-10:30 AM',
      meal: 'Mid-Morning Snack',
      foods: ['Seasonal fruit', 'Herbal tea'],
      rationale: 'Maintains energy without burdening digestion',
    },
    {
      time: '12:00-1:00 PM',
      meal: 'Lunch (Main Meal)',
      foods: [
        'Rice or chapati',
        'Dal (mung or toor)',
        'Seasonal vegetables',
        'Ghee (1-2 tsp)',
        'Buttermilk or curd',
        'Salad (if Vata: cooked; if Pitta: raw; if Kapha: minimal)',
      ],
      rationale: 'Lunch should be the largest meal when Agni is strongest',
    },
    {
      time: '3:00-3:30 PM',
      meal: 'Afternoon Snack',
      foods: ['Herbal tea', 'Light snack (nuts or fruit)'],
      rationale: 'Maintains energy for afternoon activities',
    },
    {
      time: '6:00-7:00 PM',
      meal: 'Dinner (Light)',
      foods: prakriti === 'Vata'
        ? ['Warm soup', 'Soft cooked vegetables', 'Rice or bread']
        : prakriti === 'Pitta'
        ? ['Cool salad', 'Light curry', 'Rice']
        : ['Very light meal', 'Soup', 'Steamed vegetables'],
      rationale: 'Light dinner supports digestion before sleep',
    },
    {
      time: '8:00-8:30 PM',
      meal: 'Before Sleep',
      foods: ['Warm milk with turmeric', 'Or chamomile tea'],
      rationale: 'Promotes restful sleep and tissue nourishment',
    },
  ]

  const generalGuidelines = [
    'Eat at regular times daily',
    'Eat in a calm, peaceful environment',
    'Chew food thoroughly (20-30 times per bite)',
    'Drink warm water throughout the day',
    'Avoid eating when stressed or emotional',
    'Wait 3-4 hours between meals',
    'Finish dinner at least 2 hours before sleep',
    'Eat seasonal, local, fresh foods',
    'Include all six tastes in daily diet',
    'Practice mindful eating - focus on food',
  ]

  const pathya = [
    'Warm, fresh, home-cooked foods',
    'Eaten at regular times',
    'Moderate portions',
    'Proper food combinations',
    'Seasonal foods',
    'Organic when possible',
  ]

  const apathya = [
    'Incompatible food combinations',
    'Cold, stale, processed foods',
    'Eating at irregular times',
    'Overeating or undereating',
    'Eating while distracted',
    'Excessive raw or excessive cooked foods',
  ]

  return {
    prakriti,
    season: currentSeason,
    favorable: [...new Set(favorable)].slice(0, 15),
    unfavorable: [...new Set(unfavorable)].slice(0, 10),
    mealPlan,
    generalGuidelines,
    pathya,
    apathya,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const params = dietChartSchema.parse(body)
    const dietChart = generateDietChart(params)

    return NextResponse.json({ dietChart })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 })
    }
    console.error('[Diet Chart API] Error:', error)
    return NextResponse.json({ error: 'Failed to generate diet chart' }, { status: 500 })
  }
}
