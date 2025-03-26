
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { FilterItem } from './FilterItem';

interface DistanceFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function DistanceFilter({ value, onChange }: DistanceFilterProps) {
  const handleChange = (newValue: number[]) => {
    onChange(newValue[0] || null);
  };
  
  return (
    <FilterItem title="Distance from City Center">
      <div className="px-1 py-4">
        <div className="space-y-4">
          <Slider
            defaultValue={[value || 5]}
            max={30}
            step={1}
            onValueChange={handleChange}
          />
          <div className="flex justify-between text-xs text-foreground/70">
            <span>{value || 0} km</span>
            <span>Max 30 km</span>
          </div>
        </div>
      </div>
    </FilterItem>
  );
}
