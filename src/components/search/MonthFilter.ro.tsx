
import { FilterItem } from "./FilterItem";

interface MonthFilterROProps {
  activeMonth: string | null;
  onChange: (value: string | null) => void;
}

export function MonthFilterRO({ activeMonth, onChange }: MonthFilterROProps) {
  const months = [
    { value: "January", label: "Ianuarie" },
    { value: "February", label: "Februarie" },
    { value: "March", label: "Martie" },
    { value: "April", label: "Aprilie" },
    { value: "May", label: "Mai" },
    { value: "June", label: "Iunie" },
    { value: "July", label: "Iulie" },
    { value: "August", label: "August" },
    { value: "September", label: "Septembrie" },
    { value: "October", label: "Octombrie" },
    { value: "November", label: "Noiembrie" },
    { value: "December", label: "Decembrie" }
  ];

  const handleMonthClick = (monthValue: string) => {
    const newValue = activeMonth === monthValue ? null : monthValue;
    console.log("MonthFilter - Month toggled:", monthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="LUNA">
      {months.map(month => (
        <label key={month.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeMonth === month.value}
            onChange={() => handleMonthClick(month.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{month.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
