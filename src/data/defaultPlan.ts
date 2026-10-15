import { DayPlan } from '../types/mealPlan';

export const INITIAL_WEEK_PLAN: DayPlan[] = [
  {
    day: 'Monday',
    dateStr: 'Mon, Oct 19',
    lunchRecipeId: 'comfort-abc-soup',
    dinnerRecipeId: 'teochew-steamed-seabass',
    prepNote: 'Buy fresh barramundi from wet market in the morning; slice ginger into fine threads.'
  },
  {
    day: 'Tuesday',
    dateStr: 'Tue, Oct 20',
    lunchRecipeId: 'claypot-silken-tofu',
    dinnerRecipeId: 'nyonya-curry-chicken',
    prepNote: 'Marinate chicken thighs with curry powder & turmeric before leaving for work.'
  },
  {
    day: 'Wednesday',
    dateStr: 'Wed, Oct 21',
    lunchRecipeId: 'south-indian-dal-tadka',
    dinnerRecipeId: 'sambal-kang-kong',
    prepNote: 'Wash and stem fresh kang kong; soak dal for quick evening cook.'
  },
  {
    day: 'Thursday',
    dateStr: 'Thu, Oct 22',
    lunchRecipeId: 'teochew-steamed-seabass',
    dinnerRecipeId: 'singapore-seafood-hor-fun',
    prepNote: 'High heat wok sear night! Unravel fresh kway teow noodles.'
  },
  {
    day: 'Friday',
    dateStr: 'Fri, Oct 23',
    lunchRecipeId: 'claypot-silken-tofu',
    dinnerRecipeId: 'nasi-lemak-set',
    prepNote: 'TGIF fragrant coconut rice in rice cooker + crisp ikan bilis.'
  },
  {
    day: 'Saturday',
    dateStr: 'Sat, Oct 24',
    lunchRecipeId: 'comfort-abc-soup',
    dinnerRecipeId: 'hainanese-chicken-rice',
    prepNote: 'Weekend feast: Prepare ice bath for chicken; render chicken fat for pandan rice.'
  },
  {
    day: 'Sunday',
    dateStr: 'Sun, Oct 25',
    lunchRecipeId: 'south-indian-dal-tadka',
    dinnerRecipeId: 'malay-beef-rendang',
    prepNote: 'Sunday slow-simmering rendang; toast kerisik for rich fragrant nutty depth.'
  }
];

export interface MealPlanPreset {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  plan: Record<string, { lunch: string; dinner: string }>;
}

export const PLAN_PRESETS: MealPlanPreset[] = [
  {
    id: 'balanced-family',
    name: 'Classic Singapore Family',
    subtitle: 'Soup + Steam + Stir-fry harmony',
    description: 'Traditional balance of nourishing clear soups, steamed fresh fish, comforting curry, and wok greens.',
    plan: {
      Monday: { lunch: 'comfort-abc-soup', dinner: 'teochew-steamed-seabass' },
      Tuesday: { lunch: 'claypot-silken-tofu', dinner: 'nyonya-curry-chicken' },
      Wednesday: { lunch: 'south-indian-dal-tadka', dinner: 'sambal-kang-kong' },
      Thursday: { lunch: 'teochew-steamed-seabass', dinner: 'singapore-seafood-hor-fun' },
      Friday: { lunch: 'claypot-silken-tofu', dinner: 'nasi-lemak-set' },
      Saturday: { lunch: 'comfort-abc-soup', dinner: 'hainanese-chicken-rice' },
      Sunday: { lunch: 'south-indian-dal-tadka', dinner: 'malay-beef-rendang' }
    }
  },
  {
    id: 'express-weeknight',
    name: '20-Min Busy Executive',
    subtitle: 'Quick prep & minimal cleanup',
    description: 'Fast, hearty meals ready in under 20-25 minutes with single-pan or rice cooker simplicity.',
    plan: {
      Monday: { lunch: 'comfort-abc-soup', dinner: 'teochew-steamed-seabass' },
      Tuesday: { lunch: 'singapore-seafood-hor-fun', dinner: 'claypot-silken-tofu' },
      Wednesday: { lunch: 'claypot-silken-tofu', dinner: 'sambal-kang-kong' },
      Thursday: { lunch: 'south-indian-dal-tadka', dinner: 'teochew-steamed-seabass' },
      Friday: { lunch: 'comfort-abc-soup', dinner: 'singapore-seafood-hor-fun' },
      Saturday: { lunch: 'claypot-silken-tofu', dinner: 'nasi-lemak-set' },
      Sunday: { lunch: 'singapore-seafood-hor-fun', dinner: 'nyonya-curry-chicken' }
    }
  },
  {
    id: 'halal-comfort',
    name: 'Halal Comfort Flavors',
    subtitle: 'Rich spices, curries & dal',
    description: 'Nutritious halal-friendly Malay, Indian, and Peranakan home recipes rich in rempah and herbs.',
    plan: {
      Monday: { lunch: 'south-indian-dal-tadka', dinner: 'nyonya-curry-chicken' },
      Tuesday: { lunch: 'comfort-abc-soup', dinner: 'sambal-kang-kong' },
      Wednesday: { lunch: 'south-indian-dal-tadka', dinner: 'nasi-lemak-set' },
      Thursday: { lunch: 'comfort-abc-soup', dinner: 'nyonya-curry-chicken' },
      Friday: { lunch: 'south-indian-dal-tadka', dinner: 'singapore-seafood-hor-fun' },
      Saturday: { lunch: 'nasi-lemak-set', dinner: 'malay-beef-rendang' },
      Sunday: { lunch: 'comfort-abc-soup', dinner: 'nyonya-curry-chicken' }
    }
  },
  {
    id: 'hpb-healthier-choice',
    name: 'HPB Healthier Choice',
    subtitle: 'Lower sodium, steamed & wholefoods',
    description: 'Aligned with Health Promotion Board guidelines: lean proteins, steamed cooking, and high fiber greens.',
    plan: {
      Monday: { lunch: 'comfort-abc-soup', dinner: 'teochew-steamed-seabass' },
      Tuesday: { lunch: 'south-indian-dal-tadka', dinner: 'comfort-abc-soup' },
      Wednesday: { lunch: 'teochew-steamed-seabass', dinner: 'claypot-silken-tofu' },
      Thursday: { lunch: 'south-indian-dal-tadka', dinner: 'teochew-steamed-seabass' },
      Friday: { lunch: 'comfort-abc-soup', dinner: 'sambal-kang-kong' },
      Saturday: { lunch: 'claypot-silken-tofu', dinner: 'teochew-steamed-seabass' },
      Sunday: { lunch: 'south-indian-dal-tadka', dinner: 'comfort-abc-soup' }
    }
  }
];
