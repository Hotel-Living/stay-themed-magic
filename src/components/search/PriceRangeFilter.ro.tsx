
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";
import { generateDynamicPriceRanges } from "@/utils/dynamicPriceRanges";

interface PriceRangeFilterROProps {
  activePrice: number | null;
  onChange: (value: number | null) => void;
}

export function PriceRangeFilterRO({ activePrice, onChange }: PriceRangeFilterROProps) {
  const { priceRange, loading, error } = useDynamicFilterData();
  
  const handlePriceClick = (priceValue: number) => {
    const newValue = activePrice === priceValue ? null : priceValue;
    console.log("PriceRangeFilter - Price toggled:", priceValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="PREȚ PE LUNĂ">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Se încarcă intervalele de preț...</div>
      </FilterItem>
    );
  }

  if (error || !priceRange) {
    return (
      <FilterItem title="PREȚ PE LUNĂ">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Nu sunt date de preț disponibile</div>
      </FilterItem>
    );
  }

  const priceRanges = generateDynamicPriceRanges(
    priceRange.min, 
    priceRange.max, 
    priceRange.avg
  );

  const formatPriceRange = (range: any) => {
    if (range.translationKey === 'filters.priceRange.unlimited') {
      return "Orice preț";
    } else if (range.translationKey === 'filters.priceRange.underAverage') {
      return `Până la $${range.max}`;
    } else if (range.max === 999999) {
      return `Mai mult de $${range.min}`;
    } else {
      return `Până la $${range.max}`;
    }
  };

  return (
    <FilterItem title="PREȚ PE LUNĂ">
      {priceRanges.map(range => (
        <label key={range.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePrice === range.value}
            onChange={() => handlePriceClick(range.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{formatPriceRange(range)}</span>
        </label>
      ))}
    </FilterItem>
  );
}
