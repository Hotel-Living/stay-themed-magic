
import { FilterItem } from "./FilterItem";

interface LengthOfStayFilterROProps {
  activeLength: string | null;
  onChange: (value: string) => void;
}

export function LengthOfStayFilterRO({ activeLength, onChange }: LengthOfStayFilterROProps) {
  const lengthOfStayOptions = [
    { value: "8 days", label: "8 zile" },
    { value: "16 days", label: "16 zile" },
    { value: "24 days", label: "24 zile" },
    { value: "32 days", label: "32 zile" }
  ];

  const handleLengthClick = (lengthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeLength === lengthValue ? null : lengthValue;
    console.log("LengthOfStayFilter - Length toggled:", lengthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="DURATA ȘEDERII">
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
