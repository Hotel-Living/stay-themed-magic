
import { FilterItem } from "./FilterItem";

interface MonthFilterENProps {
  activeMonth: string | null;
  onChange: (value: string | null) => void;
}

export function MonthFilterEN({ activeMonth, onChange }: MonthFilterENProps) {
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];

  const handleMonthClick = (monthValue: string) => {
    const newValue = activeMonth === monthValue ? null : monthValue;
    console.log("MonthFilter - Month toggled:", monthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="MONTH">
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
