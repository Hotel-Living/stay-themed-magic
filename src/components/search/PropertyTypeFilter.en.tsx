
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface PropertyTypeFilterENProps {
  activePropertyType: string | null;
  onChange: (value: string | null) => void;
}

export function PropertyTypeFilterEN({ activePropertyType, onChange }: PropertyTypeFilterENProps) {
  const { propertyTypes, loading, error } = useDynamicFilterData();

  const handlePropertyTypeClick = (typeValue: string) => {
    const isCurrentlySelected = activePropertyType === typeValue;
    onChange(isCurrentlySelected ? null : typeValue);
  };

  if (loading) {
    return (
      <FilterItem title="TYPE OF PROPERTY">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Loading property types...</div>
      </FilterItem>
    );
  }

  if (error || propertyTypes.length === 0) {
    return (
      <FilterItem title="TYPE OF PROPERTY">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">No property types available</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="TYPE OF PROPERTY">
      {propertyTypes.map(type => (
        <label key={type.type} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePropertyType === type.type}
            onChange={() => handlePropertyTypeClick(type.type)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white flex-1">{type.type}</span>
          <span className="text-xs text-fuchsia-300/70 ml-2">({type.count})</span>
        </label>
      ))}
    </FilterItem>
  );
}
