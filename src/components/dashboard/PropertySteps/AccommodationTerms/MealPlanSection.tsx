
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface MealPlanSectionProps {
  selectedMealPlans: string[];
  onMealPlanToggle: (plan: string) => void;
}

export default function MealPlanSection({ 
  selectedMealPlans, 
  onMealPlanToggle 
}: MealPlanSectionProps) {
  const { t } = useTranslation();
  const mealPlans = [
    'breakfastIncluded',
    'halfBoard', 
    'fullBoard',
    'allInclusive',
    'laundry'
  ];

  return (
    <div className="glass-card rounded-xl p-6 space-y-4 bg-[#690695]/40">
      <h3 className="text-lg font-semibold text-white uppercase">
        3.4- {t('propertySteps.mealPlans')}
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mealPlans.map((plan) => (
          <button
            key={plan}
            onClick={() => onMealPlanToggle(plan)}
            className={`px-4 py-3 rounded-lg border-2 transition-all text-sm ${
              selectedMealPlans.includes(plan)
                ? 'bg-fuchsia-600 border-fuchsia-500 text-white'
                : 'bg-transparent border-fuchsia-500/50 text-white hover:border-fuchsia-500'
            }`}
          >
            {t(`mealPlans.${plan}`)}
          </button>
        ))}
      </div>
      
      <p className="text-white/60 text-sm mt-4">
        {t('mealPlans.externalLaundryService')}
      </p>
    </div>
  );
}
