
import { FilterItem } from "./FilterItem";

interface DayRangeFilterESProps {
  activeDayRange: number | null;
  onChange: (value: number | null) => void;
}

export function DayRangeFilterES({ activeDayRange, onChange }: DayRangeFilterESProps) {
  const dayRanges = [
    { value: 32, label: "32 días" },
    { value: 24, label: "24 días" },
    { value: 16, label: "16 días" },
    { value: 8, label: "8 días" }
  ];

  const handleDayRangeClick = (rangeValue: number) => {
    const newValue = activeDayRange === rangeValue ? null : rangeValue;
    console.log("DayRangeFilter - Range toggled:", rangeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="NÚMERO DE DÍAS">
      {dayRanges.map(range => (
        <label key={range.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeDayRange === range.value}
            onChange={() => handleDayRangeClick(range.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{range.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
