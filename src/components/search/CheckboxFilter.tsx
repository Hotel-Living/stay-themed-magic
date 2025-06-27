
import { FilterItem } from "./FilterItem";

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (value: string, isChecked: boolean) => void;
}

export function CheckboxFilter({ title, options, selectedOptions, onChange }: CheckboxFilterProps) {
  const handleOptionClick = (optionValue: string) => {
    const isCurrentlySelected = selectedOptions.includes(optionValue);
    console.log(`CheckboxFilter (${title}) - Option toggled:`, optionValue, "->", !isCurrentlySelected);
    onChange(optionValue, !isCurrentlySelected);
  };

  return (
    <FilterItem title={title}>
      {options.map(option => (
        <label key={option} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={selectedOptions.includes(option)}
            onChange={() => handleOptionClick(option)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{option}</span>
        </label>
      ))}
    </FilterItem>
  );
}
