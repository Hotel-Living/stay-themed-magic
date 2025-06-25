
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterItem } from "./FilterItem";

interface LengthOfStayFilterProps {
  activeLength: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function LengthOfStayFilter({ activeLength, onChange }: LengthOfStayFilterProps) {
  const { t } = useTranslation();

  const stayLengthOptions = Object.entries(t('filters.stayLengths'))
    .filter(([key]) => key !== 'title')
    .map(([key, label]) => ({ value: key, label }));

  return (
    <FilterItem title={t('filters.stayLengths.title').toUpperCase()}>
      {stayLengthOptions.map(option => (
        <label key={option.value} className="flex items-start">
          <input 
            type="checkbox" 
            checked={activeLength.includes(option.value)}
            onChange={(e) => onChange(option.value, e.target.checked)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
