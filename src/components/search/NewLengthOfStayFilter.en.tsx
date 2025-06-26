
import { FilterItem } from "./FilterItem";

interface NewLengthOfStayFilterENProps {
  activeLength: string | null;
  onChange: (value: string | null) => void;
}

export function NewLengthOfStayFilterEN({ activeLength, onChange }: NewLengthOfStayFilterENProps) {
  const lengthOfStayOptions = [
    { value: "8 days", label: "8 days" },
    { value: "16 days", label: "16 days" },
    { value: "24 days", label: "24 days" },
    { value: "32 days", label: "32 days" }
  ];

  const handleLengthClick = (lengthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeLength === lengthValue ? null : lengthValue;
    console.log("NewLengthOfStayFilter - Length toggled:", lengthValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="LENGTH OF STAY">
      {lengthOfStayOptions.map(option => (
        <label key={option.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeLength === option.value}
            onChange={() => handleLengthClick(option.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
