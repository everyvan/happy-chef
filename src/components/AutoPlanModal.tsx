import React from 'react';
import { DayPlan, SupermarketStore } from '../types/mealPlan';
import { PLAN_PRESETS } from '../data/defaultPlan';
import { X, Sparkles, Check, Users, Store, Flame } from 'lucide-react';

interface AutoPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGeneratePlan: (presetId: string, pax: number, store: SupermarketStore) => void;
  currentPax: number;
  currentStore: SupermarketStore;
}

export const AutoPlanModal: React.FC<AutoPlanModalProps> = ({
  isOpen,
  onClose,
  onGeneratePlan,
  currentPax,
  currentStore
}) => {
  const [selectedPreset, setSelectedPreset] = React.useState<string>('balanced-family');
  const [pax, setPax] = React.useState<number>(currentPax);
  const [store, setStore] = React.useState<SupermarketStore>(currentStore);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onGeneratePlan(selectedPreset, pax, store);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-neutral-200 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                Auto-Plan Your Singapore Week
              </h3>
              <p className="text-xs text-neutral-500">
                Generate 14 balanced lunches and dinners aligned with your household
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 block">
            Choose Culinary Blueprint:
          </label>
          <div className="space-y-2">
            {PLAN_PRESETS.map(preset => {
              const active = selectedPreset === preset.id;
              return (
                <div
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                    active
                      ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">{preset.name}</span>
                      <span className="text-[11px] text-amber-700 font-medium">· {preset.subtitle}</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed">
                      {preset.description}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    active ? 'border-amber-600 bg-amber-600 text-white' : 'border-neutral-300'
                  }`}>
                    {active && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Household Size */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-neutral-500" />
            Household Servings:
          </label>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 4, 6].map(num => (
              <button
                key={num}
                type="button"
                onClick={() => setPax(num)}
                className={`py-2 text-xs font-semibold rounded-lg border transition-all tabular-nums ${
                  pax === num
                    ? 'border-amber-600 bg-amber-50 text-amber-900 ring-1 ring-amber-600'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                {num} {num === 1 ? 'Solo' : num === 2 ? 'Couple' : 'Pax'}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Grocery Destination */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-neutral-500" />
            Preferred Grocery Benchmark:
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setStore('fairprice')}
              className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                store === 'fairprice'
                  ? 'border-red-600 bg-red-50 text-red-900 ring-1 ring-red-600'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              FairPrice
            </button>
            <button
              type="button"
              onClick={() => setStore('shengsiong')}
              className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                store === 'shengsiong'
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Sheng Siong
            </button>
            <button
              type="button"
              onClick={() => setStore('wetmarket')}
              className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                store === 'wetmarket'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600'
                  : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              Wet Market
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 active:bg-amber-800 rounded-lg shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate & Apply 7-Day Plan</span>
          </button>
        </div>

      </div>
    </div>
  );
};
