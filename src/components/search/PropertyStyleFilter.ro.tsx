
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

  const handlePropertyStyleClick = (styleValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activePropertyStyle === styleValue ? null : styleValue;
    console.log("PropertyStyleFilter - Style toggled:", styleValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title="STILUL PROPRIETĂȚII">
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
