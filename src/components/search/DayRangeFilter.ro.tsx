
import { FilterItem } from "./FilterItem";

interface DayRangeFilterROProps {
  activeDayRange: number | null;
  onChange: (value: number | null) => void;
}

export function DayRangeFilterRO({ activeDayRange, onChange }: DayRangeFilterROProps) {
  const dayRanges = [
    { value: 7, label: "1 Săptămână" },
    { value: 14, label: "2 Săptămâni" },
    { value: 21, label: "3 Săptămâni" },
    { value: 30, label: "1 Lună" },
    { value: 60, label: "2 Luni" },
    { value: 90, label: "3 Luni" },
    { value: 180, label: "6 Luni" },
    { value: 365, label: "1 An" }
  ];

  const handleDayRangeClick = (rangeValue: number) => {
    const newValue = activeDayRange === rangeValue ? null : rangeValue;
    console.log("DayRangeFilter - Range toggled:", rangeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="NUMĂRUL DE ZILE">
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
