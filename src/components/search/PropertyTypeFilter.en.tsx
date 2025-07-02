
import { FilterItem } from "./FilterItem";

interface PropertyTypeFilterENProps {
  activePropertyType: string | null;
  onChange: (value: string) => void;
}

export function PropertyTypeFilterEN({ activePropertyType, onChange }: PropertyTypeFilterENProps) {
  const propertyTypes = [
    { value: "Hotel", label: "Hotel" },
    { value: "Resort", label: "Resort" },
    { value: "Boutique Hotel", label: "Boutique Hotel" },
    { value: "Country House", label: "Country House" },
    { value: "Roadside Motel", label: "Roadside Motel" }
  ];

  const handlePropertyTypeClick = (typeValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activePropertyType === typeValue ? null : typeValue;
    console.log("PropertyTypeFilter - Type toggled:", typeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="TYPE OF PROPERTY">
      {propertyTypes.map(type => (
        <label key={type.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePropertyType === type.value}
            onChange={() => handlePropertyTypeClick(type.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm text-white">{type.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
