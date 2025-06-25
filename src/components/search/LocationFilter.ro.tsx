
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface LocationFilterROProps {
  activeLocation: string | null;
  onChange: (value: string) => void;
}

export function LocationFilterRO({ activeLocation, onChange }: LocationFilterROProps) {
  const { cities, loading, error } = useFilterData();

  return (
    <FilterItem title="LOCAȚIE">
      {loading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Se încarcă orașele...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Eroare la încărcarea orașelor</div>
      ) : cities.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">Nu sunt orașe disponibile</div>
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
