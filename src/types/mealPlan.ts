export type Cuisine = 'Chinese' | 'Malay' | 'Indian' | 'Peranakan' | 'Fusion';

export type DietaryTag = 
  | 'Halal-friendly' 
  | 'Quick <25m' 
  | 'One-Pot' 
  | 'Rice Cooker' 
  | 'HPB Healthier Choice' 
  | 'Vegetarian' 
  | 'Kid-Friendly' 
  | 'High Protein';

export type IngredientCategory = 
  | 'Produce & Herbs' 
  | 'Meat & Seafood' 
  | 'Chilled & Dairy' 
  | 'Pantry & Sauces' 
  | 'Spices & Aromatics';

export interface Ingredient {
  id: string;
  name: string;
  localName?: string; // e.g. "Chilli Padi", "Tau Kwa", "Kecap Manis"
  amount: number;
  unit: string;
  category: IngredientCategory;
  fairpriceSGD: number;
  shengSiongSGD: number;
  wetMarketSGD: number;
}

export interface Recipe {
  id: string;
  title: string;
  vernacularName?: string; // e.g. "海南鸡饭", "Kari Ayam", "清蒸金目鲈"
  cuisine: Cuisine;
  tags: DietaryTag[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  nutriGrade: 'A' | 'B' | 'C';
  servings: number;
  heroImage: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  wetMarketTip: string;
  storageTip?: string;
}

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export interface PlannedMeal {
  id: string;
  recipeId: string;
  mealType: 'lunch' | 'dinner' | 'breakfast';
  isCooked?: boolean;
  notes?: string;
}

export interface DayPlan {
  day: DayOfWeek;
  dateStr: string;
  lunchRecipeId?: string;
  dinnerRecipeId?: string;
  prepNote?: string;
}

export type SupermarketStore = 'fairprice' | 'shengsiong' | 'wetmarket' | 'coldstorage';

export interface GroceryItemChecked {
  id: string;
  name: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  estimatedPriceSGD: number;
  checked: boolean;
  recipeNames: string[];
}
