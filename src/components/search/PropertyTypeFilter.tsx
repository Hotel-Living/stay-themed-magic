
import { FilterItem } from "./FilterItem";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyTypeFilterProps {
  activePropertyType: string | null;
  onChange: (value: string) => void;
}

export function PropertyTypeFilter({ activePropertyType, onChange }: PropertyTypeFilterProps) {
  const { t } = useTranslation();

  const propertyTypes = [
    { value: "Hotel", label: t('filters.propertyTypes.hotel') },
    { value: "Resort", label: t('filters.propertyTypes.resort') },
    { value: "Boutique Hotel", label: t('filters.propertyTypes.boutiqueHotel') },
    { value: "Motel", label: t('filters.propertyTypes.motel') },
    { value: "Inn", label: t('filters.propertyTypes.inn') }
  ];

  return (
    <FilterItem title={t('filters.typeOfProperty').toUpperCase()}>
      {propertyTypes.map(type => (
        <label key={type.value} className="flex items-start">
          <input 
            type="radio" 
            name="propertyType"
            checked={activePropertyType === type.value}
            onChange={() => onChange(type.value)}
            className="rounded-full border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{type.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
