
import { FilterItem } from "./FilterItem";

interface MonthFilterROProps {
  activeMonth: string | null;
  onChange: (value: string) => void;
}

export function MonthFilterRO({ activeMonth, onChange }: MonthFilterROProps) {
  const months = [
    { value: "january", label: "Ianuarie" },
    { value: "february", label: "Februarie" },
    { value: "march", label: "Martie" },
    { value: "april", label: "Aprilie" },
    { value: "may", label: "Mai" },
    { value: "june", label: "Iunie" },
    { value: "july", label: "Iulie" },
    { value: "august", label: "August" },
    { value: "september", label: "Septembrie" },
    { value: "october", label: "Octombrie" },
    { value: "november", label: "Noiembrie" },
    { value: "december", label: "Decembrie" }
  ];

  const handleMonthClick = (monthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeMonth === monthValue ? null : monthValue;
    console.log("MonthFilter - Month toggled:", monthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="LUNA">
      <div className="grid grid-cols-2 gap-2">
        {months.map((month) => (
          <label key={month.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activeMonth === month.value}
              onChange={() => handleMonthClick(month.value)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm text-white">{month.label}</span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
