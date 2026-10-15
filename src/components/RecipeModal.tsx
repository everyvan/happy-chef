import React from 'react';
import { Recipe, DayOfWeek } from '../types/mealPlan';
import { 
  X, 
  Clock, 
  Users, 
  Flame, 
  CheckCircle2, 
  CalendarPlus, 
  Lightbulb, 
  ChevronDown,
  Check
} from 'lucide-react';

interface RecipeModalProps {
  recipe: Recipe | null;
  onClose: () => void;
  onAddToPlan: (recipeId: string, day: DayOfWeek, mealType: 'lunch' | 'dinner') => void;
  initialServings?: number;
}

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  onClose,
  onAddToPlan,
  initialServings = 2
}) => {
  const [modalServings, setModalServings] = React.useState<number>(initialServings);
  const [completedSteps, setCompletedSteps] = React.useState<Set<number>>(new Set());
  const [selectedDay, setSelectedDay] = React.useState<DayOfWeek>('Monday');
  const [selectedSlot, setSelectedSlot] = React.useState<'lunch' | 'dinner'>('dinner');
  const [addedSuccess, setAddedSuccess] = React.useState(false);

  React.useEffect(() => {
    setModalServings(initialServings);
    setCompletedSteps(new Set());
    setAddedSuccess(false);
  }, [recipe, initialServings]);

  if (!recipe) return null;

  const toggleStep = (index: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const handleAdd = () => {
    onAddToPlan(recipe.id, selectedDay, selectedSlot);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2200);
  };

  const servingRatio = modalServings / recipe.servings;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-white text-neutral-600 hover:text-neutral-900 shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Container */}
        <div className="relative h-64 sm:h-72 w-full bg-neutral-100 overflow-hidden">
          <img 
            src={recipe.heroImage} 
            alt={recipe.title} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
            <div className="text-white space-y-1">
              <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
                <span>{recipe.cuisine} Cuisine</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono">{recipe.cookTimeMinutes}m cook</span>
                <span aria-hidden="true">·</span>
                <span>Nutri-Grade {recipe.nutriGrade}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                {recipe.title}
              </h2>
              {recipe.vernacularName && (
                <p className="text-sm text-neutral-200">
                  {recipe.vernacularName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Quick Metrics Bar: Unboxed metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-neutral-200">
            <div className="flex items-center gap-4 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-neutral-400" />
                <span>Prep: <strong className="font-medium text-neutral-900 tabular-nums">{recipe.prepTimeMinutes}m</strong></span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span><strong className="font-medium text-neutral-900 tabular-nums">{Math.round(recipe.calories * servingRatio)}</strong> kcal</span>
              </div>
              <span>·</span>
              <div>
                <span>Protein: <strong className="font-medium text-neutral-900 tabular-nums">{Math.round(recipe.proteinGrams * servingRatio)}g</strong></span>
              </div>
            </div>

            {/* Servings Scaler */}
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-lg">
              <span className="text-xs text-neutral-500 pl-2">Servings:</span>
              {[1, 2, 4, 6].map(s => (
                <button
                  key={s}
                  onClick={() => setModalServings(s)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded transition-colors tabular-nums ${
                    modalServings === s ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 leading-relaxed">
            {recipe.description}
          </p>

          {/* Singapore Wet Market Pro-Tip Callout (Hairline all-around border, no thick left bar) */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                Singapore Wet Market & Sourcing Secret
              </h4>
              <p className="text-xs text-amber-800 leading-relaxed">
                {recipe.wetMarketTip}
              </p>
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
                Ingredients ({modalServings} Pax)
              </h3>
              <span className="text-xs text-neutral-500">
                FairPrice est. S${(recipe.ingredients.reduce((a, b) => a + b.fairpriceSGD, 0) * servingRatio).toFixed(2)}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {recipe.ingredients.map(ing => (
                <div 
                  key={ing.id} 
                  className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-100 bg-neutral-50/70 text-xs"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-neutral-900">
                      {ing.name}
                    </span>
                    {ing.localName && (
                      <span className="text-[11px] text-neutral-500">
                        {ing.localName}
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-semibold tabular-nums text-neutral-800">
                      {(ing.amount * servingRatio).toFixed(ing.amount % 1 === 0 ? 0 : 1)} {ing.unit}
                    </span>
                    <span className="block text-[10px] text-neutral-400 font-mono tabular-nums">
                      ~S${(ing.fairpriceSGD * servingRatio).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Cooking Steps */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider">
              Preparation & Cooking Steps
            </h3>
            <div className="space-y-2.5">
              {recipe.instructions.map((step, idx) => {
                const isDone = completedSteps.has(idx);
                return (
                  <div 
                    key={idx}
                    onClick={() => toggleStep(idx)}
                    className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                      isDone 
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-400 line-through' 
                        : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                      isDone ? 'bg-neutral-200 text-neutral-500' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed flex-1">
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Add to Week Plan Action Bar */}
          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-neutral-500 whitespace-nowrap">Slot into:</span>
              <select
                value={selectedDay}
                onChange={e => setSelectedDay(e.target.value as DayOfWeek)}
                className="text-xs bg-neutral-100 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-800 font-medium"
              >
                {DAYS.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={selectedSlot}
                onChange={e => setSelectedSlot(e.target.value as 'lunch' | 'dinner')}
                className="text-xs bg-neutral-100 border border-neutral-200 rounded-lg px-2.5 py-1.5 text-neutral-800 font-medium"
              >
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleAdd}
                className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Added to {selectedDay}!</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4" />
                    <span>Add to Meal Plan</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
