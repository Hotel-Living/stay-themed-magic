
import { FilterItem } from "./FilterItem";
import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface CategoryFilterProps {
  activeCategory: string | null;
  onChange: (value: string) => void;
}

export function CategoryFilter({ activeCategory, onChange }: CategoryFilterProps) {
  const { t } = useTranslation();

  const categories = [
    { value: "1", label: t('filters.categories.1star') },
    { value: "2", label: t('filters.categories.2stars') },
    { value: "3", label: t('filters.categories.3stars') },
    { value: "4", label: t('filters.categories.4stars') },
    { value: "5", label: t('filters.categories.5stars') }
  ];

  return (
    <FilterItem title={t('filters.category').toUpperCase()}>
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
