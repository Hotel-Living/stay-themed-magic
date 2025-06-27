
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface LocationFilterENProps {
  activeLocation: string | null;
  onChange: (value: string | null) => void;
}

export function LocationFilterEN({ activeLocation, onChange }: LocationFilterENProps) {
  const { cities, loading, error } = useFilterData();

  const handleLocationClick = (locationValue: string) => {
    const newValue = activeLocation === locationValue ? null : locationValue;
    console.log("LocationFilter - Location toggled:", locationValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="LOCATION">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Loading locations...</div>
      </FilterItem>
    );
  }

  if (error || cities.length === 0) {
    return (
      <FilterItem title="LOCATION">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">No locations available</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="LOCATION">
      {cities.map(city => (
        <label key={city} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeLocation === city}
            onChange={() => handleLocationClick(city)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{city}</span>
        </label>
      ))}
    </FilterItem>
  );
}
