import React from 'react';
import { DayPlan, Recipe, SupermarketStore, DayOfWeek } from './types/mealPlan';
import { INITIAL_WEEK_PLAN, PLAN_PRESETS } from './data/defaultPlan';
import { RECIPES } from './data/recipes';
import { Navbar } from './components/Navbar';
import { WeeklyPlanner } from './components/WeeklyPlanner';
import { RecipeLibrary } from './components/RecipeLibrary';
import { GroceryList } from './components/GroceryList';
import { FridgeRescue } from './components/FridgeRescue';
import { MealPrepSecrets } from './components/MealPrepSecrets';
import { RecipeModal } from './components/RecipeModal';
import { RecipePickerModal } from './components/RecipePickerModal';
import { AutoPlanModal } from './components/AutoPlanModal';
import { FreemiumModal } from './components/FreemiumModal';
import { ChefHat, Heart, Sparkles, Store, ShieldCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = React.useState<'planner' | 'recipes' | 'groceries' | 'fridge' | 'prep'>('planner');
  const [plan, setPlan] = React.useState<DayPlan[]>(INITIAL_WEEK_PLAN);
  const [servings, setServings] = React.useState<number>(2);
  const [activeStore, setActiveStore] = React.useState<SupermarketStore>('fairprice');
  
  // Modals state
  const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);
  const [swapModalState, setSwapModalState] = React.useState<{
    isOpen: boolean;
    day: DayOfWeek | null;
    mealType: 'lunch' | 'dinner' | null;
  }>({
    isOpen: false,
    day: null,
    mealType: null
  });
  const [autoPlanModalOpen, setAutoPlanModalOpen] = React.useState(false);
  const [freemiumModalOpen, setFreemiumModalOpen] = React.useState(false);
  const [customRecipes, setCustomRecipes] = React.useState<Recipe[]>([]);

  // Combined recipe catalog including live-loaded external TheMealDB recipes
  const allRecipes = React.useMemo(() => {
    const map = new Map<string, Recipe>();
    RECIPES.forEach(r => map.set(r.id, r));
    customRecipes.forEach(r => map.set(r.id, r));
    return Array.from(map.values());
  }, [customRecipes]);

  // Grocery count calculated from current weekly plan
  const groceryCount = React.useMemo(() => {
    const uniqueIngredients = new Set<string>();
    const recipeMap = new Map(allRecipes.map(r => [r.id, r]));

    plan.forEach(day => {
      [day.lunchRecipeId, day.dinnerRecipeId].forEach(id => {
        if (id && recipeMap.has(id)) {
          recipeMap.get(id)!.ingredients.forEach(i => uniqueIngredients.add(i.name));
        }
      });
    });

    return uniqueIngredients.size;
  }, [plan, allRecipes]);

  // Open swap modal for specific day and meal
  const handleOpenSwapModal = (day: string, mealType: 'lunch' | 'dinner') => {
    setSwapModalState({
      isOpen: true,
      day: day as DayOfWeek,
      mealType
    });
  };

  // Register external recipe if new
  const registerRecipe = React.useCallback((recipe: Recipe) => {
    setCustomRecipes(prev => {
      if (prev.some(r => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  }, []);

  // Add recipe into plan from modal
  const handleAddToPlan = (recipeId: string, day: DayOfWeek, mealType: 'lunch' | 'dinner') => {
    setPlan(prev => {
      return prev.map(d => {
        if (d.day === day) {
          return {
            ...d,
            [mealType === 'lunch' ? 'lunchRecipeId' : 'dinnerRecipeId']: recipeId
          };
        }
        return d;
      });
    });
  };

  // Select recipe from picker modal
  const handleSelectFromPicker = (recipeId: string) => {
    if (swapModalState.day && swapModalState.mealType) {
      handleAddToPlan(recipeId, swapModalState.day, swapModalState.mealType);
    }
  };

  // Auto plan generation handler
  const handleGeneratePlan = (presetId: string, targetPax: number, targetStore: SupermarketStore) => {
    const preset = PLAN_PRESETS.find(p => p.id === presetId);
    if (!preset) return;

    setServings(targetPax);
    setActiveStore(targetStore);

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

    setActiveTab('planner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50/50 text-neutral-900 font-sans">
      
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickGenerate={() => setAutoPlanModalOpen(true)}
        groceryCount={groceryCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'planner' && (
          <WeeklyPlanner
            plan={plan}
            setPlan={setPlan}
            servings={servings}
            setServings={setServings}
            activeStore={activeStore}
            setActiveStore={setActiveStore}
            recipes={allRecipes}
            onSelectRecipe={(r) => {
              registerRecipe(r);
              setSelectedRecipe(r);
            }}
            onOpenSwapModal={handleOpenSwapModal}
            onOpenPresetModal={() => setAutoPlanModalOpen(true)}
            onNavigateToGroceries={() => setActiveTab('groceries')}
          />
        )}

        {activeTab === 'recipes' && (
          <RecipeLibrary
            onSelectRecipe={(r) => {
              registerRecipe(r);
              setSelectedRecipe(r);
            }}
            onQuickAddToPlan={handleAddToPlan}
          />
        )}

        {activeTab === 'groceries' && (
          <GroceryList
            plan={plan}
            servings={servings}
            activeStore={activeStore}
            setActiveStore={setActiveStore}
            recipes={allRecipes}
          />
        )}

        {activeTab === 'fridge' && (
          <FridgeRescue
            onSelectRecipe={setSelectedRecipe}
          />
        )}

        {activeTab === 'prep' && (
          <MealPrepSecrets />
        )}
      </main>

      {/* Detail Recipe Modal */}
      <RecipeModal
        recipe={selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        onAddToPlan={handleAddToPlan}
        initialServings={servings}
      />

      {/* Recipe Swap / Picker Modal */}
      <RecipePickerModal
        day={swapModalState.day}
        mealType={swapModalState.mealType}
        onClose={() => setSwapModalState({ isOpen: false, day: null, mealType: null })}
        onSelect={handleSelectFromPicker}
      />

      {/* Auto Plan Week Preset Modal */}
      <AutoPlanModal
        isOpen={autoPlanModalOpen}
        onClose={() => setAutoPlanModalOpen(false)}
        onGeneratePlan={handleGeneratePlan}
        currentPax={servings}
        currentStore={activeStore}
      />

      {/* Freemium & Subscription Modal */}
      <FreemiumModal
        isOpen={freemiumModalOpen}
        onClose={() => setFreemiumModalOpen(false)}
      />

      {/* Clean, Quiet Footer */}
      <footer className="mt-12 border-t border-neutral-200 bg-white py-8 text-xs text-neutral-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-neutral-900">MakanPlan SG</span>
            <span>·</span>
            <span>Made for Singapore Home Cooks & HDB Kitchens</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setFreemiumModalOpen(true)}
              className="hover:text-amber-700 transition-colors font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Free vs Pro Membership</span>
            </button>
            <button
              onClick={() => setActiveTab('prep')}
              className="hover:text-neutral-900 transition-colors"
            >
              Wet Market Secrets
            </button>
            <span>© 2026 MakanPlan SG</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
