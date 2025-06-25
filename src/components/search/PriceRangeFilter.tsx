
import React from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { FilterItem } from "./FilterItem";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  onChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({ priceRange, onChange }: PriceRangeFilterProps) {
  const { t } = useTranslation();

  const handleSliderChange = (values: number[]) => {
    onChange([values[0], values[1]]);
  };

  return (
    <FilterItem title={t('filters.pricePerMonth').toUpperCase()}>
      <div className="px-2 py-4">
        <div className="flex justify-between text-sm mb-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
        <Slider
          value={priceRange}
          onValueChange={handleSliderChange}
          max={5000}
          min={0}
          step={50}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$0</span>
          <span>$5000+</span>
        </div>
      </div>
    </FilterItem>
  );
}
