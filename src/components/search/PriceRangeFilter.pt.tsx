
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";
import { generateDynamicPriceRanges } from "@/utils/dynamicPriceRanges";

interface PriceRangeFilterPTProps {
  activePrice: number | null;
  onChange: (value: number | null) => void;
}

export function PriceRangeFilterPT({ activePrice, onChange }: PriceRangeFilterPTProps) {
  const { priceRange, loading, error } = useDynamicFilterData();
  
  const handlePriceClick = (priceValue: number) => {
    const newValue = activePrice === priceValue ? null : priceValue;
    console.log("PriceRangeFilter - Price toggled:", priceValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="PREÇO POR MÊS">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Carregando faixas de preço...</div>
      </FilterItem>
    );
  }

  if (error || !priceRange) {
    return (
      <FilterItem title="PREÇO POR MÊS">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Nenhum dado de preço disponível</div>
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
      return "Qualquer preço";
    } else if (range.translationKey === 'filters.priceRange.underAverage') {
      return `Até $${range.max}`;
    } else if (range.max === 999999) {
      return `Mais de $${range.min}`;
    } else {
      return `Até $${range.max}`;
    }
  };

  return (
    <FilterItem title="PREÇO POR MÊS">
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
