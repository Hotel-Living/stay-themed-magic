
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { FilterItem } from './FilterItem';
import { Star } from 'lucide-react';

interface RatingFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const handleChange = (newValue: number[]) => {
    onChange(newValue[0] || null);
  };
  
  return (
    <FilterItem title="Guest Rating">
      <div className="px-1 py-4">
        <div className="space-y-4">
          <Slider
            defaultValue={[value || 3]}
            max={5}
            step={0.5}
            onValueChange={handleChange}
          />
          <div className="flex justify-between text-xs text-foreground/70">
            <div className="flex items-center">
              <span>{value || 0}</span>
              <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="flex items-center">
              <span>5</span>
              <Star className="h-3 w-3 ml-1 text-yellow-400 fill-yellow-400" />
            </div>
          </div>
        </div>
      </div>
    </FilterItem>
  );
}
