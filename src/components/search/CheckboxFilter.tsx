
import { FilterItem } from "./FilterItem";

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function CheckboxFilter({ 
  title, 
  options, 
  selectedOptions, 
  onChange 
}: CheckboxFilterProps) {
  return (
    <FilterItem title={title}>
      {options.map(option => (
        <label key={option} className="flex items-start">
          <input 
            type="checkbox" 
            checked={selectedOptions.includes(option)}
            onChange={(e) => onChange(option, e.target.checked)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option}</span>
        </label>
      ))}
    </FilterItem>
  );
}
