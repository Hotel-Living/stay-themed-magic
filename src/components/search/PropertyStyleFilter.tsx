
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { SquareFilter } from "./SquareFilter";
import { useFiltersByCategoryWithLanguage } from "@/hooks/useFiltersByCategoryWithLanguage";

interface PropertyStyleFilterProps {
  activePropertyStyle: string | null;
  onChange: (value: string | null) => void;
}

export function PropertyStyleFilter({ activePropertyStyle, onChange }: PropertyStyleFilterProps) {
  const { t } = useTranslation('filters');
  const { data: propertyStyleOptions = [], isLoading } = useFiltersByCategoryWithLanguage('property_styles');

  console.log(`🏗️ PropertyStyleFilter: Loading=${isLoading}, Options=`, propertyStyleOptions);

  // Transform the data to the format expected by SquareFilter (single select)
  const formattedOptions = propertyStyleOptions.map(option => ({
    value: option.value,
    label: option.value
  }));

  console.log(`🏗️ PropertyStyleFilter: Formatted options=`, formattedOptions);

  // Convert single selection to array format for SquareFilter compatibility
  const selectedStyles = activePropertyStyle ? [activePropertyStyle] : [];

  const handleStyleChange = (value: string, isChecked: boolean) => {
    onChange(isChecked ? value : null);
  };

  return (
    <SquareFilter
      title={t("filters.propertyStyle")}
      options={formattedOptions}
      selectedOptions={selectedStyles}
      onChange={handleStyleChange}
      loading={isLoading}
      singleSelect={true}
    />
  );
}
