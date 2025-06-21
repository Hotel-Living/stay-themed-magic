
import { FilterItem } from "./FilterItem";

interface MonthFilterENProps {
  activeMonth: string | null;
  onChange: (value: string) => void;
}

export function MonthFilterEN({ activeMonth, onChange }: MonthFilterENProps) {
  const months = [
    { value: "january", label: "January" },
    { value: "february", label: "February" },
    { value: "march", label: "March" },
    { value: "april", label: "April" },
    { value: "may", label: "May" },
    { value: "june", label: "June" },
    { value: "july", label: "July" },
    { value: "august", label: "August" },
    { value: "september", label: "September" },
    { value: "october", label: "October" },
    { value: "november", label: "November" },
    { value: "december", label: "December" }
  ];

  return (
    <FilterItem title="MONTH">
      <div className="grid grid-cols-2 gap-2">
        {months.map((month) => (
          <label key={month.value} className="flex items-start">
            <input 
              type="radio" 
              name="month"
              checked={activeMonth === month.value}
              onChange={() => onChange(month.value)}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{month.label}</span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
