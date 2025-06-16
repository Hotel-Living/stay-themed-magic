
import { FilterItem } from "./FilterItem";
import { priceRanges } from "@/components/filters/FilterUtils";
import { useTranslation } from "@/hooks/useTranslation";

interface PriceFilterProps {
  activePrice: number | null;
  onChange: (value: number) => void;
}

export function PriceRangeFilter({ activePrice, onChange }: PriceFilterProps) {
  const { t } = useTranslation();
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
    e.stopPropagation();
    onChange(value);
  };

  return (
    <FilterItem title={t('filters.pricePerMonth')}>
      {priceRanges.map(option => (
        <label key={option.value} className="flex items-start mb-2">
          <input 
            type="radio" 
            name="priceRange"
            checked={activePrice === option.value}
            onChange={(e) => handlePriceChange(e, option.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            onClick={(e) => e.stopPropagation()}
          />
          <span className="text-sm font-bold" onClick={(e) => e.stopPropagation()}>{t(option.translationKey)}</span>
        </label>
      ))}
    </FilterItem>
  );
}
