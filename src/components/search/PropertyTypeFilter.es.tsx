
import { FilterItem } from "./FilterItem";
import { useTranslation } from "@/hooks/useTranslation";

interface PropertyTypeFilterESProps {
  activePropertyType: string | null;
  onChange: (value: string | null) => void;
}

export function PropertyTypeFilterES({ activePropertyType, onChange }: PropertyTypeFilterESProps) {
  const { t } = useTranslation('filters');
  
  const propertyTypes = [
    { value: "hotel", label: t("propertyTypes.hotel") },
    { value: "resort", label: t("propertyTypes.resort") },
    { value: "boutiqueHotel", label: t("propertyTypes.boutiqueHotel") },
    { value: "countryHouse", label: t("propertyTypes.countryHouse") },
    { value: "roadsideMotel", label: t("propertyTypes.roadsideMotel") }
  ];

  const handlePropertyTypeClick = (typeValue: string) => {
    // Toggle selection: if already selected, deselect; otherwise select
    const newValue = activePropertyType === typeValue ? null : typeValue;
    console.log("PropertyTypeFilter - Type toggled:", typeValue, "->", newValue);
    onChange(newValue);
  };

  return (
    <FilterItem title={t("filters.propertyType")}>
      {propertyTypes.map(type => (
        <label key={type.value} className="flex items-start cursor-pointer hover:bg-fuchsia-800/30 p-1 rounded">
          <input 
            type="checkbox" 
            checked={activePropertyType === type.value}
            onChange={() => handlePropertyTypeClick(type.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm text-white">{type.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
