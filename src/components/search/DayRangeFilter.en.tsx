
import { FilterItem } from "./FilterItem";

interface DayRangeFilterENProps {
  activeDayRange: number | null;
  onChange: (value: number | null) => void;
}

export function DayRangeFilterEN({ activeDayRange, onChange }: DayRangeFilterENProps) {
  const dayRanges = [
    { value: 7, label: "1 Week" },
    { value: 14, label: "2 Weeks" },
    { value: 21, label: "3 Weeks" },
    { value: 30, label: "1 Month" },
    { value: 60, label: "2 Months" },
    { value: 90, label: "3 Months" },
    { value: 180, label: "6 Months" },
    { value: 365, label: "1 Year" }
  ];

  const handleDayRangeClick = (rangeValue: number) => {
    const newValue = activeDayRange === rangeValue ? null : rangeValue;
    console.log("DayRangeFilter - Range toggled:", rangeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="NUMBER OF DAYS">
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
