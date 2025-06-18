
import { FilterItem } from "./FilterItem";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyStyleFilterProps {
  activePropertyStyle: string | null;
  onChange: (value: string) => void;
}

export function PropertyStyleFilter({ activePropertyStyle, onChange }: PropertyStyleFilterProps) {
  const { t } = useTranslation();

  const propertyStyles = [
    { value: "Classic", label: t('filters.propertyStyles.classic') },
    { value: "Classic Elegant", label: t('filters.propertyStyles.classicElegant') },
    { value: "Modern", label: t('filters.propertyStyles.modern') },
    { value: "Fusion", label: t('filters.propertyStyles.fusion') },
    { value: "Urban", label: t('filters.propertyStyles.urban') },
    { value: "Minimalist", label: t('filters.propertyStyles.minimalist') },
    { value: "Luxury", label: t('filters.propertyStyles.luxury') }
  ];

  return (
    <FilterItem title={t('filters.styleOfProperty').toUpperCase()}>
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
