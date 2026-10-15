import React from 'react';
import { DayPlan, SupermarketStore, IngredientCategory, Recipe } from '../types/mealPlan';
import { RECIPES } from '../data/recipes';
import { 
  ShoppingBag, 
  Check, 
  Copy, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Store, 
  MessageSquare,
  Sparkles,
  Printer
} from 'lucide-react';

interface GroceryListProps {
  plan: DayPlan[];
  servings: number;
  activeStore: SupermarketStore;
  setActiveStore: (store: SupermarketStore) => void;
  recipes?: Recipe[];
}

interface ConsolidatedItem {
  id: string;
  name: string;
  localName?: string;
  amount: number;
  unit: string;
  category: IngredientCategory;
  fairpriceSGD: number;
  shengSiongSGD: number;
  wetMarketSGD: number;
  recipes: string[];
}

const CATEGORIES: IngredientCategory[] = [
  'Produce & Herbs',
  'Meat & Seafood',
  'Chilled & Dairy',
  'Pantry & Sauces',
  'Spices & Aromatics'
];

export const GroceryList: React.FC<GroceryListProps> = ({
  plan,
  servings,
  activeStore,
  setActiveStore,
  recipes = RECIPES
}) => {
  const [checkedItems, setCheckedItems] = React.useState<Set<string>>(new Set());
  const [customItems, setCustomItems] = React.useState<Array<{ id: string; name: string; category: IngredientCategory; price: number }>>([]);
  const [newItemName, setNewItemName] = React.useState('');
  const [newItemCategory, setNewItemCategory] = React.useState<IngredientCategory>('Pantry & Sauces');
  const [copySuccess, setCopySuccess] = React.useState(false);

  // Consolidate ingredients from the weekly plan
  const consolidated = React.useMemo(() => {
    const map = new Map<string, ConsolidatedItem>();
    const recipeMap = new Map<string, Recipe>(recipes.map(r => [r.id, r]));
    const ratio = servings / 2; // base recipes are 2 pax

    plan.forEach(day => {
      [day.lunchRecipeId, day.dinnerRecipeId].forEach(recipeId => {
        if (!recipeId) return;
        const recipe = recipeMap.get(recipeId);
        if (!recipe) return;

        recipe.ingredients.forEach(ing => {
          const key = ing.name.toLowerCase().trim();
          if (map.has(key)) {
            const existing = map.get(key)!;
            existing.amount += ing.amount * ratio;
            existing.fairpriceSGD += ing.fairpriceSGD * ratio;
            existing.shengSiongSGD += ing.shengSiongSGD * ratio;
            existing.wetMarketSGD += ing.wetMarketSGD * ratio;
            if (!existing.recipes.includes(recipe.title)) {
              existing.recipes.push(recipe.title);
            }
          } else {
            map.set(key, {
              id: ing.id,
              name: ing.name,
              localName: ing.localName,
              amount: ing.amount * ratio,
              unit: ing.unit,
              category: ing.category,
              fairpriceSGD: ing.fairpriceSGD * ratio,
              shengSiongSGD: ing.shengSiongSGD * ratio,
              wetMarketSGD: ing.wetMarketSGD * ratio,
              recipes: [recipe.title]
            });
          }
        });
      });
    });

    return Array.from(map.values());
  }, [plan, servings]);

  // Compute store totals
  const { totalFP, totalSS, totalWM } = React.useMemo(() => {
    let fp = 0;
    let ss = 0;
    let wm = 0;

    consolidated.forEach(item => {
      fp += item.fairpriceSGD;
      ss += item.shengSiongSGD;
      wm += item.wetMarketSGD;
    });

    // Add custom items
    customItems.forEach(ci => {
      fp += ci.price;
      ss += ci.price * 0.94;
      wm += ci.price * 0.90;
    });

    return { totalFP: fp, totalSS: ss, totalWM: wm };
  }, [consolidated, customItems]);

  const activeTotal = 
    activeStore === 'shengsiong' ? totalSS :
    activeStore === 'wetmarket' ? totalWM : totalFP;

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    setCustomItems(prev => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        name: newItemName.trim(),
        category: newItemCategory,
        price: 2.50 // average SGD placeholder
      }
    ]);
    setNewItemName('');
  };

  const handleRemoveCustom = (id: string) => {
    setCustomItems(prev => prev.filter(c => c.id !== id));
  };

  // WhatsApp formatted export
  const handleCopyWhatsApp = () => {
    const storeLabel = 
      activeStore === 'shengsiong' ? 'Sheng Siong' :
      activeStore === 'wetmarket' ? 'Tekka Wet Market' : 'NTUC FairPrice';

    let text = `🛒 *MakanPlan SG Grocery List (${servings} Pax)*\n`;
    text += `📍 Store: ${storeLabel} · Est. Total: S$${activeTotal.toFixed(2)}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    CATEGORIES.forEach(cat => {
      const itemsInCat = consolidated.filter(i => i.category === cat);
      const customInCat = customItems.filter(i => i.category === cat);

      if (itemsInCat.length > 0 || customInCat.length > 0) {
        text += `*${cat.toUpperCase()}*\n`;
        itemsInCat.forEach(item => {
          const isDone = checkedItems.has(item.name.toLowerCase());
          const price = activeStore === 'shengsiong' ? item.shengSiongSGD :
                        activeStore === 'wetmarket' ? item.wetMarketSGD : item.fairpriceSGD;
          text += `${isDone ? '✅' : '▫️'} ${item.name} (${item.amount.toFixed(item.amount % 1 === 0 ? 0 : 1)} ${item.unit}) - S$${price.toFixed(2)}\n`;
        });
        customInCat.forEach(ci => {
          const isDone = checkedItems.has(ci.id);
          text += `${isDone ? '✅' : '▫️'} ${ci.name} - S$${ci.price.toFixed(2)}\n`;
        });
        text += `\n`;
      }
    });

    text += `_Generated with MakanPlan SG_`;

    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const totalItemCount = consolidated.length + customItems.length;
  const completedCount = checkedItems.size;

  return (
    <div className="space-y-6">
      
      {/* Header & Store Selector */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
            <ShoppingBag className="w-4 h-4" />
            <span>Smart Singapore Grocery Consolidated Cart</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Shopping List for {servings} Pax
          </h2>
          <p className="text-xs text-neutral-500">
            Consolidated automatically from your 7-day meal plan. Organised by wet-market stalls and supermarket aisles.
          </p>
        </div>

        {/* Store Comparison Cards */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          
          <button
            onClick={() => setActiveStore('fairprice')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStore === 'fairprice'
                ? 'border-red-600 bg-red-50/50 ring-1 ring-red-600'
                : 'border-neutral-200 bg-white hover:bg-neutral-50'
            }`}
          >
            <div className="text-[11px] font-semibold text-neutral-500">NTUC FairPrice</div>
            <div className="text-base font-bold font-mono text-neutral-900 tabular-nums">
              S${totalFP.toFixed(2)}
            </div>
            <div className="text-[10px] text-neutral-400">Islandwide staple</div>
          </button>

          <button
            onClick={() => setActiveStore('shengsiong')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStore === 'shengsiong'
                ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                : 'border-neutral-200 bg-white hover:bg-neutral-50'
            }`}
          >
            <div className="text-[11px] font-semibold text-neutral-500 flex items-center justify-between">
              <span>Sheng Siong</span>
              <span className="text-emerald-700 font-bold ml-1">Save S${Math.max(0, totalFP - totalSS).toFixed(2)}</span>
            </div>
            <div className="text-base font-bold font-mono text-neutral-900 tabular-nums">
              S${totalSS.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium">Great value greens & tofu</div>
          </button>

          <button
            onClick={() => setActiveStore('wetmarket')}
            className={`p-3 rounded-xl border text-left transition-all ${
              activeStore === 'wetmarket'
                ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                : 'border-neutral-200 bg-white hover:bg-neutral-50'
            }`}
          >
            <div className="text-[11px] font-semibold text-neutral-500 flex items-center justify-between">
              <span>Tekka / Wet Market</span>
              <span className="text-blue-700 font-bold ml-1">Save S${Math.max(0, totalFP - totalWM).toFixed(2)}</span>
            </div>
            <div className="text-base font-bold font-mono text-neutral-900 tabular-nums">
              S${totalWM.toFixed(2)}
            </div>
            <div className="text-[10px] text-blue-600 font-medium">Freshest barramundi & santan</div>
          </button>

        </div>

      </div>

      {/* Action Toolbar */}
      <div className="bg-white border border-neutral-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Progress */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="text-xs text-neutral-600">
            Trolley: <strong className="text-neutral-900 font-mono tabular-nums">{completedCount}</strong> of <strong className="text-neutral-900 font-mono tabular-nums">{totalItemCount}</strong> items checked
          </div>
          {completedCount > 0 && (
            <button
              onClick={() => setCheckedItems(new Set())}
              className="text-xs text-neutral-500 hover:text-neutral-900 underline"
            >
              Reset checks
            </button>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          
          <button
            onClick={handleCopyWhatsApp}
            className="flex-1 sm:flex-initial px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {copySuccess ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4" />
                <span>Copy for WhatsApp</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="px-3 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

        </div>

      </div>

      {/* Category List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {CATEGORIES.map(category => {
          const items = consolidated.filter(i => i.category === category);
          const customInThisCat = customItems.filter(i => i.category === category);

          if (items.length === 0 && customInThisCat.length === 0) return null;

          return (
            <div 
              key={category} 
              className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs flex flex-col justify-between"
            >
              <div className="p-4 border-b border-neutral-100 bg-neutral-50/80 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800">
                  {category}
                </h3>
                <span className="text-[11px] font-mono text-neutral-500">
                  {items.length + customInThisCat.length} items
                </span>
              </div>

              <div className="p-3 divide-y divide-neutral-100 flex-1">
                {items.map(item => {
                  const isChecked = checkedItems.has(item.name.toLowerCase());
                  const price = 
                    activeStore === 'shengsiong' ? item.shengSiongSGD :
                    activeStore === 'wetmarket' ? item.wetMarketSGD : item.fairpriceSGD;

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.name.toLowerCase())}
                      className={`py-2.5 px-2 flex items-center justify-between gap-3 cursor-pointer rounded-lg transition-colors ${
                        isChecked ? 'bg-neutral-50/80 opacity-60' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked 
                            ? 'bg-amber-600 border-amber-600 text-white' 
                            : 'border-neutral-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className={`text-xs font-medium text-neutral-900 ${isChecked ? 'line-through text-neutral-400' : ''}`}>
                            {item.name}
                          </span>
                          {item.localName && (
                            <span className="text-[11px] text-neutral-500 block">
                              {item.localName}
                            </span>
                          )}
                          <div className="text-[10px] text-neutral-400 mt-0.5">
                            Used in: {item.recipes.slice(0, 2).join(', ')}{item.recipes.length > 2 ? ` +${item.recipes.length - 2} more` : ''}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-semibold text-neutral-900 tabular-nums block">
                          {item.amount.toFixed(item.amount % 1 === 0 ? 0 : 1)} {item.unit}
                        </span>
                        <span className="text-[11px] font-mono text-neutral-500 tabular-nums">
                          S${price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Custom added items in this category */}
                {customInThisCat.map(ci => {
                  const isChecked = checkedItems.has(ci.id);
                  return (
                    <div
                      key={ci.id}
                      onClick={() => toggleCheck(ci.id)}
                      className={`py-2.5 px-2 flex items-center justify-between gap-3 cursor-pointer rounded-lg transition-colors ${
                        isChecked ? 'bg-neutral-50/80 opacity-60' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked 
                            ? 'bg-amber-600 border-amber-600 text-white' 
                            : 'border-neutral-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className={`text-xs font-medium text-neutral-900 ${isChecked ? 'line-through text-neutral-400' : ''}`}>
                          {ci.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-neutral-500 tabular-nums">
                          S${ci.price.toFixed(2)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveCustom(ci.id);
                          }}
                          className="text-neutral-400 hover:text-red-600 p-1 rounded"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

      {/* Add Custom Item to Shopping List */}
      <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 mb-3">
          Add Extra Household Groceries (e.g. Milo, Kaya, Yakult)
        </h3>
        <form onSubmit={handleAddCustom} className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            placeholder="Item name (e.g. Gardenia white bread, eggs 10s, Marigold fresh milk)..."
            value={newItemName}
            onChange={e => setNewItemName(e.target.value)}
            className="flex-1 w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 focus:bg-white"
          />
          <select
            value={newItemCategory}
            onChange={e => setNewItemCategory(e.target.value as IngredientCategory)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-800 font-medium"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </form>
      </div>

    </div>
  );
};
