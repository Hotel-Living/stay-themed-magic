
import { FilterItem } from "./FilterItem";

interface LocationFilterESProps {
  activeLocation: string | null;
  onChange: (value: string | null) => void;
}

export function LocationFilterES({ activeLocation, onChange }: LocationFilterESProps) {
  const locations = [
    { value: "Amsterdam", label: "Ámsterdam" },
    { value: "Athens", label: "Atenas" },
    { value: "Bangkok", label: "Bangkok" },
    { value: "Berlin", label: "Berlín" },
    { value: "Bern", label: "Berna" },
    { value: "Bitez", label: "Bitez" },
    { value: "Bruges", label: "Brujas" },
    { value: "Brussels", label: "Bruselas" },
    { value: "Vienna", label: "Viena" }
  ];

  const handleLocationClick = (locationValue: string) => {
    const newValue = activeLocation === locationValue ? null : locationValue;
    console.log("LocationFilter - Location toggled:", locationValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="UBICACIÓN">
      {locations.map(location => (
        <label key={location.value} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activeLocation === location.value}
            onChange={() => handleLocationClick(location.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white">{location.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
