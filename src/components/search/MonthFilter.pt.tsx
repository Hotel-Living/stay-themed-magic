
import { FilterItem } from "./FilterItem";

interface MonthFilterPTProps {
  activeMonth: string | null;
  onChange: (value: string | null) => void;
}

export function MonthFilterPT({ activeMonth, onChange }: MonthFilterPTProps) {
  const months = [
    { value: "January", label: "Janeiro" },
    { value: "February", label: "Fevereiro" },
    { value: "March", label: "Março" },
    { value: "April", label: "Abril" },
    { value: "May", label: "Maio" },
    { value: "June", label: "Junho" },
    { value: "July", label: "Julho" },
    { value: "August", label: "Agosto" },
    { value: "September", label: "Setembro" },
    { value: "October", label: "Outubro" },
    { value: "November", label: "Novembro" },
    { value: "December", label: "Dezembro" }
  ];

  const handleMonthClick = (monthValue: string) => {
    const newValue = activeMonth === monthValue ? null : monthValue;
    console.log("MonthFilter - Month toggled:", monthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="MÊS">
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
