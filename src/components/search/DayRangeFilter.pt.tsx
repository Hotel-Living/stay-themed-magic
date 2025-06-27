
import { FilterItem } from "./FilterItem";

interface DayRangeFilterPTProps {
  activeDayRange: number | null;
  onChange: (value: number | null) => void;
}

export function DayRangeFilterPT({ activeDayRange, onChange }: DayRangeFilterPTProps) {
  const dayRanges = [
    { value: 7, label: "1 Semana" },
    { value: 14, label: "2 Semanas" },
    { value: 21, label: "3 Semanas" },
    { value: 30, label: "1 Mês" },
    { value: 60, label: "2 Meses" },
    { value: 90, label: "3 Meses" },
    { value: 180, label: "6 Meses" },
    { value: 365, label: "1 Ano" }
  ];

  const handleDayRangeClick = (rangeValue: number) => {
    const newValue = activeDayRange === rangeValue ? null : rangeValue;
    console.log("DayRangeFilter - Range toggled:", rangeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="NÚMERO DE DIAS">
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
