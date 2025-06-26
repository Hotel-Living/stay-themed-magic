
import { FilterItem } from "./FilterItem";

interface LengthOfStayFilterENProps {
  activeLength: string | null;
  onChange: (value: string | null) => void;
}

export function LengthOfStayFilterEN({ activeLength, onChange }: LengthOfStayFilterENProps) {
  const lengthOfStayOptions = [
    { value: "8 days", label: "8 days" },
    { value: "16 days", label: "16 days" },
    { value: "24 days", label: "24 days" },
    { value: "32 days", label: "32 days" }
  ];

  const handleLengthClick = (lengthValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activeLength === lengthValue ? null : lengthValue;
    console.log("LengthOfStayFilter - Length toggled:", lengthValue, "->", newValue);
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
            className="appearance-none w-4 h-4 mr-2 mt-0.5 border border-fuchsia-800/50 rounded bg-fuchsia-950/50 checked:bg-fuchsia-600 checked:border-fuchsia-500 focus:ring-fuchsia-500/50 focus:ring-2 relative"
            style={{
              backgroundImage: activeLength === option.value ? 'url("data:image/svg+xml,%3csvg viewBox=\'0 0 16 16\' fill=\'white\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3cpath d=\'m13.854 3.646-7.5 7.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6 10.293l7.146-7.147a.5.5 0 0 1 .708.708z\'/%3e%3c/svg%3e")' : 'none'
            }}
          />
          <span className="text-sm font-bold text-white">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
