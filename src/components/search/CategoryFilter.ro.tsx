
import { FilterItem } from "./FilterItem";
import { Star } from "lucide-react";

interface CategoryFilterROProps {
  activeCategory: string | null;
  onChange: (value: string | null) => void;
}

export function CategoryFilterRO({ activeCategory, onChange }: CategoryFilterROProps) {
  const categories = [
    { value: "1", label: "1 Stea" },
    { value: "2", label: "2 Stele" },
    { value: "3", label: "3 Stele" },
    { value: "4", label: "4 Stele" },
    { value: "5", label: "5 Stele" }
  ];

  const handleCategoryClick = (categoryValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeCategory === categoryValue ? null : categoryValue;
    console.log("CategoryFilter - Category toggled:", categoryValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="CATEGORIE">
      {categories.map(category => (
        <label key={category.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeCategory === category.value}
            onChange={() => handleCategoryClick(category.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm flex items-center text-white">
            {category.label}
            <span className="ml-1 flex">
              {[...Array(parseInt(category.value))].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              ))}
            </span>
          </span>
        </label>
      ))}
    </FilterItem>
  );
}
