
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useActivitiesDataWithLanguage } from "@/hooks/useActivitiesDataWithLanguage";

interface ActivityFilterProps {
  activeActivities: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function ActivityFilter({ 
  activeActivities, 
  onChange 
}: ActivityFilterProps) {
  const { t } = useTranslation();
  const { data: activityOptions = [], isLoading } = useActivitiesDataWithLanguage();

  console.log(`🎯 ActivityFilter: Loading=${isLoading}, Options=`, activityOptions);

  // Transform the data to the format expected by SquareFilter
  const formattedOptions = activityOptions.map(option => ({
    value: option.name, // Use name as value for consistency
    label: option.name
  }));

  console.log(`🎯 ActivityFilter: Formatted options=`, formattedOptions);

  return (
    <SquareFilter
      title={t("filters.activities")}
      options={formattedOptions}
      selectedOptions={activeActivities}
      onChange={onChange}
      loading={isLoading}
    />
  );
}
