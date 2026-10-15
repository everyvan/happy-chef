import { Recipe, Ingredient } from '../types/mealPlan';

export interface TheMealDBSummary {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface TheMealDBDetail {
  idMeal: string;
  strMeal: string;
  strCategory?: string;
  strArea?: string;
  strInstructions?: string;
  strMealThumb: string;
  strTags?: string;
  [key: string]: any;
}

/**
 * Fetch list of meals from serverless backend proxy
 * Defaults to 'chicken_breast' as requested
 */
export async function fetchExternalMealDbRecipes(ingredient: string = 'chicken_breast'): Promise<TheMealDBSummary[]> {
  try {
    const res = await fetch(`/api/recipes/external?i=${encodeURIComponent(ingredient)}`);
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    return data.meals || [];
  } catch (error) {
    console.error('Failed to fetch from serverless endpoint /api/recipes/external:', error);
    // Fallback direct or empty list
    return [];
  }
}

/**
 * Fetch full meal details from serverless backend proxy
 */
export async function fetchExternalMealDbDetail(idMeal: string): Promise<Recipe | null> {
  try {
    const res = await fetch(`/api/recipes/external/${encodeURIComponent(idMeal)}`);
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    const meal: TheMealDBDetail | undefined = data.meals?.[0];
    if (!meal) return null;

    return convertMealDbToRecipe(meal);
  } catch (error) {
    console.error(`Failed to fetch recipe detail for ${idMeal}:`, error);
    return null;
  }
}

/**
 * Convert TheMealDB API record into the MakanPlan Recipe interface
 */
export function convertMealDbToRecipe(meal: TheMealDBDetail): Recipe {
  const ingredients: Ingredient[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingName = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingName && ingName.trim()) {
      const cleanName = ingName.trim();
      const cleanMeasure = (measure || '').trim();

      // Estimate category
      const lower = cleanName.toLowerCase();
      let category: Ingredient['category'] = 'Pantry & Sauces';
      if (lower.includes('chicken') || lower.includes('beef') || lower.includes('prawn') || lower.includes('fish') || lower.includes('meat') || lower.includes('pork')) {
        category = 'Meat & Seafood';
      } else if (lower.includes('onion') || lower.includes('garlic') || lower.includes('chili') || lower.includes('ginger') || lower.includes('coriander') || lower.includes('lime') || lower.includes('tomato') || lower.includes('potato') || lower.includes('mushroom') || lower.includes('spinach')) {
        category = 'Produce & Herbs';
      } else if (lower.includes('egg') || lower.includes('milk') || lower.includes('cheese') || lower.includes('butter') || lower.includes('cream') || lower.includes('tofu')) {
        category = 'Chilled & Dairy';
      } else if (lower.includes('curry') || lower.includes('cumin') || lower.includes('pepper') || lower.includes('paprika') || lower.includes('turmeric') || lower.includes('cinnamon')) {
        category = 'Spices & Aromatics';
      }

      // Generate realistic SG prices based on category
      const baseFP = category === 'Meat & Seafood' ? 4.80 : category === 'Produce & Herbs' ? 1.20 : category === 'Chilled & Dairy' ? 1.80 : 1.10;
      const baseSS = Number((baseFP * 0.92).toFixed(2));
      const baseWM = Number((baseFP * 0.88).toFixed(2));

      ingredients.push({
        id: `ext-${meal.idMeal}-ing-${i}`,
        name: cleanName,
        localName: cleanMeasure ? `${cleanName} (${cleanMeasure})` : cleanName,
        amount: 1,
        unit: cleanMeasure || 'portion',
        category,
        fairpriceSGD: baseFP,
        shengSiongSGD: baseSS,
        wetMarketSGD: baseWM,
      });
    }
  }

  // Parse instructions into steps
  const steps = (meal.strInstructions || '')
    .split(/\r?\n+/)
    .map(s => s.trim())
    .filter(s => s.length > 15);

  const finalSteps = steps.length > 0 ? steps : [
    'Prepare and rinse the ingredients thoroughly.',
    'Follow traditional pan-searing and simmering instructions for tender chicken breast.',
    'Plate hot and serve immediately.'
  ];

  // Determine cuisine
  let cuisine: Recipe['cuisine'] = 'Fusion';
  const area = (meal.strArea || '').toLowerCase();
  if (area.includes('chinese')) cuisine = 'Chinese';
  else if (area.includes('malaysian')) cuisine = 'Malay';
  else if (area.includes('indian')) cuisine = 'Indian';

  return {
    id: `mealdb-${meal.idMeal}`,
    title: meal.strMeal,
    vernacularName: meal.strArea ? `${meal.strArea} Chicken Breast Special` : 'International Chicken Dish',
    cuisine,
    tags: ['High Protein', 'Kid-Friendly'],
    prepTimeMinutes: 15,
    cookTimeMinutes: 25,
    calories: 420,
    proteinGrams: 36,
    carbsGrams: 22,
    fatGrams: 11,
    nutriGrade: 'A',
    servings: 2,
    heroImage: meal.strMealThumb,
    description: `Fresh chicken breast dish fetched live from TheMealDB serverless integration (${meal.strArea || 'Global'} cuisine, Category: ${meal.strCategory || 'Chicken'}).`,
    wetMarketTip: 'For chicken breast dishes, buy fresh chilled breast fillet from the wet market or NTUC FairPrice and brine for 15 mins in light salted water for maximum juiciness.',
    ingredients,
    instructions: finalSteps,
  };
}
