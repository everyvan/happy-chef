import React from 'react';
import { X, Check, Sparkles, ShieldCheck, HeartHandshake, Zap } from 'lucide-react';

interface FreemiumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreemiumModal: React.FC<FreemiumModalProps> = ({ isOpen, onClose }) => {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('annual');
  const [upgraded, setUpgraded] = React.useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-700 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-2 max-w-lg mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Freemium Model for Singapore Kitchens</span>
          </div>
          <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
            Cook More, Spend Less at NTUC & Wet Markets
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600">
            Forever free for everyday meal planning. Upgrade anytime to unlock 1-click supermarket sync and domestic helper multilingual recipes.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center gap-1 p-1 bg-neutral-100 rounded-lg mt-3">
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                billingCycle === 'annual' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Annual (S$3.25/mo · Save 33%)
            </button>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                billingCycle === 'monthly' ? 'bg-white text-neutral-900 shadow-2xs font-semibold' : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly (S$4.90/mo)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Free Tier */}
          <div className="p-5 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">MakanPlan Free</h4>
                <p className="text-xs text-neutral-500">For individual home cooks & couples</p>
              </div>
              <div className="text-2xl font-mono font-bold text-neutral-900">
                S$0 <span className="text-xs font-sans font-normal text-neutral-500">/ forever</span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-200/80">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Full 7-day visual meal planner</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Curated Singapore recipe library</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Smart consolidated grocery list</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>1-Click WhatsApp list export</span>
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2 text-xs font-semibold bg-neutral-200 hover:bg-neutral-300 text-neutral-800 rounded-lg transition-colors"
            >
              Current Active Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="p-5 rounded-xl border-2 border-amber-600 bg-white space-y-4 flex flex-col justify-between shadow-sm relative">
            <div className="absolute -top-3 right-4 bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-bold text-neutral-900">MakanPlan Pro</h4>
                <p className="text-xs text-neutral-500">For busy Singapore families & households</p>
              </div>
              <div className="text-2xl font-mono font-bold text-neutral-900">
                {billingCycle === 'annual' ? 'S$39' : 'S$4.90'}
                <span className="text-xs font-sans font-normal text-neutral-500">
                  {billingCycle === 'annual' ? ' / year' : ' / month'}
                </span>
              </div>
              <ul className="space-y-2 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-600 shrink-0" />
                  <span><strong>1-Click FairPrice Online</strong> cart auto-sync</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Helper Recipe Cards</strong> (Tagalog / Bahasa / Burmese)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Live multi-family household sharing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>HPB low-sodium & diabetic blood-sugar flags</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => setUpgraded(true)}
              className="w-full py-2 text-xs font-semibold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {upgraded ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Trial Activated! (14 Days Free)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start 14-Day Free Pro Trial</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Trust markers */}
        <div className="flex items-center justify-center gap-6 text-[11px] text-neutral-500 pt-2">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-400" />
            No credit card needed for trial
          </span>
          <span className="flex items-center gap-1">
            <HeartHandshake className="w-3.5 h-3.5 text-neutral-400" />
            Cancel anytime in 1 tap
          </span>
        </div>

      </div>
    </div>
  );
};
