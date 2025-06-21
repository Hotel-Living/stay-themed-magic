
import { FilterItem } from "./FilterItem";

interface PropertyStyleFilterENProps {
  activePropertyStyle: string | null;
  onChange: (value: string) => void;
}

export function PropertyStyleFilterEN({ activePropertyStyle, onChange }: PropertyStyleFilterENProps) {
  const propertyStyles = [
    { value: "Classic", label: "Classic" },
    { value: "Classic Elegant", label: "Classic Elegant" },
    { value: "Modern", label: "Modern" },
    { value: "Fusion", label: "Fusion" },
    { value: "Urban", label: "Urban" },
    { value: "Minimalist", label: "Minimalist" },
    { value: "Luxury", label: "Luxury" }
  ];

  return (
    <FilterItem title="STYLE OF PROPERTY">
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
