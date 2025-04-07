
import { FilterItem } from "./FilterItem";
import { Star } from "lucide-react";

interface CategoryFilterProps {
  activeCategory: string | null;
  onChange: (value: string) => void;
}

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  const categories = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" }
  ];

  return (
    <FilterItem title="CATEGORY">
      {categories.map(category => (
        <label key={category.value} className="flex items-start">
          <input 
            type="radio" 
            name="category"
            checked={activeCategory === category.value}
            onChange={() => onChange(category.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm flex items-center">
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
