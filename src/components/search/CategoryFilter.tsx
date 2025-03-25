
import { FilterItem } from "./FilterItem";

interface CategoryFilterProps {
  activeCategory: string | null;
  onChange: (value: string) => void;
}

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  const categories = ["Luxury", "Boutique", "Business", "Family", "Budget", "Resort"];

  return (
    <FilterItem title="CATEGORY">
      {categories.map(category => (
        <label key={category} className="flex items-start">
          <input 
            type="radio" 
            name="category"
            checked={activeCategory === category}
            onChange={() => onChange(category)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{category}</span>
        </label>
      ))}
    </FilterItem>
  );
}
