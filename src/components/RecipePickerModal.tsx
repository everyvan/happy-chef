import React from 'react';
import { Recipe, DayOfWeek, Cuisine } from '../types/mealPlan';
import { RECIPES, CUISINES } from '../data/recipes';
import { X, Search, Clock, Flame, Check } from 'lucide-react';

interface RecipePickerModalProps {
  day: DayOfWeek | null;
  mealType: 'lunch' | 'dinner' | null;
  onClose: () => void;
  onSelect: (recipeId: string) => void;
}

export const RecipePickerModal: React.FC<RecipePickerModalProps> = ({
  day,
  mealType,
  onClose,
  onSelect
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState<Cuisine | 'All'>('All');

  if (!day || !mealType) return null;

  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesSearch = 
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (recipe.vernacularName && recipe.vernacularName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      recipe.ingredients.some(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div>
            <h3 className="text-base font-bold text-neutral-900">
              Select {mealType === 'lunch' ? 'Lunch' : 'Dinner'} for {day}
            </h3>
            <p className="text-xs text-neutral-500">
              Browse authentic Singapore home recipes or search by ingredient
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-neutral-200 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. fish, curry, chicken rice, tofu)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          {/* Cuisine Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCuisine('All')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCuisine === 'All'
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              All Cuisines
            </button>
            {CUISINES.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  selectedCuisine === c
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-neutral-100">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map(recipe => (
              <div
                key={recipe.id}
                onClick={() => {
                  onSelect(recipe.id);
                  onClose();
                }}
                className="pt-2 first:pt-0 flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-amber-50/60 cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={recipe.heroImage}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 object-cover rounded-lg bg-neutral-100 shrink-0"
                  />
                  <div>
                    <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-amber-800 transition-colors">
                      {recipe.title}
                    </h4>
                    {recipe.vernacularName && (
                      <span className="text-[11px] text-neutral-500 block">
                        {recipe.vernacularName}
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1">
                      <span>{recipe.cuisine}</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{recipe.cookTimeMinutes} mins</span>
                      <span>·</span>
                      <span className="font-mono tabular-nums">{recipe.calories} kcal</span>
                    </div>
                  </div>
                </div>

                <button
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-100 group-hover:bg-amber-600 group-hover:text-white text-neutral-700 rounded-md transition-colors whitespace-nowrap shrink-0"
                >
                  Choose
                </button>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-neutral-400">
              No matching Singapore dishes found. Try searching for "soup", "curry", or "fish".
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
