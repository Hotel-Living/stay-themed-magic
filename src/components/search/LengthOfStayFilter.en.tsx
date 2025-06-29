
import { FilterItem } from "./FilterItem";

interface LengthOfStayFilterENProps {
  activeLength: string | null;
  onChange: (value: string | null) => void;
}

export function LengthOfStayFilterEN({ activeLength, onChange }: LengthOfStayFilterENProps) {
  const lengthOfStayOptions = [
    { value: "8 days", label: "8 days" },
    { value: "15 days", label: "15 days" },
    { value: "22 days", label: "22 days" },
    { value: "29 days", label: "29 days" }
  ];

  const handleLengthClick = (lengthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeLength === lengthValue ? null : lengthValue;
    console.log("LengthOfStayFilter - Length toggled:", lengthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="NUMBER OF DAYS">
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
