
import { FilterItem } from "./FilterItem";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onChange: (value: string[]) => void;
}

export function CheckboxFilter({ 
  title, 
  options, 
  selectedOptions, 
  onChange 
}: CheckboxFilterProps) {
  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedOptions, option]);
    } else {
      onChange(selectedOptions.filter(item => item !== option));
    }
  };

  return (
    <FilterItem title={title}>
      <div className="space-y-2" role="group" aria-label={title}>
        {options.map(option => {
          const id = `${title}-${option}`.toLowerCase().replace(/\s+/g, '-');
          
          return (
            <div key={option} className="flex items-start space-x-2">
              <Checkbox 
                id={id}
                checked={selectedOptions.includes(option)}
                onCheckedChange={(checked) => handleChange(option, checked as boolean)}
                aria-labelledby={`${id}-label`}
              />
              <Label 
                htmlFor={id}
                id={`${id}-label`}
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option}
              </Label>
            </div>
          );
        })}
      </div>
    </FilterItem>
  );
}
