
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { MealPlanFilterEN } from "./MealPlanFilter.en";
import { MealPlanFilterES } from "./MealPlanFilter.es";
import { MealPlanFilterPT } from "./MealPlanFilter.pt";
import { MealPlanFilterRO } from "./MealPlanFilter.ro";

interface MealPlanFilterProps {
  activeMealPlans: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function MealPlanFilter({ activeMealPlans, onChange }: MealPlanFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <MealPlanFilterEN activeMealPlans={activeMealPlans} onChange={onChange} />;
  if (language === 'es') return <MealPlanFilterES activeMealPlans={activeMealPlans} onChange={onChange} />;
  if (language === 'pt') return <MealPlanFilterPT activeMealPlans={activeMealPlans} onChange={onChange} />;
  if (language === 'ro') return <MealPlanFilterRO activeMealPlans={activeMealPlans} onChange={onChange} />;
  
  // Default fallback to English
  return <MealPlanFilterEN activeMealPlans={activeMealPlans} onChange={onChange} />;
}
