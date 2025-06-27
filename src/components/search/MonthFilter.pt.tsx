
import { FilterItem } from "./FilterItem";

interface MonthFilterPTProps {
  activeMonth: string | null;
  onChange: (value: string) => void;
}

export function MonthFilterPT({ activeMonth, onChange }: MonthFilterPTProps) {
  const months = [
    { value: "january", label: "Janeiro" },
    { value: "february", label: "Fevereiro" },
    { value: "march", label: "Março" },
    { value: "april", label: "Abril" },
    { value: "may", label: "Maio" },
    { value: "june", label: "Junho" },
    { value: "july", label: "Julho" },
    { value: "august", label: "Agosto" },
    { value: "september", label: "Setembro" },
    { value: "october", label: "Outubro" },
    { value: "november", label: "Novembro" },
    { value: "december", label: "Dezembro" }
  ];

  const handleMonthClick = (monthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeMonth === monthValue ? null : monthValue;
    console.log("MonthFilter - Month toggled:", monthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="MÊS">
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
