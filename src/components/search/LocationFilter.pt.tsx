
import { FilterItem } from "./FilterItem";
import { useFilterData } from "@/hooks/useFilterData";

interface LocationFilterPTProps {
  activeLocation: string | null;
  onChange: (value: string) => void;
}

export function LocationFilterPT({ activeLocation, onChange }: LocationFilterPTProps) {
  const { cities, loading, error } = useFilterData();

  return (
    <FilterItem title="LOCALIZAÇÃO">
      {loading ? (
        <div className="text-sm text-fuchsia-300/70 italic">Carregando cidades...</div>
      ) : error ? (
        <div className="text-sm text-fuchsia-300/70 italic">Erro ao carregar cidades</div>
      ) : cities.length === 0 ? (
        <div className="text-sm text-fuchsia-300/70 italic">Nenhuma cidade disponível</div>
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
