
import React from 'react';
import { FilterItem } from './FilterItem';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Star } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface RatingFilterProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const { t } = useLanguage();
  
  const handleValueChange = (val: string) => {
    onChange(val ? parseInt(val, 10) : null);
  };
  
  return (
    <FilterItem title={t("search.filters.guestRating")}>
      <div className="px-1 py-3">
        <ToggleGroup
          type="single"
          value={value?.toString() || ""}
          onValueChange={handleValueChange}
          className="flex justify-between w-full"
        >
          {[3, 4, 5].map((rating) => (
            <ToggleGroupItem
              key={rating}
              value={rating.toString()}
              aria-label={`${rating} ${t("search.filters.starsAndAbove")}`}
              className="flex items-center gap-1 px-2 py-1 text-sm font-medium"
            >
              {rating}
              <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
              <span className="text-xs">+</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </FilterItem>
  );
}
