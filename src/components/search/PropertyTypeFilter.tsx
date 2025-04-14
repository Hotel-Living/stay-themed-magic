
import { FilterItem } from "./FilterItem";

interface PropertyTypeFilterProps {
  activePropertyType: string | null;
  onChange: (value: string) => void;
}

export function PropertyTypeFilter({ activePropertyType, onChange }: PropertyTypeFilterProps) {
  const propertyTypes = ["Hotel", "Resort", "Boutique Hotel", "Motel", "Inn"];

  return (
    <FilterItem title="TYPE OF PROPERTY">
      {propertyTypes.map(type => (
        <label key={type} className="flex items-start">
          <input 
            type="radio" 
            name="propertyType"
            checked={activePropertyType === type}
            onChange={() => onChange(type)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{type}</span>
        </label>
      ))}
    </FilterItem>
  );
}
