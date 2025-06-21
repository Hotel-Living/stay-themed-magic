
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

  return (
    <FilterItem title="DURATA ȘEDERII">
      {lengthOfStayOptions.map(option => (
        <label key={option.value} className="flex items-start">
          <input 
            type="radio" 
            name="lengthOfStay"
            checked={activeLength === option.value}
            onChange={() => onChange(option.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
