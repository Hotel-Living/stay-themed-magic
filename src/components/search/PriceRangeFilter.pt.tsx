
import { FilterItem } from "./FilterItem";

interface PriceRangeFilterPTProps {
  activePrice: number | null;
  onChange: (value: number | null) => void;
}

export function PriceRangeFilterPT({ activePrice, onChange }: PriceRangeFilterPTProps) {
  const priceRanges = [
    { value: 1000, label: "Até $1.000", min: 0, max: 1000 },
    { value: 1500, label: "$1.000 a $1.500", min: 1000, max: 1500 },
    { value: 2000, label: "$1.500 a $2.000", min: 1500, max: 2000 },
    { value: 999999, label: "Mais de $2.000", min: 2000, max: 999999 }
  ];

  const handlePriceClick = (priceValue: number) => {
    const newValue = activePrice === priceValue ? null : priceValue;
    console.log("PriceRangeFilter - Price toggled:", priceValue, "->", newValue);
    onChange(newValue);
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
          <span className="text-sm font-bold text-white">{range.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
