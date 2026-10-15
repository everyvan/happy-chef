import React from 'react';
import { DayPlan, Recipe, SupermarketStore } from '../types/mealPlan';
import { RECIPES } from '../data/recipes';
import { PLAN_PRESETS } from '../data/defaultPlan';
import { 
  Clock, 
  RotateCcw, 
  Plus, 
  Sparkles, 
  DollarSign, 
  ChevronRight, 
  ShieldCheck, 
  Users, 
  ArrowRightLeft,
  X,
  Store,
  Flame
} from 'lucide-react';

interface WeeklyPlannerProps {
  plan: DayPlan[];
  setPlan: React.Dispatch<React.SetStateAction<DayPlan[]>>;
  servings: number;
  setServings: (servings: number) => void;
  activeStore: SupermarketStore;
  setActiveStore: (store: SupermarketStore) => void;
  recipes?: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onOpenSwapModal: (day: string, mealType: 'lunch' | 'dinner') => void;
  onOpenPresetModal: () => void;
  onNavigateToGroceries: () => void;
}

export const WeeklyPlanner: React.FC<WeeklyPlannerProps> = ({
  plan,
  setPlan,
  servings,
  setServings,
  activeStore,
  setActiveStore,
  recipes = RECIPES,
  onSelectRecipe,
  onOpenSwapModal,
  onOpenPresetModal,
  onNavigateToGroceries
}) => {
  const recipeMap = React.useMemo(() => {
    const map = new Map<string, Recipe>();
    recipes.forEach(r => map.set(r.id, r));
    return map;
  }, [recipes]);

  // Compute weekly metrics
  const { totalEstimatedCost, averageCookTime, nutriGradeACount, plannedMealsCount } = React.useMemo(() => {
    let cost = 0;
    let totalTime = 0;
    let count = 0;
    let gradeA = 0;

    plan.forEach(day => {
      [day.lunchRecipeId, day.dinnerRecipeId].forEach(id => {
        if (id && recipeMap.has(id)) {
          const r = recipeMap.get(id)!;
          const ingredientSum = r.ingredients.reduce((acc, ing) => {
            const price = activeStore === 'shengsiong' ? ing.shengSiongSGD :
                          activeStore === 'wetmarket' ? ing.wetMarketSGD : ing.fairpriceSGD;
            return acc + price;
          }, 0);
          // Scale cost for servings (base is 2 servings)
          cost += (ingredientSum / r.servings) * servings;
          totalTime += r.cookTimeMinutes;
          count++;
          if (r.nutriGrade === 'A') gradeA++;
        }
      });
    });

    return {
      totalEstimatedCost: cost,
      averageCookTime: count > 0 ? Math.round(totalTime / count) : 0,
      nutriGradeACount: gradeA,
      plannedMealsCount: count
    };
  }, [plan, recipeMap, activeStore, servings]);

  // Handle shuffling a single day with random recipes
  const handleShuffleDay = (dayIndex: number) => {
    const allIds = RECIPES.map(r => r.id);
    const randomLunch = allIds[Math.floor(Math.random() * allIds.length)];
    let randomDinner = allIds[Math.floor(Math.random() * allIds.length)];
    if (randomDinner === randomLunch) {
      randomDinner = allIds[(Math.floor(Math.random() * allIds.length) + 1) % allIds.length];
    }

    setPlan(prev => {
      const next = [...prev];
      next[dayIndex] = {
        ...next[dayIndex],
        lunchRecipeId: randomLunch,
        dinnerRecipeId: randomDinner
      };
      return next;
    });
  };

  const handleRemoveMeal = (dayIndex: number, mealType: 'lunch' | 'dinner', e: React.MouseEvent) => {
    e.stopPropagation();
    setPlan(prev => {
      const next = [...prev];
      if (mealType === 'lunch') {
        next[dayIndex] = { ...next[dayIndex], lunchRecipeId: undefined };
      } else {
        next[dayIndex] = { ...next[dayIndex], dinnerRecipeId: undefined };
      }
      return next;
    });
  };

  const handleApplyPreset = (presetId: string) => {
    const preset = PLAN_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setPlan(prev => {
      return prev.map(d => {
        const match = preset.plan[d.day];
        if (match) {
          return {
            ...d,
            lunchRecipeId: match.lunch,
            dinnerRecipeId: match.dinner
          };
        }
        return d;
      });
    });
  };

  const diningOutWeeklyCost = servings * 14 * 7.5; // Approx S$7.50 per meal at hawker/mall food court
  const weeklySavings = Math.max(0, diningOutWeeklyCost - totalEstimatedCost);

  return (
    <div className="space-y-6">
      
      {/* Top Controls Strip: Presets & Household Setup */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 sm:p-5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Preset quick bar */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 whitespace-nowrap">
            Plan Preset:
          </span>
          <div className="flex flex-wrap items-center gap-1.5">
            {PLAN_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleApplyPreset(preset.id)}
                className="px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-700 rounded-lg transition-colors whitespace-nowrap"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* Servings & Supermarket Selector */}
        <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-start lg:justify-end">
          
          {/* Servings Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-lg p-1">
            <span className="text-xs text-neutral-500 px-2 flex items-center gap-1 whitespace-nowrap">
              <Users className="w-3.5 h-3.5" />
              Pax:
            </span>
            {[1, 2, 4, 6].map(num => (
              <button
                key={num}
                onClick={() => setServings(num)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors tabular-nums ${
                  servings === num 
                    ? 'bg-amber-600 text-white shadow-xs' 
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple' : 'Pax'}
              </button>
            ))}
          </div>

          {/* Supermarket pricing baseline */}
          <div className="flex items-center gap-1.5 bg-neutral-50 border border-neutral-200 rounded-lg p-1">
            <span className="text-xs text-neutral-500 px-2 flex items-center gap-1 whitespace-nowrap">
              <Store className="w-3.5 h-3.5" />
              Store:
            </span>
            <button
              onClick={() => setActiveStore('fairprice')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeStore === 'fairprice' 
                  ? 'bg-red-600 text-white shadow-xs' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              FairPrice
            </button>
            <button
              onClick={() => setActiveStore('shengsiong')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeStore === 'shengsiong' 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sheng Siong
            </button>
            <button
              onClick={() => setActiveStore('wetmarket')}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeStore === 'wetmarket' 
                  ? 'bg-blue-700 text-white shadow-xs' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Wet Market
            </button>
          </div>

        </div>

      </div>

      {/* 7-Day Planner Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3.5">
        {plan.map((dayPlan, dayIdx) => {
          const lunchRecipe = dayPlan.lunchRecipeId ? recipeMap.get(dayPlan.lunchRecipeId) : null;
          const dinnerRecipe = dayPlan.dinnerRecipeId ? recipeMap.get(dayPlan.dinnerRecipeId) : null;

          return (
            <div 
              key={dayPlan.day} 
              className="bg-white border border-neutral-200 rounded-xl flex flex-col justify-between overflow-hidden transition-all hover:border-neutral-300 shadow-xs"
            >
              {/* Day Header */}
              <div className="p-3 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/60">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900 leading-tight">
                    {dayPlan.day}
                  </h3>
                  <span className="text-xs text-neutral-500 tabular-nums">
                    {dayPlan.dateStr}
                  </span>
                </div>
                <button
                  onClick={() => handleShuffleDay(dayIdx)}
                  title="Randomize dishes for this day"
                  className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-md transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Meals Body */}
              <div className="p-3 space-y-3 flex-1 flex flex-col justify-start">
                
                {/* LUNCH SLOT */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <span>Lunch</span>
                    {lunchRecipe && (
                      <span className="text-neutral-400 tabular-nums">
                        {lunchRecipe.cookTimeMinutes}m
                      </span>
                    )}
                  </div>

                  {lunchRecipe ? (
                    <div 
                      onClick={() => onSelectRecipe(lunchRecipe)}
                      className="group relative bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 rounded-lg p-2.5 cursor-pointer transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <img 
                          src={lunchRecipe.heroImage} 
                          alt={lunchRecipe.title} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-md shrink-0 bg-neutral-200" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                            {lunchRecipe.title}
                          </h4>
                          {lunchRecipe.vernacularName && (
                            <p className="text-[11px] text-neutral-500 truncate">
                              {lunchRecipe.vernacularName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Meta bar: NutriGrade & Cost */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-200/60">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono font-bold px-1 rounded text-[10px] ${
                            lunchRecipe.nutriGrade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                            lunchRecipe.nutriGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            Nutri {lunchRecipe.nutriGrade}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums font-mono text-neutral-700">
                            S${((lunchRecipe.ingredients.reduce((a, b) => a + b.fairpriceSGD, 0) / lunchRecipe.servings) * (servings / 2)).toFixed(2)}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => onOpenSwapModal(dayPlan.day, 'lunch')}
                            title="Swap dish"
                            className="p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-200/60 transition-colors"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleRemoveMeal(dayIdx, 'lunch', e)}
                            title="Remove meal"
                            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-200/60 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenSwapModal(dayPlan.day, 'lunch')}
                      className="w-full py-3 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg text-xs text-neutral-500 hover:text-neutral-800 flex items-center justify-center gap-1.5 transition-colors bg-white hover:bg-neutral-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Choose Lunch</span>
                    </button>
                  )}
                </div>

                {/* DINNER SLOT */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    <span>Dinner</span>
                    {dinnerRecipe && (
                      <span className="text-neutral-400 tabular-nums">
                        {dinnerRecipe.cookTimeMinutes}m
                      </span>
                    )}
                  </div>

                  {dinnerRecipe ? (
                    <div 
                      onClick={() => onSelectRecipe(dinnerRecipe)}
                      className="group relative bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/80 rounded-lg p-2.5 cursor-pointer transition-all flex flex-col gap-2"
                    >
                      <div className="flex items-start gap-2.5">
                        <img 
                          src={dinnerRecipe.heroImage} 
                          alt={dinnerRecipe.title} 
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 object-cover rounded-md shrink-0 bg-neutral-200" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-neutral-900 leading-snug line-clamp-2 group-hover:text-amber-700 transition-colors">
                            {dinnerRecipe.title}
                          </h4>
                          {dinnerRecipe.vernacularName && (
                            <p className="text-[11px] text-neutral-500 truncate">
                              {dinnerRecipe.vernacularName}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Meta bar: NutriGrade & Cost */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1 border-t border-neutral-200/60">
                        <div className="flex items-center gap-1.5">
                          <span className={`font-mono font-bold px-1 rounded text-[10px] ${
                            dinnerRecipe.nutriGrade === 'A' ? 'bg-emerald-100 text-emerald-800' :
                            dinnerRecipe.nutriGrade === 'B' ? 'bg-blue-100 text-blue-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            Nutri {dinnerRecipe.nutriGrade}
                          </span>
                          <span>·</span>
                          <span className="tabular-nums font-mono text-neutral-700">
                            S${((dinnerRecipe.ingredients.reduce((a, b) => a + b.fairpriceSGD, 0) / dinnerRecipe.servings) * (servings / 2)).toFixed(2)}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => onOpenSwapModal(dayPlan.day, 'dinner')}
                            title="Swap dish"
                            className="p-1 text-neutral-400 hover:text-neutral-700 rounded hover:bg-neutral-200/60 transition-colors"
                          >
                            <ArrowRightLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={(e) => handleRemoveMeal(dayIdx, 'dinner', e)}
                            title="Remove meal"
                            className="p-1 text-neutral-400 hover:text-red-600 rounded hover:bg-neutral-200/60 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenSwapModal(dayPlan.day, 'dinner')}
                      className="w-full py-3 border border-dashed border-neutral-300 hover:border-neutral-400 rounded-lg text-xs text-neutral-500 hover:text-neutral-800 flex items-center justify-center gap-1.5 transition-colors bg-white hover:bg-neutral-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Choose Dinner</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Prep Note footer */}
              {dayPlan.prepNote && (
                <div className="px-3 py-2 bg-amber-50/60 border-t border-amber-100/80 text-[11px] text-amber-900/80 leading-relaxed">
                  <span className="font-semibold text-amber-800">Tip:</span> {dayPlan.prepNote}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Weekly Financial & Nutritional Intelligence Bar */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Metric 1: Total Estimated Grocery Bill */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5 text-amber-600" />
              Est. Weekly Grocery Total
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
                S${totalEstimatedCost.toFixed(2)}
              </span>
              <span className="text-xs text-neutral-500">
                for {servings} pax ({plannedMealsCount} meals)
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Averages <span className="font-mono font-medium text-neutral-800 tabular-nums">S${plannedMealsCount > 0 ? (totalEstimatedCost / plannedMealsCount).toFixed(2) : '0.00'}</span> per home meal
            </p>
          </div>

          {/* Metric 2: Hawker & Delivery Savings */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Est. Monthly Savings
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-emerald-700">
                ~S${(weeklySavings * 4).toFixed(0)}
              </span>
              <span className="text-xs text-neutral-500">
                vs Eating Out
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Based on S$7.50/pax dining baseline in Singapore
            </p>
          </div>

          {/* Metric 3: Healthier Choice Ratio */}
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider flex items-center gap-1">
              <Flame className="w-3.5 h-3.5" />
              HPB Healthy Balance
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900">
                {plannedMealsCount > 0 ? Math.round((nutriGradeACount / plannedMealsCount) * 100) : 0}%
              </span>
              <span className="text-xs text-neutral-500">
                Nutri-Grade A Meals
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Avg prep time: <span className="font-mono font-medium text-neutral-800 tabular-nums">{averageCookTime} mins</span> / dish
            </p>
          </div>

          {/* Action: Jump to Groceries */}
          <div className="flex flex-col justify-center items-start md:items-end">
            <button
              onClick={onNavigateToGroceries}
              className="w-full md:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <span>View Consolidated Grocery List</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-neutral-500 mt-2">
              Formatted for FairPrice, Sheng Siong & Wet Markets
            </span>
          </div>

        </div>
      </div>

    </div>
  );
};
