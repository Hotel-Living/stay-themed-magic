
import { FilterItem } from "./FilterItem";

interface PropertyStyleFilterProps {
  activePropertyStyle: string | null;
  onChange: (value: string) => void;
}

export function PropertyStyleFilter({ activePropertyStyle, onChange }: PropertyStyleFilterProps) {
  const propertyStyles = [
    "Classic",
    "Classic Elegant",
    "Modern",
    "Fusion",
    "Urban",
    "Minimalist",
    "Luxury"
  ];

  return (
    <FilterItem title="STYLE OF PROPERTY">
      {propertyStyles.map(style => (
        <label key={style} className="flex items-start">
          <input 
            type="radio" 
            name="propertyStyle"
            checked={activePropertyStyle === style}
            onChange={() => onChange(style)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{style}</span>
        </label>
      ))}
    </FilterItem>
  );
}
