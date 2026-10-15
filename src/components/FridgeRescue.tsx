import React from 'react';
import { Recipe } from '../types/mealPlan';
import { RECIPES } from '../data/recipes';
import { Sparkles, Check, Clock, Plus, ArrowRight, Utensils } from 'lucide-react';

interface FridgeRescueProps {
  onSelectRecipe: (recipe: Recipe) => void;
}

const COMMON_SG_PANTRY = [
  'Eggs',
  'Jasmine Rice',
  'Garlic',
  'Ginger',
  'Chilli Padi',
  'Chicken',
  'Tofu',
  'Kang Kong',
  'Potatoes',
  'Carrots',
  'Tomatoes',
  'Coconut Milk',
  'Soy Sauce',
  'Sambal',
  'Prawns',
  'Fish'
];

export const FridgeRescue: React.FC<FridgeRescueProps> = ({ onSelectRecipe }) => {
  const [selectedIngredients, setSelectedIngredients] = React.useState<Set<string>>(
    new Set(['Eggs', 'Garlic', 'Chicken', 'Soy Sauce', 'Jasmine Rice'])
  );
  const [customInput, setCustomInput] = React.useState('');

  const toggleIngredient = (name: string) => {
    setSelectedIngredients(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const formatted = customInput.trim();
    setSelectedIngredients(prev => new Set(prev).add(formatted));
    setCustomInput('');
  };

  // Match recipes based on selected ingredients
  const scoredRecipes = React.useMemo(() => {
    const selectedList = Array.from(selectedIngredients).map(i => i.toLowerCase());

    return RECIPES.map(recipe => {
      const matched: string[] = [];
      const missing: string[] = [];

      recipe.ingredients.forEach(ing => {
        const ingNameLower = ing.name.toLowerCase();
        const isMatched = selectedList.some(sel => ingNameLower.includes(sel) || sel.includes(ingNameLower.split(' ')[0]));
        if (isMatched) {
          matched.push(ing.name);
        } else {
          missing.push(ing.name);
        }
      });

      const matchPercent = Math.round((matched.length / recipe.ingredients.length) * 100);

      return {
        recipe,
        matched,
        missing,
        matchPercent
      };
    }).sort((a, b) => b.matchPercent - a.matchPercent);
  }, [selectedIngredients]);

  return (
    <div className="space-y-6">
      
      {/* Intro Box */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Zero Food Waste · Pantry & Fridge Cook</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          What’s Inside Your Fridge Right Now?
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Tap whatever you have left over in your HDB fridge or pantry. We’ll calculate authentic Singapore home recipes you can cook immediately without an extra trip downstairs!
        </p>

        {/* Selected Pantry Chips */}
        <div className="pt-4 space-y-3">
          <span className="text-xs font-semibold text-neutral-700 block">
            Tap to toggle ingredients in your kitchen:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_SG_PANTRY.map(item => {
              const active = selectedIngredients.has(item);
              return (
                <button
                  key={item}
                  onClick={() => toggleIngredient(item)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-amber-600 border-amber-600 text-white shadow-2xs'
                      : 'bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {active && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  <span>{item}</span>
                </button>
              );
            })}
          </div>

          {/* Add custom pantry item */}
          <form onSubmit={handleAddCustom} className="flex items-center gap-2 max-w-md pt-2">
            <input
              type="text"
              placeholder="Add other ingredient (e.g. cabbage, luncheon meat)..."
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <button
              type="submit"
              className="px-3 py-1.5 text-xs font-medium bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Add
            </button>
          </form>
        </div>
      </div>

      {/* Matched Recipes Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
            Matching Singapore Dishes ({scoredRecipes.length})
          </h3>
          <span className="text-xs text-neutral-500">
            Ranked by ingredient availability
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scoredRecipes.map(({ recipe, matched, missing, matchPercent }) => (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 hover:border-neutral-300 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3.5">
                  <img
                    src={recipe.heroImage}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-100 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-amber-700">{recipe.cuisine}</span>
                      <span className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                        matchPercent >= 60 ? 'bg-emerald-100 text-emerald-800' :
                        matchPercent >= 40 ? 'bg-amber-100 text-amber-800' : 'bg-neutral-100 text-neutral-600'
                      }`}>
                        {matchPercent}% Match
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-neutral-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {recipe.title}
                    </h4>
                    {recipe.vernacularName && (
                      <span className="text-xs text-neutral-500 block">
                        {recipe.vernacularName}
                      </span>
                    )}
                  </div>
                </div>

                {/* Match Breakdowns */}
                <div className="space-y-1.5 text-xs">
                  <div className="text-neutral-600">
                    <span className="text-emerald-700 font-medium">You have ({matched.length}):</span>{' '}
                    <span className="text-neutral-500">{matched.join(', ') || 'None'}</span>
                  </div>
                  {missing.length > 0 && (
                    <div className="text-neutral-600">
                      <span className="text-neutral-400 font-medium">Missing ({missing.length}):</span>{' '}
                      <span className="text-neutral-400">{missing.slice(0, 3).join(', ')}{missing.length > 3 ? ` +${missing.length - 3} more` : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-mono tabular-nums flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {recipe.cookTimeMinutes} mins
                </span>
                <span className="font-semibold text-neutral-900 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>View Recipe</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
