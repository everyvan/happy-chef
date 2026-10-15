import React from 'react';
import { Recipe, Cuisine, DietaryTag, DayOfWeek } from '../types/mealPlan';
import { RECIPES, CUISINES, DIETARY_TAGS } from '../data/recipes';
import { Search, Clock, Flame, Plus, Filter, Sparkles, ChefHat } from 'lucide-react';

interface RecipeLibraryProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onQuickAddToPlan: (recipeId: string, day: DayOfWeek, mealType: 'lunch' | 'dinner') => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({
  onSelectRecipe,
  onQuickAddToPlan
}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState<Cuisine | 'All'>('All');
  const [selectedTag, setSelectedTag] = React.useState<DietaryTag | 'All'>('All');

  const filteredRecipes = React.useMemo(() => {
    return RECIPES.filter(recipe => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        recipe.title.toLowerCase().includes(q) ||
        (recipe.vernacularName && recipe.vernacularName.toLowerCase().includes(q)) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.ingredients.some(i => i.name.toLowerCase().includes(q) || (i.localName && i.localName.toLowerCase().includes(q)));

      const matchesCuisine = selectedCuisine === 'All' || recipe.cuisine === selectedCuisine;
      const matchesTag = selectedTag === 'All' || recipe.tags.includes(selectedTag);

      return matchesSearch && matchesCuisine && matchesTag;
    });
  }, [searchQuery, selectedCuisine, selectedTag]);

  return (
    <div className="space-y-6">
      
      {/* Hero Banner Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
            <ChefHat className="w-4 h-4" />
            <span>Singapore Home Cook Database</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
            Authentic Local Recipes Sourced for Singapore Kitchens
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Curated dishes with wet-market shopping tips (Tekka, Chinatown, Geylang Serai), FairPrice ingredient estimates, and Healthier Choice (HPB) nutritional metrics.
          </p>
        </div>

        <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 shrink-0 text-xs space-y-1.5 w-full md:w-auto">
          <div className="text-neutral-500">Quick Stats:</div>
          <div className="font-semibold text-neutral-900 text-sm">{RECIPES.length} Curated Dishes</div>
          <div className="text-neutral-500">All calibrated for 2-4 pax HDB kitchens</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by dish name, local vernacular (e.g. 炒饭, Rendang, 金目鲈), or ingredient (chilli padi, tau kwa)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
          />
        </div>

        {/* Cuisine Filter Tabs (Interactive filter buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-medium text-neutral-400 whitespace-nowrap mr-1">Cuisine:</span>
          <button
            onClick={() => setSelectedCuisine('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              selectedCuisine === 'All'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            All Cuisines ({RECIPES.length})
          </button>
          {CUISINES.map(c => {
            const count = RECIPES.filter(r => r.cuisine === c).length;
            return (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCuisine === c
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {c} ({count})
              </button>
            );
          })}
        </div>

        {/* Tag Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none border-t border-neutral-100 pt-3">
          <span className="text-xs font-medium text-neutral-400 whitespace-nowrap mr-1">Diet / Style:</span>
          <button
            onClick={() => setSelectedTag('All')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
              selectedTag === 'All'
                ? 'bg-amber-600 text-white'
                : 'bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
            }`}
          >
            All Styles
          </button>
          {DIETARY_TAGS.map(t => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedTag === t
                  ? 'bg-amber-600 text-white'
                  : 'bg-neutral-50 border border-neutral-200 text-neutral-600 hover:bg-neutral-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      {/* Recipe Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map(recipe => {
          const estimatedCost = recipe.ingredients.reduce((acc, curr) => acc + curr.fairpriceSGD, 0);

          return (
            <div
              key={recipe.id}
              onClick={() => onSelectRecipe(recipe)}
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Image */}
                <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={recipe.heroImage}
                    alt={recipe.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-semibold text-neutral-900 shadow-xs">
                    {recipe.cuisine}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded text-[11px] font-bold font-mono text-neutral-900 shadow-xs">
                    Nutri {recipe.nutriGrade}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 space-y-2.5">
                  <div>
                    <h3 className="text-base font-bold text-neutral-900 group-hover:text-amber-700 transition-colors leading-snug">
                      {recipe.title}
                    </h3>
                    {recipe.vernacularName && (
                      <span className="text-xs text-neutral-500 font-medium">
                        {recipe.vernacularName}
                      </span>
                    )}
                  </div>

                  {/* Clean unboxed metadata with typographic separators */}
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      {recipe.cookTimeMinutes} mins
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono tabular-nums">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      {recipe.calories} kcal
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{recipe.tags[0]}</span>
                  </div>

                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {recipe.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-neutral-400 text-[11px] block">Est. ingredients</span>
                  <span className="font-mono font-bold text-neutral-900 tabular-nums">
                    S${estimatedCost.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-neutral-500"> / {recipe.servings} pax</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectRecipe(recipe);
                  }}
                  className="px-3 py-1.5 text-xs font-semibold text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-200 rounded-lg shadow-2xs transition-colors"
                >
                  View Steps & Tips
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredRecipes.length === 0 && (
        <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center space-y-3">
          <ChefHat className="w-8 h-8 text-neutral-400 mx-auto" />
          <h3 className="text-sm font-semibold text-neutral-900">
            No dishes matching your filter criteria
          </h3>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Try resetting your search query or cuisine filter to explore all Singaporean favorites.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCuisine('All');
              setSelectedTag('All');
            }}
            className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

    </div>
  );
};
