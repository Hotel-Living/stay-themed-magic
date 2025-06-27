
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface PropertyStyleFilterESProps {
  activePropertyStyle: string | null;
  onChange: (value: string | null) => void;
}

export function PropertyStyleFilterES({ activePropertyStyle, onChange }: PropertyStyleFilterESProps) {
  const { propertyStyles, loading, error } = useDynamicFilterData();

  const handlePropertyStyleClick = (styleValue: string) => {
    const newValue = activePropertyStyle === styleValue ? null : styleValue;
    console.log("PropertyStyleFilter - Style toggled:", styleValue, "->", newValue);
    onChange(newValue);
  };

  if (loading) {
    return (
      <FilterItem title="ESTILO DE PROPIEDAD">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">Cargando estilos de propiedad...</div>
      </FilterItem>
    );
  }

  if (error || propertyStyles.length === 0) {
    return (
      <FilterItem title="ESTILO DE PROPIEDAD">
        <div className="text-sm text-fuchsia-300/70 px-3 py-2">No hay estilos de propiedad disponibles</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="ESTILO DE PROPIEDAD">
      {propertyStyles.map(style => (
        <label key={style.style} className="flex items-start mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePropertyStyle === style.style}
            onChange={() => handlePropertyStyleClick(style.style)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm font-bold text-white flex-1">{style.style}</span>
          <span className="text-xs text-fuchsia-300/70 ml-2">({style.count})</span>
        </label>
      ))}
    </FilterItem>
  );
}
