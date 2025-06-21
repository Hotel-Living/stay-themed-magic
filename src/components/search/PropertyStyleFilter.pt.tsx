
import { FilterItem } from "./FilterItem";

interface PropertyStyleFilterPTProps {
  activePropertyStyle: string | null;
  onChange: (value: string) => void;
}

export function PropertyStyleFilterPT({ activePropertyStyle, onChange }: PropertyStyleFilterPTProps) {
  const propertyStyles = [
    { value: "Classic", label: "Clássico" },
    { value: "Classic Elegant", label: "Clássico Elegante" },
    { value: "Modern", label: "Moderno" },
    { value: "Fusion", label: "Fusão" },
    { value: "Urban", label: "Urbano" },
    { value: "Minimalist", label: "Minimalista" },
    { value: "Luxury", label: "Luxo" }
  ];

  return (
    <FilterItem title="ESTILO DA PROPRIEDADE">
      {propertyStyles.map(style => (
        <label key={style.value} className="flex items-start">
          <input 
            type="radio" 
            name="propertyStyle"
            checked={activePropertyStyle === style.value}
            onChange={() => onChange(style.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{style.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
