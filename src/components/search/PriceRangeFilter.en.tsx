
import { FilterItem } from "./FilterItem";

interface PriceRangeFilterENProps {
  activePrice: number | null;
  onChange: (value: number) => void;
}

export function PriceRangeFilterEN({ activePrice, onChange }: PriceRangeFilterENProps) {
  const priceRanges = [
    { value: 1000, label: "Up to $1,000" },
    { value: 1500, label: "$1,000 to $1,500" },
    { value: 2000, label: "$1,500 to $2,000" },
    { value: 3000, label: "More than $2,000" }
  ];
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, value: number) => {
    e.stopPropagation();
    onChange(value);
  };

  return (
    <FilterItem title="PRICE PER MONTH">
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
          <span className="text-sm font-bold" onClick={(e) => e.stopPropagation()}>{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
