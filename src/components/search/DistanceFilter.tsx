
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { FilterItem } from './FilterItem';
import { useLanguage } from '@/context/LanguageContext';

interface DistanceFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function DistanceFilter({ value, onChange }: DistanceFilterProps) {
  const { t } = useLanguage();
  
  const handleChange = (newValue: number[]) => {
    onChange(newValue[0] || null);
  };
  
  return (
    <FilterItem title={t("search.filters.distanceFrom")}>
      <div className="px-1 py-4">
        <div className="space-y-4">
          <Slider
            defaultValue={[value || 2]}
            max={10}
            step={0.5}
            onValueChange={handleChange}
          />
          <div className="flex justify-between text-xs text-foreground/70">
            <span>0 km</span>
            <span>{value || 2} km</span>
            <span>10 km</span>
          </div>
        </div>
      </div>
    </FilterItem>
  );
}
