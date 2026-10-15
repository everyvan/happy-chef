import React from 'react';
import { BookOpen, Sparkles, Clock, Flame, Store, CheckCircle, ShieldCheck } from 'lucide-react';

export const MealPrepSecrets: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-neutral-200 rounded-xl p-6 sm:p-8 space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider">
          <BookOpen className="w-4 h-4" />
          <span>Local Kitchen Wisdom & Lifehacks</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          Singapore Home Cooking & Wet Market Secrets
        </h2>
        <p className="text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Culinary methods tested by Singaporean home cooks to turn an HDB kitchen into a fast, effortless dinner haven while slashing weekly grocery bills.
        </p>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Secret 1: Sunday Rempah Ice Cubes */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
            01
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            The "Sunday Rempah" Ice-Cube Trick
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Pounding aromatics every weeknight takes 20 minutes of cleanup. Instead, blend 1kg of peeled shallots, garlic cloves, lemongrass, galangal, and rehydrated dried chilies with vegetable oil on Sunday. Portion into silicone ice-cube trays and freeze.
          </p>
          <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-700 space-y-1">
            <strong className="text-neutral-900 block font-semibold">Weeknight Outcome:</strong>
            Drop 2 frozen rempah cubes straight into a hot wok for instant chicken curry, sambal kang kong, or fried rice in under 12 minutes flat.
          </div>
        </div>

        {/* Secret 2: Wet Market vs Sheng Siong Route */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
            02
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            Smart Sourcing: Wet Market vs Sheng Siong
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Never buy whole seafood pre-packaged at supermarkets if you have a neighborhood wet market nearby. Wet market fishmongers at Tekka, Chinatown, or Bedok 85 will scale, butterfly, and de-bone sea bass and pomfret for free.
          </p>
          <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-700 space-y-1">
            <strong className="text-neutral-900 block font-semibold">Price Arbitrage:</strong>
            Buy fresh greens (choy sum, kang kong) and tofu tubes at Sheng Siong for ~25% lower prices; get fresh unpasteurized coconut milk (santan) from the wet market spice grinder.
          </div>
        </div>

        {/* Secret 3: The 9-Minute Steaming Rule */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
            03
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            The 9-Minute Barramundi Steaming Rule
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            The number one mistake home cooks make with fresh sea bass or cod is oversteaming. Set a timer for strictly 9 minutes over roaring rolling boil. Drain the cloudy water at minute 9 (this eliminates the muddy river fishiness), then layer fresh aromatics and splash with smoking-hot oil.
          </p>
          <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-700 space-y-1">
            <strong className="text-neutral-900 block font-semibold">Restaurant Wok Aroma:</strong>
            The hot oil sizzles the raw ginger threads and spring onions instantly, releasing authentic Cantonese banquet aroma.
          </div>
        </div>

        {/* Secret 4: Crystal Clear ABC & Rib Soups */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 sm:p-6 space-y-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
            04
          </div>
          <h3 className="text-base font-bold text-neutral-900">
            Blanch First for Sweet, Clear Soups
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            To achieve that comforting clear broth from traditional Chinese soup stalls, always boil your soup bones or chicken carcasses for 3 minutes first in a separate pot. Discard the foamy scum and rinse the bones under tap water before simmering with corn and carrots.
          </p>
          <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-700 space-y-1">
            <strong className="text-neutral-900 block font-semibold">Slow Cooker Hack:</strong>
            Toss the blanched bones and sweet vegetables into an automated slow cooker or thermal pot in the morning; arrive home to hot, nourishing soup.
          </div>
        </div>

      </div>

      {/* HPB Healthier Dining Note */}
      <div className="bg-neutral-900 text-white rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Health Promotion Board (HPB) Alignment</span>
          </div>
          <h3 className="text-xl font-bold">
            Cooking at Home vs Hawker Center Nutrition
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Hawker meals average 800–1,200mg of sodium per bowl. By making your own ginger-soy reductions, clear herbal broths, and fresh sambals, you cut weekly sodium intake by over 45% while preserving deep, authentic umami flavor.
          </p>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 p-4 rounded-xl text-center shrink-0 w-full md:w-auto">
          <div className="text-2xl font-mono font-bold text-amber-400">Nutri-Grade A</div>
          <div className="text-xs text-neutral-300 mt-1">Over 70% of recipes in MakanPlan</div>
        </div>
      </div>

    </div>
  );
};
