
import { FilterItem } from "./FilterItem";

interface MonthFilterESProps {
  activeMonth: string | null;
  onChange: (value: string | null) => void;
}

export function MonthFilterES({ activeMonth, onChange }: MonthFilterESProps) {
  const months = [
    { value: "January", label: "Enero" },
    { value: "February", label: "Febrero" },
    { value: "March", label: "Marzo" },
    { value: "April", label: "Abril" },
    { value: "May", label: "Mayo" },
    { value: "June", label: "Junio" },
    { value: "July", label: "Julio" },
    { value: "August", label: "Agosto" },
    { value: "September", label: "Septiembre" },
    { value: "October", label: "Octubre" },
    { value: "November", label: "Noviembre" },
    { value: "December", label: "Diciembre" }
  ];

  const handleMonthClick = (monthValue: string) => {
    const newValue = activeMonth === monthValue ? null : monthValue;
    console.log("MonthFilter - Month toggled:", monthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="MES">
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
