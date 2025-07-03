
import { FilterItem } from "./FilterItem";

interface LengthOfStayFilterESProps {
  activeLength: string | null;
  onChange: (value: string | null) => void;
}

export function LengthOfStayFilterES({ activeLength, onChange }: LengthOfStayFilterESProps) {
  const lengthOfStayOptions = [
    { value: "7", label: "8 días (7 noches)" },
    { value: "14", label: "15 días (14 noches)" },
    { value: "21", label: "22 días (21 noches)" },
    { value: "28", label: "29 días (28 noches)" }
  ];

  const handleLengthClick = (lengthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeLength === lengthValue ? null : lengthValue;
    console.log("LengthOfStayFilter - Length toggled:", lengthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="NÚMERO DE DÍAS">
      {lengthOfStayOptions.map(option => (
        <label key={option.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeLength === option.value}
            onChange={() => handleLengthClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
