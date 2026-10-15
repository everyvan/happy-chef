import React from 'react';
import { ChefHat, ShoppingBag, Calendar, Sparkles, UtensilsCrossed, BookOpen } from 'lucide-react';

interface NavbarProps {
  activeTab: 'planner' | 'recipes' | 'groceries' | 'fridge' | 'prep';
  setActiveTab: (tab: 'planner' | 'recipes' | 'groceries' | 'fridge' | 'prep') => void;
  onOpenQuickGenerate: () => void;
  groceryCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickGenerate,
  groceryCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
      {/* Strict Top Bar Contract: Zone 1 (Wordmark) - Zone 2 (4-5 Nav Links) - Zone 3 (1 Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => setActiveTab('planner')}
          className="flex items-center gap-2 cursor-pointer shrink-0 select-none"
        >
          <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-sm">
            <ChefHat className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-neutral-900 whitespace-nowrap">
              MakanPlan <span className="text-amber-600">SG</span>
            </span>
          </div>
        </div>

        {/* Zone 2: Clean single-line text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => setActiveTab('planner')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'planner' 
                ? 'text-neutral-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                : 'hover:text-neutral-900'
            }`}
          >
            Weekly Planner
          </button>

          <button
            onClick={() => setActiveTab('recipes')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'recipes' 
                ? 'text-neutral-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                : 'hover:text-neutral-900'
            }`}
          >
            Singapore Recipes
          </button>

          <button
            onClick={() => setActiveTab('groceries')}
            className={`transition-colors whitespace-nowrap py-1 relative flex items-center gap-1.5 ${
              activeTab === 'groceries' 
                ? 'text-neutral-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                : 'hover:text-neutral-900'
            }`}
          >
            Smart Groceries
            {groceryCount > 0 && (
              <span className="text-[11px] font-mono tabular-nums bg-neutral-100 text-neutral-700 rounded px-1.5 py-0.2">
                {groceryCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('fridge')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'fridge' 
                ? 'text-neutral-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                : 'hover:text-neutral-900'
            }`}
          >
            Fridge Rescue
          </button>

          <button
            onClick={() => setActiveTab('prep')}
            className={`transition-colors whitespace-nowrap py-1 relative ${
              activeTab === 'prep' 
                ? 'text-neutral-900 font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-600' 
                : 'hover:text-neutral-900'
            }`}
          >
            Cook Secrets
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenQuickGenerate}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Auto-Plan Week</span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden flex items-center justify-around border-t border-neutral-200 px-2 py-2 bg-white text-xs font-medium text-neutral-600">
        <button
          onClick={() => setActiveTab('planner')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${activeTab === 'planner' ? 'text-amber-600 font-semibold' : ''}`}
        >
          <Calendar className="w-4 h-4" />
          <span>Planner</span>
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${activeTab === 'recipes' ? 'text-amber-600 font-semibold' : ''}`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Recipes</span>
        </button>
        <button
          onClick={() => setActiveTab('groceries')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${activeTab === 'groceries' ? 'text-amber-600 font-semibold' : ''}`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Groceries</span>
        </button>
        <button
          onClick={() => setActiveTab('fridge')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${activeTab === 'fridge' ? 'text-amber-600 font-semibold' : ''}`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Rescue</span>
        </button>
        <button
          onClick={() => setActiveTab('prep')}
          className={`flex flex-col items-center gap-1 py-1 px-2 ${activeTab === 'prep' ? 'text-amber-600 font-semibold' : ''}`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Secrets</span>
        </button>
      </div>
    </header>
  );
};
