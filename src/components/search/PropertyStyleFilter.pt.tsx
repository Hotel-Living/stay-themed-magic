
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

  const handlePropertyStyleClick = (styleValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activePropertyStyle === styleValue ? null : styleValue;
    console.log("PropertyStyleFilter - Style toggled:", styleValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="ESTILO DA PROPRIEDADE">
      {propertyStyles.map(style => (
        <label key={style.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePropertyStyle === style.value}
            onChange={() => handlePropertyStyleClick(style.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm text-white">{style.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
