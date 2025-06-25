
import { FilterItem } from "./FilterItem";

interface CheckboxFilterProps {
  title: string;
  options: Array<{ value: string; label: string }> | string[];
  selectedOptions: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function CheckboxFilter({ title, options, selectedOptions, onChange }: CheckboxFilterProps) {
  // Handle both array formats for backward compatibility
  const normalizedOptions = options.map(option => 
    typeof option === 'string' 
      ? { value: option, label: option }
      : option
  );

  return (
    <FilterItem title={title}>
      {normalizedOptions.map(option => (
        <label key={option.value} className="flex items-start">
          <input 
            type="checkbox" 
            checked={selectedOptions.includes(option.value)}
            onChange={(e) => onChange(option.value, e.target.checked)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
