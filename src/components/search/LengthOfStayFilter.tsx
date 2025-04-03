
import { FilterItem } from "./FilterItem";

interface LengthOfStayFilterProps {
  activeLength: string | null;
  onChange: (value: string) => void;
}

export function LengthOfStayFilter({ activeLength, onChange }: LengthOfStayFilterProps) {
  // These options should match what's available in RoomsAndPricingStep.tsx
  const lengthOfStayOptions = ["8 days", "16 days", "24 days", "32 days"];

  return (
    <FilterItem title="LENGTH OF STAY">
      {lengthOfStayOptions.map(option => (
        <label key={option} className="flex items-start">
          <input 
            type="radio" 
            name="lengthOfStay"
            checked={activeLength === option}
            onChange={() => onChange(option)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </FilterItem>
  );
}
