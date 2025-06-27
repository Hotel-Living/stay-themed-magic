
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";
import { generateDynamicPriceRanges } from "@/utils/dynamicPriceRanges";

interface PriceRangeFilterENProps {
  activePrice: number | null;
  onChange: (value: number | null) => void;
}

export function PriceRangeFilterEN({ activePrice, onChange }: PriceRangeFilterENProps) {
  const { priceRange, loading, error } = useDynamicFilterData();
  
  const handlePriceClick = (priceValue: number) => {
    const newValue = activePrice === priceValue ? null : priceValue;
    console.log("PriceRangeFilter - Price toggled:", priceValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="PRICE PER MONTH">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Loading price ranges...</div>
      </FilterItem>
    );
  }

  if (error || !priceRange) {
    return (
      <FilterItem title="PRICE PER MONTH">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">No price data available</div>
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
      return "Any price";
    } else if (range.translationKey === 'filters.priceRange.underAverage') {
      return `Up to $${range.max}`;
    } else if (range.max === 999999) {
      return `More than $${range.min}`;
    } else {
      return `Up to $${range.max}`;
    }
  };

  return (
    <FilterItem title="PRICE PER MONTH">
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
