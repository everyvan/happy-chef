import React from 'react';
import { Recipe, Cuisine, DietaryTag, DayOfWeek } from '../types/mealPlan';
import { RECIPES, CUISINES, DIETARY_TAGS } from '../data/recipes';
import { 
  fetchExternalMealDbRecipes, 
  fetchExternalMealDbDetail, 
  TheMealDBSummary 
} from '../services/mealDbService';
import { 
  Search, 
  Clock, 
  Flame, 
  ChefHat, 
  Globe, 
  Sparkles, 
  RefreshCw, 
  CheckCircle2,
  ExternalLink,
  Loader2
} from 'lucide-react';

interface RecipeLibraryProps {
  onSelectRecipe: (recipe: Recipe) => void;
  onQuickAddToPlan: (recipeId: string, day: DayOfWeek, mealType: 'lunch' | 'dinner') => void;
}

export const RecipeLibrary: React.FC<RecipeLibraryProps> = ({
  onSelectRecipe,
  onQuickAddToPlan
}) => {
  const [sourceMode, setSourceMode] = React.useState<'local' | 'mealdb'>('local');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCuisine, setSelectedCuisine] = React.useState<Cuisine | 'All'>('All');
  const [selectedTag, setSelectedTag] = React.useState<DietaryTag | 'All'>('All');

  // External TheMealDB state
  const [externalIngredient, setExternalIngredient] = React.useState('chicken_breast');
  const [externalMeals, setExternalMeals] = React.useState<TheMealDBSummary[]>([]);
  const [loadingExternal, setLoadingExternal] = React.useState(false);
  const [fetchingDetailId, setFetchingDetailId] = React.useState<string | null>(null);

  // Load external recipes on mount or when ingredient changes
  const loadExternalRecipes = React.useCallback(async (ingredientToFetch: string) => {
    setLoadingExternal(true);
    try {
      const meals = await fetchExternalMealDbRecipes(ingredientToFetch);
      setExternalMeals(meals);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingExternal(false);
    }
  }, []);

  React.useEffect(() => {
    loadExternalRecipes(externalIngredient);
  }, [loadExternalRecipes, externalIngredient]);

  // Handle clicking external meal
  const handleSelectExternalMeal = async (mealSummary: TheMealDBSummary) => {
    setFetchingDetailId(mealSummary.idMeal);
    try {
      const fullRecipe = await fetchExternalMealDbDetail(mealSummary.idMeal);
      if (fullRecipe) {
        onSelectRecipe(fullRecipe);
      }
    } finally {
      setFetchingDetailId(null);
    }
  };

  const filteredLocalRecipes = React.useMemo(() => {
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

  const filteredExternalMeals = React.useMemo(() => {
    if (!searchQuery.trim()) return externalMeals;
    return externalMeals.filter(m => m.strMeal.toLowerCase().includes(searchQuery.toLowerCase().trim()));
  }, [externalMeals, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
            <ChefHat className="w-4 h-4" />
            <span>Recipe Catalog & Live Serverless Sync</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 leading-tight">
            Explore Singapore Staples & Live Culinary APIs
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Browse authentic local home-cooking calibrated for Singapore kitchens or pull fresh recipes in real-time from TheMealDB serverless connection.
          </p>
        </div>

        {/* Source Switcher (Segmented Control per Frontend Design constitution) */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-neutral-100 p-1.5 rounded-xl border border-neutral-200">
          <button
            onClick={() => setSourceMode('local')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
              sourceMode === 'local'
                ? 'bg-white text-neutral-900 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <ChefHat className="w-3.5 h-3.5" />
            <span>Singapore Classics ({RECIPES.length})</span>
          </button>
          <button
            onClick={() => setSourceMode('mealdb')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
              sourceMode === 'mealdb'
                ? 'bg-white text-amber-700 shadow-xs'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>TheMealDB API ({externalMeals.length})</span>
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS */}
      {sourceMode === 'local' ? (
        <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
          {/* Search input */}
          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by dish name, local vernacular (e.g. 炒饭, Rendang, 金目鲈), or ingredient..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
            />
          </div>

          {/* Cuisine Filter Tabs */}
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

          {/* Dietary Tag Filters */}
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
      ) : (
        /* TheMealDB Live Serverless Filter Bar */
        <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-700">API Endpoint:</span>
              <code className="text-xs font-mono bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded border border-neutral-200">
                /api/recipes/external?i={externalIngredient}
              </code>
            </div>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>Serverless Express Proxy Active</span>
            </div>
          </div>

          {/* Search by ingredient in TheMealDB */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter downloaded meals by title..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            {/* Quick ingredient selector pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
              <span className="text-xs text-neutral-500 whitespace-nowrap">Source Ingredient:</span>
              {['chicken_breast', 'salmon', 'beef', 'pork'].map(ing => (
                <button
                  key={ing}
                  onClick={() => {
                    setExternalIngredient(ing);
                    loadExternalRecipes(ing);
                  }}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                    externalIngredient === ing
                      ? 'bg-amber-600 text-white'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {ing}
                </button>
              ))}
              <button
                onClick={() => loadExternalRecipes(externalIngredient)}
                className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded hover:bg-neutral-100"
                title="Refresh API data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingExternal ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RECIPES DISPLAY */}
      {sourceMode === 'local' ? (
        /* Local Singapore Dishes */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLocalRecipes.map(recipe => {
            const estimatedCost = recipe.ingredients.reduce((acc, curr) => acc + curr.fairpriceSGD, 0);

            return (
              <div
                key={recipe.id}
                onClick={() => onSelectRecipe(recipe)}
                className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
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
      ) : (
        /* TheMealDB External Dishes from Serverless Connection */
        <div>
          {loadingExternal ? (
            <div className="bg-white border border-neutral-200 rounded-xl p-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin mx-auto" />
              <p className="text-sm font-semibold text-neutral-900">
                Calling serverless endpoint: /api/recipes/external?i={externalIngredient}...
              </p>
              <p className="text-xs text-neutral-500">
                Connecting to TheMealDB database...
              </p>
            </div>
          ) : filteredExternalMeals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredExternalMeals.map(meal => {
                const isCurrentlyLoading = fetchingDetailId === meal.idMeal;

                return (
                  <div
                    key={meal.idMeal}
                    onClick={() => handleSelectExternalMeal(meal)}
                    className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md hover:border-neutral-300 transition-all flex flex-col justify-between cursor-pointer group"
                  >
                    <div>
                      <div className="relative h-48 w-full bg-neutral-100 overflow-hidden">
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-mono shadow-xs">
                          ID: {meal.idMeal}
                        </div>
                        <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 py-0.5 rounded text-[10px] font-semibold shadow-xs">
                          TheMealDB Live
                        </div>
                      </div>

                      <div className="p-4 sm:p-5 space-y-2">
                        <h3 className="text-base font-bold text-neutral-900 group-hover:text-amber-700 transition-colors leading-snug line-clamp-1">
                          {meal.strMeal}
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Sourced live via serverless query for <strong className="text-neutral-800">{externalIngredient}</strong>. Click to inspect full ingredients & add to meal plan.
                        </p>
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-neutral-50/80 border-t border-neutral-100 flex items-center justify-between text-xs">
                      <span className="text-[11px] font-mono text-neutral-500">
                        {externalIngredient.replace('_', ' ')}
                      </span>

                      <button
                        disabled={isCurrentlyLoading}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectExternalMeal(meal);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5"
                      >
                        {isCurrentlyLoading ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Loading...</span>
                          </>
                        ) : (
                          <>
                            <span>Inspect & Plan</span>
                            <ExternalLink className="w-3 h-3" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white border border-neutral-200 rounded-xl p-12 text-center space-y-3">
              <Globe className="w-8 h-8 text-neutral-400 mx-auto" />
              <h3 className="text-sm font-semibold text-neutral-900">
                No external recipes retrieved
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Check that your serverless backend is running and can reach TheMealDB API.
              </p>
              <button
                onClick={() => loadExternalRecipes(externalIngredient)}
                className="px-4 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                Retry Fetching
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
