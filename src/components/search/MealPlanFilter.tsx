
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useFiltersByCategory } from "@/hooks/useFiltersByCategory";

interface MealPlanFilterProps {
  activeMealPlans: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function MealPlanFilter({ activeMealPlans, onChange }: MealPlanFilterProps) {
  const { t } = useTranslation();
  const { data: mealPlanOptions = [], isLoading } = useFiltersByCategory('meal_plans');

  console.log(`🍽️ MealPlanFilter: Loading=${isLoading}, Options=`, mealPlanOptions);

  // Transform the data to the format expected by SquareFilter
  const formattedOptions = mealPlanOptions.map(option => ({
    value: option.value,
    label: option.value // Could be enhanced with translations later
  }));

  console.log(`🍽️ MealPlanFilter: Formatted options=`, formattedOptions);

  return (
    <SquareFilter
      title={t("filters.mealPlan")}
      options={formattedOptions}
      selectedOptions={activeMealPlans}
      onChange={onChange}
      loading={isLoading}
    />
  );
}
