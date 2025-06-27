
import React from "react";
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface CategoryFilterENProps {
  activeCategory: string | null;
  onChange: (value: string | null) => void;
}

export function CategoryFilterEN({ activeCategory, onChange }: CategoryFilterENProps) {
  const { propertyTypes, loading } = useDynamicFilterData();

  const handleCategoryClick = (category: string) => {
    const isCurrentlySelected = activeCategory === category;
    onChange(isCurrentlySelected ? null : category);
  };

  if (loading) {
    return (
      <FilterItem title="PROPERTY TYPE">
        <div className="text-white text-sm">Loading property types...</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="PROPERTY TYPE">
      <div className="max-h-48 overflow-y-auto">
        {propertyTypes.map(type => (
          <label key={type.type} className="flex items-center mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="radio" 
              name="category"
              checked={activeCategory === type.type}
              onChange={() => handleCategoryClick(type.type)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
            />
            <span className="text-sm font-bold text-white">
              {type.type} ({type.count})
            </span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
