
import React from "react";
import { FilterItem } from "./FilterItem";
import { useDynamicFilterData } from "@/hooks/useDynamicFilterData";

interface PropertyStyleFilterPTProps {
  activePropertyStyle: string | null;
  onChange: (value: string | null) => void;
}

export function PropertyStyleFilterPT({ activePropertyStyle, onChange }: PropertyStyleFilterPTProps) {
  const { propertyStyles, loading } = useDynamicFilterData();

  const handleStyleClick = (style: string) => {
    const isCurrentlySelected = activePropertyStyle === style;
    onChange(isCurrentlySelected ? null : style);
  };

  if (loading) {
    return (
      <FilterItem title="ESTILO DE PROPRIEDADE">
        <div className="text-white text-sm">Carregando estilos de propriedade...</div>
      </FilterItem>
    );
  }

  return (
    <FilterItem title="ESTILO DE PROPRIEDADE">
      <div className="max-h-48 overflow-y-auto">
        {propertyStyles.map(style => (
          <label key={style.style} className="flex items-center mb-2 cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
            <input 
              type="checkbox" 
              checked={activePropertyStyle === style.style}
              onChange={() => handleStyleClick(style.style)}
              className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2" 
            />
            <span className="text-sm font-bold text-white">
              {style.style} ({style.count})
            </span>
          </label>
        ))}
      </div>
    </FilterItem>
  );
}
