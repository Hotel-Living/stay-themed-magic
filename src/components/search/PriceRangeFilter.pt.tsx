
import { FilterItem } from "./FilterItem";

interface PriceRangeFilterPTProps {
  activePrice: number | null;
  onChange: (value: number | null) => void;
}

export function PriceRangeFilterPT({ activePrice, onChange }: PriceRangeFilterPTProps) {
  const priceRanges = [
    { value: 1000, label: "Até $1,000", maxPrice: 1000 },
    { value: 1500, label: "$1,000 a $1,500", minPrice: 1000, maxPrice: 1500 },
    { value: 2000, label: "$1,500 a $2,000", minPrice: 1500, maxPrice: 2000 },
    { value: 3000, label: "Mais de $2,000", minPrice: 2000 }
  ];
  
  const handlePriceClick = (priceValue: number) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activePrice === priceValue ? null : priceValue;
    console.log("PriceRangeFilter - Price toggled:", priceValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="PREÇO POR MÊS">
      {priceRanges.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePrice === option.value}
            onChange={() => handlePriceClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
