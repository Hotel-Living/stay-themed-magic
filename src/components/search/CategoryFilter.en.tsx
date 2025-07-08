
import { FilterItem } from "./FilterItem";
import { Star } from "lucide-react";

interface CategoryFilterENProps {
  activeCategory: string | null;
  onChange: (value: string | null) => void;
}

export function CategoryFilterEN({ activeCategory, onChange }: CategoryFilterENProps) {
  const categories = [
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" }
  ];

  const handleCategoryClick = (categoryValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeCategory === categoryValue ? null : categoryValue;
    console.log("CategoryFilter - Category toggled:", categoryValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="CATEGORY">
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
