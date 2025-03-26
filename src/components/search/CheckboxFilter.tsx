
import { FilterItem } from "./FilterItem";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxFilterProps {
  title: string;
  options: string[] | CheckboxOption[];
  selectedValues: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function CheckboxFilter({ 
  title, 
  options, 
  selectedValues, 
  onChange 
}: CheckboxFilterProps) {
  // Determine if options are strings or objects with value/label
  const getOptionLabel = (option: string | CheckboxOption) => {
    if (typeof option === 'string') {
      return option;
    }
    return option.label;
  };
  
  const getOptionValue = (option: string | CheckboxOption) => {
    if (typeof option === 'string') {
      return option;
    }
    return option.value;
  };
  
  return (
    <FilterItem title={title}>
      <div className="space-y-2">
        {options.map(option => {
          const value = getOptionValue(option);
          const label = getOptionLabel(option);
          
          return (
            <label key={value} className="flex items-start space-x-2">
              <input 
                type="checkbox" 
                checked={selectedValues.includes(value)}
                onChange={(e) => onChange(value, e.target.checked)}
                className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mt-0.5" 
              />
              <span className="text-sm">{label}</span>
            </label>
          );
        })}
      </div>
    </FilterItem>
  );
}
