
import { FilterItem } from "./FilterItem";

interface LocationFilterProps {
  activeLocation: string | null;
  onChange: (value: string) => void;
}

export function LocationFilter({ activeLocation, onChange }: LocationFilterProps) {
  const locations = ["City Center", "Beach", "Mountain", "Countryside", "Resort Area", "Historic District"];

  return (
    <FilterItem title="LOCATION">
      {locations.map(location => (
        <label key={location} className="flex items-start">
          <input 
            type="radio" 
            name="location"
            checked={activeLocation === location}
            onChange={() => onChange(location)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{location}</span>
        </label>
      ))}
    </FilterItem>
  );
}
