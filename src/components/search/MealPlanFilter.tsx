
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { MealPlanFilterEN } from "./MealPlanFilter.en";
import { MealPlanFilterES } from "./MealPlanFilter.es";
import { MealPlanFilterPT } from "./MealPlanFilter.pt";
import { MealPlanFilterRO } from "./MealPlanFilter.ro";

interface MealPlanFilterProps {
  activeMealPlan: string | null;
  onChange: (value: string | null) => void;
}

export function MealPlanFilter({ activeMealPlan, onChange }: MealPlanFilterProps) {
  const { language } = useTranslation();
  
  if (language === 'en') return <MealPlanFilterEN activeMealPlan={activeMealPlan} onChange={onChange} />;
  if (language === 'es') return <MealPlanFilterES activeMealPlan={activeMealPlan} onChange={onChange} />;
  if (language === 'pt') return <MealPlanFilterPT activeMealPlan={activeMealPlan} onChange={onChange} />;
  if (language === 'ro') return <MealPlanFilterRO activeMealPlan={activeMealPlan} onChange={onChange} />;
  
  // Default fallback to English
  return <MealPlanFilterEN activeMealPlan={activeMealPlan} onChange={onChange} />;
}
