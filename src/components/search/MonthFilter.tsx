
import { FilterItem } from "./FilterItem";

interface MonthFilterProps {
  activeMonth: string | null;
  onChange: (value: string) => void;
}

export function MonthFilter({ activeMonth, onChange }: MonthFilterProps) {
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <FilterItem title="MONTH">
      <div className="grid grid-cols-2 gap-2">
        {months.map((month) => (
          <label key={month} className="flex items-start">
            <input 
              type="radio" 
              name="month"
              checked={activeMonth === month.toLowerCase()}
              onChange={() => onChange(month.toLowerCase())}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{month}</span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
