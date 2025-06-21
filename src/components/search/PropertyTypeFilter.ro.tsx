
import { FilterItem } from "./FilterItem";

interface PropertyTypeFilterROProps {
  activePropertyType: string | null;
  onChange: (value: string) => void;
}

export function PropertyTypeFilterRO({ activePropertyType, onChange }: PropertyTypeFilterROProps) {
  const propertyTypes = [
    { value: "Hotel", label: "Hotel" },
    { value: "Resort", label: "Resort" },
    { value: "Boutique Hotel", label: "Hotel Boutique" },
    { value: "Motel", label: "Motel" },
    { value: "Inn", label: "Hanul" }
  ];

  return (
    <FilterItem title="TIPUL PROPRIETĂȚII">
      {propertyTypes.map(type => (
        <label key={type.value} className="flex items-start">
          <input 
            type="radio" 
            name="propertyType"
            checked={activePropertyType === type.value}
            onChange={() => onChange(type.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{type.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
