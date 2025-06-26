
import { FilterItem } from "./FilterItem";

interface PriceFilterProps {
  selectedPriceRange: string | null;
  onChange: (priceRange: string | null) => void;
}

export function PriceFilter({ selectedPriceRange, onChange }: PriceFilterProps) {
  const priceRanges = [
    { value: "0-100", label: "€0 - €100" },
    { value: "100-200", label: "€100 - €200" },
    { value: "200-300", label: "€200 - €300" },
    { value: "300-500", label: "€300 - €500" },
    { value: "500+", label: "€500+" }
  ];

  const handlePriceClick = (priceValue: string) => {
    const newValue = selectedPriceRange === priceValue ? null : priceValue;
    onChange(newValue);
  };

  return (
    <FilterItem title="PRICE RANGE">
      {priceRanges.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedPriceRange === option.value}
            onChange={() => handlePriceClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
