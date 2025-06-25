
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface LocationFilterENProps {
  activeLocation: string | null;
  onChange: (value: string) => void;
}

export function LocationFilterEN({ activeLocation, onChange }: LocationFilterENProps) {
  const { cities, loading, error } = useFilterData();

  return (
    <FilterItem title="LOCATION">
      {loading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Loading cities...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Error loading cities</div>
      ) : cities.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">No cities available</div>
      ) : (
        cities.map(city => (
          <label key={city} className="flex items-start">
            <input 
              type="radio" 
              name="location"
              checked={activeLocation === city}
              onChange={() => onChange(city)}
              className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
            />
            <span className="text-sm">{city}</span>
          </label>
        ))
      )}
    </FilterItem>
  );
}
