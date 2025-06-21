
import { FilterItem } from "./FilterItem";

interface PropertyStyleFilterROProps {
  activePropertyStyle: string | null;
  onChange: (value: string) => void;
}

export function PropertyStyleFilterRO({ activePropertyStyle, onChange }: PropertyStyleFilterROProps) {
  const propertyStyles = [
    { value: "Classic", label: "Clasic" },
    { value: "Classic Elegant", label: "Clasic Elegant" },
    { value: "Modern", label: "Modern" },
    { value: "Fusion", label: "Fuziune" },
    { value: "Urban", label: "Urban" },
    { value: "Minimalist", label: "Minimalist" },
    { value: "Luxury", label: "Lux" }
  ];

  return (
    <FilterItem title="STILUL PROPRIETĂȚII">
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
