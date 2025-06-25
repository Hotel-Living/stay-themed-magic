
import { FilterItem } from "./FilterItem";
import { useTranslation } from "@/hooks/useTranslation";

interface LengthOfStayFilterProps {
  activeLength: string | null;
  onChange: (value: string) => void;
}

export function LengthOfStayFilter({ activeLength, onChange }: LengthOfStayFilterProps) {
  const { t } = useTranslation();
  
  const lengthOptions = [
    { value: "8", label: "8 días" },
    { value: "16", label: "16 días" },
    { value: "24", label: "24 días" },
    { value: "32", label: "32 días" }
  ];

  return (
    <FilterItem title={t('filters.numberOfDays')}>
      {lengthOptions.map(option => (
        <label key={option.value} className="flex items-start">
          <input 
            type="radio" 
            name="length" 
            value={option.value}
            checked={activeLength === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="rounded border-fuchsia-800/50 text-fuchsia-600 focus:ring-fuchsia-500/50 bg-fuchsia-950/50 h-4 w-4 mr-2 mt-0.5" 
          />
          <span className="text-sm">{option.label}</span>
        </label>
      ))}
    </FilterItem>
  );
}
