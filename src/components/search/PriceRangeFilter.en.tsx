
import React from "react";
import { FilterItem } from "./FilterItem";
import { Slider } from "@/components/ui/slider";

interface PriceRangeFilterENProps {
  activePriceRange: [number, number];
  onChange: (value: [number, number]) => void;
}

export function PriceRangeFilterEN({ activePriceRange, onChange }: PriceRangeFilterENProps) {
  const handleSliderChange = (values: number[]) => {
    onChange([values[0], values[1]]);
  };

  return (
    <FilterItem title="PRICE PER MONTH">
      <div className="px-3 py-4 space-y-4">
        <div className="flex justify-between text-sm font-bold text-white">
          <span>€{activePriceRange[0]}</span>
          <span>€{activePriceRange[1]}</span>
        </div>
        
        <Slider
          value={activePriceRange}
          onValueChange={handleSliderChange}
          max={5000}
          min={0}
          step={50}
          className="w-full"
        />
        
        <div className="flex justify-between text-xs text-gray-300">
          <span>€0</span>
          <span>€5,000+</span>
        </div>
      </div>
    </FilterItem>
  );
}
