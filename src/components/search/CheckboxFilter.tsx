
import { FilterItem } from "./FilterItem";

interface CheckboxFilterProps {
  title: string;
  options: Array<{id: string, name: string} | string>;
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
      {options.map(option => {
        // Handle both simple string options and object options
        const optionId = typeof option === 'string' ? option : option.id;
        const optionName = typeof option === 'string' ? option : option.name;
        
        return (
          <label key={optionId} className="flex items-start">
            <input 
              type="checkbox" 
              checked={selectedOptions.includes(optionId)}
              onChange={(e) => onChange(optionId, e.target.checked)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{optionName}</span>
          </label>
        );
      })}
    </FilterItem>
  );
}

